import LicenciaRow from "@/features/licencias/components/LicenciaRow";
import type { EmpleadoEducativoLicenciaItemDTO } from "@/shared/utils/types";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LicenciasList.module.scss";

type Props = {
	licencias: EmpleadoEducativoLicenciaItemDTO[];
};

export default function LicenciasList({ licencias }: Props) {
	const _navigate = useNavigate();

	const licenciasOrdenadas = useMemo(
		() =>
			[...licencias].sort(
				(a, b) =>
					new Date(b.periodo.fechaDesde).getTime() -
					new Date(a.periodo.fechaDesde).getTime(),
			),
		[licencias],
	);

	return (
		<section className={styles.licencias}>
			<header className={styles.licencias__header}>
				<h3 className={styles.licencias__title}>LICENCIAS</h3>
			</header>

			<div className={styles.licencias__content}>
				{licenciasOrdenadas.length === 0 ? (
					<p className={styles.licencias__empty}>No registra licencias</p>
				) : (
					licenciasOrdenadas.map((licencia) => (
						<LicenciaRow key={licencia.id} licencia={licencia} />
					))
				)}
			</div>

			{/* {licenciasOrdenadas.length > 0 && (
				<footer className={styles.licencias__footer}>
					<button
						type="button"
						className={styles.licencias__viewAll}
						onClick={() =>
							navigate("/empleadoEducativo/123/licencias")
						}
					>
						Ver todas las licencias
					</button>
				</footer>
			)} */}
		</section>
	);
}
