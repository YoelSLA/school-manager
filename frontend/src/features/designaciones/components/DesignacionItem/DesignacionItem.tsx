import type { KeyboardEvent } from "react";
import type { LicenciaDesignacionDTO } from "@/shared/utils/types";
import CoberturaCard from "./CoberturaCard";
import DesignacionInfoCard from "./DesignacionInfoCard";
import styles from "./DesignacionItem.module.scss";

type Props = {
	designacion: LicenciaDesignacionDTO;
	selected: boolean;
	onSelect: (id: number) => void;
	onCambiarCobertura: (id: number) => void;
};

export default function DesignacionItem({
	designacion,
	selected,
	onSelect,
	onCambiarCobertura,
}: Props) {
	const estaCubierta = designacion.estado === "CUBIERTA";

	const handleSelect = () => {
		if (!estaCubierta) {
			onSelect(designacion.designacionId);
		}
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (estaCubierta) return;

		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onSelect(designacion.designacionId);
		}
	};

	return (
		// biome-ignore lint/a11y/useSemanticElements: no puede ser button porque CoberturaCard contiene elementos interactivos
		<div
			className={`
        ${styles.designacionItem}
        ${selected && !estaCubierta ? styles["designacionItem--selected"] : ""}
        ${estaCubierta ? styles["designacionItem--disabled"] : ""}
      `}
			role="button"
			tabIndex={estaCubierta ? -1 : 0}
			aria-disabled={estaCubierta}
			onClick={handleSelect}
			onKeyDown={handleKeyDown}
		>
			<DesignacionInfoCard designacion={designacion} />
			<CoberturaCard
				designacion={designacion}
				onCambiarCobertura={onCambiarCobertura}
			/>
		</div>
	);
}
