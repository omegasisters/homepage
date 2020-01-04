import {h, render} from 'preact';

import Button from './Button';
import {I18nProvider} from '../hooks/i18n';

const mount = document.querySelector('#preact-i18n');

if (mount)
  render(
    <I18nProvider>
      <Button />
    </I18nProvider>,
    mount,
  );
