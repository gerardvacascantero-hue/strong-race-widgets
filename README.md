# strong-race-widgets

Widget autocontenido de **Strong Race** (Palma de Mallorca): hoteles con descuento y mapa de puntos de interés.

## Estructura

Los activos pesados (fuentes e imágenes) se sirven como ficheros reales desde jsDelivr, no incrustados en base64. Así ningún fichero supera los ~150 KB y el JS principal es minúsculo.

```
strong-race-widget.js        # 18 KB · lógica + CSS + HTML del widget
assets/
  panton-bold.otf            # fuente Panton 700
  panton-regular.otf         # fuente Panton 400
  img/                       # 10 imágenes .jpg (hoteles + puntos de interés)
```

El JS referencia los activos por URL absoluta de jsDelivr, apuntando a este mismo repo:

```
https://cdn.jsdelivr.net/gh/gerardvacascantero-hue/strong-race-widgets@main/assets/...
```

## Uso

Pega el contenido de `strong-race-widget.js` dentro de una etiqueta `<script>` en tu página, o cárgalo por URL:

```html
<script src="https://cdn.jsdelivr.net/gh/gerardvacascantero-hue/strong-race-widgets@main/strong-race-widget.js"></script>
```

Las fuentes y las imágenes se descargan automáticamente desde el CDN, así que funciona pegándolo en cualquier web sin subir archivos adicionales.

> **Nota:** las URLs usan `@main`. Si quieres fijar una versión concreta (y aprovechar mejor la caché del CDN), sustituye `@main` por un tag de git, p. ej. `@v1.0.0`.
