import { BookOpen, GraduationCap, Hash, User } from "lucide-react";
import styles from "./DesignacionCursoRow.module.scss";
import { DesignacionLicenciaCursoItemDTO } from "@/utils/types";

type Props = {
	designacion: DesignacionLicenciaCursoItemDTO;
	checked: boolean;
	onToggle: (id: number) => void;
};

export default function DesignacionCursoRow({
	designacion,
	checked,
	onToggle,
}: Props) {
	return (
		<label className={styles.item}>
			<input
				type="checkbox"
				checked={checked}
				onChange={() => onToggle(designacion.id)}
			/>

			<div className={styles.content}>
				<div className={styles.top}>
					<span className={styles.cupof}>
						<Hash size={16} />
						{designacion.cupof}
					</span>

					<span className={styles.rol}>
						<User size={16} />
						{designacion.rolEducativo}
					</span>
				</div>

				<div className={styles.bottom}>
					<span>
						<BookOpen size={16} />
						{designacion.materia.nombre}
					</span>

					<span>
						<GraduationCap size={16} />
						{designacion.curso.division} — {designacion.curso.turno}
					</span>
				</div>
			</div>
		</label>
	);
}
