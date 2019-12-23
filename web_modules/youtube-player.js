import {
  c as createCommonjsModule,
  u as unwrapExports,
} from './common/_commonjsHelpers-6a48b99e.js';

var Sister;

/**
 * @link https://github.com/gajus/sister for the canonical source repository
 * @license https://github.com/gajus/sister/blob/master/LICENSE BSD 3-Clause
 */
Sister = function() {
  var sister = {},
    events = {};

  /**
   * @name handler
   * @function
   * @param {Object} data Event data.
   */

  /**
   * @param {String} name Event name.
   * @param {handler} handler
   * @return {listener}
   */
  sister.on = function(name, handler) {
    var listener = {name: name, handler: handler};
    events[name] = events[name] || [];
    events[name].unshift(listener);
    return listener;
  };

  /**
   * @param {listener}
   */
  sister.off = function(listener) {
    var index = events[listener.name].indexOf(listener);

    if (index !== -1) {
      events[listener.name].splice(index, 1);
    }
  };

  /**
   * @param {String} name Event name.
   * @param {Object} data Event data.
   */
  sister.trigger = function(name, data) {
    var listeners = events[name],
      i;

    if (listeners) {
      i = listeners.length;
      while (i--) {
        listeners[i].handler(data);
      }
    }
  };

  return sister;
};

var sister = Sister;

var loadScript = function load(src, opts, cb) {
  var head = document.head || document.getElementsByTagName('head')[0];
  var script = document.createElement('script');

  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  opts = opts || {};
  cb = cb || function() {};

  script.type = opts.type || 'text/javascript';
  script.charset = opts.charset || 'utf8';
  script.async = 'async' in opts ? !!opts.async : true;
  script.src = src;

  if (opts.attrs) {
    setAttributes(script, opts.attrs);
  }

  if (opts.text) {
    script.text = '' + opts.text;
  }

  var onend = 'onload' in script ? stdOnEnd : ieOnEnd;
  onend(script, cb);

  // some good legacy browsers (firefox) fail the 'in' detection above
  // so as a fallback we always set onload
  // old IE will ignore this and new IE will set onload
  if (!script.onload) {
    stdOnEnd(script, cb);
  }

  head.appendChild(script);
};

function setAttributes(script, attrs) {
  for (var attr in attrs) {
    script.setAttribute(attr, attrs[attr]);
  }
}

function stdOnEnd(script, cb) {
  script.onload = function() {
    this.onerror = this.onload = null;
    cb(null, script);
  };
  script.onerror = function() {
    // this.onload = null here is necessary
    // because even IE9 works not like others
    this.onerror = this.onload = null;
    cb(new Error('Failed to load ' + this.src), script);
  };
}

function ieOnEnd(script, cb) {
  script.onreadystatechange = function() {
    if (this.readyState != 'complete' && this.readyState != 'loaded') return;
    this.onreadystatechange = null;
    cb(null, script); // there is no way to catch loading errors in IE8
  };
}

var loadYouTubeIframeApi = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, '__esModule', {
    value: true,
  });

  var _loadScript2 = _interopRequireDefault(loadScript);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }

  exports.default = function(emitter) {
    /**
     * A promise that is resolved when window.onYouTubeIframeAPIReady is called.
     * The promise is resolved with a reference to window.YT object.
     */
    var iframeAPIReady = new Promise(function(resolve) {
      if (
        window.YT &&
        window.YT.Player &&
        window.YT.Player instanceof Function
      ) {
        resolve(window.YT);

        return;
      } else {
        var protocol =
          window.location.protocol === 'http:' ? 'http:' : 'https:';

        (0, _loadScript2.default)(
          protocol + '//www.youtube.com/iframe_api',
          function(error) {
            if (error) {
              emitter.trigger('error', error);
            }
          },
        );
      }

      var previous = window.onYouTubeIframeAPIReady;

      // The API will call this function when page has finished downloading
      // the JavaScript for the player API.
      window.onYouTubeIframeAPIReady = function() {
        if (previous) {
          previous();
        }

        resolve(window.YT);
      };
    });

    return iframeAPIReady;
  };

  module.exports = exports['default'];
});

unwrapExports(loadYouTubeIframeApi);

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

var ms = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val),
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str,
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return (
    plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms'
  );
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}

