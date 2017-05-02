export interface RecaptchaDefaults {
  siteKey?: string;
  theme?: ReCaptchaV2.Theme;
  type?: ReCaptchaV2.Type;
  size?: ReCaptchaV2.Size | 'invisible';
  tabIndex?: number;
  badge?: 'bottomright' | 'bottomleft' | 'inline';
  language?: string;
}

export class RecaptchaDefaults {
  constructor(options: RecaptchaDefaults) {
    Object.assign(this, options);
  }
}
