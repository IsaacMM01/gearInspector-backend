import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { $ref } from '../../schemas/schemas';
import { createUser, login, logout } from './user.controller';

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
      preHandler: [fastify.authenticate]
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

  fastify.delete(
    '/logout',
    { preHandler: [fastify.authenticate] },
    logout
  );

  fastify.log.info('user routes registered');
}