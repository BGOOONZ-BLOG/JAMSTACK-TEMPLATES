/*!
 * Swipe 2.2.14
 *
 * Brad Birdsall
 * Copyright 2013, MIT License
 *
 */

!(function (t, e) {
  "function" == typeof define && define.amd
    ? define([], function () {
        return (t.Swipe = e()), t.Swipe;
      })
    : "object" == typeof module && module.exports
    ? (module.exports = e())
    : (t.Swipe = e());
})(this, function () {
  var t,
    e =
      ("object" == typeof self && self.self === self && self) ||
      ("object" == typeof global && global.global === global && global) ||
      this,
    n = e.document;
  function i(t, i) {
    "use strict";
    var o,
      s,
      r = {},
      a = {},
      u = (i = i || {}).auto || 0,
      l = !1,
      c = function () {},
      v = function (t) {
        setTimeout(t || c, 0);
      };
    var d = function (t) {
        return !!t && ("boolean" != typeof t.cancelable || t.cancelable);
      },
      f = {
        addEventListener: !!e.addEventListener,
        passiveEvents: (function () {
          var t = !1;
          try {
            var n = Object.defineProperty({}, "passive", {
              get: function () {
                t = !0;
              },
            });
            e.addEventListener("testEvent", null, n),
              e.removeEventListener("testEvent", null, n);
          } catch (e) {
            t = !1;
          }
          return t;
        })(),
        touch:
          "ontouchstart" in e ||
          (e.DocumentTouch && n instanceof DocumentTouch),
        transitions: (function (t) {
          var e = [
            "transitionProperty",
            "WebkitTransition",
            "MozTransition",
            "OTransition",
            "msTransition",
          ];
          for (var n in e) if (void 0 !== t.style[e[n]]) return !0;
          return !1;
        })(n.createElement("swipe")),
      };
    if (t) {
      var m,
        h,
        p,
        E,
        y = t.children[0],
        b = parseInt(i.startSlide, 10) || 0,
        g = i.speed || 300;
      i.continuous = void 0 === i.continuous || i.continuous;
      var T,
        x,
        L =
          ((T = t).currentStyle
            ? (x = T.currentStyle.direction)
            : e.getComputedStyle &&
              (x = e.getComputedStyle(T, null).getPropertyValue("direction")),
          "rtl" === x ? "right" : "left");
      i.autoRestart = void 0 !== i.autoRestart && i.autoRestart;
      var w = (function (t, e) {
          e = e || 100;
          var n = null;
          function i() {
            n && clearTimeout(n);
          }
          function o() {
            var o = this,
              s = arguments;
            i(),
              (n = setTimeout(function () {
                (n = null), t.apply(o, s);
              }, e));
          }
          return (o.cancel = i), o;
        })(S),
        D = {
          handleEvent: function (t) {
            if (!l) {
              switch (t.type) {
                case "mousedown":
                case "touchstart":
                  this.start(t);
                  break;
                case "mousemove":
                case "touchmove":
                  this.move(t);
                  break;
                case "mouseup":
                case "mouseleave":
                case "touchend":
                  this.end(t);
                  break;
                case "webkitTransitionEnd":
                case "msTransitionEnd":
                case "oTransitionEnd":
                case "otransitionend":
                case "transitionend":
                  this.transitionEnd(t);
                  break;
                case "resize":
                  w();
              }
              i.stopPropagation && t.stopPropagation();
            }
          },
          start: function (t) {
            var e;
            Q(t) ? ((e = t), t.preventDefault()) : (e = t.touches[0]),
              (r = { x: e.pageX, y: e.pageY, time: +new Date() }),
              (o = void 0),
              (a = {}),
              Q(t)
                ? (y.addEventListener("mousemove", this, !1),
                  y.addEventListener("mouseup", this, !1),
                  y.addEventListener("mouseleave", this, !1))
                : (y.addEventListener(
                    "touchmove",
                    this,
                    !!f.passiveEvents && { passive: !1 }
                  ),
                  y.addEventListener("touchend", this, !1));
          },
          move: function (t) {
            var e;
            if (Q(t)) e = t;
            else {
              if (t.touches.length > 1 || (t.scale && 1 !== t.scale)) return;
              i.disableScroll && d(t) && t.preventDefault(), (e = t.touches[0]);
            }
            (a = { x: e.pageX - r.x, y: e.pageY - r.y }),
              void 0 === o && (o = !!(o || Math.abs(a.x) < Math.abs(a.y))),
              o ||
                (d(t) && t.preventDefault(),
                N(),
                i.continuous
                  ? (C(O(b - 1), a.x + h[O(b - 1)], 0),
                    C(b, a.x + h[b], 0),
                    C(O(b + 1), a.x + h[O(b + 1)], 0))
                  : ((a.x =
                      a.x /
                      ((!b && a.x > 0) || (b === m.length - 1 && a.x < 0)
                        ? Math.abs(a.x) / p + 1
                        : 1)),
                    C(b - 1, a.x + h[b - 1], 0),
                    C(b, a.x + h[b], 0),
                    C(b + 1, a.x + h[b + 1], 0)));
          },
          end: function (t) {
            var e = +new Date() - r.time,
              n =
                (Number(e) < 250 && Math.abs(a.x) > 20) ||
                Math.abs(a.x) > p / 2,
              s = (!b && a.x > 0) || (b === m.length - 1 && a.x < 0);
            i.continuous && (s = !1);
            var u = Math.abs(a.x) / a.x;
            o ||
              (n && !s
                ? (u < 0
                    ? (i.continuous
                        ? (R(O(b - 1), -p, 0), R(O(b + 2), p, 0))
                        : R(b - 1, -p, 0),
                      R(b, h[b] - p, g),
                      R(O(b + 1), h[O(b + 1)] - p, g),
                      (b = O(b + 1)))
                    : (i.continuous
                        ? (R(O(b + 1), p, 0), R(O(b - 2), -p, 0))
                        : R(b + 1, p, 0),
                      R(b, h[b] + p, g),
                      R(O(b - 1), h[O(b - 1)] + p, g),
                      (b = O(b - 1))),
                  A(P(), m[b], u))
                : i.continuous
                ? (R(O(b - 1), -p, g), R(b, 0, g), R(O(b + 1), p, g))
                : (R(b - 1, -p, g), R(b, 0, g), R(b + 1, p, g))),
              Q(t)
                ? (y.removeEventListener("mousemove", D, !1),
                  y.removeEventListener("mouseup", D, !1),
                  y.removeEventListener("mouseleave", D, !1))
                : (y.removeEventListener(
                    "touchmove",
                    D,
                    !!f.passiveEvents && { passive: !1 }
                  ),
                  y.removeEventListener("touchend", D, !1));
          },
          transitionEnd: function (t) {
            parseInt(t.target.getAttribute("data-index"), 10) === b &&
              ((u || i.autoRestart) && X(), j(P(), m[b]));
          },
        };
      return (
        S(),
        W(),
        {
          setup: S,
          slide: function (t, e) {
            N(), I(t, e);
          },
          prev: function () {
            N(),
              (function () {
                if (l) return;
                i.continuous ? I(b - 1) : b && I(b - 1);
              })();
          },
          next: function () {
            N(), z();
          },
          restart: X,
          stop: N,
          getPos: P,
          disable: function () {
            N(), (l = !0);
          },
          enable: function () {
            (l = !1), X();
          },
          getNumSlides: function () {
            return E;
          },
          kill: function () {
            N(),
              (t.style.visibility = ""),
              (y.style.width = ""),
              (y.style[L] = "");
            var e = m.length;
            for (; e--; ) {
              f.transitions && C(e, 0, 0);
              var n = m[e];
              if (n.getAttribute("data-cloned")) {
                var i = n.parentElement;
                i.removeChild(n);
              }
              (n.style.width = ""),
                (n.style[L] = ""),
                (n.style.webkitTransitionDuration =
                  n.style.MozTransitionDuration =
                  n.style.msTransitionDuration =
                  n.style.OTransitionDuration =
                  n.style.transitionDuration =
                    ""),
                (n.style.webkitTransform =
                  n.style.msTransform =
                  n.style.MozTransform =
                  n.style.OTransform =
                    "");
            }
            k(), w.cancel();
          },
        }
      );
    }
    function k() {
      f.addEventListener
        ? (y.removeEventListener(
            "touchstart",
            D,
            !!f.passiveEvents && { passive: !0 }
          ),
          y.removeEventListener("mousedown", D, !1),
          y.removeEventListener("webkitTransitionEnd", D, !1),
          y.removeEventListener("msTransitionEnd", D, !1),
          y.removeEventListener("oTransitionEnd", D, !1),
          y.removeEventListener("otransitionend", D, !1),
          y.removeEventListener("transitionend", D, !1),
          e.removeEventListener("resize", D, !1))
        : (e.onresize = null);
    }
    function M(t) {
      var e = t.cloneNode(!0);
      y.appendChild(e),
        e.setAttribute("data-cloned", !0),
        e.removeAttribute("id");
    }
    function S(o) {
      if (null != o) for (var s in o) i[s] = o[s];
      (m = y.children), (E = m.length);
      for (var r = 0; r < m.length; r++)
        m[r].getAttribute("data-cloned") && E--;
      if (
        (m.length < 2 && (i.continuous = !1),
        f.transitions &&
          i.continuous &&
          m.length < 3 &&
          (M(m[0]), M(m[1]), (m = y.children)),
        "right" === L)
      )
        for (var a = 0; a < m.length; a++) m[a].style.float = "right";
      (h = new Array(m.length)),
        (p = e.innerWidth - (e.innerWidth - n.documentElement.clientWidth)),
        (y.style.width = m.length * p * 2 + "px");
      for (var u = m.length; u--; ) {
        var l = m[u];
        (l.style.width = p + "px"),
          l.setAttribute("data-index", u),
          f.transitions &&
            ((l.style[L] = u * -p + "px"), R(u, b > u ? -p : b < u ? p : 0, 0));
      }
      i.continuous && f.transitions && (R(O(b - 1), -p, 0), R(O(b + 1), p, 0)),
        f.transitions || (y.style[L] = b * -p + "px"),
        (t.style.visibility = "visible"),
        k(),
        f.addEventListener
          ? (f.touch &&
              y.addEventListener(
                "touchstart",
                D,
                !!f.passiveEvents && { passive: !0 }
              ),
            i.draggable && y.addEventListener("mousedown", D, !1),
            f.transitions &&
              (y.addEventListener("webkitTransitionEnd", D, !1),
              y.addEventListener("msTransitionEnd", D, !1),
              y.addEventListener("oTransitionEnd", D, !1),
              y.addEventListener("otransitionend", D, !1),
              y.addEventListener("transitionend", D, !1)),
            e.addEventListener("resize", D, !1))
          : (e.onresize = w);
    }
    function z() {
      l || (i.continuous ? I(b + 1) : b < m.length - 1 && I(b + 1));
    }
    function A(t, e, n) {
      i.callback && i.callback(t, e, n);
    }
    function j(t, e) {
      i.transitionEnd && i.transitionEnd(t, e);
    }
    function O(t) {
      return (m.length + (t % m.length)) % m.length;
    }
    function P() {
      var t = b;
      return t >= E && (t -= E), t;
    }
    function I(t, e) {
      if (((t = "number" != typeof t ? parseInt(t, 10) : t), b !== t)) {
        if (f.transitions) {
          var n = Math.abs(b - t) / (b - t);
          if (i.continuous) {
            var o = n;
            (n = -h[O(t)] / p) !== o && (t = -n * m.length + t);
          }
          for (var s = Math.abs(b - t) - 1; s--; )
            R(O((t > b ? t : b) - s - 1), p * n, 0);
          (t = O(t)),
            R(b, p * n, e || g),
            R(t, 0, e || g),
            i.continuous && R(O(t - n), -p * n, 0);
        } else
          (t = O(t)),
            (function (t, e, n) {
              if (!n) return void (y.style[L] = e + "px");
              var o = +new Date(),
                s = setInterval(function () {
                  var r = +new Date() - o;
                  if (r > n)
                    return (
                      (y.style[L] = e + "px"),
                      (u || i.autoRestart) && X(),
                      j(P(), m[b]),
                      void clearInterval(s)
                    );
                  y.style[L] =
                    (e - t) * (Math.floor((r / n) * 100) / 100) + t + "px";
                }, 4);
            })(b * -p, t * -p, e || g);
        (b = t),
          v(function () {
            A(P(), m[b], n);
          });
      }
    }
    function R(t, e, n) {
      C(t, e, n), (h[t] = e);
    }
    function C(t, e, n) {
      var i = m[t],
        o = i && i.style;
      o &&
        ((o.webkitTransitionDuration =
          o.MozTransitionDuration =
          o.msTransitionDuration =
          o.OTransitionDuration =
          o.transitionDuration =
            n + "ms"),
        (o.webkitTransform =
          o.msTransform =
          o.MozTransform =
          o.OTransform =
          o.transform =
            "translateX(" + e + "px)"));
    }
    function W() {
      (u = i.auto || 0) && (s = setTimeout(z, u));
    }
    function N() {
      (u = 0), clearTimeout(s);
    }
    function X() {
      N(), W();
    }
    function Q(t) {
      return /^mouse/.test(t.type);
    }
  }
  return (
    (e.jQuery || e.Zepto) &&
      ((t = e.jQuery || e.Zepto).fn.Swipe = function (e) {
        return this.each(function () {
          t(this).data("Swipe", new i(t(this)[0], e));
        });
      }),
    i
  );
});
