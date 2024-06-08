import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const SignUpFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
  });