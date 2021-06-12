import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeMoviesComponent} from './component/home-movies/home-movies.component';
import {BookingScreenComponent} from './component/booking-screen/booking-screen.component';
 
const routes: Routes = [
  {path:"", component:HomeMoviesComponent},
  {path:"bookings",component:BookingScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
