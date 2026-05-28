import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { designacionesPaths } from "@/app/router/paths";
import type { AsignacionDetalleDTO, FiltroCargos } from "@/shared/utils/types";
import { useCargoActivo } from "../../asignaciones/hooks/useCargoActivo";
import { useCargosDesignacion } from "./useCargosDesignacion";
import useDesignacionDetalle from "./useDesignacionDetalle";

type TipoAsignacion = "TITULAR" | "PROVISIONAL";

export function useDesignacionDetallePage() {
	const { designacionId } = useParams<{ designacionId: string }>();
	const navigate = useNavigate();
	const id = Number(designacionId);

	/* =========================
			 LOCAL STATE
	========================= */

	const [cargoAEditar, setCargoAEditar] = useState<AsignacionDetalleDTO | null>(
		null,
	);
	const [tipoAsignacionCrear, setTipoAsignacionCrear] =
		useState<TipoAsignacion | null>(null);
	const [filtroCargos, setFiltroCargos] = useState<FiltroCargos>("LICENCIA");

	/* =========================
			 QUERIES
	========================= */

	const {
		designacion,
		isLoading,
		error,
		refetch: refetchDesignacion,
	} = useDesignacionDetalle(id);

	const { cargoActivo, isLoading: isLoadingActivo } = useCargoActivo(id);

	const {
		cargos,
		isLoading: isLoadingCargos,
		refetch: refetchCargos,
	} = useCargosDesignacion(id, filtroCargos);

	/* =========================
			 ACTIONS
	========================= */

	const handleEditar = () => {
		navigate(designacionesPaths.edit(id));
	};

	const handleEliminar = () => {
		// TODO
	};

	const handleSuccess = useCallback(() => {
		refetchDesignacion();
		refetchCargos();
	}, [refetchDesignacion, refetchCargos]);

	/* =========================
			 MODALS
	========================= */

	const closeCrearModal = () => {
		setTipoAsignacionCrear(null);
	};

	const closeEditarModal = () => {
		setCargoAEditar(null);
	};

	return {
		id,

		designacion,
		isLoading,
		error,

		cargoActivo,
		isLoadingActivo,

		cargos,
		isLoadingCargos,

		filtroCargos,
		setFiltroCargos,

		cargoAEditar,
		setCargoAEditar,

		tipoAsignacionCrear,
		setTipoAsignacionCrear,

		handleEditar,
		handleEliminar,

		handleSuccess,

		closeCrearModal,
		closeEditarModal,
	};
}
