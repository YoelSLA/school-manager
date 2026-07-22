CREATE TABLE licencia_estatutaria (
    id BIGSERIAL PRIMARY KEY,
    articulo VARCHAR(20),
    codigo VARCHAR(30) NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    descripcion VARCHAR(2000) NOT NULL,
    activa BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT uk_licencia_estatutaria_codigo
    UNIQUE (codigo)
);

INSERT INTO licencia_estatutaria (articulo, codigo, nombre, descripcion, activa)
VALUES
    ('Artículo 114','A1','Enfermedad ordinaria','Licencia ordinaria por enfermedad.',true),
    ('Artículo 114','A2','Enfermedad extraordinaria','Licencia extraordinaria por enfermedad.',true),
    ('Artículo 114','A22','Enfermedad extraordinaria (+5 años)','Licencia extraordinaria por enfermedad para docentes titulares con más de 5 años de antigüedad.',true),
    ('Artículo 114','114A28','Enfermedad crónica','Licencia por enfermedad cronica.',true),
    ('Artículo 114','A2211','Enfermedad prolongada','Licencia extraordinaria por enfermedad prolongada para docentes titulares o provisionales, cubriendo hasta 365 días con el 100 % de haberes para tratamientos complejos o posquirúrgicos.',true),
    ('Artículo 114','B1','Examen médico prematrimonial','Licencia por examen médico prematrimonial.',true),
    ('Artículo 114','B2','Matrimonio','Licencia por matrimonio, otorgando 12 días corridos.',true),
    ('Artículo 114','B21','Enfermedad preexistente','Licencia por enfemerdad preexistente.',true),
    ('Artículo 114','114C','Matrimonio (suplentes)','Licencia por matrimonio otorgada a suplentes, consistente en 6 días hábiles contados a partir del casamiento.',true),
    ('Artículo 114','114D','Embarazo y maternidad','Licencia por embarazo y maternidad para docentes, que otorga 135 días con goce íntegro de haberes a partir del séptimo mes y medio de gestación.',true),
    ('Artículo 114','114E','Nacimiento de hijo','Licencia por nacimiento de hijo.',true),
    ('Artículo 114','114F1','Familiar enfermo','Licencia por atención de familiar enfermo.',true),
    ('Artículo 114','114F2','Familiar enfermo (provisional)','Licencia por familiar enfermo para personal provisional, en igualdad de condiciones que el personal titular.',true),
    ('Artículo 114','114F3','Familiar enfermo (suplente)','Licencia por familiar enfermo para personal suplente, que gozará de 2 días hábiles por año.',true),
    ('Artículo 114','114F4','Grupo familiar','Licencia por familiar enfermo, donde el agente deberá expresar, con carácter de declaración jurada, la constitución del grupo familiar.',true),
    ('Artículo 114','114G','Donación de sangre','Licencia por donación de sangre.',true),
    ('Artículo 114','114H1','Profilaxis','Licencia por razones de profilaxis.',true),
    ('Artículo 114','114I','Unidad familiar','Licencia por unidad familiar o cuidado de familiar a cargo.',true),
    ('Artículo 114','114J','Duelo familiar','Licencia por duelo familiar.',true),
    ('Artículo 114','114K','Servicio militar (examen)','Licencia por examen médico para incorporación al servicio militar.',true),
    ('Artículo 114','114L','Servicio militar','Licencia por servicio militar o incorporación a las Fuerzas Armadas.',true),
    ('Artículo 114','114LL11','Preexamen universitario','Licencia por preexamen y examen para cursar carreras terciarias o universitarias.',true),
    ('Artículo 114','114LL12','Preexamen secundario','Licencia por preexamen y examen para cursar estudios secundarios o de enseñanza especializada.',true),
    ('Artículo 114','114LL13','Prácticas docentes','Licencia por prexamen y examen, cuando sea por practicas docentes obligatorias.',true),
    ('Artículo 114','114LL14','Concursos docentes','Licencia por prexamen y examen, en el caso de intervencion en los concursos que preescribe el estatuto docente.',true),
    ('Artículo 114','114LL15','Cursos de formación docente','Licencia por prexamen y examen, cuando se realizen curso en los institos superiores de formación docente.',true),
    ('Artículo 114','114LL2','Preexamen (suplentes)','Licencia por prexamen y examen, para personal suplente.',true),
    ('Artículo 114','114LL3','Preexamen certificado','Licencia por prexamen y examen, con presentación de certificado.',true),
    ('Artículo 114','114M1','Citación de autoridad','Licencia por sitación de autoridad competente para personal titular, provisional y suplente.',true),
    ('Artículo 114','114M11','Citación DGCyE','Licencia por sitación de autoridad de la autoridad competente de la dirección general de escuela y culturas.',true),
    ('Artículo 114','114M12','Citación judicial','Licencia por sitación de autoridad de la autoridad judicial o administrativa.',true),
    ('Artículo 114','114N','Vacación anual','Licencia por vocación anual.',true),
    ('Artículo 114','114Ñ','Donación de órganos','Licencia por donacion de organos.',true),
    ('Artículo 114','11401','Causas particulares','Licencia por causas particulares para personal titular o provisional, no puede exceder los 24 meses.',true),
    ('Artículo 114','11402','Causas particulares (suplentes)','Licencia por causas particulares para personal suplente, no gozara de este benefico.',true),
    ('Artículo 114','11403','Causas particulares (fraccionamiento)','Licencia por causa particulares, no podra fraccionarse para su uso, para persona titular y provisional.',true),
    ('Artículo 114','11404','Causas particulares (día mensual)','Licencia por causa particulares, por motivos de inde particular, para personal titular y provisional, gozara de un día de licencia por mes calendario hasta un máximo de 6 por año sin goce de haberes.',true),
    ('Artículo 114','11405','Causas particulares (acumulación)','Licencia por causa particulares, los periodos establecidos en O1 no seran acumulativos.',true),
    ('Artículo 115','115A1','Estudio e investigación','Licencia por estudio o perfeccionamiento docente, cuando el agente realiza estudios especiales o investigaciones.',true),
    ('Artículo 115','115A2','Perfeccionamiento docente','Licencia por estudio o perfeccionamiento docente, por interes particular cuando el agente concurra a congresos, curso o jordanas de perfeccionamiento docente hasta 6 dias habiles por año.',true),
    ('Artículo 115','115B1','Representación gremial','Licencia por representación gremial, sera concecida de acuerdo a las leyes vigentes.',true),
    ('Artículo 115','115B2','Delegado gremial','Licencia por representación gremial, a los docentes delegados en las escuela, se le otorga un día de licencia por mes.',true),
    ('Artículo 115','115B3','Asambleas gremiales','Licencia por representación gremial, cuando las organizaciones gremiales convocan asambleas y/o congresos de carácter ordinaro o extraordinario.',true),
    ('Artículo 115','115B4','Actos eleccionarios gremiales','Licencia por representación gremial, se deberan presentar antes la dirección general de escuela la nomina completa de los miembros para los actos eleccionarios.',true),
    ('Artículo 115','115C','Actividad de interés público','Licencia por actividad de interes publico del Estado.',true),
    ('Artículo 115','115D1','Mayor jerarquía','Licencia por desempeño de cargos de mayor jerarquia.',true),
    ('Artículo 115','115E1','Cargo electivo','Licencia por desempeño de cargos electivos, con excepcion del cargo del consejero escolar.',true),
    ('Artículo 115','115E2','Representación política','Licencia por desempeño de cargos electivos o de representación politica, sin goce de haberes a quienes resulten electos para ocupar cargos de conducción en los partidos politicos.',true),
    ('Artículo 115','115E3','Funcionario político','Licencia por desempeño de cargos electivos o de representación politica, se considera licencia sin goce de haberes por el termino desempeño que dependa de un funcionario politico.',true),
    (NULL,'ART','Accidente de trabajo','Licencia por cobertura de accidentes laborales o enfermadades prosesionales.',true),
    ('Artículo 121','10579RT','Personal docente','Licencia para personal docente.',true),
    ('Artículo 49','10430RT','Personal auxiliar','Licencia para personal auxiliar.',true),
    ('Artículo 139','Articulo139','Separación preventiva','Licencia por separación del cargo preventivo.',true);

