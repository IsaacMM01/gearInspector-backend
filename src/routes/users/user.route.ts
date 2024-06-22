import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import prisma from '../../plugins/prisma';
import { $ref } from './user.schema';
import { createUser, login } from './user.controller';

export default async function userRoutes(
  fastify: FastifyInstance,
) {

  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({message: '/ route hit'})
  })

  fastify.post(
    '/register',
    {
      schema: {
        body: $ref('createUserSchema'),
        response: {
          201: $ref('createUserResponseSchema'),
        },
      },
    },
    createUser,
  );

  fastify.post(
    '/login',
    {
      schema: {
        body: $ref('loginSchema'),
        response: {
          201: $ref('loginResponseSchema'),
        },
      },
    },
    login
  );

  fastify.delete('/logout', async () => {});

  fastify.log.info('user routes registered');
}