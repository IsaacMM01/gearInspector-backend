import './types/types'
import Fastify from 'fastify';

import { prismaPlugin } from './plugins/prisma';
import corsPlugin from './plugins/cors';
import jwtPlugin from './plugins/jwt';
import cookiePlugin from './plugins/cookie';

import authenticate from './services/auth.service';

import routes from './routes';
import userSchemas from './routes/users/user.schema';

const fastify = Fastify({ logger: true });
fastify.decorate('authenticate',authenticate);

async function start() {
  await userSchemas(fastify);

  await prismaPlugin(fastify);
  await corsPlugin(fastify);
  await jwtPlugin(fastify);
  await cookiePlugin(fastify);

  await routes(fastify);
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server is running at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();