-- Agregar la nueva columna (temporalmente nullable)
ALTER TABLE licencia
    ADD COLUMN licencia_estatutaria_id BIGINT;

-- Migrar los datos del enum a la nueva FK
UPDATE licencia l
SET licencia_estatutaria_id = le.id
    FROM licencia_estatutaria le
WHERE le.codigo =
    CASE l.tipo_licencia
    WHEN 'L_A1' THEN 'A1'
    WHEN 'L_A2' THEN 'A2'
    WHEN 'L_A22' THEN 'A22'
    WHEN 'L_A2211' THEN 'A2211'
    WHEN 'L_B1' THEN 'B1'
    WHEN 'L_B2' THEN 'B2'
    WHEN 'L_114C' THEN '114C'
    WHEN 'L_114D' THEN '114D'
    WHEN 'L_114E' THEN '114E'
    WHEN 'L_114F1' THEN '114F1'
    WHEN 'L_114F2' THEN '114F2'
    WHEN 'L_114F3' THEN '114F3'
    WHEN 'L_114F4' THEN '114F4'
    WHEN 'L_114G' THEN '114G'
    WHEN 'L_114H1' THEN '114H1'
    WHEN 'L_114I' THEN '114I'
    WHEN 'L_114J' THEN '114J'
    WHEN 'L_114K' THEN '114K'
    WHEN 'L_114L' THEN '114L'
    WHEN 'L_114LL11' THEN '114LL11'
    WHEN 'L_114LL12' THEN '114LL12'
    WHEN 'L_114LL13' THEN '114LL13'
    WHEN 'L_114LL14' THEN '114LL14'
    WHEN 'L_114LL15' THEN '114LL15'
    WHEN 'L_114LL2' THEN '114LL2'
    WHEN 'L_114LL3' THEN '114LL3'
    WHEN 'L_114M' THEN '114M1'
    WHEN 'L_114M11' THEN '114M11'
    WHEN 'L_114M12' THEN '114M12'
    WHEN 'L_114N' THEN '114N'
    WHEN 'L_114N1' THEN '114Ñ'
    WHEN 'L_114O1' THEN '11401'
    WHEN 'L_114O2' THEN '11402'
    WHEN 'L_114O3' THEN '11403'
    WHEN 'L_114O4' THEN '11404'
    WHEN 'L_114O5' THEN '11405'
    WHEN 'L_115A1' THEN '115A1'
    WHEN 'L_115A2' THEN '115A2'
    WHEN 'L_115B1' THEN '115B1'
    WHEN 'L_115B2' THEN '115B2'
    WHEN 'L_115B3' THEN '115B3'
    WHEN 'L_115B4' THEN '115B4'
    WHEN 'L_115C' THEN '115C'
    WHEN 'L_115D1' THEN '115D1'
    WHEN 'L_115E1' THEN '115E1'
    WHEN 'L_115E2' THEN '115E2'
    WHEN 'L_115E3' THEN '115E3'
    WHEN 'L_ART' THEN 'ART'
    WHEN 'L_10579RT' THEN '10579RT'
    WHEN 'L_10430RT' THEN '10430RT'
    WHEN 'L_ARTICULO_139' THEN 'Articulo139'
    WHEN 'L_114A28' THEN '114A28'
    WHEN 'L_B21' THEN 'B21'
