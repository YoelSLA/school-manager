import { useState } from "react";
import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";
import { usePagination } from "@/shared/utils/hooks/usePagination";
import type {
	MateriaCreateDTO,
	MateriaDetalleDTO,
	MateriaUpdateDTO,
} from "../../types";
import {
	useCreateMateria,
	useDeleteMateria,
	useUpdateMateria,
} from "../mutations";
import { useListMaterias } from "../queries";

export function useMateriasPage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);

	const { page, setPage, pageSize } = usePagination([escuelaActiva?.id]);

	/* =========================
     MODALES
  ========================= */

	const [isCreateOpen, setIsCreateOpen] = useState(false);

	const [materiaAEditar, setMateriaAEditar] =
		useState<MateriaDetalleDTO | null>(null);

	const [materiaAEliminar, setMateriaAEliminar] =
		useState<MateriaDetalleDTO | null>(null);

	/* =========================
     QUERY
  ========================= */

	const query = useListMaterias(escuelaActiva?.id, page, pageSize);

	const materias = query.data?.content ?? [];
	const totalPages = query.data?.totalPages ?? 0;

	/* =========================
     CREATE
  ========================= */

	const create = useCreateMateria(escuelaActiva?.id);

	const createMateria = (data: MateriaCreateDTO) => {
		if (!escuelaActiva) return;

		create.mutate(data, {
			onSuccess: () => setIsCreateOpen(false),
		});
	};

	/* =========================
     EDIT
  ========================= */

	const update = useUpdateMateria(escuelaActiva?.id);

	const updateMateria = (data: MateriaUpdateDTO) => {
		if (!escuelaActiva || !materiaAEditar) return;

		update.mutate(
			{
				id: materiaAEditar.id,
				data,
			},
			{
				onSuccess: () => setMateriaAEditar(null),
			},
		);
	};

	/* =========================
     DELETE
  ========================= */

	const remove = useDeleteMateria(escuelaActiva?.id);

	const deleteMateria = () => {
		if (!materiaAEliminar) return;

		remove.mutate(materiaAEliminar.id, {
			onSuccess: () => setMateriaAEliminar(null),
		});
	};

	return {
		escuelaActiva,

		pagination: {
			page,
			setPage,
			totalPages,
		},

		query: {
			...query,
			materias,
		},

		create: {
			isOpen: isCreateOpen,
			open: () => setIsCreateOpen(true),
			close: () => setIsCreateOpen(false),
			submit: createMateria,
			isPending: create.isPending,
		},

		edit: {
			materia: materiaAEditar,
			open: setMateriaAEditar,
			close: () => setMateriaAEditar(null),
			submit: updateMateria,
			isPending: update.isPending,
		},

		delete: {
			materia: materiaAEliminar,
			open: setMateriaAEliminar,
			close: () => setMateriaAEliminar(null),
			submit: deleteMateria,
			isPending: remove.isPending,
		},
	};
}
