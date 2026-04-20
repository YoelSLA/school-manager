import type {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import Button from "@/components/Button";
import styles from "../DesignacionFormLayout.module.scss";
import type { DesignacionCursoFormValues } from "@/utils/types";
import FranjasHorariasBoxCurso from "./FranjasHorariasBoxCurso";

type Props = {
  left: React.ReactNode;
  isSubmitting: boolean;
  fields: FieldArrayWithId<DesignacionCursoFormValues, "franjasHorarias">[];
  register: UseFormRegister<DesignacionCursoFormValues>;
  append: UseFieldArrayAppend<
    DesignacionCursoFormValues,
    "franjasHorarias"
  >;
  remove: UseFieldArrayRemove;
};

export default function DesignacionCursoFormLayout({
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
            <FranjasHorariasBoxCurso
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