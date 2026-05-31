import { useState } from "react";
import type {
	FieldArrayWithId,
	UseFieldArrayAppend,
	UseFieldArrayRemove,
	UseFormRegister,
} from "react-hook-form";
import Button from "@/components/Button";
import ErrorModal from "@/components/ModalError";
import { DEFAULT_FRANJA } from "@/features/designaciones/utils/designacion.utils";
import type { DesignacionAdministrativaFormValues } from "@/shared/utils/types";
import styles from "../../FranjasHorariasBox.module.scss";
import FranjasHorariasListAdministrativa from "./FranjasHorariasListAdministrativa";

type Props = {
	fields: FieldArrayWithId<
		DesignacionAdministrativaFormValues,
		"franjasHorarias"
	>[];
	register: UseFormRegister<DesignacionAdministrativaFormValues>;
	append: UseFieldArrayAppend<
		DesignacionAdministrativaFormValues,
		"franjasHorarias"
	>;
	remove: UseFieldArrayRemove;
};

export default function FranjasHorariasBoxAdministrativa({
	fields,
	register,
	append,
	remove,
}: Props) {
	const [error, setError] = useState<{
		title: string;
		message: string;
	} | null>(null);

	const handleRemove = (index: number) => {
		if (fields.length === 1) {
			setError({
				title: "No se puede eliminar",
				message: "Debe existir al menos una franja horaria.",
			});
			return;
		}

		remove(index);
	};

	return (
		<>
			<section className={styles.box}>
				<h4 className={styles.title}>Franjas horarias</h4>

				<div className={styles.list}>
					<FranjasHorariasListAdministrativa
						fields={fields}
						register={register}
						remove={handleRemove}
					/>
				</div>

				<div className={styles.footer}>
					<Button
						type="button"
						size="sm"
						variant="secondary"
						onClick={() => append(DEFAULT_FRANJA)}
					>
						+ Agregar franja
					</Button>
				</div>
			</section>

			{error && <ErrorModal error={error} onClose={() => setError(null)} />}
		</>
	);
}
