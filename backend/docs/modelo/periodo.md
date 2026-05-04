# 📦 Periodo

Este documento describe el comportamiento del agregado **Periodo** basado en su suite de tests.

---

## 🧾 1. Creación de período

- Se crea un período cerrado con fechas válidas.
- Se crea un período abierto sin fecha de fin.
- No se puede crear un período sin fecha de inicio.
- No se puede crear un período con fechas inválidas.

---

## 🧾 2. Estado del período

- El período es cerrado cuando tiene fecha de fin.
- El período es abierto cuando no tiene fecha de fin.

---

## 🧾 3. Vigencia del período

- La fecha está vigente dentro del período cerrado.
- La fecha no está vigente fuera del período.
- Una fecha futura es vigente si el período está abierto.
- Una fecha anterior al inicio no está vigente en un período cerrado.
- La fecha de inicio es considerada vigente.
- La fecha de fin es considerada vigente.
- Una fecha null no está vigente en el período.

---

## 🧾 4. Superposición de períodos

- Los períodos se superponen cuando tienen fechas en común.
- Los períodos no se superponen cuando no comparten fechas.
- Los períodos no se superponen cuando uno comienza después del otro.
- Un período no se superpone con null.
- Los períodos se superponen cuando coinciden en el límite.
- Un período abierto se superpone con uno cerrado.
- Un período cerrado se superpone con uno abierto.
- Dos períodos abiertos siempre se superponen.

---

## 🧾 5. Cálculo de días

- El período cerrado cuenta los días incluyendo ambos extremos.
- Un período cerrado de un solo día devuelve 1.
- No se pueden calcular días en un período abierto.

---

## 🧾 6. Representación textual del período

- Un período cerrado muestra ambas fechas.
- Un período abierto indica que no tiene fin.

---

## 🧾 7. Cierre del período

- Un período abierto se puede cerrar con una fecha válida.
- No se puede cerrar un período abierto sin fecha de cierre.
- No se puede cerrar un período con una fecha anterior al inicio.
- Cerrar un período no modifica el período original.
- No se puede cerrar un período que ya está cerrado.