import { useState } from "react";
import type {
	ArrayPath,
	FieldArray,
	FieldArrayWithId,
	FieldValues,
	UseFieldArrayAppend,
	UseFieldArrayRemove,
	UseFormRegister,
} from "react-hook-form";
import Button from "@/components/Button";
import ErrorModal from "@/components/ErrorModal";
import { DEFAULT_FRANJA } from "@/features/designaciones/utils/designacion.utils";
import type { FormWithFranjas } from "@/utils/types";
import styles from "./FranjasHorariasBox.module.scss";
import FranjasHorariasList from "./FranjasHorariasList";

type FranjasPath<T extends FormWithFranjas> = Extract<
	ArrayPath<T>,
	"franjasHorarias"
>;

type Props<T extends FieldValues & FormWithFranjas> = {
	fields: FieldArrayWithId<T, FranjasPath<T>>[];
	register: UseFormRegister<T>;
	append: UseFieldArrayAppend<T, FranjasPath<T>>;
	remove: UseFieldArrayRemove;
};

export default function FranjasHorariasBox<
	T extends FieldValues & FormWithFranjas,
>({ fields, register, append, remove }: Props<T>) {
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
					<FranjasHorariasList<T>
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
						onClick={() =>
							append(DEFAULT_FRANJA as FieldArray<T, FranjasPath<T>>)
						}
					>
						+ Agregar franja
					</Button>
				</div>
			</section>

			{error && <ErrorModal error={error} onClose={() => setError(null)} />}
		</>
	);
}
