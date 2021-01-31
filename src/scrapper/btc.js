import axios from 'axios';
import { config } from '../config.js';
import { addKey } from '../db.js';
import { genKeys } from './keys-gen.js';

const type = 'btc';

export async function btcCheck(page) {
  console.log(`${type}, Page: ${page}`);

  const addresses = await genKeys('btc', page.toString());

  await checkKeys(page, addresses);
  await checkKeys(
    page,
    addresses.map(a => Object.assign({}, a, { publicKey: a.publicKey2 })),
  );
}

async function checkKeys(page, addresses) {
  const chunkResult = await loadBalanceForKeys(addresses);

  chunkResult?.forEach?.(async address => {
    if (address.n_tx > 0) {
      const key = addresses.find(k => k.publicKey === address.publicKey);

      console.log('FOUND!', { type, page, address, key });

      await addKey({ type, page, address, key }).catch(e => console.log(e));
    }
  });
}

function loadBalanceForKeys(keys) {
  const addresses = keys.map(w => w.publicKey);
  const url = config.BTC_API_URL.replace('{{address}}', addresses);

  return axios
    .get(url)
    .then(response => (response.data ? objToArray(response.data) : []))
    .catch(() => []);
}

function objToArray(obj) {
  const result = [];

  for (let key in obj) {
    result.push(Object.assign({}, obj[key], { publicKey: key }));
  }

  return result;
}
