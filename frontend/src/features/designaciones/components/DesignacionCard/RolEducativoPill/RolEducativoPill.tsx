import { Briefcase } from "lucide-react";
import { ROL_EDUCATIVO_LABELS } from "@/utils";
import type { RolEducativo } from "@/utils/types/enums";
import styles from "./RolEducativoPill.module.scss";

type Props = {
	rolEducativo: RolEducativo;
};

export default function RolEducativoPill({ rolEducativo }: Props) {
	return (
		<span className={styles.pill}>
			<Briefcase size={16} />
			{ROL_EDUCATIVO_LABELS[rolEducativo]}
		</span>
	);
}
