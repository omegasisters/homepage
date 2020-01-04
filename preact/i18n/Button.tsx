import {FunctionalComponent, h} from 'preact';

import {useI18n} from '../hooks/i18n';

const Button: FunctionalComponent = () => {
  const i18n = useI18n();

  return (
    <div style={{display: 'flex'}}>
      <button>ja</button>
      <button onClick={() => i18n.setLanguage('en')}>en</button>
    </div>
  );
};

export default Button;
