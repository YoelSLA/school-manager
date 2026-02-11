import Button from "@/components/Button";
import "./CubrirDesignacionesButton.css";

type Props = {
	disabled: boolean;
	onClick: () => void;
};

export default function CubrirDesignacionesButton({
	disabled,
	onClick,
}: Props) {
	return (
		<Button
			variant="primary"
			size="sm"
			className="cubrir-designaciones-button"
			disabled={disabled}
			onClick={onClick}
		>
			Cubrir seleccionadas
		</Button>
	);
}
