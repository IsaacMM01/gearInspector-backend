import { FastifyInstance } from 'fastify';
import userRoutes from './users/user.route';
import { getUsers } from './users/user.controller';

export default async function routes(fastify: FastifyInstance) {
  fastify.register(userRoutes, { prefix: 'api/users' });

  //protected routes
  
    fastify.get(
        '/',
        {
          preHandler: [fastify.authenticate],
        },
        getUsers
    )
}