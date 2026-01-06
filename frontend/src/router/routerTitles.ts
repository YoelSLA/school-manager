export const routeTitles: Record<string, { label: string; to?: string }[]> = {
  "/dashboard": [{ label: "Dashboard" }],

  "/empleados": [{ label: "Empleado educativo" }],

  "/empleados/crear": [
    { label: "Empleado educativo", to: "/empleados" },
    { label: "Crear personal" },
  ],

  "/empleados/listar": [
    { label: "Empleado educativo", to: "/empleados" },
    { label: "Ver equipo" },
  ],

  /* =====================
     CURSOS
  ===================== */

  "/cursos": [{ label: "Cursos" }],

  "/cursos/crear": [
    { label: "Cursos", to: "/cursos" },
    { label: "Crear curso" },
  ],

  /* =====================
     MATERIAS
  ===================== */

  "/materias": [{ label: "Materias" }],

  "/materias/crear": [
    { label: "Materias", to: "/materias" },
    { label: "Crear materia" },
  ],

  /* =====================
     DESIGNACIONES
  ===================== */

  "/designaciones": [{ label: "Designaciones" }],

  "/designaciones/administrativas": [
    { label: "Designaciones", to: "/designaciones" },
    { label: "Administrativa" },
  ],

  "/designaciones/administrativas/crear": [
    { label: "Designaciones", to: "/designaciones" },
    { label: "Administrativa", to: "/designaciones/administrativas" },
    { label: "Crear designación" },
  ],

  "/designaciones/administrativas/listar": [
    { label: "Designaciones", to: "/designaciones" },
    { label: "Administrativa", to: "/designaciones/administrativas" },
    { label: "Ver designaciones" },
  ],

  "/designaciones/cursos": [
    { label: "Designaciones", to: "/designaciones" },
    { label: "Por cursos" },
  ],

  "/designaciones/cursos/crear": [
    { label: "Designaciones", to: "/designaciones" },
    { label: "Por cursos", to: "/designaciones/cursos" },
    { label: "Crear designación" },
  ],

  "/designaciones/cursos/listar": [
    { label: "Designaciones", to: "/designaciones" },
    { label: "Por cursos", to: "/designaciones/cursos" },
    { label: "Ver designaciones" },
  ],

  /* =====================
     ASISTENCIA
  ===================== */

  "/asistencias": [{ label: "Asistencias" }],

  /* =====================
     LICENCIA
  ===================== */

  "/licencias": [{ label: "Licencias" }],

  "/licencias/solicitar": [
    { label: "Licencias", to: "/licencias" },
    { label: "Solicitar licencia" },
  ],

  "/licencias/listar": [
    { label: "Licencias", to: "/licencias" },
    { label: "Ver licencias" },
  ],
};
