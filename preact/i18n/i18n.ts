export default class I18n {
  language = 'ja';
  languageDatas: any;
  constructor(private onChange?: (lang: string) => void) {}

  async load() {
    const i18nFileDatas = await fetch('./assets/i18n/resource.json');
    this.languageDatas = await i18nFileDatas.json();
    this.setLanguage('ja');
  }

  setLanguage(language: string) {
    const {languageDatas} = this;
    if (!languageDatas) return;

    this.language = language;
    if (this.onChange) this.onChange(language);

    Object.keys(languageDatas).forEach((id) => {
      const elm = document.getElementById(id);
      if (elm) elm.textContent = languageDatas[id][language];
    });
  }
}
