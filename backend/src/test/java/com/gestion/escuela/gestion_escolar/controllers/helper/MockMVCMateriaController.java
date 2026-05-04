package com.gestion.escuela.gestion_escolar.controllers.helper;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materias.MateriaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materias.MateriaUpdateDTO;
import jakarta.servlet.ServletException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

@Component
public class MockMVCMateriaController {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	public ResultActions performRequest(MockHttpServletRequestBuilder requestBuilder) throws Throwable {
		try {
			return mockMvc.perform(requestBuilder);
		} catch (
				ServletException e) {
			throw e.getCause();
		}
	}

	public Long crearMateria(Long escuelaId, MateriaCreateDTO dto) throws Exception {
		var json = objectMapper.writeValueAsString(dto);

		return Long.parseLong(
				mockMvc.perform(MockMvcRequestBuilders.post("/api/escuelas/" + escuelaId + "/materias")
								.contentType(MediaType.APPLICATION_JSON)
								.content(json))
						.andExpect(MockMvcResultMatchers.status().isCreated())
						.andReturn().getResponse().getContentAsString()
		);
	}

	public void crearBatch(Long escuelaId, List<MateriaCreateDTO> dtos) throws Exception {
		var json = objectMapper.writeValueAsString(dtos);

		mockMvc.perform(MockMvcRequestBuilders.post("/api/escuelas/" + escuelaId + "/materias/batch")
						.contentType(MediaType.APPLICATION_JSON)
						.content(json))
				.andExpect(MockMvcResultMatchers.status().isCreated());
	}

	public String actualizarMateria(Long escuelaId, Long materiaId, MateriaUpdateDTO dto) throws Throwable {
		var json = objectMapper.writeValueAsString(dto);

		return performRequest(MockMvcRequestBuilders.put("/api/escuelas/" + escuelaId + "/materias/" + materiaId)
				.contentType(MediaType.APPLICATION_JSON)
				.content(json))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andReturn().getResponse().getContentAsString();
	}

	public void eliminarMateria(Long escuelaId, Long materiaId) throws Throwable {
		performRequest(MockMvcRequestBuilders.delete("/api/escuelas/" + escuelaId + "/materias/" + materiaId))
				.andExpect(MockMvcResultMatchers.status().isNoContent());
	}

	public String listar(Long escuelaId, int page, int size) throws Throwable {
		return performRequest(MockMvcRequestBuilders.get("/api/escuelas/" + escuelaId + "/materias")
				.param("page", String.valueOf(page))
				.param("size", String.valueOf(size)))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andReturn().getResponse().getContentAsString();
	}

	public String listarNombres(Long escuelaId) throws Throwable {
		return performRequest(MockMvcRequestBuilders.get("/api/escuelas/" + escuelaId + "/materias/nombres"))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andReturn().getResponse().getContentAsString();
	}
}