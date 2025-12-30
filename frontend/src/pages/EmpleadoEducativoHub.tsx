import { useNavigate } from "react-router-dom";
import "./empleadoEducativoHub.css";

export default function EmpleadosHub() {
  const navigate = useNavigate();

  return (
    <div className="empleados-hub">
      <div className="hub-grid">
        {/* CARD CREAR */}
        <div
          className="hub-card"
          onClick={() => navigate("/empleados/crear")}
        >
          <div className="hub-icon">➕</div>
          <h3>Crear personal</h3>
          <p>Registrar un nuevo empleado educativo</p>
        </div>

        {/* CARD VER EQUIPO */}
        <div
          className="hub-card"
          onClick={() => navigate("/empleados/listar")}
        >
          <div className="hub-icon">👥</div>
          <h3>Ver equipo</h3>
          <p>Consultar y administrar el personal</p>
        </div>
      </div>
    </div>
  );
}
