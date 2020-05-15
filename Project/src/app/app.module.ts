import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component';
import { ServerService } from './components/server.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { RentACarCompaniesComponent } from './components/rent-a-car-companies/rent-a-car-companies.component';
import { RacCompanyService } from './components/rac-company.service';
import { RentACarCompanyDetailsComponent } from './components/rent-a-car-companies/rent-a-car-company-details/rent-a-car-company-details.component';
import { ProfilKorisnikaComponent } from './components/profil-korisnika/profil-korisnika.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { RacCompanyResolver } from './resolvers/rac-company-resolver.service';
import { AirlinesComponent } from './components/airlines/airlines.component';
import { AirlineService } from './components/airline.service';
import { AirlineDetailsComponent } from './components/airlines/airline-details/airline-details.component';
import { AirlineResolver } from './resolvers/airline-resolver.service';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminsComponent } from './components/admin-panel/admins/admins.component';
import { AdminListComponent } from './components/admin-panel/admins/admin-list/admin-list.component';
import { AdminService } from './components/admin.service';
import { AdminDetailsComponent } from './components/admin-panel/admins/admin-details/admin-details.component';
import { AddAdminComponent } from './components/admin-panel/admins/add-admin/add-admin.component';
import { AdminResolver } from './resolvers/admin-resolver.service';
import { ApAirlinesComponent } from './components/admin-panel/ap-airlines/ap-airlines.component';
import { ApAirlineListComponent } from './components/admin-panel/ap-airlines/ap-airline-list/ap-airline-list.component';
import { ApAddAirlineComponent } from './components/admin-panel/ap-airlines/ap-add-airline/ap-add-airline.component';
import { RacCompaniesComponent } from './components/admin-panel/rac-companies/rac-companies.component';
import { RacCompanyListComponent } from './components/admin-panel/rac-companies/rac-company-list/rac-company-list.component';
import { AddRacCompanyComponent } from './components/admin-panel/rac-companies/add-rac-company/add-rac-company.component';
import { VehiclesComponent } from './components/admin-panel/rac-companies/vehicles/vehicles.component';
import { VehicleListComponent } from './components/admin-panel/rac-companies/vehicles/vehicle-list/vehicle-list.component';
import { VehicleDetailsComponent } from './components/admin-panel/rac-companies/vehicles/vehicle-details/vehicle-details.component';
import { VehicleResolver } from './resolvers/vehicle-resolver.service';
import { AddVehicleComponent } from './components/admin-panel/rac-companies/vehicles/add-vehicle/add-vehicle.component';
import { VehicleListNicerComponent } from './components/rent-a-car-companies/vehicle-list-nicer/vehicle-list-nicer.component';
import { RentACarCompanySearchComponent } from './components/rent-a-car-companies/rent-a-car-company-search/rent-a-car-company-search.component';
import { VehicleSearchComponent } from './components/rent-a-car-companies/vehicle-search/vehicle-search.component';
import { VehicleService } from './components/vehicle.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    RentACarCompaniesComponent,
    RentACarCompanyDetailsComponent,
    ProfilKorisnikaComponent,
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
    VehicleSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RacCompanyResolver, 
    AirlineResolver, 
    AdminResolver, 
    VehicleResolver, 
    ServerService, 
    RacCompanyService,
    VehicleService,
    AirlineService, 
    AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
