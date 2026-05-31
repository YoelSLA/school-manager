import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { EmpleadoEducativoUpdateDTO } from "@/shared/utils/types";
import { editarEmpleadoEducativoSchema } from "../schemas/editarEmpleadoEducativo.schema";

export function useEmpleadoEducativoEditForm() {
	const form = useForm<EmpleadoEducativoUpdateDTO>({
		resolver: zodResolver(editarEmpleadoEducativoSchema),
		defaultValues: {
			cuil: "",
			nombre: "",
			apellido: "",
			domicilio: "",
			telefono: "",
			email: "",
			fechaDeNacimiento: "",
			fechaDeIngreso: "",
		},
	});

	return {
		form,
	};
}
