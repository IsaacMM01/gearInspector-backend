import { PrismaClient } from '@prisma/client';
import fastifyPrisma from '@joggr/fastify-prisma';
import { FastifyInstance } from 'fastify';

export const prisma = new PrismaClient();


export async function prismaPlugin(fastify: FastifyInstance) {
  fastify.register(fastifyPrisma, {
    client: prisma,
  });
}