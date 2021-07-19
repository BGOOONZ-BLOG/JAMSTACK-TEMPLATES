/*
 * reframe.js - Reframe.js: responsive iframes for embedded content
 * @version v3.0.2
 * @link https://github.com/yowainwright/reframe.ts#readme
 * @author Jeff Wainwright <yowainwright@gmail.com> (http://jeffry.in)
 * @license MIT
 */
!(function (e, t) {
    'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = t())
        : 'function' == typeof define && define.amd
        ? define(t)
        : ((e = 'undefined' != typeof globalThis ? globalThis : e || self).reframe = t());
})(this, function () {
    'use strict';
    function t() {
        for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
        for (var i = Array(e), o = 0, t = 0; t < n; t++) for (var r = arguments[t], f = 0, d = r.length; f < d; f++, o++) i[o] = r[f];
        return i;
    }
    return function (e, s) {
        return (
            void 0 === s && (s = 'js-reframe'),
            ('string' == typeof e ? t(document.querySelectorAll(e)) : 'length' in e ? t(e) : [e]).forEach(function (e) {
                var t, n, i, o, r, f, d, l;
                -1 !== e.className.split(' ').indexOf(s) ||
                    -1 < e.style.width.indexOf('%') ||
                    ((i = e.getAttribute('height') || e.offsetHeight),
                    (o = e.getAttribute('width') || e.offsetWidth),
                    (r = (('string' == typeof i ? parseInt(i) : i) / ('string' == typeof o ? parseInt(o) : o)) * 100),
                    ((f = document.createElement('div')).className = s),
                    ((d = f.style).position = 'relative'),
                    (d.width = '100%'),
                    (d.paddingTop = r + '%'),
                    ((l = e.style).position = 'absolute'),
                    (l.width = '100%'),
                    (l.height = '100%'),
                    (l.left = '0'),
                    (l.top = '0'),
                    null !== (t = e.parentNode) && void 0 !== t && t.insertBefore(f, e),
                    null !== (n = e.parentNode) && void 0 !== n && n.removeChild(e),
                    f.appendChild(e));
            })
        );
    };
});

/*
 * handorgel v0.5.0
 * @link https://github.com/oncode/handorgel/
 * @license MIT
 */
