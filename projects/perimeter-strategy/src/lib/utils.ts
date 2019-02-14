import { UrlSegment, PRIMARY_OUTLET, UrlSegmentGroup, UrlTree, Params, Route } from '@angular/router';

export const findPath = (config: Route[], route: Route): string => {
  config = config.slice();
  const parent = new Map<Route, Route>();
  while (config.length) {
    const el = config.shift();
    if (el === route) {
      break;
    }
    const ccurrent = (el as any)._loadedConfig;
    if (!ccurrent || !ccurrent.routes) {
      continue;
    }
    ccurrent.routes.forEach((r: Route) => {
      parent.set(r, el);
      config.push(r);
    });
  }
  const segments: string[] = [];
  let current = route;
  while (current) {
    segments.unshift(current.path);
    current = parent.get(current);
  }
  return '/' + segments.join('/');
};

function containsQueryParams(container: Params, containee: Params): boolean {
  // TODO: This does not handle array params correctly.
  return (
    Object.keys(containee).length <= Object.keys(container).length &&
    Object.keys(containee).every(key => containee[key] === container[key])
  );
}

export function containsTree(container: UrlTree, containee: UrlTree): boolean {
  return (
    containsQueryParams(container.queryParams, containee.queryParams) &&
    containsSegmentGroup(container.root, containee.root)
  );
}

function containsSegmentGroup(
  container: UrlSegmentGroup,
  containee: UrlSegmentGroup
): boolean {
  return containsSegmentGroupHelper(container, containee, containee.segments);
}

function containsSegmentGroupHelper(
  container: UrlSegmentGroup,
  containee: UrlSegmentGroup,
  containeePaths: UrlSegment[]
): boolean {
  if (container.segments.length > containeePaths.length) {
    const current = container.segments.slice(0, containeePaths.length);
    if (!equalPath(current, containeePaths)) { return false; }
    if (containee.hasChildren()) { return false; }
    return true;
  } else if (container.segments.length === containeePaths.length) {
    if (!equalPath(container.segments, containeePaths)) { return false; }
    // tslint:disable-next-line:forin
    for (const c in containee.children) {
      if (!container.children[c]) {
        return false;
      }
      if (!containsSegmentGroup(container.children[c], containee.children[c])) {
        return false;
      }
    }
    return true;
  } else {
    const current = containeePaths.slice(0, container.segments.length);
    const next = containeePaths.slice(container.segments.length);
    if (!equalPath(container.segments, current)) { return false; }
    if (!container.children[PRIMARY_OUTLET]) { return false; }
    return containsSegmentGroupHelper(
      container.children[PRIMARY_OUTLET],
      containee,
      next
    );
  }
}

export function equalPath(as: UrlSegment[], bs: UrlSegment[]): boolean {
  if (as.length !== bs.length) {
    return false;
  }
  return as.every((a, i) => a.path === bs[i].path);
}
