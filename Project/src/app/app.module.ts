import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module' 
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { ProfilKorisnikaComponent } from './components/content/profil-korisnika/profil-korisnika.component';
import { HomeComponent } from './components/content/home/home.component';
import { AirlinesComponent } from './components/content/airlines/airlines.component';
import { AirlineListComponent } from './components/content/airlines/airline-list/airline-list.component';
import { AirlineDetailComponent } from './components/content/airlines/airline-detail/airline-detail.component';
import { AirlineComponent } from './components/content/airlines/airline-list/airline/airline.component';
import { RacServicesComponent } from './components/content/rac-services/rac-services.component';
import { RacServiceListComponent } from './components/content/rac-services/rac-service-list/rac-service-list.component';
import { RacServiceDetailComponent } from './components/content/rac-services/rac-service-detail/rac-service-detail.component';
import { RacServiceComponent } from './components/content/rac-services/rac-service-list/rac-service/rac-service.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    ProfilKorisnikaComponent,
    HomeComponent,
    AirlinesComponent,
    AirlineListComponent,
    AirlineDetailComponent,
    AirlineComponent,
    RacServicesComponent,
    RacServiceListComponent,
    RacServiceDetailComponent,
    RacServiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
