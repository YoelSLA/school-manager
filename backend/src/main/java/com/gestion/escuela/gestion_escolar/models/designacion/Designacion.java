package com.gestion.escuela.gestion_escolar.models.designacion;

import com.gestion.escuela.gestion_escolar.models.*;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionProvisional;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionSuplente;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.domainServices.CalendarioEscolar;
import com.gestion.escuela.gestion_escolar.models.domainServices.PoliticaDeCobertura;
import com.gestion.escuela.gestion_escolar.models.domainServices.PoliticaDeRenovacion;
import com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;
import com.gestion.escuela.gestion_escolar.models.exceptions.franjaHoraria.RangoHorarioInvalidoException;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.Getter;

@Entity
@Table(
    name = "designacion",
    uniqueConstraints = {@UniqueConstraint(columnNames = {"escuela_id", "cupof"})})
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
public abstract class Designacion {

  @ElementCollection
  @CollectionTable(name = "franja_horaria", joinColumns = @JoinColumn(name = "designacion_id"))
  private Set<FranjaHoraria> franjasHorarias;

  @OneToMany(mappedBy = "designacion", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Asignacion> asignaciones;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private Integer cupof;

  @ManyToOne(optional = false)
  @JoinColumn(name = "escuela_id", nullable = false)
  private Escuela escuela;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private RolEducativo rolEducativo;

  // =========================================================
  // Constructor
  // =========================================================
  protected Designacion() {
    this.asignaciones = new ArrayList<>();
    this.franjasHorarias = new HashSet<>();
  }

  protected Designacion(Escuela escuela, Integer cupof, RolEducativo rolEducativo) {
    Validaciones.noNulo(escuela, "escuela");
    Validaciones.noNulo(cupof, "cupof");
    Validaciones.noNulo(rolEducativo, "rol educativo");

    this.escuela = escuela;
    this.cupof = cupof;
    this.rolEducativo = rolEducativo;
    this.asignaciones = new ArrayList<>();
    this.franjasHorarias = new HashSet<>();
  }

  // =========================================================
  // Gestión de Franjas Horarias
  // =========================================================
  /**
   * Agrega una nueva franja horaria a la designación.
   *
   * <p>La franja no debe superponerse con ninguna de las ya registradas. En caso de detectarse un
   * solapamiento se lanza una excepción.
   *
   * @param nueva franja horaria a agregar.
   * @throws RangoHorarioInvalidoException si existe superposición horaria.
   */
  public void agregarFranjaHoraria(FranjaHoraria nueva) {
    this.validarAgregarFranjaHoraria(nueva);
    franjasHorarias.add(nueva);
  }

  /**
   * Reemplaza todas las franjas horarias de la designación.
   *
   * <p>Las franjas existentes son eliminadas y las nuevas son validadas individualmente antes de
   * agregarse.
   *
   * @param nuevasFranjas conjunto de franjas horarias a establecer.
   */
  public void setFranjasHorarias(Set<FranjaHoraria> nuevasFranjas) {
    Validaciones.noNulo(nuevasFranjas, "franjas horarias");
    this.franjasHorarias.clear();
    nuevasFranjas.forEach(this::agregarFranjaHoraria);
  }

  /**
   * Indica si la designación tiene actividad laboral en la fecha indicada.
   *
   * @param fecha fecha a consultar.
   * @return {@code true} si existe una franja horaria para el día correspondiente y éste es
   *     laborable; {@code false} en caso contrario.
   */
  public boolean trabajaElDia(LocalDate fecha) {

    if (fecha == null) {
      return false;
    }

    DiaDeSemana dia = DiaDeSemana.from(fecha);

    return dia.esLaborable() && franjasHorarias.stream().anyMatch(f -> f.getDia().equals(dia));
  }

  /**
   * Verifica si alguna asignación de la designación se superpone con el período indicado.
   *
   * @param periodo período a evaluar.
   * @return {@code true} si existe al menos una superposición.
   */
  public boolean tieneAsignacionQueSeSuperponeCon(Periodo periodo) {
    return this.asignaciones.stream().anyMatch(a -> a.seSuperponeCon(periodo));
  }

  // =========================================================
  // Cobertura
  // =========================================================
  /**
   * Crea una nueva asignación titular y la registra en la designación.
   *
   * <p>Se asume que todas las reglas de negocio fueron validadas previamente por el servicio de
   * aplicación.
   *
   * @param empleado empleado que tomará posesión del cargo.
   * @param fechaTomaPosesion fecha de inicio de la cobertura.
   * @param secuencia número de secuencia de la asignación.
   * @return la asignación titular creada.
   */
  public AsignacionTitular registrarTitular(
      EmpleadoEducativo empleado, LocalDate fechaTomaPosesion, Integer secuencia) {
    Validaciones.noNulo(empleado, "empleado");
    Validaciones.noNulo(fechaTomaPosesion, "fecha toma de posesión");
    Validaciones.noNulo(secuencia, "secuencia");

    AsignacionTitular asignacion =
        AsignacionTitular.builder()
            .empleadoEducativo(empleado)
            .designacion(this)
            .periodo(Periodo.abierto(fechaTomaPosesion))
            .secuencia(secuencia)
            .build();

    agregarAsignacion(asignacion);

    return asignacion;
  }

  /**
   * Genera una cobertura provisional automática para la designación.
   *
   * @param empleado empleadoEducativoBasico asignado.
   * @param fechaInicio fecha de inicio.
   * @param secuencia número de secuencia.
   * @return la asignación provisional creada.
   */
  public AsignacionProvisional cubrirConProvisionalAutomatico(
      EmpleadoEducativo empleado, LocalDate fechaInicio, Integer secuencia) {
    Periodo periodo = CalendarioEscolar.periodoProvisionalAutomaticoDesde(fechaInicio);

    PoliticaDeCobertura.validarCubrirConProvisionalAutomatico(this, empleado, fechaInicio, periodo);

    AsignacionProvisional asignacion =
        AsignacionProvisional.builder()
            .empleadoEducativo(empleado)
            .designacion(this)
            .periodo(periodo)
            .secuencia(secuencia)
            .build();

    this.agregarAsignacion(asignacion);

    return asignacion;
  }

  /**
   * Genera una cobertura provisional manual para la designación.
   *
   * @param empleado empleadoEducativoBasico asignado.
   * @param periodo período de vigencia.
   * @param secuencia número de secuencia.
   * @return la asignación provisional creada.
   */
  public AsignacionProvisional cubrirConProvisionalManual(
      EmpleadoEducativo empleado, Periodo periodo, Integer secuencia) {
    PoliticaDeCobertura.validarCubrirConProvisionalManual(this, empleado, periodo);

    AsignacionProvisional asignacion =
        AsignacionProvisional.builder()
            .empleadoEducativo(empleado)
            .designacion(this)
            .periodo(periodo)
            .secuencia(secuencia)
            .build();

    this.agregarAsignacion(asignacion);
    return asignacion;
  }

  /**
   * Genera una cobertura suplente para una licencia existente.
   *
   * @param licencia licencia que origina la vacante.
   * @param suplente empleadoEducativoBasico suplente.
   * @param fechaInicio fecha de toma de posesión.
   * @param secuencia número de secuencia.
   * @return la asignación suplente creada.
   */
  public AsignacionSuplente registrarSuplente(
      Licencia licencia, EmpleadoEducativo suplente, LocalDate fechaInicio, Integer secuencia) {

    Periodo periodo = Periodo.cerrado(fechaInicio, licencia.getPeriodo().getFechaHasta());

    AsignacionSuplente asignacion =
        AsignacionSuplente.builder()
            .empleadoEducativo(suplente)
            .designacion(this)
            .periodo(periodo)
            .licencia(licencia)
            .secuencia(secuencia)
            .build();

    this.agregarAsignacion(asignacion);

    return asignacion;
  }

  // =========================================================
  // Renovaciones
  // =========================================================
  /**
   * Renueva automáticamente una asignación provisional.
   *
   * @param asignacionAnterior asignación a renovar.
   * @param secuencia número de secuencia.
   * @return la nueva asignación provisional.
   */
  public AsignacionProvisional renovarProvisionalAutomatica(
      AsignacionProvisional asignacionAnterior, Integer secuencia) {
    Validaciones.noNulo(asignacionAnterior, "asignación anterior");

    LocalDate desde =
        CalendarioEscolar.inicioCicloLectivoSiguiente(
            asignacionAnterior.getPeriodo().getFechaHasta());
    Periodo nuevoPeriodo = CalendarioEscolar.periodoProvisionalAutomaticoDesde(desde);
    PoliticaDeRenovacion.validarReglaCicloLectivo(nuevoPeriodo);

    AsignacionProvisional nuevaAsignacion =
        AsignacionProvisional.builder()
            .empleadoEducativo(asignacionAnterior.getEmpleadoEducativo())
            .designacion(this)
            .periodo(nuevoPeriodo)
            .secuencia(secuencia)
            .build();

    this.agregarAsignacion(nuevaAsignacion);

    return nuevaAsignacion;
  }

  /**
   * Renueva una asignación provisional a partir del ciclo lectivo de marzo.
   *
   * @param asignacionAnterior asignación a renovar.
   * @param fechaHasta fecha de finalización de la renovación.
   * @param secuencia número de secuencia.
   * @return la nueva asignación provisional.
   */
  public AsignacionProvisional renovarProvisionalDesdeMarzo(
      AsignacionProvisional asignacionAnterior, LocalDate fechaHasta, Integer secuencia) {
    PoliticaDeRenovacion.validarRenovarProvisionalDesdeMarzo(asignacionAnterior, fechaHasta);

    LocalDate desde =
        CalendarioEscolar.inicioCicloLectivoSiguiente(
            asignacionAnterior.getPeriodo().getFechaHasta());

    Periodo nuevoPeriodo = Periodo.cerrado(desde, fechaHasta);

    PoliticaDeRenovacion.validarReglaCicloLectivo(nuevoPeriodo);

    AsignacionProvisional asignacion =
        AsignacionProvisional.builder()
            .empleadoEducativo(asignacionAnterior.getEmpleadoEducativo())
            .designacion(this)
            .periodo(nuevoPeriodo)
            .secuencia(secuencia)
            .build();

    this.agregarAsignacion(asignacion);
    return asignacion;
  }

  /**
   * Renueva manualmente una asignación provisional.
   *
   * @param asignacionAnterior asignación a renovar.
   * @param nuevoPeriodo nuevo período de vigencia.
   * @param secuencia número de secuencia.
   * @return la nueva asignación provisional.
   */
  public AsignacionProvisional renovarProvisionalManual(
      AsignacionProvisional asignacionAnterior, Periodo nuevoPeriodo, Integer secuencia) {
    PoliticaDeRenovacion.validarRenovarProvisionalManual(asignacionAnterior, nuevoPeriodo);

    AsignacionProvisional asignacion =
        AsignacionProvisional.builder()
            .empleadoEducativo(asignacionAnterior.getEmpleadoEducativo())
            .designacion(this)
            .periodo(nuevoPeriodo)
            .secuencia(secuencia)
            .build();

    this.agregarAsignacion(asignacion);
    return asignacion;
  }

  // =========================================================
  // Gestión Institucional
  // =========================================================
  /**
   * Modifica la escuela asociada a la designación.
   *
   * @param escuela nueva escuela.
   */
  public void setEscuela(Escuela escuela) {
    Validaciones.noNulo(escuela, "escuela");
    this.escuela = escuela;
  }

  /**
   * Modifica el cupof de la designación.
   *
   * @param cupof nuevo cupof.
   */
  public void setCupof(Integer cupof) {
    Validaciones.noNulo(cupof, "cupof");
    this.cupof = cupof;
  }

  /**
   * Modifica el rol educativo de la designación.
   *
   * @param rolEducativo nuevo rol educativo.
   */
  public void setRolEducativo(RolEducativo rolEducativo) {
    Validaciones.noNulo(rolEducativo, "rol educativo");
    this.rolEducativo = rolEducativo;
  }

  // =========================================================
  // Infraestructura / Utilitarios
  // =========================================================
  @Override
  public String toString() {
    return getClass().getSimpleName()
        + "{ "
        + "id = "
        + id
        + ", cupof = "
        + cupof
        + ", escuela  = "
        + (escuela != null ? escuela : null)
        + ", rolEducativo = "
        + rolEducativo
        + ", asignacion = "
        + asignaciones.size()
        + " }";
  }

  private void agregarAsignacion(Asignacion asignacion) {
    Validaciones.noNulo(asignacion, "asignación");

    if (!asignaciones.contains(asignacion)) {
      asignaciones.add(asignacion);
    }
  }

  private void validarAgregarFranjaHoraria(FranjaHoraria nueva) {
    Validaciones.noNulo(nueva, "franja horaria");
    boolean haySolapamiento = franjasHorarias.stream().anyMatch(f -> f.seSuperponeCon(nueva));

    if (haySolapamiento) {
      throw new RangoHorarioInvalidoException(nueva.getHoraDesde(), nueva.getHoraHasta());
    }
  }

  public int cantidadFranjasHorarias() {
    return franjasHorarias.size();
  }
}
