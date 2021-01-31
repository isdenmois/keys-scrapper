import dotenv from 'dotenv';

dotenv.config();

function getEnv(param, defaultValue) {
  return process.env[param] || defaultValue;
}

function getInt(param, defaultValue) {
  return Number(getEnv(param)) || defaultValue;
}

export const config = {
  PORT: getEnv('PORT', 3000),
  SCRAPPER_TIMEOUT: getInt('SCRAPPER_TIMEOUT', 5),
  ETH_API_URL: getEnv('ETH_API_URL'),
  BTC_API_URL: getEnv('BTC_API_URL'),
};

console.log(config);
