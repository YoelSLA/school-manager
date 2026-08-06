import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";
import { getApiError, getErrorMessage } from "@/shared/http/errorHandler";
import { getTodayArgentinaISO } from "@/shared/utils/date";
import { crearEmpleadoEducativoSchema } from "../../form/schemas";
import type { EmpleadoEducativoCreateDTO } from "../../types";
import { useCrearEmpleadoEducativo } from "../mutations";
import { useEmpleadoNavigation } from "../navigation";

export function useEmpleadoEducativoCreatePage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);

	const crearEmpleado = useCrearEmpleadoEducativo();
	const empleadoNav = useEmpleadoNavigation();

	const hoy = getTodayArgentinaISO();

	/* =========================
     FORM
  ========================= */

	const form = useForm<EmpleadoEducativoCreateDTO>({
		resolver: zodResolver(crearEmpleadoEducativoSchema),
		defaultValues: {
			cuil: "",
			nombre: "",
			apellido: "",
			domicilio: undefined,
			telefono: undefined,
			email: "",
			fechaDeNacimiento: "",
			fechaDeIngreso: undefined,
		},
		mode: "onSubmit",
		criteriaMode: "all",
		shouldFocusError: true,
	});

	const {
		setValue,
		reset,
		setError,
		formState: { errors, isSubmitting },
	} = form;

	/* =========================
     INGRESO
  ========================= */

	const [agregarFecha, setAgregarFecha] = useState(false);
	const [usarHoy, setUsarHoy] = useState(false);

	const toggleAgregarFecha = () => {
		setAgregarFecha((prev) => {
			const nuevo = !prev;

			if (!nuevo) {
				setValue("fechaDeIngreso", undefined);
				setUsarHoy(false);
			}

			return nuevo;
		});
	};

	const toggleUsarHoy = () => {
		setUsarHoy((prev) => {
			const nuevo = !prev;

			setValue("fechaDeIngreso", nuevo ? hoy : undefined);

			return nuevo;
		});
	};

	/* =========================
     RESULTADO
  ========================= */

	const [modal, setModal] = useState({
		open: false,
		success: true,
		title: "",
		description: "",
	});

	const closeModal = () => {
		setModal((prev) => ({ ...prev, open: false }));

		if (modal.success) {
			empleadoNav.listar();
		}
	};

	/* =========================
     SUBMIT
  ========================= */

	const submit = async (data: EmpleadoEducativoCreateDTO) => {
		if (!escuelaActiva) {
			toast.error("No hay escuela seleccionada");
			return;
		}

		try {
			await crearEmpleado.mutateAsync({
				escuelaId: escuelaActiva.id,
				data,
			});

			reset({
				cuil: "",
				nombre: "",
				apellido: "",
				email: "",
				domicilio: "",
				telefono: "",
				fechaDeNacimiento: "",
				fechaDeIngreso: undefined,
			});

			setAgregarFecha(false);
			setUsarHoy(false);

			setModal({
				open: true,
				success: true,
				title: "Empleado educativo creado",
				description: "Se ha creado el empleado educativo correctamente.",
			});
		} catch (error) {
			const apiError = getApiError(error);
			const message = getErrorMessage(error, "");

			if (message.toLowerCase().includes("cuil")) {
				setError("cuil", {
					type: "manual",
					message: "El CUIL ya está registrado.",
				});
				return;
			}

			if (message.toLowerCase().includes("email")) {
				setError("email", {
					type: "manual",
					message: "El email ya está registrado.",
				});
				return;
			}

			setModal({
				open: true,
				success: false,
				title: "Error",
				description:
					apiError?.message ?? "No se pudo crear el empleado educativo.",
			});
		}
	};

	return {
		form: {
			...form,
			errors,
			isSubmitting: isSubmitting && Object.keys(errors).length === 0,
		},

		ingreso: {
			agregarFecha,
			usarHoy,
			toggleAgregarFecha,
			toggleUsarHoy,
		},

		result: {
			...modal,
			close: closeModal,
		},

		submit,
	};
}
