export default function AdminFilters() {
	return (
		<>
			<div>
				<label htmlFor="rol-educativo">Rol educativo</label>
				<select id="rol-educativo">
					<option>Todos</option>
				</select>
			</div>

			<div>
				<label htmlFor="estado">Estado</label>
				<select id="estado">
					<option>Todos</option>
					<option>Cubierta</option>
					<option>Vacante</option>
				</select>
			</div>
		</>
	);
}
