import {FunctionalComponent, h} from 'preact';
import {useEffect, useRef, useState} from 'preact/hooks';

// @ts-ignore
import scoped from 'scoped-style';
import youTubePlayer from 'youtube-player';

const styled = scoped(h);

const thumbs = [
  'https://i.ytimg.com/vi/jis7E_mbwPw/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLDhHYwioPk-hofibrZgnyP3gQA7Pw',
  'https://i.ytimg.com/vi/8q-Ny2a0GPM/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLDGolpXKf5loD2lBDHtcnES9iNFCQ',
  'https://i.ytimg.com/vi/FkyotXkl-CI/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBjgfB89PAmOqOQt0JjGg5_37iQoQ',
  'https://i.ytimg.com/vi/owl2ZtgDRHI/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLD0tcHy7wZ-zKyzx-Y7tKwT08BCYA',
  'https://i.ytimg.com/vi/-YLyVDOJnFc/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLApDrPcstG4CqzdMG7hTyQNfzNLpg',
  'https://i.ytimg.com/vi/3JAeD-9FE8I/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLA8x6yUUIJtL9ZlHSxvOFwIBjUsDw',
  'https://i.ytimg.com/vi/KQPr8Qde22w/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBjH8nBGhQlFL2ydqyJuEe0NBJ_7A',
  'https://i.ytimg.com/vi/IfYODh82hTo/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLDLrSuU4eehrghGgAVZDk-cXuYbqg',
  'https://i.ytimg.com/vi/abDwOIMcBEw/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLC0KlSAnzL_nktfx7qf7KiVCHgERg',
  'https://i.ytimg.com/vi/gXhqIT7XnsI/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBxUvSYmAYG8ei-qCtF5aqf1S2jLg',
  'https://i.ytimg.com/vi/VBpXOOPK6-E/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLAcElqEouylVK7a274rD5bRPnlhpA',
  'https://i.ytimg.com/vi/_AcOHoF68vo/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLDeJGN6g9KEQsiyh0eLw29aKjq65Q',
  'https://i.ytimg.com/vi/s9IvNnu0kqc/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLAfjZkueF2Vl9L7GJqWfBYXLpaUMA',
  'https://i.ytimg.com/vi/FVfim9jNQVg/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLCHSMjzh5CXh8yoZ97PjjYK_710yg',
  'https://i.ytimg.com/vi/sYNL6WlW-e8/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLDqlwkXtOtcqWR5aSY6AvEM2qpqZA',
  'https://i.ytimg.com/vi/pSBk3QVY3cA/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLAFgQVWgVeexxg56nvSdUh3F1pAxQ',
  'https://i.ytimg.com/vi/b0nF7oUbsfg/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBwwRzQaO2eRKNpPuxZAE3FrLGDrQ',
  'https://i.ytimg.com/vi/9Ppv1wvwHXI/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLC3s7BDFQoyRVLG70rB5H9IglQW4A',
  'https://i.ytimg.com/vi/58al_aq_E2M/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLAqQGYzz8issfnlAXWpd4xPSImxZg',
  'https://i.ytimg.com/vi/XAt2lODxz_E/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLDgKjhUDjVllfbHbVi9ScF496cuYw',
  'https://i.ytimg.com/vi/58TGnNnXT6E/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLD36841bBz6htYcX_bJr_Ii_xmpRg',
];

const MusicPlayer: FunctionalComponent = () => {
  const divRef = useRef<HTMLDivElement>();
  const youtubeRef = useRef<ReturnType<typeof youTubePlayer>>();
  const [playlist, setPlaylist] = useState(thumbs);

  useEffect(() => {
    (youtubeRef as any).current = youTubePlayer(divRef.current!, {
      width: window.innerWidth < 500 ? window.innerWidth - 100 : 500,
    });
    setMusic(thumbs[0]);
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
  };

  const left = () => {
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
        <Button className="fas fa-arrow-left" onClick={left} />
        <List>
          {playlist.map((url, i) => (
            <img
              src={url}
              key={i}
              style={{cursor: 'pointer', margin: '10px 5px', height: 100}}
              onClick={() => setMusic(url)}
            />
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
  padding: 10;
  cursor: pointer;

  @media (max-width: 769px) {
    display: none;
  }
`;
