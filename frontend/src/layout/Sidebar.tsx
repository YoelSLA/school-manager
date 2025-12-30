import { NavLink, useNavigate } from "react-router-dom";
import { useEscuela } from "../context/EscuelaContext";
import "./sidebar.css";

export default function Sidebar() {
  const { setEscuela } = useEscuela();
  const navigate = useNavigate();

  const cambiarEscuela = () => {
    setEscuela(null);
    navigate("/");
  };

  return (
    <aside className="sidebar">
      {/* HEADER */}
      <div className="sidebar-header">
        <div className="sidebar-title">Gestión Escolar</div>

        <button className="change-school" onClick={cambiarEscuela}>
          Cambiar escuela
        </button>
      </div>

      {/* NAV */}
      <nav className="sidebar-nav">
        <NavItem to="/dashboard" label="Dashboard" icon="dashboard" />
        <NavItem to="/empleados" label="Empleado educativo" icon="users" />
        <NavItem to="/cursos" label="Cursos" icon="book" />
        <NavItem to="/asistencia" label="Asistencia" icon="check" />
      </nav>
    </aside>
  );
}

/* =========================
   ITEM REUTILIZABLE
========================= */

function NavItem({
  to,
  label,
  icon,
}: {
  to: string;
  label: string;
  icon: "dashboard" | "users" | "book" | "check";
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "sidebar-item active" : "sidebar-item"
      }
    >
      <span className="sidebar-icon">{icons[icon]}</span>
      <span className="sidebar-label">{label}</span>
    </NavLink>
  );
}

/* =========================
   ICONOS (SVG)
========================= */

const icons = {
  dashboard: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M3 13h8V3H3v10Zm10 8h8V11h-8v10ZM3 21h8v-6H3v6Zm10-10h8V3h-8v8Z" fill="currentColor" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0ZM4 21v-1a6 6 0 0 1 12 0v1H4Zm14-7a4 4 0 0 0 0-8v8Zm2 7v-1a6 6 0 0 0-3-5.2 7.9 7.9 0 0 1 5 5.2v1h-2Z" fill="currentColor" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M4 3h7a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H4V3Zm16 0h-7a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h8V3Z" fill="currentColor" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M9 16.2 4.8 12 3.4 13.4 9 19 21 7l-1.4-1.4L9 16.2Z" fill="currentColor" />
    </svg>
  ),
};
