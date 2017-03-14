import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { RecaptchaModule } from 'ng-recaptcha';

import { MyApp } from "./basic";

@NgModule({
  bootstrap: [MyApp],
  declarations: [MyApp],
  imports: [BrowserModule, RecaptchaModule.forRoot()],
})
export class MyAppModule { }

platformBrowserDynamic().bootstrapModule(MyAppModule);
