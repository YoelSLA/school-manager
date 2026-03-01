package com.gestion.escuela.gestion_escolar.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materias.MateriaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materias.MateriaUpdateDTO;
import com.gestion.escuela.gestion_escolar.controllers.escuelasContexto.EscuelaMateriaControllerREST;
import com.gestion.escuela.gestion_escolar.models.Materia;
import com.gestion.escuela.gestion_escolar.services.MateriaService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(EscuelaMateriaControllerREST.class)
public class MateriaControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private MateriaService materiaService;

	@Autowired
	private ObjectMapper objectMapper;

	@Test
	void debeCrearMateria() throws Exception {

		Materia materia = new Materia("Matemática", "MAT", 4);
		ReflectionTestUtils.setField(materia, "id", 1L);

		when(materiaService.crear(eq(1L), any(Materia.class)))
				.thenReturn(materia);

		MateriaCreateDTO dto = new MateriaCreateDTO(
				"Matemática",
				"MAT",
				4
		);

		mockMvc.perform(post("/api/escuelas/1/materias")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(dto)))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.id").value(1))
				.andExpect(jsonPath("$.nombre").value("Matemática"));
	}

	@Test
	void debeCrearMateriasEnBatch() throws Exception {

		List<MateriaCreateDTO> dtos = List.of(
				new MateriaCreateDTO("Matemática", "MAT", 4),
				new MateriaCreateDTO("Lengua", "LEN", 3)
		);

		mockMvc.perform(post("/api/escuelas/1/materias/batch")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(dtos)))
				.andExpect(status().isCreated());

		verify(materiaService).crearBatch(
				eq(1L),
				argThat(lista ->
						lista.size() == 2 &&
								lista.get(0).getNombre().equals("Matemática") &&
								lista.get(1).getNombre().equals("Lengua")
				)
		);
	}

	@Test
	void debeActualizarMateria() throws Exception {

		MateriaUpdateDTO dto = new MateriaUpdateDTO(
				"Matemática Avanzada",
				"MAT2",
				5
		);

		Materia materiaActualizada = new Materia("Matemática Avanzada", "MAT2", 5);
		ReflectionTestUtils.setField(materiaActualizada, "id", 10L);

		when(materiaService.actualizar(
				eq(1L),
				eq(10L),
				eq("Matemática Avanzada"),
				eq("MAT2"),
				eq(5)
		)).thenReturn(materiaActualizada);

		mockMvc.perform(put("/api/escuelas/1/materias/10")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(dto)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(10))
				.andExpect(jsonPath("$.nombre").value("Matemática Avanzada"))
				.andExpect(jsonPath("$.abreviatura").value("MAT2"))
				.andExpect(jsonPath("$.cantidadModulos").value(5));
	}

	@Test
	void debeEliminarMateria() throws Exception {

		mockMvc.perform(delete("/api/escuelas/1/materias/10"))
				.andExpect(status().isNoContent());

		verify(materiaService).eliminar(1L, 10L);
	}

	@Test
	void debeListarMateriasPaginadas() throws Exception {

		Materia m1 = new Materia("Matemática", "MAT", 4);
		Materia m2 = new Materia("Lengua", "LEN", 3);

		ReflectionTestUtils.setField(m1, "id", 1L);
		ReflectionTestUtils.setField(m2, "id", 2L);

		Page<Materia> page = new PageImpl<>(
				List.of(m1, m2),
				PageRequest.of(0, 10),
				2
		);

		when(materiaService.listarMateriasPorEscuela(eq(1L), any(Pageable.class)))
				.thenReturn(page);

		mockMvc.perform(get("/api/escuelas/1/materias")
						.param("page", "0")
						.param("size", "10"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.content.length()").value(2))
				.andExpect(jsonPath("$.content[0].id").value(1))
				.andExpect(jsonPath("$.content[0].nombre").value("Matemática"))
				.andExpect(jsonPath("$.totalElements").value(2));
	}

	@Test
	void debeListarNombresDeMaterias() throws Exception {

		Materia m1 = new Materia("Matemática", "MAT", 4);
		Materia m2 = new Materia("Lengua", "LEN", 3);

		when(materiaService.listarMateriasPorEscuela(1L))
				.thenReturn(List.of(m1, m2));

		mockMvc.perform(get("/api/escuelas/1/materias/nombres"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.length()").value(2))
				.andExpect(jsonPath("$[0].nombre").value("Matemática"))
				.andExpect(jsonPath("$[1].nombre").value("Lengua"));
	}
}
