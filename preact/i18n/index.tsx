import {h, render} from 'preact';

import Switcher from './Switcher';

const mount = document.querySelector('#preact-i18n');

if (mount) render(<Switcher />, mount);
