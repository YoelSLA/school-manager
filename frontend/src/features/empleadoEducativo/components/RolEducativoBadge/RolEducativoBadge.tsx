import type { RolEducativo } from "@/shared/types/enums";
import { ROL_EDUCATIVO_LABELS } from "@/shared/utils";
import styles from "./RolEducativoBadge.module.scss";

type Props = {
	value: RolEducativo;
};

export default function RolEducativoBadge({ value }: Props) {
	const label = ROL_EDUCATIVO_LABELS[value];

	return <span className={styles.chip}>{label}</span>;
}
