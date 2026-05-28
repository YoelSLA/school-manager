// DatoPersonalItem.tsx

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
			<div className={styles.iconWrapper}>
				<Icon size={15} className={styles.icon} />
			</div>

			<div className={styles.content}>
				<span className={styles.label}>{label}</span>

				<span className={styles.value}>{value}</span>
			</div>
		</div>
	);
}
