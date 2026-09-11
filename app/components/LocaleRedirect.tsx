'use client';

import { useEffect } from 'react';
import { basePath, Locale, localePath } from '@/app/content';

export function LocaleRedirect() {
  useEffect(() => {
    const stored = localStorage.getItem('portfolio-locale') as Locale | null;
    const language = navigator.language.toLowerCase();
    const detected: Locale = stored ?? (language.startsWith('zh-hk') || language.startsWith('zh-tw') ? 'zh-hk' : language.startsWith('zh') ? 'zh-cn' : language.startsWith('ja') ? 'ja' : 'en');
    const rootPaths = ['/', `${basePath}/`];
    if (detected !== 'en' && rootPaths.includes(window.location.pathname)) window.location.replace(`${basePath}${localePath(detected)}`);
  }, []);
  return null;
}