END;

----------------------------------------------------------
-- Crear índice para la nueva FK
----------------------------------------------------------
CREATE INDEX idx_licencia_licencia_estatutaria
    ON licencia (licencia_estatutaria_id);

----------------------------------------------------------
-- Crear la clave foránea
----------------------------------------------------------
ALTER TABLE licencia
    ADD CONSTRAINT fk_licencia_licencia_estatutaria
        FOREIGN KEY (licencia_estatutaria_id)
            REFERENCES licencia_estatutaria(id);

----------------------------------------------------------
-- Hacer obligatoria la relación
----------------------------------------------------------
ALTER TABLE licencia
    ALTER COLUMN licencia_estatutaria_id
        SET NOT NULL;

----------------------------------------------------------
-- Eliminar la restricción del enum
----------------------------------------------------------
ALTER TABLE licencia
DROP CONSTRAINT licencia_tipo_licencia_check;

----------------------------------------------------------
-- Eliminar la columna antigua
----------------------------------------------------------
ALTER TABLE licencia
DROP COLUMN tipo_licencia;

     ----------------------------------------------------------
-- Agregar la nueva columna
----------------------------------------------------------
ALTER TABLE asistencia
    ADD COLUMN licencia_estatutaria_id BIGINT;

----------------------------------------------------------
-- Migrar los datos
----------------------------------------------------------
UPDATE asistencia a
SET licencia_estatutaria_id = le.id
    FROM licencia_estatutaria le
