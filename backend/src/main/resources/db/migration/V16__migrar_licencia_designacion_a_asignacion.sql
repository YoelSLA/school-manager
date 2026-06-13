-- -----------------------------------------------------
-- Nueva tabla
-- -----------------------------------------------------

CREATE TABLE licencia_asignacion
(
    licencia_id   BIGINT NOT NULL,
    asignacion_id BIGINT NOT NULL,

    CONSTRAINT licencia_asignacion_pkey
        PRIMARY KEY (licencia_id, asignacion_id)
);

ALTER TABLE licencia_asignacion
    ADD CONSTRAINT fk_licencia_asignacion_licencia
        FOREIGN KEY (licencia_id)
            REFERENCES licencia (id);

ALTER TABLE licencia_asignacion
    ADD CONSTRAINT fk_licencia_asignacion_asignacion
        FOREIGN KEY (asignacion_id)
            REFERENCES asignacion (id);

-- -----------------------------------------------------
-- Migración de datos
--
-- Relaciona cada licencia con las asignaciones
-- del mismo empleado, misma designación y cuya
-- vigencia se superpone con la licencia.
-- -----------------------------------------------------

INSERT INTO licencia_asignacion (
    licencia_id,
    asignacion_id
)
SELECT DISTINCT
    l.id,
    a.id
FROM licencia l
         JOIN licencia_designacion ld
              ON ld.licencia_id = l.id
         JOIN asignacion a
              ON a.designacion_id = ld.designacion_id
                  AND a.empleado_educativo_id = l.empleado_id
WHERE a.fecha_desde <= l.fecha_hasta
  AND (
    a.fecha_hasta IS NULL
        OR a.fecha_hasta >= l.fecha_desde
    );

-- -----------------------------------------------------
-- Eliminar relación vieja
-- -----------------------------------------------------

ALTER TABLE licencia_designacion
DROP CONSTRAINT fk_licencia_designacion_designacion;

ALTER TABLE licencia_designacion
DROP CONSTRAINT fk_licencia_designacion_licencia;

DROP TABLE licencia_designacion;