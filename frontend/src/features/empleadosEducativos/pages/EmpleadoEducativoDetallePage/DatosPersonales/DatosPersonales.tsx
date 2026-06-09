import { Calendar, IdCard, LocationEdit, Mail, Phone } from "lucide-react";
import type { EmpleadoEducativoDetalleDTO } from "@/shared/types";
import { formatearFecha } from "@/shared/utils";

import DatoPersonalItem from "./DatoPersonalItem";

import styles from "./DatosPersonales.module.scss";

type Props = {
	empleado: EmpleadoEducativoDetalleDTO;
};

export default function DatosPersonales({ empleado }: Props) {
	const DATOS = [
		{
			icon: IdCard,
			label: "CUIL",
			value: empleado.cuil,
		},
		{
			icon: Calendar,
			label: "Nacimiento",
			value: formatearFecha(empleado.fechaDeNacimiento),
		},
		{
			icon: Phone,
			label: "Teléfono",
			value: empleado.telefono?.trim() || "No disponible",
		},
		{
			icon: LocationEdit,
			label: "Domicilio",
			value: empleado.domicilio?.trim() || "No disponible",
		},
		{
			icon: Mail,
			label: "Email",
			value: empleado.email?.trim() || "No disponible",
		},
		{
			icon: Calendar,
			label: "Fecha de ingreso",
			value: empleado.fechaDeIngreso
				? formatearFecha(empleado.fechaDeIngreso)
				: "No disponible",
		},
	];

	return (
		<section className={styles.datos}>
			<header className={styles.header}>
				<h2 className={styles.title}>DATOS PERSONALES</h2>
			</header>

			<div className={styles.grid}>
				{DATOS.map((dato) => (
					<DatoPersonalItem
						key={dato.label}
						icon={dato.icon}
						label={dato.label}
						value={dato.value}
					/>
				))}
			</div>
		</section>
	);
}