WHERE le.codigo =
    CASE a.tipo_licencia
    WHEN 'L_A1' THEN 'A1'
    WHEN 'L_A2' THEN 'A2'
    WHEN 'L_A22' THEN 'A22'
    WHEN 'L_A2211' THEN 'A2211'
    WHEN 'L_B1' THEN 'B1'
    WHEN 'L_B2' THEN 'B2'
    WHEN 'L_114C' THEN '114C'
    WHEN 'L_114D' THEN '114D'
    WHEN 'L_114E' THEN '114E'
    WHEN 'L_114F1' THEN '114F1'
    WHEN 'L_114F2' THEN '114F2'
    WHEN 'L_114F3' THEN '114F3'
    WHEN 'L_114F4' THEN '114F4'
    WHEN 'L_114G' THEN '114G'
    WHEN 'L_114H1' THEN '114H1'
    WHEN 'L_114I' THEN '114I'
    WHEN 'L_114J' THEN '114J'
    WHEN 'L_114K' THEN '114K'
    WHEN 'L_114L' THEN '114L'
    WHEN 'L_114LL11' THEN '114LL11'
    WHEN 'L_114LL12' THEN '114LL12'
    WHEN 'L_114LL13' THEN '114LL13'
    WHEN 'L_114LL14' THEN '114LL14'
    WHEN 'L_114LL15' THEN '114LL15'
    WHEN 'L_114LL2' THEN '114LL2'
    WHEN 'L_114LL3' THEN '114LL3'
    WHEN 'L_114M' THEN '114M1'
    WHEN 'L_114M11' THEN '114M11'
    WHEN 'L_114M12' THEN '114M12'
    WHEN 'L_114N' THEN '114N'
    WHEN 'L_114N1' THEN '114Ñ'
    WHEN 'L_114O1' THEN '11401'
    WHEN 'L_114O2' THEN '11402'
    WHEN 'L_114O3' THEN '11403'
    WHEN 'L_114O4' THEN '11404'
    WHEN 'L_114O5' THEN '11405'
    WHEN 'L_115A1' THEN '115A1'
    WHEN 'L_115A2' THEN '115A2'
    WHEN 'L_115B1' THEN '115B1'
    WHEN 'L_115B2' THEN '115B2'
    WHEN 'L_115B3' THEN '115B3'
    WHEN 'L_115B4' THEN '115B4'
    WHEN 'L_115C' THEN '115C'
    WHEN 'L_115D1' THEN '115D1'
    WHEN 'L_115E1' THEN '115E1'
    WHEN 'L_115E2' THEN '115E2'
    WHEN 'L_115E3' THEN '115E3'
    WHEN 'L_ART' THEN 'ART'
    WHEN 'L_10579RT' THEN '10579RT'
    WHEN 'L_10430RT' THEN '10430RT'
    WHEN 'L_ARTICULO_139' THEN 'Articulo139'
    WHEN 'L_114A28' THEN '114A28'
    WHEN 'L_B21' THEN 'B21'
END;

----------------------------------------------------------
-- Crear índice
----------------------------------------------------------
CREATE INDEX idx_asistencia_licencia_estatutaria
    ON asistencia (licencia_estatutaria_id);

----------------------------------------------------------
-- Crear la FK
----------------------------------------------------------
ALTER TABLE asistencia
    ADD CONSTRAINT fk_asistencia_licencia_estatutaria
        FOREIGN KEY (licencia_estatutaria_id)
            REFERENCES licencia_estatutaria(id);

----------------------------------------------------------
-- Eliminar el CHECK del enum
----------------------------------------------------------
ALTER TABLE asistencia
DROP CONSTRAINT asistencia_tipo_licencia_check;

----------------------------------------------------------
-- Eliminar la columna vieja
----------------------------------------------------------
ALTER TABLE asistencia
DROP COLUMN tipo_licencia;