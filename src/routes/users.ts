import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import prisma from '../plugins/prisma';

export default async function userRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get('/users', async (request, reply) => {
      const users = await prisma.user.findMany();
      return users;
    });
  
    fastify.post('/users', async (request, reply) => {
      const { email, name } = request.body as { email: string; name?: string };
      const user = await prisma.user.create({
        data: { email, name },
      });
      return user;
    });
}