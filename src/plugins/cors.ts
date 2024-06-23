import fastifyCors from '@fastify/cors';
import { FastifyInstance } from 'fastify';

export default async function corsPlugin(fastify: FastifyInstance) {
  fastify.register(fastifyCors, {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
  });
}