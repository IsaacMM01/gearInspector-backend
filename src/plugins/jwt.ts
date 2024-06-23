import fjwt from '@fastify/jwt';
import bcrypt from 'bcrypt';
import { FastifyInstance } from 'fastify';
import '../types/types';

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

export default async function jwtPlugin(fastify: FastifyInstance) {
  const secret = await bcrypt.hash(myPlaintextPassword, saltRounds);

  fastify.register(fjwt, {
    secret
  });

  fastify.addHook('preHandler', (req, res, next) => {
    req.jwt = fastify.jwt;
    return next();
  });
}