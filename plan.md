# Plan de implementación: Pomodoro Web App

## 1. Objetivo

Desarrollar una aplicación web tipo Pomodoro con HTML5, CSS3 y JavaScript Vanilla, ejecutable directamente al abrir `index.html` en un navegador moderno, sin servidor, sin bibliotecas externas y sin pasos de compilación.

Se prioriza un diseño limpio, responsive, accesible y robusto, con un flujo de trabajo claro: Work 25 min, Short Break 5 min, conteo de pomodoros, notificación sonora y feedback visual.

---

## 2. Estructura de archivos propuesta

La estructura final, sin incluir todavía los archivos funcionales, será la siguiente:

- `index.html` — estructura HTML semántica de la aplicación.
- `styles.css` — estilos del layout, componentes, estados visuales y responsive.
- `script.js` — lógica del temporizador, estados, eventos, contador y notificaciones.
- `README.md` o `readme.md` — documentación de uso, si se desea mantener.
- `PLAN.md` — este documento de planificación.

Nota: en este paso no se generan los archivos funcionales; solo se define la estructura y el plan.

---

## 3. Estructura HTML

La interfaz debe construirse con elementos semánticos y accesibles, evitando dependencias de frameworks.

### 3.1. Contenedor principal

- `<main>` como contenedor principal de la aplicación.
- `<header>` para el título y la marca del proyecto.
- `<section>` para el temporizador principal.
- `<aside>` o un bloque de información para datos de estado (pomodoros completados, modo actual).

### 3.2. Componentes mínimos

- Título visible de la aplicación: “Pomodoro” o nombre equivalente.
- Indicador de modo actual:
  - Work
  - Short Break
- Vista del tiempo restante en formato MM:SS.
- Botones:
  - Iniciar
  - Pausar
  - Reiniciar
- Contador de pomodoros completados.
- Estado textual opcional para mensajes del sistema:
  - “Trabajo en curso”
  - “Descanso corto”
  - “Ciclo completado”

### 3.3. Atributos accesibles

- Botones con texto claro y acciones explícitas.
- Uso de `aria-live` para notificaciones de estado cuando cambie el modo o el ciclo.
- Controles con `button` nativos para mejorar la accesibilidad del teclado.
- `aria-label` en elementos clave cuando el texto visible no sea suficiente.

---

## 4. Organización del CSS

El CSS debe estar separado por secciones y mantener una estructura escalable.

### 4.1. Orden sugerido

1. Reset/base general.
2. Variables CSS para colores, tiempos, espaciado y radio.
3. Layout global.
4. Componentes de la interfaz.
5. Estados visuales del temporizador.
6. Estilos de modo Work y Short Break.
7. Estilos del contador y avisos.
8. Feedback visual de finalización.
9. Media queries para diseño responsive.
10. Estilos de enfoque y accesibilidad.

### 4.2. Tokens visuales

Se recomienda definir variables como:

- `--bg-primary`
- `--bg-work`
- `--bg-break`
- `--text-primary`
- `--accent`
- `--success`
- `--warning`
- `--danger`
- `--radius`
- `--shadow`

### 4.3. Estados de la UI

- Estado normal.
- Estado activo (temporizador corriendo).
- Estado pausado.
- Estado de finalización de ciclo.
- Cambio visual de fondo según el modo actual.

### 4.4. Responsive design

- Mobile-first.
- Ajustes para pantallas pequeñas: tamaño del texto, altura del contenedor, spacing y ancho de botones.
- El temporizador debe seguir visible y legible sin requerir zoom.

---

## 5. Organización del JavaScript

El script debe modularizarse por responsabilidad para que el flujo sea entendible y mantenible.

### 5.1. Capas funcionales

- Inicialización del DOM.
- Definición de constantes y configuración base.
- Estado global de la aplicación.
- Funciones del temporizador.
- Funciones de cambio de modo.
- Funciones de contador de pomodoros.
- Notificaciones visuales y sonoras.
- Actualización del título de la pestaña.
- Manejo de eventos del usuario.
- Validación y manejo de errores.

