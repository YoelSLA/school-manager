import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";
import { useEmpleadoEducativoEditForm } from "../../form/hooks";
import type { EmpleadoEducativoUpdateDTO } from "../../types";
import { useEditarEmpleadoEducativo } from "../mutations";
import { useEmpleadoNavigation } from "../navigation";
import { useEmpleadoEducativo } from "../queries";

export function useEmpleadoEducativoUpdatePage() {
	const { empleadoId } = useParams();

	const escuelaActiva = useAppSelector(selectEscuelaActiva);

	const empleadoNav = useEmpleadoNavigation();

	const eId = Number(empleadoId);

	/* =========================
     QUERY
  ========================= */

	const query = useEmpleadoEducativo(eId);

	const empleado = query.data;

	/* =========================
     FORM
  ========================= */

	const { form } = useEmpleadoEducativoEditForm();

	useEffect(() => {
		if (!empleado) return;

		form.reset({
			cuil: empleado.cuil,
			nombre: empleado.nombre,
			apellido: empleado.apellido,
			domicilio: empleado.domicilio ?? "",
			telefono: empleado.telefono ?? "",
			email: empleado.email,
			fechaDeNacimiento: empleado.fechaDeNacimiento,
			fechaDeIngreso: empleado.fechaDeIngreso ?? "",
		});
	}, [empleado, form]);

	/* =========================
     UPDATE
  ========================= */

	const mutation = useEditarEmpleadoEducativo();

	const updateEmpleado = (data: EmpleadoEducativoUpdateDTO) => {
		if (!escuelaActiva) return;

		mutation.mutate(
			{
				escuelaId: escuelaActiva.id,
				empleadoId: eId,
				data,
			},
			{
				onSuccess: () => {
					if (empleado) {
						empleadoNav.verDetalle(empleado);
					}
				},
			},
		);
	};

	/* =========================
     CANCEL
  ========================= */

	const cancel = () => {
		if (empleado) {
			empleadoNav.verDetalle(empleado);
		}
	};

	return {
		query: {
			...query,
			empleado,
		},

		form,

		update: {
			submit: updateEmpleado,
			isPending: mutation.isPending,
		},

		cancel,
	};
}
