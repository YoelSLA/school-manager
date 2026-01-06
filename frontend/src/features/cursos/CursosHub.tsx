import "./cursos-hub.css";

export default function CursosHub() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Cursos</h1>
        <p>Gestión de cursos de la escuela</p>
      </header>

      <section className="page-content">
        <div className="empty-state">
          <p>No hay cursos creados todavía</p>
          <button className="primary">Crear curso</button>
        </div>
      </section>
    </div>
  );
}
