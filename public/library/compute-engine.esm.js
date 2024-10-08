/** CortexJS Compute Engine 0.22.0 */
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));

// node_modules/complex.js/complex.js
var require_complex = __commonJS({
  "node_modules/complex.js/complex.js"(exports, module) {
    (function(root) {
      "use strict";
      var cosh2 = Math.cosh || function(x) {
        return Math.abs(x) < 1e-9 ? 1 - x : (Math.exp(x) + Math.exp(-x)) * 0.5;
      };
      var sinh2 = Math.sinh || function(x) {
        return Math.abs(x) < 1e-9 ? x : (Math.exp(x) - Math.exp(-x)) * 0.5;
      };
      var cosm1 = function(x) {
        var b = Math.PI / 4;
        if (-b > x || x > b) {
          return Math.cos(x) - 1;
        }
        var xx = x * x;
        return xx * (xx * (xx * (xx * (xx * (xx * (xx * (xx / 20922789888e3 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320) - 1 / 720) + 1 / 24) - 1 / 2);
      };
      var hypot2 = function(x, y) {
        var a = Math.abs(x);
        var b = Math.abs(y);
        if (a < 3e3 && b < 3e3) {
          return Math.sqrt(a * a + b * b);
        }
        if (a < b) {
          a = b;
          b = x / y;
        } else {
          b = y / x;
        }
        return a * Math.sqrt(1 + b * b);
      };
      var parser_exit = function() {
        throw SyntaxError("Invalid Param");
      };
      function logHypot(a, b) {
        var _a = Math.abs(a);
        var _b = Math.abs(b);
        if (a === 0) {
          return Math.log(_b);
        }
        if (b === 0) {
          return Math.log(_a);
        }
        if (_a < 3e3 && _b < 3e3) {
          return Math.log(a * a + b * b) * 0.5;
        }
        a = a / 2;
        b = b / 2;
        return 0.5 * Math.log(a * a + b * b) + Math.LN2;
      }
      var parse = function(a, b) {
        var z = { "re": 0, "im": 0 };
        if (a === void 0 || a === null) {
          z["re"] = z["im"] = 0;
        } else if (b !== void 0) {
          z["re"] = a;
          z["im"] = b;
        } else
          switch (typeof a) {
            case "object":
              if ("im" in a && "re" in a) {
                z["re"] = a["re"];
                z["im"] = a["im"];
              } else if ("abs" in a && "arg" in a) {
                if (!Number.isFinite(a["abs"]) && Number.isFinite(a["arg"])) {
                  return Complex21["INFINITY"];
                }
                z["re"] = a["abs"] * Math.cos(a["arg"]);
                z["im"] = a["abs"] * Math.sin(a["arg"]);
              } else if ("r" in a && "phi" in a) {
                if (!Number.isFinite(a["r"]) && Number.isFinite(a["phi"])) {
                  return Complex21["INFINITY"];
                }
                z["re"] = a["r"] * Math.cos(a["phi"]);
                z["im"] = a["r"] * Math.sin(a["phi"]);
              } else if (a.length === 2) {
                z["re"] = a[0];
                z["im"] = a[1];
              } else {
                parser_exit();
              }
              break;
            case "string":
              z["im"] = /* void */
              z["re"] = 0;
              var tokens = a.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
              var plus = 1;
              var minus = 0;
              if (tokens === null) {
                parser_exit();
              }
              for (var i = 0; i < tokens.length; i++) {
                var c = tokens[i];
                if (c === " " || c === "	" || c === "\n") {
                } else if (c === "+") {
                  plus++;
                } else if (c === "-") {
                  minus++;
                } else if (c === "i" || c === "I") {
                  if (plus + minus === 0) {
                    parser_exit();
                  }
                  if (tokens[i + 1] !== " " && !isNaN(tokens[i + 1])) {
                    z["im"] += parseFloat((minus % 2 ? "-" : "") + tokens[i + 1]);
                    i++;
                  } else {
                    z["im"] += parseFloat((minus % 2 ? "-" : "") + "1");
                  }
                  plus = minus = 0;
                } else {
                  if (plus + minus === 0 || isNaN(c)) {
                    parser_exit();
                  }
                  if (tokens[i + 1] === "i" || tokens[i + 1] === "I") {
                    z["im"] += parseFloat((minus % 2 ? "-" : "") + c);
                    i++;
                  } else {
                    z["re"] += parseFloat((minus % 2 ? "-" : "") + c);
                  }
                  plus = minus = 0;
                }
              }
              if (plus + minus > 0) {
                parser_exit();
              }
              break;
            case "number":
              z["im"] = 0;
              z["re"] = a;
              break;
            default:
              parser_exit();
          }
        if (isNaN(z["re"]) || isNaN(z["im"])) {
        }
        return z;
      };
      function Complex21(a, b) {
        if (!(this instanceof Complex21)) {
          return new Complex21(a, b);
        }
        var z = parse(a, b);
        this["re"] = z["re"];
        this["im"] = z["im"];
      }
      Complex21.prototype = {
        "re": 0,
        "im": 0,
        /**
         * Calculates the sign of a complex number, which is a normalized complex
         *
         * @returns {Complex}
         */
        "sign": function() {
          var abs2 = this["abs"]();
          return new Complex21(
            this["re"] / abs2,
            this["im"] / abs2
          );
        },
        /**
         * Adds two complex numbers
         *
         * @returns {Complex}
         */
        "add": function(a, b) {
          var z = new Complex21(a, b);
          if (this["isInfinite"]() && z["isInfinite"]()) {
            return Complex21["NAN"];
          }
          if (this["isInfinite"]() || z["isInfinite"]()) {
            return Complex21["INFINITY"];
          }
          return new Complex21(
            this["re"] + z["re"],
            this["im"] + z["im"]
          );
        },
        /**
         * Subtracts two complex numbers
         *
         * @returns {Complex}
         */
        "sub": function(a, b) {
          var z = new Complex21(a, b);
          if (this["isInfinite"]() && z["isInfinite"]()) {
            return Complex21["NAN"];
          }
          if (this["isInfinite"]() || z["isInfinite"]()) {
            return Complex21["INFINITY"];
          }
          return new Complex21(
            this["re"] - z["re"],
            this["im"] - z["im"]
          );
        },
        /**
         * Multiplies two complex numbers
         *
         * @returns {Complex}
         */
        "mul": function(a, b) {
          var z = new Complex21(a, b);
          if (this["isInfinite"]() && z["isZero"]() || this["isZero"]() && z["isInfinite"]()) {
            return Complex21["NAN"];
          }
          if (this["isInfinite"]() || z["isInfinite"]()) {
            return Complex21["INFINITY"];
          }
          if (z["im"] === 0 && this["im"] === 0) {
            return new Complex21(this["re"] * z["re"], 0);
          }
          return new Complex21(
            this["re"] * z["re"] - this["im"] * z["im"],
            this["re"] * z["im"] + this["im"] * z["re"]
          );
        },
        /**
         * Divides two complex numbers
         *
         * @returns {Complex}
         */
        "div": function(a, b) {
          var z = new Complex21(a, b);
          if (this["isZero"]() && z["isZero"]() || this["isInfinite"]() && z["isInfinite"]()) {
            return Complex21["NAN"];
          }
          if (this["isInfinite"]() || z["isZero"]()) {
            return Complex21["INFINITY"];
          }
          if (this["isZero"]() || z["isInfinite"]()) {
            return Complex21["ZERO"];
          }
          a = this["re"];
          b = this["im"];
          var c = z["re"];
          var d = z["im"];
          var t, x;
          if (0 === d) {
            return new Complex21(a / c, b / c);
          }
          if (Math.abs(c) < Math.abs(d)) {
            x = c / d;
            t = c * x + d;
            return new Complex21(
              (a * x + b) / t,
              (b * x - a) / t
            );
          } else {
            x = d / c;
            t = d * x + c;
            return new Complex21(
              (a + b * x) / t,
              (b - a * x) / t
            );
          }
        },
        /**
         * Calculate the power of two complex numbers
         *
         * @returns {Complex}
         */
        "pow": function(a, b) {
          var z = new Complex21(a, b);
          a = this["re"];
          b = this["im"];
          if (z["isZero"]()) {
            return Complex21["ONE"];
          }
          if (z["im"] === 0) {
            if (b === 0 && a > 0) {
              return new Complex21(Math.pow(a, z["re"]), 0);
            } else if (a === 0) {
              switch ((z["re"] % 4 + 4) % 4) {
                case 0:
                  return new Complex21(Math.pow(b, z["re"]), 0);
                case 1:
                  return new Complex21(0, Math.pow(b, z["re"]));
                case 2:
                  return new Complex21(-Math.pow(b, z["re"]), 0);
                case 3:
                  return new Complex21(0, -Math.pow(b, z["re"]));
              }
            }
          }
          if (a === 0 && b === 0 && z["re"] > 0 && z["im"] >= 0) {
            return Complex21["ZERO"];
          }
          var arg = Math.atan2(b, a);
          var loh = logHypot(a, b);
          a = Math.exp(z["re"] * loh - z["im"] * arg);
          b = z["im"] * loh + z["re"] * arg;
          return new Complex21(
            a * Math.cos(b),
            a * Math.sin(b)
          );
        },
        /**
         * Calculate the complex square root
         *
         * @returns {Complex}
         */
        "sqrt": function() {
          var a = this["re"];
          var b = this["im"];
          var r = this["abs"]();
          var re, im;
          if (a >= 0) {
            if (b === 0) {
              return new Complex21(Math.sqrt(a), 0);
            }
            re = 0.5 * Math.sqrt(2 * (r + a));
          } else {
            re = Math.abs(b) / Math.sqrt(2 * (r - a));
          }
          if (a <= 0) {
            im = 0.5 * Math.sqrt(2 * (r - a));
          } else {
            im = Math.abs(b) / Math.sqrt(2 * (r + a));
          }
          return new Complex21(re, b < 0 ? -im : im);
        },
        /**
         * Calculate the complex exponent
         *
         * @returns {Complex}
         */
        "exp": function() {
          var tmp = Math.exp(this["re"]);
          if (this["im"] === 0) {
          }
          return new Complex21(
            tmp * Math.cos(this["im"]),
            tmp * Math.sin(this["im"])
          );
        },
        /**
         * Calculate the complex exponent and subtracts one.
         *
         * This may be more accurate than `Complex(x).exp().sub(1)` if
         * `x` is small.
         *
         * @returns {Complex}
         */
        "expm1": function() {
          var a = this["re"];
          var b = this["im"];
          return new Complex21(
            Math.expm1(a) * Math.cos(b) + cosm1(b),
            Math.exp(a) * Math.sin(b)
          );
        },
        /**
         * Calculate the natural log
         *
         * @returns {Complex}
         */
        "log": function() {
          var a = this["re"];
          var b = this["im"];
          if (b === 0 && a > 0) {
          }
          return new Complex21(
            logHypot(a, b),
            Math.atan2(b, a)
          );
        },
        /**
         * Calculate the magnitude of the complex number
         *
         * @returns {number}
         */
        "abs": function() {
          return hypot2(this["re"], this["im"]);
        },
        /**
         * Calculate the angle of the complex number
         *
         * @returns {number}
         */
        "arg": function() {
          return Math.atan2(this["im"], this["re"]);
        },
        /**
         * Calculate the sine of the complex number
         *
         * @returns {Complex}
         */
        "sin": function() {
          var a = this["re"];
          var b = this["im"];
          return new Complex21(
            Math.sin(a) * cosh2(b),
            Math.cos(a) * sinh2(b)
          );
        },
        /**
         * Calculate the cosine
         *
         * @returns {Complex}
         */
        "cos": function() {
          var a = this["re"];
          var b = this["im"];
          return new Complex21(
            Math.cos(a) * cosh2(b),
            -Math.sin(a) * sinh2(b)
          );
        },
        /**
         * Calculate the tangent
         *
         * @returns {Complex}
         */
        "tan": function() {
          var a = 2 * this["re"];
          var b = 2 * this["im"];
          var d = Math.cos(a) + cosh2(b);
          return new Complex21(
            Math.sin(a) / d,
            sinh2(b) / d
          );
        },
        /**
         * Calculate the cotangent
         *
         * @returns {Complex}
         */
        "cot": function() {
          var a = 2 * this["re"];
          var b = 2 * this["im"];
          var d = Math.cos(a) - cosh2(b);
          return new Complex21(
            -Math.sin(a) / d,
            sinh2(b) / d
          );
        },
        /**
         * Calculate the secant
         *
         * @returns {Complex}
         */
        "sec": function() {
          var a = this["re"];
          var b = this["im"];
          var d = 0.5 * cosh2(2 * b) + 0.5 * Math.cos(2 * a);
          return new Complex21(
            Math.cos(a) * cosh2(b) / d,
            Math.sin(a) * sinh2(b) / d
          );
        },
        /**
         * Calculate the cosecans
         *
         * @returns {Complex}
         */
        "csc": function() {
          var a = this["re"];
          var b = this["im"];
          var d = 0.5 * cosh2(2 * b) - 0.5 * Math.cos(2 * a);
          return new Complex21(
            Math.sin(a) * cosh2(b) / d,
            -Math.cos(a) * sinh2(b) / d
          );
        },
        /**
         * Calculate the complex arcus sinus
         *
         * @returns {Complex}
         */
        "asin": function() {
          var a = this["re"];
          var b = this["im"];
          var t1 = new Complex21(
            b * b - a * a + 1,
            -2 * a * b
          )["sqrt"]();
          var t2 = new Complex21(
            t1["re"] - b,
            t1["im"] + a
          )["log"]();
          return new Complex21(t2["im"], -t2["re"]);
        },
        /**
         * Calculate the complex arcus cosinus
         *
         * @returns {Complex}
         */
        "acos": function() {
          var a = this["re"];
          var b = this["im"];
          var t1 = new Complex21(
            b * b - a * a + 1,
            -2 * a * b
          )["sqrt"]();
          var t2 = new Complex21(
            t1["re"] - b,
            t1["im"] + a
          )["log"]();
          return new Complex21(Math.PI / 2 - t2["im"], t2["re"]);
        },
        /**
         * Calculate the complex arcus tangent
         *
         * @returns {Complex}
         */
        "atan": function() {
          var a = this["re"];
          var b = this["im"];
          if (a === 0) {
            if (b === 1) {
              return new Complex21(0, Infinity);
            }
            if (b === -1) {
              return new Complex21(0, -Infinity);
            }
          }
          var d = a * a + (1 - b) * (1 - b);
          var t1 = new Complex21(
            (1 - b * b - a * a) / d,
            -2 * a / d
          ).log();
          return new Complex21(-0.5 * t1["im"], 0.5 * t1["re"]);
        },
        /**
         * Calculate the complex arcus cotangent
         *
         * @returns {Complex}
         */
        "acot": function() {
          var a = this["re"];
          var b = this["im"];
          if (b === 0) {
            return new Complex21(Math.atan2(1, a), 0);
          }
          var d = a * a + b * b;
          return d !== 0 ? new Complex21(
            a / d,
            -b / d
          ).atan() : new Complex21(
            a !== 0 ? a / 0 : 0,
            b !== 0 ? -b / 0 : 0
          ).atan();
        },
        /**
         * Calculate the complex arcus secant
         *
         * @returns {Complex}
         */
        "asec": function() {
          var a = this["re"];
          var b = this["im"];
          if (a === 0 && b === 0) {
            return new Complex21(0, Infinity);
          }
          var d = a * a + b * b;
          return d !== 0 ? new Complex21(
            a / d,
            -b / d
          ).acos() : new Complex21(
            a !== 0 ? a / 0 : 0,
            b !== 0 ? -b / 0 : 0
          ).acos();
        },
        /**
         * Calculate the complex arcus cosecans
         *
         * @returns {Complex}
         */
        "acsc": function() {
          var a = this["re"];
          var b = this["im"];
          if (a === 0 && b === 0) {
            return new Complex21(Math.PI / 2, Infinity);
          }
          var d = a * a + b * b;
          return d !== 0 ? new Complex21(
            a / d,
            -b / d
          ).asin() : new Complex21(
            a !== 0 ? a / 0 : 0,
            b !== 0 ? -b / 0 : 0
          ).asin();
        },
        /**
         * Calculate the complex sinh
         *
         * @returns {Complex}
         */
        "sinh": function() {
          var a = this["re"];
          var b = this["im"];
          return new Complex21(
            sinh2(a) * Math.cos(b),
            cosh2(a) * Math.sin(b)
          );
        },
        /**
         * Calculate the complex cosh
         *
         * @returns {Complex}
         */
        "cosh": function() {
          var a = this["re"];
          var b = this["im"];
          return new Complex21(
            cosh2(a) * Math.cos(b),
            sinh2(a) * Math.sin(b)
          );
        },
        /**
         * Calculate the complex tanh
         *
         * @returns {Complex}
         */
        "tanh": function() {
          var a = 2 * this["re"];
          var b = 2 * this["im"];
          var d = cosh2(a) + Math.cos(b);
          return new Complex21(
            sinh2(a) / d,
            Math.sin(b) / d
          );
        },
        /**
         * Calculate the complex coth
         *
         * @returns {Complex}
         */
        "coth": function() {
          var a = 2 * this["re"];
          var b = 2 * this["im"];
          var d = cosh2(a) - Math.cos(b);
          return new Complex21(
            sinh2(a) / d,
            -Math.sin(b) / d
          );
        },
        /**
         * Calculate the complex coth
         *
         * @returns {Complex}
         */
        "csch": function() {
          var a = this["re"];
          var b = this["im"];
          var d = Math.cos(2 * b) - cosh2(2 * a);
          return new Complex21(
            -2 * sinh2(a) * Math.cos(b) / d,
            2 * cosh2(a) * Math.sin(b) / d
          );
        },
        /**
         * Calculate the complex sech
         *
         * @returns {Complex}
         */
        "sech": function() {
          var a = this["re"];
          var b = this["im"];
          var d = Math.cos(2 * b) + cosh2(2 * a);
          return new Complex21(
            2 * cosh2(a) * Math.cos(b) / d,
            -2 * sinh2(a) * Math.sin(b) / d
          );
        },
        /**
         * Calculate the complex asinh
         *
         * @returns {Complex}
         */
        "asinh": function() {
          var tmp = this["im"];
          this["im"] = -this["re"];
          this["re"] = tmp;
          var res = this["asin"]();
          this["re"] = -this["im"];
          this["im"] = tmp;
          tmp = res["re"];
          res["re"] = -res["im"];
          res["im"] = tmp;
          return res;
        },
        /**
         * Calculate the complex acosh
         *
         * @returns {Complex}
         */
        "acosh": function() {
          var res = this["acos"]();
          if (res["im"] <= 0) {
            var tmp = res["re"];
            res["re"] = -res["im"];
            res["im"] = tmp;
          } else {
            var tmp = res["im"];
            res["im"] = -res["re"];
            res["re"] = tmp;
          }
          return res;
        },
        /**
         * Calculate the complex atanh
         *
         * @returns {Complex}
         */
        "atanh": function() {
          var a = this["re"];
          var b = this["im"];
          var noIM = a > 1 && b === 0;
          var oneMinus = 1 - a;
          var onePlus = 1 + a;
          var d = oneMinus * oneMinus + b * b;
          var x = d !== 0 ? new Complex21(
            (onePlus * oneMinus - b * b) / d,
            (b * oneMinus + onePlus * b) / d
          ) : new Complex21(
            a !== -1 ? a / 0 : 0,
            b !== 0 ? b / 0 : 0
          );
          var temp = x["re"];
          x["re"] = logHypot(x["re"], x["im"]) / 2;
          x["im"] = Math.atan2(x["im"], temp) / 2;
          if (noIM) {
            x["im"] = -x["im"];
          }
          return x;
        },
        /**
         * Calculate the complex acoth
         *
         * @returns {Complex}
         */
        "acoth": function() {
          var a = this["re"];
          var b = this["im"];
          if (a === 0 && b === 0) {
            return new Complex21(0, Math.PI / 2);
          }
          var d = a * a + b * b;
          return d !== 0 ? new Complex21(
            a / d,
            -b / d
          ).atanh() : new Complex21(
            a !== 0 ? a / 0 : 0,
            b !== 0 ? -b / 0 : 0
          ).atanh();
        },
        /**
         * Calculate the complex acsch
         *
         * @returns {Complex}
         */
        "acsch": function() {
          var a = this["re"];
          var b = this["im"];
          if (b === 0) {
            return new Complex21(
              a !== 0 ? Math.log(a + Math.sqrt(a * a + 1)) : Infinity,
              0
            );
          }
          var d = a * a + b * b;
          return d !== 0 ? new Complex21(
            a / d,
            -b / d
          ).asinh() : new Complex21(
            a !== 0 ? a / 0 : 0,
            b !== 0 ? -b / 0 : 0
          ).asinh();
        },
        /**
         * Calculate the complex asech
         *
         * @returns {Complex}
         */
        "asech": function() {
          var a = this["re"];
          var b = this["im"];
          if (this["isZero"]()) {
            return Complex21["INFINITY"];
          }
          var d = a * a + b * b;
          return d !== 0 ? new Complex21(
            a / d,
            -b / d
          ).acosh() : new Complex21(
            a !== 0 ? a / 0 : 0,
            b !== 0 ? -b / 0 : 0
          ).acosh();
        },
        /**
         * Calculate the complex inverse 1/z
         *
         * @returns {Complex}
         */
        "inverse": function() {
          if (this["isZero"]()) {
            return Complex21["INFINITY"];
          }
          if (this["isInfinite"]()) {
            return Complex21["ZERO"];
          }
          var a = this["re"];
          var b = this["im"];
          var d = a * a + b * b;
          return new Complex21(a / d, -b / d);
        },
        /**
         * Returns the complex conjugate
         *
         * @returns {Complex}
         */
        "conjugate": function() {
          return new Complex21(this["re"], -this["im"]);
        },
        /**
         * Gets the negated complex number
         *
         * @returns {Complex}
         */
        "neg": function() {
          return new Complex21(-this["re"], -this["im"]);
        },
        /**
         * Ceils the actual complex number
         *
         * @returns {Complex}
         */
        "ceil": function(places) {
          places = Math.pow(10, places || 0);
          return new Complex21(
            Math.ceil(this["re"] * places) / places,
            Math.ceil(this["im"] * places) / places
          );
        },
        /**
         * Floors the actual complex number
         *
         * @returns {Complex}
         */
        "floor": function(places) {
          places = Math.pow(10, places || 0);
          return new Complex21(
            Math.floor(this["re"] * places) / places,
            Math.floor(this["im"] * places) / places
          );
        },
        /**
         * Ceils the actual complex number
         *
         * @returns {Complex}
         */
        "round": function(places) {
          places = Math.pow(10, places || 0);
          return new Complex21(
            Math.round(this["re"] * places) / places,
            Math.round(this["im"] * places) / places
          );
        },
        /**
         * Compares two complex numbers
         *
         * **Note:** new Complex(Infinity).equals(Infinity) === false
         *
         * @returns {boolean}
         */
        "equals": function(a, b) {
          var z = new Complex21(a, b);
          return Math.abs(z["re"] - this["re"]) <= Complex21["EPSILON"] && Math.abs(z["im"] - this["im"]) <= Complex21["EPSILON"];
        },
        /**
         * Clones the actual object
         *
         * @returns {Complex}
         */
        "clone": function() {
          return new Complex21(this["re"], this["im"]);
        },
        /**
         * Gets a string of the actual complex number
         *
         * @returns {string}
         */
        "toString": function() {
          var a = this["re"];
          var b = this["im"];
          var ret = "";
          if (this["isNaN"]()) {
            return "NaN";
          }
          if (this["isInfinite"]()) {
            return "Infinity";
          }
          if (Math.abs(a) < Complex21["EPSILON"]) {
            a = 0;
          }
          if (Math.abs(b) < Complex21["EPSILON"]) {
            b = 0;
          }
          if (b === 0) {
            return ret + a;
          }
          if (a !== 0) {
            ret += a;
            ret += " ";
            if (b < 0) {
              b = -b;
              ret += "-";
            } else {
              ret += "+";
            }
            ret += " ";
          } else if (b < 0) {
            b = -b;
            ret += "-";
          }
          if (1 !== b) {
            ret += b;
          }
          return ret + "i";
        },
        /**
         * Returns the actual number as a vector
         *
         * @returns {Array}
         */
        "toVector": function() {
          return [this["re"], this["im"]];
        },
        /**
         * Returns the actual real value of the current object
         *
         * @returns {number|null}
         */
        "valueOf": function() {
          if (this["im"] === 0) {
            return this["re"];
          }
          return null;
        },
        /**
         * Determines whether a complex number is not on the Riemann sphere.
         *
         * @returns {boolean}
         */
        "isNaN": function() {
          return isNaN(this["re"]) || isNaN(this["im"]);
        },
        /**
         * Determines whether or not a complex number is at the zero pole of the
         * Riemann sphere.
         *
         * @returns {boolean}
         */
        "isZero": function() {
          return this["im"] === 0 && this["re"] === 0;
        },
        /**
         * Determines whether a complex number is not at the infinity pole of the
         * Riemann sphere.
         *
         * @returns {boolean}
         */
        "isFinite": function() {
          return isFinite(this["re"]) && isFinite(this["im"]);
        },
        /**
         * Determines whether or not a complex number is at the infinity pole of the
         * Riemann sphere.
         *
         * @returns {boolean}
         */
        "isInfinite": function() {
          return !(this["isNaN"]() || this["isFinite"]());
        }
      };
      Complex21["ZERO"] = new Complex21(0, 0);
      Complex21["ONE"] = new Complex21(1, 0);
      Complex21["I"] = new Complex21(0, 1);
      Complex21["PI"] = new Complex21(Math.PI, 0);
      Complex21["E"] = new Complex21(Math.E, 0);
      Complex21["INFINITY"] = new Complex21(Infinity, Infinity);
      Complex21["NAN"] = new Complex21(NaN, NaN);
      Complex21["EPSILON"] = 1e-15;
      if (typeof define === "function" && define["amd"]) {
        define([], function() {
          return Complex21;
        });
      } else if (typeof exports === "object") {
        Object.defineProperty(Complex21, "__esModule", { "value": true });
        Complex21["default"] = Complex21;
        Complex21["Complex"] = Complex21;
        module["exports"] = Complex21;
      } else {
        root["Complex"] = Complex21;
      }
    })(exports);
  }
});

// src/compute-engine/latex-syntax/public.ts
var COMPARISON_PRECEDENCE = 245;
var ASSIGNMENT_PRECEDENCE = 260;
var ARROW_PRECEDENCE = 270;
var ADDITION_PRECEDENCE = 275;
var MULTIPLICATION_PRECEDENCE = 390;
var DIVISION_PRECEDENCE = 600;
var EXPONENTIATION_PRECEDENCE = 700;
var POSTFIX_PRECEDENCE = 810;
function isExpressionEntry(entry) {
  return !("kind" in entry) || entry.kind === "expression";
}
function isSymbolEntry(entry) {
  return "kind" in entry && entry.kind === "symbol";
}
function isFunctionEntry(entry) {
  return "kind" in entry && entry.kind === "function";
}
function isMatchfixEntry(entry) {
  return "kind" in entry && entry.kind === "matchfix";
}
function isInfixEntry(entry) {
  return "kind" in entry && entry.kind === "infix";
}
function isPrefixEntry(entry) {
  return "kind" in entry && entry.kind === "prefix";
}
function isPostfixEntry(entry) {
  return "kind" in entry && entry.kind === "postfix";
}
function isEnvironmentEntry(entry) {
  return "kind" in entry && entry.kind === "environment";
}

// src/compute-engine/compute-engine.ts
var import_complex21 = __toESM(require_complex(), 1);

// node_modules/decimal.js/decimal.mjs
var EXP_LIMIT = 9e15;
var MAX_DIGITS = 1e9;
var NUMERALS = "0123456789abcdef";
var LN10 = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";
var PI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789";
var DEFAULTS = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed at run-time using the `Decimal.config` method.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used when rounding to `precision`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The modulo mode used when calculating the modulus: a mod n.
  // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
  // The remainder (r) is calculated as: r = a - n * q.
  //
  // UP         0 The remainder is positive if the dividend is negative, else is negative.
  // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
  // FLOOR      3 The remainder has the same sign as the divisor (Python %).
  // HALF_EVEN  6 The IEEE 754 remainder function.
  // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
  //
  // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
  // division (9) are commonly used for the modulus operation. The other rounding modes can also
  // be used, but they may not give useful results.
  modulo: 1,
  // 0 to 9
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -EXP_LIMIT
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to EXP_LIMIT
  // The minimum exponent value, beneath which underflow to zero occurs.
  // JavaScript numbers: -324  (5e-324)
  minE: -EXP_LIMIT,
  // -1 to -EXP_LIMIT
  // The maximum exponent value, above which overflow to Infinity occurs.
  // JavaScript numbers: 308  (1.7976931348623157e+308)
  maxE: EXP_LIMIT,
  // 1 to EXP_LIMIT
  // Whether to use cryptographically-secure random number generation, if available.
  crypto: false
  // true/false
};
var inexact;
var quadrant;
var external = true;
var decimalError = "[DecimalError] ";
var invalidArgument = decimalError + "Invalid argument: ";
var precisionLimitExceeded = decimalError + "Precision limit exceeded";
var cryptoUnavailable = decimalError + "crypto unavailable";
var tag = "[object Decimal]";
var mathfloor = Math.floor;
var mathpow = Math.pow;
var isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i;
var isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i;
var isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i;
var isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
var BASE = 1e7;
var LOG_BASE = 7;
var MAX_SAFE_INTEGER = 9007199254740991;
var LN10_PRECISION = LN10.length - 1;
var PI_PRECISION = PI.length - 1;
var P = { toStringTag: tag };
P.absoluteValue = P.abs = function() {
  var x = new this.constructor(this);
  if (x.s < 0)
    x.s = 1;
  return finalise(x);
};
P.ceil = function() {
  return finalise(new this.constructor(this), this.e + 1, 2);
};
P.clampedTo = P.clamp = function(min2, max2) {
  var k, x = this, Ctor = x.constructor;
  min2 = new Ctor(min2);
  max2 = new Ctor(max2);
  if (!min2.s || !max2.s)
    return new Ctor(NaN);
  if (min2.gt(max2))
    throw Error(invalidArgument + max2);
  k = x.cmp(min2);
  return k < 0 ? min2 : x.cmp(max2) > 0 ? max2 : new Ctor(x);
};
P.comparedTo = P.cmp = function(y) {
  var i, j, xdL, ydL, x = this, xd = x.d, yd = (y = new x.constructor(y)).d, xs = x.s, ys = y.s;
  if (!xd || !yd) {
    return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
  }
  if (!xd[0] || !yd[0])
    return xd[0] ? xs : yd[0] ? -ys : 0;
  if (xs !== ys)
    return xs;
  if (x.e !== y.e)
    return x.e > y.e ^ xs < 0 ? 1 : -1;
  xdL = xd.length;
  ydL = yd.length;
  for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
    if (xd[i] !== yd[i])
      return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
  }
  return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
};
P.cosine = P.cos = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.d)
    return new Ctor(NaN);
  if (!x.d[0])
    return new Ctor(1);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
  Ctor.rounding = 1;
  x = cosine(Ctor, toLessThanHalfPi(Ctor, x));
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
};
P.cubeRoot = P.cbrt = function() {
  var e, m, n, r, rep, s, sd, t, t3, t3plusx, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero())
    return new Ctor(x);
  external = false;
  s = x.s * mathpow(x.s * x, 1 / 3);
  if (!s || Math.abs(s) == 1 / 0) {
    n = digitsToString(x.d);
    e = x.e;
    if (s = (e - n.length + 1) % 3)
      n += s == 1 || s == -2 ? "0" : "00";
    s = mathpow(n, 1 / 3);
    e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));
    if (s == 1 / 0) {
      n = "5e" + e;
    } else {
      n = s.toExponential();
      n = n.slice(0, n.indexOf("e") + 1) + e;
    }
    r = new Ctor(n);
    r.s = x.s;
  } else {
    r = new Ctor(s.toString());
  }
  sd = (e = Ctor.precision) + 3;
  for (; ; ) {
    t = r;
    t3 = t.times(t).times(t);
    t3plusx = t3.plus(x);
    r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);
    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
      n = n.slice(sd - 3, sd + 1);
      if (n == "9999" || !rep && n == "4999") {
        if (!rep) {
          finalise(t, e + 1, 0);
          if (t.times(t).times(t).eq(x)) {
            r = t;
            break;
          }
        }
        sd += 4;
        rep = 1;
      } else {
        if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
          finalise(r, e + 1, 1);
          m = !r.times(r).times(r).eq(x);
        }
        break;
      }
    }
  }
  external = true;
  return finalise(r, e, Ctor.rounding, m);
};
P.decimalPlaces = P.dp = function() {
  var w, d = this.d, n = NaN;
  if (d) {
    w = d.length - 1;
    n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;
    w = d[w];
    if (w)
      for (; w % 10 == 0; w /= 10)
        n--;
    if (n < 0)
      n = 0;
  }
  return n;
};
P.dividedBy = P.div = function(y) {
  return divide(this, new this.constructor(y));
};
P.dividedToIntegerBy = P.divToInt = function(y) {
  var x = this, Ctor = x.constructor;
  return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
};
P.equals = P.eq = function(y) {
  return this.cmp(y) === 0;
};
P.floor = function() {
  return finalise(new this.constructor(this), this.e + 1, 3);
};
P.greaterThan = P.gt = function(y) {
  return this.cmp(y) > 0;
};
P.greaterThanOrEqualTo = P.gte = function(y) {
  var k = this.cmp(y);
  return k == 1 || k === 0;
};
P.hyperbolicCosine = P.cosh = function() {
  var k, n, pr, rm, len, x = this, Ctor = x.constructor, one = new Ctor(1);
  if (!x.isFinite())
    return new Ctor(x.s ? 1 / 0 : NaN);
  if (x.isZero())
    return one;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
  Ctor.rounding = 1;
  len = x.d.length;
  if (len < 32) {
    k = Math.ceil(len / 3);
    n = (1 / tinyPow(4, k)).toString();
  } else {
    k = 16;
    n = "2.3283064365386962890625e-10";
  }
  x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);
  var cosh2_x, i = k, d8 = new Ctor(8);
  for (; i--; ) {
    cosh2_x = x.times(x);
    x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
  }
  return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
};
P.hyperbolicSine = P.sinh = function() {
  var k, pr, rm, len, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
  Ctor.rounding = 1;
  len = x.d.length;
  if (len < 3) {
    x = taylorSeries(Ctor, 2, x, x, true);
  } else {
    k = 1.4 * Math.sqrt(len);
    k = k > 16 ? 16 : k | 0;
    x = x.times(1 / tinyPow(5, k));
    x = taylorSeries(Ctor, 2, x, x, true);
    var sinh2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
    for (; k--; ) {
      sinh2_x = x.times(x);
      x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
    }
  }
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(x, pr, rm, true);
};
P.hyperbolicTangent = P.tanh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(x.s);
  if (x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 7;
  Ctor.rounding = 1;
  return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
};
P.inverseCosine = P.acos = function() {
  var halfPi, x = this, Ctor = x.constructor, k = x.abs().cmp(1), pr = Ctor.precision, rm = Ctor.rounding;
  if (k !== -1) {
    return k === 0 ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0) : new Ctor(NaN);
  }
  if (x.isZero())
    return getPi(Ctor, pr + 4, rm).times(0.5);
  Ctor.precision = pr + 6;
  Ctor.rounding = 1;
  x = x.asin();
  halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return halfPi.minus(x);
};
P.inverseHyperbolicCosine = P.acosh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (x.lte(1))
    return new Ctor(x.eq(1) ? 0 : NaN);
  if (!x.isFinite())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
  Ctor.rounding = 1;
  external = false;
  x = x.times(x).minus(1).sqrt().plus(x);
  external = true;
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.ln();
};
P.inverseHyperbolicSine = P.asinh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
  Ctor.rounding = 1;
  external = false;
  x = x.times(x).plus(1).sqrt().plus(x);
  external = true;
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.ln();
};
P.inverseHyperbolicTangent = P.atanh = function() {
  var pr, rm, wpr, xsd, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(NaN);
  if (x.e >= 0)
    return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  xsd = x.sd();
  if (Math.max(xsd, pr) < 2 * -x.e - 1)
    return finalise(new Ctor(x), pr, rm, true);
  Ctor.precision = wpr = xsd - x.e;
  x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);
  Ctor.precision = pr + 4;
  Ctor.rounding = 1;
  x = x.ln();
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.times(0.5);
};
P.inverseSine = P.asin = function() {
  var halfPi, k, pr, rm, x = this, Ctor = x.constructor;
  if (x.isZero())
    return new Ctor(x);
  k = x.abs().cmp(1);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (k !== -1) {
    if (k === 0) {
      halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
      halfPi.s = x.s;
      return halfPi;
    }
    return new Ctor(NaN);
  }
  Ctor.precision = pr + 6;
  Ctor.rounding = 1;
  x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.times(2);
};
P.inverseTangent = P.atan = function() {
  var i, j, k, n, px, t, r, wpr, x2, x = this, Ctor = x.constructor, pr = Ctor.precision, rm = Ctor.rounding;
  if (!x.isFinite()) {
    if (!x.s)
      return new Ctor(NaN);
    if (pr + 4 <= PI_PRECISION) {
      r = getPi(Ctor, pr + 4, rm).times(0.5);
      r.s = x.s;
      return r;
    }
  } else if (x.isZero()) {
    return new Ctor(x);
  } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
    r = getPi(Ctor, pr + 4, rm).times(0.25);
    r.s = x.s;
    return r;
  }
  Ctor.precision = wpr = pr + 10;
  Ctor.rounding = 1;
  k = Math.min(28, wpr / LOG_BASE + 2 | 0);
  for (i = k; i; --i)
    x = x.div(x.times(x).plus(1).sqrt().plus(1));
  external = false;
  j = Math.ceil(wpr / LOG_BASE);
  n = 1;
  x2 = x.times(x);
  r = new Ctor(x);
  px = x;
  for (; i !== -1; ) {
    px = px.times(x2);
    t = r.minus(px.div(n += 2));
    px = px.times(x2);
    r = t.plus(px.div(n += 2));
    if (r.d[j] !== void 0)
      for (i = j; r.d[i] === t.d[i] && i--; )
        ;
  }
  if (k)
    r = r.times(2 << k - 1);
  external = true;
  return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
};
P.isFinite = function() {
  return !!this.d;
};
P.isInteger = P.isInt = function() {
  return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
};
P.isNaN = function() {
  return !this.s;
};
P.isNegative = P.isNeg = function() {
  return this.s < 0;
};
P.isPositive = P.isPos = function() {
  return this.s > 0;
};
P.isZero = function() {
  return !!this.d && this.d[0] === 0;
};
P.lessThan = P.lt = function(y) {
  return this.cmp(y) < 0;
};
P.lessThanOrEqualTo = P.lte = function(y) {
  return this.cmp(y) < 1;
};
P.logarithm = P.log = function(base) {
  var isBase10, d, denominator, k, inf, num, sd, r, arg = this, Ctor = arg.constructor, pr = Ctor.precision, rm = Ctor.rounding, guard = 5;
  if (base == null) {
    base = new Ctor(10);
    isBase10 = true;
  } else {
    base = new Ctor(base);
    d = base.d;
    if (base.s < 0 || !d || !d[0] || base.eq(1))
      return new Ctor(NaN);
    isBase10 = base.eq(10);
  }
  d = arg.d;
  if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
    return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
  }
  if (isBase10) {
    if (d.length > 1) {
      inf = true;
    } else {
      for (k = d[0]; k % 10 === 0; )
        k /= 10;
      inf = k !== 1;
    }
  }
  external = false;
  sd = pr + guard;
  num = naturalLogarithm(arg, sd);
  denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
  r = divide(num, denominator, sd, 1);
  if (checkRoundingDigits(r.d, k = pr, rm)) {
    do {
      sd += 10;
      num = naturalLogarithm(arg, sd);
      denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
      r = divide(num, denominator, sd, 1);
      if (!inf) {
        if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
          r = finalise(r, pr + 1, 0);
        }
        break;
      }
    } while (checkRoundingDigits(r.d, k += 10, rm));
  }
  external = true;
  return finalise(r, pr, rm);
};
P.minus = P.sub = function(y) {
  var d, e, i, j, k, len, pr, rm, xd, xe, xLTy, yd, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.d) {
    if (!x.s || !y.s)
      y = new Ctor(NaN);
    else if (x.d)
      y.s = -y.s;
    else
      y = new Ctor(y.d || x.s !== y.s ? x : NaN);
    return y;
  }
  if (x.s != y.s) {
    y.s = -y.s;
    return x.plus(y);
  }
  xd = x.d;
  yd = y.d;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (!xd[0] || !yd[0]) {
    if (yd[0])
      y.s = -y.s;
    else if (xd[0])
      y = new Ctor(x);
    else
      return new Ctor(rm === 3 ? -0 : 0);
    return external ? finalise(y, pr, rm) : y;
  }
  e = mathfloor(y.e / LOG_BASE);
  xe = mathfloor(x.e / LOG_BASE);
  xd = xd.slice();
  k = xe - e;
  if (k) {
    xLTy = k < 0;
    if (xLTy) {
      d = xd;
      k = -k;
      len = yd.length;
    } else {
      d = yd;
      e = xe;
      len = xd.length;
    }
    i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;
    if (k > i) {
      k = i;
      d.length = 1;
    }
    d.reverse();
    for (i = k; i--; )
      d.push(0);
    d.reverse();
  } else {
    i = xd.length;
    len = yd.length;
    xLTy = i < len;
    if (xLTy)
      len = i;
    for (i = 0; i < len; i++) {
      if (xd[i] != yd[i]) {
        xLTy = xd[i] < yd[i];
        break;
      }
    }
    k = 0;
  }
  if (xLTy) {
    d = xd;
    xd = yd;
    yd = d;
    y.s = -y.s;
  }
  len = xd.length;
  for (i = yd.length - len; i > 0; --i)
    xd[len++] = 0;
  for (i = yd.length; i > k; ) {
    if (xd[--i] < yd[i]) {
      for (j = i; j && xd[--j] === 0; )
        xd[j] = BASE - 1;
      --xd[j];
      xd[i] += BASE;
    }
    xd[i] -= yd[i];
  }
  for (; xd[--len] === 0; )
    xd.pop();
  for (; xd[0] === 0; xd.shift())
    --e;
  if (!xd[0])
    return new Ctor(rm === 3 ? -0 : 0);
  y.d = xd;
  y.e = getBase10Exponent(xd, e);
  return external ? finalise(y, pr, rm) : y;
};
P.modulo = P.mod = function(y) {
  var q, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.s || y.d && !y.d[0])
    return new Ctor(NaN);
  if (!y.d || x.d && !x.d[0]) {
    return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
  }
  external = false;
  if (Ctor.modulo == 9) {
    q = divide(x, y.abs(), 0, 3, 1);
    q.s *= y.s;
  } else {
    q = divide(x, y, 0, Ctor.modulo, 1);
  }
  q = q.times(y);
  external = true;
  return x.minus(q);
};
P.naturalExponential = P.exp = function() {
  return naturalExponential(this);
};
P.naturalLogarithm = P.ln = function() {
  return naturalLogarithm(this);
};
P.negated = P.neg = function() {
  var x = new this.constructor(this);
  x.s = -x.s;
  return finalise(x);
};
P.plus = P.add = function(y) {
  var carry, d, e, i, k, len, pr, rm, xd, yd, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.d) {
    if (!x.s || !y.s)
      y = new Ctor(NaN);
    else if (!x.d)
      y = new Ctor(y.d || x.s === y.s ? x : NaN);
    return y;
  }
  if (x.s != y.s) {
    y.s = -y.s;
    return x.minus(y);
  }
  xd = x.d;
  yd = y.d;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (!xd[0] || !yd[0]) {
    if (!yd[0])
      y = new Ctor(x);
    return external ? finalise(y, pr, rm) : y;
  }
  k = mathfloor(x.e / LOG_BASE);
  e = mathfloor(y.e / LOG_BASE);
  xd = xd.slice();
  i = k - e;
  if (i) {
    if (i < 0) {
      d = xd;
      i = -i;
      len = yd.length;
    } else {
      d = yd;
      e = k;
      len = xd.length;
    }
    k = Math.ceil(pr / LOG_BASE);
    len = k > len ? k + 1 : len + 1;
    if (i > len) {
      i = len;
      d.length = 1;
    }
    d.reverse();
    for (; i--; )
      d.push(0);
    d.reverse();
  }
  len = xd.length;
  i = yd.length;
  if (len - i < 0) {
    i = len;
    d = yd;
    yd = xd;
    xd = d;
  }
  for (carry = 0; i; ) {
    carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
    xd[i] %= BASE;
  }
  if (carry) {
    xd.unshift(carry);
    ++e;
  }
  for (len = xd.length; xd[--len] == 0; )
    xd.pop();
  y.d = xd;
  y.e = getBase10Exponent(xd, e);
  return external ? finalise(y, pr, rm) : y;
};
P.precision = P.sd = function(z) {
  var k, x = this;
  if (z !== void 0 && z !== !!z && z !== 1 && z !== 0)
    throw Error(invalidArgument + z);
  if (x.d) {
    k = getPrecision(x.d);
    if (z && x.e + 1 > k)
      k = x.e + 1;
  } else {
    k = NaN;
  }
  return k;
};
P.round = function() {
  var x = this, Ctor = x.constructor;
  return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
};
P.sine = P.sin = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(NaN);
  if (x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
  Ctor.rounding = 1;
  x = sine(Ctor, toLessThanHalfPi(Ctor, x));
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
};
P.squareRoot = P.sqrt = function() {
  var m, n, sd, r, rep, t, x = this, d = x.d, e = x.e, s = x.s, Ctor = x.constructor;
  if (s !== 1 || !d || !d[0]) {
    return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
  }
  external = false;
  s = Math.sqrt(+x);
  if (s == 0 || s == 1 / 0) {
    n = digitsToString(d);
    if ((n.length + e) % 2 == 0)
      n += "0";
    s = Math.sqrt(n);
    e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);
    if (s == 1 / 0) {
      n = "5e" + e;
    } else {
      n = s.toExponential();
      n = n.slice(0, n.indexOf("e") + 1) + e;
    }
    r = new Ctor(n);
  } else {
    r = new Ctor(s.toString());
  }
  sd = (e = Ctor.precision) + 3;
  for (; ; ) {
    t = r;
    r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);
    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
      n = n.slice(sd - 3, sd + 1);
      if (n == "9999" || !rep && n == "4999") {
        if (!rep) {
          finalise(t, e + 1, 0);
          if (t.times(t).eq(x)) {
            r = t;
            break;
          }
        }
        sd += 4;
        rep = 1;
      } else {
        if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
          finalise(r, e + 1, 1);
          m = !r.times(r).eq(x);
        }
        break;
      }
    }
  }
  external = true;
  return finalise(r, e, Ctor.rounding, m);
};
P.tangent = P.tan = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(NaN);
  if (x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 10;
  Ctor.rounding = 1;
  x = x.sin();
  x.s = 1;
  x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
};
P.times = P.mul = function(y) {
  var carry, e, i, k, r, rL, t, xdL, ydL, x = this, Ctor = x.constructor, xd = x.d, yd = (y = new Ctor(y)).d;
  y.s *= x.s;
  if (!xd || !xd[0] || !yd || !yd[0]) {
    return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd ? NaN : !xd || !yd ? y.s / 0 : y.s * 0);
  }
  e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
  xdL = xd.length;
  ydL = yd.length;
  if (xdL < ydL) {
    r = xd;
    xd = yd;
    yd = r;
    rL = xdL;
    xdL = ydL;
    ydL = rL;
  }
  r = [];
  rL = xdL + ydL;
  for (i = rL; i--; )
    r.push(0);
  for (i = ydL; --i >= 0; ) {
    carry = 0;
    for (k = xdL + i; k > i; ) {
      t = r[k] + yd[i] * xd[k - i - 1] + carry;
      r[k--] = t % BASE | 0;
      carry = t / BASE | 0;
    }
    r[k] = (r[k] + carry) % BASE | 0;
  }
  for (; !r[--rL]; )
    r.pop();
  if (carry)
    ++e;
  else
    r.shift();
  y.d = r;
  y.e = getBase10Exponent(r, e);
  return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
};
P.toBinary = function(sd, rm) {
  return toStringBinary(this, 2, sd, rm);
};
P.toDecimalPlaces = P.toDP = function(dp, rm) {
  var x = this, Ctor = x.constructor;
  x = new Ctor(x);
  if (dp === void 0)
    return x;
  checkInt32(dp, 0, MAX_DIGITS);
  if (rm === void 0)
    rm = Ctor.rounding;
  else
    checkInt32(rm, 0, 8);
  return finalise(x, dp + x.e + 1, rm);
};
P.toExponential = function(dp, rm) {
  var str, x = this, Ctor = x.constructor;
  if (dp === void 0) {
    str = finiteToString(x, true);
  } else {
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
    x = finalise(new Ctor(x), dp + 1, rm);
    str = finiteToString(x, true, dp + 1);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toFixed = function(dp, rm) {
  var str, y, x = this, Ctor = x.constructor;
  if (dp === void 0) {
    str = finiteToString(x);
  } else {
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
    y = finalise(new Ctor(x), dp + x.e + 1, rm);
    str = finiteToString(y, false, dp + y.e + 1);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toFraction = function(maxD) {
  var d, d0, d1, d2, e, k, n, n0, n1, pr, q, r, x = this, xd = x.d, Ctor = x.constructor;
  if (!xd)
    return new Ctor(x);
  n1 = d0 = new Ctor(1);
  d1 = n0 = new Ctor(0);
  d = new Ctor(d1);
  e = d.e = getPrecision(xd) - x.e - 1;
  k = e % LOG_BASE;
  d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);
  if (maxD == null) {
    maxD = e > 0 ? d : n1;
  } else {
    n = new Ctor(maxD);
    if (!n.isInt() || n.lt(n1))
      throw Error(invalidArgument + n);
    maxD = n.gt(d) ? e > 0 ? d : n1 : n;
  }
  external = false;
  n = new Ctor(digitsToString(xd));
  pr = Ctor.precision;
  Ctor.precision = e = xd.length * LOG_BASE * 2;
  for (; ; ) {
    q = divide(n, d, 0, 1, 1);
    d2 = d0.plus(q.times(d1));
    if (d2.cmp(maxD) == 1)
      break;
    d0 = d1;
    d1 = d2;
    d2 = n1;
    n1 = n0.plus(q.times(d2));
    n0 = d2;
    d2 = d;
    d = n.minus(q.times(d2));
    n = d2;
  }
  d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
  n0 = n0.plus(d2.times(n1));
  d0 = d0.plus(d2.times(d1));
  n0.s = n1.s = x.s;
  r = divide(n1, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];
  Ctor.precision = pr;
  external = true;
  return r;
};
P.toHexadecimal = P.toHex = function(sd, rm) {
  return toStringBinary(this, 16, sd, rm);
};
P.toNearest = function(y, rm) {
  var x = this, Ctor = x.constructor;
  x = new Ctor(x);
  if (y == null) {
    if (!x.d)
      return x;
    y = new Ctor(1);
    rm = Ctor.rounding;
  } else {
    y = new Ctor(y);
    if (rm === void 0) {
      rm = Ctor.rounding;
    } else {
      checkInt32(rm, 0, 8);
    }
    if (!x.d)
      return y.s ? x : y;
    if (!y.d) {
      if (y.s)
        y.s = x.s;
      return y;
    }
  }
  if (y.d[0]) {
    external = false;
    x = divide(x, y, 0, rm, 1).times(y);
    external = true;
    finalise(x);
  } else {
    y.s = x.s;
    x = y;
  }
  return x;
};
P.toNumber = function() {
  return +this;
};
P.toOctal = function(sd, rm) {
  return toStringBinary(this, 8, sd, rm);
};
P.toPower = P.pow = function(y) {
  var e, k, pr, r, rm, s, x = this, Ctor = x.constructor, yn = +(y = new Ctor(y));
  if (!x.d || !y.d || !x.d[0] || !y.d[0])
    return new Ctor(mathpow(+x, yn));
  x = new Ctor(x);
  if (x.eq(1))
    return x;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (y.eq(1))
    return finalise(x, pr, rm);
  e = mathfloor(y.e / LOG_BASE);
  if (e >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
    r = intPow(Ctor, x, k, pr);
    return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
  }
  s = x.s;
  if (s < 0) {
    if (e < y.d.length - 1)
      return new Ctor(NaN);
    if ((y.d[e] & 1) == 0)
      s = 1;
    if (x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
      x.s = s;
      return x;
    }
  }
  k = mathpow(+x, yn);
  e = k == 0 || !isFinite(k) ? mathfloor(yn * (Math.log("0." + digitsToString(x.d)) / Math.LN10 + x.e + 1)) : new Ctor(k + "").e;
  if (e > Ctor.maxE + 1 || e < Ctor.minE - 1)
    return new Ctor(e > 0 ? s / 0 : 0);
  external = false;
  Ctor.rounding = x.s = 1;
  k = Math.min(12, (e + "").length);
  r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);
  if (r.d) {
    r = finalise(r, pr + 5, 1);
    if (checkRoundingDigits(r.d, pr, rm)) {
      e = pr + 10;
      r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);
      if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
        r = finalise(r, pr + 1, 0);
      }
    }
  }
  r.s = s;
  external = true;
  Ctor.rounding = rm;
  return finalise(r, pr, rm);
};
P.toPrecision = function(sd, rm) {
  var str, x = this, Ctor = x.constructor;
  if (sd === void 0) {
    str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  } else {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
    x = finalise(new Ctor(x), sd, rm);
    str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toSignificantDigits = P.toSD = function(sd, rm) {
  var x = this, Ctor = x.constructor;
  if (sd === void 0) {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  } else {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
  }
  return finalise(new Ctor(x), sd, rm);
};
P.toString = function() {
  var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.truncated = P.trunc = function() {
  return finalise(new this.constructor(this), this.e + 1, 1);
};
P.valueOf = P.toJSON = function() {
  var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  return x.isNeg() ? "-" + str : str;
};
function digitsToString(d) {
  var i, k, ws, indexOfLastWord = d.length - 1, str = "", w = d[0];
  if (indexOfLastWord > 0) {
    str += w;
    for (i = 1; i < indexOfLastWord; i++) {
      ws = d[i] + "";
      k = LOG_BASE - ws.length;
      if (k)
        str += getZeroString(k);
      str += ws;
    }
    w = d[i];
    ws = w + "";
    k = LOG_BASE - ws.length;
    if (k)
      str += getZeroString(k);
  } else if (w === 0) {
    return "0";
  }
  for (; w % 10 === 0; )
    w /= 10;
  return str + w;
}
function checkInt32(i, min2, max2) {
  if (i !== ~~i || i < min2 || i > max2) {
    throw Error(invalidArgument + i);
  }
}
function checkRoundingDigits(d, i, rm, repeating) {
  var di, k, r, rd;
  for (k = d[0]; k >= 10; k /= 10)
    --i;
  if (--i < 0) {
    i += LOG_BASE;
    di = 0;
  } else {
    di = Math.ceil((i + 1) / LOG_BASE);
    i %= LOG_BASE;
  }
  k = mathpow(10, LOG_BASE - i);
  rd = d[di] % k | 0;
  if (repeating == null) {
    if (i < 3) {
      if (i == 0)
        rd = rd / 100 | 0;
      else if (i == 1)
        rd = rd / 10 | 0;
      r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 5e4 || rd == 0;
    } else {
      r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 || (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
    }
  } else {
    if (i < 4) {
      if (i == 0)
        rd = rd / 1e3 | 0;
      else if (i == 1)
        rd = rd / 100 | 0;
      else if (i == 2)
        rd = rd / 10 | 0;
      r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
    } else {
      r = ((repeating || rm < 4) && rd + 1 == k || !repeating && rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 1e3 | 0) == mathpow(10, i - 3) - 1;
    }
  }
  return r;
}
function convertBase(str, baseIn, baseOut) {
  var j, arr = [0], arrL, i = 0, strL = str.length;
  for (; i < strL; ) {
    for (arrL = arr.length; arrL--; )
      arr[arrL] *= baseIn;
    arr[0] += NUMERALS.indexOf(str.charAt(i++));
    for (j = 0; j < arr.length; j++) {
      if (arr[j] > baseOut - 1) {
        if (arr[j + 1] === void 0)
          arr[j + 1] = 0;
        arr[j + 1] += arr[j] / baseOut | 0;
        arr[j] %= baseOut;
      }
    }
  }
  return arr.reverse();
}
function cosine(Ctor, x) {
  var k, len, y;
  if (x.isZero())
    return x;
  len = x.d.length;
  if (len < 32) {
    k = Math.ceil(len / 3);
    y = (1 / tinyPow(4, k)).toString();
  } else {
    k = 16;
    y = "2.3283064365386962890625e-10";
  }
  Ctor.precision += k;
  x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));
  for (var i = k; i--; ) {
    var cos2x = x.times(x);
    x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
  }
  Ctor.precision -= k;
  return x;
}
var divide = function() {
  function multiplyInteger(x, k, base) {
    var temp, carry = 0, i = x.length;
    for (x = x.slice(); i--; ) {
      temp = x[i] * k + carry;
      x[i] = temp % base | 0;
      carry = temp / base | 0;
    }
    if (carry)
      x.unshift(carry);
    return x;
  }
  function compare(a, b, aL, bL) {
    var i, r;
    if (aL != bL) {
      r = aL > bL ? 1 : -1;
    } else {
      for (i = r = 0; i < aL; i++) {
        if (a[i] != b[i]) {
          r = a[i] > b[i] ? 1 : -1;
          break;
        }
      }
    }
    return r;
  }
  function subtract2(a, b, aL, base) {
    var i = 0;
    for (; aL--; ) {
      a[aL] -= i;
      i = a[aL] < b[aL] ? 1 : 0;
      a[aL] = i * base + a[aL] - b[aL];
    }
    for (; !a[0] && a.length > 1; )
      a.shift();
  }
  return function(x, y, pr, rm, dp, base) {
    var cmp, e, i, k, logBase, more, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0, yL, yz, Ctor = x.constructor, sign2 = x.s == y.s ? 1 : -1, xd = x.d, yd = y.d;
    if (!xd || !xd[0] || !yd || !yd[0]) {
      return new Ctor(
        // Return NaN if either NaN, or both Infinity or 0.
        !x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN : (
          // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
          xd && xd[0] == 0 || !yd ? sign2 * 0 : sign2 / 0
        )
      );
    }
    if (base) {
      logBase = 1;
      e = x.e - y.e;
    } else {
      base = BASE;
      logBase = LOG_BASE;
      e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
    }
    yL = yd.length;
    xL = xd.length;
    q = new Ctor(sign2);
    qd = q.d = [];
    for (i = 0; yd[i] == (xd[i] || 0); i++)
      ;
    if (yd[i] > (xd[i] || 0))
      e--;
    if (pr == null) {
      sd = pr = Ctor.precision;
      rm = Ctor.rounding;
    } else if (dp) {
      sd = pr + (x.e - y.e) + 1;
    } else {
      sd = pr;
    }
    if (sd < 0) {
      qd.push(1);
      more = true;
    } else {
      sd = sd / logBase + 2 | 0;
      i = 0;
      if (yL == 1) {
        k = 0;
        yd = yd[0];
        sd++;
        for (; (i < xL || k) && sd--; i++) {
          t = k * base + (xd[i] || 0);
          qd[i] = t / yd | 0;
          k = t % yd | 0;
        }
        more = k || i < xL;
      } else {
        k = base / (yd[0] + 1) | 0;
        if (k > 1) {
          yd = multiplyInteger(yd, k, base);
          xd = multiplyInteger(xd, k, base);
          yL = yd.length;
          xL = xd.length;
        }
        xi = yL;
        rem = xd.slice(0, yL);
        remL = rem.length;
        for (; remL < yL; )
          rem[remL++] = 0;
        yz = yd.slice();
        yz.unshift(0);
        yd0 = yd[0];
        if (yd[1] >= base / 2)
          ++yd0;
        do {
          k = 0;
          cmp = compare(yd, rem, yL, remL);
          if (cmp < 0) {
            rem0 = rem[0];
            if (yL != remL)
              rem0 = rem0 * base + (rem[1] || 0);
            k = rem0 / yd0 | 0;
            if (k > 1) {
              if (k >= base)
                k = base - 1;
              prod = multiplyInteger(yd, k, base);
              prodL = prod.length;
              remL = rem.length;
              cmp = compare(prod, rem, prodL, remL);
              if (cmp == 1) {
                k--;
                subtract2(prod, yL < prodL ? yz : yd, prodL, base);
              }
            } else {
              if (k == 0)
                cmp = k = 1;
              prod = yd.slice();
            }
            prodL = prod.length;
            if (prodL < remL)
              prod.unshift(0);
            subtract2(rem, prod, remL, base);
            if (cmp == -1) {
              remL = rem.length;
              cmp = compare(yd, rem, yL, remL);
              if (cmp < 1) {
                k++;
                subtract2(rem, yL < remL ? yz : yd, remL, base);
              }
            }
            remL = rem.length;
          } else if (cmp === 0) {
            k++;
            rem = [0];
          }
          qd[i++] = k;
          if (cmp && rem[0]) {
            rem[remL++] = xd[xi] || 0;
          } else {
            rem = [xd[xi]];
            remL = 1;
          }
        } while ((xi++ < xL || rem[0] !== void 0) && sd--);
        more = rem[0] !== void 0;
      }
      if (!qd[0])
        qd.shift();
    }
    if (logBase == 1) {
      q.e = e;
      inexact = more;
    } else {
      for (i = 1, k = qd[0]; k >= 10; k /= 10)
        i++;
      q.e = i + e * logBase - 1;
      finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
    }
    return q;
  };
}();
function finalise(x, sd, rm, isTruncated) {
  var digits, i, j, k, rd, roundUp, w, xd, xdi, Ctor = x.constructor;
  out:
    if (sd != null) {
      xd = x.d;
      if (!xd)
        return x;
      for (digits = 1, k = xd[0]; k >= 10; k /= 10)
        digits++;
      i = sd - digits;
      if (i < 0) {
        i += LOG_BASE;
        j = sd;
        w = xd[xdi = 0];
        rd = w / mathpow(10, digits - j - 1) % 10 | 0;
      } else {
        xdi = Math.ceil((i + 1) / LOG_BASE);
        k = xd.length;
        if (xdi >= k) {
          if (isTruncated) {
            for (; k++ <= xdi; )
              xd.push(0);
            w = rd = 0;
            digits = 1;
            i %= LOG_BASE;
            j = i - LOG_BASE + 1;
          } else {
            break out;
          }
        } else {
          w = k = xd[xdi];
          for (digits = 1; k >= 10; k /= 10)
            digits++;
          i %= LOG_BASE;
          j = i - LOG_BASE + digits;
          rd = j < 0 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0;
        }
      }
      isTruncated = isTruncated || sd < 0 || xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1));
      roundUp = rm < 4 ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
      (i > 0 ? j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
      if (sd < 1 || !xd[0]) {
        xd.length = 0;
        if (roundUp) {
          sd -= x.e + 1;
          xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
          x.e = -sd || 0;
        } else {
          xd[0] = x.e = 0;
        }
        return x;
      }
      if (i == 0) {
        xd.length = xdi;
        k = 1;
        xdi--;
      } else {
        xd.length = xdi + 1;
        k = mathpow(10, LOG_BASE - i);
        xd[xdi] = j > 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0;
      }
      if (roundUp) {
        for (; ; ) {
          if (xdi == 0) {
            for (i = 1, j = xd[0]; j >= 10; j /= 10)
              i++;
            j = xd[0] += k;
            for (k = 1; j >= 10; j /= 10)
              k++;
            if (i != k) {
              x.e++;
              if (xd[0] == BASE)
                xd[0] = 1;
            }
            break;
          } else {
            xd[xdi] += k;
            if (xd[xdi] != BASE)
              break;
            xd[xdi--] = 0;
            k = 1;
          }
        }
      }
      for (i = xd.length; xd[--i] === 0; )
        xd.pop();
    }
  if (external) {
    if (x.e > Ctor.maxE) {
      x.d = null;
      x.e = NaN;
    } else if (x.e < Ctor.minE) {
      x.e = 0;
      x.d = [0];
    }
  }
  return x;
}
function finiteToString(x, isExp, sd) {
  if (!x.isFinite())
    return nonFiniteToString(x);
  var k, e = x.e, str = digitsToString(x.d), len = str.length;
  if (isExp) {
    if (sd && (k = sd - len) > 0) {
      str = str.charAt(0) + "." + str.slice(1) + getZeroString(k);
    } else if (len > 1) {
      str = str.charAt(0) + "." + str.slice(1);
    }
    str = str + (x.e < 0 ? "e" : "e+") + x.e;
  } else if (e < 0) {
    str = "0." + getZeroString(-e - 1) + str;
    if (sd && (k = sd - len) > 0)
      str += getZeroString(k);
  } else if (e >= len) {
    str += getZeroString(e + 1 - len);
    if (sd && (k = sd - e - 1) > 0)
      str = str + "." + getZeroString(k);
  } else {
    if ((k = e + 1) < len)
      str = str.slice(0, k) + "." + str.slice(k);
    if (sd && (k = sd - len) > 0) {
      if (e + 1 === len)
        str += ".";
      str += getZeroString(k);
    }
  }
  return str;
}
function getBase10Exponent(digits, e) {
  var w = digits[0];
  for (e *= LOG_BASE; w >= 10; w /= 10)
    e++;
  return e;
}
function getLn10(Ctor, sd, pr) {
  if (sd > LN10_PRECISION) {
    external = true;
    if (pr)
      Ctor.precision = pr;
    throw Error(precisionLimitExceeded);
  }
  return finalise(new Ctor(LN10), sd, 1, true);
}
function getPi(Ctor, sd, rm) {
  if (sd > PI_PRECISION)
    throw Error(precisionLimitExceeded);
  return finalise(new Ctor(PI), sd, rm, true);
}
function getPrecision(digits) {
  var w = digits.length - 1, len = w * LOG_BASE + 1;
  w = digits[w];
  if (w) {
    for (; w % 10 == 0; w /= 10)
      len--;
    for (w = digits[0]; w >= 10; w /= 10)
      len++;
  }
  return len;
}
function getZeroString(k) {
  var zs = "";
  for (; k--; )
    zs += "0";
  return zs;
}
function intPow(Ctor, x, n, pr) {
  var isTruncated, r = new Ctor(1), k = Math.ceil(pr / LOG_BASE + 4);
  external = false;
  for (; ; ) {
    if (n % 2) {
      r = r.times(x);
      if (truncate(r.d, k))
        isTruncated = true;
    }
    n = mathfloor(n / 2);
    if (n === 0) {
      n = r.d.length - 1;
      if (isTruncated && r.d[n] === 0)
        ++r.d[n];
      break;
    }
    x = x.times(x);
    truncate(x.d, k);
  }
  external = true;
  return r;
}
function isOdd(n) {
  return n.d[n.d.length - 1] & 1;
}
function maxOrMin(Ctor, args, ltgt) {
  var y, x = new Ctor(args[0]), i = 0;
  for (; ++i < args.length; ) {
    y = new Ctor(args[i]);
    if (!y.s) {
      x = y;
      break;
    } else if (x[ltgt](y)) {
      x = y;
    }
  }
  return x;
}
function naturalExponential(x, sd) {
  var denominator, guard, j, pow3, sum2, t, wpr, rep = 0, i = 0, k = 0, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
  if (!x.d || !x.d[0] || x.e > 17) {
    return new Ctor(x.d ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0 : x.s ? x.s < 0 ? 0 : x : 0 / 0);
  }
  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }
  t = new Ctor(0.03125);
  while (x.e > -2) {
    x = x.times(t);
    k += 5;
  }
  guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
  wpr += guard;
  denominator = pow3 = sum2 = new Ctor(1);
  Ctor.precision = wpr;
  for (; ; ) {
    pow3 = finalise(pow3.times(x), wpr, 1);
    denominator = denominator.times(++i);
    t = sum2.plus(divide(pow3, denominator, wpr, 1));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
      j = k;
      while (j--)
        sum2 = finalise(sum2.times(sum2), wpr, 1);
      if (sd == null) {
        if (rep < 3 && checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += 10;
          denominator = pow3 = t = new Ctor(1);
          i = 0;
          rep++;
        } else {
          return finalise(sum2, Ctor.precision = pr, rm, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum2;
      }
    }
    sum2 = t;
  }
}
function naturalLogarithm(y, sd) {
  var c, c0, denominator, e, numerator, rep, sum2, t, wpr, x1, x2, n = 1, guard = 10, x = y, xd = x.d, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
  if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
    return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
  }
  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }
  Ctor.precision = wpr += guard;
  c = digitsToString(xd);
  c0 = c.charAt(0);
  if (Math.abs(e = x.e) < 15e14) {
    while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
      x = x.times(y);
      c = digitsToString(x.d);
      c0 = c.charAt(0);
      n++;
    }
    e = x.e;
    if (c0 > 1) {
      x = new Ctor("0." + c);
      e++;
    } else {
      x = new Ctor(c0 + "." + c.slice(1));
    }
  } else {
    t = getLn10(Ctor, wpr + 2, pr).times(e + "");
    x = naturalLogarithm(new Ctor(c0 + "." + c.slice(1)), wpr - guard).plus(t);
    Ctor.precision = pr;
    return sd == null ? finalise(x, pr, rm, external = true) : x;
  }
  x1 = x;
  sum2 = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
  x2 = finalise(x.times(x), wpr, 1);
  denominator = 3;
  for (; ; ) {
    numerator = finalise(numerator.times(x2), wpr, 1);
    t = sum2.plus(divide(numerator, new Ctor(denominator), wpr, 1));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
      sum2 = sum2.times(2);
      if (e !== 0)
        sum2 = sum2.plus(getLn10(Ctor, wpr + 2, pr).times(e + ""));
      sum2 = divide(sum2, new Ctor(n), wpr, 1);
      if (sd == null) {
        if (checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += guard;
          t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
          x2 = finalise(x.times(x), wpr, 1);
          denominator = rep = 1;
        } else {
          return finalise(sum2, Ctor.precision = pr, rm, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum2;
      }
    }
    sum2 = t;
    denominator += 2;
  }
}
function nonFiniteToString(x) {
  return String(x.s * x.s / 0);
}
function parseDecimal(x, str) {
  var e, i, len;
  if ((e = str.indexOf(".")) > -1)
    str = str.replace(".", "");
  if ((i = str.search(/e/i)) > 0) {
    if (e < 0)
      e = i;
    e += +str.slice(i + 1);
    str = str.substring(0, i);
  } else if (e < 0) {
    e = str.length;
  }
  for (i = 0; str.charCodeAt(i) === 48; i++)
    ;
  for (len = str.length; str.charCodeAt(len - 1) === 48; --len)
    ;
  str = str.slice(i, len);
  if (str) {
    len -= i;
    x.e = e = e - i - 1;
    x.d = [];
    i = (e + 1) % LOG_BASE;
    if (e < 0)
      i += LOG_BASE;
    if (i < len) {
      if (i)
        x.d.push(+str.slice(0, i));
      for (len -= LOG_BASE; i < len; )
        x.d.push(+str.slice(i, i += LOG_BASE));
      str = str.slice(i);
      i = LOG_BASE - str.length;
    } else {
      i -= len;
    }
    for (; i--; )
      str += "0";
    x.d.push(+str);
    if (external) {
      if (x.e > x.constructor.maxE) {
        x.d = null;
        x.e = NaN;
      } else if (x.e < x.constructor.minE) {
        x.e = 0;
        x.d = [0];
      }
    }
  } else {
    x.e = 0;
    x.d = [0];
  }
  return x;
}
function parseOther(x, str) {
  var base, Ctor, divisor, i, isFloat, len, p, xd, xe;
  if (str.indexOf("_") > -1) {
    str = str.replace(/(\d)_(?=\d)/g, "$1");
    if (isDecimal.test(str))
      return parseDecimal(x, str);
  } else if (str === "Infinity" || str === "NaN") {
    if (!+str)
      x.s = NaN;
    x.e = NaN;
    x.d = null;
    return x;
  }
  if (isHex.test(str)) {
    base = 16;
    str = str.toLowerCase();
  } else if (isBinary.test(str)) {
    base = 2;
  } else if (isOctal.test(str)) {
    base = 8;
  } else {
    throw Error(invalidArgument + str);
  }
  i = str.search(/p/i);
  if (i > 0) {
    p = +str.slice(i + 1);
    str = str.substring(2, i);
  } else {
    str = str.slice(2);
  }
  i = str.indexOf(".");
  isFloat = i >= 0;
  Ctor = x.constructor;
  if (isFloat) {
    str = str.replace(".", "");
    len = str.length;
    i = len - i;
    divisor = intPow(Ctor, new Ctor(base), i, i * 2);
  }
  xd = convertBase(str, base, BASE);
  xe = xd.length - 1;
  for (i = xe; xd[i] === 0; --i)
    xd.pop();
  if (i < 0)
    return new Ctor(x.s * 0);
  x.e = getBase10Exponent(xd, xe);
  x.d = xd;
  external = false;
  if (isFloat)
    x = divide(x, divisor, len * 4);
  if (p)
    x = x.times(Math.abs(p) < 54 ? mathpow(2, p) : Decimal.pow(2, p));
  external = true;
  return x;
}
function sine(Ctor, x) {
  var k, len = x.d.length;
  if (len < 3) {
    return x.isZero() ? x : taylorSeries(Ctor, 2, x, x);
  }
  k = 1.4 * Math.sqrt(len);
  k = k > 16 ? 16 : k | 0;
  x = x.times(1 / tinyPow(5, k));
  x = taylorSeries(Ctor, 2, x, x);
  var sin2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
  for (; k--; ) {
    sin2_x = x.times(x);
    x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
  }
  return x;
}
function taylorSeries(Ctor, n, x, y, isHyperbolic) {
  var j, t, u, x2, i = 1, pr = Ctor.precision, k = Math.ceil(pr / LOG_BASE);
  external = false;
  x2 = x.times(x);
  u = new Ctor(y);
  for (; ; ) {
    t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
    u = isHyperbolic ? y.plus(t) : y.minus(t);
    y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
    t = u.plus(y);
    if (t.d[k] !== void 0) {
      for (j = k; t.d[j] === u.d[j] && j--; )
        ;
      if (j == -1)
        break;
    }
    j = u;
    u = y;
    y = t;
    t = j;
    i++;
  }
  external = true;
  t.d.length = k + 1;
  return t;
}
function tinyPow(b, e) {
  var n = b;
  while (--e)
    n *= b;
  return n;
}
function toLessThanHalfPi(Ctor, x) {
  var t, isNeg2 = x.s < 0, pi = getPi(Ctor, Ctor.precision, 1), halfPi = pi.times(0.5);
  x = x.abs();
  if (x.lte(halfPi)) {
    quadrant = isNeg2 ? 4 : 1;
    return x;
  }
  t = x.divToInt(pi);
  if (t.isZero()) {
    quadrant = isNeg2 ? 3 : 2;
  } else {
    x = x.minus(t.times(pi));
    if (x.lte(halfPi)) {
      quadrant = isOdd(t) ? isNeg2 ? 2 : 3 : isNeg2 ? 4 : 1;
      return x;
    }
    quadrant = isOdd(t) ? isNeg2 ? 1 : 4 : isNeg2 ? 3 : 2;
  }
  return x.minus(pi).abs();
}
function toStringBinary(x, baseOut, sd, rm) {
  var base, e, i, k, len, roundUp, str, xd, y, Ctor = x.constructor, isExp = sd !== void 0;
  if (isExp) {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
  } else {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  }
  if (!x.isFinite()) {
    str = nonFiniteToString(x);
  } else {
    str = finiteToString(x);
    i = str.indexOf(".");
    if (isExp) {
      base = 2;
      if (baseOut == 16) {
        sd = sd * 4 - 3;
      } else if (baseOut == 8) {
        sd = sd * 3 - 2;
      }
    } else {
      base = baseOut;
    }
    if (i >= 0) {
      str = str.replace(".", "");
      y = new Ctor(1);
      y.e = str.length - i;
      y.d = convertBase(finiteToString(y), 10, base);
      y.e = y.d.length;
    }
    xd = convertBase(str, 10, base);
    e = len = xd.length;
    for (; xd[--len] == 0; )
      xd.pop();
    if (!xd[0]) {
      str = isExp ? "0p+0" : "0";
    } else {
      if (i < 0) {
        e--;
      } else {
        x = new Ctor(x);
        x.d = xd;
        x.e = e;
        x = divide(x, y, sd, rm, 0, base);
        xd = x.d;
        e = x.e;
        roundUp = inexact;
      }
      i = xd[sd];
      k = base / 2;
      roundUp = roundUp || xd[sd + 1] !== void 0;
      roundUp = rm < 4 ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2)) : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 || rm === (x.s < 0 ? 8 : 7));
      xd.length = sd;
      if (roundUp) {
        for (; ++xd[--sd] > base - 1; ) {
          xd[sd] = 0;
          if (!sd) {
            ++e;
            xd.unshift(1);
          }
        }
      }
      for (len = xd.length; !xd[len - 1]; --len)
        ;
      for (i = 0, str = ""; i < len; i++)
        str += NUMERALS.charAt(xd[i]);
      if (isExp) {
        if (len > 1) {
          if (baseOut == 16 || baseOut == 8) {
            i = baseOut == 16 ? 4 : 3;
            for (--len; len % i; len++)
              str += "0";
            xd = convertBase(str, base, baseOut);
            for (len = xd.length; !xd[len - 1]; --len)
              ;
            for (i = 1, str = "1."; i < len; i++)
              str += NUMERALS.charAt(xd[i]);
          } else {
            str = str.charAt(0) + "." + str.slice(1);
          }
        }
        str = str + (e < 0 ? "p" : "p+") + e;
      } else if (e < 0) {
        for (; ++e; )
          str = "0" + str;
        str = "0." + str;
      } else {
        if (++e > len)
          for (e -= len; e--; )
            str += "0";
        else if (e < len)
          str = str.slice(0, e) + "." + str.slice(e);
      }
    }
    str = (baseOut == 16 ? "0x" : baseOut == 2 ? "0b" : baseOut == 8 ? "0o" : "") + str;
  }
  return x.s < 0 ? "-" + str : str;
}
function truncate(arr, len) {
  if (arr.length > len) {
    arr.length = len;
    return true;
  }
}
function abs(x) {
  return new this(x).abs();
}
function acos(x) {
  return new this(x).acos();
}
function acosh(x) {
  return new this(x).acosh();
}
function add(x, y) {
  return new this(x).plus(y);
}
function asin(x) {
  return new this(x).asin();
}
function asinh(x) {
  return new this(x).asinh();
}
function atan(x) {
  return new this(x).atan();
}
function atanh(x) {
  return new this(x).atanh();
}
function atan2(y, x) {
  y = new this(y);
  x = new this(x);
  var r, pr = this.precision, rm = this.rounding, wpr = pr + 4;
  if (!y.s || !x.s) {
    r = new this(NaN);
  } else if (!y.d && !x.d) {
    r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
    r.s = y.s;
  } else if (!x.d || y.isZero()) {
    r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
    r.s = y.s;
  } else if (!y.d || x.isZero()) {
    r = getPi(this, wpr, 1).times(0.5);
    r.s = y.s;
  } else if (x.s < 0) {
    this.precision = wpr;
    this.rounding = 1;
    r = this.atan(divide(y, x, wpr, 1));
    x = getPi(this, wpr, 1);
    this.precision = pr;
    this.rounding = rm;
    r = y.s < 0 ? r.minus(x) : r.plus(x);
  } else {
    r = this.atan(divide(y, x, wpr, 1));
  }
  return r;
}
function cbrt(x) {
  return new this(x).cbrt();
}
function ceil(x) {
  return finalise(x = new this(x), x.e + 1, 2);
}
function clamp(x, min2, max2) {
  return new this(x).clamp(min2, max2);
}
function config(obj) {
  if (!obj || typeof obj !== "object")
    throw Error(decimalError + "Object expected");
  var i, p, v, useDefaults = obj.defaults === true, ps = [
    "precision",
    1,
    MAX_DIGITS,
    "rounding",
    0,
    8,
    "toExpNeg",
    -EXP_LIMIT,
    0,
    "toExpPos",
    0,
    EXP_LIMIT,
    "maxE",
    0,
    EXP_LIMIT,
    "minE",
    -EXP_LIMIT,
    0,
    "modulo",
    0,
    9
  ];
  for (i = 0; i < ps.length; i += 3) {
    if (p = ps[i], useDefaults)
      this[p] = DEFAULTS[p];
    if ((v = obj[p]) !== void 0) {
      if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2])
        this[p] = v;
      else
        throw Error(invalidArgument + p + ": " + v);
    }
  }
  if (p = "crypto", useDefaults)
    this[p] = DEFAULTS[p];
  if ((v = obj[p]) !== void 0) {
    if (v === true || v === false || v === 0 || v === 1) {
      if (v) {
        if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
          this[p] = true;
        } else {
          throw Error(cryptoUnavailable);
        }
      } else {
        this[p] = false;
      }
    } else {
      throw Error(invalidArgument + p + ": " + v);
    }
  }
  return this;
}
function cos(x) {
  return new this(x).cos();
}
function cosh(x) {
  return new this(x).cosh();
}
function clone(obj) {
  var i, p, ps;
  function Decimal2(v) {
    var e, i2, t, x = this;
    if (!(x instanceof Decimal2))
      return new Decimal2(v);
    x.constructor = Decimal2;
    if (isDecimalInstance(v)) {
      x.s = v.s;
      if (external) {
        if (!v.d || v.e > Decimal2.maxE) {
          x.e = NaN;
          x.d = null;
        } else if (v.e < Decimal2.minE) {
          x.e = 0;
          x.d = [0];
        } else {
          x.e = v.e;
          x.d = v.d.slice();
        }
      } else {
        x.e = v.e;
        x.d = v.d ? v.d.slice() : v.d;
      }
      return;
    }
    t = typeof v;
    if (t === "number") {
      if (v === 0) {
        x.s = 1 / v < 0 ? -1 : 1;
        x.e = 0;
        x.d = [0];
        return;
      }
      if (v < 0) {
        v = -v;
        x.s = -1;
      } else {
        x.s = 1;
      }
      if (v === ~~v && v < 1e7) {
        for (e = 0, i2 = v; i2 >= 10; i2 /= 10)
          e++;
        if (external) {
          if (e > Decimal2.maxE) {
            x.e = NaN;
            x.d = null;
          } else if (e < Decimal2.minE) {
            x.e = 0;
            x.d = [0];
          } else {
            x.e = e;
            x.d = [v];
          }
        } else {
          x.e = e;
          x.d = [v];
        }
        return;
      } else if (v * 0 !== 0) {
        if (!v)
          x.s = NaN;
        x.e = NaN;
        x.d = null;
        return;
      }
      return parseDecimal(x, v.toString());
    } else if (t !== "string") {
      throw Error(invalidArgument + v);
    }
    if ((i2 = v.charCodeAt(0)) === 45) {
      v = v.slice(1);
      x.s = -1;
    } else {
      if (i2 === 43)
        v = v.slice(1);
      x.s = 1;
    }
    return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
  }
  Decimal2.prototype = P;
  Decimal2.ROUND_UP = 0;
  Decimal2.ROUND_DOWN = 1;
  Decimal2.ROUND_CEIL = 2;
  Decimal2.ROUND_FLOOR = 3;
  Decimal2.ROUND_HALF_UP = 4;
  Decimal2.ROUND_HALF_DOWN = 5;
  Decimal2.ROUND_HALF_EVEN = 6;
  Decimal2.ROUND_HALF_CEIL = 7;
  Decimal2.ROUND_HALF_FLOOR = 8;
  Decimal2.EUCLID = 9;
  Decimal2.config = Decimal2.set = config;
  Decimal2.clone = clone;
  Decimal2.isDecimal = isDecimalInstance;
  Decimal2.abs = abs;
  Decimal2.acos = acos;
  Decimal2.acosh = acosh;
  Decimal2.add = add;
  Decimal2.asin = asin;
  Decimal2.asinh = asinh;
  Decimal2.atan = atan;
  Decimal2.atanh = atanh;
  Decimal2.atan2 = atan2;
  Decimal2.cbrt = cbrt;
  Decimal2.ceil = ceil;
  Decimal2.clamp = clamp;
  Decimal2.cos = cos;
  Decimal2.cosh = cosh;
  Decimal2.div = div;
  Decimal2.exp = exp;
  Decimal2.floor = floor;
  Decimal2.hypot = hypot;
  Decimal2.ln = ln;
  Decimal2.log = log;
  Decimal2.log10 = log10;
  Decimal2.log2 = log2;
  Decimal2.max = max;
  Decimal2.min = min;
  Decimal2.mod = mod;
  Decimal2.mul = mul;
  Decimal2.pow = pow;
  Decimal2.random = random;
  Decimal2.round = round;
  Decimal2.sign = sign;
  Decimal2.sin = sin;
  Decimal2.sinh = sinh;
  Decimal2.sqrt = sqrt;
  Decimal2.sub = sub;
  Decimal2.sum = sum;
  Decimal2.tan = tan;
  Decimal2.tanh = tanh;
  Decimal2.trunc = trunc;
  if (obj === void 0)
    obj = {};
  if (obj) {
    if (obj.defaults !== true) {
      ps = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"];
      for (i = 0; i < ps.length; )
        if (!obj.hasOwnProperty(p = ps[i++]))
          obj[p] = this[p];
    }
  }
  Decimal2.config(obj);
  return Decimal2;
}
function div(x, y) {
  return new this(x).div(y);
}
function exp(x) {
  return new this(x).exp();
}
function floor(x) {
  return finalise(x = new this(x), x.e + 1, 3);
}
function hypot() {
  var i, n, t = new this(0);
  external = false;
  for (i = 0; i < arguments.length; ) {
    n = new this(arguments[i++]);
    if (!n.d) {
      if (n.s) {
        external = true;
        return new this(1 / 0);
      }
      t = n;
    } else if (t.d) {
      t = t.plus(n.times(n));
    }
  }
  external = true;
  return t.sqrt();
}
function isDecimalInstance(obj) {
  return obj instanceof Decimal || obj && obj.toStringTag === tag || false;
}
function ln(x) {
  return new this(x).ln();
}
function log(x, y) {
  return new this(x).log(y);
}
function log2(x) {
  return new this(x).log(2);
}
function log10(x) {
  return new this(x).log(10);
}
function max() {
  return maxOrMin(this, arguments, "lt");
}
function min() {
  return maxOrMin(this, arguments, "gt");
}
function mod(x, y) {
  return new this(x).mod(y);
}
function mul(x, y) {
  return new this(x).mul(y);
}
function pow(x, y) {
  return new this(x).pow(y);
}
function random(sd) {
  var d, e, k, n, i = 0, r = new this(1), rd = [];
  if (sd === void 0)
    sd = this.precision;
  else
    checkInt32(sd, 1, MAX_DIGITS);
  k = Math.ceil(sd / LOG_BASE);
  if (!this.crypto) {
    for (; i < k; )
      rd[i++] = Math.random() * 1e7 | 0;
  } else if (crypto.getRandomValues) {
    d = crypto.getRandomValues(new Uint32Array(k));
    for (; i < k; ) {
      n = d[i];
      if (n >= 429e7) {
        d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
      } else {
        rd[i++] = n % 1e7;
      }
    }
  } else if (crypto.randomBytes) {
    d = crypto.randomBytes(k *= 4);
    for (; i < k; ) {
      n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 127) << 24);
      if (n >= 214e7) {
        crypto.randomBytes(4).copy(d, i);
      } else {
        rd.push(n % 1e7);
        i += 4;
      }
    }
    i = k / 4;
  } else {
    throw Error(cryptoUnavailable);
  }
  k = rd[--i];
  sd %= LOG_BASE;
  if (k && sd) {
    n = mathpow(10, LOG_BASE - sd);
    rd[i] = (k / n | 0) * n;
  }
  for (; rd[i] === 0; i--)
    rd.pop();
  if (i < 0) {
    e = 0;
    rd = [0];
  } else {
    e = -1;
    for (; rd[0] === 0; e -= LOG_BASE)
      rd.shift();
    for (k = 1, n = rd[0]; n >= 10; n /= 10)
      k++;
    if (k < LOG_BASE)
      e -= LOG_BASE - k;
  }
  r.e = e;
  r.d = rd;
  return r;
}
function round(x) {
  return finalise(x = new this(x), x.e + 1, this.rounding);
}
function sign(x) {
  x = new this(x);
  return x.d ? x.d[0] ? x.s : 0 * x.s : x.s || NaN;
}
function sin(x) {
  return new this(x).sin();
}
function sinh(x) {
  return new this(x).sinh();
}
function sqrt(x) {
  return new this(x).sqrt();
}
function sub(x, y) {
  return new this(x).sub(y);
}
function sum() {
  var i = 0, args = arguments, x = new this(args[i]);
  external = false;
  for (; x.s && ++i < args.length; )
    x = x.plus(args[i]);
  external = true;
  return finalise(x, this.precision, this.rounding);
}
function tan(x) {
  return new this(x).tan();
}
function tanh(x) {
  return new this(x).tanh();
}
function trunc(x) {
  return finalise(x = new this(x), x.e + 1, 1);
}
P[Symbol.for("nodejs.util.inspect.custom")] = P.toString;
P[Symbol.toStringTag] = "Decimal";
var Decimal = P.constructor = clone(DEFAULTS);
LN10 = new Decimal(LN10);
PI = new Decimal(PI);
var decimal_default = Decimal;

// src/common/grapheme-splitter.ts
function stringToCodepoints(string) {
  const result = [];
  for (let i = 0; i < string.length; i++) {
    let code = string.charCodeAt(i);
    if (code >= 55296 && code <= 56319) {
      const nextCode = string.charCodeAt(i + 1);
      if (nextCode >= 56320 && nextCode <= 57343) {
        const lead = code - 55296;
        const trail = nextCode - 56320;
        code = 2 ** 16 + lead * 2 ** 10 + trail;
        i++;
      }
    }
    result.push(code);
  }
  return result;
}
var ZWJ = 8205;
var REGIONAL_INDICATOR = [127462, 127487];
function isEmojiCombinator(code) {
  if (code === ZWJ)
    return true;
  if (code === 65038 || code === 65039)
    return true;
  if (code >= 127995 && code <= 127995 + 5)
    return true;
  if (code >= 129456 && code <= 129456 + 4)
    return true;
  if (code >= 917536 && code <= 917536 + 96)
    return true;
  return false;
}
function isRegionalIndicator(code) {
  return code >= REGIONAL_INDICATOR[0] && code <= REGIONAL_INDICATOR[1];
}
function splitGraphemes(string) {
  if (/^[\u0020-\u00FF]*$/.test(string))
    return string;
  const result = [];
  const codePoints = stringToCodepoints(string);
  let index = 0;
  while (index < codePoints.length) {
    const code = codePoints[index++];
    const next = codePoints[index];
    if (next === ZWJ) {
      const baseIndex = index - 1;
      index += 2;
      while (codePoints[index] === ZWJ) {
        index += 2;
      }
      result.push(
        String.fromCodePoint(
          ...codePoints.slice(baseIndex, 2 * index - baseIndex + 1)
        )
      );
    } else if (isEmojiCombinator(next)) {
      const baseIndex = index - 1;
      while (isEmojiCombinator(codePoints[index])) {
        index += codePoints[index] === ZWJ ? 2 : 1;
      }
      result.push(
        String.fromCodePoint(
          ...codePoints.slice(baseIndex, 2 * index - baseIndex - 1)
        )
      );
    } else if (isRegionalIndicator(code)) {
      index += 1;
      result.push(String.fromCodePoint(...codePoints.slice(index - 2, 2)));
    } else {
      result.push(String.fromCodePoint(code));
    }
  }
  return result;
}

// src/compute-engine/latex-syntax/tokenizer.ts
var Tokenizer = class {
  constructor(s) {
    this.obeyspaces = false;
    s = s.replace(/[\u200E\u200F\u2066-\u2069\u202A-\u202E]/g, "");
    this.s = splitGraphemes(s);
    this.pos = 0;
  }
  /**
   * @return True if we reached the end of the stream
   */
  end() {
    return this.pos >= this.s.length;
  }
  /**
   * Return the next char and advance
   */
  get() {
    return this.pos < this.s.length ? this.s[this.pos++] : "";
  }
  /**
   * Return the next char, but do not advance
   */
  peek() {
    return this.s[this.pos];
  }
  /**
   * Return the next substring matching regEx and advance.
   */
  match(regEx) {
    let execResult;
    if (typeof this.s === "string") {
      execResult = regEx.exec(this.s.slice(this.pos));
    } else {
      execResult = regEx.exec(this.s.slice(this.pos).join(""));
    }
    if (execResult?.[0]) {
      this.pos += execResult[0].length;
      return execResult[0];
    }
    return null;
  }
  /**
   * Return the next token, or null.
   */
  next() {
    if (this.end())
      return null;
    if (!this.obeyspaces && this.match(/^[ \f\n\r\t\v\xA0\u2028\u2029]+/)) {
      return "<space>";
    } else if (this.obeyspaces && this.match(/^[ \f\n\r\t\v\xA0\u2028\u2029]/)) {
      return "<space>";
    }
    const next = this.get();
    if (next === "\\") {
      if (!this.end()) {
        let command = this.match(/^[a-zA-Z*]+/);
        if (command) {
          this.match(/^[ \f\n\r\t\v\xA0\u2028\u2029]*/);
        } else {
          command = this.get();
          if (command === " ") {
            return "<space>";
          }
        }
        return "\\" + command;
      }
    } else if (next === "{") {
      return "<{>";
    } else if (next === "}") {
      return "<}>";
    } else if (next === "^") {
      if (this.peek() === "^") {
        this.get();
        const hex = this.match(
          /^(\^(\^(\^(\^[0-9a-f])?[0-9a-f])?[0-9a-f])?[0-9a-f])?[0-9a-f][0-9a-f]/
        );
        if (hex) {
          return String.fromCodePoint(
            parseInt(hex.slice(hex.lastIndexOf("^") + 1), 16)
          );
        }
      }
      return next;
    } else if (next === "#") {
      if (!this.end()) {
        let isParam = false;
        if (/[0-9?]/.test(this.peek())) {
          isParam = true;
          if (this.pos + 1 < this.s.length) {
            const after = this.s[this.pos + 1];
            isParam = /[^0-9A-Za-z]/.test(after);
          }
        }
        if (isParam) {
          return "#" + this.get();
        }
        return "#";
      }
    } else if (next === "$") {
      if (this.peek() === "$") {
        this.get();
        return "<$$>";
      }
      return "<$>";
    }
    return next;
  }
};
function expand(lex2, args) {
  let token = lex2.next();
  if (!token)
    return [];
  let result = [];
  if (token === "\\relax") {
  } else if (token === "\\noexpand") {
    token = lex2.next();
    if (token) {
      result.push(token);
    }
  } else if (token === "\\obeyspaces") {
    lex2.obeyspaces = true;
  } else if (token === "\\space" || token === "~") {
    result.push("<space>");
  } else if (token === "\\bgroup") {
    result.push("<{>");
  } else if (token === "\\egroup") {
    result.push("<}>");
  } else if (token === "\\string") {
    token = lex2.next();
    if (token) {
      if (token[0] === "\\") {
        Array.from(token).forEach(
          (x) => result.push(x === "\\" ? "\\backslash" : x)
        );
      } else if (token === "<{>") {
        result.push("\\{");
      } else if (token === "<space>") {
        result.push("~");
      } else if (token === "<}>") {
        result.push("\\}");
      }
    }
  } else if (token === "\\csname") {
    while (lex2.peek() === "<space>") {
      lex2.next();
    }
    let command = "";
    let done = false;
    let tokens = [];
    do {
      if (tokens.length === 0) {
        if (/^#[0-9?]$/.test(lex2.peek())) {
          const param = lex2.get().slice(1);
          tokens = tokenize(
            args?.[param] ?? args?.["?"] ?? "\\placeholder{}",
            args
          );
          token = tokens[0];
        } else {
          token = lex2.next();
          tokens = token ? [token] : [];
        }
      }
      done = tokens.length === 0;
      if (!done && token === "\\endcsname") {
        done = true;
        tokens.shift();
      }
      if (!done) {
        done = token === "<$>" || token === "<$$>" || token === "<{>" || token === "<}>" || !!token && token.length > 1 && token[0] === "\\";
      }
      if (!done) {
        command += tokens.shift();
      }
    } while (!done);
    if (command) {
      result.push("\\" + command);
    }
    result = result.concat(tokens);
  } else if (token === "\\endcsname") {
  } else if (token.length > 1 && token[0] === "#") {
    const param = token.slice(1);
    result = result.concat(
      tokenize(args?.[param] ?? args?.["?"] ?? "\\placeholder{}", args)
    );
  } else {
    result.push(token);
  }
  return result;
}
function tokenize(s, args) {
  const lines = s.toString().split(/\r?\n/);
  let stream = "";
  let sep = "";
  for (const line of lines) {
    stream += sep;
    sep = " ";
    const m = line.match(/((?:\\%)|[^%])*/);
    if (m !== null)
      stream += m[0];
  }
  const tokenizer = new Tokenizer(stream);
  const result = [];
  do
    result.push(...expand(tokenizer, args));
  while (!tokenizer.end());
  return result;
}
function countTokens(s) {
  return tokenize(s, []).length;
}
function joinLatex(segments) {
  let sep = "";
  let result = "";
  for (const segment of segments) {
    if (segment) {
      if (/[a-zA-Z*]/.test(segment[0])) {
        result += sep;
      }
      if (/\\[a-zA-Z]+\*?$/.test(segment)) {
        sep = " ";
      } else {
        sep = "";
      }
      result += segment;
    }
  }
  return result;
}
function tokensToString(tokens) {
  let flat = [];
  if (Array.isArray(tokens)) {
    for (const item of tokens) {
      if (Array.isArray(item)) {
        flat = [...flat, ...item];
      } else {
        flat.push(item);
      }
    }
  } else {
    flat = [tokens];
  }
  const result = joinLatex(
    flat.map((token) => {
      return {
        "<space>": " ",
        "<$$>": "$$",
        "<$>": "$",
        "<{>": "{",
        "<}>": "}"
      }[token] ?? token;
    })
  );
  return result;
}

// src/compute-engine/latex-syntax/dictionary/definitions-algebra.ts
var DEFINITIONS_ALGEBRA = [
  {
    name: "To",
    latexTrigger: ["\\to"],
    kind: "infix",
    precedence: 270
    // MathML rightwards arrow
  },
  {
    latexTrigger: ["\\rightarrow"],
    kind: "infix",
    precedence: 270,
    // MathML rightwards arrow
    parse: "To"
  }
];

// src/math-json/utils.ts
var MISSING = ["Error", "'missing'"];
function isNumberExpression(expr) {
  if (expr === null)
    return false;
  if (typeof expr === "number" || isNumberObject(expr))
    return true;
  if (typeof expr === "string" && /^[+-]?[0-9\.]/.test(expr))
    return true;
  return false;
}
function isNumberObject(expr) {
  return expr !== null && typeof expr === "object" && "num" in expr;
}
function isSymbolObject(expr) {
  return expr !== null && typeof expr === "object" && "sym" in expr;
}
function isStringObject(expr) {
  return expr !== null && typeof expr === "object" && "str" in expr;
}
function isFunctionObject(expr) {
  return expr !== null && typeof expr === "object" && "fn" in expr;
}
var recommendedScriptsRegex;
function isRecommendedScripts(text) {
  if (!recommendedScriptsRegex) {
    const recommendedScripts = [
      "Zyyy",
      "Zinh",
      "Arab",
      "Armn",
      "Beng",
      "Bopo",
      "Cyrl",
      "Deva",
      "Ethi",
      "Geor",
      "Grek",
      "Gujr",
      "Guru",
      "Hang",
      "Hani",
      "Hebr",
      "Hira",
      "Kana",
      "Knda",
      "Khmr",
      "Laoo",
      "Latn",
      "Mlym",
      "Mymr",
      "Orya",
      "Sinh",
      "Taml",
      "Telu",
      "Thaa",
      "Thai",
      "Tibt"
    ];
    const regexPattern = `^[${recommendedScripts.map((x) => `\\p{Script=${x}}`).join("")}]*$`;
    recommendedScriptsRegex = new RegExp(regexPattern, "u");
  }
  return recommendedScriptsRegex.test(text);
}
function isValidIdentifier(s) {
  if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(s))
    return true;
  if (ONLY_EMOJIS.test(s))
    return true;
  if (!isRecommendedScripts(s))
    return false;
  return /^[\p{XIDS}_]\p{XIDC}*$/u.test(s);
}
var VS16 = "\\u{FE0F}";
var KEYCAP = "\\u{20E3}";
var ZWJ2 = "\\u{200D}";
var FLAG_SEQUENCE = "\\p{RI}\\p{RI}";
var TAG_MOD = `(?:[\\u{E0020}-\\u{E007E}]+\\u{E007F})`;
var EMOJI_MOD = `(?:\\p{EMod}|${VS16}${KEYCAP}?|${TAG_MOD})`;
var EMOJI_NOT_IDENTIFIER = `(?:(?=\\P{XIDC})\\p{Emoji})`;
var ZWJ_ELEMENT = `(?:${EMOJI_NOT_IDENTIFIER}${EMOJI_MOD}*|\\p{Emoji}${EMOJI_MOD}+|${FLAG_SEQUENCE})`;
var POSSIBLE_EMOJI = `(?:${ZWJ_ELEMENT})(${ZWJ2}${ZWJ_ELEMENT})*`;
var SOME_EMOJI = new RegExp(`(?:${POSSIBLE_EMOJI})+`, "u");
var ONLY_EMOJIS = new RegExp(`^(?:${POSSIBLE_EMOJI})+$`, "u");
function validateIdentifier(s) {
  if (typeof s !== "string")
    return "not-a-string";
  if (s === "")
    return "empty-string";
  if (s.normalize() !== s)
    return "expected-nfc";
  if (/[\u200E\u200F\u2066-\u2069\u202A-\u202E]/.test(s))
    return "unexpected-bidi-marker";
  if (ONLY_EMOJIS.test(s))
    return "valid";
  if (/\p{XIDC}/u.test(s) && SOME_EMOJI.test(s))
    return "unexpected-mixed-emoji";
  if (!isRecommendedScripts(s))
    return "unexpected-script";
  if (!isValidIdentifier(s)) {
    if (!isValidIdentifier(s[0]))
      return "invalid-first-char";
    return "invalid-char";
  }
  return "valid";
}
function stringValue(expr) {
  if (expr === null || expr === void 0)
    return null;
  if (typeof expr === "object" && "str" in expr)
    return expr.str;
  if (typeof expr !== "string")
    return null;
  if (expr.length < 2)
    return null;
  if (expr[0] !== "'" || expr[expr.length - 1] !== "'")
    return null;
  return expr.substring(1, expr.length - 1);
}
function stripText(expr) {
  if (expr === null || expr === void 0 || stringValue(expr) !== null)
    return null;
  const h = head(expr);
  if (h !== null) {
    return [
      h,
      ...(ops(expr) ?? []).map((x) => stripText(x)).filter((x) => x !== null)
    ];
  }
  return expr;
}
function head(expr) {
  if (expr === null || expr === void 0)
    return null;
  if (Array.isArray(expr)) {
    if (typeof expr[0] === "string" && !isValidIdentifier(expr[0])) {
      console.error(
        `Invalid identifier "${expr[0]}": ${validateIdentifier(expr[0])}`
      );
      return null;
    }
    return expr[0];
  }
  if (isFunctionObject(expr))
    return expr.fn[0];
  return null;
}
function headName(expr) {
  const h = head(expr);
  return typeof h === "string" ? h : "";
}
function ops(expr) {
  if (expr === null || expr === void 0)
    return null;
  if (Array.isArray(expr))
    return expr.slice(1);
  if (isFunctionObject(expr))
    return expr.fn.slice(1);
  return null;
}
function op(expr, n) {
  if (expr === null || expr === void 0)
    return null;
  if (Array.isArray(expr))
    return expr[n] ?? null;
  if (isFunctionObject(expr))
    return expr.fn[n] ?? null;
  return null;
}
function op1(expr) {
  return op(expr, 1);
}
function op2(expr) {
  return op(expr, 2);
}
function nops(expr) {
  if (expr === null || expr === void 0)
    return 0;
  if (Array.isArray(expr))
    return Math.max(0, expr.length - 1);
  if (isFunctionObject(expr))
    return Math.max(0, expr.fn.length - 1);
  return 0;
}
function unhold(expr) {
  if (expr === null || expr === void 0)
    return null;
  if (head(expr) === "Hold")
    return op(expr, 1);
  return expr;
}
function symbol(expr) {
  if (expr === null || expr === void 0)
    return null;
  if (typeof expr === "string") {
    if (/^[+\-\.0-9]/.test(expr))
      return null;
    if (expr.length >= 2 && expr[0] === "'" && expr[expr.length - 1] === "'")
      return null;
  }
  const s = isSymbolObject(expr) ? expr.sym : expr;
  if (typeof s !== "string")
    return null;
  return s;
}
function keyValuePair(expr) {
  const h = head(expr);
  if (h === "KeyValuePair" || h === "Tuple" || h === "Pair") {
    const key = stringValue(op1(expr));
    if (!key)
      return null;
    return [key, op2(expr) ?? "Nothing"];
  }
  return null;
}
function dictionary(expr) {
  if (expr === null)
    return null;
  if (typeof expr === "object" && "dict" in expr)
    return expr.dict;
  const kv = keyValuePair(expr);
  if (kv)
    return { [kv[0]]: kv[1] };
  const h = head(expr);
  if (h === "Dictionary") {
    const result = {};
    for (let i = 1; i < nops(expr); i++) {
      const kv2 = keyValuePair(op(expr, i));
      if (kv2)
        result[kv2[0]] = kv2[1];
    }
    return result;
  }
  return null;
}
function machineValueOfString(s) {
  s = s.toLowerCase().replace(/[nd]$/g, "").replace(/[\u0009-\u000d\u0020\u00a0]/g, "");
  if (s === "nan")
    return NaN;
  if (s === "+infinity")
    return Infinity;
  if (s === "-infinity")
    return -Infinity;
  if (/\([0-9]+\)/.test(s)) {
    const [_, body, repeat, trail] = s.match(/(.+)\(([0-9]+)\)(.*)$/) ?? [];
    s = body + repeat.repeat(Math.ceil(16 / repeat.length)) + (trail ?? "");
  }
  return parseFloat(s);
}
function machineValue(expr) {
  if (expr === null || expr === void 0)
    return null;
  if (typeof expr === "number")
    return expr;
  if (typeof expr === "string")
    return machineValueOfString(expr);
  if (isNumberObject(expr))
    return machineValue(expr.num);
  return null;
}
function rationalValue(expr) {
  if (expr === void 0 || expr === null)
    return null;
  if (symbol(expr) === "Half")
    return [1, 2];
  const h = head(expr);
  if (!h)
    return null;
  let numer = null;
  let denom = null;
  if (h === "Negate") {
    const r = rationalValue(op1(expr));
    if (r)
      return [-r[0], r[1]];
  }
  if (h === "Rational" || h === "Divide") {
    numer = machineValue(op1(expr)) ?? NaN;
    denom = machineValue(op2(expr)) ?? NaN;
  }
  if (h === "Power") {
    const exponent = machineValue(op2(expr));
    if (exponent === 1) {
      numer = machineValue(op1(expr));
      denom = 1;
    } else if (exponent === -1) {
      numer = 1;
      denom = machineValue(op1(expr));
    }
  }
  if (h === "Multiply" && head(op2(expr)) === "Power" && machineValue(op2(op2(expr))) === -1) {
    numer = machineValue(op1(expr));
    denom = machineValue(op1(op2(expr)));
  }
  if (numer === null || denom === null)
    return null;
  if (Number.isInteger(numer) && Number.isInteger(denom))
    return [numer, denom];
  return null;
}
function subs(expr, s) {
  const h = head(expr);
  if (h !== null)
    return [subs(h, s), ...(ops(expr) ?? []).map((x) => subs(x, s))];
  const dict = dictionary(expr);
  if (dict !== null) {
    const keys = Object.keys(dict);
    const result = {};
    for (const key of keys)
      result[key] = subs(dict[key], s);
    return { dict: result };
  }
  const sym = symbol(expr);
  if (sym && s[sym])
    return s[sym];
  return expr;
}
function mapArgs(expr, fn) {
  let args = null;
  if (Array.isArray(expr))
    args = expr;
  if (isFunctionObject(expr))
    args = expr.fn;
  if (args === null)
    return [];
  let i = 1;
  const result = [];
  while (i < args.length) {
    result.push(fn(args[i]));
    i += 1;
  }
  return result;
}
function applyAssociativeOperator(op3, lhs, rhs, associativity = "both") {
  if (associativity === "non")
    return [op3, lhs, rhs];
  const lhsName = head(lhs);
  const rhsName = head(rhs);
  if (associativity === "left") {
    if (lhsName === op3)
      return [op3, ...ops(lhs) ?? [], rhs];
    return [op3, lhs, rhs];
  }
  if (associativity === "right") {
    if (rhsName === op3)
      return [op3, lhs, ...ops(rhs) ?? []];
    return [op3, lhs, rhs];
  }
  if (lhsName === op3 && rhsName === op3) {
    return [op3, ...ops(lhs) ?? [], ...ops(rhs) ?? []];
  }
  if (lhsName === op3)
    return [op3, ...ops(lhs) ?? [], rhs];
  if (rhsName === op3)
    return [op3, lhs, ...ops(rhs) ?? []];
  return [op3, lhs, rhs];
}
function getSequence(expr) {
  if (expr === null)
    return null;
  let h = head(expr);
  if (h === "Delimiter") {
    expr = op(expr, 1);
    if (expr === null)
      return [];
    h = head(expr);
    if (h !== "Sequence")
      return [expr];
  }
  if (h !== "Sequence")
    return null;
  return ops(expr) ?? [];
}
function isEmptySequence(expr) {
  return head(expr) === "Sequence" && nops(expr) === 0;
}
function missingIfEmpty(expr) {
  if (isEmptySequence(expr))
    return MISSING;
  return expr ?? MISSING;
}
function countFunctionLeaves(xs) {
  if (xs[0] === "Square") {
    return countFunctionLeaves(xs.slice(1)) + 2;
  }
  return xs.reduce((acc, x) => acc + countLeaves(x), 0);
}
function countLeaves(expr) {
  if (expr === null)
    return 0;
  if (typeof expr === "number" || typeof expr === "string")
    return 1;
  if (isNumberExpression(expr) || isSymbolObject(expr) || isStringObject(expr))
    return 1;
  if (Array.isArray(expr))
    return countFunctionLeaves(expr);
  if ("fn" in expr)
    return countFunctionLeaves(expr.fn);
  const dict = dictionary(expr);
  if (dict) {
    const keys = Object.keys(dict);
    return 1 + keys.length + keys.reduce((acc, x) => acc + countLeaves(dict[x]), 0);
  }
  return 0;
}

// src/compute-engine/latex-syntax/serializer-style.ts
function getApplyFunctionStyle(_expr, _level) {
  return "paren";
}
function getGroupStyle(_expr, _level) {
  return "paren";
}
function getRootStyle(_expr, level) {
  return level > 2 ? "solidus" : "radical";
}
function getFractionStyle(expr, level) {
  if (level > 3)
    return "inline-solidus";
  if (head(expr) === "Divide") {
    const [n, d] = [countLeaves(op1(expr)), countLeaves(op2(expr))];
    if (d <= 2 && n > 5)
      return "factor";
    if (n <= 2 && d > 5)
      return "reciprocal";
  }
  return "quotient";
}
function getLogicStyle(_expr, _level) {
  return "boolean";
}
function getPowerStyle(_expr, _level) {
  return "solidus";
}
function getNumericSetStyle(_expr, _level) {
  return "compact";
}

// src/compute-engine/latex-syntax/dictionary/definitions-arithmetic.ts
function numeratorDenominator(expr) {
  if (head(expr) !== "Multiply")
    return [[], []];
  const numerator = [];
  const denominator = [];
  const args = ops(expr) ?? [];
  for (const arg of args) {
    if (head(arg) === "Power") {
      const op12 = op(arg, 1);
      const op22 = op(arg, 2);
      if (head(op22) === "Negate") {
        const b = op(op22, 1);
        if (op12 && b)
          denominator.push(["Power", op12, b]);
      } else {
        const exponentVal = machineValue(op22) ?? NaN;
        if (exponentVal === -1) {
          if (op12)
            denominator.push(op12);
        } else if (exponentVal < 0) {
          if (op12)
            denominator.push(["Power", op12, -exponentVal]);
        } else {
          numerator.push(arg);
        }
      }
    } else if (head(arg) === "Rational" && nops(arg) === 2) {
      const op12 = op(arg, 1);
      const op22 = op(arg, 2);
      if (machineValue(op12) !== 1)
        numerator.push(op12);
      if (machineValue(op22) !== 1)
        denominator.push(op22);
    } else {
      const r = rationalValue(arg);
      if (r !== null) {
        if (r[0] !== 1)
          numerator.push(r[0]);
        denominator.push(r[1]);
      } else
        numerator.push(arg);
    }
  }
  return [numerator, denominator];
}
function parseRoot(parser) {
  const degree = parser.parseOptionalGroup();
  const base = parser.parseGroup() ?? parser.parseToken();
  if (base === null || isEmptySequence(base)) {
    if (degree !== null)
      return ["Root", MISSING, missingIfEmpty(degree)];
    return ["Sqrt", MISSING];
  }
  if (degree !== null)
    return ["Root", base, degree];
  return ["Sqrt", base];
}
function serializeRoot(serializer, style, base, degree) {
  if (base === null)
    return "\\sqrt{}";
  degree = degree ?? 2;
  if (style === "solidus") {
    return serializer.wrapShort(base) + "^{1\\/" + serializer.serialize(degree) + "}";
  } else if (style === "quotient") {
    return serializer.wrapShort(base) + "^{\\frac{1}{" + serializer.serialize(degree) + "}}";
  }
  const degreeValue = machineValue(degree);
  if (degreeValue === 2)
    return "\\sqrt{" + serializer.serialize(base) + "}";
  return "\\sqrt[" + serializer.serialize(degree) + "]{" + serializer.serialize(base) + "}";
}
function serializeAdd(serializer, expr) {
  serializer.level -= 1;
  const name = head(expr);
  let result = "";
  let arg = op(expr, 1);
  if (name === "Negate") {
    result = "-" + serializer.wrap(arg, 276);
  } else if (name === "Add") {
    if (serializer.canonical && nops(expr) === 2 && serializer.options.invisiblePlus !== "+") {
      const [op12, op22] = [op(expr, 1), op(expr, 2)];
      let [lhs, rhs] = [op12, op22];
      let lhsValue = machineValue(lhs);
      let rhsValue = rationalValue(rhs);
      if (lhsValue === null || rhsValue === null) {
        [lhs, rhs] = [op22, op12];
        lhsValue = machineValue(lhs);
        rhsValue = rationalValue(rhs);
      }
      if (lhsValue !== null && rhsValue !== null) {
        if (isFinite(lhsValue) && Number.isInteger(lhsValue) && lhsValue >= 0 && lhsValue <= 1e3 && isFinite(rhsValue[0]) && isFinite(rhsValue[1]) && rhsValue[0] > 0 && rhsValue[0] <= 100 && rhsValue[1] <= 100) {
          result = joinLatex([
            serializer.serialize(lhs),
            serializer.options.invisiblePlus,
            serializer.serialize(rhs)
          ]);
          serializer.level += 1;
          return result;
        }
      }
    }
    let val = machineValue(arg) ?? NaN;
    result = serializer.serialize(arg);
    const last = nops(expr) + 1;
    for (let i = 2; i < last; i++) {
      arg = op(expr, i);
      val = machineValue(arg) ?? NaN;
      if (val < 0) {
        result += serializer.serialize(arg);
      } else if (head(arg) === "Negate") {
        result += serializer.wrap(arg, ADDITION_PRECEDENCE);
      } else {
        const term = serializer.wrap(arg, ADDITION_PRECEDENCE);
        if (term[0] === "-" || term[0] === "+")
          result += term;
        else
          result += "+" + term;
      }
    }
  } else if (name === "Subtract") {
    result = serializer.wrap(arg, ADDITION_PRECEDENCE);
    const arg2 = op(expr, 2);
    if (arg2 !== null) {
      const term = serializer.wrap(arg2, ADDITION_PRECEDENCE);
      if (term[0] === "-")
        result += "+" + term.slice(1);
      else if (term[0] === "+")
        result += "-" + term.slice(1);
      else
        result = result + "-" + term;
    }
  }
  serializer.level += 1;
  return result;
}
function serializeMultiply(serializer, expr) {
  if (expr === null)
    return "";
  serializer.level -= 1;
  let result = "";
  if (serializer.canonical === true) {
    const [numer, denom] = numeratorDenominator(expr);
    if (denom.length > 0) {
      if (denom.length === 1 && denom[0] === 1) {
        if (numer.length === 0)
          result = "1";
        else if (numer.length === 1)
          result = serializer.serialize(numer[0]);
        else
          result = serializeMultiply(serializer, ["Multiply", ...numer]);
      } else {
        result = serializer.serialize([
          "Divide",
          numer.length === 1 ? numer[0] : ["Multiply", ...numer],
          denom.length === 1 ? denom[0] : ["Multiply", ...denom]
        ]);
      }
    }
  }
  if (result) {
    serializer.level += 1;
    return result;
  }
  let isNegative = false;
  let arg = null;
  const count = nops(expr) + 1;
  let prevWasNumber = false;
  for (let i = 1; i < count; i++) {
    arg = op(expr, i);
    if (arg === null)
      continue;
    let term;
    if (isNumberExpression(arg)) {
      term = serializer.serialize(arg);
      if (term === "-1" && !result) {
        result = "";
        isNegative = !isNegative;
      } else {
        if (term[0] === "-") {
          term = term.slice(1);
          isNegative = !isNegative;
        }
        result = !result ? term : joinLatex([result, serializer.options.multiply, term]);
      }
      prevWasNumber = true;
      continue;
    }
    if (head(arg) === "Power") {
      const r = rationalValue(op(arg, 2));
      if (r) {
        const [n, d] = r;
        if (n === 1 && d !== null) {
          result += serializeRoot(
            serializer,
            getRootStyle(arg, serializer.level),
            op(arg, 1),
            d
          );
          prevWasNumber = false;
          continue;
        }
      }
    }
    if (head(arg) === "Power" && !isNaN(machineValue(op(arg, 1)) ?? NaN)) {
      term = serializer.serialize(arg);
      result = !result ? term : joinLatex([result, serializer.options.multiply, term]);
      prevWasNumber = true;
      continue;
    }
    if (head(arg) === "Negate") {
      arg = op(arg, 1);
      isNegative = !isNegative;
    }
    term = serializer.wrap(arg, MULTIPLICATION_PRECEDENCE);
    if (!result) {
      result = term;
    } else {
      const h = head(arg);
      if (prevWasNumber && (h === "Divide" || h === "Rational")) {
        result = joinLatex([result, serializer.options.multiply, term]);
      } else if (!serializer.options.invisibleMultiply) {
        result = joinLatex([result, term]);
      } else {
        result = joinLatex([
          result,
          serializer.options.invisibleMultiply,
          term
        ]);
      }
    }
    prevWasNumber = false;
  }
  serializer.level += 1;
  return isNegative ? "-" + result : result;
}
function parseFraction(parser) {
  let numer = parser.parseGroup();
  let denom = null;
  if (numer === null) {
    numer = parser.parseToken();
    denom = parser.parseToken();
  } else {
    denom = parser.parseGroup();
  }
  numer = missingIfEmpty(numer);
  denom = missingIfEmpty(denom);
  if (head(numer) === "PartialDerivative" && (head(denom) === "PartialDerivative" || head(denom) === "Multiply" && head(op(denom, 1)) === "PartialDerivative")) {
    const degree = op(numer, 3) ?? null;
    let fn = op(numer, 1);
    if (fn === null)
      fn = missingIfEmpty(parser.parseExpression());
    let vars = [];
    if (head(denom) === "Multiply") {
      for (const arg of ops(denom) ?? []) {
        if (head(arg) === "PartialDerivative") {
          const v = op(arg, 2);
          if (v)
            vars.push(v);
        }
      }
    } else {
      const v = op(denom, 2);
      if (v)
        vars.push(v);
    }
    if (vars.length > 1) {
      vars = ["List", ...vars];
    }
    return ["PartialDerivative", fn, ...vars, degree === null ? 1 : degree];
  }
  return ["Divide", numer, denom];
}
function serializeFraction(serializer, expr) {
  if (expr === null)
    return "";
  const numer = missingIfEmpty(op(expr, 1));
  const denom = missingIfEmpty(op(expr, 2));
  const style = serializer.canonical ? getFractionStyle(expr, serializer.level) : "quotient";
  if (style === "inline-solidus" || style === "nice-solidus") {
    const numerStr = serializer.wrapShort(numer);
    const denomStr = serializer.wrapShort(denom);
    if (style === "inline-solidus")
      return `${numerStr}\\/${denomStr}`;
    return `{}^{${numerStr}}\\!\\!/\\!{}_{${denomStr}}`;
  } else if (style === "reciprocal") {
    if (machineValue(numer) === 1)
      return serializer.wrap(denom) + "^{-1}";
    return serializer.wrap(numer) + serializer.wrap(denom) + "^{-1}";
  } else if (style === "factor") {
    if (machineValue(denom) === 1)
      return serializer.wrap(numer);
    return "\\frac{1}{" + serializer.serialize(denom) + "}{" + serializer.wrap(numer) + "}";
  }
  let cmd = "\\frac";
  if (style === "block-quotient")
    cmd = "\\dfrac";
  else if (style === "inline-quotient")
    cmd = "\\tfrac";
  const numerLatex = serializer.serialize(numer);
  const denomLatex = serializer.serialize(denom);
  return `${cmd}{${numerLatex}}{${denomLatex}}`;
}
function serializePower(serializer, expr) {
  const name = head(expr);
  const base = missingIfEmpty(op(expr, 1));
  if (name === "Sqrt") {
    return serializeRoot(
      serializer,
      getRootStyle(expr, serializer.level - 1),
      base,
      2
    );
  }
  const exp2 = missingIfEmpty(op(expr, 2));
  if (name === "Root")
    return serializeRoot(
      serializer,
      getRootStyle(expr, serializer.level - 1),
      base,
      exp2
    );
  if (serializer.canonical) {
    const val2 = machineValue(exp2) ?? 1;
    if (val2 === -1) {
      return serializer.serialize(["Divide", "1", base]);
    } else if (val2 < 0) {
      return serializer.serialize(["Divide", "1", ["Power", base, -val2]]);
    } else if (head(exp2) === "Divide" || head(exp2) === "Rational") {
      if (machineValue(op(exp2, 1)) === 1) {
        const style = getRootStyle(expr, serializer.level);
        return serializeRoot(serializer, style, base, op(exp2, 2));
      }
      if (machineValue(op(exp2, 2)) === 2) {
        return `${serializer.serialize(["Sqrt", base])}^{${serializer.serialize(
          op(exp2, 1)
        )}}`;
      }
    } else if (head(exp2) === "Power") {
      if (machineValue(op(exp2, 2)) === -1) {
        const style = getRootStyle(expr, serializer.level);
        return serializeRoot(serializer, style, base, op(exp2, 1));
      }
    }
  }
  return serializer.wrapShort(base) + "^{" + serializer.serialize(exp2) + "}";
}
var DEFINITIONS_ARITHMETIC = [
  // Constants
  { name: "CatalanConstant", identifierTrigger: "G" },
  { name: "GoldenRatio", latexTrigger: "\\varphi" },
  { name: "EulerGamma", latexTrigger: "\\gamma" },
  {
    name: "Degrees",
    latexTrigger: ["\\degree"],
    kind: "postfix",
    precedence: 880,
    parse: (_parser, lhs) => ["Degrees", lhs],
    serialize: (serializer, expr) => {
      return joinLatex([serializer.serialize(op(expr, 1)), "\\degree"]);
    }
  },
  {
    latexTrigger: ["\\degree"],
    kind: "postfix",
    precedence: 880,
    parse: (_parser, lhs) => ["Degrees", lhs]
  },
  {
    latexTrigger: ["^", "<{>", "\\circ", "<}>"],
    kind: "postfix",
    parse: (_parser, lhs) => ["Degrees", lhs]
  },
  {
    latexTrigger: ["^", "\\circ"],
    kind: "postfix",
    parse: (_parser, lhs) => ["Degrees", lhs]
  },
  {
    latexTrigger: ["\xB0"],
    kind: "postfix",
    precedence: 880,
    parse: (_parser, lhs) => ["Degrees", lhs]
  },
  {
    latexTrigger: ["\\ang"],
    parse: (parser) => {
      const arg = parser.parseGroup();
      return arg === null ? ["Degrees"] : ["Degrees", arg];
    }
  },
  {
    latexTrigger: ["\\infty"],
    parse: { num: "+Infinity" }
  },
  {
    name: "ComplexInfinity",
    latexTrigger: ["\\tilde", "\\infty"],
    serialize: "\\tilde\\infty"
  },
  {
    latexTrigger: ["\\tilde", "<{>", "\\infty", "<}>"],
    parse: "ComplexInfinity"
  },
  { name: "Pi", kind: "symbol", latexTrigger: ["\\pi"] },
  { latexTrigger: ["\u03C0"], parse: "Pi" },
  {
    name: "ExponentialE",
    latexTrigger: ["\\exponentialE"],
    parse: "ExponentialE",
    serialize: "\\exponentialE"
  },
  {
    latexTrigger: "\\operatorname{e}",
    parse: "ExponentialE"
  },
  {
    latexTrigger: "\\mathrm{e}",
    parse: "ExponentialE"
  },
  {
    kind: "function",
    identifierTrigger: "exp",
    parse: "Exp"
  },
  {
    latexTrigger: "\\exp",
    parse: "Exp"
  },
  {
    name: "ImaginaryUnit",
    latexTrigger: ["\\imaginaryI"]
  },
  {
    latexTrigger: "\\operatorname{i}",
    parse: "ImaginaryUnit"
  },
  {
    latexTrigger: "\\mathrm{i}",
    parse: "ImaginaryUnit"
  },
  // Operations
  {
    /** Could be the determinant if the argument is a matrix */
    /** @todo: domain check */
    /** If a literal matrix, the `serialize` should be custom, the parens are
     * replaced with bars */
    name: "Abs",
    kind: "matchfix",
    openTrigger: "|",
    closeTrigger: "|",
    parse: (_parser, body) => isEmptySequence(body) ? null : ["Abs", body]
  },
  {
    identifierTrigger: "abs",
    kind: "function",
    parse: "Abs"
  },
  {
    name: "Add",
    latexTrigger: ["+"],
    kind: "infix",
    associativity: "both",
    precedence: ADDITION_PRECEDENCE,
    parse: (parser, lhs, until) => {
      if (until && ADDITION_PRECEDENCE < until.minPrec)
        return null;
      const rhs = parser.parseExpression({
        ...until,
        minPrec: ADDITION_PRECEDENCE
      });
      if (rhs === null)
        return null;
      return applyAssociativeOperator("Add", lhs, rhs);
    },
    serialize: serializeAdd
  },
  {
    kind: "prefix",
    latexTrigger: ["+"],
    precedence: ADDITION_PRECEDENCE,
    parse: (parser, until) => {
      if (until && ADDITION_PRECEDENCE < until.minPrec)
        return null;
      return parser.parseExpression({ ...until, minPrec: 400 });
    }
  },
  {
    name: "Ceil",
    kind: "matchfix",
    openTrigger: "\\lceil",
    closeTrigger: "\\rceil",
    parse: (_parser, body) => isEmptySequence(body) ? null : ["Ceil", body]
  },
  {
    kind: "matchfix",
    openTrigger: ["\u2308"],
    // ⌈ U+2308 LEFT CEILING
    closeTrigger: ["\u2309"],
    // ⌉ U+2309 RIGHT CEILING
    parse: (_parser, body) => isEmptySequence(body) ? null : ["Ceil", body]
  },
  {
    identifierTrigger: "ceil",
    kind: "function",
    parse: "Ceil"
  },
  { name: "Chop", identifierTrigger: "chop", kind: "function", parse: "Chop" },
  {
    name: "Complex",
    precedence: ADDITION_PRECEDENCE - 1,
    // One less than precedence of `Add`: used for correct wrapping
    serialize: (serializer, expr) => {
      const re = machineValue(op(expr, 1));
      const im = machineValue(op(expr, 2));
      if (im === 0)
        return serializer.serialize(op(expr, 1));
      const imPart = im === 1 ? "\\imaginaryI" : im === -1 ? "-\\imaginaryI" : joinLatex([serializer.serialize(op(expr, 2)), "\\imaginaryI"]);
      if (re === 0)
        return imPart;
      if (im !== null && im < 0)
        return joinLatex([serializer.serialize(op(expr, 1)), imPart]);
      return joinLatex([serializer.serialize(op(expr, 1)), "+", imPart]);
    }
  },
  {
    name: "Divide",
    latexTrigger: "\\frac",
    precedence: DIVISION_PRECEDENCE,
    // For \frac specifically, not for \div, etc..
    // handles Leibnitz notation for partial derivatives
    parse: parseFraction,
    serialize: serializeFraction
  },
  {
    kind: "infix",
    latexTrigger: "\\over",
    precedence: DIVISION_PRECEDENCE,
    parse: "Divide"
  },
  {
    latexTrigger: ["\\/"],
    kind: "infix",
    associativity: "non",
    precedence: DIVISION_PRECEDENCE,
    // ??? MathML has 265, but it's wrong.
    // It has to be at least higher than multiply
    // e.g. `1/2+3*x` -> `1/2 + 3*x` , not `1/(2+3*x)`
    parse: "Divide"
  },
  {
    latexTrigger: ["/"],
    kind: "infix",
    associativity: "non",
    precedence: DIVISION_PRECEDENCE,
    parse: "Divide"
  },
  {
    latexTrigger: ["\\div"],
    kind: "infix",
    associativity: "non",
    precedence: DIVISION_PRECEDENCE,
    // ??? according to MathML
    parse: "Divide"
  },
  {
    name: "Exp",
    serialize: (serializer, expr) => {
      const op12 = op(expr, 1);
      if (symbol(op12) || machineValue(op12) !== null)
        return joinLatex(["\\exponentialE^{", serializer.serialize(op12)]);
      return joinLatex(["\\exp", serializer.wrap(missingIfEmpty(op12))]);
    }
  },
  {
    name: "Factorial",
    latexTrigger: ["!"],
    kind: "postfix",
    precedence: POSTFIX_PRECEDENCE
  },
  {
    name: "Factorial2",
    latexTrigger: ["!", "!"],
    kind: "postfix",
    precedence: POSTFIX_PRECEDENCE
  },
  {
    name: "Floor",
    kind: "matchfix",
    openTrigger: "\\lfloor",
    closeTrigger: "\\rfloor",
    parse: (_parser, body) => isEmptySequence(body) ? null : ["Floor", body]
  },
  {
    kind: "matchfix",
    openTrigger: ["\u230A"],
    // ⌊ U+230A LEFT FLOOR
    closeTrigger: ["\u230B"],
    // ⌋ U+230B RIGHT FLOOR
    parse: (_parser, body) => isEmptySequence(body) ? null : ["Floor", body]
  },
  {
    identifierTrigger: "floor",
    kind: "function",
    parse: "Floor"
  },
  {
    latexTrigger: ["\\Gamma"],
    parse: "Gamma"
  },
  {
    name: "GCD",
    identifierTrigger: "gcd",
    kind: "function"
  },
  {
    identifierTrigger: "GCD",
    kind: "function",
    parse: "GCD"
  },
  {
    name: "Half",
    serialize: "\\frac12"
  },
  {
    name: "Lg",
    latexTrigger: ["\\lg"],
    serialize: (serializer, expr) => "\\log_{10}" + serializer.wrapArguments(expr),
    parse: (parser) => {
      const args = parser.parseArguments("implicit");
      if (args === null)
        return "Lg";
      return ["Log", ...args, 10];
    }
  },
  {
    name: "Lb",
    latexTrigger: "\\lb",
    parse: (parser) => {
      const args = parser.parseArguments("implicit");
      if (args === null)
        return "Log";
      return ["Log", ...args, 2];
    }
  },
  {
    name: "Ln",
    latexTrigger: ["\\ln"],
    serialize: (serializer, expr) => "\\ln" + serializer.wrapArguments(expr),
    parse: (parser) => parseLog("Ln", parser)
  },
  {
    name: "Log",
    latexTrigger: ["\\log"],
    parse: (parser) => parseLog("Log", parser),
    serialize: (serializer, expr) => {
      const base = op2(expr);
      if (base)
        return joinLatex([
          "\\log_{",
          base.toString(),
          "}",
          serializer.wrap(op1(expr))
        ]);
      return "\\log" + serializer.wrapArguments(expr);
    }
  },
  {
    name: "LCM",
    identifierTrigger: "lcm",
    kind: "function"
  },
  {
    identifierTrigger: "LCM",
    kind: "function",
    parse: "LCM"
  },
  { identifierTrigger: "max", kind: "function", parse: "Max" },
  { identifierTrigger: "min", kind: "function", parse: "Min" },
  { name: "Max", latexTrigger: "\\max", kind: "function" },
  { name: "Min", latexTrigger: "\\min", kind: "function" },
  { name: "Supremum", latexTrigger: "\\sup", kind: "function" },
  { name: "Infimum", latexTrigger: "\\inf", kind: "function" },
  {
    name: "Limit",
    latexTrigger: "\\lim",
    kind: "expression",
    parse: (parser) => {
      if (!parser.match("_"))
        return void 0;
      const base = parser.parseGroup();
      if (head(base) !== "To")
        return void 0;
      const expr = parser.parseArguments("implicit");
      if (!expr)
        return void 0;
      return ["Limit", ["Function", expr[0], op(base, 1)], op(base, 2)];
    },
    serialize: (serializer, expr) => {
      const fn = op(expr, 1);
      const fnVar = op(fn, 2);
      const to = op(expr, 2);
      return joinLatex([
        "\\lim_{",
        serializer.serialize(fnVar),
        "\\to",
        serializer.serialize(to),
        "}",
        serializer.serialize(op(fn, 1))
      ]);
    }
  },
  {
    name: "MinusPlus",
    latexTrigger: ["\\mp"],
    kind: "infix",
    associativity: "both",
    precedence: ARROW_PRECEDENCE
  },
  {
    name: "Multiply",
    latexTrigger: ["\\times"],
    kind: "infix",
    associativity: "both",
    precedence: MULTIPLICATION_PRECEDENCE,
    serialize: serializeMultiply
  },
  {
    latexTrigger: ["\\cdot"],
    kind: "infix",
    associativity: "both",
    precedence: MULTIPLICATION_PRECEDENCE,
    parse: (parser, lhs, terminator) => {
      const rhs = parser.parseExpression({
        ...terminator,
        minPrec: MULTIPLICATION_PRECEDENCE + 2
      });
      if (rhs === null)
        return ["Multiply", lhs, MISSING];
      return applyAssociativeOperator("Multiply", lhs, rhs);
    }
  },
  {
    latexTrigger: ["*"],
    kind: "infix",
    associativity: "both",
    precedence: MULTIPLICATION_PRECEDENCE,
    parse: (parser, lhs, terminator) => {
      const rhs = parser.parseExpression({
        ...terminator,
        minPrec: MULTIPLICATION_PRECEDENCE + 2
      });
      if (rhs === null)
        return ["Multiply", lhs, MISSING];
      return applyAssociativeOperator("Multiply", lhs, rhs);
    }
  },
  // Infix modulo, as in `26 \bmod 5`
  {
    name: "Mod",
    latexTrigger: "\\bmod",
    kind: "infix",
    precedence: DIVISION_PRECEDENCE,
    serialize: (serializer, expr) => {
      if (nops(expr) !== 2)
        return "";
      const lhs = serializer.serialize(op(expr, 1));
      const rhs = serializer.serialize(op(expr, 2));
      return joinLatex([lhs, "\\bmod", rhs]);
    }
  },
  // Synonym to \\bmod
  {
    latexTrigger: "\\mod",
    kind: "infix",
    precedence: DIVISION_PRECEDENCE,
    parse: "Mod"
  },
  {
    latexTrigger: "\\pmod",
    kind: "prefix",
    precedence: COMPARISON_PRECEDENCE,
    parse: (parser) => {
      const rhs = parser.parseGroup() ?? parser.parseToken();
      return ["Mod", missingIfEmpty(rhs)];
    }
  },
  {
    name: "Congruent",
    serialize: (serializer, expr) => {
      const lhs = serializer.serialize(op(expr, 1));
      const rhs = serializer.serialize(op(expr, 2));
      if (op(expr, 3) === null)
        return joinLatex([lhs, "\\equiv", rhs]);
      const modulus = serializer.serialize(op(expr, 3));
      return joinLatex([lhs, "\\equiv", rhs, "\\pmod{", modulus, "}"]);
    }
  },
  {
    name: "Negate",
    latexTrigger: ["-"],
    kind: "prefix",
    precedence: ADDITION_PRECEDENCE,
    parse: (parser, terminator) => {
      if (/\d/.test(parser.peek))
        return null;
      const index = parser.index;
      if (parser.parseNumber() !== null) {
        parser.index = index;
        return null;
      }
      const rhs = parser.parseExpression({
        ...terminator,
        minPrec: ADDITION_PRECEDENCE + 1
      });
      return ["Negate", missingIfEmpty(rhs)];
    }
  },
  // {
  //   /** If the argument is a vector */
  //   /** @todo: domain check */
  //   name: 'Norm',
  //   kind: 'matchfix',
  //   openDelimiter: '|',
  //   closeDelimiter: '|',
  // },
  // {
  //   /** If the argument is a set */
  //   /** @todo: domain check */
  //   name: 'Cardinality',
  //   kind: 'matchfix',
  //   openDelimiter: '|',
  //   closeDelimiter: '|',
  // },
  {
    //   /** If the argument is a vector */
    /** @todo: domain check */
    kind: "matchfix",
    openTrigger: "||",
    closeTrigger: "||",
    parse: (_parser, expr) => isEmptySequence(expr) ? null : ["Norm", expr]
  },
  {
    //   /** If the argument is a vector */
    /** @todo: domain check */
    name: "Norm",
    kind: "matchfix",
    openTrigger: ["\\left", "\\Vert"],
    closeTrigger: ["\\right", "\\Vert"],
    parse: (_parser, expr) => isEmptySequence(expr) ? null : ["Norm", expr]
  },
  {
    name: "PlusMinus",
    latexTrigger: ["\\pm"],
    kind: "infix",
    associativity: "both",
    precedence: ARROW_PRECEDENCE,
    serialize: (serializer, expr) => {
      const op12 = op(expr, 1);
      if (op12 === null)
        return "\\pm";
      if (nops(expr) === 1)
        return joinLatex(["\\pm", serializer.serialize(op12)]);
      const op22 = op(expr, 2);
      return joinLatex([
        serializer.serialize(op12),
        "\\pm",
        serializer.serialize(op22)
      ]);
    }
  },
  {
    latexTrigger: ["\\pm"],
    kind: "prefix",
    precedence: ARROW_PRECEDENCE,
    parse: (parser, terminator) => {
      const rhs = parser.parseExpression({ ...terminator, minPrec: 400 });
      return ["PlusMinus", missingIfEmpty(rhs)];
    }
  },
  {
    latexTrigger: ["\\plusmn"],
    kind: "infix",
    associativity: "both",
    precedence: ARROW_PRECEDENCE,
    parse: (parser, lhs, terminator) => {
      const rhs = parser.parseExpression({ ...terminator, minPrec: 400 });
      return ["PlusMinus", lhs, missingIfEmpty(rhs)];
    }
  },
  {
    latexTrigger: ["\\plusmn"],
    kind: "prefix",
    precedence: ARROW_PRECEDENCE,
    parse: (parser, terminator) => {
      const rhs = parser.parseExpression({ ...terminator, minPrec: 400 });
      return ["PlusMinus", missingIfEmpty(rhs)];
    }
  },
  {
    name: "Power",
    latexTrigger: ["^"],
    kind: "infix",
    serialize: serializePower
    // Parsing is done as a special case in `parseExpression`
  },
  {
    latexTrigger: "\\prod",
    precedence: MULTIPLICATION_PRECEDENCE,
    name: "Product",
    parse: parseBigOp("Product", MULTIPLICATION_PRECEDENCE),
    serialize: serializeBigOp("\\prod")
  },
  // {
  //   trigger: ['*', '*'],
  //   kind: 'infix',
  //   associativity: 'non',
  //   precedence: 720,
  // },
  {
    name: "Rational",
    precedence: DIVISION_PRECEDENCE,
    serialize: (serializer, expr) => {
      if (expr && nops(expr) === 1)
        return "\\operatorname{Rational}" + serializer.wrapArguments(expr);
      return serializeFraction(serializer, expr);
    }
  },
  {
    name: "Root",
    serialize: serializePower
  },
  {
    name: "Round",
    identifierTrigger: "round",
    kind: "function"
  },
  {
    name: "Square",
    precedence: 720,
    serialize: (serializer, expr) => serializer.wrapShort(op(expr, 1)) + "^2"
  },
  {
    latexTrigger: ["\\sum"],
    precedence: ADDITION_PRECEDENCE,
    name: "Sum",
    parse: parseBigOp("Sum", ADDITION_PRECEDENCE),
    serialize: serializeBigOp("\\sum")
  },
  {
    name: "Sign",
    // As per ISO 80000-2, "signum" is 'sgn'
    identifierTrigger: "sgn",
    kind: "function"
  },
  {
    name: "Sqrt",
    latexTrigger: ["\\sqrt"],
    parse: parseRoot,
    serialize: serializePower
  },
  {
    name: "Subtract",
    latexTrigger: ["-"],
    kind: "infix",
    associativity: "both",
    precedence: ADDITION_PRECEDENCE,
    parse: (parser, lhs, terminator) => {
      const rhs = parser.parseExpression({
        ...terminator,
        minPrec: ADDITION_PRECEDENCE + 2
      });
      return ["Subtract", lhs, missingIfEmpty(rhs)];
    }
  }
];
function parseBigOp(name, prec) {
  return (parser) => {
    parser.skipSpace();
    let sup = null;
    let sub2 = null;
    while (!(sub2 && sup) && (parser.peek === "_" || parser.peek === "^")) {
      if (parser.match("_"))
        sub2 = parser.parseGroup() ?? parser.parseToken();
      else if (parser.match("^"))
        sup = parser.parseGroup() ?? parser.parseToken();
      parser.skipSpace();
    }
    if (sub2 === "Nothing" || isEmptySequence(sub2))
      sub2 = null;
    if (sup === "Nothing" || isEmptySequence(sup))
      sup = null;
    let index = null;
    let lower = null;
    if (head(sub2) === "Equal") {
      index = op(sub2, 1);
      lower = op(sub2, 2);
    } else {
      index = sub2;
    }
    const fn = parser.parseExpression({ minPrec: prec + 1 });
    if (!fn)
      return [name];
    if (sup)
      return [name, fn, ["Tuple", index ?? "Nothing", lower ?? 1, sup]];
    if (lower)
      return [name, fn, ["Tuple", index ?? "Nothing", lower]];
    if (index)
      return [name, fn, ["Tuple", index]];
    return [name, fn];
  };
}
function serializeBigOp(command) {
  return (serializer, expr) => {
    if (!op(expr, 1))
      return command;
    let arg = op(expr, 2);
    const h = head(arg);
    if (h !== "Tuple" && h !== "Triple" && h !== "Pair" && h !== "Single")
      arg = null;
    let index = op(arg, 1);
    if (index && head(index) === "Hold")
      index = op(index, 1);
    const fn = op(expr, 1);
    if (!arg) {
      if (!op(expr, 2))
        return joinLatex([command, serializer.serialize(fn)]);
      return joinLatex([
        command,
        "_{",
        serializer.serialize(op(expr, 2)),
        "}",
        serializer.serialize(fn)
      ]);
    }
    const lower = op(arg, 2);
    let sub2 = [];
    if (index && symbol(index) !== "Nothing" && lower)
      sub2 = [serializer.serialize(index), "=", serializer.serialize(lower)];
    else if (index && symbol(index) !== "Nothing")
      sub2 = [serializer.serialize(index)];
    else if (lower)
      sub2 = [serializer.serialize(lower)];
    if (sub2.length > 0)
      sub2 = ["_{", ...sub2, "}"];
    let sup = [];
    if (op(arg, 3))
      sup = ["^{", serializer.serialize(op(arg, 3)), "}"];
    return joinLatex([command, ...sup, ...sub2, serializer.serialize(fn)]);
  };
}
function parseLog(command, parser) {
  let sub2 = null;
  let base = null;
  if (parser.match("_")) {
    sub2 = parser.parseStringGroup()?.trim() ?? parser.nextToken();
    base = Number.parseFloat(sub2 ?? "10");
  }
  const args = parser.parseArguments("implicit");
  if (args === null)
    return command;
  if (base === 10)
    return ["Log", args[0]];
  if (base === 2)
    return ["Lb", ...args];
  if (sub2 === null)
    return [command, ...args];
  return ["Log", ...args, sub2];
}

// src/compute-engine/latex-syntax/dictionary/definitions-core.ts
function parseSequence(parser, terminator, lhs, prec, sep) {
  if (terminator.minPrec >= prec)
    return null;
  const result = lhs ? [lhs] : ["Nothing"];
  let done = false;
  while (!done) {
    done = true;
    parser.skipSpace();
    while (parser.match(sep)) {
      result.push("Nothing");
      parser.skipSpace();
    }
    if (parser.atTerminator(terminator)) {
      result.push("Nothing");
    } else {
      const rhs = parser.parseExpression({ ...terminator, minPrec: prec });
      result.push(rhs ?? "Nothing");
      done = rhs === null;
    }
    if (!done) {
      parser.skipSpace();
      done = !parser.match(sep);
    }
  }
  return result;
}
function serializeOps(sep = "") {
  return (serializer, expr) => {
    if (!expr)
      return "";
    const xs = ops(expr) ?? [];
    if (xs.length === 0)
      return "";
    if (xs.length === 1)
      return serializer.serialize(xs[0]);
    sep = {
      "&": "\\&",
      ":": "\\colon",
      "|": "\\mvert",
      "-": "-",
      "\xB7": "\\cdot",
      // U+00B7 MIDDLE DOT
      "\u2012": "-",
      // U+2012 FIGURE DASH
      "\u2013": "--",
      // U+2013 EN DASH
      "\u2014": "---",
      // U+2014 EM DASH
      "\u2015": "-",
      // U+2015 HORIZONTAL BAR
      "\u2022": "\\bullet",
      // U+2022 BULLET
      "\u2026": "\\ldots"
    }[sep] ?? sep;
    const ys = xs.reduce((acc, item) => {
      acc.push(serializer.serialize(item), sep);
      return acc;
    }, []);
    ys.pop();
    return joinLatex(ys);
  };
}
var DEFINITIONS_CORE = [
  //
  // Constants
  //
  {
    latexTrigger: ["\\placeholder"],
    kind: "symbol",
    parse: (parser) => {
      while (parser.match("<space>")) {
      }
      if (parser.match("["))
        while (!parser.match("]") && !parser.atBoundary)
          parser.nextToken();
      while (parser.match("<space>")) {
      }
      if (parser.match("<{>"))
        while (!parser.match("<}>") && !parser.atBoundary)
          parser.nextToken();
      return "Nothing";
    }
  },
  //
  // Functions
  //
  // Anonymous function, i.e. `(x) \mapsto x^2`
  {
    name: "Function",
    latexTrigger: ["\\mapsto"],
    kind: "infix",
    precedence: ARROW_PRECEDENCE,
    // MathML rightwards arrow
    parse: (parser, lhs) => {
      let params = [];
      if (head(lhs) === "Delimiter")
        lhs = op(lhs, 1) ?? "Nothing";
      if (head(lhs) === "Sequence") {
        for (const x of ops(lhs) ?? []) {
          if (!symbol(x))
            return null;
          params.push(symbol(x));
        }
      } else {
        if (!symbol(lhs))
          return null;
        params = [symbol(lhs)];
      }
      let rhs = parser.parseExpression({ minPrec: ARROW_PRECEDENCE }) ?? "Nothing";
      if (head(rhs) === "Delimiter")
        rhs = op(rhs, 1) ?? "Nothing";
      if (head(rhs) === "Sequence")
        rhs = ["Block", ...ops(rhs) ?? []];
      return ["Function", rhs, ...params];
    },
    serialize: (serializer, expr) => {
      const args = ops(expr);
      if (args === null || args.length < 1)
        return "()\\mapsto()";
      if (args.length === 1)
        return joinLatex(["()", "\\mapsto", serializer.serialize(op(expr, 1))]);
      if (args.length === 2) {
        return joinLatex([
          serializer.serialize(op(expr, 2)),
          "\\mapsto",
          serializer.serialize(op(expr, 1))
        ]);
      }
      return joinLatex([
        serializer.wrapString(
          (ops(expr)?.slice(1) ?? []).map((x) => serializer.serialize(x)).join(", "),
          "paren"
        ),
        "\\mapsto",
        serializer.serialize(op(expr, 1))
      ]);
    }
  },
  {
    name: "Apply",
    kind: "function",
    identifierTrigger: "apply",
    serialize: (serializer, expr) => {
      const h = op(expr, 1);
      if (typeof h === "string") {
        const fn = expr.slice(1);
        return serializer.serialize(fn);
      }
      return serializer.serializeFunction(ops(expr));
    }
  },
  {
    latexTrigger: "\\lhd",
    kind: "infix",
    precedence: 20,
    parse: "Apply"
  },
  {
    latexTrigger: "\\rhd",
    kind: "infix",
    precedence: 20,
    parse: (parser, lhs) => {
      const rhs = parser.parseExpression({ minPrec: 21 }) ?? "Nothing";
      return ["Apply", rhs, lhs];
    }
  },
  // The mathtools package includes several synonmyms for \colonequals. The
  // current preferred one is `\coloneq`
  {
    name: "Assign",
    latexTrigger: "\\coloneq",
    kind: "infix",
    associativity: "right",
    precedence: ASSIGNMENT_PRECEDENCE,
    // parse: (parser: Parser, lhs: Expression) => {
    //   const rhs = parser.parseExpression({ minPrec: 260 }) ?? 'Nothing';
    //   return ['Assign', lhs, rhs];
    // },
    serialize: (serializer, expr) => {
      const id = unhold(op(expr, 1));
      if (head(op(expr, 2)) === "Function") {
        const op_2 = op(expr, 2);
        const body = unhold(op(op_2, 1));
        const args = ops(op_2)?.slice(1) ?? [];
        return joinLatex([
          serializer.serialize(id),
          serializer.wrapString(
            args.map((x) => serializer.serialize(x)).join(", "),
            serializer.options.applyFunctionStyle(expr, serializer.level)
          ),
          "\\coloneq",
          serializer.serialize(body)
        ]);
      }
      return joinLatex([
        serializer.serialize(id),
        "\\coloneq",
        serializer.serialize(op(expr, 2))
      ]);
    },
    parse: parseAssign
  },
  {
    latexTrigger: [":", "="],
    kind: "infix",
    associativity: "right",
    precedence: ASSIGNMENT_PRECEDENCE,
    parse: parseAssign
  },
  {
    latexTrigger: "\\colonequals",
    kind: "infix",
    associativity: "right",
    precedence: ASSIGNMENT_PRECEDENCE,
    parse: parseAssign
  },
  {
    latexTrigger: "\\coloneqq",
    kind: "infix",
    associativity: "right",
    precedence: ASSIGNMENT_PRECEDENCE,
    parse: parseAssign
  },
  {
    name: "BaseForm",
    serialize: (serializer, expr) => {
      const radix = machineValue(op(expr, 2)) ?? NaN;
      if (isFinite(radix) && radix >= 2 && radix <= 36) {
        const num = machineValue(op(expr, 1)) ?? NaN;
        if (isFinite(num) && Number.isInteger(num)) {
          let digits = Number(num).toString(radix);
          let groupLength = 0;
          if (radix === 2) {
            groupLength = 4;
          } else if (radix === 10) {
            groupLength = 4;
          } else if (radix === 16) {
            groupLength = 2;
          } else if (radix > 16) {
            groupLength = 4;
          }
          if (groupLength > 0) {
            const oldDigits = digits;
            digits = "";
            for (let i = 0; i < oldDigits.length; i++) {
              if (i > 0 && i % groupLength === 0)
                digits = "\\, " + digits;
              digits = oldDigits[oldDigits.length - i - 1] + digits;
            }
          }
          return `(\\text{${digits}}_{${radix}}`;
        }
      }
      return "\\operatorname{BaseForm}(" + serializer.serialize(op(expr, 1)) + ", " + serializer.serialize(op(expr, 2)) + ")";
    }
  },
  {
    name: "Sequence",
    // Use a space as a separator, otherwise a sequence of numbers
    // could be interpreted as a single number.
    serialize: serializeOps(" ")
  },
  {
    name: "InvisibleOperator",
    serialize: serializeOps("")
  },
  {
    // The first argument is a function expression.
    // The second (optional) argument is a string specifying the
    // delimiters and separator.
    name: "Delimiter",
    serialize: (serializer, expr) => {
      const arg1 = op(expr, 1);
      const style = serializer.options.groupStyle(expr, serializer.level + 1);
      const h1 = head(arg1);
      let delims = {
        Set: "{,}",
        List: "[,]",
        Tuple: "(,)",
        Single: "(,)",
        Pair: "(,)",
        Triple: "(,)",
        Sequence: "(,)",
        String: '""'
      }[typeof h1 === "string" ? h1 : ""] ?? "(,)";
      if (nops(expr) > 1) {
        const op22 = stringValue(op(expr, 2));
        if (typeof op22 === "string" && op22.length <= 3)
          delims = op22;
      }
      let [open, sep, close] = ["", "", ""];
      if (delims.length === 3)
        [open, sep, close] = delims;
      else if (delims.length === 2)
        [open, close] = delims;
      else if (delims.length === 1)
        sep = delims;
      const body = arg1 ? ops(arg1) ? serializeOps(sep)(serializer, arg1) : serializer.serialize(arg1) : "";
      return serializer.wrapString(body, style, open + close);
    }
  },
  {
    name: "Domain",
    serialize: (serializer, expr) => {
      if (head(expr) === "Error")
        return serializer.serialize(expr);
      return `\\mathbf{${serializer.serialize(op(expr, 1))}}`;
    }
  },
  {
    latexTrigger: ["\\mathtip"],
    parse: (parser) => {
      const op12 = parser.parseGroup();
      parser.parseGroup();
      return op12;
    }
  },
  {
    latexTrigger: ["\\texttip"],
    parse: (parser) => {
      const op12 = parser.parseGroup();
      parser.parseGroup();
      return op12;
    }
  },
  {
    latexTrigger: ["\\error"],
    parse: (parser) => ["Error", parser.parseGroup()]
  },
  {
    name: "Error",
    serialize: (serializer, expr) => {
      const op12 = op(expr, 1);
      if (stringValue(op12) === "missing")
        return `\\error{${serializer.options.missingSymbol ?? "\\placeholder{}"}}`;
      const where = errorContextAsLatex(serializer, expr) || "\\blacksquare";
      const code = head(op12) === "ErrorCode" ? stringValue(op(op12, 1)) : stringValue(op12);
      if (code === "incompatible-domain") {
        if (symbol(op(op12, 3)) === "Undefined") {
          return `\\mathtip{\\error{${where}}}{\\notin ${serializer.serialize(
            op(op12, 2)
          )}}`;
        }
        return `\\mathtip{\\error{${where}}}{\\in ${serializer.serialize(
          op(op12, 3)
        )}\\notin ${serializer.serialize(op(op12, 2))}}`;
      }
      if (typeof code === "string")
        return `\\error{${where}}`;
      return `\\error{${where}}`;
    }
  },
  {
    name: "ErrorCode",
    serialize: (serializer, expr) => {
      const code = stringValue(op(expr, 1));
      if (code === "missing")
        return serializer.options.missingSymbol ?? "\\placeholder{}";
      if (code === "unexpected-command" || code === "unexpected-operator" || code === "unexpected-token" || code === "invalid-identifier" || code === "unknown-environment" || code === "unexpected-base" || code === "incompatible-domain" || code === "invalid-domain") {
        return "";
      }
      return `\\texttip{\\error{\\blacksquare}}{\\mathtt{${code}}}`;
    }
  },
  {
    name: "FromLatex",
    serialize: (_serializer, expr) => {
      return `\\texttt{${sanitizeLatex(stringValue(op(expr, 1)))}}`;
    }
  },
  {
    name: "Latex",
    serialize: (serializer, expr) => {
      if (expr === null)
        return "";
      return joinLatex(
        mapArgs(expr, (x) => stringValue(x) ?? serializer.serialize(x))
      );
    }
  },
  {
    name: "LatexString",
    serialize: (serializer, expr) => {
      if (expr === null)
        return "";
      return joinLatex(mapArgs(expr, (x) => serializer.serialize(x)));
    }
  },
  { name: "LatexTokens", serialize: serializeLatexTokens },
  {
    name: "List",
    kind: "matchfix",
    openTrigger: "[",
    closeTrigger: "]",
    parse: parseBrackets,
    // Note: Avoid \\[ ... \\] because it is used for display math
    serialize: (serializer, expr) => joinLatex([
      "\\bigl\\lbrack",
      serializeOps(", ")(serializer, expr),
      "\\bigr\\rbrack"
    ])
  },
  {
    kind: "matchfix",
    openTrigger: "(",
    closeTrigger: ")",
    parse: parseParenDelimiter
  },
  {
    latexTrigger: [","],
    kind: "infix",
    precedence: 20,
    // Unlike the matchfix version of List,
    // when the comma operator is used, the lhs and rhs are flattened,
    // i.e. `1,2,3` -> `["Delimiter", ["List", 1, 2, 3],  ","]`,
    // and `1, (2, 3)` -> `["Delimiter",
    // ["Sequence", 1, ["Delimiter", ["List", 2, 3],  "()", ","]]],
    parse: (parser, lhs, terminator) => {
      const seq = parseSequence(parser, terminator, lhs, 20, ",");
      if (seq === null)
        return null;
      return ["Delimiter", ["Sequence", ...seq], { str: "," }];
    }
  },
  // Entry to handle the case of a single comma
  // with a missing lhs.
  {
    latexTrigger: [","],
    kind: "prefix",
    precedence: 20,
    parse: (parser, terminator) => {
      const seq = parseSequence(parser, terminator, null, 20, ",");
      if (seq === null)
        return null;
      return ["Delimiter", ["Sequence", ...seq], { str: "," }];
    }
  },
  {
    name: "Range",
    latexTrigger: [".", "."],
    kind: "infix",
    precedence: 10,
    parse: parseRange,
    serialize: (serializer, expr) => {
      const args = ops(expr);
      if (args === null)
        return "";
      if (args.length === 1)
        return "1.." + serializer.serialize(op(expr, 1));
      if (args.length === 2)
        return serializer.wrap(op(expr, 1), 10) + ".." + serializer.wrap(op(expr, 2), 10);
      if (args.length === 3) {
        const step = machineValue(op(expr, 3));
        const start = machineValue(op(expr, 1));
        if (step !== null && start !== null) {
          return serializer.wrap(op(expr, 1), 10) + "," + serializer.wrap(start + step, 10) + ".." + serializer.wrap(op(expr, 2), 10);
        }
        return serializer.wrap(op(expr, 1), 10) + "," + (serializer.wrap(op(expr, 3), ADDITION_PRECEDENCE) + "+" + serializer.wrap(op(expr, 3), ADDITION_PRECEDENCE)) + ".." + serializer.wrap(op(expr, 2), 10);
      }
      return "";
    }
  },
  {
    latexTrigger: [";"],
    kind: "infix",
    precedence: 19,
    parse: (parser, lhs, terminator) => {
      const seq = parseSequence(parser, terminator, lhs, 19, ";");
      if (seq === null)
        return null;
      return ["Delimiter", ["Sequence", ...seq], "';'"];
    }
  },
  {
    name: "String",
    latexTrigger: ["\\text"],
    parse: (scanner) => parseTextRun(scanner),
    serialize: (serializer, expr) => {
      const args = ops(expr);
      if (args === null || args.length === 0)
        return "\\text{}";
      return joinLatex([
        "\\text{",
        args.map((x) => serializer.serialize(x)).join(""),
        "}"
      ]);
    }
  },
  {
    name: "Subscript",
    latexTrigger: ["_"],
    kind: "infix",
    serialize: (serializer, expr) => {
      if (nops(expr) === 2) {
        return serializer.serialize(op(expr, 1)) + "_{" + serializer.serialize(op(expr, 2)) + "}";
      }
      return "_{" + serializer.serialize(op(expr, 1)) + "}";
    }
  },
  { name: "Superplus", latexTrigger: ["^", "+"], kind: "postfix" },
  { name: "Subplus", latexTrigger: ["_", "+"], kind: "postfix" },
  { name: "Superminus", latexTrigger: ["^", "-"], kind: "postfix" },
  { name: "Subminus", latexTrigger: ["_", "-"], kind: "postfix" },
  {
    latexTrigger: ["^", "*"],
    kind: "postfix",
    parse: (_parser, lhs) => ["Superstar", lhs]
  },
  // { name: 'Superstar', latexTrigger: ['^', '\\star'], kind: 'postfix' },
  {
    latexTrigger: ["_", "*"],
    kind: "postfix",
    parse: (_parser, lhs) => ["Substar", lhs]
  },
  { name: "Substar", latexTrigger: ["_", "\\star"], kind: "postfix" },
  { name: "Superdagger", latexTrigger: ["^", "\\dagger"], kind: "postfix" },
  {
    latexTrigger: ["^", "\\dag"],
    kind: "postfix",
    parse: (_parser, lhs) => ["Superdagger", lhs]
  },
  {
    name: "Prime",
    latexTrigger: ["^", "\\prime"],
    // Note: we don't need a precedence because the trigger is '^'
    // and '^' (and '_') are treated specially by the parser.
    kind: "postfix",
    parse: (parser, lhs) => parsePrime(parser, lhs, 1),
    serialize: (serializer, expr) => {
      const n2 = machineValue(op(expr, 2)) ?? 1;
      const base = serializer.serialize(op(expr, 1));
      if (n2 === 1)
        return base + "^\\prime";
      if (n2 === 2)
        return base + "^\\doubleprime";
      if (n2 === 3)
        return base + "^\\tripleprime";
      return base + "^{(" + serializer.serialize(op(expr, 2)) + ")}";
    }
  },
  {
    latexTrigger: "^{\\prime\\prime}",
    kind: "postfix",
    parse: (parser, lhs) => parsePrime(parser, lhs, 2)
  },
  {
    latexTrigger: "^{\\prime\\prime\\prime}",
    kind: "postfix",
    parse: (parser, lhs) => parsePrime(parser, lhs, 3)
  },
  {
    latexTrigger: ["^", "\\doubleprime"],
    kind: "postfix",
    parse: (parser, lhs) => parsePrime(parser, lhs, 2)
  },
  {
    latexTrigger: ["^", "\\tripleprime"],
    kind: "postfix",
    parse: (parser, lhs) => parsePrime(parser, lhs, 3)
  },
  {
    latexTrigger: "'",
    kind: "postfix",
    precedence: 810,
    parse: (parser, lhs) => parsePrime(parser, lhs, 1)
  },
  {
    latexTrigger: "\\prime",
    kind: "postfix",
    precedence: 810,
    parse: (parser, lhs) => parsePrime(parser, lhs, 1)
  },
  {
    latexTrigger: "\\doubleprime",
    kind: "postfix",
    precedence: 810,
    parse: (parser, lhs) => parsePrime(parser, lhs, 2)
  },
  {
    latexTrigger: "\\tripleprime",
    kind: "postfix",
    precedence: 810,
    parse: (parser, lhs) => parsePrime(parser, lhs, 3)
  },
  // Lagrange Notation for n-th order derivatives,
  // i.e. f^{(n)} -> Derivative(f, n)
  {
    latexTrigger: ["^", "<{>", "("],
    kind: "postfix",
    parse: (parser, lhs) => {
      if (!parser.computeEngine?.box(lhs)?.domain?.isFunction)
        return null;
      const start = parser.index;
      parser.addBoundary([")"]);
      const expr = parser.parseExpression();
      if (!parser.matchBoundary()) {
        parser.index = start;
        return null;
      }
      if (!parser.match("<}>")) {
        parser.index = start;
        return null;
      }
      return ["Derivative", lhs, expr];
    }
  },
  {
    name: "InverseFunction",
    latexTrigger: "^{-1",
    // Note: the closing brace is not included
    kind: "postfix",
    parse: (parser, lhs) => {
      if (!parser.computeEngine?.box(lhs)?.domain?.isFunction)
        return null;
      let primeCount = 0;
      const start = parser.index;
      while (!parser.atEnd && !parser.match("<}>")) {
        if (parser.match("'"))
          primeCount++;
        else if (parser.match("\\prime"))
          primeCount++;
        else if (parser.match("\\doubleprime"))
          primeCount += 2;
        else if (parser.match("\\tripleprime"))
          primeCount += 3;
        else {
          parser.index = start;
          return null;
        }
      }
      if (primeCount === 1)
        return ["Derivative", ["InverseFunction", lhs]];
      if (primeCount > 0)
        return ["Derivative", ["InverseFunction", lhs], primeCount];
      return ["InverseFunction", lhs];
    },
    serialize: (serializer, expr) => serializer.serialize(op(expr, 1)) + "^{-1}"
  },
  // Lagrange notation
  {
    name: "Derivative",
    // @todo: Leibniz notation: {% latex " \\frac{d^n}{dx^n} f(x)" %}
    // @todo: Euler modified notation: This notation is used by Mathematica. The Euler notation uses `D` instead of
    // `\partial`: `\partial_{x} f`,  `\partial_{x,y} f`
    // @todo: Newton notation: `\dot{v}` -> first derivative relative to time t `\ddot{v}` -> second derivative relative to time t
    serialize: (serializer, expr) => {
      const degree = machineValue(op(expr, 2)) ?? 1;
      const base = serializer.serialize(op(expr, 1));
      if (degree === 1)
        return base + "^{\\prime}";
      if (degree === 2)
        return base + "^{\\doubleprime}";
      if (degree === 3)
        return base + "^{\\tripleprime}";
      return base + "^{(" + serializer.serialize(op(expr, 2)) + ")}";
    }
  },
  {
    kind: "environment",
    name: "Which",
    identifierTrigger: "cases",
    parse: parseWhich,
    serialize: (serialize, expr) => {
      const rows = [];
      const args = ops(expr);
      if (args) {
        for (let i = 0; i <= args.length - 2; i += 2) {
          const row = [];
          row.push(serialize.serialize(args[i + 1]));
          row.push(serialize.serialize(args[i]));
          rows.push(row.join("&"));
        }
      }
      return joinLatex(["\\begin{cases}", rows.join("\\\\"), "\\end{cases}"]);
    }
  },
  {
    kind: "environment",
    identifierTrigger: "dcases",
    parse: parseWhich
  },
  {
    kind: "environment",
    identifierTrigger: "rcases",
    parse: parseWhich
  }
];
function parseTextRun(parser, style) {
  if (!parser.match("<{>"))
    return "''";
  const runs = [];
  let text = "";
  let runinStyle = null;
  while (!parser.atEnd && !parser.match("<}>")) {
    if (parser.peek === "<{>") {
      runs.push(parseTextRun(parser));
    } else if (parser.match("\\textbf") && parser.match("<{>")) {
      runs.push(parseTextRun(parser, { "font-weight": "bold" }));
    } else if (parser.match("\\color")) {
      const color = parser.parseStringGroup();
      if (color !== null) {
        if (runinStyle !== null && text) {
          runs.push(["Style", text, { dict: runinStyle }]);
        } else if (text) {
          runs.push(["String", text]);
        }
        text = "";
        runinStyle = { color };
      }
    } else if (parser.match("<space>")) {
      text += " ";
    } else if (parser.match("<$>")) {
      const index = parser.index;
      const expr = parser.parseExpression() ?? ["Sequence"];
      parser.skipSpace();
      if (parser.match("<$>")) {
        runs.push(expr);
      } else {
        text += "$";
        parser.index = index;
      }
    } else if (parser.match("<$$>")) {
      const index = parser.index;
      const expr = parser.parseExpression() ?? ["Sequence"];
      parser.skipSpace();
      if (parser.match("<$$>")) {
        runs.push(expr);
      } else {
        text += "$$";
        parser.index = index;
      }
    } else {
      const c = parser.matchChar() ?? parser.nextToken();
      text += {
        "\\enskip": "\u2002",
        //  en space
        "\\enspace": "\u2002",
        //  en space
        "\\quad": "\u2003",
        //  em space
        "\\qquad": "\u2003\u2003",
        //  2 em space
        "\\space": "\u2003",
        //  em space
        "\\ ": "\u2003",
        //  em space
        "\\;": "\u2004",
        //  three per em space
        "\\,": "\u2009",
        //  thin space
        "\\:": "\u205F",
        //  medium mathematical space
        "\\!": "",
        //  negative thin space
        "\\{": "{",
        "\\}": "}",
        "\\$": "$",
        "\\&": "&",
        "\\#": "#",
        "\\%": "%",
        "\\_": "_",
        "\\textbackslash": "\\",
        "\\textasciitilde": "~",
        "\\textasciicircum": "^",
        "\\textless": "<",
        "\\textgreater": ">",
        "\\textbar": "|",
        "\\textunderscore": "_",
        "\\textbraceleft": "{",
        "\\textbraceright": "}",
        "\\textasciigrave": "`",
        "\\textquotesingle": "'",
        "\\textquotedblleft": "\u201C",
        "\\textquotedblright": "\u201D",
        "\\textquotedbl": '"',
        "\\textquoteleft": "\u2018",
        "\\textquoteright": "\u2019",
        "\\textbullet": "\u2022",
        "\\textdagger": "\u2020",
        "\\textdaggerdbl": "\u2021",
        "\\textsection": "\xA7",
        "\\textparagraph": "\xB6",
        "\\textperiodcentered": "\xB7",
        "\\textellipsis": "\u2026",
        "\\textemdash": "\u2014",
        "\\textendash": "\u2013",
        "\\textregistered": "\xAE",
        "\\texttrademark": "\u2122",
        "\\textdegree": "\xB0"
      }[c] ?? c;
    }
  }
  if (runinStyle !== null && text) {
    runs.push(["Style", `'${text}'`, { dict: runinStyle }]);
  } else if (text) {
    runs.push(`'${text}'`);
  }
  let body;
  if (runs.length === 1)
    body = runs[0];
  else {
    if (runs.every((x) => stringValue(x) !== null))
      body = "'" + runs.map((x) => stringValue(x)).join() + "'";
    else
      body = ["String", ...runs];
  }
  return style ? ["Style", body, { dict: style }] : body;
}
function serializeLatexTokens(serializer, expr) {
  if (expr === null)
    return "";
  return joinLatex(
    mapArgs(expr, (x) => {
      const s = stringValue(x);
      if (s === null)
        return serializer.serialize(x);
      if (s === "<{>")
        return "{";
      if (s === "<}>")
        return "}";
      if (s === "<$>")
        return "$";
      if (s === "<$$>")
        return "$$";
      if (s === "<space>")
        return " ";
      return s;
    })
  );
}
function sanitizeLatex(s) {
  if (s === null)
    return "";
  return s.replace(
    /[{}\[\]\\:\-\$%]/g,
    (c) => ({
      "{": "\\lbrace ",
      "}": "\\rbrace ",
      "[": "\\lbrack ",
      "]": "\\rbrack ",
      ":": "\\colon ",
      "\\": "\\backslash "
    })[c] ?? "\\" + c
  );
}
function errorContextAsLatex(serializer, error) {
  const arg = op(error, 2);
  if (!arg)
    return "";
  if (head(arg) === "LatexString")
    return `\\texttt{${sanitizeLatex(stringValue(op(arg, 1)) ?? "")}}`;
  if (head(arg) === "Hold")
    return serializer.serialize(op(arg, 1));
  return serializer.serialize(arg);
}
function parsePrime(parser, lhs, order2) {
  const lhsh = head(lhs);
  if (lhsh === "Derivative" || lhsh === "Prime") {
    const n = machineValue(op(lhs, 2)) ?? 1;
    return [lhsh, missingIfEmpty(op(lhs, 1)), n + order2];
  }
  if (parser.computeEngine?.box(lhs)?.domain?.isFunction) {
    if (order2 === 1)
      return ["Derivative", lhs];
    return ["Derivative", lhs, order2];
  }
  if (order2 === 1)
    return ["Prime", missingIfEmpty(lhs)];
  return ["Prime", missingIfEmpty(lhs), order2];
}
function parseParenDelimiter(_parser, body) {
  if (body === null || isEmptySequence(body))
    return ["Delimiter"];
  const h = head(body);
  if (h === "Delimiter" && op(body, 2)) {
    const delims = stringValue(op(body, 2));
    if (delims?.length === 1) {
      return ["Delimiter", op(body, 1) ?? ["Sequence"], { str: `(${delims})` }];
    }
  }
  if (h === "Sequence") {
    if (nops(body) === 0)
      return ["Delimiter"];
    return ["Delimiter", body];
  }
  if (h === "Matrix") {
    let delims = stringValue(op(body, 2)) ?? "..";
    if (delims === "..")
      return ["Matrix", op(body, 1)];
  }
  return ["Delimiter", ["Sequence", body]];
}
function parseBrackets(parser, body) {
  if (body === null || isEmptySequence(body))
    return ["List"];
  const h = head(body);
  if (h === "Range" || h === "Linspace")
    return body;
  if (h === "Sequence")
    return ["List", ...ops(body) ?? []];
  if (h === "Delimiter") {
    const delim = stringValue(op(body, 2)) ?? "...";
    if (delim === ";" || delim === ".;.") {
      return [
        "List",
        ...(ops(op(body, 1)) ?? []).map((x) => parseBrackets(parser, x))
      ];
    }
    if (delim === "," || delim === ".,.") {
      body = op(body, 1);
      if (head(body) === "Sequence")
        return ["List", ...ops(body) ?? []];
      return ["List", body ?? ["Sequence"]];
    }
  }
  return ["List", body];
}
function parseRange(parser, lhs) {
  const index = parser.index;
  if (!lhs)
    return null;
  let start = null;
  let second = null;
  if (head(lhs) === "Sequence") {
    if (nops(lhs) !== 2)
      return null;
    start = op(lhs, 1);
    second = op(lhs, 2);
    if (second === null) {
      parser.index = index;
      return null;
    }
  } else
    start = op(lhs, 1);
  if (start === null)
    return null;
  const end = parser.parseExpression({ minPrec: 0 });
  if (!end) {
    parser.index = index;
    return null;
  }
  if (second) {
    const secondValue = machineValue(second);
    const startValue = machineValue(start);
    if (secondValue !== null && startValue !== null) {
      return ["Range", start, end, secondValue - startValue];
    }
    return ["Range", start, end, ["Subtract", second, start]];
  }
  return ["Range", start, end];
}
var DELIMITERS_SHORTHAND = {
  "(": "(",
  ")": ")",
  "[": "\\lbrack",
  "]": "\\rbrack",
  "\u27E6": "\\llbrack",
  // U+27E6 MATHEMATICAL LEFT WHITE SQUARE BRACKET
  "\u27E7": "\\rrbrack",
  // U+27E7 MATHEMATICAL RIGHT WHITE SQUARE BRACKET
  "{": "\\lbrace",
  "}": "\\rbrace",
  "<": "\\langle",
  ">": "\\rangle",
  // '|': '\\vert',
  "\u2016": "\\Vert",
  // U+2016 DOUBLE VERTICAL LINE
  "\\": "\\backslash",
  "\u2308": "\\lceil",
  // ⌈ U+2308 LEFT CEILING
  "\u2309": "\\rceil",
  // U+2309 RIGHT CEILING
  "\u230A": "\\lfloor",
  // ⌊ U+230A LEFT FLOOR
  "\u230B": "\\rfloor",
  // ⌋ U+230B RIGHT FLOOR
  "\u231C": "\\ulcorner",
  // ⌜ U+231C TOP LEFT CORNER
  "\u231D": "\\urcorner",
  // ⌝ U+231D TOP RIGHT CORNER
  "\u231E": "\\llcorner",
  // ⌞ U+231E BOTTOM LEFT CORNER
  "\u231F": "\\lrcorner",
  // ⌟ U+231F BOTTOM RIGHT CORNER
  "\u23B0": "\\lmoustache",
  // U+23B0 UPPER LEFT OR LOWER RIGHT CURLY BRACKET SECTION
  "\u23B1": "\\rmoustache"
  // U+23B1 UPPER RIGHT OR LOWER LEFT CURLY BRACKET SECTION
  // '⎹': '', // U+23B9 DIVIDES
  // '⎾': '', // U+23BE RIGHT PARENTHESIS UPPER HOOK
  // '⎿': '', // U+23BF RIGHT PARENTHESIS LOWER HOOK
};
function parseAssign(parser, lhs) {
  const index = parser.index;
  if (head(lhs) === "InvisibleOperator" && nops(lhs) === 2 && head(op(lhs, 2)) === "Delimiter" && head(op(op(lhs, 2), 1)) === "Sequence") {
    const fn = symbol(op(lhs, 1));
    if (!fn)
      return null;
    const args = ops(op(op(lhs, 2), 1));
    const rhs2 = parser.parseExpression({ minPrec: 0 });
    if (rhs2 === null) {
      parser.index = index;
      return null;
    }
    return ["Assign", fn, ["Function", rhs2, ...args ?? []]];
  }
  if (typeof head(lhs) === "string") {
    const fn = head(lhs);
    const args = ops(lhs) ?? [];
    const rhs2 = parser.parseExpression({ minPrec: 0 });
    if (rhs2 === null) {
      parser.index = index;
      return null;
    }
    return ["Assign", fn, ["Function", rhs2, ...args]];
  }
  if (!symbol(lhs))
    return null;
  const rhs = parser.parseExpression({ minPrec: 0 });
  if (rhs === null) {
    parser.index = index;
    return null;
  }
  return ["Assign", lhs, rhs];
}
function parseWhich(parser) {
  const tabular = parser.parseTabular();
  if (!tabular)
    return ["Which"];
  const result = ["Which"];
  for (const row of tabular) {
    if (row.length === 1) {
      result.push("True");
      result.push(row[0]);
    } else if (row.length === 2) {
      const s = stringValue(row[1]);
      result.push(s ? "True" : stripText(row[1]) ?? "True");
      result.push(row[0]);
    }
  }
  return result;
}

// src/compute-engine/latex-syntax/dictionary/definitions-relational-operators.ts
var DEFINITIONS_INEQUALITIES = [
  {
    latexTrigger: ["\\not", "<"],
    kind: "infix",
    associativity: "right",
    precedence: 246,
    parse: "NotLess"
  },
  {
    name: "NotLess",
    latexTrigger: ["\\nless"],
    kind: "infix",
    associativity: "right",
    precedence: 246
  },
  {
    latexTrigger: ["<"],
    kind: "infix",
    associativity: "right",
    precedence: 245,
    parse: "Less"
  },
  {
    name: "Less",
    latexTrigger: ["\\lt"],
    kind: "infix",
    associativity: "right",
    precedence: 245
  },
  {
    latexTrigger: ["<", "="],
    kind: "infix",
    associativity: "right",
    precedence: 241,
    parse: "LessEqual"
  },
  {
    name: "LessEqual",
    latexTrigger: ["\\le"],
    kind: "infix",
    associativity: "right",
    precedence: 241
  },
  {
    latexTrigger: ["\\leq"],
    kind: "infix",
    associativity: "right",
    precedence: 241,
    parse: "LessEqual"
  },
  {
    latexTrigger: ["\\leqslant"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE + 5,
    // Note different precedence than `<=` as per MathML
    parse: "LessEqual"
  },
  {
    name: "LessNotEqual",
    latexTrigger: ["\\lneqq"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    name: "NotLessNotEqual",
    latexTrigger: ["\\nleqq"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    name: "LessOverEqual",
    latexTrigger: ["\\leqq"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE + 5
  },
  {
    name: "GreaterOverEqual",
    latexTrigger: ["\\geqq"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE + 5,
    parse: "GreaterEqual"
  },
  {
    name: "Equal",
    latexTrigger: ["="],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    latexTrigger: ["*", "="],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE,
    parse: "StarEqual"
  },
  {
    name: "StarEqual",
    latexTrigger: ["\\star", "="],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    name: "PlusEqual",
    latexTrigger: ["+", "="],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    name: "MinusEqual",
    latexTrigger: ["-", "="],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    name: "SlashEqual",
    latexTrigger: ["/", "="],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    name: "EqualEqual",
    latexTrigger: ["=", "="],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    name: "EqualEqualEqual",
    latexTrigger: ["=", "=", "="],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE + 5
  },
  {
    name: "TildeFullEqual",
    // MathML: approximately equal to
    latexTrigger: ["\\cong"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    name: "NotTildeFullEqual",
    // MathML: approximately but not actually equal to
    latexTrigger: ["\\ncong"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    name: "Approx",
    // Note: Mathematica TildeTilde
    latexTrigger: ["\\approx"],
    kind: "infix",
    associativity: "right",
    precedence: 247
  },
  {
    name: "NotApprox",
    // Note: Mathematica TildeTilde
    latexTrigger: ["\\not", "\\approx"],
    kind: "infix",
    associativity: "right",
    precedence: 247
  },
  {
    name: "ApproxEqual",
    // Note: Mathematica TildeEqual, MathML: `asymptotically equal to`
    latexTrigger: ["\\approxeq"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    name: "NotApproxEqual",
    // Note: Mathematica NotTildeEqual
    latexTrigger: ["\\not", "\\approxeq"],
    kind: "infix",
    // Note: no LaTeX symbol for char U+2249
    associativity: "right",
    precedence: 250
  },
  {
    name: "NotEqual",
    latexTrigger: ["\\ne"],
    kind: "infix",
    associativity: "right",
    precedence: 255
  },
  {
    name: "Unequal",
    latexTrigger: ["!", "="],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
    // Note different precedence than \\ne per MathML
  },
  {
    name: "GreaterEqual",
    latexTrigger: ["\\ge"],
    kind: "infix",
    associativity: "right",
    precedence: 242
    // Note: different precedence than `>=` as per MathML
  },
  {
    latexTrigger: ["\\geq"],
    kind: "infix",
    associativity: "right",
    precedence: 242,
    // Note: different precedence than `>=` as per MathML
    parse: "GreaterEqual"
  },
  {
    latexTrigger: [">", "="],
    kind: "infix",
    associativity: "right",
    precedence: 243,
    parse: "GreaterEqual"
  },
  {
    latexTrigger: ["\\geqslant"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE + 5,
    // Note: different precedence than `>=` as per MathML
    parse: "GreaterEqual"
  },
  {
    name: "GreaterNotEqual",
    latexTrigger: ["\\gneqq"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    name: "NotGreaterNotEqual",
    latexTrigger: ["\\ngeqq"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    latexTrigger: [">"],
    kind: "infix",
    associativity: "right",
    precedence: 245,
    parse: "Greater"
  },
  {
    name: "Greater",
    latexTrigger: ["\\gt"],
    kind: "infix",
    associativity: "right",
    precedence: 245
  },
  {
    name: "NotGreater",
    latexTrigger: ["\\ngtr"],
    kind: "infix",
    associativity: "right",
    precedence: 244
  },
  {
    latexTrigger: ["\\not", ">"],
    kind: "infix",
    associativity: "right",
    precedence: 244,
    parse: "NotGreater"
  },
  {
    name: "RingEqual",
    latexTrigger: ["\\circeq"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    name: "TriangleEqual",
    // MathML: delta equal to
    latexTrigger: ["\\triangleq"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    name: "DotEqual",
    // MathML: approaches the limit
    latexTrigger: ["\\doteq"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE + 5
  },
  {
    name: "DotEqualDot",
    // MathML: Geometrically equal
    latexTrigger: ["\\doteqdot"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE + 5
  },
  {
    name: "FallingDotEqual",
    // MathML: approximately equal to or the image of
    latexTrigger: ["\\fallingdotseq"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE + 5
  },
  {
    name: "RisingDotEqual",
    // MathML: image of or approximately equal to
    latexTrigger: ["\\fallingdotseq"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE + 5
  },
  {
    name: "QuestionEqual",
    latexTrigger: ["\\questeq"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    name: "MuchLess",
    latexTrigger: ["\\ll"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    name: "MuchGreater",
    latexTrigger: ["\\gg"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    name: "Precedes",
    latexTrigger: ["\\prec"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    name: "Succeeds",
    latexTrigger: ["\\succ"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    name: "PrecedesEqual",
    latexTrigger: ["\\preccurlyeq"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    name: "SucceedsEqual",
    latexTrigger: ["\\curlyeqprec"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    name: "NotPrecedes",
    latexTrigger: ["\\nprec"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    name: "NotSucceeds",
    latexTrigger: ["\\nsucc"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE
  },
  {
    name: "Between",
    latexTrigger: ["\\between"],
    kind: "infix",
    associativity: "right",
    precedence: COMPARISON_PRECEDENCE + 5
  }
];

// src/compute-engine/latex-syntax/dictionary/definitions-linear-algebra.ts
var DEFINITIONS_LINEAR_ALGEBRA = [
  // The first argument is the matrix data.
  // The second, optional, argument are the delimiters.
  // The third, optional, argument is the column specification.
  {
    name: "Matrix",
    serialize: (serializer, expr) => {
      const rows = ops(op(expr, 1)) ?? [];
      return serializeTabular(
        serializer,
        rows,
        stringValue(op(expr, 2)),
        stringValue(op(expr, 3))
      );
    }
  },
  // Vector is a specialized collection to represent a column vector.
  {
    name: "Vector",
    serialize: (serializer, expr) => {
      const columns = ops(expr) ?? [];
      return serializeTabular(
        serializer,
        columns.map((column) => ["List", column]),
        stringValue(op(expr, 2)),
        stringValue(op(expr, 3))
      );
    }
  },
  {
    kind: "environment",
    identifierTrigger: "pmatrix",
    parse: (parser) => {
      const columns = parseColumnFormat(parser);
      const [head2, cells] = parseCells(parser);
      if (columns)
        return [head2, cells, { str: "()" }, { str: columns }];
      return [head2, cells];
    }
  },
  {
    kind: "environment",
    identifierTrigger: "bmatrix",
    parse: (parser) => {
      const columns = parseColumnFormat(parser);
      const [head2, cells] = parseCells(parser);
      if (columns)
        return [head2, cells, { str: "[]" }, { str: columns }];
      return [head2, cells, { str: "[]" }];
    }
  },
  {
    kind: "environment",
    identifierTrigger: "Bmatrix",
    parse: (parser) => {
      const columns = parseColumnFormat(parser);
      const [head2, cells] = parseCells(parser);
      if (columns)
        return [head2, cells, { str: "{}" }, { str: columns }];
      return [head2, cells, { str: "{}" }];
    }
  },
  {
    kind: "environment",
    identifierTrigger: "vmatrix",
    parse: (parser) => {
      const columns = parseColumnFormat(parser);
      const [head2, cells] = parseCells(parser);
      if (columns)
        return [head2, cells, { str: "||" }, { str: columns }];
      return [head2, cells, { str: "||" }];
    }
  },
  {
    kind: "environment",
    identifierTrigger: "Vmatrix",
    parse: (parser) => {
      const columns = parseColumnFormat(parser);
      const [head2, cells] = parseCells(parser);
      if (columns)
        return [head2, cells, { str: "\u2016\u2016" }, { str: columns }];
      return [head2, cells, { str: "\u2016\u2016" }];
    }
  },
  {
    kind: "environment",
    identifierTrigger: "smallmatrix",
    parse: (parser) => {
      const columns = parseColumnFormat(parser);
      const [head2, cells] = parseCells(parser);
      if (columns)
        return [head2, cells, { str: "()" }, { str: columns }];
      return [head2, cells];
    }
  },
  {
    kind: "environment",
    identifierTrigger: "array",
    parse: (parser) => {
      const columns = parseColumnFormat(parser, false);
      const [head2, cells] = parseCells(parser);
      if (columns)
        return [head2, cells, { str: ".." }, { str: columns }];
      return [head2, cells, { str: ".." }];
    }
  },
  {
    kind: "environment",
    identifierTrigger: "matrix",
    parse: (parser) => {
      const columns = parseColumnFormat(parser);
      const [head2, cells] = parseCells(parser);
      if (columns)
        return [head2, cells, { str: ".." }, { str: columns }];
      return [head2, cells, { str: ".." }];
    }
  },
  {
    kind: "environment",
    identifierTrigger: "matrix*",
    parse: (parser) => {
      const columns = parseColumnFormat(parser);
      const [head2, cells] = parseCells(parser);
      if (columns)
        return [head2, cells, { str: ".." }, { str: columns }];
      return [head2, cells, { str: ".." }];
    }
  },
  {
    name: "ConjugateTranspose",
    kind: "postfix",
    latexTrigger: ["^", "\\star"]
  },
  {
    kind: "postfix",
    latexTrigger: ["^", "\\H"],
    parse: "ConjugateTranspose"
  },
  {
    kind: "postfix",
    latexTrigger: ["^", "\\dagger"],
    parse: (_parser, lhs) => {
      return ["ConjugateTranspose", lhs];
    }
  },
  {
    kind: "postfix",
    latexTrigger: ["^", "\\ast"],
    parse: (_parser, lhs) => {
      return ["ConjugateTranspose", lhs];
    }
  },
  {
    kind: "postfix",
    latexTrigger: ["^", "\\top"],
    parse: (parser, lhs) => {
      return ["Transpose", lhs];
    }
  },
  {
    kind: "postfix",
    latexTrigger: ["^", "\\intercal"],
    parse: (parser, lhs) => {
      return ["Transpose", lhs];
    }
  },
  {
    name: "Transpose",
    kind: "postfix",
    latexTrigger: ["^", "T"]
  },
  {
    name: "PseudoInverse",
    kind: "postfix",
    latexTrigger: ["^", "+"]
  },
  {
    name: "Trace",
    kind: "function",
    identifierTrigger: "tr"
  },
  {
    name: "Determinant",
    kind: "function",
    identifierTrigger: "det"
  }
];
function parseCells(parser) {
  const tabular = parser.parseTabular();
  if (!tabular)
    return ["", null];
  return [
    "Matrix",
    ["List", ...tabular.map((row) => ["List", ...row])]
  ];
}
function parseColumnFormat(parser, optional = true) {
  const colFormat = parser.parseStringGroup(optional)?.trim();
  if (!colFormat)
    return "";
  let result = "";
  for (const c of colFormat) {
    if (c === "c")
      result += "=";
    if (c === "l")
      result += "<";
    if (c === "r")
      result += ">";
    if (c === "|")
      result += "|";
    if (c === ":")
      result += ":";
  }
  return result;
}
function serializeTabular(serializer, rows, delims, colSpec) {
  delims ?? (delims = "()");
  let [open, close] = ["", ""];
  if (typeof delims === "string" && delims.length === 2)
    [open, close] = delims;
  let columns = "";
  if (colSpec) {
    for (const c of colSpec) {
      if (c === "<")
        columns += "l";
      else if (c === ">")
        columns += "r";
      else if (c === "=")
        columns += "c";
      else if (c === "|")
        columns += "|";
      else if (c === ":")
        columns += ":";
    }
  }
  const serializedRows = [];
  for (const row of rows ?? []) {
    const cells = [];
    for (const cell of ops(row) ?? [])
      cells.push(serializer.serialize(cell));
    serializedRows.push(cells.join(" & "));
  }
  const tabular = serializedRows.join("\\\\\n");
  const optColumns = columns.length > 0 ? `[${columns}]` : "";
  if (open === "(" && close === ")")
    return joinLatex([
      "\\begin{pmatrix}",
      optColumns,
      tabular,
      "\\end{pmatrix}"
    ]);
  if (open === "[" && close === "]")
    return joinLatex([
      "\\begin{bmatrix}",
      optColumns,
      tabular,
      "\\end{bmatrix}"
    ]);
  if (open === "{" && close === "}")
    return joinLatex([
      "\\begin{Bmatrix}",
      optColumns,
      tabular,
      "\\end{Bmatrix}"
    ]);
  if (open === "|" && close === "|")
    return joinLatex([
      "\\begin{vmatrix}",
      optColumns,
      tabular,
      "\\end{vmatrix}"
    ]);
  if (open === "\u2016" && close === "\u2016")
    return joinLatex([
      "\\begin{Vmatrix}",
      optColumns,
      tabular,
      "\\end{Vmatrix}"
    ]);
  if (open === "{" && close === ".")
    return joinLatex(["\\begin{dcases}", optColumns, tabular, "\\end{dcases}"]);
  if (open === "." && close === "}")
    return joinLatex(["\\begin{rcases}", optColumns, tabular, "\\end{rcases}"]);
  if (columns || open !== "." || close !== ".") {
    return joinLatex([
      "\\left",
      DELIMITERS_SHORTHAND[open] ?? open,
      "\\begin{array}",
      `{${columns}}`,
      tabular,
      "\\end{array}",
      "\\right",
      DELIMITERS_SHORTHAND[close] ?? close
    ]);
  }
  return joinLatex(["\\begin{matrix}", tabular, "\\end{matrix}"]);
}

// src/compute-engine/latex-syntax/dictionary/definitions-logic.ts
var DEFINITIONS_LOGIC = [
  // Constants
  {
    name: "True",
    kind: "symbol",
    latexTrigger: ["\\top"]
    // ⊤ U+22A4
  },
  {
    kind: "symbol",
    latexTrigger: "\\mathrm{True}",
    parse: "True"
  },
  {
    kind: "symbol",
    latexTrigger: "\\operator{True}",
    parse: "True"
  },
  {
    kind: "symbol",
    latexTrigger: "\\mathsf{T}",
    parse: "True"
  },
  {
    name: "False",
    kind: "symbol",
    latexTrigger: ["\\bot"]
    // ⊥ U+22A5
  },
  {
    kind: "symbol",
    latexTrigger: "\\operator{False}",
    parse: "False"
  },
  {
    kind: "symbol",
    latexTrigger: "\\mathsf{F}",
    parse: "False"
  },
  // Operators
  {
    name: "And",
    kind: "infix",
    latexTrigger: ["\\land"],
    precedence: 317
    // serialize: '\\land',
  },
  { kind: "infix", latexTrigger: ["\\wedge"], parse: "And", precedence: 317 },
  { kind: "infix", latexTrigger: "\\&", parse: "And", precedence: 317 },
  {
    kind: "infix",
    latexTrigger: "\\operatorname{and}",
    parse: "And",
    precedence: 317
  },
  {
    name: "Or",
    kind: "infix",
    latexTrigger: ["\\lor"],
    precedence: 310
  },
  { kind: "infix", latexTrigger: ["\\vee"], parse: "Or", precedence: 310 },
  { kind: "infix", latexTrigger: "\\parallel", parse: "Or", precedence: 310 },
  {
    kind: "infix",
    latexTrigger: "\\operatorname{or}",
    parse: "Or",
    precedence: 310
  },
  {
    name: "Xor",
    kind: "infix",
    latexTrigger: ["\\veebar"],
    precedence: 315
  },
  // Possible alt: \oplus ⊕ U+2295
  {
    name: "Not",
    kind: "prefix",
    latexTrigger: ["\\lnot"],
    precedence: 880
  },
  {
    name: "Nand",
    kind: "infix",
    latexTrigger: ["\\barwedge"],
    precedence: 315
    // serialize: '\\mid',
  },
  {
    name: "Nor",
    kind: "infix",
    latexTrigger: ["\u22BD"],
    // bar vee
    precedence: 315
    // serialize: '\\downarrow',
  },
  // Functions
  {
    kind: "function",
    identifierTrigger: "and",
    parse: "And"
  },
  {
    kind: "function",
    identifierTrigger: "or",
    parse: "Or"
  },
  {
    kind: "function",
    identifierTrigger: "not",
    parse: "Not"
  },
  // Relations
  {
    name: "Implies",
    kind: "infix",
    precedence: 220,
    associativity: "right",
    latexTrigger: ["\\implies"],
    serialize: "\\implies"
  },
  {
    latexTrigger: ["\\Rightarrow"],
    kind: "infix",
    precedence: 220,
    associativity: "right",
    parse: "Implies"
  },
  {
    name: "Equivalent",
    // MathML: identical to, Mathematica: Congruent
    latexTrigger: ["\\iff"],
    kind: "infix",
    associativity: "right",
    precedence: 219
  },
  {
    latexTrigger: ["\\Leftrightarrow"],
    kind: "infix",
    associativity: "right",
    precedence: 219,
    parse: "Equivalent"
  },
  {
    latexTrigger: ["\\equiv"],
    kind: "infix",
    associativity: "right",
    precedence: 219,
    parse: (parser, lhs, terminator) => {
      const rhs = parser.parseExpression({ ...terminator, minPrec: 219 });
      const index = parser.index;
      const modulus = parser.parseExpression({ ...terminator, minPrec: 219 });
      if (modulus && head(modulus) === "Mod")
        return ["Congruent", lhs, rhs, missingIfEmpty(op(modulus, 1))];
      parser.index = index;
      return ["Equivalent", lhs, missingIfEmpty(rhs)];
    }
  },
  {
    name: "Proves",
    kind: "infix",
    latexTrigger: ["\\vdash"],
    precedence: 220,
    associativity: "right",
    serialize: "\\vdash"
  },
  {
    name: "Entails",
    kind: "infix",
    latexTrigger: ["\\vDash"],
    precedence: 220,
    associativity: "right",
    serialize: "\\vDash"
  },
  {
    name: "Satisfies",
    kind: "infix",
    latexTrigger: ["\\models"],
    precedence: 220,
    associativity: "right",
    serialize: "\\models"
  }
];

// src/compute-engine/latex-syntax/dictionary/definitions-other.ts
function parseSingleArg(cmd) {
  return (parser) => {
    const arg = parser.parseGroup();
    return arg === null ? [cmd] : [cmd, arg];
  };
}
var DEFINITIONS_OTHERS = [
  {
    name: "Overscript",
    latexTrigger: ["\\overset"],
    kind: "infix",
    precedence: 700
    // @todo: not in MathML
  },
  {
    name: "Underscript",
    latexTrigger: ["\\underset"],
    kind: "infix",
    precedence: 700
    // @todo: not in MathML
  },
  {
    name: "Increment",
    latexTrigger: ["+", "+"],
    kind: "postfix",
    precedence: 880
  },
  {
    name: "Decrement",
    latexTrigger: ["-", "-"],
    kind: "postfix",
    precedence: 880
  },
  {
    name: "PreIncrement",
    latexTrigger: ["+", "+"],
    kind: "prefix",
    precedence: 880
  },
  {
    name: "PreDecrement",
    latexTrigger: ["-", "-"],
    kind: "prefix",
    precedence: 880
  },
  {
    name: "Ring",
    // Aka 'Composition', i.e. function composition
    latexTrigger: ["\\circ"],
    kind: "infix",
    precedence: 265
    // @todo: MathML is 950
    // @todo: check lhs and rhs are functions
  },
  {
    name: "StringJoin",
    // @todo From Mathematica...?
    latexTrigger: ["\\lt", "\\gt"],
    kind: "infix",
    precedence: 780
  },
  {
    name: "Starstar",
    latexTrigger: ["\\star", "\\star"],
    kind: "infix",
    precedence: 780
  },
  {
    // Partial derivative using a variation of the Euler notation: `∂_xf(x)`
    // (the Euler notation uses `D_1f(x)` where "1" is for the first variable
    // For the Leibniz notation see 'Divide' that handles `∂f/∂x`
    name: "PartialDerivative",
    // PartialDerivative(expr, {lists of vars}, degree)
    latexTrigger: ["\\partial"],
    kind: "prefix",
    parse: (parser) => {
      let done = false;
      let sup = "Nothing";
      let sub2 = "Nothing";
      while (!done) {
        parser.skipSpace();
        if (parser.match("_")) {
          sub2 = parser.parseGroup() ?? parser.parseToken();
        } else if (parser.match("^")) {
          sup = parser.parseGroup() ?? parser.parseToken();
        } else {
          done = true;
        }
      }
      const seq = getSequence(sub2);
      if (seq)
        sub2 = ["List", ...seq];
      if (sub2 === null || sup === null)
        return null;
      let rhs = parser.parseGroup() ?? "Nothing";
      if (rhs !== "Nothing" && !isEmptySequence(rhs)) {
        const args = parser.parseArguments() ?? ["Nothing"];
        rhs = [rhs, ...args];
      }
      return ["PartialDerivative", rhs, sub2, sup];
    },
    serialize: (serializer, expr) => {
      let result = "\\partial";
      const fn = op(expr, 1);
      const vars = op(expr, 2);
      const degree = op(expr, 3);
      if (vars !== null && vars !== "Nothing") {
        if (head(vars) === "List") {
          result += "_{" + serializer.serialize(["Sequence", ...ops(vars) ?? []]) + "}";
        } else {
          result += "_{" + serializer.serialize(vars) + "}";
        }
      }
      if (degree !== null && degree !== "Nothing")
        result += "^{" + serializer.serialize(degree) + "}";
      if (fn !== null && fn !== "Nothing")
        result += serializer.serialize(fn);
      return result;
    },
    precedence: 740
  },
  {
    name: "OverBar",
    latexTrigger: ["\\overline"],
    parse: parseSingleArg("OverBar")
  },
  {
    name: "UnderBar",
    latexTrigger: ["\\underline"],
    parse: parseSingleArg("UnderBar")
  },
  {
    name: "OverVector",
    latexTrigger: ["\\vec"],
    parse: parseSingleArg("OverVector")
  },
  {
    name: "OverTilde",
    latexTrigger: ["\\tilde"],
    parse: parseSingleArg("OverTilde")
  },
  {
    name: "OverHat",
    latexTrigger: ["\\hat"],
    parse: parseSingleArg("OverHat")
  },
  {
    name: "OverRightArrow",
    latexTrigger: ["\\overrightarrow"],
    parse: parseSingleArg("OverRightArrow")
  },
  {
    name: "OverLeftArrow",
    latexTrigger: ["\\overleftarrow"],
    parse: parseSingleArg("OverLeftArrow")
  },
  {
    name: "OverRightDoubleArrow",
    latexTrigger: ["\\Overrightarrow"],
    parse: parseSingleArg("OverRightDoubleArrow")
  },
  {
    name: "OverLeftHarpoon",
    latexTrigger: ["\\overleftharpoon"],
    parse: parseSingleArg("OverLeftHarpoon")
  },
  {
    name: "OverRightHarpoon",
    latexTrigger: ["\\overrightharpoon"],
    parse: parseSingleArg("OverRightHarpoon")
  },
  {
    name: "OverLeftRightArrow",
    latexTrigger: ["\\overleftrightarrow"],
    parse: parseSingleArg("OverLeftRightArrow")
  },
  {
    name: "OverBrace",
    latexTrigger: ["\\overbrace"],
    parse: parseSingleArg("OverBrace")
  },
  {
    name: "OverLineSegment",
    latexTrigger: ["\\overlinesegment"],
    parse: parseSingleArg("OverLineSegment")
  },
  {
    name: "OverGroup",
    latexTrigger: ["\\overgroup"],
    parse: parseSingleArg("OverGroup")
  },
  {
    latexTrigger: ["\\displaystyle"],
    parse: () => ["Sequence"]
  },
  {
    latexTrigger: ["\\textstyle"],
    parse: () => ["Sequence"]
  },
  {
    latexTrigger: ["\\scriptstyle"],
    parse: () => ["Sequence"]
  },
  {
    latexTrigger: ["\\scriptscriptstyle"],
    parse: () => ["Sequence"]
  },
  {
    latexTrigger: ["\\tiny"],
    parse: () => ["Sequence"]
  },
  {
    latexTrigger: ["\\scriptsize"],
    parse: () => ["Sequence"]
  },
  {
    latexTrigger: ["\\footnotesize"],
    parse: () => ["Sequence"]
  },
  {
    latexTrigger: ["\\small"],
    parse: () => ["Sequence"]
  },
  {
    latexTrigger: ["\\normalsize"],
    parse: () => ["Sequence"]
  },
  {
    latexTrigger: ["\\large"],
    parse: () => ["Sequence"]
  },
  {
    latexTrigger: ["\\Large"],
    parse: () => ["Sequence"]
  },
  {
    latexTrigger: ["\\LARGE"],
    parse: () => ["Sequence"]
  },
  {
    latexTrigger: ["\\huge"],
    parse: () => ["Sequence"]
  },
  {
    latexTrigger: ["\\Huge"],
    parse: () => ["Sequence"]
  },
  {
    name: "Style",
    serialize: (serializer, expr) => {
      let result = serializer.serialize(op(expr, 1));
      const dict = dictionary(op(expr, 2));
      if (dict === null)
        return result;
      if (stringValue(dict.display) === "block")
        result = joinLatex(["{\\displaystyle", result, "}"]);
      else if (stringValue(dict.display) === "inline")
        result = joinLatex(["{\\textstyle", result, "}"]);
      else if (stringValue(dict.display) === "script")
        result = joinLatex(["{\\scriptstyle", result, "}"]);
      else if (stringValue(dict.display) === "scriptscript")
        result = joinLatex(["{\\scriptscriptstyle", result, "}"]);
      const v = machineValue(dict.size);
      if (v !== null && v >= 1 && v <= 10) {
        result = joinLatex([
          "{",
          {
            1: "\\tiny",
            2: "\\scriptsize",
            3: "\\footnotesize",
            4: "\\small",
            5: "\\normalsize",
            6: "\\large",
            7: "\\Large",
            8: "\\LARGE",
            9: "\\huge",
            10: "\\Huge"
          }[v],
          result,
          "}"
        ]);
      }
      return result;
    }
  },
  {
    latexTrigger: ["\\!"],
    parse: () => ["HorizontalSpacing", -3]
  },
  {
    latexTrigger: ["\\ "],
    parse: () => ["HorizontalSpacing", 6]
  },
  {
    latexTrigger: ["\\:"],
    parse: () => ["HorizontalSpacing", 4]
  },
  {
    latexTrigger: ["\\enskip"],
    parse: () => ["HorizontalSpacing", 9]
  },
  {
    latexTrigger: ["\\quad"],
    parse: () => ["HorizontalSpacing", 18]
  },
  {
    latexTrigger: ["\\qquad"],
    parse: () => ["HorizontalSpacing", 36]
  },
  {
    latexTrigger: ["\\,"],
    parse: () => ["HorizontalSpacing", 3]
  },
  {
    latexTrigger: ["\\;"],
    parse: () => ["HorizontalSpacing", 5]
  },
  {
    latexTrigger: ["\\enspace"],
    parse: () => ["HorizontalSpacing", 9]
  },
  {
    name: "HorizontalSpacing",
    // The `HorizontalSpacing` function has two forms
    // `["HorizontalSpacing", number]` -> indicate a space of mu units
    // `["HorizontalSpacing", expr, 'op'|'bin'|rel]` -> indicate a spacing around and expression, i.e. `\mathbin{x}`, etc...
    serialize: (serializer, expr) => {
      if (op(expr, 2)) {
        return serializer.serialize(op(expr, 1));
      }
      const v = machineValue(op(expr, 1));
      if (v === null)
        return "";
      return {
        "-3": "\\!",
        6: "\\ ",
        3: "\\,",
        4: "\\:",
        5: "\\;",
        9: "\\enspace",
        18: "\\quad",
        36: "\\qquad"
      }[v] ?? "";
    }
  }
  // if (
  //   [
  //     '\\!',
  //     '\\:',
  //     '\\enskip',
  //     '\\quad',
  //     '\\,',
  //     '\\;',
  //     '\\enspace',
  //     '\\qquad',
  //     '\\selectfont',
  //   ].includes(token)
  // ) {
  //   return 'skip';
  // }
  // {
  //     name: '',
  //     trigger: '\\mathring',
  // },
  // {
  //     name: '',
  //     trigger: '\\check',
  // },
];

// src/compute-engine/latex-syntax/dictionary/definitions-trigonometry.ts
function parseTrig(op3) {
  return (parser, until) => {
    const head2 = {
      "\\arcsin": "Arcsin",
      "\\arccos": "Arccos",
      "\\arctan": "Arctan",
      "\\arctg": "Arctan",
      "\\arcctg": "Arctan",
      "\\arcsec": "Arcsec",
      "\\arccsc": " Arccsc",
      "\\arsinh": "Arsinh",
      "\\arcosh": "Arcosh",
      "\\artanh": "Artanh",
      "\\arcsech": "Arcsech",
      "\\arccsch": "Arcsch",
      // '\\arg',
      "\\ch": "Cosh",
      "\\cos": "Cos",
      "\\cosec": "Csc",
      "\\cosh": "Csch",
      "\\cot": "Cot",
      "\\cotg": "Cot",
      "\\coth": "Coth",
      "\\csc": "Csc",
      "\\ctg": "Cot",
      "\\cth": "Coth",
      "\\sec": "Sec",
      "\\sin": "Sin",
      "\\sinh": "Sinh",
      "\\sh": "Sinh",
      "\\tan": "Tan",
      "\\tanh": "Tanh",
      "\\tg": "Tan",
      "\\th": "Tanh"
    }[op3 ?? ""] ?? op3 ?? "";
    if (parser.atTerminator(until))
      return head2;
    let fn = head2;
    do {
      const pf = parser.parsePostfixOperator(fn, until);
      if (pf === null)
        break;
      fn = pf;
    } while (true);
    let sup = null;
    if (parser.match("^"))
      sup = parser.parseGroup() ?? parser.parseToken();
    const args = parser.parseArguments("implicit", until);
    const appliedFn = args === null ? fn : typeof fn === "string" ? [fn, ...args] : ["Apply", fn, ...args];
    return sup === null ? appliedFn : ["Power", appliedFn, sup];
  };
}
var DEFINITIONS_TRIGONOMETRY = [
  {
    name: "Arcsin",
    latexTrigger: ["\\arcsin"],
    parse: parseTrig("Arcsin")
  },
  {
    name: "Arccos",
    latexTrigger: ["\\arccos"],
    parse: parseTrig("Arccos")
  },
  {
    name: "Arctan",
    latexTrigger: ["\\arctan"],
    parse: parseTrig("Arctan")
  },
  {
    latexTrigger: ["\\arctg"],
    parse: parseTrig("Arctan")
  },
  {
    name: "Arccot",
    latexTrigger: ["\\arcctg"],
    parse: parseTrig("Arccot")
  },
  {
    name: "Arcsec",
    latexTrigger: "arcsec",
    parse: parseTrig("Arcsec")
  },
  {
    name: "Arccsc",
    latexTrigger: ["\\arccsc"],
    parse: parseTrig("Arccsc")
  },
  {
    name: "Arsinh",
    latexTrigger: ["\\arsinh"],
    parse: parseTrig("Arsinh")
  },
  {
    name: "Arcosh",
    latexTrigger: ["\\arcosh"],
    parse: parseTrig("Arcosh")
  },
  {
    name: "Artanh",
    latexTrigger: ["\\artanh"],
    parse: parseTrig("Artanh")
  },
  {
    name: "Arsech",
    latexTrigger: ["\\arsech"],
    parse: parseTrig("Arsech")
  },
  {
    name: "Arcsch",
    latexTrigger: ["\\arcsch"],
    parse: parseTrig("Arcsch")
  },
  {
    // Rusian hyperbolic cosine
    latexTrigger: ["\\ch"],
    parse: parseTrig("Cosh")
  },
  {
    name: "Cosec",
    latexTrigger: ["\\cosec"],
    parse: parseTrig("Cosec")
  },
  {
    name: "Cosh",
    latexTrigger: ["\\cosh"],
    parse: parseTrig("Cosh")
  },
  {
    name: "Cot",
    latexTrigger: ["\\cot"],
    parse: parseTrig("Cot")
  },
  {
    latexTrigger: ["\\cotg"],
    parse: parseTrig("Cot")
  },
  {
    name: "Coth",
    latexTrigger: ["\\coth"],
    parse: parseTrig("Coth")
  },
  {
    name: "Csc",
    latexTrigger: ["\\csc"],
    parse: parseTrig("Csc")
  },
  {
    // Rusian cotangent
    latexTrigger: ["\\ctg"],
    parse: parseTrig("Cot")
  },
  {
    latexTrigger: ["\\cth"],
    parse: parseTrig("Cotanh")
  },
  {
    name: "Sec",
    latexTrigger: ["\\sec"],
    parse: parseTrig("Sec")
  },
  {
    name: "Sinh",
    latexTrigger: ["\\sinh"],
    parse: parseTrig("Sinh")
  },
  {
    latexTrigger: ["\\sh"],
    parse: parseTrig("Sinh")
  },
  {
    name: "Tan",
    latexTrigger: ["\\tan"],
    parse: parseTrig("Tan")
  },
  {
    latexTrigger: ["\\tg"],
    parse: parseTrig("Tan")
  },
  {
    name: "Tanh",
    latexTrigger: ["\\tanh"],
    parse: parseTrig("Tanh")
  },
  {
    latexTrigger: ["\\th"],
    parse: parseTrig("Tanh")
  },
  {
    name: "Cos",
    latexTrigger: ["\\cos"],
    parse: parseTrig("Cos")
  },
  {
    name: "Sin",
    latexTrigger: ["\\sin"],
    parse: parseTrig("Sin")
  }
];

// src/compute-engine/latex-syntax/dictionary/definitions-sets.ts
var DEFINITIONS_SETS = [
  // Constants
  { name: "AlgebraicNumbers", latexTrigger: "\\bar\\Q" },
  { name: "ComplexNumbers", latexTrigger: ["\\C"] },
  { latexTrigger: "\\mathbb{C}", parse: "ComplexNumbers" },
  { name: "ImaginaryNumbers", latexTrigger: ["\\imaginaryI", "\\R"] },
  { name: "ExtendedComplexNumbers", latexTrigger: ["\\bar", "\\C"] },
  { name: "EmptySet", latexTrigger: ["\\emptyset"] },
  { latexTrigger: ["\\varnothing"], parse: "EmptySet" },
  // Parsing only
  { name: "Integers", latexTrigger: ["\\Z"] },
  { latexTrigger: "\\mathbb{Z}", parse: "Integers" },
  { name: "RationalNumbers", latexTrigger: ["\\Q"] },
  { name: "RealNumbers", latexTrigger: ["\\R"] },
  { latexTrigger: "\\mathbb{R}", parse: "RealNumbers" },
  { name: "ExtendedRealNumbers", latexTrigger: ["\\bar", "\\R"] },
  { name: "TranscendentalNumberss", latexTrigger: "\\R-\\bar\\Q" },
  { latexTrigger: "\\R\\backslash\\bar\\Q", parse: "TranscendentalNumbers" },
  // Real numbers < 0
  { name: "NegativeNumbers", latexTrigger: "\\R^-" },
  { latexTrigger: "\\R^{-}", parse: "NegativeNumbers" },
  { latexTrigger: "\\R_-", parse: "NegativeNumbers" },
  { latexTrigger: "\\R_{-}", parse: "NegativeNumbers" },
  { latexTrigger: "\\R^{\\lt}", parse: "NegativeNumbers" },
  // Real numbers > 0
  { name: "PositiveNumbers", latexTrigger: "\\R^+" },
  { latexTrigger: "\\R^{+}", parse: "PositiveNumbers" },
  { latexTrigger: "\\R_+", parse: "PositiveNumbers" },
  { latexTrigger: "\\R_{+}", parse: "PositiveNumbers" },
  { latexTrigger: "\\R^{\\gt}", parse: "PositiveNumbers" },
  // Real numbers <= 0
  { name: "NonPositiveNumbers", latexTrigger: "\\R^{0-}" },
  { latexTrigger: "\\R^{-0}", parse: "NonPositiveNumbers" },
  { latexTrigger: "\\R^{\\leq}", parse: "NonPositiveNumbers" },
  // Integers < 0
  { name: "NegativeIntegers", latexTrigger: "\\Z^-" },
  { latexTrigger: "\\Z^-", parse: "NegativeIntegers" },
  { latexTrigger: "\\Z^{-}", parse: "NegativeIntegers" },
  { latexTrigger: "\\Z_-", parse: "NegativeIntegers" },
  { latexTrigger: "\\Z_{-}", parse: "NegativeIntegers" },
  { latexTrigger: "\\Z^{\\lt}", parse: "NegativeIntegers" },
  // Integers >  0
  { name: "PositiveIntegers", latexTrigger: "\\Z^+" },
  { latexTrigger: "\\Z^{+}", parse: "PositiveIntegers" },
  { latexTrigger: "\\Z_+", parse: "PositiveIntegers" },
  { latexTrigger: "\\Z_{+}", parse: "PositiveIntegers" },
  { latexTrigger: "\\Z^{\\gt}", parse: "PositiveIntegers" },
  { latexTrigger: "\\Z^{\\gt0}", parse: "PositiveIntegers" },
  { latexTrigger: "\\N^+", parse: "PositiveIntegers" },
  { latexTrigger: "\\N^{+}", parse: "PositiveIntegers" },
  { latexTrigger: "\\N^*", parse: "PositiveIntegers" },
  { latexTrigger: "\\N^{*}", parse: "PositiveIntegers" },
  { latexTrigger: "\\N^\\star", parse: "PositiveIntegers" },
  { latexTrigger: "\\N^{\\star}", parse: "PositiveIntegers" },
  { latexTrigger: "\\N_1", parse: "PositiveIntegers" },
  { latexTrigger: "\\N_{1}", parse: "PositiveIntegers" },
  // https://mathvault.ca/hub/higher-math/math-symbols/algebra-symbols/
  // Integers >=  0
  { name: "NonNegativeIntegers", latexTrigger: ["\\N"] },
  { latexTrigger: "\\Z^{+0}", parse: "NonNegativeIntegers" },
  { latexTrigger: "\\Z^{\\geq}", parse: "NonNegativeIntegers" },
  { latexTrigger: "\\Z^{\\geq0}", parse: "NonNegativeIntegers" },
  { latexTrigger: "\\Z^{0+}", parse: "NonNegativeIntegers" },
  { latexTrigger: "\\mathbb{N}", parse: "NonNegativeIntegers" },
  { latexTrigger: "\\N_0", parse: "NonNegativeIntegers" },
  { latexTrigger: "\\N_{0}", parse: "NonNegativeIntegers" },
  //
  // Set Expressions
  //
  // @todo: could also have a `CartesianPower` function with a number `rhs`
  {
    name: "CartesianProduct",
    latexTrigger: ["\\times"],
    kind: "infix",
    associativity: "right",
    // Caution: cartesian product is not associative
    precedence: 390,
    // Same as Multiply?
    parse: (parser, lhs, until) => {
      if (390 < until.minPrec)
        return null;
      const ce = parser.computeEngine;
      if (!ce || !ce.box(lhs).domain.isCompatible("Sets"))
        return null;
      const index = parser.index;
      const rhs = parser.parseExpression({ ...until, minPrec: 390 });
      if (rhs === null || ce.box(lhs).domain.isCompatible("Sets") !== true) {
        parser.index = index;
        return null;
      }
      return ["CartesianProduct", lhs, rhs];
    }
  },
  {
    latexTrigger: ["^", "\\complement"],
    kind: "postfix",
    parse: (_parser, lhs) => {
      return ["Complement", lhs];
    }
    // precedence: 240,
    // @todo: serialize for the multiple argument case
  },
  {
    name: "Complement",
    latexTrigger: ["^", "<{>", "\\complement", "<}>"],
    kind: "postfix"
    // precedence: 240,
    // @todo: serialize for the multiple argument case
  },
  {
    name: "Intersection",
    latexTrigger: ["\\cap"],
    kind: "infix",
    precedence: 350
  },
  {
    name: "Interval",
    // @todo: parse opening '[' or ']' or '('
    serialize: serializeSet
  },
  {
    name: "Multiple",
    // @todo: parse
    serialize: serializeSet
  },
  {
    name: "Union",
    latexTrigger: ["\\cup"],
    kind: "infix",
    precedence: 350
  },
  {
    name: "Set",
    kind: "matchfix",
    openTrigger: "{",
    closeTrigger: "}",
    precedence: 20,
    // @todo: the set syntax can also include conditions...
    parse: (_parser, body) => {
      if (body === null || isEmptySequence(body))
        return "EmptySet";
      if (head(body) == "Delimiter" && stringValue(op(body, 2)) === ",") {
        body = op(body, 1);
      }
      if (head(body) !== "Sequence")
        return ["Set", body];
      return ["Set", ...ops(body) ?? []];
    },
    serialize: (serializer, expr) => {
      return joinLatex([
        "\\lbrace",
        (ops(expr) ?? []).map((x) => serializer.serialize(x)).join(", "),
        "\\rbrace"
      ]);
    }
  },
  {
    name: "SetMinus",
    latexTrigger: ["\\setminus"],
    kind: "infix",
    precedence: 650
  },
  {
    name: "SymmetricDifference",
    latexTrigger: ["\\triangle"],
    // or \\ominus
    kind: "infix",
    // @todo: parser could check that lhs and rhs are sets
    precedence: COMPARISON_PRECEDENCE
  },
  // Predicates/Relations
  {
    latexTrigger: ["\\ni"],
    kind: "infix",
    associativity: "right",
    precedence: 160,
    // As per MathML, lower precedence
    parse: (parser, lhs, terminator) => {
      const rhs = parser.parseExpression(terminator);
      return rhs === null ? null : ["Element", rhs, lhs];
    }
  },
  {
    name: "Element",
    latexTrigger: ["\\in"],
    kind: "infix",
    precedence: 240
  },
  {
    name: "NotElement",
    latexTrigger: ["\\notin"],
    kind: "infix",
    precedence: 240
  },
  {
    name: "NotSubset",
    latexTrigger: ["\\nsubset"],
    kind: "infix",
    associativity: "right",
    precedence: 240
  },
  {
    name: "NotSuperset",
    latexTrigger: ["\\nsupset"],
    kind: "infix",
    associativity: "right",
    precedence: 240
  },
  {
    name: "NotSubsetNotEqual",
    latexTrigger: ["\\nsubseteq"],
    kind: "infix",
    associativity: "right",
    precedence: 240
  },
  {
    name: "NotSupersetNotEqual",
    latexTrigger: ["\\nsupseteq"],
    kind: "infix",
    associativity: "right",
    precedence: 240
  },
  {
    name: "SquareSubset",
    // MathML: square image of
    latexTrigger: ["\\sqsubset"],
    kind: "infix",
    associativity: "right",
    precedence: 265
  },
  {
    name: "SquareSubsetEqual",
    // MathML: square image of or equal to
    latexTrigger: ["\\sqsubseteq"],
    kind: "infix",
    associativity: "right",
    precedence: 265
  },
  {
    name: "SquareSuperset",
    // MathML: square original of
    latexTrigger: ["\\sqsupset"],
    kind: "infix",
    associativity: "right",
    precedence: 265
  },
  {
    name: "SquareSupersetEqual",
    // MathML: square original of or equal
    latexTrigger: ["\\sqsupseteq"],
    kind: "infix",
    associativity: "right",
    precedence: 265
  },
  {
    name: "Subset",
    latexTrigger: ["\\subset"],
    kind: "infix",
    associativity: "right",
    precedence: 240
  },
  {
    latexTrigger: ["\\subsetneq"],
    kind: "infix",
    associativity: "right",
    precedence: 240,
    parse: "Subset"
  },
  {
    latexTrigger: ["\\varsubsetneqq"],
    kind: "infix",
    associativity: "right",
    precedence: 240,
    parse: "Subset"
  },
  {
    name: "SubsetEqual",
    latexTrigger: ["\\subseteq"],
    kind: "infix",
    precedence: 240
  },
  {
    name: "Superset",
    latexTrigger: ["\\supset"],
    kind: "infix",
    associativity: "right",
    precedence: 240
  },
  {
    latexTrigger: ["\\supsetneq"],
    kind: "infix",
    associativity: "right",
    precedence: 240,
    parse: "Superset"
  },
  {
    latexTrigger: ["\\varsupsetneq"],
    kind: "infix",
    associativity: "right",
    precedence: 240,
    parse: "Superset"
  },
  {
    name: "SupersetEqual",
    latexTrigger: ["\\supseteq"],
    kind: "infix",
    associativity: "right",
    precedence: 240
  }
];
function serializeSet(serializer, expr) {
  if (expr === null)
    return "";
  const h = head(expr);
  if (h === null)
    return "";
  if (h === "Set") {
    if (nops(expr) === 0)
      return "\\emptyset";
    if (nops(expr) === 2 && head(op(expr, 2)) === "Condition") {
      return joinLatex([
        "\\left\\lbrace",
        serializer.serialize(op(expr, 1)),
        "\\middle\\mid",
        serializer.serialize(op(expr, 2)),
        "\\right\\rbrace"
      ]);
    }
    return joinLatex([
      "\\left\\lbrace",
      ...(ops(expr) ?? []).map((x) => serializer.serialize(x) + " ,"),
      "\\right\\rbrace"
    ]);
  }
  if (h === "Multiple") {
  }
  if (h === "Range") {
    return joinLatex([
      "\\mathopen\\lbrack",
      serializer.serialize(op(expr, 1)),
      ", ",
      serializer.serialize(op(expr, 2)),
      "\\mathclose\\rbrack"
    ]);
  }
  if (h === "Interval") {
    let op12 = op(expr, 1);
    let op22 = op(expr, 2);
    let openLeft = false;
    let openRight = false;
    if (head(op12) === "Open") {
      op12 = op(op12, 1);
      openLeft = true;
    }
    if (head(op22) === "Open") {
      op22 = op(op22, 1);
      openRight = true;
    }
    return joinLatex([
      `\\mathopen${openLeft ? "\\rbrack" : "\\lbrack"}`,
      serializer.serialize(op12),
      ", ",
      serializer.serialize(op22),
      `\\mathclose${openRight ? "\\lbrack" : "\\rbrack"}`
    ]);
  }
  const style = serializer.numericSetStyle(expr, serializer.level);
  if (style === "compact") {
  } else if (style === "interval") {
  } else if (style === "regular") {
  } else if (style === "set-builder") {
  }
  return "";
}

// src/compute-engine/latex-syntax/dictionary/definitions-calculus.ts
function parseIntegral(command, n = 1) {
  return (parser) => {
    parser.skipSpace();
    let sup = null;
    let sub2 = null;
    while (!(sub2 !== null && sup !== null) && (parser.peek === "_" || parser.peek === "^")) {
      if (parser.match("_"))
        sub2 = parser.parseGroup() ?? parser.parseToken();
      else if (parser.match("^")) {
        sup = parser.parseGroup() ?? parser.parseToken();
      }
      parser.skipSpace();
    }
    if (sub2 === "Nothing" || isEmptySequence(sub2))
      sub2 = null;
    if (sup === "Nothing" || isEmptySequence(sup))
      sup = null;
    let [fn, index] = parseIntegralBody(parser, n);
    if (fn && !index) {
      if (head(fn) === "Add" || head(fn) === "Subtract") {
        const newOp = [];
        const rest = [];
        for (const op3 of ops(fn) ?? []) {
          if (index)
            rest.push(op3);
          else {
            let op22;
            [op22, index] = parseIntegralBodyExpression(op3);
            newOp.push(op22 ?? op3);
          }
        }
        if (index !== null && rest.length > 0) {
          return [
            "Add",
            makeIntegral(
              parser,
              command,
              ["Add", ...newOp],
              [{ index, sub: sub2, sup }]
            ),
            ...rest
          ];
        }
      } else if (head(fn) === "Divide") {
        let altNumerator;
        [altNumerator, index] = parseIntegralBodyExpression(op(fn, 1));
        if (altNumerator !== null && index !== null) {
          fn = ["Divide", altNumerator, op(fn, 2)];
        }
      }
    }
    return makeIntegral(parser, command, fn, [{ index, sub: sub2, sup }]);
  };
}
function makeIntegral(parser, command, fn, ranges) {
  if (fn && ranges.length === 0)
    return [command, fn];
  fn ?? (fn = "Nothing");
  if (parser.computeEngine) {
    const ce = parser.computeEngine;
    let hasIndex = false;
    const idTable = {};
    for (const r of ranges)
      if (r.index) {
        hasIndex = true;
        idTable[r.index] = { domain: "ExtendedRealNumbers" };
      }
    if (hasIndex)
      ce.pushScope().declare(idTable);
    fn = ce.box(fn).json;
    if (hasIndex)
      ce.popScope();
  }
  return [command, fn, ...ranges.map((r) => makeRange(r))];
}
function makeRange(range) {
  const heldIndex = range.index ? ["Hold", range.index] : "Nothing";
  if (range.sup !== null)
    return ["Tuple", heldIndex, range.sub ?? "Nothing", range.sup];
  if (range.sub !== null)
    return ["Tuple", heldIndex, range.sub];
  return heldIndex;
}
function parseIntegralBody(parser, n = 1) {
  const start = parser.index;
  let found = false;
  let fn = parser.parseExpression({
    minPrec: 266,
    condition: () => {
      if (parser.matchAll(["\\mathrm", "<{>", "d", "<}>"]))
        found = true;
      else if (parser.matchAll(["\\operatorname", "<{>", "d", "<}>"]))
        found = true;
      return found;
    }
  });
  if (!found) {
    parser.index = start;
    fn = parser.parseExpression({
      minPrec: 266,
      condition: () => {
        if (parser.match("d"))
          found = true;
        return found;
      }
    });
  }
  if (fn && !found)
    return parseIntegralBodyExpression(fn);
  const indexes2 = parseIndexes(parser, n);
  return [fn, indexes2[0] ?? null];
}
function parseIndexes(parser, _n = 1) {
  parser.skipSpace();
  const result = [];
  const index = symbol(parser.parseSymbol());
  if (index === null)
    return [];
  result.push(index);
  return result;
}
function parseIntegralBodyExpression(expr) {
  const h = head(expr);
  const op12 = op(expr, 1);
  if (!op12)
    return [expr, null];
  if (h === "Sequence" && nops(expr) === 1) {
    return parseIntegralBodyExpression(op12);
  }
  if (h === "Multiply" || h === "InvisibleOperator") {
    const args = ops(expr);
    if (args && args.length > 1) {
      const sym = symbol(args[args.length - 2]);
      if (sym === "d" || sym === "d_upright") {
        if (args.length === 2)
          return [null, symbol(args[1])];
        if (args.length === 3)
          return [args[0], symbol(args[2])];
        return [
          ["Multiply", ...args.slice(0, -2)],
          symbol(args[args.length - 1])
        ];
      }
      const [fn2, index] = parseIntegralBodyExpression(args[args.length - 1]);
      if (fn2)
        return [["Multiply", ...args.slice(0, -1), fn2], index];
    }
  } else if (h === "Delimiter") {
    const [fn2, index] = parseIntegralBodyExpression(op12);
    if (index) {
      if (!fn2)
        return [null, index];
      return [["Delimiter", ["Sequence", fn2], ...ops(expr).slice(1)], index];
    }
  } else if (h === "Add") {
    const args = ops(expr);
    if (args && args.length > 0) {
      const [fn2, index] = parseIntegralBodyExpression(args[args.length - 1]);
      if (index) {
        if (fn2)
          return [["Add", ...args.slice(0, -1), fn2], index];
        if (args.length > 2)
          return [["Add", ...args.slice(0, -1)], index];
        if (args.length > 2)
          return [args[0], index];
      }
    }
  } else if (h === "Negate") {
    const [fn2, index] = parseIntegralBodyExpression(op12);
    if (index)
      return [fn2 ? ["Negate", fn2] : null, index];
  } else if (h === "Divide") {
    const [fn2, index] = parseIntegralBodyExpression(op12);
    if (index)
      return [["Divide", fn2 ?? 1, op(expr, 2)], index];
  } else {
    const args = ops(expr);
    if (args?.length === 1) {
      const [arg2, index] = parseIntegralBodyExpression(args[0]);
      if (index)
        return [[head(expr), arg2], index];
    }
  }
  return [expr, null];
}
function serializeIntegral(command) {
  return (serializer, expr) => {
    if (!op(expr, 1))
      return command;
    let arg = op(expr, 2);
    const h = head(arg);
    let indexExpr = null;
    if (h === "Tuple" || h === "Triple" || h === "Pair" || h === "Single") {
      indexExpr = op(arg, 1);
    } else if (h === "Hold") {
      indexExpr = op(arg, 1);
    } else {
      indexExpr = op(arg, 1) ?? "x";
      arg = null;
    }
    if (head(indexExpr) === "Hold")
      indexExpr = op(indexExpr, 1);
    const index = indexExpr !== null ? symbol(indexExpr) : null;
    let fn = op(expr, 1);
    if (head(fn) === "Lambda" && op(fn, 1))
      fn = subs(op(fn, 1), { _: index ?? "x", _1: index ?? "x" });
    if (!arg) {
      if (!index || index === "Nothing")
        return joinLatex([command, "\\!", serializer.serialize(fn)]);
      return joinLatex([
        command,
        "\\!",
        serializer.serialize(fn),
        "\\,\\operatorname{d}",
        serializer.serialize(index)
      ]);
    }
    const subSymbol = op(arg, 2) ? symbol(op(arg, 2)) : null;
    let sub2 = arg && subSymbol !== "Nothing" ? serializer.serialize(op(arg, 2)) : "";
    if (sub2.length > 0)
      sub2 = `_{${sub2}}`;
    let sup = "";
    const supSymbol = op(arg, 3) ? symbol(op(arg, 3)) : null;
    if (op(arg, 3) && supSymbol !== "Nothing")
      sup = `^{${serializer.serialize(op(arg, 3))}}`;
    return joinLatex([
      command,
      sup,
      sub2,
      "\\!",
      serializer.serialize(fn),
      ...index && symbol(index) !== "Nothing" ? ["\\,\\operatorname{d}", serializer.serialize(index)] : []
    ]);
  };
}
var DEFINITIONS_CALCULUS = [
  {
    kind: "expression",
    name: "Integrate",
    latexTrigger: ["\\int"],
    parse: parseIntegral("Integrate"),
    serialize: serializeIntegral("\\int")
  },
  {
    kind: "expression",
    latexTrigger: ["\\iint"],
    parse: parseIntegral("Integrate", 2)
  },
  {
    kind: "expression",
    latexTrigger: ["\\iiint"],
    parse: parseIntegral("Integrate", 3)
  },
  {
    kind: "expression",
    name: "CircularIntegrate",
    latexTrigger: ["\\oint"],
    parse: parseIntegral("CircularIntegrate"),
    serialize: serializeIntegral("\\oint")
  },
  {
    kind: "expression",
    latexTrigger: ["\\oiint"],
    parse: parseIntegral("CircularIntegrate", 2)
  },
  {
    kind: "expression",
    latexTrigger: ["\\oiiint"],
    parse: parseIntegral("CircularIntegrate", 3)
  }
];

// src/compute-engine/latex-syntax/dictionary/definitions-symbols.ts
var SYMBOLS = [
  // Greek
  ["alpha", "\\alpha", 945],
  ["beta", "\\beta", 946],
  ["gamma", "\\gamma", 947],
  ["delta", "\\delta", 948],
  ["epsilon", "\\epsilon", 949],
  ["epsilonSymbol", "\\varepsilon", 1013],
  // GREEK LUNATE EPSILON SYMBOL
  ["zeta", "\\zeta", 950],
  ["eta", "\\eta", 951],
  ["theta", "\\theta", 952],
  ["thetaSymbol", "\\vartheta", 977],
  // Unicode GREEK THETA SYMBOL
  ["iota", "\\iota", 953],
  ["kappa", "\\kappa", 954],
  ["kappaSymbol", "\\varkappa", 1008],
  // GREEK KAPPA SYMBOL
  ["lambda", "\\lambda", 955],
  ["mu", "\\mu", 956],
  ["nu", "\\nu", 957],
  ["xi", "\\xi", 958],
  ["omicron", "\\omicron", 959],
  ["pi", "\\pi", 960],
  ["piSymbol", "\\varpi", 982],
  // GREEK PI SYMBOL
  ["rho", "\\rho", 961],
  ["rhoSymbol", "\\varrho", 1009],
  // GREEK RHO SYMBOL
  ["sigma", "\\sigma", 963],
  ["finalSigma", "\\varsigma", 962],
  //GREEK SMALL LETTER FINAL SIGMA
  ["tau", "\\tau", 964],
  ["phi", "\\phi", 981],
  // Note GREEK PHI SYMBOL, but common usage in math
  ["phiLetter", "\\varphi", 966],
  ["upsilon", "\\upsilon", 965],
  ["chi", "\\chi", 967],
  ["psi", "\\psi", 968],
  ["omega", "\\omega", 969],
  ["Alpha", "\\Alpha", 913],
  ["Beta", "\\Beta", 914],
  ["Gamma", "\\Gamma", 915],
  ["Delta", "\\Delta", 916],
  ["Epsilon", "\\Epsilon", 917],
  ["Zeta", "\\Zeta", 918],
  ["Eta", "\\Eta", 919],
  ["Theta", "\\Theta", 920],
  ["Iota", "\\Iota", 921],
  ["Kappa", "\\Kappa", 922],
  ["Lambda", "\\Lambda", 923],
  ["Mu", "\\Mu", 924],
  ["Nu", "\\Nu", 925],
  ["Xi", "\\Xi", 926],
  ["Omicron", "\\Omicron", 927],
  // ['Pi', '\\Pi', 0x03a0],
  ["Rho", "\\Rho", 929],
  ["Sigma", "\\Sigma", 931],
  ["Tau", "\\Tau", 932],
  ["Phi", "\\Phi", 934],
  ["Upsilon", "\\Upsilon", 933],
  ["Chi", "\\Chi", 935],
  ["Psi", "\\Psi", 936],
  ["Omega", "\\Omega", 937],
  ["digamma", "\\digamma", 989],
  // Hebrew
  ["aleph", "\\aleph", 8501],
  // Unicode ALEF SYMBOL
  ["bet", "\\beth", 8502],
  ["gimel", "\\gimel", 8503],
  ["dalet", "\\daleth", 8504],
  // Letter-like
  ["ell", "\\ell", 8499],
  // Unicode SCRIPT SMALL L
  ["turnedCapitalF", "\\Finv", 8498],
  // Unicode TURNED CAPITAL F'
  ["turnedCapitalG", "\\Game", 8513],
  // TURNED SANS-SERIF CAPITAL G
  ["weierstrass", "\\wp", 8472],
  // Unicode SCRIPT CAPITAL P
  ["eth", "\\eth", 240],
  ["invertedOhm", "\\mho", 8487],
  // Unicode INVERTED OHM SIGN
  ["hBar", "\\hbar", 295],
  // Unicode LATIN SMALL LETTER H WITH STROKE
  ["hSlash", "\\hslash", 8463],
  // Unicode PLANCK CONSTANT OVER TWO PI
  // Symbols
  ["blackClubSuit", "\\clubsuit", 9827],
  ["whiteHeartSuit", "\\heartsuit", 9825],
  ["blackSpadeSuit", "\\spadesuit", 9824],
  ["whiteDiamondSuit", "\\diamondsuit", 9826],
  ["sharp", "\\sharp", 9839],
  ["flat", "\\flat", 9837],
  ["natural", "\\natural", 9838]
];
var DEFINITIONS_SYMBOLS = [
  ...SYMBOLS.map(([symbol2, latex, _codepoint]) => {
    return {
      kind: "symbol",
      name: symbol2,
      latexTrigger: [latex],
      parse: symbol2
    };
  }),
  ...SYMBOLS.map(([symbol2, _latex, codepoint]) => {
    return {
      kind: "symbol",
      latexTrigger: [String.fromCodePoint(codepoint)],
      parse: symbol2
    };
  })
];

// src/compute-engine/latex-syntax/dictionary/definitions-complex.ts
var DEFINITIONS_COMPLEX = [
  {
    name: "Real",
    kind: "function",
    latexTrigger: ["\\Re"]
  },
  {
    name: "Imaginary",
    kind: "function",
    latexTrigger: ["\\Im"]
  },
  {
    name: "Argument",
    kind: "function",
    latexTrigger: ["\\arg"]
  },
  {
    name: "Conjugate",
    latexTrigger: ["^", "\\star"],
    kind: "postfix"
  }
];

// src/compute-engine/latex-syntax/dictionary/definitions-statistics.ts
var DEFINITIONS_STATISTICS = [
  {
    name: "Mean",
    kind: "function",
    identifierTrigger: "mean"
  },
  {
    name: "Median",
    kind: "function",
    identifierTrigger: "median"
  },
  {
    name: "StandarDeviation",
    kind: "function",
    identifierTrigger: "stddev"
  },
  {
    latexTrigger: ["\\bar"],
    kind: "expression",
    parse: (parser, _until) => {
      const expr = parser.parseGroup() ?? parser.parseToken();
      if (!expr || !symbol(expr))
        return null;
      return ["Mean", expr];
    }
  }
];

// src/compute-engine/latex-syntax/dictionary/definitions.ts
var DEFAULT_DELIMITER = {
  "(": "(",
  ")": ")",
  "[": "\\lbrack",
  "]": "\\rbrack",
  "{": "\\lbrace",
  "}": "\\rbrace",
  "<": "\\langle",
  ">": "\\rangle",
  "|": "\\vert",
  "||": "\\Vert",
  "\\lceil": "\\lceil",
  "\\lfloor": "\\lfloor",
  "\\rceil": "\\rceil",
  "\\rfloor": "\\rfloor"
};
function addEntry(result, entry, onError) {
  const indexedEntry = makeIndexedEntry(entry, onError);
  if (indexedEntry === null)
    return;
  const kind = "kind" in entry ? entry.kind : "expression";
  const latexTrigger = indexedEntry.latexTrigger;
  if (typeof latexTrigger === "string")
    result.lookahead = Math.max(result.lookahead, countTokens(latexTrigger));
  const tokensTrigger = tokenize(latexTrigger ?? "", []);
  if (tokensTrigger.length === 2 && /[_^]/.test(tokensTrigger[0]) && tokensTrigger[1] !== "<{>" && kind !== "function" && kind !== "environment" && kind !== "matchfix") {
    let parse = entry.parse;
    if (!parse && entry.name) {
      if (kind === "postfix" || kind === "prefix")
        parse = (_parser, expr) => [entry.name, expr];
      else
        parse = entry.name;
    }
    addEntry(
      result,
      {
        ...entry,
        kind,
        name: void 0,
        serialize: void 0,
        parse,
        latexTrigger: [tokensTrigger[0], "<{>", tokensTrigger[1], "<}>"]
      },
      onError
    );
  }
  result.defs.push(indexedEntry);
  if (indexedEntry.name !== void 0) {
    if (result.ids.has(indexedEntry.name)) {
      onError({
        severity: "warning",
        message: [
          "invalid-dictionary-entry",
          indexedEntry.name,
          "Duplicate definition. The name (MathJSON identifier) must be unique, but triggers can be shared by multiple definitions."
        ]
      });
    }
    result.ids.set(indexedEntry.name, indexedEntry);
  }
}
function indexLatexDictionary(dic, onError) {
  const result = {
    lookahead: 1,
    ids: /* @__PURE__ */ new Map(),
    defs: []
  };
  for (const entry of dic)
    addEntry(result, entry, onError);
  return result;
}
function makeIndexedEntry(entry, onError) {
  if (!isValidEntry(entry, onError))
    return null;
  const result = {
    kind: "kind" in entry ? entry.kind : "expression"
  };
  let tokensTrigger = null;
  if ("latexTrigger" in entry) {
    if (typeof entry.latexTrigger === "string")
      tokensTrigger = tokenize(entry.latexTrigger, []);
    else
      tokensTrigger = entry.latexTrigger;
  }
  let idTrigger = null;
  if ("identifierTrigger" in entry) {
    idTrigger = entry.identifierTrigger;
  }
  if (tokensTrigger !== null)
    result.latexTrigger = tokensToString(tokensTrigger);
  if (idTrigger !== null)
    result.identifierTrigger = idTrigger;
  if (entry.name) {
    result.name = entry.name;
    result.serialize = makeSerializeHandler(entry, tokensTrigger, idTrigger);
  }
  if (result.kind === "matchfix" && isMatchfixEntry(entry)) {
    result.openTrigger = entry.openTrigger;
    result.closeTrigger = entry.closeTrigger;
  }
  if (result.kind === "symbol" && isSymbolEntry(entry)) {
    result.precedence = entry.precedence ?? 1e4;
  }
  if ((result.kind === "prefix" || result.kind === "postfix") && (isPrefixEntry(entry) || isPostfixEntry(entry))) {
    if (tokensTrigger && (tokensTrigger[0] === "^" || tokensTrigger[0] === "_")) {
      result.precedence = 720;
      console.assert(
        entry.precedence === void 0,
        "'precedence' is fixed and cannot be modified with ^ and _ triggers"
      );
    } else
      result.precedence = entry.precedence ?? 1e4;
  }
  if (result.kind === "infix" && isInfixEntry(entry)) {
    console.assert(
      !tokensTrigger || tokensTrigger[0] !== "^" && tokensTrigger[0] !== "_" || !entry.associativity || entry.associativity === "non"
    );
    result.associativity = entry.associativity ?? "non";
    result.precedence = entry.precedence ?? 1e4;
  }
  const parse = makeParseHandler(entry, tokensTrigger, idTrigger);
  if (parse)
    result.parse = parse;
  return result;
}
function makeSerializeHandler(entry, latexTrigger, idTrigger) {
  if (typeof entry.serialize === "function")
    return entry.serialize;
  const kind = entry["kind"] ?? "expression";
  if (kind === "environment") {
    const envName = entry["identifierTrigger"] ?? entry.name ?? "unknown";
    return (serializer, expr) => joinLatex([
      `\\begin{${envName}}`,
      serializer.serialize(op(expr, 1)),
      `\\end{${envName}}`
    ]);
  }
  if (isMatchfixEntry(entry)) {
    const openDelim = typeof entry.openTrigger === "string" ? DEFAULT_DELIMITER[entry.openTrigger] : tokensToString(entry.openTrigger);
    const closeDelim = typeof entry.closeTrigger === "string" ? DEFAULT_DELIMITER[entry.closeTrigger] : tokensToString(entry.closeTrigger);
    return (serializer, expr) => joinLatex([openDelim, serializer.serialize(op(expr, 1)), closeDelim]);
  }
  let latex = entry.serialize;
  if (latex === void 0 && latexTrigger)
    latex = tokensToString(latexTrigger);
  if (latex) {
    if (kind === "postfix")
      return (serializer, expr) => joinLatex([serializer.serialize(op(expr, 1)), latex]);
    if (kind === "prefix")
      return (serializer, expr) => joinLatex([latex, serializer.serialize(op(expr, 1))]);
    if (kind === "infix") {
      return (serializer, expr) => joinLatex(
        (ops(expr) ?? []).flatMap(
          (val, i) => i < nops(expr) - 1 ? [serializer.serialize(val), latex] : [serializer.serialize(val)]
        )
      );
    }
    return (serializer, expr) => head(expr) ? joinLatex([latex, serializer.wrapArguments(expr)]) : latex;
  }
  const id = idTrigger ?? entry.name ?? "unknown";
  if (kind === "postfix")
    return (serializer, expr) => joinLatex([
      serializer.serialize(op(expr, 1)),
      serializer.serializeSymbol(id)
    ]);
  if (kind === "prefix")
    return (serializer, expr) => joinLatex([
      serializer.serializeSymbol(id),
      serializer.serialize(op(expr, 1))
    ]);
  if (kind === "infix")
    return (serializer, expr) => joinLatex([
      serializer.serialize(op(expr, 1)),
      serializer.serializeSymbol(id),
      serializer.serialize(op(expr, 2))
    ]);
  return (serializer, expr) => head(expr) ? joinLatex([
    serializer.serializeSymbol(id),
    serializer.wrapArguments(expr)
  ]) : serializer.serializeSymbol(id);
}
function makeParseHandler(entry, latexTrigger, idTrigger) {
  if ("parse" in entry && typeof entry.parse === "function")
    return entry.parse;
  const kind = "kind" in entry ? entry.kind : "expression";
  if (kind === "environment") {
    const envName = entry.parse ?? entry.name ?? idTrigger;
    if (envName)
      return (parser, _until) => {
        const array = parser.parseTabular();
        if (array === null)
          return null;
        return [envName, ["List", array.map((row) => ["List", ...row])]];
      };
  }
  if (kind === "function") {
    const fnName = entry.parse ?? entry.name ?? idTrigger;
    if (fnName)
      return (parser, until) => {
        const args = parser.parseArguments("enclosure", until);
        return args === null ? fnName : [fnName, ...args];
      };
  }
  if (kind === "symbol") {
    const symName = entry.parse ?? entry.name ?? idTrigger;
    if (symName)
      return (_parser, _terminator) => symName;
  }
  if (kind === "prefix") {
    const h = entry.parse ?? entry.name ?? idTrigger;
    if (h) {
      const prec = entry["precedence"] ?? 1e4;
      return (parser, until) => {
        const rhs = parser.parseExpression({
          ...until ?? [],
          minPrec: prec
        });
        return rhs === null ? null : [h, rhs];
      };
    }
  }
  if (kind === "postfix") {
    const h = entry.parse ?? entry.name;
    if (h)
      return (_parser, lhs) => lhs === null ? null : [h, lhs];
  }
  if (kind === "infix") {
    if (/[_^]/.test(latexTrigger?.[0] ?? "")) {
      const h2 = entry.name ?? entry.parse;
      return (_parser, arg) => [
        h2,
        missingIfEmpty(op(arg, 1)),
        missingIfEmpty(op(arg, 2))
      ];
    }
    const h = entry.parse ?? entry.name ?? idTrigger;
    const prec = entry["precedence"] ?? 1e4;
    const associativity = entry["associativity"] ?? "non";
    if (h)
      return (parser, lhs, until) => {
        if (lhs === null)
          return null;
        if (prec < until.minPrec)
          return null;
        const rhs = missingIfEmpty(
          parser.parseExpression({ ...until, minPrec: prec })
        );
        return typeof h === "string" ? applyAssociativeOperator(h, lhs, rhs, associativity) : [h, lhs, rhs];
      };
  }
  if (kind === "matchfix") {
    const h = entry.parse ?? entry.name;
    if (h)
      return (_parser, body) => {
        if (body === null || isEmptySequence(body))
          return null;
        return [h, body];
      };
  }
  if (kind === "expression") {
    const parseResult = entry.parse ?? entry.name ?? idTrigger;
    if (parseResult)
      return () => parseResult;
  }
  if ("parse" in entry) {
    const parseResult = entry.parse;
    return () => parseResult;
  }
  return void 0;
}
function isValidEntry(entry, onError) {
  let subject = entry.name ?? entry["latexTrigger"] ?? entry["identifierTrigger"] ?? entry["openTrigger"];
  if (!subject) {
    try {
      subject = JSON.stringify(entry);
    } catch (e) {
      subject = "???";
    }
  }
  if (Array.isArray(subject))
    subject = tokensToString(subject);
  if ("trigger" in entry) {
    onError({
      severity: "warning",
      message: [
        "invalid-dictionary-entry",
        subject,
        `The 'trigger' property is deprecated. Use 'latexTrigger' or 'identifierTrigger' instead`
      ]
    });
  }
  if ("kind" in entry && ![
    "expression",
    "symbol",
    "function",
    "infix",
    "postfix",
    "prefix",
    "matchfix",
    "environment"
  ].includes(entry.kind)) {
    onError({
      severity: "warning",
      message: [
        "invalid-dictionary-entry",
        subject,
        `The 'kind' property must be one of 'expression', 'symbol', 'function', 'infix', 'postfix', 'prefix', 'matchfix', 'environment'`
      ]
    });
  }
  if (entry.serialize !== void 0 && !entry.name) {
    onError({
      severity: "warning",
      message: [
        "invalid-dictionary-entry",
        subject,
        `A 'name' property must be provided if a 'serialize' handler is provided`
      ]
    });
    return false;
  }
  if ("identifierTrigger" in entry && (!("kind" in entry) || entry.kind !== "environment")) {
    if (typeof entry.identifierTrigger !== "string" || !isValidIdentifier(entry.identifierTrigger)) {
      onError({
        severity: "warning",
        message: [
          "invalid-dictionary-entry",
          subject,
          `The 'identifierTrigger' property must be a valid identifier`
        ]
      });
    }
  }
  if ("name" in entry) {
    if (typeof entry.name !== "string") {
      if (entry.name !== void 0)
        onError({
          severity: "warning",
          message: [
            "invalid-dictionary-entry",
            subject,
            `The 'name' property must be a string`
          ]
        });
    } else if (!isValidIdentifier(entry.name)) {
      onError({
        severity: "warning",
        message: [
          "invalid-dictionary-entry",
          entry.name,
          `The 'name' property must be a valid identifier`
        ]
      });
    }
  }
  if (isMatchfixEntry(entry)) {
    if ("latexTrigger" in entry || "identifierTrigger" in isPrefixEntry) {
      onError({
        severity: "warning",
        message: [
          "invalid-dictionary-entry",
          subject,
          `'matchfix' operators use a 'openTrigger' and 'closeTrigger' instead of a 'latexTrigger' or 'identifierTrigger'. `
        ]
      });
      return false;
    }
    if (!entry.openTrigger || !entry.closeTrigger) {
      onError({
        severity: "warning",
        message: [
          "invalid-dictionary-entry",
          subject,
          "Expected `openTrigger` and a `closeTrigger` for matchfix operator"
        ]
      });
      return false;
    }
    if (typeof entry.openTrigger !== typeof entry.closeTrigger) {
      onError({
        severity: "warning",
        message: [
          "invalid-dictionary-entry",
          subject,
          "Expected `openTrigger` and `closeTrigger` to both be strings or array of LatexToken"
        ]
      });
      return false;
    }
  }
  if (isInfixEntry(entry) || isPostfixEntry(entry) || isPrefixEntry(entry)) {
    if (Array.isArray(entry.latexTrigger) && (entry.latexTrigger[0] === "_" || entry.latexTrigger[0] === "^") || typeof entry.latexTrigger === "string" && (entry.latexTrigger.startsWith("^") || entry.latexTrigger.startsWith("_"))) {
      if (entry.precedence !== void 0 || entry["associativity"] !== void 0) {
        onError({
          severity: "warning",
          message: [
            "invalid-dictionary-entry",
            subject,
            `Unexpected "precedence" or "associativity" for superscript/subscript operator`
          ]
        });
        return false;
      }
    } else if (entry.precedence === void 0) {
      onError({
        severity: "warning",
        message: [
          "invalid-dictionary-entry",
          subject,
          `Expected a "precedence" for ${entry.kind} operator`
        ]
      });
      return false;
    }
  } else {
    if (entry["associativity"] !== void 0) {
      onError({
        severity: "warning",
        message: [
          "invalid-dictionary-entry",
          subject,
          'Unexpected "associativity" operator'
        ]
      });
      return false;
    }
  }
  if (!isMatchfixEntry(entry) && !isEnvironmentEntry(entry)) {
    if (!entry.latexTrigger && !entry.identifierTrigger && !entry.name) {
      onError({
        severity: "warning",
        message: [
          "invalid-dictionary-entry",
          subject,
          `Expected a 'name', a 'latexTrigger' or a 'identifierTrigger'`
        ]
      });
      return false;
    }
  }
  if (entry["parse"] === void 0 && entry.name === void 0) {
    onError({
      severity: "warning",
      message: [
        "invalid-dictionary-entry",
        subject,
        `Expected a 'parse' or 'name'`
      ]
    });
    return false;
  }
  return true;
}
var DEFAULT_LATEX_DICTIONARY = {
  "algebra": DEFINITIONS_ALGEBRA,
  "arithmetic": DEFINITIONS_ARITHMETIC,
  "calculus": DEFINITIONS_CALCULUS,
  "complex": DEFINITIONS_COMPLEX,
  "core": DEFINITIONS_CORE,
  "linear-algebra": DEFINITIONS_LINEAR_ALGEBRA,
  "logic": DEFINITIONS_LOGIC,
  "relop": DEFINITIONS_INEQUALITIES,
  "other": DEFINITIONS_OTHERS,
  "physics": [
    {
      name: "mu0",
      kind: "symbol",
      latexTrigger: "\\mu_0"
    }
  ],
  "sets": DEFINITIONS_SETS,
  "statistics": DEFINITIONS_STATISTICS,
  "symbols": DEFINITIONS_SYMBOLS,
  "trigonometry": DEFINITIONS_TRIGONOMETRY
};

// src/compute-engine/latex-syntax/parse-identifier.ts
var IDENTIFIER_PREFIX = {
  // Those are "grouping" prefix that also specify spacing
  // around the symbol. We ignore the spacing, though.
  "\\mathord": "",
  "\\mathop": "",
  "\\mathbin": "",
  "\\mathrel": "",
  "\\mathopen": "",
  "\\mathclose": "",
  "\\mathpunct": "",
  "\\mathinner": "",
  // This is the preferred way to specify an identifier
  // it defines both spacing and font. By default, identifiers
  // are wrapper with `\\operatorname{}`.
  "\\operatorname": "",
  // These styling commands are used to change the font of an identifier
  // They may be problematic, as adjacent identifiers may be merged
  // into a single identifier when used in editors, such a MathLive.
  // For example `\mathrm{speed}\mathrm{sound}` can be confused with `\mathrm{speedsound}`
  "\\mathrm": "_upright",
  "\\mathit": "_italic",
  "\\mathbf": "_bold",
  "\\mathscr": "_script",
  "\\mathcal": "_calligraphic",
  "\\mathfrak": "_fraktur",
  "\\mathsf": "_sansserif",
  "\\mathtt": "_monospace",
  "\\mathbb": "_doublestruck"
};
var IDENTIFIER_MODIFIER = {
  "\\mathring": "_ring",
  "\\hat": "_hat",
  "\\tilde": "_tilde",
  "\\vec": "_vec",
  "\\overline": "_bar",
  "\\underline": "_underbar",
  "\\dot": "_dot",
  "\\ddot": "_ddot",
  "\\dddot": "_dddot",
  "\\ddddot": "_ddddot",
  "\\acute": "_acute",
  "\\grave": "_grave",
  "\\breve": "_breve",
  "\\check": "_check"
};
function parseIdentifierToken(parser, options) {
  if (parser.atEnd)
    return null;
  const token = parser.peek;
  let special = {
    "\\_": "_",
    "\\#": "hash"
  }[token];
  if (!special && !options.toplevel) {
    special = {
      "+": "plus",
      "-": "minus",
      "\\plusmn": "pm",
      "\\pm": "pm",
      "\\ast": "ast",
      "\\dag": "dag",
      "\\ddag": "ddag",
      "\\bot": "bottom",
      "\\top": "top",
      "\\bullet": "bullet",
      "\\cir": "circle",
      "\\diamond": "diamond",
      "\\times": "times",
      "\\square": "square",
      "\\star": "star"
    }[token];
  }
  if (special) {
    parser.nextToken();
    return special;
  }
  const i = SYMBOLS.findIndex((x) => x[1] === token);
  if (i >= 0) {
    parser.nextToken();
    return SYMBOLS[i][0];
  }
  return parser.matchChar() ?? parser.nextToken();
}
function parseIdentifierBody(parser) {
  let id = matchPrefixedIdentifier(parser);
  const start = parser.index;
  const prefix = IDENTIFIER_MODIFIER[parser.peek] ?? null;
  if (prefix) {
    parser.nextToken();
    if (!parser.match("<{>")) {
      parser.index = start;
      return null;
    }
    const body = parseIdentifierBody(parser);
    if (body === null || !parser.match("<}>")) {
      parser.index = start;
      return null;
    }
    id = `${body}${prefix}`;
  }
  if (id === null) {
    id = "";
    while (!parser.atEnd) {
      const token = parser.peek;
      if (token === "<}>" || token === "_" || token === "^")
        break;
      const next = parseIdentifierToken(parser, { toplevel: false });
      if (next === null) {
        parser.index = start;
        return null;
      }
      id += next;
    }
    while (!parser.atEnd && /\d/.test(parser.peek))
      id += parser.nextToken();
  }
  while (!parser.atEnd) {
    if (parser.match("\\degree"))
      id += "_deg";
    else if (parser.matchAll(["^", "\\prime"]))
      id += "_prime";
    else if (parser.matchAll(["^", "<{>", "\\prime", "<}>"]))
      id += "_prime";
    else if (parser.matchAll(["^", "<{>", "\\doubleprime", "<}>"]))
      id += "_dprime";
    else if (parser.matchAll(["^", "<{>", "\\prime", "\\prime", "<}>"]))
      id += "_dprime";
    else
      break;
  }
  const sups = [];
  const subs2 = [];
  while (!parser.atEnd) {
    if (parser.match("_")) {
      const hasBrace = parser.match("<{>");
      const sub2 = parseIdentifierBody(parser);
      if (hasBrace && !parser.match("<}>") || sub2 === null) {
        parser.index = start;
        return null;
      }
      subs2.push(sub2);
    } else if (parser.match("^")) {
      const hasBrace = parser.match("<{>");
      const sup = parseIdentifierBody(parser);
      if (hasBrace && !parser.match("<}>") || sup === null) {
        parser.index = start;
        return null;
      }
      sups.push(sup);
    } else
      break;
  }
  if (sups.length > 0)
    id += "__" + sups.join("");
  if (subs2.length > 0)
    id += "_" + subs2.join("");
  return id;
}
function matchPrefixedIdentifier(parser) {
  const start = parser.index;
  const prefix = IDENTIFIER_PREFIX[parser.peek] ?? null;
  if (prefix === null)
    return null;
  parser.nextToken();
  if (parser.match("<{>")) {
    let body = "";
    const digit = {
      0: "zero",
      1: "one",
      2: "two",
      3: "three",
      4: "four",
      5: "five",
      6: "six",
      7: "seven",
      8: "eight",
      9: "nine"
    }[parser.peek] ?? "";
    if (digit) {
      body = digit;
      parser.nextToken();
    }
    body += parseIdentifierBody(parser);
    if (body === null || !parser.match("<}>")) {
      parser.index = start;
      return null;
    }
    if (prefix === "_upright" && body.length > 1)
      return body;
    return body + prefix;
  }
  parser.index = start;
  return null;
}
function parseInvalidIdentifier(parser) {
  const start = parser.index;
  const id = matchPrefixedIdentifier(parser);
  if (id === null || isValidIdentifier(id)) {
    parser.index = start;
    return null;
  }
  return parser.error(
    ["invalid-identifier", { str: validateIdentifier(id) }],
    start
  );
}
function parseIdentifier(parser) {
  if (/^[a-zA-Z]$/.test(parser.peek) || /^\p{XIDS}$/u.test(parser.peek))
    return parser.nextToken();
  const start = parser.index;
  let id = matchPrefixedIdentifier(parser);
  if (!id) {
    id = "";
    while (!parser.atEnd && ONLY_EMOJIS.test(id + parser.peek))
      id += parser.nextToken();
    if (!id)
      id = null;
  }
  id ?? (id = parseIdentifierToken(parser, { toplevel: true }));
  if (id) {
    id = id.normalize();
    if (isValidIdentifier(id))
      return id;
  }
  parser.index = start;
  return null;
}

// src/compute-engine/latex-syntax/parse.ts
var DELIMITER_SHORTHAND = {
  "(": ["\\lparen", "("],
  ")": ["\\rparen", ")"],
  "[": ["\\lbrack", "\\[", "["],
  "]": ["\\rbrack", "\\]", "]"],
  "<": ["<", "\\langle"],
  ">": [">", "\\rangle"],
  "{": ["\\{", "\\lbrace"],
  "}": ["\\}", "\\rbrace"],
  ":": [":", "\\colon"],
  "|": ["|", "\\|", "\\lvert", "\\rvert"],
  //special: '\lvert` when open, `\rvert` when close
  "||": ["||", "\\Vert", "\\lVert", "\\rVert"],
  // special: `\lVert` when open, `\rVert` when close
  "\\lfloor": ["\\lfloor"],
  "\\rfloor": ["\\rfloor"],
  "\\lceil": ["\\lceil"],
  "\\rceil": ["\\rceil"],
  "\\ulcorner": ["\\ulcorner"],
  "\\urcorner": ["\\urcorner"],
  "\\llcorner": ["\\llcorner"],
  "\\lrcorner": ["\\lrcorner"],
  "\\lgroup": ["\\lgroup"],
  "\\rgroup": ["\\rgroup"],
  "\\lmoustache": ["\\lmoustache"],
  "\\rmoustache": ["\\rmoustache"]
};
var OPEN_DELIMITER_PREFIX = {
  "\\left": "\\right",
  "\\bigl": "\\bigr",
  "\\Bigl": "\\Bigr",
  "\\biggl": "\\biggr",
  "\\Biggl": "\\Biggr",
  "\\big": "\\big",
  "\\Big": "\\Big",
  "\\bigg": "\\bigg",
  "\\Bigg": "\\Bigg"
};
var CLOSE_DELIMITER = {
  "(": ")",
  "[": "]",
  "|": "|",
  "\\{": "\\}",
  "\\[": "\\]",
  "\\lbrace": "\\rbrace",
  "\\lparen": "\\rparen",
  "\\langle": "\\rangle",
  "\\lfloor": "\\rfloor",
  "\\lceil": "\\rceil",
  "\\vert": "\\vert",
  "\\lvert": "\\rvert",
  "\\Vert": "\\Vert",
  "\\lVert": "\\rVert",
  "\\lbrack": "\\rbrack",
  "\\ulcorner": "\\urcorner",
  "\\llcorner": "\\lrcorner",
  "\\lgroup": "\\rgroup",
  "\\lmoustache": "\\rmoustache"
};
var DEFAULT_LATEX_NUMBER_OPTIONS = {
  precision: 6,
  // with machine numbers, up to 15 assuming 2^53 bits floating points
  positiveInfinity: "\\infty",
  negativeInfinity: "-\\infty",
  notANumber: "\\operatorname{NaN}",
  decimalMarker: ".",
  // Use `{,}` for comma as a decimal marker
  groupSeparator: "\\,",
  // for thousands, etc...
  exponentProduct: "\\cdot",
  beginExponentMarker: "10^{",
  // could be 'e'
  endExponentMarker: "}",
  notation: "auto",
  truncationMarker: "\\ldots",
  beginRepeatingDigits: "\\overline{",
  endRepeatingDigits: "}",
  imaginaryUnit: "\\imaginaryI",
  avoidExponentsInRange: [-7, 20]
};
var DEFAULT_PARSE_LATEX_OPTIONS = {
  skipSpace: true,
  parseArgumentsOfUnknownLatexCommands: true,
  parseNumbers: "auto",
  parseUnknownIdentifier: (id, parser) => parser.computeEngine?.lookupFunction(id) !== void 0 ? "function" : "symbol",
  preserveLatex: false
};
var _Parser = class {
  constructor(tokens, options, dictionary2, computeEngine) {
    this.index = 0;
    // A parsing boundary is a sequence of tokens that indicate that a
    // recursive parsing operation should stop.
    // In a traditional parser, keeping track of parsing boundaries would
    // not be necessary. However, because we attempt to deliver the best
    // interpretation of a partial expression, boundaries allow us to fail
    // parsing more locally.
    // For example, in `\begin{cases} | \end{cases}`, without boundary
    // detection, the parsing of `|` would attempt to goble up `\end{cases}`
    // which would be interpreted as an unexpected command, and the whole `\begin`
    // would be rejected as an unbalanced environment. With `\end{cases}` as a
    // boundary, the parsing of the `|` argument stops as soon as it encounters
    // the `\end{cases}` and can properly report an unexpected toke on the `|`
    // only while correctly interpreting the `\begin{cases}...\end{cases}`
    this._boundaries = [];
    // Those two properties are used to detect infinite loops while parsing
    this._lastPeek = "";
    this._peekCounter = 0;
    this._tokens = tokens;
    this.options = {
      ...DEFAULT_LATEX_NUMBER_OPTIONS,
      ...DEFAULT_PARSE_LATEX_OPTIONS,
      ...options
    };
    this._dictionary = dictionary2;
    this.computeEngine = computeEngine;
    this._positiveInfinityTokens = tokenize(this.options.positiveInfinity, []);
    this._negativeInfinityTokens = tokenize(this.options.negativeInfinity, []);
    this._notANumberTokens = tokenize(this.options.notANumber, []);
    this._decimalMarkerTokens = tokenize(this.options.decimalMarker, []);
    this._groupSeparatorTokens = tokenize(this.options.groupSeparator, []);
    this._exponentProductTokens = tokenize(this.options.exponentProduct, []);
    this._beginExponentMarkerTokens = tokenize(
      this.options.beginExponentMarker,
      []
    );
    this._endExponentMarkerTokens = tokenize(
      this.options.endExponentMarker,
      []
    );
    this._truncationMarkerTokens = tokenize(this.options.truncationMarker, []);
    this._beginRepeatingDigitsTokens = tokenize(
      this.options.beginRepeatingDigits,
      []
    );
    this._endRepeatingDigitsTokens = tokenize(
      this.options.endRepeatingDigits,
      []
    );
    this._imaginaryNumberTokens = tokenize(this.options.imaginaryUnit, []);
  }
  updateOptions(opt) {
    for (const [k, v] of Object.entries(opt))
      if (k in this.options) {
        this.options[k] = v;
        if (typeof v === "string") {
          if (k === "positiveInfinity")
            this._positiveInfinityTokens = tokenize(v, []);
          if (k === "negativeInfinity")
            this._negativeInfinityTokens = tokenize(v, []);
          if (k === "notANumber")
            this._notANumberTokens = tokenize(v, []);
          if (k === "decimalMarker")
            this._decimalMarkerTokens = tokenize(v, []);
          if (k === "groupSeparator")
            this._groupSeparatorTokens = tokenize(v, []);
          if (k === "exponentProduct")
            this._exponentProductTokens = tokenize(v, []);
          if (k === "beginExponentMarker")
            this._beginExponentMarkerTokens = tokenize(v, []);
          if (k === "endExponentMarker")
            this._endExponentMarkerTokens = tokenize(v, []);
          if (k === "truncationMarker")
            this._truncationMarkerTokens = tokenize(v, []);
          if (k === "beginRepeatingDigits")
            this._beginRepeatingDigitsTokens = tokenize(v, []);
          if (k === "endRepeatingDigits")
            this._endRepeatingDigitsTokens = tokenize(v, []);
          if (k === "imaginaryNumber")
            this._imaginaryNumberTokens = tokenize(v, []);
        }
      } else
        throw Error(`Unexpected option "${k}"`);
  }
  get atEnd() {
    return this.index >= this._tokens.length;
  }
  get peek() {
    const peek = this._tokens[this.index];
    if (peek === this._lastPeek)
      this._peekCounter += 1;
    else
      this._peekCounter = 0;
    if (this._peekCounter >= 1024) {
      const msg = `Infinite loop detected while parsing "${this.latex(
        0
      )}" at "${this._lastPeek}" (index ${this.index})`;
      console.error(msg);
      throw new Error(msg);
    }
    this._lastPeek = peek;
    return peek;
  }
  nextToken() {
    return this._tokens[this.index++];
  }
  /**
   * Return true if
   * - at end of the token stream
   * - the `t.condition` function returns true
   * Note: the `minPrec` condition is not checked. It should be checked separately.
   */
  atTerminator(t) {
    return this.atBoundary || ((t?.condition && t.condition(this)) ?? false);
  }
  /**
   * True if the current token matches any of the boundaries we are
   * waiting for.
   */
  get atBoundary() {
    if (this.atEnd)
      return true;
    const start = this.index;
    for (const boundary of this._boundaries) {
      if (this.matchAll(boundary.tokens)) {
        this.index = start;
        return true;
      }
    }
    return false;
  }
  addBoundary(boundary) {
    this._boundaries.push({ index: this.index, tokens: boundary });
  }
  removeBoundary() {
    this._boundaries.pop();
  }
  matchBoundary() {
    const currentBoundary = this._boundaries[this._boundaries.length - 1];
    const match2 = currentBoundary && this.matchAll(currentBoundary.tokens);
    if (match2)
      this._boundaries.pop();
    return match2;
  }
  boundaryError(msg) {
    const currentBoundary = this._boundaries[this._boundaries.length - 1];
    this._boundaries.pop();
    return this.error(msg, currentBoundary.index);
  }
  latex(start, end) {
    return tokensToString(this._tokens.slice(start, end));
  }
  latexAhead(n) {
    return this.latex(this.index, this.index + n);
  }
  // latexBefore(): string {
  //   return this.latex(0, this.index);
  // }
  // latexAfter(): string {
  //   return this.latex(this.index);
  // }
  /**
   * Return at most `this._dictionary.lookahead` LaTeX tokens.
   *
   * The index in the returned array correspond to the number of tokens.
   * Note that since a token can be longer than one char ('\\pi', but also
   * some astral plane unicode characters), the length of the string
   * does not match that index. However, knowing the index is important
   * to know by how many tokens to advance.
   *
   * For example:
   *
   * `[empty, '\\sqrt', '\\sqrt{', '\\sqrt{2', '\\sqrt{2}']`
   *
   */
  lookAhead() {
    let n = Math.min(
      this._dictionary.lookahead,
      this._tokens.length - this.index
    );
    if (n <= 0)
      return [];
    const result = [];
    while (n > 0)
      result.push([n, this.latexAhead(n--)]);
    return result;
  }
  peekDefinitions(kind) {
    if (this.atEnd)
      return [];
    const result = [];
    const defs = [...this.getDefs(kind)];
    for (const def of defs)
      if (def.latexTrigger === "")
        result.push([def, 0]);
    for (const [n, tokens] of this.lookAhead()) {
      for (const def of defs)
        if (def.latexTrigger === tokens)
          result.push([def, n]);
    }
    for (const def of defs) {
      if (def.identifierTrigger) {
        const n = parseComplexId(this, def.identifierTrigger);
        if (n > 0)
          result.push([def, n]);
      }
    }
    return result;
  }
  /** Skip strictly `<space>` tokens.
   * To also skip `{}` see `skipSpace()`.
   * To skip visual space (e.g. `\,`) see `skipVisualSpace()`.
   */
  skipSpaceTokens() {
    while (this.match("<space>")) {
    }
  }
  /** While parsing in math mode, skip applicable spaces, which includes `{}`.
   * Do not use to skip spaces while parsing a string. See  `skipSpaceTokens()`
   * instead.
   */
  skipSpace() {
    if (!this.atEnd && this.peek === "<{>") {
      const index = this.index;
      this.nextToken();
      while (this.match("<space>")) {
      }
      if (this.nextToken() === "<}>") {
        this.skipSpace();
        return true;
      }
      this.index = index;
    }
    if (!this.options.skipSpace)
      return false;
    let result = false;
    while (this.match("<space>"))
      result = true;
    if (result)
      this.skipSpace();
    return result;
  }
  skipVisualSpace() {
    if (!this.options.skipSpace)
      return;
    this.skipSpace();
    if ([
      "\\!",
      "\\,",
      "\\:",
      "\\;",
      "\\enskip",
      "\\enspace",
      "\\space",
      "\\quad",
      "\\qquad"
    ].includes(this.peek)) {
      this.nextToken();
      this.skipVisualSpace();
    }
    this.skipSpace();
  }
  match(token) {
    if (this._tokens[this.index] === token) {
      this.index++;
      return true;
    }
    return false;
  }
  matchAll(tokens) {
    console.assert(Array.isArray(tokens));
    if (tokens.length === 0)
      return false;
    let matched = true;
    let i = 0;
    do {
      matched = this._tokens[this.index + i] === tokens[i++];
    } while (matched && i < tokens.length);
    if (matched)
      this.index += i;
    return matched;
  }
  matchAny(tokens) {
    if (tokens.includes(this._tokens[this.index]))
      return this._tokens[this.index++];
    return "";
  }
  matchChar() {
    const index = this.index;
    let caretCount = 0;
    while (this.match("^"))
      caretCount += 1;
    if (caretCount < 2)
      this.index = index;
    if (caretCount >= 2) {
      let digits = "";
      let n = 0;
      while (n != caretCount) {
        const digit = this.matchAny([
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "a",
          "b",
          "c",
          "d",
          "e",
          "f"
        ]);
        if (!digit)
          break;
        digits += digit;
        n += 1;
      }
      if (digits.length === caretCount)
        return String.fromCodePoint(Number.parseInt(digits, 16));
    } else if (this.match("\\char")) {
      let codepoint = Math.floor(this.matchLatexNumber() ?? Number.NaN);
      if (!Number.isFinite(codepoint) || codepoint < 0 || codepoint > 1114111) {
        codepoint = 10067;
      }
      return String.fromCodePoint(codepoint);
    } else if (this.match("\\unicode")) {
      this.skipSpaceTokens();
      if (this.match("<{>")) {
        const codepoint = this.matchLatexNumber();
        if (this.match("<}>") && codepoint !== null && codepoint >= 0 && codepoint <= 1114111) {
          return String.fromCodePoint(codepoint);
        }
      } else {
        const codepoint = this.matchLatexNumber();
        if (codepoint !== null && codepoint >= 0 && codepoint <= 1114111)
          return String.fromCodePoint(codepoint);
      }
    }
    this.index = index;
    return null;
  }
  /**
   *
   * If the next token matches the open delimiter, set a boundary with
   * the close token and return true.
   *
   * Note this method handles "shorthand" delimiters, i.e. '(' will match both
   * `(` and `\lparen`. If a shorthand is used for the open delimiter, the
   * corresponding shorthand will be used for the close delimiter.
   * See DELIMITER_SHORTHAND.
   *
   * It also handles prefixes like `\left` and `\bigl`.
   *
   */
  matchDelimiter(open, close) {
    if (this.peek === "[")
      return false;
    if (Array.isArray(open)) {
      console.assert(Array.isArray(close));
      if (!this.matchAll(open))
        return false;
      this.addBoundary(close);
      return true;
    }
    console.assert(!Array.isArray(close));
    const start = this.index;
    const closePrefix = OPEN_DELIMITER_PREFIX[this.peek];
    if (closePrefix)
      this.nextToken();
    if (open === "||" && this.matchAll(["|", "|"])) {
      this.addBoundary(["|", "|"]);
      return true;
    }
    if (!(DELIMITER_SHORTHAND[open] ?? [open]).includes(this.peek)) {
      this.index = start;
      return false;
    }
    open = this.nextToken();
    close = CLOSE_DELIMITER[open] ?? close;
    this.addBoundary(closePrefix ? [closePrefix, close] : [close]);
    return true;
  }
  parseGroup() {
    const start = this.index;
    this.skipSpaceTokens();
    if (this.match("<{>")) {
      this.addBoundary(["<}>"]);
      const expr = this.parseExpression();
      this.skipSpace();
      if (this.matchBoundary())
        return expr ?? ["Sequence"];
      while (!this.matchBoundary() && !this.atEnd)
        this.nextToken();
      if (head(expr) === "Error")
        return expr;
      const err = this.error("expected-closing-delimiter", start);
      return expr ? ["InvisibleOperator", expr, err] : err;
    }
    this.index = start;
    return null;
  }
  // Some LaTeX commands (but not all) can accept an argument without braces,
  // for example `^` , `\sqrt` or `\frac`.
  // This argument will usually be a single token, but can be a sequence of
  // tokens (e.g. `\sqrt\frac12` or `\sqrt\operatorname{speed}`).
  parseToken() {
    const excluding = [
      ...'!"#$%&(),/;:?@[]\\`|~'.split(""),
      "\\left",
      "\\bigl"
    ];
    if (excluding.includes(this.peek))
      return null;
    if (/^[0-9]$/.test(this.peek))
      return parseInt(this.nextToken());
    const result = this.parseGenericExpression() ?? this.parseSymbol();
    if (!result)
      return null;
    return result;
  }
  parseOptionalGroup() {
    const index = this.index;
    this.skipSpaceTokens();
    if (this.match("[")) {
      this.addBoundary(["]"]);
      const expr = this.parseExpression();
      this.skipSpace();
      if (this.matchBoundary())
        return expr;
      return this.boundaryError("expected-closing-delimiter");
    }
    this.index = index;
    return null;
  }
  /**
   * Parse an expression in a tabular format, where rows are separated by `\\`
   * and columns by `&`.
   *
   * Return rows of sparse columns: empty rows are indicated with `Nothing`,
   * and empty cells are also indicated with `Nothing`.
   */
  parseTabular() {
    const result = [];
    let row = [];
    let expr = null;
    while (!this.atBoundary) {
      this.skipSpace();
      if (this.match("&")) {
        row.push(expr ?? "Nothing");
        expr = null;
      } else if (this.match("\\\\") || this.match("\\cr")) {
        this.skipSpace();
        this.parseOptionalGroup();
        if (expr !== null)
          row.push(expr);
        result.push(row);
        row = [];
        expr = null;
      } else {
        const cell = [];
        let peek = this.peek;
        while (peek !== "&" && peek !== "\\\\" && peek !== "\\cr" && !this.atBoundary) {
          expr = this.parseExpression({
            minPrec: 0,
            condition: (p) => {
              const peek2 = p.peek;
              return peek2 === "&" || peek2 === "\\\\" || peek2 === "\\cr";
            }
          });
          if (expr)
            cell.push(expr);
          else {
            cell.push(["Error", ["'unexpected-token'", peek]]);
            this.nextToken();
          }
          this.skipSpace();
          peek = this.peek;
        }
        if (cell.length > 1)
          expr = ["Sequence", ...cell];
        else
          expr = cell[0] ?? "Nothing";
      }
    }
    if (expr !== null)
      row.push(expr);
    if (row.length > 0)
      result.push(row);
    return result;
  }
  /** Parse a group as a a string, for example for `\operatorname` or `\begin` */
  parseStringGroup(optional) {
    if (optional === void 0)
      optional = false;
    const start = this.index;
    while (this.match("<space>")) {
    }
    if (this.match(optional ? "[" : "<{>")) {
      this.addBoundary([optional ? "]" : "<}>"]);
      const arg = this.parseStringGroupContent();
      if (this.matchBoundary())
        return arg;
      this.removeBoundary();
    }
    this.index = start;
    return null;
  }
  /** Parse an environment: `\begin{env}...\end{end}`
   */
  parseEnvironment(until) {
    const index = this.index;
    if (!this.match("\\begin"))
      return null;
    const name = this.parseStringGroup()?.trim();
    if (!name)
      return this.error("expected-environment-name", index);
    this.addBoundary(["\\end", "<{>", ...name.split(""), "<}>"]);
    for (const def of this.getDefs("environment"))
      if (def.identifierTrigger === name) {
        const expr = def.parse(this, until);
        this.skipSpace();
        if (!this.matchBoundary())
          return this.boundaryError("unbalanced-environment");
        if (expr !== null)
          return this.decorate(expr, index);
        this.index = index;
        return null;
      }
    this.parseTabular();
    this.skipSpace();
    if (!this.matchBoundary())
      return this.boundaryError("unbalanced-environment");
    return this.error(["unknown-environment", { str: name }], index);
  }
  /** If the next token matches a `+` or `-` sign, return it and advance the index.
   * Otherwise return `''` and do not advance */
  parseOptionalSign() {
    let isNegative = !!this.matchAny(["-", "\u2212"]);
    while (this.matchAny(["+", "\uFE62"]) || this.skipSpace())
      if (this.matchAny(["-", "\u2212"]))
        isNegative = !isNegative;
    return isNegative ? "-" : "+";
  }
  parseDecimalDigits(options) {
    options ?? (options = {});
    options.withGrouping ?? (options.withGrouping = true);
    const result = [];
    let done = false;
    while (!done) {
      while (/^[0-9]$/.test(this.peek)) {
        result.push(this.nextToken());
        this.skipVisualSpace();
      }
      done = true;
      if (options.withGrouping && this.options.groupSeparator) {
        const savedIndex = this.index;
        this.skipVisualSpace();
        if (this.matchAll(this._groupSeparatorTokens)) {
          this.skipVisualSpace();
          if (/^[0-9]$/.test(this.peek))
            done = false;
          else
            this.index = savedIndex;
        }
      }
    }
    return result.join("");
  }
  parseSignedInteger(options) {
    options ?? (options = {});
    options.withGrouping ?? (options.withGrouping = true);
    const start = this.index;
    const sign2 = this.parseOptionalSign();
    const result = this.parseDecimalDigits(options);
    if (result)
      return sign2 === "-" ? "-" + result : result;
    this.index = start;
    return "";
  }
  parseExponent() {
    const start = this.index;
    if (this.matchAny(["e", "E"])) {
      const exponent = this.parseSignedInteger({ withGrouping: false });
      if (exponent)
        return exponent;
    }
    this.index = start;
    if (this.match("\\times")) {
      this.skipSpaceTokens();
      if (this.match("1") && this.match("0") && this.match("^")) {
        if (/^[0-9]$/.test(this.peek))
          return this.nextToken();
        if (this.match("<{>")) {
          this.skipSpaceTokens();
          const exponent = this.parseSignedInteger();
          this.skipSpaceTokens();
          if (this.match("<}>") && exponent)
            return exponent;
        }
      }
    }
    this.index = start;
    this.skipSpaceTokens();
    if (this.match("\\%"))
      return `-2`;
    this.index = start;
    if (this.matchAll(this._exponentProductTokens)) {
      this.skipSpaceTokens();
      if (this.matchAll(this._beginExponentMarkerTokens)) {
        this.skipSpaceTokens();
        const exponent = this.parseSignedInteger({ withGrouping: false });
        this.skipSpaceTokens();
        if (this.matchAll(this._endExponentMarkerTokens) && exponent)
          return exponent;
      }
    }
    this.index = start;
    return "";
  }
  parseRepeatingDecimal() {
    const start = this.index;
    let repeatingDecimals2 = "";
    if (this.match("(")) {
      repeatingDecimals2 = this.parseDecimalDigits();
      if (repeatingDecimals2 && this.match(")"))
        return "(" + repeatingDecimals2 + ")";
      this.index = start;
      return "";
    }
    this.index = start;
    if (this.matchAll([`\\left`, "("])) {
      repeatingDecimals2 = this.parseDecimalDigits();
      if (repeatingDecimals2 && this.matchAll([`\\right`, ")"]))
        return "(" + repeatingDecimals2 + ")";
      this.index = start;
      return "";
    }
    this.index = start;
    if (this.matchAll([`\\overline`, "<{>"])) {
      repeatingDecimals2 = this.parseDecimalDigits();
      if (repeatingDecimals2 && this.match("<}>"))
        return "(" + repeatingDecimals2 + ")";
      this.index = start;
      return "";
    }
    this.index = start;
    if (this.matchAll(this._beginRepeatingDigitsTokens)) {
      repeatingDecimals2 = this.parseDecimalDigits();
      if (repeatingDecimals2 && this.matchAll(this._endRepeatingDigitsTokens))
        return "(" + repeatingDecimals2 + ")";
      this.index = start;
      return "";
    }
    this.index = start;
    return "";
  }
  /**
   * Parse a number, with an optional sign, exponent, decimal marker,
   * repeating decimals, etc...
   */
  parseNumber() {
    if (this.options.parseNumbers === false || this.options.parseNumbers === "never")
      return null;
    const start = this.index;
    this.skipVisualSpace();
    let sign2 = 1;
    while (this.peek === "-" || this.peek === "+") {
      if (this.match("-"))
        sign2 *= -1;
      else
        this.match("+");
      this.skipVisualSpace();
    }
    let wholePart = "";
    let fractionalPart = "";
    let startsWithDecimalMarker = false;
    if (this.match(".") || this.matchAll(this._decimalMarkerTokens)) {
      const peek = this.peek;
      if (peek === "\\overline" || peek === this._beginRepeatingDigitsTokens[0] || /[0-9\(]/.test(peek)) {
        startsWithDecimalMarker = true;
        wholePart = "0";
      }
    } else
      wholePart = this.parseDecimalDigits();
    if (!wholePart) {
      this.index = start;
      return null;
    }
    const fractionalIndex = this.index;
    let hasFractionalPart = false;
    if (startsWithDecimalMarker || this.match(".") || this.matchAll(this._decimalMarkerTokens)) {
      fractionalPart = this.parseDecimalDigits();
      hasFractionalPart = true;
    }
    let hasRepeatingPart = false;
    if (hasFractionalPart) {
      const repeat = this.parseRepeatingDecimal();
      if (repeat) {
        fractionalPart += repeat;
        hasRepeatingPart = true;
      } else if (this.match("\\ldots") || this.matchAll(this._truncationMarkerTokens)) {
      }
    }
    if (hasFractionalPart && !fractionalPart) {
      this.index = fractionalIndex;
      return { num: sign2 < 0 ? "-" + wholePart : wholePart };
    }
    this.skipVisualSpace();
    const exponent = this.parseExponent();
    if (!hasRepeatingPart && this.options.parseNumbers === "rational") {
      const whole = parseInt(wholePart, 10);
      if (!fractionalPart) {
        if (exponent)
          return ["Multiply", sign2 * whole, ["Power", 10, exponent]];
        return sign2 * whole;
      }
      const fraction = parseInt(fractionalPart, 10);
      const n = fractionalPart.length;
      const numerator = whole * Math.pow(10, n) + fraction;
      const denominator = Math.pow(10, n);
      if (exponent) {
        return [
          "Multiply",
          ["Rational", sign2 * numerator, denominator],
          ["Power", 10, exponent]
        ];
      }
      return ["Rational", sign2 * numerator, denominator];
    }
    return {
      num: (sign2 < 0 ? "-" : "") + wholePart + (hasFractionalPart ? "." + fractionalPart : "") + (exponent ? "e" + exponent : "")
    };
  }
  /**
   * A Latex number can be a decimal, hex or octal number.
   * It is used in some Latex commands, such as `\char`
   *
   * From TeX:8695 (scan_int):
   * > An integer number can be preceded by any number of spaces and `+' or
   * > `-' signs. Then comes either a decimal constant (i.e., radix 10), an
   * > octal constant (i.e., radix 8, preceded by '), a hexadecimal constant
   * > (radix 16, preceded by "), an alphabetic constant (preceded by `), or
   * > an internal variable.
   */
  matchLatexNumber(isInteger = true) {
    let negative = false;
    let token = this.peek;
    while (token === "<space>" || token === "+" || token === "-") {
      if (token === "-")
        negative = !negative;
      this.nextToken();
      token = this.peek;
    }
    let radix = 10;
    let digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    if (this.match("'")) {
      radix = 8;
      digits = ["0", "1", "2", "3", "4", "5", "6", "7"];
      isInteger = true;
    } else if (this.match('"') || this.match("x")) {
      radix = 16;
      digits = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F"
      ];
      isInteger = true;
    } else if (this.match("`")) {
      token = this.nextToken();
      if (token) {
        if (token.startsWith("\\") && token.length === 2) {
          return (negative ? -1 : 1) * (token.codePointAt(1) ?? 0);
        }
        return (negative ? -1 : 1) * (token.codePointAt(0) ?? 0);
      }
      return null;
    }
    let value = "";
    while (digits.includes(this.peek)) {
      value += this.nextToken();
    }
    if (!isInteger && this.match(".")) {
      value += ".";
      while (digits.includes(this.peek)) {
        value += this.nextToken();
      }
    }
    const result = isInteger ? Number.parseInt(value, radix) : Number.parseFloat(value);
    if (Number.isNaN(result))
      return null;
    return negative ? -result : result;
  }
  parsePrefixOperator(until) {
    if (!until)
      until = { minPrec: 0 };
    if (!until.minPrec)
      until = { ...until, minPrec: 0 };
    const start = this.index;
    for (const [def, n] of this.peekDefinitions("prefix")) {
      this.index = start + n;
      const rhs = def.parse(this, until);
      if (rhs)
        return rhs;
    }
    this.index = start;
    return null;
  }
  parseInfixOperator(lhs, until) {
    until ?? (until = { minPrec: 0 });
    console.assert(until.minPrec !== void 0);
    if (until.minPrec === void 0)
      until = { ...until, minPrec: 0 };
    const start = this.index;
    for (const [def, n] of this.peekDefinitions("infix")) {
      if (def.precedence >= until.minPrec) {
        this.index = start + n;
        const rhs = def.parse(this, lhs, until);
        if (rhs)
          return rhs;
      }
    }
    this.index = start;
    return null;
  }
  /**
   * This returns an array of arguments (as in a function application),
   * or null if there is no match.
   *
   * - 'enclosure' : will look for an argument inside an enclosure
   *   (open/close fence)
   * - 'implicit': either an expression inside a pair of `()`, or just a product
   *  (i.e. we interpret `\cos 2x + 1` as `\cos(2x) + 1`)
   *
   */
  parseArguments(kind = "enclosure", until) {
    if (this.atTerminator(until))
      return null;
    const savedIndex = this.index;
    const group = this.parseEnclosure();
    if (kind === "enclosure") {
      if (group === null)
        return null;
      return getSequence(group) ?? [];
    }
    if (kind === "implicit") {
      if (head(group) === "Delimiter") {
        if (head(op1(group)) === "Sequence") {
          const seq = op1(op1(group));
          return seq ? [seq] : [];
        }
        return op1(group) ? [op1(group)] : [];
      }
      if (group !== null)
        return [group];
      const primary = this.parseExpression({ ...until, minPrec: 390 });
      return primary === null ? null : [primary];
    }
    this.index = savedIndex;
    return null;
  }
  /** If matches the normalized open delimiter, return the
   * expected closing delimiter.
   *
   * For example, if `delimiter` is `(`, it would match `\left\lparen` and
   * return `['\right', '\rparen']`, which can be matched with `matchAll()`
   *
   * If you need to match several tokens, use `matchAll()`
   *
   * @internal
   */
  matchOpenDelimiter(openDelim, closeDelim) {
    const index = this.index;
    const closePrefix = OPEN_DELIMITER_PREFIX[this.peek];
    if (closePrefix)
      this.nextToken();
    const alternatives = DELIMITER_SHORTHAND[openDelim] ?? [openDelim];
    const result = closePrefix ? [closePrefix] : [];
    if (alternatives.includes("||") && this.matchAll(["|", "|"])) {
      result.push("|");
      result.push("|");
      return result;
    }
    if (!alternatives.includes(this.peek)) {
      this.index = index;
      return null;
    }
    if (CLOSE_DELIMITER[openDelim] === closeDelim) {
      result.push(CLOSE_DELIMITER[this.peek]);
    } else {
      result.push(closeDelim);
    }
    this.nextToken();
    return result;
  }
  // matchMiddleDelimiter(delimiter: '|' | ':' | LatexToken): boolean {
  //   const delimiters = MIDDLE_DELIMITER[delimiter] ?? [delimiter];
  //   if (MIDDLE_DELIMITER_PREFIX.includes(this.peek)) {
  //     const index = this.index;
  //     this.nextToken();
  //     if (delimiters.includes(this.peek)) {
  //       this.nextToken();
  //       return true;
  //     }
  //     this.index = index;
  //     return false;
  //   } else if (delimiters.include(this.peek)) {
  //     this.nextToken();
  //     return true;
  //   }
  //   return false;
  // }
  /**
   * An enclosure is an opening matchfix operator, an optional expression,
   * optionally followed multiple times by a separator and another expression,
   * and finally a closing matching operator.
   */
  parseEnclosure() {
    const defs = this.getDefs("matchfix");
    const start = this.index;
    for (const def of defs) {
      this.index = start;
      if (!this.matchDelimiter(def.openTrigger, def.closeTrigger))
        continue;
      const bodyStart = this.index;
      this.skipSpace();
      let body = this.parseExpression();
      this.skipSpace();
      if (!this.matchBoundary()) {
        const boundary = this._boundaries[this._boundaries.length - 1].tokens;
        this.removeBoundary();
        this.index = bodyStart;
        this.skipSpace();
        body = this.parseExpression();
        this.skipSpace();
        if (!this.matchAll(boundary)) {
          if (!this.atEnd)
            continue;
          this.index = start;
          return null;
        }
      }
      const result = def.parse(this, body ?? ["Sequence"]);
      if (result !== null)
        return result;
    }
    this.index = start;
    return null;
  }
  /**
   * A generic expression is used for dictionary entries that take do
   * some complex (non-standard) parsing. This includes trig functions (to
   * parse implicit arguments), and integrals (to parse the integrand and
   * limits and the "dx" terminator).
   */
  parseGenericExpression(until) {
    if (this.atTerminator(until))
      return null;
    const start = this.index;
    let expr = null;
    const fnDefs = this.peekDefinitions("expression") ?? [];
    for (const [def, tokenCount] of fnDefs) {
      this.index = start + tokenCount;
      if (typeof def.parse === "function") {
        expr = def.parse(this, until);
        if (expr !== null)
          return expr;
      } else {
        return def.name;
      }
    }
    this.index = start;
    return null;
  }
  /**
   * A function is an identifier followed by postfix operators
   * (`\prime`...) and some arguments.
   */
  parseFunction(until) {
    if (this.atTerminator(until))
      return null;
    const start = this.index;
    let fn = null;
    for (const [def, tokenCount] of this.peekDefinitions("function")) {
      this.index = start + tokenCount;
      if (typeof def.parse === "function") {
        fn = def.parse(this, until);
        if (fn !== null)
          return fn;
      } else {
        fn = def.name;
        break;
      }
    }
    if (fn === null) {
      this.index = start;
      fn = parseIdentifier(this);
      if (!this.isFunctionHead(fn)) {
        this.index = start;
        return null;
      }
    }
    do {
      const pf = this.parsePostfixOperator(fn, until);
      if (pf === null)
        break;
      fn = pf;
    } while (true);
    const args = this.parseArguments("enclosure", until);
    if (args === null)
      return fn;
    return typeof fn === "string" ? [fn, ...args] : ["Apply", fn, ...args];
  }
  parseSymbol(until) {
    if (this.atTerminator(until))
      return null;
    const start = this.index;
    for (const [def, tokenCount] of this.peekDefinitions("symbol")) {
      this.index = start + tokenCount;
      if (typeof def.parse === "function") {
        const result = def.parse(this, until);
        if (result)
          return result;
      } else
        return def.name;
    }
    this.index = start;
    const id = parseIdentifier(this);
    if (id === null)
      return null;
    if (this.options.parseUnknownIdentifier?.(id, this) === "symbol")
      return id;
    this.index = start;
    return null;
  }
  /**
   * Parse a sequence superfix/subfix operator, e.g. `^{*}`
   *
   * Superfix and subfix need special handling:
   *
   * - they act mostly like an infix operator, but they are commutative, i.e.
   * `x_a^b` should be parsed identically to `x^b_a`.
   *
   * - furthermore, in LaTeX `x^a^b` parses the same as `x^a{}^b`.
   *
   */
  parseSupsub(lhs) {
    if (this.atEnd)
      return lhs;
    console.assert(lhs !== null);
    const index = this.index;
    this.skipSpace();
    const superscripts = [];
    const subscripts = [];
    let subIndex = index;
    while (this.peek === "_" || this.peek === "^") {
      if (this.match("_")) {
        subIndex = this.index;
        if (this.match("_") || this.match("^"))
          subscripts.push(this.error("syntax-error", subIndex));
        else {
          const sub2 = this.parseGroup() ?? this.parseToken() ?? this.parseStringGroup();
          if (sub2 === null)
            return this.error("missing", index);
          subscripts.push(sub2);
        }
      } else if (this.match("^")) {
        subIndex = this.index;
        if (this.match("_") || this.match("^"))
          superscripts.push(this.error("syntax-error", subIndex));
        else {
          const sup = this.parseGroup() ?? this.parseToken();
          if (sup === null)
            return this.error("missing", index);
          superscripts.push(sup);
        }
      }
      subIndex = this.index;
      this.skipSpace();
    }
    if (superscripts.length === 0 && subscripts.length === 0) {
      this.index = index;
      return lhs;
    }
    let result = lhs;
    if (subscripts.length > 0) {
      const defs = [...this.getDefs("infix")].filter(
        (x) => x.latexTrigger === "_"
      );
      if (defs) {
        const arg = [
          "Subscript",
          result,
          subscripts.length === 1 ? subscripts[0] : ["List", ...subscripts]
        ];
        for (const def of defs) {
          if (typeof def.parse === "function")
            result = def.parse(this, arg, { minPrec: 0 });
          else
            result = arg;
          if (result)
            break;
        }
      }
    }
    if (superscripts.length > 0) {
      const defs = [...this.getDefs("infix")].filter(
        (x) => x.latexTrigger === "^"
      );
      if (defs) {
        const nonEmptySuperscripts = superscripts.filter(
          (x) => !(head(x) === "Sequence" && nops(x) === 0)
        );
        if (nonEmptySuperscripts.length !== 0) {
          const superscriptExpression = nonEmptySuperscripts.length === 1 ? nonEmptySuperscripts[0] : ["List", ...nonEmptySuperscripts];
          const arg = [
            "Superscript",
            result,
            superscriptExpression
          ];
          for (const def of defs) {
            if (typeof def.parse === "function")
              result = def.parse(this, arg, { minPrec: 0 });
            else
              result = arg;
            if (result)
              break;
          }
        }
      }
    }
    if (result === null)
      this.index = index;
    return result;
  }
  parsePostfixOperator(lhs, until) {
    console.assert(lhs !== null);
    if (lhs === null || this.atEnd)
      return null;
    const start = this.index;
    for (const [def, n] of this.peekDefinitions("postfix")) {
      this.index = start + n;
      const result = def.parse(this, lhs, until);
      if (result !== null)
        return result;
    }
    this.index = start;
    return null;
  }
  /** Match a string used as a LaTeX identifier, for example an environment
   * name.
   * Not suitable for general purpose text, e.g. argument of a `\text{}
   * command. See `matchChar()` instead.
   */
  parseStringGroupContent() {
    const start = this.index;
    let result = "";
    let level = 0;
    while (!this.atBoundary || level > 0) {
      const token = this.nextToken();
      if (token === "<$>" || token === "<$$>") {
        this.index = start;
        return "";
      }
      if (token === "<{>") {
        level += 1;
        result += "\\{";
      } else if (token === "<}>") {
        level -= 1;
        result += "\\}";
      } else if (token === "<space>") {
        result += " ";
      } else if (token[0] === "\\") {
        result += token;
      } else {
        result += token;
      }
    }
    return result;
  }
  /**
   * This method can be invoked when we know we're in an error situation.
   *
   * In general, if a context does not apply, we return `null` to give
   * the chance to some other option to be considered. However, in some cases
   * we know we've exhausted all posibilities, and in this case this method
   * will return an error expression as informative as possible.
   *
   * We've encountered a LaTeX command or symbol but were not able to match it
   * to any entry in the LaTeX dictionary, or ran into it in an unexpected
   * context (postfix operator lacking an argument, for example)
   */
  parseSyntaxError() {
    const start = this.index;
    if (this.peek === "^") {
      this.index += 1;
      return [
        "Superscript",
        this.error("missing", start),
        missingIfEmpty(this.parseGroup())
      ];
    }
    let opDefs = this.peekDefinitions("operator");
    if (opDefs.length > 0) {
      opDefs = this.peekDefinitions("postfix");
      if (opDefs.length > 0) {
        const [def, n] = opDefs[0];
        this.index += n;
        if (typeof def.parse === "function") {
          const result = def.parse(this, this.error("missing", start));
          if (result)
            return result;
        }
        if (def.name)
          return [def.name, this.error("missing", start)];
        return this.error("unexpected-operator", start);
      }
      opDefs = this.peekDefinitions("prefix");
      if (opDefs.length > 0) {
        const [def, n] = opDefs[0];
        this.index += n;
        if (typeof def.parse === "function") {
          const result = def.parse(this, { minPrec: 0 });
          if (result)
            return result;
        }
        if (def.name)
          return [
            def.name,
            // @todo: pass a precedence?
            this.parseExpression() ?? this.error("missing", start)
          ];
        return this.error("unexpected-operator", start);
      }
      opDefs = this.peekDefinitions("infix");
      if (opDefs.length > 0) {
        const [def, n] = opDefs[0];
        this.index += n;
        const result = def.parse(this, this.error("missing", start), {
          minPrec: 0
        });
        if (result)
          return result;
        return this.error("unexpected-operator", start);
      }
    }
    const index = this.index;
    let id = parseInvalidIdentifier(this);
    if (id)
      return id;
    id = parseIdentifier(this);
    if (id)
      return this.error(["unexpected-identifier", id], index);
    const command = this.peek;
    if (!command) {
      return this.error("syntax-error", start);
    }
    if (command[0] !== "\\") {
      return this.error(
        ["unexpected-token", { str: tokensToString(command) }],
        start
      );
    }
    if (isDelimiterCommand(this))
      return this.error("unexpected-delimiter", start);
    const errorToken = this.nextToken();
    this.skipSpaceTokens();
    if (errorToken === "\\end") {
      const name = this.parseStringGroup();
      return name === null ? this.error("expected-environment-name", start) : this.error(["unbalanced-environment", { str: name }], start);
    }
    while (this.match("[")) {
      let level = 0;
      while (!this.atEnd && level === 0 && this.peek !== "]") {
        if (this.peek === "[")
          level += 1;
        if (this.peek === "]")
          level -= 1;
        this.nextToken();
      }
      this.match("]");
    }
    while (this.match("<{>")) {
      let level = 0;
      while (!this.atEnd && level === 0 && this.peek !== "<}>") {
        if (this.peek === "<{>")
          level += 1;
        if (this.peek === "<}>")
          level -= 1;
        this.nextToken();
      }
      this.match("<}>");
    }
    return this.error(
      ["unexpected-command", { str: tokensToString(errorToken) }],
      start
    );
  }
  /**
   * <primary> :=
   *  (<number> | <symbol> | <environment> | <matchfix-expr>)
   *    <subsup>* <postfix-operator>*
   *
   * <symbol> ::=
   *  (<symbol-id> | (<latex-command><latex-arguments>)) <arguments>
   *
   * <matchfix-expr> :=
   *  <matchfix-op-open>
   *  <expression>
   *  (<matchfix-op-separator> <expression>)*
   *  <matchfix-op-close>
   *
   */
  parsePrimary(until) {
    if (this.atBoundary)
      return null;
    if (this.atTerminator(until))
      return null;
    let result = null;
    const start = this.index;
    if (this.match("<}>"))
      return this.error("unexpected-closing-delimiter", start);
    result ?? (result = this.parseGroup());
    result ?? (result = this.parseNumber());
    result ?? (result = this.parseEnclosure());
    result ?? (result = this.parseEnvironment(until));
    if (result === null && this.matchAll(this._positiveInfinityTokens))
      result = { num: "+Infinity" };
    if (result === null && this.matchAll(this._negativeInfinityTokens))
      result = { num: "-Infinity" };
    if (result === null && this.matchAll(this._notANumberTokens))
      result = { num: "NaN" };
    result ?? (result = this.parseGenericExpression(until) ?? this.parseFunction(until) ?? this.parseSymbol(until) ?? parseInvalidIdentifier(this));
    if (result !== null) {
      result = this.decorate(result, start);
      let postfix = null;
      let index = this.index;
      do {
        postfix = this.parsePostfixOperator(result, until);
        result = postfix ?? result;
        if (this.index === index && postfix !== null) {
          console.assert(this.index !== index, "No token consumed");
          break;
        }
        index = this.index;
      } while (postfix !== null);
    }
    if (result !== null)
      result = this.parseSupsub(result);
    return this.decorate(result, start);
  }
  /**
   *  Parse an expression:
   *
   * <expression> ::=
   *  | <primary>
   *  | <prefix-op> <primary>
   *  | <primary> <infix-op> <expression>
   *
   * Stop when an operator of precedence less than `until.minPrec`
   * is encountered
   */
  parseExpression(until) {
    this.skipSpace();
    const start = this.index;
    if (this.atBoundary) {
      this.index = start;
      return null;
    }
    until ?? (until = { minPrec: 0 });
    console.assert(until.minPrec !== void 0);
    if (until.minPrec === void 0)
      until = { ...until, minPrec: 0 };
    let lhs = this.parsePrefixOperator({ ...until, minPrec: 0 });
    if (lhs === null) {
      lhs = this.parsePrimary(until);
      if (head(lhs) === "Sequence" && nops(lhs) === 0)
        lhs = null;
    }
    if (lhs) {
      let done = false;
      while (!done && !this.atTerminator(until)) {
        this.skipSpace();
        let result = this.parseInfixOperator(lhs, until);
        if (result === null) {
          if (this.peekDefinitions("operator").length === 0) {
            const rhs = this.parseExpression({
              ...until,
              minPrec: MULTIPLICATION_PRECEDENCE
            });
            if (rhs !== null) {
              if (head(lhs) === "InvisibleOperator") {
                if (head(rhs) === "InvisibleOperator")
                  result = ["InvisibleOperator", ...ops(lhs), ...ops(rhs)];
                else
                  result = ["InvisibleOperator", ...ops(lhs), rhs];
              } else if (head(rhs) === "InvisibleOperator") {
                result = ["InvisibleOperator", lhs, ...ops(rhs)];
              } else
                result = ["InvisibleOperator", lhs, rhs];
            }
          }
        }
        if (result !== null) {
          lhs = result;
        } else {
          done = true;
        }
      }
    }
    return this.decorate(lhs, start);
  }
  /**
   * Add LaTeX or other requested metadata to the expression
   */
  decorate(expr, start) {
    if (expr === null)
      return null;
    if (!this.options.preserveLatex)
      return expr;
    const latex = this.latex(start, this.index);
    if (Array.isArray(expr)) {
      expr = { latex, fn: expr };
    } else if (typeof expr === "number") {
      expr = { latex, num: Number(expr).toString() };
    } else if (typeof expr === "string") {
      expr = { latex, sym: expr };
    } else if (typeof expr === "object" && expr !== null) {
      expr.latex = latex;
    }
    return expr;
  }
  error(code, fromToken) {
    let msg;
    if (typeof code === "string") {
      console.assert(!code.startsWith("'"));
      msg = { str: code };
    } else {
      console.assert(!code[0].startsWith("'"));
      msg = ["ErrorCode", { str: code[0] }, ...code.slice(1)];
    }
    const latex = this.latex(fromToken, this.index);
    return latex ? ["Error", msg, ["LatexString", { str: latex }]] : ["Error", msg];
  }
  isFunctionHead(expr) {
    if (expr === null)
      return false;
    const s = symbol(expr);
    if (!s)
      return false;
    if (this.computeEngine?.lookupFunction(s) !== void 0)
      return true;
    if (this.options.parseUnknownIdentifier?.(s, this) === "function")
      return true;
    return false;
  }
  /** Return all defs of the specified kind */
  *getDefs(kind) {
    if (kind === "operator") {
      for (const def of this._dictionary.defs)
        if (/^prefix|infix|postfix/.test(def.kind))
          yield def;
    } else {
      for (const def of this._dictionary.defs)
        if (def.kind === kind)
          yield def;
    }
  }
};
function parseComplexId(parser, id) {
  const start = parser.index;
  const candidate = parseIdentifier(parser)?.trim();
  if (candidate === null)
    return 0;
  const result = candidate !== id ? 0 : parser.index - start;
  parser.index = start;
  return result;
}
function isDelimiterCommand(parser) {
  const command = parser.peek;
  if (Object.values(CLOSE_DELIMITER).includes(command) || CLOSE_DELIMITER[command]) {
    parser.nextToken();
    return true;
  }
  if (OPEN_DELIMITER_PREFIX[command] || Object.values(OPEN_DELIMITER_PREFIX).includes(command)) {
    parser.nextToken();
    parser.nextToken();
    return true;
  }
  return false;
}

// src/compute-engine/latex-syntax/serialize-number.ts
function formatFractionalPart(m, options) {
  const originalLength = m.length;
  const originalM = m;
  if (options.beginRepeatingDigits && options.endRepeatingDigits) {
    m = m.slice(0, -1);
    for (let i = 0; i < m.length - 16; i++) {
      const offset = m.substring(0, i);
      for (let j = 0; j < 17; j++) {
        const cycle = m.substring(i, i + j + 1);
        const times = Math.floor((m.length - offset.length) / cycle.length);
        if (times <= 3)
          break;
        if ((offset + cycle.repeat(times + 1)).startsWith(m)) {
          if (cycle === "0") {
            return offset.replace(/(\d{3})/g, "$1" + options.groupSeparator);
          }
          return offset.replace(/(\d{3})/g, "$1" + options.groupSeparator) + options.beginRepeatingDigits + cycle + options.endRepeatingDigits;
        }
      }
    }
  }
  const extraDigits = originalLength > options.precision - 1;
  m = originalM;
  if (extraDigits)
    m = m.substring(0, options.precision - 1);
  if (options.groupSeparator) {
    m = m.replace(/(\d{3})/g, "$1" + options.groupSeparator);
    if (m.endsWith(options.groupSeparator)) {
      m = m.slice(0, -options.groupSeparator.length);
    }
  }
  if (extraDigits)
    return m + options.truncationMarker;
  return m;
}
function formatExponent(exp2, options) {
  if (!exp2)
    return "";
  if (options.beginExponentMarker) {
    return options.beginExponentMarker + exp2 + (options.endExponentMarker ?? "");
  }
  return "10^{" + exp2 + "}";
}
function serializeNumber(expr, options) {
  if (expr === null)
    return "";
  let num;
  if (typeof expr === "number" || typeof expr === "string") {
    num = expr;
  } else if (typeof expr === "object" && "num" in expr) {
    num = expr.num;
  } else
    return "";
  if (typeof num === "number") {
    if (num === Infinity)
      return options.positiveInfinity;
    else if (num === -Infinity)
      return options.negativeInfinity;
    else if (Number.isNaN(num))
      return options.notANumber;
    let result2 = void 0;
    if (options.notation === "engineering")
      result2 = serializeScientificNotationNumber(
        num.toExponential(),
        options,
        3
      );
    else if (options.notation === "scientific")
      result2 = serializeScientificNotationNumber(num.toExponential(), options);
    return result2 ?? serializeAutoNotationNumber(num.toString(), options);
  }
  num = num.toLowerCase().replace(/[\u0009-\u000d\u0020\u00a0]/g, "");
  if (num === "infinity" || num === "+infinity")
    return options.positiveInfinity;
  else if (num === "-infinity")
    return options.negativeInfinity;
  else if (num === "nan")
    return options.notANumber;
  if (!/^[-+\.]?[0-9]/.test(num))
    return "";
  num = num.replace(/[nd]$/, "");
  if (/\([0-9]+\)/.test(num)) {
    const [_, body, repeat, trail] = num.match(/(.+)\(([0-9]+)\)(.*)$/) ?? [];
    num = body + repeat.repeat(Math.ceil(options.precision / repeat.length)) + trail;
  }
  let sign2 = "";
  if (num[0] === "-") {
    sign2 = "-";
    num = num.substring(1);
  } else if (num[0] === "+") {
    num = num.substring(1);
  }
  while (num[0] === "0")
    num = num.substring(1);
  if (num.length === 0)
    num = "0";
  else if (num[0] === ".")
    num = "0" + num;
  let result = void 0;
  if (options.notation === "engineering")
    result = serializeScientificNotationNumber(num, options, 3);
  else if (options.notation === "scientific")
    result = serializeScientificNotationNumber(num, options);
  return sign2 + (result ?? serializeAutoNotationNumber(num, options));
}
function serializeScientificNotationNumber(valString, options, expMultiple = 1) {
  let m = valString.match(/^(.*)[e|E]([-+]?[0-9]+)$/);
  if (!m) {
    let sign2 = "";
    if (valString[0] === "-") {
      sign2 = "-";
      valString = valString.substring(1);
    } else if (valString[0] === "+") {
      valString = valString.substring(1);
    }
    if (valString.indexOf(".") < 0) {
      if (valString.length === 1) {
        valString = sign2 + valString + "e+0";
      } else {
        valString = sign2 + valString[0] + "." + valString.slice(1) + "e+" + (valString.length - 1).toString();
      }
    } else {
      let [_, whole, fraction] = valString.match(/^(.*)\.(.*)$/);
      if (!fraction)
        fraction = "";
      while (whole.startsWith("0"))
        whole = whole.substring(1);
      if (!whole) {
        valString = sign2 + "0." + fraction + "e+0";
      } else {
        valString = sign2 + whole[0] + "." + whole.slice(1) + fraction + "e+" + (whole.length - 1).toString();
      }
    }
    m = valString.match(/^(.*)[e|E]([-+]?[0-9]+)$/);
  }
  console.assert(m);
  if (!m)
    return serializeAutoNotationNumber(valString, options);
  let exponent = parseInt(m[2]);
  let mantissa = m[1];
  if (Math.abs(exponent) % expMultiple !== 0) {
    const adjust = exponent > 0 ? exponent % expMultiple : -((expMultiple + exponent) % expMultiple);
    exponent = exponent >= 0 ? exponent - adjust : exponent + adjust;
    let [_, whole, fraction] = mantissa.match(/^(.*)\.(.*)$/) ?? [
      "",
      mantissa,
      ""
    ];
    mantissa = whole + (fraction + "00000000000000000").slice(0, Math.abs(adjust)) + "." + fraction.slice(Math.abs(adjust));
  }
  const avoid = options.avoidExponentsInRange;
  if (avoid && exponent >= avoid[0] && exponent <= avoid[1])
    return void 0;
  let fractionalPart = "";
  let wholePart = mantissa;
  m = wholePart.match(/^(.*)\.(.*)$/);
  if (m) {
    wholePart = m[1];
    fractionalPart = m[2];
  }
  const expString = exponent !== 0 ? formatExponent(Number(exponent).toString(), options) : "";
  if (options.groupSeparator) {
    wholePart = wholePart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      options.groupSeparator
    );
    fractionalPart = formatFractionalPart(fractionalPart, options);
  }
  if (fractionalPart)
    fractionalPart = options.decimalMarker + fractionalPart;
  if (!expString)
    return wholePart + fractionalPart;
  if (wholePart === "1" && !fractionalPart)
    return expString;
  return wholePart + fractionalPart + options.exponentProduct + expString;
}
function serializeAutoNotationNumber(valString, options) {
  let m = valString.match(/^(.*)[e|E]([-+]?[0-9]+)$/i);
  let exponent = void 0;
  if (m?.[1] && m[2]) {
    exponent = formatExponent(m[2], options);
  }
  let wholePart = m?.[1] ?? valString;
  let fractionalPart = "";
  m = (exponent ? m[1] : valString).match(/^(.*)\.(.*)$/);
  if (m?.[1] && m[2]) {
    wholePart = m[1];
    fractionalPart = m[2];
  }
  if (options.groupSeparator) {
    wholePart = wholePart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      options.groupSeparator
    );
    fractionalPart = formatFractionalPart(fractionalPart, options);
  }
  if (fractionalPart)
    fractionalPart = options.decimalMarker + fractionalPart;
  if (!exponent)
    return wholePart + fractionalPart;
  if (wholePart === "1" && !fractionalPart)
    return exponent;
  return wholePart + fractionalPart + options.exponentProduct + exponent;
}

// src/compute-engine/latex-syntax/serializer.ts
var ACCENT_MODIFIERS = {
  deg: (s) => `${s}\\degree`,
  prime: (s) => `${s}^{\\prime}`,
  dprime: (s) => `${s}^{\\doubleprime}`,
  ring: (s) => `\\mathring{${s}}`,
  hat: (s) => `\\hat{${s}}`,
  tilde: (s) => `\\tilde{${s}}`,
  vec: (s) => `\\vec{${s}}`,
  bar: (s) => `\\overline{${s}}`,
  underbar: (s) => `\\underline{${s}}`,
  dot: (s) => `\\dot{${s}}`,
  ddot: (s) => `\\ddot{${s}}`,
  tdot: (s) => `\\dddot{${s}}`,
  qdot: (s) => `\\ddddot{${s}}`,
  // Supplemental
  acute: (s) => `\\acute{${s}}`,
  grave: (s) => `\\grave{${s}}`,
  breve: (s) => `\\breve{${s}}`,
  check: (s) => `\\check{${s}}`
};
var STYLE_MODIFIERS = {
  upright: (s) => `\\mathrm{${s}}`,
  italic: (s) => `\\mathit{${s}}`,
  bold: (s) => `\\mathbf{${s}}`,
  script: (s) => `\\mathscr{${s}}`,
  fraktur: (s) => `\\mathfrak{${s}}`,
  // Note Unicode uses 'fraktur' for 'gothic'
  doublestruck: (s) => `\\mathbb{${s}}`,
  // Unicode uses 'double-struck' for 'blackboard'
  // Supplemental
  blackboard: (s) => `\\mathbb{${s}}`,
  calligraphic: (s) => `\\mathcal{${s}}`,
  gothic: (s) => `\\mathfrak{${s}}`,
  sansserif: (s) => `\\mathsf{${s}}`,
  monospace: (s) => `\\mathtt{${s}}`
};
var Serializer4 = class {
  constructor(options, dictionary2, onError) {
    this.level = -1;
    this.options = options;
    if (options.invisibleMultiply) {
      if (!/#1/.test(options.invisibleMultiply) || !/#2/.test(options.invisibleMultiply)) {
        onError([
          {
            severity: "warning",
            message: ["expected-argument", "invisibleMultiply"]
          }
        ]);
      }
    }
    this.onError = onError;
    this.dictionary = dictionary2;
    this.canonical = void 0;
  }
  updateOptions(opt) {
    for (const k of Object.keys(this.options))
      if (k in opt)
        this.options[k] = opt[k];
  }
  /**
   * Serialize the expression, and if the expression is an operator
   * of precedence less than or equal to prec, wrap it in some paren.
   * @todo: don't wrap Abs, Floor, Ceil, Delimiter
   */
  wrap(expr, prec) {
    if (expr === null)
      return "";
    if (prec === void 0) {
      return this.wrapString(
        this.serialize(expr),
        this.options.groupStyle(expr, this.level + 1)
      );
    }
    if (typeof expr === "number" || isNumberObject(expr) || typeof expr === "string" || isSymbolObject(expr)) {
      return this.serialize(expr);
    }
    const name = head(expr);
    if (typeof name === "string" && name !== "Delimiter" && name !== "Subscript") {
      const def = this.dictionary.ids.get(name);
      if (def && (def.kind === "symbol" || def.kind === "prefix" || def.kind === "infix" || def.kind === "postfix") && def.precedence < prec)
        return this.wrapString(
          this.serialize(expr),
          this.options.applyFunctionStyle(expr, this.level)
        );
    }
    return this.serialize(expr);
  }
  /**
   * If this is a "short" expression, wrap it.
   * Do not wrap identifiers, positive numbers or functions.
   *
   * This is called by the serializer for power and division (i.e. "(a+1)/b")
   *
   */
  wrapShort(expr) {
    if (expr === null)
      return "";
    const exprStr = this.serialize(expr);
    if (symbol(expr) !== null)
      return exprStr;
    if (head(expr) === "Delimiter" && nops(expr) === 1)
      return exprStr;
    const isNum = isNumberExpression(expr);
    if (isNum && !/^(-|\.)/.test(exprStr))
      return exprStr;
    const h = head(expr);
    if (h !== "Add" && h !== "Negate" && h !== "Subtract" && h !== "PlusMinus" && h !== "Multiply")
      return exprStr;
    return this.wrapString(
      exprStr,
      this.options.groupStyle(expr, this.level + 1)
    );
  }
  wrapString(s, style, fence) {
    if (style === "none")
      return s;
    if (fence === void 0)
      fence = "()";
    let openFence = fence?.[0] ?? ".";
    let closeFence = fence?.[1] ?? ".";
    if ((openFence === "." || closeFence === ".") && style === "paren")
      style = "leftright";
    if (openFence === '"')
      openFence = "``";
    else if (openFence === "|")
      openFence = "\\lvert";
    else
      openFence = DELIMITERS_SHORTHAND[openFence] ?? openFence;
    if (closeFence === '"')
      closeFence = "''";
    else if (closeFence === "|")
      closeFence = "\\rvert";
    else
      closeFence = DELIMITERS_SHORTHAND[closeFence] ?? closeFence;
    if (openFence === "." && closeFence === ".")
      return s;
    if (style === "leftright")
      return `\\left${openFence}${s}\\right${closeFence}}`;
    if (style === "big")
      return `${openFence === "." ? "" : `\\Bigl${openFence}`}${s}${closeFence === "." ? "" : `\\Bigr${closeFence}`})`;
    return openFence + s + closeFence;
  }
  wrapArguments(expr) {
    return this.wrapString(
      (ops(expr) ?? []).map((x) => this.serialize(x)).join(", "),
      this.options.applyFunctionStyle(expr, this.level)
    );
  }
  serializeSymbol(expr, def) {
    console.assert(typeof expr === "string" || isSymbolObject(expr));
    if (def?.kind === "function") {
      return serializeIdentifier(symbol(expr) ?? "") ?? "";
    }
    return def?.serialize?.(this, expr) ?? serializeIdentifier(symbol(expr)) ?? "";
  }
  serializeFunction(expr, def) {
    if (def?.serialize)
      return def.serialize(this, expr);
    const h = head(expr);
    if (typeof h === "string")
      return serializeIdentifier(h, "auto") + this.wrapArguments(expr);
    if (head(h) === "InverseFunction" || head(h) === "Derivative") {
      return this.serializeFunction(h, this.dictionary.ids.get(head(h))) + this.wrapArguments(expr);
    }
    const args = ops(expr) ?? [];
    if (args.length === 1) {
      return joinLatex([
        this.serialize(args[0]),
        "\\rhd",
        this.wrapString(
          this.serialize(h),
          this.options.applyFunctionStyle(expr, this.level)
        )
      ]);
    }
    const style = this.options.applyFunctionStyle(expr, this.level);
    return joinLatex([
      "\\operatorname{apply}",
      this.wrapString(
        this.serialize(h) + ", " + this.serialize(["List", ...args]),
        style
      )
    ]);
  }
  serializeDictionary(dict) {
    return `\\left\\lbrack\\begin{array}{lll}${Object.keys(dict).map((x) => {
      return `\\textbf{${x}} & \\rightarrow & ${this.serialize(dict[x])}`;
    }).join("\\\\")}\\end{array}\\right\\rbrack`;
  }
  serialize(expr, options) {
    if (expr === null || expr === void 0)
      return "";
    options ?? (options = {});
    options = { ...options };
    if (!("canonical" in options))
      options.canonical = true;
    const savedCanonical = this.canonical;
    if (this.canonical === void 0)
      this.canonical = options.canonical;
    this.level += 1;
    try {
      const result = (() => {
        const numericValue = serializeNumber(expr, this.options);
        if (numericValue)
          return numericValue;
        const s = stringValue(expr);
        if (s !== null)
          return `\\text{${s}}`;
        const dict = dictionary(expr);
        if (dict !== null)
          return this.serializeDictionary(dict);
        const symbolName = symbol(expr);
        if (symbolName !== null) {
          return this.serializeSymbol(
            expr,
            this.dictionary.ids.get(symbolName)
          );
        }
        const fnName = headName(expr);
        if (fnName) {
          return this.serializeFunction(expr, this.dictionary.ids.get(fnName));
        }
        if (head(expr) !== null)
          return this.serializeFunction(expr);
        this.onError([
          {
            severity: "warning",
            message: [
              "syntax-error",
              expr ? JSON.stringify(expr) : "undefined"
            ]
          }
        ]);
      })();
      this.level -= 1;
      this.canonical = savedCanonical;
      return result ?? "";
    } catch (e) {
    }
    this.level -= 1;
    this.canonical = savedCanonical;
    return "";
  }
  applyFunctionStyle(expr, level) {
    return this.options.applyFunctionStyle(expr, level);
  }
  groupStyle(expr, level) {
    return this.options.groupStyle(expr, level);
  }
  rootStyle(expr, level) {
    return this.options.rootStyle(expr, level);
  }
  fractionStyle(expr, level) {
    return this.options.fractionStyle(expr, level);
  }
  logicStyle(expr, level) {
    return this.options.logicStyle(expr, level);
  }
  powerStyle(expr, level) {
    return this.options.powerStyle(expr, level);
  }
  numericSetStyle(expr, level) {
    return this.options.numericSetStyle(expr, level);
  }
};
function specialName(s) {
  const prefix = s.match(/^([^_]+)/)?.[1] ?? "";
  let i = SYMBOLS.findIndex((x) => prefix === x[0]);
  if (i >= 0)
    return [SYMBOLS[i][1], s.substring(SYMBOLS[i][0].length)];
  const DIGITS = {
    zero: "0",
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
    ten: "10"
  };
  i = Object.keys(DIGITS).findIndex((x) => s.startsWith(x));
  if (i >= 0) {
    const key = Object.keys(DIGITS)[i];
    return [DIGITS[key], s.substring(key.length)];
  }
  const code = s.codePointAt(0);
  i = SYMBOLS.findIndex((x) => x[2] === code);
  if (i >= 0)
    return [SYMBOLS[i][1], s.substring(1)];
  const EXTRA_SYMBOLS = {
    plus: "+",
    minus: "-",
    pm: "\\pm",
    ast: "\\ast",
    dag: "\\dag",
    ddag: "\\ddag",
    hash: "\\#",
    bottom: "\\bot",
    top: "\\top",
    bullet: "\\bullet",
    circle: "\\circ",
    diamond: "\\diamond",
    times: "\\times",
    square: "\\square",
    star: "\\star"
  };
  i = Object.keys(EXTRA_SYMBOLS).findIndex((x) => prefix === x);
  if (i >= 0) {
    const key = Object.keys(EXTRA_SYMBOLS)[i];
    return [EXTRA_SYMBOLS[key], s.substring(key.length)];
  }
  return [prefix, s.substring(prefix.length)];
}
function parseModifiers(s) {
  let [body, rest] = specialName(s);
  const accent = [];
  while (rest.length > 0) {
    const m = rest.match(/^_([a-zA-Z]+)(.*)/);
    if (!m)
      break;
    if (!ACCENT_MODIFIERS[m[1]])
      break;
    accent.push(m[1]);
    rest = m[2];
  }
  const styles = [];
  while (rest.length > 0) {
    const m = rest.match(/^_([a-zA-Z]+)(.*)/);
    if (!m)
      break;
    if (!STYLE_MODIFIERS[m[1]])
      break;
    styles.push(m[1]);
    rest = m[2];
  }
  return [body, accent, styles, rest];
}
function parseIdentifierBody2(s, topLevel = true, style = "auto") {
  let [body, accents, styles, rest] = parseModifiers(s);
  for (const accent of accents) {
    if (ACCENT_MODIFIERS[accent])
      body = ACCENT_MODIFIERS[accent](body);
  }
  if (topLevel) {
    const sups = [];
    const subs2 = [];
    const m = body.match(/^([^\d].*?)(\d+)$/);
    if (m) {
      subs2.push(m[2]);
      body = m[1];
    }
    while (rest.length > 0) {
      if (rest.startsWith("__")) {
        const [sup, rest2] = parseIdentifierBody2(
          rest.substring(2),
          false,
          "none"
        );
        sups.push(sup);
        rest = rest2;
      } else if (rest.startsWith("_")) {
        const [sub2, rest2] = parseIdentifierBody2(
          rest.substring(1),
          false,
          "none"
        );
        subs2.push(sub2);
        rest = rest2;
      } else {
        break;
      }
    }
    if (sups.length > 0)
      body = `${body}^{${sups.join(",")}}`;
    if (subs2.length > 0)
      body = `${body}_{${subs2.join(",")}}`;
  }
  for (const style2 of styles) {
    if (STYLE_MODIFIERS[style2])
      body = STYLE_MODIFIERS[style2](body);
  }
  if (styles.length === 0 && style !== "none") {
    switch (style) {
      case "auto":
        if (countTokens(body) > 1)
          body = `\\mathrm{${body}}`;
        break;
      case "operator":
        body = `\\operatorname{${body}}`;
        break;
      case "italic":
        body = `\\mathit{${body}}`;
        break;
      case "upright":
        body = `\\mathrm{${body}}`;
        break;
    }
  }
  return [body, rest];
}
function serializeIdentifier(s, style = "auto") {
  if (s === null)
    return null;
  if (ONLY_EMOJIS.test(s))
    return s;
  const m = s.match(/^(_+)(.*)/);
  if (m) {
    const [body2, rest2] = parseIdentifierBody2(m[2], true, "none");
    return `\\operatorname{${"\\_".repeat(m[1].length) + body2 + rest2}}`;
  }
  const [body, rest] = parseIdentifierBody2(s, true, style);
  if (rest.length > 0)
    return `\\operatorname{${s}}`;
  return body;
}

// src/compute-engine/latex-syntax/latex-syntax.ts
var DEFAULT_SERIALIZE_LATEX_OPTIONS = {
  invisibleMultiply: "",
  // '\\cdot',
  invisiblePlus: "",
  // '+',
  // invisibleApply: '',
  multiply: "\\times",
  missingSymbol: "\\blacksquare",
  // openGroup: '(',
  // closeGroup: ')',
  // divide: '\\frac{#1}{#2}',
  // subtract: '#1-#2',
  // add: '#1+#2',
  // negate: '-#1',
  // squareRoot: '\\sqrt{#1}',
  // nthRoot: '\\sqrt[#2]{#1}',
  applyFunctionStyle: getApplyFunctionStyle,
  groupStyle: getGroupStyle,
  rootStyle: getRootStyle,
  fractionStyle: getFractionStyle,
  logicStyle: getLogicStyle,
  powerStyle: getPowerStyle,
  numericSetStyle: getNumericSetStyle
};
var LatexSyntax = class _LatexSyntax {
  constructor(options) {
    const onError = (warnings) => {
      if (typeof window !== "undefined") {
        for (const warning of warnings)
          console.warn(warning.message);
      }
      return;
    };
    this.onError = options.onError ?? onError;
    this.computeEngine = options.computeEngine;
    const opts = { ...options };
    delete opts.dictionary;
    delete opts.onError;
    this.options = {
      ...DEFAULT_LATEX_NUMBER_OPTIONS,
      ...DEFAULT_PARSE_LATEX_OPTIONS,
      ...DEFAULT_SERIALIZE_LATEX_OPTIONS,
      ...opts
    };
    this._dictionaryInput = options.dictionary ?? _LatexSyntax.getDictionary();
    this._dictionary = indexLatexDictionary(
      this._dictionaryInput,
      (sig) => this.onError([sig])
    );
  }
  get dictionary() {
    return this._dictionaryInput;
  }
  set dictionary(val) {
    this._dictionaryInput = val;
    this._dictionary = indexLatexDictionary(val, (sig) => this.onError([sig]));
  }
  updateOptions(opt) {
    for (const k of Object.keys(this.options))
      if (k in opt)
        this.options[k] = opt[k];
    this.serializer.updateOptions(opt);
  }
  static getDictionary(category = "all") {
    if (category === "all") {
      const result = [];
      for (const domain of Object.keys(DEFAULT_LATEX_DICTIONARY))
        if (DEFAULT_LATEX_DICTIONARY[domain])
          result.push(...DEFAULT_LATEX_DICTIONARY[domain]);
      return result;
    }
    if (!DEFAULT_LATEX_DICTIONARY[category])
      return [];
    return Object.freeze([...DEFAULT_LATEX_DICTIONARY[category]]);
  }
  parse(latex) {
    const parser = new _Parser(
      tokenize(latex, []),
      this.options,
      this._dictionary,
      this.computeEngine
    );
    let expr = parser.parseExpression();
    if (!parser.atEnd) {
      const error = parser.parseSyntaxError();
      expr = expr ? ["Sequence", expr, error] : error;
      while (!parser.atEnd)
        parser.nextToken();
    }
    expr ?? (expr = ["Sequence"]);
    if (this.options.preserveLatex) {
      if (Array.isArray(expr))
        expr = { latex, fn: expr };
      else if (typeof expr === "number")
        expr = { latex, num: Number(expr).toString() };
      else if (typeof expr === "string")
        expr = { latex, sym: expr };
      else if (typeof expr === "object" && expr !== null)
        expr.latex = latex;
    }
    return expr ?? ["Sequence"];
  }
  serialize(expr, options) {
    return this.serializer.serialize(expr, options);
  }
  get serializer() {
    if (this._serializer)
      return this._serializer;
    this._serializer = new Serializer4(
      this.options,
      this._dictionary,
      this.onError
    );
    return this._serializer;
  }
};

// src/compute-engine/domain-utils.ts
var import_complex3 = __toESM(require_complex(), 1);

// src/compute-engine/numerics/rationals.ts
var import_complex2 = __toESM(require_complex(), 1);

// src/compute-engine/numerics/numeric.ts
var import_complex = __toESM(require_complex(), 1);

// src/compute-engine/numerics/richardson.ts
function extrapolate(f, x0, options = {}) {
  const {
    contract = 0.125,
    step = 1,
    power = 2,
    atol = 1e-16,
    rtol = atol > 0 ? 0 : Math.sqrt(Number.EPSILON),
    maxeval = 1e6,
    // Number.MAX_SAFE_INTEGER
    breaktol = 2
  } = options;
  if (!isFinite(x0)) {
    return extrapolate((u) => f(1 / u), 1 / x0, {
      rtol,
      atol,
      maxeval,
      contract: Math.abs(contract) > 1 ? 1 / contract : contract,
      step: 1 / step,
      power
    });
  }
  let h = step;
  const invcontract = Math.pow(1 / contract, power);
  let f0 = f(x0 + h);
  const neville = [f0];
  let err = Infinity;
  let numeval = 1;
  while (numeval < maxeval) {
    numeval += 1;
    h *= contract;
    neville.push(f(x0 + h));
    let c = invcontract;
    let minerr = Infinity;
    for (let i = neville.length - 2; i >= 0; i--) {
      const old = neville[i];
      neville[i] = neville[i + 1] + (neville[i + 1] - neville[i]) / (c - 1);
      const err_ = Math.abs(neville[i] - old);
      minerr = Math.min(minerr, err_);
      if (err_ < err) {
        f0 = neville[i];
        err = err_;
      }
      c *= invcontract;
    }
    if (minerr > breaktol * err || !isFinite(minerr))
      break;
    if (err <= Math.max(rtol * Math.abs(f0), atol))
      break;
  }
  return [f0, err];
}

// src/compute-engine/numerics/numeric.ts
var MACHINE_PRECISION_BITS = 53;
var MACHINE_PRECISION = Math.log10(
  Math.pow(2, MACHINE_PRECISION_BITS)
);
var MACHINE_TOLERANCE_BITS = 7;
var MACHINE_TOLERANCE = Math.pow(
  2,
  -(MACHINE_PRECISION_BITS - MACHINE_TOLERANCE_BITS)
);
var NUMERIC_TOLERANCE = Math.pow(10, -10);
var SMALL_INTEGER = 1e6;
var MAX_ITERATION = 1e6;
var MAX_SYMBOLIC_TERMS = 200;
var SMALL_PRIMES = /* @__PURE__ */ new Set([
  2,
  3,
  5,
  7,
  11,
  13,
  17,
  19,
  23,
  29,
  31,
  37,
  41,
  43,
  47,
  53,
  59,
  61,
  67,
  71,
  73,
  79,
  83,
  89,
  97,
  101,
  103,
  107,
  109,
  113,
  127,
  131,
  137,
  139,
  149,
  151,
  157,
  163,
  167,
  173,
  179,
  181,
  191,
  193,
  197,
  199,
  211,
  223,
  227,
  229,
  233,
  239,
  241,
  251,
  257,
  263,
  269,
  271,
  277,
  281,
  283,
  293,
  307,
  311,
  313,
  317,
  331,
  337,
  347,
  349,
  353,
  359,
  367,
  373,
  379,
  383,
  389,
  397,
  401,
  409,
  419,
  421,
  431,
  433,
  439,
  443,
  449,
  457,
  461,
  463,
  467,
  479,
  487,
  491,
  499,
  503,
  509,
  521,
  523,
  541,
  547,
  557,
  563,
  569,
  571,
  577,
  587,
  593,
  599,
  601,
  607,
  613,
  617,
  619,
  631,
  641,
  643,
  647,
  653,
  659,
  661,
  673,
  677,
  683,
  691,
  701,
  709,
  719,
  727,
  733,
  739,
  743,
  751,
  757,
  761,
  769,
  773,
  787,
  797,
  809,
  811,
  821,
  823,
  827,
  829,
  839,
  853,
  857,
  859,
  863,
  877,
  881,
  883,
  887,
  907,
  911,
  919,
  929,
  937,
  941,
  947,
  953,
  967,
  971,
  977,
  983,
  991,
  997,
  1009,
  1013,
  1019,
  1021,
  1031,
  1033,
  1039,
  1049,
  1051,
  1061,
  1063,
  1069,
  1087,
  1091,
  1093,
  1097,
  1103,
  1109,
  1117,
  1123,
  1129,
  1151,
  1153,
  1163,
  1171,
  1181,
  1187,
  1193,
  1201,
  1213,
  1217,
  1223,
  1229,
  1231,
  1237,
  1249,
  1259,
  1277,
  1279,
  1283,
  1289,
  1291,
  1297,
  1301,
  1303,
  1307,
  1319,
  1321,
  1327,
  1361,
  1367,
  1373,
  1381,
  1399,
  1409,
  1423,
  1427,
  1429,
  1433,
  1439,
  1447,
  1451,
  1453,
  1459,
  1471,
  1481,
  1483,
  1487,
  1489,
  1493,
  1499,
  1511,
  1523,
  1531,
  1543,
  1549,
  1553,
  1559,
  1567,
  1571,
  1579,
  1583,
  1597,
  1601,
  1607,
  1609,
  1613,
  1619,
  1621,
  1627,
  1637,
  1657,
  1663,
  1667,
  1669,
  1693,
  1697,
  1699,
  1709,
  1721,
  1723,
  1733,
  1741,
  1747,
  1753,
  1759,
  1777,
  1783,
  1787,
  1789,
  1801,
  1811,
  1823,
  1831,
  1847,
  1861,
  1867,
  1871,
  1873,
  1877,
  1879,
  1889,
  1901,
  1907,
  1913,
  1931,
  1933,
  1949,
  1951,
  1973,
  1979,
  1987,
  1993,
  1997,
  1999,
  2003,
  2011,
  2017,
  2027,
  2029,
  2039,
  2053,
  2063,
  2069,
  2081,
  2083,
  2087,
  2089,
  2099,
  2111,
  2113,
  2129,
  2131,
  2137,
  2141,
  2143,
  2153,
  2161,
  2179,
  2203,
  2207,
  2213,
  2221,
  2237,
  2239,
  2243,
  2251,
  2267,
  2269,
  2273,
  2281,
  2287,
  2293,
  2297,
  2309,
  2311,
  2333,
  2339,
  2341,
  2347,
  2351,
  2357,
  2371,
  2377,
  2381,
  2383,
  2389,
  2393,
  2399,
  2411,
  2417,
  2423,
  2437,
  2441,
  2447,
  2459,
  2467,
  2473,
  2477,
  2503,
  2521,
  2531,
  2539,
  2543,
  2549,
  2551,
  2557,
  2579,
  2591,
  2593,
  2609,
  2617,
  2621,
  2633,
  2647,
  2657,
  2659,
  2663,
  2671,
  2677,
  2683,
  2687,
  2689,
  2693,
  2699,
  2707,
  2711,
  2713,
  2719,
  2729,
  2731,
  2741,
  2749,
  2753,
  2767,
  2777,
  2789,
  2791,
  2797,
  2801,
  2803,
  2819,
  2833,
  2837,
  2843,
  2851,
  2857,
  2861,
  2879,
  2887,
  2897,
  2903,
  2909,
  2917,
  2927,
  2939,
  2953,
  2957,
  2963,
  2969,
  2971,
  2999,
  3001,
  3011,
  3019,
  3023,
  3037,
  3041,
  3049,
  3061,
  3067,
  3079,
  3083,
  3089,
  3109,
  3119,
  3121,
  3137,
  3163,
  3167,
  3169,
  3181,
  3187,
  3191,
  3203,
  3209,
  3217,
  3221,
  3229,
  3251,
  3253,
  3257,
  3259,
  3271,
  3299,
  3301,
  3307,
  3313,
  3319,
  3323,
  3329,
  3331,
  3343,
  3347,
  3359,
  3361,
  3371,
  3373,
  3389,
  3391,
  3407,
  3413,
  3433,
  3449,
  3457,
  3461,
  3463,
  3467,
  3469,
  3491,
  3499,
  3511,
  3517,
  3527,
  3529,
  3533,
  3539,
  3541,
  3547,
  3557,
  3559,
  3571,
  3581,
  3583,
  3593,
  3607,
  3613,
  3617,
  3623,
  3631,
  3637,
  3643,
  3659,
  3671,
  3673,
  3677,
  3691,
  3697,
  3701,
  3709,
  3719,
  3727,
  3733,
  3739,
  3761,
  3767,
  3769,
  3779,
  3793,
  3797,
  3803,
  3821,
  3823,
  3833,
  3847,
  3851,
  3853,
  3863,
  3877,
  3881,
  3889,
  3907,
  3911,
  3917,
  3919,
  3923,
  3929,
  3931,
  3943,
  3947,
  3967,
  3989,
  4001,
  4003,
  4007,
  4013,
  4019,
  4021,
  4027,
  4049,
  4051,
  4057,
  4073,
  4079,
  4091,
  4093,
  4099,
  4111,
  4127,
  4129,
  4133,
  4139,
  4153,
  4157,
  4159,
  4177,
  4201,
  4211,
  4217,
  4219,
  4229,
  4231,
  4241,
  4243,
  4253,
  4259,
  4261,
  4271,
  4273,
  4283,
  4289,
  4297,
  4327,
  4337,
  4339,
  4349,
  4357,
  4363,
  4373,
  4391,
  4397,
  4409,
  4421,
  4423,
  4441,
  4447,
  4451,
  4457,
  4463,
  4481,
  4483,
  4493,
  4507,
  4513,
  4517,
  4519,
  4523,
  4547,
  4549,
  4561,
  4567,
  4583,
  4591,
  4597,
  4603,
  4621,
  4637,
  4639,
  4643,
  4649,
  4651,
  4657,
  4663,
  4673,
  4679,
  4691,
  4703,
  4721,
  4723,
  4729,
  4733,
  4751,
  4759,
  4783,
  4787,
  4789,
  4793,
  4799,
  4801,
  4813,
  4817,
  4831,
  4861,
  4871,
  4877,
  4889,
  4903,
  4909,
  4919,
  4931,
  4933,
  4937,
  4943,
  4951,
  4957,
  4967,
  4969,
  4973,
  4987,
  4993,
  4999,
  5003,
  5009,
  5011,
  5021,
  5023,
  5039,
  5051,
  5059,
  5077,
  5081,
  5087,
  5099,
  5101,
  5107,
  5113,
  5119,
  5147,
  5153,
  5167,
  5171,
  5179,
  5189,
  5197,
  5209,
  5227,
  5231,
  5233,
  5237,
  5261,
  5273,
  5279,
  5281,
  5297,
  5303,
  5309,
  5323,
  5333,
  5347,
  5351,
  5381,
  5387,
  5393,
  5399,
  5407,
  5413,
  5417,
  5419,
  5431,
  5437,
  5441,
  5443,
  5449,
  5471,
  5477,
  5479,
  5483,
  5501,
  5503,
  5507,
  5519,
  5521,
  5527,
  5531,
  5557,
  5563,
  5569,
  5573,
  5581,
  5591,
  5623,
  5639,
  5641,
  5647,
  5651,
  5653,
  5657,
  5659,
  5669,
  5683,
  5689,
  5693,
  5701,
  5711,
  5717,
  5737,
  5741,
  5743,
  5749,
  5779,
  5783,
  5791,
  5801,
  5807,
  5813,
  5821,
  5827,
  5839,
  5843,
  5849,
  5851,
  5857,
  5861,
  5867,
  5869,
  5879,
  5881,
  5897,
  5903,
  5923,
  5927,
  5939,
  5953,
  5981,
  5987,
  6007,
  6011,
  6029,
  6037,
  6043,
  6047,
  6053,
  6067,
  6073,
  6079,
  6089,
  6091,
  6101,
  6113,
  6121,
  6131,
  6133,
  6143,
  6151,
  6163,
  6173,
  6197,
  6199,
  6203,
  6211,
  6217,
  6221,
  6229,
  6247,
  6257,
  6263,
  6269,
  6271,
  6277,
  6287,
  6299,
  6301,
  6311,
  6317,
  6323,
  6329,
  6337,
  6343,
  6353,
  6359,
  6361,
  6367,
  6373,
  6379,
  6389,
  6397,
  6421,
  6427,
  6449,
  6451,
  6469,
  6473,
  6481,
  6491,
  6521,
  6529,
  6547,
  6551,
  6553,
  6563,
  6569,
  6571,
  6577,
  6581,
  6599,
  6607,
  6619,
  6637,
  6653,
  6659,
  6661,
  6673,
  6679,
  6689,
  6691,
  6701,
  6703,
  6709,
  6719,
  6733,
  6737,
  6761,
  6763,
  6779,
  6781,
  6791,
  6793,
  6803,
  6823,
  6827,
  6829,
  6833,
  6841,
  6857,
  6863,
  6869,
  6871,
  6883,
  6899,
  6907,
  6911,
  6917,
  6947,
  6949,
  6959,
  6961,
  6967,
  6971,
  6977,
  6983,
  6991,
  6997,
  7001,
  7013,
  7019,
  7027,
  7039,
  7043,
  7057,
  7069,
  7079,
  7103,
  7109,
  7121,
  7127,
  7129,
  7151,
  7159,
  7177,
  7187,
  7193,
  7207,
  7211,
  7213,
  7219,
  7229,
  7237,
  7243,
  7247,
  7253,
  7283,
  7297,
  7307,
  7309,
  7321,
  7331,
  7333,
  7349,
  7351,
  7369,
  7393,
  7411,
  7417,
  7433,
  7451,
  7457,
  7459,
  7477,
  7481,
  7487,
  7489,
  7499,
  7507,
  7517,
  7523,
  7529,
  7537,
  7541,
  7547,
  7549,
  7559,
  7561,
  7573,
  7577,
  7583,
  7589,
  7591,
  7603,
  7607,
  7621,
  7639,
  7643,
  7649,
  7669,
  7673,
  7681,
  7687,
  7691,
  7699,
  7703,
  7717,
  7723,
  7727,
  7741,
  7753,
  7757,
  7759,
  7789,
  7793,
  7817,
  7823,
  7829,
  7841,
  7853,
  7867,
  7873,
  7877,
  7879,
  7883,
  7901,
  7907,
  7919
]);
var LARGEST_SMALL_PRIME = 7919;
function primeFactors(n) {
  console.assert(
    Number.isInteger(n) && n >= 0 && n < Number.MAX_SAFE_INTEGER,
    n
  );
  if (n <= 3)
    return { [n]: 1 };
  const result = {};
  let count = 0;
  while (n % 2 === 0) {
    count += 1;
    n /= 2;
  }
  if (count > 0)
    result[2] = count;
  count = 0;
  while (n % 3 === 0) {
    count += 1;
    n /= 3;
  }
  if (count > 0)
    result[3] = count;
  let done = false;
  while (!done) {
    if (n === 1)
      return result;
    const sr = Math.sqrt(n);
    done = true;
    for (let i = 6; i <= sr + 6; i += 6) {
      if (n % (i - 1) === 0) {
        result[i - 1] = (result[i - 1] ?? 0) + 1;
        n /= i - 1;
        done = false;
        break;
      }
      if (n % (i + 1) === 0) {
        result[i + 1] = (result[i + 1] ?? 0) + 1;
        n /= i + 1;
        done = false;
        break;
      }
    }
  }
  if (result[n] !== void 0)
    result[n] += 1;
  else
    result[n] = 1;
  return result;
}
function factorPower(n, exponent) {
  if (n >= Number.MAX_SAFE_INTEGER)
    return [1, n];
  console.assert(Number.isInteger(n) && n > 0 && n < Number.MAX_SAFE_INTEGER);
  const factors = primeFactors(n);
  let f = 1;
  let r = 1;
  for (const k of Object.keys(factors)) {
    const v = parseInt(k);
    f = f * Math.pow(v, Math.floor(factors[k] / exponent));
    r = r * Math.pow(v, factors[k] % exponent);
  }
  return [f, r];
}
function gcd(a, b) {
  if (a === 0)
    return b;
  if (b === 0)
    return a;
  if (a === b)
    return a;
  if (!Number.isInteger(a) || !Number.isInteger(b))
    return NaN;
  while (b !== 0)
    [a, b] = [b, a % b];
  return a < 0 ? -a : a;
}
function lcm(a, b) {
  return a * b / gcd(a, b);
}
function factorial(n) {
  if (!Number.isInteger(n) || n < 0)
    return NaN;
  let val = 1;
  for (let i = 2; i <= n; i++)
    val = val * i;
  return val;
}
function factorial2(n) {
  if (!Number.isInteger(n) || n < 0)
    return NaN;
  if (n < 0)
    return NaN;
  if (n <= 1)
    return 1;
  let result = n;
  while (n > 2) {
    n -= 2;
    result *= n;
  }
  return result;
}
var gammaG = 7;
var lanczos_7_c = [
  0.9999999999998099,
  676.5203681218851,
  -1259.1392167224028,
  771.3234287776531,
  -176.6150291621406,
  12.507343278686905,
  -0.13857109526572012,
  9984369578019572e-21,
  15056327351493116e-23
];
function gammaln(z) {
  if (z < 0)
    return NaN;
  const pi = Math.PI;
  const z3 = z * z * z;
  return z * Math.log(z) - z - 0.5 * Math.log(z) + 0.5 * Math.log(2 * pi) + 1 / (12 * z) - 1 / (360 * z3) + 1 / (1260 * z3 * z * z);
}
function gamma(z) {
  if (z < 0.5)
    return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
  if (z > 100)
    return Math.exp(gammaln(z));
  z -= 1;
  let x = lanczos_7_c[0];
  for (let i = 1; i < gammaG + 2; i++)
    x += lanczos_7_c[i] / (z + i);
  const t = z + gammaG + 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}
function asFloat(expr) {
  if (expr === void 0 || expr === null)
    return null;
  const num = expr.numericValue;
  if (num === null)
    return null;
  if (typeof num === "number")
    return num;
  if (num instanceof Decimal)
    return num.toNumber();
  if (Array.isArray(num)) {
    const [n, d] = num;
    if (typeof n === "number" && typeof d === "number")
      return n / d;
    return Number(n) / Number(d);
  }
  console.assert(!(num instanceof import_complex.Complex) || num.im !== 0);
  return null;
}
function asBignum(expr) {
  if (expr === void 0 || expr === null)
    return null;
  const num = expr.numericValue;
  if (num === null)
    return null;
  if (num instanceof Decimal)
    return num;
  if (typeof num === "number")
    return expr.engine.bignum(num);
  if (Array.isArray(num)) {
    const [n, d] = num;
    if (typeof n === "number" && typeof d === "number")
      return expr.engine.bignum(n / d);
    return expr.engine.bignum(n).div(d.toString());
  }
  console.assert(!(num instanceof import_complex.Complex) || num.im !== 0);
  return null;
}
function asSmallInteger(expr) {
  if (expr === void 0 || expr === null)
    return null;
  const num = expr.numericValue;
  if (num === null)
    return null;
  if (typeof num === "number") {
    if (Number.isInteger(num) && num >= -SMALL_INTEGER && num <= SMALL_INTEGER)
      return num;
    return null;
  }
  if (num instanceof Decimal) {
    if (num.isInteger()) {
      const n = num.toNumber();
      if (n >= -SMALL_INTEGER && n <= SMALL_INTEGER)
        return n;
    }
    return null;
  }
  if (expr.isCanonical)
    return null;
  const r = num;
  if (Array.isArray(r)) {
    const [n, d] = r;
    let v;
    if (typeof n === "number" && typeof d === "number")
      v = n / d;
    else
      v = Number(n) / Number(d);
    if (Number.isInteger(v) && v >= -SMALL_INTEGER && v <= SMALL_INTEGER)
      return v;
    return null;
  }
  return null;
}
function chop(n, tolerance) {
  if (typeof n === "number" && Math.abs(n) <= tolerance)
    return 0;
  if (n instanceof Decimal && n.abs().lte(tolerance))
    return 0;
  if (n instanceof import_complex.Complex && Math.abs(n.re) <= tolerance && Math.abs(n.im) <= tolerance)
    return 0;
  return n;
}
function erf(x) {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const sign2 = x < 0 ? -1 : 1;
  x = Math.abs(x);
  const t = 1 / (1 + p * x);
  const y = ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t;
  return sign2 * (1 - y * Math.exp(-x * x));
}
function erfInv(x) {
  const pi = Math.PI;
  const pi2 = pi * pi;
  const pi3 = pi2 * pi;
  const x2 = x * x;
  const x3 = x * x2;
  const x5 = x3 * x2;
  const x7 = x5 * x2;
  return Math.sqrt(pi) / 2 * (x + pi / 12 * x3 + 7 * pi2 / 480 * x5 + 127 * pi3 / 40320 * x7 + 4369 * pi2 * pi2 / 5806080 * x7 * x2 + 34807 * pi3 * pi2 / 182476800 * x7 * x2 * x2);
}
function centeredDiff8thOrder(f, x, h = 0.1) {
  return (f(x - 4 * h) / 280 - 4 * f(x - 3 * h) / 105 + f(x - 2 * h) / 5 - 4 * f(x - h) / 5 + 4 * f(x + h) / 5 - f(x + 2 * h) / 5 + 4 * f(x + 3 * h) / 105 - f(x + 4 * h) / 280) / h;
}
function monteCarloEstimate(f, a, b, n = 1e5) {
  let sum2 = 0;
  if (a === -Infinity && b === Infinity) {
    for (let i = 0; i < n; i++) {
      const u = Math.random();
      const x = Math.tan(Math.PI * (u - 0.5));
      const jacobian = Math.PI * (1 + x * x);
      sum2 += f(x) / jacobian;
    }
  } else if (a === -Infinity) {
    for (let i = 0; i < n; i++) {
      const u = Math.random();
      const x = b - Math.log(1 - u);
      const jacobian = 1 / (1 - u);
      sum2 += f(x) / jacobian;
    }
  } else if (b === Infinity) {
    for (let i = 0; i < n; i++) {
      const u = Math.random();
      const x = a + Math.log(u);
      const jacobian = 1 / u;
      sum2 += f(x) / jacobian;
    }
  } else {
    for (let i = 0; i < n; i++)
      sum2 += f(a + Math.random() * (b - a));
  }
  return sum2 / n * (b - a);
}
function limit(f, x, dir = 1) {
  if (dir === 0) {
    const left = limit(f, x, -1);
    const right = limit(f, x, 1);
    if (left === void 0 || right === void 0)
      return NaN;
    if (Math.abs(left - right) > 1e-5)
      return NaN;
    return (left + right) / 2;
  }
  const [val, err] = extrapolate(f, x, { step: dir > 0 ? 1 : -1 });
  return val;
}
function fromRoman(roman) {
  if (roman === "N")
    return [0, ""];
  const romanMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1e3
  };
  let total = 0;
  let prevValue = 0;
  roman = roman.toUpperCase();
  for (let i = roman.length - 1; i >= 0; i--) {
    const currentValue = romanMap[roman[i]];
    if (currentValue === void 0)
      return [total, roman.slice(i)];
    if (currentValue < prevValue)
      total -= currentValue;
    else
      total += currentValue;
    prevValue = currentValue;
  }
  return [total, ""];
}
function fromDigits(s, baseInput) {
  s = s.trim();
  if (s.length === 0)
    return [NaN, ""];
  if (s.startsWith("+"))
    return fromDigits(s.slice(1), baseInput);
  if (s.startsWith("-")) {
    const [v, r] = fromDigits(s.slice(1), baseInput);
    return [-v, r];
  }
  let base = 10;
  if (typeof baseInput === "string")
    baseInput = baseInput.toLowerCase();
  if (s.startsWith("0x")) {
    base = 16;
    s = s.slice(2);
  } else if (s.startsWith("0b")) {
    base = 2;
    s = s.slice(2);
  } else if (baseInput === "roman") {
    return fromRoman(s);
  } else if (baseInput === "base64" || baseInput === "base-64") {
    try {
      return [parseInt(btoa(s)), ""];
    } catch (e) {
      return [NaN, ""];
    }
  } else if (typeof baseInput === "number") {
    base = baseInput;
  } else if (typeof baseInput === "string") {
    base = parseInt(baseInput);
  }
  let value = 0;
  for (let i = 0; i < s.length; i++) {
    const k = {
      " ": -1,
      "\xA0": -1,
      // NBS
      "\u2000": -1,
      // EN QUAD
      "\u2001": -1,
      // EM QUAD
      "\u2002": -1,
      // EN SPACE
      "\u2003": -1,
      // EM SPACE
      "\u2004": -1,
      // THREE-PER-EM SPACE
      "\u2005": -1,
      // FOUR-PER-EM SPACE
      "\u2006": -1,
      // SIX-PER-EM SPACE
      "\u2007": -1,
      // FIGURE SPACE
      "\u2008": -1,
      // PUNCTUATION SPACE
      "\u2009": -1,
      // THIN SPACE
      "\u200A": -1,
      // HAIR SPACE
      "\u200B": -1,
      // ZWS
      "\u202F": -1,
      // NARROW NBS
      "\u205F": -1,
      // MEDIUM MATHEMATICAL SPACE
      "_": -1,
      ",": -1,
      "0": 0,
      "1": 1,
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 6,
      "7": 7,
      "8": 8,
      "9": 9,
      "a": 10,
      "b": 11,
      "c": 12,
      "d": 13,
      "e": 14,
      "f": 15,
      "g": 16,
      "h": 17,
      "i": 18,
      "j": 19,
      "k": 20,
      "l": 21,
      "m": 22,
      "n": 23,
      "o": 24,
      "p": 25,
      "q": 26,
      "r": 27,
      "s": 28,
      "t": 29,
      "u": 30,
      "v": 31,
      "w": 32,
      "x": 33,
      "y": 34,
      "z": 35
    }[s[i]];
    if (k !== -1) {
      if (k === void 0)
        return [value, s.substring(i)];
      if (k >= base)
        return [value, s.substring(i)];
      value = value * base + k;
    }
  }
  return [value, ""];
}

// src/compute-engine/numerics/numeric-bigint.ts
function bigint(a) {
  if (typeof a === "bigint")
    return a;
  if (a instanceof decimal_default)
    return bigint(a.toString());
  let s = a.toString();
  const m = s.match(/([^\.]+)(?:\.([0-9]+))?e(.+)$/);
  if (m) {
    s = m[1] + (m[2] ?? "") + "0".repeat(parseInt(m[3]) - (m[2] ? m[2].length : 0));
  }
  return BigInt(s);
}
function gcd2(a, b) {
  while (b !== BigInt(0))
    [a, b] = [b, a % b];
  return a < 0 ? -a : a;
}
var PRIME_WHEEL_INC = [
  BigInt(4),
  BigInt(2),
  BigInt(4),
  BigInt(2),
  BigInt(4),
  BigInt(6),
  BigInt(2),
  BigInt(6)
];
function primeFactors2(d) {
  if (d < Number.MAX_SAFE_INTEGER) {
    const factors = primeFactors(Number(d));
    const result2 = /* @__PURE__ */ new Map();
    for (const f of Object.keys(factors))
      result2.set(bigint(f), factors[f]);
    return result2;
  }
  let n = d;
  const result = /* @__PURE__ */ new Map();
  let count2 = 0;
  let count3 = 0;
  let count5 = 0;
  let k = BigInt(10);
  while (n % k === BigInt(0)) {
    count2 += 1;
    count5 += 1;
    n = n / k;
  }
  k = BigInt(5);
  while (n % k === BigInt(0)) {
    count5 += 1;
    n = n / k;
  }
  k = BigInt(3);
  while (n % k === BigInt(0)) {
    count3 += 1;
    n = n / k;
  }
  k = BigInt(2);
  while (n % k === BigInt(0)) {
    count2 += 1;
    n = n / k;
  }
  if (count2 > 0)
    result.set("2", count2);
  if (count3 > 0)
    result.set("3", count3);
  if (count5 > 0)
    result.set("5", count5);
  k = BigInt(7);
  let kIndex = "";
  let i = 0;
  while (k * k < n) {
    if (n % k === BigInt(0)) {
      if (!kIndex)
        kIndex = k.toString();
      result.set(kIndex, (result.get(kIndex) ?? 0) + 1);
      n = n / k;
    } else {
      k = k + PRIME_WHEEL_INC[i];
      kIndex = "";
      i = i < 7 ? i + 1 : 0;
    }
  }
  if (n !== BigInt(1))
    result.set(n.toString(), (result.get(n.toString()) ?? 0) + 1);
  const r = /* @__PURE__ */ new Map();
  for (const [k2, v] of result)
    r.set(bigint(k2), v);
  return r;
}
function factorPower2(n, exponent) {
  const factors = primeFactors2(n);
  let f = BigInt(1);
  let r = BigInt(1);
  const exp2 = bigint(exponent);
  for (const [k, v] of factors) {
    const v2 = bigint(v);
    f = f * k ** (v2 / exp2);
    r = r * k ** (v2 % exp2);
  }
  return [f, r];
}

// src/compute-engine/numerics/rationals.ts
function isRational(x) {
  return x !== null && Array.isArray(x);
}
function isMachineRational(x) {
  return x !== null && Array.isArray(x) && typeof x[0] === "number";
}
function isBigRational(x) {
  return x !== null && Array.isArray(x) && typeof x[0] === "bigint";
}
function isRationalZero(x) {
  return x[0] == 0;
}
function isRationalOne(x) {
  return x[0] === x[1];
}
function isRationalNegativeOne(x) {
  return x[0] === -x[1];
}
function machineNumerator(x) {
  return Number(x[0]);
}
function machineDenominator(x) {
  return Number(x[1]);
}
function isNeg(x) {
  return x[0] < 0;
}
function neg(x) {
  return [-x[0], x[1]];
}
function inverse(x) {
  return x[0] < 0 ? [-x[1], -x[0]] : [x[1], x[0]];
}
function asRational(expr) {
  const num = expr.numericValue;
  if (num === null)
    return void 0;
  if (Array.isArray(num))
    return num;
  if (typeof num === "number" && Number.isInteger(num))
    return [num, 1];
  if (num instanceof Decimal && num.isInteger())
    return [bigint(num), BigInt(1)];
  return void 0;
}
function asMachineRational(r) {
  return [Number(r[0]), Number(r[1])];
}
function add2(lhs, rhs) {
  console.assert(
    Array.isArray(rhs) || rhs.numericValue !== null && !(rhs instanceof import_complex2.Complex)
  );
  if (typeof lhs[0] === "number" && !Number.isFinite(lhs[0]))
    return lhs;
  const rhsNum = Array.isArray(rhs) ? rhs : rhs.numericValue;
  if (rhsNum === null)
    return lhs;
  if (Array.isArray(rhsNum)) {
    if (isBigRational(rhsNum)) {
      lhs = [bigint(lhs[0]), bigint(lhs[1])];
      return [rhsNum[1] * lhs[0] + rhsNum[0] * lhs[1], rhsNum[1] * lhs[1]];
    }
    if (!Number.isFinite(rhsNum[0]))
      return rhsNum;
    if (isBigRational(lhs)) {
      const bigRhs = [bigint(rhsNum[0]), bigint(rhsNum[1])];
      return [bigRhs[1] * lhs[0] + bigRhs[0] * lhs[1], bigRhs[1] * lhs[1]];
    }
    return [rhsNum[1] * lhs[0] + rhsNum[0] * lhs[1], rhsNum[1] * lhs[1]];
  }
  if (rhsNum instanceof Decimal) {
    if (rhsNum.isNaN())
      return [Number.NaN, 1];
    if (!rhsNum.isFinite())
      return [rhsNum.isNegative() ? -Infinity : Infinity, 1];
    console.assert(rhsNum.isInteger());
    if (isMachineRational(lhs))
      lhs = [bigint(lhs[0]), bigint(lhs[1])];
    return [lhs[0] + lhs[1] * bigint(rhsNum.toString()), lhs[1]];
  }
  if (rhsNum instanceof import_complex2.Complex)
    return [Number.NaN, 1];
  console.assert(!Number.isFinite(rhsNum) || Number.isInteger(rhsNum));
  if (!Number.isFinite(rhsNum))
    return [rhsNum, 1];
  if (isMachineRational(lhs))
    return [lhs[0] + lhs[1] * rhsNum, lhs[1]];
  return [lhs[0] + lhs[1] * bigint(rhsNum), lhs[1]];
}
function mul2(lhs, rhs) {
  console.assert(
    Array.isArray(rhs) || rhs.numericValue !== null && !(rhs instanceof import_complex2.Complex)
  );
  if (Array.isArray(rhs)) {
    if (isMachineRational(lhs) && isMachineRational(rhs))
      return [lhs[0] * rhs[0], lhs[1] * rhs[1]];
    if (isMachineRational(lhs))
      lhs = [bigint(lhs[0]), bigint(lhs[1])];
    if (isMachineRational(rhs))
      rhs = [bigint(rhs[0]), bigint(rhs[1])];
    return [lhs[0] * rhs[0], lhs[1] * rhs[1]];
  }
  const rhsNum = rhs.numericValue;
  if (rhsNum !== null && typeof rhsNum === "number") {
    console.assert(Number.isInteger(rhsNum));
    if (isMachineRational(lhs))
      return [lhs[0] * rhsNum, lhs[1]];
    return [lhs[0] * bigint(rhsNum), lhs[1]];
  }
  if (rhsNum instanceof Decimal) {
    console.assert(rhsNum.isInteger());
    if (isMachineRational(lhs))
      return [bigint(rhsNum.toString()) * bigint(lhs[0]), bigint(lhs[1])];
    return [bigint(rhsNum.toString()) * lhs[0], lhs[1]];
  }
  if (Array.isArray(rhsNum)) {
    if (isBigRational(rhsNum))
      return [rhsNum[0] * bigint(lhs[0]), rhsNum[1] * bigint(lhs[1])];
    else if (isMachineRational(lhs))
      return [lhs[0] * rhsNum[0], lhs[1] * rhsNum[1]];
    return [lhs[0] * bigint(rhsNum[0]), lhs[1] * bigint(rhsNum[1])];
  }
  debugger;
  return lhs;
}
function pow2(r, exp2) {
  console.assert(Number.isInteger(exp2));
  if (exp2 === 0)
    return [1, 1];
  if (exp2 < 0) {
    r = inverse(r);
    exp2 = -exp2;
  }
  if (exp2 === 1)
    return r;
  if (isMachineRational(r))
    return [Math.pow(r[0], exp2), Math.pow(r[1], exp2)];
  const bigexp = bigint(exp2);
  return [r[0] ** bigexp, r[1] ** bigexp];
}
function reducedRational(r) {
  if (isMachineRational(r)) {
    if (r[0] === 1 || r[1] === 1)
      return r;
    if (r[1] < 0)
      r = [-r[0], -r[1]];
    if (!Number.isFinite(r[1]))
      return [0, 1];
    const g2 = gcd(r[0], r[1]);
    return g2 <= 1 ? r : [r[0] / g2, r[1] / g2];
  }
  if (r[0] === BigInt(1) || r[1] === BigInt(1))
    return r;
  if (r[1] < 0)
    r = [-r[0], -r[1]];
  const g = gcd2(r[0], r[1]);
  if (g <= 1)
    return r;
  return [r[0] / g, r[1] / g];
}
function rationalize(x) {
  if (!Number.isFinite(x))
    return x;
  const fractional = x % 1;
  if (fractional === 0)
    return x;
  const eps = 1e-15;
  let a = Math.floor(x);
  let h1 = 1;
  let k1 = 0;
  let h = a;
  let k = 1;
  while (x - a > eps * k * k) {
    x = 1 / (x - a);
    a = Math.floor(x);
    const h2 = h1;
    h1 = h;
    const k2 = k1;
    k1 = k;
    h = h2 + a * h1;
    k = k2 + a * k1;
  }
  return [h, k];
}
function asCoefficient(expr) {
  console.assert(expr.isCanonical);
  const ce = expr.engine;
  if (expr.head === "Multiply") {
    const rest = [];
    let coef = [1, 1];
    for (const arg of expr.ops) {
      const n2 = arg.numericValue;
      if (n2 !== null && (typeof n2 === "number" && Number.isInteger(n2) || n2 instanceof Decimal && n2.isInteger() || isRational(n2)))
        coef = mul2(coef, arg);
      else
        rest.push(arg);
    }
    coef = reducedRational(coef);
    if (isRationalOne(coef))
      return [[1, 1], expr];
    if (rest.length === 0)
      return [coef, ce.One];
    if (rest.length === 1)
      return [coef, rest[0]];
    return [coef, ce.mul(rest)];
  }
  if (expr.head === "Divide") {
    let [coef1, numer] = asCoefficient(expr.op1);
    const [coef2, denom] = asCoefficient(expr.op2);
    const coef = reducedRational(mul2(coef1, inverse(coef2)));
    if (denom.isOne)
      return [coef, numer];
    return [coef, ce.div(numer, denom)];
  }
  if (expr.head === "Power") {
    if (expr.op2.numericValue === null)
      return [[1, 1], expr];
    let [coef, base] = asCoefficient(expr.op1);
    if (isRationalOne(coef))
      return [[1, 1], expr];
    const exponent = expr.op2;
    const e = asSmallInteger(exponent);
    if (e === -1)
      return [inverse(coef), ce.inv(base)];
    if (e !== null)
      return [pow2(coef, e), ce.pow(base, exponent)];
    if (exponent.numericValue !== null && Array.isArray(exponent.numericValue)) {
      const [en, ed] = asMachineRational(exponent.numericValue);
      const [numer, denom] = asMachineRational(coef);
      if (numer > 0 && Math.abs(en) === 1) {
        const [nCoef, nRest] = factorPower(numer, ed);
        const [dCoef, dRest] = factorPower(denom, ed);
        if (nCoef === 1 && dCoef === 1)
          return [[1, 1], expr];
        return [
          en === 1 ? [nCoef, dCoef] : [dCoef, nCoef],
          ce.pow(ce.mul([ce.number([nRest, dRest]), base]), exponent)
        ];
      }
    }
    return [[1, 1], expr];
  }
  if (expr.head === "Add") {
  }
  if (expr.head === "Negate") {
    const [coef, rest] = asCoefficient(expr.op1);
    return [neg(coef), rest];
  }
  const n = expr.numericValue;
  if (n !== null) {
    if (n instanceof Decimal) {
      if (n.isInteger())
        return [[bigint(n.toString()), BigInt(1)], ce.One];
      if (n.isNegative())
        return [[-1, 1], ce.number(n.neg())];
    }
    if (typeof n === "number") {
      if (Number.isInteger(n))
        return [[n, 1], ce.One];
      if (n < 0)
        return [[-1, 1], ce.number(-n)];
    }
    if (isRational(n))
      return [n, ce.One];
    if (n instanceof import_complex2.Complex && n.re < 0)
      return [[-1, 1], ce.number(ce.complex(-n.re, -n.im))];
  }
  return [[1, 1], expr];
}
function signDiff(lhs, rhs, tolerance) {
  if (lhs === rhs)
    return 0;
  const lhsN = lhs.N();
  const rhsN = rhs.N();
  const lhsNum = lhsN.numericValue;
  const rhsNum = rhsN.numericValue;
  if (lhsNum === null || rhsNum === null) {
    const lhsS = lhs.sgn;
    const rhsS = rhs.sgn;
    if (typeof lhsS !== "number" || typeof rhsS !== "number")
      return void 0;
    if (lhsS === 0 && rhsS === 0)
      return 0;
    if (lhsS < 0 && rhsS > 0)
      return -1;
    if (lhsS > 0 && rhsS < 0)
      return 1;
    return void 0;
  }
  tolerance ?? (tolerance = lhs.engine.tolerance);
  if (lhsNum instanceof import_complex2.Complex && rhsNum instanceof import_complex2.Complex)
    return chop(lhsNum.re - rhsNum.re, tolerance) === 0 && chop(lhsNum.im - rhsNum.im, tolerance) === 0 ? 0 : void 0;
  if (lhsNum instanceof import_complex2.Complex || rhsNum instanceof import_complex2.Complex)
    return void 0;
  if (isRational(lhsNum) || isRational(rhsNum))
    return void 0;
  if (typeof lhsNum === "number" && typeof rhsNum === "number") {
    if (chop(rhsNum - lhsNum, tolerance) === 0)
      return 0;
    return lhsNum < rhsNum ? -1 : 1;
  }
  const ce = lhs.engine;
  const delta = ce.bignum(rhsNum).sub(ce.bignum(lhsNum));
  if (chop(delta, tolerance) === 0)
    return 0;
  return delta.isPos() ? 1 : -1;
}

// src/compute-engine/domain-utils.ts
function inferNumericDomain(value) {
  if (typeof value === "number" && !isNaN(value)) {
    if (!isFinite(value))
      return "ExtendedRealNumbers";
    if (Number.isInteger(value)) {
      if (value > 0)
        return "PositiveIntegers";
      if (value < 0)
        return "NegativeIntegers";
      return "Integers";
    }
    if (value > 0)
      return "PositiveNumbers";
    if (value < 0)
      return "NegativeNumbers";
    return "RealNumbers";
  }
  if (value instanceof Decimal) {
    if (value.isNaN())
      return "Numbers";
    if (!value.isFinite())
      return "ExtendedRealNumbers";
    if (value.isInteger()) {
      if (value.isPositive())
        return "PositiveIntegers";
      if (value.isNegative())
        return "NegativeIntegers";
      return "Integers";
    }
    if (value.isPositive())
      return "PositiveNumbers";
    if (value.isNegative())
      return "NegativeNumbers";
    return "RealNumbers";
  }
  if (value instanceof import_complex3.Complex) {
    const c = value;
    console.assert(c.im !== 0);
    if (c.re === 0)
      return "ImaginaryNumbers";
    return "ComplexNumbers";
  }
  if (isRational(value)) {
    const [numer, denom] = value;
    console.assert(
      typeof numer !== "number" || !Number.isNaN(numer) && !Number.isNaN(denom)
    );
    return "RationalNumbers";
  }
  return "Numbers";
}
function functionDomain(dom) {
  console.assert(dom.ctor === "FunctionOf");
  const ce = dom.engine;
  const allParams = dom.params;
  const params = [];
  const optParams = [];
  let restParam = void 0;
  const result = ce.domain(allParams[allParams.length - 1]);
  for (const arg of allParams.slice(0, -1)) {
    if (head(arg) === "OptArg") {
      if (optParams.length > 0)
        throw Error(`Unexpected multiple OptArg in domain ${dom}`);
      if (restParam)
        throw Error(`Unexpected OptArg after VarArg in domain ${dom}`);
      if (nops(arg) === 0)
        throw Error(`Unexpected empty OptArg in domain ${dom}`);
      for (const optParam of ops(arg)) {
        if (head(optParam) === "OptArg")
          throw Error(`Unexpected OptArg of OptArg in domain ${dom}`);
        if (head(optParam) === "VarArg")
          throw Error(
            `Unexpected superfluous OptArg of VarArg in domain ${dom}`
          );
        optParams.push(ce.domain(optParam));
      }
    } else if (head(arg) === "VarArg") {
      const params2 = ops(arg);
      if (params2.length !== 1)
        throw Error(`Invalid VarArg in domain ${dom}`);
      if (head(params2[0]) === "OptArg")
        throw Error(`Unexpectedf VarArg of OptArg in domain ${dom}`);
      if (head(params2[0]) === "VarArg")
        throw Error(`Unexpected VarArg of VarArg in domain ${dom}`);
      restParam = ce.domain(params2[0]);
    } else {
      if (optParams.length > 0)
        throw Error(
          `Unexpected required parameter after OptArg in domain ${dom}`
        );
      if (restParam)
        throw Error(
          `Unexpected required parameter after VarArg in domain ${dom}`
        );
      params.push(ce.domain(arg));
    }
  }
  return [params, optParams, restParam, result];
}
function domainToSignature(dom) {
  const [params, optParams, restParam, result] = functionDomain(dom);
  return {
    params: params.map((x) => x.json),
    optParams: optParams.map((x) => x.json),
    restParam: restParam?.json,
    result: result.json
  };
}
function signatureToDomain(ce, sig) {
  const fnParams = [...sig.params];
  if (sig.optParams.length > 0)
    fnParams.push(["OptArg", ...sig.optParams]);
  if (sig.restParam)
    fnParams.push(["VarArg", sig.restParam]);
  if (typeof sig.result === "function")
    fnParams.push(sig.result(ce, []) ?? ce.symbol("Undefined"));
  else
    fnParams.push(sig.result);
  return ce.domain(["FunctionOf", ...fnParams]);
}

// src/compute-engine/boxed-expression/utils.ts
var import_complex4 = __toESM(require_complex(), 1);
function isLatexString(s) {
  if (typeof s === "string")
    return s.startsWith("$") && s.endsWith("$");
  return false;
}
function latexString(s) {
  if (typeof s !== "string")
    return null;
  if (s.startsWith("$$") && s.endsWith("$$"))
    return s.slice(2, -2);
  if (s.startsWith("$") && s.endsWith("$"))
    return s.slice(1, -1);
  return null;
}
function getImaginaryCoef(expr) {
  if (expr.symbol === "ImaginaryUnit")
    return 1;
  const z = expr.numericValue;
  if (z !== null && z instanceof import_complex4.Complex && z.re === 0)
    return z.im;
  if (expr.head === "Negate") {
    const v = getImaginaryCoef(expr.op1);
    if (v === null)
      return null;
    return -v;
  }
  if (expr.head === "Multiply" && expr.nops === 2) {
    if (expr.op1.symbol === "ImaginaryUnit")
      return asFloat(expr.op2);
    if (expr.op2.symbol === "ImaginaryUnit")
      return asFloat(expr.op1);
  }
  return 0;
}
function getSymbols(expr, result) {
  if (expr.symbol) {
    result.add(expr.symbol);
    return;
  }
  if (expr.head && typeof expr.head !== "string")
    getSymbols(expr.head, result);
  if (expr.ops)
    for (const op3 of expr.ops)
      getSymbols(op3, result);
  if (expr.keys)
    for (const key of expr.keys)
      getSymbols(expr.getKey(key), result);
}
function getUnknowns(expr, result) {
  if (expr.symbol) {
    const def = expr.engine.lookupSymbol(expr.symbol);
    if (def && def.value !== void 0)
      return;
    const fnDef = expr.engine.lookupFunction(expr.symbol);
    if (fnDef && (fnDef.signature.evaluate || fnDef.signature.N))
      return;
    result.add(expr.symbol);
    return;
  }
  if (expr.head && typeof expr.head !== "string")
    getUnknowns(expr.head, result);
  if (expr.ops)
    for (const op3 of expr.ops)
      getUnknowns(op3, result);
  if (expr.keys)
    for (const key of expr.keys)
      getUnknowns(expr.getKey(key), result);
}
function getFreeVariables(expr, result) {
  if (expr.head === "Block") {
  }
  if (expr.symbol) {
    const def = expr.engine.lookupSymbol(expr.symbol);
    if (def && def.value !== void 0)
      return;
    const fnDef = expr.engine.lookupFunction(expr.symbol);
    if (fnDef && (fnDef.signature.evaluate || fnDef.signature.N))
      return;
    result.add(expr.symbol);
    return;
  }
  if (expr.head && typeof expr.head !== "string")
    getFreeVariables(expr.head, result);
  if (expr.ops)
    for (const op3 of expr.ops)
      getFreeVariables(op3, result);
  if (expr.keys)
    for (const key of expr.keys)
      getFreeVariables(expr.getKey(key), result);
}
function getSubexpressions(expr, head2) {
  const result = !head2 || expr.head === head2 ? [expr] : [];
  if (expr.ops) {
    for (const op3 of expr.ops)
      result.push(...getSubexpressions(op3, head2));
  } else if (expr.keys) {
    for (const op3 of expr.keys)
      result.push(...getSubexpressions(expr.getKey(op3), head2));
  }
  return result;
}
function bignumPreferred(ce) {
  return ce.numericMode === "bignum" || ce.numericMode === "auto";
}
function complexAllowed(ce) {
  return ce.numericMode === "auto" || ce.numericMode === "complex";
}
function hashCode(s) {
  let hash = 0;
  for (let i = 0; i < s.length; i++)
    hash = Math.imul(31, hash) + s.charCodeAt(i) | 0;
  return Math.abs(hash);
}
function bigintValue(ce, expr) {
  if (expr === null || expr === void 0)
    return null;
  if (typeof expr === "number")
    return Number.isInteger(expr) ? bigint(expr) : null;
  if (isNumberExpression(expr)) {
    const num = isNumberObject(expr) ? expr.num.toString() : expr;
    let s = num.toLowerCase().replace(/[nd]$/g, "").replace(/[\u0009-\u000d\u0020\u00a0]/g, "");
    if (/\([0-9]+\)/.test(s)) {
      const [_, body, repeat, trail] = s.match(/(.+)\(([0-9]+)\)(.*)$/) ?? [];
      s = body + repeat.repeat(Math.ceil(ce.precision / repeat.length)) + (trail ?? "");
    }
    if (s === "nan")
      return null;
    if (s === "infinity" || s === "+infinity")
      return null;
    if (s === "-infinity")
      return null;
    if (s.includes("."))
      return null;
    return bigint(s);
  }
  return null;
}
function asBigint(expr) {
  const num = expr.numericValue;
  if (num === null)
    return null;
  if (typeof num === "number" && Number.isInteger(num))
    return bigint(num);
  if (num instanceof Decimal && num.isInteger())
    return bigint(num);
  return null;
}

// src/compute-engine/rules.ts
function matchRules(expr, rules, sub2) {
  const results = [];
  for (const rule of rules) {
    const r = applyRule(rule, expr, sub2);
    if (r === null)
      continue;
    if (results.some((x) => x.isEqual(r)))
      continue;
    results.push(r);
  }
  return results;
}
function boxRules(ce, rs) {
  const result = /* @__PURE__ */ new Set();
  for (const { match: match2, replace: replace2, condition, priority, id } of rs) {
    let condFn;
    if (typeof condition === "string") {
      const latex = latexString(condition);
      if (latex) {
        const condPattern = ce.pattern(latex);
        condFn = (x, _ce) => condPattern.subs(x).evaluate()?.symbol === "True";
      }
    } else
      condFn = condition;
    result.add({
      match: ce.pattern(match2),
      replace: typeof replace2 === "function" ? replace2 : ce.pattern(replace2),
      priority: priority ?? 0,
      condition: condFn,
      id: id ?? ce.box(match2, { canonical: false }).toString() + (typeof replace2 === "function" ? "  ->  function" : "  ->  " + ce.box(replace2, { canonical: false }).toString())
    });
  }
  return result;
}
function applyRule({ match: match2, replace: replace2, condition, id }, expr, substitution, options) {
  const sub2 = match2.match(expr, { substitution, ...options });
  if (sub2 === null)
    return null;
  if (typeof condition === "function" && !condition(sub2, expr.engine))
    return null;
  if (typeof replace2 === "function")
    return replace2(expr, sub2);
  return replace2.subs(sub2, { canonical: true });
}
function replace(expr, ruleSet, options) {
  const iterationLimit = options?.iterationLimit ?? 1;
  let iterationCount = 0;
  const once = options?.once ?? false;
  let done = false;
  let atLeastOneRule = false;
  try {
    while (!done && iterationCount < iterationLimit) {
      done = true;
      for (const rule of ruleSet) {
        const result = applyRule(rule, expr, {}, options);
        if (result !== null && result !== expr) {
          if (once)
            return result;
          done = false;
          atLeastOneRule = true;
          expr = result;
        }
      }
      iterationCount += 1;
    }
  } catch (e) {
    console.error(e);
  }
  return atLeastOneRule ? expr : null;
}

// src/compute-engine/boxed-expression/order.ts
var import_complex5 = __toESM(require_complex(), 1);

// src/compute-engine/symbolic/polynomials.ts
function totalDegree(expr) {
  if (expr.head === "Power" && expr.op2.numericValue !== null) {
    const deg = asSmallInteger(expr.op2);
    if (deg !== null && deg > 0)
      return deg;
    return 1;
  }
  if (expr.head === "Multiply") {
    let deg = 1;
    for (const arg of expr.ops) {
      const t = totalDegree(arg);
      if (t > 1)
        deg = deg + t;
    }
    return deg;
  }
  return 1;
}
function maxDegree(expr) {
  if (expr.head === "Power" && expr.op2.numericValue !== null) {
    const deg = asSmallInteger(expr.op2);
    if (deg !== null && deg > 0)
      return deg;
    return 1;
  }
  if (expr.head === "Multiply") {
    let deg = 1;
    for (const arg of expr.ops)
      deg = Math.max(deg, totalDegree(arg));
    return deg;
  }
  return 1;
}
function lex(expr) {
  if (expr.symbol)
    return expr.symbol;
  if (expr.ops) {
    const h = typeof expr.head === "string" ? expr.head : lex(expr.head);
    return h + '"' + expr.ops.map((x) => lex(x)).filter((x) => x.length > 0).join('"');
  }
  return "";
}

// src/compute-engine/boxed-expression/order.ts
var DEFAULT_COMPLEXITY = 1e5;
function sortAdd(ops2) {
  return ops2.sort((a, b) => {
    const aLex = lex(a);
    const bLex = lex(b);
    if (!aLex && !bLex)
      return order(a, b);
    if (!aLex)
      return 1;
    if (!bLex)
      return -1;
    if (aLex < bLex)
      return -1;
    if (aLex > bLex)
      return 1;
    const aTotalDeg = totalDegree(a);
    const bTotalDeg = totalDegree(b);
    if (aTotalDeg !== bTotalDeg)
      return bTotalDeg - aTotalDeg;
    const aMaxDeg = maxDegree(a);
    const bMaxDeg = maxDegree(b);
    if (aMaxDeg !== bMaxDeg)
      return aMaxDeg - bMaxDeg;
    return order(a, b);
  });
}
function order(a, b) {
  if (a === b)
    return 0;
  if (a.numericValue !== null && a.numericValue === b.numericValue)
    return 0;
  const af = asFloat(a);
  if (af !== null) {
    const bf = asFloat(b);
    if (bf !== null)
      return af - bf;
    return -1;
  }
  if (a.numericValue instanceof import_complex5.Complex) {
    if (b.numericValue instanceof import_complex5.Complex) {
      if (a.numericValue.re === b.numericValue.re) {
        if (Math.abs(a.numericValue.im) === Math.abs(b.numericValue.im)) {
          return a.numericValue.im - b.numericValue.im;
        }
        return Math.abs(a.numericValue.im) - Math.abs(b.numericValue.im);
      }
      return a.numericValue.re - b.numericValue.re;
    }
    if (b.numericValue !== null)
      return 1;
    return -1;
  }
  if (a.numericValue) {
    if (b.numericValue) {
      return 1;
    }
    return -1;
  }
  if (a.head === "Sqrt" && a.op1.numericValue) {
    if (b.head === "Sqrt" && b.op1.numericValue)
      return order(a.op1, b.op1);
    return -1;
  }
  if (a.symbol) {
    if (b.symbol) {
      if (a.symbol === b.symbol)
        return 0;
      return a.symbol > b.symbol ? 1 : -1;
    }
    if (b.numericValue !== null)
      return 1;
    return -1;
  }
  if (a.ops) {
    if (b.ops) {
      const aComplexity = a.functionDefinition?.complexity ?? DEFAULT_COMPLEXITY;
      const bComplexity = b.functionDefinition?.complexity ?? DEFAULT_COMPLEXITY;
      if (aComplexity === bComplexity) {
        if (typeof a.head === "string" && typeof b.head === "string") {
          if (a.head === b.head) {
            return getLeafCount(a) - getLeafCount(b);
          }
          if (a.head < b.head)
            return 1;
          return -1;
        }
        return getLeafCount(a) - getLeafCount(b);
      }
      return aComplexity - bComplexity;
    }
    if (b.numericValue !== null || b.symbol)
      return 1;
    return -1;
  }
  if (a.string) {
    if (b.string) {
      if (a.string.length !== b.string.length)
        return b.string.length - a.string.length;
      if (b.string < a.string)
        return -1;
      if (a.string > b.string)
        return 1;
      return 0;
    }
    if (b.keys)
      return -1;
    return 1;
  }
  if (a.keys && b.keys) {
    if (a.keysCount !== b.keysCount)
      return b.keysCount - a.keysCount;
    let bComplexity = 0;
    let aComplexity = 0;
    for (const key of b.keys)
      bComplexity += b.getKey(key).complexity ?? DEFAULT_COMPLEXITY;
    for (const key of a.keys)
      aComplexity += a.getKey(key).complexity ?? DEFAULT_COMPLEXITY;
    return aComplexity - bComplexity;
  }
  return (a.complexity ?? DEFAULT_COMPLEXITY) - (b.complexity ?? DEFAULT_COMPLEXITY);
}
function canonicalOrder(expr, { recursive = false }) {
  if (expr.ops) {
    const ops2 = recursive ? expr.ops.map((x) => canonicalOrder(x, { recursive })) : expr.ops;
    if (expr.head === "Add")
      return expr.engine._fn("Add", sortAdd(ops2));
    return expr.engine._fn(expr.head, ops2.sort(order));
  }
  return expr;
}
function getLeafCount(expr) {
  if (expr.keys !== null)
    return 1 + expr.keysCount;
  if (!expr.ops)
    return 1;
  return (typeof expr.head === "string" ? 1 : getLeafCount(expr.head)) + [...expr.ops].reduce((acc, x) => acc + getLeafCount(x), 0);
}

// src/compute-engine/symbolic/flatten.ts
function flattenOps(ops2, head2) {
  if (!head2)
    return ops2;
  if (ops2.every((x) => !x.ops || x.head !== head2))
    return ops2;
  const result = [];
  for (const arg of ops2) {
    if (!arg.ops || arg.head !== head2)
      result.push(arg);
    else {
      result.push(...flattenOps(arg.ops, head2));
    }
  }
  console.assert(result.length !== ops2.length);
  if (result.length === ops2.length)
    return ops2;
  return result;
}
function flattenSequence(xs) {
  if (xs.every((x) => x.head !== "Sequence" && x.head !== "Delimiter"))
    return xs;
  const ys = [];
  for (const x of xs) {
    if (!x.isValid)
      ys.push(x);
    else if (x.head === "Delimiter") {
      const seq = x.op1.ops ?? [];
      if (seq.length === 0)
        ys.push(x.engine.box(["Tupple"]));
      else
        ys.push(...flattenSequence(seq));
    } else if (x.head === "Sequence") {
      if (x.ops)
        ys.push(...x.ops);
    } else
      ys.push(x);
  }
  return ys;
}
function flattenDelimiter(ce, body) {
  if (body === void 0)
    return ce._fn("Tuple", []);
  if (body.head === "Delimiter")
    return flattenDelimiter(ce, body.op1);
  if (body.head === "Sequence")
    return body;
  if (body.ops)
    return ce._fn("Tuple", body.ops);
  return body;
}

// src/compute-engine/symbolic/sum.ts
var import_complex6 = __toESM(require_complex(), 1);

// src/compute-engine/collection-utils.ts
function isCollection(col) {
  if (col.string !== null)
    return true;
  if ((col.symbolDefinition?.value?.string ?? null) !== null)
    return true;
  const def = col.functionDefinition ?? col.symbolDefinition?.value?.functionDefinition;
  return def?.iterator !== void 0;
}
function isIndexableCollection(col) {
  if (col.string !== null)
    return true;
  if ((col.symbolDefinition?.value?.string ?? null) !== null)
    return true;
  const def = col.functionDefinition ?? col.symbolDefinition?.value?.functionDefinition;
  return def?.at !== void 0;
}
function isFiniteIndexableCollection(col) {
  if (col.string !== null)
    return true;
  if ((col.symbolDefinition?.value?.string ?? null) !== null)
    return true;
  const def = col.functionDefinition ?? col.symbolDefinition?.value?.functionDefinition;
  if (!def)
    return false;
  return def.at !== void 0 && Number.isFinite(def.size?.(col) ?? Infinity);
}
function* each(col) {
  const iter = iterator(col);
  if (!iter) {
    yield col;
    return;
  }
  const limit2 = col.engine.iterationLimit;
  let i = 0;
  while (true) {
    const { done, value } = iter.next();
    if (done)
      return;
    if (i++ > limit2) {
      yield col.engine.error("iteration-limit-exceeded");
      return;
    }
    yield value;
  }
}
function iterator(expr) {
  const def = expr.functionDefinition ?? expr.symbolDefinition?.value?.functionDefinition;
  if (def?.iterator)
    return def.iterator(expr);
  const s = expr.string ?? expr.symbolDefinition?.value?.string ?? null;
  if (s !== null) {
    if (s.length === 0)
      return { next: () => ({ done: true, value: void 0 }) };
    let i = 0;
    return {
      next: () => ({
        value: expr.engine.string(s.charAt(i++)),
        done: i > s.length
      })
    };
  }
  return void 0;
}
function at(expr, index) {
  const def = expr.functionDefinition ?? expr.symbolDefinition?.value?.functionDefinition;
  if (def?.at)
    return def.at(expr, index);
  const s = expr.string;
  if (s) {
    if (index < 1)
      return expr.engine.string(s.charAt(s.length + index));
    return expr.engine.string(s.charAt(index - 1));
  }
  return void 0;
}

// src/compute-engine/symbolic/sum.ts
var Sum = class {
  constructor(ce, xs, options) {
    // If `false`, the running sums are not calculated
    this._isCanonical = true;
    this._imaginary = 0;
    this._posInfinityCount = 0;
    this._negInfinityCount = 0;
    this._naNCount = 0;
    // Each term is factored as the product of a rational and an expression
    // For now, only rationals are factored, so `1.2x + 2.5x` are not combined.
    this._terms = [];
    options ?? (options = {});
    if (!("canonical" in options))
      this._isCanonical = true;
    else
      this._isCanonical = options.canonical;
    this.engine = ce;
    this._rational = bignumPreferred(ce) ? [BigInt(0), BigInt(1)] : [0, 1];
    this._bignum = ce._BIGNUM_ZERO;
    this._number = 0;
    if (xs)
      for (const x of xs)
        this.addTerm(x);
  }
  get isEmpty() {
    if (!this._isCanonical)
      return this._terms.length === 0;
    return this._terms.length === 0 && isRationalZero(this._rational) && this._imaginary === 0 && this._number === 0 && this._bignum.isZero() && this._negInfinityCount === 0 && this._posInfinityCount === 0 && this._naNCount === 0;
  }
  /**
   * Add a term to the sum.
   *
   * A term is a rational coefficient and an expression.
   * Optionally, the term is multiplied by the constant `c` before being added.
   *
   * If the sum already has this term, the coefficient is added
   * to the previous one. Otherwise, a new entry is added.
   *
   * E.g. "2x + x + 1/5 y"
   *  -> [['x', [3, 1]], ['y', [1, 5]]]
   */
  addTerm(term, c) {
    if (term.isNothing)
      return;
    if (term.isNaN || term.isImaginary && !complexAllowed(this.engine)) {
      this._naNCount += 1;
      return;
    }
    if (this._isCanonical) {
      if (term.numericValue !== null) {
        if (term.isInfinity) {
          if (term.isPositive)
            this._posInfinityCount += 1;
          else
            this._negInfinityCount += 1;
          return;
        }
        const r = asRational(term);
        if (r) {
          this._rational = add2(this._rational, c === void 0 ? r : mul2(r, c));
          return;
        }
        const num = term.numericValue;
        if (num !== null && typeof num === "number") {
          console.assert(!Number.isInteger(num));
          if (bignumPreferred(this.engine))
            this._bignum = this._bignum.add(num);
          else
            this._number += num;
          return;
        }
        if (num !== null && num instanceof Decimal) {
          console.assert(!num.isInteger());
          this._bignum = this._bignum.add(num);
          return;
        }
        if (num !== null && num instanceof import_complex6.Complex) {
          let re = num.re;
          let im = num.im;
          if (Number.isInteger(re)) {
            this._rational = add2(this._rational, mul2([re, 1], c ?? [1, 1]));
            re = 0;
          } else {
            if (bignumPreferred(this.engine))
              this._bignum = this._bignum.add(re);
            else
              this._number += re;
            re = 0;
          }
          if (Number.isInteger(im)) {
            if (c === void 0)
              this._imaginary += im;
            else if (isMachineRational(c))
              this._imaginary += im * c[0] / c[1];
            else
              this._imaginary += this.engine.bignum(c[0]).mul(im).div(this.engine.bignum(c[1])).toNumber();
            im = 0;
          }
          if (re === 0 && im === 0)
            return;
          term = this.engine.number(this.engine.complex(re, im));
        }
      }
    }
    let coef;
    [coef, term] = asCoefficient(term);
    if (isRationalZero(coef))
      return;
    if (c !== void 0)
      coef = mul2(coef, c);
    if (term.head === "Negate") {
      this.addTerm(term.op1, neg(coef));
      return;
    }
    if (term.head === "Add") {
      for (const x of term.ops)
        this.addTerm(x, coef);
      return;
    }
    let hasTerm = false;
    if (term.numericValue === null) {
      if (this._terms.length > 500) {
        const h = term.hash;
        for (let i = 0; i < this._terms.length; i++) {
          if (this._terms[i].term.numericValue === null && h === this._terms[i].term.hash && term.isSame(this._terms[i].term)) {
            this._terms[i].coef = add2(this._terms[i].coef, coef);
            hasTerm = true;
            break;
          }
        }
      } else {
        for (let i = 0; i < this._terms.length; i++) {
          if (this._terms[i].term.numericValue === null && term.isSame(this._terms[i].term)) {
            this._terms[i].coef = add2(this._terms[i].coef, coef);
            hasTerm = true;
            break;
          }
        }
      }
    }
    if (!hasTerm)
      this._terms.push({ term, coef });
  }
  // For debugging
  toString() {
    const xs = this.terms("expression");
    if (xs.length === 0)
      return "0";
    return xs.map((x) => x.toString()).join("\\n");
  }
  terms(mode) {
    const ce = this.engine;
    if (this._naNCount > 0)
      return [ce.NaN];
    if (this._imaginary !== 0 && !complexAllowed(ce))
      return [ce.NaN];
    if (this._posInfinityCount > 0 && this._negInfinityCount > 0)
      return [ce.NaN];
    if (this._posInfinityCount > 0)
      return [ce.PositiveInfinity];
    if (this._negInfinityCount > 0)
      return [ce.NegativeInfinity];
    const xs = [];
    for (const { coef, term } of this._terms) {
      if (!isRationalZero(coef)) {
        if (isRationalOne(coef))
          xs.push(term);
        else if (isRationalNegativeOne(coef))
          xs.push(ce.neg(term));
        else if (machineDenominator(coef) === 1)
          xs.push(ce.mul([ce.number(coef[0]), term]));
        else if (machineNumerator(coef) === 1)
          xs.push(ce.div(term, ce.number(coef[1])));
        else
          xs.push(ce.mul([ce.number(coef), term]));
      }
    }
    if (mode === "numeric") {
      if (bignumPreferred(this.engine)) {
        let sum2 = this._bignum.add(this._number);
        if (!isRationalZero(this._rational))
          sum2 = sum2.add(
            ce.bignum(this._rational[0]).div(ce.bignum(this._rational[1]))
          );
        if (this._imaginary !== 0)
          xs.push(ce.number(ce.complex(sum2.toNumber(), this._imaginary)));
        else if (!sum2.isZero())
          xs.push(ce.number(sum2));
      } else {
        let sum2 = this._bignum.toNumber() + this._number;
        if (!isRationalZero(this._rational))
          sum2 += machineNumerator(this._rational) / machineDenominator(this._rational);
        if (this._imaginary !== 0)
          xs.push(ce.number(ce.complex(sum2, this._imaginary)));
        else if (sum2 !== 0)
          xs.push(ce.number(sum2));
      }
    } else {
      if (!isRationalZero(this._rational))
        xs.push(ce.number(this._rational));
      if (this._imaginary !== 0) {
        if (!complexAllowed(ce))
          return [ce.NaN];
        xs.push(ce.number(ce.complex(0, this._imaginary)));
      }
      if (bignumPreferred(this.engine)) {
        const sum2 = this._bignum.add(this._number);
        if (!sum2.isZero())
          xs.push(ce.number(sum2));
      } else {
        if (!this._bignum.isZero())
          xs.push(ce.number(this._bignum));
        if (this._number !== 0)
          xs.push(ce.number(this._number));
      }
    }
    return flattenOps(xs, "Add");
  }
  asExpression(mode) {
    const ce = this.engine;
    const xs = this.terms(mode);
    if (xs.length === 0)
      return ce.Zero;
    if (xs.length === 1 && !isIndexableCollection(xs[0]))
      return xs[0];
    return ce._fn("Add", sortAdd(xs));
  }
};

// src/compute-engine/library/domains.ts
var DOMAIN_CONSTRUCTORS = [
  "InvalidDomain",
  "DictionaryOf",
  "FunctionOf",
  "ListOf",
  "TupleOf",
  "Intersection",
  "Union",
  "OptArg",
  "VarArg"
  // 'Head',
  // 'Symbol',
  // 'Value',
];
var DOMAIN_ALIAS = {
  Functions: ["FunctionOf", ["VarArg", "Anything"], "Anything"],
  NumericFunctions: ["FunctionOf", "Numbers", ["VarArg", "Numbers"], "Numbers"],
  RealFunctions: [
    "FunctionOf",
    "ExtendedRealNumbers",
    ["VarArg", "ExtendedRealNumbers"],
    "ExtendedRealNumbers"
  ],
  LogicOperators: [
    "FunctionOf",
    "Booleans",
    ["VarArg", "Booleans"],
    "Booleans"
  ],
  Predicates: ["FunctionOf", "Anything", ["VarArg", "Anything"], "Booleans"],
  RelationalOperators: ["FunctionOf", "Anything", "Anything", "Booleans"]
  // PositiveInteger: ['Range', 1, +Infinity],
  // NonNegativeInteger: ['Range', 0, +Infinity],
  // NegativeInteger: ['Range', -Infinity, -1],
  // NonPositiveInteger: ['Range', -Infinity, 0],
  // PositiveNumber: ['Interval', ['Open', 0], +Infinity],
  // NonNegativeNumber: ['Interval', 0, +Infinity],
  // NegativeNumber: ['Interval', -Infinity, ['Open', 0]],
  // NonPositiveNumber: ['Interval', -Infinity, 0],
};
var DOMAIN_LITERAL = {
  Anything: [],
  Values: "Anything",
  Domains: "Anything",
  Void: "NothingDomain",
  NothingDomain: [
    "Booleans",
    "Strings",
    "Symbols",
    "Tuples",
    "Lists",
    "Dictionaries",
    "ImaginaryNumbers",
    "TranscendentalNumbers",
    "PositiveIntegers",
    "NegativeIntegers",
    "NonPositiveIntegers",
    "NonNegativeIntegers",
    "PositiveNumbers",
    "NegativeNumbers",
    "NonPositiveNumbers",
    "NonNegativeNumbers",
    "LogicOperators",
    "RelationalOperators"
  ],
  Booleans: "Values",
  Strings: "Values",
  Symbols: "Values",
  Collections: "Values",
  Lists: "Collections",
  Dictionaries: "Collections",
  Sequences: "Collections",
  Tuples: "Collections",
  Sets: "Collections",
  //
  // Functional Domains
  //
  // https://en.wikipedia.org/wiki/List_of_mathematical_functions
  //
  Functions: "Anything",
  Predicates: "Functions",
  LogicOperators: "Predicates",
  RelationalOperators: "Predicates",
  NumericFunctions: "Functions",
  RealFunctions: "NumericFunctions",
  //
  // Numeric Domains
  //
  // https://en.wikipedia.org/wiki/Category_of_sets
  //
  Numbers: "Values",
  ExtendedComplexNumbers: "Numbers",
  ComplexNumbers: "ExtendedComplexNumbers",
  ImaginaryNumbers: "ComplexNumbers",
  ExtendedRealNumbers: "ExtendedComplexNumbers",
  RealNumbers: ["ComplexNumbers", "ExtendedRealNumbers"],
  PositiveNumbers: "NonNegativeNumbers",
  NonNegativeNumbers: "RealNumbers",
  NonPositiveNumbers: "NegativeNumbers",
  NegativeNumbers: "RealNumbers",
  TranscendentalNumbers: "RealNumbers",
  AlgebraicNumbers: "RealNumbers",
  RationalNumbers: "AlgebraicNumbers",
  // NaturalNumbers: 'Integers',
  Integers: "RationalNumbers",
  PositiveIntegers: "NonNegativeIntegers",
  NonNegativeIntegers: "Integers",
  NonPositiveIntegers: "NegativeIntegers",
  NegativeIntegers: "Integers"
  // https://en.wikipedia.org/wiki/List_of_named_matrices
  // ComplexTensor: 'Tensor',
  // RealTensor: 'ComplexTensor',
  // IntegerTensor: 'RealTensor',
  // LogicalTensor: 'IntegerTensor',
  // SquareMatrix: 'Matrix',
  // MonomialMatrix: 'SquareMatrix',
  // TriangularMatrix: 'SquareMatrix',
  // UpperTriangularMatrix: 'TriangularMatrix',
  // LowerTriangularMatrix: 'TriangularMatrix',
  // PermutationMatrix: ['MonomialMatrix', 'LogicalTensor', 'OrthogonalMatrix'],
  // OrthogonalMatrix: ['SquareMatrix', 'RealTensor'],
  // DiagonalMatrix: ['UpperTriangularMatrix', 'LowerTriangularMatrix'],
  // IdentityMatrix: ['DiagonalMatrix', 'SymmetricMatrix', 'PermutationMatrix'],
  // ZeroMatrix: ['DiagonalMatrix', 'SymmetricMatrix', 'PermutationMatrix'],
  // SymmetricMatrix: ['HermitianMatrix', 'SquareMatrix', 'RealTensor'],
  // HermitianMatrix: 'ComplexTensor',
  // Quaternion: ['SquareMatrix', 'ComplexTensor'],
};
var gDomainLiterals;
function isDomainLiteral(s) {
  if (!s)
    return false;
  return DOMAIN_LITERAL[s] !== void 0;
}
function ancestors(dom) {
  if (!gDomainLiterals) {
    gDomainLiterals = {};
    ancestors("Void");
  }
  if (gDomainLiterals[dom])
    return Array.from(gDomainLiterals[dom]);
  let result = [];
  if (typeof dom !== "string" || !DOMAIN_LITERAL[dom]) {
    if (!Array.isArray(dom))
      throw Error(`Unknown domain literal ${dom}`);
    if (!DOMAIN_CONSTRUCTORS.includes(dom[0]))
      throw Error(`Unknown domain constructor ${dom[0]}`);
    if (dom[0] === "FunctionOf")
      return ancestors("Functions");
    if (dom[0] === "TupleOf")
      return ancestors("Tuples");
    if (dom[0] === "ListOf")
      return ancestors("Lists");
    if (dom[0] === "DictionaryOf")
      return ancestors("Dictionaries");
    if (dom[0] === "OptArg" || dom[0] === "VarArg")
      return ancestors(dom[1]);
    if (dom[0] === "Literal")
      return ["Anything"];
    if (dom[0] === "Union")
      return ["Anything"];
    if (dom[0] === "Intersection")
      return ["Anything"];
    return ["Anything"];
  }
  if (typeof DOMAIN_LITERAL[dom] === "string")
    result = [DOMAIN_LITERAL[dom], ...ancestors(DOMAIN_LITERAL[dom])];
  else if (Array.isArray(DOMAIN_LITERAL[dom]))
    for (const parent of DOMAIN_LITERAL[dom]) {
      result.push(parent);
      result.push(...ancestors(parent));
    }
  gDomainLiterals[dom] = new Set(result);
  return result;
}
function domainSetsLibrary() {
  const table = {};
  for (const dom of Object.keys(DOMAIN_LITERAL))
    table[dom] = { domain: "Domains", value: ["Domain", dom] };
  table["InvalidDomain"] = {
    signature: {
      domain: ["FunctionOf", "Domains", "Domains"],
      canonical: (ce, ops2) => ce.domain(["InvalidDomain", ops2[0]])
    }
  };
  for (const ctor of ["DictionaryOf", "FunctionOf", "ListOf", "TupleOf"]) {
    table[ctor] = {
      signature: {
        domain: ["FunctionOf", ["VarArg", "Domains"], "Domains"],
        canonical: (ce, ops2) => ce.domain([ctor, ...ops2])
      }
    };
  }
  for (const ctor of ["OptArg", "VarArg"]) {
    table[ctor] = {
      signature: {
        domain: ["FunctionOf", "Domains", "Domains"],
        canonical: (ce, ops2) => ce.domain([ctor, ops2[0]])
      }
    };
  }
  return table;
}

// src/compute-engine/boxed-expression/abstract-boxed-expression.ts
var import_complex8 = __toESM(require_complex(), 1);

// src/compute-engine/symbolic/utils.ts
var import_complex7 = __toESM(require_complex(), 1);
function makePositive(expr) {
  if (expr.head === "Negate")
    return [-1, expr.op1];
  const n = expr.numericValue;
  if (n === null)
    return [1, expr];
  const ce = expr.engine;
  if (typeof n === "number" && n < 0)
    return [-1, ce.number(-n)];
  if (n instanceof Decimal && n.isNegative())
    return [-1, ce.number(n.neg())];
  if (n instanceof import_complex7.Complex && n.re < 0)
    return [-1, ce.number(ce.complex(-n.re, -n.im))];
  if (isMachineRational(n) && n[0] < 0)
    return [-1, ce.number([-n[0], n[1]])];
  if (isBigRational(n) && n[0] < 0)
    return [-1, ce.number([-n[0], n[1]])];
  return [1, expr];
}
function apply(expr, fn, bigFn, complexFn) {
  const n = expr.numericValue;
  const ce = expr.engine;
  console.assert(n !== null);
  if (typeof n === "number") {
    if (bignumPreferred(ce) && bigFn)
      return ce.chop(bigFn(ce.bignum(n)));
    return ce.chop(fn(n));
  }
  if (n instanceof Decimal)
    return ce.chop(bigFn?.(n) ?? fn(n.toNumber()));
  if (isMachineRational(n)) {
    if (!bignumPreferred(ce) || !bigFn)
      return ce.chop(fn(n[0] / n[1]));
    return ce.chop(bigFn(ce.bignum(n[0]).div(n[1])));
  }
  if (isBigRational(n)) {
    if (bigFn)
      return ce.chop(bigFn(ce.bignum(n[0]).div(ce.bignum(n[1]))));
    return ce.chop(fn(Number(n[0]) / Number(n[1])));
  }
  if (n instanceof import_complex7.Complex) {
    if (!complexFn || !complexAllowed(ce))
      return NaN;
    return ce.chop(complexFn(n));
  }
  debugger;
  return NaN;
}
function applyN(expr, fn, bigFn, complexFn) {
  if ((expr?.numericValue ?? null) === null)
    return void 0;
  return expr.engine.number(apply(expr, fn, bigFn, complexFn));
}
function apply2(expr1, expr2, fn, bigFn, complexFn) {
  console.assert(expr1.numericValue !== null && expr2.numericValue !== null);
  const ce = expr1.engine;
  let m1 = expr1.numericValue;
  if (isMachineRational(m1))
    m1 = m1[0] / m1[1];
  let m2 = expr2.numericValue;
  if (isMachineRational(m2))
    m2 = m2[0] / m2[1];
  if (!bignumPreferred(ce) && typeof m1 === "number" && typeof m2 === "number")
    return fn(m1, m2);
  let b1 = void 0;
  if (m1 instanceof Decimal)
    b1 = m1;
  else if (isBigRational(m1))
    b1 = ce.bignum(m1[0]).div(ce.bignum(m1[1]));
  else if (m1 !== null && typeof m1 === "number")
    b1 = ce.bignum(m1);
  let b2 = void 0;
  if (m2 instanceof Decimal)
    b2 = m2;
  else if (isBigRational(m2))
    b1 = ce.bignum(m2[0]).div(ce.bignum(m2[1]));
  else if (m2 !== null && typeof m2 === "number")
    b2 = ce.bignum(m2);
  if (b1 && b2)
    return bigFn?.(b1, b2) ?? fn(b1.toNumber(), b2.toNumber());
  if (m1 instanceof import_complex7.Complex || m2 instanceof import_complex7.Complex) {
    if (!complexFn || !complexAllowed(ce))
      return NaN;
    return complexFn(
      ce.complex(m1 ?? b1?.toNumber() ?? NaN),
      ce.complex(m2 ?? b2?.toNumber() ?? NaN)
    );
  }
  debugger;
  return NaN;
}
function apply2N(expr1, expr2, fn, bigFn, complexFn) {
  if (expr1.numericValue === null || expr2.numericValue === null)
    return void 0;
  return expr1.engine.number(apply2(expr1, expr2, fn, bigFn, complexFn));
}
function shouldHold(skip, count, index) {
  if (skip === "all")
    return true;
  if (skip === "none")
    return false;
  if (skip === "first")
    return index === 0;
  if (skip === "rest")
    return index !== 0;
  if (skip === "last")
    return index === count;
  if (skip === "most")
    return index !== count;
  return true;
}
function canonical(xs) {
  return xs.every((x) => x.isCanonical) ? xs : xs.map((x) => x.canonical);
}

// src/compute-engine/boxed-expression/validate.ts
function checkArity(ce, ops2, count) {
  ops2 = canonical(ops2);
  ops2 = flattenSequence(ops2);
  if (!ce.strict)
    return ops2;
  if (ops2.length === count)
    return ops2;
  const xs = [...ops2.slice(0, count)];
  let i = Math.min(count, ops2.length);
  while (i < count) {
    xs.push(ce.error("missing"));
    i += 1;
  }
  while (i < ops2.length) {
    xs.push(ce.error("unexpected-argument", ops2[i]));
    i += 1;
  }
  return xs;
}
function checkNumericArgs(ce, ops2, options) {
  let count = typeof options === "number" ? options : options?.count;
  const flatten = typeof options === "number" || (options?.flatten ?? true);
  ops2 = canonical(ops2);
  if (flatten)
    ops2 = flattenSequence(ops2);
  if (typeof flatten === "string")
    flattenOps(ops2, flatten);
  if (!ce.strict) {
    for (const x of ops2)
      if (!isFiniteIndexableCollection(x))
        x.infer(ce.Numbers);
    return ops2;
  }
  let isValid = true;
  count ?? (count = ops2.length);
  const xs = [];
  for (let i = 0; i <= Math.max(count - 1, ops2.length - 1); i++) {
    const op3 = ops2[i];
    if (i > count - 1) {
      isValid = false;
      xs.push(ce.error("unexpected-argument", op3));
    } else if (op3 === void 0) {
      isValid = false;
      xs.push(ce.error("missing"));
    } else if (op3.symbol && !ce.lookupSymbol(op3.symbol) && !ce.lookupFunction(op3.symbol)) {
      xs.push(op3);
    } else if (op3.isNumber || op3.domain?.isNumber) {
      xs.push(op3);
    } else if (!op3.isValid) {
      isValid = false;
      xs.push(op3);
    } else if (!op3.domain) {
      xs.push(op3);
    } else if (isFiniteIndexableCollection(op3)) {
      for (const x of each(op3)) {
        if (!x.isNumber && !x.domain?.isNumber) {
          isValid = false;
          break;
        }
      }
      if (!isValid)
        xs.push(ce.domainError("Numbers", op3.domain, op3));
      else
        xs.push(op3);
    } else if (op3.symbolDefinition?.inferredDomain && op3.domain.isCompatible(ce.Numbers, "contravariant")) {
      xs.push(op3);
    } else if (op3.functionDefinition?.signature.inferredSignature && op3.domain.isCompatible(ce.Numbers, "contravariant")) {
      xs.push(op3);
    } else {
      isValid = false;
      xs.push(ce.domainError("Numbers", op3.domain, op3));
    }
  }
  if (isValid)
    for (const x of xs)
      if (isFiniteIndexableCollection(x))
        for (const y of each(x))
          y.infer(ce.Numbers);
      else
        x.infer(ce.Numbers);
  return xs;
}
function checkDomain(ce, arg, dom) {
  if (arg === void 0 || arg === null)
    return ce.error("missing");
  if (dom === void 0)
    return ce.error("unexpected-argument", arg);
  arg = arg.canonical;
  if (arg.head === "Sequence")
    arg = arg.op1;
  if (!arg.isValid)
    return arg;
  if (!arg.domain || arg.domain.isCompatible(dom))
    return arg;
  return ce.domainError(dom, arg.domain, arg);
}
function checkPure(ce, arg) {
  if (arg === void 0 || arg === null)
    return ce.error("missing");
  arg = arg.canonical;
  if (!arg.isValid)
    return arg;
  if (arg.isPure)
    return arg;
  return ce.error("expected-pure-expression", arg);
}
function checkDomains(ce, args, doms) {
  if (args.length === doms.length && args.every((x, i) => !x.domain || x.domain.isCompatible(doms[i])))
    return args;
  const xs = [];
  for (let i = 0; i <= doms.length - 1; i++)
    xs.push(checkDomain(ce, args[i], doms[i]));
  for (let i = doms.length; i <= args.length - 1; i++)
    xs.push(ce.error("unexpected-argument", args[i]));
  return xs;
}
function adjustArguments(ce, ops2, hold, threadable, params, optParams, restParam) {
  if (!ce.strict)
    return null;
  const result = [];
  let isValid = true;
  let i = 0;
  for (const param of params) {
    const op3 = ops2[i++];
    if (!op3) {
      result.push(ce.error("missing"));
      isValid = false;
      continue;
    }
    if (shouldHold(hold, params.length, i - 1)) {
      result.push(op3);
      continue;
    }
    if (!op3.isValid) {
      result.push(op3);
      isValid = false;
      continue;
    }
    if (!op3.domain) {
      result.push(op3);
      continue;
    }
    if (threadable && isFiniteIndexableCollection(op3)) {
      result.push(op3);
      continue;
    }
    if (op3.symbolDefinition?.inferredDomain && op3.domain.isCompatible(param, "contravariant")) {
      result.push(op3);
      continue;
    }
    if (op3.functionDefinition?.signature.inferredSignature && op3.domain.isCompatible(param, "contravariant")) {
      result.push(op3);
      continue;
    }
    if (!op3.domain.isCompatible(param)) {
      result.push(ce.domainError(param, op3.domain, op3));
      isValid = false;
      continue;
    }
    result.push(op3);
  }
  for (const param of optParams) {
    const op3 = ops2[i];
    if (!op3) {
      break;
    }
    if (shouldHold(hold, params.length, i)) {
      result.push(op3);
      continue;
    }
    if (!op3.isValid) {
      result.push(op3);
      isValid = false;
      i += 1;
      continue;
    }
    if (!op3.domain) {
      result.push(op3);
      i += 1;
      continue;
    }
    if (threadable && isFiniteIndexableCollection(op3)) {
      result.push(op3);
      continue;
    }
    if (op3.symbolDefinition?.inferredDomain && op3.domain.isCompatible(param, "contravariant")) {
      result.push(op3);
      continue;
    }
    if (!op3.domain.isCompatible(param)) {
      result.push(ce.domainError(param, op3.domain, op3));
      isValid = false;
      i += 1;
      continue;
    }
    result.push(op3);
    i += 1;
  }
  if (restParam) {
    for (const op3 of ops2.slice(i)) {
      i += 1;
      if (shouldHold(hold, params.length, i - 1)) {
        result.push(op3);
        continue;
      }
      if (!op3.isValid) {
        result.push(op3);
        isValid = false;
        continue;
      }
      if (!op3.domain) {
        result.push(op3);
        continue;
      }
      if (threadable && isFiniteIndexableCollection(op3)) {
        result.push(op3);
        continue;
      }
      if (op3.symbolDefinition?.inferredDomain && op3.domain.isCompatible(restParam, "contravariant")) {
        result.push(op3);
        continue;
      }
      if (!op3.domain.isCompatible(restParam)) {
        result.push(ce.domainError(restParam, op3.domain, op3));
        isValid = false;
        continue;
      }
      result.push(op3);
    }
  }
  if (i < ops2.length) {
    for (const op3 of ops2.slice(i)) {
      result.push(ce.error("unexpected-argument", op3));
      isValid = false;
    }
  }
  if (!isValid)
    return result;
  i = 0;
  for (const param of params) {
    if (!shouldHold(hold, params.length, i)) {
      if (!threadable || !isFiniteIndexableCollection(ops2[i]))
        ops2[i].infer(param);
    }
    i += 1;
  }
  for (const param of optParams) {
    if (!threadable || !isFiniteIndexableCollection(ops2[i]))
      ops2[i]?.infer(param);
    i += 1;
  }
  if (restParam) {
    for (const op3 of ops2.slice(i)) {
      if (!shouldHold(hold, params.length, i)) {
        if (!threadable || !isFiniteIndexableCollection(op3))
          op3.infer(restParam);
      }
      i += 1;
    }
  }
  return null;
}

// src/compute-engine/library/utils.ts
function canonicalIndexingSet(indexingSet) {
  if (!indexingSet)
    return void 0;
  const ce = indexingSet.engine;
  let index = null;
  let lower = null;
  let upper = null;
  if (indexingSet.head !== "Tuple" && indexingSet.head !== "Triple" && indexingSet.head !== "Pair" && indexingSet.head !== "Single") {
    index = indexingSet;
  } else {
    index = indexingSet.ops[0] ?? null;
    lower = indexingSet.ops[1]?.canonical ?? null;
    upper = indexingSet.ops[2]?.canonical ?? null;
  }
  if (index.head === "Hold")
    index = index.op1;
  if (index.symbol) {
    ce.declare(index.symbol, { domain: "Integers" });
    index.bind();
    index = ce.hold(index);
  } else
    index = ce.domainError("Symbols", index.domain, index);
  if (lower && lower.isFinite)
    lower = checkDomain(ce, lower, "Integers");
  if (upper && upper.isFinite)
    upper = checkDomain(ce, upper, "Integers");
  if (lower && upper)
    return ce.tuple([index, lower, upper]);
  if (upper)
    return ce.tuple([index, ce.One, upper]);
  if (lower)
    return ce.tuple([index, lower]);
  return index;
}
function normalizeIndexingSet(limits) {
  let lower = 1;
  let upper = lower + MAX_ITERATION;
  let index = void 0;
  let isFinite2 = true;
  if (limits && (limits.head === "Tuple" || limits.head === "Triple" || limits.head === "Pair" || limits.head === "Single")) {
    index = (limits.op1.head === "Hold" ? limits.op1.op1.symbol : limits.op1.symbol) ?? "Nothing";
    lower = asSmallInteger(limits.op2) ?? 1;
    if (!Number.isFinite(lower))
      isFinite2 = false;
    if (limits.op3.isNothing || limits.op3.isInfinity) {
      isFinite2 = false;
    } else {
      const u = asSmallInteger(limits.op3);
      if (u === null)
        isFinite2 = false;
      else {
        upper = u;
        if (!Number.isFinite(upper))
          isFinite2 = false;
      }
    }
    if (!isFinite2 && Number.isFinite(lower))
      upper = lower + MAX_ITERATION;
  } else if (limits) {
    index = (limits.head === "Hold" ? limits.op1.symbol : limits.symbol) ?? "Nothing";
    lower = 1;
    upper = lower + MAX_ITERATION;
  }
  return [index, lower, upper, isFinite2];
}

// src/compute-engine/compile.ts
var NATIVE_JS_OPERATORS = {
  Add: ["+", 11],
  Negate: ["-", 14],
  // Unary operator
  Subtract: ["-", 11],
  Multiply: ["*", 12],
  Divide: ["/", 13],
  Equal: ["===", 8],
  NotEqual: ["!==", 8],
  LessEqual: ["<=", 9],
  GreaterEqual: [">=", 9],
  Less: ["<", 9],
  Greater: [">", 9],
  And: ["&&", 4],
  Or: ["||", 3],
  Not: ["!", 14]
  // Unary operator
  // Xor: ['^', 6], // That's bitwise XOR, not logical XOR
  // Possible solution is to use `a ? !b : b` instead of `a ^ b`
};
var NATIVE_JS_FUNCTIONS = {
  Abs: "Math.abs",
  Add: (args, compile2) => {
    if (args.length === 1)
      return compile2(args[0]);
    return `(${args.map((x) => compile2(x)).join(" + ")})`;
  },
  Arccos: "Math.acos",
  Arcosh: "Math.acosh",
  Arsin: "Math.asin",
  Arsinh: "Math.asinh",
  Arctan: "Math.atan",
  Artanh: "Math.atanh",
  // Math.cbrt
  Ceiling: "Math.ceil",
  Chop: "_SYS.chop",
  Cos: "Math.cos",
  Cosh: "Math.cosh",
  Exp: "Math.exp",
  Floor: "Math.floor",
  Gamma: "_SYS.gamma",
  GCD: "_SYS.gcd",
  // Math.hypot
  LCM: "_SYS.lcm",
  Limit: (args, compile2) => `_SYS.limit(${compile2(args[0])}, ${compile2(args[1])})`,
  Ln: "Math.log",
  List: (args, compile2) => `[${args.map((x) => compile2(x)).join(", ")}]`,
  Log: (args, compile2) => {
    if (args.length === 1)
      return `Math.log(${compile2(args[0])})`;
    return `(Math.log(${compile2(args[0])}) / Math.log(${compile2(args[1])}))`;
  },
  LogGamma: "_SYS.lngamma",
  Lb: "Math.log2",
  Max: "Math.max",
  Min: "Math.min",
  Power: (args, compile2) => {
    const arg = args[0];
    if (arg === null)
      throw new Error("Power: no argument");
    const exp2 = asFloat(args[1]);
    if (exp2 === 0.5)
      return `Math.sqrt(${compile2(arg)})`;
    if (exp2 === 1 / 3)
      return `Math.cbrt(${compile2(arg)})`;
    if (exp2 === 1)
      return compile2(arg);
    if (exp2 === -1)
      return `1 / (${compile2(arg)})`;
    if (exp2 === -0.5)
      return `1 / Math.sqrt(${compile2(arg)})`;
    return `Math.pow(${compile2(arg)}, ${compile2(args[1])})`;
  },
  Range: (args, compile2) => {
    if (args.length === 0)
      return "[]";
    if (args.length === 1)
      return `Array.from({length: ${compile2(args[0])}}, (_, i) => i)`;
    let start = compile2(args[0]);
    let stop = compile2(args[1]);
    const step = args[2] ? compile2(args[2]) : "1";
    if (start === null)
      throw new Error("Range: no start");
    if (stop === null) {
      stop = start;
      start = "1";
    }
    if (step === "0")
      throw new Error("Range: step cannot be zero");
    if (parseFloat(step) === 1) {
      const fStop = parseFloat(stop);
      const fStart = parseFloat(start);
      if (fStop !== null && fStart !== null) {
        if (fStop - fStart < 50) {
          return `[${Array.from(
            { length: fStop - fStart + 1 },
            (_, i) => fStart + i
          ).join(", ")}]`;
        }
        return `Array.from({length: ${fStop - fStart + 1} 
        }, (_, i) => ${start} + i)`;
      }
      return `Array.from({length: ${stop} - ${start} + 1
      }, (_, i) => ${start} + i)`;
    }
    return `Array.from({length: Math.floor((${stop} - ${start}) / ${step}) + 1}, (_, i) => ${start} + i * ${step})`;
  },
  Root: (args, compile2) => {
    const arg = args[0];
    if (arg === null)
      throw new Error("Root: no argument");
    const exp2 = args[1];
    if (exp2 === null)
      return `Math.sqrt(${compile2(arg)})`;
    return `Math.pow(${compile2(arg)}, 1 / (${compile2(exp2)}))`;
  },
  Random: "Math.random",
  Round: "Math.round",
  Square: (args, compile2) => {
    const arg = args[0];
    if (arg === null)
      throw new Error("Square: no argument");
    return `Math.pow(${compile2(arg)}, 2)`;
  },
  Sgn: "Math.sign",
  Sin: "Math.sin",
  Sinh: "Math.sinh",
  Sqrt: "Math.sqrt",
  Tan: "Math.tan",
  Tanh: "Math.tanh"
  // Factorial: 'factorial',    // TODO: implement
  // Hallucinated by Copilot, but interesting ideas...
  // Cot: 'Math.cot',
  // Sec: 'Math.sec',
  // Csc: 'Math.csc',
  // ArcCot: 'Math.acot',
  // ArcSec: 'Math.asec',
  // ArcCsc: 'Math.acsc',
  // Coth: 'Math.coth',
  // Sech: 'Math.sech',
  // Csch: 'Math.csch',
  // ArcCoth: 'Math.acoth',
  // ArcSech: 'Math.asech',
  // ArcCsch: 'Math.acsch',
  // Root: 'Math.root',
  // Gamma: 'Math.gamma',
  // Erf: 'Math.erf',
  // Erfc: 'Math.erfc',
  // Erfi: 'Math.erfi',
  // Zeta: 'Math.zeta',
  // PolyGamma: 'Math.polygamma',
  // HurwitzZeta: 'Math.hurwitzZeta', $$\zeta (s,a)=\sum _{n=0}^{\infty }{\frac {1}{(n+a)^{s}}}$$
  // DirichletEta: 'Math.dirichletEta',
  // Beta: 'Math.beta',
  // Binomial: 'Math.binomial',
  // Mod: 'Math.mod',
  // Quotient: 'Math.quotient',
  // GCD: 'Math.gcd',
  // LCM: 'Math.lcm',
  // Divisors: 'Math.divisors',
  // PrimeQ: 'Math.isPrime',
  // PrimePi: 'Math.primePi',
  // Prime: 'Math.prime',
  // NextPrime: 'Math.nextPrime',
  // PreviousPrime: 'Math.prevPrime',
  // PrimePowerQ: 'Math.isPrimePower',
  // PrimePowerPi: 'Math.primePowerPi',
  // PrimePower: 'Math.primePower',
  // NextPrimePower: 'Math.nextPrimePower',
  // PreviousPrimePower: 'Math.prevPrimePower',
  // PrimeFactors: 'Math.primeFactors',
  // DivisorSigma: 'Math.divisorSigma',
  // DivisorSigma0: 'Math.divisorSigma0',
  // DivisorSigma1: 'Math.divisorSigma1',
  // DivisorSigma2: 'Math.divisorSigma2',
  // DivisorSigma3: 'Math.divisorSigma3',
  // DivisorSigma4: 'Math.divisorSigma4',
  // DivisorCount: 'Math.divisorCount',
  // DivisorSum: 'Math.divisorSum',
  // MoebiusMu: 'Math.moebiusMu',
  // LiouvilleLambda: 'Math.liouvilleLambda',
  // CarmichaelLambda: 'Math.carmichaelLambda',
  // EulerPhi: 'Math.eulerPhi',
  // EulerPsi: 'Math.eulerPsi',
  // EulerGamma: 'Math.eulerGamma',
  // HarmonicNumber: 'Math.harmonicNumber',
  // BernoulliB: 'Math.bernoulliB',
  // StirlingS1: 'Math.stirlingS1',
  // StirlingS2: 'Math.stirlingS2',
  // BellB: 'Math.bellB',
  // BellNumber: 'Math.bellNumber',
  // LahS: 'Math.lahS',
  // LahL: 'Math.lahL',
  // RiemannR: 'Math.riemannR',
  // RiemannZeta: 'Math.riemannZeta',
  // RiemannXi: 'Math.riemannXi',
  // RiemannH: 'Math.riemannH',
  // RiemannZ: 'Math.riemannZ',
  // RiemannS: 'Math.riemannS',
  // RiemannXiZero: 'Math.riemannXiZero',
  // RiemannZetaZero: 'Math.riemannZetaZero',
  // RiemannHZero: 'Math.riemannHZero',
  // RiemannSZero: 'Math.riemannSZero',
  // RiemannPrimeCount: 'Math.riemannPrimeCount',
  // RiemannRLog: 'Math.riemannRLog',
  // RiemannRLogDerivative: 'Math.riemannRLogDerivative',
  // RiemannRLogZero: 'Math.riemannRLogZero',
  // RiemannRLogZeroDerivative: 'Math.riemannRLogZeroDerivative',
  // RiemannRZero: 'Math.riemannRZero',
  // RiemannRDerivative: 'Math.riemannRDerivative',
  // RiemannXiZeroDerivative: 'Math.riemannXiZeroDerivative',
  // RiemannZetaZeroDerivative: 'Math.riemannZetaZeroDerivative',
  // RiemannHZeroDerivative: 'Math.riemannHZeroDerivative',
  // RiemannSZeroDerivative: 'Math.riemannSZeroDerivative',
  // RiemannSZeroDerivative2: 'Math.riemannSZeroDerivative2',
  // RiemannSZeroDerivative3: 'Math.riemannSZeroDerivative3',
  // RiemannSZeroDerivative4: 'Math.riemannSZeroDerivative4',
  // RiemannSZeroDerivative5: 'Math.riemannSZeroDerivative5',
  // RiemannSZeroDerivative6: 'Math.riemannSZeroDerivative6',
};
var ComputeEngineFunction = class extends Function {
  constructor(body) {
    super("_SYS", "_", `return ${body}`);
    this.sys = {
      factorial,
      gamma,
      lngamma: gammaln,
      gcd,
      lcm,
      chop,
      limit
    };
    return new Proxy(this, {
      apply: (target, thisArg, argumentsList) => super.apply(thisArg, [this.sys, ...argumentsList]),
      get: (target, prop) => {
        if (prop === "toString")
          return () => body;
        return target[prop];
      }
    });
  }
};
function compileToTarget(expr, target) {
  const js = compile(expr, target);
  return new ComputeEngineFunction(js);
}
function compileToJavascript(expr) {
  const unknowns = expr.unknowns;
  return compileToTarget(expr, {
    operators: (op3) => NATIVE_JS_OPERATORS[op3],
    functions: (id) => NATIVE_JS_FUNCTIONS[id],
    var: (id) => {
      const result = {
        Pi: "Math.PI",
        ExponentialE: "Math.E",
        NaN: "Number.NaN",
        ImaginaryUnit: "Number.NaN",
        Half: "0.5",
        MachineEpsilon: "Number.EPSILON",
        GoldenRatio: "((1 + Math.sqrt(5)) / 2)",
        CatalanConstant: "0.91596559417721901",
        EulerGamma: "0.57721566490153286"
      }[id];
      if (result !== void 0)
        return result;
      if (unknowns.includes(id))
        return `_.${id}`;
      return void 0;
    },
    string: (str) => JSON.stringify(str),
    number: (n) => n.toString(),
    indent: 0,
    ws: (s) => s ?? ""
  });
}
function compileExpr(h, args, prec, target) {
  if (h === "Error")
    throw new Error("Error");
  if (h === "Sequence") {
    if (args.length === 0)
      return "";
    return `(${args.map((arg) => compile(arg, target, prec)).join(", ")})`;
  }
  if (h === "Sum" || h === "Product")
    return compileLoop(h, args, target);
  if (args.every((x) => !isCollection(x))) {
    const op3 = target.operators?.(h);
    if ((h === "NotEqual" || h === "Equal" || h === "Less" || h === "Greater" || h === "LessEqual" || h === "GreaterEqual") && args.length > 2 && op3) {
      const result = [];
      for (let i = 0; i < args.length - 1; i++)
        result.push(compileExpr(h, [args[i], args[i + 1]], op3[1], target));
      return `(${result.join(") && (")})`;
    }
    if (op3 !== void 0) {
      if (args === null)
        return "";
      let resultStr;
      if (args.length === 1) {
        resultStr = `${op3[0]}${compile(args[0], target, op3[1])}`;
      } else {
        resultStr = args.map((arg) => compile(arg, target, op3[1])).join(` ${op3[0]} `);
      }
      return op3[1] < prec ? `(${resultStr})` : resultStr;
    }
  }
  if (h === "Function") {
    const params = args.slice(1).map((x) => x.symbol);
    return `((${params.join(", ")}) => ${compile(args[0].canonical, {
      ...target,
      var: (id) => params.includes(id) ? id : target.var(id)
    })})`;
  }
  if (h === "Declare")
    return `let ${args[0].symbol}`;
  if (h === "Assign")
    return `${args[0].symbol} = ${compile(args[1], target)}`;
  if (h === "Return")
    return `return ${compile(args[0], target)}`;
  if (h === "If") {
    if (args.length !== 3)
      throw new Error("If: wrong number of arguments");
    return `((${compile(args[0], target)}) ? (${compile(
      args[1],
      target
    )}) : (${compile(args[2], target)}))`;
  }
  if (h === "Block") {
    const locals = [];
    for (const arg of args) {
      if (arg.head === "Declare")
        locals.push(arg.ops[0].symbol);
    }
    if (args.length === 1 && locals.length === 0)
      return compile(args[0], target);
    const result = args.map(
      (arg) => compile(arg, {
        ...target,
        var: (id) => {
          if (locals.includes(id))
            return id;
          return target.var(id);
        }
      })
    );
    result[result.length - 1] = `return ${result[result.length - 1]}`;
    return `(() => {${target.ws("\n")}${result.join(
      `;${target.ws("\n")}`
    )}${target.ws("\n")}})()`;
  }
  const fn = target.functions?.(h);
  if (!fn)
    throw new Error(`Unknown function ${h}`);
  if (typeof fn === "function") {
    if (args.length === 1 && isFiniteIndexableCollection(args[0])) {
      const v = rndVar();
      return `(${compile(args[0], target)}).map((${v}) => ${fn(
        args[0].engine.box(v),
        (expr) => compile(expr, target)
      )})`;
    }
    return fn(args, (expr) => compile(expr, target));
  }
  if (args === null)
    return `${fn}()`;
  if (args.length === 1 && isFiniteIndexableCollection(args[0])) {
    const v = rndVar();
    return `(${compile(args[0], target)}).map((${v}) => ${fn}(${compile(
      args[0].engine.box(v),
      target
    )}))`;
  }
  return `${fn}(${args.map((x) => compile(x, target)).join(", ")})`;
}
function compile(expr, target, prec = 0) {
  if (expr === void 0)
    return "";
  if (!expr.isValid)
    throw new Error("Invalid expression");
  const f = asFloat(expr);
  if (f !== null)
    return target.number(f);
  const s = expr.symbol;
  if (s !== null)
    return target.var?.(s) ?? s;
  const str = expr.string;
  if (str !== null)
    return target.string(s);
  const keys = expr.keys;
  if (keys !== null) {
    const result = [];
    for (const key of keys) {
      const value = expr.getKey(key);
      if (value)
        result.push(`${key}: ${compile(value, target, 0)}`);
    }
    return `{${result.join(", ")}}`;
  }
  const h = expr.head;
  if (typeof h === "string")
    return compileExpr(h, expr.ops, prec, target);
  return "";
}
function compileLoop(h, args, target) {
  if (args === null)
    throw new Error("Sum/Product: no arguments");
  if (!args[0])
    throw new Error("Sum/Product: no body");
  const [index, lower, upper, isFinite2] = normalizeIndexingSet(args[1]);
  const op3 = h === "Sum" ? "+" : "*";
  if (!index) {
    const indexVar2 = rndVar();
    const acc2 = rndVar();
    const col = compile(args[0], target);
    return `${col}.reduce((${acc2}, ${indexVar2}) => ${acc2} ${op3} ${indexVar2}, ${op3 === "+" ? "0" : "1"})`;
  }
  const fn = compile(args[0], {
    ...target,
    var: (id) => {
      if (id === index)
        return index;
      return target.var(id);
    }
  });
  const indexVar = rndVar();
  const acc = rndVar();
  return `(() => {
  let ${acc} = ${op3 === "+" ? "0" : "1"};
  let ${index} = ${lower};
  const _fn = () => ${fn};
  while (${indexVar} <= ${upper}) {
    ${acc} ${op3}= _fn();
    ${indexVar}++;
  }
  return ${acc};
})()`;
}
function rndVar() {
  return `_${Math.random().toString(36).substring(2)}`;
}

// src/compute-engine/boxed-expression/abstract-boxed-expression.ts
var _BoxedExpression = class {
  constructor(ce, metadata) {
    this.engine = ce;
    if (metadata?.latex !== void 0)
      this._latex = metadata.latex;
  }
  /**
   *
   * `Object.valueOf()`: return a JavaScript primitive value for the expression
   *
   */
  valueOf() {
    if (this.symbol === "True")
      return true;
    if (this.symbol === "False")
      return false;
    if (this.head && typeof this.head === "string" && ["List", "Set", "Sequence", "Tuple", "Pair", "Single", "Triple"].includes(
      this.head
    )) {
      return this.ops?.map((x) => x.valueOf());
    }
    return asFloat(this) ?? this.string ?? this.symbol ?? JSON.stringify(this.json);
  }
  /** Object.toString() */
  toString() {
    if (this.symbol)
      return this.symbol;
    if (this.string)
      return this.string;
    const num = this.numericValue;
    if (num !== null) {
      if (typeof num === "number")
        return num.toString();
      if (isMachineRational(num))
        return `(${num[0].toString()}/${num[1].toString()})`;
      if (isBigRational(num))
        return `(${num[0].toString()}/${num[1].toString()})`;
      if (num instanceof import_complex8.Complex) {
        const im = num.im === 1 ? "" : num.im === -1 ? "-" : num.im.toString();
        if (num.re === 0)
          return im + "i";
        if (num.im < 0)
          return `${num.re.toString()}${im}i`;
        return `(${num.re.toString()}+${im}i)`;
      }
    }
    return JSON.stringify(this.json);
  }
  print() {
    console.log(this.toString());
  }
  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      const v = this.valueOf();
      return typeof v === "number" ? v : null;
    }
    return this.toString();
  }
  /** Called by `JSON.stringify()` when serializing to json */
  toJSON() {
    return this.json;
  }
  /** @internal */
  get rawJson() {
    return this.json;
  }
  get scope() {
    return null;
  }
  /** Object.is() */
  is(rhs) {
    if (rhs === null || rhs === void 0)
      return false;
    return this.isSame(this.engine.box(rhs));
  }
  get latex() {
    return this._latex ?? this.engine.serialize(this);
  }
  set latex(val) {
    this._latex = val;
  }
  get symbol() {
    return null;
  }
  get isNothing() {
    return false;
  }
  get string() {
    return null;
  }
  getSubexpressions(head2) {
    return getSubexpressions(this, head2);
  }
  get subexpressions() {
    return this.getSubexpressions("");
  }
  get symbols() {
    const set = /* @__PURE__ */ new Set();
    getSymbols(this, set);
    return Array.from(set);
  }
  get unknowns() {
    const set = /* @__PURE__ */ new Set();
    getUnknowns(this, set);
    return Array.from(set);
  }
  get freeVariables() {
    const set = /* @__PURE__ */ new Set();
    getFreeVariables(this, set);
    return Array.from(set);
  }
  get errors() {
    return this.getSubexpressions("Error");
  }
  // Only return non-null for functions
  get ops() {
    return null;
  }
  get nops() {
    return 0;
  }
  get op1() {
    return this.engine.Nothing;
  }
  get op2() {
    return this.engine.Nothing;
  }
  get op3() {
    return this.engine.Nothing;
  }
  get isValid() {
    return true;
  }
  get isPure() {
    return false;
  }
  get isExact() {
    return true;
  }
  /** For a symbol, true if the symbol is a constant (unchangeable value) */
  get isConstant() {
    return false;
  }
  get canonical() {
    return this;
  }
  subs(_sub, options) {
    if (options?.canonical)
      return this.canonical;
    return this;
  }
  solve(_vars) {
    return null;
  }
  replace(_rules) {
    return null;
  }
  has(_v) {
    return false;
  }
  get isNaN() {
    return void 0;
  }
  get isZero() {
    return void 0;
  }
  get isNotZero() {
    return void 0;
  }
  get isOne() {
    return void 0;
  }
  get isNegativeOne() {
    return void 0;
  }
  get isInfinity() {
    return void 0;
  }
  // Not +- Infinity, not NaN
  get isFinite() {
    return void 0;
  }
  get isEven() {
    return void 0;
  }
  get isOdd() {
    return void 0;
  }
  get isPrime() {
    return void 0;
  }
  get isComposite() {
    return void 0;
  }
  get numericValue() {
    return null;
  }
  get shape() {
    return [];
  }
  get rank() {
    return 0;
  }
  get sgn() {
    return null;
  }
  isLess(_rhs) {
    return void 0;
  }
  isLessEqual(_rhs) {
    return void 0;
  }
  isGreater(_rhs) {
    return void 0;
  }
  isGreaterEqual(_rhs) {
    return void 0;
  }
  // x > 0
  get isPositive() {
    return void 0;
  }
  // x >= 0
  get isNonNegative() {
    return void 0;
  }
  // x < 0
  get isNegative() {
    return void 0;
  }
  // x <= 0
  get isNonPositive() {
    return void 0;
  }
  //
  //
  //
  //
  //
  isCompatible(_dom, _kind) {
    return false;
  }
  get description() {
    if (!this.baseDefinition)
      return void 0;
    if (!this.baseDefinition.description)
      return void 0;
    if (typeof this.baseDefinition.description === "string")
      return [this.baseDefinition.description];
    return this.baseDefinition.description;
  }
  get url() {
    return this.baseDefinition?.url ?? void 0;
  }
  get wikidata() {
    return this.baseDefinition?.wikidata ?? void 0;
  }
  // set wikidata(val: string | undefined) {}
  get complexity() {
    return void 0;
  }
  get baseDefinition() {
    return void 0;
  }
  get symbolDefinition() {
    return void 0;
  }
  get functionDefinition() {
    return void 0;
  }
  infer(_domain) {
    return false;
  }
  bind() {
    return;
  }
  reset() {
    return;
  }
  get keys() {
    return null;
  }
  get keysCount() {
    return 0;
  }
  getKey(_key) {
    return void 0;
  }
  hasKey(_key) {
    return false;
  }
  get value() {
    return this.N().valueOf();
  }
  set value(_value) {
    throw new Error(`Can't change the value of \\(${this.latex}\\)`);
  }
  // @ts-ignore
  get domain() {
    return void 0;
  }
  set domain(_domain) {
    throw new Error(`Can't change the domain of \\(${this.latex}\\)`);
  }
  get isNumber() {
    return void 0;
  }
  get isInteger() {
    return void 0;
  }
  get isRational() {
    return void 0;
  }
  get isAlgebraic() {
    return false;
  }
  get isReal() {
    return void 0;
  }
  // Real or +-Infinity
  get isExtendedReal() {
    return void 0;
  }
  get isComplex() {
    return void 0;
  }
  get isImaginary() {
    return void 0;
  }
  get isExtendedComplex() {
    return void 0;
  }
  simplify(_options) {
    return this;
  }
  evaluate(_options) {
    return this.simplify();
  }
  N(_options) {
    return this.evaluate({ numericMode: true });
  }
  compile(to = "javascript", options) {
    if (to !== "javascript")
      return void 0;
    options ?? (options = { optimize: ["simplify"] });
    let expr = this;
    if (options.optimize.includes("simplify"))
      expr = expr.simplify();
    if (options.optimize.includes("evaluate"))
      expr = expr.evaluate();
    return compileToJavascript(expr);
  }
};

// src/compute-engine/boxed-expression/boxed-domain.ts
var _BoxedDomain = class __BoxedDomain extends _BoxedExpression {
  constructor(ce, dom, metadata) {
    console.assert(!(dom instanceof __BoxedDomain));
    super(ce, metadata);
    if (typeof dom === "string") {
      if (!isDomainLiteral(dom))
        throw Error(`Unknown domain literal "${dom}"`);
      this.base = dom;
      this.ctor = null;
      this.params = [];
      return;
    }
    if (!Array.isArray(dom))
      throw Error("Expected a domain expression");
    if (!DOMAIN_CONSTRUCTORS.includes(dom[0]))
      throw Error(`Unknown domain constructor "${dom[0]}`);
    const ctor = dom[0];
    this.ctor = ctor;
    if (ctor === "OptArg" || ctor === "VarArg")
      throw Error(
        `Unexpected domain constructor "${ctor}" outside of FunctionOf`
      );
    this.params = dom.slice(1).map((x) => x instanceof _BoxedExpression ? x.json : x);
    if (ctor === "FunctionOf") {
      this.base = "Functions";
      if (ce.strict)
        functionDomain(this);
    }
    if (ctor === "DictionaryOf")
      this.base = "Dictionaries";
    if (ctor === "ListOf")
      this.base = "Lists";
    if (ctor === "TupleOf")
      this.base = "Tuples";
    if (ctor === "Covariant" || ctor === "Contravariant" || ctor === "Bivariant" || ctor === "Invariant") {
      const param = ce.domain(dom[1]);
      this.ctor = ctor;
      this.base = param.base;
      this.params = [param.json];
      if (dom.length !== 2)
        throw Error(`Invalid "${ctor}" in domain "${dom}"`);
    }
    if (ctor === "Union" || ctor === "Intersection") {
      let base = void 0;
      if (ctor === "Union")
        for (const param of this.params)
          base = widen(base, ce.domain(param));
      else
        for (const param of this.params)
          base = narrow(base, ce.domain(param));
      this.base = base.base;
    }
  }
  /** Boxed domains are always canonical. */
  get isCanonical() {
    return true;
  }
  get canonical() {
    return this;
  }
  get isValid() {
    return true;
  }
  get json() {
    if (!this.ctor)
      return this.base;
    return [this.ctor, ...this.params];
  }
  get hash() {
    if (this._hash === void 0)
      this._hash = hashCode(JSON.stringify(this.json));
    return this._hash;
  }
  isCompatible(dom, compatibility = "covariant") {
    const lhs = this.json;
    const rhs = dom instanceof __BoxedDomain ? dom.json : dom;
    const rhsCtor = Array.isArray(rhs) ? rhs[0] : null;
    if (rhsCtor) {
      const rhsParam = rhs[1];
      if (rhsCtor === "Covariant")
        return isSubdomainOf1(lhs, rhsParam);
      if (rhsCtor === "Contravariant")
        return isSubdomainOf1(rhsParam, lhs);
      if (rhsCtor === "Invariant")
        return !isSubdomainOf1(rhsParam, lhs) && !isSubdomainOf1(lhs, rhsParam);
      if (rhsCtor === "Bivariant")
        return isSubdomainOf1(lhs, rhsParam) && isSubdomainOf1(rhsParam, lhs);
    }
    if (compatibility === "covariant")
      return isSubdomainOf1(lhs, rhs);
    if (compatibility === "contravariant")
      return isSubdomainOf1(rhs, lhs);
    if (compatibility === "bivariant")
      return isSubdomainOf1(rhs, lhs) && isSubdomainOf1(lhs, rhs);
    return !isSubdomainOf1(rhs, lhs) && !isSubdomainOf1(lhs, rhs);
  }
  isEqual(rhs) {
    if (!(rhs instanceof __BoxedDomain))
      return false;
    if (this === rhs)
      return true;
    return this.isCompatible(rhs, "invariant");
  }
  isSame(rhs) {
    return this.isEqual(rhs);
  }
  match(rhs, _options) {
    if (!(rhs instanceof __BoxedDomain))
      return null;
    if (this.isCompatible(rhs, "invariant"))
      return {};
    return null;
  }
  get head() {
    return "Domain";
  }
  get domain() {
    return this.engine.domain("Domains");
  }
  get isFunction() {
    return this.base === "Functions";
  }
  get isNumeric() {
    return this.isCompatible(this.engine.domain("Numbers"));
  }
};
function isDomain(expr) {
  if (expr instanceof _BoxedDomain)
    return true;
  if (expr instanceof _BoxedExpression)
    expr = expr.json;
  if (typeof expr === "string")
    return isDomainLiteral(expr);
  if (!Array.isArray(expr))
    return false;
  if (expr.length <= 1)
    return false;
  const ctor = expr[0];
  if (typeof ctor !== "string" || !DOMAIN_CONSTRUCTORS.includes(ctor))
    return false;
  if (ctor === "ListOf" || ctor === "OptArg" || ctor === "VarArg")
    return expr.length === 2 && isDomain(expr[1]);
  if (ctor === "FunctionOf")
    return expr.slice(1).every(isDomain);
  if (ctor === "TupleOf" || ctor === "Intersection" || ctor === "Union")
    return expr.slice(1).every(isDomain);
  return expr.every((x) => x !== null);
}
function isSubdomainOf1(lhs, rhs) {
  const [result, rest] = isSubdomainOf([lhs], rhs);
  if (result && rest.length === 0)
    return true;
  return false;
}
function isSubdomainOf(xlhs, rhs) {
  let lhs = xlhs.shift();
  const rhsLiteral = typeof rhs === "string" ? rhs : null;
  if (rhsLiteral === "Anything")
    return [true, xlhs];
  const lhsLiteral = typeof lhs === "string" ? lhs : null;
  if (lhsLiteral && rhsLiteral) {
    if (lhsLiteral === rhsLiteral)
      return [true, xlhs];
    return [ancestors(lhsLiteral).includes(rhsLiteral), xlhs];
  }
  if (rhsLiteral) {
    const lhsConstructor = lhs[0];
    if (lhsConstructor === "FunctionOf")
      return [rhsLiteral === "Functions", xlhs];
    if (lhsConstructor === "DictionaryOf")
      return [rhsLiteral === "Dictionaries", xlhs];
    if (lhsConstructor === "ListOf")
      return [rhsLiteral === "Lists", xlhs];
    if (lhsConstructor === "TupleOf")
      return [rhsLiteral === "Tuples", xlhs];
    if (lhsConstructor === "Intersection") {
    }
    return [true, xlhs];
  }
  const rhsConstructor = rhs[0];
  if (rhsConstructor === "FunctionOf") {
    if (lhsLiteral === "Functions")
      return [true, xlhs];
    if (lhsLiteral)
      return [false, xlhs];
    if (lhs[0] !== "FunctionOf")
      return [false, xlhs];
    if (lhs.length === 1 && rhs.length === 1)
      return [true, xlhs];
    if (!isSubdomainOf1(
      lhs[lhs.length - 1],
      rhs[rhs.length - 1]
    ))
      return [false, xlhs];
    const lhsParams = lhs.slice(1, -1);
    let rhsParams = rhs.slice(1, -1);
    for (let i = 0; i <= lhsParams.length - 1; i++) {
      if (rhsParams.length === 0) {
        const lhsCtor = Array.isArray(lhsParams[i]) ? lhsParams[i][0] : null;
        if (lhsCtor !== "OptArg")
          return [false, xlhs];
        return [true, xlhs];
      } else {
        let match2 = false;
        [match2, rhsParams] = isSubdomainOf(rhsParams, lhsParams[i]);
        if (!match2)
          return [false, xlhs];
      }
    }
    return [rhsParams.length === 0, xlhs];
  }
  if (rhsConstructor === "Intersection") {
    return [
      rhs.slice(1, -1).every(
        (x) => isSubdomainOf1(lhs, x)
      ),
      xlhs
    ];
  }
  if (rhsConstructor === "Union") {
    return [
      rhs.slice(1, -1).some((x) => isSubdomainOf1(lhs, x)),
      xlhs
    ];
  }
  if (rhsConstructor === "OptArg") {
    if (lhsLiteral === "NothingDomain")
      return [true, xlhs];
    return isSubdomainOf(
      [lhs, ...xlhs],
      rhs[1]
    );
  }
  if (rhsConstructor === "VarArg") {
    const seq = rhs[1];
    if (!isSubdomainOf1(lhs, seq))
      return [false, xlhs];
    lhs = xlhs.shift();
    let match2 = true;
    while (xlhs.length > 0 && match2) {
      [match2, xlhs] = isSubdomainOf(xlhs, seq);
      lhs = xlhs.shift();
    }
    return [true, xlhs];
  }
  if (rhsConstructor === "TupleOf") {
    if (!Array.isArray(lhs) || lhs[0] !== "TupleOf")
      return [false, xlhs];
    if (lhs.length > rhs.length)
      return [false, xlhs];
    for (let i = 1; i <= rhs.length - 1; i++) {
      if (!lhs[i] || !isSubdomainOf1(
        lhs[i],
        rhs[i]
      ))
        return [false, xlhs];
    }
    return [true, xlhs];
  }
  console.error("Unexpected domain constructor " + rhsConstructor);
  return [false, xlhs];
}
function widen(a, b) {
  if (a === void 0 || a === null)
    return b;
  if (b === void 0 || b === null)
    return a;
  const aAncestors = [a.base, ...ancestors(a.base)];
  const bAncestors = [b.base, ...ancestors(b.base)];
  while (!bAncestors.includes(aAncestors[0]))
    aAncestors.shift();
  return a.engine.domain(aAncestors[0]);
}
function narrow(a, b) {
  if (a === void 0)
    return b;
  if (b === void 0)
    return a;
  if (isSubdomainOf1(a.base, b.base))
    return a;
  if (isSubdomainOf1(b.base, a.base))
    return b;
  return a.engine.Void;
}

// src/compute-engine/library/arithmetic-add.ts
function canonicalAdd(ce, ops2) {
  console.assert(ops2.every((x) => x.isCanonical));
  ops2 = ops2.filter((x) => x.numericValue === null || !x.isZero);
  if (ops2.length === 0)
    return ce.Zero;
  if (ops2.length === 1 && !isIndexableCollection(ops2[0]))
    return ops2[0];
  if (ops2.length === 2) {
    let im = 0;
    let re = 0;
    re = asFloat(ops2[0]);
    if (re !== null && re !== 0)
      im = getImaginaryCoef(ops2[1]);
    else {
      im = getImaginaryCoef(ops2[0]);
      if (im !== 0 && ops2[1].numericValue !== null)
        re = asFloat(ops2[1]);
    }
    if (re !== null && im !== null && im !== 0)
      return ce.number(ce.complex(re, im));
  }
  if (ops2.length > 1)
    ops2 = sortAdd(ops2);
  return ce._fn("Add", ops2);
}
function domainAdd(_ce, args) {
  let dom = null;
  for (const arg of args) {
    if (!arg?.isNumeric)
      return null;
    dom = widen(dom, arg);
  }
  return dom;
}
function simplifyAdd(ce, args) {
  const sum2 = new Sum(ce);
  for (let arg of args) {
    arg = arg.simplify();
    if (arg.isImaginary && arg.isInfinity)
      return ce.ComplexInfinity;
    if (arg.isNaN || arg.symbol === "Undefined")
      return ce.NaN;
    if (!arg.isZero)
      sum2.addTerm(arg);
  }
  return sum2.asExpression("expression");
}
function evalAddNum(ops2) {
  let sum2 = 0;
  for (const op3 of ops2) {
    const v = op3.numericValue;
    if (typeof v === "number")
      sum2 += v;
    else
      return null;
  }
  return sum2;
}
function evalAdd(ce, ops2, mode = "evaluate") {
  if (mode === "N" && ce.numericMode === "machine") {
    ops2 = ops2.map((x) => x.N());
    const sum2 = evalAddNum(ops2);
    if (sum2 !== null)
      return ce.number(sum2);
  }
  for (const arg of ops2) {
    if (arg.isImaginary && arg.isInfinity)
      return ce.ComplexInfinity;
    if (arg.isNaN || arg.symbol === "Undefined")
      return ce.NaN;
    if (!arg.isExact)
      mode = "N";
  }
  if (mode === "N")
    ops2 = ops2.map((x) => x.N());
  else
    ops2 = ops2.map((x) => x.evaluate());
  return new Sum(ce, ops2).asExpression(mode === "N" ? "numeric" : "expression");
}
function canonicalSummation(ce, body, indexingSet) {
  ce.pushScope();
  body ?? (body = ce.error("missing"));
  indexingSet = canonicalIndexingSet(indexingSet);
  const result = indexingSet ? ce._fn("Sum", [body.canonical, indexingSet]) : ce._fn("Sum", [body.canonical]);
  ce.popScope();
  return result;
}
function evalSummation(ce, expr, indexingSet, mode) {
  let result = null;
  if (!indexingSet) {
    const body = mode === "simplify" ? expr.simplify() : expr.evaluate({ numericMode: mode === "N" });
    if (bignumPreferred(ce)) {
      let sum2 = ce.bignum(0);
      for (const x of each(body)) {
        const term = asBignum(x);
        if (term === null) {
          result = void 0;
          break;
        }
        if (!term.isFinite()) {
          sum2 = term;
          break;
        }
        sum2 = sum2.add(term);
      }
      if (result === null)
        result = ce.number(sum2);
    } else {
      let sum2 = 0;
      for (const x of each(body)) {
        const term = asFloat(x);
        if (term === null) {
          result = void 0;
          break;
        }
        if (term === null || !Number.isFinite(term)) {
          sum2 = term;
          break;
        }
        sum2 += term;
      }
      if (result === null)
        result = ce.number(sum2);
    }
    return result ?? void 0;
  }
  const [index, lower, upper, isFinite2] = normalizeIndexingSet(
    indexingSet.evaluate()
  );
  if (!index)
    return void 0;
  const fn = expr;
  if (lower >= upper)
    return void 0;
  if (mode === "simplify" && upper - lower >= MAX_SYMBOLIC_TERMS)
    return void 0;
  if (mode === "evaluate" && upper - lower >= MAX_SYMBOLIC_TERMS)
    mode = "N";
  const savedContext = ce.swapScope(fn.scope);
  ce.pushScope();
  fn.bind();
  if (mode === "simplify") {
    const terms = [];
    for (let i = lower; i <= upper; i++) {
      ce.assign(index, i);
      terms.push(fn.simplify());
    }
    result = ce.add(terms).simplify();
  }
  if (mode === "evaluate") {
    const terms = [];
    for (let i = lower; i <= upper; i++) {
      ce.assign(index, i);
      terms.push(fn.evaluate());
    }
    result = ce.add(terms).evaluate();
  }
  if (mode === "N") {
    if (result === null && isFinite2) {
      if (bignumPreferred(ce)) {
        let sum2 = ce.bignum(0);
        for (let i = lower; i <= upper; i++) {
          ce.assign(index, i);
          const term = asBignum(fn.N());
          if (term === null) {
            result = void 0;
            break;
          }
          if (!term.isFinite()) {
            sum2 = term;
            break;
          }
          sum2 = sum2.add(term);
        }
        if (result === null)
          result = ce.number(sum2);
      } else {
        const numericMode = ce.numericMode;
        const precision = ce.precision;
        ce.numericMode = "machine";
        let sum2 = 0;
        for (let i = lower; i <= upper; i++) {
          ce.assign(index, i);
          const term = asFloat(fn.N());
          if (term === null) {
            result = void 0;
            break;
          }
          if (!Number.isFinite(term)) {
            sum2 = term;
            break;
          }
          sum2 += term;
        }
        ce.numericMode = numericMode;
        ce.precision = precision;
        if (result === null)
          result = ce.number(sum2);
      }
    } else if (result === null) {
      ce.assign(index, 1e3);
      const nMax = fn.N();
      ce.assign(index, 999);
      const nMaxMinusOne = fn.N();
      const ratio = asFloat(ce.div(nMax, nMaxMinusOne).N());
      if (ratio !== null && Number.isFinite(ratio) && Math.abs(ratio) > 1) {
        result = ce.PositiveInfinity;
      } else {
        let sum2 = 0;
        const numericMode = ce.numericMode;
        const precision = ce.precision;
        ce.numericMode = "machine";
        for (let i = lower; i <= upper; i++) {
          ce.assign(index, i);
          const term = asFloat(fn.N());
          if (term === null) {
            result = void 0;
            break;
          }
          if (Math.abs(term) < Number.EPSILON || !Number.isFinite(term))
            break;
          sum2 += term;
        }
        ce.numericMode = numericMode;
        ce.precision = precision;
        if (result === null)
          result = ce.number(sum2);
      }
    }
  }
  ce.popScope();
  ce.swapScope(savedContext);
  return result ?? void 0;
}

// src/compute-engine/symbolic/negate.ts
var import_complex9 = __toESM(require_complex(), 1);
function negateLiteral(expr, metadata) {
  let n = expr.numericValue;
  if (n === null)
    return null;
  if (typeof n === "number")
    n = -n;
  else if (n instanceof Decimal)
    n = n.neg();
  else if (n instanceof import_complex9.Complex)
    n = n.neg();
  else if (Array.isArray(n))
    n = neg(n);
  return expr.engine.number(n, { metadata });
}
function canonicalNegate(expr, metadata) {
  if (expr.head === "Negate")
    return expr.op1;
  if (expr.numericValue !== null)
    return negateLiteral(expr, metadata);
  if (expr.head === "Add") {
    let ops2 = expr.ops.map((x) => canonicalNegate(x));
    ops2 = flattenOps(ops2, "Add");
    return expr.engine.add(ops2, metadata);
  }
  if (expr.head === "Multiply") {
    return negateProduct(expr.engine, expr.ops);
  }
  if (expr.head === "Divide")
    return expr.engine._fn("Divide", [canonicalNegate(expr.op1), expr.op2]);
  console.assert(expr.head !== "Subtract");
  return expr.engine._fn("Negate", [expr], metadata);
}
function negateProduct(ce, args) {
  let result = [];
  let done = false;
  for (const arg of args) {
    if (!done && arg.head === "Negate") {
      done = true;
      result.push(arg.op1);
    } else
      result.push(arg);
  }
  if (done)
    return ce.mul(result);
  result = [];
  for (const arg of args) {
    if (done || arg.numericValue === null || !arg.isInteger)
      result.push(arg);
    else {
      done = true;
      result.push(canonicalNegate(arg));
    }
  }
  if (done)
    return ce.mul(result);
  result = [];
  for (const arg of args) {
    if (done || arg.numericValue === null || !arg.isNumber)
      result.push(arg);
    else {
      done = true;
      result.push(canonicalNegate(arg));
    }
  }
  if (done)
    return ce.mul(result);
  return ce._fn("Negate", [ce._fn("Multiply", args)]);
}
function processNegate(_ce, x, _mode = "simplify") {
  return canonicalNegate(x);
}

// src/compute-engine/symbolic/expand.ts
function distribute2(lhs, rhs) {
  if (lhs.head === "Negate" && rhs.head === "Negate")
    return distribute2(lhs.op1, rhs.op1);
  if (lhs.head === "Negate")
    return canonicalNegate(distribute2(lhs.op1, rhs));
  if (rhs.head === "Negate")
    return canonicalNegate(distribute2(lhs, rhs.op1));
  const ce = lhs.engine;
  if (lhs.head === "Divide" && rhs.head === "Divide") {
    const denom = ce.mul([lhs.op2, rhs.op2]);
    return ce.div(distribute2(lhs.op1, rhs.op1), denom);
  }
  if (lhs.head === "Divide")
    return ce.div(distribute2(lhs.op1, rhs), lhs.op2);
  if (rhs.head === "Divide")
    return ce.div(distribute2(lhs, rhs.op1), rhs.op2);
  if (lhs.head === "Add")
    return ce.add(lhs.ops.map((x) => distribute2(x, rhs)));
  if (rhs.head === "Add")
    return ce.add(rhs.ops.map((x) => distribute2(lhs, x)));
  return ce.mul([lhs, rhs]);
}
function distribute(expr) {
  if (expr.length === 1)
    return expr[0];
  if (expr.length === 2)
    return distribute2(expr[0], expr[1]);
  return distribute2(expr[0], distribute(expr.slice(1)));
}
var binomials = [
  [1],
  [1, 1],
  [1, 2, 1],
  [1, 3, 3, 1],
  [1, 4, 6, 4, 1],
  [1, 5, 10, 10, 5, 1],
  [1, 6, 15, 20, 15, 6, 1],
  [1, 7, 21, 35, 35, 21, 7, 1],
  [1, 8, 28, 56, 70, 56, 28, 8, 1]
];
function choose(n, k) {
  while (n >= binomials.length) {
    const s = binomials.length;
    const nextRow = [1];
    const prev = binomials[s - 1];
    for (let i = 1; i < s; i++)
      nextRow[i] = prev[i - 1] + prev[i];
    nextRow[s] = 1;
    binomials.push(nextRow);
  }
  return binomials[n][k];
}
function multinomialCoefficient(k) {
  let n = k.reduce((acc, v) => acc + v, 0);
  let prod = 1;
  for (let i = 0; i < k.length; i += 1) {
    prod *= choose(n, k[i]);
    n -= k[i];
  }
  return prod;
}
function* powers(n, exp2) {
  if (n === 1) {
    yield [exp2];
    return;
  }
  for (let i = 0; i <= exp2; i += 1)
    for (const p of powers(n - 1, exp2 - i))
      yield [i, ...p];
}
function expandMultinomial(expr) {
  if (expr.head !== "Power")
    return null;
  const exp2 = asSmallInteger(expr.op2);
  if (exp2 === null || exp2 < 0)
    return null;
  if (exp2 === 0)
    return expr.engine.One;
  if (exp2 === 1)
    return expr.op1;
  const ce = expr.engine;
  if (expr.op1.head === "Negate") {
    const sign2 = exp2 % 2 === 0 ? 1 : -1;
    const result2 = expandMultinomial(ce.pow(expr.op1.op1, expr.op2));
    if (result2 === null)
      return null;
    if (sign2 > 0)
      return result2;
    return ce.neg(result2);
  }
  console.assert(expr.op1.head !== "Subtract");
  if (expr.op1.head !== "Add")
    return null;
  const terms = expr.op1.ops;
  const it = powers(terms.length, exp2);
  const result = [];
  for (const val of it) {
    const product = [ce.number(multinomialCoefficient(val))];
    for (let i = 0; i < val.length; i += 1) {
      if (val[i] !== 0) {
        if (val[i] === 1)
          product.push(terms[i]);
        else
          product.push(ce.pow(terms[i], val[i]));
      }
    }
    result.push(ce.mul(product));
  }
  return ce.add(result);
}
function expandNumerator(expr) {
  if (expr.head !== "Divide")
    return null;
  const expandedNumerator = expand2(expr.op1);
  if (expandedNumerator === null)
    return null;
  const ce = expr.engine;
  if (expandedNumerator.head === "Add") {
    return ce.add(expandedNumerator.ops.map((x) => ce.div(x, expr.op2)));
  }
  return expr.engine.div(expandedNumerator, expr.op2);
}
function expand2(expr) {
  if (!expr)
    return null;
  let result = expandNumerator(expr);
  if (result !== null)
    return result;
  if (expr.head === "Multiply") {
    result = distribute(expr.ops);
    if (result !== null)
      return result;
  }
  if (expr.head === "Add") {
    const ops2 = expr.ops.map((x) => expand2(x) ?? x);
    return simplifyAdd(expr.engine, ops2);
  }
  if (expr.head === "Negate") {
    result = expand2(expr.op1);
    if (result !== null)
      return expr.engine.neg(result);
  }
  if (expr.head === "Power") {
    result = expandMultinomial(expr);
    if (result !== null)
      return result;
  }
  return null;
}

// src/compute-engine/solve.ts
var UNIVARIATE_ROOTS = [
  // ax = 0
  {
    match: ["Multiply", "_x", "__a"],
    replace: 0,
    id: "ax",
    condition: ({ __a }) => !__a.has("_x")
  },
  // a/x + b = 0
  {
    match: ["Add", ["Divide", "_a", "_x"], "__b"],
    replace: Infinity,
    condition: ({ _a, __b }) => !_a.has("_x") && !__b.has("_x")
  },
  // ax + b = 0
  {
    match: ["Add", ["Multiply", "_x", "__a"], "__b"],
    replace: ["Divide", ["Negate", "__b"], "__a"],
    condition: ({ __a, __b }) => !__a.has("_x") && !__b.has("_x")
  },
  // ax^n + b = 0
  {
    match: ["Add", ["Multiply", "_a", ["Power", "_x", "_n"]], "__b"],
    replace: [
      "Divide",
      ["Power", ["Negate", "__b"], ["Divide", 1, "_n"]],
      "_a"
    ],
    condition: ({ _a, __b, _n }) => !_a.has("_x") && !__b.has("_x") && !_n.isZero
  },
  //
  // Quadratic formula
  // ax^2 + bx + c = 0
  //
  {
    match: [
      "Add",
      ["Multiply", "__a", ["Power", "_x", 2]],
      ["Multiply", "__b", "_x"],
      "__c"
    ],
    replace: [
      "Divide",
      [
        "Add",
        ["Negate", "__b"],
        [
          "Sqrt",
          ["Subtract", ["Square", "__b"], ["Multiply", 4, "__a", "__c"]]
        ]
      ],
      ["Multiply", 2, "__a"]
    ],
    condition: ({ __a, __b, __c }) => !__a.has("_x") && !__b.has("_x") && !__c.has("_x")
  },
  {
    match: [
      "Add",
      ["Multiply", "__a", ["Power", "_x", 2]],
      ["Multiply", "__b", "_x"],
      "__c"
    ],
    replace: [
      "Divide",
      [
        "Subtract",
        ["Negate", "__b"],
        [
          "Sqrt",
          ["Subtract", ["Square", "__b"], ["Multiply", 4, "__a", "__c"]]
        ]
      ],
      ["Multiply", 2, "__a"]
    ],
    condition: ({ __a, __b, __c }) => !__a.has("_x") && !__b.has("_x") && !__c.has("_x")
  },
  // a * e^(bx) + c = 0
  {
    match: [
      "Add",
      ["Multiply", "__a", ["Exp", ["Multiply", "__b", "_x"]]],
      "__c"
    ],
    replace: ["Divide", ["Ln", ["Negate", ["Divide", "__c", "__a"]]], "__b"],
    condition: ({ __a, __c }, ce) => ((!__a.isZero && ce.div(__c, __a).isNegative) ?? false) && !__a.has("_x") && !__c.has("_x")
  },
  // a * e^(x) + c = 0
  {
    match: ["Add", ["Multiply", "__a", ["Exp", "_x"]], "__c"],
    replace: ["Ln", ["Negate", ["Divide", "__c", "__a"]]],
    condition: ({ __a, __c }, ce) => ((!__a.isZero && ce.div(__c, __a).isNegative) ?? false) && !__a.has("_x") && !__c.has("_x")
  }
  // // e^(x) + c = 0
  // {
  //   match: ['Add', ['Exp', '_x'], '__c'],
  //   replace: ['Ln', ['Negate', '__c']],
  //   condition: ({ __c }) => __c.isNegative ?? false,
  // },
  // // e^(bx) + c = 0
  // {
  //   match: ['Add', ['Exp', ['Multiply', '__b', '_x']], '__c'],
  //   replace: ['Divide', ['Ln', ['Negate', '__c']], '__b'],
  //   condition: ({ __c }) => __c.isNegative ?? false,
  // },
  // // a * log_b(x) + c = 0
  // {
  //   match: ['Add', ['Multiply', '__a', ['Log', '_x', '__b']], '__c'],
  //   replace: ['Power', '__b', ['Negate', ['Divide', '__c', '__a']]],
  //   condition: ({ __a, __b }) => (!__a.isZero && __b.isPositive) ?? false,
  // },
  // // a * log_b(x) = 0
  // {
  //   match: ['Multiply', '__a', ['Log', '_x', '__b']],
  //   replace: ['Power', '__b', ['Negate', ['Divide', '__c', '__a']]],
  //   condition: ({ __a, __b }) => (!__a.isZero && __b.isPositive) ?? false,
  // },
  // // |ax + b| + c = 0
  // {
  //   match: ['Add', ['Abs', ['Add', ['Multiply', '__a', '_x'], '__b']], '__c'],
  //   replace: ['Divide', ['Subtract', '__b', '__c'], '__a'],
  // },
  // {
  //   match: ['Add', ['Abs', ['Add', ['Multiply', '__a', '_x'], '__b']], '__c'],
  //   replace: ['Divide', ['Negate', ['Add', '__b', '__c'], '__a']],
  // },
];
function findUnivariateRoots(expr, x) {
  const ce = expr.engine;
  if (expr.head === "Equal") {
    expr = ce.add([expr.op1.canonical, ce.neg(expr.op2.canonical)]).simplify();
  }
  const rules = ce.cache(
    "univariate-roots-rules",
    () => boxRules(ce, UNIVARIATE_ROOTS)
  );
  let exprs = [expr.subs({ [x]: "_x" }, { canonical: false })];
  let result = exprs.flatMap(
    (expr2) => matchRules(expr2, rules, { _x: ce.symbol("_x") })
  );
  if (result.length === 0) {
    exprs = exprs.flatMap((expr2) => harmonize(expr2));
    result = exprs.flatMap(
      (expr2) => matchRules(expr2, rules, { _x: ce.symbol(x) })
    );
  }
  if (result.length === 0) {
    exprs = exprs.flatMap((expr2) => expand2(expr2.canonical)).filter((x2) => x2 !== null);
    exprs = exprs.flatMap((expr2) => harmonize(expr2));
    result = exprs.flatMap(
      (expr2) => matchRules(expr2, rules, { _x: ce.symbol(x) })
    );
  }
  return result.map((x2) => x2.evaluate());
}
var HARMONIZATION_RULES = [
  // |ax + b| + c -> ax+b+c, -ax-b+c
  {
    match: ["Add", ["Abs", ["Add", ["Multiply", "__a", "_x"], "__b"]], "__c"],
    replace: ["Add", ["Multiply", "__a", "_x"], "__b", "__c"]
  },
  {
    match: ["Add", ["Abs", ["Add", ["Multiply", "__a", "_x"], "__b"]], "__c"],
    replace: [
      "Add",
      ["Negate", ["Multiply", "__a", "_x"]],
      ["Negate", "__b"],
      "__c"
    ]
  },
  // a(b^n) -> a
  {
    match: ["Multiply", "__a", ["Power", "_b", "_n"]],
    replace: "_b",
    condition: ({ __a, _b, _n }) => !__a.has("_x") && _b.has("_x") && !_n.isZero
  },
  // a√b(x)  -> a^2 b(x)
  {
    match: ["Multiply", "__a", ["Sqrt", "_b"]],
    replace: ["Multiply", ["Square", "_a"], "__b"],
    condition: ({ _b }) => _b.has("_x")
  },
  // a(x)/b -> a(x)
  {
    match: ["Divide", "_a", "_b"],
    replace: "_a",
    condition: ({ _a, _b }) => _a.has("_x") && !_b.isZero
  },
  // ab(x) -> b(x)
  {
    match: ["Multiply", "__a", "_b"],
    replace: "_b",
    condition: ({ __a, _b }) => !__a.has("_x") && _b.has("_x")
  },
  // ln(a(x))+ln(b(x))+c -> ln(a(x)b(x)) + c
  {
    match: ["Add", ["Ln", "_a"], ["Ln", "_b"], "__c"],
    replace: ["Add", ["Ln", ["Multiply", "_a", "_b"]], "__c"]
  },
  // e^a * e^b -> e^(a+b)
  {
    match: ["Multiply", ["Exp", "__a"], ["Exp", "__b"], "__c"],
    replace: ["Multiply", ["Exp", ["Add", "_a", "_b"]], "__c"]
  },
  // ln(f(x)) -> f(x) - 1
  {
    match: ["Ln", "_a"],
    replace: ["Subtract", "_a", 1],
    condition: ({ _a }) => _a.has("_x")
  },
  // sin(f(x)) -> f(x)
  {
    match: ["Sin", "_a"],
    replace: "_a",
    condition: ({ _a }) => _a.has("_x")
  },
  // cos(f(x)) -> f(x) - π/2
  {
    match: ["Cos", "_a"],
    replace: ["Subtract", "_a", ["Divide", "Pi", 2]],
    condition: ({ _a }) => _a.has("_x")
  },
  // tan(f(x)) -> f(x) - π/4
  {
    match: ["Tan", "_a"],
    replace: "_a",
    condition: ({ _a }) => _a.has("_x")
  },
  // sin(a) + cos(a) -> 1
  {
    match: ["Add", ["Sin", "_a"], ["Cos", "_a"]],
    replace: 1,
    condition: ({ _a }) => _a.has("_x")
  },
  // sin^2(a) - cos^2(a) -> sin(x) +/- √(2)/2
  {
    match: ["Subtract", ["Square", ["Sin", "_a"]], ["Square", ["Cos", "_a"]]],
    replace: ["PlusMinus", ["Sin", "_a"], ["Divide", ["Sqrt", 2], 2]],
    condition: ({ _a }) => _a.has("_x")
  }
];
function harmonize(expr) {
  const ce = expr.engine;
  const rules = ce.cache(
    "univariate-roots-rules",
    () => boxRules(ce, HARMONIZATION_RULES)
  );
  let result = matchRules(expr, rules, { _x: ce.symbol("_x") });
  return result;
}

// src/compute-engine/assume.ts
function assume(proposition) {
  if (proposition.head === "Element")
    return assumeElement(proposition);
  if (proposition.head === "Equal")
    return assumeEquality(proposition);
  if (isInequality(proposition))
    return assumeInequality(proposition);
  return "not-a-predicate";
}
function assumeEquality(proposition) {
  console.assert(proposition.head === "Equal");
  const unknowns = proposition.unknowns;
  if (unknowns.length === 0) {
    const val = proposition.evaluate();
    if (val.symbol === "True")
      return "tautology";
    if (val.symbol === "False")
      return "contradiction";
    console.log(proposition.canonical.evaluate());
    return "not-a-predicate";
  }
  const ce = proposition.engine;
  const lhs = proposition.op1.symbol;
  if (lhs && !hasValue(ce, lhs) && !proposition.op2.has(lhs)) {
    const val = proposition.op2.evaluate();
    if (!val.isValid)
      return "not-a-predicate";
    const def = ce.lookupSymbol(lhs);
    if (!def) {
      ce.defineSymbol(lhs, { value: val, domain: val.domain });
      return "ok";
    }
    if (def.domain && !val.domain?.isCompatible(def.domain))
      return "contradiction";
    def.value = val;
    return "ok";
  }
  if (unknowns.length === 1) {
    const lhs2 = unknowns[0];
    const sols = findUnivariateRoots(proposition, lhs2);
    if (sols.length === 0) {
      ce.assumptions.set(
        ce.fn("Equal", [
          ce.add([proposition.op1.canonical, ce.neg(proposition.op2.canonical)]).simplify(),
          0
        ]),
        true
      );
    }
    const val = sols.length === 1 ? sols[0] : ce.fn("List", sols);
    const def = ce.lookupSymbol(lhs2);
    if (!def) {
      ce.defineSymbol(lhs2, { value: val, domain: val.domain });
      return "ok";
    }
    if (def.domain && !sols.every((sol) => !sol.domain || val.domain?.isCompatible(sol.domain)))
      return "contradiction";
    def.value = val;
    return "ok";
  }
  ce.assumptions.set(proposition, true);
  return "ok";
}
function assumeInequality(proposition) {
  const ce = proposition.engine;
  if (proposition.op1.symbol && !hasDef(ce, proposition.op1.symbol)) {
    if (proposition.op2.evaluate().isZero) {
      if (proposition.head === "Less") {
        ce.defineSymbol(proposition.op1.symbol, {
          domain: ce.domain("NegativeNumbers")
        });
      } else if (proposition.head === "LessEqual") {
        ce.defineSymbol(proposition.op1.symbol, {
          domain: ce.domain("NonPositiveNumbers")
        });
      } else if (proposition.head === "Greater") {
        ce.defineSymbol(proposition.op1.symbol, {
          domain: ce.domain("PositiveNumbers")
        });
      } else if (proposition.head === "GreaterEqual") {
        ce.defineSymbol(proposition.op1.symbol, {
          domain: ce.domain("NonNegativeNumbers")
        });
      }
    } else {
      ce.defineSymbol(proposition.op1.symbol, {
        domain: ce.domain("ExtendedRealNumbers")
      });
      ce.assumptions.set(proposition, true);
    }
    return "ok";
  }
  let op3 = "";
  let lhs;
  let rhs;
  if (proposition.head === "Less") {
    lhs = proposition.op1;
    rhs = proposition.op2;
    op3 = "<";
  } else if (proposition.head === "LessEqual") {
    lhs = proposition.op1;
    rhs = proposition.op2;
    op3 = "<=";
  } else if (proposition.head === "Greater") {
    lhs = proposition.op2;
    rhs = proposition.op1;
    op3 = "<";
  } else if (proposition.head === "GreaterEqual") {
    lhs = proposition.op2;
    rhs = proposition.op1;
    op3 = "<=";
  }
  if (!op3)
    return "internal-error";
  const p = ce.add([lhs.canonical, ce.neg(rhs.canonical)]).simplify();
  const result = ce.box([op3 === "<" ? "Less" : "LessEqual", p, 0]).evaluate();
  if (result.symbol === "True")
    return "tautology";
  if (result.symbol === "False")
    return "contradiction";
  const unknowns = result.unknowns;
  if (unknowns.length === 0)
    return "not-a-predicate";
  if (unknowns.length === 1) {
    if (!ce.lookupSymbol(unknowns[0]))
      ce.defineSymbol(unknowns[0], { domain: "ExtendedRealNumbers" });
  }
  console.assert(result.head === "Less" || result.head === "LessEqual");
  ce.assumptions.set(result, true);
  return "ok";
}
function assumeElement(proposition) {
  console.assert(proposition.head === "Element");
  const ce = proposition.engine;
  const undefs = undefinedIdentifiers(proposition.op1);
  if (undefs.length === 1) {
    const dom = ce.domain(proposition.op2.evaluate().json);
    if (!dom.isValid)
      return "not-a-predicate";
    ce.declare(undefs[0], dom);
    return "ok";
  }
  if (proposition.op1.symbol && hasDef(ce, proposition.op1.symbol)) {
    const dom = ce.domain(proposition.op2.evaluate().json);
    if (!dom.isValid)
      return "not-a-predicate";
    if (!ce.context?.ids?.has(proposition.op1.symbol))
      ce.declare(proposition.op1.symbol, dom);
    const def = ce.lookupSymbol(proposition.op1.symbol);
    if (def) {
      if (def.domain && !dom.isCompatible(def.domain))
        return "contradiction";
      def.domain = dom;
      return "ok";
    }
    const fdef = ce.lookupFunction(proposition.op1.symbol);
    if (fdef) {
      if (!dom.isCompatible(signatureToDomain(ce, fdef.signature)))
        return "contradiction";
      return "ok";
    }
    return "not-a-predicate";
  }
  if (undefs.length > 0) {
    ce.assumptions.set(proposition, true);
    return "ok";
  }
  const val = proposition.evaluate();
  if (val.symbol === "True")
    return "tautology";
  if (val.symbol === "False")
    return "contradiction";
  return "not-a-predicate";
}
function hasDef(ce, s) {
  return (ce.lookupSymbol(s) ?? ce.lookupFunction(s)) !== void 0;
}
function undefinedIdentifiers(expr) {
  return expr.symbols.filter((x) => !hasDef(expr.engine, x));
}
function hasValue(ce, s) {
  if (ce.lookupFunction(s))
    return false;
  return ce.lookupSymbol(s)?.value !== void 0;
}
function isInequality(expr) {
  const h = expr.head;
  if (typeof h !== "string")
    return false;
  return ["Less", "Greater", "LessEqual", "GreaterEqual"].includes(h);
}

// src/compute-engine/boxed-expression/box.ts
var import_complex16 = __toESM(require_complex(), 1);

// src/compute-engine/boxed-expression/serialize.ts
var import_complex11 = __toESM(require_complex(), 1);

// src/compute-engine/numerics/numeric-bignum.ts
function gcd3(a, b) {
  console.assert(a.isInteger() && b.isInteger());
  while (!b.isZero())
    [a, b] = [b, a.modulo(b)];
  return a.abs();
}
function lcm2(a, b) {
  return a.mul(b).div(gcd3(a, b));
}
function factorial3(ce, n) {
  if (!n.isInteger() || n.isNegative())
    return ce._BIGNUM_NAN;
  if (n.lessThan(10))
    return ce.bignum(
      [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800][n.toNumber()]
    );
  if (n.gt(Number.MAX_SAFE_INTEGER)) {
    let val2 = ce._BIGNUM_ONE;
    let i = ce._BIGNUM_TWO;
    while (i.lessThan(n)) {
      val2 = val2.mul(i);
      i = i.add(1);
    }
    return val2;
  }
  if (n.modulo(2).eq(1)) {
    return n.times(factorial3(ce, n.minus(1)));
  }
  let loop = n.toNumber();
  let sum2 = n;
  let val = n;
  while (loop > 2) {
    loop -= 2;
    sum2 = sum2.add(loop);
    val = val.mul(sum2);
  }
  return val;
}
function factorial22(ce, n) {
  if (!n.isInteger() || n.isNegative())
    return ce._BIGNUM_NAN;
  if (n.lessThan(1))
    return ce._BIGNUM_ONE;
  let result = n;
  while (n.greaterThan(2)) {
    n = n.minus(2);
    result = result.mul(n);
  }
  return result;
}
var gammaG2 = 7;
function gammaln2(ce, z) {
  if (z.isNegative())
    return ce._BIGNUM_NAN;
  const GAMMA_P_LN = ce.cache("gamma-p-ln", () => {
    return [
      "0.99999999999999709182",
      "57.156235665862923517",
      "-59.597960355475491248",
      "14.136097974741747174",
      "-0.49191381609762019978",
      "0.33994649984811888699e-4",
      "0.46523628927048575665e-4",
      "-0.98374475304879564677e-4",
      "0.15808870322491248884e-3",
      "-0.21026444172410488319e-3",
      "0.2174396181152126432e-3",
      "-0.16431810653676389022e-3",
      "0.84418223983852743293e-4",
      "-0.2619083840158140867e-4",
      "0.36899182659531622704e-5"
    ].map((x2) => ce.bignum(x2));
  });
  let x = GAMMA_P_LN[0];
  for (let i = GAMMA_P_LN.length - 1; i > 0; --i) {
    x = x.add(GAMMA_P_LN[i].div(z.add(i)));
  }
  const GAMMA_G_LN = ce.cache("gamma-g-ln", () => ce.bignum(607).div(128));
  const t = z.add(GAMMA_G_LN).add(ce._BIGNUM_HALF);
  return ce._BIGNUM_NEGATIVE_ONE.acos().mul(ce._BIGNUM_TWO).log().mul(ce._BIGNUM_HALF).add(
    t.log().mul(z.add(ce._BIGNUM_HALF)).minus(t).add(x.log()).minus(z.log())
  );
}
function gamma2(ce, z) {
  if (z.lessThan(ce._BIGNUM_HALF)) {
    const pi = ce._BIGNUM_NEGATIVE_ONE.acos();
    return pi.div(
      pi.mul(z).sin().mul(gamma2(ce, ce._BIGNUM_ONE.sub(z)))
    );
  }
  if (z.greaterThan(100))
    return gammaln2(ce, z).exp();
  z = z.sub(1);
  const LANCZOS_7_C = ce.cache("lanczos-7-c", () => {
    return [
      "0.99999999999980993227684700473478",
      "676.520368121885098567009190444019",
      "-1259.13921672240287047156078755283",
      "771.3234287776530788486528258894",
      "-176.61502916214059906584551354",
      "12.507343278686904814458936853",
      "-0.13857109526572011689554707",
      "9.984369578019570859563e-6",
      "1.50563273514931155834e-7"
    ].map((x2) => ce.bignum(x2));
  });
  let x = LANCZOS_7_C[0];
  for (let i = 1; i < gammaG2 + 2; i++)
    x = x.add(LANCZOS_7_C[i].div(z.add(i)));
  const t = z.add(gammaG2).add(ce._BIGNUM_HALF);
  return ce._BIGNUM_NEGATIVE_ONE.acos().times(ce._BIGNUM_TWO).sqrt().mul(x.mul(t.neg().exp()).mul(t.pow(z.add(ce._BIGNUM_HALF))));
}
function isInMachineRange(d) {
  if (!d.isFinite())
    return true;
  if (d.d.length > 3 || d.d.length === 3 && d.d[0] >= 90)
    return false;
  console.assert(d.precision() <= 16);
  return d.e < 308 && d.e > -306;
}

// src/compute-engine/symbolic/product.ts
var import_complex10 = __toESM(require_complex(), 1);
var Product = class {
  constructor(ce, xs, options) {
    this.options = options;
    // Other terms of the product, `term` is the key
    this._terms = [];
    this._hasInfinity = false;
    this._hasZero = false;
    // If `false`, the running products are not calculated
    this._isCanonical = true;
    options = options ? { ...options } : {};
    if (!("canonical" in options))
      options.canonical = true;
    this._isCanonical = options.canonical;
    this.engine = ce;
    this._sign = 1;
    this._rational = bignumPreferred(ce) ? [BigInt(1), BigInt(1)] : [1, 1];
    this._complex = import_complex10.Complex.ONE;
    this._bignum = ce._BIGNUM_ONE;
    this._number = 1;
    if (xs)
      for (const x of xs)
        this.addTerm(x);
  }
  get isEmpty() {
    if (!this._isCanonical)
      return this._terms.length === 0;
    return this._terms.length === 0 && this._hasInfinity === false && this._hasZero === false && this._sign === 1 && isRationalOne(this._rational) && // isRationalOne(this._squareRootRational) &&
    this._complex.re === 1 && this._complex.im === 0 && this._bignum.eq(this.engine._BIGNUM_ONE) && this._number === 1;
  }
  /**
   * Add a term to the product.
   *
   * If `this._isCanonical` a running product of exact terms is kept.
   * Otherwise, terms and their exponent are tallied.
   */
  addTerm(term) {
    console.assert(term.isCanonical);
    if (term.head === "Multiply") {
      for (const t of term.ops)
        this.addTerm(t);
      return;
    }
    if (this._isCanonical) {
      if (term.isNothing)
        return;
      if (term.numericValue !== null) {
        if (term.isOne)
          return;
        if (term.isZero) {
          this._hasZero = true;
          return;
        }
        if (term.isNegativeOne) {
          this._sign *= -1;
          return;
        }
        if (term.isInfinity) {
          this._hasInfinity = true;
          if (term.isNegative)
            this._sign *= -1;
          return;
        }
        let num = term.numericValue;
        if (typeof num === "number") {
          if (num < 0) {
            this._sign *= -1;
            num = -num;
          }
          if (Number.isInteger(num))
            this._rational = mul2(this._rational, [num, 1]);
          else if (bignumPreferred(this.engine))
            this._bignum = this._bignum.mul(num);
          else
            this._number *= num;
          return;
        }
        if (num instanceof Decimal) {
          if (num.isNegative()) {
            this._sign *= -1;
            num = num.neg();
          }
          if (num.isInteger())
            this._rational = mul2(this._rational, [bigint(num), BigInt(1)]);
          else if (bignumPreferred(this.engine))
            this._bignum = this._bignum.mul(num);
          else
            this._number *= num.toNumber();
          return;
        }
        if (num instanceof import_complex10.Complex) {
          this._complex = this._complex.mul(num);
          return;
        }
        if (isRational(num)) {
          this._rational = mul2(this._rational, num);
          if (isNeg(this._rational)) {
            this._sign *= -1;
            this._rational = neg(this._rational);
          }
          return;
        }
      }
    }
    let rest = term;
    if (this._isCanonical) {
      let coef;
      [coef, rest] = asCoefficient(term);
      this._rational = mul2(this._rational, coef);
      if (isNeg(this._rational)) {
        this._sign *= -1;
        this._rational = neg(this._rational);
      }
    }
    if (rest.numericValue !== null && rest.isOne)
      return;
    let exponent = [1, 1];
    if (rest.head === "Power") {
      const r = asRational(rest.op2);
      if (r) {
        exponent = r;
        rest = rest.op1;
      }
    } else if (rest.head === "Divide") {
      this.addTerm(rest.op1);
      exponent = [-1, 1];
      rest = rest.op2;
    }
    let found = false;
    for (const x of this._terms) {
      if (x.term.isSame(rest)) {
        x.exponent = add2(x.exponent, exponent);
        found = true;
        break;
      }
    }
    if (!found)
      this._terms.push({ term: rest, exponent });
  }
  unitTerms(mode) {
    const ce = this.engine;
    if (mode === "numeric") {
      if (!complexAllowed(ce) && this._complex.im !== 0)
        return null;
      if (bignumPreferred(ce)) {
        let b2 = ce._BIGNUM_ONE;
        if (!isRationalOne(this._rational)) {
          if (isBigRational(this._rational))
            b2 = ce.bignum(this._rational[0].toString()).div(ce.bignum(this._rational[1].toString()));
          else
            b2 = ce.bignum(this._rational[0]).div(this._rational[1]);
        }
        b2 = b2.mul(this._bignum).mul(this._sign * this._number);
        if (this._complex.im !== 0) {
          const z = this._complex.mul(b2.toNumber());
          if (z.equals(1))
            return [];
          return [{ exponent: [1, 1], terms: [ce.number(z)] }];
        }
        b2 = b2.mul(this._complex.re);
        if (b2.equals(1))
          return [];
        return [{ exponent: [1, 1], terms: [ce.number(b2)] }];
      }
      let n2 = 1;
      if (!isRationalOne(this._rational)) {
        if (isBigRational(this._rational))
          n2 = Number(this._rational[0]) / Number(this._rational[1]);
        else
          n2 = this._rational[0] / this._rational[1];
      }
      n2 *= this._sign * this._number * this._bignum.toNumber();
      if (this._complex.im !== 0) {
        const z = this._complex.mul(n2);
        if (z.equals(1))
          return [];
        return [{ exponent: [1, 1], terms: [ce.number(z)] }];
      }
      n2 *= this._complex.re;
      if (n2 === 1)
        return [];
      return [{ exponent: [1, 1], terms: [ce.number(n2)] }];
    }
    const xs = [];
    const unitTerms = [];
    if (this._hasInfinity)
      unitTerms.push(ce.PositiveInfinity);
    this._rational = reducedRational(this._rational);
    if (this._complex.re !== 1 || this._complex.im !== 0) {
      if (this._complex.im === 0)
        this._number *= Math.abs(this._complex.re);
      if (this._complex.re < 0)
        this._rational = neg(this._rational);
      else {
        unitTerms.push(ce.number(this._complex));
      }
    }
    let n = this._sign * this._number;
    let b = this._bignum;
    if (!isRationalOne(this._rational)) {
      if (mode === "rational") {
        if (machineNumerator(this._rational) !== 1) {
          if (isBigRational(this._rational))
            b = b.mul(ce.bignum(this._rational[0]));
          else
            n *= this._rational[0];
        }
        if (machineDenominator(this._rational) !== 1)
          xs.push({
            exponent: [-1, 1],
            terms: [ce.number(this._rational[1])]
          });
      } else {
        if (n === -1) {
          unitTerms.push(ce.number(neg(this._rational)));
          n = 1;
        } else
          unitTerms.push(ce.number(this._rational));
      }
    }
    if (!b.equals(ce._BIGNUM_ONE))
      unitTerms.push(ce.number(b.mul(n)));
    else if (n !== 1)
      unitTerms.push(ce.number(n));
    if (unitTerms.length > 0)
      xs.push({ exponent: [1, 1], terms: unitTerms });
    return xs;
  }
  /** The terms of the product, grouped by degrees.
   *
   * If `mode` is `rational`, rationals are split into separate numerator and
   * denominator, so that a rational expression can be created later
   * If `mode` is `expression`, a regular expression is returned, without
   * splitting rationals
   * If `mode` is `numeric`, the literals are combined into one expression
   *
   */
  groupedByDegrees(options) {
    options ?? (options = {});
    if (!("mode" in options))
      options.mode = "expression";
    const ce = this.engine;
    if (options.mode === "numeric") {
      if (this._complex.im !== 0 && !complexAllowed(ce))
        return null;
      if (this._hasInfinity)
        return [{ exponent: [1, 1], terms: [ce.PositiveInfinity] }];
    }
    const xs = this.unitTerms(options.mode ?? "expression");
    if (xs === null)
      return null;
    for (const t of this._terms) {
      const exponent = reducedRational(t.exponent);
      if (exponent[0] === 0)
        continue;
      let found = false;
      for (const x of xs) {
        if (exponent[0] === x.exponent[0] && exponent[1] === x.exponent[1]) {
          x.terms.push(t.term);
          found = true;
          break;
        }
      }
      if (!found)
        xs.push({ exponent, terms: [t.term] });
    }
    return xs;
  }
  asExpression(mode = "evaluate") {
    const ce = this.engine;
    if (this._hasInfinity) {
      if (this._hasZero)
        return ce.NaN;
      if (this._terms.length === 0) {
        if (machineNumerator(this._rational) > 0)
          return ce.PositiveInfinity;
        return ce.NegativeInfinity;
      }
    }
    if (this._hasZero)
      return ce.Zero;
    const groupedTerms = this.groupedByDegrees({
      mode: mode === "N" ? "numeric" : "expression"
    });
    if (groupedTerms === null)
      return ce.NaN;
    const terms = termsAsExpressions(ce, groupedTerms);
    if (terms.length === 0)
      return ce.One;
    if (terms.length === 1)
      return terms[0];
    return this.engine._fn("Multiply", terms);
  }
  /** The product, expressed as a numerator and denominator */
  asNumeratorDenominator() {
    const xs = this.groupedByDegrees({ mode: "rational" });
    if (xs === null)
      return [this.engine.NaN, this.engine.NaN];
    const xsNumerator = [];
    const xsDenominator = [];
    for (const x of xs)
      if (x.exponent[0] >= 0)
        xsNumerator.push(x);
      else
        xsDenominator.push({
          exponent: neg(x.exponent),
          terms: x.terms
        });
    const ce = this.engine;
    const numeratorTerms = termsAsExpressions(ce, xsNumerator);
    let numerator = ce.One;
    if (numeratorTerms.length === 1)
      numerator = numeratorTerms[0];
    else if (numeratorTerms.length > 0)
      numerator = ce._fn("Multiply", numeratorTerms);
    const denominatorTerms = termsAsExpressions(ce, xsDenominator);
    let denominator = ce.One;
    if (denominatorTerms.length === 1)
      denominator = denominatorTerms[0];
    else if (denominatorTerms.length > 0)
      denominator = ce._fn("Multiply", denominatorTerms);
    return [numerator, denominator];
  }
  asRationalExpression() {
    const [numerator, denominator] = this.asNumeratorDenominator();
    if (denominator.numericValue !== null) {
      if (denominator.isOne)
        return numerator;
      if (denominator.isNegativeOne)
        return this.engine.neg(numerator);
    }
    return this.engine._fn("Divide", [numerator, denominator]);
  }
};
function degreeKey(exponent) {
  if (isRationalOne(exponent))
    return 0;
  const [n, d] = [machineNumerator(exponent), machineDenominator(exponent)];
  if (n > 0 && Number.isInteger(n / d))
    return 1;
  if (n > 0)
    return 2;
  if (Number.isInteger(n / d))
    return 3;
  return 4;
}
function degreeOrder(a, b) {
  const keyA = degreeKey(a.exponent);
  const keyB = degreeKey(b.exponent);
  if (keyA !== keyB)
    return keyA - keyB;
  const [a_n, a_d] = [
    machineNumerator(a.exponent),
    machineDenominator(a.exponent)
  ];
  const [b_n, b_d] = [
    machineNumerator(b.exponent),
    machineDenominator(b.exponent)
  ];
  return a_n / a_d - b_n / b_d;
}
function termsAsExpressions(ce, terms) {
  const result = terms.sort(degreeOrder).map((x) => {
    const t = flattenOps(x.terms, "Multiply");
    const base = t.length <= 1 ? t[0] : ce._fn("Multiply", t.sort(order));
    return ce.pow(base, x.exponent);
  });
  return flattenOps(result, "Multiply") ?? result;
}

// src/compute-engine/boxed-expression/serialize.ts
function subtract(ce, a, b, metadata) {
  if (a.numericValue !== null) {
    if (isRational(a.numericValue)) {
      if (machineNumerator(a.numericValue) < 0) {
        return serializeJsonFunction(
          ce,
          "Subtract",
          [b, ce.number(neg(a.numericValue))],
          metadata
        );
      }
      return null;
    }
    const t0 = asSmallInteger(a);
    if (t0 !== null && t0 < 0)
      return serializeJsonFunction(
        ce,
        "Subtract",
        [b, ce.number(-t0)],
        metadata
      );
  }
  if (a.head === "Negate")
    return serializeJsonFunction(ce, "Subtract", [b, a.op1], metadata);
  return null;
}
function serializeJsonCanonicalFunction(ce, head2, args, metadata) {
  const exclusions = ce.jsonSerializationOptions.exclude;
  if (head2 === "Add" && args.length === 2 && !exclusions.includes("Subtract")) {
    const sub2 = subtract(ce, args[0], args[1], metadata) ?? subtract(ce, args[1], args[0], metadata);
    if (sub2)
      return sub2;
  }
  if (head2 === "Divide" && args.length === 2 && exclusions.includes("Divide")) {
    return serializeJsonFunction(
      ce,
      "Multiply",
      [args[0], ce._fn("Power", [args[1], ce.NegativeOne])],
      metadata
    );
  }
  if (head2 === "Multiply" && !exclusions.includes("Negate")) {
    if (asFloat(args[0]) === -1) {
      if (args.length === 2)
        return serializeJsonFunction(ce, "Negate", [args[1]]);
      return serializeJsonFunction(
        ce,
        "Negate",
        [ce._fn("Multiply", args.slice(1))],
        metadata
      );
    }
  }
  if (head2 === "Multiply" && !exclusions.includes("Divide")) {
    const result = new Product(ce, args, {
      canonical: false
    }).asRationalExpression();
    if (result.head === "Divide")
      return serializeJsonFunction(ce, result.head, result.ops, metadata);
  }
  if (head2 === "Power") {
    if (!exclusions.includes("Exp") && args[0]?.symbol === "ExponentialE")
      return serializeJsonFunction(ce, "Exp", [args[1]], metadata);
    if (args[1]?.numericValue !== null) {
      const exp2 = asSmallInteger(args[1]);
      if (exp2 === 2 && !exclusions.includes("Square"))
        return serializeJsonFunction(ce, "Square", [args[0]], metadata);
      if (exp2 !== null && exp2 < 0 && !exclusions.includes("Divide")) {
        return serializeJsonFunction(
          ce,
          "Divide",
          [ce.One, exp2 === -1 ? args[0] : ce.pow(args[0], -exp2)],
          metadata
        );
      }
      const r = args[1].numericValue;
      if (!exclusions.includes("Sqrt") && r === 0.5)
        return serializeJsonFunction(ce, "Sqrt", [args[0]], metadata);
      if (!exclusions.includes("Sqrt") && r === -0.5)
        return serializeJsonFunction(
          ce,
          "Divide",
          [ce.One, ce._fn("Sqrt", [args[0]])],
          metadata
        );
      if (isRational(r)) {
        const n = machineNumerator(r);
        const d = machineDenominator(r);
        if (n === 1) {
          if (!exclusions.includes("Sqrt") && d === 2)
            return serializeJsonFunction(ce, "Sqrt", [args[0]], metadata);
          if (!exclusions.includes("Root"))
            return serializeJsonFunction(
              ce,
              "Root",
              [args[0], ce.number(r[1])],
              metadata
            );
        }
        if (n === -1) {
          if (!exclusions.includes("Sqrt") && d === 2)
            return serializeJsonFunction(
              ce,
              "Divide",
              [ce.One, ce._fn("Sqrt", [args[0]])],
              metadata
            );
          if (!exclusions.includes("Root"))
            return serializeJsonFunction(
              ce,
              "Divide",
              [ce.One, ce._fn("Root", [args[0], ce.number(r[1])])],
              metadata
            );
        }
      }
    }
  }
  return serializeJsonFunction(ce, head2, args, metadata);
}
function serializeJsonFunction(ce, head2, args, metadata) {
  const exclusions = ce.jsonSerializationOptions.exclude;
  if ((head2 === "Rational" || head2 === "Divide") && args.length === 2 && asSmallInteger(args[0]) === 1 && asSmallInteger(args[1]) === 2 && !exclusions.includes("Half")) {
    return serializeJsonSymbol(ce, "Half", {
      ...metadata,
      wikidata: "Q39373172"
    });
  }
  if (args.length === 1) {
    const num0 = args[0]?.numericValue;
    if (head2 === "Negate" && num0 !== null) {
      if (typeof num0 === "number")
        return serializeJsonNumber(ce, -num0);
      if (num0 instanceof Decimal)
        return serializeJsonNumber(ce, num0.neg());
      if (num0 instanceof import_complex11.Complex)
        return serializeJsonNumber(ce, num0.neg());
      if (isRational(num0))
        return serializeJsonNumber(ce, neg(num0));
    }
  }
  if (typeof head2 === "string" && exclusions.includes(head2)) {
    if (head2 === "Rational" && args.length === 2)
      return serializeJsonFunction(ce, "Divide", args, metadata);
    if (head2 === "Complex" && args.length === 2)
      return serializeJsonFunction(
        ce,
        "Add",
        [
          args[0],
          ce._fn("Multiply", [args[1] ?? ce.symbol("Undefined"), ce.I])
        ],
        metadata
      );
    if (head2 === "Sqrt" && args.length === 1)
      return serializeJsonFunction(
        ce,
        "Power",
        [args[0], exclusions.includes("Half") ? ce.number([1, 2]) : ce.Half],
        metadata
      );
    if (head2 === "Root" && args.length === 2 && args[1]?.numericValue !== null) {
      const n = asSmallInteger(args[1]);
      if (n === 2)
        return serializeJsonFunction(ce, "Sqrt", [args[0]]);
      if (n !== null) {
        if (n < 0)
          return serializeJsonFunction(
            ce,
            "Divide",
            [
              ce.One,
              ce._fn("Power", [
                args[0] ?? ce.symbol("Undefined"),
                ce.number([1, -n])
              ])
            ],
            metadata
          );
        return serializeJsonFunction(
          ce,
          "Power",
          [args[0], ce.number([1, -n])],
          metadata
        );
      }
    }
    if (head2 === "Square" && args.length === 1)
      return serializeJsonFunction(
        ce,
        "Power",
        [args[0], ce.number(2)],
        metadata
      );
    if (head2 === "Exp" && args.length === 1)
      return serializeJsonFunction(ce, "Power", [ce.E, args[0]], metadata);
    if (head2 === "Subtract" && args.length === 2)
      return serializeJsonFunction(
        ce,
        "Add",
        [args[0], ce._fn("Negate", [args[1] ?? ce.symbol("Undefined")])],
        metadata
      );
    if (head2 === "Subtract" && args.length === 1)
      return serializeJsonFunction(ce, "Negate", args, metadata);
  }
  if (head2 === "Add" && args.length === 2 && !exclusions.includes("Subtract")) {
    if (args[1]?.numericValue !== null) {
      const t1 = asSmallInteger(args[1]);
      if (t1 !== null && t1 < 0)
        return serializeJsonFunction(
          ce,
          "Subtract",
          [args[0], ce.number(-t1)],
          metadata
        );
    }
    if (args[1]?.head === "Negate") {
      return serializeJsonFunction(
        ce,
        "Subtract",
        [args[0], args[1].op1],
        metadata
      );
    }
  }
  if (head2 === "Tuple") {
    if (args.length === 1 && !exclusions.includes("Single"))
      return serializeJsonFunction(ce, "Single", args, metadata);
    if (args.length === 2 && !exclusions.includes("Pair"))
      return serializeJsonFunction(ce, "Pair", args, metadata);
    if (args.length === 3 && !exclusions.includes("Triple"))
      return serializeJsonFunction(ce, "Triple", args, metadata);
  }
  const jsonHead = typeof head2 === "string" ? _escapeJsonString(head2) : head2.json;
  const fn = [jsonHead, ...args.map((x) => x?.json ?? "Undefined")];
  const md = { ...metadata ?? {} };
  if (ce.jsonSerializationOptions.metadata.includes("latex")) {
    md.latex = _escapeJsonString(md.latex ?? ce.serialize({ fn }));
  } else
    md.latex = "";
  if (!ce.jsonSerializationOptions.metadata.includes("wikidata"))
    md.wikidata = "";
  if (!md.latex && !md.wikidata && ce.jsonSerializationOptions.shorthands.includes("function"))
    return fn;
  if (md.latex && md.wikidata)
    return { fn, latex: md.latex, wikidata: md.wikidata };
  if (md.latex)
    return { fn, latex: md.latex };
  if (md.wikidata)
    return { fn, wikidata: md.wikidata };
  return { fn };
}
function serializeJsonString(ce, s) {
  s = _escapeJsonString(s);
  if (ce.jsonSerializationOptions.shorthands.includes("string"))
    return `'${s}'`;
  return { str: s };
}
function serializeJsonSymbol(ce, sym, metadata) {
  if (sym === "Half" && ce.jsonSerializationOptions.exclude.includes("Half")) {
    return serializeJsonNumber(ce, [1, 2], metadata);
  }
  metadata = { ...metadata };
  if (ce.jsonSerializationOptions.metadata.includes("latex")) {
    metadata.latex = metadata.latex ?? ce.serialize({ sym });
    if (metadata.latex !== void 0)
      metadata.latex = _escapeJsonString(metadata.latex);
  } else
    metadata.latex = void 0;
  if (ce.jsonSerializationOptions.metadata.includes("wikidata")) {
    if (metadata.wikidata === void 0) {
      const wikidata = ce.lookupSymbol(sym)?.wikidata;
      if (wikidata !== void 0)
        metadata.wikidata = _escapeJsonString(wikidata);
    }
  } else
    metadata.wikidata = void 0;
  sym = _escapeJsonString(sym);
  if (metadata.latex === void 0 && metadata.wikidata === void 0 && ce.jsonSerializationOptions.shorthands.includes("symbol"))
    return sym;
  if (metadata.latex !== void 0 && metadata.wikidata !== void 0)
    return { sym, latex: metadata.latex, wikidata: metadata.wikidata };
  if (metadata.latex !== void 0)
    return { sym, latex: metadata.latex };
  if (metadata.wikidata !== void 0)
    return { sym, wikidata: metadata.wikidata };
  return { sym };
}
function serializeJsonNumber(ce, value, metadata) {
  metadata = { ...metadata };
  if (!ce.jsonSerializationOptions.metadata.includes("latex"))
    metadata.latex = void 0;
  const shorthandAllowed = metadata.latex === void 0 && metadata.wikidata === void 0 && !ce.jsonSerializationOptions.metadata.includes("latex") && ce.jsonSerializationOptions.shorthands.includes("number");
  const exclusions = ce.jsonSerializationOptions.exclude;
  let num = "";
  if (value instanceof Decimal) {
    if (value.isNaN())
      num = "NaN";
    else if (!value.isFinite())
      num = value.isPositive() ? "+Infinity" : "-Infinity";
    else {
      if (shorthandAllowed && isInMachineRange(value))
        return value.toNumber();
      if (value.isInteger() && value.e < value.precision() + 4)
        num = value.toFixed(0);
      else {
        const precision = ce.jsonSerializationOptions.precision;
        const s = precision === "max" ? value.toString() : value.toPrecision(
          precision === "auto" ? ce.precision : precision
        );
        num = repeatingDecimals(ce, s);
        if (shorthandAllowed) {
          const val = value.toNumber();
          if (val.toString() === num)
            return val;
        }
      }
    }
    if (ce.jsonSerializationOptions.metadata.includes("latex"))
      metadata.latex = metadata.latex ?? ce.serialize({ num });
    return metadata.latex !== void 0 ? { num, latex: metadata.latex } : shorthandAllowed ? num : { num };
  }
  if (value instanceof import_complex11.Complex) {
    if (value.isInfinite())
      return serializeJsonSymbol(ce, "ComplexInfinity", metadata);
    if (value.isNaN()) {
      num = "NaN";
      if (ce.jsonSerializationOptions.metadata.includes("latex"))
        metadata.latex = metadata.latex ?? ce.serialize({ num });
      return metadata.latex !== void 0 ? { num, latex: metadata.latex } : { num };
    }
    return serializeJsonFunction(
      ce,
      "Complex",
      [ce.number(value.re), ce.number(value.im)],
      {
        ...metadata,
        wikidata: "Q11567"
      }
    );
  }
  if (isRational(value)) {
    const allowRational = !exclusions.includes("Rational");
    if (shorthandAllowed && ce.jsonSerializationOptions.shorthands.includes("function") && isMachineRational(value)) {
      if (value[0] === 1 && value[1] === 2 && !exclusions.includes("Half"))
        return serializeJsonSymbol(ce, "Half", metadata);
      return [allowRational ? "Rational" : "Divide", value[0], value[1]];
    }
    return serializeJsonFunction(
      ce,
      allowRational ? "Rational" : "Divide",
      [ce.number(value[0]), ce.number(value[1])],
      { ...metadata }
    );
  }
  if (Number.isNaN(value))
    num = "NaN";
  else if (!Number.isFinite(value))
    num = value > 0 ? "+Infinity" : "-Infinity";
  else {
    if (shorthandAllowed)
      return value;
    num = repeatingDecimals(ce, value.toString());
  }
  if (ce.jsonSerializationOptions.metadata.includes("latex"))
    metadata.latex = metadata.latex ?? ce.serialize({ num });
  return metadata.latex !== void 0 ? { num, latex: metadata.latex } : { num };
}
function _escapeJsonString(s) {
  return s;
}
function repeatingDecimals(ce, s) {
  if (!ce.jsonSerializationOptions.repeatingDecimals)
    return s;
  let [_, wholepart, fractionalPart, exponent] = s.match(/^(.*)\.([0-9]+)([e|E][-+]?[0-9]+)?$/) ?? [];
  if (!fractionalPart)
    return s.toLowerCase();
  const lastDigit = fractionalPart[fractionalPart.length - 1];
  fractionalPart = fractionalPart.slice(0, -1);
  const MAX_REPEATING_PATTERN_LENGTH = 16;
  let prefix = "";
  for (let i = 0; i < fractionalPart.length - MAX_REPEATING_PATTERN_LENGTH; i++) {
    prefix = fractionalPart.substring(0, i);
    for (let j = 0; j <= MAX_REPEATING_PATTERN_LENGTH; j++) {
      const repetend = fractionalPart.substring(i, i + j + 1);
      const times = Math.floor(
        (fractionalPart.length - prefix.length) / repetend.length
      );
      if (times < 3)
        break;
      if ((prefix + repetend.repeat(times + 1)).startsWith(fractionalPart)) {
        if (repetend === "0") {
          if (lastDigit === "0")
            return wholepart + "." + prefix + (exponent ?? "");
          return s;
        }
        return wholepart + "." + prefix + "(" + repetend + ")" + (exponent ?? "");
      }
    }
  }
  fractionalPart += lastDigit;
  while (fractionalPart.endsWith("0"))
    fractionalPart = fractionalPart.slice(0, -1);
  if (exponent)
    return `${wholepart}.${fractionalPart}${exponent.toLowerCase()}`;
  return `${wholepart}.${fractionalPart}`;
}

// src/compute-engine/boxed-expression/boxed-dictionary.ts
var BoxedDictionary = class _BoxedDictionary extends _BoxedExpression {
  constructor(ce, dict, options) {
    options ?? (options = {});
    super(ce, options.metadata);
    this._value = /* @__PURE__ */ new Map();
    const canonical2 = options.canonical ?? true;
    if (dict instanceof Map) {
      for (const [key, value] of dict)
        this._value.set(key, ce.box(value, { canonical: canonical2 }));
    } else {
      for (const key of Object.keys(dict))
        this._value.set(key, ce.box(dict[key], { canonical: canonical2 }));
    }
    ce._register(this);
  }
  bind() {
    for (const [_k, v] of this._value)
      v.bind();
  }
  reset() {
    for (const [_k, v] of this._value)
      v.reset();
    return void 0;
  }
  get hash() {
    let h = hashCode("Dictionary");
    for (const [k, v] of this._value)
      h ^= hashCode(k) ^ v.hash;
    return h;
  }
  get complexity() {
    return 97;
  }
  get head() {
    return "Dictionary";
  }
  get isPure() {
    return false;
  }
  getKey(key) {
    return this._value.get(key);
  }
  hasKey(key) {
    return this._value.has(key);
  }
  get keys() {
    return this._value.keys();
  }
  get keysCount() {
    return this._value.size;
  }
  has(x) {
    for (const [_k, v] of this._value)
      if (v.has(x))
        return true;
    return false;
  }
  get domain() {
    return this.engine.domain("Dictionaries");
  }
  get json() {
    if (this.engine.jsonSerializationOptions.shorthands.includes("dictionary")) {
      const dict = {};
      for (const key of this._value.keys())
        dict[key] = this._value.get(key).json;
      return { dict };
    }
    const kvs = [];
    for (const key of this._value.keys())
      kvs.push(
        this.engine._fn("KeyValuePair", [
          this.engine.string(key),
          this._value.get(key)
        ])
      );
    return serializeJsonFunction(this.engine, "Dictionary", kvs, {
      latex: this._latex
    });
  }
  /** Structural equality */
  isSame(rhs) {
    if (this === rhs)
      return true;
    if (!(rhs instanceof _BoxedDictionary))
      return false;
    if (this._value.size !== rhs._value.size)
      return false;
    for (const [k, v] of this._value) {
      const rhsV = rhs.getKey(k);
      if (!rhsV || !v.isSame(rhsV))
        return false;
    }
    return true;
  }
  match(rhs, _options) {
    if (!(rhs instanceof _BoxedDictionary))
      return null;
    if (this._value.size !== rhs._value.size)
      return null;
    let result = {};
    for (const [k, v] of this._value) {
      const rhsV = rhs.getKey(k);
      if (!rhsV)
        return null;
      const m = v.match(rhsV);
      if (m === null)
        return null;
      result = { ...result, ...m };
    }
    return result;
  }
  /** Mathematical equality */
  isEqual(rhs) {
    if (this === rhs)
      return true;
    if (!(rhs instanceof _BoxedDictionary))
      return false;
    if (!rhs.keys || this._value.size !== rhs._value.size)
      return false;
    for (const [k, v] of this._value) {
      const rhsV = rhs.getKey(k);
      if (!rhsV || !v.isEqual(rhsV))
        return false;
    }
    return true;
  }
  evaluate(_options) {
    return this;
  }
  get isCanonical() {
    return this._isCanonical;
  }
  set isCanonical(val) {
    this._isCanonical = val;
  }
  get canonical() {
    if (this.isCanonical)
      return this;
    return new _BoxedDictionary(this.engine, this._value, { canonical: true });
  }
  simplify(_options) {
    return this;
  }
  N(_options) {
    return this;
  }
  replace(rules, options) {
    let changeCount = 0;
    const result = {};
    for (const key of this.keys) {
      const val = this.getKey(key);
      const newVal = val.replace(rules, options);
      if (newVal !== null)
        changeCount += 1;
      result[key] = newVal ?? val;
    }
    return changeCount === 0 ? null : new _BoxedDictionary(this.engine, result);
  }
  subs(sub2, options) {
    const result = {};
    for (const key of this.keys)
      result[key] = this.getKey(key).subs(sub2, options);
    return new _BoxedDictionary(this.engine, result, options);
  }
};

// src/compute-engine/boxed-expression/boxed-function.ts
var import_complex12 = __toESM(require_complex(), 1);

// src/compute-engine/simplify-rules.ts
var SIMPLIFY_RULES = [];

// src/compute-engine/function-utils.ts
function canonicalFunctionExpression(expr) {
  if (expr.head === "N" && typeof expr.op1.head === "string") {
    const newHead = { Integrate: "NIntegrate", Limit: "NLimit" }[expr.op1.head];
    if (newHead)
      expr = expr.engine._fn(newHead, expr.op1.ops);
  }
  if (expr.head === "Function")
    return expr;
  let unknowns = expr.unknowns;
  if (unknowns.includes("_")) {
    expr = expr.subs({ _: "_1" });
    unknowns = expr.unknowns;
  }
  let count = 0;
  for (const unknown of unknowns) {
    if (unknown.startsWith("_")) {
      const n = Number(unknown.slice(1));
      if (n > count)
        count = n;
    }
  }
  const ce = expr.engine;
  const result = ce._fn("Function", [
    expr,
    ...Array.from({ length: count }, (_, i) => ce.symbol(`_${i + 1}`))
  ]);
  return result;
}
function makeLambda(expr) {
  const ce = expr.engine;
  const fnDef = expr.symbol ? ce.lookupFunction(expr.symbol) : void 0;
  if (fnDef) {
    const fn2 = fnDef.signature.N ?? fnDef.signature.evaluate;
    if (fn2)
      return (params2) => fn2(ce, params2) ?? ce._fn(expr, params2);
    return (params2) => ce._fn(expr, params2);
  }
  const fnExpr = canonicalFunctionExpression(expr);
  if (!fnExpr)
    return void 0;
  console.assert(fnExpr.head === "Function");
  const params = fnExpr.ops.slice(1).map((x) => x.symbol ?? "Nothing");
  ce.pushScope();
  for (const param of params)
    ce.declare(param, { inferred: true, domain: void 0 });
  const fn = fnExpr.op1.canonical;
  fn.bind();
  ce.popScope();
  const fnScope = fn.scope;
  if (params.length === 0)
    return () => {
      const context = ce.swapScope(fnScope);
      ce.resetContext();
      const result = fn.N() ?? fn.evaluate();
      ce.swapScope(context);
      return result;
    };
  return (args) => {
    if (ce.strict) {
      args = checkArity(ce, args, params.length);
      if (!args.every((x) => x.isValid))
        return void 0;
    }
    args = args.map((x) => x.evaluate());
    const context = ce.swapScope(fnScope);
    ce.resetContext();
    let i = 0;
    for (const param of params)
      ce.assign(param, args[i++]);
    const result = fn.N() ?? fn.evaluate();
    ce.swapScope(context);
    if (!result.isValid)
      return void 0;
    return result;
  };
}
function apply3(fn, args) {
  return makeLambda(fn)?.(args) ?? fn.engine._fn(fn, args);
}
function applicable(fn) {
  return makeLambda(fn) ?? ((args) => fn.engine._fn(fn.N(), args).N());
}
function applicableN1(fn) {
  const ce = fn.engine;
  const lambda = makeLambda(fn);
  if (lambda)
    return (x) => lambda([ce.number(x)])?.value ?? NaN;
  return (x) => ce._fn(fn.evaluate(), [ce.number(x)]).value;
}
function parseFunctionSignature(s) {
  const m = s.match(/(.+)\((.*)\)/);
  if (!m)
    return [s, void 0];
  const id = m[1];
  const args = m[2].split(",").map((x) => x.trim());
  return [id, args];
}

// src/compute-engine/boxed-expression/boxed-function.ts
var BoxedFunction = class _BoxedFunction extends _BoxedExpression {
  constructor(ce, head2, ops2, options) {
    options ?? (options = {});
    options.canonical ?? (options.canonical = false);
    super(ce, options.metadata);
    // The domain of the value of the function applied to its arguments
    this._result = void 0;
    this._head = head2;
    this._ops = ops2;
    if (options.canonical) {
      this._canonical = this;
      this.bind();
    }
    ce._register(this);
  }
  //
  // NON-CANONICAL OR CANONICAL OPERATIONS
  //
  // Those operations/properties can be applied to a canonical or
  // non-canonical expression
  //
  get hash() {
    if (this._hash !== void 0)
      return this._hash;
    let h = 0;
    for (const op3 of this._ops)
      h = h << 1 ^ op3.hash | 0;
    if (typeof this._head === "string")
      h = h ^ hashCode(this._head) | 0;
    else
      h = h ^ this._head.hash | 0;
    this._hash = h;
    return h;
  }
  // For function expressions, infer infers the result domain of the function
  infer(domain) {
    const def = this._def;
    if (!def)
      return false;
    if (!def.signature.inferredSignature)
      return false;
    if (typeof def.signature.result !== "function")
      def.signature.result = narrow(def.signature.result, domain);
    return true;
  }
  bind() {
    this._def = void 0;
    this._scope = this.engine.context;
    const head2 = this._head;
    if (typeof head2 !== "string") {
      head2.bind();
      return;
    }
    this._def = this.engine.lookupFunction(head2);
    for (const op3 of this._ops)
      op3.bind();
  }
  reset() {
  }
  get isCanonical() {
    return this._canonical === this;
  }
  set isCanonical(val) {
    this._canonical = val ? this : void 0;
  }
  get isPure() {
    if (this._isPure !== void 0)
      return this._isPure;
    if (!this.isCanonical) {
      this._isPure = false;
      return false;
    }
    let pure = this.functionDefinition?.pure ?? false;
    if (pure)
      pure = this._ops.every((x) => x.isPure);
    this._isPure = pure;
    return pure;
  }
  get json() {
    if (this.isValid && this._canonical === this)
      return serializeJsonCanonicalFunction(
        this.engine,
        this._head,
        this._ops,
        { latex: this._latex, wikidata: this.wikidata }
      );
    return serializeJsonFunction(this.engine, this._head, this._ops, {
      latex: this._latex,
      wikidata: this.wikidata
    });
  }
  // The JSON representation of the expression, without any effects
  // of canonicalization.
  get rawJson() {
    const head2 = typeof this._head === "string" ? this._head : this._head.rawJson;
    return [head2, ...this.ops.map((x) => x.rawJson)];
  }
  get scope() {
    return this._scope;
  }
  get head() {
    return this._head;
  }
  get ops() {
    return this._ops;
  }
  get nops() {
    return this._ops.length;
  }
  get op1() {
    return this._ops[0] ?? this.engine.Nothing;
  }
  get op2() {
    return this._ops[1] ?? this.engine.Nothing;
  }
  get op3() {
    return this._ops[2] ?? this.engine.Nothing;
  }
  get isValid() {
    if (this._head === "Error")
      return false;
    if (typeof this._head !== "string" && !this._head.isValid)
      return false;
    return this._ops.every((x) => x?.isValid);
  }
  get canonical() {
    this._canonical ?? (this._canonical = this.isValid ? makeCanonicalFunction(this.engine, this._head, this._ops) : this);
    return this._canonical;
  }
  *map(fn) {
    let i = 0;
    while (i < this._ops.length)
      yield fn(this._ops[i++]);
  }
  // Note: the resulting expression is bound to the current scope, not
  // the scope of the original expression.
  subs(sub2, options) {
    options = options ? { ...options } : {};
    if (!("canonical" in options))
      options.canonical = true;
    const ops2 = this._ops.map((x) => x.subs(sub2, options));
    if (options.canonical && ops2.every((x) => x.isValid))
      return makeCanonicalFunction(this.engine, this._head, ops2);
    return new _BoxedFunction(this.engine, this._head, ops2, {
      canonical: false
    });
  }
  replace(rules, options) {
    return replace(this, rules, options);
  }
  has(x) {
    if (typeof this._head === "string") {
      if (typeof x === "string") {
        if (this._head === x)
          return true;
      } else if (x.includes(this._head))
        return true;
    }
    for (const arg of this._ops)
      if (arg.has(x))
        return true;
    return false;
  }
  /** `isSame` is structural/symbolic equality */
  isSame(rhs) {
    if (this === rhs)
      return true;
    if (!(rhs instanceof _BoxedFunction))
      return false;
    if (this.nops !== rhs.nops)
      return false;
    if (typeof this.head === "string") {
      if (this.head !== rhs.head)
        return false;
    } else {
      if (typeof rhs.head === "string")
        return false;
      if (!rhs.head || !this.engine.box(this.head).isSame(this.engine.box(rhs.head)))
        return false;
    }
    const lhsTail = this._ops;
    const rhsTail = rhs._ops;
    for (let i = 0; i < lhsTail.length; i++)
      if (!lhsTail[i].isSame(rhsTail[i]))
        return false;
    return true;
  }
  match(rhs, options) {
    if (!(rhs instanceof _BoxedFunction))
      return null;
    let result = {};
    if (typeof this.head === "string") {
      if (this.head !== rhs.head)
        return null;
    } else {
      if (typeof rhs.head === "string")
        return null;
      else {
        if (!rhs.head)
          return null;
        const m = this.head.match(rhs.head, options);
        if (m === null)
          return null;
        result = { ...result, ...m };
      }
    }
    const lhsTail = this._ops;
    const rhsTail = rhs._ops;
    for (let i = 0; i < lhsTail.length; i++) {
      const m = lhsTail[i].match(rhsTail[i], options);
      if (m === null)
        return null;
      result = { ...result, ...m };
    }
    return result;
  }
  //
  // CANONICAL OPERATIONS
  //
  // These operations apply only to canonical expressions
  //
  get complexity() {
    if (!this.isCanonical)
      return void 0;
    return this.functionDefinition?.complexity ?? DEFAULT_COMPLEXITY;
  }
  get baseDefinition() {
    return this.functionDefinition;
  }
  get functionDefinition() {
    return this._def;
  }
  /** `isEqual` is mathematical equality */
  isEqual(rhs) {
    if (this === rhs)
      return true;
    const s = signDiff(this, rhs);
    if (s === 0)
      return true;
    if (s !== void 0)
      return false;
    const diff = this.engine.add([this, this.engine.neg(rhs)]).simplify();
    if (diff.isZero)
      return true;
    return this.isSame(rhs);
  }
  get isNumber() {
    return this.domain?.isCompatible("Numbers");
  }
  get isInteger() {
    return this.domain?.isCompatible("Integers");
  }
  get isRational() {
    return this.domain?.isCompatible("RationalNumbers");
  }
  get isAlgebraic() {
    return this.domain?.isCompatible("AlgebraicNumbers");
  }
  get isReal() {
    return this.domain?.isCompatible("RealNumbers");
  }
  get isExtendedReal() {
    return this.domain?.isCompatible("ExtendedRealNumbers");
  }
  get isComplex() {
    return this.domain?.isCompatible("ComplexNumbers");
  }
  get isImaginary() {
    return this.domain?.isCompatible("ImaginaryNumbers");
  }
  get domain() {
    if (this._result !== void 0)
      return this._result;
    if (!this.canonical)
      return void 0;
    const ce = this.engine;
    let result = void 0;
    if (typeof this._head !== "string") {
      result = this._head.domain;
    } else if (this._def) {
      const sig = this._def.signature;
      if (typeof sig.result === "function")
        result = sig.result(ce, this._ops);
      else
        result = sig.result;
    }
    result ?? (result = void 0);
    this._result = result;
    return result;
  }
  // simplify(options?: SimplifyOptions): BoxedExpression {
  //   const result = this.simplifyAll(options);
  //   if (result.length === 1) return result[0];
  //   const ce = this.engine;
  //   result.sort((a, b) => {
  //     if (a === b) return 0;
  //     return ce.costFunction(a) - ce.costFunction(b);
  //   });
  //   return result[0];
  // }
  simplify(options) {
    if (!this.isValid)
      return this;
    if (!this.isCanonical) {
      const canonical2 = this.canonical;
      if (!canonical2.isCanonical || !canonical2.isValid)
        return this;
      return canonical2.simplify(options);
    }
    const recursive = options?.recursive ?? true;
    let expr;
    if (recursive) {
      expr = expand2(this);
      if (expr !== null) {
        expr = expr.simplify({ ...options, recursive: false });
        return cheapest(this, expr);
      }
    }
    const def = this.functionDefinition;
    const tail = recursive ? holdMap(
      this._ops,
      def?.hold ?? "none",
      def?.associative ? def.name : "",
      (x) => x.simplify(options)
    ) : this._ops;
    if (typeof this._head !== "string") {
      const expr2 = apply3(this._head, tail);
      if (typeof expr2.head !== "string")
        return expr2;
      return expr2.simplify(options);
    }
    if (def) {
      if (def.inert)
        expr = tail[0]?.canonical ?? this;
      else {
        const sig = def.signature;
        if (sig?.simplify)
          expr = sig.simplify(this.engine, tail);
      }
    }
    if (!expr)
      expr = this.engine.fn(this._head, tail);
    else
      expr = cheapest(this.engine.fn(this._head, tail), expr);
    expr = cheapest(this, expr);
    const rules = options?.rules ?? this.engine.cache(
      "standard-simplification-rules",
      () => boxRules(this.engine, SIMPLIFY_RULES),
      (rules2) => {
        for (const [lhs, rhs, _priority, _condition] of rules2) {
          lhs.reset();
          rhs.reset();
        }
        return rules2;
      }
    );
    let iterationCount = 0;
    let done = false;
    do {
      const newExpr = expr.replace(rules);
      if (newExpr !== null) {
        expr = cheapest(expr, newExpr);
        if (expr === newExpr)
          done = true;
      } else
        done = true;
      iterationCount += 1;
    } while (!done && iterationCount < this.engine.iterationLimit);
    return cheapest(this, expr);
  }
  evaluate(options) {
    if (!this.isValid)
      return this;
    if (options?.numericMode) {
      const h = this.head;
      if (h === "Integrate" || h === "Limit")
        return this.engine.box(["N", this], { canonical: true }).evaluate(options);
    }
    if (!this.isCanonical) {
      this.engine.pushScope();
      const canonical2 = this.canonical;
      this.engine.popScope();
      if (!canonical2.isCanonical || !canonical2.isValid)
        return this;
      return canonical2.evaluate(options);
    }
    const def = this.functionDefinition;
    if (def?.threadable && this.ops.some((x) => isFiniteIndexableCollection(x))) {
      const length = Math.max(
        ...this._ops.map((x) => x.functionDefinition?.size?.(x) ?? 0)
      );
      const results = [];
      for (let i = 0; i <= length - 1; i++) {
        const args = this._ops.map(
          (x) => isFiniteIndexableCollection(x) ? at(x, i % length + 1) ?? this.engine.Nothing : x
        );
        results.push(this.engine._fn(this.head, args).evaluate(options));
      }
      if (results.length === 0)
        return this.engine.box(["Sequence"]);
      if (results.length === 1)
        return results[0];
      return this.engine._fn("List", results);
    }
    const tail = holdMap(
      this._ops,
      def?.hold ?? "none",
      def?.associative ? def.name : "",
      (x) => x.evaluate(options)
    );
    if (def?.inert)
      return tail[0] ?? this;
    let result = void 0;
    if (typeof this._head !== "string")
      result = apply3(this._head, tail);
    const sig = def?.signature;
    if (!result && sig) {
      const numericMode = options?.numericMode ?? false;
      const context = this.engine.swapScope(this.scope);
      if (numericMode && sig.N)
        result = sig.N(this.engine, tail);
      if (!result && sig.evaluate)
        result = sig.evaluate(this.engine, tail);
      this.engine.swapScope(context);
    }
    if (result) {
      const num = result.numericValue;
      if (num !== null) {
        if (!complexAllowed(this.engine) && num instanceof import_complex12.Complex)
          result = this.engine.NaN;
        else if (!bignumPreferred(this.engine) && num instanceof Decimal)
          result = this.engine.number(num.toNumber());
      }
    }
    return result ?? this.engine.fn(this._head, tail);
  }
  N(options) {
    return this.evaluate({ ...options, numericMode: true });
  }
  solve(vars) {
    if (vars.length !== 1)
      return null;
    const roots = findUnivariateRoots(this.simplify(), vars[0]);
    return roots;
  }
};
function makeNumericFunction(ce, head2, semiOps, metadata) {
  let ops2 = [];
  if (head2 === "Add" || head2 === "Multiply")
    ops2 = checkNumericArgs(ce, ce.canonical(semiOps), { flatten: head2 });
  else if (head2 === "Negate" || head2 === "Square" || head2 === "Sqrt" || head2 === "Exp" || head2 === "Ln")
    ops2 = checkNumericArgs(ce, ce.canonical(semiOps), 1);
  else if (head2 === "Divide" || head2 === "Power")
    ops2 = checkNumericArgs(ce, ce.canonical(semiOps), 2);
  else
    return null;
  if (!ops2.every((x) => x.isValid))
    return ce._fn(head2, ops2, metadata);
  if (head2 === "Add")
    return ce.add(ops2, metadata);
  if (head2 === "Negate")
    return ce.neg(ops2[0], metadata);
  if (head2 === "Multiply")
    return ce.mul(ops2, metadata);
  if (head2 === "Divide")
    return ce.div(ops2[0], ops2[1], metadata);
  if (head2 === "Exp")
    return ce.pow(ce.E, ops2[0], metadata);
  if (head2 === "Power")
    return ce.pow(ops2[0], ops2[1], metadata);
  if (head2 === "Square")
    return ce.pow(ops2[0], 2, metadata);
  if (head2 === "Sqrt") {
    const op3 = ops2[0].canonical;
    if (isRational(op3.numericValue))
      return ce._fn("Sqrt", [op3], metadata);
    return ce.pow(op3, ce.Half, metadata);
  }
  if (head2 === "Ln")
    return ce._fn("Ln", ops2, metadata);
  return null;
}
function makeCanonicalFunction(ce, head2, ops2, metadata) {
  if (typeof head2 !== "string") {
    ce.pushScope();
    head2 = head2.evaluate().symbol ?? head2;
    ce.popScope();
  }
  if (typeof head2 === "string") {
    const result = makeNumericFunction(ce, head2, ops2, metadata);
    if (result)
      return result;
  } else {
    if (!head2.isValid)
      return new BoxedFunction(
        ce,
        head2,
        ops2.map((x) => ce.box(x, { canonical: false })),
        { metadata, canonical: false }
      );
  }
  const def = ce.lookupFunction(head2);
  if (!def) {
    return new BoxedFunction(
      ce,
      head2,
      flattenSequence(ops2.map((x) => ce.box(x))),
      { metadata, canonical: true }
    );
  }
  let xs = [];
  for (let i = 0; i < ops2.length; i++) {
    if (!shouldHold(def.hold, ops2.length - 1, i)) {
      xs.push(ce.box(ops2[i]));
    } else {
      const y = ce.box(ops2[i], { canonical: false });
      if (y.head === "ReleaseHold")
        xs.push(y.op1.canonical);
      else
        xs.push(y);
    }
  }
  const sig = def.signature;
  if (sig.canonical) {
    try {
      const result = sig.canonical(ce, xs);
      if (result)
        return result;
    } catch (e) {
      console.error(e);
    }
    return new BoxedFunction(ce, head2, xs, { metadata, canonical: false });
  }
  xs = flattenSequence(xs);
  if (def.associative)
    xs = flattenOps(xs, head2);
  const adjustedArgs = adjustArguments(
    ce,
    xs,
    def.hold,
    def.threadable,
    sig.params,
    sig.optParams,
    sig.restParam
  );
  if (adjustedArgs)
    return ce._fn(head2, adjustedArgs, metadata);
  if (xs.length === 1 && xs[0].head === head2) {
    if (def.involution)
      return xs[0].op1;
    if (def.idempotent)
      xs = xs[0].ops;
  }
  if (xs.length > 1 && def.commutative === true)
    xs = xs.sort(order);
  return ce._fn(head2, xs, metadata);
}
function holdMap(xs, skip, associativeHead, f) {
  if (xs.length === 0)
    return [];
  xs = flattenOps(xs, associativeHead);
  if (skip === "all")
    return xs;
  if (skip === "none") {
    const result2 = [];
    for (const x of xs) {
      const h = x.head;
      if (h === "Hold")
        result2.push(x);
      else {
        const op3 = h === "ReleaseHold" ? x.op1 : x;
        if (op3) {
          const y = f(op3);
          if (y !== null)
            result2.push(y);
        }
      }
    }
    return flattenOps(result2, associativeHead);
  }
  const result = [];
  for (let i = 0; i < xs.length; i++) {
    if (xs[i].head === "Hold") {
      result.push(xs[i]);
    } else {
      let y = void 0;
      if (xs[i].head === "ReleaseHold")
        y = xs[i].op1;
      else if (!shouldHold(skip, xs.length - 1, i))
        y = xs[i];
      else
        result.push(xs[i]);
      if (y) {
        const x = f(y);
        if (x !== null)
          result.push(x);
      }
    }
  }
  return flattenOps(result, associativeHead);
}
function cheapest(oldExpr, newExpr) {
  if (newExpr === null || newExpr === void 0)
    return oldExpr;
  if (oldExpr === newExpr)
    return oldExpr;
  const ce = oldExpr.engine;
  const boxedNewExpr = ce.box(newExpr);
  if (ce.costFunction(boxedNewExpr) <= 1.2 * ce.costFunction(oldExpr)) {
    return boxedNewExpr;
  }
  return oldExpr;
}

// src/compute-engine/boxed-expression/boxed-number.ts
var import_complex13 = __toESM(require_complex(), 1);

// src/compute-engine/numerics/primes.ts
var LARGE_PRIME = 1125899906842597;
function isPrime(n) {
  if (!Number.isInteger(n) || !Number.isFinite(n) || Number.isNaN(n) || n <= 1) {
    return false;
  }
  if (n <= LARGEST_SMALL_PRIME)
    return SMALL_PRIMES.has(n);
  for (const smallPrime of SMALL_PRIMES) {
    if (n % smallPrime === 0)
      return false;
  }
  if (n >= LARGE_PRIME) {
    return probablyPrime(n, 30) ? void 0 : false;
  }
  return n === leastFactor(n);
}
function leastFactor(n) {
  if (n === 1)
    return 1;
  if (n % 2 === 0)
    return 2;
  if (n % 3 === 0)
    return 3;
  if (n % 5 === 0)
    return 5;
  const m = Math.floor(Math.sqrt(n));
  let i = 7;
  while (i <= m) {
    if (n % i === 0)
      return i;
    if (n % (i + 4) === 0)
      return i + 4;
    if (n % (i + 6) === 0)
      return i + 6;
    if (n % (i + 10) === 0)
      return i + 10;
    if (n % (i + 12) === 0)
      return i + 12;
    if (n % (i + 16) === 0)
      return i + 16;
    if (n % (i + 22) === 0)
      return i + 22;
    if (n % (i + 24) === 0)
      return i + 24;
    i += 30;
  }
  return n;
}
function probablyPrime(n, k) {
  let s = 0, d = n - 1;
  while (d % 2 === 0) {
    d /= 2;
    ++s;
  }
  WitnessLoop:
    do {
      let x = Math.pow(2 + Math.floor(Math.random() * (n - 3)), d) % n;
      if (x === 1 || x === n - 1)
        continue;
      for (let i = s - 1; i--; ) {
        x = x * x % n;
        if (x === 1)
          return false;
        if (x === n - 1)
          continue WitnessLoop;
      }
      return false;
    } while (--k);
  return true;
}

// src/compute-engine/boxed-expression/boxed-number.ts
var BoxedNumber = class _BoxedNumber extends _BoxedExpression {
  /**
   * By the time the constructor is called, the `value` should have been
   * screened for cases where it's a well-known value (0, NaN, +Infinity,
   * etc...) or non-normal (complex number with im = 0, rational with
   * denom = 1, etc...).
   *
   * This is done in `ce.number()`. In general, use `ce.number()` rather
   * than calling this constructor directly.
   *
   * We may store as a machine number if a Decimal is passed that is in machine
   * range
   */
  constructor(ce, value, options) {
    super(ce, options?.metadata);
    if (typeof value === "number") {
      this._value = value;
      this._isCanonical = true;
      return;
    }
    if (isRational(value)) {
      const [n, d] = value;
      console.assert(
        typeof n !== "number" || Number.isInteger(n) && Number.isInteger(d) && d !== n && d !== 1
      );
      console.assert(
        !(typeof n === "bigint" && typeof d == "bigint") || d !== n && d !== BigInt(1)
      );
      if (options?.canonical ?? true) {
        this._value = canonicalNumber(ce, value);
        this._isCanonical = true;
      } else {
        this._value = value;
        this._isCanonical = false;
      }
    } else {
      console.assert(
        !(value instanceof import_complex13.Complex) || !Number.isNaN(value.re) && !Number.isNaN(value.im) && ce.chop(value.im) !== 0
      );
      this._value = canonicalNumber(ce, value);
      this._isCanonical = true;
    }
  }
  get hash() {
    if (this._hash !== void 0)
      return this._hash;
    let h = 0;
    if (typeof this._value === "number")
      h = hashCode(this._value.toString());
    else if (this._value instanceof import_complex13.Complex)
      h = hashCode(
        this._value.re.toString() + " +i " + this._value.im.toString()
      );
    else if (this._value instanceof Decimal)
      h = hashCode(this._value.toString());
    else
      h = hashCode(
        this._value[0].toString() + " / " + this._value[1].toString()
      );
    this._hash = h;
    return h;
  }
  get head() {
    return "Number";
  }
  get isPure() {
    return true;
  }
  get isExact() {
    if (typeof this._value === "number")
      return Number.isInteger(this._value);
    if (this._value instanceof Decimal)
      return this._value.isInteger();
    if (this._value instanceof import_complex13.Complex)
      return Number.isInteger(this._value.re) && Number.isInteger(this._value.im);
    return isRational(this._value);
  }
  get isCanonical() {
    return this._isCanonical;
  }
  set isCanonical(val) {
    this._isCanonical = val;
  }
  get complexity() {
    return 1;
  }
  get numericValue() {
    return this._value;
  }
  get domain() {
    this._domain ?? (this._domain = this.engine.domain(inferNumericDomain(this._value)));
    return this._domain;
  }
  get json() {
    return serializeJsonNumber(this.engine, this._value, {
      latex: this._latex
    });
  }
  get sgn() {
    if (this._value === 0)
      return 0;
    if (typeof this._value === "number") {
      if (this._value < 0)
        return -1;
      if (this._value > 0)
        return 1;
      return null;
    }
    if (this._value instanceof Decimal) {
      if (this._value.isZero())
        return 0;
      if (this._value.isNegative())
        return -1;
      if (this._value.isPositive())
        return 1;
      return null;
    }
    if (Array.isArray(this._value)) {
      const [numer, denom] = this._value;
      if (numer === 0 && denom !== 0)
        return 0;
      if (numer < 0)
        return -1;
      if (numer > 0)
        return 1;
      return null;
    }
    return null;
  }
  isSame(rhs) {
    if (this === rhs)
      return true;
    if (!(rhs instanceof _BoxedNumber))
      return false;
    if (typeof this._value === "number") {
      if (typeof rhs._value !== "number")
        return false;
      return this._value === rhs._value;
    }
    if (this._value instanceof Decimal) {
      if (!(rhs._value instanceof Decimal))
        return false;
      return this._value.eq(rhs._value);
    }
    if (Array.isArray(this._value)) {
      if (!Array.isArray(rhs._value))
        return false;
      const [rhsN, rhsD] = rhs._value;
      return this._value[0] === rhsN && this._value[1] === rhsD;
    }
    if (this._value instanceof import_complex13.Complex) {
      if (!(rhs._value instanceof import_complex13.Complex))
        return false;
      return this._value.equals(rhs._value);
    }
    return false;
  }
  isEqual(rhs) {
    return this === rhs || signDiff(this, rhs) === 0;
  }
  match(rhs, options) {
    if (this.isEqualWithTolerance(rhs, options?.numericTolerance ?? 0))
      return {};
    return null;
  }
  /** Compare this with another BoxedNumber.
   * `rhs` must be a BoxedNumber. Use `isEqualWithTolerance(rhs.N())`
   * if necessary.
   */
  isEqualWithTolerance(rhs, tolerance) {
    return rhs instanceof _BoxedNumber && signDiff(this, rhs, tolerance) === 0;
  }
  isLess(rhs) {
    const s = signDiff(this, rhs);
    if (s === void 0)
      return void 0;
    return s < 0;
  }
  isLessEqual(rhs) {
    const s = signDiff(this, rhs);
    if (s === void 0)
      return void 0;
    return s <= 0;
  }
  isGreater(rhs) {
    return rhs.isLessEqual(this);
  }
  isGreaterEqual(rhs) {
    return rhs.isLess(this);
  }
  /** x > 0, same as `isGreater(0)` */
  get isPositive() {
    if (typeof this._value === "number")
      return this._value > 0;
    const s = this.sgn;
    if (s === void 0 || s === null)
      return void 0;
    return s > 0;
  }
  /** x >= 0, same as `isGreaterEqual(0)` */
  get isNonNegative() {
    if (typeof this._value === "number")
      return this._value >= 0;
    const s = this.sgn;
    if (s === void 0 || s === null)
      return void 0;
    return s >= 0;
  }
  /** x < 0, same as `isLess(0)` */
  get isNegative() {
    if (typeof this._value === "number")
      return this._value < 0;
    const s = this.sgn;
    if (s === void 0 || s === null)
      return void 0;
    return s < 0;
  }
  /** x <= 0, same as `isLessEqual(0)` */
  get isNonPositive() {
    if (typeof this._value === "number")
      return this._value <= 0;
    const s = this.sgn;
    if (s === void 0 || s === null)
      return void 0;
    return s <= 0;
  }
  get isZero() {
    if (this._value === 0)
      return true;
    if (this._value instanceof Decimal)
      return this._value.isZero();
    if (this._value instanceof import_complex13.Complex)
      return this._value.isZero();
    return false;
  }
  get isNotZero() {
    if (this._value === 0)
      return false;
    if (this._value instanceof Decimal)
      return !this._value.isZero();
    if (this._value instanceof import_complex13.Complex)
      return !this._value.isZero();
    return true;
  }
  get isOne() {
    if (this._value === 1)
      return true;
    if (typeof this._value === "number")
      return false;
    if (this._value instanceof Decimal)
      return this._value.equals(this.engine._BIGNUM_ONE);
    if (this._value instanceof import_complex13.Complex)
      return this._value.im === 0 && this._value.re === 1;
    return isRationalOne(this._value);
  }
  get isNegativeOne() {
    if (this._value === -1)
      return true;
    if (typeof this._value === "number")
      return false;
    if (this._value instanceof Decimal)
      return this._value.equals(this.engine._BIGNUM_NEGATIVE_ONE);
    if (this._value instanceof import_complex13.Complex)
      return this._value.im === 0 && this._value.re === -1;
    return isRationalNegativeOne(this._value);
  }
  get isOdd() {
    if (this.isOne || this.isNegativeOne)
      return true;
    if (this.isZero)
      return false;
    if (!this.isInteger)
      return false;
    if (typeof this._value === "number")
      return this._value % 2 !== 0;
    if (this._value instanceof Decimal)
      return !this._value.mod(2).isZero();
    return void 0;
  }
  get isEven() {
    if (this.isOne || this.isNegativeOne)
      return false;
    if (this.isZero)
      return true;
    if (!this.isInteger)
      return false;
    if (typeof this._value === "number")
      return this._value % 2 === 0;
    if (this._value instanceof Decimal)
      return this._value.mod(2).isZero();
    return void 0;
  }
  get isPrime() {
    if (!this.isInteger || !this.isFinite || this.isNonPositive || this.isOne || this.isZero)
      return false;
    if (typeof this._value === "number")
      return isPrime(this._value);
    if (this._value instanceof Decimal)
      return isPrime(this._value.toNumber());
    return void 0;
  }
  get isComposite() {
    if (!this.isInteger || !this.isFinite || this.isNonPositive || this.isOne || this.isZero)
      return false;
    if (typeof this._value === "number")
      return !isPrime(this._value);
    if (this._value instanceof Decimal)
      return !isPrime(this._value.toNumber());
    return void 0;
  }
  get isInfinity() {
    if (typeof this._value === "number")
      return !Number.isFinite(this._value) && !Number.isNaN(this._value);
    if (this._value instanceof Decimal)
      return !this._value.isFinite() && !this._value.isNaN();
    if (this._value instanceof import_complex13.Complex)
      return !this._value.isFinite() && !this._value.isNaN();
    return false;
  }
  get isNaN() {
    if (typeof this._value === "number")
      return Number.isNaN(this._value);
    if (this._value instanceof Decimal)
      return this._value.isNaN();
    if (this._value instanceof import_complex13.Complex)
      return this._value.isNaN();
    return false;
  }
  get isFinite() {
    return !this.isInfinity && !this.isNaN;
  }
  get isNumber() {
    return true;
  }
  get isInteger() {
    if (typeof this._value === "number")
      return Number.isInteger(this._value);
    if (this._value instanceof Decimal)
      return this._value.isInteger();
    return false;
  }
  get isRational() {
    if (Array.isArray(this._value))
      return true;
    return this.isInteger;
  }
  get isAlgebraic() {
    if (this.isRational)
      return true;
    return void 0;
  }
  get isReal() {
    if (!this.isFinite)
      return false;
    if (this._value instanceof import_complex13.Complex)
      return this.engine.chop(this._value.im) === 0;
    return true;
  }
  // Real or +-Infinity
  get isExtendedReal() {
    return this.isInfinity || this.isReal;
  }
  get isComplex() {
    return !this.isNaN;
  }
  get isImaginary() {
    if (this._value instanceof import_complex13.Complex) {
      console.assert(this._value.im !== 0);
      return true;
    }
    return false;
  }
  get isExtendedComplex() {
    return this.isInfinity || !this.isNaN;
  }
  get canonical() {
    if (this._isCanonical)
      return this;
    return this.engine.number(canonicalNumber(this.engine, this._value));
  }
  simplify(_options) {
    return this.canonical;
  }
  evaluate(options) {
    if (options?.numericMode)
      return this.N(options);
    return this;
  }
  N(_options) {
    if (!Array.isArray(this._value))
      return this;
    const ce = this.engine;
    const [numer, denom] = this._value;
    if (typeof numer === "number" && typeof denom === "number" && !bignumPreferred(ce))
      return ce.number(numer / denom);
    return ce.number(ce.bignum(numer).div(ce.bignum(denom)));
  }
};
function canonicalNumber(ce, value) {
  if (value instanceof Decimal && isInMachineRange(value))
    return value.toNumber();
  if (!isRational(value))
    return value;
  value = reducedRational(value);
  if (isBigRational(value)) {
    let [n2, d2] = value;
    if (n2 > Number.MIN_SAFE_INTEGER && n2 < Number.MAX_SAFE_INTEGER && d2 > Number.MIN_SAFE_INTEGER && d2 < Number.MAX_SAFE_INTEGER)
      value = [Number(n2), Number(d2)];
    else {
      if (d2 < 0)
        [n2, d2] = [-n2, -d2];
      if (d2 === BigInt(1))
        return ce.bignum(n2);
      if (d2 === BigInt(0)) {
        if (n2 === d2)
          return NaN;
        return n2 < 0 ? -Infinity : Infinity;
      }
      return [n2, d2];
    }
  }
  let [n, d] = value;
  if (Number.isNaN(n) || Number.isNaN(d))
    return NaN;
  if (d < 0)
    [n, d] = [-n, -d];
  if (d === 1)
    return n;
  if (d === 0) {
    if (n === 0 || !Number.isFinite(n))
      return NaN;
    if (n < 0)
      return -Infinity;
    return Infinity;
  }
  if (n === 0)
    return n;
  return [n, d];
}

// src/compute-engine/boxed-expression/boxed-string.ts
var BoxedString = class _BoxedString extends _BoxedExpression {
  constructor(ce, expr, metadata) {
    super(ce, metadata);
    this._string = expr.normalize();
    ce._register(this);
  }
  get hash() {
    return hashCode("String" + this._string);
  }
  get json() {
    return serializeJsonString(this.engine, this._string);
  }
  get head() {
    return "String";
  }
  get isPure() {
    return true;
  }
  get isCanonical() {
    return true;
  }
  set isCanonical(_va) {
    return;
  }
  get domain() {
    return this.engine.Strings;
  }
  get complexity() {
    return 19;
  }
  get string() {
    return this._string;
  }
  isEqual(rhs) {
    return rhs.string === this._string;
  }
  isSame(rhs) {
    return rhs.string === this._string;
  }
  match(rhs, _options) {
    if (!(rhs instanceof _BoxedString))
      return null;
    if (this._string === rhs._string)
      return {};
    return null;
  }
};

// src/compute-engine/symbolic/tensor-fields.ts
var import_complex14 = __toESM(require_complex(), 1);
function makeTensorField(ce, dtype) {
  switch (dtype) {
    case "float64":
    case "float32":
    case "int32":
    case "uint8":
      return new TensorFieldNumber(ce);
    case "complex128":
    case "complex64":
      return new TensorFieldComplex(ce);
    case "bool":
    case "string":
    case "expression":
      return new TensorFieldExpression(ce);
  }
  throw new Error(`Unknown dtype ${dtype}`);
}
var TensorFieldNumber = class {
  constructor(ce) {
    this.ce = ce;
    this.one = 1;
    this.zero = 0;
    this.nan = NaN;
  }
  cast(x, dtype) {
    const ce = this.ce;
    switch (dtype) {
      case "float64":
      case "float32":
      case "int32":
      case "uint8":
        return x;
      case "complex128":
      case "complex64":
        return Array.isArray(x) ? x.map((x2) => ce.complex(x2)) : this.ce.complex(x);
      case "bool":
        return Array.isArray(x) ? x.map((x2) => x2 === 0 ? false : true) : x === 0 ? false : true;
      case "string":
        return Array.isArray(x) ? x.map((x2) => Number(x2).toString()) : Number(x).toString();
      case "expression":
        return Array.isArray(x) ? x.map((x2) => ce.number(x2)) : ce.number(x);
    }
    throw new Error(`Cannot cast ${x} to ${dtype}`);
  }
  expression(x) {
    return this.ce.number(x);
  }
  isZero(x) {
    return x === 0;
  }
  isOne(x) {
    return x === 1;
  }
  equals(lhs, rhs) {
    return lhs === rhs;
  }
  add(lhs, rhs) {
    return lhs + rhs;
  }
  addn(...xs) {
    return xs.reduce((a, b) => a + b, 0);
  }
  neg(x) {
    return -x;
  }
  sub(lhs, rhs) {
    return lhs - rhs;
  }
  mul(lhs, rhs) {
    return lhs * rhs;
  }
  muln(...xs) {
    return xs.reduce((a, b) => a * b, 1);
  }
  div(lhs, rhs) {
    return lhs / rhs;
  }
  pow(lhs, rhs) {
    return lhs ** rhs;
  }
  conjugate(x) {
    return x;
  }
};
var TensorFieldExpression = class {
  constructor(ce) {
    this.one = ce.number(1);
    this.zero = ce.number(0);
    this.nan = ce.number(NaN);
    this.ce = ce;
  }
  cast(x, dtype) {
    if (Array.isArray(x)) {
      return x.map((x2) => this.cast(x2, dtype));
    }
    const v = x.value;
    switch (dtype) {
      case "float64":
      case "float32":
        return typeof v === "number" ? v : void 0;
      case "int32":
        return typeof v === "number" ? Math.round(v) : void 0;
      case "uint8":
        if (typeof v !== "number")
          return void 0;
        const i = Math.round(v);
        return i >= 0 && i <= 255 ? i : void 0;
      case "complex128":
      case "complex64":
        if (typeof v === "number")
          return this.ce.complex(v);
        const n = x.numericValue;
        if (n instanceof import_complex14.default)
          return n;
        return void 0;
      case "bool":
        return typeof v === "boolean" ? v : void 0;
      case "string":
        return typeof v === "string" ? v : void 0;
      case "expression":
        return x;
    }
    throw new Error(`Cannot cast ${x} to ${dtype}`);
  }
  expression(x) {
    return x;
  }
  isZero(x) {
    return x.isZero ?? false;
  }
  isOne(x) {
    return x.isOne ?? false;
  }
  equals(lhs, rhs) {
    return lhs.isEqual(rhs);
  }
  add(lhs, rhs) {
    return this.ce.add([lhs, rhs]);
  }
  addn(...xs) {
    return this.ce.add(xs);
  }
  neg(x) {
    return this.ce.neg(x);
  }
  sub(lhs, rhs) {
    return this.ce.add([lhs, this.ce.neg(rhs)]);
  }
  mul(lhs, rhs) {
    return this.ce.mul([lhs, rhs]);
  }
  muln(...xs) {
    return this.ce.mul(xs);
  }
  div(lhs, rhs) {
    return this.ce.div(lhs, rhs);
  }
  pow(lhs, rhs) {
    return this.ce.pow(lhs, rhs);
  }
  conjugate(x) {
    return this.ce.box(["Conjugate", x]);
  }
};
var TensorFieldComplex = class {
  constructor(ce) {
    this.ce = ce;
    this.one = ce.complex(1);
    this.zero = ce.complex(0);
    this.nan = ce.complex(NaN);
  }
  cast(x, dtype) {
    if (Array.isArray(x)) {
      return x.map((x2) => this.cast(x2, dtype));
    }
    switch (dtype) {
      case "float64":
        return x.im === 0 ? x.re : void 0;
      case "float32":
        return x.im === 0 ? x.re : void 0;
      case "int32":
        return x.im === 0 ? Math.round(x.re) : void 0;
      case "uint8":
        if (x.im !== 0)
          return void 0;
        const i = Math.round(x.re);
        return i >= 0 && i <= 255 ? i : void 0;
      case "complex128":
        return x;
      case "complex64":
        return x;
      case "bool":
        return x.im === 0 && x.re === 0 ? false : true;
      case "string":
        return x.toString();
      case "expression":
        return this.ce.number(x);
    }
    throw new Error(`Cannot cast ${x} to ${dtype}`);
  }
  expression(z) {
    return this.ce.number(z);
  }
  isZero(z) {
    return z.isZero();
  }
  isOne(z) {
    return z.re === 1 && z.im === 0;
  }
  equals(lhs, rhs) {
    return lhs.equals(rhs);
  }
  add(lhs, rhs) {
    return lhs.add(rhs);
  }
  addn(...xs) {
    return xs.reduce((a, b) => a.add(b), this.zero);
  }
  neg(z) {
    return z.neg();
  }
  sub(lhs, rhs) {
    return lhs.sub(rhs);
  }
  mul(lhs, rhs) {
    return lhs.mul(rhs);
  }
  muln(...xs) {
    return xs.reduce((a, b) => a.mul(b), this.one);
  }
  div(lhs, rhs) {
    return lhs.div(rhs);
  }
  pow(lhs, rhs) {
    return lhs.pow(rhs);
  }
  conjugate(z) {
    return z.conjugate();
  }
};
function getSupertype(t1, t2) {
  if (t1 === t2)
    return t1;
  if (t1 === "string" || t2 === "string")
    return "expression";
  if (t1 === "expression" || t2 === "expression")
    return "expression";
  if (t1 === "complex128" || t2 === "complex128")
    return "complex128";
  if (t1 === "complex64" || t2 === "complex64")
    return "complex64";
  if (t1 === "float64" || t2 === "float64")
    return "float64";
  if (t1 === "float32" || t2 === "float32")
    return "float32";
  if (t1 === "int32" || t2 === "int32")
    return "int32";
  if (t1 === "uint8" || t2 === "uint8")
    return "uint8";
  if (t1 === "bool" || t2 === "bool")
    return "bool";
  return "expression";
}
function getExpressionDatatype(expr) {
  const val = expr.value;
  if (typeof val === "number") {
    if (Number.isInteger(val)) {
      if (val >= 0 && val <= 255)
        return "uint8";
      return "int32";
    }
    return "float64";
  }
  const nVal = expr.numericValue;
  if (nVal !== null && nVal instanceof import_complex14.default)
    return "complex128";
  if (expr.string)
    return "string";
  return "expression";
}

// src/compute-engine/symbolic/tensors.ts
var AbstractTensor = class _AbstractTensor {
  constructor(ce, tensorData) {
    this.ce = ce;
    this.shape = tensorData.shape;
    this.rank = this.shape.length;
    this._strides = getStrides(this.shape);
    this.field = makeTensorField(ce, tensorData.dtype);
  }
  static align(lhs, rhs) {
    if (lhs.dtype === rhs.dtype)
      return [lhs, rhs];
    const dtype = getSupertype(lhs.dtype, rhs.dtype);
    if (lhs.dtype === dtype)
      return [lhs, rhs.upcast(dtype)];
    return [lhs.upcast(dtype), rhs];
  }
  /**
   * Apply a function to the elements of two tensors, or to a tensor
   * and a scalar.
   *
   * The tensors are aligned and broadcasted if necessary.
   *
   * @param fn
   * @param lhs
   * @param rhs
   * @returns
   */
  static broadcast(fn, lhs, rhs) {
    if (!(rhs instanceof _AbstractTensor))
      return lhs.map1(fn, rhs);
    const [lhs_, rhs_] = _AbstractTensor.align(lhs, rhs);
    const data = lhs_.data.map((v, i) => fn(v, rhs_.data[i]));
    return makeTensor(lhs_.ce, { dtype: lhs_.dtype, shape: lhs_.shape, data });
  }
  // A Boxed Expression that represents the tensor
  get expression() {
    const shape = this.shape;
    const rank = this.rank;
    const data = this.data;
    const index = this._index.bind(this);
    const expression = this.field.expression.bind(this.field);
    const fill = (indices) => {
      if (indices.length === rank - 1) {
        const idx = index(indices);
        const result = this.ce._fn(
          "List",
          data.slice(idx, idx + shape[rank - 1]).map((x) => expression(x))
        );
        result.isCanonical = result.ops.every((x) => x.isCanonical);
        return result;
      } else {
        const list = [];
        for (let i = 0; i <= shape[indices.length] - 1; i++)
          list.push(fill([...indices, i + 1]));
        const result = this.ce._fn("List", list);
        result.isCanonical = result.ops.every((x) => x.isCanonical);
        return result;
      }
    };
    return fill([]);
  }
  /**
   * Like expression(), but return a nested JS array instead
   * of a BoxedExpression
   */
  get array() {
    const shape = this.shape;
    const rank = this.rank;
    const data = this.data;
    if (rank === 1)
      return data;
    if (rank === 2) {
      const [m, n] = shape;
      const array = new Array(m);
      for (let i = 0; i < m; i++)
        array[i] = data.slice(i * n, (i + 1) * n);
      return array;
    }
    const index = this._index.bind(this);
    const fill = (indices) => {
      if (indices.length === rank - 1) {
        const idx = index(indices);
        return data.slice(idx, idx + shape[rank - 1]);
      } else {
        const list = [];
        for (let i = 0; i < shape[indices.length]; i++)
          list.push(fill([...indices, i + 1]));
        return list;
      }
    };
    return fill([]);
  }
  /** Indices are 1-based, return a 0-based index in the data */
  _index(indices) {
    const strides = this._strides;
    return indices.reduce((acc, val, dim) => acc + (val - 1) * strides[dim], 0);
  }
  get isSquare() {
    const shape = this.shape;
    return shape.length === 2 && shape[0] === shape[1];
  }
  // A square matrix that is equal to its transpose. A^T = A
  get isSymmetric() {
    if (!this.isSquare)
      return false;
    const n = this.shape[0];
    const data = this.data;
    const eq = this.field.equals.bind(this.field);
    for (let i = 0; i < n; i++)
      for (let j = i + 1; j < n; j++)
        if (!eq(data[i * n + j], data[j * n + i]))
          return false;
    return true;
  }
  // Aka antisymmetric matrix, skew-symmetric matrix, or antimetric matrix
  // A square matrix whose transpose is also its negative. A^T = -A
  get isSkewSymmetric() {
    if (!this.isSquare)
      return false;
    const n = this.shape[0];
    const data = this.data;
    const eq = this.field.equals.bind(this.field);
    const neg2 = this.field.neg.bind(this.field);
    for (let i = 0; i < n; i++)
      for (let j = i + 1; j < n; j++)
        if (!eq(data[i * n + j], neg2(data[j * n + i])))
          return false;
    return true;
  }
  // All entries below the diagonal are zero.
  get isUpperTriangular() {
    if (!this.isSquare)
      return false;
    const n = this.shape[0];
    const data = this.data;
    const isZero = this.field.isZero.bind(this.field);
    for (let i = 1; i < n; i++)
      for (let j = 0; j < i; j++)
        if (isZero(data[i * n + j]))
          return false;
    return true;
  }
  // All entries above the diagonal are zero.
  get isLowerTriangular() {
    if (!this.isSquare)
      return false;
    const n = this.shape[0];
    const data = this.data;
    const isZero = this.field.isZero.bind(this.field);
    for (let i = 0; i < n - 1; i++)
      for (let j = i + 1; j < n; j++)
        if (!isZero(data[i * n + j]))
          return false;
    return true;
  }
  get isTriangular() {
    if (!this.isSquare)
      return false;
    const n = this.shape[0];
    const data = this.data;
    const isZero = this.field.isZero.bind(this.field);
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        if (i < j && !isZero(data[i * n + j]) || i > j && !isZero(data[i * n + j]))
          return false;
    return true;
  }
  get isDiagonal() {
    if (!this.isSquare)
      return false;
    const n = this.shape[0];
    const data = this.data;
    const isZero = this.field.isZero.bind(this.field);
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        if (i === j && !isZero(data[i * n + j]) || i !== j && !isZero(data[i * n + j]))
          return false;
    return true;
  }
  get isIdentity() {
    if (!this.isSquare)
      return false;
    const [m, n] = this.shape;
    const data = this.data;
    const isOne = this.field.isOne.bind(this.field);
    const isZero = this.field.isZero.bind(this.field);
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        if (i === j && !isOne(data[i * n + j]) || i !== j && !isZero(data[i * n + j]))
          return false;
    return true;
  }
  get isZero() {
    const isZero = this.field.isZero.bind(this.field);
    return this.data.every((e) => isZero(e));
  }
  /**
   *  The number of indices should match the rank of the tensor.
   *
   * Note: the indices are 1-based
   * Note: the data is broadcast (wraps around) if the indices are out of bounds
   *
   * LaTeX notation `A\lbracki, j\rbrack` or `A_{i, j}`
   */
  at(...indices) {
    const l = this.data.length;
    return this.data[this._index(indices) % l];
  }
  diagonal(axis1, axis2) {
    axis1 ?? (axis1 = 1);
    axis2 ?? (axis2 = 2);
    if (axis1 === axis2)
      return void 0;
    if (axis1 <= 0 || axis1 > this.shape.length)
      return void 0;
    if (this.shape[axis1 - 1] !== this.shape[axis2 - 1])
      return void 0;
    let diag = new Array(this.shape[axis1 - 1]);
    const data = this.data;
    const n = this.shape[axis1 - 1];
    for (let i = 0; i < n; i++)
      diag[i] = data[i * n + i];
    return diag;
  }
  // Trace is the sum of the diagonal entries of a square matrix.
  // `\operatorname{tr}(A) = \sum_{i=1}^n a_{ii}`
  trace(axis1, axis2) {
    if (this.rank !== 2)
      return void 0;
    const [m, n] = this.shape;
    if (m !== n)
      return void 0;
    const data = this.data;
    let trace = new Array(m);
    for (let i = 0; i < m; i++)
      trace[i] = data[i * m + i];
    return this.field.addn(...trace);
  }
  /**
   * Change the shape of the tensor
   *
   * The data is reused (and shared) between the two tensors.
   */
  reshape(...shape) {
    return makeTensor(this.ce, {
      dtype: this.dtype,
      shape,
      data: this.data
    });
  }
  flatten() {
    return this.data;
  }
  upcast(dtype) {
    const data = this.field.cast(this.data, dtype);
    if (data === void 0)
      throw Error(`Cannot cast tensor to ${dtype}`);
    return makeTensor(this.ce, {
      dtype,
      shape: this.shape,
      data
    });
  }
  transpose(axis1, axis2, fn) {
    if (this.rank !== 2)
      return void 0;
    axis1 ?? (axis1 = 1);
    axis2 ?? (axis2 = 2);
    if (axis1 === axis2)
      return this;
    if (axis1 <= 0 || axis1 > 2)
      return void 0;
    if (axis2 <= 0 || axis2 > 2)
      return void 0;
    const [m, n] = this.shape;
    let data = this.data;
    if (fn)
      data = data.map((x) => fn(x));
    let index = 0;
    const result = new Array(m * n);
    const stride = n;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++)
        result[index++] = data[j * stride + i];
    }
    return makeTensor(this.ce, {
      dtype: this.dtype,
      shape: [n, m],
      data: result
    });
  }
  // a^H or A^*, or A^\dagger : conjugate transpose, aka Hermitian transpose, aka adjoint
  // https://en.wikipedia.org/wiki/Conjugate_transpose
  // transpose, then apply the complex conjugate to each entry
  // (same as transpose if all entries are real)
  conjugateTranspose(axis1, axis2) {
    const conjugate = this.field.conjugate.bind(this.field);
    return this.transpose(axis1, axis2, conjugate);
  }
  determinant() {
    if (this.rank !== 2)
      return void 0;
    const [m, n] = this.shape;
    if (m !== n)
      return void 0;
    if (m === 1)
      return this.data[0];
    const add3 = this.field.add.bind(this.field);
    const mul3 = this.field.mul.bind(this.field);
    const neg2 = this.field.neg.bind(this.field);
    if (m === 2) {
      const [a, b, c, d] = this.data;
      return add3(mul3(a, d), neg2(mul3(b, c)));
    }
    const addn = this.field.addn.bind(this.field);
    const muln = this.field.muln.bind(this.field);
    if (m === 3) {
      const [a, b, c, d, e, f, g, h, i] = this.data;
      return addn([
        muln(a, e, i),
        muln(b, f, g),
        muln(c, d, h),
        neg2(muln(c, e, g)),
        neg2(muln(b, d, i)),
        neg2(muln(a, f, h))
      ]);
    }
    const rows = this.shape[0];
    let negated = false;
    const div2 = this.field.div.bind(this.field);
    const sub2 = this.field.sub.bind(this.field);
    const rowIndices = new Array(rows).fill(0).map((_, i) => i);
    const matrix = [...this.data];
    for (let k = 0; k < rows; k++) {
      let k_ = rowIndices[k - 1];
      if (this.at(k_, k) === 0) {
        let _k;
        for (_k = k + 1; _k < rows; _k++) {
          if (this.at(rowIndices[_k], k) !== 0) {
            k_ = rowIndices[_k];
            rowIndices[_k - 1] = rowIndices[k - 1];
            rowIndices[k - 1] = k_;
            negated = !negated;
            break;
          }
        }
        if (_k === rows)
          return this.at(k_, k);
      }
      const piv = this.at(k_, k);
      const piv_ = k === 0 ? 1 : this.at(rowIndices[k - 2], k - 2);
      for (let i = k + 1; i < rows; i++) {
        const i_ = rowIndices[i - 1];
        for (let j = k + 1; j < rows; j++) {
          matrix[i_][j] = div2(
            sub2(mul3(matrix[i_][j], piv), mul3(matrix[i_][k], matrix[k_][j])),
            piv_
          );
        }
      }
    }
    const det = matrix[rowIndices[rows - 1]][rows - 1];
    return negated ? this.field.neg(det) : det;
  }
  inverse() {
    if (this.rank !== 2)
      return void 0;
    const [m, n] = this.shape;
    if (m !== n)
      return void 0;
    if (m === 2) {
      const [a, b, c, d] = this.data;
      const det = this.determinant();
      if (det === void 0 || this.field.isZero(det))
        return void 0;
      const div3 = this.field.div.bind(this.field);
      const neg2 = this.field.neg.bind(this.field);
      const inverseData2 = [
        div3(d, det),
        neg2(div3(b, det)),
        neg2(div3(c, det)),
        div3(a, det)
      ];
      return makeTensor(this.ce, {
        dtype: this.dtype,
        shape: [n, n],
        data: inverseData2
      });
    }
    const rows = this.shape[0];
    const div2 = this.field.div.bind(this.field);
    const sub2 = this.field.sub.bind(this.field);
    const mul3 = this.field.mul.bind(this.field);
    const matrix = this.array;
    const identity = new Array(rows).fill(0).map((_, i) => {
      const row = new Array(rows).fill(0);
      row[i] = 1;
      return row;
    });
    const augmented = matrix.map((row, i) => [...row, ...identity[i]]);
    const rowIndices = new Array(rows).fill(0).map((_, i) => i);
    for (let k = 0; k < rows; k++) {
      let k_ = rowIndices[k - 1];
      if (this.at(k_, k) === 0) {
        let _k;
        for (_k = k + 1; _k < rows; _k++) {
          if (this.at(rowIndices[_k], k) !== 0) {
            k_ = rowIndices[_k];
            rowIndices[_k - 1] = rowIndices[k - 1];
            rowIndices[k - 1] = k_;
            break;
          }
        }
        if (_k === rows)
          return void 0;
      }
      const piv = this.at(k_, k);
      const piv_ = k === 0 ? 1 : this.at(rowIndices[k - 2], k - 2);
      for (let i = k + 1; i < rows; i++) {
        const i_ = rowIndices[i - 1];
        for (let j = k + 1; j < rows * 2; j++) {
          augmented[i_][j] = sub2(
            augmented[i_][j],
            mul3(div2(mul3(augmented[i_][k], augmented[k_][j]), piv), piv_)
          );
        }
      }
    }
    for (let k = rows - 1; k >= 0; k--) {
      const piv = augmented[rowIndices[k], k];
      for (let i = 0; i < k; i++) {
        const i_ = rowIndices[i];
        for (let j = rows; j < rows * 2; j++) {
          augmented[i_][j] = sub2(
            augmented[i_][j],
            mul3(div2(mul3(augmented[i_][k], augmented[k][j]), piv), piv)
          );
        }
      }
      for (let j = rows; j < rows * 2; j++) {
        augmented[k][j] = div2(augmented[k][j], piv);
      }
    }
    const inverseData = augmented.map(
      (row) => row.slice(rows)
    );
    return makeTensor(this.ce, {
      dtype: this.dtype,
      shape: [n, n],
      data: inverseData
    });
  }
  // A^+ is the Moore-Penrose pseudoinverse of A. https://en.wikipedia.org/wiki/Moore%E2%80%93Penrose_inverse
  // Pseudoinverse can also be defined for scalars: the pseudoinverse of a scalar is its reciprocal if it is non-zero, and zero otherwise.
  pseudoInverse() {
    return void 0;
  }
  // The adjugate, classical adjoint, or adjunct of a square matrix is the transpose of its cofactor matrix. https://en.wikipedia.org/wiki/Adjugate_matrix
  adjugateMatrix() {
    return void 0;
  }
  // The determinant of the matrix obtained by deleting row i and column j from this matrix. https://en.wikipedia.org/wiki/Minor_(linear_algebra)
  minor(i, j) {
    return void 0;
  }
  map1(fn, scalar) {
    return makeTensor(this.ce, {
      dtype: this.dtype,
      shape: this.shape,
      data: this.data.map((v) => fn(v, scalar))
    });
  }
  map2(fn, rhs) {
    const rhsData = rhs.data;
    return makeTensor(this.ce, {
      dtype: this.dtype,
      shape: this.shape,
      data: this.data.map((v, i) => fn(v, rhsData[i]))
    });
  }
  add(rhs) {
    return _AbstractTensor.broadcast(this.field.add.bind(this.field), this, rhs);
  }
  subtract(rhs) {
    return _AbstractTensor.broadcast(this.field.sub.bind(this.field), this, rhs);
  }
  // Hadamard product: \odot or \circ
  multiply(rhs) {
    return _AbstractTensor.broadcast(this.field.mul.bind(this.field), this, rhs);
  }
  divide(rhs) {
    return _AbstractTensor.broadcast(this.field.div.bind(this.field), this, rhs);
  }
  power(rhs) {
    return _AbstractTensor.broadcast(this.field.pow.bind(this.field), this, rhs);
  }
  // // aka inner product
  // dot(rhs: AbstractTensor<DT>): undefined | AbstractTensor<DT> {
  //   return undefined;
  // }
  // // aka matmul, \otimes or invisibleoperator
  // // generalization of the outer product
  // tensorProduct(rhs: AbstractTensor<DT>): AbstractTensor<DT>;
  // // generalization of kroneckerProduct
  // outerProduct(rhs: AbstractTensor<DT>): AbstractTensor<DT>;
  // // for 2d
  // kroneckerProduct(rhs: AbstractTensor<DT>): AbstractTensor<DT>;
  // // https://en.wikipedia.org/wiki/Frobenius_inner_product
  // // \langle A, B \rangle_F, Frobenius norm: \lVert A \rVert_F =
  // // \sqrt{\sum_{i,j} |a_{ij}|^2}
  // frobeniusProduct(rhs: AbstractTensor<DT>): DataTypeMap[DT];
  // crossProduct(rhs: AbstractTensor<DT>): AbstractTensor<DT>;
  // innerProduct(rhs: AbstractTensor<DT>): AbstractTensor<DT>;
  equals(rhs) {
    if (this.rank !== rhs.rank)
      return false;
    if (!this.shape.every((x, i) => x === rhs.shape[i]))
      return false;
    const eq = this.field.equals.bind(this.field);
    const cast = this.field.cast.bind(this.field);
    const dtype = this.dtype;
    if (this.dtype !== rhs.dtype) {
      if (!this.data.every((x, i) => eq(x, cast(rhs.data[i], dtype))))
        return false;
      return true;
    }
    return this.data.every((x, i) => eq(x, rhs.data[i]));
  }
};
function getStrides(shape) {
  let strides = new Array(shape.length);
  for (let i = shape.length - 1, stride = 1; i >= 0; i--) {
    strides[i] = stride;
    stride *= shape[i];
  }
  return strides;
}
var NumberTensor = class extends AbstractTensor {
  constructor(ce, data) {
    super(ce, data);
    this.dtype = "float64";
    this.data = data.data;
  }
  get isZero() {
    return this.data.every((x) => x === 0);
  }
};
var ComplexTensor = class extends AbstractTensor {
  constructor(ce, data) {
    super(ce, data);
    this.dtype = "complex128";
    this.data = data.data;
  }
};
var BooleanTensor = class extends AbstractTensor {
  constructor(ce, data) {
    super(ce, data);
    this.dtype = "bool";
    this.data = data.data;
  }
};
var GenericTensor = class extends AbstractTensor {
  constructor(ce, data) {
    super(ce, data);
    this.dtype = "expression";
    this.data = data.data;
  }
};
function makeTensor(ce, data) {
  const dtype = data.dtype;
  if (dtype === "float64" || dtype === "float32" || dtype === "uint8" || dtype === "int32")
    return new NumberTensor(
      ce,
      data
    );
  if (dtype === "bool")
    return new BooleanTensor(
      ce,
      data
    );
  if (dtype === "complex64" || dtype === "complex128")
    return new ComplexTensor(
      ce,
      data
    );
  return new GenericTensor(
    ce,
    data
  );
}

// src/compute-engine/boxed-expression/boxed-tensor.ts
var BoxedTensor = class _BoxedTensor extends _BoxedExpression {
  constructor(ce, input, options) {
    options ?? (options = {});
    options.canonical ?? (options.canonical = true);
    super(ce, options.metadata);
    if (input instanceof AbstractTensor) {
      this._tensor = input;
    } else {
      this._head = input.head ?? "List";
      this._ops = options.canonical ? ce.canonical(input.ops) : input.ops;
      this._expression = ce._fn(this._head, this._ops);
      this.expression.isCanonical = options.canonical;
    }
    ce._register(this);
  }
  get expression() {
    this._expression ?? (this._expression = this._tensor.expression);
    return this._expression;
  }
  /** Create the tensor on demand */
  get tensor() {
    if (this._tensor === void 0) {
      console.assert(this._head !== void 0);
      console.assert(this._ops !== void 0);
      const tensorData = expressionAsTensor(
        this._head,
        this._ops
      );
      if (tensorData === void 0)
        throw new Error("Invalid tensor");
      this._tensor = makeTensor(this.engine, tensorData);
    }
    return this._tensor;
  }
  get baseDefinition() {
    return this.expression.baseDefinition;
  }
  get functionDefinition() {
    return this.expression.functionDefinition;
  }
  bind() {
    this.expression.bind();
  }
  reset() {
  }
  get hash() {
    let h = hashCode("BoxedTensor");
    return h;
  }
  get canonical() {
    return this.expression.canonical;
  }
  get isCanonical() {
    if (this._tensor)
      return true;
    return this.expression.isCanonical;
  }
  set isCanonical(val) {
    if (!this._tensor)
      this.expression.isCanonical = val;
  }
  get isPure() {
    if (this._tensor)
      return true;
    return this.expression.isPure;
  }
  get isValid() {
    if (this._tensor)
      return true;
    return this.expression.isValid;
  }
  get complexity() {
    return 97;
  }
  get head() {
    return this._tensor ? "List" : this._head;
  }
  get nops() {
    if (this._tensor)
      return this._tensor.shape[0];
    return this.expression.nops;
  }
  get ops() {
    return this.expression.ops;
  }
  get op1() {
    if (this._tensor) {
      const data = this._tensor.data;
      if (data.length === 0)
        return this.engine.Nothing;
      return this.engine.box(data[0]);
    }
    return this.expression.op1;
  }
  get op2() {
    if (this._tensor) {
      const data = this._tensor.data;
      if (data.length < 2)
        return this.engine.Nothing;
      return this.engine.box(data[1]);
    }
    return this.expression.op2;
  }
  get op3() {
    if (this._tensor) {
      const data = this._tensor.data;
      if (data.length < 3)
        return this.engine.Nothing;
      return this.engine.box(data[2]);
    }
    return this.expression.op3;
  }
  get shape() {
    return this.tensor.shape;
  }
  get rank() {
    return this.tensor.rank;
  }
  get domain() {
    if (this._tensor)
      return this.engine.domain("Lists");
    return this.expression.domain;
  }
  get json() {
    return this.expression.json;
  }
  get rawJson() {
    return this.expression.rawJson;
  }
  /** Structural equality */
  isSame(rhs) {
    if (this === rhs)
      return true;
    if (rhs instanceof _BoxedTensor)
      return this.tensor.equals(rhs.tensor);
    return this.expression.isSame(rhs);
  }
  /** Mathematical equality */
  isEqual(rhs) {
    if (this === rhs)
      return true;
    if (rhs instanceof _BoxedTensor)
      return this.tensor.equals(rhs.tensor);
    return this.expression.isEqual(rhs);
  }
  match(rhs, options) {
    return this.expression.match(rhs, options);
  }
  evaluate(options) {
    if (this._tensor)
      return this;
    return this.expression.evaluate(options);
  }
  simplify(options) {
    if (this._tensor)
      return this;
    return this.expression.simplify(options);
  }
  N(options) {
    if (this._tensor)
      return this;
    return this.expression.N(options);
  }
};
function isBoxedTensor(val) {
  return val instanceof BoxedTensor;
}
function expressionTensorInfo(head2, rows) {
  let dtype = void 0;
  let shape = [];
  let valid = true;
  const visit = (t, axis = 0) => {
    if (t.length === 0)
      return;
    if (t.length > 1 && shape[axis] !== void 0)
      valid = valid && shape[axis] === t.length;
    else
      shape[axis] = Math.max(shape[axis] ?? 0, t.length);
    for (const item of t) {
      if (item.head === head2)
        visit(item.ops, axis + 1);
      else {
        if (dtype === void 0)
          dtype = getExpressionDatatype(item);
        else
          dtype = getSupertype(dtype, getExpressionDatatype(item));
      }
      if (!valid)
        return;
    }
  };
  visit(rows);
  if (!valid)
    return void 0;
  return { shape, dtype };
}
function expressionAsTensor(head2, rows) {
  let { shape, dtype } = expressionTensorInfo(head2, rows) ?? {
    shape: [],
    dtype: void 0
  };
  if (dtype === void 0)
    return void 0;
  let isValid = true;
  const data = [];
  const f = makeTensorField(rows[0].engine, "expression");
  const cast = f.cast.bind(f);
  const visit = (t) => {
    for (const item of t) {
      if (item.head === head2)
        visit(item.ops);
      else {
        const v = cast(item, dtype);
        if (v === void 0) {
          isValid = false;
          return;
        }
        data.push(v);
      }
    }
  };
  visit(rows);
  if (!isValid)
    return void 0;
  return { shape, data, dtype };
}

// src/compute-engine/library/arithmetic-divide.ts
function canonicalDivide(ce, op12, op22) {
  if (!op12.isValid || !op22.isValid)
    return ce._fn("Divide", [op12, op22]);
  if (op12.head === "Negate" && op22.head === "Negate") {
    op12 = op12.op1;
    op22 = op22.op1;
  }
  if (op12.numericValue !== null && op22.numericValue !== null) {
    if (op22.isOne)
      return op12;
    if (op22.isNegativeOne)
      return ce.neg(op12);
    if (op12.isOne)
      return ce.inv(op22);
    if (op12.isNegativeOne)
      return ce.neg(ce.inv(op22));
    const r1 = asRational(op12);
    const r2 = asRational(op22);
    if (r1 && r2 && !isRationalZero(r2))
      return ce.number(mul2(r1, inverse(r2)));
  }
  if (op12.head === "Divide" && op22.head === "Divide") {
    return canonicalDivide(
      ce,
      ce.mul([op12.op1, op22.op2]),
      ce.mul([op12.op2, op22.op1])
    );
  }
  if (op12.head === "Divide")
    return canonicalDivide(ce, ce.mul([op12.op1, op22]), op12.op2);
  if (op22.head === "Divide")
    return canonicalDivide(ce, ce.mul([op12, op22.op2]), op22.op1);
  const num1 = op12.numericValue;
  if (num1 !== null) {
    if (isMachineRational(num1)) {
      const [a, b] = num1;
      return canonicalDivide(ce, ce.number(a), ce.mul([ce.number(b), op22]));
    }
    if (isBigRational(num1)) {
      const [a, b] = num1;
      return canonicalDivide(ce, ce.number(a), ce.mul([ce.number(b), op22]));
    }
  }
  const num2 = op22.numericValue;
  if (num2 !== null) {
    if (isMachineRational(num2)) {
      const [a, b] = num2;
      return canonicalDivide(ce, ce.mul([op12, ce.number(b)]), ce.number(a));
    }
    if (isBigRational(num2)) {
      const [a, b] = num2;
      return canonicalDivide(ce, ce.mul([op12, ce.number(b)]), ce.number(a));
    }
  }
  const [c1, t1] = asCoefficient(op12);
  const [c2, t2] = asCoefficient(op22);
  if (!isRationalOne(c1) || !isRationalOne(c2)) {
    const [cn, cd] = mul2(c1, inverse(c2));
    const en = ce.mul([ce.number(cn), t1]);
    if (en.isZero)
      return ce.Zero;
    const ed = ce.mul([ce.number(cd), t2]);
    if (ed.isOne)
      return en;
    return ce._fn("Divide", [en, ed]);
  }
  let [nSign, n] = makePositive(op12);
  let [dSign, d] = makePositive(op22);
  n = n.canonical;
  d = d.canonical;
  if (d.numericValue !== null && d.isOne)
    return nSign * dSign < 0 ? canonicalNegate(n) : n;
  if (nSign * dSign > 0)
    return ce._fn("Divide", [n, d]);
  if (n.numericValue)
    return ce._fn("Divide", [canonicalNegate(n), d]);
  return canonicalNegate(ce._fn("Divide", [n, d]));
}
function simplifyDivide(ce, op12, op22) {
  if (op12.numericValue !== null && op22.numericValue !== null) {
    const r1 = asRational(op12);
    const r2 = asRational(op22);
    if (r1 && r2 && !isRationalZero(r2))
      return ce.number(mul2(r1, inverse(r2)));
  }
  return new Product(ce, [op12, ce.inv(op22)]).asRationalExpression();
}

// src/compute-engine/library/arithmetic-power.ts
var import_complex15 = __toESM(require_complex(), 1);
function canonicalPower(ce, base, exponent, metadata) {
  if (exponent.symbol === "ComplexInfinity")
    return ce.NaN;
  if (exponent.isZero)
    return ce.One;
  if (exponent.isOne)
    return base;
  if (exponent.isNegativeOne)
    return ce.inv(base);
  if (exponent.numericValue !== null) {
    if (base.numericValue !== null) {
      const numBase = asFloat(base);
      if (numBase === 1)
        return ce.One;
      if (numBase === 0) {
        if (exponent.isPositive)
          return ce.Zero;
        if (exponent.isNegative)
          return ce.ComplexInfinity;
      }
      if (exponent.isNegativeOne)
        return ce.inv(base);
      const e = asFloat(exponent);
      if (e === 0.5 || e === -0.5) {
        const b = asSmallInteger(base);
        if (b !== null && b > 0) {
          const [coef, radicand] = factorPower(b, 2);
          if (radicand === 1 && coef === 1)
            return ce.One;
          if (coef !== 1) {
            if (radicand === 1)
              return ce.number(e >= 0 ? coef : [1, coef]);
            return ce.mul([
              ce.number(coef),
              ce._fn("Sqrt", [ce.number(radicand)])
            ]);
          }
          if (e > 0)
            return ce._fn("Sqrt", [base], metadata);
          return ce.inv(ce._fn("Sqrt", [base]), metadata);
        }
        if (e > 0)
          return ce._fn("Power", [base, ce.Half], metadata);
        return ce._fn("Power", [base, ce.number([-1, 2])], metadata);
      }
      if (base.isInfinity) {
        if (exponent.numericValue instanceof import_complex15.Complex) {
          const re = exponent.numericValue.re;
          if (re === 0)
            return ce.NaN;
          if (re < 0)
            return ce.Zero;
          if (re > 0)
            return ce.ComplexInfinity;
        }
        if (base.isNegative) {
          if (exponent.isInfinity)
            return ce.NaN;
        } else if (base.isPositive) {
          if (exponent.isNegativeOne)
            return ce.Zero;
          if (exponent.isInfinity)
            return exponent.isNegative ? ce.Zero : ce.PositiveInfinity;
        }
      }
      if (exponent.isInfinity && (base.isOne || base.isNegativeOne))
        return ce.NaN;
    }
  }
  if (base.head === "Power" && base.op1.isReal) {
    const a = asSmallInteger(exponent);
    if (a !== null) {
      const b = asSmallInteger(base.op2);
      if (b !== null) {
        return ce.pow(base.op1, ce.number(a * b));
      }
    }
    if (base.op1.isNonNegative) {
      const ar = asRational(exponent);
      if (ar) {
        const br = asRational(base.op2);
        if (br)
          return ce.pow(base.op1, ce.number(mul2(ar, br)));
      }
    }
  }
  if (base.head === "Multiply") {
    const e = asSmallInteger(exponent);
    if (e !== null)
      return ce._fn(
        "Multiply",
        base.ops.map((x) => ce.pow(x, exponent))
      );
  }
  return ce._fn("Power", [base, exponent], metadata);
}
function square(ce, base) {
  const num = base.numericValue;
  if (typeof num === "number")
    return ce.number(num * num);
  if (num instanceof Decimal)
    return ce.number(num.pow(2));
  if (num instanceof import_complex15.Complex)
    return ce.number(num.pow(2));
  if (isMachineRational(num))
    return ce.number([num[1] * num[1], num[0] * num[0]]);
  if (isBigRational(num))
    return ce.number([num[1] * num[1], num[0] * num[0]]);
  if (base.head === "Multiply")
    return ce._fn(
      "Multiply",
      base.ops.map((x) => square(ce, x))
    );
  if (base.head === "Power") {
    const exp2 = asSmallInteger(base.op2);
    if (exp2 !== null)
      return ce.pow(base.op1, ce.number(exp2 * 2));
    return ce.pow(base.op1, ce.mul([ce.number(2), base.op2]));
  }
  return ce.pow(base, ce.number(2));
}
function numEvalPower(ce, base, exponent) {
  if (base.numericValue === null || exponent.numericValue === null)
    return void 0;
  if (base.numericValue instanceof import_complex15.Complex) {
    if (exponent.numericValue instanceof import_complex15.Complex)
      return ce.number(base.numericValue.pow(exponent.numericValue));
    return ce.number(base.numericValue.pow(asFloat(exponent) ?? NaN));
  }
  if (exponent.numericValue instanceof import_complex15.Complex) {
    const b = asFloat(base) ?? null;
    if (b !== null)
      return ce.number(ce.complex(b).pow(exponent.numericValue));
    return void 0;
  }
  const invExp = rootExp(exponent);
  if (bignumPreferred(ce) || base.numericValue instanceof Decimal || exponent.numericValue instanceof Decimal) {
    const bigBase = asBignum(base);
    const bigExp = asBignum(exponent);
    if (!bigBase || !bigExp)
      return void 0;
    if (invExp === 2) {
      if (bigBase.isNeg())
        return complexAllowed(ce) ? ce.number(ce.complex(0, bigBase.neg().sqrt().toNumber())) : ce.NaN;
      return ce.number(bigBase.sqrt());
    }
    if (!bigExp.isInteger() && bigBase.isNeg()) {
      if (!complexAllowed(ce))
        return ce.NaN;
      const zBase = ce.complex(bigBase.toNumber());
      const zExp = ce.complex(bigExp.toNumber());
      return ce.number(zBase.pow(zExp));
    }
    return ce.number(bigBase.pow(bigExp));
  }
  const floatExp = asFloat(exponent) ?? NaN;
  const floatBase = asFloat(base) ?? NaN;
  if (invExp === 2) {
    if (floatBase < 0) {
      return complexAllowed(ce) ? ce.mul([ce.I, ce.number(Math.sqrt(-floatBase))]) : ce.NaN;
    }
    return ce.number(Math.sqrt(floatBase));
  }
  if (!Number.isInteger(floatExp) && floatBase < 0) {
    if (!complexAllowed(ce))
      return ce.NaN;
    const zBase = ce.complex(floatBase);
    const zExp = ce.complex(floatExp);
    return ce.number(zBase.pow(zExp));
  }
  return ce.number(Math.pow(floatBase, floatExp));
}
function processPower(ce, base, exponent, mode) {
  if (base.head === "Multiply") {
    let c = bignumPreferred(ce) ? [BigInt(1), BigInt(1)] : [1, 1];
    const xs = [];
    for (const op3 of base.ops) {
      const r = asRational(op3);
      if (r)
        c = mul2(c, r);
      else
        xs.push(op3);
    }
    if (!isRationalOne(c))
      return ce.mul([
        processSqrt(ce, ce.number(c), mode) ?? ce.One,
        ce.pow(
          processPower(ce, ce.mul(xs), exponent, mode) ?? ce.mul(xs),
          exponent
        )
      ]);
  }
  if (base.head === "Power") {
    if (asSmallInteger(base.op2) === -1 && asSmallInteger(exponent) === -1)
      return base.op1;
    const e1 = asRational(base.op2);
    const e2 = asRational(exponent);
    if (e1 && e2) {
      const e = mul2(e1, e2);
      return ce.pow(base.op1, e);
    }
    if (mode === "N") {
      const ef1 = asFloat(base.op2);
      const ef2 = asFloat(exponent);
      if (ef1 !== null && ef2 !== null) {
        const ef = ef1 * ef2;
        if (ef === 0)
          return ce.One;
        if (ef === 1)
          return base.op1;
        return ce.pow(base.op1, ef);
      }
    }
  }
  if (mode !== "N" && base.numericValue !== null && base.isInteger) {
    const smallExpr = asSmallInteger(exponent);
    if (smallExpr)
      return numEvalPower(ce, base, exponent);
    const r = asRational(exponent);
    if (r) {
      const [n, d] = [machineNumerator(r), machineDenominator(r)];
      if ((n === 1 || n === -1) && (d === 2 || d === 3)) {
        if (bignumPreferred(ce) || base.numericValue instanceof Decimal) {
          const bigBase = asBigint(base);
          if (d % 2 === 0 && bigBase < 0 && !complexAllowed(ce))
            return ce.NaN;
          const sign2 = bigBase < 0 ? d % 2 === 0 ? ce.I : ce.NegativeOne : ce.One;
          const [factor, root] = factorPower2(
            bigBase > 0 ? bigBase : -bigBase,
            d
          );
          if (root === BigInt(1) && factor === BigInt(1))
            return sign2;
          if (factor !== BigInt(1)) {
            if (root === BigInt(1))
              return ce.mul([
                sign2,
                ce.number(n >= 0 ? factor : [BigInt(1), factor])
              ]);
            return ce.mul([
              sign2,
              ce.number(factor),
              ce.pow(ce.number(root), exponent)
            ]);
          }
        } else if (typeof base.numericValue === "number") {
          if (base.numericValue < 0 && d % 2 === 0 && !complexAllowed(ce))
            return ce.NaN;
          const [factor, root] = factorPower(Math.abs(base.numericValue), d);
          const sign2 = base.numericValue < 0 ? d % 2 === 0 ? ce.I : ce.NegativeOne : ce.One;
          if (root === 1 && factor === 1)
            return sign2;
          if (factor !== 1) {
            if (root === 1)
              return ce.mul([sign2, ce.number(n >= 0 ? factor : [1, factor])]);
            return ce.mul([
              sign2,
              ce.number(factor),
              ce.pow(ce.number(root), exponent)
            ]);
          }
        } else {
        }
      }
      if (base.isNegative) {
        if (!complexAllowed)
          return ce.NaN;
        return ce.mul([ce.I, ce.fn("Sqrt", [ce.neg(base)])]);
      }
      return void 0;
    }
  }
  if (mode !== "simplify" && base.numericValue !== null && exponent.numericValue !== null)
    return numEvalPower(ce, base, exponent);
  return void 0;
}
function processSqrt(ce, base, mode) {
  if (base.isOne)
    return ce.One;
  if (base.isZero)
    return ce.Zero;
  if (base.isNegativeOne)
    return complexAllowed(ce) ? ce.I : ce.NaN;
  if (base.isNegative && !complexAllowed(ce))
    return ce.NaN;
  const r = asRational(base);
  if (mode === "N" || mode === "evaluate" && !r)
    return applyN(
      base,
      (x) => x < 0 ? ce.complex(x).sqrt() : Math.sqrt(x),
      (x) => x.isNeg() ? ce.complex(x.toNumber()).sqrt() : x.sqrt(),
      (x) => x.sqrt()
    );
  const n = asSmallInteger(base);
  if (n !== null) {
    const [factor, root] = factorPower(Math.abs(n), 2);
    if (n < 0) {
      if (root === 1)
        ce.mul([ce.number(ce.complex(0, factor))]);
      return ce.mul([
        ce.number(ce.complex(0, factor)),
        ce.sqrt(ce.number(root))
      ]);
    }
    if (root === 1)
      return ce.number(factor);
    return ce.mul([ce.number(factor), ce.sqrt(ce.number(root))]);
  }
  if (r) {
    if (isMachineRational(r) && !bignumPreferred(ce)) {
      const [n2, d] = r;
      if (Math.abs(n2) < Number.MAX_SAFE_INTEGER && d < Number.MAX_SAFE_INTEGER) {
        const [nFactor, nRoot] = factorPower(Math.abs(n2), 2);
        const [dFactor, dRoot] = factorPower(d, 2);
        if (n2 < 0)
          return ce.mul([
            ce.number([nFactor, dFactor]),
            ce.sqrt(ce.number([nRoot, dRoot])),
            ce.I
          ]);
        return ce.mul([
          ce.number([nFactor, dFactor]),
          ce.sqrt(ce.number([nRoot, dRoot]))
        ]);
      }
    }
    if (isBigRational(r) || bignumPreferred(ce)) {
      const n2 = bigint(r[0]);
      const [nFactor, nRoot] = factorPower2(n2 > 0 ? n2 : -n2, 2);
      const [dFactor, dRoot] = factorPower2(bigint(r[1]), 2);
      if (n2 < 0)
        return ce.mul([
          ce.number([nFactor, dFactor]),
          ce.sqrt(ce.number([nRoot, dRoot])),
          ce.I
        ]);
      return ce.mul([
        ce.number([nFactor, dFactor]),
        ce.sqrt(ce.number([nRoot, dRoot]))
      ]);
    }
  }
  return void 0;
}
function rootExp(exponent) {
  if (typeof exponent.numericValue === "number") {
    const inv = 1 / exponent.numericValue;
    if (Number.isInteger(inv))
      return inv;
    return null;
  }
  if (exponent.numericValue instanceof Decimal) {
    const inv = exponent.engine._BIGNUM_ONE.div(exponent.numericValue);
    if (inv.isInt())
      return inv.toNumber();
    return null;
  }
  if (!isRational(exponent.numericValue))
    return null;
  const [n, d] = [
    machineNumerator(exponent.numericValue),
    machineDenominator(exponent.numericValue)
  ];
  if (n !== 1 && n !== -1)
    return null;
  return n * d;
}

// src/compute-engine/library/arithmetic-multiply.ts
function canonicalMultiply(ce, ops2) {
  console.assert(ops2.every((x) => x.isCanonical));
  if (ops2.length === 0)
    return ce.One;
  if (ops2.length === 1)
    return ops2[0];
  if (ops2.length === 2)
    return multiply2(ops2[0], ops2[1]);
  const product = new Product(ce);
  for (const op3 of ops2) {
    if (op3.isNaN || op3.symbol === "Undefined")
      return ce.NaN;
    product.addTerm(op3);
  }
  return product.asExpression();
}
function simplifyMultiply(ce, ops2) {
  console.assert(ops2.every((x) => x.head !== "Multiply"));
  const product = new Product(ce);
  for (let op3 of ops2) {
    op3 = op3.simplify();
    if (op3.isNaN || op3.symbol === "Undefined")
      return ce.NaN;
    product.addTerm(op3);
  }
  return product.asExpression();
}
function evalMultiply(ce, ops2, mode = "evaluate") {
  console.assert(ops2.length > 1, "evalMultiply(): no arguments");
  if (mode === "N") {
    ops2 = ops2.map((x) => x.N());
    if ((ce.numericMode === "machine" || ce.numericMode === "auto") && ops2.every((x) => typeof x.numericValue === "number")) {
      let prod = 1;
      for (const op3 of ops2)
        prod *= op3.numericValue;
      return ce.number(prod);
    }
  }
  for (const op3 of ops2) {
    if (op3.isNaN || op3.symbol === "Undefined")
      return ce.NaN;
    if (!op3.isExact)
      mode = "N";
  }
  console.assert(ops2.every((x) => x.head !== "Multiply"));
  if (mode === "N")
    ops2 = ops2.map((x) => x.N());
  else
    ops2 = ops2.map((x) => x.evaluate());
  return new Product(ce, ops2).asExpression(mode);
}
function multiply2(op12, op22, metadata) {
  console.assert(op12.isCanonical);
  console.assert(op22.isCanonical);
  const ce = op12.engine;
  if (op12.symbol === "ImaginaryUnit") {
    const f = asFloat(op22);
    if (f !== null)
      return ce.number(ce.complex(0, f));
  }
  if (op22.symbol === "ImaginaryUnit") {
    const f = asFloat(op12);
    if (f !== null)
      return ce.number(ce.complex(0, f));
  }
  if (op12.numericValue !== null && op22.numericValue !== null) {
    const f1 = asFloat(op12);
    const f2 = asFloat(op22);
    if (f1 !== null && ce.isComplex(op22))
      return ce.number(ce.complex(f1 * op22.re, f1 * op22.im));
    if (f2 !== null && ce.isComplex(op12))
      return ce.number(ce.complex(f2 * op12.re, f2 * op12.im));
  }
  if (op12.numericValue !== null && op22.numericValue !== null && op12.isInteger && op22.isInteger) {
    return apply2N(
      op12,
      op22,
      (a, b) => a * b,
      (a, b) => a.mul(b)
    ) ?? ce.NaN;
  }
  if (op12.isNaN || op22.isNaN || op12.symbol === "Undefined" || op22.symbol === "Undefined")
    return ce.NaN;
  if (op12.isNothing)
    return op22;
  if (op22.isNothing)
    return op12;
  if (op12.numericValue !== null) {
    if (op12.isOne)
      return op22;
    if (op12.isNegativeOne)
      return canonicalNegate(op22);
  }
  if (op22.numericValue !== null) {
    if (op22.isOne)
      return op12;
    if (op22.isNegativeOne)
      return canonicalNegate(op12);
  }
  let sign2 = 1;
  let [t, c] = op12.numericValue !== null ? [op12, op22] : [op22, op12];
  console.assert(t.head !== "Subtract");
  if (t.head === "Negate") {
    t = t.op1;
    sign2 = -sign2;
  }
  if (c.numericValue !== null) {
    const r = asRational(c);
    if (r) {
      if (isRationalOne(r))
        return t;
      if (isRationalZero(r))
        return ce.Zero;
      if (t.head === "Add") {
        if (sign2 < 0)
          c = canonicalNegate(c);
        return ce.add(
          t.ops.map((x) => multiply2(c, x)),
          metadata
        );
      }
      const tr = asRational(t);
      if (tr) {
        const p = mul2(r, tr);
        return ce.number(sign2 < 0 ? neg(p) : p, { metadata });
      }
      if (sign2 < 0)
        return ce._fn("Multiply", [canonicalNegate(c), t], metadata);
      return ce._fn("Multiply", [c, t], metadata);
    }
  }
  if (c.hash === t.hash && c.isSame(t))
    return square(ce, c);
  const product = new Product(ce, [c, t]);
  if (sign2 > 0)
    return product.asExpression();
  return canonicalNegate(product.asExpression(), metadata);
}
function canonicalProduct(ce, body, indexingSet) {
  ce.pushScope();
  body ?? (body = ce.error("missing"));
  indexingSet = canonicalIndexingSet(indexingSet);
  const result = indexingSet ? ce._fn("Product", [body.canonical, indexingSet]) : ce._fn("Product", [body.canonical]);
  ce.popScope();
  return result;
}
function evalMultiplication(ce, expr, indexingSet, mode) {
  let result = null;
  const body = mode === "simplify" ? expr.simplify() : expr.evaluate({ numericMode: mode === "N" });
  if (!indexingSet) {
    if (bignumPreferred(ce)) {
      let product = ce.bignum(1);
      for (const x of each(body)) {
        const term = asBignum(x);
        if (term === null) {
          result = void 0;
          break;
        }
        if (!term.isFinite()) {
          product = term;
          break;
        }
        product = product.mul(term);
      }
      if (result === null)
        result = ce.number(product);
    } else {
      let product = 1;
      for (const x of each(body)) {
        const term = asFloat(x);
        if (term === null) {
          result = void 0;
          break;
        }
        if (term === null || !Number.isFinite(term)) {
          product = term;
          break;
        }
        product *= term;
      }
      if (result === null)
        result = ce.number(product);
    }
    return result ?? void 0;
  }
  const [index, lower, upper, isFinite2] = normalizeIndexingSet(indexingSet);
  if (!index)
    return void 0;
  const fn = expr;
  if (mode !== "N" && (lower >= upper || upper - lower >= MAX_SYMBOLIC_TERMS))
    return void 0;
  const savedContext = ce.swapScope(fn.scope);
  ce.pushScope();
  fn.bind();
  if (mode === "simplify") {
    const terms = [];
    for (let i = lower; i <= upper; i++) {
      ce.assign({ [index]: i });
      terms.push(fn.simplify());
    }
    result = ce.mul(terms).simplify();
  }
  if (mode === "evaluate") {
    const terms = [];
    for (let i = lower; i <= upper; i++) {
      ce.assign({ [index]: i });
      terms.push(fn.evaluate());
    }
    result = ce.mul(terms).evaluate();
  }
  if (mode === "N") {
    if (result === null && isFinite2) {
      if (bignumPreferred(ce)) {
        let product2 = ce.bignum(1);
        for (let i = lower; i <= upper; i++) {
          ce.assign({ [index]: i });
          const term = asBignum(fn.N());
          if (term === null || !term.isFinite()) {
            result = term !== null ? ce.number(term) : void 0;
            break;
          }
          product2 = product2.mul(term);
        }
        if (result === null)
          result = ce.number(product2);
      }
      let product = 1;
      const numericMode = ce.numericMode;
      const precision = ce.precision;
      ce.numericMode = "machine";
      for (let i = lower; i <= upper; i++) {
        ce.assign({ [index]: i });
        const term = asFloat(fn.N());
        if (term === null || !Number.isFinite(term)) {
          result = term !== null ? ce.number(term) : void 0;
          break;
        }
        product *= term;
      }
      ce.numericMode = numericMode;
      ce.precision = precision;
      if (result === null)
        result = ce.number(product);
    }
    if (result === null) {
      ce.assign({ [index]: 1e3 });
      const nMax = fn.N();
      ce.assign({ [index]: 999 });
      const nMaxMinusOne = fn.N();
      const ratio = asFloat(ce.div(nMax, nMaxMinusOne).N());
      if (ratio !== null && Number.isFinite(ratio) && Math.abs(ratio) > 1) {
        result = ce.PositiveInfinity;
      } else {
        let product = 1;
        const numericMode = ce.numericMode;
        const precision = ce.precision;
        ce.numericMode = "machine";
        for (let i = lower; i <= upper; i++) {
          ce.assign({ [index]: i });
          const term = asFloat(fn.N());
          if (term === null) {
            result = void 0;
            break;
          }
          if (Math.abs(1 - term) < Number.EPSILON || !Number.isFinite(term))
            break;
          product *= term;
        }
        if (result === null)
          result = ce.number(product);
        ce.numericMode = numericMode;
        ce.precision = precision;
      }
    }
  }
  ce.popScope();
  ce.swapScope(savedContext);
  return result ?? void 0;
}

// src/compute-engine/library/random-expression.ts
function oneOf(xs) {
  return xs[Math.floor(Math.random() * xs.length)];
}
function randomExpressionWithHead(head2, level) {
  if (head2 === "Add" || head2 === "Multiply") {
    const ops2 = [];
    let count = 1 + Math.floor(Math.random() * 12);
    while (count > 0) {
      ops2.push(randomExpression(level + 1));
      count -= 1;
    }
    return [head2, ...ops2];
  }
  if (head2 === "Divide" || head2 === "Power") {
    return [head2, randomExpression(level + 1), randomExpression(level + 1)];
  }
  if (head2 === "Root") {
    return [head2, randomExpression(level + 1), randomExpression(10)];
  }
  if (head2 === "trig")
    return randomTrig();
  return [head2, randomExpression(level + 1)];
}
function randomTrig() {
  return [
    oneOf(["Cos", "Sin", "Tan", "Sinh", "Arccos", "Arsinh"]),
    oneOf([
      "Pi",
      "-1",
      "0",
      "1",
      ["Divide", "Pi", -5],
      ["Multiply", -2, ["Divide", "Pi", 11]],
      ["Multiply", "Half", "Pi"],
      ["Multiply", 5, "Pi"],
      ["Multiply", 12, "Pi"],
      ["Divide", "Pi", 5],
      ["Divide", "Pi", 9],
      ["Multiply", 5, ["Divide", "Pi", 9]],
      ["Multiply", 2, ["Divide", "Pi", 11]],
      ["Multiply", 2, ["Divide", "Pi", 3]]
    ])
  ];
}
function randomExpression(level) {
  level ?? (level = 1);
  if (level === 1) {
    const h = oneOf([
      [
        "Sqrt",
        [
          "Multiply",
          6,
          [
            "Sum",
            ["Divide", 1, ["Power", "n", 2]],
            ["Triple", ["Hold", "n"], 1, { num: "+Infinity" }]
          ]
        ]
      ],
      "Add",
      "Add",
      "Add",
      "Add",
      "Add",
      "Multiply",
      "Multiply",
      "Multiply",
      "Multiply",
      "Divide",
      "Divide",
      "Divide",
      "Root",
      "Sqrt",
      "Subtract",
      "Negate",
      "trig"
    ]);
    if (typeof h === "string")
      return randomExpressionWithHead(h, 1);
    return h;
  }
  if (level === 2) {
    const r = Math.random();
    if (r > 0.75)
      return randomExpression(1);
    if (r > 0.5)
      return randomExpression(3);
    const h = oneOf([
      "Multiply",
      "Multiply",
      "Add",
      "Power",
      "trig",
      "Ln",
      "Exp"
    ]);
    return randomExpressionWithHead(h, 2);
  }
  return oneOf([
    -12345e-9,
    -2,
    -2,
    -2,
    -3,
    -5,
    -6,
    -12,
    -1654e-60,
    0,
    0,
    12345e-8,
    1654e-60,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    5,
    5,
    6,
    6,
    1234.5678,
    5678.1234,
    10,
    15,
    18,
    30,
    60,
    1234e54,
    "123456789.12345678912345e200",
    "987654321.12345678912345",
    ["Rational", -6, 10],
    ["Rational", -12, 15],
    ["Rational", -15, 12],
    ["Rational", 3, 5],
    ["Rational", 12, 15],
    ["Rational", 15, 12],
    "ExponentialE",
    // 'ImaginaryUnit',
    ["Sqrt", 3],
    ["Sqrt", 5],
    ["Sqrt", 15],
    ["Sqrt", 25],
    ["Complex", -1.1, 1.1],
    ["Complex", 4, 5],
    "x",
    "x",
    "x",
    "x",
    ["Add", "x", 1],
    ["Divide", "x", 3],
    ["Square", "x"],
    ["Power", "x", 3],
    ["Power", "x", 4],
    ["Subtract", "x", 1],
    ["Add", "x", 1],
    // 'a',
    // 'b',
    "Pi"
  ]);
}

// src/compute-engine/library/core.ts
var CORE_LIBRARY = [
  {
    Nothing: { domain: "NothingDomain" }
  },
  //
  // Inert functions
  //
  {
    /**
     * ## THEORY OF OPERATIONS: SEQUENCES
     *
     * There are two similar functions used to represent sequences of
     * expressions:
     *
     * - `InvisibleOperator` represent a sequence of expressions
     *  that are syntactically juxtaposed without any separator or
     *  operators combining them. For example, `2x` is represented as
     *  `["InvisibleOperator", 2, "x"]`. `InvisibleOperator` gets
     *  transformed into `Multiply` (or some other semantic operation)
     *  during canonicalization.
     *
     * - `Sequence` is used to represent a sequence of expressions
     *   at a semantic level. It is a collection, but it is handled
     *   specially when canonicalizing expressions, for example it
     *   is automatically flattened and hoisted to the top level of the
     *   argument list.
     *   For example:
     *    `["Add", "a", ["Sequence", "b", "c"]]` is canonicalized
     *      to `["Add", "a", "b", "c"]`.
     *
     * The empty `Sequence` expression (i.e. `["Sequence"]`) is ignored
     * but it can be used to represent an "empty" expression.
     *
     * - `Delimiter` is used to represent a group of expressions
     *   with an open and close delimiter and separator. They capture the
     *   input syntax, and can get transformed into other expressions
     *   during boxing and canonicalization.
     *   The first argument is a function expression, such as `List`
     *   or `Sequence`. The arguments of that expression are represented
     *   with a separator between them and delimiters around the whole
     *   group.
     *   The second argument specify the separator and delimiters. If not
     *   specified, the default is the string `"(,)"`
     *
     * Examples:
     * - `f(x)` ->
     *    `["InvisibleOperator",
     *        "f",
     *        ["Delimiter", ["Sequence", "x"], "'(,)'"]
     *     ]`
     *
     * - `1, 2; 3, 4` ->
     *    `["Delimiter",
     *      ["Sequence",
     *        ["Delimiter", ["Sequence", 1, 2], "','"],
     *        ["Delimiter", ["Sequence", 3, 4], "','"],
     *      ],
     *     "';'"
     *    ]`
     *
     * - `2x` -> `["InvisibleOperator", 2, "x"]`
     *
     * - `2+` -> `["InvisibleOperator", 2, ["Error", "'unexpected-operator'", "+"]]`
     *
     *
     *
     *
     */
    InvisibleOperator: {
      complexity: 9e3,
      hold: "all",
      signature: {
        restParam: "Anything",
        result: (ce, args) => {
          if (args.length === 0)
            return ce.domain("NothingDomain");
          if (args.length === 1)
            return args[0].domain;
          return ce.Anything;
        },
        canonical: canonicalInvisibleOperator
      }
    },
    /** See above for a theory of operations */
    Sequence: {
      hold: "all",
      signature: {
        restParam: "Anything",
        result: (ce, args) => {
          if (args.length === 0)
            return ce.domain("NothingDomain");
          if (args.length === 1)
            return args[0].domain;
          return ce.Anything;
        },
        canonical: (ce, args) => {
          const xs = canonical(flattenSequence(args));
          if (xs.length === 0)
            return ce._fn("Sequence", []);
          if (xs.length === 1)
            return xs[0];
          return ce._fn("Sequence", xs);
        }
      }
    },
    /** See above for a theory of operations */
    Delimiter: {
      // Use to represent groups of expressions.
      // Named after https://en.wikipedia.org/wiki/Delimiter
      complexity: 9e3,
      hold: "all",
      signature: {
        params: ["Anything"],
        optParams: ["Strings"],
        result: (_ce, args) => args[0].domain,
        // During canonicalization, Delimiters get replaced by their first
        // argument, which is a function expression (e.g. `List` or `Sequence`)
        canonical: (ce, args) => {
          if (args.length === 0)
            return ce._fn("Tuple", []);
          let body = args[0];
          console.assert(body.ops !== null);
          if (body.head === "Sequence")
            body = ce._fn("Sequence", ce.canonical(body.ops));
          args = [body, ...args.slice(1)];
          if (args.length === 1)
            return ce._fn("Delimiter", args);
          if (args.length > 2)
            return ce._fn("Delimiter", checkArity(ce, args, 2));
          if ((args[1].string?.length ?? 0) > 3) {
            return ce._fn("Delimiter", [
              args[0],
              ce.error("invalid-delimiter", args[1])
            ]);
          }
          return ce._fn("Delimiter", [
            args[0],
            checkDomain(ce, args[1], "Strings")
          ]);
        },
        evaluate: (ce, ops2) => {
          if (ops2.length === 0)
            return ce.Nothing;
          const op12 = ops2[0];
          if (op12.head === "Sequence" || op12.head === "Delimiter")
            ops2 = flattenSequence(ops2[0].ops);
          return ce._fn(
            "Tuple",
            ops2.map((x) => x.evaluate())
          );
        },
        N: (ce, ops2) => {
          if (ops2.length === 0)
            return ce.Nothing;
          const op12 = ops2[0];
          if (op12.head === "Sequence" || op12.head === "Delimiter")
            ops2 = flattenSequence(ops2[0].ops);
          return ce._fn(
            "Tuple",
            ops2.map((x) => x.N())
          );
        }
      }
    },
    Error: {
      /**
       * - The first argument is either a string or an `["ErrorCode"]`
       * expression indicating the nature of the error.
       * - The second argument, if present, indicates the context/location
       * of the error. If the error occur while parsing a LaTeX string,
       * for example, the argument will be a `Latex` expression.
       */
      hold: "all",
      complexity: 500,
      signature: {
        domain: ["FunctionOf", "Anything", ["OptArg", "Anything"], "Void"],
        // To make a canonical expression, don't canonicalize the args
        canonical: (ce, args) => ce._fn("Error", args)
      }
    },
    ErrorCode: {
      complexity: 500,
      hold: "all",
      signature: {
        domain: ["FunctionOf", "Strings", ["VarArg", "Anything"], "Anything"],
        canonical: (ce, args) => {
          const code = checkDomain(ce, args[0], ce.Strings).string;
          if (code === "incompatible-domain") {
            return ce._fn("ErrorCode", [ce.string(code), args[1], args[2]]);
          }
          return ce._fn("ErrorCode", args);
        }
      }
    },
    Hold: {
      hold: "all",
      signature: {
        domain: ["FunctionOf", "Anything", "Anything"],
        result: (ce, args) => {
          const op12 = args[0];
          if (op12.symbol)
            return ce.domain("Symbols");
          if (op12.string)
            return ce.domain("Strings");
          if (op12.head === "Numbers")
            return ce.domain("Numbers");
          return op12.domain;
        },
        // By definition, for arguments of the canonical expression of
        // `Hold` are not canonicalized.
        canonical: (ce, args) => args.length !== 1 ? null : ce.hold(args[0]),
        evaluate: (ce, ops2) => ops2[0]
      }
    },
    HorizontalSpacing: {
      signature: {
        domain: "Functions",
        canonical: (ce, args) => {
          if (args.length === 2)
            return args[0].canonical;
          return ce.box(["Sequence"]);
        }
      }
    },
    Style: {
      complexity: 9e3,
      inert: true,
      signature: {
        domain: [
          "FunctionOf",
          "Anything",
          ["OptArg", "Dictionaries"],
          // @todo
          "Anything"
        ]
      }
      // @todo: simplify: merge Style(Style(x, s1), s2),  Style(x) -> x
    }
  },
  {
    // Structural operations that can be applied to non-canonical expressions
    // @todo
    About: { signature: { domain: "Functions" } },
    Head: {
      hold: "all",
      signature: {
        domain: "Functions",
        canonical: (ce, args) => {
          if (args.length !== 1)
            return null;
          const op12 = args[0];
          if (op12.head)
            return ce.box(op12.head);
          return ce._fn("Head", canonical(args));
        },
        evaluate: (ce, ops2) => {
          const op12 = ops2[0];
          if (typeof op12?.head === "string")
            return ce.symbol(op12.head);
          return op12?.head ?? ce.Nothing;
        }
      }
    },
    Tail: {
      hold: "all",
      signature: {
        domain: "Functions",
        canonical: (ce, args) => {
          if (args.length !== 1)
            return null;
          const op12 = args[0];
          if (op12.ops)
            return ce._fn("Sequence", op12.ops);
          return ce._fn("Tail", canonical(args));
        },
        evaluate: (ce, ops2) => {
          const op12 = ops2[0];
          if (op12?.ops)
            return ce.fn("Sequence", op12.ops);
          return ce.box(["Sequence"]);
        }
      }
    },
    Identity: {
      signature: {
        domain: ["FunctionOf", "Anything", "Anything"],
        result: (_ce, ops2) => ops2[0].domain,
        evaluate: (_ce, ops2) => ops2[0]
      }
    }
  },
  {
    Apply: {
      signature: {
        domain: "Functions",
        canonical: (ce, args) => {
          if (args[0].symbol)
            return ce.box([args[0].symbol, ...args.slice(1)]);
          return ce._fn("Apply", args);
        },
        evaluate: (_ce, ops2) => apply3(ops2[0], ops2.slice(1))
      }
    },
    Assign: {
      hold: "all",
      pure: false,
      signature: {
        domain: ["FunctionOf", "Anything", "Anything", "Anything"],
        canonical: (ce, args) => {
          if (args.length !== 2)
            return null;
          const op12 = args[0];
          if (!op12.symbol)
            return null;
          const op22 = args[1];
          return ce._fn("Assign", [op12, op22]);
        },
        evaluate: (ce, ops2) => {
          const op12 = ops2[0];
          const op22 = ops2[1];
          if (!op12.symbol)
            return ce.Nothing;
          const val = op22.evaluate();
          ce.assign(op12.symbol, val);
          return val;
        }
      }
    },
    Assume: {
      hold: "all",
      pure: false,
      signature: {
        domain: ["FunctionOf", "Anything", "Anything"],
        evaluate: (ce, ops2) => ce.string(ce.assume(ops2[0]))
      }
    },
    Declare: {
      hold: "all",
      pure: false,
      signature: {
        domain: ["FunctionOf", "Symbols", "Anything"],
        canonical: (ce, args) => {
          if (args.length !== 2)
            return null;
          const op12 = args[0];
          const op22 = args[1];
          if (!op12.symbol)
            return null;
          if (op22.symbol)
            return ce._fn("Declare", args);
          return ce._fn("Declare", [op12, ce._fn("Hold", [op22])]);
        },
        evaluate: (ce, ops2) => {
          const op12 = ops2[0];
          const op22 = ops2[1];
          if (!op12.symbol)
            return ce.Nothing;
          const val = op22.evaluate();
          if (!isDomain(val))
            return void 0;
          ce.declare(op12.symbol, val);
          return val;
        }
      }
    },
    Domain: {
      /** Return the domain of an expression */
      signature: {
        domain: ["FunctionOf", "Anything", "Domains"],
        evaluate: (_ce, ops2) => ops2[0].domain
      }
    },
    Evaluate: {
      hold: "all",
      signature: {
        domain: ["FunctionOf", "Anything", "Anything"],
        result: (_ce, ops2) => ops2[0].domain,
        canonical: (ce, ops2) => ce._fn("Evaluate", checkArity(ce, ops2, 1)),
        evaluate: (_ce, ops2) => ops2[0].evaluate()
      }
    },
    Function: {
      complexity: 9876,
      hold: "all",
      signature: {
        domain: ["FunctionOf", "Anything", ["VarArg", "Symbols"], "Functions"],
        canonical: (ce, args) => {
          if (args.length === 0)
            return ce.box(["Sequence"]);
          const result = args.length === 1 ? canonicalFunctionExpression(args[0]) : ce._fn("Function", args);
          return result ?? null;
        },
        evaluate: (_ce, _args) => {
          return void 0;
        }
      }
    },
    Simplify: {
      hold: "all",
      signature: {
        domain: ["FunctionOf", "Anything", "Anything"],
        result: (_ce, ops2) => ops2[0].domain,
        canonical: (ce, ops2) => ce._fn("Simplify", checkArity(ce, ops2, 1)),
        evaluate: (_ce, ops2) => ops2[0].simplify()
      }
    },
    // Can be used to sort arguments of an expression.
    // Sorting arguments of commutative functions is a weak form of
    // canonicalization that can be useful in some cases, for example
    // to accept "x+1" and "1+x" while rejecting "x+1" and "2x-x+1"
    CanonicalForm: {
      complexity: 8200,
      hold: "all",
      signature: {
        domain: ["FunctionOf", "Anything", ["VarArg", "Symbols"], "Anything"],
        // Do not canonicalize the arguments, we want to preserve
        // the original form before modifying it
        canonical: (_ce, ops2) => {
          if (ops2.length === 1)
            return ops2[0].canonical;
          const forms = ops2.slice(1).map((x) => x.symbol ?? x.string).filter((x) => x !== void 0 && x !== null);
          return canonicalForm(ops2[0], forms);
        }
      }
    },
    N: {
      hold: "all",
      signature: {
        domain: ["FunctionOf", "Anything", "Anything"],
        result: (_ce, ops2) => ops2[0].domain,
        canonical: (ce, ops2) => {
          if (ops2.length !== 1)
            return ce._fn("N", checkArity(ce, ops2, 1));
          const h = ops2[0].head;
          if (h === "N")
            return ops2[0].canonical;
          if (h === "Integrate") {
            const [index, lower, upper] = normalizeIndexingSet(ops2[0].op2);
            if (!index || lower === void 0 || upper === void 0)
              return null;
            const fn = ops2[0].op1;
            return ce._fn("NIntegrate", [
              ce.box(["Function", fn, index]),
              ce.number(lower),
              ce.number(upper)
            ]);
          }
          if (h === "Limit")
            return ce._fn("NLimit", ops2[0].ops);
          return ce._fn("N", ops2);
        },
        evaluate: (_ce, ops2) => ops2[0].N()
      }
    },
    // @todo: need review
    Signatures: {
      signature: {
        domain: ["FunctionOf", "Symbols", ["ListOf", "Domains"]],
        canonical: (ce, ops2) => {
          ops2 = checkArity(ce, ops2, 1);
          if (!ops2[0].symbol)
            return ce._fn("Signatures", [
              ce.domainError("Symbols", ops2[0].domain, ops2[0])
            ]);
          return ce._fn("Signatures", ops2);
        },
        evaluate: (ce, ops2) => {
          const name = ops2[0].symbol;
          if (!name)
            return ce.Nothing;
          const def = ce.lookupFunction(name);
          if (!def)
            return ce.fn("List", []);
          const sig = def.signature;
          const fnParams = [...sig.params];
          if (sig.optParams.length > 0)
            fnParams.push(ce._fn("OptArg", sig.optParams));
          if (sig.restParam)
            fnParams.push(ce._fn("VarArg", [sig.restParam]));
          if (typeof sig.result === "function")
            fnParams.push(sig.result(ce, []) ?? ce.symbol("Undefined"));
          else
            fnParams.push(sig.result);
          return ce.fn("List", fnParams);
        }
      }
    },
    Subscript: {
      /**
       * The `Subscript` function can take several forms:
       *
       * If `op1` is a string, the string is interpreted as a number in
       * base `op2` (2 to 36).
       *
       * If `op1` is an indexable collection, `x`:
       * - `x_*` -> `At(x, *)`
       *
       * Otherwise:
       * - `x_0` -> Symbol "x_0"
       * - `x_n` -> Symbol "x_n"
       * - `x_{\text{max}}` -> Symbol `x_max`
       * - `x_{(n+1)}` -> `At(x, n+1)`
       * - `x_{n+1}` ->  `Subscript(x, n+1)`
       */
      // The last (subscript) argument can include a delimiter that
      // needs to be interpreted. Without the hold, it would get
      // removed during canonicalization.
      hold: "last",
      signature: {
        domain: ["FunctionOf", "Anything", "Anything", "Anything"],
        result: (ce, args) => {
          const op12 = args[0];
          const op22 = args[1];
          if (op12.string && asSmallInteger(op22) !== null)
            return ce.domain("Integers");
          if (op12.symbol) {
            const vh = op12.evaluate()?.head;
            if (vh) {
              const def = ce.lookupFunction(vh);
              if (def?.at)
                return void 0;
              return ce.domain("Symbols");
            }
          }
          return void 0;
        },
        canonical: (ce, args) => {
          const op12 = args[0];
          const op22 = args[1];
          if (op12.string) {
            const base = asSmallInteger(op22);
            if (base !== null && base > 1 && base <= 36) {
              const [value, rest] = fromDigits(op12.string, base);
              if (rest) {
                return ce.error(
                  ["unexpected-digit", { str: rest[0] }],
                  ["LatexString", ce.string(op12.string)]
                );
              }
              return ce.number(value);
            }
          }
          if (op12.symbol) {
            const vh = op12.evaluate()?.head;
            if (vh) {
              const def = ce.lookupFunction(vh);
              if (def?.at)
                return ce._fn("At", [op12.canonical, op22.canonical]);
            }
            const sub2 = op22.string ?? op22.symbol ?? asSmallInteger(op22)?.toString();
            if (sub2)
              return ce.symbol(op12.symbol + "_" + sub2);
          }
          if (op22.head === "Sequence")
            ce._fn("Subscript", [op12, ce._fn("List", op22.ops)]);
          return ce._fn("Subscript", args);
        }
      }
    },
    Symbol: {
      complexity: 500,
      description: "Construct a new symbol with a name formed by concatenating the arguments",
      threadable: true,
      hold: "all",
      signature: {
        domain: ["FunctionOf", ["VarArg", "Anything"], "Anything"],
        canonical: (ce, ops2) => {
          if (ops2.length === 0)
            return ce.Nothing;
          const arg = ops2.map(
            (x) => x.symbol ?? x.string ?? asSmallInteger(x)?.toString() ?? ""
          ).join("");
          if (arg.length > 0)
            return ce.symbol(arg);
          return ce.Nothing;
        }
        // Note: a `["Symbol"]` expression is never evaluated, it gets
        // transformed into something else (a symbol) during canonicalization
      }
    },
    Timing: {
      description: "`Timing(expr)` evaluates `expr` and return a `Pair` of the number of second elapsed for the evaluation, and the value of the evaluation",
      signature: {
        domain: [
          "FunctionOf",
          "Values",
          ["OptArg", "Integers"],
          ["TupleOf", "Values", "Numbers"]
        ],
        evaluate: (ce, ops2) => {
          if (ops2[1].symbol === "Nothing") {
            const start = globalThis.performance.now();
            const result2 = ops2[0].evaluate();
            const timing = 1e3 * (globalThis.performance.now() - start);
            return ce.pair(ce.number(timing), result2);
          }
          let n = Math.max(3, Math.round(asSmallInteger(ops2[1]) ?? 3));
          let timings = [];
          let result;
          while (n > 0) {
            const start = globalThis.performance.now();
            result = ops2[0].evaluate();
            timings.push(1e3 * (globalThis.performance.now() - start));
            n -= 1;
          }
          const max2 = Math.max(...timings);
          const min2 = Math.min(...timings);
          timings = timings.filter((x) => x > min2 && x < max2);
          const sum2 = timings.reduce((acc, v) => acc + v, 0);
          if (sum2 === 0)
            return ce.pair(ce.number(max2), result);
          return ce.pair(ce.number(sum2 / timings.length), result);
        }
      }
    }
    // {name: 'Pattern',},
  },
  //
  // LaTeX-related
  //
  {
    // Value preserving type conversion/tag indicating the string
    // is a LaTeX string
    LatexString: {
      inert: true,
      signature: { domain: ["FunctionOf", "Strings", "Strings"] }
    },
    // Serialize one or more expressions to LaTeX
    Latex: {
      signature: {
        domain: ["FunctionOf", ["VarArg", "Anything"], "Strings"],
        evaluate: (ce, ops2) => ce.fn("LatexString", [ce.string(joinLatex(ops2.map((x) => x.latex)))])
      }
    },
    Parse: {
      description: "Parse a LaTeX string and evaluate to a corresponding expression",
      signature: {
        domain: ["FunctionOf", "Anything", "Anything"],
        evaluate: (ce, ops2) => {
          if (ops2.length === 0)
            return ce.box(["Sequence"]);
          const op12 = ops2[0];
          const s = op12.string ?? op12.head === "LatexString" ? op12.op1.string : "";
          return ce.parse(s) ?? ce.box(["Sequence"]);
        }
      }
    }
  },
  {
    RandomExpression: {
      signature: {
        domain: "Functions",
        evaluate: (ce, _ops) => ce.box(randomExpression())
      }
    }
  }
];
function canonicalInvisibleOperator(ce, ops2) {
  if (ops2.length === 0)
    return null;
  const lhs = ops2[0];
  if (ops2.length === 1)
    return canonicalInvisibleOperator(ce, [lhs.canonical]);
  if (ops2.length === 2) {
    const lhsNumber = asFloat(lhs);
    if (lhsNumber !== null && Number.isInteger(lhsNumber)) {
      const rhs2 = ops2[1];
      if (rhs2.head === "Divide" || rhs2.head === "Rational") {
        const [n, d] = [asFloat(rhs2.op1), asFloat(rhs2.op2)];
        if (n !== null && d !== null && n > 0 && n <= 1e3 && d > 1 && d <= 1e3 && Number.isInteger(n) && Number.isInteger(d))
          return ce.add([lhs.canonical, rhs2.canonical]);
      }
    }
    let rhs = ops2[1];
    if (lhs.symbol && rhs.head === "Delimiter" && !ce.lookupSymbol(lhs.symbol)) {
      if (!ce.lookupFunction(lhs.symbol)) {
        ce.declare(lhs.symbol, "Functions");
      }
      if (rhs.nops === 0)
        return ce.box([lhs.symbol]);
      rhs = rhs.op1;
      if (rhs.head === "Sequence")
        return ce.box([lhs.symbol, ...ce.canonical(rhs.ops)]);
      return ce.box([lhs.symbol, rhs.canonical]);
    }
  }
  ops2 = canonical(flattenSequence(ops2));
  if (ops2.every(
    (x) => x.isValid && (!x.domain || x.domain.isNumeric || isIndexableCollection(x) && !x.string)
  ))
    return ce._fn("Multiply", flattenOps(ops2, "Multiply"));
  return ce._fn("Tuple", ops2);
}

// src/compute-engine/boxed-expression/canonical.ts
function canonicalForm(expr, forms) {
  if (forms === false)
    return expr;
  if (forms === true)
    return expr.canonical;
  if (typeof forms === "string")
    forms = [forms];
  for (const form of forms) {
    switch (form) {
      case "InvisibleOperator":
        expr = invisibleOperatorForm(expr);
        break;
      case "Number":
        expr = numberForm(expr);
        break;
      case "Multiply":
        expr = multiplyForm(expr);
        break;
      case "Add":
        expr = addForm(expr);
        break;
      case "Power":
        expr = powerForm(expr);
        break;
      case "Divide":
        expr = divideForm(expr);
        break;
      case "Flatten":
        expr = flattenForm(expr);
        break;
      case "Order":
        expr = canonicalOrder(expr, { recursive: true });
        break;
      default:
        throw Error("Invalid canonical form");
    }
  }
  return expr;
}
function flattenForm(expr) {
  if (!expr.ops)
    return expr;
  let ops2 = expr.ops.map(flattenForm);
  if (expr.head === "Delimiter")
    ops2 = [flattenDelimiter(expr.engine, expr.op1)];
  const ce = expr.engine;
  let isCommutative = expr.head === "Add" || expr.head === "Multiply";
  if (!isCommutative) {
    const def = ce.lookupFunction(expr.head);
    if (def?.commutative)
      isCommutative = true;
  }
  if (isCommutative && typeof expr.head === "string")
    expr = ce._fn(expr.head, flattenOps(ops2, expr.head));
  return expr;
}
function invisibleOperatorForm(expr) {
  if (!expr.ops)
    return expr;
  if (expr.head === "InvisibleOperator") {
    return canonicalInvisibleOperator(
      expr.engine,
      expr.ops.map(invisibleOperatorForm)
    ) ?? expr;
  }
  return expr.engine._fn(expr.head, expr.ops.map(invisibleOperatorForm));
}
function numberForm(expr) {
  if (expr.numericValue)
    return expr.canonical;
  if (expr.ops)
    return expr.engine._fn(expr.head, expr.ops.map(numberForm));
  return expr;
}
function multiplyForm(expr) {
  if (!expr.ops)
    return expr;
  const ops2 = expr.ops.map(multiplyForm);
  if (expr.head === "Multiply")
    return canonicalMultiply(expr.engine, ops2);
  if (expr.head === "Negate")
    return canonicalMultiply(expr.engine, [expr.op1, expr.engine.NegativeOne]);
  return expr;
}
function addForm(expr) {
  if (!expr.ops)
    return expr;
  const ops2 = expr.ops.map(addForm);
  if (expr.head === "Add")
    return canonicalAdd(expr.engine, ops2);
  if (expr.head === "Subtract")
    return expr.engine._fn("Add", [
      addForm(expr.op1),
      addForm(expr.engine.neg(expr.op2))
    ]);
  return expr.engine._fn(expr.head, ops2);
}
function powerForm(expr) {
  if (!expr.ops)
    return expr;
  if (expr.head === "Power")
    return canonicalPower(
      expr.engine,
      powerForm(expr.op1),
      powerForm(expr.op2)
    );
  if (!expr.ops)
    return expr;
  return expr.engine._fn(expr.head, expr.ops.map(powerForm));
}
function divideForm(expr) {
  if (expr.head === "Divide")
    return canonicalDivide(
      expr.engine,
      powerForm(expr.op1),
      powerForm(expr.op2)
    );
  if (!expr.ops)
    return expr;
  return expr.engine._fn(expr.head, expr.ops.map(divideForm));
}

// src/compute-engine/boxed-expression/box.ts
function boxNumber(ce, num, options) {
  if (typeof num === "number" || num instanceof Decimal)
    return new BoxedNumber(ce, num, options);
  options = options ? { ...options } : {};
  if (!("canonical" in options))
    options.canonical = true;
  if (Array.isArray(num) && num.length === 2 && num[0] instanceof Decimal && num[1] instanceof Decimal) {
    if (!num[0].isInteger() || !num[1].isInteger())
      throw new Error("Array argument to `boxNumber()` should be two integers");
    num = [bigint(num[0].toString()), bigint(num[1].toString())];
  }
  if (isRational(num)) {
    if (num.length !== 2)
      throw new Error(
        "Array argument to `boxNumber()` should be two integers or two bignums"
      );
    const [n, d] = num;
    if (typeof n === "bigint" && typeof d === "bigint") {
      if (n === d)
        return d === BigInt(0) ? ce.NaN : ce.One;
      if (n === BigInt(0))
        return ce.Zero;
      if (d === BigInt(1))
        return ce.number(n, options);
      if (d === BigInt(-1))
        return ce.number(-n, options);
      if (n === BigInt(1) && d === BigInt(2))
        return ce.Half;
      return new BoxedNumber(ce, [n, d], options);
    }
    if (typeof n !== "number" || typeof d !== "number")
      throw new Error(
        "Array argument to `boxNumber()` should be two integers or two bignums"
      );
    if (!Number.isInteger(n) || !Number.isInteger(d))
      throw new Error("Array argument to `boxNumber()` should be two integers");
    if (d === n)
      return d === 0 ? ce.NaN : ce.One;
    if (n === 0)
      return ce.Zero;
    if (d === 1)
      return ce.number(n, options);
    if (d === -1)
      return ce.number(-n, options);
    if (n === 1 && d === 2)
      return ce.Half;
    return new BoxedNumber(ce, [n, d], options);
  }
  if (num instanceof import_complex16.Complex) {
    if (num.isNaN())
      return ce.NaN;
    if (num.isZero())
      return ce.Zero;
    if (num.isInfinite())
      return ce.ComplexInfinity;
    if (ce.chop(num.im) === 0)
      return ce.number(num.re, options);
    return new BoxedNumber(ce, num, options);
  }
  let strNum = "";
  if (typeof num === "string")
    strNum = num;
  else if (typeof num === "object" && "num" in num) {
    if (typeof num.num === "number")
      return ce.number(num.num, options);
    if (typeof num.num !== "string")
      throw new Error("MathJSON `num` property should be a string of digits");
    strNum = num.num;
  }
  if (strNum) {
    strNum = strNum.toLowerCase();
    if (/[0-9][nd]$/.test(strNum))
      strNum = strNum.slice(0, -1);
    strNum = strNum.replace(/[\u0009-\u000d\u0020\u00a0]/g, "");
    if (strNum === "nan")
      return ce.NaN;
    if (strNum === "infinity" || strNum === "+infinity")
      return ce.PositiveInfinity;
    if (strNum === "-infinity")
      return ce.NegativeInfinity;
    if (strNum === "0")
      return ce.Zero;
    if (strNum === "1")
      return ce.One;
    if (strNum === "-1")
      return ce.NegativeOne;
    if (/\([0-9]+\)/.test(strNum)) {
      const [_, body, repeat, trail] = strNum.match(/(.+)\(([0-9]+)\)(.+)?$/) ?? [];
      strNum = body + repeat.repeat(Math.ceil(ce.precision / repeat.length)) + (trail ?? "");
    }
    return boxNumber(ce, ce.bignum(strNum), options);
  }
  return null;
}
function boxHold(ce, expr, options) {
  if (expr === null)
    return ce.error("missing");
  if (typeof expr === "object" && expr instanceof _BoxedExpression)
    return expr;
  expr = missingIfEmpty(expr);
  if (typeof expr === "string")
    return box(ce, expr, options);
  if (Array.isArray(expr)) {
    const boxed = expr.map((x) => boxHold(ce, x, options));
    return new BoxedFunction(ce, boxed[0], boxed.slice(1));
  }
  if (typeof expr === "object") {
    if ("dict" in expr)
      return new BoxedDictionary(ce, expr.dict);
    if ("fn" in expr)
      return boxHold(ce, expr.fn, options);
    if ("str" in expr)
      return new BoxedString(ce, expr.str);
    if ("sym" in expr)
      return box(ce, expr.sym, options);
    if ("num" in expr)
      return box(ce, expr.num, options);
  }
  return box(ce, expr, options);
}
function boxFunction(ce, head2, ops2, options) {
  if (head2 === "Hold") {
    return new BoxedFunction(ce, "Hold", [boxHold(ce, ops2[0], options)], {
      ...options,
      canonical: true
    });
  }
  if (head2 === "Error" || head2 === "ErrorCode") {
    return ce._fn(
      head2,
      ops2.map((x) => ce.box(x, { canonical: false })),
      options.metadata
    );
  }
  if (head2 === "Domain")
    return ce.domain(ops2[0], options.metadata);
  if (head2 === "Number" && ops2.length === 1)
    return box(ce, ops2[0], options);
  if (head2 === "String") {
    if (ops2.length === 0)
      return new BoxedString(ce, "", options.metadata);
    return new BoxedString(
      ce,
      ops2.map((x) => asString(x) ?? "").join(""),
      options.metadata
    );
  }
  if (head2 === "Symbol" && ops2.length > 0) {
    return ce.symbol(ops2.map((x) => asString(x) ?? "").join(""), options);
  }
  if (options.canonical && (head2 === "Divide" || head2 === "Rational") && ops2.length === 2) {
    if (ops2[0] instanceof _BoxedExpression && ops2[1] instanceof _BoxedExpression) {
      if (ce.numericMode === "machine") {
        const [fn, fd] = [asFloat(ops2[0]), asFloat(ops2[1])];
        if (fn !== null && Number.isInteger(fn) && fd !== null && Number.isInteger(fd))
          return ce.number([fn, fd], options);
      }
      const [n, d] = [asBigint(ops2[0]), asBigint(ops2[1])];
      if (n !== null && d !== null)
        return ce.number([n, d], options);
    } else {
      const [n, d] = [
        bigintValue(ce, ops2[0]),
        bigintValue(ce, ops2[1])
      ];
      if (n !== null && d !== null)
        return ce.number([n, d], options);
    }
    head2 = "Divide";
  }
  if (options.canonical && head2 === "Complex") {
    if (ops2.length === 1) {
      const op12 = box(ce, ops2[0], options);
      const im = asFloat(op12);
      if (im !== null && im !== 0)
        return ce.number(ce.complex(0, im), options);
      return ce.mul([op12, ce.I]);
    }
    if (ops2.length === 2) {
      const op12 = box(ce, ops2[0], options);
      const op22 = box(ce, ops2[1], options);
      const re = asFloat(op12);
      const im = asFloat(op22);
      if (im !== null && re !== null) {
        if (im === 0 && re === 0)
          return ce.Zero;
        if (im !== null && im !== 0)
          return ce.number(ce.complex(re, im), options);
        return op12;
      }
      return ce.add([op12, ce.mul([op22, ce.I])], options.metadata);
    }
  }
  if (options.canonical && head2 === "Negate" && ops2.length === 1) {
    const op12 = ops2[0];
    if (typeof op12 === "number")
      return ce.number(-op12, options);
    if (op12 instanceof Decimal)
      return ce.number(op12.neg(), options);
    const num = ce.box(op12, options).numericValue;
    if (num !== null) {
      if (typeof num === "number")
        return ce.number(-num, options);
      if (num instanceof Decimal)
        return ce.number(num.neg(), options);
      if (num instanceof import_complex16.Complex)
        return ce.number(num.neg());
      if (isRational(num))
        return ce.number(neg(num));
    }
  }
  if (head2 === "Dictionary") {
    const dict = {};
    for (const op3 of ops2) {
      const arg = ce.box(op3, { canonical: options.canonical });
      const head3 = arg.head;
      if (head3 === "KeyValuePair" || head3 === "Pair" || head3 === "Tuple" && arg.nops === 2) {
        const key = arg.op1;
        if (key.isValid && !key.isNothing) {
          const value = arg.op2;
          let k = key.symbol ?? key.string;
          if (!k && (key.numericValue !== null || key.string)) {
            const n = typeof key.numericValue === "number" ? key.numericValue : asSmallInteger(key);
            if (n && Number.isFinite(n) && Number.isInteger(n))
              k = n.toString();
          }
          if (k)
            dict[k] = value;
        }
      }
    }
    return new BoxedDictionary(ce, dict, options);
  }
  if (head2 === "List" && options.canonical) {
    const boxedOps = ops2.map((x) => box(ce, x));
    const { shape, dtype } = expressionTensorInfo("List", boxedOps) ?? {};
    if (dtype && shape)
      return new BoxedTensor(ce, { head: head2, ops: boxedOps });
    return ce._fn(head2, boxedOps);
  }
  if (options.canonical)
    return makeCanonicalFunction(ce, head2, ops2, options.metadata);
  return new BoxedFunction(
    ce,
    head2,
    ops2.map((x) => box(ce, x, { canonical: false })),
    options
  );
}
function box(ce, expr, options) {
  if (expr === null || expr === void 0)
    return ce._fn("Sequence", []);
  if (expr instanceof _BoxedExpression)
    return canonicalForm(expr, options?.canonical ?? true);
  options = options ? { ...options } : {};
  if (!("canonical" in options))
    options.canonical = true;
  const canonical2 = options.canonical === true;
  if (Array.isArray(expr)) {
    if (isMachineRational(expr)) {
      if (Number.isInteger(expr[0]) && Number.isInteger(expr[1]))
        return ce.number(expr);
      return canonicalForm(
        boxFunction(ce, "Divide", expr, { canonical: canonical2 }),
        options.canonical
      );
    }
    if (isBigRational(expr))
      return ce.number(expr);
    if (typeof expr[0] === "string")
      return canonicalForm(
        boxFunction(ce, expr[0], expr.slice(1), { canonical: canonical2 }),
        options.canonical
      );
    console.assert(Array.isArray(expr[0]));
    const ops2 = expr.slice(1).map((x) => box(ce, x, options));
    const head2 = box(ce, expr[0], { canonical: false });
    return canonicalForm(new BoxedFunction(ce, head2, ops2), options.canonical);
  }
  if (typeof expr === "number" || expr instanceof import_complex16.Complex || expr instanceof Decimal)
    return ce.number(expr);
  if (typeof expr === "string") {
    if (expr.startsWith("'") && expr.endsWith("'"))
      return new BoxedString(ce, expr.slice(1, -1));
    if (/^[+-]?[0-9]/.test(expr))
      return ce.number(expr);
    if (isDomainLiteral(expr))
      return ce.domain(expr);
    if (!isValidIdentifier(expr))
      return ce.error("invalid-identifier", { str: expr });
    return ce.symbol(expr, { canonical: canonical2 });
  }
  if (typeof expr === "object") {
    const metadata = {
      latex: expr.latex,
      wikidata: expr.wikidata
    };
    if ("dict" in expr)
      return canonicalForm(
        new BoxedDictionary(ce, expr.dict, { canonical: true, metadata }),
        options.canonical
      );
    if ("fn" in expr) {
      if (typeof expr.fn[0] === "string")
        return canonicalForm(
          boxFunction(ce, expr.fn[0], expr.fn.slice(1), { canonical: canonical2 }),
          options.canonical
        );
      return canonicalForm(
        new BoxedFunction(
          ce,
          box(ce, expr.fn[0], options),
          expr.fn.slice(1).map((x) => box(ce, x, options)),
          { metadata }
        ),
        options.canonical
      );
    }
    if ("str" in expr)
      return new BoxedString(ce, expr.str, metadata);
    if ("sym" in expr)
      return ce.symbol(expr.sym, { canonical: canonical2 });
    if ("num" in expr)
      return ce.number(expr, { canonical: canonical2 });
  }
  return ce.symbol("Undefined");
}
function asString(expr) {
  if (typeof expr === "string")
    return expr;
  if (expr instanceof _BoxedExpression) {
    return expr.string ?? expr.symbol ?? expr.toString();
  }
  if (typeof expr === "object") {
    if ("str" in expr)
      return expr.str;
    if ("fn" in expr && expr.fn[0] === "String" && typeof expr.fn[1] === "string")
      return expr.fn[1];
  }
  if (Array.isArray(expr)) {
    if (expr[0] === "String" && typeof expr[1] === "string")
      return expr[1];
  }
  return null;
}

// src/compute-engine/library/arithmetic.ts
var import_complex17 = __toESM(require_complex(), 1);

// src/compute-engine/numerics/numeric-complex.ts
function gamma3(c) {
  return c;
}
function gammaln3(c) {
  return c;
}

// src/compute-engine/library/arithmetic.ts
var ARITHMETIC_LIBRARY = [
  {
    //
    // Functions
    //
    Abs: {
      wikidata: "Q3317982",
      // magnitude 'Q120812 (for reals)
      threadable: true,
      idempotent: true,
      complexity: 1200,
      signature: {
        domain: ["FunctionOf", "Numbers", "NonNegativeNumbers"],
        simplify: (ce, ops2) => processAbs(ce, ops2[0], "simplify"),
        evaluate: (ce, ops2) => processAbs(ce, ops2[0], "evaluate"),
        N: (ce, ops2) => processAbs(ce, ops2[0], "N")
      }
    },
    Add: {
      wikidata: "Q32043",
      associative: true,
      commutative: true,
      threadable: true,
      idempotent: true,
      complexity: 1300,
      hold: "all",
      signature: {
        domain: "NumericFunctions",
        result: (ce, args) => domainAdd(
          ce,
          args.map((x) => x.domain)
        ),
        // canonical: (ce, args) => canonicalAdd(ce, args), // never called: shortpath
        simplify: (ce, ops2) => simplifyAdd(ce, ops2),
        evaluate: (ce, ops2) => evalAdd(ce, ops2),
        N: (ce, ops2) => evalAdd(ce, ops2, "N")
      }
    },
    Ceil: {
      description: "Rounds a number up to the next largest integer",
      complexity: 1250,
      threadable: true,
      signature: {
        domain: ["FunctionOf", "Numbers", "Integers"],
        evaluate: (_ce, ops2) => applyN(
          ops2[0],
          Math.ceil,
          (x) => x.ceil(),
          (z) => z.ceil(0)
        )
      }
    },
    Chop: {
      associative: true,
      threadable: true,
      idempotent: true,
      complexity: 1200,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        evaluate: (ce, ops2) => applyN(
          ops2[0],
          (x) => ce.chop(x),
          (x) => ce.chop(x),
          (x) => ce.chop(x)
        )
      }
    },
    // Complex: {
    //   // This function is converted during boxing, so unlikely to encounter
    //   wikidata: 'Q11567',
    //   complexity: 500,
    // },
    Divide: {
      wikidata: "Q1226939",
      complexity: 2500,
      threadable: true,
      // - if numer product of numbers, or denom product of numbers,
      // i.e. √2x/2 -> 0.707x, 2/√2x -> 1.4142x
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers", "Numbers"],
        canonical: (ce, args) => {
          args = checkNumericArgs(ce, args, 2);
          if (args.length !== 2)
            return ce._fn("Divide", args);
          const [numer, denom] = args;
          return ce.div(numer, denom);
        },
        simplify: (ce, args) => simplifyDivide(ce, args[0], args[1]),
        evaluate: (_ce, ops2) => apply2N(
          ops2[0],
          ops2[1],
          (n, d) => n / d,
          (n, d) => n.div(d),
          (n, d) => n.div(d)
        )
      }
    },
    Exp: {
      wikidata: "Q168698",
      threadable: true,
      complexity: 3500,
      // Exp(x) -> e^x
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        canonical: (ce, args) => {
          args = checkNumericArgs(ce, args, 1);
          if (args.length !== 1)
            return ce._fn("Power", [ce.E, ...args]);
          return ce.pow(ce.E, args[0]);
        }
      }
    },
    Factorial: {
      description: "Factorial Function",
      wikidata: "Q120976",
      threadable: true,
      complexity: 9e3,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        canonical: (ce, args) => {
          const base = args[0];
          if (base instanceof BoxedNumber && base.isNegative)
            return ce.neg(ce._fn("Factorial", [ce.neg(base)]));
          return ce._fn("Factorial", [base]);
        },
        evaluate: (ce, ops2) => {
          const n = asSmallInteger(ops2[0]);
          if (n !== null && n >= 0) {
            if (!bignumPreferred(ce))
              return ce.number(factorial(n));
            return ce.number(factorial3(ce, ce.bignum(n)));
          }
          const num = ops2[0].numericValue;
          if (num !== null && num instanceof import_complex17.Complex)
            return ce.number(gamma3(num.add(1)));
          const f = asFloat(ops2[0]);
          if (f !== null)
            return ce.number(gamma(1 + f));
          return void 0;
        }
      }
    },
    Factorial2: {
      description: "Double Factorial Function",
      complexity: 9e3,
      threadable: true,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        evaluate: (ce, ops2) => {
          const n = asSmallInteger(ops2[0]);
          if (n === null)
            return void 0;
          if (bignumPreferred(ce))
            return ce.number(factorial22(ce, ce.bignum(n)));
          return ce.number(factorial2(n));
        }
      }
    },
    Floor: {
      wikidata: "Q56860783",
      complexity: 1250,
      threadable: true,
      signature: {
        domain: ["FunctionOf", "Numbers", "ExtendedRealNumbers"],
        evaluate: (ce, ops2) => applyN(
          ops2[0],
          Math.floor,
          (x) => x.floor(),
          (z) => z.floor(0)
        )
      }
    },
    Gamma: {
      wikidata: "Q190573",
      complexity: 8e3,
      threadable: true,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        N: (ce, ops2) => applyN(
          ops2[0],
          (x) => gamma(x),
          (x) => gamma2(ce, x),
          (x) => gamma3(x)
        )
      }
    },
    GammaLn: {
      complexity: 8e3,
      threadable: true,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        N: (ce, ops2) => applyN(
          ops2[0],
          (x) => gammaln(x),
          (x) => gammaln2(ce, x),
          (x) => gammaln3(x)
        )
      }
    },
    Ln: {
      description: "Natural Logarithm",
      wikidata: "Q204037",
      complexity: 4e3,
      threadable: true,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        N: (ce, ops2) => applyN(
          ops2[0],
          (x) => x >= 0 ? Math.log(x) : ce.complex(x).log(),
          (x) => !x.isNeg() ? x.ln() : ce.complex(x.toNumber()).log(),
          (z) => z.log()
        )
      }
    },
    Log: {
      description: "Log(z, b = 10) = Logarithm of base b",
      wikidata: "Q11197",
      complexity: 4100,
      threadable: true,
      signature: {
        domain: ["FunctionOf", "Numbers", ["OptArg", "Numbers"], "Numbers"],
        canonical: (ce, ops2) => {
          if (ops2.length === 1)
            return ce._fn("Log", [checkDomain(ce, ops2[0], "Numbers")]);
          ops2 = checkNumericArgs(ce, ops2, 2);
          if (ops2.length !== 2)
            return ce._fn("Log", ops2);
          const [arg, base] = ops2;
          if (base.numericValue === 10)
            return ce._fn("Log", [arg]);
          return ce._fn("Log", [arg, base]);
        },
        N: (ce, ops2) => {
          if (ops2[1] === void 0)
            return applyN(
              ops2[0],
              (x) => x >= 0 ? Math.log10(x) : ce.complex(x).log().div(Math.LN10),
              (x) => !x.isNeg() ? Decimal.log10(x) : ce.complex(x.toNumber()).log().div(Math.LN10),
              (z) => z.log().div(Math.LN10)
            );
          return apply2N(
            ops2[0],
            ops2[1],
            (a, b) => Math.log(a) / Math.log(b),
            (a, b) => a.log(b),
            (a, b) => a.log().div(typeof b === "number" ? Math.log(b) : b.log())
          );
        }
      }
    },
    Lb: {
      description: "Base-2 Logarithm",
      wikidata: "Q581168",
      complexity: 4100,
      threadable: true,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        N: (ce, ops2) => applyN(
          ops2[0],
          (x) => x >= 0 ? Math.log2(x) : ce.complex(x).log().div(Math.LN2),
          (x) => x.isNeg() ? Decimal.log10(x) : ce.complex(x.toNumber()).log().div(Math.LN2),
          (z) => z.log().div(Math.LN2)
        )
      }
    },
    Lg: {
      description: "Base-10 Logarithm",
      wikidata: "Q966582",
      complexity: 4100,
      threadable: true,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        N: (ce, ops2) => applyN(
          ops2[0],
          (x) => x >= 0 ? Math.log10(x) : ce.complex(x).log().div(Math.LN10),
          (x) => !x.isNeg() ? Decimal.log10(x) : ce.complex(x.toNumber()).log().div(Math.LN10),
          (z) => z.log().div(Math.LN10)
        )
      }
    },
    Mod: {
      description: "Modulo",
      wikidata: "Q1799665",
      complexity: 2500,
      threadable: true,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers", "Numbers"],
        evaluate: (ce, ops2) => {
          if (ops2.length !== 2)
            return void 0;
          const [lhs, rhs] = ops2;
          const nLhs = lhs.value;
          const nRhs = rhs.value;
          if (typeof nLhs !== "number")
            return void 0;
          if (typeof nRhs !== "number")
            return void 0;
          return ce.number((nLhs % nRhs + nRhs) % nRhs);
        }
      }
    },
    Multiply: {
      wikidata: "Q40276",
      associative: true,
      commutative: true,
      idempotent: true,
      complexity: 2100,
      hold: "all",
      threadable: true,
      signature: {
        domain: "NumericFunctions",
        // Never called: fastpath
        // canonical: (ce, args) => canonicalMultiply(ce, args)
        //
        simplify: (ce, ops2) => simplifyMultiply(ce, ops2),
        evaluate: (ce, ops2) => evalMultiply(ce, ops2),
        N: (ce, ops2) => evalMultiply(ce, ops2, "N")
      }
    },
    Negate: {
      description: "Additive Inverse",
      wikidata: "Q715358",
      complexity: 2e3,
      threadable: true,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        result: (ce, args) => {
          const arg = args[0].domain;
          if (!arg?.base)
            return arg;
          const negDomain = {
            PositiveNumbers: "NegativeNumbers",
            NonNegativeNumbers: "NonPositiveNumbers",
            NonPositiveNumbers: "NonNegativeNumbers",
            NegativeNumbers: "PositiveNumbers",
            PositiveIntegers: "NegativeIntegers",
            NonNegativeIntegers: "NonPositiveIntegers",
            NonPositiveIntegers: "NonNegativeIntegers",
            NegativeIntegers: "PositiveIntegers"
          }[arg.base];
          if (negDomain)
            return ce.domain(negDomain);
          return arg;
        },
        canonical: (ce, args) => {
          args = checkNumericArgs(ce, args);
          if (args.length !== 1)
            return ce._fn("Negate", args);
          return ce.neg(args[0]);
        },
        simplify: (ce, ops2) => processNegate(ce, ops2[0], "simplify"),
        evaluate: (ce, ops2) => processNegate(ce, ops2[0], "evaluate"),
        N: (ce, ops2) => processNegate(ce, ops2[0], "N"),
        sgn: (_ce, args) => {
          const s = args[0].sgn;
          if (s === void 0 || s === null)
            return void 0;
          if (s === 0)
            return 0;
          if (s > 0)
            return -1;
          if (s < 0)
            return 1;
          return void 0;
        }
      }
    },
    PlusMinus: {
      description: "Plus or Minus",
      wikidata: "Q120812",
      complexity: 1200,
      involution: true,
      signature: {
        domain: ["FunctionOf", "Values", "Tuples"],
        evaluate: (ce, ops2) => {
          if (ops2.length !== 1)
            return void 0;
          return ce.fn("Pair", [ops2[0], ce.neg(ops2[0])]);
        }
      }
    },
    Power: {
      wikidata: "Q33456",
      commutative: false,
      threadable: true,
      complexity: 3500,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers", "Numbers"],
        canonical: (ce, args) => {
          args = checkNumericArgs(ce, args, 2);
          if (args.length !== 2)
            return ce._fn("Power", args);
          const [base, exp2] = args;
          if (base instanceof BoxedNumber && base.isNegative)
            return ce.neg(ce.pow(base, exp2));
          return ce.pow(base, exp2);
        },
        simplify: (ce, ops2) => processPower(ce, ops2[0], ops2[1], "simplify"),
        evaluate: (ce, ops2) => processPower(ce, ops2[0], ops2[1], "evaluate"),
        N: (ce, ops2) => {
          if (ce.numericMode === "machine" && typeof ops2[0].numericValue === "number" && typeof ops2[1].numericValue === "number")
            return ce.number(
              Math.pow(ops2[0].numericValue, ops2[1].numericValue)
            );
          return processPower(ce, ops2[0], ops2[1], "N");
        }
        // Defined as RealNumbers for all power in RealNumbers when base > 0;
        // when x < 0, only defined if n is an integer
        // if x is a non-zero complex, defined as ComplexNumbers
        // Square root of a prime is irrational (AlgebraicNumbers)
        // https://proofwiki.org/wiki/Square_Root_of_Prime_is_Irrational
        // evalDomain: (ce, base: BoxedExpression, power: BoxedExpression) ;
      }
    },
    Rational: {
      complexity: 2400,
      signature: {
        domain: [
          "FunctionOf",
          "Numbers",
          ["OptArg", "Numbers"],
          "RationalNumbers"
        ],
        canonical: (ce, args) => {
          args = canonical(flattenSequence(args));
          if (args.length === 0)
            return ce._fn("Rational", [ce.error("missing")]);
          if (args.length === 1)
            return ce._fn("Rational", [
              checkDomain(ce, args[0], "ExtendedRealNumbers")
            ]);
          args = checkDomains(ce, args, ["Integers", "Integers"]);
          if (args.length !== 2 || !args[0].isValid || !args[1].isValid)
            return ce._fn("Rational", args);
          return ce.div(args[0], args[1]);
        },
        simplify: (ce, ops2) => {
          if (ops2.length !== 2)
            return void 0;
          return simplifyDivide(ce, ops2[0], ops2[1]);
        },
        evaluate: (ce, ops2) => {
          if (ops2.length === 2) {
            const [n, d] = [asSmallInteger(ops2[0]), asSmallInteger(ops2[1])];
            if (n !== null && d !== null)
              return ce.number([n, d]);
            return void 0;
          }
          const f = asFloat(ops2[0].N());
          if (f === null)
            return void 0;
          return ce.number(rationalize(f));
        },
        N: (ce, ops2) => {
          if (ops2.length === 1)
            return ops2[0];
          return apply2N(
            ops2[0],
            ops2[1],
            (a, b) => a / b,
            (a, b) => a.div(b),
            (a, b) => a.div(b)
          );
        }
      }
    },
    Root: {
      complexity: 3200,
      threadable: true,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers", "Numbers"],
        canonical: (ce, args) => {
          args = checkNumericArgs(ce, args, 2);
          const [base, exp2] = args;
          if (args.length !== 2 || !base.isValid || !exp2.isValid)
            return ce._fn("Root", args);
          return ce.pow(base, ce.inv(exp2));
        }
      }
    },
    Round: {
      complexity: 1250,
      threadable: true,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        evaluate: (ce, ops2) => applyN(
          ops2[0],
          Math.round,
          (x) => x.round(),
          (x) => x.round(0)
        )
      }
    },
    Sign: {
      complexity: 1200,
      threadable: true,
      signature: {
        domain: ["FunctionOf", "Numbers", "Integers"],
        simplify: (ce, ops2) => {
          const s = ops2[0].sgn;
          if (s === 0)
            return ce.Zero;
          if (s === 1)
            return ce.One;
          if (s === -1)
            return ce.NegativeOne;
          return void 0;
        },
        evaluate: (ce, ops2) => {
          const s = ops2[0].sgn;
          if (s === 0)
            return ce.Zero;
          if (s === 1)
            return ce.One;
          if (s === -1)
            return ce.NegativeOne;
          return void 0;
        },
        N: (ce, ops2) => {
          const s = ops2[0].sgn;
          if (s === 0)
            return ce.Zero;
          if (s === 1)
            return ce.One;
          if (s === -1)
            return ce.NegativeOne;
          return void 0;
        }
      }
    },
    // {% def "GammaSgn" %}
    // [&quot;**GammaSgn**&quot;, _z_]{.signature}
    // {% latex "\\operatorname{sgn}(\\gamma(z))" %}
    // The gamma function can be computed as \\( \operatorname{sgn}\Gamma(x) \cdot
    // \expoentialE^{\operatorname{LogGamma}(x)} \\)
    // `["Multiply", ["GammaSgn", "x"], ["Exp", ["LogGamma", "x"]]]`.
    // This function is called `gammasgn` in SciPy.
    // **Reference**
    // - NIST: https://dlmf.nist.gov/5.2#E1
    // {% enddef %}
    //     GammaSgn: {
    //   description: 'The sign of the gamma function: -1 or +1',
    //   complexity: 7900,
    //   signature: {
    //     domain: ['FunctionOf', 'Numbers', ['Range', -1, 1]],
    //     evaluate: (ce, ops) => {
    //     },
    //   },
    //   // @todo
    // },
    Sqrt: {
      description: "Square Root",
      wikidata: "Q134237",
      complexity: 3e3,
      threadable: true,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        canonical: (ce, args) => {
          args = canonical(flattenSequence(args));
          if (args.length !== 1)
            return ce._fn("Sqrt", args);
          return ce.pow(args[0], ce.Half);
        },
        simplify: (ce, ops2) => processSqrt(ce, ops2[0], "simplify"),
        evaluate: (ce, ops2) => processSqrt(ce, ops2[0], "evaluate"),
        N: (ce, ops2) => processSqrt(ce, ops2[0], "N")
        // evalDomain: Square root of a prime is irrational
        // https://proofwiki.org/wiki/Square_Root_of_Prime_is_Irrational
      }
    },
    Square: {
      wikidata: "Q3075175",
      complexity: 3100,
      threadable: true,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        canonical: (ce, args) => {
          args = canonical(flattenSequence(args));
          if (args.length !== 1)
            return ce._fn("Square", args);
          return ce.pow(args[0], ce.number(2));
        }
      }
    },
    Subtract: {
      wikidata: "Q40754",
      complexity: 1350,
      threadable: true,
      signature: {
        domain: ["FunctionOf", "Numbers", ["OptArg", "Numbers"], "Numbers"],
        canonical: (ce, args) => {
          if (args.length === 1) {
            const x = checkDomain(ce, args[0], "Numbers");
            if (x.isValid)
              return ce.neg(x);
          }
          args = checkNumericArgs(ce, args, 2);
          const [a, b] = args;
          if (args.length !== 2 || !a.isValid || !b.isValid)
            return ce._fn("Subtract", args);
          return ce.add([a, ce.neg(b)]);
        }
      }
    }
  },
  {
    //
    // Constants
    // Note: constants are put in a separate, subsequent, dictionary because
    // some of the values (CatalanConstant) reference some function names (Add...)
    // that are defined above. This avoid circular references.
    //
    e: {
      domain: "TranscendentalNumbers",
      constant: true,
      holdUntil: "never",
      value: "ExponentialE"
    },
    i: {
      domain: "ImaginaryNumbers",
      constant: true,
      holdUntil: "never",
      flags: { imaginary: true },
      value: "ImaginaryUnit"
    },
    MachineEpsilon: {
      /**
       * The difference between 1 and the next larger floating point number
       *
       *    2^{−52}
       *
       * See https://en.wikipedia.org/wiki/Machine_epsilon
       */
      domain: "RealNumbers",
      holdUntil: "N",
      constant: true,
      flags: { real: true },
      value: { num: Number.EPSILON.toString() }
    },
    Half: {
      domain: "RationalNumbers",
      constant: true,
      holdUntil: "evaluate",
      value: ["Rational", 1, 2]
    },
    ImaginaryUnit: {
      domain: "ImaginaryNumbers",
      constant: true,
      holdUntil: "evaluate",
      wikidata: "Q193796",
      flags: { imaginary: true },
      value: ["Complex", 0, 1]
    },
    ExponentialE: {
      domain: "TranscendentalNumbers",
      flags: { algebraic: false, real: true },
      wikidata: "Q82435",
      constant: true,
      holdUntil: "N",
      value: (engine) => bignumPreferred(engine) ? engine._BIGNUM_ONE.exp() : Math.exp(1)
    },
    GoldenRatio: {
      domain: "AlgebraicNumbers",
      wikidata: "Q41690",
      constant: true,
      flags: { algebraic: true },
      holdUntil: "simplify",
      value: ["Divide", ["Add", 1, ["Sqrt", 5]], 2]
    },
    CatalanConstant: {
      domain: "RealNumbers",
      flags: { algebraic: void 0 },
      // Not proven irrational or transcendental
      wikidata: "Q855282",
      constant: true,
      holdUntil: "N",
      value: {
        // From http://www.fullbooks.com/Miscellaneous-Mathematical-Constants1.html
        num: `0.91596559417721901505460351493238411077414937428167
                  21342664981196217630197762547694793565129261151062
                  48574422619196199579035898803325859059431594737481
                  15840699533202877331946051903872747816408786590902
                  47064841521630002287276409423882599577415088163974
                  70252482011560707644883807873370489900864775113225
                  99713434074854075532307685653357680958352602193823
                  23950800720680355761048235733942319149829836189977
                  06903640418086217941101917532743149978233976105512
                  24779530324875371878665828082360570225594194818097
                  53509711315712615804242723636439850017382875977976
                  53068370092980873887495610893659771940968726844441
                  66804621624339864838916280448281506273022742073884
                  31172218272190472255870531908685735423498539498309
                  91911596738846450861515249962423704374517773723517
                  75440708538464401321748392999947572446199754961975
                  87064007474870701490937678873045869979860644874974
                  64387206238513712392736304998503539223928787979063
                  36440323547845358519277777872709060830319943013323
                  16712476158709792455479119092126201854803963934243
                  `
      }
    },
    EulerGamma: {
      // From http://www.fullbooks.com/Miscellaneous-Mathematical-Constants2.html
      domain: "RealNumbers",
      flags: { algebraic: void 0 },
      // Not proven irrational or transcendental
      wikidata: "Q273023",
      holdUntil: "N",
      constant: true,
      value: {
        num: `0.57721566490153286060651209008240243104215933593992359880576723488486772677766
          467093694706329174674951463144724980708248096050401448654283622417399764492353
          625350033374293733773767394279259525824709491600873520394816567085323315177661
          152862119950150798479374508570574002992135478614669402960432542151905877553526
          733139925401296742051375413954911168510280798423487758720503843109399736137255
          306088933126760017247953783675927135157722610273492913940798430103417771778088
          154957066107501016191663340152278935867965497252036212879226555953669628176388
          792726801324310104765059637039473949576389065729679296010090151251959509222435
          014093498712282479497471956469763185066761290638110518241974448678363808617494
          551698927923018773910729457815543160050021828440960537724342032854783670151773
          943987003023703395183286900015581939880427074115422278197165230110735658339673`
      }
    }
  },
  {
    PreIncrement: {
      signature: { domain: ["FunctionOf", "Numbers", "Numbers"] }
    },
    PreDecrement: {
      signature: { domain: ["FunctionOf", "Numbers", "Numbers"] }
    }
  },
  {
    GCD: {
      description: "Greatest Common Divisor",
      complexity: 1200,
      threadable: false,
      // The function take a variable number of arguments,
      // including collections
      signature: {
        domain: ["FunctionOf", ["VarArg", "Anything"], "Numbers"],
        evaluate: (ce, ops2) => processGcdLcm(ce, ops2, "GCD")
      }
    },
    LCM: {
      description: "Least Common Multiple",
      complexity: 1200,
      threadable: false,
      // The function take a variable number of arguments,
      // including collections
      signature: {
        domain: ["FunctionOf", ["VarArg", "Anything"], "Numbers"],
        evaluate: (ce, ops2) => processGcdLcm(ce, ops2, "LCM")
      }
    },
    Numerator: {
      description: "Numerator of an expression",
      complexity: 1200,
      threadable: true,
      hold: "all",
      signature: {
        domain: ["FunctionOf", "Anything", "Numbers"],
        canonical: (ce, ops2) => {
          if (ops2.length === 0)
            return ce.box(["Sequence"]);
          const op3 = ops2[0];
          if (op3.head === "Rational" || op3.head === "Divide")
            return op3.op1;
          const num = asRational(op3);
          if (num !== void 0)
            return ce.number(num[0]);
          return ce._fn("Numerator", canonical(ops2));
        },
        evaluate: (ce, ops2) => {
          if (ops2.length === 0)
            return ce.box(["Sequence"]);
          const op3 = ops2[0];
          if (op3.head === "Rational" || op3.head === "Divide")
            return op3.op1;
          const num = asRational(op3);
          if (num !== void 0)
            return ce.number(num[0]);
          return ce._fn("Numerator", canonical(ops2));
        }
      }
    },
    Denominator: {
      description: "Denominator of an expression",
      complexity: 1200,
      threadable: true,
      hold: "all",
      signature: {
        domain: ["FunctionOf", "Anything", "Numbers"],
        canonical: (ce, ops2) => {
          if (ops2.length === 0)
            return ce.box(["Sequence"]);
          const op3 = ops2[0];
          if (op3.head === "Rational" || op3.head === "Divide")
            return op3.op2;
          const num = asRational(op3);
          if (num !== void 0)
            return ce.number(num[1]);
          return ce._fn("Denominator", canonical(ops2));
        },
        evaluate: (ce, ops2) => {
          if (ops2.length === 0)
            return ce.box(["Sequence"]);
          const op3 = ops2[0];
          if (op3.head === "Rational" || op3.head === "Divide")
            return op3.op2;
          const num = asRational(op3);
          if (num !== void 0)
            return ce.number(num[1]);
          return ce._fn("Denominator", canonical(ops2));
        }
      }
    },
    NumeratorDenominator: {
      description: "Sequence of Numerator and Denominator of an expression",
      complexity: 1200,
      threadable: true,
      hold: "all",
      signature: {
        domain: ["FunctionOf", "Anything", "Anything"],
        canonical: (ce, ops2) => {
          if (ops2.length === 0)
            return ce.box(["Sequence"]);
          const op3 = ops2[0];
          if (op3.head === "Rational" || op3.head === "Divide")
            return ce._fn("Sequence", op3.ops);
          const num = asRational(op3);
          if (num !== void 0)
            return ce._fn("Sequence", [ce.number(num[0]), ce.number(num[1])]);
          return ce._fn("NumeratorDenominator", canonical(ops2));
        },
        evaluate: (ce, ops2) => {
          if (ops2.length === 0)
            return ce.box(["Sequence"]);
          const op3 = ops2[0];
          if (op3.head === "Rational" || op3.head === "Divide")
            return ce._fn("Sequence", op3.ops);
          const num = asRational(op3);
          if (num !== void 0)
            return ce._fn("Sequence", [ce.number(num[0]), ce.number(num[1])]);
          return ce._fn("NumeratorDenominator", canonical(ops2));
        }
      }
    }
  },
  //
  // Arithmetic on collections: Min, Max, Sum, Product
  //
  {
    Max: {
      description: "Maximum of two or more numbers",
      complexity: 1200,
      threadable: false,
      // The function take a variable number of arguments,
      // including collections
      signature: {
        domain: ["FunctionOf", ["VarArg", "Values"], "Numbers"],
        simplify: (ce, ops2) => {
          if (ops2.length === 0)
            return ce.NegativeInfinity;
          if (ops2.length === 1)
            return ops2[0];
          return ce.fn("Max", ops2);
        },
        evaluate: (ce, ops2) => processMinMax(ce, ops2, "Max")
      }
    },
    Min: {
      description: "Minimum of two or more numbers",
      complexity: 1200,
      threadable: false,
      // The function take a variable number of arguments,
      // including collections
      signature: {
        domain: ["FunctionOf", ["VarArg", "Values"], "Numbers"],
        simplify: (ce, ops2) => {
          if (ops2.length === 0)
            return ce.PositiveInfinity;
          if (ops2.length === 1)
            return ops2[0];
          return ce.fn("Min", ops2);
        },
        evaluate: (ce, ops2) => processMinMax(ce, ops2, "Min")
      }
    },
    Supremum: {
      description: "Like Max, but defined for open sets",
      complexity: 1200,
      threadable: false,
      // The function take a variable number of arguments,
      // including collections
      signature: {
        domain: ["FunctionOf", ["VarArg", "Values"], "Numbers"],
        simplify: (ce, ops2) => {
          if (ops2.length === 0)
            return ce.NegativeInfinity;
          if (ops2.length === 1)
            return ops2[0];
          return ce.fn("Min", ops2);
        },
        evaluate: (ce, ops2) => processMinMax(ce, ops2, "Supremum")
      }
    },
    Infimum: {
      description: "Like Min, but defined for open sets",
      complexity: 1200,
      threadable: false,
      // The function take a variable number of arguments,
      // including collections
      signature: {
        domain: ["FunctionOf", ["VarArg", "Values"], "Numbers"],
        simplify: (ce, ops2) => {
          if (ops2.length === 0)
            return ce.PositiveInfinity;
          if (ops2.length === 1)
            return ops2[0];
          return ce.fn("Min", ops2);
        },
        evaluate: (ce, ops2) => processMinMax(ce, ops2, "Infimum")
      }
    },
    Product: {
      wikidata: "Q901718",
      complexity: 1e3,
      hold: "all",
      threadable: false,
      signature: {
        domain: [
          "FunctionOf",
          "Anything",
          ["OptArg", "Tuples"],
          // ['Tuple', 'Symbols', ['OptArg', 'Integers'], ['OptArg', 'Integers']],
          // ],
          "Numbers"
        ],
        // codomain: (ce, args) => domainAdd(ce, args),
        // The 'body' and 'range' need to be interpreted by canonicalMultiplication(). Don't canonicalize them yet.
        canonical: (ce, ops2) => canonicalProduct(ce, ops2[0], ops2[1]),
        simplify: (ce, ops2) => evalMultiplication(ce, ops2[0], ops2[1], "simplify"),
        evaluate: (ce, ops2) => evalMultiplication(ce, ops2[0], ops2[1], "evaluate"),
        N: (ce, ops2) => evalMultiplication(ce, ops2[0], ops2[1], "N")
      }
    },
    Sum: {
      wikidata: "Q218005",
      complexity: 1e3,
      hold: "all",
      threadable: false,
      signature: {
        domain: [
          "FunctionOf",
          ["Union", "Collections", "Functions"],
          ["OptArg", "Tuples"],
          // ['Tuple', 'Symbols', ['OptArg', 'Integers'], ['OptArg', 'Integers']],
          // ],
          "Numbers"
        ],
        canonical: (ce, ops2) => canonicalSummation(ce, ops2[0], ops2[1]),
        simplify: (ce, ops2) => evalSummation(ce, ops2[0], ops2[1], "simplify"),
        evaluate: (ce, ops2) => evalSummation(ce, ops2[0], ops2[1], "evaluate"),
        N: (ce, ops2) => evalSummation(ce, ops2[0], ops2[1], "N")
      }
    }
  },
  //
  // Formatting and string processing
  //
  {
    BaseForm: {
      description: "`BaseForm(expr, base=10)`",
      complexity: 9e3,
      inert: true,
      signature: {
        domain: ["FunctionOf", "Values", ["OptArg", "Integers"], "Values"],
        result: (_ce, args) => args[0].domain
      }
    },
    FromDigits: {
      description: `\`FromDigits(s, base=10)\`       return an integer representation of the string \`s\` in base \`base\`.`,
      // @todo could accept `0xcafe`, `0b01010` or `(deadbeef)_16` as string formats
      // @todo could accept "roman"... as base
      // @todo could accept optional third parameter as the (padded) length of the output
      signature: {
        domain: ["FunctionOf", "Strings", ["OptArg", "Anything"], "Integers"],
        evaluate: (ce, ops2) => {
          let op12 = ops2[0]?.string;
          if (!op12)
            return ce.domainError("Strings", ops2[0]?.domain, ops2[0]);
          op12 = op12.trim();
          if (op12.startsWith("0x"))
            return ce.number(parseInt(op12.slice(2), 16));
          if (op12.startsWith("0b"))
            return ce.number(parseInt(op12.slice(2), 2));
          const op22 = ops2[1] ?? ce.Nothing;
          if (op22.isNothing)
            return ce.number(Number.parseInt(op12, 10));
          const base = asFloat(op22);
          if (base && (!Number.isInteger(base) || base < 2 || base > 36))
            return ce.error(["unexpected-base", base], op22);
          const [value, rest] = fromDigits(op12, op22.string ?? op22.symbol ?? 10);
          if (rest)
            return ce.error(["unexpected-digit", { str: rest[0] }], {
              str: rest
            });
          return ce.number(value);
        }
      }
    },
    IntegerString: {
      description: `\`IntegerString(n, base=10)\`       return a string representation of the integer \`n\` in base \`base\`.`,
      // @todo could accept `0xcafe`, `0b01010` or `(deadbeef)_16` as string formats
      // @todo could accept "roman"... as base
      // @todo could accept optional third parameter as the (padded) length of the output
      threadable: true,
      signature: {
        domain: ["FunctionOf", "Integers", ["OptArg", "Integers"], "Strings"],
        evaluate: (ce, ops2) => {
          const op12 = ops2[0];
          const val = asFloat(op12) ?? NaN;
          if (Number.isNaN(val) || !Number.isInteger(val))
            return ce.domainError("Integers", op12.domain, op12);
          const op22 = ops2[1] ?? ce.Nothing;
          if (op22.isNothing) {
            const op1Num = op12.numericValue;
            if (typeof op1Num === "number")
              return ce.string(Math.abs(op1Num).toString());
            if (op1Num instanceof Decimal)
              return ce.string(op1Num.abs().toString());
            return ce.string(
              Math.abs(Math.round(asFloat(op12) ?? NaN)).toString()
            );
          }
          if (asSmallInteger(op22) === null)
            return ce.domainError("Integers", op22.domain, op22);
          const base = asSmallInteger(op22);
          if (base < 2 || base > 36)
            return ce.error(["out-of-range", 2, 36, base], op22);
          return ce.string(Math.abs(val).toString(base));
        }
      }
    }
  }
];
function processAbs(ce, arg, mode) {
  if (mode !== "simplify") {
    const num = arg.numericValue;
    if (num !== null) {
      if (typeof num === "number")
        return ce.number(Math.abs(num));
      if (num instanceof Decimal)
        return ce.number(num.abs());
      if (num instanceof import_complex17.Complex)
        return ce.number(num.abs());
      if (isMachineRational(num))
        return ce.number(
          mode === "N" ? Math.abs(num[0] / num[1]) : [Math.abs(num[0]), num[1]]
        );
      if (isBigRational(num)) {
        const [n, d] = num;
        return ce.number(
          mode === "N" ? ce.bignum(n).div(ce.bignum(d)).abs() : [n > 0 ? n : -n, d]
        );
      }
    }
  }
  if (arg.isNonNegative)
    return arg;
  if (arg.isNegative)
    return ce.neg(arg);
  return void 0;
}
function processMinMaxItem(item, mode) {
  const ce = item.engine;
  const upper = mode === "Max" || mode === "Supremum";
  if (item.head === "Interval") {
    const b = upper ? item.op2 : item.op1;
    if (!b.isNumber || b.numericValue === void 0)
      return [void 0, [item]];
    return [b, []];
  }
  if (item.head === "Range") {
    if (item.nops === 1)
      item = upper ? item.op1 : ce.One;
    else if (!upper) {
      item = item.op1;
    } else {
      const step = item.nops === 2 ? 1 : asFloat(item.op3);
      if (step === null || !isFinite(step))
        return [void 0, [item]];
      const [a, b] = [asFloat(item.op1), asFloat(item.op2)];
      if (a === null || b === null)
        return [void 0, [item]];
      const steps = Math.floor((b - a) / step);
      item = ce.number(a + step * steps);
    }
    return [item, []];
  }
  if (item.head === "Linspace") {
    if (item.nops === 1)
      item = upper ? item.op1 : ce.One;
    else if (upper)
      item = item.op2;
    else
      item = item.op1;
    return [item, []];
  }
  if (isCollection(item)) {
    let result = void 0;
    const rest = [];
    for (const op3 of each(item)) {
      const [val, others] = processMinMaxItem(op3, mode);
      if (val) {
        if (!result)
          result = val;
        else {
          if (upper && val.isGreater(result) || !upper && val.isLess(result))
            result = val;
        }
      }
      rest.push(...others);
    }
    return [result, rest];
  }
  if (!item.isNumber || item.numericValue === void 0)
    return [void 0, [item]];
  return [item, []];
}
function processMinMax(ce, ops2, mode) {
  const upper = mode === "Max" || mode === "Supremum";
  if (ops2.length === 0)
    return upper ? ce.NegativeInfinity : ce.PositiveInfinity;
  let result = void 0;
  const rest = [];
  for (const op3 of ops2) {
    const [val, others] = processMinMaxItem(op3, mode);
    if (val) {
      if (!result)
        result = val;
      else {
        if (upper && val.isGreater(result) || !upper && val.isLess(result))
          result = val;
      }
    }
    rest.push(...others);
  }
  if (rest.length > 0)
    return ce.box(result ? [mode, result, ...rest] : [mode, ...rest]);
  return result ?? (upper ? ce.NegativeInfinity : ce.PositiveInfinity);
}
function processGcdLcm(ce, ops2, mode) {
  const fn = mode === "LCM" ? lcm : gcd;
  const bigFn = mode === "LCM" ? lcm2 : gcd3;
  const rest = [];
  if (bignumPreferred(ce)) {
    let result2 = null;
    for (const op3 of ops2) {
      if (result2 === null) {
        result2 = asBignum(op3);
        if (result2 === null || !result2.isInteger())
          rest.push(op3);
      } else {
        const d = asBignum(op3);
        if (d && d.isInteger())
          result2 = bigFn(result2, d);
        else
          rest.push(op3);
      }
    }
    if (rest.length === 0)
      return result2 === null ? ce.One : ce.number(result2);
    if (result2 === null)
      return ce._fn(mode, rest);
    return ce._fn(mode, [ce.number(result2), ...rest]);
  }
  let result = null;
  for (const op3 of ops2) {
    if (result === null) {
      result = asFloat(op3);
      if (result === null || !Number.isInteger(result))
        rest.push(op3);
    } else {
      const d = asFloat(op3);
      if (d && Number.isInteger(d))
        result = fn(result, d);
      else
        rest.push(op3);
    }
  }
  if (rest.length === 0)
    return result === null ? ce.One : ce.number(result);
  if (result === null)
    return ce._fn(mode, rest);
  return ce._fn(mode, [ce.number(result), ...rest]);
}

// src/compute-engine/symbolic/derivative.ts
var DERIVATIVES_TABLE = {
  Sin: ["Cos", "_"],
  Cos: ["Negate", ["Sin", "_"]],
  Tan: ["Power", ["Sec", "_"], 2],
  Sec: ["Multiply", ["Tan", "_"], ["Sec", "_"]],
  Csc: ["Multiply", ["Negate", ["Cot", "_"]], ["Csc", "_"]],
  Cot: ["Negate", ["Power", ["Csc", "_"], 2]],
  Arcsin: ["Power", ["Subtract", 1, ["Power", "_", 2]], ["Negate", "Half"]],
  Arccos: [
    "Negate",
    ["Power", ["Subtract", 1, ["Power", "_", 2]], ["Negate", "Half"]]
  ],
  Arctan: ["Power", ["Add", 1, ["Power", "_", 2]], -1],
  Arcsec: [
    "Multiply",
    ["Power", ["Subtract", 1, ["Power", "_", 2]], ["Negate", "Half"]],
    ["Negate", ["Power", "_", 2]]
  ],
  Arccsc: [
    "Multiply",
    ["Power", ["Subtract", 1, ["Power", "_", 2]], ["Negate", "Half"]],
    ["Negate", ["Power", "_", 2]]
  ],
  Arccot: ["Negate", ["Power", ["Add", 1, ["Power", "_", 2]], -1]],
  Sinh: ["Cosh", "_"],
  Cosh: ["Sinh", "_"],
  Tanh: ["Power", ["Sech", "_"], 2],
  Sech: ["Multiply", ["Tanh", "_"], "Sech"],
  Csch: ["Multiply", ["Coth", "_"], "Csch"],
  Coth: ["Negate", ["Power", ["Csch", "_"], 2]],
  Arcsinh: ["Power", ["Add", ["Power", "_", 2], 1], ["Negate", "Half"]],
  Arccosh: ["Power", ["Subtract", ["Power", "_", 2], 1], ["Negate", "Half"]],
  Arctanh: ["Power", ["Subtract", 1, ["Power", "_", 2]], -1],
  Arcsech: [
    "Negate",
    [
      "Power",
      ["Multiply", "2", "Subtract", ["Power", "_", 2]],
      ["Negate", "Half"]
    ]
  ],
  Arccsch: [
    "Negate",
    ["Power", ["Multiply", "2", "Add", ["Power", "_", 2]], ["Negate", "Half"]]
  ],
  Arccoth: ["Negate", ["Power", ["Subtract", 1, ["Power", "_", 2]], -1]],
  Exp: ["Exp", "_"],
  Ln: ["Power", "_", -1],
  Log: ["Power", ["Multiply", "_", ["Ln", "10"]], -1],
  Sqrt: ["Multiply", ["Power", "_", ["Negate", "Half"]], "Half"],
  Abs: [
    "Piecewise",
    ["Tuple", ["Multiply", "_", ["Power", "_", -1]], ["Greater", "_", 0]]
  ],
  // https://proofwiki.org/wiki/Derivative_of_Error_Function
  Erf: [
    "Multiply",
    ["Divide", "2", ["Sqrt", "Pi"]],
    ["Exp", ["Negate", ["Square", "_"]]]
  ],
  // https://proofwiki.org/wiki/Derivative_of_Gamma_Function
  // https://en.wikipedia.org/wiki/Gamma_function
  Gamma: ["Multiply", ["Gamma", "_"], ["Digamma", "_"]],
  Digamma: [
    "Add",
    ["Multiply", ["Digamma", "_"], ["Gamma", "_"]],
    ["Multiply", ["Power", "_", -1], ["Gamma", "_"]]
  ],
  Zeta: ["Multiply", ["Multiply", -1, ["Zeta", "_"]], ["Digamma", "_"]],
  PolyGamma: [
    "Add",
    ["Multiply", ["PolyGamma", "_"], ["Gamma", "_"]],
    ["Multiply", ["Power", "_", -1], ["Gamma", "_"]]
  ],
  Beta: [
    "Multiply",
    [
      "Add",
      ["Multiply", ["Beta", "_"], ["Digamma", "_"]],
      ["Multiply", ["Power", "_", -1], ["Beta", "_"]]
    ],
    ["Beta", "_"]
  ],
  Erfc: [
    "Multiply",
    ["Negate", ["Erfc", "_"]],
    ["Exp", ["Negate", ["Power", "_", 2]]],
    ["Power", "_", -1]
  ],
  LambertW: [
    "Multiply",
    ["Power", "_", -1],
    [
      "Multiply",
      ["Add", "_", ["LambertW", "_"]],
      ["Add", ["LambertW", "_"], 1]
    ]
  ],
  AiryAi: ["Multiply", ["AiryAi", "_"], ["AiryBi", "_"]],
  AiryBi: ["Multiply", ["AiryAi", "_"], ["AiryBi", "_"]],
  BesselJ: ["Multiply", ["BesselJ", "_"], ["BesselY", "_"]],
  BesselY: ["Multiply", ["BesselJ", "_"], ["BesselY", "_"]],
  BesselI: ["Multiply", ["BesselI", "_"], ["BesselK", "_"]],
  BesselK: ["Multiply", ["BesselI", "_"], ["BesselK", "_"]],
  FresnelS: ["Multiply", ["FresnelS", "_"], ["FresnelC", "_"]],
  FresnelC: ["Multiply", ["FresnelS", "_"], ["FresnelC", "_"]],
  Erfi: ["Multiply", ["Erfi", "_"], ["Erf", "_"]]
};
function differentiate(expr, v) {
  const ce = expr.engine;
  if (expr.string || expr.keys)
    return void 0;
  if (expr.numericValue !== null)
    return expr.engine.Zero;
  if (expr.symbol === v)
    return expr.engine.One;
  if (expr.symbol)
    return expr.engine.Zero;
  if (expr.head && typeof expr.head === "string") {
    if (expr.head === "Negate") {
      const gPrime2 = differentiate(expr.op1, v);
      if (gPrime2)
        return ce.neg(gPrime2);
      return ce.neg(ce._fn("D", [expr.op1, ce.symbol(v)]));
    }
    if (expr.head === "Add") {
      const terms = expr.ops.map((op3) => differentiate(op3, v));
      if (terms.some((term) => term === void 0))
        return void 0;
      return ce.add(terms);
    }
    if (expr.head === "Multiply") {
      const terms = expr.ops.map((op3, i) => {
        const otherTerms = expr.ops.slice();
        otherTerms.splice(i, 1);
        const otherProduct = ce.mul(otherTerms);
        const gPrime2 = differentiate(op3, v) ?? ce._fn("D", [op3, ce.symbol(v)]);
        return ce.mul([gPrime2, otherProduct]);
      });
      if (terms.some((term) => term === void 0))
        return void 0;
      return ce.add(terms);
    }
    if (expr.head === "Power") {
      const [base, exponent] = expr.ops;
      if (base.symbol === v) {
        return ce.mul([
          exponent,
          ce.pow(base, ce.add([exponent, ce.NegativeOne]))
        ]);
      }
    }
    if (expr.head === "Divide") {
      const [numerator, denominator] = expr.ops;
      const gPrime2 = differentiate(numerator, v) ?? ce._fn("D", [numerator, ce.symbol(v)]);
      const hPrime = differentiate(denominator, v) ?? ce._fn("D", [denominator, ce.symbol(v)]);
      return ce.div(
        ce.add([
          ce.mul([gPrime2, denominator]),
          ce.neg(ce.mul([hPrime, numerator]))
        ]),
        ce.pow(denominator, 2)
      );
    }
    const h = DERIVATIVES_TABLE[expr.head];
    if (!h) {
      const fPrime = ce._fn("Derivative", [ce.symbol(expr.head), ce.number(1)]);
      const g2 = expr.ops[0];
      const gPrime2 = differentiate(g2, v) ?? ce._fn("D", [g2, ce.symbol(v)]);
      return ce.mul([ce._fn("Apply", [fPrime, g2]), gPrime2]);
    }
    if (expr.nops > 1)
      return ce._fn("D", [expr, ce.symbol(v)]);
    const g = expr.ops[0];
    const gPrime = differentiate(g, v) ?? ce._fn("D", [g, ce.symbol(v)]);
    return ce.mul([apply3(ce.box(h), [g]), gPrime]);
  }
  return void 0;
}

// src/compute-engine/library/calculus.ts
var CALCULUS_LIBRARY = [
  {
    /* @todo
        ## Definite Integral
    `\int f dx` -> ["Integrate", "f", "x"]
    
    `\int\int f dxdy` -> ["Integrate", "f", "x", "y"]
    
    Note: `["Integrate", ["Integrate", "f" , "x"], "y"]` is equivalent to
    `["Integrate", "f" , "x", "y"]`
    
    
    `\int_{a}^{b} f dx` -> ["Integrate", f, [x, a, b]]
    `\int_{c}^{d} \int_{a}^{b} f dxdy` -> ["Integrate", "f", ["Triple", "x", "a",
    "b"], ["Triple", "y", "c", "d"]]
    
    `\int_{a}^{b}\frac{dx}{f}` -> ["Integrate", ["Power", "f", -1], ["Triple", "x",
    "a", "b"]]
    
    `\int_{a}^{b}dx f` -> ["Integrate", "f", ["Triple", "x", "a", "b"]]
    
    If `[a, b]` are numeric, numeric methods are used to approximate the integral.
    
    ## Domain Integral
    
    `\int_{x\in D}` -> ["Integrate", f, ["In", x, D]]
    
    ### Contour Integral
    
    `\oint f dx` -> `["ContourIntegral", "f", "x"]`
    
    `\varointclockwise f dx` -> `["ClockwiseContourIntegral", "f", "x"]`
    
    `\ointctrclockwise f dx` -> `["CounterclockwiseContourIntegral", "f", "x"]`
    
    `\oiint f ds` -> `["DoubleCountourIntegral", "f", "s"]` : integral over closed
    surfaces
    
    `\oiiint` f dv -> `["TripleCountourIntegral", "f", "v"]` : integral over closed
    volumes
    
    `\intclockwise`
    
    `\intctrclockwise`
    
    `\iint`
    
    `\iiint`
    */
    // @todo: review the following
    // - https://index.scala-lang.org/cascala/galileo
    // - https://symbolics.juliasymbolics.org/stable/
    // - https://github.com/symengine/SymEngine.jl
    //
    // Functions
    //
    //
    // Represents the functional derivative of a function.
    //
    // This can be considered a more primitive form of the Derivative. In
    // most cases users will use the `D` function instead of this one.
    //
    // ["Derivative", "Sin"]
    //    -> "Cos"
    //
    // ["Derivative", ["Function", ["Square", "x"], "x"], 2]
    //    -> ["Function", ["Multiply", 2, "x"], "x"]
    //
    // The "2" indicates the order of the derivative, and that the first
    // argument of the function is the variable with respect to which the
    // derivative is taken.
    //
    // ["Derivative", ["Function", ["Add", "x", "y"], "x", "y"], 0, 1]
    //    -> ["Function", "y"], "x", "y"]
    // The 0 indicate that the first argument of the function (x) is a
    // constant, while the "1" indicates that the second argument (y) is the
    // variable with respect to which the derivative is taken.
    //
    // @todo: consider Fractional Calculus, i.e. Louiville-Riemann derivative
    // https://en.wikipedia.org/wiki/Fractional_calculus
    // with values of the order that can be either fractional or negative
    //
    Derivative: {
      hold: "all",
      threadable: false,
      signature: {
        domain: [
          "FunctionOf",
          "Functions",
          ["OptArg", "Numbers"],
          // The order of the derivative
          "Functions"
        ],
        canonical: (ce, ops2) => {
          if (ops2[0].functionDefinition) {
            return differentiate(ce._fn(ops2[0].canonical, [ce.symbol("_")]), "_")?.canonical ?? ce._fn("Derivative", ops2);
          }
          return ce._fn("Derivative", ops2);
        },
        simplify: (ce, ops2) => {
          const expr = ops2[0].simplify();
          if (ops2[1])
            return ce._fn("Derivative", [expr, ops2[1]]);
          return ce._fn("Derivative", [expr]);
        },
        evaluate: (ce, ops2) => {
          const op3 = ops2[0].evaluate();
          if (op3.functionDefinition) {
            return differentiate(ce._fn(op3, [ce.symbol("_")]), "_")?.canonical ?? void 0;
          }
          const f = differentiate(op3, "_");
          if (!f)
            return void 0;
          return f.canonical;
        }
      }
    },
    //
    // **D: Partial derivative**
    //
    // ["D", f, "x"] -> If f is an expression of x, derivative of f with respect
    //                        to x
    // ["D", f, "x", "x"]
    // ["D", f, "y", "x"]
    D: {
      hold: "all",
      threadable: false,
      signature: {
        domain: [
          "FunctionOf",
          "Anything",
          "Symbols",
          ["VarArg", "Symbols"],
          "Anything"
        ],
        canonical: (ce, ops2) => {
          let f = ops2[0];
          if (!f)
            return null;
          ce.pushScope();
          const params = ops2.slice(1);
          f.bind();
          f = f.canonical;
          const result = ce._fn("D", [f, ...params]);
          ce.popScope();
          return result;
        },
        evaluate: (ce, ops2) => {
          let f = ops2[0].canonical;
          const context = ce.swapScope(f.scope);
          f = f.evaluate();
          const params = ops2.slice(1);
          if (params.length === 0)
            f = void 0;
          for (const param of params) {
            if (!param.symbol) {
              f = void 0;
              break;
            }
            f = differentiate(f, param.symbol);
            if (f === void 0)
              break;
          }
          ce.swapScope(context);
          f = f?.canonical;
          return f?.head === "D" ? f : f?.evaluate();
        }
      }
    },
    // Evaluate a numerical approximation of a derivative at point x
    ND: {
      hold: "first",
      threadable: false,
      signature: {
        domain: ["FunctionOf", "Anything", "Numbers", "Functions"],
        N: (ce, ops2) => {
          const x = ops2[1]?.value;
          if (typeof x !== "number")
            return void 0;
          const f = applicableN1(ce.box(ops2[0]));
          return ce.number(centeredDiff8thOrder(f, x));
        }
      }
    },
    Integrate: {
      wikidata: "Q80091",
      hold: "all",
      threadable: false,
      signature: {
        domain: [
          "FunctionOf",
          "Functions",
          ["OptArg", ["Union", "Tuples", "Symbols"]],
          // ['Tuple', 'Symbols', ['OptArg', 'Integers'], ['OptArg', 'Integers']],
          "Numbers"
        ],
        canonical: (ce, ops2) => {
          let range = ops2[1];
          let index = null;
          let lower = null;
          let upper = null;
          if (range && range.head !== "Tuple" && range.head !== "Triple" && range.head !== "Pair" && range.head !== "Single") {
            index = range;
          } else if (range) {
            index = range.ops?.[0] ?? null;
            lower = range.ops?.[1]?.canonical ?? null;
            upper = range.ops?.[2]?.canonical ?? null;
          }
          if (index && index.head === "Hold")
            index = index.op1;
          if (index && index.head === "ReleaseHold")
            index = index.op1.evaluate();
          index ?? (index = ce.Nothing);
          if (!index.symbol)
            index = ce.domainError("Symbols", index.domain, index);
          if (lower)
            lower = checkDomain(ce, lower, ce.Numbers);
          if (upper)
            upper = checkDomain(ce, upper, ce.Numbers);
          if (lower && upper)
            range = ce.tuple([index, lower, upper]);
          else if (upper)
            range = ce.tuple([index, ce.NegativeInfinity, upper]);
          else if (lower)
            range = ce.tuple([index, lower]);
          else
            range = index;
          let body = ops2[0] ?? ce.error("missing");
          body = body.canonical;
          if (body.head === "Delimiter" && body.op1.head === "Sequence")
            body = body.op1.op1;
          return ce._fn("Integrate", [body, range]);
        }
      }
    },
    NIntegrate: {
      hold: "first",
      threadable: false,
      signature: {
        domain: ["FunctionOf", "Functions", "Numbers", "Numbers", "Numbers"],
        evaluate: (ce, ops2) => {
          const numericMode = ce.numericMode;
          const precision = ce.precision;
          ce.numericMode = "machine";
          const f = applicableN1(ops2[0]);
          const [a, b] = ops2.slice(1).map((op3) => op3.value);
          let result = void 0;
          if (typeof a === "number" && typeof b === "number")
            result = ce.number(monteCarloEstimate(f, a, b));
          ce.numericMode = numericMode;
          ce.precision = precision;
          return result;
        }
      }
    }
  },
  {
    // Limits
    Limit: {
      description: "Limit of a function",
      complexity: 5e3,
      hold: "all",
      threadable: false,
      signature: {
        domain: [
          "FunctionOf",
          "Anything",
          "Numbers",
          ["OptArg", "Numbers"],
          "Numbers"
        ],
        N: (ce, ops2) => {
          const [f, x, dir] = ops2;
          const target = asFloat(x.N());
          if (target === null)
            return void 0;
          const fn = applicable(f);
          return ce.number(
            limit(
              (x2) => {
                const y = fn([ce.number(x2)])?.value;
                return typeof y === "number" ? y : Number.NaN;
              },
              target,
              dir ? asFloat(dir) ?? 1 : 1
            )
          );
        }
      }
    },
    NLimit: {
      description: "Numerical approximation of the limit of a function",
      complexity: 5e3,
      hold: "all",
      threadable: false,
      signature: {
        domain: [
          "FunctionOf",
          "Anything",
          "Numbers",
          ["OptArg", "Numbers"],
          "Numbers"
        ],
        evaluate: (ce, ops2) => {
          const [f, x, dir] = ops2;
          const target = asFloat(x.N());
          if (target === null)
            return void 0;
          const fn = applicable(f);
          return ce.number(
            limit(
              (x2) => {
                const y = fn([ce.number(x2)])?.value;
                return typeof y === "number" ? y : Number.NaN;
              },
              target,
              dir ? asFloat(dir) ?? 1 : 1
            )
          );
        }
      }
    }
  }
];

// src/compute-engine/library/collections.ts
var DEFAULT_LINSPACE_COUNT = 50;
var COLLECTIONS_LIBRARY = {
  //
  // Data Structures
  //
  List: {
    complexity: 8200,
    hold: "all",
    signature: {
      domain: ["FunctionOf", ["VarArg", "Anything"], "Lists"],
      canonical: canonicalList
    },
    size: (expr) => expr.nops,
    iterator: (expr, start, count) => {
      let index = start ?? 1;
      count = Math.min(count ?? expr.nops, expr.nops);
      if (count <= 0)
        return { next: () => ({ value: void 0, done: true }) };
      return {
        next: () => {
          if (count > 0) {
            count--;
            return { value: expr.ops[index++ - 1], done: false };
          } else {
            return { value: void 0, done: true };
          }
        }
      };
    },
    at: (expr, index) => {
      if (typeof index !== "number")
        return void 0;
      if (index < 1 || index > expr.nops)
        return void 0;
      return expr.ops[index - 1];
    },
    indexOf: (expr, target, from) => {
      from ?? (from = 1);
      if (from < 0) {
        if (from < -expr.nops)
          return void 0;
        from = expr.nops + from + 1;
        const start2 = from;
        for (let i = start2; i >= 1; i--)
          if (expr.ops[i - 1].isEqual(target))
            return i;
        return void 0;
      }
      const start = from;
      for (let i = start; i <= expr.nops; i++)
        if (expr.ops[i - 1].isEqual(target))
          return i;
      return void 0;
    }
  },
  Range: {
    complexity: 8200,
    signature: {
      domain: [
        "FunctionOf",
        "Numbers",
        ["OptArg", "Numbers", "Numbers"],
        "Values"
      ]
    },
    size: (expr) => {
      const [lower, upper, step] = rangeArgs(expr);
      if (!isFinite(lower) || !isFinite(upper))
        return Infinity;
      return 1 + Math.max(0, Math.floor((upper - lower) / step));
    },
    at: (expr, index) => {
      if (typeof index !== "number")
        return void 0;
      const [lower, upper, step] = rangeArgs(expr);
      if (index < 1 || index > 1 + (upper - lower) / step)
        return void 0;
      return expr.engine.number(lower + step * (index - 1));
    },
    iterator: (expr, start, count) => {
      const [lower, upper, step] = rangeArgs(expr);
      let index = start ?? 1;
      count = Math.min(count ?? upper, upper);
      if (count <= 0)
        return { next: () => ({ value: void 0, done: true }) };
      return {
        next: () => {
          if (count > 0) {
            count--;
            return {
              value: expr.engine.number(lower + step * (index++ - 1)),
              done: false
            };
          } else {
            return { value: void 0, done: true };
          }
        }
      };
    }
  },
  Linspace: {
    complexity: 8200,
    signature: {
      domain: [
        "FunctionOf",
        "Numbers",
        ["OptArg", "Numbers", "Numbers"],
        "Values"
      ]
    },
    size: (expr) => {
      const count = asFloat(expr.op3) ?? DEFAULT_LINSPACE_COUNT;
      return Math.max(0, Math.floor(count));
    },
    at: (expr, index) => {
      if (typeof index !== "number")
        return void 0;
      const lower = asFloat(expr.op1);
      const upper = asFloat(expr.op2);
      const count = asFloat(expr.op3) ?? DEFAULT_LINSPACE_COUNT;
      if (lower === void 0 || upper === void 0)
        return void 0;
      if (index < 1 || index > count)
        return void 0;
      return expr.engine.number(
        lower + (upper - lower) * (index - 1) / count
      );
    },
    iterator: (expr, start, count) => {
      let lower = asFloat(expr.op1);
      let upper = asFloat(expr.op2);
      let totalCount;
      if (upper === void 0) {
        upper = lower;
        lower = 1;
        totalCount = DEFAULT_LINSPACE_COUNT;
      } else
        totalCount = Math.max(0, asFloat(expr.op3) ?? DEFAULT_LINSPACE_COUNT);
      let index = start ?? 1;
      count = Math.min(count ?? totalCount, totalCount);
      if (count <= 0)
        return { next: () => ({ value: void 0, done: true }) };
      return {
        next: () => {
          if (count > 0) {
            count--;
            return {
              value: expr.engine.number(
                lower + (upper - lower) * (index++ - 1) / totalCount
              ),
              done: false
            };
          } else {
            return { value: void 0, done: true };
          }
        }
      };
    }
  },
  KeyValuePair: {
    description: "A key/value pair",
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Strings", "Anything", "Tuples"],
      canonical: (ce, args) => {
        const [key, value] = checkDomains(ce, args, [ce.Strings, "Values"]);
        if (!key.isValid || !value.isValid)
          return ce._fn("KeyValuePair", [key, value]);
        return ce.tuple([key, value]);
      }
    },
    size: (_expr) => 1
  },
  Single: {
    description: "A tuple with a single element",
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Anything", "Tuples"],
      canonical: (ce, ops2) => ce.tuple(checkArity(ce, ops2, 1))
    },
    size: (expr) => expr.nops,
    at: (expr, index) => {
      if (typeof index !== "number" || index !== 1)
        return void 0;
      return expr.ops[0];
    }
  },
  Pair: {
    description: "A tuple of two elements",
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Anything", "Anything", "Tuples"],
      canonical: (ce, ops2) => ce.tuple(checkArity(ce, ops2, 2))
    },
    size: (expr) => expr.nops,
    at: (expr, index) => typeof index === "number" ? expr.ops[index - 1] : void 0
  },
  Triple: {
    description: "A tuple of three elements",
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Anything", "Anything", "Anything", "Tuples"],
      canonical: (ce, ops2) => ce.tuple(checkArity(ce, ops2, 3))
    },
    size: (expr) => expr.nops,
    at: (expr, index) => typeof index === "number" ? expr.ops[index - 1] : void 0
  },
  Tuple: {
    description: "A fixed number of heterogeneous elements",
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Anything", ["VarArg", "Anything"], "Tuples"],
      canonical: (ce, ops2) => ce.tuple(canonical(ops2))
    },
    size: (expr) => expr.nops,
    at: (expr, index) => typeof index === "number" ? expr.ops[index - 1] : void 0
  },
  String: {
    threadable: true,
    signature: {
      domain: ["FunctionOf", ["OptArg", "Anything"], "Strings"],
      evaluate: (ce, ops2) => {
        if (ops2.length === 0)
          return ce.string("");
        return ce.string(ops2.map((x) => x.string ?? x.toString()).join(""));
      }
    }
  },
  //
  // Functions
  //
  Length: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", "Numbers"],
      evaluate: (ce, ops2) => {
        const def = ops2[0].functionDefinition;
        if (def?.size)
          return ce.number(def.size(ops2[0]));
        const s = ops2[0].string;
        if (s !== null)
          return ce.number(s.length);
        return ce.Zero;
      }
    }
  },
  IsEmpty: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", "Numbers"],
      evaluate: (ce, ops2) => {
        const def = ops2[0].functionDefinition;
        let l = void 0;
        if (def?.size)
          l = def.size(ops2[0]);
        else {
          const s = ops2[0].string;
          if (s !== null)
            l = s.length;
        }
        if (l === void 0)
          return void 0;
        return l === 0 ? ce.True : ce.False;
      }
    }
  },
  // Note: Take is equivalent to "Extract" or "Part" in Mathematica
  // @todo: should handle having a ["List"] as an index argument
  Take: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", ["VarArg", "Values"], "Values"],
      evaluate: (ce, ops2) => {
        if (ops2.length < 2)
          return void 0;
        const s = ops2[0].string;
        if (s !== null) {
          const indexes2 = ops2.slice(1).map((op3) => indexRangeArg(op3, s.length));
          return ce.string(takeString(s, indexes2));
        }
        const def = ops2[0].functionDefinition;
        const l = def?.size?.(ops2[0]);
        return take(
          ops2[0],
          ops2.slice(1).map((op3) => indexRangeArg(op3, l))
        );
      }
    }
  },
  // @todo: should handle having a ["List"] as an index argument
  Drop: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", ["VarArg", "Values"], "Values"],
      evaluate: (ce, ops2) => {
        if (ops2.length < 2)
          return void 0;
        const s = ops2[0].string;
        if (s !== null) {
          const xs2 = indexes(
            ops2.slice(1).map((op3) => indexRangeArg(op3, s.length))
          );
          return ce.string(
            s.split("").filter((_c, i) => !xs2.includes(i + 1)).join("")
          );
        }
        const def = ops2[0].functionDefinition;
        const l = def?.size?.(ops2[0]);
        if (!l || !def?.at)
          return ce.Nothing;
        const xs = indexes(ops2.slice(1).map((op3) => indexRangeArg(op3, l)));
        const result = [];
        for (let i = 1; i <= l; i++)
          if (!xs.includes(i)) {
            const val = def.at(ops2[0], i);
            if (val)
              result.push(val);
          }
        return ce.fn("List", result);
      }
    }
  },
  At: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", "Values", "Values"],
      evaluate: (ce, ops2) => {
        const expr = ops2[0];
        const def = expr.functionDefinition;
        if (!def?.at)
          return void 0;
        const s = ops2[1].string;
        if (s !== null)
          return def.at(expr, 1) ?? ce.Nothing;
        const i = asFloat(ops2[1]);
        if (i === null || !Number.isInteger(i))
          return void 0;
        return def.at(expr, i) ?? ce.Nothing;
      }
    }
  },
  First: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", "Values"],
      evaluate: (ce, ops2) => {
        const expr = ops2[0];
        const def = expr.functionDefinition;
        if (!def?.at)
          return ce.Nothing;
        return def.at(expr, 1) ?? ce.Nothing;
      }
    }
  },
  Second: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", "Values"],
      evaluate: (ce, ops2) => {
        const expr = ops2[0];
        const def = expr.functionDefinition;
        if (!def?.at)
          return ce.Nothing;
        return def.at(expr, 2) ?? ce.Nothing;
      }
    }
  },
  Last: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", "Values"],
      evaluate: (ce, ops2) => {
        const expr = ops2[0];
        const def = expr.functionDefinition;
        if (!def?.at)
          return ce.Nothing;
        return def.at(expr, -1) ?? ce.Nothing;
      }
    }
  },
  Rest: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", "Values"],
      evaluate: (_ce, ops2) => take(ops2[0], [[2, -1, 1]])
    }
  },
  Most: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", "Values"],
      evaluate: (_ce, ops2) => take(ops2[0], [[1, -2, 1]])
    }
  },
  Reverse: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", "Values"],
      evaluate: (_ce, ops2) => take(ops2[0], [[-1, 2, 1]])
    }
  },
  // Return the indexes of the elements so they are in sorted order.
  // Sort is equivalent to `["Take", ["Ordering", expr, f]]`
  // Equivalent to Grade Up `⍋` and Grade Down `⍒` return the indexes
  // equivalent to Ordering in Mathematica
  Ordering: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", ["OptArg", "Functions"], "Values"],
      evaluate: (_ce, _ops) => {
        return void 0;
      }
    }
  },
  Sort: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", ["OptArg", "Functions"], "Values"],
      evaluate: (_ce, _ops) => {
        return void 0;
      }
    }
  },
  // Randomize the order of the elements
  Shuffle: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", "Values"],
      evaluate: (_ce, _ops) => {
        return void 0;
      }
    }
  },
  // { f(x) for x in xs }
  // { 2x | x ∈ [ 1 , 10 ] }
  Map: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Collections", "Functions", "Collections"],
      evaluate: (_ce, _ops) => {
        return void 0;
      }
    }
  },
  // [x for x in xs if p(x)]
  // [x | x in xs, p(x)]
  Filter: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", "Functions", "Values"],
      evaluate: (_ce, _ops) => {
        return void 0;
      }
    }
  },
  // Equivalent to "foldl" in Haskell
  // For "foldr", apply Reverse() first
  Reduce: {
    complexity: 8200,
    signature: {
      domain: [
        "FunctionOf",
        "Values",
        "Functions",
        ["OptArg", "Values"],
        "Values"
      ],
      evaluate: (_ce, _ops) => {
        return void 0;
      }
    }
  },
  Tabulate: {
    complexity: 8200,
    signature: {
      domain: [
        "FunctionOf",
        "Functions",
        "Integers",
        ["VarArg", "Integers"],
        "Values"
      ],
      evaluate: (_ce, _ops) => {
        return void 0;
      }
    }
  },
  /* Return a tuple of the unique elements, and their respective count
   * Ex: Tally([a, c, a, d, a, c]) = [[a, c, d], [3, 2, 1]]
   */
  Tally: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", "Tuples"],
      evaluate: (_ce, _ops) => {
        return void 0;
      }
    }
  },
  // Return the first element of Tally()
  // Equivalent to `Union` in Mathematica, `distinct` in Scala,
  // Unique or Nub ∪, ↑ in APL
  Unique: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", "Tuples"],
      evaluate: (_ce, _ops) => {
        return void 0;
      }
    }
  },
  // Similar to Transpose, but acts on a sequence of collections
  // Equivalent to zip in Python
  // The length of the result is the length of the shortest argument
  // Ex: Zip([a, b, c], [1, 2]) = [[a, 1], [b, 2]]
  Zip: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", ["VarArg", "Values"], "Values"],
      evaluate: (_ce, _ops) => {
        return void 0;
      }
    }
  },
  RotateLeft: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", ["OptArg", "Integers"], "Values"],
      evaluate: (_ce, _ops) => {
        return void 0;
      }
    }
  },
  RotateRight: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", ["OptArg", "Integers"], "Values"],
      evaluate: (_ce, _ops) => {
        return void 0;
      }
    }
  },
  // If all the arguments have the same head, return a new expression
  // made of all the arguments, with the head of the first argument
  // ["Join", ["List", 1, 2, 3], ["List", 4, 5, 6]] -> ["List", 1, 2, 3, 4, 5, 6]
  Join: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", ["VarArg", "Values"], "Values"],
      evaluate: (_ce, _ops) => {
        return void 0;
      }
    }
  },
  // Iterate(fn, init) -> [fn(1, init), fn(2, fn(1, init)), ...]
  // Iterate(fn) -> [fn(1), fn(2), ...]
  // Infinite series. Can use First(Iterate(fn), n) to get a finite series
  Iterate: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", ["OptArg", "Values"], "Values"],
      evaluate: (_ce, _ops) => {
        return void 0;
      }
    }
  },
  // Repeat(x) -> [x, x, ...]
  // This is an infinite series. Can use Tak(Repeat(x), n) to get a finite series
  // x is evaluated once. Although could use Hold()?
  // So that First(Repeat(Hold(Random(5))), 10) would return 10 random numbers...
  Repeat: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", "Values"],
      evaluate: (_ce, _ops) => {
        return void 0;
      }
    }
  },
  // Cycle(list) -> [list[1], list[2], ...]
  // -> repeats infinitely
  Cycle: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", "Values"],
      evaluate: (_ce, _ops) => {
        return void 0;
      }
    }
  },
  // Fill(f, [n, m])
  // Fill a nxm matrix with the result of f(i, j)
  // Fill( Random(5), [3, 3] )
  Fill: {
    complexity: 8200,
    signature: {
      domain: ["FunctionOf", "Values", "Values"],
      evaluate: (_ce, _ops) => {
        return void 0;
      }
    }
  }
};
function rangeArgs(expr) {
  const lower = asFloat(expr.op1) ?? 1;
  const upper = asFloat(expr.op2);
  if (upper === void 0)
    return [1, lower, 1];
  const step = asFloat(expr.op3) ?? 1;
  return [lower, upper, step];
}
function indexRangeArg(op3, l) {
  if (!op3)
    return [0, 0, 0];
  let n = asFloat(op3);
  if (n !== null) {
    n = Math.round(n);
    if (n < 0) {
      if (l === void 0)
        return [0, 0, 0];
      n = l + n + 1;
    }
    return [n, n, 1];
  }
  const h = op3.head;
  if (!h || typeof h !== "string" || !/^(Single|Pair|Triple|Tuple|)$/.test(h))
    return [0, 0, 0];
  let [lower, upper, step] = rangeArgs(op3);
  if ((lower < 0 || upper < 0) && l === void 0)
    return [0, 0, 0];
  if (lower < 0)
    lower = l + lower + 1;
  if (upper < 0)
    upper = l + upper + 1;
  step = Math.abs(Math.round(step));
  if (step === 0)
    return [0, 0, 0];
  if (lower > upper)
    step = -step;
  return [lower, upper, step];
}
function take(expr, indexes2) {
  const ce = expr.engine;
  const def = expr.functionDefinition;
  if (!def?.at)
    return ce.Nothing;
  const list = [];
  for (const index of indexes2) {
    const [lower, upper, step] = index;
    if (step === 0)
      continue;
    if (step < 0) {
      for (let index2 = lower; index2 >= upper; index2 += step) {
        const result = def.at(expr, index2);
        if (result)
          list.push(result);
      }
    } else {
      for (let index2 = lower; index2 <= upper; index2 += step) {
        const result = def.at(expr, index2);
        if (result)
          list.push(result);
      }
    }
  }
  return ce.fn("List", list);
}
function takeString(s, indexes2) {
  let s2 = "";
  for (const index of indexes2) {
    const [lower, upper, step] = index;
    if (step === 1)
      s2 += s.slice(lower - 1, upper);
    else if (step < 0)
      for (let i = lower; i >= upper; i += step)
        s2 += s[i - 1];
    else
      for (let i = lower; i <= upper; i += step)
        s2 += s[i - 1];
  }
  return s2;
}
function indexes(ranges) {
  const result = [];
  for (const range of ranges) {
    const [lower, upper, step] = range;
    if (step === 0)
      continue;
    if (step < 0) {
      for (let index = lower; index >= upper; index += step)
        result.push(index);
    } else {
      for (let index = lower; index <= upper; index += step) {
        result.push(index);
      }
    }
  }
  return result;
}
function canonicalList(ce, ops2) {
  const op12 = ops2[0];
  if (ops2.length === 1 && op12.head === "Matrix") {
    const [body, delimiters, columns] = op12.ops;
    if (!delimiters || delimiters.string === "..") {
      if (!columns)
        return ce._fn("Matrix", [body, delimiters]);
      return ce._fn("Matrix", [body, ce.string("[]"), columns]);
    }
  }
  ops2 = ops2.map((op3) => {
    if (op3.head === "Delimiter") {
      if (op3.op1.head === "Sequence")
        return ce.box(["List", ...canonical(op3.op1.ops)]);
      return ce.box(["List", op3.op1?.canonical ?? ce.Nothing]);
    }
    return op3.canonical;
  });
  return ce.box(["List", ...ops2]);
}

// src/compute-engine/library/control-structures.ts
var CONTROL_STRUCTURES_LIBRARY = [
  {
    Block: {
      hold: "all",
      signature: {
        domain: "Functions",
        canonical: canonicalBlock,
        evaluate: evaluateBlock
      }
    },
    If: {
      hold: "rest",
      // Evaluate the condition, but no the true/false branches
      signature: {
        domain: "Functions",
        result: (_ce, ops2) => widen(ops2[0], ops2[1]),
        evaluate: (ce, ops2) => {
          const cond = ops2[0];
          if (cond && cond.symbol === "True")
            return ops2[1] ? ops2[1].evaluate() : ce.Nothing;
          return ops2[2] ? ops2[2].evaluate() : ce.Nothing;
        }
      }
    },
    Loop: {
      hold: "all",
      // Do not evaluate anything
      signature: {
        domain: "Functions",
        evaluate: (ce, ops2) => {
          const body = ops2[0] ?? ce.Nothing;
          if (body.isNothing)
            return body;
          const collection = ops2[1];
          if (collection && isCollection(collection)) {
            let result = void 0;
            const fn = applicable(body);
            let i2 = 0;
            for (const x of each(collection)) {
              result = fn([x]) ?? ce.Nothing;
              if (result.head === "Break")
                return result.op1;
              if (result.head === "Return")
                return result;
              if (i2++ > ce.iterationLimit)
                return ce.error("iteration-limit-exceeded");
            }
          }
          let i = 0;
          while (true) {
            const result = body.evaluate();
            if (result.head === "Break")
              return result.op1;
            if (result.head === "Return")
              return result;
            if (i++ > ce.iterationLimit)
              return ce.error("iteration-limit-exceeded");
          }
        }
      }
    },
    Which: {
      hold: "all",
      signature: {
        domain: "Functions",
        result: (ce, ops2) => domainWhich(ce, ops2),
        evaluate: (ce, ops2) => whichEvaluate(ce, ops2, "evaluate")
      }
    },
    FixedPoint: {
      hold: "all",
      signature: {
        domain: "Functions"
        // @todo
      }
    }
  }
];
function domainWhich(ce, args) {
  let dom = null;
  for (let i = 1; i <= args.length - 1; i += 2)
    dom = widen(dom, args[i].domain);
  return dom ?? ce.domain("NothingDomain");
}
function whichEvaluate(ce, args, mode) {
  let i = 0;
  while (i < args.length - 1) {
    if (args[i].evaluate().symbol === "True") {
      if (!args[i + 1])
        return ce.symbol("Undefined");
      return mode === "N" ? args[i + 1].N() : args[i + 1].evaluate();
    }
    i += 2;
  }
  return ce.symbol("Undefined");
}
function evaluateBlock(ce, ops2) {
  if (ops2.length === 0)
    return ce.Nothing;
  ce.resetContext();
  let result = void 0;
  for (const op3 of ops2) {
    const h = op3.head;
    if (h === "Return") {
      result = op3.op1.evaluate();
      break;
    }
    if (h === "Break" || h === "Continue") {
      result = ce.fn(h, [op3.op1.evaluate()]);
      break;
    }
    result = op3.evaluate();
  }
  return result ?? ce.Nothing;
}
function canonicalBlock(ce, ops2) {
  if (ops2.length === 0)
    return null;
  ce.pushScope();
  const declarations = [];
  const body = [];
  for (const op3 of ops2) {
    if (op3.head === "Declare")
      declarations.push(op3);
    else
      body.push(invalidateDeclare(op3));
  }
  const result = ce._fn("Block", [...declarations, ...body]);
  ce.popScope();
  return result;
}
function invalidateDeclare(expr) {
  if (expr.head === "Declare")
    expr.engine.error("unexpected-declare");
  if (expr.ops)
    return expr.engine._fn(expr.head, expr.ops.map(invalidateDeclare));
  return expr;
}

// src/compute-engine/library/complex.ts
var COMPLEX_LIBRARY = [
  {
    Real: {
      threadable: true,
      complexity: 1200,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        evaluate: (ce, ops2) => {
          const op3 = ops2[0].numericValue;
          if (op3 === null)
            return void 0;
          if (ce.isComplex(op3))
            return ce.number(op3.re);
          return ops2[0];
        }
      }
    },
    Imaginary: {
      threadable: true,
      complexity: 1200,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        evaluate: (ce, ops2) => {
          const op3 = ops2[0].numericValue;
          if (op3 === null)
            return void 0;
          if (ce.isComplex(op3))
            return ce.number(op3.im);
          return ce.Zero;
        }
      }
    },
    Argument: {
      threadable: true,
      complexity: 1200,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        evaluate: (ce, ops2) => {
          const op3 = ops2[0].numericValue;
          if (op3 === null)
            return void 0;
          if (ce.isComplex(op3))
            return ce.number(op3.arg());
          const f = asFloat(ops2[0]);
          if (f === null)
            return void 0;
          if (f >= 0)
            return ce.Zero;
          return ce.number(Math.PI);
        }
      }
    },
    AbsArg: {
      threadable: true,
      complexity: 1200,
      signature: {
        domain: ["FunctionOf", "Numbers", "Tuples"],
        evaluate: (ce, ops2) => {
          const op3 = ops2[0].numericValue;
          if (op3 === null)
            return void 0;
          if (ce.isComplex(op3))
            return ce.tuple([ce.number(op3.abs()), ce.number(op3.arg())]);
          const f = asFloat(ops2[0]);
          if (f === null)
            return void 0;
          return ce.tuple([
            ce.number(Math.abs(f)),
            ce.number(f >= 0 ? 0 : Math.PI)
          ]);
        }
      }
    },
    Conjugate: {
      threadable: true,
      complexity: 1200,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        evaluate: (ce, ops2) => {
          const op3 = ops2[0].numericValue;
          if (op3 === null || !ce.isComplex(op3))
            return void 0;
          return ce.number(op3.conjugate());
        }
      }
    },
    ComplexRoots: {
      threadable: true,
      complexity: 1200,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers", "Lists"],
        evaluate: (ce, ops2) => {
          const x = asFloat(ops2[0]);
          const n = asFloat(ops2[1]);
          if (x === null || n === null || !Number.isInteger(n) || n <= 0)
            return void 0;
          const roots = [];
          const [re, im] = ce.isComplex(x) ? [x.re, x.im] : [x, 0];
          const arg = Math.atan2(im, re);
          const mod2 = Math.sqrt(re * re + im * im);
          for (let k = 0; k < n; k++) {
            const theta = (arg + 2 * Math.PI * k) / n;
            const r = Math.pow(mod2, 1 / n);
            roots.push([r * Math.cos(theta), r * Math.sin(theta)]);
          }
          return ce.box([
            "List",
            ...roots.map(
              (r) => ce.number(r[1] !== 0 ? ce.complex(r[0], r[1]) : r[0])
            )
          ]);
        }
      }
    }
    // For Abs (magnitude) see src/compute-engine/library/processAbs
  }
];

// src/compute-engine/library/linear-algebra.ts
var LINEAR_ALGEBRA_LIBRARY = [
  {
    Matrix: {
      complexity: 9e3,
      hold: "all",
      signature: {
        params: ["Lists"],
        optParams: ["Strings", "Strings"],
        result: "Lists",
        canonical: canonicalMatrix,
        evaluate: (_ce, ops2) => ops2[0].evaluate(),
        N: (_ce, ops2) => ops2[0].N()
      }
    },
    // Vector is a specialized collection to represent a column vector.
    // ["Vector", a, b, c] is a shorthand for ["List", ["List", a], ["List", b], ["List", c]]
    Vector: {
      complexity: 9e3,
      hold: "all",
      signature: {
        restParam: "Anything",
        result: "Lists",
        canonical: (ce, ops2) => {
          return ce._fn("Matrix", [
            ce.box([
              "List",
              ...ce.canonical(ops2).map((op3) => ce.box(["List", op3]))
            ])
          ]);
        }
      }
    }
  },
  {
    // Corresponds to monadic Shape `⍴` in APL
    Shape: {
      complexity: 8200,
      signature: {
        domain: ["FunctionOf", "Values", "Tuples"],
        evaluate: (ce, ops2) => {
          const op12 = ops2[0];
          if (isBoxedTensor(op12))
            return ce.tuple(op12.tensor.shape);
          return ce.tuple([]);
        }
      }
    },
    Rank: {
      complexity: 8200,
      signature: {
        domain: ["FunctionOf", "Values", "Numbers"],
        evaluate: (ce, ops2) => {
          const op12 = ops2[0];
          if (isBoxedTensor(op12))
            return ce.number(op12.tensor.rank);
          return ce.number(0);
        }
      }
    },
    // Corresponds to ArrayReshape in Mathematica
    // and dyadic Shape `⍴` in APL
    Reshape: {
      complexity: 8200,
      signature: {
        domain: ["FunctionOf", "Values", "Tuples", "Values"],
        evaluate: (ce, ops2) => {
          let op12 = ops2[0];
          const shape = ops2[1].ops?.map((op3) => op3.value) ?? [];
          if (!isBoxedTensor(op12) && isFiniteIndexableCollection(op12))
            op12 = ce.box(["List", ...each(op12)]);
          if (isBoxedTensor(op12))
            return op12.tensor.reshape(...shape).expression;
          return void 0;
        }
      }
    },
    // Corresponds to Ravel `,` in APL
    // Also Enlist `∊``⍋` in APL
    Flatten: {
      complexity: 8200,
      signature: {
        domain: ["FunctionOf", "Values", "Values"],
        evaluate: (ce, ops2) => {
          const op12 = ops2[0];
          if (isBoxedTensor(op12))
            return ce.box([
              "List",
              ...op12.tensor.flatten().map((x) => ce.box(x))
            ]);
          if (isFiniteIndexableCollection(op12))
            return ce.box(["List", ...each(op12)]);
          return void 0;
        }
      }
    },
    // Similar to Zip, but has a single argument, a matrix
    // Ex: Transpose([[a, b, c], [1, 2, 3]]) = [[a, 1], [b, 2], [c, 3]]
    Transpose: {
      complexity: 8200,
      signature: {
        domain: [
          "FunctionOf",
          "Values",
          ["OptArg", "Numbers", "Numbers"],
          "Values"
        ],
        evaluate: (ce, ops2) => {
          let op12 = ops2[0];
          let axis1 = 1;
          let axis2 = 2;
          if (ops2.length === 3) {
            axis1 = ops2[1].value;
            axis2 = ops2[2].value;
            console.assert(axis1 > 0 && axis2 > 0);
          }
          if (axis1 === axis2)
            return void 0;
          if (!isBoxedTensor(op12) && isFiniteIndexableCollection(op12))
            op12 = ce.box(["List", ...each(op12)]);
          if (isBoxedTensor(op12)) {
            if (axis1 === 1 && axis2 === 2)
              return op12.tensor.transpose()?.expression;
            else
              return op12.tensor.transpose(axis1, axis2)?.expression;
          }
          return void 0;
        }
      }
    },
    ConjugateTranspose: {
      complexity: 8200,
      signature: {
        domain: ["FunctionOf", "Values", "Values"],
        evaluate: (ce, ops2) => {
          let op12 = ops2[0];
          let axis1 = 1;
          let axis2 = 2;
          if (ops2.length === 3) {
            axis1 = ops2[1].value;
            axis2 = ops2[2].value;
            console.assert(axis1 > 0 && axis2 > 0);
          }
          if (axis1 === axis2)
            return void 0;
          if (isBoxedTensor(op12))
            return op12.tensor.conjugateTranspose(axis1, axis2)?.expression;
          return void 0;
        }
      }
    },
    Determinant: {
      complexity: 8200,
      signature: {
        domain: ["FunctionOf", "Values", "Values"],
        evaluate: (ce, ops2) => {
          const op12 = ops2[0];
          if (isBoxedTensor(op12))
            return op12.tensor.determinant();
          return void 0;
        }
      }
    },
    Inverse: {
      complexity: 8200,
      signature: {
        domain: ["FunctionOf", "Values", "Values"],
        evaluate: (ce, ops2) => {
          const op12 = ops2[0];
          if (isBoxedTensor(op12))
            return op12.tensor.inverse()?.expression;
          return void 0;
        }
      }
    },
    PseudoInverse: {
      complexity: 8200,
      signature: {
        domain: ["FunctionOf", "Values", "Values"],
        evaluate: (ce, ops2) => {
          const op12 = ops2[0];
          if (isBoxedTensor(op12))
            return op12.tensor.pseudoInverse()?.expression;
          return void 0;
        }
      }
    },
    // Adjoint: {
    //   complexity: 8200,
    //   signature: {
    //     domain: ['FunctionOf', 'Values', 'Values'],
    //     evaluate: (ce, ops) => {
    //       const op1 = ops[0];
    //       if (isBoxedTensor(op1)) return op1.adjoint()?.adjugateMatrix();
    //       return undefined;
    //     },
    //   },
    // },
    AdjugateMatrix: {
      complexity: 8200,
      signature: {
        domain: ["FunctionOf", "Values", "Values"],
        evaluate: (ce, ops2) => {
          const op12 = ops2[0];
          if (isBoxedTensor(op12))
            return op12.tensor.adjugateMatrix()?.expression;
          return void 0;
        }
      }
    },
    // Minor: {
    //   complexity: 8200,
    //   signature: {
    //     domain: ['FunctionOf', 'Values', 'Values', 'Values'],
    //     evaluate: (ce, ops) => {
    //       const op1 = ops[0];
    //       // if (isBoxedTensor(op1)) return op1.minor();
    //       return undefined;
    //     },
    //   },
    // },
    Trace: {
      complexity: 8200,
      signature: {
        domain: ["FunctionOf", "Values", "Values"],
        evaluate: (ce, ops2) => {
          const op12 = ops2[0];
          if (isBoxedTensor(op12))
            return op12.tensor.trace();
          return void 0;
        }
      }
    }
  }
];
function canonicalMatrix(ce, ops2, head2 = "Matrix") {
  if (ops2.length === 0)
    return ce._fn(head2, []);
  const body = ops2[0].head === "Vector" ? ops2[0].canonical.ops[0] : ops2[0].canonical;
  const delims = ops2[1]?.canonical;
  const columns = ops2[2]?.canonical;
  if (ops2.length > 3)
    return ce._fn(head2, checkArity(ce, ops2, 3));
  if (columns)
    return ce._fn(head2, [body, delims, columns]);
  if (delims)
    return ce._fn(head2, [body, delims]);
  return ce._fn(head2, [body]);
}

// src/compute-engine/library/logic.ts
var LOGIC_LIBRARY = {
  True: { wikidata: "Q16751793", domain: "Booleans", constant: true },
  False: {
    wikidata: "Q5432619",
    domain: "Booleans",
    constant: true
  },
  // Maybe: {
  //   wikidata: 'Q781546',
  //   domain: 'MaybeBooleans',
  //   constant: true,
  // },
  // @todo: specify a `canonical` function that converts boolean
  // expressions into CNF (Conjunctive Normal Form)
  // https://en.wikipedia.org/wiki/Conjunctive_normal_form
  // using rules (with a rule set that's kinda the inverse of the
  // logic rules for simplify)
  // See also: https://en.wikipedia.org/wiki/Prenex_normal_form
  And: {
    wikidata: "Q191081",
    threadable: true,
    associative: true,
    commutative: true,
    idempotent: true,
    complexity: 1e4,
    signature: {
      domain: "LogicOperators",
      simplify: processAnd,
      evaluate: processAnd
    }
  },
  Or: {
    wikidata: "Q1651704",
    threadable: true,
    associative: true,
    commutative: true,
    idempotent: true,
    complexity: 1e4,
    signature: {
      domain: "LogicOperators",
      simplify: processOr,
      evaluate: processOr
    }
  },
  Not: {
    wikidata: "Q190558",
    threadable: true,
    involution: true,
    complexity: 10100,
    // @todo: this may not be needed, since we also have rules.
    signature: {
      domain: "LogicOperators",
      simplify: processNot,
      evaluate: processNot
    }
  },
  Equivalent: {
    wikidata: "Q220433",
    threadable: true,
    complexity: 10200,
    signature: {
      domain: "LogicOperators",
      canonical: (ce, args) => {
        const lhs = args[0].symbol;
        const rhs = args[1].symbol;
        if (lhs === "True" && rhs === "True" || lhs === "False" && rhs === "False")
          return ce.True;
        if (lhs === "True" && rhs === "False" || lhs === "False" && rhs === "True")
          return ce.False;
        return ce._fn("Equivalent", args);
      },
      simplify: processEquivalent,
      evaluate: processEquivalent
    }
  },
  Implies: {
    wikidata: "Q7881229",
    threadable: true,
    complexity: 10200,
    signature: {
      domain: "LogicOperators",
      simplify: processImplies,
      evaluate: processImplies
    }
  },
  Exists: { signature: { domain: "Functions" } }
};
function processAnd(ce, args) {
  if (args.length === 0)
    return ce.True;
  const ops2 = [];
  for (const arg of args) {
    if (arg.symbol === "False")
      return ce.False;
    if (arg.symbol !== "True") {
      let duplicate = false;
      for (const x of ops2) {
        if (x.isSame(arg)) {
          duplicate = true;
        } else if (arg.head === "Not" && arg.op1.isSame(x) || x.head === "Not" && x.op1.isSame(arg)) {
          return ce.False;
        }
      }
      if (!duplicate)
        ops2.push(arg);
    }
  }
  if (ops2.length === 0)
    return ce.True;
  if (ops2.length === 1)
    return ops2[0];
  return ce._fn("And", ops2);
}
function processOr(ce, args) {
  if (args.length === 0)
    return ce.True;
  const ops2 = [];
  for (const arg of args) {
    if (arg.symbol === "True")
      return ce.True;
    if (arg.symbol !== "False") {
      let duplicate = false;
      for (const x of ops2) {
        if (x.isSame(arg)) {
          duplicate = true;
        } else if (arg.head === "Not" && arg.op1.isSame(x) || x.head === "Not" && x.op1.isSame(arg)) {
          return ce.True;
        }
      }
      if (!duplicate)
        ops2.push(arg);
    }
  }
  if (ops2.length === 0)
    return ce.True;
  if (ops2.length === 1)
    return ops2[0];
  return ce._fn("Or", ops2);
}
function processNot(ce, args) {
  const op12 = args[0]?.symbol;
  if (op12 === "True")
    return ce.False;
  if (op12 === "False")
    return ce.True;
  return void 0;
}
function processEquivalent(ce, args) {
  const lhs = args[0].symbol;
  const rhs = args[1].symbol;
  if (lhs === "True" && rhs === "True" || lhs === "False" && rhs === "False")
    return ce.True;
  if (lhs === "True" && rhs === "False" || lhs === "False" && rhs === "True")
    return ce.False;
  return void 0;
}
function processImplies(ce, args) {
  const lhs = args[0].symbol;
  const rhs = args[1].symbol;
  if (lhs === "True" && rhs === "True" || lhs === "False" && rhs === "False" || lhs === "False" && rhs === "True")
    return ce.True;
  if (lhs === "True" && rhs === "False")
    return ce.False;
  return void 0;
}

// src/compute-engine/library/polynomials.ts
var POLYNOMIALS_LIBRARY = [
  {
    Expand: {
      description: "Expand out products and positive integer powers",
      signature: {
        domain: ["FunctionOf", "Values", "Values"],
        evaluate: (_ce, ops2) => expand2(ops2[0]) ?? ops2[0]
      }
    },
    Distribute: {
      description: "Distribute multiplication over addition",
      signature: {
        domain: ["FunctionOf", "Values", "Values"],
        evaluate: (ce, ops2) => {
          const h = ops2[0].head;
          if (h === "Multiply")
            return distribute(ops2[0].ops) ?? ops2[0];
          if (h === "Negate")
            return distribute([ce.NegativeOne, ...ops2[0].ops]) ?? ops2[0];
          if (h === "Divide" && ops2[0].ops[0].head === "Multiply") {
            const numerator = distribute(ops2[0].ops);
            const denominator = ops2[0].ops[1];
            if (numerator) {
              if (numerator.head === "Add")
                return ce.add(numerator.ops.map((x) => ce.div(x, denominator))).evaluate();
              return ce.div(numerator, denominator).evaluate();
            }
          }
          return ops2[0];
        }
      }
    }
  }
];

// src/compute-engine/library/relational-operator.ts
var RELOP_LIBRARY = {
  Congruent: {
    commutative: false,
    complexity: 11e3,
    numeric: true,
    signature: {
      simplify: (ce, ops2) => {
        if (ops2.length < 3)
          return void 0;
        return ce._fn("Equal", [
          ce.box(["Mod", ops2[0], ops2[2]]).simplify(),
          ce.box(["Mod", ops2[1], ops2[2]]).simplify()
        ]).simplify();
      },
      evaluate: (ce, ops2) => {
        if (ops2.length < 3)
          return void 0;
        const [lhs, rhs, modulo] = ops2;
        const nLhs = lhs.value;
        const nRhs = rhs.value;
        const nModulo = modulo.value;
        if (typeof nLhs !== "number")
          return void 0;
        if (typeof nRhs !== "number")
          return void 0;
        if (typeof nModulo !== "number")
          return void 0;
        return nLhs % nModulo === nRhs % nModulo ? ce.True : ce.False;
      }
    }
  },
  IsSame: {
    description: "Compare two expressions for structural equality",
    hold: "all",
    signature: {
      domain: "RelationalOperators",
      // Since we want to work on non-canonical expressions,
      // do nothing to canonicalize the arguments
      evaluate: (ce, ops2) => {
        if (ops2.length !== 2)
          return void 0;
        let [lhs, rhs] = ops2;
        return lhs.isSame(rhs) === true ? ce.True : ce.False;
      }
    }
  },
  Equal: {
    commutative: true,
    complexity: 11e3,
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, args) => canonicalRelational(ce, "Equal", args),
      evaluate: (ce, ops2) => {
        if (ops2.length < 2)
          return ce.True;
        let lhs = void 0;
        for (const arg of ops2) {
          if (!lhs)
            lhs = arg;
          else {
            const test = lhs.isEqual(arg);
            if (test !== true)
              return ce.False;
          }
        }
        return ce.True;
      }
    }
  },
  NotEqual: {
    wikidata: "Q28113351",
    commutative: true,
    complexity: 11e3,
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, args) => canonicalRelational(ce, "NotEqual", args),
      evaluate: (ce, ops2) => {
        if (ops2.length < 2)
          return ce.False;
        let lhs = void 0;
        for (const arg of ops2) {
          if (!lhs)
            lhs = arg;
          else {
            const test = lhs.isEqual(arg);
            if (test === true)
              return ce.False;
          }
        }
        return ce.True;
      }
    }
  },
  Less: {
    complexity: 11e3,
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, ops2) => canonicalRelational(ce, "Less", ops2),
      evaluate: (ce, ops2) => {
        if (ops2.length < 2)
          return ce.True;
        let lhs = void 0;
        for (const arg of ops2) {
          if (!arg.isNumber)
            return void 0;
          if (!lhs)
            lhs = arg;
          else {
            const test = ce.fn("Subtract", [arg, lhs]).N().sgn;
            if (test === null || test === void 0)
              return void 0;
            if (test <= 0)
              return ce.False;
            lhs = arg;
          }
        }
        return ce.True;
      }
    }
  },
  NotLess: {
    complexity: 11e3,
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, ops2) => ce._fn("Not", [canonicalRelational(ce, "Less", ops2)])
    }
  },
  Greater: {
    complexity: 11e3,
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, ops2) => canonicalRelational(ce, "Less", ops2.reverse()),
      evaluate: (ce, ops2) => {
        if (ops2.length < 2)
          return ce.True;
        let lhs = void 0;
        for (const arg of ops2) {
          if (!arg.isNumber)
            return void 0;
          if (!lhs)
            lhs = arg;
          else {
            const test = ce.fn("Subtract", [arg, lhs]).N().sgn;
            if (test === null || test === void 0)
              return void 0;
            if (test >= 0)
              return ce.False;
            lhs = arg;
          }
        }
        return ce.True;
      }
    }
  },
  NotGreater: {
    complexity: 11e3,
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, args) => ce._fn("Not", [ce._fn("Greater", args)])
    }
  },
  LessEqual: {
    complexity: 11e3,
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, ops2) => canonicalRelational(ce, "LessEqual", ops2),
      evaluate: (ce, ops2) => {
        if (ops2.length < 2)
          return ce.True;
        let lhs = void 0;
        for (const arg of ops2) {
          if (!arg.isNumber)
            return void 0;
          if (!lhs)
            lhs = arg;
          else {
            const test = ce.fn("Subtract", [arg, lhs]).N().sgn;
            if (test === null || test === void 0)
              return void 0;
            if (test < 0)
              return ce.False;
            lhs = arg;
          }
        }
        return ce.True;
      }
    }
  },
  NotLessNotEqual: {
    complexity: 11e3,
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, ops2) => ce._fn("Not", [canonicalRelational(ce, "LessEqual", ops2)])
    }
  },
  GreaterEqual: {
    complexity: 11e3,
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, args) => canonicalRelational(ce, "LessEqual", args.reverse()),
      evaluate: (ce, ops2) => {
        if (ops2.length < 2)
          return ce.True;
        let lhs = void 0;
        for (const arg of ops2) {
          if (!arg.isNumber)
            return void 0;
          if (!lhs)
            lhs = arg;
          else {
            const test = ce.fn("Subtract", [arg, lhs]).N().sgn;
            if (test === null || test === void 0)
              return void 0;
            if (test > 0)
              return ce.False;
            lhs = arg;
          }
        }
        return ce.True;
      }
    }
  },
  NotGreaterNotEqual: {
    complexity: 11e3,
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, args) => ce._fn("Not", [canonicalRelational(ce, "GreaterEqual", args)])
    }
  },
  TildeFullEqual: {
    description: "Indicate isomorphism, congruence and homotopic equivalence",
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, args) => canonicalRelational(ce, "TildeFullEqual", args)
    }
    // @todo evaluate: (ce, ...args: BoxedExpression[]) => SemiBoxedExpression {}
  },
  NotTildeFullEqual: {
    complexity: 11100,
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, args) => ce._fn("Not", [canonicalRelational(ce, "TildeFullEqual", args)])
    }
  },
  TildeEqual: {
    description: "Approximately or asymptotically equal",
    complexity: 11e3,
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, args) => canonicalRelational(ce, "TildeEqual", args)
    }
    // @todo evaluate: (ce, ...args: BoxedExpression[]) => SemiBoxedExpression {}
  },
  NotTildeEqual: {
    complexity: 11100,
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, args) => ce._fn("Not", [canonicalRelational(ce, "TildeEqual", args)])
    }
  },
  Approx: {
    complexity: 11100,
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, args) => canonicalRelational(ce, "Approx", args)
    }
    // @todo evaluate: (ce, ...args: BoxedExpression[]) => SemiBoxedExpression {}
  },
  NotApprox: {
    complexity: 11100,
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, args) => ce._fn("Not", [canonicalRelational(ce, "Approx", args)])
    }
  },
  ApproxEqual: {
    complexity: 11100,
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, args) => canonicalRelational(ce, "ApproxEqual", args)
    }
    // @todo evaluate: (ce, ...args: BoxedExpression[]) => SemiBoxedExpression {}
  },
  NotApproxEqual: {
    complexity: 11100,
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, args) => ce._fn("Not", [canonicalRelational(ce, "ApproxEqual", args)])
    }
  },
  ApproxNotEqual: {
    complexity: 11100,
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, args) => canonicalRelational(ce, "ApproxNotEqual", args)
    }
    // @todo evaluate: (ce, ...args: BoxedExpression[]) => SemiBoxedExpression {}
  },
  NotApproxNotEqual: {
    complexity: 11100,
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, args) => ce._fn("Not", [canonicalRelational(ce, "ApproxNotEqual", args)])
    }
  },
  Precedes: {
    complexity: 11100,
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, args) => canonicalRelational(ce, "Precedes", args)
    }
    // @todo evaluate: (ce, ...args: BoxedExpression[]) => SemiBoxedExpression {}
  },
  NotPrecedes: {
    complexity: 11100,
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, args) => ce._fn("Not", [canonicalRelational(ce, "Precedes", args)])
    }
  },
  Succeeds: {
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, args) => canonicalRelational(ce, "Succeeds", args)
    }
    // @todo evaluate: (ce, ...args: BoxedExpression[]) => SemiBoxedExpression {}
  },
  NotSucceeds: {
    complexity: 11100,
    signature: {
      domain: "RelationalOperators",
      canonical: (ce, args) => ce._fn("Not", [canonicalRelational(ce, "Succeeds", args)])
    }
  }
};
function canonicalRelational(ce, head2, ops2) {
  ops2 = flattenOps(flattenSequence(canonical(ops2)), head2);
  const nestedRelational = [];
  let newOps = [];
  for (const op3 of ops2) {
    if (isRelationalOperator(op3)) {
      nestedRelational.push(op3);
      newOps.push(op3.ops[op3.ops.length - 1]);
    } else
      newOps.push(op3);
  }
  newOps = newOps.map((op3) => checkPure(ce, op3));
  if (nestedRelational.length === 0)
    return ce._fn(head2, newOps);
  return ce._fn("And", [ce._fn(head2, newOps), ...nestedRelational]);
}
function isRelationalOperator(op3) {
  return typeof op3.head === "string" && /Equal|NotEqual|Less|NotLess|Greater|NotGreater|LessEqual|NotLessNotEqual|GreaterEqual|NotGreater|NotEqual|TildeFullEqual|NotTildeFullEqual|TildeEqual|NotTildeEqual|Approx|NotApprox|ApproxEqual|NotApproxEqual|ApproxNotEqual|NotApproxNotEqual|Precedes|NotPrecedes|Succeeds|NotSucceeds/.test(
    op3.head
  );
}

// src/compute-engine/library/sets.ts
var SETS_LIBRARY = {
  //
  // Constants
  //
  EmptySet: {
    domain: "Sets",
    constant: true,
    wikidata: "Q226183"
    // contains: () => false, // @todo not quite true...
    // includes: () => true, // The empty set is a subset of every set
  },
  //
  // Predicates
  //
  Element: {
    complexity: 11200,
    hold: "all",
    signature: {
      domain: "Predicates",
      canonical: (ce, args) => {
        args = checkArity(ce, args, 2);
        if (args.length === 2 && args[0].isValid && isDomain(args[1]))
          return ce._fn("Element", [args[0], ce.domain(args[1])]);
        return ce._fn("Element", args);
      },
      evaluate: (ce, args) => evaluateElement(ce, args)
    }
  },
  NotElement: {
    complexity: 11200,
    hold: "all",
    signature: {
      domain: "Predicates",
      canonical: (ce, args) => ce.fn("Not", [ce.fn("Element", args)])
    }
  },
  Subset: {
    complexity: 11200,
    signature: { domain: "Predicates" }
  },
  NotSubset: {
    complexity: 11200,
    signature: {
      domain: "Predicates",
      canonical: (ce, args) => ce.fn("Not", [ce.fn("Subset", args)])
    }
  },
  Superset: {
    complexity: 11200,
    signature: { domain: "Predicates" }
  },
  SupersetEqual: {
    complexity: 11200,
    signature: { domain: "Predicates" }
  },
  NotSuperset: {
    complexity: 11200,
    signature: {
      domain: "Predicates",
      canonical: (ce, args) => ce.fn("Not", [ce.fn("Superset", args)])
    }
  },
  NotSupersetEqual: {
    complexity: 11200,
    signature: {
      domain: "Predicates",
      canonical: (ce, args) => ce.fn("Not", [ce.fn("SupersetEqual", args)])
    }
  },
  SubsetEqual: {
    complexity: 11200,
    signature: { domain: "Predicates" }
    // evaluate: subsetEqual,
  },
  NotSubsetNotEqual: {
    complexity: 11200,
    signature: {
      domain: "Predicates",
      canonical: (ce, args) => ce.fn("Not", [ce.fn("SubsetEqual", args)])
    }
  },
  //
  // Functions
  //
  CartesianProduct: {
    // Aka the product set, the set direct product or cross product
    // Notation: \times
    wikidata: "Q173740",
    signature: { domain: ["FunctionOf", "Sets", ["VarArg", "Sets"], "Sets"] }
    // evaluate: cartesianProduct,
  },
  Complement: {
    // Return the elements of the first argument that are not in any of
    // the subsequent lists
    wikidata: "Q242767",
    signature: { domain: ["FunctionOf", "Sets", "Sets"] }
  },
  Intersection: {
    // notation: \cap
    wikidata: "Q185837",
    associative: true,
    commutative: true,
    involution: true,
    signature: {
      domain: ["FunctionOf", "Collections", ["VarArg", "Collections"], "Sets"],
      canonical: (ce, args) => {
        if (args.length === 0)
          return ce.symbol("EmptySet");
        if (args.length === 1)
          return ce.symbol("EmptySet");
        return ce._fn("Intersection", args);
      },
      evaluate: intersection
    }
  },
  Union: {
    // Works on set, but can also work on lists
    wikidata: "Q185359",
    associative: true,
    commutative: true,
    involution: true,
    signature: {
      domain: ["FunctionOf", "Collections", ["VarArg", "Collections"], "Sets"],
      canonical: (ce, args) => {
        if (args.length === 0)
          return ce.symbol("EmptySet");
        return ce._fn("Union", args);
      },
      evaluate: union
    }
  },
  // {
  //   name: 'Set',
  //   domain: ['FunctionOf', ['VarArg', 'Anything'], 'Sets'],
  //   // @todo! set has multiple forms
  //   // Set(Sequence)
  //   // Set(Sequence, Condition)
  //   // Set(Set, Condition)
  // }, // disjoint union Q842620 ⊔
  SetMinus: {
    wikidata: "Q18192442",
    signature: {
      domain: ["FunctionOf", "Sets", "Values", "Sets"],
      evaluate: setMinus
    }
  },
  SymmetricDifference: {
    // symmetric difference = disjunctive union  (circled minus)
    /* = Union(Complement(a, b), Complement(b, a) */
    /* Corresponds to XOR in boolean logic */
    wikidata: "Q1147242",
    signature: { domain: ["FunctionOf", "Sets", ["VarArg", "Sets"], "Sets"] }
  }
};
function union(ce, ops2) {
  const elements = [];
  for (const op3 of ops2) {
    if (isFiniteIndexableCollection(op3)) {
      for (const elem of each(op3)) {
        if (elements.every((e) => !e.isEqual(elem)))
          elements.push(elem);
      }
    } else {
      if (elements.every((elem) => !elem.isEqual(op3)))
        elements.push(op3);
    }
  }
  if (elements.length === 0)
    return ce.symbol("EmptySet");
  return ce._fn("Set", elements);
}
function intersection(ce, ops2) {
  let elements = ops2[0].ops ?? [];
  for (const op3 of ops2.slice(1)) {
    if (isFiniteIndexableCollection(op3)) {
      elements = elements.filter(
        (element) => [...each(op3)].some((op4) => element.isEqual(op4))
      );
    } else {
      elements = elements.filter((element) => element.isEqual(op3));
    }
  }
  if (elements.length === 0)
    return ce.symbol("EmptySet");
  return ce._fn("Set", elements);
}
function setMinus(ce, _ops) {
  return ce.symbol("EmptySet");
}
function evaluateElement(ce, ops2) {
  console.assert(ops2.length === 2);
  const [lhs, rhs] = ops2;
  if (rhs.string) {
    if (lhs.string && rhs.string.includes(lhs.string))
      return ce.True;
    return ce.False;
  }
  if (rhs.keys) {
    if (lhs.string) {
      for (const key of rhs.keys)
        if (key === lhs.string)
          return ce.True;
    }
    return ce.False;
  }
  if (rhs.head === "List") {
    if (lhs.head === "List") {
      let found = false;
      for (let i = 0; i < 1 + (rhs.nops - lhs.nops); ++i) {
        found = true;
        for (let j = 0; j < lhs.nops; ++j) {
          if (!rhs.ops[i + j].isEqual(lhs.ops[j])) {
            found = false;
            break;
          }
        }
        if (found)
          return ce.True;
      }
      return ce.False;
    }
    const val = lhs.head === "Hold" ? lhs.op1 : lhs;
    for (const elem of rhs.ops)
      if (val.isEqual(elem))
        return ce.True;
    return ce.False;
  }
  if (isDomain(rhs) && lhs.domain) {
    if (lhs.domain.isCompatible(ce.domain(rhs)))
      return ce.True;
    return ce.False;
  }
  return ce._fn("Element", [lhs, rhs]);
}

// src/compute-engine/library/statistics.ts
var STATISTICS_LIBRARY = [
  {
    // https://towardsdatascience.com/on-average-youre-using-the-wrong-average-geometric-harmonic-means-in-data-analysis-2a703e21ea0?gi=d56d047586c6
    // https://towardsdatascience.com/on-average-youre-using-the-wrong-average-part-ii-b32fcb41527e
    Mean: {
      complexity: 1200,
      threadable: false,
      signature: {
        domain: ["FunctionOf", "Collections", "Numbers"],
        evaluate: (ce, ops2) => {
          let sum2 = 0;
          let count = 0;
          for (const op3 of each(ops2[0])) {
            const v = asFloat(op3);
            if (v === null)
              return void 0;
            sum2 += v;
            count++;
          }
          if (count === 0)
            return ce.NaN;
          return ce.number(sum2 / count);
        }
      }
    },
    Median: {
      complexity: 1200,
      threadable: false,
      signature: {
        domain: ["FunctionOf", "Collections", "Numbers"],
        evaluate: (ce, ops2) => {
          const values = [];
          for (const op3 of each(ops2[0])) {
            const v = asFloat(op3);
            if (v === null)
              return void 0;
            values.push(v);
          }
          if (values.length === 0)
            return ce.NaN;
          values.sort((a, b) => a - b);
          const mid = Math.floor(values.length / 2);
          if (values.length % 2 === 0)
            return ce.number((values[mid - 1] + values[mid]) / 2);
          return ce.number(values[mid]);
        }
      }
    },
    Variance: {
      complexity: 1200,
      threadable: false,
      signature: {
        domain: ["FunctionOf", "Collections", "Numbers"],
        evaluate: (ce, ops2) => {
          let sum2 = 0;
          let sum22 = 0;
          let count = 0;
          for (const op3 of each(ops2[0])) {
            const v = asFloat(op3);
            if (v === null)
              return void 0;
            sum2 += v;
            sum22 += v * v;
            count++;
          }
          if (count === 0)
            return ce.NaN;
          return ce.number((sum22 - sum2 * sum2 / count) / (count - 1));
        }
      }
    },
    StandardDeviation: {
      complexity: 1200,
      threadable: false,
      signature: {
        domain: ["FunctionOf", "Collections", "Numbers"],
        evaluate: (ce, ops2) => {
          let sum2 = 0;
          let sum22 = 0;
          let count = 0;
          for (const op3 of each(ops2[0])) {
            const v = asFloat(op3);
            if (v === null)
              return void 0;
            sum2 += v;
            sum22 += v * v;
            count++;
          }
          if (count === 0)
            return ce.NaN;
          return ce.number(
            Math.sqrt((sum22 - sum2 * sum2 / count) / (count - 1))
          );
        }
      }
    },
    Kurtosis: {
      complexity: 1200,
      threadable: false,
      signature: {
        domain: ["FunctionOf", "Collections", "Numbers"],
        evaluate: (ce, ops2) => {
          let sum2 = 0;
          let sum22 = 0;
          let sum4 = 0;
          let count = 0;
          for (const op3 of each(ops2[0])) {
            const v = asFloat(op3);
            if (v === null)
              return void 0;
            sum2 += v;
            sum22 += v * v;
            sum4 += v * v * v * v;
            count++;
          }
          if (count === 0)
            return ce.NaN;
          const s2 = (sum22 - sum2 * sum2 / count) / (count - 1);
          const s4 = (sum4 - sum22 * sum22 / count) / (count - 1);
          return ce.number((s4 / (s2 * s2) - 3) * (count * (count + 1)) / 6);
        }
      }
    },
    Skewness: {
      complexity: 1200,
      threadable: false,
      signature: {
        domain: ["FunctionOf", "Collections", "Numbers"],
        evaluate: (ce, ops2) => {
          let sum2 = 0;
          let sum22 = 0;
          let sum3 = 0;
          let count = 0;
          for (const op3 of each(ops2[0])) {
            const v = asFloat(op3);
            if (v === null)
              return void 0;
            sum2 += v;
            sum22 += v * v;
            sum3 += v * v * v;
            count++;
          }
          if (count === 0)
            return ce.NaN;
          const s2 = (sum22 - sum2 * sum2 / count) / (count - 1);
          const s3 = (sum3 - sum22 * sum2 / count) / (count - 1);
          return ce.number(s3 / Math.pow(s2, 3 / 2) * Math.sqrt(count * 1));
        }
      }
    },
    Mode: {
      complexity: 1200,
      threadable: false,
      signature: {
        domain: ["FunctionOf", "Collections", "Numbers"],
        evaluate: (ce, ops2) => {
          const values = [];
          for (const op3 of each(ops2[0])) {
            const v = asFloat(op3);
            if (v === null)
              return void 0;
            values.push(v);
          }
          if (values.length === 0)
            return ce.NaN;
          values.sort((a, b) => a - b);
          const counts = {};
          for (const v of values) {
            counts[v] = (counts[v] ?? 0) + 1;
          }
          let max2 = 0;
          let mode = values[0];
          for (const v of values) {
            const c = counts[v];
            if (c > max2) {
              max2 = c;
              mode = v;
            }
          }
          return ce.number(mode);
        }
      }
    },
    Quartiles: {
      complexity: 1200,
      threadable: false,
      signature: {
        domain: ["FunctionOf", "Collections", "Lists"],
        evaluate: (ce, ops2) => {
          const values = [];
          for (const op3 of each(ops2[0])) {
            const v = asFloat(op3);
            if (v === null)
              return void 0;
            values.push(v);
          }
          if (values.length === 0)
            return ce.NaN;
          values.sort((a, b) => a - b);
          const mid = Math.floor(values.length / 2);
          const lower = values.slice(0, mid);
          const upper = values.slice(mid + 1);
          return ce.box([
            "List",
            ce.number(values[mid]),
            ce.number(lower[Math.floor(lower.length / 2)]),
            ce.number(upper[Math.floor(upper.length / 2)])
          ]);
        }
      }
    },
    InterquartileRange: {
      complexity: 1200,
      threadable: false,
      signature: {
        domain: ["FunctionOf", "Collections", "Numbers"],
        evaluate: (ce, ops2) => {
          const values = [];
          for (const op3 of each(ops2[0])) {
            const v = asFloat(op3);
            if (v === null)
              return void 0;
            values.push(v);
          }
          if (values.length === 0)
            return ce.NaN;
          values.sort((a, b) => a - b);
          const mid = Math.floor(values.length / 2);
          const lower = values.slice(0, mid);
          const upper = values.slice(mid + 1);
          return ce.number(
            upper[Math.floor(upper.length / 2)] - lower[Math.floor(lower.length / 2)]
          );
        }
      }
    },
    Erf: {
      complexity: 7500,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        evaluate: (ce, ops2) => {
          const x = asFloat(ops2[0]);
          if (x === null)
            return void 0;
          return ce.number(erf(x));
        }
      }
    },
    Erfc: {
      complexity: 7500,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        evaluate: (ce, ops2) => {
          const x = asFloat(ops2[0]);
          if (x === null)
            return void 0;
          return ce.number(1 - erf(x));
        }
      }
    },
    ErfInv: {
      complexity: 7500,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        evaluate: (ce, ops2) => {
          const x = asFloat(ops2[0]);
          if (x === null)
            return void 0;
          return ce.number(erfInv(x));
        }
      }
    }
  }
];

// src/compute-engine/library/trigonometry.ts
var domainNumberToRealNumber = (_head) => {
  return ["FunctionOf", "Numbers", "ExtendedRealNumbers"];
};
var trigFunction = (_head) => {
  return ["FunctionOf", "Numbers", "Numbers"];
};
var hyperbolicFunction = (_head) => {
  return ["FunctionOf", "Numbers", "Numbers"];
};
var TRIGONOMETRY_LIBRARY = [
  {
    //
    // Constants
    //
    Pi: {
      domain: "TranscendentalNumbers",
      flags: { algebraic: false },
      constant: true,
      holdUntil: "N",
      wikidata: "Q167",
      value: (engine) => bignumPreferred(engine) ? engine._BIGNUM_PI : Math.PI
    }
  },
  {
    Degrees: {
      /* = Pi / 180 */
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        canonical: (ce, ops2) => {
          ops2 = checkNumericArgs(ce, ops2, 1);
          if (ops2.length !== 1)
            return ce._fn("Degrees", ops2);
          const arg = ops2[0];
          if (arg.numericValue === null || !arg.isValid)
            return ce._fn("Degrees", ops2);
          let fArg = asFloat(arg);
          if (fArg !== null) {
            fArg = fArg % 360;
            if (fArg < 0)
              fArg += 360;
            if (Number.isInteger(fArg)) {
              const fRadians = reducedRational([fArg, 180]);
              if (fRadians[0] === 0)
                return ce.number(0);
              if (fRadians[0] === 1 && fRadians[1] === 1)
                return ce.Pi;
              if (fRadians[0] === 1)
                return ce.div(ce.Pi, ce.number(fRadians[1]));
              return ce.mul([ce.number(fRadians), ce.Pi]);
            }
            return ce.mul([ce.div(ce.number(fArg), ce.number(180)), ce.Pi]);
          }
          return ce.div(ce.mul([arg, ce.Pi]), ce.number(180));
        },
        evaluate: (ce, ops2) => ce.mul([ops2[0], ce.div(ce.Pi, ce.number(180))]).evaluate()
      }
    },
    // Hypot: sqrt(x*x + y*y)
    Hypot: {
      threadable: true,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers", "NonNegativeNumbers"],
        simplify: (ce, ops2) => ce.box(["Sqrt", ["Add", ["Square", ops2[0]], ["Square", ops2[1]]]]).simplify(),
        evaluate: [
          "Function",
          ["Sqrt", ["Add", ["Square", "_1"], ["Square", "_2"]]]
        ]
      }
    },
    Sin: {
      complexity: 5e3,
      threadable: true,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        simplify: (ce, ops2) => constructibleValues(ce, "Sin", ops2[0])?.simplify() ?? (complexAllowed(ce) ? ce.box([
          "Divide",
          [
            "Subtract",
            ["Exp", ["Multiply", "ImaginaryUnit", ops2[0]]],
            ["Exp", ["Multiply", "ImaginaryUnit", ["Negate", ops2[0]]]]
          ],
          ["Complex", 0, 2]
        ]).simplify() : void 0),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Sin", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Sin", ops2[0])
      }
    }
  },
  {
    //
    // Basic trigonometric function
    // (may be used in the definition of other functions below)
    //
    Arctan: {
      wikidata: "Q2257242",
      complexity: 5200,
      threadable: true,
      signature: {
        domain: domainNumberToRealNumber("Arctan"),
        simplify: (ce, ops2) => constructibleValues(ce, "Arctan", ops2[0])?.simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Arctan", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Arctan", ops2[0])
      }
    },
    Arctan2: {
      wikidata: "Q776598",
      complexity: 5200,
      threadable: true,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers", "Numbers"],
        N: (_ce, ops2) => apply2N(ops2[0], ops2[1], Math.atan2, (a, b) => Decimal.atan2(a, b))
      }
    },
    Cos: {
      complexity: 5050,
      threadable: true,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        simplify: (ce, ops2) => constructibleValues(ce, "Cos", ops2[0])?.simplify() ?? ce.box(["Sin", ["Add", ops2[0], ["Multiply", "Half", "Pi"]]]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Cos", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Cos", ops2[0])
      }
    },
    Tan: {
      // Range: 'RealNumbers',
      complexity: 5100,
      threadable: true,
      signature: {
        domain: trigFunction("Tan"),
        simplify: (ce, ops2) => constructibleValues(ce, "Tan", ops2[0])?.simplify() ?? ce.box(["Divide", ["Sin", ops2[0]], ["Cos", ops2[0]]]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Tan", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Tan", ops2[0])
      }
    }
    /* converts (x, y) -> (radius, angle) */
    // ToPolarCoordinates: {
    //   domain: 'Functions',
    //   outputDomain: ['TupleOf', 'RealNumbers', 'RealNumbers'],
    // }
  },
  //
  // Functions defined using arithmetic functions or basic
  // trigonometric functions above
  //
  {
    Arcosh: {
      complexity: 6200,
      threadable: true,
      signature: {
        domain: hyperbolicFunction("Arcosh"),
        simplify: (ce, ops2) => constructibleValues(ce, "Arcosh", ops2[0])?.simplify() ?? ce.box([
          "Ln",
          ["Add", ops2[0], ["Sqrt", ["Subtract", ["Square", ops2[0]], 1]]]
        ]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Arcosh", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Arcosh", ops2[0])
      }
    },
    Arcsin: {
      complexity: 5500,
      threadable: true,
      signature: {
        domain: hyperbolicFunction("Arcsin"),
        simplify: (ce, ops2) => constructibleValues(ce, "Arcsin", ops2[0])?.simplify() ?? ce.box([
          "Multiply",
          2,
          [
            "Arctan2",
            ops2[0],
            ["Add", 1, ["Sqrt", ["Subtract", 1, ["Square", ops2[0]]]]]
          ]
        ]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Arcsin", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Arcsin", ops2[0])
      }
    },
    //Note: Arsinh, not ArCsinh
    Arsinh: {
      complexity: 6100,
      threadable: true,
      signature: {
        domain: hyperbolicFunction("Arsinh"),
        simplify: (ce, ops2) => constructibleValues(ce, "Arsinh", ops2[0])?.simplify() ?? ce.box([
          "Ln",
          ["Add", ops2[0], ["Sqrt", ["Add", ["Square", ops2[0]], 1]]]
        ]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Arsinh", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Arsinh", ops2[0])
      }
    },
    Artanh: {
      complexity: 6300,
      threadable: true,
      signature: {
        domain: hyperbolicFunction("Artanh"),
        simplify: (ce, ops2) => constructibleValues(ce, "Artanh", ops2[0])?.simplify() ?? ce.box([
          "Multiply",
          "Half",
          ["Ln", ["Divide", ["Add", 1, ops2[0]], ["Subtract", 1, ops2[0]]]]
        ]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Artanh", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Artanh", ops2[0])
      }
    },
    Cosh: {
      complexity: 6050,
      threadable: true,
      signature: {
        domain: hyperbolicFunction("Cosh"),
        simplify: (ce, ops2) => constructibleValues(ce, "Cosh", ops2[0])?.simplify() ?? ce.box([
          "Multiply",
          "Half",
          ["Add", ["Exp", ops2[0]], ["Exp", ["Negate", ops2[0]]]]
        ]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Cosh", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Cosh", ops2[0])
      }
    },
    Cot: {
      complexity: 5600,
      threadable: true,
      signature: {
        domain: trigFunction("Cot"),
        simplify: (ce, ops2) => constructibleValues(ce, "Cot", ops2[0])?.simplify() ?? ce.box(["Divide", ["Cos", ops2[0]], ["Sin", ops2[0]]]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Cot", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Cot", ops2[0])
      }
    },
    Csc: {
      description: "Cosecant",
      complexity: 5600,
      threadable: true,
      signature: {
        domain: trigFunction("Csc"),
        simplify: (ce, ops2) => constructibleValues(ce, "Csc", ops2[0])?.simplify() ?? ce.box(["Divide", 1, ["Sin", ops2[0]]]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Csc", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Csc", ops2[0])
      }
    },
    /** = sin(z/2)^2 = (1 - cos z) / 2*/
    Haversine: {
      wikidata: "Q2528380",
      threadable: true,
      signature: {
        domain: ["FunctionOf", "ExtendedRealNumbers", "Numbers"],
        evaluate: ["Divide", ["Subtract", 1, ["Cos", "_1"]], 2]
      }
    },
    /** = 2 * Arcsin(Sqrt(z)) */
    InverseHaversine: {
      //  Range ['Interval', [['Negate', 'Pi'], 'Pi'],
      threadable: true,
      signature: {
        domain: ["FunctionOf", "ExtendedRealNumbers", "RealNumbers"],
        evaluate: ["Multiply", 2, ["Arcsin", ["Sqrt", "_1"]]]
      }
    },
    Sec: {
      description: "Secant, inverse of cosine",
      complexity: 5500,
      threadable: true,
      signature: {
        domain: trigFunction("Sec"),
        simplify: (ce, ops2) => constructibleValues(ce, "Sec", ops2[0])?.simplify() ?? ce.box(["Divide", 1, ["Cos", ops2[0]]]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Sec", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Sec", ops2[0])
      }
    },
    Sinh: {
      // Range: ['Interval', -Infinity, Infinity],
      complexity: 6e3,
      threadable: true,
      signature: {
        domain: hyperbolicFunction("Sinh"),
        simplify: (ce, ops2) => constructibleValues(ce, "Sinh", ops2[0])?.simplify() ?? ce.box([
          "Multiply",
          "Half",
          ["Subtract", ["Exp", ops2[0]], ["Exp", ["Negate", ops2[0]]]]
        ]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Sinh", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Sinh", ops2[0])
      }
    }
  },
  {
    Csch: {
      complexity: 6200,
      threadable: true,
      signature: {
        domain: domainNumberToRealNumber("Csch"),
        simplify: (ce, ops2) => constructibleValues(ce, "Csch", ops2[0])?.simplify() ?? ce.box(["Divide", 1, ["Sinh", ops2[0]]]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Csch", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Csch", ops2[0])
      }
    },
    Sech: {
      complexity: 6200,
      threadable: true,
      signature: {
        domain: ["FunctionOf", "Numbers", "Numbers"],
        simplify: (ce, ops2) => constructibleValues(ce, "Sech", ops2[0])?.simplify() ?? ce.box(["Divide", 1, ["Cosh", ops2[0]]]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Sech", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Sech", ops2[0])
      }
    },
    Tanh: {
      // Range: ['Interval', -Infinity, Infinity],
      complexity: 6200,
      threadable: true,
      signature: {
        domain: hyperbolicFunction("Tanh"),
        simplify: (ce, ops2) => constructibleValues(ce, "Tanh", ops2[0])?.simplify() ?? ce.box(["Divide", ["Sinh", ops2[0]], ["Cosh", ops2[0]]]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Tanh", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Tanh", ops2[0])
      }
    }
  },
  {
    Arccos: {
      complexity: 5550,
      threadable: true,
      signature: {
        domain: domainNumberToRealNumber("Arccos"),
        simplify: (ce, ops2) => constructibleValues(ce, "Arccos", ops2[0])?.simplify() ?? ce.box(["Subtract", ["Divide", "Pi", 2], ["Arcsin", ops2[0]]]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Arccos", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Arccos", ops2[0])
      }
    },
    Arccot: {
      numeric: true,
      threadable: true,
      signature: {
        domain: domainNumberToRealNumber("Arccot"),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Arccot", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Arccot", ops2[0])
      }
    },
    Arcoth: {
      numeric: true,
      threadable: true,
      signature: {
        domain: domainNumberToRealNumber("Arcoth"),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Arcoth", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Arcoth", ops2[0])
      }
    },
    Arcsch: {
      numeric: true,
      threadable: true,
      signature: {
        domain: domainNumberToRealNumber("Arcsch"),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Arcsch", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Arcsch", ops2[0])
      }
    },
    Arcsec: {
      numeric: true,
      threadable: true,
      signature: {
        domain: domainNumberToRealNumber("Arcsec"),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Arcsec", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Arcsec", ops2[0])
      }
    },
    Arsech: {
      numeric: true,
      threadable: true,
      signature: {
        domain: domainNumberToRealNumber("Arsech"),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Arsech", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Arsech", ops2[0])
      }
    },
    Arccsc: {
      numeric: true,
      threadable: true,
      signature: {
        domain: domainNumberToRealNumber("Arccsc"),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Arccsc", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Arccsc", ops2[0])
      }
    },
    Coth: {
      complexity: 6300,
      threadable: true,
      signature: {
        domain: hyperbolicFunction("Coth"),
        simplify: (ce, ops2) => constructibleValues(ce, "Coth", ops2[0])?.simplify() ?? ce.box(["Divide", 1, ["Tanh", ops2[0]]]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Coth", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Coth", ops2[0])
      }
    },
    /* converts (radius, angle) -> (x, y) */
    // FromPolarCoordinates: {
    //   domain: 'Function',
    //   outputDomain: ['TupleOf', 'RealNumbers', 'RealNumbers'],
    // },
    InverseFunction: {
      signature: {
        domain: ["FunctionOf", "Functions", "Functions"],
        canonical: (ce, ops2) => {
          ops2 = checkArity(ce, ops2, 1);
          return processInverseFunction(ce, ops2) ?? ce._fn("InverseFunction", ops2);
        },
        simplify: (ce, ops2) => processInverseFunction(ce, ops2),
        evaluate: (ce, ops2) => processInverseFunction(ce, ops2)
      }
    }
  }
];
var S2 = ["Sqrt", 2];
var S3 = ["Sqrt", 3];
var S5 = ["Sqrt", 5];
var S6 = ["Sqrt", 6];
var CONSTRUCTIBLE_VALUES = [
  [
    [0, 1],
    {
      Sin: 0,
      Cos: 1,
      Tan: 0,
      Cot: "ComplexInfinity",
      Sec: 1,
      Csc: "ComplexInfinity"
    }
  ],
  [
    [1, 12],
    {
      Sin: ["Divide", ["Subtract", S6, S2], 4],
      Cos: ["Divide", ["Add", S6, S2], 4],
      Tan: ["Subtract", 2, S3],
      Cot: ["Add", 2, S3],
      Sec: ["Subtract", S6, S2],
      Csc: ["Add", S6, S2]
    }
  ],
  [
    [1, 10],
    {
      Sin: ["Divide", ["Subtract", S5, 1], 4],
      Cos: ["Divide", ["Sqrt", ["Add", 10, ["Multiply", 2, S5]]], 4],
      Tan: ["Divide", ["Sqrt", ["Subtract", 25, ["Multiply", 10, S5]]], 5],
      Cot: ["Sqrt", ["Add", 5, ["Multiply", 2, S5]]],
      Sec: ["Divide", ["Sqrt", ["Subtract", 50, ["Multiply", 10, S5]]], 5],
      Csc: ["Add", 1, S5]
    }
  ],
  [
    [1, 8],
    {
      Sin: "$\\frac{\\sqrt{2-\\sqrt2}}{2}$",
      Cos: "$\\frac{\\sqrt {2+{\\sqrt {2}}}}{2}$",
      Tan: "$\\sqrt{2} - 1$",
      Cot: "$\\sqrt{2} + 1$",
      Sec: "$\\sqrt{ 4 - 2\\sqrt{2}}$",
      Csc: "$\\sqrt{ 4 + 2\\sqrt{2}}$"
    }
  ],
  [
    [1, 6],
    {
      Sin: "$\\frac{1}{2}$",
      Cos: "$\\frac{\\sqrt{3}}{2}$",
      Tan: "$\\frac{\\sqrt{3}}{3}$",
      Cot: "$\\sqrt{3}$",
      Sec: "$\\frac{2\\sqrt{3}}{3}$",
      Csc: 2
    }
  ],
  [
    [1, 5],
    {
      Sin: "$\\frac{\\sqrt{10- 2\\sqrt{5}}} {4}$",
      Cos: "$\\frac{1+ \\sqrt{5}} {4}$",
      Tan: "$\\sqrt{5-2\\sqrt5}$",
      Cot: "$\\frac{\\sqrt{25+10\\sqrt5}} {5}$",
      Sec: "$\\sqrt{5} - 1$",
      Csc: "$\\frac{\\sqrt{50+10\\sqrt{5}}} {5}$"
    }
  ],
  [
    [1, 4],
    {
      Sin: ["Divide", S2, 2],
      Cos: ["Divide", S2, 2],
      Tan: 1,
      Cot: 1,
      Sec: S2,
      Csc: S2
    }
  ],
  [
    [3, 10],
    {
      Sin: "$\\frac{1+ \\sqrt5} {4}$",
      Cos: "$\\frac{\\sqrt{10- 2\\sqrt5}} {4}$",
      Tan: "$\\frac{\\sqrt{25+10\\sqrt5}} {5}$",
      Cot: "$\\sqrt{5-2\\sqrt5}$",
      Sec: "$\\frac{\\sqrt{50+10\\sqrt5}} {5}$",
      Csc: "$\\sqrt5-1$"
    }
  ],
  [
    [1, 3],
    {
      Sin: ["Divide", S3, 2],
      // '$\\frac{\\sqrt{3}}{2}$'
      Cos: "Half",
      // '$\\frac{1}{2}$'
      Tan: S3,
      // '$\\sqrt{3}$'
      Cot: ["Divide", S3, 3],
      // '$\\frac{\\sqrt{3}}{3}$'
      Sec: 2,
      Csc: ["Divide", ["Multiply", 2, S3], 3]
      // '$\\frac{2\\sqrt{3}}{3}$'
    }
  ],
  [
    [3, 8],
    {
      Sin: "$\\frac{ \\sqrt{2 + \\sqrt{2}} } {2}$",
      Cos: "$\\frac{ \\sqrt{2 - \\sqrt{2}} } {2}$",
      Tan: "$\\sqrt{2} + 1$",
      Cot: "$\\sqrt{2} - 1$",
      Sec: "$\\sqrt{ 4 + 2 \\sqrt{2} }$",
      Csc: "$\\sqrt{ 4 - 2 \\sqrt{2} }$"
    }
  ],
  [
    [2, 5],
    {
      Sin: "$\\frac{\\sqrt{10+ 2\\sqrt{5}}} {4}$",
      Cos: "$\\frac{\\sqrt{5}-1} {4}$",
      Tan: "$\\sqrt{5+2\\sqrt{5}}$",
      Cot: "$\\frac{\\sqrt{25-10\\sqrt{5}}} {5}$",
      Sec: "$1 + \\sqrt{5}$",
      Csc: "$\\frac{\\sqrt{50-10\\sqrt{5}}} {5}$"
    }
  ],
  [
    [5, 12],
    {
      Sin: "$\\frac{\\sqrt{6} + \\sqrt{2}} {4}$",
      Cos: "$\\frac{ \\sqrt{6} - \\sqrt{2}} {4}$",
      Tan: "$2+\\sqrt{3}$",
      Cot: "$2-\\sqrt{3}$",
      Sec: "$\\sqrt{6}+\\sqrt{2}$",
      Csc: "$\\sqrt{6} - \\sqrt{2}$"
    }
  ],
  [
    [1, 2],
    {
      Sin: 1,
      Cos: 0,
      Tan: "ComplexInfinity",
      Cot: 0,
      Sec: "ComplexInfinity",
      Csc: 1
    }
  ]
];
var TRIG_IDENTITIES = {
  Sin: [
    [1, "Sin"],
    [1, "Cos"],
    [-1, "Sin"],
    [-1, "Cos"]
  ],
  Cos: [
    [1, "Cos"],
    [-1, "Sin"],
    [-1, "Cos"],
    [1, "Sin"]
  ],
  Sec: [
    [1, "Sec"],
    [-1, "Csc"],
    [-1, "Sec"],
    [1, "Csc"]
  ],
  Csc: [
    [1, "Csc"],
    [1, "Sec"],
    [-1, "Csc"],
    [-1, "Sec"]
  ],
  Tan: [
    [1, "Tan"],
    [-1, "Cot"],
    [1, "Tan"],
    [-1, "Cot"]
  ],
  Cot: [
    [1, "Cot"],
    [-1, "Tan"],
    [1, "Cot"],
    [-1, "Tan"]
  ]
};
function constructibleValues(ce, head2, x) {
  if (!x)
    return void 0;
  const specialValues = ce.cache(
    "constructible-trigonometric-values",
    () => {
      return CONSTRUCTIBLE_VALUES.map(([val, results]) => [
        val,
        Object.fromEntries(
          Object.entries(results).map(([head3, r]) => [
            head3,
            ce.parse(latexString(r)) ?? ce.box(r)
          ])
        )
      ]);
    },
    (cache) => {
      for (const [_k, v] of cache) {
        for (const v2 of Object.values(v))
          v2.reset();
      }
      return cache;
    }
  );
  let theta = asFloat(x.N());
  if (theta === null)
    return void 0;
  const identitySign = head2 !== "Cos" && head2 !== "Sec" ? Math.sign(theta) : 1;
  theta = Math.abs(theta % (2 * Math.PI));
  const quadrant2 = Math.floor(theta * 2 / Math.PI);
  theta = theta % (Math.PI / 2);
  let sign2;
  [sign2, head2] = TRIG_IDENTITIES[head2]?.[quadrant2] ?? [1, head2];
  for (const [[n, d], value] of specialValues) {
    const r = value[head2];
    if (r && ce.chop(theta - Math.PI * n / d) === 0) {
      if (r.symbol === "ComplexInfinity")
        return r;
      return identitySign * sign2 < 0 ? canonicalNegate(r) : r;
    }
  }
  return void 0;
}
function processInverseFunction(ce, xs) {
  if (xs.length !== 1 || !xs[0].isValid)
    return void 0;
  const expr = xs[0];
  const head2 = expr.symbol;
  if (typeof head2 !== "string")
    return void 0;
  if (head2 === "InverseFunction")
    return expr.op1;
  const newHead = {
    Sin: "Arcsin",
    Cos: "Arccos",
    Tan: "Arctan",
    Sec: "Arcsec",
    Csc: " Arccsc",
    Sinh: "Arsinh",
    Cosh: "Arcosh",
    Tanh: "Artanh",
    Sech: "Arcsech",
    Csch: "Arcsch",
    Arcosh: "Cosh",
    Arccos: "Cos",
    Arccsc: "Csc",
    Arcsch: "Csch",
    // '??': 'Cot',
    // '??': 'Coth',
    Arcsec: "Sec",
    Arcsin: "Sin",
    Arsinh: "Sinh",
    Arctan: "Tan",
    Artanh: "Tanh"
  }[head2];
  return newHead ? ce.symbol(newHead) : void 0;
}
function evalTrig(ce, mode, head2, op3) {
  if (!op3)
    return void 0;
  const result = constructibleValues(ce, head2, op3)?.evaluate({
    numericMode: mode === "N"
  });
  if (result)
    return result;
  if (mode === "evaluate" && op3.isExact)
    return void 0;
  switch (head2) {
    case "Arccos":
      return applyN(
        op3,
        Math.acos,
        (x) => x.acos(),
        (x) => x.acos()
      );
    case "Arccot":
      return applyN(
        op3,
        (x) => Math.atan2(1, x),
        (x) => Decimal.atan2(ce._BIGNUM_ONE, x),
        (x) => x.inverse().atan()
      );
    case "Arccsc":
      return applyN(
        op3,
        (x) => Math.asin(1 / x),
        (x) => ce._BIGNUM_ONE.div(x).asin(),
        (x) => x.inverse().asin()
      );
    case "Arcosh":
      return applyN(
        op3,
        Math.acosh,
        (x) => x.acosh(),
        (x) => x.acosh()
      );
    case "Arcoth":
      return applyN(
        op3,
        (x) => x,
        (x) => x.acosh(),
        (x) => x.acosh()
      );
    case "Arcsch":
      return applyN(
        op3,
        (x) => Math.log(1 / x + Math.sqrt(1 / (x * x) + 1)),
        (x) => ce._BIGNUM_ONE.div(x.mul(x)).add(ce._BIGNUM_ONE).sqrt().add(ce._BIGNUM_ONE.div(x)).log(),
        (x) => x.mul(x).inverse().add(1).sqrt().add(x.inverse()).log()
      );
    case "Arcsec":
      return applyN(
        op3,
        (x) => Math.acos(1 / x),
        (x) => ce._BIGNUM_ONE.div(x).acos(),
        (x) => x.inverse().acos()
      );
    case "Arcsin":
      return applyN(
        op3,
        Math.asin,
        (x) => x.asin(),
        (x) => x.asin()
      );
    case "Arsech":
      return applyN(
        op3,
        (x) => Math.log((1 + Math.sqrt(1 - x * x)) / x),
        (x) => ce._BIGNUM_ONE.sub(x.mul(x).add(ce._BIGNUM_ONE).div(x)).log(),
        (x) => ce.complex(1).sub(x.mul(x)).add(1).div(x).log()
      );
    case "Arsinh":
      return applyN(
        op3,
        Math.asinh,
        (x) => x.asinh(),
        (x) => x.asinh()
      );
    case "Arctan":
      return applyN(
        op3,
        Math.atan,
        (x) => x.atan(),
        (x) => x.atan()
      );
    case "Artanh":
      return applyN(
        op3,
        Math.atanh,
        (x) => x.atanh(),
        (x) => x.atanh()
      );
    case "Cos":
      return applyN(
        op3,
        Math.cos,
        (x) => x.toSignificantDigits(ce.precision + 4).cos().toSignificantDigits(ce.precision),
        (x) => x.cos()
      );
    case "Cosh":
      return applyN(
        op3,
        Math.cosh,
        (x) => x.cosh(),
        (x) => x.cosh()
      );
    case "Cot":
      return applyN(
        op3,
        (x) => 1 / Math.tan(x),
        (x) => ce._BIGNUM_ONE.div(x.tan()),
        (x) => x.tan().inverse()
      );
    case "Coth":
      return applyN(
        op3,
        (x) => 1 / Math.tanh(x),
        (x) => ce._BIGNUM_ONE.div(x.tanh()),
        (x) => x.tanh().inverse()
      );
    case "Csc":
      return applyN(
        op3,
        (x) => 1 / Math.sin(x),
        (x) => ce._BIGNUM_ONE.div(x.sin()),
        (x) => x.sin().inverse()
      );
    case "Csch":
      return applyN(
        op3,
        (x) => 1 / Math.sinh(x),
        (x) => ce._BIGNUM_ONE.div(x.sinh()),
        (x) => x.sinh().inverse()
      );
    case "Sec":
      return applyN(
        op3,
        (x) => 1 / Math.cos(x),
        (x) => ce._BIGNUM_ONE.div(x.cos()),
        (x) => x.cos().inverse()
      );
    case "Sech":
      return applyN(
        op3,
        (x) => 1 / Math.cosh(x),
        (x) => ce._BIGNUM_ONE.div(x.cosh()),
        (x) => x.cosh().inverse()
      );
    case "Sin":
      return applyN(
        op3,
        Math.sin,
        (x) => x.toSignificantDigits(ce.precision + 4).sin().toSignificantDigits(ce.precision),
        (x) => x.sin()
      );
    case "Sinh":
      return applyN(
        op3,
        Math.sinh,
        (x) => x.sinh(),
        (x) => x.sinh()
      );
    case "Tan":
      return applyN(
        op3,
        Math.tan,
        (x) => x.toSignificantDigits(ce.precision + 4).tan().toSignificantDigits(ce.precision),
        (x) => x.tan()
      );
    case "Tanh":
      return applyN(
        op3,
        Math.tanh,
        (x) => x.tanh(),
        (x) => x.tanh()
      );
  }
  return void 0;
}

// src/compute-engine/boxed-expression/boxed-symbol-definition.ts
var import_complex18 = __toESM(require_complex(), 1);
var _BoxedSymbolDefinition = class {
  // @todo
  constructor(ce, name, def) {
    if (!ce.context)
      throw Error("No context available");
    this.name = name;
    this.wikidata = def.wikidata;
    this.description = def.description;
    this.url = def.url;
    this._engine = ce;
    this.scope = ce.context;
    this.name = name;
    this._flags = def.flags ? normalizeFlags(def.flags) : void 0;
    this._domain = def.domain ? ce.domain(def.domain) : void 0;
    this.inferredDomain = def.inferred ?? false;
    this.constant = def.constant ?? false;
    this.holdUntil = def.holdUntil ?? "evaluate";
    if (this.constant) {
      this._defValue = def.value;
      this._value = null;
    } else {
      if (def.value) {
        if (isLatexString(def.value))
          this._value = ce.parse(def.value) ?? ce.symbol("Undefined");
        else if (typeof def.value === "function")
          this._value = ce.box(def.value(ce) ?? "Undefined");
        else if (def.value instanceof _BoxedExpression)
          this._value = def.value;
        else
          this._value = ce.box(def.value);
      } else
        this._value = void 0;
      if (!this._value && this._domain && !def.flags)
        this._flags = domainToFlags(this._domain);
    }
    if (this._value && !this._domain) {
      this._domain = this._value.domain;
      this.inferredDomain = true;
    }
  }
  /** The symbol was previously inferred, but now it has a declaration. Update the def accordingly (we can't replace defs, as other expressions may be referencing them) */
  update(def) {
    if (def.wikidata)
      this.wikidata = def.wikidata;
    if (def.description)
      this.description = def.description;
    if (def.url)
      this.url = def.url;
    let flags = def?.flags;
    const domain = def?.domain ? this._engine.domain(def.domain) : void 0;
    if (domain)
      flags = { ...domainToFlags(domain), ...flags ?? {} };
    if (flags)
      this._flags = normalizeFlags(flags);
    if (domain) {
      this._domain = domain;
      this.inferredDomain = false;
    }
    if (def.holdUntil)
      this.holdUntil = def.holdUntil;
    if (def.constant) {
      this.constant = def.constant;
      this._defValue = def.value;
      this._value = null;
    } else {
      if (def.value) {
        if (isLatexString(def.value))
          this._value = this._engine.parse(def.value) ?? this._engine.symbol("Undefined");
        else if (typeof def.value === "function")
          this._value = this._engine.box(
            def.value(this._engine) ?? "Undefined"
          );
        else if (def.value instanceof _BoxedExpression)
          this._value = def.value;
        else
          this._value = this._engine.box(def.value);
      }
    }
    if (this._value && !this._domain) {
      this._domain = this._value.domain;
      this.inferredDomain = true;
    }
  }
  reset() {
    if (this.constant)
      this._value = null;
  }
  get value() {
    if (this._value === null) {
      const ce = this._engine;
      if (isLatexString(this._defValue))
        this._value = ce.parse(this._defValue) ?? ce.symbol("Undefined");
      else if (typeof this._defValue === "function")
        this._value = ce.box(this._defValue(ce) ?? "Undefined");
      else if (this._defValue)
        this._value = ce.box(this._defValue);
      else
        this._value = void 0;
      if (this._value?.numericValue) {
        const val = this._value.numericValue;
        if (!bignumPreferred(ce) && val instanceof Decimal)
          this._value = ce.number(val.toNumber());
        else if (!complexAllowed(ce) && val instanceof import_complex18.Complex)
          this._value = ce.NaN;
      }
    }
    return this._value ?? void 0;
  }
  set value(val) {
    if (this.constant)
      throw new Error(
        `The value of the constant "${this.name}" cannot be changed`
      );
    console.assert(this._defValue === void 0);
    if (typeof val === "number") {
      this._value = this._engine.number(val);
    } else if (val) {
      const newVal = this._engine.box(val);
      if (this.inferredDomain) {
        this._value = newVal;
        this._domain = widen(this._domain, newVal.domain);
      } else if (!this._domain || !newVal.domain || newVal.domain?.isCompatible(this._domain))
        this._value = newVal;
      else
        this._value = void 0;
    } else
      this._value = void 0;
    if (this._value !== void 0)
      this._flags = void 0;
    else
      this._flags = domainToFlags(this._domain);
  }
  get domain() {
    return this._domain ?? void 0;
  }
  set domain(domain) {
    if (this.constant)
      throw new Error(
        `The domain of the constant "${this.name}" cannot be changed`
      );
    if (!this.inferredDomain)
      throw Error(
        `The domain of "${this.name}" cannot be changed because it has already been declared`
      );
    if (!domain) {
      this._defValue = void 0;
      this._value = void 0;
      this._flags = void 0;
      this._domain = void 0;
      return;
    }
    domain = this._engine.domain(domain);
    if (this._domain && !domain.isCompatible(this._domain)) {
      throw Error(
        `The domain of "${this.name}" cannot be widened from "${this._domain.base}" to "${domain.base}"`
      );
    }
    if (this._value?.domain && !this._value.domain.isCompatible(domain))
      throw Error(
        `The domain of "${this.name}" cannot be changed to "${domain.base}" because its value has a domain of "${this._value.domain.base}"`
      );
    this._domain = domain;
    this._flags = void 0;
    if (this._value === void 0 && domain.isNumeric)
      this._flags = domainToFlags(domain);
  }
  //
  // Flags
  //
  get number() {
    return this.value?.isNumber ?? this._flags?.number;
  }
  set number(val) {
    this.updateFlags({ number: val });
  }
  get integer() {
    return this.value?.isInteger ?? this._flags?.integer;
  }
  set integer(val) {
    this.updateFlags({ integer: val });
  }
  get rational() {
    return this.value?.isRational ?? this._flags?.rational;
  }
  set rational(val) {
    this.updateFlags({ rational: val });
  }
  get algebraic() {
    return this.value?.isAlgebraic ?? this._flags?.algebraic;
  }
  set algebraic(val) {
    this.updateFlags({ algebraic: val });
  }
  get real() {
    return this.value?.isReal ?? this._flags?.real;
  }
  set real(val) {
    this.updateFlags({ real: val });
  }
  get extendedReal() {
    return this.value?.isExtendedReal ?? this._flags?.extendedReal;
  }
  set extendedReal(val) {
    this.updateFlags({ extendedReal: val });
  }
  get complex() {
    return this.value?.isComplex ?? this._flags?.complex;
  }
  set complex(val) {
    this.updateFlags({ complex: val });
  }
  get extendedComplex() {
    return this.value?.isExtendedComplex ?? this._flags?.extendedComplex;
  }
  set extendedComplex(val) {
    this.updateFlags({ extendedComplex: val });
  }
  get imaginary() {
    return this.value?.isImaginary ?? this._flags?.imaginary;
  }
  set imaginary(val) {
    this.updateFlags({ imaginary: val });
  }
  get positive() {
    return this.value?.isPositive ?? this._flags?.positive;
  }
  set positive(val) {
    this.updateFlags({ positive: val });
  }
  get nonPositive() {
    return this.value?.isNonPositive ?? this._flags?.nonPositive;
  }
  set nonPositive(val) {
    this.updateFlags({ nonPositive: val });
  }
  get negative() {
    return this.value?.isNegative ?? this._flags?.negative;
  }
  set negative(val) {
    this.updateFlags({ negative: val });
  }
  get nonNegative() {
    return this.value?.isNonNegative ?? this._flags?.nonNegative;
  }
  set nonNegative(val) {
    this.updateFlags({ nonNegative: val });
  }
  get zero() {
    return this.value?.isZero ?? this._flags?.zero;
  }
  set zero(val) {
    this.updateFlags({ zero: val });
  }
  get notZero() {
    return this.value?.isNotZero ?? this._flags?.notZero;
  }
  set notZero(val) {
    this.updateFlags({ notZero: val });
  }
  get one() {
    return this.value?.isOne ?? this._flags?.one;
  }
  set one(val) {
    this.updateFlags({ one: val });
  }
  get negativeOne() {
    return this.value?.isNegativeOne ?? this._flags?.negativeOne;
  }
  set negativeOne(val) {
    this.updateFlags({ negativeOne: val });
  }
  get infinity() {
    return this.value?.isInfinity ?? this._flags?.infinity;
  }
  set infinity(val) {
    this.updateFlags({ infinity: val });
  }
  get finite() {
    return this.value?.isFinite ?? this._flags?.finite;
  }
  set finite(val) {
    this.updateFlags({ finite: val });
  }
  get NaN() {
    return this.value?.isNaN ?? this._flags?.NaN;
  }
  set NaN(val) {
    this.updateFlags({ NaN: val });
  }
  get even() {
    return this.value?.isEven ?? this._flags?.even;
  }
  set even(val) {
    this.updateFlags({ even: val });
  }
  get odd() {
    return this.value?.isOdd ?? this._flags?.odd;
  }
  set odd(val) {
    this.updateFlags({ odd: val });
  }
  get prime() {
    const val = this._value;
    if (val) {
      if (!val.isInteger || val.isNonPositive)
        return false;
      return isPrime(asFloat(val) ?? NaN);
    }
    return this._flags?.prime;
  }
  set prime(val) {
    this.updateFlags({ prime: val });
  }
  get composite() {
    const val = this._value;
    if (val) {
      if (!val.isInteger || val.isNonPositive)
        return false;
      return !isPrime(asFloat(val) ?? NaN);
    }
    return this._flags?.composite;
  }
  set composite(val) {
    this.updateFlags({ composite: val });
  }
  updateFlags(flags) {
    if (this.constant)
      throw Error("The flags of constant cannot be changed");
    if (this.domain?.isNumeric === false)
      throw Error("Flags only apply to numeric domains");
    let flagCount = 0;
    let consistent = true;
    for (const flag in Object.keys(flags)) {
      flagCount += 1;
      if (this._value && flags[flag] !== void 0) {
        switch (flag) {
          case "number":
            consistent = this._value.isNumber === flags.number;
            break;
          case "integer":
            consistent = this._value.isInteger === flags.integer;
            break;
          case "rational":
            consistent = this._value.isRational === flags.rational;
            break;
          case "algebraic":
            consistent = this._value.isAlgebraic === flags.algebraic;
            break;
          case "real":
            consistent = this._value.isReal === flags.real;
            break;
          case "extendedReal":
            consistent = this._value.isExtendedReal === flags.extendedReal;
            break;
          case "complex":
            consistent = this._value.isComplex === flags.complex;
            break;
          case "extendedComplex":
            consistent = this._value.isExtendedComplex === flags.extendedComplex;
            break;
          case "imaginary":
            consistent = this._value.isImaginary === flags.imaginary;
            break;
          case "positive":
            consistent = this._value.isPositive === flags.positive;
            break;
          case "nonPositive":
            consistent = this._value.isNonPositive === flags.nonPositive;
            break;
          case "negative":
            consistent = this._value.isNegative === flags.negative;
            break;
          case "nonNegative":
            consistent = this._value.isNonNegative === flags.nonNegative;
            break;
          case "zero":
            consistent = this._value.isZero === flags.zero;
            break;
          case "notZero":
            consistent = this._value.isNotZero === flags.notZero;
            break;
          case "one":
            consistent = this._value.isOne === flags.one;
            break;
          case "negativeOne":
            consistent = this._value.isNegativeOne === flags.negativeOne;
            break;
          case "infinity":
            consistent = this._value.isInfinity === flags.infinity;
            break;
          case "NaN":
            consistent = this._value.isNaN === flags.NaN;
            break;
          case "finite":
            consistent = this._value.isFinite === flags.finite;
            break;
          case "even":
            consistent = this._value.isEven === flags.even;
            break;
          case "odd":
            consistent = this._value.isOdd === flags.odd;
            break;
          case "prime":
            consistent = this._value.isPrime === flags.prime;
            break;
          case "composite":
            consistent = this._value.isComposite === flags.composite;
            break;
        }
      }
    }
    if (flagCount > 0) {
      if (!consistent) {
        this._defValue = void 0;
        this._value = void 0;
      }
      this._domain = this._engine.Numbers;
      if (!this._flags)
        this._flags = normalizeFlags(flags);
      else
        this._flags = { ...this._flags, ...normalizeFlags(flags) };
    }
  }
};
function definedKeys(xs) {
  return Object.fromEntries(
    Object.entries(xs).filter(([_k, v]) => v !== void 0)
  );
}
function normalizeFlags(flags) {
  const result = { ...flags };
  if (flags.zero || flags.one || flags.negativeOne) {
    result.zero = flags.zero && !flags.one && !flags.negativeOne;
    result.notZero = !flags.zero || flags.one || flags.negativeOne;
    result.one = flags.one && !flags.zero && !flags.negativeOne;
    result.negativeOne = flags.negativeOne && !flags.zero && !flags.one;
    result.infinity = false;
    result.NaN = false;
    result.finite = true;
    result.integer = true;
    result.finite = true;
    result.infinity = false;
    result.NaN = false;
    result.even = flags.one;
    result.odd = !flags.one;
    result.prime = false;
    result.composite = false;
  }
  if (result.zero) {
    result.positive = false;
    result.negative = false;
    result.nonPositive = true;
    result.nonNegative = true;
  }
  if (result.notZero === true) {
    if (!result.imaginary)
      result.real = true;
    result.zero = false;
  }
  if (result.one) {
    result.positive = true;
  }
  if (result.negativeOne) {
    result.nonPositive = true;
  }
  if (result.positive || result.nonNegative) {
    result.negativeOne = false;
  }
  if (result.positive) {
    result.nonPositive = false;
    result.negative = false;
    result.nonNegative = true;
  } else if (result.nonPositive) {
    result.positive = false;
    result.negative = result.notZero;
    result.nonNegative = !result.zero;
  } else if (result.negative) {
    result.positive = false;
    result.nonPositive = result.notZero;
    result.nonNegative = false;
  } else if (result.nonNegative) {
    result.positive = result.notZero;
    result.nonPositive = !result.zero;
    result.negative = false;
  }
  if (result.positive || result.negative || result.nonPositive || result.nonNegative) {
    result.number = true;
    if (result.finite)
      result.real = true;
    else if (!result.finite)
      result.complex = true;
    result.imaginary = false;
  }
  if (result.finite) {
    result.number = true;
    result.complex = true;
    result.infinity = false;
    result.NaN = false;
  }
  if (result.infinity) {
    result.finite = false;
    result.NaN = false;
  }
  if (result.infinity === false) {
    result.extendedComplex = false;
    result.extendedReal = false;
  }
  if (flags.even)
    result.odd = false;
  if (flags.odd)
    result.even = false;
  if (result.integer)
    result.rational = true;
  if (result.rational)
    result.algebraic = true;
  if (result.algebraic)
    result.real = true;
  if (result.real)
    result.complex = true;
  if (result.imaginary)
    result.complex = true;
  if (result.complex)
    result.number = true;
  if (result.real && result.infinity !== false)
    result.extendedReal = true;
  if (result.complex && result.infinity !== false)
    result.extendedComplex = true;
  if (result.even || result.infinity || result.NaN || result.negative || result.imaginary || result.integer === false)
    result.prime = false;
  if (result.number && result.prime)
    result.composite = false;
  return result;
}
function domainToFlags(dom) {
  if (!dom)
    return {};
  const result = {};
  if (!dom.isNumeric) {
    result.number = false;
    result.integer = false;
    result.rational = false;
    result.algebraic = false;
    result.real = false;
    result.extendedReal = false;
    result.complex = false;
    result.extendedComplex = false;
    result.imaginary = false;
    result.positive = false;
    result.nonPositive = false;
    result.negative = false;
    result.nonNegative = false;
    result.zero = false;
    result.notZero = false;
    result.one = false;
    result.negativeOne = false;
    result.infinity = false;
    result.NaN = false;
    result.odd = false;
    result.even = false;
    result.prime = false;
    result.composite = false;
    return result;
  }
  const base = dom.base;
  result.number = true;
  if (base === "Integers")
    result.integer = true;
  if (base === "RationalNumbers")
    result.rational = true;
  if (base === "AlgebraicNumbers")
    result.algebraic = true;
  if (base === "TranscendentalNumbers") {
    result.algebraic = false;
    result.real = true;
  }
  if (base === "ExtendedRealNumbers")
    result.extendedReal = true;
  if (base === "RealNumbers")
    result.real = true;
  if (base === "ImaginaryNumbers")
    result.imaginary = true;
  if (base === "ExtendedComplexNumbers")
    result.extendedComplex = true;
  if (base === "ComplexNumbers")
    result.complex = true;
  if (base === "PositiveNumbers") {
    result.notZero = true;
    result.real = true;
    result.positive = true;
  }
  if (base === "NegativeNumbers") {
    result.notZero = true;
    result.real = true;
    result.negative = true;
  }
  if (base === "NonNegativeNumbers") {
    result.real = true;
    result.positive = true;
  }
  if (base === "NonPositiveNumbers") {
    result.real = true;
    result.negative = true;
  }
  if (base === "PositiveIntegers") {
    result.notZero = true;
    result.integer = true;
    result.positive = true;
  }
  if (base === "NegativeNumbers") {
    result.notZero = true;
    result.integer = true;
    result.negative = true;
  }
  if (base === "NonNegativeNumbers") {
    result.integer = true;
    result.positive = true;
  }
  if (base === "NonPositiveNumbers") {
    result.integer = true;
    result.negative = true;
  }
  return definedKeys(normalizeFlags(result));
}

// src/compute-engine/boxed-expression/boxed-function-definition.ts
var _BoxedFunctionDefinition = class {
  constructor(ce, name, def) {
    if (!ce.context)
      throw Error("No context available");
    this.engine = ce;
    this.scope = ce.context;
    const idempotent = def.idempotent ?? false;
    const involution = def.involution ?? false;
    if (idempotent && involution)
      throw new Error(
        `Function Definition "${name}": the 'idempotent' and 'involution' flags are mutually exclusive`
      );
    this.name = name;
    this.description = def.description;
    this.wikidata = def.wikidata;
    this.threadable = def.threadable ?? false;
    this.associative = def.associative ?? false;
    this.commutative = def.commutative ?? false;
    this.idempotent = idempotent;
    this.involution = involution;
    this.inert = def.inert ?? false;
    this.numeric = def.numeric ?? false;
    this.pure = def.pure ?? true;
    this.complexity = def.complexity ?? DEFAULT_COMPLEXITY;
    this.hold = def.hold ?? "none";
    if (def.at)
      this.at = def.at;
    if (def.iterator)
      this.iterator = def.iterator;
    if (def.size)
      this.size = def.size;
    if (def.keys)
      this.keys = def.keys;
    if (def.indexOf)
      this.indexOf = def.indexOf;
    if (def.at && !def.size) {
      this.size = (expr) => {
        const at2 = def.at;
        let i = 0;
        while (at2(expr, i) !== void 0)
          i++;
        return i;
      };
    }
    if (def.at && !def.iterator) {
      this.iterator = (expr, start = 1, count = -1) => {
        const at2 = def.at;
        let i = start;
        return {
          next() {
            if (count >= 0 && i >= start + count)
              return { done: true, value: void 0 };
            const result = at2(expr, i);
            if (result === void 0)
              return { done: true, value: void 0 };
            i++;
            return { done: false, value: result };
          }
        };
      };
    }
    if (this.iterator && !def.indexOf) {
      this.indexOf = (expr, target) => {
        let i = 1;
        const iterator2 = this.iterator(expr);
        let result = iterator2.next();
        while (!result.done) {
          if (target.isEqual(result.value))
            return i;
          i++;
          result = iterator2.next();
        }
        return void 0;
      };
    }
    if (this.inert) {
      if (def.hold)
        throw Error(
          `Function Definition "${name}": an inert function should not have a hold`
        );
      this.hold = "rest";
      if (def.signature) {
        const sig = def.signature;
        if ("simplify" in sig || "evaluate" in sig || "N" in sig || "evalDimension" in sig || "sgn" in sig || "compile" in sig)
          throw Error(
            `Function Definition "${name}": an inert function should only have 'canonical' or 'codomain' handlers`
          );
      }
      if (this.threadable)
        throw Error(
          `Function Definition "${name}": an inert function should not be threadable`
        );
      if (this.associative)
        throw Error(
          `Function Definition "${name}": an inert function should not be associative`
        );
      if (this.commutative)
        throw Error(
          `Function Definition "${name}": an inert function should not be commutative`
        );
      if (this.idempotent)
        throw Error(
          `Function Definition "${name}": an inert function should not be idempotent`
        );
      if (this.involution)
        throw Error(
          `Function Definition "${name}": an inert function should not be involution`
        );
      if (!this.pure)
        throw Error(
          `Function Definition "${name}": an inert function should be pure`
        );
    }
    if (def.signature) {
      const sig = def.signature;
      let params;
      let optParams;
      let restParam;
      let result;
      let inferredSignature = false;
      if (sig.domain) {
        const domain = ce.domain(sig.domain);
        if (!domain.isValid)
          throw Error(
            `Function Definition "${name}": invalid domain ${JSON.stringify(
              sig.domain
            )}`
          );
        [params, optParams, restParam, result] = functionDomain(
          ce.domain(domain)
        );
      } else if (sig.params || sig.result) {
        params = sig.params?.map((x) => ce.domain(x)) ?? [];
        optParams = sig.optParams?.map((x) => ce.domain(x)) ?? [];
        restParam = sig.restParam ? ce.domain(sig.restParam) : void 0;
        if (typeof sig.result === "function")
          result = sig.result;
        else if (sig.result)
          result = ce.domain(sig.result);
        else if (def.numeric)
          result = ce.Numbers;
        else
          result = ce.Anything;
      } else if (def.numeric) {
        inferredSignature = true;
        params = [];
        optParams = [];
        restParam = ce.Numbers;
        result = ce.Numbers;
      } else {
        inferredSignature = true;
        params = [];
        optParams = [];
        restParam = ce.Anything;
        result = ce.Anything;
      }
      let evaluate = void 0;
      if (sig.evaluate && typeof sig.evaluate !== "function") {
        const boxedFn = ce.box(sig.evaluate, { canonical: false });
        if (!boxedFn.isValid)
          throw Error(`Invalid function ${boxedFn.toString()}`);
        const fn = applicable(boxedFn);
        evaluate = (_ce, xs) => fn(xs);
        evaluate.toString = () => boxedFn.toString();
      } else
        evaluate = sig.evaluate;
      this.signature = {
        inferredSignature,
        params,
        optParams,
        restParam: restParam ? restParam : void 0,
        result,
        canonical: sig.canonical,
        simplify: sig.simplify,
        evaluate,
        N: sig.N,
        evalDimension: sig.evalDimension,
        sgn: sig.sgn,
        compile: sig.compile
      };
    } else if (def.numeric) {
      this.signature = {
        inferredSignature: true,
        params: [],
        optParams: [],
        restParam: ce.Numbers,
        result: ce.Numbers
      };
    } else {
      this.signature = {
        inferredSignature: true,
        params: [],
        optParams: [],
        restParam: ce.Anything,
        result: ce.Anything
      };
    }
  }
  reset() {
    return;
  }
};
function makeFunctionDefinition(engine, name, def) {
  if (def instanceof _BoxedFunctionDefinition)
    return def;
  return new _BoxedFunctionDefinition(engine, name, def);
}

// src/compute-engine/library/library.ts
function getStandardLibrary(categories) {
  if (categories === "all") {
    return getStandardLibrary([
      "core",
      "control-structures",
      // If, Block, Loop
      "logic",
      "collections",
      // Dictionary, List, Sets
      "relop",
      "numeric",
      "arithmetic",
      "trigonometry",
      "algebra",
      "calculus",
      // D, Integerate
      "polynomials",
      "combinatorics",
      "linear-algebra",
      "statistics",
      "dimensions",
      "units",
      "physics",
      "other"
    ]);
  } else if (typeof categories === "string")
    categories = [categories];
  const result = [];
  for (const category of categories) {
    const dict = LIBRARIES[category];
    if (!dict)
      throw Error(`Unknown library category ${category}`);
    if (Array.isArray(dict))
      result.push(...dict);
    else
      result.push(dict);
  }
  return Object.freeze(result);
}
var LIBRARIES = {
  "algebra": [],
  // 'algebra': [
  //   // polynomial([0, 2, 0, 4]:list, x:symbol) -> 2x + 4x^3
  //   // polynomial(2x + 4x^3, x) -> {0, 2, 0, 4}
  //   // rational(2x + 4x^3, {3, 1}, x) -> (2x + 4x^3)/(3+x)
  //   // https://reference.wolfram.com/language/tutorial/AlgebraicCalculations.html
  //   // simplify-trig (macsyma)
  //   //  - trigReduce, trigExpand, trigFactor, trigToExp (mathematica)
  //   // Mathematica:
  //   // - distribute -> (a+b)(c+d) -> ac+ ad+ bc+ bd (doesn't have to be multiply,
  //   // f(a+b, c+d) -> f(a, c) + f(a, d) + f(b, c) + f(b, d)
  //   // -- distribute(expr, over=add, with=multiply)
  //   // https://reference.wolfram.com/language/ref/Distribute.html
  //   // - expand, expand-all
  //   // - factor
  //   // - simplify
  // ],
  "arithmetic": [...ARITHMETIC_LIBRARY, ...COMPLEX_LIBRARY],
  "calculus": CALCULUS_LIBRARY,
  "collections": [SETS_LIBRARY, COLLECTIONS_LIBRARY, domainSetsLibrary()],
  "combinatorics": [],
  // @todo fibonacci, binomial, etc...
  "control-structures": CONTROL_STRUCTURES_LIBRARY,
  "core": CORE_LIBRARY,
  "dimensions": [],
  // @todo // volume, speed, area
  "domains": [],
  // 'domains': getDomainsDictionary(),
  "linear-algebra": LINEAR_ALGEBRA_LIBRARY,
  "logic": LOGIC_LIBRARY,
  "numeric": [],
  // @todo   // 'numeric': [
  "other": [],
  "relop": RELOP_LIBRARY,
  "polynomials": POLYNOMIALS_LIBRARY,
  "physics": {
    Mu0: {
      description: "Vaccum permeability",
      constant: true,
      wikidata: "Q1515261",
      domain: "RealNumbers",
      value: 125663706212e-17
      // unit: ['Divide', 'N', ['Square', 'A']],
    }
  },
  "statistics": STATISTICS_LIBRARY,
  "trigonometry": TRIGONOMETRY_LIBRARY,
  "units": []
  // @todo see also "dimensions"
};
function validateDefinitionName(name) {
  name = name.normalize();
  if (isValidIdentifier(name))
    return name;
  throw new Error(
    `Invalid definition name "${name}": ${validateIdentifier(name)}`
  );
}
function setIdentifierDefinitions(engine, table) {
  var _a;
  if (!engine.context)
    throw Error("No context available");
  (_a = engine.context).ids ?? (_a.ids = /* @__PURE__ */ new Map());
  const idTable = engine.context.ids;
  if (!engine.strict) {
  }
  for (let [name, entry] of Object.entries(table)) {
    name = validateDefinitionName(name);
    if (isFunctionDefinition(entry)) {
      const def = makeFunctionDefinition(engine, name, entry);
      if (idTable.has(name))
        throw new Error(
          `Duplicate function definition ${name}:
${JSON.stringify(
            idTable.get(name)
          )}
${JSON.stringify(entry)}`
        );
      idTable.set(name, def);
    } else if (isSymbolDefinition(entry)) {
      const def = new _BoxedSymbolDefinition(engine, name, entry);
      if (engine.strict && entry.wikidata) {
        for (const [_, d] of idTable) {
          if (d.wikidata === entry.wikidata)
            throw new Error(
              `Duplicate entries with wikidata "${entry.wikidata}": "${name}" and "${d.name}"`
            );
        }
      }
      if (idTable.has(name))
        throw new Error(`Duplicate symbol definition "${name}"`);
      idTable.set(name, def);
    } else {
      const def = new _BoxedSymbolDefinition(engine, name, {
        value: engine.box(entry)
      });
      console.assert(def);
      idTable.set(name, def);
    }
  }
}
function isSymbolDefinition(def) {
  if (def === void 0 || def === null || typeof def !== "object")
    return false;
  if (def instanceof _BoxedExpression)
    return false;
  return "domain" in def || "value" in def || "constant" in def;
}
function isFunctionDefinition(def) {
  if (def === void 0 || def === null || typeof def !== "object")
    return false;
  if (def instanceof _BoxedExpression)
    return false;
  return "signature" in def || "complexity" in def;
}

// src/compute-engine/cost-function.ts
var import_complex20 = __toESM(require_complex(), 1);
function numericCostFunction(n) {
  if (Number.isInteger(n) && n !== 0) {
    return Math.floor(Math.log2(Math.abs(n)) / Math.log2(10)) + (n > 0 ? 1 : 2);
  }
  return 2;
}
function costFunction(expr) {
  if (expr.symbol)
    return 1;
  const num = expr.numericValue;
  if (num !== null) {
    if (expr.isZero)
      return 1;
    if (expr.isInteger)
      return numericCostFunction(asFloat(expr));
    if (isRational(num)) {
      if (isMachineRational(num))
        return numericCostFunction(num[0]) + numericCostFunction(num[1]) + 1;
      else
        return numericCostFunction(Number(num[0])) + numericCostFunction(Number(num[1])) + 1;
    }
    if (num instanceof import_complex20.Complex)
      return numericCostFunction(num.re) + numericCostFunction(num.im) + 1;
    if (expr.isNumber)
      return 2;
  }
  const head2 = expr.head;
  let headCost = 2;
  if (typeof head2 === "string") {
    if (["Add", "Divide"].includes(head2))
      headCost = 3;
    else if (["Subtract", "Negate"].includes(head2))
      headCost = 4;
    else if (["Square", "Sqrt", "Multiply", "Root"].includes(head2))
      headCost = 5;
    else if (["Power"].includes(head2))
      headCost = 6;
    else if (["Ln", "Exp", "Log"].includes(head2))
      headCost = 7;
    else if ([
      "Arcsin",
      "Arccos",
      "Arctan",
      "Arcsec",
      " Arccsc",
      "Arsinh",
      "Arcosh",
      "Artanh",
      "Arcsech",
      "Arcsch",
      "Cosh",
      "Cos",
      "Csc",
      "Csch",
      // '??': 'Cot',
      // '??': 'Coth',
      "Sec",
      "Sin",
      "Sinh",
      "Tan",
      "Tanh"
    ].includes(head2))
      headCost = 9;
    else
      headCost = 10;
  } else
    headCost = costFunction(head2);
  return headCost + (expr.ops?.reduce((acc, x) => acc + costFunction(x), 0) ?? 0);
}
var DEFAULT_COST_FUNCTION = costFunction;

// src/compute-engine/boxed-expression/expression-map.ts
var ExpressionMap = class _ExpressionMap {
  constructor(source) {
    if (!source) {
      this._items = /* @__PURE__ */ new Map();
    } else if (source instanceof _ExpressionMap) {
      this._items = new Map(source._items);
    } else {
      this._items = new Map(
        source
      );
    }
  }
  has(expr) {
    for (const x of this._items.keys())
      if (x.isSame(expr))
        return true;
    return false;
  }
  get(expr) {
    for (const [x, v] of this._items)
      if (x.isSame(expr))
        return v;
    return void 0;
  }
  clear() {
    this._items.clear();
  }
  set(expr, value) {
    for (const x of this._items.keys()) {
      if (x.isSame(expr)) {
        this._items.set(x, value);
        return;
      }
    }
    this._items.set(expr, value);
  }
  delete(expr) {
    this._items.delete(expr);
  }
  [Symbol.iterator]() {
    return this._items.entries();
  }
  entries() {
    return this._items.entries();
  }
};

// src/common/utils.ts
function permutations(xs) {
  const result = [];
  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice();
        const next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };
  permute(xs);
  return result;
}

// src/compute-engine/boxed-expression/boxed-patterns.ts
var BoxedPattern = class _BoxedPattern extends _BoxedExpression {
  constructor(ce, pattern, metadata) {
    super(ce, metadata);
    this._pattern = isLatexString(pattern) ? ce.parse(pattern, { canonical: false }) : ce.box(pattern, { canonical: false });
  }
  get hash() {
    return hashCode("Pattern") ^ this._pattern.hash;
  }
  reset() {
    this._pattern.reset();
  }
  get json() {
    return serializeJsonFunction(this.engine, "Pattern", [this._pattern]);
  }
  get head() {
    return "Pattern";
  }
  get domain() {
    return this.engine.domain("Values");
  }
  get isCanonical() {
    return true;
  }
  set isCanonical(_val) {
    return;
  }
  isSame(rhs) {
    if (this === rhs)
      return true;
    return rhs instanceof _BoxedPattern && this._pattern.isSame(rhs._pattern);
  }
  isEqual(rhs) {
    return rhs instanceof _BoxedPattern && this._pattern.isEqual(rhs._pattern);
  }
  match(expr, options) {
    return match(expr, this._pattern, {
      recursive: options?.recursive ?? false,
      numericTolerance: options?.numericTolerance ?? 0,
      substitution: options?.substitution ?? {},
      exact: options?.exact ?? false
    });
  }
  test(expr, options) {
    return this.match(expr, options) !== null;
  }
  count(exprs, options) {
    let result = 0;
    for (const expr of exprs) {
      if (this.match(expr, options) !== null)
        result += 1;
    }
    return result;
  }
  subs(sub2, options) {
    return this._pattern.subs(sub2, options);
  }
};
function hasWildcards(expr) {
  if (typeof expr === "string")
    return expr.startsWith("_");
  if (expr.symbol?.startsWith("_"))
    return true;
  if (expr.ops)
    return hasWildcards(expr.head) || expr.ops.some(hasWildcards);
  if (expr.keys) {
    for (const key of expr.keys)
      if (hasWildcards(expr.getKey(key)))
        return true;
  }
  return false;
}
function captureWildcard(wildcard, expr, substitution) {
  console.assert(wildcard.startsWith("_"));
  if (wildcard === "_" || wildcard === "__" || wildcard === "___")
    return substitution;
  if (wildcard in substitution) {
    if (!expr.isSame(substitution[wildcard]))
      return null;
    return substitution;
  }
  if (hasWildcards(expr))
    return null;
  return { ...substitution, [wildcard]: expr };
}
function matchOnce(expr, pattern, substitution, options) {
  const exact = options.exact ?? false;
  const ce = expr.engine;
  if (pattern.head === "Pattern")
    return pattern.match(expr, { ...options, ...substitution });
  if (pattern instanceof BoxedNumber) {
    if (!(expr instanceof BoxedNumber))
      return null;
    if (options.numericTolerance === 0)
      return pattern.isSame(expr) ? substitution : null;
    return pattern.isEqualWithTolerance(expr, options.numericTolerance) ? substitution : null;
  }
  const str = pattern.string;
  if (str !== null)
    return expr.string === str ? substitution : null;
  const symbol2 = pattern.symbol;
  if (symbol2 !== null) {
    if (symbol2.startsWith("_"))
      return captureWildcard(symbol2, expr, substitution);
    return symbol2 === expr.symbol ? substitution : null;
  }
  const keys = pattern.keys;
  if (keys !== null) {
    const exprKeys = expr.keys;
    if (exprKeys === null)
      return null;
    for (const key of keys) {
      const r = matchOnce(exprKeys[key], keys[key], substitution, options);
      if (r === null)
        return null;
      substitution = r;
    }
    return substitution;
  }
  if (pattern.ops) {
    const head2 = pattern.head;
    if (typeof head2 === "string" && head2.startsWith("_"))
      return captureWildcard(head2, ce.box(expr.head), substitution);
    let def = void 0;
    if (typeof head2 === "string" && typeof expr.head === "string") {
      if (head2 !== expr.head) {
        if (exact)
          return null;
        if (head2 === "Add") {
          let result = matchOnce(
            ce.box(["Add", 0, expr], { canonical: false }),
            pattern,
            substitution,
            options
          );
          if (result !== null)
            return result;
          if (expr.head === "Subtract") {
            result = matchOnce(
              ce.box(["Add", expr.op1, ["Negate", expr.op2]], {
                canonical: false
              }),
              pattern,
              substitution,
              options
            );
          }
          if (result !== null)
            return result;
        }
        if (head2 === "Subtract") {
          let result = matchOnce(
            ce.box(["Subtract", expr, 0], { canonical: false }),
            pattern,
            substitution,
            options
          );
          if (result !== null)
            return result;
          if (expr.head === "Negate") {
            result = matchOnce(
              ce.box(["Subtract", 0, expr.op1], { canonical: false }),
              pattern,
              substitution,
              options
            );
          }
          if (result !== null)
            return result;
        }
        if (head2 === "Multiply") {
          let result = matchOnce(
            ce.box(["Multiply", 1, expr], { canonical: false }),
            pattern,
            substitution,
            options
          );
          if (result !== null)
            return result;
          if (expr.head === "Negate") {
            result = matchOnce(
              ce.box(["Multiply", -1, expr.op1], { canonical: false }),
              pattern,
              substitution,
              options
            );
            if (result !== null)
              return result;
          }
          if (expr.head === "Divide") {
            result = matchOnce(
              ce.box(["Multiply", expr.op1, ["Divide", 1, expr.op2]], {
                canonical: false
              }),
              pattern,
              substitution,
              options
            );
            if (result !== null)
              return result;
          }
        }
        if (head2 === "Divide") {
          const result = matchOnce(
            ce.box(["Divide", expr, 1], { canonical: false }),
            pattern,
            substitution,
            options
          );
          if (result !== null)
            return result;
        }
        return null;
      }
      def = ce.lookupFunction(head2);
    } else {
      const r = matchOnce(
        ce.box(expr.head, { canonical: false }),
        ce.box(head2, { canonical: false }),
        substitution,
        options
      );
      if (r === null)
        return null;
      substitution = r;
    }
    return def?.commutative ? matchPermutation(expr, pattern, substitution, options) : matchArguments(expr, pattern.ops, substitution, options);
  }
  return null;
}
function matchPermutation(expr, pattern, substitution, options) {
  const patterns = permutations(pattern.ops);
  for (const pat of patterns) {
    const result = matchArguments(expr, pat, substitution, options);
    if (result !== null)
      return result;
  }
  return null;
}
function matchArguments(expr, patterns, substitution, options) {
  if (patterns.length === 0)
    return null;
  const ce = patterns[0].engine;
  let result = { ...substitution };
  const ops2 = [...expr.ops];
  let i = 0;
  while (i < patterns.length) {
    const pat = patterns[i];
    const argName = pat.symbol;
    if (argName !== null) {
      if (argName.startsWith("__")) {
        let j = 0;
        if (patterns[i + 1] === void 0) {
          j = ops2.length + 1;
        } else {
          let found = false;
          while (!found && j < ops2.length) {
            found = matchOnce(ops2[j], patterns[i + 1], result, options) !== null;
            j += 1;
          }
          if (!found && argName.startsWith("___"))
            return null;
        }
        if (!argName.startsWith("___") && j <= 1)
          return null;
        let value;
        if (j <= 1) {
          if (expr.head === "Add")
            value = ce.number(0);
          else if (expr.head === "Multiply")
            value = ce.number(1);
          else
            value = ce.box(["Sequence"]);
        } else
          value = ce.fn(expr.head, ops2.splice(0, j - 1));
        result = captureWildcard(argName, value, result);
      } else if (argName.startsWith("_")) {
        result = captureWildcard(argName, ops2.shift(), result);
      } else {
        result = matchOnce(ops2.shift(), pat, result, options);
        if (result === null)
          return null;
      }
    } else {
      const arg = ops2.shift();
      if (!arg)
        return null;
      result = matchOnce(arg, pat, result, options);
      if (result === null)
        return null;
    }
    if (result === null)
      return null;
    i += 1;
  }
  if (ops2.length > 0)
    return null;
  return result;
}
function match(subject, pattern, options) {
  const substitution = matchOnce(subject, pattern, options.substitution ?? {}, {
    numericTolerance: options?.numericTolerance ?? NUMERIC_TOLERANCE
  });
  if (substitution) {
    return substitution;
  }
  if (!options.recursive)
    return null;
  if (subject.ops) {
    const ops2 = subject.ops;
    const result = {};
    for (let i = 0; i < ops2.length; i++) {
      const sub2 = match(ops2[i], pattern, options);
      if (sub2 !== null)
        return sub2;
    }
    return result;
  }
  return null;
}

// src/compute-engine/boxed-expression/boxed-symbol.ts
var BoxedSymbol = class _BoxedSymbol extends _BoxedExpression {
  constructor(ce, name, options) {
    super(ce, options?.metadata);
    console.assert(
      isValidIdentifier(name),
      `Invalid symbol "${name}": ${validateIdentifier(name)}`
    );
    this._id = name;
    this._def = options?.def ?? void 0;
    if (!(options?.canonical ?? true))
      this._scope = null;
    else if (this._def)
      this._scope = ce.context;
    else
      this.bind();
  }
  get hash() {
    if (this._hash === void 0)
      this._hash = hashCode(this._id);
    return this._hash;
  }
  get isPure() {
    return true;
  }
  get json() {
    const wikidata = this._scope ? this.wikidata : void 0;
    return serializeJsonSymbol(this.engine, this._id, {
      latex: this._latex,
      wikidata
    });
  }
  get scope() {
    return this._scope;
  }
  get isConstant() {
    const def = this._def ?? this.engine.lookupSymbol(this._id, this.wikidata);
    return !(def instanceof _BoxedSymbolDefinition) || def.constant;
  }
  /**
   * Associate a definition with this symbol
   */
  bind() {
    this._scope = this.engine.context;
    const def = this.engine.lookupSymbol(this._id) ?? this.engine.lookupFunction(this._id);
    if (def) {
      this._def = def;
      return;
    }
    this._def = this.engine.defineSymbol(this._id, {
      domain: void 0,
      inferred: true
    });
    this._id = this._def.name;
  }
  reset() {
    this._def?.reset();
    this._def = void 0;
  }
  get isCanonical() {
    return this._scope !== null;
  }
  set isCanonical(val) {
    this._scope = val ? this.engine.context : null;
    this._def = void 0;
  }
  get canonical() {
    if (this._scope)
      return this;
    return this.engine.box(this._id);
  }
  solve(vars) {
    if (vars.length !== 1)
      return null;
    if (vars.includes(this.symbol))
      return [this.engine.Zero];
    return null;
  }
  get complexity() {
    return 7;
  }
  get head() {
    return "Symbol";
  }
  get symbol() {
    return this._id;
  }
  get isNothing() {
    return this._id === "Nothing";
  }
  //  A base definition is the base class of both symbol and function definition
  get baseDefinition() {
    if (this._def === void 0)
      this.bind();
    return this._def ?? void 0;
  }
  get symbolDefinition() {
    if (this._def === void 0)
      this.bind();
    return this._def instanceof _BoxedSymbolDefinition ? this._def : void 0;
  }
  get functionDefinition() {
    if (this._def === void 0)
      this.bind();
    return this._def instanceof _BoxedFunctionDefinition ? this._def : void 0;
  }
  /**
   * Subsequence inferences will narrow the domain of the symbol.
   * f(:integer), g(:real)
   * g(x) => x:real
   * f(x) => x:integer narrowed from integer to real
   */
  infer(domain) {
    const def = this.engine.lookupSymbol(this._id) ?? this.engine.lookupFunction(this._id);
    if (!def) {
      const scope = this.engine.swapScope(this._scope ?? this.engine.context);
      this._def = this.engine.defineSymbol(this._id, {
        domain,
        inferred: true
      });
      this.engine.swapScope(scope);
      return true;
    }
    if (def instanceof _BoxedSymbolDefinition && def.inferredDomain) {
      def.domain = narrow(def.domain, domain);
      return true;
    }
    return false;
  }
  get value() {
    const def = this._def;
    if (def && def instanceof _BoxedSymbolDefinition)
      return def.value?.value;
    return void 0;
  }
  set value(value) {
    const ce = this.engine;
    ce.forget(this._id);
    let v;
    if (typeof value === "boolean")
      value = value ? ce.True : ce.False;
    if (typeof value === "string")
      value = ce.string(value);
    if (typeof value === "object") {
      if ("re" in value && "im" in value)
        value = ce.complex(value.re, value.im);
      else if ("num" in value && "denom" in value)
        value = ce.number([value.num, value.denom]);
      else if (Array.isArray(value))
        value = ce._fn(
          "List",
          value.map((x) => ce.box(x))
        );
      else
        throw new Error(`Invalid value for symbol ${this._id}: ${value}`);
    }
    if (value !== void 0) {
      const boxedValue = ce.box(value);
      v = boxedValue.evaluate();
    }
    if (v?.domain?.isFunction) {
      console.assert(!this.engine.lookupSymbol(this._id));
      this._def = ce.defineFunction(this._id, {
        signature: {
          ...domainToSignature(v.domain),
          evaluate: v
          // Evaluate as a lambda
        }
      });
      return;
    }
    const def = this.engine.lookupSymbol(this._id);
    if (def && def instanceof _BoxedSymbolDefinition) {
      def.value = v;
    } else {
      let dom = v?.domain;
      if (dom?.isNumeric)
        dom = ce.Numbers;
      this._def = ce.defineSymbol(this._id, {
        value: v,
        domain: dom
      });
    }
  }
  // @ts-ignore
  get domain() {
    const def = this._def;
    if (def) {
      if (def instanceof _BoxedFunctionDefinition) {
        return signatureToDomain(this.engine, def.signature);
      } else if (def instanceof _BoxedSymbolDefinition)
        return def.domain ?? void 0;
    }
    return void 0;
  }
  set domain(inDomain) {
    if (!this._def)
      return;
    if (this._id[0] === "_")
      throw new Error(
        `The domain of the wildcard "${this._id}" cannot be changed`
      );
    const d = this.engine.domain(inDomain);
    if (d.isFunction) {
      this.engine.forget(this._id);
      this._def = this.engine.defineFunction(this._id, {
        signature: domainToSignature(d)
      });
    } else if (this._def instanceof _BoxedSymbolDefinition) {
      this._def.domain = d;
    } else {
      this.engine.forget(this._id);
      this._def = this.engine.defineSymbol(this._id, { domain: d });
    }
  }
  get sgn() {
    const def = this._def;
    if (!def || !(def instanceof _BoxedSymbolDefinition))
      return null;
    const v = def.value;
    if (v && v !== this) {
      const s = v.sgn;
      if (s !== void 0)
        return s;
    }
    if (def.zero === true)
      return 0;
    if (def.positive === true)
      return 1;
    if (def.negative === true)
      return -1;
    return void 0;
  }
  has(x) {
    if (typeof x === "string")
      return this._id === x;
    return x.includes(this._id);
  }
  isSame(rhs) {
    if (this === rhs)
      return true;
    if (!(rhs instanceof _BoxedSymbol))
      return false;
    return this._id === rhs._id;
  }
  match(rhs, _options) {
    if (!(rhs instanceof _BoxedSymbol))
      return null;
    if (this._id === rhs._id)
      return {};
    return null;
  }
  isEqual(rhs) {
    if (!this.isCanonical)
      return this.canonical.isEqual(rhs);
    rhs = rhs.canonical;
    if (this === rhs)
      return true;
    if (rhs.symbol !== null)
      return rhs.symbol === this._id;
    const lhsVal = this.symbolDefinition?.value?.N();
    if (lhsVal)
      return lhsVal.isEqual(rhs.N());
    if (rhs.isZero) {
      if (this.isZero)
        return true;
      if (this.isNotZero)
        return false;
    }
    if (this.isZero && rhs.isNotZero)
      return false;
    if (this.engine.ask(["Equal", this, rhs]).length > 0)
      return true;
    if (this.engine.ask(["NotEqual", this, rhs]).length > 0)
      return false;
    return false;
  }
  isLess(rhs) {
    if (rhs.symbol !== null && rhs.symbol === this._id)
      return false;
    const lhsVal = this.symbolDefinition?.value?.N();
    if (lhsVal)
      return lhsVal.isLess(rhs.N());
    if (rhs.isZero) {
      const s = this.sgn;
      if (s === null)
        return false;
      if (s !== void 0)
        return s < 0;
    }
    return void 0;
  }
  isLessEqual(rhs) {
    if (rhs.symbol !== null && rhs.symbol === this._id)
      return true;
    const lhsVal = this.symbolDefinition?.value?.N();
    if (lhsVal)
      return lhsVal.isLessEqual(rhs.N());
    if (rhs.isZero) {
      const s = this.sgn;
      if (s === null)
        return false;
      if (s !== void 0)
        return s <= 0;
    }
    return this.isLess(rhs) || this.isEqual(rhs);
  }
  isGreater(rhs) {
    if (rhs.symbol !== null && rhs.symbol === this._id)
      return false;
    const lhsVal = this.symbolDefinition?.value?.N();
    if (lhsVal)
      return lhsVal.isGreater(rhs.N());
    if (rhs.isZero) {
      const s = this.sgn;
      if (s === null)
        return false;
      if (s !== void 0)
        return s > 0;
    }
    return void 0;
  }
  isGreaterEqual(rhs) {
    if (rhs.symbol !== null && rhs.symbol === this._id)
      return true;
    const lhsVal = this.symbolDefinition?.value?.N();
    if (lhsVal)
      return lhsVal.isGreaterEqual(rhs.N());
    if (rhs.isZero) {
      const s = this.sgn;
      if (s === null)
        return false;
      if (s !== void 0)
        return s >= 0;
    }
    return this.isGreater(rhs) || this.isEqual(rhs);
  }
  get isFunction() {
    return !!this.functionDefinition;
  }
  get isZero() {
    return this.symbolDefinition?.zero;
  }
  get isNotZero() {
    return this.symbolDefinition?.notZero;
  }
  get isOne() {
    return this.symbolDefinition?.one;
  }
  get isNegativeOne() {
    return this.symbolDefinition?.negativeOne;
  }
  get isOdd() {
    return this.symbolDefinition?.odd;
  }
  get isEven() {
    return this.symbolDefinition?.even;
  }
  get isPrime() {
    return this.symbolDefinition?.prime;
  }
  get isComposite() {
    return this.symbolDefinition?.composite;
  }
  get isInfinity() {
    return this.symbolDefinition?.infinity;
  }
  get isNaN() {
    return this.symbolDefinition?.NaN;
  }
  // x > 0
  get isPositive() {
    return this.symbolDefinition?.positive;
  }
  get isNonPositive() {
    return this.symbolDefinition?.nonPositive;
  }
  get isNegative() {
    return this.symbolDefinition?.negative;
  }
  get isNonNegative() {
    return this.symbolDefinition?.nonNegative;
  }
  get isNumber() {
    return this.symbolDefinition?.number;
  }
  get isInteger() {
    return this.symbolDefinition?.integer;
  }
  get isRational() {
    return this.symbolDefinition?.rational;
  }
  get isAlgebraic() {
    return this.symbolDefinition?.rational;
  }
  get isReal() {
    return this.symbolDefinition?.real;
  }
  get isExtendedReal() {
    return this.symbolDefinition?.extendedReal;
  }
  get isComplex() {
    return this.symbolDefinition?.complex;
  }
  get isImaginary() {
    return this.symbolDefinition?.imaginary;
  }
  simplify(options) {
    const def = this.symbolDefinition;
    if (def?.holdUntil === "simplify" && def.value)
      return def.value.simplify(options);
    return options?.rules ? this.replace(options.rules) ?? this : this;
  }
  evaluate(options) {
    const def = this.symbolDefinition;
    if (def) {
      if (options?.numericMode) {
        if (def.holdUntil === "never")
          return this;
        return def.value?.N(options) ?? this;
      }
      if (def.holdUntil === "simplify" || def.holdUntil === "evaluate") {
        return def.value?.evaluate(options) ?? this;
      }
    }
    return this;
  }
  N(options) {
    const def = this.symbolDefinition;
    if (def && def.holdUntil === "never")
      return this;
    return def?.value?.N(options) ?? this;
  }
  replace(rules, options) {
    return replace(this, rules, options);
  }
  subs(sub2, options) {
    if (sub2[this._id] === void 0)
      return options?.canonical ? this.canonical : this;
    return this.engine.box(sub2[this._id], options);
  }
};
function makeCanonicalSymbol(ce, name) {
  const def = ce.lookupSymbol(name);
  if (def?.holdUntil === "never" && def.value)
    return def.value;
  return new BoxedSymbol(ce, name, { canonical: true, def });
}

// src/common/ansi-codes.ts
var RESET = "\x1B[0m";
var YELLOW = "\x1B[33m";
var CYAN = "\x1B[36;1m";
var INVERSE_RED = "\x1B[101;97m";

// src/compute-engine/compute-engine.ts
var ComputeEngine = class _ComputeEngine {
  /**
   * Construct a new `ComputeEngine` instance.
   *
   * Identifier tables define functions and symbols (in `options.ids`).
   * If no table is provided the MathJSON Standard Library is used (`ComputeEngine.getStandardLibrary()`)
   *
   * The LaTeX syntax dictionary is defined in `options.latexDictionary`.
   *
   * The order of the dictionaries matter: the definitions from the later ones
   * override the definitions from earlier ones. The first dictionary should
   * be the `'core'` dictionary which include some basic definitions such
   * as domains (`Booleans`, `Numbers`, etc...) that are used by later
   * dictionaries.
   *
   * @param options.numericMode The default mode is `"auto"`. Use `"machine"`
   * to perform numeric calculations using 64-bit floats. Use `"bignum"` to
   * perform calculations using arbitrary precision floating point numbers.
   * Use `"auto"` or `"complex"` to allow calculations on complex numbers.
   *
   * @param options.numericPrecision Specific how many digits of precision
   * for the numeric calculations. Default is 100.
   *
   * @param options.tolerance If the absolute value of the difference of two
   * numbers is less than `tolerance`, they are considered equal. Used by
   * `chop()` as well.
   */
  constructor(options) {
    /** @internal */
    this._cache = {};
    /** @internal */
    this._commonSymbols = {
      True: null,
      False: null,
      All: null,
      Nothing: null,
      None: null,
      Undefined: null,
      // Function: null,
      Pi: null,
      ImaginaryUnit: null,
      ExponentialE: null
    };
    /** @internal */
    this._commonNumbers = {
      "-5": null,
      "-4": null,
      "-3": null,
      "-2": null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
      10: null,
      11: null,
      12: null,
      36: null
    };
    /** @internal */
    this._commonDomains = {
      Anything: null,
      Void: null,
      NothingDomain: null,
      Booleans: null,
      Strings: null,
      Domains: null,
      Symbols: null,
      Integers: null,
      RationalNumbers: null,
      AlgebraicNumbers: null,
      RealNumbers: null,
      ExtendedRealNumbers: null,
      ImaginaryNumbers: null,
      ComplexNumbers: null,
      ExtendedComplexNumbers: null,
      Numbers: null,
      PositiveIntegers: null,
      TranscendentalNumbers: null,
      PositiveNumbers: null,
      Functions: null,
      // (Anything*) -> Anything
      NumericFunctions: null,
      // (Numbers+) -> Numbers
      RealFunctions: null,
      // (ExtendedRealNumbers+) -> ExtendRealNumbers
      LogicOperators: null,
      // (Booleans+) -> Boolean
      Predicates: null
      // (Anything+) -> Booleans
    };
    if (options !== void 0 && typeof options !== "object")
      throw Error("Unexpected argument");
    this.strict = true;
    this._jsonSerializationOptions = {
      exclude: [],
      shorthands: ["function", "symbol", "string", "dictionary", "number"],
      metadata: [],
      precision: "max",
      repeatingDecimals: true
    };
    this._useRawJsonSerializationOptions = false;
    this._rawJsonSerializationOptions = {
      exclude: [],
      shorthands: ["function", "symbol", "string", "dictionary", "number"],
      metadata: [],
      precision: "max",
      repeatingDecimals: false
    };
    this._stats = {
      highwaterMark: 0,
      symbols: /* @__PURE__ */ new Set(),
      expressions: /* @__PURE__ */ new Set()
    };
    this._numericMode = options?.numericMode ?? "auto";
    this._precision = Math.max(
      options?.numericPrecision ?? 100,
      Math.floor(MACHINE_PRECISION)
    );
    this._bignum = Decimal.clone({ precision: this._precision });
    this.tolerance = options?.tolerance ?? NUMERIC_TOLERANCE;
    this.Zero = new BoxedNumber(this, 0);
    this.One = new BoxedNumber(this, 1);
    this.Half = new BoxedNumber(this, [1, 2]);
    this.NegativeOne = new BoxedNumber(this, -1);
    this.NaN = new BoxedNumber(this, Number.NaN);
    this.PositiveInfinity = new BoxedNumber(this, Number.POSITIVE_INFINITY);
    this.NegativeInfinity = new BoxedNumber(this, Number.NEGATIVE_INFINITY);
    this.I = new BoxedNumber(this, import_complex21.Complex.I);
    this.ComplexInfinity = new BoxedNumber(this, import_complex21.Complex.INFINITY);
    this.reset();
    this.context = {
      assumptions: new ExpressionMap(),
      timeLimit: 2,
      // execution time limit: 2.0 seconds
      memoryLimit: 1,
      // memory limit: 1.0 megabyte
      recursionLimit: 1024,
      iterationLimit: Number.POSITIVE_INFINITY
    };
    for (const table of _ComputeEngine.getStandardLibrary("domains"))
      setIdentifierDefinitions(this, table);
    for (const d of Object.keys(this._commonDomains)) {
      if (this._commonDomains[d] && !this._commonDomains[d].symbolDefinition)
        this._commonDomains[d].bind();
      else {
        this._commonDomains[d] = new _BoxedDomain(
          this,
          DOMAIN_ALIAS[d] ?? d
        );
      }
    }
    this.Anything = this._commonDomains.Anything;
    this.Void = this._commonDomains.Void;
    this.Strings = this._commonDomains.Strings;
    this.Booleans = this._commonDomains.Booleans;
    this.Numbers = this._commonDomains.Numbers;
    const tables = options?.ids ?? _ComputeEngine.getStandardLibrary();
    for (const table of tables)
      setIdentifierDefinitions(this, table);
    for (const sym of Object.keys(this._commonSymbols)) {
      const boxedSymbol = new BoxedSymbol(this, sym, { canonical: true });
      boxedSymbol.bind();
      this._commonSymbols[sym] = boxedSymbol;
    }
    this.True = this._commonSymbols.True;
    this.False = this._commonSymbols.False;
    this.Pi = this._commonSymbols.Pi;
    this.E = this._commonSymbols.ExponentialE;
    this.Nothing = this._commonSymbols.Nothing;
    this.pushScope();
  }
  /**
   * Return identifier tables suitable for the specified categories, or `"all"`
   * for all categories (`"arithmetic"`, `"algebra"`, etc...).
   *
   * An identifier table defines how the symbols and function names in a
   * MathJSON expression should be interpreted, i.e. how to evaluate and
   * manipulate them.
   *
   */
  static getStandardLibrary(categories = "all") {
    return getStandardLibrary(categories);
  }
  get latexDictionary() {
    return this.latexSyntax.dictionary;
  }
  set latexDictionary(dic) {
    this.latexSyntax.dictionary = dic;
  }
  /** After the configuration of the engine has changed, clear the caches
   * so that new values can be recalculated.
   *
   * This needs to happen for example when the numeric precision changes.
   *
   * @internal
   */
  reset() {
    console.assert(this._bignum);
    this._BIGNUM_NEGATIVE_ONE = this.bignum(-1);
    this._BIGNUM_NAN = this.bignum(NaN);
    this._BIGNUM_ZERO = this.bignum(0);
    this._BIGNUM_ONE = this.bignum(1);
    this._BIGNUM_TWO = this.bignum(2);
    this._BIGNUM_HALF = this._BIGNUM_ONE.div(this._BIGNUM_TWO);
    this._BIGNUM_PI = this._BIGNUM_NEGATIVE_ONE.acos();
    const symbols = this._stats.symbols.values();
    const expressions = this._stats.expressions.values();
    this._stats.symbols = /* @__PURE__ */ new Set();
    this._stats.expressions = /* @__PURE__ */ new Set();
    for (const s of symbols)
      s.reset();
    for (const s of expressions)
      s.reset();
    for (const d of Object.values(this._commonDomains))
      d?.reset();
    for (const d of Object.values(this._commonSymbols))
      d?.reset();
    let scope = this.context;
    while (scope) {
      if (scope.ids)
        for (const [_k, v] of scope.ids)
          v.reset();
      scope = scope.parentScope ?? null;
    }
    for (const k of Object.keys(this._cache))
      if (this._cache[k].value) {
        if (!this._cache[k].purge)
          delete this._cache[k];
        else
          this._cache[k].value = this._cache[k].purge(this._cache[k].value);
      }
  }
  /** @internal */
  _register(_expr) {
    this._stats.highwaterMark += 1;
  }
  /** @internal */
  _unregister(_expr) {
  }
  get stats() {
    const expressions = this._stats.expressions;
    this._stats.expressions = null;
    this._stats.expressions = expressions;
    return {
      ...this._stats
      // _dupeSymbols: topDupes,
      // _popularExpressions: top10,
    };
  }
  /** The precision, or number of significant digits, of numeric
   * calculations when the numeric mode is `"auto"` or `"bignum"`.
   *
   * To make calculations using more digits, at the cost of expanded memory
   * usage and slower computations, set the `precision` higher.
   *
   * If the numeric mode is not `"auto"` or `"bignum"`, it is set to `"auto"`.
   *
   * Trigonometric operations are accurate for precision up to 1,000.
   *
   */
  get precision() {
    if (this._numericMode === "machine" || this._numericMode === "complex")
      return Math.floor(MACHINE_PRECISION);
    return this._precision;
  }
  set precision(p) {
    if (p === "machine")
      p = Math.floor(MACHINE_PRECISION);
    const currentPrecision = this._precision;
    if (p === currentPrecision)
      return;
    if (typeof p !== "number" || p <= 0)
      throw Error('Expected "machine" or a positive number');
    this._latexSyntax?.updateOptions({
      precision: p,
      avoidExponentsInRange: [-6, p]
    });
    this._precision = Math.max(p, Math.floor(MACHINE_PRECISION));
    if (this.jsonSerializationOptions.precision > this._precision)
      this.jsonSerializationOptions = { precision: this._precision };
    if (this._numericMode !== "auto" && this._numericMode !== "bignum" && this._precision > Math.floor(MACHINE_PRECISION))
      this._numericMode = "auto";
    this._bignum = this._bignum.config({ precision: this._precision });
    this.reset();
  }
  get numericMode() {
    return this._numericMode;
  }
  set numericMode(f) {
    if (f === this._numericMode)
      return;
    if (typeof f !== "string")
      throw Error("Expected a string");
    this._numericMode = f;
    if (f === "complex" || f === "machine")
      this._precision = Math.floor(MACHINE_PRECISION);
    if (this._latexSyntax && this.latexSyntax.options.precision > this._precision)
      this.latexSyntax.updateOptions({ precision: this._precision });
    if (this.jsonSerializationOptions.precision > this._precision)
      this.jsonSerializationOptions = { precision: this._precision };
    this.reset();
  }
  /** @experimental */
  get timeLimit() {
    let scope = this.context;
    while (scope) {
      if (scope.timeLimit !== void 0)
        return scope.timeLimit;
      scope = scope.parentScope ?? null;
    }
    return 2;
  }
  /** @experimental */
  get iterationLimit() {
    let scope = this.context;
    while (scope) {
      if (scope.iterationLimit !== void 0)
        return scope.iterationLimit;
      scope = scope.parentScope ?? null;
    }
    return 1024;
  }
  /** @experimental */
  get recursionLimit() {
    let scope = this.context;
    while (scope) {
      if (scope.recursionLimit !== void 0)
        return scope.recursionLimit;
      scope = scope.parentScope ?? null;
    }
    return 1024;
  }
  /**
   * Values smaller than the tolerance are considered to be zero for the
   * purpose of comparison, i.e. if `|b - a| <= tolerance`, `b` is considered
   * equal to `a`.
   */
  get tolerance() {
    return this._tolerance;
  }
  set tolerance(val) {
    if (typeof val === "number" && Number.isFinite(val))
      this._tolerance = Math.max(val, 0);
    else
      this._tolerance = NUMERIC_TOLERANCE;
    this._bignumTolerance = this.bignum(this._tolerance);
  }
  chop(n) {
    if (typeof n === "number" && Math.abs(n) <= this._tolerance)
      return 0;
    if (n instanceof Decimal && n.abs().lte(this._bignumTolerance))
      return 0;
    if (n instanceof import_complex21.Complex && Math.abs(n.re) <= this._tolerance && Math.abs(n.im) <= this._tolerance)
      return 0;
    return n;
  }
  /** Create an arbitrary precision number. 
     * 
     * The return value is an object with methods to perform arithmetic
     * operations:
     * - `toNumber()`: convert to a JavaScript `number` with potential loss of precision
     * - `add()`
     * - `sub()`
     * - `neg()` (unary minus)
     * - `mul()`
     * - `div()`
     * - `pow()`
     * - `sqrt()` (square root)
     * - `cbrt()` (cube root)
     * - `exp()`  (e^x)
     * - `log()` 
     * - `ln()` (natural logarithm)
     * - `mod()`
  
     * - `abs()`
     * - `ceil()`
     * - `floor()`
     * - `round()`
  
     * - `equals()`
     * - `gt()`
     * - `gte()`
     * - `lt()`
     * - `lte()`
     * 
     * - `cos()`
     * - `sin()`
     * - `tanh()`
     * - `acos()`
     * - `asin()`
     * - `atan()`
     * - `cosh()`
     * - `sinh()`
     * - `acosh()`
     * - `asinh()`
     * - `atanh()`
     * 
     * - `isFinite()`
     * - `isInteger()`
     * - `isNaN()`
     * - `isNegative()`
     * - `isPositive()`
     * - `isZero()`
     * - `sign()` (1, 0 or -1)
     * 
     */
  bignum(a) {
    if (typeof a === "bigint")
      return new this._bignum(a.toString());
    try {
      return new this._bignum(a);
    } catch (e) {
      console.error(e);
    }
    return this._BIGNUM_NAN;
  }
  /** Create a complex number.
     * The return value is an object with methods to perform arithmetic
     * operations:
     * - `re` (real part, as a JavaScript `number`)
     * - `im` (imaginary part, as a JavaScript `number`)
     * - `add()`
     * - `sub()`
     * - `neg()` (unary minus)
     * - `mul()`
     * - `div()`
     * - `pow()`
     * - `sqrt()` (square root)
     * - `exp()`  (e^x)
     * - `log()` 
     * - `ln()` (natural logarithm)
     * - `mod()`
  
     * - `abs()`
     * - `ceil()`
     * - `floor()`
     * - `round()`
  
     * - `arg()` the angle of the complex number
     * - `inverse()` the inverse of the complex number 1/z
     * - `conjugate()` the conjugate of the complex number
  
     * - `equals()`
     * 
     * - `cos()`
     * - `sin()`
     * - `tanh()`
     * - `acos()`
     * - `asin()`
     * - `atan()`
     * - `cosh()`
     * - `sinh()`
     * - `acosh()`
     * - `asinh()`
     * - `atanh()`
     * 
     * - `isFinite()`
     * - `isNaN()`
     * - `isZero()`
     * - `sign()` (1, 0 or -1)
     */
  complex(a, b) {
    if (a instanceof Decimal)
      a = a.toNumber();
    if (b instanceof Decimal)
      b = b.toNumber();
    return new import_complex21.Complex(a, b);
  }
  isBignum(a) {
    return a instanceof Decimal;
  }
  isComplex(a) {
    return a instanceof import_complex21.Complex;
  }
  get latexSyntax() {
    if (!this._latexSyntax) {
      const precision = this.precision;
      this._latexSyntax = new LatexSyntax({
        computeEngine: this,
        precision,
        avoidExponentsInRange: [-6, precision],
        onError: (err) => {
          throw new Error(JSON.stringify(err[0].message));
        }
      });
    }
    return this._latexSyntax;
  }
  static getLatexDictionary(domain = "all") {
    return LatexSyntax.getDictionary(domain);
  }
  set costFunction(fn) {
    if (typeof fn !== "function")
      this._cost = DEFAULT_COST_FUNCTION;
    this._cost = fn;
  }
  get costFunction() {
    return this._cost ?? DEFAULT_COST_FUNCTION;
  }
  /**
   * Return a matching symbol definition, starting with the current
   * scope and going up the scope chain. Prioritize finding a match by
   * wikidata, if provided.
   */
  lookupSymbol(symbol2, wikidata, scope) {
    if (!this.strict) {
      scope ?? (scope = this.context ?? void 0);
      while (scope) {
        const def = scope.ids?.get(symbol2);
        if (def && def instanceof _BoxedSymbolDefinition)
          return def;
        scope = scope.parentScope;
      }
      return void 0;
    }
    if (typeof symbol2 !== "string")
      throw Error("Expected a string");
    if (symbol2.length === 0 || !this.context)
      return void 0;
    const rootScope = scope ?? this.context;
    if (wikidata) {
      scope = rootScope;
      while (scope) {
        if (scope.ids)
          for (const [_, d] of scope.ids) {
            if (d instanceof _BoxedSymbolDefinition && d.wikidata === wikidata)
              return d;
          }
        scope = scope.parentScope;
      }
    }
    scope = rootScope;
    while (scope) {
      const def = scope.ids?.get(symbol2);
      if (def instanceof _BoxedSymbolDefinition)
        return def;
      scope = scope.parentScope;
    }
    return void 0;
  }
  /**
   * Return the definition for a function matching this head.
   *
   * Start looking in the current context, than up the scope chain.
   *
   * This is a very rough lookup, since it doesn't account for the domain
   * of the argument or the codomain. However, it is useful during parsing
   * to differentiate between symbols that might represent a function application, e.g. `f` vs `x`.
   */
  lookupFunction(head2, scope) {
    if (typeof head2 !== "string")
      return void 0;
    if (!this.context)
      return void 0;
    scope ?? (scope = this.context);
    while (scope) {
      const def = scope.ids?.get(head2);
      if (def instanceof _BoxedFunctionDefinition)
        return def;
      scope = scope.parentScope;
    }
    return void 0;
  }
  /**
   * Associate a new definition to a symbol in the current context.
   *
   * If a definition existed previously, it is replaced.
   *
   *
   * For internal use. Use `ce.declare()` instead.
   *
   * @internal
   */
  defineSymbol(name, def) {
    if (!this.context)
      throw Error("Symbol cannot be defined: no scope available");
    if (name.length === 0 || !isValidIdentifier(name))
      throw Error(`Invalid identifier "${name}": ${validateIdentifier(name)}}`);
    return this._defineSymbol(name, def);
  }
  _defineSymbol(name, def) {
    var _a;
    (_a = this.context).ids ?? (_a.ids = /* @__PURE__ */ new Map());
    const boxedDef = new _BoxedSymbolDefinition(this, name, def);
    if (boxedDef.name)
      this.context.ids.set(boxedDef.name, boxedDef);
    return boxedDef;
  }
  /**
   * Associate a new delookupSymbolfinition to a function in the current context.
   *
   * If a definition existed previously, it is replaced.
   *
   * For internal use. Use `ce.declare()` instead.
   *
   * @internal
   */
  defineFunction(name, def) {
    if (!this.context)
      throw Error("Function cannot be defined: no scope available");
    if (name.length === 0 || !isValidIdentifier(name))
      throw Error(`Invalid identifier "${name}": ${validateIdentifier(name)}}`);
    return this._defineFunction(name, def);
  }
  _defineFunction(name, def) {
    var _a;
    (_a = this.context).ids ?? (_a.ids = /* @__PURE__ */ new Map());
    const boxedDef = makeFunctionDefinition(this, name, def);
    if (boxedDef.name)
      this.context.ids.set(boxedDef.name, boxedDef);
    return boxedDef;
  }
  /**
   *
   * Create a new scope and add it to the top of the scope stack
   *
   * The `scope` argument can be used to specify custom precision,
   * etc... for this scope
   *
   *
   */
  pushScope(scope) {
    if (this.context === null)
      throw Error("No parent scope available");
    this.context = {
      timeLimit: this.context.timeLimit,
      memoryLimit: this.context.memoryLimit,
      recursionLimit: this.context.recursionLimit,
      iterationLimit: this.context.iterationLimit,
      ...scope ?? {},
      parentScope: this.context,
      // We always copy the current assumptions in the new scope.
      // This make is much easier to deal with 'inherited' assumptions
      // (and potentially modifying them later) without having to walk back
      // into parent contexts. In other words, calling `ce.forget()` will
      // forget everything **in the current scope**. When exiting the scope,
      // the previous assumptions are restored.
      assumptions: new ExpressionMap(this.context.assumptions)
    };
    return this;
  }
  /** Remove the most recent scope from the scope stack, and set its
   *  parent scope as current. */
  popScope() {
    if (!this.context)
      throw Error("No scope available");
    this.context = this.context.parentScope ?? null;
    console.assert(this.context);
    return this;
  }
  /** Set the current scope, return the previous scope. */
  swapScope(scope) {
    const oldScope = this.context;
    this.context = scope;
    console.assert(this.context);
    return oldScope;
  }
  /**
   * Reset the value of any identifiers that have been assigned a value
   * in the current scope.
   * @internal */
  resetContext() {
    if (!this.context)
      return;
    for (const [_, def] of this.context.ids ?? []) {
      if (def instanceof _BoxedSymbolDefinition) {
        if (!def.constant)
          def.value = void 0;
      } else if (def instanceof _BoxedFunctionDefinition) {
        const sig = def.signature;
        def.signature = {
          ...sig,
          evaluate: void 0,
          N: void 0,
          simplify: void 0,
          canonical: void 0
        };
      }
    }
  }
  /** @internal */
  _printScope(options, scope, depth = 0) {
    options ?? (options = { details: false, maxDepth: 1 });
    scope ?? (scope = this.context);
    if (!scope)
      return null;
    if (options.maxDepth && depth > options.maxDepth)
      return null;
    const undef = `${YELLOW}[undefined]${RESET}`;
    if (depth === 0) {
      console.group("current scope - level 0");
    } else {
      console.groupCollapsed(
        !scope.parentScope ? `root scope - level ${depth}` : `scope - level ${depth}`
      );
    }
    if (scope.ids) {
      let count = 0;
      for (const [k, v] of scope.ids) {
        const id = `${CYAN}${k}${RESET}`;
        try {
          if (v instanceof _BoxedSymbolDefinition) {
            const val = v.value?.isValid ? v.value.toString() : v.value ? `${INVERSE_RED}${v.value.toString()}${RESET}` : undef;
            console.info(`${id}: ${v.domain?.toString() ?? undef} = ${val}`);
          } else if (v instanceof _BoxedFunctionDefinition) {
            if (typeof v.signature.evaluate === "function")
              console.info(
                `${id}(): ${options.details ? v.signature.evaluate.toString() : "[native-code]"}`
              );
            else if (v.signature.evaluate === void 0)
              console.info(`${id}(): ${undef}`);
            else
              console.info(`${id}(): ${v.toString()}`);
          }
          if (count === 11)
            console.groupCollapsed(`... and ${scope.ids.size - count} more`);
          count += 1;
        } catch (err) {
          console.info(`${id}: ${INVERSE_RED}${err.message}${RESET}`);
        }
      }
      if (count >= 11)
        console.groupEnd();
    }
    if (scope.assumptions) {
      const assumptions = [...scope.assumptions.entries()].map(
        ([k, v]) => `${k}: ${v}`
      );
      if (assumptions.length > 0) {
        console.groupCollapsed(`${assumptions.length} assumptions)`);
        for (const a of assumptions)
          console.info(a);
        console.groupEnd();
      }
    }
    if (scope.parentScope)
      this._printScope(options, scope.parentScope, depth + 1);
    console.groupEnd();
    return this.context;
  }
  declare(arg1, arg2) {
    if (typeof arg1 !== "string" || arg2 === void 0) {
      for (const [id2, def2] of Object.entries(arg1))
        this.declare(id2, def2);
      return this;
    }
    const [id, args] = parseFunctionSignature(arg1);
    if (args !== void 0) {
      throw Error(
        `Unexpected arguments with ${arg1}. Use 'ce.assign()' instead to assign a value, or a use a function definition with 'ce.declare()'.`
      );
    }
    if (id === "Nothing")
      return this;
    if (this.context?.ids?.get(id)) {
      const def2 = this.context.ids.get(id);
      if (def2 instanceof _BoxedSymbolDefinition && def2.inferredDomain) {
        if (isSymbolDefinition(arg2))
          def2.update(arg2);
        else {
          def2.domain = this.domain(arg2);
          def2.inferredDomain = false;
        }
        return this;
      }
      throw Error(
        `Symbol "${id}" has already been declared in the current scope`
      );
    }
    const def = arg2;
    if (!def)
      throw Error(`Expected a definition for ${id}`);
    if (isSymbolDefinition(def)) {
      this.defineSymbol(id, def);
      return this;
    }
    if (isFunctionDefinition(def)) {
      this.defineFunction(id, def);
      return this;
    }
    {
      const dom = this.domain(def);
      if (dom.isValid) {
        if (dom.isFunction) {
          this.defineFunction(id, { signature: domainToSignature(dom) });
        } else {
          if (args)
            throw Error(`Unexpected arguments with domain for "${id}"`);
          this.defineSymbol(id, { domain: dom });
        }
      } else {
        throw Error(
          `Invalid argument for "${id}": use a domain, a FunctionDefinition or a SymbolDefinition`
        );
      }
    }
    return this;
  }
  assign(arg1, arg2) {
    if (typeof arg1 === "object") {
      console.assert(arg2 === void 0);
      for (const [id2, def] of Object.entries(arg1))
        this.assign(id2, def);
      return this;
    }
    const [id, args] = parseFunctionSignature(arg1);
    if (id === "Nothing")
      return this;
    let value = arg2;
    if (typeof value === "boolean")
      value = value ? this.True : this.False;
    if (typeof value === "string") {
      const latex = value.trim();
      if (latex.startsWith("$") && latex.endsWith("$")) {
        value = this.parse(latex.slice(1, -1), { canonical: false });
      } else if (latex.startsWith("$$") && latex.endsWith("$$")) {
        value = this.parse(latex.slice(2, -2), { canonical: false });
      } else {
        value = this.string(value);
      }
    }
    const symDef = this.lookupSymbol(id);
    if (symDef) {
      if (symDef.constant)
        throw Error(`Cannot assign a value to the constant "${id}"`);
      if (!symDef.inferredDomain && isFunctionValue(value))
        throw Error(`Cannot assign a function to symbol "${id}"`);
      const scope = symDef.scope;
      scope?.ids?.delete(symDef.name);
      if (!args && !isFunctionValue(value)) {
        if (value === void 0 || value === null)
          symDef.value = void 0;
        else
          symDef.value = this.box(value);
        scope?.ids?.set(symDef.name, symDef);
        return this;
      }
    }
    const fnDef = this.lookupFunction(id);
    if (fnDef) {
      const scope = fnDef.scope;
      scope?.ids?.delete(fnDef.name);
      if (value === void 0 || value === null)
        return this;
      if (typeof value === "function") {
        const previousScope2 = this.swapScope(scope);
        this.defineFunction(id, { signature: { evaluate: value } });
        this.swapScope(previousScope2);
        return this;
      }
      if (args && isFunctionValue(value))
        throw Error(`Unexpected arguments for "${id}"`);
      const val = args ? this.box(["Function", value, ...args]) : this.box(value);
      const previousScope = this.swapScope(scope);
      this.defineFunction(id, { signature: { evaluate: val } });
      this.swapScope(previousScope);
      return this;
    }
    if (value === void 0 || value === null) {
      this.declare(id, { inferred: true, domain: this.Anything });
      return this;
    }
    if (typeof value === "function") {
      this.defineFunction(id, { signature: { evaluate: value } });
      return this;
    }
    if (value instanceof _BoxedExpression && value.domain?.base === "Functions") {
      this.defineFunction(id, { signature: { evaluate: value } });
      return this;
    }
    if (Array.isArray(value) || value instanceof _BoxedExpression || args) {
      let expr = this.box(value, { canonical: false });
      if (expr.head === "Function") {
        expr = this.box([
          "Function",
          ...expr.ops,
          ...(args ?? []).map((x) => this.symbol(x))
        ]);
        this.defineFunction(id, {
          signature: { evaluate: expr }
        });
        return this;
      }
      const unknowns = [...expr.unknowns].sort();
      if (unknowns.length === 0) {
        const value2 = expr.evaluate();
        this.defineSymbol(id, { value: value2 });
        return this;
      }
      if (unknowns.some((x) => /\_[\d]+/.test(x))) {
        expr = this.box(["Function", expr]);
        this.defineFunction(id, {
          signature: { evaluate: expr }
        });
        return this;
      }
      if (args && args.length > 0) {
        this.pushScope();
        expr = this.box(["Function", expr, ...args]);
        this.popScope();
        this.defineFunction(id, {
          signature: { evaluate: expr }
        });
        return this;
      }
      this.pushScope();
      value = expr.evaluate();
      this.popScope();
    }
    this.defineSymbol(id, { value });
    return this;
  }
  /**
   * Same as assign(), but for internal use:
   * - skips validity checks
   * - does not auto-declare
   * - if assigning to a function, must pass a JS function
   *
   * @internal
   */
  _assign(id, value) {
    const symDef = this.lookupSymbol(id);
    if (symDef) {
      console.assert(typeof value !== "function");
      symDef.value = this.box(value).evaluate();
      return this;
    }
    const fnDef = this.lookupFunction(id);
    if (fnDef) {
      console.assert(typeof value == "function");
      const sig = fnDef.signature;
      fnDef.signature = {
        ...sig,
        N: void 0,
        simplify: void 0,
        canonical: void 0,
        evaluate: value
      };
      return this;
    }
    console.assert(false, `Cannot assign to undeclared symbol "${id}"`);
    return this;
  }
  get assumptions() {
    if (!this.context)
      throw Error("No scope available");
    if (this.context.assumptions)
      return this.context.assumptions;
    this.context.assumptions = new ExpressionMap();
    return this.context.assumptions;
  }
  /**
   * Return false if the execution should stop.
   *
   * This can occur if:
   * - an error has been signaled
   * - the time limit or memory limit has been exceeded
   *
   * @internal
   */
  shouldContinueExecution() {
    return this.deadline === void 0 || this.deadline >= Date.now();
  }
  /** @internal */
  checkContinueExecution() {
    if (!this.shouldContinueExecution()) {
      throw new Error("timeout");
    }
  }
  // assert(
  //   condition: boolean,
  //   expr: BoxedExpression,
  //   msg: string,
  //   code?: SignalMessage
  // ) {
  //   if (!condition) this.signal(expr, msg, code);
  // }
  /** @internal */
  cache(cacheName, build, purge) {
    if (this._cache[cacheName] === void 0) {
      try {
        this._cache[cacheName] = { build, purge, value: build() };
      } catch (e) {
        console.error(
          `Fatal error building cache "${cacheName}":
	 ${e.toString()}`
        );
      }
    }
    return this._cache[cacheName]?.value;
  }
  /**
   * Return a boxed expression from the input.
   */
  box(expr, options) {
    return box(this, expr, options);
  }
  canonical(xs) {
    if (!xs.every((x) => x instanceof _BoxedExpression))
      return xs.map((x) => this.box(x));
    const bxs = xs;
    return bxs.every((x) => x.isCanonical) ? bxs : bxs.map((x) => x.canonical);
  }
  /**
   * Return a function expression.
   *
   * Note that the result may not be a function, or may have a different
   * `head` than the one specified.
   *
   * For example:
   * `ce.fn("Rational", [ce.number(1),  ce.number(2)]))` \( \to \) `ce.number([1,2])`
   *
   */
  fn(head2, ops2, options) {
    return boxFunction(this, head2, ops2, options ?? { canonical: true });
  }
  /** @internal */
  _fn(head2, ops2, metadata) {
    return new BoxedFunction(this, head2, ops2, {
      metadata,
      canonical: true
    });
  }
  error(message, where) {
    if (where instanceof _BoxedExpression) {
      where = this.rawJson(where);
    } else if (where && Array.isArray(where) && where[0] === "LatexString") {
      if (where[1] === void 0 || !where[1])
        where = "";
      if (typeof where[1] === "object" && "str" in where[1] && !where[1].str)
        where = "";
    }
    let msg = void 0;
    if (typeof message === "string")
      msg = this.string(message);
    if (!msg && typeof message !== "string")
      msg = new BoxedFunction(this, "ErrorCode", [
        this.string(message[0]),
        ...message.slice(1).map((x) => {
          console.assert(typeof x !== "string");
          return this.box(x, { canonical: false });
        })
      ]);
    if (!where)
      return new BoxedFunction(this, "Error", [msg], { canonical: false });
    return new BoxedFunction(
      this,
      "Error",
      [msg, this.box(where, { canonical: false })],
      { canonical: false }
    );
  }
  domainError(expectedDomain, actualDomain, where) {
    const expected = isDomain(expectedDomain) ? this.domain(expectedDomain) : this.symbol(expectedDomain);
    const actual = actualDomain ? actualDomain : this.symbol("Undefined");
    return this.error(["incompatible-domain", expected, actual], where);
  }
  /**
   * Add a`["Hold"]` wrapper to `expr.
   */
  hold(expr) {
    return this._fn("Hold", [this.box(expr, { canonical: false })]);
  }
  /** Shortcut for `this.fn("Add"...)`.
   *
   * The result is canonical.
   */
  add(ops2, metadata) {
    const result = canonicalAdd(this, flattenOps(flattenSequence(ops2), "Add"));
    if (metadata?.latex !== void 0)
      result.latex = metadata.latex;
    return result;
  }
  /** Shortcut for `this.fn("Negate", [expr])`
   *
   * The result is canonical.
   */
  neg(expr, metadata) {
    return canonicalNegate(expr, metadata);
  }
  /** Shortcut for `this.fn("Multiply"...)`
   *
   * The result is canonical.
   */
  mul(ops2, metadata) {
    const result = canonicalMultiply(
      this,
      flattenOps(flattenSequence(ops2), " Multiply")
    );
    if (metadata?.latex !== void 0)
      result.latex = metadata.latex;
    return result;
  }
  /** Shortcut for `this.fn("Divide", [num, denom])`
   *
   * The result is canonical.
   */
  div(num, denom, metadata) {
    const result = canonicalDivide(this, num, denom);
    if (metadata?.latex !== void 0)
      result.latex = metadata.latex;
    return result;
  }
  /** Shortcut for `this.fn("Sqrt"...)`
   *
   * The result is canonical.
   */
  sqrt(base, metadata) {
    return canonicalPower(this, base, this.Half, metadata);
  }
  /** Shortcut for `this.fn("Power"...)`
   *
   * The result is canonical.
   */
  pow(base, exponent, metadata) {
    if (base.symbol === "ExponentialE" && exponent instanceof import_complex21.Complex) {
      const im = exponent.im;
      const re = exponent.re;
      if (re === 0)
        return this.number(this.complex(Math.cos(im), Math.sin(im)));
      if (im === 0)
        return this.number(Math.exp(re));
      const e2 = Math.exp(re);
      return this.number(this.complex(e2 * Math.cos(im), e2 * Math.sin(im)));
    }
    if (exponent instanceof _BoxedExpression) {
      const num = exponent.numericValue;
      if (num !== null) {
        if (typeof num === "number")
          exponent = num;
        if (isRational(num))
          exponent = num;
      }
    }
    let e = null;
    if (typeof exponent === "number")
      e = exponent;
    else if (isRational(exponent)) {
      if (isRationalZero(exponent))
        return this.One;
      if (isRationalOne(exponent))
        return base;
      if (isMachineRational(exponent) && exponent[1] === 1)
        e = exponent[0];
      else if (isBigRational(exponent) && exponent[1] === BigInt(1))
        e = Number(exponent[0]);
    }
    if (e === 0)
      return this.One;
    if (e === 1)
      return base;
    const r = base.numericValue;
    if (e === -1 && r !== null) {
      if (typeof r === "number" && Number.isInteger(r))
        return this.number([1, r]);
      else if (r instanceof Decimal && r.isInteger())
        return this.number([BigInt(1), bigint(r)]);
      else if (isRational(r))
        return this.number([r[1], r[0]]);
    }
    if (typeof exponent === "number" || isRational(exponent))
      exponent = this.number(exponent);
    return canonicalPower(this, base, exponent, metadata);
  }
  /** Shortcut for `this.fn("Divide", [1, expr])`
   *
   * The result is canonical.
   */
  inv(expr, metadata) {
    if (expr.isOne)
      return this.One;
    if (expr.isNegativeOne)
      return this.NegativeOne;
    if (expr.isInfinity)
      return this.Zero;
    const n = expr.numericValue;
    if (n !== null) {
      if (isRational(n))
        return this.number(inverse(n), { metadata });
      if (typeof n === "number" && Number.isInteger(n))
        return this.number([1, n], { metadata });
      if (n instanceof Decimal && n.isInteger())
        return this.number([BigInt(1), bigint(n)], { metadata });
      return this._fn("Divide", [this.One, expr], metadata);
    }
    if (expr.head === "Sqrt")
      return this._fn("Sqrt", [this.inv(expr.op1)], metadata);
    if (expr.head === "Divide")
      return this._fn("Divide", [expr.op1, expr.op2], metadata);
    let e = this.NegativeOne;
    if (expr.head === "Power") {
      if (expr.op2.isNegativeOne)
        return expr.op1;
      e = canonicalNegate(expr.op2);
      expr = expr.op1;
    }
    if (e.isNegativeOne)
      return this._fn("Divide", [this.One, expr], metadata);
    return this._fn("Power", [expr, e], metadata);
  }
  /** Shortcut for `this.fn("Pair"...)`
   *
   * The result is canonical.
   */
  pair(first, second, metadata) {
    return new BoxedFunction(this, "Tuple", [first, second], {
      metadata,
      canonical: true
    });
  }
  tuple(elements, metadata) {
    if (typeof elements[0] === "number") {
      return new BoxedFunction(
        this,
        "Tuple",
        elements.map((x) => this.number(x)),
        {
          metadata,
          canonical: true
        }
      );
    }
    return new BoxedFunction(
      this,
      "Tuple",
      canonical(elements),
      {
        metadata,
        canonical: true
      }
    );
  }
  array(elements, metadata) {
    return this.Nothing;
  }
  string(s, metadata) {
    return new BoxedString(this, s, metadata);
  }
  /** Return a boxed symbol */
  symbol(name, options) {
    options = options ? { ...options } : {};
    if (!("canonical" in options))
      options.canonical = true;
    name = name.normalize();
    if (name === "NaN")
      return this.NaN;
    if (name === "Infinity")
      return this.PositiveInfinity;
    if (name === "+Infinity")
      return this.PositiveInfinity;
    if (name === "-Infinity")
      return this.NegativeInfinity;
    if (name === "Half")
      return this.Half;
    if (this.strict && !isValidIdentifier(name)) {
      const where = options?.metadata?.latex;
      const nameStr = `'${name}'`;
      return this.error(
        ["invalid-identifier", { str: validateIdentifier(name) }],
        where ? ["LatexString", `'${where}'`] : nameStr
      );
    }
    if (options?.metadata?.latex !== void 0 && !options.canonical)
      return new BoxedSymbol(this, name, options);
    const result = this._commonSymbols[name];
    if (result) {
      if (!options?.metadata?.wikidata || !result.wikidata || result.wikidata === options.metadata.wikidata)
        return result;
      if (options.canonical)
        return makeCanonicalSymbol(this, name);
      return new BoxedSymbol(this, name, options);
    }
    if (options.canonical)
      return makeCanonicalSymbol(this, name);
    return new BoxedSymbol(this, name, options);
  }
  /** Return a canonical boxed domain.
   *
   * If the domain is invalid, may return an `["Error"]` expression
   *
   */
  domain(domain, metadata) {
    if (domain instanceof _BoxedDomain)
      return domain;
    if (typeof domain === "string") {
      const expr = this._commonDomains[domain];
      if (expr)
        return expr;
    }
    if (!this.strict) {
      if (typeof domain === "string") {
        const expr = DOMAIN_ALIAS[domain];
        if (expr)
          return this.domain(expr);
      }
      return new _BoxedDomain(this, domain, metadata);
    }
    if (Array.isArray(domain) && domain[0] === "Domain")
      domain = domain[1];
    if (typeof domain === "string") {
      const expr = DOMAIN_ALIAS[domain];
      if (expr)
        return this.domain(expr);
      if (!isDomainLiteral(domain))
        throw Error("Expected a domain literal, got " + domain);
      return new _BoxedDomain(this, domain, metadata);
    }
    if (!Array.isArray(domain) || domain.length === 0)
      throw Error("Expected a valid domain");
    const constructor = domain[0];
    if (!DOMAIN_CONSTRUCTORS.includes(constructor))
      throw Error("Expected a domain constructor, got " + constructor);
    return new _BoxedDomain(this, domain, metadata);
  }
  /**
   * This function tries to avoid creating a boxed number if `num` corresponds
   * to a common value for which we have a shared instance (-1, 0, NaN, etc...)
   */
  number(value, options) {
    options = options ? { ...options } : {};
    if (!("canonical" in options))
      options.canonical = true;
    if (options.metadata === void 0) {
      if (typeof value === "bigint") {
        if (value === BigInt(1))
          return this.One;
        if (value === BigInt(0))
          return this.Zero;
        if (value === BigInt(-1))
          return this.NegativeOne;
      }
      if (typeof value === "number") {
        const n = value;
        if (n === 1)
          return this.One;
        if (n === 0)
          return this.Zero;
        if (n === -1)
          return this.NegativeOne;
        if (Number.isInteger(n) && this._commonNumbers[n] !== void 0) {
          if (this._commonNumbers[n] === null)
            this._commonNumbers[n] = boxNumber(this, value) ?? this.NaN;
          return this._commonNumbers[n];
        }
        if (Number.isNaN(n))
          return this.NaN;
        if (!Number.isFinite(n))
          return n < 0 ? this.NegativeInfinity : this.PositiveInfinity;
      }
    }
    if (typeof value === "bigint")
      value = this.bignum(value);
    return boxNumber(this, value, options) ?? this.NaN;
  }
  rules(rules) {
    return boxRules(this, rules);
  }
  pattern(expr) {
    return new BoxedPattern(this, expr);
  }
  parse(latex, options) {
    if (typeof latex !== "string")
      return null;
    const result = this.latexSyntax.parse(latexString(latex) ?? latex);
    return this.box(result, options);
  }
  /** Serialize a `BoxedExpression` or a `MathJSON` expression to
   * a LaTeX string
   */
  serialize(x, options) {
    if (typeof x === "object" && "json" in x) {
      const ce = "engine" in x ? x.engine : this;
      return this.latexSyntax.serialize(
        this.rawJson(ce.box(x, { canonical: false })),
        options
      );
    }
    return this.latexSyntax.serialize(x, options);
  }
  /**
   * Options to control the serialization of MathJSON expression to LaTeX
   * when using `this.latex` or `this.engine.serialize()`.
   *
   *
   * {@inheritDoc  NumberFormattingOptions}
   * {@inheritDoc  ParseLatexOptions}
   * {@inheritDoc  SerializeLatexOptions}
   *
   */
  get latexOptions() {
    const latexSyntax = this.latexSyntax;
    return new Proxy(
      {
        ...this.latexSyntax.options,
        ...this.latexSyntax.serializer.options
      },
      {
        set(options, prop, value) {
          if (!(prop in options))
            return false;
          latexSyntax.updateOptions({ [prop]: value });
          return true;
        }
      }
    );
  }
  set latexOptions(opts) {
    this.latexSyntax.updateOptions(opts);
  }
  /** {@inheritDoc  JsonSerializationOptions} */
  get jsonSerializationOptions() {
    if (this._useRawJsonSerializationOptions) {
      return new Proxy(this._rawJsonSerializationOptions, {
        get(options, prop) {
          if (!(prop in options))
            return void 0;
          return options[prop];
        }
      });
    }
    const self = this;
    return new Proxy(this._jsonSerializationOptions, {
      get(options, prop) {
        if (!(prop in options))
          return void 0;
        return options[prop];
      },
      set(options, prop, value) {
        if (!(prop in options))
          return false;
        self.jsonSerializationOptions = { [prop]: value };
        return true;
      }
    });
  }
  set jsonSerializationOptions(val) {
    if (val.exclude)
      this._jsonSerializationOptions.exclude = [...val.exclude];
    if (val.shorthands) {
      if (val.shorthands === "all" || val.shorthands.includes("all")) {
        this._jsonSerializationOptions.shorthands = [
          "function",
          "symbol",
          "string",
          "dictionary",
          "number"
        ];
      } else
        this._jsonSerializationOptions.shorthands = [...val.shorthands];
    }
    if (val.metadata) {
      if (val.metadata === "all" || val.metadata.includes("all")) {
        this._jsonSerializationOptions.metadata = ["latex", "wikidata"];
      } else
        this._jsonSerializationOptions.metadata = [...val.metadata];
    }
    if (typeof val.precision === "number" && val.precision > 0) {
      this._jsonSerializationOptions.precision = val.precision;
    }
    if (typeof val.repeatingDecimals === "boolean") {
      this._jsonSerializationOptions.repeatingDecimals = val.repeatingDecimals;
    }
  }
  rawJson(expr) {
    const save = this._useRawJsonSerializationOptions;
    this._useRawJsonSerializationOptions = true;
    const result = expr.json;
    this._useRawJsonSerializationOptions = save;
    return result;
  }
  /**
   * Return a list of all the assumptions that match a pattern.
   *
   * ```js
   *  ce.assume(['Element', 'x', 'PositiveIntegers');
   *  ce.ask(['Greater', 'x', '_val'])
   *  //  -> [{'val': 0}]
   * ```
   */
  ask(pattern) {
    const pat = this.pattern(pattern);
    const result = [];
    for (const [assumption, val] of this.assumptions) {
      const m = pat.match(assumption, {
        numericTolerance: this._tolerance
      });
      if (m !== null && val === true)
        result.push(m);
    }
    return result;
  }
  /**
   * Answer a query based on the current assumptions.
   *
   */
  verify(_query) {
    return false;
  }
  /**
   * Add an assumption.
   *
   * Note that the assumption is put into canonical form before being added.
   *
   * @param symbol - The symbol to make an assumption about
   *
   * Returns:
   * - `contradiction` if the new assumption is incompatible with previous
   * ones.
   * - `tautology` if the new assumption is redundant with previous ones.
   * - `ok` if the assumption was successfully added to the assumption set.
   *
   *
   */
  assume(predicate) {
    try {
      return assume(this.box(predicate, { canonical: false }));
    } catch (e) {
      console.error(e.toString());
      return "internal-error";
    }
  }
  /** Remove all assumptions about one or more symbols */
  forget(symbol2) {
    if (!this.context)
      throw Error("No scope available");
    if (symbol2 === void 0) {
      if (this.context.ids)
        for (const k of this.context.ids.keys())
          this.forget(k);
      this.assumptions.clear();
      return;
    }
    if (Array.isArray(symbol2)) {
      for (const x of symbol2)
        this.forget(x);
      return;
    }
    if (typeof symbol2 === "string") {
      if (this.context.ids) {
        const def = this.context.ids.get(symbol2);
        if (def instanceof _BoxedSymbolDefinition)
          def.value = void 0;
        else if (def instanceof _BoxedFunctionDefinition) {
          const sig = def.signature;
          def.signature = {
            ...sig,
            evaluate: void 0,
            N: void 0,
            simplify: void 0,
            canonical: void 0
          };
        }
      }
      for (const [assumption, _val] of this.assumptions) {
        if (assumption.symbols.includes(symbol2))
          this.assumptions.delete(assumption);
      }
    }
  }
};
function isFunctionValue(value) {
  if (typeof value === "function")
    return true;
  if (value instanceof _BoxedExpression && value.domain?.base === "Functions")
    return true;
  return false;
}

// src/compute-engine.ts
var version = "0.22.0";
globalThis[Symbol.for("io.cortexjs.compute-engine")] = {
  ComputeEngine: ComputeEngine.prototype.constructor,
  version: "0.22.0"
};
export {
  ADDITION_PRECEDENCE,
  ARROW_PRECEDENCE,
  ASSIGNMENT_PRECEDENCE,
  COMPARISON_PRECEDENCE,
  ComputeEngine,
  DIVISION_PRECEDENCE,
  EXPONENTIATION_PRECEDENCE,
  MULTIPLICATION_PRECEDENCE,
  POSTFIX_PRECEDENCE,
  isEnvironmentEntry,
  isExpressionEntry,
  isFunctionEntry,
  isInfixEntry,
  isMatchfixEntry,
  isPostfixEntry,
  isPrefixEntry,
  isSymbolEntry,
  version
};
/*! Bundled license information:

complex.js/complex.js:
  (**
   * @license Complex.js v2.1.1 12/05/2020
   *
   * Copyright (c) 2020, Robert Eisele (robert@xarg.org)
   * Dual licensed under the MIT or GPL Version 2 licenses.
   **)

decimal.js/decimal.mjs:
  (*!
   *  decimal.js v10.4.3
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js
   *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Licence
   *)
*/
