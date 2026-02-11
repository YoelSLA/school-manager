import { useState } from "react";
import type { FieldValues, UseFormRegister } from "react-hook-form";
import type {
  Franja,
  FormWithFranjas,
} from "@/features/designaciones/types/designacion.types";

import Button from "@/components/Button";
import { DEFAULT_FRANJA } from "@/features/designaciones/utils/designacion.utils";
import FranjasHorariasList from "./FranjasHorariasList";
import styles from "./FranjasHorariasBox.module.scss";
import ErrorModal from "@/components/ErrorModal";

type Props<T extends FieldValues & FormWithFranjas> = {
  fields: { id: string }[];
  register: UseFormRegister<T>;
  append: (value: Franja) => void;
  remove: (index: number) => void;
};

export default function FranjasHorariasBox<
  T extends FieldValues & FormWithFranjas
>({
  fields,
  register,
  append,
  remove,
}: Props<T>) {
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
            onClick={() => append(DEFAULT_FRANJA)}
          >
            + Agregar franja
          </Button>
        </div>
      </section>

      {error && (
        <ErrorModal
          error={error}
          onClose={() => setError(null)}
        />
      )}
    </>
  );
}
