import type { FranjaHorariaMinimoDTO } from "@/shared/types";
import { DIAS_SEMANA } from "@/shared/utils";
import styles from "./DesignacionHorarios.module.scss";
import HorarioDia from "./HorarioDia";

type Props = {
	franjas: FranjaHorariaMinimoDTO[];
};

export default function DesignacionHorarios({ franjas }: Props) {
	const franjasOrdenadas = [...franjas].sort((a, b) => {
		const ordenDia = DIAS_SEMANA.indexOf(a.dia) - DIAS_SEMANA.indexOf(b.dia);

		if (ordenDia !== 0) return ordenDia;

		return a.horaDesde.localeCompare(b.horaDesde);
	});

	const franjasPorDia = franjasOrdenadas.reduce<
		Record<string, FranjaHorariaMinimoDTO[]>
	>((acc, franja) => {
		acc[franja.dia] ??= [];
		acc[franja.dia].push(franja);
		return acc;
	}, {});

	return (
		<section className={styles.root}>
			{/* 🔥 TITULO */}
			<h3 className={styles.title}>HORARIOS</h3>

			<div className={styles.grid}>
				{DIAS_SEMANA.map((dia) => (
					<HorarioDia key={dia} dia={dia} franjas={franjasPorDia[dia] ?? []} />
				))}
			</div>
		</section>
	);
}
