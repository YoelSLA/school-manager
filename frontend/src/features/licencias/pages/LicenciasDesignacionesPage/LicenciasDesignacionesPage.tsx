import { IdCard, User } from "lucide-react";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Button from "@/components/Button";
import { useDesignacionesAfectadas } from "@/features/licencias/hooks/useDesignacionesAfectadas";
import PageLayout from "@/layout/PageLayout/PageLayout";
import LicenciaCubrirDesignacionesModal from "../../components/LicenciaCubrirDesignacionesModal/LicenciaCubrirDesignacionesModal";
import DesignacionItem from "@/features/designaciones/components/DesignacionItem/DesignacionItem";

import styles from "./LicenciasDesignacionesPage.module.scss";

import type { EmpleadoEducativoMinimoDTO } from "@/utils/types";

type LocationState = {
	empleado: EmpleadoEducativoMinimoDTO;
};

export default function LicenciasDesignacionesPage() {
	const { licenciaId } = useParams();
	const location = useLocation();
	const [modalOpen, setModalOpen] = useState(false);

	const id = licenciaId ? Number(licenciaId) : undefined;
	const empleado = (location.state as LocationState | undefined)?.empleado;

	const {
		data: designaciones = [],
		isLoading,
		isError,
	} = useDesignacionesAfectadas(id);

	const [seleccionadas, setSeleccionadas] = useState<number[]>([]);

	function toggleDesignacion(id: number) {
		setSeleccionadas((prev) =>
			prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
		);
	}

	function handleCubrir() {
		setModalOpen(true);
	}

	return (
		<PageLayout>
			<div className={styles.page}>
				{/* Header empleado */}
				{empleado && (
					<div className={styles.header}>
						<div className={styles.header__main}>
							<User size={18} className={styles.header__icon} />

							<div className={styles.header__identity}>
								<span className={styles.header__apellido}>
									{empleado.apellido}
								</span>
								<span className={styles.header__nombre}>{empleado.nombre}</span>
							</div>
						</div>

						<div className={styles.header__cuil}>
							<IdCard size={16} />
							<span>{empleado.cuil}</span>
						</div>
					</div>
				)}

				{isLoading && <p>Cargando...</p>}
				{isError && <p>Error al cargar designaciones</p>}

				{!isLoading && !isError && (
					<section className={styles.container}>
						{/* LISTA */}
						<div className={styles.designacionesList}>
							{designaciones.length === 0 ? (
								<p className={styles.designacionesList__empty}>
									No hay designaciones afectadas
								</p>
							) : (
								designaciones.map((d) => (
									<DesignacionItem
										key={d.designacionId}
										designacion={d}
										checked={seleccionadas.includes(d.designacionId)}
										onToggle={toggleDesignacion}
									/>
								))
							)}
						</div>

						{/* ACCIONES */}
						<div className={styles.actions}>
							<Button
								variant="primary"
								size="sm"
								disabled={seleccionadas.length === 0}
								onClick={handleCubrir}
							>
								Cubrir seleccionadas ({seleccionadas.length})
							</Button>
						</div>
					</section>
				)}
			</div>

			{modalOpen && id && (
				<LicenciaCubrirDesignacionesModal
					licenciaId={id}
					designacionIds={seleccionadas}
					onClose={() => setModalOpen(false)}
					onSuccess={() => {
						setSeleccionadas([]);
						setModalOpen(false);
					}}
				/>
			)}
		</PageLayout>
	);
}