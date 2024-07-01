import { FastifyInstance } from 'fastify';
import userRoutes from './users/user.route';
import { getUsers } from './users/user.controller';
import inspectRoutes from './gear_inpection/inspection.route';

export default async function routes(fastify: FastifyInstance) {
  fastify.register(userRoutes, { prefix: 'api/users' });
  fastify.register(inspectRoutes, {prefix: 'api/inspection'});

  //protected routes
  
  fastify.get(
      '/',
      {
        preHandler: [fastify.authenticate],
      },
      getUsers
  )
}