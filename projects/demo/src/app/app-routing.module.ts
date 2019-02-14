import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PerimeterStrategy } from '@ngx-perimeter/strategy';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'route1', loadChildren: './route1/route1.module#Route1Module' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PerimeterStrategy
  })],
  providers: [PerimeterStrategy],
  exports: [RouterModule]
})
export class AppRoutingModule { }

