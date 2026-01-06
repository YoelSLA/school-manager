import { Escuela } from "@/utils/types";
import { useNavigate } from "react-router-dom";
import { useEscuela } from "../../context/EscuelaContext";
import "./escuelaCard.css";

type Props = {
  escuela: Escuela;
  onEntrar?: () => void;
  onEditar: () => void;
  onEliminar: () => void;
};

export default function EscuelaCard({
  escuela,
  onEntrar,
  onEditar,
  onEliminar,
}: Props) {
  const { setEscuelaActiva } = useEscuela();
  const navigate = useNavigate();

  const handleEntrar = () => {
    setEscuelaActiva(escuela);

    navigate("/dashboard");
  };

  return (
    <div className="escuela-card">
      <div className="escuela-card-header">
        <h3>{escuela.nombre}</h3>
      </div>

      <div className="escuela-card-body">
        <p>
          📍 <strong>Dirección:</strong>
          <br />
          {escuela.direccion ?? "No informado"}
        </p>

        <p>
          📞 <strong>Teléfono:</strong>
          <br />
          {escuela.telefono ?? "No informado"}
        </p>
      </div>

      <div className="escuela-card-footer">
        <button className="btn-outline" onClick={handleEntrar}>
          Entrar
        </button>

        <div className="icon-actions">
          <button className="btn-icon" onClick={onEditar}>
            ✏️
          </button>
          <button className="btn-icon danger" onClick={onEliminar}>
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
