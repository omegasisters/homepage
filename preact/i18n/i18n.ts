const base = process.env['BASE' as any] as string;

export default class I18n {
  language = 'ja';
  languageData: any;
  constructor(private onChange?: (lang: string) => void) {}

  async load() {
    const i18nFileData = await fetch(base + 'assets/i18n/resource.json');
    this.languageData = await i18nFileData.json();
    this.setLanguage('ja');
  }

  setLanguage(language: string) {
    const {languageData} = this;
    if (!languageData) return;

    this.language = language;
    if (this.onChange) this.onChange(language);

    Object.keys(languageData).forEach((id) => {
      const elm = document.getElementById(id);
      if (elm) elm.textContent = languageData[id][language];
    });
    (window as any).omesis_language = language;
  }
}
