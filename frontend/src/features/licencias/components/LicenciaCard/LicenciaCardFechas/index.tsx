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
	const { fechaDesde, fechaHasta, dias } = periodo;

	return (
		<div className="licencia-fechas">
			<div className="licencia-fechas-rango">
				<span className="icon">📅</span>
				<span>
					{formatearFecha(fechaDesde)} al{" "}
					{fechaHasta
						? formatearFecha(fechaHasta)
						: "Sin fecha de finalización"}
				</span>
			</div>

			<div className="licencia-fechas-dias">
				<span className="icon">⏳</span>
				<span>
					{dias ?? "—"} días
				</span>
			</div>
		</div>
	);
}