var debug = createCommonjsModule(function(module, exports) {
  /**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = createDebug.debug = createDebug[
    'default'
  ] = createDebug;
  exports.coerce = coerce;
  exports.disable = disable;
  exports.enable = enable;
  exports.enabled = enabled;
  exports.humanize = ms;

  /**
   * The currently active debug mode names, and names to skip.
   */

  exports.names = [];
  exports.skips = [];

  /**
   * Map of special "%n" handling functions, for the debug "format" argument.
   *
   * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
   */

  exports.formatters = {};

  /**
   * Previous log timestamp.
   */

  var prevTime;

  /**
   * Select a color.
   * @param {String} namespace
   * @return {Number}
   * @api private
   */

  function selectColor(namespace) {
    var hash = 0,
      i;

    for (i in namespace) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return exports.colors[Math.abs(hash) % exports.colors.length];
  }

  /**
   * Create a debugger with the given `namespace`.
   *
   * @param {String} namespace
   * @return {Function}
   * @api public
   */

  function createDebug(namespace) {
    function debug() {
      // disabled?
      if (!debug.enabled) return;

      var self = debug;

      // set `diff` timestamp
      var curr = +new Date();
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;

      // turn the `arguments` into a proper Array
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }

      args[0] = exports.coerce(args[0]);

      if ('string' !== typeof args[0]) {
        // anything else let's inspect with %O
        args.unshift('%O');
      }

      // apply any `formatters` transformations
      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
        // if we encounter an escaped % then don't increase the array index
        if (match === '%%') return match;
        index++;
        var formatter = exports.formatters[format];
        if ('function' === typeof formatter) {
          var val = args[index];
          match = formatter.call(self, val);

          // now we need to remove `args[index]` since it's inlined in the `format`
          args.splice(index, 1);
          index--;
        }
        return match;
      });

      // apply env-specific formatting (colors, etc.)
      exports.formatArgs.call(self, args);

      var logFn = debug.log || exports.log || console.log.bind(console);
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = exports.enabled(namespace);
    debug.useColors = exports.useColors();
    debug.color = selectColor(namespace);

    // env-specific initialization logic for debug instances
    if ('function' === typeof exports.init) {
      exports.init(debug);
    }

    return debug;
  }

  /**
   * Enables a debug mode by namespaces. This can include modes
   * separated by a colon and wildcards.
   *
   * @param {String} namespaces
   * @api public
   */

  function enable(namespaces) {
    exports.save(namespaces);

    exports.names = [];
    exports.skips = [];

    var split = (typeof namespaces === 'string' ? namespaces : '').split(
      /[\s,]+/,
    );
    var len = split.length;

    for (var i = 0; i < len; i++) {
      if (!split[i]) continue; // ignore empty strings
      namespaces = split[i].replace(/\*/g, '.*?');
      if (namespaces[0] === '-') {
        exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        exports.names.push(new RegExp('^' + namespaces + '$'));
      }
    }
  }

  /**
   * Disable debug output.
   *
   * @api public
   */

  function disable() {
    exports.enable('');
  }

  /**
   * Returns true if the given mode name is enabled, false otherwise.
   *
   * @param {String} name
   * @return {Boolean}
   * @api public
   */

  function enabled(name) {
    var i, len;
    for (i = 0, len = exports.skips.length; i < len; i++) {
      if (exports.skips[i].test(name)) {
        return false;
      }
    }
    for (i = 0, len = exports.names.length; i < len; i++) {
      if (exports.names[i].test(name)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Coerce `val`.
   *
   * @param {Mixed} val
   * @return {Mixed}
   * @api private
   */

  function coerce(val) {
    if (val instanceof Error) return val.stack || val.message;
    return val;
  }
});
var debug_1 = debug.coerce;
var debug_2 = debug.disable;
var debug_3 = debug.enable;
var debug_4 = debug.enabled;
var debug_5 = debug.humanize;
var debug_6 = debug.names;
var debug_7 = debug.skips;
var debug_8 = debug.formatters;

var browser = createCommonjsModule(function(module, exports) {
  /**
   * This is the web browser implementation of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = debug;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage =
    'undefined' != typeof chrome && 'undefined' != typeof chrome.storage
      ? chrome.storage.local
      : localstorage();

  /**
   * Colors.
   */

  exports.colors = [
    'lightseagreen',
    'forestgreen',
    'goldenrod',
    'dodgerblue',
    'darkorchid',
    'crimson',
  ];

  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */

  function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if (
      typeof window !== 'undefined' &&
      window.process &&
      window.process.type === 'renderer'
    ) {
      return true;
    }

    // is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    return (
      (typeof document !== 'undefined' &&
        document.documentElement &&
        document.documentElement.style &&
        document.documentElement.style.WebkitAppearance) ||
      // is firebug? http://stackoverflow.com/a/398120/376773
      (typeof window !== 'undefined' &&
        window.console &&
        (window.console.firebug ||
          (window.console.exception && window.console.table))) ||
      // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      (typeof navigator !== 'undefined' &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
        parseInt(RegExp.$1, 10) >= 31) ||
      // double check webkit in userAgent just in case we are in a worker
      (typeof navigator !== 'undefined' &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
    );
  }

  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */

  exports.formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (err) {
      return '[UnexpectedJSONParseError]: ' + err.message;
    }
  };

  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
    var useColors = this.useColors;

    args[0] =
      (useColors ? '%c' : '') +
      this.namespace +
      (useColors ? ' %c' : ' ') +
      args[0] +
      (useColors ? '%c ' : ' ') +
      '+' +
      exports.humanize(this.diff);

    if (!useColors) return;

    var c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit');

    // the final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, function(match) {
      if ('%%' === match) return;
      index++;
      if ('%c' === match) {
        // we only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index;
      }
    });

    args.splice(lastC, 0, c);
  }

  /**
   * Invokes `console.log()` when available.
   * No-op when `console.log` is not a "function".
   *
   * @api public
   */

  function log() {
    // this hackery is required for IE8/9, where
    // the `console.log` function doesn't have 'apply'
    return (
      'object' === typeof console &&
      console.log &&
      Function.prototype.apply.call(console.log, console, arguments)
    );
  }

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */

  function save(namespaces) {
    try {
      if (null == namespaces) {
        exports.storage.removeItem('debug');
      } else {
        exports.storage.debug = namespaces;
      }
    } catch (e) {}
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
    var r;
    try {
      r = exports.storage.debug;
    } catch (e) {}

    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof process !== 'undefined' && 'env' in process) {
      r = process.env.DEBUG;
    }

    return r;
  }

  /**
   * Enable namespaces listed in `localStorage.debug` initially.
   */

  exports.enable(load());

  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */

  function localstorage() {
    try {
      return window.localStorage;
    } catch (e) {}
  }
});
var browser_1 = browser.log;
var browser_2 = browser.formatArgs;
var browser_3 = browser.save;
var browser_4 = browser.load;
var browser_5 = browser.useColors;
var browser_6 = browser.storage;
var browser_7 = browser.colors;

