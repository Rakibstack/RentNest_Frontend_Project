
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("Please enter a valid email address.")
    .trim(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters."),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters."),

    email: z
      .email("Please enter a valid email address.")
      .trim(),

    phone: z
      .string()
      .trim()
      .optional(),

     profileImage: z
    .url("Please enter a valid image URL.")
    .optional(),
    
    password: z
      .string()
      .min(6, "Password must be at least 6 characters."),

    role: z.enum(["TENANT", "LANDLORD"]),
  })
 
export type RegisterInput = z.infer<typeof registerSchema>;

export type LoginInput = z.infer<typeof loginSchema>;