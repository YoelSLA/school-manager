import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import EmpleadosHub from "../pages/EmpleadoEducativoHub";
import EquipoCrear from "../pages/EmpleadoForm";
import EquipoPage from "../pages/EquipoPage";
import SeleccionEscuela from "../pages/SeleccionEscuela";
import RutaProtegida from "./RutaProtegida";

export default function AppRouter() {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/seleccionar-escuela" element={<SeleccionEscuela />} />

      {/* Rutas protegidas */}
      <Route
        element={
          <RutaProtegida>
            <AppLayout />
          </RutaProtegida>
        }
      >
        {/* HOME */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route path="/dashboard" element={<div>Dashboard</div>} />

        {/* EMPLEADOS */}
        <Route path="/empleados" element={<EmpleadosHub />} />
        <Route path="/empleados/crear" element={<EquipoCrear />} />
        <Route path="/empleados/listar" element={<EquipoPage />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/seleccionar-escuela" />} />
    </Routes>
  );
}
