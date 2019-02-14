import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Route1RoutingModule } from './route1-routing.module';
import { Route1Component } from './route1.component';

@NgModule({
  declarations: [Route1Component],
  imports: [
    CommonModule,
    Route1RoutingModule
  ]
})
export class Route1Module { }
