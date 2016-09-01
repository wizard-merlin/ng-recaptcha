import { BrowserModule }  from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, NgModule } from '@angular/core';
import { RecaptchaNoFormsModule, RecaptchaLoaderService } from 'ng2-recaptcha/ng2-recaptcha.noforms';

@Component({
  selector: 'my-app',
  template: `
    <recaptcha
      (resolved)="resolved($event)"
      siteKey="6LcOuyYTAAAAAHTjFuqhA52fmfJ_j5iFk5PsfXaU"
    ></recaptcha>
  `,
})
export class MyApp {
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }
}

@NgModule({
  bootstrap: [MyApp],
  declarations: [MyApp],
  imports: [BrowserModule, RecaptchaNoFormsModule.forRoot()],
  providers: [
    {
      provide: RecaptchaLoaderService,
      useValue: new RecaptchaLoaderService("fr"),
    },
  ],
})
export class MyAppModule { }

platformBrowserDynamic().bootstrapModule(MyAppModule);
