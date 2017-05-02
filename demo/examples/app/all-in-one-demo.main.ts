import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { AllInOneDemoComponent } from './all-in-one-demo.component';

@NgModule({
  bootstrap: [AllInOneDemoComponent],
  declarations: [AllInOneDemoComponent],
  imports: [
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    BrowserModule,
    FormsModule,
  ],
})
export class DemoModule { }

platformBrowserDynamic().bootstrapModule(DemoModule);
