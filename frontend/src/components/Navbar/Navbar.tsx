import { NavLink, useNavigate } from "react-router-dom";
import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";
import Button from "@/components/Button";
import { NAV_ITEMS } from "@/shared/utils";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const navigate = useNavigate();
  const escuela = useAppSelector(selectEscuelaActiva);

  // TODO: reemplazar por el usuario autenticado.
  const usuario = {
    nombre: "Yoel",
    apellido: "Ventoso",
    rol: "Administrador",
  };

  const iniciales = `${usuario.nombre[0]}${usuario.apellido[0]}`;

  return (
    <header className={styles.appHeader}>
      {/* ================= LEFT ================= */}

      <div className={styles.appHeader__left}>
        <div className={styles.appHeader__logo}>
          Gestión Escolar
        </div>

        <Button
          variant="secondary"
          size="sm"
          className={styles.appHeader__schoolButton}
          onClick={() => navigate("/seleccionar-escuela")}
        >
          🏫 {escuela?.nombre ?? "Seleccionar escuela"}
        </Button>
      </div>

      {/* ================= CENTER ================= */}

      <nav className={styles.appHeader__nav}>
        {NAV_ITEMS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                styles.appHeader__link,
                isActive && styles.appHeader__linkActive,
              ]
                .filter(Boolean)
                .join(" ")
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* ================= RIGHT ================= */}

      <div className={styles.appHeader__right}>
        <button type="button" className={styles.appHeader__user}>
          <div className={styles.appHeader__avatar}>
            {iniciales}
          </div>

          <div className={styles.appHeader__userInfo}>
            <span className={styles.appHeader__userName}>
              {usuario.nombre} {usuario.apellido}
            </span>

            <span className={styles.appHeader__userRole}>
              {usuario.rol}
            </span>
          </div>
        </button>
      </div>
    </header>
  );
}