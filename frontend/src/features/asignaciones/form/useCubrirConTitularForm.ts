import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaracteristicaAsignacion } from "../types/asignacion.types";
import { z } from "zod";
import { cubrirTitularSchema } from "./cubrirTitular.schema";

export type TitularFormValues = z.infer<typeof cubrirTitularSchema>;

type Props = {
  defaultValues?: Partial<TitularFormValues>;
};

export function useCubrirConTitularForm({ defaultValues }: Props = {}) {

  const form = useForm<TitularFormValues>({
    resolver: zodResolver(cubrirTitularSchema),

    defaultValues: {
      empleadoId: undefined,
      fechaTomaPosesion: undefined,
      caracteristica: CaracteristicaAsignacion.NORMAL,
      ...defaultValues, // 👈 sobrescribe si vienen datos
    },

    mode: "onSubmit",
  });

  return { form };
}