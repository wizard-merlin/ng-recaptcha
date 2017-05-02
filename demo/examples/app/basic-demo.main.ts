import { NgModule, ValueProvider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { RecaptchaDefaults, RecaptchaModule } from 'ng-recaptcha';

import { BasicDemoComponent } from './basic-demo.component';

@NgModule({
  bootstrap: [BasicDemoComponent],
  declarations: [BasicDemoComponent],
  imports: [BrowserModule, RecaptchaModule.forRoot()],
  providers: [
    {
      provide: RecaptchaDefaults,
      useValue: new RecaptchaDefaults({ siteKey: '6LcOuyYTAAAAAHTjFuqhA52fmfJ_j5iFk5PsfXaU' }),
    } as ValueProvider,
  ],
})
export class DemoModule { }

platformBrowserDynamic().bootstrapModule(DemoModule);
