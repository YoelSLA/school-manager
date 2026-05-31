import CupofAdministrativaInputField from "@/features/designaciones/components/fields/CupofAdministrativaInputField";
import RolEducativoSelectField from "@/features/designaciones/components/fields/RolEducativoSelectField";
import { useCreateDesignacionAdministrativaForm } from "@/features/designaciones/form/hooks/useCreateDesignacionAdministrativaForm";
import type { DesignacionAdministrativaCreateDTO } from "@/shared/utils/types";
import DesignacionAdministrativaFormLayout from "../DesignacionAdministrativaCreate/DesignacionAdministrativaFormLayout";
import styles from "./DesignacionAdministrativaForm.module.scss";

type Props = {
	onSubmit: (data: DesignacionAdministrativaCreateDTO) => Promise<void>;
	isSubmitting: boolean;
};

export default function DesignacionAdministrativaForm({
	onSubmit,
	isSubmitting,
}: Props) {
	const {
		form: {
			register,
			handleSubmit,
			formState: { errors },
		},
		franjas: { fields, append, remove },
	} = useCreateDesignacionAdministrativaForm();

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<DesignacionAdministrativaFormLayout
				left={
					<div className={styles.left}>
						<CupofAdministrativaInputField
							register={register}
							error={errors.cupof?.message}
						/>

						<RolEducativoSelectField
							register={register}
							error={errors.rolEducativo?.message}
							disabled={isSubmitting}
						/>
					</div>
				}
				fields={fields}
				register={register}
				append={append}
				remove={remove}
				isSubmitting={isSubmitting}
			/>
		</form>
	);
}
