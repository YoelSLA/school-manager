import { DesignacionCursoResumenDTO } from "@/utils/types";
import "./designacionCursoCard.css";

type Props = {
  designacion: DesignacionCursoResumenDTO;
  onClick?: () => void;
};

export function DesignacionCursoCard({ designacion, onClick }: Props) {
  return (
    <article className="designacion-curso-card" onClick={onClick}>
      {/* =====================
          HEADER
      ===================== */}
      <header className="dcc-header">
        <span className="dcc-cupof">#{designacion.cupof}</span>

        <span className="dcc-rol-pill">{designacion.rolEducativo}</span>
      </header>

      {/* =====================
          BODY
      ===================== */}
      <section className="dcc-body">
        <h3 className="dcc-materia">{designacion.materia}</h3>

        <div className="dcc-meta">
          <span className="dcc-curso">{designacion.curso}</span>

          {designacion.orientacion && (
            <span className="dcc-orientacion">{designacion.orientacion}</span>
          )}
        </div>
      </section>

      {/* =====================
          HORARIOS
      ===================== */}
      <section className="dcc-horarios">
        <table className="dcc-horarios-table">
          <thead>
            <tr>
              <th>Día</th>
              <th>Horario</th>
            </tr>
          </thead>
          <tbody>
            {designacion.franjasHorarias.map((franja, index) => (
              <tr key={index}>
                <td>{franja.dia}</td>
                <td>
                  {franja.horaDesde} – {franja.horaHasta}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </article>
  );
}
