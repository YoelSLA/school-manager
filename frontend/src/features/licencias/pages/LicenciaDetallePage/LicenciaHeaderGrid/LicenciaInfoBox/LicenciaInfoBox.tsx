
import { Calendar, Clock, Hash, FileText } from "lucide-react";
import { diasRestantes, formatPeriodo } from "@/utils";
import Badge from "@/components/Badge";
import { ESTADO_LICENCIA_BADGE } from "@/features/licencias/utils/licencia.bagdes";
import type { LicenciaDetalleDTO } from "@/features/licencias/types/licencia.types";

import styles from "./LicenciaInfoBox.module.scss";

type Props = {
	licencia: LicenciaDetalleDTO;
};

export default function LicenciaInfoBox({ licencia }: Props) {

	return (
		<section className={styles.box}>
			{/* =====================
			   HEADER (IDENTIDAD)
			===================== */}
			<header className={styles.header}>
				<div className={styles.titleBlock}>
					<div className={styles.titleRow}>
						<h2 className={styles.articulo}>
							<FileText size={16} />
							{licencia.normativa.articulo}
						</h2>

						<span className={styles.codigo}>
							<Hash size={14} />
							{licencia.normativa.codigo}
						</span>
					</div>
				</div>

				<Badge variant={ESTADO_LICENCIA_BADGE[licencia.estadoLicencia]}>
					{licencia.estadoLicencia}
				</Badge>
			</header>

			{/* =====================
			   DESCRIPCIÓN NORMATIVA
			===================== */}
			<div className={styles.descripcionWrapper}>
				<span
					className={styles.descripcionCodigo}
				>
					{licencia.normativa.descripcion}
				</span>
			</div>

			<div className={styles.divider} />

			{/* =====================
			   SUMMARY
			===================== */}
			<div className={styles.summary}>
				<div className={styles.item}>
					<Calendar size={14} />
					<div>
						<span className={styles.label}>Período</span>
						<span className={styles.value}>
							{formatPeriodo(
								licencia.periodo.fechaDesde,
								licencia.periodo.fechaHasta,
							)}
						</span>
					</div>
				</div>

				<div className={styles.item}>
					<Clock size={14} />
					<div>
						<span className={styles.label}>Duración</span>
						<span className={styles.value}>
							{licencia.periodo.dias} días ·{" "}
							{diasRestantes(
								licencia.periodo.fechaHasta,
							)}{" "}
							restantes
						</span>
					</div>
				</div>
			</div>

			{/* =====================
			   DESCRIPCIÓN ADMIN
			===================== */}
			{licencia.descripcion && (
				<>
					<div className={styles.divider} />

					<div className={styles.detalle}>
						<h4>
							<FileText size={14} />
							Descripción administrativa
						</h4>
						<p>{licencia.descripcion}</p>
					</div>
				</>
			)}
		</section>
	);
}
