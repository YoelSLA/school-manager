import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { editarDesignacionCursoSchema } from "../schemas/editarDesignacionCurso.schema";

import type { MateriaNombreDTO } from "@/features/materias/types/materias.types";
import type { CursoNombreDTO } from "@/features/cursos/types/cursos.types";
import type { EditarDesignacionCursoFormValues } from "../designacion.form.types";
import type { DesignacionDetalleDTO } from "../../types/designacion.types";

type Props = {
  designacion?: DesignacionDetalleDTO;
  materias?: MateriaNombreDTO[];
  cursos?: CursoNombreDTO[];
};

export function useEditarDesignacionCursoForm({
  designacion,
  materias,
  cursos,
}: Props) {

  const form = useForm<EditarDesignacionCursoFormValues>({
    resolver: zodResolver(editarDesignacionCursoSchema),
  });

  const { reset } = form;

  const franjas = useFieldArray<
    EditarDesignacionCursoFormValues,
    "franjasHorarias"
  >({
    control: form.control,
    name: "franjasHorarias",
  });

  useEffect(() => {

    console.log("🔄 useEditarDesignacionCursoForm effect ejecutado");

    console.log("📦 designacion:", designacion);
    console.log("📚 materias:", materias);
    console.log("🏫 cursos:", cursos);

    if (!designacion) {
      console.log("⛔ designacion undefined");
      return;
    }

    if (designacion.tipo !== "CURSO") {
      console.log("⛔ designacion no es CURSO");
      return;
    }

    if (!materias || !cursos) {
      console.log("⛔ materias o cursos undefined");
      return;
    }

    const materiaEncontrada = materias.find(
      (m) => m.nombre === designacion.materia
    );

    const cursoEncontrado = cursos.find(
      (c) => c.division === designacion.curso
    );

    const materiaId = materiaEncontrada?.id;
    const cursoId = cursoEncontrado?.id;

    console.log("🔎 Resultado búsqueda materia:", materiaEncontrada);
    console.log("🔎 Resultado búsqueda curso:", cursoEncontrado);

    console.log("🆔 materiaId:", materiaId);
    console.log("🆔 cursoId:", cursoId);

    const dataReset = {
      cupof: designacion.cupof,
      materiaId,
      cursoId,
      orientacion: designacion.orientacion ?? "",
      franjasHorarias: designacion.franjasHorarias ?? [],
    };

    console.log("📝 RESET FORM DATA:", dataReset);

    reset(dataReset);

  }, [designacion, materias, cursos, reset]);

  return {
    form,
    franjas,
  };
}