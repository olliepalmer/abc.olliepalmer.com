var pos = 0;
var letter = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9"
];
var audiofiles = [];
var advance = false;
for (i = 0; i < letter.length; i++) {
  audiofiles[i] = "https://abc.olliepalmer.com/audio/" + letter[i] + ".mp3";
}
window.autoadvance = false;
window.progression = setInterval(up,1000);
stop();
function startstop() {
  window.autoadvance = !window.autoadvance;
  if (window.autoadvance) start();
  else stop();
}

function start() {
  play(pos);
  window.autoadvance = true;
  var pl = document.getElementById("play-play");
  var pa = document.getElementById("play-pause");
  pl.style.display = "none";
  pa.style.display = "block";
  window.progression = setInterval(up, 2500);
}

function stop() {
  window.autoadvance = false;
  var pl = document.getElementById("play-play");
  var pa = document.getElementById("play-pause");
  pl.style.display = "block";
  pa.style.display = "none";
  clearInterval(window.progression);
}

function r() {
  change(Math.floor(Math.random() * letter.length));
}

function up() {
  pos++;
  if (pos >= letter.length) pos = 0;
  change(pos);
}

function down() {
  pos--;
  if (pos < 0) pos = letter.length - 1;
  change(pos);
}

function change(v) {
  pos = v;
  document.getElementById("letters").innerHTML =
    "<a onclick='bigorsmall();play(" + pos + ")'>" + letter[pos] + "</a>";
  color();
  play(pos);
}
function color() {
  var newColor = randomColor({ luminosity: "dark" });
  document.getElementById("bgd").style.background = newColor;
  // var newColor = randomColor({luminosity:'light'});    document.getElementById('letters').style.color = newColor;
}
function bigorsmall() {
  var element = document.getElementById("bgd");
  element.classList.toggle("upper");
}

function preloadAudio(url) {
  var audio = new Audio();
  // once this file loads, it will call loadedAudio()
  // the file will be kept by the browser as cache
  audio.addEventListener("canplaythrough", loadedAudio, false);
  audio.src = url;
}

var loaded = 0;
function loadedAudio() {
  // this will be called every time an audio file is loaded
  // we keep track of the loaded files vs the requested files
  loaded++;
  if (loaded == audiofiles.length) {
    // all have loaded
    init();
  }
}

var player = document.getElementById("player");
function play(index) {
  player.src = audiofiles[index];
  player.play();
}

function init() {
  // do your stuff here, audio has been loaded
  // for example, play all files one after the other
  var i = 0;
  player.onended = function () {
    i++;
    if (i >= audiofiles.length) return;
  };
}

// we start preloading all the audio files
for (var i in audiofiles) {
  preloadAudio(audiofiles[i]);
}

// randomColor by David Merfield under the CC0 license
// https://github.com/davidmerfield/randomColor/

