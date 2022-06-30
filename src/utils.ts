import fs from 'fs';
import path from 'path';

const SOURCE_DIR = 'sources',
  DESTINATION_DIR = 'generated';

export function readJSONFile<T extends object>(fileName: string | string[]): T {
  const filePath =
    typeof fileName === 'string'
      ? path.join(__dirname, SOURCE_DIR, fileName + '.json')
      : path.join(...fileName);

  const content = require(filePath);

  return content as T;
}

export function writeJSONFile(
  content: Array<object>,
  fileName: string | string[],
) {
  const filePath =
    typeof fileName === 'string'
      ? path.join(__dirname, DESTINATION_DIR, fileName + '.json')
      : path.join(...fileName);

  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath);
  }

  fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
}
