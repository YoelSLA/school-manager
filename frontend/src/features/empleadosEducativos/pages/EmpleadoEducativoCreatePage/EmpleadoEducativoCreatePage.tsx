import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "@/components/Button/Button";
import FormActions from "@/components/FormActions";
import Modal from "@/components/Modal/Modal";
import Breadcrumbs from "@/layout/Breadcrumbs";
import PageLayout from "@/layout/PageLayout/PageLayout";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";

import { getTodayArgentinaISO } from "@/utils";
import type { EmpleadoEducativoCreateDTO } from "@/utils/types";
import ContactoSection from "../../components/EmpleadoEducativoCreateForm/ContactoSection";
import DatosPersonalesSection from "../../components/EmpleadoEducativoCreateForm/DatosPersonalesSection";
import IngresoSection from "../../components/EmpleadoEducativoCreateForm/IngresoSection";
import { crearEmpleadoEducativoSchema } from "../../form/schemas/crearEmpleadoEducativo.schema";
import { useCrearEmpleadoEducativo } from "../../hooks/useCrearEmpleadoEducativo";
import { useEmpleadoNavigation } from "../../hooks/useEmpleadoNavigation";
import styles from "./EmpleadoEducativoCreatePage.module.scss";

export default function EmpleadoEducativoCreatePage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);
	const crearEmpleado = useCrearEmpleadoEducativo();
	const empleadoNav = useEmpleadoNavigation();

	const hoy = getTodayArgentinaISO();

	const [agregarFecha, setAgregarFecha] = useState(false);
	const [usarHoy, setUsarHoy] = useState(false);

	/* =====================
		 FORM DIRECTO (SIN HOOK)
	===================== */

	const {
		register,
		handleSubmit,
		setValue,
		setError,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<EmpleadoEducativoCreateDTO>({
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

	const [resultModal, setResultModal] = useState<{
		open: boolean;
		success: boolean;
		title: string;
		description: string;
	}>({
		open: false,
		success: true,
		title: "",
		description: "",
	});

	/* =====================
		 TOGGLES
	===================== */

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

	/* =====================
		 SUBMIT
	===================== */

	const onSubmit = async (data: EmpleadoEducativoCreateDTO) => {
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

			setResultModal({
				open: true,
				success: true,
				title: "Empleado educativo creado",
				description: "Se ha creado el empleado educativo correctamente.",
			});
		} catch (error: unknown) {
			const axiosError = error as AxiosError<{
				message?: string;
			}>;

			const message = axiosError.response?.data?.message ?? "";

			if (message.toLowerCase().includes("cuil")) {
				setError("cuil", {
					type: "manual",
					message: "El CUIL ya está registrado.",
				});
			}

			if (message.toLowerCase().includes("email")) {
				setError("email", {
					type: "manual",
					message: "El email ya está registrado",
				});
			}

			setResultModal({
				open: true,
				success: false,
				title: "Error al crear empleado educativo",
				description: message,
			});
		}
	};

	/* =====================
		 RENDER
	===================== */

	return (
		<PageLayout breadcrumbs={<Breadcrumbs />}>
			<div className={styles.page}>
				<div className={styles.container}>
					<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.grid}>
							<div className={styles.datos}>
								<DatosPersonalesSection register={register} errors={errors} />
							</div>

							<div className={styles.rightColumn}>
								<ContactoSection register={register} errors={errors} />

								<IngresoSection
									register={register}
									errors={errors}
									agregarFecha={agregarFecha}
									onToggleAgregarFecha={toggleAgregarFecha}
									usarHoy={usarHoy}
									onToggleUsarHoy={toggleUsarHoy}
								/>
							</div>

							<div className={styles.actions}>
								<FormActions
									isSubmitting={
										isSubmitting && Object.keys(errors).length === 0
									}
									label="Guardar"
									align="right"
								/>
							</div>
						</div>
					</form>
				</div>
			</div>

			{resultModal.open && (
				<Modal
					title={resultModal.title}
					variant={resultModal.success ? "success" : "error"}
					onCancel={() => {
						setResultModal((prev) => ({ ...prev, open: false }));

						if (resultModal.success) {
							empleadoNav.listar();
						}
					}}
					showConfirm={false}
					showCancel={false}
					size="small"
				>
					<div className={styles.resultModalContent}>
						<p className={styles.resultModalDescription}>
							{resultModal.description}
						</p>

						<Button
							variant={resultModal.success ? "primary" : "danger"}
							onClick={() => {
								setResultModal((prev) => ({ ...prev, open: false }));

								if (resultModal.success) {
									empleadoNav.listar();
								}
							}}
						>
							Aceptar
						</Button>
					</div>
				</Modal>
			)}
		</PageLayout>
	);
}
