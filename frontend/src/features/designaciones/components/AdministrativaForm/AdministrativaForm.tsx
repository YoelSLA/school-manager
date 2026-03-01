
import { useDesignacionAdministrativaForm } from "@/features/designaciones/form/hooks/useDesignacionAdministrativaForm";
import DesignacionFormLayout from "../DesignacionFormLayout/DesignacionFormLayout";
import RolEducativoSelectField from "../../../../components/forms/selects/RolEducativoSelectField/RolEducativoSelectField";
import styles from "./AdministrativaForm.module.scss";
import type { SubmitHandler } from "react-hook-form";
import CupofAdministrativaInputField from "@/components/forms/inputs/CupofAdministrativaInputField";
import { DesignacionAdministrativaFormValues } from "../../types/designacion.types";

type Props = {
	onSubmit: (data: DesignacionAdministrativaFormValues) => Promise<void>;
	isSubmitting: boolean;
};

export default function AdministrativaForm({
	onSubmit,
	isSubmitting,
}: Props) {

	const {
		form: { register, handleSubmit, formState: { errors } },
		franjas: { fields, append, remove },
	} = useDesignacionAdministrativaForm();

	const onSubmitHandler: SubmitHandler<DesignacionAdministrativaFormValues> =
		async (data) => {
			await onSubmit(data);
		};

	return (
		<form
			onSubmit={handleSubmit(
				async (data) => {
					console.log("✅ PASÓ VALIDACIÓN:", data);
					console.log("DATA:", data);

					console.log("typeof cupof:", typeof data.cupof);
					console.log("typeof cursoId:", typeof data.cursoId);
					console.log("typeof materiaId:", typeof data.materiaId);

					console.log("franjasHorarias:", data.franjasHorarias);
					console.log("es array?", Array.isArray(data.franjasHorarias));

					console.log("tipo dia:", typeof data.franjasHorarias[0]?.dia);
					onSubmitHandler
				},
				(errors) => {
					console.log("❌ ERRORES:", errors);
				}
			)}
		>
			<DesignacionFormLayout
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
