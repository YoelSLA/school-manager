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
  if (totalPages <= 1) return null;

  const goTo = (p: number) => {
    if (p < 1 || p > totalPages) return;
    onChange(p);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.pagination__nav}
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
      >
        ‹
      </button>

      <div className={styles.pagination__pages}>
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            className={`${styles.pagination__page} ${p === page ? styles["pagination__page--active"] : ""
              }`}
            onClick={() => goTo(p)}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.pagination__nav}
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
      >
        ›
      </button>
    </div>
  );
}
