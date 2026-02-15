import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editarEmpleadoEducativoSchema } from "../schemas/editarEmpleadoEducativo.schema";
import type {
	EmpleadoEducativoEditInput,
	EmpleadoEducativoEditOutput,
} from "../empleadoEducativo.form.types";
import { EMPLEADO_EDUCATIVO_EDIT_DEFAULTS } from "../defaults/empleadoEducativoEdit.default";

export function useEmpleadoEducativoEditForm() {
	const form = useForm<
		EmpleadoEducativoEditInput,
		unknown,
		EmpleadoEducativoEditOutput
	>({
		resolver: zodResolver(editarEmpleadoEducativoSchema),
		defaultValues: EMPLEADO_EDUCATIVO_EDIT_DEFAULTS,
	});

	return {
		form,
	};
}
