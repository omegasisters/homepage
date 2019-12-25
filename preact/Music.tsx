import {FunctionalComponent, h} from 'preact';
import {useEffect, useRef, useState} from 'preact/hooks';

// @ts-ignore
import scoped from 'scoped-style';
import youTubePlayer from 'youtube-player';

const styled = scoped(h);

const MusicPlayer: FunctionalComponent<{thumbs: string[]}> = ({thumbs}) => {
  const divRef = useRef<HTMLDivElement>();
  const youtubeRef = useRef<ReturnType<typeof youTubePlayer>>();
  const [playlist, setPlaylist] = useState(thumbs);

  const [move, setMove] = useState(0);

  useEffect(() => {
    (youtubeRef as any).current = youTubePlayer(divRef.current!, {
      width: window.innerWidth < 500 ? window.innerWidth - 100 : 500,
    });
    setMusic(playlist[0]);
    if (window.innerWidth > 769) {
      left();
    }
  }, []);

  const setMusic = (url: string) => {
    const id = url.replace('https://i.ytimg.com/vi/', '').split('/')[0];
    console.log(id);
    const youtube = youtubeRef.current;
    if (!youtube) return;
    youtube.loadVideoById(id);
    youtube.stopVideo();
  };

  const right = () => {
    const arr = [...playlist];
    if (arr.length > thumbs.length) arr.shift();
    setPlaylist([...arr, arr[0]]);

    setMove(180);
    setTimeout(() => setMove(0), 0);
  };

  const left = () => {
    const arr = [...playlist];
    if (arr.length > thumbs.length) arr.pop();
    setPlaylist([arr[arr.length - 1], ...arr]);

    setMove(-180);
    setTimeout(() => setMove(0), 0);
  };

  return (
    <div>
      <h3>
        <a
          href="https://www.youtube.com/watch?v=jis7E_mbwPw&list=PLjUYRJfqz5WsaAcHvdt6Qv5gaERy75fej"
          style={{textDecoration: 'none'}}
          target="_blank"
          rel="noopener noreferrer">
          🎵おめシスの歌ってみたシリーズ
        </a>
      </h3>
      <br />
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <Button className="fas fa-arrow-left" onClick={left} />
        <List>
          {playlist.map((url, i) => (
            <Card src={url} key={i} onClick={() => setMusic(url)} move={move} />
          ))}
        </List>
        <Button
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

const List = styled('div')`
  display: flex;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.5);
    border: none;
  }
`;

const Button = styled('div')`
  margin: auto;
  width: 50px;
  padding: 10px;
  cursor: pointer;

  @media (max-width: 769px) {
    display: none;
  }
`;

const Card = styled('img')`
  cursor: pointer;
  margin: 10px 5px;
  width: 200px;

  transition: ${(props: any) => (props.move === 0 ? `all 0.3s` : 'none')};
  transform: ${(props: any) => `translateX(${props.move - 180}px)`};
  @media (max-width: 769px) {
    transform: translateX(0px);
  }
`;
