import { BrowserModule }  from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng2-recaptcha';

import { FormModel } from './form';

@Component({
  selector: 'my-app',
  styles: [`
      .error { color: crimson; }
      .success { color: green; }
  ` ],
  template: `
    <form #captchaProtectedForm="ngForm">
      <recaptcha
        [(ngModel)]="formModel.captcha"
        name="captcha"
        required
        siteKey="6LcOuyYTAAAAAHTjFuqhA52fmfJ_j5iFk5PsfXaU"
        #captchaControl="ngModel"
      ></recaptcha>
      <div [hidden]="captchaControl.valid || captchaControl.pristine" class="error">Captcha must be solved</div>
      <div [hidden]="!captchaControl.valid" class="success">Captcha is valid</div>
      <div [hidden]="captchaProtectedForm.form.valid" class="error">The form must be filled out</div>
      <div [hidden]="!captchaProtectedForm.form.valid" class="success">The form is valid</div>
      <a class="button small" (click)="formModel.captcha = ''"><span>Reset Captcha</span></a>
    </form>
  `,
})
export class MyApp {
  formModel = new FormModel();
}

@NgModule({
  bootstrap: [MyApp],
  declarations: [MyApp],
  imports: [RecaptchaModule.forRoot(), BrowserModule, FormsModule],
})
export class MyAppModule { }

platformBrowserDynamic().bootstrapModule(MyAppModule);
