# Portafolio de Luis Jolón

Portafolio personal de **José Luis Espinoza Jolón**, estudiante de Ingeniería en Sistemas en la Universidad de San Carlos de Guatemala (USAC).

> El esfuerzo se refleja en cada proyecto.

**Sitio:** https://espinozajolon01.github.io/Portafolio-Luis-Jolon/

## Diseño

El sitio tiene un tema de astronomía:

- Un cielo nocturno con mi propia foto de la luna, estrellas que titilan con paralaje y estrellas fugaces.
- La fase lunar del día, calculada en vivo.
- Las habilidades presentadas como constelaciones.
- Un cursor en forma de estrella (solo en dispositivos con mouse).

Es bilingüe (español / inglés) y respeta la preferencia de "reducir movimiento" del sistema.

## Tecnologías

- React 19
- Vite 8
- CSS Modules
- GitHub Pages (con `gh-pages`)

## Desarrollo

```bash
npm install
npm run dev       # servidor local
npm run build     # build de producción en dist/
npm run preview   # previsualizar el build
npm run check:i18n  # verifica que el inglés y el español estén completos
npm run deploy    # verifica traducciones, compila y publica en GitHub Pages
```

## Editar el contenido

Todo el texto vive en `src/data/content.js`:

| Qué | Dónde |
| --- | --- |
| Datos personales y enlaces | `PROFILE` |
| Tecnologías por categoría | `SKILLS` |
| Proyectos | `PROJECTS` |
| Textos de la interfaz (ES / EN) | `I18N` |

Para cambiar la forma de una constelación, edita `SHAPES` en `src/components/Skills.jsx`. Si agregas una tecnología sin ajustar la forma, la nueva estrella se acomoda sola.
