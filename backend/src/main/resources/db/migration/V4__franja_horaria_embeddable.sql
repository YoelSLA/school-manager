-- 1️⃣ Eliminar FK existente
ALTER TABLE franja_horaria
DROP CONSTRAINT fk_franja_designacion;

-- 2️⃣ Eliminar PK vieja (basada en id)
ALTER TABLE franja_horaria
DROP CONSTRAINT franja_horaria_pkey;

-- 3️⃣ Eliminar columna id
ALTER TABLE franja_horaria
DROP COLUMN id;

-- 4️⃣ Crear nueva PK compuesta
ALTER TABLE franja_horaria
    ADD CONSTRAINT franja_horaria_pkey
        PRIMARY KEY (designacion_id, dia, hora_desde, hora_hasta);

-- 5️⃣ Recrear FK con ON DELETE CASCADE
ALTER TABLE franja_horaria
    ADD CONSTRAINT fk_franja_designacion
        FOREIGN KEY (designacion_id)
            REFERENCES designacion (id)
            ON DELETE CASCADE;