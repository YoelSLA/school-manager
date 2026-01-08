import { useEffect, useState } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormSetValue,
} from "react-hook-form";

import { buscarEmpleadosPorEscuela } from "@/services/empleadosService";
import { EmpleadoEducativoMinimoDTO } from "@/utils/types/empleadoEducativo";

import { useEscuela } from "@/context/EscuelaContext";
import "./empleadoAutocomplete.css";

type Props<TForm extends FieldValues> = {
  name: Path<TForm>;
  label?: string;
  placeholder?: string;
  setValue: UseFormSetValue<TForm>;
  error?: FieldError;
};

export function EmpleadoAutocomplete<TForm extends FieldValues>({
  name,
  label = "Empleado",
  placeholder = "Buscar empleado...",
  setValue,
  error,
}: Props<TForm>) {
  const { escuelaActiva } = useEscuela();
  const [search, setSearch] = useState("");
  const [empleados, setEmpleados] = useState<EmpleadoEducativoMinimoDTO[]>([]);
  const [loading, setLoading] = useState(false);

  /* ===============================
     DEBUG: cambios en search
  ================================ */
  useEffect(() => {
    console.log("[Autocomplete] search =", search);
  }, [search]);

  /* ===============================
     FETCH empleados
  ================================ */
  useEffect(() => {
    if (search.length < 2) {
      setEmpleados([]);
      console.log("[Autocomplete] search < 2, limpio resultados");
      return;
    }

    const fetch = async () => {
      console.log("[Autocomplete] buscando empleados con:", search);
      setLoading(true);

      const data = await buscarEmpleadosPorEscuela(escuelaActiva!.id, search);

      console.log("[Autocomplete] empleados recibidos:", data);

      setEmpleados(data);
      setLoading(false);
    };

    fetch();
  }, [search, escuelaActiva!.id]);

  return (
    <div className="empleado-autocomplete">
      {label && <label>{label}</label>}

      <input
        type="text"
        value={search}
        placeholder={placeholder}
        onChange={(e) => {
          console.log("[Autocomplete] escribiendo:", e.target.value);
          setSearch(e.target.value);
        }}
      />

      {loading && <div className="autocomplete-loading">Buscando…</div>}

      {empleados.length > 0 && (
        <ul className="autocomplete-list">
          {empleados.map((e) => (
            <li
              key={e.id}
              onClick={() => {
                console.log(
                  "[Autocomplete] empleado seleccionado:",
                  e.id,
                  e.apellido,
                  e.nombre
                );

                // ✅ SOLO acá se setea el ID real
                setValue(name, e.id as any, {
                  shouldValidate: true,
                });

                setSearch(`${e.apellido}, ${e.nombre}`);
                setEmpleados([]);
              }}
            >
              {e.apellido}, {e.nombre}
            </li>
          ))}
        </ul>
      )}

      {error && <span className="field-error">[ERROR] {error.message}</span>}
    </div>
  );
}
