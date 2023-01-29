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
function et(t) {
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
              var u = c.value;
              u.remove(this);
            }
          } catch (S) {
            e = { error: S };
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
      var l = this.initialTeardown;
      if (et(l))
        try {
          l();
        } catch (S) {
          a = S instanceof Ae ? S.errors : [S];
        }
      var d = this._finalizers;
      if (d) {
        this._finalizers = null;
        try {
          for (var f = Ne(d), h = f.next(); !h.done; h = f.next()) {
            var w = h.value;
            try {
              gn(w);
            } catch (S) {
              a = a ?? [], S instanceof Ae ? a = re(re([], ne(a)), ne(S.errors)) : a.push(S);
            }
          }
        } catch (S) {
          r = { error: S };
        } finally {
          try {
            h && !h.done && (i = f.return) && i.call(f);
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
  return t instanceof ge || t && "closed" in t && et(t.remove) && et(t.add) && et(t.unsubscribe);
}
function gn(t) {
  et(t) ? t() : t.unsubscribe();
}
var Be = {
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
var Gt = null;
function jt(t) {
  if (Be.useDeprecatedSynchronousErrorHandling) {
    var e = !Gt;
    if (e && (Gt = { errorThrown: !1, error: null }), t(), e) {
      var n = Gt, r = n.errorThrown, i = n.error;
      if (Gt = null, r)
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
        Xt(r);
      }
  }, t.prototype.error = function(e) {
    var n = this.partialObserver;
    if (n.error)
      try {
        n.error(e);
      } catch (r) {
        Xt(r);
      }
    else
      Xt(e);
  }, t.prototype.complete = function() {
    var e = this.partialObserver;
    if (e.complete)
      try {
        e.complete();
      } catch (n) {
        Xt(n);
      }
  }, t;
}(), ze = function(t) {
  pe(e, t);
  function e(n, r, i) {
    var a = t.call(this) || this, o;
    if (et(n) || !n)
      o = {
        next: n ?? void 0,
        error: r ?? void 0,
        complete: i ?? void 0
      };
    else {
      var s;
      a && Be.useDeprecatedNextContext ? (s = Object.create(n), s.unsubscribe = function() {
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
function Xt(t) {
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
    var i = this, a = li(e) ? e : new ze(e, n, r);
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
  return (e = t ?? Be.Promise) !== null && e !== void 0 ? e : Promise;
}
function ui(t) {
  return t && et(t.next) && et(t.error) && et(t.complete);
}
function li(t) {
  return t && t instanceof sr || ui(t) && or(t);
}
var fi = ir(function(t) {
  return function() {
    t(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), mt = function(t) {
  pe(e, t);
  function e() {
    var n = t.call(this) || this;
    return n.closed = !1, n.currentObservers = null, n.observers = [], n.isStopped = !1, n.hasError = !1, n.thrownError = null, n;
  }
  return e.prototype.lift = function(n) {
    var r = new wn(this, this);
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
        } catch (u) {
          i = { error: u };
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
    return new wn(n, r);
  }, e;
}(vn), wn = function(t) {
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
}(mt);
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
  function i(s, c, u = 0, l = s.length) {
    if (u < l) {
      if (e(c, c) !== 0)
        return l;
      do {
        const d = u + l >>> 1;
        n(s[d], c) < 0 ? u = d + 1 : l = d;
      } while (u < l);
    }
    return u;
  }
  function a(s, c, u = 0, l = s.length) {
    if (u < l) {
      if (e(c, c) !== 0)
        return l;
      do {
        const d = u + l >>> 1;
        n(s[d], c) <= 0 ? u = d + 1 : l = d;
      } while (u < l);
    }
    return u;
  }
  function o(s, c, u = 0, l = s.length) {
    const d = i(s, c, u, l - 1);
    return d > u && r(s[d - 1], c) > -r(s[d], c) ? d - 1 : d;
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
class Sn extends Map {
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
    return super.set(wi(this, e), n);
  }
  delete(e) {
    return super.delete(Si(this, e));
  }
}
function xn({ _intern: t, _key: e }, n) {
  const r = e(n);
  return t.has(r) ? t.get(r) : n;
}
function wi({ _intern: t, _key: e }, n) {
  const r = e(n);
  return t.has(r) ? t.get(r) : (t.set(r, n), n);
}
function Si({ _intern: t, _key: e }, n) {
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
var Qt = 1, Ce = 2, An = 3, kt = 4, _n = 1e-6;
function Hi(t) {
  return "translate(" + t + ",0)";
}
function Ei(t) {
  return "translate(0," + t + ")";
}
function Di(t) {
  return (e) => +t(e);
}
function Fi(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function ki() {
  return !this.__axis;
}
function cr(t, e) {
  var n = [], r = null, i = null, a = 6, o = 6, s = 3, c = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, u = t === Qt || t === kt ? -1 : 1, l = t === kt || t === Ce ? "x" : "y", d = t === Qt || t === An ? Hi : Ei;
  function f(h) {
    var w = r ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), S = i ?? (e.tickFormat ? e.tickFormat.apply(e, n) : Mi), E = Math.max(a, 0) + s, R = e.range(), N = +R[0] + c, D = +R[R.length - 1] + c, m = (e.bandwidth ? Fi : Di)(e.copy(), c), _ = h.selection ? h.selection() : h, v = _.selectAll(".domain").data([null]), b = _.selectAll(".tick").data(w, e).order(), F = b.exit(), U = b.enter().append("g").attr("class", "tick"), z = b.select("line"), P = b.select("text");
    v = v.merge(v.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), b = b.merge(U), z = z.merge(U.append("line").attr("stroke", "currentColor").attr(l + "2", u * a)), P = P.merge(U.append("text").attr("fill", "currentColor").attr(l, u * E).attr("dy", t === Qt ? "0em" : t === An ? "0.71em" : "0.32em")), h !== _ && (v = v.transition(h), b = b.transition(h), z = z.transition(h), P = P.transition(h), F = F.transition(h).attr("opacity", _n).attr("transform", function(V) {
      return isFinite(V = m(V)) ? d(V + c) : this.getAttribute("transform");
    }), U.attr("opacity", _n).attr("transform", function(V) {
      var J = this.parentNode.__axis;
      return d((J && isFinite(J = J(V)) ? J : m(V)) + c);
    })), F.remove(), v.attr("d", t === kt || t === Ce ? o ? "M" + u * o + "," + N + "H" + c + "V" + D + "H" + u * o : "M" + c + "," + N + "V" + D : o ? "M" + N + "," + u * o + "V" + c + "H" + D + "V" + u * o : "M" + N + "," + c + "H" + D), b.attr("opacity", 1).attr("transform", function(V) {
      return d(m(V) + c);
    }), z.attr(l + "2", u * a), P.attr(l, u * E).text(S), _.filter(ki).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === Ce ? "start" : t === kt ? "end" : "middle"), _.each(function() {
      this.__axis = m;
    });
  }
  return f.scale = function(h) {
    return arguments.length ? (e = h, f) : e;
  }, f.ticks = function() {
    return n = Array.from(arguments), f;
  }, f.tickArguments = function(h) {
    return arguments.length ? (n = h == null ? [] : Array.from(h), f) : n.slice();
  }, f.tickValues = function(h) {
    return arguments.length ? (r = h == null ? null : Array.from(h), f) : r && r.slice();
  }, f.tickFormat = function(h) {
    return arguments.length ? (i = h, f) : i;
  }, f.tickSize = function(h) {
    return arguments.length ? (a = o = +h, f) : a;
  }, f.tickSizeInner = function(h) {
    return arguments.length ? (a = +h, f) : a;
  }, f.tickSizeOuter = function(h) {
    return arguments.length ? (o = +h, f) : o;
  }, f.tickPadding = function(h) {
    return arguments.length ? (s = +h, f) : s;
  }, f.offset = function(h) {
    return arguments.length ? (c = +h, f) : c;
  }, f;
}
function Pi(t) {
  return cr(Qt, t);
}
function Ii(t) {
  return cr(kt, t);
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
function ur(t) {
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
    for (var a = e[i], o = a.length, s = r[i] = new Array(o), c, u, l = 0; l < o; ++l)
      (c = a[l]) && (u = t.call(c, c.__data__, l, a)) && ("__data__" in c && (u.__data__ = c.__data__), s[l] = u);
  return new $(r, this._parents);
}
function lr(t) {
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
    return lr(t.apply(this, arguments));
  };
}
function Gi(t) {
  typeof t == "function" ? t = Li(t) : t = fr(t);
  for (var e = this._groups, n = e.length, r = [], i = [], a = 0; a < n; ++a)
    for (var o = e[a], s = o.length, c, u = 0; u < s; ++u)
      (c = o[u]) && (r.push(t.call(c, c.__data__, u, o)), i.push(c));
  return new $(r, i);
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
var Xi = Array.prototype.find;
function qi(t) {
  return function() {
    return Xi.call(this.children, t);
  };
}
function Wi() {
  return this.firstElementChild;
}
function Bi(t) {
  return this.select(t == null ? Wi : qi(typeof t == "function" ? t : hr(t)));
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
    for (var a = e[i], o = a.length, s = r[i] = [], c, u = 0; u < o; ++u)
      (c = a[u]) && t.call(c, c.__data__, u, a) && s.push(c);
  return new $(r, this._parents);
}
function pr(t) {
  return new Array(t.length);
}
function ta() {
  return new $(this._enter || this._groups.map(pr), this._parents);
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
  for (var o = 0, s, c = e.length, u = a.length; o < u; ++o)
    (s = e[o]) ? (s.__data__ = a[o], r[o] = s) : n[o] = new ie(t, a[o]);
  for (; o < c; ++o)
    (s = e[o]) && (i[o] = s);
}
function ra(t, e, n, r, i, a, o) {
  var s, c, u = /* @__PURE__ */ new Map(), l = e.length, d = a.length, f = new Array(l), h;
  for (s = 0; s < l; ++s)
    (c = e[s]) && (f[s] = h = o.call(c, c.__data__, s, e) + "", u.has(h) ? i[s] = c : u.set(h, c));
  for (s = 0; s < d; ++s)
    h = o.call(t, a[s], s, a) + "", (c = u.get(h)) ? (r[s] = c, c.__data__ = a[s], u.delete(h)) : n[s] = new ie(t, a[s]);
  for (s = 0; s < l; ++s)
    (c = e[s]) && u.get(f[s]) === c && (i[s] = c);
}
function ia(t) {
  return t.__data__;
}
function aa(t, e) {
  if (!arguments.length)
    return Array.from(this, ia);
  var n = e ? ra : na, r = this._parents, i = this._groups;
  typeof t != "function" && (t = ea(t));
  for (var a = i.length, o = new Array(a), s = new Array(a), c = new Array(a), u = 0; u < a; ++u) {
    var l = r[u], d = i[u], f = d.length, h = oa(t.call(l, l && l.__data__, u, r)), w = h.length, S = s[u] = new Array(w), E = o[u] = new Array(w), R = c[u] = new Array(f);
    n(l, d, S, E, R, h, e);
    for (var N = 0, D = 0, m, _; N < w; ++N)
      if (m = S[N]) {
        for (N >= D && (D = N + 1); !(_ = E[D]) && ++D < w; )
          ;
        m._next = _ || null;
      }
  }
  return o = new $(o, r), o._enter = s, o._exit = c, o;
}
function oa(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function sa() {
  return new $(this._exit || this._groups.map(pr), this._parents);
}
function ca(t, e, n) {
  var r = this.enter(), i = this, a = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
function ua(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, a = r.length, o = Math.min(i, a), s = new Array(i), c = 0; c < o; ++c)
    for (var u = n[c], l = r[c], d = u.length, f = s[c] = new Array(d), h, w = 0; w < d; ++w)
      (h = u[w] || l[w]) && (f[w] = h);
  for (; c < i; ++c)
    s[c] = n[c];
  return new $(s, this._parents);
}
function la() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, a = r[i], o; --i >= 0; )
      (o = r[i]) && (a && o.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(o, a), a = o);
  return this;
}
function fa(t) {
  t || (t = da);
  function e(d, f) {
    return d && f ? t(d.__data__, f.__data__) : !d - !f;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), a = 0; a < r; ++a) {
    for (var o = n[a], s = o.length, c = i[a] = new Array(s), u, l = 0; l < s; ++l)
      (u = o[l]) && (c[l] = u);
    c.sort(e);
  }
  return new $(i, this._parents).order();
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
function wa(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Sa(t) {
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
  return this.each((e == null ? n.local ? Sa : wa : typeof e == "function" ? n.local ? _a : Aa : n.local ? ba : xa)(n, e));
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
function Ha(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function Ea(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Ta : typeof e == "function" ? Ha : Ma)(t, e, n ?? "")) : bt(this.node(), t);
}
function bt(t, e) {
  return t.style.getPropertyValue(e) || gr(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Da(t) {
  return function() {
    delete this[t];
  };
}
function Fa(t, e) {
  return function() {
    this[t] = e;
  };
}
function ka(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Pa(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Da : typeof e == "function" ? ka : Fa)(t, e)) : this.node()[t];
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
function wr(t, e) {
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
    wr(this, t);
  };
}
function Ua(t, e) {
  return function() {
    (e.apply(this, arguments) ? yr : wr)(this, t);
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
function Ga(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Xa(t) {
  return arguments.length ? this.each(t == null ? Va : (typeof t == "function" ? Ga : La)(t)) : this.node().innerHTML;
}
function qa() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Wa() {
  return this.each(qa);
}
function Ba() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Za() {
  return this.each(Ba);
}
function ja(t) {
  var e = typeof t == "function" ? t : ur(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Ja() {
  return null;
}
function Qa(t, e) {
  var n = typeof t == "function" ? t : ur(t), r = e == null ? Ja : typeof e == "function" ? e : Je(e);
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
function uo(t, e, n) {
  var r = oo(t + ""), i, a = r.length, o;
  if (arguments.length < 2) {
    var s = this.node().__on;
    if (s) {
      for (var c = 0, u = s.length, l; c < u; ++c)
        for (i = 0, l = s[c]; i < a; ++i)
          if ((o = r[i]).type === l.type && o.name === l.name)
            return l.value;
    }
    return;
  }
  for (s = e ? co : so, i = 0; i < a; ++i)
    this.each(s(r[i], e, n));
  return this;
}
function Sr(t, e, n) {
  var r = gr(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function lo(t, e) {
  return function() {
    return Sr(this, t, e);
  };
}
function fo(t, e) {
  return function() {
    return Sr(this, t, e.apply(this, arguments));
  };
}
function ho(t, e) {
  return this.each((typeof e == "function" ? fo : lo)(t, e));
}
function* po() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, a = r.length, o; i < a; ++i)
      (o = r[i]) && (yield o);
}
var Ke = [null];
function $(t, e) {
  this._groups = t, this._parents = e;
}
function Yt() {
  return new $([[document.documentElement]], Ke);
}
function go() {
  return this;
}
$.prototype = Yt.prototype = {
  constructor: $,
  select: Ri,
  selectAll: Gi,
  selectChild: Bi,
  selectChildren: Qi,
  filter: Ki,
  data: aa,
  enter: ta,
  exit: sa,
  join: ca,
  merge: ua,
  selection: go,
  order: la,
  sort: fa,
  call: ha,
  nodes: pa,
  node: ga,
  size: ma,
  empty: va,
  each: ya,
  attr: Ca,
  style: Ea,
  property: Pa,
  classed: $a,
  text: Ra,
  html: Xa,
  raise: Wa,
  lower: Za,
  append: ja,
  insert: Qa,
  remove: to,
  clone: ro,
  datum: io,
  on: uo,
  dispatch: ho,
  [Symbol.iterator]: po
};
function C(t) {
  return typeof t == "string" ? new $([[document.querySelector(t)]], [document.documentElement]) : new $([[t]], Ke);
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
function at(t) {
  return typeof t == "string" ? new $([document.querySelectorAll(t)], [document.documentElement]) : new $([lr(t)], Ke);
}
const vo = { passive: !1 }, Nt = { capture: !0, passive: !1 };
function Te(t) {
  t.stopImmediatePropagation();
}
function St(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function yo(t) {
  var e = t.document.documentElement, n = C(t).on("dragstart.drag", St, Nt);
  "onselectstart" in e ? n.on("selectstart.drag", St, Nt) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function wo(t, e) {
  var n = t.document.documentElement, r = C(t).on("dragstart.drag", null);
  e && (r.on("click.drag", St, Nt), setTimeout(function() {
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
  dy: u,
  dispatch: l
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
    dy: { value: u, enumerable: !0, configurable: !0 },
    _: { value: l }
  });
}
Oe.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function So(t) {
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
function Hn() {
  var t = So, e = xo, n = bo, r = Ao, i = {}, a = je("start", "drag", "end"), o = 0, s, c, u, l, d = 0;
  function f(m) {
    m.on("mousedown.drag", h).filter(r).on("touchstart.drag", E).on("touchmove.drag", R, vo).on("touchend.drag touchcancel.drag", N).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function h(m, _) {
    if (!(l || !t.call(this, m, _))) {
      var v = D(this, e.call(this, m, _), m, _, "mouse");
      v && (C(m.view).on("mousemove.drag", w, Nt).on("mouseup.drag", S, Nt), yo(m.view), Te(m), u = !1, s = m.clientX, c = m.clientY, v("start", m));
    }
  }
  function w(m) {
    if (St(m), !u) {
      var _ = m.clientX - s, v = m.clientY - c;
      u = _ * _ + v * v > d;
    }
    i.mouse("drag", m);
  }
  function S(m) {
    C(m.view).on("mousemove.drag mouseup.drag", null), wo(m.view, u), St(m), i.mouse("end", m);
  }
  function E(m, _) {
    if (t.call(this, m, _)) {
      var v = m.changedTouches, b = e.call(this, m, _), F = v.length, U, z;
      for (U = 0; U < F; ++U)
        (z = D(this, b, m, _, v[U].identifier, v[U])) && (Te(m), z("start", m, v[U]));
    }
  }
  function R(m) {
    var _ = m.changedTouches, v = _.length, b, F;
    for (b = 0; b < v; ++b)
      (F = i[_[b].identifier]) && (St(m), F("drag", m, _[b]));
  }
  function N(m) {
    var _ = m.changedTouches, v = _.length, b, F;
    for (l && clearTimeout(l), l = setTimeout(function() {
      l = null;
    }, 500), b = 0; b < v; ++b)
      (F = i[_[b].identifier]) && (Te(m), F("end", m, _[b]));
  }
  function D(m, _, v, b, F, U) {
    var z = a.copy(), P = Mn(U || v, _), V, J, pt;
    if ((pt = n.call(m, new Oe("beforestart", {
      sourceEvent: v,
      target: f,
      identifier: F,
      active: o,
      x: P[0],
      y: P[1],
      dx: 0,
      dy: 0,
      dispatch: z
    }), b)) != null)
      return V = pt.x - P[0] || 0, J = pt.y - P[1] || 0, function xe(Tt, Vt, be) {
        var Lt = P, Mt;
        switch (Tt) {
          case "start":
            i[F] = xe, Mt = o++;
            break;
          case "end":
            delete i[F], --o;
          case "drag":
            P = Mn(be || Vt, _), Mt = o;
            break;
        }
        z.call(
          Tt,
          m,
          new Oe(Tt, {
            sourceEvent: Vt,
            subject: pt,
            target: f,
            identifier: F,
            active: Mt,
            x: P[0] + V,
            y: P[1] + J,
            dx: P[0] - Lt[0],
            dy: P[1] - Lt[1],
            dispatch: z
          }),
          b
        );
      };
  }
  return f.filter = function(m) {
    return arguments.length ? (t = typeof m == "function" ? m : qt(!!m), f) : t;
  }, f.container = function(m) {
    return arguments.length ? (e = typeof m == "function" ? m : qt(m), f) : e;
  }, f.subject = function(m) {
    return arguments.length ? (n = typeof m == "function" ? m : qt(m), f) : n;
  }, f.touchable = function(m) {
    return arguments.length ? (r = typeof m == "function" ? m : qt(!!m), f) : r;
  }, f.on = function() {
    var m = a.on.apply(a, arguments);
    return m === a ? f : m;
  }, f.clickDistance = function(m) {
    return arguments.length ? (d = (m = +m) * m, f) : Math.sqrt(d);
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
var Ut = 0.7, ae = 1 / Ut, xt = "\\s*([+-]?\\d+)\\s*", $t = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Z = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", _o = /^#([0-9a-f]{3,8})$/, Co = new RegExp(`^rgb\\(${xt},${xt},${xt}\\)$`), To = new RegExp(`^rgb\\(${Z},${Z},${Z}\\)$`), Mo = new RegExp(`^rgba\\(${xt},${xt},${xt},${$t}\\)$`), Ho = new RegExp(`^rgba\\(${Z},${Z},${Z},${$t}\\)$`), Eo = new RegExp(`^hsl\\(${$t},${Z},${Z}\\)$`), Do = new RegExp(`^hsla\\(${$t},${Z},${Z},${$t}\\)$`), En = {
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
tn(Ot, lt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Dn,
  formatHex: Dn,
  formatHex8: Fo,
  formatHsl: ko,
  formatRgb: Fn,
  toString: Fn
});
function Dn() {
  return this.rgb().formatHex();
}
function Fo() {
  return this.rgb().formatHex8();
}
function ko() {
  return br(this).formatHsl();
}
function Fn() {
  return this.rgb().formatRgb();
}
function lt(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = _o.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? kn(e) : n === 3 ? new O(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Wt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Wt(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Co.exec(t)) ? new O(e[1], e[2], e[3], 1) : (e = To.exec(t)) ? new O(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Mo.exec(t)) ? Wt(e[1], e[2], e[3], e[4]) : (e = Ho.exec(t)) ? Wt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Eo.exec(t)) ? Nn(e[1], e[2] / 100, e[3] / 100, 1) : (e = Do.exec(t)) ? Nn(e[1], e[2] / 100, e[3] / 100, e[4]) : En.hasOwnProperty(t) ? kn(En[t]) : t === "transparent" ? new O(NaN, NaN, NaN, 0) : null;
}
function kn(t) {
  return new O(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Wt(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new O(t, e, n, r);
}
function Po(t) {
  return t instanceof Ot || (t = lt(t)), t ? (t = t.rgb(), new O(t.r, t.g, t.b, t.opacity)) : new O();
}
function Re(t, e, n, r) {
  return arguments.length === 1 ? Po(t) : new O(t, e, n, r ?? 1);
}
function O(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
tn(O, Re, xr(Ot, {
  brighter(t) {
    return t = t == null ? ae : Math.pow(ae, t), new O(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ut : Math.pow(Ut, t), new O(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new O(ut(this.r), ut(this.g), ut(this.b), oe(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Pn,
  formatHex: Pn,
  formatHex8: Io,
  formatRgb: In,
  toString: In
}));
function Pn() {
  return `#${ct(this.r)}${ct(this.g)}${ct(this.b)}`;
}
function Io() {
  return `#${ct(this.r)}${ct(this.g)}${ct(this.b)}${ct((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
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
function ct(t) {
  return t = ut(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Nn(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new W(t, e, n, r);
}
function br(t) {
  if (t instanceof W)
    return new W(t.h, t.s, t.l, t.opacity);
  if (t instanceof Ot || (t = lt(t)), !t)
    return new W();
  if (t instanceof W)
    return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), a = Math.max(e, n, r), o = NaN, s = a - i, c = (a + i) / 2;
  return s ? (e === a ? o = (n - r) / s + (n < r) * 6 : n === a ? o = (r - e) / s + 2 : o = (e - n) / s + 4, s /= c < 0.5 ? a + i : 2 - a - i, o *= 60) : s = c > 0 && c < 1 ? 0 : o, new W(o, s, c, t.opacity);
}
function No(t, e, n, r) {
  return arguments.length === 1 ? br(t) : new W(t, e, n, r ?? 1);
}
function W(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
tn(W, No, xr(Ot, {
  brighter(t) {
    return t = t == null ? ae : Math.pow(ae, t), new W(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ut : Math.pow(Ut, t), new W(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new O(
      Me(t >= 240 ? t - 240 : t + 120, i, r),
      Me(t, i, r),
      Me(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new W(Un(this.h), Bt(this.s), Bt(this.l), oe(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = oe(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Un(this.h)}, ${Bt(this.s) * 100}%, ${Bt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Un(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Bt(t) {
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
    var o = n((i = Re(i)).r, (a = Re(a)).r), s = n(i.g, a.g), c = n(i.b, a.b), u = Ar(i.opacity, a.opacity);
    return function(l) {
      return i.r = o(l), i.g = s(l), i.b = c(l), i.opacity = u(l), i + "";
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
var Ve = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, He = new RegExp(Ve.source, "g");
function Go(t) {
  return function() {
    return t;
  };
}
function Xo(t) {
  return function(e) {
    return t(e) + "";
  };
}
function _r(t, e) {
  var n = Ve.lastIndex = He.lastIndex = 0, r, i, a, o = -1, s = [], c = [];
  for (t = t + "", e = e + ""; (r = Ve.exec(t)) && (i = He.exec(e)); )
    (a = i.index) > n && (a = e.slice(n, a), s[o] ? s[o] += a : s[++o] = a), (r = r[0]) === (i = i[0]) ? s[o] ? s[o] += i : s[++o] = i : (s[++o] = null, c.push({ i: o, x: q(r, i) })), n = He.lastIndex;
  return n < e.length && (a = e.slice(n), s[o] ? s[o] += a : s[++o] = a), s.length < 2 ? c[0] ? Xo(c[0].x) : Go(e) : (e = c.length, function(u) {
    for (var l = 0, d; l < e; ++l)
      s[(d = c[l]).i] = d.x(u);
    return s.join("");
  });
}
function nn(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? en(e) : (n === "number" ? q : n === "string" ? (r = lt(e)) ? (e = r, se) : _r : e instanceof lt ? se : e instanceof Date ? Vo : Oo(e) ? Yo : Array.isArray(e) ? Ro : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Lo : q)(t, e);
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
function Wo(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Le : Cr(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Bo(t) {
  return t == null || (Zt || (Zt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Zt.setAttribute("transform", t), !(t = Zt.transform.baseVal.consolidate())) ? Le : (t = t.matrix, Cr(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Tr(t, e, n, r) {
  function i(u) {
    return u.length ? u.pop() + " " : "";
  }
  function a(u, l, d, f, h, w) {
    if (u !== d || l !== f) {
      var S = h.push("translate(", null, e, null, n);
      w.push({ i: S - 4, x: q(u, d) }, { i: S - 2, x: q(l, f) });
    } else
      (d || f) && h.push("translate(" + d + e + f + n);
  }
  function o(u, l, d, f) {
    u !== l ? (u - l > 180 ? l += 360 : l - u > 180 && (u += 360), f.push({ i: d.push(i(d) + "rotate(", null, r) - 2, x: q(u, l) })) : l && d.push(i(d) + "rotate(" + l + r);
  }
  function s(u, l, d, f) {
    u !== l ? f.push({ i: d.push(i(d) + "skewX(", null, r) - 2, x: q(u, l) }) : l && d.push(i(d) + "skewX(" + l + r);
  }
  function c(u, l, d, f, h, w) {
    if (u !== d || l !== f) {
      var S = h.push(i(h) + "scale(", null, ",", null, ")");
      w.push({ i: S - 4, x: q(u, d) }, { i: S - 2, x: q(l, f) });
    } else
      (d !== 1 || f !== 1) && h.push(i(h) + "scale(" + d + "," + f + ")");
  }
  return function(u, l) {
    var d = [], f = [];
    return u = t(u), l = t(l), a(u.translateX, u.translateY, l.translateX, l.translateY, d, f), o(u.rotate, l.rotate, d, f), s(u.skewX, l.skewX, d, f), c(u.scaleX, u.scaleY, l.scaleX, l.scaleY, d, f), u = l = null, function(h) {
      for (var w = -1, S = f.length, E; ++w < S; )
        d[(E = f[w]).i] = E.x(h);
      return d.join("");
    };
  };
}
var Zo = Tr(Wo, "px, ", "px)", "deg)"), jo = Tr(Bo, ", ", ")", ")"), At = 0, Pt = 0, Ht = 0, Mr = 1e3, ce, It, ue = 0, ft = 0, ve = 0, zt = typeof performance == "object" && performance.now ? performance : Date, Hr = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function rn() {
  return ft || (Hr(Jo), ft = zt.now() + ve);
}
function Jo() {
  ft = 0;
}
function le() {
  this._call = this._time = this._next = null;
}
le.prototype = Er.prototype = {
  constructor: le,
  restart: function(t, e, n) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? rn() : +n) + (e == null ? 0 : +e), !this._next && It !== this && (It ? It._next = this : ce = this, It = this), this._call = t, this._time = n, Ge();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ge());
  }
};
function Er(t, e, n) {
  var r = new le();
  return r.restart(t, e, n), r;
}
function Qo() {
  rn(), ++At;
  for (var t = ce, e; t; )
    (e = ft - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --At;
}
function zn() {
  ft = (ue = zt.now()) + ve, At = Pt = 0;
  try {
    Qo();
  } finally {
    At = 0, ts(), ft = 0;
  }
}
function Ko() {
  var t = zt.now(), e = t - ue;
  e > Mr && (ve -= e, ue = t);
}
function ts() {
  for (var t, e = ce, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : ce = n);
  It = t, Ge(r);
}
function Ge(t) {
  if (!At) {
    Pt && (Pt = clearTimeout(Pt));
    var e = t - ft;
    e > 24 ? (t < 1 / 0 && (Pt = setTimeout(zn, t - zt.now() - ve)), Ht && (Ht = clearInterval(Ht))) : (Ht || (ue = zt.now(), Ht = setInterval(Ko, Mr)), At = 1, Hr(zn));
  }
}
function Yn(t, e, n) {
  var r = new le();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var es = je("start", "end", "cancel", "interrupt"), ns = [], Dr = 0, On = 1, Xe = 2, te = 3, Rn = 4, qe = 5, ee = 6;
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
    state: Dr
  });
}
function an(t, e) {
  var n = B(t, e);
  if (n.state > Dr)
    throw new Error("too late; already scheduled");
  return n;
}
function j(t, e) {
  var n = B(t, e);
  if (n.state > te)
    throw new Error("too late; already running");
  return n;
}
function B(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e]))
    throw new Error("transition not found");
  return n;
}
function rs(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = Er(a, 0, n.time);
  function a(u) {
    n.state = On, n.timer.restart(o, n.delay, n.time), n.delay <= u && o(u - n.delay);
  }
  function o(u) {
    var l, d, f, h;
    if (n.state !== On)
      return c();
    for (l in r)
      if (h = r[l], h.name === n.name) {
        if (h.state === te)
          return Yn(o);
        h.state === Rn ? (h.state = ee, h.timer.stop(), h.on.call("interrupt", t, t.__data__, h.index, h.group), delete r[l]) : +l < e && (h.state = ee, h.timer.stop(), h.on.call("cancel", t, t.__data__, h.index, h.group), delete r[l]);
      }
    if (Yn(function() {
      n.state === te && (n.state = Rn, n.timer.restart(s, n.delay, n.time), s(u));
    }), n.state = Xe, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Xe) {
      for (n.state = te, i = new Array(f = n.tween.length), l = 0, d = -1; l < f; ++l)
        (h = n.tween[l].value.call(t, t.__data__, n.index, n.group)) && (i[++d] = h);
      i.length = d + 1;
    }
  }
  function s(u) {
    for (var l = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(c), n.state = qe, 1), d = -1, f = i.length; ++d < f; )
      i[d].call(t, l);
    n.state === qe && (n.on.call("end", t, t.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = ee, n.timer.stop(), delete r[e];
    for (var u in r)
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
      i = r.state > Xe && r.state < qe, r.state = ee, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[o];
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
    var i = j(this, t), a = i.tween;
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
    var a = j(this, t), o = a.tween;
    if (o !== r) {
      i = (r = o).slice();
      for (var s = { name: e, value: n }, c = 0, u = i.length; c < u; ++c)
        if (i[c].name === e) {
          i[c] = s;
          break;
        }
      c === u && i.push(s);
    }
    a.tween = i;
  };
}
function cs(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = B(this.node(), n).tween, i = 0, a = r.length, o; i < a; ++i)
      if ((o = r[i]).name === t)
        return o.value;
    return null;
  }
  return this.each((e == null ? os : ss)(n, t, e));
}
function on(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = j(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return B(i, r).value[e];
  };
}
function Fr(t, e) {
  var n;
  return (typeof e == "number" ? q : e instanceof lt ? se : (n = lt(e)) ? (e = n, se) : _r)(t, e);
}
function us(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function ls(t) {
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
  var n = me(t), r = n === "transform" ? jo : Fr;
  return this.attrTween(t, typeof e == "function" ? (n.local ? ps : hs)(n, r, on(this, "attr." + t, e)) : e == null ? (n.local ? ls : us)(n) : (n.local ? ds : fs)(n, r, e));
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
function ws(t, e) {
  var n, r;
  function i() {
    var a = e.apply(this, arguments);
    return a !== r && (n = (r = a) && ms(t, a)), n;
  }
  return i._value = e, i;
}
function Ss(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (e == null)
    return this.tween(n, null);
  if (typeof e != "function")
    throw new Error();
  var r = me(t);
  return this.tween(n, (r.local ? ys : ws)(r, e));
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
  return arguments.length ? this.each((typeof t == "function" ? xs : bs)(e, t)) : B(this.node(), e).delay;
}
function _s(t, e) {
  return function() {
    j(this, t).duration = +e.apply(this, arguments);
  };
}
function Cs(t, e) {
  return e = +e, function() {
    j(this, t).duration = e;
  };
}
function Ts(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? _s : Cs)(e, t)) : B(this.node(), e).duration;
}
function Ms(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    j(this, t).ease = e;
  };
}
function Hs(t) {
  var e = this._id;
  return arguments.length ? this.each(Ms(e, t)) : B(this.node(), e).ease;
}
function Es(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    j(this, t).ease = n;
  };
}
function Ds(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(Es(this._id, t));
}
function Fs(t) {
  typeof t != "function" && (t = dr(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], o = a.length, s = r[i] = [], c, u = 0; u < o; ++u)
      (c = a[u]) && t.call(c, c.__data__, u, a) && s.push(c);
  return new nt(r, this._parents, this._name, this._id);
}
function ks(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, a = Math.min(r, i), o = new Array(r), s = 0; s < a; ++s)
    for (var c = e[s], u = n[s], l = c.length, d = o[s] = new Array(l), f, h = 0; h < l; ++h)
      (f = c[h] || u[h]) && (d[h] = f);
  for (; s < r; ++s)
    o[s] = e[s];
  return new nt(o, this._parents, this._name, this._id);
}
function Ps(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function Is(t, e, n) {
  var r, i, a = Ps(e) ? an : j;
  return function() {
    var o = a(this, t), s = o.on;
    s !== r && (i = (r = s).copy()).on(e, n), o.on = i;
  };
}
function Ns(t, e) {
  var n = this._id;
  return arguments.length < 2 ? B(this.node(), n).on.on(t) : this.each(Is(n, t, e));
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
    for (var s = r[o], c = s.length, u = a[o] = new Array(c), l, d, f = 0; f < c; ++f)
      (l = s[f]) && (d = t.call(l, l.__data__, f, s)) && ("__data__" in l && (d.__data__ = l.__data__), u[f] = d, ye(u[f], e, n, f, u, B(l, n)));
  return new nt(a, this._parents, e, n);
}
function Ys(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = fr(t));
  for (var r = this._groups, i = r.length, a = [], o = [], s = 0; s < i; ++s)
    for (var c = r[s], u = c.length, l, d = 0; d < u; ++d)
      if (l = c[d]) {
        for (var f = t.call(l, l.__data__, d, c), h, w = B(l, n), S = 0, E = f.length; S < E; ++S)
          (h = f[S]) && ye(h, e, n, S, f, w);
        a.push(f), o.push(l);
      }
  return new nt(a, o, e, n);
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
function kr(t) {
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
function Gs(t, e, n) {
  var r, i, a;
  return function() {
    var o = bt(this, t), s = n(this), c = s + "";
    return s == null && (c = s = (this.style.removeProperty(t), bt(this, t))), o === c ? null : o === r && c === i ? a : (i = c, a = e(r = o, s));
  };
}
function Xs(t, e) {
  var n, r, i, a = "style." + e, o = "end." + a, s;
  return function() {
    var c = j(this, t), u = c.on, l = c.value[a] == null ? s || (s = kr(e)) : void 0;
    (u !== n || i !== l) && (r = (n = u).copy()).on(o, i = l), c.on = r;
  };
}
function qs(t, e, n) {
  var r = (t += "") == "transform" ? Zo : Fr;
  return e == null ? this.styleTween(t, Vs(t, r)).on("end.style." + t, kr(t)) : typeof e == "function" ? this.styleTween(t, Gs(t, r, on(this, "style." + t, e))).each(Xs(this._id, t)) : this.styleTween(t, Ls(t, r, e), n).on("end.style." + t, null);
}
function Ws(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Bs(t, e, n) {
  var r, i;
  function a() {
    var o = e.apply(this, arguments);
    return o !== i && (r = (i = o) && Ws(t, o, n)), r;
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
  return this.tween(r, Bs(t, e, n ?? ""));
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
  for (var t = this._name, e = this._id, n = Pr(), r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var o = r[a], s = o.length, c, u = 0; u < s; ++u)
      if (c = o[u]) {
        var l = B(c, e);
        ye(c, t, n, u, o, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease
        });
      }
  return new nt(r, this._parents, t, n);
}
function rc() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(a, o) {
    var s = { value: o }, c = { value: function() {
      --i === 0 && a();
    } };
    n.each(function() {
      var u = j(this, r), l = u.on;
      l !== t && (e = (t = l).copy(), e._.cancel.push(s), e._.interrupt.push(s), e._.end.push(c)), u.on = e;
    }), i === 0 && a();
  });
}
var ic = 0;
function nt(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function Pr() {
  return ++ic;
}
var Q = Yt.prototype;
nt.prototype = {
  constructor: nt,
  select: zs,
  selectAll: Ys,
  selectChild: Q.selectChild,
  selectChildren: Q.selectChildren,
  filter: Fs,
  merge: ks,
  selection: Rs,
  transition: nc,
  call: Q.call,
  nodes: Q.nodes,
  node: Q.node,
  size: Q.size,
  empty: Q.empty,
  each: Q.each,
  on: Ns,
  attr: gs,
  attrTween: Ss,
  style: qs,
  styleTween: Zs,
  text: Qs,
  textTween: ec,
  remove: $s,
  tween: cs,
  delay: As,
  duration: Ts,
  ease: Hs,
  easeVarying: Ds,
  end: rc,
  [Symbol.iterator]: Q[Symbol.iterator]
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
  t instanceof nt ? (e = t._id, t = t._name) : (e = Pr(), (n = oc).time = rn(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var o = r[a], s = o.length, c, u = 0; u < s; ++u)
      (c = o[u]) && ye(c, t, e, u, o, n || sc(c, e));
  return new nt(r, this._parents, t, e);
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
  var t = new Sn(), e = [], n = [], r = Vn;
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
    e = [], t = new Sn();
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
  var t = Ir().unknown(void 0), e = t.domain, n = t.range, r = 0, i = 1, a, o, s = !1, c = 0, u = 0, l = 0.5;
  delete t.unknown;
  function d() {
    var f = e().length, h = i < r, w = h ? i : r, S = h ? r : i;
    a = (S - w) / Math.max(1, f - c + u * 2), s && (a = Math.floor(a)), w += (S - w - a * (f - c)) * l, o = a * (1 - c), s && (w = Math.round(w), o = Math.round(o));
    var E = Ti(f).map(function(R) {
      return w + a * R;
    });
    return n(h ? E.reverse() : E);
  }
  return t.domain = function(f) {
    return arguments.length ? (e(f), d()) : e();
  }, t.range = function(f) {
    return arguments.length ? ([r, i] = f, r = +r, i = +i, d()) : [r, i];
  }, t.rangeRound = function(f) {
    return [r, i] = f, r = +r, i = +i, s = !0, d();
  }, t.bandwidth = function() {
    return o;
  }, t.step = function() {
    return a;
  }, t.round = function(f) {
    return arguments.length ? (s = !!f, d()) : s;
  }, t.padding = function(f) {
    return arguments.length ? (c = Math.min(1, u = +f), d()) : c;
  }, t.paddingInner = function(f) {
    return arguments.length ? (c = Math.min(1, f), d()) : c;
  }, t.paddingOuter = function(f) {
    return arguments.length ? (u = +f, d()) : u;
  }, t.align = function(f) {
    return arguments.length ? (l = Math.max(0, Math.min(1, f)), d()) : l;
  }, t.copy = function() {
    return Nr(e(), [r, i]).round(s).paddingInner(c).paddingOuter(u).align(l);
  }, sn.apply(d(), arguments);
}
function uc(t) {
  return function() {
    return t;
  };
}
function lc(t) {
  return +t;
}
var Ln = [0, 1];
function vt(t) {
  return t;
}
function We(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : uc(isNaN(e) ? NaN : 0.5);
}
function fc(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(r) {
    return Math.max(t, Math.min(e, r));
  };
}
function dc(t, e, n) {
  var r = t[0], i = t[1], a = e[0], o = e[1];
  return i < r ? (r = We(i, r), a = n(o, a)) : (r = We(r, i), a = n(a, o)), function(s) {
    return a(r(s));
  };
}
function hc(t, e, n) {
  var r = Math.min(t.length, e.length) - 1, i = new Array(r), a = new Array(r), o = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++o < r; )
    i[o] = We(t[o], t[o + 1]), a[o] = n(e[o], e[o + 1]);
  return function(s) {
    var c = yi(t, s, 1, r) - 1;
    return a[c](i[c](s));
  };
}
function pc(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function gc() {
  var t = Ln, e = Ln, n = nn, r, i, a, o = vt, s, c, u;
  function l() {
    var f = Math.min(t.length, e.length);
    return o !== vt && (o = fc(t[0], t[f - 1])), s = f > 2 ? hc : dc, c = u = null, d;
  }
  function d(f) {
    return f == null || isNaN(f = +f) ? a : (c || (c = s(t.map(r), e, n)))(r(o(f)));
  }
  return d.invert = function(f) {
    return o(i((u || (u = s(e, t.map(r), q)))(f)));
  }, d.domain = function(f) {
    return arguments.length ? (t = Array.from(f, lc), l()) : t.slice();
  }, d.range = function(f) {
    return arguments.length ? (e = Array.from(f), l()) : e.slice();
  }, d.rangeRound = function(f) {
    return e = Array.from(f), n = qo, l();
  }, d.clamp = function(f) {
    return arguments.length ? (o = f ? !0 : vt, l()) : o !== vt;
  }, d.interpolate = function(f) {
    return arguments.length ? (n = f, l()) : n;
  }, d.unknown = function(f) {
    return arguments.length ? (a = f, d) : a;
  }, function(f, h) {
    return r = f, i = h, l();
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
const Ee = new Date(), De = new Date();
function k(t, e, n, r) {
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
    let u;
    do
      c.push(u = new Date(+a)), e(a, s), t(a);
    while (u < a && a < o);
    return c;
  }, i.filter = (a) => k((o) => {
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
  }), n && (i.count = (a, o) => (Ee.setTime(+a), De.setTime(+o), t(Ee), t(De), Math.floor(n(Ee, De))), i.every = (a) => (a = Math.floor(a), !isFinite(a) || !(a > 0) ? null : a > 1 ? i.filter(r ? (o) => r(o) % a === 0 : (o) => i.count(0, o) % a === 0) : i)), i;
}
const fe = k(() => {
}, (t, e) => {
  t.setTime(+t + e);
}, (t, e) => e - t);
fe.every = (t) => (t = Math.floor(t), !isFinite(t) || !(t > 0) ? null : t > 1 ? k((e) => {
  e.setTime(Math.floor(e / t) * t);
}, (e, n) => {
  e.setTime(+e + n * t);
}, (e, n) => (n - e) / t) : fe);
fe.range;
const K = 1e3, X = K * 60, tt = X * 60, rt = tt * 24, cn = rt * 7, Gn = rt * 30, Fe = rt * 365, yt = k((t) => {
  t.setTime(t - t.getMilliseconds());
}, (t, e) => {
  t.setTime(+t + e * K);
}, (t, e) => (e - t) / K, (t) => t.getUTCSeconds());
yt.range;
const we = k((t) => {
  t.setTime(t - t.getMilliseconds() - t.getSeconds() * K);
}, (t, e) => {
  t.setTime(+t + e * X);
}, (t, e) => (e - t) / X, (t) => t.getMinutes());
we.range;
const Ur = k((t) => {
  t.setUTCSeconds(0, 0);
}, (t, e) => {
  t.setTime(+t + e * X);
}, (t, e) => (e - t) / X, (t) => t.getUTCMinutes());
Ur.range;
const un = k((t) => {
  t.setTime(t - t.getMilliseconds() - t.getSeconds() * K - t.getMinutes() * X);
}, (t, e) => {
  t.setTime(+t + e * tt);
}, (t, e) => (e - t) / tt, (t) => t.getHours());
un.range;
const $r = k((t) => {
  t.setUTCMinutes(0, 0, 0);
}, (t, e) => {
  t.setTime(+t + e * tt);
}, (t, e) => (e - t) / tt, (t) => t.getUTCHours());
$r.range;
const Rt = k(
  (t) => t.setHours(0, 0, 0, 0),
  (t, e) => t.setDate(t.getDate() + e),
  (t, e) => (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * X) / rt,
  (t) => t.getDate() - 1
);
Rt.range;
const ln = k((t) => {
  t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCDate(t.getUTCDate() + e);
}, (t, e) => (e - t) / rt, (t) => t.getUTCDate() - 1);
ln.range;
const zr = k((t) => {
  t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCDate(t.getUTCDate() + e);
}, (t, e) => (e - t) / rt, (t) => Math.floor(t / rt));
zr.range;
function dt(t) {
  return k((e) => {
    e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0);
  }, (e, n) => {
    e.setDate(e.getDate() + n * 7);
  }, (e, n) => (n - e - (n.getTimezoneOffset() - e.getTimezoneOffset()) * X) / cn);
}
const Se = dt(0), de = dt(1), yc = dt(2), wc = dt(3), _t = dt(4), Sc = dt(5), xc = dt(6);
Se.range;
de.range;
yc.range;
wc.range;
_t.range;
Sc.range;
xc.range;
function ht(t) {
  return k((e) => {
    e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0);
  }, (e, n) => {
    e.setUTCDate(e.getUTCDate() + n * 7);
  }, (e, n) => (n - e) / cn);
}
const fn = ht(0), he = ht(1), bc = ht(2), Ac = ht(3), Ct = ht(4), _c = ht(5), Cc = ht(6);
fn.range;
he.range;
bc.range;
Ac.range;
Ct.range;
_c.range;
Cc.range;
const dn = k((t) => {
  t.setDate(1), t.setHours(0, 0, 0, 0);
}, (t, e) => {
  t.setMonth(t.getMonth() + e);
}, (t, e) => e.getMonth() - t.getMonth() + (e.getFullYear() - t.getFullYear()) * 12, (t) => t.getMonth());
dn.range;
const Yr = k((t) => {
  t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCMonth(t.getUTCMonth() + e);
}, (t, e) => e.getUTCMonth() - t.getUTCMonth() + (e.getUTCFullYear() - t.getUTCFullYear()) * 12, (t) => t.getUTCMonth());
Yr.range;
const it = k((t) => {
  t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, e) => {
  t.setFullYear(t.getFullYear() + e);
}, (t, e) => e.getFullYear() - t.getFullYear(), (t) => t.getFullYear());
it.every = (t) => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : k((e) => {
  e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, n) => {
  e.setFullYear(e.getFullYear() + n * t);
});
it.range;
const ot = k((t) => {
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCFullYear(t.getUTCFullYear() + e);
}, (t, e) => e.getUTCFullYear() - t.getUTCFullYear(), (t) => t.getUTCFullYear());
ot.every = (t) => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : k((e) => {
  e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, n) => {
  e.setUTCFullYear(e.getUTCFullYear() + n * t);
});
ot.range;
function Or(t, e, n, r, i, a) {
  const o = [
    [yt, 1, K],
    [yt, 5, 5 * K],
    [yt, 15, 15 * K],
    [yt, 30, 30 * K],
    [a, 1, X],
    [a, 5, 5 * X],
    [a, 15, 15 * X],
    [a, 30, 30 * X],
    [i, 1, tt],
    [i, 3, 3 * tt],
    [i, 6, 6 * tt],
    [i, 12, 12 * tt],
    [r, 1, rt],
    [r, 2, 2 * rt],
    [n, 1, cn],
    [e, 1, Gn],
    [e, 3, 3 * Gn],
    [t, 1, Fe]
  ];
  function s(u, l, d) {
    const f = l < u;
    f && ([u, l] = [l, u]);
    const h = d && typeof d.range == "function" ? d : c(u, l, d), w = h ? h.range(u, +l + 1) : [];
    return f ? w.reverse() : w;
  }
  function c(u, l, d) {
    const f = Math.abs(l - u) / d, h = Ze(([, , E]) => E).right(o, f);
    if (h === o.length)
      return t.every(bn(u / Fe, l / Fe, d));
    if (h === 0)
      return fe.every(Math.max(bn(u, l, d), 1));
    const [w, S] = o[f / o[h - 1][2] < o[h][2] / f ? h - 1 : h];
    return w.every(S);
  }
  return [s, c];
}
Or(ot, Yr, fn, zr, $r, Ur);
const [Tc, Mc] = Or(it, dn, Se, Rt, un, we);
function ke(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
    return e.setFullYear(t.y), e;
  }
  return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
}
function Pe(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
    return e.setUTCFullYear(t.y), e;
  }
  return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
}
function Et(t, e, n) {
  return { y: t, m: e, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function Hc(t) {
  var e = t.dateTime, n = t.date, r = t.time, i = t.periods, a = t.days, o = t.shortDays, s = t.months, c = t.shortMonths, u = Dt(i), l = Ft(i), d = Dt(a), f = Ft(a), h = Dt(o), w = Ft(o), S = Dt(s), E = Ft(s), R = Dt(c), N = Ft(c), D = {
    a: Vt,
    A: be,
    b: Lt,
    B: Mt,
    c: null,
    d: jn,
    e: jn,
    f: Jc,
    g: su,
    G: uu,
    H: Bc,
    I: Zc,
    j: jc,
    L: Rr,
    m: Qc,
    M: Kc,
    p: Wr,
    q: Br,
    Q: Kn,
    s: tr,
    S: tu,
    u: eu,
    U: nu,
    V: ru,
    w: iu,
    W: au,
    x: null,
    X: null,
    y: ou,
    Y: cu,
    Z: lu,
    "%": Qn
  }, m = {
    a: Zr,
    A: jr,
    b: Jr,
    B: Qr,
    c: null,
    d: Jn,
    e: Jn,
    f: pu,
    g: _u,
    G: Tu,
    H: fu,
    I: du,
    j: hu,
    L: Lr,
    m: gu,
    M: mu,
    p: Kr,
    q: ti,
    Q: Kn,
    s: tr,
    S: vu,
    u: yu,
    U: wu,
    V: Su,
    w: xu,
    W: bu,
    x: null,
    X: null,
    y: Au,
    Y: Cu,
    Z: Mu,
    "%": Qn
  }, _ = {
    a: z,
    A: P,
    b: V,
    B: J,
    c: pt,
    d: Bn,
    e: Bn,
    f: Gc,
    g: Wn,
    G: qn,
    H: Zn,
    I: Zn,
    j: Oc,
    L: Lc,
    m: Yc,
    M: Rc,
    p: U,
    q: zc,
    Q: qc,
    s: Wc,
    S: Vc,
    u: Pc,
    U: Ic,
    V: Nc,
    w: kc,
    W: Uc,
    x: xe,
    X: Tt,
    y: Wn,
    Y: qn,
    Z: $c,
    "%": Xc
  };
  D.x = v(n, D), D.X = v(r, D), D.c = v(e, D), m.x = v(n, m), m.X = v(r, m), m.c = v(e, m);
  function v(y, A) {
    return function(T) {
      var g = [], Y = -1, H = 0, L = y.length, G, st, pn;
      for (T instanceof Date || (T = new Date(+T)); ++Y < L; )
        y.charCodeAt(Y) === 37 && (g.push(y.slice(H, Y)), (st = Xn[G = y.charAt(++Y)]) != null ? G = y.charAt(++Y) : st = G === "e" ? " " : "0", (pn = A[G]) && (G = pn(T, st)), g.push(G), H = Y + 1);
      return g.push(y.slice(H, Y)), g.join("");
    };
  }
  function b(y, A) {
    return function(T) {
      var g = Et(1900, void 0, 1), Y = F(g, y, T += "", 0), H, L;
      if (Y != T.length)
        return null;
      if ("Q" in g)
        return new Date(g.Q);
      if ("s" in g)
        return new Date(g.s * 1e3 + ("L" in g ? g.L : 0));
      if (A && !("Z" in g) && (g.Z = 0), "p" in g && (g.H = g.H % 12 + g.p * 12), g.m === void 0 && (g.m = "q" in g ? g.q : 0), "V" in g) {
        if (g.V < 1 || g.V > 53)
          return null;
        "w" in g || (g.w = 1), "Z" in g ? (H = Pe(Et(g.y, 0, 1)), L = H.getUTCDay(), H = L > 4 || L === 0 ? he.ceil(H) : he(H), H = ln.offset(H, (g.V - 1) * 7), g.y = H.getUTCFullYear(), g.m = H.getUTCMonth(), g.d = H.getUTCDate() + (g.w + 6) % 7) : (H = ke(Et(g.y, 0, 1)), L = H.getDay(), H = L > 4 || L === 0 ? de.ceil(H) : de(H), H = Rt.offset(H, (g.V - 1) * 7), g.y = H.getFullYear(), g.m = H.getMonth(), g.d = H.getDate() + (g.w + 6) % 7);
      } else
        ("W" in g || "U" in g) && ("w" in g || (g.w = "u" in g ? g.u % 7 : "W" in g ? 1 : 0), L = "Z" in g ? Pe(Et(g.y, 0, 1)).getUTCDay() : ke(Et(g.y, 0, 1)).getDay(), g.m = 0, g.d = "W" in g ? (g.w + 6) % 7 + g.W * 7 - (L + 5) % 7 : g.w + g.U * 7 - (L + 6) % 7);
      return "Z" in g ? (g.H += g.Z / 100 | 0, g.M += g.Z % 100, Pe(g)) : ke(g);
    };
  }
  function F(y, A, T, g) {
    for (var Y = 0, H = A.length, L = T.length, G, st; Y < H; ) {
      if (g >= L)
        return -1;
      if (G = A.charCodeAt(Y++), G === 37) {
        if (G = A.charAt(Y++), st = _[G in Xn ? A.charAt(Y++) : G], !st || (g = st(y, T, g)) < 0)
          return -1;
      } else if (G != T.charCodeAt(g++))
        return -1;
    }
    return g;
  }
  function U(y, A, T) {
    var g = u.exec(A.slice(T));
    return g ? (y.p = l.get(g[0].toLowerCase()), T + g[0].length) : -1;
  }
  function z(y, A, T) {
    var g = h.exec(A.slice(T));
    return g ? (y.w = w.get(g[0].toLowerCase()), T + g[0].length) : -1;
  }
  function P(y, A, T) {
    var g = d.exec(A.slice(T));
    return g ? (y.w = f.get(g[0].toLowerCase()), T + g[0].length) : -1;
  }
  function V(y, A, T) {
    var g = R.exec(A.slice(T));
    return g ? (y.m = N.get(g[0].toLowerCase()), T + g[0].length) : -1;
  }
  function J(y, A, T) {
    var g = S.exec(A.slice(T));
    return g ? (y.m = E.get(g[0].toLowerCase()), T + g[0].length) : -1;
  }
  function pt(y, A, T) {
    return F(y, e, A, T);
  }
  function xe(y, A, T) {
    return F(y, n, A, T);
  }
  function Tt(y, A, T) {
    return F(y, r, A, T);
  }
  function Vt(y) {
    return o[y.getDay()];
  }
  function be(y) {
    return a[y.getDay()];
  }
  function Lt(y) {
    return c[y.getMonth()];
  }
  function Mt(y) {
    return s[y.getMonth()];
  }
  function Wr(y) {
    return i[+(y.getHours() >= 12)];
  }
  function Br(y) {
    return 1 + ~~(y.getMonth() / 3);
  }
  function Zr(y) {
    return o[y.getUTCDay()];
  }
  function jr(y) {
    return a[y.getUTCDay()];
  }
  function Jr(y) {
    return c[y.getUTCMonth()];
  }
  function Qr(y) {
    return s[y.getUTCMonth()];
  }
  function Kr(y) {
    return i[+(y.getUTCHours() >= 12)];
  }
  function ti(y) {
    return 1 + ~~(y.getUTCMonth() / 3);
  }
  return {
    format: function(y) {
      var A = v(y += "", D);
      return A.toString = function() {
        return y;
      }, A;
    },
    parse: function(y) {
      var A = b(y += "", !1);
      return A.toString = function() {
        return y;
      }, A;
    },
    utcFormat: function(y) {
      var A = v(y += "", m);
      return A.toString = function() {
        return y;
      }, A;
    },
    utcParse: function(y) {
      var A = b(y += "", !0);
      return A.toString = function() {
        return y;
      }, A;
    }
  };
}
var Xn = { "-": "", _: " ", 0: "0" }, I = /^\s*\d+/, Ec = /^%/, Dc = /[\\^$*+?|[\]().{}]/g;
function M(t, e, n) {
  var r = t < 0 ? "-" : "", i = (r ? -t : t) + "", a = i.length;
  return r + (a < n ? new Array(n - a + 1).join(e) + i : i);
}
function Fc(t) {
  return t.replace(Dc, "\\$&");
}
function Dt(t) {
  return new RegExp("^(?:" + t.map(Fc).join("|") + ")", "i");
}
function Ft(t) {
  return new Map(t.map((e, n) => [e.toLowerCase(), n]));
}
function kc(t, e, n) {
  var r = I.exec(e.slice(n, n + 1));
  return r ? (t.w = +r[0], n + r[0].length) : -1;
}
function Pc(t, e, n) {
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
function Wn(t, e, n) {
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
function Bn(t, e, n) {
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
function Gc(t, e, n) {
  var r = I.exec(e.slice(n, n + 6));
  return r ? (t.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1;
}
function Xc(t, e, n) {
  var r = Ec.exec(e.slice(n, n + 1));
  return r ? n + r[0].length : -1;
}
function qc(t, e, n) {
  var r = I.exec(e.slice(n));
  return r ? (t.Q = +r[0], n + r[0].length) : -1;
}
function Wc(t, e, n) {
  var r = I.exec(e.slice(n));
  return r ? (t.s = +r[0], n + r[0].length) : -1;
}
function jn(t, e) {
  return M(t.getDate(), e, 2);
}
function Bc(t, e) {
  return M(t.getHours(), e, 2);
}
function Zc(t, e) {
  return M(t.getHours() % 12 || 12, e, 2);
}
function jc(t, e) {
  return M(1 + Rt.count(it(t), t), e, 3);
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
function tu(t, e) {
  return M(t.getSeconds(), e, 2);
}
function eu(t) {
  var e = t.getDay();
  return e === 0 ? 7 : e;
}
function nu(t, e) {
  return M(Se.count(it(t) - 1, t), e, 2);
}
function Vr(t) {
  var e = t.getDay();
  return e >= 4 || e === 0 ? _t(t) : _t.ceil(t);
}
function ru(t, e) {
  return t = Vr(t), M(_t.count(it(t), t) + (it(t).getDay() === 4), e, 2);
}
function iu(t) {
  return t.getDay();
}
function au(t, e) {
  return M(de.count(it(t) - 1, t), e, 2);
}
function ou(t, e) {
  return M(t.getFullYear() % 100, e, 2);
}
function su(t, e) {
  return t = Vr(t), M(t.getFullYear() % 100, e, 2);
}
function cu(t, e) {
  return M(t.getFullYear() % 1e4, e, 4);
}
function uu(t, e) {
  var n = t.getDay();
  return t = n >= 4 || n === 0 ? _t(t) : _t.ceil(t), M(t.getFullYear() % 1e4, e, 4);
}
function lu(t) {
  var e = t.getTimezoneOffset();
  return (e > 0 ? "-" : (e *= -1, "+")) + M(e / 60 | 0, "0", 2) + M(e % 60, "0", 2);
}
function Jn(t, e) {
  return M(t.getUTCDate(), e, 2);
}
function fu(t, e) {
  return M(t.getUTCHours(), e, 2);
}
function du(t, e) {
  return M(t.getUTCHours() % 12 || 12, e, 2);
}
function hu(t, e) {
  return M(1 + ln.count(ot(t), t), e, 3);
}
function Lr(t, e) {
  return M(t.getUTCMilliseconds(), e, 3);
}
function pu(t, e) {
  return Lr(t, e) + "000";
}
function gu(t, e) {
  return M(t.getUTCMonth() + 1, e, 2);
}
function mu(t, e) {
  return M(t.getUTCMinutes(), e, 2);
}
function vu(t, e) {
  return M(t.getUTCSeconds(), e, 2);
}
function yu(t) {
  var e = t.getUTCDay();
  return e === 0 ? 7 : e;
}
function wu(t, e) {
  return M(fn.count(ot(t) - 1, t), e, 2);
}
function Gr(t) {
  var e = t.getUTCDay();
  return e >= 4 || e === 0 ? Ct(t) : Ct.ceil(t);
}
function Su(t, e) {
  return t = Gr(t), M(Ct.count(ot(t), t) + (ot(t).getUTCDay() === 4), e, 2);
}
function xu(t) {
  return t.getUTCDay();
}
function bu(t, e) {
  return M(he.count(ot(t) - 1, t), e, 2);
}
function Au(t, e) {
  return M(t.getUTCFullYear() % 100, e, 2);
}
function _u(t, e) {
  return t = Gr(t), M(t.getUTCFullYear() % 100, e, 2);
}
function Cu(t, e) {
  return M(t.getUTCFullYear() % 1e4, e, 4);
}
function Tu(t, e) {
  var n = t.getUTCDay();
  return t = n >= 4 || n === 0 ? Ct(t) : Ct.ceil(t), M(t.getUTCFullYear() % 1e4, e, 4);
}
function Mu() {
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
var gt, hn, Xr;
Hu({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function Hu(t) {
  return gt = Hc(t), hn = gt.format, Xr = gt.parse, gt.utcFormat, gt.utcParse, gt;
}
function Eu(t) {
  return new Date(t);
}
function Du(t) {
  return t instanceof Date ? +t : +new Date(+t);
}
function qr(t, e, n, r, i, a, o, s, c, u) {
  var l = mc(), d = l.invert, f = l.domain, h = u(".%L"), w = u(":%S"), S = u("%I:%M"), E = u("%I %p"), R = u("%a %d"), N = u("%b %d"), D = u("%B"), m = u("%Y");
  function _(v) {
    return (c(v) < v ? h : s(v) < v ? w : o(v) < v ? S : a(v) < v ? E : r(v) < v ? i(v) < v ? R : N : n(v) < v ? D : m)(v);
  }
  return l.invert = function(v) {
    return new Date(d(v));
  }, l.domain = function(v) {
    return arguments.length ? f(Array.from(v, Du)) : f().map(Eu);
  }, l.ticks = function(v) {
    var b = f();
    return t(b[0], b[b.length - 1], v ?? 10);
  }, l.tickFormat = function(v, b) {
    return b == null ? _ : u(b);
  }, l.nice = function(v) {
    var b = f();
    return (!v || typeof v.range != "function") && (v = e(b[0], b[b.length - 1], v ?? 10)), v ? f(vc(b, v)) : l;
  }, l.copy = function() {
    return pc(l, qr(t, e, n, r, i, a, o, s, c, u));
  }, l;
}
function er() {
  return sn.apply(qr(Tc, Mc, it, dn, Se, Rt, un, we, yt, hn).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function wt(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
wt.prototype = {
  constructor: wt,
  scale: function(t) {
    return t === 1 ? this : new wt(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new wt(this.k, this.x + this.k * t, this.y + this.k * e);
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
new wt(1, 0, 0);
wt.prototype;
const p = {
  configuracionSemana: {
    horaMinima: "08:00",
    horaMaxima: "14:00",
    diasSemanaHabiles: ["L", "M", "X", "J", "V"]
  },
  grafico: {
    anchoGrafico: void 0,
    altoGrafico: void 0,
    colorGrafico: "white",
    margenGrafico: {
      margenInferiorGrafico: 3,
      margenDerechoGrafico: 3,
      margenSuperiorGrafico: 5,
      margenIzquierdoGrafico: 5
    }
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
    margenLateral: 0,
    altoCabecera: 11,
    anchoSesion: void 0,
    altoPie: 5,
    colorCabecera: "#fff",
    colorCuerpo: "#f4f4f4"
  },
  escalas: {
    escalaVertical: void 0,
    escalaHorizontal: void 0
  },
  actividades: {
    tamanyoTexto: "17",
    porcentajeZonaSeleccionActividad: 6,
    colores: ["#bde8ef", "#ffd4e5", "#feffa2", "#e0cdff", "#fdfd96"],
    mostrarPanelAcciones: !1
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
    const n = p.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(e.horaInicio));
    return p.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(e.horaFin)) - n;
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
    return nr.filter((e) => p.configuracionSemana?.diasSemanaHabiles.includes(e.codigo));
  }
  static minimoIntervaloTemporal() {
    return x.convertirCadenaHoraEnTiempo(p.configuracionSemana?.horaMinima), x.convertirCadenaHoraEnTiempo(p.configuracionSemana?.horaMinima);
  }
  static maximoIntervaloTemporal() {
    const e = x.convertirCadenaHoraEnTiempo(p.configuracionSemana?.horaMaxima);
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
  static calcularColoresActividadesG(e) {
    const n = [];
    e.forEach(
      (r) => {
        n.some((i) => i === r.tipoActividad?.idTipoActividad) || n.push(r.tipoActividad?.idTipoActividad);
      }
    );
    for (let r = 0; r < n.length; r++) {
      const i = n[r];
      e.filter((a) => a.tipoActividad?.idTipoActividad === i).forEach(
        (a) => a.color = p.actividades.colores[r]
      );
    }
  }
  marcarActividadesComoSeleccionadas(e) {
    e.forEach(
      (n) => {
        const r = C("g#panelActividad_" + n), i = r.select(".rectActividad");
        r.append("rect").attr("width", i.attr("width")).attr("height", i.attr("height")).attr("class", "rectActividadSeleccionada").attr("fill", "url(#x)");
      }
    );
  }
  static desmarcarActividadesComoSeleccionadas(e, n) {
    n ? e.filter((r) => n.includes(r.idActividad)).forEach(
      (r) => C("g#panelActividad" + r.idActividad).select(".rectActividadSeleccionada").remove()
    ) : at("g.panelActividad").select(".rectActividadSeleccionada").remove();
  }
  static marcarActividadesComoSeleccionadas(e) {
    e.forEach(
      (n) => {
        const r = C("g#panelActividad_" + n).select(".panelActividadZonaSeleccion"), i = r.select(".rectActividad");
        r.append("rect").attr("width", i.attr("width")).attr("height", i.attr("height")).attr("class", "rectActividadSeleccionada").attr("fill", "url(#x)");
      }
    );
  }
  static convertirCadenaHoraEnTiempo = Xr("%I:%M");
  static convertirTiempoEnCadenaHora = hn("%I:%M");
}
let Fu = class {
  svg;
  elementoRaiz;
  plantilla;
  actividadesG = [];
  seleccionActividad$ = new mt();
  moverActividad$ = new mt();
  duplicarActividad$ = new mt();
  eliminarActividad$ = new mt();
  anyadirActividadEnSesion$ = new mt();
  constructor(e) {
    this.elementoRaiz = e;
  }
  generarGrafico(e, n) {
    this.svg && C("svg").remove(), this.svg = C(this.elementoRaiz).append("svg"), this.establecerParametrosConfiguracion(e), this.configurarSvg(this.svg), this.renderizarPanelHorario(this.svg), this.renderizarPanelesDiasSamanas(), n && (this.plantilla = n, this.renderizarPlantilla(this.plantilla)), this.renderizarPanelesActividades();
  }
  actualizarActividades(e) {
    this.actividadesG = [], e.forEach(
      (n) => {
        const r = new di(n);
        this.actividadesG.push(r);
      }
    ), x.calcularFactorAnchoActividadesG(this.actividadesG, this.actividadesG), x.calcularColoresActividadesG(this.actividadesG), this.renderizarPanelesActividades();
  }
  configurarSvg(e) {
    e.attr("width", p.grafico.anchoGrafico).attr("height", p.grafico.altoGrafico), e.append("rect").attr("width", "100%").attr("height", "100%").attr("id", "fondografico").attr("fill", p.grafico.colorGrafico).attr("rx", "10").attr("ry", "10"), x.anyadirDefs(e);
  }
  establecerParametrosConfiguracion(e) {
    e.configuracionSemana && (p.configuracionSemana = e.configuracionSemana), e.actividades?.mostrarPanelAcciones ? p.actividades.mostrarPanelAcciones = e.actividades?.mostrarPanelAcciones : p.actividades.mostrarPanelAcciones = !1, e.actividades?.tamanyoTexto && (p.actividades.tamanyoTexto = e.actividades?.tamanyoTexto), e.panelSesiones?.colorCuerpo && (p.panelSesiones.colorCuerpo = e.panelSesiones.colorCuerpo);
    const n = x.convertirCadenaHoraEnTiempo(p.configuracionSemana.horaMaxima), r = x.convertirCadenaHoraEnTiempo(p.configuracionSemana.horaMinima), i = (n.getTime() - r.getTime()) / 36e5;
    p.grafico.anchoGrafico = parseFloat(C(this.elementoRaiz).style("width")), p.grafico.altoGrafico = parseFloat(C(this.elementoRaiz).style("height")) * Math.max(1, i / 7), p.panelHorario.anchoPanelHorario = p.grafico.anchoGrafico * ((100 - p.grafico.margenGrafico.margenIzquierdoGrafico - p.grafico.margenGrafico.margenDerechoGrafico) / 100), p.panelHorario.altoPanelHorario = p.grafico.altoGrafico * ((100 - p.grafico.margenGrafico.margenSuperiorGrafico - p.grafico.margenGrafico.margenInferiorGrafico) / 100), p.escalas.escalaHorizontal = Nr().domain(x.obtenerDiasSemanaHorario().map((a) => a.denominacionLarga)).range([0, p.panelHorario.anchoPanelHorario]).paddingInner(0).paddingOuter(0), p.escalas.escalaVertical = er().domain([x.minimoIntervaloTemporal(), x.maximoIntervaloTemporal()]).range([0, p.panelHorario.altoPanelHorario]), p.panelSesiones.anchoSesion = parseFloat(p.escalas.escalaHorizontal.bandwidth()) * (100 - p.panelSesiones.margenLateral * 2) * 0.01;
  }
  renderizarGrafico(e, n) {
    window.addEventListener("resize", this.generarGrafico.bind(this, e, n)), this.generarGrafico(e, n);
  }
  renderizarPanelHorario(e) {
    const n = p.grafico.anchoGrafico * (p.grafico.margenGrafico.margenIzquierdoGrafico / 100), r = p.grafico.altoGrafico * (p.grafico.margenGrafico.margenSuperiorGrafico / 100), i = e.append("g").attr("id", "panelHorario").attr("transform", `translate(${n},${r})`).attr("width", p.panelHorario.anchoPanelHorario).attr("height", p.panelHorario.altoPanelHorario);
    i.append("rect").attr("id", "fondoPanelHorario").attr("width", p.panelHorario.anchoPanelHorario).attr("height", p.panelHorario.altoPanelHorario).attr("fill", p.panelHorario.colorPanelHorario);
    var a = Pi(p.escalas.escalaHorizontal);
    a.tickSize(0);
    const o = i.append("g").attr("class", "ejeX").call(a);
    o.select(".domain").remove(), o.selectAll(".tick text").attr("font-size", 20);
    const s = parseInt(p.configuracionSemana.horaMinima.substring(0, 2)), c = parseInt(p.configuracionSemana.horaMinima.substring(3, 5)), u = new Date();
    u.setHours(s), u.setMinutes(c);
    const l = parseInt(p.configuracionSemana.horaMaxima.substring(0, 2)), d = parseInt(p.configuracionSemana.horaMaxima.substring(3, 5)), f = new Date();
    f.setHours(l), f.setMinutes(d);
    const h = er().domain([u.setMinutes(u.getMinutes() - 1), f]).range([0, p.panelHorario.altoPanelHorario]);
    var w = Ii(h);
    return w.ticks(we.every(60)), i.append("g").attr("class", "ejeY").call(w).select(".domain").remove(), i;
  }
  renderizarPanelesDiasSamanas() {
    const e = C("g#panelHorario").selectAll("g#panelDiaSemana").data(x.obtenerDiasSemanaHorario()), n = C("g#panelHorario").selectAll("g#panelDiaSemana").data(x.obtenerDiasSemanaHorario()).enter().append("g");
    return n.merge(e).attr("id", (r) => r.codigo).attr("class", "panelDiaSemana").attr("transform", (r) => `translate(${p.escalas.escalaHorizontal ? p.escalas.escalaHorizontal(r.denominacionLarga) : 0},0)`), n.exit().remove(), n.append("line").attr("x1", p.escalas.escalaHorizontal?.bandwidth).attr("y1", 0).attr("x2", p.escalas.escalaHorizontal?.bandwidth).attr("y2", p.panelHorario.altoPanelHorario).attr("stroke-width", "0.1").attr("stroke", "black").attr("stroke-dasharray", "1"), n;
  }
  renderizarPlantilla(e) {
    at("g.panelSesiones").remove(), at("g.panelDiaSemana").nodes().forEach(
      (n) => {
        const r = e.sesionesPlantilla.filter((i) => i.diaSemana === n.id);
        this.renderizarSesiones("g#" + n.id, r);
      }
    );
  }
  renderizarPanelesActividades() {
    at("g.panelSesionActividades").remove(), at("g.panelDiaSemana").nodes().forEach(
      (e) => {
        const n = this.actividadesG.filter((r) => r.sesion.diaSemana === e.id);
        this.renderizarActividades("g#" + e.id, n);
      }
    );
  }
  renderizarSesiones(e, n) {
    const r = p.panelSesiones.anchoSesion ? p.panelSesiones.anchoSesion.toString() : "0", i = C(e).selectAll("g#sesionpp").data(n).enter().append("g").attr("transform", (s) => `translate(${p.panelSesiones.margenLateral},${p.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(s.horaInicio))})`).attr("class", "panelSesion").attr("id", (s) => "ses" + s.idSesion), a = i.append("g").attr("class", "panelCabeceraSesion");
    a.append("rect").attr("class", "fondoPanelSesionCabecera").attr("id", (s) => "fondoPanelSesionCabecera" + s.idSesion).attr("height", p.panelSesiones.altoCabecera).attr("width", parseFloat(r)).attr("fill", p.panelSesiones.colorCabecera), a.append("text").attr("x", parseInt(r) / 2).text((s) => s.horaInicio + " - " + s.horaFin).attr("y", p.panelSesiones.altoCabecera / 2).attr("font-size", ".5em").attr("dominant-baseline", "central").attr("text-anchor", "middle"), i.append("g").attr("class", "panelCabeceraSesion").attr("transform", (s) => `translate(0,${p.panelSesiones.altoCabecera})`).append("rect").attr("class", "fondoPanelSesion").attr("id", (s) => "fondoPanelSesion" + s.idSesion).attr("height", (s) => {
      const c = p.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(s.horaInicio));
      return p.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(s.horaFin)) - c - p.panelSesiones.altoCabecera;
    }).attr("width", parseFloat(r)).attr("fill", p.panelSesiones.colorCuerpo).on("click", (s, c) => {
      this.anyadirActividadEnSesion$.next(c);
    });
  }
  renderizarActividades(e, n) {
    const r = x.obtenerActividadesSesiones(n), i = this.renderizarPanelSesionActividades(e, r), a = this.renderizarPanelCabeceraSesionActividades(i);
    this.renderizarBotonesPanelCabeceraSesionesActividades(a), this.renderizarPanelPieSesionActividades(i), this.renderizarPanelesCuerpoSesionActividades(i), this.anyadirPanelesActividades(r);
  }
  renderizarPanelSesionActividades(e, n) {
    return C(e).selectAll("g#actxx").data(n).enter().append("g").attr("transform", (i) => `translate(0,${p.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(i.sesion.horaInicio))})`).attr("class", "panelSesionActividades").attr("id", (i) => "panelSesionActividades" + i.sesion.idSesion).attr("data-actividades", (i) => i.actividades.map((a) => a.idActividad).join(",")).attr("data-actividadVisible", (i) => i.actividades[0].idActividad);
  }
  renderizarPanelCabeceraSesionActividades(e) {
    const n = p.panelSesiones.anchoSesion ? p.panelSesiones.anchoSesion.toString() : "0", r = p.panelSesiones.altoCabecera, i = e.append("g").attr("class", "panelCabeceraSesionConSusActividades").attr("id", (a) => "panelCabeceraSesionConSusActividades" + a.sesion.idSesion);
    return i.append("rect").attr("class", "rectPanelCabeceraSesionConSusActividades").attr("height", r * 2).attr("width", n).attr("rx", 10).attr("fill", "#ccc"), i.append("text").attr("x", parseInt(n) / 2).text((a) => a.sesion.horaInicio + " - " + a.sesion.horaFin).attr("y", r / 2).attr("font-size", ".6em").attr("fill", "white").attr("dominant-baseline", "central").attr("text-anchor", "middle"), i;
  }
  renderizarPanelPieSesionActividades(e) {
    const n = p.panelSesiones.altoPie, r = p.panelSesiones.anchoSesion ? p.panelSesiones.anchoSesion.toString() : "0", i = p.panelSesiones.altoCabecera, a = e.append("g").attr("class", "panelPieSesionConSusActividades").attr("id", (o) => "panelPieSesionConSusActividades" + o.sesion.idSesion);
    return a.append("rect").attr("class", "rectPanelCabeceraSesionConSusActividades").attr("height", n * 2).attr("width", r).attr("rx", 10).attr("y", (o) => {
      const s = p.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(o.sesion.horaInicio));
      return p.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(o.sesion.horaFin)) - s - n * 2;
    }).attr("fill", "#ccc"), a.append("text").attr("x", parseInt(r) / 2).text((o) => o.sesion.horaInicio + " - " + o.sesion.horaFin).attr("y", i / 2).attr("font-size", ".6em").attr("fill", "white").attr("dominant-baseline", "central").attr("text-anchor", "middle"), a;
  }
  renderizarBotonesPanelCabeceraSesionesActividades(e) {
    const n = p.panelSesiones.anchoSesion ? p.panelSesiones.anchoSesion.toString() : "0", r = p.panelSesiones.altoCabecera, i = parseFloat(n) / 2 - 15, a = i + 10, o = r / 18, s = r / 2, c = r * 17 / 18, u = [
      { x: parseFloat(n) / 2 - i, y: o + 1 },
      { x: parseFloat(n) / 2 - a + 2, y: s },
      { x: parseFloat(n) / 2 - i, y: c - 1 }
    ], l = [
      { x: parseFloat(n) / 2 + i, y: o + 1 },
      { x: parseFloat(n) / 2 + a - 2, y: s },
      { x: parseFloat(n) / 2 + i, y: c - 1 }
    ];
    e.append("polygon").attr("points", u.map(function(f) {
      return [f.x, f.y].join(",");
    }).join(" ")).attr("fill", "#ccc").attr("class", "botonCabeceraSesionActividades botonIzquierdoCabeceraSesionActividades").attr("id", (f) => "botonIzquierdoCabeceraSesionActividades" + f.sesion.idSesion).on("click", this.actualizarActividadVisibleDeUnaSesion.bind(this)).on("mouseout", (f) => C("body").style("cursor", "default")).on("mouseover", (f) => C("body").style("cursor", "pointer")), e.append("polygon"), e.append("polygon").attr("points", l.map(function(f) {
      return [f.x, f.y].join(",");
    }).join(" ")).attr(
      "fill",
      (f) => f.actividades.length > 1 ? "white" : "#ccc"
    ).attr("class", "botonCabeceraSesionActividades botonDerechoCabeceraSesionActividades").attr("id", (f) => "botonDerechoCabeceraSesionActividades" + f.sesion.idSesion).on("click", this.actualizarActividadVisibleDeUnaSesion.bind(this)).on("mouseout", (f) => C("body").style("cursor", "default")).on("mouseover", (f) => C("body").style("cursor", "pointer"));
  }
  renderizarPanelesCuerpoSesionActividades(e) {
    p.panelSesiones.anchoSesion && p.panelSesiones.anchoSesion.toString();
    const n = p.panelSesiones.altoPie, r = p.panelSesiones.altoCabecera, i = e.append("g").attr("class", "panelCuerpoSesionActividades").attr("id", (a) => "panelCuerpoSesionActividades" + a.sesion.idSesion).attr("transform", `translate(0,${r})`);
    return i.append("clipPath").attr("id", (a) => "rectanguloRecortador" + a.sesion.idSesion).append("rect").attr("id", (a) => "rectRecortador" + a.sesion.idSesion).attr("height", (a) => {
      const o = p.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(a.sesion.horaInicio));
      return p.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(a.sesion.horaFin)) - o - r - n;
    }).attr("width", (a) => p.escalas.escalaHorizontal.bandwidth()), i.attr("clip-path", (a) => `url(#${"rectanguloRecortador" + a.sesion.idSesion})`), i;
  }
  anyadirPanelesActividades(e) {
    const n = p.panelSesiones.anchoSesion ? p.panelSesiones.anchoSesion.toString() : "0";
    e.forEach(
      (r) => {
        const i = x.altoPanel(r.sesion) - p.panelSesiones.altoCabecera, a = "#panelCuerpoSesionActividades" + r.sesion.idSesion, o = C(a).selectAll("actxx").data(r.actividades).enter().append("g");
        o.attr("class", (u, l, d) => l == 0 ? "panelActividad visible" : "panelActividad").attr("id", (u) => "panelActividad_" + u.idActividad).attr("transform", (u, l, d) => `translate(${l * parseFloat(n)},0)`).attr("x", (u, l, d) => l * parseFloat(n)).attr("y", 0).attr("height", i).attr("width", n), r.actividades.forEach(
          (u) => {
            const l = C("g#panelActividad_" + u.idActividad);
            this.renderizarSeccionContenidoPanelActividad(l, u, 1, u.grupos?.map((d) => d.codigo)), this.renderizarSeccionContenidoPanelActividad(l, u, 2, u.docentes?.map((d) => d.alias)), this.renderizarSeccionContenidoPanelActividad(l, u, 3, u.dependencia ? [u.dependencia.codigo] : []), p.actividades.mostrarPanelAcciones && this.renderizarSeccionBotonesAccionPanelActividad(l, u);
          }
        );
        const s = parseFloat(n) * p.actividades.porcentajeZonaSeleccionActividad / 100;
        o.select(".panelActividadZonaSeleccion").append("rect").attr("class", "rectActividad").attr("width", s).attr("height", i).attr("fill", "#fafafa").on("click", (u, l, d) => {
          const f = C("g#panelActividad_" + l.idActividad).attr("class").split(" ").includes("actividadSeleccionada");
          u.ctrlKey || x.desmarcarActividadesComoSeleccionadas(this.actividadesG), f ? at("g#panelActividad_" + l.idActividad).attr("class", "panelActividad actividadSeleccionada") : C("g#panelActividad_" + l.idActividad).attr("class", "panelActividad"), C("g#panelActividad_" + l.idActividad).attr("class").split(" ").includes("actividadSeleccionada") ? x.desmarcarActividadesComoSeleccionadas(this.actividadesG, [l.idActividad]) : x.marcarActividadesComoSeleccionadas([l.idActividad]);
        });
        const c = o.select(".panelActividadZonaSeleccion").append("svg:foreignObject").attr("width", s + "px").attr("height", i / 2 + "px").append("xhtml:div").style("text-align", "center").style("font-size", (u) => s >= 10 ? "10px" : s / 1.5 + "px").html('<i class="fas fa fa-expand-arrows-alt"></i><br><i class="fas fa fa-copy"></i>');
        o.select(".panelActividadZonaSeleccion").append("svg:foreignObject").attr("width", s + "px").attr("height", i / 2 + "px").attr("y", i - 35).append("xhtml:div").style("text-align", "center").style("font-size", (u) => s >= 10 ? "10px" : s / 1.5 + "px").html('<i class="fas fa fa-trash" > </i><br><i class="fas fa fa-plus" > </i>').on("click", (u, l, d) => {
          const f = !!u.srcElement.classList.contains("fa-trash"), h = !!u.srcElement.classList.contains("fa-plus");
          f && this.eliminarActividad$.next(l), h && this.anyadirActividadEnSesion$.next(l.sesion);
        }), this.anyadirFuncionalidadDragAndDrop(c);
      }
    );
  }
  renderizarSeccionBotonesAccionPanelActividad(e, n) {
    e.attr("x"), e.attr("y"), e.attr("height"), e.attr("width"), e.append("g").attr("class", "panelActividadZonaSeleccion").attr("id", "panelActividadZonaSeleccion_" + n.idActividad);
  }
  renderizarSeccionContenidoPanelActividad(e, n, r, i) {
    const a = {
      x: e.attr("x"),
      y: e.attr("y"),
      height: e.attr("height"),
      width: e.attr("width")
    }, o = p.actividades.mostrarPanelAcciones ? p.actividades.porcentajeZonaSeleccionActividad : 0, s = {
      x: (r - 1) * (a.width * (1 - o / 100) / 3) + a.width * (o / 100),
      y: a.y,
      height: a.height,
      width: a.width * (1 - o / 100) / 3
    }, c = e.append("g").attr("class", "panelActividadSeccion panelActividadSeccion_" + r).attr("id", "panelActividadSeccion_" + r + "_" + n.idActividad).attr("transform", `translate(${s.x},0)`).attr("x", s.x).attr("y", s.y).attr("height", s.height).attr("width", s.width);
    c.append("rect").attr("height", s.height).attr("width", s.width + 1).attr("fill", n.color);
    const u = c.append("g").attr("class", "panelContenidoSeccion panelContenidoSeccion_" + r).attr("id", "panelContenidoSeccion_" + r + "_" + n.idActividad);
    c.append("rect").attr("id", "rectActivarGestionActividad_" + r + "_" + n.idActividad).attr("class", "rectActivarGestionActividad").attr("height", s.height).attr("width", s.width * (100 - o) / 100).attr("opacity", "0").on("click", (l, d, f) => {
      this.seleccionActividad$.next(d);
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
    const r = parseFloat(p.actividades.tamanyoTexto), i = r / 3, a = e.node().parentNode.getBBox();
    for (let o = 0; o < n.length; o++) {
      const s = n[o];
      e.append("text").attr("x", a.width / 2).text((c, u, l) => s).attr("y", o * (r + i)).attr("font-size", p.actividades.tamanyoTexto).attr("fill", "black").attr("dominant-baseline", "text-before-edge").attr("text-anchor", "middle");
    }
  }
  anyadirScrollSeccion(e) {
    const n = p.panelSesiones.altoPie, r = C(e.node().parentNode), i = {
      x: parseFloat(r.attr("x")),
      y: parseFloat(r.attr("y")),
      width: parseFloat(r.attr("width")),
      height: parseFloat(r.attr("height")) - n
    }, a = e.node().getBBox(), o = 5, s = i.height * i.height / a.height, c = i.height - s, u = a.height - i.height, l = r.append("g");
    l.append("rect").attr("rx", 2).attr("ry", 2).attr("width", o).attr("height", i.height).attr("fill", "#eee");
    const d = l.append("rect").attr("rx", 2).attr("ry", 2).attr("fill", "#777").attr("width", o).attr("height", s);
    l.attr("transform", `translate(${i.width - o},0)`), Hn().on("drag", function(w, S) {
      S.y = h(w.y - S.valorInicial, 0, c), d.attr("y", S.y), e.attr("transform", `translate(0,${-1 * u * S.y / c})`);
    }).on("start", function(w, S) {
      S.valorInicial = w.y;
    })(l);
    function h(w, S, E) {
      return w < S ? S : w > E ? E : w;
    }
  }
  actualizarActividadVisibleDeUnaSesion(e, n, r) {
    var i = !!e.srcElement.classList.contains("botonDerechoCabeceraSesionActividades");
    const a = p.panelSesiones.anchoSesion ? p.panelSesiones.anchoSesion.toString() : "0", o = C("#panelSesionActividades" + n.sesion.idSesion), s = o.attr("data-actividades").split(","), c = o.attr("data-actividadVisible");
    var u = s.indexOf(c);
    i && u < s.length - 1 && u++, !i && u > 0 && u--;
    const l = u === s.length - 1 ? "#ccc" : "white", d = u === 0 ? "#ccc" : "white";
    o.select(".botonIzquierdoCabeceraSesionActividades").attr("fill", d), o.select(".botonDerechoCabeceraSesionActividades").attr("fill", l), o.attr("data-actividadVisible", s[u]), o.selectAll(".panelActividad").attr("transform", function(f, h, w) {
      return `translate(${(h - u) * parseFloat(a)},0)`;
    });
  }
  anyadirFuncionalidadDragAndDrop(e) {
    e.call(
      Hn().on("start", this.dragstarted.bind(this)).on("drag", this.dragged.bind(this)).on("end", this.dragended.bind(this))
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
    }, this.obtenerRectanguloAbsolutoSesiones.bind(this, at(".panelSesion").data()), n.datosGraficosSesiones = this.obtenerRectanguloAbsolutoSesiones.bind(this, at(".panelSesion").data())(), n.altoCabecera = p.panelSesiones.altoCabecera, i.append("rect").attr("id", "marcoTransicionMoverActividad").attr("fill", "rgba(3,5,6,0.3)").attr("stroke", "orange").attr("stroke-linecap", "butt").attr("stroke-width", "2");
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
    const r = x.obtenerDiasSemanaHorario().filter((l) => l.codigo === e.diaSemana)[0], i = parseFloat(p.panelSesiones.anchoSesion ? p.panelSesiones.anchoSesion.toString() : "0"), a = p.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(e.horaInicio)), s = p.escalas.escalaVertical(x.convertirCadenaHoraEnTiempo(e.horaFin)) - a - p.panelSesiones.altoCabecera, c = p.escalas.escalaHorizontal(r.denominacionLarga), u = a + +p.panelSesiones.altoCabecera;
    return { idSesion: e.idSesion, AbsX: parseInt(c), AbsY: parseInt(u), ancho: i, alto: s };
  }
  sesionSeleccionada(e, n) {
    return n.filter(
      (r) => r.AbsX <= e.puntoMedioX && e.puntoMedioX < r.AbsX + r.ancho && r.AbsY <= e.puntoMedioY && e.puntoMedioY < r.AbsY + r.alto
    )[0];
  }
};
var Pu = Fu;
export {
  Pu as HorarioG
};
