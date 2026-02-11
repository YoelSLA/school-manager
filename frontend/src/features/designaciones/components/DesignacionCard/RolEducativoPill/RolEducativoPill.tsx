import { Briefcase } from "lucide-react";
import type { rolEducativoLabels } from "../../../utils/designacion.badges";
import styles from "./RolEducativoPill.module.scss";

type Props = {
	rolEducativo: keyof typeof rolEducativoLabels;
};

export default function RolEducativoPill({ rolEducativo }: Props) {
	return (
		<span className={styles.pill}>
			<Briefcase size={16} />
			{rolEducativo.toLocaleUpperCase()}
		</span>
	);
}
