package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.LicenciaEstatutaria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LicenciaEstatutariaRepository extends JpaRepository<LicenciaEstatutaria, Long> {

  Optional<LicenciaEstatutaria> findByCodigo(String codigo);

  boolean existsByCodigo(String codigo);

  List<LicenciaEstatutaria> findByActivaTrue();
}
