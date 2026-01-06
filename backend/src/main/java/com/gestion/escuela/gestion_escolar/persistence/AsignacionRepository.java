package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AsignacionRepository extends JpaRepository<Asignacion, Long> {


}
