// Verifica que el inglés y el español estén completos y que no quede español en la versión en inglés.
// Uso: npm run check:i18n  (también corre automáticamente antes de npm run deploy)
import { I18N, PROJECTS } from '../src/data/content.js';

const { en, es } = I18N;
const problems = [];

for (const k of Object.keys(es)) if (!(k in en)) problems.push(`Falta en EN: ${k}`);
for (const k of Object.keys(en)) if (!(k in es)) problems.push(`Falta en ES: ${k}`);
for (const k of Object.keys(en)) {
  if (Array.isArray(en[k]) && en[k].length !== es[k]?.length) problems.push(`Listas de distinto largo: ${k}`);
}

for (const p of PROJECTS) {
  for (const f of ['title', 'desc', 'long', 'features']) {
    if (!p[`${f}_en`] || !p[`${f}_es`]) problems.push(`Proyecto ${p.id}: falta ${f}_en o ${f}_es`);
    if (Array.isArray(p[`${f}_en`]) && p[`${f}_en`].length !== p[`${f}_es`]?.length) {
      problems.push(`Proyecto ${p.id}: ${f} con distinta cantidad de elementos`);
    }
  }
}

// Palabras en español que no deberían aparecer en el texto en inglés
const SPANISH = /\b(de|del|el|los|las|una|para|con|proyecto|semestre|correo|habilidades|pensum|beca)\b|[ñ¿¡]/i;
// Nombres propios permitidos
const ALLOWED = /Universidad|Redes Nacionales|Conexiones Futuras|Telecom Uno|Instituto Guatemalteco Americano|Jolón/g;
const scan = (label, value) =>
  [].concat(value).forEach((s) => {
    if (typeof s === 'string' && SPANISH.test(s.replace(ALLOWED, ''))) {
      problems.push(`Posible español en EN (${label}): "${s.slice(0, 70)}"`);
    }
  });

for (const [k, v] of Object.entries(en)) scan(k, v);
for (const p of PROJECTS) for (const f of ['title', 'desc', 'long', 'features']) scan(`${p.id}.${f}`, p[`${f}_en`]);

if (problems.length) {
  console.error('Problemas de traducción:\n- ' + problems.join('\n- '));
  process.exit(1);
}
console.log(`Traducciones OK: ${Object.keys(en).length} textos y ${PROJECTS.length} proyectos en ES y EN.`);
