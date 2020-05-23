import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { RentACarCompaniesComponent } from './components/rent-a-car-companies/rent-a-car-companies.component';
import { RentACarCompanyDetailsComponent } from './components/rent-a-car-companies/rent-a-car-company-details/rent-a-car-company-details.component';
import { ProfilKorisnikaComponent } from './components/profil-korisnika/profil-korisnika.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { AirlinesComponent } from './components/airlines/airlines.component';
import { AirlineDetailsComponent } from './components/airlines/airline-details/airline-details.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminsComponent } from './components/admin-panel/admins/admins.component';
import { AdminListComponent } from './components/admin-panel/admins/admin-list/admin-list.component';
import { AdminDetailsComponent } from './components/admin-panel/admins/admin-details/admin-details.component';
import { AddAdminComponent } from './components/admin-panel/admins/add-admin/add-admin.component';
import { ApAirlinesComponent } from './components/admin-panel/ap-airlines/ap-airlines.component';
import { ApAirlineListComponent } from './components/admin-panel/ap-airlines/ap-airline-list/ap-airline-list.component';
import { ApAddAirlineComponent } from './components/admin-panel/ap-airlines/ap-add-airline/ap-add-airline.component';
import { RacCompaniesComponent } from './components/admin-panel/rac-companies/rac-companies.component';
import { RacCompanyListComponent } from './components/admin-panel/rac-companies/rac-company-list/rac-company-list.component';
import { AddRacCompanyComponent } from './components/admin-panel/rac-companies/add-rac-company/add-rac-company.component';
import { VehiclesComponent } from './components/admin-panel/rac-companies/vehicles/vehicles.component';
import { VehicleListComponent } from './components/admin-panel/rac-companies/vehicles/vehicle-list/vehicle-list.component';
import { VehicleDetailsComponent } from './components/admin-panel/rac-companies/vehicles/vehicle-details/vehicle-details.component';
import { AddVehicleComponent } from './components/admin-panel/rac-companies/vehicles/add-vehicle/add-vehicle.component';
import { VehicleListNicerComponent } from './components/rent-a-car-companies/vehicle-list-nicer/vehicle-list-nicer.component';
import { AuthGuard } from './auth/auth.guard';
import { FlightBusinessComponent } from './components/admin-panel/ap-airlines/flight-business/flight-business.component';
import { FlightsComponent } from './components/admin-panel/ap-airlines/flights/flights.component';
import { FlightListComponent } from './components/admin-panel/ap-airlines/flights/flight-list/flight-list.component';
import { AddFlightComponent } from './components/admin-panel/ap-airlines/flights/add-flight/add-flight.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "userProfile", component: ProfilKorisnikaComponent, canActivate: [AuthGuard] },
  { path: "rac-companies", component: RentACarCompaniesComponent, children: [
    { path: "details/:id", component: RentACarCompanyDetailsComponent },
    { path: ":id/vehicles", component: VehicleListNicerComponent, children: [
      { path: "details/:id", component: VehicleDetailsComponent }
    ]},
  ]},
  { path: "airlines", component: AirlinesComponent, children: [
    { path: "details/:id", component: AirlineDetailsComponent }
  ] },
  { path: "admin-panel", component: AdminPanelComponent, children: [
    { path: "airline-admins", component: AdminsComponent, children: [
      { path: "", component: AdminListComponent },
      { path: "details/:username", component: AdminDetailsComponent },
      { path: "add", component: AddAdminComponent },
      { path: "edit/:username", component: AddAdminComponent }
    ] },
    { path: "rac-company-admins", component: AdminsComponent, children: [
      { path: "", component: AdminListComponent },
      { path: "details/:username", component: AdminDetailsComponent },
      { path: "add", component: AddAdminComponent },
      { path: "edit/:username", component: AddAdminComponent }
    ]},
    { path: "airlines", component: ApAirlinesComponent, children: [
      { path: "", component: ApAirlineListComponent },
      { path: "details/:id", component: AirlineDetailsComponent },
      { path: "add", component: ApAddAirlineComponent },
      { path: "edit/:id", component: ApAddAirlineComponent },
      { path: ":id/flights", component: FlightsComponent, children: [
        {
          path: "", component: FlightListComponent
        },
        { path:"add", component: AddFlightComponent}
        // OVDE SAM STAO; TREBA NAPRAVITI flight-list
      ]}
    ] },
    { path: "airlineBusiness", component: FlightBusinessComponent },
    { path: "rac-companies", component: RacCompaniesComponent, children: [
      { path: "", component: RacCompanyListComponent },
      { path: "details/:id", component: RentACarCompanyDetailsComponent },
      { path: "add", component: AddRacCompanyComponent },
      { path: "edit/:id", component: AddRacCompanyComponent },
      { path: ":id/vehicles", component: VehiclesComponent, children: [
        { path: "", component: VehicleListComponent },
        { path: "details/:id", component: VehicleDetailsComponent },
        { path: "add", component: AddVehicleComponent },
        { path: "edit/:id", component: AddVehicleComponent}
      ] }
    ] }
  ] },
  { path: "error", component: ErrorPageComponent},
  { path: "**", redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
