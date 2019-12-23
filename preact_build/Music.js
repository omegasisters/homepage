var __makeTemplateObject =
  (this && this.__makeTemplateObject) ||
  function(cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, 'raw', {value: raw});
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
import {h} from '/homepage/web_modules/preact.js';
import {
  useEffect,
  useRef,
  useState,
} from '/homepage/web_modules/preact/hooks.js';
// @ts-ignore
import scoped from '/homepage/web_modules/scoped-style.js';
import youTubePlayer from '/homepage/web_modules/youtube-player.js';
var styled = scoped(h);
var thumbs = [
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
var MusicPlayer = function() {
  var divRef = useRef();
  var youtubeRef = useRef();
  var _a = useState(thumbs),
    playlist = _a[0],
    setPlaylist = _a[1];
  useEffect(function() {
    youtubeRef.current = youTubePlayer(divRef.current, {
      width: window.innerWidth < 500 ? window.innerWidth - 100 : 500,
    });
    setMusic(thumbs[0]);
  }, []);
  var setMusic = function(url) {
    var _a, _b;
    var id = url.replace('https://i.ytimg.com/vi/', '').split('/')[0];
    console.log(id);
    (_a = youtubeRef.current) === null || _a === void 0
      ? void 0
      : _a.loadVideoById(id);
    (_b = youtubeRef.current) === null || _b === void 0
      ? void 0
      : _b.stopVideo();
  };
  var right = function() {
    var arr = __spreadArrays(playlist);
    var shift = arr.shift();
    setPlaylist(__spreadArrays(arr, [shift]));
  };
  var left = function() {
    var arr = __spreadArrays(playlist);
    var pop = arr.pop();
    setPlaylist(__spreadArrays([pop], arr));
  };
  return h(
    'div',
    null,
    h('h2', null, '\u30C7\u30A3\u30B9\u30B3\u30B0\u30E9\u30D5\u30A3\u30FC'),
    h('br', null),
    h(
      'div',
      {
        style: {
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        },
      },
      h(Button, {className: 'fas fa-arrow-left', onClick: left}),
      h(
        List,
        null,
        playlist.map(function(url, i) {
          return h('img', {
            src: url,
            key: i,
            style: {cursor: 'pointer', margin: '10px 5px', height: 100},
            onClick: function() {
              return setMusic(url);
            },
          });
        }),
      ),
      h(Button, {
        className: 'fas fa-arrow-right',
        onClick: right,
        style: {margin: 'auto', padding: 10, cursor: 'pointer'},
      }),
    ),
    h('br', null),
    h('div', {ref: divRef}),
  );
};
export default MusicPlayer;
var List = styled('div')(
  templateObject_1 ||
    (templateObject_1 = __makeTemplateObject(
      [
        '\n  display: flex;\n  overflow-x: scroll;\n  ::-webkit-scrollbar {\n    width: 10px;\n    height: 10px;\n  }\n  ::-webkit-scrollbar-thumb {\n    background: rgba(255, 255, 255, 0.5);\n    border: none;\n  }\n',
      ],
      [
        '\n  display: flex;\n  overflow-x: scroll;\n  ::-webkit-scrollbar {\n    width: 10px;\n    height: 10px;\n  }\n  ::-webkit-scrollbar-thumb {\n    background: rgba(255, 255, 255, 0.5);\n    border: none;\n  }\n',
      ],
    )),
);
var Button = styled('div')(
  templateObject_2 ||
    (templateObject_2 = __makeTemplateObject(
      [
        '\n  margin: auto;\n  padding: 10;\n  cursor: pointer;\n\n  @media (max-width: 769px) {\n    display: none;\n  }\n',
      ],
      [
        '\n  margin: auto;\n  padding: 10;\n  cursor: pointer;\n\n  @media (max-width: 769px) {\n    display: none;\n  }\n',
      ],
    )),
);
var templateObject_1, templateObject_2;
