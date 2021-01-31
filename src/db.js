import { promisify } from 'util';
import { appendFile, writeFile, readFile } from 'fs';

const FOUND_FILE = 'found.txt';
const STAT_FILE = 'page.json';

const append = promisify(appendFile);
const write = promisify(writeFile);
const read = promisify(readFile);

export function addKey(row) {
  return append(FOUND_FILE, JSON.stringify(row) + ',\n', { encoding: 'utf-8' });
}

export function updateStat(data) {
  return write(STAT_FILE, JSON.stringify(data), { encoding: 'utf-8' });
}

export async function loadStat() {
  const page = await read(STAT_FILE, { encoding: 'utf-8' }).catch(() => '{}');

  return JSON.parse(page);
}

export async function loadFoundKeys() {
  const found = await read(FOUND_FILE, { encoding: 'utf-8' }).catch(() => ',');

  return JSON.parse(`[${found.trim().slice(0, -1)}]`);
}
