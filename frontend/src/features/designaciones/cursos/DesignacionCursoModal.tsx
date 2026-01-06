import "./DesignacionCursoModal.css";

type Props = {
  designacion: any;
  onClose: () => void;
};

export default function DesignacionCursoModal({ designacion, onClose }: Props) {
  const {
    curso,
    materia,
    empleadoEducativo,
    horarios,
    numeroCupof,
    situacion,
  } = designacion;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2>
            {curso.division} · {materia.nombre} ({materia.abreviatura})
          </h2>
          <button onClick={onClose}>✕</button>
        </header>

        <section className="modal-section">
          <h4>Docente</h4>
          {empleadoEducativo ? (
            <p>
              {empleadoEducativo.apellido}, {empleadoEducativo.nombre} <br />
              {empleadoEducativo.cuil}
            </p>
          ) : (
            <p className="vacante">Sin docente asignado</p>
          )}
        </section>

        <section className="modal-section horarios">
          <h4>Horarios</h4>
          <ul>
            {horarios.map((h: any, idx: number) => (
              <li key={idx}>
                {h.dia} {h.desde}–{h.hasta}
              </li>
            ))}
          </ul>
        </section>

        <footer className="modal-footer">
          <strong>CUPOF #{numeroCupof}</strong>
          {situacion && <span className="situacion">{situacion}</span>}
        </footer>
      </div>
    </div>
  );
}
