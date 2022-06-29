export type TCountryFlags = {
  emoji: string;
  unicode: string;
  image: string;
};

export type TFinalFormat = {
  country: string;
  alpha2Code: string;
  alpha3Code: string;
  numberCode: number;
  capital: string;
  currency: string;
  phoneNumberCode: string;
  flag: TCountryFlags;
  timezone: Array<string>;
  states: Array<string>;
};
