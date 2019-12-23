import {h, render} from 'preact';

import App from './App';
import MusicPlayer from './Music';

const appMount = document.querySelector('#preact');
if (appMount) render(<App />, appMount);

const musicMount = document.querySelector('#preact-music');
if (musicMount) render(<MusicPlayer />, musicMount);

export default App;
