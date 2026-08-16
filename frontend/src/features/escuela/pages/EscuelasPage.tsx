import { CreateEscuelaModal, DisableEscuelaModal, SeleccionarEscuelaEmpty, SeleccionarEscuelaGrid, SeleccionarEscuelaHeader } from "../components";
import { useEscuelaPage } from "../hooks/pages";
import styles from "./EscuelasPage.module.scss";

export default function EscuelasPage() {
  const vm = useEscuelaPage();

  return (
    <div className={styles["seleccionar-escuela"]}>
      <SeleccionarEscuelaHeader
        onCrear={vm.create.open}
        onRefresh={() => { }}
        isLoading={vm.query.isLoading}
      />

      <div className={styles["seleccionar-escuela__grid-wrapper"]}>
        {vm.query.isLoading ? null : vm.query.escuelas.length === 0 ? (
          <SeleccionarEscuelaEmpty onCrear={vm.create.open} />
        ) : (
          <SeleccionarEscuelaGrid
            escuelas={vm.query.escuelas}
            onEditar={vm.edit.open}
            onEliminar={vm.delete.open}
          />
        )}
      </div>

      {vm.create.isOpen && (
        <CreateEscuelaModal
          onClose={vm.create.close}
          onSubmit={vm.create.submit}
          isSubmitting={vm.create.isPending}
          error={vm.create.error}
        />
      )}

      {vm.delete.escuela && (
        <DisableEscuelaModal
          open
          onCancel={vm.delete.close}
          onConfirm={vm.delete.submit}
          loading={vm.delete.isPending}
        />
      )}
    </div>
  );
}