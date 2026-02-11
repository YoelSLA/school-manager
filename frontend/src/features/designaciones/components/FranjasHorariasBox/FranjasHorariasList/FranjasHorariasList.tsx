import type { FieldValues, UseFormRegister } from "react-hook-form";
import type { FormWithFranjas } from "@/features/designaciones/types/designacion.types";

import FranjaHorariaRow from "./FranjaHorariaRow";
import styles from "./FranjasHorariasList.module.scss";

type Props<T extends FieldValues & FormWithFranjas> = {
  fields: { id: string }[];
  register: UseFormRegister<T>;
  remove: (index: number) => void;
};

export default function FranjasHorariasList<
  T extends FieldValues & FormWithFranjas
>({
  fields,
  register,
  remove,
}: Props<T>) {
  return (
    <div className={styles.list}>
      {fields.map((field, index) => (
        <FranjaHorariaRow
          key={field.id}
          index={index}
          register={register}
          onRemove={() => { remove(index) }}
        />
      ))}
    </div>
  );
}
