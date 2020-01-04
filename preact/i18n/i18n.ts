export default class I18n {
  language = 'ja';
  json: any;
  constructor(private onChange?: (lang: string) => void) {}

  async load() {
    const res = await fetch('./assets/i18n/resource.json');
    this.json = await res.json();
    this.setLanguage('ja');
  }

  setLanguage(language: string) {
    const {json} = this;
    if (!json) return;

    this.language = language;
    if (this.onChange) this.onChange(language);

    Object.keys(json).forEach((id) => {
      const elm = document.getElementById(id);
      if (elm) elm.textContent = json[id][language];
    });
  }
}
