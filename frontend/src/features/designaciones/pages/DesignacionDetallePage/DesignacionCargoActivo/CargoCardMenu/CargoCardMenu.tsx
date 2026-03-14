import { useState } from "react";
import { MoreVertical, Pencil, UserMinus, Trash2 } from "lucide-react";
import styles from "./CargoCardMenu.module.scss";

type Props = {
  onEditar?: () => void;
};

export default function CargoCardMenu({ onEditar }: Props) {
  const [open, setOpen] = useState(false);

  const handleEditar = () => {
    setOpen(false);
    onEditar?.();
  };

  return (
    <div className={styles.menuWrapper}>
      <button
        className={styles.menuButton}
        onClick={() => setOpen(!open)}
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className={styles.menu}>
          <button onClick={handleEditar}>
            <Pencil size={16} />
            Editar
          </button>

          <button disabled>
            <UserMinus size={16} />
            Dar de baja
          </button>

          <button className={styles.danger} disabled>
            <Trash2 size={16} />
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}