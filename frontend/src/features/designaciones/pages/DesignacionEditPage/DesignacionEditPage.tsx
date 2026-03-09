import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "@/layout/PageLayout/PageLayout";
import useDesignacionDetalle from "../../hooks/useDesignacionDetalle";
import EditarDesignacionCurso from "../../components/EditarDesignacionCurso/EditarDesignacionCurso";
import EditarDesignacionAdministrativa from "../../components/EditarDesignacionAdministrativa/EditarDesignacionAdministrativa";
import styles from "./DesignacionEditPage.module.scss";
import { useActualizarDesignacionAdministrativa } from "../../hooks/useActualizarDesignacionAdministrativa";
import { useActualizarDesignacionCurso } from "../../hooks/useActualizarDesignacionCurso";
import { designacionesPaths } from "@/router/paths";
import toast from "react-hot-toast";

export default function DesignacionEditPage() {
  const { designacionId } = useParams<{ designacionId: string }>();
  const id = Number(designacionId);
  const navigate = useNavigate();

  const { designacion, isLoading } = useDesignacionDetalle(id);

  const editarCurso = useActualizarDesignacionCurso();
  const editarAdministrativa = useActualizarDesignacionAdministrativa();

  const handleSuccess = () => {
    navigate(designacionesPaths.detail(id));
  };

  let content: React.ReactNode = null;

  if (isLoading) {
    content = <div>Cargando...</div>;
  } else if (!designacion) {
    content = <div>No se encontró la designación</div>;
  } else if (designacion.tipo === "CURSO") {
    content = (
      <EditarDesignacionCurso
        designacion={designacion}
        onSubmit={async (data) => {
          await editarCurso.mutateAsync({
            designacionId: id,
            data,
          });

          toast.success("Designación actualizada correctamente");

          handleSuccess();
        }}
        isSubmitting={editarCurso.isPending}
      />
    );
  } else if (designacion.tipo === "ADMINISTRATIVA") {
    content = (
      <EditarDesignacionAdministrativa
        designacion={designacion}
        onSubmit={async (data) => {
          await editarAdministrativa.mutateAsync({
            designacionId: id,
            data,
          });

          toast.success("Designación actualizada correctamente");

          handleSuccess();
        }}
        isSubmitting={editarAdministrativa.isPending}
      />
    );
  }

  return (
    <PageLayout>
      <div className={styles["designacion-edit"]}>
        <div className={styles["designacion-edit__form"]}>
          {content}
        </div>
      </div>
    </PageLayout>
  );
}