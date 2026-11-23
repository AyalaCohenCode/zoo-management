import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './components/home-page-component/home-page-component';
import { LogInComponent } from './components/log-in-component/log-in-component';
import { OrderCardsComponent } from './components/order-cards-component/order-cards-component';
import { OurAnimalsComponent } from './components/our-animals-component/our-animals-component';
import { PersonalAreaComponent } from './components/personal-area-component/personal-area-component';
import { FormsModule, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    App,
    HomePageComponent,
    LogInComponent,
    OrderCardsComponent,
    OurAnimalsComponent,
    PersonalAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
    // NgModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
