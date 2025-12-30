import { z } from "zod";
import { RolEducativo } from "../types/types";

export const empleadoEducativoSchema = z.object({
  cuil: z.string().min(1, "El CUIL es obligatorio"),
  apellido: z.string().min(1, "El apellido es obligatorio"),
  nombre: z.string().min(1, "El nombre es obligatorio"),

  fechaDeNacimiento: z.string().min(1, "La fecha de nacimiento es obligatoria"),

  rol: z.nativeEnum(RolEducativo),

  cupof: z.string().optional(),

  telefono: z.string().optional(),
  domicilio: z.string().optional(),

  fechaDeIngreso: z.string().min(1, "La fecha de ingreso es obligatoria"),
});

export type EmpleadoEducativoForm = z.infer<typeof empleadoEducativoSchema>;
