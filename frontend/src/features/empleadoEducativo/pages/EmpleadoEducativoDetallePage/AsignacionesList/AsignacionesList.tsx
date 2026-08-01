import { useState } from "react";

import type {
  AsignacionEmpleadoEducativoRowDTO,
} from "@/features/asignaciones/types/asignaciones.types";
import type { Tab } from "@/shared/types";
import { esAsignacionAdministrativa, esAsignacionCurso } from "@/shared/utils";
import AsignacionesContent from "./AsignacionesContent";
import styles from "./AsignacionesList.module.scss";
import AsignacionesTabs from "./AsignacionesTabs";

type Props = {
  asignaciones: AsignacionEmpleadoEducativoRowDTO[];
};

export default function AsignacionesList({ asignaciones }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("DOCENTE");

  const asignacionesDocentes = asignaciones.filter(esAsignacionCurso);

  const asignacionesAdministrativas = asignaciones.filter(
    esAsignacionAdministrativa,
  );

  const visibleAsignaciones =
    activeTab === "DOCENTE"
      ? asignacionesDocentes
      : asignacionesAdministrativas;

  return (
    <section className={styles.asignaciones}>
      <header className={styles.header}>
        <h3 className={styles.title}>CARGOS</h3>

        <AsignacionesTabs
          activeTab={activeTab}
          onChange={setActiveTab}
          docentesCount={asignacionesDocentes.length}
          administrativosCount={asignacionesAdministrativas.length}
        />
      </header>

      <AsignacionesContent
        tab={activeTab}
        asignaciones={visibleAsignaciones}
      />
    </section>
  );
}