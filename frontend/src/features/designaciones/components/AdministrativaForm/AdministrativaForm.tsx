import CupofInputField from "@/components/forms/inputs/CupofInputField/CupofInputField";
import { useDesignacionAdministrativaForm } from "@/features/designaciones/form/hooks/useDesignacionAdministrativaForm";
import RolEducativoSelectField from "../../../../components/forms/selects/RolEducativoSelectField/RolEducativoSelectField";
import DesignacionFormLayout from "../DesignacionFormLayout/DesignacionFormLayout";
import styles from "./AdministrativaForm.module.scss";
import { DesignacionAdministrativaCreateDTO } from "@/utils/types";

type Props = {
	onSubmit: (data: DesignacionAdministrativaCreateDTO) => Promise<void>;
	isSubmitting: boolean;
};

export default function AdministrativaForm({ onSubmit, isSubmitting }: Props) {
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
			<DesignacionFormLayout<DesignacionAdministrativaCreateDTO>
				left={
					<div className={styles.left}>
						<CupofInputField<DesignacionAdministrativaCreateDTO>
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
