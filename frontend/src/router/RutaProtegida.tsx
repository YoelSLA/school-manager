import { Navigate } from "react-router-dom";
import { useEscuela } from "../context/EscuelaContext";

type Props = {
  children: React.ReactNode;
};

export default function RutaProtegida({ children }: Props) {
  const { escuela } = useEscuela();

  if (!escuela) {
    return <Navigate to="/seleccionar-escuela" replace />;
  }

  return children;
}
