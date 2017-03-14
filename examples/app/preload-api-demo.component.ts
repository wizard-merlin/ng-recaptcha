import { Component } from '@angular/core';

@Component({
  selector: 'recaptcha-demo',
  templateUrl: './examples/app/preload-api-demo.component.html',
})
export class PreloadApiDemoComponent {
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }
}
