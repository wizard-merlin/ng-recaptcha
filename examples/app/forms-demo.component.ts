import { Component } from '@angular/core';

export class FormModel {
  constructor(private captcha?: string) { }
}

@Component({
  selector: 'recaptcha-demo',
  styles: [`
      .error { color: crimson; }
      .success { color: green; }
  ` ],
  templateUrl: './examples/app/forms-demo.component.html',
})
export class FormsDemoComponent {
  formModel = new FormModel();
}
