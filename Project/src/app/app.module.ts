import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { ProfilKorisnikaComponent } from './components/content/profil-korisnika/profil-korisnika.component';
import { HomeComponent } from './components/content/home/home.component';
import { RentACarComponent } from './components/content/rent-a-car/rent-a-car.component';
import { VehicleListComponent } from './components/content/rent-a-car/vehicle-list/vehicle-list.component';
import { VehicleDetailsComponent } from './components/content/rent-a-car/vehicle-details/vehicle-details.component';
import { VehicleComponent } from './components/content/rent-a-car/vehicle-list/vehicle/vehicle.component';
import { RentACarCompanyDetailsComponent } from './components/content/rent-a-car/rent-a-car-company-details/rent-a-car-company-details.component';
import { FlightsComponent } from './components/content/flights/flights.component';
import { FlightListComponent } from './components/content/flights/flight-list/flight-list.component';
import { FlightDetailsComponent } from './components/content/flights/flight-details/flight-details.component';
import { FlightComponent } from './components/content/flights/flight-list/flight/flight.component';
import { AirlineCompanyDetailsComponent } from './components/content/flights/airline-company-details/airline-company-details.component';
import { LoginComponent } from './components/content/login/login.component';
import { ErrorPageComponent } from './components/content/error-page/error-page.component';
import { RegisterComponent } from './components/content/register/register.component';
import { ListaPrijateljaComponent } from './components/content/profil-korisnika/lista-prijatelja/lista-prijatelja.component';
import { PrijateljComponent } from './components/content/profil-korisnika/lista-prijatelja/prijatelj/prijatelj.component';
import { ServerService } from './components/server.service';
import { AdminPanelComponent } from './components/content/admin-panel/admin-panel.component';
import { AdminHeaderComponent } from './components/content/admin-panel/admin-header/admin-header.component';
import { AdminContentComponent } from './components/content/admin-panel/admin-content/admin-content.component';
import { RentACarService } from './components/content/rent-a-car/rent-a-car.service';
import { AdminsComponent } from './components/content/admin-panel/admin-content/admins/admins.component';
import { AdminListComponent } from './components/content/admin-panel/admin-content/admins/admin-list/admin-list.component';
import { AddAdminComponent } from './components/content/admin-panel/admin-content/admins/add-admin/add-admin.component';
import { AdminComponent } from './components/content/admin-panel/admin-content/admins/admin-list/admin/admin.component';
import { AdminsService } from './components/content/admin-panel/admin-content/admins/admins.service';
import { AdminDetailsComponent } from './components/content/admin-panel/admin-content/admins/admin-details/admin-details.component';
import { AirlinesComponent } from './components/content/admin-panel/admin-content/airlines/airlines.component';
import { AirlineListComponent } from './components/content/admin-panel/admin-content/airlines/airline-list/airline-list.component';
import { AirlineComponent } from './components/content/admin-panel/admin-content/airlines/airline-list/airline/airline.component';
import { AirlinesService } from './components/content/admin-panel/admin-content/airlines/airlines.service';
import { AddAirlineComponent } from './components/content/admin-panel/admin-content/airlines/add-airline/add-airline.component';
import { AirlineDetailsComponent } from './components/content/admin-panel/admin-content/airlines/airline-details/airline-details.component';
import { RacCompaniesComponent } from './components/content/admin-panel/admin-content/rac-companies/rac-companies.component';
import { RacCompaniesService } from './components/content/admin-panel/admin-content/rac-companies/rac-companies.service';
import { RacCompanyListComponent } from './components/content/admin-panel/admin-content/rac-companies/rac-company-list/rac-company-list.component';
import { RacCompanyComponent } from './components/content/admin-panel/admin-content/rac-companies/rac-company-list/rac-company/rac-company.component';
import { RacCompanyDetailsComponent } from './components/content/admin-panel/admin-content/rac-companies/rac-company-details/rac-company-details.component';
import { AddRacCompanyComponent } from './components/content/admin-panel/admin-content/rac-companies/add-rac-company/add-rac-company.component';
import { VehiclesComponent } from './components/content/admin-panel/admin-content/vehicles/vehicles.component';
import { AdminVehicleListComponent } from './components/content/admin-panel/admin-content/vehicles/admin-vehicle-list/admin-vehicle-list.component';
import { AdminVehicleComponent } from './components/content/admin-panel/admin-content/vehicles/admin-vehicle-list/admin-vehicle/admin-vehicle.component';
import { AddVehicleComponent } from './components/content/admin-panel/admin-content/vehicles/add-vehicle/add-vehicle.component';
import { AdminVehicleDetailsComponent } from './components/content/admin-panel/admin-content/vehicles/admin-vehicle-details/admin-vehicle-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    ProfilKorisnikaComponent,
    PrijateljComponent,
    ListaPrijateljaComponent,
    HomeComponent,
    RentACarComponent,
    VehicleListComponent,
    VehicleDetailsComponent,
    VehicleComponent,
    RentACarCompanyDetailsComponent,
    FlightsComponent,
    FlightListComponent,
    FlightDetailsComponent,
    FlightComponent,
    AirlineCompanyDetailsComponent,
    LoginComponent,
    ErrorPageComponent,
    RegisterComponent,
    AdminPanelComponent,
    AdminHeaderComponent,
    AdminContentComponent,
    AdminsComponent,
    AdminListComponent,
    AddAdminComponent,
    AdminComponent,
    AdminDetailsComponent,
    AirlinesComponent,
    AirlineListComponent,
    AirlineComponent,
    AddAirlineComponent,
    AirlineDetailsComponent,
    RacCompaniesComponent,
    RacCompanyListComponent,
    RacCompanyComponent,
    RacCompanyDetailsComponent,
    AddRacCompanyComponent,
    VehiclesComponent,
    AdminVehicleListComponent,
    AdminVehicleComponent,
    AddVehicleComponent,
    AdminVehicleDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ServerService, RacCompaniesService, AirlinesService, AdminsService, RentACarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
