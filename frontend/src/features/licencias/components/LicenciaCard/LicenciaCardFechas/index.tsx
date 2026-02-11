import { formatearFecha } from "@/utils";
import "./LicenciaCardFechas.css";

type Props = {
	periodo: {
		fechaDesde: string;
		fechaHasta: string;
		dias: number;
	};
};

export function LicenciaCardFechas({ periodo }: Props) {
	return (
		<div className="licencia-fechas">
			<div className="licencia-fechas-rango">
				<span className="icon">📅</span>
				<span>
					{formatearFecha(periodo.fechaDesde)} al{" "}
					{formatearFecha(periodo.fechaHasta)}
				</span>
			</div>

			<div className="licencia-fechas-dias">
				<span className="icon">⏳</span>
				<span>{periodo.dias} días</span>
			</div>
		</div>
	);
}
