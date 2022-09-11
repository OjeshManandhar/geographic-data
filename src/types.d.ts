export type TCountryFlags = {
  emoji: string;
  unicode: string;
  image: string;
};

export type TLanguage = {
  name: string;
  ianaCode: string;
  alpha2Code: string;
  nativeName: string;
};

export type TFinalFormat = {
  country: string;
  nativeName: string;
  alpha2Code: string;
  alpha3Code: string;
  numberCode: number;
  continentCode: string;
  capital: string;
  currencyCode: string;
  phoneNumberCode: string;
  flag: TCountryFlags;
  timezone: Array<string>;
  states: Array<string>;
  language: TLanguage;
};
