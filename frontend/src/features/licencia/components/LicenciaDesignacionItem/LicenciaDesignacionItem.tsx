import type { KeyboardEvent } from "react";
import { Button } from "@/shared/components";
import type { LicenciaDesignacionDTO } from "../../types";
import LicenciaDesignacionCobertura from "./LicenciaDesignacionCobertura";
import LicenciaDesignacionInfo from "./LicenciaDesignacionInfo/LicenciaDesignacionInfo";
import styles from "./LicenciaDesignacionItem.module.scss";

type Props = {
	designacion: LicenciaDesignacionDTO;
	selected: boolean;
	onSelect: (id: number) => void;
	onCubrir: (id: number) => void;
	onCambiarCobertura: () => void;
};

export default function LicenciaDesignacionItem({
	designacion,
	selected,
	onSelect,
	onCubrir,
	onCambiarCobertura,
}: Props) {
	const estaCubierta = designacion.estado === "CUBIERTA";

	function handleSelect() {
		onSelect(designacion.designacionId);
	}

	function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onSelect(designacion.designacionId);
		}
	}

	return (
		<article
			className={`
				${styles.item}
				${estaCubierta ? styles.covered : styles.uncovered}
				${selected ? styles.selected : ""}
			`}
			onClick={handleSelect}
			onKeyDown={handleKeyDown}
		>
			{/* =====================================================
			    SECCIÓN 1 — INFORMACIÓN DE LA DESIGNACIÓN
			===================================================== */}

			<div className={styles.designacion}>
				<LicenciaDesignacionInfo designacion={designacion} />
			</div>

			{/* =====================================================
			    SECCIÓN 2 — INFORMACIÓN DE LA COBERTURA
			===================================================== */}

			<div className={styles.cobertura}>
				<LicenciaDesignacionCobertura designacion={designacion} />
			</div>

			{/* =====================================================
			    SECCIÓN 3 — ACCIONES
			===================================================== */}

			<div className={styles.acciones}>
				{estaCubierta ? (
					<Button
						variant="ghost"
						size="sm"
						type="button"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							onCambiarCobertura();
						}}
					>
						Cambiar cobertura
					</Button>
				) : (
					<Button
						variant="ghost"
						size="sm"
						type="button"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							onCubrir(designacion.designacionId);
						}}
					>
						Cubrir
					</Button>
				)}
			</div>
		</article>
	);
}
