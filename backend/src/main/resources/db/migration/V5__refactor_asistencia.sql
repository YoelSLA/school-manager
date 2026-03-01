-- 1️⃣ Eliminar FK a licencia
ALTER TABLE asistencia
DROP CONSTRAINT IF EXISTS fk_asistencia_licencia;

-- 2️⃣ Eliminar columna licencia_id
ALTER TABLE asistencia
DROP COLUMN IF EXISTS licencia_id;

-- 3️⃣ Eliminar columna origen_asistencia
ALTER TABLE asistencia
DROP COLUMN IF EXISTS origen_asistencia;

-- 4️⃣ Eliminar check constraint de origen
ALTER TABLE asistencia
DROP CONSTRAINT IF EXISTS asistencia_origen_check;