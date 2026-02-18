import styles from "./Pagination.module.scss";

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  onChange,
}: Props) {

  console.log("🔵 Pagination render");
  console.log("page actual:", page);
  console.log("totalPages:", totalPages);

  if (totalPages <= 1) {
    console.log("⛔ No se renderiza porque totalPages <= 1");
    return null;
  }

  const goTo = (p: number) => {
    console.log("👉 Intentando ir a página:", p);

    if (p < 0 || p >= totalPages) {
      console.log("❌ Página fuera de rango:", p);
      return;
    }

    console.log("✅ Cambio válido, llamando onChange con:", p);
    onChange(p);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i);

  console.log("📄 Array de páginas generado:", pages);

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.pagination__nav}
        onClick={() => goTo(page - 1)}
        disabled={page === 0}
      >
        ‹
      </button>

      <div className={styles.pagination__pages}>
        {pages.map((p) => {
          console.log("Render botón página:", p);

          return (
            <button
              key={p}
              type="button"
              className={`${styles.pagination__page} ${p === page
                  ? styles["pagination__page--active"]
                  : ""
                }`}
              onClick={() => goTo(p)}
            >
              {p + 1}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className={styles.pagination__nav}
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages - 1}
      >
        ›
      </button>
    </div>
  );
}
