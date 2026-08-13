# Mesa de Misiones del Gremio.

Este es el Proyecto Final de JavaScript Vanilla, desarrollado para integrar y demostrar el dominio de APIs avanzadas del navegador antes de realizar la transición a TypeScript y React.

La aplicación consiste en un gestor de tareas (To-Do List) con temática RPG, donde cada funcionalidad técnica ha sido implementada para resolver retos reales de manejo de datos y estado en el cliente.

## Características y APIs Integradas

### Perfil del Aventurero
*   **Persistencia Local:** Implementación de `localStorage` para el guardado y recuperación automática del nombre y rango del usuario.
*   **Gestión de Avatar:** Uso de la **File API** para la carga, lectura y previsualización dinámica de imágenes de perfil.

### Tablón de Misiones (CRUD Completo)
*   **Base de Datos Local:** Uso de **IndexedDB** para un almacenamiento de datos persistente, robusto y asíncrono.
*   **Operaciones de Datos:** 
    *   Creación de misiones con validación de campos.
    *   Lectura y renderizado optimizado mediante **Cursors** y **DocumentFragment**.
    *   Actualización de registros existentes mediante el método `.put()`.
    *   Eliminación de datos con interfaz de confirmación.

### APIs de Contexto y Entorno
*   **Geolocation API:** Detección de coordenadas geográficas en tiempo real al cargar la aplicación.
*   **Online/Offline API:** Monitoreo del estado de red con notificaciones dinámicas al usuario sobre su conectividad.
*   **Intersection Observer:** Implementación de animaciones de entrada para las tarjetas de misiones, mejorando la experiencia de usuario y el rendimiento visual.

## Tecnologías Utilizadas
*   **HTML5 Semántico:** Uso de formularios y elementos de estructura modernos.
*   **CSS3 Pro:** Diseño basado en Flexbox y Grid, aplicando nomenclatura `camelCase` para clases y animaciones de transición.
*   **JavaScript Vanilla (ES6+):** Lógica modular, programación asíncrona y manipulación avanzada del DOM sin librerías externas.

## Estructura del Proyecto
```text
MisionesMedieval/
 ├── assets/        # Recursos visuales
 ├── css/           # style.css (Estilos bajo reglas camelCase)
 ├── js/            # main.js y misiones.js (Lógica modular)
 ├── index.html     # Punto de entrada principal
 └── README.md      # Documentación del proyecto



 ## Proyecto desarrollado por Sasha Zubiria como parte de la formación profesional en desarrollo web.