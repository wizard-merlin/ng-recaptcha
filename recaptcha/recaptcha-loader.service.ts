import {
  Inject,
  Injectable,
  OpaqueToken,
  Optional,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export const RECAPTCHA_LANGUAGE = new OpaqueToken('recaptcha-language');

@Injectable()
export class RecaptchaLoaderService {
  /**
   * @internal
   * @nocollapse
   */
  private static ready: BehaviorSubject<ReCaptchaV2.ReCaptcha> = new BehaviorSubject<ReCaptchaV2.ReCaptcha>(null);

  /**
   * @internal
   * @nocollapse
   */
  private static setup(): void {
    window.ng2recaptchaloaded = window.ng2recaptchaloaded || (() => {
      RecaptchaLoaderService.ready.next(grecaptcha);
    });
  }

  public ready: Observable<ReCaptchaV2.ReCaptcha>;

  /** @internal */
  private language: string;

  constructor( @Optional() @Inject(RECAPTCHA_LANGUAGE) language?: string) {
    this.language = language;
    if (language) {
      console.warn('"RECAPTCHA_LANGUAGE" OpaqueToken has been deprecated and will be removed in the next ' +
        'major release. Provide "RecaptchaDefaults" instead ' +
        'to specify the language, or specify it via input property of RecaptchaComponent: ' +
        '<re-captcha [language]="fr"></re-captcha>.');
    }
    RecaptchaLoaderService.setup();
    this.ready = RecaptchaLoaderService.ready.asObservable();
  }

  public reload(): void {
    if (RecaptchaLoaderService.ready.getValue() !== null) {
      RecaptchaLoaderService.ready.next(null);
    }
    this.init();
  }

  public load(newLanguage: string): void {
    if (RecaptchaLoaderService.ready.getValue() !== null) {
      // there's a loaded grecaptcha already; check if we need to reload it
      if (this.language === newLanguage || (!this.language && !newLanguage)) {
        return;
      }
    }

    this.language = newLanguage;
    this.reload();
  }

  /** @internal */
  private init() {
    if (RecaptchaLoaderService.ready) {
      if (RecaptchaLoaderService.ready.getValue()) {
        return;
      }
    }

    const script = document.createElement('script') as HTMLScriptElement;
    script.innerHTML = '';
    const langParam = this.language ? '&hl=' + this.language : '';
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit&onload=ng2recaptchaloaded${langParam}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
}
