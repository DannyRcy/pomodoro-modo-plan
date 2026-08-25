# Bitácora de prompts clave

Este archivo recoge los prompts principales utilizados durante la generación y desarrollo del proyecto Pomodoro.

## 1) Planificación inicial del proyecto

Prompt clave:

> Antes de generar cualquier código, quiero que analices y planifiques el desarrollo de una aplicación web de gestión de tiempo tipo Pomodoro.
>
> La aplicación debe desarrollarse exclusivamente con:
> - HTML5
> - CSS3
> - JavaScript Vanilla
> No se permite utilizar: React, Angular, Vue, Bootstrap, Tailwind, jQuery, npm, Vite, Webpack, librerías externas, frameworks, servicios externos.
>
> La aplicación debe poder ejecutarse directamente abriendo index.html en un navegador moderno.
>
> Los requisitos funcionales son: ...
>
> Antes de escribir código, crea un plan detallado de implementación que incluya:
> - estructura de archivos;
> - estructura HTML;
> - organización del CSS;
> - organización del JavaScript;
> - estado de la aplicación;
> - variables necesarias;
> - funcionamiento del temporizador;
> - manejo de los modos Work y Short Break;
> - eventos de los botones;
> - transición entre estados;
> - contador de Pomodoros;
> - sistema de notificaciones;
> - actualización del título de la pestaña;
> - diseño responsive;
> - accesibilidad;
> - manejo de errores;
> - casos borde;
> - estrategia de pruebas;
> - orden recomendado de implementación.
>
> NO generes todavía index.html, styles.css ni script.js.
>
> Crea directamente un archivo llamado PLAN.md en la raíz del repositorio con el plan completo.
>
> Después de crear PLAN.md, revisa que todos los requisitos funcionales estén contemplados antes de finalizar.

Resultado:
- Se creó el archivo PLAN.md con la estrategia completa de implementación.

## 2) Implementación del primer paso del plan

Prompt clave:

> Ahora comienza la implementación siguiendo el PLAN.md.
>
> Antes de modificar cualquier archivo, revisa el plan completo y determina cuál es el primer paso de implementación indicado en la sección de orden recomendado.
>
> Implementa únicamente ese primer paso.
>
> No avances todavía a los pasos siguientes.
>
> Mantén estrictamente las tecnologías y restricciones establecidas en PLAN.md.
>
> Crea o modifica directamente los archivos necesarios para completar únicamente el primer paso del plan.

Resultado:
- Se creó la estructura base de HTML y la base inicial del proyecto.

## 3) Continuación por pasos sucesivos del plan

Prompt clave:

> Vamos con los pasos 3 y 4

Resultado:
- Se definió el estado inicial de la aplicación y el render inicial.

Prompt clave:

> Vamos al paso 5 y 6

Resultado:
- Se implementó la lógica del temporizador y la gestión de Work/Short Break.

Prompt clave:

> Vamos a los pasos 7 y 8

Resultado:
- Se añadieron el contador de Pomodoros y el feedback visual/sonoro de ciclo.

Prompt clave:

> Vamos ya del paso 9, 10 y 11 y acabamos. Pero hazlo correcto

Resultado:
- Se finalizó con título de pestaña, ajustes finales de responsive/accesibilidad y validación del proyecto.

## 4) Estado final

La aplicación quedó implementada como una web estática compatible con abrirse directamente en navegador, sin servidor ni dependencias externas.
