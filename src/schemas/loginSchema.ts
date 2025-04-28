import { z } from "zod";

export const loginSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  contraseña: z.string().min(1, "La contraseña es obligatoria"),
  rol: z.string().min(1, "El rol es obligatorio"),
});

export type LoginData = z.infer<typeof loginSchema>; 