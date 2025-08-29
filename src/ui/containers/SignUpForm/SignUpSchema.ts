import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string("campo obrigatório").min(5,"nome muito curto"),
  email: z.email("email inválido"),
  password: z.string("campo obrigatório").min(6, "no minimo 6 caracteres"),
  confirmPassword: z.string("campo obrigatório").min(6, "no minimo 6 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "as senhas não correspondem",
  path: ["confirmPassword"],
})

export type SignUpSchema = z.infer<typeof signUpSchema>;