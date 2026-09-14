## Plan inicial del frontend

El frontend se desarrollará con **React + TypeScript + Vite** y utilizará **CSS Modules con CSS estándar**, sin librerías de componentes UI en la fase inicial.

La interfaz se construirá a partir de componentes reutilizables y escalables, priorizando primero los elementos necesarios para el MVP. Se prevén componentes base como botones, inputs, tarjetas, navegación, barras de progreso, búsqueda, mensajes de estado y contenedores de página.

Los componentes específicos del dominio, como tarjetas de idiomas, unidades, ejercicios y paneles de seguimiento, se crearán a medida que se implementen las funcionalidades correspondientes.

La estructura se ampliará progresivamente, evitando crear componentes o abstracciones antes de que exista una necesidad real de reutilización.


Las notas de desarrollo del backend están en el repo del [backend](https://github.com/candytale55/fullstack-project-backend/blob/main/docs/notas_desarrollo.md) y también contienen alguna información para el front.

## Arquitectura de navegación de contenidos

El frontend seguirá una jerarquía flexible para organizar los contenidos de aprendizaje:

```text
Language
└── Course
    ├── Units
    │   └── Exercises
    │
    └── Exercises
```

Un idioma puede tener varios cursos. Cada curso puede organizarse de dos formas:

* **Curso estructurado por unidades**, por ejemplo un curso académico de nivel B2 con varias unidades, y cada unidad con sus propios ejercicios.
* **Curso directo a ejercicios**, por ejemplo un curso temático de Portugués de Negocios sin necesidad de dividirse en unidades.

Para mantener el MVP sencillo, cada curso utilizará una sola estructura: **o bien unidades que contienen ejercicios, o bien ejercicios directamente**.

Las páginas principales seguirán esta separación:

```text
LanguagesPage
→ CoursesPage
→ CoursePage
→ UnitsPage o ExercisesPage
→ ExercisePage
```

`LanguagesPage` y `CoursesPage` muestran listados, mientras que `CoursePage` representa el detalle de un curso concreto y determina si el siguiente nivel de navegación son unidades o ejercicios.

