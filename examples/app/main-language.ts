import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component, provide } from '@angular/core';
import { 
  RecaptchaComponent,
  RecaptchaLoaderService,
} from 'ng2-recaptcha/ng2-recaptcha';

@Component({
  selector: 'my-app',
  template: `
    <recaptcha
      (resolved)="resolved($event)" 
      siteKey="6LcOuyYTAAAAAHTjFuqhA52fmfJ_j5iFk5PsfXaU"
    ></recaptcha>
  `,
  directives: [RecaptchaComponent],
}) 
export class MyApp {
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }
}

bootstrap(MyApp, [
  provide(RecaptchaLoaderService, {
    useValue: new RecaptchaLoaderService("de"),
  })
]);
