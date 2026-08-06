import { argentinaDateFormatter } from "./argentinaDateFormatter";
import { createArgentinaDate } from "./createArgentinaDate";

export function formatFechaIngreso(fecha?: string | null): {
	texto: string;
	tieneFecha: boolean;
} {
	if (!fecha) {
		return { texto: "Sin fecha", tieneFecha: false };
	}

	const date = createArgentinaDate(fecha);

	if (!date) {
		return { texto: "Sin fecha", tieneFecha: false };
	}

	return {
		texto: argentinaDateFormatter.format(date),
		tieneFecha: true,
	};
}
