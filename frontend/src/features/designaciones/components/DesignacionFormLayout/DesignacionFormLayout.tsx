import type {
	ArrayPath,
	FieldArrayWithId,
	FieldValues,
	UseFieldArrayAppend,
	UseFieldArrayRemove,
	UseFormRegister,
} from "react-hook-form";
import Button from "@/components/Button";
import FranjasHorariasBox from "../FranjasHorariasBox/FranjasHorariasBox";
import styles from "./DesignacionFormLayout.module.scss";
import type { FormWithFranjas } from "@/utils/types";

type FranjasPath<T extends FieldValues> = Extract<ArrayPath<T>, "franjasHorarias">;

type Props<T extends FieldValues & FormWithFranjas> = {
	left: React.ReactNode;
	isSubmitting: boolean;
	fields: FieldArrayWithId<T, FranjasPath<T>>[];
	register: UseFormRegister<T>;
	append: UseFieldArrayAppend<T, FranjasPath<T>>;
	remove: UseFieldArrayRemove;
};

export default function DesignacionFormLayout<
	T extends FieldValues & FormWithFranjas
>({
	left,
	isSubmitting,
	fields,
	register,
	append,
	remove,
}: Props<T>) {
	return (
		<div className={styles["designacion-form"]}>
			<div className={styles["designacion-form__grid"]}>
				<div className={styles["designacion-form__content"]}>
					<div className={styles["designacion-form__left"]}>
						{left}
					</div>

					<div className={styles["designacion-form__right"]}>
						<FranjasHorariasBox<T>
							fields={fields}
							register={register}
							append={append}
							remove={remove}
						/>
					</div>
				</div>

				<div className={styles["designacion-form__footer"]}>
					<Button
						type="submit"
						variant="primary"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Guardando…" : "Guardar"}
					</Button>
				</div>
			</div>
		</div>
	);
}
