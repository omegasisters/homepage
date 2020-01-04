import {h, render} from 'preact';

import {I18nProvider} from '../hooks/i18n';
import Switcher from './Switcher';

const mount = document.querySelector('#preact-i18n');

if (mount)
  render(
    <I18nProvider>
      <Switcher />
    </I18nProvider>,
    mount,
  );