### 5.2. Patrón recomendado

Se recomienda seguir un enfoque con estado centralizado, por ejemplo:

- `state.mode`: `work` o `shortBreak`
- `state.isRunning`: booleano
- `state.timeLeft`: segundos restantes
- `state.completedPomodoros`: contador total
- `state.timerId`: referencia al intervalo o temporizador
- `state.isFinishedCycle`: bandera para evitar ejecuciones dobles
- `state.lastModeBeforeReset`: opcional para controlar transiciones

---

## 6. Estado de la aplicación

El estado debe mantenerse en un único objeto central para evitar lógica dispersa.

### 6.1. Estado principal

- `mode`: trabajo o descanso corto.
- `timeLeft`: tiempo restante en segundos.
- `isRunning`: si el temporizador está activo.
- `completedPomodoros`: cantidad de ciclos Work completados.
- `timerId`: identificador del intervalo o temporizador.
- `audioContext`: referencia al contexto de audio si se inicializa.
- `isAudioUnlocked`: bandera para saber si el audio ya fue habilitado por interacción del usuario.

### 6.2. Configuración

- `WORK_DURATION = 25 * 60`
- `SHORT_BREAK_DURATION = 5 * 60`
- `titleBase = "Pomodoro"`
- `transitionDelay = 0` o equivalente para sincronizar visuales

### 6.3. Estado derivado

El render debe derivarse del estado y no depender de valores duplicados:

- tiempo visible en pantalla
- texto del modo actual
- apariencia del botón activo
- estilo del fondo de la aplicación
- contador de pomodoros
- título de la pestaña

---

## 7. Variables necesarias

Se necesitan variables para:

- Referencias al DOM:
  - elemento del tiempo
  - modo actual
  - contador de pomodoros
  - botones
  - `document.title`
- Configuración del temporizador:
  - duración de Work
  - duración de Short Break
  - intervalo de actualización
- Estado runtime:
  - modo
  - tiempo restante
  - estado de ejecución
  - referencia del intervalo
- Audio:
  - contexto de audio
  - oscilador, ganancia y patrón de tono
- UI visual:
  - clases a aplicar en el modo actual
  - flag para feedback de finalización

---

## 8. Funcionamiento del temporizador

### 8.1. Lógica base

- El temporizador cuenta hacia abajo en segundos.
- Se actualiza de forma periódica con `setInterval` o un patrón equivalente.
- Cada segundo se reduce `timeLeft` en 1.
- Cuando `timeLeft` llega a 0, se ejecuta la transición del estado.

### 8.2. Formato de tiempo

- Debe mostrarse siempre en formato `MM:SS`.
- Ejemplos:
  - `25:00`
  - `00:05`
  - `00:00`

### 8.3. Precisión

El enfoque debe evitar errores de drift por sincronización excesiva. Se recomienda manejar el tiempo con referencia a `Date.now()` para calcular el tiempo transcurrido de manera más fiable si se usa un reloj de alta precisión.

---

## 9. Manejo de los modos Work y Short Break

### 9.1. Modo Work

- Duración configurada: 25 minutos.
- Se activa al inicio de la app o después de un descanso.
- Cuando termina un ciclo Work, se incrementa el contador de pomodoros sí o sí y se pasa a Short Break.

### 9.2. Modo Short Break

- Duración configurada: 5 minutos.
- Se activa automáticamente al terminar un Work.
- Cuando finaliza, vuelve al Work y prepara el siguiente ciclo.

### 9.3. Regla de transición

- `Work -> Short Break` cuando `timeLeft === 0`.
- `Short Break -> Work` cuando `timeLeft === 0`.
- Aumentar el contador solo cuando se completa un ciclo completo de `Work`.

### 9.4. Persistencia lógica del modo

