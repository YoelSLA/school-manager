import { useEffect, useState } from "react";
import EmpleadoCard from "../components/EmpleadoCard";
import EmpleadoDetalleModal from "../pages/EmpleadoDetalleModal";
import { getAllEmpleadosEducativos } from "../services/empleadoEducativo";
import { EmpleadoEducativo } from "../types/types";
import "./equipo.css";

export default function EquipoPage() {
  const [empleados, setEmpleados] = useState<EmpleadoEducativo[]>([]);
  const [loading, setLoading] = useState(false);

  const [empleadoActivo, setEmpleadoActivo] =
    useState<EmpleadoEducativo | null>(null);

  const actualizar = async () => {
    setLoading(true);
    try {
      const data = await getAllEmpleadosEducativos();
      setEmpleados(data);
    } catch (error) {
      console.error("Error al cargar empleados educativos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    actualizar();
  }, []);

  const guardarEmpleado = async (empleadoActualizado: EmpleadoEducativo) => {
    // await updateEmpleadoEducativo(empleadoActualizado);

    setEmpleados((prev) =>
      prev.map((e) =>
        e.cuil === empleadoActualizado.cuil ? empleadoActualizado : e
      )
    );

    setEmpleadoActivo(null);
  };

  return (
    <div className="equipo-page">
      <div className="equipo-header">
        <h1>Equipo educativo</h1>

        <button className="btn-refresh" onClick={actualizar} disabled={loading}>
          🔄 {loading ? "Actualizando..." : "Actualizar"}
        </button>
      </div>

      <div className="equipo-grid">
        {empleados.map((emp) => (
          <EmpleadoCard
            key={emp.cuil}
            empleado={emp}
            onVerDetalles={() => setEmpleadoActivo(emp)}
          />
        ))}
      </div>

      {empleadoActivo && (
        <EmpleadoDetalleModal
          empleado={empleadoActivo}
          onClose={() => setEmpleadoActivo(null)}
          onSave={guardarEmpleado}
        />
      )}
    </div>
  );
}
