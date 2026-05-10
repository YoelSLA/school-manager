import type { FieldArrayWithId, UseFormRegister } from "react-hook-form";
import type { DesignacionAdministrativaFormValues } from "@/utils/types";
import styles from "../FranjasHorariasList.module.scss";
import FranjaHorariaRowAdministrativa from "./FranjaHorariaRowAdministrativa";

type Props = {
	fields: FieldArrayWithId<
		DesignacionAdministrativaFormValues,
		"franjasHorarias"
	>[];
	register: UseFormRegister<DesignacionAdministrativaFormValues>;
	remove: (index: number) => void;
};

export default function FranjasHorariasListAdministrativa({
	fields,
	register,
	remove,
}: Props) {
	return (
		<div className={styles.list}>
			{fields.map((field, index) => (
				<FranjaHorariaRowAdministrativa
					key={field.id}
					index={index}
					register={register}
					onRemove={() => remove(index)}
				/>
			))}
		</div>
	);
}
