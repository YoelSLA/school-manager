import { useParams } from "react-router-dom";
import type { CursoResponseDTO } from "@/cursos/types/cursos.types";
import PageLayout from "@/layout/PageLayout/PageLayout";
import CursoDetalleHeader from "./CursoDetalleHeader";
import CursoDetalleMain from "./CursoDetalleMain";
import styles from "./CursoDetallePage.module.scss";

export default function CursoDetallePage() {
	const { cursoId } = useParams<{ cursoId: string }>();

	const cursoMock: CursoResponseDTO = {
		id: Number(cursoId),
		anio: 1,
		grado: 2,
		division: "1 ° 2",
		turno: "MANIANA",
	};

	return (
		<PageLayout>
			<div className={styles.page}>
				<CursoDetalleHeader curso={cursoMock} />
				<CursoDetalleMain curso={cursoMock} />
			</div>
		</PageLayout>
	);
}
