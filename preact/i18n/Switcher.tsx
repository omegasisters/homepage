import {FunctionalComponent, h} from 'preact';
import {useCallback, useRef} from 'preact/hooks';

import I18n from './i18n';
// @ts-ignore
import scoped from 'scoped-style';

const styled = scoped(h);

const Switcher: FunctionalComponent = () => {
  const i18n = useRef(new I18n()).current;
  const setLanguage = useCallback(
    (s: string) => (_: any) => i18n.setLanguage(s),
    [i18n],
  );

  return (
    <div style={{display: 'flex'}}>
      <ClickSpan class="flag-icon flag-icon-jp" onClick={setLanguage('ja')} />
      <ClickSpan class="flag-icon flag-icon-gb" onClick={setLanguage('en')} />
      <ClickSpan class="flag-icon flag-icon-cn" onClick={setLanguage('cn')} />
    </div>
  );
};

const ClickSpan = styled('span')`
  cursor: pointer;
  margin: 3px;
`;

export default Switcher;
