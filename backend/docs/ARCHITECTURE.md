# 🏗️ Guía de Arquitectura de Controladores

## 📐 Estructura Conceptual

```
┌─────────────────────────────────────────────────────────────┐
│                     API REST - school-manager                │
└─────────────────────────────────────────────────────────────┘

              ┌──────────────────────────────────┐
              │   CLIENTE (Web/Mobile/Desktop)   │
              └───────────────┬──────────────────┘
                              │
                              ▼
            ┌─────────────────────────────────┐
            │      CAPA DE CONTROLADORES      │
            ├─────────────────────────────────┤
            │                                 │
            │  🌍 Global (Operaciones)        │ ← Lógica compleja
            │  ├─ /api/designaciones          │
            │  ├─ /api/licencias              │
            │  ├─ /api/asistencias            │
            │  └─ /api/empleados-educativos   │
            │                                 │
            │  🏫 Contexto Escuela (CRUD)     │ ← Operaciones simples
            │  ├─ /api/escuelas/.../cursos    │
            │  ├─ /api/escuelas/.../materias  │
            │  ├─ /api/escuelas/.../empleados │
            │  └─ /api/escuelas/.../licencias │
            │                                 │
            └──────────────┬──────────────────┘
                           │
                           ▼
            ┌─────────────────────────────────┐
            │   CAPA DE SERVICIOS (Business)  │
            └──────────────┬──────────────────┘
                           │
                           ▼
            ┌─────────────────────────────────┐
            │  CAPA DE PERSISTENCIA (Data)    │
            └─────────────────────────────────┘
```

---

## 🎯 Decisión de Diseño: ¿Global vs Contexto?

```
ENTRADA: Nueva Operación

    ┌─────────────────────────────────────────┐
    │  ¿Es operación específica de una sola   │
    │  escuela (CRUD básico)?                 │
    └──────────────┬──────────────────────────┘
                   │
         ┌─────────┴─────────┐
         │                   │
         ▼ SÍ                ▼ NO / COMPLEJA
   
   ┌──────────────────┐   ┌──────────────────┐
   │ EscuelaXXController  │   │ XXXController    │
   │ /api/escuelas/{id}/ │   │ /api/recurso     │
   │ recurso            │   └──────────────────┘
   └──────────────────┘
   
   Ejemplos:             Ejemplos:
   - Crear curso        - Cambiar cobertura licencia
   - Crear materia      - Cubrir designación
   - Listar empleados   - Renovar licencia
   - Actualizar recurso - Cambiar estado asignación
```

---

## 🔍 Ejemplos Prácticos

### Ejemplo 1: Crear un Curso (Contexto)
```
CLIENT SIDE:
┌────────────────────────────────┐
│ POST /api/escuelas/5/cursos    │
│ Content-Type: application/json │
│                                │
│ {                              │
│   "anio": 2024,                │
│   "grado": 3,                 │
│   "turno": "MAÑANA"            │
│ }                              │
└────────────────────────────────┘
                │
                ▼
        EscuelaCursoControllerREST.crear()
                │
                ├─ Validar que escuela 5 existe
                ├─ Validar datos
                │
                ▼
        CursoService.crear(5, dto)
                │
                ├─ Verificar duplicados
                ├─ Guardar en BD
                │
                ▼
        Response 201 Created
        {
          "id": 42,
          "anio": 2024,
          "grado": 3,
          "turno": "MAÑANA"
        }
```

### Ejemplo 2: Cubrir Designación (Global)
```
CLIENT SIDE:
┌──────────────────────────────┐
│ POST /api/designaciones/15/  │
│      cubrir-provisional      │
│ Content-Type: application/json
│                              │
│ {                            │
│   "fechaInicio": "2024-06-01"│
│   "fechaFin": "2024-08-31"   │
│   "empleadoId": 7            │
│ }                            │
└──────────────────────────────┘
                │
                ▼
        DesignacionControllerREST
        .cubrirProvisional()
                │
                ├─ Validar designación 15
                ├─ Validar empleado 7
                ├─ Verificar disponibilidad
                ├─ Crear cobertura provisional
                │
                ▼
        DesignacionService
        .cubrirProvisional()
                │
                ├─ Cambiar estado
                ├─ Crear asignación
                ├─ Notificar
                ├─ Guardar histórico
                │
                ▼
        Response 200 OK
        {
          "id": 15,
          "estado": "CUBIERTA_PROVISIONAL",
          "cobertura": {...}
        }
```

