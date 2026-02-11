import type { LucideIcon } from "lucide-react";
import styles from "./DatoPersonalItem.module.scss";

type Props = {
	icon: LucideIcon;
	label: string;
	value: React.ReactNode;
};

export default function DatoPersonalItem({ icon: Icon, label, value }: Props) {
	return (
		<div className={styles.item}>
			<Icon size={14} className={styles.icon} />
			<span className={styles.label}>{label}</span>
			<span className={styles.value}>{value}</span>
		</div>
	);
}
