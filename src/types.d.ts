export type TCountryFlags = {
  emoji: string;
  unicode: string;
  image: string;
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
};
