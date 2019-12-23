import {
  c as createCommonjsModule,
  a as commonjsGlobal,
} from './common/_commonjsHelpers-6a48b99e.js';

var scopedStyle = createCommonjsModule(function(module, exports) {
  !(function(e, t) {
    module.exports = t();
  })(commonjsGlobal, function() {
    var v = /((,\s*)?(\s?(::?|>\s?|~\s?|\+\s?)(\w|-|\.|#|\*|\[([^(\[\])])*\]|\(([^(\(\))])+\))+)+\s*)+\{\W+[:;#%\/\\\.\(\)\+,\s\w"'-]+\}/gm,
      g = /@.*\{\W+([:;#%\/\.\(\)\+,\s\w"'-]|(::?|>.*)\w+\s\{\W+[:;#%\/\\\.\(\)\+,\s\w"'-]+\})+\}/gm,
      l = /[a-z\*,\s]+\s\{\W+[:;#%\/\\\.\(\)\+,\s\w"'-]+\}/gm,
      p = /\{\W+[:;#%\/\\\.\(\)\+,\s\w"'-]+\}/gm;
    function y() {
      for (
        var e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
          t = '',
          n = 0;
        n < 7;
        n++
      ) {
        var r = Math.floor(Math.random() * e.length);
        t += e.substring(r, r + 1);
      }
      return t;
    }
    function w(e, t, n, r, a) {
      var s = (function(e, t, n) {
        for (var r = Object.keys(n), a = 0; a < r.length; a++)
          for (var s = 0; s < n[r[a]].length; s++)
            if (n[r[a]][s].replace(r[a], e) === t) return r[a];
      })(e, t, n);
      s
        ? -1 === r.indexOf(s) && r.push(s)
        : (a(t),
          n[e] || (n[e] = []),
          n[e].push(t),
          -1 === r.indexOf(e) && r.push(e));
    }
    var t =
      'undefined' == typeof document
        ? {insertRule: function() {}}
        : document.head.appendChild(document.createElement('style')).sheet;
    function n(e) {
      t.insertRule(e, t.cssRules.length);
    }
    function e(m, d) {
      function e(h) {
        return function(o) {
          var u = [].slice.call(arguments);
          u.shift();
          var i = {};
          return function(e, t) {
            var n = y();
            i[n] = [];
            var r = [];
            t = Array.isArray(t) ? t : e.children;
            for (var a = '', s = 0; s < o.length; s++)
              a += o[s] + (u[s] ? u[s](e) : '');
            w(
              n,
              (function(e, t) {
                return '.' + t + '{' + e.replace(g, '').replace(v, '') + '}';
              })(a, n),
              i,
              r,
              d,
            );
            var l = (function(e, t) {
              for (
                var n = [], r = e.replace(g, '').match(v) || [], a = 0;
                a < r.length;
                a++
              )
                for (
                  var s = r[a].match(p)[0],
                    l = r[a].replace(p, '').split(','),
                    c = 0;
                  c < l.length;
                  c++
                )
                  n.push('.' + t + l[c].trim() + s);
              return n;
            })(a, n);
            for (s = 0; s < l.length; s++) w(n, l[s], i, r, d);
            var c = (function(e, t) {
              for (var n = [], r = e.match(g) || [], a = 0; a < r.length; a++) {
                for (
                  var s = '.' + t + r[a].replace(v, '').match(p),
                    l = r[a].match(v) || [],
                    c = 0;
                  c < l.length;
                  c++
                )
                  s += '.' + t + l[c];
                n.push(r[a].match(/@.*/) + s + '}');
              }
              return n;
            })(a, n);
            for (s = 0; s < c.length; s++) w(n, c[s], i, r, d);
            0 === i[n].length && delete i[n];
            var f = Object.assign({}, e);
            return (
              (f.class = r.join(' ') + ' ' + (e.class || e.className || '')),
              'createElementWithValidation' === m.name &&
                ((f.className = f.class), delete f.class),
              m(h, f, t)
            );
          };
        };
      }
      return (
        (d = d || n),
        (e.keyframes = function(e) {
          var t = [].slice.call(arguments);
          t.shift();
          for (var n = '', r = 0; r < e.length; r++) n += e[r] + (t[r] || '');
          var a = y();
          return d('@keyframes ' + a + ' { ' + n + ' }'), a;
        }),
        (e.global = function(e) {
          var t = [].slice.call(arguments);
          t.shift();
          for (var n = '', r = 0; r < e.length; r++) n += e[r] + (t[r] || '');
          for (
            var a = (function(e) {
                return e.match(l) || [];
              })(n),
              s = 0;
            s < a.length;
            s++
          )
            d(a[s]);
        }),
        e
      );
    }
    return (e.defaultCallback = n), e;
  });
});

export default scopedStyle;
