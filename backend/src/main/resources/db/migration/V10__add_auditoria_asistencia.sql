ALTER TABLE asistencia
    ADD COLUMN fecha_creacion TIMESTAMP DEFAULT NOW();

ALTER TABLE asistencia
    ADD COLUMN fecha_actualizacion TIMESTAMP DEFAULT NOW();

ALTER TABLE asistencia
    ADD COLUMN creado_por VARCHAR(255) DEFAULT 'sistema';

ALTER TABLE asistencia
    ADD COLUMN actualizado_por VARCHAR(255) DEFAULT 'sistema';