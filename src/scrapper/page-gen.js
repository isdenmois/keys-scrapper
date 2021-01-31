import random from 'random-bigint';
import { config } from '../config.js';

const MAX = 904625697166532776746648320380374280100293470930272690489102837043110636675n;

let start = 0;
const TRESHHOLD = config.SCRAPPER_TIMEOUT * 1000;

export function nextPage(prevPage) {
  if (Date.now() - start > TRESHHOLD) {
    start = Date.now();
    return genPage();
  }

  return prevPage + 1n;
}

export function genPage() {
  return random(256) % MAX;
}