La aplicación no debe depender de la interfaz visual para decidir el siguiente estado; debe basarse en un estado explícito en JavaScript.

---

## 10. Eventos de los botones

### 10.1. Botón Iniciar

- Si el temporizador no está corriendo, se inicia.
- Si ya está corriendo, no debe duplicar intervalos.
- Si el temporizador está en 00:00 después de una finalización, debe arrancar el siguiente modo correcto.

### 10.2. Botón Pausar

- Detiene la cuenta regresiva.
- Mantiene el tiempo actual sin restablecerlo.
- Debe dejar el botón Iniciar disponible para continuar.

### 10.3. Botón Reiniciar

- Reestablece el tiempo del modo actual a su duración inicial.
- Detiene el ciclo actual.
- No incrementa el contador a menos que exista una lógica explícita para reinicio limpio.
- Debe dejar la UI en un estado consistente.

### 10.4. Prevención de dobles ejecuciones

- Si el usuario hace clic varias veces en “Iniciar”, no debe crearse más de un temporizador activo.
- Se recomienda verificar `state.isRunning` antes de crear un intervalo.

---

## 11. Transición entre estados

### 11.1. Secuencia principal

1. El sistema está en modo Work.
2. El usuario inicia.
3. El contador baja hasta 0.
4. Se dispara la finalización del ciclo.
5. Se incrementa el contador de pomodoros solo si el modo era Work.
6. Se cambia a Short Break.
7. Se reinicia el tiempo del descanso.
8. El temporizador del descanso arranca automáticamente o queda listo para iniciar según se defina.
9. Cuando termina Short Break, se vuelve a Work.

### 11.2. Reglas de transición

- El cambio debe ser automático.
- Si el usuario estaba pausado en el momento de finalización, se debe seguir la lógica correspondiente.
- Debe existir una función centralizada `completeCycle()` o `switchMode()` para asegurar consistencia.

### 11.3. Feedback aceitado por la UX

- Cambiar el fondo o la clase del contenedor.
- Animación breve de “flash” o pulso.
- Mensaje visible para indicar finalización.
- Estado textual accesible mediante `aria-live`.

---

## 12. Contador de Pomodoros

### 12.1. Regla de incremento

- El contador aumenta sólo cuando se completa un ciclo Work.
- No se incrementa al finalizar Short Break.
- No debe depender del usuario presionando un botón extra.

### 12.2. Representación

- Puede mostrarse como un número simple: `0`, `1`, `2`, etc.
- También puede incluir una etiqueta: “Pomodoros: 3”

### 12.3. Casos borde

- Reiniciar el ciclo actual no debe sumar pomodoros.
- Si el usuario cambia manualmente el modo antes de que termine Work, no debe contar como ciclo completo.

---

## 13. Sistema de notificaciones

### 13.1. Requisito

Se requiere notificación sonora utilizando Web Audio API.

### 13.2. Estrategia recomendada

- Crear un `AudioContext` únicamente cuando el usuario interactúa por primera vez (clic en Iniciar o cualquier botón).
- Generar un tono corto con `OscillatorNode` y `GainNode`.
- Usar una secuencia simple como dos pitidos cortos para distinguir la finalización de un ciclo.

### 13.3. Consideraciones

- Algunos navegadores requieren interacción previa para habilitar el audio.
- Si `AudioContext` no está disponible, se debe manejar como error sin romper la app.
- La notificación sonora debe ser complementaria a la notificación visual.

---

## 14. Actualización del título de la pestaña

Se debe cambiar temporalmente el título del documento durante la cuenta regresiva.

### 14.1. Reglas propuestas

- En funcionamiento normal: mostrar “Tiempo restante: 25:00” o similar.
- En modo Work: presentar “Work - 00:12”
- En modo Short Break: presentar “Break - 00:04”
- Cuando termine un ciclo: mostrar un texto temporal como “¡Tiempo!"

