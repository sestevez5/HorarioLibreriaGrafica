class rr {
  tipoActividad;
  idActividad;
  sesion;
  detalleActividad;
  docentes;
  asignaturas;
  grupos;
  dependencia;
  periodoVigencia;
  alumnos;
  actualizarActividad(e) {
    this.tipoActividad = e.tipoActividad, this.detalleActividad = e.detalleActividad, this.sesion = e.sesion, this.docentes = e.docentes, this.dependencia = e.dependencia, this.grupos = e.grupos, this.asignaturas = e.asignaturas, this.periodoVigencia = e.periodoVigencia;
  }
  obtenerIActividad() {
    return {
      idActividad: this.idActividad,
      idSesion: this.sesion.idSesion,
      detalleActividad: this.detalleActividad,
      grupos: this.grupos.map((e) => e.idGrupo),
      docentes: this.docentes.map((e) => e.idDocente),
      asignaturas: this.asignaturas.map((e) => e.idAsignatura),
      dependencia: this.dependencia.idDependencia,
      idPeriodoVigencia: this.periodoVigencia.idPeriodoVigencia,
      idTipoActividad: this.tipoActividad.idTipoActividad
    };
  }
}
var Ie = function(t, e) {
  return Ie = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, r) {
    n.__proto__ = r;
  } || function(n, r) {
    for (var i in r)
      Object.prototype.hasOwnProperty.call(r, i) && (n[i] = r[i]);
  }, Ie(t, e);
};
function pe(t, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  Ie(t, e);
  function n() {
    this.constructor = t;
  }
  t.prototype = e === null ? Object.create(e) : (n.prototype = e.prototype, new n());
}
function Ne(t) {
  var e = typeof Symbol == "function" && Symbol.iterator, n = e && t[e], r = 0;
  if (n)
    return n.call(t);
  if (t && typeof t.length == "number")
    return {
      next: function() {
        return t && r >= t.length && (t = void 0), { value: t && t[r++], done: !t };
      }
    };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function ne(t, e) {
  var n = typeof Symbol == "function" && t[Symbol.iterator];
  if (!n)
    return t;
  var r = n.call(t), i, a = [], o;
  try {
    for (; (e === void 0 || e-- > 0) && !(i = r.next()).done; )
      a.push(i.value);
  } catch (s) {
    o = { error: s };
  } finally {
    try {
      i && !i.done && (n = r.return) && n.call(r);
    } finally {
      if (o)
        throw o.error;
    }
  }
  return a;
}
function re(t, e, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = e.length, a; r < i; r++)
      (a || !(r in e)) && (a || (a = Array.prototype.slice.call(e, 0, r)), a[r] = e[r]);
  return t.concat(a || Array.prototype.slice.call(e));
}
function nt(t) {
  return typeof t == "function";
}
function ir(t) {
  var e = function(r) {
    Error.call(r), r.stack = new Error().stack;
  }, n = t(e);
  return n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, n;
}
var Ae = ir(function(t) {
  return function(n) {
    t(this), this.message = n ? n.length + ` errors occurred during unsubscription:
` + n.map(function(r, i) {
      return i + 1 + ") " + r.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = n;
  };
});
function Ue(t, e) {
  if (t) {
    var n = t.indexOf(e);
    0 <= n && t.splice(n, 1);
  }
}
var ge = function() {
  function t(e) {
    this.initialTeardown = e, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return t.prototype.unsubscribe = function() {
    var e, n, r, i, a;
    if (!this.closed) {
      this.closed = !0;
      var o = this._parentage;
      if (o)
        if (this._parentage = null, Array.isArray(o))
          try {
            for (var s = Ne(o), c = s.next(); !c.done; c = s.next()) {
              var l = c.value;
              l.remove(this);
            }
          } catch (w) {
            e = { error: w };
          } finally {
            try {
              c && !c.done && (n = s.return) && n.call(s);
            } finally {
              if (e)
                throw e.error;
            }
          }
        else
          o.remove(this);
      var u = this.initialTeardown;
      if (nt(u))
        try {
          u();
        } catch (w) {
          a = w instanceof Ae ? w.errors : [w];
        }
      var p = this._finalizers;
      if (p) {
        this._finalizers = null;
        try {
          for (var f = Ne(p), d = f.next(); !d.done; d = f.next()) {
            var m = d.value;
            try {
              gn(m);
            } catch (w) {
              a = a ?? [], w instanceof Ae ? a = re(re([], ne(a)), ne(w.errors)) : a.push(w);
            }
          }
        } catch (w) {
          r = { error: w };
        } finally {
          try {
            d && !d.done && (i = f.return) && i.call(f);
          } finally {
            if (r)
              throw r.error;
          }
        }
      }
      if (a)
        throw new Ae(a);
    }
  }, t.prototype.add = function(e) {
    var n;
    if (e && e !== this)
      if (this.closed)
        gn(e);
      else {
        if (e instanceof t) {
          if (e.closed || e._hasParent(this))
            return;
          e._addParent(this);
        }
        (this._finalizers = (n = this._finalizers) !== null && n !== void 0 ? n : []).push(e);
      }
  }, t.prototype._hasParent = function(e) {
    var n = this._parentage;
    return n === e || Array.isArray(n) && n.includes(e);
  }, t.prototype._addParent = function(e) {
    var n = this._parentage;
    this._parentage = Array.isArray(n) ? (n.push(e), n) : n ? [n, e] : e;
  }, t.prototype._removeParent = function(e) {
    var n = this._parentage;
    n === e ? this._parentage = null : Array.isArray(n) && Ue(n, e);
  }, t.prototype.remove = function(e) {
    var n = this._finalizers;
    n && Ue(n, e), e instanceof t && e._removeParent(this);
  }, t.EMPTY = function() {
    var e = new t();
    return e.closed = !0, e;
  }(), t;
}(), ar = ge.EMPTY;
function or(t) {
  return t instanceof ge || t && "closed" in t && nt(t.remove) && nt(t.add) && nt(t.unsubscribe);
}
function gn(t) {
  nt(t) ? t() : t.unsubscribe();
}
var We = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, $e = {
  setTimeout: function(t, e) {
    for (var n = [], r = 2; r < arguments.length; r++)
      n[r - 2] = arguments[r];
    var i = $e.delegate;
    return i?.setTimeout ? i.setTimeout.apply(i, re([t, e], ne(n))) : setTimeout.apply(void 0, re([t, e], ne(n)));
  },
  clearTimeout: function(t) {
    var e = $e.delegate;
    return (e?.clearTimeout || clearTimeout)(t);
  },
  delegate: void 0
};
function ei(t) {
  $e.setTimeout(function() {
    throw t;
  });
}
function mn() {
}
var Xt = null;
function jt(t) {
  if (We.useDeprecatedSynchronousErrorHandling) {
    var e = !Xt;
    if (e && (Xt = { errorThrown: !1, error: null }), t(), e) {
      var n = Xt, r = n.errorThrown, i = n.error;
      if (Xt = null, r)
        throw i;
    }
  } else
    t();
}
var sr = function(t) {
  pe(e, t);
  function e(n) {
    var r = t.call(this) || this;
    return r.isStopped = !1, n ? (r.destination = n, or(n) && n.add(r)) : r.destination = ai, r;
  }
  return e.create = function(n, r, i) {
    return new ze(n, r, i);
  }, e.prototype.next = function(n) {
    this.isStopped || this._next(n);
  }, e.prototype.error = function(n) {
    this.isStopped || (this.isStopped = !0, this._error(n));
  }, e.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, e.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, t.prototype.unsubscribe.call(this), this.destination = null);
  }, e.prototype._next = function(n) {
    this.destination.next(n);
  }, e.prototype._error = function(n) {
    try {
      this.destination.error(n);
    } finally {
      this.unsubscribe();
    }
  }, e.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, e;
}(ge), ni = Function.prototype.bind;
function _e(t, e) {
  return ni.call(t, e);
}
var ri = function() {
  function t(e) {
    this.partialObserver = e;
  }
  return t.prototype.next = function(e) {
    var n = this.partialObserver;
    if (n.next)
      try {
        n.next(e);
      } catch (r) {
        Gt(r);
      }
  }, t.prototype.error = function(e) {
    var n = this.partialObserver;
    if (n.error)
      try {
        n.error(e);
      } catch (r) {
        Gt(r);
      }
    else
      Gt(e);
  }, t.prototype.complete = function() {
    var e = this.partialObserver;
    if (e.complete)
      try {
        e.complete();
      } catch (n) {
        Gt(n);
      }
  }, t;
}(), ze = function(t) {
  pe(e, t);
  function e(n, r, i) {
    var a = t.call(this) || this, o;
    if (nt(n) || !n)
      o = {
        next: n ?? void 0,
        error: r ?? void 0,
        complete: i ?? void 0
      };
    else {
      var s;
      a && We.useDeprecatedNextContext ? (s = Object.create(n), s.unsubscribe = function() {
        return a.unsubscribe();
      }, o = {
        next: n.next && _e(n.next, s),
        error: n.error && _e(n.error, s),
        complete: n.complete && _e(n.complete, s)
      }) : o = n;
    }
    return a.destination = new ri(o), a;
  }
  return e;
}(sr);
function Gt(t) {
  ei(t);
}
function ii(t) {
  throw t;
}
var ai = {
  closed: !0,
  next: mn,
  error: ii,
  complete: mn
}, oi = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function si(t) {
  return t;
}
function ci(t) {
  return t.length === 0 ? si : t.length === 1 ? t[0] : function(n) {
    return t.reduce(function(r, i) {
      return i(r);
    }, n);
  };
}
var vn = function() {
  function t(e) {
    e && (this._subscribe = e);
  }
  return t.prototype.lift = function(e) {
    var n = new t();
    return n.source = this, n.operator = e, n;
  }, t.prototype.subscribe = function(e, n, r) {
    var i = this, a = ui(e) ? e : new ze(e, n, r);
    return jt(function() {
      var o = i, s = o.operator, c = o.source;
      a.add(s ? s.call(a, c) : c ? i._subscribe(a) : i._trySubscribe(a));
    }), a;
  }, t.prototype._trySubscribe = function(e) {
    try {
      return this._subscribe(e);
    } catch (n) {
      e.error(n);
    }
  }, t.prototype.forEach = function(e, n) {
    var r = this;
    return n = yn(n), new n(function(i, a) {
      var o = new ze({
        next: function(s) {
          try {
            e(s);
          } catch (c) {
            a(c), o.unsubscribe();
          }
        },
        error: a,
        complete: i
      });
      r.subscribe(o);
    });
  }, t.prototype._subscribe = function(e) {
    var n;
    return (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(e);
  }, t.prototype[oi] = function() {
    return this;
  }, t.prototype.pipe = function() {
    for (var e = [], n = 0; n < arguments.length; n++)
      e[n] = arguments[n];
    return ci(e)(this);
  }, t.prototype.toPromise = function(e) {
    var n = this;
    return e = yn(e), new e(function(r, i) {
      var a;
      n.subscribe(function(o) {
        return a = o;
      }, function(o) {
        return i(o);
      }, function() {
        return r(a);
      });
    });
  }, t.create = function(e) {
    return new t(e);
  }, t;
}();
function yn(t) {
  var e;
  return (e = t ?? We.Promise) !== null && e !== void 0 ? e : Promise;
}
function li(t) {
  return t && nt(t.next) && nt(t.error) && nt(t.complete);
}
function ui(t) {
  return t && t instanceof sr || li(t) && or(t);
}
var fi = ir(function(t) {
  return function() {
    t(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Z = function(t) {
  pe(e, t);
  function e() {
    var n = t.call(this) || this;
    return n.closed = !1, n.currentObservers = null, n.observers = [], n.isStopped = !1, n.hasError = !1, n.thrownError = null, n;
  }
  return e.prototype.lift = function(n) {
    var r = new Sn(this, this);
    return r.operator = n, r;
  }, e.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new fi();
  }, e.prototype.next = function(n) {
    var r = this;
    jt(function() {
      var i, a;
      if (r._throwIfClosed(), !r.isStopped) {
        r.currentObservers || (r.currentObservers = Array.from(r.observers));
        try {
          for (var o = Ne(r.currentObservers), s = o.next(); !s.done; s = o.next()) {
            var c = s.value;
            c.next(n);
          }
        } catch (l) {
          i = { error: l };
        } finally {
          try {
            s && !s.done && (a = o.return) && a.call(o);
          } finally {
            if (i)
              throw i.error;
          }
        }
      }
    });
  }, e.prototype.error = function(n) {
    var r = this;
    jt(function() {
      if (r._throwIfClosed(), !r.isStopped) {
        r.hasError = r.isStopped = !0, r.thrownError = n;
        for (var i = r.observers; i.length; )
          i.shift().error(n);
      }
    });
  }, e.prototype.complete = function() {
    var n = this;
    jt(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.isStopped = !0;
        for (var r = n.observers; r.length; )
          r.shift().complete();
      }
    });
  }, e.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(e.prototype, "observed", {
    get: function() {
      var n;
      return ((n = this.observers) === null || n === void 0 ? void 0 : n.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype._trySubscribe = function(n) {
    return this._throwIfClosed(), t.prototype._trySubscribe.call(this, n);
  }, e.prototype._subscribe = function(n) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n);
  }, e.prototype._innerSubscribe = function(n) {
    var r = this, i = this, a = i.hasError, o = i.isStopped, s = i.observers;
    return a || o ? ar : (this.currentObservers = null, s.push(n), new ge(function() {
      r.currentObservers = null, Ue(s, n);
    }));
  }, e.prototype._checkFinalizedStatuses = function(n) {
    var r = this, i = r.hasError, a = r.thrownError, o = r.isStopped;
    i ? n.error(a) : o && n.complete();
  }, e.prototype.asObservable = function() {
    var n = new vn();
    return n.source = this, n;
  }, e.create = function(n, r) {
    return new Sn(n, r);
  }, e;
}(vn), Sn = function(t) {
  pe(e, t);
  function e(n, r) {
    var i = t.call(this) || this;
    return i.destination = n, i.source = r, i;
  }
  return e.prototype.next = function(n) {
    var r, i;
    (i = (r = this.destination) === null || r === void 0 ? void 0 : r.next) === null || i === void 0 || i.call(r, n);
  }, e.prototype.error = function(n) {
    var r, i;
    (i = (r = this.destination) === null || r === void 0 ? void 0 : r.error) === null || i === void 0 || i.call(r, n);
  }, e.prototype.complete = function() {
    var n, r;
    (r = (n = this.destination) === null || n === void 0 ? void 0 : n.complete) === null || r === void 0 || r.call(n);
  }, e.prototype._subscribe = function(n) {
    var r, i;
    return (i = (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(n)) !== null && i !== void 0 ? i : ar;
  }, e;
}(Z);
class di extends rr {
  nivelAncho;
  color;
  estado;
  constructor(e) {
    super(), this.idActividad = e.idActividad, this.detalleActividad = e.detalleActividad, this.sesion = e.sesion, this.docentes = e.docentes, this.dependencia = e.dependencia, this.grupos = e.grupos, this.asignaturas = e.asignaturas, this.periodoVigencia = e.periodoVigencia, this.nivelAncho = 0, this.color = "", this.tipoActividad = e.tipoActividad;
  }
}
function Jt(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function hi(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Ze(t) {
  let e, n, r;
  t.length !== 2 ? (e = Jt, n = (s, c) => Jt(t(s), c), r = (s, c) => t(s) - c) : (e = t === Jt || t === hi ? t : pi, n = t, r = t);
  function i(s, c, l = 0, u = s.length) {
    if (l < u) {
      if (e(c, c) !== 0)
        return u;
      do {
        const p = l + u >>> 1;
        n(s[p], c) < 0 ? l = p + 1 : u = p;
      } while (l < u);
    }
    return l;
  }
  function a(s, c, l = 0, u = s.length) {
    if (l < u) {
      if (e(c, c) !== 0)
        return u;
      do {
        const p = l + u >>> 1;
        n(s[p], c) <= 0 ? l = p + 1 : u = p;
      } while (l < u);
    }
    return l;
  }
  function o(s, c, l = 0, u = s.length) {
    const p = i(s, c, l, u - 1);
    return p > l && r(s[p - 1], c) > -r(s[p], c) ? p - 1 : p;
  }
  return { left: i, center: o, right: a };
}
function pi() {
  return 0;
}
function gi(t) {
  return t === null ? NaN : +t;
}
const mi = Ze(Jt), vi = mi.right;
Ze(gi).center;
const yi = vi;
class wn extends Map {
  constructor(e, n = xi) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: n } }), e != null)
      for (const [r, i] of e)
        this.set(r, i);
  }
  get(e) {
    return super.get(xn(this, e));
  }
  has(e) {
    return super.has(xn(this, e));
  }
  set(e, n) {
    return super.set(Si(this, e), n);
  }
  delete(e) {
    return super.delete(wi(this, e));
  }
}
function xn({ _intern: t, _key: e }, n) {
  const r = e(n);
  return t.has(r) ? t.get(r) : n;
}
function Si({ _intern: t, _key: e }, n) {
  const r = e(n);
  return t.has(r) ? t.get(r) : (t.set(r, n), n);
}
function wi({ _intern: t, _key: e }, n) {
  const r = e(n);
  return t.has(r) && (n = t.get(r), t.delete(r)), n;
}
function xi(t) {
  return t !== null && typeof t == "object" ? t.valueOf() : t;
}
var bi = Math.sqrt(50), Ai = Math.sqrt(10), _i = Math.sqrt(2);
function bn(t, e, n) {
  var r = Math.abs(e - t) / Math.max(0, n), i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)), a = r / i;
  return a >= bi ? i *= 10 : a >= Ai ? i *= 5 : a >= _i && (i *= 2), e < t ? -i : i;
}
function Ci(t, e) {
  let n;
  if (e === void 0)
    for (const r of t)
      r != null && (n < r || n === void 0 && r >= r) && (n = r);
  else {
    let r = -1;
    for (let i of t)
      (i = e(i, ++r, t)) != null && (n < i || n === void 0 && i >= i) && (n = i);
  }
  return n;
}
function Ti(t, e, n) {
  t = +t, e = +e, n = (i = arguments.length) < 2 ? (e = t, t = 0, 1) : i < 3 ? 1 : +n;
  for (var r = -1, i = Math.max(0, Math.ceil((e - t) / n)) | 0, a = new Array(i); ++r < i; )
    a[r] = t + r * n;
  return a;
}
function Mi(t) {
  return t;
}
var Qt = 1, Ce = 2, An = 3, Ft = 4, _n = 1e-6;
function Ei(t) {
  return "translate(" + t + ",0)";
}
function Hi(t) {
  return "translate(0," + t + ")";
}
function Pi(t) {
  return (e) => +t(e);
}
function Di(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function Fi() {
  return !this.__axis;
}
function cr(t, e) {
  var n = [], r = null, i = null, a = 6, o = 6, s = 3, c = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, l = t === Qt || t === Ft ? -1 : 1, u = t === Ft || t === Ce ? "x" : "y", p = t === Qt || t === An ? Ei : Hi;
  function f(d) {
    var m = r ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), w = i ?? (e.tickFormat ? e.tickFormat.apply(e, n) : Mi), E = Math.max(a, 0) + s, N = e.range(), U = +N[0] + c, P = +N[N.length - 1] + c, v = (e.bandwidth ? Di : Pi)(e.copy(), c), _ = d.selection ? d.selection() : d, y = _.selectAll(".domain").data([null]), b = _.selectAll(".tick").data(m, e).order(), D = b.exit(), $ = b.enter().append("g").attr("class", "tick"), Y = b.select("line"), k = b.select("text");
    y = y.merge(y.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), b = b.merge($), Y = Y.merge($.append("line").attr("stroke", "currentColor").attr(u + "2", l * a)), k = k.merge($.append("text").attr("fill", "currentColor").attr(u, l * E).attr("dy", t === Qt ? "0em" : t === An ? "0.71em" : "0.32em")), d !== _ && (y = y.transition(d), b = b.transition(d), Y = Y.transition(d), k = k.transition(d), D = D.transition(d).attr("opacity", _n).attr("transform", function(V) {
      return isFinite(V = v(V)) ? p(V + c) : this.getAttribute("transform");
    }), $.attr("opacity", _n).attr("transform", function(V) {
      var Q = this.parentNode.__axis;
      return p((Q && isFinite(Q = Q(V)) ? Q : v(V)) + c);
    })), D.remove(), y.attr("d", t === Ft || t === Ce ? o ? "M" + l * o + "," + U + "H" + c + "V" + P + "H" + l * o : "M" + c + "," + U + "V" + P : o ? "M" + U + "," + l * o + "V" + c + "H" + P + "V" + l * o : "M" + U + "," + c + "H" + P), b.attr("opacity", 1).attr("transform", function(V) {
      return p(v(V) + c);
    }), Y.attr(u + "2", l * a), k.attr(u, l * E).text(w), _.filter(Fi).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === Ce ? "start" : t === Ft ? "end" : "middle"), _.each(function() {
      this.__axis = v;
    });
  }
  return f.scale = function(d) {
    return arguments.length ? (e = d, f) : e;
  }, f.ticks = function() {
    return n = Array.from(arguments), f;
  }, f.tickArguments = function(d) {
    return arguments.length ? (n = d == null ? [] : Array.from(d), f) : n.slice();
  }, f.tickValues = function(d) {
    return arguments.length ? (r = d == null ? null : Array.from(d), f) : r && r.slice();
  }, f.tickFormat = function(d) {
    return arguments.length ? (i = d, f) : i;
  }, f.tickSize = function(d) {
    return arguments.length ? (a = o = +d, f) : a;
  }, f.tickSizeInner = function(d) {
    return arguments.length ? (a = +d, f) : a;
  }, f.tickSizeOuter = function(d) {
    return arguments.length ? (o = +d, f) : o;
  }, f.tickPadding = function(d) {
    return arguments.length ? (s = +d, f) : s;
  }, f.offset = function(d) {
    return arguments.length ? (c = +d, f) : c;
  }, f;
}
function ki(t) {
  return cr(Qt, t);
}
function Ii(t) {
  return cr(Ft, t);
}
var Ni = { value: () => {
} };
function je() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Kt(n);
}
function Kt(t) {
  this._ = t;
}
function Ui(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n))
      throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Kt.prototype = je.prototype = {
  constructor: Kt,
  on: function(t, e) {
    var n = this._, r = Ui(t + "", n), i, a = -1, o = r.length;
    if (arguments.length < 2) {
      for (; ++a < o; )
        if ((i = (t = r[a]).type) && (i = $i(n[i], t.name)))
          return i;
      return;
    }
    if (e != null && typeof e != "function")
      throw new Error("invalid callback: " + e);
    for (; ++a < o; )
      if (i = (t = r[a]).type)
        n[i] = Cn(n[i], t.name, e);
      else if (e == null)
        for (i in n)
          n[i] = Cn(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e)
      t[n] = e[n].slice();
    return new Kt(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0)
      for (var n = new Array(i), r = 0, i, a; r < i; ++r)
        n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (a = this._[t], r = 0, i = a.length; r < i; ++r)
      a[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, a = r.length; i < a; ++i)
      r[i].value.apply(e, n);
  }
};
function $i(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function Cn(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = Ni, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var Ye = "http://www.w3.org/1999/xhtml";
const Tn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ye,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function me(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Tn.hasOwnProperty(e) ? { space: Tn[e], local: t } : t;
}
function zi(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Ye && e.documentElement.namespaceURI === Ye ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Yi(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function lr(t) {
  var e = me(t);
  return (e.local ? Yi : zi)(e);
}
function Oi() {
}
function Je(t) {
  return t == null ? Oi : function() {
    return this.querySelector(t);
  };
}
function Ri(t) {
  typeof t != "function" && (t = Je(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], o = a.length, s = r[i] = new Array(o), c, l, u = 0; u < o; ++u)
      (c = a[u]) && (l = t.call(c, c.__data__, u, a)) && ("__data__" in c && (l.__data__ = c.__data__), s[u] = l);
  return new z(r, this._parents);
}
function ur(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Vi() {
  return [];
}
function fr(t) {
  return t == null ? Vi : function() {
    return this.querySelectorAll(t);
  };
}
function Li(t) {
  return function() {
    return ur(t.apply(this, arguments));
  };
}
function Xi(t) {
  typeof t == "function" ? t = Li(t) : t = fr(t);
  for (var e = this._groups, n = e.length, r = [], i = [], a = 0; a < n; ++a)
    for (var o = e[a], s = o.length, c, l = 0; l < s; ++l)
      (c = o[l]) && (r.push(t.call(c, c.__data__, l, o)), i.push(c));
  return new z(r, i);
}
function dr(t) {
  return function() {
    return this.matches(t);
  };
}
function hr(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Gi = Array.prototype.find;
function qi(t) {
  return function() {
    return Gi.call(this.children, t);
  };
}
function Bi() {
  return this.firstElementChild;
}
function Wi(t) {
  return this.select(t == null ? Bi : qi(typeof t == "function" ? t : hr(t)));
}
var Zi = Array.prototype.filter;
function ji() {
  return Array.from(this.children);
}
function Ji(t) {
  return function() {
    return Zi.call(this.children, t);
  };
}
function Qi(t) {
  return this.selectAll(t == null ? ji : Ji(typeof t == "function" ? t : hr(t)));
}
function Ki(t) {
  typeof t != "function" && (t = dr(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], o = a.length, s = r[i] = [], c, l = 0; l < o; ++l)
      (c = a[l]) && t.call(c, c.__data__, l, a) && s.push(c);
  return new z(r, this._parents);
}
function pr(t) {
  return new Array(t.length);
}
function ta() {
  return new z(this._enter || this._groups.map(pr), this._parents);
}
function ie(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
ie.prototype = {
  constructor: ie,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function ea(t) {
  return function() {
    return t;
  };
}
function na(t, e, n, r, i, a) {
  for (var o = 0, s, c = e.length, l = a.length; o < l; ++o)
    (s = e[o]) ? (s.__data__ = a[o], r[o] = s) : n[o] = new ie(t, a[o]);
  for (; o < c; ++o)
    (s = e[o]) && (i[o] = s);
}
function ra(t, e, n, r, i, a, o) {
  var s, c, l = /* @__PURE__ */ new Map(), u = e.length, p = a.length, f = new Array(u), d;
  for (s = 0; s < u; ++s)
    (c = e[s]) && (f[s] = d = o.call(c, c.__data__, s, e) + "", l.has(d) ? i[s] = c : l.set(d, c));
  for (s = 0; s < p; ++s)
    d = o.call(t, a[s], s, a) + "", (c = l.get(d)) ? (r[s] = c, c.__data__ = a[s], l.delete(d)) : n[s] = new ie(t, a[s]);
  for (s = 0; s < u; ++s)
    (c = e[s]) && l.get(f[s]) === c && (i[s] = c);
}
function ia(t) {
  return t.__data__;
}
function aa(t, e) {
  if (!arguments.length)
    return Array.from(this, ia);
  var n = e ? ra : na, r = this._parents, i = this._groups;
  typeof t != "function" && (t = ea(t));
  for (var a = i.length, o = new Array(a), s = new Array(a), c = new Array(a), l = 0; l < a; ++l) {
    var u = r[l], p = i[l], f = p.length, d = oa(t.call(u, u && u.__data__, l, r)), m = d.length, w = s[l] = new Array(m), E = o[l] = new Array(m), N = c[l] = new Array(f);
    n(u, p, w, E, N, d, e);
    for (var U = 0, P = 0, v, _; U < m; ++U)
      if (v = w[U]) {
        for (U >= P && (P = U + 1); !(_ = E[P]) && ++P < m; )
          ;
        v._next = _ || null;
      }
  }
  return o = new z(o, r), o._enter = s, o._exit = c, o;
}
function oa(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function sa() {
  return new z(this._exit || this._groups.map(pr), this._parents);
}
function ca(t, e, n) {
  var r = this.enter(), i = this, a = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
function la(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, a = r.length, o = Math.min(i, a), s = new Array(i), c = 0; c < o; ++c)
    for (var l = n[c], u = r[c], p = l.length, f = s[c] = new Array(p), d, m = 0; m < p; ++m)
      (d = l[m] || u[m]) && (f[m] = d);
  for (; c < i; ++c)
    s[c] = n[c];
  return new z(s, this._parents);
}
function ua() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, a = r[i], o; --i >= 0; )
      (o = r[i]) && (a && o.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(o, a), a = o);
  return this;
}
function fa(t) {
  t || (t = da);
  function e(p, f) {
    return p && f ? t(p.__data__, f.__data__) : !p - !f;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), a = 0; a < r; ++a) {
    for (var o = n[a], s = o.length, c = i[a] = new Array(s), l, u = 0; u < s; ++u)
      (l = o[u]) && (c[u] = l);
    c.sort(e);
  }
  return new z(i, this._parents).order();
}
function da(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function ha() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function pa() {
  return Array.from(this);
}
function ga() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, a = r.length; i < a; ++i) {
      var o = r[i];
      if (o)
        return o;
    }
  return null;
}
function ma() {
  let t = 0;
  for (const e of this)
    ++t;
  return t;
}
function va() {
  return !this.node();
}
function ya(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], a = 0, o = i.length, s; a < o; ++a)
      (s = i[a]) && t.call(s, s.__data__, a, i);
  return this;
}
function Sa(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function wa(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function xa(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function ba(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Aa(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function _a(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Ca(t, e) {
  var n = me(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? wa : Sa : typeof e == "function" ? n.local ? _a : Aa : n.local ? ba : xa)(n, e));
}
function gr(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Ta(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Ma(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Ea(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function Ha(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Ta : typeof e == "function" ? Ea : Ma)(t, e, n ?? "")) : bt(this.node(), t);
}
function bt(t, e) {
  return t.style.getPropertyValue(e) || gr(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Pa(t) {
  return function() {
    delete this[t];
  };
}
function Da(t, e) {
  return function() {
    this[t] = e;
  };
}
function Fa(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function ka(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Pa : typeof e == "function" ? Fa : Da)(t, e)) : this.node()[t];
}
function mr(t) {
  return t.trim().split(/^|\s+/);
}
function Qe(t) {
  return t.classList || new vr(t);
}
function vr(t) {
  this._node = t, this._names = mr(t.getAttribute("class") || "");
}
vr.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function yr(t, e) {
  for (var n = Qe(t), r = -1, i = e.length; ++r < i; )
    n.add(e[r]);
}
function Sr(t, e) {
  for (var n = Qe(t), r = -1, i = e.length; ++r < i; )
    n.remove(e[r]);
}
function Ia(t) {
  return function() {
    yr(this, t);
  };
}
function Na(t) {
  return function() {
    Sr(this, t);
  };
}
function Ua(t, e) {
  return function() {
    (e.apply(this, arguments) ? yr : Sr)(this, t);
  };
}
function $a(t, e) {
  var n = mr(t + "");
  if (arguments.length < 2) {
    for (var r = Qe(this.node()), i = -1, a = n.length; ++i < a; )
      if (!r.contains(n[i]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Ua : e ? Ia : Na)(n, e));
}
function za() {
  this.textContent = "";
}
function Ya(t) {
  return function() {
    this.textContent = t;
  };
}
function Oa(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Ra(t) {
  return arguments.length ? this.each(t == null ? za : (typeof t == "function" ? Oa : Ya)(t)) : this.node().textContent;
}
function Va() {
  this.innerHTML = "";
}
function La(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Xa(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Ga(t) {
  return arguments.length ? this.each(t == null ? Va : (typeof t == "function" ? Xa : La)(t)) : this.node().innerHTML;
}
function qa() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Ba() {
  return this.each(qa);
}
function Wa() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Za() {
  return this.each(Wa);
}
function ja(t) {
  var e = typeof t == "function" ? t : lr(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Ja() {
  return null;
}
function Qa(t, e) {
  var n = typeof t == "function" ? t : lr(t), r = e == null ? Ja : typeof e == "function" ? e : Je(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Ka() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function to() {
  return this.each(Ka);
}
function eo() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function no() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function ro(t) {
  return this.select(t ? no : eo);
}
function io(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function ao(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function oo(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function so(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, a; n < i; ++n)
        a = e[n], (!t.type || a.type === t.type) && a.name === t.name ? this.removeEventListener(a.type, a.listener, a.options) : e[++r] = a;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function co(t, e, n) {
  return function() {
    var r = this.__on, i, a = ao(e);
    if (r) {
      for (var o = 0, s = r.length; o < s; ++o)
        if ((i = r[o]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = a, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, a, n), i = { type: t.type, name: t.name, value: e, listener: a, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function lo(t, e, n) {
  var r = oo(t + ""), i, a = r.length, o;
  if (arguments.length < 2) {
    var s = this.node().__on;
    if (s) {
      for (var c = 0, l = s.length, u; c < l; ++c)
        for (i = 0, u = s[c]; i < a; ++i)
          if ((o = r[i]).type === u.type && o.name === u.name)
            return u.value;
    }
    return;
  }
  for (s = e ? co : so, i = 0; i < a; ++i)
    this.each(s(r[i], e, n));
  return this;
}
function wr(t, e, n) {
  var r = gr(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function uo(t, e) {
  return function() {
    return wr(this, t, e);
  };
}
function fo(t, e) {
  return function() {
    return wr(this, t, e.apply(this, arguments));
  };
}
function ho(t, e) {
  return this.each((typeof e == "function" ? fo : uo)(t, e));
}
function* po() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, a = r.length, o; i < a; ++i)
      (o = r[i]) && (yield o);
}
var Ke = [null];
function z(t, e) {
  this._groups = t, this._parents = e;
}
function Yt() {
  return new z([[document.documentElement]], Ke);
}
function go() {
  return this;
}
z.prototype = Yt.prototype = {
  constructor: z,
  select: Ri,
  selectAll: Xi,
  selectChild: Wi,
  selectChildren: Qi,
  filter: Ki,
  data: aa,
  enter: ta,
  exit: sa,
  join: ca,
  merge: la,
  selection: go,
  order: ua,
  sort: fa,
  call: ha,
  nodes: pa,
  node: ga,
  size: ma,
  empty: va,
  each: ya,
  attr: Ca,
  style: Ha,
  property: ka,
  classed: $a,
  text: Ra,
  html: Ga,
  raise: Ba,
  lower: Za,
  append: ja,
  insert: Qa,
  remove: to,
  clone: ro,
  datum: io,
  on: lo,
  dispatch: ho,
  [Symbol.iterator]: po
};
function C(t) {
  return typeof t == "string" ? new z([[document.querySelector(t)]], [document.documentElement]) : new z([[t]], Ke);
}
function mo(t) {
  let e;
  for (; e = t.sourceEvent; )
    t = e;
  return t;
}
function Mn(t, e) {
  if (t = mo(t), e === void 0 && (e = t.currentTarget), e) {
    var n = e.ownerSVGElement || e;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return r.x = t.clientX, r.y = t.clientY, r = r.matrixTransform(e.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (e.getBoundingClientRect) {
      var i = e.getBoundingClientRect();
      return [t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
function ot(t) {
  return typeof t == "string" ? new z([document.querySelectorAll(t)], [document.documentElement]) : new z([ur(t)], Ke);
}
const vo = { passive: !1 }, Nt = { capture: !0, passive: !1 };
function Te(t) {
  t.stopImmediatePropagation();
}
function wt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function yo(t) {
  var e = t.document.documentElement, n = C(t).on("dragstart.drag", wt, Nt);
  "onselectstart" in e ? n.on("selectstart.drag", wt, Nt) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function So(t, e) {
  var n = t.document.documentElement, r = C(t).on("dragstart.drag", null);
  e && (r.on("click.drag", wt, Nt), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const qt = (t) => () => t;
function Oe(t, {
  sourceEvent: e,
  subject: n,
  target: r,
  identifier: i,
  active: a,
  x: o,
  y: s,
  dx: c,
  dy: l,
  dispatch: u
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: i, enumerable: !0, configurable: !0 },
    active: { value: a, enumerable: !0, configurable: !0 },
    x: { value: o, enumerable: !0, configurable: !0 },
    y: { value: s, enumerable: !0, configurable: !0 },
    dx: { value: c, enumerable: !0, configurable: !0 },
    dy: { value: l, enumerable: !0, configurable: !0 },
    _: { value: u }
  });
}
Oe.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function wo(t) {
  return !t.ctrlKey && !t.button;
}
function xo() {
  return this.parentNode;
}
function bo(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function Ao() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function En() {
  var t = wo, e = xo, n = bo, r = Ao, i = {}, a = je("start", "drag", "end"), o = 0, s, c, l, u, p = 0;
  function f(v) {
    v.on("mousedown.drag", d).filter(r).on("touchstart.drag", E).on("touchmove.drag", N, vo).on("touchend.drag touchcancel.drag", U).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function d(v, _) {
    if (!(u || !t.call(this, v, _))) {
      var y = P(this, e.call(this, v, _), v, _, "mouse");
      y && (C(v.view).on("mousemove.drag", m, Nt).on("mouseup.drag", w, Nt), yo(v.view), Te(v), l = !1, s = v.clientX, c = v.clientY, y("start", v));
    }
  }
  function m(v) {
    if (wt(v), !l) {
      var _ = v.clientX - s, y = v.clientY - c;
      l = _ * _ + y * y > p;
    }
    i.mouse("drag", v);
  }
  function w(v) {
    C(v.view).on("mousemove.drag mouseup.drag", null), So(v.view, l), wt(v), i.mouse("end", v);
  }
  function E(v, _) {
    if (t.call(this, v, _)) {
      var y = v.changedTouches, b = e.call(this, v, _), D = y.length, $, Y;
      for ($ = 0; $ < D; ++$)
        (Y = P(this, b, v, _, y[$].identifier, y[$])) && (Te(v), Y("start", v, y[$]));
    }
  }
  function N(v) {
    var _ = v.changedTouches, y = _.length, b, D;
    for (b = 0; b < y; ++b)
      (D = i[_[b].identifier]) && (wt(v), D("drag", v, _[b]));
  }
  function U(v) {
    var _ = v.changedTouches, y = _.length, b, D;
    for (u && clearTimeout(u), u = setTimeout(function() {
      u = null;
    }, 500), b = 0; b < y; ++b)
      (D = i[_[b].identifier]) && (Te(v), D("end", v, _[b]));
  }
  function P(v, _, y, b, D, $) {
    var Y = a.copy(), k = Mn($ || y, _), V, Q, gt;
    if ((gt = n.call(v, new Oe("beforestart", {
      sourceEvent: y,
      target: f,
      identifier: D,
      active: o,
      x: k[0],
      y: k[1],
      dx: 0,
      dy: 0,
      dispatch: Y
    }), b)) != null)
      return V = gt.x - k[0] || 0, Q = gt.y - k[1] || 0, function xe(Tt, Vt, be) {
        var Lt = k, Mt;
        switch (Tt) {
          case "start":
            i[D] = xe, Mt = o++;
            break;
          case "end":
            delete i[D], --o;
          case "drag":
            k = Mn(be || Vt, _), Mt = o;
            break;
        }
        Y.call(
          Tt,
          v,
          new Oe(Tt, {
            sourceEvent: Vt,
            subject: gt,
            target: f,
            identifier: D,
            active: Mt,
            x: k[0] + V,
            y: k[1] + Q,
            dx: k[0] - Lt[0],
            dy: k[1] - Lt[1],
            dispatch: Y
          }),
          b
        );
      };
  }
  return f.filter = function(v) {
    return arguments.length ? (t = typeof v == "function" ? v : qt(!!v), f) : t;
  }, f.container = function(v) {
    return arguments.length ? (e = typeof v == "function" ? v : qt(v), f) : e;
  }, f.subject = function(v) {
    return arguments.length ? (n = typeof v == "function" ? v : qt(v), f) : n;
  }, f.touchable = function(v) {
    return arguments.length ? (r = typeof v == "function" ? v : qt(!!v), f) : r;
  }, f.on = function() {
    var v = a.on.apply(a, arguments);
    return v === a ? f : v;
  }, f.clickDistance = function(v) {
    return arguments.length ? (p = (v = +v) * v, f) : Math.sqrt(p);
  }, f;
}
function tn(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function xr(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e)
    n[r] = e[r];
  return n;
}
function Ot() {
}
var Ut = 0.7, ae = 1 / Ut, xt = "\\s*([+-]?\\d+)\\s*", $t = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", j = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", _o = /^#([0-9a-f]{3,8})$/, Co = new RegExp(`^rgb\\(${xt},${xt},${xt}\\)$`), To = new RegExp(`^rgb\\(${j},${j},${j}\\)$`), Mo = new RegExp(`^rgba\\(${xt},${xt},${xt},${$t}\\)$`), Eo = new RegExp(`^rgba\\(${j},${j},${j},${$t}\\)$`), Ho = new RegExp(`^hsl\\(${$t},${j},${j}\\)$`), Po = new RegExp(`^hsla\\(${$t},${j},${j},${$t}\\)$`), Hn = {
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
tn(Ot, ft, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Pn,
  formatHex: Pn,
  formatHex8: Do,
  formatHsl: Fo,
  formatRgb: Dn,
  toString: Dn
});
function Pn() {
  return this.rgb().formatHex();
}
function Do() {
  return this.rgb().formatHex8();
}
function Fo() {
  return br(this).formatHsl();
}
function Dn() {
  return this.rgb().formatRgb();
}
function ft(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = _o.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Fn(e) : n === 3 ? new R(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Bt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Bt(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Co.exec(t)) ? new R(e[1], e[2], e[3], 1) : (e = To.exec(t)) ? new R(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Mo.exec(t)) ? Bt(e[1], e[2], e[3], e[4]) : (e = Eo.exec(t)) ? Bt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Ho.exec(t)) ? Nn(e[1], e[2] / 100, e[3] / 100, 1) : (e = Po.exec(t)) ? Nn(e[1], e[2] / 100, e[3] / 100, e[4]) : Hn.hasOwnProperty(t) ? Fn(Hn[t]) : t === "transparent" ? new R(NaN, NaN, NaN, 0) : null;
}
function Fn(t) {
  return new R(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Bt(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new R(t, e, n, r);
}
function ko(t) {
  return t instanceof Ot || (t = ft(t)), t ? (t = t.rgb(), new R(t.r, t.g, t.b, t.opacity)) : new R();
}
function Re(t, e, n, r) {
  return arguments.length === 1 ? ko(t) : new R(t, e, n, r ?? 1);
}
function R(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
tn(R, Re, xr(Ot, {
  brighter(t) {
    return t = t == null ? ae : Math.pow(ae, t), new R(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ut : Math.pow(Ut, t), new R(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new R(ut(this.r), ut(this.g), ut(this.b), oe(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: kn,
  formatHex: kn,
  formatHex8: Io,
  formatRgb: In,
  toString: In
}));
function kn() {
  return `#${lt(this.r)}${lt(this.g)}${lt(this.b)}`;
}
function Io() {
  return `#${lt(this.r)}${lt(this.g)}${lt(this.b)}${lt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function In() {
  const t = oe(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${ut(this.r)}, ${ut(this.g)}, ${ut(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function oe(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function ut(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function lt(t) {
  return t = ut(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Nn(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new B(t, e, n, r);
}
function br(t) {
  if (t instanceof B)
    return new B(t.h, t.s, t.l, t.opacity);
  if (t instanceof Ot || (t = ft(t)), !t)
    return new B();
  if (t instanceof B)
    return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), a = Math.max(e, n, r), o = NaN, s = a - i, c = (a + i) / 2;
  return s ? (e === a ? o = (n - r) / s + (n < r) * 6 : n === a ? o = (r - e) / s + 2 : o = (e - n) / s + 4, s /= c < 0.5 ? a + i : 2 - a - i, o *= 60) : s = c > 0 && c < 1 ? 0 : o, new B(o, s, c, t.opacity);
}
function No(t, e, n, r) {
  return arguments.length === 1 ? br(t) : new B(t, e, n, r ?? 1);
}
function B(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
tn(B, No, xr(Ot, {
  brighter(t) {
    return t = t == null ? ae : Math.pow(ae, t), new B(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ut : Math.pow(Ut, t), new B(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new R(
      Me(t >= 240 ? t - 240 : t + 120, i, r),
      Me(t, i, r),
      Me(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new B(Un(this.h), Wt(this.s), Wt(this.l), oe(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = oe(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Un(this.h)}, ${Wt(this.s) * 100}%, ${Wt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Un(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Wt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Me(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const en = (t) => () => t;
function Uo(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function $o(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function zo(t) {
  return (t = +t) == 1 ? Ar : function(e, n) {
    return n - e ? $o(e, n, t) : en(isNaN(e) ? n : e);
  };
}
function Ar(t, e) {
  var n = e - t;
  return n ? Uo(t, n) : en(isNaN(t) ? e : t);
}
const se = function t(e) {
  var n = zo(e);
  function r(i, a) {
    var o = n((i = Re(i)).r, (a = Re(a)).r), s = n(i.g, a.g), c = n(i.b, a.b), l = Ar(i.opacity, a.opacity);
    return function(u) {
      return i.r = o(u), i.g = s(u), i.b = c(u), i.opacity = l(u), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function Yo(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(a) {
    for (i = 0; i < n; ++i)
      r[i] = t[i] * (1 - a) + e[i] * a;
    return r;
  };
}
function Oo(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Ro(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), a = new Array(n), o;
  for (o = 0; o < r; ++o)
    i[o] = nn(t[o], e[o]);
  for (; o < n; ++o)
    a[o] = e[o];
  return function(s) {
    for (o = 0; o < r; ++o)
      a[o] = i[o](s);
    return a;
  };
}
function Vo(t, e) {
  var n = new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function q(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function Lo(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = nn(t[i], e[i]) : r[i] = e[i];
  return function(a) {
    for (i in n)
      r[i] = n[i](a);
    return r;
  };
}
var Ve = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ee = new RegExp(Ve.source, "g");
function Xo(t) {
  return function() {
    return t;
  };
}
function Go(t) {
  return function(e) {
    return t(e) + "";
  };
}
function _r(t, e) {
  var n = Ve.lastIndex = Ee.lastIndex = 0, r, i, a, o = -1, s = [], c = [];
  for (t = t + "", e = e + ""; (r = Ve.exec(t)) && (i = Ee.exec(e)); )
    (a = i.index) > n && (a = e.slice(n, a), s[o] ? s[o] += a : s[++o] = a), (r = r[0]) === (i = i[0]) ? s[o] ? s[o] += i : s[++o] = i : (s[++o] = null, c.push({ i: o, x: q(r, i) })), n = Ee.lastIndex;
  return n < e.length && (a = e.slice(n), s[o] ? s[o] += a : s[++o] = a), s.length < 2 ? c[0] ? Go(c[0].x) : Xo(e) : (e = c.length, function(l) {
    for (var u = 0, p; u < e; ++u)
      s[(p = c[u]).i] = p.x(l);
    return s.join("");
  });
}
function nn(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? en(e) : (n === "number" ? q : n === "string" ? (r = ft(e)) ? (e = r, se) : _r : e instanceof ft ? se : e instanceof Date ? Vo : Oo(e) ? Yo : Array.isArray(e) ? Ro : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Lo : q)(t, e);
}
function qo(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var $n = 180 / Math.PI, Le = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Cr(t, e, n, r, i, a) {
  var o, s, c;
  return (o = Math.sqrt(t * t + e * e)) && (t /= o, e /= o), (c = t * n + e * r) && (n -= t * c, r -= e * c), (s = Math.sqrt(n * n + r * r)) && (n /= s, r /= s, c /= s), t * r < e * n && (t = -t, e = -e, c = -c, o = -o), {
    translateX: i,
    translateY: a,
    rotate: Math.atan2(e, t) * $n,
    skewX: Math.atan(c) * $n,
    scaleX: o,
    scaleY: s
  };
}
var Zt;
function Bo(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Le : Cr(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Wo(t) {
  return t == null || (Zt || (Zt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Zt.setAttribute("transform", t), !(t = Zt.transform.baseVal.consolidate())) ? Le : (t = t.matrix, Cr(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Tr(t, e, n, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function a(l, u, p, f, d, m) {
    if (l !== p || u !== f) {
      var w = d.push("translate(", null, e, null, n);
      m.push({ i: w - 4, x: q(l, p) }, { i: w - 2, x: q(u, f) });
    } else
      (p || f) && d.push("translate(" + p + e + f + n);
  }
  function o(l, u, p, f) {
    l !== u ? (l - u > 180 ? u += 360 : u - l > 180 && (l += 360), f.push({ i: p.push(i(p) + "rotate(", null, r) - 2, x: q(l, u) })) : u && p.push(i(p) + "rotate(" + u + r);
  }
  function s(l, u, p, f) {
    l !== u ? f.push({ i: p.push(i(p) + "skewX(", null, r) - 2, x: q(l, u) }) : u && p.push(i(p) + "skewX(" + u + r);
  }
  function c(l, u, p, f, d, m) {
    if (l !== p || u !== f) {
      var w = d.push(i(d) + "scale(", null, ",", null, ")");
      m.push({ i: w - 4, x: q(l, p) }, { i: w - 2, x: q(u, f) });
    } else
      (p !== 1 || f !== 1) && d.push(i(d) + "scale(" + p + "," + f + ")");
  }
  return function(l, u) {
    var p = [], f = [];
    return l = t(l), u = t(u), a(l.translateX, l.translateY, u.translateX, u.translateY, p, f), o(l.rotate, u.rotate, p, f), s(l.skewX, u.skewX, p, f), c(l.scaleX, l.scaleY, u.scaleX, u.scaleY, p, f), l = u = null, function(d) {
      for (var m = -1, w = f.length, E; ++m < w; )
        p[(E = f[m]).i] = E.x(d);
      return p.join("");
    };
  };
}
var Zo = Tr(Bo, "px, ", "px)", "deg)"), jo = Tr(Wo, ", ", ")", ")"), At = 0, kt = 0, Et = 0, Mr = 1e3, ce, It, le = 0, dt = 0, ve = 0, zt = typeof performance == "object" && performance.now ? performance : Date, Er = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function rn() {
  return dt || (Er(Jo), dt = zt.now() + ve);
}
function Jo() {
  dt = 0;
}
function ue() {
  this._call = this._time = this._next = null;
}
ue.prototype = Hr.prototype = {
  constructor: ue,
  restart: function(t, e, n) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? rn() : +n) + (e == null ? 0 : +e), !this._next && It !== this && (It ? It._next = this : ce = this, It = this), this._call = t, this._time = n, Xe();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Xe());
  }
};
function Hr(t, e, n) {
  var r = new ue();
  return r.restart(t, e, n), r;
}
function Qo() {
  rn(), ++At;
  for (var t = ce, e; t; )
    (e = dt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --At;
}
function zn() {
  dt = (le = zt.now()) + ve, At = kt = 0;
  try {
    Qo();
  } finally {
    At = 0, ts(), dt = 0;
  }
}
function Ko() {
  var t = zt.now(), e = t - le;
  e > Mr && (ve -= e, le = t);
}
function ts() {
  for (var t, e = ce, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : ce = n);
  It = t, Xe(r);
}
function Xe(t) {
  if (!At) {
    kt && (kt = clearTimeout(kt));
    var e = t - dt;
    e > 24 ? (t < 1 / 0 && (kt = setTimeout(zn, t - zt.now() - ve)), Et && (Et = clearInterval(Et))) : (Et || (le = zt.now(), Et = setInterval(Ko, Mr)), At = 1, Er(zn));
  }
}
function Yn(t, e, n) {
  var r = new ue();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var es = je("start", "end", "cancel", "interrupt"), ns = [], Pr = 0, On = 1, Ge = 2, te = 3, Rn = 4, qe = 5, ee = 6;
function ye(t, e, n, r, i, a) {
  var o = t.__transition;
  if (!o)
    t.__transition = {};
  else if (n in o)
    return;
  rs(t, n, {
    name: e,
    index: r,
    group: i,
    on: es,
    tween: ns,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: Pr
  });
}
function an(t, e) {
  var n = W(t, e);
  if (n.state > Pr)
    throw new Error("too late; already scheduled");
  return n;
}
function J(t, e) {
  var n = W(t, e);
  if (n.state > te)
    throw new Error("too late; already running");
  return n;
}
function W(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e]))
    throw new Error("transition not found");
  return n;
}
function rs(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = Hr(a, 0, n.time);
  function a(l) {
    n.state = On, n.timer.restart(o, n.delay, n.time), n.delay <= l && o(l - n.delay);
  }
  function o(l) {
    var u, p, f, d;
    if (n.state !== On)
      return c();
    for (u in r)
      if (d = r[u], d.name === n.name) {
        if (d.state === te)
          return Yn(o);
        d.state === Rn ? (d.state = ee, d.timer.stop(), d.on.call("interrupt", t, t.__data__, d.index, d.group), delete r[u]) : +u < e && (d.state = ee, d.timer.stop(), d.on.call("cancel", t, t.__data__, d.index, d.group), delete r[u]);
      }
    if (Yn(function() {
      n.state === te && (n.state = Rn, n.timer.restart(s, n.delay, n.time), s(l));
    }), n.state = Ge, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Ge) {
      for (n.state = te, i = new Array(f = n.tween.length), u = 0, p = -1; u < f; ++u)
        (d = n.tween[u].value.call(t, t.__data__, n.index, n.group)) && (i[++p] = d);
      i.length = p + 1;
    }
  }
  function s(l) {
    for (var u = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(c), n.state = qe, 1), p = -1, f = i.length; ++p < f; )
      i[p].call(t, u);
    n.state === qe && (n.on.call("end", t, t.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = ee, n.timer.stop(), delete r[e];
    for (var l in r)
      return;
    delete t.__transition;
  }
}
function is(t, e) {
  var n = t.__transition, r, i, a = !0, o;
  if (n) {
    e = e == null ? null : e + "";
    for (o in n) {
      if ((r = n[o]).name !== e) {
        a = !1;
        continue;
      }
      i = r.state > Ge && r.state < qe, r.state = ee, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[o];
    }
    a && delete t.__transition;
  }
}
function as(t) {
  return this.each(function() {
    is(this, t);
  });
}
function os(t, e) {
  var n, r;
  return function() {
    var i = J(this, t), a = i.tween;
    if (a !== n) {
      r = n = a;
      for (var o = 0, s = r.length; o < s; ++o)
        if (r[o].name === e) {
          r = r.slice(), r.splice(o, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function ss(t, e, n) {
  var r, i;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var a = J(this, t), o = a.tween;
    if (o !== r) {
      i = (r = o).slice();
      for (var s = { name: e, value: n }, c = 0, l = i.length; c < l; ++c)
        if (i[c].name === e) {
          i[c] = s;
          break;
        }
      c === l && i.push(s);
    }
    a.tween = i;
  };
}
function cs(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = W(this.node(), n).tween, i = 0, a = r.length, o; i < a; ++i)
      if ((o = r[i]).name === t)
        return o.value;
    return null;
  }
  return this.each((e == null ? os : ss)(n, t, e));
}
function on(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = J(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return W(i, r).value[e];
  };
}
function Dr(t, e) {
  var n;
  return (typeof e == "number" ? q : e instanceof ft ? se : (n = ft(e)) ? (e = n, se) : _r)(t, e);
}
function ls(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function us(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function fs(t, e, n) {
  var r, i = n + "", a;
  return function() {
    var o = this.getAttribute(t);
    return o === i ? null : o === r ? a : a = e(r = o, n);
  };
}
function ds(t, e, n) {
  var r, i = n + "", a;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === i ? null : o === r ? a : a = e(r = o, n);
  };
}
function hs(t, e, n) {
  var r, i, a;
  return function() {
    var o, s = n(this), c;
    return s == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), c = s + "", o === c ? null : o === r && c === i ? a : (i = c, a = e(r = o, s)));
  };
}
function ps(t, e, n) {
  var r, i, a;
  return function() {
    var o, s = n(this), c;
    return s == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), c = s + "", o === c ? null : o === r && c === i ? a : (i = c, a = e(r = o, s)));
  };
}
function gs(t, e) {
  var n = me(t), r = n === "transform" ? jo : Dr;
  return this.attrTween(t, typeof e == "function" ? (n.local ? ps : hs)(n, r, on(this, "attr." + t, e)) : e == null ? (n.local ? us : ls)(n) : (n.local ? ds : fs)(n, r, e));
}
function ms(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function vs(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function ys(t, e) {
  var n, r;
  function i() {
    var a = e.apply(this, arguments);
    return a !== r && (n = (r = a) && vs(t, a)), n;
  }
  return i._value = e, i;
}
function Ss(t, e) {
  var n, r;
  function i() {
    var a = e.apply(this, arguments);
    return a !== r && (n = (r = a) && ms(t, a)), n;
  }
  return i._value = e, i;
}
function ws(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (e == null)
    return this.tween(n, null);
  if (typeof e != "function")
    throw new Error();
  var r = me(t);
  return this.tween(n, (r.local ? ys : Ss)(r, e));
}
function xs(t, e) {
  return function() {
    an(this, t).delay = +e.apply(this, arguments);
  };
}
function bs(t, e) {
  return e = +e, function() {
    an(this, t).delay = e;
  };
}
function As(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? xs : bs)(e, t)) : W(this.node(), e).delay;
}
function _s(t, e) {
  return function() {
    J(this, t).duration = +e.apply(this, arguments);
  };
}
function Cs(t, e) {
  return e = +e, function() {
    J(this, t).duration = e;
  };
}
function Ts(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? _s : Cs)(e, t)) : W(this.node(), e).duration;
}
function Ms(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    J(this, t).ease = e;
  };
}
function Es(t) {
  var e = this._id;
  return arguments.length ? this.each(Ms(e, t)) : W(this.node(), e).ease;
}
function Hs(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    J(this, t).ease = n;
  };
}
function Ps(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(Hs(this._id, t));
}
function Ds(t) {
  typeof t != "function" && (t = dr(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], o = a.length, s = r[i] = [], c, l = 0; l < o; ++l)
      (c = a[l]) && t.call(c, c.__data__, l, a) && s.push(c);
  return new rt(r, this._parents, this._name, this._id);
}
function Fs(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, a = Math.min(r, i), o = new Array(r), s = 0; s < a; ++s)
    for (var c = e[s], l = n[s], u = c.length, p = o[s] = new Array(u), f, d = 0; d < u; ++d)
      (f = c[d] || l[d]) && (p[d] = f);
  for (; s < r; ++s)
    o[s] = e[s];
  return new rt(o, this._parents, this._name, this._id);
}
function ks(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function Is(t, e, n) {
  var r, i, a = ks(e) ? an : J;
  return function() {
    var o = a(this, t), s = o.on;
    s !== r && (i = (r = s).copy()).on(e, n), o.on = i;
  };
}
function Ns(t, e) {
  var n = this._id;
  return arguments.length < 2 ? W(this.node(), n).on.on(t) : this.each(Is(n, t, e));
}
function Us(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition)
      if (+n !== t)
        return;
    e && e.removeChild(this);
  };
}
function $s() {
  return this.on("end.remove", Us(this._id));
}
function zs(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Je(t));
  for (var r = this._groups, i = r.length, a = new Array(i), o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, l = a[o] = new Array(c), u, p, f = 0; f < c; ++f)
      (u = s[f]) && (p = t.call(u, u.__data__, f, s)) && ("__data__" in u && (p.__data__ = u.__data__), l[f] = p, ye(l[f], e, n, f, l, W(u, n)));
  return new rt(a, this._parents, e, n);
}
function Ys(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = fr(t));
  for (var r = this._groups, i = r.length, a = [], o = [], s = 0; s < i; ++s)
    for (var c = r[s], l = c.length, u, p = 0; p < l; ++p)
      if (u = c[p]) {
        for (var f = t.call(u, u.__data__, p, c), d, m = W(u, n), w = 0, E = f.length; w < E; ++w)
          (d = f[w]) && ye(d, e, n, w, f, m);
        a.push(f), o.push(u);
      }
  return new rt(a, o, e, n);
}
var Os = Yt.prototype.constructor;
function Rs() {
  return new Os(this._groups, this._parents);
}
function Vs(t, e) {
  var n, r, i;
  return function() {
    var a = bt(this, t), o = (this.style.removeProperty(t), bt(this, t));
    return a === o ? null : a === n && o === r ? i : i = e(n = a, r = o);
  };
}
function Fr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Ls(t, e, n) {
  var r, i = n + "", a;
  return function() {
    var o = bt(this, t);
    return o === i ? null : o === r ? a : a = e(r = o, n);
  };
}
function Xs(t, e, n) {
  var r, i, a;
  return function() {
    var o = bt(this, t), s = n(this), c = s + "";
    return s == null && (c = s = (this.style.removeProperty(t), bt(this, t))), o === c ? null : o === r && c === i ? a : (i = c, a = e(r = o, s));
  };
}
function Gs(t, e) {
  var n, r, i, a = "style." + e, o = "end." + a, s;
  return function() {
    var c = J(this, t), l = c.on, u = c.value[a] == null ? s || (s = Fr(e)) : void 0;
    (l !== n || i !== u) && (r = (n = l).copy()).on(o, i = u), c.on = r;
  };
}
function qs(t, e, n) {
  var r = (t += "") == "transform" ? Zo : Dr;
  return e == null ? this.styleTween(t, Vs(t, r)).on("end.style." + t, Fr(t)) : typeof e == "function" ? this.styleTween(t, Xs(t, r, on(this, "style." + t, e))).each(Gs(this._id, t)) : this.styleTween(t, Ls(t, r, e), n).on("end.style." + t, null);
}
function Bs(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Ws(t, e, n) {
  var r, i;
  function a() {
    var o = e.apply(this, arguments);
    return o !== i && (r = (i = o) && Bs(t, o, n)), r;
  }
  return a._value = e, a;
}
function Zs(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, Ws(t, e, n ?? ""));
}
function js(t) {
  return function() {
    this.textContent = t;
  };
}
function Js(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Qs(t) {
  return this.tween("text", typeof t == "function" ? Js(on(this, "text", t)) : js(t == null ? "" : t + ""));
}
function Ks(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function tc(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Ks(i)), e;
  }
  return r._value = t, r;
}
function ec(t) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(e, tc(t));
}
function nc() {
  for (var t = this._name, e = this._id, n = kr(), r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var o = r[a], s = o.length, c, l = 0; l < s; ++l)
      if (c = o[l]) {
        var u = W(c, e);
        ye(c, t, n, l, o, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new rt(r, this._parents, t, n);
}
function rc() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(a, o) {
    var s = { value: o }, c = { value: function() {
      --i === 0 && a();
    } };
    n.each(function() {
      var l = J(this, r), u = l.on;
      u !== t && (e = (t = u).copy(), e._.cancel.push(s), e._.interrupt.push(s), e._.end.push(c)), l.on = e;
    }), i === 0 && a();
  });
}
var ic = 0;
function rt(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function kr() {
  return ++ic;
}
var K = Yt.prototype;
rt.prototype = {
  constructor: rt,
  select: zs,
  selectAll: Ys,
  selectChild: K.selectChild,
  selectChildren: K.selectChildren,
  filter: Ds,
  merge: Fs,
  selection: Rs,
  transition: nc,
  call: K.call,
  nodes: K.nodes,
  node: K.node,
  size: K.size,
  empty: K.empty,
  each: K.each,
  on: Ns,
  attr: gs,
  attrTween: ws,
  style: qs,
  styleTween: Zs,
  text: Qs,
  textTween: ec,
  remove: $s,
  tween: cs,
  delay: As,
  duration: Ts,
  ease: Es,
  easeVarying: Ps,
  end: rc,
  [Symbol.iterator]: K[Symbol.iterator]
};
function ac(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var oc = {
  time: null,
  delay: 0,
  duration: 250,
  ease: ac
};
function sc(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function cc(t) {
  var e, n;
  t instanceof rt ? (e = t._id, t = t._name) : (e = kr(), (n = oc).time = rn(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var o = r[a], s = o.length, c, l = 0; l < s; ++l)
      (c = o[l]) && ye(c, t, e, l, o, n || sc(c, e));
  return new rt(r, this._parents, t, e);
}
Yt.prototype.interrupt = as;
Yt.prototype.transition = cc;
function sn(t, e) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(t);
      break;
    default:
      this.range(e).domain(t);
      break;
  }
  return this;
}
const Vn = Symbol("implicit");
function Ir() {
  var t = new wn(), e = [], n = [], r = Vn;
  function i(a) {
    let o = t.get(a);
    if (o === void 0) {
      if (r !== Vn)
        return r;
      t.set(a, o = e.push(a) - 1);
    }
    return n[o % n.length];
  }
  return i.domain = function(a) {
    if (!arguments.length)
      return e.slice();
    e = [], t = new wn();
    for (const o of a)
      t.has(o) || t.set(o, e.push(o) - 1);
    return i;
  }, i.range = function(a) {
    return arguments.length ? (n = Array.from(a), i) : n.slice();
  }, i.unknown = function(a) {
    return arguments.length ? (r = a, i) : r;
  }, i.copy = function() {
    return Ir(e, n).unknown(r);
  }, sn.apply(i, arguments), i;
}
function Nr() {
  var t = Ir().unknown(void 0), e = t.domain, n = t.range, r = 0, i = 1, a, o, s = !1, c = 0, l = 0, u = 0.5;
  delete t.unknown;
  function p() {
    var f = e().length, d = i < r, m = d ? i : r, w = d ? r : i;
    a = (w - m) / Math.max(1, f - c + l * 2), s && (a = Math.floor(a)), m += (w - m - a * (f - c)) * u, o = a * (1 - c), s && (m = Math.round(m), o = Math.round(o));
    var E = Ti(f).map(function(N) {
      return m + a * N;
    });
    return n(d ? E.reverse() : E);
  }
  return t.domain = function(f) {
    return arguments.length ? (e(f), p()) : e();
  }, t.range = function(f) {
    return arguments.length ? ([r, i] = f, r = +r, i = +i, p()) : [r, i];
  }, t.rangeRound = function(f) {
    return [r, i] = f, r = +r, i = +i, s = !0, p();
  }, t.bandwidth = function() {
    return o;
  }, t.step = function() {
    return a;
  }, t.round = function(f) {
    return arguments.length ? (s = !!f, p()) : s;
  }, t.padding = function(f) {
    return arguments.length ? (c = Math.min(1, l = +f), p()) : c;
  }, t.paddingInner = function(f) {
    return arguments.length ? (c = Math.min(1, f), p()) : c;
  }, t.paddingOuter = function(f) {
    return arguments.length ? (l = +f, p()) : l;
  }, t.align = function(f) {
    return arguments.length ? (u = Math.max(0, Math.min(1, f)), p()) : u;
  }, t.copy = function() {
    return Nr(e(), [r, i]).round(s).paddingInner(c).paddingOuter(l).align(u);
  }, sn.apply(p(), arguments);
}
function lc(t) {
  return function() {
    return t;
  };
}
function uc(t) {
  return +t;
}
var Ln = [0, 1];
function vt(t) {
  return t;
}
function Be(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : lc(isNaN(e) ? NaN : 0.5);
}
function fc(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(r) {
    return Math.max(t, Math.min(e, r));
  };
}
function dc(t, e, n) {
  var r = t[0], i = t[1], a = e[0], o = e[1];
  return i < r ? (r = Be(i, r), a = n(o, a)) : (r = Be(r, i), a = n(a, o)), function(s) {
    return a(r(s));
  };
}
function hc(t, e, n) {
  var r = Math.min(t.length, e.length) - 1, i = new Array(r), a = new Array(r), o = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++o < r; )
    i[o] = Be(t[o], t[o + 1]), a[o] = n(e[o], e[o + 1]);
  return function(s) {
    var c = yi(t, s, 1, r) - 1;
    return a[c](i[c](s));
  };
}
function pc(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function gc() {
  var t = Ln, e = Ln, n = nn, r, i, a, o = vt, s, c, l;
  function u() {
    var f = Math.min(t.length, e.length);
    return o !== vt && (o = fc(t[0], t[f - 1])), s = f > 2 ? hc : dc, c = l = null, p;
  }
  function p(f) {
    return f == null || isNaN(f = +f) ? a : (c || (c = s(t.map(r), e, n)))(r(o(f)));
  }
  return p.invert = function(f) {
    return o(i((l || (l = s(e, t.map(r), q)))(f)));
  }, p.domain = function(f) {
    return arguments.length ? (t = Array.from(f, uc), u()) : t.slice();
  }, p.range = function(f) {
    return arguments.length ? (e = Array.from(f), u()) : e.slice();
  }, p.rangeRound = function(f) {
    return e = Array.from(f), n = qo, u();
  }, p.clamp = function(f) {
    return arguments.length ? (o = f ? !0 : vt, u()) : o !== vt;
  }, p.interpolate = function(f) {
    return arguments.length ? (n = f, u()) : n;
  }, p.unknown = function(f) {
    return arguments.length ? (a = f, p) : a;
  }, function(f, d) {
    return r = f, i = d, u();
  };
}
function mc() {
  return gc()(vt, vt);
}
function vc(t, e) {
  t = t.slice();
  var n = 0, r = t.length - 1, i = t[n], a = t[r], o;
  return a < i && (o = n, n = r, r = o, o = i, i = a, a = o), t[n] = e.floor(i), t[r] = e.ceil(a), t;
}
const He = new Date(), Pe = new Date();
function F(t, e, n, r) {
  function i(a) {
    return t(a = arguments.length === 0 ? new Date() : new Date(+a)), a;
  }
  return i.floor = (a) => (t(a = new Date(+a)), a), i.ceil = (a) => (t(a = new Date(a - 1)), e(a, 1), t(a), a), i.round = (a) => {
    const o = i(a), s = i.ceil(a);
    return a - o < s - a ? o : s;
  }, i.offset = (a, o) => (e(a = new Date(+a), o == null ? 1 : Math.floor(o)), a), i.range = (a, o, s) => {
    const c = [];
    if (a = i.ceil(a), s = s == null ? 1 : Math.floor(s), !(a < o) || !(s > 0))
      return c;
    let l;
    do
      c.push(l = new Date(+a)), e(a, s), t(a);
    while (l < a && a < o);
    return c;
  }, i.filter = (a) => F((o) => {
    if (o >= o)
      for (; t(o), !a(o); )
        o.setTime(o - 1);
  }, (o, s) => {
    if (o >= o)
      if (s < 0)
        for (; ++s <= 0; )
          for (; e(o, -1), !a(o); )
            ;
      else
        for (; --s >= 0; )
          for (; e(o, 1), !a(o); )
            ;
  }), n && (i.count = (a, o) => (He.setTime(+a), Pe.setTime(+o), t(He), t(Pe), Math.floor(n(He, Pe))), i.every = (a) => (a = Math.floor(a), !isFinite(a) || !(a > 0) ? null : a > 1 ? i.filter(r ? (o) => r(o) % a === 0 : (o) => i.count(0, o) % a === 0) : i)), i;
}
const fe = F(() => {
}, (t, e) => {
  t.setTime(+t + e);
}, (t, e) => e - t);
fe.every = (t) => (t = Math.floor(t), !isFinite(t) || !(t > 0) ? null : t > 1 ? F((e) => {
  e.setTime(Math.floor(e / t) * t);
}, (e, n) => {
  e.setTime(+e + n * t);
}, (e, n) => (n - e) / t) : fe);
fe.range;
const tt = 1e3, G = tt * 60, et = G * 60, it = et * 24, cn = it * 7, Xn = it * 30, De = it * 365, yt = F((t) => {
  t.setTime(t - t.getMilliseconds());
}, (t, e) => {
  t.setTime(+t + e * tt);
}, (t, e) => (e - t) / tt, (t) => t.getUTCSeconds());
yt.range;
const Se = F((t) => {
  t.setTime(t - t.getMilliseconds() - t.getSeconds() * tt);
}, (t, e) => {
  t.setTime(+t + e * G);
}, (t, e) => (e - t) / G, (t) => t.getMinutes());
Se.range;
const Ur = F((t) => {
  t.setUTCSeconds(0, 0);
}, (t, e) => {
  t.setTime(+t + e * G);
}, (t, e) => (e - t) / G, (t) => t.getUTCMinutes());
Ur.range;
const ln = F((t) => {
  t.setTime(t - t.getMilliseconds() - t.getSeconds() * tt - t.getMinutes() * G);
}, (t, e) => {
  t.setTime(+t + e * et);
}, (t, e) => (e - t) / et, (t) => t.getHours());
ln.range;
const $r = F((t) => {
  t.setUTCMinutes(0, 0, 0);
}, (t, e) => {
  t.setTime(+t + e * et);
}, (t, e) => (e - t) / et, (t) => t.getUTCHours());
$r.range;
const Rt = F(
  (t) => t.setHours(0, 0, 0, 0),
  (t, e) => t.setDate(t.getDate() + e),
  (t, e) => (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * G) / it,
  (t) => t.getDate() - 1
);
Rt.range;
const un = F((t) => {
  t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCDate(t.getUTCDate() + e);
}, (t, e) => (e - t) / it, (t) => t.getUTCDate() - 1);
un.range;
const zr = F((t) => {
  t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCDate(t.getUTCDate() + e);
}, (t, e) => (e - t) / it, (t) => Math.floor(t / it));
zr.range;
function ht(t) {
  return F((e) => {
    e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0);
  }, (e, n) => {
    e.setDate(e.getDate() + n * 7);
  }, (e, n) => (n - e - (n.getTimezoneOffset() - e.getTimezoneOffset()) * G) / cn);
}
const we = ht(0), de = ht(1), yc = ht(2), Sc = ht(3), _t = ht(4), wc = ht(5), xc = ht(6);
we.range;
de.range;
yc.range;
Sc.range;
_t.range;
wc.range;
xc.range;
function pt(t) {
  return F((e) => {
    e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0);
  }, (e, n) => {
    e.setUTCDate(e.getUTCDate() + n * 7);
  }, (e, n) => (n - e) / cn);
}
const fn = pt(0), he = pt(1), bc = pt(2), Ac = pt(3), Ct = pt(4), _c = pt(5), Cc = pt(6);
fn.range;
he.range;
bc.range;
Ac.range;
Ct.range;
_c.range;
Cc.range;
const dn = F((t) => {
  t.setDate(1), t.setHours(0, 0, 0, 0);
}, (t, e) => {
  t.setMonth(t.getMonth() + e);
}, (t, e) => e.getMonth() - t.getMonth() + (e.getFullYear() - t.getFullYear()) * 12, (t) => t.getMonth());
dn.range;
const Yr = F((t) => {
  t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCMonth(t.getUTCMonth() + e);
}, (t, e) => e.getUTCMonth() - t.getUTCMonth() + (e.getUTCFullYear() - t.getUTCFullYear()) * 12, (t) => t.getUTCMonth());
Yr.range;
const at = F((t) => {
  t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, e) => {
  t.setFullYear(t.getFullYear() + e);
}, (t, e) => e.getFullYear() - t.getFullYear(), (t) => t.getFullYear());
at.every = (t) => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : F((e) => {
  e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, n) => {
  e.setFullYear(e.getFullYear() + n * t);
});
at.range;
const st = F((t) => {
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCFullYear(t.getUTCFullYear() + e);
}, (t, e) => e.getUTCFullYear() - t.getUTCFullYear(), (t) => t.getUTCFullYear());
st.every = (t) => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : F((e) => {
  e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, n) => {
  e.setUTCFullYear(e.getUTCFullYear() + n * t);
});
st.range;
function Or(t, e, n, r, i, a) {
  const o = [
    [yt, 1, tt],
    [yt, 5, 5 * tt],
    [yt, 15, 15 * tt],
    [yt, 30, 30 * tt],
    [a, 1, G],
    [a, 5, 5 * G],
    [a, 15, 15 * G],
    [a, 30, 30 * G],
    [i, 1, et],
    [i, 3, 3 * et],
    [i, 6, 6 * et],
    [i, 12, 12 * et],
    [r, 1, it],
    [r, 2, 2 * it],
    [n, 1, cn],
    [e, 1, Xn],
    [e, 3, 3 * Xn],
    [t, 1, De]
  ];
  function s(l, u, p) {
    const f = u < l;
    f && ([l, u] = [u, l]);
    const d = p && typeof p.range == "function" ? p : c(l, u, p), m = d ? d.range(l, +u + 1) : [];
    return f ? m.reverse() : m;
  }
  function c(l, u, p) {
    const f = Math.abs(u - l) / p, d = Ze(([, , E]) => E).right(o, f);
    if (d === o.length)
      return t.every(bn(l / De, u / De, p));
    if (d === 0)
      return fe.every(Math.max(bn(l, u, p), 1));
    const [m, w] = o[f / o[d - 1][2] < o[d][2] / f ? d - 1 : d];
    return m.every(w);
  }
  return [s, c];
}
Or(st, Yr, fn, zr, $r, Ur);
const [Tc, Mc] = Or(at, dn, we, Rt, ln, Se);
function Fe(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
    return e.setFullYear(t.y), e;
  }
  return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
}
function ke(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
    return e.setUTCFullYear(t.y), e;
  }
  return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
}
function Ht(t, e, n) {
  return { y: t, m: e, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function Ec(t) {
  var e = t.dateTime, n = t.date, r = t.time, i = t.periods, a = t.days, o = t.shortDays, s = t.months, c = t.shortMonths, l = Pt(i), u = Dt(i), p = Pt(a), f = Dt(a), d = Pt(o), m = Dt(o), w = Pt(s), E = Dt(s), N = Pt(c), U = Dt(c), P = {
    a: Vt,
    A: be,
    b: Lt,
    B: Mt,
    c: null,
    d: jn,
    e: jn,
    f: Jc,
    g: sl,
    G: ll,
    H: Wc,
    I: Zc,
    j: jc,
    L: Rr,
    m: Qc,
    M: Kc,
    p: Br,
    q: Wr,
    Q: Kn,
    s: tr,
    S: tl,
    u: el,
    U: nl,
    V: rl,
    w: il,
    W: al,
    x: null,
    X: null,
    y: ol,
    Y: cl,
    Z: ul,
    "%": Qn
  }, v = {
    a: Zr,
    A: jr,
    b: Jr,
    B: Qr,
    c: null,
    d: Jn,
    e: Jn,
    f: pl,
    g: _l,
    G: Tl,
    H: fl,
    I: dl,
    j: hl,
    L: Lr,
    m: gl,
    M: ml,
    p: Kr,
    q: ti,
    Q: Kn,
    s: tr,
    S: vl,
    u: yl,
    U: Sl,
    V: wl,
    w: xl,
    W: bl,
    x: null,
    X: null,
    y: Al,
    Y: Cl,
    Z: Ml,
    "%": Qn
  }, _ = {
    a: Y,
    A: k,
    b: V,
    B: Q,
    c: gt,
    d: Wn,
    e: Wn,
    f: Xc,
    g: Bn,
    G: qn,
    H: Zn,
    I: Zn,
    j: Oc,
    L: Lc,
    m: Yc,
    M: Rc,
    p: $,
    q: zc,
    Q: qc,
    s: Bc,
    S: Vc,
    u: kc,
    U: Ic,
    V: Nc,
    w: Fc,
    W: Uc,
    x: xe,
    X: Tt,
    y: Bn,
    Y: qn,
    Z: $c,
    "%": Gc
  };
  P.x = y(n, P), P.X = y(r, P), P.c = y(e, P), v.x = y(n, v), v.X = y(r, v), v.c = y(e, v);
  function y(S, A) {
    return function(T) {
      var g = [], O = -1, H = 0, L = S.length, X, ct, pn;
      for (T instanceof Date || (T = new Date(+T)); ++O < L; )
        S.charCodeAt(O) === 37 && (g.push(S.slice(H, O)), (ct = Gn[X = S.charAt(++O)]) != null ? X = S.charAt(++O) : ct = X === "e" ? " " : "0", (pn = A[X]) && (X = pn(T, ct)), g.push(X), H = O + 1);
      return g.push(S.slice(H, O)), g.join("");
    };
  }
  function b(S, A) {
    return function(T) {
      var g = Ht(1900, void 0, 1), O = D(g, S, T += "", 0), H, L;
      if (O != T.length)
        return null;
      if ("Q" in g)
        return new Date(g.Q);
      if ("s" in g)
        return new Date(g.s * 1e3 + ("L" in g ? g.L : 0));
      if (A && !("Z" in g) && (g.Z = 0), "p" in g && (g.H = g.H % 12 + g.p * 12), g.m === void 0 && (g.m = "q" in g ? g.q : 0), "V" in g) {
        if (g.V < 1 || g.V > 53)
          return null;
        "w" in g || (g.w = 1), "Z" in g ? (H = ke(Ht(g.y, 0, 1)), L = H.getUTCDay(), H = L > 4 || L === 0 ? he.ceil(H) : he(H), H = un.offset(H, (g.V - 1) * 7), g.y = H.getUTCFullYear(), g.m = H.getUTCMonth(), g.d = H.getUTCDate() + (g.w + 6) % 7) : (H = Fe(Ht(g.y, 0, 1)), L = H.getDay(), H = L > 4 || L === 0 ? de.ceil(H) : de(H), H = Rt.offset(H, (g.V - 1) * 7), g.y = H.getFullYear(), g.m = H.getMonth(), g.d = H.getDate() + (g.w + 6) % 7);
      } else
        ("W" in g || "U" in g) && ("w" in g || (g.w = "u" in g ? g.u % 7 : "W" in g ? 1 : 0), L = "Z" in g ? ke(Ht(g.y, 0, 1)).getUTCDay() : Fe(Ht(g.y, 0, 1)).getDay(), g.m = 0, g.d = "W" in g ? (g.w + 6) % 7 + g.W * 7 - (L + 5) % 7 : g.w + g.U * 7 - (L + 6) % 7);
      return "Z" in g ? (g.H += g.Z / 100 | 0, g.M += g.Z % 100, ke(g)) : Fe(g);
    };
  }
  function D(S, A, T, g) {
    for (var O = 0, H = A.length, L = T.length, X, ct; O < H; ) {
      if (g >= L)
        return -1;
      if (X = A.charCodeAt(O++), X === 37) {
        if (X = A.charAt(O++), ct = _[X in Gn ? A.charAt(O++) : X], !ct || (g = ct(S, T, g)) < 0)
          return -1;
      } else if (X != T.charCodeAt(g++))
        return -1;
    }
    return g;
  }
  function $(S, A, T) {
    var g = l.exec(A.slice(T));
    return g ? (S.p = u.get(g[0].toLowerCase()), T + g[0].length) : -1;
  }
  function Y(S, A, T) {
    var g = d.exec(A.slice(T));
    return g ? (S.w = m.get(g[0].toLowerCase()), T + g[0].length) : -1;
  }
  function k(S, A, T) {
    var g = p.exec(A.slice(T));
    return g ? (S.w = f.get(g[0].toLowerCase()), T + g[0].length) : -1;
  }
  function V(S, A, T) {
    var g = N.exec(A.slice(T));
    return g ? (S.m = U.get(g[0].toLowerCase()), T + g[0].length) : -1;
  }
  function Q(S, A, T) {
    var g = w.exec(A.slice(T));
    return g ? (S.m = E.get(g[0].toLowerCase()), T + g[0].length) : -1;
  }
  function gt(S, A, T) {
    return D(S, e, A, T);
  }
  function xe(S, A, T) {
    return D(S, n, A, T);
  }
  function Tt(S, A, T) {
    return D(S, r, A, T);
  }
  function Vt(S) {
    return o[S.getDay()];
  }
  function be(S) {
    return a[S.getDay()];
  }
  function Lt(S) {
    return c[S.getMonth()];
  }
  function Mt(S) {
    return s[S.getMonth()];
  }
  function Br(S) {
    return i[+(S.getHours() >= 12)];
  }
  function Wr(S) {
    return 1 + ~~(S.getMonth() / 3);
  }
  function Zr(S) {
    return o[S.getUTCDay()];
  }
  function jr(S) {
    return a[S.getUTCDay()];
  }
  function Jr(S) {
    return c[S.getUTCMonth()];
  }
  function Qr(S) {
    return s[S.getUTCMonth()];
  }
  function Kr(S) {
    return i[+(S.getUTCHours() >= 12)];
  }
  function ti(S) {
    return 1 + ~~(S.getUTCMonth() / 3);
  }
  return {
    format: function(S) {
      var A = y(S += "", P);
      return A.toString = function() {
        return S;
      }, A;
    },
    parse: function(S) {
      var A = b(S += "", !1);
      return A.toString = function() {
        return S;
      }, A;
    },
    utcFormat: function(S) {
      var A = y(S += "", v);
      return A.toString = function() {
        return S;
      }, A;
    },
    utcParse: function(S) {
      var A = b(S += "", !0);
      return A.toString = function() {
        return S;
      }, A;
    }
  };
}
var Gn = { "-": "", _: " ", 0: "0" }, I = /^\s*\d+/, Hc = /^%/, Pc = /[\\^$*+?|[\]().{}]/g;
function M(t, e, n) {
  var r = t < 0 ? "-" : "", i = (r ? -t : t) + "", a = i.length;
  return r + (a < n ? new Array(n - a + 1).join(e) + i : i);
}
function Dc(t) {
  return t.replace(Pc, "\\$&");
}
function Pt(t) {
  return new RegExp("^(?:" + t.map(Dc).join("|") + ")", "i");
}
function Dt(t) {
  return new Map(t.map((e, n) => [e.toLowerCase(), n]));
}
function Fc(t, e, n) {
  var r = I.exec(e.slice(n, n + 1));
  return r ? (t.w = +r[0], n + r[0].length) : -1;
}
function kc(t, e, n) {
  var r = I.exec(e.slice(n, n + 1));
  return r ? (t.u = +r[0], n + r[0].length) : -1;
}
function Ic(t, e, n) {
  var r = I.exec(e.slice(n, n + 2));
  return r ? (t.U = +r[0], n + r[0].length) : -1;
}
function Nc(t, e, n) {
  var r = I.exec(e.slice(n, n + 2));
  return r ? (t.V = +r[0], n + r[0].length) : -1;
}
function Uc(t, e, n) {
  var r = I.exec(e.slice(n, n + 2));
  return r ? (t.W = +r[0], n + r[0].length) : -1;
}
function qn(t, e, n) {
  var r = I.exec(e.slice(n, n + 4));
  return r ? (t.y = +r[0], n + r[0].length) : -1;
}
function Bn(t, e, n) {
  var r = I.exec(e.slice(n, n + 2));
  return r ? (t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), n + r[0].length) : -1;
}
function $c(t, e, n) {
  var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n, n + 6));
  return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1;
}
function zc(t, e, n) {
  var r = I.exec(e.slice(n, n + 1));
  return r ? (t.q = r[0] * 3 - 3, n + r[0].length) : -1;
}
function Yc(t, e, n) {
  var r = I.exec(e.slice(n, n + 2));
  return r ? (t.m = r[0] - 1, n + r[0].length) : -1;
}
function Wn(t, e, n) {
  var r = I.exec(e.slice(n, n + 2));
  return r ? (t.d = +r[0], n + r[0].length) : -1;
}
function Oc(t, e, n) {
  var r = I.exec(e.slice(n, n + 3));
  return r ? (t.m = 0, t.d = +r[0], n + r[0].length) : -1;
}
function Zn(t, e, n) {
  var r = I.exec(e.slice(n, n + 2));
  return r ? (t.H = +r[0], n + r[0].length) : -1;
}
function Rc(t, e, n) {
  var r = I.exec(e.slice(n, n + 2));
  return r ? (t.M = +r[0], n + r[0].length) : -1;
}
function Vc(t, e, n) {
  var r = I.exec(e.slice(n, n + 2));
  return r ? (t.S = +r[0], n + r[0].length) : -1;
}
function Lc(t, e, n) {
  var r = I.exec(e.slice(n, n + 3));
  return r ? (t.L = +r[0], n + r[0].length) : -1;
}
function Xc(t, e, n) {
  var r = I.exec(e.slice(n, n + 6));
  return r ? (t.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1;
}
function Gc(t, e, n) {
  var r = Hc.exec(e.slice(n, n + 1));
  return r ? n + r[0].length : -1;
}
function qc(t, e, n) {
  var r = I.exec(e.slice(n));
  return r ? (t.Q = +r[0], n + r[0].length) : -1;
}
function Bc(t, e, n) {
  var r = I.exec(e.slice(n));
  return r ? (t.s = +r[0], n + r[0].length) : -1;
}
function jn(t, e) {
  return M(t.getDate(), e, 2);
}
function Wc(t, e) {
  return M(t.getHours(), e, 2);
}
function Zc(t, e) {
  return M(t.getHours() % 12 || 12, e, 2);
}
function jc(t, e) {
  return M(1 + Rt.count(at(t), t), e, 3);
}
function Rr(t, e) {
  return M(t.getMilliseconds(), e, 3);
}
function Jc(t, e) {
  return Rr(t, e) + "000";
}
function Qc(t, e) {
  return M(t.getMonth() + 1, e, 2);
}
function Kc(t, e) {
  return M(t.getMinutes(), e, 2);
}
function tl(t, e) {
  return M(t.getSeconds(), e, 2);
}
function el(t) {
  var e = t.getDay();
  return e === 0 ? 7 : e;
}
function nl(t, e) {
  return M(we.count(at(t) - 1, t), e, 2);
}
function Vr(t) {
  var e = t.getDay();
  return e >= 4 || e === 0 ? _t(t) : _t.ceil(t);
}
function rl(t, e) {
  return t = Vr(t), M(_t.count(at(t), t) + (at(t).getDay() === 4), e, 2);
}
function il(t) {
  return t.getDay();
}
function al(t, e) {
  return M(de.count(at(t) - 1, t), e, 2);
}
function ol(t, e) {
  return M(t.getFullYear() % 100, e, 2);
}
function sl(t, e) {
  return t = Vr(t), M(t.getFullYear() % 100, e, 2);
}
function cl(t, e) {
  return M(t.getFullYear() % 1e4, e, 4);
}
function ll(t, e) {
  var n = t.getDay();
  return t = n >= 4 || n === 0 ? _t(t) : _t.ceil(t), M(t.getFullYear() % 1e4, e, 4);
}
function ul(t) {
  var e = t.getTimezoneOffset();
  return (e > 0 ? "-" : (e *= -1, "+")) + M(e / 60 | 0, "0", 2) + M(e % 60, "0", 2);
}
function Jn(t, e) {
  return M(t.getUTCDate(), e, 2);
}
function fl(t, e) {
  return M(t.getUTCHours(), e, 2);
}
function dl(t, e) {
  return M(t.getUTCHours() % 12 || 12, e, 2);
}
function hl(t, e) {
  return M(1 + un.count(st(t), t), e, 3);
}
function Lr(t, e) {
  return M(t.getUTCMilliseconds(), e, 3);
}
function pl(t, e) {
  return Lr(t, e) + "000";
}
function gl(t, e) {
  return M(t.getUTCMonth() + 1, e, 2);
}
function ml(t, e) {
  return M(t.getUTCMinutes(), e, 2);
}
function vl(t, e) {
  return M(t.getUTCSeconds(), e, 2);
}
function yl(t) {
  var e = t.getUTCDay();
  return e === 0 ? 7 : e;
}
function Sl(t, e) {
  return M(fn.count(st(t) - 1, t), e, 2);
}
function Xr(t) {
  var e = t.getUTCDay();
  return e >= 4 || e === 0 ? Ct(t) : Ct.ceil(t);
}
function wl(t, e) {
  return t = Xr(t), M(Ct.count(st(t), t) + (st(t).getUTCDay() === 4), e, 2);
}
function xl(t) {
  return t.getUTCDay();
}
function bl(t, e) {
  return M(he.count(st(t) - 1, t), e, 2);
}
function Al(t, e) {
  return M(t.getUTCFullYear() % 100, e, 2);
}
function _l(t, e) {
  return t = Xr(t), M(t.getUTCFullYear() % 100, e, 2);
}
function Cl(t, e) {
  return M(t.getUTCFullYear() % 1e4, e, 4);
}
function Tl(t, e) {
  var n = t.getUTCDay();
  return t = n >= 4 || n === 0 ? Ct(t) : Ct.ceil(t), M(t.getUTCFullYear() % 1e4, e, 4);
}
function Ml() {
  return "+0000";
}
function Qn() {
  return "%";
}
function Kn(t) {
  return +t;
}
function tr(t) {
  return Math.floor(+t / 1e3);
}
var mt, hn, Gr;
El({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function El(t) {
  return mt = Ec(t), hn = mt.format, Gr = mt.parse, mt.utcFormat, mt.utcParse, mt;
}
function Hl(t) {
  return new Date(t);
}
function Pl(t) {
  return t instanceof Date ? +t : +new Date(+t);
}
function qr(t, e, n, r, i, a, o, s, c, l) {
  var u = mc(), p = u.invert, f = u.domain, d = l(".%L"), m = l(":%S"), w = l("%I:%M"), E = l("%I %p"), N = l("%a %d"), U = l("%b %d"), P = l("%B"), v = l("%Y");
  function _(y) {
    return (c(y) < y ? d : s(y) < y ? m : o(y) < y ? w : a(y) < y ? E : r(y) < y ? i(y) < y ? N : U : n(y) < y ? P : v)(y);
  }
  return u.invert = function(y) {
    return new Date(p(y));
  }, u.domain = function(y) {
    return arguments.length ? f(Array.from(y, Pl)) : f().map(Hl);
  }, u.ticks = function(y) {
    var b = f();
    return t(b[0], b[b.length - 1], y ?? 10);
  }, u.tickFormat = function(y, b) {
    return b == null ? _ : l(b);
  }, u.nice = function(y) {
    var b = f();
    return (!y || typeof y.range != "function") && (y = e(b[0], b[b.length - 1], y ?? 10)), y ? f(vc(b, y)) : u;
  }, u.copy = function() {
    return pc(u, qr(t, e, n, r, i, a, o, s, c, l));
  }, u;
}
function er() {
  return sn.apply(qr(Tc, Mc, at, dn, we, Rt, ln, Se, yt, hn).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function St(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
St.prototype = {
  constructor: St,
  scale: function(t) {
    return t === 1 ? this : new St(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new St(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
new St(1, 0, 0);
St.prototype;
const h = {
  configuracionSemana: {
    horaMinima: "08:00",
    horaMaxima: "14:00",
    diasSemanaHabiles: ["L", "M", "X"]
  },
  grafico: {
    anchoGrafico: void 0,
    altoGrafico: void 0,
    colorGrafico: "white",
    margenGrafico: {
      margenInferiorGrafico: 30,
      margenDerechoGrafico: 30,
      margenSuperiorGrafico: 30,
      margenIzquierdoGrafico: 50
    },
    pixelesPorHora: void 0
  },
  panelHorario: {
    altoPanelHorario: void 0,
    colorPanelHorario: "#fff",
    anchoPanelHorario: void 0
  },
  panelDiaSemana: {
    colorPanelDiaSemana: "#444"
  },
  panelSesiones: {
    alto: 1,
    ancho: 1,
    margenLateral: 0,
    altoCabecera: 11,
    anchoSesion: void 0,
    altoPie: 0,
    colorCabecera: "#fff",
    colorCuerpo: "#f4f4f4"
  },
  escalas: {
    escalaVertical: void 0,
    escalaHorizontal: void 0
  },
  actividades: {
    tamanyoTexto: "15",
    porcentajeZonaSeleccionActividad: 4,
    colores: ["#e4fbc3", "#ffd8c1", "#e0c1ff", "#c1ffff", "#c1ffd1", "#c1d1ff", "#f7ffc1", "#f7ffc1"],
    mostrarPanelAcciones: !1,
    mostrarSeccionPie: !1,
    contenidoSecciones: ["GRU", "CON", "DEP"],
    altoSeccionPie: 15,
    sobrescribirContenidoAreasPorTipo: !0,
    criterioColoreado: "TIPO_ACTIVIDAD",
    mostrarMarcaSeleccionActividad: !0
  }
}, nr = [
  { codigo: "L", denominacionCorta: "LUN", denominacionLarga: "Lunes" },
  { codigo: "M", denominacionCorta: "MAR", denominacionLarga: "Martes" },
  { codigo: "X", denominacionCorta: "MIE", denominacionLarga: "Miércoles" },
  { codigo: "J", denominacionCorta: "JUE", denominacionLarga: "Jueves" },
  { codigo: "V", denominacionCorta: "VIE", denominacionLarga: "Viernes" },
  { codigo: "S", denominacionCorta: "SAB", denominacionLarga: "Sábado" },
  { codigo: "D", denominacionCorta: "DOM", denominacionLarga: "Domingo" }
];
class x {
  static compare(e, n) {
    const r = nr.map((i) => i.codigo);
    return r.indexOf(e.sesion.diaSemana) < r.indexOf(n.sesion.diaSemana) ? -1 : r.indexOf(e.sesion.diaSemana) > r.indexOf(n.sesion.diaSemana) ? 1 : x.convertirCadenaHoraEnTiempo(e.sesion.horaInicio) < x.convertirCadenaHoraEnTiempo(n.sesion.horaInicio) ? -1 : x.convertirCadenaHoraEnTiempo(e.sesion.horaInicio) > x.convertirCadenaHoraEnTiempo(n.sesion.horaInicio) ? 1 : x.convertirCadenaHoraEnTiempo(e.sesion.horaInicio) == x.convertirCadenaHoraEnTiempo(n.sesion.horaInicio) ? x.convertirCadenaHoraEnTiempo(e.sesion.horaFin) < x.convertirCadenaHoraEnTiempo(n.sesion.horaFin) ? -1 : x.convertirCadenaHoraEnTiempo(e.sesion.horaFin) > x.convertirCadenaHoraEnTiempo(n.sesion.horaFin) ? 1 : x.convertirCadenaHoraEnTiempo(e.sesion.horaFin) == x.convertirCadenaHoraEnTiempo(n.sesion.horaFin) ? e.sesion.idSesion < n.sesion.idSesion ? -1 : e.sesion.idSesion > n.sesion.idSesion ? 1 : 0 : 0 : 0;
  }
  static obtenerActividadesSesiones(e) {
    const n = [], r = [];
    return e.forEach((i) => {
      r.filter((a) => a.idSesion === i.sesion.idSesion).length === 0 && r.push(i.sesion);
    }), r.forEach((i) => {
      const a = [];
      e.filter((o) => o.sesion.idSesion === i.idSesion).sort(this.compare).forEach((o) => a.push(o)), n.push({ sesion: i, actividades: a });
    }), n;
  }
  static altoPanel(e) {
    const n = h.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(e.horaInicio));
    return h.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(e.horaFin)) - n;
  }
  static anyadirDefs(e) {
    const n = e.append("defs");
    n.append("pattern").attr("id", "smallGrid").attr("width", 1).attr("height", 1).attr("patternUnits", "userSpaceOnUse").append("rect").attr("width", 10).attr("height", 10);
    var r = n.append("pattern").attr("id", "x").attr("patternUnits", "userSpaceOnUse").attr("width", "4").attr("height", "4").attr("x", 0).attr("y", 0).append("g").style("fill", "white").style("stroke", "black").style("stroke-width", 0.5);
    r.append("path").attr("d", "M0,0 l25,25"), r.append("path").attr("d", "M25,0 l-25,25");
  }
  static obtenerHorasInicionHorasFin(e) {
    return e.reduce(
      function(n, r) {
        return n.concat([x.convertirCadenaHoraEnTiempo(r.sesion.horaInicio), x.convertirCadenaHoraEnTiempo(r.sesion.horaFin)]);
      },
      []
    );
  }
  static obtenerDiasSemanaHorario() {
    return nr.filter((e) => h.configuracionSemana?.diasSemanaHabiles.includes(e.codigo));
  }
  static minimoIntervaloTemporal() {
    return x.convertirCadenaHoraEnTiempo(h.configuracionSemana?.horaMinima), x.convertirCadenaHoraEnTiempo(h.configuracionSemana?.horaMinima);
  }
  static maximoIntervaloTemporal() {
    const e = x.convertirCadenaHoraEnTiempo(h.configuracionSemana?.horaMaxima);
    return e.setMinutes(e.getMinutes());
  }
  static actividadesCubiertasPor(e, n) {
    return n.filter(
      (r) => r.idActividad != e.idActividad && r.sesion.diaSemana === e.sesion.diaSemana && x.convertirCadenaHoraEnTiempo(r.sesion.horaInicio) >= x.convertirCadenaHoraEnTiempo(e.sesion.horaInicio) && x.convertirCadenaHoraEnTiempo(r.sesion.horaFin) <= x.convertirCadenaHoraEnTiempo(e.sesion.horaFin)
    );
  }
  static calcularFactorAnchoActividadesG(e, n) {
    e.forEach(
      (r) => {
        const i = x.actividadesCubiertasPor(r, n);
        i.length > 0 && r && (r.nivelAncho = Ci(i.map((a) => a.nivelAncho)) + 1);
      }
    );
  }
  static calcularColoresActividadesG(e, n) {
    switch (n) {
      case "TIPO_ACTIVIDAD":
        this.colorearActividadesPorTipoActividad(e);
        break;
      case "CONTENIDO":
        this.colorearActividadesPorContenido(e);
        break;
      case "GRUPOS":
        this.colorearActividadesPorGrupos(e);
        break;
      default:
        this.colorearActividadesPorTipoActividad(e);
        break;
    }
  }
  static colorearActividadesPorGrupos(e) {
    const n = [];
    var r = {};
    e.forEach(
      (i) => {
        var a = "-";
        i.grupos.sort((o, s) => o.codigo < s.codigo ? 1 : 0).forEach(
          (o) => a += o.codigo
        ), r[i.idActividad] = a, n.some((o) => o === a) || n.push(a);
      }
    );
    for (let i = 0; i < n.length; i++) {
      const a = n[i];
      e.filter((o) => r[o.idActividad] === a).forEach(
        (o) => {
          o.color = h.actividades.colores[i];
        }
      );
    }
  }
  static colorearActividadesPorContenido(e) {
    const n = [];
    var r = {};
    e.forEach(
      (i) => {
        var a = "-";
        i.asignaturas.sort((o, s) => o.codigo < s.codigo ? 1 : 0).forEach(
          (o) => a += o.codigo
        ), r[i.idActividad] = a, n.some((o) => o === a) || n.push(a);
      }
    );
    for (let i = 0; i < n.length; i++) {
      const a = n[i];
      e.filter((o) => r[o.idActividad] === a).forEach(
        (o) => o.color = h.actividades.colores[i]
      );
    }
  }
  static colorearActividadesPorTipoActividad(e) {
    const n = [];
    e.forEach(
      (r) => {
        n.some((i) => i === r.tipoActividad?.idTipoActividad) || n.push(r.tipoActividad?.idTipoActividad);
      }
    );
    for (let r = 0; r < n.length; r++) {
      const i = n[r];
      e.filter((a) => a.tipoActividad?.idTipoActividad === i).forEach(
        (a) => a.color = h.actividades.colores[r]
      );
    }
  }
  static desmarcarActividadesComoSeleccionadas(e, n) {
    n ? e.filter((r) => n.includes(r.idActividad)).forEach(
      (r) => C("g#panelActividad" + r.idActividad).select(".rectActividadSeleccionada").remove()
    ) : ot("g.panelActividad").select(".rectActividadSeleccionada").remove();
  }
  static marcarActividadesComoSeleccionadas(e) {
    e.forEach(
      (n) => {
        const r = C("g#panelActividad_" + n).select(".panelActividadZonaSeleccion"), i = r.select(".rectActividad");
        r.append("rect").attr("width", i.attr("width")).attr("height", i.attr("height")).attr("class", "rectActividadSeleccionada").attr("fill", "url(#x)");
      }
    );
  }
  static convertirCadenaHoraEnTiempo = Gr("%I:%M");
  static convertirTiempoEnCadenaHora = hn("%I:%M");
}
let Dl = class {
  svg;
  elementoRaiz;
  plantilla;
  actividadesG = [];
  numeroSesionesPorActividad;
  seleccionActividad$ = new Z();
  entrandoEnActividad$ = new Z();
  saliendoDeActividad$ = new Z();
  moverActividad$ = new Z();
  duplicarActividad$ = new Z();
  eliminarActividad$ = new Z();
  sobrerActividad = new Z();
  Actividad$ = new Z();
  anyadirActividadEnSesion$ = new Z();
  constructor(e) {
    this.elementoRaiz = e;
  }
  generarGrafico(e, n) {
    this.svg && C("svg").remove(), this.svg = C(this.elementoRaiz).append("svg"), this.establecerParametrosConfiguracion(e), this.configurarSvg(this.svg), this.renderizarPanelHorario(this.svg), this.renderizarPanelesDiasSamanas(), n && (this.plantilla = n, this.renderizarPlantilla(this.plantilla)), this.renderizarActividades();
  }
  obtenerConfiguracion() {
    return h;
  }
  actualizarActividades(e) {
    this.actividadesG = [], e.forEach(
      (n) => {
        const r = new di(n);
        this.actividadesG.push(r);
      }
    ), x.calcularFactorAnchoActividadesG(this.actividadesG, this.actividadesG), x.calcularColoresActividadesG(this.actividadesG, h.actividades.criterioColoreado), this.renderizarActividades();
  }
  configurarSvg(e) {
    e.attr("width", h.grafico.anchoGrafico).attr("height", h.grafico.altoGrafico), e.append("rect").attr("width", "100%").attr("height", "100%").attr("id", "fondografico").attr("fill", h.grafico.colorGrafico).attr("rx", "0").attr("ry", "0"), x.anyadirDefs(e);
  }
  establecerParametrosConfiguracion(e) {
    e.configuracionSemana.diasSemanaHabiles && (h.configuracionSemana.diasSemanaHabiles = e.configuracionSemana.diasSemanaHabiles), e.configuracionSemana.horaMinima && (h.configuracionSemana.horaMinima = e.configuracionSemana.horaMinima), e.configuracionSemana.horaMaxima && (h.configuracionSemana.horaMaxima = e.configuracionSemana.horaMaxima), h.actividades.mostrarPanelAcciones = !!e.actividades?.mostrarPanelAcciones, h.actividades.mostrarSeccionPie = !!e.actividades?.mostrarSeccionPie, h.actividades.sobrescribirContenidoAreasPorTipo = !!e.actividades?.sobrescribirContenidoAreasPorTipo, e.actividades?.tamanyoTexto && (h.actividades.tamanyoTexto = e.actividades?.tamanyoTexto), e.panelSesiones?.colorCuerpo && (h.panelSesiones.colorCuerpo = e.panelSesiones.colorCuerpo), e.panelSesiones?.alto && (h.panelSesiones.alto = e.panelSesiones.alto), e.panelSesiones?.ancho && (h.panelSesiones.ancho = e.panelSesiones.ancho), e.actividades?.criterioColoreado && (h.actividades.criterioColoreado = e.actividades.criterioColoreado), e.actividades?.colores && (h.actividades.colores = e.actividades.colores), e.actividades?.mostrarMarcaSeleccionActividad && (h.actividades.mostrarMarcaSeleccionActividad = e.actividades.mostrarMarcaSeleccionActividad), e.actividades.contenidoSecciones && (h.actividades.contenidoSecciones = [], e.actividades?.contenidoSecciones.forEach(
      (m) => h.actividades.contenidoSecciones.push(m)
    ));
    const r = x.convertirCadenaHoraEnTiempo(h.configuracionSemana.horaMaxima), i = x.convertirCadenaHoraEnTiempo(h.configuracionSemana.horaMinima), a = (r.getTime() - i.getTime()) / 36e5, o = h.panelSesiones.alto, s = h.panelSesiones.ancho;
    h.grafico.anchoGrafico = parseFloat(C(this.elementoRaiz).style("width")) * s, e.grafico?.pixelesPorHora ? h.grafico.altoGrafico = e.grafico.pixelesPorHora * o * a - 22 : h.grafico.altoGrafico = parseFloat(C(this.elementoRaiz).style("height")) * o - 22;
    const c = h.grafico.anchoGrafico, l = h.grafico.altoGrafico, u = h.grafico.margenGrafico.margenDerechoGrafico, p = h.grafico.margenGrafico.margenIzquierdoGrafico, f = h.grafico.margenGrafico.margenSuperiorGrafico, d = h.grafico.margenGrafico.margenInferiorGrafico;
    h.panelHorario.anchoPanelHorario = c - p - u, h.panelHorario.altoPanelHorario = l - f - d, h.escalas.escalaHorizontal = Nr().domain(x.obtenerDiasSemanaHorario().map((m) => m.denominacionLarga)).range([0, h.panelHorario.anchoPanelHorario]).paddingInner(0).paddingOuter(0), h.escalas.escalaVertical = er().domain([x.minimoIntervaloTemporal(), x.maximoIntervaloTemporal()]).range([0, h.panelHorario.altoPanelHorario]), h.panelSesiones.anchoSesion = parseFloat(h.escalas.escalaHorizontal.bandwidth()) * (100 - h.panelSesiones.margenLateral * 2) * 0.01;
  }
  renderizarGrafico(e, n) {
    window.addEventListener("resize", this.generarGrafico.bind(this, e, n)), this.generarGrafico(e, n);
  }
  renderizarPanelHorario(e) {
    const n = h.grafico.margenGrafico.margenIzquierdoGrafico, r = h.grafico.margenGrafico.margenSuperiorGrafico, i = e.append("g").attr("id", "panelHorario").attr("transform", `translate(${n},${r})`).attr("width", h.panelHorario.anchoPanelHorario).attr("height", h.panelHorario.altoPanelHorario);
    i.append("rect").attr("id", "fondoPanelHorario").attr("width", h.panelHorario.anchoPanelHorario).attr("height", h.panelHorario.altoPanelHorario).attr("fill", h.panelHorario.colorPanelHorario);
    var a = ki(h.escalas.escalaHorizontal);
    a.tickSize(0);
    const o = i.append("g").attr("class", "ejeX").call(a);
    o.select(".domain").remove(), o.selectAll(".tick text").attr("font-size", 20);
    const s = parseInt(h.configuracionSemana.horaMinima.substring(0, 2)), c = parseInt(h.configuracionSemana.horaMinima.substring(3, 5)), l = new Date();
    l.setHours(s), l.setMinutes(c);
    const u = parseInt(h.configuracionSemana.horaMaxima.substring(0, 2)), p = parseInt(h.configuracionSemana.horaMaxima.substring(3, 5)), f = new Date();
    f.setHours(u), f.setMinutes(p);
    const d = er().domain([l.setMinutes(l.getMinutes() - 1), f]).range([0, h.panelHorario.altoPanelHorario]);
    var m = Ii(d);
    return m.ticks(Se.every(60)), i.append("g").attr("class", "ejeY").call(m).select(".domain").remove(), i;
  }
  renderizarPanelesDiasSamanas() {
    const e = C("g#panelHorario").selectAll("g#panelDiaSemana").data(x.obtenerDiasSemanaHorario()), n = C("g#panelHorario").selectAll("g#panelDiaSemana").data(x.obtenerDiasSemanaHorario()).enter().append("g");
    return n.merge(e).attr("id", (r) => r.codigo).attr("class", "panelDiaSemana").attr("transform", (r) => `translate(${h.escalas.escalaHorizontal ? h.escalas.escalaHorizontal(r.denominacionLarga) : 0},0)`), n.exit().remove(), n.append("line").attr("x1", h.escalas.escalaHorizontal?.bandwidth).attr("y1", 0).attr("x2", h.escalas.escalaHorizontal?.bandwidth).attr("y2", h.panelHorario.altoPanelHorario).attr("stroke-width", "0.1").attr("stroke", "black").attr("stroke-dasharray", "1"), n;
  }
  renderizarPlantilla(e) {
    ot("g.panelSesiones").remove(), ot("g.panelDiaSemana").nodes().forEach(
      (n) => {
        const r = e.sesionesPlantilla.filter((i) => i.diaSemana === n.id);
        this.renderizarSesiones("g#" + n.id, r);
      }
    );
  }
  renderizarActividades() {
    ot("g.panelSesionActividades").remove(), ot("g.panelDiaSemana").nodes().forEach(
      (e) => {
        const n = this.actividadesG.filter((r) => r.sesion.diaSemana === e.id);
        this.renderizarActividadesPorDiaSemana("g#" + e.id, n);
      }
    );
  }
  renderizarSesiones(e, n) {
    const r = h.panelSesiones.anchoSesion ? h.panelSesiones.anchoSesion.toString() : "0", i = C(e).selectAll("g#sesionpp").data(n).enter().append("g").attr("transform", (s) => `translate(${h.panelSesiones.margenLateral},${h.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(s.horaInicio))})`).attr("class", "panelSesion").attr("id", (s) => "ses" + s.idSesion), a = i.append("g").attr("class", "panelCabeceraSesion");
    a.append("rect").attr("class", "fondoPanelSesionCabecera").attr("id", (s) => "fondoPanelSesionCabecera" + s.idSesion).attr("height", h.panelSesiones.altoCabecera).attr("width", parseFloat(r)).attr("fill", h.panelSesiones.colorCabecera), a.append("text").attr("x", parseInt(r) / 2).text((s) => s.horaInicio + " - " + s.horaFin).attr("y", h.panelSesiones.altoCabecera / 2).attr("font-size", ".5em").attr("dominant-baseline", "central").attr("text-anchor", "middle"), i.append("g").attr("class", "panelCuerpoSesion").attr("transform", (s) => `translate(0,${h.panelSesiones.altoCabecera})`).append("rect").attr("class", "fondoPanelSesion").attr("id", (s) => "fondoPanelSesion" + s.idSesion).attr("height", (s) => {
      const c = h.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(s.horaInicio));
      return h.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(s.horaFin)) - c - h.panelSesiones.altoCabecera;
    }).attr("width", parseFloat(r)).attr("fill", h.panelSesiones.colorCuerpo).on("click", (s, c) => {
      this.anyadirActividadEnSesion$.next(c);
    });
  }
  renderizarActividadesPorDiaSemana(e, n) {
    const r = x.obtenerActividadesSesiones(n), i = C(e).selectAll("g#actxx").data(r).enter().append("g").attr("transform", (a) => `translate(0,${h.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(a.sesion.horaInicio))})`).attr("class", "panelSesionActividades").attr("id", (a) => "panelSesionActividades" + a.sesion.idSesion).attr("data-actividades", (a) => a.actividades.map((o) => o.idActividad).join(",")).attr("data-actividadVisible", (a) => a.actividades[0].idActividad);
    this.renderizarActividadesPorSesionActividad(i, r);
  }
  renderizarActividadesPorSesionActividad(e, n) {
    const r = h.panelSesiones.anchoSesion ? h.panelSesiones.anchoSesion.toString() : "0", i = h.panelSesiones.altoCabecera;
    h.panelSesiones.colorCabecera;
    const a = e.append("g").attr("class", "panelCabeceraSesionActividades").attr("id", (o) => "panelCabeceraSesionActividades" + o.sesion.idSesion);
    return a.append("rect").attr("class", "rectPanelCabeceraSesionActividades").attr("height", i * 2).attr("width", r).attr("rx", 0).attr("fill", "#ccc"), a.append("text").attr("x", parseInt(r) / 2).text((o) => o.sesion.horaInicio + " - " + o.sesion.horaFin).attr("y", i / 2).attr("font-size", ".6em").attr("fill", "white").attr("dominant-baseline", "central").attr("text-anchor", "middle"), this.renderizarBotonesPanelCabeceraSesionesActividades(a), this.renderizarPanelesCuerpoSesionActividades(e), this.renderizarPanelPieSesionActividades(e), this.anyadirPanelesActividades(n), a;
  }
  renderizarPanelPieSesionActividades(e) {
    const n = h.panelSesiones.altoPie, r = h.panelSesiones.anchoSesion ? h.panelSesiones.anchoSesion.toString() : "0", i = h.panelSesiones.altoCabecera;
    h.panelSesiones.colorCabecera;
    const a = e.append("g").attr("class", "panelPieSesionActividades").attr("id", (o) => "panelPieSesionActividades" + o.sesion.idSesion);
    return a.append("rect").attr("class", "rectPanelPieSesionActividades").attr("height", n).attr("width", r).attr("y", (o) => {
      const s = h.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(o.sesion.horaInicio));
      return h.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(o.sesion.horaFin)) - s - n;
    }).attr("fill", "#ccc"), a.append("text").attr("x", parseInt(r) / 2).text((o) => o.sesion.horaInicio + " - " + o.sesion.horaFin).attr("y", i / 2).attr("font-size", ".6em").attr("fill", "white").attr("dominant-baseline", "central").attr("text-anchor", "middle"), a;
  }
  renderizarBotonesPanelCabeceraSesionesActividades(e) {
    const n = h.panelSesiones.anchoSesion ? h.panelSesiones.anchoSesion.toString() : "0", r = h.panelSesiones.altoCabecera, i = parseFloat(n) / 2 - 15, a = i + 10, o = r / 18, s = r / 2, c = r * 17 / 18, l = [
      { x: parseFloat(n) / 2 - i, y: o + 1 },
      { x: parseFloat(n) / 2 - a + 2, y: s },
      { x: parseFloat(n) / 2 - i, y: c - 1 }
    ], u = [
      { x: parseFloat(n) / 2 + i, y: o + 1 },
      { x: parseFloat(n) / 2 + a - 2, y: s },
      { x: parseFloat(n) / 2 + i, y: c - 1 }
    ];
    e.append("polygon").attr("points", l.map(function(f) {
      return [f.x, f.y].join(",");
    }).join(" ")).attr("fill", "#ccc").attr("class", "botonCabeceraSesionActividades botonIzquierdoCabeceraSesionActividades").attr("id", (f) => "botonIzquierdoCabeceraSesionActividades" + f.sesion.idSesion).on("click", this.actualizarActividadVisibleDeUnaSesion.bind(this)).on("mouseout", (f) => C("body").style("cursor", "default")).on("mouseover", (f) => C("body").style("cursor", "pointer")), e.append("polygon"), e.append("polygon").attr("points", u.map(function(f) {
      return [f.x, f.y].join(",");
    }).join(" ")).attr(
      "fill",
      (f) => f.actividades.length > 1 ? "white" : "#ccc"
    ).attr("class", "botonCabeceraSesionActividades botonDerechoCabeceraSesionActividades").attr("id", (f) => "botonDerechoCabeceraSesionActividades" + f.sesion.idSesion).on("click", this.actualizarActividadVisibleDeUnaSesion.bind(this)).on("mouseout", (f) => C("body").style("cursor", "default")).on("mouseover", (f) => C("body").style("cursor", "pointer"));
  }
  renderizarPanelesCuerpoSesionActividades(e) {
    const n = h.panelSesiones.anchoSesion ? h.panelSesiones.anchoSesion.toString() : "0", r = h.panelSesiones.altoPie, i = h.panelSesiones.altoCabecera, a = e.append("g").attr("class", "panelCuerpoSesionActividades").attr("id", (o) => "panelCuerpoSesionActividades" + o.sesion.idSesion).attr("transform", `translate(0,${i})`);
    return a.append("clipPath").attr("id", (o) => "rectanguloRecortador" + o.sesion.idSesion).append("rect").attr("id", (o) => "rectRecortador" + o.sesion.idSesion).attr("height", (o) => {
      const s = h.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(o.sesion.horaInicio));
      return h.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(o.sesion.horaFin)) - s - i - r;
    }).attr("width", (o) => n), a.attr("clip-path", (o) => `url(#${"rectanguloRecortador" + o.sesion.idSesion})`), a;
  }
  anyadirPanelesActividades(e) {
    const n = h.panelSesiones.anchoSesion ? h.panelSesiones.anchoSesion.toString() : "0", r = h.actividades.mostrarSeccionPie ? h.actividades.mostrarSeccionPie : !1, i = h.actividades.altoSeccionPie ? h.actividades.altoSeccionPie : 0;
    e.forEach(
      (a) => {
        const o = x.altoPanel(a.sesion) - h.panelSesiones.altoCabecera - h.panelSesiones.altoPie, s = parseFloat(n) * h.actividades.porcentajeZonaSeleccionActividad / 100, c = o, l = "#panelCuerpoSesionActividades" + a.sesion.idSesion, u = C(l).selectAll("actxx").data(a.actividades).enter().append("g");
        u.attr("class", (d, m, w) => m == 0 ? "panelActividad visible" : "panelActividad").attr("id", (d) => "panelActividad_" + d.idActividad).attr("transform", (d, m, w) => `translate(${m * parseFloat(n)},0)`).attr("x", (d, m, w) => m * parseFloat(n)).attr("y", 0).attr("height", o).attr("altoSeccionPie", (d) => r && i && d.detalleActividad ? i : 0).attr("width", n);
        const p = [];
        h.actividades.contenidoSecciones.forEach(
          (d) => p.push(d)
        ), a.actividades.forEach(
          (d) => {
            const m = C("g#panelActividad_" + d.idActividad);
            for (let w = 1; w < p.length + 1; w++)
              this.renderizarSeccionContenidoPanelActividad(m, d, w, this.obtenerCadenasEntidadesHorario(d, p[w - 1]));
            h.actividades.mostrarPanelAcciones && this.renderizarSeccionBotonesAccionPanelActividad(m, d), r && i !== 0 && d.detalleActividad && this.renderizarSeccionPieActividad(m, d);
          }
        ), u.select(".panelActividadZonaSeleccion").append("rect").attr("class", "rectActividad").attr("width", s).attr("height", c).attr("fill", "#eee").on("click", (d, m, w) => {
          const E = C("g#panelActividad_" + m.idActividad).attr("class").split(" ").includes("actividadSeleccionada");
          d.ctrlKey || x.desmarcarActividadesComoSeleccionadas(this.actividadesG), E ? ot("g#panelActividad_" + m.idActividad).attr("class", "panelActividad actividadSeleccionada") : C("g#panelActividad_" + m.idActividad).attr("class", "panelActividad"), C("g#panelActividad_" + m.idActividad).attr("class").split(" ").includes("actividadSeleccionada") ? x.desmarcarActividadesComoSeleccionadas(this.actividadesG, [m.idActividad]) : x.marcarActividadesComoSeleccionadas([m.idActividad]);
        });
        const f = u.select(".panelActividadZonaSeleccion").append("svg:foreignObject").attr("width", s + "px").attr("height", c / 2 + "px").attr("y", "3px").append("xhtml:div").style("width", s + "px").style("height", c / 2 - 3 + "px").style("text-align", "center").html('<i class="fas fa fa-expand-arrows-alt" style="font-size:8px; "/><p style="font-size:4px"></p><i class="fas fa fa-copy" style="font-size:8px;"/i>');
        u.select(".panelActividadZonaSeleccion").append("svg:foreignObject").attr("width", s + "px").attr("height", c / 2 + "px").attr("y", c / 2 + "px").append("xhtml:div").style("width", s + "px").style("height", c / 2 + "px").style("display", "flex").style("align-items", "end").style("justify-content", "center").style("text-align", "center").html('<i class="fas fa fa-trash" style="font-size:8px;"/><p style="font-size:2px"><i class="fas fa fa-plus" style="font-size:8px; "/i>').on("click", (d, m, w) => {
          const E = !!d.srcElement.classList.contains("fa-trash"), N = !!d.srcElement.classList.contains("fa-plus");
          E && this.eliminarActividad$.next(m), N && this.anyadirActividadEnSesion$.next(m.sesion);
        }), this.anyadirFuncionalidadDragAndDrop(f);
      }
    );
  }
  renderizarSeccionBotonesAccionPanelActividad(e, n) {
    e.append("g").attr("class", "panelActividadZonaSeleccion").attr("id", "panelActividadZonaSeleccion_" + n.idActividad);
  }
  renderizarSeccionPieActividad(e, n) {
    const r = h.panelSesiones.anchoSesion ? h.panelSesiones.anchoSesion.toString() : "0", i = h.actividades?.mostrarPanelAcciones ? parseFloat(r) * h.actividades.porcentajeZonaSeleccionActividad / 100 : 0, a = h.actividades.altoSeccionPie ? h.actividades.altoSeccionPie : 0, o = {
      x: i,
      y: e.attr("height") - e.attr("altoSeccionPie"),
      height: a,
      width: e.attr("width") - i
    }, s = e.append("g").attr("class", "panelActividadSeccionPie").attr("id", "panelActividadSeccionPie_" + n.idActividad).attr("transform", `translate(${o.x},${o.y})`).attr("height", o.height).attr("width", o.width);
    s.append("rect").attr("height", o.height).attr("width", o.width).attr("fill", n.color), s.append("text").attr("x", o.width / 2).text(n.detalleActividad).attr("y", o.height / 2).attr("font-size", "0.8em").attr("dominant-baseline", "central").attr("text-anchor", "middle"), s.append("line").attr("x1", 0).attr("y1", 0).attr("x2", o.width).attr("y2", 0).attr("stroke-width", "0.5").attr("stroke", "grey");
  }
  renderizarSeccionContenidoPanelActividad(e, n, r, i) {
    const a = h.actividades.contenidoSecciones.length, o = {
      x: e.attr("x") + e.attr("altoSeccionPie"),
      y: e.attr("y"),
      height: e.attr("height") - e.attr("altoSeccionPie"),
      width: e.attr("width")
    }, s = h.actividades.mostrarPanelAcciones ? h.actividades.porcentajeZonaSeleccionActividad : 0;
    h.actividades.mostrarPanelAcciones && o.width * (s / 100);
    const c = {
      x: (r - 1) * (o.width * (1 - s / 100) / a) + o.width * (s / 100),
      y: o.y,
      height: o.height,
      width: o.width * (1 - s / 100) / a
    }, l = e.append("g").attr("class", "panelActividadSeccion panelActividadSeccion_" + r).attr("id", "panelActividadSeccion_" + r + "_" + n.idActividad).attr("transform", `translate(${c.x},0)`).attr("x", c.x).attr("y", c.y).attr("height", c.height).attr("width", c.width);
    l.append("rect").attr("height", c.height).attr("width", c.width + 1).attr("fill", n.color), r <= h.actividades.contenidoSecciones.length && l.append("line").attr("x1", c.width).attr("y1", 0).attr("x2", c.width).attr("y2", c.height).attr("stroke-width", "0.5").attr("stroke", "grey");
    const u = l.append("g").attr("class", "panelContenidoSeccion panelContenidoSeccion_" + r).attr("id", "panelContenidoSeccion_" + r + "_" + n.idActividad);
    l.append("rect").attr("id", "rectActivarGestionActividad_" + r + "_" + n.idActividad).attr("class", "rectActivarGestionActividad").attr("height", c.height).attr("width", c.width * (100 - s) / 100).attr("opacity", "0").on("click", (p, f, d) => {
      this.seleccionActividad$.next(f), h.actividades.mostrarMarcaSeleccionActividad && (C("#circuloActividadSeleccionada").remove(), e.append("circle").attr("id", "circuloActividadSeleccionada").attr("cx", e.attr("width") - 5).attr("cy", 4).attr("r", 3).attr("fill", "red"));
    }).on("mouseover", (p, f, d) => {
      this.entrandoEnActividad$.next(f), h.actividades.mostrarMarcaSeleccionActividad && e.append("circle").attr("id", "circuloActividadSobrevolada").attr("cx", e.attr("width") - 5).attr("cy", 4).attr("r", 3).attr("fill", "orange");
    }).on("mouseleave", (p, f, d) => {
      this.saliendoDeActividad$.next(f), C("#circuloActividadSobrevolada").remove();
    }), this.renderizarContenidoPanelesSeccionesActividades(u, i);
  }
  renderizarContenidoPanelesSeccionesActividades(e, n) {
    const r = C(e.node().parentNode), i = {
      x: parseFloat(r.attr("x")),
      y: parseFloat(r.attr("y")),
      width: parseFloat(r.attr("width")),
      height: parseFloat(r.attr("height"))
    };
    n && this.anyadirContenidoPanelesSeccion(e, n);
    const a = e.node().getBBox();
    i.height < a.height && (this.anyadirScrollSeccion(e), r.select(".rectActivarGestionActividad").attr("witdh", i.width - 5));
  }
  anyadirContenidoPanelesSeccion(e, n) {
    const r = parseFloat(h.actividades.tamanyoTexto), i = r / 3, a = e.node().parentNode.getBBox(), o = a.height, s = 0, c = r + i, l = n.length * c, u = s + (o - l) / 2, p = u > 0 ? u : 0;
    for (let d = 0; d < n.length; d++) {
      const m = n[d];
      var f = d * (r + i) + (a.height / 2 + (n.length - 1) * (r + i));
      f = p + d * c, e.append("text").attr("x", a.width / 2).text((w, E, N) => m).attr("y", f).attr("font-size", h.actividades.tamanyoTexto).attr("fill", "black").attr("dominant-baseline", "text-before-edge").attr("text-anchor", "middle");
    }
  }
  anyadirScrollSeccion(e) {
    const n = C(e.node().parentNode), r = {
      x: parseFloat(n.attr("x")),
      y: parseFloat(n.attr("y")),
      width: parseFloat(n.attr("width")),
      height: parseFloat(n.attr("height"))
    }, i = e.node().getBBox(), a = 5, o = r.height * r.height / i.height, s = r.height - o, c = i.height - r.height, l = n.append("g");
    l.append("rect").attr("rx", 2).attr("ry", 2).attr("width", a).attr("height", r.height).attr("fill", "#eee");
    const u = l.append("rect").attr("rx", 2).attr("ry", 2).attr("fill", "#777").attr("width", a).attr("height", o);
    l.attr("transform", `translate(${r.width - a},0)`), En().on("drag", function(d, m) {
      m.y = f(d.y - m.valorInicial, 0, s), u.attr("y", m.y), e.attr("transform", `translate(0,${-1 * c * m.y / s})`);
    }).on("start", function(d, m) {
      m.valorInicial = d.y;
    })(l);
    function f(d, m, w) {
      return d < m ? m : d > w ? w : d;
    }
  }
  actualizarActividadVisibleDeUnaSesion(e, n, r) {
    var i = !!e.srcElement.classList.contains("botonDerechoCabeceraSesionActividades");
    const a = h.panelSesiones.anchoSesion ? h.panelSesiones.anchoSesion.toString() : "0", o = C("#panelSesionActividades" + n.sesion.idSesion), s = o.attr("data-actividades").split(","), c = o.attr("data-actividadVisible");
    var l = s.indexOf(c);
    i && l < s.length - 1 && l++, !i && l > 0 && l--;
    const u = l === s.length - 1 ? "#ccc" : "white", p = l === 0 ? "#ccc" : "white";
    o.select(".botonIzquierdoCabeceraSesionActividades").attr("fill", p), o.select(".botonDerechoCabeceraSesionActividades").attr("fill", u), o.attr("data-actividadVisible", s[l]), o.selectAll(".panelActividad").attr("transform", function(f, d, m) {
      return `translate(${(d - l) * parseFloat(a)},0)`;
    });
  }
  anyadirFuncionalidadDragAndDrop(e) {
    e.call(
      En().on("start", this.dragstarted.bind(this)).on("drag", this.dragged.bind(this)).on("end", this.dragended.bind(this))
    );
  }
  dragstarted(e, n) {
    const r = C("g#panelActividad_" + e.subject.idActividad).clone(!0);
    r.select("foreignObject").remove(), r.attr("id", "panelActividadClone_" + e.subject.idActividad), r.attr("clip-path", "url(#rectanguloRecortadorParaClon)"), r.append("clipPath").attr("id", "rectanguloRecortadorParaClon").append("rect").attr("height", r.attr("height")).attr("width", r.attr("width"));
    const i = C("g#panelHorario");
    i.node().appendChild(r.node()), e.sourceEvent.toElement.classList.contains("fa-expand-arrows-alt") ? n.accion = "MOVERACTIVIDAD" : e.sourceEvent.toElement.classList.contains("fa-copy") && (n.accion = "DUPLICARACTIVIDAD"), n.valorInicialX = this.obtenerRectanguloAbsolutoSesion.bind(this, e.subject.sesion)().AbsX, n.valorInicialY = this.obtenerRectanguloAbsolutoSesion.bind(this, e.subject.sesion)().AbsY, r.attr("transform", "translate(" + n.valorInicialX + "," + n.valorInicialY + ")"), n.altoPanelHorario = i.attr("height"), n.anchoPanelHorario = i.attr("width") - r.attr("width"), n.altoActividadFlotante = r.attr("height"), n.anchoActividadFlotante = r.attr("width"), n.dx = n.valorInicialX, n.dy = n.valorInicialY, n.datosActividad = new rr(), n.datosActividad = {
      idActividad: e.subject.idActividad,
      sesion: e.subject.sesion,
      detalleActividad: e.subject.detalleActividad,
      docentes: e.subject.docentes,
      asignaturas: e.subject.asignaturas,
      grupos: e.subject.grupos,
      dependencia: e.subject.dependencia,
      periodoVigencia: e.subject.periodoVigencia,
      tipoActividad: e.subject.tipoActividad
    }, n.puntoMedio = {
      puntoMedioX: parseFloat(n.dx) + parseFloat(n.anchoActividadFlotante) / 2,
      puntoMedioY: parseFloat(n.dy) + parseFloat(n.altoActividadFlotante) / 2
    }, this.obtenerRectanguloAbsolutoSesiones.bind(this, ot(".panelSesion").data()), n.datosGraficosSesiones = this.obtenerRectanguloAbsolutoSesiones.bind(this, ot(".panelSesion").data())(), n.altoCabecera = h.panelSesiones.altoCabecera, i.append("rect").attr("id", "marcoTransicionMoverActividad").attr("fill", "rgba(3,5,6,0.3)").attr("stroke", "orange").attr("stroke-linecap", "butt").attr("stroke-width", "2");
  }
  dragged(e, n) {
    n.dx = r(n.dx + e.dx, 0, n.anchoPanelHorario), n.dy = r(n.dy + e.dy, n.altoCabecera, n.altoPanelHorario - n.altoCabecera), n.puntoMedio = {
      puntoMedioX: parseFloat(n.dx) + parseFloat(n.anchoActividadFlotante) / 2,
      puntoMedioY: parseFloat(n.dy) + parseFloat(n.altoActividadFlotante) / 2
    }, n.sesionSeleccionada1 = n.sesionSeleccionada, n.sesionSeleccionada = this.sesionSeleccionada.bind(this, n.puntoMedio, n.datosGraficosSesiones)(), n.sesionSeleccionada && (n.sesionSeleccionada1 !== n.sesionSeleccionada || !n.sesionSeleccionada1) && (n.datosActividad.sesion = this.plantilla.sesionesPlantilla.filter((i) => i.idSesion === n.sesionSeleccionada.idSesion)[0], C("#marcoTransicionMoverActividad").attr("height", n.sesionSeleccionada.alto).attr("width", n.sesionSeleccionada.ancho).attr("x", n.sesionSeleccionada.AbsX).attr("y", n.sesionSeleccionada.AbsY)), C("g#panelActividadClone_" + n.idActividad).attr("transform", "translate(" + n.dx + "," + n.dy + ")");
    function r(i, a, o) {
      return i < a ? a : i > o ? o : i;
    }
  }
  dragended(e, n) {
    C("g#panelActividadClone_" + n.idActividad).remove(), C("#marcoTransicionMoverActividad").remove(), n.accion === "MOVERACTIVIDAD" ? this.moverActividad$.next(n.datosActividad) : n.accion === "DUPLICARACTIVIDAD" && this.duplicarActividad$.next(n.datosActividad), n.accion = void 0;
  }
  obtenerRectanguloAbsolutoSesiones(e) {
    return e.map((n) => this.obtenerRectanguloAbsolutoSesion(n));
  }
  obtenerRectanguloAbsolutoSesion(e) {
    const r = x.obtenerDiasSemanaHorario().filter((u) => u.codigo === e.diaSemana)[0], i = parseFloat(h.panelSesiones.anchoSesion ? h.panelSesiones.anchoSesion.toString() : "0"), a = h.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(e.horaInicio)), s = h.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(e.horaFin)) - a - h.panelSesiones.altoCabecera, c = h.escalas.escalaHorizontal(r.denominacionLarga), l = a + +h.panelSesiones.altoCabecera;
    return { idSesion: e.idSesion, AbsX: parseInt(c), AbsY: parseInt(l), ancho: i, alto: s };
  }
  sesionSeleccionada(e, n) {
    return n.filter(
      (r) => r.AbsX <= e.puntoMedioX && e.puntoMedioX < r.AbsX + r.ancho && r.AbsY <= e.puntoMedioY && e.puntoMedioY < r.AbsY + r.alto
    )[0];
  }
  obtenerCadenasEntidadesHorario(e, n) {
    switch (n) {
      case "GRU":
        return e.grupos?.map((r) => r.codigo);
      case "DEP":
        return e.dependencia ? [e.dependencia.codigo] : [];
      case "CON":
        return h.actividades?.sobrescribirContenidoAreasPorTipo && e.asignaturas?.length === 0 ? [e.tipoActividad.codigo] : e.asignaturas?.map((r) => r.codigo);
      case "DOC":
        return e.docentes?.map((r) => r.alias);
      default:
        return [];
    }
  }
};
var kl = Dl;
export {
  kl as HorarioG
};
