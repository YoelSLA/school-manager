import Button from "@/components/Button";
import styles from "./CoberturaCardActions.module.scss";

type Props = {
	designacionId: number;
	onCambiarCobertura: (id: number) => void;
};

export default function CoberturaCardActions({
	designacionId,
	onCambiarCobertura,
}: Props) {
	return (
		<div className={styles.actions}>
			<Button
				variant="primary"
				size="sm"
				type="button"
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();

					onCambiarCobertura(designacionId);
				}}
			>
				Cambiar cobertura
			</Button>
		</div>
	);
}
