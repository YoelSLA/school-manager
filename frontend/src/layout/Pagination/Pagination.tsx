import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/Button";
import styles from "./Pagination.module.scss";

type Props = {
	page: number;
	totalPages: number;
	onChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onChange }: Props) {
	if (totalPages === 0) {
		return null;
	}

	const goTo = (p: number) => {
		if (p < 0 || p >= totalPages) {
			return;
		}

		onChange(p);
	};

	const pages = Array.from({ length: totalPages }, (_, i) => i);

	return (
		<div className={styles.pagination}>
			<Button
				type="button"
				size="icon"
				variant="secondary"
				className={styles.pagination__nav}
				onClick={() => goTo(page - 1)}
				disabled={page === 0}
			>
				<ChevronLeft size={16} />
			</Button>

			<div className={styles.pagination__pages}>
				{pages.map((p) => (
					<Button
						key={p}
						type="button"
						size="sm"
						variant={p === page ? "primary" : "ghost"}
						className={`${styles.pagination__page} ${
							p === page ? styles["pagination__page--active"] : ""
						}`}
						onClick={() => goTo(p)}
					>
						{p + 1}
					</Button>
				))}
			</div>

			<Button
				type="button"
				size="icon"
				variant="secondary"
				className={styles.pagination__nav}
				onClick={() => goTo(page + 1)}
				disabled={page === totalPages - 1}
			>
				<ChevronRight size={16} />
			</Button>
		</div>
	);
}
