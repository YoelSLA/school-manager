import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";
import { Navigate } from "react-router-dom";

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
