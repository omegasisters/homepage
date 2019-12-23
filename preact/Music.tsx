import {FunctionalComponent, h} from '/homepage/web_modules/preact.js';
import {
  useEffect,
  useRef,
  useState,
} from '/homepage/web_modules/preact/hooks.js';

// @ts-ignore
import scoped from '/homepage/web_modules/scoped-style.js';
import youTubePlayer from '/homepage/web_modules/youtube-player.js';

const styled = scoped(h);

const thumbs = [
  'https://i.ytimg.com/vi/jis7E_mbwPw/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLDhHYwioPk-hofibrZgnyP3gQA7Pw',
  'https://i.ytimg.com/vi/8q-Ny2a0GPM/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLDGolpXKf5loD2lBDHtcnES9iNFCQ',
  'https://i.ytimg.com/vi/FkyotXkl-CI/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBjgfB89PAmOqOQt0JjGg5_37iQoQ',
  'https://i.ytimg.com/vi/owl2ZtgDRHI/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLD0tcHy7wZ-zKyzx-Y7tKwT08BCYA',
  'https://i.ytimg.com/vi/-YLyVDOJnFc/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLApDrPcstG4CqzdMG7hTyQNfzNLpg',
  'https://i.ytimg.com/vi/3JAeD-9FE8I/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLA8x6yUUIJtL9ZlHSxvOFwIBjUsDw',
];

const MusicPlayer: FunctionalComponent = () => {
  const divRef = useRef<HTMLDivElement>();
  const youtubeRef = useRef<ReturnType<typeof youTubePlayer>>();
  const [playlist, setPlaylist] = useState(thumbs);

  useEffect(() => {
    (youtubeRef as any).current = youTubePlayer(divRef.current!, {
      width: 500,
      height: 500,
    });
    setMusic(thumbs[0]);
  }, []);

  const setMusic = (url: string) => {
    const id = url.replace('https://i.ytimg.com/vi/', '').split('/')[0];
    console.log(id);
    youtubeRef.current?.loadVideoById(id);
    youtubeRef.current?.stopVideo();
  };

  const left = () => {
    const arr = [...playlist];
    const shift = arr.shift();
    setPlaylist([...arr, shift!]);
  };

  const right = () => {
    const arr = [...playlist];
    const pop = arr.pop();
    setPlaylist([pop!, ...arr]);
  };

  return (
    <div>
      <h2>ディスコグラフィー</h2>
      <br />
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <div
          className="fas fa-arrow-left"
          onClick={left}
          style={{margin: 'auto', padding: 10, cursor: 'pointer'}}
        />
        <List>
          {playlist.map((url, i) => (
            <img
              src={url}
              key={i}
              style={{cursor: 'pointer', margin: '0px 5px'}}
              onClick={() => {
                setMusic(url);
                youtubeRef.current?.playVideo();
              }}
            />
          ))}
        </List>
        <div
          className="fas fa-arrow-right"
          onClick={right}
          style={{margin: 'auto', padding: 10, cursor: 'pointer'}}
        />
      </div>
      <br />
      <div ref={divRef} />
    </div>
  );
};

export default MusicPlayer;

const ArrowButton = styled('button')`
  width: 0;
  height: 0;
  border-top: solid 15px transparent;
  border-right: solid 15px transparent;
  border-bottom: solid 15px transparent;
  border-left: solid 15px #697b91;
  margin: auto;
`;

const RightButton = styled('button')``;
const List = styled('div')`
  display: flex;
  overflow: hidden;
`;

const Button = styled('button')`
  background: gray;
  border: none;
  border-radius: 2px;
  :hover,
  :focus,
  :active {
    padding: 10px;
  }
  @media screen and (max-width: 640px) {
    background: blue;
    :hover,
    :focus,
    :active {
      padding: 5px;
    }
  }
`;
