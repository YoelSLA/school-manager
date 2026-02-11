import * as Progress from "@radix-ui/react-progress";
import { useState } from "react";

import Button from "@/components/Button";
import ConfirmModal from "@/components/ConfirmModal";
import type { AsistenciaDiaDTO } from "@/features/asistencias/types/asistencias.types";
import styles from "./SidebarContexto.module.scss";

type Props = {
	asistencias: AsistenciaDiaDTO[];
	anio: number;
	mes: number; // 1–12
	selectedFechas: string[];
	onRegistrar: () => void;
	onEliminar: () => void;
	disabled?: boolean;
	cantidadEliminables: number;
};

/* ===============================
	 HELPERS
================================ */

function nombreMes(mes: number) {
	return [
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre",
	][mes - 1];
}

function getCodigoAusencia(a: AsistenciaDiaDTO): string {
	if (a.origenAsistencia === "LICENCIA") {
		return a.licencia?.normativa.codigo ?? "SIN_CODIGO";
	}

	return a.tipoLicencia ?? "SIN_CODIGO";
}

/* ===============================
	 COMPONENTE
================================ */

export default function SidebarContexto({
	asistencias,
	anio,
	mes,
	selectedFechas,
	onRegistrar,
	onEliminar,
	disabled,
	cantidadEliminables,
}: Props) {
	/* ===============================
		 CÁLCULOS
	================================ */

	const [confirmEliminarOpen, setConfirmEliminarOpen] = useState(false);

	const diasEsperados = asistencias.length;

	const presentes = asistencias.filter(
		(a) => a.estadoAsistencia === "PRESENTE",
	);

	const ausentes = asistencias.filter((a) => a.estadoAsistencia === "AUSENTE");

	const cantidadPresentes = presentes.length;
	const cantidadAusentes = ausentes.length;

	const porcentajePresentes =
		diasEsperados > 0 ? (cantidadPresentes / diasEsperados) * 100 : 0;

	const ausentesPorCodigo = ausentes.reduce<Record<string, number>>(
		(acc, a) => {
			const codigo = getCodigoAusencia(a);
			acc[codigo] = (acc[codigo] ?? 0) + 1;
			return acc;
		},
		{},
	);

	return (
		<aside className={styles.sidebar}>
			{/* ===============================
				RESUMEN
			================================ */}
			<section className={styles.bloque}>
				{/* Header humano */}
				<div className={styles.headerResumen}>
					<h4 className={styles.mesTitulo}>
						{nombreMes(mes)} {anio}
					</h4>
					<span className={styles.mesSubtitulo}>
						{diasEsperados} días laborales
					</span>
				</div>

				{/* Barra de progreso */}
				<div className={styles.progressWrapper}>
					<span className={styles.caption}>Asistencia del mes</span>

					<Progress.Root
						className={styles.progressRoot}
						value={porcentajePresentes}
					>
						<Progress.Indicator
							className={styles.progressIndicator}
							style={{
								transform: `translateX(-${100 - porcentajePresentes}%)`,
							}}
						/>
					</Progress.Root>

					<div className={styles.progressLegend}>
						<span>🟢 {cantidadPresentes} presentes</span>
						<span>🔴 {cantidadAusentes} ausentes</span>
					</div>
				</div>

				{/* Detalle de ausencias */}
				{cantidadAusentes > 0 && (
					<div className={styles.detalleBox}>
						<span className={styles.detalleTitle}>Detalle de ausencias</span>

						<ul className={styles.ausentesList}>
							{Object.entries(ausentesPorCodigo).map(([codigo, cantidad]) => (
								<li key={codigo}>
									<span>{codigo}</span>
									<strong>{cantidad}</strong>
								</li>
							))}
						</ul>
					</div>
				)}
			</section>

			{/* ===============================
				ACCIONES
			================================ */}
			<section className={styles.bloque}>
				<Button
					variant="success"
					size="sm"
					className={styles.accion}
					onClick={onRegistrar}
					disabled={disabled || selectedFechas.length === 0}
				>
					Editar asistencias ({selectedFechas.length} días)
				</Button>

				<Button
					variant="danger"
					size="sm"
					className={styles.accion}
					onClick={() => setConfirmEliminarOpen(true)}
					disabled={disabled || cantidadEliminables === 0}
				>
					Eliminar inasistencias ({cantidadEliminables} días)
				</Button>
			</section>

			<ConfirmModal
				open={confirmEliminarOpen}
				title="Eliminar inasistencias"
				description={`¿Estás seguro que querés eliminar ${cantidadEliminables} inasistencias seleccionadas? Esta acción no se puede deshacer.`}
				confirmText="Sí, eliminar"
				cancelText="Cancelar"
				onCancel={() => setConfirmEliminarOpen(false)}
				onConfirm={() => {
					onEliminar(); // 🔥 ahora sí
					setConfirmEliminarOpen(false);
				}}
			/>
		</aside>
	);
}
