import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/content/home/home.component';
import { AirlinesComponent } from './components/content/airlines/airlines.component';
import { RacServicesComponent } from './components/content/rac-services/rac-services.component';


const routes: Routes = [
    { path: "", component: HomeComponent},
    { path: "airlines", component: AirlinesComponent},
    { path: "racServices", component: RacServicesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
