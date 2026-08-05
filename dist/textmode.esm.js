var t = Object.defineProperty,
	i = (i, s) => {
		let e = {};
		for (var r in i) t(e, r, { get: i[r], enumerable: !0 });
		return (s || t(e, Symbol.toStringTag, { value: 'Module' }), e);
	},
	s = class {
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
		constructor(t, i, s) {
			((this.p = t), (this.m = i), (this.v = s), this.reset());
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
			const s = this.p.getBoundingClientRect(),
				e = t - s.left,
				r = i - s.top,
				n = this.p.width / s.width,
				h = r * (this.p.height / s.height),
				o = e * n - this.l,
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
	e = class {
		D = /* @__PURE__ */ new Set();
		k(t) {
			this.D.add(t);
		}
		dispose() {
			for (const t of this.D) t();
			this.D.clear();
		}
	},
	r = class t extends Error {
		constructor(i, s, e) {
			(super(t.R(i, s, e)), (this.name = 'TextmodeError'));
		}
		static R(i, s, e = {}) {
			const { includeContext: r = !0, includeFooterArrows: n = !0 } = e;
			return `${i}${
				r && s && Object.keys(s).length > 0
					? `\n\n📋 Context:${Object.entries(s)
							.map(([i, s]) => `\n  - ${i}: ${t.I(s)}`)
							.join('')}`
					: ''
			}${n ? `\n\n${'↓'.repeat(24)}\n` : '\n\n'}`;
		}
		static I(i) {
			if (null === i) return 'null';
			if (void 0 === i) return 'undefined';
			if ('string' == typeof i) return `"${i}"`;
			if ('number' == typeof i || 'boolean' == typeof i) return String(i);
			if (Array.isArray(i))
				return 0 === i.length
					? '[]'
					: i.length <= 5
						? `[${i.map((i) => t.I(i)).join(', ')}]`
						: `[${i
								.slice(0, 3)
								.map((i) => t.I(i))
								.join(', ')}, ... +${i.length - 3} more]`;
			if ('object' == typeof i) {
				const s = Object.keys(i);
				return 0 === s.length
					? '{}'
					: s.length <= 3
						? `{ ${s.map((s) => `${s}: ${t.I(i[s])}`).join(', ')} }`
						: `{ ${s
								.slice(0, 2)
								.map((s) => `${s}: ${t.I(i[s])}`)
								.join(', ')}, ... +${s.length - 2} more }`;
			}
			return String(i);
		}
	};
function n(t, i, s) {
	if (0 === t.idRangeOffset[s]) return (i + t.idDelta[s]) & 65535;
	{
		const e = t.startCount.length,
			r = t.idRangeOffset[s] / 2 + (i - t.startCount[s]) - (e - s);
		if (r >= 0 && t.glyphIdArray && r < t.glyphIdArray.length) {
			const i = t.glyphIdArray[r];
			if (0 !== i) return (i + t.idDelta[s]) & 65535;
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
	const s = (function (t) {
		const i = t.cmap;
		if (!i?.tables) return { characterTables: [], lookupTables: [] };
		const s = i.tables
				.map((t, s) =>
					(function (t, i, s) {
						if (
							!(function (t) {
								return 4 === t.format || 12 === t.format;
							})(i)
						)
							return null;
						const e = (function (t, i, s) {
							const e = /* @__PURE__ */ new Map();
							for (const r of t.encodings ?? []) r.tableIndex === s && e.set(u(r), r);
							for (const r of i.encodings ?? []) r.tableIndex === s && e.set(u(r), r);
							for (const [r, n] of Object.entries(t.ids ?? {})) {
								if (n !== s) continue;
								const t = c(r, i.format, s);
								t && e.set(u(t), t);
							}
							return [...e.values()];
						})(t, i, s);
						return { table: i, tableIndex: s, encodings: e, isUnicode: e.some(o) };
					})(i, t, s)
				)
				.filter((t) => null !== t)
				.filter((t) => {
					return 4 === (i = t.table).format
						? (function (t) {
								if (!(t.startCount && t.endCount && t.idRangeOffset && t.idDelta)) return !1;
								for (let i = 0; i < t.startCount.length; i++) {
									const s = t.startCount[i],
										e = t.endCount[i];
									if (65535 !== s || 65535 !== e)
										for (let r = s; r <= e; r++) if (n(t, r, i) > 0) return !0;
								}
								return !1;
							})(i)
						: (function (t) {
								if (!t.groups) return !1;
								for (let i = 0; i < t.groups.length; i += 3) {
									const s = t.groups[i],
										e = t.groups[i + 1],
										r = t.groups[i + 2];
									if (s <= e && r + (e - s) > 0) return !0;
								}
								return !1;
							})(i);
					var i;
				}),
			e = s.filter((t) => t.isUnicode),
			r = e.length > 0 ? e : s;
		return { characterTables: r, lookupTables: [...r].sort(l) };
	})(t);
	return (h.set(t, s), s);
}
function c(t, i, s) {
	const e = /^p(\d+)e(\d+)$/.exec(t);
	return e ? { platformID: Number(e[1]), encodingID: Number(e[2]), format: i, tableIndex: s } : null;
}
function u(t) {
	return `${t.platformID}:${t.encodingID}:${t.format}:${t.tableIndex}`;
}
function l(t, i) {
	const s = f(t) - f(i);
	return 0 !== s ? s : t.tableIndex - i.tableIndex;
}
function f(t) {
	const i = t.isUnicode ? 0 : 3;
	return 12 === t.table.format ? i : 4 === t.table.format ? i + 1 : i + 2;
}
var d = class {
		O(t) {
			const i = [];
			return (
				(function (t) {
					return a(t).characterTables;
				})(t).forEach(({ table: t }) => {
					if (4 === t.format) {
						const s = this.N(t);
						i.push(...s);
					} else if (12 === t.format) {
						const s = this.H(t);
						i.push(...s);
					}
				}),
				[...new Set(i)]
			);
		}
		N(t) {
			const i = [];
			if (!(t.startCount && t.endCount && t.idRangeOffset && t.idDelta)) return i;
			for (let s = 0; s < t.startCount.length; s++) {
				const e = t.startCount[s],
					r = t.endCount[s];
				if (65535 !== e || 65535 !== r) for (let h = e; h <= r; h++) n(t, h, s) > 0 && this.G(i, h);
			}
			return i;
		}
		H(t) {
			const i = [];
			if (!t.groups) return i;
			for (let s = 0; s < t.groups.length; s += 3) {
				const e = t.groups[s],
					r = t.groups[s + 1],
					n = t.groups[s + 2];
				for (let t = e; t <= r; t++) n + (t - e) > 0 && this.G(i, t);
			}
			return i;
		}
		G(t, i) {
			try {
				const s = String.fromCodePoint(i);
				t.push(s);
			} catch {}
		}
	},
	_ = class {
		constructor(t) {
			((this.j = t),
				(this.V = null),
				(this.X = 0),
				(this.h = 0),
				(this.o = 0),
				(this.u = 0),
				(this.p = document.createElement('canvas')),
				(this.$ = this.p.getContext('2d', { alpha: !0 })));
		}
		Y(t, i, s) {
			((this.X = Math.ceil(Math.sqrt(t))),
				(this.h = Math.ceil(t / this.X)),
				(this.o = i * this.X),
				(this.u = s * this.h),
				(this.p.width = this.o),
				(this.p.height = this.u),
				(this.p.style.width = this.o + 'px'),
				(this.p.style.height = this.u + 'px'),
				(this.$.imageSmoothingEnabled = !1),
				(this.p.style.imageRendering = 'pixelated'),
				this.$.clearRect(0, 0, this.o, this.u));
		}
		K() {
			(this.V
				? (this.V.width === this.o && this.V.height === this.u) || this.V.resize(this.o, this.u)
				: (this.V = this.j.W(this.o, this.u, 1, { filter: 'nearest', depth: !1 })),
				this.V.Z(this.p));
		}
		L() {
			(this.V?.dispose(), (this.V = null));
		}
	},
	p = class {
		constructor(t) {
			this.q = new _(t);
		}
		J(t, i, s, e) {
			this.q.Y(t.length, i.width, i.height);
			const r = this.q.$;
			((r.textBaseline = 'top'),
				(r.textAlign = 'left'),
				(r.fillStyle = 'white'),
				this.tt(t, i, this.q.X, s, e),
				this.q.K());
		}
		tt(t, i, s, e, r) {
			const n = e / r.head.unitsPerEm,
				h = this.q.$;
			for (let o = 0; o < t.length; o++) {
				const a = t[o],
					c = o % s,
					u = Math.floor(o / s),
					l = a.glyphData;
				if (!l) continue;
				const f = l.advanceWidth * n,
					d = c * i.width,
					_ = u * i.height,
					p = d + 0.5 * i.width,
					m = _ + 0.5 * i.height,
					v = Math.round(p - 0.5 * i.width),
					g = Math.round(m - 0.5 * e),
					y = v + 0.5 * (i.width - f),
					w = g + r.hhea.ascender * n;
				this.it(h, l, y, w, n);
			}
		}
		it(t, i, s, e, r) {
			if (!i || !i.xs || 0 === i.noc) return;
			const { xs: n, ys: h, endPts: o, flags: a } = i;
			if (!(n && h && o && a)) return;
			t.beginPath();
			let c = 0;
			for (let u = 0; u < o.length; u++) {
				const i = o[u];
				if (!(i < c)) {
					if (i >= c) {
						const o = s + n[c] * r,
							u = e - h[c] * r;
						t.moveTo(o, u);
						let l = c + 1;
						for (; l <= i;)
							if (1 & a[l]) {
								const i = s + n[l] * r,
									o = e - h[l] * r;
								(t.lineTo(i, o), l++);
							} else {
								const o = s + n[l] * r,
									u = e - h[l] * r;
								if (l + 1 > i) {
									const i = s + n[c] * r,
										l = e - h[c] * r;
									if (1 & a[c]) t.quadraticCurveTo(o, u, i, l);
									else {
										const s = (o + i) / 2,
											e = (u + l) / 2;
										t.quadraticCurveTo(o, u, s, e);
									}
									break;
								}
								const f = l + 1;
								if (1 & a[f]) {
									const i = s + n[f] * r,
										a = e - h[f] * r;
									(t.quadraticCurveTo(o, u, i, a), (l = f + 1));
								} else {
									const i = (o + (s + n[f] * r)) / 2,
										a = (u + (e - h[f] * r)) / 2;
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
			this.q.L();
		}
		get framebuffer() {
			return this.q.V;
		}
		get columns() {
			return this.q.X;
		}
		get rows() {
			return this.q.h;
		}
	},
	m = class {
		st(t, i) {
			let s = 0;
			for (const { table: e } of (function (t) {
				return a(t).lookupTables;
			})(t))
				if ((4 === e.format ? (s = this.et(i, e)) : 12 === e.format && (s = this.rt(i, e)), s > 0)) break;
			return s;
		}
		nt(t, i) {
			const s = i.codePointAt(0);
			return void 0 === s ? 0 : this.st(t, s);
		}
		ht(t, i) {
			const s = t.hmtx;
			return s && s.aWidth && 0 !== s.aWidth.length
				? i < s.aWidth.length
					? s.aWidth[i]
					: s.aWidth[s.aWidth.length - 1]
				: 0;
		}
		ot(t, i) {
			const s = i / t.head.unitsPerEm;
			return { lineHeight: t.hhea.ascender * s - t.hhea.descender * s + t.hhea.lineGap * s, scale: s };
		}
		et(t, i) {
			const s = i.endCount.length;
			let e = -1;
			for (let r = 0; r < s; r++)
				if (t <= i.endCount[r]) {
					e = r;
					break;
				}
			return -1 === e || t < i.startCount[e] ? 0 : n(i, t, e);
		}
		rt(t, i) {
			const s = i.groups.length / 3;
			for (let e = 0; e < s; e++) {
				const s = i.groups[3 * e],
					r = i.groups[3 * e + 1],
					n = i.groups[3 * e + 2];
				if (t >= s && t <= r) return n + (t - s);
			}
			return 0;
		}
	},
	v = class {
		ct;
		constructor() {
			this.ct = new m();
		}
		ut(t, i, s) {
			let e = 0;
			const r = this.ct.ot(s, i);
			let n = 0,
				h = !1;
			for (const o of t) {
				const t = o.glyphData;
				let i = 0;
				if (!t && ((i = this.ct.nt(s, o.character)), 0 === i)) continue;
				const a = (t?.advanceWidth ?? this.ct.ht(s, i)) * r.scale;
				if (((e = Math.max(e, a)), t)) {
					const i = Math.max(0, t.yMax - t.yMin) * r.scale;
					((n = Math.max(n, i)), (h = !0));
				}
			}
			return (h || (n = r.lineHeight), { width: Math.ceil(e), height: Math.ceil(n) });
		}
	},
	g = {
		readShort: (t, i) => ((g.t.uint16[0] = (t[i] << 8) | t[i + 1]), g.t.int16[0]),
		readUshort: (t, i) => (t[i] << 8) | t[i + 1],
		readUshorts(t, i, s) {
			const e = [];
			for (let r = 0; r < s; r++) e.push(g.readUshort(t, i + 2 * r));
			return e;
		},
		readUint(t, i) {
			const s = g.t.uint8;
			return ((s[3] = t[i]), (s[2] = t[i + 1]), (s[1] = t[i + 2]), (s[0] = t[i + 3]), g.t.uint32[0]);
		},
		readASCII(t, i, s) {
			let e = '';
			for (let r = 0; r < s; r++) e += String.fromCharCode(t[i + r]);
			return e;
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
function w(t, i, s) {
	((t[i] = (s >>> 8) & 255), (t[i + 1] = 255 & s));
}
function b(t, i, s) {
	((t[i] = (s >>> 24) & 255), (t[i + 1] = (s >>> 16) & 255), (t[i + 2] = (s >>> 8) & 255), (t[i + 3] = 255 & s));
}
function M(t, i, s) {
	for (let e = 0; e < s.length; e++) t[i + e] = 255 & s.charCodeAt(e);
}
function A(t, i, s) {
	const e = i + s;
	let r = 0;
	const n = g.t;
	for (let h = i; h < e; h += 4)
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
			parseTab(t, i, s) {
				const e = { tables: [], ids: {}, encodings: [], off: i };
				((t = new Uint8Array(t.buffer, i, s)), (i = 0));
				const r = g,
					n = r.readUshort;
				n(t, i);
				const h = n(t, (i += 2));
				i += 2;
				const o = [];
				for (let a = 0; a < h; a++) {
					const s = n(t, i),
						h = n(t, (i += 2));
					i += 2;
					const a = r.readUint(t, i);
					i += 4;
					const c = `p${s}e${h}`;
					let u = o.indexOf(a);
					if (-1 === u) {
						let i;
						((u = e.tables.length), o.push(a));
						const s = n(t, a);
						((i = 4 === s ? this.parse4(t, a) : 12 === s ? this.parse12(t, a) : { format: s }),
							e.tables.push(i));
					}
					e.ids[c] = u;
					const l = e.tables[u],
						f = { platformID: s, encodingID: h, format: l.format, tableIndex: u };
					(e.encodings.push(f), (l.encodings ??= []).push(f));
				}
				return e;
			},
			parse4(t, i) {
				const s = g,
					e = s.readUshort,
					r = s.readUshorts,
					n = i,
					h = e(t, (i += 2));
				e(t, (i += 2));
				const o = e(t, (i += 2)) >>> 1,
					a = {
						format: 4,
						encodings: [],
						searchRange: e(t, (i += 2)),
						entrySelector: 0,
						rangeShift: 0,
						endCount: [],
						startCount: [],
						idDelta: [],
						idRangeOffset: [],
						glyphIdArray: [],
					};
				((i += 2),
					(a.entrySelector = e(t, i)),
					(i += 2),
					(a.rangeShift = e(t, i)),
					(i += 2),
					(a.endCount = r(t, i, o)),
					(i += 2 * o),
					(i += 2),
					(a.startCount = r(t, i, o)),
					(i += 2 * o));
				for (let c = 0; c < o; c++) (a.idDelta.push(s.readShort(t, i)), (i += 2));
				return ((a.idRangeOffset = r(t, i, o)), (i += 2 * o), (a.glyphIdArray = r(t, i, (n + h - i) >> 1)), a);
			},
			parse12(t, i) {
				const s = g.readUint;
				(s(t, (i += 4)), s(t, (i += 4)));
				const e = s(t, (i += 4));
				i += 4;
				const r = new Uint32Array(3 * e);
				for (let n = 0; n < 3 * e; n += 3)
					((r[n] = s(t, i + (n << 2))),
						(r[n + 1] = s(t, i + (n << 2) + 4)),
						(r[n + 2] = s(t, i + (n << 2) + 8)));
				return { format: 12, encodings: [], groups: r };
			},
		},
		head: {
			parseTab(t, i, s) {
				const e = g;
				i += 18;
				const r = e.readUshort(t, i);
				((i += 2), (i += 16));
				const n = e.readShort(t, i);
				i += 2;
				const h = e.readShort(t, i);
				i += 2;
				const o = e.readShort(t, i);
				i += 2;
				const a = e.readShort(t, i);
				return (
					(i += 2),
					(i += 6),
					{ unitsPerEm: r, xMin: n, yMin: h, xMax: o, yMax: a, indexToLocFormat: e.readShort(t, i) }
				);
			},
		},
		hhea: {
			parseTab(t, i, s) {
				const e = g;
				i += 4;
				const r = e.readShort,
					n = e.readUshort;
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
			parseTab(t, i, s) {
				const e = g;
				return (e.readUint(t, i), (i += 4), { numGlyphs: e.readUshort(t, i) });
			},
		},
		hmtx: {
			parseTab(t, i, s, e) {
				const r = g,
					n = [],
					h = [],
					o = e.maxp.numGlyphs,
					a = e.hhea.numberOfHMetrics;
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
			parseTab(t, i, s, e) {
				const r = g,
					n = [],
					h = e.head.indexToLocFormat,
					o = e.maxp.numGlyphs + 1;
				if (0 === h) for (let a = 0; a < o; a++) n.push(r.readUshort(t, i + (a << 1)) << 1);
				else if (1 === h) for (let a = 0; a < o; a++) n.push(r.readUint(t, i + (a << 2)));
				return n;
			},
		},
		glyf: {
			parseTab(t, i, s, e) {
				const r = [],
					n = e.maxp.numGlyphs;
				for (let h = 0; h < n; h++) r.push(null);
				return r;
			},
			lt(t, i) {
				const s = g,
					e = t.ft,
					r = t.loca;
				if (r[i] === r[i + 1]) return null;
				const n = S.findTable(e, 'glyf', t.dt);
				if (!n) return null;
				let h = n[0] + r[i];
				const o = {};
				if (
					((o.noc = s.readShort(e, h)),
					(h += 2),
					(o.xMin = s.readShort(e, h)),
					(h += 2),
					(o.yMin = s.readShort(e, h)),
					(h += 2),
					(o.xMax = s.readShort(e, h)),
					(h += 2),
					(o.yMax = s.readShort(e, h)),
					(h += 2),
					o.xMin >= o.xMax || o.yMin >= o.yMax)
				)
					return null;
				if (o.noc > 0) {
					o.endPts = [];
					for (let a = 0; a < o.noc; a++) (o.endPts.push(s.readUshort(e, h)), (h += 2));
					const t = s.readUshort(e, h);
					if (((h += 2), e.length - h < t)) return null;
					h += t;
					const i = o.endPts[o.noc - 1] + 1;
					o.flags = [];
					for (let s = 0; s < i; s++) {
						const t = e[h];
						if ((h++, o.flags.push(t), 8 & t)) {
							const i = e[h];
							h++;
							for (let e = 0; e < i; e++) (o.flags.push(t), s++);
						}
					}
					o.xs = [];
					for (let a = 0; a < i; a++) {
						const t = o.flags[a],
							i = !!(16 & t);
						2 & t
							? (o.xs.push(i ? e[h] : -e[h]), h++)
							: i
								? o.xs.push(0)
								: (o.xs.push(s.readShort(e, h)), (h += 2));
					}
					o.ys = [];
					for (let a = 0; a < i; a++) {
						const t = o.flags[a],
							i = !!(32 & t);
						4 & t
							? (o.ys.push(i ? e[h] : -e[h]), h++)
							: i
								? o.ys.push(0)
								: (o.ys.push(s.readShort(e, h)), (h += 2));
					}
					let r = 0,
						n = 0;
					for (let s = 0; s < i; s++) ((r += o.xs[s]), (n += o.ys[s]), (o.xs[s] = r), (o.ys[s] = n));
				} else ((o.parts = []), (o.endPts = []), (o.flags = []), (o.xs = []), (o.ys = []));
				return o;
			},
		},
	},
	S = {
		parse(t) {
			const i = new Uint8Array(t),
				s = x,
				e = {},
				r = { ft: i, _t: 0, dt: 0 };
			for (const n in s) {
				const t = n,
					h = S.findTable(i, t, 0);
				if (h) {
					const [n, o] = h;
					let a = e[n];
					(null == a && ((a = s[t].parseTab(i, n, o, r)), (e[n] = a)), Object.assign(r, { [t]: a }));
				}
			}
			return [r];
		},
		findTable(t, i, s) {
			const e = g,
				r = e.readUshort(t, s + 4);
			let n = s + 12;
			for (let h = 0; h < r; h++) {
				const s = e.readASCII(t, n, 4);
				e.readUint(t, n + 4);
				const r = e.readUint(t, n + 8),
					h = e.readUint(t, n + 12);
				if (s === i) return [r, h];
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
function F(t) {
	return Array.from(t, (t) => t.codePointAt(0)).filter((t) => void 0 !== t);
}
var U = class {
	vt;
	constructor() {
		this.vt = new m();
	}
	gt(t, i) {
		const s = [],
			e = /* @__PURE__ */ new Map();
		return (
			t.forEach((t, r) => {
				const n = { character: t, unicode: F(t)[0] ?? 0, color: this.yt(r), glyphData: this.wt(i, t) };
				(s.push(n), e.set(t, n));
			}),
			{ array: s, map: e }
		);
	}
	yt(t) {
		return [(t % 256) / 255, (Math.floor(t / 256) % 256) / 255, 0];
	}
	wt(t, i) {
		const s = i.codePointAt(0) || 0,
			e = this.vt.st(t, s);
		if (0 === e) return null;
		const r = this.vt.ht(t, e),
			n = S.T.glyf.lt(t, e);
		return n ? { ...n, advanceWidth: r } : null;
	}
};
function T(t) {
	if ('head' !== t.tag || t.data.length < 12) return A(t.data, 0, y(t.data.length));
	const i = new Uint8Array(t.data);
	return (b(i, 8, 0), A(i, 0, y(i.length)));
}
var P = class t extends e {
		j;
		bt;
		Mt = [];
		At = /* @__PURE__ */ new Map();
		Ct = 16;
		xt = { width: 0, height: 0 };
		St;
		Et;
		Ft;
		Tt;
		Pt = !1;
		constructor(t, i = 16) {
			(super(),
				(this.j = t),
				(this.Ct = i),
				(this.St = new d()),
				(this.Et = new p(t)),
				(this.Ft = new v()),
				(this.Tt = new U()));
		}
		Lt(i = {}) {
			if (!this.Pt) throw new r('Cannot fork an uninitialized TextmodeFont.');
			const s = i.fontSize ?? this.Ct,
				e = new t(this.j, s);
			return ((e.bt = this.bt), (e.Mt = this.Mt), (e.At = new Map(this.At)), (e.Pt = !0), e.Dt(), e);
		}
		async kt(t) {
			if (this.Pt) return;
			if (!t) throw new r('TextmodeFont requires an explicit font source.');
			const i = await this.Rt(t);
			await this.Bt(i);
		}
		It(t) {
			if (void 0 === t) return this.Ct;
			((this.Ct = t), this.Dt());
		}
		Dt() {
			((this.xt = this.Ft.ut(this.Mt, this.Ct, this.bt)), this.Et.J(this.Mt, this.xt, this.Ct, this.bt));
		}
		async Ot(t) {
			try {
				const i = await this.Rt(t);
				await this.Bt(i);
			} catch (i) {
				throw new r(`Failed to load font: ${i instanceof Error ? i.message : 'Unknown error'}`, {
					originalError: i,
				});
			}
		}
		async Rt(t) {
			const i = await fetch(t);
			if (!i.ok) throw new r(`Failed to load font file: ${i.status} ${i.statusText}`);
			return i.arrayBuffer();
		}
		async Bt(t) {
			const i = await (async function (t) {
				const i = g.readASCII(new Uint8Array(t), 0, 4);
				if ('wOFF' === i) {
					const i = await (async function (t) {
						if ('undefined' == typeof DecompressionStream)
							throw new Error('[textmode.js] WOFF font loading requires DecompressionStream support.');
						const i = g,
							s = new Uint8Array(t);
						if (s.length < 44) throw new Error('Invalid WOFF header.');
						if ('wOFF' !== i.readASCII(s, 0, 4)) throw new Error('Invalid WOFF signature.');
						const e = i.readUint(s, 4),
							r = i.readUshort(s, 12),
							n = i.readUint(s, 16);
						if (44 + 20 * r > s.length) throw new Error('Invalid WOFF table directory.');
						const h = [];
						let o = 44;
						for (let a = 0; a < r; a++) {
							const t = i.readASCII(s, o, 4),
								e = i.readUint(s, o + 4),
								r = i.readUint(s, o + 8),
								n = i.readUint(s, o + 12);
							if ((i.readUint(s, o + 16), e + r > s.length))
								throw new Error(`Invalid WOFF table bounds for ${t}.`);
							if (r > n) throw new Error(`Invalid WOFF table length for ${t}.`);
							(h.push({ tag: t, offset: e, compLength: r, origLength: n }), (o += 20));
						}
						return (function (t, i, s) {
							const e = s.length;
							let r = 1,
								n = 0;
							for (; r << 1 <= e;) ((r <<= 1), n++);
							const h = 16 * r,
								o = 16 * e - h;
							let a = 12 + 16 * e;
							const c = {};
							for (const d of s) ((c[d.tag] = a), (a = y(a + d.data.length)));
							const u = new Uint8Array(Math.max(i || 0, a));
							(b(u, 0, t), w(u, 4, e), w(u, 6, h), w(u, 8, n), w(u, 10, o));
							let l = 12;
							for (const d of s)
								(M(u, l, d.tag),
									(l += 4),
									b(u, l, T(d)),
									(l += 4),
									b(u, l, c[d.tag]),
									(l += 4),
									b(u, l, d.data.length),
									(l += 4));
							for (const d of s) u.set(d.data, c[d.tag]);
							const f = c.head;
							if (void 0 !== f) {
								const t = (function (t, i) {
									const s = i + 8,
										e = [t[s], t[s + 1], t[s + 2], t[s + 3]];
									b(t, s, 0);
									const r = (2981146554 - (A(t, 0, y(t.length)) >>> 0)) >>> 0;
									return (
										(t[s] = e[0]),
										(t[s + 1] = e[1]),
										(t[s + 2] = e[2]),
										(t[s + 3] = e[3]),
										r >>> 0
									);
								})(u, f);
								b(u, f + 8, t);
							}
							return u.buffer;
						})(
							e,
							n,
							await Promise.all(
								h.map((t) =>
									(async function (t, i) {
										const s = new Uint8Array(t.buffer, i.offset, i.compLength);
										let e;
										return (
											i.compLength === i.origLength
												? (e = new Uint8Array(s))
												: ((e = await (async function (t) {
														const i = new ReadableStream({
																start(i) {
																	(i.enqueue(t), i.close());
																},
															}).pipeThrough(new DecompressionStream('deflate')),
															s = await new Response(i).arrayBuffer();
														return new Uint8Array(s);
													})(s)),
													(e = (function (t, i) {
														if (t.length === i) return t;
														if (t.length < i) {
															const s = new Uint8Array(i);
															return (s.set(t), s);
														}
														return t.subarray(0, i);
													})(e, i.origLength))),
											{ ...i, data: e }
										);
									})(s, t)
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
			((this.bt = i[0]), await this.Nt());
		}
		async Nt() {
			const t = this.St.O(this.bt);
			if (0 === t.length) throw new r('[textmode.js] Font has no supported cmap glyphs.');
			const { array: i, map: s } = this.Tt.gt(t, this.bt);
			((this.Mt = i), (this.At = s), this.Dt(), (this.Pt = !0));
		}
		Qt(t) {
			const i = this.At.get(t);
			return i ? i.color : [1, 1, 0];
		}
		zt(t) {
			return E(t).map((t) => {
				const i = this.At.get(t);
				return i ? i.color : [1, 1, 0];
			});
		}
		dispose() {
			(this.Et.L(), super.dispose());
		}
		get framebuffer() {
			return this.Et.framebuffer;
		}
		get characterMap() {
			return this.At;
		}
		get characters() {
			return this.Mt;
		}
		get textureColumns() {
			return this.Et.columns;
		}
		get textureRows() {
			return this.Et.rows;
		}
		get columns() {
			return this.Et.columns;
		}
		get rows() {
			return this.Et.rows;
		}
		get cellWidth() {
			return this.xt.width;
		}
		get cellHeight() {
			return this.xt.height;
		}
		get cellDimensions() {
			return this.xt;
		}
		get maxGlyphDimensions() {
			return this.xt;
		}
		get fontSize() {
			return this.Ct;
		}
		get font() {
			return this.bt;
		}
	},
	L = class {
		constructor(t) {
			this.q = new _(t);
		}
		J(t, i, s, e) {
			(this.q.Y(t.length, i.width, i.height), this.Ht(t, i, s, e), this.q.K());
		}
		L() {
			this.q.L();
		}
		Ht(t, i, s, e) {
			const r = this.q.$,
				n = this.q.X;
			for (let h = 0; h < t.length; h++) {
				const t = h % n,
					o = Math.floor(h / n),
					a = h % e.columns,
					c = Math.floor(h / e.columns),
					u = e.marginX + a * (e.cellWidth + e.spacingX),
					l = e.marginY + c * (e.cellHeight + e.spacingY),
					f = t * i.width,
					d = o * i.height;
				r.drawImage(s, u, l, e.cellWidth, e.cellHeight, f, d, i.width, i.height);
			}
		}
		get framebuffer() {
			return this.q.V;
		}
		get columns() {
			return this.q.X;
		}
		get rows() {
			return this.q.h;
		}
	},
	D = class t extends e {
		static Gt = /* @__PURE__ */ new WeakMap();
		static jt = /* @__PURE__ */ new WeakMap();
		static Vt = 1;
		j;
		Et = null;
		Mt = [];
		At = /* @__PURE__ */ new Map();
		Xt = { width: 0, height: 0 };
		$t = { width: 0, height: 0 };
		Ct = 0;
		Yt;
		Kt;
		Wt;
		Zt;
		Pt = !1;
		constructor(t, i, s) {
			(super(), (this.j = t), (this.Ct = void 0 === i ? 0 : Math.abs(i)), (this.Wt = s));
		}
		Lt(i = {}) {
			if (!this.Pt || !this.Kt || !this.Zt) throw new r('Cannot fork an uninitialized TextmodeTileset.');
			const s = new t(this.j, i.fontSize ?? this.Ct);
			return (
				(s.Mt = this.Zt.characters),
				(s.At = new Map(this.Zt.characterMap)),
				(s.Xt = { ...this.Zt.nativeCellDimensions }),
				(s.Yt = this.Yt),
				(s.Kt = { ...this.Kt }),
				(s.Wt = this.Wt),
				(s.Pt = !0),
				s.qt(this.Zt),
				s.Jt(),
				s
			);
		}
		async kt(t) {
			if (this.Pt) return;
			if (((this.Wt = t ?? this.Wt), !this.Wt))
				throw new r('Cannot initialize a TextmodeTileset without source options.');
			const i = this.ti(this.Wt),
				s = this.ii(i);
			if (s)
				return (
					this.qt(s),
					(this.Mt = s.characters),
					(this.At = new Map(s.characterMap)),
					(this.Xt = { ...s.nativeCellDimensions }),
					(this.Kt = { ...s.layout }),
					0 === this.Ct && (this.Ct = Math.abs(this.Wt.fontSize ?? s.nativeCellDimensions.height)),
					this.Jt(),
					void (this.Pt = !0)
				);
			const e = await this.si(this.Wt.source),
				n = this.ei(e),
				h = this.ri(this.Wt, n.width, n.height),
				o = this.ni(this.Wt, h),
				a = await this.hi(this.Wt, o, h.columns),
				c = this.oi(a),
				u = new Map(c.map((t) => [t.character, t])),
				l = new L(this.j);
			((this.Yt = e),
				(this.Kt = h),
				(this.Xt = { width: h.cellWidth, height: h.cellHeight }),
				(this.Mt = c),
				(this.At = u),
				0 === this.Ct && (this.Ct = Math.abs(this.Wt.fontSize ?? h.cellHeight)),
				this.Jt(),
				l.J(this.Mt, this.Xt, e, h),
				this.qt({
					cacheKey: i,
					textureAtlas: l,
					characters: c,
					characterMap: u,
					nativeCellDimensions: { ...this.Xt },
					layout: { ...h },
					referenceCount: 0,
				}),
				(this.Pt = !0));
		}
		It(t) {
			if (void 0 === t) return this.Ct;
			((this.Ct = Math.abs(t)), this.Jt());
		}
		Qt(t) {
			const i = this.At.get(t);
			return i ? i.color : [1, 1, 0];
		}
		zt(t) {
			return E(t).map((t) => this.Qt(t));
		}
		dispose() {
			(this.ai(), super.dispose());
		}
		qt(i) {
			this.Zt !== i &&
				(this.ai(),
				t.ci(this.j).set(i.cacheKey, i),
				(i.referenceCount += 1),
				(this.Zt = i),
				(this.Et = i.textureAtlas));
		}
		ai() {
			const i = this.Zt;
			i
				? ((i.referenceCount -= 1),
					i.referenceCount <= 0 && (i.textureAtlas.L(), t.Gt.get(this.j)?.delete(i.cacheKey)),
					(this.Zt = void 0),
					(this.Et = null))
				: (this.Et = null);
		}
		ti(t) {
			return JSON.stringify({
				source: this.ui(t.source),
				columns: t.columns,
				rows: t.rows,
				count: t.count ?? null,
				margin: t.margin ?? null,
				marginX: t.marginX ?? null,
				marginY: t.marginY ?? null,
				spacing: t.spacing ?? null,
				spacingX: t.spacingX ?? null,
				spacingY: t.spacingY ?? null,
				mapping: this.li(t),
			});
		}
		ui(i) {
			return 'string' == typeof i || i instanceof URL ? `url:${String(i)}` : `object:${t.fi(i)}`;
		}
		li(t) {
			return void 0 === t.map
				? 'auto:32'
				: Array.isArray(t.map)
					? `rows:${t.map.join('\n')}`
					: t.map instanceof URL
						? `url:${String(t.map)}`
						: this.di(t.map)
							? `inline:${t.map}`
							: `url:${t.map}`;
		}
		ii(i) {
			return t.Gt.get(this.j)?.get(i);
		}
		static ci(i) {
			let s = t.Gt.get(i);
			return (s || ((s = /* @__PURE__ */ new Map()), t.Gt.set(i, s)), s);
		}
		static fi(i) {
			const s = t.jt.get(i);
			if (void 0 !== s) return s;
			const e = t.Vt++;
			return (t.jt.set(i, e), e);
		}
		async si(t) {
			if ('string' != typeof t && !(t instanceof URL)) return t;
			const i = String(t);
			return new Promise((t, s) => {
				const e = new Image();
				((e.crossOrigin = 'anonymous'),
					(e.onload = () => t(e)),
					(e.onerror = () => s(new r(`Failed to load tileset image: ${i}`))),
					(e.src = i));
			});
		}
		async hi(t, i, s) {
			if (void 0 !== t.map) {
				const e = await this._i(t.map),
					r = this.pi(e, i, s);
				return (this.mi(r, 'tileset map'), r);
			}
			return this.gi(i);
		}
		async _i(t) {
			return Array.isArray(t)
				? [...t]
				: t instanceof URL
					? this.yi(await this.wi(t))
					: this.di(t)
						? this.yi(t)
						: this.yi(await this.wi(t));
		}
		pi(t, i, s) {
			const e = Math.ceil(i / s);
			if (t.length !== e)
				throw new r(
					`Tileset map must contain exactly ${e} row${1 === e ? '' : 's'} for ${i} mapped tile${1 === i ? '' : 's'}.`
				);
			const n = [];
			let h = i;
			for (let o = 0; o < t.length; o++) {
				const i = E(t[o]),
					e = Math.min(s, h);
				if (i.length !== e)
					throw new r(
						`Tileset map row ${o + 1} must contain exactly ${e} character cell${1 === e ? '' : 's'}.`
					);
				(n.push(...i), (h -= e));
			}
			return n;
		}
		gi(t) {
			this.bi(t);
			const i = [];
			for (let s = 0; s < t; s++) i.push(String.fromCodePoint(32 + s));
			return i;
		}
		async wi(t) {
			let i;
			try {
				i = await fetch(t);
			} catch (s) {
				throw new r(`Failed to load tileset map: ${s instanceof Error ? s.message : 'Unknown error'}`);
			}
			if (!i.ok) throw new r(`Failed to load tileset map: ${i.status} ${i.statusText}`);
			return i.text();
		}
		yi(t) {
			const i = t.split(/\r\n|\n|\r/);
			return (i.length > 0 && '' === i[i.length - 1] && i.pop(), i);
		}
		di(t) {
			return !(!t.includes('\n') && !t.includes('\r') && this.Mi(t));
		}
		Mi(t) {
			return (
				/^(?:[a-z]+:)?\/\//i.test(t) ||
				t.startsWith('/') ||
				t.startsWith('./') ||
				t.startsWith('../') ||
				t.includes('\\') ||
				/\.[a-z0-9]+(?:$|[?#])/i.test(t)
			);
		}
		ei(t) {
			const i = t,
				s = i.naturalWidth ?? i.videoWidth ?? i.displayWidth ?? i.width,
				e = i.naturalHeight ?? i.videoHeight ?? i.displayHeight ?? i.height;
			if ('number' != typeof s || 'number' != typeof e || s <= 0 || e <= 0)
				throw new r('Tileset source must expose positive pixel dimensions.');
			return { width: s, height: e };
		}
		ri(t, i, s) {
			const e = t.marginX ?? t.margin ?? 0,
				n = t.marginY ?? t.margin ?? 0,
				h = t.spacingX ?? t.spacing ?? 0,
				o = t.spacingY ?? t.spacing ?? 0;
			if (t.columns <= 0 || t.rows <= 0) throw new r('Tileset columns and rows must be greater than 0.');
			const a = i - 2 * e - h * (t.columns - 1),
				c = s - 2 * n - o * (t.rows - 1);
			if (a <= 0 || c <= 0) throw new r('Tileset margins and spacing leave no usable tile area.');
			const u = a / t.columns,
				l = c / t.rows;
			if (!Number.isInteger(u) || !Number.isInteger(l))
				throw new r('Tileset dimensions do not divide evenly. Check columns, rows, margins, and spacing.');
			return {
				columns: t.columns,
				rows: t.rows,
				marginX: e,
				marginY: n,
				spacingX: h,
				spacingY: o,
				cellWidth: u,
				cellHeight: l,
			};
		}
		ni(t, i) {
			const s = i.columns * i.rows,
				e = t.count ?? s;
			if (e <= 0 || e > s) throw new r(`Tileset count must be between 1 and ${s}.`);
			return e;
		}
		bi(t) {
			if (32 + t - 1 > 1114111)
				throw new r('Tileset automatic character assignment exceeds the supported Unicode range.');
		}
		mi(t, i) {
			const s = /* @__PURE__ */ new Map();
			for (let e = 0; e < t.length; e++) {
				const n = t[e],
					h = s.get(n);
				if (void 0 !== h)
					throw new r(`${i} contains duplicate character ${this.Ai(n)} at tile ${h + 1} and tile ${e + 1}.`);
				s.set(n, e);
			}
		}
		Ai(t) {
			const i = F(t);
			if (0 === i.length) return '""';
			const s = i.map((t) => `U+${t.toString(16).toUpperCase().padStart(4, '0')}`).join(' ');
			return `${JSON.stringify(t)} (${s})`;
		}
		oi(t) {
			const i = [];
			for (let s = 0; s < t.length; s++) {
				const e = t[s],
					n = F(e)[0];
				if (void 0 === n)
					throw new r(`Tileset character mapping produced an empty character at tile ${s + 1}.`);
				i.push({ character: e, unicode: n, color: this.Ci(s) });
			}
			return i;
		}
		Ci(t) {
			return [(255 & t) / 255, ((t >> 8) & 255) / 255, ((t >> 16) & 255) / 255];
		}
		Jt() {
			if (this.Xt.height <= 0 || this.Xt.width <= 0) return;
			const t = Math.max(1, this.Ct || this.Xt.height),
				i = t / this.Xt.height;
			this.$t = { width: Math.max(1, Math.round(this.Xt.width * i)), height: t };
		}
		get characters() {
			return this.Mt;
		}
		get characterMap() {
			return this.At;
		}
		get framebuffer() {
			return this.Et.framebuffer;
		}
		get fontFramebuffer() {
			return this.framebuffer;
		}
		get columns() {
			return this.Et.columns;
		}
		get rows() {
			return this.Et.rows;
		}
		get textureColumns() {
			return this.columns;
		}
		get textureRows() {
			return this.rows;
		}
		get nativeCellDimensions() {
			return this.Xt;
		}
		get maxGlyphDimensions() {
			return this.$t;
		}
		get cellDimensions() {
			return this.$t;
		}
		get cellWidth() {
			return this.$t.width;
		}
		get cellHeight() {
			return this.$t.height;
		}
		get fontSize() {
			return this.Ct;
		}
	},
	k = /* @__PURE__ */ i({ TextmodeFont: () => P, TextmodeTileset: () => D }),
	R = /* @__PURE__ */ (function (t) {
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
	B = new Set(Object.values(R).filter((t) => 'number' == typeof t));
function I(t) {
	return 'number' == typeof t && B.has(t);
}
function O(t) {
	return t * (Math.PI / 180);
}
function N(t) {
	return t * (180 / Math.PI);
}
function Q(t, i, s, e) {
	return N(Math.atan2(e - i, s - t));
}
function z(t, i, s, e) {
	return Math.hypot(s - t, e - i);
}
function H(t, i, s) {
	return Math.min(Math.max(t, i), s);
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
	j = 1.70158,
	V = 2.5949095,
	X = (2 * Math.PI) / 3,
	$ = (2 * Math.PI) / 4.5;
function Y(t) {
	const i = 7.5625,
		s = 2.75;
	if (t < 1 / s) return i * t * t;
	if (t < 2 / s) {
		const e = t - 1.5 / s;
		return i * e * e + 0.75;
	}
	if (t < 2.5 / s) {
		const e = t - 2.25 / s;
		return i * e * e + 0.9375;
	}
	const e = t - 2.625 / s;
	return i * e * e + 0.984375;
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
	inBack: (t) => 2.70158 * t * t * t - j * t * t,
	outBack: (t) => 1 + 2.70158 * Math.pow(t - 1, 3) + j * Math.pow(t - 1, 2),
	inOutBack: (t) =>
		t < 0.5
			? (Math.pow(2 * t, 2) * (7.189819 * t - V)) / 2
			: (Math.pow(2 * t - 2, 2) * (3.5949095 * (2 * t - 2) + V) + 2) / 2,
	inElastic: (t) => (0 === t || 1 === t ? t : -Math.pow(2, 10 * t - 10) * Math.sin((10 * t - 10.75) * X)),
	outElastic: (t) => (0 === t || 1 === t ? t : Math.pow(2, -10 * t) * Math.sin((10 * t - 0.75) * X) + 1),
	inOutElastic: (t) =>
		0 === t || 1 === t
			? t
			: t < 0.5
				? (-Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * $)) / 2
				: (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * $)) / 2 + 1,
	inBounce: (t) => 1 - Y(1 - t),
	outBounce: Y,
	inOutBounce: (t) => (t < 0.5 ? (1 - Y(1 - 2 * t)) / 2 : (1 + Y(2 * t - 1)) / 2),
};
function W(t) {
	return (((t % 360) + 360) % 360) / 360;
}
function Z(t = /* @__PURE__ */ new Float32Array(16)) {
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
function q(t, i, s, e = /* @__PURE__ */ new Float32Array(16)) {
	let r = t[0] - i[0],
		n = t[1] - i[1],
		h = t[2] - i[2],
		o = Math.hypot(r, n, h);
	0 === o ? (h = 1) : ((o = 1 / o), (r *= o), (n *= o), (h *= o));
	let a = s[1] * h - s[2] * n,
		c = s[2] * r - s[0] * h,
		u = s[0] * n - s[1] * r;
	((o = Math.hypot(a, c, u)), 0 === o ? ((a = 1), (c = 0), (u = 0)) : ((o = 1 / o), (a *= o), (c *= o), (u *= o)));
	const l = n * u - h * c,
		f = h * a - r * u,
		d = r * c - n * a;
	return (
		(e[0] = a),
		(e[1] = l),
		(e[2] = r),
		(e[3] = 0),
		(e[4] = c),
		(e[5] = f),
		(e[6] = n),
		(e[7] = 0),
		(e[8] = u),
		(e[9] = d),
		(e[10] = h),
		(e[11] = 0),
		(e[12] = -(a * t[0] + c * t[1] + u * t[2])),
		(e[13] = -(l * t[0] + f * t[1] + d * t[2])),
		(e[14] = -(r * t[0] + n * t[1] + h * t[2])),
		(e[15] = 1),
		e
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
		static Si = null;
		Wt = { globalLevel: 3 };
		Ei = /* @__PURE__ */ new Set();
		constructor() {}
		static xi() {
			return (t.Si || (t.Si = new t()), t.Si);
		}
		Fi(t, i) {
			const s = '%c[textmode.js] Oops! (╯°□°)╯︵ Something went wrong in your code.',
				e = 'color: #f44336; font-weight: bold; background: #ffebee; padding: 2px 6px; border-radius: 3px;';
			switch (this.Wt.globalLevel) {
				case 0:
					return !1;
				case 1:
					return (
						!!this.Ti('warning', t, i) &&
						(console.group(s, e),
						console.warn(r.R(t, i, { includeFooterArrows: !1 })),
						console.groupEnd(),
						!1)
					);
				case 2:
					return (
						!!this.Ti('error', t, i) &&
						(console.group(s, e),
						console.error(r.R(t, i, { includeFooterArrows: !1 })),
						console.groupEnd(),
						!1)
					);
				default:
					throw new r(t, i);
			}
		}
		Pi(t, i, s) {
			return !!t || (this.Fi(i, s), !1);
		}
		Li(t) {
			this.Wt.globalLevel = t;
		}
		Di(t) {
			void 0 !== t.globalLevel && (this.Wt.globalLevel = t.globalLevel);
		}
		ki() {
			this.Ei.clear();
		}
		Ti(t, i, s) {
			const e = this.Ri(t, i, s);
			return !this.Ei.has(e) && (this.Ei.add(e), !0);
		}
		Ri(t, i, s) {
			return `${t}|${i}|${s ? this.Bi(s) : ''}`;
		}
		Bi(t) {
			return null == t
				? String(t)
				: 'number' == typeof t || 'boolean' == typeof t || 'string' == typeof t
					? JSON.stringify(t)
					: Array.isArray(t)
						? `[${t.map((t) => this.Bi(t)).join(',')}]`
						: 'object' == typeof t
							? `{${Object.entries(t)
									.sort(([t], [i]) => t.localeCompare(i))
									.map(([t, i]) => `${JSON.stringify(t)}:${this.Bi(i)}`)
									.join(',')}}`
							: String(t);
		}
	}.xi(),
	it = class t {
		Ii;
		Oi;
		Ni;
		Qi;
		zi;
		Hi;
		Gi;
		ji;
		Vi;
		constructor(t = 0, i = 0, s = 0, e = 0, r = 0, n = 0, h = 0, o = 1, a = 0) {
			((this.Ii = t),
				(this.Oi = i),
				(this.Ni = s),
				(this.Qi = e),
				(this.zi = r),
				(this.Hi = n),
				(this.Gi = h),
				(this.ji = o),
				(this.Vi = a));
		}
		static Xi(i, s) {
			const e = i.Yi.$i,
				r = i.Yi.Ki,
				n = i.Yi.Wi,
				h = i.Yi.Zi,
				o = i.Yi.qi,
				a = i.Yi.Ji;
			if (i.Yi.ts) {
				const c = (0.5 * Math.max(1, s)) / Math.tan(0.5 * i.Yi.ss);
				return new t(e, r, n + c, e, r, n, h, o, a);
			}
			return new t(i.Yi.es, i.Yi.rs, i.Yi.ns, e, r, n, h, o, a);
		}
		hs(t) {
			t.Yi.cs(this.Ii, this.Oi, this.Ni, this.Qi, this.zi, this.Hi, this.Gi, this.ji, this.Vi);
		}
		setPosition(t, i, s) {
			return ((this.Ii = t), (this.Oi = i), (this.Ni = s), this);
		}
		lookAt(t, i, s) {
			return ((this.Qi = t), (this.zi = i), (this.Hi = s), this);
		}
		setUp(t, i, s) {
			return ((this.Gi = t), (this.ji = i), (this.Vi = s), this);
		}
		move(t, i, s) {
			return (
				(this.Ii += t),
				(this.Oi += i),
				(this.Ni += s),
				(this.Qi += t),
				(this.zi += i),
				(this.Hi += s),
				this
			);
		}
		copy() {
			return new t(this.Ii, this.Oi, this.Ni, this.Qi, this.zi, this.Hi, this.Gi, this.ji, this.Vi);
		}
		get eyeX() {
			return this.Ii;
		}
		get eyeY() {
			return this.Oi;
		}
		get eyeZ() {
			return this.Ni;
		}
		get targetX() {
			return this.Qi;
		}
		get targetY() {
			return this.zi;
		}
		get targetZ() {
			return this.Hi;
		}
		get upX() {
			return this.Gi;
		}
		get upY() {
			return this.ji;
		}
		get upZ() {
			return this.Vi;
		}
	},
	st = class {
		us = null;
		ts = !0;
		es = 0;
		rs = 0;
		ns = 0;
		$i = 0;
		Ki = 0;
		Wi = 0;
		Zi = 0;
		qi = 1;
		Ji = 0;
		ls = 'perspective';
		fs;
		ds;
		_s;
		constructor(t) {
			((this.ts = t.Yi.ts),
				(this.es = t.Yi.es),
				(this.rs = t.Yi.rs),
				(this.ns = t.Yi.ns),
				(this.$i = t.Yi.$i),
				(this.Ki = t.Yi.Ki),
				(this.Wi = t.Yi.Wi),
				(this.Zi = t.Yi.Zi),
				(this.qi = t.Yi.qi),
				(this.Ji = t.Yi.Ji),
				t.Yi.ts ||
					(this.us = new it(t.Yi.es, t.Yi.rs, t.Yi.ns, t.Yi.$i, t.Yi.Ki, t.Yi.Wi, t.Yi.Zi, t.Yi.qi, t.Yi.Ji)),
				t.Yi.ps ? (this.ls = 'ortho') : ((this.ls = 'perspective'), (this.fs = (180 * t.Yi.ss) / Math.PI)),
				(this.ds = t.Yi.ds),
				(this._s = t.Yi._s));
		}
		createCamera(t, i) {
			let s;
			if (this.ts) {
				const e = Math.max(1, t),
					r = this.fs ?? i,
					n = (0.5 * e) / Math.tan((r * Math.PI) / 360);
				s = new it(this.$i, this.Ki, this.Wi + n, this.$i, this.Ki, this.Wi, this.Zi, this.qi, this.Ji);
			} else s = new it(this.es, this.rs, this.ns, this.$i, this.Ki, this.Wi, this.Zi, this.qi, this.Ji);
			return (this.setCamera(s), s);
		}
		setCamera(t) {
			((this.us = t),
				(this.ts = !1),
				(this.es = t.eyeX),
				(this.rs = t.eyeY),
				(this.ns = t.eyeZ),
				(this.$i = t.targetX),
				(this.Ki = t.targetY),
				(this.Wi = t.targetZ),
				(this.Zi = t.upX),
				(this.qi = t.upY),
				(this.Ji = t.upZ));
		}
		resetCamera() {
			((this.us = null),
				(this.ts = !0),
				(this.es = 0),
				(this.rs = 0),
				(this.ns = 0),
				(this.$i = 0),
				(this.Ki = 0),
				(this.Wi = 0),
				(this.Zi = 0),
				(this.qi = 1),
				(this.Ji = 0));
		}
		camera(t, i, s, e = 0, r = 0, n = 0, h = 0, o = 1, a = 0) {
			(this.us
				? this.us.setPosition(t, i, s).lookAt(e, r, n).setUp(h, o, a)
				: (this.us = new it(t, i, s, e, r, n, h, o, a)),
				(this.ts = !1),
				(this.es = t),
				(this.rs = i),
				(this.ns = s),
				(this.$i = e),
				(this.Ki = r),
				(this.Wi = n),
				(this.Zi = h),
				(this.qi = o),
				(this.Ji = a));
		}
		lookAt(t, i, s, e, r, n) {
			(this.us &&
				(this.us.lookAt(t, i, s),
				(void 0 === e && void 0 === r && void 0 === n) ||
					this.us.setUp(e ?? this.us.upX, r ?? this.us.upY, n ?? this.us.upZ)),
				(this.$i = t),
				(this.Ki = i),
				(this.Wi = s),
				void 0 !== e && (this.Zi = e),
				void 0 !== r && (this.qi = r),
				void 0 !== n && (this.Ji = n));
		}
		perspective(t, i, s) {
			((this.ls = 'perspective'),
				void 0 !== t && (this.fs = t),
				void 0 !== i && (this.ds = i),
				void 0 !== s && (this._s = s));
		}
		ortho(t, i) {
			((this.ls = 'ortho'), void 0 !== t && (this.ds = t), void 0 !== i && (this._s = i));
		}
		getActiveCamera() {
			return this.us;
		}
		applyToState(t) {
			if (('ortho' === this.ls ? t.Yi.vs(this.ds, this._s) : t.Yi.gs(this.fs, this.ds, this._s), this.ts))
				return (
					t.Yi.ws(),
					void (
						(0 === this.$i &&
							0 === this.Ki &&
							0 === this.Wi &&
							0 === this.Zi &&
							1 === this.qi &&
							0 === this.Ji) ||
						t.Yi.bs(this.$i, this.Ki, this.Wi, this.Zi, this.qi, this.Ji)
					)
				);
			t.Yi.cs(this.es, this.rs, this.ns, this.$i, this.Ki, this.Wi, this.Zi, this.qi, this.Ji);
		}
	},
	et = Object.freeze({
		source: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAITElEQVR42u1d2XLkIAz0//909jWVHYPUhyR7SNXUHnhsDI3ULQlyXdf1s/usfiLtv6/5+/dPz4r0Y3XN6ru750fHIPv8u3FC3u/umt39b/oXf/nfN7gb0FU7OwBo+18gRiYrsgAQgN5dd7dYVAD4ND+jAJCxHp8GKfLyu9WwAyVjAVfvkgVA1PoEF5jfBUxpX012BphZAEdWPeviVgBYjVcYAHc3Qgc4stJUFijCAVgAZFwQyyEibYn+5VxAZFI+mTiFj4/4bYZEoi5gBzC1f9+12TiAyge6J5ABEEMCs8QPVTHI6qdUwPlc1OQP//gHTrEaoyuQsTCohagGohwACMPNtKOrbWfSMiSzkoMgZlwV6MrwmI8AWAVMMhoW9bXI5K6IJ6oCUAsTVUU7tZUNdBELdAYAohqZkZiR560UzK49S5KRMK4NANHViLQ7Qq27OACaC4ia2Kxejy4K9Pm0C+gEADIpWSugirQhk6/gANkwM8wBOkkgk0mrYvkulRCxUEggKwSAJ8jA8xkQB4iij5GBzPfQFZJZRVkFcwAgkmHZ2Ds6ic72iZHNEgBk0rUrQhm5PwqADEvPyrBpbg/mAKxpRy1AliDtJKEaAEiwZ8jk1yWDsjo840ZWQZcqAERkMds3hcqisoHsgxUVNRmXIBogqY9nXZCh7zNcABL0KVwlMoLXAYDNvY8WHkbKemQgq6OzcXxhJIuNhcv63wWIbCn6fySQKCgMmejM/RX+LZNZrOi/SmWoXMBtLmCVGmYA4ACMcsVMAQBjAYlnaAIpTNVrdMCZXHp2kBmAd/IAwJLWhVIzE6y0INn/V4Sqp1qAZU0gAwBV2bLLRLMAYAs+OjlAKBDEsGgFy87G29XZQLZ/T7iejgSez4vrAdQ6nSlbFpc90yQPLeqMhqpZl8Nsfr1QEuTy2Yr7u2QnS3JZ/hDc7Zutl7hSN6vQ8eo4APt8tcphikUjZedtAFBJJHQAIwOMvJ8SACxAkXR4CgBIPvppFgCNQ7ChcGV8JVqBBQPA6QLexgHU76cmgVsAOFhyhwpAq4YdKkB5f7sKOJ8vjwOoV7Di+24Vwuh0dyTUdU4hnAuokoWuegM3ANhcQQYUSLZ1HADYejxH/l6VDq7OpAp2ZnlMoKMkTKUymFWqyogqr0GJcZgDsBVD7CpRhaozGU3X1u8JpelbC5CNbLE6vhIAQKBEEiFU+/lSAOy2XrET5DbBLAl0Vy0r8gnEzqKjhU89gHDXzxM3SqjLtZxlXdbzAaZ03BEsYUPJkwBmPSAi6oPVMlC1c0eVDXRUPasKa5H7U7mA7kghuzFjSkWQas/CriAk+X49O2kqs3GZAyicoWoWALuCEDC0/TwLoNbZ3fUAbhlLA+AOZU/hAKpYv6peIQsCRRzj1AOczzkgYspBEGwkVHxCyTklY8r7ObalBUCE+XAHC6/YeNJdEeQCwKc+Bce/bkDRNOfTC0LcoeZsqvvPNVoL4NhfP7EghI1GqgtCiP2b+HZkpOyL3cvGxPrZgpCuI2LU+RoZAJjVs0NpJg6hjKUrK44mqYAlAM7niz8/5p/q41rVEUml9s+OD3JNevzeCoApRZfo+KAJJBgAUwI7VRM82QIorEV4nKoAkH3pae3oBGUBwFqMkQCIMGzFGX3KdvUEKayF8hmlLuCJAMhKMZVMc4OgjQMwgzuh3Ukgqwh2Kwf4hoyectNGmSXIsmaElKBFjVPaHeHeyBY2tsQsFQjqBsDKFyPtf/+faa8AwCqdOwIA7NFmb7IADAmMAmBVycOUrLcDYPfv3QS5vp9NOKE+OQpAdPPpsQBGC8BE6hRb1BTfScvALgBkfX8FB3DkBth0ehkAjgrwASAbhZSelloBgPPx//o5GwDeHgiKrLrdn2hpnCLZRM9BdS5gJXFW5m11XWSSdj5/Z14jnEFZt69wSwcACdmHWgD2bERXnUL4+m8DQEZ/Z0CgrpJmrz0AAE1+RnJWnSLKVj0tr/9WDpAxtQoOsNP/qLuQAcBZFDqZBLIWIJOwQQI5yuNkPj5nWlXwRFnIcADXOAlL1vpCnB3br9RxCjaQ5hif5LP0Z/CtMm+Mj1MBQGmhMlFRtwugAZA1K5HTw5UyR12QUXXyRwUJJFzOvuAAqUhBXjTKbhWrIlsRjBxyEbVgChk4HgDsCkYBpCi2QM8qrAoEkQTd7wJYADgiZegAdyalsiBOA8BBApUmXOmTK7JxFckggUyvy3M7Sp5cMq8znqEoT4MAMFlHuybQqTgq+se2X+zu2KrDE5nUavb+jj65+se2X4oOTQIBO6GVk6/qH9WOsHilj3ds3kSUhGLyO/sHtztkHCrlqgbQ/Xx3u7h/Wtnj1tEdPrvSJ7PjB9xfL3vcOnoSZ+kAhLJ/l0PaVehoVkZ1Ru4qDqtKy8A31PqrtHnX/ZtOUDsAOAA4ADgAcBzCGJGRbLLDcX/2/VyJG3sy6ADgywEw3UR3m/Dp5xyD/TsAOAA4ADgAmBToyUbCIhs4VKXq6tPBs+OIhI03+zXqfgGCa3/8FAAoSBwzRnQouPMwY5YJdwMA7T8LgGgCaGEN+s+yZe+9A4DbvzP9VwAgulN5uS9APfFoiZkaALvVkl2pUw57Xh0pG60n+OgC3D+OAfx2AEhIYPXPFAC4t2NXAQAmgT8P/+nmAN0AsJNA51k2lS7njjeo3rETANE9nTfvrdvZw1TsdKiMNwFgNdEbEOj29nVsbcq4COZI1SpSrJ787TXVAZ0pvzTpLQCITP7yWjbf3g2Abg4wJRAEcwA1ANCyZufKcXKACaFgigM4AIBmCx0VMSwHqN7fzxxjN4IDOFfTkwpLK9PBDAf4BzY4SAYFZUTuAAAAAElFTkSuQmCC',
		columns: 16,
		rows: 16,
		map: '☺☻♥♦♣♠•◘○◙♂♀♪♫☼\n►◄↕‼¶§▬↨↑↓→←∟↔▲▼\n !"#$%&\'()*+,-./\n0123456789:;<=>?\n@ABCDEFGHIJKLMNO\nPQRSTUVWXYZ[\\]^_\n`abcdefghijklmno\npqrstuvwxyz{|}~⌂\nÇüéâäàåçêëèïîìÄÅ\nÉæÆôöòûùÿÖÜ¢£¥₧ƒ\náíóúñÑªº¿⌐¬½¼¡«»\n░▒▓│┤╡╢╖╕╣║╗╝╜╛┐\n└┴┬├─┼╞╟╚╔╩╦╠═╬╧\n╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀\nαßΓπΣσµτΦΘΩδ∞φε∩\n≡±≥≤⌠⌡÷≈°∙·√ⁿ²■□\n',
	}),
	rt = class {
		Ms;
		As;
		Cs;
		l;
		_;
		Ss;
		Ct;
		Es;
		Fs;
		j;
		Ts;
		Ps;
		bt;
		Ls;
		Ds;
		ks;
		Rs;
		Bs = () => {};
		Is = () => {};
		Os = [];
		Ns = [];
		Qs = !1;
		zs = !1;
		Hs;
		Gs;
		js = /* @__PURE__ */ new Map();
		constructor(t, i = {}) {
			((this.j = t), (this.Ms = i.visible ?? !0), (this.As = i.opacity ?? 1));
			const s = i.blendMode ?? R.NORMAL;
			((this.Cs = R.NORMAL),
				I(s) && (this.Cs = s),
				tt.Pi(I(s), 'Invalid blend mode. Expected a LayerBlendMode constant (e.g. t.BLEND_ADDITIVE).', {
					method: 'constructor',
					property: 'blendMode',
					providedValue: i.blendMode,
				}));
			const e = i.fontSize ?? 16;
			((this.Ct = Math.abs(e)),
				(this.Gs = void 0 !== i.fontSize),
				tt.Pi('number' == typeof e, 'Font size must be a number.', { method: 'fontSize', providedValue: e }),
				(this.l = i.offsetX ?? 0),
				(this._ = i.offsetY ?? 0),
				(this.Ss = i.rotationZ ?? 0));
			const r = i.fontSource;
			((this.Es = r),
				(this.bt =
					r instanceof P || r instanceof D ? r : void 0 === r ? new D(t, this.Ct, et) : new P(t, this.Ct)),
				(this.Hs = new st(t.state)));
		}
		async Vs(t) {
			if (((this.Ts = t), this.Es instanceof P || this.Es instanceof D)) {
				this.Es.Pt || (await this.Es.kt());
				const t = this.Es,
					i = t.Lt({ fontSize: this.Xs(t) });
				this.$s(i);
			}
			this.bt.Pt || (this.bt instanceof P ? await this.bt.kt(this.Es) : await this.bt.kt());
			const i = this.bt.maxGlyphDimensions;
			this.Ps = new s(this.Ts.canvas.canvas, i.width, i.height);
			const e = this.Ps;
			((this.Ls = this.Ts.createFramebuffer(e.cols, e.rows, 3)),
				(this.Ds = this.Ts.createFramebuffer(e.width, e.height, 1, { depth: !1 })),
				(this.ks = this.Ts.createFramebuffer(e.width, e.height, 1, { depth: !1 })),
				(this.Rs = [
					this.Ts.createFramebuffer(e.width, e.height, 1, { depth: !1 }),
					this.Ts.createFramebuffer(e.width, e.height, 1, { depth: !1 }),
				]),
				this.Ps.S(() => {
					(this.Ls.resize(this.Ps.cols, this.Ps.rows),
						this.Ds.resize(this.Ps.width, this.Ps.height),
						this.ks?.resize(this.Ps.width, this.Ps.height),
						this.Rs?.[0].resize(this.Ps.width, this.Ps.height),
						this.Rs?.[1].resize(this.Ps.width, this.Ps.height));
				}));
		}
		draw(t) {
			this.Bs = t;
		}
		postDraw(t) {
			this.Is = t;
		}
		show() {
			this.Ms = !0;
		}
		hide() {
			this.Ms = !1;
		}
		opacity(t) {
			if (void 0 === t) return this.As;
			this.As = H(t, 0, 1);
		}
		blendMode(t) {
			if (void 0 === t) return this.Cs;
			tt.Pi(I(t), 'Invalid blend mode. Expected a LayerBlendMode constant (e.g. t.BLEND_ADDITIVE).', {
				method: 'blendMode',
				providedValue: t,
			}) && (this.Cs = t);
		}
		offset(t, i = 0) {
			if (void 0 === t) return { x: this.l, y: this._ };
			((this.l = t), (this._ = i));
		}
		rotateZ(t) {
			if (void 0 === t) return this.Ss;
			this.Ss = t;
		}
		createCamera() {
			const t = this.Ys(),
				i = (180 * (this.Ts?.renderer.state.Yi.ss ?? Math.PI / 4)) / Math.PI;
			return this.Hs.createCamera(t.height, i);
		}
		setCamera(t) {
			(this.Hs.setCamera(t), this.Ks());
		}
		resetCamera() {
			(this.Hs.resetCamera(), this.Ks());
		}
		camera(t, i, s, e = 0, r = 0, n = 0, h = 0, o = 1, a = 0) {
			(this.Hs.camera(t, i, s, e, r, n, h, o, a), this.Ks());
		}
		lookAt(t, i, s, e, r, n) {
			(this.Hs.lookAt(t, i, s, e, r, n), this.Ks());
		}
		perspective(t, i, s) {
			(this.Hs.perspective(t, i, s), this.Ks());
		}
		ortho(t, i) {
			(this.Hs.ortho(t, i), this.Ks());
		}
		Ws() {
			return this.Hs.getActiveCamera();
		}
		filter(t, i) {
			(this.Qs ? this.Ns : this.Os).push({ name: t, params: i });
		}
		setPluginState(t, i) {
			this.js.set(t, i);
		}
		getPluginState(t) {
			return this.js.get(t);
		}
		hasPluginState(t) {
			return this.js.has(t);
		}
		deletePluginState(t) {
			return this.js.delete(t);
		}
		fontSize(t) {
			if (void 0 === t) return this.bt.fontSize;
			if (!tt.Pi('number' == typeof t, 'Font size must be a number.', { method: 'fontSize', providedValue: t }))
				return;
			const i = Math.abs(t);
			this.bt.fontSize !== i && ((this.Gs = !0), (this.Ct = i), this.bt.It(i), this.Zs());
		}
		useTileColors(t) {
			if (void 0 === t) return this.zs;
			this.zs = t;
		}
		async loadFont(t) {
			if (!this.bt) throw new Error('Layer font not initialized. Ensure layer is attached before loading fonts.');
			if (t instanceof P) {
				t.Pt || (await t.kt());
				const i = t,
					s = i.Lt({ fontSize: this.Xs(i) });
				this.$s(s);
			} else if (this.bt instanceof P) await this.bt.Ot(t);
			else {
				const i = new P(this.j, this.bt.fontSize);
				(await i.kt(t), this.$s(i));
			}
			return ((this.Es = t), (this.Ct = this.bt.fontSize), this.Zs(), this.bt);
		}
		async loadTileset(t) {
			if (!this.bt)
				throw new Error('Layer font not initialized. Ensure layer is attached before loading tilesets.');
			if (t instanceof D) {
				t.Pt || (await t.kt());
				const i = t.Lt({ fontSize: this.Xs(t) });
				this.$s(i);
			} else {
				const i = this.Gs ? this.Ct : t.fontSize,
					s = new D(this.j, i, t);
				(await s.kt(), this.$s(s));
			}
			return ((this.Es = t), (this.Ct = this.bt.fontSize), this.Zs(), this.bt);
		}
		qs(t, i, s = {}) {
			if (!this.Ms) return;
			if (!this.Ls || !this.Ds) return;
			const e = this.Ts.renderer,
				r = this.Ps,
				n = s.skipPluginHooks ?? !1;
			n || t.te.Js(this);
			try {
				let s = !1;
				try {
					(this.Ls.begin(),
						(s = !0),
						e.state.se.ie(),
						e.state.ee(),
						this.Hs.applyToState(e.state),
						(t.re = this),
						this.Bs.call(t));
				} finally {
					((t.re = void 0), s && this.Ls.end());
				}
				n || t.te.ne(this);
				const h = this.Os.length > 0,
					o = h ? this.ks : this.Ds;
				let a = !1;
				try {
					(o.begin(),
						(a = !0),
						e.he(i),
						i.oe({
							u_characterTexture: this.bt.framebuffer,
							u_charsetDimensions: [this.bt.textureColumns, this.bt.textureRows],
							U1: this.Ls.textures[0],
							Uj: this.Ls.textures[1],
							Um: this.Ls.textures[2],
							UH: !(this.bt instanceof D && this.zs),
							U9: [r.cols, r.rows],
							Ua: [o.width, o.height],
							U7: [0, 0, 0, 0],
						}),
						e.ae(0, 0, r.width, r.height));
				} finally {
					a && o.end();
				}
				h &&
					this.Ts.filterManager.ce(
						this.ks.textures[0],
						this.Ds,
						this.Os,
						this.Ds.width,
						this.Ds.height,
						this.Rs
					);
				try {
					((this.Qs = !0), (t.re = this), this.Is.call(t));
				} finally {
					((this.Qs = !1), (t.re = void 0));
				}
				this.Ns.length > 0 &&
					this.Ts.filterManager.ce(
						this.Ds.textures[0],
						this.Ds,
						this.Ns,
						this.Ds.width,
						this.Ds.height,
						this.Rs
					);
			} finally {
				((this.Os = []), (this.Ns = []), (this.Qs = !1));
			}
		}
		ue(t) {
			this.Fs = [...t];
		}
		le() {
			this.Fs = void 0;
		}
		fe() {
			this.Ls && this.Ds && this.Ps?.reset();
		}
		L() {
			(this.Ls?.dispose(),
				this.Ds?.dispose(),
				this.ks?.dispose(),
				this.Rs?.[0].dispose(),
				this.Rs?.[1].dispose(),
				this.bt?.dispose(),
				this.Ps?.L());
		}
		get texture() {
			return this.Ds?.textures[0];
		}
		get grid() {
			return this.Ps;
		}
		get font() {
			return this.bt;
		}
		get width() {
			return this.Ds ? this.Ds.width : 0;
		}
		get height() {
			return this.Ds ? this.Ds.height : 0;
		}
		get drawFramebuffer() {
			return this.Ls;
		}
		get asciiFramebuffer() {
			return this.Ds;
		}
		Zs() {
			if (!this.Ps || !this.bt) return;
			const t = this.bt.maxGlyphDimensions;
			(this.Ps.U(t.width, t.height), this.Ls && this.Ds && this.fe());
		}
		$s(t) {
			(((this.Es instanceof P || this.Es instanceof D) && this.bt === this.Es) ||
				this.bt === t ||
				this.bt.dispose(),
				(this.bt = t));
		}
		Xs(t) {
			return this.Gs ? this.Ct : t.fontSize;
		}
		Ks() {
			this.Hs.applyToState(this.Ts.renderer.state);
		}
		Ys() {
			if (this.Ls) return { width: Math.max(1, this.Ls.width), height: Math.max(1, this.Ls.height) };
			if (this.Ps) return { width: Math.max(1, this.Ps.cols), height: Math.max(1, this.Ps.rows) };
			const t = this.Ts?.renderer.context.canvas.width ?? this.Ts?.canvas.width ?? 1,
				i = this.Ts?.renderer.context.canvas.height ?? this.Ts?.canvas.height ?? 1;
			return { width: Math.max(1, t), height: Math.max(1, i) };
		}
	},
	nt = class {
		de;
		_e;
		Bs;
		Pt = !1;
		constructor(t) {
			this.de = t;
		}
		draw(t) {
			this.Bs = t;
		}
		async kt() {
			if (this.Pt) return;
			const t = this.pe();
			((this._e = t), (this.Pt = !0));
		}
		L() {
			this.Pt && (this._e?.L(), (this.Pt = !1));
		}
		me(t, i) {
			const s = this._e;
			(s.show(),
				s.draw(() => {
					(this.de.clear(), this.de.push());
					try {
						((this.Bs || t)(i), this.ve(i));
					} finally {
						this.de.pop();
					}
				}));
		}
		ve(t) {
			const { textmodifier: i, grid: s } = t,
				e = [116, 101, 120, 116, 109, 111, 100, 101, 46, 106, 115].map((t) => String.fromCharCode(t)).join(''),
				r = ((s.rows + 1) >> 1) - 2,
				n = 2 - ((s.cols + 1) >> 1),
				h = [
					[142, 249, 243],
					[241, 91, 181],
					[255, 155, 113],
				];
			(i.push(), i.translate(n, r, 0));
			for (let o = 0; o < e.length; o++) {
				const t = e[o],
					[s, r, n] = h[Math.floor(0.1 * i.frameCount + 0.5 * o) % h.length],
					a = i.color(s, r, n);
				(i.charColor(a), i.char(t), i.point(), i.translateX(1));
			}
			i.pop();
		}
	};
function ht(t, i, s) {
	!(function (t, i, s, e) {
		(t.push(), t.translate(s, e, 0));
		for (const r of i) (t.char(r), t.rect(1, 1), t.translateX(1));
		t.pop();
	})(t, i, -Math.floor(i.length / 2), s);
}
var ot = ({ textmodifier: t, grid: i, errorTitle: s, errorMessage: e }) => {
		(t.background('#222323'),
			t.cellColor('#222323'),
			t.charColor('#FF6B6B'),
			ht(t, 'X', -2),
			ht(t, s || 'SKETCH ERROR', 0),
			t.charColor('#C0C0C0'));
		const r = e || 'Unknown error',
			n = Math.floor(0.8 * i.cols),
			h = at(r, n),
			o = h.slice(0, 3);
		(h.length > 3 && (o[2] = o[2].substring(0, n - 3) + '...'),
			o.forEach((i, s) => {
				ht(t, i, 3 + s);
			}));
		const a = at('CHECK CONSOLE FOR DETAILS', n),
			c = 5 + o.length;
		a.forEach((i, s) => {
			ht(t, i, c + s);
		});
	},
	at = (t, i) => {
		const s = t.split(' '),
			e = [];
		let r = '';
		for (const n of s) (r + ' ' + n).length <= i ? (r = r ? r + ' ' + n : n) : (r && e.push(r), (r = n));
		return (r && e.push(r), e);
	},
	ct = class extends nt {
		ge = 'inactive';
		ye = 'SKETCH ERROR';
		we = 'Unknown error';
		be = '';
		constructor(t) {
			super(t);
		}
		async kt() {
			this.Pt || (await super.kt(), this._e.opacity(1), this._e.hide());
		}
		get Me() {
			return this.Pt && 'active' === this.ge;
		}
		Ae(t) {
			(this.Ce(t), this.Pt && (this._e.opacity(1), this._e.show()));
		}
		xe() {
			this.Me && this.Se();
		}
		L() {
			super.L();
		}
		pe() {
			return new rt(this.de.j, { visible: !0, opacity: 1 });
		}
		Se() {
			const t = {
				textmodifier: this.de,
				grid: this._e.grid,
				errorTitle: this.ye,
				errorMessage: this.we,
				errorDetails: this.be || void 0,
			};
			this.me(ot, t);
		}
		Ce(t) {
			if (((this.ge = 'active'), t instanceof Error)) {
				const i = t.name?.trim() ? t.name.trim().toUpperCase() : 'SKETCH ERROR';
				return (
					(this.ye = i.endsWith('ERROR') ? i : `${i} ERROR`),
					(this.we = t.message || 'Unknown error'),
					void (this.be = t.stack || '')
				);
			}
			if ('string' == typeof t)
				return ((this.ye = 'SKETCH ERROR'), (this.we = t || 'Unknown error'), void (this.be = ''));
			((this.ye = 'SKETCH ERROR'), (this.we = 'Unknown error'), (this.be = ''));
		}
	},
	ut = /* @__PURE__ */ i({ ErrorLayerController: () => ct, TextmodeError: () => r, TextmodeErrorLevel: () => J });
function lt(t, i) {
	(t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, 1), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, i));
}
function ft(t) {
	if (t instanceof HTMLVideoElement)
		return t.readyState >= t.HAVE_CURRENT_DATA && t.videoWidth > 0 && t.videoHeight > 0;
	const { width: i, height: s } = gt(t);
	return i > 0 && s > 0;
}
function dt(t, i, s) {
	ft(s) && (t.bindTexture(t.TEXTURE_2D, i), lt(t, s), t.bindTexture(t.TEXTURE_2D, null));
}
function _t(t, i, s = t.NEAREST, e = t.NEAREST, r = t.CLAMP_TO_EDGE, n = t.CLAMP_TO_EDGE) {
	const h = t.createTexture();
	(t.bindTexture(t.TEXTURE_2D, h),
		pt(t, s, e, r, n),
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
function pt(t, i, s, e, r) {
	(t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, i),
		t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, s),
		t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, e),
		t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, r));
}
function mt(t, i, s, e, r, n = 0, h = t.FLOAT, o = !1) {
	(t.enableVertexAttribArray(i), t.vertexAttribPointer(i, s, h, o, e, r), t.vertexAttribDivisor(i, n));
}
function vt(t, i, s, e, r) {
	(t.bindBuffer(i, s), t.bufferData(i, e, r), t.bindBuffer(i, null));
}
function gt(t) {
	let i = 0,
		s = 0;
	return (
		t instanceof HTMLVideoElement
			? ((i = t.videoWidth), (s = t.videoHeight))
			: t instanceof HTMLImageElement
				? ((i = t.naturalWidth), (s = t.naturalHeight))
				: t instanceof HTMLCanvasElement && ((i = t.width), (s = t.height)),
		{ width: i, height: s }
	);
}
var yt = class extends e {
	o;
	u;
	Wt;
	Ee;
	V;
	Fe = [];
	Te = null;
	Pe;
	j;
	Le = null;
	De = /* @__PURE__ */ new Map();
	constructor(t, i, s = i, e = 1, r = {}, n) {
		(super(),
			(this.o = i),
			(this.u = s),
			(this.Ee = t),
			(this.Pe = H(e, 1, 8)),
			(this.j = n),
			(this.Wt = { filter: 'nearest', wrap: 'clamp', type: 'unsigned_byte', depth: !0, ...r }));
		const h = t.getParameter(t.MAX_DRAW_BUFFERS),
			o = t.getParameter(t.MAX_COLOR_ATTACHMENTS);
		((this.Pe = Math.min(this.Pe, h, o)),
			(this.V = t.createFramebuffer()),
			this.ke(),
			this.Re(),
			this.Wt.depth && this.Be());
	}
	ke() {
		const t = this.Ee,
			i = 'linear' === this.Wt.filter ? t.LINEAR : t.NEAREST,
			s = 'repeat' === this.Wt.wrap ? t.REPEAT : t.CLAMP_TO_EDGE;
		for (let e = 0; e < this.Pe; e++) {
			const e = t.createTexture();
			(t.bindTexture(t.TEXTURE_2D, e), pt(t, i, i, s, s), this.Ie(e, !1), this.Fe.push(e));
		}
		t.bindTexture(t.TEXTURE_2D, null);
	}
	Ie(t, i = !0) {
		const s = this.Ee,
			e = 'float' === this.Wt.type ? s.FLOAT : s.UNSIGNED_BYTE,
			r = e === s.FLOAT ? s.RGBA32F : s.RGBA8,
			n = s.RGBA;
		(i && s.bindTexture(s.TEXTURE_2D, t), s.texImage2D(s.TEXTURE_2D, 0, r, this.o, this.u, 0, n, e, null));
	}
	Re() {
		const t = this.Ee;
		if ((t.bindFramebuffer(t.FRAMEBUFFER, this.V), 1 === this.Pe))
			t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.Fe[0], 0);
		else {
			const i = [];
			for (let s = 0; s < this.Pe; s++) {
				const e = t.COLOR_ATTACHMENT0 + s;
				(t.framebufferTexture2D(t.FRAMEBUFFER, e, t.TEXTURE_2D, this.Fe[s], 0), i.push(e));
			}
			t.drawBuffers(i);
		}
		t.bindFramebuffer(t.FRAMEBUFFER, null);
	}
	Be() {
		const t = this.Ee;
		((this.Te = t.createRenderbuffer()),
			this.Oe(),
			t.bindFramebuffer(t.FRAMEBUFFER, this.V),
			t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, this.Te),
			t.bindFramebuffer(t.FRAMEBUFFER, null));
	}
	Oe() {
		if (!this.Te) return;
		const t = this.Ee;
		(t.bindRenderbuffer(t.RENDERBUFFER, this.Te),
			t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT24, this.o, this.u),
			t.bindRenderbuffer(t.RENDERBUFFER, null));
	}
	Z(t) {
		dt(this.Ee, this.Fe[0], t);
	}
	resize(t, i) {
		((this.o = t), (this.u = i), this.De.clear());
		const s = this.Ee;
		for (const e of this.Fe) this.Ie(e, !0);
		(s.bindTexture(s.TEXTURE_2D, null), this.Oe(), (this.Le = null));
	}
	readPixels(t) {
		const i = this.De.get(t);
		if (i) return i;
		const s = this.Ee,
			e = this.o,
			r = this.u,
			n = new Uint8Array(e * r * 4),
			h = s.getParameter(s.READ_FRAMEBUFFER_BINDING);
		(s.bindFramebuffer(s.READ_FRAMEBUFFER, this.V),
			s.readBuffer(s.COLOR_ATTACHMENT0 + t),
			s.readPixels(0, 0, e, r, s.RGBA, s.UNSIGNED_BYTE, n),
			s.bindFramebuffer(s.READ_FRAMEBUFFER, h));
		const o = 4 * e,
			a = new Uint8Array(n.length);
		for (let c = 0; c < r; c++) {
			const t = (r - 1 - c) * o,
				i = c * o;
			a.set(n.subarray(t, t + o), i);
		}
		return (this.De.set(t, a), a);
	}
	begin() {
		const t = this.Ee;
		(this.De.clear(),
			this.j.Ne(),
			this.j.Qe(this.V, this.o, this.u, this.Pe),
			this.Wt.depth && t.clear(t.DEPTH_BUFFER_BIT),
			this.j.state.ze());
	}
	end() {
		(this.j.state.He(), this.j.Ge(), this.j.je());
	}
	Ve() {
		return (this.Le || this.Xe(), this.Le);
	}
	Xe() {
		if (!this.j) return;
		const t = this.Pe > 1,
			i = this.Pe > 2,
			s = this.Pe > 3,
			e = {
				Un: this.Fe[0],
				Uo: t ? this.Fe[1] : this.Fe[0],
				Up: i ? this.Fe[2] : this.Fe[0],
				Uq: s ? this.Fe[3] : this.Fe[0],
				Ur: [this.o, this.u],
				Uc: t,
				Ud: i,
				Ue: s,
			},
			r = this.j.materialManager.$e;
		this.Le = this.j.materialManager.Ye(r, e);
	}
	dispose() {
		const t = this.Ee;
		(t.deleteFramebuffer(this.V),
			this.Fe.forEach((i) => {
				t.deleteTexture(i);
			}),
			this.Te && t.deleteRenderbuffer(this.Te),
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
		return this.Fe;
	}
	get attachmentCount() {
		return this.Pe;
	}
};
function wt(t) {
	return 'object' == typeof t && null !== t && 'textures' in t && Array.isArray(t.textures);
}
var bt = class extends e {
		Ee;
		Ke;
		We = /* @__PURE__ */ new Map();
		Ze = /* @__PURE__ */ new Map();
		qe = /* @__PURE__ */ new Map();
		Je = 0;
		tr = /* @__PURE__ */ new Map();
		ir;
		constructor(t, i, s) {
			(super(),
				(this.Ee = t),
				(this.ir = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS) ?? 16),
				(this.Ke = this.sr(i, s)),
				this.er());
		}
		er() {
			const t = this.Ee.getProgramParameter(this.Ke, this.Ee.ACTIVE_UNIFORMS);
			for (let i = 0; i < t; i++) {
				const t = this.Ee.getActiveUniform(this.Ke, i);
				if (t) {
					const i = t.name.replace(/\[0\]$/, ''),
						s = this.Ee.getUniformLocation(this.Ke, i);
					s && (this.We.set(i, s), this.Ze.set(i, { type: t.type, size: t.size }));
				}
			}
		}
		sr(t, i) {
			const s = this.rr(this.Ee.VERTEX_SHADER, t),
				e = this.rr(this.Ee.FRAGMENT_SHADER, i),
				r = this.Ee.createProgram();
			if (!r) throw new Error('Failed to create WebGL program');
			if (
				(this.Ee.attachShader(r, s),
				this.Ee.attachShader(r, e),
				this.Ee.linkProgram(r),
				!this.Ee.getProgramParameter(r, this.Ee.LINK_STATUS))
			) {
				const t = this.Ee.getProgramInfoLog(r);
				throw new Error(`Shader program link error: ${t}`);
			}
			return (this.Ee.deleteShader(s), this.Ee.deleteShader(e), r);
		}
		rr(t, i) {
			const s = this.Ee.createShader(t);
			if (!s) throw new Error(`Failed to create shader of type ${t}`);
			if (
				(this.Ee.shaderSource(s, i),
				this.Ee.compileShader(s),
				!this.Ee.getShaderParameter(s, this.Ee.COMPILE_STATUS))
			) {
				const t = this.Ee.getShaderInfoLog(s);
				throw (this.Ee.deleteShader(s), new Error(`Shader compilation error: ${t}`));
			}
			return s;
		}
		nr() {
			(this.Ee.useProgram(this.Ke), this.hr());
		}
		hr() {
			((this.Je = 0), this.tr.clear());
			for (const [t, i] of this.qe) (i instanceof WebGLTexture || wt(i)) && this.qe.delete(t);
		}
		oe(t) {
			for (const i in t) this.ar(i, t[i]);
		}
		ar(t, i) {
			const s = this.We.get(t);
			if (!s) return;
			const e = this.qe.get(t);
			let r = !0;
			if (
				(void 0 !== e &&
					('number' == typeof i || 'boolean' == typeof i
						? e === i && (r = !1)
						: (i instanceof WebGLTexture || wt(i)) && e === i && (r = !1)),
				!r)
			)
				return;
			'number' == typeof i || 'boolean' == typeof i || i instanceof WebGLTexture || wt(i)
				? this.qe.set(t, i)
				: this.qe.delete(t);
			const n = this.Ze.get(t);
			if (!n) return;
			const { type: h, size: o } = n,
				a = this.Ee;
			if (i instanceof WebGLTexture) {
				const e = this.cr(t);
				return (a.uniform1i(s, e), a.activeTexture(a.TEXTURE0 + e), void a.bindTexture(a.TEXTURE_2D, i));
			}
			if (wt(i)) {
				const e = this.cr(t);
				return (
					a.uniform1i(s, e),
					a.activeTexture(a.TEXTURE0 + e),
					void a.bindTexture(a.TEXTURE_2D, i.textures[0])
				);
			}
			if ('number' != typeof i)
				if ('boolean' != typeof i)
					if (Array.isArray(i) && Array.isArray(i[0])) {
						const t = i.flat();
						switch (h) {
							case a.FLOAT_VEC2:
								a.uniform2fv(s, t);
								break;
							case a.FLOAT_VEC3:
								a.uniform3fv(s, t);
								break;
							case a.FLOAT_VEC4:
								a.uniform4fv(s, t);
						}
					} else {
						const t = i;
						switch (h) {
							case a.FLOAT:
								o > 1 ? a.uniform1fv(s, t) : a.uniform1f(s, t[0]);
								break;
							case a.FLOAT_VEC2:
								a.uniform2fv(s, t);
								break;
							case a.FLOAT_VEC3:
								a.uniform3fv(s, t);
								break;
							case a.FLOAT_VEC4:
								a.uniform4fv(s, t);
								break;
							case a.INT:
								o > 1 ? a.uniform1iv(s, t) : a.uniform1i(s, t[0]);
								break;
							case a.INT_VEC2:
								a.uniform2iv(s, t);
								break;
							case a.INT_VEC3:
								a.uniform3iv(s, t);
								break;
							case a.INT_VEC4:
								a.uniform4iv(s, t);
								break;
							case a.BOOL:
								a.uniform1iv(s, t);
								break;
							case a.FLOAT_MAT2:
								a.uniformMatrix2fv(s, !1, t);
								break;
							case a.FLOAT_MAT3:
								a.uniformMatrix3fv(s, !1, t);
								break;
							case a.FLOAT_MAT4:
								a.uniformMatrix4fv(s, !1, t);
						}
					}
				else a.uniform1i(s, i ? 1 : 0);
			else h === a.INT || h === a.BOOL ? a.uniform1i(s, i) : a.uniform1f(s, i);
		}
		cr(t) {
			const i = this.tr.get(t);
			if (void 0 !== i) return i;
			if (this.Je >= this.ir)
				throw new Error(
					`[textmode.js] Shader attempted to bind more than ${this.ir} texture samplers. Uniform "${t}" cannot be assigned.`
				);
			const s = this.Je++;
			return (this.tr.set(t, s), s);
		}
		get program() {
			return this.Ke;
		}
		dispose() {
			(this.Ee.deleteProgram(this.Ke), super.dispose());
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
function Ft() {
	return { mode: 'rgb', maxes: Et('rgb') };
}
function Ut(t, i) {
	return Number.isNaN(t) ? 0 : H(t, 0, i) / i;
}
function Tt(t, i) {
	return Math.round(255 * Ut(t, i));
}
function Pt(t, i) {
	return Tt(t ?? i, i);
}
function Lt(t, i, s) {
	return (
		s < 0 && (s += 1),
		s > 1 && (s -= 1),
		s < 1 / 6 ? t + 6 * (i - t) * s : s < 0.5 ? i : s < 2 / 3 ? t + (i - t) * (2 / 3 - s) * 6 : t
	);
}
function Dt(t, i, s, e, r) {
	const [n, h, o, a] = r.maxes,
		c = Pt(e, a);
	if ('rgb' === r.mode) return [Tt(t, n), Tt(i, h), Tt(s, o), c];
	const u = ((l = t), (f = n), Number.isNaN(l) ? 0 : (((l % f) + f) % f) / f);
	var l, f;
	const d = Ut(i, h),
		_ = Ut(s, o),
		[p, m, v] =
			'hsb' === r.mode
				? (function (t, i, s) {
						if (0 === i) return [s, s, s];
						const e = 6 * t,
							r = Math.floor(e),
							n = e - r,
							h = s * (1 - i),
							o = s * (1 - n * i),
							a = s * (1 - (1 - n) * i);
						switch (r % 6) {
							case 0:
								return [s, a, h];
							case 1:
								return [o, s, h];
							case 2:
								return [h, s, a];
							case 3:
								return [h, o, s];
							case 4:
								return [a, h, s];
							default:
								return [s, h, o];
						}
					})(u, d, _)
				: (function (t, i, s) {
						if (0 === i) return [s, s, s];
						const e = s < 0.5 ? s * (1 + i) : s + i - s * i,
							r = 2 * s - e;
						return [Lt(r, e, t + 1 / 3), Lt(r, e, t), Lt(r, e, t - 1 / 3)];
					})(u, d, _);
	return [Math.round(255 * p), Math.round(255 * m), Math.round(255 * v), c];
}
var kt = class {
		ur = 0;
		lr = 0;
		dr = 0;
		_r = 0;
		pr = 0;
		mr = 0;
		vr = 1;
		gr = 1;
		yr = 1;
		wr = Z();
		br = Z();
		Mr = Z();
		Ar(t) {
			((t.ur = this.ur),
				(t.lr = this.lr),
				(t.dr = this.dr),
				(t._r = this._r),
				(t.pr = this.pr),
				(t.mr = this.mr),
				(t.vr = this.vr),
				(t.gr = this.gr),
				(t.yr = this.yr));
			for (let i = 0; i < 16; i++) t.wr[i] = this.wr[i];
		}
		Cr(t) {
			((this.ur = t.ur),
				(this.lr = t.lr),
				(this.dr = t.dr),
				(this._r = t._r),
				(this.pr = t.pr),
				(this.mr = t.mr),
				(this.vr = t.vr),
				(this.gr = t.gr),
				(this.yr = t.yr));
			for (let i = 0; i < 16; i++) this.wr[i] = t.wr[i];
		}
		Sr(t = 0, i = 0, s = 0) {
			(0 === t && 0 === i && 0 === s) ||
				((this.br[0] = 1),
				(this.br[1] = 0),
				(this.br[2] = 0),
				(this.br[3] = 0),
				(this.br[4] = 0),
				(this.br[5] = 1),
				(this.br[6] = 0),
				(this.br[7] = 0),
				(this.br[8] = 0),
				(this.br[9] = 0),
				(this.br[10] = 1),
				(this.br[11] = 0),
				(this.br[12] = t),
				(this.br[13] = i),
				(this.br[14] = s),
				(this.br[15] = 1),
				this.Er(this.br));
		}
		Fr(t, i, s) {
			const e = void 0 === i ? t : i,
				r = void 0 === s ? (void 0 === i ? t : 1) : s;
			(1 === t && 1 === e && 1 === r) ||
				((this.br[0] = t),
				(this.br[1] = 0),
				(this.br[2] = 0),
				(this.br[3] = 0),
				(this.br[4] = 0),
				(this.br[5] = e),
				(this.br[6] = 0),
				(this.br[7] = 0),
				(this.br[8] = 0),
				(this.br[9] = 0),
				(this.br[10] = r),
				(this.br[11] = 0),
				(this.br[12] = 0),
				(this.br[13] = 0),
				(this.br[14] = 0),
				(this.br[15] = 1),
				this.Er(this.br));
		}
		Tr(t) {
			if (0 === t) return;
			const i = O(t);
			((this.br[0] = 1),
				(this.br[1] = 0),
				(this.br[2] = 0),
				(this.br[3] = 0),
				(this.br[4] = 0),
				(this.br[5] = Math.cos(i)),
				(this.br[6] = Math.sin(i)),
				(this.br[7] = 0),
				(this.br[8] = 0),
				(this.br[9] = -Math.sin(i)),
				(this.br[10] = Math.cos(i)),
				(this.br[11] = 0),
				(this.br[12] = 0),
				(this.br[13] = 0),
				(this.br[14] = 0),
				(this.br[15] = 1),
				this.Er(this.br));
		}
		Pr(t) {
			if (0 === t) return;
			const i = O(t);
			((this.br[0] = Math.cos(i)),
				(this.br[1] = 0),
				(this.br[2] = -Math.sin(i)),
				(this.br[3] = 0),
				(this.br[4] = 0),
				(this.br[5] = 1),
				(this.br[6] = 0),
				(this.br[7] = 0),
				(this.br[8] = Math.sin(i)),
				(this.br[9] = 0),
				(this.br[10] = Math.cos(i)),
				(this.br[11] = 0),
				(this.br[12] = 0),
				(this.br[13] = 0),
				(this.br[14] = 0),
				(this.br[15] = 1),
				this.Er(this.br));
		}
		Lr(t) {
			if (0 === t) return;
			const i = O(t);
			((this.br[0] = Math.cos(i)),
				(this.br[1] = Math.sin(i)),
				(this.br[2] = 0),
				(this.br[3] = 0),
				(this.br[4] = -Math.sin(i)),
				(this.br[5] = Math.cos(i)),
				(this.br[6] = 0),
				(this.br[7] = 0),
				(this.br[8] = 0),
				(this.br[9] = 0),
				(this.br[10] = 1),
				(this.br[11] = 0),
				(this.br[12] = 0),
				(this.br[13] = 0),
				(this.br[14] = 0),
				(this.br[15] = 1),
				this.Er(this.br));
		}
		Dr(t, i, s, e) {
			if (0 === t) return;
			const r = Math.hypot(i, s, e);
			if (r < 1e-6) return;
			const n = i / r,
				h = s / r,
				o = e / r,
				a = O(t),
				c = Math.cos(a),
				u = Math.sin(a),
				l = 1 - c;
			((this.br[0] = l * n * n + c),
				(this.br[1] = l * n * h + u * o),
				(this.br[2] = l * n * o - u * h),
				(this.br[3] = 0),
				(this.br[4] = l * n * h - u * o),
				(this.br[5] = l * h * h + c),
				(this.br[6] = l * h * o + u * n),
				(this.br[7] = 0),
				(this.br[8] = l * n * o + u * h),
				(this.br[9] = l * h * o - u * n),
				(this.br[10] = l * o * o + c),
				(this.br[11] = 0),
				(this.br[12] = 0),
				(this.br[13] = 0),
				(this.br[14] = 0),
				(this.br[15] = 1),
				this.Er(this.br));
		}
		kr() {
			(Z(this.wr),
				(this.ur = 0),
				(this.lr = 0),
				(this.dr = 0),
				(this._r = 0),
				(this.pr = 0),
				(this.mr = 0),
				(this.vr = 1),
				(this.gr = 1),
				(this.yr = 1));
		}
		Rr(t) {
			if (!this.Br(t))
				throw new Error('applyMatrix() only supports affine transform matrices without shear or perspective.');
			this.Er(t);
		}
		Er(t) {
			!(function (t, i, s = /* @__PURE__ */ new Float32Array(16)) {
				const e = t[0],
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
					F = i[9],
					U = i[10],
					T = i[11],
					P = i[12],
					L = i[13],
					D = i[14],
					k = i[15];
				((s[0] = e * y + o * w + l * b + p * M),
					(s[1] = r * y + a * w + f * b + m * M),
					(s[2] = n * y + c * w + d * b + v * M),
					(s[3] = h * y + u * w + _ * b + g * M),
					(s[4] = e * A + o * C + l * x + p * S),
					(s[5] = r * A + a * C + f * x + m * S),
					(s[6] = n * A + c * C + d * x + v * S),
					(s[7] = h * A + u * C + _ * x + g * S),
					(s[8] = e * E + o * F + l * U + p * T),
					(s[9] = r * E + a * F + f * U + m * T),
					(s[10] = n * E + c * F + d * U + v * T),
					(s[11] = h * E + u * F + _ * U + g * T),
					(s[12] = e * P + o * L + l * D + p * k),
					(s[13] = r * P + a * L + f * D + m * k),
					(s[14] = n * P + c * L + d * D + v * k),
					(s[15] = h * P + u * L + _ * D + g * k));
			})(this.wr, t, this.Mr);
			for (let i = 0; i < 16; i++) this.wr[i] = this.Mr[i];
			this.Ir();
		}
		Ir() {
			const t = this.wr,
				i = this._r,
				s = this.pr,
				e = this.mr;
			((this.ur = t[12]), (this.lr = t[13]), (this.dr = t[14]));
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
				(this.vr = d),
				(this.gr = _),
				(this.yr = p));
			const m = r / d,
				v = o / _,
				g = l / p,
				y = f / p,
				w = H(u / p, -1, 1),
				b = Math.asin(w),
				M = Math.cos(b);
			let A, C;
			Math.abs(M) > 1e-6
				? ((A = Math.atan2(-g, y)), (C = Math.atan2(-v, m)))
				: ((A = Math.atan2(t[6] / _, t[5] / _)), (C = 0));
			const x = this.Or(A + Math.PI),
				S = this.Or(Math.PI - b),
				E = this.Or(C + Math.PI),
				F = Math.abs(this.Or(A - i)) + Math.abs(this.Or(b - s)) + Math.abs(this.Or(C - e));
			Math.abs(this.Or(x - i)) + Math.abs(this.Or(S - s)) + Math.abs(this.Or(E - e)) < F
				? ((this._r = x), (this.pr = S), (this.mr = E))
				: ((this._r = A), (this.pr = b), (this.mr = C));
		}
		Or(t) {
			let i = (t + Math.PI) % (2 * Math.PI);
			return (i < 0 && (i += 2 * Math.PI), i - Math.PI);
		}
		Br(t) {
			if (16 !== t.length) return !1;
			if (Math.abs(t[3]) > 1e-6 || Math.abs(t[7]) > 1e-6 || Math.abs(t[11]) > 1e-6 || Math.abs(t[15] - 1) > 1e-6)
				return !1;
			const i = t[0],
				s = t[1],
				e = t[2],
				r = t[4],
				n = t[5],
				h = t[6],
				o = t[8],
				a = t[9],
				c = t[10],
				u = Math.hypot(i, s, e),
				l = Math.hypot(r, n, h),
				f = Math.hypot(o, a, c);
			if (u < 1e-6 || l < 1e-6 || f < 1e-6) return !1;
			const d = i / u,
				_ = s / u,
				p = e / u,
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
	Rt = (Math.PI / 180) * 28.072486935852957,
	Bt = class {
		ps = !1;
		Nr = 0;
		Qr = 0;
		ss = Rt;
		ds = 0.1;
		_s = 4096;
		ts = !0;
		es = 0;
		rs = 0;
		ns = 0;
		$i = 0;
		Ki = 0;
		Wi = 0;
		Zi = 0;
		qi = 1;
		Ji = 0;
		Ar(t) {
			((t.ps = this.ps),
				(t.Nr = this.Nr),
				(t.Qr = this.Qr),
				(t.ss = this.ss),
				(t.ds = this.ds),
				(t._s = this._s),
				(t.ts = this.ts),
				(t.es = this.es),
				(t.rs = this.rs),
				(t.ns = this.ns),
				(t.$i = this.$i),
				(t.Ki = this.Ki),
				(t.Wi = this.Wi),
				(t.Zi = this.Zi),
				(t.qi = this.qi),
				(t.Ji = this.Ji));
		}
		Cr(t) {
			((this.ps = t.ps),
				(this.Nr = t.Nr),
				(this.Qr = t.Qr),
				(this.ss = t.ss),
				(this.ds = t.ds),
				(this._s = t._s),
				(this.ts = t.ts),
				(this.es = t.es),
				(this.rs = t.rs),
				(this.ns = t.ns),
				(this.$i = t.$i),
				(this.Ki = t.Ki),
				(this.Wi = t.Wi),
				(this.Zi = t.Zi),
				(this.qi = t.qi),
				(this.Ji = t.Ji));
		}
		zr(t) {
			if (t) {
				if (this.ps) return;
				return ((this.ps = !0), void this.Nr++);
			}
			this.ps && ((this.ps = !1), this.Nr++);
		}
		gs(t, i, s) {
			let e = !1;
			if (void 0 !== t) {
				const i = O(Math.max(1, Math.min(179, t)));
				this.ss !== i && ((this.ss = i), (e = !0));
			}
			((void 0 === i && void 0 === s) || (e = this.Hr(i, s) || e),
				this.ps && ((this.ps = !1), (e = !0)),
				e && this.Nr++);
		}
		vs(t, i) {
			let s = !1;
			((s = this.Hr(t, i) || s), this.ps || ((this.ps = !0), (s = !0)), s && this.Nr++);
		}
		cs(t, i, s, e = 0, r = 0, n = 0, h = 0, o = 1, a = 0) {
			(this.ts ||
				this.es !== t ||
				this.rs !== i ||
				this.ns !== s ||
				this.$i !== e ||
				this.Ki !== r ||
				this.Wi !== n ||
				this.Zi !== h ||
				this.qi !== o ||
				this.Ji !== a) &&
				((this.ts = !1),
				(this.es = t),
				(this.rs = i),
				(this.ns = s),
				(this.$i = e),
				(this.Ki = r),
				(this.Wi = n),
				(this.Zi = h),
				(this.qi = o),
				(this.Ji = a),
				this.Qr++);
		}
		bs(t, i, s, e, r, n) {
			let h = this.$i !== t || this.Ki !== i || this.Wi !== s;
			(void 0 !== e && this.Zi !== e && ((this.Zi = e), (h = !0)),
				void 0 !== r && this.qi !== r && ((this.qi = r), (h = !0)),
				void 0 !== n && this.Ji !== n && ((this.Ji = n), (h = !0)),
				h && ((this.$i = t), (this.Ki = i), (this.Wi = s), this.Qr++));
		}
		ws() {
			(this.ts &&
				0 === this.es &&
				0 === this.rs &&
				0 === this.ns &&
				0 === this.$i &&
				0 === this.Ki &&
				0 === this.Wi &&
				0 === this.Zi &&
				1 === this.qi &&
				0 === this.Ji) ||
				((this.ts = !0),
				(this.es = 0),
				(this.rs = 0),
				(this.ns = 0),
				(this.$i = 0),
				(this.Ki = 0),
				(this.Wi = 0),
				(this.Zi = 0),
				(this.qi = 1),
				(this.Ji = 0),
				this.Qr++);
		}
		Gr() {
			this.ps && ((this.ps = !1), this.Nr++);
		}
		Hr(t, i) {
			if (void 0 === t && void 0 === i) return !1;
			const s = void 0 === t ? this.ds : Math.max(1e-4, t),
				e = s + 1e-4,
				r = void 0 === i ? Math.max(this._s, e) : Math.max(e, i);
			return (s !== this.ds || r !== this._s) && ((this.ds = s), (this._s = r), !0);
		}
	},
	It = 15,
	Ot = class {
		jr = /* @__PURE__ */ new Float32Array(3);
		Vr = 0;
		Xr = new Float32Array(It);
		$r = new Float32Array(It);
		Yr = new Float32Array([1, 0, 0]);
		Kr = !1;
		Wr = 0;
		Ar(t) {
			((t.jr[0] = this.jr[0]),
				(t.jr[1] = this.jr[1]),
				(t.jr[2] = this.jr[2]),
				(t.Vr = this.Vr),
				(t.Kr = this.Kr),
				(t.Wr = this.Wr));
			for (let i = 0; i < It; i++) ((t.Xr[i] = this.Xr[i]), (t.$r[i] = this.$r[i]));
			((t.Yr[0] = this.Yr[0]), (t.Yr[1] = this.Yr[1]), (t.Yr[2] = this.Yr[2]));
		}
		Cr(t) {
			((this.jr[0] = t.jr[0]),
				(this.jr[1] = t.jr[1]),
				(this.jr[2] = t.jr[2]),
				(this.Vr = t.Vr),
				(this.Kr = t.Kr),
				(this.Wr = t.Wr));
			for (let i = 0; i < It; i++) ((this.Xr[i] = t.Xr[i]), (this.$r[i] = t.$r[i]));
			((this.Yr[0] = t.Yr[0]), (this.Yr[1] = t.Yr[1]), (this.Yr[2] = t.Yr[2]));
		}
		Zr(t, i, s) {
			((this.Kr = !0), (this.jr[0] += t), (this.jr[1] += i), (this.jr[2] += s), this.Wr++);
		}
		qr(t, i, s, e, r, n) {
			if (this.Vr >= 5) return;
			this.Kr = !0;
			const h = 3 * this.Vr;
			((this.Xr[h] = e),
				(this.Xr[h + 1] = r),
				(this.Xr[h + 2] = n),
				(this.$r[h] = t),
				(this.$r[h + 1] = i),
				(this.$r[h + 2] = s),
				this.Vr++,
				this.Wr++);
		}
		Jr(t, i, s) {
			let e = Math.max(0, t);
			const r = Math.max(0, i),
				n = Math.max(0, s);
			(0 === e && 0 === r && 0 === n && (e = 1),
				(this.Yr[0] === e && this.Yr[1] === r && this.Yr[2] === n) ||
					((this.Yr[0] = e), (this.Yr[1] = r), (this.Yr[2] = n), this.Wr++));
		}
		tn() {
			const t = 0 !== this.jr[0] || 0 !== this.jr[1] || 0 !== this.jr[2],
				i = this.Vr > 0,
				s = this.Kr || t || i,
				e = 1 !== this.Yr[0] || 0 !== this.Yr[1] || 0 !== this.Yr[2];
			if (s || e) {
				((this.Kr = !1), (this.jr[0] = 0), (this.jr[1] = 0), (this.jr[2] = 0), (this.Vr = 0));
				for (let t = 0; t < It; t++) ((this.Xr[t] = 0), (this.$r[t] = 0));
				((this.Yr[0] = 1), (this.Yr[1] = 0), (this.Yr[2] = 0), this.Wr++);
			}
		}
		ie() {
			const t = 0 !== this.jr[0] || 0 !== this.jr[1] || 0 !== this.jr[2];
			if (0 !== this.Vr || t || this.Kr) {
				((this.Kr = !1), (this.jr[0] = 0), (this.jr[1] = 0), (this.jr[2] = 0), (this.Vr = 0));
				for (let t = 0; t < It; t++) ((this.Xr[t] = 0), (this.$r[t] = 0));
				this.Wr++;
			}
		}
	};
function Nt(t, i, s, e, r = 255) {
	((t[0] = i / 255), (t[1] = (s ?? i) / 255), (t[2] = (e ?? i) / 255), (t[3] = r / 255));
}
var Qt = class {
	sn = 1;
	en = [1, 1, 0];
	rn = '';
	nn = [1, 1, 1, 1];
	hn = [0, 0, 0, 1];
	an = 'rgb';
	cn = Ft().maxes;
	un = !1;
	ln = !1;
	dn = !1;
	_n = 0;
	Fs = [0, 0, 0, 1];
	Ar(t) {
		((t.pn = this.sn),
			(t.mn = this.un),
			(t.vn = this.ln),
			(t.dn = this.dn),
			(t._n = this._n),
			(t.gn[0] = this.en[0]),
			(t.gn[1] = this.en[1]),
			(t.gn[2] = this.en[2]),
			(t.yn = this.rn),
			(t.wn[0] = this.nn[0]),
			(t.wn[1] = this.nn[1]),
			(t.wn[2] = this.nn[2]),
			(t.wn[3] = this.nn[3]),
			(t.bn[0] = this.hn[0]),
			(t.bn[1] = this.hn[1]),
			(t.bn[2] = this.hn[2]),
			(t.bn[3] = this.hn[3]),
			(t.an = this.an),
			(t.cn[0] = this.cn[0]),
			(t.cn[1] = this.cn[1]),
			(t.cn[2] = this.cn[2]),
			(t.cn[3] = this.cn[3]));
	}
	Cr(t) {
		((this.sn = t.pn),
			(this.un = t.mn),
			(this.ln = t.vn),
			(this.dn = t.dn),
			(this._n = t._n),
			(this.en[0] = t.gn[0]),
			(this.en[1] = t.gn[1]),
			(this.en[2] = t.gn[2]),
			(this.rn = t.yn),
			(this.nn[0] = t.wn[0]),
			(this.nn[1] = t.wn[1]),
			(this.nn[2] = t.wn[2]),
			(this.nn[3] = t.wn[3]),
			(this.hn[0] = t.bn[0]),
			(this.hn[1] = t.bn[1]),
			(this.hn[2] = t.bn[2]),
			(this.hn[3] = t.bn[3]),
			(this.an = t.an),
			(this.cn[0] = t.cn[0]),
			(this.cn[1] = t.cn[1]),
			(this.cn[2] = t.cn[2]),
			(this.cn[3] = t.cn[3]));
	}
	Mn(t) {
		this.sn = Math.abs(t);
	}
	An(t) {
		((this.en[0] = t[0]), (this.en[1] = t[1]), (this.en[2] = t[2]));
	}
	Cn(t) {
		this.rn = t;
	}
	xn(t, i, s, e = 255) {
		Nt(this.nn, t, i, s, e);
	}
	Sn(t, i, s, e = 255) {
		Nt(this.hn, t, i, s, e);
	}
	En(t) {
		this.un = t;
	}
	Fn(t) {
		this.ln = t;
	}
	Tn(t) {
		this.dn = t;
	}
	Pn(t) {
		this._n = W(t);
	}
	Ln(t, i, s, e) {
		Nt(this.Fs, t, i, s, e);
	}
	Dn() {
		((this.Fs[0] = 0), (this.Fs[1] = 0), (this.Fs[2] = 0), (this.Fs[3] = 0));
	}
	kn() {
		return { mode: this.an, maxes: [this.cn[0], this.cn[1], this.cn[2], this.cn[3]] };
	}
	Rn(t, i) {
		((this.an = t), (this.cn[0] = i[0]), (this.cn[1] = i[1]), (this.cn[2] = i[2]), (this.cn[3] = i[3]));
	}
};
function zt(t, i) {
	((t[0] = i[0]), (t[1] = i[1]), (t[2] = i[2]), (t[3] = i[3]));
}
function Ht(t, i) {
	if ('none' === i.kind) return ((t.kind = 'none'), (t.source = null), void (t.framebuffer = null));
	if ('source' === i.kind) {
		const s = t;
		return (
			(s.kind = 'source'),
			(s.source = i.source),
			(s.palette = i.palette),
			(s.brightnessStart = i.brightnessStart),
			(s.brightnessEnd = i.brightnessEnd),
			(s.invert = i.invert),
			(s.flipX = i.flipX),
			(s.flipY = i.flipY),
			(s.charRotation = i.charRotation),
			(s.charColorMode = i.charColorMode),
			(s.cellColorMode = i.cellColorMode),
			(s.charColor ??= [1, 1, 1, 1]),
			(s.cellColor ??= [0, 0, 0, 1]),
			zt(s.charColor, i.charColor),
			void zt(s.cellColor, i.cellColor)
		);
	}
	const s = t;
	((s.kind = 'framebuffer'),
		(s.framebuffer = i.framebuffer),
		(s.textures ??= []),
		(s.textures.length = i.textures.length));
	for (let e = 0; e < i.textures.length; e++) s.textures[e] = i.textures[e];
	((s.width = i.width), (s.height = i.height), (s.attachmentCount = i.attachmentCount));
}
var Gt = class {
		Bn = {
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
		In = 0;
		constructor() {
			((this.Bn.kind = 'none'), (this.Bn.source = null), (this.Bn.framebuffer = null));
		}
		On(t) {
			(Ht(this.Bn, t), this.In++);
		}
		Nn(t) {
			const i = this.Bn;
			((i.kind = 'framebuffer'),
				(i.framebuffer = t),
				(i.textures ??= []),
				(i.textures.length = t.textures.length));
			for (let s = 0; s < t.textures.length; s++) i.textures[s] = t.textures[s];
			((i.width = t.width), (i.height = t.height), (i.attachmentCount = t.attachmentCount), this.In++);
		}
		Qn() {
			'none' !== this.Bn.kind &&
				((this.Bn.kind = 'none'), (this.Bn.source = null), (this.Bn.framebuffer = null), this.In++);
		}
		Ar(t) {
			((t.zn = this.In), Ht(t.Hn, this.Bn));
		}
		Cr(t) {
			((this.In = t.zn), Ht(this.Bn, t.Hn));
		}
		get current() {
			return this.Bn;
		}
	},
	jt = class t {
		Gn = new kt();
		Yi = new Bt();
		se = new Ot();
		gn = new Qt();
		jn = new Gt();
		Vn = [];
		Xn = [];
		static $n() {
			return {
				pn: 1,
				ur: 0,
				lr: 0,
				dr: 0,
				_r: 0,
				pr: 0,
				mr: 0,
				vr: 1,
				gr: 1,
				yr: 1,
				wr: Z(),
				_n: 0,
				mn: !1,
				vn: !1,
				dn: !1,
				ps: !1,
				Nr: 0,
				Qr: 0,
				ss: Rt,
				ds: 0.1,
				_s: 4096,
				ts: !0,
				es: 0,
				rs: 0,
				ns: 0,
				$i: 0,
				Ki: 0,
				Wi: 0,
				Zi: 0,
				qi: 1,
				Ji: 0,
				Vr: 0,
				Xr: new Float32Array(15),
				$r: new Float32Array(15),
				jr: /* @__PURE__ */ new Float32Array(3),
				Yr: new Float32Array([1, 0, 0]),
				Kr: !1,
				Wr: 0,
				zn: 0,
				Hn: {
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
				gn: [1, 1, 0],
				yn: '',
				wn: [1, 1, 1, 1],
				bn: [0, 0, 0, 1],
				an: Ft().mode,
				cn: Ft().maxes,
			};
		}
		Yn(t) {
			(this.Gn.Ar(t), this.Yi.Ar(t), this.se.Ar(t), this.gn.Ar(t), this.jn.Ar(t));
		}
		Kn(t) {
			(this.Gn.Cr(t), this.Yi.Cr(t), this.se.Cr(t), this.gn.Cr(t), this.jn.Cr(t));
		}
		Wn(t) {
			this.Kn(t);
		}
		ze() {
			let i = this.Xn.pop();
			(i || (i = t.$n()), this.Yn(i), this.Vn.push(i));
		}
		He() {
			const t = this.Vn.pop();
			t ? (this.Kn(t), this.Xn.push(t)) : console.warn('pop() called without matching push()');
		}
		ee() {
			(this.Gn.kr(), this.Yi.Gr());
		}
	},
	Vt = /* @__PURE__ */ (function (t) {
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
	$t = new Float32Array([
		-0.5, -0.5, 0, 0, 0.5, -0.5, 1, 0, -0.5, 0.5, 0, 1, -0.5, 0.5, 0, 1, 0.5, -0.5, 1, 0, 0.5, 0.5, 1, 1,
	]),
	Yt = { Zn: 16, qn: { Jn: { size: 2, offset: 0 }, th: { size: 2, offset: 8 } } },
	Kt = { Zn: 20, qn: { Jn: { size: 3, offset: 0 }, th: { size: 2, offset: 12 } } },
	Wt = { Zn: 24, qn: { Jn: { size: 4, offset: 0 }, th: { size: 2, offset: 16 } } },
	Zt = class {
		Ee;
		ih;
		sh;
		constructor(t) {
			((this.Ee = t), (this.ih = t.createBuffer()), (this.sh = new Float32Array($t.length)));
		}
		eh(t, i, s, e) {
			const r = this.Ee,
				n = Ct(this.Ee),
				h = n[2],
				o = n[3],
				a = (t / h) * 2 - 1,
				c = ((t + s) / h) * 2 - 1,
				u = 1 - ((i + e) / o) * 2,
				l = 1 - (i / o) * 2,
				f = $t,
				d = this.sh;
			for (let _ = 0; _ < f.length; _ += 4) {
				const t = f[_],
					i = f[_ + 1],
					s = f[_ + 2],
					e = f[_ + 3],
					r = a + (t + 0.5) * (c - a),
					n = u + (i + 0.5) * (l - u);
				((d[_] = r), (d[_ + 1] = n), (d[_ + 2] = s), (d[_ + 3] = e));
			}
			(r.bindBuffer(r.ARRAY_BUFFER, this.ih),
				r.bufferData(r.ARRAY_BUFFER, d, r.DYNAMIC_DRAW),
				mt(r, 0, 2, 16, 0),
				mt(r, 1, 2, 16, 8),
				r.drawArrays(r.TRIANGLES, 0, 6),
				r.disableVertexAttribArray(1),
				r.disableVertexAttribArray(0),
				r.bindBuffer(r.ARRAY_BUFFER, null));
		}
		L() {
			this.Ee.deleteBuffer(this.ih);
		}
	},
	qt = class {
		Ee;
		rh = /* @__PURE__ */ new Map();
		nh = null;
		constructor(t) {
			this.Ee = t;
		}
		hh(t) {
			const { shader: i, geometryKey: s, unit: e, geometryBuffer: r, indexBuffer: n, instanceAttributes: h } = t,
				o = this.Ee,
				a = i.program;
			let c = this.rh.get(i);
			c || ((c = /* @__PURE__ */ new Map()), this.rh.set(i, c), i.k(() => this.oh(i)));
			let u = c.get(s);
			if (
				(u &&
					u.instanceBufferVersion !== h.ah &&
					(u.vao && (o.deleteVertexArray(u.vao), this.nh === u.vao && (this.nh = null)),
					c.delete(s),
					(u = void 0)),
				u)
			)
				this.nh !== u.vao && (o.bindVertexArray(u.vao), (this.nh = u.vao));
			else {
				const t = o.createVertexArray();
				((u = { vao: t, instanceBufferVersion: h.ah }),
					c.set(s, u),
					o.bindVertexArray(t),
					(this.nh = t),
					o.bindBuffer(o.ARRAY_BUFFER, r),
					n && o.bindBuffer(o.ELEMENT_ARRAY_BUFFER, n));
				const l = o.getAttribLocation(a, 'A8');
				-1 !== l && mt(o, l, e.qn.Jn.size, e.Zn, e.qn.Jn.offset, 0, o.FLOAT, !1);
				const f = o.getAttribLocation(a, 'Ab');
				(-1 !== f && mt(o, f, e.qn.th.size, e.Zn, e.qn.th.offset, 0, o.FLOAT, !1), h.uh(i));
			}
		}
		oh(t) {
			const i = this.rh.get(t);
			if (i) {
				for (const [, t] of i) t.vao && this.Ee.deleteVertexArray(t.vao);
				this.rh.delete(t);
			}
		}
		fh() {
			null !== this.nh && (this.Ee.bindVertexArray(null), (this.nh = null));
		}
		L() {
			for (const [, t] of this.rh) for (const [, i] of t) i.vao && this.Ee.deleteVertexArray(i.vao);
			this.rh.clear();
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
			Aa: ti(2, 8),
			A6: ti(3, 16),
			A4: ti(4, 28),
			A0: ti(4, 44),
			A5: ti(4, 60),
			Ac: ti(3, 76),
			A9: ti(3, 88),
			A2: ti(4, 100),
			A3: ti(4, 116),
			A1: ti(3, 132),
		};
	},
	si = class {
		dh;
		_h;
		ph;
		mh = 0;
		gh = 0;
		constructor(t = 1e3, i = 1.5) {
			((this._h = t), (this.ph = i));
			const s = t * Jt.FLOATS_PER_INSTANCE;
			this.dh = new Float32Array(s);
		}
		yh(t) {
			if (t <= this._h) return;
			const i = Math.ceil(t * this.ph),
				s = this._h;
			this._h = i;
			const e = new Float32Array(i * Jt.FLOATS_PER_INSTANCE),
				r = s * Jt.FLOATS_PER_INSTANCE;
			(e.set(this.dh.subarray(0, Math.min(r, this.mh))), (this.dh = e));
		}
		wh(t) {
			((this.mh += t), this.gh++);
		}
		bh() {
			((this.mh = 0), (this.gh = 0));
		}
		Mh(t = 0, i) {
			return this.dh.subarray(t, i ?? this.mh);
		}
	};
function ei(t, i) {
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
		dh;
		constructor(t) {
			this.dh = t;
		}
		Ah(t) {
			this.dh.gh >= this.dh._h && this.dh.yh(this.dh.gh + 1);
			const i = this.dh.dh,
				s = this.dh.mh;
			((i[s + 0] = t.x),
				(i[s + 1] = t.y),
				(i[s + 2] = t.width),
				(i[s + 3] = t.height),
				(i[s + 4] = t.char0),
				(i[s + 5] = t.char1),
				(i[s + 6] = t.char2),
				(i[s + 7] = t.r1),
				(i[s + 8] = t.g1),
				(i[s + 9] = t.b1),
				(i[s + 10] = t.a1),
				(i[s + 11] = t.r2),
				(i[s + 12] = t.g2),
				(i[s + 13] = t.b2),
				(i[s + 14] = t.a2),
				(i[s + 15] = t.invert),
				(i[s + 16] = t.flipX),
				(i[s + 17] = t.flipY),
				(i[s + 18] = t.charRot),
				(i[s + 19] = t.translationX),
				(i[s + 20] = t.translationY),
				(i[s + 21] = t.translationZ),
				(i[s + 22] = t.rotationX),
				(i[s + 23] = t.rotationY),
				(i[s + 24] = t.rotationZ));
			const e = t.curveParams0,
				r = t.curveParams1;
			return (
				(i[s + 25] = e[0]),
				(i[s + 26] = e[1]),
				(i[s + 27] = e[2]),
				(i[s + 28] = e[3]),
				(i[s + 29] = r[0]),
				(i[s + 30] = r[1]),
				(i[s + 31] = r[2]),
				(i[s + 32] = r[3]),
				(i[s + 33] = t.depth),
				(i[s + 34] = t.baseZ),
				(i[s + 35] = t.geometryType),
				this.dh.wh(Jt.FLOATS_PER_INSTANCE),
				this.dh.gh - 1
			);
		}
	},
	ni = class {
		Ee;
		Ch = null;
		xh = 0;
		Sh = /* @__PURE__ */ new WeakMap();
		In = 0;
		constructor(t, i = 1e3) {
			((this.Ee = t), this.Eh(i));
		}
		Eh(t) {
			const i = this.Ee;
			(this.Ch && i.deleteBuffer(this.Ch), this.In++, (this.Ch = i.createBuffer()));
			const s = t * Jt.BYTES_PER_INSTANCE;
			(vt(i, i.ARRAY_BUFFER, this.Ch, s, i.DYNAMIC_DRAW), (this.xh = t));
		}
		Fh(t) {
			this.Eh(t);
		}
		K(t, i) {
			if (0 === i) return;
			const s = this.Ee;
			(s.bindBuffer(s.ARRAY_BUFFER, this.Ch), s.bufferSubData(s.ARRAY_BUFFER, 0, t, 0, i));
		}
		get ah() {
			return this.In;
		}
		Th(t) {
			let i = this.Sh.get(t);
			if (!i) {
				i = /* @__PURE__ */ new Map();
				const s = this.Ee;
				for (const e in ii.ATTRIBUTES) {
					const r = e,
						n = s.getAttribLocation(t, r);
					-1 !== n && i.set(r, n);
				}
				this.Sh.set(t, i);
			}
			return i;
		}
		uh(t) {
			const i = this.Ee,
				s = t.program,
				e = this.Th(s);
			i.bindBuffer(i.ARRAY_BUFFER, this.Ch);
			for (const [r, n] of e) {
				const t = ii.ATTRIBUTES[r];
				t && mt(i, n, t.size, t.stride, t.offset, t.divisor);
			}
		}
		L() {
			this.Ch && (this.Ee.deleteBuffer(this.Ch), (this.Ch = null));
		}
	},
	hi = class {
		Ee;
		dh;
		Ph;
		Lh;
		constructor(t, i = 1e3, s = 1.5) {
			((this.Ee = t), (this.dh = new si(i, s)), (this.Ph = new ri(this.dh)), (this.Lh = new ni(t, i)));
		}
		Dh() {
			this.dh._h > this.Lh.xh && this.Lh.Fh(this.dh._h);
		}
		get writer() {
			return this.Ph;
		}
		get kh() {
			return this.Lh;
		}
		Rh() {
			this.dh.bh();
		}
		Bh(t, i) {
			if (0 === i) return;
			const s = i * Jt.FLOATS_PER_INSTANCE;
			this.dh.yh(this.dh.gh + i);
			const e = this.dh.dh,
				r = this.dh.mh;
			for (let n = 0; n < s; n++) e[r + n] = t[n];
			((this.dh.mh += s), (this.dh.gh += i));
		}
		Ih() {
			0 !== this.dh.gh && (this.Dh(), this.Lh.K(this.dh.dh, this.dh.mh));
		}
		eh(t, i) {
			const s = this.dh.gh;
			0 !== s && this.Ee.drawArraysInstanced(t, 0, i, s);
		}
		Oh(t, i, s, e = 0) {
			const r = this.dh.gh;
			0 !== r && this.Ee.drawElementsInstanced(t, i, s, e, r);
		}
		L() {
			this.Lh.L();
		}
	},
	oi = class {
		Ee;
		Nh;
		Qh;
		zh;
		Hh = null;
		Gh = null;
		jh = [0, 0, 0, 0];
		Vh = [0, 0, 0, 0];
		Xh;
		constructor(t, i, s, e) {
			((this.Ee = t), (this.Nh = i), (this.Qh = s), (this.zh = e), (this.Xh = ei(this.jh, this.Vh)));
			const r = this.Ee.createBuffer();
			if ((vt(this.Ee, this.Ee.ARRAY_BUFFER, r, this.zh.$h, this.Ee.STATIC_DRAW), (this.Hh = r), this.zh.Yh)) {
				const t = this.Ee.createBuffer();
				(vt(this.Ee, this.Ee.ELEMENT_ARRAY_BUFFER, t, this.zh.Yh, this.Ee.STATIC_DRAW), (this.Gh = t));
			}
		}
		get type() {
			return this.Qh;
		}
		get unitGeometry() {
			return this.zh;
		}
		get unitBuffer() {
			return this.Hh;
		}
		get unitIndexBuffer() {
			return this.Gh;
		}
		get batch() {
			return this.Nh;
		}
		Kh() {
			this.Nh.Rh();
		}
		Wh() {
			return 0 !== this.Nh.dh.gh;
		}
		L() {
			(this.Nh.L(), this.Ee.deleteBuffer(this.Hh), this.Gh && this.Ee.deleteBuffer(this.Gh));
		}
		Ah(t, i, s, e, r, n, h) {
			const o = r.ur ?? 0,
				a = r.lr ?? 0,
				c = r.dr ?? 0,
				u = r._r ?? 0,
				l = r.pr ?? 0,
				f = h ?? r.mr ?? 0,
				d = r.vr ?? 1,
				_ = r.gr ?? 1,
				p = r.yr ?? 1,
				m = this.jh,
				v = this.Vh;
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
			const g = this.Xh;
			return (
				(g.x = t * d),
				(g.y = i * _),
				(g.width = s * d),
				(g.height = e * _),
				(g.char0 = r.gn[0]),
				(g.char1 = r.gn[1]),
				(g.char2 = r.gn[2]),
				(g.r1 = r.wn[0]),
				(g.g1 = r.wn[1]),
				(g.b1 = r.wn[2]),
				(g.a1 = r.wn[3]),
				(g.r2 = r.bn[0]),
				(g.g2 = r.bn[1]),
				(g.b2 = r.bn[2]),
				(g.a2 = r.bn[3]),
				(g.invert = r.dn ? 1 : 0),
				(g.flipX = r.mn ? 1 : 0),
				(g.flipY = r.vn ? 1 : 0),
				(g.charRot = r._n),
				(g.translationX = o),
				(g.translationY = a),
				(g.translationZ = c),
				(g.rotationX = u),
				(g.rotationY = l),
				(g.rotationZ = f),
				(g.depth = (n?.depth ?? 0) * p),
				(g.baseZ = (n?.baseZ ?? 0) * p),
				(g.geometryType = Xt[this.Qh] ?? 0),
				this.Nh.writer.Ah(g)
			);
		}
	},
	ai = { $h: $t, Zh: 6, ...Yt },
	ci = class extends oi {
		constructor(t, i) {
			super(t, i, Vt.RECTANGLE, ai);
		}
		qh(t, i) {
			return this.Ah(0, 0, t.width, t.height, i);
		}
	},
	ui = {
		$h: new Float32Array([0, -0.5, 0, 0, 1, -0.5, 1, 0, 0, 0.5, 0, 1, 0, 0.5, 0, 1, 1, -0.5, 1, 0, 1, 0.5, 1, 1]),
		Zh: 6,
		...Yt,
	},
	li = class extends oi {
		constructor(t, i) {
			super(t, i, Vt.LINE, ui);
		}
		qh(t, i) {
			const s = t.x2 - t.x1,
				e = t.y2 - t.y1,
				r = Math.hypot(s, e),
				n = Math.atan2(e, s),
				h = i.pn || 1,
				o = Math.cos(-n),
				a = Math.sin(-n),
				c = t.x1 * o - t.y1 * a,
				u = t.x1 * a + t.y1 * o;
			return this.Ah(c, u, r, h, i, null, (i.mr || 0) + n);
		}
	},
	fi = {
		$h: (function (t = 32) {
			const i = [],
				s = (2 * Math.PI) / t;
			for (let e = 0; e < t; e++) {
				const r = e * s,
					n = ((e + 1) % t) * s,
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
		Zh: 96,
		...Yt,
	},
	di = class extends oi {
		constructor(t, i) {
			super(t, i, Vt.ELLIPSE, fi);
		}
		qh(t, i) {
			return this.Ah(0, 0, t.width, t.height, i);
		}
	},
	_i = {
		$h: (function () {
			const t = [];
			for (let i = 0; i < 32; i++) {
				const s = i / 32,
					e = (i + 1) / 32;
				t.push(s, 0, s, 0, s, 1, s, 1, e, 1, e, 1);
			}
			return new Float32Array(t);
		})(),
		Zh: 96,
		...Yt,
	},
	pi = class extends oi {
		constructor(t, i) {
			super(t, i, Vt.ARC, _i);
		}
		qh(t, i) {
			const s = O(t.start),
				e = O(t.stop);
			return this.Ah(0, 0, t.width, t.height, i, { arcStart: s, arcStop: e });
		}
	},
	mi = {
		$h: (function (t = 16) {
			const i = [];
			for (let s = 0; s < t; s++) {
				const e = s / t,
					r = (s + 1) / t;
				i.push(e, -0.5, e, 0, r, -0.5, r, 0, e, 0.5, e, 1, e, 0.5, e, 1, r, -0.5, r, 0, r, 0.5, r, 1);
			}
			return new Float32Array(i);
		})(16),
		Zh: 96,
		...Yt,
	},
	vi = class extends oi {
		constructor(t, i) {
			super(t, i, Vt.BEZIER_CURVE, mi);
		}
		qh(t, i) {
			return this.Ah(0, 0, 1, i.pn || 1, i, {
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
		constructor(t, i, s, e) {
			super(
				t,
				i,
				s,
				(function (t, i) {
					const s = t === Vt.TORUS ? Wt : Kt;
					return {
						$h: i.vertices,
						Yh: i.indices,
						Zh: i.vertices.length / (s.Zn / 4),
						Jh: i.indices.length,
						...s,
					};
				})(s, e)
			);
		}
		qh(t, i) {
			return this.Ah(0, 0, t.width, t.height, i, { depth: t.depth });
		}
	},
	yi = { $h: /* @__PURE__ */ new Float32Array(0), Zh: 0, ...Yt },
	wi = class {
		Ee;
		dh;
		Nh;
		zh = { ...yi };
		io = [0, 0, 0, 0];
		so = [0, 0, 0, 0];
		eo;
		ro = 1;
		no = 0;
		constructor(t) {
			((this.Ee = t), (this.dh = t.createBuffer()), (this.Nh = new hi(t, 1)), (this.eo = ei(this.io, this.so)));
		}
		eh(t, i, s, e, r) {
			0 !== s &&
				(this.ho(i, s),
				this.Ah(e),
				this.Nh.Ih(),
				r.hh({
					shader: t,
					geometryKey: `custom_shape:${this.ro}`,
					unit: this.zh,
					geometryBuffer: this.dh,
					instanceAttributes: this.Nh.kh,
				}),
				this.Nh.eh(this.Ee.TRIANGLES, s),
				this.Nh.Rh());
		}
		L() {
			(this.Nh.L(), this.Ee.deleteBuffer(this.dh));
		}
		ho(t, i) {
			const s = 4 * i;
			(s > this.no && ((this.no = s), this.ro++),
				(this.zh.Zh = i),
				this.Ee.bindBuffer(this.Ee.ARRAY_BUFFER, this.dh),
				this.Ee.bufferData(this.Ee.ARRAY_BUFFER, t.subarray(0, s), this.Ee.DYNAMIC_DRAW));
		}
		Ah(t) {
			this.Nh.Rh();
			const i = this.eo;
			((i.x = 0),
				(i.y = 0),
				(i.width = t.vr ?? 1),
				(i.height = t.gr ?? 1),
				(i.char0 = t.gn[0]),
				(i.char1 = t.gn[1]),
				(i.char2 = t.gn[2]),
				(i.r1 = t.wn[0]),
				(i.g1 = t.wn[1]),
				(i.b1 = t.wn[2]),
				(i.a1 = t.wn[3]),
				(i.r2 = t.bn[0]),
				(i.g2 = t.bn[1]),
				(i.b2 = t.bn[2]),
				(i.a2 = t.bn[3]),
				(i.invert = t.dn ? 1 : 0),
				(i.flipX = t.mn ? 1 : 0),
				(i.flipY = t.vn ? 1 : 0),
				(i.charRot = t._n),
				(i.translationX = t.ur ?? 0),
				(i.translationY = t.lr ?? 0),
				(i.translationZ = t.dr ?? 0),
				(i.rotationX = t._r ?? 0),
				(i.rotationY = t.pr ?? 0),
				(i.rotationZ = t.mr ?? 0),
				(i.depth = t.yr ?? 1),
				(i.baseZ = 0),
				(i.geometryType = 10),
				this.Nh.writer.Ah(i));
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
		const s = [],
			e = [];
		for (let n = 0; n <= t; n++) {
			const e = n / t,
				r = e * Math.PI,
				h = Math.sin(r),
				o = Math.cos(r);
			for (let t = 0; t <= i; t++) {
				const r = t / i,
					n = r * Math.PI * 2,
					a = Math.sin(n),
					c = Math.cos(n) * h * 0.5,
					u = 0.5 * o,
					l = a * h * 0.5;
				s.push(c, u, l, r, e);
			}
		}
		const r = i + 1;
		for (let n = 0; n < t; n++)
			for (let t = 0; t < i; t++) {
				const i = n * r + t,
					s = i + r;
				e.push(i, s, i + 1, i + 1, s, s + 1);
			}
		return { vertices: new Float32Array(s), indices: new Uint16Array(e) };
	})(14, 20),
	Ai = (function (t = 16, i = 12) {
		const s = [],
			e = [];
		for (let n = 0; n <= t; n++) {
			const e = (n / t) * Math.PI * 2,
				r = Math.cos(e),
				h = Math.sin(e);
			for (let o = 0; o <= i; o++) {
				const e = (o / i) * Math.PI * 2,
					a = Math.cos(e),
					c = Math.sin(e);
				s.push(r, h, a, c, n / t, o / i);
			}
		}
		const r = i + 1;
		for (let n = 0; n < t; n++)
			for (let t = 0; t < i; t++) {
				const i = n * r + t,
					s = (n + 1) * r + t;
				e.push(i, s, i + 1, i + 1, s, s + 1);
			}
		return { vertices: new Float32Array(s), indices: new Uint16Array(e) };
	})(20, 16),
	Ci = (function (t = 20) {
		const i = [],
			s = [];
		for (let e = 0; e < t; e++) {
			const r = e / t,
				n = (e + 1) / t,
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
				s.push(a, a + 1, a + 2, a + 3, a + 2, a + 1));
		}
		return { vertices: new Float32Array(i), indices: new Uint16Array(s) };
	})(24),
	xi = (function (t = 24) {
		const i = [],
			s = [];
		for (let e = 0; e < t; e++) {
			const r = e / t,
				n = (e + 1) / t,
				h = r * Math.PI * 2,
				o = n * Math.PI * 2,
				a = 0.5 * Math.cos(h),
				c = 0.5 * Math.sin(h),
				u = 0.5 * Math.cos(o),
				l = 0.5 * Math.sin(o),
				f = i.length / 5;
			(i.push(a, 0.5, c, r, 1, a, -0.5, c, r, 0, u, 0.5, l, n, 1, u, -0.5, l, n, 0),
				s.push(f, f + 1, f + 2, f + 2, f + 1, f + 3));
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
				s.push(d, d + 1, d + 2, d + 3, d + 4, d + 5));
		}
		return { vertices: new Float32Array(i), indices: new Uint16Array(s) };
	})(24),
	Si = {
		[Vt.RECTANGLE]: (t, i) => new ci(t, i),
		[Vt.LINE]: (t, i) => new li(t, i),
		[Vt.ELLIPSE]: (t, i) => new di(t, i),
		[Vt.ARC]: (t, i) => new pi(t, i),
		[Vt.BEZIER_CURVE]: (t, i) => new vi(t, i),
		[Vt.BOX]: (t, i) => new gi(t, i, Vt.BOX, bi),
		[Vt.SPHERE]: (t, i) => new gi(t, i, Vt.SPHERE, Mi),
		[Vt.TORUS]: (t, i) => new gi(t, i, Vt.TORUS, Ai),
		[Vt.CONE]: (t, i) => new gi(t, i, Vt.CONE, Ci),
		[Vt.CYLINDER]: (t, i) => new gi(t, i, Vt.CYLINDER, xi),
		[Vt.ELLIPSOID]: (t, i) => new gi(t, i, Vt.ELLIPSOID, Mi),
	},
	Ei = class {
		Ee;
		oo;
		ao;
		co;
		uo = null;
		lo = /* @__PURE__ */ new Map();
		fo = null;
		do = '';
		_o = Z();
		po = Z();
		mo = [0, 0, 0];
		vo = [0, 0, 0];
		yo = [0, 1, 0];
		constructor(t) {
			((this.Ee = t), (this.ao = new qt(t)), (this.co = new wi(t)), (this.oo = /* @__PURE__ */ new Map()));
			for (const i of Object.values(Vt)) {
				const s = new hi(t),
					e = (0, Si[i])(t, s);
				this.oo.set(i, e);
			}
		}
		wo(t) {
			((this.uo = null), this.lo.clear(), (this.fo = null), (this.do = ''));
			let i = null,
				s = null,
				e = null,
				r = !1,
				n = -1,
				h = -1,
				o = -1,
				a = null;
			for (const c of t) {
				if ('custom_shape' === c.type) {
					(e && e.Wh() && this.bo(e, i, s, a),
						(i = null),
						(s = null),
						(e = null),
						(r = !1),
						(n = -1),
						(h = -1),
						(o = -1),
						(a = null),
						this.Mo(c));
					continue;
				}
				const t = 'glyph_run' === c.type ? Vt.RECTANGLE : c.type;
				((i === c.material &&
					s === t &&
					r === c.state.ps &&
					n === c.state.Nr &&
					h === c.state.Qr &&
					o === c.state.Wr) ||
					(e && e.Wh() && this.bo(e, i, s, a),
					(i = c.material),
					(s = t),
					(e = this.oo.get(s)),
					(r = c.state.ps),
					(n = c.state.Nr),
					(h = c.state.Qr),
					(o = c.state.Wr),
					(a = c.state),
					e.Kh()),
					'glyph_run' === c.type
						? e.batch.Bh(c.params.data, c.params.instanceCount)
						: e.qh(c.params, c.state));
			}
			(e && e.Wh() && this.bo(e, i, s, a), this.ao.fh());
		}
		Mo(t) {
			(this.Ao(t.material, t.state),
				this.co.eh(t.material.shader, t.params.vertices, t.params.vertexCount, t.state, this.ao));
		}
		bo(t, i, s, e) {
			this.Ao(i, e);
			const r = t.unitGeometry,
				n = t.unitBuffer,
				h = r.Co ?? this.Ee.TRIANGLES;
			try {
				(t.batch.Ih(),
					this.ao.hh({
						shader: i.shader,
						geometryKey: String(s),
						unit: r,
						geometryBuffer: n,
						indexBuffer: t.unitIndexBuffer,
						instanceAttributes: t.batch.kh,
					}),
					r.Yh && r.Jh
						? t.batch.Oh(h, r.Jh, r.xo ?? this.Ee.UNSIGNED_SHORT, r.So ?? 0)
						: t.batch.eh(h, r.Zh));
			} finally {
				t.Kh();
			}
		}
		Ao(t, i) {
			(this.uo !== t.shader && (t.shader.nr(), (this.uo = t.shader)),
				this.fo !== t && (t.shader.oe(t.uniforms), (this.fo = t)));
			const s = Ct(this.Ee),
				e = `${i.Nr}:${i.Qr}:${i.Wr}:${s[2]}:${s[3]}`;
			if (this.lo.get(t.shader) === e) return;
			const r = `${i.Nr}:${i.Qr}:${s[2]}:${s[3]}`;
			(this.do !== r && (this.Eo(i, s[2], s[3]), (this.do = r)),
				t.shader.oe({
					u_aspectRatio: s[2] / s[3],
					UI: this._o,
					Uk: this.po,
					u_tmUseLighting: i.Kr || i.Vr > 0 || 0 !== i.jr[0] || 0 !== i.jr[1] || 0 !== i.jr[2],
					u_tmAmbientLightColor: i.jr,
					u_tmPointLightCount: i.Vr,
					u_tmPointLightPositions: i.Xr,
					u_tmPointLightColors: i.$r,
					u_tmLightFalloff: i.Yr,
				}),
				this.lo.set(t.shader, e));
		}
		Eo(t, i, s) {
			const e = Math.max(1, s),
				r = Math.max(1 / 4096, i / e),
				n = t.ds,
				h = t._s;
			if (
				((this.vo[0] = t.$i),
				(this.vo[1] = t.Ki),
				(this.vo[2] = t.Wi),
				(this.yo[0] = t.Zi),
				(this.yo[1] = t.qi),
				(this.yo[2] = t.Ji),
				t.ts)
			) {
				const i = (0.5 * e) / Math.tan(0.5 * t.ss);
				((this.mo[0] = this.vo[0]),
					(this.mo[1] = this.vo[1]),
					(this.mo[2] = this.vo[2] + i),
					q(this.mo, this.vo, this.yo, this._o));
			} else
				((this.mo[0] = t.es), (this.mo[1] = t.rs), (this.mo[2] = t.ns), q(this.mo, this.vo, this.yo, this._o));
			if (t.ps) {
				const t = 0.5 * i,
					s = 0.5 * e;
				return void (function (t, i, s, e, r, n, h = /* @__PURE__ */ new Float32Array(16)) {
					const o = 1 / (t - i),
						a = 1 / (s - e),
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
						(h[13] = (e + s) * a),
						(h[14] = (n + r) * c),
						(h[15] = 1));
				})(-t, t, -s, s, n, h, this.po);
			}
			!(function (t, i, s, e, r = /* @__PURE__ */ new Float32Array(16)) {
				const n = 1 / Math.tan(0.5 * t),
					h = 1 / (s - e);
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
					(r[10] = (e + s) * h),
					(r[11] = -1),
					(r[12] = 0),
					(r[13] = 0),
					(r[14] = 2 * e * s * h),
					(r[15] = 0));
			})(t.ss, r, n, h, this.po);
		}
		L() {
			for (const t of this.oo.values()) t.L();
			(this.oo.clear(), this.co.L(), this.ao.L());
		}
	},
	Fi =
		'vec3 rotateAroundX(vec3 A,float B){float C=cos(B);float D=sin(B);return vec3(A.x,A.y*C-A.z*D,A.y*D+A.z*C);}vec3 rotateAroundY(vec3 A,float B){float C=cos(B);float D=sin(B);return vec3(A.x*C+A.z*D,A.y,-A.x*D+A.z*C);}vec3 rotateAroundZ(vec3 A,float B){float C=cos(B);float D=sin(B);return vec3(A.x*C-A.y*D,A.x*D+A.y*C,A.z);}vec3 applyRotation(vec3 A,vec3 E){vec3 F=A;if(E.z!=0.0f){F=rotateAroundZ(F,E.z);}if(E.y!=0.0f){F=rotateAroundY(F,E.y);}if(E.x!=0.0f){F=rotateAroundX(F,E.x);}return F;}',
	Ui =
		'#version 300 es\nin vec4 A8;in vec2 Ab;in vec2 A7;in vec2 Aa;in vec3 A6;in vec4 A4;in vec4 A0;in vec4 A5;in vec3 Ac;in vec3 A9;in vec4 A2;in vec4 A3;in vec3 A1;uniform mat4 UI;uniform mat4 Uk;out vec2 v_uv;out vec2 v_textureUv;out vec3 v_glyphIndex;out vec4 v_glyphColor;out vec4 v_cellColor;out vec4 v_glyphFlags;out vec3 v_worldPosition;out vec3 v_normal;out float v_geometryType;const float A=6.28318530718f;const int B=2;const int C=3;const int D=4;const int E=5;const int F=6;const int G=7;const int H=8;const int I=9;const int J=10;\n' +
		Fi +
		'\nvec2 K(float L,vec2 M,vec2 N,vec2 O,vec2 P){float Q=1.0f-L;float R=Q*Q;float S=R*Q;float T=L*L;float U=T*L;return S*M+3.0f*R*L*N+3.0f*Q*T*O+U*P;}vec2 V(float L,vec2 M,vec2 N,vec2 O,vec2 P){float Q=1.0f-L;float R=Q*Q;float T=L*L;return-3.0f*R*M+3.0f*(R-2.0f*Q*L)*N+3.0f*(2.0f*Q*L-T)*O+3.0f*T*P;}void main(){vec2 W=Ab;vec2 X=Ab;v_glyphIndex=A6;v_glyphColor=A4;v_cellColor=A0;v_glyphFlags=A5;vec4 Y=A2;vec4 Z=A3;vec2 a=Aa;vec2 b=A7;float c=A1.x;float d=A1.y;int e=int(A1.z);vec3 f=vec3(0.0f);if(e==D){float L=clamp(A8.x,0.0f,1.0f);vec2 M=Z.xy;vec2 N=Y.xy;vec2 O=Y.zw;vec2 P=Z.zw;vec2 g=K(L,M,N,O,P);vec2 h=V(L,M,N,O,P);float i=length(h);vec2 j=i>0.0f?h/i:vec2(1.0f,0.0f);vec2 k=vec2(-j.y,j.x);vec2 l=g+k*A8.y*a.y;f=vec3(l,d);}else if(e==C){float m=mod(Y.x,A);if(m<0.0f){m+=A;}float n=mod(Y.y,A);if(n<0.0f){n+=A;}float o=m-n;if(o<=0.0f){o+=A;}float p=m-A8.x*o;vec2 q=vec2(cos(p),sin(p))*A8.y;vec2 l=q*a+b;f=vec3(l,d);}else if(e==B){vec2 l=A8.xy*a+b;f=vec3(l,d);}else if(e==J){vec2 l=A8.xy*a+b;f=vec3(l,Ab.x*c+d);}else if(e==G){float r=max(0.0f,a.x*0.5f);float s=max(0.0f,c*0.5f);float t=max(0.0f,a.y*0.5f);float u=max(0.0f,r-t);float v=max(0.0f,s-t);float w=A8.x;float x=A8.y;float y=A8.z;float z=A8.w;W=vec2(y,z);float AA=u+t*y;float AB=v+t*y;f=vec3(AA*w+b.x,t*z+b.y,AB*x+d);}else if(e==E||e==F||e==H||e==I){vec3 AC=A8.xyz;W=vec2(AC.z,0.0f);f=vec3(A8.x*a.x+b.x,A8.y*a.y+b.y,A8.z*c+d);}vec3 AD=applyRotation(f,A9);vec3 AE=AD+Ac;vec3 AF=vec3(0.0f,0.0f,1.0f);v_uv=W;v_textureUv=X;v_worldPosition=AE;v_normal=AF;v_geometryType=float(e);vec4 AG=Uk*UI*vec4(AE,1.0f);AG.y=-AG.y;gl_Position=AG;}',
	Ti =
		'#version 300 es\nin vec2 A8;in vec2 Ab;in vec2 A7;in vec2 Aa;in vec3 A6;in vec4 A4;in vec4 A0;in vec4 A5;in vec3 Ac;in vec3 A9;in vec3 A1;uniform mat4 UI;uniform mat4 Uk;out vec2 v_uv;out vec2 v_textureUv;out vec3 v_glyphIndex;out vec4 v_glyphColor;out vec4 v_cellColor;out vec4 v_glyphFlags;out vec3 v_worldPosition;out vec3 v_normal;out float v_geometryType;const float A=2.0f;\n' +
		Fi +
		'\nvoid main(){v_uv=Ab;v_textureUv=Ab;v_glyphIndex=A6;v_glyphColor=A4;v_cellColor=A0;v_glyphFlags=A5;vec2 B=A8.xy*Aa+A7;float C=A1.y;vec3 D=vec3(B,C);vec3 E=applyRotation(D,A9)+Ac;v_worldPosition=E;v_normal=vec3(0.0f,0.0f,1.0f);v_geometryType=A;vec4 F=Uk*UI*vec4(E,1.0f);F.y=-F.y;gl_Position=F;}',
	Pi =
		'uniform bool u_tmUseLighting;uniform vec3 u_tmAmbientLightColor;uniform int u_tmPointLightCount;uniform vec3 u_tmPointLightPositions[5];uniform vec3 u_tmPointLightColors[5];uniform vec3 u_tmLightFalloff;const int TM_MAX_POINT_LIGHTS=5;vec3 tmComputeGeometricNormal(vec3 A){vec3 B=cross(dFdy(A),dFdx(A));float C=length(B);if(C<=0.000001f){return vec3(0.0f,0.0f,1.0f);}return B/C;}vec3 tmApplyLighting(vec3 D,vec3 A){if(!u_tmUseLighting){return D;}vec3 E=D*u_tmAmbientLightColor;if(u_tmPointLightCount>0){vec3 B=tmComputeGeometricNormal(A);for(int F=0;F<TM_MAX_POINT_LIGHTS;F++){if(F>=u_tmPointLightCount){break;}vec3 G=u_tmPointLightPositions[F]-A;float H=length(G);vec3 I=H>0.000001f?G/H:B;float J=max(dot(B,I),0.0f);float K=u_tmLightFalloff.x+H*u_tmLightFalloff.y+H*H*u_tmLightFalloff.z;float L=K>0.0f?1.0f/K:1.0f;E+=D*u_tmPointLightColors[F]*(J*L);}}return clamp(E,0.0f,1.0f);}',
	Li =
		'#version 300 es\nprecision highp float;in vec3 v_glyphIndex;in vec4 v_glyphColor;in vec4 v_cellColor;in vec4 v_glyphFlags;in vec3 v_worldPosition;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_statePayload;\n' +
		Pi +
		'\nvoid main(){int A=int(v_glyphFlags.r>0.5?1:0);int B=int(v_glyphFlags.g>0.5?1:0);int C=int(v_glyphFlags.b>0.5?1:0);float D=float(A|(B<<1)|(C<<2))/255.;o_character=vec4(v_glyphIndex.xy,D,clamp(v_glyphFlags.a,0.,1.));vec3 E=tmApplyLighting(v_glyphColor.rgb,v_worldPosition);vec3 F=tmApplyLighting(v_cellColor.rgb,v_worldPosition);o_primaryColor=vec4(E,v_glyphColor.a);o_secondaryColor=vec4(F,v_cellColor.a);o_statePayload=vec4(0.);}',
	Di =
		'#version 300 es\nprecision highp float;in vec2 v_textureUv;in vec3 v_worldPosition;uniform sampler2D Ut;uniform bool UG;uniform bool UE;uniform bool UF;uniform float UD;uniform float Uv;uniform float Uu;uniform bool Uz;uniform vec4 Uy;uniform bool Ux;uniform vec4 Uw;uniform int UA;uniform sampler2D UB;uniform ivec2 UC;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_statePayload;\n' +
		Pi +
		'\nfloat A(vec3 B){return dot(B,vec3(0.299f,0.587f,0.114f));}vec3 C(int D){int E=max(UC.x,1);int F=D/E;int G=D%E;return texelFetch(UB,ivec2(G,F),0).rgb;}void main(){vec2 H=vec2(v_textureUv.x,1.0f-v_textureUv.y);vec4 I=texture(Ut,H);if(UG){I.rgb=vec3(1.0f)-I.rgb;}float J=A(I.rgb);if(I.a<0.01f||J<Uv||J>Uu){discard;}vec2 K=vec2(0.0f);if(UA>0){float L=float(UA);float M=clamp(J*(L-1.0f),0.0f,L-1.0f);int N=int(floor(M+0.5f));K=C(N).xy;}vec4 O=Uz?Uy:I;vec4 P=Ux?Uw:I;vec3 Q=tmApplyLighting(O.rgb,v_worldPosition);vec3 R=tmApplyLighting(P.rgb,v_worldPosition);int S=int(UG?1:0);int T=int(UE?1:0);int U=int(UF?1:0);float V=float(S|(T<<1)|(U<<2))/255.0f;o_character=vec4(K,V,clamp(UD,0.0f,1.0f));o_primaryColor=vec4(Q,O.a);o_secondaryColor=vec4(R,P.a);o_statePayload=vec4(0.0f);}',
	ki =
		'#version 300 es\nprecision highp float;in vec2 v_textureUv;in vec3 v_worldPosition;uniform sampler2D Un;uniform sampler2D Uo;uniform sampler2D Up;uniform sampler2D Uq;uniform vec2 Ur;uniform bool Uc;uniform bool Ud;uniform bool Ue;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_statePayload;\n' +
		Pi +
		'\nvoid main(){vec2 A=vec2(v_textureUv.x,1.-v_textureUv.y);vec2 B=A*Ur;vec2 C=(floor(B)+0.5f)/Ur;vec4 D=texture(Un,C);vec4 E=Uc?texture(Uo,C):vec4(0.);if(Uc&&E.a==0.){discard;}vec4 F=Ud?texture(Up,C):vec4(0.);vec4 G=Ue?texture(Uq,C):vec4(0.);vec3 H=tmApplyLighting(E.rgb,v_worldPosition);vec3 I=tmApplyLighting(F.rgb,v_worldPosition);o_character=D;o_primaryColor=vec4(H,E.a);o_secondaryColor=vec4(I,F.a);o_statePayload=G;}',
	Ri = class {
		Fo = 0;
		he;
		To;
		Po;
		$e;
		Lo;
		constructor(t) {
			((this.he = new bt(t, Ui, Li)),
				(this.To = new bt(t, Ui, Di)),
				(this.Po = new bt(t, Ui, ki)),
				(this.$e = new bt(t, Ti, ki)),
				(this.Lo = { id: this.Fo++, shader: this.he, uniforms: Object.freeze({}), isBuiltIn: !0 }));
		}
		Ye(t, i = {}) {
			return { id: this.Fo++, shader: t, uniforms: Object.freeze({ ...i }), isBuiltIn: !1 };
		}
		Do(t) {
			return this.Ye(this.To, t);
		}
		ko(t) {
			return this.Ye(this.Po, t);
		}
		L() {
			(this.he.dispose(), this.To.dispose(), this.Po.dispose(), this.$e.dispose());
		}
	},
	Bi = class {
		Ro = [];
		Bo = 1;
		Io = 0;
		Oo(t, i) {
			if (this.Io >= this.Ro.length) {
				const s = { id: this.Bo++, type: t, params: {}, state: jt.$n(), material: i };
				this.Ro.push(s);
			}
			const s = this.Ro[this.Io];
			return ((s.id = this.Bo++), (s.type = t), (s.material = i), this.Io++, s);
		}
		No(t, i) {
			if (t.data && t.data.length >= i) return;
			let s = Math.max(Jt.FLOATS_PER_INSTANCE, t.data?.length ?? 0);
			for (; s < i;) s *= 2;
			t.data = new Float32Array(s);
		}
		Qo(t, i) {
			if (t.vertices && t.vertices.length >= i) return;
			let s = Math.max(24, t.vertices?.length ?? 0);
			for (; s < i;) s *= 2;
			t.vertices = new Float32Array(s);
		}
		zo(t, i, s, e) {
			const r = this.Oo(Vt.RECTANGLE, e),
				n = r.params;
			return ((n.width = t), (n.height = i), s.Yn(r.state), r.id);
		}
		Ho(t, i, s, e, r, n) {
			const h = this.Oo(Vt.LINE, n),
				o = h.params;
			return ((o.x1 = t), (o.y1 = i), (o.x2 = s), (o.y2 = e), r.Yn(h.state), h.id);
		}
		Go(t, i, s, e) {
			const r = this.Oo(Vt.ELLIPSE, e),
				n = r.params;
			return ((n.width = t), (n.height = i), s.Yn(r.state), r.id);
		}
		jo(t, i, s, e, r, n) {
			const h = this.Oo(Vt.ARC, n),
				o = h.params;
			return ((o.width = t), (o.height = i), (o.start = s), (o.stop = e), r.Yn(h.state), h.id);
		}
		Vo(t, i, s, e, r, n, h, o, a, c) {
			const u = this.Oo(Vt.BEZIER_CURVE, c),
				l = u.params;
			return (
				(l.x1 = t),
				(l.y1 = i),
				(l.cp1x = s),
				(l.cp1y = e),
				(l.cp2x = r),
				(l.cp2y = n),
				(l.x2 = h),
				(l.y2 = o),
				a.Yn(u.state),
				u.id
			);
		}
		Xo(t, i, s, e, r, n) {
			const h = this.Oo(t, n),
				o = h.params;
			return ((o.width = i), (o.height = s), (o.depth = e), r.Yn(h.state), h.id);
		}
		$o(t, i, s, e) {
			const r = this.Oo('glyph_run', e),
				n = r.params,
				h = i * Jt.FLOATS_PER_INSTANCE;
			this.No(n, h);
			for (let o = 0; o < h; o++) n.data[o] = t[o];
			return ((n.instanceCount = i), s.Yn(r.state), r.id);
		}
		Yo(t, i, s, e) {
			if (0 === i) return 0;
			const r = this.Oo('custom_shape', e),
				n = r.params,
				h = 4 * i;
			this.Qo(n, h);
			for (let o = 0; o < h; o++) n.vertices[o] = t[o];
			return ((n.vertexCount = i), s.Yn(r.state), r.id);
		}
		Rh() {
			this.Io = 0;
		}
		[Symbol.iterator]() {
			let t = 0;
			const i = this.Io,
				s = this.Ro;
			return { next: () => (t < i ? { value: s[t++], done: !1 } : { value: void 0, done: !0 }) };
		}
	},
	Ii = class {
		Ee;
		Ko = /* @__PURE__ */ new Map();
		Wo = /* @__PURE__ */ new WeakMap();
		_h;
		Zo = 0;
		qo = 1;
		constructor(t, i = 64) {
			((this.Ee = t), (this._h = Math.max(1, i)));
		}
		resolve(t, i = null) {
			const s = this.Jo(),
				e = Math.min(s * s, 65535);
			if (t.length > e)
				throw new r('[textmode.js] Character palette exceeds the supported GPU texture capacity.', {
					requestedCharacters: t.length,
					maxCharacters: e,
					maxTextureSize: s,
				});
			const n = this.ta(t),
				h = `${i ? this.ia(i) : 'none'}:${t.length}:${this.sa(n)}`,
				o = this.Ko.get(h);
			if (o && this.ea(o.data, n)) return ((o.lastUsed = ++this.Zo), o);
			const a = this.K(t, n, h);
			return (this.Ko.set(h, a), this.ra(), a);
		}
		dispose() {
			for (const t of this.Ko.values()) this.Ee.deleteTexture(t.texture);
			this.Ko.clear();
		}
		get size() {
			return this.Ko.size;
		}
		K(t, i, s) {
			const e = Math.max(t.length, 1),
				n = this.Jo(),
				h = Math.min(n, Math.ceil(Math.sqrt(e))),
				o = Math.max(1, Math.ceil(e / h)),
				a = new Uint8Array(h * o * 4);
			a.set(i);
			const c = this.Ee.createTexture();
			if (!c) throw new r('[textmode.js] Failed to create character palette texture.');
			const u = this.Ee;
			return (
				u.bindTexture(u.TEXTURE_2D, c),
				u.texParameteri(u.TEXTURE_2D, u.TEXTURE_MIN_FILTER, u.NEAREST),
				u.texParameteri(u.TEXTURE_2D, u.TEXTURE_MAG_FILTER, u.NEAREST),
				u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_S, u.CLAMP_TO_EDGE),
				u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_T, u.CLAMP_TO_EDGE),
				u.pixelStorei(u.UNPACK_FLIP_Y_WEBGL, 0),
				u.texImage2D(u.TEXTURE_2D, 0, u.RGBA8, h, o, 0, u.RGBA, u.UNSIGNED_BYTE, a),
				u.bindTexture(u.TEXTURE_2D, null),
				{ texture: c, columns: h, rows: o, count: t.length, key: s, data: i, lastUsed: ++this.Zo }
			);
		}
		ta(t) {
			const i = new Uint8Array(4 * Math.max(t.length, 1));
			for (let s = 0; s < t.length; s++) {
				const e = t[s],
					r = 4 * s;
				((i[r] = this.na(e[0])), (i[r + 1] = this.na(e[1])), (i[r + 2] = this.na(e[2])), (i[r + 3] = 255));
			}
			return i;
		}
		na(t) {
			return Math.max(0, Math.min(255, Math.round(255 * t)));
		}
		Jo() {
			return Math.max(1, Number(this.Ee.getParameter(this.Ee.MAX_TEXTURE_SIZE)) || 4096);
		}
		sa(t) {
			let i = 2166136261;
			for (let s = 0; s < t.length; s++) ((i ^= t[s]), (i = Math.imul(i, 16777619)));
			return (i >>> 0).toString(16);
		}
		ea(t, i) {
			if (t.length !== i.length) return !1;
			for (let s = 0; s < t.length; s++) if (t[s] !== i[s]) return !1;
			return !0;
		}
		ia(t) {
			const i = t;
			return String(i.id ?? i.ha ?? this.oa(t));
		}
		oa(t) {
			const i = this.Wo.get(t);
			if (i) return i;
			const s = this.qo++;
			return (this.Wo.set(t, s), s);
		}
		ra() {
			for (; this.Ko.size > this._h;) {
				let t = null,
					i = 1 / 0;
				for (const [e, r] of this.Ko) r.lastUsed < i && ((i = r.lastUsed), (t = e));
				if (!t) return;
				const s = this.Ko.get(t);
				s && (this.Ee.deleteTexture(s.texture), this.Ko.delete(t));
			}
		}
	},
	Oi = class {
		j;
		aa = /* @__PURE__ */ new Map();
		ca = /* @__PURE__ */ new WeakMap();
		ua = 1;
		constructor(t) {
			this.j = t;
		}
		materialFor(t) {
			'source' === t.kind && t.source.la();
			const i = this.fa(t),
				s = this.aa.get(i);
			if (s) return s;
			const e =
				'source' === t.kind ? this.j.materialManager.Do(this.j.da(t)) : this.j.materialManager.ko(this.j._a(t));
			return (this.aa.set(i, e), e);
		}
		dispose() {
			this.aa.clear();
		}
		get size() {
			return this.aa.size;
		}
		fa(t) {
			return 'source' === t.kind
				? [
						'source',
						this.pa(t.source.texture),
						this.pa(t.palette.texture),
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
						this.oa(t.framebuffer),
						t.attachmentCount,
						t.width,
						t.height,
						...t.textures.map((t) => this.pa(t)),
					].join('|');
		}
		pa(t) {
			return this.oa(t);
		}
		oa(t) {
			const i = this.ca.get(t);
			if (i) return i;
			const s = this.ua++;
			return (this.ca.set(t, s), s);
		}
	},
	Ni = class {
		Ee;
		uo = null;
		ma;
		va;
		ga;
		ya;
		wa;
		ba;
		Ma;
		Ca = null;
		xa = {};
		Sa = [];
		Ea = [];
		Fa = [];
		Ta = [];
		Pa = null;
		La = [0, 0, 0, 0];
		Da = 1;
		ka = !0;
		Ra = !0;
		Ba = !1;
		Ia = /* @__PURE__ */ new Float32Array(4);
		Oa = /* @__PURE__ */ new Float32Array(12);
		Na = /* @__PURE__ */ new Set();
		constructor(t) {
			((this.Ee = t),
				t.enable(t.DEPTH_TEST),
				t.depthFunc(t.LEQUAL),
				t.clearDepth(1),
				t.depthMask(!0),
				(this.ka = !0),
				(this.Ra = !0),
				t.disable(t.CULL_FACE),
				(this.wa = new jt()),
				(this.va = new Ri(t)),
				(this.ga = new Ii(t)),
				(this.ya = new Oi(this)),
				(this.ba = new Bi()),
				(this.ma = new Ei(t)),
				(this.Ma = new Zt(t)));
			const i = [0, 0, t.canvas.width, t.canvas.height];
			(At(t, i),
				this.Ea.push(null),
				this.Fa.push(i),
				this.Ta.push(1),
				(this.Pa = null),
				(this.La = i),
				(this.Da = 1));
		}
		Ne() {
			(this.Ea.push(this.Pa), this.Fa.push([...this.La]), this.Ta.push(this.Da));
		}
		je() {
			const t = this.Ea.pop() ?? null,
				i = this.Fa.pop() ?? [0, 0, this.Ee.canvas.width, this.Ee.canvas.height],
				s = this.Ta.pop() ?? 1;
			this.Qe(t, i[2], i[3], s);
		}
		Qe(t, i, s, e = 1) {
			const r = this.Ee;
			(this.Pa !== t && (r.bindFramebuffer(r.FRAMEBUFFER, t), (this.Pa = t)), (this.Da = e));
			const n = [0, 0, i, s];
			(this.La[0] === n[0] && this.La[1] === n[1] && this.La[2] === n[2] && this.La[3] === n[3]) ||
				(r.viewport(...n), At(r, n), (this.La = n));
		}
		he(t) {
			this.uo !== t && ((this.uo = t), t.nr());
		}
		Qa(t) {
			if (((this.Ba = t), t)) this.Na.clear();
			else {
				for (const t of this.Na) t.za();
				this.Na.clear();
			}
		}
		Ha() {
			return this.Ba;
		}
		Ga(t) {
			this.Na.add(t);
		}
		rr(t, i) {
			return new bt(this.Ee, t, i);
		}
		ja(t) {
			((this.Ca = t), t && (this.xa = {}));
		}
		Va() {
			((this.Ca = null), (this.xa = {}));
		}
		ar(t, i) {
			this.xa[t] = i;
		}
		oe(t) {
			Object.assign(this.xa, t);
		}
		Xa(t = !1) {
			(this.Sa.push({ shader: this.Ca, uniforms: { ...this.xa } }), t && this.Va());
		}
		$a() {
			const t = this.Sa.pop();
			t && ((this.Ca = t.shader), (this.xa = t.shader ? { ...t.uniforms } : {}));
		}
		Ya(t) {
			return new bt(this.Ee, Ui, t);
		}
		Ka() {
			if (this.Ca) return this.va.Ye(this.Ca, this.xa);
			const t = this.wa.jn.current;
			return 'source' === t.kind || 'framebuffer' === t.kind ? this.ya.materialFor(t) : this.va.Lo;
		}
		da(t) {
			return (
				t.source.la(),
				{
					Ut: t.source.texture,
					UG: t.invert,
					UE: t.flipX,
					UF: t.flipY,
					UD: t.charRotation,
					Uv: t.brightnessStart,
					Uu: t.brightnessEnd,
					Uz: 'fixed' === t.charColorMode,
					Uy: t.charColor,
					Ux: 'fixed' === t.cellColorMode,
					Uw: t.cellColor,
					UA: t.palette.count,
					UB: t.palette.texture,
					UC: [t.palette.columns, t.palette.rows],
				}
			);
		}
		_a(t) {
			const i = t.textures,
				s = t.attachmentCount > 1,
				e = t.attachmentCount > 2,
				r = t.attachmentCount > 3;
			return {
				Un: i[0],
				Uo: s ? i[1] : i[0],
				Up: e ? i[2] : i[0],
				Uq: r ? i[3] : i[0],
				Ur: [t.width, t.height],
				Uc: s,
				Ud: e,
				Ue: r,
			};
		}
		Wa(t, i, s, e) {
			t instanceof yt || !e || t.Za(e);
			const r = t instanceof yt ? [t.Ve()] : t.qa(),
				n = i ?? t.width,
				h = s ?? t.height;
			for (const o of r) this.ba.zo(n, h, this.wa, o);
			t instanceof yt || !t.Ja() || this.Ga(t);
		}
		ae(t, i, s, e) {
			this.Ma.eh(t, i, s, e);
		}
		tc(t, i) {
			this.ba.zo(t, i, this.wa, this.Ka());
		}
		$o(t, i) {
			0 !== i && this.ba.$o(t, i, this.wa, this.Ka());
		}
		sc(t, i, s, e) {
			this.ba.Ho(t, i, s, e, this.wa, this.Ka());
		}
		ec(t, i) {
			this.ba.Yo(t, i, this.wa, this.Ka());
		}
		rc(t, i) {
			this.ba.Go(t, i, this.wa, this.Ka());
		}
		nc(t, i, s, e, r, n) {
			((this.Oa[0] = t),
				(this.Oa[1] = i),
				(this.Oa[2] = 0),
				(this.Oa[3] = 0),
				(this.Oa[4] = s),
				(this.Oa[5] = e),
				(this.Oa[6] = 0),
				(this.Oa[7] = 0),
				(this.Oa[8] = r),
				(this.Oa[9] = n),
				(this.Oa[10] = 0),
				(this.Oa[11] = 0),
				this.ba.Yo(this.Oa, 3, this.wa, this.Ka()));
		}
		hc(t, i, s, e, r, n, h, o) {
			this.ba.Vo(t, i, s, e, r, n, h, o, this.wa, this.Ka());
		}
		oc(t, i, s, e) {
			this.ba.jo(t, i, s, e, this.wa, this.Ka());
		}
		ac(t, i, s) {
			this.ba.Xo(Vt.BOX, t, i, s, this.wa, this.Ka());
		}
		cc(t) {
			const i = 2 * t;
			this.ba.Xo(Vt.SPHERE, i, i, i, this.wa, this.Ka());
		}
		uc(t, i) {
			const s = 2 * (t + i);
			this.ba.Xo(Vt.TORUS, s, 2 * i, s, this.wa, this.Ka());
		}
		lc(t, i) {
			const s = 2 * t;
			this.ba.Xo(Vt.CONE, s, i, s, this.wa, this.Ka());
		}
		fc(t, i) {
			const s = 2 * t;
			this.ba.Xo(Vt.CYLINDER, s, i, s, this.wa, this.Ka());
		}
		dc(t, i, s) {
			this.ba.Xo(Vt.ELLIPSOID, 2 * t, 2 * i, 2 * s, this.wa, this.Ka());
		}
		W(t, i, s = 1, e = {}) {
			return new yt(this.Ee, t, i, s, e, this);
		}
		_c(t, i = t, s = t, e = 255) {
			this.wa.gn.Ln(t, i ?? t, s ?? t, e);
			const [r, n, h, o] = this.wa.gn.Fs;
			this.mc(r, n, h, o);
		}
		Rh(t = 0, i = 0, s = 0, e = 0) {
			this.mc(t, i, s, e);
		}
		mc(t, i, s, e) {
			const r = this.Ee,
				n = this.Ia;
			if (this.Da > 1) {
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
					this.Da >= 3 && ((n[0] = t), (n[1] = i), (n[2] = s), (n[3] = e), r.clearBufferfv(r.COLOR, 2, n)),
					this.Da >= 3 && ((n[0] = 0), (n[1] = 0), (n[2] = 0), (n[3] = 0)));
				for (let t = 3; t < this.Da; t++) r.clearBufferfv(r.COLOR, t, n);
			} else (r.clearColor(t, i, s, e), r.clear(r.COLOR_BUFFER_BIT));
		}
		vc() {
			const t = [0, 0, this.Ee.canvas.width, this.Ee.canvas.height];
			(this.Ee.viewport(...t), At(this.Ee, t), (this.La = t), this.Fa.length > 0 && (this.Fa[0] = t));
		}
		gc(t) {
			this.ka !== t &&
				(t ? this.Ee.enable(this.Ee.DEPTH_TEST) : this.Ee.disable(this.Ee.DEPTH_TEST), (this.ka = t));
		}
		yc(t) {
			this.Ra !== t && (this.Ee.depthMask(t), (this.Ra = t));
		}
		wc() {
			return this.ka;
		}
		bc() {
			return this.Ra;
		}
		Ge() {
			const t = this.ba;
			(this.ma.wo(t), t.Rh(), (this.uo = null));
		}
		L() {
			(this.ya.dispose(), this.ga.dispose(), this.va.L(), this.ma.L(), this.Ma.L());
		}
		get context() {
			return this.Ee;
		}
		get state() {
			return this.wa;
		}
		get materialManager() {
			return this.va;
		}
		get glyphPaletteService() {
			return this.ga;
		}
	},
	Qi = class {
		p;
		Mc = null;
		Cc = !1;
		xc;
		Sc = null;
		Ec = !0;
		Ee = null;
		Fc = null;
		Tc = null;
		Pc = !1;
		Lc;
		constructor(t = {}) {
			if (((this.Cc = t.overlay ?? !1), (this.Lc = t.pixelDensity ?? 1), t.gl))
				((this.Sc = t.gl), (this.p = t.gl.canvas), (this.xc = !1), (this.Ec = !1));
			else if (this.Cc && t.canvas) ((this.Mc = t.canvas), (this.p = this.Dc()), (this.xc = !0), this.kc());
			else if (t.canvas) {
				if ('undefined' != typeof HTMLVideoElement && t.canvas instanceof HTMLVideoElement)
					throw new r('Video elements are only supported in overlay mode.');
				((this.p = t.canvas), (this.xc = !1));
			} else ((this.p = this.Rc(t.width, t.height)), (this.xc = !0));
			'undefined' != typeof HTMLCanvasElement &&
				this.p instanceof HTMLCanvasElement &&
				(this.p.style.imageRendering = 'pixelated');
		}
		Rc(t, i) {
			const s = document.createElement('canvas');
			((s.className = 'textmodeCanvas'), (s.style.imageRendering = 'pixelated'));
			const e = t || 800,
				r = i || 600;
			return (
				(s.width = e * this.Lc),
				(s.height = r * this.Lc),
				(s.style.width = e + 'px'),
				(s.style.height = r + 'px'),
				this.Bc(s),
				s
			);
		}
		Bc(t) {
			const i = () => {
				if (this.Pc || t.parentNode) return;
				const i = document.body;
				i && i.appendChild(t);
			};
			document.body
				? i()
				: ((this.Fc = () => {
						((this.Fc = null), i());
					}),
					document.addEventListener('DOMContentLoaded', this.Fc, { once: !0 }));
		}
		Dc() {
			const t = document.createElement('canvas');
			((t.className = 'textmodeCanvas'), (t.style.imageRendering = 'pixelated'));
			const i = this.Mc.getBoundingClientRect();
			let s = Math.round(i.width),
				e = Math.round(i.height);
			if ('undefined' != typeof HTMLVideoElement && this.Mc instanceof HTMLVideoElement) {
				const t = this.Mc;
				(0 === s || 0 === e) &&
					t.videoWidth > 0 &&
					t.videoHeight > 0 &&
					((s = t.videoWidth), (e = t.videoHeight));
			}
			((t.width = s * this.Lc),
				(t.height = e * this.Lc),
				(t.style.width = s + 'px'),
				(t.style.height = e + 'px'),
				(t.style.position = 'absolute'));
			const r = window.getComputedStyle(this.Mc);
			let n = parseInt(r.zIndex || '0', 10);
			return (isNaN(n) && (n = 0), (t.style.zIndex = (n + 1).toString()), t);
		}
		kc() {
			(this.Ic(),
				this.Oc(),
				this.Mc?.parentNode ||
					'loading' !== document.readyState ||
					((this.Tc = () => {
						((this.Tc = null), this.Pc || (this.Ic(), this.Oc()));
					}),
					document.addEventListener('DOMContentLoaded', this.Tc, { once: !0 })));
		}
		Oc() {
			this.p instanceof HTMLCanvasElement &&
				this.Mc &&
				!this.p.parentNode &&
				this.Mc.parentNode?.insertBefore(this.p, this.Mc.nextSibling);
		}
		Ic() {
			if (!this.Mc) return;
			if (!(this.p instanceof HTMLCanvasElement)) return;
			const t = this.Mc.getBoundingClientRect(),
				i = this.Mc.offsetParent;
			if (i && i !== document.body) {
				const s = i.getBoundingClientRect();
				((this.p.style.top = t.top - s.top + 'px'), (this.p.style.left = t.left - s.left + 'px'));
			} else
				((this.p.style.top = t.top + window.scrollY + 'px'),
					(this.p.style.left = t.left + window.scrollX + 'px'));
		}
		fe(t, i) {
			if (this.Cc) {
				const t = this.Mc.getBoundingClientRect(),
					i = Math.round(t.width),
					s = Math.round(t.height);
				((this.p.width = i * this.Lc),
					(this.p.height = s * this.Lc),
					(this.p.style.width = i + 'px'),
					(this.p.style.height = s + 'px'),
					this.Ic());
			} else {
				const s = t ?? Math.round(this.p.width / this.Lc),
					e = i ?? Math.round(this.p.height / this.Lc);
				((this.p.width = s * this.Lc),
					(this.p.height = e * this.Lc),
					this.p instanceof HTMLCanvasElement &&
						((this.p.style.width = s + 'px'), (this.p.style.height = e + 'px')));
			}
		}
		Nc() {
			if (this.Sc) return this.Sc;
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
			return ((this.Ee = t), t);
		}
		L() {
			if (this.Pc) return;
			if (((this.Pc = !0), this.Qc(), !this.Ec)) return;
			const t = this.Ee ?? this.Sc;
			(t && t.getExtension('WEBGL_lose_context')?.loseContext(),
				this.xc &&
					'undefined' != typeof HTMLCanvasElement &&
					this.p instanceof HTMLCanvasElement &&
					this.p.parentNode &&
					this.p.parentNode.removeChild(this.p));
		}
		Qc() {
			(this.Fc && (document.removeEventListener('DOMContentLoaded', this.Fc), (this.Fc = null)),
				this.Tc && (document.removeEventListener('DOMContentLoaded', this.Tc), (this.Tc = null)));
		}
		get canvas() {
			return this.p;
		}
		get targetCanvas() {
			return this.Mc;
		}
		get width() {
			return this.p.width;
		}
		get height() {
			return this.p.height;
		}
		get ownsContext() {
			return this.Ec;
		}
		get pixelDensity() {
			return this.Lc;
		}
		zc(t) {
			t <= 0 || (this.Lc = t);
		}
	};
function zi(t) {
	return parseInt(t, 16);
}
var Hi = /^rgba?\(([^)]+)\)$/i;
function Gi(t) {
	return ((t = Math.round(t)), Number.isNaN(t) ? 0 : H(t, 0, 255));
}
var ji = class t {
		Hc;
		Gc;
		r;
		g;
		b;
		a;
		constructor(t, i, s, e) {
			((this.r = Gi(t)), (this.g = Gi(i)), (this.b = Gi(s)), (this.a = Gi(e)));
		}
		static jc(i, s, e, r) {
			if (i instanceof t) return i;
			if (Array.isArray(i)) {
				if (i.length < 3) throw new Error('Component tuples must include at least RGB values.');
				const [s, e, r] = i,
					n = 4 === i.length ? i[3] : 255;
				return t.Vc(s, e, r, n);
			}
			if ('string' == typeof i) {
				const s = i.trim();
				if (0 === s.length) throw new Error('Color strings cannot be empty.');
				const e = (function (t, i = !1) {
					if (!t) return null;
					const s = t.trim().toLowerCase();
					if (!s) return null;
					let e = null;
					return (
						s.startsWith('rgb') &&
							(e = (function (t) {
								const i = Hi.exec(t.trim());
								if (!i) return null;
								const s = i[1].split(',').map((t) => t.trim());
								if (s.length < 3) return null;
								const e = Gi(parseFloat(s[0])),
									r = Gi(parseFloat(s[1])),
									n = Gi(parseFloat(s[2]));
								let h = 255;
								if (void 0 !== s[3]) {
									const t = s[3].trim();
									let i = parseFloat(t);
									(t.endsWith('%') && (i /= 100), (h = 255 * H(i, 0, 1)));
								}
								return [e, r, n, Math.round(h)];
							})(s)),
						e && (i || 0 !== e[3]) ? e : null
					);
				})(s, !0);
				return e ? t.Vc(...e) : t.Xc(s);
			}
			if ('number' == typeof i)
				return 'number' == typeof s && 'number' == typeof e
					? t.Vc(i, s, e, r ?? 255)
					: 'number' == typeof s
						? t.$c(i, s)
						: t.$c(i, r ?? 255);
			throw new Error('Unsupported color input passed.');
		}
		static Yc(i, s, e, r, n) {
			if (i instanceof t || 'string' == typeof i) return t.jc(i);
			const [h, o, a, c] = (function (t, i, s, e, r) {
				if (Array.isArray(t)) {
					if (t.length < 3) throw new Error('Component tuples must include at least RGB values.');
					return Dt(t[0], t[1], t[2], 4 === t.length ? t[3] : void 0, r);
				}
				return 'number' == typeof i && 'number' == typeof s
					? Dt(t, i, s, e, r)
					: (function (t, i, s) {
							const e = Tt(t, 'rgb' === s.mode ? s.maxes[0] : s.maxes[2]);
							return [e, e, e, Pt(i, s.maxes[3])];
						})(t, i ?? e, r);
			})(i, s, e, r, n);
			return t.Vc(h, o, a, c);
		}
		static Vc(i, s, e, r = 255) {
			return new t(i, s, e, r);
		}
		static $c(i, s = 255) {
			return new t(i, i, i, s);
		}
		static Xc(i) {
			return new t(
				...(function (t) {
					const i = t.trim().replace(/^#|0x/gi, '');
					if (!/^[0-9A-Fa-f]+$/.test(i)) throw new Error(`Invalid hex color: ${t}`);
					const s =
						3 === (e = i).length || 4 === e.length
							? e
									.split('')
									.map((t) => t + t)
									.join('')
							: e;
					var e;
					if (6 !== s.length && 8 !== s.length) throw new Error(`Invalid hex color: ${t}`);
					return [
						zi(s.slice(0, 2)),
						zi(s.slice(2, 4)),
						zi(s.slice(4, 6)),
						8 === s.length ? zi(s.slice(6, 8)) : 255,
					];
				})(i)
			);
		}
		static Kc(i, s, e, r) {
			return new t(Math.round(255 * i), Math.round(255 * s), Math.round(255 * e), Math.round(255 * r));
		}
		get rgb() {
			return [this.r, this.g, this.b];
		}
		get rgba() {
			return (this.Hc || (this.Hc = [this.r, this.g, this.b, this.a]), [...this.Hc]);
		}
		get normalized() {
			return (this.Gc || (this.Gc = [this.r / 255, this.g / 255, this.b / 255, this.a / 255]), [...this.Gc]);
		}
		withAlpha(i) {
			return new t(this.r, this.g, this.b, i);
		}
	},
	Vi = class {
		Wc;
		Zc;
		qc;
		Jc = 'brightness';
		tu = null;
		iu = null;
		su = null;
		constructor(t, i, s) {
			((this.Wc = t), (this.Zc = i), (this.qc = s));
		}
		get conversionMode() {
			return this.Jc;
		}
		setConversionMode(t, i) {
			i
				? ((this.tu = t), this.Zc.disposeStack(this.su), (this.su = null))
				: ((this.Jc = t), this.Zc.disposeStack(this.iu), (this.iu = null));
		}
		setConversions(t, i) {
			if (!Array.isArray(t))
				throw new r('[textmode.js] conversions() expects an array of conversion steps.', {
					method: 'conversions',
					providedValue: t,
				});
			if (0 === t.length) return (this.clearConversions(i), !1);
			const s = t.map((t, i) => this.eu(t, i));
			return (
				i
					? ((this.tu = null), this.Zc.disposeStack(this.su), (this.su = s))
					: (this.Zc.disposeStack(this.iu), (this.iu = s)),
				!0
			);
		}
		clearConversions(t) {
			t
				? ((this.tu = null), this.Zc.disposeStack(this.su), (this.su = []))
				: (this.Zc.disposeStack(this.iu), (this.iu = null));
		}
		clearFrameOverrides() {
			((this.tu = null), this.Zc.disposeStack(this.su), (this.su = null));
		}
		getActiveStack() {
			return null !== this.tu ? null : null !== this.su ? (this.su.length > 0 ? this.su : null) : this.iu;
		}
		getSingleMode() {
			return this.tu ?? this.Jc;
		}
		hasFrameOverrides() {
			return null !== this.tu || null !== this.su;
		}
		invalidateMaterials() {
			(this.iu?.forEach((t) => {
				t.material = null;
			}),
				this.su?.forEach((t) => {
					t.material = null;
				}));
		}
		refreshPalettes() {
			(this.ru(this.iu), this.ru(this.su));
		}
		dispose() {
			(this.Zc.disposeStack(this.iu), this.Zc.disposeStack(this.su), (this.iu = null), (this.su = null));
		}
		get debugSnapshot() {
			return { conversionMode: this.Jc, conversionStack: this.iu, frameConversionStack: this.su };
		}
		eu(t, i) {
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
			const s = {
				mode: t.mode,
				options: this.nu(t.options, i),
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
				((s.characters = t.characters),
					(s.glyphColors = this.Wc.getCharacterPalette(t.characters)),
					(s.paletteDirty = !0));
			}
			if (
				(void 0 !== t.invert && (s.invert = t.invert ? 1 : 0),
				void 0 !== t.flipX && (s.flipX = t.flipX ? 1 : 0),
				void 0 !== t.flipY && (s.flipY = t.flipY ? 1 : 0),
				void 0 !== t.charRotation && (s.charRotation = W(t.charRotation)),
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
				const [e, n] = this.hu(t.brightnessStart, t.brightnessEnd, 'conversions', i);
				((s.brightnessStart = e), (s.brightnessEnd = n));
			}
			return (
				void 0 !== t.charColorMode &&
					(this.ou(t.charColorMode, 'charColorMode', i), (s.charColorMode = t.charColorMode)),
				void 0 !== t.cellColorMode &&
					(this.ou(t.cellColorMode, 'cellColorMode', i), (s.cellColorMode = t.cellColorMode)),
				void 0 !== t.charColor && (s.charColor = this.qc(t.charColor)),
				void 0 !== t.cellColor && (s.cellColor = this.qc(t.cellColor)),
				s
			);
		}
		ou(t, i, s) {
			if ('sampled' !== t && 'fixed' !== t)
				throw new r(`[textmode.js] Conversion stack step ${i} must be 'sampled' or 'fixed'.`, {
					method: 'conversions',
					index: s,
					providedValue: t,
				});
		}
		nu(t, i) {
			if (void 0 === t) return {};
			if (null === t || 'object' != typeof t || Array.isArray(t))
				throw new r('[textmode.js] Conversion stack step options must be an object.', {
					method: 'conversions',
					index: i,
					providedValue: t,
				});
			return { ...t };
		}
		hu(t, i, s, e) {
			const n = { method: s, start: t, end: i };
			if ((void 0 !== e && (n.index = e), !Number.isFinite(t) || !Number.isFinite(i)))
				throw new r('[textmode.js] brightness range values must be finite numbers.', n);
			if (t < 0 || t > 255 || i < 0 || i > 255)
				throw new r('[textmode.js] brightness range values must be between 0 and 255.', n);
			if (t > i) throw new r('[textmode.js] brightness range start must be less than or equal to end.', n);
			return [t / 255, i / 255];
		}
		ru(t) {
			if (t)
				for (const i of t)
					void 0 !== i.characters &&
						((i.glyphColors = this.Wc.getCharacterPalette(i.characters)),
						(i.paletteDirty = !0),
						(i.material = null));
		}
	},
	Xi = class {
		au;
		cu = null;
		uu = null;
		lu = !0;
		fu = !1;
		du = null;
		constructor(t) {
			this.au = t;
		}
		setActiveGlyphAtlas(t) {
			((this.du = t), this.markBaseDirty(), this.markFrameDirty());
		}
		markBaseDirty() {
			this.lu = !0;
		}
		markFrameDirty() {
			this.fu = !0;
		}
		clearFrame() {
			this.fu = !1;
		}
		getBase(t) {
			return ((this.cu && !this.lu) || ((this.cu = this.K(t, this.cu)), (this.lu = !1)), this.cu);
		}
		getFrame(t) {
			return ((this.uu && !this.fu) || ((this.uu = this.K(t, this.uu)), (this.fu = !1)), this.uu);
		}
		getStep(t, i) {
			return (
				(t.paletteTexture && !t.paletteDirty) ||
					((t.paletteTexture = this.K(i, t.paletteTexture)), (t.paletteDirty = !1)),
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
			((this.cu = null), (this.uu = null));
		}
		get basePalette() {
			return this.cu;
		}
		get framePalette() {
			return this.uu;
		}
		K(t, i) {
			const s = this.au.resolve(t, this.du);
			return i?.texture === s.texture ? i : s;
		}
	},
	$i = class {
		qc;
		du = null;
		yn = null;
		dn = 0;
		mn = 0;
		vn = 0;
		_n = 0;
		_u = 0;
		pu = 1;
		mu = 'sampled';
		vu = 'fixed';
		wn = [1, 1, 1, 1];
		bn = [0, 0, 0, 1];
		gu = [0, 0, 0, 1];
		yu = [[0.1, 0, 0]];
		wu = null;
		bu = null;
		Mu = null;
		Au = null;
		Cu = null;
		xu = null;
		Su = null;
		Eu = null;
		Fu = null;
		Tu = null;
		Pu = null;
		Lu = null;
		constructor(t = ji.jc) {
			this.qc = t;
		}
		get activeGlyphAtlas() {
			return this.du;
		}
		setActiveGlyphAtlas(t, i) {
			return this.du !== t && ((this.du = t), i.setActiveGlyphAtlas(t), this.yn && this.Du(this.yn, i), !0);
		}
		setInvert(t, i) {
			this.ku('invert', t ? 1 : 0, i);
		}
		setFlipX(t, i) {
			this.ku('flipX', t ? 1 : 0, i);
		}
		setFlipY(t, i) {
			this.ku('flipY', t ? 1 : 0, i);
		}
		setCharRotation(t, i) {
			this.ku('charRotation', W(t), i);
		}
		setBrightnessRange(t, i, s) {
			const e = t / 255,
				r = i / 255;
			s ? ((this.Cu = e), (this.xu = r)) : ((this._u = e), (this.pu = r));
		}
		setCharColorMode(t, i) {
			i ? (this.Su = t) : (this.mu = t);
		}
		setCellColorMode(t, i) {
			i ? (this.Eu = t) : (this.vu = t);
		}
		setColor(t, i, s, e, r, n) {
			const h = this.Ru(t, i),
				o = this.qc(s, e, r, n);
			Nt(h, o.r, o.g, o.b, o.a);
		}
		setCharacters(t, i, s) {
			if (i) {
				const i = this.getCharacterPalette(t);
				return ((this.Lu = i.length > 0 ? i : null), void (i.length > 0 && s.markFrameDirty()));
			}
			((this.yn = t), this.Du(t, s));
		}
		clearFrameOverrides(t) {
			((this.wu = null),
				(this.bu = null),
				(this.Mu = null),
				(this.Au = null),
				(this.Cu = null),
				(this.xu = null),
				(this.Su = null),
				(this.Eu = null),
				(this.Fu = null),
				(this.Tu = null),
				(this.Pu = null),
				(this.Lu = null),
				t.clearFrame());
		}
		hasFrameUniformOverrides() {
			return (
				null !== this.wu ||
				null !== this.bu ||
				null !== this.Mu ||
				null !== this.Au ||
				null !== this.Cu ||
				null !== this.xu ||
				null !== this.Su ||
				null !== this.Eu ||
				null !== this.Fu ||
				null !== this.Tu ||
				null !== this.Pu ||
				null !== this.Lu
			);
		}
		getCharacterPalette(t) {
			return this.du ? this.du.zt(t).filter((t) => Array.isArray(t)) : [];
		}
		createBaseUniforms(t, i, s) {
			const e = i?.invert ?? this.wu ?? this.dn,
				r = i?.flipX ?? this.bu ?? this.mn,
				n = i?.flipY ?? this.Mu ?? this.vn,
				h = i?.charRotation ?? this.Au ?? this._n,
				o = i?.brightnessStart ?? this.Cu ?? this._u,
				a = i?.brightnessEnd ?? this.xu ?? this.pu,
				c = i?.charColorMode ?? this.Su ?? this.mu,
				u = i?.cellColorMode ?? this.Eu ?? this.vu,
				l = i?.charColor ?? this.Fu ?? this.wn,
				f = i?.cellColor ?? this.Tu ?? this.bn,
				d = this.Pu ?? this.gu,
				_ = void 0 !== i?.glyphColors,
				p = !_ && null !== this.Lu,
				m = _ ? i.glyphColors : (this.Lu ?? this.yu),
				v = _ ? s.getStep(i, m) : p ? s.getFrame(m) : s.getBase(m);
			return {
				u_image: t,
				u_invert: !!e,
				u_flipX: !!r,
				u_flipY: !!n,
				u_charRotation: h,
				U6: o,
				U5: a,
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
			const s = this.wu ?? this.dn,
				e = this.bu ?? this.mn,
				r = this.Mu ?? this.vn,
				n = this.Au ?? this._n,
				h = this.Cu ?? this._u,
				o = this.xu ?? this.pu,
				a = this.Su ?? this.mu,
				c = this.Eu ?? this.vu,
				u = this.Fu ?? this.wn,
				l = this.Tu ?? this.bn,
				f = this.Lu ?? this.yu;
			return {
				kind: 'source',
				source: t,
				palette: this.Lu ? i.getFrame(f) : i.getBase(f),
				brightnessStart: h,
				brightnessEnd: o,
				invert: !!s,
				flipX: !!e,
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
				invert: this.dn,
				flipX: this.mn,
				flipY: this.vn,
				charRotation: this._n,
				brightnessStart: this._u,
				brightnessEnd: this.pu,
				charColorMode: this.mu,
				cellColorMode: this.vu,
				charColor: this.wn,
				cellColor: this.bn,
				backgroundColor: this.gu,
				glyphColors: this.yu,
			};
		}
		ku(t, i, s) {
			'invert' === t
				? s
					? (this.wu = i)
					: (this.dn = i)
				: 'flipX' === t
					? s
						? (this.bu = i)
						: (this.mn = i)
					: 'flipY' === t
						? s
							? (this.Mu = i)
							: (this.vn = i)
						: s
							? (this.Au = i)
							: (this._n = i);
		}
		Ru(t, i) {
			return i
				? 'char' === t
					? ((this.Fu ??= [0, 0, 0, 1]), this.Fu)
					: 'cell' === t
						? ((this.Tu ??= [0, 0, 0, 1]), this.Tu)
						: ((this.Pu ??= [0, 0, 0, 1]), this.Pu)
				: 'char' === t
					? this.wn
					: 'cell' === t
						? this.bn
						: this.gu;
		}
		Du(t, i) {
			const s = this.getCharacterPalette(t);
			s.length > 0 && ((this.yu = s), i.markBaseDirty());
		}
	},
	Yi = class {
		Wt;
		Le = null;
		Bu = null;
		Iu = null;
		Ou;
		constructor(t) {
			this.Wt = t;
		}
		invalidateMaterials() {
			((this.Le = null), this.Wt.stackState.invalidateMaterials());
		}
		clearStrategyCache() {
			this.Bu = null;
		}
		getMaterial() {
			return this.hasFrameOverrides() ? this.Nu() : (this.Le || (this.Le = this.Nu()), this.Le);
		}
		getMaterials() {
			const t = this.Wt.stackState.getActiveStack();
			if (!t) return [this.getMaterial()];
			this.Wt.beforeMaterialUpdate();
			const i = !this.Wt.conversionState.hasFrameUniformOverrides();
			return t.map((s, e) => this.Qu(s, e, t.length, i));
		}
		hasFrameOverrides() {
			return this.Wt.conversionState.hasFrameUniformOverrides() || this.Wt.stackState.hasFrameOverrides();
		}
		createBaseUniforms() {
			return this.Wt.conversionState.createBaseUniforms(this.Wt.getTexture(), this.Iu, this.Wt.paletteCache);
		}
		get material() {
			return this.Le;
		}
		Nu(t = this.Wt.stackState.getSingleMode(), i = null, s) {
			i || this.Wt.beforeMaterialUpdate();
			const e = this.Iu,
				r = this.Ou;
			((this.Iu = i), (this.Ou = s));
			try {
				const e = i ? this.zu(t) : this.Hu(),
					r = this.Gu(s),
					n = this.Wt.conversionManager.ju(t, r),
					h = e.createUniforms(r);
				return this.Wt.renderer.materialManager.Ye(n, h);
			} finally {
				((this.Iu = e), (this.Ou = r));
			}
		}
		Qu(t, i, s, e) {
			if (e && t.material) return t.material;
			const r = { index: i, count: s, mode: t.mode, options: t.options },
				n = this.Nu(t.mode, t, r);
			return (e && (t.material = n), n);
		}
		zu(t) {
			const i = this.Wt.conversionManager.Vu(t);
			if (!i)
				throw new Error(
					`[textmode.js] Conversion mode "${t}" is not registered. If this mode is provided by an add-on, make sure its plugin is installed before loading sources.`
				);
			return i;
		}
		Hu() {
			const t = this.Wt.stackState.getSingleMode();
			if (this.Bu && this.Bu.id === t) return this.Bu;
			const i = this.zu(t);
			return ((this.Bu = i), i);
		}
		Gu(t) {
			const i = this.Wt.conversionState.activeGlyphAtlas;
			if (!i)
				throw new Error(
					'[textmode.js] Cannot create conversion context: no active glyph atlas set. Ensure _setActiveFont() is called before rendering.'
				);
			const s = t ?? this.Ou,
				e = {
					renderer: this.Wt.renderer,
					gl: this.Wt.gl,
					font: i,
					glyphAtlas: i,
					source: this.Wt.source,
					createBaseUniforms: () => this.createBaseUniforms(),
				};
			return (s && (e.pass = s), e);
		}
	},
	Ki = class extends e {
		Ee;
		j;
		jn;
		Xu;
		$u;
		o;
		u;
		Zc;
		Wc;
		Yu;
		Ku;
		constructor(t, i, s, e, r, n, h, o, a = ji.jc) {
			(super(),
				(this.Ee = t),
				(this.j = i),
				(this.jn = s),
				(this.Xu = r),
				(this.$u = n),
				this.Wu(h, o),
				(this.Zc = new Xi(i.glyphPaletteService)),
				(this.Wc = new $i(a)),
				(this.Yu = new Vi(this.Wc, this.Zc, (t) => a(t).normalized)),
				(this.Ku = new Yi({
					gl: t,
					renderer: i,
					conversionManager: e,
					source: this,
					stackState: this.Yu,
					conversionState: this.Wc,
					paletteCache: this.Zc,
					getTexture: () => this.jn,
					beforeMaterialUpdate: () => this.Zu(),
				})));
		}
		conversionMode(t) {
			const i = this.Ba();
			return (
				this.Yu.setConversionMode(t, i),
				i || (this.Ku.clearStrategyCache(), this.Ku.invalidateMaterials()),
				this
			);
		}
		conversions(t) {
			const i = this.Ba(),
				s = this.Yu.setConversions(t, i);
			return (!i && s && this.Ku.invalidateMaterials(), this);
		}
		clearConversions() {
			const t = this.Ba();
			return (this.Yu.clearConversions(t), t || this.Ku.invalidateMaterials(), this);
		}
		dispose() {
			(this.jn && (this.Ee.deleteTexture(this.jn), (this.jn = null)),
				this.Yu.dispose(),
				this.Zc.disposeAll(),
				super.dispose());
		}
		invert(t = !0) {
			return (this.Wc.setInvert(t, this.Ba()), this.qu(), this);
		}
		flipX(t = !0) {
			return (this.Wc.setFlipX(t, this.Ba()), this.qu(), this);
		}
		flipY(t = !0) {
			return (this.Wc.setFlipY(t, this.Ba()), this.qu(), this);
		}
		charRotation(t) {
			return (this.Wc.setCharRotation(t, this.Ba()), this.qu(), this);
		}
		brightnessRange(t, i) {
			return (this.Ju(t, i), this.Wc.setBrightnessRange(t, i, this.Ba()), this.qu(), this);
		}
		charColorMode(t) {
			return (this.Wc.setCharColorMode(t, this.Ba()), this.qu(), this);
		}
		cellColorMode(t) {
			return (this.Wc.setCellColorMode(t, this.Ba()), this.qu(), this);
		}
		charColor(t, i, s, e) {
			return (this.tl('char', t, i, s, e), this);
		}
		cellColor(t, i, s, e) {
			return (this.tl('cell', t, i, s, e), this);
		}
		background(t, i, s, e) {
			return (this.tl('background', t, i, s, e), this);
		}
		characters(t) {
			return (this.Wc.setCharacters(t, this.Ba(), this.Zc), this.qu(), this);
		}
		Za(t) {
			this.Wc.setActiveGlyphAtlas(t, this.Zc) && (this.Yu.refreshPalettes(), this.Ku.invalidateMaterials());
		}
		get texture() {
			return this.jn;
		}
		get width() {
			return this.o;
		}
		get height() {
			return this.u;
		}
		get originalWidth() {
			return this.Xu;
		}
		get originalHeight() {
			return this.$u;
		}
		fe(t, i) {
			(this.Wu(t, i), this.Ku.invalidateMaterials());
		}
		Ve() {
			return this.Ku.getMaterial();
		}
		qa() {
			return this.Ku.getMaterials();
		}
		il(t) {
			if ((this.Za(t), this.Yu.getActiveStack()))
				throw new r(
					'[textmode.js] texture() does not support conversion stacks. Call clearConversions() or draw the stacked source with image().',
					{ method: 'texture' }
				);
			const i = this.Yu.getSingleMode();
			if ('brightness' !== i)
				throw new r(
					'[textmode.js] texture() supports the built-in brightness conversion mode only. Use image() for custom conversion modes.',
					{ method: 'texture', conversionMode: i }
				);
			return this.Wc.createGeometryTextureSnapshot(this, this.Zc);
		}
		la() {}
		za() {
			(this.Wc.clearFrameOverrides(this.Zc), this.Yu.clearFrameOverrides());
		}
		Ja() {
			return this.Ku.hasFrameOverrides();
		}
		Zu() {}
		sl() {
			this.Ku.invalidateMaterials();
		}
		el() {
			return {
				sourceState: this.Wc.debugSnapshot,
				stackState: this.Yu.debugSnapshot,
				material: this.Ku.material,
				basePalette: this.Zc.basePalette,
				framePalette: this.Zc.framePalette,
			};
		}
		Wu(t, i) {
			const { width: s, height: e } = (function (t, i, s, e) {
				const r = Math.min(s / t, e / i);
				return {
					width: Math.max(1, Math.min(s, Math.round(t * r))),
					height: Math.max(1, Math.min(e, Math.round(i * r))),
					scale: r,
				};
			})(this.Xu, this.$u, t, i);
			((this.o = s), (this.u = e));
		}
		tl(t, i, s, e, r) {
			(this.Wc.setColor(t, this.Ba(), i, s, e, r), this.qu());
		}
		qu() {
			this.Ba() || this.Ku.invalidateMaterials();
		}
		Ba() {
			return this.j.Ha();
		}
		Ju(t, i) {
			const s = { method: 'brightnessRange', start: t, end: i };
			if (!Number.isFinite(t) || !Number.isFinite(i))
				throw new r('[textmode.js] brightness range values must be finite numbers.', s);
			if (t < 0 || t > 255 || i < 0 || i > 255)
				throw new r('[textmode.js] brightness range values must be between 0 and 255.', s);
			if (t > i) throw new r('[textmode.js] brightness range start must be less than or equal to end.', s);
		}
	},
	Wi = class t extends Ki {
		constructor(t, i, s, e, r, n, h, o, a) {
			super(t, i, s, e, r, n, h, o, a);
		}
		static rl(i, s, e, r, n, h) {
			const o = i.context,
				{ texture: a, width: c, height: u } = _t(o, e);
			return new t(o, i, a, s, c, u, r, n, h);
		}
	},
	Zi = class {
		nl;
		hl;
		ol = null;
		al = 0;
		cl = null;
		ul = null;
		ll = !0;
		fl = 0;
		dl = 0;
		_l = [];
		pl = 10;
		ml = 0;
		vl = 0;
		yl = -1;
		constructor(t = 60) {
			((this.hl = t), (this.nl = 1e3 / t));
		}
		wl(t, i) {
			if (((this.cl = t), void 0 !== i && (this.ul = i), !this.bl())) return;
			if ((-1 === this.yl && (this.yl = performance.now()), null !== this.ol)) return;
			this.al = performance.now();
			const s = (t) => {
				if (!this.bl()) return void (this.ol = null);
				const i = 'number' == typeof t ? t : performance.now(),
					e = i - this.al;
				(e >= this.nl && (this.cl?.(), (this.al = i - (e % this.nl))),
					this.bl() ? (this.ol = requestAnimationFrame(s)) : (this.ol = null));
			};
			this.ol = requestAnimationFrame(s);
		}
		Ml() {
			null !== this.ol && (cancelAnimationFrame(this.ol), (this.ol = null));
		}
		Al() {
			this.ll && ((this.ll = !1), this.bl() || this.Ml());
		}
		Cl(t) {
			this.ll || ((this.ll = !0), this.wl(t));
		}
		xl(t, i) {
			if (void 0 === t) return this.fl;
			((this.hl = t), (this.nl = 1e3 / t), null !== this.ol && i && (this.Ml(), this.wl(i)));
		}
		Sl() {
			const t = performance.now();
			if (this.dl > 0) {
				const i = t - this.dl;
				((this.ml = i), this._l.push(i), this._l.length > this.pl && this._l.shift());
				const s = this._l.reduce((t, i) => t + i, 0) / this._l.length;
				this.fl = 1e3 / s;
			}
			this.dl = t;
		}
		El(t) {
			((this.hl = t), (this.nl = 1e3 / t));
		}
		bl() {
			return this.ll || !0 === this.ul?.();
		}
		Fl() {
			this.vl++;
		}
		get Tl() {
			return -1 === this.yl ? 0 : performance.now() - this.yl;
		}
		set Tl(t) {
			this.yl = performance.now() - t;
		}
		get Pl() {
			return this.Tl / 1e3;
		}
		set Pl(t) {
			this.Tl = 1e3 * t;
		}
	};
function qi(t, i, s) {
	return t ? t.P(i, s) : { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY };
}
var Ji = class {
		Ll = [];
		Dl(t, i, s, e) {
			const r = s;
			(void 0 === e ? t.addEventListener(i, r) : t.addEventListener(i, r, e),
				this.Ll.push({ target: t, type: i, listener: r, capture: 'boolean' == typeof e ? e : e?.capture }));
		}
		kl() {
			for (let t = this.Ll.length - 1; t >= 0; t -= 1) {
				const { target: i, type: s, listener: e, capture: r } = this.Ll[t];
				void 0 === r ? i.removeEventListener(s, e) : i.removeEventListener(s, e, r);
			}
			this.Ll = [];
		}
	},
	ts = ['keyPressed', 'keyTyped', 'keyReleased'],
	is = [
		'mouseClicked',
		'doubleClicked',
		'mousePressed',
		'mouseReleased',
		'mouseMoved',
		'mouseDragged',
		'mouseScrolled',
	],
	ss = ['touchStarted', 'touchMoved', 'touchEnded', 'touchCancelled'],
	es = ['tap', 'doubleTap', 'longPress', 'swipe', 'pinch', 'rotateGesture'],
	rs = [
		'gamepadConnected',
		'gamepadDisconnected',
		'gamepadButtonPressed',
		'gamepadButtonReleased',
		'gamepadAxisChanged',
	],
	ns = [...ts, ...is, ...ss, ...es, ...rs],
	hs = class {
		Ll = {};
		Rl(t, i) {
			const s = (this.Ll[t] ??= []),
				e = { fn: i, once: !1 };
			return (s.push(e), () => this.Bl(t, i));
		}
		Bl(t, i) {
			const s = this.Ll[t];
			if (!s) return;
			const e = s.findIndex((t) => t.fn === i);
			-1 !== e && s.splice(e, 1);
		}
		Il(t, i) {
			const s = (this.Ll[t] ??= []),
				e = { fn: i, once: !0 };
			return (s.push(e), () => this.Bl(t, i));
		}
		Ol(t, ...i) {
			const s = this.Ll[t];
			if (!s || 0 === s.length) return;
			const e = s.slice();
			for (const r of e) {
				if (r.once) {
					const t = s.indexOf(r);
					-1 !== t && s.splice(t, 1);
				}
				r.fn(...i);
			}
		}
		Nl(t) {
			const i = this.Ll[t];
			return !!i && i.length > 0;
		}
		kl(t) {
			void 0 !== t ? delete this.Ll[t] : (this.Ll = {});
		}
	},
	os = class {
		p;
		Ql;
		zl = { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY };
		Hl = { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY };
		Gl = { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY };
		jl = { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY };
		Vl = { x: 0, y: 0 };
		Xl = { x: 0, y: 0 };
		$l = !1;
		Yl = null;
		Kl = 0;
		Ll = new Ji();
		Wl = !1;
		Zl;
		constructor(t, i, s) {
			((this.p = t), (this.Ql = i), (this.Zl = s));
		}
		ql(t) {
			const i = performance.now() + Math.max(0, t);
			i > this.Kl && (this.Kl = i);
		}
		Jl() {
			return performance.now() < this.Kl;
		}
		tf(t) {
			this.p.canvas.style.cursor = null == t || '' === t ? '' : t;
		}
		if() {
			const t = this.p.canvas;
			return 'function' == typeof t.requestPointerLock && (t.requestPointerLock(), !0);
		}
		sf() {
			this.ef() && 'function' == typeof document.exitPointerLock && document.exitPointerLock();
		}
		rf() {
			if (this.Wl) return;
			const t = this.p.canvas;
			(this.Ll.Dl(
				t,
				'mousemove',
				(t) => {
					(this.nf(t), this.hf(t));
				},
				{ passive: !0 }
			),
				this.Ll.Dl(
					t,
					'mouseleave',
					() => {
						((this.Hl = { ...this.zl }),
							(this.zl.x = Number.NEGATIVE_INFINITY),
							(this.zl.y = Number.NEGATIVE_INFINITY),
							(this.Yl = null));
					},
					{ passive: !0 }
				),
				this.Ll.Dl(
					t,
					'mousedown',
					(t) => {
						(this.nf(t), this.af(t));
					},
					{ passive: !0 }
				),
				this.Ll.Dl(
					t,
					'mouseup',
					(t) => {
						(this.nf(t), this.cf(t));
					},
					{ passive: !0 }
				),
				this.Ll.Dl(
					t,
					'click',
					(t) => {
						(this.nf(t), this.uf(t));
					},
					{ passive: !0 }
				),
				this.Ll.Dl(
					t,
					'dblclick',
					(t) => {
						(this.nf(t), this.lf(t));
					},
					{ passive: !0 }
				),
				this.Ll.Dl(
					t,
					'wheel',
					(t) => {
						(this.nf(t), this.ff(t));
					},
					{ passive: !1 }
				),
				this.Ll.Dl(
					window,
					'mouseup',
					() => {
						this.$l = !1;
					},
					{ passive: !0 }
				),
				this.Ll.Dl(window, 'blur', () => {
					this.$l = !1;
				}),
				(this.Wl = !0));
		}
		df() {
			this.Wl &&
				(this.Ll.kl(),
				(this.Wl = !1),
				this.sf(),
				(this.$l = !1),
				(this.Vl = { x: 0, y: 0 }),
				(this.Xl = { x: 0, y: 0 }));
		}
		_f() {
			if (this.Wl)
				try {
					if (this.Yl) {
						const t = new MouseEvent('mousemove', {
							clientX: this.Yl.x,
							clientY: this.Yl.y,
							bubbles: !1,
							cancelable: !1,
						});
						this.nf(t);
					}
				} catch (t) {
					((this.zl.x = Number.NEGATIVE_INFINITY), (this.zl.y = Number.NEGATIVE_INFINITY));
				}
		}
		pf() {
			return { x: this.zl.x, y: this.zl.y };
		}
		mf() {
			return { x: this.Gl.x, y: this.Gl.y };
		}
		vf() {
			return this.Vl.x;
		}
		gf() {
			return this.Vl.y;
		}
		yf() {
			return this.$l;
		}
		wf() {
			((this.Gl = { ...this.jl }),
				(this.jl = { ...this.zl }),
				(this.Vl = { ...this.Xl }),
				(this.Xl = { x: 0, y: 0 }));
		}
		bf(t, i = {}) {
			return { position: { ...this.zl }, previousPosition: { ...this.Hl }, originalEvent: t, ...i };
		}
		hf(t) {
			this.Jl() ||
				(this.Mf(t)
					? this.Zl.Ol('mouseDragged', this.bf(t, { button: this.Af(t) }))
					: this.Zl.Ol('mouseMoved', this.bf(t)));
		}
		af(t) {
			this.Jl() || ((this.$l = !0), this.Zl.Ol('mousePressed', this.bf(t, { button: t.button })));
		}
		cf(t) {
			this.Jl() || ((this.$l = !1), this.Zl.Ol('mouseReleased', this.bf(t, { button: t.button })));
		}
		uf(t) {
			this.Jl() || this.Zl.Ol('mouseClicked', this.bf(t, { button: t.button }));
		}
		lf(t) {
			this.Jl() || this.Zl.Ol('doubleClicked', this.bf(t, { button: t.button }));
		}
		ff(t) {
			this.Jl() || this.Zl.Ol('mouseScrolled', this.bf(t, { delta: { x: t.deltaX, y: t.deltaY } }));
		}
		nf(t) {
			const i = this.Ql();
			if (
				((this.Hl = { ...this.zl }),
				t instanceof MouseEvent && 'mousemove' === t.type && this.Cf(t),
				t instanceof MouseEvent && 'mousemove' === t.type && this.ef())
			)
				return;
			this.Yl = { x: t.clientX, y: t.clientY };
			const s = qi(i, t.clientX, t.clientY);
			((this.zl.x = s.x), (this.zl.y = s.y));
		}
		Mf(t) {
			return 0 !== t.buttons;
		}
		Af(t) {
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
		Cf(t) {
			if (this.ef()) return ((this.Xl.x += t.movementX), void (this.Xl.y += t.movementY));
			this.Yl && ((this.Xl.x += t.clientX - this.Yl.x), (this.Xl.y += t.clientY - this.Yl.y));
		}
		ef() {
			return document.pointerLockElement === this.p.canvas;
		}
	},
	as = class {
		xf = /* @__PURE__ */ new Map();
		Sf = null;
		Ef = null;
		Ll = new Ji();
		Wl = !1;
		Zl;
		Ff = {
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
			this.Zl = t;
		}
		rf() {
			this.Wl ||
				(this.Ll.Dl(
					window,
					'keydown',
					(t) => {
						this.Tf(t);
					},
					{ passive: !1 }
				),
				this.Ll.Dl(
					window,
					'keyup',
					(t) => {
						this.Pf(t);
					},
					{ passive: !1 }
				),
				(this.Wl = !0));
		}
		df() {
			this.Wl && (this.Ll.kl(), (this.Wl = !1), this.xf.clear(), (this.Sf = null), (this.Ef = null));
		}
		Lf(t) {
			const i = this.Df(t);
			return (this.xf.get(t) || this.xf.get(i))?.isPressed || !1;
		}
		kf() {
			return this.Sf;
		}
		Rf() {
			return this.Ef;
		}
		Bf() {
			const t = [];
			for (const [i, s] of this.xf) s.isPressed && t.push(i);
			return t;
		}
		If() {
			return { ctrl: this.Lf('Control'), shift: this.Lf('Shift'), alt: this.Lf('Alt'), meta: this.Lf('Meta') };
		}
		Of() {
			(this.xf.clear(), (this.Sf = null), (this.Ef = null));
		}
		Tf(t) {
			const i = t.key,
				s = Date.now();
			this.xf.has(i) || this.xf.set(i, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
			const e = this.xf.get(i);
			e.isPressed ||
				((e.isPressed = !0),
				(e.lastPressTime = s),
				(this.Sf = i),
				this.Zl.Ol('keyPressed', this.bf(i, !0, t)),
				this.Nf(t) && this.Zl.Ol('keyTyped', this.bf(i, !0, t)));
		}
		bf(t, i, s) {
			return {
				key: t,
				keyCode: s.keyCode,
				ctrlKey: s.ctrlKey,
				shiftKey: s.shiftKey,
				altKey: s.altKey,
				metaKey: s.metaKey,
				isPressed: i,
				originalEvent: s,
			};
		}
		Pf(t) {
			const i = t.key,
				s = Date.now();
			this.xf.has(i) || this.xf.set(i, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
			const e = this.xf.get(i);
			((e.isPressed = !1), (e.lastReleaseTime = s), (this.Ef = i), this.Zl.Ol('keyReleased', this.bf(i, !1, t)));
		}
		Df(t) {
			return this.Ff[t] || t.toLowerCase();
		}
		Nf(t) {
			return !(t.ctrlKey || t.altKey || t.metaKey) && 'Dead' !== t.key && 1 === Array.from(t.key).length;
		}
	},
	cs = class {
		Qf;
		zf;
		Hf = /* @__PURE__ */ new Map();
		Gf = null;
		jf = 320;
		Vf = 350;
		Xf = 10;
		$f = 550;
		Yf = 14;
		Kf = 48;
		Wf = 650;
		Zf = 0.02;
		qf = 2;
		Jf = 0;
		td = null;
		constructor(t, i) {
			((this.Qf = t), (this.zf = i));
		}
		bh() {
			(this.Hf.forEach((t) => {
				null !== t.timer && window.clearTimeout(t.timer);
			}),
				this.Hf.clear(),
				(this.Gf = null),
				(this.Jf = 0),
				(this.td = null));
		}
		sd(t, i) {
			const s = { timer: null, fired: !1 };
			((s.timer = window.setTimeout(() => {
				this.Hf.has(t.id) &&
					((s.fired = !0),
					this.zf.Ol('longPress', {
						touch: this.ed(t.lastPosition),
						duration: performance.now() - t.startTime,
						originalEvent: i,
					}));
			}, this.$f)),
				this.Hf.set(t.id, s));
		}
		rd(t, i) {
			const s = this.Hf.get(t.id);
			s &&
				i &&
				z(i.clientX, i.clientY, t.lastPosition.clientX, t.lastPosition.clientY) > this.Yf &&
				null !== s.timer &&
				(window.clearTimeout(s.timer), (s.timer = null));
		}
		nd(t, i) {
			const s = this.Hf.get(t.id);
			(s && null !== s.timer && (window.clearTimeout(s.timer), (s.timer = null)),
				this.hd(t, i, s?.fired ?? !1),
				this.Hf.delete(t.id));
		}
		od(t) {
			const i = this.Hf.get(t);
			(i && null !== i.timer && window.clearTimeout(i.timer), this.Hf.delete(t));
		}
		ad(t) {
			if (2 !== t.size) return void (this.Gf = null);
			const [i, s] = Array.from(t.values()),
				e = [i.id, s.id];
			if (this.Gf && this.Gf.ids[0] === e[0] && this.Gf.ids[1] === e[1]) return;
			const r = z(i.x, i.y, s.x, s.y),
				n = Q(i.clientX, i.clientY, s.clientX, s.clientY);
			this.Gf = { ids: e, initialDistance: Math.max(r, 1e-4), initialAngle: n, lastScale: 1, lastRotation: 0 };
		}
		ud(t, i) {
			if ((this.ad(t), !this.Gf)) return;
			const [s, e] = this.Gf.ids,
				r = t.get(s),
				n = t.get(e);
			if (!r || !n) return;
			const h = z(r.x, r.y, n.x, n.y) / this.Gf.initialDistance,
				o = h - this.Gf.lastScale;
			Math.abs(o) > this.Zf &&
				(this.zf.Ol('pinch', {
					touches: [this.ed(r), this.ed(n)],
					scale: h,
					deltaScale: o,
					center: this.ld(r, n),
					originalEvent: i,
				}),
				(this.Gf.lastScale = h));
			let a = Q(r.clientX, r.clientY, n.clientX, n.clientY) - this.Gf.initialAngle;
			a = ((a + 180) % 360) - 180;
			const c = a - this.Gf.lastRotation;
			Math.abs(c) > this.qf &&
				(this.zf.Ol('rotateGesture', {
					touches: [this.ed(r), this.ed(n)],
					rotation: a,
					deltaRotation: c,
					center: this.ld(r, n),
					originalEvent: i,
				}),
				(this.Gf.lastRotation = a));
		}
		ld(t, i) {
			const s = (t.clientX + i.clientX) / 2,
				e = (t.clientY + i.clientY) / 2,
				r = this.Qf(s, e);
			return { x: r.x, y: r.y };
		}
		hd(t, i, s) {
			const e = performance.now(),
				r = e - t.startTime,
				n = t.lastPosition.clientX - t.startPosition.clientX,
				h = t.lastPosition.clientY - t.startPosition.clientY,
				o = Math.hypot(n, h);
			if (!s && r <= this.jf && o <= this.Xf)
				this.fd(t.lastPosition, e)
					? this.zf.Ol('doubleTap', { touch: this.ed(t.lastPosition), taps: 2, originalEvent: i })
					: this.zf.Ol('tap', { touch: this.ed(t.lastPosition), taps: 1, originalEvent: i });
			else if (!s && r <= this.Wf && o >= this.Kf) {
				const s = Math.max(o, 1e-4),
					e = { x: n / s, y: h / s },
					a = { x: n / r, y: h / r };
				this.zf.Ol('swipe', {
					touch: this.ed(t.lastPosition),
					direction: e,
					distance: s,
					velocity: a,
					originalEvent: i,
				});
			}
			((this.Jf = e), (this.td = this.ed(t.lastPosition)));
		}
		fd(t, i) {
			return (
				!!this.td &&
				!(i - this.Jf > this.Vf) &&
				z(t.clientX, t.clientY, this.td.clientX, this.td.clientY) <= this.Xf
			);
		}
		ed(t) {
			return { ...t };
		}
	},
	us = class {
		p;
		dd;
		Ql;
		_d;
		pd = /* @__PURE__ */ new Map();
		md = /* @__PURE__ */ new Map();
		vd = /* @__PURE__ */ new Map();
		gd;
		yd;
		Ll = new Ji();
		Wl = !1;
		Zl;
		wd = 600;
		constructor(t, i, s, e) {
			((this.p = t),
				(this.Ql = i),
				(this.Zl = s),
				(this.dd = e),
				(this._d = new cs((t, i) => qi(this.Ql(), t, i), this.Zl)));
			const r = this.p.canvas;
			((this.gd = r.style.touchAction),
				(this.yd = r.style.userSelect),
				r.style.touchAction || (r.style.touchAction = 'none'),
				r.style.userSelect || (r.style.userSelect = 'none'));
		}
		rf() {
			if (this.Wl) return;
			const t = this.p.canvas;
			(this.Ll.Dl(
				t,
				'touchstart',
				(t) => {
					this.bd(t);
				},
				{ passive: !1 }
			),
				this.Ll.Dl(
					t,
					'touchmove',
					(t) => {
						this.Md(t);
					},
					{ passive: !1 }
				),
				this.Ll.Dl(
					t,
					'touchend',
					(t) => {
						this.Ad(t);
					},
					{ passive: !1 }
				),
				this.Ll.Dl(
					t,
					'touchcancel',
					(t) => {
						this.Cd(t);
					},
					{ passive: !1 }
				),
				(this.Wl = !0));
		}
		df() {
			if (!this.Wl) return;
			const t = this.p.canvas;
			(this.Ll.kl(),
				(this.Wl = !1),
				this.pd.clear(),
				this.md.clear(),
				this.vd.clear(),
				this._d.bh(),
				(t.style.touchAction = this.gd),
				(t.style.userSelect = this.yd));
		}
		_f() {
			if (!this.Ql() || 0 === this.pd.size) return;
			const t = /* @__PURE__ */ new Map();
			for (const i of this.pd.values()) {
				const s = this.Qf(i.clientX, i.clientY, i.id, i);
				t.set(i.id, s);
				const e = this.vd.get(i.id);
				e && (e.lastPosition = s);
			}
			this.pd = t;
		}
		xd() {
			return Array.from(this.pd.values()).map((t) => ({ ...t }));
		}
		bd(t) {
			if (!this.Ql()) return;
			(t.preventDefault(), this.dd?.ql(this.wd));
			const i = performance.now(),
				s = this.Sd(t.changedTouches);
			for (const e of s) {
				const s = this.pd.get(e.id);
				(s && this.md.set(e.id, this.ed(s)), this.pd.set(e.id, e));
				const r = { id: e.id, startPosition: e, lastPosition: e, startTime: i, lastTime: i };
				(this.vd.set(e.id, r), this._d.sd(r, t), this.Zl.Ol('touchStarted', this.Ed(e, t, void 0, i)));
			}
			this._d.ad(this.pd);
		}
		Md(t) {
			if (!this.Ql()) return;
			(t.preventDefault(), this.dd?.ql(this.wd));
			const i = performance.now(),
				s = this.Sd(t.changedTouches);
			for (const e of s) {
				const s = this.pd.get(e.id),
					r = s ? this.ed(s) : void 0;
				(r && this.md.set(e.id, r), this.pd.set(e.id, e));
				const n = this.vd.get(e.id);
				(n && ((n.lastPosition = e), (n.lastTime = i), this._d.rd(n, r)),
					this.Zl.Ol('touchMoved', this.Ed(e, t, r, i)));
			}
			this._d.ud(this.pd, t);
		}
		Ad(t) {
			if (!this.Ql()) return;
			t.preventDefault();
			const i = performance.now(),
				s = this.Sd(t.changedTouches);
			for (const e of s) {
				const s = this.pd.get(e.id),
					r = s ? this.ed(s) : void 0,
					n = this.vd.get(e.id);
				(this.Zl.Ol('touchEnded', this.Ed(e, t, r, i)),
					n && this._d.nd(n, t),
					this.vd.delete(e.id),
					this.md.delete(e.id),
					this.pd.delete(e.id));
			}
			this._d.ad(this.pd);
		}
		Cd(t) {
			if (!this.Ql()) return;
			t.preventDefault();
			const i = performance.now(),
				s = this.Sd(t.changedTouches);
			for (const e of s) {
				const s = this.pd.get(e.id),
					r = s ? this.ed(s) : void 0;
				(this.Zl.Ol('touchCancelled', this.Ed(e, t, r, i)),
					this._d.od(e.id),
					this.vd.delete(e.id),
					this.md.delete(e.id),
					this.pd.delete(e.id));
			}
			this._d.ad(this.pd);
		}
		Sd(t) {
			const i = [];
			for (let s = 0; s < t.length; s += 1) {
				const e = t.item(s);
				e && i.push(this.Fd(e));
			}
			return i;
		}
		Fd(t) {
			return this.Qf(t.clientX, t.clientY, t.identifier, {
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
		Qf(t, i, s, e) {
			const r = qi(this.Ql(), t, i);
			return {
				id: s,
				x: r.x,
				y: r.y,
				clientX: t,
				clientY: i,
				pressure: e.pressure,
				radiusX: e.radiusX,
				radiusY: e.radiusY,
				rotationAngle: e.rotationAngle,
			};
		}
		Ed(t, i, s, e) {
			const r = this.vd.get(t.id),
				n = Array.from(this.md.values()).map((t) => this.ed(t)),
				h = Array.from(this.pd.values()).map((t) => this.ed(t)),
				o = this.Sd(i.changedTouches);
			return {
				touch: this.ed(t),
				previousTouch: s ? this.ed(s) : void 0,
				touches: h,
				previousTouches: n,
				changedTouches: o,
				deltaTime: r ? e - r.lastTime : 0,
				originalEvent: i,
			};
		}
		ed(t) {
			return { ...t };
		}
	},
	ls = {
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
	fs = { leftStickX: 0, leftStickY: 1, rightStickX: 2, rightStickY: 3 },
	ds = new Map(Object.entries(ls).map(([t, i]) => [i, t])),
	_s = new Map(Object.entries(fs).map(([t, i]) => [i, t]));
function ps(t, i) {
	const s = Array.from(t.buttons, (t) => ({
			pressed: Boolean(t.pressed),
			touched: void 0 === t.touched ? void 0 : Boolean(t.touched),
			value: t.value,
		})),
		e = Array.from(t.axes, (t) => t),
		r = 'standard' === t.mapping ? 'standard' : '',
		n = {
			index: t.index,
			id: t.id,
			connected: Boolean(t.connected),
			mapping: r,
			timestamp: t.timestamp,
			buttons: s,
			axes: e,
		};
	return (
		'standard' === r &&
			(n.standard = (function (t, i, s) {
				const e = t[ls.home];
				return {
					faceButtons: {
						south: ms(t, ls.south),
						east: ms(t, ls.east),
						west: ms(t, ls.west),
						north: ms(t, ls.north),
					},
					shoulders: { l1: ms(t, ls.l1), r1: ms(t, ls.r1), l2: ms(t, ls.l2), r2: ms(t, ls.r2) },
					center: {
						select: ms(t, ls.select),
						start: ms(t, ls.start),
						leftStickPress: ms(t, ls.leftStickPress),
						rightStickPress: ms(t, ls.rightStickPress),
						...(e ? { home: ms(t, ls.home) } : {}),
					},
					dpad: {
						up: ms(t, ls.dpadUp),
						down: ms(t, ls.dpadDown),
						left: ms(t, ls.dpadLeft),
						right: ms(t, ls.dpadRight),
					},
					leftStick: vs(i, fs.leftStickX, fs.leftStickY, s),
					rightStick: vs(i, fs.rightStickX, fs.rightStickY, s),
				};
			})(s, e, i)),
		n
	);
}
function ms(t, i) {
	return t[i] ?? { pressed: !1, value: 0 };
}
function vs(t, i, s, e) {
	const r = t[i] ?? 0,
		n = t[s] ?? 0,
		h = Math.hypot(r, n);
	return h <= e ? { x: 0, y: 0, magnitude: 0 } : { x: r, y: n, magnitude: h };
}
var gs = { axisDeadzone: 0.15, axisChangeEpsilon: 0.01, buttonPressThreshold: 0.5, buttonReleaseThreshold: 0.45 },
	ys = class {
		Td;
		Pd = [];
		Ld = /* @__PURE__ */ new Map();
		Dd = /* @__PURE__ */ new Map();
		Ll = new Ji();
		Wl = !1;
		kd = /* @__PURE__ */ new Set();
		Rd = /* @__PURE__ */ new Set();
		Zl;
		constructor(t, i = {}) {
			((this.Td = { ...gs, ...i }), (this.Zl = t));
		}
		rf() {
			this.Wl ||
				(this.Ll.Dl(window, 'gamepadconnected', (t) => {
					const i = t.gamepad;
					i && (this.kd.add(i.index), this.Rd.delete(i.index));
				}),
				this.Ll.Dl(window, 'gamepaddisconnected', (t) => {
					const i = t.gamepad;
					i && (this.Rd.add(i.index), this.kd.delete(i.index));
				}),
				(this.Wl = !0));
		}
		df() {
			this.Wl &&
				(this.Ll.kl(),
				(this.Wl = !1),
				this.kd.clear(),
				this.Rd.clear(),
				(this.Pd = []),
				this.Ld.clear(),
				this.Dd.clear());
		}
		wf() {
			const t = /* @__PURE__ */ new Map();
			for (const i of this.Bd()) {
				if (!i || !i.connected) continue;
				const s = ps(i, this.Td.axisDeadzone);
				t.set(s.index, s);
			}
			for (const [i, s] of this.Ld)
				t.has(i) || this.Zl.Ol('gamepadDisconnected', { gamepad: { ...s, connected: !1 } });
			for (const [i, s] of t) this.Ld.has(i) || this.Zl.Ol('gamepadConnected', { gamepad: s });
			for (const [i, s] of t) {
				const t = this.Ld.get(i);
				t && (this.Id(s, t), this.Od(s, t));
			}
			((this.Dd = this.Ld),
				(this.Ld = t),
				(this.Pd = Array.from(t.values()).sort((t, i) => t.index - i.index)),
				this.kd.clear(),
				this.Rd.clear());
		}
		Nd() {
			return this.Pd;
		}
		Qd(t) {
			return this.Ld.get(t);
		}
		zd(t, i) {
			if ('standard' === i)
				return (function (t, i) {
					if ('standard' === i) return ds.get(t);
				})(t, i);
		}
		Hd(t, i) {
			if ('standard' === i)
				return (function (t, i) {
					if ('standard' === i) return _s.get(t);
				})(t, i);
		}
		Id(t, i) {
			const s = Math.max(t.buttons.length, i.buttons.length);
			for (let e = 0; e < s; e++) {
				const s = t.buttons[e] ?? { pressed: !1, value: 0 },
					r = i.buttons[e] ?? { pressed: !1, value: 0 },
					n = r.value >= this.Td.buttonPressThreshold;
				s.value >= this.Td.buttonPressThreshold &&
					!n &&
					this.Zl.Ol('gamepadButtonPressed', {
						gamepad: t,
						buttonIndex: e,
						button: s,
						previousButton: r,
						standardButtonName: this.zd(e, t.mapping),
					});
				const h = r.value >= this.Td.buttonReleaseThreshold;
				s.value >= this.Td.buttonReleaseThreshold ||
					!h ||
					this.Zl.Ol('gamepadButtonReleased', {
						gamepad: t,
						buttonIndex: e,
						button: s,
						previousButton: r,
						standardButtonName: this.zd(e, t.mapping),
					});
			}
		}
		Od(t, i) {
			const s = Math.max(t.axes.length, i.axes.length);
			for (let e = 0; e < s; e++) {
				const s = t.axes[e] ?? 0,
					r = i.axes[e] ?? 0,
					n = s - r;
				(Math.abs(r) <= this.Td.axisDeadzone != Math.abs(s) <= this.Td.axisDeadzone ||
					Math.abs(n) >= this.Td.axisChangeEpsilon) &&
					this.Zl.Ol('gamepadAxisChanged', {
						gamepad: t,
						axisIndex: e,
						value: s,
						previousValue: r,
						delta: n,
						standardAxisName: this.Hd(e, t.mapping),
					});
			}
		}
		Bd() {
			const t = navigator;
			if ('function' != typeof t.getGamepads) return [];
			const i = t.getGamepads.call(navigator);
			return Array.from(i ?? []);
		}
	},
	ws = class {
		Gd;
		jd = /* @__PURE__ */ new Map();
		Vd = /* @__PURE__ */ new Map();
		Xd = /* @__PURE__ */ new Map();
		$d = /* @__PURE__ */ new Map();
		Yd = /* @__PURE__ */ new Map();
		Kd = /* @__PURE__ */ new Map();
		Wd = /* @__PURE__ */ new Map();
		constructor(t) {
			this.Gd = t;
		}
		Zd(t, i) {
			return this.qd(this.jd, t, i);
		}
		Jd(t, i) {
			return this.qd(this.Vd, t, i);
		}
		t_(t, i) {
			return this.qd(this.Xd, t, i);
		}
		i_(t, i) {
			return this.qd(this.$d, t, i);
		}
		s_(t, i) {
			return this.qd(this.Yd, t, i);
		}
		e_(t, i) {
			return this.qd(this.Kd, t, i);
		}
		r_(t, i) {
			return this.qd(this.Wd, t, i);
		}
		n_() {
			this.h_(this.jd, (t) => t());
		}
		o_() {
			this.h_(this.Vd, (t) => t());
		}
		a_(t) {
			this.h_(this.Xd, (i) => i(t));
		}
		Js(t) {
			this.h_(this.$d, (i) => i(t));
		}
		ne(t) {
			this.h_(this.Yd, (i) => i(t));
		}
		async c_() {
			await this.u_(this.Kd, (t) => t());
		}
		async l_() {
			await this.u_(this.Wd, (t) => t());
		}
		f_(t) {
			(this.jd.delete(t),
				this.Vd.delete(t),
				this.Xd.delete(t),
				this.$d.delete(t),
				this.Yd.delete(t),
				this.Kd.delete(t),
				this.Wd.delete(t));
		}
		qd(t, i, s) {
			const e = t.get(i) ?? /* @__PURE__ */ new Set();
			return (
				e.add(s),
				t.set(i, e),
				() => {
					const e = t.get(i);
					e && (e.delete(s), 0 === e.size && t.delete(i));
				}
			);
		}
		h_(t, i) {
			for (const s of this.Gd) {
				const e = t.get(s);
				e && e.forEach(i);
			}
		}
		async u_(t, i) {
			for (const s of this.Gd) {
				const e = t.get(s);
				if (e) for (const t of e) await i(t);
			}
		}
	},
	bs = class {
		d_;
		__;
		p_ = /* @__PURE__ */ new Map();
		constructor(t) {
			((this.d_ = t.targetName), (this.__ = t.getPrototype));
		}
		m_(t, i, s) {
			let e = this.p_.get(t);
			e || ((e = /* @__PURE__ */ new Map()), this.p_.set(t, e));
			for (const [n, h] of this.p_)
				if (n !== t && h.has(i))
					throw new r(
						`Plugin "${t}" attempted to register ${this.d_} method "${i}" which is already provided by plugin "${n}".`,
						{ plugin: t, method: i, conflictingPlugin: n }
					);
			(e.set(i, s), this.v_(i, s));
		}
		g_(t, i) {
			const s = this.p_.get(t);
			if (!s) return;
			s.delete(i);
			let e = !1;
			for (const [r, n] of this.p_)
				if (r !== t && n.has(i)) {
					e = !0;
					const t = n.get(i);
					this.v_(i, t);
					break;
				}
			(e || this.y_(i), 0 === s.size && this.p_.delete(t));
		}
		w_(t) {
			const i = this.p_.get(t);
			if (i) {
				for (const t of i.keys()) this.y_(t);
				this.p_.delete(t);
			}
		}
		v_(t, i) {
			const s = this.__();
			Object.defineProperty(s, t, { value: i, writable: !0, configurable: !0, enumerable: !1 });
		}
		y_(t) {
			const i = this.__(),
				s = Object.getOwnPropertyDescriptor(i, t);
			s && s.configurable && delete i[t];
		}
	},
	Ms = class {
		de;
		b_;
		M_;
		A_;
		constructor(t, i, s, e) {
			((this.de = t), (this.b_ = i), (this.M_ = s), (this.A_ = e));
		}
		C_(t) {
			const i = this.de,
				s = this.b_,
				e = this.M_,
				r = this.A_,
				n = {
					get canvas() {
						return i.p.canvas;
					},
					get targetCanvas() {
						return i.p.targetCanvas;
					},
					get width() {
						return i.p.width;
					},
					get height() {
						return i.p.height;
					},
					get ownsContext() {
						return i.p.ownsContext;
					},
				};
			return {
				get renderer() {
					return i.j;
				},
				get canvas() {
					return n;
				},
				get layerManager() {
					return i.layers;
				},
				get font() {
					return i.layers.base.font;
				},
				get glyphAtlas() {
					return i.layers.base.font;
				},
				get grid() {
					return i.layers.base.grid;
				},
				get drawFramebuffer() {
					return i.layers.base.drawFramebuffer;
				},
				get asciiFramebuffer() {
					return i.layers.base.asciiFramebuffer;
				},
				registerPreDrawHook: (i) => s.Zd(t, i),
				registerPostDrawHook: (i) => s.Jd(t, i),
				registerLayerDisposedHook: (i) => s.t_(t, i),
				registerLayerPreRenderHook: (i) => s.i_(t, i),
				registerLayerPostRenderHook: (i) => s.s_(t, i),
				registerPreSetupHook: (i) => s.e_(t, i),
				registerPostSetupHook: (i) => s.r_(t, i),
				extendLayer: (i, s) => {
					e.m_(t, i, s);
				},
				removeLayerExtension: (i) => {
					e.g_(t, i);
				},
				extendSource: (i, s) => {
					r.m_(t, i, s);
				},
				removeSourceExtension: (i) => {
					r.g_(t, i);
				},
			};
		}
	},
	As = class {
		x_ = /* @__PURE__ */ new Map();
		Gd = [];
		S_(t) {
			return this.x_.has(t);
		}
		Vu(t) {
			return this.x_.get(t);
		}
		Dl(t) {
			(this.x_.set(t.name, t), this.Gd.push(t.name));
		}
		E_(t) {
			this.x_.delete(t);
			const i = this.Gd.indexOf(t);
			-1 !== i && this.Gd.splice(i, 1);
		}
		F_() {
			return [...this.Gd];
		}
		U_() {
			return this.Gd;
		}
	},
	Cs = class {
		de;
		T_;
		b_;
		M_;
		A_;
		P_;
		constructor(t) {
			((this.de = t),
				(this.T_ = new As()),
				(this.b_ = new ws(this.T_.U_())),
				(this.M_ = new bs({
					targetName: 'layer',
					getPrototype: () => Object.getPrototypeOf(this.de.layers.base),
				})),
				(this.A_ = new bs({ targetName: 'source', getPrototype: () => Ki.prototype })),
				(this.P_ = new Ms(this.de, this.b_, this.M_, this.A_)));
		}
		L_(t) {
			for (const s of t) {
				if (this.T_.S_(s.name)) {
					console.warn(`[textmode.js] Plugin "${s.name}" is already installed.`);
					continue;
				}
				const t = this.D_(s.name);
				try {
					const i = s.install(this.de, t);
					i instanceof Promise &&
						i.catch((t) => {
							(console.error(`[textmode.js] Async plugin "${s.name}" installation error:`, t),
								this.k_(s.name));
						});
				} catch (i) {
					throw (this.k_(s.name), i);
				}
				this.T_.Dl(s);
			}
		}
		async R_(t) {
			for (const s of t) {
				if (this.T_.S_(s.name)) {
					console.warn(`[textmode.js] Plugin "${s.name}" is already installed.`);
					continue;
				}
				const t = this.D_(s.name);
				try {
					await s.install(this.de, t);
				} catch (i) {
					throw (this.k_(s.name), i);
				}
				this.T_.Dl(s);
			}
		}
		async B_(t) {
			const i = this.T_.Vu(t);
			if (!i) return;
			const s = this.D_(t);
			(i.uninstall && (await i.uninstall(this.de, s)), this.T_.E_(t), this.k_(t));
		}
		n_() {
			this.b_.n_();
		}
		o_() {
			this.b_.o_();
		}
		a_(t) {
			this.b_.a_(t);
		}
		Js(t) {
			this.b_.Js(t);
		}
		ne(t) {
			this.b_.ne(t);
		}
		async c_() {
			await this.b_.c_();
		}
		async l_() {
			await this.b_.l_();
		}
		async I_() {
			const t = this.T_.F_();
			for (const i of t) await this.B_(i);
		}
		D_(t) {
			return this.P_.C_(t);
		}
		k_(t) {
			(this.b_.f_(t), this.M_.w_(t), this.A_.w_(t));
		}
	},
	xs =
		'#version 300 es\nlayout(location=0)in vec2 A8;layout(location=1)in vec2 Ab;out vec2 v_uv;void main(){v_uv=Ab;gl_Position=vec4(A8,0.,1.);}',
	Ss =
		'#version 300 es\nprecision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){fragColor=texture(u_texture,v_uv);}',
	Es = ({ textmodifier: t }) => {
		const i = Math.floor(t.millis / 120) % 4;
		(t.background('#222323'),
			t.charColor('#F8F8F8'),
			t.cellColor('#222323'),
			ht(t, '|/-\\'[i], 0),
			t.charColor('#C0C0C0'),
			ht(t, 'LOADING...', 5));
	},
	Fs = { transition: 'fade', transitionDuration: 500 },
	Us = class extends nt {
		Wt;
		ge = 'active';
		O_ = 0;
		N_;
		constructor(t, i) {
			(super(t),
				(this.Wt = { ...Fs, ...(i ?? {}) }),
				'none' === this.Wt.transition && (this.Wt.transitionDuration = 0));
		}
		async kt() {
			this.Pt || (await super.kt(), this._e.opacity(1), this._e.show());
		}
		get Me() {
			return 'active' === this.ge || 'transitioning' === this.ge;
		}
		Q_() {
			this.Wt.transitionDuration > 0
				? (this.z_(), (this.O_ = performance.now()), this.Pt && (this._e.opacity(1), this._e.show()))
				: (this.Pt && (this._e.opacity(0), this._e.hide()), this.H_(), this.G_());
		}
		j_(t) {
			this.N_ = t;
		}
		xe() {
			if ('transitioning' === this.ge && this.V_()) return (this.X_(), void this.G_());
			this.Se();
		}
		pe() {
			return new rt(this.de.j, { visible: !0, opacity: 1, fontSize: 16 });
		}
		G_() {
			this.N_ && this.N_();
		}
		V_() {
			if (!this.Pt) return !0;
			const t = this.Wt.transitionDuration;
			if (t <= 0) return (this._e.opacity(0), this._e.hide(), !0);
			const i = performance.now() - this.O_,
				s = Math.min(1, i / t);
			return (this._e.opacity(1 - s), s >= 1 && (this._e.hide(), !0));
		}
		Se() {
			if (!this.Pt) return;
			const t = { textmodifier: this.de, grid: this._e.grid };
			this.me(Es, t);
		}
		H_() {
			'disabled' !== this.ge && (this.ge = 'done');
		}
		z_() {
			'disabled' !== this.ge && (this.ge = 'transitioning');
		}
		X_() {
			'transitioning' === this.ge && (this.ge = 'done');
		}
	},
	Ts = /* @__PURE__ */ i({ LoadingLayerController: () => Us }),
	Ps = class {
		j;
		Y_;
		Rs;
		K_ = 0;
		constructor(t, i, s) {
			((this.j = t),
				(this.Y_ = t.rr(
					xs,
					'#version 300 es\nprecision highp float;uniform sampler2D Uh;uniform sampler2D U3;uniform vec2 U8;uniform vec2 Ug;uniform vec2 U2;uniform float Ui;uniform float Ul;uniform int U4;uniform bool Ub;uniform vec4 Uf;in vec2 v_uv;out vec4 fragColor;const int A=0;const int B=1;const int C=2;const int D=3;const int E=4;const int F=5;const int G=6;const int H=7;const int I=8;const int J=9;const int K=10;const int L=11;const int M=12;const int N=13;vec3 O(vec3 P,vec3 Q){return Q;}vec3 R(vec3 P,vec3 Q){return P+Q;}vec3 S(vec3 P,vec3 Q){return P*Q;}vec3 T(vec3 P,vec3 Q){return 1.-(1.-P)*(1.-Q);}vec3 U(vec3 P,vec3 Q){return max(P-Q,0.);}vec3 V(vec3 P,vec3 Q){return min(P,Q);}vec3 W(vec3 P,vec3 Q){return max(P,Q);}vec3 X(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,P));}vec3 Y(vec3 P,vec3 Q){return mix(P-(1.-2.*Q)*P*(1.-P),mix(P+(2.*Q-1.)*(P*(3.-2.*P)-P),P+(2.*Q-1.)*(sqrt(P)-P),step(0.25,P)),step(0.5,Q));}vec3 Z(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,Q));}vec3 a(vec3 P,vec3 Q){return mix(min(vec3(1.),P/max(1.-Q,0.0001)),vec3(1.),step(1.,Q));}vec3 b(vec3 P,vec3 Q){return mix(1.-min(vec3(1.),(1.-P)/max(Q,0.0001)),vec3(0.),step(Q,vec3(0.)));}vec3 c(vec3 P,vec3 Q){return abs(P-Q);}vec3 d(vec3 P,vec3 Q){return P+Q-2.*P*Q;}vec3 e(int f,vec3 P,vec3 Q){if(f==A)return O(P,Q);if(f==B)return R(P,Q);if(f==C)return S(P,Q);if(f==D)return T(P,Q);if(f==E)return U(P,Q);if(f==F)return V(P,Q);if(f==G)return W(P,Q);if(f==H)return X(P,Q);if(f==I)return Y(P,Q);if(f==J)return Z(P,Q);if(f==K)return a(P,Q);if(f==L)return b(P,Q);if(f==M)return c(P,Q);if(f==N)return d(P,Q);return O(P,Q);}void main(){vec4 g=texture(U3,v_uv);vec2 h=v_uv*U8;vec2 i=h-U2;vec2 j=Ug*0.5;vec2 k=i-j;float l=cos(-Ul);float m=sin(-Ul);vec2 n=vec2(k.x*l-k.y*m,k.x*m+k.y*l);i=n+j;bool o=any(lessThan(i,vec2(0.)))||any(greaterThanEqual(i,Ug));vec4 p;if(o){if(!Ub){fragColor=g;return;}p=Uf;}else{vec2 q=(floor(i)+0.5)/Ug;p=texture(Uh,q);}float r=p.a*Ui;if(r<=0.){fragColor=g;return;}vec3 s=e(U4,g.rgb,p.rgb);vec3 t=mix(g.rgb,s,r);float u=g.a+r*(1.-g.a);fragColor=vec4(t,u);}'
				)),
				(this.Rs = [this.j.W(i, s, 1, { depth: !1 }), this.j.W(i, s, 1, { depth: !1 })]));
		}
		W_(t) {
			const { base: i, targetFramebuffer: s, backgroundColor: e, layers: r, canvasWidth: n, canvasHeight: h } = t,
				o = this.j.wc(),
				a = this.j.bc();
			(this.j.gc(!1), this.j.yc(!1));
			const c = this.Rs[0];
			(c.begin(),
				this.j.Rh(...e),
				c.end(),
				(this.K_ = 0),
				i.layer.Ms &&
					this.Z_(
						i.texture,
						n,
						h,
						i.width,
						i.height,
						i.layer.As,
						i.offsetX,
						i.offsetY,
						i.layer.Ss,
						R.NORMAL,
						i.canvasBackgroundColor
					));
			for (const u of r) {
				const t = u.layer;
				t.Ms &&
					this.Z_(
						u.texture,
						n,
						h,
						u.width,
						u.height,
						t.As,
						u.offsetX,
						u.offsetY,
						t.Ss,
						t.Cs,
						u.canvasBackgroundColor
					);
			}
			(this.q_(s, n, h), this.j.yc(a), this.j.gc(o));
		}
		Z_(t, i, s, e, r, n, h, o, a, c, u) {
			const l = this.Rs[this.K_],
				f = 0 === this.K_ ? 1 : 0,
				d = this.Rs[f],
				_ = O(a);
			(d.begin(),
				this.j.he(this.Y_),
				this.Y_.oe({
					Uh: t,
					U3: l.textures[0],
					U8: [i, s],
					Ug: [e, r],
					U2: [h, o],
					Ui: n,
					Ul: _,
					U4: c,
					Ub: void 0 !== u,
					Uf: u ?? [0, 0, 0, 0],
				}),
				this.j.ae(0, 0, l.width, l.height),
				d.end(),
				(this.K_ = f));
		}
		q_(t, i, s) {
			const e = this.Rs[this.K_];
			(t.begin(),
				this.j.he(this.Y_),
				this.Y_.oe({
					Uh: e.textures[0],
					U3: e.textures[0],
					U8: [i, s],
					Ug: [e.width, e.height],
					U2: [0, 0],
					Ui: 1,
					Ul: 0,
					U4: R.NORMAL,
					Ub: !1,
					Uf: [0, 0, 0, 0],
				}),
				this.j.ae(0, 0, i, s),
				t.end());
		}
		fe(t, i) {
			(this.Rs[0].resize(t, i), this.Rs[1].resize(t, i));
		}
		L() {
			(this.Y_.dispose(), this.Rs[0].dispose(), this.Rs[1].dispose());
		}
	};
function Ls(t) {
	if ('number' == typeof t || 'boolean' == typeof t) return !0;
	if (Array.isArray(t)) {
		if (0 === t.length) return !0;
		const i = t[0];
		return 'number' == typeof i || !!Array.isArray(i);
	}
	return (
		t instanceof Float32Array ||
		t instanceof Int32Array ||
		!!wt(t) ||
		('undefined' != typeof WebGLTexture && t instanceof WebGLTexture)
	);
}
async function Ds(t) {
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
var ks = class {
		j;
		J_ = /* @__PURE__ */ new Map();
		tp = /* @__PURE__ */ new Map();
		$e;
		Rs;
		Pt = !1;
		constructor(t) {
			((this.j = t), (this.$e = t.rr(xs, Ss)), this.ip());
		}
		async register(t, i, s = {}) {
			const e = 'string' == typeof i ? this.j.rr(xs, await Ds(i)) : i;
			this.sp(t, e, s);
		}
		ep(t, i, s) {
			this.sp(t, this.j.rr(xs, i), s);
		}
		sp(t, i, s) {
			this.tp.set(t, i);
			const e = Object.entries(s),
				r = e.length > 0 ? e[0][1][0] : null;
			this.J_.set(t, {
				id: t,
				createShader: () => i,
				createUniforms: (t, i) => {
					const s = { u_resolution: [i.width, i.height] };
					for (const [n, [h, o]] of e) {
						let i = o;
						if (null != t)
							if ('number' == typeof t && h === r) i = t;
							else if ('object' == typeof t && h in t) {
								const s = t[h];
								Ls(s) && (i = s);
							}
						s[n] = i;
					}
					return s;
				},
			});
		}
		unregister(t) {
			const i = this.tp.get(t);
			return (i && (i.dispose(), this.tp.delete(t)), this.J_.delete(t));
		}
		has(t) {
			return this.J_.has(t);
		}
		kt(t, i) {
			this.Pt ||
				((this.Rs = [this.j.W(t, i, 1, { depth: !1 }), this.j.W(t, i, 1, { depth: !1 })]), (this.Pt = !0));
		}
		rp(t, i, s, e, r) {
			((this.Rs[0].width === e && this.Rs[0].height === r) || (this.Rs[0].resize(e, r), this.Rs[1].resize(e, r)),
				this.ce(t, i, s, e, r, this.Rs));
		}
		ce(t, i, s, e, r, n) {
			if (0 === s.length) {
				if (this.np(t, i)) return;
				return void this.hp(t, i, e, r);
			}
			let h = t,
				o = 0;
			for (let a = 0; a < s.length; a++) {
				const t = s[a];
				let c = i;
				if (a !== s.length - 1 || this.np(h, i)) {
					const t = this.op(h, n, o);
					((c = t.buffer), (o = 0 === t.index ? 1 : 0));
				}
				(this.ap(t, h, c, e, r), (h = c.textures[0]));
			}
			this.np(h, i) || this.hp(h, i, e, r);
		}
		ap(t, i, s, e, r) {
			const n = this.J_.get(t.name);
			if (!n)
				return (console.warn(`[textmode.js] Unknown filter: "${t.name}". Skipping.`), void this.hp(i, s, e, r));
			const h = this.cp(t.name, n, e, r),
				o = { renderer: this.j, gl: this.j.context, width: e, height: r };
			(s.begin(), this.j.he(h), h.oe({ u_texture: i }));
			const a = n.createUniforms(t.params, o);
			(h.oe(a), this.j.ae(0, 0, e, r), s.end());
		}
		np(t, i) {
			return i.textures.includes(t);
		}
		op(t, i, s) {
			const e = i[s];
			if (!this.np(t, e)) return { buffer: e, index: s };
			const r = 0 === s ? 1 : 0,
				n = i[r];
			return this.np(t, n) ? { buffer: e, index: s } : { buffer: n, index: r };
		}
		cp(t, i, s, e) {
			let r = this.tp.get(t);
			if (!r && i) {
				const n = { renderer: this.j, gl: this.j.context, width: s, height: e };
				((r = i.createShader(n)), this.tp.set(t, r));
			}
			return r;
		}
		hp(t, i, s, e) {
			(i.begin(),
				this.j.he(this.$e),
				this.$e.oe({ u_texture: t, u_resolution: [s, e] }),
				this.j.ae(0, 0, s, e),
				i.end());
		}
		fe(t, i) {
			this.Rs && (this.Rs[0].resize(t, i), this.Rs[1].resize(t, i));
		}
		L() {
			for (const t of this.tp.values()) t.dispose();
			(this.tp.clear(),
				this.J_.clear(),
				this.$e.dispose(),
				this.Rs && (this.Rs[0].dispose(), this.Rs[1].dispose()),
				(this.Pt = !1));
		}
		ip() {
			(this.ep(
				'invert',
				'#version 300 es\nprecision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);fragColor=vec4(1.-A.rgb,A.a);}',
				{}
			),
				this.ep(
					'grayscale',
					'#version 300 es\nprecision highp float;uniform sampler2D u_texture;uniform float U0;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));vec3 C=mix(A.rgb,vec3(B),U0);fragColor=vec4(C,A.a);}',
					{ U0: ['amount', 1] }
				),
				this.ep(
					'sepia',
					'#version 300 es\nprecision highp float;uniform sampler2D u_texture;uniform float U0;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);vec3 B;B.r=dot(A.rgb,vec3(0.393,0.769,0.189));B.g=dot(A.rgb,vec3(0.349,0.686,0.168));B.b=dot(A.rgb,vec3(0.272,0.534,0.131));vec3 C=mix(A.rgb,B,U0);fragColor=vec4(C,A.a);}',
					{ U0: ['amount', 1] }
				),
				this.ep(
					'threshold',
					'#version 300 es\nprecision highp float;uniform sampler2D u_texture;uniform float Us;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));float C=step(Us,B);fragColor=vec4(vec3(C),A.a);}',
					{ Us: ['threshold', 0.5] }
				));
		}
	},
	Rs = /* @__PURE__ */ i({ TextmodeFilterManager: () => ks }),
	Bs = class {
		de;
		j;
		lp;
		fp;
		dp = [];
		_p = [];
		pp;
		mp = !1;
		vp = /* @__PURE__ */ new Set();
		gp = [];
		yp = [];
		wp = !1;
		bp = () => {};
		Mp;
		Ap;
		Cp;
		xp;
		Sp;
		Ep = { Ms: !0, As: 1, Ss: 0, Cs: R.NORMAL };
		constructor(t, i) {
			((this.de = t),
				(this.j = t.j),
				(this.fp = new ks(this.j)),
				(this.lp = new Ps(this.j, this.de.p.width, this.de.p.height)),
				(this.pp = new rt(this.j, { visible: !0, opacity: 1, fontSize: i.fontSize, fontSource: i.fontSource })),
				(this.xp = new Us(this.de, i.loadingScreen)),
				(this.Sp = new ct(this.de)));
		}
		async kt() {
			await this.Fp(this.pp);
			const t = this.de.p;
			((this.Mp = this.j.W(t.width, t.height, 1, { depth: !1 })),
				(this.Ap = this.j.W(t.width, t.height, 1, { depth: !1 })),
				(this.Cp = this.Mp),
				this.fp.kt(t.width, t.height),
				await this.xp.kt(),
				await this.Sp.kt(),
				await this.Fp(this.xp._e),
				await this.Fp(this.Sp._e),
				await this.Tp(),
				(this.mp = !0));
		}
		Pp(t, i) {
			(this.wp ? this.yp : this.gp).push({ name: t, params: i });
		}
		Lp(t) {
			this.bp = t;
		}
		Dp() {
			((this.gp = []), (this.yp = []));
		}
		add(t = {}) {
			const i = new rt(this.j, t);
			return (this.mp ? (this.Fp(i), this.dp.push(i)) : this._p.push(i), i);
		}
		remove(t) {
			this.kp(this.dp, t) || this.kp(this._p, t);
		}
		move(t, i) {
			this.Rp(this.dp, t, i) || this.Rp(this._p, t, i);
		}
		swap(t, i) {
			this.Bp(this.dp, t, i) || this.Bp(this._p, t, i);
		}
		clear() {
			(this.Ip(this.dp), (this.dp = []), this.Ip(this._p), (this._p = []));
		}
		Op(t, i = []) {
			(this.de.te.n_(), this.pp.qs(this.de, this.de.Np));
			const s = [...this.j.state.gn.Fs];
			for (const e of this.dp) e.qs(this.de, this.de.Np);
			for (const e of i) e.Ms && e.qs(this.de, this.de.Np, { skipPluginHooks: !0 });
			this.Qp(t, s, i);
		}
		zp() {
			(this.Op(this.Mp), this.Hp());
		}
		Hp() {
			let t = this.Mp.textures[0];
			if (this.gp.length > 0) {
				const i = this.de.p;
				(this.fp.rp(this.Mp.textures[0], this.Ap, this.gp, i.width, i.height),
					(t = this.Ap.textures[0]),
					(this.Cp = this.Ap),
					(this.gp = []));
			} else this.Cp = this.Mp;
			try {
				try {
					((this.wp = !0), this.bp.call(this.de));
				} finally {
					this.wp = !1;
				}
				if (this.yp.length > 0) {
					const i = this.Ap;
					(this.fp.rp(this.Cp.textures[0], i, this.yp, this.de.p.width, this.de.p.height),
						(t = i.textures[0]),
						(this.Cp = i));
				}
			} finally {
				((this.yp = []), (this.wp = !1));
			}
			(this.Gp(t), this.de.te.o_());
		}
		Gp(t) {
			const i = this.de.p;
			(this.j.Rh(0, 0, 0, 0),
				this.j.he(this.de.jp),
				this.de.jp.oe({ u_texture: t }),
				this.j.ae(0, 0, i.width, i.height));
		}
		Vp(t) {
			this.Xp(() => {
				t.qs(this.de, this.de.Np, { skipPluginHooks: !0 });
				const i = t.texture,
					s = t.grid;
				i &&
					s &&
					(this.j.Rh(...this.j.state.gn.Fs),
					this.j.he(this.de.jp),
					this.de.jp.oe({ u_texture: i }),
					this.j.ae(s.offsetX, s.offsetY, s.width, s.height));
			});
		}
		$p(t) {
			this.Xp(() => {
				const i = this.de.p,
					s = this.Cp ?? this.Mp,
					e = s.textures[0];
				if (!e) return;
				t.qs(this.de, this.de.Np, { skipPluginHooks: !0 });
				const r = this.Yp(t);
				if (!r) return void this.Gp(e);
				const n = this.Kp(s);
				(this.lp.W_({
					base: { layer: this.Ep, texture: e, width: i.width, height: i.height, offsetX: 0, offsetY: 0 },
					layers: [r],
					targetFramebuffer: n,
					backgroundColor: [0, 0, 0, 0],
					canvasWidth: i.width,
					canvasHeight: i.height,
				}),
					this.Gp(n.textures[0]));
			});
		}
		Xp(t) {
			const i = !this.j.Ha();
			(i && this.j.Qa(!0), this.j.Xa(!0), this.j.state.ze());
			try {
				(this.j.state.Yi.ws(), this.j.state.ee(), t());
			} finally {
				(this.j.state.He(), this.j.$a(), i && this.j.Qa(!1));
			}
		}
		Kp(t) {
			return t === this.Mp ? this.Ap : this.Mp;
		}
		Yp(t, i = !0) {
			if (!t.grid || !t.texture) return;
			const s = t.grid,
				e = {
					layer: t,
					texture: t.texture,
					width: s.width,
					height: s.height,
					offsetX: s.offsetX + t.l,
					offsetY: s.offsetY + t._,
				};
			return (i && t.Fs && (e.canvasBackgroundColor = t.Fs), e);
		}
		Qp(t, i, s = []) {
			const e = this.de.p,
				r = this.Yp(this.pp, !1);
			if (!r) return;
			const n = [];
			for (const h of this.dp) {
				const t = this.Yp(h);
				t && n.push(t);
			}
			for (const h of s) {
				if (!h.Ms) continue;
				const t = this.Yp(h);
				t && n.push(t);
			}
			this.lp.W_({
				base: r,
				layers: n,
				targetFramebuffer: t,
				backgroundColor: i,
				canvasWidth: e.width,
				canvasHeight: e.height,
			});
		}
		fe() {
			if (!this.mp) return;
			const t = this.de.p;
			this.pp.fe();
			for (const i of this.dp) i.fe();
			(this.xp._e?.fe(),
				this.Sp._e?.fe(),
				this.lp.fe(t.width, t.height),
				this.Mp?.resize(t.width, t.height),
				this.Ap?.resize(t.width, t.height),
				this.fp?.fe(t.width, t.height));
		}
		L() {
			(this.xp.L(),
				this.Sp.L(),
				this.clear(),
				this.de.te.a_(this.pp),
				this.pp.L(),
				this.fp.L(),
				this.lp.L(),
				this.Mp?.dispose(),
				this.Ap?.dispose(),
				(this.gp = []),
				(this.yp = []),
				(this.wp = !1),
				(this.mp = !1));
		}
		get all() {
			return this.dp;
		}
		get base() {
			return this.pp;
		}
		get filters() {
			return this.fp;
		}
		get resultFramebuffer() {
			const t = this.gp.length > 0 || this.yp.length > 0 ? this.Ap : (this.Cp ?? this.Mp);
			if (!t) throw new r('LayerManager.resultFramebuffer is not available before initialization completes.');
			return t;
		}
		get loading() {
			return this.xp;
		}
		get errors() {
			return this.Sp;
		}
		Wp() {
			const t = this.dp;
			for (let i = t.length - 1; i >= 0; i--) {
				const s = t[i];
				if (s.Ms && s.grid) return s.grid;
			}
			return this.pp.grid;
		}
		Zp(t) {
			this.vp.add(t);
		}
		qp() {
			for (const t of this.vp) t();
		}
		async Tp() {
			for (let t = 0; t < this._p.length; t++) {
				const i = this._p[t];
				(await this.Fp(i), this.dp.push(i));
			}
			this._p = [];
		}
		kp(t, i) {
			const s = t.indexOf(i);
			return -1 !== s && (t.splice(s, 1), this.Jp(i), !0);
		}
		Rp(t, i, s) {
			const e = t.indexOf(i);
			return -1 !== e && (t.splice(e, 1), t.splice(H(s, 0, t.length), 0, i), !0);
		}
		Bp(t, i, s) {
			if (i === s) return !0;
			const e = t.indexOf(i),
				r = t.indexOf(s);
			return -1 !== e && -1 !== r && ((t[e] = s), (t[r] = i), !0);
		}
		Ip(t) {
			for (const i of t) this.Jp(i);
		}
		Jp(t) {
			(this.de.te.a_(t), t.L());
		}
		async Fp(t) {
			const i = {
				renderer: this.j,
				canvas: this.de.p,
				filterManager: this.fp,
				createFramebuffer: (t, i, s = 1, e) => this.j.W(t, i, s, e),
			};
			(await t.Vs(i), t.grid?.S(() => this.qp()));
		}
	},
	Is = /* @__PURE__ */ i({ LayerBlendMode: () => R, TextmodeLayer: () => rt, TextmodeLayerManager: () => Bs }),
	Os =
		'#version 300 es\nprecision highp float;in vec2 v_uv;in vec3 v_worldPosition;uniform sampler2D u_image;uniform bool u_invert;uniform bool u_flipX;uniform bool u_flipY;uniform float u_charRotation;uniform float U6;uniform float U5;uniform bool u_charColorFixed;uniform vec4 u_charColor;uniform bool u_cellColorFixed;uniform vec4 u_cellColor;uniform vec4 u_backgroundColor;uniform int u_charCount;uniform sampler2D u_charPaletteTexture;uniform ivec2 u_charPaletteDimensions;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_statePayload;\n' +
		Pi +
		'\nfloat A(vec3 B){return dot(B,vec3(0.299f,0.587f,0.114f));}vec3 C(int D){int E=max(u_charPaletteDimensions.x,1);int F=D/E;int G=D%E;return texelFetch(u_charPaletteTexture,ivec2(G,F),0).rgb;}void main(){vec2 H=vec2(v_uv.x,1.0f-v_uv.y);vec4 I=texture(u_image,H);float J=A(I.rgb);if(I.a<0.01f||J<U6||J>U5){discard;}vec2 K=vec2(0.);if(u_charCount>0){float L=float(u_charCount);float M=clamp(J*(L-1.0f),0.0f,L-1.0f);int N=int(floor(M+0.5f));vec3 O=C(N);K=O.xy;}else{K=vec2(0.0f,0.0f);}vec4 P=u_charColorFixed?u_charColor:I;vec4 Q=u_cellColorFixed?u_cellColor:I;vec3 R=tmApplyLighting(P.rgb,v_worldPosition);vec3 S=tmApplyLighting(Q.rgb,v_worldPosition);o_primaryColor=vec4(R,P.a);o_secondaryColor=vec4(S,Q.a);o_statePayload=vec4(0.);int T=int(u_invert?1:0);int U=int(u_flipX?1:0);int V=int(u_flipY?1:0);float W=float(T|(U<<1)|(V<<2))/255.;o_character=vec4(K,W,clamp(u_charRotation,0.0f,1.0f));}',
	Ns = {
		id: 'brightness',
		createShader: ({ gl: t }) => new bt(t, Ti, Os),
		createUniforms: (t) => t.createBaseUniforms(),
	},
	Qs = class {
		tm = /* @__PURE__ */ new Map();
		tp = /* @__PURE__ */ new Map();
		constructor() {
			this.im();
		}
		register(t) {
			this.tm.set(t.id, t);
		}
		unregister(t) {
			const i = this.tp.get(t);
			return (i && (i.dispose(), this.tp.delete(t)), this.tm.delete(t));
		}
		has(t) {
			return this.tm.has(t);
		}
		Vu(t) {
			return this.tm.get(t);
		}
		ju(t, i) {
			let s = this.tp.get(t);
			if (!s) {
				const e = this.tm.get(t);
				if (!e) throw new Error(`[textmode.js] Conversion mode "${t}" is not registered.`);
				((s = e.createShader(i)), this.tp.set(t, s));
			}
			return s;
		}
		L() {
			for (const t of this.tp.values()) t.dispose();
			(this.tp.clear(), this.tm.clear());
		}
		im() {
			this.register(Ns);
		}
	},
	zs = /* @__PURE__ */ i({ TextmodeConversionManager: () => Qs }),
	Hs = 'textmode-v1';
function Gs() {
	const t = globalThis.crypto;
	if (t?.getRandomValues) {
		const i = /* @__PURE__ */ new Uint32Array(4);
		return (t.getRandomValues(i), `auto:${i[0]}:${i[1]}:${i[2]}:${i[3]}`);
	}
	return `auto:${Date.now()}:${globalThis.performance?.now?.() ?? 0}:${Math.random()}`;
}
function js(t) {
	return 'number' == typeof t ? `number:${String(t)}` : `string:${t}`;
}
function Vs(t, i) {
	return `stream:${t.length}:${t}:${i.length}:${i}`;
}
function Xs(t, i) {
	let s = (2166136261 ^ i) >>> 0;
	for (let e = 0; e < t.length; e += 1) ((s ^= t.charCodeAt(e)), (s = Math.imul(s, 16777619)), (s ^= s >>> 13));
	return (
		(s ^= t.length),
		(s = Math.imul(s ^ (s >>> 16), 2146121005)),
		(s = Math.imul(s ^ (s >>> 15), 2221713035)),
		(s ^ (s >>> 16)) >>> 0
	);
}
function $s(t) {
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
var Ys = class {
		ge;
		sm;
		constructor(t = Gs()) {
			this.randomSeed(t);
		}
		random(t, i) {
			if (Array.isArray(t)) {
				if (0 === t.length) return;
				return t[Math.floor(this.rm() * t.length)];
			}
			const s = this.rm();
			return 'number' != typeof t ? s : void 0 === i ? s * t : t + s * (i - t);
		}
		randomGaussian(t = 0, i = 1) {
			if (void 0 !== this.sm) {
				const s = this.sm;
				return ((this.sm = void 0), t + s * i);
			}
			const s = Math.sqrt(-2 * Math.log(1 - this.rm())),
				e = 2 * Math.PI * this.rm(),
				r = s * Math.cos(e),
				n = s * Math.sin(e);
			return ((this.sm = n), t + r * i);
		}
		randomSeed(t) {
			((this.ge = (function (t) {
				const i = `${Hs}\0${t}`,
					s = [Xs(i, 608135816), Xs(i, 2242054355), Xs(i, 320440878), Xs(i, 57701188)];
				s.every((t) => 0 === t) && (s[0] = 1831565813);
				for (let e = 0; e < 12; e += 1) $s(s);
				return s;
			})(js(t))),
				(this.sm = void 0));
		}
		rm() {
			return $s(this.ge) / 4294967296;
		}
		static get nm() {
			return Hs;
		}
	},
	Ks = /* @__PURE__ */ i({ TEXTMODE_RANDOM_ALGORITHM: () => Hs, TextmodeRandom: () => Ys }),
	Ws = 4095;
function Zs(t) {
	return 0.5 * (1 - Math.cos(t * Math.PI));
}
var qs = class {
		hm = [];
		om = 4;
		am = 0.5;
		constructor(t) {
			this.noiseSeed(t);
		}
		noise(t, i = 0, s = 0) {
			(t < 0 && (t = -t), i < 0 && (i = -i), s < 0 && (s = -s));
			let e = Math.floor(t),
				r = Math.floor(i),
				n = Math.floor(s),
				h = t - e,
				o = i - r,
				a = s - n,
				c = 0,
				u = 0.5;
			for (let l = 0; l < this.om; l += 1) {
				let t = e + (r << 4) + (n << 8);
				const i = Zs(h),
					s = Zs(o);
				let l = this.hm[t & Ws],
					f = this.hm[(t + 1) & Ws];
				((l += i * (f - l)), (f = this.hm[(t + 16) & Ws]));
				let d = this.hm[(t + 16 + 1) & Ws];
				((f += i * (d - f)),
					(l += s * (f - l)),
					(t += 256),
					(f = this.hm[t & Ws]),
					(d = this.hm[(t + 1) & Ws]),
					(f += i * (d - f)));
				let _ = this.hm[(t + 16) & Ws];
				((d = this.hm[(t + 16 + 1) & Ws]),
					(_ += i * (d - _)),
					(f += s * (_ - f)),
					(l += Zs(a) * (f - l)),
					(c += l * u),
					(u *= this.am),
					(e <<= 1),
					(h *= 2),
					(r <<= 1),
					(o *= 2),
					(n <<= 1),
					(a *= 2),
					h >= 1 && ((e += 1), (h -= 1)),
					o >= 1 && ((r += 1), (o -= 1)),
					a >= 1 && ((n += 1), (a -= 1)));
			}
			return H(c, 0, 1);
		}
		noiseSeed(t) {
			const i = new Ys(t);
			this.hm = Array.from({ length: 4096 }, () => i.random());
		}
		noiseDetail(t, i) {
			((this.om = Number.isFinite(t) ? Math.max(1, Math.floor(t)) : 1),
				void 0 !== i && Number.isFinite(i) && (this.am = H(i, 0, 1)));
		}
	},
	Js = /* @__PURE__ */ i({ TextmodeColor: () => ji }),
	te = class {
		j;
		Np;
		jp;
		p;
		um;
		dd;
		lm;
		fm;
		dm;
		_m;
		pm;
		re;
		vm;
		gm = null;
		ym = [];
		wm = [];
		bm = [];
		Mm = [];
		Am = [];
		Cm = null;
		xm = /* @__PURE__ */ new Float32Array(24);
		Sm = /* @__PURE__ */ new Set();
		te;
		Em;
		Fm;
		Tm = /* @__PURE__ */ new Map();
		Pm;
		Lm;
		Dm;
		km;
		Ba = !1;
		Rm = !1;
		Pc = !1;
		Bm = null;
		Im = !1;
		Om = 0;
		Nm = () => {};
		Qm = () => {};
		zm;
		Hm;
		Gm;
		Cc = !1;
		jm;
		Vm;
		constructor(t = {}) {
			((this.te = new Cs(this)), (this.Cc = t.overlay ?? !1));
			const i = t.seed ?? Gs();
			((this.Fm = js(i)),
				(this.Em = new Ys(i)),
				(this.Pm = new qs(Vs(this.Fm, 'noise'))),
				(this.Lm = new Promise((t) => {
					this.km = t;
				})),
				(this.p = new Qi(t)),
				(this.j = new Ni(this.p.Nc())),
				(this.Np = this.j.rr(
					xs,
					'#version 300 es\nprecision highp float;uniform sampler2D u_characterTexture;uniform vec2 u_charsetDimensions;uniform sampler2D Uj;uniform sampler2D Um;uniform sampler2D U1;uniform bool UH;uniform vec2 U9;uniform vec2 Ua;uniform vec4 U7;in vec2 v_uv;out vec4 fragColor;mat2 A(float B){float C=sin(B);float D=cos(B);return mat2(D,-C,C,D);}float E(vec3 F){return dot(F,vec3(0.299f,0.587f,0.114f));}void main(){vec2 G=gl_FragCoord.xy/Ua;vec2 H=G*U9;vec2 I=floor(H);vec2 J=(I+0.5)/U9;vec4 K=texture(Uj,J);vec4 L=texture(Um,J);vec4 M=texture(U1,J);int N=int(M.r*255.+0.5);int O=int(M.g*255.+0.5);int P=int(M.a*255.+0.5);if(N==255&&O==255){fragColor=mix(U7,L,L.a);return;}int Q=int(M.b*255.+0.5);bool R=(Q&1)!=0;bool S=(Q&2)!=0;bool T=(Q&4)!=0;int U=N+O*256;int V=int(u_charsetDimensions.x);int W=U/V;int X=U-(W*V);float Y=(u_charsetDimensions.y-1.)-float(W);vec2 Z=1./u_charsetDimensions;vec2 a=vec2(float(X),Y)*Z;vec2 b=a+Z;float c=-M.a*360.*0.017453292;vec2 d=fract(H)-0.5f;vec2 e=vec2(S?-1.:1.,T?-1.:1.);d*=e;d=A(c)*d+0.5;vec2 f=a+clamp(d,0.,1.)*Z;const float g=0.0001;if(any(lessThan(f,a-g))||any(greaterThan(f,b+g))){fragColor=R?K:L;return;}vec4 h=texture(u_characterTexture,f);if(!UH){fragColor=h;return;}float i=(h.a>0.0f&&E(h.rgb)>0.5f)?1.0f:0.0f;if(R)i=1.0f-i;vec4 j=mix(U7,L,L.a);fragColor=mix(j,K,i);}'
				)),
				(this.jp = this.j.rr(xs, Ss)),
				(this.um = new Zi(t.frameRate ?? 60)),
				(this.pm = new Bs(this, t)));
			const s = () => this.Xm();
			((this._m = new hs()),
				(this.dd = new os(this.p, s, this._m)),
				(this.lm = new us(this.p, s, this._m, this.dd)),
				(this.fm = new as(this._m)),
				(this.dm = new ys(this._m)),
				(this.vm = new Qs()),
				this.te.L_(t.plugins ?? []),
				(this.Dm = this.kt()));
		}
		$m(t) {
			(this.Sm.add(t),
				t.k?.(() => {
					this.Sm.delete(t);
				}));
		}
		Ym = (t, i, s, e) => ji.Yc(t, i, s, e, this.j.state.gn.kn());
		Km(t, i) {
			(this.p.fe(t, i), this.pm?.fe(), this.j.vc(), this.qs());
		}
		Wm() {
			const t = this.pm?.base.grid;
			if (!t) return;
			const i = t.cols,
				s = t.rows;
			for (const e of this.Sm) e instanceof Ki && e.fe(i, s);
			this.jm && this.jm.fe(i, s);
		}
		async kt() {
			(await this.pm.kt(), this.km());
			const t = this.pm.base.grid;
			(this.Wm(),
				this.pm.Zp(() => {
					(this.dd._f(), this.lm._f());
				}),
				this.Cc && (this.jm = Wi.rl(this.j, this.vm, this.p.targetCanvas, t.cols, t.rows, this.Ym)),
				this.Zm(),
				t.S(() => {
					this.Wm();
				}),
				this.qm());
			try {
				(await this.te.c_(),
					await this.Nm(),
					await this.te.l_(),
					(this.um.vl = 0),
					this.loading.Q_(),
					(this.Im = !0),
					this.qm());
			} catch (i) {
				this.Jm(i, 'setup');
			}
		}
		qm() {
			this.um.wl(
				() => this.qs(),
				() => this.tv()
			);
		}
		tv() {
			return (
				!this.Rm &&
				!this.Pc &&
				(this.loading.Me || this.errors.Me || this.Im || this.Om > 0 || null !== this.Bm)
			);
		}
		iv(t) {
			((this.Om += t), this.qm(), this.Ba || this.loading.Me || this.errors.Me || this.sv());
		}
		Zm() {
			((this.zm = () => {
				if (this.Cc) {
					const t = this.p.targetCanvas.getBoundingClientRect();
					this.resizeCanvas(Math.round(t.width), Math.round(t.height));
				}
				this.Qm();
			}),
				window.addEventListener('resize', this.zm),
				this.dd.rf(),
				this.lm.rf(),
				this.fm.rf(),
				this.dm.rf(),
				(this.Hm = () => {
					this.fm.Of();
				}),
				window.addEventListener('blur', this.Hm),
				this.Cc &&
					((this.Gm = new ResizeObserver(() => {
						const t = this.p.targetCanvas.getBoundingClientRect();
						this.resizeCanvas(Math.round(t.width), Math.round(t.height));
					})),
					this.Gm.observe(this.p.targetCanvas)));
		}
		qs() {
			if (this.errors.Me) {
				this.errors.xe();
				const t = this.errors._e;
				return void (t && this.pm.Vp(t));
			}
			if (this.loading.Me)
				try {
					this.loading.xe();
					const t = this.loading._e;
					if (!t || !this.loading.Me) return;
					if ('transitioning' === this.loading.ge) {
						if ((this.ev(), this.errors.Me || !this.loading.Me)) return;
						this.pm.$p(t);
					} else this.pm.Vp(t);
				} catch (t) {
					this.Jm(t, 'loading screen');
				}
			else this.sv() || (this.rv() && this.nv());
		}
		rv() {
			return this.Im || this.um.ll;
		}
		ev() {
			this.rv() && this.nv();
		}
		sv() {
			if (this.loading.Me || this.errors.Me || this.Om <= 0) return !1;
			for (this.Im = !1; this.Om > 0;) (this.Om--, this.nv());
			return !0;
		}
		nv() {
			((this.Im = !1), this.um.Sl(), this.um.Fl(), this.dd.wf(), this.dm.wf(), (this.Ba = !0), this.j.Qa(!0));
			try {
				(this.Cc && dt(this.j.context, this.jm.texture, this.p.targetCanvas), this.pm.zp());
			} catch (t) {
				this.Jm(t, 'draw loop');
			} finally {
				if (((this.Ba = !1), this.j.Qa(!1), this.Rm && !this.Pc)) this.hv();
				else if (this.Bm) {
					const { width: t, height: i } = this.Bm;
					((this.Bm = null), this.Km(t, i));
				}
			}
		}
		resizeCanvas(t, i) {
			this.Ba ? (this.Bm = { width: t, height: i }) : this.Km(t, i);
		}
		destroy() {
			this.Pc || this.Rm || ((this.Rm = !0), this.um.Al(), this.Ba || this.hv());
		}
		async hv() {
			(this.p.L(),
				await this.te.I_(),
				window.removeEventListener('resize', this.zm),
				window.removeEventListener('blur', this.Hm),
				this.Gm?.disconnect(),
				this.dd.df(),
				this.lm.df(),
				this.fm.df(),
				this.dm.df(),
				this.pm?.L(),
				this.vm?.L());
			for (const t of this.Sm) t.dispose();
			(this.Sm.clear(), this.Np.dispose(), this.jp.dispose(), this.j.L(), this.jm?.dispose(), (this.Pc = !0));
		}
		filter(t, i) {
			this.pm.Pp(t, i);
		}
		draw(t) {
			this.pm.base.draw(t);
		}
		postDraw(t) {
			this.pm.base.postDraw(t);
		}
		finalDraw(t) {
			this.pm.Lp(t);
		}
		async loadFont(t, i = !0) {
			if (i) return (await this.pm.base.loadFont(t), this.pm.base.font);
			if (t instanceof P) return (t.Pt || (await t.kt()), t);
			const s = new P(this.j);
			return (await s.kt(t), this.$m(s), s);
		}
		async loadTileset(t, i = !0) {
			if (i) return (await this.pm.base.loadTileset(t), this.pm.base.font);
			if (t instanceof D) return (t.Pt || (await t.kt()), t);
			const s = new D(this.j, t.fontSize, t);
			return (await s.kt(), this.$m(s), s);
		}
		fontSize(t) {
			return this.pm.base.fontSize(t);
		}
		useTileColors(t) {
			return this.pm.base.useTileColors(t);
		}
		inputGrid(t) {
			return void 0 === t
				? (this.Vm ?? 'topmost')
				: 'topmost' === t
					? ((this.Vm = void 0), this.dd._f(), void this.lm._f())
					: ((this.Vm = t), this.dd._f(), void this.lm._f());
		}
		Xm() {
			return this.Vm ? this.Vm : this.pm.Wp();
		}
		Jm(t, i) {
			(console.error(`Error during ${i}:`, t), this.loading.Q_(), this.errors.Ae(t), this.qm());
		}
		async setup(t) {
			this.Nm = t;
		}
		windowResized(t) {
			this.Qm = t;
		}
		get grid() {
			return this.re?.grid ?? this.pm.base.grid;
		}
		get font() {
			return this.re?.font ?? this.pm.base.font;
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
				s = this.p.width / i,
				e = this.p.height / i;
			(this.p.zc(t), this.resizeCanvas(s, e));
		}
		get canvas() {
			return this.p.canvas;
		}
		get isDisposed() {
			return this.Pc;
		}
		get overlay() {
			return this.jm;
		}
		get loading() {
			return this.pm.loading;
		}
		get errors() {
			return this.pm.errors;
		}
		get layers() {
			return this.pm;
		}
		get filters() {
			return this.pm.filters;
		}
		get conversions() {
			return this.vm;
		}
		get isRenderingFrame() {
			return this.Ba;
		}
	},
	ie = class {
		constructor() {}
		static create(t = {}) {
			return new te(t);
		}
		static setErrorLevel(t) {
			tt.Li(t);
		}
		static get version() {
			return '0.17.1';
		}
	},
	se = /* @__PURE__ */ new WeakMap();
function ee(t, i, s) {
	let e = se.get(t);
	(e || ((e = /* @__PURE__ */ new Map()), se.set(t, e)), e.get(i)?.());
	const r = t._m.Rl(i, s);
	e.set(i, r);
}
function re(t) {
	const i = te.prototype;
	for (const s of t)
		i[s] = function (t) {
			ee(this, s, t);
		};
}
function ne(t) {
	for (const { name: i, get: s } of t)
		Object.defineProperty(te.prototype, i, { get: s, configurable: !0, enumerable: !0 });
}
function he(t, i) {
	const s = te.prototype;
	s[t] = s[i];
}
function oe(t, i) {
	return function (s, e, r, n) {
		if (void 0 === s) return ji.Kc(...t.call(this));
		const h = this.Ym(s, e, r, n);
		i.call(this, h);
	};
}
var ae = /* @__PURE__ */ i({ MOUSE_EVENT_NAMES: () => is });
(re(is),
	(te.prototype.cursor = function (t) {
		this.dd.tf(t);
	}),
	(te.prototype.requestPointerLock = function () {
		return this.dd.if();
	}),
	(te.prototype.exitPointerLock = function () {
		this.dd.sf();
	}),
	ne([
		{
			name: 'mouse',
			get: function () {
				return this.dd.pf();
			},
		},
		{
			name: 'mouseIsPressed',
			get: function () {
				return this.dd.yf();
			},
		},
		{
			name: 'pmouse',
			get: function () {
				return this.dd.mf();
			},
		},
		{
			name: 'movedX',
			get: function () {
				return this.dd.vf();
			},
		},
		{
			name: 'movedY',
			get: function () {
				return this.dd.gf();
			},
		},
	]),
	(te.prototype.frameRate = function (t) {
		return void 0 === t ? this.um.fl : this.um.xl(t, () => this.qs());
	}),
	(te.prototype.targetFrameRate = function (t) {
		if (void 0 === t) return this.um.hl;
		this.um.El(t);
	}),
	(te.prototype.noLoop = function () {
		this.um.Al();
	}),
	(te.prototype.loop = function () {
		this.um.Cl(() => this.qs());
	}),
	(te.prototype.redraw = function (t = 1) {
		tt.Pi('number' == typeof t && t > 0 && Number.isInteger(t), 'Redraw count must be a positive integer.', {
			method: 'redraw',
			providedValue: t,
		}) && this.iv(t);
	}),
	(te.prototype.isLooping = function () {
		return this.um.ll;
	}),
	(te.prototype.deltaTime = function () {
		return this.um.ml;
	}),
	Object.defineProperty(te.prototype, 'frameCount', {
		get: function () {
			return this.um.vl;
		},
		set: function (t) {
			this.um.vl = t;
		},
		configurable: !0,
		enumerable: !0,
	}),
	Object.defineProperty(te.prototype, 'millis', {
		get: function () {
			return this.um.Tl;
		},
		set: function (t) {
			this.um.Tl = t;
		},
		configurable: !0,
		enumerable: !0,
	}),
	Object.defineProperty(te.prototype, 'secs', {
		get: function () {
			return this.um.Pl;
		},
		set: function (t) {
			this.um.Pl = t;
		},
		configurable: !0,
		enumerable: !0,
	}));
var ce = /* @__PURE__ */ i({ GESTURE_EVENT_NAMES: () => es, TOUCH_EVENT_NAMES: () => ss });
(re(ss),
	re(es),
	ne([
		{
			name: 'touches',
			get: function () {
				return this.lm.xd();
			},
		},
	]));
var ue = /* @__PURE__ */ i({ KEYBOARD_EVENT_NAMES: () => ts });
(re(ts),
	(te.prototype.isKeyPressed = function (t) {
		return this.fm.Lf(t);
	}),
	ne([
		{
			name: 'lastKeyPressed',
			get: function () {
				return this.fm.kf();
			},
		},
		{
			name: 'lastKeyReleased',
			get: function () {
				return this.fm.Rf();
			},
		},
		{
			name: 'pressedKeys',
			get: function () {
				return this.fm.Bf();
			},
		},
		{
			name: 'modifierState',
			get: function () {
				return this.fm.If();
			},
		},
	]));
var le = /* @__PURE__ */ i({ GAMEPAD_EVENT_NAMES: () => rs });
(re(rs),
	(te.prototype.gamepad = function (t) {
		return this.dm.Qd(t);
	}),
	ne([
		{
			name: 'gamepads',
			get: function () {
				return this.dm.Nd();
			},
		},
	]),
	(te.prototype.perspective = function (t, i, s) {
		this.layers.base.perspective(t, i, s);
	}),
	(te.prototype.createCamera = function () {
		return this.layers.base.createCamera();
	}),
	(te.prototype.setCamera = function (t) {
		this.layers.base.setCamera(t);
	}),
	(te.prototype.resetCamera = function () {
		this.layers.base.resetCamera();
	}),
	(te.prototype.camera = function (t, i, s, e = 0, r = 0, n = 0, h = 0, o = 1, a = 0) {
		this.layers.base.camera(t, i, s, e, r, n, h, o, a);
	}),
	(te.prototype.lookAt = function (t, i, s, e, r, n) {
		this.layers.base.lookAt(t, i, s, e, r, n);
	}),
	(te.prototype.ortho = function (t, i) {
		this.layers.base.ortho(t, i);
	}));
var fe = /* @__PURE__ */ (function (t) {
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
	de = {
		0: function (t, i, s, e, r, n) {
			for (let h = 0; h < n; h++) {
				const n = t.j.state;
				(n.ze(), n.Wn(r[h]), n.Gn.Sr(i[h], s[h], e[h]), t.j.tc(1, 1), n.He());
			}
		},
		1: function (t, i, s, e, r, n) {
			for (let h = 0; h + 1 < n; h += 2) pe(t, i, s, r, h, h + 1);
		},
		2: _e,
		3: function (t, i, s, e, r, n) {
			_e(t, i, s, 0, r, n, 'close');
		},
		4: function (t, i, s, e, r, n) {
			for (let h = 0; h + 2 < n; h += 3) me(t, i, s, e, r[h], h, h + 1, h + 2);
		},
		5: function (t, i, s, e, r, n) {
			for (let h = 0; h + 2 < n; h++) me(t, i, s, e, r[h], h, h + 1, h + 2);
		},
		6: function (t, i, s, e, r, n) {
			for (let h = 1; h + 1 < n; h++) me(t, i, s, e, r[0], 0, h, h + 1);
		},
		7: function (t, i, s, e, r, n) {
			for (let h = 0; h + 3 < n; h += 4) ve(t, i, s, e, r[h], h, h + 1, h + 2, h + 3);
		},
		8: function (t, i, s, e, r, n) {
			for (let h = 0; h + 3 < n; h += 2) ve(t, i, s, e, r[h], h, h + 1, h + 3, h + 2);
		},
	};
for (const [We, Ze] of Object.entries({
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
	Object.defineProperty(te.prototype, We, { configurable: !0, enumerable: !1, value: Ze, writable: !1 });
function _e(t, i, s, e, r, n, h) {
	for (let o = 0; o + 1 < n; o++) pe(t, i, s, r, o, o + 1);
	'close' === h && n > 2 && pe(t, i, s, r, n - 1, 0);
}
function pe(t, i, s, e, r, n) {
	const h = t.j.state;
	(h.ze(), h.Wn(e[r]), t.j.sc(i[r], s[r], i[n], s[n]), h.He());
}
function me(t, i, s, e, r, n, h, o) {
	we(t, 12);
	const a = t.xm;
	(ye(a, 0, i[n], s[n], e[n]), ye(a, 4, i[h], s[h], e[h]), ye(a, 8, i[o], s[o], e[o]), ge(t, r, 3));
}
function ve(t, i, s, e, r, n, h, o, a) {
	we(t, 24);
	const c = t.xm;
	(ye(c, 0, i[n], s[n], e[n]),
		ye(c, 4, i[h], s[h], e[h]),
		ye(c, 8, i[o], s[o], e[o]),
		ye(c, 12, i[n], s[n], e[n]),
		ye(c, 16, i[o], s[o], e[o]),
		ye(c, 20, i[a], s[a], e[a]),
		ge(t, r, 6));
}
function ge(t, i, s) {
	const e = t.j.state;
	(e.ze(), e.Wn(i), t.j.ec(t.xm, s), e.He());
}
function ye(t, i, s, e, r) {
	((t[i] = s), (t[i + 1] = e), (t[i + 2] = r), (t[i + 3] = 0));
}
function we(t, i) {
	if (t.xm.length >= i) return;
	let s = t.xm.length;
	for (; s < i;) s *= 2;
	t.xm = new Float32Array(s);
}
((te.prototype.rect = function (t = 1, i = 1) {
	this.j.tc(t, i);
}),
	(te.prototype.point = function () {
		this.j.tc(1, 1);
	}),
	(te.prototype.line = function (t, i, s, e) {
		this.j.sc(t, i, s, e);
	}),
	(te.prototype.lineWeight = function (t) {
		if (void 0 === t) return this.j.state.gn.sn;
		this.j.state.gn.Mn(t);
	}),
	(te.prototype.ellipse = function (t = 1, i = 1) {
		this.j.rc(t / 2, i / 2);
	}),
	(te.prototype.triangle = function (t, i, s, e, r, n) {
		this.j.nc(t, i, s, e, r, n);
	}),
	(te.prototype.arc = function (t, i, s, e) {
		this.j.oc(t / 2, i / 2, s, e);
	}),
	(te.prototype.bezierCurve = function (t, i, s, e, r, n, h, o) {
		this.j.hc(t, i, s, e, r, n, h, o);
	}),
	(te.prototype.beginShape = function (t = 2) {
		if (null !== this.gm) throw new Error('beginShape() called before endShape(). Call endShape() first.');
		((this.gm = t),
			(this.ym.length = 0),
			(this.wm.length = 0),
			(this.bm.length = 0),
			(this.Mm.length = 0),
			(this.Cm ??= jt.$n()),
			this.j.state.Yn(this.Cm));
	}),
	(te.prototype.vertex = function (t, i, s = 0) {
		if (null === this.gm) throw new Error('vertex() must be called between beginShape() and endShape().');
		const e = this.Am.pop() ?? jt.$n();
		(this.j.state.Yn(e), this.ym.push(t), this.wm.push(i), this.bm.push(s), this.Mm.push(e));
	}),
	(te.prototype.endShape = function (t) {
		if (null === this.gm || null === this.Cm) throw new Error('endShape() must be called after beginShape().');
		const i = this.gm,
			s = this.ym,
			e = this.wm,
			r = this.bm,
			n = this.Mm,
			h = n.length,
			o = this.Cm;
		try {
			!(function (t, i, s, e, r, n, h, o) {
				const a = de[i];
				a?.(t, s, e, r, n, h, o);
			})(this, i, s, e, r, n, h, t);
		} finally {
			this.j.state.Wn(o);
			for (let t = 0; t < n.length; t++) this.Am.push(n[t]);
			((s.length = 0), (e.length = 0), (r.length = 0), (n.length = 0), (this.gm = null));
		}
	}),
	(te.prototype.box = function (t = 50, i, s) {
		const e = i ?? t,
			r = s ?? e;
		this.j.ac(t, e, r);
	}),
	(te.prototype.sphere = function (t = 50) {
		this.j.cc(t);
	}),
	(te.prototype.torus = function (t = 50, i = 10) {
		this.j.uc(t, i);
	}),
	(te.prototype.cone = function (t = 50, i) {
		this.j.lc(t, i ?? t);
	}),
	(te.prototype.cylinder = function (t = 50, i) {
		this.j.fc(t, i ?? t);
	}),
	(te.prototype.ellipsoid = function (t = 50, i, s) {
		this.j.dc(t, i ?? t, s ?? t);
	}));
var be = /* @__PURE__ */ new Float32Array(16);
((te.prototype.rotate = function (t = 0, i, s) {
	const e = this.j.state.Gn;
	if ('number' == typeof i || void 0 !== s) return (e.Tr(t), e.Pr(i ?? 0), void e.Lr(s ?? 0));
	void 0 === i
		? e.Lr(t)
		: Array.isArray(i)
			? e.Dr(t, i[0] ?? 0, i[1] ?? 0, i[2] ?? 0)
			: e.Dr(t, i.x ?? 0, i.y ?? 0, i.z ?? 0);
}),
	(te.prototype.rotateX = function (t) {
		if (void 0 === t) return N(this.j.state.Gn._r);
		this.j.state.Gn.Tr(t);
	}),
	(te.prototype.rotateY = function (t) {
		if (void 0 === t) return N(this.j.state.Gn.pr);
		this.j.state.Gn.Pr(t);
	}),
	(te.prototype.rotateZ = function (t) {
		if (void 0 === t) return N(this.j.state.Gn.mr);
		this.j.state.Gn.Lr(t);
	}),
	(te.prototype.translate = function (t = 0, i = 0, s = 0) {
		this.j.state.Gn.Sr(t, i, s);
	}),
	(te.prototype.translateX = function (t) {
		if (void 0 === t) return this.j.state.Gn.ur;
		this.j.state.Gn.Sr(t, 0, 0);
	}),
	(te.prototype.translateY = function (t) {
		if (void 0 === t) return this.j.state.Gn.lr;
		this.j.state.Gn.Sr(0, t, 0);
	}),
	(te.prototype.translateZ = function (t) {
		if (void 0 === t) return this.j.state.Gn.dr;
		this.j.state.Gn.Sr(0, 0, t);
	}),
	(te.prototype.scale = function (t, i, s) {
		this.j.state.Gn.Fr(t, i, s);
	}),
	(te.prototype.resetMatrix = function () {
		this.j.state.Gn.kr();
	}),
	(te.prototype.applyMatrix = function (...t) {
		let i;
		if (1 === t.length && 'number' != typeof t[0]) i = t[0];
		else {
			if (16 !== t.length)
				throw new Error('applyMatrix() expects either a 16-length array-like or 16 numeric arguments.');
			i = t;
		}
		if (16 !== i.length) throw new Error('applyMatrix() expects exactly 16 values.');
		for (let s = 0; s < 16; s++) be[s] = Number(i[s] ?? 0);
		this.j.state.Gn.Rr(be);
	}),
	(te.prototype.push = function () {
		this.j.state.ze();
	}),
	(te.prototype.pop = function () {
		this.j.state.He();
	}),
	Object.defineProperty(te.prototype, 'windowWidth', {
		get: function () {
			return window.innerWidth;
		},
		configurable: !0,
		enumerable: !0,
	}),
	Object.defineProperty(te.prototype, 'windowHeight', {
		get: function () {
			return window.innerHeight;
		},
		configurable: !0,
		enumerable: !0,
	}),
	Object.defineProperty(te.prototype, 'displayWidth', {
		get: function () {
			return screen.width;
		},
		configurable: !0,
		enumerable: !0,
	}),
	Object.defineProperty(te.prototype, 'displayHeight', {
		get: function () {
			return screen.height;
		},
		configurable: !0,
		enumerable: !0,
	}),
	(te.prototype.color = function (t, i, s, e) {
		return this.Ym(t, i, s, e);
	}),
	(te.prototype.colorMode = function (t, i, s, e, r) {
		const n = this.j.state.gn;
		if (void 0 === t) return n.kn();
		const h = (function (t, i, s, e, r) {
			if ('rgb' !== t && 'hsb' !== t && 'hsl' !== t)
				throw new Error("colorMode() mode must be 'rgb', 'hsb', or 'hsl'.");
			let n = Et(t);
			if (void 0 !== i && void 0 === s && void 0 === e && void 0 === r) n = [i, i, i, i];
			else if (void 0 !== i || void 0 !== s || void 0 !== e || void 0 !== r) {
				if (void 0 === i || void 0 === s || void 0 === e)
					throw new Error('colorMode() expects either one shared max or max1, max2, and max3.');
				n = [i, s, e, r ?? n[3]];
			}
			for (const h of n)
				if (!Number.isFinite(h) || h <= 0)
					throw new Error('colorMode() max values must be finite numbers greater than 0.');
			return { mode: t, maxes: n };
		})(t, i, s, e, r);
		n.Rn(h.mode, h.maxes);
	}),
	(te.prototype.background = function (t, i, s, e = 255) {
		if (void 0 === t) {
			const [t, i, s, e] = this.j.state.gn.Fs;
			return ji.Kc(t, i, s, e);
		}
		const r = this.Ym(t, i, s, e);
		(this.j.state.gn.Ln(r.r, r.g, r.b, r.a), this.re?.ue(r.normalized), this.j._c(r.r, r.g, r.b, r.a));
	}),
	(te.prototype.clear = function () {
		(this.re?.le(), this.j.state.gn.Dn(), this.j.Rh(0, 0, 0, 0));
	}));
var Me = oe(
	function () {
		return this.j.state.gn.nn;
	},
	function (t) {
		this.j.state.gn.xn(t.r, t.g, t.b, t.a);
	}
);
((te.prototype.charColor = Me), he('stroke', 'charColor'));
var Ae = oe(
	function () {
		return this.j.state.gn.hn;
	},
	function (t) {
		this.j.state.gn.Sn(t.r, t.g, t.b, t.a);
	}
);
function Ce(t) {
	if ('object' != typeof t || null === t) return !1;
	const i = t;
	return 'number' == typeof i.x && 'number' == typeof i.y && 'number' == typeof i.z;
}
((te.prototype.cellColor = Ae),
	he('fill', 'cellColor'),
	(te.prototype.char = function (t) {
		if (void 0 === t) return this.j.state.gn.rn;
		const i = 'number' == typeof t ? this.font.characters[t].character : t;
		if (0 === i.length) throw new Error('char() requires at least one character.');
		(this.j.state.gn.An(this.font.Qt(i)), this.j.state.gn.Cn(i));
	}),
	(te.prototype.flipX = function (t) {
		if (void 0 === t) return this.j.state.gn.un;
		this.j.state.gn.En(t);
	}),
	(te.prototype.flipY = function (t) {
		if (void 0 === t) return this.j.state.gn.ln;
		this.j.state.gn.Fn(t);
	}),
	(te.prototype.charRotation = function (t) {
		if (void 0 === t) return 360 * this.j.state.gn._n;
		this.j.state.gn.Pn(t);
	}),
	(te.prototype.invert = function (t) {
		if (void 0 === t) return this.j.state.gn.dn;
		this.j.state.gn.Tn(t);
	}),
	(te.prototype.ambientLight = function (t, i, s, e) {
		const [r, n, h] = ji.jc(t, i, s, e).normalized;
		this.j.state.se.Zr(r, n, h);
	}),
	(te.prototype.pointLight = function (t, i, s, e, r, n) {
		let h, o;
		if ('number' == typeof t && 'number' == typeof i && 'number' == typeof s)
			if (((h = ji.jc(t, i, s)), Ce(e))) o = e;
			else {
				if ('number' != typeof e || 'number' != typeof r || 'number' != typeof n)
					throw new Error('pointLight() expected RGB + XYZ or RGB + { x, y, z }.');
				o = { x: e, y: r, z: n };
			}
		else if (((h = ji.jc(t)), Ce(i))) o = i;
		else {
			if ('number' != typeof i || 'number' != typeof s || 'number' != typeof e)
				throw new Error('pointLight() expected color + XYZ or color + { x, y, z }.');
			o = { x: i, y: s, z: e };
		}
		const [a, c, u] = h.normalized;
		this.j.state.se.qr(a, c, u, o.x, o.y, o.z);
	}),
	(te.prototype.lightFalloff = function (t, i, s) {
		this.j.state.se.Jr(t, i, s);
	}),
	(te.prototype.noLights = function () {
		this.j.state.se.tn();
	}),
	(te.prototype.shader = function (t) {
		this.j.ja(t);
	}),
	(te.prototype.resetShader = function () {
		this.j.Va();
	}),
	(te.prototype.setUniform = function (t, i) {
		this.j.ar(t, i);
	}),
	(te.prototype.setUniforms = function (t) {
		this.j.oe(t);
	}),
	(te.prototype.createMaterialShader = async function (t) {
		const i = await Ds(t),
			s = this.j.Ya(i);
		return (this.$m(s), s);
	}),
	(te.prototype.createShader = async function (t, i) {
		const s = await Ds(t),
			e = await Ds(i),
			r = this.j.rr(s, e);
		return (this.$m(r), r);
	}));
var xe = class t extends Ki {
		Yt;
		constructor(t, i, s, e, r, n, h, o, a, c) {
			(super(t, i, s, e, r, n, h, o, c), (this.Yt = a));
		}
		static ov(i, s, e, r, n, h) {
			const o = i.context,
				{ texture: a, width: c, height: u } = _t(o, e);
			return new t(o, i, a, s, c, u, r, n, e, h);
		}
		Z() {
			this.Yt instanceof HTMLVideoElement
				? this.Yt.readyState >= this.Yt.HAVE_CURRENT_DATA && dt(this.Ee, this.jn, this.Yt)
				: dt(this.Ee, this.jn, this.Yt);
		}
		Ve() {
			return (this.sl(), super.Ve());
		}
		qa() {
			return (this.sl(), super.qa());
		}
		Zu() {
			this.Z();
		}
		la() {
			this.Z();
		}
		get source() {
			return this.Yt;
		}
	},
	Se = class t extends xe {
		constructor(t, i, s, e, r, n, h, o, a, c) {
			super(t, i, s, e, n, h, o, a, r, c);
		}
		dispose() {
			(super.dispose(), this.av.pause(), (this.av.src = ''), this.av.load());
		}
		static async cv(t) {
			const i = document.createElement('video');
			return (
				(i.crossOrigin = 'anonymous'),
				(i.loop = !0),
				(i.muted = !0),
				(i.playsInline = !0),
				await new Promise((s, e) => {
					(i.addEventListener('loadedmetadata', () => s(), { once: !0 }),
						i.addEventListener(
							'error',
							(t) => {
								const i = t.target;
								e(
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
		static ov(i, s, e, r, n, h) {
			const o = i.context,
				{ texture: a, width: c, height: u } = _t(o, e, o.LINEAR, o.LINEAR, o.CLAMP_TO_EDGE, o.CLAMP_TO_EDGE);
			return new t(o, i, a, s, e, c, u, r, n, h);
		}
		static async rl(i, s, e, r, n, h) {
			const o = await t.cv(e);
			return t.ov(i, s, o, r, n, h);
		}
		async play() {
			await this.av.play();
		}
		pause() {
			this.av.pause();
		}
		stop() {
			(this.av.pause(), (this.av.currentTime = 0));
		}
		speed(t) {
			return ((this.av.playbackRate = t), this);
		}
		loop(t = !0) {
			return ((this.av.loop = t), this);
		}
		time(t) {
			return ((this.av.currentTime = t), this);
		}
		volume(t) {
			return ((this.av.volume = H(t, 0, 1)), this);
		}
		get videoElement() {
			return this.av;
		}
		get currentTime() {
			return this.av.currentTime;
		}
		get duration() {
			return this.av.duration;
		}
		get isPlaying() {
			return !this.av.paused && !this.av.ended;
		}
		get av() {
			return this.Yt;
		}
	};
((te.prototype.createFramebuffer = function (t) {
	const i = this.j.W(t.width ?? this.grid.cols, t.height ?? this.grid.rows, t.attachments ?? 3);
	return (this.$m(i), i);
}),
	(te.prototype.image = function (t, i, s) {
		(this.j.Wa(t, i, s, this.font), t instanceof yt && this.j.Ge());
	}),
	(te.prototype.loadImage = async function (t) {
		const i = t,
			s = new Promise((t, s) => {
				const e = new Image();
				((e.crossOrigin = 'anonymous'), (e.onload = () => t(e)), (e.onerror = (t) => s(t)), (e.src = i));
			}),
			[e] = await Promise.all([s, this.Lm]),
			r = this.grid;
		if (!r) throw new Error('[textmode.js] Cannot load image before grid initialization completes.');
		const n = Wi.rl(this.j, this.vm, e, r.cols, r.rows, this.Ym);
		return (this.$m(n), n);
	}),
	(te.prototype.loadVideo = async function (t) {
		const [i] = await Promise.all([Se.cv(t), this.Lm]),
			s = this.grid;
		if (!s) throw new Error('[textmode.js] Cannot load video before grid initialization completes.');
		const e = Se.ov(this.j, this.vm, i, s.cols, s.rows, this.Ym);
		return (this.$m(e), e);
	}),
	(te.prototype.createTexture = function (t) {
		const i = this.grid,
			s = xe.ov(this.j, this.vm, t, i?.cols ?? 1, i?.rows ?? 1, this.Ym);
		return (this.$m(s), s);
	}),
	(te.prototype.texture = function (t) {
		if (t instanceof yt) return void this.j.state.jn.Nn(t);
		if (!(t instanceof Ki))
			throw new r(
				'[textmode.js] texture() expects a TextmodeImage, TextmodeVideo, TextmodeTexture, or TextmodeFramebuffer source.',
				{ method: 'texture', providedValue: t }
			);
		const i = t.il(this.font);
		(t.Ja() && this.j.Ga(t), this.j.state.jn.On(i));
	}),
	(te.prototype.noTexture = function () {
		this.j.state.jn.Qn();
	}));
var Ee = {
	BLEND_NORMAL: R.NORMAL,
	BLEND_ADDITIVE: R.ADDITIVE,
	BLEND_MULTIPLY: R.MULTIPLY,
	BLEND_SCREEN: R.SCREEN,
	BLEND_SUBTRACT: R.SUBTRACT,
	BLEND_DARKEN: R.DARKEN,
	BLEND_LIGHTEN: R.LIGHTEN,
	BLEND_OVERLAY: R.OVERLAY,
	BLEND_SOFT_LIGHT: R.SOFT_LIGHT,
	BLEND_HARD_LIGHT: R.HARD_LIGHT,
	BLEND_COLOR_DODGE: R.COLOR_DODGE,
	BLEND_COLOR_BURN: R.COLOR_BURN,
	BLEND_DIFFERENCE: R.DIFFERENCE,
	BLEND_EXCLUSION: R.EXCLUSION,
};
for (const [We, Ze] of Object.entries(Ee))
	Object.defineProperty(te.prototype, We, { configurable: !0, enumerable: !1, value: Ze, writable: !1 });
((te.prototype.on = function (t, i) {
	return this._m.Rl(t, i);
}),
	(te.prototype.off = function (t, i) {
		this._m.Bl(t, i);
	}),
	(te.prototype.once = function (t, i) {
		return this._m.Il(t, i);
	}),
	(te.prototype.random = function (t, i) {
		return Array.isArray(t)
			? this.Em.random(t)
			: 'number' != typeof t
				? this.Em.random()
				: 'number' != typeof i
					? this.Em.random(t)
					: this.Em.random(t, i);
	}),
	(te.prototype.randomGaussian = function (t, i) {
		return this.Em.randomGaussian(t, i);
	}),
	(te.prototype.randomSeed = function (t) {
		((this.Fm = js(t)), this.Em.randomSeed(t), this.Tm.clear(), this.Pm.noiseSeed(Vs(this.Fm, 'noise')));
	}),
	(te.prototype.randomStream = function (t) {
		const i = String(t),
			s = this.Tm.get(i);
		if (s) return s;
		const e = new Ys(Vs(this.Fm, i));
		return (this.Tm.set(i, e), e);
	}),
	(te.prototype.noise = function (t, i, s) {
		return this.Pm.noise(t, i, s);
	}),
	(te.prototype.noiseSeed = function (t) {
		this.Pm.noiseSeed(t);
	}),
	(te.prototype.noiseDetail = function (t, i) {
		this.Pm.noiseDetail(t, i);
	}));
var Fe = class t {
	x;
	y;
	z;
	constructor(t = 0, i = 0, s = 0) {
		((this.x = t), (this.y = i), (this.z = s));
	}
	set(t, i, s) {
		return Ue(t)
			? ((this.x = t.x), (this.y = t.y), (this.z = t.z ?? 0), this)
			: Te(t)
				? ((this.x = t[0] ?? 0), (this.y = t[1] ?? 0), (this.z = t[2] ?? 0), this)
				: ((this.x = t ?? 0), (this.y = i ?? 0), (this.z = s ?? 0), this);
	}
	copy() {
		return new t(this.x, this.y, this.z);
	}
	add(t, i, s) {
		const [e, r, n] = Le(t, i, s);
		return ((this.x += e), (this.y += r), (this.z += n), this);
	}
	sub(t, i, s) {
		const [e, r, n] = Le(t, i, s);
		return ((this.x -= e), (this.y -= r), (this.z -= n), this);
	}
	mult(t, i, s) {
		const [e, r, n] = De(t, i, s);
		return ((this.x *= e), (this.y *= r), (this.z *= n), this);
	}
	div(t, i, s) {
		const [e, r, n] = De(t, i, s);
		return ((this.x /= e), (this.y /= r), (this.z /= n), this);
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
	dist(t, i, s) {
		const [e, r, n] = Pe(t, i, s);
		return Math.hypot(this.x - e, this.y - r, this.z - n);
	}
	dot(t, i, s) {
		const [e, r, n] = Pe(t, i, s);
		return this.x * e + this.y * r + this.z * n;
	}
	cross(i, s, e) {
		const [r, n, h] = Pe(i, s, e);
		return new t(this.y * h - this.z * n, this.z * r - this.x * h, this.x * n - this.y * r);
	}
	heading() {
		return N(Math.atan2(this.y, this.x));
	}
};
function Ue(t) {
	return (
		'object' == typeof t && null !== t && 'x' in t && 'y' in t && 'number' == typeof t.x && 'number' == typeof t.y
	);
}
function Te(t) {
	return Array.isArray(t);
}
function Pe(t, i, s) {
	return Ue(t) ? [t.x, t.y, t.z ?? 0] : Te(t) ? [t[0] ?? 0, t[1] ?? 0, t[2] ?? 0] : [t ?? 0, i ?? 0, s ?? 0];
}
function Le(t, i, s) {
	return Pe(t, i, s);
}
function De(t, i, s) {
	if (Ue(t)) return [t.x, t.y, t.z ?? 1];
	if (Te(t)) {
		if (1 === t.length) {
			const i = t[0] ?? 1;
			return [i, i, i];
		}
		return [t[0] ?? 1, t[1] ?? 1, t[2] ?? 1];
	}
	return void 0 !== t && void 0 === i && void 0 === s ? [t, t, t] : [t ?? 1, i ?? 1, s ?? 1];
}
((te.prototype.sin = Math.sin),
	(te.prototype.cos = Math.cos),
	(te.prototype.tan = Math.tan),
	(te.prototype.asin = Math.asin),
	(te.prototype.acos = Math.acos),
	(te.prototype.atan = Math.atan),
	(te.prototype.atan2 = Math.atan2),
	(te.prototype.floor = Math.floor),
	(te.prototype.ceil = Math.ceil),
	(te.prototype.round = function (t, i = 0) {
		if (i <= 0) return Math.round(t);
		const s = Math.pow(10, i);
		return Math.round(t * s) / s;
	}),
	(te.prototype.abs = Math.abs),
	(te.prototype.min = function (...t) {
		const i = Array.isArray(t[0]) ? t[0] : t;
		return Math.min(...i);
	}),
	(te.prototype.max = function (...t) {
		const i = Array.isArray(t[0]) ? t[0] : t;
		return Math.max(...i);
	}),
	(te.prototype.sq = function (t) {
		return t * t;
	}),
	(te.prototype.sqrt = Math.sqrt),
	(te.prototype.pow = Math.pow),
	(te.prototype.fract = function (t) {
		return t - Math.floor(t);
	}),
	(te.prototype.exp = Math.exp),
	(te.prototype.log = Math.log),
	(te.prototype.lerp = function (t, i, s) {
		return t + (i - t) * s;
	}),
	(te.prototype.ease = function (t, i) {
		return (function (t, i) {
			const s = K[t];
			if (!s) throw new Error(`Unknown easing function "${t}". Available easing functions: ${G.join(', ')}.`);
			return s(
				(function (t) {
					return Number.isNaN(t) ? 0 : t === 1 / 0 ? 1 : t === -1 / 0 ? 0 : H(t, 0, 1);
				})(i)
			);
		})(t, i);
	}),
	(te.prototype.map = function (t, i, s, e, r) {
		return e + ((r - e) * (t - i)) / (s - i);
	}),
	(te.prototype.norm = function (t, i, s) {
		return this.map(t, i, s, 0, 1);
	}),
	(te.prototype.constrain = function (t, i, s) {
		return H(t, i, s);
	}),
	(te.prototype.clamp = function (t, i, s) {
		return H(t, i, s);
	}),
	(te.prototype.dist = function (t, i, s, e) {
		return z(t, i, s, e);
	}),
	(te.prototype.degrees = function (t) {
		return N(t);
	}),
	(te.prototype.radians = function (t) {
		return O(t);
	}),
	(te.prototype.createVector = function (t = 0, i = 0, s = 0) {
		return new Fe(t, i, s);
	}));
var ke = class t {
	uv;
	characters;
	length;
	constructor(t) {
		const i = E(t);
		if (i.length < 2) throw new Error('TextmodeGlyphRamp requires at least two characters.');
		((this.characters = t), (this.length = i.length), (this.uv = i));
	}
	at(t, i, s) {
		if (void 0 !== i || void 0 !== s) {
			if (void 0 === i || void 0 === s)
				throw new Error('TextmodeGlyphRamp.at() range mapping requires both min and max.');
			if (i === s) throw new Error('TextmodeGlyphRamp.at() requires min and max to be different.');
			return this.at((t - i) / (s - i));
		}
		const e = (function (t) {
				return Number.isNaN(t) ? 0 : t === 1 / 0 ? 1 : t === -1 / 0 ? 0 : Math.min(Math.max(t, 0), 1);
			})(t),
			r = Math.min(Math.floor(e * this.length), this.length - 1);
		return this.uv[r];
	}
	shift(i) {
		const s = ((Math.trunc(i) % this.length) + this.length) % this.length,
			e = [...this.uv.slice(s), ...this.uv.slice(0, s)].join('');
		return new t(e);
	}
};
te.prototype.createGlyphRamp = function (t) {
	return new ke(t);
};
var Re = {
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
	Be = Jt.FLOATS_PER_INSTANCE,
	Ie = Xt[Vt.RECTANGLE];
function Oe(t) {
	if (t.startsWith('fg=')) return { kind: 'fg', value: t.substring(3).trim() };
	if ('/fg' === t) return { kind: '/fg' };
	if (t.startsWith('bg=')) return { kind: 'bg', value: t.substring(3).trim() };
	if ('/bg' === t) return { kind: '/bg' };
	if (t.startsWith('rot=')) {
		const i = t.substring(4).trim(),
			s = i.length > 0 ? Number(i) : NaN;
		return { kind: 'rot', value: Number.isFinite(s) ? s : void 0 };
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
function Ne(t, i, s, e, r) {
	let n = new Float32Array(Math.max(16, Math.min(t.length, 256)) * Be);
	const h = [],
		o = [],
		a = (function (t) {
			const i = t.j.state.gn;
			return {
				fg: [He(i.nn)],
				bg: [He(i.hn)],
				invert: [i.dn],
				flipX: [i.un],
				flipY: [i.ln],
				charRotation: [i._n],
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
			if (t * Be <= n.length) return;
			let i = n.length / Be;
			for (; i < t;) i *= 2;
			const s = new Float32Array(i * Be);
			(s.set(n), (n = s));
		})(u + 1);
		const i = u * Be,
			e = c.Qt(t),
			o = a.fg[a.fg.length - 1],
			d = a.bg[a.bg.length - 1];
		((n[i + 0] = f * (1 + r)),
			(n[i + 1] = l * s),
			(n[i + 2] = 1),
			(n[i + 3] = 1),
			(n[i + 4] = e[0]),
			(n[i + 5] = e[1]),
			(n[i + 6] = e[2]),
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
			(n[i + 35] = Ie),
			(h[u] = l),
			u++);
	};
	for (; _ < t.length;) {
		const s = t[_];
		if ('\n' !== s)
			if (i && '[' === s && '[' === t[_ + 1]) (p('['), d++, f++, (_ += 2));
			else if (i && ']' === s && ']' === t[_ + 1]) (p(']'), d++, f++, (_ += 2));
			else {
				if (i && '[' === s) {
					const i = t.indexOf(']', _);
					if (-1 !== i) {
						const s = Oe(t.substring(_ + 1, i));
						if (s) {
							(Qe(s, a), (_ = i + 1));
							continue;
						}
					}
				}
				'\t' !== s ? (p(s), d++, f++, _++) : (d++, (f += e), _++);
			}
		else (o.push(d), (d = 0), l++, (f = 0), _++);
	}
	return (o.push(d), { data: n, glyphLines: h, glyphCount: u, lineWidths: o });
}
function Qe(t, i) {
	'fg' === t.kind
		? ze(i.fg, t.value)
		: '/fg' === t.kind
			? Ge(i.fg)
			: 'bg' === t.kind
				? ze(i.bg, t.value)
				: '/bg' === t.kind
					? Ge(i.bg)
					: 'inv' === t.kind
						? i.invert.push(!0)
						: '/inv' === t.kind
							? Ge(i.invert)
							: 'fx' === t.kind
								? i.flipX.push(!0)
								: '/fx' === t.kind
									? Ge(i.flipX)
									: 'fy' === t.kind
										? i.flipY.push(!0)
										: '/fy' === t.kind
											? Ge(i.flipY)
											: 'rot' === t.kind
												? i.charRotation.push(
														void 0 === t.value
															? i.charRotation[i.charRotation.length - 1]
															: W(t.value)
													)
												: '/rot' === t.kind && Ge(i.charRotation);
}
function ze(t, i) {
	const s = Re[i.toLowerCase()] || i;
	try {
		t.push([(e = ji.jc(s)).r / 255, e.g / 255, e.b / 255, e.a / 255]);
	} catch {
		t.push(t[t.length - 1]);
	}
	var e;
}
function He(t) {
	return [t[0], t[1], t[2], t[3]];
}
function Ge(t) {
	t.length > 1 && t.pop();
}
((te.prototype.printAlign = function (t, i = 'top') {
	((this.lv = t), (this.fv = i));
}),
	(te.prototype.print = function (t, i, s, e) {
		const r = e?.leading ?? 1,
			n = e?.tabSize ?? 4,
			h = e?.letterSpacing ?? 0,
			o = !1 !== e?.markup,
			a = this.lv || 'left',
			c = this.fv || 'top',
			u = Ne.call(this, t, o, r, n, h);
		0 !== u.glyphCount &&
			((function (t, i, s, e, r, n, h) {
				const { data: o, glyphLines: a, glyphCount: c, lineWidths: u } = i,
					l = u.length;
				let f = 0;
				'middle' === n ? (f = -Math.floor(((l - 1) * h) / 2)) : 'bottom' === n && (f = -(l - 1) * h);
				const d = t.j.state.Gn,
					_ = d.wr,
					p = d.vr,
					m = d.gr,
					v = d._r,
					g = d.pr,
					y = d.mr;
				for (let w = 0; w < c; w++) {
					const t = w * Be,
						i = u[a[w]] ?? 0;
					let n = 0;
					'center' === r ? (n = -Math.floor(i / 2)) : 'right' === r && (n = -i);
					const h = s + n + o[t + 0],
						c = e + f + o[t + 1];
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
			})(this, u, i, s, a, c, r),
			this.j.$o(u.data, u.glyphCount));
	}));
var je = /* @__PURE__ */ i({
		TextmodeImage: () => Wi,
		TextmodeSource: () => Ki,
		TextmodeTexture: () => xe,
		TextmodeVideo: () => Se,
	}),
	Ve = /* @__PURE__ */ i({
		INPUT_EVENT_NAMES: () => ns,
		gamepad: () => le,
		keyboard: () => ue,
		mouse: () => ae,
		touch: () => ce,
	}),
	Xe = /* @__PURE__ */ i({}),
	$e = ie.create,
	Ye = ie.setErrorLevel,
	Ke = ie.version;
export {
	ct as ErrorLayerController,
	ns as INPUT_EVENT_NAMES,
	R as LayerBlendMode,
	Us as LoadingLayerController,
	fe as ShapeAssemblyMode,
	G as TEXTMODE_EASE_NAMES,
	it as TextmodeCamera,
	Qs as TextmodeConversionManager,
	r as TextmodeError,
	J as TextmodeErrorLevel,
	ks as TextmodeFilterManager,
	P as TextmodeFont,
	yt as TextmodeFramebuffer,
	ke as TextmodeGlyphRamp,
	s as TextmodeGrid,
	Wi as TextmodeImage,
	rt as TextmodeLayer,
	Bs as TextmodeLayerManager,
	Ys as TextmodeRandom,
	bt as TextmodeShader,
	Ki as TextmodeSource,
	xe as TextmodeTexture,
	D as TextmodeTileset,
	Fe as TextmodeVector,
	Se as TextmodeVideo,
	te as Textmodifier,
	Js as color,
	zs as conversion,
	$e as create,
	ut as errors,
	Rs as filters,
	k as fonts,
	Ve as input,
	Is as layering,
	Ts as loading,
	je as media,
	Xe as plugins,
	Ks as random,
	Ye as setErrorLevel,
	ie as textmode,
	Ke as version,
};
