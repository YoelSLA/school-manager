import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import PageLayout from "@/layout/PageLayout/PageLayout";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";
import EmpleadoEducativoForm from "../../components/EmpleadoEducativoForm";
import type { EmpleadoEducativoFormOutput } from "../../form/empleadoEducativo.form.types";
import { useEmpleadoEducativoForm } from "../../form/useEmpleadoEducativoForm";
import { useCrearEmpleadoEducativo } from "../../hooks/useCrearEmpleadoEducativo";
import styles from "./EmpleadoEducativoCreatePage.module.scss";

export default function EquipoEducativoCreatePage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);
	const hoy = new Date().toLocaleDateString("en-CA", {
		timeZone: "America/Argentina/Buenos_Aires",
	});
	const crearEmpleado = useCrearEmpleadoEducativo();
	const [usarHoy, setUsarHoy] = useState(true);
	const [cuilExiste, setCuilExiste] = useState(false);

	const {
		form: {
			register,
			handleSubmit,
			setValue,
			setError,
			reset,
			formState: { errors, isSubmitting },
		},
	} = useEmpleadoEducativoForm();
	const navigate = useNavigate();

	/* =====================
		 FECHA INGRESO
	===================== */
	const toggleFechaIngreso = () => {
		setUsarHoy((prev) => {
			const nuevo = !prev;
			setValue("fechaDeIngreso", nuevo ? hoy : "");
			return nuevo;
		});
	};

	/* =====================
		 SUBMIT
	===================== */
	const onSubmit = async (data: EmpleadoEducativoFormOutput) => {
		if (!escuelaActiva) {
			toast.error("No hay escuela seleccionada");
			return;
		}

		if (cuilExiste) {
			toast.error("Ese CUIL ya está registrado");
			return;
		}

		try {
			await crearEmpleado.mutateAsync({
				escuelaId: escuelaActiva.id,
				data,
			});

			toast.success("Personal educativo creado correctamente");
			navigate("/empleadosEducativos");

			reset({
				...data,
				cuil: "",
				nombre: "",
				apellido: "",
				email: "",
				domicilio: "",
				telefono: "",
				fechaDeNacimiento: "",
				fechaDeIngreso: hoy,
			});

			setUsarHoy(true);
			setCuilExiste(false);
		} catch (error: unknown) {
			const axiosError = error as AxiosError;

			if (axiosError.response?.status === 409) {
				setError("cuil", {
					type: "manual",
					message: "Ese CUIL ya está registrado",
				});
				setCuilExiste(true);
				toast.error("Ese CUIL ya está registrado");
			} else {
				toast.error("Error al crear el personal educativo");
			}
		}
	};

	useEffect(() => {
		if (usarHoy) {
			setValue("fechaDeIngreso", hoy, { shouldDirty: true });
		}
	}, [usarHoy, hoy, setValue]);

	return (
		<PageLayout>
			<div className={styles.page}>
				<EmpleadoEducativoForm
					register={register}
					errors={errors}
					isSubmitting={isSubmitting}
					usarHoy={usarHoy}
					onToggleFecha={toggleFechaIngreso}
					onSubmit={handleSubmit(onSubmit)}
				/>
			</div>
		</PageLayout>
	);
}
