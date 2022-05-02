import { Md5 as md5 } from 'ts-md5/dist/md5';

export function getArrayHash(stringArray: string[]): string {
  return stringArray.length > 0 ? md5.hashStr(stringArray.sort().join()) : '';
}
