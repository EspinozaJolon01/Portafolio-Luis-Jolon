import { useEffect, useState } from 'react';
import { I18N } from '../data/content';

const STORAGE_KEY = 'portfolio-lang';

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && I18N[saved]) return saved;
  } catch { /* almacenamiento no disponible */ }
  const browser = (navigator.language || 'es').slice(0, 2);
  return I18N[browser] ? browser : 'es';
}

export function useLang() {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = I18N[lang].doc_title;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignorar */ }
  }, [lang]);

  const t = (key) => I18N[lang][key] ?? key;
  return { lang, setLang, t };
}
