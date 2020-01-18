import {h, render} from 'preact';

import MusicPlayer from './Music';
import Viewer from './Viewer';

const appMount = document.querySelector('#preact-viewer');
if (appMount) render(<Viewer />, appMount);

const musicMount = document.querySelector('#preact-music');
if (musicMount)
  render(
    <MusicPlayer
      thumbs={[
        'https://i.ytimg.com/vi/jis7E_mbwPw/hqdefault.jpg',
        'https://i.ytimg.com/vi/8q-Ny2a0GPM/hqdefault.jpg',
        'https://i.ytimg.com/vi/FkyotXkl-CI/hqdefault.jpg',
        'https://i.ytimg.com/vi/owl2ZtgDRHI/hqdefault.jpg',
        'https://i.ytimg.com/vi/-YLyVDOJnFc/hqdefault.jpg',
        'https://i.ytimg.com/vi/3JAeD-9FE8I/hqdefault.jpg',
        'https://i.ytimg.com/vi/KQPr8Qde22w/hqdefault.jpg',
        'https://i.ytimg.com/vi/IfYODh82hTo/hqdefault.jpg',
        'https://i.ytimg.com/vi/abDwOIMcBEw/hqdefault.jpg',
        'https://i.ytimg.com/vi/gXhqIT7XnsI/hqdefault.jpg',
        'https://i.ytimg.com/vi/VBpXOOPK6-E/hqdefault.jpg',
        'https://i.ytimg.com/vi/_AcOHoF68vo/hqdefault.jpg',
        'https://i.ytimg.com/vi/s9IvNnu0kqc/hqdefault.jpg',
        'https://i.ytimg.com/vi/FVfim9jNQVg/hqdefault.jpg',
        'https://i.ytimg.com/vi/sYNL6WlW-e8/hqdefault.jpg',
        'https://i.ytimg.com/vi/pSBk3QVY3cA/hqdefault.jpg',
        'https://i.ytimg.com/vi/b0nF7oUbsfg/hqdefault.jpg',
        'https://i.ytimg.com/vi/9Ppv1wvwHXI/hqdefault.jpg',
        'https://i.ytimg.com/vi/58al_aq_E2M/hqdefault.jpg',
        'https://i.ytimg.com/vi/XAt2lODxz_E/hqdefault.jpg',
        'https://i.ytimg.com/vi/58TGnNnXT6E/hqdefault.jpg',
      ]}
    />,
    musicMount,
  );

export default Viewer;
