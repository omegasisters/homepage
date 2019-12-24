import {FunctionalComponent, h} from 'preact';
import {useEffect, useRef, useState} from 'preact/hooks';

// @ts-ignore
import scoped from 'scoped-style';
import youTubePlayer from 'youtube-player';

const styled = scoped(h);

const MusicPlayer: FunctionalComponent<{thumbs: string[]}> = ({thumbs}) => {
  const divRef = useRef<HTMLDivElement>();
  const youtubeRef = useRef<ReturnType<typeof youTubePlayer>>();
  const [playlist, setPlaylist] = useState([
    thumbs[thumbs.length - 1],
    ...thumbs.slice(0, thumbs.length - 2),
  ]);

  const [move, setMove] = useState(0);

  useEffect(() => {
    (youtubeRef as any).current = youTubePlayer(divRef.current!, {
      width: window.innerWidth < 500 ? window.innerWidth - 100 : 500,
    });
    setMusic(playlist[1]);
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
    const shift = arr.shift();
    setPlaylist([...arr, shift!]);

    setMove(200);
    setTimeout(() => setMove(0), 0);
  };

  const left = () => {
    const arr = [...playlist];
    const pop = arr.pop();
    setPlaylist([pop!, ...arr]);

    setMove(-200);
    setTimeout(() => setMove(0), 0);
  };

  const leftEnd = [...playlist].pop()!;

  console.log(move);

  return (
    <div>
      <h3 class="section_title" id="section_discography">
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
          {playlist.map(
            (url, i) =>
              i < playlist.length && (
                <Card
                  src={url}
                  key={i}
                  onClick={() => setMusic(url)}
                  move={move}
                />
              ),
          )}
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
  padding: 10;
  cursor: pointer;

  @media (max-width: 769px) {
    display: none;
  }
`;

const Card = styled('img')`
  cursor: pointer;
  margin: 10px 5px;
  width: 200px;

  transition: ${(props: any) => (props.move === 0 ? `all .4s` : 'none')};
  transform: ${(props: any) => `translateX(${props.move - 180}px)`};
`;
