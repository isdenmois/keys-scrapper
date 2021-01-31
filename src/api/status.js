import { loadFoundKeys, loadStat } from '../db.js';

export const statusRoute = {
  method: 'GET',
  path: '/api/status',
  async handler() {
    const page = await loadStat();
    const found = await loadFoundKeys();

    return { page, found };
  },
};
