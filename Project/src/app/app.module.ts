import { AppComponent } from './app.component';
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
import { VehicleListNicerComponent } from './components/rent-a-car-companies/vehicle-list-nicer/vehicle-list-nicer.component';
import { RentACarCompanySearchComponent } from './components/rent-a-car-companies/rent-a-car-company-search/rent-a-car-company-search.component';
import { VehicleSearchComponent } from './components/rent-a-car-companies/vehicle-search/vehicle-search.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { FlightsComponent } from './components/admin-panel/ap-airlines/flights/flights.component';
import { AddFlightComponent } from './components/admin-panel/ap-airlines/flights/add-flight/add-flight.component';
import { FlightListComponent } from './components/admin-panel/ap-airlines/flights/flight-list/flight-list.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { UserProfile } from './components/user-profile/user-profile.component';
import { FlightDetailsComponent } from './components/admin-panel/ap-airlines/flights/flight-details/flight-details.component';
import { TicketsComponent } from './components/admin-panel/ap-airlines/tickets/tickets.component';
import { TicketListComponent } from './components/admin-panel/ap-airlines/tickets/ticket-list/ticket-list.component';
import { AddTicketComponent } from './components/admin-panel/ap-airlines/tickets/add-ticket/add-ticket.component';
import { TicketDetailsComponent } from './components/admin-panel/ap-airlines/tickets/ticket-details/ticket-details.component';
import { AirlineBusinessComponent } from './components/admin-panel/ap-airlines/airline-business/airline-business.component';
import { FriendsComponent } from './components/friends/friends.component';
import { FriendDetailsComponent } from './components/friends/friend-details/friend-details.component';
import { FlightListNicerComponent } from './components/flight-list-nicer/flight-list-nicer.component';
import { TicketListNicerComponent } from './components/ticket-list-nicer/ticket-list-nicer.component';

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
    VehicleListNicerComponent,
    RentACarCompanySearchComponent,
    VehicleSearchComponent,
    FlightsComponent,
    AddFlightComponent,
    FlightListComponent,
    ForbiddenComponent,
    FlightDetailsComponent,
    TicketsComponent,
    TicketListComponent,
    AddTicketComponent,
    TicketDetailsComponent,
    AirlineBusinessComponent,
    FriendsComponent,
    FriendDetailsComponent,
    FlightListNicerComponent,
    TicketListNicerComponent
  ],
  imports: [
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
