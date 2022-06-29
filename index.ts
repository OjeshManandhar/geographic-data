const world = 'world';

import { testStr } from './data/test';

export function hello(who: string = world): string {
  return `Hello ${who}! `;
}

console.log('hello():', hello());
console.log('testStr():', hello(testStr));
