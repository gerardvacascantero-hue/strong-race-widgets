# strong-race-widgets

Widget de viaje para Strong Race Mallorca: vuelos y ferry por ciudad de origen, hoteles con
descuento y mapa de puntos de interés (Leaflet).

## Instalación en Framer

Inserta un componente **Embed** (Insert → Embed → HTML) en el punto exacto de la página donde
quieras el widget, y pega esto dentro:

```html
<div id="strong-race-widget"></div>
<script defer src="https://cdn.jsdelivr.net/gh/gerardvacascantero-hue/strong-race-widgets@v1.2.1/strong-race-widget-5.js"></script>
```

Eso es todo. El `<div>` y el `<script>` van juntos en el mismo Embed: es el patrón que recomienda
la propia documentación de Framer, y garantiza que el nodo de montaje exista cuando el script
arranca. Los scripts no se ejecutan en el editor de Framer, solo en Preview y en el sitio
publicado.

Como alternativa, el `<script>` puede ir en Site Settings → Custom Code → End of `<body>` y el
`<div>` en un Embed. También funciona: el script espera con un `MutationObserver` a que el `<div>`
aparezca, aunque Framer lo inserte después de hidratar React. Si tras 10 s no lo encuentra, avisa
por consola.

## Estructura

```
strong-race-widget-5.js     23 KB   IIFE: CSS, datos y lógica  ← el que se carga
assets/fonts/              296 KB   Panton 400 y 700 (.otf)
assets/hotels/             408 KB   5 imágenes
assets/pois/               1,9 MB   28 imágenes
```

Las fuentes y las imágenes se sirven como ficheros reales, no como base64 embebido. Eso reduce
el JS de 3,5 MB a 23 KB, permite que el navegador las cachee entre visitas y hace que el
`loading="lazy"` de las imágenes de hotel funcione de verdad. Ningún fichero del repo llega a
400 KB; el más pesado es `fonts/panton-700.otf`, con 145 KB.

No se guardan versiones monolíticas en el repo: un `.js` de 3,5 MB con los assets en base64 no lo
cachea bien el navegador ni lo sirve con soltura jsDelivr, que es justo lo que este formato evita.

## Servir los assets desde otro origen

Por defecto el widget los busca en jsDelivr, en el tag fijado en la constante `A` del `.js`.
Para apuntarlos a otro sitio, define la variable **antes** de cargar el script:

```html
<script>window.SR_ASSETS_BASE = 'https://mi-cdn.com/strong-race/assets/';</script>
<script defer src=".../strong-race-widget-5.js"></script>
```

Debe acabar en barra. El origen tiene que enviar `Access-Control-Allow-Origin` para que las
fuentes `.otf` carguen (jsDelivr ya lo hace).

## Publicar cambios

jsDelivr cachea cada tag de forma inmutable. Si cambias assets o código, crea un tag nuevo y
actualiza tanto la constante `A` del `.js` como la URL del `<script>`:

```bash
git tag v1.2.2 && git push origin v1.2.2
```

El tag vigente es **v1.2.1**.

## Dependencias

[Leaflet 1.9.4](https://leafletjs.com/) y sus tiles de CartoDB, cargados desde cdnjs bajo demanda.
