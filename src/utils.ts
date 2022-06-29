import fs from 'fs';
import path from 'path';

const SOURCE_DIR = 'sources',
  DESTINATION_DIR = 'created';

export function readJSONFile<T extends object>(fileName: string): T {
  const filePath = path.join(__dirname, SOURCE_DIR, fileName + '.json');

  const content = require(filePath);

  return content as T;
}

export function writeJSONFile(content: Array<object>, fileName: string) {
  const filePath = path.join(__dirname, DESTINATION_DIR, fileName + '.json');

  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath);
  }

  fs.writeFile(filePath, JSON.stringify(content, null, 2) + '\n', err => {
    if (err) {
      console.error(err);
    }
  });
}
