import type { CursoResponseDTO } from "@/cursos/types/cursos.types";
import styles from "./CursoDetalleMain.module.scss";
import CursoHorarioGrid, { type ModuloHorario } from "./CursoHorarioGrid";

type Props = {
	curso: CursoResponseDTO;
};

const horarioMock: ModuloHorario[] = [
	{
		modulo: 1,
		hora: "07:30 - 08:30",
		clases: {
			LUNES: {
				id: 2467776,
				materia: "Inglés",
				docente: "Soplan, María José",
				estado: "SUPLENTE",
			},
			MARTES: {
				id: 2467778,
				materia: "Ciencias Naturales",
				docente: "Ferreyra, Carolina Natasha",
				estado: "SUPLENTE",
			},
		},
	},
];

export default function CursoDetalleMain({ curso }: Props) {
	return (
		<main className={styles.main}>
			<section className={styles.section}>
				<h2 className={styles.sectionTitle}>Horario semanal</h2>

				<div className={styles.placeholder}>
					<CursoHorarioGrid horario={horarioMock} />
				</div>
			</section>
		</main>
	);
}
