# 🧿 Fullstack Project Frontend

Frontend del proyecto educativo Full Stack desarrollado como proyecto final de ThePower.

La aplicación permitirá a los usuarios estudiar vocabulario mediante diferentes actividades y consultar su progreso dentro del curso seleccionado.

## Tecnologías

* React
* TypeScript
* Vite
* CSS Modules

## Objetivo del frontend

El frontend será responsable de:

* mostrar la interfaz de usuario
* gestionar la navegación entre páginas
* gestionar el estado necesario de la aplicación
* permitir seleccionar el curso activo
* mostrar vocabulario y actividades
* capturar las respuestas del usuario
* comunicarse con el backend
* mostrar resultados y progreso

Las reglas de negocio y los algoritmos principales se implementarán en el backend.

## Estructura

La estructura inicial del proyecto será sencilla y se ampliará conforme avance el MVP.

```text
src/
├── assets/
├── components/
├── context/
├── hooks/
├── pages/
├── services/
├── styles/
├── types/
├── utils/
├── App.tsx
└── main.tsx
```

Responsabilidades principales:

* `components` → componentes reutilizables
* `pages` → páginas principales
* `context` → estado global necesario
* `hooks` → lógica React reutilizable
* `services` → comunicación con el backend
* `types` → tipos TypeScript
* `utils` → utilidades propias del frontend
* `styles` → estilos globales

## Proyecto

Este repositorio contiene únicamente el **frontend**.

El backend se desarrolla en un repositorio Git independiente:

```text
fullstack-project-backend
```

## Estado

Proyecto en desarrollo.

La documentación se irá ampliando progresivamente conforme se implementen las diferentes fases del MVP.
