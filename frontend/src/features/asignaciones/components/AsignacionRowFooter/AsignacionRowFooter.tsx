import BadgeSituacionRevista from "@/shared/components/BadgeSituacionRevista";
import PeriodoDisplay from "@/shared/components/PeriodoDisplay";
import type { PeriodoDTO } from "@/shared/types";
import type { SituacionDeRevista } from "@/shared/types/enums";
import styles from "./AsignacionRowFooter.module.scss";

type Props = {
	periodo: PeriodoDTO;
	situacionDeRevista: SituacionDeRevista;
};

export default function AsignacionRowFooter({
	periodo,
	situacionDeRevista,
}: Props) {
	return (
		<div className={styles.footer}>
			<PeriodoDisplay periodo={periodo} />
			<BadgeSituacionRevista value={situacionDeRevista} />
		</div>
	);
}
