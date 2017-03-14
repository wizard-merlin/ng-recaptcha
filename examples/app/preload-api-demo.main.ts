import { BrowserModule }  from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Injectable, NgModule } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { RecaptchaModule, RecaptchaLoaderService } from 'ng-recaptcha';

import { PreloadApiDemoComponent } from "./preload-api-demo.component";

@Injectable()
export class PreloadedRecaptchaAPIService {
  public ready: Observable<ReCaptchaV2.ReCaptcha>;

  constructor() {
    let readySubject = new BehaviorSubject<ReCaptchaV2.ReCaptcha>(grecaptcha);
    this.ready = readySubject.asObservable();
  }
}

@NgModule({
  bootstrap: [PreloadApiDemoComponent],
  declarations: [PreloadApiDemoComponent],
  imports: [BrowserModule, RecaptchaModule.forRoot()],
  providers: [
    {
      provide: RecaptchaLoaderService,
      useValue: new PreloadedRecaptchaAPIService(),
    },
  ],
})
export class DemoModule { }

platformBrowserDynamic().bootstrapModule(DemoModule);
