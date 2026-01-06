import { useEscuela } from "@/context/EscuelaContext";
import { crearAsignacion } from "@/services/designacionesService";
import { buscarEmpleadosPorEscuela } from "@/services/empleadosService";
import { useEffect, useState } from "react";
import "./crearAsignacionModal.css";

/* =====================
   TIPOS
===================== */

type EmpleadoOption = {
  id: number;
  cuil: string;
  apellido: string;
  nombre: string;
};

type Props = {
  designacionId: number;
  onClose: () => void;
  onCreated: () => void;
};

/* =====================
   COMPONENTE
===================== */

export default function CrearAsignacionModal({
  designacionId,
  onClose,
  onCreated,
}: Props) {
  const { escuelaActiva } = useEscuela();

  /* ===== Estado empleado ===== */
  const [query, setQuery] = useState("");
  const [empleados, setEmpleados] = useState<EmpleadoOption[]>([]);
  const [empleado, setEmpleado] = useState<EmpleadoOption | null>(null);

  /* ===== Form ===== */
  const [situacionDeRevista, setSituacionDeRevista] = useState("TITULAR");
  const [tipoAsignacion, setTipoAsignacion] = useState("NORMAL");
  const [fechaTomaPosesion, setFechaTomaPosesion] = useState("");
  const [fechaCese, setFechaCese] = useState("");

  const [loading, setLoading] = useState(false);

  /* =====================
     BUSCAR EMPLEADOS
  ===================== */

  useEffect(() => {
    if (query.trim().length < 3) {
      setEmpleados([]);
      return;
    }

    buscarEmpleadosPorEscuela(escuelaActiva!.id, query)
      .then(setEmpleados)
      .catch(console.error);
  }, [query, escuelaActiva]);

  /* =====================
     SUBMIT
  ===================== */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!empleado) return;

    const payload = {
      empleadoId: empleado.id,
      situacionDeRevista,
      tipoAsignacion,
      fechaTomaPosesion,
      fechaCese,
    };

    try {
      setLoading(true);
      await crearAsignacion(designacionId, payload);
      onCreated();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  /* =====================
     RENDER
  ===================== */

  return (
    <div className="modal-overlay modal-overlay-top">
      <div className="modal-content modal-content-small">
        <div className="modal-header">
          <h3>Crear cargo</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {/* =====================
              EMPLEADO
          ===================== */}
          <div className="field">
            <label>Empleado</label>

            <input
              value={
                empleado ? `${empleado.apellido}, ${empleado.nombre}` : query
              }
              onChange={(e) => {
                setQuery(e.target.value);
                setEmpleado(null);
              }}
              placeholder="Buscar por apellido o CUIL"
            />

            {!empleado && empleados.length > 0 && (
              <div className="options">
                {empleados.map((e) => (
                  <div
                    key={e.id}
                    className="option"
                    onClick={() => {
                      setEmpleado(e);
                      setQuery("");
                      setEmpleados([]);
                    }}
                  >
                    {e.apellido}, {e.nombre} · {e.cuil}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* =====================
              SITUACIÓN
          ===================== */}
          <div className="field">
            <label>Situación de revista</label>
            <select
              value={situacionDeRevista}
              onChange={(e) => setSituacionDeRevista(e.target.value)}
            >
              <option value="TITULAR">Titular</option>
              <option value="SUPLENTE">Suplente</option>
              <option value="PROVISIONAL">Provisional</option>
            </select>
          </div>

          {/* =====================
              TIPO
          ===================== */}
          <div className="field">
            <label>Tipo de asignación</label>
            <select
              value={tipoAsignacion}
              onChange={(e) => setTipoAsignacion(e.target.value)}
            >
              <option value="NORMAL">Normal</option>
              <option value="ARTICULO_13">Artículo 13</option>
            </select>
          </div>

          {/* =====================
              FECHAS
          ===================== */}
          <div className="grid">
            <div className="field">
              <label>Fecha toma de posesión</label>
              <input
                type="date"
                value={fechaTomaPosesion}
                onChange={(e) => setFechaTomaPosesion(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>Fecha de cese</label>
              <input
                type="date"
                value={fechaCese}
                onChange={(e) => setFechaCese(e.target.value)}
                required
              />
            </div>
          </div>

          {/* =====================
              ACTIONS
          ===================== */}
          <div className="actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>

            <button
              type="submit"
              className="btn-primary"
              disabled={!empleado || loading}
            >
              Crear cargo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
