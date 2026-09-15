## Etapa 1 - Esqueleto funcional del frontend

La primera etapa del frontend tuvo como objetivo construir un **esqueleto funcional y navegable del MVP** antes de conectar la aplicación con el backend o desarrollar el diseño visual definitivo.

Durante esta fase se priorizó:

* definir las páginas principales;
* establecer la navegación entre ellas;
* preparar autenticación y rutas protegidas;
* definir los tipos TypeScript necesarios;
* utilizar datos mock para comprobar los flujos;
* crear componentes UI básicos reutilizables;
* mantener una estructura sencilla que pueda ampliarse posteriormente.

El objetivo principal todavía no es el diseño final de la aplicación, sino disponer de una base funcional sobre la que integrar posteriormente los datos reales, los servicios y los distintos módulos de ejercicios.

<a id="índice"></a>
## Índice

* [Estructura general](#estructura-general)
* [Patrón utilizado para construir las páginas](#patrón-utilizado-para-construir-las-páginas)
* [Páginas básicas](#páginas-básicas)
  * [Autenticación](#autenticación)
  * [Dashboard](#dashboard)
  * [Contenido de aprendizaje](#contenido-de-aprendizaje)
    * [`LanguagesPage`](#languagespage)
    * [`CoursesPage`](#coursespage)
    * [`CoursePage`](#coursepage)
    * [`UnitsPage`](#unitspage)
    * [`ExercisesPage`](#exercisespage)
    * [`ExercisePage`](#exercisepage)
  * [Progreso](#progreso)
  * [Página 404](#página-404)
* [Routing](#routing)
* [Autenticación y rutas protegidas](#autenticación-y-rutas-protegidas)
* [Layout y navegación](#layout-y-navegación)
* [Componentes UI básicos](#componentes-ui-básicos)
* [CSS Modules y diseño inicial](#css-modules-y-diseño-inicial)
* [Estado al finalizar la primera etapa](#estado-al-finalizar-la-primera-etapa)

### Estructura general

El frontend está organizado principalmente en:

```text
src/
├── components/
│   ├── auth/
│   ├── layout/
│   └── ui/
├── context/
├── hooks/
├── mocks/
├── pages/
├── services/
├── styles/
├── types/
├── App.tsx
└── main.tsx
```

Las responsabilidades principales son:

* `pages/`: páginas asociadas a las rutas principales.
* `components/ui/`: componentes visuales básicos reutilizables.
* `components/layout/`: estructura común de la aplicación.
* `components/auth/`: formularios relacionados con autenticación.
* `context/`: estado global necesario para autenticación.
* `hooks/`: acceso reutilizable al contexto y otra lógica React.
* `types/`: tipos TypeScript utilizados por las distintas funcionalidades.
* `mocks/`: datos temporales utilizados mientras el backend no está conectado.
* `services/`: capa destinada a la comunicación futura con la API.
* `styles/`: variables y estilos globales.

[Ir al índice](#índice)

### Patrón utilizado para construir las páginas

Las páginas relacionadas con contenido se construyeron progresivamente siguiendo un patrón sencillo:

```text
Type
↓
Mock
↓
Page + CSS Module
↓
Route
↓
Navegación hacia la siguiente página
```

Cuando una funcionalidad necesita representar una entidad del dominio, primero se define un tipo TypeScript mínimo.

Por ejemplo:

```text
Language
Course
Unit
Exercise
```

Después se crean datos mock que permiten desarrollar y probar la página sin depender todavía del backend.

La página utiliza esos datos para comprobar:

* renderizado;
* filtrado;
* parámetros de URL;
* navegación;
* estados básicos;
* relaciones entre entidades.

Los mocks son temporales y serán sustituidos por datos obtenidos mediante la capa de servicios cuando el frontend se conecte con la API.

[Ir al índice](#índice)

### Páginas básicas

Durante esta etapa se creó el esqueleto de las páginas principales del MVP.

#### Autenticación

```text
LoginPage
RegisterPage
```

Ambas utilizan formularios separados dentro de `components/auth/`.

Los formularios reutilizan componentes básicos como:

```text
Input
Button
Card
Alert
Loader
```

Actualmente la autenticación utiliza un comportamiento mock mientras no está conectado el backend.

[Ir al índice](#índice)

#### Dashboard

```text
DashboardPage
```

Es la pantalla principal del usuario autenticado.

Actualmente muestra información mock sobre:

* curso activo;
* progreso general;
* unidades completadas;
* ejercicios realizados;
* racha de estudio.

Estos datos permiten definir la estructura inicial del Dashboard sin implementar todavía el sistema real de seguimiento.

[Ir al índice](#índice)

#### Contenido de aprendizaje

La navegación principal sigue la jerarquía:

```text
LanguagesPage
→ CoursesPage
→ CoursePage
→ UnitsPage o ExercisesPage
→ ExercisePage
```

##### `LanguagesPage`

Muestra los idiomas disponibles y permite acceder a los cursos correspondientes a cada idioma.

Utiliza el tipo `Language` y datos mock de idiomas.

[Ir al índice](#índice)

##### `CoursesPage`

Lee `languageId` desde la URL y muestra únicamente los cursos pertenecientes al idioma seleccionado.

Utiliza el tipo `Course`.

Los cursos pueden tener dos estructuras:

```text
units
```

o:

```text
exercises
```

Esto permite representar tanto cursos estructurados por unidades como cursos temáticos que llevan directamente a ejercicios.

[Ir al índice](#índice)

##### `CoursePage`

Representa el detalle de un curso concreto.

Recibe:

```text
languageId
courseId
```

desde la URL y comprueba que el curso pertenece al idioma indicado.

También determina el siguiente nivel de navegación:

```text
structure === "units"
→ UnitsPage
```

o:

```text
structure === "exercises"
→ ExercisesPage
```

[Ir al índice](#índice)

##### `UnitsPage`

Muestra las unidades correspondientes a un curso.

Utiliza el tipo `Unit`, que incluye información básica como:

* identificador;
* curso;
* orden;
* título;
* descripción;
* número de ejercicios;
* estado temporal.

Los estados utilizados durante esta fase son mock y sirven únicamente para representar visualmente situaciones como:

```text
available
in-progress
completed
```

El cálculo real del progreso se realizará posteriormente.

[Ir al índice](#índice)

##### `ExercisesPage`

Muestra los ejercicios disponibles.

La misma página puede funcionar en dos contextos:

```text
Course
→ Unit
→ Exercises
```

o:

```text
Course
→ Exercises
```

El tipo `Exercise` permite que `unitId` sea opcional para representar ambos casos.

La página filtra los ejercicios según los parámetros recibidos en la URL y prepara la navegación hacia un ejercicio concreto.

[Ir al índice](#índice)

##### `ExercisePage`

Representa la página de un ejercicio individual.

En esta primera etapa todavía no implementa la lógica interactiva de cada tipo de ejercicio.

Su función es comprobar que puede:

* localizar correctamente el ejercicio;
* mantener el contexto de idioma, curso y unidad cuando corresponda;
* identificar el tipo de ejercicio;
* reservar el espacio donde posteriormente se cargará el módulo interactivo.

Los tipos concretos de ejercicios se desarrollarán en una etapa posterior.

[Ir al índice](#índice)

#### Progreso

```text
ProgressPage
```

Muestra un resumen básico del progreso del usuario utilizando actualmente los mismos datos mock empleados durante la construcción del Dashboard.

La implementación real del cálculo y consulta del progreso se realizará cuando esta funcionalidad se conecte con el backend.

[Ir al índice](#índice)

#### Página 404

```text
NotFoundPage
```

La ruta comodín `*` muestra una página sencilla cuando la URL solicitada no existe.

Si el usuario está autenticado, permite volver al Dashboard. Si no lo está, permite regresar al Login.

[Ir al índice](#índice)

### Routing

Las rutas principales se centralizan en `App.tsx`.

La estructura actual permite mantener visible en la URL la relación entre idioma y curso.

Ejemplos:

```text
/languages

/languages/:languageId/courses

/languages/:languageId/courses/:courseId

/languages/:languageId/courses/:courseId/units

/languages/:languageId/courses/:courseId/units/:unitId/exercises

/languages/:languageId/courses/:courseId/units/:unitId/exercises/:exerciseId
```

Los cursos que no utilizan unidades siguen una ruta más corta:

```text
/languages/:languageId/courses/:courseId/exercises

/languages/:languageId/courses/:courseId/exercises/:exerciseId
```

También existen rutas independientes para:

```text
/dashboard
/progress
/login
/register
```

[Ir al índice](#índice)

### Autenticación y rutas protegidas

La autenticación se gestiona mediante:

```text
AuthContext
AuthProvider
useAuth
ProtectedRoute
```

`AuthProvider` mantiene actualmente el usuario autenticado mediante estado de React:

```text
user
```

A partir de este valor también se obtiene:

```text
isAuthenticated
```

El hook `useAuth` permite que los componentes accedan de forma sencilla al estado y a las acciones:

```text
login
register
logout
```

Durante esta etapa, `login` y `register` utilizan datos mock.

El flujo básico es:

```text
LoginForm
↓
login()
↓
AuthProvider actualiza user
↓
isAuthenticated = true
↓
navegación a Dashboard
```

Al cerrar sesión:

```text
logout()
↓
user = null
↓
navegación a /login
```

Las páginas privadas utilizan `ProtectedRoute`.

Si el usuario no está autenticado:

```text
ProtectedRoute
↓
Navigate
↓
/login
```

Por ahora la sesión existe únicamente en memoria. Si se recarga directamente una ruta protegida, el estado del `AuthProvider` vuelve a su valor inicial y el usuario es enviado a `/login`.

Este comportamiento es temporal y se sustituirá por la restauración de sesión correspondiente cuando se implemente la autenticación real con el backend y JWT.

[Ir al índice](#índice)

### Layout y navegación

La estructura general se comparte mediante:

```text
AppLayout
├── NavBar
└── PageContainer
```

`AppLayout` evita repetir la estructura principal en cada página.

`NavBar` adapta su contenido dependiendo del estado de autenticación.

Para un usuario autenticado permite acceder principalmente a:

```text
Dashboard
Idiomas
Progreso
Logout
```

Las páginas de cursos, unidades y ejercicios no se incluyen como enlaces principales porque forman parte de la navegación interna del contenido.

[Ir al índice](#índice)

### Componentes UI básicos

Durante esta primera etapa se crearon algunos componentes reutilizables de propósito general:

```text
Button
Input
Card
Alert
Loader
```

Estos componentes permiten mantener una interfaz consistente sin introducir todavía una librería externa de UI.

Los componentes específicos del dominio, como:

```text
LanguageCard
UnitCard
ExerciseCard
ProgressBar
StatCard
```

no se han extraído todavía de forma generalizada.

Se crearán cuando exista una necesidad real de reutilización, evitando añadir abstracciones prematuramente.

[Ir al índice](#índice)

### CSS Modules y diseño inicial

Cada página y componente utiliza su propio archivo:

```text
Component.tsx
Component.module.css
```

Los estilos actuales son deliberadamente básicos.

Durante esta etapa se busca principalmente:

* una estructura legible;
* separación visual suficiente;
* comportamiento básico responsive;
* formularios y tarjetas utilizables;
* navegación clara.

No se pretende todavía establecer el diseño visual definitivo.

Los colores, tipografía, espaciados, estados interactivos e identidad visual se revisarán en una fase posterior.

Los valores compartidos, como colores provisionales, espaciados, ancho máximo y radios de borde, se mantienen en:

```text
styles/variables.css
```

Esto permite modificar posteriormente la apariencia general sin tener que reestructurar los componentes.

[Ir al índice](#índice)

### Estado al finalizar la primera etapa

Al finalizar esta etapa existe un flujo navegable básico:

```text
Login / Register
        ↓
    Dashboard
        ↓
    Languages
        ↓
     Courses
        ↓
      Course
      ↙    ↘
   Units   Exercises
      ↓        ↓
 Exercises   Exercise
      ↓
  Exercise
```

Además, el usuario puede acceder desde la navegación principal a:

```text
ProgressPage
```

y las rutas inexistentes son gestionadas mediante:

```text
NotFoundPage
```

La aplicación dispone así de un **esqueleto completo del frontend del MVP**, todavía basado en datos mock y preparado para continuar con la creación de componentes reutilizables, servicios, integración con el backend y módulos reales de ejercicios.

[Ir al índice](#índice)
