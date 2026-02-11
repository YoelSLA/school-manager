import { useState } from "react";

import ConfirmarEliminarModal from "../components/ConfirmarEliminarModal";
import CrearEscuelaModal from "../components/CrearEscuelaModal";
import type { Escuela } from "../types/escuela.types";
import type { EscuelaFormOutput } from "../form/escuela.form.types";
import { useCrearEscuela } from "../hooks/useCrearEscuela";
import { useEscuelas } from "../hooks/useEscuelas";
import { SeleccionarEscuelaEmpty } from "./SeleccionarEscuelaEmpty";
import { SeleccionarEscuelaGrid } from "./SeleccionarEscuelaGrid";
import { SeleccionarEscuelaHeader } from "./SeleccionarEscuelaHeader";
import styles from "./SeleccionarEscuelaPage.module.scss";

export default function SeleccionarEscuelaPage() {
	const { escuelas, isLoading, eliminarEscuela } = useEscuelas();
	const { crearEscuela, isLoading: isCreating, error } = useCrearEscuela();

	const [modalCrear, setModalCrear] = useState(false);
	const [_editar, setEditar] = useState<Escuela | null>(null);
	const [eliminar, setEliminar] = useState<Escuela | null>(null);

	const confirmarEliminar = async () => {
		if (!eliminar) return;
		await eliminarEscuela(eliminar.id);
		setEliminar(null);
	};

	// 🔥 ESTE ERA EL PASO QUE FALTABA
	const handleCrearEscuela = async (data: EscuelaFormOutput) => {
		await crearEscuela(data);
		setModalCrear(false);
	};

	return (
		<div className={styles["seleccionar-escuela"]}>
			<SeleccionarEscuelaHeader
				onCrear={() => setModalCrear(true)}
				onRefresh={() => { }}
				isLoading={isLoading}
			/>

			<div className={styles["seleccionar-escuela__grid-wrapper"]}>
				{isLoading ? null : escuelas.length === 0 ? (
					<SeleccionarEscuelaEmpty onCrear={() => setModalCrear(true)} />
				) : (
					<SeleccionarEscuelaGrid
						escuelas={escuelas}
						onEditar={setEditar}
						onEliminar={setEliminar}
					/>
				)}
			</div>

			{modalCrear && (
				<CrearEscuelaModal
					onClose={() => setModalCrear(false)}
					onSubmit={handleCrearEscuela} // ✅ AHORA SÍ
					isSubmitting={isCreating}
					error={error ? "No se pudo crear la escuela" : null}
				/>
			)}

			{eliminar && (
				<ConfirmarEliminarModal
					onClose={() => setEliminar(null)}
					onConfirm={confirmarEliminar}
				/>
			)}
		</div>
	);
}
