(function () {
    const t = document.createElement('link').relList;
    if (t && t.supports && t.supports('modulepreload')) return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
        r(i);
    new MutationObserver((i) => {
        for (const a of i)
            if (a.type === 'childList')
                for (const o of a.addedNodes)
                    o.tagName === 'LINK' && o.rel === 'modulepreload' && r(o);
    }).observe(document, { childList: !0, subtree: !0 });
    function n(i) {
        const a = {};
        return (
            i.integrity && (a.integrity = i.integrity),
            i.referrerPolicy && (a.referrerPolicy = i.referrerPolicy),
            i.crossOrigin === 'use-credentials'
                ? (a.credentials = 'include')
                : i.crossOrigin === 'anonymous'
                ? (a.credentials = 'omit')
                : (a.credentials = 'same-origin'),
            a
        );
    }
    function r(i) {
        if (i.ep) return;
        i.ep = !0;
        const a = n(i);
        fetch(i.href, a);
    }
})();
function F0(e) {
    return e &&
        e.__esModule &&
        Object.prototype.hasOwnProperty.call(e, 'default')
        ? e.default
        : e;
}
var Zh = { exports: {} },
    Vo = {},
    em = { exports: {} },
    D = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Gi = Symbol.for('react.element'),
    $0 = Symbol.for('react.portal'),
    R0 = Symbol.for('react.fragment'),
    O0 = Symbol.for('react.strict_mode'),
    D0 = Symbol.for('react.profiler'),
    U0 = Symbol.for('react.provider'),
    H0 = Symbol.for('react.context'),
    W0 = Symbol.for('react.forward_ref'),
    V0 = Symbol.for('react.suspense'),
    B0 = Symbol.for('react.memo'),
    Y0 = Symbol.for('react.lazy'),
    ff = Symbol.iterator;
function G0(e) {
    return e === null || typeof e != 'object'
        ? null
        : ((e = (ff && e[ff]) || e['@@iterator']),
          typeof e == 'function' ? e : null);
}
var tm = {
        isMounted: function () {
            return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {}
    },
    nm = Object.assign,
    rm = {};
function Ir(e, t, n) {
    (this.props = e),
        (this.context = t),
        (this.refs = rm),
        (this.updater = n || tm);
}
Ir.prototype.isReactComponent = {};
Ir.prototype.setState = function (e, t) {
    if (typeof e != 'object' && typeof e != 'function' && e != null)
        throw Error(
            'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
        );
    this.updater.enqueueSetState(this, e, t, 'setState');
};
Ir.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
};
function im() {}
im.prototype = Ir.prototype;
function Uu(e, t, n) {
    (this.props = e),
        (this.context = t),
        (this.refs = rm),
        (this.updater = n || tm);
}
var Hu = (Uu.prototype = new im());
Hu.constructor = Uu;
nm(Hu, Ir.prototype);
Hu.isPureReactComponent = !0;
var df = Array.isArray,
    am = Object.prototype.hasOwnProperty,
    Wu = { current: null },
    om = { key: !0, ref: !0, __self: !0, __source: !0 };
function sm(e, t, n) {
    var r,
        i = {},
        a = null,
        o = null;
    if (t != null)
        for (r in (t.ref !== void 0 && (o = t.ref),
        t.key !== void 0 && (a = '' + t.key),
        t))
            am.call(t, r) && !om.hasOwnProperty(r) && (i[r] = t[r]);
    var s = arguments.length - 2;
    if (s === 1) i.children = n;
    else if (1 < s) {
        for (var l = Array(s), u = 0; u < s; u++) l[u] = arguments[u + 2];
        i.children = l;
    }
    if (e && e.defaultProps)
        for (r in ((s = e.defaultProps), s)) i[r] === void 0 && (i[r] = s[r]);
    return {
        $$typeof: Gi,
        type: e,
        key: a,
        ref: o,
        props: i,
        _owner: Wu.current
    };
}
function X0(e, t) {
    return {
        $$typeof: Gi,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner
    };
}
function Vu(e) {
    return typeof e == 'object' && e !== null && e.$$typeof === Gi;
}
function K0(e) {
    var t = { '=': '=0', ':': '=2' };
    return (
        '$' +
        e.replace(/[=:]/g, function (n) {
            return t[n];
        })
    );
}
var hf = /\/+/g;
function vs(e, t) {
    return typeof e == 'object' && e !== null && e.key != null
        ? K0('' + e.key)
        : t.toString(36);
}
function za(e, t, n, r, i) {
    var a = typeof e;
    (a === 'undefined' || a === 'boolean') && (e = null);
    var o = !1;
    if (e === null) o = !0;
    else
        switch (a) {
            case 'string':
            case 'number':
                o = !0;
                break;
            case 'object':
                switch (e.$$typeof) {
                    case Gi:
                    case $0:
                        o = !0;
                }
        }
    if (o)
        return (
            (o = e),
            (i = i(o)),
            (e = r === '' ? '.' + vs(o, 0) : r),
            df(i)
                ? ((n = ''),
                  e != null && (n = e.replace(hf, '$&/') + '/'),
                  za(i, t, n, '', function (u) {
                      return u;
                  }))
                : i != null &&
                  (Vu(i) &&
                      (i = X0(
                          i,
                          n +
                              (!i.key || (o && o.key === i.key)
                                  ? ''
                                  : ('' + i.key).replace(hf, '$&/') + '/') +
                              e
                      )),
                  t.push(i)),
            1
        );
    if (((o = 0), (r = r === '' ? '.' : r + ':'), df(e)))
        for (var s = 0; s < e.length; s++) {
            a = e[s];
            var l = r + vs(a, s);
            o += za(a, t, n, l, i);
        }
    else if (((l = G0(e)), typeof l == 'function'))
        for (e = l.call(e), s = 0; !(a = e.next()).done; )
            (a = a.value), (l = r + vs(a, s++)), (o += za(a, t, n, l, i));
    else if (a === 'object')
        throw (
            ((t = String(e)),
            Error(
                'Objects are not valid as a React child (found: ' +
                    (t === '[object Object]'
                        ? 'object with keys {' + Object.keys(e).join(', ') + '}'
                        : t) +
                    '). If you meant to render a collection of children, use an array instead.'
            ))
        );
    return o;
}
function oa(e, t, n) {
    if (e == null) return e;
    var r = [],
        i = 0;
    return (
        za(e, r, '', '', function (a) {
            return t.call(n, a, i++);
        }),
        r
    );
}
function Q0(e) {
    if (e._status === -1) {
        var t = e._result;
        (t = t()),
            t.then(
                function (n) {
                    (e._status === 0 || e._status === -1) &&
                        ((e._status = 1), (e._result = n));
                },
                function (n) {
                    (e._status === 0 || e._status === -1) &&
                        ((e._status = 2), (e._result = n));
                }
            ),
            e._status === -1 && ((e._status = 0), (e._result = t));
    }
    if (e._status === 1) return e._result.default;
    throw e._result;
}
var be = { current: null },
    La = { transition: null },
    q0 = {
        ReactCurrentDispatcher: be,
        ReactCurrentBatchConfig: La,
        ReactCurrentOwner: Wu
    };
function lm() {
    throw Error('act(...) is not supported in production builds of React.');
}
D.Children = {
    map: oa,
    forEach: function (e, t, n) {
        oa(
            e,
            function () {
                t.apply(this, arguments);
            },
            n
        );
    },
    count: function (e) {
        var t = 0;
        return (
            oa(e, function () {
                t++;
            }),
            t
        );
    },
    toArray: function (e) {
        return (
            oa(e, function (t) {
                return t;
            }) || []
        );
    },
    only: function (e) {
        if (!Vu(e))
            throw Error(
                'React.Children.only expected to receive a single React element child.'
            );
        return e;
    }
};
D.Component = Ir;
D.Fragment = R0;
D.Profiler = D0;
D.PureComponent = Uu;
D.StrictMode = O0;
D.Suspense = V0;
D.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = q0;
D.act = lm;
D.cloneElement = function (e, t, n) {
    if (e == null)
        throw Error(
            'React.cloneElement(...): The argument must be a React element, but you passed ' +
                e +
                '.'
        );
    var r = nm({}, e.props),
        i = e.key,
        a = e.ref,
        o = e._owner;
    if (t != null) {
        if (
            (t.ref !== void 0 && ((a = t.ref), (o = Wu.current)),
            t.key !== void 0 && (i = '' + t.key),
            e.type && e.type.defaultProps)
        )
            var s = e.type.defaultProps;
        for (l in t)
            am.call(t, l) &&
                !om.hasOwnProperty(l) &&
                (r[l] = t[l] === void 0 && s !== void 0 ? s[l] : t[l]);
    }
    var l = arguments.length - 2;
    if (l === 1) r.children = n;
    else if (1 < l) {
        s = Array(l);
        for (var u = 0; u < l; u++) s[u] = arguments[u + 2];
        r.children = s;
    }
    return { $$typeof: Gi, type: e.type, key: i, ref: a, props: r, _owner: o };
};
D.createContext = function (e) {
    return (
        (e = {
            $$typeof: H0,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _defaultValue: null,
            _globalName: null
        }),
        (e.Provider = { $$typeof: U0, _context: e }),
        (e.Consumer = e)
    );
};
D.createElement = sm;
D.createFactory = function (e) {
    var t = sm.bind(null, e);
    return (t.type = e), t;
};
D.createRef = function () {
    return { current: null };
};
D.forwardRef = function (e) {
    return { $$typeof: W0, render: e };
};
D.isValidElement = Vu;
D.lazy = function (e) {
    return { $$typeof: Y0, _payload: { _status: -1, _result: e }, _init: Q0 };
};
D.memo = function (e, t) {
    return { $$typeof: B0, type: e, compare: t === void 0 ? null : t };
};
D.startTransition = function (e) {
    var t = La.transition;
    La.transition = {};
    try {
        e();
    } finally {
        La.transition = t;
    }
};
D.unstable_act = lm;
D.useCallback = function (e, t) {
    return be.current.useCallback(e, t);
};
D.useContext = function (e) {
    return be.current.useContext(e);
};
D.useDebugValue = function () {};
D.useDeferredValue = function (e) {
    return be.current.useDeferredValue(e);
};
D.useEffect = function (e, t) {
    return be.current.useEffect(e, t);
};
D.useId = function () {
    return be.current.useId();
};
D.useImperativeHandle = function (e, t, n) {
    return be.current.useImperativeHandle(e, t, n);
};
D.useInsertionEffect = function (e, t) {
    return be.current.useInsertionEffect(e, t);
};
D.useLayoutEffect = function (e, t) {
    return be.current.useLayoutEffect(e, t);
};
D.useMemo = function (e, t) {
    return be.current.useMemo(e, t);
};
D.useReducer = function (e, t, n) {
    return be.current.useReducer(e, t, n);
};
D.useRef = function (e) {
    return be.current.useRef(e);
};
D.useState = function (e) {
    return be.current.useState(e);
};
D.useSyncExternalStore = function (e, t, n) {
    return be.current.useSyncExternalStore(e, t, n);
};
D.useTransition = function () {
    return be.current.useTransition();
};
D.version = '18.3.1';
em.exports = D;
var E = em.exports;
const Ve = F0(E);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var J0 = E,
    Z0 = Symbol.for('react.element'),
    ev = Symbol.for('react.fragment'),
    tv = Object.prototype.hasOwnProperty,
    nv =
        J0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    rv = { key: !0, ref: !0, __self: !0, __source: !0 };
function um(e, t, n) {
    var r,
        i = {},
        a = null,
        o = null;
    n !== void 0 && (a = '' + n),
        t.key !== void 0 && (a = '' + t.key),
        t.ref !== void 0 && (o = t.ref);
    for (r in t) tv.call(t, r) && !rv.hasOwnProperty(r) && (i[r] = t[r]);
    if (e && e.defaultProps)
        for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
    return {
        $$typeof: Z0,
        type: e,
        key: a,
        ref: o,
        props: i,
        _owner: nv.current
    };
}
Vo.Fragment = ev;
Vo.jsx = um;
Vo.jsxs = um;
Zh.exports = Vo;
var x = Zh.exports,
    cm = { exports: {} },
    Oe = {},
    fm = { exports: {} },
    dm = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
    function t(T, L) {
        var M = T.length;
        T.push(L);
        e: for (; 0 < M; ) {
            var B = (M - 1) >>> 1,
                Y = T[B];
            if (0 < i(Y, L)) (T[B] = L), (T[M] = Y), (M = B);
            else break e;
        }
    }
    function n(T) {
        return T.length === 0 ? null : T[0];
    }
    function r(T) {
        if (T.length === 0) return null;
        var L = T[0],
            M = T.pop();
        if (M !== L) {
            T[0] = M;
            e: for (var B = 0, Y = T.length, fe = Y >>> 1; B < fe; ) {
                var Ee = 2 * (B + 1) - 1,
                    ut = T[Ee],
                    Qe = Ee + 1,
                    vt = T[Qe];
                if (0 > i(ut, M))
                    Qe < Y && 0 > i(vt, ut)
                        ? ((T[B] = vt), (T[Qe] = M), (B = Qe))
                        : ((T[B] = ut), (T[Ee] = M), (B = Ee));
                else if (Qe < Y && 0 > i(vt, M))
                    (T[B] = vt), (T[Qe] = M), (B = Qe);
                else break e;
            }
        }
        return L;
    }
    function i(T, L) {
        var M = T.sortIndex - L.sortIndex;
        return M !== 0 ? M : T.id - L.id;
    }
    if (
        typeof performance == 'object' &&
        typeof performance.now == 'function'
    ) {
        var a = performance;
        e.unstable_now = function () {
            return a.now();
        };
    } else {
        var o = Date,
            s = o.now();
        e.unstable_now = function () {
            return o.now() - s;
        };
    }
    var l = [],
        u = [],
        f = 1,
        c = null,
        d = 3,
        g = !1,
        w = !1,
        y = !1,
        b = typeof setTimeout == 'function' ? setTimeout : null,
        m = typeof clearTimeout == 'function' ? clearTimeout : null,
        h = typeof setImmediate < 'u' ? setImmediate : null;
    typeof navigator < 'u' &&
        navigator.scheduling !== void 0 &&
        navigator.scheduling.isInputPending !== void 0 &&
        navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function p(T) {
        for (var L = n(u); L !== null; ) {
            if (L.callback === null) r(u);
            else if (L.startTime <= T)
                r(u), (L.sortIndex = L.expirationTime), t(l, L);
            else break;
            L = n(u);
        }
    }
    function v(T) {
        if (((y = !1), p(T), !w))
            if (n(l) !== null) (w = !0), oe(S);
            else {
                var L = n(u);
                L !== null && Z(v, L.startTime - T);
            }
    }
    function S(T, L) {
        (w = !1), y && ((y = !1), m(A), (A = -1)), (g = !0);
        var M = d;
        try {
            for (
                p(L), c = n(l);
                c !== null && (!(c.expirationTime > L) || (T && !R()));

            ) {
                var B = c.callback;
                if (typeof B == 'function') {
                    (c.callback = null), (d = c.priorityLevel);
                    var Y = B(c.expirationTime <= L);
                    (L = e.unstable_now()),
                        typeof Y == 'function'
                            ? (c.callback = Y)
                            : c === n(l) && r(l),
                        p(L);
                } else r(l);
                c = n(l);
            }
            if (c !== null) var fe = !0;
            else {
                var Ee = n(u);
                Ee !== null && Z(v, Ee.startTime - L), (fe = !1);
            }
            return fe;
        } finally {
            (c = null), (d = M), (g = !1);
        }
    }
    var _ = !1,
        k = null,
        A = -1,
        $ = 5,
        P = -1;
    function R() {
        return !(e.unstable_now() - P < $);
    }
    function I() {
        if (k !== null) {
            var T = e.unstable_now();
            P = T;
            var L = !0;
            try {
                L = k(!0, T);
            } finally {
                L ? U() : ((_ = !1), (k = null));
            }
        } else _ = !1;
    }
    var U;
    if (typeof h == 'function')
        U = function () {
            h(I);
        };
    else if (typeof MessageChannel < 'u') {
        var W = new MessageChannel(),
            q = W.port2;
        (W.port1.onmessage = I),
            (U = function () {
                q.postMessage(null);
            });
    } else
        U = function () {
            b(I, 0);
        };
    function oe(T) {
        (k = T), _ || ((_ = !0), U());
    }
    function Z(T, L) {
        A = b(function () {
            T(e.unstable_now());
        }, L);
    }
    (e.unstable_IdlePriority = 5),
        (e.unstable_ImmediatePriority = 1),
        (e.unstable_LowPriority = 4),
        (e.unstable_NormalPriority = 3),
        (e.unstable_Profiling = null),
        (e.unstable_UserBlockingPriority = 2),
        (e.unstable_cancelCallback = function (T) {
            T.callback = null;
        }),
        (e.unstable_continueExecution = function () {
            w || g || ((w = !0), oe(S));
        }),
        (e.unstable_forceFrameRate = function (T) {
            0 > T || 125 < T
                ? console.error(
                      'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                  )
                : ($ = 0 < T ? Math.floor(1e3 / T) : 5);
        }),
        (e.unstable_getCurrentPriorityLevel = function () {
            return d;
        }),
        (e.unstable_getFirstCallbackNode = function () {
            return n(l);
        }),
        (e.unstable_next = function (T) {
            switch (d) {
                case 1:
                case 2:
                case 3:
                    var L = 3;
                    break;
                default:
                    L = d;
            }
            var M = d;
            d = L;
            try {
                return T();
            } finally {
                d = M;
            }
        }),
        (e.unstable_pauseExecution = function () {}),
        (e.unstable_requestPaint = function () {}),
        (e.unstable_runWithPriority = function (T, L) {
            switch (T) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                default:
                    T = 3;
            }
            var M = d;
            d = T;
            try {
                return L();
            } finally {
                d = M;
            }
        }),
        (e.unstable_scheduleCallback = function (T, L, M) {
            var B = e.unstable_now();
            switch (
                (typeof M == 'object' && M !== null
                    ? ((M = M.delay),
                      (M = typeof M == 'number' && 0 < M ? B + M : B))
                    : (M = B),
                T)
            ) {
                case 1:
                    var Y = -1;
                    break;
                case 2:
                    Y = 250;
                    break;
                case 5:
                    Y = 1073741823;
                    break;
                case 4:
                    Y = 1e4;
                    break;
                default:
                    Y = 5e3;
            }
            return (
                (Y = M + Y),
                (T = {
                    id: f++,
                    callback: L,
                    priorityLevel: T,
                    startTime: M,
                    expirationTime: Y,
                    sortIndex: -1
                }),
                M > B
                    ? ((T.sortIndex = M),
                      t(u, T),
                      n(l) === null &&
                          T === n(u) &&
                          (y ? (m(A), (A = -1)) : (y = !0), Z(v, M - B)))
                    : ((T.sortIndex = Y), t(l, T), w || g || ((w = !0), oe(S))),
                T
            );
        }),
        (e.unstable_shouldYield = R),
        (e.unstable_wrapCallback = function (T) {
            var L = d;
            return function () {
                var M = d;
                d = L;
                try {
                    return T.apply(this, arguments);
                } finally {
                    d = M;
                }
            };
        });
})(dm);
fm.exports = dm;
var iv = fm.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var av = E,
    Fe = iv;
function C(e) {
    for (
        var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e,
            n = 1;
        n < arguments.length;
        n++
    )
        t += '&args[]=' + encodeURIComponent(arguments[n]);
    return (
        'Minified React error #' +
        e +
        '; visit ' +
        t +
        ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
}
var hm = new Set(),
    _i = {};
function Rn(e, t) {
    xr(e, t), xr(e + 'Capture', t);
}
function xr(e, t) {
    for (_i[e] = t, e = 0; e < t.length; e++) hm.add(t[e]);
}
var At = !(
        typeof window > 'u' ||
        typeof window.document > 'u' ||
        typeof window.document.createElement > 'u'
    ),
    pl = Object.prototype.hasOwnProperty,
    ov =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    mf = {},
    pf = {};
function sv(e) {
    return pl.call(pf, e)
        ? !0
        : pl.call(mf, e)
        ? !1
        : ov.test(e)
        ? (pf[e] = !0)
        : ((mf[e] = !0), !1);
}
function lv(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
        case 'function':
        case 'symbol':
            return !0;
        case 'boolean':
            return r
                ? !1
                : n !== null
                ? !n.acceptsBooleans
                : ((e = e.toLowerCase().slice(0, 5)),
                  e !== 'data-' && e !== 'aria-');
        default:
            return !1;
    }
}
function uv(e, t, n, r) {
    if (t === null || typeof t > 'u' || lv(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null)
        switch (n.type) {
            case 3:
                return !t;
            case 4:
                return t === !1;
            case 5:
                return isNaN(t);
            case 6:
                return isNaN(t) || 1 > t;
        }
    return !1;
}
function _e(e, t, n, r, i, a, o) {
    (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
        (this.attributeName = r),
        (this.attributeNamespace = i),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = a),
        (this.removeEmptyString = o);
}
var pe = {};
'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
    .split(' ')
    .forEach(function (e) {
        pe[e] = new _e(e, 0, !1, e, null, !1, !1);
    });
[
    ['acceptCharset', 'accept-charset'],
    ['className', 'class'],
    ['htmlFor', 'for'],
    ['httpEquiv', 'http-equiv']
].forEach(function (e) {
    var t = e[0];
    pe[t] = new _e(t, 1, !1, e[1], null, !1, !1);
});
['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
    pe[e] = new _e(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
    'autoReverse',
    'externalResourcesRequired',
    'focusable',
    'preserveAlpha'
].forEach(function (e) {
    pe[e] = new _e(e, 2, !1, e, null, !1, !1);
});
'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
    .split(' ')
    .forEach(function (e) {
        pe[e] = new _e(e, 3, !1, e.toLowerCase(), null, !1, !1);
    });
['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
    pe[e] = new _e(e, 3, !0, e, null, !1, !1);
});
['capture', 'download'].forEach(function (e) {
    pe[e] = new _e(e, 4, !1, e, null, !1, !1);
});
['cols', 'rows', 'size', 'span'].forEach(function (e) {
    pe[e] = new _e(e, 6, !1, e, null, !1, !1);
});
['rowSpan', 'start'].forEach(function (e) {
    pe[e] = new _e(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Bu = /[\-:]([a-z])/g;
function Yu(e) {
    return e[1].toUpperCase();
}
'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
    .split(' ')
    .forEach(function (e) {
        var t = e.replace(Bu, Yu);
        pe[t] = new _e(t, 1, !1, e, null, !1, !1);
    });
'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
    .split(' ')
    .forEach(function (e) {
        var t = e.replace(Bu, Yu);
        pe[t] = new _e(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
    });
['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
    var t = e.replace(Bu, Yu);
    pe[t] = new _e(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
});
['tabIndex', 'crossOrigin'].forEach(function (e) {
    pe[e] = new _e(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
pe.xlinkHref = new _e(
    'xlinkHref',
    1,
    !1,
    'xlink:href',
    'http://www.w3.org/1999/xlink',
    !0,
    !1
);
['src', 'href', 'action', 'formAction'].forEach(function (e) {
    pe[e] = new _e(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Gu(e, t, n, r) {
    var i = pe.hasOwnProperty(t) ? pe[t] : null;
    (i !== null
        ? i.type !== 0
        : r ||
          !(2 < t.length) ||
          (t[0] !== 'o' && t[0] !== 'O') ||
          (t[1] !== 'n' && t[1] !== 'N')) &&
        (uv(t, n, i, r) && (n = null),
        r || i === null
            ? sv(t) &&
              (n === null ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
            : i.mustUseProperty
            ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : '') : n)
            : ((t = i.attributeName),
              (r = i.attributeNamespace),
              n === null
                  ? e.removeAttribute(t)
                  : ((i = i.type),
                    (n = i === 3 || (i === 4 && n === !0) ? '' : '' + n),
                    r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Ft = av.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    sa = Symbol.for('react.element'),
    Kn = Symbol.for('react.portal'),
    Qn = Symbol.for('react.fragment'),
    Xu = Symbol.for('react.strict_mode'),
    gl = Symbol.for('react.profiler'),
    mm = Symbol.for('react.provider'),
    pm = Symbol.for('react.context'),
    Ku = Symbol.for('react.forward_ref'),
    yl = Symbol.for('react.suspense'),
    vl = Symbol.for('react.suspense_list'),
    Qu = Symbol.for('react.memo'),
    Dt = Symbol.for('react.lazy'),
    gm = Symbol.for('react.offscreen'),
    gf = Symbol.iterator;
function Hr(e) {
    return e === null || typeof e != 'object'
        ? null
        : ((e = (gf && e[gf]) || e['@@iterator']),
          typeof e == 'function' ? e : null);
}
var ne = Object.assign,
    ws;
function Jr(e) {
    if (ws === void 0)
        try {
            throw Error();
        } catch (n) {
            var t = n.stack.trim().match(/\n( *(at )?)/);
            ws = (t && t[1]) || '';
        }
    return (
        `
` +
        ws +
        e
    );
}
var xs = !1;
function ks(e, t) {
    if (!e || xs) return '';
    xs = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (
                ((t = function () {
                    throw Error();
                }),
                Object.defineProperty(t.prototype, 'props', {
                    set: function () {
                        throw Error();
                    }
                }),
                typeof Reflect == 'object' && Reflect.construct)
            ) {
                try {
                    Reflect.construct(t, []);
                } catch (u) {
                    var r = u;
                }
                Reflect.construct(e, [], t);
            } else {
                try {
                    t.call();
                } catch (u) {
                    r = u;
                }
                e.call(t.prototype);
            }
        else {
            try {
                throw Error();
            } catch (u) {
                r = u;
            }
            e();
        }
    } catch (u) {
        if (u && r && typeof u.stack == 'string') {
            for (
                var i = u.stack.split(`
`),
                    a = r.stack.split(`
`),
                    o = i.length - 1,
                    s = a.length - 1;
                1 <= o && 0 <= s && i[o] !== a[s];

            )
                s--;
            for (; 1 <= o && 0 <= s; o--, s--)
                if (i[o] !== a[s]) {
                    if (o !== 1 || s !== 1)
                        do
                            if ((o--, s--, 0 > s || i[o] !== a[s])) {
                                var l =
                                    `
` + i[o].replace(' at new ', ' at ');
                                return (
                                    e.displayName &&
                                        l.includes('<anonymous>') &&
                                        (l = l.replace(
                                            '<anonymous>',
                                            e.displayName
                                        )),
                                    l
                                );
                            }
                        while (1 <= o && 0 <= s);
                    break;
                }
        }
    } finally {
        (xs = !1), (Error.prepareStackTrace = n);
    }
    return (e = e ? e.displayName || e.name : '') ? Jr(e) : '';
}
function cv(e) {
    switch (e.tag) {
        case 5:
            return Jr(e.type);
        case 16:
            return Jr('Lazy');
        case 13:
            return Jr('Suspense');
        case 19:
            return Jr('SuspenseList');
        case 0:
        case 2:
        case 15:
            return (e = ks(e.type, !1)), e;
        case 11:
            return (e = ks(e.type.render, !1)), e;
        case 1:
            return (e = ks(e.type, !0)), e;
        default:
            return '';
    }
}
function wl(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
        case Qn:
            return 'Fragment';
        case Kn:
            return 'Portal';
        case gl:
            return 'Profiler';
        case Xu:
            return 'StrictMode';
        case yl:
            return 'Suspense';
        case vl:
            return 'SuspenseList';
    }
    if (typeof e == 'object')
        switch (e.$$typeof) {
            case pm:
                return (e.displayName || 'Context') + '.Consumer';
            case mm:
                return (e._context.displayName || 'Context') + '.Provider';
            case Ku:
                var t = e.render;
                return (
                    (e = e.displayName),
                    e ||
                        ((e = t.displayName || t.name || ''),
                        (e =
                            e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
                    e
                );
            case Qu:
                return (
                    (t = e.displayName || null),
                    t !== null ? t : wl(e.type) || 'Memo'
                );
            case Dt:
                (t = e._payload), (e = e._init);
                try {
                    return wl(e(t));
                } catch {}
        }
    return null;
}
function fv(e) {
    var t = e.type;
    switch (e.tag) {
        case 24:
            return 'Cache';
        case 9:
            return (t.displayName || 'Context') + '.Consumer';
        case 10:
            return (t._context.displayName || 'Context') + '.Provider';
        case 18:
            return 'DehydratedFragment';
        case 11:
            return (
                (e = t.render),
                (e = e.displayName || e.name || ''),
                t.displayName ||
                    (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
            );
        case 7:
            return 'Fragment';
        case 5:
            return t;
        case 4:
            return 'Portal';
        case 3:
            return 'Root';
        case 6:
            return 'Text';
        case 16:
            return wl(t);
        case 8:
            return t === Xu ? 'StrictMode' : 'Mode';
        case 22:
            return 'Offscreen';
        case 12:
            return 'Profiler';
        case 21:
            return 'Scope';
        case 13:
            return 'Suspense';
        case 19:
            return 'SuspenseList';
        case 25:
            return 'TracingMarker';
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
            if (typeof t == 'function') return t.displayName || t.name || null;
            if (typeof t == 'string') return t;
    }
    return null;
}
function en(e) {
    switch (typeof e) {
        case 'boolean':
        case 'number':
        case 'string':
        case 'undefined':
            return e;
        case 'object':
            return e;
        default:
            return '';
    }
}
function ym(e) {
    var t = e.type;
    return (
        (e = e.nodeName) &&
        e.toLowerCase() === 'input' &&
        (t === 'checkbox' || t === 'radio')
    );
}
function dv(e) {
    var t = ym(e) ? 'checked' : 'value',
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = '' + e[t];
    if (
        !e.hasOwnProperty(t) &&
        typeof n < 'u' &&
        typeof n.get == 'function' &&
        typeof n.set == 'function'
    ) {
        var i = n.get,
            a = n.set;
        return (
            Object.defineProperty(e, t, {
                configurable: !0,
                get: function () {
                    return i.call(this);
                },
                set: function (o) {
                    (r = '' + o), a.call(this, o);
                }
            }),
            Object.defineProperty(e, t, { enumerable: n.enumerable }),
            {
                getValue: function () {
                    return r;
                },
                setValue: function (o) {
                    r = '' + o;
                },
                stopTracking: function () {
                    (e._valueTracker = null), delete e[t];
                }
            }
        );
    }
}
function la(e) {
    e._valueTracker || (e._valueTracker = dv(e));
}
function vm(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
        r = '';
    return (
        e && (r = ym(e) ? (e.checked ? 'true' : 'false') : e.value),
        (e = r),
        e !== n ? (t.setValue(e), !0) : !1
    );
}
function no(e) {
    if (
        ((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')
    )
        return null;
    try {
        return e.activeElement || e.body;
    } catch {
        return e.body;
    }
}
function xl(e, t) {
    var n = t.checked;
    return ne({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked
    });
}
function yf(e, t) {
    var n = t.defaultValue == null ? '' : t.defaultValue,
        r = t.checked != null ? t.checked : t.defaultChecked;
    (n = en(t.value != null ? t.value : n)),
        (e._wrapperState = {
            initialChecked: r,
            initialValue: n,
            controlled:
                t.type === 'checkbox' || t.type === 'radio'
                    ? t.checked != null
                    : t.value != null
        });
}
function wm(e, t) {
    (t = t.checked), t != null && Gu(e, 'checked', t, !1);
}
function kl(e, t) {
    wm(e, t);
    var n = en(t.value),
        r = t.type;
    if (n != null)
        r === 'number'
            ? ((n === 0 && e.value === '') || e.value != n) &&
              (e.value = '' + n)
            : e.value !== '' + n && (e.value = '' + n);
    else if (r === 'submit' || r === 'reset') {
        e.removeAttribute('value');
        return;
    }
    t.hasOwnProperty('value')
        ? Sl(e, t.type, n)
        : t.hasOwnProperty('defaultValue') && Sl(e, t.type, en(t.defaultValue)),
        t.checked == null &&
            t.defaultChecked != null &&
            (e.defaultChecked = !!t.defaultChecked);
}
function vf(e, t, n) {
    if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
        var r = t.type;
        if (
            !(
                (r !== 'submit' && r !== 'reset') ||
                (t.value !== void 0 && t.value !== null)
            )
        )
            return;
        (t = '' + e._wrapperState.initialValue),
            n || t === e.value || (e.value = t),
            (e.defaultValue = t);
    }
    (n = e.name),
        n !== '' && (e.name = ''),
        (e.defaultChecked = !!e._wrapperState.initialChecked),
        n !== '' && (e.name = n);
}
function Sl(e, t, n) {
    (t !== 'number' || no(e.ownerDocument) !== e) &&
        (n == null
            ? (e.defaultValue = '' + e._wrapperState.initialValue)
            : e.defaultValue !== '' + n && (e.defaultValue = '' + n));
}
var Zr = Array.isArray;
function dr(e, t, n, r) {
    if (((e = e.options), t)) {
        t = {};
        for (var i = 0; i < n.length; i++) t['$' + n[i]] = !0;
        for (n = 0; n < e.length; n++)
            (i = t.hasOwnProperty('$' + e[n].value)),
                e[n].selected !== i && (e[n].selected = i),
                i && r && (e[n].defaultSelected = !0);
    } else {
        for (n = '' + en(n), t = null, i = 0; i < e.length; i++) {
            if (e[i].value === n) {
                (e[i].selected = !0), r && (e[i].defaultSelected = !0);
                return;
            }
            t !== null || e[i].disabled || (t = e[i]);
        }
        t !== null && (t.selected = !0);
    }
}
function bl(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(C(91));
    return ne({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: '' + e._wrapperState.initialValue
    });
}
function wf(e, t) {
    var n = t.value;
    if (n == null) {
        if (((n = t.children), (t = t.defaultValue), n != null)) {
            if (t != null) throw Error(C(92));
            if (Zr(n)) {
                if (1 < n.length) throw Error(C(93));
                n = n[0];
            }
            t = n;
        }
        t == null && (t = ''), (n = t);
    }
    e._wrapperState = { initialValue: en(n) };
}
function xm(e, t) {
    var n = en(t.value),
        r = en(t.defaultValue);
    n != null &&
        ((n = '' + n),
        n !== e.value && (e.value = n),
        t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
        r != null && (e.defaultValue = '' + r);
}
function xf(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
        t !== '' &&
        t !== null &&
        (e.value = t);
}
function km(e) {
    switch (e) {
        case 'svg':
            return 'http://www.w3.org/2000/svg';
        case 'math':
            return 'http://www.w3.org/1998/Math/MathML';
        default:
            return 'http://www.w3.org/1999/xhtml';
    }
}
function _l(e, t) {
    return e == null || e === 'http://www.w3.org/1999/xhtml'
        ? km(t)
        : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
        ? 'http://www.w3.org/1999/xhtml'
        : e;
}
var ua,
    Sm = (function (e) {
        return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
            ? function (t, n, r, i) {
                  MSApp.execUnsafeLocalFunction(function () {
                      return e(t, n, r, i);
                  });
              }
            : e;
    })(function (e, t) {
        if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e)
            e.innerHTML = t;
        else {
            for (
                ua = ua || document.createElement('div'),
                    ua.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
                    t = ua.firstChild;
                e.firstChild;

            )
                e.removeChild(e.firstChild);
            for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
    });
function Ei(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return;
        }
    }
    e.textContent = t;
}
var ui = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0
    },
    hv = ['Webkit', 'ms', 'Moz', 'O'];
Object.keys(ui).forEach(function (e) {
    hv.forEach(function (t) {
        (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (ui[t] = ui[e]);
    });
});
function bm(e, t, n) {
    return t == null || typeof t == 'boolean' || t === ''
        ? ''
        : n ||
          typeof t != 'number' ||
          t === 0 ||
          (ui.hasOwnProperty(e) && ui[e])
        ? ('' + t).trim()
        : t + 'px';
}
function _m(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf('--') === 0,
                i = bm(n, t[n], r);
            n === 'float' && (n = 'cssFloat'),
                r ? e.setProperty(n, i) : (e[n] = i);
        }
}
var mv = ne(
    { menuitem: !0 },
    {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0
    }
);
function El(e, t) {
    if (t) {
        if (mv[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
            throw Error(C(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null) throw Error(C(60));
            if (
                typeof t.dangerouslySetInnerHTML != 'object' ||
                !('__html' in t.dangerouslySetInnerHTML)
            )
                throw Error(C(61));
        }
        if (t.style != null && typeof t.style != 'object') throw Error(C(62));
    }
}
function Cl(e, t) {
    if (e.indexOf('-') === -1) return typeof t.is == 'string';
    switch (e) {
        case 'annotation-xml':
        case 'color-profile':
        case 'font-face':
        case 'font-face-src':
        case 'font-face-uri':
        case 'font-face-format':
        case 'font-face-name':
        case 'missing-glyph':
            return !1;
        default:
            return !0;
    }
}
var Nl = null;
function qu(e) {
    return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
    );
}
var Al = null,
    hr = null,
    mr = null;
function kf(e) {
    if ((e = Qi(e))) {
        if (typeof Al != 'function') throw Error(C(280));
        var t = e.stateNode;
        t && ((t = Ko(t)), Al(e.stateNode, e.type, t));
    }
}
function Em(e) {
    hr ? (mr ? mr.push(e) : (mr = [e])) : (hr = e);
}
function Cm() {
    if (hr) {
        var e = hr,
            t = mr;
        if (((mr = hr = null), kf(e), t))
            for (e = 0; e < t.length; e++) kf(t[e]);
    }
}
function Nm(e, t) {
    return e(t);
}
function Am() {}
var Ss = !1;
function Tm(e, t, n) {
    if (Ss) return e(t, n);
    Ss = !0;
    try {
        return Nm(e, t, n);
    } finally {
        (Ss = !1), (hr !== null || mr !== null) && (Am(), Cm());
    }
}
function Ci(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = Ko(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
        case 'onClick':
        case 'onClickCapture':
        case 'onDoubleClick':
        case 'onDoubleClickCapture':
        case 'onMouseDown':
        case 'onMouseDownCapture':
        case 'onMouseMove':
        case 'onMouseMoveCapture':
        case 'onMouseUp':
        case 'onMouseUpCapture':
        case 'onMouseEnter':
            (r = !r.disabled) ||
                ((e = e.type),
                (r = !(
                    e === 'button' ||
                    e === 'input' ||
                    e === 'select' ||
                    e === 'textarea'
                ))),
                (e = !r);
            break e;
        default:
            e = !1;
    }
    if (e) return null;
    if (n && typeof n != 'function') throw Error(C(231, t, typeof n));
    return n;
}
var Tl = !1;
if (At)
    try {
        var Wr = {};
        Object.defineProperty(Wr, 'passive', {
            get: function () {
                Tl = !0;
            }
        }),
            window.addEventListener('test', Wr, Wr),
            window.removeEventListener('test', Wr, Wr);
    } catch {
        Tl = !1;
    }
function pv(e, t, n, r, i, a, o, s, l) {
    var u = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, u);
    } catch (f) {
        this.onError(f);
    }
}
var ci = !1,
    ro = null,
    io = !1,
    Pl = null,
    gv = {
        onError: function (e) {
            (ci = !0), (ro = e);
        }
    };
function yv(e, t, n, r, i, a, o, s, l) {
    (ci = !1), (ro = null), pv.apply(gv, arguments);
}
function vv(e, t, n, r, i, a, o, s, l) {
    if ((yv.apply(this, arguments), ci)) {
        if (ci) {
            var u = ro;
            (ci = !1), (ro = null);
        } else throw Error(C(198));
        io || ((io = !0), (Pl = u));
    }
}
function On(e) {
    var t = e,
        n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
        e = t;
        do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
        while (e);
    }
    return t.tag === 3 ? n : null;
}
function Pm(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if (
            (t === null &&
                ((e = e.alternate), e !== null && (t = e.memoizedState)),
            t !== null)
        )
            return t.dehydrated;
    }
    return null;
}
function Sf(e) {
    if (On(e) !== e) throw Error(C(188));
}
function wv(e) {
    var t = e.alternate;
    if (!t) {
        if (((t = On(e)), t === null)) throw Error(C(188));
        return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
        var i = n.return;
        if (i === null) break;
        var a = i.alternate;
        if (a === null) {
            if (((r = i.return), r !== null)) {
                n = r;
                continue;
            }
            break;
        }
        if (i.child === a.child) {
            for (a = i.child; a; ) {
                if (a === n) return Sf(i), e;
                if (a === r) return Sf(i), t;
                a = a.sibling;
            }
            throw Error(C(188));
        }
        if (n.return !== r.return) (n = i), (r = a);
        else {
            for (var o = !1, s = i.child; s; ) {
                if (s === n) {
                    (o = !0), (n = i), (r = a);
                    break;
                }
                if (s === r) {
                    (o = !0), (r = i), (n = a);
                    break;
                }
                s = s.sibling;
            }
            if (!o) {
                for (s = a.child; s; ) {
                    if (s === n) {
                        (o = !0), (n = a), (r = i);
                        break;
                    }
                    if (s === r) {
                        (o = !0), (r = a), (n = i);
                        break;
                    }
                    s = s.sibling;
                }
                if (!o) throw Error(C(189));
            }
        }
        if (n.alternate !== r) throw Error(C(190));
    }
    if (n.tag !== 3) throw Error(C(188));
    return n.stateNode.current === n ? e : t;
}
function jm(e) {
    return (e = wv(e)), e !== null ? Im(e) : null;
}
function Im(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
        var t = Im(e);
        if (t !== null) return t;
        e = e.sibling;
    }
    return null;
}
var Mm = Fe.unstable_scheduleCallback,
    bf = Fe.unstable_cancelCallback,
    xv = Fe.unstable_shouldYield,
    kv = Fe.unstable_requestPaint,
    ie = Fe.unstable_now,
    Sv = Fe.unstable_getCurrentPriorityLevel,
    Ju = Fe.unstable_ImmediatePriority,
    zm = Fe.unstable_UserBlockingPriority,
    ao = Fe.unstable_NormalPriority,
    bv = Fe.unstable_LowPriority,
    Lm = Fe.unstable_IdlePriority,
    Bo = null,
    mt = null;
function _v(e) {
    if (mt && typeof mt.onCommitFiberRoot == 'function')
        try {
            mt.onCommitFiberRoot(
                Bo,
                e,
                void 0,
                (e.current.flags & 128) === 128
            );
        } catch {}
}
var it = Math.clz32 ? Math.clz32 : Nv,
    Ev = Math.log,
    Cv = Math.LN2;
function Nv(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((Ev(e) / Cv) | 0)) | 0;
}
var ca = 64,
    fa = 4194304;
function ei(e) {
    switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return e & 130023424;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 1073741824;
        default:
            return e;
    }
}
function oo(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
        i = e.suspendedLanes,
        a = e.pingedLanes,
        o = n & 268435455;
    if (o !== 0) {
        var s = o & ~i;
        s !== 0 ? (r = ei(s)) : ((a &= o), a !== 0 && (r = ei(a)));
    } else (o = n & ~i), o !== 0 ? (r = ei(o)) : a !== 0 && (r = ei(a));
    if (r === 0) return 0;
    if (
        t !== 0 &&
        t !== r &&
        !(t & i) &&
        ((i = r & -r),
        (a = t & -t),
        i >= a || (i === 16 && (a & 4194240) !== 0))
    )
        return t;
    if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
        for (e = e.entanglements, t &= r; 0 < t; )
            (n = 31 - it(t)), (i = 1 << n), (r |= e[n]), (t &= ~i);
    return r;
}
function Av(e, t) {
    switch (e) {
        case 1:
        case 2:
        case 4:
            return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1;
    }
}
function Tv(e, t) {
    for (
        var n = e.suspendedLanes,
            r = e.pingedLanes,
            i = e.expirationTimes,
            a = e.pendingLanes;
        0 < a;

    ) {
        var o = 31 - it(a),
            s = 1 << o,
            l = i[o];
        l === -1
            ? (!(s & n) || s & r) && (i[o] = Av(s, t))
            : l <= t && (e.expiredLanes |= s),
            (a &= ~s);
    }
}
function jl(e) {
    return (
        (e = e.pendingLanes & -1073741825),
        e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    );
}
function Fm() {
    var e = ca;
    return (ca <<= 1), !(ca & 4194240) && (ca = 64), e;
}
function bs(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
}
function Xi(e, t, n) {
    (e.pendingLanes |= t),
        t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
        (e = e.eventTimes),
        (t = 31 - it(t)),
        (e[t] = n);
}
function Pv(e, t) {
    var n = e.pendingLanes & ~t;
    (e.pendingLanes = t),
        (e.suspendedLanes = 0),
        (e.pingedLanes = 0),
        (e.expiredLanes &= t),
        (e.mutableReadLanes &= t),
        (e.entangledLanes &= t),
        (t = e.entanglements);
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
        var i = 31 - it(n),
            a = 1 << i;
        (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~a);
    }
}
function Zu(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
        var r = 31 - it(n),
            i = 1 << r;
        (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
    }
}
var V = 0;
function $m(e) {
    return (
        (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
    );
}
var Rm,
    ec,
    Om,
    Dm,
    Um,
    Il = !1,
    da = [],
    Yt = null,
    Gt = null,
    Xt = null,
    Ni = new Map(),
    Ai = new Map(),
    Ht = [],
    jv =
        'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
            ' '
        );
function _f(e, t) {
    switch (e) {
        case 'focusin':
        case 'focusout':
            Yt = null;
            break;
        case 'dragenter':
        case 'dragleave':
            Gt = null;
            break;
        case 'mouseover':
        case 'mouseout':
            Xt = null;
            break;
        case 'pointerover':
        case 'pointerout':
            Ni.delete(t.pointerId);
            break;
        case 'gotpointercapture':
        case 'lostpointercapture':
            Ai.delete(t.pointerId);
    }
}
function Vr(e, t, n, r, i, a) {
    return e === null || e.nativeEvent !== a
        ? ((e = {
              blockedOn: t,
              domEventName: n,
              eventSystemFlags: r,
              nativeEvent: a,
              targetContainers: [i]
          }),
          t !== null && ((t = Qi(t)), t !== null && ec(t)),
          e)
        : ((e.eventSystemFlags |= r),
          (t = e.targetContainers),
          i !== null && t.indexOf(i) === -1 && t.push(i),
          e);
}
function Iv(e, t, n, r, i) {
    switch (t) {
        case 'focusin':
            return (Yt = Vr(Yt, e, t, n, r, i)), !0;
        case 'dragenter':
            return (Gt = Vr(Gt, e, t, n, r, i)), !0;
        case 'mouseover':
            return (Xt = Vr(Xt, e, t, n, r, i)), !0;
        case 'pointerover':
            var a = i.pointerId;
            return Ni.set(a, Vr(Ni.get(a) || null, e, t, n, r, i)), !0;
        case 'gotpointercapture':
            return (
                (a = i.pointerId),
                Ai.set(a, Vr(Ai.get(a) || null, e, t, n, r, i)),
                !0
            );
    }
    return !1;
}
function Hm(e) {
    var t = gn(e.target);
    if (t !== null) {
        var n = On(t);
        if (n !== null) {
            if (((t = n.tag), t === 13)) {
                if (((t = Pm(n)), t !== null)) {
                    (e.blockedOn = t),
                        Um(e.priority, function () {
                            Om(n);
                        });
                    return;
                }
            } else if (
                t === 3 &&
                n.stateNode.current.memoizedState.isDehydrated
            ) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return;
            }
        }
    }
    e.blockedOn = null;
}
function Fa(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
        var n = Ml(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type, n);
            (Nl = r), n.target.dispatchEvent(r), (Nl = null);
        } else return (t = Qi(n)), t !== null && ec(t), (e.blockedOn = n), !1;
        t.shift();
    }
    return !0;
}
function Ef(e, t, n) {
    Fa(e) && n.delete(t);
}
function Mv() {
    (Il = !1),
        Yt !== null && Fa(Yt) && (Yt = null),
        Gt !== null && Fa(Gt) && (Gt = null),
        Xt !== null && Fa(Xt) && (Xt = null),
        Ni.forEach(Ef),
        Ai.forEach(Ef);
}
function Br(e, t) {
    e.blockedOn === t &&
        ((e.blockedOn = null),
        Il ||
            ((Il = !0),
            Fe.unstable_scheduleCallback(Fe.unstable_NormalPriority, Mv)));
}
function Ti(e) {
    function t(i) {
        return Br(i, e);
    }
    if (0 < da.length) {
        Br(da[0], e);
        for (var n = 1; n < da.length; n++) {
            var r = da[n];
            r.blockedOn === e && (r.blockedOn = null);
        }
    }
    for (
        Yt !== null && Br(Yt, e),
            Gt !== null && Br(Gt, e),
            Xt !== null && Br(Xt, e),
            Ni.forEach(t),
            Ai.forEach(t),
            n = 0;
        n < Ht.length;
        n++
    )
        (r = Ht[n]), r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < Ht.length && ((n = Ht[0]), n.blockedOn === null); )
        Hm(n), n.blockedOn === null && Ht.shift();
}
var pr = Ft.ReactCurrentBatchConfig,
    so = !0;
function zv(e, t, n, r) {
    var i = V,
        a = pr.transition;
    pr.transition = null;
    try {
        (V = 1), tc(e, t, n, r);
    } finally {
        (V = i), (pr.transition = a);
    }
}
function Lv(e, t, n, r) {
    var i = V,
        a = pr.transition;
    pr.transition = null;
    try {
        (V = 4), tc(e, t, n, r);
    } finally {
        (V = i), (pr.transition = a);
    }
}
function tc(e, t, n, r) {
    if (so) {
        var i = Ml(e, t, n, r);
        if (i === null) Ms(e, t, r, lo, n), _f(e, r);
        else if (Iv(i, e, t, n, r)) r.stopPropagation();
        else if ((_f(e, r), t & 4 && -1 < jv.indexOf(e))) {
            for (; i !== null; ) {
                var a = Qi(i);
                if (
                    (a !== null && Rm(a),
                    (a = Ml(e, t, n, r)),
                    a === null && Ms(e, t, r, lo, n),
                    a === i)
                )
                    break;
                i = a;
            }
            i !== null && r.stopPropagation();
        } else Ms(e, t, r, null, n);
    }
}
var lo = null;
function Ml(e, t, n, r) {
    if (((lo = null), (e = qu(r)), (e = gn(e)), e !== null))
        if (((t = On(e)), t === null)) e = null;
        else if (((n = t.tag), n === 13)) {
            if (((e = Pm(t)), e !== null)) return e;
            e = null;
        } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
                return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
        } else t !== e && (e = null);
    return (lo = e), null;
}
function Wm(e) {
    switch (e) {
        case 'cancel':
        case 'click':
        case 'close':
        case 'contextmenu':
        case 'copy':
        case 'cut':
        case 'auxclick':
        case 'dblclick':
        case 'dragend':
        case 'dragstart':
        case 'drop':
        case 'focusin':
        case 'focusout':
        case 'input':
        case 'invalid':
        case 'keydown':
        case 'keypress':
        case 'keyup':
        case 'mousedown':
        case 'mouseup':
        case 'paste':
        case 'pause':
        case 'play':
        case 'pointercancel':
        case 'pointerdown':
        case 'pointerup':
        case 'ratechange':
        case 'reset':
        case 'resize':
        case 'seeked':
        case 'submit':
        case 'touchcancel':
        case 'touchend':
        case 'touchstart':
        case 'volumechange':
        case 'change':
        case 'selectionchange':
        case 'textInput':
        case 'compositionstart':
        case 'compositionend':
        case 'compositionupdate':
        case 'beforeblur':
        case 'afterblur':
        case 'beforeinput':
        case 'blur':
        case 'fullscreenchange':
        case 'focus':
        case 'hashchange':
        case 'popstate':
        case 'select':
        case 'selectstart':
            return 1;
        case 'drag':
        case 'dragenter':
        case 'dragexit':
        case 'dragleave':
        case 'dragover':
        case 'mousemove':
        case 'mouseout':
        case 'mouseover':
        case 'pointermove':
        case 'pointerout':
        case 'pointerover':
        case 'scroll':
        case 'toggle':
        case 'touchmove':
        case 'wheel':
        case 'mouseenter':
        case 'mouseleave':
        case 'pointerenter':
        case 'pointerleave':
            return 4;
        case 'message':
            switch (Sv()) {
                case Ju:
                    return 1;
                case zm:
                    return 4;
                case ao:
                case bv:
                    return 16;
                case Lm:
                    return 536870912;
                default:
                    return 16;
            }
        default:
            return 16;
    }
}
var Vt = null,
    nc = null,
    $a = null;
function Vm() {
    if ($a) return $a;
    var e,
        t = nc,
        n = t.length,
        r,
        i = 'value' in Vt ? Vt.value : Vt.textContent,
        a = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++);
    var o = n - e;
    for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
    return ($a = i.slice(e, 1 < r ? 1 - r : void 0));
}
function Ra(e) {
    var t = e.keyCode;
    return (
        'charCode' in e
            ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
            : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
    );
}
function ha() {
    return !0;
}
function Cf() {
    return !1;
}
function De(e) {
    function t(n, r, i, a, o) {
        (this._reactName = n),
            (this._targetInst = i),
            (this.type = r),
            (this.nativeEvent = a),
            (this.target = o),
            (this.currentTarget = null);
        for (var s in e)
            e.hasOwnProperty(s) && ((n = e[s]), (this[s] = n ? n(a) : a[s]));
        return (
            (this.isDefaultPrevented = (
                a.defaultPrevented != null
                    ? a.defaultPrevented
                    : a.returnValue === !1
            )
                ? ha
                : Cf),
            (this.isPropagationStopped = Cf),
            this
        );
    }
    return (
        ne(t.prototype, {
            preventDefault: function () {
                this.defaultPrevented = !0;
                var n = this.nativeEvent;
                n &&
                    (n.preventDefault
                        ? n.preventDefault()
                        : typeof n.returnValue != 'unknown' &&
                          (n.returnValue = !1),
                    (this.isDefaultPrevented = ha));
            },
            stopPropagation: function () {
                var n = this.nativeEvent;
                n &&
                    (n.stopPropagation
                        ? n.stopPropagation()
                        : typeof n.cancelBubble != 'unknown' &&
                          (n.cancelBubble = !0),
                    (this.isPropagationStopped = ha));
            },
            persist: function () {},
            isPersistent: ha
        }),
        t
    );
}
var Mr = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
            return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0
    },
    rc = De(Mr),
    Ki = ne({}, Mr, { view: 0, detail: 0 }),
    Fv = De(Ki),
    _s,
    Es,
    Yr,
    Yo = ne({}, Ki, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: ic,
        button: 0,
        buttons: 0,
        relatedTarget: function (e) {
            return e.relatedTarget === void 0
                ? e.fromElement === e.srcElement
                    ? e.toElement
                    : e.fromElement
                : e.relatedTarget;
        },
        movementX: function (e) {
            return 'movementX' in e
                ? e.movementX
                : (e !== Yr &&
                      (Yr && e.type === 'mousemove'
                          ? ((_s = e.screenX - Yr.screenX),
                            (Es = e.screenY - Yr.screenY))
                          : (Es = _s = 0),
                      (Yr = e)),
                  _s);
        },
        movementY: function (e) {
            return 'movementY' in e ? e.movementY : Es;
        }
    }),
    Nf = De(Yo),
    $v = ne({}, Yo, { dataTransfer: 0 }),
    Rv = De($v),
    Ov = ne({}, Ki, { relatedTarget: 0 }),
    Cs = De(Ov),
    Dv = ne({}, Mr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Uv = De(Dv),
    Hv = ne({}, Mr, {
        clipboardData: function (e) {
            return 'clipboardData' in e
                ? e.clipboardData
                : window.clipboardData;
        }
    }),
    Wv = De(Hv),
    Vv = ne({}, Mr, { data: 0 }),
    Af = De(Vv),
    Bv = {
        Esc: 'Escape',
        Spacebar: ' ',
        Left: 'ArrowLeft',
        Up: 'ArrowUp',
        Right: 'ArrowRight',
        Down: 'ArrowDown',
        Del: 'Delete',
        Win: 'OS',
        Menu: 'ContextMenu',
        Apps: 'ContextMenu',
        Scroll: 'ScrollLock',
        MozPrintableKey: 'Unidentified'
    },
    Yv = {
        8: 'Backspace',
        9: 'Tab',
        12: 'Clear',
        13: 'Enter',
        16: 'Shift',
        17: 'Control',
        18: 'Alt',
        19: 'Pause',
        20: 'CapsLock',
        27: 'Escape',
        32: ' ',
        33: 'PageUp',
        34: 'PageDown',
        35: 'End',
        36: 'Home',
        37: 'ArrowLeft',
        38: 'ArrowUp',
        39: 'ArrowRight',
        40: 'ArrowDown',
        45: 'Insert',
        46: 'Delete',
        112: 'F1',
        113: 'F2',
        114: 'F3',
        115: 'F4',
        116: 'F5',
        117: 'F6',
        118: 'F7',
        119: 'F8',
        120: 'F9',
        121: 'F10',
        122: 'F11',
        123: 'F12',
        144: 'NumLock',
        145: 'ScrollLock',
        224: 'Meta'
    },
    Gv = {
        Alt: 'altKey',
        Control: 'ctrlKey',
        Meta: 'metaKey',
        Shift: 'shiftKey'
    };
function Xv(e) {
    var t = this.nativeEvent;
    return t.getModifierState
        ? t.getModifierState(e)
        : (e = Gv[e])
        ? !!t[e]
        : !1;
}
function ic() {
    return Xv;
}
var Kv = ne({}, Ki, {
        key: function (e) {
            if (e.key) {
                var t = Bv[e.key] || e.key;
                if (t !== 'Unidentified') return t;
            }
            return e.type === 'keypress'
                ? ((e = Ra(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
                : e.type === 'keydown' || e.type === 'keyup'
                ? Yv[e.keyCode] || 'Unidentified'
                : '';
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: ic,
        charCode: function (e) {
            return e.type === 'keypress' ? Ra(e) : 0;
        },
        keyCode: function (e) {
            return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
        },
        which: function (e) {
            return e.type === 'keypress'
                ? Ra(e)
                : e.type === 'keydown' || e.type === 'keyup'
                ? e.keyCode
                : 0;
        }
    }),
    Qv = De(Kv),
    qv = ne({}, Yo, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
    }),
    Tf = De(qv),
    Jv = ne({}, Ki, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: ic
    }),
    Zv = De(Jv),
    e1 = ne({}, Mr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    t1 = De(e1),
    n1 = ne({}, Yo, {
        deltaX: function (e) {
            return 'deltaX' in e
                ? e.deltaX
                : 'wheelDeltaX' in e
                ? -e.wheelDeltaX
                : 0;
        },
        deltaY: function (e) {
            return 'deltaY' in e
                ? e.deltaY
                : 'wheelDeltaY' in e
                ? -e.wheelDeltaY
                : 'wheelDelta' in e
                ? -e.wheelDelta
                : 0;
        },
        deltaZ: 0,
        deltaMode: 0
    }),
    r1 = De(n1),
    i1 = [9, 13, 27, 32],
    ac = At && 'CompositionEvent' in window,
    fi = null;
At && 'documentMode' in document && (fi = document.documentMode);
var a1 = At && 'TextEvent' in window && !fi,
    Bm = At && (!ac || (fi && 8 < fi && 11 >= fi)),
    Pf = ' ',
    jf = !1;
function Ym(e, t) {
    switch (e) {
        case 'keyup':
            return i1.indexOf(t.keyCode) !== -1;
        case 'keydown':
            return t.keyCode !== 229;
        case 'keypress':
        case 'mousedown':
        case 'focusout':
            return !0;
        default:
            return !1;
    }
}
function Gm(e) {
    return (e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null;
}
var qn = !1;
function o1(e, t) {
    switch (e) {
        case 'compositionend':
            return Gm(t);
        case 'keypress':
            return t.which !== 32 ? null : ((jf = !0), Pf);
        case 'textInput':
            return (e = t.data), e === Pf && jf ? null : e;
        default:
            return null;
    }
}
function s1(e, t) {
    if (qn)
        return e === 'compositionend' || (!ac && Ym(e, t))
            ? ((e = Vm()), ($a = nc = Vt = null), (qn = !1), e)
            : null;
    switch (e) {
        case 'paste':
            return null;
        case 'keypress':
            if (
                !(t.ctrlKey || t.altKey || t.metaKey) ||
                (t.ctrlKey && t.altKey)
            ) {
                if (t.char && 1 < t.char.length) return t.char;
                if (t.which) return String.fromCharCode(t.which);
            }
            return null;
        case 'compositionend':
            return Bm && t.locale !== 'ko' ? null : t.data;
        default:
            return null;
    }
}
var l1 = {
    color: !0,
    date: !0,
    datetime: !0,
    'datetime-local': !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
};
function If(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!l1[e.type] : t === 'textarea';
}
function Xm(e, t, n, r) {
    Em(r),
        (t = uo(t, 'onChange')),
        0 < t.length &&
            ((n = new rc('onChange', 'change', null, n, r)),
            e.push({ event: n, listeners: t }));
}
var di = null,
    Pi = null;
function u1(e) {
    ap(e, 0);
}
function Go(e) {
    var t = er(e);
    if (vm(t)) return e;
}
function c1(e, t) {
    if (e === 'change') return t;
}
var Km = !1;
if (At) {
    var Ns;
    if (At) {
        var As = 'oninput' in document;
        if (!As) {
            var Mf = document.createElement('div');
            Mf.setAttribute('oninput', 'return;'),
                (As = typeof Mf.oninput == 'function');
        }
        Ns = As;
    } else Ns = !1;
    Km = Ns && (!document.documentMode || 9 < document.documentMode);
}
function zf() {
    di && (di.detachEvent('onpropertychange', Qm), (Pi = di = null));
}
function Qm(e) {
    if (e.propertyName === 'value' && Go(Pi)) {
        var t = [];
        Xm(t, Pi, e, qu(e)), Tm(u1, t);
    }
}
function f1(e, t, n) {
    e === 'focusin'
        ? (zf(), (di = t), (Pi = n), di.attachEvent('onpropertychange', Qm))
        : e === 'focusout' && zf();
}
function d1(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown')
        return Go(Pi);
}
function h1(e, t) {
    if (e === 'click') return Go(t);
}
function m1(e, t) {
    if (e === 'input' || e === 'change') return Go(t);
}
function p1(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var ot = typeof Object.is == 'function' ? Object.is : p1;
function ji(e, t) {
    if (ot(e, t)) return !0;
    if (
        typeof e != 'object' ||
        e === null ||
        typeof t != 'object' ||
        t === null
    )
        return !1;
    var n = Object.keys(e),
        r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
        var i = n[r];
        if (!pl.call(t, i) || !ot(e[i], t[i])) return !1;
    }
    return !0;
}
function Lf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
}
function Ff(e, t) {
    var n = Lf(e);
    e = 0;
    for (var r; n; ) {
        if (n.nodeType === 3) {
            if (((r = e + n.textContent.length), e <= t && r >= t))
                return { node: n, offset: t - e };
            e = r;
        }
        e: {
            for (; n; ) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e;
                }
                n = n.parentNode;
            }
            n = void 0;
        }
        n = Lf(n);
    }
}
function qm(e, t) {
    return e && t
        ? e === t
            ? !0
            : e && e.nodeType === 3
            ? !1
            : t && t.nodeType === 3
            ? qm(e, t.parentNode)
            : 'contains' in e
            ? e.contains(t)
            : e.compareDocumentPosition
            ? !!(e.compareDocumentPosition(t) & 16)
            : !1
        : !1;
}
function Jm() {
    for (var e = window, t = no(); t instanceof e.HTMLIFrameElement; ) {
        try {
            var n = typeof t.contentWindow.location.href == 'string';
        } catch {
            n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = no(e.document);
    }
    return t;
}
function oc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
        t &&
        ((t === 'input' &&
            (e.type === 'text' ||
                e.type === 'search' ||
                e.type === 'tel' ||
                e.type === 'url' ||
                e.type === 'password')) ||
            t === 'textarea' ||
            e.contentEditable === 'true')
    );
}
function g1(e) {
    var t = Jm(),
        n = e.focusedElem,
        r = e.selectionRange;
    if (
        t !== n &&
        n &&
        n.ownerDocument &&
        qm(n.ownerDocument.documentElement, n)
    ) {
        if (r !== null && oc(n)) {
            if (
                ((t = r.start),
                (e = r.end),
                e === void 0 && (e = t),
                'selectionStart' in n)
            )
                (n.selectionStart = t),
                    (n.selectionEnd = Math.min(e, n.value.length));
            else if (
                ((e =
                    ((t = n.ownerDocument || document) && t.defaultView) ||
                    window),
                e.getSelection)
            ) {
                e = e.getSelection();
                var i = n.textContent.length,
                    a = Math.min(r.start, i);
                (r = r.end === void 0 ? a : Math.min(r.end, i)),
                    !e.extend && a > r && ((i = r), (r = a), (a = i)),
                    (i = Ff(n, a));
                var o = Ff(n, r);
                i &&
                    o &&
                    (e.rangeCount !== 1 ||
                        e.anchorNode !== i.node ||
                        e.anchorOffset !== i.offset ||
                        e.focusNode !== o.node ||
                        e.focusOffset !== o.offset) &&
                    ((t = t.createRange()),
                    t.setStart(i.node, i.offset),
                    e.removeAllRanges(),
                    a > r
                        ? (e.addRange(t), e.extend(o.node, o.offset))
                        : (t.setEnd(o.node, o.offset), e.addRange(t)));
            }
        }
        for (t = [], e = n; (e = e.parentNode); )
            e.nodeType === 1 &&
                t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
        for (
            typeof n.focus == 'function' && n.focus(), n = 0;
            n < t.length;
            n++
        )
            (e = t[n]),
                (e.element.scrollLeft = e.left),
                (e.element.scrollTop = e.top);
    }
}
var y1 = At && 'documentMode' in document && 11 >= document.documentMode,
    Jn = null,
    zl = null,
    hi = null,
    Ll = !1;
function $f(e, t, n) {
    var r =
        n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Ll ||
        Jn == null ||
        Jn !== no(r) ||
        ((r = Jn),
        'selectionStart' in r && oc(r)
            ? (r = { start: r.selectionStart, end: r.selectionEnd })
            : ((r = (
                  (r.ownerDocument && r.ownerDocument.defaultView) ||
                  window
              ).getSelection()),
              (r = {
                  anchorNode: r.anchorNode,
                  anchorOffset: r.anchorOffset,
                  focusNode: r.focusNode,
                  focusOffset: r.focusOffset
              })),
        (hi && ji(hi, r)) ||
            ((hi = r),
            (r = uo(zl, 'onSelect')),
            0 < r.length &&
                ((t = new rc('onSelect', 'select', null, t, n)),
                e.push({ event: t, listeners: r }),
                (t.target = Jn))));
}
function ma(e, t) {
    var n = {};
    return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n['Webkit' + e] = 'webkit' + t),
        (n['Moz' + e] = 'moz' + t),
        n
    );
}
var Zn = {
        animationend: ma('Animation', 'AnimationEnd'),
        animationiteration: ma('Animation', 'AnimationIteration'),
        animationstart: ma('Animation', 'AnimationStart'),
        transitionend: ma('Transition', 'TransitionEnd')
    },
    Ts = {},
    Zm = {};
At &&
    ((Zm = document.createElement('div').style),
    'AnimationEvent' in window ||
        (delete Zn.animationend.animation,
        delete Zn.animationiteration.animation,
        delete Zn.animationstart.animation),
    'TransitionEvent' in window || delete Zn.transitionend.transition);
function Xo(e) {
    if (Ts[e]) return Ts[e];
    if (!Zn[e]) return e;
    var t = Zn[e],
        n;
    for (n in t) if (t.hasOwnProperty(n) && n in Zm) return (Ts[e] = t[n]);
    return e;
}
var ep = Xo('animationend'),
    tp = Xo('animationiteration'),
    np = Xo('animationstart'),
    rp = Xo('transitionend'),
    ip = new Map(),
    Rf =
        'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
            ' '
        );
function un(e, t) {
    ip.set(e, t), Rn(t, [e]);
}
for (var Ps = 0; Ps < Rf.length; Ps++) {
    var js = Rf[Ps],
        v1 = js.toLowerCase(),
        w1 = js[0].toUpperCase() + js.slice(1);
    un(v1, 'on' + w1);
}
un(ep, 'onAnimationEnd');
un(tp, 'onAnimationIteration');
un(np, 'onAnimationStart');
un('dblclick', 'onDoubleClick');
un('focusin', 'onFocus');
un('focusout', 'onBlur');
un(rp, 'onTransitionEnd');
xr('onMouseEnter', ['mouseout', 'mouseover']);
xr('onMouseLeave', ['mouseout', 'mouseover']);
xr('onPointerEnter', ['pointerout', 'pointerover']);
xr('onPointerLeave', ['pointerout', 'pointerover']);
Rn(
    'onChange',
    'change click focusin focusout input keydown keyup selectionchange'.split(
        ' '
    )
);
Rn(
    'onSelect',
    'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
    )
);
Rn('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
Rn(
    'onCompositionEnd',
    'compositionend focusout keydown keypress keyup mousedown'.split(' ')
);
Rn(
    'onCompositionStart',
    'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
);
Rn(
    'onCompositionUpdate',
    'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
);
var ti =
        'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
            ' '
        ),
    x1 = new Set(
        'cancel close invalid load scroll toggle'.split(' ').concat(ti)
    );
function Of(e, t, n) {
    var r = e.type || 'unknown-event';
    (e.currentTarget = n), vv(r, t, void 0, e), (e.currentTarget = null);
}
function ap(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n],
            i = r.event;
        r = r.listeners;
        e: {
            var a = void 0;
            if (t)
                for (var o = r.length - 1; 0 <= o; o--) {
                    var s = r[o],
                        l = s.instance,
                        u = s.currentTarget;
                    if (((s = s.listener), l !== a && i.isPropagationStopped()))
                        break e;
                    Of(i, s, u), (a = l);
                }
            else
                for (o = 0; o < r.length; o++) {
                    if (
                        ((s = r[o]),
                        (l = s.instance),
                        (u = s.currentTarget),
                        (s = s.listener),
                        l !== a && i.isPropagationStopped())
                    )
                        break e;
                    Of(i, s, u), (a = l);
                }
        }
    }
    if (io) throw ((e = Pl), (io = !1), (Pl = null), e);
}
function X(e, t) {
    var n = t[Dl];
    n === void 0 && (n = t[Dl] = new Set());
    var r = e + '__bubble';
    n.has(r) || (op(t, e, 2, !1), n.add(r));
}
function Is(e, t, n) {
    var r = 0;
    t && (r |= 4), op(n, e, r, t);
}
var pa = '_reactListening' + Math.random().toString(36).slice(2);
function Ii(e) {
    if (!e[pa]) {
        (e[pa] = !0),
            hm.forEach(function (n) {
                n !== 'selectionchange' &&
                    (x1.has(n) || Is(n, !1, e), Is(n, !0, e));
            });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[pa] || ((t[pa] = !0), Is('selectionchange', !1, t));
    }
}
function op(e, t, n, r) {
    switch (Wm(t)) {
        case 1:
            var i = zv;
            break;
        case 4:
            i = Lv;
            break;
        default:
            i = tc;
    }
    (n = i.bind(null, t, n, e)),
        (i = void 0),
        !Tl ||
            (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') ||
            (i = !0),
        r
            ? i !== void 0
                ? e.addEventListener(t, n, { capture: !0, passive: i })
                : e.addEventListener(t, n, !0)
            : i !== void 0
            ? e.addEventListener(t, n, { passive: i })
            : e.addEventListener(t, n, !1);
}
function Ms(e, t, n, r, i) {
    var a = r;
    if (!(t & 1) && !(t & 2) && r !== null)
        e: for (;;) {
            if (r === null) return;
            var o = r.tag;
            if (o === 3 || o === 4) {
                var s = r.stateNode.containerInfo;
                if (s === i || (s.nodeType === 8 && s.parentNode === i)) break;
                if (o === 4)
                    for (o = r.return; o !== null; ) {
                        var l = o.tag;
                        if (
                            (l === 3 || l === 4) &&
                            ((l = o.stateNode.containerInfo),
                            l === i || (l.nodeType === 8 && l.parentNode === i))
                        )
                            return;
                        o = o.return;
                    }
                for (; s !== null; ) {
                    if (((o = gn(s)), o === null)) return;
                    if (((l = o.tag), l === 5 || l === 6)) {
                        r = a = o;
                        continue e;
                    }
                    s = s.parentNode;
                }
            }
            r = r.return;
        }
    Tm(function () {
        var u = a,
            f = qu(n),
            c = [];
        e: {
            var d = ip.get(e);
            if (d !== void 0) {
                var g = rc,
                    w = e;
                switch (e) {
                    case 'keypress':
                        if (Ra(n) === 0) break e;
                    case 'keydown':
                    case 'keyup':
                        g = Qv;
                        break;
                    case 'focusin':
                        (w = 'focus'), (g = Cs);
                        break;
                    case 'focusout':
                        (w = 'blur'), (g = Cs);
                        break;
                    case 'beforeblur':
                    case 'afterblur':
                        g = Cs;
                        break;
                    case 'click':
                        if (n.button === 2) break e;
                    case 'auxclick':
                    case 'dblclick':
                    case 'mousedown':
                    case 'mousemove':
                    case 'mouseup':
                    case 'mouseout':
                    case 'mouseover':
                    case 'contextmenu':
                        g = Nf;
                        break;
                    case 'drag':
                    case 'dragend':
                    case 'dragenter':
                    case 'dragexit':
                    case 'dragleave':
                    case 'dragover':
                    case 'dragstart':
                    case 'drop':
                        g = Rv;
                        break;
                    case 'touchcancel':
                    case 'touchend':
                    case 'touchmove':
                    case 'touchstart':
                        g = Zv;
                        break;
                    case ep:
                    case tp:
                    case np:
                        g = Uv;
                        break;
                    case rp:
                        g = t1;
                        break;
                    case 'scroll':
                        g = Fv;
                        break;
                    case 'wheel':
                        g = r1;
                        break;
                    case 'copy':
                    case 'cut':
                    case 'paste':
                        g = Wv;
                        break;
                    case 'gotpointercapture':
                    case 'lostpointercapture':
                    case 'pointercancel':
                    case 'pointerdown':
                    case 'pointermove':
                    case 'pointerout':
                    case 'pointerover':
                    case 'pointerup':
                        g = Tf;
                }
                var y = (t & 4) !== 0,
                    b = !y && e === 'scroll',
                    m = y ? (d !== null ? d + 'Capture' : null) : d;
                y = [];
                for (var h = u, p; h !== null; ) {
                    p = h;
                    var v = p.stateNode;
                    if (
                        (p.tag === 5 &&
                            v !== null &&
                            ((p = v),
                            m !== null &&
                                ((v = Ci(h, m)),
                                v != null && y.push(Mi(h, v, p)))),
                        b)
                    )
                        break;
                    h = h.return;
                }
                0 < y.length &&
                    ((d = new g(d, w, null, n, f)),
                    c.push({ event: d, listeners: y }));
            }
        }
        if (!(t & 7)) {
            e: {
                if (
                    ((d = e === 'mouseover' || e === 'pointerover'),
                    (g = e === 'mouseout' || e === 'pointerout'),
                    d &&
                        n !== Nl &&
                        (w = n.relatedTarget || n.fromElement) &&
                        (gn(w) || w[Tt]))
                )
                    break e;
                if (
                    (g || d) &&
                    ((d =
                        f.window === f
                            ? f
                            : (d = f.ownerDocument)
                            ? d.defaultView || d.parentWindow
                            : window),
                    g
                        ? ((w = n.relatedTarget || n.toElement),
                          (g = u),
                          (w = w ? gn(w) : null),
                          w !== null &&
                              ((b = On(w)),
                              w !== b || (w.tag !== 5 && w.tag !== 6)) &&
                              (w = null))
                        : ((g = null), (w = u)),
                    g !== w)
                ) {
                    if (
                        ((y = Nf),
                        (v = 'onMouseLeave'),
                        (m = 'onMouseEnter'),
                        (h = 'mouse'),
                        (e === 'pointerout' || e === 'pointerover') &&
                            ((y = Tf),
                            (v = 'onPointerLeave'),
                            (m = 'onPointerEnter'),
                            (h = 'pointer')),
                        (b = g == null ? d : er(g)),
                        (p = w == null ? d : er(w)),
                        (d = new y(v, h + 'leave', g, n, f)),
                        (d.target = b),
                        (d.relatedTarget = p),
                        (v = null),
                        gn(f) === u &&
                            ((y = new y(m, h + 'enter', w, n, f)),
                            (y.target = p),
                            (y.relatedTarget = b),
                            (v = y)),
                        (b = v),
                        g && w)
                    )
                        t: {
                            for (y = g, m = w, h = 0, p = y; p; p = Hn(p)) h++;
                            for (p = 0, v = m; v; v = Hn(v)) p++;
                            for (; 0 < h - p; ) (y = Hn(y)), h--;
                            for (; 0 < p - h; ) (m = Hn(m)), p--;
                            for (; h--; ) {
                                if (
                                    y === m ||
                                    (m !== null && y === m.alternate)
                                )
                                    break t;
                                (y = Hn(y)), (m = Hn(m));
                            }
                            y = null;
                        }
                    else y = null;
                    g !== null && Df(c, d, g, y, !1),
                        w !== null && b !== null && Df(c, b, w, y, !0);
                }
            }
            e: {
                if (
                    ((d = u ? er(u) : window),
                    (g = d.nodeName && d.nodeName.toLowerCase()),
                    g === 'select' || (g === 'input' && d.type === 'file'))
                )
                    var S = c1;
                else if (If(d))
                    if (Km) S = m1;
                    else {
                        S = d1;
                        var _ = f1;
                    }
                else
                    (g = d.nodeName) &&
                        g.toLowerCase() === 'input' &&
                        (d.type === 'checkbox' || d.type === 'radio') &&
                        (S = h1);
                if (S && (S = S(e, u))) {
                    Xm(c, S, n, f);
                    break e;
                }
                _ && _(e, d, u),
                    e === 'focusout' &&
                        (_ = d._wrapperState) &&
                        _.controlled &&
                        d.type === 'number' &&
                        Sl(d, 'number', d.value);
            }
            switch (((_ = u ? er(u) : window), e)) {
                case 'focusin':
                    (If(_) || _.contentEditable === 'true') &&
                        ((Jn = _), (zl = u), (hi = null));
                    break;
                case 'focusout':
                    hi = zl = Jn = null;
                    break;
                case 'mousedown':
                    Ll = !0;
                    break;
                case 'contextmenu':
                case 'mouseup':
                case 'dragend':
                    (Ll = !1), $f(c, n, f);
                    break;
                case 'selectionchange':
                    if (y1) break;
                case 'keydown':
                case 'keyup':
                    $f(c, n, f);
            }
            var k;
            if (ac)
                e: {
                    switch (e) {
                        case 'compositionstart':
                            var A = 'onCompositionStart';
                            break e;
                        case 'compositionend':
                            A = 'onCompositionEnd';
                            break e;
                        case 'compositionupdate':
                            A = 'onCompositionUpdate';
                            break e;
                    }
                    A = void 0;
                }
            else
                qn
                    ? Ym(e, n) && (A = 'onCompositionEnd')
                    : e === 'keydown' &&
                      n.keyCode === 229 &&
                      (A = 'onCompositionStart');
            A &&
                (Bm &&
                    n.locale !== 'ko' &&
                    (qn || A !== 'onCompositionStart'
                        ? A === 'onCompositionEnd' && qn && (k = Vm())
                        : ((Vt = f),
                          (nc = 'value' in Vt ? Vt.value : Vt.textContent),
                          (qn = !0))),
                (_ = uo(u, A)),
                0 < _.length &&
                    ((A = new Af(A, e, null, n, f)),
                    c.push({ event: A, listeners: _ }),
                    k
                        ? (A.data = k)
                        : ((k = Gm(n)), k !== null && (A.data = k)))),
                (k = a1 ? o1(e, n) : s1(e, n)) &&
                    ((u = uo(u, 'onBeforeInput')),
                    0 < u.length &&
                        ((f = new Af(
                            'onBeforeInput',
                            'beforeinput',
                            null,
                            n,
                            f
                        )),
                        c.push({ event: f, listeners: u }),
                        (f.data = k)));
        }
        ap(c, t);
    });
}
function Mi(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
}
function uo(e, t) {
    for (var n = t + 'Capture', r = []; e !== null; ) {
        var i = e,
            a = i.stateNode;
        i.tag === 5 &&
            a !== null &&
            ((i = a),
            (a = Ci(e, n)),
            a != null && r.unshift(Mi(e, a, i)),
            (a = Ci(e, t)),
            a != null && r.push(Mi(e, a, i))),
            (e = e.return);
    }
    return r;
}
function Hn(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
}
function Df(e, t, n, r, i) {
    for (var a = t._reactName, o = []; n !== null && n !== r; ) {
        var s = n,
            l = s.alternate,
            u = s.stateNode;
        if (l !== null && l === r) break;
        s.tag === 5 &&
            u !== null &&
            ((s = u),
            i
                ? ((l = Ci(n, a)), l != null && o.unshift(Mi(n, l, s)))
                : i || ((l = Ci(n, a)), l != null && o.push(Mi(n, l, s)))),
            (n = n.return);
    }
    o.length !== 0 && e.push({ event: t, listeners: o });
}
var k1 = /\r\n?/g,
    S1 = /\u0000|\uFFFD/g;
function Uf(e) {
    return (typeof e == 'string' ? e : '' + e)
        .replace(
            k1,
            `
`
        )
        .replace(S1, '');
}
function ga(e, t, n) {
    if (((t = Uf(t)), Uf(e) !== t && n)) throw Error(C(425));
}
function co() {}
var Fl = null,
    $l = null;
function Rl(e, t) {
    return (
        e === 'textarea' ||
        e === 'noscript' ||
        typeof t.children == 'string' ||
        typeof t.children == 'number' ||
        (typeof t.dangerouslySetInnerHTML == 'object' &&
            t.dangerouslySetInnerHTML !== null &&
            t.dangerouslySetInnerHTML.__html != null)
    );
}
var Ol = typeof setTimeout == 'function' ? setTimeout : void 0,
    b1 = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Hf = typeof Promise == 'function' ? Promise : void 0,
    _1 =
        typeof queueMicrotask == 'function'
            ? queueMicrotask
            : typeof Hf < 'u'
            ? function (e) {
                  return Hf.resolve(null).then(e).catch(E1);
              }
            : Ol;
function E1(e) {
    setTimeout(function () {
        throw e;
    });
}
function zs(e, t) {
    var n = t,
        r = 0;
    do {
        var i = n.nextSibling;
        if ((e.removeChild(n), i && i.nodeType === 8))
            if (((n = i.data), n === '/$')) {
                if (r === 0) {
                    e.removeChild(i), Ti(t);
                    return;
                }
                r--;
            } else (n !== '$' && n !== '$?' && n !== '$!') || r++;
        n = i;
    } while (n);
    Ti(t);
}
function Kt(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
            if (((t = e.data), t === '$' || t === '$!' || t === '$?')) break;
            if (t === '/$') return null;
        }
    }
    return e;
}
function Wf(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === '$' || n === '$!' || n === '$?') {
                if (t === 0) return e;
                t--;
            } else n === '/$' && t++;
        }
        e = e.previousSibling;
    }
    return null;
}
var zr = Math.random().toString(36).slice(2),
    dt = '__reactFiber$' + zr,
    zi = '__reactProps$' + zr,
    Tt = '__reactContainer$' + zr,
    Dl = '__reactEvents$' + zr,
    C1 = '__reactListeners$' + zr,
    N1 = '__reactHandles$' + zr;
function gn(e) {
    var t = e[dt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
        if ((t = n[Tt] || n[dt])) {
            if (
                ((n = t.alternate),
                t.child !== null || (n !== null && n.child !== null))
            )
                for (e = Wf(e); e !== null; ) {
                    if ((n = e[dt])) return n;
                    e = Wf(e);
                }
            return t;
        }
        (e = n), (n = e.parentNode);
    }
    return null;
}
function Qi(e) {
    return (
        (e = e[dt] || e[Tt]),
        !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
            ? null
            : e
    );
}
function er(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(C(33));
}
function Ko(e) {
    return e[zi] || null;
}
var Ul = [],
    tr = -1;
function cn(e) {
    return { current: e };
}
function K(e) {
    0 > tr || ((e.current = Ul[tr]), (Ul[tr] = null), tr--);
}
function G(e, t) {
    tr++, (Ul[tr] = e.current), (e.current = t);
}
var tn = {},
    xe = cn(tn),
    Pe = cn(!1),
    Cn = tn;
function kr(e, t) {
    var n = e.type.contextTypes;
    if (!n) return tn;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
    var i = {},
        a;
    for (a in n) i[a] = t[a];
    return (
        r &&
            ((e = e.stateNode),
            (e.__reactInternalMemoizedUnmaskedChildContext = t),
            (e.__reactInternalMemoizedMaskedChildContext = i)),
        i
    );
}
function je(e) {
    return (e = e.childContextTypes), e != null;
}
function fo() {
    K(Pe), K(xe);
}
function Vf(e, t, n) {
    if (xe.current !== tn) throw Error(C(168));
    G(xe, t), G(Pe, n);
}
function sp(e, t, n) {
    var r = e.stateNode;
    if (((t = t.childContextTypes), typeof r.getChildContext != 'function'))
        return n;
    r = r.getChildContext();
    for (var i in r) if (!(i in t)) throw Error(C(108, fv(e) || 'Unknown', i));
    return ne({}, n, r);
}
function ho(e) {
    return (
        (e =
            ((e = e.stateNode) &&
                e.__reactInternalMemoizedMergedChildContext) ||
            tn),
        (Cn = xe.current),
        G(xe, e),
        G(Pe, Pe.current),
        !0
    );
}
function Bf(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(C(169));
    n
        ? ((e = sp(e, t, Cn)),
          (r.__reactInternalMemoizedMergedChildContext = e),
          K(Pe),
          K(xe),
          G(xe, e))
        : K(Pe),
        G(Pe, n);
}
var _t = null,
    Qo = !1,
    Ls = !1;
function lp(e) {
    _t === null ? (_t = [e]) : _t.push(e);
}
function A1(e) {
    (Qo = !0), lp(e);
}
function fn() {
    if (!Ls && _t !== null) {
        Ls = !0;
        var e = 0,
            t = V;
        try {
            var n = _t;
            for (V = 1; e < n.length; e++) {
                var r = n[e];
                do r = r(!0);
                while (r !== null);
            }
            (_t = null), (Qo = !1);
        } catch (i) {
            throw (_t !== null && (_t = _t.slice(e + 1)), Mm(Ju, fn), i);
        } finally {
            (V = t), (Ls = !1);
        }
    }
    return null;
}
var nr = [],
    rr = 0,
    mo = null,
    po = 0,
    He = [],
    We = 0,
    Nn = null,
    Et = 1,
    Ct = '';
function dn(e, t) {
    (nr[rr++] = po), (nr[rr++] = mo), (mo = e), (po = t);
}
function up(e, t, n) {
    (He[We++] = Et), (He[We++] = Ct), (He[We++] = Nn), (Nn = e);
    var r = Et;
    e = Ct;
    var i = 32 - it(r) - 1;
    (r &= ~(1 << i)), (n += 1);
    var a = 32 - it(t) + i;
    if (30 < a) {
        var o = i - (i % 5);
        (a = (r & ((1 << o) - 1)).toString(32)),
            (r >>= o),
            (i -= o),
            (Et = (1 << (32 - it(t) + i)) | (n << i) | r),
            (Ct = a + e);
    } else (Et = (1 << a) | (n << i) | r), (Ct = e);
}
function sc(e) {
    e.return !== null && (dn(e, 1), up(e, 1, 0));
}
function lc(e) {
    for (; e === mo; )
        (mo = nr[--rr]), (nr[rr] = null), (po = nr[--rr]), (nr[rr] = null);
    for (; e === Nn; )
        (Nn = He[--We]),
            (He[We] = null),
            (Ct = He[--We]),
            (He[We] = null),
            (Et = He[--We]),
            (He[We] = null);
}
var Le = null,
    ze = null,
    J = !1,
    et = null;
function cp(e, t) {
    var n = Ye(5, null, null, 0);
    (n.elementType = 'DELETED'),
        (n.stateNode = t),
        (n.return = e),
        (t = e.deletions),
        t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Yf(e, t) {
    switch (e.tag) {
        case 5:
            var n = e.type;
            return (
                (t =
                    t.nodeType !== 1 ||
                    n.toLowerCase() !== t.nodeName.toLowerCase()
                        ? null
                        : t),
                t !== null
                    ? ((e.stateNode = t), (Le = e), (ze = Kt(t.firstChild)), !0)
                    : !1
            );
        case 6:
            return (
                (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
                t !== null ? ((e.stateNode = t), (Le = e), (ze = null), !0) : !1
            );
        case 13:
            return (
                (t = t.nodeType !== 8 ? null : t),
                t !== null
                    ? ((n = Nn !== null ? { id: Et, overflow: Ct } : null),
                      (e.memoizedState = {
                          dehydrated: t,
                          treeContext: n,
                          retryLane: 1073741824
                      }),
                      (n = Ye(18, null, null, 0)),
                      (n.stateNode = t),
                      (n.return = e),
                      (e.child = n),
                      (Le = e),
                      (ze = null),
                      !0)
                    : !1
            );
        default:
            return !1;
    }
}
function Hl(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Wl(e) {
    if (J) {
        var t = ze;
        if (t) {
            var n = t;
            if (!Yf(e, t)) {
                if (Hl(e)) throw Error(C(418));
                t = Kt(n.nextSibling);
                var r = Le;
                t && Yf(e, t)
                    ? cp(r, n)
                    : ((e.flags = (e.flags & -4097) | 2), (J = !1), (Le = e));
            }
        } else {
            if (Hl(e)) throw Error(C(418));
            (e.flags = (e.flags & -4097) | 2), (J = !1), (Le = e);
        }
    }
}
function Gf(e) {
    for (
        e = e.return;
        e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

    )
        e = e.return;
    Le = e;
}
function ya(e) {
    if (e !== Le) return !1;
    if (!J) return Gf(e), (J = !0), !1;
    var t;
    if (
        ((t = e.tag !== 3) &&
            !(t = e.tag !== 5) &&
            ((t = e.type),
            (t = t !== 'head' && t !== 'body' && !Rl(e.type, e.memoizedProps))),
        t && (t = ze))
    ) {
        if (Hl(e)) throw (fp(), Error(C(418)));
        for (; t; ) cp(e, t), (t = Kt(t.nextSibling));
    }
    if ((Gf(e), e.tag === 13)) {
        if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
            throw Error(C(317));
        e: {
            for (e = e.nextSibling, t = 0; e; ) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === '/$') {
                        if (t === 0) {
                            ze = Kt(e.nextSibling);
                            break e;
                        }
                        t--;
                    } else (n !== '$' && n !== '$!' && n !== '$?') || t++;
                }
                e = e.nextSibling;
            }
            ze = null;
        }
    } else ze = Le ? Kt(e.stateNode.nextSibling) : null;
    return !0;
}
function fp() {
    for (var e = ze; e; ) e = Kt(e.nextSibling);
}
function Sr() {
    (ze = Le = null), (J = !1);
}
function uc(e) {
    et === null ? (et = [e]) : et.push(e);
}
var T1 = Ft.ReactCurrentBatchConfig;
function Gr(e, t, n) {
    if (
        ((e = n.ref),
        e !== null && typeof e != 'function' && typeof e != 'object')
    ) {
        if (n._owner) {
            if (((n = n._owner), n)) {
                if (n.tag !== 1) throw Error(C(309));
                var r = n.stateNode;
            }
            if (!r) throw Error(C(147, e));
            var i = r,
                a = '' + e;
            return t !== null &&
                t.ref !== null &&
                typeof t.ref == 'function' &&
                t.ref._stringRef === a
                ? t.ref
                : ((t = function (o) {
                      var s = i.refs;
                      o === null ? delete s[a] : (s[a] = o);
                  }),
                  (t._stringRef = a),
                  t);
        }
        if (typeof e != 'string') throw Error(C(284));
        if (!n._owner) throw Error(C(290, e));
    }
    return e;
}
function va(e, t) {
    throw (
        ((e = Object.prototype.toString.call(t)),
        Error(
            C(
                31,
                e === '[object Object]'
                    ? 'object with keys {' + Object.keys(t).join(', ') + '}'
                    : e
            )
        ))
    );
}
function Xf(e) {
    var t = e._init;
    return t(e._payload);
}
function dp(e) {
    function t(m, h) {
        if (e) {
            var p = m.deletions;
            p === null ? ((m.deletions = [h]), (m.flags |= 16)) : p.push(h);
        }
    }
    function n(m, h) {
        if (!e) return null;
        for (; h !== null; ) t(m, h), (h = h.sibling);
        return null;
    }
    function r(m, h) {
        for (m = new Map(); h !== null; )
            h.key !== null ? m.set(h.key, h) : m.set(h.index, h),
                (h = h.sibling);
        return m;
    }
    function i(m, h) {
        return (m = Zt(m, h)), (m.index = 0), (m.sibling = null), m;
    }
    function a(m, h, p) {
        return (
            (m.index = p),
            e
                ? ((p = m.alternate),
                  p !== null
                      ? ((p = p.index), p < h ? ((m.flags |= 2), h) : p)
                      : ((m.flags |= 2), h))
                : ((m.flags |= 1048576), h)
        );
    }
    function o(m) {
        return e && m.alternate === null && (m.flags |= 2), m;
    }
    function s(m, h, p, v) {
        return h === null || h.tag !== 6
            ? ((h = Hs(p, m.mode, v)), (h.return = m), h)
            : ((h = i(h, p)), (h.return = m), h);
    }
    function l(m, h, p, v) {
        var S = p.type;
        return S === Qn
            ? f(m, h, p.props.children, v, p.key)
            : h !== null &&
              (h.elementType === S ||
                  (typeof S == 'object' &&
                      S !== null &&
                      S.$$typeof === Dt &&
                      Xf(S) === h.type))
            ? ((v = i(h, p.props)), (v.ref = Gr(m, h, p)), (v.return = m), v)
            : ((v = Ba(p.type, p.key, p.props, null, m.mode, v)),
              (v.ref = Gr(m, h, p)),
              (v.return = m),
              v);
    }
    function u(m, h, p, v) {
        return h === null ||
            h.tag !== 4 ||
            h.stateNode.containerInfo !== p.containerInfo ||
            h.stateNode.implementation !== p.implementation
            ? ((h = Ws(p, m.mode, v)), (h.return = m), h)
            : ((h = i(h, p.children || [])), (h.return = m), h);
    }
    function f(m, h, p, v, S) {
        return h === null || h.tag !== 7
            ? ((h = _n(p, m.mode, v, S)), (h.return = m), h)
            : ((h = i(h, p)), (h.return = m), h);
    }
    function c(m, h, p) {
        if ((typeof h == 'string' && h !== '') || typeof h == 'number')
            return (h = Hs('' + h, m.mode, p)), (h.return = m), h;
        if (typeof h == 'object' && h !== null) {
            switch (h.$$typeof) {
                case sa:
                    return (
                        (p = Ba(h.type, h.key, h.props, null, m.mode, p)),
                        (p.ref = Gr(m, null, h)),
                        (p.return = m),
                        p
                    );
                case Kn:
                    return (h = Ws(h, m.mode, p)), (h.return = m), h;
                case Dt:
                    var v = h._init;
                    return c(m, v(h._payload), p);
            }
            if (Zr(h) || Hr(h))
                return (h = _n(h, m.mode, p, null)), (h.return = m), h;
            va(m, h);
        }
        return null;
    }
    function d(m, h, p, v) {
        var S = h !== null ? h.key : null;
        if ((typeof p == 'string' && p !== '') || typeof p == 'number')
            return S !== null ? null : s(m, h, '' + p, v);
        if (typeof p == 'object' && p !== null) {
            switch (p.$$typeof) {
                case sa:
                    return p.key === S ? l(m, h, p, v) : null;
                case Kn:
                    return p.key === S ? u(m, h, p, v) : null;
                case Dt:
                    return (S = p._init), d(m, h, S(p._payload), v);
            }
            if (Zr(p) || Hr(p)) return S !== null ? null : f(m, h, p, v, null);
            va(m, p);
        }
        return null;
    }
    function g(m, h, p, v, S) {
        if ((typeof v == 'string' && v !== '') || typeof v == 'number')
            return (m = m.get(p) || null), s(h, m, '' + v, S);
        if (typeof v == 'object' && v !== null) {
            switch (v.$$typeof) {
                case sa:
                    return (
                        (m = m.get(v.key === null ? p : v.key) || null),
                        l(h, m, v, S)
                    );
                case Kn:
                    return (
                        (m = m.get(v.key === null ? p : v.key) || null),
                        u(h, m, v, S)
                    );
                case Dt:
                    var _ = v._init;
                    return g(m, h, p, _(v._payload), S);
            }
            if (Zr(v) || Hr(v))
                return (m = m.get(p) || null), f(h, m, v, S, null);
            va(h, v);
        }
        return null;
    }
    function w(m, h, p, v) {
        for (
            var S = null, _ = null, k = h, A = (h = 0), $ = null;
            k !== null && A < p.length;
            A++
        ) {
            k.index > A ? (($ = k), (k = null)) : ($ = k.sibling);
            var P = d(m, k, p[A], v);
            if (P === null) {
                k === null && (k = $);
                break;
            }
            e && k && P.alternate === null && t(m, k),
                (h = a(P, h, A)),
                _ === null ? (S = P) : (_.sibling = P),
                (_ = P),
                (k = $);
        }
        if (A === p.length) return n(m, k), J && dn(m, A), S;
        if (k === null) {
            for (; A < p.length; A++)
                (k = c(m, p[A], v)),
                    k !== null &&
                        ((h = a(k, h, A)),
                        _ === null ? (S = k) : (_.sibling = k),
                        (_ = k));
            return J && dn(m, A), S;
        }
        for (k = r(m, k); A < p.length; A++)
            ($ = g(k, m, A, p[A], v)),
                $ !== null &&
                    (e &&
                        $.alternate !== null &&
                        k.delete($.key === null ? A : $.key),
                    (h = a($, h, A)),
                    _ === null ? (S = $) : (_.sibling = $),
                    (_ = $));
        return (
            e &&
                k.forEach(function (R) {
                    return t(m, R);
                }),
            J && dn(m, A),
            S
        );
    }
    function y(m, h, p, v) {
        var S = Hr(p);
        if (typeof S != 'function') throw Error(C(150));
        if (((p = S.call(p)), p == null)) throw Error(C(151));
        for (
            var _ = (S = null), k = h, A = (h = 0), $ = null, P = p.next();
            k !== null && !P.done;
            A++, P = p.next()
        ) {
            k.index > A ? (($ = k), (k = null)) : ($ = k.sibling);
            var R = d(m, k, P.value, v);
            if (R === null) {
                k === null && (k = $);
                break;
            }
            e && k && R.alternate === null && t(m, k),
                (h = a(R, h, A)),
                _ === null ? (S = R) : (_.sibling = R),
                (_ = R),
                (k = $);
        }
        if (P.done) return n(m, k), J && dn(m, A), S;
        if (k === null) {
            for (; !P.done; A++, P = p.next())
                (P = c(m, P.value, v)),
                    P !== null &&
                        ((h = a(P, h, A)),
                        _ === null ? (S = P) : (_.sibling = P),
                        (_ = P));
            return J && dn(m, A), S;
        }
        for (k = r(m, k); !P.done; A++, P = p.next())
            (P = g(k, m, A, P.value, v)),
                P !== null &&
                    (e &&
                        P.alternate !== null &&
                        k.delete(P.key === null ? A : P.key),
                    (h = a(P, h, A)),
                    _ === null ? (S = P) : (_.sibling = P),
                    (_ = P));
        return (
            e &&
                k.forEach(function (I) {
                    return t(m, I);
                }),
            J && dn(m, A),
            S
        );
    }
    function b(m, h, p, v) {
        if (
            (typeof p == 'object' &&
                p !== null &&
                p.type === Qn &&
                p.key === null &&
                (p = p.props.children),
            typeof p == 'object' && p !== null)
        ) {
            switch (p.$$typeof) {
                case sa:
                    e: {
                        for (var S = p.key, _ = h; _ !== null; ) {
                            if (_.key === S) {
                                if (((S = p.type), S === Qn)) {
                                    if (_.tag === 7) {
                                        n(m, _.sibling),
                                            (h = i(_, p.props.children)),
                                            (h.return = m),
                                            (m = h);
                                        break e;
                                    }
                                } else if (
                                    _.elementType === S ||
                                    (typeof S == 'object' &&
                                        S !== null &&
                                        S.$$typeof === Dt &&
                                        Xf(S) === _.type)
                                ) {
                                    n(m, _.sibling),
                                        (h = i(_, p.props)),
                                        (h.ref = Gr(m, _, p)),
                                        (h.return = m),
                                        (m = h);
                                    break e;
                                }
                                n(m, _);
                                break;
                            } else t(m, _);
                            _ = _.sibling;
                        }
                        p.type === Qn
                            ? ((h = _n(p.props.children, m.mode, v, p.key)),
                              (h.return = m),
                              (m = h))
                            : ((v = Ba(
                                  p.type,
                                  p.key,
                                  p.props,
                                  null,
                                  m.mode,
                                  v
                              )),
                              (v.ref = Gr(m, h, p)),
                              (v.return = m),
                              (m = v));
                    }
                    return o(m);
                case Kn:
                    e: {
                        for (_ = p.key; h !== null; ) {
                            if (h.key === _)
                                if (
                                    h.tag === 4 &&
                                    h.stateNode.containerInfo ===
                                        p.containerInfo &&
                                    h.stateNode.implementation ===
                                        p.implementation
                                ) {
                                    n(m, h.sibling),
                                        (h = i(h, p.children || [])),
                                        (h.return = m),
                                        (m = h);
                                    break e;
                                } else {
                                    n(m, h);
                                    break;
                                }
                            else t(m, h);
                            h = h.sibling;
                        }
                        (h = Ws(p, m.mode, v)), (h.return = m), (m = h);
                    }
                    return o(m);
                case Dt:
                    return (_ = p._init), b(m, h, _(p._payload), v);
            }
            if (Zr(p)) return w(m, h, p, v);
            if (Hr(p)) return y(m, h, p, v);
            va(m, p);
        }
        return (typeof p == 'string' && p !== '') || typeof p == 'number'
            ? ((p = '' + p),
              h !== null && h.tag === 6
                  ? (n(m, h.sibling), (h = i(h, p)), (h.return = m), (m = h))
                  : (n(m, h), (h = Hs(p, m.mode, v)), (h.return = m), (m = h)),
              o(m))
            : n(m, h);
    }
    return b;
}
var br = dp(!0),
    hp = dp(!1),
    go = cn(null),
    yo = null,
    ir = null,
    cc = null;
function fc() {
    cc = ir = yo = null;
}
function dc(e) {
    var t = go.current;
    K(go), (e._currentValue = t);
}
function Vl(e, t, n) {
    for (; e !== null; ) {
        var r = e.alternate;
        if (
            ((e.childLanes & t) !== t
                ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
                : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
            e === n)
        )
            break;
        e = e.return;
    }
}
function gr(e, t) {
    (yo = e),
        (cc = ir = null),
        (e = e.dependencies),
        e !== null &&
            e.firstContext !== null &&
            (e.lanes & t && (Ae = !0), (e.firstContext = null));
}
function Xe(e) {
    var t = e._currentValue;
    if (cc !== e)
        if (((e = { context: e, memoizedValue: t, next: null }), ir === null)) {
            if (yo === null) throw Error(C(308));
            (ir = e), (yo.dependencies = { lanes: 0, firstContext: e });
        } else ir = ir.next = e;
    return t;
}
var yn = null;
function hc(e) {
    yn === null ? (yn = [e]) : yn.push(e);
}
function mp(e, t, n, r) {
    var i = t.interleaved;
    return (
        i === null ? ((n.next = n), hc(t)) : ((n.next = i.next), (i.next = n)),
        (t.interleaved = n),
        Pt(e, r)
    );
}
function Pt(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
        (e.childLanes |= t),
            (n = e.alternate),
            n !== null && (n.childLanes |= t),
            (n = e),
            (e = e.return);
    return n.tag === 3 ? n.stateNode : null;
}
var Ut = !1;
function mc(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, interleaved: null, lanes: 0 },
        effects: null
    };
}
function pp(e, t) {
    (e = e.updateQueue),
        t.updateQueue === e &&
            (t.updateQueue = {
                baseState: e.baseState,
                firstBaseUpdate: e.firstBaseUpdate,
                lastBaseUpdate: e.lastBaseUpdate,
                shared: e.shared,
                effects: e.effects
            });
}
function Nt(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
    };
}
function Qt(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), H & 2)) {
        var i = r.pending;
        return (
            i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
            (r.pending = t),
            Pt(e, n)
        );
    }
    return (
        (i = r.interleaved),
        i === null ? ((t.next = t), hc(r)) : ((t.next = i.next), (i.next = t)),
        (r.interleaved = t),
        Pt(e, n)
    );
}
function Oa(e, t, n) {
    if (
        ((t = t.updateQueue),
        t !== null && ((t = t.shared), (n & 4194240) !== 0))
    ) {
        var r = t.lanes;
        (r &= e.pendingLanes), (n |= r), (t.lanes = n), Zu(e, n);
    }
}
function Kf(e, t) {
    var n = e.updateQueue,
        r = e.alternate;
    if (r !== null && ((r = r.updateQueue), n === r)) {
        var i = null,
            a = null;
        if (((n = n.firstBaseUpdate), n !== null)) {
            do {
                var o = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null
                };
                a === null ? (i = a = o) : (a = a.next = o), (n = n.next);
            } while (n !== null);
            a === null ? (i = a = t) : (a = a.next = t);
        } else i = a = t;
        (n = {
            baseState: r.baseState,
            firstBaseUpdate: i,
            lastBaseUpdate: a,
            shared: r.shared,
            effects: r.effects
        }),
            (e.updateQueue = n);
        return;
    }
    (e = n.lastBaseUpdate),
        e === null ? (n.firstBaseUpdate = t) : (e.next = t),
        (n.lastBaseUpdate = t);
}
function vo(e, t, n, r) {
    var i = e.updateQueue;
    Ut = !1;
    var a = i.firstBaseUpdate,
        o = i.lastBaseUpdate,
        s = i.shared.pending;
    if (s !== null) {
        i.shared.pending = null;
        var l = s,
            u = l.next;
        (l.next = null), o === null ? (a = u) : (o.next = u), (o = l);
        var f = e.alternate;
        f !== null &&
            ((f = f.updateQueue),
            (s = f.lastBaseUpdate),
            s !== o &&
                (s === null ? (f.firstBaseUpdate = u) : (s.next = u),
                (f.lastBaseUpdate = l)));
    }
    if (a !== null) {
        var c = i.baseState;
        (o = 0), (f = u = l = null), (s = a);
        do {
            var d = s.lane,
                g = s.eventTime;
            if ((r & d) === d) {
                f !== null &&
                    (f = f.next =
                        {
                            eventTime: g,
                            lane: 0,
                            tag: s.tag,
                            payload: s.payload,
                            callback: s.callback,
                            next: null
                        });
                e: {
                    var w = e,
                        y = s;
                    switch (((d = t), (g = n), y.tag)) {
                        case 1:
                            if (((w = y.payload), typeof w == 'function')) {
                                c = w.call(g, c, d);
                                break e;
                            }
                            c = w;
                            break e;
                        case 3:
                            w.flags = (w.flags & -65537) | 128;
                        case 0:
                            if (
                                ((w = y.payload),
                                (d =
                                    typeof w == 'function'
                                        ? w.call(g, c, d)
                                        : w),
                                d == null)
                            )
                                break e;
                            c = ne({}, c, d);
                            break e;
                        case 2:
                            Ut = !0;
                    }
                }
                s.callback !== null &&
                    s.lane !== 0 &&
                    ((e.flags |= 64),
                    (d = i.effects),
                    d === null ? (i.effects = [s]) : d.push(s));
            } else
                (g = {
                    eventTime: g,
                    lane: d,
                    tag: s.tag,
                    payload: s.payload,
                    callback: s.callback,
                    next: null
                }),
                    f === null ? ((u = f = g), (l = c)) : (f = f.next = g),
                    (o |= d);
            if (((s = s.next), s === null)) {
                if (((s = i.shared.pending), s === null)) break;
                (d = s),
                    (s = d.next),
                    (d.next = null),
                    (i.lastBaseUpdate = d),
                    (i.shared.pending = null);
            }
        } while (!0);
        if (
            (f === null && (l = c),
            (i.baseState = l),
            (i.firstBaseUpdate = u),
            (i.lastBaseUpdate = f),
            (t = i.shared.interleaved),
            t !== null)
        ) {
            i = t;
            do (o |= i.lane), (i = i.next);
            while (i !== t);
        } else a === null && (i.shared.lanes = 0);
        (Tn |= o), (e.lanes = o), (e.memoizedState = c);
    }
}
function Qf(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
        for (t = 0; t < e.length; t++) {
            var r = e[t],
                i = r.callback;
            if (i !== null) {
                if (((r.callback = null), (r = n), typeof i != 'function'))
                    throw Error(C(191, i));
                i.call(r);
            }
        }
}
var qi = {},
    pt = cn(qi),
    Li = cn(qi),
    Fi = cn(qi);
function vn(e) {
    if (e === qi) throw Error(C(174));
    return e;
}
function pc(e, t) {
    switch ((G(Fi, t), G(Li, e), G(pt, qi), (e = t.nodeType), e)) {
        case 9:
        case 11:
            t = (t = t.documentElement) ? t.namespaceURI : _l(null, '');
            break;
        default:
            (e = e === 8 ? t.parentNode : t),
                (t = e.namespaceURI || null),
                (e = e.tagName),
                (t = _l(t, e));
    }
    K(pt), G(pt, t);
}
function _r() {
    K(pt), K(Li), K(Fi);
}
function gp(e) {
    vn(Fi.current);
    var t = vn(pt.current),
        n = _l(t, e.type);
    t !== n && (G(Li, e), G(pt, n));
}
function gc(e) {
    Li.current === e && (K(pt), K(Li));
}
var ee = cn(0);
function wo(e) {
    for (var t = e; t !== null; ) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (
                n !== null &&
                ((n = n.dehydrated),
                n === null || n.data === '$?' || n.data === '$!')
            )
                return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if (t.flags & 128) return t;
        } else if (t.child !== null) {
            (t.child.return = t), (t = t.child);
            continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return null;
            t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
}
var Fs = [];
function yc() {
    for (var e = 0; e < Fs.length; e++)
        Fs[e]._workInProgressVersionPrimary = null;
    Fs.length = 0;
}
var Da = Ft.ReactCurrentDispatcher,
    $s = Ft.ReactCurrentBatchConfig,
    An = 0,
    te = null,
    se = null,
    ue = null,
    xo = !1,
    mi = !1,
    $i = 0,
    P1 = 0;
function ye() {
    throw Error(C(321));
}
function vc(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!ot(e[n], t[n])) return !1;
    return !0;
}
function wc(e, t, n, r, i, a) {
    if (
        ((An = a),
        (te = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (Da.current = e === null || e.memoizedState === null ? z1 : L1),
        (e = n(r, i)),
        mi)
    ) {
        a = 0;
        do {
            if (((mi = !1), ($i = 0), 25 <= a)) throw Error(C(301));
            (a += 1),
                (ue = se = null),
                (t.updateQueue = null),
                (Da.current = F1),
                (e = n(r, i));
        } while (mi);
    }
    if (
        ((Da.current = ko),
        (t = se !== null && se.next !== null),
        (An = 0),
        (ue = se = te = null),
        (xo = !1),
        t)
    )
        throw Error(C(300));
    return e;
}
function xc() {
    var e = $i !== 0;
    return ($i = 0), e;
}
function ft() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
    };
    return ue === null ? (te.memoizedState = ue = e) : (ue = ue.next = e), ue;
}
function Ke() {
    if (se === null) {
        var e = te.alternate;
        e = e !== null ? e.memoizedState : null;
    } else e = se.next;
    var t = ue === null ? te.memoizedState : ue.next;
    if (t !== null) (ue = t), (se = e);
    else {
        if (e === null) throw Error(C(310));
        (se = e),
            (e = {
                memoizedState: se.memoizedState,
                baseState: se.baseState,
                baseQueue: se.baseQueue,
                queue: se.queue,
                next: null
            }),
            ue === null ? (te.memoizedState = ue = e) : (ue = ue.next = e);
    }
    return ue;
}
function Ri(e, t) {
    return typeof t == 'function' ? t(e) : t;
}
function Rs(e) {
    var t = Ke(),
        n = t.queue;
    if (n === null) throw Error(C(311));
    n.lastRenderedReducer = e;
    var r = se,
        i = r.baseQueue,
        a = n.pending;
    if (a !== null) {
        if (i !== null) {
            var o = i.next;
            (i.next = a.next), (a.next = o);
        }
        (r.baseQueue = i = a), (n.pending = null);
    }
    if (i !== null) {
        (a = i.next), (r = r.baseState);
        var s = (o = null),
            l = null,
            u = a;
        do {
            var f = u.lane;
            if ((An & f) === f)
                l !== null &&
                    (l = l.next =
                        {
                            lane: 0,
                            action: u.action,
                            hasEagerState: u.hasEagerState,
                            eagerState: u.eagerState,
                            next: null
                        }),
                    (r = u.hasEagerState ? u.eagerState : e(r, u.action));
            else {
                var c = {
                    lane: f,
                    action: u.action,
                    hasEagerState: u.hasEagerState,
                    eagerState: u.eagerState,
                    next: null
                };
                l === null ? ((s = l = c), (o = r)) : (l = l.next = c),
                    (te.lanes |= f),
                    (Tn |= f);
            }
            u = u.next;
        } while (u !== null && u !== a);
        l === null ? (o = r) : (l.next = s),
            ot(r, t.memoizedState) || (Ae = !0),
            (t.memoizedState = r),
            (t.baseState = o),
            (t.baseQueue = l),
            (n.lastRenderedState = r);
    }
    if (((e = n.interleaved), e !== null)) {
        i = e;
        do (a = i.lane), (te.lanes |= a), (Tn |= a), (i = i.next);
        while (i !== e);
    } else i === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
}
function Os(e) {
    var t = Ke(),
        n = t.queue;
    if (n === null) throw Error(C(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
        i = n.pending,
        a = t.memoizedState;
    if (i !== null) {
        n.pending = null;
        var o = (i = i.next);
        do (a = e(a, o.action)), (o = o.next);
        while (o !== i);
        ot(a, t.memoizedState) || (Ae = !0),
            (t.memoizedState = a),
            t.baseQueue === null && (t.baseState = a),
            (n.lastRenderedState = a);
    }
    return [a, r];
}
function yp() {}
function vp(e, t) {
    var n = te,
        r = Ke(),
        i = t(),
        a = !ot(r.memoizedState, i);
    if (
        (a && ((r.memoizedState = i), (Ae = !0)),
        (r = r.queue),
        kc(kp.bind(null, n, r, e), [e]),
        r.getSnapshot !== t || a || (ue !== null && ue.memoizedState.tag & 1))
    ) {
        if (
            ((n.flags |= 2048),
            Oi(9, xp.bind(null, n, r, i, t), void 0, null),
            ce === null)
        )
            throw Error(C(349));
        An & 30 || wp(n, t, i);
    }
    return i;
}
function wp(e, t, n) {
    (e.flags |= 16384),
        (e = { getSnapshot: t, value: n }),
        (t = te.updateQueue),
        t === null
            ? ((t = { lastEffect: null, stores: null }),
              (te.updateQueue = t),
              (t.stores = [e]))
            : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function xp(e, t, n, r) {
    (t.value = n), (t.getSnapshot = r), Sp(t) && bp(e);
}
function kp(e, t, n) {
    return n(function () {
        Sp(t) && bp(e);
    });
}
function Sp(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !ot(e, n);
    } catch {
        return !0;
    }
}
function bp(e) {
    var t = Pt(e, 1);
    t !== null && at(t, e, 1, -1);
}
function qf(e) {
    var t = ft();
    return (
        typeof e == 'function' && (e = e()),
        (t.memoizedState = t.baseState = e),
        (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Ri,
            lastRenderedState: e
        }),
        (t.queue = e),
        (e = e.dispatch = M1.bind(null, te, e)),
        [t.memoizedState, e]
    );
}
function Oi(e, t, n, r) {
    return (
        (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
        (t = te.updateQueue),
        t === null
            ? ((t = { lastEffect: null, stores: null }),
              (te.updateQueue = t),
              (t.lastEffect = e.next = e))
            : ((n = t.lastEffect),
              n === null
                  ? (t.lastEffect = e.next = e)
                  : ((r = n.next),
                    (n.next = e),
                    (e.next = r),
                    (t.lastEffect = e))),
        e
    );
}
function _p() {
    return Ke().memoizedState;
}
function Ua(e, t, n, r) {
    var i = ft();
    (te.flags |= e),
        (i.memoizedState = Oi(1 | t, n, void 0, r === void 0 ? null : r));
}
function qo(e, t, n, r) {
    var i = Ke();
    r = r === void 0 ? null : r;
    var a = void 0;
    if (se !== null) {
        var o = se.memoizedState;
        if (((a = o.destroy), r !== null && vc(r, o.deps))) {
            i.memoizedState = Oi(t, n, a, r);
            return;
        }
    }
    (te.flags |= e), (i.memoizedState = Oi(1 | t, n, a, r));
}
function Jf(e, t) {
    return Ua(8390656, 8, e, t);
}
function kc(e, t) {
    return qo(2048, 8, e, t);
}
function Ep(e, t) {
    return qo(4, 2, e, t);
}
function Cp(e, t) {
    return qo(4, 4, e, t);
}
function Np(e, t) {
    if (typeof t == 'function')
        return (
            (e = e()),
            t(e),
            function () {
                t(null);
            }
        );
    if (t != null)
        return (
            (e = e()),
            (t.current = e),
            function () {
                t.current = null;
            }
        );
}
function Ap(e, t, n) {
    return (
        (n = n != null ? n.concat([e]) : null), qo(4, 4, Np.bind(null, t, e), n)
    );
}
function Sc() {}
function Tp(e, t) {
    var n = Ke();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && vc(t, r[1])
        ? r[0]
        : ((n.memoizedState = [e, t]), e);
}
function Pp(e, t) {
    var n = Ke();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && vc(t, r[1])
        ? r[0]
        : ((e = e()), (n.memoizedState = [e, t]), e);
}
function jp(e, t, n) {
    return An & 21
        ? (ot(n, t) ||
              ((n = Fm()), (te.lanes |= n), (Tn |= n), (e.baseState = !0)),
          t)
        : (e.baseState && ((e.baseState = !1), (Ae = !0)),
          (e.memoizedState = n));
}
function j1(e, t) {
    var n = V;
    (V = n !== 0 && 4 > n ? n : 4), e(!0);
    var r = $s.transition;
    $s.transition = {};
    try {
        e(!1), t();
    } finally {
        (V = n), ($s.transition = r);
    }
}
function Ip() {
    return Ke().memoizedState;
}
function I1(e, t, n) {
    var r = Jt(e);
    if (
        ((n = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        }),
        Mp(e))
    )
        zp(t, n);
    else if (((n = mp(e, t, n, r)), n !== null)) {
        var i = Se();
        at(n, e, r, i), Lp(n, t, r);
    }
}
function M1(e, t, n) {
    var r = Jt(e),
        i = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        };
    if (Mp(e)) zp(t, i);
    else {
        var a = e.alternate;
        if (
            e.lanes === 0 &&
            (a === null || a.lanes === 0) &&
            ((a = t.lastRenderedReducer), a !== null)
        )
            try {
                var o = t.lastRenderedState,
                    s = a(o, n);
                if (((i.hasEagerState = !0), (i.eagerState = s), ot(s, o))) {
                    var l = t.interleaved;
                    l === null
                        ? ((i.next = i), hc(t))
                        : ((i.next = l.next), (l.next = i)),
                        (t.interleaved = i);
                    return;
                }
            } catch {
            } finally {
            }
        (n = mp(e, t, i, r)),
            n !== null && ((i = Se()), at(n, e, r, i), Lp(n, t, r));
    }
}
function Mp(e) {
    var t = e.alternate;
    return e === te || (t !== null && t === te);
}
function zp(e, t) {
    mi = xo = !0;
    var n = e.pending;
    n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (e.pending = t);
}
function Lp(e, t, n) {
    if (n & 4194240) {
        var r = t.lanes;
        (r &= e.pendingLanes), (n |= r), (t.lanes = n), Zu(e, n);
    }
}
var ko = {
        readContext: Xe,
        useCallback: ye,
        useContext: ye,
        useEffect: ye,
        useImperativeHandle: ye,
        useInsertionEffect: ye,
        useLayoutEffect: ye,
        useMemo: ye,
        useReducer: ye,
        useRef: ye,
        useState: ye,
        useDebugValue: ye,
        useDeferredValue: ye,
        useTransition: ye,
        useMutableSource: ye,
        useSyncExternalStore: ye,
        useId: ye,
        unstable_isNewReconciler: !1
    },
    z1 = {
        readContext: Xe,
        useCallback: function (e, t) {
            return (ft().memoizedState = [e, t === void 0 ? null : t]), e;
        },
        useContext: Xe,
        useEffect: Jf,
        useImperativeHandle: function (e, t, n) {
            return (
                (n = n != null ? n.concat([e]) : null),
                Ua(4194308, 4, Np.bind(null, t, e), n)
            );
        },
        useLayoutEffect: function (e, t) {
            return Ua(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
            return Ua(4, 2, e, t);
        },
        useMemo: function (e, t) {
            var n = ft();
            return (
                (t = t === void 0 ? null : t),
                (e = e()),
                (n.memoizedState = [e, t]),
                e
            );
        },
        useReducer: function (e, t, n) {
            var r = ft();
            return (
                (t = n !== void 0 ? n(t) : t),
                (r.memoizedState = r.baseState = t),
                (e = {
                    pending: null,
                    interleaved: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: e,
                    lastRenderedState: t
                }),
                (r.queue = e),
                (e = e.dispatch = I1.bind(null, te, e)),
                [r.memoizedState, e]
            );
        },
        useRef: function (e) {
            var t = ft();
            return (e = { current: e }), (t.memoizedState = e);
        },
        useState: qf,
        useDebugValue: Sc,
        useDeferredValue: function (e) {
            return (ft().memoizedState = e);
        },
        useTransition: function () {
            var e = qf(!1),
                t = e[0];
            return (e = j1.bind(null, e[1])), (ft().memoizedState = e), [t, e];
        },
        useMutableSource: function () {},
        useSyncExternalStore: function (e, t, n) {
            var r = te,
                i = ft();
            if (J) {
                if (n === void 0) throw Error(C(407));
                n = n();
            } else {
                if (((n = t()), ce === null)) throw Error(C(349));
                An & 30 || wp(r, t, n);
            }
            i.memoizedState = n;
            var a = { value: n, getSnapshot: t };
            return (
                (i.queue = a),
                Jf(kp.bind(null, r, a, e), [e]),
                (r.flags |= 2048),
                Oi(9, xp.bind(null, r, a, n, t), void 0, null),
                n
            );
        },
        useId: function () {
            var e = ft(),
                t = ce.identifierPrefix;
            if (J) {
                var n = Ct,
                    r = Et;
                (n = (r & ~(1 << (32 - it(r) - 1))).toString(32) + n),
                    (t = ':' + t + 'R' + n),
                    (n = $i++),
                    0 < n && (t += 'H' + n.toString(32)),
                    (t += ':');
            } else (n = P1++), (t = ':' + t + 'r' + n.toString(32) + ':');
            return (e.memoizedState = t);
        },
        unstable_isNewReconciler: !1
    },
    L1 = {
        readContext: Xe,
        useCallback: Tp,
        useContext: Xe,
        useEffect: kc,
        useImperativeHandle: Ap,
        useInsertionEffect: Ep,
        useLayoutEffect: Cp,
        useMemo: Pp,
        useReducer: Rs,
        useRef: _p,
        useState: function () {
            return Rs(Ri);
        },
        useDebugValue: Sc,
        useDeferredValue: function (e) {
            var t = Ke();
            return jp(t, se.memoizedState, e);
        },
        useTransition: function () {
            var e = Rs(Ri)[0],
                t = Ke().memoizedState;
            return [e, t];
        },
        useMutableSource: yp,
        useSyncExternalStore: vp,
        useId: Ip,
        unstable_isNewReconciler: !1
    },
    F1 = {
        readContext: Xe,
        useCallback: Tp,
        useContext: Xe,
        useEffect: kc,
        useImperativeHandle: Ap,
        useInsertionEffect: Ep,
        useLayoutEffect: Cp,
        useMemo: Pp,
        useReducer: Os,
        useRef: _p,
        useState: function () {
            return Os(Ri);
        },
        useDebugValue: Sc,
        useDeferredValue: function (e) {
            var t = Ke();
            return se === null
                ? (t.memoizedState = e)
                : jp(t, se.memoizedState, e);
        },
        useTransition: function () {
            var e = Os(Ri)[0],
                t = Ke().memoizedState;
            return [e, t];
        },
        useMutableSource: yp,
        useSyncExternalStore: vp,
        useId: Ip,
        unstable_isNewReconciler: !1
    };
function Je(e, t) {
    if (e && e.defaultProps) {
        (t = ne({}, t)), (e = e.defaultProps);
        for (var n in e) t[n] === void 0 && (t[n] = e[n]);
        return t;
    }
    return t;
}
function Bl(e, t, n, r) {
    (t = e.memoizedState),
        (n = n(r, t)),
        (n = n == null ? t : ne({}, t, n)),
        (e.memoizedState = n),
        e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Jo = {
    isMounted: function (e) {
        return (e = e._reactInternals) ? On(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var r = Se(),
            i = Jt(e),
            a = Nt(r, i);
        (a.payload = t),
            n != null && (a.callback = n),
            (t = Qt(e, a, i)),
            t !== null && (at(t, e, i, r), Oa(t, e, i));
    },
    enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var r = Se(),
            i = Jt(e),
            a = Nt(r, i);
        (a.tag = 1),
            (a.payload = t),
            n != null && (a.callback = n),
            (t = Qt(e, a, i)),
            t !== null && (at(t, e, i, r), Oa(t, e, i));
    },
    enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = Se(),
            r = Jt(e),
            i = Nt(n, r);
        (i.tag = 2),
            t != null && (i.callback = t),
            (t = Qt(e, i, r)),
            t !== null && (at(t, e, r, n), Oa(t, e, r));
    }
};
function Zf(e, t, n, r, i, a, o) {
    return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == 'function'
            ? e.shouldComponentUpdate(r, a, o)
            : t.prototype && t.prototype.isPureReactComponent
            ? !ji(n, r) || !ji(i, a)
            : !0
    );
}
function Fp(e, t, n) {
    var r = !1,
        i = tn,
        a = t.contextType;
    return (
        typeof a == 'object' && a !== null
            ? (a = Xe(a))
            : ((i = je(t) ? Cn : xe.current),
              (r = t.contextTypes),
              (a = (r = r != null) ? kr(e, i) : tn)),
        (t = new t(n, a)),
        (e.memoizedState =
            t.state !== null && t.state !== void 0 ? t.state : null),
        (t.updater = Jo),
        (e.stateNode = t),
        (t._reactInternals = e),
        r &&
            ((e = e.stateNode),
            (e.__reactInternalMemoizedUnmaskedChildContext = i),
            (e.__reactInternalMemoizedMaskedChildContext = a)),
        t
    );
}
function ed(e, t, n, r) {
    (e = t.state),
        typeof t.componentWillReceiveProps == 'function' &&
            t.componentWillReceiveProps(n, r),
        typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
            t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && Jo.enqueueReplaceState(t, t.state, null);
}
function Yl(e, t, n, r) {
    var i = e.stateNode;
    (i.props = n), (i.state = e.memoizedState), (i.refs = {}), mc(e);
    var a = t.contextType;
    typeof a == 'object' && a !== null
        ? (i.context = Xe(a))
        : ((a = je(t) ? Cn : xe.current), (i.context = kr(e, a))),
        (i.state = e.memoizedState),
        (a = t.getDerivedStateFromProps),
        typeof a == 'function' && (Bl(e, t, a, n), (i.state = e.memoizedState)),
        typeof t.getDerivedStateFromProps == 'function' ||
            typeof i.getSnapshotBeforeUpdate == 'function' ||
            (typeof i.UNSAFE_componentWillMount != 'function' &&
                typeof i.componentWillMount != 'function') ||
            ((t = i.state),
            typeof i.componentWillMount == 'function' && i.componentWillMount(),
            typeof i.UNSAFE_componentWillMount == 'function' &&
                i.UNSAFE_componentWillMount(),
            t !== i.state && Jo.enqueueReplaceState(i, i.state, null),
            vo(e, n, i, r),
            (i.state = e.memoizedState)),
        typeof i.componentDidMount == 'function' && (e.flags |= 4194308);
}
function Er(e, t) {
    try {
        var n = '',
            r = t;
        do (n += cv(r)), (r = r.return);
        while (r);
        var i = n;
    } catch (a) {
        i =
            `
Error generating stack: ` +
            a.message +
            `
` +
            a.stack;
    }
    return { value: e, source: t, stack: i, digest: null };
}
function Ds(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Gl(e, t) {
    try {
        console.error(t.value);
    } catch (n) {
        setTimeout(function () {
            throw n;
        });
    }
}
var $1 = typeof WeakMap == 'function' ? WeakMap : Map;
function $p(e, t, n) {
    (n = Nt(-1, n)), (n.tag = 3), (n.payload = { element: null });
    var r = t.value;
    return (
        (n.callback = function () {
            bo || ((bo = !0), (ru = r)), Gl(e, t);
        }),
        n
    );
}
function Rp(e, t, n) {
    (n = Nt(-1, n)), (n.tag = 3);
    var r = e.type.getDerivedStateFromError;
    if (typeof r == 'function') {
        var i = t.value;
        (n.payload = function () {
            return r(i);
        }),
            (n.callback = function () {
                Gl(e, t);
            });
    }
    var a = e.stateNode;
    return (
        a !== null &&
            typeof a.componentDidCatch == 'function' &&
            (n.callback = function () {
                Gl(e, t),
                    typeof r != 'function' &&
                        (qt === null ? (qt = new Set([this])) : qt.add(this));
                var o = t.stack;
                this.componentDidCatch(t.value, {
                    componentStack: o !== null ? o : ''
                });
            }),
        n
    );
}
function td(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new $1();
        var i = new Set();
        r.set(t, i);
    } else (i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i));
    i.has(n) || (i.add(n), (e = q1.bind(null, e, t, n)), t.then(e, e));
}
function nd(e) {
    do {
        var t;
        if (
            ((t = e.tag === 13) &&
                ((t = e.memoizedState),
                (t = t !== null ? t.dehydrated !== null : !0)),
            t)
        )
            return e;
        e = e.return;
    } while (e !== null);
    return null;
}
function rd(e, t, n, r, i) {
    return e.mode & 1
        ? ((e.flags |= 65536), (e.lanes = i), e)
        : (e === t
              ? (e.flags |= 65536)
              : ((e.flags |= 128),
                (n.flags |= 131072),
                (n.flags &= -52805),
                n.tag === 1 &&
                    (n.alternate === null
                        ? (n.tag = 17)
                        : ((t = Nt(-1, 1)), (t.tag = 2), Qt(n, t, 1))),
                (n.lanes |= 1)),
          e);
}
var R1 = Ft.ReactCurrentOwner,
    Ae = !1;
function ke(e, t, n, r) {
    t.child = e === null ? hp(t, null, n, r) : br(t, e.child, n, r);
}
function id(e, t, n, r, i) {
    n = n.render;
    var a = t.ref;
    return (
        gr(t, i),
        (r = wc(e, t, n, r, a, i)),
        (n = xc()),
        e !== null && !Ae
            ? ((t.updateQueue = e.updateQueue),
              (t.flags &= -2053),
              (e.lanes &= ~i),
              jt(e, t, i))
            : (J && n && sc(t), (t.flags |= 1), ke(e, t, r, i), t.child)
    );
}
function ad(e, t, n, r, i) {
    if (e === null) {
        var a = n.type;
        return typeof a == 'function' &&
            !Pc(a) &&
            a.defaultProps === void 0 &&
            n.compare === null &&
            n.defaultProps === void 0
            ? ((t.tag = 15), (t.type = a), Op(e, t, a, r, i))
            : ((e = Ba(n.type, null, r, t, t.mode, i)),
              (e.ref = t.ref),
              (e.return = t),
              (t.child = e));
    }
    if (((a = e.child), !(e.lanes & i))) {
        var o = a.memoizedProps;
        if (
            ((n = n.compare),
            (n = n !== null ? n : ji),
            n(o, r) && e.ref === t.ref)
        )
            return jt(e, t, i);
    }
    return (
        (t.flags |= 1),
        (e = Zt(a, r)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e)
    );
}
function Op(e, t, n, r, i) {
    if (e !== null) {
        var a = e.memoizedProps;
        if (ji(a, r) && e.ref === t.ref)
            if (((Ae = !1), (t.pendingProps = r = a), (e.lanes & i) !== 0))
                e.flags & 131072 && (Ae = !0);
            else return (t.lanes = e.lanes), jt(e, t, i);
    }
    return Xl(e, t, n, r, i);
}
function Dp(e, t, n) {
    var r = t.pendingProps,
        i = r.children,
        a = e !== null ? e.memoizedState : null;
    if (r.mode === 'hidden')
        if (!(t.mode & 1))
            (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            }),
                G(or, Me),
                (Me |= n);
        else {
            if (!(n & 1073741824))
                return (
                    (e = a !== null ? a.baseLanes | n : n),
                    (t.lanes = t.childLanes = 1073741824),
                    (t.memoizedState = {
                        baseLanes: e,
                        cachePool: null,
                        transitions: null
                    }),
                    (t.updateQueue = null),
                    G(or, Me),
                    (Me |= e),
                    null
                );
            (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            }),
                (r = a !== null ? a.baseLanes : n),
                G(or, Me),
                (Me |= r);
        }
    else
        a !== null
            ? ((r = a.baseLanes | n), (t.memoizedState = null))
            : (r = n),
            G(or, Me),
            (Me |= r);
    return ke(e, t, i, n), t.child;
}
function Up(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
        ((t.flags |= 512), (t.flags |= 2097152));
}
function Xl(e, t, n, r, i) {
    var a = je(n) ? Cn : xe.current;
    return (
        (a = kr(t, a)),
        gr(t, i),
        (n = wc(e, t, n, r, a, i)),
        (r = xc()),
        e !== null && !Ae
            ? ((t.updateQueue = e.updateQueue),
              (t.flags &= -2053),
              (e.lanes &= ~i),
              jt(e, t, i))
            : (J && r && sc(t), (t.flags |= 1), ke(e, t, n, i), t.child)
    );
}
function od(e, t, n, r, i) {
    if (je(n)) {
        var a = !0;
        ho(t);
    } else a = !1;
    if ((gr(t, i), t.stateNode === null))
        Ha(e, t), Fp(t, n, r), Yl(t, n, r, i), (r = !0);
    else if (e === null) {
        var o = t.stateNode,
            s = t.memoizedProps;
        o.props = s;
        var l = o.context,
            u = n.contextType;
        typeof u == 'object' && u !== null
            ? (u = Xe(u))
            : ((u = je(n) ? Cn : xe.current), (u = kr(t, u)));
        var f = n.getDerivedStateFromProps,
            c =
                typeof f == 'function' ||
                typeof o.getSnapshotBeforeUpdate == 'function';
        c ||
            (typeof o.UNSAFE_componentWillReceiveProps != 'function' &&
                typeof o.componentWillReceiveProps != 'function') ||
            ((s !== r || l !== u) && ed(t, o, r, u)),
            (Ut = !1);
        var d = t.memoizedState;
        (o.state = d),
            vo(t, r, o, i),
            (l = t.memoizedState),
            s !== r || d !== l || Pe.current || Ut
                ? (typeof f == 'function' &&
                      (Bl(t, n, f, r), (l = t.memoizedState)),
                  (s = Ut || Zf(t, n, s, r, d, l, u))
                      ? (c ||
                            (typeof o.UNSAFE_componentWillMount != 'function' &&
                                typeof o.componentWillMount != 'function') ||
                            (typeof o.componentWillMount == 'function' &&
                                o.componentWillMount(),
                            typeof o.UNSAFE_componentWillMount == 'function' &&
                                o.UNSAFE_componentWillMount()),
                        typeof o.componentDidMount == 'function' &&
                            (t.flags |= 4194308))
                      : (typeof o.componentDidMount == 'function' &&
                            (t.flags |= 4194308),
                        (t.memoizedProps = r),
                        (t.memoizedState = l)),
                  (o.props = r),
                  (o.state = l),
                  (o.context = u),
                  (r = s))
                : (typeof o.componentDidMount == 'function' &&
                      (t.flags |= 4194308),
                  (r = !1));
    } else {
        (o = t.stateNode),
            pp(e, t),
            (s = t.memoizedProps),
            (u = t.type === t.elementType ? s : Je(t.type, s)),
            (o.props = u),
            (c = t.pendingProps),
            (d = o.context),
            (l = n.contextType),
            typeof l == 'object' && l !== null
                ? (l = Xe(l))
                : ((l = je(n) ? Cn : xe.current), (l = kr(t, l)));
        var g = n.getDerivedStateFromProps;
        (f =
            typeof g == 'function' ||
            typeof o.getSnapshotBeforeUpdate == 'function') ||
            (typeof o.UNSAFE_componentWillReceiveProps != 'function' &&
                typeof o.componentWillReceiveProps != 'function') ||
            ((s !== c || d !== l) && ed(t, o, r, l)),
            (Ut = !1),
            (d = t.memoizedState),
            (o.state = d),
            vo(t, r, o, i);
        var w = t.memoizedState;
        s !== c || d !== w || Pe.current || Ut
            ? (typeof g == 'function' &&
                  (Bl(t, n, g, r), (w = t.memoizedState)),
              (u = Ut || Zf(t, n, u, r, d, w, l) || !1)
                  ? (f ||
                        (typeof o.UNSAFE_componentWillUpdate != 'function' &&
                            typeof o.componentWillUpdate != 'function') ||
                        (typeof o.componentWillUpdate == 'function' &&
                            o.componentWillUpdate(r, w, l),
                        typeof o.UNSAFE_componentWillUpdate == 'function' &&
                            o.UNSAFE_componentWillUpdate(r, w, l)),
                    typeof o.componentDidUpdate == 'function' && (t.flags |= 4),
                    typeof o.getSnapshotBeforeUpdate == 'function' &&
                        (t.flags |= 1024))
                  : (typeof o.componentDidUpdate != 'function' ||
                        (s === e.memoizedProps && d === e.memoizedState) ||
                        (t.flags |= 4),
                    typeof o.getSnapshotBeforeUpdate != 'function' ||
                        (s === e.memoizedProps && d === e.memoizedState) ||
                        (t.flags |= 1024),
                    (t.memoizedProps = r),
                    (t.memoizedState = w)),
              (o.props = r),
              (o.state = w),
              (o.context = l),
              (r = u))
            : (typeof o.componentDidUpdate != 'function' ||
                  (s === e.memoizedProps && d === e.memoizedState) ||
                  (t.flags |= 4),
              typeof o.getSnapshotBeforeUpdate != 'function' ||
                  (s === e.memoizedProps && d === e.memoizedState) ||
                  (t.flags |= 1024),
              (r = !1));
    }
    return Kl(e, t, n, r, a, i);
}
function Kl(e, t, n, r, i, a) {
    Up(e, t);
    var o = (t.flags & 128) !== 0;
    if (!r && !o) return i && Bf(t, n, !1), jt(e, t, a);
    (r = t.stateNode), (R1.current = t);
    var s =
        o && typeof n.getDerivedStateFromError != 'function'
            ? null
            : r.render();
    return (
        (t.flags |= 1),
        e !== null && o
            ? ((t.child = br(t, e.child, null, a)),
              (t.child = br(t, null, s, a)))
            : ke(e, t, s, a),
        (t.memoizedState = r.state),
        i && Bf(t, n, !0),
        t.child
    );
}
function Hp(e) {
    var t = e.stateNode;
    t.pendingContext
        ? Vf(e, t.pendingContext, t.pendingContext !== t.context)
        : t.context && Vf(e, t.context, !1),
        pc(e, t.containerInfo);
}
function sd(e, t, n, r, i) {
    return Sr(), uc(i), (t.flags |= 256), ke(e, t, n, r), t.child;
}
var Ql = { dehydrated: null, treeContext: null, retryLane: 0 };
function ql(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
}
function Wp(e, t, n) {
    var r = t.pendingProps,
        i = ee.current,
        a = !1,
        o = (t.flags & 128) !== 0,
        s;
    if (
        ((s = o) ||
            (s = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
        s
            ? ((a = !0), (t.flags &= -129))
            : (e === null || e.memoizedState !== null) && (i |= 1),
        G(ee, i & 1),
        e === null)
    )
        return (
            Wl(t),
            (e = t.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null)
                ? (t.mode & 1
                      ? e.data === '$!'
                          ? (t.lanes = 8)
                          : (t.lanes = 1073741824)
                      : (t.lanes = 1),
                  null)
                : ((o = r.children),
                  (e = r.fallback),
                  a
                      ? ((r = t.mode),
                        (a = t.child),
                        (o = { mode: 'hidden', children: o }),
                        !(r & 1) && a !== null
                            ? ((a.childLanes = 0), (a.pendingProps = o))
                            : (a = ts(o, r, 0, null)),
                        (e = _n(e, r, n, null)),
                        (a.return = t),
                        (e.return = t),
                        (a.sibling = e),
                        (t.child = a),
                        (t.child.memoizedState = ql(n)),
                        (t.memoizedState = Ql),
                        e)
                      : bc(t, o))
        );
    if (((i = e.memoizedState), i !== null && ((s = i.dehydrated), s !== null)))
        return O1(e, t, o, r, s, i, n);
    if (a) {
        (a = r.fallback), (o = t.mode), (i = e.child), (s = i.sibling);
        var l = { mode: 'hidden', children: r.children };
        return (
            !(o & 1) && t.child !== i
                ? ((r = t.child),
                  (r.childLanes = 0),
                  (r.pendingProps = l),
                  (t.deletions = null))
                : ((r = Zt(i, l)),
                  (r.subtreeFlags = i.subtreeFlags & 14680064)),
            s !== null
                ? (a = Zt(s, a))
                : ((a = _n(a, o, n, null)), (a.flags |= 2)),
            (a.return = t),
            (r.return = t),
            (r.sibling = a),
            (t.child = r),
            (r = a),
            (a = t.child),
            (o = e.child.memoizedState),
            (o =
                o === null
                    ? ql(n)
                    : {
                          baseLanes: o.baseLanes | n,
                          cachePool: null,
                          transitions: o.transitions
                      }),
            (a.memoizedState = o),
            (a.childLanes = e.childLanes & ~n),
            (t.memoizedState = Ql),
            r
        );
    }
    return (
        (a = e.child),
        (e = a.sibling),
        (r = Zt(a, { mode: 'visible', children: r.children })),
        !(t.mode & 1) && (r.lanes = n),
        (r.return = t),
        (r.sibling = null),
        e !== null &&
            ((n = t.deletions),
            n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
        (t.child = r),
        (t.memoizedState = null),
        r
    );
}
function bc(e, t) {
    return (
        (t = ts({ mode: 'visible', children: t }, e.mode, 0, null)),
        (t.return = e),
        (e.child = t)
    );
}
function wa(e, t, n, r) {
    return (
        r !== null && uc(r),
        br(t, e.child, null, n),
        (e = bc(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
    );
}
function O1(e, t, n, r, i, a, o) {
    if (n)
        return t.flags & 256
            ? ((t.flags &= -257), (r = Ds(Error(C(422)))), wa(e, t, o, r))
            : t.memoizedState !== null
            ? ((t.child = e.child), (t.flags |= 128), null)
            : ((a = r.fallback),
              (i = t.mode),
              (r = ts({ mode: 'visible', children: r.children }, i, 0, null)),
              (a = _n(a, i, o, null)),
              (a.flags |= 2),
              (r.return = t),
              (a.return = t),
              (r.sibling = a),
              (t.child = r),
              t.mode & 1 && br(t, e.child, null, o),
              (t.child.memoizedState = ql(o)),
              (t.memoizedState = Ql),
              a);
    if (!(t.mode & 1)) return wa(e, t, o, null);
    if (i.data === '$!') {
        if (((r = i.nextSibling && i.nextSibling.dataset), r)) var s = r.dgst;
        return (
            (r = s), (a = Error(C(419))), (r = Ds(a, r, void 0)), wa(e, t, o, r)
        );
    }
    if (((s = (o & e.childLanes) !== 0), Ae || s)) {
        if (((r = ce), r !== null)) {
            switch (o & -o) {
                case 4:
                    i = 2;
                    break;
                case 16:
                    i = 8;
                    break;
                case 64:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                case 67108864:
                    i = 32;
                    break;
                case 536870912:
                    i = 268435456;
                    break;
                default:
                    i = 0;
            }
            (i = i & (r.suspendedLanes | o) ? 0 : i),
                i !== 0 &&
                    i !== a.retryLane &&
                    ((a.retryLane = i), Pt(e, i), at(r, e, i, -1));
        }
        return Tc(), (r = Ds(Error(C(421)))), wa(e, t, o, r);
    }
    return i.data === '$?'
        ? ((t.flags |= 128),
          (t.child = e.child),
          (t = J1.bind(null, e)),
          (i._reactRetry = t),
          null)
        : ((e = a.treeContext),
          (ze = Kt(i.nextSibling)),
          (Le = t),
          (J = !0),
          (et = null),
          e !== null &&
              ((He[We++] = Et),
              (He[We++] = Ct),
              (He[We++] = Nn),
              (Et = e.id),
              (Ct = e.overflow),
              (Nn = t)),
          (t = bc(t, r.children)),
          (t.flags |= 4096),
          t);
}
function ld(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Vl(e.return, t, n);
}
function Us(e, t, n, r, i) {
    var a = e.memoizedState;
    a === null
        ? (e.memoizedState = {
              isBackwards: t,
              rendering: null,
              renderingStartTime: 0,
              last: r,
              tail: n,
              tailMode: i
          })
        : ((a.isBackwards = t),
          (a.rendering = null),
          (a.renderingStartTime = 0),
          (a.last = r),
          (a.tail = n),
          (a.tailMode = i));
}
function Vp(e, t, n) {
    var r = t.pendingProps,
        i = r.revealOrder,
        a = r.tail;
    if ((ke(e, t, r.children, n), (r = ee.current), r & 2))
        (r = (r & 1) | 2), (t.flags |= 128);
    else {
        if (e !== null && e.flags & 128)
            e: for (e = t.child; e !== null; ) {
                if (e.tag === 13) e.memoizedState !== null && ld(e, n, t);
                else if (e.tag === 19) ld(e, n, t);
                else if (e.child !== null) {
                    (e.child.return = e), (e = e.child);
                    continue;
                }
                if (e === t) break e;
                for (; e.sibling === null; ) {
                    if (e.return === null || e.return === t) break e;
                    e = e.return;
                }
                (e.sibling.return = e.return), (e = e.sibling);
            }
        r &= 1;
    }
    if ((G(ee, r), !(t.mode & 1))) t.memoizedState = null;
    else
        switch (i) {
            case 'forwards':
                for (n = t.child, i = null; n !== null; )
                    (e = n.alternate),
                        e !== null && wo(e) === null && (i = n),
                        (n = n.sibling);
                (n = i),
                    n === null
                        ? ((i = t.child), (t.child = null))
                        : ((i = n.sibling), (n.sibling = null)),
                    Us(t, !1, i, n, a);
                break;
            case 'backwards':
                for (n = null, i = t.child, t.child = null; i !== null; ) {
                    if (((e = i.alternate), e !== null && wo(e) === null)) {
                        t.child = i;
                        break;
                    }
                    (e = i.sibling), (i.sibling = n), (n = i), (i = e);
                }
                Us(t, !0, n, null, a);
                break;
            case 'together':
                Us(t, !1, null, null, void 0);
                break;
            default:
                t.memoizedState = null;
        }
    return t.child;
}
function Ha(e, t) {
    !(t.mode & 1) &&
        e !== null &&
        ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function jt(e, t, n) {
    if (
        (e !== null && (t.dependencies = e.dependencies),
        (Tn |= t.lanes),
        !(n & t.childLanes))
    )
        return null;
    if (e !== null && t.child !== e.child) throw Error(C(153));
    if (t.child !== null) {
        for (
            e = t.child, n = Zt(e, e.pendingProps), t.child = n, n.return = t;
            e.sibling !== null;

        )
            (e = e.sibling),
                (n = n.sibling = Zt(e, e.pendingProps)),
                (n.return = t);
        n.sibling = null;
    }
    return t.child;
}
function D1(e, t, n) {
    switch (t.tag) {
        case 3:
            Hp(t), Sr();
            break;
        case 5:
            gp(t);
            break;
        case 1:
            je(t.type) && ho(t);
            break;
        case 4:
            pc(t, t.stateNode.containerInfo);
            break;
        case 10:
            var r = t.type._context,
                i = t.memoizedProps.value;
            G(go, r._currentValue), (r._currentValue = i);
            break;
        case 13:
            if (((r = t.memoizedState), r !== null))
                return r.dehydrated !== null
                    ? (G(ee, ee.current & 1), (t.flags |= 128), null)
                    : n & t.child.childLanes
                    ? Wp(e, t, n)
                    : (G(ee, ee.current & 1),
                      (e = jt(e, t, n)),
                      e !== null ? e.sibling : null);
            G(ee, ee.current & 1);
            break;
        case 19:
            if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
                if (r) return Vp(e, t, n);
                t.flags |= 128;
            }
            if (
                ((i = t.memoizedState),
                i !== null &&
                    ((i.rendering = null),
                    (i.tail = null),
                    (i.lastEffect = null)),
                G(ee, ee.current),
                r)
            )
                break;
            return null;
        case 22:
        case 23:
            return (t.lanes = 0), Dp(e, t, n);
    }
    return jt(e, t, n);
}
var Bp, Jl, Yp, Gp;
Bp = function (e, t) {
    for (var n = t.child; n !== null; ) {
        if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            (n.child.return = n), (n = n.child);
            continue;
        }
        if (n === t) break;
        for (; n.sibling === null; ) {
            if (n.return === null || n.return === t) return;
            n = n.return;
        }
        (n.sibling.return = n.return), (n = n.sibling);
    }
};
Jl = function () {};
Yp = function (e, t, n, r) {
    var i = e.memoizedProps;
    if (i !== r) {
        (e = t.stateNode), vn(pt.current);
        var a = null;
        switch (n) {
            case 'input':
                (i = xl(e, i)), (r = xl(e, r)), (a = []);
                break;
            case 'select':
                (i = ne({}, i, { value: void 0 })),
                    (r = ne({}, r, { value: void 0 })),
                    (a = []);
                break;
            case 'textarea':
                (i = bl(e, i)), (r = bl(e, r)), (a = []);
                break;
            default:
                typeof i.onClick != 'function' &&
                    typeof r.onClick == 'function' &&
                    (e.onclick = co);
        }
        El(n, r);
        var o;
        n = null;
        for (u in i)
            if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
                if (u === 'style') {
                    var s = i[u];
                    for (o in s)
                        s.hasOwnProperty(o) && (n || (n = {}), (n[o] = ''));
                } else
                    u !== 'dangerouslySetInnerHTML' &&
                        u !== 'children' &&
                        u !== 'suppressContentEditableWarning' &&
                        u !== 'suppressHydrationWarning' &&
                        u !== 'autoFocus' &&
                        (_i.hasOwnProperty(u)
                            ? a || (a = [])
                            : (a = a || []).push(u, null));
        for (u in r) {
            var l = r[u];
            if (
                ((s = i != null ? i[u] : void 0),
                r.hasOwnProperty(u) && l !== s && (l != null || s != null))
            )
                if (u === 'style')
                    if (s) {
                        for (o in s)
                            !s.hasOwnProperty(o) ||
                                (l && l.hasOwnProperty(o)) ||
                                (n || (n = {}), (n[o] = ''));
                        for (o in l)
                            l.hasOwnProperty(o) &&
                                s[o] !== l[o] &&
                                (n || (n = {}), (n[o] = l[o]));
                    } else n || (a || (a = []), a.push(u, n)), (n = l);
                else
                    u === 'dangerouslySetInnerHTML'
                        ? ((l = l ? l.__html : void 0),
                          (s = s ? s.__html : void 0),
                          l != null && s !== l && (a = a || []).push(u, l))
                        : u === 'children'
                        ? (typeof l != 'string' && typeof l != 'number') ||
                          (a = a || []).push(u, '' + l)
                        : u !== 'suppressContentEditableWarning' &&
                          u !== 'suppressHydrationWarning' &&
                          (_i.hasOwnProperty(u)
                              ? (l != null &&
                                    u === 'onScroll' &&
                                    X('scroll', e),
                                a || s === l || (a = []))
                              : (a = a || []).push(u, l));
        }
        n && (a = a || []).push('style', n);
        var u = a;
        (t.updateQueue = u) && (t.flags |= 4);
    }
};
Gp = function (e, t, n, r) {
    n !== r && (t.flags |= 4);
};
function Xr(e, t) {
    if (!J)
        switch (e.tailMode) {
            case 'hidden':
                t = e.tail;
                for (var n = null; t !== null; )
                    t.alternate !== null && (n = t), (t = t.sibling);
                n === null ? (e.tail = null) : (n.sibling = null);
                break;
            case 'collapsed':
                n = e.tail;
                for (var r = null; n !== null; )
                    n.alternate !== null && (r = n), (n = n.sibling);
                r === null
                    ? t || e.tail === null
                        ? (e.tail = null)
                        : (e.tail.sibling = null)
                    : (r.sibling = null);
        }
}
function ve(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0;
    if (t)
        for (var i = e.child; i !== null; )
            (n |= i.lanes | i.childLanes),
                (r |= i.subtreeFlags & 14680064),
                (r |= i.flags & 14680064),
                (i.return = e),
                (i = i.sibling);
    else
        for (i = e.child; i !== null; )
            (n |= i.lanes | i.childLanes),
                (r |= i.subtreeFlags),
                (r |= i.flags),
                (i.return = e),
                (i = i.sibling);
    return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function U1(e, t, n) {
    var r = t.pendingProps;
    switch ((lc(t), t.tag)) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return ve(t), null;
        case 1:
            return je(t.type) && fo(), ve(t), null;
        case 3:
            return (
                (r = t.stateNode),
                _r(),
                K(Pe),
                K(xe),
                yc(),
                r.pendingContext &&
                    ((r.context = r.pendingContext), (r.pendingContext = null)),
                (e === null || e.child === null) &&
                    (ya(t)
                        ? (t.flags |= 4)
                        : e === null ||
                          (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                          ((t.flags |= 1024),
                          et !== null && (ou(et), (et = null)))),
                Jl(e, t),
                ve(t),
                null
            );
        case 5:
            gc(t);
            var i = vn(Fi.current);
            if (((n = t.type), e !== null && t.stateNode != null))
                Yp(e, t, n, r, i),
                    e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
            else {
                if (!r) {
                    if (t.stateNode === null) throw Error(C(166));
                    return ve(t), null;
                }
                if (((e = vn(pt.current)), ya(t))) {
                    (r = t.stateNode), (n = t.type);
                    var a = t.memoizedProps;
                    switch (
                        ((r[dt] = t), (r[zi] = a), (e = (t.mode & 1) !== 0), n)
                    ) {
                        case 'dialog':
                            X('cancel', r), X('close', r);
                            break;
                        case 'iframe':
                        case 'object':
                        case 'embed':
                            X('load', r);
                            break;
                        case 'video':
                        case 'audio':
                            for (i = 0; i < ti.length; i++) X(ti[i], r);
                            break;
                        case 'source':
                            X('error', r);
                            break;
                        case 'img':
                        case 'image':
                        case 'link':
                            X('error', r), X('load', r);
                            break;
                        case 'details':
                            X('toggle', r);
                            break;
                        case 'input':
                            yf(r, a), X('invalid', r);
                            break;
                        case 'select':
                            (r._wrapperState = { wasMultiple: !!a.multiple }),
                                X('invalid', r);
                            break;
                        case 'textarea':
                            wf(r, a), X('invalid', r);
                    }
                    El(n, a), (i = null);
                    for (var o in a)
                        if (a.hasOwnProperty(o)) {
                            var s = a[o];
                            o === 'children'
                                ? typeof s == 'string'
                                    ? r.textContent !== s &&
                                      (a.suppressHydrationWarning !== !0 &&
                                          ga(r.textContent, s, e),
                                      (i = ['children', s]))
                                    : typeof s == 'number' &&
                                      r.textContent !== '' + s &&
                                      (a.suppressHydrationWarning !== !0 &&
                                          ga(r.textContent, s, e),
                                      (i = ['children', '' + s]))
                                : _i.hasOwnProperty(o) &&
                                  s != null &&
                                  o === 'onScroll' &&
                                  X('scroll', r);
                        }
                    switch (n) {
                        case 'input':
                            la(r), vf(r, a, !0);
                            break;
                        case 'textarea':
                            la(r), xf(r);
                            break;
                        case 'select':
                        case 'option':
                            break;
                        default:
                            typeof a.onClick == 'function' && (r.onclick = co);
                    }
                    (r = i), (t.updateQueue = r), r !== null && (t.flags |= 4);
                } else {
                    (o = i.nodeType === 9 ? i : i.ownerDocument),
                        e === 'http://www.w3.org/1999/xhtml' && (e = km(n)),
                        e === 'http://www.w3.org/1999/xhtml'
                            ? n === 'script'
                                ? ((e = o.createElement('div')),
                                  (e.innerHTML = '<script></script>'),
                                  (e = e.removeChild(e.firstChild)))
                                : typeof r.is == 'string'
                                ? (e = o.createElement(n, { is: r.is }))
                                : ((e = o.createElement(n)),
                                  n === 'select' &&
                                      ((o = e),
                                      r.multiple
                                          ? (o.multiple = !0)
                                          : r.size && (o.size = r.size)))
                            : (e = o.createElementNS(e, n)),
                        (e[dt] = t),
                        (e[zi] = r),
                        Bp(e, t, !1, !1),
                        (t.stateNode = e);
                    e: {
                        switch (((o = Cl(n, r)), n)) {
                            case 'dialog':
                                X('cancel', e), X('close', e), (i = r);
                                break;
                            case 'iframe':
                            case 'object':
                            case 'embed':
                                X('load', e), (i = r);
                                break;
                            case 'video':
                            case 'audio':
                                for (i = 0; i < ti.length; i++) X(ti[i], e);
                                i = r;
                                break;
                            case 'source':
                                X('error', e), (i = r);
                                break;
                            case 'img':
                            case 'image':
                            case 'link':
                                X('error', e), X('load', e), (i = r);
                                break;
                            case 'details':
                                X('toggle', e), (i = r);
                                break;
                            case 'input':
                                yf(e, r), (i = xl(e, r)), X('invalid', e);
                                break;
                            case 'option':
                                i = r;
                                break;
                            case 'select':
                                (e._wrapperState = {
                                    wasMultiple: !!r.multiple
                                }),
                                    (i = ne({}, r, { value: void 0 })),
                                    X('invalid', e);
                                break;
                            case 'textarea':
                                wf(e, r), (i = bl(e, r)), X('invalid', e);
                                break;
                            default:
                                i = r;
                        }
                        El(n, i), (s = i);
                        for (a in s)
                            if (s.hasOwnProperty(a)) {
                                var l = s[a];
                                a === 'style'
                                    ? _m(e, l)
                                    : a === 'dangerouslySetInnerHTML'
                                    ? ((l = l ? l.__html : void 0),
                                      l != null && Sm(e, l))
                                    : a === 'children'
                                    ? typeof l == 'string'
                                        ? (n !== 'textarea' || l !== '') &&
                                          Ei(e, l)
                                        : typeof l == 'number' && Ei(e, '' + l)
                                    : a !== 'suppressContentEditableWarning' &&
                                      a !== 'suppressHydrationWarning' &&
                                      a !== 'autoFocus' &&
                                      (_i.hasOwnProperty(a)
                                          ? l != null &&
                                            a === 'onScroll' &&
                                            X('scroll', e)
                                          : l != null && Gu(e, a, l, o));
                            }
                        switch (n) {
                            case 'input':
                                la(e), vf(e, r, !1);
                                break;
                            case 'textarea':
                                la(e), xf(e);
                                break;
                            case 'option':
                                r.value != null &&
                                    e.setAttribute('value', '' + en(r.value));
                                break;
                            case 'select':
                                (e.multiple = !!r.multiple),
                                    (a = r.value),
                                    a != null
                                        ? dr(e, !!r.multiple, a, !1)
                                        : r.defaultValue != null &&
                                          dr(
                                              e,
                                              !!r.multiple,
                                              r.defaultValue,
                                              !0
                                          );
                                break;
                            default:
                                typeof i.onClick == 'function' &&
                                    (e.onclick = co);
                        }
                        switch (n) {
                            case 'button':
                            case 'input':
                            case 'select':
                            case 'textarea':
                                r = !!r.autoFocus;
                                break e;
                            case 'img':
                                r = !0;
                                break e;
                            default:
                                r = !1;
                        }
                    }
                    r && (t.flags |= 4);
                }
                t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
            }
            return ve(t), null;
        case 6:
            if (e && t.stateNode != null) Gp(e, t, e.memoizedProps, r);
            else {
                if (typeof r != 'string' && t.stateNode === null)
                    throw Error(C(166));
                if (((n = vn(Fi.current)), vn(pt.current), ya(t))) {
                    if (
                        ((r = t.stateNode),
                        (n = t.memoizedProps),
                        (r[dt] = t),
                        (a = r.nodeValue !== n) && ((e = Le), e !== null))
                    )
                        switch (e.tag) {
                            case 3:
                                ga(r.nodeValue, n, (e.mode & 1) !== 0);
                                break;
                            case 5:
                                e.memoizedProps.suppressHydrationWarning !==
                                    !0 &&
                                    ga(r.nodeValue, n, (e.mode & 1) !== 0);
                        }
                    a && (t.flags |= 4);
                } else
                    (r = (
                        n.nodeType === 9 ? n : n.ownerDocument
                    ).createTextNode(r)),
                        (r[dt] = t),
                        (t.stateNode = r);
            }
            return ve(t), null;
        case 13:
            if (
                (K(ee),
                (r = t.memoizedState),
                e === null ||
                    (e.memoizedState !== null &&
                        e.memoizedState.dehydrated !== null))
            ) {
                if (J && ze !== null && t.mode & 1 && !(t.flags & 128))
                    fp(), Sr(), (t.flags |= 98560), (a = !1);
                else if (((a = ya(t)), r !== null && r.dehydrated !== null)) {
                    if (e === null) {
                        if (!a) throw Error(C(318));
                        if (
                            ((a = t.memoizedState),
                            (a = a !== null ? a.dehydrated : null),
                            !a)
                        )
                            throw Error(C(317));
                        a[dt] = t;
                    } else
                        Sr(),
                            !(t.flags & 128) && (t.memoizedState = null),
                            (t.flags |= 4);
                    ve(t), (a = !1);
                } else et !== null && (ou(et), (et = null)), (a = !0);
                if (!a) return t.flags & 65536 ? t : null;
            }
            return t.flags & 128
                ? ((t.lanes = n), t)
                : ((r = r !== null),
                  r !== (e !== null && e.memoizedState !== null) &&
                      r &&
                      ((t.child.flags |= 8192),
                      t.mode & 1 &&
                          (e === null || ee.current & 1
                              ? le === 0 && (le = 3)
                              : Tc())),
                  t.updateQueue !== null && (t.flags |= 4),
                  ve(t),
                  null);
        case 4:
            return (
                _r(),
                Jl(e, t),
                e === null && Ii(t.stateNode.containerInfo),
                ve(t),
                null
            );
        case 10:
            return dc(t.type._context), ve(t), null;
        case 17:
            return je(t.type) && fo(), ve(t), null;
        case 19:
            if ((K(ee), (a = t.memoizedState), a === null)) return ve(t), null;
            if (((r = (t.flags & 128) !== 0), (o = a.rendering), o === null))
                if (r) Xr(a, !1);
                else {
                    if (le !== 0 || (e !== null && e.flags & 128))
                        for (e = t.child; e !== null; ) {
                            if (((o = wo(e)), o !== null)) {
                                for (
                                    t.flags |= 128,
                                        Xr(a, !1),
                                        r = o.updateQueue,
                                        r !== null &&
                                            ((t.updateQueue = r),
                                            (t.flags |= 4)),
                                        t.subtreeFlags = 0,
                                        r = n,
                                        n = t.child;
                                    n !== null;

                                )
                                    (a = n),
                                        (e = r),
                                        (a.flags &= 14680066),
                                        (o = a.alternate),
                                        o === null
                                            ? ((a.childLanes = 0),
                                              (a.lanes = e),
                                              (a.child = null),
                                              (a.subtreeFlags = 0),
                                              (a.memoizedProps = null),
                                              (a.memoizedState = null),
                                              (a.updateQueue = null),
                                              (a.dependencies = null),
                                              (a.stateNode = null))
                                            : ((a.childLanes = o.childLanes),
                                              (a.lanes = o.lanes),
                                              (a.child = o.child),
                                              (a.subtreeFlags = 0),
                                              (a.deletions = null),
                                              (a.memoizedProps =
                                                  o.memoizedProps),
                                              (a.memoizedState =
                                                  o.memoizedState),
                                              (a.updateQueue = o.updateQueue),
                                              (a.type = o.type),
                                              (e = o.dependencies),
                                              (a.dependencies =
                                                  e === null
                                                      ? null
                                                      : {
                                                            lanes: e.lanes,
                                                            firstContext:
                                                                e.firstContext
                                                        })),
                                        (n = n.sibling);
                                return G(ee, (ee.current & 1) | 2), t.child;
                            }
                            e = e.sibling;
                        }
                    a.tail !== null &&
                        ie() > Cr &&
                        ((t.flags |= 128),
                        (r = !0),
                        Xr(a, !1),
                        (t.lanes = 4194304));
                }
            else {
                if (!r)
                    if (((e = wo(o)), e !== null)) {
                        if (
                            ((t.flags |= 128),
                            (r = !0),
                            (n = e.updateQueue),
                            n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                            Xr(a, !0),
                            a.tail === null &&
                                a.tailMode === 'hidden' &&
                                !o.alternate &&
                                !J)
                        )
                            return ve(t), null;
                    } else
                        2 * ie() - a.renderingStartTime > Cr &&
                            n !== 1073741824 &&
                            ((t.flags |= 128),
                            (r = !0),
                            Xr(a, !1),
                            (t.lanes = 4194304));
                a.isBackwards
                    ? ((o.sibling = t.child), (t.child = o))
                    : ((n = a.last),
                      n !== null ? (n.sibling = o) : (t.child = o),
                      (a.last = o));
            }
            return a.tail !== null
                ? ((t = a.tail),
                  (a.rendering = t),
                  (a.tail = t.sibling),
                  (a.renderingStartTime = ie()),
                  (t.sibling = null),
                  (n = ee.current),
                  G(ee, r ? (n & 1) | 2 : n & 1),
                  t)
                : (ve(t), null);
        case 22:
        case 23:
            return (
                Ac(),
                (r = t.memoizedState !== null),
                e !== null &&
                    (e.memoizedState !== null) !== r &&
                    (t.flags |= 8192),
                r && t.mode & 1
                    ? Me & 1073741824 &&
                      (ve(t), t.subtreeFlags & 6 && (t.flags |= 8192))
                    : ve(t),
                null
            );
        case 24:
            return null;
        case 25:
            return null;
    }
    throw Error(C(156, t.tag));
}
function H1(e, t) {
    switch ((lc(t), t.tag)) {
        case 1:
            return (
                je(t.type) && fo(),
                (e = t.flags),
                e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
            );
        case 3:
            return (
                _r(),
                K(Pe),
                K(xe),
                yc(),
                (e = t.flags),
                e & 65536 && !(e & 128)
                    ? ((t.flags = (e & -65537) | 128), t)
                    : null
            );
        case 5:
            return gc(t), null;
        case 13:
            if (
                (K(ee),
                (e = t.memoizedState),
                e !== null && e.dehydrated !== null)
            ) {
                if (t.alternate === null) throw Error(C(340));
                Sr();
            }
            return (
                (e = t.flags),
                e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
            );
        case 19:
            return K(ee), null;
        case 4:
            return _r(), null;
        case 10:
            return dc(t.type._context), null;
        case 22:
        case 23:
            return Ac(), null;
        case 24:
            return null;
        default:
            return null;
    }
}
var xa = !1,
    we = !1,
    W1 = typeof WeakSet == 'function' ? WeakSet : Set,
    j = null;
function ar(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == 'function')
            try {
                n(null);
            } catch (r) {
                re(e, t, r);
            }
        else n.current = null;
}
function Zl(e, t, n) {
    try {
        n();
    } catch (r) {
        re(e, t, r);
    }
}
var ud = !1;
function V1(e, t) {
    if (((Fl = so), (e = Jm()), oc(e))) {
        if ('selectionStart' in e)
            var n = { start: e.selectionStart, end: e.selectionEnd };
        else
            e: {
                n = ((n = e.ownerDocument) && n.defaultView) || window;
                var r = n.getSelection && n.getSelection();
                if (r && r.rangeCount !== 0) {
                    n = r.anchorNode;
                    var i = r.anchorOffset,
                        a = r.focusNode;
                    r = r.focusOffset;
                    try {
                        n.nodeType, a.nodeType;
                    } catch {
                        n = null;
                        break e;
                    }
                    var o = 0,
                        s = -1,
                        l = -1,
                        u = 0,
                        f = 0,
                        c = e,
                        d = null;
                    t: for (;;) {
                        for (
                            var g;
                            c !== n ||
                                (i !== 0 && c.nodeType !== 3) ||
                                (s = o + i),
                                c !== a ||
                                    (r !== 0 && c.nodeType !== 3) ||
                                    (l = o + r),
                                c.nodeType === 3 && (o += c.nodeValue.length),
                                (g = c.firstChild) !== null;

                        )
                            (d = c), (c = g);
                        for (;;) {
                            if (c === e) break t;
                            if (
                                (d === n && ++u === i && (s = o),
                                d === a && ++f === r && (l = o),
                                (g = c.nextSibling) !== null)
                            )
                                break;
                            (c = d), (d = c.parentNode);
                        }
                        c = g;
                    }
                    n = s === -1 || l === -1 ? null : { start: s, end: l };
                } else n = null;
            }
        n = n || { start: 0, end: 0 };
    } else n = null;
    for (
        $l = { focusedElem: e, selectionRange: n }, so = !1, j = t;
        j !== null;

    )
        if (
            ((t = j),
            (e = t.child),
            (t.subtreeFlags & 1028) !== 0 && e !== null)
        )
            (e.return = t), (j = e);
        else
            for (; j !== null; ) {
                t = j;
                try {
                    var w = t.alternate;
                    if (t.flags & 1024)
                        switch (t.tag) {
                            case 0:
                            case 11:
                            case 15:
                                break;
                            case 1:
                                if (w !== null) {
                                    var y = w.memoizedProps,
                                        b = w.memoizedState,
                                        m = t.stateNode,
                                        h = m.getSnapshotBeforeUpdate(
                                            t.elementType === t.type
                                                ? y
                                                : Je(t.type, y),
                                            b
                                        );
                                    m.__reactInternalSnapshotBeforeUpdate = h;
                                }
                                break;
                            case 3:
                                var p = t.stateNode.containerInfo;
                                p.nodeType === 1
                                    ? (p.textContent = '')
                                    : p.nodeType === 9 &&
                                      p.documentElement &&
                                      p.removeChild(p.documentElement);
                                break;
                            case 5:
                            case 6:
                            case 4:
                            case 17:
                                break;
                            default:
                                throw Error(C(163));
                        }
                } catch (v) {
                    re(t, t.return, v);
                }
                if (((e = t.sibling), e !== null)) {
                    (e.return = t.return), (j = e);
                    break;
                }
                j = t.return;
            }
    return (w = ud), (ud = !1), w;
}
function pi(e, t, n) {
    var r = t.updateQueue;
    if (((r = r !== null ? r.lastEffect : null), r !== null)) {
        var i = (r = r.next);
        do {
            if ((i.tag & e) === e) {
                var a = i.destroy;
                (i.destroy = void 0), a !== void 0 && Zl(t, n, a);
            }
            i = i.next;
        } while (i !== r);
    }
}
function Zo(e, t) {
    if (
        ((t = t.updateQueue),
        (t = t !== null ? t.lastEffect : null),
        t !== null)
    ) {
        var n = (t = t.next);
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r();
            }
            n = n.next;
        } while (n !== t);
    }
}
function eu(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
            case 5:
                e = n;
                break;
            default:
                e = n;
        }
        typeof t == 'function' ? t(e) : (t.current = e);
    }
}
function Xp(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), Xp(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 &&
            ((t = e.stateNode),
            t !== null &&
                (delete t[dt],
                delete t[zi],
                delete t[Dl],
                delete t[C1],
                delete t[N1])),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null);
}
function Kp(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function cd(e) {
    e: for (;;) {
        for (; e.sibling === null; ) {
            if (e.return === null || Kp(e.return)) return null;
            e = e.return;
        }
        for (
            e.sibling.return = e.return, e = e.sibling;
            e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

        ) {
            if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
            (e.child.return = e), (e = e.child);
        }
        if (!(e.flags & 2)) return e.stateNode;
    }
}
function tu(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        (e = e.stateNode),
            t
                ? n.nodeType === 8
                    ? n.parentNode.insertBefore(e, t)
                    : n.insertBefore(e, t)
                : (n.nodeType === 8
                      ? ((t = n.parentNode), t.insertBefore(e, n))
                      : ((t = n), t.appendChild(e)),
                  (n = n._reactRootContainer),
                  n != null || t.onclick !== null || (t.onclick = co));
    else if (r !== 4 && ((e = e.child), e !== null))
        for (tu(e, t, n), e = e.sibling; e !== null; )
            tu(e, t, n), (e = e.sibling);
}
function nu(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && ((e = e.child), e !== null))
        for (nu(e, t, n), e = e.sibling; e !== null; )
            nu(e, t, n), (e = e.sibling);
}
var he = null,
    Ze = !1;
function Rt(e, t, n) {
    for (n = n.child; n !== null; ) Qp(e, t, n), (n = n.sibling);
}
function Qp(e, t, n) {
    if (mt && typeof mt.onCommitFiberUnmount == 'function')
        try {
            mt.onCommitFiberUnmount(Bo, n);
        } catch {}
    switch (n.tag) {
        case 5:
            we || ar(n, t);
        case 6:
            var r = he,
                i = Ze;
            (he = null),
                Rt(e, t, n),
                (he = r),
                (Ze = i),
                he !== null &&
                    (Ze
                        ? ((e = he),
                          (n = n.stateNode),
                          e.nodeType === 8
                              ? e.parentNode.removeChild(n)
                              : e.removeChild(n))
                        : he.removeChild(n.stateNode));
            break;
        case 18:
            he !== null &&
                (Ze
                    ? ((e = he),
                      (n = n.stateNode),
                      e.nodeType === 8
                          ? zs(e.parentNode, n)
                          : e.nodeType === 1 && zs(e, n),
                      Ti(e))
                    : zs(he, n.stateNode));
            break;
        case 4:
            (r = he),
                (i = Ze),
                (he = n.stateNode.containerInfo),
                (Ze = !0),
                Rt(e, t, n),
                (he = r),
                (Ze = i);
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            if (
                !we &&
                ((r = n.updateQueue),
                r !== null && ((r = r.lastEffect), r !== null))
            ) {
                i = r = r.next;
                do {
                    var a = i,
                        o = a.destroy;
                    (a = a.tag),
                        o !== void 0 && (a & 2 || a & 4) && Zl(n, t, o),
                        (i = i.next);
                } while (i !== r);
            }
            Rt(e, t, n);
            break;
        case 1:
            if (
                !we &&
                (ar(n, t),
                (r = n.stateNode),
                typeof r.componentWillUnmount == 'function')
            )
                try {
                    (r.props = n.memoizedProps),
                        (r.state = n.memoizedState),
                        r.componentWillUnmount();
                } catch (s) {
                    re(n, t, s);
                }
            Rt(e, t, n);
            break;
        case 21:
            Rt(e, t, n);
            break;
        case 22:
            n.mode & 1
                ? ((we = (r = we) || n.memoizedState !== null),
                  Rt(e, t, n),
                  (we = r))
                : Rt(e, t, n);
            break;
        default:
            Rt(e, t, n);
    }
}
function fd(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new W1()),
            t.forEach(function (r) {
                var i = Z1.bind(null, e, r);
                n.has(r) || (n.add(r), r.then(i, i));
            });
    }
}
function qe(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var i = n[r];
            try {
                var a = e,
                    o = t,
                    s = o;
                e: for (; s !== null; ) {
                    switch (s.tag) {
                        case 5:
                            (he = s.stateNode), (Ze = !1);
                            break e;
                        case 3:
                            (he = s.stateNode.containerInfo), (Ze = !0);
                            break e;
                        case 4:
                            (he = s.stateNode.containerInfo), (Ze = !0);
                            break e;
                    }
                    s = s.return;
                }
                if (he === null) throw Error(C(160));
                Qp(a, o, i), (he = null), (Ze = !1);
                var l = i.alternate;
                l !== null && (l.return = null), (i.return = null);
            } catch (u) {
                re(i, t, u);
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null; ) qp(t, e), (t = t.sibling);
}
function qp(e, t) {
    var n = e.alternate,
        r = e.flags;
    switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            if ((qe(t, e), ct(e), r & 4)) {
                try {
                    pi(3, e, e.return), Zo(3, e);
                } catch (y) {
                    re(e, e.return, y);
                }
                try {
                    pi(5, e, e.return);
                } catch (y) {
                    re(e, e.return, y);
                }
            }
            break;
        case 1:
            qe(t, e), ct(e), r & 512 && n !== null && ar(n, n.return);
            break;
        case 5:
            if (
                (qe(t, e),
                ct(e),
                r & 512 && n !== null && ar(n, n.return),
                e.flags & 32)
            ) {
                var i = e.stateNode;
                try {
                    Ei(i, '');
                } catch (y) {
                    re(e, e.return, y);
                }
            }
            if (r & 4 && ((i = e.stateNode), i != null)) {
                var a = e.memoizedProps,
                    o = n !== null ? n.memoizedProps : a,
                    s = e.type,
                    l = e.updateQueue;
                if (((e.updateQueue = null), l !== null))
                    try {
                        s === 'input' &&
                            a.type === 'radio' &&
                            a.name != null &&
                            wm(i, a),
                            Cl(s, o);
                        var u = Cl(s, a);
                        for (o = 0; o < l.length; o += 2) {
                            var f = l[o],
                                c = l[o + 1];
                            f === 'style'
                                ? _m(i, c)
                                : f === 'dangerouslySetInnerHTML'
                                ? Sm(i, c)
                                : f === 'children'
                                ? Ei(i, c)
                                : Gu(i, f, c, u);
                        }
                        switch (s) {
                            case 'input':
                                kl(i, a);
                                break;
                            case 'textarea':
                                xm(i, a);
                                break;
                            case 'select':
                                var d = i._wrapperState.wasMultiple;
                                i._wrapperState.wasMultiple = !!a.multiple;
                                var g = a.value;
                                g != null
                                    ? dr(i, !!a.multiple, g, !1)
                                    : d !== !!a.multiple &&
                                      (a.defaultValue != null
                                          ? dr(
                                                i,
                                                !!a.multiple,
                                                a.defaultValue,
                                                !0
                                            )
                                          : dr(
                                                i,
                                                !!a.multiple,
                                                a.multiple ? [] : '',
                                                !1
                                            ));
                        }
                        i[zi] = a;
                    } catch (y) {
                        re(e, e.return, y);
                    }
            }
            break;
        case 6:
            if ((qe(t, e), ct(e), r & 4)) {
                if (e.stateNode === null) throw Error(C(162));
                (i = e.stateNode), (a = e.memoizedProps);
                try {
                    i.nodeValue = a;
                } catch (y) {
                    re(e, e.return, y);
                }
            }
            break;
        case 3:
            if (
                (qe(t, e),
                ct(e),
                r & 4 && n !== null && n.memoizedState.isDehydrated)
            )
                try {
                    Ti(t.containerInfo);
                } catch (y) {
                    re(e, e.return, y);
                }
            break;
        case 4:
            qe(t, e), ct(e);
            break;
        case 13:
            qe(t, e),
                ct(e),
                (i = e.child),
                i.flags & 8192 &&
                    ((a = i.memoizedState !== null),
                    (i.stateNode.isHidden = a),
                    !a ||
                        (i.alternate !== null &&
                            i.alternate.memoizedState !== null) ||
                        (Cc = ie())),
                r & 4 && fd(e);
            break;
        case 22:
            if (
                ((f = n !== null && n.memoizedState !== null),
                e.mode & 1
                    ? ((we = (u = we) || f), qe(t, e), (we = u))
                    : qe(t, e),
                ct(e),
                r & 8192)
            ) {
                if (
                    ((u = e.memoizedState !== null),
                    (e.stateNode.isHidden = u) && !f && e.mode & 1)
                )
                    for (j = e, f = e.child; f !== null; ) {
                        for (c = j = f; j !== null; ) {
                            switch (((d = j), (g = d.child), d.tag)) {
                                case 0:
                                case 11:
                                case 14:
                                case 15:
                                    pi(4, d, d.return);
                                    break;
                                case 1:
                                    ar(d, d.return);
                                    var w = d.stateNode;
                                    if (
                                        typeof w.componentWillUnmount ==
                                        'function'
                                    ) {
                                        (r = d), (n = d.return);
                                        try {
                                            (t = r),
                                                (w.props = t.memoizedProps),
                                                (w.state = t.memoizedState),
                                                w.componentWillUnmount();
                                        } catch (y) {
                                            re(r, n, y);
                                        }
                                    }
                                    break;
                                case 5:
                                    ar(d, d.return);
                                    break;
                                case 22:
                                    if (d.memoizedState !== null) {
                                        hd(c);
                                        continue;
                                    }
                            }
                            g !== null ? ((g.return = d), (j = g)) : hd(c);
                        }
                        f = f.sibling;
                    }
                e: for (f = null, c = e; ; ) {
                    if (c.tag === 5) {
                        if (f === null) {
                            f = c;
                            try {
                                (i = c.stateNode),
                                    u
                                        ? ((a = i.style),
                                          typeof a.setProperty == 'function'
                                              ? a.setProperty(
                                                    'display',
                                                    'none',
                                                    'important'
                                                )
                                              : (a.display = 'none'))
                                        : ((s = c.stateNode),
                                          (l = c.memoizedProps.style),
                                          (o =
                                              l != null &&
                                              l.hasOwnProperty('display')
                                                  ? l.display
                                                  : null),
                                          (s.style.display = bm('display', o)));
                            } catch (y) {
                                re(e, e.return, y);
                            }
                        }
                    } else if (c.tag === 6) {
                        if (f === null)
                            try {
                                c.stateNode.nodeValue = u
                                    ? ''
                                    : c.memoizedProps;
                            } catch (y) {
                                re(e, e.return, y);
                            }
                    } else if (
                        ((c.tag !== 22 && c.tag !== 23) ||
                            c.memoizedState === null ||
                            c === e) &&
                        c.child !== null
                    ) {
                        (c.child.return = c), (c = c.child);
                        continue;
                    }
                    if (c === e) break e;
                    for (; c.sibling === null; ) {
                        if (c.return === null || c.return === e) break e;
                        f === c && (f = null), (c = c.return);
                    }
                    f === c && (f = null),
                        (c.sibling.return = c.return),
                        (c = c.sibling);
                }
            }
            break;
        case 19:
            qe(t, e), ct(e), r & 4 && fd(e);
            break;
        case 21:
            break;
        default:
            qe(t, e), ct(e);
    }
}
function ct(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null; ) {
                    if (Kp(n)) {
                        var r = n;
                        break e;
                    }
                    n = n.return;
                }
                throw Error(C(160));
            }
            switch (r.tag) {
                case 5:
                    var i = r.stateNode;
                    r.flags & 32 && (Ei(i, ''), (r.flags &= -33));
                    var a = cd(e);
                    nu(e, a, i);
                    break;
                case 3:
                case 4:
                    var o = r.stateNode.containerInfo,
                        s = cd(e);
                    tu(e, s, o);
                    break;
                default:
                    throw Error(C(161));
            }
        } catch (l) {
            re(e, e.return, l);
        }
        e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
}
function B1(e, t, n) {
    (j = e), Jp(e);
}
function Jp(e, t, n) {
    for (var r = (e.mode & 1) !== 0; j !== null; ) {
        var i = j,
            a = i.child;
        if (i.tag === 22 && r) {
            var o = i.memoizedState !== null || xa;
            if (!o) {
                var s = i.alternate,
                    l = (s !== null && s.memoizedState !== null) || we;
                s = xa;
                var u = we;
                if (((xa = o), (we = l) && !u))
                    for (j = i; j !== null; )
                        (o = j),
                            (l = o.child),
                            o.tag === 22 && o.memoizedState !== null
                                ? md(i)
                                : l !== null
                                ? ((l.return = o), (j = l))
                                : md(i);
                for (; a !== null; ) (j = a), Jp(a), (a = a.sibling);
                (j = i), (xa = s), (we = u);
            }
            dd(e);
        } else
            i.subtreeFlags & 8772 && a !== null
                ? ((a.return = i), (j = a))
                : dd(e);
    }
}
function dd(e) {
    for (; j !== null; ) {
        var t = j;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772)
                    switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            we || Zo(5, t);
                            break;
                        case 1:
                            var r = t.stateNode;
                            if (t.flags & 4 && !we)
                                if (n === null) r.componentDidMount();
                                else {
                                    var i =
                                        t.elementType === t.type
                                            ? n.memoizedProps
                                            : Je(t.type, n.memoizedProps);
                                    r.componentDidUpdate(
                                        i,
                                        n.memoizedState,
                                        r.__reactInternalSnapshotBeforeUpdate
                                    );
                                }
                            var a = t.updateQueue;
                            a !== null && Qf(t, a, r);
                            break;
                        case 3:
                            var o = t.updateQueue;
                            if (o !== null) {
                                if (((n = null), t.child !== null))
                                    switch (t.child.tag) {
                                        case 5:
                                            n = t.child.stateNode;
                                            break;
                                        case 1:
                                            n = t.child.stateNode;
                                    }
                                Qf(t, o, n);
                            }
                            break;
                        case 5:
                            var s = t.stateNode;
                            if (n === null && t.flags & 4) {
                                n = s;
                                var l = t.memoizedProps;
                                switch (t.type) {
                                    case 'button':
                                    case 'input':
                                    case 'select':
                                    case 'textarea':
                                        l.autoFocus && n.focus();
                                        break;
                                    case 'img':
                                        l.src && (n.src = l.src);
                                }
                            }
                            break;
                        case 6:
                            break;
                        case 4:
                            break;
                        case 12:
                            break;
                        case 13:
                            if (t.memoizedState === null) {
                                var u = t.alternate;
                                if (u !== null) {
                                    var f = u.memoizedState;
                                    if (f !== null) {
                                        var c = f.dehydrated;
                                        c !== null && Ti(c);
                                    }
                                }
                            }
                            break;
                        case 19:
                        case 17:
                        case 21:
                        case 22:
                        case 23:
                        case 25:
                            break;
                        default:
                            throw Error(C(163));
                    }
                we || (t.flags & 512 && eu(t));
            } catch (d) {
                re(t, t.return, d);
            }
        }
        if (t === e) {
            j = null;
            break;
        }
        if (((n = t.sibling), n !== null)) {
            (n.return = t.return), (j = n);
            break;
        }
        j = t.return;
    }
}
function hd(e) {
    for (; j !== null; ) {
        var t = j;
        if (t === e) {
            j = null;
            break;
        }
        var n = t.sibling;
        if (n !== null) {
            (n.return = t.return), (j = n);
            break;
        }
        j = t.return;
    }
}
function md(e) {
    for (; j !== null; ) {
        var t = j;
        try {
            switch (t.tag) {
                case 0:
                case 11:
                case 15:
                    var n = t.return;
                    try {
                        Zo(4, t);
                    } catch (l) {
                        re(t, n, l);
                    }
                    break;
                case 1:
                    var r = t.stateNode;
                    if (typeof r.componentDidMount == 'function') {
                        var i = t.return;
                        try {
                            r.componentDidMount();
                        } catch (l) {
                            re(t, i, l);
                        }
                    }
                    var a = t.return;
                    try {
                        eu(t);
                    } catch (l) {
                        re(t, a, l);
                    }
                    break;
                case 5:
                    var o = t.return;
                    try {
                        eu(t);
                    } catch (l) {
                        re(t, o, l);
                    }
            }
        } catch (l) {
            re(t, t.return, l);
        }
        if (t === e) {
            j = null;
            break;
        }
        var s = t.sibling;
        if (s !== null) {
            (s.return = t.return), (j = s);
            break;
        }
        j = t.return;
    }
}
var Y1 = Math.ceil,
    So = Ft.ReactCurrentDispatcher,
    _c = Ft.ReactCurrentOwner,
    Ge = Ft.ReactCurrentBatchConfig,
    H = 0,
    ce = null,
    ae = null,
    me = 0,
    Me = 0,
    or = cn(0),
    le = 0,
    Di = null,
    Tn = 0,
    es = 0,
    Ec = 0,
    gi = null,
    Ne = null,
    Cc = 0,
    Cr = 1 / 0,
    bt = null,
    bo = !1,
    ru = null,
    qt = null,
    ka = !1,
    Bt = null,
    _o = 0,
    yi = 0,
    iu = null,
    Wa = -1,
    Va = 0;
function Se() {
    return H & 6 ? ie() : Wa !== -1 ? Wa : (Wa = ie());
}
function Jt(e) {
    return e.mode & 1
        ? H & 2 && me !== 0
            ? me & -me
            : T1.transition !== null
            ? (Va === 0 && (Va = Fm()), Va)
            : ((e = V),
              e !== 0 ||
                  ((e = window.event), (e = e === void 0 ? 16 : Wm(e.type))),
              e)
        : 1;
}
function at(e, t, n, r) {
    if (50 < yi) throw ((yi = 0), (iu = null), Error(C(185)));
    Xi(e, n, r),
        (!(H & 2) || e !== ce) &&
            (e === ce && (!(H & 2) && (es |= n), le === 4 && Wt(e, me)),
            Ie(e, r),
            n === 1 &&
                H === 0 &&
                !(t.mode & 1) &&
                ((Cr = ie() + 500), Qo && fn()));
}
function Ie(e, t) {
    var n = e.callbackNode;
    Tv(e, t);
    var r = oo(e, e === ce ? me : 0);
    if (r === 0)
        n !== null && bf(n), (e.callbackNode = null), (e.callbackPriority = 0);
    else if (((t = r & -r), e.callbackPriority !== t)) {
        if ((n != null && bf(n), t === 1))
            e.tag === 0 ? A1(pd.bind(null, e)) : lp(pd.bind(null, e)),
                _1(function () {
                    !(H & 6) && fn();
                }),
                (n = null);
        else {
            switch ($m(r)) {
                case 1:
                    n = Ju;
                    break;
                case 4:
                    n = zm;
                    break;
                case 16:
                    n = ao;
                    break;
                case 536870912:
                    n = Lm;
                    break;
                default:
                    n = ao;
            }
            n = og(n, Zp.bind(null, e));
        }
        (e.callbackPriority = t), (e.callbackNode = n);
    }
}
function Zp(e, t) {
    if (((Wa = -1), (Va = 0), H & 6)) throw Error(C(327));
    var n = e.callbackNode;
    if (yr() && e.callbackNode !== n) return null;
    var r = oo(e, e === ce ? me : 0);
    if (r === 0) return null;
    if (r & 30 || r & e.expiredLanes || t) t = Eo(e, r);
    else {
        t = r;
        var i = H;
        H |= 2;
        var a = tg();
        (ce !== e || me !== t) && ((bt = null), (Cr = ie() + 500), bn(e, t));
        do
            try {
                K1();
                break;
            } catch (s) {
                eg(e, s);
            }
        while (!0);
        fc(),
            (So.current = a),
            (H = i),
            ae !== null ? (t = 0) : ((ce = null), (me = 0), (t = le));
    }
    if (t !== 0) {
        if (
            (t === 2 && ((i = jl(e)), i !== 0 && ((r = i), (t = au(e, i)))),
            t === 1)
        )
            throw ((n = Di), bn(e, 0), Wt(e, r), Ie(e, ie()), n);
        if (t === 6) Wt(e, r);
        else {
            if (
                ((i = e.current.alternate),
                !(r & 30) &&
                    !G1(i) &&
                    ((t = Eo(e, r)),
                    t === 2 &&
                        ((a = jl(e)), a !== 0 && ((r = a), (t = au(e, a)))),
                    t === 1))
            )
                throw ((n = Di), bn(e, 0), Wt(e, r), Ie(e, ie()), n);
            switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
                case 0:
                case 1:
                    throw Error(C(345));
                case 2:
                    hn(e, Ne, bt);
                    break;
                case 3:
                    if (
                        (Wt(e, r),
                        (r & 130023424) === r &&
                            ((t = Cc + 500 - ie()), 10 < t))
                    ) {
                        if (oo(e, 0) !== 0) break;
                        if (((i = e.suspendedLanes), (i & r) !== r)) {
                            Se(), (e.pingedLanes |= e.suspendedLanes & i);
                            break;
                        }
                        e.timeoutHandle = Ol(hn.bind(null, e, Ne, bt), t);
                        break;
                    }
                    hn(e, Ne, bt);
                    break;
                case 4:
                    if ((Wt(e, r), (r & 4194240) === r)) break;
                    for (t = e.eventTimes, i = -1; 0 < r; ) {
                        var o = 31 - it(r);
                        (a = 1 << o), (o = t[o]), o > i && (i = o), (r &= ~a);
                    }
                    if (
                        ((r = i),
                        (r = ie() - r),
                        (r =
                            (120 > r
                                ? 120
                                : 480 > r
                                ? 480
                                : 1080 > r
                                ? 1080
                                : 1920 > r
                                ? 1920
                                : 3e3 > r
                                ? 3e3
                                : 4320 > r
                                ? 4320
                                : 1960 * Y1(r / 1960)) - r),
                        10 < r)
                    ) {
                        e.timeoutHandle = Ol(hn.bind(null, e, Ne, bt), r);
                        break;
                    }
                    hn(e, Ne, bt);
                    break;
                case 5:
                    hn(e, Ne, bt);
                    break;
                default:
                    throw Error(C(329));
            }
        }
    }
    return Ie(e, ie()), e.callbackNode === n ? Zp.bind(null, e) : null;
}
function au(e, t) {
    var n = gi;
    return (
        e.current.memoizedState.isDehydrated && (bn(e, t).flags |= 256),
        (e = Eo(e, t)),
        e !== 2 && ((t = Ne), (Ne = n), t !== null && ou(t)),
        e
    );
}
function ou(e) {
    Ne === null ? (Ne = e) : Ne.push.apply(Ne, e);
}
function G1(e) {
    for (var t = e; ; ) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && ((n = n.stores), n !== null))
                for (var r = 0; r < n.length; r++) {
                    var i = n[r],
                        a = i.getSnapshot;
                    i = i.value;
                    try {
                        if (!ot(a(), i)) return !1;
                    } catch {
                        return !1;
                    }
                }
        }
        if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
            (n.return = t), (t = n);
        else {
            if (t === e) break;
            for (; t.sibling === null; ) {
                if (t.return === null || t.return === e) return !0;
                t = t.return;
            }
            (t.sibling.return = t.return), (t = t.sibling);
        }
    }
    return !0;
}
function Wt(e, t) {
    for (
        t &= ~Ec,
            t &= ~es,
            e.suspendedLanes |= t,
            e.pingedLanes &= ~t,
            e = e.expirationTimes;
        0 < t;

    ) {
        var n = 31 - it(t),
            r = 1 << n;
        (e[n] = -1), (t &= ~r);
    }
}
function pd(e) {
    if (H & 6) throw Error(C(327));
    yr();
    var t = oo(e, 0);
    if (!(t & 1)) return Ie(e, ie()), null;
    var n = Eo(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = jl(e);
        r !== 0 && ((t = r), (n = au(e, r)));
    }
    if (n === 1) throw ((n = Di), bn(e, 0), Wt(e, t), Ie(e, ie()), n);
    if (n === 6) throw Error(C(345));
    return (
        (e.finishedWork = e.current.alternate),
        (e.finishedLanes = t),
        hn(e, Ne, bt),
        Ie(e, ie()),
        null
    );
}
function Nc(e, t) {
    var n = H;
    H |= 1;
    try {
        return e(t);
    } finally {
        (H = n), H === 0 && ((Cr = ie() + 500), Qo && fn());
    }
}
function Pn(e) {
    Bt !== null && Bt.tag === 0 && !(H & 6) && yr();
    var t = H;
    H |= 1;
    var n = Ge.transition,
        r = V;
    try {
        if (((Ge.transition = null), (V = 1), e)) return e();
    } finally {
        (V = r), (Ge.transition = n), (H = t), !(H & 6) && fn();
    }
}
function Ac() {
    (Me = or.current), K(or);
}
function bn(e, t) {
    (e.finishedWork = null), (e.finishedLanes = 0);
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), b1(n)), ae !== null))
        for (n = ae.return; n !== null; ) {
            var r = n;
            switch ((lc(r), r.tag)) {
                case 1:
                    (r = r.type.childContextTypes), r != null && fo();
                    break;
                case 3:
                    _r(), K(Pe), K(xe), yc();
                    break;
                case 5:
                    gc(r);
                    break;
                case 4:
                    _r();
                    break;
                case 13:
                    K(ee);
                    break;
                case 19:
                    K(ee);
                    break;
                case 10:
                    dc(r.type._context);
                    break;
                case 22:
                case 23:
                    Ac();
            }
            n = n.return;
        }
    if (
        ((ce = e),
        (ae = e = Zt(e.current, null)),
        (me = Me = t),
        (le = 0),
        (Di = null),
        (Ec = es = Tn = 0),
        (Ne = gi = null),
        yn !== null)
    ) {
        for (t = 0; t < yn.length; t++)
            if (((n = yn[t]), (r = n.interleaved), r !== null)) {
                n.interleaved = null;
                var i = r.next,
                    a = n.pending;
                if (a !== null) {
                    var o = a.next;
                    (a.next = i), (r.next = o);
                }
                n.pending = r;
            }
        yn = null;
    }
    return e;
}
function eg(e, t) {
    do {
        var n = ae;
        try {
            if ((fc(), (Da.current = ko), xo)) {
                for (var r = te.memoizedState; r !== null; ) {
                    var i = r.queue;
                    i !== null && (i.pending = null), (r = r.next);
                }
                xo = !1;
            }
            if (
                ((An = 0),
                (ue = se = te = null),
                (mi = !1),
                ($i = 0),
                (_c.current = null),
                n === null || n.return === null)
            ) {
                (le = 1), (Di = t), (ae = null);
                break;
            }
            e: {
                var a = e,
                    o = n.return,
                    s = n,
                    l = t;
                if (
                    ((t = me),
                    (s.flags |= 32768),
                    l !== null &&
                        typeof l == 'object' &&
                        typeof l.then == 'function')
                ) {
                    var u = l,
                        f = s,
                        c = f.tag;
                    if (!(f.mode & 1) && (c === 0 || c === 11 || c === 15)) {
                        var d = f.alternate;
                        d
                            ? ((f.updateQueue = d.updateQueue),
                              (f.memoizedState = d.memoizedState),
                              (f.lanes = d.lanes))
                            : ((f.updateQueue = null),
                              (f.memoizedState = null));
                    }
                    var g = nd(o);
                    if (g !== null) {
                        (g.flags &= -257),
                            rd(g, o, s, a, t),
                            g.mode & 1 && td(a, u, t),
                            (t = g),
                            (l = u);
                        var w = t.updateQueue;
                        if (w === null) {
                            var y = new Set();
                            y.add(l), (t.updateQueue = y);
                        } else w.add(l);
                        break e;
                    } else {
                        if (!(t & 1)) {
                            td(a, u, t), Tc();
                            break e;
                        }
                        l = Error(C(426));
                    }
                } else if (J && s.mode & 1) {
                    var b = nd(o);
                    if (b !== null) {
                        !(b.flags & 65536) && (b.flags |= 256),
                            rd(b, o, s, a, t),
                            uc(Er(l, s));
                        break e;
                    }
                }
                (a = l = Er(l, s)),
                    le !== 4 && (le = 2),
                    gi === null ? (gi = [a]) : gi.push(a),
                    (a = o);
                do {
                    switch (a.tag) {
                        case 3:
                            (a.flags |= 65536), (t &= -t), (a.lanes |= t);
                            var m = $p(a, l, t);
                            Kf(a, m);
                            break e;
                        case 1:
                            s = l;
                            var h = a.type,
                                p = a.stateNode;
                            if (
                                !(a.flags & 128) &&
                                (typeof h.getDerivedStateFromError ==
                                    'function' ||
                                    (p !== null &&
                                        typeof p.componentDidCatch ==
                                            'function' &&
                                        (qt === null || !qt.has(p))))
                            ) {
                                (a.flags |= 65536), (t &= -t), (a.lanes |= t);
                                var v = Rp(a, s, t);
                                Kf(a, v);
                                break e;
                            }
                    }
                    a = a.return;
                } while (a !== null);
            }
            rg(n);
        } catch (S) {
            (t = S), ae === n && n !== null && (ae = n = n.return);
            continue;
        }
        break;
    } while (!0);
}
function tg() {
    var e = So.current;
    return (So.current = ko), e === null ? ko : e;
}
function Tc() {
    (le === 0 || le === 3 || le === 2) && (le = 4),
        ce === null || (!(Tn & 268435455) && !(es & 268435455)) || Wt(ce, me);
}
function Eo(e, t) {
    var n = H;
    H |= 2;
    var r = tg();
    (ce !== e || me !== t) && ((bt = null), bn(e, t));
    do
        try {
            X1();
            break;
        } catch (i) {
            eg(e, i);
        }
    while (!0);
    if ((fc(), (H = n), (So.current = r), ae !== null)) throw Error(C(261));
    return (ce = null), (me = 0), le;
}
function X1() {
    for (; ae !== null; ) ng(ae);
}
function K1() {
    for (; ae !== null && !xv(); ) ng(ae);
}
function ng(e) {
    var t = ag(e.alternate, e, Me);
    (e.memoizedProps = e.pendingProps),
        t === null ? rg(e) : (ae = t),
        (_c.current = null);
}
function rg(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (((e = t.return), t.flags & 32768)) {
            if (((n = H1(n, t)), n !== null)) {
                (n.flags &= 32767), (ae = n);
                return;
            }
            if (e !== null)
                (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
            else {
                (le = 6), (ae = null);
                return;
            }
        } else if (((n = U1(n, t, Me)), n !== null)) {
            ae = n;
            return;
        }
        if (((t = t.sibling), t !== null)) {
            ae = t;
            return;
        }
        ae = t = e;
    } while (t !== null);
    le === 0 && (le = 5);
}
function hn(e, t, n) {
    var r = V,
        i = Ge.transition;
    try {
        (Ge.transition = null), (V = 1), Q1(e, t, n, r);
    } finally {
        (Ge.transition = i), (V = r);
    }
    return null;
}
function Q1(e, t, n, r) {
    do yr();
    while (Bt !== null);
    if (H & 6) throw Error(C(327));
    n = e.finishedWork;
    var i = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
        throw Error(C(177));
    (e.callbackNode = null), (e.callbackPriority = 0);
    var a = n.lanes | n.childLanes;
    if (
        (Pv(e, a),
        e === ce && ((ae = ce = null), (me = 0)),
        (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
            ka ||
            ((ka = !0),
            og(ao, function () {
                return yr(), null;
            })),
        (a = (n.flags & 15990) !== 0),
        n.subtreeFlags & 15990 || a)
    ) {
        (a = Ge.transition), (Ge.transition = null);
        var o = V;
        V = 1;
        var s = H;
        (H |= 4),
            (_c.current = null),
            V1(e, n),
            qp(n, e),
            g1($l),
            (so = !!Fl),
            ($l = Fl = null),
            (e.current = n),
            B1(n),
            kv(),
            (H = s),
            (V = o),
            (Ge.transition = a);
    } else e.current = n;
    if (
        (ka && ((ka = !1), (Bt = e), (_o = i)),
        (a = e.pendingLanes),
        a === 0 && (qt = null),
        _v(n.stateNode),
        Ie(e, ie()),
        t !== null)
    )
        for (r = e.onRecoverableError, n = 0; n < t.length; n++)
            (i = t[n]),
                r(i.value, { componentStack: i.stack, digest: i.digest });
    if (bo) throw ((bo = !1), (e = ru), (ru = null), e);
    return (
        _o & 1 && e.tag !== 0 && yr(),
        (a = e.pendingLanes),
        a & 1 ? (e === iu ? yi++ : ((yi = 0), (iu = e))) : (yi = 0),
        fn(),
        null
    );
}
function yr() {
    if (Bt !== null) {
        var e = $m(_o),
            t = Ge.transition,
            n = V;
        try {
            if (((Ge.transition = null), (V = 16 > e ? 16 : e), Bt === null))
                var r = !1;
            else {
                if (((e = Bt), (Bt = null), (_o = 0), H & 6))
                    throw Error(C(331));
                var i = H;
                for (H |= 4, j = e.current; j !== null; ) {
                    var a = j,
                        o = a.child;
                    if (j.flags & 16) {
                        var s = a.deletions;
                        if (s !== null) {
                            for (var l = 0; l < s.length; l++) {
                                var u = s[l];
                                for (j = u; j !== null; ) {
                                    var f = j;
                                    switch (f.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            pi(8, f, a);
                                    }
                                    var c = f.child;
                                    if (c !== null) (c.return = f), (j = c);
                                    else
                                        for (; j !== null; ) {
                                            f = j;
                                            var d = f.sibling,
                                                g = f.return;
                                            if ((Xp(f), f === u)) {
                                                j = null;
                                                break;
                                            }
                                            if (d !== null) {
                                                (d.return = g), (j = d);
                                                break;
                                            }
                                            j = g;
                                        }
                                }
                            }
                            var w = a.alternate;
                            if (w !== null) {
                                var y = w.child;
                                if (y !== null) {
                                    w.child = null;
                                    do {
                                        var b = y.sibling;
                                        (y.sibling = null), (y = b);
                                    } while (y !== null);
                                }
                            }
                            j = a;
                        }
                    }
                    if (a.subtreeFlags & 2064 && o !== null)
                        (o.return = a), (j = o);
                    else
                        e: for (; j !== null; ) {
                            if (((a = j), a.flags & 2048))
                                switch (a.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        pi(9, a, a.return);
                                }
                            var m = a.sibling;
                            if (m !== null) {
                                (m.return = a.return), (j = m);
                                break e;
                            }
                            j = a.return;
                        }
                }
                var h = e.current;
                for (j = h; j !== null; ) {
                    o = j;
                    var p = o.child;
                    if (o.subtreeFlags & 2064 && p !== null)
                        (p.return = o), (j = p);
                    else
                        e: for (o = h; j !== null; ) {
                            if (((s = j), s.flags & 2048))
                                try {
                                    switch (s.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            Zo(9, s);
                                    }
                                } catch (S) {
                                    re(s, s.return, S);
                                }
                            if (s === o) {
                                j = null;
                                break e;
                            }
                            var v = s.sibling;
                            if (v !== null) {
                                (v.return = s.return), (j = v);
                                break e;
                            }
                            j = s.return;
                        }
                }
                if (
                    ((H = i),
                    fn(),
                    mt && typeof mt.onPostCommitFiberRoot == 'function')
                )
                    try {
                        mt.onPostCommitFiberRoot(Bo, e);
                    } catch {}
                r = !0;
            }
            return r;
        } finally {
            (V = n), (Ge.transition = t);
        }
    }
    return !1;
}
function gd(e, t, n) {
    (t = Er(n, t)),
        (t = $p(e, t, 1)),
        (e = Qt(e, t, 1)),
        (t = Se()),
        e !== null && (Xi(e, 1, t), Ie(e, t));
}
function re(e, t, n) {
    if (e.tag === 3) gd(e, e, n);
    else
        for (; t !== null; ) {
            if (t.tag === 3) {
                gd(t, e, n);
                break;
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (
                    typeof t.type.getDerivedStateFromError == 'function' ||
                    (typeof r.componentDidCatch == 'function' &&
                        (qt === null || !qt.has(r)))
                ) {
                    (e = Er(n, e)),
                        (e = Rp(t, e, 1)),
                        (t = Qt(t, e, 1)),
                        (e = Se()),
                        t !== null && (Xi(t, 1, e), Ie(t, e));
                    break;
                }
            }
            t = t.return;
        }
}
function q1(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t),
        (t = Se()),
        (e.pingedLanes |= e.suspendedLanes & n),
        ce === e &&
            (me & n) === n &&
            (le === 4 ||
            (le === 3 && (me & 130023424) === me && 500 > ie() - Cc)
                ? bn(e, 0)
                : (Ec |= n)),
        Ie(e, t);
}
function ig(e, t) {
    t === 0 &&
        (e.mode & 1
            ? ((t = fa), (fa <<= 1), !(fa & 130023424) && (fa = 4194304))
            : (t = 1));
    var n = Se();
    (e = Pt(e, t)), e !== null && (Xi(e, t, n), Ie(e, n));
}
function J1(e) {
    var t = e.memoizedState,
        n = 0;
    t !== null && (n = t.retryLane), ig(e, n);
}
function Z1(e, t) {
    var n = 0;
    switch (e.tag) {
        case 13:
            var r = e.stateNode,
                i = e.memoizedState;
            i !== null && (n = i.retryLane);
            break;
        case 19:
            r = e.stateNode;
            break;
        default:
            throw Error(C(314));
    }
    r !== null && r.delete(t), ig(e, n);
}
var ag;
ag = function (e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || Pe.current) Ae = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128))
                return (Ae = !1), D1(e, t, n);
            Ae = !!(e.flags & 131072);
        }
    else (Ae = !1), J && t.flags & 1048576 && up(t, po, t.index);
    switch (((t.lanes = 0), t.tag)) {
        case 2:
            var r = t.type;
            Ha(e, t), (e = t.pendingProps);
            var i = kr(t, xe.current);
            gr(t, n), (i = wc(null, t, r, e, i, n));
            var a = xc();
            return (
                (t.flags |= 1),
                typeof i == 'object' &&
                i !== null &&
                typeof i.render == 'function' &&
                i.$$typeof === void 0
                    ? ((t.tag = 1),
                      (t.memoizedState = null),
                      (t.updateQueue = null),
                      je(r) ? ((a = !0), ho(t)) : (a = !1),
                      (t.memoizedState =
                          i.state !== null && i.state !== void 0
                              ? i.state
                              : null),
                      mc(t),
                      (i.updater = Jo),
                      (t.stateNode = i),
                      (i._reactInternals = t),
                      Yl(t, r, e, n),
                      (t = Kl(null, t, r, !0, a, n)))
                    : ((t.tag = 0),
                      J && a && sc(t),
                      ke(null, t, i, n),
                      (t = t.child)),
                t
            );
        case 16:
            r = t.elementType;
            e: {
                switch (
                    (Ha(e, t),
                    (e = t.pendingProps),
                    (i = r._init),
                    (r = i(r._payload)),
                    (t.type = r),
                    (i = t.tag = tw(r)),
                    (e = Je(r, e)),
                    i)
                ) {
                    case 0:
                        t = Xl(null, t, r, e, n);
                        break e;
                    case 1:
                        t = od(null, t, r, e, n);
                        break e;
                    case 11:
                        t = id(null, t, r, e, n);
                        break e;
                    case 14:
                        t = ad(null, t, r, Je(r.type, e), n);
                        break e;
                }
                throw Error(C(306, r, ''));
            }
            return t;
        case 0:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : Je(r, i)),
                Xl(e, t, r, i, n)
            );
        case 1:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : Je(r, i)),
                od(e, t, r, i, n)
            );
        case 3:
            e: {
                if ((Hp(t), e === null)) throw Error(C(387));
                (r = t.pendingProps),
                    (a = t.memoizedState),
                    (i = a.element),
                    pp(e, t),
                    vo(t, r, null, n);
                var o = t.memoizedState;
                if (((r = o.element), a.isDehydrated))
                    if (
                        ((a = {
                            element: r,
                            isDehydrated: !1,
                            cache: o.cache,
                            pendingSuspenseBoundaries:
                                o.pendingSuspenseBoundaries,
                            transitions: o.transitions
                        }),
                        (t.updateQueue.baseState = a),
                        (t.memoizedState = a),
                        t.flags & 256)
                    ) {
                        (i = Er(Error(C(423)), t)), (t = sd(e, t, r, n, i));
                        break e;
                    } else if (r !== i) {
                        (i = Er(Error(C(424)), t)), (t = sd(e, t, r, n, i));
                        break e;
                    } else
                        for (
                            ze = Kt(t.stateNode.containerInfo.firstChild),
                                Le = t,
                                J = !0,
                                et = null,
                                n = hp(t, null, r, n),
                                t.child = n;
                            n;

                        )
                            (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
                else {
                    if ((Sr(), r === i)) {
                        t = jt(e, t, n);
                        break e;
                    }
                    ke(e, t, r, n);
                }
                t = t.child;
            }
            return t;
        case 5:
            return (
                gp(t),
                e === null && Wl(t),
                (r = t.type),
                (i = t.pendingProps),
                (a = e !== null ? e.memoizedProps : null),
                (o = i.children),
                Rl(r, i)
                    ? (o = null)
                    : a !== null && Rl(r, a) && (t.flags |= 32),
                Up(e, t),
                ke(e, t, o, n),
                t.child
            );
        case 6:
            return e === null && Wl(t), null;
        case 13:
            return Wp(e, t, n);
        case 4:
            return (
                pc(t, t.stateNode.containerInfo),
                (r = t.pendingProps),
                e === null ? (t.child = br(t, null, r, n)) : ke(e, t, r, n),
                t.child
            );
        case 11:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : Je(r, i)),
                id(e, t, r, i, n)
            );
        case 7:
            return ke(e, t, t.pendingProps, n), t.child;
        case 8:
            return ke(e, t, t.pendingProps.children, n), t.child;
        case 12:
            return ke(e, t, t.pendingProps.children, n), t.child;
        case 10:
            e: {
                if (
                    ((r = t.type._context),
                    (i = t.pendingProps),
                    (a = t.memoizedProps),
                    (o = i.value),
                    G(go, r._currentValue),
                    (r._currentValue = o),
                    a !== null)
                )
                    if (ot(a.value, o)) {
                        if (a.children === i.children && !Pe.current) {
                            t = jt(e, t, n);
                            break e;
                        }
                    } else
                        for (
                            a = t.child, a !== null && (a.return = t);
                            a !== null;

                        ) {
                            var s = a.dependencies;
                            if (s !== null) {
                                o = a.child;
                                for (var l = s.firstContext; l !== null; ) {
                                    if (l.context === r) {
                                        if (a.tag === 1) {
                                            (l = Nt(-1, n & -n)), (l.tag = 2);
                                            var u = a.updateQueue;
                                            if (u !== null) {
                                                u = u.shared;
                                                var f = u.pending;
                                                f === null
                                                    ? (l.next = l)
                                                    : ((l.next = f.next),
                                                      (f.next = l)),
                                                    (u.pending = l);
                                            }
                                        }
                                        (a.lanes |= n),
                                            (l = a.alternate),
                                            l !== null && (l.lanes |= n),
                                            Vl(a.return, n, t),
                                            (s.lanes |= n);
                                        break;
                                    }
                                    l = l.next;
                                }
                            } else if (a.tag === 10)
                                o = a.type === t.type ? null : a.child;
                            else if (a.tag === 18) {
                                if (((o = a.return), o === null))
                                    throw Error(C(341));
                                (o.lanes |= n),
                                    (s = o.alternate),
                                    s !== null && (s.lanes |= n),
                                    Vl(o, n, t),
                                    (o = a.sibling);
                            } else o = a.child;
                            if (o !== null) o.return = a;
                            else
                                for (o = a; o !== null; ) {
                                    if (o === t) {
                                        o = null;
                                        break;
                                    }
                                    if (((a = o.sibling), a !== null)) {
                                        (a.return = o.return), (o = a);
                                        break;
                                    }
                                    o = o.return;
                                }
                            a = o;
                        }
                ke(e, t, i.children, n), (t = t.child);
            }
            return t;
        case 9:
            return (
                (i = t.type),
                (r = t.pendingProps.children),
                gr(t, n),
                (i = Xe(i)),
                (r = r(i)),
                (t.flags |= 1),
                ke(e, t, r, n),
                t.child
            );
        case 14:
            return (
                (r = t.type),
                (i = Je(r, t.pendingProps)),
                (i = Je(r.type, i)),
                ad(e, t, r, i, n)
            );
        case 15:
            return Op(e, t, t.type, t.pendingProps, n);
        case 17:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : Je(r, i)),
                Ha(e, t),
                (t.tag = 1),
                je(r) ? ((e = !0), ho(t)) : (e = !1),
                gr(t, n),
                Fp(t, r, i),
                Yl(t, r, i, n),
                Kl(null, t, r, !0, e, n)
            );
        case 19:
            return Vp(e, t, n);
        case 22:
            return Dp(e, t, n);
    }
    throw Error(C(156, t.tag));
};
function og(e, t) {
    return Mm(e, t);
}
function ew(e, t, n, r) {
    (this.tag = e),
        (this.key = n),
        (this.sibling =
            this.child =
            this.return =
            this.stateNode =
            this.type =
            this.elementType =
                null),
        (this.index = 0),
        (this.ref = null),
        (this.pendingProps = t),
        (this.dependencies =
            this.memoizedState =
            this.updateQueue =
            this.memoizedProps =
                null),
        (this.mode = r),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null);
}
function Ye(e, t, n, r) {
    return new ew(e, t, n, r);
}
function Pc(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
}
function tw(e) {
    if (typeof e == 'function') return Pc(e) ? 1 : 0;
    if (e != null) {
        if (((e = e.$$typeof), e === Ku)) return 11;
        if (e === Qu) return 14;
    }
    return 2;
}
function Zt(e, t) {
    var n = e.alternate;
    return (
        n === null
            ? ((n = Ye(e.tag, t, e.key, e.mode)),
              (n.elementType = e.elementType),
              (n.type = e.type),
              (n.stateNode = e.stateNode),
              (n.alternate = e),
              (e.alternate = n))
            : ((n.pendingProps = t),
              (n.type = e.type),
              (n.flags = 0),
              (n.subtreeFlags = 0),
              (n.deletions = null)),
        (n.flags = e.flags & 14680064),
        (n.childLanes = e.childLanes),
        (n.lanes = e.lanes),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (t = e.dependencies),
        (n.dependencies =
            t === null
                ? null
                : { lanes: t.lanes, firstContext: t.firstContext }),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        n
    );
}
function Ba(e, t, n, r, i, a) {
    var o = 2;
    if (((r = e), typeof e == 'function')) Pc(e) && (o = 1);
    else if (typeof e == 'string') o = 5;
    else
        e: switch (e) {
            case Qn:
                return _n(n.children, i, a, t);
            case Xu:
                (o = 8), (i |= 8);
                break;
            case gl:
                return (
                    (e = Ye(12, n, t, i | 2)),
                    (e.elementType = gl),
                    (e.lanes = a),
                    e
                );
            case yl:
                return (
                    (e = Ye(13, n, t, i)),
                    (e.elementType = yl),
                    (e.lanes = a),
                    e
                );
            case vl:
                return (
                    (e = Ye(19, n, t, i)),
                    (e.elementType = vl),
                    (e.lanes = a),
                    e
                );
            case gm:
                return ts(n, i, a, t);
            default:
                if (typeof e == 'object' && e !== null)
                    switch (e.$$typeof) {
                        case mm:
                            o = 10;
                            break e;
                        case pm:
                            o = 9;
                            break e;
                        case Ku:
                            o = 11;
                            break e;
                        case Qu:
                            o = 14;
                            break e;
                        case Dt:
                            (o = 16), (r = null);
                            break e;
                    }
                throw Error(C(130, e == null ? e : typeof e, ''));
        }
    return (
        (t = Ye(o, n, t, i)),
        (t.elementType = e),
        (t.type = r),
        (t.lanes = a),
        t
    );
}
function _n(e, t, n, r) {
    return (e = Ye(7, e, r, t)), (e.lanes = n), e;
}
function ts(e, t, n, r) {
    return (
        (e = Ye(22, e, r, t)),
        (e.elementType = gm),
        (e.lanes = n),
        (e.stateNode = { isHidden: !1 }),
        e
    );
}
function Hs(e, t, n) {
    return (e = Ye(6, e, null, t)), (e.lanes = n), e;
}
function Ws(e, t, n) {
    return (
        (t = Ye(4, e.children !== null ? e.children : [], e.key, t)),
        (t.lanes = n),
        (t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation
        }),
        t
    );
}
function nw(e, t, n, r, i) {
    (this.tag = t),
        (this.containerInfo = e),
        (this.finishedWork =
            this.pingCache =
            this.current =
            this.pendingChildren =
                null),
        (this.timeoutHandle = -1),
        (this.callbackNode = this.pendingContext = this.context = null),
        (this.callbackPriority = 0),
        (this.eventTimes = bs(0)),
        (this.expirationTimes = bs(-1)),
        (this.entangledLanes =
            this.finishedLanes =
            this.mutableReadLanes =
            this.expiredLanes =
            this.pingedLanes =
            this.suspendedLanes =
            this.pendingLanes =
                0),
        (this.entanglements = bs(0)),
        (this.identifierPrefix = r),
        (this.onRecoverableError = i),
        (this.mutableSourceEagerHydrationData = null);
}
function jc(e, t, n, r, i, a, o, s, l) {
    return (
        (e = new nw(e, t, n, s, l)),
        t === 1 ? ((t = 1), a === !0 && (t |= 8)) : (t = 0),
        (a = Ye(3, null, null, t)),
        (e.current = a),
        (a.stateNode = e),
        (a.memoizedState = {
            element: r,
            isDehydrated: n,
            cache: null,
            transitions: null,
            pendingSuspenseBoundaries: null
        }),
        mc(a),
        e
    );
}
function rw(e, t, n) {
    var r =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: Kn,
        key: r == null ? null : '' + r,
        children: e,
        containerInfo: t,
        implementation: n
    };
}
function sg(e) {
    if (!e) return tn;
    e = e._reactInternals;
    e: {
        if (On(e) !== e || e.tag !== 1) throw Error(C(170));
        var t = e;
        do {
            switch (t.tag) {
                case 3:
                    t = t.stateNode.context;
                    break e;
                case 1:
                    if (je(t.type)) {
                        t =
                            t.stateNode
                                .__reactInternalMemoizedMergedChildContext;
                        break e;
                    }
            }
            t = t.return;
        } while (t !== null);
        throw Error(C(171));
    }
    if (e.tag === 1) {
        var n = e.type;
        if (je(n)) return sp(e, n, t);
    }
    return t;
}
function lg(e, t, n, r, i, a, o, s, l) {
    return (
        (e = jc(n, r, !0, e, i, a, o, s, l)),
        (e.context = sg(null)),
        (n = e.current),
        (r = Se()),
        (i = Jt(n)),
        (a = Nt(r, i)),
        (a.callback = t ?? null),
        Qt(n, a, i),
        (e.current.lanes = i),
        Xi(e, i, r),
        Ie(e, r),
        e
    );
}
function ns(e, t, n, r) {
    var i = t.current,
        a = Se(),
        o = Jt(i);
    return (
        (n = sg(n)),
        t.context === null ? (t.context = n) : (t.pendingContext = n),
        (t = Nt(a, o)),
        (t.payload = { element: e }),
        (r = r === void 0 ? null : r),
        r !== null && (t.callback = r),
        (e = Qt(i, t, o)),
        e !== null && (at(e, i, o, a), Oa(e, i, o)),
        o
    );
}
function Co(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
        case 5:
            return e.child.stateNode;
        default:
            return e.child.stateNode;
    }
}
function yd(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
    }
}
function Ic(e, t) {
    yd(e, t), (e = e.alternate) && yd(e, t);
}
function iw() {
    return null;
}
var ug =
    typeof reportError == 'function'
        ? reportError
        : function (e) {
              console.error(e);
          };
function Mc(e) {
    this._internalRoot = e;
}
rs.prototype.render = Mc.prototype.render = function (e) {
    var t = this._internalRoot;
    if (t === null) throw Error(C(409));
    ns(e, t, null, null);
};
rs.prototype.unmount = Mc.prototype.unmount = function () {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Pn(function () {
            ns(null, e, null, null);
        }),
            (t[Tt] = null);
    }
};
function rs(e) {
    this._internalRoot = e;
}
rs.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
        var t = Dm();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < Ht.length && t !== 0 && t < Ht[n].priority; n++);
        Ht.splice(n, 0, e), n === 0 && Hm(e);
    }
};
function zc(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function is(e) {
    return !(
        !e ||
        (e.nodeType !== 1 &&
            e.nodeType !== 9 &&
            e.nodeType !== 11 &&
            (e.nodeType !== 8 ||
                e.nodeValue !== ' react-mount-point-unstable '))
    );
}
function vd() {}
function aw(e, t, n, r, i) {
    if (i) {
        if (typeof r == 'function') {
            var a = r;
            r = function () {
                var u = Co(o);
                a.call(u);
            };
        }
        var o = lg(t, r, e, 0, null, !1, !1, '', vd);
        return (
            (e._reactRootContainer = o),
            (e[Tt] = o.current),
            Ii(e.nodeType === 8 ? e.parentNode : e),
            Pn(),
            o
        );
    }
    for (; (i = e.lastChild); ) e.removeChild(i);
    if (typeof r == 'function') {
        var s = r;
        r = function () {
            var u = Co(l);
            s.call(u);
        };
    }
    var l = jc(e, 0, !1, null, null, !1, !1, '', vd);
    return (
        (e._reactRootContainer = l),
        (e[Tt] = l.current),
        Ii(e.nodeType === 8 ? e.parentNode : e),
        Pn(function () {
            ns(t, l, n, r);
        }),
        l
    );
}
function as(e, t, n, r, i) {
    var a = n._reactRootContainer;
    if (a) {
        var o = a;
        if (typeof i == 'function') {
            var s = i;
            i = function () {
                var l = Co(o);
                s.call(l);
            };
        }
        ns(t, o, e, i);
    } else o = aw(n, t, e, i, r);
    return Co(o);
}
Rm = function (e) {
    switch (e.tag) {
        case 3:
            var t = e.stateNode;
            if (t.current.memoizedState.isDehydrated) {
                var n = ei(t.pendingLanes);
                n !== 0 &&
                    (Zu(t, n | 1),
                    Ie(t, ie()),
                    !(H & 6) && ((Cr = ie() + 500), fn()));
            }
            break;
        case 13:
            Pn(function () {
                var r = Pt(e, 1);
                if (r !== null) {
                    var i = Se();
                    at(r, e, 1, i);
                }
            }),
                Ic(e, 1);
    }
};
ec = function (e) {
    if (e.tag === 13) {
        var t = Pt(e, 134217728);
        if (t !== null) {
            var n = Se();
            at(t, e, 134217728, n);
        }
        Ic(e, 134217728);
    }
};
Om = function (e) {
    if (e.tag === 13) {
        var t = Jt(e),
            n = Pt(e, t);
        if (n !== null) {
            var r = Se();
            at(n, e, t, r);
        }
        Ic(e, t);
    }
};
Dm = function () {
    return V;
};
Um = function (e, t) {
    var n = V;
    try {
        return (V = e), t();
    } finally {
        V = n;
    }
};
Al = function (e, t, n) {
    switch (t) {
        case 'input':
            if ((kl(e, n), (t = n.name), n.type === 'radio' && t != null)) {
                for (n = e; n.parentNode; ) n = n.parentNode;
                for (
                    n = n.querySelectorAll(
                        'input[name=' +
                            JSON.stringify('' + t) +
                            '][type="radio"]'
                    ),
                        t = 0;
                    t < n.length;
                    t++
                ) {
                    var r = n[t];
                    if (r !== e && r.form === e.form) {
                        var i = Ko(r);
                        if (!i) throw Error(C(90));
                        vm(r), kl(r, i);
                    }
                }
            }
            break;
        case 'textarea':
            xm(e, n);
            break;
        case 'select':
            (t = n.value), t != null && dr(e, !!n.multiple, t, !1);
    }
};
Nm = Nc;
Am = Pn;
var ow = { usingClientEntryPoint: !1, Events: [Qi, er, Ko, Em, Cm, Nc] },
    Kr = {
        findFiberByHostInstance: gn,
        bundleType: 0,
        version: '18.3.1',
        rendererPackageName: 'react-dom'
    },
    sw = {
        bundleType: Kr.bundleType,
        version: Kr.version,
        rendererPackageName: Kr.rendererPackageName,
        rendererConfig: Kr.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: Ft.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (e) {
            return (e = jm(e)), e === null ? null : e.stateNode;
        },
        findFiberByHostInstance: Kr.findFiberByHostInstance || iw,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: '18.3.1-next-f1338f8080-20240426'
    };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Sa = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Sa.isDisabled && Sa.supportsFiber)
        try {
            (Bo = Sa.inject(sw)), (mt = Sa);
        } catch {}
}
Oe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ow;
Oe.createPortal = function (e, t) {
    var n =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!zc(t)) throw Error(C(200));
    return rw(e, t, null, n);
};
Oe.createRoot = function (e, t) {
    if (!zc(e)) throw Error(C(299));
    var n = !1,
        r = '',
        i = ug;
    return (
        t != null &&
            (t.unstable_strictMode === !0 && (n = !0),
            t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
            t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
        (t = jc(e, 1, !1, null, null, n, !1, r, i)),
        (e[Tt] = t.current),
        Ii(e.nodeType === 8 ? e.parentNode : e),
        new Mc(t)
    );
};
Oe.findDOMNode = function (e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
        throw typeof e.render == 'function'
            ? Error(C(188))
            : ((e = Object.keys(e).join(',')), Error(C(268, e)));
    return (e = jm(t)), (e = e === null ? null : e.stateNode), e;
};
Oe.flushSync = function (e) {
    return Pn(e);
};
Oe.hydrate = function (e, t, n) {
    if (!is(t)) throw Error(C(200));
    return as(null, e, t, !0, n);
};
Oe.hydrateRoot = function (e, t, n) {
    if (!zc(e)) throw Error(C(405));
    var r = (n != null && n.hydratedSources) || null,
        i = !1,
        a = '',
        o = ug;
    if (
        (n != null &&
            (n.unstable_strictMode === !0 && (i = !0),
            n.identifierPrefix !== void 0 && (a = n.identifierPrefix),
            n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
        (t = lg(t, null, e, 1, n ?? null, i, !1, a, o)),
        (e[Tt] = t.current),
        Ii(e),
        r)
    )
        for (e = 0; e < r.length; e++)
            (n = r[e]),
                (i = n._getVersion),
                (i = i(n._source)),
                t.mutableSourceEagerHydrationData == null
                    ? (t.mutableSourceEagerHydrationData = [n, i])
                    : t.mutableSourceEagerHydrationData.push(n, i);
    return new rs(t);
};
Oe.render = function (e, t, n) {
    if (!is(t)) throw Error(C(200));
    return as(null, e, t, !1, n);
};
Oe.unmountComponentAtNode = function (e) {
    if (!is(e)) throw Error(C(40));
    return e._reactRootContainer
        ? (Pn(function () {
              as(null, null, e, !1, function () {
                  (e._reactRootContainer = null), (e[Tt] = null);
              });
          }),
          !0)
        : !1;
};
Oe.unstable_batchedUpdates = Nc;
Oe.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
    if (!is(n)) throw Error(C(200));
    if (e == null || e._reactInternals === void 0) throw Error(C(38));
    return as(e, t, n, !1, r);
};
Oe.version = '18.3.1-next-f1338f8080-20240426';
function cg() {
    if (
        !(
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
        )
    )
        try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(cg);
        } catch (e) {
            console.error(e);
        }
}
cg(), (cm.exports = Oe);
var lw = cm.exports,
    fg,
    wd = lw;
(fg = wd.createRoot), wd.hydrateRoot;
/*!
 * Font Awesome Free 7.2.0 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2026 Fonticons, Inc.
 */ function su(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
    return r;
}
function uw(e) {
    if (Array.isArray(e)) return e;
}
function cw(e) {
    if (Array.isArray(e)) return su(e);
}
function fw(e, t) {
    if (!(e instanceof t))
        throw new TypeError('Cannot call a class as a function');
}
function dw(e, t) {
    for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(e, dg(r.key), r);
    }
}
function hw(e, t, n) {
    return (
        t && dw(e.prototype, t),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        e
    );
}
function Ya(e, t) {
    var n = (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator'];
    if (!n) {
        if (Array.isArray(e) || (n = Lc(e)) || t) {
            n && (e = n);
            var r = 0,
                i = function () {};
            return {
                s: i,
                n: function () {
                    return r >= e.length
                        ? { done: !0 }
                        : { done: !1, value: e[r++] };
                },
                e: function (l) {
                    throw l;
                },
                f: i
            };
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var a,
        o = !0,
        s = !1;
    return {
        s: function () {
            n = n.call(e);
        },
        n: function () {
            var l = n.next();
            return (o = l.done), l;
        },
        e: function (l) {
            (s = !0), (a = l);
        },
        f: function () {
            try {
                o || n.return == null || n.return();
            } finally {
                if (s) throw a;
            }
        }
    };
}
function O(e, t, n) {
    return (
        (t = dg(t)) in e
            ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0
              })
            : (e[t] = n),
        e
    );
}
function mw(e) {
    if (
        (typeof Symbol < 'u' && e[Symbol.iterator] != null) ||
        e['@@iterator'] != null
    )
        return Array.from(e);
}
function pw(e, t) {
    var n =
        e == null
            ? null
            : (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator'];
    if (n != null) {
        var r,
            i,
            a,
            o,
            s = [],
            l = !0,
            u = !1;
        try {
            if (((a = (n = n.call(e)).next), t === 0)) {
                if (Object(n) !== n) return;
                l = !1;
            } else
                for (
                    ;
                    !(l = (r = a.call(n)).done) &&
                    (s.push(r.value), s.length !== t);
                    l = !0
                );
        } catch (f) {
            (u = !0), (i = f);
        } finally {
            try {
                if (
                    !l &&
                    n.return != null &&
                    ((o = n.return()), Object(o) !== o)
                )
                    return;
            } finally {
                if (u) throw i;
            }
        }
        return s;
    }
}
function gw() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function yw() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function xd(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
            (r = r.filter(function (i) {
                return Object.getOwnPropertyDescriptor(e, i).enumerable;
            })),
            n.push.apply(n, r);
    }
    return n;
}
function N(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t] != null ? arguments[t] : {};
        t % 2
            ? xd(Object(n), !0).forEach(function (r) {
                  O(e, r, n[r]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : xd(Object(n)).forEach(function (r) {
                  Object.defineProperty(
                      e,
                      r,
                      Object.getOwnPropertyDescriptor(n, r)
                  );
              });
    }
    return e;
}
function os(e, t) {
    return uw(e) || pw(e, t) || Lc(e, t) || gw();
}
function st(e) {
    return cw(e) || mw(e) || Lc(e) || yw();
}
function vw(e, t) {
    if (typeof e != 'object' || !e) return e;
    var n = e[Symbol.toPrimitive];
    if (n !== void 0) {
        var r = n.call(e, t);
        if (typeof r != 'object') return r;
        throw new TypeError('@@toPrimitive must return a primitive value.');
    }
    return (t === 'string' ? String : Number)(e);
}
function dg(e) {
    var t = vw(e, 'string');
    return typeof t == 'symbol' ? t : t + '';
}
function No(e) {
    '@babel/helpers - typeof';
    return (
        (No =
            typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
                ? function (t) {
                      return typeof t;
                  }
                : function (t) {
                      return t &&
                          typeof Symbol == 'function' &&
                          t.constructor === Symbol &&
                          t !== Symbol.prototype
                          ? 'symbol'
                          : typeof t;
                  }),
        No(e)
    );
}
function Lc(e, t) {
    if (e) {
        if (typeof e == 'string') return su(e, t);
        var n = {}.toString.call(e).slice(8, -1);
        return (
            n === 'Object' && e.constructor && (n = e.constructor.name),
            n === 'Map' || n === 'Set'
                ? Array.from(e)
                : n === 'Arguments' ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                ? su(e, t)
                : void 0
        );
    }
}
var kd = function () {},
    Fc = {},
    hg = {},
    mg = null,
    pg = { mark: kd, measure: kd };
try {
    typeof window < 'u' && (Fc = window),
        typeof document < 'u' && (hg = document),
        typeof MutationObserver < 'u' && (mg = MutationObserver),
        typeof performance < 'u' && (pg = performance);
} catch {}
var ww = Fc.navigator || {},
    Sd = ww.userAgent,
    bd = Sd === void 0 ? '' : Sd,
    nn = Fc,
    Q = hg,
    _d = mg,
    ba = pg;
nn.document;
var $t =
        !!Q.documentElement &&
        !!Q.head &&
        typeof Q.addEventListener == 'function' &&
        typeof Q.createElement == 'function',
    gg = ~bd.indexOf('MSIE') || ~bd.indexOf('Trident/'),
    Vs,
    xw =
        /fa(k|kd|s|r|l|t|d|dr|dl|dt|b|slr|slpr|wsb|tl|ns|nds|es|gt|jr|jfr|jdr|usb|ufsb|udsb|cr|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,
    kw =
        /Font ?Awesome ?([567 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit|Notdog Duo|Notdog|Chisel|Etch|Graphite|Thumbprint|Jelly Fill|Jelly Duo|Jelly|Utility|Utility Fill|Utility Duo|Slab Press|Slab|Whiteboard)?.*/i,
    yg = {
        classic: {
            fa: 'solid',
            fas: 'solid',
            'fa-solid': 'solid',
            far: 'regular',
            'fa-regular': 'regular',
            fal: 'light',
            'fa-light': 'light',
            fat: 'thin',
            'fa-thin': 'thin',
            fab: 'brands',
            'fa-brands': 'brands'
        },
        duotone: {
            fa: 'solid',
            fad: 'solid',
            'fa-solid': 'solid',
            'fa-duotone': 'solid',
            fadr: 'regular',
            'fa-regular': 'regular',
            fadl: 'light',
            'fa-light': 'light',
            fadt: 'thin',
            'fa-thin': 'thin'
        },
        sharp: {
            fa: 'solid',
            fass: 'solid',
            'fa-solid': 'solid',
            fasr: 'regular',
            'fa-regular': 'regular',
            fasl: 'light',
            'fa-light': 'light',
            fast: 'thin',
            'fa-thin': 'thin'
        },
        'sharp-duotone': {
            fa: 'solid',
            fasds: 'solid',
            'fa-solid': 'solid',
            fasdr: 'regular',
            'fa-regular': 'regular',
            fasdl: 'light',
            'fa-light': 'light',
            fasdt: 'thin',
            'fa-thin': 'thin'
        },
        slab: { 'fa-regular': 'regular', faslr: 'regular' },
        'slab-press': { 'fa-regular': 'regular', faslpr: 'regular' },
        thumbprint: { 'fa-light': 'light', fatl: 'light' },
        whiteboard: { 'fa-semibold': 'semibold', fawsb: 'semibold' },
        notdog: { 'fa-solid': 'solid', fans: 'solid' },
        'notdog-duo': { 'fa-solid': 'solid', fands: 'solid' },
        etch: { 'fa-solid': 'solid', faes: 'solid' },
        graphite: { 'fa-thin': 'thin', fagt: 'thin' },
        jelly: { 'fa-regular': 'regular', fajr: 'regular' },
        'jelly-fill': { 'fa-regular': 'regular', fajfr: 'regular' },
        'jelly-duo': { 'fa-regular': 'regular', fajdr: 'regular' },
        chisel: { 'fa-regular': 'regular', facr: 'regular' },
        utility: { 'fa-semibold': 'semibold', fausb: 'semibold' },
        'utility-duo': { 'fa-semibold': 'semibold', faudsb: 'semibold' },
        'utility-fill': { 'fa-semibold': 'semibold', faufsb: 'semibold' }
    },
    Sw = { GROUP: 'duotone-group', PRIMARY: 'primary', SECONDARY: 'secondary' },
    vg = [
        'fa-classic',
        'fa-duotone',
        'fa-sharp',
        'fa-sharp-duotone',
        'fa-thumbprint',
        'fa-whiteboard',
        'fa-notdog',
        'fa-notdog-duo',
        'fa-chisel',
        'fa-etch',
        'fa-graphite',
        'fa-jelly',
        'fa-jelly-fill',
        'fa-jelly-duo',
        'fa-slab',
        'fa-slab-press',
        'fa-utility',
        'fa-utility-duo',
        'fa-utility-fill'
    ],
    ge = 'classic',
    Ji = 'duotone',
    wg = 'sharp',
    xg = 'sharp-duotone',
    kg = 'chisel',
    Sg = 'etch',
    bg = 'graphite',
    _g = 'jelly',
    Eg = 'jelly-duo',
    Cg = 'jelly-fill',
    Ng = 'notdog',
    Ag = 'notdog-duo',
    Tg = 'slab',
    Pg = 'slab-press',
    jg = 'thumbprint',
    Ig = 'utility',
    Mg = 'utility-duo',
    zg = 'utility-fill',
    Lg = 'whiteboard',
    bw = 'Classic',
    _w = 'Duotone',
    Ew = 'Sharp',
    Cw = 'Sharp Duotone',
    Nw = 'Chisel',
    Aw = 'Etch',
    Tw = 'Graphite',
    Pw = 'Jelly',
    jw = 'Jelly Duo',
    Iw = 'Jelly Fill',
    Mw = 'Notdog',
    zw = 'Notdog Duo',
    Lw = 'Slab',
    Fw = 'Slab Press',
    $w = 'Thumbprint',
    Rw = 'Utility',
    Ow = 'Utility Duo',
    Dw = 'Utility Fill',
    Uw = 'Whiteboard',
    Fg = [
        ge,
        Ji,
        wg,
        xg,
        kg,
        Sg,
        bg,
        _g,
        Eg,
        Cg,
        Ng,
        Ag,
        Tg,
        Pg,
        jg,
        Ig,
        Mg,
        zg,
        Lg
    ];
(Vs = {}),
    O(
        O(
            O(
                O(
                    O(
                        O(
                            O(O(O(O(Vs, ge, bw), Ji, _w), wg, Ew), xg, Cw),
                            kg,
                            Nw
                        ),
                        Sg,
                        Aw
                    ),
                    bg,
                    Tw
                ),
                _g,
                Pw
            ),
            Eg,
            jw
        ),
        Cg,
        Iw
    ),
    O(
        O(
            O(
                O(
                    O(O(O(O(O(Vs, Ng, Mw), Ag, zw), Tg, Lw), Pg, Fw), jg, $w),
                    Ig,
                    Rw
                ),
                Mg,
                Ow
            ),
            zg,
            Dw
        ),
        Lg,
        Uw
    );
var Hw = {
        classic: {
            900: 'fas',
            400: 'far',
            normal: 'far',
            300: 'fal',
            100: 'fat'
        },
        duotone: { 900: 'fad', 400: 'fadr', 300: 'fadl', 100: 'fadt' },
        sharp: { 900: 'fass', 400: 'fasr', 300: 'fasl', 100: 'fast' },
        'sharp-duotone': {
            900: 'fasds',
            400: 'fasdr',
            300: 'fasdl',
            100: 'fasdt'
        },
        slab: { 400: 'faslr' },
        'slab-press': { 400: 'faslpr' },
        whiteboard: { 600: 'fawsb' },
        thumbprint: { 300: 'fatl' },
        notdog: { 900: 'fans' },
        'notdog-duo': { 900: 'fands' },
        etch: { 900: 'faes' },
        graphite: { 100: 'fagt' },
        chisel: { 400: 'facr' },
        jelly: { 400: 'fajr' },
        'jelly-fill': { 400: 'fajfr' },
        'jelly-duo': { 400: 'fajdr' },
        utility: { 600: 'fausb' },
        'utility-duo': { 600: 'faudsb' },
        'utility-fill': { 600: 'faufsb' }
    },
    Ww = {
        'Font Awesome 7 Free': { 900: 'fas', 400: 'far' },
        'Font Awesome 7 Pro': {
            900: 'fas',
            400: 'far',
            normal: 'far',
            300: 'fal',
            100: 'fat'
        },
        'Font Awesome 7 Brands': { 400: 'fab', normal: 'fab' },
        'Font Awesome 7 Duotone': {
            900: 'fad',
            400: 'fadr',
            normal: 'fadr',
            300: 'fadl',
            100: 'fadt'
        },
        'Font Awesome 7 Sharp': {
            900: 'fass',
            400: 'fasr',
            normal: 'fasr',
            300: 'fasl',
            100: 'fast'
        },
        'Font Awesome 7 Sharp Duotone': {
            900: 'fasds',
            400: 'fasdr',
            normal: 'fasdr',
            300: 'fasdl',
            100: 'fasdt'
        },
        'Font Awesome 7 Jelly': { 400: 'fajr', normal: 'fajr' },
        'Font Awesome 7 Jelly Fill': { 400: 'fajfr', normal: 'fajfr' },
        'Font Awesome 7 Jelly Duo': { 400: 'fajdr', normal: 'fajdr' },
        'Font Awesome 7 Slab': { 400: 'faslr', normal: 'faslr' },
        'Font Awesome 7 Slab Press': { 400: 'faslpr', normal: 'faslpr' },
        'Font Awesome 7 Thumbprint': { 300: 'fatl', normal: 'fatl' },
        'Font Awesome 7 Notdog': { 900: 'fans', normal: 'fans' },
        'Font Awesome 7 Notdog Duo': { 900: 'fands', normal: 'fands' },
        'Font Awesome 7 Etch': { 900: 'faes', normal: 'faes' },
        'Font Awesome 7 Graphite': { 100: 'fagt', normal: 'fagt' },
        'Font Awesome 7 Chisel': { 400: 'facr', normal: 'facr' },
        'Font Awesome 7 Whiteboard': { 600: 'fawsb', normal: 'fawsb' },
        'Font Awesome 7 Utility': { 600: 'fausb', normal: 'fausb' },
        'Font Awesome 7 Utility Duo': { 600: 'faudsb', normal: 'faudsb' },
        'Font Awesome 7 Utility Fill': { 600: 'faufsb', normal: 'faufsb' }
    },
    Vw = new Map([
        [
            'classic',
            {
                defaultShortPrefixId: 'fas',
                defaultStyleId: 'solid',
                styleIds: ['solid', 'regular', 'light', 'thin', 'brands'],
                futureStyleIds: [],
                defaultFontWeight: 900
            }
        ],
        [
            'duotone',
            {
                defaultShortPrefixId: 'fad',
                defaultStyleId: 'solid',
                styleIds: ['solid', 'regular', 'light', 'thin'],
                futureStyleIds: [],
                defaultFontWeight: 900
            }
        ],
        [
            'sharp',
            {
                defaultShortPrefixId: 'fass',
                defaultStyleId: 'solid',
                styleIds: ['solid', 'regular', 'light', 'thin'],
                futureStyleIds: [],
                defaultFontWeight: 900
            }
        ],
        [
            'sharp-duotone',
            {
                defaultShortPrefixId: 'fasds',
                defaultStyleId: 'solid',
                styleIds: ['solid', 'regular', 'light', 'thin'],
                futureStyleIds: [],
                defaultFontWeight: 900
            }
        ],
        [
            'chisel',
            {
                defaultShortPrefixId: 'facr',
                defaultStyleId: 'regular',
                styleIds: ['regular'],
                futureStyleIds: [],
                defaultFontWeight: 400
            }
        ],
        [
            'etch',
            {
                defaultShortPrefixId: 'faes',
                defaultStyleId: 'solid',
                styleIds: ['solid'],
                futureStyleIds: [],
                defaultFontWeight: 900
            }
        ],
        [
            'graphite',
            {
                defaultShortPrefixId: 'fagt',
                defaultStyleId: 'thin',
                styleIds: ['thin'],
                futureStyleIds: [],
                defaultFontWeight: 100
            }
        ],
        [
            'jelly',
            {
                defaultShortPrefixId: 'fajr',
                defaultStyleId: 'regular',
                styleIds: ['regular'],
                futureStyleIds: [],
                defaultFontWeight: 400
            }
        ],
        [
            'jelly-duo',
            {
                defaultShortPrefixId: 'fajdr',
                defaultStyleId: 'regular',
                styleIds: ['regular'],
                futureStyleIds: [],
                defaultFontWeight: 400
            }
        ],
        [
            'jelly-fill',
            {
                defaultShortPrefixId: 'fajfr',
                defaultStyleId: 'regular',
                styleIds: ['regular'],
                futureStyleIds: [],
                defaultFontWeight: 400
            }
        ],
        [
            'notdog',
            {
                defaultShortPrefixId: 'fans',
                defaultStyleId: 'solid',
                styleIds: ['solid'],
                futureStyleIds: [],
                defaultFontWeight: 900
            }
        ],
        [
            'notdog-duo',
            {
                defaultShortPrefixId: 'fands',
                defaultStyleId: 'solid',
                styleIds: ['solid'],
                futureStyleIds: [],
                defaultFontWeight: 900
            }
        ],
        [
            'slab',
            {
                defaultShortPrefixId: 'faslr',
                defaultStyleId: 'regular',
                styleIds: ['regular'],
                futureStyleIds: [],
                defaultFontWeight: 400
            }
        ],
        [
            'slab-press',
            {
                defaultShortPrefixId: 'faslpr',
                defaultStyleId: 'regular',
                styleIds: ['regular'],
                futureStyleIds: [],
                defaultFontWeight: 400
            }
        ],
        [
            'thumbprint',
            {
                defaultShortPrefixId: 'fatl',
                defaultStyleId: 'light',
                styleIds: ['light'],
                futureStyleIds: [],
                defaultFontWeight: 300
            }
        ],
        [
            'utility',
            {
                defaultShortPrefixId: 'fausb',
                defaultStyleId: 'semibold',
                styleIds: ['semibold'],
                futureStyleIds: [],
                defaultFontWeight: 600
            }
        ],
        [
            'utility-duo',
            {
                defaultShortPrefixId: 'faudsb',
                defaultStyleId: 'semibold',
                styleIds: ['semibold'],
                futureStyleIds: [],
                defaultFontWeight: 600
            }
        ],
        [
            'utility-fill',
            {
                defaultShortPrefixId: 'faufsb',
                defaultStyleId: 'semibold',
                styleIds: ['semibold'],
                futureStyleIds: [],
                defaultFontWeight: 600
            }
        ],
        [
            'whiteboard',
            {
                defaultShortPrefixId: 'fawsb',
                defaultStyleId: 'semibold',
                styleIds: ['semibold'],
                futureStyleIds: [],
                defaultFontWeight: 600
            }
        ]
    ]),
    Bw = {
        chisel: { regular: 'facr' },
        classic: {
            brands: 'fab',
            light: 'fal',
            regular: 'far',
            solid: 'fas',
            thin: 'fat'
        },
        duotone: { light: 'fadl', regular: 'fadr', solid: 'fad', thin: 'fadt' },
        etch: { solid: 'faes' },
        graphite: { thin: 'fagt' },
        jelly: { regular: 'fajr' },
        'jelly-duo': { regular: 'fajdr' },
        'jelly-fill': { regular: 'fajfr' },
        notdog: { solid: 'fans' },
        'notdog-duo': { solid: 'fands' },
        sharp: { light: 'fasl', regular: 'fasr', solid: 'fass', thin: 'fast' },
        'sharp-duotone': {
            light: 'fasdl',
            regular: 'fasdr',
            solid: 'fasds',
            thin: 'fasdt'
        },
        slab: { regular: 'faslr' },
        'slab-press': { regular: 'faslpr' },
        thumbprint: { light: 'fatl' },
        utility: { semibold: 'fausb' },
        'utility-duo': { semibold: 'faudsb' },
        'utility-fill': { semibold: 'faufsb' },
        whiteboard: { semibold: 'fawsb' }
    },
    $g = ['fak', 'fa-kit', 'fakd', 'fa-kit-duotone'],
    Ed = {
        kit: { fak: 'kit', 'fa-kit': 'kit' },
        'kit-duotone': { fakd: 'kit-duotone', 'fa-kit-duotone': 'kit-duotone' }
    },
    Yw = ['kit'],
    Gw = 'kit',
    Xw = 'kit-duotone',
    Kw = 'Kit',
    Qw = 'Kit Duotone';
O(O({}, Gw, Kw), Xw, Qw);
var qw = { kit: { 'fa-kit': 'fak' } },
    Jw = {
        'Font Awesome Kit': { 400: 'fak', normal: 'fak' },
        'Font Awesome Kit Duotone': { 400: 'fakd', normal: 'fakd' }
    },
    Zw = { kit: { fak: 'fa-kit' } },
    Cd = { kit: { kit: 'fak' }, 'kit-duotone': { 'kit-duotone': 'fakd' } },
    Bs,
    _a = {
        GROUP: 'duotone-group',
        SWAP_OPACITY: 'swap-opacity',
        PRIMARY: 'primary',
        SECONDARY: 'secondary'
    },
    ex = [
        'fa-classic',
        'fa-duotone',
        'fa-sharp',
        'fa-sharp-duotone',
        'fa-thumbprint',
        'fa-whiteboard',
        'fa-notdog',
        'fa-notdog-duo',
        'fa-chisel',
        'fa-etch',
        'fa-graphite',
        'fa-jelly',
        'fa-jelly-fill',
        'fa-jelly-duo',
        'fa-slab',
        'fa-slab-press',
        'fa-utility',
        'fa-utility-duo',
        'fa-utility-fill'
    ],
    tx = 'classic',
    nx = 'duotone',
    rx = 'sharp',
    ix = 'sharp-duotone',
    ax = 'chisel',
    ox = 'etch',
    sx = 'graphite',
    lx = 'jelly',
    ux = 'jelly-duo',
    cx = 'jelly-fill',
    fx = 'notdog',
    dx = 'notdog-duo',
    hx = 'slab',
    mx = 'slab-press',
    px = 'thumbprint',
    gx = 'utility',
    yx = 'utility-duo',
    vx = 'utility-fill',
    wx = 'whiteboard',
    xx = 'Classic',
    kx = 'Duotone',
    Sx = 'Sharp',
    bx = 'Sharp Duotone',
    _x = 'Chisel',
    Ex = 'Etch',
    Cx = 'Graphite',
    Nx = 'Jelly',
    Ax = 'Jelly Duo',
    Tx = 'Jelly Fill',
    Px = 'Notdog',
    jx = 'Notdog Duo',
    Ix = 'Slab',
    Mx = 'Slab Press',
    zx = 'Thumbprint',
    Lx = 'Utility',
    Fx = 'Utility Duo',
    $x = 'Utility Fill',
    Rx = 'Whiteboard';
(Bs = {}),
    O(
        O(
            O(
                O(
                    O(
                        O(
                            O(O(O(O(Bs, tx, xx), nx, kx), rx, Sx), ix, bx),
                            ax,
                            _x
                        ),
                        ox,
                        Ex
                    ),
                    sx,
                    Cx
                ),
                lx,
                Nx
            ),
            ux,
            Ax
        ),
        cx,
        Tx
    ),
    O(
        O(
            O(
                O(
                    O(O(O(O(O(Bs, fx, Px), dx, jx), hx, Ix), mx, Mx), px, zx),
                    gx,
                    Lx
                ),
                yx,
                Fx
            ),
            vx,
            $x
        ),
        wx,
        Rx
    );
var Ox = 'kit',
    Dx = 'kit-duotone',
    Ux = 'Kit',
    Hx = 'Kit Duotone';
O(O({}, Ox, Ux), Dx, Hx);
var Wx = {
        classic: {
            'fa-brands': 'fab',
            'fa-duotone': 'fad',
            'fa-light': 'fal',
            'fa-regular': 'far',
            'fa-solid': 'fas',
            'fa-thin': 'fat'
        },
        duotone: {
            'fa-regular': 'fadr',
            'fa-light': 'fadl',
            'fa-thin': 'fadt'
        },
        sharp: {
            'fa-solid': 'fass',
            'fa-regular': 'fasr',
            'fa-light': 'fasl',
            'fa-thin': 'fast'
        },
        'sharp-duotone': {
            'fa-solid': 'fasds',
            'fa-regular': 'fasdr',
            'fa-light': 'fasdl',
            'fa-thin': 'fasdt'
        },
        slab: { 'fa-regular': 'faslr' },
        'slab-press': { 'fa-regular': 'faslpr' },
        whiteboard: { 'fa-semibold': 'fawsb' },
        thumbprint: { 'fa-light': 'fatl' },
        notdog: { 'fa-solid': 'fans' },
        'notdog-duo': { 'fa-solid': 'fands' },
        etch: { 'fa-solid': 'faes' },
        graphite: { 'fa-thin': 'fagt' },
        jelly: { 'fa-regular': 'fajr' },
        'jelly-fill': { 'fa-regular': 'fajfr' },
        'jelly-duo': { 'fa-regular': 'fajdr' },
        chisel: { 'fa-regular': 'facr' },
        utility: { 'fa-semibold': 'fausb' },
        'utility-duo': { 'fa-semibold': 'faudsb' },
        'utility-fill': { 'fa-semibold': 'faufsb' }
    },
    Vx = {
        classic: ['fas', 'far', 'fal', 'fat', 'fad'],
        duotone: ['fadr', 'fadl', 'fadt'],
        sharp: ['fass', 'fasr', 'fasl', 'fast'],
        'sharp-duotone': ['fasds', 'fasdr', 'fasdl', 'fasdt'],
        slab: ['faslr'],
        'slab-press': ['faslpr'],
        whiteboard: ['fawsb'],
        thumbprint: ['fatl'],
        notdog: ['fans'],
        'notdog-duo': ['fands'],
        etch: ['faes'],
        graphite: ['fagt'],
        jelly: ['fajr'],
        'jelly-fill': ['fajfr'],
        'jelly-duo': ['fajdr'],
        chisel: ['facr'],
        utility: ['fausb'],
        'utility-duo': ['faudsb'],
        'utility-fill': ['faufsb']
    },
    lu = {
        classic: {
            fab: 'fa-brands',
            fad: 'fa-duotone',
            fal: 'fa-light',
            far: 'fa-regular',
            fas: 'fa-solid',
            fat: 'fa-thin'
        },
        duotone: { fadr: 'fa-regular', fadl: 'fa-light', fadt: 'fa-thin' },
        sharp: {
            fass: 'fa-solid',
            fasr: 'fa-regular',
            fasl: 'fa-light',
            fast: 'fa-thin'
        },
        'sharp-duotone': {
            fasds: 'fa-solid',
            fasdr: 'fa-regular',
            fasdl: 'fa-light',
            fasdt: 'fa-thin'
        },
        slab: { faslr: 'fa-regular' },
        'slab-press': { faslpr: 'fa-regular' },
        whiteboard: { fawsb: 'fa-semibold' },
        thumbprint: { fatl: 'fa-light' },
        notdog: { fans: 'fa-solid' },
        'notdog-duo': { fands: 'fa-solid' },
        etch: { faes: 'fa-solid' },
        graphite: { fagt: 'fa-thin' },
        jelly: { fajr: 'fa-regular' },
        'jelly-fill': { fajfr: 'fa-regular' },
        'jelly-duo': { fajdr: 'fa-regular' },
        chisel: { facr: 'fa-regular' },
        utility: { fausb: 'fa-semibold' },
        'utility-duo': { faudsb: 'fa-semibold' },
        'utility-fill': { faufsb: 'fa-semibold' }
    },
    Bx = [
        'fa-solid',
        'fa-regular',
        'fa-light',
        'fa-thin',
        'fa-duotone',
        'fa-brands',
        'fa-semibold'
    ],
    Rg = [
        'fa',
        'fas',
        'far',
        'fal',
        'fat',
        'fad',
        'fadr',
        'fadl',
        'fadt',
        'fab',
        'fass',
        'fasr',
        'fasl',
        'fast',
        'fasds',
        'fasdr',
        'fasdl',
        'fasdt',
        'faslr',
        'faslpr',
        'fawsb',
        'fatl',
        'fans',
        'fands',
        'faes',
        'fagt',
        'fajr',
        'fajfr',
        'fajdr',
        'facr',
        'fausb',
        'faudsb',
        'faufsb'
    ].concat(ex, Bx),
    Yx = ['solid', 'regular', 'light', 'thin', 'duotone', 'brands', 'semibold'],
    Og = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    Gx = Og.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
    Xx = ['aw', 'fw', 'pull-left', 'pull-right'],
    Kx = []
        .concat(st(Object.keys(Vx)), Yx, Xx, [
            '2xs',
            'xs',
            'sm',
            'lg',
            'xl',
            '2xl',
            'beat',
            'border',
            'fade',
            'beat-fade',
            'bounce',
            'flip-both',
            'flip-horizontal',
            'flip-vertical',
            'flip',
            'inverse',
            'layers',
            'layers-bottom-left',
            'layers-bottom-right',
            'layers-counter',
            'layers-text',
            'layers-top-left',
            'layers-top-right',
            'li',
            'pull-end',
            'pull-start',
            'pulse',
            'rotate-180',
            'rotate-270',
            'rotate-90',
            'rotate-by',
            'shake',
            'spin-pulse',
            'spin-reverse',
            'spin',
            'stack-1x',
            'stack-2x',
            'stack',
            'ul',
            'width-auto',
            'width-fixed',
            _a.GROUP,
            _a.SWAP_OPACITY,
            _a.PRIMARY,
            _a.SECONDARY
        ])
        .concat(
            Og.map(function (e) {
                return ''.concat(e, 'x');
            })
        )
        .concat(
            Gx.map(function (e) {
                return 'w-'.concat(e);
            })
        ),
    Qx = {
        'Font Awesome 5 Free': { 900: 'fas', 400: 'far' },
        'Font Awesome 5 Pro': {
            900: 'fas',
            400: 'far',
            normal: 'far',
            300: 'fal'
        },
        'Font Awesome 5 Brands': { 400: 'fab', normal: 'fab' },
        'Font Awesome 5 Duotone': { 900: 'fad' }
    },
    It = '___FONT_AWESOME___',
    uu = 16,
    Dg = 'fa',
    Ug = 'svg-inline--fa',
    jn = 'data-fa-i2svg',
    cu = 'data-fa-pseudo-element',
    qx = 'data-fa-pseudo-element-pending',
    $c = 'data-prefix',
    Rc = 'data-icon',
    Nd = 'fontawesome-i2svg',
    Jx = 'async',
    Zx = ['HTML', 'HEAD', 'STYLE', 'SCRIPT'],
    Hg = ['::before', '::after', ':before', ':after'],
    Wg = (function () {
        try {
            return !0;
        } catch {
            return !1;
        }
    })();
function Zi(e) {
    return new Proxy(e, {
        get: function (n, r) {
            return r in n ? n[r] : n[ge];
        }
    });
}
var Vg = N({}, yg);
Vg[ge] = N(
    N(N(N({}, { 'fa-duotone': 'duotone' }), yg[ge]), Ed.kit),
    Ed['kit-duotone']
);
var ek = Zi(Vg),
    fu = N({}, Bw);
fu[ge] = N(N(N(N({}, { duotone: 'fad' }), fu[ge]), Cd.kit), Cd['kit-duotone']);
var Ad = Zi(fu),
    du = N({}, lu);
du[ge] = N(N({}, du[ge]), Zw.kit);
var Oc = Zi(du),
    hu = N({}, Wx);
hu[ge] = N(N({}, hu[ge]), qw.kit);
Zi(hu);
var tk = xw,
    Bg = 'fa-layers-text',
    nk = kw,
    rk = N({}, Hw);
Zi(rk);
var ik = [
        'class',
        'data-prefix',
        'data-icon',
        'data-fa-transform',
        'data-fa-mask'
    ],
    Ys = Sw,
    ak = [].concat(st(Yw), st(Kx)),
    vi = nn.FontAwesomeConfig || {};
function ok(e) {
    var t = Q.querySelector('script[' + e + ']');
    if (t) return t.getAttribute(e);
}
function sk(e) {
    return e === '' ? !0 : e === 'false' ? !1 : e === 'true' ? !0 : e;
}
if (Q && typeof Q.querySelector == 'function') {
    var lk = [
        ['data-family-prefix', 'familyPrefix'],
        ['data-css-prefix', 'cssPrefix'],
        ['data-family-default', 'familyDefault'],
        ['data-style-default', 'styleDefault'],
        ['data-replacement-class', 'replacementClass'],
        ['data-auto-replace-svg', 'autoReplaceSvg'],
        ['data-auto-add-css', 'autoAddCss'],
        ['data-search-pseudo-elements', 'searchPseudoElements'],
        [
            'data-search-pseudo-elements-warnings',
            'searchPseudoElementsWarnings'
        ],
        [
            'data-search-pseudo-elements-full-scan',
            'searchPseudoElementsFullScan'
        ],
        ['data-observe-mutations', 'observeMutations'],
        ['data-mutate-approach', 'mutateApproach'],
        ['data-keep-original-source', 'keepOriginalSource'],
        ['data-measure-performance', 'measurePerformance'],
        ['data-show-missing-icons', 'showMissingIcons']
    ];
    lk.forEach(function (e) {
        var t = os(e, 2),
            n = t[0],
            r = t[1],
            i = sk(ok(n));
        i != null && (vi[r] = i);
    });
}
var Yg = {
    styleDefault: 'solid',
    familyDefault: ge,
    cssPrefix: Dg,
    replacementClass: Ug,
    autoReplaceSvg: !0,
    autoAddCss: !0,
    searchPseudoElements: !1,
    searchPseudoElementsWarnings: !0,
    searchPseudoElementsFullScan: !1,
    observeMutations: !0,
    mutateApproach: 'async',
    keepOriginalSource: !0,
    measurePerformance: !1,
    showMissingIcons: !0
};
vi.familyPrefix && (vi.cssPrefix = vi.familyPrefix);
var Nr = N(N({}, Yg), vi);
Nr.autoReplaceSvg || (Nr.observeMutations = !1);
var z = {};
Object.keys(Yg).forEach(function (e) {
    Object.defineProperty(z, e, {
        enumerable: !0,
        set: function (n) {
            (Nr[e] = n),
                wi.forEach(function (r) {
                    return r(z);
                });
        },
        get: function () {
            return Nr[e];
        }
    });
});
Object.defineProperty(z, 'familyPrefix', {
    enumerable: !0,
    set: function (t) {
        (Nr.cssPrefix = t),
            wi.forEach(function (n) {
                return n(z);
            });
    },
    get: function () {
        return Nr.cssPrefix;
    }
});
nn.FontAwesomeConfig = z;
var wi = [];
function uk(e) {
    return (
        wi.push(e),
        function () {
            wi.splice(wi.indexOf(e), 1);
        }
    );
}
var Wn = uu,
    ht = { size: 16, x: 0, y: 0, rotate: 0, flipX: !1, flipY: !1 };
function ck(e) {
    if (!(!e || !$t)) {
        var t = Q.createElement('style');
        t.setAttribute('type', 'text/css'), (t.innerHTML = e);
        for (
            var n = Q.head.childNodes, r = null, i = n.length - 1;
            i > -1;
            i--
        ) {
            var a = n[i],
                o = (a.tagName || '').toUpperCase();
            ['STYLE', 'LINK'].indexOf(o) > -1 && (r = a);
        }
        return Q.head.insertBefore(t, r), e;
    }
}
var fk = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function Td() {
    for (var e = 12, t = ''; e-- > 0; ) t += fk[(Math.random() * 62) | 0];
    return t;
}
function Lr(e) {
    for (var t = [], n = (e || []).length >>> 0; n--; ) t[n] = e[n];
    return t;
}
function Dc(e) {
    return e.classList
        ? Lr(e.classList)
        : (e.getAttribute('class') || '').split(' ').filter(function (t) {
              return t;
          });
}
function Gg(e) {
    return ''
        .concat(e)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
function dk(e) {
    return Object.keys(e || {})
        .reduce(function (t, n) {
            return t + ''.concat(n, '="').concat(Gg(e[n]), '" ');
        }, '')
        .trim();
}
function ss(e) {
    return Object.keys(e || {}).reduce(function (t, n) {
        return t + ''.concat(n, ': ').concat(e[n].trim(), ';');
    }, '');
}
function Uc(e) {
    return (
        e.size !== ht.size ||
        e.x !== ht.x ||
        e.y !== ht.y ||
        e.rotate !== ht.rotate ||
        e.flipX ||
        e.flipY
    );
}
function hk(e) {
    var t = e.transform,
        n = e.containerWidth,
        r = e.iconWidth,
        i = { transform: 'translate('.concat(n / 2, ' 256)') },
        a = 'translate('.concat(t.x * 32, ', ').concat(t.y * 32, ') '),
        o = 'scale('
            .concat((t.size / 16) * (t.flipX ? -1 : 1), ', ')
            .concat((t.size / 16) * (t.flipY ? -1 : 1), ') '),
        s = 'rotate('.concat(t.rotate, ' 0 0)'),
        l = { transform: ''.concat(a, ' ').concat(o, ' ').concat(s) },
        u = { transform: 'translate('.concat((r / 2) * -1, ' -256)') };
    return { outer: i, inner: l, path: u };
}
function mk(e) {
    var t = e.transform,
        n = e.width,
        r = n === void 0 ? uu : n,
        i = e.height,
        a = i === void 0 ? uu : i,
        o = '';
    return (
        gg
            ? (o += 'translate('
                  .concat(t.x / Wn - r / 2, 'em, ')
                  .concat(t.y / Wn - a / 2, 'em) '))
            : (o += 'translate(calc(-50% + '
                  .concat(t.x / Wn, 'em), calc(-50% + ')
                  .concat(t.y / Wn, 'em)) ')),
        (o += 'scale('
            .concat((t.size / Wn) * (t.flipX ? -1 : 1), ', ')
            .concat((t.size / Wn) * (t.flipY ? -1 : 1), ') ')),
        (o += 'rotate('.concat(t.rotate, 'deg) ')),
        o
    );
}
var pk = `:root, :host {
  --fa-font-solid: normal 900 1em/1 'Font Awesome 7 Free';
  --fa-font-regular: normal 400 1em/1 'Font Awesome 7 Free';
  --fa-font-light: normal 300 1em/1 'Font Awesome 7 Pro';
  --fa-font-thin: normal 100 1em/1 'Font Awesome 7 Pro';
  --fa-font-duotone: normal 900 1em/1 'Font Awesome 7 Duotone';
  --fa-font-duotone-regular: normal 400 1em/1 'Font Awesome 7 Duotone';
  --fa-font-duotone-light: normal 300 1em/1 'Font Awesome 7 Duotone';
  --fa-font-duotone-thin: normal 100 1em/1 'Font Awesome 7 Duotone';
  --fa-font-brands: normal 400 1em/1 'Font Awesome 7 Brands';
  --fa-font-sharp-solid: normal 900 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-regular: normal 400 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-light: normal 300 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-thin: normal 100 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-duotone-solid: normal 900 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-sharp-duotone-regular: normal 400 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-sharp-duotone-light: normal 300 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-sharp-duotone-thin: normal 100 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-slab-regular: normal 400 1em/1 'Font Awesome 7 Slab';
  --fa-font-slab-press-regular: normal 400 1em/1 'Font Awesome 7 Slab Press';
  --fa-font-whiteboard-semibold: normal 600 1em/1 'Font Awesome 7 Whiteboard';
  --fa-font-thumbprint-light: normal 300 1em/1 'Font Awesome 7 Thumbprint';
  --fa-font-notdog-solid: normal 900 1em/1 'Font Awesome 7 Notdog';
  --fa-font-notdog-duo-solid: normal 900 1em/1 'Font Awesome 7 Notdog Duo';
  --fa-font-etch-solid: normal 900 1em/1 'Font Awesome 7 Etch';
  --fa-font-graphite-thin: normal 100 1em/1 'Font Awesome 7 Graphite';
  --fa-font-jelly-regular: normal 400 1em/1 'Font Awesome 7 Jelly';
  --fa-font-jelly-fill-regular: normal 400 1em/1 'Font Awesome 7 Jelly Fill';
  --fa-font-jelly-duo-regular: normal 400 1em/1 'Font Awesome 7 Jelly Duo';
  --fa-font-chisel-regular: normal 400 1em/1 'Font Awesome 7 Chisel';
  --fa-font-utility-semibold: normal 600 1em/1 'Font Awesome 7 Utility';
  --fa-font-utility-duo-semibold: normal 600 1em/1 'Font Awesome 7 Utility Duo';
  --fa-font-utility-fill-semibold: normal 600 1em/1 'Font Awesome 7 Utility Fill';
}

.svg-inline--fa {
  box-sizing: content-box;
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285714em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left,
.svg-inline--fa .fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-pull-right,
.svg-inline--fa .fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  inset-block-start: 0.25em; /* syncing vertical alignment with Web Font rendering */
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.fa-layers .svg-inline--fa {
  inset: 0;
  margin: auto;
  position: absolute;
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: calc(10 / 16 * 1em); /* converts a 10px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 10 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 10 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xs {
  font-size: calc(12 / 16 * 1em); /* converts a 12px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 12 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 12 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-sm {
  font-size: calc(14 / 16 * 1em); /* converts a 14px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 14 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 14 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-lg {
  font-size: calc(20 / 16 * 1em); /* converts a 20px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 20 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 20 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xl {
  font-size: calc(24 / 16 * 1em); /* converts a 24px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 24 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 24 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-2xl {
  font-size: calc(32 / 16 * 1em); /* converts a 32px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 32 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 32 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-width-auto {
  --fa-width: auto;
}

.fa-fw,
.fa-width-fixed {
  --fa-width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-inline-start: var(--fa-li-margin, 2.5em);
  padding-inline-start: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

/* Heads Up: Bordered Icons will not be supported in the future!
  - This feature will be deprecated in the next major release of Font Awesome (v8)!
  - You may continue to use it in this version *v7), but it will not be supported in Font Awesome v8.
*/
/* Notes:
* --@{v.$css-prefix}-border-width = 1/16 by default (to render as ~1px based on a 16px default font-size)
* --@{v.$css-prefix}-border-padding =
  ** 3/16 for vertical padding (to give ~2px of vertical whitespace around an icon considering it's vertical alignment)
  ** 4/16 for horizontal padding (to give ~4px of horizontal whitespace around an icon)
*/
.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.0625em);
  box-sizing: var(--fa-border-box-sizing, content-box);
  padding: var(--fa-border-padding, 0.1875em 0.25em);
}

.fa-pull-left,
.fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right,
.fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
  .fa-bounce,
  .fa-fade,
  .fa-beat-fade,
  .fa-flip,
  .fa-pulse,
  .fa-shake,
  .fa-spin,
  .fa-spin-pulse {
    animation: none !important;
    transition: none !important;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.svg-inline--fa.fa-inverse {
  fill: var(--fa-inverse, #fff);
}

.fa-stack {
  display: inline-block;
  height: 2em;
  line-height: 2em;
  position: relative;
  vertical-align: middle;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.svg-inline--fa.fa-stack-1x {
  --fa-width: 1.25em;
  height: 1em;
  width: var(--fa-width);
}
.svg-inline--fa.fa-stack-2x {
  --fa-width: 2.5em;
  height: 2em;
  width: var(--fa-width);
}

.fa-stack-1x,
.fa-stack-2x {
  inset: 0;
  margin: auto;
  position: absolute;
  z-index: var(--fa-stack-z-index, auto);
}`;
function Xg() {
    var e = Dg,
        t = Ug,
        n = z.cssPrefix,
        r = z.replacementClass,
        i = pk;
    if (n !== e || r !== t) {
        var a = new RegExp('\\.'.concat(e, '\\-'), 'g'),
            o = new RegExp('\\--'.concat(e, '\\-'), 'g'),
            s = new RegExp('\\.'.concat(t), 'g');
        i = i
            .replace(a, '.'.concat(n, '-'))
            .replace(o, '--'.concat(n, '-'))
            .replace(s, '.'.concat(r));
    }
    return i;
}
var Pd = !1;
function Gs() {
    z.autoAddCss && !Pd && (ck(Xg()), (Pd = !0));
}
var gk = {
        mixout: function () {
            return { dom: { css: Xg, insertCss: Gs } };
        },
        hooks: function () {
            return {
                beforeDOMElementCreation: function () {
                    Gs();
                },
                beforeI2svg: function () {
                    Gs();
                }
            };
        }
    },
    Mt = nn || {};
Mt[It] || (Mt[It] = {});
Mt[It].styles || (Mt[It].styles = {});
Mt[It].hooks || (Mt[It].hooks = {});
Mt[It].shims || (Mt[It].shims = []);
var rt = Mt[It],
    Kg = [],
    Qg = function () {
        Q.removeEventListener('DOMContentLoaded', Qg),
            (Ao = 1),
            Kg.map(function (t) {
                return t();
            });
    },
    Ao = !1;
$t &&
    ((Ao = (Q.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(
        Q.readyState
    )),
    Ao || Q.addEventListener('DOMContentLoaded', Qg));
function yk(e) {
    $t && (Ao ? setTimeout(e, 0) : Kg.push(e));
}
function ea(e) {
    var t = e.tag,
        n = e.attributes,
        r = n === void 0 ? {} : n,
        i = e.children,
        a = i === void 0 ? [] : i;
    return typeof e == 'string'
        ? Gg(e)
        : '<'
              .concat(t, ' ')
              .concat(dk(r), '>')
              .concat(a.map(ea).join(''), '</')
              .concat(t, '>');
}
function jd(e, t, n) {
    if (e && e[t] && e[t][n]) return { prefix: t, iconName: n, icon: e[t][n] };
}
var Xs = function (t, n, r, i) {
    var a = Object.keys(t),
        o = a.length,
        s = n,
        l,
        u,
        f;
    for (
        r === void 0 ? ((l = 1), (f = t[a[0]])) : ((l = 0), (f = r));
        l < o;
        l++
    )
        (u = a[l]), (f = s(f, t[u], u, t));
    return f;
};
function qg(e) {
    return st(e).length !== 1 ? null : e.codePointAt(0).toString(16);
}
function Id(e) {
    return Object.keys(e).reduce(function (t, n) {
        var r = e[n],
            i = !!r.icon;
        return i ? (t[r.iconName] = r.icon) : (t[n] = r), t;
    }, {});
}
function mu(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
        r = n.skipHooks,
        i = r === void 0 ? !1 : r,
        a = Id(t);
    typeof rt.hooks.addPack == 'function' && !i
        ? rt.hooks.addPack(e, Id(t))
        : (rt.styles[e] = N(N({}, rt.styles[e] || {}), a)),
        e === 'fas' && mu('fa', t);
}
var Ui = rt.styles,
    vk = rt.shims,
    Jg = Object.keys(Oc),
    wk = Jg.reduce(function (e, t) {
        return (e[t] = Object.keys(Oc[t])), e;
    }, {}),
    Hc = null,
    Zg = {},
    ey = {},
    ty = {},
    ny = {},
    ry = {};
function xk(e) {
    return ~ak.indexOf(e);
}
function kk(e, t) {
    var n = t.split('-'),
        r = n[0],
        i = n.slice(1).join('-');
    return r === e && i !== '' && !xk(i) ? i : null;
}
var iy = function () {
    var t = function (a) {
        return Xs(
            Ui,
            function (o, s, l) {
                return (o[l] = Xs(s, a, {})), o;
            },
            {}
        );
    };
    (Zg = t(function (i, a, o) {
        if ((a[3] && (i[a[3]] = o), a[2])) {
            var s = a[2].filter(function (l) {
                return typeof l == 'number';
            });
            s.forEach(function (l) {
                i[l.toString(16)] = o;
            });
        }
        return i;
    })),
        (ey = t(function (i, a, o) {
            if (((i[o] = o), a[2])) {
                var s = a[2].filter(function (l) {
                    return typeof l == 'string';
                });
                s.forEach(function (l) {
                    i[l] = o;
                });
            }
            return i;
        })),
        (ry = t(function (i, a, o) {
            var s = a[2];
            return (
                (i[o] = o),
                s.forEach(function (l) {
                    i[l] = o;
                }),
                i
            );
        }));
    var n = 'far' in Ui || z.autoFetchSvg,
        r = Xs(
            vk,
            function (i, a) {
                var o = a[0],
                    s = a[1],
                    l = a[2];
                return (
                    s === 'far' && !n && (s = 'fas'),
                    typeof o == 'string' &&
                        (i.names[o] = { prefix: s, iconName: l }),
                    typeof o == 'number' &&
                        (i.unicodes[o.toString(16)] = {
                            prefix: s,
                            iconName: l
                        }),
                    i
                );
            },
            { names: {}, unicodes: {} }
        );
    (ty = r.names),
        (ny = r.unicodes),
        (Hc = ls(z.styleDefault, { family: z.familyDefault }));
};
uk(function (e) {
    Hc = ls(e.styleDefault, { family: z.familyDefault });
});
iy();
function Wc(e, t) {
    return (Zg[e] || {})[t];
}
function Sk(e, t) {
    return (ey[e] || {})[t];
}
function wn(e, t) {
    return (ry[e] || {})[t];
}
function ay(e) {
    return ty[e] || { prefix: null, iconName: null };
}
function bk(e) {
    var t = ny[e],
        n = Wc('fas', e);
    return (
        t ||
        (n ? { prefix: 'fas', iconName: n } : null) || {
            prefix: null,
            iconName: null
        }
    );
}
function rn() {
    return Hc;
}
var oy = function () {
    return { prefix: null, iconName: null, rest: [] };
};
function _k(e) {
    var t = ge,
        n = Jg.reduce(function (r, i) {
            return (r[i] = ''.concat(z.cssPrefix, '-').concat(i)), r;
        }, {});
    return (
        Fg.forEach(function (r) {
            (e.includes(n[r]) ||
                e.some(function (i) {
                    return wk[r].includes(i);
                })) &&
                (t = r);
        }),
        t
    );
}
function ls(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
        n = t.family,
        r = n === void 0 ? ge : n,
        i = ek[r][e];
    if (r === Ji && !e) return 'fad';
    var a = Ad[r][e] || Ad[r][i],
        o = e in rt.styles ? e : null,
        s = a || o || null;
    return s;
}
function Ek(e) {
    var t = [],
        n = null;
    return (
        e.forEach(function (r) {
            var i = kk(z.cssPrefix, r);
            i ? (n = i) : r && t.push(r);
        }),
        { iconName: n, rest: t }
    );
}
function Md(e) {
    return e.sort().filter(function (t, n, r) {
        return r.indexOf(t) === n;
    });
}
var zd = Rg.concat($g);
function us(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
        n = t.skipLookups,
        r = n === void 0 ? !1 : n,
        i = null,
        a = Md(
            e.filter(function (g) {
                return zd.includes(g);
            })
        ),
        o = Md(
            e.filter(function (g) {
                return !zd.includes(g);
            })
        ),
        s = a.filter(function (g) {
            return (i = g), !vg.includes(g);
        }),
        l = os(s, 1),
        u = l[0],
        f = u === void 0 ? null : u,
        c = _k(a),
        d = N(N({}, Ek(o)), {}, { prefix: ls(f, { family: c }) });
    return N(
        N(
            N({}, d),
            Tk({
                values: e,
                family: c,
                styles: Ui,
                config: z,
                canonical: d,
                givenPrefix: i
            })
        ),
        Ck(r, i, d)
    );
}
function Ck(e, t, n) {
    var r = n.prefix,
        i = n.iconName;
    if (e || !r || !i) return { prefix: r, iconName: i };
    var a = t === 'fa' ? ay(i) : {},
        o = wn(r, i);
    return (
        (i = a.iconName || o || i),
        (r = a.prefix || r),
        r === 'far' && !Ui.far && Ui.fas && !z.autoFetchSvg && (r = 'fas'),
        { prefix: r, iconName: i }
    );
}
var Nk = Fg.filter(function (e) {
        return e !== ge || e !== Ji;
    }),
    Ak = Object.keys(lu)
        .filter(function (e) {
            return e !== ge;
        })
        .map(function (e) {
            return Object.keys(lu[e]);
        })
        .flat();
function Tk(e) {
    var t = e.values,
        n = e.family,
        r = e.canonical,
        i = e.givenPrefix,
        a = i === void 0 ? '' : i,
        o = e.styles,
        s = o === void 0 ? {} : o,
        l = e.config,
        u = l === void 0 ? {} : l,
        f = n === Ji,
        c = t.includes('fa-duotone') || t.includes('fad'),
        d = u.familyDefault === 'duotone',
        g = r.prefix === 'fad' || r.prefix === 'fa-duotone';
    if (
        (!f && (c || d || g) && (r.prefix = 'fad'),
        (t.includes('fa-brands') || t.includes('fab')) && (r.prefix = 'fab'),
        !r.prefix && Nk.includes(n))
    ) {
        var w = Object.keys(s).find(function (b) {
            return Ak.includes(b);
        });
        if (w || u.autoFetchSvg) {
            var y = Vw.get(n).defaultShortPrefixId;
            (r.prefix = y),
                (r.iconName = wn(r.prefix, r.iconName) || r.iconName);
        }
    }
    return (r.prefix === 'fa' || a === 'fa') && (r.prefix = rn() || 'fas'), r;
}
var Pk = (function () {
        function e() {
            fw(this, e), (this.definitions = {});
        }
        return hw(e, [
            {
                key: 'add',
                value: function () {
                    for (
                        var n = this,
                            r = arguments.length,
                            i = new Array(r),
                            a = 0;
                        a < r;
                        a++
                    )
                        i[a] = arguments[a];
                    var o = i.reduce(this._pullDefinitions, {});
                    Object.keys(o).forEach(function (s) {
                        (n.definitions[s] = N(
                            N({}, n.definitions[s] || {}),
                            o[s]
                        )),
                            mu(s, o[s]);
                        var l = Oc[ge][s];
                        l && mu(l, o[s]), iy();
                    });
                }
            },
            {
                key: 'reset',
                value: function () {
                    this.definitions = {};
                }
            },
            {
                key: '_pullDefinitions',
                value: function (n, r) {
                    var i = r.prefix && r.iconName && r.icon ? { 0: r } : r;
                    return (
                        Object.keys(i).map(function (a) {
                            var o = i[a],
                                s = o.prefix,
                                l = o.iconName,
                                u = o.icon,
                                f = u[2];
                            n[s] || (n[s] = {}),
                                f.length > 0 &&
                                    f.forEach(function (c) {
                                        typeof c == 'string' && (n[s][c] = u);
                                    }),
                                (n[s][l] = u);
                        }),
                        n
                    );
                }
            }
        ]);
    })(),
    Ld = [],
    sr = {},
    vr = {},
    jk = Object.keys(vr);
function Ik(e, t) {
    var n = t.mixoutsTo;
    return (
        (Ld = e),
        (sr = {}),
        Object.keys(vr).forEach(function (r) {
            jk.indexOf(r) === -1 && delete vr[r];
        }),
        Ld.forEach(function (r) {
            var i = r.mixout ? r.mixout() : {};
            if (
                (Object.keys(i).forEach(function (o) {
                    typeof i[o] == 'function' && (n[o] = i[o]),
                        No(i[o]) === 'object' &&
                            Object.keys(i[o]).forEach(function (s) {
                                n[o] || (n[o] = {}), (n[o][s] = i[o][s]);
                            });
                }),
                r.hooks)
            ) {
                var a = r.hooks();
                Object.keys(a).forEach(function (o) {
                    sr[o] || (sr[o] = []), sr[o].push(a[o]);
                });
            }
            r.provides && r.provides(vr);
        }),
        n
    );
}
function pu(e, t) {
    for (
        var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), i = 2;
        i < n;
        i++
    )
        r[i - 2] = arguments[i];
    var a = sr[e] || [];
    return (
        a.forEach(function (o) {
            t = o.apply(null, [t].concat(r));
        }),
        t
    );
}
function In(e) {
    for (
        var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
        r < t;
        r++
    )
        n[r - 1] = arguments[r];
    var i = sr[e] || [];
    i.forEach(function (a) {
        a.apply(null, n);
    });
}
function an() {
    var e = arguments[0],
        t = Array.prototype.slice.call(arguments, 1);
    return vr[e] ? vr[e].apply(null, t) : void 0;
}
function gu(e) {
    e.prefix === 'fa' && (e.prefix = 'fas');
    var t = e.iconName,
        n = e.prefix || rn();
    if (t)
        return (
            (t = wn(n, t) || t), jd(sy.definitions, n, t) || jd(rt.styles, n, t)
        );
}
var sy = new Pk(),
    Mk = function () {
        (z.autoReplaceSvg = !1), (z.observeMutations = !1), In('noAuto');
    },
    zk = {
        i2svg: function () {
            var t =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : {};
            return $t
                ? (In('beforeI2svg', t),
                  an('pseudoElements2svg', t),
                  an('i2svg', t))
                : Promise.reject(
                      new Error('Operation requires a DOM of some kind.')
                  );
        },
        watch: function () {
            var t =
                    arguments.length > 0 && arguments[0] !== void 0
                        ? arguments[0]
                        : {},
                n = t.autoReplaceSvgRoot;
            z.autoReplaceSvg === !1 && (z.autoReplaceSvg = !0),
                (z.observeMutations = !0),
                yk(function () {
                    Fk({ autoReplaceSvgRoot: n }), In('watch', t);
                });
        }
    },
    Lk = {
        icon: function (t) {
            if (t === null) return null;
            if (No(t) === 'object' && t.prefix && t.iconName)
                return {
                    prefix: t.prefix,
                    iconName: wn(t.prefix, t.iconName) || t.iconName
                };
            if (Array.isArray(t) && t.length === 2) {
                var n = t[1].indexOf('fa-') === 0 ? t[1].slice(3) : t[1],
                    r = ls(t[0]);
                return { prefix: r, iconName: wn(r, n) || n };
            }
            if (
                typeof t == 'string' &&
                (t.indexOf(''.concat(z.cssPrefix, '-')) > -1 || t.match(tk))
            ) {
                var i = us(t.split(' '), { skipLookups: !0 });
                return {
                    prefix: i.prefix || rn(),
                    iconName: wn(i.prefix, i.iconName) || i.iconName
                };
            }
            if (typeof t == 'string') {
                var a = rn();
                return { prefix: a, iconName: wn(a, t) || t };
            }
        }
    },
    Ue = {
        noAuto: Mk,
        config: z,
        dom: zk,
        parse: Lk,
        library: sy,
        findIconDefinition: gu,
        toHtml: ea
    },
    Fk = function () {
        var t =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : {},
            n = t.autoReplaceSvgRoot,
            r = n === void 0 ? Q : n;
        (Object.keys(rt.styles).length > 0 || z.autoFetchSvg) &&
            $t &&
            z.autoReplaceSvg &&
            Ue.dom.i2svg({ node: r });
    };
function cs(e, t) {
    return (
        Object.defineProperty(e, 'abstract', { get: t }),
        Object.defineProperty(e, 'html', {
            get: function () {
                return e.abstract.map(function (r) {
                    return ea(r);
                });
            }
        }),
        Object.defineProperty(e, 'node', {
            get: function () {
                if ($t) {
                    var r = Q.createElement('div');
                    return (r.innerHTML = e.html), r.children;
                }
            }
        }),
        e
    );
}
function $k(e) {
    var t = e.children,
        n = e.main,
        r = e.mask,
        i = e.attributes,
        a = e.styles,
        o = e.transform;
    if (Uc(o) && n.found && !r.found) {
        var s = n.width,
            l = n.height,
            u = { x: s / l / 2, y: 0.5 };
        i.style = ss(
            N(
                N({}, a),
                {},
                {
                    'transform-origin': ''
                        .concat(u.x + o.x / 16, 'em ')
                        .concat(u.y + o.y / 16, 'em')
                }
            )
        );
    }
    return [{ tag: 'svg', attributes: i, children: t }];
}
function Rk(e) {
    var t = e.prefix,
        n = e.iconName,
        r = e.children,
        i = e.attributes,
        a = e.symbol,
        o = a === !0 ? ''.concat(t, '-').concat(z.cssPrefix, '-').concat(n) : a;
    return [
        {
            tag: 'svg',
            attributes: { style: 'display: none;' },
            children: [
                {
                    tag: 'symbol',
                    attributes: N(N({}, i), {}, { id: o }),
                    children: r
                }
            ]
        }
    ];
}
function Ok(e) {
    var t = ['aria-label', 'aria-labelledby', 'title', 'role'];
    return t.some(function (n) {
        return n in e;
    });
}
function Vc(e) {
    var t = e.icons,
        n = t.main,
        r = t.mask,
        i = e.prefix,
        a = e.iconName,
        o = e.transform,
        s = e.symbol,
        l = e.maskId,
        u = e.extra,
        f = e.watchable,
        c = f === void 0 ? !1 : f,
        d = r.found ? r : n,
        g = d.width,
        w = d.height,
        y = [z.replacementClass, a ? ''.concat(z.cssPrefix, '-').concat(a) : '']
            .filter(function (S) {
                return u.classes.indexOf(S) === -1;
            })
            .filter(function (S) {
                return S !== '' || !!S;
            })
            .concat(u.classes)
            .join(' '),
        b = {
            children: [],
            attributes: N(
                N({}, u.attributes),
                {},
                {
                    'data-prefix': i,
                    'data-icon': a,
                    class: y,
                    role: u.attributes.role || 'img',
                    viewBox: '0 0 '.concat(g, ' ').concat(w)
                }
            )
        };
    !Ok(u.attributes) &&
        !u.attributes['aria-hidden'] &&
        (b.attributes['aria-hidden'] = 'true'),
        c && (b.attributes[jn] = '');
    var m = N(
            N({}, b),
            {},
            {
                prefix: i,
                iconName: a,
                main: n,
                mask: r,
                maskId: l,
                transform: o,
                symbol: s,
                styles: N({}, u.styles)
            }
        ),
        h =
            r.found && n.found
                ? an('generateAbstractMask', m) || {
                      children: [],
                      attributes: {}
                  }
                : an('generateAbstractIcon', m) || {
                      children: [],
                      attributes: {}
                  },
        p = h.children,
        v = h.attributes;
    return (m.children = p), (m.attributes = v), s ? Rk(m) : $k(m);
}
function Fd(e) {
    var t = e.content,
        n = e.width,
        r = e.height,
        i = e.transform,
        a = e.extra,
        o = e.watchable,
        s = o === void 0 ? !1 : o,
        l = N(N({}, a.attributes), {}, { class: a.classes.join(' ') });
    s && (l[jn] = '');
    var u = N({}, a.styles);
    Uc(i) &&
        ((u.transform = mk({ transform: i, width: n, height: r })),
        (u['-webkit-transform'] = u.transform));
    var f = ss(u);
    f.length > 0 && (l.style = f);
    var c = [];
    return c.push({ tag: 'span', attributes: l, children: [t] }), c;
}
function Dk(e) {
    var t = e.content,
        n = e.extra,
        r = N(N({}, n.attributes), {}, { class: n.classes.join(' ') }),
        i = ss(n.styles);
    i.length > 0 && (r.style = i);
    var a = [];
    return a.push({ tag: 'span', attributes: r, children: [t] }), a;
}
var Ks = rt.styles;
function yu(e) {
    var t = e[0],
        n = e[1],
        r = e.slice(4),
        i = os(r, 1),
        a = i[0],
        o = null;
    return (
        Array.isArray(a)
            ? (o = {
                  tag: 'g',
                  attributes: {
                      class: ''.concat(z.cssPrefix, '-').concat(Ys.GROUP)
                  },
                  children: [
                      {
                          tag: 'path',
                          attributes: {
                              class: ''
                                  .concat(z.cssPrefix, '-')
                                  .concat(Ys.SECONDARY),
                              fill: 'currentColor',
                              d: a[0]
                          }
                      },
                      {
                          tag: 'path',
                          attributes: {
                              class: ''
                                  .concat(z.cssPrefix, '-')
                                  .concat(Ys.PRIMARY),
                              fill: 'currentColor',
                              d: a[1]
                          }
                      }
                  ]
              })
            : (o = { tag: 'path', attributes: { fill: 'currentColor', d: a } }),
        { found: !0, width: t, height: n, icon: o }
    );
}
var Uk = { found: !1, width: 512, height: 512 };
function Hk(e, t) {
    !Wg &&
        !z.showMissingIcons &&
        e &&
        console.error(
            'Icon with name "'
                .concat(e, '" and prefix "')
                .concat(t, '" is missing.')
        );
}
function vu(e, t) {
    var n = t;
    return (
        t === 'fa' && z.styleDefault !== null && (t = rn()),
        new Promise(function (r, i) {
            if (n === 'fa') {
                var a = ay(e) || {};
                (e = a.iconName || e), (t = a.prefix || t);
            }
            if (e && t && Ks[t] && Ks[t][e]) {
                var o = Ks[t][e];
                return r(yu(o));
            }
            Hk(e, t),
                r(
                    N(
                        N({}, Uk),
                        {},
                        {
                            icon:
                                z.showMissingIcons && e
                                    ? an('missingIconAbstract') || {}
                                    : {}
                        }
                    )
                );
        })
    );
}
var $d = function () {},
    wu =
        z.measurePerformance && ba && ba.mark && ba.measure
            ? ba
            : { mark: $d, measure: $d },
    ni = 'FA "7.2.0"',
    Wk = function (t) {
        return (
            wu.mark(''.concat(ni, ' ').concat(t, ' begins')),
            function () {
                return ly(t);
            }
        );
    },
    ly = function (t) {
        wu.mark(''.concat(ni, ' ').concat(t, ' ends')),
            wu.measure(
                ''.concat(ni, ' ').concat(t),
                ''.concat(ni, ' ').concat(t, ' begins'),
                ''.concat(ni, ' ').concat(t, ' ends')
            );
    },
    Bc = { begin: Wk, end: ly },
    Ga = function () {};
function Rd(e) {
    var t = e.getAttribute ? e.getAttribute(jn) : null;
    return typeof t == 'string';
}
function Vk(e) {
    var t = e.getAttribute ? e.getAttribute($c) : null,
        n = e.getAttribute ? e.getAttribute(Rc) : null;
    return t && n;
}
function Bk(e) {
    return (
        e &&
        e.classList &&
        e.classList.contains &&
        e.classList.contains(z.replacementClass)
    );
}
function Yk() {
    if (z.autoReplaceSvg === !0) return Xa.replace;
    var e = Xa[z.autoReplaceSvg];
    return e || Xa.replace;
}
function Gk(e) {
    return Q.createElementNS('http://www.w3.org/2000/svg', e);
}
function Xk(e) {
    return Q.createElement(e);
}
function uy(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
        n = t.ceFn,
        r = n === void 0 ? (e.tag === 'svg' ? Gk : Xk) : n;
    if (typeof e == 'string') return Q.createTextNode(e);
    var i = r(e.tag);
    Object.keys(e.attributes || []).forEach(function (o) {
        i.setAttribute(o, e.attributes[o]);
    });
    var a = e.children || [];
    return (
        a.forEach(function (o) {
            i.appendChild(uy(o, { ceFn: r }));
        }),
        i
    );
}
function Kk(e) {
    var t = ' '.concat(e.outerHTML, ' ');
    return (t = ''.concat(t, 'Font Awesome fontawesome.com ')), t;
}
var Xa = {
    replace: function (t) {
        var n = t[0];
        if (n.parentNode)
            if (
                (t[1].forEach(function (i) {
                    n.parentNode.insertBefore(uy(i), n);
                }),
                n.getAttribute(jn) === null && z.keepOriginalSource)
            ) {
                var r = Q.createComment(Kk(n));
                n.parentNode.replaceChild(r, n);
            } else n.remove();
    },
    nest: function (t) {
        var n = t[0],
            r = t[1];
        if (~Dc(n).indexOf(z.replacementClass)) return Xa.replace(t);
        var i = new RegExp(''.concat(z.cssPrefix, '-.*'));
        if ((delete r[0].attributes.id, r[0].attributes.class)) {
            var a = r[0].attributes.class.split(' ').reduce(
                function (s, l) {
                    return (
                        l === z.replacementClass || l.match(i)
                            ? s.toSvg.push(l)
                            : s.toNode.push(l),
                        s
                    );
                },
                { toNode: [], toSvg: [] }
            );
            (r[0].attributes.class = a.toSvg.join(' ')),
                a.toNode.length === 0
                    ? n.removeAttribute('class')
                    : n.setAttribute('class', a.toNode.join(' '));
        }
        var o = r.map(function (s) {
            return ea(s);
        }).join(`
`);
        n.setAttribute(jn, ''), (n.innerHTML = o);
    }
};
function Od(e) {
    e();
}
function cy(e, t) {
    var n = typeof t == 'function' ? t : Ga;
    if (e.length === 0) n();
    else {
        var r = Od;
        z.mutateApproach === Jx && (r = nn.requestAnimationFrame || Od),
            r(function () {
                var i = Yk(),
                    a = Bc.begin('mutate');
                e.map(i), a(), n();
            });
    }
}
var Yc = !1;
function fy() {
    Yc = !0;
}
function xu() {
    Yc = !1;
}
var To = null;
function Dd(e) {
    if (_d && z.observeMutations) {
        var t = e.treeCallback,
            n = t === void 0 ? Ga : t,
            r = e.nodeCallback,
            i = r === void 0 ? Ga : r,
            a = e.pseudoElementsCallback,
            o = a === void 0 ? Ga : a,
            s = e.observeMutationsRoot,
            l = s === void 0 ? Q : s;
        (To = new _d(function (u) {
            if (!Yc) {
                var f = rn();
                Lr(u).forEach(function (c) {
                    if (
                        (c.type === 'childList' &&
                            c.addedNodes.length > 0 &&
                            !Rd(c.addedNodes[0]) &&
                            (z.searchPseudoElements && o(c.target),
                            n(c.target)),
                        c.type === 'attributes' &&
                            c.target.parentNode &&
                            z.searchPseudoElements &&
                            o([c.target], !0),
                        c.type === 'attributes' &&
                            Rd(c.target) &&
                            ~ik.indexOf(c.attributeName))
                    )
                        if (c.attributeName === 'class' && Vk(c.target)) {
                            var d = us(Dc(c.target)),
                                g = d.prefix,
                                w = d.iconName;
                            c.target.setAttribute($c, g || f),
                                w && c.target.setAttribute(Rc, w);
                        } else Bk(c.target) && i(c.target);
                });
            }
        })),
            $t &&
                To.observe(l, {
                    childList: !0,
                    attributes: !0,
                    characterData: !0,
                    subtree: !0
                });
    }
}
function Qk() {
    To && To.disconnect();
}
function qk(e) {
    var t = e.getAttribute('style'),
        n = [];
    return (
        t &&
            (n = t.split(';').reduce(function (r, i) {
                var a = i.split(':'),
                    o = a[0],
                    s = a.slice(1);
                return o && s.length > 0 && (r[o] = s.join(':').trim()), r;
            }, {})),
        n
    );
}
function Jk(e) {
    var t = e.getAttribute('data-prefix'),
        n = e.getAttribute('data-icon'),
        r = e.innerText !== void 0 ? e.innerText.trim() : '',
        i = us(Dc(e));
    return (
        i.prefix || (i.prefix = rn()),
        t && n && ((i.prefix = t), (i.iconName = n)),
        (i.iconName && i.prefix) ||
            (i.prefix &&
                r.length > 0 &&
                (i.iconName =
                    Sk(i.prefix, e.innerText) || Wc(i.prefix, qg(e.innerText))),
            !i.iconName &&
                z.autoFetchSvg &&
                e.firstChild &&
                e.firstChild.nodeType === Node.TEXT_NODE &&
                (i.iconName = e.firstChild.data)),
        i
    );
}
function Zk(e) {
    var t = Lr(e.attributes).reduce(function (n, r) {
        return (
            n.name !== 'class' && n.name !== 'style' && (n[r.name] = r.value), n
        );
    }, {});
    return t;
}
function e2() {
    return {
        iconName: null,
        prefix: null,
        transform: ht,
        symbol: !1,
        mask: { iconName: null, prefix: null, rest: [] },
        maskId: null,
        extra: { classes: [], styles: {}, attributes: {} }
    };
}
function Ud(e) {
    var t =
            arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : { styleParser: !0 },
        n = Jk(e),
        r = n.iconName,
        i = n.prefix,
        a = n.rest,
        o = Zk(e),
        s = pu('parseNodeAttributes', {}, e),
        l = t.styleParser ? qk(e) : [];
    return N(
        {
            iconName: r,
            prefix: i,
            transform: ht,
            mask: { iconName: null, prefix: null, rest: [] },
            maskId: null,
            symbol: !1,
            extra: { classes: a, styles: l, attributes: o }
        },
        s
    );
}
var t2 = rt.styles;
function dy(e) {
    var t = z.autoReplaceSvg === 'nest' ? Ud(e, { styleParser: !1 }) : Ud(e);
    return ~t.extra.classes.indexOf(Bg)
        ? an('generateLayersText', e, t)
        : an('generateSvgReplacementMutation', e, t);
}
function n2() {
    return [].concat(st($g), st(Rg));
}
function Hd(e) {
    var t =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (!$t) return Promise.resolve();
    var n = Q.documentElement.classList,
        r = function (c) {
            return n.add(''.concat(Nd, '-').concat(c));
        },
        i = function (c) {
            return n.remove(''.concat(Nd, '-').concat(c));
        },
        a = z.autoFetchSvg ? n2() : vg.concat(Object.keys(t2));
    a.includes('fa') || a.push('fa');
    var o = ['.'.concat(Bg, ':not([').concat(jn, '])')]
        .concat(
            a.map(function (f) {
                return '.'.concat(f, ':not([').concat(jn, '])');
            })
        )
        .join(', ');
    if (o.length === 0) return Promise.resolve();
    var s = [];
    try {
        s = Lr(e.querySelectorAll(o));
    } catch {}
    if (s.length > 0) r('pending'), i('complete');
    else return Promise.resolve();
    var l = Bc.begin('onTree'),
        u = s.reduce(function (f, c) {
            try {
                var d = dy(c);
                d && f.push(d);
            } catch (g) {
                Wg || (g.name === 'MissingIcon' && console.error(g));
            }
            return f;
        }, []);
    return new Promise(function (f, c) {
        Promise.all(u)
            .then(function (d) {
                cy(d, function () {
                    r('active'),
                        r('complete'),
                        i('pending'),
                        typeof t == 'function' && t(),
                        l(),
                        f();
                });
            })
            .catch(function (d) {
                l(), c(d);
            });
    });
}
function r2(e) {
    var t =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    dy(e).then(function (n) {
        n && cy([n], t);
    });
}
function i2(e) {
    return function (t) {
        var n =
                arguments.length > 1 && arguments[1] !== void 0
                    ? arguments[1]
                    : {},
            r = (t || {}).icon ? t : gu(t || {}),
            i = n.mask;
        return (
            i && (i = (i || {}).icon ? i : gu(i || {})),
            e(r, N(N({}, n), {}, { mask: i }))
        );
    };
}
var a2 = function (t) {
        var n =
                arguments.length > 1 && arguments[1] !== void 0
                    ? arguments[1]
                    : {},
            r = n.transform,
            i = r === void 0 ? ht : r,
            a = n.symbol,
            o = a === void 0 ? !1 : a,
            s = n.mask,
            l = s === void 0 ? null : s,
            u = n.maskId,
            f = u === void 0 ? null : u,
            c = n.classes,
            d = c === void 0 ? [] : c,
            g = n.attributes,
            w = g === void 0 ? {} : g,
            y = n.styles,
            b = y === void 0 ? {} : y;
        if (t) {
            var m = t.prefix,
                h = t.iconName,
                p = t.icon;
            return cs(N({ type: 'icon' }, t), function () {
                return (
                    In('beforeDOMElementCreation', {
                        iconDefinition: t,
                        params: n
                    }),
                    Vc({
                        icons: {
                            main: yu(p),
                            mask: l
                                ? yu(l.icon)
                                : {
                                      found: !1,
                                      width: null,
                                      height: null,
                                      icon: {}
                                  }
                        },
                        prefix: m,
                        iconName: h,
                        transform: N(N({}, ht), i),
                        symbol: o,
                        maskId: f,
                        extra: { attributes: w, styles: b, classes: d }
                    })
                );
            });
        }
    },
    o2 = {
        mixout: function () {
            return { icon: i2(a2) };
        },
        hooks: function () {
            return {
                mutationObserverCallbacks: function (n) {
                    return (n.treeCallback = Hd), (n.nodeCallback = r2), n;
                }
            };
        },
        provides: function (t) {
            (t.i2svg = function (n) {
                var r = n.node,
                    i = r === void 0 ? Q : r,
                    a = n.callback,
                    o = a === void 0 ? function () {} : a;
                return Hd(i, o);
            }),
                (t.generateSvgReplacementMutation = function (n, r) {
                    var i = r.iconName,
                        a = r.prefix,
                        o = r.transform,
                        s = r.symbol,
                        l = r.mask,
                        u = r.maskId,
                        f = r.extra;
                    return new Promise(function (c, d) {
                        Promise.all([
                            vu(i, a),
                            l.iconName
                                ? vu(l.iconName, l.prefix)
                                : Promise.resolve({
                                      found: !1,
                                      width: 512,
                                      height: 512,
                                      icon: {}
                                  })
                        ])
                            .then(function (g) {
                                var w = os(g, 2),
                                    y = w[0],
                                    b = w[1];
                                c([
                                    n,
                                    Vc({
                                        icons: { main: y, mask: b },
                                        prefix: a,
                                        iconName: i,
                                        transform: o,
                                        symbol: s,
                                        maskId: u,
                                        extra: f,
                                        watchable: !0
                                    })
                                ]);
                            })
                            .catch(d);
                    });
                }),
                (t.generateAbstractIcon = function (n) {
                    var r = n.children,
                        i = n.attributes,
                        a = n.main,
                        o = n.transform,
                        s = n.styles,
                        l = ss(s);
                    l.length > 0 && (i.style = l);
                    var u;
                    return (
                        Uc(o) &&
                            (u = an('generateAbstractTransformGrouping', {
                                main: a,
                                transform: o,
                                containerWidth: a.width,
                                iconWidth: a.width
                            })),
                        r.push(u || a.icon),
                        { children: r, attributes: i }
                    );
                });
        }
    },
    s2 = {
        mixout: function () {
            return {
                layer: function (n) {
                    var r =
                            arguments.length > 1 && arguments[1] !== void 0
                                ? arguments[1]
                                : {},
                        i = r.classes,
                        a = i === void 0 ? [] : i;
                    return cs({ type: 'layer' }, function () {
                        In('beforeDOMElementCreation', {
                            assembler: n,
                            params: r
                        });
                        var o = [];
                        return (
                            n(function (s) {
                                Array.isArray(s)
                                    ? s.map(function (l) {
                                          o = o.concat(l.abstract);
                                      })
                                    : (o = o.concat(s.abstract));
                            }),
                            [
                                {
                                    tag: 'span',
                                    attributes: {
                                        class: [
                                            ''.concat(z.cssPrefix, '-layers')
                                        ]
                                            .concat(st(a))
                                            .join(' ')
                                    },
                                    children: o
                                }
                            ]
                        );
                    });
                }
            };
        }
    },
    l2 = {
        mixout: function () {
            return {
                counter: function (n) {
                    var r =
                        arguments.length > 1 && arguments[1] !== void 0
                            ? arguments[1]
                            : {};
                    r.title;
                    var i = r.classes,
                        a = i === void 0 ? [] : i,
                        o = r.attributes,
                        s = o === void 0 ? {} : o,
                        l = r.styles,
                        u = l === void 0 ? {} : l;
                    return cs({ type: 'counter', content: n }, function () {
                        return (
                            In('beforeDOMElementCreation', {
                                content: n,
                                params: r
                            }),
                            Dk({
                                content: n.toString(),
                                extra: {
                                    attributes: s,
                                    styles: u,
                                    classes: [
                                        ''.concat(
                                            z.cssPrefix,
                                            '-layers-counter'
                                        )
                                    ].concat(st(a))
                                }
                            })
                        );
                    });
                }
            };
        }
    },
    u2 = {
        mixout: function () {
            return {
                text: function (n) {
                    var r =
                            arguments.length > 1 && arguments[1] !== void 0
                                ? arguments[1]
                                : {},
                        i = r.transform,
                        a = i === void 0 ? ht : i,
                        o = r.classes,
                        s = o === void 0 ? [] : o,
                        l = r.attributes,
                        u = l === void 0 ? {} : l,
                        f = r.styles,
                        c = f === void 0 ? {} : f;
                    return cs({ type: 'text', content: n }, function () {
                        return (
                            In('beforeDOMElementCreation', {
                                content: n,
                                params: r
                            }),
                            Fd({
                                content: n,
                                transform: N(N({}, ht), a),
                                extra: {
                                    attributes: u,
                                    styles: c,
                                    classes: [
                                        ''.concat(z.cssPrefix, '-layers-text')
                                    ].concat(st(s))
                                }
                            })
                        );
                    });
                }
            };
        },
        provides: function (t) {
            t.generateLayersText = function (n, r) {
                var i = r.transform,
                    a = r.extra,
                    o = null,
                    s = null;
                if (gg) {
                    var l = parseInt(getComputedStyle(n).fontSize, 10),
                        u = n.getBoundingClientRect();
                    (o = u.width / l), (s = u.height / l);
                }
                return Promise.resolve([
                    n,
                    Fd({
                        content: n.innerHTML,
                        width: o,
                        height: s,
                        transform: i,
                        extra: a,
                        watchable: !0
                    })
                ]);
            };
        }
    },
    hy = new RegExp('"', 'ug'),
    Wd = [1105920, 1112319],
    Vd = N(
        N(N(N({}, { FontAwesome: { normal: 'fas', 400: 'fas' } }), Ww), Qx),
        Jw
    ),
    ku = Object.keys(Vd).reduce(function (e, t) {
        return (e[t.toLowerCase()] = Vd[t]), e;
    }, {}),
    c2 = Object.keys(ku).reduce(function (e, t) {
        var n = ku[t];
        return (e[t] = n[900] || st(Object.entries(n))[0][1]), e;
    }, {});
function f2(e) {
    var t = e.replace(hy, '');
    return qg(st(t)[0] || '');
}
function d2(e) {
    var t = e.getPropertyValue('font-feature-settings').includes('ss01'),
        n = e.getPropertyValue('content'),
        r = n.replace(hy, ''),
        i = r.codePointAt(0),
        a = i >= Wd[0] && i <= Wd[1],
        o = r.length === 2 ? r[0] === r[1] : !1;
    return a || o || t;
}
function h2(e, t) {
    var n = e.replace(/^['"]|['"]$/g, '').toLowerCase(),
        r = parseInt(t),
        i = isNaN(r) ? 'normal' : r;
    return (ku[n] || {})[i] || c2[n];
}
function Bd(e, t) {
    var n = ''.concat(qx).concat(t.replace(':', '-'));
    return new Promise(function (r, i) {
        if (e.getAttribute(n) !== null) return r();
        var a = Lr(e.children),
            o = a.filter(function (_) {
                return _.getAttribute(cu) === t;
            })[0],
            s = nn.getComputedStyle(e, t),
            l = s.getPropertyValue('font-family'),
            u = l.match(nk),
            f = s.getPropertyValue('font-weight'),
            c = s.getPropertyValue('content');
        if (o && !u) return e.removeChild(o), r();
        if (u && c !== 'none' && c !== '') {
            var d = s.getPropertyValue('content'),
                g = h2(l, f),
                w = f2(d),
                y = u[0].startsWith('FontAwesome'),
                b = d2(s),
                m = Wc(g, w),
                h = m;
            if (y) {
                var p = bk(w);
                p.iconName && p.prefix && ((m = p.iconName), (g = p.prefix));
            }
            if (
                m &&
                !b &&
                (!o || o.getAttribute($c) !== g || o.getAttribute(Rc) !== h)
            ) {
                e.setAttribute(n, h), o && e.removeChild(o);
                var v = e2(),
                    S = v.extra;
                (S.attributes[cu] = t),
                    vu(m, g)
                        .then(function (_) {
                            var k = Vc(
                                    N(
                                        N({}, v),
                                        {},
                                        {
                                            icons: { main: _, mask: oy() },
                                            prefix: g,
                                            iconName: h,
                                            extra: S,
                                            watchable: !0
                                        }
                                    )
                                ),
                                A = Q.createElementNS(
                                    'http://www.w3.org/2000/svg',
                                    'svg'
                                );
                            t === '::before'
                                ? e.insertBefore(A, e.firstChild)
                                : e.appendChild(A),
                                (A.outerHTML = k.map(function ($) {
                                    return ea($);
                                }).join(`
`)),
                                e.removeAttribute(n),
                                r();
                        })
                        .catch(i);
            } else r();
        } else r();
    });
}
function m2(e) {
    return Promise.all([Bd(e, '::before'), Bd(e, '::after')]);
}
function p2(e) {
    return (
        e.parentNode !== document.head &&
        !~Zx.indexOf(e.tagName.toUpperCase()) &&
        !e.getAttribute(cu) &&
        (!e.parentNode || e.parentNode.tagName !== 'svg')
    );
}
var g2 = function (t) {
        return (
            !!t &&
            Hg.some(function (n) {
                return t.includes(n);
            })
        );
    },
    y2 = function (t) {
        if (!t) return [];
        var n = new Set(),
            r = t.split(/,(?![^()]*\))/).map(function (l) {
                return l.trim();
            });
        r = r.flatMap(function (l) {
            return l.includes('(')
                ? l
                : l.split(',').map(function (u) {
                      return u.trim();
                  });
        });
        var i = Ya(r),
            a;
        try {
            for (i.s(); !(a = i.n()).done; ) {
                var o = a.value;
                if (g2(o)) {
                    var s = Hg.reduce(function (l, u) {
                        return l.replace(u, '');
                    }, o);
                    s !== '' && s !== '*' && n.add(s);
                }
            }
        } catch (l) {
            i.e(l);
        } finally {
            i.f();
        }
        return n;
    };
function Yd(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if ($t) {
        var n;
        if (t) n = e;
        else if (z.searchPseudoElementsFullScan) n = e.querySelectorAll('*');
        else {
            var r = new Set(),
                i = Ya(document.styleSheets),
                a;
            try {
                for (i.s(); !(a = i.n()).done; ) {
                    var o = a.value;
                    try {
                        var s = Ya(o.cssRules),
                            l;
                        try {
                            for (s.s(); !(l = s.n()).done; ) {
                                var u = l.value,
                                    f = y2(u.selectorText),
                                    c = Ya(f),
                                    d;
                                try {
                                    for (c.s(); !(d = c.n()).done; ) {
                                        var g = d.value;
                                        r.add(g);
                                    }
                                } catch (y) {
                                    c.e(y);
                                } finally {
                                    c.f();
                                }
                            }
                        } catch (y) {
                            s.e(y);
                        } finally {
                            s.f();
                        }
                    } catch (y) {
                        z.searchPseudoElementsWarnings &&
                            console.warn(
                                'Font Awesome: cannot parse stylesheet: '
                                    .concat(o.href, ' (')
                                    .concat(
                                        y.message,
                                        `)
If it declares any Font Awesome CSS pseudo-elements, they will not be rendered as SVG icons. Add crossorigin="anonymous" to the <link>, enable searchPseudoElementsFullScan for slower but more thorough DOM parsing, or suppress this warning by setting searchPseudoElementsWarnings to false.`
                                    )
                            );
                    }
                }
            } catch (y) {
                i.e(y);
            } finally {
                i.f();
            }
            if (!r.size) return;
            var w = Array.from(r).join(', ');
            try {
                n = e.querySelectorAll(w);
            } catch {}
        }
        return new Promise(function (y, b) {
            var m = Lr(n).filter(p2).map(m2),
                h = Bc.begin('searchPseudoElements');
            fy(),
                Promise.all(m)
                    .then(function () {
                        h(), xu(), y();
                    })
                    .catch(function () {
                        h(), xu(), b();
                    });
        });
    }
}
var v2 = {
        hooks: function () {
            return {
                mutationObserverCallbacks: function (n) {
                    return (n.pseudoElementsCallback = Yd), n;
                }
            };
        },
        provides: function (t) {
            t.pseudoElements2svg = function (n) {
                var r = n.node,
                    i = r === void 0 ? Q : r;
                z.searchPseudoElements && Yd(i);
            };
        }
    },
    Gd = !1,
    w2 = {
        mixout: function () {
            return {
                dom: {
                    unwatch: function () {
                        fy(), (Gd = !0);
                    }
                }
            };
        },
        hooks: function () {
            return {
                bootstrap: function () {
                    Dd(pu('mutationObserverCallbacks', {}));
                },
                noAuto: function () {
                    Qk();
                },
                watch: function (n) {
                    var r = n.observeMutationsRoot;
                    Gd
                        ? xu()
                        : Dd(
                              pu('mutationObserverCallbacks', {
                                  observeMutationsRoot: r
                              })
                          );
                }
            };
        }
    },
    Xd = function (t) {
        var n = { size: 16, x: 0, y: 0, flipX: !1, flipY: !1, rotate: 0 };
        return t
            .toLowerCase()
            .split(' ')
            .reduce(function (r, i) {
                var a = i.toLowerCase().split('-'),
                    o = a[0],
                    s = a.slice(1).join('-');
                if (o && s === 'h') return (r.flipX = !0), r;
                if (o && s === 'v') return (r.flipY = !0), r;
                if (((s = parseFloat(s)), isNaN(s))) return r;
                switch (o) {
                    case 'grow':
                        r.size = r.size + s;
                        break;
                    case 'shrink':
                        r.size = r.size - s;
                        break;
                    case 'left':
                        r.x = r.x - s;
                        break;
                    case 'right':
                        r.x = r.x + s;
                        break;
                    case 'up':
                        r.y = r.y - s;
                        break;
                    case 'down':
                        r.y = r.y + s;
                        break;
                    case 'rotate':
                        r.rotate = r.rotate + s;
                        break;
                }
                return r;
            }, n);
    },
    x2 = {
        mixout: function () {
            return {
                parse: {
                    transform: function (n) {
                        return Xd(n);
                    }
                }
            };
        },
        hooks: function () {
            return {
                parseNodeAttributes: function (n, r) {
                    var i = r.getAttribute('data-fa-transform');
                    return i && (n.transform = Xd(i)), n;
                }
            };
        },
        provides: function (t) {
            t.generateAbstractTransformGrouping = function (n) {
                var r = n.main,
                    i = n.transform,
                    a = n.containerWidth,
                    o = n.iconWidth,
                    s = { transform: 'translate('.concat(a / 2, ' 256)') },
                    l = 'translate('
                        .concat(i.x * 32, ', ')
                        .concat(i.y * 32, ') '),
                    u = 'scale('
                        .concat((i.size / 16) * (i.flipX ? -1 : 1), ', ')
                        .concat((i.size / 16) * (i.flipY ? -1 : 1), ') '),
                    f = 'rotate('.concat(i.rotate, ' 0 0)'),
                    c = {
                        transform: ''.concat(l, ' ').concat(u, ' ').concat(f)
                    },
                    d = {
                        transform: 'translate('.concat((o / 2) * -1, ' -256)')
                    },
                    g = { outer: s, inner: c, path: d };
                return {
                    tag: 'g',
                    attributes: N({}, g.outer),
                    children: [
                        {
                            tag: 'g',
                            attributes: N({}, g.inner),
                            children: [
                                {
                                    tag: r.icon.tag,
                                    children: r.icon.children,
                                    attributes: N(
                                        N({}, r.icon.attributes),
                                        g.path
                                    )
                                }
                            ]
                        }
                    ]
                };
            };
        }
    },
    Qs = { x: 0, y: 0, width: '100%', height: '100%' };
function Kd(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    return (
        e.attributes &&
            (e.attributes.fill || t) &&
            (e.attributes.fill = 'black'),
        e
    );
}
function k2(e) {
    return e.tag === 'g' ? e.children : [e];
}
var S2 = {
        hooks: function () {
            return {
                parseNodeAttributes: function (n, r) {
                    var i = r.getAttribute('data-fa-mask'),
                        a = i
                            ? us(
                                  i.split(' ').map(function (o) {
                                      return o.trim();
                                  })
                              )
                            : oy();
                    return (
                        a.prefix || (a.prefix = rn()),
                        (n.mask = a),
                        (n.maskId = r.getAttribute('data-fa-mask-id')),
                        n
                    );
                }
            };
        },
        provides: function (t) {
            t.generateAbstractMask = function (n) {
                var r = n.children,
                    i = n.attributes,
                    a = n.main,
                    o = n.mask,
                    s = n.maskId,
                    l = n.transform,
                    u = a.width,
                    f = a.icon,
                    c = o.width,
                    d = o.icon,
                    g = hk({ transform: l, containerWidth: c, iconWidth: u }),
                    w = {
                        tag: 'rect',
                        attributes: N(N({}, Qs), {}, { fill: 'white' })
                    },
                    y = f.children ? { children: f.children.map(Kd) } : {},
                    b = {
                        tag: 'g',
                        attributes: N({}, g.inner),
                        children: [
                            Kd(
                                N(
                                    {
                                        tag: f.tag,
                                        attributes: N(
                                            N({}, f.attributes),
                                            g.path
                                        )
                                    },
                                    y
                                )
                            )
                        ]
                    },
                    m = { tag: 'g', attributes: N({}, g.outer), children: [b] },
                    h = 'mask-'.concat(s || Td()),
                    p = 'clip-'.concat(s || Td()),
                    v = {
                        tag: 'mask',
                        attributes: N(
                            N({}, Qs),
                            {},
                            {
                                id: h,
                                maskUnits: 'userSpaceOnUse',
                                maskContentUnits: 'userSpaceOnUse'
                            }
                        ),
                        children: [w, m]
                    },
                    S = {
                        tag: 'defs',
                        children: [
                            {
                                tag: 'clipPath',
                                attributes: { id: p },
                                children: k2(d)
                            },
                            v
                        ]
                    };
                return (
                    r.push(S, {
                        tag: 'rect',
                        attributes: N(
                            {
                                fill: 'currentColor',
                                'clip-path': 'url(#'.concat(p, ')'),
                                mask: 'url(#'.concat(h, ')')
                            },
                            Qs
                        )
                    }),
                    { children: r, attributes: i }
                );
            };
        }
    },
    b2 = {
        provides: function (t) {
            var n = !1;
            nn.matchMedia &&
                (n = nn.matchMedia('(prefers-reduced-motion: reduce)').matches),
                (t.missingIconAbstract = function () {
                    var r = [],
                        i = { fill: 'currentColor' },
                        a = {
                            attributeType: 'XML',
                            repeatCount: 'indefinite',
                            dur: '2s'
                        };
                    r.push({
                        tag: 'path',
                        attributes: N(
                            N({}, i),
                            {},
                            {
                                d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z'
                            }
                        )
                    });
                    var o = N(N({}, a), {}, { attributeName: 'opacity' }),
                        s = {
                            tag: 'circle',
                            attributes: N(
                                N({}, i),
                                {},
                                { cx: '256', cy: '364', r: '28' }
                            ),
                            children: []
                        };
                    return (
                        n ||
                            s.children.push(
                                {
                                    tag: 'animate',
                                    attributes: N(
                                        N({}, a),
                                        {},
                                        {
                                            attributeName: 'r',
                                            values: '28;14;28;28;14;28;'
                                        }
                                    )
                                },
                                {
                                    tag: 'animate',
                                    attributes: N(
                                        N({}, o),
                                        {},
                                        { values: '1;0;1;1;0;1;' }
                                    )
                                }
                            ),
                        r.push(s),
                        r.push({
                            tag: 'path',
                            attributes: N(
                                N({}, i),
                                {},
                                {
                                    opacity: '1',
                                    d: 'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z'
                                }
                            ),
                            children: n
                                ? []
                                : [
                                      {
                                          tag: 'animate',
                                          attributes: N(
                                              N({}, o),
                                              {},
                                              { values: '1;0;0;0;0;1;' }
                                          )
                                      }
                                  ]
                        }),
                        n ||
                            r.push({
                                tag: 'path',
                                attributes: N(
                                    N({}, i),
                                    {},
                                    {
                                        opacity: '0',
                                        d: 'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z'
                                    }
                                ),
                                children: [
                                    {
                                        tag: 'animate',
                                        attributes: N(
                                            N({}, o),
                                            {},
                                            { values: '0;0;1;1;0;0;' }
                                        )
                                    }
                                ]
                            }),
                        {
                            tag: 'g',
                            attributes: { class: 'missing' },
                            children: r
                        }
                    );
                });
        }
    },
    _2 = {
        hooks: function () {
            return {
                parseNodeAttributes: function (n, r) {
                    var i = r.getAttribute('data-fa-symbol'),
                        a = i === null ? !1 : i === '' ? !0 : i;
                    return (n.symbol = a), n;
                }
            };
        }
    },
    E2 = [gk, o2, s2, l2, u2, v2, w2, x2, S2, b2, _2];
Ik(E2, { mixoutsTo: Ue });
Ue.noAuto;
var Ar = Ue.config;
Ue.library;
Ue.dom;
var my = Ue.parse;
Ue.findIconDefinition;
Ue.toHtml;
var C2 = Ue.icon;
Ue.layer;
Ue.text;
Ue.counter;
function N2(e) {
    return (e = e - 0), e === e;
}
function py(e) {
    return N2(e)
        ? e
        : ((e = e.replace(/[_-]+(.)?/g, (t, n) => (n ? n.toUpperCase() : ''))),
          e.charAt(0).toLowerCase() + e.slice(1));
}
var A2 = (e, t) =>
    Ve.createElement('stop', {
        key: `${t}-${e.offset}`,
        offset: e.offset,
        stopColor: e.color,
        ...(e.opacity !== void 0 && { stopOpacity: e.opacity })
    });
function T2(e) {
    return e.charAt(0).toUpperCase() + e.slice(1);
}
var Vn = new Map(),
    P2 = 1e3;
function j2(e) {
    if (Vn.has(e)) return Vn.get(e);
    const t = {};
    let n = 0;
    const r = e.length;
    for (; n < r; ) {
        const i = e.indexOf(';', n),
            a = i === -1 ? r : i,
            o = e.slice(n, a).trim();
        if (o) {
            const s = o.indexOf(':');
            if (s > 0) {
                const l = o.slice(0, s).trim(),
                    u = o.slice(s + 1).trim();
                if (l && u) {
                    const f = py(l);
                    t[f.startsWith('webkit') ? T2(f) : f] = u;
                }
            }
        }
        n = a + 1;
    }
    if (Vn.size === P2) {
        const i = Vn.keys().next().value;
        i && Vn.delete(i);
    }
    return Vn.set(e, t), t;
}
function gy(e, t, n = {}) {
    if (typeof t == 'string') return t;
    const r = (t.children || []).map((c) => {
            let d = c;
            return (
                ('fill' in n || n.gradientFill) &&
                    c.tag === 'path' &&
                    'fill' in c.attributes &&
                    (d = {
                        ...c,
                        attributes: { ...c.attributes, fill: void 0 }
                    }),
                gy(e, d)
            );
        }),
        i = t.attributes || {},
        a = {};
    for (const [c, d] of Object.entries(i))
        switch (!0) {
            case c === 'class': {
                a.className = d;
                break;
            }
            case c === 'style': {
                a.style = j2(String(d));
                break;
            }
            case c.startsWith('aria-'):
            case c.startsWith('data-'): {
                a[c.toLowerCase()] = d;
                break;
            }
            default:
                a[py(c)] = d;
        }
    const { style: o, role: s, 'aria-label': l, gradientFill: u, ...f } = n;
    if (
        (o && (a.style = a.style ? { ...a.style, ...o } : o),
        s && (a.role = s),
        l && ((a['aria-label'] = l), (a['aria-hidden'] = 'false')),
        u)
    ) {
        a.fill = `url(#${u.id})`;
        const { type: c, stops: d = [], ...g } = u;
        r.unshift(
            e(
                c === 'linear' ? 'linearGradient' : 'radialGradient',
                { ...g, id: u.id },
                d.map(A2)
            )
        );
    }
    return e(t.tag, { ...a, ...f }, ...r);
}
var I2 = gy.bind(null, Ve.createElement),
    Qd = (e, t) => {
        const n = E.useId();
        return e || (t ? n : void 0);
    },
    M2 = class {
        constructor(e = 'react-fontawesome') {
            this.enabled = !1;
            let t = !1;
            try {
                t = typeof process < 'u' && !1;
            } catch {}
            (this.scope = e), (this.enabled = t);
        }
        log(...e) {
            this.enabled && console.log(`[${this.scope}]`, ...e);
        }
        warn(...e) {
            this.enabled && console.warn(`[${this.scope}]`, ...e);
        }
        error(...e) {
            this.enabled && console.error(`[${this.scope}]`, ...e);
        }
    },
    z2 =
        'searchPseudoElementsFullScan' in Ar &&
        typeof Ar.searchPseudoElementsFullScan == 'boolean'
            ? '7.0.0'
            : '6.0.0',
    L2 = Number.parseInt(z2) >= 7,
    F2 = () => L2,
    xi = 'fa',
    wt = {
        beat: 'fa-beat',
        fade: 'fa-fade',
        beatFade: 'fa-beat-fade',
        bounce: 'fa-bounce',
        shake: 'fa-shake',
        spin: 'fa-spin',
        spinPulse: 'fa-spin-pulse',
        spinReverse: 'fa-spin-reverse',
        pulse: 'fa-pulse'
    },
    $2 = { left: 'fa-pull-left', right: 'fa-pull-right' },
    R2 = { 90: 'fa-rotate-90', 180: 'fa-rotate-180', 270: 'fa-rotate-270' },
    O2 = {
        '2xs': 'fa-2xs',
        xs: 'fa-xs',
        sm: 'fa-sm',
        lg: 'fa-lg',
        xl: 'fa-xl',
        '2xl': 'fa-2xl',
        '1x': 'fa-1x',
        '2x': 'fa-2x',
        '3x': 'fa-3x',
        '4x': 'fa-4x',
        '5x': 'fa-5x',
        '6x': 'fa-6x',
        '7x': 'fa-7x',
        '8x': 'fa-8x',
        '9x': 'fa-9x',
        '10x': 'fa-10x'
    },
    xt = {
        border: 'fa-border',
        fixedWidth: 'fa-fw',
        flip: 'fa-flip',
        flipHorizontal: 'fa-flip-horizontal',
        flipVertical: 'fa-flip-vertical',
        inverse: 'fa-inverse',
        rotateBy: 'fa-rotate-by',
        swapOpacity: 'fa-swap-opacity',
        widthAuto: 'fa-width-auto'
    };
function D2(e) {
    const t = Ar.cssPrefix || Ar.familyPrefix || xi;
    return t === xi
        ? e
        : e.replace(new RegExp(String.raw`(?<=^|\s)${xi}-`, 'g'), `${t}-`);
}
function U2(e) {
    const {
            beat: t,
            fade: n,
            beatFade: r,
            bounce: i,
            shake: a,
            spin: o,
            spinPulse: s,
            spinReverse: l,
            pulse: u,
            fixedWidth: f,
            inverse: c,
            border: d,
            flip: g,
            size: w,
            rotation: y,
            pull: b,
            swapOpacity: m,
            rotateBy: h,
            widthAuto: p,
            className: v
        } = e,
        S = [];
    return (
        v && S.push(...v.split(' ')),
        t && S.push(wt.beat),
        n && S.push(wt.fade),
        r && S.push(wt.beatFade),
        i && S.push(wt.bounce),
        a && S.push(wt.shake),
        o && S.push(wt.spin),
        l && S.push(wt.spinReverse),
        s && S.push(wt.spinPulse),
        u && S.push(wt.pulse),
        f && S.push(xt.fixedWidth),
        c && S.push(xt.inverse),
        d && S.push(xt.border),
        g === !0 && S.push(xt.flip),
        (g === 'horizontal' || g === 'both') && S.push(xt.flipHorizontal),
        (g === 'vertical' || g === 'both') && S.push(xt.flipVertical),
        w != null && S.push(O2[w]),
        y != null && y !== 0 && S.push(R2[y]),
        b != null && S.push($2[b]),
        m && S.push(xt.swapOpacity),
        F2()
            ? (h && S.push(xt.rotateBy),
              p && S.push(xt.widthAuto),
              (Ar.cssPrefix || Ar.familyPrefix || xi) === xi ? S : S.map(D2))
            : S
    );
}
var H2 = (e) => typeof e == 'object' && 'icon' in e && !!e.icon;
function qd(e) {
    if (e) return H2(e) ? e : my.icon(e);
}
function W2(e) {
    return Object.keys(e);
}
var Jd = new M2('FontAwesomeIcon'),
    yy = {
        border: !1,
        className: '',
        mask: void 0,
        maskId: void 0,
        fixedWidth: !1,
        inverse: !1,
        flip: !1,
        icon: void 0,
        listItem: !1,
        pull: void 0,
        pulse: !1,
        rotation: void 0,
        rotateBy: !1,
        size: void 0,
        spin: !1,
        spinPulse: !1,
        spinReverse: !1,
        beat: !1,
        fade: !1,
        beatFade: !1,
        bounce: !1,
        shake: !1,
        symbol: !1,
        title: '',
        titleId: void 0,
        transform: void 0,
        swapOpacity: !1,
        widthAuto: !1
    },
    V2 = new Set(Object.keys(yy)),
    vy = Ve.forwardRef((e, t) => {
        const n = { ...yy, ...e },
            {
                icon: r,
                mask: i,
                symbol: a,
                title: o,
                titleId: s,
                maskId: l,
                transform: u
            } = n,
            f = Qd(l, !!i),
            c = Qd(s, !!o),
            d = qd(r);
        if (!d) return Jd.error('Icon lookup is undefined', r), null;
        const g = U2(n),
            w = typeof u == 'string' ? my.transform(u) : u,
            y = qd(i),
            b = C2(d, {
                ...(g.length > 0 && { classes: g }),
                ...(w && { transform: w }),
                ...(y && { mask: y }),
                symbol: a,
                title: o,
                titleId: c,
                maskId: f
            });
        if (!b) return Jd.error('Could not find icon', d), null;
        const { abstract: m } = b,
            h = { ref: t };
        for (const p of W2(n)) V2.has(p) || (h[p] = n[p]);
        return I2(m[0], h);
    });
vy.displayName = 'FontAwesomeIcon';
/*!
 * Font Awesome Free 7.2.0 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2026 Fonticons, Inc.
 */ var B2 = {
    prefix: 'fas',
    iconName: 'caret-right',
    icon: [
        256,
        512,
        [],
        'f0da',
        'M249.3 235.8c10.2 12.6 9.5 31.1-2.2 42.8l-128 128c-9.2 9.2-22.9 11.9-34.9 6.9S64.5 396.9 64.5 384l0-256c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l128 128 2.2 2.4z'
    ]
};
const Y2 = 'The Decline of the Liberal Arts at UChicago',
    G2 = 'The Decline of the Liberal Arts at UChicago, by the Numbers',
    X2 =
        'Over the past decade, the share of students majoring in the humanities and arts has declined while business economics has exploded—realizing long-standing fears about the pre-professionalization of the College.',
    K2 = [
        "Data and Reporting by <a href='https://chicagomaroon.com/staff_name/ari-jacob' style='color: maroon;'>Ari Jacob</a>",
        "Graphics and Design by <a href='https://chicagomaroon.com/staff_name/ari-jacob' style='color: maroon;'>Ari Jacob</a> and <a href='https://chicagomaroon.com/staff_name/nolan-shaffer' style='color: maroon;'>Nolan Shaffer</a>",
        'May 21, 2026'
    ],
    Q2 = [
        'Over the past 20 years, the economics major at UChicago has doubled in size…',
        '...even though it has barely grown at peer institutions.',
        'The primary driver of this growth? Business economics.',
        'All the while, the humanities and arts have been steadily declining.'
    ],
    qs = [
        'The University of Chicago is having an identity crisis. It’s been going on for more than a hundred years, but now things feel different.',
        'The University has long faced questions about its ability to maintain an intellectually serious liberal arts college within the apparatus of a large research university. For John Boyer, former dean of the College and a fixture at the University for over 50 years, hearing complaints from students about this tension is an annual ritual.',
        'He hears, “‘I’m a third- or fourth-year student. I’ve heard that the new first-year class is very different. They’re not worthy of the College; they’re more pre-professional, more vocationally oriented,’” he <a href="https://chicagomaroon.com/47694/grey-city/where-are-all-the-real-chicago-intellectuals/">recounted</a> to the <em>Maroon</em> last spring. But, at least for the past decade, students <em>have</em> grown increasingly different from their predecessors.',
        "Students’ majors have shifted dramatically in recent years. At the school <a href='https://chicagomaroon.com/48399/grey-city/is-uchicago-really-the-last-bastion-of-reading/'>described</a> in the <em>Atlantic</em> not so long ago as the “last bastion” of people who read, the humanities and arts are declining at least as quickly as at peer institutions. This decline touches all but three humanities majors. The rest are proportionally smaller than they were 20 years ago.",
        "At the same time, the economics major has experienced unprecedented growth. Last year, over 40 percent of students graduated with a degree in economics—double the share from 20 years ago. The most obvious culprit is the business economics specialization <a href='https://chicagomaroon.com/26461/news/checking-new-business-economics-track/'>introduced</a> in 2018.",
        "The business economics specialization—affectionately referred to as “Bizcon” by students—adds Booth School of Business classes to the standard economic major’s curriculum with the goal of <a href='https://economics.uchicago.edu/undergraduate-study/curriculum/business-economics-specialization'>providing</a> students with career-related skills in economics <a href='https://drive.google.com/file/d/0B6dBGa2vEc-gcE5YZlE1QzJTeDhVNHZPUWR6WVZIT1FkWHNZ/view?resourcekey=0-WfqmTg6rAENGJ8hL-gXHVA'>without</a> the mathematical rigor of the standard economics track. It shares no required classes with its standard track counterpart, setting it apart from specializations in other majors.",
        'At least in terms of enrollment numbers, the specialization has been a resounding success. Data from the Department of Economics, shared with the <em>Maroon</em> under an agreement not to publish precise numbers, shows that the total number of students in the standard track has decreased since 2018, even as the population of the College as a whole has grown. Today, the economics major offers three tracks—with a fourth politics and policy track to come. But well over half of economics majors opt for the business specialization.',
        "The University offers itself as an alternative to its pre-professionally focused peer institutions. Indeed, Chicago <a href='https://www.youtube.com/watch?v=COoIIDysF20'>touts</a> its substantial general education requirements and <a href='https://collegeadmissions.uchicago.edu/campus-life/supporting-our-community/'>advertises</a> an intellectual culture to prospective students.",
        "However, the rapid expansion of the economics major is unique to Chicago. Rather than bringing it in line with the Ivy Plus, the growth has launched Chicago to the top of the pre-professional pack. Today, the economics major at Chicago is as large as the combined finance, business, and economics majors at the University of Pennsylvania, a school long <a href='https://talk.collegeconfidential.com/t/true-false-penn-is-very-pre-professional/1289851'>viewed</a> as pre-professionally oriented.",
        'Professors are taking note. Sarah Newman, a professor in the Department of Anthropology, had a particular notion of the typical UChicago student before coming to campus. She imagined them as “very quirky, very intellectual… interested in deep thinking and a little bit of a classical education.” But as a faculty member since 2019, and now as director of undergraduate studies for her department, she has seen things change.',
        '“Even in the time that I’ve been here, there’s been a shift towards basically pre-professionalization,” Newman remarked. This change is not universal, and Newman knows students who fit the “original Chicago” mold. But to her, more and more, students are thinking not about whether they enjoy their classes but rather about what boxes those classes will check. “It’s very much like people are thinking that the college years are just a stepping stone to the next real thing.”',
        'For some students, the result is a student body that falls short of their expectations. “I think I’ve had to be more intentional about finding those niches and people and spaces where the discussion is still very much alive,” said fourth-year Ruby Velez, a human rights and Law, Letters, and Society (LLSO) double major. “Not to say that it doesn’t exist, but I think you have to look for it more than I thought you would have had to.”',
        'This pre-professionalization is epitomized in the curriculum of the business economics specialization. The appeal of Booth classes is the skills they provide, according to third-year business economics major Yero Diamanka. “Unlike in the College, classes in Booth are so applicable,” he said. “For marketing management, we get cases every single week on a company that we chose. At the end, we have to pick a company and add a new business line, [then] do all of the modeling and all of the financial stuff.”',
        'This pre-professionalism isn’t contained to the Charles M. Harper Center. “The job fair this fall was a total mess,” said Ethan Jick, a fourth-year astrophysics and business economics major. He recalled attending Career Advancement’s annual fair in Ida Noyes Hall this September, standing in a sea of students modeling various interpretations of business casual. “There [were] probably many hundreds of kids in there, a bunch of employers, and... long lines. Half of [the employers] weren’t even hiring,” he added.',
        'This mindset is directly affecting students’ major decisions. When Vincent Li, now a fourth-year, came to the University, he wanted to major in human rights and become a human rights lawyer, but his friends quickly persuaded him that there was no way to justify such a career given the tuition he was paying. “‘You have to be an investment banker or a consultant,’” he recalled them saying. “‘It doesn’t really make sense that you’re spending $80k and then pursuing something that doesn’t pay off financially.’” Now a business economics and LLSO major, Li plans to go into consulting after graduation.'
    ],
    q2 = 'The Rise of Business Economics',
    Ea = [
        'There is a fiefdom in Saieh Hall, and it’s growing. Next to the hallway with the faded sepia photos of Ph.D. students past, home to administrator of legend Julie Wong, sits the undergraduate economics wing. Over this past winter break, the University embarked on renovations, intending to make room for more instructional professors by shrinking existing offices. When I was down there recently, I saw one temporarily evicted instructional professor lugging a monitor and pogo stick out of his office.',
        'The expansion, prompted by growing demand for the business economics major, is part of a broader surge in the department’s instructional faculty hiring. The headcount of these instructors has more than quintupled, increasing from just four in 2001 to more than 20 today. Kanit Kuevibulvanich, the professor with the pogo stick, taught 545 students in the Principles of Macroeconomics course for business economics this academic year. He is just one instructor: overall 2,088 students enrolled in the introductory micro- and macroeconomics courses taught in Kent Chemical Laboratory, a building whose lecture halls have transformed it into the cathedral of business economics.',
        'The growth that brought economics to this point has been “explosive,” Victor Lima, codirector of undergraduate studies in the Department of Economics, told me. “It’s been tough adapting… and we really haven’t been able to keep up.” To put this size in context, the two introductory courses in computer science, the second-largest major on campus, are less than half the size of the introductory economics classes.',
        'Kevin Guo, a third-year studying business economics and LLSO, put his economic training to use when prescribing a cure for the enrollment issues faced by his major: “They can reduce demand, which is to make the major harder, or they can increase supply, which is to just hire more professors.”',
        'Lima agreed with Guo’s framing. “As the demand for the degree grows, you have to increase the supply.” He described the business economics major as having “reduced the entry cost of the degree.” No longer must students complete a yearlong sequence in economic theory and a year of statistics and econometrics before moving on to electives. Now, after completing just two introductory economics courses, Lima says students are free to go in “a bunch of different directions.”',
        'One consequence of these lower costs is that students may be funneled into business economics out of a fear of more technical coursework, rather than because the specialization is a better fit. Describing his decision to choose business economics, Li said that he was “a little scared of economics.” He went on to say that he has since taken some classes in the standard track. “I don’t find them as challenging as I expected. So, if I didn’t have that sort of irrational fear coming in, maybe I would have chosen the standard econ track.”',
        'The new economics students often come from a variety of other fields, including the arts and humanities. Like business economics, these fields do not require advanced math, and many of their students enter consulting after college. Third-year Audrey Hui, who is majoring in business economics and media arts and design, said that, if business economics didn’t exist, she could have “been pretty happy as an English or creative writing major” and would have still planned to do consulting after college. Students like Hui who may have previously majored solely in English or other humanities disciplines are now choosing business economics. This may explain why, after remaining roughly constant for several years after 2012, the number of arts and humanities majors has declined by 15 percent since the establishment of the business economics specialization.',
        "Perhaps the major which has lost the most students to business economics is public policy. After steadily growing since 2005, public policy has declined steeply since 2018—the year business economics launched. The 50 percent decline was more than any other major. Last month, perhaps in an effort to increase enrollment in public policy classes, the economics major <a href='https://chicagomaroon.com/51823/news/uchicago-launches-interdisciplinary-economics-major-specialization-law-and-political-economy-minor/'>announced</a> a new specialization in politics and policy starting in the 2026–27 academic year, in partnership with the Harris School of Public Policy. The track requires taking two classes offered through Harris.",
        'The exodus from public policy alongside the growth of business economics could stem from the shared intellectual style of these majors. Both are quantitative social sciences that don’t require advanced mathematics, making them available to a broader range of students. They also orient themselves toward applied problems, albeit ones of different natures. This contrasts the theoretical or critical debates that drive other social science disciplines such as sociology and anthropology.',
        "One could imagine that the growth of the economics major is the product of an effort on the part of admissions officers to admit a new “type” of student to the University. This type of student is less quirky and intellectual: think undergraduate finance club, then investment banking in New York City, then private equity or venture capital. But, if that were the goal, selecting students by their prospective major would be a poor way to achieve it. Applicants often <a href='https://chicagomaroon.com/41774/grey-city/whats-the-incentive-sellout-culture-at-uchicago/'>strategically lie</a> about their intended major to improve their admissions chances. Believing that the University looks to populate the class with a diverse set of majors, they might present, for instance, as sociology or global studies majors, when they actually intend to major in business economics. Furthermore, many students depart from their intended major without any prior intent to do so as they develop a better understanding of themselves in college.",
        "However, the difficulty of selecting students based on majors does not preclude a more subtle version of the strategy to change the College. Even if the University isn’t explicitly selecting for a different type of student, changes it has made to the College might attract a different set of applicants, crowding out those who fit the more traditional archetype of a UChicago student. Two such moves are the creation of the business economics specialization and the <a href='https://chicagomaroon.com/15801/news/career-services-renamed-expanded/'>expansion</a> of the Career Advancement office—which <a href='https://collegeadmissions.uchicago.edu'>features</a> prominently on the admissions website. And although leading with “Student Success Beyond the Classroom” on that website might help reassure parents that UChicago will provide their children the career resources they need, it seems hard to imagine that this doesn’t also attract students that are themselves more focused on their post-college career.",
        "Another potential cause of these changes lies outside of the University’s control. Professor Peggy Heffington, associate director of undergraduate studies in the Department of History, told me that she hears “students talking about a return on investment.” This cost-benefit thinking, a recurrent theme in my interviews with professors, comes at a time when students are facing <a href='https://research.collegeboard.org/media/pdf/Trends-in-College-Pricing-and-Student-Aid-2025-final_1.pdf'>rising</a> tuition bills and a <a href='https://www.nytimes.com/2026/03/24/business/economy/college-graduates-job-market-hiring.html'>worsening</a> <a href='https://www.clevelandfed.org/publications/economic-commentary/2025/ec-202514-are-young-college-graduates-losing-their-edge-in-the-job-market'>entry-level</a> job market. The <a href='https://iop.harvard.edu/youth-poll/51st-edition-fall-2025?utm_source=newsletter&utm_medium=email&utm_campaign=newsletter_axiosam&stream=top'>resulting</a> career anxiety may have made the business economics specialization an increasingly attractive option for those seeking both prestige and security.",
        'These wider economic concerns are causing students to reevaluate the value proposition of the humanities. “I did not apply Marx to my job,” quipped Nancy Martinez, a fourth-year majoring in business economics, when asked whether the classes she had taken were useful at her consulting internship last summer.',
        'This reevaluation leads to students prioritizing career preparation over the enjoyment of their classes. After Diamanka secured an internship, he decided to add a minor in Molecular Engineering. “I was like, ‘I’m fine now,’ [so] now I’ll do something that actually interests me.” It seems that many students are majoring in economics despite their lack of interest in the subject. Kaisen Krishnamurthy, a first-year prospective economics major, speculated that some of his friends who plan to study economics are doing it just because “they want to have a financially stable major.”',
        'But even if students do find economics interesting, career benefits are often a crucial consideration. “I didn’t want to do anything in the humanities, because I think that I’m a pretty practical person,” Martinez said. “I wanted to have a degree that would somehow be able to actually help me post-college.” She added that being a first-generation, low-income student reinforced this mindset. “I feel like there was an added pressure that my parents never really put on me, but [that] I put on myself, to make sure that going to college was worth it and that their struggles and their sacrifices would amount to something.”',
        "In 2024, 98 percent of graduates <a href='https://web.archive.org/web/20250510005045/https://careeradvancement.uchicago.edu/about-us/post-college-outcomes/'>expected</a> to receive offers for employment, graduate school, or another post-college opportunity, <a href='https://naceweb.org/docs/default-source/default-document-library/2025/publication/free-report/nace-first-destinations-college-class-of-2024.pdf?sfvrsn=f4bd5f6a_6'>compared</a> to a national average of 86 percent. Is an acute fear of joblessness really the primary driver of these changes? While it might be part of the story for some students, the decision to major in economics may be driven less by economic anxiety than a desire for a high-status, well-paying career. “Yes, finance is boring. Yes, it’s not the best thing. But I think there is a lot of power in finance,” Diamanka said.",
        'However, at this point the data presents a puzzle: if business economics is useful for landing jobs in finance, and students are majoring in business economics to get these lucrative jobs, then we would expect the share of students working in this industry to increase. But the share of students working in finance and business after graduating from Chicago <em>has not changed</em> since the introduction of the business economics specialization in 2018.',
        "One explanation for this puzzle is that students overestimate the importance of their major for getting these jobs, believing that having <em>business</em> economics on their resume, an easier workload, and the extra time for recruiting will <a href='https://chicagomaroon.com/50445/grey-city/life-of-the-mind-to-life-on-wall-street/'>give</a> them a competitive advantage in the hiring process. In reality, for target schools—schools like UChicago, from which finance industries actively recruit—a student’s major <a href='https://www.wallstreetoasis.com/faq/does-my-major-matter-when-it-comes-to-getting-a-finance-job'>is far less important</a> than their relevant experience and enrollment in specific classes such as financial accounting and corporate finance. If the signal that comes with business economics doesn’t improve students’ ability to land these jobs, then we would not expect to see the number of students going into these industries rise even as the number of business economics majors rise. And, in fact, the University is not seeing an increase.",
        'Furthermore, at least to some students, business economics may not be about academics or the signal so much as the peer network. For Diamanka, choosing a career came before choosing a major. Once he decided he was going to do finance, business economics became the natural choice. “I knew I wasn’t going to get the skills I needed for the job, but it’s more so about being in the finance bubble,” he said. “You’re taking the same classes, you’re then going to recruit together, then post-recruiting, and then going through the job.”',
        'Other students think the focus on business economics for finance is misguided in a deeper sense. Shravan Hari, a third-year triple majoring in economics, mathematics, and statistics, said that standard economics provides a better preparation for careers in business and finance than business economics. “If you want to do anything in finance, you are probably better off learning all the economic theory in standard econ and then doing what you want with it post-graduation,” he said. In this view, the focus on pre-professionalism—and the move away from a liberal arts education—might be all for naught.'
    ],
    J2 = '“A Symptom of Something Much Deeper”',
    Js = [
        'Before John D. Rockefeller had even agreed to fund the University, debates began over the identity of the soon-to-be institution. These debates centered on whether the new institution would be a four-year liberal arts college or a full-fledged research university, rivaling the Ivy League schools 800 miles to its east. The latter vision ultimately won out, and its primary advocate, William Rainey Harper, would be inaugurated as the school’s first president in 1891.',
        'This clash, recounted at length in Boyer’s <em>The University of Chicago: A History</em>, gave way to fresh debate in 1931. The University introduced its first general education curriculum—the New Plan—built around five yearlong lecture-based sequences and end-of-year examinations. In Boyer’s telling, the New Plan marked the “beginning of an extraordinary odyssey” for the College.',
        'But the curriculum soon faced criticism. Robert Maynard Hutchins, who ironically was instrumental to the creation of the New Plan, argued alongside others that it had caused an “information disease” to infect the University. Hutchins and his allies moved to modify the New Plan so that the curriculum focused not on conveying knowledge but on teaching students how to approach problems, read and write critically, and understand the assumptions upon which arguments rest. In practice, this meant a culture of small-group learning, regular feedback and participation, and a humanistic (rather than scientific) approach. These are the pillars of a liberal arts education.',
        'Around this time, the hyper intellectual culture of the College began to solidify. During the curriculum battles, proponents of each side debated whether facts or ideas should reign supreme in front of hundreds of students in Mandel Hall. Then, in 1939, in a moment that has become more than a little clichéd, Hutchins abolished the football program as further means of cementing this culture.',
        "The Chicago approach to education—an approach that <a href='https://college.uchicago.edu/about/our-history-culture'>states</a> that knowing how to think is more valuable than knowing any set of skills or facts—forcefully emerged during this decade.",
        'To some today, this approach disregards modern-day realities. “I think that it’s nice that they emphasize a well-rounded knowledge,” Martinez said. “That being said, I think that, if the Core continues to exist, it should be minimized… It can be a slight imposition, especially for a lot of students I know who are very ambitious and want to do all these majors and minors.”',
        'Rather than the foundation of an education, some students see the Core as a secondary set of requirements, an impediment to be maneuvered around. “I think if it imposes on students’ ability to actually take advantage of the four years that they’re here and take classes that they want to be in, not that are forced upon them, then I think it can be harmful,” Martinez said.',
        "While some might lament that this perspective has now taken hold among students, claims of a deteriorating intellectual and academic culture are not new to the University. In the 1990s, when the school set out to improve the undergraduate experience by reforming the Core and investing in student buildings like Ratner Athletic Center and the Reynolds Club, many <a href='https://www.wsj.com/articles/SB928363145389536102'>expressed</a> fears about the demise of the University’s “life of the mind” ethos.",
        "Although the reforms passed, there was pushback from many in the University community, and people outside of Hyde Park took notice. “The core controversy is only a symptom of something much deeper: a rapidly changing institutional self-image and intellectual culture,” <a href='https://www.wsj.com/articles/SB928363145389536102'>read</a> one editorial in the <em>Wall Street Journal</em>. The <em>New York Times</em> <a href='https://www.nytimes.com/1998/12/28/us/winds-of-academic-change-rustle-university-of-chicago.html'>wrote</a> that, “with colleges today increasingly viewed as employment credentialing stations, students as customers, and learning for its own sake as a quaint idea whose time has passed, the University of Chicago finds itself a victim of its own high-mindedness and a painful identity crisis.”",
        'Since its inception, the University has faced tensions between contrasting visions of itself. In these struggles, change acts as a Rorschach test: the school’s identity has always been up for grabs. But 30 years in, as we enter the late stages of the pre-professional angst that these writers began to identify in the ’90s, the changing student body and the rise of business economics are bringing these fears to fruition.'
    ],
    Z2 = 'The Humanities Falling in Line',
    Zs = [
        'I had missed my first meeting with Newman, so I got to Haskell Hall early for our second one. While waiting, I sat in a corner armchair on the mezzanine level, where the low ceilings and warm light made the space as cozy as a public building can reasonably be. A woman approached me and introduced herself—she was a professor in the department. “What’s your name? I haven’t seen you around here,” she said. I explained that I wasn’t an anthropology major (no, not a prospective one either) and that I was there to talk with Newman.',
        'The anthropology major has always been small, but it is half the size today that it was 20 years ago. Other humanities and social science departments share a similar arc. Political science and English language and literature, which together used to account for around a fifth of the undergraduate student body, have declined more than 50 percent over the past two decades.',
        "In line with economic explanations, the decline in humanities majors at Chicago began with those entering the College around the 2008 financial crisis. The decline in humanities enrollments also <a href='https://www.amacad.org/humanities-indicators/higher-education/bachelors-degrees-humanities'>appears</a> around this time when examining enrollment at other universities and colleges across the country.",
        'Decreased interest in humanities doesn’t mean that students see no value in a liberal arts education. Diamanka ended up choosing UChicago over the University of Pennsylvania and Stanford University because of the University’s liberal arts education. “[When] you’re at the College, you can do anything you want—it’s easier to find out what [you’re] actually interested in, and I think the Core helped me do that,” he said. Hui echoed his sentiment, noting that “the Core really did appeal to me because I could do a lot of different stuff.”',
        'Additionally, many business economics majors still find the thought of studying at an undergraduate business school unappealing. Hui said she would have been unhappy had she gone to a pre-professional business school and been forced to specialize earlier. “They do Excel-type classes and [I think] that would have been an awful fit for me.”',
        'When asked about these trends, Katelyn Yoshimoto, senior director of College communications, also emphasized how important the Core is to the College’s educational curriculum. “Through the general education and Core requirements, students are brought into contact with foundational knowledge, approaches, and questions across disciplines,” she wrote in an email to the <em>Maroon</em>. “All majors within the College—including economics—are designed as part of a liberal arts education.”',
        'In light of this enduring appreciation for the liberal arts, how do the trends at Chicago compare to other elite institutions? There are two ways to answer this question: look at the share of students or the share of degrees awarded. This first metric—which has been used throughout this piece—shows that UChicago consistently remains above its peer institutions in terms of enrollment in the arts, humanities, and non-economics social sciences.',
        'But the second metric shows that UChicago is quickly converging with its peers. Relative to 20 years ago, the gap in the share of degrees awarded in the humanities, arts, and social sciences (excluding economics) between the University and other Ivy Plus schools has declined by half.',
        'These measures lead to different conclusions because of how they account for double majors. The growth of business economics makes all other majors take up a smaller share of total degrees. However, any growth in business economics that comes from students adding it as a second major does not directly affect the share of students majoring in the humanities, or any other field.',
        'Despite their differences, both measures show that UChicago has been as vulnerable to declines in the humanities as other elite institutions.'
    ],
    eS = '“It’s Just Kind of Silly”',
    el = [
        "Did you know that “sneeze” was originally <a href='https://www.oed.com/dictionary/sneeze_v?tab=etymology'>spelled</a> “fnese”? If you walked by a certain poster advertising the History of the English Language course last fall, you certainly do. Aside from a few departments in the social sciences division, advertising classes is a phenomenon unique to the arts and humanities. Professors fight hard for students’ attention, both across and within departments. Majors like chemistry and economics don’t need to market their courses to students. In fact, every quarter the economics listhost comes alive with advertisements for classes in the humanities, social sciences, and arts departments that can count toward the perspectives requirement of the business economics major, which can be <a href='http://collegecatalog.uchicago.edu/thecollege/economics/'>fulfilled</a> by taking a class not housed in the economics department or the business school.",
        'The desire, and even need, to appeal to students bleeds into the substance of the fields themselves; it has, at least in part, shaped the trajectory of these disciplines over the past decades. “I think of the humanities as having been very progressive, trying to be up to date with the internal knowledge of the discipline but also to be more appealing to students,” said W. J. T. Mitchell, the Gaylord Donnelley Distinguished Service Professor of English Language and Literature, Art History, and the College. “I think we’re really trying to keep them interested by going to where they are.”',
        'Heffington said that the Department of History has been meeting to determine what types of classes to offer in response to the shift in students’ interest. “You teach very different classes to attract hardcore history majors versus attracting the broadest swath of people,” she said.',
        'This attitude is evident in the College course catalog itself. It teems with classes such as Introduction of Philosophy through Taylor Swift or Reality TV in East Asia and Beyond. Even if these are extreme cases, for some students they represent a broader category of classes in the humanities. These classes are ostensibly trying to meet students where they are. They do so by crafting a subtle argument for their own relevance in an age that demands a high return on investment. But these moves can be viewed as a signal that the fields have ceased to treat themselves as academically serious, which perhaps, ironically, hastens their decline.',
        'For Elizabeth Eck, a fourth-year double majoring in English language and literature and Fundamentals: Issues and Texts, there are many English classes that she says could be interesting but which are “advertised in a way that is completely unappealing” to her. Furthermore, she finds that many classes are “overly niche and specific” and study works that she does not believe merit academic attention. She recalled one class—Water Worlds—where they watched James Cameron’s <em>Avatar</em>. “Why would you do that in a class?” she asked. “It’s just kind of silly.”',
        'For Eck, this lack of rigor contrasts with English classes that take authors and their works seriously. By her standards, this means either engaging with the Western canon or giving new works genuine consideration, rather than what she sees as cheapening them through references to popular culture. These are “serious classes that are about serious writers,” she said. Think of offerings like Shakespeare: Tragedies and Romances or American Literature: Fictions of National Identity, or just Poetry.',
        "Another approach to dealing with the decline of the humanities, not unlike something that could have been cooked up by economists in Saieh Hall, has been lowering the time for completion. This has taken many forms, including shrinking major requirements. Archived versions of the course catalog <a href='http://collegecatalog.uchicago.edu/thecollege/archives/'>show</a> that half of arts and humanities major pathways have decreased the number of required courses since 2005, compared with 10 percent of majors in the physical sciences division. The Department of History also created the colloquium track, which Heffington says has very few strict requirements and is designed for double majors.",
        'These reforms come at a time when double majoring has become increasingly popular and has partially buoyed the arts and humanities’ decline. “The thing saving us is the share of double majors,” Heffington said. When looking only at primary majors—students with multiple majors designate one as their primary field of study—the enrollment numbers for the arts and humanities at UChicago are much starker, having halved in size since 2005.',
        'Students are also at least partially a driving force behind these changes. The allied fields track in the philosophy department, which allows students to take six electives, only one of which is required to be in the philosophy department, has existed since at least 1995 but has garnered greater interest in recent years. When he started teaching at UChicago in 2019, Tyler Zimmer, director of undergraduate studies in the Department of Philosophy, said that he was the one promoting the allied fields track to students who had never heard of it. Now, the roles are changing: “I have students approaching me about it because they know somebody who’s doing it and recommended it,” he said.',
        "One way of looking at this evidence shows a clear path forward: refocus attention on “serious” work. Fundamentals <a href='https://chicagomaroon.com/50599/news/fundamentals-major-class-size-doubles-to-largest-in-program-history/'>had</a> double the applicants last year, while the English major continued to shed students. Eck attributed this to the fact that, in her estimation, “Fundamentals offers an outlet for people who want to do a serious kind of textual study.”",
        'Additionally, departments could consider adding a track to their majors that increases the ease of double majoring. The philosophy and history departments, with their tracks designed to supplement a primary major, have maintained steady shares of students over the past decade, and, according to Heffington, the Department of History has even seen an increase in undergraduates choosing to write theses.',
        "But this kind of analysis can be misleading, and causal claims are always fraught with confounders. The Fundamentals major might be doing so well because it offers serious textual study, but it could also be growing because it creates a small and intimate cohort of like-minded students. And Zimmer, at least, is skeptical that an individual department can significantly affect students’ choices. “What if these bigger structural forces are at work?” he said, referring to <a href='https://www.newyorker.com/magazine/2025/10/20/inside-the-trump-administrations-assault-on-higher-education'>attacks</a> on higher education and the humanities in national politics. “You might be able to do things that mitigate their effects, but… there might be some parts of it that we can’t control.”",
        'At the same time, the changes to the structure of these majors are also likely to carry a cost of their own. Some professors worry that creating tracks designed for double majors and reducing major requirements cheapens their disciplines. Heffington explained that faculty members lament that the new colloquium track of the history major does not train students to think in terms of a “historical perspective.” She says that the department’s desire to attract students is often in tension with the total freedom they want to give professors, particularly as it is becoming difficult to justify classes with just one student enrolled. “We are thinking about how to balance that intellectual and pedagogical freedom against the need to attract students.”'
    ],
    tS = 'An Uncertain Future',
    tl = [
        'With last year seeing the second largest year-to-year increase in students pursuing the economics major to date, there is no sign of its growth slowing down. To Lima, this makes sense. “The way we teach it here, based on Gary Becker’s economic approach… [makes it so] the degree is very general, very portable. You can do a lot of different things with it. I think students recognize that benefit.”',
        "This broad applicability, according to Mitchell, is supposed to be the selling point of a liberal arts education, and of the humanities in particular. This is especially true when it is becoming increasingly difficult to predict what set of skills will be valuable. “I especially feel sorry for students who are obsessed with calculating the future, which is always going to be uncertain, but more so now,” said Mitchell, citing advances in AI and high <a href='https://www.newyorkfed.org/research/college-labor-market'>unemployment</a> rates among computer science majors as an example. “I gather that a lot of students who were hedging their bets and majored in computer science were having great difficulty finding a job this year because AI can take over all those jobs.”",
        'According to Mitchell, it is important to be adaptable and to have a set of skills that can be useful in numerous environments. “A lot of people would like to just turn the University into a vocational institute, preparing people for jobs,” he said. “But that doesn’t prepare them for life.”',
        'The uncertainty that Mitchell describes could present an opportunity for the liberal arts. If students are unable to achieve economic security with these pre-professional moves, they may revert back to the old Chicago-style methods and pursue majors that they are truly interested in.',
        'But if the rapidly changing world demonstrates the value of the liberal arts, this data shows no sign that students are responding accordingly. The computer science major has continued to grow since 2005, and there is scant evidence suggesting an imminent rebound in humanities enrollment. For Lima, it’s not unreasonable to imagine the economics major growing until it consumes the entire College—until all the roughly 2,000 students in each graduating class are economics majors. Everyone will get “a business degree, or an economics degree of some sort, and then they do what they really want to do,” he said. “In that world, it ends with 2,000.”'
    ],
    nS = 'Methodology',
    rS = 'The Data',
    iS = 'Where does the data come from?',
    aS = [
        'The data in this piece primarily comes from the National Center for Educational Statistics (NCES), which is an agency within the U.S. Department of Education that collects and analyzes data on U.S. education. The specific data comes from the Integrated Postsecondary Education Data System (IPEDS), which combines data from multiple annual surveys from all colleges, universities, and technical and vocational institutions that participate in federal student financial aid programs. This encompasses nearly all institutions of higher education in the U.S.',
        'This piece uses the survey on completions, a dataset about the students who receive degrees. This data provides the number of students graduating in a given year that received a degree in a specific "program," which in the case of this piece is equivalent to a specific major. The survey on completions counts separately the number of primary majors and secondary majors, a designation students assign to each major when they have multiple majors. At the University of Chicago, this is done in my.uchicago when one declares their majors. Unless otherwise noted, secondary and primary major numbers are combined.',
        "These majors are <a href='https://nces.ed.gov/ipeds/cipcode/browse.aspx?y=55'>classified</a> according to the NECS’s Classification of Instructional Programs (CIP). These are six-digit codes which provide detailed information of the type of major. For example, code 45.06XX houses economics, under which the economics major at the University of Chicago is <a href='https://nces.ed.gov/ipeds/reported-data/144050?year=2024&surveyNumber=3'>classified</a> as 45.0603.",
        "Along with the CIP codes, the piece also uses a <a href='https://www.amacad.org/humanities-indicators'>classification</a> from the National Academy of Arts and Sciences’s Humanities Indicator project to group CIP codes into categories such as humanities, social sciences, visual and performing arts, et cetera.",
        'The piece also uses University of Chicago–specific data to better understand the economics major. This includes data provided by the Kenneth C. Griffin Department of Economics on the number of graduates in each track of the economics major from academic year (AY) 2018–19 to AY2024–25. This data was provided on the condition that quantitative results were not published. Thus, the piece only contains information on relative sizes and trends rather than specific shares or numbers. Data on the number of economics graduates in AY2024–25 was obtained from the 2025 convocation program. The count was verified with the economics department data.',
        "Class enrollment data comes from the registrar’s <a href='https://coursesearch92.ais.uchicago.edu/psc/prd92guest/EMPLOYEE/HRMS/c/UC_STUDENT_RECORDS_FL.UC_CLASS_SEARCH_FL.GBL'>website</a>. Data on the number of requirements for each major in the 2005–06 school year <a href='http://collegecatalog.uchicago.edu/thecollege/archives/'>comes</a> from historical versions of the course catalog.",
        `Data on student outcomes comes from past versions of the Career Advancement website, which were <a href='https://web.archive.org/web/20130501000000*/https:/careeradvancement.uchicago.edu'>accessed</a> using the Wayback Machine. Data from 2018 to 2020 was not available and data from 2021 to 2022 was presented as an average over these two years. Additionally, the reported post-graduation industries change throughout the past decade. For instance, due to a reclassification in 2024, students in the "corporate" category, a sector that is included in other years, are not included. Despite these measurement challenges, under the most conservative assumptions, the data still shows that there has not been an increase in the share of students working in finance and business industries since 2018.`
    ],
    oS = 'Sample Construction',
    sS = 'What schools and which years are included in the data?',
    lS = [
        'The primary IPEDS sample used for this piece contains the Ivy Plus institutions (the Ivy League, plus Stanford, MIT, Duke, and UChicago). This data spans AY2005–06 through AY2023–24, the most recent year of available data.'
    ],
    uS = 'Classification',
    cS =
        'How are majors classified as part of the humanities, arts, or social sciences?',
    fS = [
        "Much of the analysis in this piece considers groups of majors rather than specific majors. The arts and humanities’ classification comes from the Humanities Indicators, which can be <a href='https://github.com/arijacob/chicago_majors/tree/main'>found</a> in the GitHub repository. Arts and humanities majors are majors whose CIP codes fall under either the Humanities or the Fine &amp; Performing Arts category. Note that this grouping classifies the history major as part of arts and humanities rather than the social sciences, where history falls at UChicago.",
        'The Humanities Indicators classification is not used for the social sciences, as this classification does not have a clean mapping. Instead, a manual classification was created, which can be found in the repository.',
        'Note that this piece always considers economics separately from all other social sciences. In the piece, this is specified as either referring to this grouping as the "other social sciences" or explicitly referred to as "social sciences, excluding economics."'
    ],
    dS = 'Measurement',
    hS = 'How is the size of a major measured?',
    mS = [
        'There are two primary ways that the size of majors is measured: share of students and share of degrees. Share of students in major X is calculated as the number of students with major X divided by the number of graduating students. Share of degrees in major X is calculated as the number of degrees of major X divided by the number of total degrees. The piece primarily uses the share of students, although it sometimes uses the share of degrees.',
        'When measuring a major’s prevalence using the share of students, growth in other majors through double majoring does not affect the statistic. If everyone added a major in economics, but did not change any of their existing majors, the share of students would not change for any subject except economics.',
        'On the other hand, since the share of degrees accounts for all degrees awarded across the University, more degrees in another subject will increase the denominator and make all other majors smaller.'
    ],
    pS = () =>
        x.jsx('img', {
            className: 'absolute inset-0 w-full h-[50%] sm:h-full object-cover',
            src: 'cover.jpg',
            alt: ''
        }),
    gS = () =>
        x.jsx('a', {
            href: 'https://chicagomaroon.com/',
            className: 'w-[300px] md:w-[400px] absolute top-[20px]',
            children: x.jsx('img', {
                className: 'w-[300px] md:w-[400px] absolute top-[20px]',
                src: 'maroon_logo_white.svg',
                alt: 'The Chicago Maroon'
            })
        }),
    yS = ({ windowWidth: e, windowHeight: t }) =>
        x.jsx('div', {
            className: 'w-10/12 mx-auto relative z-[5]',
            style: { top: e < 640 ? '27vh' : '22%' },
            children: x.jsx('h1', {
                className: `font-boldtext text-[black]
                sm:text-white`,
                style: {
                    fontSize: e < 640 ? (t < 800 ? '2.3em' : '2.8em') : '3.2em',
                    lineHeight: t < 800 ? '1.2em' : '1.1em',
                    fontFamily: 'Georgia, serif'
                },
                dangerouslySetInnerHTML: { __html: e < 640 ? Y2 : G2 }
            })
        }),
    vS = ({ windowWidth: e }) =>
        x.jsx('div', {
            className: 'w-10/12 mx-auto relative mt-5',
            style: { top: e < 640 ? '25vh' : '22%' },
            children: x.jsx('h1', {
                className: 'text-lg sm:text-2xl text-[black] sm:text-white',
                style: {
                    textShadow:
                        e < 640
                            ? '0 1px 3px rgba(255, 255, 255, 0.33)'
                            : '0 1px 8px rgba(0, 0, 0, 0.33)'
                },
                dangerouslySetInnerHTML: { __html: X2 }
            })
        }),
    wS = ({ windowWidth: e }) =>
        x.jsx('div', {
            className: `mx-auto relative text-[black] w-[90vw]
             top-[100vh] z-[20] text-center`,
            children: K2.map((t, n) =>
                x.jsx(
                    'p',
                    {
                        className: 'text-sm sm:text-lg',
                        dangerouslySetInnerHTML: { __html: t }
                    },
                    n
                )
            )
        }),
    xS = ({ windowWidth: e, windowHeight: t }) =>
        x.jsxs('div', {
            className: 'w-full h-[100vh] relative',
            children: [
                x.jsx(pS, {}),
                x.jsx('a', {
                    href: 'https://chicagomaroon.com/staff_name/nolan-shaffer/',
                    children: 'Nolan Shaffer'
                }),
                '.',
                x.jsx('div', {
                    className: `w-full h-[50vh] sm:h-[100vh] absolute bg-gray-500
            opacity-20 top-0 z-[0]`
                }),
                x.jsxs('div', {
                    className: `absolute inset-0 flex flex-col 
                            items-center justify-center`,
                    children: [
                        x.jsx(gS, {}),
                        x.jsx(yS, { windowWidth: e, windowHeight: t }),
                        x.jsx(vS, { windowWidth: e })
                    ]
                }),
                x.jsx('a', {
                    href: 'https://chicagomaroon.com/staff_name/nolan-shaffer/',
                    children: 'Nolan Shaffer'
                }),
                '.',
                x.jsx(wS, { windowWidth: e })
            ]
        });
function Hi(e) {
    const t = E.useRef(null);
    return t.current === null && (t.current = e()), t.current;
}
const kS = typeof window < 'u',
    wy = kS ? E.useLayoutEffect : E.useEffect;
function SS(e, t) {
    e.indexOf(t) === -1 && e.push(t);
}
function bS(e, t) {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
}
const fs = (e, t, n) => (n > t ? t : n < e ? e : n);
let _S = () => {};
const Gc = {},
    xy = (e) => typeof e == 'object' && e !== null;
function ES(e) {
    let t;
    return () => (t === void 0 && (t = e()), t);
}
const ds = (e) => e,
    ky = (...e) => e.reduce((t, n) => (r) => n(t(r))),
    Xc = (e, t, n) => {
        const r = t - e;
        return r ? (n - e) / r : 1;
    };
class CS {
    constructor() {
        this.subscriptions = [];
    }
    add(t) {
        return SS(this.subscriptions, t), () => bS(this.subscriptions, t);
    }
    notify(t, n, r) {
        const i = this.subscriptions.length;
        if (i)
            if (i === 1) this.subscriptions[0](t, n, r);
            else
                for (let a = 0; a < i; a++) {
                    const o = this.subscriptions[a];
                    o && o(t, n, r);
                }
    }
    getSize() {
        return this.subscriptions.length;
    }
    clear() {
        this.subscriptions.length = 0;
    }
}
const Sy = (e, t) => (t ? e * (1e3 / t) : 0),
    Ca = [
        'setup',
        'read',
        'resolveKeyframes',
        'preUpdate',
        'update',
        'preRender',
        'render',
        'postRender'
    ];
function NS(e, t) {
    let n = new Set(),
        r = new Set(),
        i = !1,
        a = !1;
    const o = new WeakSet();
    let s = { delta: 0, timestamp: 0, isProcessing: !1 };
    function l(f) {
        o.has(f) && (u.schedule(f), e()), f(s);
    }
    const u = {
        schedule: (f, c = !1, d = !1) => {
            const w = d && i ? n : r;
            return c && o.add(f), w.add(f), f;
        },
        cancel: (f) => {
            r.delete(f), o.delete(f);
        },
        process: (f) => {
            if (((s = f), i)) {
                a = !0;
                return;
            }
            i = !0;
            const c = n;
            (n = r),
                (r = c),
                n.forEach(l),
                n.clear(),
                (i = !1),
                a && ((a = !1), u.process(f));
        }
    };
    return u;
}
const AS = 40;
function by(e, t) {
    let n = !1,
        r = !0;
    const i = { delta: 0, timestamp: 0, isProcessing: !1 },
        a = () => (n = !0),
        o = Ca.reduce((p, v) => ((p[v] = NS(a)), p), {}),
        {
            setup: s,
            read: l,
            resolveKeyframes: u,
            preUpdate: f,
            update: c,
            preRender: d,
            render: g,
            postRender: w
        } = o,
        y = () => {
            const p = Gc.useManualTiming,
                v = p ? i.timestamp : performance.now();
            (n = !1),
                p ||
                    (i.delta = r
                        ? 1e3 / 60
                        : Math.max(Math.min(v - i.timestamp, AS), 1)),
                (i.timestamp = v),
                (i.isProcessing = !0),
                s.process(i),
                l.process(i),
                u.process(i),
                f.process(i),
                c.process(i),
                d.process(i),
                g.process(i),
                w.process(i),
                (i.isProcessing = !1),
                n && t && ((r = !1), e(y));
        },
        b = () => {
            (n = !0), (r = !0), i.isProcessing || e(y);
        };
    return {
        schedule: Ca.reduce((p, v) => {
            const S = o[v];
            return (
                (p[v] = (_, k = !1, A = !1) => (n || b(), S.schedule(_, k, A))),
                p
            );
        }, {}),
        cancel: (p) => {
            for (let v = 0; v < Ca.length; v++) o[Ca[v]].cancel(p);
        },
        state: i,
        steps: o
    };
}
const {
    schedule: xn,
    cancel: Po,
    state: Su
} = by(typeof requestAnimationFrame < 'u' ? requestAnimationFrame : ds, !0);
let Ka;
function TS() {
    Ka = void 0;
}
const Qa = {
        now: () => (
            Ka === void 0 &&
                Qa.set(
                    Su.isProcessing || Gc.useManualTiming
                        ? Su.timestamp
                        : performance.now()
                ),
            Ka
        ),
        set: (e) => {
            (Ka = e), queueMicrotask(TS);
        }
    },
    PS = (e) => (t) => typeof t == 'string' && t.startsWith(e),
    jS = PS('var(--'),
    IS = (e) => (jS(e) ? MS.test(e.split('/*')[0].trim()) : !1),
    MS =
        /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
    _y = {
        test: (e) => typeof e == 'number',
        parse: parseFloat,
        transform: (e) => e
    },
    Ey = { ..._y, transform: (e) => fs(0, 1, e) },
    ki = (e) => Math.round(e * 1e5) / 1e5,
    Cy = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function zS(e) {
    return e == null;
}
const LS =
        /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
    Kc = (e, t) => (n) =>
        !!(
            (typeof n == 'string' && LS.test(n) && n.startsWith(e)) ||
            (t && !zS(n) && Object.prototype.hasOwnProperty.call(n, t))
        ),
    Ny = (e, t, n) => (r) => {
        if (typeof r != 'string') return r;
        const [i, a, o, s] = r.match(Cy);
        return {
            [e]: parseFloat(i),
            [t]: parseFloat(a),
            [n]: parseFloat(o),
            alpha: s !== void 0 ? parseFloat(s) : 1
        };
    },
    FS = (e) => fs(0, 255, e),
    nl = { ..._y, transform: (e) => Math.round(FS(e)) },
    kn = {
        test: Kc('rgb', 'red'),
        parse: Ny('red', 'green', 'blue'),
        transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) =>
            'rgba(' +
            nl.transform(e) +
            ', ' +
            nl.transform(t) +
            ', ' +
            nl.transform(n) +
            ', ' +
            ki(Ey.transform(r)) +
            ')'
    };
function $S(e) {
    let t = '',
        n = '',
        r = '',
        i = '';
    return (
        e.length > 5
            ? ((t = e.substring(1, 3)),
              (n = e.substring(3, 5)),
              (r = e.substring(5, 7)),
              (i = e.substring(7, 9)))
            : ((t = e.substring(1, 2)),
              (n = e.substring(2, 3)),
              (r = e.substring(3, 4)),
              (i = e.substring(4, 5)),
              (t += t),
              (n += n),
              (r += r),
              (i += i)),
        {
            red: parseInt(t, 16),
            green: parseInt(n, 16),
            blue: parseInt(r, 16),
            alpha: i ? parseInt(i, 16) / 255 : 1
        }
    );
}
const bu = { test: Kc('#'), parse: $S, transform: kn.transform },
    RS = (e) => ({
        test: (t) =>
            typeof t == 'string' && t.endsWith(e) && t.split(' ').length === 1,
        parse: parseFloat,
        transform: (t) => `${t}${e}`
    }),
    Zd = RS('%'),
    lr = {
        test: Kc('hsl', 'hue'),
        parse: Ny('hue', 'saturation', 'lightness'),
        transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) =>
            'hsla(' +
            Math.round(e) +
            ', ' +
            Zd.transform(ki(t)) +
            ', ' +
            Zd.transform(ki(n)) +
            ', ' +
            ki(Ey.transform(r)) +
            ')'
    },
    zt = {
        test: (e) => kn.test(e) || bu.test(e) || lr.test(e),
        parse: (e) =>
            kn.test(e) ? kn.parse(e) : lr.test(e) ? lr.parse(e) : bu.parse(e),
        transform: (e) =>
            typeof e == 'string'
                ? e
                : e.hasOwnProperty('red')
                ? kn.transform(e)
                : lr.transform(e),
        getAnimatableNone: (e) => {
            const t = zt.parse(e);
            return (t.alpha = 0), zt.transform(t);
        }
    },
    OS =
        /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function DS(e) {
    var t, n;
    return (
        isNaN(e) &&
        typeof e == 'string' &&
        (((t = e.match(Cy)) == null ? void 0 : t.length) || 0) +
            (((n = e.match(OS)) == null ? void 0 : n.length) || 0) >
            0
    );
}
const Ay = 'number',
    Ty = 'color',
    US = 'var',
    HS = 'var(',
    eh = '${}',
    WS =
        /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Wi(e) {
    const t = e.toString(),
        n = [],
        r = { color: [], number: [], var: [] },
        i = [];
    let a = 0;
    const s = t
        .replace(
            WS,
            (l) => (
                zt.test(l)
                    ? (r.color.push(a), i.push(Ty), n.push(zt.parse(l)))
                    : l.startsWith(HS)
                    ? (r.var.push(a), i.push(US), n.push(l))
                    : (r.number.push(a), i.push(Ay), n.push(parseFloat(l))),
                ++a,
                eh
            )
        )
        .split(eh);
    return { values: n, split: s, indexes: r, types: i };
}
function VS(e) {
    return Wi(e).values;
}
function Py({ split: e, types: t }) {
    const n = e.length;
    return (r) => {
        let i = '';
        for (let a = 0; a < n; a++)
            if (((i += e[a]), r[a] !== void 0)) {
                const o = t[a];
                o === Ay
                    ? (i += ki(r[a]))
                    : o === Ty
                    ? (i += zt.transform(r[a]))
                    : (i += r[a]);
            }
        return i;
    };
}
function BS(e) {
    return Py(Wi(e));
}
const YS = (e) =>
        typeof e == 'number' ? 0 : zt.test(e) ? zt.getAnimatableNone(e) : e,
    GS = (e, t) =>
        typeof e == 'number'
            ? t != null && t.trim().endsWith('/')
                ? e
                : 0
            : YS(e);
function XS(e) {
    const t = Wi(e);
    return Py(t)(t.values.map((r, i) => GS(r, t.split[i])));
}
const KS = {
    test: DS,
    parse: VS,
    createTransformer: BS,
    getAnimatableNone: XS
};
function rl(e, t, n) {
    return (
        n < 0 && (n += 1),
        n > 1 && (n -= 1),
        n < 1 / 6
            ? e + (t - e) * 6 * n
            : n < 1 / 2
            ? t
            : n < 2 / 3
            ? e + (t - e) * (2 / 3 - n) * 6
            : e
    );
}
function QS({ hue: e, saturation: t, lightness: n, alpha: r }) {
    (e /= 360), (t /= 100), (n /= 100);
    let i = 0,
        a = 0,
        o = 0;
    if (!t) i = a = o = n;
    else {
        const s = n < 0.5 ? n * (1 + t) : n + t - n * t,
            l = 2 * n - s;
        (i = rl(l, s, e + 1 / 3)), (a = rl(l, s, e)), (o = rl(l, s, e - 1 / 3));
    }
    return {
        red: Math.round(i * 255),
        green: Math.round(a * 255),
        blue: Math.round(o * 255),
        alpha: r
    };
}
function jo(e, t) {
    return (n) => (n > 0 ? t : e);
}
const hs = (e, t, n) => e + (t - e) * n,
    il = (e, t, n) => {
        const r = e * e,
            i = n * (t * t - r) + r;
        return i < 0 ? 0 : Math.sqrt(i);
    },
    qS = [bu, kn, lr],
    JS = (e) => qS.find((t) => t.test(e));
function th(e) {
    const t = JS(e);
    if (!t) return !1;
    let n = t.parse(e);
    return t === lr && (n = QS(n)), n;
}
const nh = (e, t) => {
        const n = th(e),
            r = th(t);
        if (!n || !r) return jo(e, t);
        const i = { ...n };
        return (a) => (
            (i.red = il(n.red, r.red, a)),
            (i.green = il(n.green, r.green, a)),
            (i.blue = il(n.blue, r.blue, a)),
            (i.alpha = hs(n.alpha, r.alpha, a)),
            kn.transform(i)
        );
    },
    _u = new Set(['none', 'hidden']);
function ZS(e, t) {
    return _u.has(e) ? (n) => (n <= 0 ? e : t) : (n) => (n >= 1 ? t : e);
}
function eb(e, t) {
    return (n) => hs(e, t, n);
}
function Qc(e) {
    return typeof e == 'number'
        ? eb
        : typeof e == 'string'
        ? IS(e)
            ? jo
            : zt.test(e)
            ? nh
            : rb
        : Array.isArray(e)
        ? jy
        : typeof e == 'object'
        ? zt.test(e)
            ? nh
            : tb
        : jo;
}
function jy(e, t) {
    const n = [...e],
        r = n.length,
        i = e.map((a, o) => Qc(a)(a, t[o]));
    return (a) => {
        for (let o = 0; o < r; o++) n[o] = i[o](a);
        return n;
    };
}
function tb(e, t) {
    const n = { ...e, ...t },
        r = {};
    for (const i in n)
        e[i] !== void 0 && t[i] !== void 0 && (r[i] = Qc(e[i])(e[i], t[i]));
    return (i) => {
        for (const a in r) n[a] = r[a](i);
        return n;
    };
}
function nb(e, t) {
    const n = [],
        r = { color: 0, var: 0, number: 0 };
    for (let i = 0; i < t.values.length; i++) {
        const a = t.types[i],
            o = e.indexes[a][r[a]],
            s = e.values[o] ?? 0;
        (n[i] = s), r[a]++;
    }
    return n;
}
const rb = (e, t) => {
    const n = KS.createTransformer(t),
        r = Wi(e),
        i = Wi(t);
    return r.indexes.var.length === i.indexes.var.length &&
        r.indexes.color.length === i.indexes.color.length &&
        r.indexes.number.length >= i.indexes.number.length
        ? (_u.has(e) && !i.values.length) || (_u.has(t) && !r.values.length)
            ? ZS(e, t)
            : ky(jy(nb(r, i), i.values), n)
        : jo(e, t);
};
function ib(e, t, n) {
    return typeof e == 'number' && typeof t == 'number' && typeof n == 'number'
        ? hs(e, t, n)
        : Qc(e)(e, t);
}
function ab(e, t, n) {
    const r = [],
        i = n || Gc.mix || ib,
        a = e.length - 1;
    for (let o = 0; o < a; o++) {
        let s = i(e[o], e[o + 1]);
        if (t) {
            const l = Array.isArray(t) ? t[o] || ds : t;
            s = ky(l, s);
        }
        r.push(s);
    }
    return r;
}
function Iy(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
    const a = e.length;
    if ((_S(a === t.length), a === 1)) return () => t[0];
    if (a === 2 && t[0] === t[1]) return () => t[1];
    const o = e[0] === e[1];
    e[0] > e[a - 1] && ((e = [...e].reverse()), (t = [...t].reverse()));
    const s = ab(t, r, i),
        l = s.length,
        u = (f) => {
            if (o && f < e[0]) return t[0];
            let c = 0;
            if (l > 1) for (; c < e.length - 2 && !(f < e[c + 1]); c++);
            const d = Xc(e[c], e[c + 1], f);
            return s[c](d);
        };
    return n ? (f) => u(fs(e[0], e[a - 1], f)) : u;
}
function ob(e, t) {
    const n = e[e.length - 1];
    for (let r = 1; r <= t; r++) {
        const i = Xc(0, t, r);
        e.push(hs(n, 1, i));
    }
}
function sb(e) {
    const t = [0];
    return ob(t, e.length - 1), t;
}
const lb = {};
function My(e, t) {
    const n = ES(e);
    return () => lb[t] ?? n();
}
const zy = My(() => window.ScrollTimeline !== void 0, 'scrollTimeline'),
    Ly = My(() => window.ViewTimeline !== void 0, 'viewTimeline'),
    rh = 30,
    ub = (e) => !isNaN(parseFloat(e)),
    Si = { current: void 0 };
class cb {
    constructor(t, n = {}) {
        (this.canTrackVelocity = null),
            (this.events = {}),
            (this.updateAndNotify = (r) => {
                var a;
                const i = Qa.now();
                if (
                    (this.updatedAt !== i && this.setPrevFrameValue(),
                    (this.prev = this.current),
                    this.setCurrent(r),
                    this.current !== this.prev &&
                        ((a = this.events.change) == null ||
                            a.notify(this.current),
                        this.dependents))
                )
                    for (const o of this.dependents) o.dirty();
            }),
            (this.hasAnimated = !1),
            this.setCurrent(t),
            (this.owner = n.owner);
    }
    setCurrent(t) {
        (this.current = t),
            (this.updatedAt = Qa.now()),
            this.canTrackVelocity === null &&
                t !== void 0 &&
                (this.canTrackVelocity = ub(this.current));
    }
    setPrevFrameValue(t = this.current) {
        (this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt);
    }
    onChange(t) {
        return this.on('change', t);
    }
    on(t, n) {
        this.events[t] || (this.events[t] = new CS());
        const r = this.events[t].add(n);
        return t === 'change'
            ? () => {
                  r(),
                      xn.read(() => {
                          this.events.change.getSize() || this.stop();
                      });
              }
            : r;
    }
    clearListeners() {
        for (const t in this.events) this.events[t].clear();
    }
    attach(t, n) {
        (this.passiveEffect = t), (this.stopPassiveEffect = n);
    }
    set(t) {
        this.passiveEffect
            ? this.passiveEffect(t, this.updateAndNotify)
            : this.updateAndNotify(t);
    }
    setWithVelocity(t, n, r) {
        this.set(n),
            (this.prev = void 0),
            (this.prevFrameValue = t),
            (this.prevUpdatedAt = this.updatedAt - r);
    }
    jump(t, n = !0) {
        this.updateAndNotify(t),
            (this.prev = t),
            (this.prevUpdatedAt = this.prevFrameValue = void 0),
            n && this.stop(),
            this.stopPassiveEffect && this.stopPassiveEffect();
    }
    dirty() {
        var t;
        (t = this.events.change) == null || t.notify(this.current);
    }
    addDependent(t) {
        this.dependents || (this.dependents = new Set()),
            this.dependents.add(t);
    }
    removeDependent(t) {
        this.dependents && this.dependents.delete(t);
    }
    get() {
        return Si.current && Si.current.push(this), this.current;
    }
    getPrevious() {
        return this.prev;
    }
    getVelocity() {
        const t = Qa.now();
        if (
            !this.canTrackVelocity ||
            this.prevFrameValue === void 0 ||
            t - this.updatedAt > rh
        )
            return 0;
        const n = Math.min(this.updatedAt - this.prevUpdatedAt, rh);
        return Sy(
            parseFloat(this.current) - parseFloat(this.prevFrameValue),
            n
        );
    }
    start(t) {
        return (
            this.stop(),
            new Promise((n) => {
                (this.hasAnimated = !0),
                    (this.animation = t(n)),
                    this.events.animationStart &&
                        this.events.animationStart.notify();
            }).then(() => {
                this.events.animationComplete &&
                    this.events.animationComplete.notify(),
                    this.clearAnimation();
            })
        );
    }
    stop() {
        this.animation &&
            (this.animation.stop(),
            this.events.animationCancel &&
                this.events.animationCancel.notify()),
            this.clearAnimation();
    }
    isAnimating() {
        return !!this.animation;
    }
    clearAnimation() {
        delete this.animation;
    }
    destroy() {
        var t, n;
        (t = this.dependents) == null || t.clear(),
            (n = this.events.destroy) == null || n.notify(),
            this.clearListeners(),
            this.stop(),
            this.stopPassiveEffect && this.stopPassiveEffect();
    }
}
function ri(e, t) {
    return new cb(e, t);
}
function fb(e, t, n) {
    if (e == null) return [];
    if (e instanceof EventTarget) return [e];
    if (typeof e == 'string') {
        const i = document.querySelectorAll(e);
        return i ? Array.from(i) : [];
    }
    return Array.from(e).filter((r) => r != null);
}
function db(e) {
    return xy(e) && 'offsetHeight' in e && !('ownerSVGElement' in e);
}
const { schedule: Eu, cancel: Fy } = by(queueMicrotask, !1);
function hb(e) {
    return xy(e) && 'ownerSVGElement' in e;
}
const qa = new WeakMap();
let Ot;
const $y = (e, t, n) => (r, i) =>
        i && i[0]
            ? i[0][e + 'Size']
            : hb(r) && 'getBBox' in r
            ? r.getBBox()[t]
            : r[n],
    mb = $y('inline', 'width', 'offsetWidth'),
    pb = $y('block', 'height', 'offsetHeight');
function gb({ target: e, borderBoxSize: t }) {
    var n;
    (n = qa.get(e)) == null ||
        n.forEach((r) => {
            r(e, {
                get width() {
                    return mb(e, t);
                },
                get height() {
                    return pb(e, t);
                }
            });
        });
}
function yb(e) {
    e.forEach(gb);
}
function vb() {
    typeof ResizeObserver > 'u' || (Ot = new ResizeObserver(yb));
}
function wb(e, t) {
    Ot || vb();
    const n = fb(e);
    return (
        n.forEach((r) => {
            let i = qa.get(r);
            i || ((i = new Set()), qa.set(r, i)),
                i.add(t),
                Ot == null || Ot.observe(r);
        }),
        () => {
            n.forEach((r) => {
                const i = qa.get(r);
                i == null || i.delete(t),
                    (i != null && i.size) || Ot == null || Ot.unobserve(r);
            });
        }
    );
}
const Ja = new Set();
let ur;
function xb() {
    (ur = () => {
        const e = {
            get width() {
                return window.innerWidth;
            },
            get height() {
                return window.innerHeight;
            }
        };
        Ja.forEach((t) => t(e));
    }),
        window.addEventListener('resize', ur);
}
function kb(e) {
    return (
        Ja.add(e),
        ur || xb(),
        () => {
            Ja.delete(e),
                !Ja.size &&
                    typeof ur == 'function' &&
                    (window.removeEventListener('resize', ur), (ur = void 0));
        }
    );
}
function Sb(e, t) {
    return typeof e == 'function' ? kb(e) : wb(e, t);
}
function Ry(e, t) {
    let n;
    const r = () => {
        const { currentTime: i } = t,
            o = (i === null ? 0 : i.value) / 100;
        n !== o && e(o), (n = o);
    };
    return xn.preUpdate(r, !0), () => Po(r);
}
function bb(...e) {
    const t = !Array.isArray(e[0]),
        n = t ? 0 : -1,
        r = e[0 + n],
        i = e[1 + n],
        a = e[2 + n],
        o = e[3 + n],
        s = Iy(i, a, o);
    return t ? s(r) : s;
}
const _b = E.createContext({
    transformPagePoint: (e) => e,
    isStatic: !1,
    reducedMotion: 'never'
});
function Bn(e, t, n) {
    E.useInsertionEffect(() => e.on(t, n), [e, t, n]);
}
function Io(e) {
    return typeof window > 'u' ? !1 : e ? Ly() : zy();
}
const Eb = 50,
    ih = () => ({
        current: 0,
        offset: [],
        progress: 0,
        scrollLength: 0,
        targetOffset: 0,
        targetLength: 0,
        containerLength: 0,
        velocity: 0
    }),
    Cb = () => ({ time: 0, x: ih(), y: ih() }),
    Nb = {
        x: { length: 'Width', position: 'Left' },
        y: { length: 'Height', position: 'Top' }
    };
function ah(e, t, n, r) {
    const i = n[t],
        { length: a, position: o } = Nb[t],
        s = i.current,
        l = n.time;
    (i.current = Math.abs(e[`scroll${o}`])),
        (i.scrollLength = e[`scroll${a}`] - e[`client${a}`]),
        (i.offset.length = 0),
        (i.offset[0] = 0),
        (i.offset[1] = i.scrollLength),
        (i.progress = Xc(0, i.scrollLength, i.current));
    const u = r - l;
    i.velocity = u > Eb ? 0 : Sy(i.current - s, u);
}
function Ab(e, t, n) {
    ah(e, 'x', t, n), ah(e, 'y', t, n), (t.time = n);
}
function Tb(e, t) {
    const n = { x: 0, y: 0 };
    let r = e;
    for (; r && r !== t; )
        if (db(r))
            (n.x += r.offsetLeft), (n.y += r.offsetTop), (r = r.offsetParent);
        else if (r.tagName === 'svg') {
            const i = r.getBoundingClientRect();
            r = r.parentElement;
            const a = r.getBoundingClientRect();
            (n.x += i.left - a.left), (n.y += i.top - a.top);
        } else if (r instanceof SVGGraphicsElement) {
            const { x: i, y: a } = r.getBBox();
            (n.x += i), (n.y += a);
            let o = null,
                s = r.parentNode;
            for (; !o; ) s.tagName === 'svg' && (o = s), (s = r.parentNode);
            r = o;
        } else break;
    return n;
}
const Cu = { start: 0, center: 0.5, end: 1 };
function oh(e, t, n = 0) {
    let r = 0;
    if ((e in Cu && (e = Cu[e]), typeof e == 'string')) {
        const i = parseFloat(e);
        e.endsWith('px')
            ? (r = i)
            : e.endsWith('%')
            ? (e = i / 100)
            : e.endsWith('vw')
            ? (r = (i / 100) * document.documentElement.clientWidth)
            : e.endsWith('vh')
            ? (r = (i / 100) * document.documentElement.clientHeight)
            : (e = i);
    }
    return typeof e == 'number' && (r = t * e), n + r;
}
const Pb = [0, 0];
function jb(e, t, n, r) {
    let i = Array.isArray(e) ? e : Pb,
        a = 0,
        o = 0;
    return (
        typeof e == 'number'
            ? (i = [e, e])
            : typeof e == 'string' &&
              ((e = e.trim()),
              e.includes(' ')
                  ? (i = e.split(' '))
                  : (i = [e, Cu[e] ? e : '0'])),
        (a = oh(i[0], n, r)),
        (o = oh(i[1], t)),
        a - o
    );
}
const ii = {
        Enter: [
            [0, 1],
            [1, 1]
        ],
        Exit: [
            [0, 0],
            [1, 0]
        ],
        Any: [
            [1, 0],
            [0, 1]
        ],
        All: [
            [0, 0],
            [1, 1]
        ]
    },
    Ib = { x: 0, y: 0 };
function Mb(e) {
    return 'getBBox' in e && e.tagName !== 'svg'
        ? e.getBBox()
        : { width: e.clientWidth, height: e.clientHeight };
}
function zb(e, t, n) {
    const { offset: r = ii.All } = n,
        { target: i = e, axis: a = 'y' } = n,
        o = a === 'y' ? 'height' : 'width',
        s = i !== e ? Tb(i, e) : Ib,
        l = i === e ? { width: e.scrollWidth, height: e.scrollHeight } : Mb(i),
        u = { width: e.clientWidth, height: e.clientHeight };
    t[a].offset.length = 0;
    let f = !t[a].interpolate;
    const c = r.length;
    for (let d = 0; d < c; d++) {
        const g = jb(r[d], u[o], l[o], s[a]);
        !f && g !== t[a].interpolatorOffsets[d] && (f = !0),
            (t[a].offset[d] = g);
    }
    f &&
        ((t[a].interpolate = Iy(t[a].offset, sb(r), { clamp: !1 })),
        (t[a].interpolatorOffsets = [...t[a].offset])),
        (t[a].progress = fs(0, 1, t[a].interpolate(t[a].current)));
}
function Lb(e, t = e, n) {
    if (((n.x.targetOffset = 0), (n.y.targetOffset = 0), t !== e)) {
        let r = t;
        for (; r && r !== e; )
            (n.x.targetOffset += r.offsetLeft),
                (n.y.targetOffset += r.offsetTop),
                (r = r.offsetParent);
    }
    (n.x.targetLength = t === e ? t.scrollWidth : t.clientWidth),
        (n.y.targetLength = t === e ? t.scrollHeight : t.clientHeight),
        (n.x.containerLength = e.clientWidth),
        (n.y.containerLength = e.clientHeight);
}
function Fb(e, t, n, r = {}) {
    return {
        measure: (i) => {
            Lb(e, r.target, n),
                Ab(e, n, i),
                (r.offset || r.target) && zb(e, n, r);
        },
        notify: () => t(n)
    };
}
const Yn = new WeakMap(),
    sh = new WeakMap(),
    al = new WeakMap(),
    lh = new WeakMap(),
    Na = new WeakMap(),
    uh = (e) => (e === document.scrollingElement ? window : e);
function Oy(
    e,
    {
        container: t = document.scrollingElement,
        trackContentSize: n = !1,
        ...r
    } = {}
) {
    if (!t) return ds;
    let i = al.get(t);
    i || ((i = new Set()), al.set(t, i));
    const a = Cb(),
        o = Fb(t, e, a, r);
    if ((i.add(o), !Yn.has(t))) {
        const l = () => {
                for (const d of i) d.measure(Su.timestamp);
                xn.preUpdate(u);
            },
            u = () => {
                for (const d of i) d.notify();
            },
            f = () => xn.read(l);
        Yn.set(t, f);
        const c = uh(t);
        window.addEventListener('resize', f),
            t !== document.documentElement && sh.set(t, Sb(t, f)),
            c.addEventListener('scroll', f),
            f();
    }
    if (n && !Na.has(t)) {
        const l = Yn.get(t),
            u = { width: t.scrollWidth, height: t.scrollHeight };
        lh.set(t, u);
        const f = () => {
                const d = t.scrollWidth,
                    g = t.scrollHeight;
                (u.width !== d || u.height !== g) &&
                    (l(), (u.width = d), (u.height = g));
            },
            c = xn.read(f, !0);
        Na.set(t, c);
    }
    const s = Yn.get(t);
    return (
        xn.read(s, !1, !0),
        () => {
            var c;
            Po(s);
            const l = al.get(t);
            if (!l || (l.delete(o), l.size)) return;
            const u = Yn.get(t);
            Yn.delete(t),
                u &&
                    (uh(t).removeEventListener('scroll', u),
                    (c = sh.get(t)) == null || c(),
                    window.removeEventListener('resize', u));
            const f = Na.get(t);
            f && (Po(f), Na.delete(t)), lh.delete(t);
        }
    );
}
const $b = [
        [ii.Enter, 'entry'],
        [ii.Exit, 'exit'],
        [ii.Any, 'cover'],
        [ii.All, 'contain']
    ],
    ch = { start: 0, end: 1 };
function Rb(e) {
    const t = e.trim().split(/\s+/);
    if (t.length !== 2) return;
    const n = ch[t[0]],
        r = ch[t[1]];
    if (!(n === void 0 || r === void 0)) return [n, r];
}
function Ob(e) {
    if (e.length !== 2) return;
    const t = [];
    for (const n of e)
        if (Array.isArray(n)) t.push(n);
        else if (typeof n == 'string') {
            const r = Rb(n);
            if (!r) return;
            t.push(r);
        } else return;
    return t;
}
function Db(e, t) {
    const n = Ob(e);
    if (!n) return !1;
    for (let r = 0; r < 2; r++) {
        const i = n[r],
            a = t[r];
        if (i[0] !== a[0] || i[1] !== a[1]) return !1;
    }
    return !0;
}
function qc(e) {
    if (!e) return { rangeStart: 'contain 0%', rangeEnd: 'contain 100%' };
    for (const [t, n] of $b)
        if (Db(e, t)) return { rangeStart: `${n} 0%`, rangeEnd: `${n} 100%` };
}
const fh = new Map();
function dh(e) {
    const t = { value: 0 },
        n = Oy((r) => {
            t.value = r[e.axis].progress * 100;
        }, e);
    return { currentTime: t, cancel: n };
}
function Dy({ source: e, container: t, ...n }) {
    const { axis: r } = n;
    e && (t = e);
    let i = fh.get(t);
    i || ((i = new Map()), fh.set(t, i));
    const a = n.target ?? 'self';
    let o = i.get(a);
    o || ((o = {}), i.set(a, o));
    const s = r + (n.offset ?? []).join(',');
    return (
        o[s] ||
            (n.target && Io(n.target)
                ? qc(n.offset)
                    ? (o[s] = new ViewTimeline({ subject: n.target, axis: r }))
                    : (o[s] = dh({ container: t, ...n }))
                : Io()
                ? (o[s] = new ScrollTimeline({ source: t, axis: r }))
                : (o[s] = dh({ container: t, ...n }))),
        o[s]
    );
}
function Ub(e, t) {
    const n = Dy(t),
        r = t.target ? qc(t.offset) : void 0,
        i = t.target ? Io(t.target) && !!r : Io();
    return e.attachTimeline({
        timeline: i ? n : void 0,
        ...(r && i && { rangeStart: r.rangeStart, rangeEnd: r.rangeEnd }),
        observe: (a) => (
            a.pause(),
            Ry((o) => {
                a.time = a.iterationDuration * o;
            }, n)
        )
    });
}
function Hb(e) {
    return e && (e.target || e.offset);
}
function Wb(e) {
    return e.length === 2;
}
function Vb(e, t) {
    return Wb(e) || Hb(t)
        ? Oy((n) => {
              e(n[t.axis].progress, n);
          }, t)
        : Ry(e, Dy(t));
}
function Uy(
    e,
    { axis: t = 'y', container: n = document.scrollingElement, ...r } = {}
) {
    if (!n) return ds;
    const i = { axis: t, container: n, ...r };
    return typeof e == 'function' ? Vb(e, i) : Ub(e, i);
}
const Bb = () => ({
        scrollX: ri(0),
        scrollY: ri(0),
        scrollXProgress: ri(0),
        scrollYProgress: ri(0)
    }),
    cr = (e) => (e ? !e.current : !1);
function hh(e, t, n, r) {
    return {
        factory: (i) => {
            let a;
            const o = () => {
                if (cr(n) || cr(r)) {
                    Eu.read(o);
                    return;
                }
                a = Uy(i, {
                    ...t,
                    axis: e,
                    container: (n == null ? void 0 : n.current) || void 0,
                    target: (r == null ? void 0 : r.current) || void 0
                });
            };
            return (
                Eu.read(o),
                () => {
                    Fy(o), a == null || a();
                }
            );
        },
        times: [0, 1],
        keyframes: [0, 1],
        ease: (i) => i,
        duration: 1
    };
}
function Yb(e, t) {
    return typeof window > 'u' ? !1 : e ? Ly() && !!qc(t) : zy();
}
function Gb({ container: e, target: t, ...n } = {}) {
    const r = Hi(Bb);
    Yb(t, n.offset) &&
        ((r.scrollXProgress.accelerate = hh('x', n, e, t)),
        (r.scrollYProgress.accelerate = hh('y', n, e, t)));
    const i = E.useRef(null),
        a = E.useRef(!1),
        o = E.useCallback(
            () => (
                (i.current = Uy(
                    (s, { x: l, y: u }) => {
                        r.scrollX.set(l.current),
                            r.scrollXProgress.set(l.progress),
                            r.scrollY.set(u.current),
                            r.scrollYProgress.set(u.progress);
                    },
                    {
                        ...n,
                        container: (e == null ? void 0 : e.current) || void 0,
                        target: (t == null ? void 0 : t.current) || void 0
                    }
                )),
                () => {
                    var s;
                    (s = i.current) == null || s.call(i);
                }
            ),
            [e, t, JSON.stringify(n.offset)]
        );
    return (
        wy(() => {
            if (((a.current = !1), cr(e) || cr(t))) {
                a.current = !0;
                return;
            } else return o();
        }, [o]),
        E.useEffect(() => {
            if (!a.current) return;
            let s;
            const l = () => {
                const u = cr(e),
                    f = cr(t);
                !u && !f && (s = o());
            };
            return (
                Eu.read(l),
                () => {
                    Fy(l), s == null || s();
                }
            );
        }, [o]),
        r
    );
}
function Xb(e) {
    const t = Hi(() => ri(e)),
        { isStatic: n } = E.useContext(_b);
    if (n) {
        const [, r] = E.useState(e);
        E.useEffect(() => t.on('change', r), []);
    }
    return t;
}
function Hy(e, t) {
    const n = Xb(t()),
        r = () => n.set(t());
    return (
        r(),
        wy(() => {
            const i = () => xn.preRender(r, !1, !0),
                a = e.map((o) => o.on('change', i));
            return () => {
                a.forEach((o) => o()), Po(r);
            };
        }),
        n
    );
}
function Kb(e) {
    (Si.current = []), e();
    const t = Hy(Si.current, e);
    return (Si.current = void 0), t;
}
function mn(e, t, n, r) {
    if (typeof e == 'function') return Kb(e);
    if (n !== void 0 && !Array.isArray(n) && typeof t != 'function')
        return Qb(e, t, n, r);
    const o = typeof t == 'function' ? t : bb(t, n, r),
        s = Array.isArray(e) ? mh(e, o) : mh([e], ([u]) => o(u)),
        l = Array.isArray(e) ? void 0 : e.accelerate;
    return (
        l &&
            !l.isTransformed &&
            typeof t != 'function' &&
            Array.isArray(n) &&
            (r == null ? void 0 : r.clamp) !== !1 &&
            (s.accelerate = {
                ...l,
                times: t,
                keyframes: n,
                isTransformed: !0
            }),
        s
    );
}
function mh(e, t) {
    const n = Hi(() => []);
    return Hy(e, () => {
        n.length = 0;
        const r = e.length;
        for (let i = 0; i < r; i++) n[i] = e[i].get();
        return t(n);
    });
}
function Qb(e, t, n, r) {
    const i = Hi(() => Object.keys(n)),
        a = Hi(() => ({}));
    for (const o of i) a[o] = mn(e, t, n[o], r);
    return a;
}
function ph(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
    return r;
}
function qb(e) {
    if (Array.isArray(e)) return e;
}
function Jb(e, t, n) {
    return (
        (t = n_(t)) in e
            ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0
              })
            : (e[t] = n),
        e
    );
}
function Zb(e, t) {
    var n =
        e == null
            ? null
            : (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator'];
    if (n != null) {
        var r,
            i,
            a,
            o,
            s = [],
            l = !0,
            u = !1;
        try {
            if (((a = (n = n.call(e)).next), t !== 0))
                for (
                    ;
                    !(l = (r = a.call(n)).done) &&
                    (s.push(r.value), s.length !== t);
                    l = !0
                );
        } catch (f) {
            (u = !0), (i = f);
        } finally {
            try {
                if (
                    !l &&
                    n.return != null &&
                    ((o = n.return()), Object(o) !== o)
                )
                    return;
            } finally {
                if (u) throw i;
            }
        }
        return s;
    }
}
function e_() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function gh(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
            (r = r.filter(function (i) {
                return Object.getOwnPropertyDescriptor(e, i).enumerable;
            })),
            n.push.apply(n, r);
    }
    return n;
}
function yh(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t] != null ? arguments[t] : {};
        t % 2
            ? gh(Object(n), !0).forEach(function (r) {
                  Jb(e, r, n[r]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : gh(Object(n)).forEach(function (r) {
                  Object.defineProperty(
                      e,
                      r,
                      Object.getOwnPropertyDescriptor(n, r)
                  );
              });
    }
    return e;
}
function Nu(e, t) {
    return qb(e) || Zb(e, t) || r_(e, t) || e_();
}
function t_(e, t) {
    if (typeof e != 'object' || !e) return e;
    var n = e[Symbol.toPrimitive];
    if (n !== void 0) {
        var r = n.call(e, t);
        if (typeof r != 'object') return r;
        throw new TypeError('@@toPrimitive must return a primitive value.');
    }
    return (t === 'string' ? String : Number)(e);
}
function n_(e) {
    var t = t_(e, 'string');
    return typeof t == 'symbol' ? t : t + '';
}
function r_(e, t) {
    if (e) {
        if (typeof e == 'string') return ph(e, t);
        var n = {}.toString.call(e).slice(8, -1);
        return (
            n === 'Object' && e.constructor && (n = e.constructor.name),
            n === 'Map' || n === 'Set'
                ? Array.from(e)
                : n === 'Arguments' ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                ? ph(e, t)
                : void 0
        );
    }
}
var Wy = function (t) {
        return typeof t == 'string' && t.includes('px');
    },
    i_ = {
        position: 'fixed',
        left: 0,
        width: '100%',
        height: 0,
        borderTop: '2px dashed black',
        zIndex: 9999
    },
    a_ = { fontSize: '12px', fontFamily: 'monospace', margin: 0, padding: 6 },
    o_ = function (t) {
        var n = Wy(t);
        return n ? t : ''.concat(t * 100, '%');
    },
    s_ = function (t) {
        var n = t.offset,
            r = o_(n);
        return Ve.createElement(
            'div',
            { style: yh(yh({}, i_), {}, { top: r }) },
            Ve.createElement('p', { style: a_ }, 'trigger: ', n)
        );
    },
    l_ = function (t, n) {
        for (var r = Math.ceil(n / t), i = [], a = 1 / r, o = 0; o <= r; o += 1)
            i.push(o * a);
        return i;
    },
    u_ = function (t) {
        var n = t.debug,
            r = t.children,
            i = t.offset,
            a = i === void 0 ? 0.3 : i,
            o = t.onStepEnter,
            s = o === void 0 ? function () {} : o,
            l = t.onStepExit,
            u = l === void 0 ? function () {} : l,
            f = t.onStepProgress,
            c = f === void 0 ? null : f,
            d = t.threshold,
            g = d === void 0 ? 4 : d,
            w = Wy(a),
            y = E.useState(0),
            b = Nu(y, 2),
            m = b[0],
            h = b[1],
            p = E.useState(null),
            v = Nu(p, 2),
            S = v[0],
            _ = v[1],
            k = function (W) {
                h(W);
            },
            A = function (W) {
                _(window.innerHeight);
            };
        E.useEffect(function () {
            if (w)
                return (
                    window.addEventListener('resize', A),
                    function () {
                        window.removeEventListener('resize', A);
                    }
                );
        }, []);
        var $ = typeof window < 'u',
            P = $ ? S || window.innerHeight : 0,
            R = w ? +a.replace('px', '') / P : a,
            I = E.useMemo(
                function () {
                    return l_(g, P);
                },
                [P]
            );
        return Ve.createElement(
            Ve.Fragment,
            null,
            n && Ve.createElement(s_, { offset: a }),
            Ve.Children.map(r, function (U, W) {
                return Ve.cloneElement(U, {
                    scrollamaId: 'react-scrollama-'.concat(W),
                    offset: R,
                    onStepEnter: s,
                    onStepExit: u,
                    onStepProgress: c,
                    lastScrollTop: m,
                    handleSetLastScrollTop: k,
                    progressThreshold: I,
                    innerHeight: P
                });
            })
        );
    },
    Au = new Map(),
    Aa = new WeakMap(),
    vh = 0,
    c_ = void 0;
function f_(e) {
    return e
        ? (Aa.has(e) || ((vh += 1), Aa.set(e, vh.toString())), Aa.get(e))
        : '0';
}
function d_(e) {
    return Object.keys(e)
        .sort()
        .filter((t) => e[t] !== void 0)
        .map((t) => `${t}_${t === 'root' ? f_(e.root) : e[t]}`)
        .toString();
}
function h_(e) {
    const t = d_(e);
    let n = Au.get(t);
    if (!n) {
        const r = new Map();
        let i;
        const a = new IntersectionObserver((o) => {
            o.forEach((s) => {
                var l;
                const u =
                    s.isIntersecting && i.some((f) => s.intersectionRatio >= f);
                e.trackVisibility &&
                    typeof s.isVisible > 'u' &&
                    (s.isVisible = u),
                    (l = r.get(s.target)) == null ||
                        l.forEach((f) => {
                            f(u, s);
                        });
            });
        }, e);
        (i =
            a.thresholds ||
            (Array.isArray(e.threshold) ? e.threshold : [e.threshold || 0])),
            (n = { id: t, observer: a, elements: r }),
            Au.set(t, n);
    }
    return n;
}
function m_(e, t, n = {}, r = c_) {
    if (typeof window.IntersectionObserver > 'u' && r !== void 0) {
        const l = e.getBoundingClientRect();
        return (
            t(r, {
                isIntersecting: r,
                target: e,
                intersectionRatio:
                    typeof n.threshold == 'number' ? n.threshold : 0,
                time: 0,
                boundingClientRect: l,
                intersectionRect: l,
                rootBounds: l
            }),
            () => {}
        );
    }
    const { id: i, observer: a, elements: o } = h_(n),
        s = o.get(e) || [];
    return (
        o.has(e) || o.set(e, s),
        s.push(t),
        a.observe(e),
        function () {
            s.splice(s.indexOf(t), 1),
                s.length === 0 && (o.delete(e), a.unobserve(e)),
                o.size === 0 && (a.disconnect(), Au.delete(i));
        }
    );
}
function wh({
    threshold: e,
    delay: t,
    trackVisibility: n,
    rootMargin: r,
    root: i,
    triggerOnce: a,
    skip: o,
    initialInView: s,
    fallbackInView: l,
    onChange: u
} = {}) {
    var f;
    const [c, d] = E.useState(null),
        g = E.useRef(u),
        [w, y] = E.useState({ inView: !!s, entry: void 0 });
    (g.current = u),
        E.useEffect(() => {
            if (o || !c) return;
            let p;
            return (
                (p = m_(
                    c,
                    (v, S) => {
                        y({ inView: v, entry: S }),
                            g.current && g.current(v, S),
                            S.isIntersecting && a && p && (p(), (p = void 0));
                    },
                    {
                        root: i,
                        rootMargin: r,
                        threshold: e,
                        trackVisibility: n,
                        delay: t
                    },
                    l
                )),
                () => {
                    p && p();
                }
            );
        }, [Array.isArray(e) ? e.toString() : e, c, i, r, a, o, n, l, t]);
    const b = (f = w.entry) == null ? void 0 : f.target,
        m = E.useRef(void 0);
    !c &&
        b &&
        !a &&
        !o &&
        m.current !== b &&
        ((m.current = b), y({ inView: !!s, entry: void 0 }));
    const h = [d, w.inView, w.entry];
    return (h.ref = h[0]), (h.inView = h[1]), (h.entry = h[2]), h;
}
var p_ = function (t) {
        return '-'.concat(t * 100, '% 0px -').concat(100 - t * 100, '% 0px');
    },
    g_ = function (t, n, r, i) {
        if (!r.current) return '0px';
        var a = r.current.offsetHeight / i;
        return t === 'down'
            ? ''.concat((a - n) * 100, '% 0px ').concat(n * 100 - 100, '% 0px')
            : '-'
                  .concat(n * 100, '% 0px ')
                  .concat(a * 100 - (100 - n * 100), '% 0px');
    },
    xh = function (t) {
        var n = t.children,
            r = t.data,
            i = t.handleSetLastScrollTop,
            a = t.lastScrollTop,
            o = t.onStepEnter,
            s = o === void 0 ? function () {} : o,
            l = t.onStepExit,
            u = l === void 0 ? function () {} : l,
            f = t.onStepProgress,
            c = f === void 0 ? null : f,
            d = t.offset,
            g = t.scrollamaId,
            w = t.progressThreshold,
            y = t.innerHeight,
            b = typeof window < 'u',
            m = b ? document.documentElement.scrollTop : 0,
            h = a >= m ? 'up' : 'down',
            p = p_(d),
            v = E.useRef(null),
            S = E.useState(!1),
            _ = Nu(S, 2),
            k = _[0],
            A = _[1],
            $ = wh({ rootMargin: p, threshold: 0 }),
            P = $.ref,
            R = $.entry,
            I = E.useMemo(
                function () {
                    return g_(h, d, v, y);
                },
                [h, d, v, y]
            ),
            U = wh({ rootMargin: I, threshold: w }),
            W = U.ref,
            q = U.entry,
            oe = E.useCallback(
                function (Z) {
                    (v.current = Z), P(Z), W(Z);
                },
                [P, W]
            );
        return (
            E.useEffect(
                function () {
                    if (k) {
                        var Z = q.target.getBoundingClientRect(),
                            T = Z.height,
                            L = Z.top,
                            M = Math.min(
                                1,
                                Math.max(0, (window.innerHeight * d - L) / T)
                            );
                        c &&
                            c({
                                progress: M,
                                scrollamaId: g,
                                data: r,
                                element: q.target,
                                entry: q,
                                direction: h
                            });
                    }
                },
                [q]
            ),
            E.useEffect(
                function () {
                    R && !R.isIntersecting && k
                        ? (u({
                              element: R.target,
                              scrollamaId: g,
                              data: r,
                              entry: R,
                              direction: h
                          }),
                          A(!1),
                          i(m))
                        : R &&
                          R.isIntersecting &&
                          !k &&
                          (A(!0),
                          s({
                              element: R.target,
                              scrollamaId: g,
                              data: r,
                              entry: R,
                              direction: h
                          }),
                          i(m));
                },
                [R]
            ),
            E.cloneElement(Ve.Children.only(n), {
                'data-react-scrollama-id': g,
                ref: oe,
                entry: R
            })
        );
    };
function bi(e, t) {
    return e == null || t == null
        ? NaN
        : e < t
        ? -1
        : e > t
        ? 1
        : e >= t
        ? 0
        : NaN;
}
function y_(e, t) {
    return e == null || t == null
        ? NaN
        : t < e
        ? -1
        : t > e
        ? 1
        : t >= e
        ? 0
        : NaN;
}
function Vy(e) {
    let t, n, r;
    e.length !== 2
        ? ((t = bi), (n = (s, l) => bi(e(s), l)), (r = (s, l) => e(s) - l))
        : ((t = e === bi || e === y_ ? e : v_), (n = e), (r = e));
    function i(s, l, u = 0, f = s.length) {
        if (u < f) {
            if (t(l, l) !== 0) return f;
            do {
                const c = (u + f) >>> 1;
                n(s[c], l) < 0 ? (u = c + 1) : (f = c);
            } while (u < f);
        }
        return u;
    }
    function a(s, l, u = 0, f = s.length) {
        if (u < f) {
            if (t(l, l) !== 0) return f;
            do {
                const c = (u + f) >>> 1;
                n(s[c], l) <= 0 ? (u = c + 1) : (f = c);
            } while (u < f);
        }
        return u;
    }
    function o(s, l, u = 0, f = s.length) {
        const c = i(s, l, u, f - 1);
        return c > u && r(s[c - 1], l) > -r(s[c], l) ? c - 1 : c;
    }
    return { left: i, center: o, right: a };
}
function v_() {
    return 0;
}
function w_(e) {
    return e === null ? NaN : +e;
}
const x_ = Vy(bi),
    k_ = x_.right;
Vy(w_).center;
function Mn(e, t) {
    let n, r;
    if (t === void 0)
        for (const i of e)
            i != null &&
                (n === void 0
                    ? i >= i && (n = r = i)
                    : (n > i && (n = i), r < i && (r = i)));
    else {
        let i = -1;
        for (let a of e)
            (a = t(a, ++i, e)) != null &&
                (n === void 0
                    ? a >= a && (n = r = a)
                    : (n > a && (n = a), r < a && (r = a)));
    }
    return [n, r];
}
class S_ extends Map {
    constructor(t, n = E_) {
        if (
            (super(),
            Object.defineProperties(this, {
                _intern: { value: new Map() },
                _key: { value: n }
            }),
            t != null)
        )
            for (const [r, i] of t) this.set(r, i);
    }
    get(t) {
        return super.get(kh(this, t));
    }
    has(t) {
        return super.has(kh(this, t));
    }
    set(t, n) {
        return super.set(b_(this, t), n);
    }
    delete(t) {
        return super.delete(__(this, t));
    }
}
function kh({ _intern: e, _key: t }, n) {
    const r = t(n);
    return e.has(r) ? e.get(r) : n;
}
function b_({ _intern: e, _key: t }, n) {
    const r = t(n);
    return e.has(r) ? e.get(r) : (e.set(r, n), n);
}
function __({ _intern: e, _key: t }, n) {
    const r = t(n);
    return e.has(r) && ((n = e.get(r)), e.delete(r)), n;
}
function E_(e) {
    return e !== null && typeof e == 'object' ? e.valueOf() : e;
}
function C_(e) {
    return e;
}
function Jc(e, t, ...n) {
    return By(e, C_, t, n);
}
function Sh(e, t, ...n) {
    return By(e, Array.from, t, n);
}
function By(e, t, n, r) {
    return (function i(a, o) {
        if (o >= r.length) return n(a);
        const s = new S_(),
            l = r[o++];
        let u = -1;
        for (const f of a) {
            const c = l(f, ++u, a),
                d = s.get(c);
            d ? d.push(f) : s.set(c, [f]);
        }
        for (const [f, c] of s) s.set(f, i(c, o));
        return t(s);
    })(e, 0);
}
const N_ = Math.sqrt(50),
    A_ = Math.sqrt(10),
    T_ = Math.sqrt(2);
function Mo(e, t, n) {
    const r = (t - e) / Math.max(0, n),
        i = Math.floor(Math.log10(r)),
        a = r / Math.pow(10, i),
        o = a >= N_ ? 10 : a >= A_ ? 5 : a >= T_ ? 2 : 1;
    let s, l, u;
    return (
        i < 0
            ? ((u = Math.pow(10, -i) / o),
              (s = Math.round(e * u)),
              (l = Math.round(t * u)),
              s / u < e && ++s,
              l / u > t && --l,
              (u = -u))
            : ((u = Math.pow(10, i) * o),
              (s = Math.round(e / u)),
              (l = Math.round(t / u)),
              s * u < e && ++s,
              l * u > t && --l),
        l < s && 0.5 <= n && n < 2 ? Mo(e, t, n * 2) : [s, l, u]
    );
}
function P_(e, t, n) {
    if (((t = +t), (e = +e), (n = +n), !(n > 0))) return [];
    if (e === t) return [e];
    const r = t < e,
        [i, a, o] = r ? Mo(t, e, n) : Mo(e, t, n);
    if (!(a >= i)) return [];
    const s = a - i + 1,
        l = new Array(s);
    if (r)
        if (o < 0) for (let u = 0; u < s; ++u) l[u] = (a - u) / -o;
        else for (let u = 0; u < s; ++u) l[u] = (a - u) * o;
    else if (o < 0) for (let u = 0; u < s; ++u) l[u] = (i + u) / -o;
    else for (let u = 0; u < s; ++u) l[u] = (i + u) * o;
    return l;
}
function Tu(e, t, n) {
    return (t = +t), (e = +e), (n = +n), Mo(e, t, n)[2];
}
function j_(e, t, n) {
    (t = +t), (e = +e), (n = +n);
    const r = t < e,
        i = r ? Tu(t, e, n) : Tu(e, t, n);
    return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function on(e, t) {
    let n;
    if (t === void 0)
        for (const r of e)
            r != null && (n < r || (n === void 0 && r >= r)) && (n = r);
    else {
        let r = -1;
        for (let i of e)
            (i = t(i, ++r, e)) != null &&
                (n < i || (n === void 0 && i >= i)) &&
                (n = i);
    }
    return n;
}
function Fr(e, t, n) {
    (e = +e),
        (t = +t),
        (n =
            (i = arguments.length) < 2
                ? ((t = e), (e = 0), 1)
                : i < 3
                ? 1
                : +n);
    for (
        var r = -1,
            i = Math.max(0, Math.ceil((t - e) / n)) | 0,
            a = new Array(i);
        ++r < i;

    )
        a[r] = e + r * n;
    return a;
}
function bh(e, t) {
    let n = 0;
    if (t === void 0) for (let r of e) (r = +r) && (n += r);
    else {
        let r = -1;
        for (let i of e) (i = +t(i, ++r, e)) && (n += i);
    }
    return n;
}
function I_(e) {
    return e;
}
var ol = 1,
    sl = 2,
    Pu = 3,
    ai = 4,
    _h = 1e-6;
function M_(e) {
    return 'translate(' + e + ',0)';
}
function z_(e) {
    return 'translate(0,' + e + ')';
}
function L_(e) {
    return (t) => +e(t);
}
function F_(e, t) {
    return (
        (t = Math.max(0, e.bandwidth() - t * 2) / 2),
        e.round() && (t = Math.round(t)),
        (n) => +e(n) + t
    );
}
function $_() {
    return !this.__axis;
}
function Yy(e, t) {
    var n = [],
        r = null,
        i = null,
        a = 6,
        o = 6,
        s = 3,
        l = typeof window < 'u' && window.devicePixelRatio > 1 ? 0 : 0.5,
        u = e === ol || e === ai ? -1 : 1,
        f = e === ai || e === sl ? 'x' : 'y',
        c = e === ol || e === Pu ? M_ : z_;
    function d(g) {
        var w = r ?? (t.ticks ? t.ticks.apply(t, n) : t.domain()),
            y = i ?? (t.tickFormat ? t.tickFormat.apply(t, n) : I_),
            b = Math.max(a, 0) + s,
            m = t.range(),
            h = +m[0] + l,
            p = +m[m.length - 1] + l,
            v = (t.bandwidth ? F_ : L_)(t.copy(), l),
            S = g.selection ? g.selection() : g,
            _ = S.selectAll('.domain').data([null]),
            k = S.selectAll('.tick').data(w, t).order(),
            A = k.exit(),
            $ = k.enter().append('g').attr('class', 'tick'),
            P = k.select('line'),
            R = k.select('text');
        (_ = _.merge(
            _.enter()
                .insert('path', '.tick')
                .attr('class', 'domain')
                .attr('stroke', 'currentColor')
        )),
            (k = k.merge($)),
            (P = P.merge(
                $.append('line')
                    .attr('stroke', 'currentColor')
                    .attr(f + '2', u * a)
            )),
            (R = R.merge(
                $.append('text')
                    .attr('fill', 'currentColor')
                    .attr(f, u * b)
                    .attr(
                        'dy',
                        e === ol ? '0em' : e === Pu ? '0.71em' : '0.32em'
                    )
            )),
            g !== S &&
                ((_ = _.transition(g)),
                (k = k.transition(g)),
                (P = P.transition(g)),
                (R = R.transition(g)),
                (A = A.transition(g)
                    .attr('opacity', _h)
                    .attr('transform', function (I) {
                        return isFinite((I = v(I)))
                            ? c(I + l)
                            : this.getAttribute('transform');
                    })),
                $.attr('opacity', _h).attr('transform', function (I) {
                    var U = this.parentNode.__axis;
                    return c((U && isFinite((U = U(I))) ? U : v(I)) + l);
                })),
            A.remove(),
            _.attr(
                'd',
                e === ai || e === sl
                    ? o
                        ? 'M' +
                          u * o +
                          ',' +
                          h +
                          'H' +
                          l +
                          'V' +
                          p +
                          'H' +
                          u * o
                        : 'M' + l + ',' + h + 'V' + p
                    : o
                    ? 'M' + h + ',' + u * o + 'V' + l + 'H' + p + 'V' + u * o
                    : 'M' + h + ',' + l + 'H' + p
            ),
            k.attr('opacity', 1).attr('transform', function (I) {
                return c(v(I) + l);
            }),
            P.attr(f + '2', u * a),
            R.attr(f, u * b).text(y),
            S.filter($_)
                .attr('fill', 'none')
                .attr('font-size', 10)
                .attr('font-family', 'sans-serif')
                .attr(
                    'text-anchor',
                    e === sl ? 'start' : e === ai ? 'end' : 'middle'
                ),
            S.each(function () {
                this.__axis = v;
            });
    }
    return (
        (d.scale = function (g) {
            return arguments.length ? ((t = g), d) : t;
        }),
        (d.ticks = function () {
            return (n = Array.from(arguments)), d;
        }),
        (d.tickArguments = function (g) {
            return arguments.length
                ? ((n = g == null ? [] : Array.from(g)), d)
                : n.slice();
        }),
        (d.tickValues = function (g) {
            return arguments.length
                ? ((r = g == null ? null : Array.from(g)), d)
                : r && r.slice();
        }),
        (d.tickFormat = function (g) {
            return arguments.length ? ((i = g), d) : i;
        }),
        (d.tickSize = function (g) {
            return arguments.length ? ((a = o = +g), d) : a;
        }),
        (d.tickSizeInner = function (g) {
            return arguments.length ? ((a = +g), d) : a;
        }),
        (d.tickSizeOuter = function (g) {
            return arguments.length ? ((o = +g), d) : o;
        }),
        (d.tickPadding = function (g) {
            return arguments.length ? ((s = +g), d) : s;
        }),
        (d.offset = function (g) {
            return arguments.length ? ((l = +g), d) : l;
        }),
        d
    );
}
function $r(e) {
    return Yy(Pu, e);
}
function Rr(e) {
    return Yy(ai, e);
}
var R_ = { value: () => {} };
function Gy() {
    for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
        if (!(r = arguments[e] + '') || r in n || /[\s.]/.test(r))
            throw new Error('illegal type: ' + r);
        n[r] = [];
    }
    return new Za(n);
}
function Za(e) {
    this._ = e;
}
function O_(e, t) {
    return e
        .trim()
        .split(/^|\s+/)
        .map(function (n) {
            var r = '',
                i = n.indexOf('.');
            if (
                (i >= 0 && ((r = n.slice(i + 1)), (n = n.slice(0, i))),
                n && !t.hasOwnProperty(n))
            )
                throw new Error('unknown type: ' + n);
            return { type: n, name: r };
        });
}
Za.prototype = Gy.prototype = {
    constructor: Za,
    on: function (e, t) {
        var n = this._,
            r = O_(e + '', n),
            i,
            a = -1,
            o = r.length;
        if (arguments.length < 2) {
            for (; ++a < o; )
                if ((i = (e = r[a]).type) && (i = D_(n[i], e.name))) return i;
            return;
        }
        if (t != null && typeof t != 'function')
            throw new Error('invalid callback: ' + t);
        for (; ++a < o; )
            if ((i = (e = r[a]).type)) n[i] = Eh(n[i], e.name, t);
            else if (t == null) for (i in n) n[i] = Eh(n[i], e.name, null);
        return this;
    },
    copy: function () {
        var e = {},
            t = this._;
        for (var n in t) e[n] = t[n].slice();
        return new Za(e);
    },
    call: function (e, t) {
        if ((i = arguments.length - 2) > 0)
            for (var n = new Array(i), r = 0, i, a; r < i; ++r)
                n[r] = arguments[r + 2];
        if (!this._.hasOwnProperty(e)) throw new Error('unknown type: ' + e);
        for (a = this._[e], r = 0, i = a.length; r < i; ++r)
            a[r].value.apply(t, n);
    },
    apply: function (e, t, n) {
        if (!this._.hasOwnProperty(e)) throw new Error('unknown type: ' + e);
        for (var r = this._[e], i = 0, a = r.length; i < a; ++i)
            r[i].value.apply(t, n);
    }
};
function D_(e, t) {
    for (var n = 0, r = e.length, i; n < r; ++n)
        if ((i = e[n]).name === t) return i.value;
}
function Eh(e, t, n) {
    for (var r = 0, i = e.length; r < i; ++r)
        if (e[r].name === t) {
            (e[r] = R_), (e = e.slice(0, r).concat(e.slice(r + 1)));
            break;
        }
    return n != null && e.push({ name: t, value: n }), e;
}
var ju = 'http://www.w3.org/1999/xhtml';
const Ch = {
    svg: 'http://www.w3.org/2000/svg',
    xhtml: ju,
    xlink: 'http://www.w3.org/1999/xlink',
    xml: 'http://www.w3.org/XML/1998/namespace',
    xmlns: 'http://www.w3.org/2000/xmlns/'
};
function ms(e) {
    var t = (e += ''),
        n = t.indexOf(':');
    return (
        n >= 0 && (t = e.slice(0, n)) !== 'xmlns' && (e = e.slice(n + 1)),
        Ch.hasOwnProperty(t) ? { space: Ch[t], local: e } : e
    );
}
function U_(e) {
    return function () {
        var t = this.ownerDocument,
            n = this.namespaceURI;
        return n === ju && t.documentElement.namespaceURI === ju
            ? t.createElement(e)
            : t.createElementNS(n, e);
    };
}
function H_(e) {
    return function () {
        return this.ownerDocument.createElementNS(e.space, e.local);
    };
}
function Xy(e) {
    var t = ms(e);
    return (t.local ? H_ : U_)(t);
}
function W_() {}
function Zc(e) {
    return e == null
        ? W_
        : function () {
              return this.querySelector(e);
          };
}
function V_(e) {
    typeof e != 'function' && (e = Zc(e));
    for (
        var t = this._groups, n = t.length, r = new Array(n), i = 0;
        i < n;
        ++i
    )
        for (
            var a = t[i], o = a.length, s = (r[i] = new Array(o)), l, u, f = 0;
            f < o;
            ++f
        )
            (l = a[f]) &&
                (u = e.call(l, l.__data__, f, a)) &&
                ('__data__' in l && (u.__data__ = l.__data__), (s[f] = u));
    return new $e(r, this._parents);
}
function B_(e) {
    return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Y_() {
    return [];
}
function Ky(e) {
    return e == null
        ? Y_
        : function () {
              return this.querySelectorAll(e);
          };
}
function G_(e) {
    return function () {
        return B_(e.apply(this, arguments));
    };
}
function X_(e) {
    typeof e == 'function' ? (e = G_(e)) : (e = Ky(e));
    for (var t = this._groups, n = t.length, r = [], i = [], a = 0; a < n; ++a)
        for (var o = t[a], s = o.length, l, u = 0; u < s; ++u)
            (l = o[u]) && (r.push(e.call(l, l.__data__, u, o)), i.push(l));
    return new $e(r, i);
}
function Qy(e) {
    return function () {
        return this.matches(e);
    };
}
function qy(e) {
    return function (t) {
        return t.matches(e);
    };
}
var K_ = Array.prototype.find;
function Q_(e) {
    return function () {
        return K_.call(this.children, e);
    };
}
function q_() {
    return this.firstElementChild;
}
function J_(e) {
    return this.select(e == null ? q_ : Q_(typeof e == 'function' ? e : qy(e)));
}
var Z_ = Array.prototype.filter;
function eE() {
    return Array.from(this.children);
}
function tE(e) {
    return function () {
        return Z_.call(this.children, e);
    };
}
function nE(e) {
    return this.selectAll(
        e == null ? eE : tE(typeof e == 'function' ? e : qy(e))
    );
}
function rE(e) {
    typeof e != 'function' && (e = Qy(e));
    for (
        var t = this._groups, n = t.length, r = new Array(n), i = 0;
        i < n;
        ++i
    )
        for (var a = t[i], o = a.length, s = (r[i] = []), l, u = 0; u < o; ++u)
            (l = a[u]) && e.call(l, l.__data__, u, a) && s.push(l);
    return new $e(r, this._parents);
}
function Jy(e) {
    return new Array(e.length);
}
function iE() {
    return new $e(this._enter || this._groups.map(Jy), this._parents);
}
function zo(e, t) {
    (this.ownerDocument = e.ownerDocument),
        (this.namespaceURI = e.namespaceURI),
        (this._next = null),
        (this._parent = e),
        (this.__data__ = t);
}
zo.prototype = {
    constructor: zo,
    appendChild: function (e) {
        return this._parent.insertBefore(e, this._next);
    },
    insertBefore: function (e, t) {
        return this._parent.insertBefore(e, t);
    },
    querySelector: function (e) {
        return this._parent.querySelector(e);
    },
    querySelectorAll: function (e) {
        return this._parent.querySelectorAll(e);
    }
};
function aE(e) {
    return function () {
        return e;
    };
}
function oE(e, t, n, r, i, a) {
    for (var o = 0, s, l = t.length, u = a.length; o < u; ++o)
        (s = t[o])
            ? ((s.__data__ = a[o]), (r[o] = s))
            : (n[o] = new zo(e, a[o]));
    for (; o < l; ++o) (s = t[o]) && (i[o] = s);
}
function sE(e, t, n, r, i, a, o) {
    var s,
        l,
        u = new Map(),
        f = t.length,
        c = a.length,
        d = new Array(f),
        g;
    for (s = 0; s < f; ++s)
        (l = t[s]) &&
            ((d[s] = g = o.call(l, l.__data__, s, t) + ''),
            u.has(g) ? (i[s] = l) : u.set(g, l));
    for (s = 0; s < c; ++s)
        (g = o.call(e, a[s], s, a) + ''),
            (l = u.get(g))
                ? ((r[s] = l), (l.__data__ = a[s]), u.delete(g))
                : (n[s] = new zo(e, a[s]));
    for (s = 0; s < f; ++s) (l = t[s]) && u.get(d[s]) === l && (i[s] = l);
}
function lE(e) {
    return e.__data__;
}
function uE(e, t) {
    if (!arguments.length) return Array.from(this, lE);
    var n = t ? sE : oE,
        r = this._parents,
        i = this._groups;
    typeof e != 'function' && (e = aE(e));
    for (
        var a = i.length,
            o = new Array(a),
            s = new Array(a),
            l = new Array(a),
            u = 0;
        u < a;
        ++u
    ) {
        var f = r[u],
            c = i[u],
            d = c.length,
            g = cE(e.call(f, f && f.__data__, u, r)),
            w = g.length,
            y = (s[u] = new Array(w)),
            b = (o[u] = new Array(w)),
            m = (l[u] = new Array(d));
        n(f, c, y, b, m, g, t);
        for (var h = 0, p = 0, v, S; h < w; ++h)
            if ((v = y[h])) {
                for (h >= p && (p = h + 1); !(S = b[p]) && ++p < w; );
                v._next = S || null;
            }
    }
    return (o = new $e(o, r)), (o._enter = s), (o._exit = l), o;
}
function cE(e) {
    return typeof e == 'object' && 'length' in e ? e : Array.from(e);
}
function fE() {
    return new $e(this._exit || this._groups.map(Jy), this._parents);
}
function dE(e, t, n) {
    var r = this.enter(),
        i = this,
        a = this.exit();
    return (
        typeof e == 'function'
            ? ((r = e(r)), r && (r = r.selection()))
            : (r = r.append(e + '')),
        t != null && ((i = t(i)), i && (i = i.selection())),
        n == null ? a.remove() : n(a),
        r && i ? r.merge(i).order() : i
    );
}
function hE(e) {
    for (
        var t = e.selection ? e.selection() : e,
            n = this._groups,
            r = t._groups,
            i = n.length,
            a = r.length,
            o = Math.min(i, a),
            s = new Array(i),
            l = 0;
        l < o;
        ++l
    )
        for (
            var u = n[l],
                f = r[l],
                c = u.length,
                d = (s[l] = new Array(c)),
                g,
                w = 0;
            w < c;
            ++w
        )
            (g = u[w] || f[w]) && (d[w] = g);
    for (; l < i; ++l) s[l] = n[l];
    return new $e(s, this._parents);
}
function mE() {
    for (var e = this._groups, t = -1, n = e.length; ++t < n; )
        for (var r = e[t], i = r.length - 1, a = r[i], o; --i >= 0; )
            (o = r[i]) &&
                (a &&
                    o.compareDocumentPosition(a) ^ 4 &&
                    a.parentNode.insertBefore(o, a),
                (a = o));
    return this;
}
function pE(e) {
    e || (e = gE);
    function t(c, d) {
        return c && d ? e(c.__data__, d.__data__) : !c - !d;
    }
    for (
        var n = this._groups, r = n.length, i = new Array(r), a = 0;
        a < r;
        ++a
    ) {
        for (
            var o = n[a], s = o.length, l = (i[a] = new Array(s)), u, f = 0;
            f < s;
            ++f
        )
            (u = o[f]) && (l[f] = u);
        l.sort(t);
    }
    return new $e(i, this._parents).order();
}
function gE(e, t) {
    return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function yE() {
    var e = arguments[0];
    return (arguments[0] = this), e.apply(null, arguments), this;
}
function vE() {
    return Array.from(this);
}
function wE() {
    for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
        for (var r = e[t], i = 0, a = r.length; i < a; ++i) {
            var o = r[i];
            if (o) return o;
        }
    return null;
}
function xE() {
    let e = 0;
    for (const t of this) ++e;
    return e;
}
function kE() {
    return !this.node();
}
function SE(e) {
    for (var t = this._groups, n = 0, r = t.length; n < r; ++n)
        for (var i = t[n], a = 0, o = i.length, s; a < o; ++a)
            (s = i[a]) && e.call(s, s.__data__, a, i);
    return this;
}
function bE(e) {
    return function () {
        this.removeAttribute(e);
    };
}
function _E(e) {
    return function () {
        this.removeAttributeNS(e.space, e.local);
    };
}
function EE(e, t) {
    return function () {
        this.setAttribute(e, t);
    };
}
function CE(e, t) {
    return function () {
        this.setAttributeNS(e.space, e.local, t);
    };
}
function NE(e, t) {
    return function () {
        var n = t.apply(this, arguments);
        n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
    };
}
function AE(e, t) {
    return function () {
        var n = t.apply(this, arguments);
        n == null
            ? this.removeAttributeNS(e.space, e.local)
            : this.setAttributeNS(e.space, e.local, n);
    };
}
function TE(e, t) {
    var n = ms(e);
    if (arguments.length < 2) {
        var r = this.node();
        return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
    }
    return this.each(
        (t == null
            ? n.local
                ? _E
                : bE
            : typeof t == 'function'
            ? n.local
                ? AE
                : NE
            : n.local
            ? CE
            : EE)(n, t)
    );
}
function Zy(e) {
    return (
        (e.ownerDocument && e.ownerDocument.defaultView) ||
        (e.document && e) ||
        e.defaultView
    );
}
function PE(e) {
    return function () {
        this.style.removeProperty(e);
    };
}
function jE(e, t, n) {
    return function () {
        this.style.setProperty(e, t, n);
    };
}
function IE(e, t, n) {
    return function () {
        var r = t.apply(this, arguments);
        r == null
            ? this.style.removeProperty(e)
            : this.style.setProperty(e, r, n);
    };
}
function ME(e, t, n) {
    return arguments.length > 1
        ? this.each(
              (t == null ? PE : typeof t == 'function' ? IE : jE)(e, t, n ?? '')
          )
        : Tr(this.node(), e);
}
function Tr(e, t) {
    return (
        e.style.getPropertyValue(t) ||
        Zy(e).getComputedStyle(e, null).getPropertyValue(t)
    );
}
function zE(e) {
    return function () {
        delete this[e];
    };
}
function LE(e, t) {
    return function () {
        this[e] = t;
    };
}
function FE(e, t) {
    return function () {
        var n = t.apply(this, arguments);
        n == null ? delete this[e] : (this[e] = n);
    };
}
function $E(e, t) {
    return arguments.length > 1
        ? this.each((t == null ? zE : typeof t == 'function' ? FE : LE)(e, t))
        : this.node()[e];
}
function e0(e) {
    return e.trim().split(/^|\s+/);
}
function ef(e) {
    return e.classList || new t0(e);
}
function t0(e) {
    (this._node = e), (this._names = e0(e.getAttribute('class') || ''));
}
t0.prototype = {
    add: function (e) {
        var t = this._names.indexOf(e);
        t < 0 &&
            (this._names.push(e),
            this._node.setAttribute('class', this._names.join(' ')));
    },
    remove: function (e) {
        var t = this._names.indexOf(e);
        t >= 0 &&
            (this._names.splice(t, 1),
            this._node.setAttribute('class', this._names.join(' ')));
    },
    contains: function (e) {
        return this._names.indexOf(e) >= 0;
    }
};
function n0(e, t) {
    for (var n = ef(e), r = -1, i = t.length; ++r < i; ) n.add(t[r]);
}
function r0(e, t) {
    for (var n = ef(e), r = -1, i = t.length; ++r < i; ) n.remove(t[r]);
}
function RE(e) {
    return function () {
        n0(this, e);
    };
}
function OE(e) {
    return function () {
        r0(this, e);
    };
}
function DE(e, t) {
    return function () {
        (t.apply(this, arguments) ? n0 : r0)(this, e);
    };
}
function UE(e, t) {
    var n = e0(e + '');
    if (arguments.length < 2) {
        for (var r = ef(this.node()), i = -1, a = n.length; ++i < a; )
            if (!r.contains(n[i])) return !1;
        return !0;
    }
    return this.each((typeof t == 'function' ? DE : t ? RE : OE)(n, t));
}
function HE() {
    this.textContent = '';
}
function WE(e) {
    return function () {
        this.textContent = e;
    };
}
function VE(e) {
    return function () {
        var t = e.apply(this, arguments);
        this.textContent = t ?? '';
    };
}
function BE(e) {
    return arguments.length
        ? this.each(e == null ? HE : (typeof e == 'function' ? VE : WE)(e))
        : this.node().textContent;
}
function YE() {
    this.innerHTML = '';
}
function GE(e) {
    return function () {
        this.innerHTML = e;
    };
}
function XE(e) {
    return function () {
        var t = e.apply(this, arguments);
        this.innerHTML = t ?? '';
    };
}
function KE(e) {
    return arguments.length
        ? this.each(e == null ? YE : (typeof e == 'function' ? XE : GE)(e))
        : this.node().innerHTML;
}
function QE() {
    this.nextSibling && this.parentNode.appendChild(this);
}
function qE() {
    return this.each(QE);
}
function JE() {
    this.previousSibling &&
        this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function ZE() {
    return this.each(JE);
}
function eC(e) {
    var t = typeof e == 'function' ? e : Xy(e);
    return this.select(function () {
        return this.appendChild(t.apply(this, arguments));
    });
}
function tC() {
    return null;
}
function nC(e, t) {
    var n = typeof e == 'function' ? e : Xy(e),
        r = t == null ? tC : typeof t == 'function' ? t : Zc(t);
    return this.select(function () {
        return this.insertBefore(
            n.apply(this, arguments),
            r.apply(this, arguments) || null
        );
    });
}
function rC() {
    var e = this.parentNode;
    e && e.removeChild(this);
}
function iC() {
    return this.each(rC);
}
function aC() {
    var e = this.cloneNode(!1),
        t = this.parentNode;
    return t ? t.insertBefore(e, this.nextSibling) : e;
}
function oC() {
    var e = this.cloneNode(!0),
        t = this.parentNode;
    return t ? t.insertBefore(e, this.nextSibling) : e;
}
function sC(e) {
    return this.select(e ? oC : aC);
}
function lC(e) {
    return arguments.length
        ? this.property('__data__', e)
        : this.node().__data__;
}
function uC(e) {
    return function (t) {
        e.call(this, t, this.__data__);
    };
}
function cC(e) {
    return e
        .trim()
        .split(/^|\s+/)
        .map(function (t) {
            var n = '',
                r = t.indexOf('.');
            return (
                r >= 0 && ((n = t.slice(r + 1)), (t = t.slice(0, r))),
                { type: t, name: n }
            );
        });
}
function fC(e) {
    return function () {
        var t = this.__on;
        if (t) {
            for (var n = 0, r = -1, i = t.length, a; n < i; ++n)
                (a = t[n]),
                    (!e.type || a.type === e.type) && a.name === e.name
                        ? this.removeEventListener(
                              a.type,
                              a.listener,
                              a.options
                          )
                        : (t[++r] = a);
            ++r ? (t.length = r) : delete this.__on;
        }
    };
}
function dC(e, t, n) {
    return function () {
        var r = this.__on,
            i,
            a = uC(t);
        if (r) {
            for (var o = 0, s = r.length; o < s; ++o)
                if ((i = r[o]).type === e.type && i.name === e.name) {
                    this.removeEventListener(i.type, i.listener, i.options),
                        this.addEventListener(
                            i.type,
                            (i.listener = a),
                            (i.options = n)
                        ),
                        (i.value = t);
                    return;
                }
        }
        this.addEventListener(e.type, a, n),
            (i = {
                type: e.type,
                name: e.name,
                value: t,
                listener: a,
                options: n
            }),
            r ? r.push(i) : (this.__on = [i]);
    };
}
function hC(e, t, n) {
    var r = cC(e + ''),
        i,
        a = r.length,
        o;
    if (arguments.length < 2) {
        var s = this.node().__on;
        if (s) {
            for (var l = 0, u = s.length, f; l < u; ++l)
                for (i = 0, f = s[l]; i < a; ++i)
                    if ((o = r[i]).type === f.type && o.name === f.name)
                        return f.value;
        }
        return;
    }
    for (s = t ? dC : fC, i = 0; i < a; ++i) this.each(s(r[i], t, n));
    return this;
}
function i0(e, t, n) {
    var r = Zy(e),
        i = r.CustomEvent;
    typeof i == 'function'
        ? (i = new i(t, n))
        : ((i = r.document.createEvent('Event')),
          n
              ? (i.initEvent(t, n.bubbles, n.cancelable), (i.detail = n.detail))
              : i.initEvent(t, !1, !1)),
        e.dispatchEvent(i);
}
function mC(e, t) {
    return function () {
        return i0(this, e, t);
    };
}
function pC(e, t) {
    return function () {
        return i0(this, e, t.apply(this, arguments));
    };
}
function gC(e, t) {
    return this.each((typeof t == 'function' ? pC : mC)(e, t));
}
function* yC() {
    for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
        for (var r = e[t], i = 0, a = r.length, o; i < a; ++i)
            (o = r[i]) && (yield o);
}
var a0 = [null];
function $e(e, t) {
    (this._groups = e), (this._parents = t);
}
function ta() {
    return new $e([[document.documentElement]], a0);
}
function vC() {
    return this;
}
$e.prototype = ta.prototype = {
    constructor: $e,
    select: V_,
    selectAll: X_,
    selectChild: J_,
    selectChildren: nE,
    filter: rE,
    data: uE,
    enter: iE,
    exit: fE,
    join: dE,
    merge: hE,
    selection: vC,
    order: mE,
    sort: pE,
    call: yE,
    nodes: vE,
    node: wE,
    size: xE,
    empty: kE,
    each: SE,
    attr: TE,
    style: ME,
    property: $E,
    classed: UE,
    text: BE,
    html: KE,
    raise: qE,
    lower: ZE,
    append: eC,
    insert: nC,
    remove: iC,
    clone: sC,
    datum: lC,
    on: hC,
    dispatch: gC,
    [Symbol.iterator]: yC
};
function Be(e) {
    return typeof e == 'string'
        ? new $e([[document.querySelector(e)]], [document.documentElement])
        : new $e([[e]], a0);
}
function tf(e, t, n) {
    (e.prototype = t.prototype = n), (n.constructor = e);
}
function o0(e, t) {
    var n = Object.create(e.prototype);
    for (var r in t) n[r] = t[r];
    return n;
}
function na() {}
var Vi = 0.7,
    Lo = 1 / Vi,
    wr = '\\s*([+-]?\\d+)\\s*',
    Bi = '\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*',
    gt = '\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*',
    wC = /^#([0-9a-f]{3,8})$/,
    xC = new RegExp(`^rgb\\(${wr},${wr},${wr}\\)$`),
    kC = new RegExp(`^rgb\\(${gt},${gt},${gt}\\)$`),
    SC = new RegExp(`^rgba\\(${wr},${wr},${wr},${Bi}\\)$`),
    bC = new RegExp(`^rgba\\(${gt},${gt},${gt},${Bi}\\)$`),
    _C = new RegExp(`^hsl\\(${Bi},${gt},${gt}\\)$`),
    EC = new RegExp(`^hsla\\(${Bi},${gt},${gt},${Bi}\\)$`),
    Nh = {
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        rebeccapurple: 6697881,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074
    };
tf(na, zn, {
    copy(e) {
        return Object.assign(new this.constructor(), this, e);
    },
    displayable() {
        return this.rgb().displayable();
    },
    hex: Ah,
    formatHex: Ah,
    formatHex8: CC,
    formatHsl: NC,
    formatRgb: Th,
    toString: Th
});
function Ah() {
    return this.rgb().formatHex();
}
function CC() {
    return this.rgb().formatHex8();
}
function NC() {
    return s0(this).formatHsl();
}
function Th() {
    return this.rgb().formatRgb();
}
function zn(e) {
    var t, n;
    return (
        (e = (e + '').trim().toLowerCase()),
        (t = wC.exec(e))
            ? ((n = t[1].length),
              (t = parseInt(t[1], 16)),
              n === 6
                  ? Ph(t)
                  : n === 3
                  ? new Te(
                        ((t >> 8) & 15) | ((t >> 4) & 240),
                        ((t >> 4) & 15) | (t & 240),
                        ((t & 15) << 4) | (t & 15),
                        1
                    )
                  : n === 8
                  ? Ta(
                        (t >> 24) & 255,
                        (t >> 16) & 255,
                        (t >> 8) & 255,
                        (t & 255) / 255
                    )
                  : n === 4
                  ? Ta(
                        ((t >> 12) & 15) | ((t >> 8) & 240),
                        ((t >> 8) & 15) | ((t >> 4) & 240),
                        ((t >> 4) & 15) | (t & 240),
                        (((t & 15) << 4) | (t & 15)) / 255
                    )
                  : null)
            : (t = xC.exec(e))
            ? new Te(t[1], t[2], t[3], 1)
            : (t = kC.exec(e))
            ? new Te(
                  (t[1] * 255) / 100,
                  (t[2] * 255) / 100,
                  (t[3] * 255) / 100,
                  1
              )
            : (t = SC.exec(e))
            ? Ta(t[1], t[2], t[3], t[4])
            : (t = bC.exec(e))
            ? Ta(
                  (t[1] * 255) / 100,
                  (t[2] * 255) / 100,
                  (t[3] * 255) / 100,
                  t[4]
              )
            : (t = _C.exec(e))
            ? Mh(t[1], t[2] / 100, t[3] / 100, 1)
            : (t = EC.exec(e))
            ? Mh(t[1], t[2] / 100, t[3] / 100, t[4])
            : Nh.hasOwnProperty(e)
            ? Ph(Nh[e])
            : e === 'transparent'
            ? new Te(NaN, NaN, NaN, 0)
            : null
    );
}
function Ph(e) {
    return new Te((e >> 16) & 255, (e >> 8) & 255, e & 255, 1);
}
function Ta(e, t, n, r) {
    return r <= 0 && (e = t = n = NaN), new Te(e, t, n, r);
}
function AC(e) {
    return (
        e instanceof na || (e = zn(e)),
        e ? ((e = e.rgb()), new Te(e.r, e.g, e.b, e.opacity)) : new Te()
    );
}
function Iu(e, t, n, r) {
    return arguments.length === 1 ? AC(e) : new Te(e, t, n, r ?? 1);
}
function Te(e, t, n, r) {
    (this.r = +e), (this.g = +t), (this.b = +n), (this.opacity = +r);
}
tf(
    Te,
    Iu,
    o0(na, {
        brighter(e) {
            return (
                (e = e == null ? Lo : Math.pow(Lo, e)),
                new Te(this.r * e, this.g * e, this.b * e, this.opacity)
            );
        },
        darker(e) {
            return (
                (e = e == null ? Vi : Math.pow(Vi, e)),
                new Te(this.r * e, this.g * e, this.b * e, this.opacity)
            );
        },
        rgb() {
            return this;
        },
        clamp() {
            return new Te(En(this.r), En(this.g), En(this.b), Fo(this.opacity));
        },
        displayable() {
            return (
                -0.5 <= this.r &&
                this.r < 255.5 &&
                -0.5 <= this.g &&
                this.g < 255.5 &&
                -0.5 <= this.b &&
                this.b < 255.5 &&
                0 <= this.opacity &&
                this.opacity <= 1
            );
        },
        hex: jh,
        formatHex: jh,
        formatHex8: TC,
        formatRgb: Ih,
        toString: Ih
    })
);
function jh() {
    return `#${Sn(this.r)}${Sn(this.g)}${Sn(this.b)}`;
}
function TC() {
    return `#${Sn(this.r)}${Sn(this.g)}${Sn(this.b)}${Sn(
        (isNaN(this.opacity) ? 1 : this.opacity) * 255
    )}`;
}
function Ih() {
    const e = Fo(this.opacity);
    return `${e === 1 ? 'rgb(' : 'rgba('}${En(this.r)}, ${En(this.g)}, ${En(
        this.b
    )}${e === 1 ? ')' : `, ${e})`}`;
}
function Fo(e) {
    return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function En(e) {
    return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Sn(e) {
    return (e = En(e)), (e < 16 ? '0' : '') + e.toString(16);
}
function Mh(e, t, n, r) {
    return (
        r <= 0
            ? (e = t = n = NaN)
            : n <= 0 || n >= 1
            ? (e = t = NaN)
            : t <= 0 && (e = NaN),
        new nt(e, t, n, r)
    );
}
function s0(e) {
    if (e instanceof nt) return new nt(e.h, e.s, e.l, e.opacity);
    if ((e instanceof na || (e = zn(e)), !e)) return new nt();
    if (e instanceof nt) return e;
    e = e.rgb();
    var t = e.r / 255,
        n = e.g / 255,
        r = e.b / 255,
        i = Math.min(t, n, r),
        a = Math.max(t, n, r),
        o = NaN,
        s = a - i,
        l = (a + i) / 2;
    return (
        s
            ? (t === a
                  ? (o = (n - r) / s + (n < r) * 6)
                  : n === a
                  ? (o = (r - t) / s + 2)
                  : (o = (t - n) / s + 4),
              (s /= l < 0.5 ? a + i : 2 - a - i),
              (o *= 60))
            : (s = l > 0 && l < 1 ? 0 : o),
        new nt(o, s, l, e.opacity)
    );
}
function PC(e, t, n, r) {
    return arguments.length === 1 ? s0(e) : new nt(e, t, n, r ?? 1);
}
function nt(e, t, n, r) {
    (this.h = +e), (this.s = +t), (this.l = +n), (this.opacity = +r);
}
tf(
    nt,
    PC,
    o0(na, {
        brighter(e) {
            return (
                (e = e == null ? Lo : Math.pow(Lo, e)),
                new nt(this.h, this.s, this.l * e, this.opacity)
            );
        },
        darker(e) {
            return (
                (e = e == null ? Vi : Math.pow(Vi, e)),
                new nt(this.h, this.s, this.l * e, this.opacity)
            );
        },
        rgb() {
            var e = (this.h % 360) + (this.h < 0) * 360,
                t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
                n = this.l,
                r = n + (n < 0.5 ? n : 1 - n) * t,
                i = 2 * n - r;
            return new Te(
                ll(e >= 240 ? e - 240 : e + 120, i, r),
                ll(e, i, r),
                ll(e < 120 ? e + 240 : e - 120, i, r),
                this.opacity
            );
        },
        clamp() {
            return new nt(zh(this.h), Pa(this.s), Pa(this.l), Fo(this.opacity));
        },
        displayable() {
            return (
                ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
                0 <= this.l &&
                this.l <= 1 &&
                0 <= this.opacity &&
                this.opacity <= 1
            );
        },
        formatHsl() {
            const e = Fo(this.opacity);
            return `${e === 1 ? 'hsl(' : 'hsla('}${zh(this.h)}, ${
                Pa(this.s) * 100
            }%, ${Pa(this.l) * 100}%${e === 1 ? ')' : `, ${e})`}`;
        }
    })
);
function zh(e) {
    return (e = (e || 0) % 360), e < 0 ? e + 360 : e;
}
function Pa(e) {
    return Math.max(0, Math.min(1, e || 0));
}
function ll(e, t, n) {
    return (
        (e < 60
            ? t + ((n - t) * e) / 60
            : e < 180
            ? n
            : e < 240
            ? t + ((n - t) * (240 - e)) / 60
            : t) * 255
    );
}
const nf = (e) => () => e;
function jC(e, t) {
    return function (n) {
        return e + n * t;
    };
}
function IC(e, t, n) {
    return (
        (e = Math.pow(e, n)),
        (t = Math.pow(t, n) - e),
        (n = 1 / n),
        function (r) {
            return Math.pow(e + r * t, n);
        }
    );
}
function MC(e) {
    return (e = +e) == 1
        ? l0
        : function (t, n) {
              return n - t ? IC(t, n, e) : nf(isNaN(t) ? n : t);
          };
}
function l0(e, t) {
    var n = t - e;
    return n ? jC(e, n) : nf(isNaN(e) ? t : e);
}
const $o = (function e(t) {
    var n = MC(t);
    function r(i, a) {
        var o = n((i = Iu(i)).r, (a = Iu(a)).r),
            s = n(i.g, a.g),
            l = n(i.b, a.b),
            u = l0(i.opacity, a.opacity);
        return function (f) {
            return (
                (i.r = o(f)),
                (i.g = s(f)),
                (i.b = l(f)),
                (i.opacity = u(f)),
                i + ''
            );
        };
    }
    return (r.gamma = e), r;
})(1);
function zC(e, t) {
    t || (t = []);
    var n = e ? Math.min(t.length, e.length) : 0,
        r = t.slice(),
        i;
    return function (a) {
        for (i = 0; i < n; ++i) r[i] = e[i] * (1 - a) + t[i] * a;
        return r;
    };
}
function LC(e) {
    return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function FC(e, t) {
    var n = t ? t.length : 0,
        r = e ? Math.min(n, e.length) : 0,
        i = new Array(r),
        a = new Array(n),
        o;
    for (o = 0; o < r; ++o) i[o] = rf(e[o], t[o]);
    for (; o < n; ++o) a[o] = t[o];
    return function (s) {
        for (o = 0; o < r; ++o) a[o] = i[o](s);
        return a;
    };
}
function $C(e, t) {
    var n = new Date();
    return (
        (e = +e),
        (t = +t),
        function (r) {
            return n.setTime(e * (1 - r) + t * r), n;
        }
    );
}
function tt(e, t) {
    return (
        (e = +e),
        (t = +t),
        function (n) {
            return e * (1 - n) + t * n;
        }
    );
}
function RC(e, t) {
    var n = {},
        r = {},
        i;
    (e === null || typeof e != 'object') && (e = {}),
        (t === null || typeof t != 'object') && (t = {});
    for (i in t) i in e ? (n[i] = rf(e[i], t[i])) : (r[i] = t[i]);
    return function (a) {
        for (i in n) r[i] = n[i](a);
        return r;
    };
}
var Mu = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    ul = new RegExp(Mu.source, 'g');
function OC(e) {
    return function () {
        return e;
    };
}
function DC(e) {
    return function (t) {
        return e(t) + '';
    };
}
function u0(e, t) {
    var n = (Mu.lastIndex = ul.lastIndex = 0),
        r,
        i,
        a,
        o = -1,
        s = [],
        l = [];
    for (e = e + '', t = t + ''; (r = Mu.exec(e)) && (i = ul.exec(t)); )
        (a = i.index) > n &&
            ((a = t.slice(n, a)), s[o] ? (s[o] += a) : (s[++o] = a)),
            (r = r[0]) === (i = i[0])
                ? s[o]
                    ? (s[o] += i)
                    : (s[++o] = i)
                : ((s[++o] = null), l.push({ i: o, x: tt(r, i) })),
            (n = ul.lastIndex);
    return (
        n < t.length && ((a = t.slice(n)), s[o] ? (s[o] += a) : (s[++o] = a)),
        s.length < 2
            ? l[0]
                ? DC(l[0].x)
                : OC(t)
            : ((t = l.length),
              function (u) {
                  for (var f = 0, c; f < t; ++f) s[(c = l[f]).i] = c.x(u);
                  return s.join('');
              })
    );
}
function rf(e, t) {
    var n = typeof t,
        r;
    return t == null || n === 'boolean'
        ? nf(t)
        : (n === 'number'
              ? tt
              : n === 'string'
              ? (r = zn(t))
                  ? ((t = r), $o)
                  : u0
              : t instanceof zn
              ? $o
              : t instanceof Date
              ? $C
              : LC(t)
              ? zC
              : Array.isArray(t)
              ? FC
              : (typeof t.valueOf != 'function' &&
                    typeof t.toString != 'function') ||
                isNaN(t)
              ? RC
              : tt)(e, t);
}
function UC(e, t) {
    return (
        (e = +e),
        (t = +t),
        function (n) {
            return Math.round(e * (1 - n) + t * n);
        }
    );
}
var Lh = 180 / Math.PI,
    zu = {
        translateX: 0,
        translateY: 0,
        rotate: 0,
        skewX: 0,
        scaleX: 1,
        scaleY: 1
    };
function c0(e, t, n, r, i, a) {
    var o, s, l;
    return (
        (o = Math.sqrt(e * e + t * t)) && ((e /= o), (t /= o)),
        (l = e * n + t * r) && ((n -= e * l), (r -= t * l)),
        (s = Math.sqrt(n * n + r * r)) && ((n /= s), (r /= s), (l /= s)),
        e * r < t * n && ((e = -e), (t = -t), (l = -l), (o = -o)),
        {
            translateX: i,
            translateY: a,
            rotate: Math.atan2(t, e) * Lh,
            skewX: Math.atan(l) * Lh,
            scaleX: o,
            scaleY: s
        }
    );
}
var ja;
function HC(e) {
    const t = new (
        typeof DOMMatrix == 'function' ? DOMMatrix : WebKitCSSMatrix
    )(e + '');
    return t.isIdentity ? zu : c0(t.a, t.b, t.c, t.d, t.e, t.f);
}
function WC(e) {
    return e == null ||
        (ja ||
            (ja = document.createElementNS('http://www.w3.org/2000/svg', 'g')),
        ja.setAttribute('transform', e),
        !(e = ja.transform.baseVal.consolidate()))
        ? zu
        : ((e = e.matrix), c0(e.a, e.b, e.c, e.d, e.e, e.f));
}
function f0(e, t, n, r) {
    function i(u) {
        return u.length ? u.pop() + ' ' : '';
    }
    function a(u, f, c, d, g, w) {
        if (u !== c || f !== d) {
            var y = g.push('translate(', null, t, null, n);
            w.push({ i: y - 4, x: tt(u, c) }, { i: y - 2, x: tt(f, d) });
        } else (c || d) && g.push('translate(' + c + t + d + n);
    }
    function o(u, f, c, d) {
        u !== f
            ? (u - f > 180 ? (f += 360) : f - u > 180 && (u += 360),
              d.push({ i: c.push(i(c) + 'rotate(', null, r) - 2, x: tt(u, f) }))
            : f && c.push(i(c) + 'rotate(' + f + r);
    }
    function s(u, f, c, d) {
        u !== f
            ? d.push({ i: c.push(i(c) + 'skewX(', null, r) - 2, x: tt(u, f) })
            : f && c.push(i(c) + 'skewX(' + f + r);
    }
    function l(u, f, c, d, g, w) {
        if (u !== c || f !== d) {
            var y = g.push(i(g) + 'scale(', null, ',', null, ')');
            w.push({ i: y - 4, x: tt(u, c) }, { i: y - 2, x: tt(f, d) });
        } else
            (c !== 1 || d !== 1) && g.push(i(g) + 'scale(' + c + ',' + d + ')');
    }
    return function (u, f) {
        var c = [],
            d = [];
        return (
            (u = e(u)),
            (f = e(f)),
            a(u.translateX, u.translateY, f.translateX, f.translateY, c, d),
            o(u.rotate, f.rotate, c, d),
            s(u.skewX, f.skewX, c, d),
            l(u.scaleX, u.scaleY, f.scaleX, f.scaleY, c, d),
            (u = f = null),
            function (g) {
                for (var w = -1, y = d.length, b; ++w < y; )
                    c[(b = d[w]).i] = b.x(g);
                return c.join('');
            }
        );
    };
}
var VC = f0(HC, 'px, ', 'px)', 'deg)'),
    BC = f0(WC, ', ', ')', ')'),
    Pr = 0,
    oi = 0,
    Qr = 0,
    d0 = 1e3,
    Ro,
    si,
    Oo = 0,
    Ln = 0,
    ps = 0,
    Yi = typeof performance == 'object' && performance.now ? performance : Date,
    h0 =
        typeof window == 'object' && window.requestAnimationFrame
            ? window.requestAnimationFrame.bind(window)
            : function (e) {
                  setTimeout(e, 17);
              };
function af() {
    return Ln || (h0(YC), (Ln = Yi.now() + ps));
}
function YC() {
    Ln = 0;
}
function Do() {
    this._call = this._time = this._next = null;
}
Do.prototype = m0.prototype = {
    constructor: Do,
    restart: function (e, t, n) {
        if (typeof e != 'function')
            throw new TypeError('callback is not a function');
        (n = (n == null ? af() : +n) + (t == null ? 0 : +t)),
            !this._next &&
                si !== this &&
                (si ? (si._next = this) : (Ro = this), (si = this)),
            (this._call = e),
            (this._time = n),
            Lu();
    },
    stop: function () {
        this._call && ((this._call = null), (this._time = 1 / 0), Lu());
    }
};
function m0(e, t, n) {
    var r = new Do();
    return r.restart(e, t, n), r;
}
function GC() {
    af(), ++Pr;
    for (var e = Ro, t; e; )
        (t = Ln - e._time) >= 0 && e._call.call(void 0, t), (e = e._next);
    --Pr;
}
function Fh() {
    (Ln = (Oo = Yi.now()) + ps), (Pr = oi = 0);
    try {
        GC();
    } finally {
        (Pr = 0), KC(), (Ln = 0);
    }
}
function XC() {
    var e = Yi.now(),
        t = e - Oo;
    t > d0 && ((ps -= t), (Oo = e));
}
function KC() {
    for (var e, t = Ro, n, r = 1 / 0; t; )
        t._call
            ? (r > t._time && (r = t._time), (e = t), (t = t._next))
            : ((n = t._next),
              (t._next = null),
              (t = e ? (e._next = n) : (Ro = n)));
    (si = e), Lu(r);
}
function Lu(e) {
    if (!Pr) {
        oi && (oi = clearTimeout(oi));
        var t = e - Ln;
        t > 24
            ? (e < 1 / 0 && (oi = setTimeout(Fh, e - Yi.now() - ps)),
              Qr && (Qr = clearInterval(Qr)))
            : (Qr || ((Oo = Yi.now()), (Qr = setInterval(XC, d0))),
              (Pr = 1),
              h0(Fh));
    }
}
function $h(e, t, n) {
    var r = new Do();
    return (
        (t = t == null ? 0 : +t),
        r.restart(
            (i) => {
                r.stop(), e(i + t);
            },
            t,
            n
        ),
        r
    );
}
var QC = Gy('start', 'end', 'cancel', 'interrupt'),
    qC = [],
    p0 = 0,
    Rh = 1,
    Fu = 2,
    eo = 3,
    Oh = 4,
    $u = 5,
    to = 6;
function gs(e, t, n, r, i, a) {
    var o = e.__transition;
    if (!o) e.__transition = {};
    else if (n in o) return;
    JC(e, n, {
        name: t,
        index: r,
        group: i,
        on: QC,
        tween: qC,
        time: a.time,
        delay: a.delay,
        duration: a.duration,
        ease: a.ease,
        timer: null,
        state: p0
    });
}
function of(e, t) {
    var n = lt(e, t);
    if (n.state > p0) throw new Error('too late; already scheduled');
    return n;
}
function yt(e, t) {
    var n = lt(e, t);
    if (n.state > eo) throw new Error('too late; already running');
    return n;
}
function lt(e, t) {
    var n = e.__transition;
    if (!n || !(n = n[t])) throw new Error('transition not found');
    return n;
}
function JC(e, t, n) {
    var r = e.__transition,
        i;
    (r[t] = n), (n.timer = m0(a, 0, n.time));
    function a(u) {
        (n.state = Rh),
            n.timer.restart(o, n.delay, n.time),
            n.delay <= u && o(u - n.delay);
    }
    function o(u) {
        var f, c, d, g;
        if (n.state !== Rh) return l();
        for (f in r)
            if (((g = r[f]), g.name === n.name)) {
                if (g.state === eo) return $h(o);
                g.state === Oh
                    ? ((g.state = to),
                      g.timer.stop(),
                      g.on.call('interrupt', e, e.__data__, g.index, g.group),
                      delete r[f])
                    : +f < t &&
                      ((g.state = to),
                      g.timer.stop(),
                      g.on.call('cancel', e, e.__data__, g.index, g.group),
                      delete r[f]);
            }
        if (
            ($h(function () {
                n.state === eo &&
                    ((n.state = Oh), n.timer.restart(s, n.delay, n.time), s(u));
            }),
            (n.state = Fu),
            n.on.call('start', e, e.__data__, n.index, n.group),
            n.state === Fu)
        ) {
            for (
                n.state = eo,
                    i = new Array((d = n.tween.length)),
                    f = 0,
                    c = -1;
                f < d;
                ++f
            )
                (g = n.tween[f].value.call(e, e.__data__, n.index, n.group)) &&
                    (i[++c] = g);
            i.length = c + 1;
        }
    }
    function s(u) {
        for (
            var f =
                    u < n.duration
                        ? n.ease.call(null, u / n.duration)
                        : (n.timer.restart(l), (n.state = $u), 1),
                c = -1,
                d = i.length;
            ++c < d;

        )
            i[c].call(e, f);
        n.state === $u &&
            (n.on.call('end', e, e.__data__, n.index, n.group), l());
    }
    function l() {
        (n.state = to), n.timer.stop(), delete r[t];
        for (var u in r) return;
        delete e.__transition;
    }
}
function ZC(e, t) {
    var n = e.__transition,
        r,
        i,
        a = !0,
        o;
    if (n) {
        t = t == null ? null : t + '';
        for (o in n) {
            if ((r = n[o]).name !== t) {
                a = !1;
                continue;
            }
            (i = r.state > Fu && r.state < $u),
                (r.state = to),
                r.timer.stop(),
                r.on.call(
                    i ? 'interrupt' : 'cancel',
                    e,
                    e.__data__,
                    r.index,
                    r.group
                ),
                delete n[o];
        }
        a && delete e.__transition;
    }
}
function e4(e) {
    return this.each(function () {
        ZC(this, e);
    });
}
function t4(e, t) {
    var n, r;
    return function () {
        var i = yt(this, e),
            a = i.tween;
        if (a !== n) {
            r = n = a;
            for (var o = 0, s = r.length; o < s; ++o)
                if (r[o].name === t) {
                    (r = r.slice()), r.splice(o, 1);
                    break;
                }
        }
        i.tween = r;
    };
}
function n4(e, t, n) {
    var r, i;
    if (typeof n != 'function') throw new Error();
    return function () {
        var a = yt(this, e),
            o = a.tween;
        if (o !== r) {
            i = (r = o).slice();
            for (var s = { name: t, value: n }, l = 0, u = i.length; l < u; ++l)
                if (i[l].name === t) {
                    i[l] = s;
                    break;
                }
            l === u && i.push(s);
        }
        a.tween = i;
    };
}
function r4(e, t) {
    var n = this._id;
    if (((e += ''), arguments.length < 2)) {
        for (
            var r = lt(this.node(), n).tween, i = 0, a = r.length, o;
            i < a;
            ++i
        )
            if ((o = r[i]).name === e) return o.value;
        return null;
    }
    return this.each((t == null ? t4 : n4)(n, e, t));
}
function sf(e, t, n) {
    var r = e._id;
    return (
        e.each(function () {
            var i = yt(this, r);
            (i.value || (i.value = {}))[t] = n.apply(this, arguments);
        }),
        function (i) {
            return lt(i, r).value[t];
        }
    );
}
function g0(e, t) {
    var n;
    return (
        typeof t == 'number'
            ? tt
            : t instanceof zn
            ? $o
            : (n = zn(t))
            ? ((t = n), $o)
            : u0
    )(e, t);
}
function i4(e) {
    return function () {
        this.removeAttribute(e);
    };
}
function a4(e) {
    return function () {
        this.removeAttributeNS(e.space, e.local);
    };
}
function o4(e, t, n) {
    var r,
        i = n + '',
        a;
    return function () {
        var o = this.getAttribute(e);
        return o === i ? null : o === r ? a : (a = t((r = o), n));
    };
}
function s4(e, t, n) {
    var r,
        i = n + '',
        a;
    return function () {
        var o = this.getAttributeNS(e.space, e.local);
        return o === i ? null : o === r ? a : (a = t((r = o), n));
    };
}
function l4(e, t, n) {
    var r, i, a;
    return function () {
        var o,
            s = n(this),
            l;
        return s == null
            ? void this.removeAttribute(e)
            : ((o = this.getAttribute(e)),
              (l = s + ''),
              o === l
                  ? null
                  : o === r && l === i
                  ? a
                  : ((i = l), (a = t((r = o), s))));
    };
}
function u4(e, t, n) {
    var r, i, a;
    return function () {
        var o,
            s = n(this),
            l;
        return s == null
            ? void this.removeAttributeNS(e.space, e.local)
            : ((o = this.getAttributeNS(e.space, e.local)),
              (l = s + ''),
              o === l
                  ? null
                  : o === r && l === i
                  ? a
                  : ((i = l), (a = t((r = o), s))));
    };
}
function c4(e, t) {
    var n = ms(e),
        r = n === 'transform' ? BC : g0;
    return this.attrTween(
        e,
        typeof t == 'function'
            ? (n.local ? u4 : l4)(n, r, sf(this, 'attr.' + e, t))
            : t == null
            ? (n.local ? a4 : i4)(n)
            : (n.local ? s4 : o4)(n, r, t)
    );
}
function f4(e, t) {
    return function (n) {
        this.setAttribute(e, t.call(this, n));
    };
}
function d4(e, t) {
    return function (n) {
        this.setAttributeNS(e.space, e.local, t.call(this, n));
    };
}
function h4(e, t) {
    var n, r;
    function i() {
        var a = t.apply(this, arguments);
        return a !== r && (n = (r = a) && d4(e, a)), n;
    }
    return (i._value = t), i;
}
function m4(e, t) {
    var n, r;
    function i() {
        var a = t.apply(this, arguments);
        return a !== r && (n = (r = a) && f4(e, a)), n;
    }
    return (i._value = t), i;
}
function p4(e, t) {
    var n = 'attr.' + e;
    if (arguments.length < 2) return (n = this.tween(n)) && n._value;
    if (t == null) return this.tween(n, null);
    if (typeof t != 'function') throw new Error();
    var r = ms(e);
    return this.tween(n, (r.local ? h4 : m4)(r, t));
}
function g4(e, t) {
    return function () {
        of(this, e).delay = +t.apply(this, arguments);
    };
}
function y4(e, t) {
    return (
        (t = +t),
        function () {
            of(this, e).delay = t;
        }
    );
}
function v4(e) {
    var t = this._id;
    return arguments.length
        ? this.each((typeof e == 'function' ? g4 : y4)(t, e))
        : lt(this.node(), t).delay;
}
function w4(e, t) {
    return function () {
        yt(this, e).duration = +t.apply(this, arguments);
    };
}
function x4(e, t) {
    return (
        (t = +t),
        function () {
            yt(this, e).duration = t;
        }
    );
}
function k4(e) {
    var t = this._id;
    return arguments.length
        ? this.each((typeof e == 'function' ? w4 : x4)(t, e))
        : lt(this.node(), t).duration;
}
function S4(e, t) {
    if (typeof t != 'function') throw new Error();
    return function () {
        yt(this, e).ease = t;
    };
}
function b4(e) {
    var t = this._id;
    return arguments.length ? this.each(S4(t, e)) : lt(this.node(), t).ease;
}
function _4(e, t) {
    return function () {
        var n = t.apply(this, arguments);
        if (typeof n != 'function') throw new Error();
        yt(this, e).ease = n;
    };
}
function E4(e) {
    if (typeof e != 'function') throw new Error();
    return this.each(_4(this._id, e));
}
function C4(e) {
    typeof e != 'function' && (e = Qy(e));
    for (
        var t = this._groups, n = t.length, r = new Array(n), i = 0;
        i < n;
        ++i
    )
        for (var a = t[i], o = a.length, s = (r[i] = []), l, u = 0; u < o; ++u)
            (l = a[u]) && e.call(l, l.__data__, u, a) && s.push(l);
    return new Lt(r, this._parents, this._name, this._id);
}
function N4(e) {
    if (e._id !== this._id) throw new Error();
    for (
        var t = this._groups,
            n = e._groups,
            r = t.length,
            i = n.length,
            a = Math.min(r, i),
            o = new Array(r),
            s = 0;
        s < a;
        ++s
    )
        for (
            var l = t[s],
                u = n[s],
                f = l.length,
                c = (o[s] = new Array(f)),
                d,
                g = 0;
            g < f;
            ++g
        )
            (d = l[g] || u[g]) && (c[g] = d);
    for (; s < r; ++s) o[s] = t[s];
    return new Lt(o, this._parents, this._name, this._id);
}
function A4(e) {
    return (e + '')
        .trim()
        .split(/^|\s+/)
        .every(function (t) {
            var n = t.indexOf('.');
            return n >= 0 && (t = t.slice(0, n)), !t || t === 'start';
        });
}
function T4(e, t, n) {
    var r,
        i,
        a = A4(t) ? of : yt;
    return function () {
        var o = a(this, e),
            s = o.on;
        s !== r && (i = (r = s).copy()).on(t, n), (o.on = i);
    };
}
function P4(e, t) {
    var n = this._id;
    return arguments.length < 2
        ? lt(this.node(), n).on.on(e)
        : this.each(T4(n, e, t));
}
function j4(e) {
    return function () {
        var t = this.parentNode;
        for (var n in this.__transition) if (+n !== e) return;
        t && t.removeChild(this);
    };
}
function I4() {
    return this.on('end.remove', j4(this._id));
}
function M4(e) {
    var t = this._name,
        n = this._id;
    typeof e != 'function' && (e = Zc(e));
    for (
        var r = this._groups, i = r.length, a = new Array(i), o = 0;
        o < i;
        ++o
    )
        for (
            var s = r[o], l = s.length, u = (a[o] = new Array(l)), f, c, d = 0;
            d < l;
            ++d
        )
            (f = s[d]) &&
                (c = e.call(f, f.__data__, d, s)) &&
                ('__data__' in f && (c.__data__ = f.__data__),
                (u[d] = c),
                gs(u[d], t, n, d, u, lt(f, n)));
    return new Lt(a, this._parents, t, n);
}
function z4(e) {
    var t = this._name,
        n = this._id;
    typeof e != 'function' && (e = Ky(e));
    for (var r = this._groups, i = r.length, a = [], o = [], s = 0; s < i; ++s)
        for (var l = r[s], u = l.length, f, c = 0; c < u; ++c)
            if ((f = l[c])) {
                for (
                    var d = e.call(f, f.__data__, c, l),
                        g,
                        w = lt(f, n),
                        y = 0,
                        b = d.length;
                    y < b;
                    ++y
                )
                    (g = d[y]) && gs(g, t, n, y, d, w);
                a.push(d), o.push(f);
            }
    return new Lt(a, o, t, n);
}
var L4 = ta.prototype.constructor;
function F4() {
    return new L4(this._groups, this._parents);
}
function $4(e, t) {
    var n, r, i;
    return function () {
        var a = Tr(this, e),
            o = (this.style.removeProperty(e), Tr(this, e));
        return a === o
            ? null
            : a === n && o === r
            ? i
            : (i = t((n = a), (r = o)));
    };
}
function y0(e) {
    return function () {
        this.style.removeProperty(e);
    };
}
function R4(e, t, n) {
    var r,
        i = n + '',
        a;
    return function () {
        var o = Tr(this, e);
        return o === i ? null : o === r ? a : (a = t((r = o), n));
    };
}
function O4(e, t, n) {
    var r, i, a;
    return function () {
        var o = Tr(this, e),
            s = n(this),
            l = s + '';
        return (
            s == null && (l = s = (this.style.removeProperty(e), Tr(this, e))),
            o === l
                ? null
                : o === r && l === i
                ? a
                : ((i = l), (a = t((r = o), s)))
        );
    };
}
function D4(e, t) {
    var n,
        r,
        i,
        a = 'style.' + t,
        o = 'end.' + a,
        s;
    return function () {
        var l = yt(this, e),
            u = l.on,
            f = l.value[a] == null ? s || (s = y0(t)) : void 0;
        (u !== n || i !== f) && (r = (n = u).copy()).on(o, (i = f)), (l.on = r);
    };
}
function U4(e, t, n) {
    var r = (e += '') == 'transform' ? VC : g0;
    return t == null
        ? this.styleTween(e, $4(e, r)).on('end.style.' + e, y0(e))
        : typeof t == 'function'
        ? this.styleTween(e, O4(e, r, sf(this, 'style.' + e, t))).each(
              D4(this._id, e)
          )
        : this.styleTween(e, R4(e, r, t), n).on('end.style.' + e, null);
}
function H4(e, t, n) {
    return function (r) {
        this.style.setProperty(e, t.call(this, r), n);
    };
}
function W4(e, t, n) {
    var r, i;
    function a() {
        var o = t.apply(this, arguments);
        return o !== i && (r = (i = o) && H4(e, o, n)), r;
    }
    return (a._value = t), a;
}
function V4(e, t, n) {
    var r = 'style.' + (e += '');
    if (arguments.length < 2) return (r = this.tween(r)) && r._value;
    if (t == null) return this.tween(r, null);
    if (typeof t != 'function') throw new Error();
    return this.tween(r, W4(e, t, n ?? ''));
}
function B4(e) {
    return function () {
        this.textContent = e;
    };
}
function Y4(e) {
    return function () {
        var t = e(this);
        this.textContent = t ?? '';
    };
}
function G4(e) {
    return this.tween(
        'text',
        typeof e == 'function'
            ? Y4(sf(this, 'text', e))
            : B4(e == null ? '' : e + '')
    );
}
function X4(e) {
    return function (t) {
        this.textContent = e.call(this, t);
    };
}
function K4(e) {
    var t, n;
    function r() {
        var i = e.apply(this, arguments);
        return i !== n && (t = (n = i) && X4(i)), t;
    }
    return (r._value = e), r;
}
function Q4(e) {
    var t = 'text';
    if (arguments.length < 1) return (t = this.tween(t)) && t._value;
    if (e == null) return this.tween(t, null);
    if (typeof e != 'function') throw new Error();
    return this.tween(t, K4(e));
}
function q4() {
    for (
        var e = this._name,
            t = this._id,
            n = v0(),
            r = this._groups,
            i = r.length,
            a = 0;
        a < i;
        ++a
    )
        for (var o = r[a], s = o.length, l, u = 0; u < s; ++u)
            if ((l = o[u])) {
                var f = lt(l, t);
                gs(l, e, n, u, o, {
                    time: f.time + f.delay + f.duration,
                    delay: 0,
                    duration: f.duration,
                    ease: f.ease
                });
            }
    return new Lt(r, this._parents, e, n);
}
function J4() {
    var e,
        t,
        n = this,
        r = n._id,
        i = n.size();
    return new Promise(function (a, o) {
        var s = { value: o },
            l = {
                value: function () {
                    --i === 0 && a();
                }
            };
        n.each(function () {
            var u = yt(this, r),
                f = u.on;
            f !== e &&
                ((t = (e = f).copy()),
                t._.cancel.push(s),
                t._.interrupt.push(s),
                t._.end.push(l)),
                (u.on = t);
        }),
            i === 0 && a();
    });
}
var Z4 = 0;
function Lt(e, t, n, r) {
    (this._groups = e), (this._parents = t), (this._name = n), (this._id = r);
}
function v0() {
    return ++Z4;
}
var kt = ta.prototype;
Lt.prototype = {
    constructor: Lt,
    select: M4,
    selectAll: z4,
    selectChild: kt.selectChild,
    selectChildren: kt.selectChildren,
    filter: C4,
    merge: N4,
    selection: F4,
    transition: q4,
    call: kt.call,
    nodes: kt.nodes,
    node: kt.node,
    size: kt.size,
    empty: kt.empty,
    each: kt.each,
    on: P4,
    attr: c4,
    attrTween: p4,
    style: U4,
    styleTween: V4,
    text: G4,
    textTween: Q4,
    remove: I4,
    tween: r4,
    delay: v4,
    duration: k4,
    ease: b4,
    easeVarying: E4,
    end: J4,
    [Symbol.iterator]: kt[Symbol.iterator]
};
function w0(e) {
    return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var eN = { time: null, delay: 0, duration: 250, ease: w0 };
function tN(e, t) {
    for (var n; !(n = e.__transition) || !(n = n[t]); )
        if (!(e = e.parentNode)) throw new Error(`transition ${t} not found`);
    return n;
}
function nN(e) {
    var t, n;
    e instanceof Lt
        ? ((t = e._id), (e = e._name))
        : ((t = v0()), ((n = eN).time = af()), (e = e == null ? null : e + ''));
    for (var r = this._groups, i = r.length, a = 0; a < i; ++a)
        for (var o = r[a], s = o.length, l, u = 0; u < s; ++u)
            (l = o[u]) && gs(l, e, t, u, o, n || tN(l, t));
    return new Lt(r, this._parents, e, t);
}
ta.prototype.interrupt = e4;
ta.prototype.transition = nN;
const Ru = Math.PI,
    Ou = 2 * Ru,
    pn = 1e-6,
    rN = Ou - pn;
function x0(e) {
    this._ += e[0];
    for (let t = 1, n = e.length; t < n; ++t) this._ += arguments[t] + e[t];
}
function iN(e) {
    let t = Math.floor(e);
    if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
    if (t > 15) return x0;
    const n = 10 ** t;
    return function (r) {
        this._ += r[0];
        for (let i = 1, a = r.length; i < a; ++i)
            this._ += Math.round(arguments[i] * n) / n + r[i];
    };
}
class aN {
    constructor(t) {
        (this._x0 = this._y0 = this._x1 = this._y1 = null),
            (this._ = ''),
            (this._append = t == null ? x0 : iN(t));
    }
    moveTo(t, n) {
        this._append`M${(this._x0 = this._x1 = +t)},${(this._y0 = this._y1 =
            +n)}`;
    }
    closePath() {
        this._x1 !== null &&
            ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
    }
    lineTo(t, n) {
        this._append`L${(this._x1 = +t)},${(this._y1 = +n)}`;
    }
    quadraticCurveTo(t, n, r, i) {
        this._append`Q${+t},${+n},${(this._x1 = +r)},${(this._y1 = +i)}`;
    }
    bezierCurveTo(t, n, r, i, a, o) {
        this._append`C${+t},${+n},${+r},${+i},${(this._x1 = +a)},${(this._y1 =
            +o)}`;
    }
    arcTo(t, n, r, i, a) {
        if (((t = +t), (n = +n), (r = +r), (i = +i), (a = +a), a < 0))
            throw new Error(`negative radius: ${a}`);
        let o = this._x1,
            s = this._y1,
            l = r - t,
            u = i - n,
            f = o - t,
            c = s - n,
            d = f * f + c * c;
        if (this._x1 === null)
            this._append`M${(this._x1 = t)},${(this._y1 = n)}`;
        else if (d > pn)
            if (!(Math.abs(c * l - u * f) > pn) || !a)
                this._append`L${(this._x1 = t)},${(this._y1 = n)}`;
            else {
                let g = r - o,
                    w = i - s,
                    y = l * l + u * u,
                    b = g * g + w * w,
                    m = Math.sqrt(y),
                    h = Math.sqrt(d),
                    p =
                        a *
                        Math.tan(
                            (Ru - Math.acos((y + d - b) / (2 * m * h))) / 2
                        ),
                    v = p / h,
                    S = p / m;
                Math.abs(v - 1) > pn &&
                    this._append`L${t + v * f},${n + v * c}`,
                    this._append`A${a},${a},0,0,${+(
                        c * g >
                        f * w
                    )},${(this._x1 = t + S * l)},${(this._y1 = n + S * u)}`;
            }
    }
    arc(t, n, r, i, a, o) {
        if (((t = +t), (n = +n), (r = +r), (o = !!o), r < 0))
            throw new Error(`negative radius: ${r}`);
        let s = r * Math.cos(i),
            l = r * Math.sin(i),
            u = t + s,
            f = n + l,
            c = 1 ^ o,
            d = o ? i - a : a - i;
        this._x1 === null
            ? this._append`M${u},${f}`
            : (Math.abs(this._x1 - u) > pn || Math.abs(this._y1 - f) > pn) &&
              this._append`L${u},${f}`,
            r &&
                (d < 0 && (d = (d % Ou) + Ou),
                d > rN
                    ? this._append`A${r},${r},0,1,${c},${t - s},${
                          n - l
                      }A${r},${r},0,1,${c},${(this._x1 = u)},${(this._y1 = f)}`
                    : d > pn &&
                      this._append`A${r},${r},0,${+(d >= Ru)},${c},${(this._x1 =
                          t + r * Math.cos(a))},${(this._y1 =
                          n + r * Math.sin(a))}`);
    }
    rect(t, n, r, i) {
        this._append`M${(this._x0 = this._x1 = +t)},${(this._y0 = this._y1 =
            +n)}h${(r = +r)}v${+i}h${-r}Z`;
    }
    toString() {
        return this._;
    }
}
var Dh = {},
    cl = {},
    fl = 34,
    qr = 10,
    dl = 13;
function k0(e) {
    return new Function(
        'd',
        'return {' +
            e
                .map(function (t, n) {
                    return JSON.stringify(t) + ': d[' + n + '] || ""';
                })
                .join(',') +
            '}'
    );
}
function oN(e, t) {
    var n = k0(e);
    return function (r, i) {
        return t(n(r), i, e);
    };
}
function Uh(e) {
    var t = Object.create(null),
        n = [];
    return (
        e.forEach(function (r) {
            for (var i in r) i in t || n.push((t[i] = i));
        }),
        n
    );
}
function Ce(e, t) {
    var n = e + '',
        r = n.length;
    return r < t ? new Array(t - r + 1).join(0) + n : n;
}
function sN(e) {
    return e < 0 ? '-' + Ce(-e, 6) : e > 9999 ? '+' + Ce(e, 6) : Ce(e, 4);
}
function lN(e) {
    var t = e.getUTCHours(),
        n = e.getUTCMinutes(),
        r = e.getUTCSeconds(),
        i = e.getUTCMilliseconds();
    return isNaN(e)
        ? 'Invalid Date'
        : sN(e.getUTCFullYear()) +
              '-' +
              Ce(e.getUTCMonth() + 1, 2) +
              '-' +
              Ce(e.getUTCDate(), 2) +
              (i
                  ? 'T' +
                    Ce(t, 2) +
                    ':' +
                    Ce(n, 2) +
                    ':' +
                    Ce(r, 2) +
                    '.' +
                    Ce(i, 3) +
                    'Z'
                  : r
                  ? 'T' + Ce(t, 2) + ':' + Ce(n, 2) + ':' + Ce(r, 2) + 'Z'
                  : n || t
                  ? 'T' + Ce(t, 2) + ':' + Ce(n, 2) + 'Z'
                  : '');
}
function uN(e) {
    var t = new RegExp(
            '["' +
                e +
                `
\r]`
        ),
        n = e.charCodeAt(0);
    function r(c, d) {
        var g,
            w,
            y = i(c, function (b, m) {
                if (g) return g(b, m - 1);
                (w = b), (g = d ? oN(b, d) : k0(b));
            });
        return (y.columns = w || []), y;
    }
    function i(c, d) {
        var g = [],
            w = c.length,
            y = 0,
            b = 0,
            m,
            h = w <= 0,
            p = !1;
        c.charCodeAt(w - 1) === qr && --w, c.charCodeAt(w - 1) === dl && --w;
        function v() {
            if (h) return cl;
            if (p) return (p = !1), Dh;
            var _,
                k = y,
                A;
            if (c.charCodeAt(k) === fl) {
                for (
                    ;
                    (y++ < w && c.charCodeAt(y) !== fl) ||
                    c.charCodeAt(++y) === fl;

                );
                return (
                    (_ = y) >= w
                        ? (h = !0)
                        : (A = c.charCodeAt(y++)) === qr
                        ? (p = !0)
                        : A === dl && ((p = !0), c.charCodeAt(y) === qr && ++y),
                    c.slice(k + 1, _ - 1).replace(/""/g, '"')
                );
            }
            for (; y < w; ) {
                if ((A = c.charCodeAt((_ = y++))) === qr) p = !0;
                else if (A === dl) (p = !0), c.charCodeAt(y) === qr && ++y;
                else if (A !== n) continue;
                return c.slice(k, _);
            }
            return (h = !0), c.slice(k, w);
        }
        for (; (m = v()) !== cl; ) {
            for (var S = []; m !== Dh && m !== cl; ) S.push(m), (m = v());
            (d && (S = d(S, b++)) == null) || g.push(S);
        }
        return g;
    }
    function a(c, d) {
        return c.map(function (g) {
            return d
                .map(function (w) {
                    return f(g[w]);
                })
                .join(e);
        });
    }
    function o(c, d) {
        return (
            d == null && (d = Uh(c)),
            [d.map(f).join(e)].concat(a(c, d)).join(`
`)
        );
    }
    function s(c, d) {
        return (
            d == null && (d = Uh(c)),
            a(c, d).join(`
`)
        );
    }
    function l(c) {
        return c.map(u).join(`
`);
    }
    function u(c) {
        return c.map(f).join(e);
    }
    function f(c) {
        return c == null
            ? ''
            : c instanceof Date
            ? lN(c)
            : t.test((c += ''))
            ? '"' + c.replace(/"/g, '""') + '"'
            : c;
    }
    return {
        parse: r,
        parseRows: i,
        format: o,
        formatBody: s,
        formatRows: l,
        formatRow: u,
        formatValue: f
    };
}
var cN = uN(','),
    fN = cN.parse;
function Fn(e) {
    for (var t in e) {
        var n = e[t].trim(),
            r,
            i;
        if (!n) n = null;
        else if (n === 'true') n = !0;
        else if (n === 'false') n = !1;
        else if (n === 'NaN') n = NaN;
        else if (!isNaN((r = +n))) n = r;
        else if (
            (i = n.match(
                /^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/
            ))
        )
            dN && i[4] && !i[7] && (n = n.replace(/-/g, '/').replace(/T/, ' ')),
                (n = new Date(n));
        else continue;
        e[t] = n;
    }
    return e;
}
const dN =
    new Date('2019-01-01T00:00').getHours() ||
    new Date('2019-07-01T00:00').getHours();
function hN(e) {
    if (!e.ok) throw new Error(e.status + ' ' + e.statusText);
    return e.text();
}
function mN(e, t) {
    return fetch(e, t).then(hN);
}
function pN(e) {
    return function (t, n, r) {
        return (
            arguments.length === 2 &&
                typeof n == 'function' &&
                ((r = n), (n = void 0)),
            mN(t, n).then(function (i) {
                return e(i, r);
            })
        );
    };
}
var $n = pN(fN);
function gN(e) {
    return Math.abs((e = Math.round(e))) >= 1e21
        ? e.toLocaleString('en').replace(/,/g, '')
        : e.toString(10);
}
function Uo(e, t) {
    if (!isFinite(e) || e === 0) return null;
    var n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf('e'),
        r = e.slice(0, n);
    return [r.length > 1 ? r[0] + r.slice(2) : r, +e.slice(n + 1)];
}
function jr(e) {
    return (e = Uo(Math.abs(e))), e ? e[1] : NaN;
}
function yN(e, t) {
    return function (n, r) {
        for (
            var i = n.length, a = [], o = 0, s = e[0], l = 0;
            i > 0 &&
            s > 0 &&
            (l + s + 1 > r && (s = Math.max(1, r - l)),
            a.push(n.substring((i -= s), i + s)),
            !((l += s + 1) > r));

        )
            s = e[(o = (o + 1) % e.length)];
        return a.reverse().join(t);
    };
}
function vN(e) {
    return function (t) {
        return t.replace(/[0-9]/g, function (n) {
            return e[+n];
        });
    };
}
var wN =
    /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Ho(e) {
    if (!(t = wN.exec(e))) throw new Error('invalid format: ' + e);
    var t;
    return new lf({
        fill: t[1],
        align: t[2],
        sign: t[3],
        symbol: t[4],
        zero: t[5],
        width: t[6],
        comma: t[7],
        precision: t[8] && t[8].slice(1),
        trim: t[9],
        type: t[10]
    });
}
Ho.prototype = lf.prototype;
function lf(e) {
    (this.fill = e.fill === void 0 ? ' ' : e.fill + ''),
        (this.align = e.align === void 0 ? '>' : e.align + ''),
        (this.sign = e.sign === void 0 ? '-' : e.sign + ''),
        (this.symbol = e.symbol === void 0 ? '' : e.symbol + ''),
        (this.zero = !!e.zero),
        (this.width = e.width === void 0 ? void 0 : +e.width),
        (this.comma = !!e.comma),
        (this.precision = e.precision === void 0 ? void 0 : +e.precision),
        (this.trim = !!e.trim),
        (this.type = e.type === void 0 ? '' : e.type + '');
}
lf.prototype.toString = function () {
    return (
        this.fill +
        this.align +
        this.sign +
        this.symbol +
        (this.zero ? '0' : '') +
        (this.width === void 0 ? '' : Math.max(1, this.width | 0)) +
        (this.comma ? ',' : '') +
        (this.precision === void 0
            ? ''
            : '.' + Math.max(0, this.precision | 0)) +
        (this.trim ? '~' : '') +
        this.type
    );
};
function xN(e) {
    e: for (var t = e.length, n = 1, r = -1, i; n < t; ++n)
        switch (e[n]) {
            case '.':
                r = i = n;
                break;
            case '0':
                r === 0 && (r = n), (i = n);
                break;
            default:
                if (!+e[n]) break e;
                r > 0 && (r = 0);
                break;
        }
    return r > 0 ? e.slice(0, r) + e.slice(i + 1) : e;
}
var Wo;
function kN(e, t) {
    var n = Uo(e, t);
    if (!n) return (Wo = void 0), e.toPrecision(t);
    var r = n[0],
        i = n[1],
        a = i - (Wo = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1,
        o = r.length;
    return a === o
        ? r
        : a > o
        ? r + new Array(a - o + 1).join('0')
        : a > 0
        ? r.slice(0, a) + '.' + r.slice(a)
        : '0.' + new Array(1 - a).join('0') + Uo(e, Math.max(0, t + a - 1))[0];
}
function Hh(e, t) {
    var n = Uo(e, t);
    if (!n) return e + '';
    var r = n[0],
        i = n[1];
    return i < 0
        ? '0.' + new Array(-i).join('0') + r
        : r.length > i + 1
        ? r.slice(0, i + 1) + '.' + r.slice(i + 1)
        : r + new Array(i - r.length + 2).join('0');
}
const Wh = {
    '%': (e, t) => (e * 100).toFixed(t),
    b: (e) => Math.round(e).toString(2),
    c: (e) => e + '',
    d: gN,
    e: (e, t) => e.toExponential(t),
    f: (e, t) => e.toFixed(t),
    g: (e, t) => e.toPrecision(t),
    o: (e) => Math.round(e).toString(8),
    p: (e, t) => Hh(e * 100, t),
    r: Hh,
    s: kN,
    X: (e) => Math.round(e).toString(16).toUpperCase(),
    x: (e) => Math.round(e).toString(16)
};
function Vh(e) {
    return e;
}
var Bh = Array.prototype.map,
    Yh = [
        'y',
        'z',
        'a',
        'f',
        'p',
        'n',
        'µ',
        'm',
        '',
        'k',
        'M',
        'G',
        'T',
        'P',
        'E',
        'Z',
        'Y'
    ];
function SN(e) {
    var t =
            e.grouping === void 0 || e.thousands === void 0
                ? Vh
                : yN(Bh.call(e.grouping, Number), e.thousands + ''),
        n = e.currency === void 0 ? '' : e.currency[0] + '',
        r = e.currency === void 0 ? '' : e.currency[1] + '',
        i = e.decimal === void 0 ? '.' : e.decimal + '',
        a = e.numerals === void 0 ? Vh : vN(Bh.call(e.numerals, String)),
        o = e.percent === void 0 ? '%' : e.percent + '',
        s = e.minus === void 0 ? '−' : e.minus + '',
        l = e.nan === void 0 ? 'NaN' : e.nan + '';
    function u(c, d) {
        c = Ho(c);
        var g = c.fill,
            w = c.align,
            y = c.sign,
            b = c.symbol,
            m = c.zero,
            h = c.width,
            p = c.comma,
            v = c.precision,
            S = c.trim,
            _ = c.type;
        _ === 'n'
            ? ((p = !0), (_ = 'g'))
            : Wh[_] || (v === void 0 && (v = 12), (S = !0), (_ = 'g')),
            (m || (g === '0' && w === '=')) && ((m = !0), (g = '0'), (w = '='));
        var k =
                (d && d.prefix !== void 0 ? d.prefix : '') +
                (b === '$'
                    ? n
                    : b === '#' && /[boxX]/.test(_)
                    ? '0' + _.toLowerCase()
                    : ''),
            A =
                (b === '$' ? r : /[%p]/.test(_) ? o : '') +
                (d && d.suffix !== void 0 ? d.suffix : ''),
            $ = Wh[_],
            P = /[defgprs%]/.test(_);
        v =
            v === void 0
                ? 6
                : /[gprs]/.test(_)
                ? Math.max(1, Math.min(21, v))
                : Math.max(0, Math.min(20, v));
        function R(I) {
            var U = k,
                W = A,
                q,
                oe,
                Z;
            if (_ === 'c') (W = $(I) + W), (I = '');
            else {
                I = +I;
                var T = I < 0 || 1 / I < 0;
                if (
                    ((I = isNaN(I) ? l : $(Math.abs(I), v)),
                    S && (I = xN(I)),
                    T && +I == 0 && y !== '+' && (T = !1),
                    (U =
                        (T
                            ? y === '('
                                ? y
                                : s
                            : y === '-' || y === '('
                            ? ''
                            : y) + U),
                    (W =
                        (_ === 's' && !isNaN(I) && Wo !== void 0
                            ? Yh[8 + Wo / 3]
                            : '') +
                        W +
                        (T && y === '(' ? ')' : '')),
                    P)
                ) {
                    for (q = -1, oe = I.length; ++q < oe; )
                        if (((Z = I.charCodeAt(q)), 48 > Z || Z > 57)) {
                            (W =
                                (Z === 46 ? i + I.slice(q + 1) : I.slice(q)) +
                                W),
                                (I = I.slice(0, q));
                            break;
                        }
                }
            }
            p && !m && (I = t(I, 1 / 0));
            var L = U.length + I.length + W.length,
                M = L < h ? new Array(h - L + 1).join(g) : '';
            switch (
                (p &&
                    m &&
                    ((I = t(M + I, M.length ? h - W.length : 1 / 0)), (M = '')),
                w)
            ) {
                case '<':
                    I = U + I + W + M;
                    break;
                case '=':
                    I = U + M + I + W;
                    break;
                case '^':
                    I =
                        M.slice(0, (L = M.length >> 1)) +
                        U +
                        I +
                        W +
                        M.slice(L);
                    break;
                default:
                    I = M + U + I + W;
                    break;
            }
            return a(I);
        }
        return (
            (R.toString = function () {
                return c + '';
            }),
            R
        );
    }
    function f(c, d) {
        var g = Math.max(-8, Math.min(8, Math.floor(jr(d) / 3))) * 3,
            w = Math.pow(10, -g),
            y = u(((c = Ho(c)), (c.type = 'f'), c), { suffix: Yh[8 + g / 3] });
        return function (b) {
            return y(w * b);
        };
    }
    return { format: u, formatPrefix: f };
}
var Ia, S0, b0;
bN({ thousands: ',', grouping: [3], currency: ['$', ''] });
function bN(e) {
    return (Ia = SN(e)), (S0 = Ia.format), (b0 = Ia.formatPrefix), Ia;
}
function _N(e) {
    return Math.max(0, -jr(Math.abs(e)));
}
function EN(e, t) {
    return Math.max(
        0,
        Math.max(-8, Math.min(8, Math.floor(jr(t) / 3))) * 3 - jr(Math.abs(e))
    );
}
function CN(e, t) {
    return (
        (e = Math.abs(e)), (t = Math.abs(t) - e), Math.max(0, jr(t) - jr(e)) + 1
    );
}
function NN(e, t) {
    switch (arguments.length) {
        case 0:
            break;
        case 1:
            this.range(e);
            break;
        default:
            this.range(t).domain(e);
            break;
    }
    return this;
}
function AN(e) {
    return function () {
        return e;
    };
}
function TN(e) {
    return +e;
}
var Gh = [0, 1];
function fr(e) {
    return e;
}
function Du(e, t) {
    return (t -= e = +e)
        ? function (n) {
              return (n - e) / t;
          }
        : AN(isNaN(t) ? NaN : 0.5);
}
function PN(e, t) {
    var n;
    return (
        e > t && ((n = e), (e = t), (t = n)),
        function (r) {
            return Math.max(e, Math.min(t, r));
        }
    );
}
function jN(e, t, n) {
    var r = e[0],
        i = e[1],
        a = t[0],
        o = t[1];
    return (
        i < r
            ? ((r = Du(i, r)), (a = n(o, a)))
            : ((r = Du(r, i)), (a = n(a, o))),
        function (s) {
            return a(r(s));
        }
    );
}
function IN(e, t, n) {
    var r = Math.min(e.length, t.length) - 1,
        i = new Array(r),
        a = new Array(r),
        o = -1;
    for (
        e[r] < e[0] && ((e = e.slice().reverse()), (t = t.slice().reverse()));
        ++o < r;

    )
        (i[o] = Du(e[o], e[o + 1])), (a[o] = n(t[o], t[o + 1]));
    return function (s) {
        var l = k_(e, s, 1, r) - 1;
        return a[l](i[l](s));
    };
}
function MN(e, t) {
    return t
        .domain(e.domain())
        .range(e.range())
        .interpolate(e.interpolate())
        .clamp(e.clamp())
        .unknown(e.unknown());
}
function zN() {
    var e = Gh,
        t = Gh,
        n = rf,
        r,
        i,
        a,
        o = fr,
        s,
        l,
        u;
    function f() {
        var d = Math.min(e.length, t.length);
        return (
            o !== fr && (o = PN(e[0], e[d - 1])),
            (s = d > 2 ? IN : jN),
            (l = u = null),
            c
        );
    }
    function c(d) {
        return d == null || isNaN((d = +d))
            ? a
            : (l || (l = s(e.map(r), t, n)))(r(o(d)));
    }
    return (
        (c.invert = function (d) {
            return o(i((u || (u = s(t, e.map(r), tt)))(d)));
        }),
        (c.domain = function (d) {
            return arguments.length
                ? ((e = Array.from(d, TN)), f())
                : e.slice();
        }),
        (c.range = function (d) {
            return arguments.length ? ((t = Array.from(d)), f()) : t.slice();
        }),
        (c.rangeRound = function (d) {
            return (t = Array.from(d)), (n = UC), f();
        }),
        (c.clamp = function (d) {
            return arguments.length ? ((o = d ? !0 : fr), f()) : o !== fr;
        }),
        (c.interpolate = function (d) {
            return arguments.length ? ((n = d), f()) : n;
        }),
        (c.unknown = function (d) {
            return arguments.length ? ((a = d), c) : a;
        }),
        function (d, g) {
            return (r = d), (i = g), f();
        }
    );
}
function LN() {
    return zN()(fr, fr);
}
function FN(e, t, n, r) {
    var i = j_(e, t, n),
        a;
    switch (((r = Ho(r ?? ',f')), r.type)) {
        case 's': {
            var o = Math.max(Math.abs(e), Math.abs(t));
            return (
                r.precision == null &&
                    !isNaN((a = EN(i, o))) &&
                    (r.precision = a),
                b0(r, o)
            );
        }
        case '':
        case 'e':
        case 'g':
        case 'p':
        case 'r': {
            r.precision == null &&
                !isNaN((a = CN(i, Math.max(Math.abs(e), Math.abs(t))))) &&
                (r.precision = a - (r.type === 'e'));
            break;
        }
        case 'f':
        case '%': {
            r.precision == null &&
                !isNaN((a = _N(i))) &&
                (r.precision = a - (r.type === '%') * 2);
            break;
        }
    }
    return S0(r);
}
function $N(e) {
    var t = e.domain;
    return (
        (e.ticks = function (n) {
            var r = t();
            return P_(r[0], r[r.length - 1], n ?? 10);
        }),
        (e.tickFormat = function (n, r) {
            var i = t();
            return FN(i[0], i[i.length - 1], n ?? 10, r);
        }),
        (e.nice = function (n) {
            n == null && (n = 10);
            var r = t(),
                i = 0,
                a = r.length - 1,
                o = r[i],
                s = r[a],
                l,
                u,
                f = 10;
            for (
                s < o && ((u = o), (o = s), (s = u), (u = i), (i = a), (a = u));
                f-- > 0;

            ) {
                if (((u = Tu(o, s, n)), u === l))
                    return (r[i] = o), (r[a] = s), t(r);
                if (u > 0)
                    (o = Math.floor(o / u) * u), (s = Math.ceil(s / u) * u);
                else if (u < 0)
                    (o = Math.ceil(o * u) / u), (s = Math.floor(s * u) / u);
                else break;
                l = u;
            }
            return e;
        }),
        e
    );
}
function Re() {
    var e = LN();
    return (
        (e.copy = function () {
            return MN(e, Re());
        }),
        NN.apply(e, arguments),
        $N(e)
    );
}
function Gn(e) {
    return function () {
        return e;
    };
}
function RN(e) {
    let t = 3;
    return (
        (e.digits = function (n) {
            if (!arguments.length) return t;
            if (n == null) t = null;
            else {
                const r = Math.floor(n);
                if (!(r >= 0)) throw new RangeError(`invalid digits: ${n}`);
                t = r;
            }
            return e;
        }),
        () => new aN(t)
    );
}
function ON(e) {
    return typeof e == 'object' && 'length' in e ? e : Array.from(e);
}
function _0(e) {
    this._context = e;
}
_0.prototype = {
    areaStart: function () {
        this._line = 0;
    },
    areaEnd: function () {
        this._line = NaN;
    },
    lineStart: function () {
        this._point = 0;
    },
    lineEnd: function () {
        (this._line || (this._line !== 0 && this._point === 1)) &&
            this._context.closePath(),
            (this._line = 1 - this._line);
    },
    point: function (e, t) {
        switch (((e = +e), (t = +t), this._point)) {
            case 0:
                (this._point = 1),
                    this._line
                        ? this._context.lineTo(e, t)
                        : this._context.moveTo(e, t);
                break;
            case 1:
                this._point = 2;
            default:
                this._context.lineTo(e, t);
                break;
        }
    }
};
function DN(e) {
    return new _0(e);
}
function UN(e) {
    return e[0];
}
function HN(e) {
    return e[1];
}
function Or(e, t) {
    var n = Gn(!0),
        r = null,
        i = DN,
        a = null,
        o = RN(s);
    (e = typeof e == 'function' ? e : e === void 0 ? UN : Gn(e)),
        (t = typeof t == 'function' ? t : t === void 0 ? HN : Gn(t));
    function s(l) {
        var u,
            f = (l = ON(l)).length,
            c,
            d = !1,
            g;
        for (r == null && (a = i((g = o()))), u = 0; u <= f; ++u)
            !(u < f && n((c = l[u]), u, l)) === d &&
                ((d = !d) ? a.lineStart() : a.lineEnd()),
                d && a.point(+e(c, u, l), +t(c, u, l));
        if (g) return (a = null), g + '' || null;
    }
    return (
        (s.x = function (l) {
            return arguments.length
                ? ((e = typeof l == 'function' ? l : Gn(+l)), s)
                : e;
        }),
        (s.y = function (l) {
            return arguments.length
                ? ((t = typeof l == 'function' ? l : Gn(+l)), s)
                : t;
        }),
        (s.defined = function (l) {
            return arguments.length
                ? ((n = typeof l == 'function' ? l : Gn(!!l)), s)
                : n;
        }),
        (s.curve = function (l) {
            return arguments.length ? ((i = l), r != null && (a = i(r)), s) : i;
        }),
        (s.context = function (l) {
            return arguments.length
                ? (l == null ? (r = a = null) : (a = i((r = l))), s)
                : r;
        }),
        s
    );
}
function li(e, t, n) {
    (this.k = e), (this.x = t), (this.y = n);
}
li.prototype = {
    constructor: li,
    scale: function (e) {
        return e === 1 ? this : new li(this.k * e, this.x, this.y);
    },
    translate: function (e, t) {
        return (e === 0) & (t === 0)
            ? this
            : new li(this.k, this.x + this.k * e, this.y + this.k * t);
    },
    apply: function (e) {
        return [e[0] * this.k + this.x, e[1] * this.k + this.y];
    },
    applyX: function (e) {
        return e * this.k + this.x;
    },
    applyY: function (e) {
        return e * this.k + this.y;
    },
    invert: function (e) {
        return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
    },
    invertX: function (e) {
        return (e - this.x) / this.k;
    },
    invertY: function (e) {
        return (e - this.y) / this.k;
    },
    rescaleX: function (e) {
        return e
            .copy()
            .domain(e.range().map(this.invertX, this).map(e.invert, e));
    },
    rescaleY: function (e) {
        return e
            .copy()
            .domain(e.range().map(this.invertY, this).map(e.invert, e));
    },
    toString: function () {
        return 'translate(' + this.x + ',' + this.y + ') scale(' + this.k + ')';
    }
};
li.prototype;
const WN = {
        'Massachusetts Institute of Technology': 'MIT',
        'University of Pennsylvania': 'Penn',
        'Princeton University': 'Princeton',
        'Stanford University': 'Stanford',
        'Harvard University': 'Harvard',
        'Yale University': 'Yale',
        'Columbia University in the City of New York': 'Columbia',
        'Cornell University': 'Cornell',
        'Brown University': 'Brown',
        'Dartmouth College': 'Dartmouth',
        'Duke University': 'Duke'
    },
    VN = (e) => WN[e] ?? e,
    BN = 'M0.449707 31.495C10.7346 10.3316 19.8843 3.64401 41.9497 0.494995',
    YN = {
        'Dartmouth College': { dx: 0, dy: -3 },
        'Harvard University': { dx: 0, dy: -9 },
        'Columbia University in the City of New York': { dx: 0, dy: -5 },
        'Yale University': { dx: 55, dy: 0 },
        'Brown University': { dx: 0, dy: -2 },
        'University of Pennsylvania': { dx: 55, dy: -4 },
        'Cornell University': { dx: 0, dy: 0 },
        'Princeton University': { dx: 55, dy: -6 },
        'Duke University': { dx: 0, dy: 0 },
        'Stanford University': { dx: 0, dy: -8 },
        'Massachusetts Institute of Technology': { dx: 0, dy: 0 }
    },
    GN = (e) => (e < 400 ? 30 : e < 768 ? 29 : e < 1024 ? 26 : 22),
    XN = (e, t = 20) => (e < 400 ? t - 28 : t - 15),
    ys = (e) => e < 400,
    hl = (e) => (ys(e) ? 20 : 18),
    Xh = (e) => (ys(e) ? 22 : 20),
    Xn = (e) => (ys(e) ? 20 : 17),
    Kh = (e, t) => (ys(e) ? `'${String(t).slice(-2)}` : String(t)),
    KN = {
        share: {
            lines: (e) =>
                e < 400
                    ? ['Share of Students', 'Majoring in Economics']
                    : ['Share of Students Majoring in Economics']
        },
        percentage: {
            lines: (e) =>
                e < 400
                    ? ['Percentage of Students', 'Majoring in Economics']
                    : ['Percentage of Students Majoring in Economics']
        },
        uchicago: {
            lines: (e) =>
                e < 400
                    ? ['Student Majors', 'at UChicago']
                    : ['Student Majors at UChicago']
        }
    },
    ml = (e, t, n, r = 20) => {
        if (!e) return;
        const i = KN[t].lines(n),
            a = e.attr('x');
        e
            .attr('y', XN(n, r))
            .attr('font-size', GN(n))
            .text(null)
            .selectAll('tspan')
            .remove(),
            i.forEach((o, s) => {
                e.append('tspan')
                    .attr('x', a)
                    .attr('dy', s === 0 ? 0 : '1.1em')
                    .text(o);
            });
    };
function QN({
    data: e,
    xKey: t,
    yKey: n,
    progress: r,
    width: i = 600,
    height: a = 400,
    margin: o = { top: 20, right: 70, bottom: 30, left: 40 }
}) {
    const s = E.useRef(),
        l = E.useRef({
            uchicago: null,
            uchicagoInner: null,
            ivy: [],
            hum: null
        }),
        u = E.useRef({ uchicago: 0, ivy: [], hum: 0 }),
        f = E.useRef({ uchicago: null, ivy: [] }),
        c = E.useRef({ uchicago: !1, ivy: !1 }),
        d = E.useRef(),
        g = E.useRef(),
        w = E.useRef(),
        y = E.useRef(),
        b = E.useRef('share'),
        m = E.useRef(),
        h = E.useRef(() => {}),
        [p, v] = E.useState(window.innerWidth),
        [S, _] = E.useState(window.innerHeight);
    return (
        E.useEffect(() => {
            function k() {
                v(window.innerWidth), _(window.innerHeight);
            }
            return (
                window.addEventListener('resize', k),
                () => {
                    window.removeEventListener('resize', k);
                }
            );
        }, []),
        (h.current = () => {
            var oe, Z, T, L, M, B, Y;
            if (!r || !l.current.uchicago) return;
            const k = r.uchicago.get(),
                A = r.ivy.get(),
                $ = r.ivyFade.get(),
                P = r.annotation.get(),
                R = r.annotationFade.get(),
                I = r.hum.get();
            if (u.current.uchicago) {
                const fe = u.current.uchicago * (1 - k);
                l.current.uchicago.attr('stroke-dashoffset', fe),
                    l.current.uchicagoInner.attr('stroke-dashoffset', fe);
            }
            let U = 0;
            R > 0 ? (U = 1 - R) : k >= 0.95 && (U = 1),
                (oe = f.current.uchicago) == null || oe.attr('opacity', U),
                (c.current.uchicago = k >= 0.95);
            const W = l.current.ivy.length;
            l.current.ivy.forEach((fe, Ee) => {
                if (!fe) return;
                const ut = W > 0 ? (Ee + 1) / W : 0,
                    Qe = A >= ut ? 0.3 : 0;
                fe.attr('opacity', Qe * (1 - $));
            }),
                f.current.ivy.forEach(({ text: fe, threshold: Ee }) => {
                    if (!fe) return;
                    const ut = A >= Ee ? 0.6 : 0;
                    fe.attr('opacity', ut * (1 - $));
                });
            const q = P * (1 - R);
            (Z = d.current) == null || Z.attr('opacity', P * 0.2),
                (T = g.current) == null || T.attr('opacity', P),
                (L = w.current) == null || L.attr('opacity', P),
                (M = m.current) == null || M.attr('opacity', q),
                u.current.hum &&
                    l.current.hum &&
                    l.current.hum.attr(
                        'stroke-dashoffset',
                        u.current.hum * (1 - I)
                    ),
                (B = f.current.hum) == null || B.attr('opacity', I),
                (Y = f.current.econ) == null || Y.attr('opacity', I),
                y.current &&
                    ((b.current =
                        I > 0.05 ? 'uchicago' : I > 0 ? 'percentage' : 'share'),
                    ml(y.current, b.current, p, o.top));
        }),
        E.useEffect(() => {
            if (!e) return;
            const { uchicagoByYear: k, ivyPlusByYear: A, humByYear: $ } = e,
                P = Be(s.current);
            P.selectAll('*').remove();
            const R = A ?? [],
                I = R.flatMap((F) => F.values);
            console.log('[LineChart] UChicago series:', k);
            const U = k.find((F) => F.year === 2024);
            console.log(
                '[LineChart] UChicago 2024 total:',
                (U == null ? void 0 : U.total) ?? null
            );
            const W = [...k, ...I],
                q = Re()
                    .domain(Mn(W, (F) => F[t]))
                    .range([o.left, i - o.right]),
                oe = Re()
                    .domain(Mn(W, (F) => F[n]))
                    .nice()
                    .range([a - o.bottom, o.top]),
                Z = Or()
                    .x((F) => q(F[t]))
                    .y((F) => oe(F[n])),
                T = 5;
            P.append('g')
                .attr('class', 'x-axis')
                .attr('transform', `translate(0,${a - o.bottom + T})`)
                .attr('color', 'gray')
                .call(
                    $r(q)
                        .tickFormat((F) => Kh(p, F))
                        .tickSizeOuter(0)
                )
                .call((F) =>
                    F.selectAll('.tick text')
                        .attr('font-size', hl(p))
                        .attr('font-family', 'Playfair Display, serif')
                ),
                P.append('g')
                    .attr('class', 'y-axis')
                    .attr('transform', `translate(${o.left - T},0)`)
                    .attr('color', 'gray')
                    .call(
                        Rr(oe)
                            .tickValues([40, 30, 20, 10, 0])
                            .tickFormat((F) => `${F}%`)
                            .tickSize(0)
                    )
                    .call((F) => F.select('.domain').remove())
                    .call((F) =>
                        F.selectAll('.tick text')
                            .attr('font-size', hl(p))
                            .attr('font-family', 'Playfair Display, serif')
                    );
            const L = Fr(0, 41, 10).reverse();
            P.append('g')
                .attr('class', 'y-grid')
                .selectAll('line')
                .data(L)
                .join('line')
                .attr('x1', o.left)
                .attr('x2', i - o.right)
                .attr('y1', (F) => oe(F))
                .attr('y2', (F) => oe(F))
                .attr('stroke', '#e6e6e6')
                .attr('stroke-width', 1);
            const M = r ? r.uchicago.get() : 0,
                B = r ? r.ivy.get() : 0,
                Y = r ? r.hum.get() : 0,
                fe = r ? r.annotation.get() : 0;
            (b.current =
                Y > 0.05 ? 'uchicago' : Y > 0 ? 'percentage' : 'share'),
                (y.current = P.append('text')
                    .attr('x', o.left)
                    .attr('text-anchor', 'start')
                    .attr('fill', 'black')
                    .attr('font-family', 'Georgia, serif')),
                ml(y.current, b.current, p, o.top);
            const Ee = 2018,
                ut = q(Ee),
                Qe = i - o.right;
            d.current = P.append('rect')
                .attr('x', ut)
                .attr('y', o.top)
                .attr('width', Qe - ut)
                .attr('height', a - o.bottom - o.top)
                .attr('fill', '#808080')
                .attr('opacity', fe * 0.2);
            const vt = q(2010),
                uf = o.top + 80,
                N0 = q(Ee),
                cf = vt + 150,
                A0 = uf - 20,
                T0 = (N0 - cf) / 41.5;
            (g.current = P.append('path')
                .attr('d', BN)
                .attr(
                    'transform',
                    `translate(${cf - 0.449707}, ${A0 - 31.495}) scale(${T0})`
                )
                .attr('fill', 'none')
                .attr('stroke', '#666666')
                .attr('stroke-width', 1)
                .attr('opacity', fe)),
                (w.current = P.append('text')
                    .attr('x', vt)
                    .attr('y', uf)
                    .attr('text-anchor', 'start')
                    .attr('fill', '#666')
                    .attr('font-size', Xh(p))
                    .attr('font-family', 'Georgia, serif')
                    .attr('opacity', fe)
                    .call((F) => {
                        F.append('tspan')
                            .attr('x', vt)
                            .attr('dy', 0)
                            .text('Business economics'),
                            F.append('tspan')
                                .attr('x', vt)
                                .attr('dy', '1.1em')
                                .text('introduced');
                    }));
            const P0 = P.append('g')
                .selectAll('.ivy-plus-line')
                .data(R)
                .join('path')
                .attr('fill', 'none')
                .attr('class', 'ivy-plus-line')
                .attr('stroke', '#1e1e1e')
                .attr('stroke-linecap', 'butt')
                .attr('stroke-width', 1.2)
                .attr('opacity', 0)
                .attr('d', (F) => Z(F.values));
            (l.current.ivy = P0.nodes().map((F) => Be(F))),
                (l.current.uchicago = P.append('path')
                    .datum(k)
                    .attr('fill', 'none')
                    .attr('class', 'line-path')
                    .attr('stroke', '#800000')
                    .attr('stroke-width', 2)
                    .attr('d', Z)),
                (l.current.uchicagoInner = P.append('path')
                    .datum(k)
                    .attr('fill', 'none')
                    .attr('class', 'line-path-inner')
                    .attr('stroke', '#800000')
                    .attr('stroke-width', 3)
                    .attr('d', Z)),
                (l.current.hum = P.append('path')
                    .datum($)
                    .attr('fill', 'none')
                    .attr('class', 'line-path-hum')
                    .attr('stroke', '#2d5a3f')
                    .attr('stroke-width', 3)
                    .attr('d', Z)),
                (u.current.hum = l.current.hum.node().getTotalLength()),
                l.current.hum
                    .attr('stroke-dasharray', u.current.hum)
                    .attr('stroke-dashoffset', u.current.hum * (1 - Y)),
                (u.current.uchicago = l.current.uchicago
                    .node()
                    .getTotalLength()),
                (u.current.ivy = l.current.ivy.map((F) =>
                    F.node().getTotalLength()
                )),
                l.current.uchicago
                    .attr('stroke-dasharray', u.current.uchicago)
                    .attr('stroke-dashoffset', u.current.uchicago * (1 - M)),
                l.current.uchicagoInner
                    .attr('stroke-dasharray', u.current.uchicago)
                    .attr('stroke-dashoffset', u.current.uchicago * (1 - M));
            const aa = l.current.ivy.length;
            l.current.ivy.forEach((F, Dn) => {
                const Un = aa > 0 ? (Dn + 1) / aa : 0;
                F.attr('opacity', B >= Un ? 0.3 : 0);
            });
            const j0 = R.map((F, Dn) => {
                    const Un = F.values[F.values.length - 1];
                    return {
                        instnm: F.instnm,
                        lineIndex: Dn,
                        x: q(Un[t]) + 5,
                        y: oe(Un[n])
                    };
                }).map((F) => {
                    const Dn = aa > 0 ? (F.lineIndex + 1) / aa : 0,
                        { dx: Un, dy: L0 } = YN[F.instnm] ?? { dx: 0, dy: 0 };
                    return {
                        text: P.append('text')
                            .attr('x', F.x + Un)
                            .attr('y', F.y + L0)
                            .attr('dy', '0.35em')
                            .attr('text-anchor', 'start')
                            .attr('fill', '#1e1e1e')
                            .attr('font-size', 12)
                            .attr('opacity', B >= Dn ? 0.6 : 0)
                            .attr('font-family', 'Georgia, serif')
                            .text(VN(F.instnm)),
                        threshold: Dn
                    };
                }),
                I0 = P.append('text')
                    .attr('x', i - o.right - 100)
                    .attr('y', 55)
                    .attr('text-anchor', 'start')
                    .attr('fill', '#800000')
                    .attr('font-size', Xn(p))
                    .attr('opacity', 0)
                    .attr('font-family', 'Georgia, serif')
                    .text('UChicago'),
                M0 = P.append('text')
                    .attr('x', q(2016))
                    .attr('y', oe(19))
                    .attr('dy', '0.35em')
                    .attr('text-anchor', 'start')
                    .attr('fill', '#2d5a3f')
                    .attr('font-size', Xn(p))
                    .attr('opacity', Y > 0.95 ? 1 : 0)
                    .attr('font-family', 'Georgia, serif')
                    .text('Humanities and arts'),
                z0 = P.append('text')
                    .attr('x', q(2018.25))
                    .attr('y', oe(38.5))
                    .attr('dy', '0.35em')
                    .attr('text-anchor', 'start')
                    .attr('fill', '#800000')
                    .attr('font-size', Xn(p))
                    .attr('opacity', Y)
                    .attr('font-family', 'Georgia, serif')
                    .text('Economics');
            (f.current = { uchicago: I0, ivy: j0, hum: M0, econ: z0 }),
                (c.current = { uchicago: M >= 0.95 }),
                h.current();
        }, [e]),
        E.useEffect(() => {
            if (!e) return;
            h.current();
            const k = requestAnimationFrame(() => {
                h.current(), requestAnimationFrame(() => h.current());
            });
            return () => cancelAnimationFrame(k);
        }, [e]),
        E.useEffect(() => {
            var A, $, P, R;
            if (!e) return;
            const k = Be(s.current);
            k.selectAll('.x-axis .tick').each(function () {
                const I = Be(this).datum();
                Be(this).select('text').text(Kh(p, I));
            }),
                k.selectAll('.tick text').attr('font-size', hl(p)),
                (A = w.current) == null || A.attr('font-size', Xh(p)),
                ($ = f.current.uchicago) == null || $.attr('font-size', Xn(p)),
                (P = f.current.hum) == null || P.attr('font-size', Xn(p)),
                (R = f.current.econ) == null || R.attr('font-size', Xn(p)),
                ml(y.current, b.current, p, o.top);
        }, [p, e]),
        Bn(r.uchicago, 'change', () => h.current()),
        Bn(r.ivy, 'change', () => h.current()),
        Bn(r.ivyFade, 'change', () => h.current()),
        Bn(r.annotation, 'change', () => h.current()),
        Bn(r.annotationFade, 'change', () => h.current()),
        Bn(r.hum, 'change', () => h.current()),
        x.jsx('svg', {
            ref: s,
            viewBox: `0 0 ${i} ${a}`,
            preserveAspectRatio: 'xMidYMid meet',
            style: {
                width: '90%',
                height: 'auto',
                maxWidth: i,
                overflow: 'visible'
            }
        })
    );
}
const Dr = (e) => e < 400,
    sn = (e) => (Dr(e) ? 28 : 18),
    E0 = (e) => (e < 400 ? 35 : e < 768 ? 29 : e < 1024 ? 26 : 22),
    ln = (e) => (Dr(e) ? 23 : 17),
    qN = (e) => (Dr(e) ? 22 : 20),
    ra = (e, t) => (Dr(e) ? `'${String(t).slice(-2)}` : String(t)),
    C0 = 13,
    JN = (e, t = C0) => e - t,
    ia = (
        e,
        t,
        { x: n, y: r, lines: i, fontSize: a = E0, yOffset: o = C0 }
    ) => {
        if (!e) return;
        const s = Array.isArray(i) ? i : [i];
        e
            .attr('x', n)
            .attr('y', JN(r, o))
            .attr('fill', 'black')
            .attr('font-family', 'Georgia, serif')
            .attr('font-size', a(t))
            .attr('text-anchor', 'middle')
            .text(null)
            .selectAll('tspan')
            .remove(),
            s.forEach((l, u) => {
                e.append('tspan')
                    .attr('x', n)
                    .attr('dy', u === 0 ? 0 : '1.1em')
                    .text(l);
            });
    },
    Ur = () => {
        const [e, t] = E.useState(
            typeof window < 'u' ? window.innerWidth : 1024
        );
        return (
            E.useEffect(() => {
                const n = () => t(window.innerWidth);
                return (
                    window.addEventListener('resize', n),
                    () => window.removeEventListener('resize', n)
                );
            }, []),
            e
        );
    };
function ZN({
    data: e,
    width: t = 700,
    height: n = 400,
    margin: r = { top: 70, right: 100, bottom: 30, left: 50 }
}) {
    const i = E.useRef(),
        a = Ur();
    return (
        E.useEffect(() => {
            if (!e) return;
            const o = Be(i.current);
            o.selectAll('*').remove();
            const s = e.map((m) => ({ year: m.year, value: m.english })),
                l = e.map((m) => ({ year: m.year, value: m.politicalScience })),
                u = [...s, ...l],
                f = Re()
                    .domain(Mn(u, (m) => m.year))
                    .range([r.left, t - r.right]),
                c = Re()
                    .domain([0, on(u, (m) => m.value)])
                    .nice()
                    .range([n - r.bottom, r.top]),
                d = Or()
                    .x((m) => f(m.year))
                    .y((m) => c(m.value)),
                g = 5;
            o.append('g')
                .attr('class', 'x-axis')
                .attr('transform', `translate(0,${n - r.bottom + g})`)
                .attr('color', 'gray')
                .call(
                    $r(f)
                        .tickFormat((m) => ra(a, m))
                        .tickSizeOuter(0)
                )
                .call((m) =>
                    m
                        .selectAll('.tick text')
                        .attr('font-size', sn(a))
                        .attr('font-family', 'Playfair Display, serif')
                );
            const w = on(u, (m) => m.value),
                y = w > 20 ? 10 : 2,
                b = Fr(0, w + y, y);
            o
                .append('g')
                .attr('class', 'y-axis')
                .attr('transform', `translate(${r.left - g},0)`)
                .attr('color', 'gray')
                .call(
                    Rr(c)
                        .tickValues(b)
                        .tickFormat((m) => `${m}%`)
                        .tickSize(0)
                )
                .call((m) => m.select('.domain').remove())
                .call((m) =>
                    m
                        .selectAll('.tick text')
                        .attr('font-size', sn(a))
                        .attr('font-family', 'Playfair Display, serif')
                ),
                o
                    .append('g')
                    .attr('class', 'y-grid')
                    .selectAll('line')
                    .data(b)
                    .join('line')
                    .attr('x1', r.left)
                    .attr('x2', t - r.right)
                    .attr('y1', (m) => c(m))
                    .attr('y2', (m) => c(m))
                    .attr('stroke', '#e6e6e6')
                    .attr('stroke-width', 1),
                ia(o.append('text'), a, {
                    x: (r.left + t - r.right) / 2,
                    y: r.top - 55,
                    lines: [
                        'UChicago Students in Select',
                        'Humanities and Social Science Majors'
                    ]
                }),
                o
                    .append('path')
                    .datum(s)
                    .attr('fill', 'none')
                    .attr('stroke', '#7bb14e')
                    .attr('stroke-width', 2)
                    .attr('stroke-linecap', 'round')
                    .attr('d', d),
                o
                    .append('path')
                    .datum(l)
                    .attr('fill', 'none')
                    .attr('stroke', '#0076bd')
                    .attr('stroke-width', 2)
                    .attr('stroke-linecap', 'round')
                    .attr('d', d),
                s[s.length - 1],
                l[l.length - 1],
                o
                    .append('text')
                    .attr('x', f(2015))
                    .attr('y', c(6.5))
                    .attr('dy', '0.35em')
                    .attr('fill', '#7bb14e')
                    .attr('font-size', ln(a))
                    .attr('font-family', 'Georgia, serif')
                    .text('English'),
                o
                    .append('text')
                    .attr('x', f(2018))
                    .attr('y', c(9.4))
                    .attr('dy', '0.35em')
                    .attr('fill', '#0076bd')
                    .attr('font-size', ln(a))
                    .attr('font-family', 'Georgia, serif')
                    .text('Political science');
        }, [e, a]),
        x.jsx('svg', {
            ref: i,
            viewBox: `0 0 ${t} ${n}`,
            preserveAspectRatio: 'xMidYMid meet',
            style: {
                width: '100%',
                height: 'auto',
                display: 'block',
                overflow: 'visible'
            }
        })
    );
}
function eA({
    data: e,
    width: t = 700,
    height: n = 500,
    margin: r = { top: 110, right: 80, bottom: 50, left: 60 }
}) {
    const i = E.useRef(),
        a = Ur();
    return (
        E.useEffect(() => {
            if (!e) return;
            const o = Be(i.current);
            o.selectAll('*').remove();
            const s = e.map((v) => ({ year: v.year, value: v.math })),
                l = e.map((v) => ({ year: v.year, value: v.publicPolicy })),
                u = [...s, ...l],
                f = Re()
                    .domain(Mn(u, (v) => v.year))
                    .range([r.left, t - r.right]),
                c = Re()
                    .domain([0, on(u, (v) => v.value)])
                    .nice()
                    .range([n - r.bottom, r.top]),
                d = Or()
                    .x((v) => f(v.year))
                    .y((v) => c(v.value)),
                g = 5;
            o.append('g')
                .attr('class', 'x-axis')
                .attr('transform', `translate(0,${n - r.bottom + g})`)
                .attr('color', 'gray')
                .call(
                    $r(f)
                        .tickFormat((v) => ra(a, v))
                        .tickSizeOuter(0)
                )
                .call((v) =>
                    v
                        .selectAll('.tick text')
                        .attr('font-size', sn(a))
                        .attr('font-family', 'Playfair Display, serif')
                );
            const w = on(u, (v) => v.value),
                y = w > 20 ? 10 : 3,
                b = Fr(0, w + y, y);
            o
                .append('g')
                .attr('class', 'y-axis')
                .attr('transform', `translate(${r.left - g},0)`)
                .attr('color', 'gray')
                .call(
                    Rr(c)
                        .tickValues(b)
                        .tickFormat((v) => `${v}%`)
                        .tickSize(0)
                )
                .call((v) => v.select('.domain').remove())
                .call((v) =>
                    v
                        .selectAll('.tick text')
                        .attr('font-size', sn(a))
                        .attr('font-family', 'Playfair Display, serif')
                ),
                o
                    .append('g')
                    .attr('class', 'y-grid')
                    .selectAll('line')
                    .data(b)
                    .join('line')
                    .attr('x1', r.left)
                    .attr('x2', t - r.right)
                    .attr('y1', (v) => c(v))
                    .attr('y2', (v) => c(v))
                    .attr('stroke', '#e6e6e6')
                    .attr('stroke-width', 1);
            const m = 2018;
            o
                .append('line')
                .attr('x1', f(m))
                .attr('x2', f(m))
                .attr('y1', r.top)
                .attr('y2', n - r.bottom)
                .attr('stroke', '#666')
                .attr('stroke-width', 1)
                .attr('stroke-dasharray', '4,4'),
                o
                    .append('text')
                    .attr('x', f(2013))
                    .attr('y', r.top + 18)
                    .attr('text-anchor', 'middle')
                    .attr('fill', '#666')
                    .attr('font-size', qN(a))
                    .attr('font-family', 'Georgia, serif')
                    .text('Business economics introduced'),
                ia(o.append('text'), a, {
                    x: (r.left + t - r.right) / 2,
                    y: r.top - 65,
                    lines: [
                        'Percentage of Students by',
                        'Field of Study at UChicago'
                    ]
                }),
                o
                    .append('path')
                    .datum(s)
                    .attr('fill', 'none')
                    .attr('stroke', '#2a7f3e')
                    .attr('stroke-width', 2.5)
                    .attr('stroke-linecap', 'round')
                    .attr('d', d),
                o
                    .append('path')
                    .datum(l)
                    .attr('fill', 'none')
                    .attr('stroke', '#c45a00')
                    .attr('stroke-width', 2.5)
                    .attr('stroke-linecap', 'round')
                    .attr('d', d);
            const h = s[s.length - 1],
                p = l[l.length - 1];
            o
                .append('text')
                .attr('x', f(2006.25))
                .attr('y', c(h.value - 2))
                .attr('dy', '0.35em')
                .attr('fill', '#2a7f3e')
                .attr('font-size', ln(a))
                .attr('font-family', 'Georgia, serif')
                .text('Math and statistics'),
                o
                    .append('text')
                    .attr('x', f(2021.5))
                    .attr('y', c(p.value + 2.15))
                    .attr('dy', '0.35em')
                    .attr('fill', '#c45a00')
                    .attr('font-size', ln(a))
                    .attr('font-family', 'Georgia, serif')
                    .text('Public policy');
        }, [e, a]),
        x.jsx('svg', {
            ref: i,
            viewBox: `0 0 ${t} ${n}`,
            preserveAspectRatio: 'xMidYMid meet',
            style: { width: '100%', height: 'auto', display: 'block' }
        })
    );
}
function tA({
    data: e,
    width: t = 750,
    height: n = 420,
    margin: r = { top: 100, right: 50, bottom: 30, left: 70 }
}) {
    const i = E.useRef(),
        a = Ur();
    return (
        E.useEffect(() => {
            if (!e) return;
            const o = Be(i.current);
            o.selectAll('*').remove();
            const s = e.map((m) => ({ year: m.year, value: m.uchicago })),
                l = e.map((m) => ({ year: m.year, value: m.penn })),
                u = [...s, ...l],
                f = Re()
                    .domain(Mn(u, (m) => m.year))
                    .range([r.left, t - r.right]),
                c = Re()
                    .domain([10, on(u, (m) => m.value)])
                    .nice()
                    .range([n - r.bottom, r.top]),
                d = Or()
                    .x((m) => f(m.year))
                    .y((m) => c(m.value)),
                g = 5;
            o.append('g')
                .attr('class', 'x-axis')
                .attr('transform', `translate(0,${n - r.bottom + g})`)
                .attr('color', 'gray')
                .call(
                    $r(f)
                        .tickFormat((m) => ra(a, m))
                        .tickSizeOuter(0)
                )
                .call((m) =>
                    m
                        .selectAll('.tick text')
                        .attr('font-size', sn(a))
                        .attr('font-family', 'Playfair Display, serif')
                );
            const w = on(u, (m) => m.value),
                y = w > 20 ? 10 : 5,
                b = Fr(10, w + y, y);
            o
                .append('g')
                .attr('class', 'y-axis')
                .attr('transform', `translate(${r.left - g},0)`)
                .attr('color', 'gray')
                .call(
                    Rr(c)
                        .tickValues(b)
                        .tickFormat((m) => `${m}%`)
                        .tickSize(0)
                )
                .call((m) => m.select('.domain').remove())
                .call((m) =>
                    m
                        .selectAll('.tick text')
                        .attr('font-size', sn(a))
                        .attr('font-family', 'Playfair Display, serif')
                ),
                o
                    .append('g')
                    .attr('class', 'y-grid')
                    .selectAll('line')
                    .data(b)
                    .join('line')
                    .attr('x1', r.left)
                    .attr('x2', t - r.right)
                    .attr('y1', (m) => c(m))
                    .attr('y2', (m) => c(m))
                    .attr('stroke', '#e6e6e6')
                    .attr('stroke-width', 1),
                ia(o.append('text'), a, {
                    x: (r.left + t - r.right) / 2,
                    y: r.top - 115,
                    lines: [
                        'Percentage of Students with Business,',
                        'Economics, or Finance Majors'
                    ]
                }),
                o
                    .append('path')
                    .datum(s)
                    .attr('fill', 'none')
                    .attr('stroke', '#800')
                    .attr('stroke-width', 2.5)
                    .attr('stroke-linecap', 'round')
                    .attr('d', d),
                o
                    .append('path')
                    .datum(l)
                    .attr('fill', 'none')
                    .attr('stroke', '#011F5B')
                    .attr('stroke-width', 2.5)
                    .attr('stroke-linecap', 'round')
                    .attr('d', d),
                o
                    .append('text')
                    .attr('x', f(2018))
                    .attr('y', c(25))
                    .attr('dy', '0.35em')
                    .attr('fill', '#800')
                    .attr('font-size', ln(a))
                    .attr('font-family', 'Georgia, serif')
                    .text('UChicago'),
                o
                    .append('text')
                    .attr('x', f(2010))
                    .attr('y', c(42))
                    .attr('dy', '0.35em')
                    .attr('fill', '#011F5B')
                    .attr('font-size', ln(a))
                    .attr('font-family', 'Georgia, serif')
                    .text('University of Pennsylvania');
        }, [e, a]),
        x.jsx('svg', {
            ref: i,
            viewBox: `0 0 ${t} ${n}`,
            preserveAspectRatio: 'xMidYMid meet',
            style: {
                width: '100%',
                height: 'auto',
                display: 'block',
                overflow: 'visible'
            }
        })
    );
}
const Qh = (e) => (Dr(e) ? 16 : 14),
    nA = (e) => (Dr(e) ? 20 : 15);
function qh({
    data: e,
    title: t,
    showLabels: n = !0,
    width: r = 500,
    height: i = 330,
    margin: a = { top: 80, right: 100, bottom: 30, left: 60 }
}) {
    const o = E.useRef(),
        s = Ur();
    return (
        E.useEffect(() => {
            if (!e) return;
            const l = Be(o.current);
            l.selectAll('*').remove();
            const u = e.map((p) => ({ year: p.year, value: p.uchicago })),
                f = e.map((p) => ({ year: p.year, value: p.otherIvy })),
                c = [...u, ...f],
                d = Re()
                    .domain(Mn(c, (p) => p.year))
                    .range([a.left, r - a.right]),
                g = Re()
                    .domain([20, 65])
                    .nice()
                    .range([i - a.bottom, a.top]),
                w = Or()
                    .x((p) => d(p.year))
                    .y((p) => g(p.value)),
                y = 5;
            l.append('g')
                .attr('class', 'x-axis')
                .attr('transform', `translate(0,${i - a.bottom + y})`)
                .attr('color', 'gray')
                .call(
                    $r(d)
                        .tickFormat((p) => ra(s, p))
                        .tickSizeOuter(0)
                )
                .call((p) =>
                    p
                        .selectAll('.tick text')
                        .attr('font-size', Qh(s))
                        .attr('font-family', 'Playfair Display, serif')
                );
            const m = on(c, (p) => p.value) > 20 ? 10 : 15,
                h = Fr(20, 65, m);
            if (
                (l
                    .append('g')
                    .attr('class', 'y-axis')
                    .attr('transform', `translate(${a.left - y},0)`)
                    .attr('color', 'gray')
                    .call(
                        Rr(g)
                            .tickValues(h)
                            .tickFormat((p) => `${p}%`)
                            .tickSize(0)
                    )
                    .call((p) => p.select('.domain').remove())
                    .call((p) =>
                        p
                            .selectAll('.tick text')
                            .attr('font-size', Qh(s))
                            .attr('font-family', 'Playfair Display, serif')
                    ),
                l
                    .append('g')
                    .attr('class', 'y-grid')
                    .selectAll('line')
                    .data(h)
                    .join('line')
                    .attr('x1', a.left)
                    .attr('x2', r - a.right)
                    .attr('y1', (p) => g(p))
                    .attr('y2', (p) => g(p))
                    .attr('stroke', '#e6e6e6')
                    .attr('stroke-width', 1),
                ia(l.append('text'), s, {
                    x: (a.left + r - a.right) / 2,
                    y: a.top - 45,
                    lines: [t],
                    fontSize: nA
                }),
                l
                    .append('path')
                    .datum(u)
                    .attr('fill', 'none')
                    .attr('stroke', '#800')
                    .attr('stroke-width', 2.5)
                    .attr('stroke-linecap', 'round')
                    .attr('d', w),
                l
                    .append('path')
                    .datum(f)
                    .attr('fill', 'none')
                    .attr('stroke', '#656565')
                    .attr('stroke-width', 2.5)
                    .attr('stroke-linecap', 'round')
                    .attr('d', w),
                n)
            ) {
                const p = u[u.length - 1],
                    v = f[f.length - 1];
                l
                    .append('text')
                    .attr('x', d(p.year))
                    .attr('y', g(p.value))
                    .attr('dx', 6)
                    .attr('dy', '0.35em')
                    .attr('fill', '#800')
                    .attr('font-size', ln(s))
                    .attr('font-family', 'Georgia, serif')
                    .text('UChicago'),
                    l
                        .append('text')
                        .attr('x', d(v.year))
                        .attr('y', g(v.value))
                        .attr('dx', 6)
                        .attr('dy', '0.35em')
                        .attr('fill', '#656565')
                        .attr('font-size', ln(s))
                        .attr('font-family', 'Georgia, serif')
                        .text('Ivy Plus');
            }
        }, [e, t, n, s]),
        x.jsx('svg', {
            ref: o,
            viewBox: `0 0 ${r} ${i}`,
            preserveAspectRatio: 'xMidYMid meet',
            style: {
                width: '100%',
                height: 'auto',
                display: 'block',
                overflow: 'visible'
            }
        })
    );
}
const Ma = [
    '#800',
    '#1e3a5f',
    '#2a7f3e',
    '#c45a00',
    '#5e35b1',
    '#00838f',
    '#d81b60',
    '#5d4037'
];
function rA({
    series: e,
    width: t = 700,
    height: n = 400,
    margin: r = { top: 40, right: 50, bottom: 30, left: 70 }
}) {
    const i = E.useRef(),
        a = Ur();
    return (
        E.useEffect(() => {
            const o = Be(i.current);
            o.select('.lines').empty() &&
                (o.append('g').attr('class', 'x-axis'),
                o.append('g').attr('class', 'y-axis'),
                o.append('g').attr('class', 'y-grid'),
                o.append('g').attr('class', 'lines'),
                o.append('text').attr('class', 'chart-title'));
        }, []),
        E.useEffect(() => {
            const o = Be(i.current);
            o.select('.lines').empty() &&
                (o.append('g').attr('class', 'x-axis'),
                o.append('g').attr('class', 'y-axis'),
                o.append('g').attr('class', 'y-grid'),
                o.append('g').attr('class', 'lines'),
                o.append('text').attr('class', 'chart-title')),
                ia(o.select('.chart-title'), a, {
                    x: (r.left + t - r.right) / 2,
                    y: r.top - 45,
                    lines: ['Share of UChicago', 'Majors']
                });
            const s = (e || []).flatMap((k) => k.values),
                l = s.length > 0,
                u = l ? Mn(s, (k) => k.year) : [2005, 2024],
                f = l ? on(s, (k) => k.value) : 10,
                c = Re()
                    .domain(u)
                    .range([r.left, t - r.right]),
                d = [0.1, 0.25, 0.5, 1, 2, 2.5, 5, 10, 20, 25],
                g = f / 5,
                w = d.find((k) => k >= g) || d[d.length - 1],
                y = Math.ceil(f / w) * w,
                b = Fr(0, y + w / 2, w),
                m = Re()
                    .domain([0, y])
                    .range([n - r.bottom, r.top]),
                h = Or()
                    .x((k) => c(k.year))
                    .y((k) => m(k.value));
            o.select('.x-axis').interrupt(), o.select('.y-axis').interrupt();
            const p = o.transition().duration(900).ease(w0),
                v = 5;
            o
                .select('.x-axis')
                .attr('transform', `translate(0,${n - r.bottom + v})`)
                .attr('color', 'gray')
                .call(
                    $r(c)
                        .tickFormat((k) => ra(a, k))
                        .tickSizeOuter(0)
                )
                .call((k) =>
                    k
                        .selectAll('.tick text')
                        .attr('font-size', sn(a))
                        .attr('font-family', 'Playfair Display, serif')
                ),
                o
                    .select('.y-axis')
                    .attr('transform', `translate(${r.left - v},0)`)
                    .attr('color', 'gray')
                    .transition(p)
                    .call(
                        Rr(m)
                            .tickValues(b)
                            .tickFormat((k) =>
                                w >= 1
                                    ? `${k}%`
                                    : w >= 0.5
                                    ? `${k.toFixed(1)}%`
                                    : `${k.toFixed(2)}%`
                            )
                            .tickSize(0)
                    )
                    .on('end interrupt', function () {
                        Be(this).attr(
                            'transform',
                            `translate(${r.left - v},0)`
                        );
                    })
                    .call((k) =>
                        k
                            .selectAll('.tick text')
                            .attr('font-size', sn(a))
                            .attr('font-family', 'Playfair Display, serif')
                    ),
                o.select('.y-axis').select('.domain').attr('opacity', 0);
            const S = o.select('.y-grid').selectAll('line').data(b);
            S.enter()
                .append('line')
                .attr('x1', r.left)
                .attr('x2', t - r.right)
                .attr('stroke', '#e6e6e6')
                .attr('stroke-width', 1)
                .attr('y1', (k) => m(k))
                .attr('y2', (k) => m(k))
                .merge(S)
                .transition(p)
                .attr('y1', (k) => m(k))
                .attr('y2', (k) => m(k)),
                S.exit().remove();
            const _ = o
                .select('.lines')
                .selectAll('path')
                .data(e || [], (k) => k.major);
            _.enter()
                .append('path')
                .attr('fill', 'none')
                .attr('stroke-width', 2.5)
                .attr('stroke-linecap', 'round')
                .attr('stroke', (k) => Ma[e.indexOf(k) % Ma.length])
                .attr('d', (k) => h(k.values))
                .attr('opacity', 0)
                .transition(p)
                .attr('opacity', 1),
                _.transition(p)
                    .attr('stroke', (k) => Ma[e.indexOf(k) % Ma.length])
                    .attr('d', (k) => h(k.values)),
                _.exit().transition(p).attr('opacity', 0).remove(),
                o.select('.labels').remove();
        }, [e, a]),
        x.jsx('svg', {
            ref: i,
            viewBox: `0 0 ${t} ${n}`,
            preserveAspectRatio: 'xMidYMid meet',
            style: {
                width: '100%',
                height: 'auto',
                display: 'block',
                overflow: 'visible'
            }
        })
    );
}
const iA = (e) => {
        const {
                start: t,
                onStepEnter: n,
                onStepExit: r,
                textArray: i,
                height: a
            } = e,
            o = t + i.length;
        return x.jsx('div', {
            className: 'relative px-5 py-5 z-10 mx-auto',
            children: x.jsxs(u_, {
                onStepEnter: n,
                onStepExit: r,
                offset: 1,
                children: [
                    i.map((s, l) =>
                        x.jsx(
                            xh,
                            {
                                data: t + l,
                                children: x.jsx('div', {
                                    className: `relative p-2
                            border border-[#800000] rounded-[10px]
                            bg-white z-20 max-w-[300px] md:w-[350px] mx-auto`,
                                    style: { marginBottom: 0.9 * a + 'px' },
                                    children: x.jsx('p', {
                                        className: 'scroll_font',
                                        dangerouslySetInnerHTML: { __html: s }
                                    })
                                })
                            },
                            t + l
                        )
                    ),
                    x.jsx(xh, {
                        data: o,
                        children: x.jsx('div', { style: { height: '10px' } })
                    })
                ]
            })
        });
    },
    aA = (e) => {
        const [t, n] = E.useState(null),
            r = E.useRef(null),
            { scrollYProgress: i } = Gb({
                target: r,
                offset: ['start end', 'end start']
            }),
            a = mn(i, [0.18, 0.33], [0, 1]),
            o = mn(i, [0.36, 0.45], [0, 1]),
            s = mn(i, [0.48, 0.53], [0, 1]),
            l = mn(i, [0.55, 0.6], [0, 1]),
            u = mn(i, [0.68, 0.71], [0, 1]),
            f = mn(i, [0.72, 0.82], [0, 1]),
            c = {
                uchicago: a,
                ivy: o,
                ivyFade: s,
                annotation: l,
                annotationFade: u,
                hum: f
            };
        return (
            E.useEffect(() => {
                Promise.all([
                    $n('data/majors.csv', Fn),
                    $n('data/economics_humanities.csv', Fn)
                ]).then(([d, g]) => {
                    const w = d.filter(
                            (h) =>
                                h.cip_code.includes('Economics') ||
                                h.cip_code.includes('Business')
                        ),
                        y = Sh(
                            w.filter(
                                (h) => h.instnm === 'University of Chicago'
                            ),
                            (h) => ({
                                total: bh(h, (p) => p.total),
                                students: h[0].total_students
                            }),
                            (h) => h.year
                        )
                            .map(([h, p]) => ({
                                year: h,
                                total: (p.total / p.students) * 100
                            }))
                            .concat({ year: 2025, total: 41 })
                            .sort((h, p) => h.year - p.year),
                        b = Sh(
                            w.filter(
                                (h) => h.instnm != 'University of Chicago'
                            ),
                            (h) => ({
                                total: bh(h, (p) => p.total),
                                students: h[0].total_students
                            }),
                            (h) => h.instnm,
                            (h) => h.year
                        )
                            .map(([h, p]) => ({
                                instnm: h,
                                values: p
                                    .map(([v, S]) => ({
                                        year: v,
                                        total: (S.total / S.students) * 100
                                    }))
                                    .sort((v, S) => v.year - S.year)
                            }))
                            .sort((h, p) => bi(h.instnm, p.instnm)),
                        m = g
                            .filter(
                                (h) =>
                                    h.classification === 'Humanities and Arts'
                            )
                            .map((h) => ({
                                year: h.year,
                                total: h.share_students * 100
                            }))
                            .sort((h, p) => h.year - p.year);
                    n({ uchicagoByYear: y, ivyPlusByYear: b, humByYear: m });
                });
            }, []),
            x.jsxs('div', {
                ref: r,
                style: { height: '510vh' },
                className: 'relative',
                children: [
                    x.jsx('div', {
                        className:
                            'sticky top-0 h-screen w-full flex items-center justify-center bg-white',
                        children:
                            t &&
                            x.jsx(QN, {
                                data: t,
                                xKey: 'year',
                                yKey: 'total',
                                progress: c,
                                height: 400
                            })
                    }),
                    x.jsxs('div', {
                        className: 'absolute inset-0 pointer-events-none',
                        children: [
                            x.jsx('div', { className: 'h-[50vh] mt-[50vh]' }),
                            x.jsx('div', {
                                className: 'pointer-events-auto',
                                children: x.jsx(iA, {
                                    start: 0,
                                    textArray: Q2,
                                    height: window.innerHeight,
                                    onStepEnter: () => {},
                                    onStepExit: () => {}
                                })
                            })
                        ]
                    })
                ]
            })
        );
    },
    oA = () => {
        const [e, t] = E.useState(null),
            n = E.useRef(null);
        return (
            E.useEffect(() => {
                Promise.all([$n('data/english_polisci_trend.csv', Fn)]).then(
                    ([r]) => {
                        const i = r.map((a) => ({
                            year: a.year,
                            english: a.English * 100,
                            politicalScience: a['Political Science'] * 100
                        }));
                        t(i);
                    }
                );
            }, []),
            x.jsx('div', { ref: n, children: x.jsx(ZN, { data: e }) })
        );
    },
    sA = () => {
        const [e, t] = E.useState(null),
            n = E.useRef(null);
        return (
            E.useEffect(() => {
                $n('data/substitution_trend.csv', Fn).then((r) => {
                    const i = Jc(
                            r,
                            (o) => {
                                const s = { year: o[0].year };
                                return (
                                    o.forEach((l) => {
                                        l.classification === 'Math and Stats' &&
                                            (s.math = l.share_students * 100),
                                            l.classification ===
                                                'Public Policy' &&
                                                (s.publicPolicy =
                                                    l.share_students * 100);
                                    }),
                                    s
                                );
                            },
                            (o) => o.year
                        ),
                        a = Array.from(i.values()).sort(
                            (o, s) => o.year - s.year
                        );
                    t(a);
                });
            }, []),
            x.jsx('div', { ref: n, children: x.jsx(eA, { data: e }) })
        );
    },
    lA = () => {
        const [e, t] = E.useState(null),
            n = E.useRef(null);
        return (
            E.useEffect(() => {
                $n('data/wharton_uchicago.csv', Fn).then((r) => {
                    const i = Jc(
                            r,
                            (o) => {
                                const s = { year: o[0].year };
                                return (
                                    o.forEach((l) => {
                                        l.instnm === 'University of Chicago' &&
                                            (s.uchicago =
                                                l.share_students * 100),
                                            l.instnm ===
                                                'University of Pennsylvania' &&
                                                (s.penn =
                                                    l.share_students * 100);
                                    }),
                                    s
                                );
                            },
                            (o) => o.year
                        ),
                        a = Array.from(i.values()).sort(
                            (o, s) => o.year - s.year
                        );
                    t(a);
                });
            }, []),
            x.jsx('div', { ref: n, children: x.jsx(tA, { data: e }) })
        );
    },
    uA = () => {
        const e = Ur(),
            [t, n] = E.useState(null),
            [r, i] = E.useState(null);
        return (
            E.useEffect(() => {
                $n('data/share_social_sciences_humanities.csv', Fn).then(
                    (a) => {
                        const o = (u) => {
                                const f = Jc(
                                    u,
                                    (c) => {
                                        const d = { year: c[0].year };
                                        return (
                                            c.forEach((g) => {
                                                g.is_uchicago ===
                                                    'University of Chicago' &&
                                                    (d.uchicago =
                                                        g.value * 100),
                                                    g.is_uchicago ===
                                                        'Other Ivy Plus' &&
                                                        (d.otherIvy =
                                                            g.value * 100);
                                            }),
                                            d
                                        );
                                    },
                                    (c) => c.year
                                );
                                return Array.from(f.values()).sort(
                                    (c, d) => c.year - d.year
                                );
                            },
                            s = a.filter(
                                (u) => u.metric === 'Share of students'
                            ),
                            l = a.filter(
                                (u) => u.metric === 'Share of degrees'
                            );
                        n(o(s)), i(o(l));
                    }
                );
            }, []),
            x.jsxs('div', {
                className: 'w-full',
                children: [
                    x.jsxs('div', {
                        className:
                            'font-serif text-black mb-6 leading-[1.1] text-left',
                        style: { fontSize: E0(e) },
                        children: [
                            x.jsx('div', {
                                className: 'text-[22px]',
                                children: 'Humanities, Arts, and Non-Economics'
                            }),
                            x.jsx('div', {
                                className: 'text-[22px]',
                                children: 'Social Science Majors'
                            })
                        ]
                    }),
                    x.jsxs('div', {
                        className:
                            'flex flex-col lg:flex-row justify-center items-stretch gap-6 lg:gap-3',
                        children: [
                            x.jsx('div', {
                                className: 'w-full lg:flex-1',
                                children: x.jsx(qh, {
                                    data: t,
                                    title: 'Share of students',
                                    showLabels: !0
                                })
                            }),
                            x.jsx('div', {
                                className: 'w-full lg:flex-1',
                                children: x.jsx(qh, {
                                    data: r,
                                    title: 'Share of degrees',
                                    showLabels: !0
                                })
                            })
                        ]
                    })
                ]
            })
        );
    },
    cA = () => {
        const [e, t] = E.useState(null),
            [n, r] = E.useState([]),
            [i, a] = E.useState(''),
            [o, s] = E.useState([]),
            [l, u] = E.useState(!1);
        E.useEffect(() => {
            $n('data/major_shares.csv', Fn).then((y) => {
                t(y);
                const b = [...new Set(y.map((m) => m.major))].sort();
                r(b);
            });
        }, []);
        const f =
                i.length > 0
                    ? n
                          .filter(
                              (y) =>
                                  y.toLowerCase().includes(i.toLowerCase()) &&
                                  !o.includes(y)
                          )
                          .slice(0, 8)
                    : [],
            c = o.map((y) => ({
                major: y,
                values: (e || [])
                    .filter((b) => b.major === y)
                    .map((b) => ({
                        year: b.year,
                        value: b.share_students * 100
                    }))
                    .sort((b, m) => b.year - m.year)
            })),
            d = (y) => {
                o.length >= 6 || (s([...o, y]), a(''), u(!1));
            },
            g = (y) => {
                s(o.filter((b) => b !== y));
            },
            w = (y) => {
                a(y.target.value), u(!0);
            };
        return x.jsxs('div', {
            className:
                'my-16 flex flex-col items-center max-w-3xl mx-auto px-4',
            children: [
                o.length > 0 &&
                    x.jsx('div', {
                        className:
                            'flex flex-wrap gap-2 mb-4 justify-center max-w-2xl',
                        children: o.map((y, b) =>
                            x.jsxs(
                                'span',
                                {
                                    className:
                                        'inline-flex items-center bg-gray-100 border border-gray-300 rounded-full px-3 py-1 text-sm font-serif',
                                    style: {
                                        borderLeftColor: fA(b),
                                        borderLeftWidth: '4px'
                                    },
                                    children: [
                                        y,
                                        x.jsx('button', {
                                            onClick: () => g(y),
                                            className:
                                                'ml-2 text-gray-500 hover:text-gray-900 font-bold',
                                            'aria-label': `Remove ${y}`,
                                            children: '×'
                                        })
                                    ]
                                },
                                y
                            )
                        )
                    }),
                o.length > 0 &&
                    x.jsx('button', {
                        onClick: () => s([]),
                        className:
                            'mb-4 text-sm text-gray-500 hover:text-gray-900 underline font-serif',
                        children: 'Clear all'
                    }),
                x.jsxs('div', {
                    className: 'relative w-72 mb-16',
                    children: [
                        x.jsx('input', {
                            type: 'text',
                            placeholder:
                                o.length >= 6
                                    ? 'Maximum reached'
                                    : o.length === 0
                                    ? 'Type a major...'
                                    : 'Add another major...',
                            value: i,
                            onChange: w,
                            onFocus: () => u(!0),
                            onBlur: () => setTimeout(() => u(!1), 150),
                            className:
                                'w-full border border-gray-400 rounded px-3 py-2 text-base font-serif focus:outline-none focus:border-gray-700'
                        }),
                        l &&
                            f.length > 0 &&
                            x.jsx('ul', {
                                className:
                                    'absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto z-10',
                                children: f.map((y) =>
                                    x.jsx(
                                        'li',
                                        {
                                            onClick: () => d(y),
                                            className:
                                                'px-3 py-2 cursor-pointer hover:bg-gray-100 text-base font-serif',
                                            children: y
                                        },
                                        y
                                    )
                                )
                            })
                    ]
                }),
                c.length > -1
                    ? x.jsxs('figure', {
                          className: 'w-full flex flex-col ',
                          children: [
                              x.jsx(rA, { series: c }),
                              x.jsx('figcaption', {
                                  className:
                                      'text-xs text-gray-600 italic mt-4 text-left px-4',
                                  children:
                                      'Share of UChicago graduates majoring in each selected field, 2005–2024. Use the search above to add or remove majors. UChicago-specific majors, such as LLSO, are classified from CIP codes based on best available match.'
                              })
                          ]
                      })
                    : x.jsx('p', {
                          className: 'text-gray-500 italic font-serif',
                          children:
                              'Select one or more majors to see the trend.'
                      })
            ]
        });
    },
    Jh = [
        '#800',
        '#1e3a5f',
        '#2a7f3e',
        '#c45a00',
        '#5e35b1',
        '#00838f',
        '#d81b60',
        '#5d4037'
    ];
function fA(e) {
    return Jh[e % Jh.length];
}
const St = {
        ariJacob: x.jsxs(x.Fragment, {
            children: [
                ' ',
                x.jsx('a', {
                    href: 'https://chicagomaroon.com/staff_name/ari-jacob',
                    className: 'text-[#800000] not-italic',
                    children: 'Ari Jacob'
                }),
                '.'
            ]
        }),
        olinNafziger: x.jsxs(x.Fragment, {
            children: [
                ' ',
                x.jsx('a', {
                    href: 'https://chicagomaroon.com/staff_name/olin-nafziger',
                    className: 'text-[#800000] not-italic',
                    children: 'Olin Nafziger'
                }),
                '.'
            ]
        }),
        nolanShaffer: x.jsxs(x.Fragment, {
            children: [
                ' ',
                x.jsx('a', {
                    href: 'https://chicagomaroon.com/staff_name/nolan-shaffer',
                    className: 'text-[#800000] not-italic',
                    children: 'Nolan Shaffer'
                }),
                '.'
            ]
        })
    },
    de = ({ header: e, paragraphs: t }) =>
        x.jsxs('section', {
            className: 'max-w-2xl mx-auto px-4 my-12',
            children: [
                e &&
                    x.jsx('h2', {
                        className: 'text-2xl font-bold mb-6 font-serif',
                        children: e
                    }),
                t.map((n, r) =>
                    x.jsx(
                        'p',
                        {
                            className:
                                'text-lg leading-relaxed mb-5 font-serif font-normal',
                            dangerouslySetInnerHTML: { __html: n }
                        },
                        r
                    )
                )
            ]
        });
function dA({ windowHeight: e, windowWidth: t }) {
    const [n, r] = E.useState(() => {
            const o = localStorage.getItem('scrollY');
            return o !== null ? parseInt(o) : 0;
        }),
        [i, a] = E.useState(() => {
            const o = localStorage.getItem('currentStepIndex');
            return o !== null && n > 2e3 ? parseInt(o) : 0;
        });
    return (
        E.useEffect(() => {
            localStorage.setItem('currentStepIndex', i.toString());
        }, [i]),
        E.useEffect(() => {
            localStorage.setItem('scrollY', n.toString());
        }, [n]),
        E.useEffect(() => {
            const o = () => {
                r(window.scrollY);
            };
            return (
                window.addEventListener('scroll', o),
                () => window.removeEventListener('scroll', o)
            );
        }, []),
        E.useEffect(() => {
            n <= 100 && a(0);
        }, [n]),
        x.jsxs('div', {
            className: '[overflow-x:clip]',
            children: [
                x.jsx(aA, {}),
                x.jsx(de, { paragraphs: qs.slice(0, 9) }),
                x.jsxs('figure', {
                    className:
                        'mt-24 mb-16 flex flex-col items-start max-w-3xl mx-auto px-2 sm:px-8',
                    children: [
                        x.jsx('div', {
                            className: 'w-full',
                            children: x.jsx(lA, {})
                        }),
                        x.jsxs('figcaption', {
                            className:
                                'text-xs text-gray-600 italic mt-4 w-full text-left',
                            children: [
                                'The economics major at the University of Chicago used to be half the size of the combination of economics, business, and finance majors at the University of Pennsylvania. Now, they are on equal footing.',
                                St.ariJacob
                            ]
                        })
                    ]
                }),
                x.jsx(de, { paragraphs: qs.slice(9, 12) }),
                x.jsxs('figure', {
                    className:
                        'my-16 flex flex-col items-start max-w-2xl mx-auto',
                    children: [
                        x.jsx('img', {
                            src: 'photos/ruby_photo.jpg',
                            alt: 'Vincent Li',
                            className: 'w-full h-auto'
                        }),
                        x.jsxs('figcaption', {
                            className:
                                'text-xs text-gray-600 italic mt-4 px-4 text-left',
                            children: [
                                'Ruby Velez, a fourth-year human rights and Law, Letters and Society (LLSO) double major, says that students are thinking: “How do we leverage our education to be the most useful?”',
                                St.olinNafziger
                            ]
                        })
                    ]
                }),
                x.jsx(de, { paragraphs: qs.slice(12) }),
                x.jsx(de, { header: q2, paragraphs: Ea.slice(0, 6) }),
                x.jsxs('figure', {
                    className:
                        'my-16 flex flex-col items-start max-w-2xl mx-auto',
                    children: [
                        x.jsx('img', {
                            src: 'photos/vincent_photo.jpg',
                            alt: 'Vincent Li',
                            className: 'w-full h-auto'
                        }),
                        x.jsxs('figcaption', {
                            className:
                                'text-xs text-gray-600 italic mt-4 px-4 text-left',
                            children: [
                                'Vincent Li, a fourth-year business economics and LLSO double major, said that if he didn’t have an “irrational fear” of it, he might have done standard-track economics.',
                                St.olinNafziger
                            ]
                        })
                    ]
                }),
                x.jsx(de, { paragraphs: Ea.slice(6, 9) }),
                x.jsxs('figure', {
                    className:
                        'my-16 flex flex-col items-start max-w-3xl mx-auto px-2 sm:px-8',
                    children: [
                        x.jsx('div', {
                            className: 'w-full',
                            children: x.jsx(sA, {})
                        }),
                        x.jsxs('figcaption', {
                            className:
                                'text-xs text-gray-600 italic mt-4 w-full text-left',
                            children: [
                                'The share of students majoring in mathematics and statistics, as well as those majoring in public policy, has decreased precipitously since 2018. This comes after these majors were steadily growing for the previous 15 years.',
                                St.ariJacob
                            ]
                        })
                    ]
                }),
                x.jsx(de, { paragraphs: Ea.slice(9, 17) }),
                x.jsxs('figure', {
                    className:
                        'my-16 flex flex-col items-start max-w-3xl mx-auto px-2 sm:px-8',
                    children: [
                        x.jsx('div', {
                            className: 'w-full',
                            children: x.jsx('img', {
                                src: 'dotchart.svg',
                                alt: 'Outcomes chart',
                                className: 'w-full h-auto'
                            })
                        }),
                        x.jsxs('figcaption', {
                            className:
                                'text-xs text-gray-600 italic mt-16 w-full text-left',
                            children: [
                                'After growing in the early 2010s, the share of students employed in finance or business-related jobs after graduating from the University of Chicago has barely changed since 2017. The number of students majoring in economics nearly doubled during this time. ',
                                St.nolanShaffer
                            ]
                        })
                    ]
                }),
                x.jsx(de, { paragraphs: Ea.slice(17) }),
                x.jsx(cA, {}),
                x.jsx(de, { header: J2, paragraphs: Js.slice(0, 3) }),
                x.jsxs('figure', {
                    className:
                        'my-16 flex flex-col items-start max-w-2xl mx-auto',
                    children: [
                        x.jsx('img', {
                            src: 'photos/old_class.jpg',
                            alt: 'Old class',
                            className: 'w-full h-auto'
                        }),
                        x.jsx('figcaption', {
                            className:
                                'text-xs text-gray-600 italic mt-4 text-left px-4',
                            children:
                                'The University shifted towards a more liberal arts approach to education with the New Plan in the 1930s. Chicago Maroon Photographic Archive.'
                        })
                    ]
                }),
                x.jsx(de, { paragraphs: Js.slice(3, 7) }),
                x.jsxs('figure', {
                    className:
                        'my-16 flex flex-col items-start max-w-2xl mx-auto',
                    children: [
                        x.jsx('img', {
                            src: 'photos/students_studying.jpg',
                            alt: 'Old class',
                            className: 'w-full h-auto'
                        }),
                        x.jsx('figcaption', {
                            className:
                                'text-xs text-gray-600 italic mt-4 text-left px-4',
                            children:
                                'Some students are beginning to view the Core as barrier, inhibiting their ability to pursue their goals. Chicago Maroon Photographic Archive.'
                        })
                    ]
                }),
                x.jsx(de, { paragraphs: Js.slice(7) }),
                x.jsx(de, { header: Z2, paragraphs: Zs.slice(0, 2) }),
                x.jsxs('figure', {
                    className:
                        'my-16 flex flex-col items-start max-w-3xl mx-auto px-2 sm:px-8',
                    children: [
                        x.jsx('div', {
                            className: 'w-full',
                            children: x.jsx(oA, {})
                        }),
                        x.jsxs('figcaption', {
                            className:
                                'text-xs text-gray-600 italic mt-4 w-full text-left',
                            children: [
                                'In 2005, English and political science accounted for 20 percent of graduating students. Today, they make up just over 7 percent of the Class of 2024. Their decline began around 2012, the year that students entering college during the Great Recession would have graduated.',
                                St.ariJacob
                            ]
                        })
                    ]
                }),
                x.jsx(de, { paragraphs: Zs.slice(2, 8) }),
                x.jsxs('figure', {
                    className:
                        'my-16 flex flex-col items-start max-w-6xl mx-auto px-2 sm:px-8',
                    children: [
                        x.jsx('div', {
                            className: 'w-full',
                            children: x.jsx(uA, {})
                        }),
                        x.jsxs('figcaption', {
                            className:
                                'text-xs text-gray-600 italic mt-3 w-full text-left',
                            children: [
                                'As a percentage of both degrees granted and students in each program, humanities, social sciences, and arts majors at the University of Chicago have declined at the same rate as at peer institutions. When looking at the share of degrees, Chicago is declining more quickly, particularly over the past six years.',
                                St.ariJacob
                            ]
                        })
                    ]
                }),
                x.jsx(de, { paragraphs: Zs.slice(8) }),
                x.jsx(de, { header: eS, paragraphs: el.slice(0, 4) }),
                x.jsxs('figure', {
                    className:
                        'my-8 flex flex-col items-start max-w-2xl mx-auto',
                    children: [
                        x.jsx('img', {
                            src: 'photos/poster_image.jpg',
                            alt: 'Poster',
                            className: 'w-full h-auto'
                        }),
                        x.jsxs('figcaption', {
                            className:
                                'text-xs text-gray-600 italic mt-4 text-left px-4',
                            children: [
                                'Classes in the humanities, arts, and social sciences frequently advertise themselves with posters displayed around campus.',
                                St.olinNafziger
                            ]
                        })
                    ]
                }),
                x.jsx(de, { paragraphs: el.slice(4, 12) }),
                x.jsxs('figure', {
                    className:
                        'my-8 flex flex-col items-start max-w-2xl mx-auto',
                    children: [
                        x.jsx('img', {
                            src: 'photos/classroom_image.jpg',
                            alt: 'Vincent Li',
                            className: 'w-full h-auto'
                        }),
                        x.jsxs('figcaption', {
                            className:
                                'text-xs text-gray-600 italic mt-4 text-left px-4',
                            children: [
                                'Since 2005, the share of students majoring in the humanities, arts, or social sciences has been declining.',
                                St.olinNafziger
                            ]
                        })
                    ]
                }),
                x.jsx(de, { paragraphs: el.slice(12) }),
                x.jsx(de, { header: tS, paragraphs: tl.slice(0, -1) }),
                x.jsx('section', {
                    className: 'max-w-2xl mx-auto px-4 mb-12',
                    children: x.jsxs('p', {
                        className:
                            'text-lg leading-relaxed mb-5 font-serif font-normal',
                        children: [
                            x.jsx('span', {
                                dangerouslySetInnerHTML: {
                                    __html: tl[tl.length - 1]
                                }
                            }),
                            x.jsx('img', {
                                src: 'maroon_logo_m_black.svg',
                                alt: '',
                                className:
                                    'inline h-[0.85em] w-auto ml-2 align-text-bottom'
                            })
                        ]
                    })
                }),
                x.jsxs('section', {
                    className:
                        'max-w-2xl mx-auto px-4 my-5 text-gray-700 italic',
                    children: [
                        x.jsxs('p', {
                            className: 'text-sm',
                            children: [
                                'Editor’s note: Elizabeth Eck previously served as an associate Arts editor for the',
                                ' ',
                                x.jsx('span', {
                                    className: 'not-italic',
                                    children: 'Maroon'
                                }),
                                '.'
                            ]
                        }),
                        x.jsxs('p', {
                            className: 'text-sm mt-2',
                            children: [
                                'The version of this article published in the May 20 print edition incorrectly stated that all but two humanities majors had seen declines in the share of students enrolling over the past 20 years. All but three had seen such declines.',
                                ' '
                            ]
                        }),
                        x.jsxs('p', {
                            className: 'text-sm mt-2',
                            children: [
                                'Editor’s note, May 25: This article previously incorrectly stated that the public policy major does not require calculus.',
                                ' '
                            ]
                        })
                    ]
                })
            ]
        })
    );
}
function hA() {
    const [e, t] = E.useState(!1);
    return x.jsxs('div', {
        className: 'max-w-2xl mx-auto px-4',
        children: [
            x.jsx('div', { className: 'w-full h-[3px] bg-black rounded-md' }),
            x.jsxs('div', {
                className: 'py-5',
                children: [
                    x.jsxs('p', {
                        id: 'method-show',
                        className:
                            'text-[16px] cursor-pointer select-none flex items-center font-serif',
                        onClick: () => t(!e),
                        children: [
                            x.jsx('span', {
                                className: 'inline-flex shrink-0 -ml-[0.35em]',
                                style: {
                                    transition: 'transform 0.3s',
                                    transform: e
                                        ? 'rotate(90deg)'
                                        : 'rotate(0deg)'
                                },
                                children: x.jsx(vy, { icon: B2, size: 'lg' })
                            }),
                            'Read about our methodology.'
                        ]
                    }),
                    e &&
                        x.jsxs('div', {
                            id: 'methods',
                            className: 'mt-6 max-w-2xl',
                            children: [
                                x.jsx('h2', {
                                    className:
                                        'text-2xl font-bold mb-4 font-serif',
                                    children: nS
                                }),
                                x.jsx('h3', {
                                    className:
                                        'text-xl font-bold mt-8 mb-2 font-serif',
                                    children: rS
                                }),
                                x.jsx('p', {
                                    className:
                                        'text-sm italic mb-4 text-gray-700 font-serif',
                                    children: iS
                                }),
                                aS.map((n, r) =>
                                    x.jsx(
                                        'p',
                                        {
                                            className:
                                                'method-text text-base leading-relaxed mb-4 font-serif',
                                            dangerouslySetInnerHTML: {
                                                __html: n
                                            }
                                        },
                                        r
                                    )
                                ),
                                x.jsx('h3', {
                                    className:
                                        'text-xl font-bold mt-8 mb-2 font-serif',
                                    children: oS
                                }),
                                x.jsx('p', {
                                    className:
                                        'text-sm italic mb-4 text-gray-700 font-serif',
                                    children: sS
                                }),
                                lS.map((n, r) =>
                                    x.jsx(
                                        'p',
                                        {
                                            className:
                                                'method-text text-base leading-relaxed mb-4 font-serif',
                                            dangerouslySetInnerHTML: {
                                                __html: n
                                            }
                                        },
                                        r
                                    )
                                ),
                                x.jsx('h3', {
                                    className:
                                        'text-xl font-bold mt-8 mb-2 font-serif',
                                    children: uS
                                }),
                                x.jsx('p', {
                                    className:
                                        'text-sm italic mb-4 text-gray-700 font-serif',
                                    children: cS
                                }),
                                fS.map((n, r) =>
                                    x.jsx(
                                        'p',
                                        {
                                            className:
                                                'method-text text-base leading-relaxed mb-4 font-serif',
                                            dangerouslySetInnerHTML: {
                                                __html: n
                                            }
                                        },
                                        r
                                    )
                                ),
                                x.jsx('h3', {
                                    className:
                                        'text-xl font-bold mt-8 mb-2 font-serif',
                                    children: dS
                                }),
                                x.jsx('p', {
                                    className:
                                        'text-sm italic mb-4 text-gray-700 font-serif',
                                    children: hS
                                }),
                                mS.map((n, r) =>
                                    x.jsx(
                                        'p',
                                        {
                                            className:
                                                'method-text text-base leading-relaxed mb-4 font-serif',
                                            dangerouslySetInnerHTML: {
                                                __html: n
                                            }
                                        },
                                        r
                                    )
                                )
                            ]
                        }),
                    x.jsxs('p', {
                        className: 'text-[16px] mt-3 font-serif',
                        children: [
                            'Cover photo by',
                            ' ',
                            x.jsx('a', {
                                href: 'https://chicagomaroon.com/staff_name/nolan-shaffer/',
                                children: 'Nolan Shaffer'
                            }),
                            '.'
                        ]
                    }),
                    x.jsxs('p', {
                        className: 'text-[16px] mt-3 font-serif',
                        children: [
                            'Find the code for this interactive on',
                            ' ',
                            x.jsx('a', {
                                href: 'https://github.com/chicagomaroon/data-visualizations/tree/main/2026/liberal-arts-decline-src',
                                children: 'GitHub'
                            }),
                            '.'
                        ]
                    })
                ]
            })
        ]
    });
}
function mA() {
    const [e, t] = E.useState(window.innerWidth),
        [n, r] = E.useState(window.innerHeight);
    return (
        E.useEffect(() => {
            function i() {
                t(window.innerWidth), r(window.innerHeight);
            }
            return (
                window.addEventListener('resize', i),
                () => {
                    window.removeEventListener('resize', i);
                }
            );
        }, []),
        x.jsxs('div', {
            children: [
                x.jsx(xS, { windowWidth: e, windowHeight: n }),
                x.jsx(dA, { windowHeight: n, windowWidth: e }),
                x.jsx(hA, {})
            ]
        })
    );
}
function pA() {
    return x.jsx('div', {
        className: 'relative w-screen min-h-screen scrollbar-width: none;',
        children: x.jsx(mA, {})
    });
}
const gA = document.getElementById('root');
fg(gA).render(x.jsx(Ve.StrictMode, { children: x.jsx(pA, {}) }));
