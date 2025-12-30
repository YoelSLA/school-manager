package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.controllers.dtos.EmpleadoEducativoUpdateDTO;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.persistence.EmpleadoEducativoRepository;
import com.gestion.escuela.gestion_escolar.services.EmpleadoEducativoService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class EmpleadoEducativoServiceImpl
        implements EmpleadoEducativoService {

    private final EmpleadoEducativoRepository empleadoEducativoRepository;

    public EmpleadoEducativoServiceImpl(
            EmpleadoEducativoRepository empleadoEducativoRepository) {
        this.empleadoEducativoRepository = empleadoEducativoRepository;
    }

    @Override
    public EmpleadoEducativo crear(EmpleadoEducativo empleado, Escuela escuela) {
        empleado.setEscuela(escuela);
        return empleadoEducativoRepository.save(empleado);
    }

    @Override
    public List<EmpleadoEducativo> listar() {
        return empleadoEducativoRepository.findAll();
    }

    public boolean existeCuil(String cuil) {
        return empleadoEducativoRepository.existsByCuil(cuil);
    }

    @Override
    public Optional<EmpleadoEducativo> buscarPorCuil(String cuil) {
        return empleadoEducativoRepository.findByCuil(cuil);
    }

    public EmpleadoEducativo actualizarPorCuil(String cuilActual, EmpleadoEducativoUpdateDTO dto
    ) {

        EmpleadoEducativo empleado = empleadoEducativoRepository.findByCuil(cuilActual)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No existe un empleado educativo con ese CUIL"
                ));

        // 🔑 Si el CUIL cambia, validar que no exista
        if (!cuilActual.equals(dto.getCuil())) {
            if (empleadoEducativoRepository.existsByCuil(dto.getCuil())) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "El CUIL ya está registrado"
                );
            }
        }

        empleado.setNombre(dto.getNombre());
        empleado.setApellido(dto.getApellido());
        empleado.setCuil(dto.getCuil());
        empleado.setDomicilio(dto.getDomicilio());
        empleado.setFechaDeNacimiento(dto.getFechaNacimiento());
        empleado.setFechaDeIngreso(dto.getFechaIngreso());
        empleado.setTelefono(dto.getTelefono());

        return empleadoEducativoRepository.save(empleado);
    }

    public void eliminarPorCuil(String cuil) {

        EmpleadoEducativo empleado = empleadoEducativoRepository.findByCuil(cuil)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No existe un empleado educativo con ese CUIL"
                ));

        empleadoEducativoRepository.delete(empleado);
    }
}

