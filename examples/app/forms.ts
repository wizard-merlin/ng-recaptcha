import { Component } from '@angular/core';

export class FormModel {
  constructor(private captcha?: string) { }
}

@Component({
  selector: 'my-app',
  styles: [`
      .error { color: crimson; }
      .success { color: green; }
  ` ],
  templateUrl: './examples/app/forms.html',
})
export class MyApp {
  formModel = new FormModel();
}
