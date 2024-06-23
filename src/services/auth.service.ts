import { FastifyReply, FastifyRequest } from 'fastify';
import '../types/types'
import { FastifyJWT } from '@fastify/jwt';

export default async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const token = req.cookies.access_token ?? req.headers.authorization;
  if (!token) {
    return reply.status(401).send({ message: 'Authentication required' });
  }
  try {
    const decoded = req.jwt.verify<FastifyJWT['user']>(token);
    req.user = decoded;
  } catch (err) {
    return reply.status(401).send({ message: 'Invalid token' });
  }
}