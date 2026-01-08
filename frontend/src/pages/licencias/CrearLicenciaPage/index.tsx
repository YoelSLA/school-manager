import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  buscarEmpleadosPorEscuela,
  crearLicencia,
} from "@/services/empleadosService";

import { TIPOS_LICENCIA, TipoLicencia } from "@/utils/tiposLicencia";
import { EmpleadoSimpleResponseDTO, LicenciaCreateDTO } from "@/utils/types";

import { useEscuela } from "@/context/EscuelaContext";

import "./crearLicenciaPage.css";

/* ===============================
   Utils
================================ */

function agruparPorArticulo(tipos: TipoLicencia[]) {
  return tipos.reduce<Record<string, TipoLicencia[]>>((acc, tipo) => {
    acc[tipo.articulo] ??= [];
    acc[tipo.articulo].push(tipo);
    return acc;
  }, {});
}

/* ===============================
   Page
================================ */

export default function CrearLicenciaPage() {
  const navigate = useNavigate();
  const { escuelaActiva } = useEscuela();

  /* ===============================
     Empleado (autocomplete)
  ================================ */

  const [busqueda, setBusqueda] = useState("");
  const [empleados, setEmpleados] = useState<EmpleadoSimpleResponseDTO[]>([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] =
    useState<EmpleadoSimpleResponseDTO | null>(null);

  /* ===============================
     Licencia form
  ================================ */

  const [tipoLicencia, setTipoLicencia] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [descripcion, setDescripcion] = useState("");

  /* ===============================
     UI state
  ================================ */

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ===============================
     Buscar empleados
  ================================ */

  useEffect(() => {
    if (!busqueda || busqueda.length < 2 || !escuelaActiva) {
      setEmpleados([]);
      return;
    }

    buscarEmpleadosPorEscuela(escuelaActiva.id, busqueda)
      .then(setEmpleados)
      .catch(() => setEmpleados([]));
  }, [busqueda, escuelaActiva]);

  /* ===============================
     Submit
  ================================ */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!empleadoSeleccionado) {
      setError("Debe seleccionar un empleado");
      return;
    }

    const payload: LicenciaCreateDTO = {
      fechaDesde,
      fechaHasta,
      tipoLicencia,
      descripcion: descripcion || undefined,
    };

    try {
      setLoading(true);
      setError(null);

      await crearLicencia(empleadoSeleccionado.id, payload);

      navigate(-1);
    } catch {
      setError("No se pudo crear la licencia");
    } finally {
      setLoading(false);
    }
  };

  const tiposAgrupados = agruparPorArticulo(TIPOS_LICENCIA);

  /* ===============================
     Render
  ================================ */

  return (
    <div className="crear-licencia-page">
      <header className="page-header">
        <h1>Crear licencia</h1>
        <p>Seleccione el empleado y complete los datos</p>
      </header>

      <form className="licencia-form" onSubmit={handleSubmit}>
        {/* =======================
            Empleado
        ======================= */}
        <div className="form-group autocomplete">
          <label>Empleado</label>

          <input
            type="text"
            placeholder="Buscar por apellido o nombre"
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setEmpleadoSeleccionado(null);
            }}
          />

          {empleados.length > 0 && !empleadoSeleccionado && (
            <ul className="autocomplete-list">
              {empleados.map((e) => (
                <li
                  key={e.id}
                  onClick={() => {
                    setEmpleadoSeleccionado(e);
                    setBusqueda(`${e.apellido}, ${e.nombre}`);
                    setEmpleados([]);
                  }}
                >
                  {e.apellido}, {e.nombre}
                </li>
              ))}
            </ul>
          )}
        </div>

        {empleadoSeleccionado && (
          <div className="empleado-seleccionado">
            {empleadoSeleccionado.apellido}, {empleadoSeleccionado.nombre}
          </div>
        )}

        {/* =======================
            Tipo de licencia
        ======================= */}
        <div className="form-group">
          <label>Tipo de licencia</label>

          <select
            value={tipoLicencia}
            onChange={(e) => setTipoLicencia(e.target.value)}
            required
          >
            <option value="" disabled>
              Seleccione un tipo de licencia
            </option>

            {Object.entries(tiposAgrupados).map(([articulo, tipos]) => (
              <optgroup key={articulo} label={articulo}>
                {tipos.map((tipo) => (
                  <option key={tipo.codigo} value={tipo.codigo}>
                    {tipo.codigo} — {tipo.descripcion}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* =======================
            Fechas
        ======================= */}
        <div className="form-row">
          <div className="form-group">
            <label>Desde</label>
            <input
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Hasta</label>
            <input
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              required
            />
          </div>
        </div>

        {/* =======================
            Descripción
        ======================= */}
        <div className="form-group">
          <label>Descripción (opcional)</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Observaciones adicionales…"
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        {/* =======================
            Actions
        ======================= */}
        <footer className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading || !tipoLicencia || !empleadoSeleccionado}
          >
            {loading ? "Creando…" : "Crear licencia"}
          </button>
        </footer>
      </form>
    </div>
  );
}
