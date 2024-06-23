import { JWT } from '@fastify/jwt';
import { fastifyCsrfProtection } from '@fastify/csrf-protection';

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT
  }
  export interface FastifyInstance {
    authenticate: any
  }
}
type UserPayload = {
    id: string
    email: string
    name: string
}
declare module '@fastify/jwt' {
    interface FastifyJWT {
        user: UserPayload
    }
}