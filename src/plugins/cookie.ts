import fCookie from '@fastify/cookie';
import bcrypt from 'bcrypt';
import { FastifyInstance } from 'fastify';

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

export default async function cookiePlugin(fastify: FastifyInstance) {
  const secret = await bcrypt.hash(myPlaintextPassword, saltRounds);

  fastify.register(fCookie, {
    secret,
    hook: 'preHandler',
  });
}