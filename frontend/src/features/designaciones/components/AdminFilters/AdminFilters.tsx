export default function AdminFilters() {
  return (
    <>
      <div>
        <label>Rol educativo</label>
        <select>
          <option>Todos</option>
        </select>
      </div>

      <div>
        <label>Estado</label>
        <select>
          <option>Todos</option>
          <option>Cubierta</option>
          <option>Vacante</option>
        </select>
      </div>
    </>
  );
}