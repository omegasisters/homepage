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
];
var Youtube = function() {
  var divRef = useRef();
  var youtubeRef = useRef();
  var _a = useState(thumbs),
    playlist = _a[0],
    setPlaylist = _a[1];
  useEffect(function() {
    youtubeRef.current = youTubePlayer(divRef.current, {
      width: 500,
      height: 500,
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
  var left = function() {
    var arr = __spreadArrays(playlist);
    var shift = arr.shift();
    setPlaylist(__spreadArrays(arr, [shift]));
  };
  var right = function() {
    var arr = __spreadArrays(playlist);
    var pop = arr.pop();
    setPlaylist(__spreadArrays([pop], arr));
  };
  return h(
    'div',
    null,
    h(
      'div',
      {
        style: {
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        },
      },
      h('div', {
        className: 'fas fa-arrow-left',
        onClick: left,
        style: {margin: 'auto', padding: 10, cursor: 'pointer'},
      }),
      h(
        List,
        null,
        playlist.map(function(url, i) {
          return h('img', {
            src: url,
            key: i,
            onClick: function() {
              var _a;
              setMusic(url);
              (_a = youtubeRef.current) === null || _a === void 0
                ? void 0
                : _a.playVideo();
            },
          });
        }),
      ),
      h('div', {
        className: 'fas fa-arrow-right',
        onClick: right,
        style: {margin: 'auto', padding: 10, cursor: 'pointer'},
      }),
    ),
    h('div', {ref: divRef}),
  );
};
export default Youtube;
var ArrowButton = styled('button')(
  templateObject_1 ||
    (templateObject_1 = __makeTemplateObject(
      [
        '\n  width: 0;\n  height: 0;\n  border-top: solid 15px transparent;\n  border-right: solid 15px transparent;\n  border-bottom: solid 15px transparent;\n  border-left: solid 15px #697b91;\n  margin: auto;\n',
      ],
      [
        '\n  width: 0;\n  height: 0;\n  border-top: solid 15px transparent;\n  border-right: solid 15px transparent;\n  border-bottom: solid 15px transparent;\n  border-left: solid 15px #697b91;\n  margin: auto;\n',
      ],
    )),
);
var RightButton = styled('button')(
  templateObject_2 || (templateObject_2 = __makeTemplateObject([''], [''])),
);
var List = styled('div')(
  templateObject_3 ||
    (templateObject_3 = __makeTemplateObject(
      ['\n  display: flex;\n  overflow: hidden;\n'],
      ['\n  display: flex;\n  overflow: hidden;\n'],
    )),
);
var Button = styled('button')(
  templateObject_4 ||
    (templateObject_4 = __makeTemplateObject(
      [
        '\n  background: gray;\n  border: none;\n  border-radius: 2px;\n  :hover,\n  :focus,\n  :active {\n    padding: 10px;\n  }\n  @media screen and (max-width: 640px) {\n    background: blue;\n    :hover,\n    :focus,\n    :active {\n      padding: 5px;\n    }\n  }\n',
      ],
      [
        '\n  background: gray;\n  border: none;\n  border-radius: 2px;\n  :hover,\n  :focus,\n  :active {\n    padding: 10px;\n  }\n  @media screen and (max-width: 640px) {\n    background: blue;\n    :hover,\n    :focus,\n    :active {\n      padding: 5px;\n    }\n  }\n',
      ],
    )),
);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
