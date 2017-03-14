import { BrowserModule }  from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import {
  RecaptchaModule,
  RecaptchaLoaderService,
  RECAPTCHA_LANGUAGE,
} from 'ng-recaptcha';

import { MyApp } from "./language";

@NgModule({
  bootstrap: [MyApp],
  declarations: [MyApp],
  imports: [BrowserModule, RecaptchaModule.forRoot()],
  providers: [
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: "fr",
    },
  ],
})
export class MyAppModule { }

platformBrowserDynamic().bootstrapModule(MyAppModule);
