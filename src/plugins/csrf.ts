import csrf from '@fastify/csrf-protection';
import { FastifyInstance } from 'fastify';

export default async function csrfPlugin(fastify: FastifyInstance) {
  fastify.register(csrf, {
    cookieOpts: {
      signed: true,
    },
  });
}