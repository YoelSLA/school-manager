import type { FieldArrayWithId, UseFormRegister } from "react-hook-form";
import type { DesignacionCursoFormValues } from "@/shared/utils/types";
import styles from "../../FranjasHorariasList.module.scss";
import FranjaHorariaRowCurso from "./FranjaHorariaRowCurso";

type Props = {
	fields: FieldArrayWithId<DesignacionCursoFormValues, "franjasHorarias">[];
	register: UseFormRegister<DesignacionCursoFormValues>;
	remove: (index: number) => void;
};

export default function FranjasHorariasListCurso({
	fields,
	register,
	remove,
}: Props) {
	return (
		<div className={styles.list}>
			{fields.map((field, index) => (
				<FranjaHorariaRowCurso
					key={field.id}
					index={index}
					register={register}
					onRemove={() => remove(index)}
				/>
			))}
		</div>
	);
}
