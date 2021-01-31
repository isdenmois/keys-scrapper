import axios from 'axios';
import { config } from '../config.js';
import { addKey } from '../db.js';
import { genKeys } from './keys-gen.js';

const apiCallDelayMs = 200;
const chunkSize = 20;
const type = 'eth';

export async function ethCheck(page) {
  console.log(`${type}, Page: ${page}`);

  const keys = await genKeys('eth', page.toString());

  await checkKeys(page, keys);
}

async function checkKeys(page, addresses) {
  const result = [];

  for (let i = 0, j = addresses.length; i < j; i += chunkSize) {
    const keysChunk = addresses.slice(i, i + chunkSize);
    const chunkResult = await loadBalanceForKeys(keysChunk);

    chunkResult?.forEach?.(async address => {
      if (address.balance != '0' || address.balance > 0) {
        const key = keysChunk.find(k => k.publicKey === address.account);
        result.push({ page, address, key });

        console.log('FOUND!', { type, page, address, key });

        await addKey({ type, page, address, key }).catch(e => console.log(e));
      }
    });

    await sleep(apiCallDelayMs);
  }

  return result;
}

function loadBalanceForKeys(keys) {
  const addresses = keys.map(w => w.publicKey);
  const url = config.ETH_API_URL.replace('{{address}}', addresses);

  return axios
    .get(url)
    .then(response => response?.data?.result || [])
    .catch(() => []);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
