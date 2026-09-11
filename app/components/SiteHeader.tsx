'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { assetPath, Locale, localeNames, localePath, locales, ui } from '@/app/content';

export function SiteHeader({ locale, suffix = '/' }: { locale: Locale; suffix?: string }) {
  const copy = ui[locale];
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);

  const switchLanguage = (event: React.MouseEvent<HTMLAnchorElement>, target: Locale) => {
    event.preventDefault();
    localStorage.setItem('portfolio-locale', target);
    window.location.assign(`${localePath(target, suffix)}${window.location.hash}`);
  };

  return (
    <header className="site-header">
      <Link className="wordmark" href={localePath(locale)} aria-label="Qinye Zhang home">
        <span>QZ</span><small>AI PRODUCT · 2026</small>
      </Link>
      <nav className="primary-nav" aria-label="Primary navigation">
        <Link href={`${localePath(locale)}#work`}>{copy.work}</Link>
        <Link href={`${localePath(locale)}#profile`}>{copy.profile}</Link>
        <a href={assetPath(locale === 'zh-cn' || locale === 'zh-hk' ? '/resume/qinye-zhang-zh-cn.pdf' : '/resume/qinye-zhang-en.pdf')} target="_blank" rel="noreferrer">{copy.resume}</a>
        <Link href={`${localePath(locale)}#contact`}>{copy.contact}</Link>
      </nav>
      <nav className="language-nav" aria-label="Language">
        {locales.map((item) => (
          <a key={item} href={localePath(item, suffix)} onClick={(event) => switchLanguage(event, item)} aria-current={item === locale ? 'page' : undefined}>
            {localeNames[item]}
          </a>
        ))}
      </nav>
    </header>
  );
}
