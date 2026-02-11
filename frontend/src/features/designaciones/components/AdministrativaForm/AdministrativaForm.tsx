import type {
	DesignacionAdministrativaFormInput,
	DesignacionAdministrativaFormOutput,
} from "@/features/designaciones/form/designacion.form.types";
import { useDesignacionAdministrativaForm } from "@/features/designaciones/form/hooks/useDesignacionAdministrativaForm";
import DesignacionFormLayout from "../DesignacionFormLayout/DesignacionFormLayout";
import CupofInputField from "../../../../components/forms/inputs/CupofInputField";
import RolEducativoSelectField from "../../../../components/forms/selects/RolEducativoSelectField/RolEducativoSelectField";
import styles from "./AdministrativaForm.module.scss";

type Props = {
	onSubmit: (data: DesignacionAdministrativaFormOutput) => Promise<void>;
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
			<DesignacionFormLayout<DesignacionAdministrativaFormInput>
				left={
					<div className={styles.left}>
						<CupofInputField<DesignacionAdministrativaFormInput>
							register={register}
							name="cupof"
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
