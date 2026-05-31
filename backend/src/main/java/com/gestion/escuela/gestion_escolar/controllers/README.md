# 📋 Estructura de Controladores REST

## 📊 Organización General

```
controllers/
│
├── 🌍 CONTROLADORES GLOBALES (raíz)
│   ├── AsistenciaControllerREST        → /api/asistencias
│   ├── DesignacionControllerREST       → /api/designaciones
│   ├── EmpleadoEducativoControllerREST → /api/empleados-educativos
│   └── LicenciaControllerREST          → /api/licencias
│
├── 🏫 CONTROLADORES POR CONTEXTO ESCUELA (escuelasContexto/)
│   ├── EscuelaControllerREST                    → GET /api/escuelas/{id}
│   ├── EscuelaCursoControllerREST               → /api/escuelas/{id}/cursos
│   ├── EscuelaDesignacionControllerREST         → /api/escuelas/{id}/designaciones
│   ├── EscuelaDesignacionCursoControllerREST    → /api/escuelas/{id}/designaciones/cursos
│   ├── EscuelaEmpleadoEducativoControllerREST   → /api/escuelas/{id}/empleados-educativos
│   ├── EscuelaLicenciaControllerREST            → /api/escuelas/{id}/licencias
│   └── EscuelaMateriaControllerREST             → /api/escuelas/{id}/materias
│
├── 📂 dtos/                    → Objetos de transferencia de datos
├── 📂 mappers/                 → Conversores Entity ↔ DTO
├── 📂 exceptions/              → Excepciones personalizadas
└── 📂 escuela/                 → ⚠️ DEPRECADO (mover a escuelasContexto)
```

---

## 🎯 Patrón de Diseño Utilizado

### 1️⃣ **Controladores Globales** (`/api/{recurso}`)
**Características:**
- Operaciones **generales** sobre entidades
- **SIN contexto de escuela**
- Operaciones de estado global (cambios de estado, validaciones)
- Ejemplos:
  - `POST /api/designaciones/{id}/coberturas` → Cambiar cobertura de una designación
  - `GET /api/licencias/{id}` → Obtener licencia global
  - `POST /api/asistencias/generar` → Generar asistencias

### 2️⃣ **Controladores por Contexto** (`/api/escuelas/{escuelaId}/{recurso}`)
**Características:**
- Operaciones **dentro del contexto de una escuela específica**
- Todas pertenecen a una escuela
- CRUD básico + listados paginados
- Ejemplos:
  - `POST /api/escuelas/1/cursos` → Crear curso en escuela 1
  - `GET /api/escuelas/1/empleados-educativos` → Listar empleados de escuela 1
  - `PUT /api/escuelas/1/materias/5` → Actualizar materia en escuela 1

---

## 🔄 Flujo de Uso

```
En la UI/Cliente
       ↓
┌─────────────────────────────────────┐
│  ¿La operación es específica de     │
│  una escuela (CRUD básico)?         │
└─────────────────────────────────────┘
       ├─ SÍ → Usar EscuelaXXXController
       │        /api/escuelas/{id}/recurso
       │
       └─ NO → Usar XXXController
                /api/recurso
```

---

## ✅ Métodos Estandarizados (desde v2.0)

### En controladores de contexto (`EscuelaXXXControllerREST`):

```java
POST   /api/escuelas/{escuelaId}/{recurso}           → crear()
POST   /api/escuelas/{escuelaId}/{recurso}/batch     → crearBatch()
PUT    /api/escuelas/{escuelaId}/{recurso}/{id}      → actualizar()
DELETE /api/escuelas/{escuelaId}/{recurso}/{id}      → eliminar()
GET    /api/escuelas/{escuelaId}/{recurso}           → listar()
GET    /api/escuelas/{escuelaId}/{recurso}/nombres   → listarNombres()
```

---

## 📌 Puntos Importantes

| Aspecto | Contexto | Global |
|---------|----------|--------|
| **Responsabilidad** | CRUD + listado | Operaciones complejas |
| **Ruta** | `/api/escuelas/{id}/xxx` | `/api/xxx` |
| **Validación** | Valida permisos de escuela | Valida entidad global |
| **Casos de uso** | 80% de operaciones | 20% de operaciones |

---

## 🚀 Próximas Mejoras Sugeridas

- [ ] Renombrar `escuela/` → `escuelasContexto/` (consistencia)
- [ ] Crear controladores por dominio si crecen mucho más
- [ ] Documentar cada controlador con `@RestController` + Javadoc
- [ ] Agregar versionado de API (`/api/v1/...`)

---

**Última actualización:** 2026-05-31

