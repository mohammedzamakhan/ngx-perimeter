import { NgModule } from '@angular/core';
import { PerimeterRouteDirective } from './perimeter-route.directive';
import { PerimeterService, PerimeterStrategy } from './perimeter-strategy.service';

@NgModule({
  declarations: [PerimeterRouteDirective],
  providers: [PerimeterService, PerimeterStrategy],
  imports: [
  ],
  exports: [PerimeterRouteDirective]
})
export class PerimeterStrategyModule { }
