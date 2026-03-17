import { NavLink, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { NAV_ITEMS } from "@/utils";
import styles from "./Header.module.scss";

export default function Header() {
	const navigate = useNavigate();

	const escuelaRaw = localStorage.getItem("escuelaActiva");
	const escuela = escuelaRaw ? JSON.parse(escuelaRaw) : null;

	return (
		<header className={styles.appHeader}>
			{/* LEFT */}
			<div className={styles.appHeader__left}>
				<div className={styles.appHeader__logo}>Gestión Escolar</div>

				<Button
					variant="secondary"
					size="sm"
					onClick={() => navigate("/seleccionar-escuela")}
					className={styles.appHeader__schoolButton}
				>
					🏫 {escuela ? escuela.nombre : "Seleccionar escuela"}
				</Button>
			</div>

			{/* NAV */}
			<nav className={styles.appHeader__nav}>
				{NAV_ITEMS.map((item) => (
					<NavLink
						key={item.to}
						to={item.to}
						className={({ isActive }) =>
							`${styles.appHeader__link} ${isActive ? styles.appHeader__linkActive : ""
							}`
						}
					>
						{item.label}
					</NavLink>
				))}
			</nav>
		</header>
	);
}