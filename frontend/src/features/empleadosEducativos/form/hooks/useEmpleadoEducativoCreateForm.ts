import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { crearEmpleadoEducativoSchema } from "../schemas/crearEmpleadoEducativo.schema";
import { EmpleadoEducativoCreateDTO } from "@/utils/types";

export function useEmpleadoEducativoCreateForm() {
	const form = useForm<EmpleadoEducativoCreateDTO>({
		resolver: zodResolver(crearEmpleadoEducativoSchema),
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
		mode: "onSubmit", // 👈 valida todo al enviar
		criteriaMode: "all", // 👈 no corta en el primer error por campo
		shouldFocusError: true, // 👈 enfoca el primero, pero muestra todos
	});

	return {
		form,
	};
}
