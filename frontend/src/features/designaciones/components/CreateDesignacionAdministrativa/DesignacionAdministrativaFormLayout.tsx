import Button from "@/components/Button";
import type { DesignacionAdministrativaFormValues } from "@/shared/utils/types";
import type {
	FieldArrayWithId,
	UseFieldArrayAppend,
	UseFieldArrayRemove,
	UseFormRegister,
} from "react-hook-form";
import styles from "../DesignacionFormLayout.module.scss";
import FranjasHorariasBoxAdministrativa from "./FranjasHorariasBoxAdministrativa";

type Props = {
	left: React.ReactNode;
	isSubmitting: boolean;
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

export default function DesignacionAdministrativaFormLayout({
	left,
	isSubmitting,
	fields,
	register,
	append,
	remove,
}: Props) {
	return (
		<div className={styles["designacion-form"]}>
			<div className={styles["designacion-form__grid"]}>
				<div className={styles["designacion-form__content"]}>
					<div className={styles["designacion-form__left"]}>{left}</div>

					<div className={styles["designacion-form__right"]}>
						<FranjasHorariasBoxAdministrativa
							fields={fields}
							register={register}
							append={append}
							remove={remove}
						/>
					</div>
				</div>

				<div className={styles["designacion-form__footer"]}>
					<Button type="submit" variant="primary" disabled={isSubmitting}>
						{isSubmitting ? "Guardando…" : "Guardar"}
					</Button>
				</div>
			</div>
		</div>
	);
}
