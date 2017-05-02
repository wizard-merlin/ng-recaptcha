import { Component } from '@angular/core';

const sitekey = '6LcOuyYTAAAAAHTjFuqhA52fmfJ_j5iFk5PsfXaU';
const invisibleSitekey = '6Ldp0xgUAAAAAF_iIss_hpFaVrjLbPGjwyfJwebB';

@Component({
  selector: 'recaptcha-demo',
  templateUrl: './examples/app/all-in-one-demo.component.html',
})
export class AllInOneDemoComponent {
  public captchaResponse: string = '';

  public sitekey: string = sitekey;
  public theme: ReCaptchaV2.Theme = 'light';
  public type: ReCaptchaV2.Type = 'image';
  public size: ReCaptchaV2.Size | 'invisible' = 'normal';
  public tabIndex: number = 0;
  public badge: 'bottomright' | 'bottomleft' | 'inline' = 'bottomright';
  public language: '' | 'en' | 'fr' = '';

  public resolved(captchaResponse: string) {
    const newResponse = captchaResponse
      ? `${captchaResponse.substr(0, 7)}...${captchaResponse.substr(-7)}`
      : captchaResponse;
    this.captchaResponse += `${JSON.stringify(newResponse)}\n`;
  }

  public updateSitekey(size: ReCaptchaV2.Size | 'invisible'): void {
    this.sitekey = size === 'invisible' ? invisibleSitekey : sitekey;
  }
}
