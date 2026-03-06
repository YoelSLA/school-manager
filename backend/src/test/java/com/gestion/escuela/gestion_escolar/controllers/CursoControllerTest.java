package com.gestion.escuela.gestion_escolar.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gestion.escuela.gestion_escolar.controllers.dtos.cursos.CursoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.cursos.CursoUpdateDTO;
import com.gestion.escuela.gestion_escolar.controllers.escuelasContexto.EscuelaCursoControllerREST;
import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.enums.Turno;
import com.gestion.escuela.gestion_escolar.services.CursoService;
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

import static com.gestion.escuela.gestion_escolar.models.enums.Turno.MANIANA;
import static com.gestion.escuela.gestion_escolar.models.enums.Turno.TARDE;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(EscuelaCursoControllerREST.class)
class CursoControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private CursoService cursoService;

	@Autowired
	private ObjectMapper objectMapper;

	@Test
	void debeCrearCurso() throws Exception {

		Curso cursoModelo = new Curso(MANIANA, 1, 1);
		ReflectionTestUtils.setField(cursoModelo, "id", 1L);

		when(cursoService.crear(eq(1L), any(Curso.class))).thenReturn(cursoModelo);

		CursoCreateDTO dto = new CursoCreateDTO(MANIANA, 1, 1);

		mockMvc.perform(post("/api/escuelas/1/cursos")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(dto)))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.id").value(1))
				.andExpect(jsonPath("$.anio").value(1))
				.andExpect(jsonPath("$.grado").value(1))
				.andExpect(jsonPath("$.turno").value("Mañana"));
	}

	@Test
	void debeCrearCursosEnBatch() throws Exception {

		List<CursoCreateDTO> dtos = List.of(
				new CursoCreateDTO(MANIANA, 1, 1),
				new CursoCreateDTO(TARDE, 2, 2)
		);

		mockMvc.perform(post("/api/escuelas/1/cursos/batch")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(dtos)))
				.andExpect(status().isCreated());

		verify(cursoService).crearBatch(
				eq(1L),
				argThat(lista ->
						lista.size() == 2 &&
								lista.get(0).getGrado().equals(1) &&
								lista.get(1).getGrado().equals(2)
				)
		);
	}

	@Test
	void debeActualizarCurso() throws Exception {

		Curso cursoActualizado = new Curso(TARDE, 3, 1);
		ReflectionTestUtils.setField(cursoActualizado, "id", 10L);

		when(cursoService.actualizar(
				eq(1L),
				eq(10L),
				eq(3),
				eq(2),
				eq(Turno.TARDE)
		)).thenReturn(cursoActualizado);

		CursoUpdateDTO dto = new CursoUpdateDTO(TARDE, 3, 2);

		mockMvc.perform(put("/api/escuelas/1/cursos/10")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(dto)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(10))
				.andExpect(jsonPath("$.anio").value(3))
				.andExpect(jsonPath("$.grado").value(1))
				.andExpect(jsonPath("$.turno").value("Tarde"));
	}

	@Test
	void debeEliminarCurso() throws Exception {

		mockMvc.perform(delete("/api/escuelas/1/cursos/10"))
				.andExpect(status().isNoContent());

		verify(cursoService).eliminar(1L, 10L);
	}

	@Test
	void debeListarCursosPaginados() throws Exception {

		Curso c1 = new Curso(MANIANA, 1, 1);
		Curso c2 = new Curso(MANIANA, 2, 1);

		ReflectionTestUtils.setField(c1, "id", 1L);
		ReflectionTestUtils.setField(c2, "id", 2L);

		Page<Curso> page = new PageImpl<>(
				List.of(c1, c2),
				PageRequest.of(0, 10),
				2
		);

		when(cursoService.listarCursosPorEscuela(
				eq(1L),
				isNull(),
				any(Pageable.class)
		)).thenReturn(page);

		mockMvc.perform(get("/api/escuelas/1/cursos")
						.param("page", "0")
						.param("size", "10"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.content.length()").value(2))
				.andExpect(jsonPath("$.content[0].id").value(1))
				.andExpect(jsonPath("$.content[0].anio").value(1))
				.andExpect(jsonPath("$.totalElements").value(2));
	}

	@Test
	void debeListarNombresDeCursos() throws Exception {

		Curso c1 = new Curso(MANIANA, 1, 1);
		Curso c2 = new Curso(TARDE, 1, 2);

		when(cursoService.listarCursosPorEscuela(1L))
				.thenReturn(List.of(c1, c2));

		mockMvc.perform(get("/api/escuelas/1/cursos/nombres"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.length()").value(2));
	}
}