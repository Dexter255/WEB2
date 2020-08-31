import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module'
import { ToastrModule } from 'ngx-toastr';

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
import { AuthInterceptor } from './auth/auth.interceptor';
import { FlightsComponent } from './components/admin-panel/ap-airlines/flights/flights.component';
import { AddFlightComponent } from './components/admin-panel/ap-airlines/flights/add-flight/add-flight.component';
import { FlightListComponent } from './components/admin-panel/ap-airlines/flights/flight-list/flight-list.component';
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
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AdminPasswordComponent } from './components/verify-email/admin-password/admin-password.component';
import { VehicleListNicerComponent } from './components/vehicle-list-nicer/vehicle-list-nicer.component';
import { VehicleReserveComponent } from './components/vehicle-list-nicer/vehicle-reserve/vehicle-reserve.component';
import { ReservedVehicleDetailsComponent } from './components/reservation-list/reserved-vehicle-details/reserved-vehicle-details.component';
import { RateComponent } from './components/reservation-list/rate/rate.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserProfile,
    RentACarCompaniesComponent,
    RentACarCompanyDetailsComponent,
    ErrorPageComponent,
    AirlinesComponent,
    AirlineDetailsComponent,
    AdminPanelComponent,
    AdminsComponent,
    AdminListComponent,
    AdminDetailsComponent,
    AddAdminComponent,
    ApAirlinesComponent,
    ApAirlineListComponent,
    ApAddAirlineComponent,
    RacCompaniesComponent,
    RacCompanyListComponent,
    AddRacCompanyComponent,
    VehiclesComponent,
    VehicleListComponent,
    VehicleDetailsComponent,
    AddVehicleComponent,
    FlightsComponent,
    AddFlightComponent,
    FlightListComponent,
    FlightDetailsComponent,
    AirlineBusinessComponent,
    FriendsComponent,
    FriendDetailsComponent,
    FlightListNicerComponent,
    FlightReserveComponent,
    ReservationListComponent,
    ReservedFlightDetailsComponent,
    InvitationListComponent,
    InvitationDetailsComponent,
    AddQuickReservationTicketsComponent,
    TicketListNicerComponent,
    VerifyEmailComponent,
    AdminPasswordComponent,
    VehicleListNicerComponent,
    VehicleReserveComponent,
    ReservedVehicleDetailsComponent,
    RateComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
