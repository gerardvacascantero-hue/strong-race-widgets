# strong-race-widgets

Widget de viaje para Strong Race Mallorca: vuelos y ferry por ciudad de origen, hoteles con
descuento y mapa de puntos de interés (Leaflet).

## Instalación en Framer

**1. Añade un componente Embed** en la página, donde quieras el widget, con este HTML:

```html
<div id="strong-race-widget"></div>
```

**2. En Site Settings → Custom Code → End of `<body>` tag**, pega:

```html
<script defer src="https://cdn.jsdelivr.net/gh/gerardvacascantero-hue/strong-race-widgets@v1.0.0/strong-race-widget.js"></script>
```

El script espera a que el `<div>` exista antes de montar, así que no importa que Framer inserte
el DOM después de hidratar React. Si al cabo de 10 s no lo encuentra, avisa por consola.

## Estructura

```
strong-race-widget.js     23 KB   IIFE: CSS, datos y lógica
assets/fonts/            297 KB   Panton 400 y 700 (.otf)
assets/hotels/           265 KB   3 imágenes
assets/pois/             1,9 MB   28 imágenes
```

Ningún fichero supera los 400 KB; el mayor es `fonts/panton-700.otf` (145 KB).

Las fuentes y las imágenes se sirven como ficheros reales, no como base64 embebido. Eso reduce
el JS de 3,4 MB a 23 KB, permite que el navegador las cachee entre visitas y hace que el
`loading="lazy"` de las imágenes de hotel funcione de verdad.

## Servir los assets desde otro origen

Por defecto el widget los busca en jsDelivr, en el tag fijado en la constante `A` del `.js`.
Para apuntarlos a otro sitio, define la variable **antes** de cargar el script:

```html
<script>window.SR_ASSETS_BASE = 'https://mi-cdn.com/strong-race/assets/';</script>
<script defer src=".../strong-race-widget.js"></script>
```

Debe acabar en barra. El origen tiene que enviar `Access-Control-Allow-Origin` para que las
fuentes `.otf` carguen (jsDelivr ya lo hace).

## Publicar cambios

jsDelivr cachea cada tag de forma inmutable. Si cambias assets o código, crea un tag nuevo y
actualiza tanto la constante `A` del `.js` como la URL del `<script>`:

```bash
git tag v1.0.1 && git push origin v1.0.1
```

## Dependencias

[Leaflet 1.9.4](https://leafletjs.com/) y sus tiles de CartoDB, cargados desde cdnjs bajo demanda.
