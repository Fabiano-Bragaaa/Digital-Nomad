import { z } from "zod";

export const updatePasswordSchema = z.object({
  oldPassword: z.string("campo obrigatório").min(6, "no minimo 6 caracteres"),
  password: z.string("campo obrigatório").min(6, "no minimo 6 caracteres"),
  confirmPassword: z.string("campo obrigatório").min(6, "no minimo 6 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "as senhas não correspondem",
  path: ["confirmPassword"],
})

export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;