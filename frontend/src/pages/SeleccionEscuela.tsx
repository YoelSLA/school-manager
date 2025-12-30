import { useNavigate } from "react-router-dom";
import { useEscuela } from "../context/EscuelaContext";
import "./seleccionEscuela.css";

export default function SeleccionEscuela() {
  const { setEscuela } = useEscuela();
  const navigate = useNavigate();

  const escuelas = [
    { id: "65", nombre: "Escuela N° 65" },
    { id: "70", nombre: "Escuela N° 70" },
  ];

  const seleccionarEscuela = (escuela: { id: string; nombre: string }) => {
    setEscuela(escuela);
    navigate("/dashboard");
  };

  return (
    <div className="escuela-selector">
      <h1>Seleccionar escuela</h1>

      <div className="escuela-lista">
        {escuelas.map((escuela) => (
          <button
            key={escuela.id}
            className="escuela-card"
            onClick={() => seleccionarEscuela(escuela)}
          >
            {escuela.nombre}
          </button>
        ))}
      </div>
    </div>
  );
}
