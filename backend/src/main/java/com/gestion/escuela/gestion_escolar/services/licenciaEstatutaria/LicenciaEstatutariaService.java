package com.gestion.escuela.gestion_escolar.services.licenciaEstatutaria;

import com.gestion.escuela.gestion_escolar.models.LicenciaEstatutaria;
import com.gestion.escuela.gestion_escolar.persistence.LicenciaEstatutariaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class LicenciaEstatutariaService implements LicenciaEstaturariaService {

  private final LicenciaEstatutariaRepository licenciaEstatutariaRepository;

  @Override
  public LicenciaEstatutaria crear(
      String articulo, String codigo, String nombre, String descripcion) {

    validarCodigoDisponible(codigo);

    LicenciaEstatutaria licencia =
        LicenciaEstatutaria.builder()
            .articulo(articulo)
            .codigo(codigo)
            .nombre(nombre)
            .descripcion(descripcion)
            .build();

    return licenciaEstatutariaRepository.save(licencia);
  }

  @Override
  public LicenciaEstatutaria actualizar(
      Long id, String articulo, String codigo, String nombre, String descripcion, boolean activa) {

    LicenciaEstatutaria licencia = obtenerPorId(id);

    if (!licencia.getCodigo().equals(codigo)) {
      validarCodigoDisponible(codigo);
    }

    licencia.actualizar(articulo, codigo, nombre, descripcion, activa);

    return licenciaEstatutariaRepository.save(licencia);
  }

  @Override
  public LicenciaEstatutaria obtenerPorId(Long id) {
    return licenciaEstatutariaRepository
        .findById(id)
        .orElseThrow(() -> new RuntimeException("Licencia estatutaria no encontrada."));
  }

  @Override
  public Page<LicenciaEstatutaria> obtenerTodas(Pageable pageable) {
    return licenciaEstatutariaRepository.findAll(
        PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("codigo")));
  }

  @Override
  public void eliminar(Long id) {
    licenciaEstatutariaRepository.delete(obtenerPorId(id));
  }

  private void validarCodigoDisponible(String codigo) {
    if (licenciaEstatutariaRepository.existsByCodigo(codigo)) {
      throw new RuntimeException("Ya existe una licencia con ese código.");
    }
  }
}
