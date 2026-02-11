import { Navigate } from "react-router-dom";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";

type Props = {
	children: React.ReactNode;
};

export default function RutaProtegida({ children }: Props) {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);
	if (!escuelaActiva) {
		return <Navigate to="/seleccionar-escuela" replace />;
	}

	return children;
}
