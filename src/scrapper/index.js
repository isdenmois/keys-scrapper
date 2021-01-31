import { btcCheck } from './btc.js';
import { ethCheck } from './ethereum.js';
import { nextPage, genPage } from './page-gen.js';
import { loadStat, updateStat } from '../db.js';

let total = 0n;
let page = genPage();
async function scrapper() {
  await updateStat({ total: String(++total), current: String(page) });
  await btcCheck(page).catch(e => console.error(e));
  await ethCheck(page).catch(e => console.error(e));

  setTimeout(scrapper);
  page = nextPage(page);
}

loadStat()
  .then(stat => {
    total = stat?.total ? BigInt(stat.total) : 0n;
  })
  .catch(() => null)
  .then(scrapper);
