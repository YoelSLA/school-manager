import { useState } from "react";
import "./DesignacionCursoCard.css";

const capitalizarDia = (dia: string) =>
  dia.charAt(0).toUpperCase() + dia.slice(1).toLowerCase();

export default function DesignacionCursoCard({ designacion }: any) {
  const [abierto, setAbierto] = useState(false);

  const {
    curso,
    materia,
    empleadoEducativo,
    franjasHorarias,
    situacion,
    numeroCupof,
  } = designacion;

  return (
    <>
      {/* CARD */}
      <div
        className="designacion-card clickable"
        onClick={() => setAbierto(true)}
      >
        {/* HEADER */}
        <div className="card-header">
          <span className="icon">🏫</span>
          <span className="curso">{curso.division}</span>
          <span className="separator">|</span>
          <span className="materia">
            {materia.nombre} <strong>({materia.abreviatura})</strong>
          </span>
        </div>

        {/* PERSONA */}
        <div className="card-section persona-section">
          <span className="icon">👤</span>

          {empleadoEducativo ? (
            <div>
              <div className="docente-nombre">
                {empleadoEducativo.apellido}, {empleadoEducativo.nombre}
              </div>
              <div className="docente-cuil">{empleadoEducativo.cuil}</div>
            </div>
          ) : (
            <div className="vacante">
              <strong>Sin docente asignado</strong>
            </div>
          )}
        </div>

        {/* HORARIOS */}
        <div className="card-section horarios-section">
          <span className="icon">⏰</span>

          <table className="horarios-table">
            <thead>
              <tr>
                <th>Día</th>
                <th>Desde</th>
                <th>Hasta</th>
              </tr>
            </thead>
            <tbody>
              {franjasHorarias.map((h: any, idx: number) => (
                <tr key={idx}>
                  <td>{capitalizarDia(h.dia)}</td>
                  <td>{h.desde}</td>
                  <td>{h.hasta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="card-footer">
          <span className="icon">📄</span>
          <span className="cupof">CUPOF #{numeroCupof}</span>

          {situacion && <span className="situacion">{situacion}</span>}
        </div>
      </div>

      {/* MODAL */}
      {abierto && (
        <div className="modal-backdrop" onClick={() => setAbierto(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>
              {curso.division} · {materia.nombre} ({materia.abreviatura})
            </h2>

            <p>
              <strong>CUPOF:</strong> {numeroCupof}
            </p>

            <p>
              <strong>Situación:</strong> {situacion ?? "No informada"}
            </p>

            <p>
              <strong>Docente:</strong>{" "}
              {empleadoEducativo
                ? `${empleadoEducativo.apellido}, ${empleadoEducativo.nombre}`
                : "Sin docente asignado"}
            </p>

            <h4>Horarios</h4>
            <ul>
              {franjasHorarias.map((h: any, idx: number) => (
                <li key={idx}>
                  {capitalizarDia(h.dia)} {h.desde} – {h.hasta}
                </li>
              ))}
            </ul>

            <button className="cerrar-btn" onClick={() => setAbierto(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
