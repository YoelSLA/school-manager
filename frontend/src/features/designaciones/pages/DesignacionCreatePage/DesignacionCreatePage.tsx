import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/layout/PageLayout/PageLayout";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";
import { useCrearDesignacionAdministrativa } from "../../hooks/useCrearDesignacionAdministrativa";
import { useCrearDesignacionCurso } from "../../hooks/useCrearDesignacionCurso";
import type { DesignacionAdministrativaCreateDTO, DesignacionAdministrativaFormValues, DesignacionCursoCreateDTO, DesignacionCursoFormValues, TipoDesignacion } from "../../types/designacion.types";
import AdministrativaForm from "../../components/AdministrativaForm/AdministrativaForm";
import styles from "./DesignacionCreatePage.module.scss";
import DesignacionTabs from "./DesignacionTabs/DesignacionTabs";
import CursoForm from "../../components/CursoForm/CursoForm";

export default function DesignacionCreatePage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);
	const navigate = useNavigate();

	const crearCurso = useCrearDesignacionCurso(escuelaActiva?.id);
	const crearAdministrativa = useCrearDesignacionAdministrativa(
		escuelaActiva?.id,
	);
	const [tipo, setTipo] = useState<TipoDesignacion>("ADMIN");

	const handleCrearCurso = async (data: DesignacionCursoFormValues) => {
		const payload: DesignacionCursoCreateDTO = {
			...data,
			cupof: Number(data.cupof),
			materiaId: Number(data.materiaId),
			cursoId: Number(data.cursoId),
		};

		await crearCurso.mutateAsync(payload);
		navigate(-1);
	};

	const handleCrearAdministrativa = async (
		data: DesignacionAdministrativaFormValues,
	) => {
		try {
			console.log("🚀 Enviando payload:", data);

			const payload: DesignacionAdministrativaCreateDTO = {
				...data,
				cupof: Number(data.cupof),
			};

			const result = await crearAdministrativa.mutateAsync(payload);

			console.log("✅ Mutation OK:", result);

			navigate(-1);
		} catch (error) {
			console.error("💥 Error en mutation:", error);
		}
	};

	return (
		<PageLayout>
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
		</PageLayout>
	);
}
