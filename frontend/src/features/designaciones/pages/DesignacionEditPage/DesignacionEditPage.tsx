import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "@/layout/PageLayout/PageLayout";
import { designacionesPaths } from "@/router/paths";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";
import EditarDesignacionAdministrativa from "../../components/EditarDesignacionAdministrativa/EditarDesignacionAdministrativa";
import EditarDesignacionCurso from "../../components/EditarDesignacionCurso/EditarDesignacionCurso";
import { useActualizarDesignacionAdministrativa } from "../../hooks/useActualizarDesignacionAdministrativa";
import { useActualizarDesignacionCurso } from "../../hooks/useActualizarDesignacionCurso";
import useDesignacionDetalle from "../../hooks/useDesignacionDetalle";
import styles from "./DesignacionEditPage.module.scss";

export default function DesignacionEditPage() {
	const { designacionId } = useParams<{ designacionId: string }>();
	const id = Number(designacionId);

	const navigate = useNavigate();

	const { designacion, isLoading } = useDesignacionDetalle(id);

	const editarCurso = useActualizarDesignacionCurso(
		id
	);

	const editarAdministrativa = useActualizarDesignacionAdministrativa(id);

	const handleSuccess = () => {
		navigate(designacionesPaths.detail(id));
	};

	let content: React.ReactNode = null;

	if (isLoading) {
		content = <div>Cargando...</div>;
	} else if (!designacion) {
		content = <div>No se encontró la designación</div>;
	} else if (designacion.tipo === "CURSO") {
		content = (
			<EditarDesignacionCurso
				designacion={designacion}
				onSubmit={async (data) => {
					await editarCurso.mutateAsync(data);

					toast.success("Designación actualizada correctamente");

					handleSuccess();
				}}
				isSubmitting={editarCurso.isPending}
			/>
		);
	} else if (designacion.tipo === "ADMINISTRATIVA") {
		content = (
			<EditarDesignacionAdministrativa
				designacion={designacion}
				onSubmit={async (data) => {
					await editarAdministrativa.mutateAsync(data);

					toast.success("Designación actualizada correctamente");

					handleSuccess();
				}}
				isSubmitting={editarAdministrativa.isPending}
			/>
		);
	}

	return (
		<PageLayout>
			<div className={styles["designacion-edit"]}>
				<div className={styles["designacion-edit__form"]}>
					{content}
				</div>
			</div>
		</PageLayout>
	);
}