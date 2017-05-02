import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { RecaptchaDefaults } from './recaptcha-defaults';
import { RecaptchaLoaderService } from './recaptcha-loader.service';

let nextId = 0;

@Component({
  exportAs: 'reCaptcha',
  selector: 're-captcha',
  template: ``,
})
export class RecaptchaComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input()
  @HostBinding('attr.id')
  public id = `ngrecaptcha-${nextId++}`;

  @Input() public siteKey: string;
  @Input() public theme: ReCaptchaV2.Theme;
  @Input() public type: ReCaptchaV2.Type;
  @Input() public size: ReCaptchaV2.Size;
  @Input() public tabIndex: number;
  @Input() public badge: ReCaptchaV2.Badge;
  @Input() public language: string;

  @Output() public resolved = new EventEmitter<string>();

  /** @internal */
  private subscription: Subscription;
  /** @internal */
  private widget: number;
  /** @internal */
  private grecaptcha: ReCaptchaV2.ReCaptcha;

  constructor(
    private loader: RecaptchaLoaderService,
    private zone: NgZone,
    private container: ElementRef,
    @Optional() defaults: RecaptchaDefaults,
  ) {
    if (defaults) {
      this.siteKey = defaults.siteKey;
      this.theme = defaults.theme;
      this.type = defaults.type;
      this.size = defaults.size;
      this.tabIndex = defaults.tabIndex;
      this.badge = defaults.badge;
      this.language = defaults.language;
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // tslint:disable-next-line:no-string-literal
    const languageChange = changes['language'];
    if (languageChange) {
      if (this.loader.load instanceof Function) {
        this.reset();
        this.loader.load(languageChange.currentValue);
      } else {
        if (this.grecaptcha) {
          console.warn('Changing recaptcha language is not supported. Implement a `load(newLanguage)` '
            + 'function in your custom `RecaptchaLoaderService` implementation');
        }
      }
    } else {
      if (this.loader.reload instanceof Function) {
        this.reset();
        this.loader.reload();
      } else {
        if (this.grecaptcha) {
          console.warn('Changing recaptcha properties is not supported. Implement a `reload()` '
            + 'function in your custom `RecaptchaLoaderService` implementation');
        }
      }
    }
  }

  public ngAfterViewInit() {
    if (this.loader.load instanceof Function) {
      // backwards-compatibility with custom loaders
      this.loader.load(this.language);
    }
    this.subscription = this.loader.ready.subscribe((grecaptcha: ReCaptchaV2.ReCaptcha) => {
      if (grecaptcha != null) {
        this.grecaptcha = grecaptcha;
        this.renderRecaptcha();
      }
    });
  }

  public ngOnDestroy() {
    // reset the captcha to ensure it does not leave anything behind
    // after the component is no longer needed
    this.grecaptchaReset();
    this.subscription.unsubscribe();
  }

  /**
   * Executes the invisible recaptcha.
   * Does nothing if component's size is not set to "invisible".
   */
  public execute(): void {
    if (this.size !== 'invisible') {
      return;
    }

    if (this.widget != null) {
      this.grecaptcha.execute(this.widget);
    }
  }

  public reset() {
    if (this.widget != null) {
      if (this.grecaptcha.getResponse(this.widget)) {
        // Only emit an event in case if something would actually change.
        // That way we do not trigger "touching" of the control if someone does a "reset"
        // on a non-resolved captcha.
        this.resolved.emit(null);
      }

      this.grecaptchaReset();
    }
  }

  /** @internal */
  private expired() {
    this.resolved.emit(null);
  }

  /** @internal */
  private captchaResponseCallback(response: string) {
    this.resolved.emit(response);
  }

  /** @internal */
  private grecaptchaReset() {
    if (this.widget != null) {
      this.zone.runOutsideAngular(() => this.grecaptcha.reset(this.widget));
    }
  }

  /** @internal */
  private renderRecaptcha() {
    const element: HTMLElement = this.container.nativeElement;
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    this.widget = this.grecaptcha.render(this.id, {
      badge: this.badge,
      callback: (response: string) => {
        this.zone.run(() => this.captchaResponseCallback(response));
      },
      'expired-callback': () => {
        this.zone.run(() => this.expired());
      },
      sitekey: this.siteKey,
      size: this.size,
      tabindex: this.tabIndex,
      theme: this.theme,
      type: this.type,
    });
  }
}
