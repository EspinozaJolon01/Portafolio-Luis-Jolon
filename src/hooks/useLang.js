import { useState } from 'react';
import { I18N } from '../data/content';

export function useLang() {
  const [lang, setLang] = useState('en');
  const t = (key) => I18N[lang][key] ?? key;
  return { lang, setLang, t };
}