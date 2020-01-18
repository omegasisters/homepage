import {useEffect, useRef, PropRef} from 'preact/hooks';

export function useI18n(sets: [PropRef<HTMLDivElement>, string][]) {
  const languageDataRef = useRef<any>(null);

  useEffect(() => {
    const load = async () => {
      const i18nFileData = await fetch('./assets/i18n/resource.json');
      languageDataRef.current = await i18nFileData.json();
    };
    load();
  }, []);

  const getText = (id: string) => {
    const languageData = languageDataRef.current;
    if (!languageData) return;
    const language = (window as any).omesis_language || 'ja';

    return languageData[id][language];
  };

  useEffect(() => {
    sets.forEach(([ref, id]) => {
      if (ref.current) {
        const elm = ref.current;
        const text = getText(id);
        elm.textContent = text;
      }
    });
  });
}
