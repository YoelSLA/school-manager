-- 1️⃣ Agregar columna nullable
ALTER TABLE materia
    ADD COLUMN orientacion VARCHAR(100);

-- 2️⃣ Copiar orientación desde designacion_curso
UPDATE materia m
SET orientacion = dc.orientacion
    FROM designacion_curso dc
WHERE dc.materia_id = m.id;

-- 3️⃣ Completar las que quedaron NULL
UPDATE materia
SET orientacion = 'SIN_ORIENTACION'
WHERE orientacion IS NULL;

-- 4️⃣ Ahora sí hacerla NOT NULL
ALTER TABLE materia
    ALTER COLUMN orientacion SET NOT NULL;

-- 5️⃣ Eliminar columna vieja
ALTER TABLE designacion_curso
DROP COLUMN orientacion;