import "./ModalFooter.css";

type Props = {
  onClose: () => void;
};

export function ModalFooter({ onClose }: Props) {
  return (
    <footer className="modal-footer">
      <button className="btn-secondary" onClick={onClose}>
        Cerrar
      </button>
    </footer>
  );
}
