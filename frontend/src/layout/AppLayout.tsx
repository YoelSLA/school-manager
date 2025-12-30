import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./appLayout.css";

const AppLayout = () => {
  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>

      {/* CONTENIDO */}
      <div className="content">
        {/* HEADER */}
        <div className="header-wrapper">
          <Header />
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="content-wrapper">
          <main className="main-card">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