### 14.2. Requisito funcional

Debe ser un cambio temporal y claramente visible al usuario que tenga la pestaña abierta.

---

## 15. Diseño responsive

La app debe adaptarse a distintas resoluciones sin depender de frameworks.

### 15.1. Recomendación

- En móvil, el layout se apila verticalmente.
- En desktop, el contenido se centra con un ancho fijo o un máximo apropiado.
- Los botones deben ser táctiles, con tamaño mínimo cómodo.
- El temporizador debe mantener proporciones legibles.

### 15.2. Elementos clave

- `max-width` para el contenedor principal.
- `flex` o `grid` para disposición elegante.
- Ajuste de tamaños y márgenes con media queries.

---

## 16. Accesibilidad

### 16.1. Principios a cubrir

- Contraste suficiente entre texto y fondo.
- Fokus visible y con estilo claro.
- Botones con etiqueta textual legible.
- Uso de `aria-live` para avisos importantes.
- Semántica correcta con `main`, `header`, `section`, `button`.
- Evitar depender solo del color para comunicar el estado.

### 16.2. Mejoras recomendadas

- Cuando finaliza un ciclo, agregar un mensaje tipo “Ciclo completado” en un área de live region.
- Mantener la navegación por teclado funcional.
- Estilos para `:focus-visible`.

---

## 17. Manejo de errores

Se debe prevenir que un fallo de una funcionalidad rompa toda la experiencia.

### 17.1. Casos a cubrir

- `AudioContext` no soportado.
- El usuario intenta iniciar cuando ya está corriendo.
- El temporizador se reinicia durante una ejecución activa.
- El navegador bloquea la ejecución de audio hasta una interacción del usuario.
- El DOM no está listo al cargar el script.
- Modo o duración inválidos por lógica o malformación.

### 17.2. Estrategia

- Validar antes de iniciar intervalos.
- Usar guardas (`if`) para condiciones críticas.
- Ejecutar la lógica en una función que revise el estado antes de cada acción.
- Evitar errores de referencia si el script carga antes del DOM.

---

## 18. Casos borde

### 18.1. Casos importantes

- Clics rápidos sobre “Iniciar” y “Pausar”.
- Reinicio durante un ciclo activo.
- Cambio de modo a mitad de ciclo.
- Finalización exacta del tiempo (`00:00`).
- Un navegador con limitación de audio.
- Pantalla pequeña o rotación del dispositivo.
- El usuario deja la pestaña inactiva y vuelve después de un tiempo.

### 18.2. Comportamiento esperado

- No se deben duplicar temporizadores.
- El tiempo debe ser coherente y no saltar a valores imposibles.
- La transición debe ejecutarse una sola vez por ciclo.
- El contador debe actualizar correctamente con un único aumento por Work completado.

---

## 19. Estrategia de pruebas

### 19.1. Pruebas manuales recomendadas

1. Verificar que el contador comienza en 25:00 en Work.
2. Iniciar el temporizador y comprobar la cuenta regresiva correcta.
3. Pausar y continuar sin errores.
4. Reiniciar durante ejecución activa.
5. Dejar el temporizador llegar a 00:00 y validar la transición a Short Break.
6. Confirmar que el contador de pomodoros aumenta solo al terminar Work.
7. Validar el audio de finalización.
8. Revisar el cambio del título de la pestaña.
9. Probar visualmente el feedback de finalización.
10. Comprobar la versión mobile y la navegación por teclado.

### 19.2. Casos de pruebas funcionales

- `iniciar()` desde estado apagado.
- `pausar()` desde estado activo.
- `reiniciar()` con modo actual Work y Short Break.
- `completeCycle()` en Work y en Short Break.
- `render()` con tiempo en distintos valores.
- `updateTabTitle()` con distintos modos y mensajes.

### 19.3. Buena práctica

La validación debe hacerse en navegador real, porque el comportamiento de audio, focus y actualización visual depende del entorno del usuario.

