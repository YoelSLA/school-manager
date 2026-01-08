import { useState } from "react";
import "./DesignacionCursoCreatePage.css";

type FranjaHoraria = {
  dia: string;
  desde: string;
  hasta: string;
};

export default function DesignacionCursoCreatePage() {
  const [cupof, setCupof] = useState("");
  const [cuil, setCuil] = useState("");
  const [situacion, setSituacion] = useState("");

  const [materiaId, setMateriaId] = useState("");
  const [cursoId, setCursoId] = useState("");
  const [orientacion, setOrientacion] = useState("");

  const [franjas, setFranjas] = useState<FranjaHoraria[]>([]);
  const [franjaActual, setFranjaActual] = useState<FranjaHoraria>({
    dia: "",
    desde: "",
    hasta: "",
  });

  const hayDocente = Boolean(cuil);

  /* =========================
     MOCKS (luego API)
  ========================= */

  const docentes = [
    { cuil: "20-42341174-1", nombre: "Pérez, Juan" },
    { cuil: "27-33445566-9", nombre: "Gómez, María" },
  ];

  const materias = [
    { id: 1, nombre: "Matemática" },
    { id: 2, nombre: "Lengua" },
  ];

  const cursos = [
    { id: 1, nombre: "1° A" },
    { id: 2, nombre: "2° B" },
  ];

  const orientaciones = ["Ciencias Naturales", "Ciencias Sociales"];
  const situaciones = ["TITULAR", "SUPLENTE", "PROVISIONAL"];

  /* =========================
     FRANJAS
  ========================= */

  const agregarFranja = () => {
    if (!franjaActual.dia || !franjaActual.desde || !franjaActual.hasta) return;

    setFranjas([...franjas, franjaActual]);
    setFranjaActual({ dia: "", desde: "", hasta: "" });
  };

  const eliminarFranja = (index: number) => {
    setFranjas(franjas.filter((_, i) => i !== index));
  };

  /* =========================
     SUBMIT
  ========================= */

  const submit = () => {
    const payload = {
      cupof: Number(cupof),
      cuil: cuil || null,
      materiaId: Number(materiaId),
      cursoId: Number(cursoId),
      orientacion,
      situacionDeRevista: hayDocente ? situacion : null,
      franjasHorarias: franjas,
    };

    console.log("JSON FINAL", payload);
  };

  return (
    <div className="form-container">
      {/* =========================
          CARD 1 — DESIGNACIÓN
      ========================= */}
      <div className="asignacion-grid-top">
        <div className="form-card">
          <h3>Designación</h3>

          <div className="form-grid">
            <div className="field">
              <label>Cupof *</label>
              <input
                type="number"
                value={cupof}
                onChange={(e) => setCupof(e.target.value)}
                placeholder="Número de cupof"
              />
            </div>

            <div className="field">
              <label>Docente</label>
              <select value={cuil} onChange={(e) => setCuil(e.target.value)}>
                <option value="">Sin docente asignado</option>
                {docentes.map((d) => (
                  <option key={d.cuil} value={d.cuil}>
                    {d.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Situación de revista</label>
              <select
                value={situacion}
                onChange={(e) => setSituacion(e.target.value)}
                disabled={!hayDocente}
              >
                <option value="">Sin situación</option>
                {situaciones.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              {!hayDocente && (
                <span className="form-hint">
                  Seleccioná un docente para definir la situación
                </span>
              )}
            </div>
          </div>
        </div>

        {/* =========================
          CARD 2 — ESPACIO CURRICULAR
      ========================= */}
        <div className="form-card">
          <h3>Espacio curricular</h3>

          <div className="form-grid">
            <div className="field">
              <label>Materia *</label>
              <select
                value={materiaId}
                onChange={(e) => setMateriaId(e.target.value)}
              >
                <option value="">Seleccionar materia</option>
                {materias.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Curso *</label>
              <select
                value={cursoId}
                onChange={(e) => setCursoId(e.target.value)}
              >
                <option value="">Seleccionar curso</option>
                {cursos.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="field full-width">
              <label>Orientación *</label>
              <select
                value={orientacion}
                onChange={(e) => setOrientacion(e.target.value)}
              >
                <option value="">Seleccionar orientación</option>
                {orientaciones.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* =========================
          CARD 3 — FRANJAS HORARIAS
      ========================= */}
      <div className="form-card">
        <h3>Franjas horarias</h3>

        <div className="form-grid">
          <div className="field">
            <label>Día</label>
            <select
              value={franjaActual.dia}
              onChange={(e) =>
                setFranjaActual({ ...franjaActual, dia: e.target.value })
              }
            >
              <option value="">Día</option>
              <option value="LUNES">Lunes</option>
              <option value="MIERCOLES">Miércoles</option>
              <option value="VIERNES">Viernes</option>
            </select>
          </div>

          <div className="field">
            <label>Desde</label>
            <input
              type="time"
              value={franjaActual.desde}
              onChange={(e) =>
                setFranjaActual({ ...franjaActual, desde: e.target.value })
              }
            />
          </div>

          <div className="field">
            <label>Hasta</label>
            <input
              type="time"
              value={franjaActual.hasta}
              onChange={(e) =>
                setFranjaActual({ ...franjaActual, hasta: e.target.value })
              }
            />
          </div>

          <div className="field full-width">
            <button
              type="button"
              className="btn-secondary"
              onClick={agregarFranja}
            >
              + Agregar franja horaria
            </button>
          </div>
        </div>

        <div className="chips">
          {franjas.map((f, i) => (
            <span key={i} className="chip">
              {f.dia} {f.desde}-{f.hasta}
              <button onClick={() => eliminarFranja(i)}>✕</button>
            </span>
          ))}
        </div>
      </div>

      {/* =========================
          ACCIONES
      ========================= */}
      <div className="form-actions">
        <button onClick={submit}>Crear asignación</button>
      </div>
    </div>
  );
}