!(function (r, e) {
  if ("object" == typeof exports) {
    var n = e();
    "object" == typeof module &&
      module &&
      module.exports &&
      (exports = module.exports = n),
      (exports.randomColor = n);
  } else
    "function" == typeof define && define.amd
      ? define([], e)
      : (r.randomColor = e());
})(this, function () {
  function r(r) {
    var e = o(r.hue),
      n = i(e);
    return n < 0 && (n = 360 + n), n;
  }
  function e(r, e) {
    if ("monochrome" === e.hue) return 0;
    if ("random" === e.luminosity) return i([0, 100]);
    var n = u(r),
      t = n[0],
      a = n[1];
    switch (e.luminosity) {
      case "bright":
        t = 55;
        break;
      case "dark":
        t = a - 10;
        break;
      case "light":
        a = 55;
    }
    return i([t, a]);
  }
  function n(r, e, n) {
    var t = a(r, e),
      o = 100;
    switch (n.luminosity) {
      case "dark":
        o = t + 20;
        break;
      case "light":
        t = (o + t) / 2;
        break;
      case "random":
        (t = 0), (o = 100);
    }
    return i([t, o]);
  }
  function t(r, e) {
    switch (e.format) {
      case "hsvArray":
        return r;
      case "hslArray":
        return d(r);
      case "hsl":
        var n = d(r);
        return "hsl(" + n[0] + ", " + n[1] + "%, " + n[2] + "%)";
      case "hsla":
        var t = d(r),
          a = e.alpha || Math.random();
        return "hsla(" + t[0] + ", " + t[1] + "%, " + t[2] + "%, " + a + ")";
      case "rgbArray":
        return f(r);
      case "rgb":
        return "rgb(" + f(r).join(", ") + ")";
      case "rgba":
        var o = f(r),
          a = e.alpha || Math.random();
        return "rgba(" + o.join(", ") + ", " + a + ")";
      default:
        return c(r);
    }
  }
  function a(r, e) {
    for (var n = s(r).lowerBounds, t = 0; t < n.length - 1; t++) {
      var a = n[t][0],
        o = n[t][1],
        u = n[t + 1][0],
        i = n[t + 1][1];
      if (e >= a && e <= u) {
        var c = (i - o) / (u - a);
        return c * e + (o - c * a);
      }
    }
    return 0;
  }
  function o(r) {
    if ("number" == typeof parseInt(r)) {
      var e = parseInt(r);
      if (e < 360 && e > 0) return [e, e];
    }
    if ("string" == typeof r)
      if (m[r]) {
        var n = m[r];
        if (n.hueRange) return n.hueRange;
      } else if (r.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i)) {
        const t = h(r)[0];
        return [t, t];
      }
    return [0, 360];
  }
  function u(r) {
    return s(r).saturationRange;
  }
  function s(r) {
    r >= 334 && r <= 360 && (r -= 360);
    for (var e in m) {
      var n = m[e];
      if (n.hueRange && r >= n.hueRange[0] && r <= n.hueRange[1]) return m[e];
    }
    return "Color not found";
  }
  function i(r) {
    if (null === v) return Math.floor(r[0] + Math.random() * (r[1] + 1 - r[0]));
    var e = r[1] || 1,
      n = r[0] || 0;
    v = (9301 * v + 49297) % 233280;
    var t = v / 233280;
    return Math.floor(n + t * (e - n));
  }
  function c(r) {
    function e(r) {
      var e = r.toString(16);
      return 1 == e.length ? "0" + e : e;
    }
    var n = f(r);
    return "#" + e(n[0]) + e(n[1]) + e(n[2]);
  }
  function l(r, e, n) {
    var t = n[0][0],
      a = n[n.length - 1][0],
      o = n[n.length - 1][1],
      u = n[0][1];
    m[r] = {
      hueRange: e,
      lowerBounds: n,
      saturationRange: [t, a],
      brightnessRange: [o, u]
    };
  }
  function f(r) {
    var e = r[0];
    0 === e && (e = 1), 360 === e && (e = 359), (e /= 360);
    var n = r[1] / 100,
      t = r[2] / 100,
      a = Math.floor(6 * e),
      o = 6 * e - a,
      u = t * (1 - n),
      s = t * (1 - o * n),
      i = t * (1 - (1 - o) * n),
      c = 256,
      l = 256,
      f = 256;
    switch (a) {
      case 0:
        (c = t), (l = i), (f = u);
        break;
      case 1:
        (c = s), (l = t), (f = u);
        break;
      case 2:
        (c = u), (l = t), (f = i);
        break;
      case 3:
        (c = u), (l = s), (f = t);
        break;
      case 4:
        (c = i), (l = u), (f = t);
        break;
      case 5:
        (c = t), (l = u), (f = s);
    }
    return [Math.floor(255 * c), Math.floor(255 * l), Math.floor(255 * f)];
  }
  function h(r) {
    (r = r.replace(/^#/, "")),
      (r = 3 === r.length ? r.replace(/(.)/g, "$1$1") : r);
    const e = parseInt(r.substr(0, 2), 16) / 255,
      n = parseInt(r.substr(2, 2), 16) / 255,
      t = parseInt(r.substr(4, 2), 16) / 255,
      a = Math.max(e, n, t),
      o = a - Math.min(e, n, t),
      u = a ? o / a : 0;
    switch (a) {
      case e:
        return [(((n - t) / o) % 6) * 60 || 0, u, a];
      case n:
        return [60 * ((t - e) / o + 2) || 0, u, a];
      case t:
        return [60 * ((e - n) / o + 4) || 0, u, a];
    }
  }
  function d(r) {
    var e = r[0],
      n = r[1] / 100,
      t = r[2] / 100,
      a = (2 - n) * t;
    return [
      e,
      Math.round(((n * t) / (a < 1 ? a : 2 - a)) * 1e4) / 100,
      (a / 2) * 100
    ];
  }
  function g(r) {
    for (
      var e = 0, n = 0;
      n !== r.length && !(e >= Number.MAX_SAFE_INTEGER);
      n++
    )
      e += r.charCodeAt(n);
    return e;
  }
  var v = null,
    m = {};
  !(function () {
    l("monochrome", null, [
      [0, 0],
      [100, 0]
    ]),
      l(
        "red",
        [-26, 18],
        [
          [20, 100],
          [30, 92],
          [40, 89],
          [50, 85],
          [60, 78],
          [70, 70],
          [80, 60],
          [90, 55],
          [100, 50]
        ]
      ),
      l(
        "orange",
        [19, 46],
        [
          [20, 100],
          [30, 93],
          [40, 88],
          [50, 86],
          [60, 85],
          [70, 70],
          [100, 70]
        ]
      ),
      l(
        "yellow",
        [47, 62],
        [
          [25, 100],
          [40, 94],
          [50, 89],
          [60, 86],
          [70, 84],
          [80, 82],
          [90, 80],
          [100, 75]
        ]
      ),
      l(
        "green",
        [63, 178],
        [
          [30, 100],
          [40, 90],
          [50, 85],
          [60, 81],
          [70, 74],
          [80, 64],
          [90, 50],
          [100, 40]
        ]
      ),
      l(
        "blue",
        [179, 257],
        [
          [20, 100],
          [30, 86],
          [40, 80],
          [50, 74],
          [60, 60],
          [70, 52],
          [80, 44],
          [90, 39],
          [100, 35]
        ]
      ),
      l(
        "purple",
        [258, 282],
        [
          [20, 100],
          [30, 87],
          [40, 79],
          [50, 70],
          [60, 65],
          [70, 59],
          [80, 52],
          [90, 45],
          [100, 42]
        ]
      ),
      l(
        "pink",
        [283, 334],
        [
          [20, 100],
          [30, 90],
          [40, 86],
          [60, 84],
          [80, 80],
          [90, 75],
          [100, 73]
        ]
      );
  })();
  var p = function (a) {
    if (
      ((a = a || {}),
      void 0 !== a.seed && null !== a.seed && a.seed === parseInt(a.seed, 10))
    )
      v = a.seed;
    else if ("string" == typeof a.seed) v = g(a.seed);
    else {
      if (void 0 !== a.seed && null !== a.seed)
        throw new TypeError("The seed value must be an integer or string");
      v = null;
    }
    var o, u, s;
    if (null !== a.count && void 0 !== a.count) {
      var i = a.count,
        c = [];
      for (a.count = null; i > c.length; )
        v && a.seed && (a.seed += 1), c.push(p(a));
      return (a.count = i), c;
    }
    return (o = r(a)), (u = e(o, a)), (s = n(o, u, a)), t([o, u, s], a);
  };
  return p;
});
//# sourceMappingURL=randomColor.min.js.map
