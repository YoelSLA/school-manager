import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { crearMateriaSchema } from "../schemas/crearMateria.schema";
import type { CrearMateriaFormValues, EditarMateriaFormValues } from "../materias.form.types";
import { useEffect } from "react";

type Props = {
  materia: CrearMateriaFormValues;
};

export function useEditMateriaForm({
  materia
}: Props) {

  const form = useForm<EditarMateriaFormValues>({
    resolver: zodResolver(crearMateriaSchema),
    defaultValues: materia,
  });

  const { reset } = form;


  useEffect(() => {
    reset(materia);
  }, [materia, reset]);


  return {
    form,
  };
}