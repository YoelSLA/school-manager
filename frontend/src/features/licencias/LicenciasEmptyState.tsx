import { icons } from "@/utils/icons";
import "./LicenciasEmptyState.css";

type Props = {
  onCrearLicencia?: () => void;
};

export function LicenciasEmptyState({ onCrearLicencia }: Props) {
  return (
    <div className="licencias-empty">
      <div className="empty-icon">{icons.calendar}</div>

      <h2>No hay licencias registradas</h2>

      <p>Cuando un empleado solicite una licencia, aparecerá listada acá.</p>

      {onCrearLicencia && (
        <button className="empty-action" onClick={onCrearLicencia}>
          {icons.plus}
          Solicitar Licencia
        </button>
      )}
    </div>
  );
}
