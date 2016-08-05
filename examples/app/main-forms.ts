import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component, provide } from '@angular/core';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { 
  RecaptchaComponent, 
  RecaptchaLoaderService,
} from 'ng2-recaptcha/ng2-recaptcha';
import { RecaptchaValueAccessor } from 'ng2-recaptcha/ng2-recaptcha.forms';

@Component({
  selector: 'my-app',
  styles: [ `
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
        #captcha
        #captchaControl="ngModel"
      ></recaptcha>
      <div [hidden]="captchaControl.valid || captchaControl.pristine" class="error">Captcha must be solved</div>
      <div [hidden]="!captchaControl.valid" class="success">Captcha is valid</div>
      <div [hidden]="captchaProtectedForm.form.valid" class="error">The form must be filled out</div>
      <div [hidden]="!captchaProtectedForm.form.valid" class="success">The form is valid</div>
      <a class="button small" (click)="formModel.captcha = ''"><span>Reset Captcha</span></a>
    </form>
  `,
  directives: [RecaptchaComponent, RecaptchaValueAccessor],
}) 
export class MyApp {
  formModel = new FormModel();
}

class FormModel {
    constructor(private captcha?: string) { }
}

bootstrap(MyApp, [
    RecaptchaLoaderService,
    disableDeprecatedForms(),
    provideForms(),
]);
