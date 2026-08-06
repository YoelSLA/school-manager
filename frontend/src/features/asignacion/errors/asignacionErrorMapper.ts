export type UserError = {
	title: string;
	message: string;
};

type BackendError = {
	code?: string;
	message?: string;
};

export function mapAsignacionError(backendError: BackendError): UserError {
	if (backendError?.code === "EMPLEADO_EN_LICENCIA") {
		return {
			title: "No se puede crear la asignación",
			message:
				"El empleado seleccionado se encuentra de licencia en la fecha indicada.\n\n" +
				"No puede tomar posesión del cargo en ese día.\n\n" +
				"Podés elegir otra fecha o seleccionar otro empleado.",
		};
	}

	return {
		title: "Error inesperado",
		message: "Ocurrió un error inesperado. Intentá nuevamente.",
	};
}
