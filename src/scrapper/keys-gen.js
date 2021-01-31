import { execSync } from 'child_process';

export async function genKeys(type, page) {
  // TODO: use async version of exec
  const str = execSync(`keys-generator ${type} ${page}`).toString();

  return str.split('\n').map(s => {
    const [privateKey, publicKey, publicKey2] = s.slice(1, -1).split(' ');

    return { privateKey, publicKey, publicKey2 };
  });
}
