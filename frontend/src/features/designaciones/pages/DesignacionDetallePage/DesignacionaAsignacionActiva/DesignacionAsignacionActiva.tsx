import AsignacionCard from "@/features/asignaciones/components/AsignacionCard";
import type { AsignacionDetalleDTO } from "@/shared/utils/types";
import styles from "./DesignacionAsignacionActiva.module.scss";

type Props = {
	cargo: AsignacionDetalleDTO | null;
	designacionId: number;
	isLoading?: boolean;
	onEditar?: (cargo: AsignacionDetalleDTO) => void;
};

export default function DesignacionAsignacionActivo({
	cargo,
	designacionId,
	isLoading = false,
	onEditar,
}: Props) {
	return (
		<section className={styles.root}>
			{/* 🔥 TITULO */}
			<h3 className={styles.title}>CARGO ACTIVO</h3>

			{isLoading && <p className={styles.loading}>Cargando cargo activo…</p>}

			{!isLoading && !cargo && (
				<div className={styles.emptyWrapper}>
					<p className={styles.empty}>No hay un cargo activo actualmente</p>
				</div>
			)}

			{!isLoading && cargo && (
				<AsignacionCard
					cargo={cargo}
					designacionId={designacionId}
					onEditar={() => onEditar?.(cargo)}
				/>
			)}
		</section>
	);
}
