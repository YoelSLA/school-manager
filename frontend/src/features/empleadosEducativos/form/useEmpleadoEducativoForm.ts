// hooks/useEmpleadoEducativoForm.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { crearEmpleadoEducativoSchema } from "./crearEmpleadoEducativo.schema";
import type {
	EmpleadoEducativoFormInput,
	EmpleadoEducativoFormOutput,
} from "./empleadoEducativo.form.types";
import { EMPLEADO_EDUCATIVO_DEFAULTS } from "./empleadosEducativos.defaults";

export function useEmpleadoEducativoForm() {
	const form = useForm<
		EmpleadoEducativoFormInput,
		unknown,
		EmpleadoEducativoFormOutput
	>({
		resolver: zodResolver(crearEmpleadoEducativoSchema),
		defaultValues: EMPLEADO_EDUCATIVO_DEFAULTS,
	});

	return {
		form,
	};
}
