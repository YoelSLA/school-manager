import { Briefcase } from "lucide-react";
import type { RolEducativo } from "@/features/designaciones/types/designacion.types";
import { ROL_EDUCATIVO_LABELS } from "@/utils";
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
