import { useState } from "react";
import type { EscuelaCreateDTO, EscuelaResponseDTO } from "../../types";
import { useCrearEscuela, useDeleteEscuela } from "../mutations";
import { useGetAllEscuelas } from "../queries/useGetAllEscuelas";

export function useEscuelaPage() {
	/* =========================
     MODALES
  ========================= */

	const [isCreateOpen, setIsCreateOpen] = useState(false);

	const [escuelaAEditar, setEscuelaAEditar] =
		useState<EscuelaResponseDTO | null>(null);

	const [escuelaAEliminar, setEscuelaAEliminar] =
		useState<EscuelaResponseDTO | null>(null);

	/* =========================
     QUERY
  ========================= */

	const query = useGetAllEscuelas();

	const escuelas = query.escuelas ?? [];

	/* =========================
     CREATE
  ========================= */

	const create = useCrearEscuela();

	const createEscuela = async (data: EscuelaCreateDTO) => {
		await create.crearEscuela(data);

		setIsCreateOpen(false);
	};

	/* =========================
     DELETE
  ========================= */

	const remove = useDeleteEscuela();

	const deleteEscuela = async () => {
		if (!escuelaAEliminar) return;

		await remove.mutateAsync(escuelaAEliminar.id);

		setEscuelaAEliminar(null);
	};

	return {
		query: {
			...query,
			escuelas,
		},

		create: {
			isOpen: isCreateOpen,
			open: () => setIsCreateOpen(true),
			close: () => setIsCreateOpen(false),
			submit: createEscuela,
			isPending: create.isLoading,
			error: create.error ? "No se pudo crear la escuela" : null,
		},

		edit: {
			escuela: escuelaAEditar,
			open: setEscuelaAEditar,
			close: () => setEscuelaAEditar(null),
		},

		delete: {
			escuela: escuelaAEliminar,
			open: setEscuelaAEliminar,
			close: () => setEscuelaAEliminar(null),
			submit: deleteEscuela,
			isPending: remove.isPending,
		},
	};
}
