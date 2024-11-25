import { z } from 'zod';

export const CurriculumSchema = z.object({
   header: z.object({
      name: z.string(),
      contact: z.string(),
   }),
   education: z.array(
      z.object({
         institution: z.string(),
         graduationDate: z.string(),
         degree: z.string(),
         details: z.array(z.string()),
      }),
   ),
   technicalSkills: z.array(
      z.object({
         skills: z.string(),
         details: z.array(z.string()),
      }),
   ),
   relevantCoursework: z.array(z.string()),
   experience: z.array(
      z.object({
         organization: z.string(),
         location: z.string(),
         position: z.string(),
         date: z.string(),
         responsibilities: z.array(z.string()),
      }),
   ),
   interests: z.array(z.string()),
});
