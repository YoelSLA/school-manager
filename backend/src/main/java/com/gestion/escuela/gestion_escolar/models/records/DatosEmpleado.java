package com.gestion.escuela.gestion_escolar.models.records;

import java.time.LocalDate;

public record DatosEmpleado(
    String cuil,
    String nombre,
    String apellido,
    String domicilio,
    String telefono,
    LocalDate fechaDeNacimiento,
    LocalDate fechaDeIngreso,
    String email) {}
