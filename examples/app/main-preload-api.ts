import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component, Injectable, provide } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { 
  RecaptchaComponent, 
  RecaptchaLoaderService,
} from 'ng2-recaptcha/ng2-recaptcha';

@Injectable()
export class PreloadedRecaptchaAPIService {
  public ready: Observable<ReCaptchaV2.ReCaptcha>;

  constructor() { 
    let readySubject = new BehaviorSubject<ReCaptchaV2.ReCaptcha>(grecaptcha);
    this.ready = readySubject.asObservable();
  }
}

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
    useValue: new PreloadedRecaptchaAPIService(),
  })
]);
