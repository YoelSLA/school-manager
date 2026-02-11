import { Calendar, IdCard, Mail, Phone } from "lucide-react";
import type { EmpleadoEducativoDetalleDTO } from "@/features/empleadosEducativos/types/empleadosEducativos.types";
import { formatearFecha } from "@/utils";
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
			value: empleado.telefono,
		},
		{
			icon: Mail,
			label: "Email",
			value: empleado.email,
		},
	];

	return (
		<section className={styles.datos}>
			<h2 className={styles.datos__titulo}>Datos personales</h2>

			<div className={styles.datos__grid}>
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
