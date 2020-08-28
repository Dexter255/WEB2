import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { RentACarCompaniesComponent } from './components/rent-a-car-companies/rent-a-car-companies.component';
import { RentACarCompanyDetailsComponent } from './components/rent-a-car-companies/rent-a-car-company-details/rent-a-car-company-details.component';
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
import { FlightsComponent } from './components/admin-panel/ap-airlines/flights/flights.component';
import { FlightListComponent } from './components/admin-panel/ap-airlines/flights/flight-list/flight-list.component';
import { AddFlightComponent } from './components/admin-panel/ap-airlines/flights/add-flight/add-flight.component';
import { LoginRegisterGuard } from './auth/login-register.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { UserProfile } from './components/user-profile/user-profile.component';
import { FlightDetailsComponent } from './components/admin-panel/ap-airlines/flights/flight-details/flight-details.component';
import { AirlineBusinessComponent } from './components/admin-panel/ap-airlines/airline-business/airline-business.component';
import { FriendsComponent } from './components/friends/friends.component';
import { FriendDetailsComponent } from './components/friends/friend-details/friend-details.component';
import { FlightListNicerComponent } from './components/flight-list-nicer/flight-list-nicer.component';
import { FlightReserveComponent } from './components/flight-list-nicer/flight-reserve/flight-reserve.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { ReservedFlightDetailsComponent } from './components/reservation-list/reserved-flight-details/reserved-flight-details.component';
import { InvitationListComponent } from './components/invitation-list/invitation-list.component';
import { InvitationDetailsComponent } from './components/invitation-list/invitation-details/invitation-details.component';
import { AddQuickReservationTicketsComponent } from './components/admin-panel/ap-airlines/flights/add-quick-reservation-tickets/add-quick-reservation-tickets.component';
import { TicketListNicerComponent } from './components/ticket-list-nicer/ticket-list-nicer.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent, canActivate: [LoginRegisterGuard] },
  { path: "register", component: RegisterComponent, canActivate: [LoginRegisterGuard] },
  { path: "user-profile", component: UserProfile, canActivate: [AuthGuard], data: { roles: ['User', 'Admin', 'Admin_RentACarCompanies', 'Admin_Airlines'] } },
  { path: "friends", component: FriendsComponent, canActivate: [AuthGuard], data: { roles: ['User'] }, children: [
    { path: "details/:username", component: FriendDetailsComponent }
  ] },
  { path: "reservations", component: ReservationListComponent, canActivate: [AuthGuard], data: { roles: ['User'] }, children: [
    { path: "flight/:id", component: ReservedFlightDetailsComponent }
  ] },
  { path: "invitations", component: InvitationListComponent, canActivate: [AuthGuard], data: { roles: ['User'] }, children: [
    { path: "flight/:id", component: InvitationDetailsComponent }
  ] },
  { path: "airlines", component: AirlinesComponent, children: [
    { path: "details/:id", component: AirlineDetailsComponent }
  ] },
  { path: "flights/:id", component: FlightListNicerComponent, children: [
    { path: "details/:id", component: FlightDetailsComponent },
    { path: "reserve/:id", component: FlightReserveComponent, canActivate: [AuthGuard], data: { roles: ['User'] } }
  ] },
  { path: "tickets/:id", component: TicketListNicerComponent, children: [
    { path: "details/:id", component: FlightDetailsComponent },
    { path: "reserve/:id", component: FlightReserveComponent, canActivate: [AuthGuard], data: { roles: ['User'] } }
  ] },
  { path: "rac-companies", component: RentACarCompaniesComponent, children: [
    { path: "details/:id", component: RentACarCompanyDetailsComponent },
    { path: ":id/vehicles", component: VehicleListNicerComponent, children: [
      { path: "details/:id", component: VehicleDetailsComponent }
    ]},
  ]},
  { path: "admin-panel", component: AdminPanelComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Admin_RentACarCompanies', 'Admin_Airlines'] }, children: [
    { path: "airline-admins", component: AdminsComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }, children: [
      { path: "", component: AdminListComponent },
      { path: "details/:username", component: AdminDetailsComponent },
      { path: "add", component: AddAdminComponent },
      { path: "edit/:username", component: AddAdminComponent }
    ] },
    { path: "rac-company-admins", component: AdminsComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }, children: [
      { path: "", component: AdminListComponent },
      { path: "details/:username", component: AdminDetailsComponent },
      { path: "add", component: AddAdminComponent },
      { path: "edit/:username", component: AddAdminComponent }
    ]},
    { path: "airlines", component: ApAirlinesComponent, canActivate: [AuthGuard], data: { roles: ['Admin_Airlines'] }, children: [
      { path: "", component: ApAirlineListComponent },
      { path: "details/:id", component: AirlineDetailsComponent },
      { path: "add", component: ApAddAirlineComponent },
      { path: "edit/:id", component: ApAddAirlineComponent },
      { path: ":id/flights", component: FlightsComponent, children: [
        { path: "", component: FlightListComponent },
        { path:"add", component: AddFlightComponent },
        { path:"details/:id", component: FlightDetailsComponent },
        { path:"edit/:id", component: AddFlightComponent },
        { path: "add-seats/:id", component: AddQuickReservationTicketsComponent }
      ]},
      { path: ":id/income", component: AirlineBusinessComponent },
    ] },
    { path: "rac-companies", component: RacCompaniesComponent, canActivate: [AuthGuard], data: { roles: ['Admin_RentACarCompanies'] }, children: [
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
  { path: "forbidden", component: ForbiddenComponent},
  { path: "**", redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
