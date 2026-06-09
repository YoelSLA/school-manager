import type { LicenciaDesignacionDTO } from "@/shared/types";
import styles from "./CoberturaCard.module.scss";
import CoberturaCardActions from "./CoberturaCardActions";
import CoberturaCardEmpty from "./CoberturaCardEmpty";
import CoberturaCardPeriod from "./CoberturaCardPeriod";
import CoberturaCardPerson from "./CoberturaCardPerson";

type Props = {
	designacion: LicenciaDesignacionDTO;
	onCambiarCobertura: (id: number) => void;
};

export default function CoberturaCard({
	designacion,
	onCambiarCobertura,
}: Props) {
	const asignacion = designacion.cobertura;

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<span className={styles.title}>Cobertura actual</span>
			</div>

			{!asignacion ? (
				<CoberturaCardEmpty />
			) : (
				<>
					<CoberturaCardPerson empleado={asignacion.empleadoEducativoBasico} />
					{"fechaHasta" in asignacion.periodo && (
						<CoberturaCardPeriod periodo={asignacion.periodo} />
					)}
					<CoberturaCardActions
						designacionId={designacion.designacionId}
						onCambiarCobertura={onCambiarCobertura}
					/>
				</>
			)}
		</div>
	);
}