---

## 20. Orden recomendado de implementación

### Paso 1: Estructura base

- Definir la semántica HTML.
- Crear la estructura de los elementos visuales.
- Preparar la referencia a cada nodo del DOM.

### Paso 2: Estilos base

- Definir variables CSS.
- Establecer layouts y colores.
- Crear estilos de botones, tarjetas y temporizador.

### Paso 3: Estado inicial

- Crear el objeto `state`.
- Configurar duración inicial de Work y Short Break.
- Inicializar el tiempo a la duración del modo actual.

### Paso 4: Render inicial

- Mostrar el tiempo en pantalla.
- Mostrar el modo actual.
- Mostrar contador inicial y estado base.

### Paso 5: Lógica del temporizador

- Implementar cuenta regresiva.
- Actualizar el tiempo visible cada segundo.
- Manejar `pause` y `resume` de manera consistente.

### Paso 6: Gestión de modos

- Cambiar Work a Short Break al final del ciclo.
- Cambiar Short Break a Work al terminar el descanso.
- Reconfigurar el tiempo de cada estado.

### Paso 7: Contador de pomodoros

- Incrementar solo al completar Work.
- Actualizar la UI de forma robusta.

### Paso 8: Notificaciones y feedback visual

- Configurar Web Audio API.
- Animar la UI al final del ciclo.
- Añadir mensajes accesibles.

### Paso 9: Título de la pestaña

- Actualizar el título dinámicamente.
- Añadir texto temporal de finalización.

### Paso 10: Responsive y accesibilidad

- Ajustar tamaños, spacing y layout.
- Mejorar foco, contraste y soporte de teclado.

### Paso 11: QA final

- Revisar todos los casos borde.
- Validar en navegador.
- Confirmar que el comportamiento coincide con los requisitos funcionales.

---

## 21. Matriz de requisitos funcionales

Se verifica que cada requisito quede contemplado en el plan:

- 1. Temporizador Work de 25 minutos: cubierto en modos, configuración y lógica de cuenta regresiva.
- 2. Temporizador Short Break de 5 minutos: cubierto en modos, configuración y flujo de transición.
- 3. Botón Iniciar: cubierto en eventos de botones y lógica de arranque.
- 4. Botón Pausar: cubierto en eventos de botones y control del estado.
- 5. Botón Reiniciar: cubierto en eventos de botones y reset del estado actual.
- 6. Transición automática de Work a Short Break: cubierto en transición entre estados.
- 7. Transición automática de Short Break a Work: cubierto en transición entre estados.
- 8. Contador de Pomodoros completados: cubierto en estado global y lógica del ciclo.
- 9. El contador aumenta únicamente al completar un ciclo Work: cubierto en regla de incremento del contador.
- 10. Notificación sonora utilizando Web Audio API: cubierto en sistema de notificaciones.
- 11. Feedback visual al finalizar cada ciclo: cubierto en estados visuales y animaciones.
- 12. Cambio temporal del título de la pestaña: cubierto en actualización del `document.title`.
- 13. Diseño responsive: cubierto en CSS y estrategia mobile-first.
- 14. HTML5 semántico: cubierto en estructura HTML propuesta.
- 15. Accesibilidad básica: cubierto en accesibilidad y semántica.
- 16. La aplicación debe funcionar sin servidor ni proceso de compilación: cubierto en la filosofía de implementación y estructura de archivos.

---

## 22. Conclusión

El plan prioriza una implementación simple, directa y compatible con navegadores modernos, usando solo HTML5, CSS3 y JavaScript Vanilla. La arquitectura propuesta separa claramente estructura, estilo, lógica y estado, lo que facilita la construcción incremental y la validación de cada requisito antes de avanzar al siguiente paso.

La siguiente fase será la implementación de la app siguiendo exactamente este orden, sin saltarse pasos ni introducir dependencias externas.