var functionNames = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, '__esModule', {
    value: true,
  });

  /**
   * @see https://developers.google.com/youtube/iframe_api_reference#Functions
   */
  exports.default = [
    'cueVideoById',
    'loadVideoById',
    'cueVideoByUrl',
    'loadVideoByUrl',
    'playVideo',
    'pauseVideo',
    'stopVideo',
    'getVideoLoadedFraction',
    'cuePlaylist',
    'loadPlaylist',
    'nextVideo',
    'previousVideo',
    'playVideoAt',
    'setShuffle',
    'setLoop',
    'getPlaylist',
    'getPlaylistIndex',
    'setOption',
    'mute',
    'unMute',
    'isMuted',
    'setVolume',
    'getVolume',
    'seekTo',
    'getPlayerState',
    'getPlaybackRate',
    'setPlaybackRate',
    'getAvailablePlaybackRates',
    'getPlaybackQuality',
    'setPlaybackQuality',
    'getAvailableQualityLevels',
    'getCurrentTime',
    'getDuration',
    'removeEventListener',
    'getVideoUrl',
    'getVideoEmbedCode',
    'getOptions',
    'getOption',
    'addEventListener',
    'destroy',
    'setSize',
    'getIframe',
  ];
  module.exports = exports['default'];
});

unwrapExports(functionNames);

var eventNames = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, '__esModule', {
    value: true,
  });

  /**
   * @see https://developers.google.com/youtube/iframe_api_reference#Events
   * `volumeChange` is not officially supported but seems to work
   * it emits an object: `{volume: 82.6923076923077, muted: false}`
   */
  exports.default = [
    'ready',
    'stateChange',
    'playbackQualityChange',
    'playbackRateChange',
    'error',
    'apiChange',
    'volumeChange',
  ];
  module.exports = exports['default'];
});

unwrapExports(eventNames);

