import { Directive, OnInit, Optional } from '@angular/core';
import { RouterLink, RouterLinkWithHref } from '@angular/router';
import { PerimeterDirective } from '@ngx-perimeter/core';
import { PerimeterService } from './perimeter-strategy.service';
import { EMPTY } from 'rxjs';

@Directive({
  selector: '[ngxPerimeterRoute]'
})
export class PerimeterRouteDirective implements OnInit {

  constructor(
    private perimeterService: PerimeterService,
    @Optional() private link: RouterLink,
    @Optional() private linkWithHref: RouterLinkWithHref,
    @Optional() private perimeterDirective: PerimeterDirective
  ) { }

  ngOnInit() {
    const link = this.link || this.linkWithHref;
    if (this.perimeterDirective && link) {
      this.perimeterDirective.breach.subscribe(() => {
        this.perimeterService.addBreach(link.urlTree);
      });
    } else {
      return EMPTY;
    }
  }
}
