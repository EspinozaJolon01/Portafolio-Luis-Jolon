// Fase lunar aproximada (precisión de ~medio día), suficiente para mostrarla.
const SYNODIC_MONTH = 29.530588853;
// Luna nueva de referencia: 6 de enero de 2000, 18:14 UTC
const REFERENCE_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);

export function getMoonPhase(date = new Date()) {
  const days = (date.getTime() - REFERENCE_NEW_MOON) / 86400000;
  const phase = (((days / SYNODIC_MONTH) % 1) + 1) % 1; // 0 = nueva, 0.5 = llena
  const illumination = (1 - Math.cos(2 * Math.PI * phase)) / 2;
  // 8 fases nombradas, centradas en 0, 1/8, 2/8...
  const index = Math.round(phase * 8) % 8;
  return { phase, illumination, index };
}

