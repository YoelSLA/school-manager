import { z } from "zod";
import { RolEducativo } from "@/features/designaciones/types/designacion.types";

export const rolEducativoSchema = z.nativeEnum(RolEducativo);
