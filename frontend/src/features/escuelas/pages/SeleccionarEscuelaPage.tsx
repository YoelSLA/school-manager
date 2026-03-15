import { useState } from "react";

import { useCrearEscuela } from "../hooks/useCrearEscuela";
import { SeleccionarEscuelaEmpty } from "./SeleccionarEscuelaEmpty";
import { SeleccionarEscuelaGrid } from "./SeleccionarEscuelaGrid";
import { SeleccionarEscuelaHeader } from "./SeleccionarEscuelaHeader";
import styles from "./SeleccionarEscuelaPage.module.scss";
import { EscuelaCreateDTO, EscuelaResponseDTO } from "@/utils/types";
import { useGetAllEscuelas } from "../hooks/useGetAllEscuelas";
import { useDeleteEscuela } from "../hooks/useDeleteEscuela";
import DisableEscuelaModal from "../components/DisableEscuelaModal";
import CreateEscuelaModal from "../components/CreateEscuelaModal/CreateEscuelaModal";

export default function SeleccionarEscuelaPage() {
	const { escuelas, isLoading } = useGetAllEscuelas();
	const deleteEscuela = useDeleteEscuela();
	const { crearEscuela, isLoading: isCreating, error } = useCrearEscuela();

	const [modalCrear, setModalCrear] = useState(false);
	const [editar, setEditar] = useState<EscuelaResponseDTO | null>(null);
	const [eliminar, setEliminar] = useState<EscuelaResponseDTO | null>(null);

	const confirmarEliminar = async () => {
		if (!eliminar) return;

		await deleteEscuela.mutateAsync(eliminar.id);

		setEliminar(null);
	};

	const handleCrearEscuela = async (data: EscuelaCreateDTO) => {
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
				<CreateEscuelaModal
					onClose={() => setModalCrear(false)}
					onSubmit={handleCrearEscuela}
					isSubmitting={isCreating}
					error={error ? "No se pudo crear la escuela" : null}
				/>
			)}

			{eliminar && (
				<DisableEscuelaModal
					open={!!eliminar}
					onCancel={() => setEliminar(null)}
					onConfirm={confirmarEliminar}
					loading={deleteEscuela.isPending}
				/>
			)}
		</div>
	);
}
