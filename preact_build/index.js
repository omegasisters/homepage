import {h, render} from '/homepage/web_modules/preact.js';
import App from './App.js';
import MusicPlayer from './Music.js';
var appMount = document.querySelector('#preact');
if (appMount) render(h(App, null), appMount);
var musicMount = document.querySelector('#preact-music');
if (musicMount) render(h(MusicPlayer, null), musicMount);
export default App;
