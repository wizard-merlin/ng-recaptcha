import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { MyApp } from "./forms";

@NgModule({
  bootstrap: [MyApp],
  declarations: [MyApp],
  imports: [
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    BrowserModule,
    FormsModule,
  ],
})
export class MyAppModule { }

platformBrowserDynamic().bootstrapModule(MyAppModule);
