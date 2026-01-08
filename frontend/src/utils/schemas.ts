import { z } from "zod";
import { RolEducativo, SituacionDeRevista } from "./types";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cuilRegex = /^\d{2}-\d{8}-\d{1}$/;

/* =========================
   EMPLEADO EDUCATIVO
========================= */

export const empleadoEducativoSchema = z.object({
  cuil: z
    .string()
    .min(1, "El CUIL es obligatorio")
    .regex(cuilRegex, "El CUIL debe tener el formato XX-XXXXXXXX-X"),

  nombre: z.string().min(1, "El nombre es obligatorio"),

  apellido: z.string().min(1, "El apellido es obligatorio"),

  domicilio: z.string().optional(),

  telefono: z.string().optional(),

  email: z
    .string()
    .min(1, "El email es obligatorio")
    .regex(emailRegex, "El email no tiene un formato válido"),

  fechaDeNacimiento: z.string().min(1, "La fecha de nacimiento es obligatoria"),

  fechaDeIngreso: z.string().min(1, "La fecha de ingreso es obligatoria"),
});

/* =========================
   FRANJA HORARIA
========================= */

export const franjaHorariaSchema = z
  .object({
    dia: z.string().min(1, "El día es obligatorio"),
    horaDesde: z.string().min(1, "Hora desde obligatoria"),
    horaHasta: z.string().min(1, "Hora hasta obligatoria"),
  })
  .refine((data) => data.horaDesde < data.horaHasta, {
    message: "La hora desde debe ser menor a la hora hasta",
    path: ["horaHasta"],
  });

/* =========================
   CUPOF
========================= */

export const cupofSchema = z.coerce
  .number()
  .int("El CUPoF debe ser un número entero")
  .positive("El CUPoF debe ser positivo")
  .refine((v) => !Number.isNaN(v), {
    message: "El CUPoF es obligatorio",
  });

/* =========================
   ROL EDUCATIVO
========================= */

export const rolEducativoSchema = z.enum(
  Object.values(RolEducativo) as [RolEducativo, ...RolEducativo[]]
);

/* =========================
   DESIGNACIÓN ADMINISTRATIVA
========================= */

export const designacionAdministrativaSchema = z.object({
  cupof: cupofSchema,
  rolEducativo: rolEducativoSchema,
  franjasHorarias: z
    .array(franjaHorariaSchema)
    .min(1, "Debe informar al menos una franja horaria"),
});

export const crearLicenciaSchema = z
  .object({
    tipoLicencia: z.string().min(1, "Seleccioná un tipo de licencia"),
    fechaDesde: z.string().min(1, "La fecha desde es obligatoria"),
    fechaHasta: z.string().min(1, "La fecha hasta es obligatoria"),
    descripcion: z.string().optional(),
  })
  .refine((data) => data.fechaHasta >= data.fechaDesde, {
    message: "La fecha hasta no puede ser anterior a la fecha desde",
    path: ["fechaHasta"],
  });

export const asignacionSchema = z.object({
  empleadoId: z.number(),
  tipoAsignacion: z.string(),
  situacionDeRevista: z.enum(
    Object.values(SituacionDeRevista) as [
      SituacionDeRevista,
      ...SituacionDeRevista[],
    ]
  ),
  fechaTomaPosesion: z.string(),
  fechaCese: z.string(),
});

/* =========================
   TYPES
========================= */

export type EmpleadoEducativoForm = z.infer<typeof empleadoEducativoSchema>;

export type DesignacionAdministrativaForm = z.infer<
  typeof designacionAdministrativaSchema
>;

export type CrearLicenciaForm = z.infer<typeof crearLicenciaSchema>;

export type AsignacionCreateDTO = z.infer<typeof asignacionSchema>;
