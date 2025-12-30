package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.cupof.Cupof;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CupofRepository extends JpaRepository<Cupof, Long> {


}