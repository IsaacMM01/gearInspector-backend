import Fastify, { FastifyReply, FastifyRequest } from 'fastify';

//plugins
import fastifyCors from '@fastify/cors';
import fjwt, { FastifyJWT } from '@fastify/jwt'
import fCookie from '@fastify/cookie'
import fastifyPrisma from '@joggr/fastify-prisma';

//plugins on the sistem
import prisma from './plugins/prisma';

//schemas
import { userSchemas } from './routes/users/user.schema';

//routes
import userRoutes from './routes/users/user.route';

import './types/types'

const fastify = Fastify({ logger: true });

fastify.register(fastifyCors, {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST'],
  credentials: true,
});

fastify.register(fjwt, {
  secret: 'supersecret-nmms-jaja'
})

fastify.addHook('preHandler', (req, res, next) => {
  req.jwt = fastify.jwt
  return next()
})

fastify.register(fCookie, {
  secret: 'some-secret-key',
  hook: 'preHandler',
})

for (let schema of [...userSchemas]) {
  fastify.addSchema(schema)
}

fastify.register(fastifyPrisma, {
  client: prisma,
});

fastify.register(userRoutes, { prefix: 'api/users' });


const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server is running at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();