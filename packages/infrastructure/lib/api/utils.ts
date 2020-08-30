import * as crypto from 'crypto';
import * as fs from 'fs';

export const hashFile = (path: string) => {
  fs.readFileSync(path);
  const hash = crypto.createHash('md5');
  hash.update(fs.readFileSync(path))
  return hash.digest("hex");
}
