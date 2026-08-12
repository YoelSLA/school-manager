import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { designacionPaths } from "../../constants";
import type {
	DesignacionAdministrativaUpdateDTO,
	DesignacionCursoUpdateDTO,
} from "../../types";
import {
	useDesignacionAdministrativaUpdate,
	useDesignacionCursoUpdate,
} from "../mutations";
import { useDesignacionDetail } from "../queries";

export function useDesignacionPageUpdate() {
	const { designacionId } = useParams<{
		designacionId: string;
	}>();

	const navigate = useNavigate();

	const id = Number(designacionId);

	/* =========================
			 QUERY
	========================= */

	const { designacion, isLoading } = useDesignacionDetail(id);

	/* =========================
			 MUTATIONS
	========================= */

	const editarCurso = useDesignacionCursoUpdate(id);

	const editarAdministrativa = useDesignacionAdministrativaUpdate(id);

	/* =========================
			 DERIVED STATE
	========================= */

	const notFound = !isLoading && !designacion;

	const isCurso = designacion?.tipo === "CURSO";

	const isAdministrativa = designacion?.tipo === "ADMINISTRATIVA";

	/* =========================
			 ACTIONS
	========================= */

	const handleSuccess = () => {
		toast.success("Designación actualizada correctamente");

		navigate(designacionPaths.detail(id));
	};

	const handleEditarCurso = async (data: DesignacionCursoUpdateDTO) => {
		await editarCurso.mutateAsync(data);

		handleSuccess();
	};

	const handleEditarAdministrativa = async (
		data: DesignacionAdministrativaUpdateDTO,
	) => {
		await editarAdministrativa.mutateAsync(data);

		handleSuccess();
	};

	return {
		designacion,

		isLoading,
		notFound,

		isCurso,
		isAdministrativa,

		editarCurso,
		editarAdministrativa,

		handleEditarCurso,
		handleEditarAdministrativa,
	};
}
