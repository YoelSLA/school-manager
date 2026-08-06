import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { designacionPaths } from "../../constants";
import type {
	DesignacionAdministrativaUpdateDTO,
	DesignacionCursoUpdateDTO,
} from "../../types";
import { useActualizarDesignacionAdministrativa } from "../mutations";
import { useActualizarDesignacionCurso } from "../mutations/useActualizarDesignacionCurso";
import { useDesignacionDetalle } from "../queries";

export function useDesignacionUpdatePage() {
	const { designacionId } = useParams<{
		designacionId: string;
	}>();

	const navigate = useNavigate();

	const id = Number(designacionId);

	/* =========================
			 QUERY
	========================= */

	const { designacion, isLoading } = useDesignacionDetalle(id);

	/* =========================
			 MUTATIONS
	========================= */

	const editarCurso = useActualizarDesignacionCurso(id);

	const editarAdministrativa = useActualizarDesignacionAdministrativa(id);

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
