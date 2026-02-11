import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ASIGNACION_DEFAULTS } from "../defaults/asignacion.defaults";
import type {
	AsignacionFormInput,
	AsignacionFormOutput,
} from "../asignacion.form.types";
import { crearAsignacionSchema } from "../schemas/crearAsignacion.schema";

export function useAsignacionForm() {
	const form = useForm<AsignacionFormInput, unknown, AsignacionFormOutput>({
		resolver: zodResolver(crearAsignacionSchema),
		defaultValues: ASIGNACION_DEFAULTS,
	});

	return {
		form,
	};
}
