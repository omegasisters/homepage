import {FunctionalComponent, h} from 'preact';
import {useEffect, useRef, useState, useMemo} from 'preact/hooks';
import {songListProps} from './playlists/songsList';

// @ts-ignore
import scoped from 'scoped-style';
import youTubePlayer from 'youtube-player';

const styled = scoped(h);

const getYouTubeThumbnail = (videoID: string) => (
  extension: string = 'webp',
) => {
  const api = extension === 'webp' ? 'vi_webp' : 'vi';
  return `https://i.ytimg.com/${api}/${videoID}/hqdefault.${extension}`;
};

const ThumbSize = 175;

const Card: FunctionalComponent<{
  videoID: string;
  videoTitle: string;
  isSelected: boolean;
  move: number;
  onClick: () => void;
}> = ({videoID, videoTitle, isSelected, move, onClick}) => {
  const thumb = useMemo(() => {
    return {
      webp: getYouTubeThumbnail(videoID)('webp'),
      jpg: getYouTubeThumbnail(videoID)('jpg'),
    };
  }, [videoID]);

  return (
    <CardItem
      onClick={onClick}
      move={move}
      select={isSelected}
      title={videoTitle}>
      <picture>
        <source type="image/webp" srcset={thumb.webp} />
        <img src={thumb.jpg} alt={videoTitle} width={ThumbSize} />
      </picture>
      <PlayButton className="fas fa-play-circle" select={isSelected} />
    </CardItem>
  );
};

const MusicPlayer: FunctionalComponent<{songsList: songListProps}> = ({
  songsList,
}) => {
  const divRef = useRef<HTMLDivElement>();
  const youtubeRef = useRef<ReturnType<typeof youTubePlayer>>();
  const [playlist, setPlaylist] = useState(songsList);
  const [selected, setSelect] = useState('');
  const [move, setMove] = useState(0);

  useEffect(() => {
    (youtubeRef as any).current = youTubePlayer(divRef.current!, {
      width: window.innerWidth < 600 ? window.innerWidth - (100 + 10 * 2) : 500,
    });
    setSelect(playlist[0].videoID);
    if (window.innerWidth > 769) {
      left();
    }
  }, []);

  useEffect(() => {
    const id = selected;
    const youtube = youtubeRef.current;
    if (!youtube) return;
    youtube.loadVideoById(id);
    youtube.stopVideo();
  }, [selected]);

  const right = () => {
    const arr = [...playlist];
    if (arr.length > songsList.length) arr.shift();
    setPlaylist([...arr, arr[0]]);

    setMove(180);
    setTimeout(() => setMove(0), 0);
  };

  const left = () => {
    const arr = [...playlist];
    if (arr.length > songsList.length) arr.pop();
    setPlaylist([arr[arr.length - 1], ...arr]);

    setMove(-180);
    setTimeout(() => setMove(0), 0);
  };

  const cardList = playlist.map((videoData) => {
    const videoID = videoData.videoID;
    return (
      <Card
        key={videoID}
        videoID={videoID}
        videoTitle={videoData.title}
        isSelected={videoID === selected}
        move={move}
        onClick={() => setSelect(videoID)}
      />
    );
  });

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
        <List>{cardList}</List>
        <Button
          className="fas fa-arrow-right"
          onClick={right}
          style={{margin: 'auto', padding: 10, cursor: 'pointer'}}
        />
      </div>
      <br />
      <div className="video_box">
        <div className="video_wrapper">
          <div ref={divRef} />
        </div>
      </div>
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

const CardItem = styled('div')`
  cursor: ${(props: any) => (props.select ? 'default' : 'pointer')};
  margin: 10px 5px;
  width: 200px;
  transition: ${(props: any) => (props.move === 0 ? `all 0.3s` : 'none')};
  ${(props: any) => props.select && `opacity: .8;`}

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
