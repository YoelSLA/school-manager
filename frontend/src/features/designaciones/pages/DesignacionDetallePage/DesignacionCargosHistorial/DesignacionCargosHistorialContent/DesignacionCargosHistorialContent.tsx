import AsignacionDesignacionRow from "@/features/asignaciones/components/AsignacionDesignacionRow";
import type { AsignacionDetalleDTO } from "@/shared/utils/types";
import styles from "./DesignacionCargosHistorialContent.module.scss";

type Props = {
	cargos: AsignacionDetalleDTO[];

	isLoading: boolean;

	emptyMessage: string;
};

export default function DesignacionCargosHistorialContent({
	cargos,
	isLoading,
	emptyMessage,
}: Props) {
	if (isLoading) {
		return (
			<div className={styles.content}>
				<p className={styles.loading}>Cargando cargos…</p>
			</div>
		);
	}

	if (cargos.length === 0) {
		return (
			<div className={styles.content}>
				<p className={styles.empty}>{emptyMessage}</p>
			</div>
		);
	}

	return (
		<div className={styles.content}>
			<div className={styles.list}>
				{cargos.map((cargo) => (
					<AsignacionDesignacionRow key={cargo.id} asignacion={cargo} />
				))}
			</div>
		</div>
	);
}
