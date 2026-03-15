import { Hash, User } from "lucide-react";
import styles from "./DesignacionAdministrativaRow.module.scss";
import { DesignacionLicenciaAdministrativaItemDTO } from "@/utils/types";

type Props = {
	designacion: DesignacionLicenciaAdministrativaItemDTO;
	checked: boolean;
	onToggle: (id: number) => void;
};

export default function DesignacionAdministrativaRow({
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
			</div>
		</label>
	);
}
