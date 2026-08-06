// features/empleadosEducativos/hooks/useEmpleadoEducativoDetallePage.ts

import { useState } from "react";
import { useParams } from "react-router-dom";

import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";

import type { BajaDefinitivaDTO } from "../../types";
import { useDarDeBajaDefinitiva } from "../mutations/useDarDeBajaDefinitiva";
import { useReactivarEmpleado } from "../mutations/useReactivarEmpleado";
import { useEmpleadoNavigation } from "../navigation/useEmpleadoNavigation";
import { useEmpleadoEducativo } from "../queries/useEmpleadoEducativo";
import { useEmpleadoEducativoAsignaciones } from "../queries/useEmpleadoEducativoAsignaciones";
import { useEmpleadoEducativoLicencias } from "../queries/useEmpleadoEducativoLicencias";

export function useEmpleadoEducativoDetallePage() {
	const { empleadoId } = useParams();

	const escuelaActiva = useAppSelector(selectEscuelaActiva);

	const empleadoNav = useEmpleadoNavigation();

	const [isBajaModalOpen, setIsBajaModalOpen] = useState(false);

	const [isReactivarModalOpen, setIsReactivarModalOpen] = useState(false);

	const id = Number(empleadoId);

	/* =========================
		 QUERIES
	========================= */

	const empleadoQuery = useEmpleadoEducativo(id);

	const asignacionesQuery = useEmpleadoEducativoAsignaciones(id);

	const licenciasQuery = useEmpleadoEducativoLicencias(id);

	/* =========================
		 MUTATIONS
	========================= */

	const bajaMutation = useDarDeBajaDefinitiva();

	const reactivarMutation = useReactivarEmpleado();

	/* =========================
		 DATA
	========================= */

	const empleado = empleadoQuery.data;

	const asignaciones = asignacionesQuery.data;

	const licencias = licenciasQuery.data;

	/* =========================
		 HANDLERS
	========================= */

	const handleToggleActivo = () => {
		if (!empleado) return;

		if (empleado.activo) {
			setIsBajaModalOpen(true);
		} else {
			setIsReactivarModalOpen(true);
		}
	};

	const confirmarBaja = (data: BajaDefinitivaDTO) => {
		if (!escuelaActiva?.id || !empleado) return;

		bajaMutation.mutate(
			{
				empleadoId: empleado.id,
				escuelaId: escuelaActiva.id,
				payload: data,
			},
			{
				onSuccess: () => {
					setIsBajaModalOpen(false);
				},
			},
		);
	};

	const confirmarReactivacion = () => {
		if (!escuelaActiva?.id || !empleado) return;

		reactivarMutation.mutate(
			{
				empleadoId: empleado.id,
				escuelaId: escuelaActiva.id,
			},
			{
				onSuccess: () => {
					setIsReactivarModalOpen(false);
				},
			},
		);
	};

	return {
		empleadoNav,
		empleado,
		asignaciones,
		licencias,

		isLoading:
			empleadoQuery.isLoading ||
			asignacionesQuery.isLoading ||
			licenciasQuery.isLoading,

		isError:
			empleadoQuery.isError ||
			asignacionesQuery.isError ||
			licenciasQuery.isError,

		isBajaModalOpen,
		setIsBajaModalOpen,

		isReactivarModalOpen,
		setIsReactivarModalOpen,

		handleToggleActivo,

		confirmarBaja,
		confirmarReactivacion,

		bajaMutation,
		reactivarMutation,
	};
}
