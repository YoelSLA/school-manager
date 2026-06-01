ALTER TABLE asignacion
DROP CONSTRAINT IF EXISTS asignacion_causa_check;

ALTER TABLE asignacion
    ADD CONSTRAINT asignacion_causa_check
        CHECK (
            causa IS NULL OR
            causa IN (
                      'RENUNCIA',
                      'CESE_DE_FUNCIONES',
                      'JUBILACION',
                      'FALLECIMIENTO',
                      'PASE_A_PROVISIONAL',
                      'OTRA'
                )
            );