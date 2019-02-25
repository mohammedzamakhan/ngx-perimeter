import { NgModule } from '@angular/core';
import { PerimeterRouteDirective } from './perimeter-route.directive';
import { PerimeterBreachService, PerimeterStrategy } from './perimeter-strategy.service';

@NgModule({
  declarations: [PerimeterRouteDirective],
  providers: [PerimeterBreachService, PerimeterStrategy],
  imports: [
  ],
  exports: [PerimeterRouteDirective]
})
export class PerimeterStrategyModule { }
