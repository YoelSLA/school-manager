import { BookOpen, Compass, GraduationCap, } from "lucide-react";
import type { DesignacionDetalleDTO } from "@/utils/types";
import styles from "./DesignacionDatos.module.scss";

type Props = {
  designacion: DesignacionDetalleDTO;
};

export default function DesignacionDatos({ designacion }: Props) {
  const { tipo } = designacion;
  const esCurso = tipo === "CURSO";

  return (
    <section className={styles.root}>
      {/* 🔥 TITULO */}
      <h3 className={styles.title}>DATOS</h3>

      {/* CONTENIDO */}
      <div className={styles.datos}>
        <div className={styles.content}>
          {esCurso && (
            <div className={styles.center}>
              <div className={styles.badge}>
                <BookOpen size={16} />
                <span>{designacion.materia}</span>
              </div>

              <div className={styles.badge}>
                <GraduationCap size={16} />
                <span>{designacion.curso}</span>
              </div>

              <div className={styles.badge}>
                <Compass size={16} />
                <span>{designacion.orientacion}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}