import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@/app/layouts/Breadcrumbs";
import PageLayout from "@/app/layouts/PageLayout/PageLayout";
import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";
import ErrorModal from "@/components/ModalError";
import type {
	DesignacionAdministrativaCreateDTO,
	DesignacionCursoCreateDTO,
	DesignacionFiltro,
} from "@/shared/utils/types";
import AdministrativaForm from "../../components/CreateDesignacionAdministrativa/AdministrativaForm/AdministrativaForm";
import CursoForm from "../../components/CreateDesignacionCurso/CursoForm/CursoForm";
import { useCrearDesignacionAdministrativa } from "../../hooks/useCrearDesignacionAdministrativa";
import { useCrearDesignacionCurso } from "../../hooks/useCrearDesignacionCurso";
import styles from "./DesignacionCreatePage.module.scss";
import DesignacionTabs from "./DesignacionTabs/DesignacionTabs";

export default function DesignacionCreatePage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);
	const navigate = useNavigate();

	const crearCurso = useCrearDesignacionCurso(escuelaActiva?.id);
	const crearAdministrativa = useCrearDesignacionAdministrativa(
		escuelaActiva?.id,
	);

	const [tipo, setTipo] = useState<DesignacionFiltro>("ADMIN");

	const [errorModal, setErrorModal] = useState<{
		title: string;
		message: string;
	} | null>(null);

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
			if (axios.isAxiosError(error)) {
				const mensaje =
					error.response?.data?.message ??
					"Ocurrió un error al crear la designación";

				setErrorModal({
					title: "No se pudo crear la designación",
					message: mensaje,
				});
			}
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
			if (axios.isAxiosError(error)) {
				const mensaje =
					error.response?.data?.message ??
					"Ocurrió un error al crear la designación";

				setErrorModal({
					title: "No se pudo crear la designación",
					message: mensaje,
				});
			}
		}
	};

	return (
		<PageLayout breadcrumbs={<Breadcrumbs />}>
			<section className={styles["designacion-create"]}>
				<div className={styles["designacion-create__tabs"]}>
					<DesignacionTabs value={tipo} onChange={setTipo} />
				</div>

				<div className={styles["designacion-create__form"]}>
					{tipo === "CURSO" ? (
						<CursoForm
							onSubmit={handleCrearCurso}
							isSubmitting={crearCurso.isPending}
						/>
					) : (
						<AdministrativaForm
							onSubmit={handleCrearAdministrativa}
							isSubmitting={crearAdministrativa.isPending}
						/>
					)}
				</div>
			</section>

			{errorModal && (
				<ErrorModal error={errorModal} onClose={() => setErrorModal(null)} />
			)}
		</PageLayout>
	);
}
