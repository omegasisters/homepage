import {h, render} from 'preact';

import SindanApp from '../sindan/SindanApp';

const sindanMount = document.querySelector('#sindan');
if (sindanMount) render(<SindanApp />, sindanMount);
