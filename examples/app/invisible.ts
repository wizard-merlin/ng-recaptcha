import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './examples/app/invisible.html',
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
