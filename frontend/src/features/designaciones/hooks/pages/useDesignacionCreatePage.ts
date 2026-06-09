import axios from "axios";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";
import type {
	DesignacionAdministrativaCreateDTO,
	DesignacionCursoCreateDTO,
	DesignacionFiltro,
} from "@/shared/types";
import { useCrearDesignacionAdministrativa } from "../useCrearDesignacionAdministrativa";
import { useCrearDesignacionCurso } from "../useCrearDesignacionCurso";

type ErrorModalState = {
	title: string;
	message: string;
};

export function useDesignacionCreatePage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);
	const navigate = useNavigate();

	/* =========================
			 MUTATIONS
	========================= */

	const crearCurso = useCrearDesignacionCurso(escuelaActiva?.id);
	const crearAdministrativa = useCrearDesignacionAdministrativa(
		escuelaActiva?.id,
	);

	/* =========================
			 LOCAL STATE
	========================= */

	const [tipo, setTipo] = useState<DesignacionFiltro>("ADMIN");
	const [errorModal, setErrorModal] = useState<ErrorModalState | null>(null);

	/* =========================
			 DERIVED STATE
	========================= */

	const isCurso = useMemo(() => tipo === "CURSO", [tipo]);

	/* =========================
			 ACTIONS
	========================= */

	const handleCrearCurso = async (data: DesignacionCursoCreateDTO) => {
		try {
			const payload: DesignacionCursoCreateDTO = {
				...data,

				cupof: Number(data.cupof),

				materiaId: Number(data.materiaId),

				cursoId: Number(data.cursoId),
			};

			await crearCurso.mutateAsync(payload);

			navigate(-1);
		} catch (error) {
			handleApiError(error);
		}
	};

	const handleCrearAdministrativa = async (
		data: DesignacionAdministrativaCreateDTO,
	) => {
		try {
			const payload: DesignacionAdministrativaCreateDTO = {
				...data,

				cupof: Number(data.cupof),
			};

			await crearAdministrativa.mutateAsync(payload);

			navigate(-1);
		} catch (error) {
			handleApiError(error);
		}
	};

	const handleApiError = (error: unknown) => {
		if (!axios.isAxiosError(error)) {
			return;
		}

		const message =
			error.response?.data?.message ??
			"Ocurrió un error al crear la designación";

		setErrorModal({
			title: "No se pudo crear la designación",

			message,
		});
	};

	const closeErrorModal = () => {
		setErrorModal(null);
	};

	return {
		tipo,
		setTipo,
		isCurso,
		errorModal,
		crearCurso,
		crearAdministrativa,
		handleCrearCurso,
		handleCrearAdministrativa,
		closeErrorModal,
	};
}
