import {h, render} from '/homepage/web_modules/preact.js';

import App from './App.js';
import MusicPlayer from './Music.js';

const appMount = document.querySelector('#preact');
if (appMount) render(<App />, appMount);

const musicMount = document.querySelector('#preact-music');
if (musicMount) render(<MusicPlayer />, musicMount);

export default App;
