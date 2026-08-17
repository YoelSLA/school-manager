import { useDesignacionAdministrativaFormCreate } from "../../../form/hooks";
import type { DesignacionAdministrativaCreateDTO } from "../../../types";
import { DesignacionAdministrativaFormLayout } from "../../DesignacionAdministrativa";
import styles from "../../DesignacionAdministrativa/DesignacionAdministrativaForm.module.scss";
import CupoAdministrativaInputField from "../../FieldInputCupoAdministrativa";
import RolEducativoSelectField from "../../FieldSelectRolEducativo";

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
	} = useDesignacionAdministrativaFormCreate();

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<DesignacionAdministrativaFormLayout
				left={
					<div className={styles.left}>
						<CupoAdministrativaInputField
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
