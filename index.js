'use strict';

import Hapi from '@hapi/hapi';
import './src/scrapper/index.js';
import { statusRoute } from './src/api/status.js';

const init = async port => {
  const server = Hapi.server({ port });

  server.route(statusRoute);
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello World!';
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init(process.env.PORT || 3000);
