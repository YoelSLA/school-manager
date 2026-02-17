import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "@/layout/PageLayout";
import EmpleadoEducativoFormEditar from "../../components/EmpleadoEducativoEditForm/EmpleadoEducativoEditForm";

import styles from "./EmpleadoEducativoEditPage.module.scss";
import { useEmpleadoEducativoEditForm } from "../../form/hooks/useEmpleadoEducativoEditForm";
import { useEditarEmpleadoEducativo } from "../../hooks/useEditarEmpleadoEducativo";
import { useEmpleadoEducativo } from "../../hooks/useEmpleadoEducativo";
import { useAppSelector } from "@/store/hooks";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import type { EmpleadoEducativoEditOutput } from "../../form/empleadoEducativo.form.types";
import Button from "@/components/Button";

export default function EmpleadoEducativoEditPage() {
  const { empleadoId } = useParams();
  const navigate = useNavigate();
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

  const onSubmit = (formData: EmpleadoEducativoEditOutput) => {
    if (!escuelaActiva) return;

    editarMutation.mutate(
      {
        escuelaId: escuelaActiva.id,
        empleadoId: eId,
        data: formData,
      },
      {
        onSuccess: () => {
          navigate(-1); // 🔥 vuelve al detalle
        },
      }
    );
  };
  const handleCancel = () => {
    navigate(-1);
  };

  /* =========================
     LOADING
  ========================= */

  if (isLoading) {
    return (
      <PageLayout>
        <div className={styles.loading}>
          Cargando empleado...
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className={styles.page}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* ================= FORM BODY ================= */}
          <EmpleadoEducativoFormEditar
            form={form}
          />

          {/* ================= ACTIONS ================= */}

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
    </PageLayout>
  );

}
