import { CursoResponseDTO } from "@/utils/types";
import styles from "./CursoDetalleHeader.module.scss";

type Props = {
	curso: CursoResponseDTO;
};

export default function CursoDetalleHeader({ curso }: Props) {
	return (
		<header className={styles.header}>
			<h1 className={styles.title}>
				{curso.anio}° {curso.grado} {curso.division}
			</h1>

			<span className={styles.turno}>Turno {curso.turno}</span>
		</header>
	);
}
