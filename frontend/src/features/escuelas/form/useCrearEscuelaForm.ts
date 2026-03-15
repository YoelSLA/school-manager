import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { crearEscuelaSchema } from "./crearEscuela.schema";
import { EscuelaCreateDTO } from "@/utils/types";

export function useCrearEscuelaForm() {
	const form = useForm<EscuelaCreateDTO>({
		resolver: zodResolver(crearEscuelaSchema),
		defaultValues: {
			nombre: "",
			localidad: "",
			direccion: "",
			telefono: "",
		},
	});

	return {
		form,
	};
}
