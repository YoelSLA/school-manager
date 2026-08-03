import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BreadcrumbPageLayout from "@/app/layouts/pages/BreadcrumbPageLayout";
import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";
import Button from "@/shared/components/Button";
import EmpleadoEducativoUpdateForm from "../../components/EmpleadoEducativoUpdateForm";
import { useEmpleadoEducativoEditForm } from "../../form/hooks/useEmpleadoEducativoEditForm";
import { useEditarEmpleadoEducativo } from "../../hooks/mutations/useEditarEmpleadoEducativo";
import { useEmpleadoNavigation } from "../../hooks/navigation/useEmpleadoNavigation";
import { useEmpleadoEducativo } from "../../hooks/queries/useEmpleadoEducativo";
import type { EmpleadoEducativoUpdateDTO } from "../../types";
import styles from "./EmpleadoEducativoUpdatePage.module.scss";

export default function EmpleadoEducativoUpdatePage() {
  const { empleadoId } = useParams();
  const escuelaActiva = useAppSelector(selectEscuelaActiva);
  const eId = Number(empleadoId);

  /* =========================
     QUERY
  ========================= */

  const { data: empleado, isLoading } = useEmpleadoEducativo(eId);

  /* =========================
     FORM
  ========================= */

  const { form } = useEmpleadoEducativoEditForm();
  const { reset } = form;

  /* =========================
     MUTATION
  ========================= */

  const editarMutation = useEditarEmpleadoEducativo();

  const empleadoNav = useEmpleadoNavigation();

  /* =========================
     MAP DATA → FORM
  ========================= */

  useEffect(() => {
    if (empleado) {
      reset({
        cuil: empleado.cuil,
        nombre: empleado.nombre,
        apellido: empleado.apellido,
        domicilio: empleado.domicilio ?? "",
        telefono: empleado.telefono ?? "",
        email: empleado.email,
        fechaDeNacimiento: empleado.fechaDeNacimiento,
        fechaDeIngreso: empleado.fechaDeIngreso ?? "",
      });
    }
  }, [reset, empleado]);

  /* =========================
     HANDLERS
  ========================= */

  const onSubmit = (formData: EmpleadoEducativoUpdateDTO) => {
    if (!escuelaActiva) return;

    editarMutation.mutate(
      {
        escuelaId: escuelaActiva.id,
        empleadoId: eId,
        data: formData,
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

  const handleCancel = () => {
    if (empleado) {
      empleadoNav.verDetalle(empleado);
    }
  };

  /* =========================
     LOADING
  ========================= */

  if (isLoading) {
    return (
      <BreadcrumbPageLayout>
        <div className={styles.loading}>Cargando empleado...</div>
      </BreadcrumbPageLayout>
    );
  }

  return (
    <BreadcrumbPageLayout>
      <div className={styles.page}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <EmpleadoEducativoUpdateForm form={form} />

          <div className={styles.actions}>
            <Button
              type="button"
              variant="danger"
              onClick={handleCancel}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              variant="primary"
              loading={editarMutation.isPending}
              disabled={editarMutation.isPending}
            >
              Guardar cambios
            </Button>
          </div>
        </form>
      </div>
    </BreadcrumbPageLayout>
  );
}