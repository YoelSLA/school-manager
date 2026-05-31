# 📡 Mapa Completo de Endpoints REST

## 🌍 ENDPOINTS GLOBALES (Controladores en `/controllers/`)

### 📋 Asistencia
```
GET    /api/asistencias
GET    /api/asistencias/{mes}
POST   /api/asistencias/generar/{diseñoId}
GET    /api/asistencias/{empleadoId}/por-mes
POST   /api/asistencias/registrar-inasistencias-manual
DELETE /api/asistencias/eliminar-inasistencias-manual
```

### 🏆 Designaciones (Operaciones Complejas)
```
POST   /api/designaciones/{designacionId}/cubrir-provisional
POST   /api/designaciones/{designacionId}/cubrir-titular
POST   /api/designaciones/{designacionId}/notificar-baja
PUT    /api/designaciones/{designacionId}
GET    /api/designaciones/{id}/detalle
GET    /api/designaciones (búsqueda avanzada)
```

### 👥 Empleados Educativos (Perfil Global)
```
GET    /api/empleados-educativos/{empleadoId}
GET    /api/empleados-educativos/{empleadoId}/asignaciones
GET    /api/empleados-educativos/{empleadoId}/licencias
POST   /api/empleados-educativos/{empleadoId}/dar-baja-definitiva
```

### 📌 Licencias (Operaciones Complejas)
```
GET    /api/licencias/{licenciaId}
GET    /api/licencias/{licenciaId}/timeline
POST   /api/licencias/{licenciaId}/coberturas
PUT    /api/licencias/{licenciaId}/coberturas
DELETE /api/licencias/{licenciaId}/coberturas/{coberturId}
PUT    /api/licencias/{licenciaId}/renovar
```

---

## 🏫 ENDPOINTS POR CONTEXTO (Controladores en `/controllers/escuelasContexto/`)

### 🎓 Escuela (Recurso Raíz)
```
GET    /api/escuelas/{escuelaId}
PUT    /api/escuelas/{escuelaId}
DELETE /api/escuelas/{escuelaId}
```

### 📚 Cursos
```
POST   /api/escuelas/{escuelaId}/cursos
POST   /api/escuelas/{escuelaId}/cursos/batch
PUT    /api/escuelas/{escuelaId}/cursos/{cursoId}
DELETE /api/escuelas/{escuelaId}/cursos/{cursoId}
GET    /api/escuelas/{escuelaId}/cursos                    (paginado)
GET    /api/escuelas/{escuelaId}/cursos/nombres           (solo nombres)
```

### 📖 Materias
```
POST   /api/escuelas/{escuelaId}/materias
POST   /api/escuelas/{escuelaId}/materias/batch
PUT    /api/escuelas/{escuelaId}/materias/{materiaId}
DELETE /api/escuelas/{escuelaId}/materias/{materiaId}
GET    /api/escuelas/{escuelaId}/materias                 (paginado)
GET    /api/escuelas/{escuelaId}/materias/nombres         (solo nombres)
```

### 👨‍🎓 Empleados Educativos por Escuela
```
POST   /api/escuelas/{escuelaId}/empleados-educativos
POST   /api/escuelas/{escuelaId}/empleados-educativos/batch
PUT    /api/escuelas/{escuelaId}/empleados-educativos/{empleadoId}
GET    /api/escuelas/{escuelaId}/empleados-educativos     (paginado)
GET    /api/escuelas/{escuelaId}/empleados-educativos?search=...
```

### 🎯 Designaciones Administrativas por Escuela
```
POST   /api/escuelas/{escuelaId}/designaciones/administrativas
POST   /api/escuelas/{escuelaId}/designaciones/administrativas/batch
GET    /api/escuelas/{escuelaId}/designaciones/administrativas (paginado)
```

### 🎯 Designaciones de Cursos por Escuela
```
POST   /api/escuelas/{escuelaId}/designaciones/cursos
POST   /api/escuelas/{escuelaId}/designaciones/cursos/batch
GET    /api/escuelas/{escuelaId}/designaciones/cursos     (paginado)
```

### 📍 Licencias por Escuela
```
GET    /api/escuelas/{escuelaId}/licencias               (paginado)
```

---

## 🎨 Convenciones

### Métodos HTTP
```
POST   = crear()           (201 Created)
POST*  = crearBatch()      (201 Created)
PUT    = actualizar()      (200 OK)
DELETE = eliminar()        (204 No Content)
GET *  = listar()          (200 OK, paginado)
GET/nombres = listarNombres() (200 OK, sin paginar)
```

### Parámetros
```
?search=texto          → búsqueda por texto
?estado=ACTIVOS|INACTIVOS
?turno=MAÑANA|TARDE|NOCHE
?page=0&size=10        → paginación
```

### Respuestas
```
200 OK - Consulta exitosa
201 Created - Recurso creado
204 No Content - Eliminación exitosa
400 Bad Request - Datos inválidos
404 Not Found - Recurso no encontrado
409 Conflict - Estado inválido
500 Server Error - Error interno
```

---

## 💡 Guía Rápida: ¿Cuál Endpoint Usar?

| Caso de Uso | Endpoint | Controller |
|-------------|----------|-----------|
| Crear curso en escuela 1 | `POST /api/escuelas/1/cursos` | `EscuelaCursoControllerREST` |
| Listar todos los empleados de escuela 2 | `GET /api/escuelas/2/empleados-educativos` | `EscuelaEmpleadoEducativoControllerREST` |
| Ver detalles de una designación | `GET /api/designaciones/{id}/detalle` | `DesignacionControllerREST` |
| Cambiar cobertura de licencia | `PUT /api/licencias/{id}/coberturas` | `LicenciaControllerREST` |
| Renovar una licencia | `PUT /api/licencias/{id}/renovar` | `LicenciaControllerREST` |
| Registrar inasistencias | `POST /api/asistencias/registrar-inasistencias-manual` | `AsistenciaControllerREST` |
| Cubrir designación provisional | `POST /api/designaciones/{id}/cubrir-provisional` | `DesignacionControllerREST` |

---

**Versión:** 2.0 (Estandarizado)
**Última actualización:** 2026-05-31

