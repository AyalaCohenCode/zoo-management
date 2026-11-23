import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page-component/home-page-component';
import { LogInComponent } from './components/log-in-component/log-in-component';
import { OrderCardsComponent } from './components/order-cards-component/order-cards-component';
import { OurAnimalsComponent } from './components/our-animals-component/our-animals-component';
import { PersonalAreaComponent } from './components/personal-area-component/personal-area-component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LogInComponent },
  { path: 'orderCards', component: OrderCardsComponent },
  { path: 'ourAnimals', component: OurAnimalsComponent },
  //לקבל באיזור אישי שם של משתמש
  { path: 'personalArea', component: PersonalAreaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }