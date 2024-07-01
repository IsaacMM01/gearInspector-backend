import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { $ref } from "../../schemas/schemas";
import { exec } from 'child_process';
import path from "path";
import fs from "fs";
interface imageRequest {
    image: {
        type: string,
        fieldname: string,
        mimetype: string,
        encoding: string,
        value: string,
        fieldnameTruncated: boolean,
        valueTruncated: boolean,
        fields: { image: any },
    };
}
async function uploadImageHandler(
    req: FastifyRequest<{ Body:imageRequest }>, 
    reply: FastifyReply
) {
    
    const data = req.body.image.value;
    if (!data) {
        return reply.code(400)
            .send({ error: 'No file uploaded' });
    }
    try {
        const base64Data = data.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync('C:/Users/mares/Documents/Escuela/integradora/Aplicacion/backend/images/image.jpg', buffer);
        exec('"C:/Program Files/Python312/python.exe" c:/Users/mares/Documents/Escuela/integradora/Aplicacion/backend/gear_inspector.py', (error, stdout, stderr) => {
            if (error) {
                console.log(`exec error: ${error.message}`);
            }
            else if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
            else {
                console.log(stdout);
            }
        });
        reply.code(201).send({ message: 'hola' })
    } catch (err) {
        console.log(err);
        reply.status(500).send({ success: false, message: 'Error al procesar la solicitud' });
    }
}

export default async function inspectRoutes(
    fastify: FastifyInstance
) {
    fastify.post(
        '/',
        {
            schema: {
                body: $ref('uploadImageSchema'),
            },
            // preHandler: [fastify.authenticate]
        },
        uploadImageHandler
    );
}