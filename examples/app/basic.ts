import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './examples/app/basic.html',
})
export class MyApp {
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }
}
