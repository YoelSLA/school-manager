package com.gestion.escuela.gestion_escolar.services.licenciaEstatutaria;

import com.gestion.escuela.gestion_escolar.models.LicenciaEstatutaria;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface LicenciaEstaturariaService {

  LicenciaEstatutaria crear(String articulo, String codigo, String nombre, String descripcion);

  LicenciaEstatutaria actualizar(
      Long id, String articulo, String codigo, String nombre, String descripcion, boolean activa);

  LicenciaEstatutaria obtenerPorId(Long id);

  Page<LicenciaEstatutaria> obtenerTodas(Pageable pageable);

  List<LicenciaEstatutaria> obtenerActivas();

  void eliminar(Long id);
}
