import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { EmpleadoEducativoMinimoDTO } from "@/utils/types";

import { cambiarCoberturaSchema } from "../form/cambiarCobertura.schema";
import { useCambiarCobertura } from "./useCambiarCobertura";

type Props = {
  licenciaId: number;
  designacionId: number;
  secuencia: number;
  empleadoInicial: EmpleadoEducativoMinimoDTO | null;
  fechaInicial: string;
  onSuccess: () => void;
};

const formSchema = cambiarCoberturaSchema.pick({
  fechaTomaPosesion: true,
  secuencia: true,
});

type FormValues = z.input<typeof formSchema>;

export function useCambiarCoberturaForm({
  licenciaId,
  designacionId,
  secuencia,
  empleadoInicial,
  fechaInicial,
  onSuccess,
}: Props) {
  const [empleado, setEmpleado] =
    useState<EmpleadoEducativoMinimoDTO | null>(
      empleadoInicial,
    );

  useEffect(() => {
    setEmpleado(empleadoInicial);
  }, [empleadoInicial]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fechaTomaPosesion: fechaInicial,
      secuencia,
    },
  });

  const { mutateAsync, isPending } = useCambiarCobertura();

  const onSubmit = form.handleSubmit(async (data) => {
    if (!empleado) {
      form.setError("root", {
        message: "Debe seleccionar un empleado",
      });
      return;
    }

    await mutateAsync({
      licenciaId,
      designacionId,
      body: {
        empleadoId: empleado.id,
        secuencia: Number(data.secuencia),
        fechaTomaPosesion: data.fechaTomaPosesion,
      },
    });

    onSuccess();
  });

  return {
    ...form,
    onSubmit,
    setEmpleado,
    empleado,
    isPending,
  };
}