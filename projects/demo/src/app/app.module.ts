import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PerimeterModule } from '@ngx-perimeter/core';
import { PerimeterStrategyModule } from '@ngx-perimeter/strategy';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PerimeterModule,
    PerimeterStrategyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
