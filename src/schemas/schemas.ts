import { z } from "zod";
import { buildJsonSchemas } from 'fastify-zod';
import { FastifyInstance } from 'fastify';
import { userSchemas } from "../routes/users/user.schema"; 
import { inspectionSchemas } from "../routes/gear_inpection/inspection.schema";

export const { schemas , $ref } = buildJsonSchemas({
    ...userSchemas,
    ...inspectionSchemas,
});

export default async function registerSchemas(fastify: FastifyInstance) {
    for(let schema of schemas) {
        fastify.addSchema(schema);
    }
}