var t = Object.defineProperty,
	i = (i, e) => {
		let s = {};
		for (var r in i) t(s, r, { get: i[r], enumerable: !0 });
		return (e || t(s, Symbol.toStringTag, { value: 'Module' }), s);
	},
	e = class {
		i;
		h;
		o;
		u;
		l;
		_;
		p;
		m;
		v;
		M = !1;
		A = /* @__PURE__ */ new Set();
		C() {
			if (
				((this.o = this.i * this.m),
				(this.u = this.h * this.v),
				(this.l = Math.floor((this.p.width - this.o) / 2)),
				(this._ = Math.floor((this.p.height - this.u) / 2)),
				this.A.size > 0)
			)
				for (const t of this.A) t();
		}
		constructor(t, i, e) {
			((this.p = t), (this.m = i), (this.v = e), this.reset());
		}
		S(t) {
			this.A.add(t);
		}
		F(t) {
			this.A.delete(t);
		}
		reset() {
			(this.M ||
				((this.i = Math.max(1, Math.floor(this.p.width / this.m))),
				(this.h = Math.max(1, Math.floor(this.p.height / this.v)))),
				this.C());
		}
		U(t, i) {
			((this.m = t), (this.v = i), this.reset());
		}
		get cellWidth() {
			return this.m;
		}
		get cellHeight() {
			return this.v;
		}
		get cols() {
			return this.i;
		}
		set cols(t) {
			((this.M = !0),
				(this.i = Math.max(1, Math.floor(t))),
				'number' != typeof this.h && (this.h = Math.max(1, Math.floor(this.p.height / this.v))),
				this.C());
		}
		get rows() {
			return this.h;
		}
		set rows(t) {
			((this.M = !0),
				(this.h = Math.max(1, Math.floor(t))),
				'number' != typeof this.i && (this.i = Math.max(1, Math.floor(this.p.width / this.m))),
				this.C());
		}
		get width() {
			return this.o;
		}
		get height() {
			return this.u;
		}
		get offsetX() {
			return this.l;
		}
		get offsetY() {
			return this._;
		}
		responsive() {
			this.M = !1;
		}
		P(t, i) {
			const e = this.p.getBoundingClientRect(),
				s = t - e.left,
				r = i - e.top,
				n = this.p.width / e.width,
				h = r * (this.p.height / e.height),
				o = s * n - this.l,
				a = h - this._,
				c = Math.floor(o / this.m),
				u = Math.floor(a / this.v);
			return c >= 0 && c < this.i && u >= 0 && u < this.h
				? { x: c - Math.floor((this.i - 1) / 2), y: u - Math.floor(this.h / 2) }
				: { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY };
		}
		L() {
			this.A.clear();
		}
	},
	s = class {
		D = /* @__PURE__ */ new Set();
		R = !1;
		k(t) {
			this.R ? t() : this.D.add(t);
		}
		O() {
			return this.R;
		}
		dispose() {
			if (this.R) return;
			this.R = !0;
			const t = [...this.D];
			let i;
			this.D.clear();
			for (const s of t)
				try {
					s();
				} catch (e) {
					i ??= e;
				}
			if (void 0 !== i) throw i;
		}
	},
	r = class t extends Error {
		constructor(i, e, s) {
			(super(t.I(i, e, s)), (this.name = 'TextmodeError'));
		}
		static I(i, e, s = {}) {
			const { includeContext: r = !0, includeFooterArrows: n = !0 } = s;
			return `${i}${
				r && e && Object.keys(e).length > 0
					? `\n\n📋 Context:${Object.entries(e)
							.map(([i, e]) => `\n  - ${i}: ${t.N(e)}`)
							.join('')}`
					: ''
			}${n ? `\n\n${'↓'.repeat(24)}\n` : '\n\n'}`;
		}
		static N(i) {
			if (null === i) return 'null';
			if (void 0 === i) return 'undefined';
			if ('string' == typeof i) return `"${i}"`;
			if ('number' == typeof i || 'boolean' == typeof i) return String(i);
			if (Array.isArray(i))
				return 0 === i.length
					? '[]'
					: i.length <= 5
						? `[${i.map((i) => t.N(i)).join(', ')}]`
						: `[${i
								.slice(0, 3)
								.map((i) => t.N(i))
								.join(', ')}, ... +${i.length - 3} more]`;
			if ('object' == typeof i) {
				const e = Object.keys(i);
				return 0 === e.length
					? '{}'
					: e.length <= 3
						? `{ ${e.map((e) => `${e}: ${t.N(i[e])}`).join(', ')} }`
						: `{ ${e
								.slice(0, 2)
								.map((e) => `${e}: ${t.N(i[e])}`)
								.join(', ')}, ... +${e.length - 2} more }`;
			}
			return String(i);
		}
	};
function n(t, i, e) {
	if (0 === t.idRangeOffset[e]) return (i + t.idDelta[e]) & 65535;
	{
		const s = t.startCount.length,
			r = t.idRangeOffset[e] / 2 + (i - t.startCount[e]) - (s - e);
		if (r >= 0 && t.glyphIdArray && r < t.glyphIdArray.length) {
			const i = t.glyphIdArray[r];
			if (0 !== i) return (i + t.idDelta[e]) & 65535;
		}
	}
	return 0;
}
var h = /* @__PURE__ */ new WeakMap();
function o(t) {
	return 0 === t.platformID || (3 === t.platformID && (1 === t.encodingID || 10 === t.encodingID));
}
function a(t) {
	const i = h.get(t);
	if (i) return i;
	const e = (function (t) {
		const i = t.cmap;
		if (!i?.tables) return { characterTables: [], lookupTables: [] };
		const e = i.tables
				.map((t, e) =>
					(function (t, i, e) {
						if (
							!(function (t) {
								return 4 === t.format || 12 === t.format;
							})(i)
						)
							return null;
						const s = (function (t, i, e) {
							const s = /* @__PURE__ */ new Map();
							for (const r of t.encodings ?? []) r.tableIndex === e && s.set(u(r), r);
							for (const r of i.encodings ?? []) r.tableIndex === e && s.set(u(r), r);
							for (const [r, n] of Object.entries(t.ids ?? {})) {
								if (n !== e) continue;
								const t = c(r, i.format, e);
								t && s.set(u(t), t);
							}
							return [...s.values()];
						})(t, i, e);
						return { table: i, tableIndex: e, encodings: s, isUnicode: s.some(o) };
					})(i, t, e)
				)
				.filter((t) => null !== t)
				.filter((t) => {
					return 4 === (i = t.table).format
						? (function (t) {
								if (!(t.startCount && t.endCount && t.idRangeOffset && t.idDelta)) return !1;
								for (let i = 0; i < t.startCount.length; i++) {
									const e = t.startCount[i],
										s = t.endCount[i];
									if (65535 !== e || 65535 !== s)
										for (let r = e; r <= s; r++) if (n(t, r, i) > 0) return !0;
								}
								return !1;
							})(i)
						: (function (t) {
								if (!t.groups) return !1;
								for (let i = 0; i < t.groups.length; i += 3) {
									const e = t.groups[i],
										s = t.groups[i + 1],
										r = t.groups[i + 2];
									if (e <= s && r + (s - e) > 0) return !0;
								}
								return !1;
							})(i);
					var i;
				}),
			s = e.filter((t) => t.isUnicode),
			r = s.length > 0 ? s : e;
		return { characterTables: r, lookupTables: [...r].sort(l) };
	})(t);
	return (h.set(t, e), e);
}
function c(t, i, e) {
	const s = /^p(\d+)e(\d+)$/.exec(t);
	return s ? { platformID: Number(s[1]), encodingID: Number(s[2]), format: i, tableIndex: e } : null;
}
function u(t) {
	return `${t.platformID}:${t.encodingID}:${t.format}:${t.tableIndex}`;
}
function l(t, i) {
	const e = f(t) - f(i);
	return 0 !== e ? e : t.tableIndex - i.tableIndex;
}
function f(t) {
	const i = t.isUnicode ? 0 : 3;
	return 12 === t.table.format ? i : 4 === t.table.format ? i + 1 : i + 2;
}
var d = class {
		j(t) {
			const i = [];
			return (
				(function (t) {
					return a(t).characterTables;
				})(t).forEach(({ table: t }) => {
					if (4 === t.format) {
						const e = this.G(t);
						i.push(...e);
					} else if (12 === t.format) {
						const e = this.$(t);
						i.push(...e);
					}
				}),
				[...new Set(i)]
			);
		}
		G(t) {
			const i = [];
			if (!(t.startCount && t.endCount && t.idRangeOffset && t.idDelta)) return i;
			for (let e = 0; e < t.startCount.length; e++) {
				const s = t.startCount[e],
					r = t.endCount[e];
				if (65535 !== s || 65535 !== r) for (let h = s; h <= r; h++) n(t, h, e) > 0 && this.H(i, h);
			}
			return i;
		}
		$(t) {
			const i = [];
			if (!t.groups) return i;
			for (let e = 0; e < t.groups.length; e += 3) {
				const s = t.groups[e],
					r = t.groups[e + 1],
					n = t.groups[e + 2];
				for (let t = s; t <= r; t++) n + (t - s) > 0 && this.H(i, t);
			}
			return i;
		}
		H(t, i) {
			try {
				const e = String.fromCodePoint(i);
				t.push(e);
			} catch {}
		}
	},
	_ = class {
		constructor(t) {
			((this.X = t),
				(this.V = null),
				(this.Y = 0),
				(this.h = 0),
				(this.o = 0),
				(this.u = 0),
				(this.p = document.createElement('canvas')),
				(this.K = this.p.getContext('2d', { alpha: !0 })));
		}
		Z(t, i, e) {
			((this.Y = Math.ceil(Math.sqrt(t))),
				(this.h = Math.ceil(t / this.Y)),
				(this.o = i * this.Y),
				(this.u = e * this.h),
				(this.p.width = this.o),
				(this.p.height = this.u),
				(this.p.style.width = this.o + 'px'),
				(this.p.style.height = this.u + 'px'),
				(this.K.imageSmoothingEnabled = !1),
				(this.p.style.imageRendering = 'pixelated'),
				this.K.clearRect(0, 0, this.o, this.u));
		}
		W() {
			(this.V
				? (this.V.width === this.o && this.V.height === this.u) || this.V.resize(this.o, this.u)
				: (this.V = this.X.q(this.o, this.u, 1, { filter: 'nearest', depth: !1 })),
				this.V.J(this.p));
		}
		L() {
			(this.V?.dispose(), (this.V = null));
		}
	},
	p = class {
		constructor(t) {
			this.tt = new _(t);
		}
		it(t, i, e, s) {
			this.tt.Z(t.length, i.width, i.height);
			const r = this.tt.K;
			((r.textBaseline = 'top'),
				(r.textAlign = 'left'),
				(r.fillStyle = 'white'),
				this.et(t, i, this.tt.Y, e, s),
				this.tt.W());
		}
		et(t, i, e, s, r) {
			const n = s / r.head.unitsPerEm,
				h = this.tt.K;
			for (let o = 0; o < t.length; o++) {
				const a = t[o],
					c = o % e,
					u = Math.floor(o / e),
					l = a.glyphData;
				if (!l) continue;
				const f = l.advanceWidth * n,
					d = c * i.width,
					_ = u * i.height,
					p = d + 0.5 * i.width,
					m = _ + 0.5 * i.height,
					v = Math.round(p - 0.5 * i.width),
					g = Math.round(m - 0.5 * s),
					y = v + 0.5 * (i.width - f),
					w = g + r.hhea.ascender * n;
				this.st(h, l, y, w, n);
			}
		}
		st(t, i, e, s, r) {
			if (!i || !i.xs || 0 === i.noc) return;
			const { xs: n, ys: h, endPts: o, flags: a } = i;
			if (!(n && h && o && a)) return;
			t.beginPath();
			let c = 0;
			for (let u = 0; u < o.length; u++) {
				const i = o[u];
				if (!(i < c)) {
					if (i >= c) {
						const o = e + n[c] * r,
							u = s - h[c] * r;
						t.moveTo(o, u);
						let l = c + 1;
						for (; l <= i;)
							if (1 & a[l]) {
								const i = e + n[l] * r,
									o = s - h[l] * r;
								(t.lineTo(i, o), l++);
							} else {
								const o = e + n[l] * r,
									u = s - h[l] * r;
								if (l + 1 > i) {
									const i = e + n[c] * r,
										l = s - h[c] * r;
									if (1 & a[c]) t.quadraticCurveTo(o, u, i, l);
									else {
										const e = (o + i) / 2,
											s = (u + l) / 2;
										t.quadraticCurveTo(o, u, e, s);
									}
									break;
								}
								const f = l + 1;
								if (1 & a[f]) {
									const i = e + n[f] * r,
										a = s - h[f] * r;
									(t.quadraticCurveTo(o, u, i, a), (l = f + 1));
								} else {
									const i = (o + (e + n[f] * r)) / 2,
										a = (u + (s - h[f] * r)) / 2;
									(t.quadraticCurveTo(o, u, i, a), (l = f));
								}
							}
						t.closePath();
					}
					c = i + 1;
				}
			}
			t.fill();
		}
		L() {
			this.tt.L();
		}
		get framebuffer() {
			return this.tt.V;
		}
		get columns() {
			return this.tt.Y;
		}
		get rows() {
			return this.tt.h;
		}
	},
	m = class {
		rt(t, i) {
			let e = 0;
			for (const { table: s } of (function (t) {
				return a(t).lookupTables;
			})(t))
				if ((4 === s.format ? (e = this.nt(i, s)) : 12 === s.format && (e = this.ht(i, s)), e > 0)) break;
			return e;
		}
		ot(t, i) {
			const e = i.codePointAt(0);
			return void 0 === e ? 0 : this.rt(t, e);
		}
		ct(t, i) {
			const e = t.hmtx;
			return e && e.aWidth && 0 !== e.aWidth.length
				? i < e.aWidth.length
					? e.aWidth[i]
					: e.aWidth[e.aWidth.length - 1]
				: 0;
		}
		ut(t, i) {
			const e = i / t.head.unitsPerEm;
			return { lineHeight: t.hhea.ascender * e - t.hhea.descender * e + t.hhea.lineGap * e, scale: e };
		}
		nt(t, i) {
			const e = i.endCount.length;
			let s = -1;
			for (let r = 0; r < e; r++)
				if (t <= i.endCount[r]) {
					s = r;
					break;
				}
			return -1 === s || t < i.startCount[s] ? 0 : n(i, t, s);
		}
		ht(t, i) {
			const e = i.groups.length / 3;
			for (let s = 0; s < e; s++) {
				const e = i.groups[3 * s],
					r = i.groups[3 * s + 1],
					n = i.groups[3 * s + 2];
				if (t >= e && t <= r) return n + (t - e);
			}
			return 0;
		}
	},
	v = class {
		lt;
		constructor() {
			this.lt = new m();
		}
		ft(t, i, e) {
			let s = 0;
			const r = this.lt.ut(e, i);
			let n = 0,
				h = !1;
			for (const o of t) {
				const t = o.glyphData;
				let i = 0;
				if (!t && ((i = this.lt.ot(e, o.character)), 0 === i)) continue;
				const a = (t?.advanceWidth ?? this.lt.ct(e, i)) * r.scale;
				if (((s = Math.max(s, a)), t)) {
					const i = Math.max(0, t.yMax - t.yMin) * r.scale;
					((n = Math.max(n, i)), (h = !0));
				}
			}
			return (h || (n = r.lineHeight), { width: Math.ceil(s), height: Math.ceil(n) });
		}
	},
	g = {
		readShort: (t, i) => ((g.t.uint16[0] = (t[i] << 8) | t[i + 1]), g.t.int16[0]),
		readUshort: (t, i) => (t[i] << 8) | t[i + 1],
		readUshorts(t, i, e) {
			const s = [];
			for (let r = 0; r < e; r++) s.push(g.readUshort(t, i + 2 * r));
			return s;
		},
		readUint(t, i) {
			const e = g.t.uint8;
			return ((e[3] = t[i]), (e[2] = t[i + 1]), (e[1] = t[i + 2]), (e[0] = t[i + 3]), g.t.uint32[0]);
		},
		readASCII(t, i, e) {
			let s = '';
			for (let r = 0; r < e; r++) s += String.fromCharCode(t[i + r]);
			return s;
		},
		t: (() => {
			const t = /* @__PURE__ */ new ArrayBuffer(8);
			return {
				uint8: new Uint8Array(t),
				int16: new Int16Array(t),
				uint16: new Uint16Array(t),
				uint32: new Uint32Array(t),
			};
		})(),
	};
function y(t) {
	return (t + 3) & -4;
}
function w(t, i, e) {
	((t[i] = (e >>> 8) & 255), (t[i + 1] = 255 & e));
}
function b(t, i, e) {
	((t[i] = (e >>> 24) & 255), (t[i + 1] = (e >>> 16) & 255), (t[i + 2] = (e >>> 8) & 255), (t[i + 3] = 255 & e));
}
function M(t, i, e) {
	for (let s = 0; s < e.length; s++) t[i + s] = 255 & e.charCodeAt(s);
}
function A(t, i, e) {
	const s = i + e;
	let r = 0;
	const n = g.t;
	for (let h = i; h < s; h += 4)
		((n.uint8[3] = t[h] || 0),
			(n.uint8[2] = t[h + 1] || 0),
			(n.uint8[1] = t[h + 2] || 0),
			(n.uint8[0] = t[h + 3] || 0),
			(r = (r + (n.uint32[0] >>> 0)) >>> 0));
	return r >>> 0;
}
var C,
	x = {
		cmap: {
			parseTab(t, i, e) {
				const s = { tables: [], ids: {}, encodings: [], off: i };
				((t = new Uint8Array(t.buffer, i, e)), (i = 0));
				const r = g,
					n = r.readUshort;
				n(t, i);
				const h = n(t, (i += 2));
				i += 2;
				const o = [];
				for (let a = 0; a < h; a++) {
					const e = n(t, i),
						h = n(t, (i += 2));
					i += 2;
					const a = r.readUint(t, i);
					i += 4;
					const c = `p${e}e${h}`;
					let u = o.indexOf(a);
					if (-1 === u) {
						let i;
						((u = s.tables.length), o.push(a));
						const e = n(t, a);
						((i = 4 === e ? this.parse4(t, a) : 12 === e ? this.parse12(t, a) : { format: e }),
							s.tables.push(i));
					}
					s.ids[c] = u;
					const l = s.tables[u],
						f = { platformID: e, encodingID: h, format: l.format, tableIndex: u };
					(s.encodings.push(f), (l.encodings ??= []).push(f));
				}
				return s;
			},
			parse4(t, i) {
				const e = g,
					s = e.readUshort,
					r = e.readUshorts,
					n = i,
					h = s(t, (i += 2));
				s(t, (i += 2));
				const o = s(t, (i += 2)) >>> 1,
					a = {
						format: 4,
						encodings: [],
						searchRange: s(t, (i += 2)),
						entrySelector: 0,
						rangeShift: 0,
						endCount: [],
						startCount: [],
						idDelta: [],
						idRangeOffset: [],
						glyphIdArray: [],
					};
				((i += 2),
					(a.entrySelector = s(t, i)),
					(i += 2),
					(a.rangeShift = s(t, i)),
					(i += 2),
					(a.endCount = r(t, i, o)),
					(i += 2 * o),
					(i += 2),
					(a.startCount = r(t, i, o)),
					(i += 2 * o));
				for (let c = 0; c < o; c++) (a.idDelta.push(e.readShort(t, i)), (i += 2));
				return ((a.idRangeOffset = r(t, i, o)), (i += 2 * o), (a.glyphIdArray = r(t, i, (n + h - i) >> 1)), a);
			},
			parse12(t, i) {
				const e = g.readUint;
				(e(t, (i += 4)), e(t, (i += 4)));
				const s = e(t, (i += 4));
				i += 4;
				const r = new Uint32Array(3 * s);
				for (let n = 0; n < 3 * s; n += 3)
					((r[n] = e(t, i + (n << 2))),
						(r[n + 1] = e(t, i + (n << 2) + 4)),
						(r[n + 2] = e(t, i + (n << 2) + 8)));
				return { format: 12, encodings: [], groups: r };
			},
		},
		head: {
			parseTab(t, i, e) {
				const s = g;
				i += 18;
				const r = s.readUshort(t, i);
				((i += 2), (i += 16));
				const n = s.readShort(t, i);
				i += 2;
				const h = s.readShort(t, i);
				i += 2;
				const o = s.readShort(t, i);
				i += 2;
				const a = s.readShort(t, i);
				return (
					(i += 2),
					(i += 6),
					{ unitsPerEm: r, xMin: n, yMin: h, xMax: o, yMax: a, indexToLocFormat: s.readShort(t, i) }
				);
			},
		},
		hhea: {
			parseTab(t, i, e) {
				const s = g;
				i += 4;
				const r = s.readShort,
					n = s.readUshort;
				return {
					ascender: r(t, i),
					descender: r(t, i + 2),
					lineGap: r(t, i + 4),
					advanceWidthMax: n(t, i + 6),
					minLeftSideBearing: r(t, i + 8),
					minRightSideBearing: r(t, i + 10),
					xMaxExtent: r(t, i + 12),
					caretSlopeRise: r(t, i + 14),
					caretSlopeRun: r(t, i + 16),
					caretOffset: r(t, i + 18),
					res0: r(t, i + 20),
					res1: r(t, i + 22),
					res2: r(t, i + 24),
					res3: r(t, i + 26),
					metricDataFormat: r(t, i + 28),
					numberOfHMetrics: n(t, i + 30),
				};
			},
		},
		maxp: {
			parseTab(t, i, e) {
				const s = g;
				return (s.readUint(t, i), (i += 4), { numGlyphs: s.readUshort(t, i) });
			},
		},
		hmtx: {
			parseTab(t, i, e, s) {
				const r = g,
					n = [],
					h = [],
					o = s.maxp.numGlyphs,
					a = s.hhea.numberOfHMetrics;
				let c = 0,
					u = 0,
					l = 0;
				for (; l < a;)
					((c = r.readUshort(t, i + (l << 2))),
						(u = r.readShort(t, i + (l << 2) + 2)),
						n.push(c),
						h.push(u),
						l++);
				for (; l < o;) (n.push(c), h.push(u), l++);
				return { aWidth: n, lsBearing: h };
			},
		},
		loca: {
			parseTab(t, i, e, s) {
				const r = g,
					n = [],
					h = s.head.indexToLocFormat,
					o = s.maxp.numGlyphs + 1;
				if (0 === h) for (let a = 0; a < o; a++) n.push(r.readUshort(t, i + (a << 1)) << 1);
				else if (1 === h) for (let a = 0; a < o; a++) n.push(r.readUint(t, i + (a << 2)));
				return n;
			},
		},
		glyf: {
			parseTab(t, i, e, s) {
				const r = [],
					n = s.maxp.numGlyphs;
				for (let h = 0; h < n; h++) r.push(null);
				return r;
			},
			dt(t, i) {
				const e = g,
					s = t._t,
					r = t.loca;
				if (r[i] === r[i + 1]) return null;
				const n = S.findTable(s, 'glyf', t.vt);
				if (!n) return null;
				let h = n[0] + r[i];
				const o = {};
				if (
					((o.noc = e.readShort(s, h)),
					(h += 2),
					(o.xMin = e.readShort(s, h)),
					(h += 2),
					(o.yMin = e.readShort(s, h)),
					(h += 2),
					(o.xMax = e.readShort(s, h)),
					(h += 2),
					(o.yMax = e.readShort(s, h)),
					(h += 2),
					o.xMin >= o.xMax || o.yMin >= o.yMax)
				)
					return null;
				if (o.noc > 0) {
					o.endPts = [];
					for (let a = 0; a < o.noc; a++) (o.endPts.push(e.readUshort(s, h)), (h += 2));
					const t = e.readUshort(s, h);
					if (((h += 2), s.length - h < t)) return null;
					h += t;
					const i = o.endPts[o.noc - 1] + 1;
					o.flags = [];
					for (let e = 0; e < i; e++) {
						const t = s[h];
						if ((h++, o.flags.push(t), 8 & t)) {
							const i = s[h];
							h++;
							for (let s = 0; s < i; s++) (o.flags.push(t), e++);
						}
					}
					o.xs = [];
					for (let a = 0; a < i; a++) {
						const t = o.flags[a],
							i = !!(16 & t);
						2 & t
							? (o.xs.push(i ? s[h] : -s[h]), h++)
							: i
								? o.xs.push(0)
								: (o.xs.push(e.readShort(s, h)), (h += 2));
					}
					o.ys = [];
					for (let a = 0; a < i; a++) {
						const t = o.flags[a],
							i = !!(32 & t);
						4 & t
							? (o.ys.push(i ? s[h] : -s[h]), h++)
							: i
								? o.ys.push(0)
								: (o.ys.push(e.readShort(s, h)), (h += 2));
					}
					let r = 0,
						n = 0;
					for (let e = 0; e < i; e++) ((r += o.xs[e]), (n += o.ys[e]), (o.xs[e] = r), (o.ys[e] = n));
				} else ((o.parts = []), (o.endPts = []), (o.flags = []), (o.xs = []), (o.ys = []));
				return o;
			},
		},
	},
	S = {
		parse(t) {
			const i = new Uint8Array(t),
				e = x,
				s = {},
				r = { _t: i, gt: 0, vt: 0 };
			for (const n in e) {
				const t = n,
					h = S.findTable(i, t, 0);
				if (h) {
					const [n, o] = h;
					let a = s[n];
					(null == a && ((a = e[t].parseTab(i, n, o, r)), (s[n] = a)), Object.assign(r, { [t]: a }));
				}
			}
			return [r];
		},
		findTable(t, i, e) {
			const s = g,
				r = s.readUshort(t, e + 4);
			let n = e + 12;
			for (let h = 0; h < r; h++) {
				const e = s.readASCII(t, n, 4);
				s.readUint(t, n + 4);
				const r = s.readUint(t, n + 8),
					h = s.readUint(t, n + 12);
				if (e === i) return [r, h];
				n += 16;
			}
			return null;
		},
		T: x,
		B: g,
	};
function E(t) {
	if (0 === t.length) return [];
	const i =
		void 0 !== C
			? C
			: (C =
					'undefined' != typeof Intl && 'Segmenter' in Intl
						? new Intl.Segmenter(void 0, { granularity: 'grapheme' })
						: null);
	return i ? Array.from(i.segment(t), (t) => t.segment) : Array.from(t);
}
function T(t) {
	return Array.from(t, (t) => t.codePointAt(0)).filter((t) => void 0 !== t);
}
var F = class {
	yt;
	constructor() {
		this.yt = new m();
	}
	wt(t, i) {
		const e = [],
			s = /* @__PURE__ */ new Map();
		return (
			t.forEach((t, r) => {
				const n = { character: t, unicode: T(t)[0] ?? 0, color: this.bt(r), glyphData: this.Mt(i, t) };
				(e.push(n), s.set(t, n));
			}),
			{ array: e, map: s }
		);
	}
	bt(t) {
		return [(t % 256) / 255, (Math.floor(t / 256) % 256) / 255, 0];
	}
	Mt(t, i) {
		const e = i.codePointAt(0) || 0,
			s = this.yt.rt(t, e);
		if (0 === s) return null;
		const r = this.yt.ct(t, s),
			n = S.T.glyf.dt(t, s);
		return n ? { ...n, advanceWidth: r } : null;
	}
};
function U(t) {
	if ('head' !== t.tag || t.data.length < 12) return A(t.data, 0, y(t.data.length));
	const i = new Uint8Array(t.data);
	return (b(i, 8, 0), A(i, 0, y(i.length)));
}
var P = class t extends s {
		X;
		At;
		Ct = [];
		xt = /* @__PURE__ */ new Map();
		St = 16;
		Et = { width: 0, height: 0 };
		Tt;
		Ft;
		Pt;
		Lt;
		Dt = !1;
		constructor(t, i = 16) {
			(super(),
				(this.X = t),
				(this.St = i),
				(this.Tt = new d()),
				(this.Ft = new p(t)),
				(this.Pt = new v()),
				(this.Lt = new F()));
		}
		Rt(i = {}) {
			if (!this.Dt) throw new r('Cannot fork an uninitialized TextmodeFont.');
			const e = i.fontSize ?? this.St,
				s = new t(this.X, e);
			return ((s.At = this.At), (s.Ct = this.Ct), (s.xt = new Map(this.xt)), (s.Dt = !0), s.kt(), s);
		}
		async Ot(t) {
			if (this.Dt) return;
			if (!t) throw new r('TextmodeFont requires an explicit font source.');
			const i = await this.Bt(t);
			await this.It(i);
		}
		Nt(t) {
			if (void 0 === t) return this.St;
			((this.St = t), this.kt());
		}
		kt() {
			((this.Et = this.Pt.ft(this.Ct, this.St, this.At)), this.Ft.it(this.Ct, this.Et, this.St, this.At));
		}
		async jt(t) {
			try {
				const i = await this.Bt(t);
				await this.It(i);
			} catch (i) {
				throw new r(`Failed to load font: ${i instanceof Error ? i.message : 'Unknown error'}`, {
					originalError: i,
				});
			}
		}
		async Bt(t) {
			const i = await fetch(t);
			if (!i.ok) throw new r(`Failed to load font file: ${i.status} ${i.statusText}`);
			return i.arrayBuffer();
		}
		async It(t) {
			const i = await (async function (t) {
				const i = g.readASCII(new Uint8Array(t), 0, 4);
				if ('wOFF' === i) {
					const i = await (async function (t) {
						if ('undefined' == typeof DecompressionStream)
							throw new Error('[textmode.js] WOFF font loading requires DecompressionStream support.');
						const i = g,
							e = new Uint8Array(t);
						if (e.length < 44) throw new Error('Invalid WOFF header.');
						if ('wOFF' !== i.readASCII(e, 0, 4)) throw new Error('Invalid WOFF signature.');
						const s = i.readUint(e, 4),
							r = i.readUshort(e, 12),
							n = i.readUint(e, 16);
						if (44 + 20 * r > e.length) throw new Error('Invalid WOFF table directory.');
						const h = [];
						let o = 44;
						for (let a = 0; a < r; a++) {
							const t = i.readASCII(e, o, 4),
								s = i.readUint(e, o + 4),
								r = i.readUint(e, o + 8),
								n = i.readUint(e, o + 12);
							if ((i.readUint(e, o + 16), s + r > e.length))
								throw new Error(`Invalid WOFF table bounds for ${t}.`);
							if (r > n) throw new Error(`Invalid WOFF table length for ${t}.`);
							(h.push({ tag: t, offset: s, compLength: r, origLength: n }), (o += 20));
						}
						return (function (t, i, e) {
							const s = e.length;
							let r = 1,
								n = 0;
							for (; r << 1 <= s;) ((r <<= 1), n++);
							const h = 16 * r,
								o = 16 * s - h;
							let a = 12 + 16 * s;
							const c = {};
							for (const d of e) ((c[d.tag] = a), (a = y(a + d.data.length)));
							const u = new Uint8Array(Math.max(i || 0, a));
							(b(u, 0, t), w(u, 4, s), w(u, 6, h), w(u, 8, n), w(u, 10, o));
							let l = 12;
							for (const d of e)
								(M(u, l, d.tag),
									(l += 4),
									b(u, l, U(d)),
									(l += 4),
									b(u, l, c[d.tag]),
									(l += 4),
									b(u, l, d.data.length),
									(l += 4));
							for (const d of e) u.set(d.data, c[d.tag]);
							const f = c.head;
							if (void 0 !== f) {
								const t = (function (t, i) {
									const e = i + 8,
										s = [t[e], t[e + 1], t[e + 2], t[e + 3]];
									b(t, e, 0);
									const r = (2981146554 - (A(t, 0, y(t.length)) >>> 0)) >>> 0;
									return (
										(t[e] = s[0]),
										(t[e + 1] = s[1]),
										(t[e + 2] = s[2]),
										(t[e + 3] = s[3]),
										r >>> 0
									);
								})(u, f);
								b(u, f + 8, t);
							}
							return u.buffer;
						})(
							s,
							n,
							await Promise.all(
								h.map((t) =>
									(async function (t, i) {
										const e = new Uint8Array(t.buffer, i.offset, i.compLength);
										let s;
										return (
											i.compLength === i.origLength
												? (s = new Uint8Array(e))
												: ((s = await (async function (t) {
														const i = new ReadableStream({
																start(i) {
																	(i.enqueue(t), i.close());
																},
															}).pipeThrough(new DecompressionStream('deflate')),
															e = await new Response(i).arrayBuffer();
														return new Uint8Array(e);
													})(e)),
													(s = (function (t, i) {
														if (t.length === i) return t;
														if (t.length < i) {
															const e = new Uint8Array(i);
															return (e.set(t), e);
														}
														return t.subarray(0, i);
													})(s, i.origLength))),
											{ ...i, data: s }
										);
									})(e, t)
								)
							)
						);
					})(t);
					return S.parse(i);
				}
				if ('wOF2' === i)
					throw new Error('[textmode.js] WOFF2 fonts are not supported. Use .woff, .ttf, or .otf.');
				return S.parse(t);
			})(t);
			if (!i || 0 === i.length) throw new Error('Failed to parse font file');
			((this.At = i[0]), await this.zt());
		}
		async zt() {
			const t = this.Tt.j(this.At);
			if (0 === t.length) throw new r('[textmode.js] Font has no supported cmap glyphs.');
			const { array: i, map: e } = this.Lt.wt(t, this.At);
			((this.Ct = i), (this.xt = e), this.kt(), (this.Dt = !0));
		}
		Qt(t) {
			const i = this.xt.get(t);
			return i ? i.color : [1, 1, 0];
		}
		Gt(t) {
			return E(t).map((t) => {
				const i = this.xt.get(t);
				return i ? i.color : [1, 1, 0];
			});
		}
		dispose() {
			(this.Ft.L(), super.dispose());
		}
		get framebuffer() {
			return this.Ft.framebuffer;
		}
		get characterMap() {
			return this.xt;
		}
		get characters() {
			return this.Ct;
		}
		get textureColumns() {
			return this.Ft.columns;
		}
		get textureRows() {
			return this.Ft.rows;
		}
		get columns() {
			return this.Ft.columns;
		}
		get rows() {
			return this.Ft.rows;
		}
		get cellWidth() {
			return this.Et.width;
		}
		get cellHeight() {
			return this.Et.height;
		}
		get cellDimensions() {
			return this.Et;
		}
		get maxGlyphDimensions() {
			return this.Et;
		}
		get fontSize() {
			return this.St;
		}
		get font() {
			return this.At;
		}
	},
	L = class {
		constructor(t) {
			this.tt = new _(t);
		}
		it(t, i, e, s) {
			(this.tt.Z(t.length, i.width, i.height), this.$t(t, i, e, s), this.tt.W());
		}
		L() {
			this.tt.L();
		}
		$t(t, i, e, s) {
			const r = this.tt.K,
				n = this.tt.Y;
			for (let h = 0; h < t.length; h++) {
				const t = h % n,
					o = Math.floor(h / n),
					a = h % s.columns,
					c = Math.floor(h / s.columns),
					u = s.marginX + a * (s.cellWidth + s.spacingX),
					l = s.marginY + c * (s.cellHeight + s.spacingY),
					f = t * i.width,
					d = o * i.height;
				r.drawImage(e, u, l, s.cellWidth, s.cellHeight, f, d, i.width, i.height);
			}
		}
		get framebuffer() {
			return this.tt.V;
		}
		get columns() {
			return this.tt.Y;
		}
		get rows() {
			return this.tt.h;
		}
	},
	D = class t extends s {
		static Ht = /* @__PURE__ */ new WeakMap();
		static Xt = /* @__PURE__ */ new WeakMap();
		static Vt = 1;
		X;
		Ft = null;
		Ct = [];
		xt = /* @__PURE__ */ new Map();
		Yt = { width: 0, height: 0 };
		Kt = { width: 0, height: 0 };
		St = 0;
		Zt;
		Wt;
		qt;
		Jt;
		Dt = !1;
		constructor(t, i, e) {
			(super(), (this.X = t), (this.St = void 0 === i ? 0 : Math.abs(i)), (this.qt = e));
		}
		Rt(i = {}) {
			if (!this.Dt || !this.Wt || !this.Jt) throw new r('Cannot fork an uninitialized TextmodeTileset.');
			const e = new t(this.X, i.fontSize ?? this.St);
			return (
				(e.Ct = this.Jt.characters),
				(e.xt = new Map(this.Jt.characterMap)),
				(e.Yt = { ...this.Jt.nativeCellDimensions }),
				(e.Zt = this.Zt),
				(e.Wt = { ...this.Wt }),
				(e.qt = this.qt),
				(e.Dt = !0),
				e.ti(this.Jt),
				e.ii(),
				e
			);
		}
		async Ot(t) {
			if (this.Dt) return;
			if (((this.qt = t ?? this.qt), !this.qt))
				throw new r('Cannot initialize a TextmodeTileset without source options.');
			const i = this.ei(this.qt),
				e = this.si(i);
			if (e)
				return (
					this.ti(e),
					(this.Ct = e.characters),
					(this.xt = new Map(e.characterMap)),
					(this.Yt = { ...e.nativeCellDimensions }),
					(this.Wt = { ...e.layout }),
					0 === this.St && (this.St = Math.abs(this.qt.fontSize ?? e.nativeCellDimensions.height)),
					this.ii(),
					void (this.Dt = !0)
				);
			const s = await this.ri(this.qt.source),
				n = this.ni(s),
				h = this.hi(this.qt, n.width, n.height),
				o = this.oi(this.qt, h),
				a = await this.ai(this.qt, o, h.columns),
				c = this.ci(a),
				u = new Map(c.map((t) => [t.character, t])),
				l = new L(this.X);
			((this.Zt = s),
				(this.Wt = h),
				(this.Yt = { width: h.cellWidth, height: h.cellHeight }),
				(this.Ct = c),
				(this.xt = u),
				0 === this.St && (this.St = Math.abs(this.qt.fontSize ?? h.cellHeight)),
				this.ii(),
				l.it(this.Ct, this.Yt, s, h),
				this.ti({
					cacheKey: i,
					textureAtlas: l,
					characters: c,
					characterMap: u,
					nativeCellDimensions: { ...this.Yt },
					layout: { ...h },
					referenceCount: 0,
				}),
				(this.Dt = !0));
		}
		Nt(t) {
			if (void 0 === t) return this.St;
			((this.St = Math.abs(t)), this.ii());
		}
		Qt(t) {
			const i = this.xt.get(t);
			return i ? i.color : [1, 1, 0];
		}
		Gt(t) {
			return E(t).map((t) => this.Qt(t));
		}
		dispose() {
			(this.ui(), super.dispose());
		}
		ti(i) {
			this.Jt !== i &&
				(this.ui(),
				t.li(this.X).set(i.cacheKey, i),
				(i.referenceCount += 1),
				(this.Jt = i),
				(this.Ft = i.textureAtlas));
		}
		ui() {
			const i = this.Jt;
			i
				? ((i.referenceCount -= 1),
					i.referenceCount <= 0 && (i.textureAtlas.L(), t.Ht.get(this.X)?.delete(i.cacheKey)),
					(this.Jt = void 0),
					(this.Ft = null))
				: (this.Ft = null);
		}
		ei(t) {
			return JSON.stringify({
				source: this.fi(t.source),
				columns: t.columns,
				rows: t.rows,
				count: t.count ?? null,
				margin: t.margin ?? null,
				marginX: t.marginX ?? null,
				marginY: t.marginY ?? null,
				spacing: t.spacing ?? null,
				spacingX: t.spacingX ?? null,
				spacingY: t.spacingY ?? null,
				mapping: this.di(t),
			});
		}
		fi(i) {
			return 'string' == typeof i || i instanceof URL ? `url:${String(i)}` : `object:${t._i(i)}`;
		}
		di(t) {
			return void 0 === t.map
				? 'auto:32'
				: Array.isArray(t.map)
					? `rows:${t.map.join('\n')}`
					: t.map instanceof URL
						? `url:${String(t.map)}`
						: this.pi(t.map)
							? `inline:${t.map}`
							: `url:${t.map}`;
		}
		si(i) {
			return t.Ht.get(this.X)?.get(i);
		}
		static li(i) {
			let e = t.Ht.get(i);
			return (e || ((e = /* @__PURE__ */ new Map()), t.Ht.set(i, e)), e);
		}
		static _i(i) {
			const e = t.Xt.get(i);
			if (void 0 !== e) return e;
			const s = t.Vt++;
			return (t.Xt.set(i, s), s);
		}
		async ri(t) {
			if ('string' != typeof t && !(t instanceof URL)) return t;
			const i = String(t);
			return new Promise((t, e) => {
				const s = new Image();
				((s.crossOrigin = 'anonymous'),
					(s.onload = () => t(s)),
					(s.onerror = () => e(new r(`Failed to load tileset image: ${i}`))),
					(s.src = i));
			});
		}
		async ai(t, i, e) {
			if (void 0 !== t.map) {
				const s = await this.mi(t.map),
					r = this.gi(s, i, e);
				return (this.yi(r, 'tileset map'), r);
			}
			return this.wi(i);
		}
		async mi(t) {
			return Array.isArray(t)
				? [...t]
				: t instanceof URL
					? this.bi(await this.Mi(t))
					: this.pi(t)
						? this.bi(t)
						: this.bi(await this.Mi(t));
		}
		gi(t, i, e) {
			const s = Math.ceil(i / e);
			if (t.length !== s)
				throw new r(
					`Tileset map must contain exactly ${s} row${1 === s ? '' : 's'} for ${i} mapped tile${1 === i ? '' : 's'}.`
				);
			const n = [];
			let h = i;
			for (let o = 0; o < t.length; o++) {
				const i = E(t[o]),
					s = Math.min(e, h);
				if (i.length !== s)
					throw new r(
						`Tileset map row ${o + 1} must contain exactly ${s} character cell${1 === s ? '' : 's'}.`
					);
				(n.push(...i), (h -= s));
			}
			return n;
		}
		wi(t) {
			this.Ai(t);
			const i = [];
			for (let e = 0; e < t; e++) i.push(String.fromCodePoint(32 + e));
			return i;
		}
		async Mi(t) {
			let i;
			try {
				i = await fetch(t);
			} catch (e) {
				throw new r(`Failed to load tileset map: ${e instanceof Error ? e.message : 'Unknown error'}`);
			}
			if (!i.ok) throw new r(`Failed to load tileset map: ${i.status} ${i.statusText}`);
			return i.text();
		}
		bi(t) {
			const i = t.split(/\r\n|\n|\r/);
			return (i.length > 0 && '' === i[i.length - 1] && i.pop(), i);
		}
		pi(t) {
			return !(!t.includes('\n') && !t.includes('\r') && this.Ci(t));
		}
		Ci(t) {
			return (
				/^(?:[a-z]+:)?\/\//i.test(t) ||
				t.startsWith('/') ||
				t.startsWith('./') ||
				t.startsWith('../') ||
				t.includes('\\') ||
				/\.[a-z0-9]+(?:$|[?#])/i.test(t)
			);
		}
		ni(t) {
			const i = t,
				e = i.naturalWidth ?? i.videoWidth ?? i.displayWidth ?? i.width,
				s = i.naturalHeight ?? i.videoHeight ?? i.displayHeight ?? i.height;
			if ('number' != typeof e || 'number' != typeof s || e <= 0 || s <= 0)
				throw new r('Tileset source must expose positive pixel dimensions.');
			return { width: e, height: s };
		}
		hi(t, i, e) {
			const s = t.marginX ?? t.margin ?? 0,
				n = t.marginY ?? t.margin ?? 0,
				h = t.spacingX ?? t.spacing ?? 0,
				o = t.spacingY ?? t.spacing ?? 0;
			if (t.columns <= 0 || t.rows <= 0) throw new r('Tileset columns and rows must be greater than 0.');
			const a = i - 2 * s - h * (t.columns - 1),
				c = e - 2 * n - o * (t.rows - 1);
			if (a <= 0 || c <= 0) throw new r('Tileset margins and spacing leave no usable tile area.');
			const u = a / t.columns,
				l = c / t.rows;
			if (!Number.isInteger(u) || !Number.isInteger(l))
				throw new r('Tileset dimensions do not divide evenly. Check columns, rows, margins, and spacing.');
			return {
				columns: t.columns,
				rows: t.rows,
				marginX: s,
				marginY: n,
				spacingX: h,
				spacingY: o,
				cellWidth: u,
				cellHeight: l,
			};
		}
		oi(t, i) {
			const e = i.columns * i.rows,
				s = t.count ?? e;
			if (s <= 0 || s > e) throw new r(`Tileset count must be between 1 and ${e}.`);
			return s;
		}
		Ai(t) {
			if (32 + t - 1 > 1114111)
				throw new r('Tileset automatic character assignment exceeds the supported Unicode range.');
		}
		yi(t, i) {
			const e = /* @__PURE__ */ new Map();
			for (let s = 0; s < t.length; s++) {
				const n = t[s],
					h = e.get(n);
				if (void 0 !== h)
					throw new r(`${i} contains duplicate character ${this.xi(n)} at tile ${h + 1} and tile ${s + 1}.`);
				e.set(n, s);
			}
		}
		xi(t) {
			const i = T(t);
			if (0 === i.length) return '""';
			const e = i.map((t) => `U+${t.toString(16).toUpperCase().padStart(4, '0')}`).join(' ');
			return `${JSON.stringify(t)} (${e})`;
		}
		ci(t) {
			const i = [];
			for (let e = 0; e < t.length; e++) {
				const s = t[e],
					n = T(s)[0];
				if (void 0 === n)
					throw new r(`Tileset character mapping produced an empty character at tile ${e + 1}.`);
				i.push({ character: s, unicode: n, color: this.Si(e) });
			}
			return i;
		}
		Si(t) {
			return [(255 & t) / 255, ((t >> 8) & 255) / 255, ((t >> 16) & 255) / 255];
		}
		ii() {
			if (this.Yt.height <= 0 || this.Yt.width <= 0) return;
			const t = Math.max(1, this.St || this.Yt.height),
				i = t / this.Yt.height;
			this.Kt = { width: Math.max(1, Math.round(this.Yt.width * i)), height: t };
		}
		get characters() {
			return this.Ct;
		}
		get characterMap() {
			return this.xt;
		}
		get framebuffer() {
			return this.Ft.framebuffer;
		}
		get fontFramebuffer() {
			return this.framebuffer;
		}
		get columns() {
			return this.Ft.columns;
		}
		get rows() {
			return this.Ft.rows;
		}
		get textureColumns() {
			return this.columns;
		}
		get textureRows() {
			return this.rows;
		}
		get nativeCellDimensions() {
			return this.Yt;
		}
		get maxGlyphDimensions() {
			return this.Kt;
		}
		get cellDimensions() {
			return this.Kt;
		}
		get cellWidth() {
			return this.Kt.width;
		}
		get cellHeight() {
			return this.Kt.height;
		}
		get fontSize() {
			return this.St;
		}
	},
	R = /* @__PURE__ */ i({ TextmodeFont: () => P, TextmodeTileset: () => D }),
	k = /* @__PURE__ */ (function (t) {
		return (
			(t[(t.NORMAL = 0)] = 'NORMAL'),
			(t[(t.ADDITIVE = 1)] = 'ADDITIVE'),
			(t[(t.MULTIPLY = 2)] = 'MULTIPLY'),
			(t[(t.SCREEN = 3)] = 'SCREEN'),
			(t[(t.SUBTRACT = 4)] = 'SUBTRACT'),
			(t[(t.DARKEN = 5)] = 'DARKEN'),
			(t[(t.LIGHTEN = 6)] = 'LIGHTEN'),
			(t[(t.OVERLAY = 7)] = 'OVERLAY'),
			(t[(t.SOFT_LIGHT = 8)] = 'SOFT_LIGHT'),
			(t[(t.HARD_LIGHT = 9)] = 'HARD_LIGHT'),
			(t[(t.COLOR_DODGE = 10)] = 'COLOR_DODGE'),
			(t[(t.COLOR_BURN = 11)] = 'COLOR_BURN'),
			(t[(t.DIFFERENCE = 12)] = 'DIFFERENCE'),
			(t[(t.EXCLUSION = 13)] = 'EXCLUSION'),
			t
		);
	})({}),
	O = new Set(Object.values(k).filter((t) => 'number' == typeof t));
function B(t) {
	return 'number' == typeof t && O.has(t);
}
function I(t) {
	return t * (Math.PI / 180);
}
function N(t) {
	return t * (180 / Math.PI);
}
function j(t, i, e, s) {
	return N(Math.atan2(s - i, e - t));
}
function z(t, i, e, s) {
	return Math.hypot(e - t, s - i);
}
function Q(t, i, e) {
	return Math.min(Math.max(t, i), e);
}
var G = [
		'linear',
		'inQuad',
		'outQuad',
		'inOutQuad',
		'inCubic',
		'outCubic',
		'inOutCubic',
		'inQuart',
		'outQuart',
		'inOutQuart',
		'inQuint',
		'outQuint',
		'inOutQuint',
		'inSine',
		'outSine',
		'inOutSine',
		'inExpo',
		'outExpo',
		'inOutExpo',
		'inCirc',
		'outCirc',
		'inOutCirc',
		'inBack',
		'outBack',
		'inOutBack',
		'inElastic',
		'outElastic',
		'inOutElastic',
		'inBounce',
		'outBounce',
		'inOutBounce',
	],
	$ = 1.70158,
	H = 2.5949095,
	X = (2 * Math.PI) / 3,
	V = (2 * Math.PI) / 4.5;
function Y(t) {
	const i = 7.5625,
		e = 2.75;
	if (t < 1 / e) return i * t * t;
	if (t < 2 / e) {
		const s = t - 1.5 / e;
		return i * s * s + 0.75;
	}
	if (t < 2.5 / e) {
		const s = t - 2.25 / e;
		return i * s * s + 0.9375;
	}
	const s = t - 2.625 / e;
	return i * s * s + 0.984375;
}
var K = {
	linear: (t) => t,
	inQuad: (t) => t * t,
	outQuad: (t) => 1 - Math.pow(1 - t, 2),
	inOutQuad: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
	inCubic: (t) => t * t * t,
	outCubic: (t) => 1 - Math.pow(1 - t, 3),
	inOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
	inQuart: (t) => t * t * t * t,
	outQuart: (t) => 1 - Math.pow(1 - t, 4),
	inOutQuart: (t) => (t < 0.5 ? 8 * Math.pow(t, 4) : 1 - Math.pow(-2 * t + 2, 4) / 2),
	inQuint: (t) => t * t * t * t * t,
	outQuint: (t) => 1 - Math.pow(1 - t, 5),
	inOutQuint: (t) => (t < 0.5 ? 16 * Math.pow(t, 5) : 1 - Math.pow(-2 * t + 2, 5) / 2),
	inSine: (t) => 1 - Math.cos((t * Math.PI) / 2),
	outSine: (t) => Math.sin((t * Math.PI) / 2),
	inOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
	inExpo: (t) => (0 === t ? 0 : Math.pow(2, 10 * t - 10)),
	outExpo: (t) => (1 === t ? 1 : 1 - Math.pow(2, -10 * t)),
	inOutExpo: (t) =>
		0 === t || 1 === t ? t : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2,
	inCirc: (t) => 1 - Math.sqrt(1 - Math.pow(t, 2)),
	outCirc: (t) => Math.sqrt(1 - Math.pow(t - 1, 2)),
	inOutCirc: (t) =>
		t < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2,
	inBack: (t) => 2.70158 * t * t * t - $ * t * t,
	outBack: (t) => 1 + 2.70158 * Math.pow(t - 1, 3) + $ * Math.pow(t - 1, 2),
	inOutBack: (t) =>
		t < 0.5
			? (Math.pow(2 * t, 2) * (7.189819 * t - H)) / 2
			: (Math.pow(2 * t - 2, 2) * (3.5949095 * (2 * t - 2) + H) + 2) / 2,
	inElastic: (t) => (0 === t || 1 === t ? t : -Math.pow(2, 10 * t - 10) * Math.sin((10 * t - 10.75) * X)),
	outElastic: (t) => (0 === t || 1 === t ? t : Math.pow(2, -10 * t) * Math.sin((10 * t - 0.75) * X) + 1),
	inOutElastic: (t) =>
		0 === t || 1 === t
			? t
			: t < 0.5
				? (-Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * V)) / 2
				: (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * V)) / 2 + 1,
	inBounce: (t) => 1 - Y(1 - t),
	outBounce: Y,
	inOutBounce: (t) => (t < 0.5 ? (1 - Y(1 - 2 * t)) / 2 : (1 + Y(2 * t - 1)) / 2),
};
function Z(t) {
	return (((t % 360) + 360) % 360) / 360;
}
function W(t = /* @__PURE__ */ new Float32Array(16)) {
	return (
		(t[0] = 1),
		(t[1] = 0),
		(t[2] = 0),
		(t[3] = 0),
		(t[4] = 0),
		(t[5] = 1),
		(t[6] = 0),
		(t[7] = 0),
		(t[8] = 0),
		(t[9] = 0),
		(t[10] = 1),
		(t[11] = 0),
		(t[12] = 0),
		(t[13] = 0),
		(t[14] = 0),
		(t[15] = 1),
		t
	);
}
function q(t, i, e, s = /* @__PURE__ */ new Float32Array(16)) {
	let r = t[0] - i[0],
		n = t[1] - i[1],
		h = t[2] - i[2],
		o = Math.hypot(r, n, h);
	0 === o ? (h = 1) : ((o = 1 / o), (r *= o), (n *= o), (h *= o));
	let a = e[1] * h - e[2] * n,
		c = e[2] * r - e[0] * h,
		u = e[0] * n - e[1] * r;
	((o = Math.hypot(a, c, u)), 0 === o ? ((a = 1), (c = 0), (u = 0)) : ((o = 1 / o), (a *= o), (c *= o), (u *= o)));
	const l = n * u - h * c,
		f = h * a - r * u,
		d = r * c - n * a;
	return (
		(s[0] = a),
		(s[1] = l),
		(s[2] = r),
		(s[3] = 0),
		(s[4] = c),
		(s[5] = f),
		(s[6] = n),
		(s[7] = 0),
		(s[8] = u),
		(s[9] = d),
		(s[10] = h),
		(s[11] = 0),
		(s[12] = -(a * t[0] + c * t[1] + u * t[2])),
		(s[13] = -(l * t[0] + f * t[1] + d * t[2])),
		(s[14] = -(r * t[0] + n * t[1] + h * t[2])),
		(s[15] = 1),
		s
	);
}
var J = /* @__PURE__ */ (function (t) {
		return (
			(t[(t.SILENT = 0)] = 'SILENT'),
			(t[(t.WARNING = 1)] = 'WARNING'),
			(t[(t.ERROR = 2)] = 'ERROR'),
			(t[(t.THROW = 3)] = 'THROW'),
			t
		);
	})({}),
	tt = class t {
		static Ti = null;
		qt = { globalLevel: 3 };
		Fi = /* @__PURE__ */ new Set();
		constructor() {}
		static Ei() {
			return (t.Ti || (t.Ti = new t()), t.Ti);
		}
		Pi(t, i) {
			const e = '%c[textmode.js] Oops! (╯°□°)╯︵ Something went wrong in your code.',
				s = 'color: #f44336; font-weight: bold; background: #ffebee; padding: 2px 6px; border-radius: 3px;';
			switch (this.qt.globalLevel) {
				case 0:
					return !1;
				case 1:
					return (
						!!this.Li('warning', t, i) &&
						(console.group(e, s),
						console.warn(r.I(t, i, { includeFooterArrows: !1 })),
						console.groupEnd(),
						!1)
					);
				case 2:
					return (
						!!this.Li('error', t, i) &&
						(console.group(e, s),
						console.error(r.I(t, i, { includeFooterArrows: !1 })),
						console.groupEnd(),
						!1)
					);
				default:
					throw new r(t, i);
			}
		}
		Di(t, i, e) {
			return !!t || (this.Pi(i, e), !1);
		}
		Ri(t) {
			this.qt.globalLevel = t;
		}
		ki(t) {
			void 0 !== t.globalLevel && (this.qt.globalLevel = t.globalLevel);
		}
		Oi() {
			this.Fi.clear();
		}
		Li(t, i, e) {
			const s = this.Bi(t, i, e);
			return !this.Fi.has(s) && (this.Fi.add(s), !0);
		}
		Bi(t, i, e) {
			return `${t}|${i}|${e ? this.Ii(e) : ''}`;
		}
		Ii(t) {
			return null == t
				? String(t)
				: 'number' == typeof t || 'boolean' == typeof t || 'string' == typeof t
					? JSON.stringify(t)
					: Array.isArray(t)
						? `[${t.map((t) => this.Ii(t)).join(',')}]`
						: 'object' == typeof t
							? `{${Object.entries(t)
									.sort(([t], [i]) => t.localeCompare(i))
									.map(([t, i]) => `${JSON.stringify(t)}:${this.Ii(i)}`)
									.join(',')}}`
							: String(t);
		}
	}.Ei(),
	it = class t {
		Ni;
		ji;
		zi;
		Qi;
		Gi;
		$i;
		Hi;
		Xi;
		Vi;
		constructor(t = 0, i = 0, e = 0, s = 0, r = 0, n = 0, h = 0, o = 1, a = 0) {
			((this.Ni = t),
				(this.ji = i),
				(this.zi = e),
				(this.Qi = s),
				(this.Gi = r),
				(this.$i = n),
				(this.Hi = h),
				(this.Xi = o),
				(this.Vi = a));
		}
		static Yi(i, e) {
			const s = i.Zi.Ki,
				r = i.Zi.Wi,
				n = i.Zi.qi,
				h = i.Zi.Ji,
				o = i.Zi.te,
				a = i.Zi.ie;
			if (i.Zi.ee) {
				const c = (0.5 * Math.max(1, e)) / Math.tan(0.5 * i.Zi.se);
				return new t(s, r, n + c, s, r, n, h, o, a);
			}
			return new t(i.Zi.re, i.Zi.ne, i.Zi.he, s, r, n, h, o, a);
		}
		oe(t) {
			t.Zi.ae(this.Ni, this.ji, this.zi, this.Qi, this.Gi, this.$i, this.Hi, this.Xi, this.Vi);
		}
		setPosition(t, i, e) {
			return ((this.Ni = t), (this.ji = i), (this.zi = e), this);
		}
		lookAt(t, i, e) {
			return ((this.Qi = t), (this.Gi = i), (this.$i = e), this);
		}
		setUp(t, i, e) {
			return ((this.Hi = t), (this.Xi = i), (this.Vi = e), this);
		}
		move(t, i, e) {
			return (
				(this.Ni += t),
				(this.ji += i),
				(this.zi += e),
				(this.Qi += t),
				(this.Gi += i),
				(this.$i += e),
				this
			);
		}
		copy() {
			return new t(this.Ni, this.ji, this.zi, this.Qi, this.Gi, this.$i, this.Hi, this.Xi, this.Vi);
		}
		get eyeX() {
			return this.Ni;
		}
		get eyeY() {
			return this.ji;
		}
		get eyeZ() {
			return this.zi;
		}
		get targetX() {
			return this.Qi;
		}
		get targetY() {
			return this.Gi;
		}
		get targetZ() {
			return this.$i;
		}
		get upX() {
			return this.Hi;
		}
		get upY() {
			return this.Xi;
		}
		get upZ() {
			return this.Vi;
		}
	},
	et = class {
		ce = null;
		ee = !0;
		re = 0;
		ne = 0;
		he = 0;
		Ki = 0;
		Wi = 0;
		qi = 0;
		Ji = 0;
		te = 1;
		ie = 0;
		ue = 'perspective';
		le;
		fe;
		de;
		constructor(t) {
			((this.ee = t.Zi.ee),
				(this.re = t.Zi.re),
				(this.ne = t.Zi.ne),
				(this.he = t.Zi.he),
				(this.Ki = t.Zi.Ki),
				(this.Wi = t.Zi.Wi),
				(this.qi = t.Zi.qi),
				(this.Ji = t.Zi.Ji),
				(this.te = t.Zi.te),
				(this.ie = t.Zi.ie),
				t.Zi.ee ||
					(this.ce = new it(t.Zi.re, t.Zi.ne, t.Zi.he, t.Zi.Ki, t.Zi.Wi, t.Zi.qi, t.Zi.Ji, t.Zi.te, t.Zi.ie)),
				t.Zi._e ? (this.ue = 'ortho') : ((this.ue = 'perspective'), (this.le = (180 * t.Zi.se) / Math.PI)),
				(this.fe = t.Zi.fe),
				(this.de = t.Zi.de));
		}
		createCamera(t, i) {
			let e;
			if (this.ee) {
				const s = Math.max(1, t),
					r = this.le ?? i,
					n = (0.5 * s) / Math.tan((r * Math.PI) / 360);
				e = new it(this.Ki, this.Wi, this.qi + n, this.Ki, this.Wi, this.qi, this.Ji, this.te, this.ie);
			} else e = new it(this.re, this.ne, this.he, this.Ki, this.Wi, this.qi, this.Ji, this.te, this.ie);
			return (this.setCamera(e), e);
		}
		setCamera(t) {
			((this.ce = t),
				(this.ee = !1),
				(this.re = t.eyeX),
				(this.ne = t.eyeY),
				(this.he = t.eyeZ),
				(this.Ki = t.targetX),
				(this.Wi = t.targetY),
				(this.qi = t.targetZ),
				(this.Ji = t.upX),
				(this.te = t.upY),
				(this.ie = t.upZ));
		}
		resetCamera() {
			((this.ce = null),
				(this.ee = !0),
				(this.re = 0),
				(this.ne = 0),
				(this.he = 0),
				(this.Ki = 0),
				(this.Wi = 0),
				(this.qi = 0),
				(this.Ji = 0),
				(this.te = 1),
				(this.ie = 0));
		}
		camera(t, i, e, s = 0, r = 0, n = 0, h = 0, o = 1, a = 0) {
			(this.ce
				? this.ce.setPosition(t, i, e).lookAt(s, r, n).setUp(h, o, a)
				: (this.ce = new it(t, i, e, s, r, n, h, o, a)),
				(this.ee = !1),
				(this.re = t),
				(this.ne = i),
				(this.he = e),
				(this.Ki = s),
				(this.Wi = r),
				(this.qi = n),
				(this.Ji = h),
				(this.te = o),
				(this.ie = a));
		}
		lookAt(t, i, e, s, r, n) {
			(this.ce &&
				(this.ce.lookAt(t, i, e),
				(void 0 === s && void 0 === r && void 0 === n) ||
					this.ce.setUp(s ?? this.ce.upX, r ?? this.ce.upY, n ?? this.ce.upZ)),
				(this.Ki = t),
				(this.Wi = i),
				(this.qi = e),
				void 0 !== s && (this.Ji = s),
				void 0 !== r && (this.te = r),
				void 0 !== n && (this.ie = n));
		}
		perspective(t, i, e) {
			((this.ue = 'perspective'),
				void 0 !== t && (this.le = t),
				void 0 !== i && (this.fe = i),
				void 0 !== e && (this.de = e));
		}
		ortho(t, i) {
			((this.ue = 'ortho'), void 0 !== t && (this.fe = t), void 0 !== i && (this.de = i));
		}
		getActiveCamera() {
			return this.ce;
		}
		applyToState(t) {
			if (('ortho' === this.ue ? t.Zi.pe(this.fe, this.de) : t.Zi.me(this.le, this.fe, this.de), this.ee))
				return (
					t.Zi.ve(),
					void (
						(0 === this.Ki &&
							0 === this.Wi &&
							0 === this.qi &&
							0 === this.Ji &&
							1 === this.te &&
							0 === this.ie) ||
						t.Zi.ge(this.Ki, this.Wi, this.qi, this.Ji, this.te, this.ie)
					)
				);
			t.Zi.ae(this.re, this.ne, this.he, this.Ki, this.Wi, this.qi, this.Ji, this.te, this.ie);
		}
	},
	st = Object.freeze({
		source: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAITElEQVR42u1d2XLkIAz0//909jWVHYPUhyR7SNXUHnhsDI3ULQlyXdf1s/usfiLtv6/5+/dPz4r0Y3XN6ru750fHIPv8u3FC3u/umt39b/oXf/nfN7gb0FU7OwBo+18gRiYrsgAQgN5dd7dYVAD4ND+jAJCxHp8GKfLyu9WwAyVjAVfvkgVA1PoEF5jfBUxpX012BphZAEdWPeviVgBYjVcYAHc3Qgc4stJUFijCAVgAZFwQyyEibYn+5VxAZFI+mTiFj4/4bYZEoi5gBzC1f9+12TiAyge6J5ABEEMCs8QPVTHI6qdUwPlc1OQP//gHTrEaoyuQsTCohagGohwACMPNtKOrbWfSMiSzkoMgZlwV6MrwmI8AWAVMMhoW9bXI5K6IJ6oCUAsTVUU7tZUNdBELdAYAohqZkZiR560UzK49S5KRMK4NANHViLQ7Qq27OACaC4ia2Kxejy4K9Pm0C+gEADIpWSugirQhk6/gANkwM8wBOkkgk0mrYvkulRCxUEggKwSAJ8jA8xkQB4iij5GBzPfQFZJZRVkFcwAgkmHZ2Ds6ic72iZHNEgBk0rUrQhm5PwqADEvPyrBpbg/mAKxpRy1AliDtJKEaAEiwZ8jk1yWDsjo840ZWQZcqAERkMds3hcqisoHsgxUVNRmXIBogqY9nXZCh7zNcABL0KVwlMoLXAYDNvY8WHkbKemQgq6OzcXxhJIuNhcv63wWIbCn6fySQKCgMmejM/RX+LZNZrOi/SmWoXMBtLmCVGmYA4ACMcsVMAQBjAYlnaAIpTNVrdMCZXHp2kBmAd/IAwJLWhVIzE6y0INn/V4Sqp1qAZU0gAwBV2bLLRLMAYAs+OjlAKBDEsGgFy87G29XZQLZ/T7iejgSez4vrAdQ6nSlbFpc90yQPLeqMhqpZl8Nsfr1QEuTy2Yr7u2QnS3JZ/hDc7Zutl7hSN6vQ8eo4APt8tcphikUjZedtAFBJJHQAIwOMvJ8SACxAkXR4CgBIPvppFgCNQ7ChcGV8JVqBBQPA6QLexgHU76cmgVsAOFhyhwpAq4YdKkB5f7sKOJ8vjwOoV7Di+24Vwuh0dyTUdU4hnAuokoWuegM3ANhcQQYUSLZ1HADYejxH/l6VDq7OpAp2ZnlMoKMkTKUymFWqyogqr0GJcZgDsBVD7CpRhaozGU3X1u8JpelbC5CNbLE6vhIAQKBEEiFU+/lSAOy2XrET5DbBLAl0Vy0r8gnEzqKjhU89gHDXzxM3SqjLtZxlXdbzAaZ03BEsYUPJkwBmPSAi6oPVMlC1c0eVDXRUPasKa5H7U7mA7kghuzFjSkWQas/CriAk+X49O2kqs3GZAyicoWoWALuCEDC0/TwLoNbZ3fUAbhlLA+AOZU/hAKpYv6peIQsCRRzj1AOczzkgYspBEGwkVHxCyTklY8r7ObalBUCE+XAHC6/YeNJdEeQCwKc+Bce/bkDRNOfTC0LcoeZsqvvPNVoL4NhfP7EghI1GqgtCiP2b+HZkpOyL3cvGxPrZgpCuI2LU+RoZAJjVs0NpJg6hjKUrK44mqYAlAM7niz8/5p/q41rVEUml9s+OD3JNevzeCoApRZfo+KAJJBgAUwI7VRM82QIorEV4nKoAkH3pae3oBGUBwFqMkQCIMGzFGX3KdvUEKayF8hmlLuCJAMhKMZVMc4OgjQMwgzuh3Ukgqwh2Kwf4hoyectNGmSXIsmaElKBFjVPaHeHeyBY2tsQsFQjqBsDKFyPtf/+faa8AwCqdOwIA7NFmb7IADAmMAmBVycOUrLcDYPfv3QS5vp9NOKE+OQpAdPPpsQBGC8BE6hRb1BTfScvALgBkfX8FB3DkBth0ehkAjgrwASAbhZSelloBgPPx//o5GwDeHgiKrLrdn2hpnCLZRM9BdS5gJXFW5m11XWSSdj5/Z14jnEFZt69wSwcACdmHWgD2bERXnUL4+m8DQEZ/Z0CgrpJmrz0AAE1+RnJWnSLKVj0tr/9WDpAxtQoOsNP/qLuQAcBZFDqZBLIWIJOwQQI5yuNkPj5nWlXwRFnIcADXOAlL1vpCnB3br9RxCjaQ5hif5LP0Z/CtMm+Mj1MBQGmhMlFRtwugAZA1K5HTw5UyR12QUXXyRwUJJFzOvuAAqUhBXjTKbhWrIlsRjBxyEbVgChk4HgDsCkYBpCi2QM8qrAoEkQTd7wJYADgiZegAdyalsiBOA8BBApUmXOmTK7JxFckggUyvy3M7Sp5cMq8znqEoT4MAMFlHuybQqTgq+se2X+zu2KrDE5nUavb+jj65+se2X4oOTQIBO6GVk6/qH9WOsHilj3ds3kSUhGLyO/sHtztkHCrlqgbQ/Xx3u7h/Wtnj1tEdPrvSJ7PjB9xfL3vcOnoSZ+kAhLJ/l0PaVehoVkZ1Ru4qDqtKy8A31PqrtHnX/ZtOUDsAOAA4ADgAcBzCGJGRbLLDcX/2/VyJG3sy6ADgywEw3UR3m/Dp5xyD/TsAOAA4ADgAmBToyUbCIhs4VKXq6tPBs+OIhI03+zXqfgGCa3/8FAAoSBwzRnQouPMwY5YJdwMA7T8LgGgCaGEN+s+yZe+9A4DbvzP9VwAgulN5uS9APfFoiZkaALvVkl2pUw57Xh0pG60n+OgC3D+OAfx2AEhIYPXPFAC4t2NXAQAmgT8P/+nmAN0AsJNA51k2lS7njjeo3rETANE9nTfvrdvZw1TsdKiMNwFgNdEbEOj29nVsbcq4COZI1SpSrJ787TXVAZ0pvzTpLQCITP7yWjbf3g2Abg4wJRAEcwA1ANCyZufKcXKACaFgigM4AIBmCx0VMSwHqN7fzxxjN4IDOFfTkwpLK9PBDAf4BzY4SAYFZUTuAAAAAElFTkSuQmCC',
		columns: 16,
		rows: 16,
		map: '☺☻♥♦♣♠•◘○◙♂♀♪♫☼\n►◄↕‼¶§▬↨↑↓→←∟↔▲▼\n !"#$%&\'()*+,-./\n0123456789:;<=>?\n@ABCDEFGHIJKLMNO\nPQRSTUVWXYZ[\\]^_\n`abcdefghijklmno\npqrstuvwxyz{|}~⌂\nÇüéâäàåçêëèïîìÄÅ\nÉæÆôöòûùÿÖÜ¢£¥₧ƒ\náíóúñÑªº¿⌐¬½¼¡«»\n░▒▓│┤╡╢╖╕╣║╗╝╜╛┐\n└┴┬├─┼╞╟╚╔╩╦╠═╬╧\n╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀\nαßΓπΣσµτΦΘΩδ∞φε∩\n≡±≥≤⌠⌡÷≈°∙·√ⁿ²■□\n',
	}),
	rt = class {
		ye;
		we;
		be;
		l;
		_;
		Me;
		St;
		Ae;
		Ce;
		X;
		xe;
		Se;
		At;
		Ee;
		Te;
		Fe;
		Pe = () => {};
		Le = () => {};
		De = !1;
		Re;
		ke;
		constructor(t, i = {}) {
			((this.X = t), (this.ye = i.visible ?? !0), (this.we = i.opacity ?? 1));
			const e = i.blendMode ?? k.NORMAL;
			((this.be = k.NORMAL),
				B(e) && (this.be = e),
				tt.Di(B(e), 'Invalid blend mode. Expected a LayerBlendMode constant (e.g. t.BLEND_ADDITIVE).', {
					method: 'constructor',
					property: 'blendMode',
					providedValue: i.blendMode,
				}));
			const s = i.fontSize ?? 16;
			((this.St = Math.abs(s)),
				(this.ke = void 0 !== i.fontSize),
				tt.Di('number' == typeof s, 'Font size must be a number.', { method: 'fontSize', providedValue: s }),
				(this.l = i.offsetX ?? 0),
				(this._ = i.offsetY ?? 0),
				(this.Me = i.rotationZ ?? 0));
			const r = i.fontSource;
			((this.Ae = r),
				(this.At =
					r instanceof P || r instanceof D ? r : void 0 === r ? new D(t, this.St, st) : new P(t, this.St)),
				(this.Re = new et(t.state)));
		}
		async Oe(t) {
			if (((this.xe = t), this.Ae instanceof P || this.Ae instanceof D)) {
				this.Ae.Dt || (await this.Ae.Ot());
				const t = this.Ae,
					i = t.Rt({ fontSize: this.Be(t) });
				this.Ie(i);
			}
			this.At.Dt || (this.At instanceof P ? await this.At.Ot(this.Ae) : await this.At.Ot());
			const i = this.At.maxGlyphDimensions;
			this.Se = new e(this.xe.canvas.canvas, i.width, i.height);
			const s = this.Se;
			((this.Ee = this.xe.createFramebuffer(s.cols, s.rows, 3)),
				(this.Te = this.xe.createFramebuffer(s.width, s.height, 1, { depth: !1 })),
				(this.Fe = this.Te),
				this.Se.S(() => {
					(this.Ee.resize(this.Se.cols, this.Se.rows), this.Te.resize(this.Se.width, this.Se.height));
				}));
		}
		draw(t) {
			this.Pe = t;
		}
		postDraw(t) {
			this.Le = t;
		}
		show() {
			this.ye = !0;
		}
		hide() {
			this.ye = !1;
		}
		opacity(t) {
			if (void 0 === t) return this.we;
			this.we = Q(t, 0, 1);
		}
		blendMode(t) {
			if (void 0 === t) return this.be;
			tt.Di(B(t), 'Invalid blend mode. Expected a LayerBlendMode constant (e.g. t.BLEND_ADDITIVE).', {
				method: 'blendMode',
				providedValue: t,
			}) && (this.be = t);
		}
		offset(t, i = 0) {
			if (void 0 === t) return { x: this.l, y: this._ };
			((this.l = t), (this._ = i));
		}
		rotateZ(t) {
			if (void 0 === t) return this.Me;
			this.Me = t;
		}
		createCamera() {
			const t = this.Ne(),
				i = (180 * (this.xe?.renderer.state.Zi.se ?? Math.PI / 4)) / Math.PI;
			return this.Re.createCamera(t.height, i);
		}
		setCamera(t) {
			(this.Re.setCamera(t), this.je());
		}
		resetCamera() {
			(this.Re.resetCamera(), this.je());
		}
		camera(t, i, e, s = 0, r = 0, n = 0, h = 0, o = 1, a = 0) {
			(this.Re.camera(t, i, e, s, r, n, h, o, a), this.je());
		}
		lookAt(t, i, e, s, r, n) {
			(this.Re.lookAt(t, i, e, s, r, n), this.je());
		}
		perspective(t, i, e) {
			(this.Re.perspective(t, i, e), this.je());
		}
		ortho(t, i) {
			(this.Re.ortho(t, i), this.je());
		}
		ze() {
			return this.Re.getActiveCamera();
		}
		fontSize(t) {
			if (void 0 === t) return this.At.fontSize;
			if (!tt.Di('number' == typeof t, 'Font size must be a number.', { method: 'fontSize', providedValue: t }))
				return;
			const i = Math.abs(t);
			this.At.fontSize !== i && ((this.ke = !0), (this.St = i), this.At.Nt(i), this.Qe());
		}
		useTileColors(t) {
			if (void 0 === t) return this.De;
			this.De = t;
		}
		async loadFont(t) {
			if (!this.At) throw new Error('Layer font not initialized. Ensure layer is attached before loading fonts.');
			if (t instanceof P) {
				t.Dt || (await t.Ot());
				const i = t,
					e = i.Rt({ fontSize: this.Be(i) });
				this.Ie(e);
			} else if (this.At instanceof P) await this.At.jt(t);
			else {
				const i = new P(this.X, this.At.fontSize);
				(await i.Ot(t), this.Ie(i));
			}
			return ((this.Ae = t), (this.St = this.At.fontSize), this.Qe(), this.At);
		}
		async loadTileset(t) {
			if (!this.At)
				throw new Error('Layer font not initialized. Ensure layer is attached before loading tilesets.');
			if (t instanceof D) {
				t.Dt || (await t.Ot());
				const i = t.Rt({ fontSize: this.Be(t) });
				this.Ie(i);
			} else {
				const i = this.ke ? this.St : t.fontSize,
					e = new D(this.X, i, t);
				(await e.Ot(), this.Ie(e));
			}
			return ((this.Ae = t), (this.St = this.At.fontSize), this.Qe(), this.At);
		}
		Ge(t, i, e = {}) {
			if (!this.ye) return;
			if (!this.Ee || !this.Te) return;
			const s = this.xe.renderer,
				r = this.Se,
				n = e.skipPluginHooks ?? !1;
			n || t.He.$e(this);
			try {
				let e = !1;
				try {
					(this.Ee.begin(),
						(e = !0),
						s.state.Ve.Xe(),
						s.state.Ye(),
						this.Re.applyToState(s.state),
						(t.Ke = this),
						this.Pe.call(t));
				} finally {
					((t.Ke = void 0), e && this.Ee.end());
				}
				n || t.He.Ze(this);
				const h = this.Te;
				this.Fe = h;
				let o = !1;
				try {
					(h.begin(),
						(o = !0),
						s.We(i),
						i.qe({
							u_characterTexture: this.At.framebuffer,
							u_charsetDimensions: [this.At.textureColumns, this.At.textureRows],
							U0: this.Ee.textures[0],
							Ui: this.Ee.textures[1],
							Uk: this.Ee.textures[2],
							UE: !(this.At instanceof D && this.De),
							U8: [r.cols, r.rows],
							U9: [h.width, h.height],
							U6: [0, 0, 0, 0],
						}),
						s.Je(0, 0, r.width, r.height));
				} finally {
					o && h.end();
				}
				n || (this.Fe = t.He.ts(this, 'resolved', this.Fe));
				try {
					((t.Ke = this), this.Le.call(t));
				} finally {
					t.Ke = void 0;
				}
				n || (this.Fe = t.He.ts(this, 'finalized', this.Fe));
			} finally {
				t.Ke = void 0;
			}
		}
		es(t) {
			this.Ce = [...t];
		}
		ss() {
			this.Ce = void 0;
		}
		rs() {
			this.Ee && this.Te && this.Se?.reset();
		}
		L() {
			(this.Ee?.dispose(), this.Te?.dispose(), (this.Fe = void 0), this.At?.dispose(), this.Se?.L());
		}
		get texture() {
			return this.Fe?.textures[0];
		}
		get grid() {
			return this.Se;
		}
		get font() {
			return this.At;
		}
		get width() {
			return this.Te ? this.Te.width : 0;
		}
		get height() {
			return this.Te ? this.Te.height : 0;
		}
		get drawFramebuffer() {
			return this.Ee;
		}
		get asciiFramebuffer() {
			return this.Te;
		}
		Qe() {
			if (!this.Se || !this.At) return;
			const t = this.At.maxGlyphDimensions;
			(this.Se.U(t.width, t.height), this.Ee && this.Te && this.rs());
		}
		Ie(t) {
			(((this.Ae instanceof P || this.Ae instanceof D) && this.At === this.Ae) ||
				this.At === t ||
				this.At.dispose(),
				(this.At = t));
		}
		Be(t) {
			return this.ke ? this.St : t.fontSize;
		}
		je() {
			this.Re.applyToState(this.xe.renderer.state);
		}
		Ne() {
			if (this.Ee) return { width: Math.max(1, this.Ee.width), height: Math.max(1, this.Ee.height) };
			if (this.Se) return { width: Math.max(1, this.Se.cols), height: Math.max(1, this.Se.rows) };
			const t = this.xe?.renderer.context.canvas.width ?? this.xe?.canvas.width ?? 1,
				i = this.xe?.renderer.context.canvas.height ?? this.xe?.canvas.height ?? 1;
			return { width: Math.max(1, t), height: Math.max(1, i) };
		}
	},
	nt = class {
		ns;
		hs;
		Pe;
		Dt = !1;
		constructor(t) {
			this.ns = t;
		}
		draw(t) {
			this.Pe = t;
		}
		async Ot() {
			if (this.Dt) return;
			const t = this.cs();
			((this.hs = t), (this.Dt = !0));
		}
		L() {
			this.Dt && (this.hs?.L(), (this.Dt = !1));
		}
		us(t, i) {
			const e = this.hs;
			(e.show(),
				e.draw(() => {
					(this.ns.clear(), this.ns.push());
					try {
						((this.Pe || t)(i), this.ls(i));
					} finally {
						this.ns.pop();
					}
				}));
		}
		ls(t) {
			const { textmodifier: i, grid: e } = t,
				s = [116, 101, 120, 116, 109, 111, 100, 101, 46, 106, 115].map((t) => String.fromCharCode(t)).join(''),
				r = ((e.rows + 1) >> 1) - 2,
				n = 2 - ((e.cols + 1) >> 1),
				h = [
					[142, 249, 243],
					[241, 91, 181],
					[255, 155, 113],
				];
			(i.push(), i.translate(n, r, 0));
			for (let o = 0; o < s.length; o++) {
				const t = s[o],
					[e, r, n] = h[Math.floor(0.1 * i.frameCount + 0.5 * o) % h.length],
					a = i.color(e, r, n);
				(i.charColor(a), i.char(t), i.point(), i.translateX(1));
			}
			i.pop();
		}
	};
function ht(t, i, e) {
	!(function (t, i, e, s) {
		(t.push(), t.translate(e, s, 0));
		for (const r of i) (t.char(r), t.rect(1, 1), t.translateX(1));
		t.pop();
	})(t, i, -Math.floor(i.length / 2), e);
}
var ot = ({ textmodifier: t, grid: i, errorTitle: e, errorMessage: s }) => {
		(t.background('#222323'),
			t.cellColor('#222323'),
			t.charColor('#FF6B6B'),
			ht(t, 'X', -2),
			ht(t, e || 'SKETCH ERROR', 0),
			t.charColor('#C0C0C0'));
		const r = s || 'Unknown error',
			n = Math.floor(0.8 * i.cols),
			h = at(r, n),
			o = h.slice(0, 3);
		(h.length > 3 && (o[2] = o[2].substring(0, n - 3) + '...'),
			o.forEach((i, e) => {
				ht(t, i, 3 + e);
			}));
		const a = at('CHECK CONSOLE FOR DETAILS', n),
			c = 5 + o.length;
		a.forEach((i, e) => {
			ht(t, i, c + e);
		});
	},
	at = (t, i) => {
		const e = t.split(' '),
			s = [];
		let r = '';
		for (const n of e) (r + ' ' + n).length <= i ? (r = r ? r + ' ' + n : n) : (r && s.push(r), (r = n));
		return (r && s.push(r), s);
	},
	ct = class extends nt {
		fs = 'inactive';
		ds = 'SKETCH ERROR';
		_s = 'Unknown error';
		ps = '';
		constructor(t) {
			super(t);
		}
		async Ot() {
			this.Dt || (await super.Ot(), this.hs.opacity(1), this.hs.hide());
		}
		get vs() {
			return this.Dt && 'active' === this.fs;
		}
		gs(t) {
			(this.ws(t), this.Dt && (this.hs.opacity(1), this.hs.show()));
		}
		bs() {
			this.vs && this.Ms();
		}
		L() {
			super.L();
		}
		cs() {
			return new rt(this.ns.X, { visible: !0, opacity: 1 });
		}
		Ms() {
			const t = {
				textmodifier: this.ns,
				grid: this.hs.grid,
				errorTitle: this.ds,
				errorMessage: this._s,
				errorDetails: this.ps || void 0,
			};
			this.us(ot, t);
		}
		ws(t) {
			if (((this.fs = 'active'), t instanceof Error)) {
				const i = t.name?.trim() ? t.name.trim().toUpperCase() : 'SKETCH ERROR';
				return (
					(this.ds = i.endsWith('ERROR') ? i : `${i} ERROR`),
					(this._s = t.message || 'Unknown error'),
					void (this.ps = t.stack || '')
				);
			}
			if ('string' == typeof t)
				return ((this.ds = 'SKETCH ERROR'), (this._s = t || 'Unknown error'), void (this.ps = ''));
			((this.ds = 'SKETCH ERROR'), (this._s = 'Unknown error'), (this.ps = ''));
		}
	},
	ut = /* @__PURE__ */ i({ ErrorLayerController: () => ct, TextmodeError: () => r, TextmodeErrorLevel: () => J });
function lt(t, i) {
	(t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, 1), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, i));
}
function ft(t) {
	if (t instanceof HTMLVideoElement)
		return t.readyState >= t.HAVE_CURRENT_DATA && t.videoWidth > 0 && t.videoHeight > 0;
	const { width: i, height: e } = gt(t);
	return i > 0 && e > 0;
}
function dt(t, i, e) {
	ft(e) && (t.bindTexture(t.TEXTURE_2D, i), lt(t, e), t.bindTexture(t.TEXTURE_2D, null));
}
function _t(t, i, e = t.NEAREST, s = t.NEAREST, r = t.CLAMP_TO_EDGE, n = t.CLAMP_TO_EDGE) {
	const h = t.createTexture();
	(t.bindTexture(t.TEXTURE_2D, h),
		pt(t, e, s, r, n),
		ft(i)
			? lt(t, i)
			: (function (t) {
					t.texImage2D(
						t.TEXTURE_2D,
						0,
						t.RGBA,
						1,
						1,
						0,
						t.RGBA,
						t.UNSIGNED_BYTE,
						new Uint8Array([0, 0, 0, 0])
					);
				})(t),
		t.bindTexture(t.TEXTURE_2D, null));
	const { width: o, height: a } = gt(i);
	return { texture: h, width: Math.max(1, o), height: Math.max(1, a) };
}
function pt(t, i, e, s, r) {
	(t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, i),
		t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, e),
		t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, s),
		t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, r));
}
function mt(t, i, e, s, r, n = 0, h = t.FLOAT, o = !1) {
	(t.enableVertexAttribArray(i), t.vertexAttribPointer(i, e, h, o, s, r), t.vertexAttribDivisor(i, n));
}
function vt(t, i, e, s, r) {
	(t.bindBuffer(i, e), t.bufferData(i, s, r), t.bindBuffer(i, null));
}
function gt(t) {
	let i = 0,
		e = 0;
	return (
		t instanceof HTMLVideoElement
			? ((i = t.videoWidth), (e = t.videoHeight))
			: t instanceof HTMLImageElement
				? ((i = t.naturalWidth), (e = t.naturalHeight))
				: t instanceof HTMLCanvasElement && ((i = t.width), (e = t.height)),
		{ width: i, height: e }
	);
}
var yt = class extends s {
	o;
	u;
	qt;
	As;
	V;
	Cs = [];
	Ss = null;
	Es;
	X;
	Ts = null;
	Fs = /* @__PURE__ */ new Map();
	constructor(t, i, e = i, s = 1, r = {}, n) {
		(super(),
			(this.o = i),
			(this.u = e),
			(this.As = t),
			(this.Es = Q(s, 1, 8)),
			(this.X = n),
			(this.qt = { filter: 'nearest', wrap: 'clamp', type: 'unsigned_byte', depth: !0, ...r }));
		const h = t.getParameter(t.MAX_DRAW_BUFFERS),
			o = t.getParameter(t.MAX_COLOR_ATTACHMENTS);
		((this.Es = Math.min(this.Es, h, o)),
			(this.V = t.createFramebuffer()),
			this.Ps(),
			this.Ls(),
			this.qt.depth && this.Ds());
	}
	Ps() {
		const t = this.As,
			i = 'linear' === this.qt.filter ? t.LINEAR : t.NEAREST,
			e = 'repeat' === this.qt.wrap ? t.REPEAT : t.CLAMP_TO_EDGE;
		for (let s = 0; s < this.Es; s++) {
			const s = t.createTexture();
			(t.bindTexture(t.TEXTURE_2D, s), pt(t, i, i, e, e), this.Rs(s, !1), this.Cs.push(s));
		}
		t.bindTexture(t.TEXTURE_2D, null);
	}
	Rs(t, i = !0) {
		const e = this.As,
			s = 'float' === this.qt.type ? e.FLOAT : e.UNSIGNED_BYTE,
			r = s === e.FLOAT ? e.RGBA32F : e.RGBA8,
			n = e.RGBA;
		(i && e.bindTexture(e.TEXTURE_2D, t), e.texImage2D(e.TEXTURE_2D, 0, r, this.o, this.u, 0, n, s, null));
	}
	Ls() {
		const t = this.As;
		if ((t.bindFramebuffer(t.FRAMEBUFFER, this.V), 1 === this.Es))
			t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.Cs[0], 0);
		else {
			const i = [];
			for (let e = 0; e < this.Es; e++) {
				const s = t.COLOR_ATTACHMENT0 + e;
				(t.framebufferTexture2D(t.FRAMEBUFFER, s, t.TEXTURE_2D, this.Cs[e], 0), i.push(s));
			}
			t.drawBuffers(i);
		}
		t.bindFramebuffer(t.FRAMEBUFFER, null);
	}
	Ds() {
		const t = this.As;
		((this.Ss = t.createRenderbuffer()),
			this.ks(),
			t.bindFramebuffer(t.FRAMEBUFFER, this.V),
			t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, this.Ss),
			t.bindFramebuffer(t.FRAMEBUFFER, null));
	}
	ks() {
		if (!this.Ss) return;
		const t = this.As;
		(t.bindRenderbuffer(t.RENDERBUFFER, this.Ss),
			t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT24, this.o, this.u),
			t.bindRenderbuffer(t.RENDERBUFFER, null));
	}
	J(t) {
		dt(this.As, this.Cs[0], t);
	}
	resize(t, i) {
		((this.o = t), (this.u = i), this.Fs.clear());
		const e = this.As;
		for (const s of this.Cs) this.Rs(s, !0);
		(e.bindTexture(e.TEXTURE_2D, null), this.ks(), (this.Ts = null));
	}
	readPixels(t) {
		const i = this.Fs.get(t);
		if (i) return i;
		const e = this.As,
			s = this.o,
			r = this.u,
			n = new Uint8Array(s * r * 4),
			h = e.getParameter(e.READ_FRAMEBUFFER_BINDING);
		(e.bindFramebuffer(e.READ_FRAMEBUFFER, this.V),
			e.readBuffer(e.COLOR_ATTACHMENT0 + t),
			e.readPixels(0, 0, s, r, e.RGBA, e.UNSIGNED_BYTE, n),
			e.bindFramebuffer(e.READ_FRAMEBUFFER, h));
		const o = 4 * s,
			a = new Uint8Array(n.length);
		for (let c = 0; c < r; c++) {
			const t = (r - 1 - c) * o,
				i = c * o;
			a.set(n.subarray(t, t + o), i);
		}
		return (this.Fs.set(t, a), a);
	}
	begin() {
		const t = this.As;
		(this.Fs.clear(),
			this.X.Os(),
			this.X.Bs(this.V, this.o, this.u, this.Es),
			this.qt.depth && t.clear(t.DEPTH_BUFFER_BIT),
			this.X.state.Is());
	}
	end() {
		this.X.state.Ns();
		try {
			this.X.js();
		} finally {
			this.X.zs();
		}
	}
	Qs() {
		return (this.Ts || this.Gs(), this.Ts);
	}
	Gs() {
		if (!this.X) return;
		const t = this.Es > 1,
			i = this.Es > 2,
			e = this.Es > 3,
			s = {
				Ul: this.Cs[0],
				Um: t ? this.Cs[1] : this.Cs[0],
				Un: i ? this.Cs[2] : this.Cs[0],
				Uo: e ? this.Cs[3] : this.Cs[0],
				Up: [this.o, this.u],
				Ub: t,
				Uc: i,
				Ud: e,
			},
			r = this.X.materialManager.$s;
		this.Ts = this.X.materialManager.Hs(r, s);
	}
	dispose() {
		if (this.O()) return;
		const t = this.As;
		(t.deleteFramebuffer(this.V),
			this.Cs.forEach((i) => {
				t.deleteTexture(i);
			}),
			this.Ss && t.deleteRenderbuffer(this.Ss),
			(this.V = null),
			(this.Cs = []),
			(this.Ss = null),
			this.Fs.clear(),
			super.dispose());
	}
	get width() {
		return this.o;
	}
	get height() {
		return this.u;
	}
	get framebuffer() {
		return this.V;
	}
	get textures() {
		return this.Cs;
	}
	get attachmentCount() {
		return this.Es;
	}
};
function wt(t) {
	return 'object' == typeof t && null !== t && 'textures' in t && Array.isArray(t.textures);
}
var bt = class extends s {
		As;
		Xs;
		Vs = /* @__PURE__ */ new Map();
		Ys = /* @__PURE__ */ new Map();
		Ks = /* @__PURE__ */ new Map();
		Zs = 0;
		Ws = /* @__PURE__ */ new Map();
		qs;
		constructor(t, i, e) {
			(super(),
				(this.As = t),
				(this.qs = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS) ?? 16),
				(this.Xs = this.Js(i, e)),
				this.tr());
		}
		tr() {
			const t = this.As.getProgramParameter(this.Xs, this.As.ACTIVE_UNIFORMS);
			for (let i = 0; i < t; i++) {
				const t = this.As.getActiveUniform(this.Xs, i);
				if (t) {
					const i = t.name.replace(/\[0\]$/, ''),
						e = this.As.getUniformLocation(this.Xs, i);
					e && (this.Vs.set(i, e), this.Ys.set(i, { type: t.type, size: t.size }));
				}
			}
		}
		Js(t, i) {
			const e = this.ir(this.As.VERTEX_SHADER, t),
				s = this.ir(this.As.FRAGMENT_SHADER, i),
				r = this.As.createProgram();
			if (!r) throw new Error('Failed to create WebGL program');
			if (
				(this.As.attachShader(r, e),
				this.As.attachShader(r, s),
				this.As.linkProgram(r),
				!this.As.getProgramParameter(r, this.As.LINK_STATUS))
			) {
				const t = this.As.getProgramInfoLog(r);
				throw new Error(`Shader program link error: ${t}`);
			}
			return (this.As.deleteShader(e), this.As.deleteShader(s), r);
		}
		ir(t, i) {
			const e = this.As.createShader(t);
			if (!e) throw new Error(`Failed to create shader of type ${t}`);
			if (
				(this.As.shaderSource(e, i),
				this.As.compileShader(e),
				!this.As.getShaderParameter(e, this.As.COMPILE_STATUS))
			) {
				const t = this.As.getShaderInfoLog(e);
				throw (this.As.deleteShader(e), new Error(`Shader compilation error: ${t}`));
			}
			return e;
		}
		er() {
			(this.As.useProgram(this.Xs), this.sr());
		}
		sr() {
			((this.Zs = 0), this.Ws.clear());
			for (const [t, i] of this.Ks) (i instanceof WebGLTexture || wt(i)) && this.Ks.delete(t);
		}
		qe(t) {
			for (const i in t) this.rr(i, t[i]);
		}
		rr(t, i) {
			const e = this.Vs.get(t);
			if (!e) return;
			const s = this.Ks.get(t);
			let r = !0;
			if (
				(void 0 !== s &&
					('number' == typeof i || 'boolean' == typeof i
						? s === i && (r = !1)
						: (i instanceof WebGLTexture || wt(i)) && s === i && (r = !1)),
				!r)
			)
				return;
			'number' == typeof i || 'boolean' == typeof i || i instanceof WebGLTexture || wt(i)
				? this.Ks.set(t, i)
				: this.Ks.delete(t);
			const n = this.Ys.get(t);
			if (!n) return;
			const { type: h, size: o } = n,
				a = this.As;
			if (i instanceof WebGLTexture) {
				const s = this.nr(t);
				return (a.uniform1i(e, s), a.activeTexture(a.TEXTURE0 + s), void a.bindTexture(a.TEXTURE_2D, i));
			}
			if (wt(i)) {
				const s = this.nr(t);
				return (
					a.uniform1i(e, s),
					a.activeTexture(a.TEXTURE0 + s),
					void a.bindTexture(a.TEXTURE_2D, i.textures[0])
				);
			}
			if ('number' != typeof i)
				if ('boolean' != typeof i)
					if (Array.isArray(i) && Array.isArray(i[0])) {
						const t = i.flat();
						switch (h) {
							case a.FLOAT_VEC2:
								a.uniform2fv(e, t);
								break;
							case a.FLOAT_VEC3:
								a.uniform3fv(e, t);
								break;
							case a.FLOAT_VEC4:
								a.uniform4fv(e, t);
						}
					} else {
						const t = i;
						switch (h) {
							case a.FLOAT:
								o > 1 ? a.uniform1fv(e, t) : a.uniform1f(e, t[0]);
								break;
							case a.FLOAT_VEC2:
								a.uniform2fv(e, t);
								break;
							case a.FLOAT_VEC3:
								a.uniform3fv(e, t);
								break;
							case a.FLOAT_VEC4:
								a.uniform4fv(e, t);
								break;
							case a.INT:
								o > 1 ? a.uniform1iv(e, t) : a.uniform1i(e, t[0]);
								break;
							case a.INT_VEC2:
								a.uniform2iv(e, t);
								break;
							case a.INT_VEC3:
								a.uniform3iv(e, t);
								break;
							case a.INT_VEC4:
								a.uniform4iv(e, t);
								break;
							case a.BOOL:
								a.uniform1iv(e, t);
								break;
							case a.FLOAT_MAT2:
								a.uniformMatrix2fv(e, !1, t);
								break;
							case a.FLOAT_MAT3:
								a.uniformMatrix3fv(e, !1, t);
								break;
							case a.FLOAT_MAT4:
								a.uniformMatrix4fv(e, !1, t);
						}
					}
				else a.uniform1i(e, i ? 1 : 0);
			else h === a.INT || h === a.BOOL ? a.uniform1i(e, i) : a.uniform1f(e, i);
		}
		nr(t) {
			const i = this.Ws.get(t);
			if (void 0 !== i) return i;
			if (this.Zs >= this.qs)
				throw new Error(
					`[textmode.js] Shader attempted to bind more than ${this.qs} texture samplers. Uniform "${t}" cannot be assigned.`
				);
			const e = this.Zs++;
			return (this.Ws.set(t, e), e);
		}
		get program() {
			return this.Xs;
		}
		dispose() {
			this.O() || (this.As.deleteProgram(this.Xs), super.dispose());
		}
	},
	Mt = /* @__PURE__ */ new WeakMap();
function At(t, i) {
	Mt.set(t, i);
}
function Ct(t) {
	return Mt.get(t);
}
var xt = [255, 255, 255, 255],
	St = [360, 100, 100, 1];
function Et(t) {
	return [(i = 'rgb' === t ? xt : St)[0], i[1], i[2], i[3]];
	var i;
}
function Tt() {
	return { mode: 'rgb', maxes: Et('rgb') };
}
function Ft(t, i) {
	return Number.isNaN(t) ? 0 : Q(t, 0, i) / i;
}
function Ut(t, i) {
	return Math.round(255 * Ft(t, i));
}
function Pt(t, i) {
	return Ut(t ?? i, i);
}
function Lt(t, i, e) {
	return (
		e < 0 && (e += 1),
		e > 1 && (e -= 1),
		e < 1 / 6 ? t + 6 * (i - t) * e : e < 0.5 ? i : e < 2 / 3 ? t + (i - t) * (2 / 3 - e) * 6 : t
	);
}
function Dt(t, i, e, s, r) {
	const [n, h, o, a] = r.maxes,
		c = Pt(s, a);
	if ('rgb' === r.mode) return [Ut(t, n), Ut(i, h), Ut(e, o), c];
	const u = ((l = t), (f = n), Number.isNaN(l) ? 0 : (((l % f) + f) % f) / f);
	var l, f;
	const d = Ft(i, h),
		_ = Ft(e, o),
		[p, m, v] =
			'hsb' === r.mode
				? (function (t, i, e) {
						if (0 === i) return [e, e, e];
						const s = 6 * t,
							r = Math.floor(s),
							n = s - r,
							h = e * (1 - i),
							o = e * (1 - n * i),
							a = e * (1 - (1 - n) * i);
						switch (r % 6) {
							case 0:
								return [e, a, h];
							case 1:
								return [o, e, h];
							case 2:
								return [h, e, a];
							case 3:
								return [h, o, e];
							case 4:
								return [a, h, e];
							default:
								return [e, h, o];
						}
					})(u, d, _)
				: (function (t, i, e) {
						if (0 === i) return [e, e, e];
						const s = e < 0.5 ? e * (1 + i) : e + i - e * i,
							r = 2 * e - s;
						return [Lt(r, s, t + 1 / 3), Lt(r, s, t), Lt(r, s, t - 1 / 3)];
					})(u, d, _);
	return [Math.round(255 * p), Math.round(255 * m), Math.round(255 * v), c];
}
var Rt = class {
		hr = 0;
		ar = 0;
		cr = 0;
		ur = 0;
		lr = 0;
		dr = 0;
		_r = 1;
		pr = 1;
		mr = 1;
		vr = W();
		gr = W();
		yr = W();
		wr(t) {
			((t.hr = this.hr),
				(t.ar = this.ar),
				(t.cr = this.cr),
				(t.ur = this.ur),
				(t.lr = this.lr),
				(t.dr = this.dr),
				(t._r = this._r),
				(t.pr = this.pr),
				(t.mr = this.mr));
			for (let i = 0; i < 16; i++) t.vr[i] = this.vr[i];
		}
		br(t) {
			((this.hr = t.hr),
				(this.ar = t.ar),
				(this.cr = t.cr),
				(this.ur = t.ur),
				(this.lr = t.lr),
				(this.dr = t.dr),
				(this._r = t._r),
				(this.pr = t.pr),
				(this.mr = t.mr));
			for (let i = 0; i < 16; i++) this.vr[i] = t.vr[i];
		}
		Mr(t = 0, i = 0, e = 0) {
			(0 === t && 0 === i && 0 === e) ||
				((this.gr[0] = 1),
				(this.gr[1] = 0),
				(this.gr[2] = 0),
				(this.gr[3] = 0),
				(this.gr[4] = 0),
				(this.gr[5] = 1),
				(this.gr[6] = 0),
				(this.gr[7] = 0),
				(this.gr[8] = 0),
				(this.gr[9] = 0),
				(this.gr[10] = 1),
				(this.gr[11] = 0),
				(this.gr[12] = t),
				(this.gr[13] = i),
				(this.gr[14] = e),
				(this.gr[15] = 1),
				this.Ar(this.gr));
		}
		Cr(t, i, e) {
			const s = void 0 === i ? t : i,
				r = void 0 === e ? (void 0 === i ? t : 1) : e;
			(1 === t && 1 === s && 1 === r) ||
				((this.gr[0] = t),
				(this.gr[1] = 0),
				(this.gr[2] = 0),
				(this.gr[3] = 0),
				(this.gr[4] = 0),
				(this.gr[5] = s),
				(this.gr[6] = 0),
				(this.gr[7] = 0),
				(this.gr[8] = 0),
				(this.gr[9] = 0),
				(this.gr[10] = r),
				(this.gr[11] = 0),
				(this.gr[12] = 0),
				(this.gr[13] = 0),
				(this.gr[14] = 0),
				(this.gr[15] = 1),
				this.Ar(this.gr));
		}
		Sr(t) {
			if (0 === t) return;
			const i = I(t);
			((this.gr[0] = 1),
				(this.gr[1] = 0),
				(this.gr[2] = 0),
				(this.gr[3] = 0),
				(this.gr[4] = 0),
				(this.gr[5] = Math.cos(i)),
				(this.gr[6] = Math.sin(i)),
				(this.gr[7] = 0),
				(this.gr[8] = 0),
				(this.gr[9] = -Math.sin(i)),
				(this.gr[10] = Math.cos(i)),
				(this.gr[11] = 0),
				(this.gr[12] = 0),
				(this.gr[13] = 0),
				(this.gr[14] = 0),
				(this.gr[15] = 1),
				this.Ar(this.gr));
		}
		Er(t) {
			if (0 === t) return;
			const i = I(t);
			((this.gr[0] = Math.cos(i)),
				(this.gr[1] = 0),
				(this.gr[2] = -Math.sin(i)),
				(this.gr[3] = 0),
				(this.gr[4] = 0),
				(this.gr[5] = 1),
				(this.gr[6] = 0),
				(this.gr[7] = 0),
				(this.gr[8] = Math.sin(i)),
				(this.gr[9] = 0),
				(this.gr[10] = Math.cos(i)),
				(this.gr[11] = 0),
				(this.gr[12] = 0),
				(this.gr[13] = 0),
				(this.gr[14] = 0),
				(this.gr[15] = 1),
				this.Ar(this.gr));
		}
		Tr(t) {
			if (0 === t) return;
			const i = I(t);
			((this.gr[0] = Math.cos(i)),
				(this.gr[1] = Math.sin(i)),
				(this.gr[2] = 0),
				(this.gr[3] = 0),
				(this.gr[4] = -Math.sin(i)),
				(this.gr[5] = Math.cos(i)),
				(this.gr[6] = 0),
				(this.gr[7] = 0),
				(this.gr[8] = 0),
				(this.gr[9] = 0),
				(this.gr[10] = 1),
				(this.gr[11] = 0),
				(this.gr[12] = 0),
				(this.gr[13] = 0),
				(this.gr[14] = 0),
				(this.gr[15] = 1),
				this.Ar(this.gr));
		}
		Fr(t, i, e, s) {
			if (0 === t) return;
			const r = Math.hypot(i, e, s);
			if (r < 1e-6) return;
			const n = i / r,
				h = e / r,
				o = s / r,
				a = I(t),
				c = Math.cos(a),
				u = Math.sin(a),
				l = 1 - c;
			((this.gr[0] = l * n * n + c),
				(this.gr[1] = l * n * h + u * o),
				(this.gr[2] = l * n * o - u * h),
				(this.gr[3] = 0),
				(this.gr[4] = l * n * h - u * o),
				(this.gr[5] = l * h * h + c),
				(this.gr[6] = l * h * o + u * n),
				(this.gr[7] = 0),
				(this.gr[8] = l * n * o + u * h),
				(this.gr[9] = l * h * o - u * n),
				(this.gr[10] = l * o * o + c),
				(this.gr[11] = 0),
				(this.gr[12] = 0),
				(this.gr[13] = 0),
				(this.gr[14] = 0),
				(this.gr[15] = 1),
				this.Ar(this.gr));
		}
		Pr() {
			(W(this.vr),
				(this.hr = 0),
				(this.ar = 0),
				(this.cr = 0),
				(this.ur = 0),
				(this.lr = 0),
				(this.dr = 0),
				(this._r = 1),
				(this.pr = 1),
				(this.mr = 1));
		}
		Lr(t) {
			if (!this.Dr(t))
				throw new Error('applyMatrix() only supports affine transform matrices without shear or perspective.');
			this.Ar(t);
		}
		Ar(t) {
			!(function (t, i, e = /* @__PURE__ */ new Float32Array(16)) {
				const s = t[0],
					r = t[1],
					n = t[2],
					h = t[3],
					o = t[4],
					a = t[5],
					c = t[6],
					u = t[7],
					l = t[8],
					f = t[9],
					d = t[10],
					_ = t[11],
					p = t[12],
					m = t[13],
					v = t[14],
					g = t[15],
					y = i[0],
					w = i[1],
					b = i[2],
					M = i[3],
					A = i[4],
					C = i[5],
					x = i[6],
					S = i[7],
					E = i[8],
					T = i[9],
					F = i[10],
					U = i[11],
					P = i[12],
					L = i[13],
					D = i[14],
					R = i[15];
				((e[0] = s * y + o * w + l * b + p * M),
					(e[1] = r * y + a * w + f * b + m * M),
					(e[2] = n * y + c * w + d * b + v * M),
					(e[3] = h * y + u * w + _ * b + g * M),
					(e[4] = s * A + o * C + l * x + p * S),
					(e[5] = r * A + a * C + f * x + m * S),
					(e[6] = n * A + c * C + d * x + v * S),
					(e[7] = h * A + u * C + _ * x + g * S),
					(e[8] = s * E + o * T + l * F + p * U),
					(e[9] = r * E + a * T + f * F + m * U),
					(e[10] = n * E + c * T + d * F + v * U),
					(e[11] = h * E + u * T + _ * F + g * U),
					(e[12] = s * P + o * L + l * D + p * R),
					(e[13] = r * P + a * L + f * D + m * R),
					(e[14] = n * P + c * L + d * D + v * R),
					(e[15] = h * P + u * L + _ * D + g * R));
			})(this.vr, t, this.yr);
			for (let i = 0; i < 16; i++) this.vr[i] = this.yr[i];
			this.Rr();
		}
		Rr() {
			const t = this.vr,
				i = this.ur,
				e = this.lr,
				s = this.dr;
			((this.hr = t[12]), (this.ar = t[13]), (this.cr = t[14]));
			const r = t[0],
				n = t[1],
				h = t[2],
				o = t[4],
				a = t[5],
				c = t[6],
				u = t[8],
				l = t[9],
				f = t[10];
			let d = Math.hypot(r, n, h),
				_ = Math.hypot(o, a, c),
				p = Math.hypot(u, l, f);
			(d < 1e-6 && (d = 1e-6),
				_ < 1e-6 && (_ = 1e-6),
				p < 1e-6 && (p = 1e-6),
				t[0] * (t[5] * t[10] - t[6] * t[9]) -
					t[4] * (t[1] * t[10] - t[2] * t[9]) +
					t[8] * (t[1] * t[6] - t[2] * t[5]) <
					0 && (p = -p),
				(this._r = d),
				(this.pr = _),
				(this.mr = p));
			const m = r / d,
				v = o / _,
				g = l / p,
				y = f / p,
				w = Q(u / p, -1, 1),
				b = Math.asin(w),
				M = Math.cos(b);
			let A, C;
			Math.abs(M) > 1e-6
				? ((A = Math.atan2(-g, y)), (C = Math.atan2(-v, m)))
				: ((A = Math.atan2(t[6] / _, t[5] / _)), (C = 0));
			const x = this.kr(A + Math.PI),
				S = this.kr(Math.PI - b),
				E = this.kr(C + Math.PI),
				T = Math.abs(this.kr(A - i)) + Math.abs(this.kr(b - e)) + Math.abs(this.kr(C - s));
			Math.abs(this.kr(x - i)) + Math.abs(this.kr(S - e)) + Math.abs(this.kr(E - s)) < T
				? ((this.ur = x), (this.lr = S), (this.dr = E))
				: ((this.ur = A), (this.lr = b), (this.dr = C));
		}
		kr(t) {
			let i = (t + Math.PI) % (2 * Math.PI);
			return (i < 0 && (i += 2 * Math.PI), i - Math.PI);
		}
		Dr(t) {
			if (16 !== t.length) return !1;
			if (Math.abs(t[3]) > 1e-6 || Math.abs(t[7]) > 1e-6 || Math.abs(t[11]) > 1e-6 || Math.abs(t[15] - 1) > 1e-6)
				return !1;
			const i = t[0],
				e = t[1],
				s = t[2],
				r = t[4],
				n = t[5],
				h = t[6],
				o = t[8],
				a = t[9],
				c = t[10],
				u = Math.hypot(i, e, s),
				l = Math.hypot(r, n, h),
				f = Math.hypot(o, a, c);
			if (u < 1e-6 || l < 1e-6 || f < 1e-6) return !1;
			const d = i / u,
				_ = e / u,
				p = s / u,
				m = r / l,
				v = n / l,
				g = h / l,
				y = o / f,
				w = a / f,
				b = c / f,
				M = d * m + _ * v + p * g,
				A = d * y + _ * w + p * b,
				C = m * y + v * w + g * b;
			return Math.abs(M) < 1e-4 && Math.abs(A) < 1e-4 && Math.abs(C) < 1e-4;
		}
	},
	kt = (Math.PI / 180) * 28.072486935852957,
	Ot = class {
		_e = !1;
		Or = 0;
		Br = 0;
		se = kt;
		fe = 0.1;
		de = 4096;
		ee = !0;
		re = 0;
		ne = 0;
		he = 0;
		Ki = 0;
		Wi = 0;
		qi = 0;
		Ji = 0;
		te = 1;
		ie = 0;
		wr(t) {
			((t._e = this._e),
				(t.Or = this.Or),
				(t.Br = this.Br),
				(t.se = this.se),
				(t.fe = this.fe),
				(t.de = this.de),
				(t.ee = this.ee),
				(t.re = this.re),
				(t.ne = this.ne),
				(t.he = this.he),
				(t.Ki = this.Ki),
				(t.Wi = this.Wi),
				(t.qi = this.qi),
				(t.Ji = this.Ji),
				(t.te = this.te),
				(t.ie = this.ie));
		}
		br(t) {
			((this._e = t._e),
				(this.Or = t.Or),
				(this.Br = t.Br),
				(this.se = t.se),
				(this.fe = t.fe),
				(this.de = t.de),
				(this.ee = t.ee),
				(this.re = t.re),
				(this.ne = t.ne),
				(this.he = t.he),
				(this.Ki = t.Ki),
				(this.Wi = t.Wi),
				(this.qi = t.qi),
				(this.Ji = t.Ji),
				(this.te = t.te),
				(this.ie = t.ie));
		}
		Ir(t) {
			if (t) {
				if (this._e) return;
				return ((this._e = !0), void this.Or++);
			}
			this._e && ((this._e = !1), this.Or++);
		}
		me(t, i, e) {
			let s = !1;
			if (void 0 !== t) {
				const i = I(Math.max(1, Math.min(179, t)));
				this.se !== i && ((this.se = i), (s = !0));
			}
			((void 0 === i && void 0 === e) || (s = this.Nr(i, e) || s),
				this._e && ((this._e = !1), (s = !0)),
				s && this.Or++);
		}
		pe(t, i) {
			let e = !1;
			((e = this.Nr(t, i) || e), this._e || ((this._e = !0), (e = !0)), e && this.Or++);
		}
		ae(t, i, e, s = 0, r = 0, n = 0, h = 0, o = 1, a = 0) {
			(this.ee ||
				this.re !== t ||
				this.ne !== i ||
				this.he !== e ||
				this.Ki !== s ||
				this.Wi !== r ||
				this.qi !== n ||
				this.Ji !== h ||
				this.te !== o ||
				this.ie !== a) &&
				((this.ee = !1),
				(this.re = t),
				(this.ne = i),
				(this.he = e),
				(this.Ki = s),
				(this.Wi = r),
				(this.qi = n),
				(this.Ji = h),
				(this.te = o),
				(this.ie = a),
				this.Br++);
		}
		ge(t, i, e, s, r, n) {
			let h = this.Ki !== t || this.Wi !== i || this.qi !== e;
			(void 0 !== s && this.Ji !== s && ((this.Ji = s), (h = !0)),
				void 0 !== r && this.te !== r && ((this.te = r), (h = !0)),
				void 0 !== n && this.ie !== n && ((this.ie = n), (h = !0)),
				h && ((this.Ki = t), (this.Wi = i), (this.qi = e), this.Br++));
		}
		ve() {
			(this.ee &&
				0 === this.re &&
				0 === this.ne &&
				0 === this.he &&
				0 === this.Ki &&
				0 === this.Wi &&
				0 === this.qi &&
				0 === this.Ji &&
				1 === this.te &&
				0 === this.ie) ||
				((this.ee = !0),
				(this.re = 0),
				(this.ne = 0),
				(this.he = 0),
				(this.Ki = 0),
				(this.Wi = 0),
				(this.qi = 0),
				(this.Ji = 0),
				(this.te = 1),
				(this.ie = 0),
				this.Br++);
		}
		jr() {
			this._e && ((this._e = !1), this.Or++);
		}
		Nr(t, i) {
			if (void 0 === t && void 0 === i) return !1;
			const e = void 0 === t ? this.fe : Math.max(1e-4, t),
				s = e + 1e-4,
				r = void 0 === i ? Math.max(this.de, s) : Math.max(s, i);
			return (e !== this.fe || r !== this.de) && ((this.fe = e), (this.de = r), !0);
		}
	},
	Bt = 15,
	It = class {
		zr = /* @__PURE__ */ new Float32Array(3);
		Qr = 0;
		Gr = new Float32Array(Bt);
		$r = new Float32Array(Bt);
		Hr = new Float32Array([1, 0, 0]);
		Xr = !1;
		Vr = 0;
		wr(t) {
			((t.zr[0] = this.zr[0]),
				(t.zr[1] = this.zr[1]),
				(t.zr[2] = this.zr[2]),
				(t.Qr = this.Qr),
				(t.Xr = this.Xr),
				(t.Vr = this.Vr));
			for (let i = 0; i < Bt; i++) ((t.Gr[i] = this.Gr[i]), (t.$r[i] = this.$r[i]));
			((t.Hr[0] = this.Hr[0]), (t.Hr[1] = this.Hr[1]), (t.Hr[2] = this.Hr[2]));
		}
		br(t) {
			((this.zr[0] = t.zr[0]),
				(this.zr[1] = t.zr[1]),
				(this.zr[2] = t.zr[2]),
				(this.Qr = t.Qr),
				(this.Xr = t.Xr),
				(this.Vr = t.Vr));
			for (let i = 0; i < Bt; i++) ((this.Gr[i] = t.Gr[i]), (this.$r[i] = t.$r[i]));
			((this.Hr[0] = t.Hr[0]), (this.Hr[1] = t.Hr[1]), (this.Hr[2] = t.Hr[2]));
		}
		Yr(t, i, e) {
			((this.Xr = !0), (this.zr[0] += t), (this.zr[1] += i), (this.zr[2] += e), this.Vr++);
		}
		Kr(t, i, e, s, r, n) {
			if (this.Qr >= 5) return;
			this.Xr = !0;
			const h = 3 * this.Qr;
			((this.Gr[h] = s),
				(this.Gr[h + 1] = r),
				(this.Gr[h + 2] = n),
				(this.$r[h] = t),
				(this.$r[h + 1] = i),
				(this.$r[h + 2] = e),
				this.Qr++,
				this.Vr++);
		}
		Zr(t, i, e) {
			let s = Math.max(0, t);
			const r = Math.max(0, i),
				n = Math.max(0, e);
			(0 === s && 0 === r && 0 === n && (s = 1),
				(this.Hr[0] === s && this.Hr[1] === r && this.Hr[2] === n) ||
					((this.Hr[0] = s), (this.Hr[1] = r), (this.Hr[2] = n), this.Vr++));
		}
		Wr() {
			const t = 0 !== this.zr[0] || 0 !== this.zr[1] || 0 !== this.zr[2],
				i = this.Qr > 0,
				e = this.Xr || t || i,
				s = 1 !== this.Hr[0] || 0 !== this.Hr[1] || 0 !== this.Hr[2];
			if (e || s) {
				((this.Xr = !1), (this.zr[0] = 0), (this.zr[1] = 0), (this.zr[2] = 0), (this.Qr = 0));
				for (let t = 0; t < Bt; t++) ((this.Gr[t] = 0), (this.$r[t] = 0));
				((this.Hr[0] = 1), (this.Hr[1] = 0), (this.Hr[2] = 0), this.Vr++);
			}
		}
		Xe() {
			const t = 0 !== this.zr[0] || 0 !== this.zr[1] || 0 !== this.zr[2];
			if (0 !== this.Qr || t || this.Xr) {
				((this.Xr = !1), (this.zr[0] = 0), (this.zr[1] = 0), (this.zr[2] = 0), (this.Qr = 0));
				for (let t = 0; t < Bt; t++) ((this.Gr[t] = 0), (this.$r[t] = 0));
				this.Vr++;
			}
		}
	};
function Nt(t, i, e, s, r = 255) {
	((t[0] = i / 255), (t[1] = (e ?? i) / 255), (t[2] = (s ?? i) / 255), (t[3] = r / 255));
}
var jt = class {
	qr = 1;
	Jr = [1, 1, 0];
	tn = '';
	en = [1, 1, 1, 1];
	sn = [0, 0, 0, 1];
	rn = 'rgb';
	nn = Tt().maxes;
	hn = !1;
	an = !1;
	cn = !1;
	un = 0;
	Ce = [0, 0, 0, 1];
	wr(t) {
		((t.ln = this.qr),
			(t.dn = this.hn),
			(t._n = this.an),
			(t.cn = this.cn),
			(t.un = this.un),
			(t.pn[0] = this.Jr[0]),
			(t.pn[1] = this.Jr[1]),
			(t.pn[2] = this.Jr[2]),
			(t.mn = this.tn),
			(t.vn[0] = this.en[0]),
			(t.vn[1] = this.en[1]),
			(t.vn[2] = this.en[2]),
			(t.vn[3] = this.en[3]),
			(t.gn[0] = this.sn[0]),
			(t.gn[1] = this.sn[1]),
			(t.gn[2] = this.sn[2]),
			(t.gn[3] = this.sn[3]),
			(t.rn = this.rn),
			(t.nn[0] = this.nn[0]),
			(t.nn[1] = this.nn[1]),
			(t.nn[2] = this.nn[2]),
			(t.nn[3] = this.nn[3]));
	}
	br(t) {
		((this.qr = t.ln),
			(this.hn = t.dn),
			(this.an = t._n),
			(this.cn = t.cn),
			(this.un = t.un),
			(this.Jr[0] = t.pn[0]),
			(this.Jr[1] = t.pn[1]),
			(this.Jr[2] = t.pn[2]),
			(this.tn = t.mn),
			(this.en[0] = t.vn[0]),
			(this.en[1] = t.vn[1]),
			(this.en[2] = t.vn[2]),
			(this.en[3] = t.vn[3]),
			(this.sn[0] = t.gn[0]),
			(this.sn[1] = t.gn[1]),
			(this.sn[2] = t.gn[2]),
			(this.sn[3] = t.gn[3]),
			(this.rn = t.rn),
			(this.nn[0] = t.nn[0]),
			(this.nn[1] = t.nn[1]),
			(this.nn[2] = t.nn[2]),
			(this.nn[3] = t.nn[3]));
	}
	yn(t) {
		this.qr = Math.abs(t);
	}
	wn(t) {
		((this.Jr[0] = t[0]), (this.Jr[1] = t[1]), (this.Jr[2] = t[2]));
	}
	bn(t) {
		this.tn = t;
	}
	Mn(t, i, e, s = 255) {
		Nt(this.en, t, i, e, s);
	}
	An(t, i, e, s = 255) {
		Nt(this.sn, t, i, e, s);
	}
	Cn(t) {
		this.hn = t;
	}
	xn(t) {
		this.an = t;
	}
	Sn(t) {
		this.cn = t;
	}
	En(t) {
		this.un = Z(t);
	}
	Tn(t, i, e, s) {
		Nt(this.Ce, t, i, e, s);
	}
	Fn() {
		((this.Ce[0] = 0), (this.Ce[1] = 0), (this.Ce[2] = 0), (this.Ce[3] = 0));
	}
	Pn() {
		return { mode: this.rn, maxes: [this.nn[0], this.nn[1], this.nn[2], this.nn[3]] };
	}
	Ln(t, i) {
		((this.rn = t), (this.nn[0] = i[0]), (this.nn[1] = i[1]), (this.nn[2] = i[2]), (this.nn[3] = i[3]));
	}
};
function zt(t, i) {
	((t[0] = i[0]), (t[1] = i[1]), (t[2] = i[2]), (t[3] = i[3]));
}
function Qt(t, i) {
	if ('none' === i.kind) return ((t.kind = 'none'), (t.source = null), void (t.framebuffer = null));
	if ('source' === i.kind) {
		const e = t;
		return (
			(e.kind = 'source'),
			(e.source = i.source),
			(e.palette = i.palette),
			(e.brightnessStart = i.brightnessStart),
			(e.brightnessEnd = i.brightnessEnd),
			(e.invert = i.invert),
			(e.flipX = i.flipX),
			(e.flipY = i.flipY),
			(e.charRotation = i.charRotation),
			(e.charColorMode = i.charColorMode),
			(e.cellColorMode = i.cellColorMode),
			(e.charColor ??= [1, 1, 1, 1]),
			(e.cellColor ??= [0, 0, 0, 1]),
			zt(e.charColor, i.charColor),
			void zt(e.cellColor, i.cellColor)
		);
	}
	const e = t;
	((e.kind = 'framebuffer'),
		(e.framebuffer = i.framebuffer),
		(e.textures ??= []),
		(e.textures.length = i.textures.length));
	for (let s = 0; s < i.textures.length; s++) e.textures[s] = i.textures[s];
	((e.width = i.width), (e.height = i.height), (e.attachmentCount = i.attachmentCount));
}
var Gt = class {
		Dn = {
			kind: 'source',
			source: null,
			palette: null,
			brightnessStart: 0,
			brightnessEnd: 1,
			invert: !1,
			flipX: !1,
			flipY: !1,
			charRotation: 0,
			charColorMode: 'sampled',
			cellColorMode: 'fixed',
			charColor: [1, 1, 1, 1],
			cellColor: [0, 0, 0, 1],
		};
		Rn = 0;
		constructor() {
			((this.Dn.kind = 'none'), (this.Dn.source = null), (this.Dn.framebuffer = null));
		}
		kn(t) {
			(Qt(this.Dn, t), this.Rn++);
		}
		On(t) {
			const i = this.Dn;
			((i.kind = 'framebuffer'),
				(i.framebuffer = t),
				(i.textures ??= []),
				(i.textures.length = t.textures.length));
			for (let e = 0; e < t.textures.length; e++) i.textures[e] = t.textures[e];
			((i.width = t.width), (i.height = t.height), (i.attachmentCount = t.attachmentCount), this.Rn++);
		}
		Bn() {
			'none' !== this.Dn.kind &&
				((this.Dn.kind = 'none'), (this.Dn.source = null), (this.Dn.framebuffer = null), this.Rn++);
		}
		wr(t) {
			((t.In = this.Rn), Qt(t.Nn, this.Dn));
		}
		br(t) {
			((this.Rn = t.In), Qt(this.Dn, t.Nn));
		}
		get current() {
			return this.Dn;
		}
	},
	$t = class t {
		jn = new Rt();
		Zi = new Ot();
		Ve = new It();
		pn = new jt();
		zn = new Gt();
		Qn = [];
		Gn = [];
		static $n() {
			return {
				ln: 1,
				hr: 0,
				ar: 0,
				cr: 0,
				ur: 0,
				lr: 0,
				dr: 0,
				_r: 1,
				pr: 1,
				mr: 1,
				vr: W(),
				un: 0,
				dn: !1,
				_n: !1,
				cn: !1,
				_e: !1,
				Or: 0,
				Br: 0,
				se: kt,
				fe: 0.1,
				de: 4096,
				ee: !0,
				re: 0,
				ne: 0,
				he: 0,
				Ki: 0,
				Wi: 0,
				qi: 0,
				Ji: 0,
				te: 1,
				ie: 0,
				Qr: 0,
				Gr: new Float32Array(15),
				$r: new Float32Array(15),
				zr: /* @__PURE__ */ new Float32Array(3),
				Hr: new Float32Array([1, 0, 0]),
				Xr: !1,
				Vr: 0,
				In: 0,
				Nn: {
					kind: 'source',
					source: null,
					palette: null,
					brightnessStart: 0,
					brightnessEnd: 1,
					invert: !1,
					flipX: !1,
					flipY: !1,
					charRotation: 0,
					charColorMode: 'sampled',
					cellColorMode: 'fixed',
					charColor: [1, 1, 1, 1],
					cellColor: [0, 0, 0, 1],
				},
				pn: [1, 1, 0],
				mn: '',
				vn: [1, 1, 1, 1],
				gn: [0, 0, 0, 1],
				rn: Tt().mode,
				nn: Tt().maxes,
			};
		}
		Hn(t) {
			(this.jn.wr(t), this.Zi.wr(t), this.Ve.wr(t), this.pn.wr(t), this.zn.wr(t));
		}
		Xn(t) {
			(this.jn.br(t), this.Zi.br(t), this.Ve.br(t), this.pn.br(t), this.zn.br(t));
		}
		Vn(t) {
			this.Xn(t);
		}
		Is() {
			let i = this.Gn.pop();
			(i || (i = t.$n()), this.Hn(i), this.Qn.push(i));
		}
		Ns() {
			const t = this.Qn.pop();
			t ? (this.Xn(t), this.Gn.push(t)) : console.warn('pop() called without matching push()');
		}
		Ye() {
			(this.jn.Pr(), this.Zi.jr());
		}
	},
	Ht = /* @__PURE__ */ (function (t) {
		return (
			(t.RECTANGLE = 'rectangle'),
			(t.LINE = 'line'),
			(t.ELLIPSE = 'ellipse'),
			(t.ARC = 'arc'),
			(t.BEZIER_CURVE = 'bezier_curve'),
			(t.BOX = 'box'),
			(t.SPHERE = 'sphere'),
			(t.TORUS = 'torus'),
			(t.CONE = 'cone'),
			(t.CYLINDER = 'cylinder'),
			(t.ELLIPSOID = 'ellipsoid'),
			t
		);
	})({}),
	Xt = {
		rectangle: 2,
		line: 2,
		ellipse: 2,
		arc: 3,
		bezier_curve: 4,
		box: 5,
		sphere: 6,
		torus: 7,
		cone: 8,
		cylinder: 9,
		ellipsoid: 6,
	},
	Vt = new Float32Array([
		-0.5, -0.5, 0, 0, 0.5, -0.5, 1, 0, -0.5, 0.5, 0, 1, -0.5, 0.5, 0, 1, 0.5, -0.5, 1, 0, 0.5, 0.5, 1, 1,
	]),
	Yt = { Yn: 16, Kn: { Zn: { size: 2, offset: 0 }, Wn: { size: 2, offset: 8 } } },
	Kt = { Yn: 20, Kn: { Zn: { size: 3, offset: 0 }, Wn: { size: 2, offset: 12 } } },
	Zt = { Yn: 24, Kn: { Zn: { size: 4, offset: 0 }, Wn: { size: 2, offset: 16 } } },
	Wt = class {
		As;
		qn;
		Jn;
		constructor(t) {
			((this.As = t), (this.qn = t.createBuffer()), (this.Jn = new Float32Array(Vt.length)));
		}
		th(t, i, e, s) {
			const r = this.As,
				n = Ct(this.As),
				h = n[2],
				o = n[3],
				a = (t / h) * 2 - 1,
				c = ((t + e) / h) * 2 - 1,
				u = 1 - ((i + s) / o) * 2,
				l = 1 - (i / o) * 2,
				f = Vt,
				d = this.Jn;
			for (let _ = 0; _ < f.length; _ += 4) {
				const t = f[_],
					i = f[_ + 1],
					e = f[_ + 2],
					s = f[_ + 3],
					r = a + (t + 0.5) * (c - a),
					n = u + (i + 0.5) * (l - u);
				((d[_] = r), (d[_ + 1] = n), (d[_ + 2] = e), (d[_ + 3] = s));
			}
			(r.bindBuffer(r.ARRAY_BUFFER, this.qn),
				r.bufferData(r.ARRAY_BUFFER, d, r.DYNAMIC_DRAW),
				mt(r, 0, 2, 16, 0),
				mt(r, 1, 2, 16, 8),
				r.drawArrays(r.TRIANGLES, 0, 6),
				r.disableVertexAttribArray(1),
				r.disableVertexAttribArray(0),
				r.bindBuffer(r.ARRAY_BUFFER, null));
		}
		L() {
			this.As.deleteBuffer(this.qn);
		}
	},
	qt = class {
		As;
		ih = /* @__PURE__ */ new Map();
		eh = null;
		constructor(t) {
			this.As = t;
		}
		sh(t) {
			const { shader: i, geometryKey: e, unit: s, geometryBuffer: r, indexBuffer: n, instanceAttributes: h } = t,
				o = this.As,
				a = i.program;
			let c = this.ih.get(i);
			c || ((c = /* @__PURE__ */ new Map()), this.ih.set(i, c), i.k(() => this.rh(i)));
			let u = c.get(e);
			if (
				(u &&
					u.instanceBufferVersion !== h.nh &&
					(u.vao && (o.deleteVertexArray(u.vao), this.eh === u.vao && (this.eh = null)),
					c.delete(e),
					(u = void 0)),
				u)
			)
				this.eh !== u.vao && (o.bindVertexArray(u.vao), (this.eh = u.vao));
			else {
				const t = o.createVertexArray();
				((u = { vao: t, instanceBufferVersion: h.nh }),
					c.set(e, u),
					o.bindVertexArray(t),
					(this.eh = t),
					o.bindBuffer(o.ARRAY_BUFFER, r),
					n && o.bindBuffer(o.ELEMENT_ARRAY_BUFFER, n));
				const l = o.getAttribLocation(a, 'a_position');
				-1 !== l && mt(o, l, s.Kn.Zn.size, s.Yn, s.Kn.Zn.offset, 0, o.FLOAT, !1);
				const f = o.getAttribLocation(a, 'a_texCoord');
				(-1 !== f && mt(o, f, s.Kn.Wn.size, s.Yn, s.Kn.Wn.offset, 0, o.FLOAT, !1), h.hh(i));
			}
		}
		rh(t) {
			const i = this.ih.get(t);
			if (i) {
				for (const [, t] of i) t.vao && this.As.deleteVertexArray(t.vao);
				this.ih.delete(t);
			}
		}
		oh() {
			null !== this.eh && (this.As.bindVertexArray(null), (this.eh = null));
		}
		L() {
			for (const [, t] of this.ih) for (const [, i] of t) i.vao && this.As.deleteVertexArray(i.vao);
			this.ih.clear();
		}
	},
	Jt = class {
		static BYTES_PER_INSTANCE = 144;
		static FLOATS_PER_INSTANCE = 36;
	};
function ti(t, i) {
	return { location: -1, size: t, stride: Jt.BYTES_PER_INSTANCE, offset: i, divisor: 1 };
}
var ii = class {
		static STRIDE = Jt.BYTES_PER_INSTANCE;
		static ATTRIBUTES = {
			A7: ti(2, 0),
			A9: ti(2, 8),
			A6: ti(3, 16),
			A4: ti(4, 28),
			A0: ti(4, 44),
			A5: ti(4, 60),
			Aa: ti(3, 76),
			A8: ti(3, 88),
			A2: ti(4, 100),
			A3: ti(4, 116),
			A1: ti(3, 132),
		};
	},
	ei = class {
		ah;
		uh;
		fh;
		dh = 0;
		_h = 0;
		constructor(t = 1e3, i = 1.5) {
			((this.uh = t), (this.fh = i));
			const e = t * Jt.FLOATS_PER_INSTANCE;
			this.ah = new Float32Array(e);
		}
		ph(t) {
			if (t <= this.uh) return;
			const i = Math.ceil(t * this.fh),
				e = this.uh;
			this.uh = i;
			const s = new Float32Array(i * Jt.FLOATS_PER_INSTANCE),
				r = e * Jt.FLOATS_PER_INSTANCE;
			(s.set(this.ah.subarray(0, Math.min(r, this.dh))), (this.ah = s));
		}
		mh(t) {
			((this.dh += t), this._h++);
		}
		gh() {
			((this.dh = 0), (this._h = 0));
		}
		yh(t = 0, i) {
			return this.ah.subarray(t, i ?? this.dh);
		}
	};
function si(t, i) {
	return {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		char0: 0,
		char1: 0,
		char2: 0,
		r1: 0,
		g1: 0,
		b1: 0,
		a1: 0,
		r2: 0,
		g2: 0,
		b2: 0,
		a2: 0,
		invert: 0,
		flipX: 0,
		flipY: 0,
		charRot: 0,
		translationX: 0,
		translationY: 0,
		translationZ: 0,
		rotationX: 0,
		rotationY: 0,
		rotationZ: 0,
		curveParams0: t,
		curveParams1: i,
		depth: 0,
		baseZ: 0,
		geometryType: 0,
	};
}
var ri = class {
		ah;
		constructor(t) {
			this.ah = t;
		}
		wh(t) {
			this.ah._h >= this.ah.uh && this.ah.ph(this.ah._h + 1);
			const i = this.ah.ah,
				e = this.ah.dh;
			((i[e + 0] = t.x),
				(i[e + 1] = t.y),
				(i[e + 2] = t.width),
				(i[e + 3] = t.height),
				(i[e + 4] = t.char0),
				(i[e + 5] = t.char1),
				(i[e + 6] = t.char2),
				(i[e + 7] = t.r1),
				(i[e + 8] = t.g1),
				(i[e + 9] = t.b1),
				(i[e + 10] = t.a1),
				(i[e + 11] = t.r2),
				(i[e + 12] = t.g2),
				(i[e + 13] = t.b2),
				(i[e + 14] = t.a2),
				(i[e + 15] = t.invert),
				(i[e + 16] = t.flipX),
				(i[e + 17] = t.flipY),
				(i[e + 18] = t.charRot),
				(i[e + 19] = t.translationX),
				(i[e + 20] = t.translationY),
				(i[e + 21] = t.translationZ),
				(i[e + 22] = t.rotationX),
				(i[e + 23] = t.rotationY),
				(i[e + 24] = t.rotationZ));
			const s = t.curveParams0,
				r = t.curveParams1;
			return (
				(i[e + 25] = s[0]),
				(i[e + 26] = s[1]),
				(i[e + 27] = s[2]),
				(i[e + 28] = s[3]),
				(i[e + 29] = r[0]),
				(i[e + 30] = r[1]),
				(i[e + 31] = r[2]),
				(i[e + 32] = r[3]),
				(i[e + 33] = t.depth),
				(i[e + 34] = t.baseZ),
				(i[e + 35] = t.geometryType),
				this.ah.mh(Jt.FLOATS_PER_INSTANCE),
				this.ah._h - 1
			);
		}
	},
	ni = class {
		As;
		bh = null;
		Mh = 0;
		Ah = /* @__PURE__ */ new WeakMap();
		Rn = 0;
		constructor(t, i = 1e3) {
			((this.As = t), this.Ch(i));
		}
		Ch(t) {
			const i = this.As;
			(this.bh && i.deleteBuffer(this.bh), this.Rn++, (this.bh = i.createBuffer()));
			const e = t * Jt.BYTES_PER_INSTANCE;
			(vt(i, i.ARRAY_BUFFER, this.bh, e, i.DYNAMIC_DRAW), (this.Mh = t));
		}
		xh(t) {
			this.Ch(t);
		}
		W(t, i) {
			if (0 === i) return;
			const e = this.As;
			(e.bindBuffer(e.ARRAY_BUFFER, this.bh), e.bufferSubData(e.ARRAY_BUFFER, 0, t, 0, i));
		}
		get nh() {
			return this.Rn;
		}
		Sh(t) {
			let i = this.Ah.get(t);
			if (!i) {
				i = /* @__PURE__ */ new Map();
				const e = this.As;
				for (const s in ii.ATTRIBUTES) {
					const r = s,
						n = e.getAttribLocation(t, r);
					-1 !== n && i.set(r, n);
				}
				this.Ah.set(t, i);
			}
			return i;
		}
		hh(t) {
			const i = this.As,
				e = t.program,
				s = this.Sh(e);
			i.bindBuffer(i.ARRAY_BUFFER, this.bh);
			for (const [r, n] of s) {
				const t = ii.ATTRIBUTES[r];
				t && mt(i, n, t.size, t.stride, t.offset, t.divisor);
			}
		}
		L() {
			this.bh && (this.As.deleteBuffer(this.bh), (this.bh = null));
		}
	},
	hi = class {
		As;
		ah;
		Eh;
		Th;
		constructor(t, i = 1e3, e = 1.5) {
			((this.As = t), (this.ah = new ei(i, e)), (this.Eh = new ri(this.ah)), (this.Th = new ni(t, i)));
		}
		Fh() {
			this.ah.uh > this.Th.Mh && this.Th.xh(this.ah.uh);
		}
		get writer() {
			return this.Eh;
		}
		get Ph() {
			return this.Th;
		}
		Lh() {
			this.ah.gh();
		}
		Dh(t, i) {
			if (0 === i) return;
			const e = i * Jt.FLOATS_PER_INSTANCE;
			this.ah.ph(this.ah._h + i);
			const s = this.ah.ah,
				r = this.ah.dh;
			for (let n = 0; n < e; n++) s[r + n] = t[n];
			((this.ah.dh += e), (this.ah._h += i));
		}
		Rh() {
			0 !== this.ah._h && (this.Fh(), this.Th.W(this.ah.ah, this.ah.dh));
		}
		th(t, i) {
			const e = this.ah._h;
			0 !== e && this.As.drawArraysInstanced(t, 0, i, e);
		}
		kh(t, i, e, s = 0) {
			const r = this.ah._h;
			0 !== r && this.As.drawElementsInstanced(t, i, e, s, r);
		}
		L() {
			this.Th.L();
		}
	},
	oi = class {
		As;
		Oh;
		Bh;
		Ih;
		Nh = null;
		jh = null;
		zh = [0, 0, 0, 0];
		Qh = [0, 0, 0, 0];
		Gh;
		constructor(t, i, e, s) {
			((this.As = t), (this.Oh = i), (this.Bh = e), (this.Ih = s), (this.Gh = si(this.zh, this.Qh)));
			const r = this.As.createBuffer();
			if ((vt(this.As, this.As.ARRAY_BUFFER, r, this.Ih.$h, this.As.STATIC_DRAW), (this.Nh = r), this.Ih.Hh)) {
				const t = this.As.createBuffer();
				(vt(this.As, this.As.ELEMENT_ARRAY_BUFFER, t, this.Ih.Hh, this.As.STATIC_DRAW), (this.jh = t));
			}
		}
		get type() {
			return this.Bh;
		}
		get unitGeometry() {
			return this.Ih;
		}
		get unitBuffer() {
			return this.Nh;
		}
		get unitIndexBuffer() {
			return this.jh;
		}
		get batch() {
			return this.Oh;
		}
		Xh() {
			this.Oh.Lh();
		}
		Vh() {
			return 0 !== this.Oh.ah._h;
		}
		L() {
			(this.Oh.L(), this.As.deleteBuffer(this.Nh), this.jh && this.As.deleteBuffer(this.jh));
		}
		wh(t, i, e, s, r, n, h) {
			const o = r.hr ?? 0,
				a = r.ar ?? 0,
				c = r.cr ?? 0,
				u = r.ur ?? 0,
				l = r.lr ?? 0,
				f = h ?? r.dr ?? 0,
				d = r._r ?? 1,
				_ = r.pr ?? 1,
				p = r.mr ?? 1,
				m = this.zh,
				v = this.Qh;
			((m[0] = 0),
				(m[1] = 0),
				(m[2] = 0),
				(m[3] = 0),
				(v[0] = 0),
				(v[1] = 0),
				(v[2] = 0),
				(v[3] = 0),
				n &&
					(void 0 !== n.bezStartX && void 0 !== n.bezStartY && void 0 !== n.bezEndX && void 0 !== n.bezEndY
						? ((m[0] = n.cp1x ?? 0),
							(m[1] = n.cp1y ?? 0),
							(m[2] = n.cp2x ?? 0),
							(m[3] = n.cp2y ?? 0),
							(v[0] = n.bezStartX ?? 0),
							(v[1] = n.bezStartY ?? 0),
							(v[2] = n.bezEndX ?? 0),
							(v[3] = n.bezEndY ?? 0))
						: (void 0 === n.arcStart && void 0 === n.arcStop) ||
							((m[0] = n.arcStart ?? 0), (m[1] = n.arcStop ?? 0))));
			const g = this.Gh;
			return (
				(g.x = t * d),
				(g.y = i * _),
				(g.width = e * d),
				(g.height = s * _),
				(g.char0 = r.pn[0]),
				(g.char1 = r.pn[1]),
				(g.char2 = r.pn[2]),
				(g.r1 = r.vn[0]),
				(g.g1 = r.vn[1]),
				(g.b1 = r.vn[2]),
				(g.a1 = r.vn[3]),
				(g.r2 = r.gn[0]),
				(g.g2 = r.gn[1]),
				(g.b2 = r.gn[2]),
				(g.a2 = r.gn[3]),
				(g.invert = r.cn ? 1 : 0),
				(g.flipX = r.dn ? 1 : 0),
				(g.flipY = r._n ? 1 : 0),
				(g.charRot = r.un),
				(g.translationX = o),
				(g.translationY = a),
				(g.translationZ = c),
				(g.rotationX = u),
				(g.rotationY = l),
				(g.rotationZ = f),
				(g.depth = (n?.depth ?? 0) * p),
				(g.baseZ = (n?.baseZ ?? 0) * p),
				(g.geometryType = Xt[this.Bh] ?? 0),
				this.Oh.writer.wh(g)
			);
		}
	},
	ai = { $h: Vt, Yh: 6, ...Yt },
	ci = class extends oi {
		constructor(t, i) {
			super(t, i, Ht.RECTANGLE, ai);
		}
		Kh(t, i) {
			return this.wh(0, 0, t.width, t.height, i);
		}
	},
	ui = {
		$h: new Float32Array([0, -0.5, 0, 0, 1, -0.5, 1, 0, 0, 0.5, 0, 1, 0, 0.5, 0, 1, 1, -0.5, 1, 0, 1, 0.5, 1, 1]),
		Yh: 6,
		...Yt,
	},
	li = class extends oi {
		constructor(t, i) {
			super(t, i, Ht.LINE, ui);
		}
		Kh(t, i) {
			const e = t.x2 - t.x1,
				s = t.y2 - t.y1,
				r = Math.hypot(e, s),
				n = Math.atan2(s, e),
				h = i.ln || 1,
				o = Math.cos(-n),
				a = Math.sin(-n),
				c = t.x1 * o - t.y1 * a,
				u = t.x1 * a + t.y1 * o;
			return this.wh(c, u, r, h, i, null, (i.dr || 0) + n);
		}
	},
	fi = {
		$h: (function (t = 32) {
			const i = [],
				e = (2 * Math.PI) / t;
			for (let s = 0; s < t; s++) {
				const r = s * e,
					n = ((s + 1) % t) * e,
					h = Math.cos(r),
					o = Math.sin(r),
					a = 0.5 * (h + 1),
					c = 0.5 * (o + 1),
					u = Math.cos(n),
					l = Math.sin(n),
					f = 0.5 * (u + 1),
					d = 0.5 * (l + 1);
				i.push(0, 0, 0.5, 0.5, h, o, a, c, u, l, f, d);
			}
			return new Float32Array(i);
		})(32),
		Yh: 96,
		...Yt,
	},
	di = class extends oi {
		constructor(t, i) {
			super(t, i, Ht.ELLIPSE, fi);
		}
		Kh(t, i) {
			return this.wh(0, 0, t.width, t.height, i);
		}
	},
	_i = {
		$h: (function () {
			const t = [];
			for (let i = 0; i < 32; i++) {
				const e = i / 32,
					s = (i + 1) / 32;
				t.push(e, 0, e, 0, e, 1, e, 1, s, 1, s, 1);
			}
			return new Float32Array(t);
		})(),
		Yh: 96,
		...Yt,
	},
	pi = class extends oi {
		constructor(t, i) {
			super(t, i, Ht.ARC, _i);
		}
		Kh(t, i) {
			const e = I(t.start),
				s = I(t.stop);
			return this.wh(0, 0, t.width, t.height, i, { arcStart: e, arcStop: s });
		}
	},
	mi = {
		$h: (function (t = 16) {
			const i = [];
			for (let e = 0; e < t; e++) {
				const s = e / t,
					r = (e + 1) / t;
				i.push(s, -0.5, s, 0, r, -0.5, r, 0, s, 0.5, s, 1, s, 0.5, s, 1, r, -0.5, r, 0, r, 0.5, r, 1);
			}
			return new Float32Array(i);
		})(16),
		Yh: 96,
		...Yt,
	},
	vi = class extends oi {
		constructor(t, i) {
			super(t, i, Ht.BEZIER_CURVE, mi);
		}
		Kh(t, i) {
			return this.wh(0, 0, 1, i.ln || 1, i, {
				cp1x: t.cp1x,
				cp1y: t.cp1y,
				cp2x: t.cp2x,
				cp2y: t.cp2y,
				bezStartX: t.x1,
				bezStartY: t.y1,
				bezEndX: t.x2,
				bezEndY: t.y2,
			});
		}
	},
	gi = class extends oi {
		constructor(t, i, e, s) {
			super(
				t,
				i,
				e,
				(function (t, i) {
					const e = t === Ht.TORUS ? Zt : Kt;
					return {
						$h: i.vertices,
						Hh: i.indices,
						Yh: i.vertices.length / (e.Yn / 4),
						Zh: i.indices.length,
						...e,
					};
				})(e, s)
			);
		}
		Kh(t, i) {
			return this.wh(0, 0, t.width, t.height, i, { depth: t.depth });
		}
	},
	yi = { $h: /* @__PURE__ */ new Float32Array(0), Yh: 0, ...Yt },
	wi = class {
		As;
		ah;
		Oh;
		Ih = { ...yi };
		Wh = [0, 0, 0, 0];
		qh = [0, 0, 0, 0];
		Jh;
		io = 1;
		eo = 0;
		constructor(t) {
			((this.As = t), (this.ah = t.createBuffer()), (this.Oh = new hi(t, 1)), (this.Jh = si(this.Wh, this.qh)));
		}
		th(t, i, e, s, r) {
			0 !== e &&
				(this.so(i, e),
				this.wh(s),
				this.Oh.Rh(),
				r.sh({
					shader: t,
					geometryKey: `custom_shape:${this.io}`,
					unit: this.Ih,
					geometryBuffer: this.ah,
					instanceAttributes: this.Oh.Ph,
				}),
				this.Oh.th(this.As.TRIANGLES, e),
				this.Oh.Lh());
		}
		L() {
			(this.Oh.L(), this.As.deleteBuffer(this.ah));
		}
		so(t, i) {
			const e = 4 * i;
			(e > this.eo && ((this.eo = e), this.io++),
				(this.Ih.Yh = i),
				this.As.bindBuffer(this.As.ARRAY_BUFFER, this.ah),
				this.As.bufferData(this.As.ARRAY_BUFFER, t.subarray(0, e), this.As.DYNAMIC_DRAW));
		}
		wh(t) {
			this.Oh.Lh();
			const i = this.Jh;
			((i.x = 0),
				(i.y = 0),
				(i.width = t._r ?? 1),
				(i.height = t.pr ?? 1),
				(i.char0 = t.pn[0]),
				(i.char1 = t.pn[1]),
				(i.char2 = t.pn[2]),
				(i.r1 = t.vn[0]),
				(i.g1 = t.vn[1]),
				(i.b1 = t.vn[2]),
				(i.a1 = t.vn[3]),
				(i.r2 = t.gn[0]),
				(i.g2 = t.gn[1]),
				(i.b2 = t.gn[2]),
				(i.a2 = t.gn[3]),
				(i.invert = t.cn ? 1 : 0),
				(i.flipX = t.dn ? 1 : 0),
				(i.flipY = t._n ? 1 : 0),
				(i.charRot = t.un),
				(i.translationX = t.hr ?? 0),
				(i.translationY = t.ar ?? 0),
				(i.translationZ = t.cr ?? 0),
				(i.rotationX = t.ur ?? 0),
				(i.rotationY = t.lr ?? 0),
				(i.rotationZ = t.dr ?? 0),
				(i.depth = t.mr ?? 1),
				(i.baseZ = 0),
				(i.geometryType = 10),
				this.Oh.writer.wh(i));
		}
	},
	bi = {
		vertices: new Float32Array([
			-0.5, -0.5, 0.5, 0, 0, 0.5, -0.5, 0.5, 1, 0, 0.5, 0.5, 0.5, 1, 1, -0.5, 0.5, 0.5, 0, 1, 0.5, -0.5, -0.5, 0,
			0, -0.5, -0.5, -0.5, 1, 0, -0.5, 0.5, -0.5, 1, 1, 0.5, 0.5, -0.5, 0, 1, -0.5, -0.5, -0.5, 0, 0, -0.5, -0.5,
			0.5, 1, 0, -0.5, 0.5, 0.5, 1, 1, -0.5, 0.5, -0.5, 0, 1, 0.5, -0.5, 0.5, 0, 0, 0.5, -0.5, -0.5, 1, 0, 0.5,
			0.5, -0.5, 1, 1, 0.5, 0.5, 0.5, 0, 1, -0.5, 0.5, 0.5, 0, 0, 0.5, 0.5, 0.5, 1, 0, 0.5, 0.5, -0.5, 1, 1, -0.5,
			0.5, -0.5, 0, 1, -0.5, -0.5, -0.5, 0, 0, 0.5, -0.5, -0.5, 1, 0, 0.5, -0.5, 0.5, 1, 1, -0.5, -0.5, 0.5, 0, 1,
		]),
		indices: new Uint16Array([
			0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20,
			21, 22, 20, 22, 23,
		]),
	},
	Mi = (function (t = 12, i = 16) {
		const e = [],
			s = [];
		for (let n = 0; n <= t; n++) {
			const s = n / t,
				r = s * Math.PI,
				h = Math.sin(r),
				o = Math.cos(r);
			for (let t = 0; t <= i; t++) {
				const r = t / i,
					n = r * Math.PI * 2,
					a = Math.sin(n),
					c = Math.cos(n) * h * 0.5,
					u = 0.5 * o,
					l = a * h * 0.5;
				e.push(c, u, l, r, s);
			}
		}
		const r = i + 1;
		for (let n = 0; n < t; n++)
			for (let t = 0; t < i; t++) {
				const i = n * r + t,
					e = i + r;
				s.push(i, e, i + 1, i + 1, e, e + 1);
			}
		return { vertices: new Float32Array(e), indices: new Uint16Array(s) };
	})(14, 20),
	Ai = (function (t = 16, i = 12) {
		const e = [],
			s = [];
		for (let n = 0; n <= t; n++) {
			const s = (n / t) * Math.PI * 2,
				r = Math.cos(s),
				h = Math.sin(s);
			for (let o = 0; o <= i; o++) {
				const s = (o / i) * Math.PI * 2,
					a = Math.cos(s),
					c = Math.sin(s);
				e.push(r, h, a, c, n / t, o / i);
			}
		}
		const r = i + 1;
		for (let n = 0; n < t; n++)
			for (let t = 0; t < i; t++) {
				const i = n * r + t,
					e = (n + 1) * r + t;
				s.push(i, e, i + 1, i + 1, e, e + 1);
			}
		return { vertices: new Float32Array(e), indices: new Uint16Array(s) };
	})(20, 16),
	Ci = (function (t = 20) {
		const i = [],
			e = [];
		for (let s = 0; s < t; s++) {
			const r = s / t,
				n = (s + 1) / t,
				h = r * Math.PI * 2,
				o = n * Math.PI * 2,
				a = i.length / 5;
			(i.push(
				0,
				0.5,
				0,
				0.5 * (r + n),
				1,
				0.5 * Math.cos(h),
				-0.5,
				0.5 * Math.sin(h),
				r,
				0,
				0.5 * Math.cos(o),
				-0.5,
				0.5 * Math.sin(o),
				n,
				0,
				0,
				-0.5,
				0,
				0.5,
				0.5
			),
				e.push(a, a + 1, a + 2, a + 3, a + 2, a + 1));
		}
		return { vertices: new Float32Array(i), indices: new Uint16Array(e) };
	})(24),
	xi = (function (t = 24) {
		const i = [],
			e = [];
		for (let s = 0; s < t; s++) {
			const r = s / t,
				n = (s + 1) / t,
				h = r * Math.PI * 2,
				o = n * Math.PI * 2,
				a = 0.5 * Math.cos(h),
				c = 0.5 * Math.sin(h),
				u = 0.5 * Math.cos(o),
				l = 0.5 * Math.sin(o),
				f = i.length / 5;
			(i.push(a, 0.5, c, r, 1, a, -0.5, c, r, 0, u, 0.5, l, n, 1, u, -0.5, l, n, 0),
				e.push(f, f + 1, f + 2, f + 2, f + 1, f + 3));
			const d = i.length / 5;
			(i.push(
				0,
				0.5,
				0,
				0.5,
				0.5,
				u,
				0.5,
				l,
				u + 0.5,
				l + 0.5,
				a,
				0.5,
				c,
				a + 0.5,
				c + 0.5,
				0,
				-0.5,
				0,
				0.5,
				0.5,
				a,
				-0.5,
				c,
				a + 0.5,
				c + 0.5,
				u,
				-0.5,
				l,
				u + 0.5,
				l + 0.5
			),
				e.push(d, d + 1, d + 2, d + 3, d + 4, d + 5));
		}
		return { vertices: new Float32Array(i), indices: new Uint16Array(e) };
	})(24),
	Si = {
		[Ht.RECTANGLE]: (t, i) => new ci(t, i),
		[Ht.LINE]: (t, i) => new li(t, i),
		[Ht.ELLIPSE]: (t, i) => new di(t, i),
		[Ht.ARC]: (t, i) => new pi(t, i),
		[Ht.BEZIER_CURVE]: (t, i) => new vi(t, i),
		[Ht.BOX]: (t, i) => new gi(t, i, Ht.BOX, bi),
		[Ht.SPHERE]: (t, i) => new gi(t, i, Ht.SPHERE, Mi),
		[Ht.TORUS]: (t, i) => new gi(t, i, Ht.TORUS, Ai),
		[Ht.CONE]: (t, i) => new gi(t, i, Ht.CONE, Ci),
		[Ht.CYLINDER]: (t, i) => new gi(t, i, Ht.CYLINDER, xi),
		[Ht.ELLIPSOID]: (t, i) => new gi(t, i, Ht.ELLIPSOID, Mi),
	},
	Ei = class {
		As;
		ro;
		no;
		ho;
		oo = null;
		ao = /* @__PURE__ */ new Map();
		co = null;
		uo = '';
		lo = W();
		fo = W();
		do = [0, 0, 0];
		_o = [0, 0, 0];
		po = [0, 1, 0];
		constructor(t) {
			((this.As = t), (this.no = new qt(t)), (this.ho = new wi(t)), (this.ro = /* @__PURE__ */ new Map()));
			for (const i of Object.values(Ht)) {
				const e = new hi(t),
					s = (0, Si[i])(t, e);
				this.ro.set(i, s);
			}
		}
		mo(t) {
			((this.oo = null), this.ao.clear(), (this.co = null), (this.uo = ''));
			let i = null,
				e = null,
				s = null,
				r = !1,
				n = -1,
				h = -1,
				o = -1,
				a = null;
			for (const c of t) {
				if ('custom_shape' === c.type) {
					(s && s.Vh() && this.vo(s, i, e, a),
						(i = null),
						(e = null),
						(s = null),
						(r = !1),
						(n = -1),
						(h = -1),
						(o = -1),
						(a = null),
						this.yo(c));
					continue;
				}
				const t = 'glyph_run' === c.type ? Ht.RECTANGLE : c.type;
				((i === c.material &&
					e === t &&
					r === c.state._e &&
					n === c.state.Or &&
					h === c.state.Br &&
					o === c.state.Vr) ||
					(s && s.Vh() && this.vo(s, i, e, a),
					(i = c.material),
					(e = t),
					(s = this.ro.get(e)),
					(r = c.state._e),
					(n = c.state.Or),
					(h = c.state.Br),
					(o = c.state.Vr),
					(a = c.state),
					s.Xh()),
					'glyph_run' === c.type
						? s.batch.Dh(c.params.data, c.params.instanceCount)
						: s.Kh(c.params, c.state));
			}
			(s && s.Vh() && this.vo(s, i, e, a), this.no.oh());
		}
		yo(t) {
			(this.wo(t.material, t.state),
				this.ho.th(t.material.shader, t.params.vertices, t.params.vertexCount, t.state, this.no));
		}
		vo(t, i, e, s) {
			this.wo(i, s);
			const r = t.unitGeometry,
				n = t.unitBuffer,
				h = r.bo ?? this.As.TRIANGLES;
			try {
				(t.batch.Rh(),
					this.no.sh({
						shader: i.shader,
						geometryKey: String(e),
						unit: r,
						geometryBuffer: n,
						indexBuffer: t.unitIndexBuffer,
						instanceAttributes: t.batch.Ph,
					}),
					r.Hh && r.Zh
						? t.batch.kh(h, r.Zh, r.Mo ?? this.As.UNSIGNED_SHORT, r.Ao ?? 0)
						: t.batch.th(h, r.Yh));
			} finally {
				t.Xh();
			}
		}
		wo(t, i) {
			(this.oo !== t.shader && (t.shader.er(), (this.oo = t.shader)),
				this.co !== t && (t.shader.qe(t.uniforms), (this.co = t)));
			const e = Ct(this.As),
				s = `${i.Or}:${i.Br}:${i.Vr}:${e[2]}:${e[3]}`;
			if (this.ao.get(t.shader) === s) return;
			const r = `${i.Or}:${i.Br}:${e[2]}:${e[3]}`;
			(this.uo !== r && (this.Co(i, e[2], e[3]), (this.uo = r)),
				t.shader.qe({
					u_aspectRatio: e[2] / e[3],
					u_view: this.lo,
					u_proj: this.fo,
					u_tmUseLighting: i.Xr || i.Qr > 0 || 0 !== i.zr[0] || 0 !== i.zr[1] || 0 !== i.zr[2],
					u_tmAmbientLightColor: i.zr,
					u_tmPointLightCount: i.Qr,
					u_tmPointLightPositions: i.Gr,
					u_tmPointLightColors: i.$r,
					u_tmLightFalloff: i.Hr,
				}),
				this.ao.set(t.shader, s));
		}
		Co(t, i, e) {
			const s = Math.max(1, e),
				r = Math.max(1 / 4096, i / s),
				n = t.fe,
				h = t.de;
			if (
				((this._o[0] = t.Ki),
				(this._o[1] = t.Wi),
				(this._o[2] = t.qi),
				(this.po[0] = t.Ji),
				(this.po[1] = t.te),
				(this.po[2] = t.ie),
				t.ee)
			) {
				const i = (0.5 * s) / Math.tan(0.5 * t.se);
				((this.do[0] = this._o[0]),
					(this.do[1] = this._o[1]),
					(this.do[2] = this._o[2] + i),
					q(this.do, this._o, this.po, this.lo));
			} else
				((this.do[0] = t.re), (this.do[1] = t.ne), (this.do[2] = t.he), q(this.do, this._o, this.po, this.lo));
			if (t._e) {
				const t = 0.5 * i,
					e = 0.5 * s;
				return void (function (t, i, e, s, r, n, h = /* @__PURE__ */ new Float32Array(16)) {
					const o = 1 / (t - i),
						a = 1 / (e - s),
						c = 1 / (r - n);
					((h[0] = -2 * o),
						(h[1] = 0),
						(h[2] = 0),
						(h[3] = 0),
						(h[4] = 0),
						(h[5] = -2 * a),
						(h[6] = 0),
						(h[7] = 0),
						(h[8] = 0),
						(h[9] = 0),
						(h[10] = 2 * c),
						(h[11] = 0),
						(h[12] = (t + i) * o),
						(h[13] = (s + e) * a),
						(h[14] = (n + r) * c),
						(h[15] = 1));
				})(-t, t, -e, e, n, h, this.fo);
			}
			!(function (t, i, e, s, r = /* @__PURE__ */ new Float32Array(16)) {
				const n = 1 / Math.tan(0.5 * t),
					h = 1 / (e - s);
				((r[0] = n / i),
					(r[1] = 0),
					(r[2] = 0),
					(r[3] = 0),
					(r[4] = 0),
					(r[5] = n),
					(r[6] = 0),
					(r[7] = 0),
					(r[8] = 0),
					(r[9] = 0),
					(r[10] = (s + e) * h),
					(r[11] = -1),
					(r[12] = 0),
					(r[13] = 0),
					(r[14] = 2 * s * e * h),
					(r[15] = 0));
			})(t.se, r, n, h, this.fo);
		}
		L() {
			for (const t of this.ro.values()) t.L();
			(this.ro.clear(), this.ho.L(), this.no.L());
		}
	},
	Ti =
		'vec3 rotateAroundX(vec3 A,float B){float C=cos(B);float D=sin(B);return vec3(A.x,A.y*C-A.z*D,A.y*D+A.z*C);}vec3 rotateAroundY(vec3 A,float B){float C=cos(B);float D=sin(B);return vec3(A.x*C+A.z*D,A.y,-A.x*D+A.z*C);}vec3 rotateAroundZ(vec3 A,float B){float C=cos(B);float D=sin(B);return vec3(A.x*C-A.y*D,A.x*D+A.y*C,A.z);}vec3 applyRotation(vec3 A,vec3 E){vec3 F=A;if(E.z!=0.0f){F=rotateAroundZ(F,E.z);}if(E.y!=0.0f){F=rotateAroundY(F,E.y);}if(E.x!=0.0f){F=rotateAroundX(F,E.x);}return F;}',
	Fi =
		'#version 300 es\nin vec4 a_position;in vec2 a_texCoord;in vec2 A7;in vec2 A9;in vec3 A6;in vec4 A4;in vec4 A0;in vec4 A5;in vec3 Aa;in vec3 A8;in vec4 A2;in vec4 A3;in vec3 A1;uniform mat4 u_view;uniform mat4 u_proj;out vec2 v_uv;out vec2 v_textureUv;out vec3 v_glyphIndex;out vec4 v_glyphColor;out vec4 v_cellColor;out vec4 v_glyphFlags;out vec3 v_worldPosition;out vec3 v_normal;out float v_geometryType;const float A=6.28318530718f;const int B=2;const int C=3;const int D=4;const int E=5;const int F=6;const int G=7;const int H=8;const int I=9;const int J=10;\n' +
		Ti +
		'\nvec2 K(float L,vec2 M,vec2 N,vec2 O,vec2 P){float Q=1.0f-L;float R=Q*Q;float S=R*Q;float T=L*L;float U=T*L;return S*M+3.0f*R*L*N+3.0f*Q*T*O+U*P;}vec2 V(float L,vec2 M,vec2 N,vec2 O,vec2 P){float Q=1.0f-L;float R=Q*Q;float T=L*L;return-3.0f*R*M+3.0f*(R-2.0f*Q*L)*N+3.0f*(2.0f*Q*L-T)*O+3.0f*T*P;}void main(){vec2 W=a_texCoord;vec2 X=a_texCoord;v_glyphIndex=A6;v_glyphColor=A4;v_cellColor=A0;v_glyphFlags=A5;vec4 Y=A2;vec4 Z=A3;vec2 a=A9;vec2 b=A7;float c=A1.x;float d=A1.y;int e=int(A1.z);vec3 f=vec3(0.0f);if(e==D){float L=clamp(a_position.x,0.0f,1.0f);vec2 M=Z.xy;vec2 N=Y.xy;vec2 O=Y.zw;vec2 P=Z.zw;vec2 g=K(L,M,N,O,P);vec2 h=V(L,M,N,O,P);float i=length(h);vec2 j=i>0.0f?h/i:vec2(1.0f,0.0f);vec2 k=vec2(-j.y,j.x);vec2 l=g+k*a_position.y*a.y;f=vec3(l,d);}else if(e==C){float m=mod(Y.x,A);if(m<0.0f){m+=A;}float n=mod(Y.y,A);if(n<0.0f){n+=A;}float o=m-n;if(o<=0.0f){o+=A;}float p=m-a_position.x*o;vec2 q=vec2(cos(p),sin(p))*a_position.y;vec2 l=q*a+b;f=vec3(l,d);}else if(e==B){vec2 l=a_position.xy*a+b;f=vec3(l,d);}else if(e==J){vec2 l=a_position.xy*a+b;f=vec3(l,a_texCoord.x*c+d);}else if(e==G){float r=max(0.0f,a.x*0.5f);float s=max(0.0f,c*0.5f);float t=max(0.0f,a.y*0.5f);float u=max(0.0f,r-t);float v=max(0.0f,s-t);float w=a_position.x;float x=a_position.y;float y=a_position.z;float z=a_position.w;W=vec2(y,z);float AA=u+t*y;float AB=v+t*y;f=vec3(AA*w+b.x,t*z+b.y,AB*x+d);}else if(e==E||e==F||e==H||e==I){vec3 AC=a_position.xyz;W=vec2(AC.z,0.0f);f=vec3(a_position.x*a.x+b.x,a_position.y*a.y+b.y,a_position.z*c+d);}vec3 AD=applyRotation(f,A8);vec3 AE=AD+Aa;vec3 AF=vec3(0.0f,0.0f,1.0f);v_uv=W;v_textureUv=X;v_worldPosition=AE;v_normal=AF;v_geometryType=float(e);vec4 AG=u_proj*u_view*vec4(AE,1.0f);AG.y=-AG.y;gl_Position=AG;}',
	Ui =
		'#version 300 es\nin vec2 a_position;in vec2 a_texCoord;in vec2 A7;in vec2 A9;in vec3 A6;in vec4 A4;in vec4 A0;in vec4 A5;in vec3 Aa;in vec3 A8;in vec3 A1;uniform mat4 u_view;uniform mat4 u_proj;out vec2 v_uv;out vec2 v_textureUv;out vec3 v_glyphIndex;out vec4 v_glyphColor;out vec4 v_cellColor;out vec4 v_glyphFlags;out vec3 v_worldPosition;out vec3 v_normal;out float v_geometryType;const float A=2.0f;\n' +
		Ti +
		'\nvoid main(){v_uv=a_texCoord;v_textureUv=a_texCoord;v_glyphIndex=A6;v_glyphColor=A4;v_cellColor=A0;v_glyphFlags=A5;vec2 B=a_position.xy*A9+A7;float C=A1.y;vec3 D=vec3(B,C);vec3 E=applyRotation(D,A8)+Aa;v_worldPosition=E;v_normal=vec3(0.0f,0.0f,1.0f);v_geometryType=A;vec4 F=u_proj*u_view*vec4(E,1.0f);F.y=-F.y;gl_Position=F;}',
	Pi =
		'uniform bool u_tmUseLighting;uniform vec3 u_tmAmbientLightColor;uniform int u_tmPointLightCount;uniform vec3 u_tmPointLightPositions[5];uniform vec3 u_tmPointLightColors[5];uniform vec3 u_tmLightFalloff;const int TM_MAX_POINT_LIGHTS=5;vec3 tmComputeGeometricNormal(vec3 A){vec3 B=cross(dFdy(A),dFdx(A));float C=length(B);if(C<=0.000001f){return vec3(0.0f,0.0f,1.0f);}return B/C;}vec3 tmApplyLighting(vec3 D,vec3 A){if(!u_tmUseLighting){return D;}vec3 E=D*u_tmAmbientLightColor;if(u_tmPointLightCount>0){vec3 B=tmComputeGeometricNormal(A);for(int F=0;F<TM_MAX_POINT_LIGHTS;F++){if(F>=u_tmPointLightCount){break;}vec3 G=u_tmPointLightPositions[F]-A;float H=length(G);vec3 I=H>0.000001f?G/H:B;float J=max(dot(B,I),0.0f);float K=u_tmLightFalloff.x+H*u_tmLightFalloff.y+H*H*u_tmLightFalloff.z;float L=K>0.0f?1.0f/K:1.0f;E+=D*u_tmPointLightColors[F]*(J*L);}}return clamp(E,0.0f,1.0f);}',
	Li =
		'#version 300 es\nprecision highp float;in vec3 v_glyphIndex;in vec4 v_glyphColor;in vec4 v_cellColor;in vec4 v_glyphFlags;in vec3 v_worldPosition;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_statePayload;\n' +
		Pi +
		'\nvoid main(){int A=int(v_glyphFlags.r>0.5?1:0);int B=int(v_glyphFlags.g>0.5?1:0);int C=int(v_glyphFlags.b>0.5?1:0);float D=float(A|(B<<1)|(C<<2))/255.;o_character=vec4(v_glyphIndex.xy,D,clamp(v_glyphFlags.a,0.,1.));vec3 E=tmApplyLighting(v_glyphColor.rgb,v_worldPosition);vec3 F=tmApplyLighting(v_cellColor.rgb,v_worldPosition);o_primaryColor=vec4(E,v_glyphColor.a);o_secondaryColor=vec4(F,v_cellColor.a);o_statePayload=vec4(0.);}',
	Di =
		'#version 300 es\nprecision highp float;in vec2 v_textureUv;in vec3 v_worldPosition;uniform sampler2D Uq;uniform bool UD;uniform bool UB;uniform bool UC;uniform float UA;uniform float Us;uniform float Ur;uniform bool Uw;uniform vec4 Uv;uniform bool Uu;uniform vec4 Ut;uniform int Ux;uniform sampler2D Uy;uniform ivec2 Uz;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_statePayload;\n' +
		Pi +
		'\nfloat A(vec3 B){return dot(B,vec3(0.299f,0.587f,0.114f));}vec3 C(int D){int E=max(Uz.x,1);int F=D/E;int G=D%E;return texelFetch(Uy,ivec2(G,F),0).rgb;}void main(){vec2 H=vec2(v_textureUv.x,1.0f-v_textureUv.y);vec4 I=texture(Uq,H);if(UD){I.rgb=vec3(1.0f)-I.rgb;}float J=A(I.rgb);if(I.a<0.01f||J<Us||J>Ur){discard;}vec2 K=vec2(0.0f);if(Ux>0){float L=float(Ux);float M=clamp(J*(L-1.0f),0.0f,L-1.0f);int N=int(floor(M+0.5f));K=C(N).xy;}vec4 O=Uw?Uv:I;vec4 P=Uu?Ut:I;vec3 Q=tmApplyLighting(O.rgb,v_worldPosition);vec3 R=tmApplyLighting(P.rgb,v_worldPosition);int S=int(UD?1:0);int T=int(UB?1:0);int U=int(UC?1:0);float V=float(S|(T<<1)|(U<<2))/255.0f;o_character=vec4(K,V,clamp(UA,0.0f,1.0f));o_primaryColor=vec4(Q,O.a);o_secondaryColor=vec4(R,P.a);o_statePayload=vec4(0.0f);}',
	Ri =
		'#version 300 es\nprecision highp float;in vec2 v_textureUv;in vec3 v_worldPosition;uniform sampler2D Ul;uniform sampler2D Um;uniform sampler2D Un;uniform sampler2D Uo;uniform vec2 Up;uniform bool Ub;uniform bool Uc;uniform bool Ud;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_statePayload;\n' +
		Pi +
		'\nvoid main(){vec2 A=vec2(v_textureUv.x,1.-v_textureUv.y);vec2 B=A*Up;vec2 C=(floor(B)+0.5f)/Up;vec4 D=texture(Ul,C);vec4 E=Ub?texture(Um,C):vec4(0.);if(Ub&&E.a==0.){discard;}vec4 F=Uc?texture(Un,C):vec4(0.);vec4 G=Ud?texture(Uo,C):vec4(0.);vec3 H=tmApplyLighting(E.rgb,v_worldPosition);vec3 I=tmApplyLighting(F.rgb,v_worldPosition);o_character=D;o_primaryColor=vec4(H,E.a);o_secondaryColor=vec4(I,F.a);o_statePayload=G;}',
	ki = class {
		xo = 0;
		We;
		So;
		Eo;
		$s;
		To;
		constructor(t) {
			((this.We = new bt(t, Fi, Li)),
				(this.So = new bt(t, Fi, Di)),
				(this.Eo = new bt(t, Fi, Ri)),
				(this.$s = new bt(t, Ui, Ri)),
				(this.To = { id: this.xo++, shader: this.We, uniforms: Object.freeze({}), isBuiltIn: !0 }));
		}
		Hs(t, i = {}) {
			return { id: this.xo++, shader: t, uniforms: Object.freeze({ ...i }), isBuiltIn: !1 };
		}
		Fo(t) {
			return this.Hs(this.So, t);
		}
		Po(t) {
			return this.Hs(this.Eo, t);
		}
		L() {
			(this.We.dispose(), this.So.dispose(), this.Eo.dispose(), this.$s.dispose());
		}
	},
	Oi = class {
		Lo = [];
		Do = 1;
		Ro = 0;
		ko(t, i) {
			if (this.Ro >= this.Lo.length) {
				const e = { id: this.Do++, type: t, params: {}, state: $t.$n(), material: i };
				this.Lo.push(e);
			}
			const e = this.Lo[this.Ro];
			return ((e.id = this.Do++), (e.type = t), (e.material = i), this.Ro++, e);
		}
		Oo(t, i) {
			if (t.data && t.data.length >= i) return;
			let e = Math.max(Jt.FLOATS_PER_INSTANCE, t.data?.length ?? 0);
			for (; e < i;) e *= 2;
			t.data = new Float32Array(e);
		}
		Bo(t, i) {
			if (t.vertices && t.vertices.length >= i) return;
			let e = Math.max(24, t.vertices?.length ?? 0);
			for (; e < i;) e *= 2;
			t.vertices = new Float32Array(e);
		}
		Io(t, i, e, s) {
			const r = this.ko(Ht.RECTANGLE, s),
				n = r.params;
			return ((n.width = t), (n.height = i), e.Hn(r.state), r.id);
		}
		No(t, i, e, s, r, n) {
			const h = this.ko(Ht.LINE, n),
				o = h.params;
			return ((o.x1 = t), (o.y1 = i), (o.x2 = e), (o.y2 = s), r.Hn(h.state), h.id);
		}
		jo(t, i, e, s) {
			const r = this.ko(Ht.ELLIPSE, s),
				n = r.params;
			return ((n.width = t), (n.height = i), e.Hn(r.state), r.id);
		}
		zo(t, i, e, s, r, n) {
			const h = this.ko(Ht.ARC, n),
				o = h.params;
			return ((o.width = t), (o.height = i), (o.start = e), (o.stop = s), r.Hn(h.state), h.id);
		}
		Qo(t, i, e, s, r, n, h, o, a, c) {
			const u = this.ko(Ht.BEZIER_CURVE, c),
				l = u.params;
			return (
				(l.x1 = t),
				(l.y1 = i),
				(l.cp1x = e),
				(l.cp1y = s),
				(l.cp2x = r),
				(l.cp2y = n),
				(l.x2 = h),
				(l.y2 = o),
				a.Hn(u.state),
				u.id
			);
		}
		Go(t, i, e, s, r, n) {
			const h = this.ko(t, n),
				o = h.params;
			return ((o.width = i), (o.height = e), (o.depth = s), r.Hn(h.state), h.id);
		}
		$o(t, i, e, s) {
			const r = this.ko('glyph_run', s),
				n = r.params,
				h = i * Jt.FLOATS_PER_INSTANCE;
			this.Oo(n, h);
			for (let o = 0; o < h; o++) n.data[o] = t[o];
			return ((n.instanceCount = i), e.Hn(r.state), r.id);
		}
		Ho(t, i, e, s) {
			if (0 === i) return 0;
			const r = this.ko('custom_shape', s),
				n = r.params,
				h = 4 * i;
			this.Bo(n, h);
			for (let o = 0; o < h; o++) n.vertices[o] = t[o];
			return ((n.vertexCount = i), e.Hn(r.state), r.id);
		}
		Lh() {
			this.Ro = 0;
		}
		[Symbol.iterator]() {
			let t = 0;
			const i = this.Ro,
				e = this.Lo;
			return { next: () => (t < i ? { value: e[t++], done: !1 } : { value: void 0, done: !0 }) };
		}
	},
	Bi = class {
		As;
		Xo = /* @__PURE__ */ new Map();
		Vo = /* @__PURE__ */ new WeakMap();
		uh;
		Yo = 0;
		Ko = 1;
		constructor(t, i = 64) {
			((this.As = t), (this.uh = Math.max(1, i)));
		}
		resolve(t, i = null) {
			const e = this.Zo(),
				s = Math.min(e * e, 65535);
			if (t.length > s)
				throw new r('[textmode.js] Character palette exceeds the supported GPU texture capacity.', {
					requestedCharacters: t.length,
					maxCharacters: s,
					maxTextureSize: e,
				});
			const n = this.Wo(t),
				h = `${i ? this.qo(i) : 'none'}:${t.length}:${this.Jo(n)}`,
				o = this.Xo.get(h);
			if (o && this.ta(o.data, n)) return ((o.lastUsed = ++this.Yo), o);
			const a = this.W(t, n, h);
			return (this.Xo.set(h, a), this.ia(), a);
		}
		dispose() {
			for (const t of this.Xo.values()) this.As.deleteTexture(t.texture);
			this.Xo.clear();
		}
		get size() {
			return this.Xo.size;
		}
		W(t, i, e) {
			const s = Math.max(t.length, 1),
				n = this.Zo(),
				h = Math.min(n, Math.ceil(Math.sqrt(s))),
				o = Math.max(1, Math.ceil(s / h)),
				a = new Uint8Array(h * o * 4);
			a.set(i);
			const c = this.As.createTexture();
			if (!c) throw new r('[textmode.js] Failed to create character palette texture.');
			const u = this.As;
			return (
				u.bindTexture(u.TEXTURE_2D, c),
				u.texParameteri(u.TEXTURE_2D, u.TEXTURE_MIN_FILTER, u.NEAREST),
				u.texParameteri(u.TEXTURE_2D, u.TEXTURE_MAG_FILTER, u.NEAREST),
				u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_S, u.CLAMP_TO_EDGE),
				u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_T, u.CLAMP_TO_EDGE),
				u.pixelStorei(u.UNPACK_FLIP_Y_WEBGL, 0),
				u.texImage2D(u.TEXTURE_2D, 0, u.RGBA8, h, o, 0, u.RGBA, u.UNSIGNED_BYTE, a),
				u.bindTexture(u.TEXTURE_2D, null),
				{ texture: c, columns: h, rows: o, count: t.length, key: e, data: i, lastUsed: ++this.Yo }
			);
		}
		Wo(t) {
			const i = new Uint8Array(4 * Math.max(t.length, 1));
			for (let e = 0; e < t.length; e++) {
				const s = t[e],
					r = 4 * e;
				((i[r] = this.ea(s[0])), (i[r + 1] = this.ea(s[1])), (i[r + 2] = this.ea(s[2])), (i[r + 3] = 255));
			}
			return i;
		}
		ea(t) {
			return Math.max(0, Math.min(255, Math.round(255 * t)));
		}
		Zo() {
			return Math.max(1, Number(this.As.getParameter(this.As.MAX_TEXTURE_SIZE)) || 4096);
		}
		Jo(t) {
			let i = 2166136261;
			for (let e = 0; e < t.length; e++) ((i ^= t[e]), (i = Math.imul(i, 16777619)));
			return (i >>> 0).toString(16);
		}
		ta(t, i) {
			if (t.length !== i.length) return !1;
			for (let e = 0; e < t.length; e++) if (t[e] !== i[e]) return !1;
			return !0;
		}
		qo(t) {
			const i = t;
			return String(i.id ?? i.sa ?? this.ra(t));
		}
		ra(t) {
			const i = this.Vo.get(t);
			if (i) return i;
			const e = this.Ko++;
			return (this.Vo.set(t, e), e);
		}
		ia() {
			for (; this.Xo.size > this.uh;) {
				let t = null,
					i = 1 / 0;
				for (const [s, r] of this.Xo) r.lastUsed < i && ((i = r.lastUsed), (t = s));
				if (!t) return;
				const e = this.Xo.get(t);
				e && (this.As.deleteTexture(e.texture), this.Xo.delete(t));
			}
		}
	},
	Ii = class {
		X;
		na = /* @__PURE__ */ new Map();
		ha = /* @__PURE__ */ new WeakMap();
		oa = 1;
		constructor(t) {
			this.X = t;
		}
		materialFor(t) {
			'source' === t.kind && t.source.aa();
			const i = this.ca(t),
				e = this.na.get(i);
			if (e) return e;
			const s =
				'source' === t.kind ? this.X.materialManager.Fo(this.X.ua(t)) : this.X.materialManager.Po(this.X.la(t));
			return (this.na.set(i, s), s);
		}
		dispose() {
			this.na.clear();
		}
		get size() {
			return this.na.size;
		}
		ca(t) {
			return 'source' === t.kind
				? [
						'source',
						this.fa(t.source.texture),
						this.fa(t.palette.texture),
						t.palette.count,
						t.palette.columns,
						t.palette.rows,
						t.brightnessStart,
						t.brightnessEnd,
						t.invert ? 1 : 0,
						t.flipX ? 1 : 0,
						t.flipY ? 1 : 0,
						t.charRotation,
						t.charColorMode,
						t.cellColorMode,
						...t.charColor,
						...t.cellColor,
					].join('|')
				: [
						'framebuffer',
						this.ra(t.framebuffer),
						t.attachmentCount,
						t.width,
						t.height,
						...t.textures.map((t) => this.fa(t)),
					].join('|');
		}
		fa(t) {
			return this.ra(t);
		}
		ra(t) {
			const i = this.ha.get(t);
			if (i) return i;
			const e = this.oa++;
			return (this.ha.set(t, e), e);
		}
	},
	Ni = class {
		As;
		oo = null;
		da;
		_a;
		pa;
		ma;
		va;
		ga;
		ya;
		wa = null;
		ba = {};
		Ma = [];
		Ca = [];
		xa = [];
		Sa = [];
		Ea = null;
		Ta = [0, 0, 0, 0];
		Fa = 1;
		Pa = !0;
		La = !0;
		Da = !1;
		Ra = /* @__PURE__ */ new Float32Array(4);
		ka = /* @__PURE__ */ new Float32Array(12);
		Oa = /* @__PURE__ */ new Set();
		constructor(t) {
			((this.As = t),
				t.enable(t.DEPTH_TEST),
				t.depthFunc(t.LEQUAL),
				t.clearDepth(1),
				t.depthMask(!0),
				(this.Pa = !0),
				(this.La = !0),
				t.disable(t.CULL_FACE),
				(this.va = new $t()),
				(this._a = new ki(t)),
				(this.pa = new Bi(t)),
				(this.ma = new Ii(this)),
				(this.ga = new Oi()),
				(this.da = new Ei(t)),
				(this.ya = new Wt(t)));
			const i = [0, 0, t.canvas.width, t.canvas.height];
			(At(t, i),
				this.Ca.push(null),
				this.xa.push(i),
				this.Sa.push(1),
				(this.Ea = null),
				(this.Ta = i),
				(this.Fa = 1));
		}
		Os() {
			(this.Ca.push(this.Ea), this.xa.push([...this.Ta]), this.Sa.push(this.Fa));
		}
		zs() {
			const t = this.Ca.pop() ?? null,
				i = this.xa.pop() ?? [0, 0, this.As.canvas.width, this.As.canvas.height],
				e = this.Sa.pop() ?? 1;
			this.Bs(t, i[2], i[3], e);
		}
		Bs(t, i, e, s = 1) {
			const r = this.As;
			(this.Ea !== t && (r.bindFramebuffer(r.FRAMEBUFFER, t), (this.Ea = t)), (this.Fa = s));
			const n = [0, 0, i, e];
			(this.Ta[0] === n[0] && this.Ta[1] === n[1] && this.Ta[2] === n[2] && this.Ta[3] === n[3]) ||
				(r.viewport(...n), At(r, n), (this.Ta = n));
		}
		We(t) {
			this.oo !== t && ((this.oo = t), t.er());
		}
		Ba(t) {
			if (((this.Da = t), t)) this.Oa.clear();
			else {
				for (const t of this.Oa) t.Ia();
				this.Oa.clear();
			}
		}
		Na() {
			return this.Da;
		}
		ja(t) {
			this.Oa.add(t);
		}
		ir(t, i) {
			return new bt(this.As, t, i);
		}
		za(t) {
			((this.wa = t), t && (this.ba = {}));
		}
		Qa() {
			((this.wa = null), (this.ba = {}));
		}
		rr(t, i) {
			this.ba[t] = i;
		}
		qe(t) {
			Object.assign(this.ba, t);
		}
		Ga(t = !1) {
			(this.Ma.push({ shader: this.wa, uniforms: { ...this.ba } }), t && this.Qa());
		}
		$a() {
			const t = this.Ma.pop();
			t && ((this.wa = t.shader), (this.ba = t.shader ? { ...t.uniforms } : {}));
		}
		Ha(t) {
			return new bt(this.As, Fi, t);
		}
		Xa() {
			if (this.wa) return this._a.Hs(this.wa, this.ba);
			const t = this.va.zn.current;
			return 'source' === t.kind || 'framebuffer' === t.kind ? this.ma.materialFor(t) : this._a.To;
		}
		ua(t) {
			return (
				t.source.aa(),
				{
					Uq: t.source.texture,
					UD: t.invert,
					UB: t.flipX,
					UC: t.flipY,
					UA: t.charRotation,
					Us: t.brightnessStart,
					Ur: t.brightnessEnd,
					Uw: 'fixed' === t.charColorMode,
					Uv: t.charColor,
					Uu: 'fixed' === t.cellColorMode,
					Ut: t.cellColor,
					Ux: t.palette.count,
					Uy: t.palette.texture,
					Uz: [t.palette.columns, t.palette.rows],
				}
			);
		}
		la(t) {
			const i = t.textures,
				e = t.attachmentCount > 1,
				s = t.attachmentCount > 2,
				r = t.attachmentCount > 3;
			return {
				Ul: i[0],
				Um: e ? i[1] : i[0],
				Un: s ? i[2] : i[0],
				Uo: r ? i[3] : i[0],
				Up: [t.width, t.height],
				Ub: e,
				Uc: s,
				Ud: r,
			};
		}
		Va(t, i, e, s) {
			t instanceof yt || !s || t.Ya(s);
			const r = t instanceof yt ? [t.Qs()] : t.Ka(),
				n = i ?? t.width,
				h = e ?? t.height;
			for (const o of r) this.ga.Io(n, h, this.va, o);
			t instanceof yt || !t.Za() || this.ja(t);
		}
		Je(t, i, e, s) {
			this.ya.th(t, i, e, s);
		}
		Wa(t, i) {
			this.ga.Io(t, i, this.va, this.Xa());
		}
		$o(t, i) {
			0 !== i && this.ga.$o(t, i, this.va, this.Xa());
		}
		qa(t, i, e, s) {
			this.ga.No(t, i, e, s, this.va, this.Xa());
		}
		Ja(t, i) {
			this.ga.Ho(t, i, this.va, this.Xa());
		}
		tc(t, i) {
			this.ga.jo(t, i, this.va, this.Xa());
		}
		ec(t, i, e, s, r, n) {
			((this.ka[0] = t),
				(this.ka[1] = i),
				(this.ka[2] = 0),
				(this.ka[3] = 0),
				(this.ka[4] = e),
				(this.ka[5] = s),
				(this.ka[6] = 0),
				(this.ka[7] = 0),
				(this.ka[8] = r),
				(this.ka[9] = n),
				(this.ka[10] = 0),
				(this.ka[11] = 0),
				this.ga.Ho(this.ka, 3, this.va, this.Xa()));
		}
		sc(t, i, e, s, r, n, h, o) {
			this.ga.Qo(t, i, e, s, r, n, h, o, this.va, this.Xa());
		}
		rc(t, i, e, s) {
			this.ga.zo(t, i, e, s, this.va, this.Xa());
		}
		nc(t, i, e) {
			this.ga.Go(Ht.BOX, t, i, e, this.va, this.Xa());
		}
		hc(t) {
			const i = 2 * t;
			this.ga.Go(Ht.SPHERE, i, i, i, this.va, this.Xa());
		}
		oc(t, i) {
			const e = 2 * (t + i);
			this.ga.Go(Ht.TORUS, e, 2 * i, e, this.va, this.Xa());
		}
		ac(t, i) {
			const e = 2 * t;
			this.ga.Go(Ht.CONE, e, i, e, this.va, this.Xa());
		}
		cc(t, i) {
			const e = 2 * t;
			this.ga.Go(Ht.CYLINDER, e, i, e, this.va, this.Xa());
		}
		uc(t, i, e) {
			this.ga.Go(Ht.ELLIPSOID, 2 * t, 2 * i, 2 * e, this.va, this.Xa());
		}
		q(t, i, e = 1, s = {}) {
			return new yt(this.As, t, i, e, s, this);
		}
		lc(t, i = t, e = t, s = 255) {
			this.va.pn.Tn(t, i ?? t, e ?? t, s);
			const [r, n, h, o] = this.va.pn.Ce;
			this.fc(r, n, h, o);
		}
		Lh(t = 0, i = 0, e = 0, s = 0) {
			this.fc(t, i, e, s);
		}
		fc(t, i, e, s) {
			const r = this.As,
				n = this.Ra;
			if (this.Fa > 1) {
				((n[0] = 1),
					(n[1] = 1),
					(n[2] = 0),
					(n[3] = 0),
					r.clearBufferfv(r.COLOR, 0, n),
					(n[0] = 0),
					(n[1] = 0),
					(n[2] = 0),
					(n[3] = 0),
					r.clearBufferfv(r.COLOR, 1, n),
					this.Fa >= 3 && ((n[0] = t), (n[1] = i), (n[2] = e), (n[3] = s), r.clearBufferfv(r.COLOR, 2, n)),
					this.Fa >= 3 && ((n[0] = 0), (n[1] = 0), (n[2] = 0), (n[3] = 0)));
				for (let t = 3; t < this.Fa; t++) r.clearBufferfv(r.COLOR, t, n);
			} else (r.clearColor(t, i, e, s), r.clear(r.COLOR_BUFFER_BIT));
		}
		dc() {
			const t = [0, 0, this.As.canvas.width, this.As.canvas.height];
			(this.As.viewport(...t), At(this.As, t), (this.Ta = t), this.xa.length > 0 && (this.xa[0] = t));
		}
		_c(t) {
			this.Pa !== t &&
				(t ? this.As.enable(this.As.DEPTH_TEST) : this.As.disable(this.As.DEPTH_TEST), (this.Pa = t));
		}
		mc(t) {
			this.La !== t && (this.As.depthMask(t), (this.La = t));
		}
		vc() {
			return this.Pa;
		}
		gc() {
			return this.La;
		}
		js() {
			const t = this.ga;
			(this.da.mo(t), t.Lh(), (this.oo = null));
		}
		L() {
			(this.ma.dispose(), this.pa.dispose(), this._a.L(), this.da.L(), this.ya.L());
		}
		get context() {
			return this.As;
		}
		get state() {
			return this.va;
		}
		get materialManager() {
			return this._a;
		}
		get glyphPaletteService() {
			return this.pa;
		}
	},
	ji = class {
		p;
		yc;
		wc = null;
		bc = !0;
		As = null;
		Mc = null;
		O = !1;
		Ac;
		constructor(t = {}) {
			if (((this.Ac = t.pixelDensity ?? 1), t.gl))
				((this.wc = t.gl), (this.p = t.gl.canvas), (this.yc = !1), (this.bc = !1));
			else if (t.canvas) {
				if ('undefined' != typeof HTMLVideoElement && t.canvas instanceof HTMLVideoElement)
					throw new r('HTMLVideoElement cannot be used as the textmode output canvas.');
				((this.p = t.canvas), (this.yc = !1));
			} else ((this.p = this.Cc(t.width, t.height)), (this.yc = !0));
			'undefined' != typeof HTMLCanvasElement &&
				this.p instanceof HTMLCanvasElement &&
				(this.p.style.imageRendering = 'pixelated');
		}
		Cc(t, i) {
			const e = document.createElement('canvas');
			((e.className = 'textmodeCanvas'), (e.style.imageRendering = 'pixelated'));
			const s = t || 800,
				r = i || 600;
			return (
				(e.width = s * this.Ac),
				(e.height = r * this.Ac),
				(e.style.width = s + 'px'),
				(e.style.height = r + 'px'),
				this.xc(e),
				e
			);
		}
		xc(t) {
			const i = () => {
				if (this.O || t.parentNode) return;
				const i = document.body;
				i && i.appendChild(t);
			};
			document.body
				? i()
				: ((this.Mc = () => {
						((this.Mc = null), i());
					}),
					document.addEventListener('DOMContentLoaded', this.Mc, { once: !0 }));
		}
		rs(t, i) {
			const e = t ?? Math.round(this.p.width / this.Ac),
				s = i ?? Math.round(this.p.height / this.Ac);
			((this.p.width = e * this.Ac),
				(this.p.height = s * this.Ac),
				this.p instanceof HTMLCanvasElement &&
					((this.p.style.width = e + 'px'), (this.p.style.height = s + 'px')));
		}
		Sc() {
			if (this.wc) return this.wc;
			const t = this.p.getContext('webgl2', {
				alpha: !0,
				premultipliedAlpha: !1,
				preserveDrawingBuffer: !0,
				antialias: !1,
				depth: !0,
				stencil: !1,
				powerPreference: 'high-performance',
			});
			if (!t) throw new r('`textmode.js` requires WebGL2 support.');
			return ((this.As = t), t);
		}
		L() {
			if (this.O) return;
			if (((this.O = !0), this.Ec(), !this.bc)) return;
			const t = this.As ?? this.wc;
			(t && t.getExtension('WEBGL_lose_context')?.loseContext(),
				this.yc &&
					'undefined' != typeof HTMLCanvasElement &&
					this.p instanceof HTMLCanvasElement &&
					this.p.parentNode &&
					this.p.parentNode.removeChild(this.p));
		}
		Ec() {
			this.Mc && (document.removeEventListener('DOMContentLoaded', this.Mc), (this.Mc = null));
		}
		get canvas() {
			return this.p;
		}
		get width() {
			return this.p.width;
		}
		get height() {
			return this.p.height;
		}
		get ownsContext() {
			return this.bc;
		}
		get pixelDensity() {
			return this.Ac;
		}
		Tc(t) {
			t <= 0 || (this.Ac = t);
		}
	};
function zi(t) {
	return parseInt(t, 16);
}
var Qi = /^rgba?\(([^)]+)\)$/i;
function Gi(t) {
	return ((t = Math.round(t)), Number.isNaN(t) ? 0 : Q(t, 0, 255));
}
var $i = class t {
		Fc;
		Pc;
		r;
		g;
		b;
		a;
		constructor(t, i, e, s) {
			((this.r = Gi(t)), (this.g = Gi(i)), (this.b = Gi(e)), (this.a = Gi(s)));
		}
		static Lc(i, e, s, r) {
			if (i instanceof t) return i;
			if (Array.isArray(i)) {
				if (i.length < 3) throw new Error('Component tuples must include at least RGB values.');
				const [e, s, r] = i,
					n = 4 === i.length ? i[3] : 255;
				return t.Dc(e, s, r, n);
			}
			if ('string' == typeof i) {
				const e = i.trim();
				if (0 === e.length) throw new Error('Color strings cannot be empty.');
				const s = (function (t, i = !1) {
					if (!t) return null;
					const e = t.trim().toLowerCase();
					if (!e) return null;
					let s = null;
					return (
						e.startsWith('rgb') &&
							(s = (function (t) {
								const i = Qi.exec(t.trim());
								if (!i) return null;
								const e = i[1].split(',').map((t) => t.trim());
								if (e.length < 3) return null;
								const s = Gi(parseFloat(e[0])),
									r = Gi(parseFloat(e[1])),
									n = Gi(parseFloat(e[2]));
								let h = 255;
								if (void 0 !== e[3]) {
									const t = e[3].trim();
									let i = parseFloat(t);
									(t.endsWith('%') && (i /= 100), (h = 255 * Q(i, 0, 1)));
								}
								return [s, r, n, Math.round(h)];
							})(e)),
						s && (i || 0 !== s[3]) ? s : null
					);
				})(e, !0);
				return s ? t.Dc(...s) : t.Rc(e);
			}
			if ('number' == typeof i)
				return 'number' == typeof e && 'number' == typeof s
					? t.Dc(i, e, s, r ?? 255)
					: 'number' == typeof e
						? t.kc(i, e)
						: t.kc(i, r ?? 255);
			throw new Error('Unsupported color input passed.');
		}
		static Oc(i, e, s, r, n) {
			if (i instanceof t || 'string' == typeof i) return t.Lc(i);
			const [h, o, a, c] = (function (t, i, e, s, r) {
				if (Array.isArray(t)) {
					if (t.length < 3) throw new Error('Component tuples must include at least RGB values.');
					return Dt(t[0], t[1], t[2], 4 === t.length ? t[3] : void 0, r);
				}
				return 'number' == typeof i && 'number' == typeof e
					? Dt(t, i, e, s, r)
					: (function (t, i, e) {
							const s = Ut(t, 'rgb' === e.mode ? e.maxes[0] : e.maxes[2]);
							return [s, s, s, Pt(i, e.maxes[3])];
						})(t, i ?? s, r);
			})(i, e, s, r, n);
			return t.Dc(h, o, a, c);
		}
		static Dc(i, e, s, r = 255) {
			return new t(i, e, s, r);
		}
		static kc(i, e = 255) {
			return new t(i, i, i, e);
		}
		static Rc(i) {
			return new t(
				...(function (t) {
					const i = t.trim().replace(/^#|0x/gi, '');
					if (!/^[0-9A-Fa-f]+$/.test(i)) throw new Error(`Invalid hex color: ${t}`);
					const e =
						3 === (s = i).length || 4 === s.length
							? s
									.split('')
									.map((t) => t + t)
									.join('')
							: s;
					var s;
					if (6 !== e.length && 8 !== e.length) throw new Error(`Invalid hex color: ${t}`);
					return [
						zi(e.slice(0, 2)),
						zi(e.slice(2, 4)),
						zi(e.slice(4, 6)),
						8 === e.length ? zi(e.slice(6, 8)) : 255,
					];
				})(i)
			);
		}
		static Bc(i, e, s, r) {
			return new t(Math.round(255 * i), Math.round(255 * e), Math.round(255 * s), Math.round(255 * r));
		}
		get rgb() {
			return [this.r, this.g, this.b];
		}
		get rgba() {
			return (this.Fc || (this.Fc = [this.r, this.g, this.b, this.a]), [...this.Fc]);
		}
		get normalized() {
			return (this.Pc || (this.Pc = [this.r / 255, this.g / 255, this.b / 255, this.a / 255]), [...this.Pc]);
		}
		withAlpha(i) {
			return new t(this.r, this.g, this.b, i);
		}
	},
	Hi = class {
		Ic;
		Nc;
		jc;
		zc = 'brightness';
		Qc = null;
		Gc = null;
		$c = null;
		constructor(t, i, e) {
			((this.Ic = t), (this.Nc = i), (this.jc = e));
		}
		get conversionMode() {
			return this.zc;
		}
		setConversionMode(t, i) {
			i
				? ((this.Qc = t), this.Nc.disposeStack(this.$c), (this.$c = null))
				: ((this.zc = t), this.Nc.disposeStack(this.Gc), (this.Gc = null));
		}
		setConversions(t, i) {
			if (!Array.isArray(t))
				throw new r('[textmode.js] conversions() expects an array of conversion steps.', {
					method: 'conversions',
					providedValue: t,
				});
			if (0 === t.length) return (this.clearConversions(i), !1);
			const e = t.map((t, i) => this.Hc(t, i));
			return (
				i
					? ((this.Qc = null), this.Nc.disposeStack(this.$c), (this.$c = e))
					: (this.Nc.disposeStack(this.Gc), (this.Gc = e)),
				!0
			);
		}
		clearConversions(t) {
			t
				? ((this.Qc = null), this.Nc.disposeStack(this.$c), (this.$c = []))
				: (this.Nc.disposeStack(this.Gc), (this.Gc = null));
		}
		clearFrameOverrides() {
			((this.Qc = null), this.Nc.disposeStack(this.$c), (this.$c = null));
		}
		getActiveStack() {
			return null !== this.Qc ? null : null !== this.$c ? (this.$c.length > 0 ? this.$c : null) : this.Gc;
		}
		getSingleMode() {
			return this.Qc ?? this.zc;
		}
		hasFrameOverrides() {
			return null !== this.Qc || null !== this.$c;
		}
		invalidateMaterials() {
			(this.Gc?.forEach((t) => {
				t.material = null;
			}),
				this.$c?.forEach((t) => {
					t.material = null;
				}));
		}
		refreshPalettes() {
			(this.Xc(this.Gc), this.Xc(this.$c));
		}
		dispose() {
			(this.Nc.disposeStack(this.Gc), this.Nc.disposeStack(this.$c), (this.Gc = null), (this.$c = null));
		}
		get debugSnapshot() {
			return { conversionMode: this.zc, conversionStack: this.Gc, frameConversionStack: this.$c };
		}
		Hc(t, i) {
			if (!t || 'object' != typeof t)
				throw new r('[textmode.js] Conversion stack steps must be objects.', {
					method: 'conversions',
					index: i,
					providedValue: t,
				});
			if ('string' != typeof t.mode || '' === t.mode.trim())
				throw new r('[textmode.js] Conversion stack step mode must be a non-empty string.', {
					method: 'conversions',
					index: i,
					providedValue: t.mode,
				});
			const e = {
				mode: t.mode,
				options: this.Vc(t.options, i),
				paletteTexture: null,
				paletteDirty: !1,
				material: null,
			};
			if (void 0 !== t.characters) {
				if ('string' != typeof t.characters)
					throw new r('[textmode.js] Conversion stack step characters must be a string.', {
						method: 'conversions',
						index: i,
						providedValue: t.characters,
					});
				((e.characters = t.characters),
					(e.glyphColors = this.Ic.getCharacterPalette(t.characters)),
					(e.paletteDirty = !0));
			}
			if (
				(void 0 !== t.invert && (e.invert = t.invert ? 1 : 0),
				void 0 !== t.flipX && (e.flipX = t.flipX ? 1 : 0),
				void 0 !== t.flipY && (e.flipY = t.flipY ? 1 : 0),
				void 0 !== t.charRotation && (e.charRotation = Z(t.charRotation)),
				void 0 !== t.brightnessStart || void 0 !== t.brightnessEnd)
			) {
				if (void 0 === t.brightnessStart || void 0 === t.brightnessEnd)
					throw new r(
						'[textmode.js] Conversion stack step brightnessStart and brightnessEnd must be provided together.',
						{
							method: 'conversions',
							index: i,
							brightnessStart: t.brightnessStart,
							brightnessEnd: t.brightnessEnd,
						}
					);
				const [s, n] = this.Yc(t.brightnessStart, t.brightnessEnd, 'conversions', i);
				((e.brightnessStart = s), (e.brightnessEnd = n));
			}
			return (
				void 0 !== t.charColorMode &&
					(this.Kc(t.charColorMode, 'charColorMode', i), (e.charColorMode = t.charColorMode)),
				void 0 !== t.cellColorMode &&
					(this.Kc(t.cellColorMode, 'cellColorMode', i), (e.cellColorMode = t.cellColorMode)),
				void 0 !== t.charColor && (e.charColor = this.jc(t.charColor)),
				void 0 !== t.cellColor && (e.cellColor = this.jc(t.cellColor)),
				e
			);
		}
		Kc(t, i, e) {
			if ('sampled' !== t && 'fixed' !== t)
				throw new r(`[textmode.js] Conversion stack step ${i} must be 'sampled' or 'fixed'.`, {
					method: 'conversions',
					index: e,
					providedValue: t,
				});
		}
		Vc(t, i) {
			if (void 0 === t) return {};
			if (null === t || 'object' != typeof t || Array.isArray(t))
				throw new r('[textmode.js] Conversion stack step options must be an object.', {
					method: 'conversions',
					index: i,
					providedValue: t,
				});
			return { ...t };
		}
		Yc(t, i, e, s) {
			const n = { method: e, start: t, end: i };
			if ((void 0 !== s && (n.index = s), !Number.isFinite(t) || !Number.isFinite(i)))
				throw new r('[textmode.js] brightness range values must be finite numbers.', n);
			if (t < 0 || t > 255 || i < 0 || i > 255)
				throw new r('[textmode.js] brightness range values must be between 0 and 255.', n);
			if (t > i) throw new r('[textmode.js] brightness range start must be less than or equal to end.', n);
			return [t / 255, i / 255];
		}
		Xc(t) {
			if (t)
				for (const i of t)
					void 0 !== i.characters &&
						((i.glyphColors = this.Ic.getCharacterPalette(i.characters)),
						(i.paletteDirty = !0),
						(i.material = null));
		}
	},
	Xi = class {
		Zc;
		Wc = null;
		qc = null;
		Jc = !0;
		tu = !1;
		iu = null;
		constructor(t) {
			this.Zc = t;
		}
		setActiveGlyphAtlas(t) {
			((this.iu = t), this.markBaseDirty(), this.markFrameDirty());
		}
		markBaseDirty() {
			this.Jc = !0;
		}
		markFrameDirty() {
			this.tu = !0;
		}
		clearFrame() {
			this.tu = !1;
		}
		getBase(t) {
			return ((this.Wc && !this.Jc) || ((this.Wc = this.W(t, this.Wc)), (this.Jc = !1)), this.Wc);
		}
		getFrame(t) {
			return ((this.qc && !this.tu) || ((this.qc = this.W(t, this.qc)), (this.tu = !1)), this.qc);
		}
		getStep(t, i) {
			return (
				(t.paletteTexture && !t.paletteDirty) ||
					((t.paletteTexture = this.W(i, t.paletteTexture)), (t.paletteDirty = !1)),
				t.paletteTexture
			);
		}
		disposeStep(t) {
			((t.paletteTexture = null), (t.material = null));
		}
		disposeStack(t) {
			if (t) for (const i of t) this.disposeStep(i);
		}
		disposeAll() {
			((this.Wc = null), (this.qc = null));
		}
		get basePalette() {
			return this.Wc;
		}
		get framePalette() {
			return this.qc;
		}
		W(t, i) {
			const e = this.Zc.resolve(t, this.iu);
			return i?.texture === e.texture ? i : e;
		}
	},
	Vi = class {
		jc;
		iu = null;
		mn = null;
		cn = 0;
		dn = 0;
		_n = 0;
		un = 0;
		eu = 0;
		su = 1;
		ru = 'sampled';
		nu = 'fixed';
		vn = [1, 1, 1, 1];
		gn = [0, 0, 0, 1];
		hu = [0, 0, 0, 1];
		ou = [[0.1, 0, 0]];
		au = null;
		cu = null;
		uu = null;
		lu = null;
		fu = null;
		du = null;
		_u = null;
		pu = null;
		mu = null;
		vu = null;
		gu = null;
		yu = null;
		constructor(t = $i.Lc) {
			this.jc = t;
		}
		get activeGlyphAtlas() {
			return this.iu;
		}
		setActiveGlyphAtlas(t, i) {
			return this.iu !== t && ((this.iu = t), i.setActiveGlyphAtlas(t), this.mn && this.wu(this.mn, i), !0);
		}
		setInvert(t, i) {
			this.bu('invert', t ? 1 : 0, i);
		}
		setFlipX(t, i) {
			this.bu('flipX', t ? 1 : 0, i);
		}
		setFlipY(t, i) {
			this.bu('flipY', t ? 1 : 0, i);
		}
		setCharRotation(t, i) {
			this.bu('charRotation', Z(t), i);
		}
		setBrightnessRange(t, i, e) {
			const s = t / 255,
				r = i / 255;
			e ? ((this.fu = s), (this.du = r)) : ((this.eu = s), (this.su = r));
		}
		setCharColorMode(t, i) {
			i ? (this._u = t) : (this.ru = t);
		}
		setCellColorMode(t, i) {
			i ? (this.pu = t) : (this.nu = t);
		}
		setColor(t, i, e, s, r, n) {
			const h = this.Mu(t, i),
				o = this.jc(e, s, r, n);
			Nt(h, o.r, o.g, o.b, o.a);
		}
		setCharacters(t, i, e) {
			if (i) {
				const i = this.getCharacterPalette(t);
				return ((this.yu = i.length > 0 ? i : null), void (i.length > 0 && e.markFrameDirty()));
			}
			((this.mn = t), this.wu(t, e));
		}
		clearFrameOverrides(t) {
			((this.au = null),
				(this.cu = null),
				(this.uu = null),
				(this.lu = null),
				(this.fu = null),
				(this.du = null),
				(this._u = null),
				(this.pu = null),
				(this.mu = null),
				(this.vu = null),
				(this.gu = null),
				(this.yu = null),
				t.clearFrame());
		}
		hasFrameUniformOverrides() {
			return (
				null !== this.au ||
				null !== this.cu ||
				null !== this.uu ||
				null !== this.lu ||
				null !== this.fu ||
				null !== this.du ||
				null !== this._u ||
				null !== this.pu ||
				null !== this.mu ||
				null !== this.vu ||
				null !== this.gu ||
				null !== this.yu
			);
		}
		getCharacterPalette(t) {
			return this.iu ? this.iu.Gt(t).filter((t) => Array.isArray(t)) : [];
		}
		createBaseUniforms(t, i, e) {
			const s = i?.invert ?? this.au ?? this.cn,
				r = i?.flipX ?? this.cu ?? this.dn,
				n = i?.flipY ?? this.uu ?? this._n,
				h = i?.charRotation ?? this.lu ?? this.un,
				o = i?.brightnessStart ?? this.fu ?? this.eu,
				a = i?.brightnessEnd ?? this.du ?? this.su,
				c = i?.charColorMode ?? this._u ?? this.ru,
				u = i?.cellColorMode ?? this.pu ?? this.nu,
				l = i?.charColor ?? this.mu ?? this.vn,
				f = i?.cellColor ?? this.vu ?? this.gn,
				d = this.gu ?? this.hu,
				_ = void 0 !== i?.glyphColors,
				p = !_ && null !== this.yu,
				m = _ ? i.glyphColors : (this.yu ?? this.ou),
				v = _ ? e.getStep(i, m) : p ? e.getFrame(m) : e.getBase(m);
			return {
				u_image: t,
				u_invert: !!s,
				u_flipX: !!r,
				u_flipY: !!n,
				u_charRotation: h,
				U5: o,
				U4: a,
				u_charColorFixed: 'fixed' === c,
				u_charColor: l,
				u_cellColorFixed: 'fixed' === u,
				u_cellColor: f,
				u_backgroundColor: d,
				u_charCount: m.length,
				u_charPaletteTexture: v.texture,
				u_charPaletteDimensions: [v.columns, v.rows],
			};
		}
		createGeometryTextureSnapshot(t, i) {
			const e = this.au ?? this.cn,
				s = this.cu ?? this.dn,
				r = this.uu ?? this._n,
				n = this.lu ?? this.un,
				h = this.fu ?? this.eu,
				o = this.du ?? this.su,
				a = this._u ?? this.ru,
				c = this.pu ?? this.nu,
				u = this.mu ?? this.vn,
				l = this.vu ?? this.gn,
				f = this.yu ?? this.ou;
			return {
				kind: 'source',
				source: t,
				palette: this.yu ? i.getFrame(f) : i.getBase(f),
				brightnessStart: h,
				brightnessEnd: o,
				invert: !!e,
				flipX: !!s,
				flipY: !!r,
				charRotation: n,
				charColorMode: a,
				cellColorMode: c,
				charColor: [u[0], u[1], u[2], u[3]],
				cellColor: [l[0], l[1], l[2], l[3]],
			};
		}
		get debugSnapshot() {
			return {
				invert: this.cn,
				flipX: this.dn,
				flipY: this._n,
				charRotation: this.un,
				brightnessStart: this.eu,
				brightnessEnd: this.su,
				charColorMode: this.ru,
				cellColorMode: this.nu,
				charColor: this.vn,
				cellColor: this.gn,
				backgroundColor: this.hu,
				glyphColors: this.ou,
			};
		}
		bu(t, i, e) {
			'invert' === t
				? e
					? (this.au = i)
					: (this.cn = i)
				: 'flipX' === t
					? e
						? (this.cu = i)
						: (this.dn = i)
					: 'flipY' === t
						? e
							? (this.uu = i)
							: (this._n = i)
						: e
							? (this.lu = i)
							: (this.un = i);
		}
		Mu(t, i) {
			return i
				? 'char' === t
					? ((this.mu ??= [0, 0, 0, 1]), this.mu)
					: 'cell' === t
						? ((this.vu ??= [0, 0, 0, 1]), this.vu)
						: ((this.gu ??= [0, 0, 0, 1]), this.gu)
				: 'char' === t
					? this.vn
					: 'cell' === t
						? this.gn
						: this.hu;
		}
		wu(t, i) {
			const e = this.getCharacterPalette(t);
			e.length > 0 && ((this.ou = e), i.markBaseDirty());
		}
	},
	Yi = class {
		qt;
		Ts = null;
		Au = null;
		Cu = null;
		xu;
		constructor(t) {
			this.qt = t;
		}
		invalidateMaterials() {
			((this.Ts = null), this.qt.stackState.invalidateMaterials());
		}
		clearStrategyCache() {
			this.Au = null;
		}
		getMaterial() {
			return this.hasFrameOverrides() ? this.Su() : (this.Ts || (this.Ts = this.Su()), this.Ts);
		}
		getMaterials() {
			const t = this.qt.stackState.getActiveStack();
			if (!t) return [this.getMaterial()];
			this.qt.beforeMaterialUpdate();
			const i = !this.qt.conversionState.hasFrameUniformOverrides();
			return t.map((e, s) => this.Eu(e, s, t.length, i));
		}
		hasFrameOverrides() {
			return this.qt.conversionState.hasFrameUniformOverrides() || this.qt.stackState.hasFrameOverrides();
		}
		createBaseUniforms() {
			return this.qt.conversionState.createBaseUniforms(this.qt.getTexture(), this.Cu, this.qt.paletteCache);
		}
		get material() {
			return this.Ts;
		}
		Su(t = this.qt.stackState.getSingleMode(), i = null, e) {
			i || this.qt.beforeMaterialUpdate();
			const s = this.Cu,
				r = this.xu;
			((this.Cu = i), (this.xu = e));
			try {
				const s = i ? this.Tu(t) : this.Fu(),
					r = this.Pu(e),
					n = this.qt.conversionManager.Lu(t, r),
					h = s.createUniforms(r);
				return this.qt.renderer.materialManager.Hs(n, h);
			} finally {
				((this.Cu = s), (this.xu = r));
			}
		}
		Eu(t, i, e, s) {
			if (s && t.material) return t.material;
			const r = { index: i, count: e, mode: t.mode, options: t.options },
				n = this.Su(t.mode, t, r);
			return (s && (t.material = n), n);
		}
		Tu(t) {
			const i = this.qt.conversionManager.Du(t);
			if (!i)
				throw new Error(
					`[textmode.js] Conversion mode "${t}" is not registered. If this mode is provided by an add-on, make sure its plugin is installed before loading sources.`
				);
			return i;
		}
		Fu() {
			const t = this.qt.stackState.getSingleMode();
			if (this.Au && this.Au.id === t) return this.Au;
			const i = this.Tu(t);
			return ((this.Au = i), i);
		}
		Pu(t) {
			const i = this.qt.conversionState.activeGlyphAtlas;
			if (!i)
				throw new Error(
					'[textmode.js] Cannot create conversion context: no active glyph atlas set. Ensure _setActiveFont() is called before rendering.'
				);
			const e = t ?? this.xu,
				s = {
					renderer: this.qt.renderer,
					gl: this.qt.gl,
					font: i,
					glyphAtlas: i,
					source: this.qt.source,
					createBaseUniforms: () => this.createBaseUniforms(),
				};
			return (e && (s.pass = e), s);
		}
	},
	Ki = class extends s {
		As;
		X;
		zn;
		Ru;
		ku;
		o;
		u;
		Nc;
		Ic;
		Ou;
		Bu;
		constructor(t, i, e, s, r, n, h, o, a = $i.Lc) {
			(super(),
				(this.As = t),
				(this.X = i),
				(this.zn = e),
				(this.Ru = r),
				(this.ku = n),
				this.Iu(h, o),
				(this.Nc = new Xi(i.glyphPaletteService)),
				(this.Ic = new Vi(a)),
				(this.Ou = new Hi(this.Ic, this.Nc, (t) => a(t).normalized)),
				(this.Bu = new Yi({
					gl: t,
					renderer: i,
					conversionManager: s,
					source: this,
					stackState: this.Ou,
					conversionState: this.Ic,
					paletteCache: this.Nc,
					getTexture: () => this.zn,
					beforeMaterialUpdate: () => this.Nu(),
				})));
		}
		conversionMode(t) {
			const i = this.Da();
			return (
				this.Ou.setConversionMode(t, i),
				i || (this.Bu.clearStrategyCache(), this.Bu.invalidateMaterials()),
				this
			);
		}
		conversions(t) {
			const i = this.Da(),
				e = this.Ou.setConversions(t, i);
			return (!i && e && this.Bu.invalidateMaterials(), this);
		}
		clearConversions() {
			const t = this.Da();
			return (this.Ou.clearConversions(t), t || this.Bu.invalidateMaterials(), this);
		}
		dispose() {
			(this.zn && (this.As.deleteTexture(this.zn), (this.zn = null)),
				this.Ou.dispose(),
				this.Nc.disposeAll(),
				super.dispose());
		}
		invert(t = !0) {
			return (this.Ic.setInvert(t, this.Da()), this.ju(), this);
		}
		flipX(t = !0) {
			return (this.Ic.setFlipX(t, this.Da()), this.ju(), this);
		}
		flipY(t = !0) {
			return (this.Ic.setFlipY(t, this.Da()), this.ju(), this);
		}
		charRotation(t) {
			return (this.Ic.setCharRotation(t, this.Da()), this.ju(), this);
		}
		brightnessRange(t, i) {
			return (this.zu(t, i), this.Ic.setBrightnessRange(t, i, this.Da()), this.ju(), this);
		}
		charColorMode(t) {
			return (this.Ic.setCharColorMode(t, this.Da()), this.ju(), this);
		}
		cellColorMode(t) {
			return (this.Ic.setCellColorMode(t, this.Da()), this.ju(), this);
		}
		charColor(t, i, e, s) {
			return (this.Qu('char', t, i, e, s), this);
		}
		cellColor(t, i, e, s) {
			return (this.Qu('cell', t, i, e, s), this);
		}
		background(t, i, e, s) {
			return (this.Qu('background', t, i, e, s), this);
		}
		characters(t) {
			return (this.Ic.setCharacters(t, this.Da(), this.Nc), this.ju(), this);
		}
		Ya(t) {
			this.Ic.setActiveGlyphAtlas(t, this.Nc) && (this.Ou.refreshPalettes(), this.Bu.invalidateMaterials());
		}
		get texture() {
			return this.zn;
		}
		get width() {
			return this.o;
		}
		get height() {
			return this.u;
		}
		get originalWidth() {
			return this.Ru;
		}
		get originalHeight() {
			return this.ku;
		}
		rs(t, i) {
			(this.Iu(t, i), this.Bu.invalidateMaterials());
		}
		Qs() {
			return this.Bu.getMaterial();
		}
		Ka() {
			return this.Bu.getMaterials();
		}
		Gu(t) {
			if ((this.Ya(t), this.Ou.getActiveStack()))
				throw new r(
					'[textmode.js] texture() does not support conversion stacks. Call clearConversions() or draw the stacked source with image().',
					{ method: 'texture' }
				);
			const i = this.Ou.getSingleMode();
			if ('brightness' !== i)
				throw new r(
					'[textmode.js] texture() supports the built-in brightness conversion mode only. Use image() for custom conversion modes.',
					{ method: 'texture', conversionMode: i }
				);
			return this.Ic.createGeometryTextureSnapshot(this, this.Nc);
		}
		aa() {}
		Ia() {
			(this.Ic.clearFrameOverrides(this.Nc), this.Ou.clearFrameOverrides());
		}
		Za() {
			return this.Bu.hasFrameOverrides();
		}
		Nu() {}
		$u() {
			this.Bu.invalidateMaterials();
		}
		Hu() {
			return {
				sourceState: this.Ic.debugSnapshot,
				stackState: this.Ou.debugSnapshot,
				material: this.Bu.material,
				basePalette: this.Nc.basePalette,
				framePalette: this.Nc.framePalette,
			};
		}
		Iu(t, i) {
			const { width: e, height: s } = (function (t, i, e, s) {
				const r = Math.min(e / t, s / i);
				return {
					width: Math.max(1, Math.min(e, Math.round(t * r))),
					height: Math.max(1, Math.min(s, Math.round(i * r))),
					scale: r,
				};
			})(this.Ru, this.ku, t, i);
			((this.o = e), (this.u = s));
		}
		Qu(t, i, e, s, r) {
			(this.Ic.setColor(t, this.Da(), i, e, s, r), this.ju());
		}
		ju() {
			this.Da() || this.Bu.invalidateMaterials();
		}
		Da() {
			return this.X.Na();
		}
		zu(t, i) {
			const e = { method: 'brightnessRange', start: t, end: i };
			if (!Number.isFinite(t) || !Number.isFinite(i))
				throw new r('[textmode.js] brightness range values must be finite numbers.', e);
			if (t < 0 || t > 255 || i < 0 || i > 255)
				throw new r('[textmode.js] brightness range values must be between 0 and 255.', e);
			if (t > i) throw new r('[textmode.js] brightness range start must be less than or equal to end.', e);
		}
	},
	Zi = class {
		Xu;
		Vu;
		Yu = null;
		Ku = 0;
		Zu = null;
		Wu = null;
		qu = !0;
		Ju = 0;
		tl = 0;
		il = [];
		el = 10;
		sl = 0;
		rl = 0;
		nl = -1;
		constructor(t = 60) {
			((this.Vu = t), (this.Xu = 1e3 / t));
		}
		hl(t, i) {
			if (((this.Zu = t), void 0 !== i && (this.Wu = i), !this.ol())) return;
			if ((-1 === this.nl && (this.nl = performance.now()), null !== this.Yu)) return;
			this.Ku = performance.now();
			const e = (t) => {
				if (!this.ol()) return void (this.Yu = null);
				const i = 'number' == typeof t ? t : performance.now(),
					s = i - this.Ku;
				(s >= this.Xu && (this.Zu?.(), (this.Ku = i - (s % this.Xu))),
					this.ol() ? (this.Yu = requestAnimationFrame(e)) : (this.Yu = null));
			};
			this.Yu = requestAnimationFrame(e);
		}
		al() {
			null !== this.Yu && (cancelAnimationFrame(this.Yu), (this.Yu = null));
		}
		cl() {
			this.qu && ((this.qu = !1), this.ol() || this.al());
		}
		ul(t) {
			this.qu || ((this.qu = !0), this.hl(t));
		}
		ll(t, i) {
			if (void 0 === t) return this.Ju;
			((this.Vu = t), (this.Xu = 1e3 / t), null !== this.Yu && i && (this.al(), this.hl(i)));
		}
		fl() {
			const t = performance.now();
			if (this.tl > 0) {
				const i = t - this.tl;
				((this.sl = i), this.il.push(i), this.il.length > this.el && this.il.shift());
				const e = this.il.reduce((t, i) => t + i, 0) / this.il.length;
				this.Ju = 1e3 / e;
			}
			this.tl = t;
		}
		dl(t) {
			((this.Vu = t), (this.Xu = 1e3 / t));
		}
		ol() {
			return this.qu || !0 === this.Wu?.();
		}
		_l() {
			this.rl++;
		}
		get pl() {
			return -1 === this.nl ? 0 : performance.now() - this.nl;
		}
		set pl(t) {
			this.nl = performance.now() - t;
		}
		get ml() {
			return this.pl / 1e3;
		}
		set ml(t) {
			this.pl = 1e3 * t;
		}
	};
function Wi(t, i, e) {
	return t ? t.P(i, e) : { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY };
}
var qi = class {
		vl = [];
		yl(t, i, e, s) {
			const r = e;
			(void 0 === s ? t.addEventListener(i, r) : t.addEventListener(i, r, s),
				this.vl.push({ target: t, type: i, listener: r, capture: 'boolean' == typeof s ? s : s?.capture }));
		}
		wl() {
			for (let t = this.vl.length - 1; t >= 0; t -= 1) {
				const { target: i, type: e, listener: s, capture: r } = this.vl[t];
				void 0 === r ? i.removeEventListener(e, s) : i.removeEventListener(e, s, r);
			}
			this.vl = [];
		}
	},
	Ji = ['keyPressed', 'keyTyped', 'keyReleased'],
	te = [
		'mouseClicked',
		'doubleClicked',
		'mousePressed',
		'mouseReleased',
		'mouseMoved',
		'mouseDragged',
		'mouseScrolled',
	],
	ie = ['touchStarted', 'touchMoved', 'touchEnded', 'touchCancelled'],
	ee = ['tap', 'doubleTap', 'longPress', 'swipe', 'pinch', 'rotateGesture'],
	se = [
		'gamepadConnected',
		'gamepadDisconnected',
		'gamepadButtonPressed',
		'gamepadButtonReleased',
		'gamepadAxisChanged',
	],
	re = [...Ji, ...te, ...ie, ...ee, ...se],
	ne = class {
		vl = {};
		bl(t, i) {
			const e = (this.vl[t] ??= []),
				s = { fn: i, once: !1 };
			return (e.push(s), () => this.Ml(t, i));
		}
		Ml(t, i) {
			const e = this.vl[t];
			if (!e) return;
			const s = e.findIndex((t) => t.fn === i);
			-1 !== s && e.splice(s, 1);
		}
		Al(t, i) {
			const e = (this.vl[t] ??= []),
				s = { fn: i, once: !0 };
			return (e.push(s), () => this.Ml(t, i));
		}
		Cl(t, ...i) {
			const e = this.vl[t];
			if (!e || 0 === e.length) return;
			const s = e.slice();
			for (const r of s) {
				if (r.once) {
					const t = e.indexOf(r);
					-1 !== t && e.splice(t, 1);
				}
				r.fn(...i);
			}
		}
		xl(t) {
			const i = this.vl[t];
			return !!i && i.length > 0;
		}
		wl(t) {
			void 0 !== t ? delete this.vl[t] : (this.vl = {});
		}
	},
	he = class {
		p;
		Sl;
		El = { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY };
		Tl = { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY };
		Fl = { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY };
		Pl = { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY };
		Ll = { x: 0, y: 0 };
		Dl = { x: 0, y: 0 };
		Rl = !1;
		kl = null;
		Ol = 0;
		vl = new qi();
		Bl = !1;
		Il;
		constructor(t, i, e) {
			((this.p = t), (this.Sl = i), (this.Il = e));
		}
		Nl(t) {
			const i = performance.now() + Math.max(0, t);
			i > this.Ol && (this.Ol = i);
		}
		jl() {
			return performance.now() < this.Ol;
		}
		zl(t) {
			this.p.canvas.style.cursor = null == t || '' === t ? '' : t;
		}
		Ql() {
			const t = this.p.canvas;
			return 'function' == typeof t.requestPointerLock && (t.requestPointerLock(), !0);
		}
		Gl() {
			this.$l() && 'function' == typeof document.exitPointerLock && document.exitPointerLock();
		}
		Hl() {
			if (this.Bl) return;
			const t = this.p.canvas;
			(this.vl.yl(
				t,
				'mousemove',
				(t) => {
					(this.Xl(t), this.Vl(t));
				},
				{ passive: !0 }
			),
				this.vl.yl(
					t,
					'mouseleave',
					() => {
						((this.Tl = { ...this.El }),
							(this.El.x = Number.NEGATIVE_INFINITY),
							(this.El.y = Number.NEGATIVE_INFINITY),
							(this.kl = null));
					},
					{ passive: !0 }
				),
				this.vl.yl(
					t,
					'mousedown',
					(t) => {
						(this.Xl(t), this.Yl(t));
					},
					{ passive: !0 }
				),
				this.vl.yl(
					t,
					'mouseup',
					(t) => {
						(this.Xl(t), this.Kl(t));
					},
					{ passive: !0 }
				),
				this.vl.yl(
					t,
					'click',
					(t) => {
						(this.Xl(t), this.Zl(t));
					},
					{ passive: !0 }
				),
				this.vl.yl(
					t,
					'dblclick',
					(t) => {
						(this.Xl(t), this.Wl(t));
					},
					{ passive: !0 }
				),
				this.vl.yl(
					t,
					'wheel',
					(t) => {
						(this.Xl(t), this.ql(t));
					},
					{ passive: !1 }
				),
				this.vl.yl(
					window,
					'mouseup',
					() => {
						this.Rl = !1;
					},
					{ passive: !0 }
				),
				this.vl.yl(window, 'blur', () => {
					this.Rl = !1;
				}),
				(this.Bl = !0));
		}
		Jl() {
			this.Bl &&
				(this.vl.wl(),
				(this.Bl = !1),
				this.Gl(),
				(this.Rl = !1),
				(this.Ll = { x: 0, y: 0 }),
				(this.Dl = { x: 0, y: 0 }));
		}
		tf() {
			if (this.Bl)
				try {
					if (this.kl) {
						const t = new MouseEvent('mousemove', {
							clientX: this.kl.x,
							clientY: this.kl.y,
							bubbles: !1,
							cancelable: !1,
						});
						this.Xl(t);
					}
				} catch (t) {
					((this.El.x = Number.NEGATIVE_INFINITY), (this.El.y = Number.NEGATIVE_INFINITY));
				}
		}
		if() {
			return { x: this.El.x, y: this.El.y };
		}
		ef() {
			return { x: this.Fl.x, y: this.Fl.y };
		}
		sf() {
			return this.Ll.x;
		}
		rf() {
			return this.Ll.y;
		}
		nf() {
			return this.Rl;
		}
		hf() {
			((this.Fl = { ...this.Pl }),
				(this.Pl = { ...this.El }),
				(this.Ll = { ...this.Dl }),
				(this.Dl = { x: 0, y: 0 }));
		}
		af(t, i = {}) {
			return { position: { ...this.El }, previousPosition: { ...this.Tl }, originalEvent: t, ...i };
		}
		Vl(t) {
			this.jl() ||
				(this.cf(t)
					? this.Il.Cl('mouseDragged', this.af(t, { button: this.uf(t) }))
					: this.Il.Cl('mouseMoved', this.af(t)));
		}
		Yl(t) {
			this.jl() || ((this.Rl = !0), this.Il.Cl('mousePressed', this.af(t, { button: t.button })));
		}
		Kl(t) {
			this.jl() || ((this.Rl = !1), this.Il.Cl('mouseReleased', this.af(t, { button: t.button })));
		}
		Zl(t) {
			this.jl() || this.Il.Cl('mouseClicked', this.af(t, { button: t.button }));
		}
		Wl(t) {
			this.jl() || this.Il.Cl('doubleClicked', this.af(t, { button: t.button }));
		}
		ql(t) {
			this.jl() || this.Il.Cl('mouseScrolled', this.af(t, { delta: { x: t.deltaX, y: t.deltaY } }));
		}
		Xl(t) {
			const i = this.Sl();
			if (
				((this.Tl = { ...this.El }),
				t instanceof MouseEvent && 'mousemove' === t.type && this.lf(t),
				t instanceof MouseEvent && 'mousemove' === t.type && this.$l())
			)
				return;
			this.kl = { x: t.clientX, y: t.clientY };
			const e = Wi(i, t.clientX, t.clientY);
			((this.El.x = e.x), (this.El.y = e.y));
		}
		cf(t) {
			return 0 !== t.buttons;
		}
		uf(t) {
			return 1 & t.buttons
				? 0
				: 4 & t.buttons
					? 1
					: 2 & t.buttons
						? 2
						: 8 & t.buttons
							? 3
							: 16 & t.buttons
								? 4
								: void 0;
		}
		lf(t) {
			if (this.$l()) return ((this.Dl.x += t.movementX), void (this.Dl.y += t.movementY));
			this.kl && ((this.Dl.x += t.clientX - this.kl.x), (this.Dl.y += t.clientY - this.kl.y));
		}
		$l() {
			return document.pointerLockElement === this.p.canvas;
		}
	},
	oe = class {
		ff = /* @__PURE__ */ new Map();
		df = null;
		_f = null;
		vl = new qi();
		Bl = !1;
		Il;
		pf = {
			ArrowUp: 'UP_ARROW',
			ArrowDown: 'DOWN_ARROW',
			ArrowLeft: 'LEFT_ARROW',
			ArrowRight: 'RIGHT_ARROW',
			F1: 'F1',
			F2: 'F2',
			F3: 'F3',
			F4: 'F4',
			F5: 'F5',
			F6: 'F6',
			F7: 'F7',
			F8: 'F8',
			F9: 'F9',
			F10: 'F10',
			F11: 'F11',
			F12: 'F12',
			Enter: 'ENTER',
			Return: 'RETURN',
			Tab: 'TAB',
			Escape: 'ESCAPE',
			Backspace: 'BACKSPACE',
			Delete: 'DELETE',
			Insert: 'INSERT',
			Home: 'HOME',
			End: 'END',
			PageUp: 'PAGE_UP',
			PageDown: 'PAGE_DOWN',
			Shift: 'SHIFT',
			Control: 'CONTROL',
			Alt: 'ALT',
			Meta: 'META',
			' ': 'SPACE',
		};
		constructor(t) {
			this.Il = t;
		}
		Hl() {
			this.Bl ||
				(this.vl.yl(
					window,
					'keydown',
					(t) => {
						this.mf(t);
					},
					{ passive: !1 }
				),
				this.vl.yl(
					window,
					'keyup',
					(t) => {
						this.vf(t);
					},
					{ passive: !1 }
				),
				(this.Bl = !0));
		}
		Jl() {
			this.Bl && (this.vl.wl(), (this.Bl = !1), this.ff.clear(), (this.df = null), (this._f = null));
		}
		gf(t) {
			const i = this.yf(t);
			return (this.ff.get(t) || this.ff.get(i))?.isPressed || !1;
		}
		wf() {
			return this.df;
		}
		bf() {
			return this._f;
		}
		Mf() {
			const t = [];
			for (const [i, e] of this.ff) e.isPressed && t.push(i);
			return t;
		}
		Af() {
			return { ctrl: this.gf('Control'), shift: this.gf('Shift'), alt: this.gf('Alt'), meta: this.gf('Meta') };
		}
		Cf() {
			(this.ff.clear(), (this.df = null), (this._f = null));
		}
		mf(t) {
			const i = t.key,
				e = Date.now();
			this.ff.has(i) || this.ff.set(i, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
			const s = this.ff.get(i);
			s.isPressed ||
				((s.isPressed = !0),
				(s.lastPressTime = e),
				(this.df = i),
				this.Il.Cl('keyPressed', this.af(i, !0, t)),
				this.xf(t) && this.Il.Cl('keyTyped', this.af(i, !0, t)));
		}
		af(t, i, e) {
			return {
				key: t,
				keyCode: e.keyCode,
				ctrlKey: e.ctrlKey,
				shiftKey: e.shiftKey,
				altKey: e.altKey,
				metaKey: e.metaKey,
				isPressed: i,
				originalEvent: e,
			};
		}
		vf(t) {
			const i = t.key,
				e = Date.now();
			this.ff.has(i) || this.ff.set(i, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
			const s = this.ff.get(i);
			((s.isPressed = !1), (s.lastReleaseTime = e), (this._f = i), this.Il.Cl('keyReleased', this.af(i, !1, t)));
		}
		yf(t) {
			return this.pf[t] || t.toLowerCase();
		}
		xf(t) {
			return !(t.ctrlKey || t.altKey || t.metaKey) && 'Dead' !== t.key && 1 === Array.from(t.key).length;
		}
	},
	ae = class {
		Sf;
		Ef;
		Tf = /* @__PURE__ */ new Map();
		Ff = null;
		Pf = 320;
		Lf = 350;
		Df = 10;
		Rf = 550;
		kf = 14;
		Of = 48;
		Bf = 650;
		If = 0.02;
		Nf = 2;
		jf = 0;
		zf = null;
		constructor(t, i) {
			((this.Sf = t), (this.Ef = i));
		}
		gh() {
			(this.Tf.forEach((t) => {
				null !== t.timer && window.clearTimeout(t.timer);
			}),
				this.Tf.clear(),
				(this.Ff = null),
				(this.jf = 0),
				(this.zf = null));
		}
		Qf(t, i) {
			const e = { timer: null, fired: !1 };
			((e.timer = window.setTimeout(() => {
				this.Tf.has(t.id) &&
					((e.fired = !0),
					this.Ef.Cl('longPress', {
						touch: this.Gf(t.lastPosition),
						duration: performance.now() - t.startTime,
						originalEvent: i,
					}));
			}, this.Rf)),
				this.Tf.set(t.id, e));
		}
		$f(t, i) {
			const e = this.Tf.get(t.id);
			e &&
				i &&
				z(i.clientX, i.clientY, t.lastPosition.clientX, t.lastPosition.clientY) > this.kf &&
				null !== e.timer &&
				(window.clearTimeout(e.timer), (e.timer = null));
		}
		Hf(t, i) {
			const e = this.Tf.get(t.id);
			(e && null !== e.timer && (window.clearTimeout(e.timer), (e.timer = null)),
				this.Xf(t, i, e?.fired ?? !1),
				this.Tf.delete(t.id));
		}
		Vf(t) {
			const i = this.Tf.get(t);
			(i && null !== i.timer && window.clearTimeout(i.timer), this.Tf.delete(t));
		}
		Yf(t) {
			if (2 !== t.size) return void (this.Ff = null);
			const [i, e] = Array.from(t.values()),
				s = [i.id, e.id];
			if (this.Ff && this.Ff.ids[0] === s[0] && this.Ff.ids[1] === s[1]) return;
			const r = z(i.x, i.y, e.x, e.y),
				n = j(i.clientX, i.clientY, e.clientX, e.clientY);
			this.Ff = { ids: s, initialDistance: Math.max(r, 1e-4), initialAngle: n, lastScale: 1, lastRotation: 0 };
		}
		Kf(t, i) {
			if ((this.Yf(t), !this.Ff)) return;
			const [e, s] = this.Ff.ids,
				r = t.get(e),
				n = t.get(s);
			if (!r || !n) return;
			const h = z(r.x, r.y, n.x, n.y) / this.Ff.initialDistance,
				o = h - this.Ff.lastScale;
			Math.abs(o) > this.If &&
				(this.Ef.Cl('pinch', {
					touches: [this.Gf(r), this.Gf(n)],
					scale: h,
					deltaScale: o,
					center: this.Zf(r, n),
					originalEvent: i,
				}),
				(this.Ff.lastScale = h));
			let a = j(r.clientX, r.clientY, n.clientX, n.clientY) - this.Ff.initialAngle;
			a = ((a + 180) % 360) - 180;
			const c = a - this.Ff.lastRotation;
			Math.abs(c) > this.Nf &&
				(this.Ef.Cl('rotateGesture', {
					touches: [this.Gf(r), this.Gf(n)],
					rotation: a,
					deltaRotation: c,
					center: this.Zf(r, n),
					originalEvent: i,
				}),
				(this.Ff.lastRotation = a));
		}
		Zf(t, i) {
			const e = (t.clientX + i.clientX) / 2,
				s = (t.clientY + i.clientY) / 2,
				r = this.Sf(e, s);
			return { x: r.x, y: r.y };
		}
		Xf(t, i, e) {
			const s = performance.now(),
				r = s - t.startTime,
				n = t.lastPosition.clientX - t.startPosition.clientX,
				h = t.lastPosition.clientY - t.startPosition.clientY,
				o = Math.hypot(n, h);
			if (!e && r <= this.Pf && o <= this.Df)
				this.Wf(t.lastPosition, s)
					? this.Ef.Cl('doubleTap', { touch: this.Gf(t.lastPosition), taps: 2, originalEvent: i })
					: this.Ef.Cl('tap', { touch: this.Gf(t.lastPosition), taps: 1, originalEvent: i });
			else if (!e && r <= this.Bf && o >= this.Of) {
				const e = Math.max(o, 1e-4),
					s = { x: n / e, y: h / e },
					a = { x: n / r, y: h / r };
				this.Ef.Cl('swipe', {
					touch: this.Gf(t.lastPosition),
					direction: s,
					distance: e,
					velocity: a,
					originalEvent: i,
				});
			}
			((this.jf = s), (this.zf = this.Gf(t.lastPosition)));
		}
		Wf(t, i) {
			return (
				!!this.zf &&
				!(i - this.jf > this.Lf) &&
				z(t.clientX, t.clientY, this.zf.clientX, this.zf.clientY) <= this.Df
			);
		}
		Gf(t) {
			return { ...t };
		}
	},
	ce = class {
		p;
		qf;
		Sl;
		Jf;
		td = /* @__PURE__ */ new Map();
		ed = /* @__PURE__ */ new Map();
		sd = /* @__PURE__ */ new Map();
		rd;
		nd;
		vl = new qi();
		Bl = !1;
		Il;
		hd = 600;
		constructor(t, i, e, s) {
			((this.p = t),
				(this.Sl = i),
				(this.Il = e),
				(this.qf = s),
				(this.Jf = new ae((t, i) => Wi(this.Sl(), t, i), this.Il)));
			const r = this.p.canvas;
			((this.rd = r.style.touchAction),
				(this.nd = r.style.userSelect),
				r.style.touchAction || (r.style.touchAction = 'none'),
				r.style.userSelect || (r.style.userSelect = 'none'));
		}
		Hl() {
			if (this.Bl) return;
			const t = this.p.canvas;
			(this.vl.yl(
				t,
				'touchstart',
				(t) => {
					this.od(t);
				},
				{ passive: !1 }
			),
				this.vl.yl(
					t,
					'touchmove',
					(t) => {
						this.ad(t);
					},
					{ passive: !1 }
				),
				this.vl.yl(
					t,
					'touchend',
					(t) => {
						this.ud(t);
					},
					{ passive: !1 }
				),
				this.vl.yl(
					t,
					'touchcancel',
					(t) => {
						this.ld(t);
					},
					{ passive: !1 }
				),
				(this.Bl = !0));
		}
		Jl() {
			if (!this.Bl) return;
			const t = this.p.canvas;
			(this.vl.wl(),
				(this.Bl = !1),
				this.td.clear(),
				this.ed.clear(),
				this.sd.clear(),
				this.Jf.gh(),
				(t.style.touchAction = this.rd),
				(t.style.userSelect = this.nd));
		}
		tf() {
			if (!this.Sl() || 0 === this.td.size) return;
			const t = /* @__PURE__ */ new Map();
			for (const i of this.td.values()) {
				const e = this.Sf(i.clientX, i.clientY, i.id, i);
				t.set(i.id, e);
				const s = this.sd.get(i.id);
				s && (s.lastPosition = e);
			}
			this.td = t;
		}
		fd() {
			return Array.from(this.td.values()).map((t) => ({ ...t }));
		}
		od(t) {
			if (!this.Sl()) return;
			(t.preventDefault(), this.qf?.Nl(this.hd));
			const i = performance.now(),
				e = this.dd(t.changedTouches);
			for (const s of e) {
				const e = this.td.get(s.id);
				(e && this.ed.set(s.id, this.Gf(e)), this.td.set(s.id, s));
				const r = { id: s.id, startPosition: s, lastPosition: s, startTime: i, lastTime: i };
				(this.sd.set(s.id, r), this.Jf.Qf(r, t), this.Il.Cl('touchStarted', this._d(s, t, void 0, i)));
			}
			this.Jf.Yf(this.td);
		}
		ad(t) {
			if (!this.Sl()) return;
			(t.preventDefault(), this.qf?.Nl(this.hd));
			const i = performance.now(),
				e = this.dd(t.changedTouches);
			for (const s of e) {
				const e = this.td.get(s.id),
					r = e ? this.Gf(e) : void 0;
				(r && this.ed.set(s.id, r), this.td.set(s.id, s));
				const n = this.sd.get(s.id);
				(n && ((n.lastPosition = s), (n.lastTime = i), this.Jf.$f(n, r)),
					this.Il.Cl('touchMoved', this._d(s, t, r, i)));
			}
			this.Jf.Kf(this.td, t);
		}
		ud(t) {
			if (!this.Sl()) return;
			t.preventDefault();
			const i = performance.now(),
				e = this.dd(t.changedTouches);
			for (const s of e) {
				const e = this.td.get(s.id),
					r = e ? this.Gf(e) : void 0,
					n = this.sd.get(s.id);
				(this.Il.Cl('touchEnded', this._d(s, t, r, i)),
					n && this.Jf.Hf(n, t),
					this.sd.delete(s.id),
					this.ed.delete(s.id),
					this.td.delete(s.id));
			}
			this.Jf.Yf(this.td);
		}
		ld(t) {
			if (!this.Sl()) return;
			t.preventDefault();
			const i = performance.now(),
				e = this.dd(t.changedTouches);
			for (const s of e) {
				const e = this.td.get(s.id),
					r = e ? this.Gf(e) : void 0;
				(this.Il.Cl('touchCancelled', this._d(s, t, r, i)),
					this.Jf.Vf(s.id),
					this.sd.delete(s.id),
					this.ed.delete(s.id),
					this.td.delete(s.id));
			}
			this.Jf.Yf(this.td);
		}
		dd(t) {
			const i = [];
			for (let e = 0; e < t.length; e += 1) {
				const s = t.item(e);
				s && i.push(this.pd(s));
			}
			return i;
		}
		pd(t) {
			return this.Sf(t.clientX, t.clientY, t.identifier, {
				id: t.identifier,
				x: -1,
				y: -1,
				clientX: t.clientX,
				clientY: t.clientY,
				pressure: t.force,
				radiusX: t.radiusX,
				radiusY: t.radiusY,
				rotationAngle: t.rotationAngle,
			});
		}
		Sf(t, i, e, s) {
			const r = Wi(this.Sl(), t, i);
			return {
				id: e,
				x: r.x,
				y: r.y,
				clientX: t,
				clientY: i,
				pressure: s.pressure,
				radiusX: s.radiusX,
				radiusY: s.radiusY,
				rotationAngle: s.rotationAngle,
			};
		}
		_d(t, i, e, s) {
			const r = this.sd.get(t.id),
				n = Array.from(this.ed.values()).map((t) => this.Gf(t)),
				h = Array.from(this.td.values()).map((t) => this.Gf(t)),
				o = this.dd(i.changedTouches);
			return {
				touch: this.Gf(t),
				previousTouch: e ? this.Gf(e) : void 0,
				touches: h,
				previousTouches: n,
				changedTouches: o,
				deltaTime: r ? s - r.lastTime : 0,
				originalEvent: i,
			};
		}
		Gf(t) {
			return { ...t };
		}
	},
	ue = {
		south: 0,
		east: 1,
		west: 2,
		north: 3,
		l1: 4,
		r1: 5,
		l2: 6,
		r2: 7,
		select: 8,
		start: 9,
		leftStickPress: 10,
		rightStickPress: 11,
		dpadUp: 12,
		dpadDown: 13,
		dpadLeft: 14,
		dpadRight: 15,
		home: 16,
	},
	le = { leftStickX: 0, leftStickY: 1, rightStickX: 2, rightStickY: 3 },
	fe = new Map(Object.entries(ue).map(([t, i]) => [i, t])),
	de = new Map(Object.entries(le).map(([t, i]) => [i, t]));
function _e(t, i) {
	const e = Array.from(t.buttons, (t) => ({
			pressed: Boolean(t.pressed),
			touched: void 0 === t.touched ? void 0 : Boolean(t.touched),
			value: t.value,
		})),
		s = Array.from(t.axes, (t) => t),
		r = 'standard' === t.mapping ? 'standard' : '',
		n = {
			index: t.index,
			id: t.id,
			connected: Boolean(t.connected),
			mapping: r,
			timestamp: t.timestamp,
			buttons: e,
			axes: s,
		};
	return (
		'standard' === r &&
			(n.standard = (function (t, i, e) {
				const s = t[ue.home];
				return {
					faceButtons: {
						south: pe(t, ue.south),
						east: pe(t, ue.east),
						west: pe(t, ue.west),
						north: pe(t, ue.north),
					},
					shoulders: { l1: pe(t, ue.l1), r1: pe(t, ue.r1), l2: pe(t, ue.l2), r2: pe(t, ue.r2) },
					center: {
						select: pe(t, ue.select),
						start: pe(t, ue.start),
						leftStickPress: pe(t, ue.leftStickPress),
						rightStickPress: pe(t, ue.rightStickPress),
						...(s ? { home: pe(t, ue.home) } : {}),
					},
					dpad: {
						up: pe(t, ue.dpadUp),
						down: pe(t, ue.dpadDown),
						left: pe(t, ue.dpadLeft),
						right: pe(t, ue.dpadRight),
					},
					leftStick: me(i, le.leftStickX, le.leftStickY, e),
					rightStick: me(i, le.rightStickX, le.rightStickY, e),
				};
			})(e, s, i)),
		n
	);
}
function pe(t, i) {
	return t[i] ?? { pressed: !1, value: 0 };
}
function me(t, i, e, s) {
	const r = t[i] ?? 0,
		n = t[e] ?? 0,
		h = Math.hypot(r, n);
	return h <= s ? { x: 0, y: 0, magnitude: 0 } : { x: r, y: n, magnitude: h };
}
var ve = { axisDeadzone: 0.15, axisChangeEpsilon: 0.01, buttonPressThreshold: 0.5, buttonReleaseThreshold: 0.45 },
	ge = class {
		md;
		vd = [];
		gd = /* @__PURE__ */ new Map();
		yd = /* @__PURE__ */ new Map();
		vl = new qi();
		Bl = !1;
		wd = /* @__PURE__ */ new Set();
		bd = /* @__PURE__ */ new Set();
		Il;
		constructor(t, i = {}) {
			((this.md = { ...ve, ...i }), (this.Il = t));
		}
		Hl() {
			this.Bl ||
				(this.vl.yl(window, 'gamepadconnected', (t) => {
					const i = t.gamepad;
					i && (this.wd.add(i.index), this.bd.delete(i.index));
				}),
				this.vl.yl(window, 'gamepaddisconnected', (t) => {
					const i = t.gamepad;
					i && (this.bd.add(i.index), this.wd.delete(i.index));
				}),
				(this.Bl = !0));
		}
		Jl() {
			this.Bl &&
				(this.vl.wl(),
				(this.Bl = !1),
				this.wd.clear(),
				this.bd.clear(),
				(this.vd = []),
				this.gd.clear(),
				this.yd.clear());
		}
		hf() {
			const t = /* @__PURE__ */ new Map();
			for (const i of this.Md()) {
				if (!i || !i.connected) continue;
				const e = _e(i, this.md.axisDeadzone);
				t.set(e.index, e);
			}
			for (const [i, e] of this.gd)
				t.has(i) || this.Il.Cl('gamepadDisconnected', { gamepad: { ...e, connected: !1 } });
			for (const [i, e] of t) this.gd.has(i) || this.Il.Cl('gamepadConnected', { gamepad: e });
			for (const [i, e] of t) {
				const t = this.gd.get(i);
				t && (this.Ad(e, t), this.Cd(e, t));
			}
			((this.yd = this.gd),
				(this.gd = t),
				(this.vd = Array.from(t.values()).sort((t, i) => t.index - i.index)),
				this.wd.clear(),
				this.bd.clear());
		}
		xd() {
			return this.vd;
		}
		Sd(t) {
			return this.gd.get(t);
		}
		Ed(t, i) {
			if ('standard' === i)
				return (function (t, i) {
					if ('standard' === i) return fe.get(t);
				})(t, i);
		}
		Td(t, i) {
			if ('standard' === i)
				return (function (t, i) {
					if ('standard' === i) return de.get(t);
				})(t, i);
		}
		Ad(t, i) {
			const e = Math.max(t.buttons.length, i.buttons.length);
			for (let s = 0; s < e; s++) {
				const e = t.buttons[s] ?? { pressed: !1, value: 0 },
					r = i.buttons[s] ?? { pressed: !1, value: 0 },
					n = r.value >= this.md.buttonPressThreshold;
				e.value >= this.md.buttonPressThreshold &&
					!n &&
					this.Il.Cl('gamepadButtonPressed', {
						gamepad: t,
						buttonIndex: s,
						button: e,
						previousButton: r,
						standardButtonName: this.Ed(s, t.mapping),
					});
				const h = r.value >= this.md.buttonReleaseThreshold;
				e.value >= this.md.buttonReleaseThreshold ||
					!h ||
					this.Il.Cl('gamepadButtonReleased', {
						gamepad: t,
						buttonIndex: s,
						button: e,
						previousButton: r,
						standardButtonName: this.Ed(s, t.mapping),
					});
			}
		}
		Cd(t, i) {
			const e = Math.max(t.axes.length, i.axes.length);
			for (let s = 0; s < e; s++) {
				const e = t.axes[s] ?? 0,
					r = i.axes[s] ?? 0,
					n = e - r;
				(Math.abs(r) <= this.md.axisDeadzone != Math.abs(e) <= this.md.axisDeadzone ||
					Math.abs(n) >= this.md.axisChangeEpsilon) &&
					this.Il.Cl('gamepadAxisChanged', {
						gamepad: t,
						axisIndex: s,
						value: e,
						previousValue: r,
						delta: n,
						standardAxisName: this.Td(s, t.mapping),
					});
			}
		}
		Md() {
			const t = navigator;
			if ('function' != typeof t.getGamepads) return [];
			const i = t.getGamepads.call(navigator);
			return Array.from(i ?? []);
		}
	},
	ye = class {
		ns;
		Fd = /* @__PURE__ */ new Map();
		Pd = /* @__PURE__ */ new Set();
		constructor(t) {
			this.ns = t;
		}
		Ld(t) {
			if (!this.Pd.has(t)) {
				this.Pd.add(t);
				for (const [i, e] of this.Fd)
					for (const s of e) 'layer' === s.target && this.Dd(t, i, s.propertyName, s.descriptor);
			}
		}
		Rd(t) {
			for (const i of this.Fd.values())
				for (const e of i)
					'layer' === e.target &&
						Object.getOwnPropertyDescriptor(t, e.propertyName)?.configurable &&
						delete t[e.propertyName];
			this.Pd.delete(t);
		}
		kd(t, i, e, s) {
			(this.Od(t, i, e, s), this.Bd(t, i, e));
			const r = this.Id(i);
			for (const o of r) this.Nd(o, t, e);
			for (const o of r) this.Dd(o, t, e, s);
			const n = { target: i, propertyName: e, descriptor: s },
				h = this.Fd.get(t) ?? [];
			return (h.push(n), this.Fd.set(t, h), () => this.jd(t, i, e));
		}
		jd(t, i, e) {
			const s = this.Fd.get(t),
				r = s?.find((t) => t.target === i && t.propertyName === e);
			if (!r) return;
			for (const h of this.Id(i)) Object.getOwnPropertyDescriptor(h, e)?.configurable && delete h[e];
			const n = s.filter((t) => t !== r);
			0 === n.length ? this.Fd.delete(t) : this.Fd.set(t, n);
		}
		zd(t) {
			const i = [...(this.Fd.get(t) ?? [])];
			for (const e of i) this.jd(t, e.target, e.propertyName);
		}
		Id(t) {
			return 'textmodifier' === t ? [this.ns] : [...this.Pd];
		}
		Dd(t, i, e, s) {
			(this.Nd(t, i, e),
				s.value
					? Object.defineProperty(t, e, { value: s.value, writable: !0, configurable: !0 })
					: Object.defineProperty(t, e, { get: s.get, set: s.set, configurable: !0 }));
		}
		Bd(t, i, e) {
			for (const [s, n] of this.Fd)
				if (n.some((t) => t.target === i && t.propertyName === e))
					throw new r(
						`Plugin "${t}" attempted to register ${i} method "${e}" which is already provided by plugin "${s}".`
					);
		}
		Nd(t, i, e) {
			let s = t;
			for (; s && !Object.prototype.hasOwnProperty.call(s, e);) s = Object.getPrototypeOf(s);
			if (s && s !== Object.prototype) throw new r(`Plugin "${i}" attempted to extend reserved property "${e}".`);
		}
		Od(t, i, e, s) {
			const n = 'function' == typeof s.value,
				h = 'function' == typeof s.get || 'function' == typeof s.set;
			if (!e || n === h) throw new r(`Plugin "${t}" supplied an invalid ${i} extension descriptor.`);
		}
	},
	we = class {
		ns;
		Qd = /* @__PURE__ */ new Map();
		Gd = /* @__PURE__ */ new Map();
		$d = [];
		Hd = /* @__PURE__ */ new Map();
		Xd = /* @__PURE__ */ new Map();
		Vd;
		constructor(t) {
			((this.ns = t), (this.Vd = new ye(t)));
		}
		Yd(t) {
			this.Kd();
			const i = [],
				e = [];
			try {
				for (const n of t) {
					if (this.Qd.has(n.name)) {
						console.warn(`[textmode.js] Plugin "${n.name}" is already installed.`);
						continue;
					}
					const t = this.Zd(n.name);
					let h;
					try {
						const i = n.install(this.ns, t);
						if (be(i))
							throw (
								Promise.resolve(i).catch(() => {}),
								new TypeError(
									`Plugin "${n.name}" returned a promise from install(); asynchronous work belongs in the preSetup hook.`
								)
							);
						'function' == typeof i && (h = i);
					} catch (s) {
						try {
							this.Wd(n.name, s);
						} catch (r) {
							e.push(r);
						}
						throw s;
					}
					(this.Qd.set(n.name, n), h && this.Gd.set(n.name, h), this.$d.push(n.name), i.push(n.name));
				}
			} catch (s) {
				for (const t of [...i].reverse())
					try {
						this.qd(t);
					} catch (r) {
						e.push(r);
					}
				if (e.length > 0)
					throw new AggregateError(e, 'Plugin installation failed and cleanup also failed.', { cause: s });
				throw s;
			}
		}
		qd(t) {
			if (!this.Qd.get(t)) return;
			let i;
			try {
				const i = this.Gd.get(t)?.();
				if (be(i))
					throw (
						Promise.resolve(i).catch(() => {}),
						new TypeError(`Plugin "${t}" returned a promise from its cleanup function.`)
					);
			} catch (e) {
				i = e;
			} finally {
				(this.Qd.delete(t), this.Gd.delete(t));
				const e = this.$d.indexOf(t);
				(-1 !== e && this.$d.splice(e, 1), this.Wd(t, i));
			}
			if (i) throw i;
		}
		Jd() {
			const t = [];
			for (const e of [...this.$d].reverse())
				try {
					this.qd(e);
				} catch (i) {
					t.push(i);
				}
			if (t.length > 0) throw new AggregateError(t, 'One or more plugins failed to clean up.');
		}
		t_() {
			this.i_('preDraw');
		}
		e_() {
			this.i_('postDraw');
		}
		s_(t) {
			const i = [];
			try {
				const i = [];
				if (
					(this.r_('layerDisposed', (e) => {
						try {
							this.n_(e(t), 'layerDisposed');
						} catch (s) {
							i.push(s);
						}
					}),
					i.length > 0)
				)
					throw new AggregateError(i, 'One or more layerDisposed hooks failed.');
			} catch (e) {
				i.push(e);
			} finally {
				try {
					this.Vd.Rd(t);
				} catch (e) {
					i.push(e);
				}
			}
			if (1 === i.length) throw i[0];
			if (i.length > 1) throw new AggregateError(i, 'Layer disposal notification failed.');
		}
		h_(t) {
			(this.Vd.Ld(t), this.i_('layerCreated', t));
		}
		$e(t) {
			this.i_('layerPreRender', t);
		}
		Ze(t) {
			this.i_('layerPostRender', t);
		}
		ts(t, i, e) {
			let s = e;
			return (
				this.r_('layerOutput', (e) => {
					const r = e({ layer: t, phase: i, output: s });
					(this.n_(r, 'layerOutput'), void 0 !== r && (s = this.o_(r, s, 'layer')));
				}),
				s
			);
		}
		a_(t) {
			let i = t;
			return (
				this.r_('compositeOutput', (t) => {
					const e = t(i);
					(this.n_(e, 'compositeOutput'), void 0 !== e && (i = this.o_(e, i, 'composite')));
				}),
				i
			);
		}
		async c_() {
			await this.u_('preSetup');
		}
		async l_() {
			await this.u_('postSetup');
		}
		Zd(t) {
			let i = !0;
			const e = () => {
					if (!i) throw new r(`Plugin context "${t}" is no longer active.`);
				},
				s = {
					on: (i, s) => {
						e();
						const r = this.f_(i, t, s);
						if ('layerCreated' === i)
							try {
								const t = s;
								this.n_(t(this.ns.layers.base), i);
								for (const e of this.ns.layers.all) this.n_(t(e), i);
							} catch (n) {
								throw (r(), n);
							}
						return r;
					},
					defineExtension: (i, s, r) => (e(), this.Vd.kd(t, i, s, r)),
				};
			return (
				this.Hd.set(t, {
					context: s,
					deactivate: () => {
						i = !1;
					},
				}),
				s
			);
		}
		Kd() {
			const t = this.ns.layers;
			if (t?.base) {
				this.Vd.Ld(t.base);
				for (const i of t.all ?? []) this.Vd.Ld(i);
			}
		}
		Wd(t, i) {
			const e = [];
			(this.Hd.get(t)?.deactivate(), this.Hd.delete(t));
			for (const r of [() => this.d_(t), () => this.Vd.zd(t)])
				try {
					r();
				} catch (s) {
					e.push(s);
				}
			if (e.length > 0) throw new AggregateError(e, `Plugin "${t}" cleanup failed.`, { cause: i });
		}
		f_(t, i, e) {
			const s = this.Xd.get(t) ?? /* @__PURE__ */ new Map(),
				r = s.get(i) ?? [],
				n = { callback: e };
			(r.push(n), s.set(i, r), this.Xd.set(t, s));
			let h = !1;
			return () => {
				if (h) return;
				h = !0;
				const e = r.indexOf(n);
				-1 !== e && (r.splice(e, 1), 0 === r.length && (s.delete(i), 0 === s.size && this.Xd.delete(t)));
			};
		}
		d_(t) {
			for (const [i, e] of this.Xd) (e.delete(t), 0 === e.size && this.Xd.delete(i));
		}
		i_(t, ...i) {
			this.r_(t, (e) => this.n_(e(...i), t));
		}
		async u_(t) {
			for (const i of this.$d) {
				const e = this.Xd.get(t)?.get(i);
				if (e && 0 !== e.length) for (const t of [...e]) await t.callback();
			}
		}
		r_(t, i) {
			const e = this.Xd.get(t);
			if (e)
				for (const s of this.$d) {
					const t = e.get(s);
					if (t && 0 !== t.length) for (const e of [...t]) i(e.callback);
				}
		}
		n_(t, i) {
			if (be(t))
				throw (
					Promise.resolve(t).catch(() => {}),
					new r(`Plugin hook "${i}" returned a promise but must finish synchronously.`)
				);
		}
		o_(t, i, e) {
			if (
				t.O?.() ||
				0 === t.textures.length ||
				t.attachmentCount < 1 ||
				t.width !== i.width ||
				t.height !== i.height
			)
				throw new r(`Plugin returned an invalid ${e} output framebuffer.`, {
					expectedDimensions: [i.width, i.height],
					actualDimensions: [t.width, t.height],
					attachments: t.textures.length,
				});
			return t;
		}
	};
function be(t) {
	return 'object' == typeof t && null !== t && 'then' in t && 'function' == typeof t.then;
}
var Me =
		'#version 300 es\nlayout(location=0)in vec2 a_position;layout(location=1)in vec2 a_texCoord;out vec2 v_uv;void main(){v_uv=a_texCoord;gl_Position=vec4(a_position,0.,1.);}',
	Ae = ({ textmodifier: t }) => {
		const i = Math.floor(t.millis / 120) % 4;
		(t.background('#222323'),
			t.charColor('#F8F8F8'),
			t.cellColor('#222323'),
			ht(t, '|/-\\'[i], 0),
			t.charColor('#C0C0C0'),
			ht(t, 'LOADING...', 5));
	},
	Ce = { transition: 'fade', transitionDuration: 500 },
	xe = class extends nt {
		qt;
		fs = 'active';
		__ = 0;
		p_;
		constructor(t, i) {
			(super(t),
				(this.qt = { ...Ce, ...(i ?? {}) }),
				'none' === this.qt.transition && (this.qt.transitionDuration = 0));
		}
		async Ot() {
			this.Dt || (await super.Ot(), this.hs.opacity(1), this.hs.show());
		}
		get vs() {
			return 'active' === this.fs || 'transitioning' === this.fs;
		}
		m_() {
			this.qt.transitionDuration > 0
				? (this.v_(), (this.__ = performance.now()), this.Dt && (this.hs.opacity(1), this.hs.show()))
				: (this.Dt && (this.hs.opacity(0), this.hs.hide()), this.g_(), this.y_());
		}
		w_(t) {
			this.p_ = t;
		}
		bs() {
			if ('transitioning' === this.fs && this.b_()) return (this.M_(), void this.y_());
			this.Ms();
		}
		cs() {
			return new rt(this.ns.X, { visible: !0, opacity: 1, fontSize: 16 });
		}
		y_() {
			this.p_ && this.p_();
		}
		b_() {
			if (!this.Dt) return !0;
			const t = this.qt.transitionDuration;
			if (t <= 0) return (this.hs.opacity(0), this.hs.hide(), !0);
			const i = performance.now() - this.__,
				e = Math.min(1, i / t);
			return (this.hs.opacity(1 - e), e >= 1 && (this.hs.hide(), !0));
		}
		Ms() {
			if (!this.Dt) return;
			const t = { textmodifier: this.ns, grid: this.hs.grid };
			this.us(Ae, t);
		}
		g_() {
			'disabled' !== this.fs && (this.fs = 'done');
		}
		v_() {
			'disabled' !== this.fs && (this.fs = 'transitioning');
		}
		M_() {
			'transitioning' === this.fs && (this.fs = 'done');
		}
	},
	Se = /* @__PURE__ */ i({ LoadingLayerController: () => xe }),
	Ee = class {
		X;
		A_;
		C_;
		x_ = 0;
		constructor(t, i, e) {
			((this.X = t),
				(this.A_ = t.ir(
					Me,
					'#version 300 es\nprecision highp float;uniform sampler2D Ug;uniform sampler2D U2;uniform vec2 U7;uniform vec2 Uf;uniform vec2 U1;uniform float Uh;uniform float Uj;uniform int U3;uniform bool Ua;uniform vec4 Ue;in vec2 v_uv;out vec4 fragColor;const int A=0;const int B=1;const int C=2;const int D=3;const int E=4;const int F=5;const int G=6;const int H=7;const int I=8;const int J=9;const int K=10;const int L=11;const int M=12;const int N=13;vec3 O(vec3 P,vec3 Q){return Q;}vec3 R(vec3 P,vec3 Q){return P+Q;}vec3 S(vec3 P,vec3 Q){return P*Q;}vec3 T(vec3 P,vec3 Q){return 1.-(1.-P)*(1.-Q);}vec3 U(vec3 P,vec3 Q){return max(P-Q,0.);}vec3 V(vec3 P,vec3 Q){return min(P,Q);}vec3 W(vec3 P,vec3 Q){return max(P,Q);}vec3 X(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,P));}vec3 Y(vec3 P,vec3 Q){return mix(P-(1.-2.*Q)*P*(1.-P),mix(P+(2.*Q-1.)*(P*(3.-2.*P)-P),P+(2.*Q-1.)*(sqrt(P)-P),step(0.25,P)),step(0.5,Q));}vec3 Z(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,Q));}vec3 a(vec3 P,vec3 Q){return mix(min(vec3(1.),P/max(1.-Q,0.0001)),vec3(1.),step(1.,Q));}vec3 b(vec3 P,vec3 Q){return mix(1.-min(vec3(1.),(1.-P)/max(Q,0.0001)),vec3(0.),step(Q,vec3(0.)));}vec3 c(vec3 P,vec3 Q){return abs(P-Q);}vec3 d(vec3 P,vec3 Q){return P+Q-2.*P*Q;}vec3 e(int f,vec3 P,vec3 Q){if(f==A)return O(P,Q);if(f==B)return R(P,Q);if(f==C)return S(P,Q);if(f==D)return T(P,Q);if(f==E)return U(P,Q);if(f==F)return V(P,Q);if(f==G)return W(P,Q);if(f==H)return X(P,Q);if(f==I)return Y(P,Q);if(f==J)return Z(P,Q);if(f==K)return a(P,Q);if(f==L)return b(P,Q);if(f==M)return c(P,Q);if(f==N)return d(P,Q);return O(P,Q);}void main(){vec4 g=texture(U2,v_uv);vec2 h=v_uv*U7;vec2 i=h-U1;vec2 j=Uf*0.5;vec2 k=i-j;float l=cos(-Uj);float m=sin(-Uj);vec2 n=vec2(k.x*l-k.y*m,k.x*m+k.y*l);i=n+j;bool o=any(lessThan(i,vec2(0.)))||any(greaterThanEqual(i,Uf));vec4 p;if(o){if(!Ua){fragColor=g;return;}p=Ue;}else{vec2 q=(floor(i)+0.5)/Uf;p=texture(Ug,q);}float r=p.a*Uh;if(r<=0.){fragColor=g;return;}vec3 s=e(U3,g.rgb,p.rgb);vec3 t=mix(g.rgb,s,r);float u=g.a+r*(1.-g.a);fragColor=vec4(t,u);}'
				)),
				(this.C_ = [this.X.q(i, e, 1, { depth: !1 }), this.X.q(i, e, 1, { depth: !1 })]));
		}
		S_(t) {
			const { base: i, targetFramebuffer: e, backgroundColor: s, layers: r, canvasWidth: n, canvasHeight: h } = t,
				o = this.X.vc(),
				a = this.X.gc();
			(this.X._c(!1), this.X.mc(!1));
			const c = this.C_[0];
			(c.begin(),
				this.X.Lh(...s),
				c.end(),
				(this.x_ = 0),
				i.layer.ye &&
					this.E_(
						i.texture,
						n,
						h,
						i.width,
						i.height,
						i.layer.we,
						i.offsetX,
						i.offsetY,
						i.layer.Me,
						k.NORMAL,
						i.canvasBackgroundColor
					));
			for (const u of r) {
				const t = u.layer;
				t.ye &&
					this.E_(
						u.texture,
						n,
						h,
						u.width,
						u.height,
						t.we,
						u.offsetX,
						u.offsetY,
						t.Me,
						t.be,
						u.canvasBackgroundColor
					);
			}
			(this.T_(e, n, h), this.X.mc(a), this.X._c(o));
		}
		E_(t, i, e, s, r, n, h, o, a, c, u) {
			const l = this.C_[this.x_],
				f = 0 === this.x_ ? 1 : 0,
				d = this.C_[f],
				_ = I(a);
			(d.begin(),
				this.X.We(this.A_),
				this.A_.qe({
					Ug: t,
					U2: l.textures[0],
					U7: [i, e],
					Uf: [s, r],
					U1: [h, o],
					Uh: n,
					Uj: _,
					U3: c,
					Ua: void 0 !== u,
					Ue: u ?? [0, 0, 0, 0],
				}),
				this.X.Je(0, 0, l.width, l.height),
				d.end(),
				(this.x_ = f));
		}
		T_(t, i, e) {
			const s = this.C_[this.x_];
			(t.begin(),
				this.X.We(this.A_),
				this.A_.qe({
					Ug: s.textures[0],
					U2: s.textures[0],
					U7: [i, e],
					Uf: [s.width, s.height],
					U1: [0, 0],
					Uh: 1,
					Uj: 0,
					U3: k.NORMAL,
					Ua: !1,
					Ue: [0, 0, 0, 0],
				}),
				this.X.Je(0, 0, i, e),
				t.end());
		}
		rs(t, i) {
			(this.C_[0].resize(t, i), this.C_[1].resize(t, i));
		}
		L() {
			(this.A_.dispose(), this.C_[0].dispose(), this.C_[1].dispose());
		}
	},
	Te = class {
		ns;
		X;
		F_;
		Pd = [];
		U_ = [];
		P_;
		L_ = !1;
		D_ = /* @__PURE__ */ new Set();
		R_;
		k_;
		O_;
		B_;
		I_;
		N_ = { ye: !0, we: 1, Me: 0, be: k.NORMAL };
		constructor(t, i) {
			((this.ns = t),
				(this.X = t.X),
				(this.F_ = new Ee(this.X, this.ns.p.width, this.ns.p.height)),
				(this.P_ = new rt(this.X, { visible: !0, opacity: 1, fontSize: i.fontSize, fontSource: i.fontSource })),
				this.ns.He.h_(this.P_),
				(this.B_ = new xe(this.ns, i.loadingScreen)),
				(this.I_ = new ct(this.ns)));
		}
		async Ot() {
			await this.j_(this.P_);
			const t = this.ns.p;
			((this.R_ = this.X.q(t.width, t.height, 1, { depth: !1 })),
				(this.k_ = this.X.q(t.width, t.height, 1, { depth: !1 })),
				(this.O_ = this.R_),
				await this.B_.Ot(),
				await this.I_.Ot(),
				await this.j_(this.B_.hs),
				await this.j_(this.I_.hs),
				await this.z_(),
				(this.L_ = !0));
		}
		add(t = {}) {
			const i = new rt(this.X, t);
			return (this.ns.He.h_(i), this.L_ ? (this.j_(i), this.Pd.push(i)) : this.U_.push(i), i);
		}
		remove(t) {
			this.Q_(this.Pd, t) || this.Q_(this.U_, t);
		}
		move(t, i) {
			this.G_(this.Pd, t, i) || this.G_(this.U_, t, i);
		}
		swap(t, i) {
			this.H_(this.Pd, t, i) || this.H_(this.U_, t, i);
		}
		clear() {
			const t = [];
			try {
				this.X_(this.Pd);
			} catch (i) {
				t.push(i);
			}
			this.Pd = [];
			try {
				this.X_(this.U_);
			} catch (i) {
				t.push(i);
			}
			if (((this.U_ = []), t.length > 0))
				throw new AggregateError(t, 'One or more user layers failed to dispose.');
		}
		V_(t, i = []) {
			(this.ns.He.t_(), this.P_.Ge(this.ns, this.ns.Y_));
			const e = [...this.X.state.pn.Ce];
			for (const s of this.Pd) s.Ge(this.ns, this.ns.Y_);
			for (const s of i) s.ye && s.Ge(this.ns, this.ns.Y_, { skipPluginHooks: !0 });
			this.K_(t, e, i);
		}
		Z_() {
			(this.V_(this.R_), this.W_());
		}
		W_() {
			((this.O_ = this.ns.He.a_(this.R_)), this.q_(this.O_.textures[0]), this.ns.He.e_());
		}
		q_(t) {
			const i = this.ns.p;
			(this.X.Lh(0, 0, 0, 0),
				this.X.We(this.ns.J_),
				this.ns.J_.qe({ u_texture: t }),
				this.X.Je(0, 0, i.width, i.height));
		}
		tp(t) {
			this.ip(() => {
				t.Ge(this.ns, this.ns.Y_, { skipPluginHooks: !0 });
				const i = t.texture,
					e = t.grid;
				i &&
					e &&
					(this.X.Lh(...this.X.state.pn.Ce),
					this.X.We(this.ns.J_),
					this.ns.J_.qe({ u_texture: i }),
					this.X.Je(e.offsetX, e.offsetY, e.width, e.height));
			});
		}
		ep(t) {
			this.ip(() => {
				const i = this.ns.p,
					e = this.O_ ?? this.R_,
					s = e.textures[0];
				if (!s) return;
				t.Ge(this.ns, this.ns.Y_, { skipPluginHooks: !0 });
				const r = this.sp(t);
				if (!r) return void this.q_(s);
				const n = this.rp(e);
				(this.F_.S_({
					base: { layer: this.N_, texture: s, width: i.width, height: i.height, offsetX: 0, offsetY: 0 },
					layers: [r],
					targetFramebuffer: n,
					backgroundColor: [0, 0, 0, 0],
					canvasWidth: i.width,
					canvasHeight: i.height,
				}),
					this.q_(n.textures[0]));
			});
		}
		ip(t) {
			const i = !this.X.Na();
			(i && this.X.Ba(!0), this.X.Ga(!0), this.X.state.Is());
			try {
				(this.X.state.Zi.ve(), this.X.state.Ye(), t());
			} finally {
				(this.X.state.Ns(), this.X.$a(), i && this.X.Ba(!1));
			}
		}
		rp(t) {
			return t === this.R_ ? this.k_ : this.R_;
		}
		sp(t, i = !0) {
			if (!t.grid || !t.texture) return;
			const e = t.grid,
				s = {
					layer: t,
					texture: t.texture,
					width: e.width,
					height: e.height,
					offsetX: e.offsetX + t.l,
					offsetY: e.offsetY + t._,
				};
			return (i && t.Ce && (s.canvasBackgroundColor = t.Ce), s);
		}
		K_(t, i, e = []) {
			const s = this.ns.p,
				r = this.sp(this.P_, !1);
			if (!r) return;
			const n = [];
			for (const h of this.Pd) {
				const t = this.sp(h);
				t && n.push(t);
			}
			for (const h of e) {
				if (!h.ye) continue;
				const t = this.sp(h);
				t && n.push(t);
			}
			this.F_.S_({
				base: r,
				layers: n,
				targetFramebuffer: t,
				backgroundColor: i,
				canvasWidth: s.width,
				canvasHeight: s.height,
			});
		}
		rs() {
			if (!this.L_) return;
			const t = this.ns.p;
			this.P_.rs();
			for (const i of this.Pd) i.rs();
			(this.B_.hs?.rs(),
				this.I_.hs?.rs(),
				this.F_.rs(t.width, t.height),
				this.R_?.resize(t.width, t.height),
				this.k_?.resize(t.width, t.height));
		}
		L() {
			const t = [],
				i = (i) => {
					try {
						i();
					} catch (e) {
						t.push(e);
					}
				};
			if (
				(i(() => this.B_.L()),
				i(() => this.I_.L()),
				i(() => this.clear()),
				i(() => this.np(this.P_)),
				i(() => this.F_.L()),
				i(() => this.R_?.dispose()),
				i(() => this.k_?.dispose()),
				(this.L_ = !1),
				t.length > 0)
			)
				throw new AggregateError(t, 'One or more layer resources failed to dispose.');
		}
		get all() {
			return this.Pd;
		}
		get base() {
			return this.P_;
		}
		get resultFramebuffer() {
			const t = this.O_ ?? this.R_;
			if (!t) throw new r('LayerManager.resultFramebuffer is not available before initialization completes.');
			return t;
		}
		get loading() {
			return this.B_;
		}
		get errors() {
			return this.I_;
		}
		hp() {
			const t = this.Pd;
			for (let i = t.length - 1; i >= 0; i--) {
				const e = t[i];
				if (e.ye && e.grid) return e.grid;
			}
			return this.P_.grid;
		}
		op(t) {
			this.D_.add(t);
		}
		ap() {
			for (const t of this.D_) t();
		}
		async z_() {
			for (let t = 0; t < this.U_.length; t++) {
				const i = this.U_[t];
				(await this.j_(i), this.Pd.push(i));
			}
			this.U_ = [];
		}
		Q_(t, i) {
			const e = t.indexOf(i);
			return -1 !== e && (t.splice(e, 1), this.np(i), !0);
		}
		G_(t, i, e) {
			const s = t.indexOf(i);
			return -1 !== s && (t.splice(s, 1), t.splice(Q(e, 0, t.length), 0, i), !0);
		}
		H_(t, i, e) {
			if (i === e) return !0;
			const s = t.indexOf(i),
				r = t.indexOf(e);
			return -1 !== s && -1 !== r && ((t[s] = e), (t[r] = i), !0);
		}
		X_(t) {
			const i = [];
			for (const s of t)
				try {
					this.np(s);
				} catch (e) {
					i.push(e);
				}
			if (i.length > 0) throw new AggregateError(i, 'One or more layers failed to dispose.');
		}
		np(t) {
			const i = [];
			try {
				this.ns.He.s_(t);
			} catch (e) {
				i.push(e);
			} finally {
				try {
					t.L();
				} catch (e) {
					i.push(e);
				}
			}
			if (1 === i.length) throw i[0];
			if (i.length > 1) throw new AggregateError(i, 'Layer disposal failed.');
		}
		async j_(t) {
			const i = {
				renderer: this.X,
				canvas: this.ns.p,
				createFramebuffer: (t, i, e = 1, s) => this.X.q(t, i, e, s),
			};
			(await t.Oe(i), t.grid?.S(() => this.ap()));
		}
	},
	Fe = /* @__PURE__ */ i({ LayerBlendMode: () => k, TextmodeLayer: () => rt, TextmodeLayerManager: () => Te }),
	Ue =
		'#version 300 es\nprecision highp float;in vec2 v_uv;in vec3 v_worldPosition;uniform sampler2D u_image;uniform bool u_invert;uniform bool u_flipX;uniform bool u_flipY;uniform float u_charRotation;uniform float U5;uniform float U4;uniform bool u_charColorFixed;uniform vec4 u_charColor;uniform bool u_cellColorFixed;uniform vec4 u_cellColor;uniform vec4 u_backgroundColor;uniform int u_charCount;uniform sampler2D u_charPaletteTexture;uniform ivec2 u_charPaletteDimensions;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_statePayload;\n' +
		Pi +
		'\nfloat A(vec3 B){return dot(B,vec3(0.299f,0.587f,0.114f));}vec3 C(int D){int E=max(u_charPaletteDimensions.x,1);int F=D/E;int G=D%E;return texelFetch(u_charPaletteTexture,ivec2(G,F),0).rgb;}void main(){vec2 H=vec2(v_uv.x,1.0f-v_uv.y);vec4 I=texture(u_image,H);float J=A(I.rgb);if(I.a<0.01f||J<U5||J>U4){discard;}vec2 K=vec2(0.);if(u_charCount>0){float L=float(u_charCount);float M=clamp(J*(L-1.0f),0.0f,L-1.0f);int N=int(floor(M+0.5f));vec3 O=C(N);K=O.xy;}else{K=vec2(0.0f,0.0f);}vec4 P=u_charColorFixed?u_charColor:I;vec4 Q=u_cellColorFixed?u_cellColor:I;vec3 R=tmApplyLighting(P.rgb,v_worldPosition);vec3 S=tmApplyLighting(Q.rgb,v_worldPosition);o_primaryColor=vec4(R,P.a);o_secondaryColor=vec4(S,Q.a);o_statePayload=vec4(0.);int T=int(u_invert?1:0);int U=int(u_flipX?1:0);int V=int(u_flipY?1:0);float W=float(T|(U<<1)|(V<<2))/255.;o_character=vec4(K,W,clamp(u_charRotation,0.0f,1.0f));}',
	Pe = {
		id: 'brightness',
		createShader: ({ gl: t }) => new bt(t, Ui, Ue),
		createUniforms: (t) => t.createBaseUniforms(),
	},
	Le = class {
		cp = /* @__PURE__ */ new Map();
		lp = /* @__PURE__ */ new Map();
		constructor() {
			this.fp();
		}
		register(t) {
			this.cp.set(t.id, t);
		}
		unregister(t) {
			const i = this.lp.get(t);
			return (i && (i.dispose(), this.lp.delete(t)), this.cp.delete(t));
		}
		has(t) {
			return this.cp.has(t);
		}
		Du(t) {
			return this.cp.get(t);
		}
		Lu(t, i) {
			let e = this.lp.get(t);
			if (!e) {
				const s = this.cp.get(t);
				if (!s) throw new Error(`[textmode.js] Conversion mode "${t}" is not registered.`);
				((e = s.createShader(i)), this.lp.set(t, e));
			}
			return e;
		}
		L() {
			for (const t of this.lp.values()) t.dispose();
			(this.lp.clear(), this.cp.clear());
		}
		fp() {
			this.register(Pe);
		}
	},
	De = /* @__PURE__ */ i({ TextmodeConversionManager: () => Le }),
	Re = 'textmode-v1';
function ke() {
	const t = globalThis.crypto;
	if (t?.getRandomValues) {
		const i = /* @__PURE__ */ new Uint32Array(4);
		return (t.getRandomValues(i), `auto:${i[0]}:${i[1]}:${i[2]}:${i[3]}`);
	}
	return `auto:${Date.now()}:${globalThis.performance?.now?.() ?? 0}:${Math.random()}`;
}
function Oe(t) {
	return 'number' == typeof t ? `number:${String(t)}` : `string:${t}`;
}
function Be(t, i) {
	return `stream:${t.length}:${t}:${i.length}:${i}`;
}
function Ie(t, i) {
	let e = (2166136261 ^ i) >>> 0;
	for (let s = 0; s < t.length; s += 1) ((e ^= t.charCodeAt(s)), (e = Math.imul(e, 16777619)), (e ^= e >>> 13));
	return (
		(e ^= t.length),
		(e = Math.imul(e ^ (e >>> 16), 2146121005)),
		(e = Math.imul(e ^ (e >>> 15), 2221713035)),
		(e ^ (e >>> 16)) >>> 0
	);
}
function Ne(t) {
	const i = (t[0] + t[1] + t[3]) | 0;
	return (
		(t[3] = (t[3] + 1) | 0),
		(t[0] = t[1] ^ (t[1] >>> 9)),
		(t[1] = (t[2] + (t[2] << 3)) | 0),
		(t[2] = (t[2] << 21) | (t[2] >>> 11)),
		(t[2] = (t[2] + i) | 0),
		i >>> 0
	);
}
var je = class {
		fs;
		dp;
		constructor(t = ke()) {
			this.randomSeed(t);
		}
		random(t, i) {
			if (Array.isArray(t)) {
				if (0 === t.length) return;
				return t[Math.floor(this._p() * t.length)];
			}
			const e = this._p();
			return 'number' != typeof t ? e : void 0 === i ? e * t : t + e * (i - t);
		}
		randomGaussian(t = 0, i = 1) {
			if (void 0 !== this.dp) {
				const e = this.dp;
				return ((this.dp = void 0), t + e * i);
			}
			const e = Math.sqrt(-2 * Math.log(1 - this._p())),
				s = 2 * Math.PI * this._p(),
				r = e * Math.cos(s),
				n = e * Math.sin(s);
			return ((this.dp = n), t + r * i);
		}
		randomSeed(t) {
			((this.fs = (function (t) {
				const i = `${Re}\0${t}`,
					e = [Ie(i, 608135816), Ie(i, 2242054355), Ie(i, 320440878), Ie(i, 57701188)];
				e.every((t) => 0 === t) && (e[0] = 1831565813);
				for (let s = 0; s < 12; s += 1) Ne(e);
				return e;
			})(Oe(t))),
				(this.dp = void 0));
		}
		_p() {
			return Ne(this.fs) / 4294967296;
		}
		static get pp() {
			return Re;
		}
	},
	ze = /* @__PURE__ */ i({ TEXTMODE_RANDOM_ALGORITHM: () => Re, TextmodeRandom: () => je }),
	Qe = 4095;
function Ge(t) {
	return 0.5 * (1 - Math.cos(t * Math.PI));
}
var $e = class {
		mp = [];
		vp = 4;
		gp = 0.5;
		constructor(t) {
			this.noiseSeed(t);
		}
		noise(t, i = 0, e = 0) {
			(t < 0 && (t = -t), i < 0 && (i = -i), e < 0 && (e = -e));
			let s = Math.floor(t),
				r = Math.floor(i),
				n = Math.floor(e),
				h = t - s,
				o = i - r,
				a = e - n,
				c = 0,
				u = 0.5;
			for (let l = 0; l < this.vp; l += 1) {
				let t = s + (r << 4) + (n << 8);
				const i = Ge(h),
					e = Ge(o);
				let l = this.mp[t & Qe],
					f = this.mp[(t + 1) & Qe];
				((l += i * (f - l)), (f = this.mp[(t + 16) & Qe]));
				let d = this.mp[(t + 16 + 1) & Qe];
				((f += i * (d - f)),
					(l += e * (f - l)),
					(t += 256),
					(f = this.mp[t & Qe]),
					(d = this.mp[(t + 1) & Qe]),
					(f += i * (d - f)));
				let _ = this.mp[(t + 16) & Qe];
				((d = this.mp[(t + 16 + 1) & Qe]),
					(_ += i * (d - _)),
					(f += e * (_ - f)),
					(l += Ge(a) * (f - l)),
					(c += l * u),
					(u *= this.gp),
					(s <<= 1),
					(h *= 2),
					(r <<= 1),
					(o *= 2),
					(n <<= 1),
					(a *= 2),
					h >= 1 && ((s += 1), (h -= 1)),
					o >= 1 && ((r += 1), (o -= 1)),
					a >= 1 && ((n += 1), (a -= 1)));
			}
			return Q(c, 0, 1);
		}
		noiseSeed(t) {
			const i = new je(t);
			this.mp = Array.from({ length: 4096 }, () => i.random());
		}
		noiseDetail(t, i) {
			((this.vp = Number.isFinite(t) ? Math.max(1, Math.floor(t)) : 1),
				void 0 !== i && Number.isFinite(i) && (this.gp = Q(i, 0, 1)));
		}
	},
	He = /* @__PURE__ */ i({ TextmodeColor: () => $i }),
	Xe = class {
		X;
		Y_;
		J_;
		p;
		yp;
		qf;
		wp;
		bp;
		Mp;
		Ap;
		Cp;
		Ke;
		xp;
		Sp = null;
		Ep = [];
		Tp = [];
		Fp = [];
		Pp = [];
		Lp = [];
		Dp = null;
		Rp = /* @__PURE__ */ new Float32Array(24);
		kp = /* @__PURE__ */ new Set();
		He;
		Op;
		Bp;
		Ip = /* @__PURE__ */ new Map();
		Np;
		jp;
		zp;
		Qp;
		Da = !1;
		Gp = !1;
		O = !1;
		$p = null;
		Hp = !1;
		Xp = 0;
		Vp = () => {};
		Yp = () => {};
		Kp;
		Zp;
		Wp;
		constructor(t = {}) {
			this.He = new we(this);
			const i = t.seed ?? ke();
			((this.Bp = Oe(i)),
				(this.Op = new je(i)),
				(this.Np = new $e(Be(this.Bp, 'noise'))),
				(this.jp = new Promise((t) => {
					this.Qp = t;
				})),
				(this.p = new ji(t)),
				(this.X = new Ni(this.p.Sc())),
				(this.Y_ = this.X.ir(
					Me,
					'#version 300 es\nprecision highp float;uniform sampler2D u_characterTexture;uniform vec2 u_charsetDimensions;uniform sampler2D Ui;uniform sampler2D Uk;uniform sampler2D U0;uniform bool UE;uniform vec2 U8;uniform vec2 U9;uniform vec4 U6;in vec2 v_uv;out vec4 fragColor;mat2 A(float B){float C=sin(B);float D=cos(B);return mat2(D,-C,C,D);}float E(vec3 F){return dot(F,vec3(0.299f,0.587f,0.114f));}void main(){vec2 G=gl_FragCoord.xy/U9;vec2 H=G*U8;vec2 I=floor(H);vec2 J=(I+0.5)/U8;vec4 K=texture(Ui,J);vec4 L=texture(Uk,J);vec4 M=texture(U0,J);int N=int(M.r*255.+0.5);int O=int(M.g*255.+0.5);int P=int(M.a*255.+0.5);if(N==255&&O==255){fragColor=mix(U6,L,L.a);return;}int Q=int(M.b*255.+0.5);bool R=(Q&1)!=0;bool S=(Q&2)!=0;bool T=(Q&4)!=0;int U=N+O*256;int V=int(u_charsetDimensions.x);int W=U/V;int X=U-(W*V);float Y=(u_charsetDimensions.y-1.)-float(W);vec2 Z=1./u_charsetDimensions;vec2 a=vec2(float(X),Y)*Z;vec2 b=a+Z;float c=-M.a*360.*0.017453292;vec2 d=fract(H)-0.5f;vec2 e=vec2(S?-1.:1.,T?-1.:1.);d*=e;d=A(c)*d+0.5;vec2 f=a+clamp(d,0.,1.)*Z;const float g=0.0001;if(any(lessThan(f,a-g))||any(greaterThan(f,b+g))){fragColor=R?K:L;return;}vec4 h=texture(u_characterTexture,f);if(!UE){fragColor=h;return;}float i=(h.a>0.0f&&E(h.rgb)>0.5f)?1.0f:0.0f;if(R)i=1.0f-i;vec4 j=mix(U6,L,L.a);fragColor=mix(j,K,i);}'
				)),
				(this.J_ = this.X.ir(
					Me,
					'#version 300 es\nprecision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){fragColor=texture(u_texture,v_uv);}'
				)),
				(this.yp = new Zi(t.frameRate ?? 60)),
				(this.Cp = new Te(this, t)));
			const e = () => this.qp();
			((this.Ap = new ne()),
				(this.qf = new he(this.p, e, this.Ap)),
				(this.wp = new ce(this.p, e, this.Ap, this.qf)),
				(this.bp = new oe(this.Ap)),
				(this.Mp = new ge(this.Ap)),
				(this.xp = new Le()));
			try {
				this.He.Yd(t.plugins ?? []);
			} catch (s) {
				const t = [];
				if ((this.Jp(t), (this.O = !0), t.length > 0))
					throw new AggregateError(t, 'Plugin installation failed and host resource cleanup also failed.', {
						cause: s,
					});
				throw s;
			}
			this.zp = this.Ot();
		}
		tm(t) {
			(this.kp.add(t),
				t.k?.(() => {
					this.kp.delete(t);
				}));
		}
		im = (t, i, e, s) => $i.Oc(t, i, e, s, this.X.state.pn.Pn());
		sm(t, i) {
			(this.p.rs(t, i), this.Cp?.rs(), this.X.dc(), this.Ge());
		}
		rm() {
			const t = this.Cp?.base.grid;
			if (!t) return;
			const i = t.cols,
				e = t.rows;
			for (const s of this.kp) s instanceof Ki && s.rs(i, e);
		}
		async Ot() {
			(await this.Cp.Ot(), this.Qp());
			const t = this.Cp.base.grid;
			(this.rm(),
				this.Cp.op(() => {
					(this.qf.tf(), this.wp.tf());
				}),
				this.nm(),
				t.S(() => {
					this.rm();
				}),
				this.hm());
			try {
				(await this.He.c_(),
					await this.Vp(),
					await this.He.l_(),
					(this.yp.rl = 0),
					this.loading.m_(),
					(this.Hp = !0),
					this.hm());
			} catch (i) {
				this.om(i, 'setup');
			}
		}
		hm() {
			this.yp.hl(
				() => this.Ge(),
				() => this.am()
			);
		}
		am() {
			return (
				!this.Gp && !this.O && (this.loading.vs || this.errors.vs || this.Hp || this.Xp > 0 || null !== this.$p)
			);
		}
		um(t) {
			((this.Xp += t), this.hm(), this.Da || this.loading.vs || this.errors.vs || this.lm());
		}
		nm() {
			((this.Kp = () => {
				this.Yp();
			}),
				window.addEventListener('resize', this.Kp),
				this.qf.Hl(),
				this.wp.Hl(),
				this.bp.Hl(),
				this.Mp.Hl(),
				(this.Zp = () => {
					this.bp.Cf();
				}),
				window.addEventListener('blur', this.Zp));
		}
		Ge() {
			if (this.errors.vs) {
				this.errors.bs();
				const t = this.errors.hs;
				return void (t && this.Cp.tp(t));
			}
			if (this.loading.vs)
				try {
					this.loading.bs();
					const t = this.loading.hs;
					if (!t || !this.loading.vs) return;
					if ('transitioning' === this.loading.fs) {
						if ((this.fm(), this.errors.vs || !this.loading.vs)) return;
						this.Cp.ep(t);
					} else this.Cp.tp(t);
				} catch (t) {
					this.om(t, 'loading screen');
				}
			else this.lm() || (this.dm() && this._m());
		}
		dm() {
			return this.Hp || this.yp.qu;
		}
		fm() {
			this.dm() && this._m();
		}
		lm() {
			if (this.loading.vs || this.errors.vs || this.Xp <= 0) return !1;
			for (this.Hp = !1; this.Xp > 0;) (this.Xp--, this._m());
			return !0;
		}
		_m() {
			((this.Hp = !1), this.yp.fl(), this.yp._l(), this.qf.hf(), this.Mp.hf(), (this.Da = !0), this.X.Ba(!0));
			try {
				this.Cp.Z_();
			} catch (t) {
				this.om(t, 'draw loop');
			} finally {
				if (((this.Da = !1), this.X.Ba(!1), this.Gp && !this.O)) this.pm();
				else if (this.$p) {
					const { width: t, height: i } = this.$p;
					((this.$p = null), this.sm(t, i));
				}
			}
		}
		resizeCanvas(t, i) {
			this.Da ? (this.$p = { width: t, height: i }) : this.sm(t, i);
		}
		destroy() {
			this.O || this.Gp || ((this.Gp = !0), this.yp.cl(), this.Da || this.pm());
		}
		pm() {
			const t = [];
			if ((this.Jp(t), (this.O = !0), t.length > 0))
				throw new AggregateError(t, 'One or more resources failed to dispose.');
		}
		Jp(t) {
			const i = (i) => {
				try {
					i();
				} catch (e) {
					t.push(e);
				}
			};
			(i(() => this.yp.cl()),
				i(() => window.removeEventListener('resize', this.Kp)),
				i(() => window.removeEventListener('blur', this.Zp)),
				i(() => this.qf.Jl()),
				i(() => this.wp.Jl()),
				i(() => this.bp.Jl()),
				i(() => this.Mp.Jl()),
				i(() => this.Cp?.L()),
				i(() => this.He.Jd()),
				i(() => this.xp?.L()));
			for (const e of this.kp) i(() => e.dispose());
			(this.kp.clear(),
				i(() => this.Y_.dispose()),
				i(() => this.J_.dispose()),
				i(() => this.X.L()),
				i(() => this.p.L()));
		}
		draw(t) {
			this.Cp.base.draw(t);
		}
		postDraw(t) {
			this.Cp.base.postDraw(t);
		}
		async loadFont(t, i = !0) {
			if (i) return (await this.Cp.base.loadFont(t), this.Cp.base.font);
			if (t instanceof P) return (t.Dt || (await t.Ot()), t);
			const e = new P(this.X);
			return (await e.Ot(t), this.tm(e), e);
		}
		async loadTileset(t, i = !0) {
			if (i) return (await this.Cp.base.loadTileset(t), this.Cp.base.font);
			if (t instanceof D) return (t.Dt || (await t.Ot()), t);
			const e = new D(this.X, t.fontSize, t);
			return (await e.Ot(), this.tm(e), e);
		}
		fontSize(t) {
			return this.Cp.base.fontSize(t);
		}
		useTileColors(t) {
			return this.Cp.base.useTileColors(t);
		}
		inputGrid(t) {
			return void 0 === t
				? (this.Wp ?? 'topmost')
				: 'topmost' === t
					? ((this.Wp = void 0), this.qf.tf(), void this.wp.tf())
					: ((this.Wp = t), this.qf.tf(), void this.wp.tf());
		}
		qp() {
			return this.Wp ? this.Wp : this.Cp.hp();
		}
		om(t, i) {
			(console.error(`Error during ${i}:`, t), this.loading.m_(), this.errors.gs(t), this.hm());
		}
		async setup(t) {
			this.Vp = t;
		}
		windowResized(t) {
			this.Yp = t;
		}
		get grid() {
			return this.Ke?.grid ?? this.Cp.base.grid;
		}
		get font() {
			return this.Ke?.font ?? this.Cp.base.font;
		}
		get width() {
			return this.p.width;
		}
		get height() {
			return this.p.height;
		}
		pixelDensity(t) {
			if (void 0 === t) return this.p.pixelDensity;
			if (t <= 0 || t === this.p.pixelDensity) return;
			const i = this.p.pixelDensity,
				e = this.p.width / i,
				s = this.p.height / i;
			(this.p.Tc(t), this.resizeCanvas(e, s));
		}
		get canvas() {
			return this.p.canvas;
		}
		get isDisposed() {
			return this.O;
		}
		get loading() {
			return this.Cp.loading;
		}
		get errors() {
			return this.Cp.errors;
		}
		get layers() {
			return this.Cp;
		}
		get conversions() {
			return this.xp;
		}
		get isRenderingFrame() {
			return this.Da;
		}
	},
	Ve = class {
		constructor() {}
		static create(t = {}) {
			return new Xe(t);
		}
		static setErrorLevel(t) {
			tt.Ri(t);
		}
		static get version() {
			return '0.17.2';
		}
	},
	Ye = /* @__PURE__ */ new WeakMap();
function Ke(t, i, e) {
	let s = Ye.get(t);
	(s || ((s = /* @__PURE__ */ new Map()), Ye.set(t, s)), s.get(i)?.());
	const r = t.Ap.bl(i, e);
	s.set(i, r);
}
function Ze(t) {
	const i = Xe.prototype;
	for (const e of t)
		i[e] = function (t) {
			Ke(this, e, t);
		};
}
function We(t) {
	for (const { name: i, get: e } of t)
		Object.defineProperty(Xe.prototype, i, { get: e, configurable: !0, enumerable: !0 });
}
function qe(t, i) {
	const e = Xe.prototype;
	e[t] = e[i];
}
function Je(t, i) {
	return function (e, s, r, n) {
		if (void 0 === e) return $i.Bc(...t.call(this));
		const h = this.im(e, s, r, n);
		i.call(this, h);
	};
}
var ts = /* @__PURE__ */ i({ MOUSE_EVENT_NAMES: () => te });
(Ze(te),
	(Xe.prototype.cursor = function (t) {
		this.qf.zl(t);
	}),
	(Xe.prototype.requestPointerLock = function () {
		return this.qf.Ql();
	}),
	(Xe.prototype.exitPointerLock = function () {
		this.qf.Gl();
	}),
	We([
		{
			name: 'mouse',
			get: function () {
				return this.qf.if();
			},
		},
		{
			name: 'mouseIsPressed',
			get: function () {
				return this.qf.nf();
			},
		},
		{
			name: 'pmouse',
			get: function () {
				return this.qf.ef();
			},
		},
		{
			name: 'movedX',
			get: function () {
				return this.qf.sf();
			},
		},
		{
			name: 'movedY',
			get: function () {
				return this.qf.rf();
			},
		},
	]),
	(Xe.prototype.frameRate = function (t) {
		return void 0 === t ? this.yp.Ju : this.yp.ll(t, () => this.Ge());
	}),
	(Xe.prototype.targetFrameRate = function (t) {
		if (void 0 === t) return this.yp.Vu;
		this.yp.dl(t);
	}),
	(Xe.prototype.noLoop = function () {
		this.yp.cl();
	}),
	(Xe.prototype.loop = function () {
		this.yp.ul(() => this.Ge());
	}),
	(Xe.prototype.redraw = function (t = 1) {
		tt.Di('number' == typeof t && t > 0 && Number.isInteger(t), 'Redraw count must be a positive integer.', {
			method: 'redraw',
			providedValue: t,
		}) && this.um(t);
	}),
	(Xe.prototype.isLooping = function () {
		return this.yp.qu;
	}),
	(Xe.prototype.deltaTime = function () {
		return this.yp.sl;
	}),
	Object.defineProperty(Xe.prototype, 'frameCount', {
		get: function () {
			return this.yp.rl;
		},
		set: function (t) {
			this.yp.rl = t;
		},
		configurable: !0,
		enumerable: !0,
	}),
	Object.defineProperty(Xe.prototype, 'millis', {
		get: function () {
			return this.yp.pl;
		},
		set: function (t) {
			this.yp.pl = t;
		},
		configurable: !0,
		enumerable: !0,
	}),
	Object.defineProperty(Xe.prototype, 'secs', {
		get: function () {
			return this.yp.ml;
		},
		set: function (t) {
			this.yp.ml = t;
		},
		configurable: !0,
		enumerable: !0,
	}));
var is = /* @__PURE__ */ i({ GESTURE_EVENT_NAMES: () => ee, TOUCH_EVENT_NAMES: () => ie });
(Ze(ie),
	Ze(ee),
	We([
		{
			name: 'touches',
			get: function () {
				return this.wp.fd();
			},
		},
	]));
var es = /* @__PURE__ */ i({ KEYBOARD_EVENT_NAMES: () => Ji });
(Ze(Ji),
	(Xe.prototype.isKeyPressed = function (t) {
		return this.bp.gf(t);
	}),
	We([
		{
			name: 'lastKeyPressed',
			get: function () {
				return this.bp.wf();
			},
		},
		{
			name: 'lastKeyReleased',
			get: function () {
				return this.bp.bf();
			},
		},
		{
			name: 'pressedKeys',
			get: function () {
				return this.bp.Mf();
			},
		},
		{
			name: 'modifierState',
			get: function () {
				return this.bp.Af();
			},
		},
	]));
var ss = /* @__PURE__ */ i({ GAMEPAD_EVENT_NAMES: () => se });
(Ze(se),
	(Xe.prototype.gamepad = function (t) {
		return this.Mp.Sd(t);
	}),
	We([
		{
			name: 'gamepads',
			get: function () {
				return this.Mp.xd();
			},
		},
	]),
	(Xe.prototype.perspective = function (t, i, e) {
		this.layers.base.perspective(t, i, e);
	}),
	(Xe.prototype.createCamera = function () {
		return this.layers.base.createCamera();
	}),
	(Xe.prototype.setCamera = function (t) {
		this.layers.base.setCamera(t);
	}),
	(Xe.prototype.resetCamera = function () {
		this.layers.base.resetCamera();
	}),
	(Xe.prototype.camera = function (t, i, e, s = 0, r = 0, n = 0, h = 0, o = 1, a = 0) {
		this.layers.base.camera(t, i, e, s, r, n, h, o, a);
	}),
	(Xe.prototype.lookAt = function (t, i, e, s, r, n) {
		this.layers.base.lookAt(t, i, e, s, r, n);
	}),
	(Xe.prototype.ortho = function (t, i) {
		this.layers.base.ortho(t, i);
	}));
var rs = /* @__PURE__ */ (function (t) {
		return (
			(t[(t.POINTS = 0)] = 'POINTS'),
			(t[(t.LINES = 1)] = 'LINES'),
			(t[(t.LINE_STRIP = 2)] = 'LINE_STRIP'),
			(t[(t.LINE_LOOP = 3)] = 'LINE_LOOP'),
			(t[(t.TRIANGLES = 4)] = 'TRIANGLES'),
			(t[(t.TRIANGLE_STRIP = 5)] = 'TRIANGLE_STRIP'),
			(t[(t.TRIANGLE_FAN = 6)] = 'TRIANGLE_FAN'),
			(t[(t.QUADS = 7)] = 'QUADS'),
			(t[(t.QUAD_STRIP = 8)] = 'QUAD_STRIP'),
			t
		);
	})({}),
	ns = {
		0: function (t, i, e, s, r, n) {
			for (let h = 0; h < n; h++) {
				const n = t.X.state;
				(n.Is(), n.Vn(r[h]), n.jn.Mr(i[h], e[h], s[h]), t.X.Wa(1, 1), n.Ns());
			}
		},
		1: function (t, i, e, s, r, n) {
			for (let h = 0; h + 1 < n; h += 2) os(t, i, e, r, h, h + 1);
		},
		2: hs,
		3: function (t, i, e, s, r, n) {
			hs(t, i, e, 0, r, n, 'close');
		},
		4: function (t, i, e, s, r, n) {
			for (let h = 0; h + 2 < n; h += 3) as(t, i, e, s, r[h], h, h + 1, h + 2);
		},
		5: function (t, i, e, s, r, n) {
			for (let h = 0; h + 2 < n; h++) as(t, i, e, s, r[h], h, h + 1, h + 2);
		},
		6: function (t, i, e, s, r, n) {
			for (let h = 1; h + 1 < n; h++) as(t, i, e, s, r[0], 0, h, h + 1);
		},
		7: function (t, i, e, s, r, n) {
			for (let h = 0; h + 3 < n; h += 4) cs(t, i, e, s, r[h], h, h + 1, h + 2, h + 3);
		},
		8: function (t, i, e, s, r, n) {
			for (let h = 0; h + 3 < n; h += 2) cs(t, i, e, s, r[h], h, h + 1, h + 3, h + 2);
		},
	};
for (const [$s, Hs] of Object.entries({
	POINTS: 0,
	LINES: 1,
	LINE_STRIP: 2,
	LINE_LOOP: 3,
	TRIANGLES: 4,
	TRIANGLE_STRIP: 5,
	TRIANGLE_FAN: 6,
	QUADS: 7,
	QUAD_STRIP: 8,
}))
	Object.defineProperty(Xe.prototype, $s, { configurable: !0, enumerable: !1, value: Hs, writable: !1 });
function hs(t, i, e, s, r, n, h) {
	for (let o = 0; o + 1 < n; o++) os(t, i, e, r, o, o + 1);
	'close' === h && n > 2 && os(t, i, e, r, n - 1, 0);
}
function os(t, i, e, s, r, n) {
	const h = t.X.state;
	(h.Is(), h.Vn(s[r]), t.X.qa(i[r], e[r], i[n], e[n]), h.Ns());
}
function as(t, i, e, s, r, n, h, o) {
	fs(t, 12);
	const a = t.Rp;
	(ls(a, 0, i[n], e[n], s[n]), ls(a, 4, i[h], e[h], s[h]), ls(a, 8, i[o], e[o], s[o]), us(t, r, 3));
}
function cs(t, i, e, s, r, n, h, o, a) {
	fs(t, 24);
	const c = t.Rp;
	(ls(c, 0, i[n], e[n], s[n]),
		ls(c, 4, i[h], e[h], s[h]),
		ls(c, 8, i[o], e[o], s[o]),
		ls(c, 12, i[n], e[n], s[n]),
		ls(c, 16, i[o], e[o], s[o]),
		ls(c, 20, i[a], e[a], s[a]),
		us(t, r, 6));
}
function us(t, i, e) {
	const s = t.X.state;
	(s.Is(), s.Vn(i), t.X.Ja(t.Rp, e), s.Ns());
}
function ls(t, i, e, s, r) {
	((t[i] = e), (t[i + 1] = s), (t[i + 2] = r), (t[i + 3] = 0));
}
function fs(t, i) {
	if (t.Rp.length >= i) return;
	let e = t.Rp.length;
	for (; e < i;) e *= 2;
	t.Rp = new Float32Array(e);
}
((Xe.prototype.rect = function (t = 1, i = 1) {
	this.X.Wa(t, i);
}),
	(Xe.prototype.point = function () {
		this.X.Wa(1, 1);
	}),
	(Xe.prototype.line = function (t, i, e, s) {
		this.X.qa(t, i, e, s);
	}),
	(Xe.prototype.lineWeight = function (t) {
		if (void 0 === t) return this.X.state.pn.qr;
		this.X.state.pn.yn(t);
	}),
	(Xe.prototype.ellipse = function (t = 1, i = 1) {
		this.X.tc(t / 2, i / 2);
	}),
	(Xe.prototype.triangle = function (t, i, e, s, r, n) {
		this.X.ec(t, i, e, s, r, n);
	}),
	(Xe.prototype.arc = function (t, i, e, s) {
		this.X.rc(t / 2, i / 2, e, s);
	}),
	(Xe.prototype.bezierCurve = function (t, i, e, s, r, n, h, o) {
		this.X.sc(t, i, e, s, r, n, h, o);
	}),
	(Xe.prototype.beginShape = function (t = 2) {
		if (null !== this.Sp) throw new Error('beginShape() called before endShape(). Call endShape() first.');
		((this.Sp = t),
			(this.Ep.length = 0),
			(this.Tp.length = 0),
			(this.Fp.length = 0),
			(this.Pp.length = 0),
			(this.Dp ??= $t.$n()),
			this.X.state.Hn(this.Dp));
	}),
	(Xe.prototype.vertex = function (t, i, e = 0) {
		if (null === this.Sp) throw new Error('vertex() must be called between beginShape() and endShape().');
		const s = this.Lp.pop() ?? $t.$n();
		(this.X.state.Hn(s), this.Ep.push(t), this.Tp.push(i), this.Fp.push(e), this.Pp.push(s));
	}),
	(Xe.prototype.endShape = function (t) {
		if (null === this.Sp || null === this.Dp) throw new Error('endShape() must be called after beginShape().');
		const i = this.Sp,
			e = this.Ep,
			s = this.Tp,
			r = this.Fp,
			n = this.Pp,
			h = n.length,
			o = this.Dp;
		try {
			!(function (t, i, e, s, r, n, h, o) {
				const a = ns[i];
				a?.(t, e, s, r, n, h, o);
			})(this, i, e, s, r, n, h, t);
		} finally {
			this.X.state.Vn(o);
			for (let t = 0; t < n.length; t++) this.Lp.push(n[t]);
			((e.length = 0), (s.length = 0), (r.length = 0), (n.length = 0), (this.Sp = null));
		}
	}),
	(Xe.prototype.box = function (t = 50, i, e) {
		const s = i ?? t,
			r = e ?? s;
		this.X.nc(t, s, r);
	}),
	(Xe.prototype.sphere = function (t = 50) {
		this.X.hc(t);
	}),
	(Xe.prototype.torus = function (t = 50, i = 10) {
		this.X.oc(t, i);
	}),
	(Xe.prototype.cone = function (t = 50, i) {
		this.X.ac(t, i ?? t);
	}),
	(Xe.prototype.cylinder = function (t = 50, i) {
		this.X.cc(t, i ?? t);
	}),
	(Xe.prototype.ellipsoid = function (t = 50, i, e) {
		this.X.uc(t, i ?? t, e ?? t);
	}));
var ds = /* @__PURE__ */ new Float32Array(16);
((Xe.prototype.rotate = function (t = 0, i, e) {
	const s = this.X.state.jn;
	if ('number' == typeof i || void 0 !== e) return (s.Sr(t), s.Er(i ?? 0), void s.Tr(e ?? 0));
	void 0 === i
		? s.Tr(t)
		: Array.isArray(i)
			? s.Fr(t, i[0] ?? 0, i[1] ?? 0, i[2] ?? 0)
			: s.Fr(t, i.x ?? 0, i.y ?? 0, i.z ?? 0);
}),
	(Xe.prototype.rotateX = function (t) {
		if (void 0 === t) return N(this.X.state.jn.ur);
		this.X.state.jn.Sr(t);
	}),
	(Xe.prototype.rotateY = function (t) {
		if (void 0 === t) return N(this.X.state.jn.lr);
		this.X.state.jn.Er(t);
	}),
	(Xe.prototype.rotateZ = function (t) {
		if (void 0 === t) return N(this.X.state.jn.dr);
		this.X.state.jn.Tr(t);
	}),
	(Xe.prototype.translate = function (t = 0, i = 0, e = 0) {
		this.X.state.jn.Mr(t, i, e);
	}),
	(Xe.prototype.translateX = function (t) {
		if (void 0 === t) return this.X.state.jn.hr;
		this.X.state.jn.Mr(t, 0, 0);
	}),
	(Xe.prototype.translateY = function (t) {
		if (void 0 === t) return this.X.state.jn.ar;
		this.X.state.jn.Mr(0, t, 0);
	}),
	(Xe.prototype.translateZ = function (t) {
		if (void 0 === t) return this.X.state.jn.cr;
		this.X.state.jn.Mr(0, 0, t);
	}),
	(Xe.prototype.scale = function (t, i, e) {
		this.X.state.jn.Cr(t, i, e);
	}),
	(Xe.prototype.resetMatrix = function () {
		this.X.state.jn.Pr();
	}),
	(Xe.prototype.applyMatrix = function (...t) {
		let i;
		if (1 === t.length && 'number' != typeof t[0]) i = t[0];
		else {
			if (16 !== t.length)
				throw new Error('applyMatrix() expects either a 16-length array-like or 16 numeric arguments.');
			i = t;
		}
		if (16 !== i.length) throw new Error('applyMatrix() expects exactly 16 values.');
		for (let e = 0; e < 16; e++) ds[e] = Number(i[e] ?? 0);
		this.X.state.jn.Lr(ds);
	}),
	(Xe.prototype.push = function () {
		(this.X.state.Is(), this.X.Ga());
	}),
	(Xe.prototype.pop = function () {
		(this.X.$a(), this.X.state.Ns());
	}),
	Object.defineProperty(Xe.prototype, 'windowWidth', {
		get: function () {
			return window.innerWidth;
		},
		configurable: !0,
		enumerable: !0,
	}),
	Object.defineProperty(Xe.prototype, 'windowHeight', {
		get: function () {
			return window.innerHeight;
		},
		configurable: !0,
		enumerable: !0,
	}),
	Object.defineProperty(Xe.prototype, 'displayWidth', {
		get: function () {
			return screen.width;
		},
		configurable: !0,
		enumerable: !0,
	}),
	Object.defineProperty(Xe.prototype, 'displayHeight', {
		get: function () {
			return screen.height;
		},
		configurable: !0,
		enumerable: !0,
	}),
	(Xe.prototype.color = function (t, i, e, s) {
		return this.im(t, i, e, s);
	}),
	(Xe.prototype.colorMode = function (t, i, e, s, r) {
		const n = this.X.state.pn;
		if (void 0 === t) return n.Pn();
		const h = (function (t, i, e, s, r) {
			if ('rgb' !== t && 'hsb' !== t && 'hsl' !== t)
				throw new Error("colorMode() mode must be 'rgb', 'hsb', or 'hsl'.");
			let n = Et(t);
			if (void 0 !== i && void 0 === e && void 0 === s && void 0 === r) n = [i, i, i, i];
			else if (void 0 !== i || void 0 !== e || void 0 !== s || void 0 !== r) {
				if (void 0 === i || void 0 === e || void 0 === s)
					throw new Error('colorMode() expects either one shared max or max1, max2, and max3.');
				n = [i, e, s, r ?? n[3]];
			}
			for (const h of n)
				if (!Number.isFinite(h) || h <= 0)
					throw new Error('colorMode() max values must be finite numbers greater than 0.');
			return { mode: t, maxes: n };
		})(t, i, e, s, r);
		n.Ln(h.mode, h.maxes);
	}),
	(Xe.prototype.background = function (t, i, e, s = 255) {
		if (void 0 === t) {
			const [t, i, e, s] = this.X.state.pn.Ce;
			return $i.Bc(t, i, e, s);
		}
		const r = this.im(t, i, e, s);
		(this.X.state.pn.Tn(r.r, r.g, r.b, r.a), this.Ke?.es(r.normalized), this.X.lc(r.r, r.g, r.b, r.a));
	}),
	(Xe.prototype.clear = function () {
		(this.Ke?.ss(), this.X.state.pn.Fn(), this.X.Lh(0, 0, 0, 0));
	}));
var _s = Je(
	function () {
		return this.X.state.pn.en;
	},
	function (t) {
		this.X.state.pn.Mn(t.r, t.g, t.b, t.a);
	}
);
((Xe.prototype.charColor = _s), qe('stroke', 'charColor'));
var ps = Je(
	function () {
		return this.X.state.pn.sn;
	},
	function (t) {
		this.X.state.pn.An(t.r, t.g, t.b, t.a);
	}
);
function ms(t) {
	if ('object' != typeof t || null === t) return !1;
	const i = t;
	return 'number' == typeof i.x && 'number' == typeof i.y && 'number' == typeof i.z;
}
async function vs(t) {
	if (
		t.startsWith('./') ||
		t.startsWith('../') ||
		t.endsWith('.vert') ||
		t.endsWith('.frag') ||
		t.endsWith('.glsl')
	) {
		const i = await fetch(t);
		if (!i.ok) throw new Error(`Failed to load shader from ${t}: ${i.statusText}`);
		return await i.text();
	}
	return t;
}
((Xe.prototype.cellColor = ps),
	qe('fill', 'cellColor'),
	(Xe.prototype.char = function (t) {
		if (void 0 === t) return this.X.state.pn.tn;
		const i = 'number' == typeof t ? this.font.characters[t].character : t;
		if (0 === i.length) throw new Error('char() requires at least one character.');
		(this.X.state.pn.wn(this.font.Qt(i)), this.X.state.pn.bn(i));
	}),
	(Xe.prototype.flipX = function (t) {
		if (void 0 === t) return this.X.state.pn.hn;
		this.X.state.pn.Cn(t);
	}),
	(Xe.prototype.flipY = function (t) {
		if (void 0 === t) return this.X.state.pn.an;
		this.X.state.pn.xn(t);
	}),
	(Xe.prototype.charRotation = function (t) {
		if (void 0 === t) return 360 * this.X.state.pn.un;
		this.X.state.pn.En(t);
	}),
	(Xe.prototype.invert = function (t) {
		if (void 0 === t) return this.X.state.pn.cn;
		this.X.state.pn.Sn(t);
	}),
	(Xe.prototype.ambientLight = function (t, i, e, s) {
		const [r, n, h] = $i.Lc(t, i, e, s).normalized;
		this.X.state.Ve.Yr(r, n, h);
	}),
	(Xe.prototype.pointLight = function (t, i, e, s, r, n) {
		let h, o;
		if ('number' == typeof t && 'number' == typeof i && 'number' == typeof e)
			if (((h = $i.Lc(t, i, e)), ms(s))) o = s;
			else {
				if ('number' != typeof s || 'number' != typeof r || 'number' != typeof n)
					throw new Error('pointLight() expected RGB + XYZ or RGB + { x, y, z }.');
				o = { x: s, y: r, z: n };
			}
		else if (((h = $i.Lc(t)), ms(i))) o = i;
		else {
			if ('number' != typeof i || 'number' != typeof e || 'number' != typeof s)
				throw new Error('pointLight() expected color + XYZ or color + { x, y, z }.');
			o = { x: i, y: e, z: s };
		}
		const [a, c, u] = h.normalized;
		this.X.state.Ve.Kr(a, c, u, o.x, o.y, o.z);
	}),
	(Xe.prototype.lightFalloff = function (t, i, e) {
		this.X.state.Ve.Zr(t, i, e);
	}),
	(Xe.prototype.noLights = function () {
		this.X.state.Ve.Wr();
	}),
	(Xe.prototype.shader = function (t) {
		this.X.za(t);
	}),
	(Xe.prototype.resetShader = function () {
		this.X.Qa();
	}),
	(Xe.prototype.setUniform = function (t, i) {
		this.X.rr(t, i);
	}),
	(Xe.prototype.setUniforms = function (t) {
		this.X.qe(t);
	}),
	(Xe.prototype.createMaterialShader = async function (t) {
		const i = await vs(t),
			e = this.X.Ha(i);
		return (this.tm(e), e);
	}),
	(Xe.prototype.createShader = async function (t, i) {
		const e = await vs(t),
			s = await vs(i),
			r = this.X.ir(e, s);
		return (this.tm(r), r);
	}));
var gs = class t extends Ki {
		constructor(t, i, e, s, r, n, h, o, a) {
			super(t, i, e, s, r, n, h, o, a);
		}
		static vm(i, e, s, r, n, h) {
			const o = i.context,
				{ texture: a, width: c, height: u } = _t(o, s);
			return new t(o, i, a, e, c, u, r, n, h);
		}
	},
	ys = class t extends Ki {
		Zt;
		constructor(t, i, e, s, r, n, h, o, a, c) {
			(super(t, i, e, s, r, n, h, o, c), (this.Zt = a));
		}
		static gm(i, e, s, r, n, h) {
			const o = i.context,
				{ texture: a, width: c, height: u } = _t(o, s);
			return new t(o, i, a, e, c, u, r, n, s, h);
		}
		J() {
			this.Zt instanceof HTMLVideoElement
				? this.Zt.readyState >= this.Zt.HAVE_CURRENT_DATA && dt(this.As, this.zn, this.Zt)
				: dt(this.As, this.zn, this.Zt);
		}
		Qs() {
			return (this.$u(), super.Qs());
		}
		Ka() {
			return (this.$u(), super.Ka());
		}
		Nu() {
			this.J();
		}
		aa() {
			this.J();
		}
		get source() {
			return this.Zt;
		}
	},
	ws = class t extends ys {
		constructor(t, i, e, s, r, n, h, o, a, c) {
			super(t, i, e, s, n, h, o, a, r, c);
		}
		dispose() {
			(super.dispose(), this.ym.pause(), (this.ym.src = ''), this.ym.load());
		}
		static async wm(t) {
			const i = document.createElement('video');
			return (
				(i.crossOrigin = 'anonymous'),
				(i.loop = !0),
				(i.muted = !0),
				(i.playsInline = !0),
				await new Promise((e, s) => {
					(i.addEventListener('loadedmetadata', () => e(), { once: !0 }),
						i.addEventListener(
							'error',
							(t) => {
								const i = t.target;
								s(
									/* @__PURE__ */ new Error(
										`Failed to load video: ${i.error?.message || 'Unknown error'}`
									)
								);
							},
							{ once: !0 }
						),
						(i.src = t));
				}),
				i
			);
		}
		static gm(i, e, s, r, n, h) {
			const o = i.context,
				{ texture: a, width: c, height: u } = _t(o, s, o.LINEAR, o.LINEAR, o.CLAMP_TO_EDGE, o.CLAMP_TO_EDGE);
			return new t(o, i, a, e, s, c, u, r, n, h);
		}
		static async vm(i, e, s, r, n, h) {
			const o = await t.wm(s);
			return t.gm(i, e, o, r, n, h);
		}
		async play() {
			await this.ym.play();
		}
		pause() {
			this.ym.pause();
		}
		stop() {
			(this.ym.pause(), (this.ym.currentTime = 0));
		}
		speed(t) {
			return ((this.ym.playbackRate = t), this);
		}
		loop(t = !0) {
			return ((this.ym.loop = t), this);
		}
		time(t) {
			return ((this.ym.currentTime = t), this);
		}
		volume(t) {
			return ((this.ym.volume = Q(t, 0, 1)), this);
		}
		get videoElement() {
			return this.ym;
		}
		get currentTime() {
			return this.ym.currentTime;
		}
		get duration() {
			return this.ym.duration;
		}
		get isPlaying() {
			return !this.ym.paused && !this.ym.ended;
		}
		get ym() {
			return this.Zt;
		}
	};
((Xe.prototype.createFramebuffer = function (t) {
	const i = this.X.q(t.width ?? this.grid.cols, t.height ?? this.grid.rows, t.attachments ?? 3, {
		depth: t.depth ?? !0,
		filter: t.filter ?? 'nearest',
	});
	return (this.tm(i), i);
}),
	(Xe.prototype.image = function (t, i, e) {
		(this.X.Va(t, i, e, this.font), t instanceof yt && this.X.js());
	}),
	(Xe.prototype.loadImage = async function (t) {
		const i = t,
			e = new Promise((t, e) => {
				const s = new Image();
				((s.crossOrigin = 'anonymous'), (s.onload = () => t(s)), (s.onerror = (t) => e(t)), (s.src = i));
			}),
			[s] = await Promise.all([e, this.jp]),
			r = this.grid;
		if (!r) throw new Error('[textmode.js] Cannot load image before grid initialization completes.');
		const n = gs.vm(this.X, this.xp, s, r.cols, r.rows, this.im);
		return (this.tm(n), n);
	}),
	(Xe.prototype.loadVideo = async function (t) {
		const [i] = await Promise.all([ws.wm(t), this.jp]),
			e = this.grid;
		if (!e) throw new Error('[textmode.js] Cannot load video before grid initialization completes.');
		const s = ws.gm(this.X, this.xp, i, e.cols, e.rows, this.im);
		return (this.tm(s), s);
	}),
	(Xe.prototype.createTexture = function (t) {
		const i = this.grid,
			e = ys.gm(this.X, this.xp, t, i?.cols ?? 1, i?.rows ?? 1, this.im);
		return (this.tm(e), e);
	}),
	(Xe.prototype.texture = function (t) {
		if (t instanceof yt) return void this.X.state.zn.On(t);
		if (!(t instanceof Ki))
			throw new r(
				'[textmode.js] texture() expects a TextmodeImage, TextmodeVideo, TextmodeTexture, or TextmodeFramebuffer source.',
				{ method: 'texture', providedValue: t }
			);
		const i = t.Gu(this.font);
		(t.Za() && this.X.ja(t), this.X.state.zn.kn(i));
	}),
	(Xe.prototype.noTexture = function () {
		this.X.state.zn.Bn();
	}));
var bs = {
	BLEND_NORMAL: k.NORMAL,
	BLEND_ADDITIVE: k.ADDITIVE,
	BLEND_MULTIPLY: k.MULTIPLY,
	BLEND_SCREEN: k.SCREEN,
	BLEND_SUBTRACT: k.SUBTRACT,
	BLEND_DARKEN: k.DARKEN,
	BLEND_LIGHTEN: k.LIGHTEN,
	BLEND_OVERLAY: k.OVERLAY,
	BLEND_SOFT_LIGHT: k.SOFT_LIGHT,
	BLEND_HARD_LIGHT: k.HARD_LIGHT,
	BLEND_COLOR_DODGE: k.COLOR_DODGE,
	BLEND_COLOR_BURN: k.COLOR_BURN,
	BLEND_DIFFERENCE: k.DIFFERENCE,
	BLEND_EXCLUSION: k.EXCLUSION,
};
for (const [$s, Hs] of Object.entries(bs))
	Object.defineProperty(Xe.prototype, $s, { configurable: !0, enumerable: !1, value: Hs, writable: !1 });
((Xe.prototype.on = function (t, i) {
	return this.Ap.bl(t, i);
}),
	(Xe.prototype.off = function (t, i) {
		this.Ap.Ml(t, i);
	}),
	(Xe.prototype.once = function (t, i) {
		return this.Ap.Al(t, i);
	}),
	(Xe.prototype.random = function (t, i) {
		return Array.isArray(t)
			? this.Op.random(t)
			: 'number' != typeof t
				? this.Op.random()
				: 'number' != typeof i
					? this.Op.random(t)
					: this.Op.random(t, i);
	}),
	(Xe.prototype.randomGaussian = function (t, i) {
		return this.Op.randomGaussian(t, i);
	}),
	(Xe.prototype.randomSeed = function (t) {
		((this.Bp = Oe(t)), this.Op.randomSeed(t), this.Ip.clear(), this.Np.noiseSeed(Be(this.Bp, 'noise')));
	}),
	(Xe.prototype.randomStream = function (t) {
		const i = String(t),
			e = this.Ip.get(i);
		if (e) return e;
		const s = new je(Be(this.Bp, i));
		return (this.Ip.set(i, s), s);
	}),
	(Xe.prototype.noise = function (t, i, e) {
		return this.Np.noise(t, i, e);
	}),
	(Xe.prototype.noiseSeed = function (t) {
		this.Np.noiseSeed(t);
	}),
	(Xe.prototype.noiseDetail = function (t, i) {
		this.Np.noiseDetail(t, i);
	}));
var Ms = class t {
	x;
	y;
	z;
	constructor(t = 0, i = 0, e = 0) {
		((this.x = t), (this.y = i), (this.z = e));
	}
	set(t, i, e) {
		return As(t)
			? ((this.x = t.x), (this.y = t.y), (this.z = t.z ?? 0), this)
			: Cs(t)
				? ((this.x = t[0] ?? 0), (this.y = t[1] ?? 0), (this.z = t[2] ?? 0), this)
				: ((this.x = t ?? 0), (this.y = i ?? 0), (this.z = e ?? 0), this);
	}
	copy() {
		return new t(this.x, this.y, this.z);
	}
	add(t, i, e) {
		const [s, r, n] = Ss(t, i, e);
		return ((this.x += s), (this.y += r), (this.z += n), this);
	}
	sub(t, i, e) {
		const [s, r, n] = Ss(t, i, e);
		return ((this.x -= s), (this.y -= r), (this.z -= n), this);
	}
	mult(t, i, e) {
		const [s, r, n] = Es(t, i, e);
		return ((this.x *= s), (this.y *= r), (this.z *= n), this);
	}
	div(t, i, e) {
		const [s, r, n] = Es(t, i, e);
		return ((this.x /= s), (this.y /= r), (this.z /= n), this);
	}
	mag() {
		return Math.hypot(this.x, this.y, this.z);
	}
	magSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	normalize() {
		const t = this.mag();
		return (0 !== t && this.div(t), this);
	}
	limit(t) {
		return (this.magSq() > t * t && this.setMag(t), this);
	}
	setMag(t) {
		return this.normalize().mult(t);
	}
	dist(t, i, e) {
		const [s, r, n] = xs(t, i, e);
		return Math.hypot(this.x - s, this.y - r, this.z - n);
	}
	dot(t, i, e) {
		const [s, r, n] = xs(t, i, e);
		return this.x * s + this.y * r + this.z * n;
	}
	cross(i, e, s) {
		const [r, n, h] = xs(i, e, s);
		return new t(this.y * h - this.z * n, this.z * r - this.x * h, this.x * n - this.y * r);
	}
	heading() {
		return N(Math.atan2(this.y, this.x));
	}
};
function As(t) {
	return (
		'object' == typeof t && null !== t && 'x' in t && 'y' in t && 'number' == typeof t.x && 'number' == typeof t.y
	);
}
function Cs(t) {
	return Array.isArray(t);
}
function xs(t, i, e) {
	return As(t) ? [t.x, t.y, t.z ?? 0] : Cs(t) ? [t[0] ?? 0, t[1] ?? 0, t[2] ?? 0] : [t ?? 0, i ?? 0, e ?? 0];
}
function Ss(t, i, e) {
	return xs(t, i, e);
}
function Es(t, i, e) {
	if (As(t)) return [t.x, t.y, t.z ?? 1];
	if (Cs(t)) {
		if (1 === t.length) {
			const i = t[0] ?? 1;
			return [i, i, i];
		}
		return [t[0] ?? 1, t[1] ?? 1, t[2] ?? 1];
	}
	return void 0 !== t && void 0 === i && void 0 === e ? [t, t, t] : [t ?? 1, i ?? 1, e ?? 1];
}
((Xe.prototype.sin = Math.sin),
	(Xe.prototype.cos = Math.cos),
	(Xe.prototype.tan = Math.tan),
	(Xe.prototype.asin = Math.asin),
	(Xe.prototype.acos = Math.acos),
	(Xe.prototype.atan = Math.atan),
	(Xe.prototype.atan2 = Math.atan2),
	(Xe.prototype.floor = Math.floor),
	(Xe.prototype.ceil = Math.ceil),
	(Xe.prototype.round = function (t, i = 0) {
		if (i <= 0) return Math.round(t);
		const e = Math.pow(10, i);
		return Math.round(t * e) / e;
	}),
	(Xe.prototype.abs = Math.abs),
	(Xe.prototype.min = function (...t) {
		const i = Array.isArray(t[0]) ? t[0] : t;
		return Math.min(...i);
	}),
	(Xe.prototype.max = function (...t) {
		const i = Array.isArray(t[0]) ? t[0] : t;
		return Math.max(...i);
	}),
	(Xe.prototype.sq = function (t) {
		return t * t;
	}),
	(Xe.prototype.sqrt = Math.sqrt),
	(Xe.prototype.pow = Math.pow),
	(Xe.prototype.fract = function (t) {
		return t - Math.floor(t);
	}),
	(Xe.prototype.exp = Math.exp),
	(Xe.prototype.log = Math.log),
	(Xe.prototype.lerp = function (t, i, e) {
		return t + (i - t) * e;
	}),
	(Xe.prototype.ease = function (t, i) {
		return (function (t, i) {
			const e = K[t];
			if (!e) throw new Error(`Unknown easing function "${t}". Available easing functions: ${G.join(', ')}.`);
			return e(
				(function (t) {
					return Number.isNaN(t) ? 0 : t === 1 / 0 ? 1 : t === -1 / 0 ? 0 : Q(t, 0, 1);
				})(i)
			);
		})(t, i);
	}),
	(Xe.prototype.map = function (t, i, e, s, r) {
		return s + ((r - s) * (t - i)) / (e - i);
	}),
	(Xe.prototype.norm = function (t, i, e) {
		return this.map(t, i, e, 0, 1);
	}),
	(Xe.prototype.constrain = function (t, i, e) {
		return Q(t, i, e);
	}),
	(Xe.prototype.clamp = function (t, i, e) {
		return Q(t, i, e);
	}),
	(Xe.prototype.dist = function (t, i, e, s) {
		return z(t, i, e, s);
	}),
	(Xe.prototype.degrees = function (t) {
		return N(t);
	}),
	(Xe.prototype.radians = function (t) {
		return I(t);
	}),
	(Xe.prototype.createVector = function (t = 0, i = 0, e = 0) {
		return new Ms(t, i, e);
	}));
var Ts = class t {
	bm;
	characters;
	length;
	constructor(t) {
		const i = E(t);
		if (i.length < 2) throw new Error('TextmodeGlyphRamp requires at least two characters.');
		((this.characters = t), (this.length = i.length), (this.bm = i));
	}
	at(t, i, e) {
		if (void 0 !== i || void 0 !== e) {
			if (void 0 === i || void 0 === e)
				throw new Error('TextmodeGlyphRamp.at() range mapping requires both min and max.');
			if (i === e) throw new Error('TextmodeGlyphRamp.at() requires min and max to be different.');
			return this.at((t - i) / (e - i));
		}
		const s = (function (t) {
				return Number.isNaN(t) ? 0 : t === 1 / 0 ? 1 : t === -1 / 0 ? 0 : Math.min(Math.max(t, 0), 1);
			})(t),
			r = Math.min(Math.floor(s * this.length), this.length - 1);
		return this.bm[r];
	}
	shift(i) {
		const e = ((Math.trunc(i) % this.length) + this.length) % this.length,
			s = [...this.bm.slice(e), ...this.bm.slice(0, e)].join('');
		return new t(s);
	}
};
Xe.prototype.createGlyphRamp = function (t) {
	return new Ts(t);
};
var Fs = {
		red: '#ff0000',
		green: '#00ff00',
		blue: '#0000ff',
		yellow: '#ffff00',
		cyan: '#00ffff',
		magenta: '#ff00ff',
		white: '#ffffff',
		black: '#000000',
		gray: '#808080',
		grey: '#808080',
		orange: '#ffa500',
		purple: '#800080',
		pink: '#ffc0cb',
		brown: '#a52a2a',
	},
	Us = Jt.FLOATS_PER_INSTANCE,
	Ps = Xt[Ht.RECTANGLE];
function Ls(t) {
	if (t.startsWith('fg=')) return { kind: 'fg', value: t.substring(3).trim() };
	if ('/fg' === t) return { kind: '/fg' };
	if (t.startsWith('bg=')) return { kind: 'bg', value: t.substring(3).trim() };
	if ('/bg' === t) return { kind: '/bg' };
	if (t.startsWith('rot=')) {
		const i = t.substring(4).trim(),
			e = i.length > 0 ? Number(i) : NaN;
		return { kind: 'rot', value: Number.isFinite(e) ? e : void 0 };
	}
	return '/rot' === t
		? { kind: '/rot' }
		: 'inv' === t
			? { kind: 'inv' }
			: '/inv' === t
				? { kind: '/inv' }
				: 'fx' === t
					? { kind: 'fx' }
					: '/fx' === t
						? { kind: '/fx' }
						: 'fy' === t
							? { kind: 'fy' }
							: '/fy' === t
								? { kind: '/fy' }
								: void 0;
}
function Ds(t, i, e, s, r) {
	let n = new Float32Array(Math.max(16, Math.min(t.length, 256)) * Us);
	const h = [],
		o = [],
		a = (function (t) {
			const i = t.X.state.pn;
			return {
				fg: [Os(i.en)],
				bg: [Os(i.sn)],
				invert: [i.cn],
				flipX: [i.hn],
				flipY: [i.an],
				charRotation: [i.un],
			};
		})(this),
		c = this.font;
	let u = 0,
		l = 0,
		f = 0,
		d = 0,
		_ = 0;
	const p = (t) => {
		((t) => {
			if (t * Us <= n.length) return;
			let i = n.length / Us;
			for (; i < t;) i *= 2;
			const e = new Float32Array(i * Us);
			(e.set(n), (n = e));
		})(u + 1);
		const i = u * Us,
			s = c.Qt(t),
			o = a.fg[a.fg.length - 1],
			d = a.bg[a.bg.length - 1];
		((n[i + 0] = f * (1 + r)),
			(n[i + 1] = l * e),
			(n[i + 2] = 1),
			(n[i + 3] = 1),
			(n[i + 4] = s[0]),
			(n[i + 5] = s[1]),
			(n[i + 6] = s[2]),
			(n[i + 7] = o[0]),
			(n[i + 8] = o[1]),
			(n[i + 9] = o[2]),
			(n[i + 10] = o[3]),
			(n[i + 11] = d[0]),
			(n[i + 12] = d[1]),
			(n[i + 13] = d[2]),
			(n[i + 14] = d[3]),
			(n[i + 15] = a.invert[a.invert.length - 1] ? 1 : 0),
			(n[i + 16] = a.flipX[a.flipX.length - 1] ? 1 : 0),
			(n[i + 17] = a.flipY[a.flipY.length - 1] ? 1 : 0),
			(n[i + 18] = a.charRotation[a.charRotation.length - 1]),
			(n[i + 19] = 0),
			(n[i + 20] = 0),
			(n[i + 21] = 0),
			(n[i + 22] = 0),
			(n[i + 23] = 0),
			(n[i + 24] = 0),
			(n[i + 25] = 0),
			(n[i + 26] = 0),
			(n[i + 27] = 0),
			(n[i + 28] = 0),
			(n[i + 29] = 0),
			(n[i + 30] = 0),
			(n[i + 31] = 0),
			(n[i + 32] = 0),
			(n[i + 33] = 0),
			(n[i + 34] = 0),
			(n[i + 35] = Ps),
			(h[u] = l),
			u++);
	};
	for (; _ < t.length;) {
		const e = t[_];
		if ('\n' !== e)
			if (i && '[' === e && '[' === t[_ + 1]) (p('['), d++, f++, (_ += 2));
			else if (i && ']' === e && ']' === t[_ + 1]) (p(']'), d++, f++, (_ += 2));
			else {
				if (i && '[' === e) {
					const i = t.indexOf(']', _);
					if (-1 !== i) {
						const e = Ls(t.substring(_ + 1, i));
						if (e) {
							(Rs(e, a), (_ = i + 1));
							continue;
						}
					}
				}
				'\t' !== e ? (p(e), d++, f++, _++) : (d++, (f += s), _++);
			}
		else (o.push(d), (d = 0), l++, (f = 0), _++);
	}
	return (o.push(d), { data: n, glyphLines: h, glyphCount: u, lineWidths: o });
}
function Rs(t, i) {
	'fg' === t.kind
		? ks(i.fg, t.value)
		: '/fg' === t.kind
			? Bs(i.fg)
			: 'bg' === t.kind
				? ks(i.bg, t.value)
				: '/bg' === t.kind
					? Bs(i.bg)
					: 'inv' === t.kind
						? i.invert.push(!0)
						: '/inv' === t.kind
							? Bs(i.invert)
							: 'fx' === t.kind
								? i.flipX.push(!0)
								: '/fx' === t.kind
									? Bs(i.flipX)
									: 'fy' === t.kind
										? i.flipY.push(!0)
										: '/fy' === t.kind
											? Bs(i.flipY)
											: 'rot' === t.kind
												? i.charRotation.push(
														void 0 === t.value
															? i.charRotation[i.charRotation.length - 1]
															: Z(t.value)
													)
												: '/rot' === t.kind && Bs(i.charRotation);
}
function ks(t, i) {
	const e = Fs[i.toLowerCase()] || i;
	try {
		t.push([(s = $i.Lc(e)).r / 255, s.g / 255, s.b / 255, s.a / 255]);
	} catch {
		t.push(t[t.length - 1]);
	}
	var s;
}
function Os(t) {
	return [t[0], t[1], t[2], t[3]];
}
function Bs(t) {
	t.length > 1 && t.pop();
}
((Xe.prototype.printAlign = function (t, i = 'top') {
	((this.Mm = t), (this.Am = i));
}),
	(Xe.prototype.print = function (t, i, e, s) {
		const r = s?.leading ?? 1,
			n = s?.tabSize ?? 4,
			h = s?.letterSpacing ?? 0,
			o = !1 !== s?.markup,
			a = this.Mm || 'left',
			c = this.Am || 'top',
			u = Ds.call(this, t, o, r, n, h);
		0 !== u.glyphCount &&
			((function (t, i, e, s, r, n, h) {
				const { data: o, glyphLines: a, glyphCount: c, lineWidths: u } = i,
					l = u.length;
				let f = 0;
				'middle' === n ? (f = -Math.floor(((l - 1) * h) / 2)) : 'bottom' === n && (f = -(l - 1) * h);
				const d = t.X.state.jn,
					_ = d.vr,
					p = d._r,
					m = d.pr,
					v = d.ur,
					g = d.lr,
					y = d.dr;
				for (let w = 0; w < c; w++) {
					const t = w * Us,
						i = u[a[w]] ?? 0;
					let n = 0;
					'center' === r ? (n = -Math.floor(i / 2)) : 'right' === r && (n = -i);
					const h = e + n + o[t + 0],
						c = s + f + o[t + 1];
					((o[t + 0] = 0),
						(o[t + 1] = 0),
						(o[t + 2] = p),
						(o[t + 3] = m),
						(o[t + 19] = _[0] * h + _[4] * c + _[12]),
						(o[t + 20] = _[1] * h + _[5] * c + _[13]),
						(o[t + 21] = _[2] * h + _[6] * c + _[14]),
						(o[t + 22] = v),
						(o[t + 23] = g),
						(o[t + 24] = y));
				}
			})(this, u, i, e, a, c, r),
			this.X.$o(u.data, u.glyphCount));
	}));
var Is = /* @__PURE__ */ i({
		TextmodeImage: () => gs,
		TextmodeSource: () => Ki,
		TextmodeTexture: () => ys,
		TextmodeVideo: () => ws,
	}),
	Ns = /* @__PURE__ */ i({
		INPUT_EVENT_NAMES: () => re,
		gamepad: () => ss,
		keyboard: () => es,
		mouse: () => ts,
		touch: () => is,
	}),
	js = /* @__PURE__ */ i({}),
	zs = Ve.create,
	Qs = Ve.setErrorLevel,
	Gs = Ve.version;
export {
	ct as ErrorLayerController,
	re as INPUT_EVENT_NAMES,
	k as LayerBlendMode,
	xe as LoadingLayerController,
	rs as ShapeAssemblyMode,
	G as TEXTMODE_EASE_NAMES,
	it as TextmodeCamera,
	Le as TextmodeConversionManager,
	r as TextmodeError,
	J as TextmodeErrorLevel,
	P as TextmodeFont,
	yt as TextmodeFramebuffer,
	Ts as TextmodeGlyphRamp,
	e as TextmodeGrid,
	gs as TextmodeImage,
	rt as TextmodeLayer,
	Te as TextmodeLayerManager,
	je as TextmodeRandom,
	bt as TextmodeShader,
	Ki as TextmodeSource,
	ys as TextmodeTexture,
	D as TextmodeTileset,
	Ms as TextmodeVector,
	ws as TextmodeVideo,
	Xe as Textmodifier,
	He as color,
	De as conversion,
	zs as create,
	ut as errors,
	R as fonts,
	Ns as input,
	Fe as layering,
	Se as loading,
	Is as media,
	js as plugins,
	ze as random,
	Qs as setErrorLevel,
	Ve as textmode,
	Gs as version,
};
