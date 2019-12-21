import {
  Spherical as a,
  Vector3 as e,
  EventDispatcher as i,
  TOUCH as n,
  Quaternion as o,
  Vector2 as s,
  MOUSE as t
} from "../../../../three.js";
var c = function(i, c) {
  var r, u, m, l, h;
  void 0 === c &&
    console.warn(
      'THREE.OrbitControls: The second parameter "domElement" is now mandatory.'
    ),
    c === document &&
      console.error(
        'THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'
      ),
    (this.object = i),
    (this.domElement = c),
    (this.enabled = !0),
    (this.target = new e()),
    (this.minDistance = 0),
    (this.maxDistance = 1 / 0),
    (this.minZoom = 0),
    (this.maxZoom = 1 / 0),
    (this.minPolarAngle = 0),
    (this.maxPolarAngle = Math.PI),
    (this.minAzimuthAngle = -1 / 0),
    (this.maxAzimuthAngle = 1 / 0),
    (this.enableDamping = !1),
    (this.dampingFactor = 0.05),
    (this.enableZoom = !0),
    (this.zoomSpeed = 1),
    (this.enableRotate = !0),
    (this.rotateSpeed = 1),
    (this.enablePan = !0),
    (this.panSpeed = 1),
    (this.screenSpacePanning = !1),
    (this.keyPanSpeed = 7),
    (this.autoRotate = !1),
    (this.autoRotateSpeed = 2),
    (this.enableKeys = !0),
    (this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 }),
    (this.mouseButtons = { LEFT: t.ROTATE, MIDDLE: t.DOLLY, RIGHT: t.PAN }),
    (this.touches = { ONE: n.ROTATE, TWO: n.DOLLY_PAN }),
    (this.target0 = this.target.clone()),
    (this.position0 = this.object.position.clone()),
    (this.zoom0 = this.object.zoom),
    (this.getPolarAngle = function() {
      return v.phi;
    }),
    (this.getAzimuthalAngle = function() {
      return v.theta;
    }),
    (this.saveState = function() {
      p.target0.copy(p.target),
        p.position0.copy(p.object.position),
        (p.zoom0 = p.object.zoom);
    }),
    (this.reset = function() {
      p.target.copy(p.target0),
        p.object.position.copy(p.position0),
        (p.object.zoom = p.zoom0),
        p.object.updateProjectionMatrix(),
        p.dispatchEvent(d),
        p.update(),
        (g = f.NONE);
    }),
    (this.update =
      ((r = new e()),
      (u = new o().setFromUnitVectors(i.up, new e(0, 1, 0))),
      (m = u.clone().inverse()),
      (l = new e()),
      (h = new o()),
      function() {
        var e = p.object.position;
        return (
          r.copy(e).sub(p.target),
          r.applyQuaternion(u),
          v.setFromVector3(r),
          p.autoRotate &&
            g === f.NONE &&
            S(((2 * Math.PI) / 60 / 60) * p.autoRotateSpeed),
          p.enableDamping
            ? ((v.theta += T.theta * p.dampingFactor),
              (v.phi += T.phi * p.dampingFactor))
            : ((v.theta += T.theta), (v.phi += T.phi)),
          (v.theta = Math.max(
            p.minAzimuthAngle,
            Math.min(p.maxAzimuthAngle, v.theta)
          )),
          (v.phi = Math.max(p.minPolarAngle, Math.min(p.maxPolarAngle, v.phi))),
          v.makeSafe(),
          (v.radius *= y),
          (v.radius = Math.max(
            p.minDistance,
            Math.min(p.maxDistance, v.radius)
          )),
          !0 === p.enableDamping
            ? p.target.addScaledVector(P, p.dampingFactor)
            : p.target.add(P),
          r.setFromSpherical(v),
          r.applyQuaternion(m),
          e.copy(p.target).add(r),
          p.object.lookAt(p.target),
          !0 === p.enableDamping
            ? ((T.theta *= 1 - p.dampingFactor),
              (T.phi *= 1 - p.dampingFactor),
              P.multiplyScalar(1 - p.dampingFactor))
            : (T.set(0, 0, 0), P.set(0, 0, 0)),
          (y = 1),
          !!(
            N ||
            l.distanceToSquared(p.object.position) > O ||
            8 * (1 - h.dot(p.object.quaternion)) > O
          ) &&
            (p.dispatchEvent(d),
            l.copy(p.object.position),
            h.copy(p.object.quaternion),
            (N = !1),
            !0)
        );
      })),
    (this.dispose = function() {
      p.domElement.removeEventListener("contextmenu", ie, !1),
        p.domElement.removeEventListener("mousedown", Q, !1),
        p.domElement.removeEventListener("wheel", ee, !1),
        p.domElement.removeEventListener("touchstart", ne, !1),
        p.domElement.removeEventListener("touchend", ae, !1),
        p.domElement.removeEventListener("touchmove", oe, !1),
        document.removeEventListener("mousemove", J, !1),
        document.removeEventListener("mouseup", $, !1),
        p.domElement.removeEventListener("keydown", te, !1);
    });
  var p = this,
    d = { type: "change" },
    b = { type: "start" },
    E = { type: "end" },
    f = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    },
    g = f.NONE,
    O = 1e-6,
    v = new a(),
    T = new a(),
    y = 1,
    P = new e(),
    N = !1,
    A = new s(),
    L = new s(),
    j = new s(),
    w = new s(),
    R = new s(),
    k = new s(),
    Y = new s(),
    D = new s(),
    x = new s();
  function M() {
    return Math.pow(0.95, p.zoomSpeed);
  }
  function S(e) {
    T.theta -= e;
  }
  function C(e) {
    T.phi -= e;
  }
  var H,
    _ =
      ((H = new e()),
      function(e, t) {
        H.setFromMatrixColumn(t, 0), H.multiplyScalar(-e), P.add(H);
      }),
    z = (function() {
      var t = new e();
      return function(e, n) {
        !0 === p.screenSpacePanning
          ? t.setFromMatrixColumn(n, 1)
          : (t.setFromMatrixColumn(n, 0), t.crossVectors(p.object.up, t)),
          t.multiplyScalar(e),
          P.add(t);
      };
    })(),
    X = (function() {
      var t = new e();
      return function(e, n) {
        var o = p.domElement;
        if (p.object.isPerspectiveCamera) {
          var a = p.object.position;
          t.copy(a).sub(p.target);
          var i = t.length();
          (i *= Math.tan(((p.object.fov / 2) * Math.PI) / 180)),
            _((2 * e * i) / o.clientHeight, p.object.matrix),
            z((2 * n * i) / o.clientHeight, p.object.matrix);
        } else
          p.object.isOrthographicCamera
            ? (_(
                (e * (p.object.right - p.object.left)) /
                  p.object.zoom /
                  o.clientWidth,
                p.object.matrix
              ),
              z(
                (n * (p.object.top - p.object.bottom)) /
                  p.object.zoom /
                  o.clientHeight,
                p.object.matrix
              ))
            : (console.warn(
                "WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."
              ),
              (p.enablePan = !1));
      };
    })();
  function Z(e) {
    p.object.isPerspectiveCamera
      ? (y /= e)
      : p.object.isOrthographicCamera
      ? ((p.object.zoom = Math.max(
          p.minZoom,
          Math.min(p.maxZoom, p.object.zoom * e)
        )),
        p.object.updateProjectionMatrix(),
        (N = !0))
      : (console.warn(
          "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."
        ),
        (p.enableZoom = !1));
  }
  function I(e) {
    p.object.isPerspectiveCamera
      ? (y *= e)
      : p.object.isOrthographicCamera
      ? ((p.object.zoom = Math.max(
          p.minZoom,
          Math.min(p.maxZoom, p.object.zoom / e)
        )),
        p.object.updateProjectionMatrix(),
        (N = !0))
      : (console.warn(
          "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."
        ),
        (p.enableZoom = !1));
  }
  function F(e) {
    A.set(e.clientX, e.clientY);
  }
  function U(e) {
    w.set(e.clientX, e.clientY);
  }
  function B(e) {
    if (1 == e.touches.length) A.set(e.touches[0].pageX, e.touches[0].pageY);
    else {
      var t = 0.5 * (e.touches[0].pageX + e.touches[1].pageX),
        n = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
      A.set(t, n);
    }
  }
  function V(e) {
    if (1 == e.touches.length) w.set(e.touches[0].pageX, e.touches[0].pageY);
    else {
      var t = 0.5 * (e.touches[0].pageX + e.touches[1].pageX),
        n = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
      w.set(t, n);
    }
  }
  function G(e) {
    var t = e.touches[0].pageX - e.touches[1].pageX,
      n = e.touches[0].pageY - e.touches[1].pageY,
      o = Math.sqrt(t * t + n * n);
    Y.set(0, o);
  }
  function K(e) {
    if (1 == e.touches.length) L.set(e.touches[0].pageX, e.touches[0].pageY);
    else {
      var t = 0.5 * (e.touches[0].pageX + e.touches[1].pageX),
        n = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
      L.set(t, n);
    }
    j.subVectors(L, A).multiplyScalar(p.rotateSpeed);
    var o = p.domElement;
    S((2 * Math.PI * j.x) / o.clientHeight),
      C((2 * Math.PI * j.y) / o.clientHeight),
      A.copy(L);
  }
  function W(e) {
    if (1 == e.touches.length) R.set(e.touches[0].pageX, e.touches[0].pageY);
    else {
      var t = 0.5 * (e.touches[0].pageX + e.touches[1].pageX),
        n = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
      R.set(t, n);
    }
    k.subVectors(R, w).multiplyScalar(p.panSpeed), X(k.x, k.y), w.copy(R);
  }
  function q(e) {
    var t = e.touches[0].pageX - e.touches[1].pageX,
      n = e.touches[0].pageY - e.touches[1].pageY,
      o = Math.sqrt(t * t + n * n);
    D.set(0, o), x.set(0, Math.pow(D.y / Y.y, p.zoomSpeed)), Z(x.y), Y.copy(D);
  }
  function Q(e) {
    if (!1 !== p.enabled) {
      switch (
        (e.preventDefault(),
        p.domElement.focus ? p.domElement.focus() : window.focus(),
        e.button)
      ) {
        case 0:
          switch (p.mouseButtons.LEFT) {
            case t.ROTATE:
              if (e.ctrlKey || e.metaKey || e.shiftKey) {
                if (!1 === p.enablePan) return;
                U(e), (g = f.PAN);
              } else {
                if (!1 === p.enableRotate) return;
                F(e), (g = f.ROTATE);
              }
              break;
            case t.PAN:
              if (e.ctrlKey || e.metaKey || e.shiftKey) {
                if (!1 === p.enableRotate) return;
                F(e), (g = f.ROTATE);
              } else {
                if (!1 === p.enablePan) return;
                U(e), (g = f.PAN);
              }
              break;
            default:
              g = f.NONE;
          }
          break;
        case 1:
          switch (p.mouseButtons.MIDDLE) {
            case t.DOLLY:
              if (!1 === p.enableZoom) return;
              !(function(e) {
                Y.set(e.clientX, e.clientY);
              })(e),
                (g = f.DOLLY);
              break;
            default:
              g = f.NONE;
          }
          break;
        case 2:
          switch (p.mouseButtons.RIGHT) {
            case t.ROTATE:
              if (!1 === p.enableRotate) return;
              F(e), (g = f.ROTATE);
              break;
            case t.PAN:
              if (!1 === p.enablePan) return;
              U(e), (g = f.PAN);
              break;
            default:
              g = f.NONE;
          }
      }
      g !== f.NONE &&
        (document.addEventListener("mousemove", J, !1),
        document.addEventListener("mouseup", $, !1),
        p.dispatchEvent(b));
    }
  }
  function J(e) {
    if (!1 !== p.enabled)
      switch ((e.preventDefault(), g)) {
        case f.ROTATE:
          if (!1 === p.enableRotate) return;
          !(function(e) {
            L.set(e.clientX, e.clientY),
              j.subVectors(L, A).multiplyScalar(p.rotateSpeed);
            var t = p.domElement;
            S((2 * Math.PI * j.x) / t.clientHeight),
              C((2 * Math.PI * j.y) / t.clientHeight),
              A.copy(L),
              p.update();
          })(e);
          break;
        case f.DOLLY:
          if (!1 === p.enableZoom) return;
          !(function(e) {
            D.set(e.clientX, e.clientY),
              x.subVectors(D, Y),
              x.y > 0 ? Z(M()) : x.y < 0 && I(M()),
              Y.copy(D),
              p.update();
          })(e);
          break;
        case f.PAN:
          if (!1 === p.enablePan) return;
          !(function(e) {
            R.set(e.clientX, e.clientY),
              k.subVectors(R, w).multiplyScalar(p.panSpeed),
              X(k.x, k.y),
              w.copy(R),
              p.update();
          })(e);
      }
  }
  function $(e) {
    !1 !== p.enabled &&
      (document.removeEventListener("mousemove", J, !1),
      document.removeEventListener("mouseup", $, !1),
      p.dispatchEvent(E),
      (g = f.NONE));
  }
  function ee(e) {
    !1 === p.enabled ||
      !1 === p.enableZoom ||
      (g !== f.NONE && g !== f.ROTATE) ||
      (e.preventDefault(),
      e.stopPropagation(),
      p.dispatchEvent(b),
      (function(e) {
        e.deltaY < 0 ? I(M()) : e.deltaY > 0 && Z(M()), p.update();
      })(e),
      p.dispatchEvent(E));
  }
  function te(e) {
    !1 !== p.enabled &&
      !1 !== p.enableKeys &&
      !1 !== p.enablePan &&
      (function(e) {
        var t = !1;
        switch (e.keyCode) {
          case p.keys.UP:
            X(0, p.keyPanSpeed), (t = !0);
            break;
          case p.keys.BOTTOM:
            X(0, -p.keyPanSpeed), (t = !0);
            break;
          case p.keys.LEFT:
            X(p.keyPanSpeed, 0), (t = !0);
            break;
          case p.keys.RIGHT:
            X(-p.keyPanSpeed, 0), (t = !0);
        }
        t && (e.preventDefault(), p.update());
      })(e);
  }
  function ne(e) {
    if (!1 !== p.enabled) {
      switch ((e.preventDefault(), e.touches.length)) {
        case 1:
          switch (p.touches.ONE) {
            case n.ROTATE:
              if (!1 === p.enableRotate) return;
              B(e), (g = f.TOUCH_ROTATE);
              break;
            case n.PAN:
              if (!1 === p.enablePan) return;
              V(e), (g = f.TOUCH_PAN);
              break;
            default:
              g = f.NONE;
          }
          break;
        case 2:
          switch (p.touches.TWO) {
            case n.DOLLY_PAN:
              if (!1 === p.enableZoom && !1 === p.enablePan) return;
              !(function(e) {
                p.enableZoom && G(e), p.enablePan && V(e);
              })(e),
                (g = f.TOUCH_DOLLY_PAN);
              break;
            case n.DOLLY_ROTATE:
              if (!1 === p.enableZoom && !1 === p.enableRotate) return;
              !(function(e) {
                p.enableZoom && G(e), p.enableRotate && B(e);
              })(e),
                (g = f.TOUCH_DOLLY_ROTATE);
              break;
            default:
              g = f.NONE;
          }
          break;
        default:
          g = f.NONE;
      }
      g !== f.NONE && p.dispatchEvent(b);
    }
  }
  function oe(e) {
    if (!1 !== p.enabled)
      switch ((e.preventDefault(), e.stopPropagation(), g)) {
        case f.TOUCH_ROTATE:
          if (!1 === p.enableRotate) return;
          K(e), p.update();
          break;
        case f.TOUCH_PAN:
          if (!1 === p.enablePan) return;
          W(e), p.update();
          break;
        case f.TOUCH_DOLLY_PAN:
          if (!1 === p.enableZoom && !1 === p.enablePan) return;
          !(function(e) {
            p.enableZoom && q(e), p.enablePan && W(e);
          })(e),
            p.update();
          break;
        case f.TOUCH_DOLLY_ROTATE:
          if (!1 === p.enableZoom && !1 === p.enableRotate) return;
          !(function(e) {
            p.enableZoom && q(e), p.enableRotate && K(e);
          })(e),
            p.update();
          break;
        default:
          g = f.NONE;
      }
  }
  function ae(e) {
    !1 !== p.enabled && (p.dispatchEvent(E), (g = f.NONE));
  }
  function ie(e) {
    !1 !== p.enabled && e.preventDefault();
  }
  p.domElement.addEventListener("contextmenu", ie, !1),
    p.domElement.addEventListener("mousedown", Q, !1),
    p.domElement.addEventListener("wheel", ee, !1),
    p.domElement.addEventListener("touchstart", ne, !1),
    p.domElement.addEventListener("touchend", ae, !1),
    p.domElement.addEventListener("touchmove", oe, !1),
    p.domElement.addEventListener("keydown", te, !1),
    -1 === p.domElement.tabIndex && (p.domElement.tabIndex = 0),
    this.update();
};
(c.prototype = Object.create(i.prototype)).constructor = c;
var r = function(e, o) {
  c.call(this, e, o),
    (this.mouseButtons.LEFT = t.PAN),
    (this.mouseButtons.RIGHT = t.ROTATE),
    (this.touches.ONE = n.PAN),
    (this.touches.TWO = n.DOLLY_ROTATE);
};
(r.prototype = Object.create(i.prototype)).constructor = r;
export { r as MapControls, c as OrbitControls };
//# sourceMappingURL=OrbitControls.js.map
