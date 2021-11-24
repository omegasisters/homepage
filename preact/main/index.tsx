import {h, render} from 'preact';
import MusicPlayer from './Music';
import Viewer from './Viewer';
import songsList from './playlists/songsList';

const appMount = document.querySelector('#preact-viewer');
if (appMount) render(<Viewer />, appMount);

const musicMount = document.querySelector('#preact-music');
if (musicMount) render(<MusicPlayer songsList={songsList} />, musicMount);

export default Viewer;
