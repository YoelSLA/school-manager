package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.EmpleadoEducativoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.EmpleadoEducativoResponseDTO;
import com.gestion.escuela.gestion_escolar.mappers.EmpleadoEducativoMapper;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.services.EmpleadoEducativoService;
import com.gestion.escuela.gestion_escolar.services.EscuelaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/empleado_educativo")
@RequiredArgsConstructor
public class EmpleadoEducativoControllerREST {

  private final EmpleadoEducativoService empleadoEducativoService;
  private final EscuelaService escuelaService;

  @PostMapping
  public ResponseEntity<EmpleadoEducativoResponseDTO> crear(@Valid @RequestBody EmpleadoEducativoCreateDTO empleadoEducativoCreateDTO) {

    // 1️⃣ Resolver escuela
    Escuela escuela = escuelaService.obtenerOCrearPorNombre(empleadoEducativoCreateDTO.getNombreEscuela());

    // 2️⃣ Mapear DTO → entidad
    EmpleadoEducativo entity = EmpleadoEducativoMapper.toEntity(empleadoEducativoCreateDTO, escuela);

    // 3️⃣ Llamar al service
    EmpleadoEducativo guardado = empleadoEducativoService.crear(entity, escuela);

    // 4️⃣ Mapear entidad → DTO
    return ResponseEntity.status(HttpStatus.CREATED).body(EmpleadoEducativoMapper.toResponse(guardado));
  }

  @GetMapping
  public List<EmpleadoEducativoResponseDTO> getAllEmpleadosEducativos() {
    return empleadoEducativoService.listar()
            .stream()
            .map(EmpleadoEducativoMapper::toResponse)
            .toList();
  }

  @GetMapping("/existe-cuil")
  public ResponseEntity<Boolean> existeCuil(
          @RequestParam String cuil) {

    boolean existe = empleadoEducativoService.existeCuil(cuil);
    return ResponseEntity.ok(existe);
  }

//  @PutMapping("/cuil/{cuilActual}")
//  public ResponseEntity<EmpleadoEducativo> actualizarPorCuil(@PathVariable String cuilActual,
//          @Valid @RequestBody EmpleadoEducativoUpdateDTO dto
//  ) {
//    EmpleadoEducativo actualizado = empleadoEducativoService.actualizarPorCuil(cuilActual, dto);
//
//    return ResponseEntity.ok(actualizado);
//  }

  @DeleteMapping("/cuil/{cuil}")
  public ResponseEntity<Void> eliminarPorCuil(
          @PathVariable String cuil
  ) {
    empleadoEducativoService.eliminarPorCuil(cuil);
    return ResponseEntity.noContent().build(); // 204
  }
}
