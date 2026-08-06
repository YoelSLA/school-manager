import { useState } from "react";
import type { CoberturaSeleccionada } from "@/features/asignacion/types";
import type { LicenciaDesignacionDTO } from "../../types";

export function useLicenciaDesignacionesPage() {
	const [seleccionadas, setSeleccionadas] = useState<number[]>([]);

	const [designacionIds, setDesignacionIds] = useState<number[]>([]);
	const [cubrirModalOpen, setCubrirModalOpen] = useState(false);

	const [coberturaSeleccionada, setCoberturaSeleccionada] =
		useState<CoberturaSeleccionada | null>(null);

	function toggleDesignacion(designacionId: number) {
		setSeleccionadas((prev) =>
			prev.includes(designacionId)
				? prev.filter((id) => id !== designacionId)
				: [...prev, designacionId],
		);
	}

	function cubrirSeleccionadas() {
		setDesignacionIds(seleccionadas);
		setCubrirModalOpen(true);
	}

	function cubrirDesignacion(designacionId: number) {
		setDesignacionIds([designacionId]);
		setCubrirModalOpen(true);
	}

	function seleccionarCobertura(designacion: LicenciaDesignacionDTO) {
		if (!designacion.cobertura) return;

		setCoberturaSeleccionada({
			designacionId: designacion.designacionId,
			secuencia: designacion.cobertura.secuencia,
			empleado: designacion.cobertura.empleadoEducativoBasico,
			fechaTomaPosesion: designacion.cobertura.periodo.fechaDesde,
		});
	}

	function cerrarCubrir() {
		setCubrirModalOpen(false);
		setDesignacionIds([]);
	}

	function cubrirSuccess() {
		setSeleccionadas([]);
		cerrarCubrir();
	}

	function cerrarCambiarCobertura() {
		setCoberturaSeleccionada(null);
	}

	return {
		seleccionadas,
		haySeleccionadas: seleccionadas.length > 0,
		toggleDesignacion,

		designacionIds,
		cubrirModalOpen,
		cubrirSeleccionadas,
		cubrirDesignacion,
		cerrarCubrir,
		cubrirSuccess,

		coberturaSeleccionada,
		seleccionarCobertura,
		cerrarCambiarCobertura,
	};
}
