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
  const [selected, setSelect] = useState('');
  const [move, setMove] = useState(0);

  useEffect(() => {
    (youtubeRef as any).current = youTubePlayer(divRef.current!, {
      width: window.innerWidth < 500 ? window.innerWidth - (100 + 10 * 2) : 500,
    });
    setSelect(playlist[0]);
    if (window.innerWidth > 769) {
      left();
    }
  }, []);

  useEffect(() => {
    const id = selected.replace('https://i.ytimg.com/vi/', '').split('/')[0];
    const youtube = youtubeRef.current;
    if (!youtube) return;
    youtube.loadVideoById(id);
    youtube.stopVideo();
  }, [selected]);

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
    <div style={{background: 'rgba(0 0 0 / 0.2)', padding: 10}}>
      <h3>
        <a
          href="https://www.youtube.com/watch?v=jis7E_mbwPw&list=PLjUYRJfqz5WsaAcHvdt6Qv5gaERy75fej"
          target="_blank"
          rel="noopener noreferrer"
          id="preact-music__title"></a>
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
            <Card
              key={i}
              onClick={() => setSelect(url)}
              move={move}
              select={url === selected}>
              <picture>
                <source type="image/webp" srcset={url} />
                <img src={url.split('?')[0]} width={175} />
              </picture>
              <PlayButton
                className="fas fa-play-circle"
                select={url === selected}
              />
            </Card>
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

const Card = styled('div')`
  cursor: ${(props: any) => (props.select ? 'default' : 'pointer')};
  margin: 10px 5px;
  width: 200px;

  transition: ${(props: any) => (props.move === 0 ? `all 0.3s` : 'none')};
  @media (min-width: 769px) {
    transform: ${(props: any) => `translateX(${props.move - 180}px)`};
  }
  @media (max-width: 769px) {
    transform: translateX(0px);
  }

  :hover > i {
    visibility: visible;
  }
`;

const PlayButton = styled('i')`
  position: absolute;
  top: 70px;
  right: 0px;
  color: black;
  opacity: 0.8;
  visibility: ${(props: any) => (props.select ? 'visible' : 'hidden')};
`;
