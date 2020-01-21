import {Fragment, FunctionalComponent, h} from 'preact';
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
    <Fragment>
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
    </Fragment>
  );
};

const ClickSpan = styled('span')`
  cursor: ${({select}: any) => (select ? '' : 'pointer')};
  margin: 3px;
  opacity: ${({select}: any) => (select ? 1 : 0.4)};
`;

export default Switcher;
