# Web personal de Borja Aguado

Sitio web personal y academico de Borja Aguado (2025). Incluye una pagina de inicio, curriculum vitae, enlaces a perfiles academicos y una coleccion de experimentos interactivos de percepcion, atencion, memoria y psicofisica que se ejecutan directamente en el navegador.

## Contenido

- `index.html`: pagina principal con presentacion, noticias academicas, publicaciones destacadas y enlaces a proyectos.
- `CV.html`: curriculum vitae con contacto, posiciones, docencia, publicaciones, congresos y becas.
- `experiments/`: experimentos interactivos en HTML, CSS y JavaScript.
- `shared/include.js`: cabecera, menu de navegacion, pie de pagina y selector de tema claro/oscuro.
- `styles.css`: estilos generales del sitio.
- `images/`: imagenes, iconos y recursos visuales.
- `site_libs/`: librerias generadas o incluidas para compatibilidad con paginas HTML.

## Experimentos disponibles

1. Span visuoespacial (Corsi) - repeticion directa
2. Span visuoespacial (Corsi) - repeticion inversa
3. Span fonologico (digitos) - repeticion directa
4. Span fonologico (digitos) - repeticion inversa
5. Tarea de Posner - atencion espacial
6. Seguimiento continuo de objetivo
7. Seguimiento continuo con delay visomotor
8. Movimiento coherente (RDM) - umbral adaptativo
9. Ilusion de Ebbinghaus - estimulos constantes
10. Busqueda selectiva - paralela vs serie

Los experimentos se ejecutan localmente en el navegador. Los datos no se envian al creador de la web; se guardan o descargan en el propio dispositivo del usuario cuando el experimento lo permite.

## Uso local

No requiere instalacion de dependencias ni proceso de compilacion. Para ver el sitio:

1. Abre `index.html` en un navegador.
2. Navega desde el menu superior a `CV` o a cualquiera de los experimentos.

Tambien puedes servir la carpeta con un servidor local sencillo:

```bash
python3 -m http.server 8000
```

Despues abre:

```text
http://localhost:8000
```

## Despliegue

El proyecto es una web estatica compatible con GitHub Pages. Para desplegarlo:

1. Sube el contenido de esta carpeta a un repositorio de GitHub.
2. Activa GitHub Pages desde la configuracion del repositorio.
3. Selecciona la rama y carpeta que contienen `index.html`.

## Tecnologias

- HTML
- CSS
- JavaScript
- Librerias locales en `site_libs/`

## Autor

Borja Aguado

## Licencia

Este proyecto esta disponible bajo la licencia MIT. Consulta el archivo `LICENSE` para mas informacion.

## Mantenimiento

Para anadir una nueva pagina o experimento:

1. Crea el archivo HTML correspondiente.
2. Si debe aparecer en la navegacion, anade el enlace en `shared/include.js`.
3. Coloca estilos compartidos en `styles.css` o estilos especificos de experimentos en `experiments/experiment.css`.
4. Comprueba que las rutas relativas funcionan tanto abriendo `index.html` como desde las paginas dentro de `experiments/`.
