# Reglas de vocabulario y etiquetas

## Objetivo

El vocabulario constituye el conjunto principal de datos educativos de la aplicación y servirá como base para alimentar cursos, unidades y, posteriormente, ejercicios.

La colección de vocabulario será única para todos los idiomas. Cada elemento quedará relacionado con un curso y, cuando corresponda, con una unidad concreta.

La carga inicial principal se realizará a partir de un archivo Excel exportado a CSV. Este archivo contendrá al menos 100 registros y será procesado mediante un seed de Node.js.

---

## Estructura general

La relación principal será:

```text
Language
└── Course
    ├── Unit
    │   └── VocabularyItem
    │
    └── VocabularyItem
````

El idioma no se almacenará directamente en cada elemento de vocabulario porque puede obtenerse mediante la relación:

```text
VocabularyItem
→ Course
→ Language
```

Un elemento de vocabulario podrá pertenecer directamente a un curso o a una unidad concreta del curso.

---

## Campos del vocabulario

La estructura inicial de `VocabularyItem` será:

```ts
VocabularyItem {
    course: ObjectId
    unitId?: ObjectId

    term: string
    level?: string
    partOfSpeech?: string

    definition: string
    clozeExample?: string

    tags: string[]
    curriculumTags: string[]
}
```

### `course`

Referencia al curso al que pertenece el elemento de vocabulario.

Es obligatorio.

Ejemplo conceptual:

```text
English C1
Portuguese B1
```

En MongoDB se almacenará el `ObjectId` correspondiente.

---

### `unitId`

Referencia opcional al `_id` de una unidad embebida dentro del curso.

Se utilizará cuando el vocabulario pertenezca a una unidad concreta.

Si el vocabulario pertenece directamente al curso, este campo puede quedar vacío.

---

### `term`

Palabra, expresión, phrasal verb o forma léxica que se está estudiando.

Ejemplos:

```text
foreigner
absent-minded
carry on
out of the blue
```

Este campo será obligatorio.

---

### `level`

Nivel aproximado del elemento cuando exista esta información.

Ejemplos:

```text
B2
C1
C2
```

Será opcional porque no todos los registros originales contienen necesariamente un nivel explícito.

---

### `partOfSpeech`

Categoría gramatical abreviada.

Se conservarán las abreviaturas utilizadas actualmente en el sistema de creación de vocabulario:

```text
n
v
adj
adv
phr v
idiom
prep
expr
conj
```

---

### `definition`

Definición correspondiente al significado estudiado.

Debe reflejar el uso concreto de la palabra o expresión y no necesariamente todos sus posibles significados.

Será un campo obligatorio.

---

### `clozeExample`

Ejemplo contextual en el que el término aparece oculto parcialmente.

Ejemplo:

```text
A French person living in England is a f_________.
```

Este campo permitirá reutilizar directamente el vocabulario para determinados tipos de ejercicios, especialmente ejercicios de completar.

Será opcional porque algunos registros pueden no disponer inicialmente de este tipo de ejemplo.

---

## Sistema de etiquetas

Las etiquetas se dividirán en dos grupos porque cumplen funciones diferentes:

```text
tags[]
curriculumTags[]
```

No deben mezclarse.

---

## `tags`

Contiene etiquetas semánticas, contextuales o pedagógicas.

Sirven para describir el vocabulario y permitir búsquedas, agrupaciones o selección de contenido para futuros ejercicios.

Ejemplos:

```text
identity
nationality
emotion
embarrassment
body-language
personal-care
physical-strength
words-easily-confused
```

### Reglas para `tags`

Las etiquetas nuevas se almacenarán preferentemente en:

```text
lowercase
```

y se utilizará `kebab-case` cuando tengan más de una palabra:

```text
body-language
personal-care
words-easily-confused
```

Se intentarán reutilizar las etiquetas existentes antes de crear otras nuevas.

Ejemplo:

```text
emotion
```

debe reutilizarse en lugar de crear variantes innecesarias como:

```text
emotions
emotional-state
feelings
```

El objetivo habitual será utilizar pocas etiquetas relevantes por entrada, aproximadamente entre 2 y 5 cuando sea posible.

Las etiquetas no deben limitarse a repetir el propio término.

Por ejemplo:

```text
term: abruptly
```

no necesita:

```text
tags: ["abruptly"]
```

porque esa información ya está disponible en `term`.

---

## Etiquetas pedagógicas

Algunas etiquetas no describen estrictamente un tema, pero tienen utilidad para la generación de actividades.

Estas etiquetas también pertenecerán a `tags[]`.

Ejemplo:

```text
words-easily-confused
```

Puede utilizarse para relacionar palabras como:

```text
foreigner
stranger
outsider
immigrant
emigrant
migrant
```

y permitir posteriormente seleccionar distractores más relevantes para ejercicios de opción múltiple o comparación.

---

## Prefijos de idioma existentes en Anki

Actualmente existen etiquetas como:

```text
EN-Games
EN-Personal-Care

