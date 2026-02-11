import { Calendar, Plus } from "lucide-react";
import Button from "@/components/Button";
import "./LicenciasEmptyState.css";

type Props = {
	onCrearLicencia?: () => void;
};

export function LicenciasEmptyState({ onCrearLicencia }: Props) {
	return (
		<div className="licencias-empty">
			<div className="empty-icon">
				<Calendar size={48} strokeWidth={1.5} />
			</div>

			<h2>No hay licencias registradas</h2>

			<p>Cuando un empleado solicite una licencia, aparecerá listada acá.</p>

			{onCrearLicencia && (
				<Button
					variant="primary"
					size="sm"
					className="empty-action"
					onClick={onCrearLicencia}
				>
					<Plus size={16} />
					Solicitar licencia
				</Button>
			)}
		</div>
	);
}
