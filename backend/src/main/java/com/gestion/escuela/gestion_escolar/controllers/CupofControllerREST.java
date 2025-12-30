package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.CupofAdministrativoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.CupofAdministrativoResponseDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.CupofCursoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.CupofCursoResponseDTO;
import com.gestion.escuela.gestion_escolar.mappers.CupofAdministrativoMapper;
import com.gestion.escuela.gestion_escolar.mappers.CupofCursoMapper;
import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Materia;
import com.gestion.escuela.gestion_escolar.models.cupof.Cupof;
import com.gestion.escuela.gestion_escolar.models.cupof.CupofAdministrativo;
import com.gestion.escuela.gestion_escolar.models.cupof.CupofCurso;
import com.gestion.escuela.gestion_escolar.services.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/cupofs")
@RequiredArgsConstructor
public class CupofControllerREST {

  private final CupofService cupofService;
  private final EscuelaService escuelaService;
  private final EmpleadoEducativoService empleadoEducativoService;
  private final CursoService cursoService;
  private final MateriaService materiaService;


  @PostMapping("/administrativo")
  public ResponseEntity<CupofAdministrativoResponseDTO> crearAdministrativo(
          @Valid @RequestBody CupofAdministrativoCreateDTO dto) {

    Escuela escuela = escuelaService.obtenerOCrearPorNombre(dto.getNombreEscuela());

    EmpleadoEducativo empleadoEducativo = empleadoEducativoService
            .buscarPorCuil(dto.getCuil())
            .orElseThrow(() ->
                    new ResponseStatusException(
                            HttpStatus.BAD_REQUEST,
                            "El empleado con el cuil " + dto.getCuil() + " no fue encontrado."
                    ));

    CupofAdministrativo cupof = CupofAdministrativoMapper.toEntity(dto, escuela, empleadoEducativo);

    System.out.println("HOLAAAAAAAAAAAAAAAA 1");

    CupofAdministrativo creado = cupofService.crearAdministrativo(cupof);

    System.out.println("HOLAAAAAAAAAAAAAAAA 2");

    return ResponseEntity.status(HttpStatus.CREATED).body(CupofAdministrativoMapper.toResponse(creado));
  }

  @GetMapping("/administrativo")
  public List<CupofAdministrativoResponseDTO> obtenerAdministrativos(@RequestParam String nombreEscuela) {

    Escuela escuela = escuelaService.obtenerPorNombre(nombreEscuela);
    return cupofService.getAllAdministrativos(escuela)
            .stream()
            .map(CupofAdministrativoMapper::toResponse)
            .toList();
  }

  @PostMapping("/curso")
  public ResponseEntity<CupofCursoResponseDTO> crearCurso(
          @Valid @RequestBody CupofCursoCreateDTO dto
  ) {

    EmpleadoEducativo empleado = empleadoEducativoService.buscarPorCuil(dto.getCuil()).orElse(null);

    Curso curso = cursoService.buscarPorId(dto.getCursoId());
    Materia materia = materiaService.buscarPorId(dto.getMateriaId());

    Escuela escuela = curso.getEscuela();

    CupofCurso cupof = CupofCursoMapper.toEntity(
            dto,
            escuela,
            curso,
            materia,
            empleado
    );

    CupofCurso creado = cupofService.crearCurso(cupof);

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(CupofCursoMapper.toResponse(creado));
  }


  @GetMapping
  public List<Cupof> porCuil(@RequestParam String cuil) {
    return cupofService.obtenerPorCuil(cuil);
  }
}

