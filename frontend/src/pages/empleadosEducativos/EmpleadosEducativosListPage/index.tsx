import { EmpleadoEducativoCard } from "@/components/cards/EmpleadoEducativoCard";
import { useEscuela } from "@/context/EscuelaContext";
import { getEmpleadosPorEscuela } from "@/services/empleadosService";

import {
  EmpleadoEducativoCreateDTO,
  EmpleadoEducativoDetalleDTO,
} from "@/utils/types/empleadoEducativo";
import { useEffect, useState } from "react";
import "./empleadosEducativosListPage.css";

type EstadoFiltro = "TODOS" | "ACTIVOS" | "INACTIVOS";

export default function EmpleadosEducativosListPage() {
  const { escuelaActiva } = useEscuela();

  const [empleados, setEmpleados] = useState<EmpleadoEducativoDetalleDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState<EstadoFiltro>("TODOS");

  const [empleadoActivo, setEmpleadoActivo] =
    useState<EmpleadoEducativoDetalleDTO | null>(null);

  /* =====================
     CARGA DE DATOS
  ====================== */

  const actualizar = async () => {
    if (!escuelaActiva) return;

    setLoading(true);
    try {
      const data = await getEmpleadosPorEscuela(escuelaActiva.id);
      setEmpleados(data);
    } catch (error) {
      console.error("Error al cargar empleados educativos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    actualizar();
  }, [escuelaActiva]);

  /* =====================
     FILTRADO
  ====================== */

  const empleadosFiltrados = empleados.filter((emp) => {
    const texto = search.toLowerCase();

    const coincideBusqueda =
      emp.nombre.toLowerCase().includes(texto) ||
      emp.apellido.toLowerCase().includes(texto) ||
      emp.cuil.includes(texto);

    const coincideEstado =
      estadoFiltro === "TODOS" ||
      (estadoFiltro === "ACTIVOS" && emp.activo) ||
      (estadoFiltro === "INACTIVOS" && !emp.activo);

    return coincideBusqueda && coincideEstado;
  });

  const guardarEmpleado = async (
    empleadoActualizado: EmpleadoEducativoCreateDTO
  ) => {
    // futuro
  };

  return (
    <div className="equipo-page">
      {/* =====================
          HEADER
      ====================== */}
      <div className="equipo-header">
        <div className="equipo-header-left">
          {/* BUSCADOR */}
          <input
            type="text"
            className="equipo-search"
            placeholder="Buscar por nombre, apellido o CUIL..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* FILTRO ESTADO */}
          <select
            className="equipo-filter"
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value as EstadoFiltro)}
          >
            <option value="TODOS">Todos</option>
            <option value="ACTIVOS">Activos</option>
            <option value="INACTIVOS">Inactivos</option>
          </select>
        </div>

        <div className="equipo-header-right">
          <button
            className="btn-refresh"
            onClick={actualizar}
            disabled={loading}
          >
            🔄 {loading ? "Actualizando..." : "Actualizar"}
          </button>
        </div>
      </div>

      {/* =====================
          GRID
      ====================== */}
      {loading ? (
        <div className="equipo-loading">Cargando empleados...</div>
      ) : empleadosFiltrados.length === 0 ? (
        <div className="equipo-empty">No se encontraron empleados</div>
      ) : (
        <div className="equipo-grid">
          {empleadosFiltrados.map((emp) => (
            <EmpleadoEducativoCard key={emp.id} empleado={emp} />
          ))}
        </div>
      )}
    </div>
  );
}
