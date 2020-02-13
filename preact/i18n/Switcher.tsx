import {Fragment, FunctionalComponent, h} from 'preact';
import {useCallback, useEffect, useRef, useState} from 'preact/hooks';

import I18n from './i18n';

const setLangClassToBody = (oldLang: string) => (newLang: string) => {
  const classname = document.body.classList;
  const prefix = 'lang-';
  classname.remove(`${prefix}${oldLang}`);
  classname.add(`${prefix}${newLang}`);
};

const Switcher: FunctionalComponent = () => {
  const [select, setSelect] = useState('ja');
  const [prev, setPrev] = useState('');
  const i18n = useRef(new I18n()).current;
  const setLanguage = useCallback(
    (s: string) => (_: any) => {
      return setSelect((selected) => {
        setPrev(selected);
        i18n.setLanguage(s);
        return s;
      });
    },
    [],
  );

  useEffect(() => {
    i18n.load();
  }, []);

  useEffect(() => {
    setLangClassToBody(prev)(select);
  }, [select, prev]);

  return (
    <Fragment>
      <li>
        <a
          class="drawer-dropdown-menu-item drawer-menu-item"
          onClick={setLanguage('ja')}>
          日本語
        </a>
      </li>
      <li>
        <a
          class="drawer-dropdown-menu-item drawer-menu-item"
          onClick={setLanguage('en')}>
          English
        </a>
      </li>
      <li>
        <a
          class="drawer-dropdown-menu-item drawer-menu-item"
          onClick={setLanguage('zh')}>
          中文
        </a>
      </li>
    </Fragment>
  );
};

export default Switcher;
