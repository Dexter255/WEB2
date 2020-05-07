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
import { AdminsComponent } from './components/content/admin-panel/admin-content/admins/admins.component';
import { AdminListComponent } from './components/content/admin-panel/admin-content/admins/admin-list/admin-list.component';
import { AddAdminComponent } from './components/content/admin-panel/admin-content/admins/add-admin/add-admin.component';
import { AdminDetailsComponent } from './components/content/admin-panel/admin-content/admins/admin-details/admin-details.component';
import { AirlinesComponent } from './components/content/admin-panel/admin-content/airlines/airlines.component';
import { AirlineListComponent } from './components/content/admin-panel/admin-content/airlines/airline-list/airline-list.component';
import { AddAirlineComponent } from './components/content/admin-panel/admin-content/airlines/add-airline/add-airline.component';
import { AirlineDetailsComponent } from './components/content/admin-panel/admin-content/airlines/airline-details/airline-details.component';
import { RacCompaniesComponent } from './components/content/admin-panel/admin-content/rac-companies/rac-companies.component';
import { RacCompanyListComponent } from './components/content/admin-panel/admin-content/rac-companies/rac-company-list/rac-company-list.component';
import { RacCompanyDetailsComponent } from './components/content/admin-panel/admin-content/rac-companies/rac-company-details/rac-company-details.component';
import { AddRacCompanyComponent } from './components/content/admin-panel/admin-content/rac-companies/add-rac-company/add-rac-company.component';
import { VehiclesComponent } from './components/content/admin-panel/admin-content/vehicles/vehicles.component';
import { AdminVehicleListComponent } from './components/content/admin-panel/admin-content/vehicles/admin-vehicle-list/admin-vehicle-list.component';
import { AddVehicleComponent } from './components/content/admin-panel/admin-content/vehicles/add-vehicle/add-vehicle.component';
import { AdminVehicleDetailsComponent } from './components/content/admin-panel/admin-content/vehicles/admin-vehicle-details/admin-vehicle-details.component';

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
      { path: "rac-companies-admins", component: AdminsComponent, children: [
        { path: "", component: AdminListComponent },
        { path: "add", component: AddAdminComponent },
        { path: "edit/:id", component: AddAdminComponent},
        { path: "details/:id", component: AdminDetailsComponent }
      ] },
      { path: "airlines-admins", component: AdminsComponent, children: [
        { path: "", component: AdminListComponent },
        { path: "add", component: AddAdminComponent },
        { path: "edit/:id", component: AddAdminComponent },
        { path: "details/:id", component: AdminDetailsComponent }
      ] },
      { path: "airlines", component: AirlinesComponent, children: [
        { path: "", component: AirlineListComponent },
        { path: "add", component: AddAirlineComponent },
        { path: "edit/:id", component: AddAirlineComponent },
        { path: "details/:id", component: AirlineDetailsComponent }
      ] },
      { path: "rac-companies", component: RacCompaniesComponent, children: [
        { path: "", component: RacCompanyListComponent },
        { path: "add", component: AddRacCompanyComponent },
        { path: "edit/:id", component: AddRacCompanyComponent },
        { path: "details/:id", component: RacCompanyDetailsComponent },
        { path: ":id/vehicles", component: VehiclesComponent, children: [
          { path: "", component: AdminVehicleListComponent },
          { path: "add", component: AddVehicleComponent },
          { path: "details/:id", component: AdminVehicleDetailsComponent },
          { path: "edit/:id", component: AddVehicleComponent }
        ] }
      ]}
    ] },
    { path: "**", component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
