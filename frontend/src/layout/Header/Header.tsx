import { NavLink, useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "@/utils";
import Button from "@/components/Button";
import styles from "./Header.module.scss";

export default function Header() {
	const navigate = useNavigate();

	const escuelaRaw = localStorage.getItem("escuelaActiva");
	const escuela = escuelaRaw ? JSON.parse(escuelaRaw) : null;

	return (
		<header className={styles["app-header"]}>
			{/* LEFT */}
			<div className={styles["app-header__left"]}>
				<div className={styles["app-header__logo"]}>
					Gestión Escolar
				</div>
				<Button
					variant="secondary"
					size="sm"
					onClick={() => navigate("/seleccionar-escuela")}
					className={styles["app-header__school-button"]}
				>
					🏫 {escuela ? escuela.nombre : "Seleccionar escuela"}
				</Button>
			</div>

			{/* NAV */}
			<nav className={styles["app-header__nav"]}>
				{NAV_ITEMS.map((item) => (
					<NavLink
						key={item.to}
						to={item.to}
						className={({ isActive }) =>
							`${styles["app-header__link"]} ${isActive ? styles["app-header__link--active"] : ""
							}`
						}
					>
						{item.label}
					</NavLink>
				))}
			</nav>

			{/* ACTIONS (cuando las habilites) */}
			{/*
      <div className={styles["app-header__actions"]}>
        <Button variant="ghost" size="icon">⚙️</Button>
        <Button variant="ghost" size="icon">🔔</Button>
        <div className={styles["app-header__avatar"]}>N</div>
      </div>
      */}
		</header>
	);
}
