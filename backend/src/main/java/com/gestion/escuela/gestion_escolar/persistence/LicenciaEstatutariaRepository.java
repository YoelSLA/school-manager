package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.LicenciaEstatutaria;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LicenciaEstatutariaRepository extends JpaRepository<LicenciaEstatutaria, Long> {

  Optional<LicenciaEstatutaria> findByCodigo(String codigo);

  boolean existsByCodigo(String codigo);

  List<LicenciaEstatutaria> findByActivaTrue();
}