---

## 🎨 Patrones Utilizados

### 1. MVC (Model-View-Controller)
```java
CONTROLLER → Recibe petición HTTP
   ↓
SERVICE   → Ejecuta lógica de negocio
   ↓
REPOSITORY → Accede a datos
   ↓
ENTITY    → Modelo de datos
```

### 2. DTO (Data Transfer Object)
```
Entity ↔ Mapper ↔ DTO ↔ API Response
```

### 3. REST Levels (Richardson Maturity Model)
```
Level 2 → Usamos esto ✅
├─ HTTP Methods (GET, POST, PUT, DELETE)
├─ Status Codes (200, 201, 404, etc.)
└─ Resources with IDs (/api/recurso/{id})
```

---

## 📊 Distribución de Responsabilidades

| Capa | Responsabilidad | Ejemplo |
|------|-----------------|---------|
| **Controller** | Recibir petición, validar entrada, llamar servicio | `POST /api/escuelas/1/cursos` → crear() |
| **Service** | Lógica de negocio, orquestación | Verificar duplicados, actualizar relacionadas |
| **Repository** | Acceso a datos | Query a base de datos |
| **Entity** | Representación de datos en BD | Clase Curso con `@Entity` |
| **DTO** | Formato de transferencia | CursoCreateDTO, CursoResponseDTO |

---

## 🚧 Problemas Resueltos (v2.0)

### ❌ Antes
```java
// Nombres inconsistentes
crearCurso() vs crearAdministrativa()
eliminarMateria() vs eliminarCurso()
listarCursosPorEscuela() vs listarMateriasPorEscuela()

// Respuestas inconsistentes
ResponseEntity.status(HttpStatus.CREATED) 
vs
@ResponseStatus(HttpStatus.CREATED)
```

### ✅ Después
```java
// Nombres consistentes en todos los controladores
crear()
actualizar()
eliminar()
listar()
listarNombres()
crearBatch()

// Una sola forma de responder
@ResponseStatus(HttpStatus.CREATED)
```

---

## 🔒 Seguridad y Validación

```
ENTRADA HTTP
    │
    ▼
SPRING VALIDATION (@Valid)
    │
    ├─ ¿DTOs válidos?
    │
    ▼
CONTROLLER VALIDATION
    │
    ├─ ¿Escuela existe?
    ├─ ¿Recurso existe?
    ├─ ¿Usuario tiene permisos?
    │
    ▼
SERVICE BUSINESS LOGIC
    │
    ├─ ¿Estado válido para operación?
    ├─ ¿Datos consistentes?
    │
    ▼
REPOSITORY & BD
    │
    ├─ Constraints de BD
    ├─ Índices únicos
    │
    ▼
RESPONSE / ERROR
```

---

## 📈 Escalabilidad Futura

Si crece la complejidad, próximos pasos:

```
1. Agregar versionado
   /api/v1/escuelas/...
   /api/v2/escuelas/...

2. Agregar GraphQL
   /graphql
   
3. Separar por dominio
   /escuelas-service/*
   /designaciones-service/*
   /licencias-service/*

4. Agregar autenticación
   /api/escuelas/{id}?token=...
   
5. Agregar audit
   Registrar todos los cambios
```

---

## 📚 Referencias

- **REST API Design** → Richardson Maturity Model
- **Spring Boot** → Request Mapping, REST Controller
- **Clean Code** → Names matter, consistency

---

**Versión:** 2.0 (Documentada)
**Última actualización:** 2026-05-31

