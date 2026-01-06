import { routeTitles } from "@/router/routerTitles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const crumbs = routeTitles[location.pathname];

  // 👉 destino del botón volver (crumb anterior)
  const backTarget =
    crumbs && crumbs.length > 1 ? crumbs[crumbs.length - 2].to : null;

  return (
    <header className="header">
      <div className="header-left">
        {crumbs ? (
          <nav className="breadcrumb">
            {/* BOTÓN VOLVER */}
            {backTarget && (
              <button
                className="breadcrumb-back"
                onClick={() => navigate(backTarget)}
                aria-label="Volver"
              >
                ←
              </button>
            )}

            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1;

              return (
                <span key={index} className="breadcrumb-item">
                  {crumb.to && !isLast ? (
                    <Link to={crumb.to} className="breadcrumb-link">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="breadcrumb-current">{crumb.label}</span>
                  )}

                  {!isLast && <span className="breadcrumb-separator">/</span>}
                </span>
              );
            })}
          </nav>
        ) : (
          <h1 className="header-title">Dashboard</h1>
        )}
      </div>

      {/* derecha del header igual que antes */}
    </header>
  );
};

export default Header;
