package com.gestion.escuela.gestion_escolar.services.licenciaEstatutaria;

import com.gestion.escuela.gestion_escolar.models.LicenciaEstatutaria;
import java.util.List;

public interface LicenciaEstaturariaService {

  LicenciaEstatutaria crear(String articulo, String codigo, String nombre, String descripcion);

  LicenciaEstatutaria actualizar(
      Long id, String articulo, String codigo, String nombre, String descripcion, boolean activa);

  LicenciaEstatutaria obtenerPorId(Long id);

  List<LicenciaEstatutaria> obtenerTodas();

  void eliminar(Long id);
}
