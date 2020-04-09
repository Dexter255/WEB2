import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/content/home/home.component';
import { RentACarComponent } from './components/content/rent-a-car/rent-a-car.component';
import { VehicleDetailsComponent } from './components/content/rent-a-car/vehicle-details/vehicle-details.component';
import { RentACarCompanyDetailsComponent } from './components/content/rent-a-car/rent-a-car-company-details/rent-a-car-company-details.component';
import { FlightsComponent } from './components/content/flights/flights.component';
import { FlightDetailsComponent } from './components/content/flights/flight-details/flight-details.component';
import { AirlineCompanyDetailsComponent } from './components/content/flights/airline-company-details/airline-company-details.component';
import { ErrorPageComponent } from './components/content/error-page/error-page.component';
import { LoginComponent } from './components/content/login/login.component';
import { RegisterComponent } from './components/content/register/register.component';


const routes: Routes = [
    { path: "", component: HomeComponent},
    { path: "flights", component: FlightsComponent, children: [
      { path: ":id", component: FlightDetailsComponent },
      { path: ":id/:airline-companyName", component: AirlineCompanyDetailsComponent }
    ] },
    { path: "rent-a-car", component: RentACarComponent, children: [
      { path: ":id", component: VehicleDetailsComponent },
      { path: ":id/:rac-companyName", component: RentACarCompanyDetailsComponent }
    ]},
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "**", component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
