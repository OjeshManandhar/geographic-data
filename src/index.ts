import { readJSONFile, writeJSONFile } from './utils';

// types
import type { TFinalFormat } from './types';

let finalData: Array<Partial<TFinalFormat>> = [];

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

// console.log('finalData:', finalData);

const flags = readJSONFile<
  Array<{
    name: string;
    code: string;
    emoji: string;
    unicode: string;
    image: string;
  }>
>('country-flag');

finalData = finalData.map(data => {
  const flag = flags.find(flag => flag.code === data.alpha2Code);

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

writeJSONFile(finalData, 'list');
