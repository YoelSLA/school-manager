import { z } from "zod";
import { RolEducativo } from "../types/enums";

export const rolEducativoSchema = z.enum(RolEducativo);
