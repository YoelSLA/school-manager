import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { crearEmpleadoEducativoSchema } from "../schemas/crearEmpleadoEducativo.schema";
import type {
	EmpleadoEducativoCreateInput,
	EmpleadoEducativoCreateOutput,
} from "../empleadoEducativo.form.types";
import { EMPLEADO_EDUCATIVO_DEFAULTS } from "../defaults/empleadoEducativosCreate.default";

export function useEmpleadoEducativoCreateForm() {
	const form = useForm<
		EmpleadoEducativoCreateInput,
		unknown,
		EmpleadoEducativoCreateOutput
	>({
		resolver: zodResolver(crearEmpleadoEducativoSchema),
		defaultValues: EMPLEADO_EDUCATIVO_DEFAULTS,
	});

	return {
		form,
	};
}
