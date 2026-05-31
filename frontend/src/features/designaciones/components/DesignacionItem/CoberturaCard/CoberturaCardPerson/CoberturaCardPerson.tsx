import { User } from "lucide-react";
import type { EmpleadoEducativoBasicoDTO } from "@/shared/utils/types";
import styles from "./CoberturaCardPerson.module.scss";

type Props = {
	empleado: EmpleadoEducativoBasicoDTO;
};

export default function CoberturaCardPerson({ empleado }: Props) {
	return (
		<div className={styles.person}>
			<User size={16} color="#7c3aed" />

			<div>
				<strong>
					{empleado.apellido}, {empleado.nombre}
				</strong>

				<span>{empleado.cuil}</span>
			</div>
		</div>
	);
}