PT-Comer
PT-Comercio
PT-Conversas
```

Estas etiquetas son útiles dentro de Anki porque distintos idiomas conviven dentro del mismo sistema.

En la base de datos del proyecto no será necesario guardar el idioma dentro de la etiqueta, porque este ya se obtiene mediante:

```text
VocabularyItem
→ Course
→ Language
```

Durante la importación podrán normalizarse, por ejemplo:

```text
EN-Games
→ games

EN-Personal-Care
→ personal-care
```

Las etiquetas originales de Anki no necesitan modificarse; esta normalización se aplicará únicamente a los datos importados al proyecto.

---

## `curriculumTags`

Contiene referencias al origen curricular o al material concreto donde se trabajó el vocabulario.

Ejemplos existentes:

```text
C1::01A:Ang-Lee
C1::01A:Family
C1::01B:Skyscanner
C1::02B:Perspective
C1::07F:Mona-Lisa-Theft
C1::10B:No-Direction-Home
C1::CE1:Work-and-Family
```

Estas etiquetas indican procedencia y organización, no significado.

Por ello se almacenarán separadas de las etiquetas semánticas.

Ejemplo:

```ts
{
    term: "foreigner",

    tags: [
        "identity",
        "nationality",
        "words-easily-confused"
    ],

    curriculumTags: [
        "C1::10B:No-Direction-Home"
    ]
}
```

---

## Relación entre etiquetas curriculares y Course/Unit

Las etiquetas curriculares no sustituyen las relaciones MongoDB.

Un elemento seguirá almacenando:

```ts
course: ObjectId
unitId?: ObjectId
```

mientras que:

```ts
curriculumTags: string[]
```

permitirá conservar la referencia original del material.

Durante el seed, una referencia como:

```text
C1::10B:No-Direction-Home
```

podrá utilizarse para localizar el curso o unidad correspondiente y convertir esa información en relaciones MongoDB.

La etiqueta original puede conservarse al mismo tiempo para mantener trazabilidad con el material de origen.

---

## Reglas para generación de nuevo vocabulario

El sistema actual de generación de vocabulario seguirá utilizando un formato TSV sencillo:

```text
Vocabulary Word
Grammatical Type
Definition
Example Sentence
Tags
```

La columna `Tags` generada automáticamente debe contener únicamente etiquetas semánticas o pedagógicas.

Ejemplo:

```text
words-easily-confused identity nationality
```

Las referencias curriculares no deben ser generadas automáticamente salvo que se proporcionen explícitamente como información de origen.

La asignación curricular se realizará posteriormente en el dataset maestro utilizado por el proyecto.

---

## Archivo Excel / CSV del proyecto

El archivo maestro utilizado para la carga de datos podrá contener más información que el TSV utilizado actualmente para generar tarjetas de Anki.

Una estructura inicial prevista es:

```text
Vocabulary Word
Grammatical Type
Definition
Example Sentence
Tags
Curriculum Tags
Language Code
Course Key
Unit Key
```

Ejemplo conceptual:

```text
Vocabulary Word: foreigner
Grammatical Type: n
Definition: Someone from another country...
Example Sentence: A French person living in England is a f_________.
Tags: words-easily-confused identity nationality
Curriculum Tags: C1::10B:No-Direction-Home
Language Code: en
Course Key: english-c1
Unit Key: 10B
```

El archivo Excel será exportado a CSV antes de ser procesado por el seed.

---

## Proceso de importación

El proceso previsto será:

```text
Vocabulary.xlsx
↓
exportar CSV
↓
Node.js + fs
↓
leer cada registro
↓
normalizar campos y etiquetas
↓
buscar Course y Unit correspondientes
↓
convertir referencias a ObjectId
↓
insertar VocabularyItem
↓
MongoDB
```

Los modelos de `Language`, `Course` y `VocabularyItem` deben existir antes de ejecutar la importación.

---

## Decisiones actuales

Se mantienen las siguientes reglas para el MVP:

* Existirá una sola colección `vocabulary` para todos los idiomas.
* El idioma se obtiene mediante la relación `VocabularyItem → Course → Language`.
* Las unidades siguen siendo subdocumentos de `Course`.
* `tags[]` contiene información semántica, contextual o pedagógica.
* `curriculumTags[]` conserva las referencias del material o curso original.
* `course` y `unitId` representan las relaciones reales dentro de MongoDB.
* Se reutilizarán las etiquetas existentes siempre que resulten adecuadas.
* Las nuevas etiquetas semánticas se normalizarán preferentemente a `lowercase-kebab-case`.
* Los prefijos de idioma de Anki (`EN-`, `PT-`, etc.) podrán eliminarse durante la importación porque el idioma ya está representado en el modelo de datos.
* El vocabulario será el dataset principal utilizado para cumplir el requisito de carga inicial desde Excel con un mínimo de 100 registros.
* El modelo podrá ampliarse posteriormente si los ejercicios requieren información adicional.

