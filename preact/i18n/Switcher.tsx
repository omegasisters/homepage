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
    <div style={{display: 'flex'}}>
      <ClickSpan
        class="flag-icon flag-icon-jp"
        onClick={setLanguage('ja')}
        select={select === 'ja'}
      />
      <ClickSpan
        class="flag-icon flag-icon-gb"
        onClick={setLanguage('en')}
        select={select === 'en'}
      />
      <ClickSpan
        class="flag-icon flag-icon-cn"
        onClick={setLanguage('cn')}
        select={select === 'cn'}
      />
    </div>
  );
};

const ClickSpan = styled('span')`
  cursor: ${(props: any) => (props.select ? '' : 'pointer')};
  margin: 3px;
  opacity: ${(props: any) => (props.select ? 1 : 0.4)};
`;

export default Switcher;
