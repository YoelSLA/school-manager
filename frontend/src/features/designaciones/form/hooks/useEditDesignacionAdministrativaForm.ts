import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import type {
  DesignacionAdministrativaDetalleDTO,
  DesignacionAdministrativaFormValues,
  DesignacionAdministrativaUpdateDTO,
} from "@/utils/types";
import { editarDesignacionAdministrativaSchema } from "../schemas/editarDesignacionAdministrativa.schema";

type Props = {
  designacion: DesignacionAdministrativaDetalleDTO;
};

export function useEditarDesignacionAdministrativaForm({
  designacion,
}: Props) {
  const form = useForm<
    DesignacionAdministrativaFormValues,
    undefined,
    DesignacionAdministrativaUpdateDTO
  >({
    resolver: zodResolver(editarDesignacionAdministrativaSchema),
    defaultValues: {
      cupof: designacion.cupof,
      rolEducativo: designacion.rolEducativo,
      franjasHorarias: designacion.franjasHorarias ?? [],
    },
  });

  const franjas = useFieldArray<
    DesignacionAdministrativaFormValues,
    "franjasHorarias"
  >({
    control: form.control,
    name: "franjasHorarias",
  });

  return {
    form,
    franjas,
  };
}