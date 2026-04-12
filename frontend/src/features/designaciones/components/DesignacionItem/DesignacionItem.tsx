import {
	BookOpen,
	Briefcase,
	CalendarDays,
	GraduationCap,
	Hash,
	User,
} from "lucide-react";
import styles from "./DesignacionItem.module.scss";
import type { LicenciaDesignacionDTO } from "@/utils/types";
import BadgeEstadoDesignacion from "@/components/BagdeEstadoDesignacion";
import Button from "@/components/Button";

type Props = {
	designacion: LicenciaDesignacionDTO;
	selected: boolean;
	onSelect: (id: number) => void;
	onCambiarCobertura: (id: number) => void;
};

export default function DesignacionItem({
	designacion,
	selected,
	onSelect,
	onCambiarCobertura,
}: Props) {
	const estaCubierta = designacion.estado === "CUBIERTA";

	console.log("designacion", designacion.asignacionActiva);

	return (
		<div
			className={`
				${styles.designacionItem}
				${selected ? styles["designacionItem--selected"] : ""}
				${estaCubierta ? styles["designacionItem--disabled"] : ""}
			`}
			onClick={() => {
				if (!estaCubierta) {
					onSelect(designacion.designacionId);
				}
			}}
		>
			<div className={styles.designacionItem__content}>
				<div className={styles.designacionItem__left}>
					<div className={styles.designacionItem__header}>
						<div className={styles.designacionItem__role}>
							<Briefcase size={16} color="#2563eb" />
							<span>{designacion.rolEducativo}</span>
						</div>

						{!estaCubierta && (
							<BadgeEstadoDesignacion value={designacion.estado} />
						)}
					</div>

					<div className={styles.designacionItem__cupof}>
						<Hash size={14} color="#94a3b8" />
						<span>#{designacion.cupof}</span>
					</div>

					{designacion.tipo === "CURSO" && (
						<div className={styles.designacionItem__academico}>
							<div>
								<BookOpen size={14} color="#7c3aed" />
								<span>
									{designacion.curso} · {designacion.materia}
								</span>
							</div>

							<div>
								<GraduationCap size={14} color="#059669" />
								<span>{designacion.orientacion}</span>
							</div>
						</div>
					)}

					{designacion.tipo === "ADMINISTRATIVA" && (
						<div className={styles.designacionItem__academico}>
							<div>
								<Briefcase size={14} color="#64748b" />
								<span>Designación administrativa</span>
							</div>
						</div>
					)}
				</div>

				<div className={styles.designacionItem__right}>
					<div className={styles.designacionItem__rightHeader}>
						<span className={styles.designacionItem__rightTitle}>
							Cobertura actual
						</span>

						<BadgeEstadoDesignacion value={designacion.estado} />
					</div>

					{designacion.asignacionActiva ? (
						<>
							<div className={styles.designacionItem__coverPerson}>
								<User size={16} color="#7c3aed" />

								<div>
									<strong>
										{designacion.asignacionActiva.empleado.apellido},{" "}
										{designacion.asignacionActiva.empleado.nombre}
									</strong>

									<span>
										CUIL {designacion.asignacionActiva.empleado.cuil}
									</span>
								</div>
							</div>

							<div className={styles.designacionItem__coverMeta}>
								<div>
									<CalendarDays
										size={14}
										color="#64748b"
									/>
									<span>
										Cubriendo actualmente la designación
									</span>
								</div>

								<span
									className={
										styles.designacionItem__coverEstado
									}
								>
									Activa
								</span>
							</div>
						</>
					) : (
						<div className={styles.designacionItem__emptyCover}>
							<User size={18} color="#94a3b8" />

							<div>
								<strong>Sin cobertura asignada</strong>

								<span>
									Todavía no hay ningún empleado cubriendo
									esta designación.
								</span>
							</div>
						</div>
					)}

					{designacion.asignacionActiva && (
						<div className={styles.designacionItem__actions}>
							<Button
								variant="secondary"
								size="sm"
								type="button"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									// eliminar cobertura
								}}
							>
								Eliminar cobertura
							</Button>

							<Button
								variant="primary"
								size="sm"
								type="button"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									onCambiarCobertura(designacion.designacionId);
								}}
							>
								Cambiar cobertura
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}