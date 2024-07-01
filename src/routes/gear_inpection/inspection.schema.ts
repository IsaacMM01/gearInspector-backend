import { z } from "zod";
import { buildJsonSchemas } from 'fastify-zod';
import { FastifyInstance } from 'fastify';

const imageInfoSchema = z.object({
    id: z.string(),
    name: z.string(),
    size: z.number(),
    type: z.string(),
    uploadDate: z.date()
});

const uploadImageSchema = z.object({
    image: z.instanceof(File).refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File size should not exceed 5MB"
    ),
    title: z.string().optional(),
    description: z.string().optional(),
  });

  const uploadImageResponseSchema = z.object({
    imageUrl: z.string().url(),
    info: z.object({
      id: z.string(),
      name: z.string(),
      size: z.number(),
      type: z.string(),
      uploadDate: z.date(),
    }),
  });
export type UploadImageInput = z.infer<typeof uploadImageSchema>;
export type uploadImageResponseSchema = z.infer<typeof uploadImageResponseSchema>;

export const inspectionSchemas = {
    imageInfoSchema,
    uploadImageSchema,
    uploadImageResponseSchema
}