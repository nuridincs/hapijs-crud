'use strict';

const Route = require('./lib/route');
const Hapi = require('hapi');
const server = Hapi.server({
  host: 'localhost',
  port: 8001,
  routes: {
    cors: true
  }
});

async function start() {
  try {
    await server.route(Route.load);
    await  server.register({
      plugin: require('./lib/plugin/knex'),
      options: {
        client: 'pg',
        connection: 'postgres://postgres:root@localhost:5432/jubelio',
        searchPath: ['knex', 'public']
      }
    });
    await server.start();
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
};

start();
