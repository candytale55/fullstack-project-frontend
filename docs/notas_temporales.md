
types: 
eliminar types/dashboard.types si es posible. 
mover los mocks o borrarlos. 
- ~~ cambiar el nombre a los archivos de type a course.types.ts~~

vocabulary - usar enum para partOfSpeech, 
vocabulary - curriculumReferences - claves cursos - ligarlos a cursos existentes. 
vocabulary: // TODO: establecer etiquetas que puedan trigger un ejercicio. Por ejemplo masc. vs fem. o plurales. BR vs PT, crazy-difficult? hard-to-pronounce? easily-forgotten. Tags también deberian ser en idioma de origen además de ingles.


BD - Cambiar el nombre a la coleccion de Conjugación. 

Services y endpoints
Los endpoints son espantosos - convertirlos en algo mas legible 
http://localhost:5173/languages/6ab3a83bedfba68b4d37e9ff/courses/6abc1ddf4144bee650c07caa/units/6abc2b9524a31e379c0f7020/exercises/6abc2b964144bee650c07dff
http://localhost:5173/languages/pt/courses/vocabulary/units/food/exercises/6abc2b964144bee650c07dff Fecha?


## Dashboard
- ~~Heat map - Quitar los meses hardcodeados~~
- ~~Ver que pasa con las horas y los meses. - Poner un componente externo?~~

Services
Cambiar los nombres a course.service.ts

Eliminar una ves que confirmes progress.service.ts funciona frontend\src\services\progressService.ts

## Excercise Setup 
- El module.css para el setup que tiene el estilo correcto es el de abajo. Hacer un componente independiente para que se reuse con diferentes actividades.  
frontend\src\components\exercises\VocabularyExercise\VocabularyExercise.module.css

## Vocabulario
- Usar un enum con equivalencia en diferentes idiomas para partOfSpeech 
frontend\src\components\exercises\ConjugationExercise\conjugationExerciseUtils.ts

- Establecer reglas para etiquetas.
En frontend\src\types\vocabulary.types.ts
// TODO: establecer etiquetas que puedan trigger un ejercicio. Por ejemplo masc. vs fem. o plurales. BR vs PT, crazy-difficult? hard-to-pronounce? easily-forgotten. Tags también deberian ser en idioma de origen además de ingles.

// Optional extended linguistic metadata
    // TODO: Should be an object - i.e cao , gender: feminine = cadela  regionalVariant: 'pt-br' = cachorro

## Eliminar files obsoletas
types/exercise.ts (hay exercise.types.ts)

## Helpers
- Shuffle questions - para vocabulary y conjugacion y otros casos. 

