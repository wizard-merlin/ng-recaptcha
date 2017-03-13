import { BrowserModule }  from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, NgModule } from '@angular/core';
import { RecaptchaNoFormsModule } from 'ng2-recaptcha/ng2-recaptcha.noforms';

@Component({
  selector: 'my-app',
  template: `
    <recaptcha
      #captcha="reCaptcha"
      (resolved)="resolved($event)"
      siteKey="6Ldp0xgUAAAAAF_iIss_hpFaVrjLbPGjwyfJwebB"
      size="invisible"
    ></recaptcha>
    <button (click)="captcha.execute()">Submit</button>
    <button (click)="captcha.reset()">Reset</button>
    <pre>{{ captchaResponse }}</pre>
  `,
})
export class MyApp {
  public captchaResponse: string = '';
  public resolved(captchaResponse: string) {
    let newResponse = captchaResponse
      ? `${captchaResponse.substr(0, 7)}...${captchaResponse.substr(-7)}`
      : captchaResponse;
    this.captchaResponse += `${JSON.stringify(newResponse)}\n`;
  }
}

@NgModule({
  bootstrap: [MyApp],
  declarations: [MyApp],
  imports: [BrowserModule, RecaptchaNoFormsModule.forRoot()],
})
export class MyAppModule { }

platformBrowserDynamic().bootstrapModule(MyAppModule);
