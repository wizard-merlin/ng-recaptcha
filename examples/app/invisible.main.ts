import { BrowserModule }  from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';

import { RecaptchaModule } from 'ng-recaptcha';

import { MyApp } from "./invisible";

@NgModule({
  bootstrap: [MyApp],
  declarations: [MyApp],
  imports: [BrowserModule, RecaptchaModule.forRoot()],
})
export class MyAppModule { }

platformBrowserDynamic().bootstrapModule(MyAppModule);