!(function (t, e) {
    'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = e())
        : 'function' == typeof define && define.amd
        ? define(e)
        : ((t = t || self).handorgel = e());
})(this, function () {
    'use strict';
    function t(t, e) {
        if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
    }
    function e(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            (i.enumerable = i.enumerable || !1), (i.configurable = !0), 'value' in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
        }
    }
    function n(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    }
    var i = 'undefined' != typeof window ? window : 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : {};
    var s,
        o =
            ((function (t) {
                var e, n;
                (e = 'undefined' != typeof window ? window : i),
                    (n = function () {
                        function t() {}
                        var e = t.prototype;
                        return (
                            (e.on = function (t, e) {
                                if (t && e) {
                                    var n = (this._events = this._events || {}),
                                        i = (n[t] = n[t] || []);
                                    return -1 == i.indexOf(e) && i.push(e), this;
                                }
                            }),
                            (e.once = function (t, e) {
                                if (t && e) {
                                    this.on(t, e);
                                    var n = (this._onceEvents = this._onceEvents || {});
                                    return ((n[t] = n[t] || {})[e] = !0), this;
                                }
                            }),
                            (e.off = function (t, e) {
                                var n = this._events && this._events[t];
                                if (n && n.length) {
                                    var i = n.indexOf(e);
                                    return -1 != i && n.splice(i, 1), this;
                                }
                            }),
                            (e.emitEvent = function (t, e) {
                                var n = this._events && this._events[t];
                                if (n && n.length) {
                                    (n = n.slice(0)), (e = e || []);
                                    for (var i = this._onceEvents && this._onceEvents[t], s = 0; s < n.length; s++) {
                                        var o = n[s];
                                        i && i[o] && (this.off(t, o), delete i[o]), o.apply(this, e);
                                    }
                                    return this;
                                }
                            }),
                            (e.allOff = function () {
                                delete this._events, delete this._onceEvents;
                            }),
                            t
                        );
                    }),
                    t.exports ? (t.exports = n()) : (e.EvEmitter = n());
            })((s = { exports: {} }), s.exports),
            s.exports),
        a = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
    function l(t, e) {
        var n = Object.getOwnPropertyDescriptor(t, e);
        return void 0 === t[e] || (n && n.writable);
    }
    function h(t) {
        for (var e, n = arguments, i = 1; i < n.length; ++i) if ((e = n[i])) for (var s in e) l(t, s) && (t[s] = e[s]);
        return t;
    }
    var r = {},
        d = {
            button: {
                'aria-controls': function () {
                    return this.id + '-content';
                },
                'aria-expanded': function () {
                    return this.expanded ? 'true' : 'false';
                },
                'aria-disabled': function () {
                    return this.disabled ? 'true' : 'false';
                }
            },
            content: {
                role: function () {
                    return 'region';
                },
                'aria-labelledby': function () {
                    return this.id + '-header';
                }
            }
        },
        c = 40,
        u = 38,
        f = 33,
        p = 34,
        v = 35,
        b = 36,
        g = (function () {
            function e(n, i, s) {
                t(this, e),
                    i.handorgelFold ||
                        ((this.handorgel = n),
                        (this.header = i),
                        (this.button = i.firstElementChild),
                        (this.content = s),
                        (this.header.handorgelFold = this),
                        (this.content.handorgelFold = this),
                        r[this.handorgel.id] || (r[this.handorgel.id] = 0),
                        (this.id = ''.concat(this.handorgel.id, '-fold').concat(++r[this.handorgel.id])),
                        this.header.setAttribute('id', this.id + '-header'),
                        this.content.setAttribute('id', this.id + '-content'),
                        (this.focused = !1),
                        (this.expanded = !1),
                        (this.disabled = !1),
                        (this._listeners = {}),
                        this._bindEvents(),
                        this._initAria(),
                        this._initialOpen(),
                        this._initialFocus());
            }
            return (
                n(e, [
                    {
                        key: 'open',
                        value: function () {
                            var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                            if (!this.expanded)
                                if (
                                    (this.handorgel.emitEvent('fold:open', [this]),
                                    (this.expanded = !0),
                                    this.handorgel.options.collapsible || this.disable(),
                                    this._updateAria('button', 'aria-expanded'),
                                    this.header.classList.add(this.handorgel.options.headerOpenClass),
                                    this.content.classList.add(this.handorgel.options.contentOpenClass),
                                    t)
                                ) {
                                    var e = this.content.firstElementChild.offsetHeight;
                                    this.content.style.height = ''.concat(e, 'px');
                                } else this._opened();
                        }
                    },
                    {
                        key: 'close',
                        value: function () {
                            var t = this,
                                e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                            if (this.expanded)
                                if (
                                    (this.handorgel.emitEvent('fold:close', [this]),
                                    (this.expanded = !1),
                                    this.handorgel.options.collapsible || this.enable(),
                                    this._updateAria('button', 'aria-expanded'),
                                    this.header.classList.remove(this.handorgel.options.headerOpenedClass),
                                    this.content.classList.remove(this.handorgel.options.contentOpenedClass),
                                    e)
                                ) {
                                    var n = this.content.firstElementChild.offsetHeight;
                                    (this.content.style.height = ''.concat(n, 'px')),
                                        a(function () {
                                            t.content.style.height = '0px';
                                        });
                                } else this._closed();
                        }
                    },
                    {
                        key: 'disable',
                        value: function () {
                            (this.disabled = !0),
                                this._updateAria('button', 'aria-disabled'),
                                this.header.classList.add(this.handorgel.options.headerDisabledClass),
                                this.content.classList.add(this.handorgel.options.contentDisabledClass);
                        }
                    },
                    {
                        key: 'enable',
                        value: function () {
                            (this.disabled = !1),
                                this._updateAria('button', 'aria-disabled'),
                                this.header.classList.remove(this.handorgel.options.headerDisabledClass),
                                this.content.classList.remove(this.handorgel.options.contentDisabledClass);
                        }
                    },
                    {
                        key: 'focus',
                        value: function () {
                            this.button.focus();
                        }
                    },
                    {
                        key: 'blur',
                        value: function () {
                            this.button.blur();
                        }
                    },
                    {
                        key: 'toggle',
                        value: function () {
                            var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                            this.expanded ? this.close(t) : this.open(t);
                        }
                    },
                    {
                        key: 'destroy',
                        value: function () {
                            this._unbindEvents(),
                                this._cleanAria(),
                                this.header.classList.remove(this.handorgel.options.headerOpenClass),
                                this.header.classList.remove(this.handorgel.options.headerOpenedClass),
                                this.header.classList.remove(this.handorgel.options.headerFocusClass),
                                this.content.classList.remove(this.handorgel.options.contentOpenClass),
                                this.content.classList.remove(this.handorgel.options.contentOpenedClass),
                                this.content.classList.remove(this.handorgel.options.contentFocusClass),
                                (this.content.style.height = '0px'),
                                (this.header.handorgelFold = null),
                                (this.content.handorgelFold = null),
                                this.header.removeAttribute('id'),
                                this.content.removeAttribute('id'),
                                (this.handorgel = null);
                        }
                    },
                    {
                        key: '_opened',
                        value: function () {
                            (this.content.style.height = 'auto'),
                                this.header.classList.add(this.handorgel.options.headerOpenedClass),
                                this.content.classList.add(this.handorgel.options.contentOpenedClass),
                                this.handorgel.emitEvent('fold:opened', [this]);
                        }
                    },
                    {
                        key: '_closed',
                        value: function () {
                            this.header.classList.remove(this.handorgel.options.headerOpenClass),
                                this.content.classList.remove(this.handorgel.options.contentOpenClass),
                                this.handorgel.emitEvent('fold:closed', [this]);
                        }
                    },
                    {
                        key: '_initialOpen',
                        value: function () {
                            var t = this;
                            (null === this.header.getAttribute(this.handorgel.options.initialOpenAttribute) &&
                                null === this.content.getAttribute(this.handorgel.options.initialOpenAttribute)) ||
                                (this.handorgel.options.initialOpenTransition
                                    ? window.setTimeout(function () {
                                          t.open();
                                      }, this.handorgel.options.initialOpenTransitionDelay)
                                    : this.open(!1));
                        }
                    },
                    {
                        key: '_initialFocus',
                        value: function () {
                            null !== this.button.getAttribute('autofocus') && this._handleFocus();
                        }
                    },
                    {
                        key: '_initAria',
                        value: function () {
                            this._updateAria('button'), this._updateAria('content');
                        }
                    },
                    {
                        key: '_cleanAria',
                        value: function () {
                            this._updateAria('button', null, !0), this._updateAria('content', null, !0);
                        }
                    },
                    {
                        key: '_updateAria',
                        value: function (t) {
                            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                                n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                            if (this.handorgel.options.ariaEnabled)
                                if (e) {
                                    var i = d[t][e].call(this);
                                    this[t].setAttribute(e, i);
                                } else
                                    for (var s in d[t])
                                        if (d[t].hasOwnProperty(s))
                                            if (n) this[t].removeAttribute(s);
                                            else {
                                                var o = d[t][s].call(this);
                                                this[t].setAttribute(s, o);
                                            }
                        }
                    },
                    {
                        key: '_handleContentTransitionEnd',
                        value: function (t) {
                            t.target === t.currentTarget && 'height' === t.propertyName && (this.expanded ? this._opened() : this._closed());
                        }
                    },
                    {
                        key: '_handleFocus',
                        value: function () {
                            (this.focused = !0),
                                this.header.classList.add(this.handorgel.options.headerFocusClass),
                                this.content.classList.add(this.handorgel.options.contentFocusClass),
                                this.handorgel.emitEvent('fold:focus', [this]);
                        }
                    },
                    {
                        key: '_handleBlur',
                        value: function () {
                            (this.focused = !1),
                                this.header.classList.remove(this.handorgel.options.headerFocusClass),
                                this.content.classList.remove(this.handorgel.options.contentFocusClass),
                                this.handorgel.emitEvent('fold:blur', [this]);
                        }
                    },
                    {
                        key: '_handleButtonClick',
                        value: function (t) {
                            this.focus(), this.disabled || this.toggle();
                        }
                    },
                    {
                        key: '_handleButtonKeydown',
                        value: function (t) {
                            if (this.handorgel.options.keyboardInteraction) {
                                var e = null;
                                switch (t.which) {
                                    case c:
                                        e = 'next';
                                        break;
                                    case u:
                                        e = 'prev';
                                        break;
                                    case b:
                                        e = 'first';
                                        break;
                                    case v:
                                        e = 'last';
                                        break;
                                    case p:
                                        t.ctrlKey && (e = 'next');
                                        break;
                                    case f:
                                        t.ctrlKey && (e = 'prev');
                                }
                                e && (t.preventDefault(), this.handorgel.focus(e));
                            }
                        }
                    },
                    {
                        key: '_handleContentKeydown',
                        value: function (t) {
                            if (this.handorgel.options.keyboardInteraction && t.ctrlKey) {
                                var e = null;
                                switch (t.which) {
                                    case p:
                                        e = 'next';
                                        break;
                                    case f:
                                        e = 'prev';
                                }
                                e && (t.preventDefault(), this.handorgel.focus(e));
                            }
                        }
                    },
                    {
                        key: '_bindEvents',
                        value: function () {
                            for (var t in ((this._listeners = {
                                bFocus: ['focus', this.button, this._handleFocus.bind(this)],
                                bBlur: ['blur', this.button, this._handleBlur.bind(this)],
                                bClick: ['click', this.button, this._handleButtonClick.bind(this)],
                                bKeydown: ['keydown', this.button, this._handleButtonKeydown.bind(this)],
                                cKeydown: ['keydown', this.content, this._handleContentKeydown.bind(this)],
                                cTransition: ['transitionend', this.content, this._handleContentTransitionEnd.bind(this)]
                            }),
                            this._listeners))
                                if (this._listeners.hasOwnProperty(t)) {
                                    var e = this._listeners[t];
                                    e[1].addEventListener(e[0], e[2]);
                                }
                        }
                    },
                    {
                        key: '_unbindEvents',
                        value: function () {
                            for (var t in this._listeners)
                                if (this._listeners.hasOwnProperty(t)) {
                                    var e = this._listeners[t];
                                    e[1].removeEventListener(e[0], e[2]);
                                }
                        }
                    }
                ]),
                e
            );
        })(),
        _ = 0,
        y = (function () {
            function e(n) {
                var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                t(this, e),
                    n.handorgel ||
                        ((this.element = n),
                        (this.element.handorgel = this),
                        (this.id = 'handorgel'.concat(++_)),
                        this.element.setAttribute('id', this.id),
                        (this.folds = []),
                        (this.options = h({}, e.defaultOptions, i)),
                        (this._listeners = {}),
                        this._bindEvents(),
                        this._initAria(),
                        this.update());
            }
            return (
                n(e, [
                    {
                        key: 'update',
                        value: function () {
                            this.folds = [];
                            for (var t = this.element.children, e = 0, n = t.length; e < n; e += 2) {
                                var i = t[e],
                                    s = t[e + 1],
                                    o = i.handorgelFold;
                                !o && i && s && (o = new g(this, i, s)), o && this.folds.push(o);
                            }
                        }
                    },
                    {
                        key: 'focus',
                        value: function (t) {
                            for (var e = this.folds.length, n = null, i = 0; i < e && null === n; i++) this.folds[i].focused && (n = i);
                            if ((('prev' !== t && 'next' !== t) || null !== n || (t = 'prev' === t ? 'last' : 'first'), 'prev' === t && 0 === n)) {
                                if (!this.options.carouselFocus) return;
                                t = 'last';
                            }
                            if ('next' === t && n === e - 1) {
                                if (!this.options.carouselFocus) return;
                                t = 'first';
                            }
                            switch (t) {
                                case 'prev':
                                    this.folds[--n].focus();
                                    break;
                                case 'next':
                                    this.folds[++n].focus();
                                    break;
                                case 'last':
                                    this.folds[e - 1].focus();
                                    break;
                                case 'first':
                                default:
                                    this.folds[0].focus();
                            }
                        }
                    },
                    {
                        key: 'destroy',
                        value: function () {
                            this.emitEvent('destroy'),
                                this.element.removeAttribute('id'),
                                this.folds.forEach(function (t) {
                                    t.destroy();
                                }),
                                this._unbindEvents(),
                                this._cleanAria(),
                                (this.element.handorgel = null),
                                this.emitEvent('destroyed');
                        }
                    },
                    {
                        key: '_handleFoldOpen',
                        value: function (t) {
                            this.options.multiSelectable ||
                                this.folds.forEach(function (e) {
                                    t !== e && e.close();
                                });
                        }
                    },
                    {
                        key: '_initAria',
                        value: function () {
                            this.options.ariaEnabled && this.options.multiSelectable && this.element.setAttribute('aria-multiselectable', 'true');
                        }
                    },
                    {
                        key: '_cleanAria',
                        value: function () {
                            this.element.removeAttribute('aria-multiselectable');
                        }
                    },
                    {
                        key: '_bindEvents',
                        value: function () {
                            (this._listeners.foldOpen = this._handleFoldOpen.bind(this)), this.on('fold:open', this._listeners.foldOpen);
                        }
                    },
                    {
                        key: '_unbindEvents',
                        value: function () {
                            this.off('fold:open', this._listeners.foldOpen);
                        }
                    }
                ]),
                e
            );
        })();
    return (
        h(y.prototype, o.prototype),
        (y.defaultOptions = {
            keyboardInteraction: !0,
            multiSelectable: !0,
            ariaEnabled: !0,
            collapsible: !0,
            carouselFocus: !0,
            initialOpenAttribute: 'data-open',
            initialOpenTransition: !0,
            initialOpenTransitionDelay: 200,
            headerOpenClass: 'handorgel__header--open',
            contentOpenClass: 'handorgel__content--open',
            headerOpenedClass: 'handorgel__header--opened',
            contentOpenedClass: 'handorgel__content--opened',
            headerDisabledClass: 'handorgel__header--disabled',
            contentDisabledClass: 'handorgel__content--disabled',
            headerFocusClass: 'handorgel__header--focus',
            contentFocusClass: 'handorgel__content--focus'
        }),
        y
    );
});
