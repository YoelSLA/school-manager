import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EMPLEADO_EDUCATIVO_DEFAULTS } from "../defaults/empleadoEducativosCreate.default";
import type {
	EmpleadoEducativoCreateInput,
	EmpleadoEducativoCreateOutput,
} from "../empleadoEducativo.form.types";
import { crearEmpleadoEducativoSchema } from "../schemas/crearEmpleadoEducativo.schema";

export function useEmpleadoEducativoCreateForm() {
	const form = useForm<
		EmpleadoEducativoCreateInput,
		unknown,
		EmpleadoEducativoCreateOutput
	>({
		resolver: zodResolver(crearEmpleadoEducativoSchema),
		defaultValues: EMPLEADO_EDUCATIVO_DEFAULTS,
		mode: "onSubmit", // 👈 valida todo al enviar
		criteriaMode: "all", // 👈 no corta en el primer error por campo
		shouldFocusError: true, // 👈 enfoca el primero, pero muestra todos
	});

	return {
		form,
	};
}
