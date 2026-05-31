ALTER TABLE asignacion_suplente
    ADD COLUMN licencia_id BIGINT;

ALTER TABLE asignacion_suplente
    ADD CONSTRAINT fk_asignacion_suplente_licencia
        FOREIGN KEY (licencia_id)
            REFERENCES licencia(id);