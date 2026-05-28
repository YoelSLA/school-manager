import BadgeSituacionRevista from "@/shared/components/BadgeSituacionRevista";
import PeriodoDisplay from "@/shared/components/PeriodoDisplay";
import type { PeriodoAbiertoDTO } from "@/shared/utils/types";
import type { SituacionDeRevista } from "@/shared/utils/types/enums";
import styles from "./AsignacionRowFooter.module.scss";

type Props = {
	periodo: PeriodoAbiertoDTO;
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
