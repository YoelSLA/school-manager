import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { DESIGNACION_ADMINISTRATIVA_DEFAULTS } from "../defaults/designacionAdministrativa.defaults";
import type {
	DesignacionAdministrativaFormValues,
} from "../designacion.form.types";
import { crearDesignacionAdministrativaSchema } from "../schemas/crearDesignacionAdministrativa.schema";
import { useEffect } from "react";

export function useDesignacionAdministrativaForm() {
	const form = useForm<DesignacionAdministrativaFormValues>({
		resolver: async (values, context, options) => {
			try {
				return await zodResolver(crearDesignacionAdministrativaSchema)(
					values,
					context,
					options
				);
			} catch (error) {
				console.log("🔥 ZOD RAW ERROR:", error);

				if (error instanceof Error) {
					console.log("Mensaje:", error.message);
				}

				if (error && typeof error === "object" && "issues" in error) {
					console.log("Issues:", (error as any).issues);
				}

				throw error;
			}
		},
		defaultValues: DESIGNACION_ADMINISTRATIVA_DEFAULTS,
	});

	useEffect(() => {
		const subscription = form.watch((values) => {
			console.log("👀 WATCH VALUES:", values);
			console.log("👀 TYPEOF CUPOF EN WATCH:", typeof values.cupof);
		});

		return () => subscription.unsubscribe();
	}, [form]);

	const franjas = useFieldArray({
		control: form.control,
		name: "franjasHorarias",
	});

	return {
		form,
		franjas,
	};
}
