import Fastify, { FastifyReply, FastifyRequest } from 'fastify';

//plugins
import fastifyCors from '@fastify/cors';
import fjwt, { FastifyJWT } from '@fastify/jwt'
import csrf, { fastifyCsrfProtection } from '@fastify/csrf-protection'
import fCookie from '@fastify/cookie'
import fastifyPrisma from '@joggr/fastify-prisma';
import bcrypt from 'bcrypt'

//plugins on the sistem
import prisma from './plugins/prisma';

//schemas
import { userSchemas } from './routes/users/user.schema';

//routes
import userRoutes from './routes/users/user.route';
import './types/types'

const fastify = Fastify({ logger: true });
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
//conection with frontend
fastify.register(fastifyCors, {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true,
});

//JWT
fastify.register(fjwt, {
  secret: bcrypt.hash(myPlaintextPassword, saltRounds).toString()
})
fastify.addHook('preHandler', (req, res, next) => {
  req.jwt = fastify.jwt
  return next()
})
fastify.register(fCookie, {
  secret: bcrypt.hash(myPlaintextPassword, saltRounds).toString(),
  hook: 'preHandler',
})

//adding schema
for (let schema of [...userSchemas]) {
  fastify.addSchema(schema)
}

fastify.register(fastifyPrisma, {
  client: prisma,
});

//Login/Register routes
fastify.register(userRoutes, { prefix: 'api/users' });

//protectedRoutes
fastify.decorate(
  'authenticate',
  async (req: FastifyRequest, reply: FastifyReply) => {
    const token = req.cookies.access_token ?? req.headers.authorization
    if (!token) {
      return reply.status(401).send({ message: 'Authentication required' })
    }
    const decoded = req.jwt.verify<FastifyJWT['user']>(token)
    req.user = decoded
  },
)
//csrf protection
// fastify.register(csrf, {cookieOpts: {signed: true}})
// fastify.get('/',
//   {
//     preHandler: [fastify.authenticate],
//     onRequest: fastify.csrfProtection,
//   },
//   getUsers
// )

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server is running at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();