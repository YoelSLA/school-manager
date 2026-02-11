import type { FranjaHorariaMinimoDTO } from "@/utils/types";
import styles from "./DesignacionHorarios.module.scss";
import HorarioDia from "./HorarioDia";
import { DIAS_SEMANA } from "@/features/designaciones/utils/designacion.utils";

type Props = {
	franjas: FranjaHorariaMinimoDTO[];
};

export default function DesignacionHorarios({ franjas }: Props) {
	const franjasPorDia = franjas.reduce<
		Record<string, FranjaHorariaMinimoDTO[]>
	>((acc, franja) => {
		acc[franja.dia] ??= [];
		acc[franja.dia].push(franja);
		return acc;
	}, {});

	return (
		<section className={styles["designacion-horarios"]}>
			{DIAS_SEMANA.filter((dia) => franjasPorDia[dia]).map(
				(dia) => (
					<HorarioDia
						key={dia}
						dia={dia}
						franjas={franjasPorDia[dia]}
					/>
				),
			)}
		</section>
	);
}
