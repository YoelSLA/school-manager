import styles from "./CursoHorarioGrid.module.scss";

/* =========================
   CONSTANTES FIJAS
========================= */

const DIAS = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"] as const;

type DiaSemana = (typeof DIAS)[number];

/* =========================
   TIPOS
========================= */

type Clase = {
	id: number;
	materia: string;
	docente: string;
	estado?: "SUPLENTE" | "PROVISIONAL" | "TITULAR";
};

export type ModuloHorario = {
	modulo: number;
	hora: string;
	clases: Partial<Record<DiaSemana, Clase>>;
};

/* =========================
   GRILLA FIJA (NO CAMBIA)
========================= */

const MODULOS_BASE: Omit<ModuloHorario, "clases">[] = [
	{ modulo: 1, hora: "12:00 - 13:00" },
	{ modulo: 2, hora: "13:00 - 14:00" },
	{ modulo: 3, hora: "14:15 - 15:15" },
	{ modulo: 4, hora: "15:15 - 16:15" },
	{ modulo: 5, hora: "16:30 - 17:30" },
	{ modulo: 6, hora: "17:30 - 18:30" },
];

/* =========================
   MOCK DINÁMICO (DESPUÉS BACKEND)
========================= */

const CLASES_MOCK: {
	modulo: number;
	dia: DiaSemana;
	clase: Clase;
}[] = [
	{
		modulo: 1,
		dia: "LUNES",
		clase: {
			id: 2467776,
			materia: "Inglés",
			docente: "Soplan, María José",
			estado: "SUPLENTE",
		},
	},
	{
		modulo: 1,
		dia: "MARTES",
		clase: {
			id: 2467778,
			materia: "Ciencias Naturales",
			docente: "Ferreyra, Carolina Natasha",
			estado: "SUPLENTE",
		},
	},
];

/* =========================
   NORMALIZACIÓN
========================= */

function construirHorario(): ModuloHorario[] {
	return MODULOS_BASE.map((m) => {
		const clases: Partial<Record<DiaSemana, Clase>> = {};

		CLASES_MOCK.filter((c) => c.modulo === m.modulo).forEach((c) => {
			clases[c.dia] = c.clase;
		});

		return {
			...m,
			clases,
		};
	});
}

/* =========================
   COMPONENTE
========================= */

export default function CursoHorarioGrid() {
	const horario = construirHorario();

	return (
		<div className={styles.grid}>
			{/* HEADER */}
			<div className={styles.header}>Mód.</div>
			<div className={styles.header}>Horario</div>

			{DIAS.map((dia) => (
				<div key={dia} className={styles.header}>
					{dia}
				</div>
			))}

			{/* BODY */}
			{horario.map((fila) => (
				<div key={fila.modulo} className={styles.row}>
					<div className={styles.modulo}>{fila.modulo}</div>
					<div className={styles.hora}>{fila.hora}</div>

					{DIAS.map((dia) => {
						const clase = fila.clases[dia];

						return (
							<div key={dia} className={styles.celda}>
								{clase && (
									<>
										<span className={styles.codigo}>{clase.id}</span>

										{clase.estado && (
											<span className={styles.estado}>{clase.estado}</span>
										)}

										<span className={styles.materia}>{clase.materia}</span>

										<span className={styles.docente}>{clase.docente}</span>
									</>
								)}
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
}
