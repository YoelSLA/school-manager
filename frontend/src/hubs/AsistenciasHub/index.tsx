import "./AsistenciasHub.css";

export default function AsistenciaHub() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Asistencia</h1>
        <p>Control de asistencia del personal educativo</p>
      </header>

      <section className="page-content">
        <div className="empty-state">
          <p>No hay registros de asistencia todavía</p>
          <button className="primary">Registrar asistencia</button>
        </div>
      </section>
    </div>
  );
}
