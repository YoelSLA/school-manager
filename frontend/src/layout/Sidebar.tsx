import { useEscuela } from "@/context/EscuelaContext";
import { NavLink, useNavigate } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const { escuelaActiva, limpiarEscuela } = useEscuela();
  const navigate = useNavigate();

  const cambiarEscuela = () => {
    limpiarEscuela();
    navigate("/");
  };

  return (
    <aside className="sidebar">
      {/* HEADER */}
      <div className="sidebar-header">
        <div className="sidebar-title">{escuelaActiva?.nombre}</div>

        <button className="change-school" onClick={cambiarEscuela}>
          Cambiar escuela
        </button>
      </div>

      {/* NAV */}
      <nav className="sidebar-nav">
        {/* GESTIÓN */}
        <NavItem to="/dashboard" label="Dashboard" icon="dashboard" />
        <NavItem to="/empleados" label="Empleado educativo" icon="users" />
        <NavItem to="/designaciones" label="Designaciones" icon="clipboard" />
        <NavItem to="/cursos" label="Cursos" icon="book" />
        <NavItem to="/materias" label="Materias" icon="layers" />
        <NavItem to="/asistencias" label="Asistencias" icon="check" />
        <NavItem to="/licencias" label="Licencias" icon="licenses" />
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
  icon:
    | "dashboard"
    | "users"
    | "book"
    | "check"
    | "clipboard"
    | "layers"
    | "licenses";
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
      <path
        d="M3 13h8V3H3v10Zm10 8h8V11h-8v10ZM3 21h8v-6H3v6Zm10-10h8V3h-8v8Z"
        fill="currentColor"
      />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0ZM4 21v-1a6 6 0 0 1 12 0v1H4Zm14-7a4 4 0 0 0 0-8v8Zm2 7v-1a6 6 0 0 0-3-5.2 7.9 7.9 0 0 1 5 5.2v1h-2Z"
        fill="currentColor"
      />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M4 3h7a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H4V3Zm16 0h-7a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h8V3Z"
        fill="currentColor"
      />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M9 16.2 4.8 12 3.4 13.4 9 19 21 7l-1.4-1.4L9 16.2Z"
        fill="currentColor"
      />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M12 3 2 9l10 6 10-6-10-6Zm0 10L2 7v4l10 6 10-6V7l-10 6Zm0 6-8-4v4l8 4 8-4v-4l-8 4Z"
        fill="currentColor"
      />
    </svg>
  ),
  clipboard: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M9 2h6a2 2 0 0 1 2 2h2v18H5V4h2a2 2 0 0 1 2-2Zm0 2v2h6V4H9Zm-2 6h10v2H7v-2Zm0 4h10v2H7v-2Z"
        fill="currentColor"
      />
    </svg>
  ),
  licenses: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M7 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 2v16h8V4H7Zm2 3h4v2H9V7Zm0 4h4v2H9v-2Zm0 4h3v2H9v-2Z"
        fill="currentColor"
      />
      <path d="M19 8h2v2h-2V8Zm0 4h2v2h-2v-2Z" fill="currentColor" />
    </svg>
  ),
};
