import { ROL_EDUCATIVO_LABELS } from "@/utils";
import type { RolEducativo } from "@/utils/types/enums";
import styles from "./RolEducativoBadge.module.scss";

type Props = {
	value: RolEducativo;
};

export default function RolEducativoBadge({ value }: Props) {
	const label = ROL_EDUCATIVO_LABELS[value];

	return <span className={styles.chip}>{label}</span>;
}
