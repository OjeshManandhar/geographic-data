import { readJSONFile, writeJSONFile } from './utils';

// types
import type { TFinalFormat } from './types';

// copy currencies

const currenciesCopy = readJSONFile<
  Array<{
    code: string;
    name: string;
    name_plural: string;
    symbol: string;
    symbol_native: string;
    decimal_digits: number;
    rounding: number;
  }>
>('currencies');

writeJSONFile(currenciesCopy, 'currencies');

// copy continents

const continentsMap = readJSONFile<{ [index: string]: string }>('continents');

const continents: Array<{ code: string; name: string }> = [];
for (const [code, name] of Object.entries(continentsMap)) {
  continents.push({ code, name });
}

writeJSONFile(continents, 'continents');

let finalData: Array<Partial<TFinalFormat>> = [];

// name, states, alpha codes, number code

const countriesWithState = readJSONFile<
  Array<{
    country: string;
    alpha2Code: string;
    alpha3Code: string;
    numberCode: string;
    states: Array<string>;
  }>
>('countries-state');

finalData = countriesWithState.map(data => ({
  ...data,
  numberCode: parseInt(data.numberCode, 10),
}));

// flags

const countryFlags = readJSONFile<
  Array<{
    name: string;
    code: string;
    emoji: string;
    unicode: string;
    image: string;
  }>
>('country-flag');

finalData = finalData.map(data => {
  const flag = countryFlags.find(flag => flag.code === data.alpha2Code);

  if (!flag) {
    console.log(`===== No flag found for: ${data.alpha2Code} =====`);

    return data;
  }

  data.flag = {
    emoji: flag.emoji,
    unicode: flag.unicode,
    image: flag.image,
  };

  return data;
});

// phone number code

const countryPhoneNumbers = readJSONFile<
  Array<{
    country: string;
    code: string;
    iso: string;
  }>
>('country-phone-code-2');

finalData = finalData.map(data => {
  const phoneNumber = countryPhoneNumbers.find(
    phoneNumber => phoneNumber.iso === data.alpha2Code,
  );

  if (!phoneNumber) {
    console.log(`===== No phoneNumber found for: ${data.alpha2Code} =====`);

    return data;
  }

  data.phoneNumberCode = phoneNumber.code;

  return data;
});

// time zone

const countryTimeZones = readJSONFile<{ [index: string]: Array<string> }>(
  'timezones',
);

finalData = finalData.map(data => {
  const timeZone = countryTimeZones[data.alpha2Code as string];

  if (!timeZone) {
    console.log(`===== No timeZone found for: ${data.alpha2Code} =====`);

    return data;
  }

  data.timezone = timeZone;

  return data;
});

// continent, currency and capital

const countyMeta = readJSONFile<
  Array<{
    continent_name: string;
    country_code: string;
    country_name: string;
    continent_code: string;
    capital_name: string;
    currency_code: string;
    phone_code: string;
    three_letter_country_code: string;
  }>
>('country-continent');

finalData = finalData.map(data => {
  const currency = countyMeta.find(
    currency => currency.country_code === data.alpha2Code,
  );

  if (!currency) {
    console.log(`===== No currency found for: ${data.alpha2Code} =====`);

    return data;
  }

  data.capital = currency.capital_name;
  data.currencyCode = currency.currency_code;
  data.continentCode = currency.continent_code;

  return data;
});

// check

finalData.forEach(data => {
  if (!data.country) {
    console.log(`===== No country found for: ${data.country} =====`);
  }
  if (!data.alpha2Code) {
    console.log(`===== No alpha2Code found for: ${data.country} =====`);
  }
  if (!data.alpha3Code) {
    console.log(`===== No alpha3Code found for: ${data.country} =====`);
  }
  if (!data.numberCode) {
    console.log(`===== No numberCode found for: ${data.country} =====`);
  }
  if (!data.states || !data.states.length) {
    console.log(`===== No states found for: ${data.country} =====`);
  }
  if (!data.flag || !data.flag.emoji) {
    console.log(`===== No flag.emoji found for: ${data.country} =====`);
  }
  if (!data.flag || !data.flag.unicode) {
    console.log(`===== No flag.unicode found for: ${data.country} =====`);
  }
  if (!data.flag || !data.flag.image) {
    console.log(`===== No flag.image found for: ${data.country} =====`);
  }
  if (!data.phoneNumberCode) {
    console.log(`===== No phoneNumberCode found for: ${data.country} =====`);
  }
  if (!data.timezone || !data.timezone.length) {
    console.log(`===== No timezone found for: ${data.country} =====`);
  }
  if (!data.currencyCode) {
    console.log(`===== No currency found for: ${data.country} =====`);
  }
  if (!data.capital) {
    console.log(`===== No capital found for: ${data.country} =====`);
  }
  if (!data.continentCode) {
    console.log(`===== No continentCode found for: ${data.country} =====`);
  }
});

writeJSONFile(finalData, 'list');

// seed files

// continent and currencies

const currenciesSeed = readJSONFile<
  Array<{
    code: string;
    name: string;
    name_plural: string;
    symbol: string;
    symbol_native: string;
    decimal_digits: number;
    rounding: number;
  }>
>([__dirname, 'generated', 'currencies.json']);

writeJSONFile(currenciesSeed, [__dirname, 'seedable', 'currencies.json']);

const continentsSeed = readJSONFile<
  Array<{
    code: string;
    name: string;
  }>
>([__dirname, 'generated', 'continents.json']);

writeJSONFile(currenciesSeed, [__dirname, 'seedable', 'continents.json']);

const countries: Array<{
    id: number;
    name: string;
    alpha2Code: string;
    alpha3code: string;
    numberCode: number;
    phoneNumberCode: string;
    timezone: Array<string>;
    capital: string;
    currencyCode: string;
    continentCode: string;
  }> = [],
  flags: Array<{
    countryId: number;
    emoji: string;
    unicode: string;
    image: string;
  }> = [],
  states: Array<{
    countryId: number;
    name: string;
  }> = [];

const countriesSeed = readJSONFile<Array<TFinalFormat>>([
  __dirname,
  'generated',
  'list.json',
]);

countriesSeed.forEach((data, index) => {
  const countryId = index + 1;

  countries.push({
    id: countryId,
    name: data.country,
    alpha2Code: data.alpha2Code,
    alpha3code: data.alpha3Code,
    numberCode: data.numberCode,
    continentCode: data.continentCode,
    capital: data.capital,
    phoneNumberCode: data.phoneNumberCode,
    currencyCode: data.currencyCode,
    timezone: data.timezone,
  });

  data.states.forEach(state => {
    states.push({
      countryId,
      name: state,
    });
  });

  flags.push({
    countryId,
    emoji: data.flag.emoji,
    unicode: data.flag.unicode,
    image: data.flag.image,
  });
});

writeJSONFile(flags, [__dirname, 'seedable', 'flags.json']);
writeJSONFile(states, [__dirname, 'seedable', 'states.json']);
writeJSONFile(countries, [__dirname, 'seedable', 'countries.json']);
