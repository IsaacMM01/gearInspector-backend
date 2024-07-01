import multipart from '@fastify/multipart';
import { FastifyInstance } from 'fastify';

export default async function multipartPlugin(fastify: FastifyInstance) {
    fastify.register(multipart, {
        limits: {
        fileSize: 1000000 * 5,
        files: 10,
        },
        attachFieldsToBody: true,
    });
}