import type { FranjaHorariaMinimoDTO } from "@/utils/types";
import styles from "./DesignacionHorarios.module.scss";
import HorarioDia from "./HorarioDia";
import { DIAS_SEMANA } from "@/features/designaciones/utils/designacion.utils";

type Props = {
	franjas: FranjaHorariaMinimoDTO[];
};

export default function DesignacionHorarios({ franjas }: Props) {
	// 🔥 1️⃣ Ordenamos TODAS las franjas primero
	const franjasOrdenadas = [...franjas].sort((a, b) => {
		// primero por día según DIAS_SEMANA
		const ordenDia =
			DIAS_SEMANA.indexOf(a.dia) - DIAS_SEMANA.indexOf(b.dia);

		if (ordenDia !== 0) return ordenDia;

		// luego por horaDesde
		return a.horaDesde.localeCompare(b.horaDesde);
	});

	// 🔥 2️⃣ Agrupamos ya ordenadas
	const franjasPorDia = franjasOrdenadas.reduce<
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
