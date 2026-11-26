## 📌 Rama: `animales_favoritos`

### ¿Por qué se creó esta rama?
Se creó la rama independiente `animales_favoritos` a partir de la rama principal (`main`) siguiendo buenas prácticas de control de versiones y trabajo colaborativo en Git. El objetivo de aislar este desarrollo en una rama dedicada es:
- Implementar y probar la nueva funcionalidad de **Lista de Favoritos** sin afectar la estabilidad del código en producción ni interferir con los cambios que realizan las demás integrantes del equipo en sus propias historias de usuario.
- Facilitar la revisión de código (*Pull Request*) antes de integrar la funcionalidad al flujo principal del proyecto.

---

## 📖 Historia de Usuario Implementada

- **Autor / Responsable:** Elkin Dainover Jiménez Gómez
- **Rama:** `animales_favoritos`
- **Descripción:**
  > *"Como persona interesada en adoptar, quiero guardar los perfiles de los animales que me llaman la atención en una lista de favoritos para compararlos con calma y decidir a cuál postularme."*

### Criterios de aceptación cumplidos:
- El usuario puede marcar o desmarcar cualquier perro o gato como favorito desde su tarjeta de presentación mediante un ícono de estrella.
- La selección se almacena de forma persistente en el navegador utilizando `localStorage` y un contexto global de React.
- Existe una vista dedicada accesible desde la ruta `/favoritos` y desde la barra de navegación principal (tanto en versión escritorio como en el menú móvil) para consultar y comparar las mascotas guardadas.

---

## 📝 Historial de Commits Realizados

A continuación se detallan los commits registrados en la rama `animales_favoritos`:

| Hash | Fecha | Mensaje | Descripción técnica del cambio |
| :--- | :--- | :--- | :--- |
| `f73ff02` | 2026-11-23 | `agg condicional por si el endpoint devuelve array u objeto` | Se robusteció la función `getAllAnimals` para procesar correctamente la respuesta de la API tanto si llega como arreglo (`array`) o como objeto con propiedad `results`, retornando `[]` ante respuestas inválidas y actualizando el `lockfile` de dependencias. |
| `9f448b3` | 2026-11-23 | `favoritesPages config` | Implementación principal de **Mis Favoritos** (7 archivos modificados): creación del contexto global con persistencia en `localStorage`, configuración de la ruta `/favoritos`, creación de la página de favoritos, enlace en el `Header` (escritorio y móvil) e integración del botón estrella en las tarjetas de animales. |
| `396c0d7` | 2026-11-23 | `filtros` | Ajuste menor en los comentarios internos de la sección de filtros dentro del componente `Body.jsx` sin alterar la lógica funcional. |
| `4b2a098` | 2026-11-23 | `allfiltres` | Refinamiento de comentarios en el módulo de filtros de la página de adopción, dejando explícitas las categorías disponibles (*todos*, *perros*, *gatos*). |
| `a132852` | 2026-11-24 | `correciones mis favoritos body` | Limpieza y depuración del componente `Body` de adopciones, eliminando comentarios residuales en el JSX para mejorar la legibilidad del código antes del despliegue remoto. |

---

## 👥 Equipo de Desarrollo (Corporación Universitaria Iberoamericana)
- **Elkin Dainover Jiménez Gómez** – Ingeniería de Software