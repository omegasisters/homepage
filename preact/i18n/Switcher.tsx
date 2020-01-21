import {FunctionalComponent, h} from 'preact';
import {useCallback, useEffect, useRef, useState} from 'preact/hooks';

import I18n from './i18n';
// @ts-ignore
import scoped from 'scoped-style';

const styled = scoped(h);

const Switcher: FunctionalComponent = () => {
  const [select, setSelect] = useState('ja');
  const i18n = useRef(new I18n(setSelect)).current;
  const setLanguage = useCallback(
    (s: string) => (_: any) => i18n.setLanguage(s),
    [],
  );

  useEffect(() => {
    i18n.load();
  }, []);

  return (
    <li class="drawer-dropdown">
      <a
        class="drawer-menu-item"
        data-toggle="dropdown"
        role="button"
        aria-expanded="false">
        <div style="display: inline;">Language</div>

        <span class="drawer-caret"></span>
      </a>
      <ul class="drawer-dropdown-menu">
        <li>
          <a class="drawer-dropdown-menu-item" onClick={setLanguage('ja')}>
            日本語
          </a>
        </li>
        <li>
          <a class="drawer-dropdown-menu-item" onClick={setLanguage('en')}>
            English
          </a>
        </li>
        <li>
          <a class="drawer-dropdown-menu-item" onClick={setLanguage('zh')}>
            中文
          </a>
        </li>
      </ul>
    </li>
  );
};

const ClickSpan = styled('span')`
  cursor: ${({select}: any) => (select ? '' : 'pointer')};
  margin: 3px;
  opacity: ${({select}: any) => (select ? 1 : 0.4)};
`;

export default Switcher;
