-- Eliminar FK desde asignacion hacia caracteristica_asignacion
ALTER TABLE asignacion
DROP CONSTRAINT fk_asignacion_caracteristica;

-- Eliminar columna de la tabla asignacion
ALTER TABLE asignacion
DROP COLUMN caracteristica_id;

-- Eliminar tabla de características
DROP TABLE caracteristica_asignacion;