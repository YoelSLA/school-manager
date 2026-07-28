import Button from "@/components/Button";
import ListState from "@/components/ListState";
import styles from "./GridListState.module.scss";

type Props<T> = {
	isLoading?: boolean;
	isError?: boolean;
	items: T[];

	loadingMessage?: string;
	emptyMessage?: string;
	errorMessage?: string;

	onRetry?: () => void;

	renderItem: (item: T, index: number) => React.ReactNode;
	getKey?: (item: T, index: number) => React.Key;
};

export default function GridListState<T>({
	isLoading = false,
	isError = false,
	items,
	loadingMessage = "Cargando…",
	emptyMessage = "No hay datos.",
	errorMessage = "Ocurrió un error.",
	onRetry,
	renderItem,
	getKey,
}: Props<T>) {
	if (isLoading) {
		return <ListState>{loadingMessage}</ListState>;
	}

	if (isError) {
		return (
			<div className={styles.state}>
				<ListState>{errorMessage}</ListState>
				{onRetry && (
					<Button size="sm" onClick={onRetry}>
						Reintentar
					</Button>
				)}
			</div>
		);
	}

	if (items.length === 0) {
		return <ListState>{emptyMessage}</ListState>;
	}

	return (
		<div className={styles.container}>
			<div className={styles.grid}>
				{items.map((item, index) => (
					<div key={getKey ? getKey(item, index) : index}>
						{renderItem(item, index)}
					</div>
				))}
			</div>
		</div>
	);
}
