type Props = {
	onConfirm: () => void;
	onClose: () => void;
};

export default function ConfirmarEliminarModal({ onConfirm, onClose }: Props) {
	return (
		<div className="modal-backdrop">
			<div className="modal">
				<h3>¿Eliminar escuela?</h3>
				<p>Esta acción no se puede deshacer.</p>

				<div className="modal-actions">
					<button type="button" className="btn-outline" onClick={onClose}>
						Cancelar
					</button>
					<button type="button" className="btn-danger" onClick={onConfirm}>
						Eliminar
					</button>
				</div>
			</div>
		</div>
	);
}
