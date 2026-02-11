import { useState } from "react";
import "./LicenciaDesignacionesBox.css";

import type { LicenciaDesignacionDTO } from "@/features/licencias/types/licencia.types";
import CubrirDesignacionesButton from "./CubrirDesignacionesButton";
import DesignacionesList from "./DesignacionesList";

type Props = {
	designaciones: LicenciaDesignacionDTO[];
	onCubrir: (designacionIds: number[]) => void;
};

export default function LicenciaDesignacionesBox({
	designaciones,
	onCubrir,
}: Props) {
	const [seleccionadas, setSeleccionadas] = useState<number[]>([]);

	function toggleDesignacion(id: number) {
		setSeleccionadas((prev) =>
			prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
		);
	}

	function handleCubrir() {
		onCubrir(seleccionadas);
	}

	return (
		<section className="licencia-designaciones-box">
			<h3>DESIGNACIONES AFECTADAS</h3>

			<DesignacionesList
				designaciones={designaciones}
				seleccionadas={seleccionadas}
				onToggle={toggleDesignacion}
			/>

			<CubrirDesignacionesButton
				disabled={seleccionadas.length === 0}
				onClick={handleCubrir}
			/>
		</section>
	);
}
