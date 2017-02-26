(function () {
    var h = this, l = function (a) {
        return "string" == typeof a
    };
    var n = function () {
        var a = !1;
        try {
            var b = Object.defineProperty({}, "passive", {
                get: function () {
                    a = !0
                }
            });
            h.addEventListener("test", null, b)
        } catch (d) {
        }
        return a
    }(), aa = function (a, b, d) {
        a.addEventListener ? a.addEventListener(b, d, n ? void 0 : !1) : a.attachEvent && a.attachEvent("on" + b, d)
    };
    var q = function (a) {
        return {
                visible: 1,
                hidden: 2,
                prerender: 3,
                preview: 4
            }[a.webkitVisibilityState || a.mozVisibilityState || a.visibilityState || ""] || 0
    }, ba = function (a) {
        var b;
        a.mozVisibilityState ? b = "mozvisibilitychange" : a.webkitVisibilityState ? b = "webkitvisibilitychange" : a.visibilityState && (b = "visibilitychange");
        return b
    }, r = function (a, b) {
        if (3 == q(b))return !1;
        a();
        return !0
    }, ca = function (a, b) {
        if (!r(a, b)) {
            var d = !1, c = ba(b), e = function () {
                if (!d && r(a, b)) {
                    d = !0;
                    var f = e;
                    b.removeEventListener ? b.removeEventListener(c, f, n ? void 0 :
                            !1) : b.detachEvent && b.detachEvent("on" + c, f)
                }
            };
            c && aa(b, c, e)
        }
    };
    var t = function (a) {
        a = parseFloat(a);
        return isNaN(a) || 1 < a || 0 > a ? 0 : a
    };
    var da = t("0.20"), ea = t("0.01");
    var fa = /^true$/.test("false") ? !0 : !1;
    var u = String.prototype.trim ? function (a) {
            return a.trim()
        } : function (a) {
            return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
        }, w = function (a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    };
    var ga = Array.prototype.indexOf ? function (a, b, d) {
            return Array.prototype.indexOf.call(a, b, d)
        } : function (a, b, d) {
            d = null == d ? 0 : 0 > d ? Math.max(0, a.length + d) : d;
            if (l(a))return l(b) && 1 == b.length ? a.indexOf(b, d) : -1;
            for (; d < a.length; d++)if (d in a && a[d] === b)return d;
            return -1
        }, ha = Array.prototype.filter ? function (a, b, d) {
            return Array.prototype.filter.call(a, b, d)
        } : function (a, b, d) {
            for (var c = a.length, e = [], f = 0, g = l(a) ? a.split("") : a, k = 0; k < c; k++)if (k in g) {
                var m = g[k];
                b.call(d, m, k, a) && (e[f++] = m)
            }
            return e
        }, ia = Array.prototype.map ?
        function (a, b, d) {
            return Array.prototype.map.call(a, b, d)
        } : function (a, b, d) {
            for (var c = a.length, e = Array(c), f = l(a) ? a.split("") : a, g = 0; g < c; g++)g in f && (e[g] = b.call(d, f[g], g, a));
            return e
        }, ja = function (a) {
        return Array.prototype.concat.apply(Array.prototype, arguments)
    };
    var x = function (a) {
        var b = [], d = 0, c;
        for (c in a)b[d++] = a[c];
        return b
    };
    var y;
    a:{
        var z = h.navigator;
        if (z) {
            var A = z.userAgent;
            if (A) {
                y = A;
                break a
            }
        }
        y = ""
    }
    ;
    var B = function (a) {
        B[" "](a);
        return a
    };
    B[" "] = function () {
    };
    var na = function (a, b) {
        var d = ma;
        Object.prototype.hasOwnProperty.call(d, a) || (d[a] = b(a))
    };
    var oa = -1 != y.indexOf("Opera"), C = -1 != y.indexOf("Trident") || -1 != y.indexOf("MSIE"), pa = -1 != y.indexOf("Edge"), D = -1 != y.indexOf("Gecko") && !(-1 != y.toLowerCase().indexOf("webkit") && -1 == y.indexOf("Edge")) && !(-1 != y.indexOf("Trident") || -1 != y.indexOf("MSIE")) && -1 == y.indexOf("Edge"), qa = -1 != y.toLowerCase().indexOf("webkit") && -1 == y.indexOf("Edge"), E = function () {
        var a = h.document;
        return a ? a.documentMode : void 0
    }, F;
    a:{
        var G = "", H = function () {
            var a = y;
            if (D)return /rv\:([^\);]+)(\)|;)/.exec(a);
            if (pa)return /Edge\/([\d\.]+)/.exec(a);
            if (C)return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (qa)return /WebKit\/(\S+)/.exec(a);
            if (oa)return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();
        H && (G = H ? H[1] : "");
        if (C) {
            var I = E();
            if (null != I && I > parseFloat(G)) {
                F = String(I);
                break a
            }
        }
        F = G
    }
    var J = F, ma = {}, K = function (a) {
        na(a, function () {
            for (var b = 0, d = u(String(J)).split("."), c = u(String(a)).split("."), e = Math.max(d.length, c.length), f = 0; 0 == b && f < e; f++) {
                var g = d[f] || "", k = c[f] || "";
                do {
                    g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
                    k = /(\d*)(\D*)(.*)/.exec(k) || ["", "", "", ""];
                    if (0 == g[0].length && 0 == k[0].length)break;
                    b = w(0 == g[1].length ? 0 : parseInt(g[1], 10), 0 == k[1].length ? 0 : parseInt(k[1], 10)) || w(0 == g[2].length, 0 == k[2].length) || w(g[2], k[2]);
                    g = g[3];
                    k = k[3]
                } while (0 == b)
            }
            return 0 <= b
        })
    }, M;
    var N = h.document;
    M = N && C ? E() || ("CSS1Compat" == N.compatMode ? parseInt(J, 10) : 5) : void 0;
    var O;
    if (!(O = !D && !C)) {
        var P;
        if (P = C) P = 9 <= Number(M);
        O = P
    }
    O || D && K("1.9.1");
    C && K("9");
    var Q = function (a, b) {
        for (var d in a)Object.prototype.hasOwnProperty.call(a, d) && b.call(void 0, a[d], d, a)
    };
    var ra = function (a, b, d) {
        for (; 0 <= (b = a.indexOf("fmt", b)) && b < d;) {
            var c = a.charCodeAt(b - 1);
            if (38 == c || 63 == c)if (c = a.charCodeAt(b + 3), !c || 61 == c || 38 == c || 35 == c)return b;
            b += 4
        }
        return -1
    }, sa = /#|$/, ta = /[?&]($|#)/;
    var ua = function () {
        this.h = {};
        this.a = {};
        for (var a = [2, 3], b = 0, d = a.length; b < d; ++b)this.a[a[b]] = ""
    }, va = function () {
        try {
            var a = h.top.location.hash;
            if (a) {
                var b = a.match(/\bdeid=([\d,]+)/);
                return b && b[1] || ""
            }
        } catch (d) {
        }
        return ""
    }, wa = function (a, b, d) {
        var c = R;
        if (d ? c.a.hasOwnProperty(d) && "" == c.a[d] : 1) {
            var e;
            if (e = (e = va().match(new RegExp("\\b(" + a.join("|") + ")\\b"))) && e[0] || null) a = e; else a:{
                if (!(1E-4 > Math.random()) && (e = Math.random(), e < b)) {
                    try {
                        var f = new Uint32Array(1);
                        h.crypto.getRandomValues(f);
                        e = f[0] / 65536 / 65536
                    } catch (g) {
                        e =
                            Math.random()
                    }
                    a = a[Math.floor(e * a.length)];
                    break a
                }
                a = null
            }
            a && "" != a && (d ? c.a.hasOwnProperty(d) && (c.a[d] = a) : c.h[a] = !0)
        }
    }, xa = function (a) {
        var b = R;
        return b.a.hasOwnProperty(a) ? b.a[a] : ""
    }, ya = function () {
        var a = R, b = [];
        Q(a.h, function (a, c) {
            b.push(c)
        });
        Q(a.a, function (a) {
            "" != a && b.push(a)
        });
        return b
    };
    var R, S = "google_conversion_id google_conversion_format google_conversion_type google_conversion_order_id google_conversion_language google_conversion_value google_conversion_currency google_conversion_domain google_conversion_label google_conversion_color google_disable_viewthrough google_enable_display_cookie_match google_remarketing_only google_remarketing_for_search google_conversion_items google_custom_params google_conversion_date google_conversion_time google_conversion_js_version onload_callback opt_image_generator google_conversion_page_url google_conversion_referrer_url".split(" "),
        T = ["google_conversion_first_time", "google_conversion_snippets"];

    function U(a) {
        return null != a ? encodeURIComponent(a.toString()) : ""
    }

    function za(a) {
        return null != a ? a.toString().substring(0, 512) : ""
    }

    function V(a, b) {
        b = U(b);
        return "" != b && (a = U(a), "" != a) ? "&".concat(a, "=", b) : ""
    }

    function W(a) {
        var b = typeof a;
        return null == a || "object" == b || "function" == b ? null : String(a).replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/=/g, "\\=")
    }

    function Aa(a) {
        var b;
        if ((a = a.google_custom_params) && "object" == typeof a && "function" != typeof a.join) {
            var d = [];
            for (b in a)if (Object.prototype.hasOwnProperty.call(a, b)) {
                var c = a[b];
                if (c && "function" == typeof c.join) {
                    for (var e = [], f = 0; f < c.length; ++f) {
                        var g = W(c[f]);
                        null != g && e.push(g)
                    }
                    c = 0 == e.length ? null : e.join(",")
                } else c = W(c);
                (e = W(b)) && null != c && d.push(e + "=" + c)
            }
            b = d.join(";")
        } else b = "";
        return "" == b ? "" : "&".concat("data=", encodeURIComponent(b))
    }

    function X(a) {
        return "number" != typeof a && "string" != typeof a ? "" : U(a.toString())
    }

    function Ba(a) {
        if (!a)return "";
        a = a.google_conversion_items;
        if (!a)return "";
        for (var b = [], d = 0, c = a.length; d < c; d++) {
            var e = a[d], f = [];
            e && (f.push(X(e.value)), f.push(X(e.quantity)), f.push(X(e.item_id)), f.push(X(e.adwords_grouping)), f.push(X(e.sku)), b.push("(" + f.join("*") + ")"))
        }
        return 0 < b.length ? "&item=" + b.join("") : ""
    }

    function Ca(a, b, d) {
        var c = [];
        if (a) {
            var e = a.screen;
            e && (c.push(V("u_h", e.height)), c.push(V("u_w", e.width)), c.push(V("u_ah", e.availHeight)), c.push(V("u_aw", e.availWidth)), c.push(V("u_cd", e.colorDepth)));
            a.history && c.push(V("u_his", a.history.length))
        }
        d && "function" == typeof d.getTimezoneOffset && c.push(V("u_tz", -d.getTimezoneOffset()));
        b && ("function" == typeof b.javaEnabled && c.push(V("u_java", b.javaEnabled())), b.plugins && c.push(V("u_nplug", b.plugins.length)), b.mimeTypes && c.push(V("u_nmime", b.mimeTypes.length)));
        return c.join("")
    }

    function Da(a) {
        a = a ? a.title : "";
        if (void 0 == a || "" == a)return "";
        var b = function (a) {
            try {
                return decodeURIComponent(a), !0
            } catch (e) {
                return !1
            }
        };
        a = encodeURIComponent(a);
        for (var d = 256; !b(a.substr(0, d));)d--;
        return "&tiba=" + a.substr(0, d)
    }

    function Ea(a, b, d, c) {
        var e = "";
        if (b) {
            var f;
            if (a.top == a) f = 0; else {
                var g = a.location.ancestorOrigins;
                if (g) f = g[g.length - 1] == a.location.origin ? 1 : 2; else {
                    g = a.top;
                    try {
                        var k;
                        if (k = !!g && null != g.location.href)c:{
                            try {
                                B(g.foo);
                                k = !0;
                                break c
                            } catch (m) {
                            }
                            k = !1
                        }
                        f = k
                    } catch (m) {
                        f = !1
                    }
                    f = f ? 1 : 2
                }
            }
            a = d ? d : 1 == f ? a.top.location.href : a.location.href;
            e += V("frm", f);
            e += V("url", za(a));
            e += V("ref", za(c || b.referrer))
        }
        return e
    }

    function Y(a, b) {
        return !(fa || b && Fa.test(navigator.userAgent)) || a && a.location && a.location.protocol && "https:" == a.location.protocol.toString().toLowerCase() ? "https:" : "http:"
    }

    function Ga(a, b, d) {
        d = d.google_remarketing_only ? "googleads.g.doubleclick.net" : d.google_conversion_domain || "www.googleadservices.com";
        return Y(a, /www[.]googleadservices[.]com/i.test(d)) + "//" + d + "/pagead/" + b
    }

    function Ha(a, b, d, c) {
        var e = "/?";
        "landing" == c.google_conversion_type && (e = "/extclk?");
        var e = Ga(a, [c.google_remarketing_only ? "viewthroughconversion/" : "conversion/", U(c.google_conversion_id), e, "random=", U(c.google_conversion_time)].join(""), c), f;
        a:{
            f = c.google_conversion_language;
            if (null != f) {
                f = f.toString();
                if (2 == f.length) {
                    f = V("hl", f);
                    break a
                }
                if (5 == f.length) {
                    f = V("hl", f.substring(0, 2)) + V("gl", f.substring(3, 5));
                    break a
                }
            }
            f = ""
        }
        a = [V("cv", c.google_conversion_js_version), V("fst", c.google_conversion_first_time),
                V("num", c.google_conversion_snippets), V("fmt", c.google_conversion_format), V("value", c.google_conversion_value), V("currency_code", c.google_conversion_currency), V("label", c.google_conversion_label), V("oid", c.google_conversion_order_id), V("bg", c.google_conversion_color), f, V("guid", "ON"), V("disvt", c.google_disable_viewthrough), V("eid", ya().join()), Ba(c), Ca(a, b, c.google_conversion_date), Aa(c), Ea(a, d, c.google_conversion_page_url, c.google_conversion_referrer_url), c.google_remarketing_for_search && !c.google_conversion_domain ?
                    "&srr=n" : "", Da(d)].join("") + Ia();
        return e + a
    }

    var Ja = function (a, b, d, c, e, f) {
        return '<iframe name="' + a + '" title="' + b + '" width="' + c + '" height="' + e + '" src="' + d + '" frameborder="0" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true"' + (f ? ' style="display:none"' : "") + ' scrolling="no"></iframe>'
    };

    function Ka(a) {
        return {
            ar: 1,
            bg: 1,
            cs: 1,
            da: 1,
            de: 1,
            el: 1,
            en_AU: 1,
            en_US: 1,
            en_GB: 1,
            es: 1,
            et: 1,
            fi: 1,
            fr: 1,
            hi: 1,
            hr: 1,
            hu: 1,
            id: 1,
            is: 1,
            it: 1,
            iw: 1,
            ja: 1,
            ko: 1,
            lt: 1,
            nl: 1,
            no: 1,
            pl: 1,
            pt_BR: 1,
            pt_PT: 1,
            ro: 1,
            ru: 1,
            sk: 1,
            sl: 1,
            sr: 1,
            sv: 1,
            th: 1,
            tl: 1,
            tr: 1,
            vi: 1,
            zh_CN: 1,
            zh_TW: 1
        }[a] ? a + ".html" : "en_US.html"
    }

    var Z = {g: {c: "27391101", b: "27391102"}, f: {c: "376635470", b: "376635471"}}, Ia = function () {
        var a = ja.apply([], ia(x(Z), function (a) {
            return x(a)
        }, void 0)), b = ha(va().split(","), function (b) {
            return "" != b && !(0 <= ga(a, b))
        });
        return 0 < b.length ? "&debug_experiment_id=" + b.join(",") : ""
    }, Fa = /Android ([01]\.|2\.[01])/i, La = function () {
        var a = Z.g;
        R && wa([a.c, a.b], ea, 3)
    }, Ma = function (a, b) {
        if (!b.google_remarketing_only || !b.google_enable_display_cookie_match || (R ? xa(2) : "") != Z.f.b)return "";
        a = Y(a, !1) + "//bid.g.doubleclick.net/xbbe/pixel?d=KAE";
        return Ja("google_cookie_match_frame", "Google cookie match frame", a, 1, 1, !0)
    };

    function Na(a, b, d, c) {
        var e = "";
        c.google_remarketing_only && c.google_enable_display_cookie_match && (R && wa([Z.f.c, Z.f.b], da, 2), e = Ma(a, c));
        3 != c.google_conversion_format || c.google_remarketing_only || c.google_conversion_domain || La();
        b = Ha(a, b, d, c);
        var f = function (a, b, c, d) {
            return '<img height="' + c + '" width="' + b + '" border="0" alt="" src="' + a + '"' + (d ? ' style="display:none"' : "") + " />"
        };
        return 0 == c.google_conversion_format && null == c.google_conversion_domain ? '<a href="' + (Y(a, !1) + "//services.google.com/sitestats/" + Ka(c.google_conversion_language) +
            "?cid=" + U(c.google_conversion_id)) + '" target="_blank">' + f(b, 135, 27, !1) + "</a>" + e : 1 < c.google_conversion_snippets || 3 == c.google_conversion_format ? Oa(d, b) ? e : f(b, 1, 1, !0) + e : Ja("google_conversion_frame", "Google conversion frame", b, 2 == c.google_conversion_format ? 200 : 300, 2 == c.google_conversion_format ? 26 : 13, !1) + e
    }

    function Pa() {
        return new Image
    }

    function Oa(a, b) {
        if ((R ? xa(3) : "") == Z.g.b)try {
            var d;
            var c;
            var e = b.search(sa), f = ra(b, 0, e);
            if (0 > f) c = null; else {
                var g = b.indexOf("&", f);
                if (0 > g || g > e) g = e;
                f += 4;
                c = decodeURIComponent(b.substr(f, g - f).replace(/\+/g, " "))
            }
            if (3 != c) d = !1; else {
                var k = b.search(sa);
                c = 0;
                for (var m, e = []; 0 <= (m = ra(b, c, k));)e.push(b.substring(c, m)), c = Math.min(b.indexOf("&", m) + 1 || k, k);
                e.push(b.substr(c));
                var p = [e.join("").replace(ta, "$1"), "&", "fmt"];
                p.push("=", encodeURIComponent("4"));
                if (p[1]) {
                    var v = p[0], L = v.indexOf("#");
                    0 <= L && (p.push(v.substr(L)),
                        p[0] = v = v.substr(0, L));
                    var ka = v.indexOf("?");
                    0 > ka ? p[1] = "?" : ka == v.length - 1 && (p[1] = void 0)
                }
                var la = a.createElement("script");
                la.src = p.join("");
                a.getElementsByTagName("script")[0].parentElement.appendChild(la);
                d = !0
            }
            return d
        } catch (Wa) {
        }
        return !1
    }

    function Qa(a, b) {
        var d = a.opt_image_generator && a.opt_image_generator.call;
        b += V("async", "1");
        var c = Pa;
        d && (c = a.opt_image_generator);
        a = c();
        a.src = b;
        a.onload = function () {
        }
    }

    function Ra(a, b, d) {
        var c;
        c = [U(d.google_conversion_id), "/?random=", Math.floor(1E9 * Math.random())].join("");
        c = Y(a, !1) + "//www.google.com/ads/user-lists/" + c;
        c += [V("label", d.google_conversion_label), V("fmt", "3"), Ea(a, b, d.google_conversion_page_url, d.google_conversion_referrer_url)].join("");
        Qa(d, c)
    }

    function Sa(a) {
        if ("landing" == a.google_conversion_type || !a.google_conversion_id || a.google_remarketing_only && a.google_disable_viewthrough)return !1;
        a.google_conversion_date = new Date;
        a.google_conversion_time = a.google_conversion_date.getTime();
        a.google_conversion_snippets = "number" == typeof a.google_conversion_snippets && 0 < a.google_conversion_snippets ? a.google_conversion_snippets + 1 : 1;
        "number" != typeof a.google_conversion_first_time && (a.google_conversion_first_time = a.google_conversion_time);
        a.google_conversion_js_version =
            "8";
        0 != a.google_conversion_format && 1 != a.google_conversion_format && 2 != a.google_conversion_format && 3 != a.google_conversion_format && (a.google_conversion_format = 1);
        !1 !== a.google_enable_display_cookie_match && (a.google_enable_display_cookie_match = !0);
        R = new ua;
        return !0
    }

    function Ta(a) {
        for (var b = 0; b < S.length; b++)a[S[b]] = null
    }

    function Ua(a) {
        for (var b = {}, d = 0; d < S.length; d++)b[S[d]] = a[S[d]];
        for (d = 0; d < T.length; d++)b[T[d]] = a[T[d]];
        return b
    }

    function Va(a) {
        var b = document.getElementsByTagName("head")[0];
        b || (b = document.createElement("head"), document.getElementsByTagName("html")[0].insertBefore(b, document.getElementsByTagName("body")[0]));
        var d = document.createElement("script");
        d.src = Ga(window, "conversion_debug_overlay.js", a);
        b.appendChild(d)
    };
    (function (a, b, d) {
        if (a)if (null != /[\?&;]google_debug/.exec(document.URL)) Va(a); else {
            try {
                if (Sa(a))if (3 == q(d)) {
                    var c = Ua(a), e = "google_conversion_" + Math.floor(1E9 * Math.random());
                    d.write('<span id="' + e + '"></span>');
                    ca(function () {
                        try {
                            var f = d.getElementById(e);
                            f && (f.innerHTML = Na(a, b, d, c), c.google_remarketing_for_search && !c.google_conversion_domain && Ra(a, d, c))
                        } catch (g) {
                        }
                    }, d)
                } else d.write(Na(a, b, d, a)), a.google_remarketing_for_search && !a.google_conversion_domain && Ra(a, d, a)
            } catch (f) {
            }
            Ta(a)
        }
    })(window, navigator,
        document);
}).call(this);