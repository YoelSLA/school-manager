package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmpleadoEducativoRepository extends JpaRepository<EmpleadoEducativo, Long> {

	boolean existsByCuil(String cuil);

	boolean existsByCuilAndEscuela(String cuil, Escuela escuela);

	boolean existsByEmailAndEscuela(String email, Escuela escuela);

	Optional<EmpleadoEducativo> findByCuil(String cuil);

	List<EmpleadoEducativo> findByEscuelaId(Long escuelaId);

	List<EmpleadoEducativo> findByEscuelaAndActivoTrue(Escuela escuela);

	List<EmpleadoEducativo> findByEscuelaAndActivoFalse(Escuela escuela);

	@Query("""
				select e from EmpleadoEducativo e
				where e.escuela.id = :escuelaId
				and (
					lower(e.apellido) like %:search%
					or lower(e.nombre) like %:search%
					or e.cuil like %:search%
				)
			""")
	List<EmpleadoEducativo> buscarPorEscuelaYTexto(
			Long escuelaId,
			String search
	);


}