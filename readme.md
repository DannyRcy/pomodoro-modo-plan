# Bitácora de Prompts Clave

Esta bitácora registra los prompts utilizados durante la planificación y la implementación inicial del proyecto Pomodoro mediante el enfoque **Modo Plan**.

Se ha dejado registrada la evolución hasta el paso 2 del plan, que corresponde a la estructura base inicial.

---

## Paso 1. Planificación inicial del proyecto

### Prompt utilizado

> Antes de generar cualquier código, quiero que analices y planifiques el desarrollo de una aplicación web de gestión de tiempo tipo Pomodoro.
> 
> La aplicación debe desarrollarse exclusivamente con HTML5, CSS3 y JavaScript Vanilla.
> 
> No se permite utilizar React, Angular, Vue, Bootstrap, Tailwind, jQuery, npm, Vite, Webpack, librerías externas, frameworks ni servicios externos.
> 
> La aplicación debe poder ejecutarse directamente abriendo `index.html` en un navegador moderno.
> 
> Debe incluir temporizador Work de 25 minutos, Short Break de 5 minutos, iniciar, pausar, reiniciar, transición automática, contador de Pomodoros, notificación sonora, feedback visual, cambio temporal de título de la pestaña, diseño responsive, HTML5 semántico y accesibilidad básica.
> 
> Antes de escribir código, crea un plan detallado y crea un archivo `PLAN.md` en la raíz con toda la estrategia.

### Resultado

- Se creó el documento de planificación [`PLAN.md`](PLAN.md).
- Se definió la estructura general del proyecto.
- Se estableció el orden de implementación antes de generar el código.

---

## Paso 2. Implementación de la estructura base

### Prompt utilizado

> Ahora comienza la implementación siguiendo el `PLAN.md`.
> 
> Antes de modificar cualquier archivo, revisa el plan completo y determina cuál es el primer paso de implementación indicado en la sección de orden recomendado.
> 
> Implementa únicamente ese primer paso.
> 
> No avances todavía a los pasos siguientes.

### Resultado

- Se construyó la estructura base del proyecto.
- Se creó la estructura HTML semántica.
- Se dejó preparada la base inicial del documento.
- No se implementaron todavía las funcionalidades correspondientes a pasos posteriores.

---

## Paso 3. Definición del estado de la aplicación

### Prompt utilizado

> Vamos con el paso 3.

### Resultado

- Se definió el estado inicial de la aplicación.
- Se establecieron las variables necesarias para representar el estado del temporizador.
- Se preparó la estructura necesaria para controlar el modo actual de la aplicación.

---

## Paso 4. Renderizado inicial de la interfaz

### Prompt utilizado

> Vamos con el paso 4.

### Resultado

- Se implementó el render inicial de la interfaz.
- Se conectó el estado de la aplicación con el contenido mostrado al usuario.
- Se dejó preparada la actualización visual de los elementos de la interfaz.

---

## Paso 5. Implementación de la lógica del temporizador

### Prompt utilizado

> Vamos al paso 5.

### Resultado

- Se implementó la lógica principal del temporizador.
- Se estableció la cuenta regresiva.
- Se incorporó el control del tiempo restante.
- Se preparó el funcionamiento de los controles del temporizador.

---

## Paso 6. Implementación de Work y Short Break

### Prompt utilizado

> Vamos al paso 6.

### Resultado

- Se implementaron los estados `Work` y `Short Break`.
- Se establecieron las duraciones de 25 y 5 minutos respectivamente.
- Se implementó la transición entre ambos modos.
- Se estableció el comportamiento automático al finalizar cada ciclo.

---

## Paso 7. Contador de Pomodoros

### Prompt utilizado

> Vamos a los pasos 7 y 8.

### Resultado correspondiente al Paso 7

- Se añadió el contador de Pomodoros completados.
- El contador aumenta cuando finaliza correctamente un ciclo `Work`.
- El contador no aumenta al finalizar un ciclo `Short Break`.

---

## Paso 8. Notificación sonora y feedback visual

### Prompt utilizado

> Vamos a los pasos 7 y 8.

### Resultado correspondiente al Paso 8

- Se implementó la notificación sonora mediante Web Audio API.
- Se añadió feedback visual al finalizar cada ciclo.
- Se diferenciaron visualmente los eventos de finalización del temporizador.

---

## Paso 9. Cambio temporal del título de la pestaña

### Prompt utilizado

> Vamos ya al paso 9.

### Resultado

- Se implementó el cambio temporal del título de la pestaña.
- El título permite informar al usuario cuando un ciclo ha finalizado.
- Se configuró el retorno del título al estado normal después de la notificación.

---

## Paso 10. Diseño Responsive

### Prompt utilizado

> Vamos al paso 10.

### Resultado

- Se mejoró la adaptación de la interfaz a diferentes tamaños de pantalla.
- Se realizaron ajustes para dispositivos móviles, tablets y computadoras.
- Se mejoró la distribución y legibilidad de los elementos de la interfaz.

---

## Paso 11. Accesibilidad y revisión final

### Prompt utilizado

> Vamos al paso 11 y acabamos. Pero hazlo correcto.

### Resultado

- Se realizaron mejoras relacionadas con accesibilidad.
- Se revisó la estructura semántica HTML.
- Se verificó el uso de los controles mediante teclado.
- Se revisaron los estados visuales de la interfaz.
- Se realizó una revisión general del funcionamiento de la aplicación.

---

