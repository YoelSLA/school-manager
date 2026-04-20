import CupofAdministrativaInputField from "@/components/forms/inputs/CupofAdministrativaInputField";
import RolEducativoSelectField from "@/components/forms/selects/RolEducativoSelectField";
import { useDesignacionAdministrativaForm } from "@/features/designaciones/form/hooks/useDesignacionAdministrativaForm";
import type { DesignacionAdministrativaCreateDTO } from "@/utils/types";
import DesignacionAdministrativaFormLayout from "../DesignacionAdministrativaFormLayout";
import styles from "./AdministrativaForm.module.scss";

type Props = {
	onSubmit: (data: DesignacionAdministrativaCreateDTO) => Promise<void>;
	isSubmitting: boolean;
};

export default function AdministrativaForm({
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
	} = useDesignacionAdministrativaForm();

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