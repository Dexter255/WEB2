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
import { ServerService } from './components/content/server.service';
import { LoginComponent } from './components/content/login/login.component';
import { ErrorPageComponent } from './components/content/error-page/error-page.component';
import { RegisterComponent } from './components/content/register/register.component';
import { ListaPrijateljaComponent } from './components/content/profil-korisnika/lista-prijatelja/lista-prijatelja.component';
import { PrijateljComponent } from './components/content/profil-korisnika/lista-prijatelja/prijatelj/prijatelj.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