var PlayerStates = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, '__esModule', {
    value: true,
  });
  exports.default = {
    BUFFERING: 3,
    ENDED: 0,
    PAUSED: 2,
    PLAYING: 1,
    UNSTARTED: -1,
    VIDEO_CUED: 5,
  };
  module.exports = exports['default'];
});

unwrapExports(PlayerStates);

var FunctionStateMap = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, '__esModule', {
    value: true,
  });

  var _PlayerStates2 = _interopRequireDefault(PlayerStates);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }

  exports.default = {
    pauseVideo: {
      acceptableStates: [
        _PlayerStates2.default.ENDED,
        _PlayerStates2.default.PAUSED,
      ],
      stateChangeRequired: false,
    },
    playVideo: {
      acceptableStates: [
        _PlayerStates2.default.ENDED,
        _PlayerStates2.default.PLAYING,
      ],
      stateChangeRequired: false,
    },
    seekTo: {
      acceptableStates: [
        _PlayerStates2.default.ENDED,
        _PlayerStates2.default.PLAYING,
        _PlayerStates2.default.PAUSED,
      ],
      stateChangeRequired: true,

      // TRICKY: `seekTo` may not cause a state change if no buffering is
      // required.
      timeout: 3000,
    },
  };
  module.exports = exports['default'];
});

unwrapExports(FunctionStateMap);

var YouTubePlayer_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, '__esModule', {
    value: true,
  });

  var _debug2 = _interopRequireDefault(browser);

  var _functionNames2 = _interopRequireDefault(functionNames);

  var _eventNames2 = _interopRequireDefault(eventNames);

  var _FunctionStateMap2 = _interopRequireDefault(FunctionStateMap);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }

  /* eslint-disable promise/prefer-await-to-then */

  var debug = (0, _debug2.default)('youtube-player');

  var YouTubePlayer = {};

  /**
   * Construct an object that defines an event handler for all of the YouTube
   * player events. Proxy captured events through an event emitter.
   *
   * @todo Capture event parameters.
   * @see https://developers.google.com/youtube/iframe_api_reference#Events
   */
  YouTubePlayer.proxyEvents = function(emitter) {
    var events = {};

    var _loop = function _loop(eventName) {
      var onEventName =
        'on' + eventName.slice(0, 1).toUpperCase() + eventName.slice(1);

      events[onEventName] = function(event) {
        debug('event "%s"', onEventName, event);

        emitter.trigger(eventName, event);
      };
    };

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (
        var _iterator = _eventNames2.default[Symbol.iterator](), _step;
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        _iteratorNormalCompletion = true
      ) {
        var eventName = _step.value;

        _loop(eventName);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return events;
  };

  /**
   * Delays player API method execution until player state is ready.
   *
   * @todo Proxy all of the methods using Object.keys.
   * @todo See TRICKY below.
   * @param playerAPIReady Promise that resolves when player is ready.
   * @param strictState A flag designating whether or not to wait for
   * an acceptable state when calling supported functions.
   * @returns {Object}
   */
  YouTubePlayer.promisifyPlayer = function(playerAPIReady) {
    var strictState =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var functions = {};

    var _loop2 = function _loop2(functionName) {
      if (strictState && _FunctionStateMap2.default[functionName]) {
        functions[functionName] = function() {
          for (
            var _len = arguments.length, args = Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            args[_key] = arguments[_key];
          }

          return playerAPIReady.then(function(player) {
            var stateInfo = _FunctionStateMap2.default[functionName];
            var playerState = player.getPlayerState();

            // eslint-disable-next-line no-warning-comments
            // TODO: Just spread the args into the function once Babel is fixed:
            // https://github.com/babel/babel/issues/4270
            //
            // eslint-disable-next-line prefer-spread
            var value = player[functionName].apply(player, args);

            // TRICKY: For functions like `seekTo`, a change in state must be
            // triggered given that the resulting state could match the initial
            // state.
            if (
              stateInfo.stateChangeRequired ||
              // eslint-disable-next-line no-extra-parens
              (Array.isArray(stateInfo.acceptableStates) &&
                stateInfo.acceptableStates.indexOf(playerState) === -1)
            ) {
              return new Promise(function(resolve) {
                var onPlayerStateChange = function onPlayerStateChange() {
                  var playerStateAfterChange = player.getPlayerState();

                  var timeout = void 0;

                  if (typeof stateInfo.timeout === 'number') {
                    timeout = setTimeout(function() {
                      player.removeEventListener(
                        'onStateChange',
                        onPlayerStateChange,
                      );

                      resolve();
                    }, stateInfo.timeout);
                  }

                  if (
                    Array.isArray(stateInfo.acceptableStates) &&
                    stateInfo.acceptableStates.indexOf(
                      playerStateAfterChange,
                    ) !== -1
                  ) {
                    player.removeEventListener(
                      'onStateChange',
                      onPlayerStateChange,
                    );

                    clearTimeout(timeout);

                    resolve();
                  }
                };

                player.addEventListener('onStateChange', onPlayerStateChange);
              }).then(function() {
                return value;
              });
            }

            return value;
          });
        };
      } else {
        functions[functionName] = function() {
          for (
            var _len2 = arguments.length, args = Array(_len2), _key2 = 0;
            _key2 < _len2;
            _key2++
          ) {
            args[_key2] = arguments[_key2];
          }

          return playerAPIReady.then(function(player) {
            // eslint-disable-next-line no-warning-comments
            // TODO: Just spread the args into the function once Babel is fixed:
            // https://github.com/babel/babel/issues/4270
            //
            // eslint-disable-next-line prefer-spread
            return player[functionName].apply(player, args);
          });
        };
      }
    };

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (
        var _iterator2 = _functionNames2.default[Symbol.iterator](), _step2;
        !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
        _iteratorNormalCompletion2 = true
      ) {
        var functionName = _step2.value;

        _loop2(functionName);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return functions;
  };

  exports.default = YouTubePlayer;
  module.exports = exports['default'];
});

