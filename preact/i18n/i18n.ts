import {createContext, h} from 'preact';

export default class I18n {
  language = 'ja';
  json: any;
  constructor() {
    this.load();
  }

  async load() {
    const res = await fetch('./assets/i18n/resource.json');
    this.json = await res.json();
    this.setLanguage('ja');
  }

  setLanguage(language: string) {
    const {json} = this;
    if (!json) return;

    this.language = language;

    Object.keys(json).forEach((id) => {
      const elm = document.getElementById(id);
      if (elm) elm.textContent = json[id][language];
    });
  }
}
