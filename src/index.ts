import Fastify from 'fastify';
import fastifyCors from '@fastify/cors'

import fastifyPrisma from '@joggr/fastify-prisma';
import prisma from './plugins/prisma';
import userRoutes from './routes/users';

const fastify = Fastify();

fastify.register(fastifyCors, {
    hook: 'preHandler',
    origin: 'http://localhost:4200'
});

fastify.register(fastifyPrisma, {
    client: prisma,
});

fastify.register(userRoutes);

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