unwrapExports(YouTubePlayer_1);

var dist = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, '__esModule', {
    value: true,
  });

  var _typeof =
    typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
      ? function(obj) {
          return typeof obj;
        }
      : function(obj) {
          return obj &&
            typeof Symbol === 'function' &&
            obj.constructor === Symbol &&
            obj !== Symbol.prototype
            ? 'symbol'
            : typeof obj;
        };

  var _sister2 = _interopRequireDefault(sister);

  var _loadYouTubeIframeApi2 = _interopRequireDefault(loadYouTubeIframeApi);

  var _YouTubePlayer2 = _interopRequireDefault(YouTubePlayer_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }

  /**
   * @typedef YT.Player
   * @see https://developers.google.com/youtube/iframe_api_reference
   * */

  /**
   * @see https://developers.google.com/youtube/iframe_api_reference#Loading_a_Video_Player
   */
  var youtubeIframeAPI = void 0;

  /**
   * A factory function used to produce an instance of YT.Player and queue function calls and proxy events of the resulting object.
   *
   * @param maybeElementId Either An existing YT.Player instance,
   * the DOM element or the id of the HTML element where the API will insert an <iframe>.
   * @param options See `options` (Ignored when using an existing YT.Player instance).
   * @param strictState A flag designating whether or not to wait for
   * an acceptable state when calling supported functions. Default: `false`.
   * See `FunctionStateMap.js` for supported functions and acceptable states.
   */

  exports.default = function(maybeElementId) {
    var options =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var strictState =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var emitter = (0, _sister2.default)();

    if (!youtubeIframeAPI) {
      youtubeIframeAPI = (0, _loadYouTubeIframeApi2.default)(emitter);
    }

    if (options.events) {
      throw new Error('Event handlers cannot be overwritten.');
    }

    if (
      typeof maybeElementId === 'string' &&
      !document.getElementById(maybeElementId)
    ) {
      throw new Error('Element "' + maybeElementId + '" does not exist.');
    }

    options.events = _YouTubePlayer2.default.proxyEvents(emitter);

    var playerAPIReady = new Promise(function(resolve) {
      if (
        (typeof maybeElementId === 'undefined'
          ? 'undefined'
          : _typeof(maybeElementId)) === 'object' &&
        maybeElementId.playVideo instanceof Function
      ) {
        var player = maybeElementId;

        resolve(player);
      } else {
        // asume maybeElementId can be rendered inside
        // eslint-disable-next-line promise/catch-or-return
        youtubeIframeAPI.then(function(YT) {
          // eslint-disable-line promise/prefer-await-to-then
          var player = new YT.Player(maybeElementId, options);

          emitter.on('ready', function() {
            resolve(player);
          });

          return null;
        });
      }
    });

    var playerApi = _YouTubePlayer2.default.promisifyPlayer(
      playerAPIReady,
      strictState,
    );

    playerApi.on = emitter.on;
    playerApi.off = emitter.off;

    return playerApi;
  };

  module.exports = exports['default'];
});

var index = unwrapExports(dist);

export default index;
