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
  states: Array<string>;
  flag: TCountryFlags;
  phoneNumberCode: string;
  timezone: Array<string>;
};
