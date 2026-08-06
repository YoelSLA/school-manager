import {
  ChevronRight,
  FileText,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./AdministracionPage.module.scss";

export default function AdministracionPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Administración</h1>

        <p>
          Gestione catálogos, documentos y configuraciones del sistema.
        </p>
      </header>

      <section className={styles.section}>
        <h2>Catálogos</h2>

        <div className={styles.grid}>
          <button
            type="button"
            className={styles.card}
            onClick={() =>
              navigate("/administracion/licencias-estatutarias")
            }
          >
            <div className={styles.cardIcon}>
              <Settings size={28} />
            </div>

            <div className={styles.cardBody}>
              <h3>Licencias estatutarias</h3>

              <p>
                Administre las licencias definidas por el Estatuto
                Docente.
              </p>
            </div>

            <div className={styles.cardFooter}>
              <span>Gestionar</span>

              <ChevronRight size={18} />
            </div>
          </button>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Documentos</h2>

        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.disabled}`}>
            <div className={styles.cardIcon}>
              <FileText size={28} />
            </div>

            <div className={styles.cardBody}>
              <h3>Plantillas PDF</h3>

              <p>
                Gestione las plantillas utilizadas para la generación de
                documentos.
              </p>
            </div>

            <div className={styles.cardFooter}>
              <span>Próximamente</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}