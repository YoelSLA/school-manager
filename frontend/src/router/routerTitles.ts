export const routeTitles: Record<
  string,
  { label: string; to?: string }[]
> = {
  "/dashboard": [
    { label: "Dashboard" },
  ],

  "/empleados": [
    { label: "Empleado educativo" },
  ],

  "/empleados/crear": [
    { label: "Empleado educativo", to: "/empleados" },
    { label: "Crear personal" },
  ],

  "/empleados/listar": [
    { label: "Empleado educativo", to: "/empleados" },
    { label: "Ver equipo" },
  ],
};
