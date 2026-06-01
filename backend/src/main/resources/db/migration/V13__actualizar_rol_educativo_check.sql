ALTER TABLE designacion
DROP CONSTRAINT IF EXISTS designacion_rol_check;

ALTER TABLE designacion
    ADD CONSTRAINT designacion_rol_check
        CHECK (
            rol_educativo IN (
                              'DIRECCION',
                              'VICEDIRECCION',
                              'SECRETARIA',
                              'BIBLIOTECARIO',
                              'ORIENTACION_EDUCACIONAL',
                              'ORIENTACION_SOCIAL',
                              'PRECEPTORIA',
                              'DOCENTE',
                              'AUXILIAR',
                              'ENCARGO_DE_MEDIO_DE_APOYO_TECNICO_PROFESIONAL',
                              'CAMBIO_DE_FUNCION'
                )
            );