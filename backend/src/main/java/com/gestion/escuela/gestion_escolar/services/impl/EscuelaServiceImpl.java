package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.persistence.EscuelaRepository;
import com.gestion.escuela.gestion_escolar.services.EscuelaService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class EscuelaServiceImpl implements EscuelaService {

  private final EscuelaRepository escuelaRepository;

  public EscuelaServiceImpl(EscuelaRepository escuelaRepository) {
    this.escuelaRepository = escuelaRepository;
  }

  @Override
  @Transactional
  public Escuela obtenerOCrearPorNombre(String nombreEscuela) {

    return escuelaRepository
            .findByNombreIgnoreCase(nombreEscuela)
            .orElseGet(() -> {
              System.out.println(">>> ESCUELA NO EXISTE, CREANDO <<<");
              Escuela nueva = new Escuela();
              nueva.setNombre(nombreEscuela.trim());
              return escuelaRepository.save(nueva);
            });
  }

  @Override
  public Escuela obtenerPorNombre(String nombreEscuela) {
    return escuelaRepository
            .findByNombreIgnoreCase(nombreEscuela.trim())
            .orElseThrow(() ->
                    new ResponseStatusException(
                            HttpStatus.BAD_REQUEST,
                            "No existe la escuela: " + nombreEscuela
                    )
            );
  }
}
