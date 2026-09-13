# Justificación de requisitos

Este documento sirve como guía para registrar cómo se da cumplimiento a los requisitos definidos por la escuela para el proyecto FullStack.

## Requisitos generales del proyecto

### Proyecto FullStack con sentido y utilidad

El proyecto debe utilizar los conocimientos adquiridos durante el curso para desarrollar una aplicación FullStack que tenga un propósito definido y resuelva un problema o necesidad concreta.

**Elementos evaluables:**

* El proyecto debe tener un sentido lógico.
* Debe resolver un problema o necesidad concreta.
* Debe estar dirigido a un público objetivo definido.
* Las decisiones funcionales y técnicas deben responder al propósito del proyecto.

**Cumplimiento:**

**Evidencia:**

### Tecnologías principales

El proyecto debe utilizar las tecnologías establecidas por la escuela:

* Node.js para el backend.
* React para el frontend.

Las librerías adicionales son opcionales y pueden seleccionarse según las necesidades del proyecto.

**Cumplimiento:**

**Evidencia:**

---

## Requisitos según el enunciado

### 1. Variables en `style.css` de colores, spacings, etc.

**Elementos evaluables:**

* Definición centralizada de valores reutilizables de estilos.
* Variables para colores utilizados de forma recurrente.
* Variables para espaciados.
* Posibilidad de incluir otras variables reutilizables necesarias para mantener consistencia visual.

**Cumplimiento:**

**Evidencia:**

---

### 2. Reutilización correcta de CSS y buena estructura de los mismos (en caso de utilizar CSS)

**Elementos evaluables:**

* Evitar duplicación innecesaria de estilos.
* Organización clara de los archivos CSS.
* Separación adecuada entre estilos globales y estilos específicos de componentes.
* Reutilización de valores y reglas comunes.
* Estructura comprensible y mantenible.

**Cumplimiento:**

**Evidencia:**

---

### 3. Mínimo deberá haber dos colecciones relacionadas aparte de la colección de los usuarios

**Elementos evaluables:**

* Existencia de una colección de usuarios.
* Existencia de al menos dos colecciones adicionales.
* Las colecciones adicionales deben estar relacionadas entre sí.
* Las relaciones deben utilizar datos o identificadores que permitan vincular los documentos correspondientes.
* Los modelos de las colecciones deben estar definidos en el backend antes de realizar la carga de datos.

**Cumplimiento:**

**Evidencia:**

---

### 4. Buena arquitectura en React

**Elementos evaluables:**

* Estructura de carpetas y archivos clara.
* Separación lógica de responsabilidades.
* Código organizado de forma que pueda ser comprendido por una persona que no conozca previamente el proyecto.
* Separación adecuada de componentes, lógica, tipos, servicios u otras responsabilidades cuando corresponda.
* Arquitectura preparada para mantener y ampliar la aplicación.

**Cumplimiento:**

**Evidencia:**

---

### 5. Buena UX/UI

**Elementos evaluables:**

* La aplicación debe tener un funcionamiento y navegación coherentes.
* La interfaz debe responder al propósito del proyecto.
* El diseño debe estar adaptado al público objetivo definido.
* Las decisiones de interfaz e interacción deben tener una justificación funcional.
* La experiencia de usuario debe facilitar la realización de las tareas principales de la aplicación.

**Cumplimiento:**

**Evidencia:**

---

### 6. Mejores prácticas en cuanto a componentización y reutilización

**Elementos evaluables:**

* Creación de componentes reutilizables cuando exista funcionalidad o estructura común.
* Evitar duplicación innecesaria de componentes.
* Separación adecuada de componentes según sus responsabilidades.
* Uso de propiedades (`props`) para adaptar componentes reutilizables a diferentes contextos.
* Componentes organizados de forma clara y mantenible.

**Cumplimiento:**

**Evidencia:**

---

### 7. Se genera la BBDD a partir del Excel de datos

**Elementos evaluables:**

* Creación inicial de un Excel con un mínimo de 100 datos.
* Los datos deben corresponder a las colecciones necesarias para el proyecto.
* El Excel debe poder descargarse o exportarse como CSV.
* Uso de lectura/escritura de archivos de Node.js mediante `fs` para obtener los datos del archivo.
* Creación de una o varias semillas para insertar los datos en la base de datos.
* Los modelos correspondientes deben existir antes de ejecutar las semillas.
* La información importada debe mantener correctamente las relaciones necesarias entre las colecciones.

**Cumplimiento:**

**Evidencia:**

---

### 8. Se utilizan Hooks avanzados en React para funcionalidades concretas y necesarias

**Elementos evaluables:**

* Uso de Hooks de React para resolver funcionalidades reales de la aplicación.
* Los Hooks utilizados deben responder a una necesidad concreta y no incluirse únicamente para cumplir el requisito.
* El uso de Hooks debe contribuir a una correcta gestión del estado, efectos, contexto u otra lógica de React según las necesidades del proyecto.

**Cumplimiento:**

**Evidencia:**

---

## Otros requisitos obligatorios indicados en la descripción

### Colección de usuarios y control de acceso

El backend debe incluir una colección de usuarios independientemente de la temática elegida.

**Elementos evaluables:**

* Existencia de una colección de usuarios.
* Posibilidad de identificar si un usuario está autenticado.
* Existencia de rutas cuyo acceso dependa de que el usuario esté autenticado.
* Cuando el proyecto utilice roles, posibilidad de limitar determinadas rutas según el rol del usuario.

**Cumplimiento:**

**Evidencia:**

---

### README del proyecto

Se debe crear documentación que explique detalladamente el sentido del proyecto.

**Elementos evaluables:**

* Explicación del propósito del proyecto.
* Problema o necesidad que pretende resolver.
* Público al que está dirigido.
* Explicación suficiente para comprender el sentido general de la aplicación.

**Cumplimiento:**

**Evidencia:**

---

### Despliegue del backend y frontend

Tanto el backend como el frontend deben estar desplegados.

**Elementos evaluables:**

* Backend desplegado y accesible.
* Frontend desplegado y accesible.
* Los enlaces de despliegue deben poder localizarse a partir de los repositorios de GitHub.

**Cumplimiento:**

**Evidencia:**

---

## Elementos opcionales puntuables

Los siguientes elementos no son requisitos obligatorios, pero el enunciado indica expresamente que pueden valorarse positivamente.

### Uso de librerías no vistas durante el curso

Se valorará positivamente la utilización justificada de librerías que no hayan sido explicadas durante el curso.

**Implementación:**

**Evidencia:**

### Cloudinary y subida de archivos desde el frontend

El uso de Cloudinary es opcional y puntuable.

Su implementación puede requerir investigar la subida de archivos desde el frontend mediante `FormData`.

**Implementación:**

**Evidencia:**
