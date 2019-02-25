import { Injectable } from '@angular/core';
import { PreloadingStrategy, Router, Route, UrlTree } from '@angular/router';
import { filter } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';
import { findPath, containsTree } from './utils';

@Injectable()
export class PerimeterStrategy implements PreloadingStrategy {

  constructor(private perimeterService: PerimeterBreachService, private router: Router) { }

  preload(route: Route, load: () => {}) {
    const fullPath = findPath(this.router.config, route);
    this.perimeterService.breached$
      .pipe(
        filter(urlTree => this.shouldPrefetch(fullPath, urlTree))
      )
      .subscribe(() => load());
    return EMPTY;
  }

  shouldPrefetch(url: string, urlTree: UrlTree) {
    const tree = this.router.parseUrl(url);
    return containsTree(urlTree, tree);
  }
}

@Injectable()
export class PerimeterBreachService {
  breached$: Subject<any> = new Subject();

  addBreach(route: any) {
    this.breached$.next(route);
  }
}
