import { Briefcase } from "lucide-react";
import { ROL_EDUCATIVO_LABELS } from "@/utils";
import styles from "./RolEducativoPill.module.scss";
import { RolEducativo } from "@/utils/types/enums";

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
