import type { AsignacionDetalleDTO } from "@/utils/types";
import CargoCard from "./CargoCard";
import styles from "./DesignacionCargoActivo.module.scss";

type Props = {
	cargo: AsignacionDetalleDTO | null;
	isLoading?: boolean;
	onEditar?: (cargo: AsignacionDetalleDTO) => void;
};

export default function DesignacionCargoActivo({
	cargo,
	isLoading = false,
	onEditar,
}: Props) {
	return (
		<section className={styles.root}>
			{isLoading && <p className={styles.loading}>Cargando cargo activo…</p>}

			{!isLoading && !cargo && (
				<div className={styles.emptyWrapper}>
					<p className={styles.empty}>No hay un cargo activo actualmente</p>
				</div>
			)}

			{!isLoading && cargo && (
				<CargoCard cargo={cargo} onEditar={() => onEditar?.(cargo)} />
			)}
		</section>
	);
}
