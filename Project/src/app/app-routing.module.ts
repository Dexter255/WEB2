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
import { ProfilKorisnikaComponent } from './components/content/profil-korisnika/profil-korisnika.component';
import { AdminPanelComponent } from './components/content/admin-panel/admin-panel.component';
import { TableComponent } from './components/content/table/table.component';
import { AddRacCompanyComponent } from './components/content/admin-panel/admin-content/add-rac-company/add-rac-company.component';
import { AddAdminComponent } from './components/content/admin-panel/admin-content/add-admin/add-admin.component';
import { AddAirlineComponent } from './components/content/admin-panel/admin-content/add-airline/add-airline.component';


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
    { path: "userProfile", component: ProfilKorisnikaComponent },
    { path: "admin-panel", component: AdminPanelComponent, children: [
      { path: "rac-companies", component: TableComponent },
      { path: "rac-companies-admins", component: TableComponent },
      { path: "airlines", component: TableComponent },
      { path: "airlines-admins", component: TableComponent },
      { path: "add-rac-company", component: AddRacCompanyComponent },
      { path: "add-rac-companies-admin", component: AddAdminComponent },
      { path: "add-airline", component: AddAirlineComponent },
      { path: "add-airlines-admin", component: AddAdminComponent }
    ] },
    { path: "**", component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
