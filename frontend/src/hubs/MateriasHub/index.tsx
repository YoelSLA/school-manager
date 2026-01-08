import "./MateriasHub.css";

export default function MateriasHub() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Materias</h1>
        <p>Gestión de materias de la escuela</p>
      </header>

      <section className="page-content">
        <div className="empty-state">
          <p>No hay materias cargadas todavía</p>
          <button className="primary">Crear materia</button>
        </div>
      </section>
    </div>
  );
}
