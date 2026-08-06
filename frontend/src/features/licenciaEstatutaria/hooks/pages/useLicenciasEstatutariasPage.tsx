import { useState } from "react";
import { usePagination } from "@/shared/hooks/usePagination";
import type {
  LicenciaEstatutariaCreateDTO,
  LicenciaEstatutariaResponseDTO,
  LicenciaEstatutariaUpdateDTO,
} from "../../types";
import {
  useCreateLicenciaEstatutaria,
  useDeleteLicenciaEstatutaria,
  useUpdateLicenciaEstatutaria,
} from "../mutations";
import { useListLicenciasEstatutarias } from "../queries";

export function useLicenciasEstatutariasPage() {
  const { page, setPage, pageSize } = usePagination();

  /* =========================
     MODALES
  ========================= */

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [licenciaAEditar, setLicenciaAEditar] =
    useState<LicenciaEstatutariaResponseDTO | null>(null);

  const [licenciaAEliminar, setLicenciaAEliminar] =
    useState<LicenciaEstatutariaResponseDTO | null>(null);

  /* =========================
     QUERY
  ========================= */

  const query = useListLicenciasEstatutarias(page, pageSize);

  const licencias = query.data?.content ?? [];
  const totalPages = query.data?.totalPages ?? 0;

  /* =========================
     CREATE
  ========================= */

  const create = useCreateLicenciaEstatutaria();

  const createLicencia = (data: LicenciaEstatutariaCreateDTO) => {
    create.mutate(data, {
      onSuccess: () => setIsCreateOpen(false),
    });
  };

  /* =========================
     EDIT
  ========================= */

  const update = useUpdateLicenciaEstatutaria();

  const updateLicencia = (data: LicenciaEstatutariaUpdateDTO) => {
    if (!licenciaAEditar) return;

    update.mutate(
      {
        id: licenciaAEditar.id,
        data,
      },
      {
        onSuccess: () => setLicenciaAEditar(null),
      },
    );
  };

  /* =========================
     DELETE
  ========================= */

  const remove = useDeleteLicenciaEstatutaria();

  const deleteLicencia = () => {
    if (!licenciaAEliminar) return;

    remove.mutate(licenciaAEliminar.id, {
      onSuccess: () => setLicenciaAEliminar(null),
    });
  };

  return {
    pagination: {
      page,
      setPage,
      totalPages,
    },

    query: {
      ...query,
      licencias,
    },

    create: {
      isOpen: isCreateOpen,
      open: () => setIsCreateOpen(true),
      close: () => setIsCreateOpen(false),
      submit: createLicencia,
      isPending: create.isPending,
    },

    edit: {
      licencia: licenciaAEditar,
      open: setLicenciaAEditar,
      close: () => setLicenciaAEditar(null),
      submit: updateLicencia,
      isPending: update.isPending,
    },

    delete: {
      licencia: licenciaAEliminar,
      open: setLicenciaAEliminar,
      close: () => setLicenciaAEliminar(null),
      submit: deleteLicencia,
      isPending: remove.isPending,
    },
  };
}