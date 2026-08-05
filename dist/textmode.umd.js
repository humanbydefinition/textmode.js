!(function (t, i) {
	'object' == typeof exports && 'undefined' != typeof module
		? i(exports)
		: 'function' == typeof define && define.amd
			? define(['exports'], i)
			: i(((t = 'undefined' != typeof globalThis ? globalThis : t || self).textmode = {}));
})(this, function (t) {
	Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' });
	var i = Object.defineProperty,
		e = (t, e) => {
			let s = {};
			for (var r in t) i(s, r, { get: t[r], enumerable: !0 });
			return (e || i(s, Symbol.toStringTag, { value: 'Module' }), s);
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
			A = new Set();
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
		r = class {
			D = new Set();
			k(t) {
				this.D.add(t);
			}
			dispose() {
				for (const t of this.D) t();
				this.D.clear();
			}
		},
		n = class t extends Error {
			constructor(i, e, s) {
				(super(t.R(i, e, s)), (this.name = 'TextmodeError'));
			}
			static R(i, e, s = {}) {
				const { includeContext: r = !0, includeFooterArrows: n = !0 } = s;
				return `${i}${
					r && e && Object.keys(e).length > 0
						? `\n\n📋 Context:${Object.entries(e)
								.map(([i, e]) => `\n  - ${i}: ${t.O(e)}`)
								.join('')}`
						: ''
				}${n ? `\n\n${'↓'.repeat(24)}\n` : '\n\n'}`;
			}
			static O(i) {
				if (null === i) return 'null';
				if (void 0 === i) return 'undefined';
				if ('string' == typeof i) return `"${i}"`;
				if ('number' == typeof i || 'boolean' == typeof i) return String(i);
				if (Array.isArray(i))
					return 0 === i.length
						? '[]'
						: i.length <= 5
							? `[${i.map((i) => t.O(i)).join(', ')}]`
							: `[${i
									.slice(0, 3)
									.map((i) => t.O(i))
									.join(', ')}, ... +${i.length - 3} more]`;
				if ('object' == typeof i) {
					const e = Object.keys(i);
					return 0 === e.length
						? '{}'
						: e.length <= 3
							? `{ ${e.map((e) => `${e}: ${t.O(i[e])}`).join(', ')} }`
							: `{ ${e
									.slice(0, 2)
									.map((e) => `${e}: ${t.O(i[e])}`)
									.join(', ')}, ... +${e.length - 2} more }`;
				}
				return String(i);
			}
		};
	function h(t, i, e) {
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
	var o = new WeakMap();
	function a(t) {
		return 0 === t.platformID || (3 === t.platformID && (1 === t.encodingID || 10 === t.encodingID));
	}
	function c(t) {
		const i = o.get(t);
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
								const s = new Map();
								for (const r of t.encodings ?? []) r.tableIndex === e && s.set(l(r), r);
								for (const r of i.encodings ?? []) r.tableIndex === e && s.set(l(r), r);
								for (const [r, n] of Object.entries(t.ids ?? {})) {
									if (n !== e) continue;
									const t = u(r, i.format, e);
									t && s.set(l(t), t);
								}
								return [...s.values()];
							})(t, i, e);
							return { table: i, tableIndex: e, encodings: s, isUnicode: s.some(a) };
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
											for (let r = e; r <= s; r++) if (h(t, r, i) > 0) return !0;
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
			return { characterTables: r, lookupTables: [...r].sort(f) };
		})(t);
		return (o.set(t, e), e);
	}
	function u(t, i, e) {
		const s = /^p(\d+)e(\d+)$/.exec(t);
		return s ? { platformID: Number(s[1]), encodingID: Number(s[2]), format: i, tableIndex: e } : null;
	}
	function l(t) {
		return `${t.platformID}:${t.encodingID}:${t.format}:${t.tableIndex}`;
	}
	function f(t, i) {
		const e = d(t) - d(i);
		return 0 !== e ? e : t.tableIndex - i.tableIndex;
	}
	function d(t) {
		const i = t.isUnicode ? 0 : 3;
		return 12 === t.table.format ? i : 4 === t.table.format ? i + 1 : i + 2;
	}
	var _ = class {
			I(t) {
				const i = [];
				return (
					(function (t) {
						return c(t).characterTables;
					})(t).forEach(({ table: t }) => {
						if (4 === t.format) {
							const e = this.N(t);
							i.push(...e);
						} else if (12 === t.format) {
							const e = this.j(t);
							i.push(...e);
						}
					}),
					[...new Set(i)]
				);
			}
			N(t) {
				const i = [];
				if (!(t.startCount && t.endCount && t.idRangeOffset && t.idDelta)) return i;
				for (let e = 0; e < t.startCount.length; e++) {
					const s = t.startCount[e],
						r = t.endCount[e];
					if (65535 !== s || 65535 !== r) for (let n = s; n <= r; n++) h(t, n, e) > 0 && this.H(i, n);
				}
				return i;
			}
			j(t) {
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
		p = class {
			constructor(t) {
				((this.G = t),
					(this.V = null),
					(this.X = 0),
					(this.h = 0),
					(this.o = 0),
					(this.u = 0),
					(this.p = document.createElement('canvas')),
					(this.$ = this.p.getContext('2d', { alpha: !0 })));
			}
			Y(t, i, e) {
				((this.X = Math.ceil(Math.sqrt(t))),
					(this.h = Math.ceil(t / this.X)),
					(this.o = i * this.X),
					(this.u = e * this.h),
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
					: (this.V = this.G.W(this.o, this.u, 1, { filter: 'nearest', depth: !1 })),
					this.V.Z(this.p));
			}
			L() {
				(this.V?.dispose(), (this.V = null));
			}
		},
		m = class {
			constructor(t) {
				this.q = new p(t);
			}
			J(t, i, e, s) {
				this.q.Y(t.length, i.width, i.height);
				const r = this.q.$;
				((r.textBaseline = 'top'),
					(r.textAlign = 'left'),
					(r.fillStyle = 'white'),
					this.tt(t, i, this.q.X, e, s),
					this.q.K());
			}
			tt(t, i, e, s, r) {
				const n = s / r.head.unitsPerEm,
					h = this.q.$;
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
						g = Math.round(p - 0.5 * i.width),
						v = Math.round(m - 0.5 * s),
						y = g + 0.5 * (i.width - f),
						w = v + r.hhea.ascender * n;
					this.it(h, l, y, w, n);
				}
			}
			it(t, i, e, s, r) {
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
		g = class {
			et(t, i) {
				let e = 0;
				for (const { table: s } of (function (t) {
					return c(t).lookupTables;
				})(t))
					if ((4 === s.format ? (e = this.st(i, s)) : 12 === s.format && (e = this.rt(i, s)), e > 0)) break;
				return e;
			}
			nt(t, i) {
				const e = i.codePointAt(0);
				return void 0 === e ? 0 : this.et(t, e);
			}
			ht(t, i) {
				const e = t.hmtx;
				return e && e.aWidth && 0 !== e.aWidth.length
					? i < e.aWidth.length
						? e.aWidth[i]
						: e.aWidth[e.aWidth.length - 1]
					: 0;
			}
			ot(t, i) {
				const e = i / t.head.unitsPerEm;
				return { lineHeight: t.hhea.ascender * e - t.hhea.descender * e + t.hhea.lineGap * e, scale: e };
			}
			st(t, i) {
				const e = i.endCount.length;
				let s = -1;
				for (let r = 0; r < e; r++)
					if (t <= i.endCount[r]) {
						s = r;
						break;
					}
				return -1 === s || t < i.startCount[s] ? 0 : h(i, t, s);
			}
			rt(t, i) {
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
			ct;
			constructor() {
				this.ct = new g();
			}
			ut(t, i, e) {
				let s = 0;
				const r = this.ct.ot(e, i);
				let n = 0,
					h = !1;
				for (const o of t) {
					const t = o.glyphData;
					let i = 0;
					if (!t && ((i = this.ct.nt(e, o.character)), 0 === i)) continue;
					const a = (t?.advanceWidth ?? this.ct.ht(e, i)) * r.scale;
					if (((s = Math.max(s, a)), t)) {
						const i = Math.max(0, t.yMax - t.yMin) * r.scale;
						((n = Math.max(n, i)), (h = !0));
					}
				}
				return (h || (n = r.lineHeight), { width: Math.ceil(s), height: Math.ceil(n) });
			}
		},
		y = {
			readShort: (t, i) => ((y.t.uint16[0] = (t[i] << 8) | t[i + 1]), y.t.int16[0]),
			readUshort: (t, i) => (t[i] << 8) | t[i + 1],
			readUshorts(t, i, e) {
				const s = [];
				for (let r = 0; r < e; r++) s.push(y.readUshort(t, i + 2 * r));
				return s;
			},
			readUint(t, i) {
				const e = y.t.uint8;
				return ((e[3] = t[i]), (e[2] = t[i + 1]), (e[1] = t[i + 2]), (e[0] = t[i + 3]), y.t.uint32[0]);
			},
			readASCII(t, i, e) {
				let s = '';
				for (let r = 0; r < e; r++) s += String.fromCharCode(t[i + r]);
				return s;
			},
			t: (() => {
				const t = new ArrayBuffer(8);
				return {
					uint8: new Uint8Array(t),
					int16: new Int16Array(t),
					uint16: new Uint16Array(t),
					uint32: new Uint32Array(t),
				};
			})(),
		};
	function w(t) {
		return (t + 3) & -4;
	}
	function b(t, i, e) {
		((t[i] = (e >>> 8) & 255), (t[i + 1] = 255 & e));
	}
	function M(t, i, e) {
		((t[i] = (e >>> 24) & 255), (t[i + 1] = (e >>> 16) & 255), (t[i + 2] = (e >>> 8) & 255), (t[i + 3] = 255 & e));
	}
	function A(t, i, e) {
		for (let s = 0; s < e.length; s++) t[i + s] = 255 & e.charCodeAt(s);
	}
	function C(t, i, e) {
		const s = i + e;
		let r = 0;
		const n = y.t;
		for (let h = i; h < s; h += 4)
			((n.uint8[3] = t[h] || 0),
				(n.uint8[2] = t[h + 1] || 0),
				(n.uint8[1] = t[h + 2] || 0),
				(n.uint8[0] = t[h + 3] || 0),
				(r = (r + (n.uint32[0] >>> 0)) >>> 0));
		return r >>> 0;
	}
	var x,
		S = {
			cmap: {
				parseTab(t, i, e) {
					const s = { tables: [], ids: {}, encodings: [], off: i };
					((t = new Uint8Array(t.buffer, i, e)), (i = 0));
					const r = y,
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
					const e = y,
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
					return (
						(a.idRangeOffset = r(t, i, o)),
						(i += 2 * o),
						(a.glyphIdArray = r(t, i, (n + h - i) >> 1)),
						a
					);
				},
				parse12(t, i) {
					const e = y.readUint;
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
					const s = y;
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
					const s = y;
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
					const s = y;
					return (s.readUint(t, i), (i += 4), { numGlyphs: s.readUshort(t, i) });
				},
			},
			hmtx: {
				parseTab(t, i, e, s) {
					const r = y,
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
					const r = y,
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
				lt(t, i) {
					const e = y,
						s = t.ft,
						r = t.loca;
					if (r[i] === r[i + 1]) return null;
					const n = E.findTable(s, 'glyf', t.dt);
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
		E = {
			parse(t) {
				const i = new Uint8Array(t),
					e = S,
					s = {},
					r = { ft: i, _t: 0, dt: 0 };
				for (const n in e) {
					const t = n,
						h = E.findTable(i, t, 0);
					if (h) {
						const [n, o] = h;
						let a = s[n];
						(null == a && ((a = e[t].parseTab(i, n, o, r)), (s[n] = a)), Object.assign(r, { [t]: a }));
					}
				}
				return [r];
			},
			findTable(t, i, e) {
				const s = y,
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
			T: S,
			B: y,
		};
	function F(t) {
		if (0 === t.length) return [];
		const i =
			void 0 !== x
				? x
				: (x =
						'undefined' != typeof Intl && 'Segmenter' in Intl
							? new Intl.Segmenter(void 0, { granularity: 'grapheme' })
							: null);
		return i ? Array.from(i.segment(t), (t) => t.segment) : Array.from(t);
	}
	function U(t) {
		return Array.from(t, (t) => t.codePointAt(0)).filter((t) => void 0 !== t);
	}
	var T = class {
		gt;
		constructor() {
			this.gt = new g();
		}
		vt(t, i) {
			const e = [],
				s = new Map();
			return (
				t.forEach((t, r) => {
					const n = { character: t, unicode: U(t)[0] ?? 0, color: this.yt(r), glyphData: this.wt(i, t) };
					(e.push(n), s.set(t, n));
				}),
				{ array: e, map: s }
			);
		}
		yt(t) {
			return [(t % 256) / 255, (Math.floor(t / 256) % 256) / 255, 0];
		}
		wt(t, i) {
			const e = i.codePointAt(0) || 0,
				s = this.gt.et(t, e);
			if (0 === s) return null;
			const r = this.gt.ht(t, s),
				n = E.T.glyf.lt(t, s);
			return n ? { ...n, advanceWidth: r } : null;
		}
	};
	function P(t) {
		if ('head' !== t.tag || t.data.length < 12) return C(t.data, 0, w(t.data.length));
		const i = new Uint8Array(t.data);
		return (M(i, 8, 0), C(i, 0, w(i.length)));
	}
	var L = class t extends r {
			G;
			bt;
			Mt = [];
			At = new Map();
			Ct = 16;
			xt = { width: 0, height: 0 };
			St;
			Et;
			Ft;
			Tt;
			Pt = !1;
			constructor(t, i = 16) {
				(super(),
					(this.G = t),
					(this.Ct = i),
					(this.St = new _()),
					(this.Et = new m(t)),
					(this.Ft = new v()),
					(this.Tt = new T()));
			}
			Lt(i = {}) {
				if (!this.Pt) throw new n('Cannot fork an uninitialized TextmodeFont.');
				const e = i.fontSize ?? this.Ct,
					s = new t(this.G, e);
				return ((s.bt = this.bt), (s.Mt = this.Mt), (s.At = new Map(this.At)), (s.Pt = !0), s.Dt(), s);
			}
			async kt(t) {
				if (this.Pt) return;
				if (!t) throw new n('TextmodeFont requires an explicit font source.');
				const i = await this.Rt(t);
				await this.Ot(i);
			}
			Bt(t) {
				if (void 0 === t) return this.Ct;
				((this.Ct = t), this.Dt());
			}
			Dt() {
				((this.xt = this.Ft.ut(this.Mt, this.Ct, this.bt)), this.Et.J(this.Mt, this.xt, this.Ct, this.bt));
			}
			async It(t) {
				try {
					const i = await this.Rt(t);
					await this.Ot(i);
				} catch (i) {
					throw new n(`Failed to load font: ${i instanceof Error ? i.message : 'Unknown error'}`, {
						originalError: i,
					});
				}
			}
			async Rt(t) {
				const i = await fetch(t);
				if (!i.ok) throw new n(`Failed to load font file: ${i.status} ${i.statusText}`);
				return i.arrayBuffer();
			}
			async Ot(t) {
				const i = await (async function (t) {
					const i = y.readASCII(new Uint8Array(t), 0, 4);
					if ('wOFF' === i) {
						const i = await (async function (t) {
							if ('undefined' == typeof DecompressionStream)
								throw new Error(
									'[textmode.js] WOFF font loading requires DecompressionStream support.'
								);
							const i = y,
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
								for (const d of e) ((c[d.tag] = a), (a = w(a + d.data.length)));
								const u = new Uint8Array(Math.max(i || 0, a));
								(M(u, 0, t), b(u, 4, s), b(u, 6, h), b(u, 8, n), b(u, 10, o));
								let l = 12;
								for (const d of e)
									(A(u, l, d.tag),
										(l += 4),
										M(u, l, P(d)),
										(l += 4),
										M(u, l, c[d.tag]),
										(l += 4),
										M(u, l, d.data.length),
										(l += 4));
								for (const d of e) u.set(d.data, c[d.tag]);
								const f = c.head;
								if (void 0 !== f) {
									const t = (function (t, i) {
										const e = i + 8,
											s = [t[e], t[e + 1], t[e + 2], t[e + 3]];
										M(t, e, 0);
										const r = (2981146554 - (C(t, 0, w(t.length)) >>> 0)) >>> 0;
										return (
											(t[e] = s[0]),
											(t[e + 1] = s[1]),
											(t[e + 2] = s[2]),
											(t[e + 3] = s[3]),
											r >>> 0
										);
									})(u, f);
									M(u, f + 8, t);
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
						return E.parse(i);
					}
					if ('wOF2' === i)
						throw new Error('[textmode.js] WOFF2 fonts are not supported. Use .woff, .ttf, or .otf.');
					return E.parse(t);
				})(t);
				if (!i || 0 === i.length) throw new Error('Failed to parse font file');
				((this.bt = i[0]), await this.Nt());
			}
			async Nt() {
				const t = this.St.I(this.bt);
				if (0 === t.length) throw new n('[textmode.js] Font has no supported cmap glyphs.');
				const { array: i, map: e } = this.Tt.vt(t, this.bt);
				((this.Mt = i), (this.At = e), this.Dt(), (this.Pt = !0));
			}
			jt(t) {
				const i = this.At.get(t);
				return i ? i.color : [1, 1, 0];
			}
			Qt(t) {
				return F(t).map((t) => {
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
		D = class {
			constructor(t) {
				this.q = new p(t);
			}
			J(t, i, e, s) {
				(this.q.Y(t.length, i.width, i.height), this.zt(t, i, e, s), this.q.K());
			}
			L() {
				this.q.L();
			}
			zt(t, i, e, s) {
				const r = this.q.$,
					n = this.q.X;
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
				return this.q.V;
			}
			get columns() {
				return this.q.X;
			}
			get rows() {
				return this.q.h;
			}
		},
		k = class t extends r {
			static Ht = new WeakMap();
			static Gt = new WeakMap();
			static Vt = 1;
			G;
			Et = null;
			Mt = [];
			At = new Map();
			Xt = { width: 0, height: 0 };
			$t = { width: 0, height: 0 };
			Ct = 0;
			Yt;
			Kt;
			Wt;
			Zt;
			Pt = !1;
			constructor(t, i, e) {
				(super(), (this.G = t), (this.Ct = void 0 === i ? 0 : Math.abs(i)), (this.Wt = e));
			}
			Lt(i = {}) {
				if (!this.Pt || !this.Kt || !this.Zt) throw new n('Cannot fork an uninitialized TextmodeTileset.');
				const e = new t(this.G, i.fontSize ?? this.Ct);
				return (
					(e.Mt = this.Zt.characters),
					(e.At = new Map(this.Zt.characterMap)),
					(e.Xt = { ...this.Zt.nativeCellDimensions }),
					(e.Yt = this.Yt),
					(e.Kt = { ...this.Kt }),
					(e.Wt = this.Wt),
					(e.Pt = !0),
					e.qt(this.Zt),
					e.Jt(),
					e
				);
			}
			async kt(t) {
				if (this.Pt) return;
				if (((this.Wt = t ?? this.Wt), !this.Wt))
					throw new n('Cannot initialize a TextmodeTileset without source options.');
				const i = this.ti(this.Wt),
					e = this.ii(i);
				if (e)
					return (
						this.qt(e),
						(this.Mt = e.characters),
						(this.At = new Map(e.characterMap)),
						(this.Xt = { ...e.nativeCellDimensions }),
						(this.Kt = { ...e.layout }),
						0 === this.Ct && (this.Ct = Math.abs(this.Wt.fontSize ?? e.nativeCellDimensions.height)),
						this.Jt(),
						void (this.Pt = !0)
					);
				const s = await this.ei(this.Wt.source),
					r = this.si(s),
					h = this.ri(this.Wt, r.width, r.height),
					o = this.ni(this.Wt, h),
					a = await this.hi(this.Wt, o, h.columns),
					c = this.oi(a),
					u = new Map(c.map((t) => [t.character, t])),
					l = new D(this.G);
				((this.Yt = s),
					(this.Kt = h),
					(this.Xt = { width: h.cellWidth, height: h.cellHeight }),
					(this.Mt = c),
					(this.At = u),
					0 === this.Ct && (this.Ct = Math.abs(this.Wt.fontSize ?? h.cellHeight)),
					this.Jt(),
					l.J(this.Mt, this.Xt, s, h),
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
			Bt(t) {
				if (void 0 === t) return this.Ct;
				((this.Ct = Math.abs(t)), this.Jt());
			}
			jt(t) {
				const i = this.At.get(t);
				return i ? i.color : [1, 1, 0];
			}
			Qt(t) {
				return F(t).map((t) => this.jt(t));
			}
			dispose() {
				(this.ai(), super.dispose());
			}
			qt(i) {
				this.Zt !== i &&
					(this.ai(),
					t.ci(this.G).set(i.cacheKey, i),
					(i.referenceCount += 1),
					(this.Zt = i),
					(this.Et = i.textureAtlas));
			}
			ai() {
				const i = this.Zt;
				i
					? ((i.referenceCount -= 1),
						i.referenceCount <= 0 && (i.textureAtlas.L(), t.Ht.get(this.G)?.delete(i.cacheKey)),
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
				return t.Ht.get(this.G)?.get(i);
			}
			static ci(i) {
				let e = t.Ht.get(i);
				return (e || ((e = new Map()), t.Ht.set(i, e)), e);
			}
			static fi(i) {
				const e = t.Gt.get(i);
				if (void 0 !== e) return e;
				const s = t.Vt++;
				return (t.Gt.set(i, s), s);
			}
			async ei(t) {
				if ('string' != typeof t && !(t instanceof URL)) return t;
				const i = String(t);
				return new Promise((t, e) => {
					const s = new Image();
					((s.crossOrigin = 'anonymous'),
						(s.onload = () => t(s)),
						(s.onerror = () => e(new n(`Failed to load tileset image: ${i}`))),
						(s.src = i));
				});
			}
			async hi(t, i, e) {
				if (void 0 !== t.map) {
					const s = await this._i(t.map),
						r = this.pi(s, i, e);
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
			pi(t, i, e) {
				const s = Math.ceil(i / e);
				if (t.length !== s)
					throw new n(
						`Tileset map must contain exactly ${s} row${1 === s ? '' : 's'} for ${i} mapped tile${1 === i ? '' : 's'}.`
					);
				const r = [];
				let h = i;
				for (let o = 0; o < t.length; o++) {
					const i = F(t[o]),
						s = Math.min(e, h);
					if (i.length !== s)
						throw new n(
							`Tileset map row ${o + 1} must contain exactly ${s} character cell${1 === s ? '' : 's'}.`
						);
					(r.push(...i), (h -= s));
				}
				return r;
			}
			gi(t) {
				this.bi(t);
				const i = [];
				for (let e = 0; e < t; e++) i.push(String.fromCodePoint(32 + e));
				return i;
			}
			async wi(t) {
				let i;
				try {
					i = await fetch(t);
				} catch (e) {
					throw new n(`Failed to load tileset map: ${e instanceof Error ? e.message : 'Unknown error'}`);
				}
				if (!i.ok) throw new n(`Failed to load tileset map: ${i.status} ${i.statusText}`);
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
			si(t) {
				const i = t,
					e = i.naturalWidth ?? i.videoWidth ?? i.displayWidth ?? i.width,
					s = i.naturalHeight ?? i.videoHeight ?? i.displayHeight ?? i.height;
				if ('number' != typeof e || 'number' != typeof s || e <= 0 || s <= 0)
					throw new n('Tileset source must expose positive pixel dimensions.');
				return { width: e, height: s };
			}
			ri(t, i, e) {
				const s = t.marginX ?? t.margin ?? 0,
					r = t.marginY ?? t.margin ?? 0,
					h = t.spacingX ?? t.spacing ?? 0,
					o = t.spacingY ?? t.spacing ?? 0;
				if (t.columns <= 0 || t.rows <= 0) throw new n('Tileset columns and rows must be greater than 0.');
				const a = i - 2 * s - h * (t.columns - 1),
					c = e - 2 * r - o * (t.rows - 1);
				if (a <= 0 || c <= 0) throw new n('Tileset margins and spacing leave no usable tile area.');
				const u = a / t.columns,
					l = c / t.rows;
				if (!Number.isInteger(u) || !Number.isInteger(l))
					throw new n('Tileset dimensions do not divide evenly. Check columns, rows, margins, and spacing.');
				return {
					columns: t.columns,
					rows: t.rows,
					marginX: s,
					marginY: r,
					spacingX: h,
					spacingY: o,
					cellWidth: u,
					cellHeight: l,
				};
			}
			ni(t, i) {
				const e = i.columns * i.rows,
					s = t.count ?? e;
				if (s <= 0 || s > e) throw new n(`Tileset count must be between 1 and ${e}.`);
				return s;
			}
			bi(t) {
				if (32 + t - 1 > 1114111)
					throw new n('Tileset automatic character assignment exceeds the supported Unicode range.');
			}
			mi(t, i) {
				const e = new Map();
				for (let s = 0; s < t.length; s++) {
					const r = t[s],
						h = e.get(r);
					if (void 0 !== h)
						throw new n(
							`${i} contains duplicate character ${this.Ai(r)} at tile ${h + 1} and tile ${s + 1}.`
						);
					e.set(r, s);
				}
			}
			Ai(t) {
				const i = U(t);
				if (0 === i.length) return '""';
				const e = i.map((t) => `U+${t.toString(16).toUpperCase().padStart(4, '0')}`).join(' ');
				return `${JSON.stringify(t)} (${e})`;
			}
			oi(t) {
				const i = [];
				for (let e = 0; e < t.length; e++) {
					const s = t[e],
						r = U(s)[0];
					if (void 0 === r)
						throw new n(`Tileset character mapping produced an empty character at tile ${e + 1}.`);
					i.push({ character: s, unicode: r, color: this.Ci(e) });
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
		R = e({ TextmodeFont: () => L, TextmodeTileset: () => k }),
		O = (function (t) {
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
		B = new Set(Object.values(O).filter((t) => 'number' == typeof t));
	function I(t) {
		return 'number' == typeof t && B.has(t);
	}
	function N(t) {
		return t * (Math.PI / 180);
	}
	function j(t) {
		return t * (180 / Math.PI);
	}
	function Q(t, i, e, s) {
		return j(Math.atan2(s - i, e - t));
	}
	function z(t, i, e, s) {
		return Math.hypot(e - t, s - i);
	}
	function H(t, i, e) {
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
		V = 1.70158,
		X = 2.5949095,
		$ = (2 * Math.PI) / 3,
		Y = (2 * Math.PI) / 4.5;
	function K(t) {
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
	var W = {
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
		inBack: (t) => 2.70158 * t * t * t - V * t * t,
		outBack: (t) => 1 + 2.70158 * Math.pow(t - 1, 3) + V * Math.pow(t - 1, 2),
		inOutBack: (t) =>
			t < 0.5
				? (Math.pow(2 * t, 2) * (7.189819 * t - X)) / 2
				: (Math.pow(2 * t - 2, 2) * (3.5949095 * (2 * t - 2) + X) + 2) / 2,
		inElastic: (t) => (0 === t || 1 === t ? t : -Math.pow(2, 10 * t - 10) * Math.sin((10 * t - 10.75) * $)),
		outElastic: (t) => (0 === t || 1 === t ? t : Math.pow(2, -10 * t) * Math.sin((10 * t - 0.75) * $) + 1),
		inOutElastic: (t) =>
			0 === t || 1 === t
				? t
				: t < 0.5
					? (-Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * Y)) / 2
					: (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * Y)) / 2 + 1,
		inBounce: (t) => 1 - K(1 - t),
		outBounce: K,
		inOutBounce: (t) => (t < 0.5 ? (1 - K(1 - 2 * t)) / 2 : (1 + K(2 * t - 1)) / 2),
	};
	function Z(t) {
		return (((t % 360) + 360) % 360) / 360;
	}
	function q(t = new Float32Array(16)) {
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
	function J(t, i, e, s = new Float32Array(16)) {
		let r = t[0] - i[0],
			n = t[1] - i[1],
			h = t[2] - i[2],
			o = Math.hypot(r, n, h);
		0 === o ? (h = 1) : ((o = 1 / o), (r *= o), (n *= o), (h *= o));
		let a = e[1] * h - e[2] * n,
			c = e[2] * r - e[0] * h,
			u = e[0] * n - e[1] * r;
		((o = Math.hypot(a, c, u)),
			0 === o ? ((a = 1), (c = 0), (u = 0)) : ((o = 1 / o), (a *= o), (c *= o), (u *= o)));
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
	var tt = (function (t) {
			return (
				(t[(t.SILENT = 0)] = 'SILENT'),
				(t[(t.WARNING = 1)] = 'WARNING'),
				(t[(t.ERROR = 2)] = 'ERROR'),
				(t[(t.THROW = 3)] = 'THROW'),
				t
			);
		})({}),
		it = class t {
			static Si = null;
			Wt = { globalLevel: 3 };
			Ei = new Set();
			constructor() {}
			static xi() {
				return (t.Si || (t.Si = new t()), t.Si);
			}
			Fi(t, i) {
				const e = '%c[textmode.js] Oops! (╯°□°)╯︵ Something went wrong in your code.',
					s = 'color: #f44336; font-weight: bold; background: #ffebee; padding: 2px 6px; border-radius: 3px;';
				switch (this.Wt.globalLevel) {
					case 0:
						return !1;
					case 1:
						return (
							!!this.Ti('warning', t, i) &&
							(console.group(e, s),
							console.warn(n.R(t, i, { includeFooterArrows: !1 })),
							console.groupEnd(),
							!1)
						);
					case 2:
						return (
							!!this.Ti('error', t, i) &&
							(console.group(e, s),
							console.error(n.R(t, i, { includeFooterArrows: !1 })),
							console.groupEnd(),
							!1)
						);
					default:
						throw new n(t, i);
				}
			}
			Pi(t, i, e) {
				return !!t || (this.Fi(i, e), !1);
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
			Ti(t, i, e) {
				const s = this.Ri(t, i, e);
				return !this.Ei.has(s) && (this.Ei.add(s), !0);
			}
			Ri(t, i, e) {
				return `${t}|${i}|${e ? this.Oi(e) : ''}`;
			}
			Oi(t) {
				return null == t
					? String(t)
					: 'number' == typeof t || 'boolean' == typeof t || 'string' == typeof t
						? JSON.stringify(t)
						: Array.isArray(t)
							? `[${t.map((t) => this.Oi(t)).join(',')}]`
							: 'object' == typeof t
								? `{${Object.entries(t)
										.sort(([t], [i]) => t.localeCompare(i))
										.map(([t, i]) => `${JSON.stringify(t)}:${this.Oi(i)}`)
										.join(',')}}`
								: String(t);
			}
		}.xi(),
		et = class t {
			Bi;
			Ii;
			Ni;
			ji;
			Qi;
			zi;
			Hi;
			Gi;
			Vi;
			constructor(t = 0, i = 0, e = 0, s = 0, r = 0, n = 0, h = 0, o = 1, a = 0) {
				((this.Bi = t),
					(this.Ii = i),
					(this.Ni = e),
					(this.ji = s),
					(this.Qi = r),
					(this.zi = n),
					(this.Hi = h),
					(this.Gi = o),
					(this.Vi = a));
			}
			static Xi(i, e) {
				const s = i.Yi.$i,
					r = i.Yi.Ki,
					n = i.Yi.Wi,
					h = i.Yi.Zi,
					o = i.Yi.qi,
					a = i.Yi.Ji;
				if (i.Yi.te) {
					const c = (0.5 * Math.max(1, e)) / Math.tan(0.5 * i.Yi.ie);
					return new t(s, r, n + c, s, r, n, h, o, a);
				}
				return new t(i.Yi.ee, i.Yi.se, i.Yi.re, s, r, n, h, o, a);
			}
			ne(t) {
				t.Yi.he(this.Bi, this.Ii, this.Ni, this.ji, this.Qi, this.zi, this.Hi, this.Gi, this.Vi);
			}
			setPosition(t, i, e) {
				return ((this.Bi = t), (this.Ii = i), (this.Ni = e), this);
			}
			lookAt(t, i, e) {
				return ((this.ji = t), (this.Qi = i), (this.zi = e), this);
			}
			setUp(t, i, e) {
				return ((this.Hi = t), (this.Gi = i), (this.Vi = e), this);
			}
			move(t, i, e) {
				return (
					(this.Bi += t),
					(this.Ii += i),
					(this.Ni += e),
					(this.ji += t),
					(this.Qi += i),
					(this.zi += e),
					this
				);
			}
			copy() {
				return new t(this.Bi, this.Ii, this.Ni, this.ji, this.Qi, this.zi, this.Hi, this.Gi, this.Vi);
			}
			get eyeX() {
				return this.Bi;
			}
			get eyeY() {
				return this.Ii;
			}
			get eyeZ() {
				return this.Ni;
			}
			get targetX() {
				return this.ji;
			}
			get targetY() {
				return this.Qi;
			}
			get targetZ() {
				return this.zi;
			}
			get upX() {
				return this.Hi;
			}
			get upY() {
				return this.Gi;
			}
			get upZ() {
				return this.Vi;
			}
		},
		st = class {
			oe = null;
			te = !0;
			ee = 0;
			se = 0;
			re = 0;
			$i = 0;
			Ki = 0;
			Wi = 0;
			Zi = 0;
			qi = 1;
			Ji = 0;
			ae = 'perspective';
			ce;
			ue;
			le;
			constructor(t) {
				((this.te = t.Yi.te),
					(this.ee = t.Yi.ee),
					(this.se = t.Yi.se),
					(this.re = t.Yi.re),
					(this.$i = t.Yi.$i),
					(this.Ki = t.Yi.Ki),
					(this.Wi = t.Yi.Wi),
					(this.Zi = t.Yi.Zi),
					(this.qi = t.Yi.qi),
					(this.Ji = t.Yi.Ji),
					t.Yi.te ||
						(this.oe = new et(
							t.Yi.ee,
							t.Yi.se,
							t.Yi.re,
							t.Yi.$i,
							t.Yi.Ki,
							t.Yi.Wi,
							t.Yi.Zi,
							t.Yi.qi,
							t.Yi.Ji
						)),
					t.Yi.fe ? (this.ae = 'ortho') : ((this.ae = 'perspective'), (this.ce = (180 * t.Yi.ie) / Math.PI)),
					(this.ue = t.Yi.ue),
					(this.le = t.Yi.le));
			}
			createCamera(t, i) {
				let e;
				if (this.te) {
					const s = Math.max(1, t),
						r = this.ce ?? i,
						n = (0.5 * s) / Math.tan((r * Math.PI) / 360);
					e = new et(this.$i, this.Ki, this.Wi + n, this.$i, this.Ki, this.Wi, this.Zi, this.qi, this.Ji);
				} else e = new et(this.ee, this.se, this.re, this.$i, this.Ki, this.Wi, this.Zi, this.qi, this.Ji);
				return (this.setCamera(e), e);
			}
			setCamera(t) {
				((this.oe = t),
					(this.te = !1),
					(this.ee = t.eyeX),
					(this.se = t.eyeY),
					(this.re = t.eyeZ),
					(this.$i = t.targetX),
					(this.Ki = t.targetY),
					(this.Wi = t.targetZ),
					(this.Zi = t.upX),
					(this.qi = t.upY),
					(this.Ji = t.upZ));
			}
			resetCamera() {
				((this.oe = null),
					(this.te = !0),
					(this.ee = 0),
					(this.se = 0),
					(this.re = 0),
					(this.$i = 0),
					(this.Ki = 0),
					(this.Wi = 0),
					(this.Zi = 0),
					(this.qi = 1),
					(this.Ji = 0));
			}
			camera(t, i, e, s = 0, r = 0, n = 0, h = 0, o = 1, a = 0) {
				(this.oe
					? this.oe.setPosition(t, i, e).lookAt(s, r, n).setUp(h, o, a)
					: (this.oe = new et(t, i, e, s, r, n, h, o, a)),
					(this.te = !1),
					(this.ee = t),
					(this.se = i),
					(this.re = e),
					(this.$i = s),
					(this.Ki = r),
					(this.Wi = n),
					(this.Zi = h),
					(this.qi = o),
					(this.Ji = a));
			}
			lookAt(t, i, e, s, r, n) {
				(this.oe &&
					(this.oe.lookAt(t, i, e),
					(void 0 === s && void 0 === r && void 0 === n) ||
						this.oe.setUp(s ?? this.oe.upX, r ?? this.oe.upY, n ?? this.oe.upZ)),
					(this.$i = t),
					(this.Ki = i),
					(this.Wi = e),
					void 0 !== s && (this.Zi = s),
					void 0 !== r && (this.qi = r),
					void 0 !== n && (this.Ji = n));
			}
			perspective(t, i, e) {
				((this.ae = 'perspective'),
					void 0 !== t && (this.ce = t),
					void 0 !== i && (this.ue = i),
					void 0 !== e && (this.le = e));
			}
			ortho(t, i) {
				((this.ae = 'ortho'), void 0 !== t && (this.ue = t), void 0 !== i && (this.le = i));
			}
			getActiveCamera() {
				return this.oe;
			}
			applyToState(t) {
				if (('ortho' === this.ae ? t.Yi.de(this.ue, this.le) : t.Yi._e(this.ce, this.ue, this.le), this.te))
					return (
						t.Yi.pe(),
						void (
							(0 === this.$i &&
								0 === this.Ki &&
								0 === this.Wi &&
								0 === this.Zi &&
								1 === this.qi &&
								0 === this.Ji) ||
							t.Yi.me(this.$i, this.Ki, this.Wi, this.Zi, this.qi, this.Ji)
						)
					);
				t.Yi.he(this.ee, this.se, this.re, this.$i, this.Ki, this.Wi, this.Zi, this.qi, this.Ji);
			}
		},
		rt = Object.freeze({
			source: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAITElEQVR42u1d2XLkIAz0//909jWVHYPUhyR7SNXUHnhsDI3ULQlyXdf1s/usfiLtv6/5+/dPz4r0Y3XN6ru750fHIPv8u3FC3u/umt39b/oXf/nfN7gb0FU7OwBo+18gRiYrsgAQgN5dd7dYVAD4ND+jAJCxHp8GKfLyu9WwAyVjAVfvkgVA1PoEF5jfBUxpX012BphZAEdWPeviVgBYjVcYAHc3Qgc4stJUFijCAVgAZFwQyyEibYn+5VxAZFI+mTiFj4/4bYZEoi5gBzC1f9+12TiAyge6J5ABEEMCs8QPVTHI6qdUwPlc1OQP//gHTrEaoyuQsTCohagGohwACMPNtKOrbWfSMiSzkoMgZlwV6MrwmI8AWAVMMhoW9bXI5K6IJ6oCUAsTVUU7tZUNdBELdAYAohqZkZiR560UzK49S5KRMK4NANHViLQ7Qq27OACaC4ia2Kxejy4K9Pm0C+gEADIpWSugirQhk6/gANkwM8wBOkkgk0mrYvkulRCxUEggKwSAJ8jA8xkQB4iij5GBzPfQFZJZRVkFcwAgkmHZ2Ds6ic72iZHNEgBk0rUrQhm5PwqADEvPyrBpbg/mAKxpRy1AliDtJKEaAEiwZ8jk1yWDsjo840ZWQZcqAERkMds3hcqisoHsgxUVNRmXIBogqY9nXZCh7zNcABL0KVwlMoLXAYDNvY8WHkbKemQgq6OzcXxhJIuNhcv63wWIbCn6fySQKCgMmejM/RX+LZNZrOi/SmWoXMBtLmCVGmYA4ACMcsVMAQBjAYlnaAIpTNVrdMCZXHp2kBmAd/IAwJLWhVIzE6y0INn/V4Sqp1qAZU0gAwBV2bLLRLMAYAs+OjlAKBDEsGgFy87G29XZQLZ/T7iejgSez4vrAdQ6nSlbFpc90yQPLeqMhqpZl8Nsfr1QEuTy2Yr7u2QnS3JZ/hDc7Zutl7hSN6vQ8eo4APt8tcphikUjZedtAFBJJHQAIwOMvJ8SACxAkXR4CgBIPvppFgCNQ7ChcGV8JVqBBQPA6QLexgHU76cmgVsAOFhyhwpAq4YdKkB5f7sKOJ8vjwOoV7Di+24Vwuh0dyTUdU4hnAuokoWuegM3ANhcQQYUSLZ1HADYejxH/l6VDq7OpAp2ZnlMoKMkTKUymFWqyogqr0GJcZgDsBVD7CpRhaozGU3X1u8JpelbC5CNbLE6vhIAQKBEEiFU+/lSAOy2XrET5DbBLAl0Vy0r8gnEzqKjhU89gHDXzxM3SqjLtZxlXdbzAaZ03BEsYUPJkwBmPSAi6oPVMlC1c0eVDXRUPasKa5H7U7mA7kghuzFjSkWQas/CriAk+X49O2kqs3GZAyicoWoWALuCEDC0/TwLoNbZ3fUAbhlLA+AOZU/hAKpYv6peIQsCRRzj1AOczzkgYspBEGwkVHxCyTklY8r7ObalBUCE+XAHC6/YeNJdEeQCwKc+Bce/bkDRNOfTC0LcoeZsqvvPNVoL4NhfP7EghI1GqgtCiP2b+HZkpOyL3cvGxPrZgpCuI2LU+RoZAJjVs0NpJg6hjKUrK44mqYAlAM7niz8/5p/q41rVEUml9s+OD3JNevzeCoApRZfo+KAJJBgAUwI7VRM82QIorEV4nKoAkH3pae3oBGUBwFqMkQCIMGzFGX3KdvUEKayF8hmlLuCJAMhKMZVMc4OgjQMwgzuh3Ukgqwh2Kwf4hoyectNGmSXIsmaElKBFjVPaHeHeyBY2tsQsFQjqBsDKFyPtf/+faa8AwCqdOwIA7NFmb7IADAmMAmBVycOUrLcDYPfv3QS5vp9NOKE+OQpAdPPpsQBGC8BE6hRb1BTfScvALgBkfX8FB3DkBth0ehkAjgrwASAbhZSelloBgPPx//o5GwDeHgiKrLrdn2hpnCLZRM9BdS5gJXFW5m11XWSSdj5/Z14jnEFZt69wSwcACdmHWgD2bERXnUL4+m8DQEZ/Z0CgrpJmrz0AAE1+RnJWnSLKVj0tr/9WDpAxtQoOsNP/qLuQAcBZFDqZBLIWIJOwQQI5yuNkPj5nWlXwRFnIcADXOAlL1vpCnB3br9RxCjaQ5hif5LP0Z/CtMm+Mj1MBQGmhMlFRtwugAZA1K5HTw5UyR12QUXXyRwUJJFzOvuAAqUhBXjTKbhWrIlsRjBxyEbVgChk4HgDsCkYBpCi2QM8qrAoEkQTd7wJYADgiZegAdyalsiBOA8BBApUmXOmTK7JxFckggUyvy3M7Sp5cMq8znqEoT4MAMFlHuybQqTgq+se2X+zu2KrDE5nUavb+jj65+se2X4oOTQIBO6GVk6/qH9WOsHilj3ds3kSUhGLyO/sHtztkHCrlqgbQ/Xx3u7h/Wtnj1tEdPrvSJ7PjB9xfL3vcOnoSZ+kAhLJ/l0PaVehoVkZ1Ru4qDqtKy8A31PqrtHnX/ZtOUDsAOAA4ADgAcBzCGJGRbLLDcX/2/VyJG3sy6ADgywEw3UR3m/Dp5xyD/TsAOAA4ADgAmBToyUbCIhs4VKXq6tPBs+OIhI03+zXqfgGCa3/8FAAoSBwzRnQouPMwY5YJdwMA7T8LgGgCaGEN+s+yZe+9A4DbvzP9VwAgulN5uS9APfFoiZkaALvVkl2pUw57Xh0pG60n+OgC3D+OAfx2AEhIYPXPFAC4t2NXAQAmgT8P/+nmAN0AsJNA51k2lS7njjeo3rETANE9nTfvrdvZw1TsdKiMNwFgNdEbEOj29nVsbcq4COZI1SpSrJ787TXVAZ0pvzTpLQCITP7yWjbf3g2Abg4wJRAEcwA1ANCyZufKcXKACaFgigM4AIBmCx0VMSwHqN7fzxxjN4IDOFfTkwpLK9PBDAf4BzY4SAYFZUTuAAAAAElFTkSuQmCC',
			columns: 16,
			rows: 16,
			map: '☺☻♥♦♣♠•◘○◙♂♀♪♫☼\n►◄↕‼¶§▬↨↑↓→←∟↔▲▼\n !"#$%&\'()*+,-./\n0123456789:;<=>?\n@ABCDEFGHIJKLMNO\nPQRSTUVWXYZ[\\]^_\n`abcdefghijklmno\npqrstuvwxyz{|}~⌂\nÇüéâäàåçêëèïîìÄÅ\nÉæÆôöòûùÿÖÜ¢£¥₧ƒ\náíóúñÑªº¿⌐¬½¼¡«»\n░▒▓│┤╡╢╖╕╣║╗╝╜╛┐\n└┴┬├─┼╞╟╚╔╩╦╠═╬╧\n╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀\nαßΓπΣσµτΦΘΩδ∞φε∩\n≡±≥≤⌠⌡÷≈°∙·√ⁿ²■□\n',
		}),
		nt = class {
			ge;
			ve;
			ye;
			l;
			_;
			we;
			Ct;
			be;
			Me;
			G;
			Ae;
			Ce;
			bt;
			xe;
			Se;
			Ee;
			Fe;
			Te = () => {};
			Pe = () => {};
			Le = [];
			De = [];
			ke = !1;
			Re = !1;
			Oe;
			Be;
			Ie = new Map();
			constructor(t, i = {}) {
				((this.G = t), (this.ge = i.visible ?? !0), (this.ve = i.opacity ?? 1));
				const e = i.blendMode ?? O.NORMAL;
				((this.ye = O.NORMAL),
					I(e) && (this.ye = e),
					it.Pi(I(e), 'Invalid blend mode. Expected a LayerBlendMode constant (e.g. t.BLEND_ADDITIVE).', {
						method: 'constructor',
						property: 'blendMode',
						providedValue: i.blendMode,
					}));
				const s = i.fontSize ?? 16;
				((this.Ct = Math.abs(s)),
					(this.Be = void 0 !== i.fontSize),
					it.Pi('number' == typeof s, 'Font size must be a number.', {
						method: 'fontSize',
						providedValue: s,
					}),
					(this.l = i.offsetX ?? 0),
					(this._ = i.offsetY ?? 0),
					(this.we = i.rotationZ ?? 0));
				const r = i.fontSource;
				((this.be = r),
					(this.bt =
						r instanceof L || r instanceof k
							? r
							: void 0 === r
								? new k(t, this.Ct, rt)
								: new L(t, this.Ct)),
					(this.Oe = new st(t.state)));
			}
			async Ne(t) {
				if (((this.Ae = t), this.be instanceof L || this.be instanceof k)) {
					this.be.Pt || (await this.be.kt());
					const t = this.be,
						i = t.Lt({ fontSize: this.je(t) });
					this.Qe(i);
				}
				this.bt.Pt || (this.bt instanceof L ? await this.bt.kt(this.be) : await this.bt.kt());
				const i = this.bt.maxGlyphDimensions;
				this.Ce = new s(this.Ae.canvas.canvas, i.width, i.height);
				const e = this.Ce;
				((this.xe = this.Ae.createFramebuffer(e.cols, e.rows, 3)),
					(this.Se = this.Ae.createFramebuffer(e.width, e.height, 1, { depth: !1 })),
					(this.Ee = this.Ae.createFramebuffer(e.width, e.height, 1, { depth: !1 })),
					(this.Fe = [
						this.Ae.createFramebuffer(e.width, e.height, 1, { depth: !1 }),
						this.Ae.createFramebuffer(e.width, e.height, 1, { depth: !1 }),
					]),
					this.Ce.S(() => {
						(this.xe.resize(this.Ce.cols, this.Ce.rows),
							this.Se.resize(this.Ce.width, this.Ce.height),
							this.Ee?.resize(this.Ce.width, this.Ce.height),
							this.Fe?.[0].resize(this.Ce.width, this.Ce.height),
							this.Fe?.[1].resize(this.Ce.width, this.Ce.height));
					}));
			}
			draw(t) {
				this.Te = t;
			}
			postDraw(t) {
				this.Pe = t;
			}
			show() {
				this.ge = !0;
			}
			hide() {
				this.ge = !1;
			}
			opacity(t) {
				if (void 0 === t) return this.ve;
				this.ve = H(t, 0, 1);
			}
			blendMode(t) {
				if (void 0 === t) return this.ye;
				it.Pi(I(t), 'Invalid blend mode. Expected a LayerBlendMode constant (e.g. t.BLEND_ADDITIVE).', {
					method: 'blendMode',
					providedValue: t,
				}) && (this.ye = t);
			}
			offset(t, i = 0) {
				if (void 0 === t) return { x: this.l, y: this._ };
				((this.l = t), (this._ = i));
			}
			rotateZ(t) {
				if (void 0 === t) return this.we;
				this.we = t;
			}
			createCamera() {
				const t = this.ze(),
					i = (180 * (this.Ae?.renderer.state.Yi.ie ?? Math.PI / 4)) / Math.PI;
				return this.Oe.createCamera(t.height, i);
			}
			setCamera(t) {
				(this.Oe.setCamera(t), this.He());
			}
			resetCamera() {
				(this.Oe.resetCamera(), this.He());
			}
			camera(t, i, e, s = 0, r = 0, n = 0, h = 0, o = 1, a = 0) {
				(this.Oe.camera(t, i, e, s, r, n, h, o, a), this.He());
			}
			lookAt(t, i, e, s, r, n) {
				(this.Oe.lookAt(t, i, e, s, r, n), this.He());
			}
			perspective(t, i, e) {
				(this.Oe.perspective(t, i, e), this.He());
			}
			ortho(t, i) {
				(this.Oe.ortho(t, i), this.He());
			}
			Ge() {
				return this.Oe.getActiveCamera();
			}
			filter(t, i) {
				(this.ke ? this.De : this.Le).push({ name: t, params: i });
			}
			setPluginState(t, i) {
				this.Ie.set(t, i);
			}
			getPluginState(t) {
				return this.Ie.get(t);
			}
			hasPluginState(t) {
				return this.Ie.has(t);
			}
			deletePluginState(t) {
				return this.Ie.delete(t);
			}
			fontSize(t) {
				if (void 0 === t) return this.bt.fontSize;
				if (
					!it.Pi('number' == typeof t, 'Font size must be a number.', {
						method: 'fontSize',
						providedValue: t,
					})
				)
					return;
				const i = Math.abs(t);
				this.bt.fontSize !== i && ((this.Be = !0), (this.Ct = i), this.bt.Bt(i), this.Ve());
			}
			useTileColors(t) {
				if (void 0 === t) return this.Re;
				this.Re = t;
			}
			async loadFont(t) {
				if (!this.bt)
					throw new Error('Layer font not initialized. Ensure layer is attached before loading fonts.');
				if (t instanceof L) {
					t.Pt || (await t.kt());
					const i = t,
						e = i.Lt({ fontSize: this.je(i) });
					this.Qe(e);
				} else if (this.bt instanceof L) await this.bt.It(t);
				else {
					const i = new L(this.G, this.bt.fontSize);
					(await i.kt(t), this.Qe(i));
				}
				return ((this.be = t), (this.Ct = this.bt.fontSize), this.Ve(), this.bt);
			}
			async loadTileset(t) {
				if (!this.bt)
					throw new Error('Layer font not initialized. Ensure layer is attached before loading tilesets.');
				if (t instanceof k) {
					t.Pt || (await t.kt());
					const i = t.Lt({ fontSize: this.je(t) });
					this.Qe(i);
				} else {
					const i = this.Be ? this.Ct : t.fontSize,
						e = new k(this.G, i, t);
					(await e.kt(), this.Qe(e));
				}
				return ((this.be = t), (this.Ct = this.bt.fontSize), this.Ve(), this.bt);
			}
			Xe(t, i, e = {}) {
				if (!this.ge) return;
				if (!this.xe || !this.Se) return;
				const s = this.Ae.renderer,
					r = this.Ce,
					n = e.skipPluginHooks ?? !1;
				n || t.Ye.$e(this);
				try {
					let e = !1;
					try {
						(this.xe.begin(),
							(e = !0),
							s.state.We.Ke(),
							s.state.Ze(),
							this.Oe.applyToState(s.state),
							(t.qe = this),
							this.Te.call(t));
					} finally {
						((t.qe = void 0), e && this.xe.end());
					}
					n || t.Ye.Je(this);
					const h = this.Le.length > 0,
						o = h ? this.Ee : this.Se;
					let a = !1;
					try {
						(o.begin(),
							(a = !0),
							s.ts(i),
							i.es({
								u_characterTexture: this.bt.framebuffer,
								u_charsetDimensions: [this.bt.textureColumns, this.bt.textureRows],
								U1: this.xe.textures[0],
								Uj: this.xe.textures[1],
								Um: this.xe.textures[2],
								UH: !(this.bt instanceof k && this.Re),
								U9: [r.cols, r.rows],
								Ua: [o.width, o.height],
								U7: [0, 0, 0, 0],
							}),
							s.ss(0, 0, r.width, r.height));
					} finally {
						a && o.end();
					}
					h &&
						this.Ae.filterManager.rs(
							this.Ee.textures[0],
							this.Se,
							this.Le,
							this.Se.width,
							this.Se.height,
							this.Fe
						);
					try {
						((this.ke = !0), (t.qe = this), this.Pe.call(t));
					} finally {
						((this.ke = !1), (t.qe = void 0));
					}
					this.De.length > 0 &&
						this.Ae.filterManager.rs(
							this.Se.textures[0],
							this.Se,
							this.De,
							this.Se.width,
							this.Se.height,
							this.Fe
						);
				} finally {
					((this.Le = []), (this.De = []), (this.ke = !1));
				}
			}
			ns(t) {
				this.Me = [...t];
			}
			hs() {
				this.Me = void 0;
			}
			cs() {
				this.xe && this.Se && this.Ce?.reset();
			}
			L() {
				(this.xe?.dispose(),
					this.Se?.dispose(),
					this.Ee?.dispose(),
					this.Fe?.[0].dispose(),
					this.Fe?.[1].dispose(),
					this.bt?.dispose(),
					this.Ce?.L());
			}
			get texture() {
				return this.Se?.textures[0];
			}
			get grid() {
				return this.Ce;
			}
			get font() {
				return this.bt;
			}
			get width() {
				return this.Se ? this.Se.width : 0;
			}
			get height() {
				return this.Se ? this.Se.height : 0;
			}
			get drawFramebuffer() {
				return this.xe;
			}
			get asciiFramebuffer() {
				return this.Se;
			}
			Ve() {
				if (!this.Ce || !this.bt) return;
				const t = this.bt.maxGlyphDimensions;
				(this.Ce.U(t.width, t.height), this.xe && this.Se && this.cs());
			}
			Qe(t) {
				(((this.be instanceof L || this.be instanceof k) && this.bt === this.be) ||
					this.bt === t ||
					this.bt.dispose(),
					(this.bt = t));
			}
			je(t) {
				return this.Be ? this.Ct : t.fontSize;
			}
			He() {
				this.Oe.applyToState(this.Ae.renderer.state);
			}
			ze() {
				if (this.xe) return { width: Math.max(1, this.xe.width), height: Math.max(1, this.xe.height) };
				if (this.Ce) return { width: Math.max(1, this.Ce.cols), height: Math.max(1, this.Ce.rows) };
				const t = this.Ae?.renderer.context.canvas.width ?? this.Ae?.canvas.width ?? 1,
					i = this.Ae?.renderer.context.canvas.height ?? this.Ae?.canvas.height ?? 1;
				return { width: Math.max(1, t), height: Math.max(1, i) };
			}
		},
		ht = class {
			us;
			ls;
			Te;
			Pt = !1;
			constructor(t) {
				this.us = t;
			}
			draw(t) {
				this.Te = t;
			}
			async kt() {
				if (this.Pt) return;
				const t = this.fs();
				((this.ls = t), (this.Pt = !0));
			}
			L() {
				this.Pt && (this.ls?.L(), (this.Pt = !1));
			}
			ds(t, i) {
				const e = this.ls;
				(e.show(),
					e.draw(() => {
						(this.us.clear(), this.us.push());
						try {
							((this.Te || t)(i), this._s(i));
						} finally {
							this.us.pop();
						}
					}));
			}
			_s(t) {
				const { textmodifier: i, grid: e } = t,
					s = [116, 101, 120, 116, 109, 111, 100, 101, 46, 106, 115]
						.map((t) => String.fromCharCode(t))
						.join(''),
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
	function ot(t, i, e) {
		!(function (t, i, e, s) {
			(t.push(), t.translate(e, s, 0));
			for (const r of i) (t.char(r), t.rect(1, 1), t.translateX(1));
			t.pop();
		})(t, i, -Math.floor(i.length / 2), e);
	}
	var at = ({ textmodifier: t, grid: i, errorTitle: e, errorMessage: s }) => {
			(t.background('#222323'),
				t.cellColor('#222323'),
				t.charColor('#FF6B6B'),
				ot(t, 'X', -2),
				ot(t, e || 'SKETCH ERROR', 0),
				t.charColor('#C0C0C0'));
			const r = s || 'Unknown error',
				n = Math.floor(0.8 * i.cols),
				h = ct(r, n),
				o = h.slice(0, 3);
			(h.length > 3 && (o[2] = o[2].substring(0, n - 3) + '...'),
				o.forEach((i, e) => {
					ot(t, i, 3 + e);
				}));
			const a = ct('CHECK CONSOLE FOR DETAILS', n),
				c = 5 + o.length;
			a.forEach((i, e) => {
				ot(t, i, c + e);
			});
		},
		ct = (t, i) => {
			const e = t.split(' '),
				s = [];
			let r = '';
			for (const n of e) (r + ' ' + n).length <= i ? (r = r ? r + ' ' + n : n) : (r && s.push(r), (r = n));
			return (r && s.push(r), s);
		},
		ut = class extends ht {
			ps = 'inactive';
			gs = 'SKETCH ERROR';
			vs = 'Unknown error';
			ws = '';
			constructor(t) {
				super(t);
			}
			async kt() {
				this.Pt || (await super.kt(), this.ls.opacity(1), this.ls.hide());
			}
			get bs() {
				return this.Pt && 'active' === this.ps;
			}
			Ms(t) {
				(this.As(t), this.Pt && (this.ls.opacity(1), this.ls.show()));
			}
			Cs() {
				this.bs && this.Ss();
			}
			L() {
				super.L();
			}
			fs() {
				return new nt(this.us.G, { visible: !0, opacity: 1 });
			}
			Ss() {
				const t = {
					textmodifier: this.us,
					grid: this.ls.grid,
					errorTitle: this.gs,
					errorMessage: this.vs,
					errorDetails: this.ws || void 0,
				};
				this.ds(at, t);
			}
			As(t) {
				if (((this.ps = 'active'), t instanceof Error)) {
					const i = t.name?.trim() ? t.name.trim().toUpperCase() : 'SKETCH ERROR';
					return (
						(this.gs = i.endsWith('ERROR') ? i : `${i} ERROR`),
						(this.vs = t.message || 'Unknown error'),
						void (this.ws = t.stack || '')
					);
				}
				if ('string' == typeof t)
					return ((this.gs = 'SKETCH ERROR'), (this.vs = t || 'Unknown error'), void (this.ws = ''));
				((this.gs = 'SKETCH ERROR'), (this.vs = 'Unknown error'), (this.ws = ''));
			}
		},
		lt = e({ ErrorLayerController: () => ut, TextmodeError: () => n, TextmodeErrorLevel: () => tt });
	function ft(t, i) {
		(t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, 1), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, i));
	}
	function dt(t) {
		if (t instanceof HTMLVideoElement)
			return t.readyState >= t.HAVE_CURRENT_DATA && t.videoWidth > 0 && t.videoHeight > 0;
		const { width: i, height: e } = yt(t);
		return i > 0 && e > 0;
	}
	function _t(t, i, e) {
		dt(e) && (t.bindTexture(t.TEXTURE_2D, i), ft(t, e), t.bindTexture(t.TEXTURE_2D, null));
	}
	function pt(t, i, e = t.NEAREST, s = t.NEAREST, r = t.CLAMP_TO_EDGE, n = t.CLAMP_TO_EDGE) {
		const h = t.createTexture();
		(t.bindTexture(t.TEXTURE_2D, h),
			mt(t, e, s, r, n),
			dt(i)
				? ft(t, i)
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
		const { width: o, height: a } = yt(i);
		return { texture: h, width: Math.max(1, o), height: Math.max(1, a) };
	}
	function mt(t, i, e, s, r) {
		(t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, i),
			t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, e),
			t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, s),
			t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, r));
	}
	function gt(t, i, e, s, r, n = 0, h = t.FLOAT, o = !1) {
		(t.enableVertexAttribArray(i), t.vertexAttribPointer(i, e, h, o, s, r), t.vertexAttribDivisor(i, n));
	}
	function vt(t, i, e, s, r) {
		(t.bindBuffer(i, e), t.bufferData(i, s, r), t.bindBuffer(i, null));
	}
	function yt(t) {
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
	var wt = class extends r {
		o;
		u;
		Wt;
		Es;
		V;
		Fs = [];
		Ts = null;
		Ps;
		G;
		Ls = null;
		Ds = new Map();
		constructor(t, i, e = i, s = 1, r = {}, n) {
			(super(),
				(this.o = i),
				(this.u = e),
				(this.Es = t),
				(this.Ps = H(s, 1, 8)),
				(this.G = n),
				(this.Wt = { filter: 'nearest', wrap: 'clamp', type: 'unsigned_byte', depth: !0, ...r }));
			const h = t.getParameter(t.MAX_DRAW_BUFFERS),
				o = t.getParameter(t.MAX_COLOR_ATTACHMENTS);
			((this.Ps = Math.min(this.Ps, h, o)),
				(this.V = t.createFramebuffer()),
				this.ks(),
				this.Rs(),
				this.Wt.depth && this.Os());
		}
		ks() {
			const t = this.Es,
				i = 'linear' === this.Wt.filter ? t.LINEAR : t.NEAREST,
				e = 'repeat' === this.Wt.wrap ? t.REPEAT : t.CLAMP_TO_EDGE;
			for (let s = 0; s < this.Ps; s++) {
				const s = t.createTexture();
				(t.bindTexture(t.TEXTURE_2D, s), mt(t, i, i, e, e), this.Bs(s, !1), this.Fs.push(s));
			}
			t.bindTexture(t.TEXTURE_2D, null);
		}
		Bs(t, i = !0) {
			const e = this.Es,
				s = 'float' === this.Wt.type ? e.FLOAT : e.UNSIGNED_BYTE,
				r = s === e.FLOAT ? e.RGBA32F : e.RGBA8,
				n = e.RGBA;
			(i && e.bindTexture(e.TEXTURE_2D, t), e.texImage2D(e.TEXTURE_2D, 0, r, this.o, this.u, 0, n, s, null));
		}
		Rs() {
			const t = this.Es;
			if ((t.bindFramebuffer(t.FRAMEBUFFER, this.V), 1 === this.Ps))
				t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.Fs[0], 0);
			else {
				const i = [];
				for (let e = 0; e < this.Ps; e++) {
					const s = t.COLOR_ATTACHMENT0 + e;
					(t.framebufferTexture2D(t.FRAMEBUFFER, s, t.TEXTURE_2D, this.Fs[e], 0), i.push(s));
				}
				t.drawBuffers(i);
			}
			t.bindFramebuffer(t.FRAMEBUFFER, null);
		}
		Os() {
			const t = this.Es;
			((this.Ts = t.createRenderbuffer()),
				this.Is(),
				t.bindFramebuffer(t.FRAMEBUFFER, this.V),
				t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, this.Ts),
				t.bindFramebuffer(t.FRAMEBUFFER, null));
		}
		Is() {
			if (!this.Ts) return;
			const t = this.Es;
			(t.bindRenderbuffer(t.RENDERBUFFER, this.Ts),
				t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT24, this.o, this.u),
				t.bindRenderbuffer(t.RENDERBUFFER, null));
		}
		Z(t) {
			_t(this.Es, this.Fs[0], t);
		}
		resize(t, i) {
			((this.o = t), (this.u = i), this.Ds.clear());
			const e = this.Es;
			for (const s of this.Fs) this.Bs(s, !0);
			(e.bindTexture(e.TEXTURE_2D, null), this.Is(), (this.Ls = null));
		}
		readPixels(t) {
			const i = this.Ds.get(t);
			if (i) return i;
			const e = this.Es,
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
			return (this.Ds.set(t, a), a);
		}
		begin() {
			const t = this.Es;
			(this.Ds.clear(),
				this.G.Ns(),
				this.G.js(this.V, this.o, this.u, this.Ps),
				this.Wt.depth && t.clear(t.DEPTH_BUFFER_BIT),
				this.G.state.Qs());
		}
		end() {
			(this.G.state.zs(), this.G.Hs(), this.G.Gs());
		}
		Vs() {
			return (this.Ls || this.Xs(), this.Ls);
		}
		Xs() {
			if (!this.G) return;
			const t = this.Ps > 1,
				i = this.Ps > 2,
				e = this.Ps > 3,
				s = {
					Un: this.Fs[0],
					Uo: t ? this.Fs[1] : this.Fs[0],
					Up: i ? this.Fs[2] : this.Fs[0],
					Uq: e ? this.Fs[3] : this.Fs[0],
					Ur: [this.o, this.u],
					Uc: t,
					Ud: i,
					Ue: e,
				},
				r = this.G.materialManager.$s;
			this.Ls = this.G.materialManager.Ys(r, s);
		}
		dispose() {
			const t = this.Es;
			(t.deleteFramebuffer(this.V),
				this.Fs.forEach((i) => {
					t.deleteTexture(i);
				}),
				this.Ts && t.deleteRenderbuffer(this.Ts),
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
			return this.Fs;
		}
		get attachmentCount() {
			return this.Ps;
		}
	};
	function bt(t) {
		return 'object' == typeof t && null !== t && 'textures' in t && Array.isArray(t.textures);
	}
	var Mt = class extends r {
			Es;
			Ks;
			Ws = new Map();
			Zs = new Map();
			qs = new Map();
			Js = 0;
			tr = new Map();
			ir;
			constructor(t, i, e) {
				(super(),
					(this.Es = t),
					(this.ir = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS) ?? 16),
					(this.Ks = this.er(i, e)),
					this.sr());
			}
			sr() {
				const t = this.Es.getProgramParameter(this.Ks, this.Es.ACTIVE_UNIFORMS);
				for (let i = 0; i < t; i++) {
					const t = this.Es.getActiveUniform(this.Ks, i);
					if (t) {
						const i = t.name.replace(/\[0\]$/, ''),
							e = this.Es.getUniformLocation(this.Ks, i);
						e && (this.Ws.set(i, e), this.Zs.set(i, { type: t.type, size: t.size }));
					}
				}
			}
			er(t, i) {
				const e = this.rr(this.Es.VERTEX_SHADER, t),
					s = this.rr(this.Es.FRAGMENT_SHADER, i),
					r = this.Es.createProgram();
				if (!r) throw new Error('Failed to create WebGL program');
				if (
					(this.Es.attachShader(r, e),
					this.Es.attachShader(r, s),
					this.Es.linkProgram(r),
					!this.Es.getProgramParameter(r, this.Es.LINK_STATUS))
				) {
					const t = this.Es.getProgramInfoLog(r);
					throw new Error(`Shader program link error: ${t}`);
				}
				return (this.Es.deleteShader(e), this.Es.deleteShader(s), r);
			}
			rr(t, i) {
				const e = this.Es.createShader(t);
				if (!e) throw new Error(`Failed to create shader of type ${t}`);
				if (
					(this.Es.shaderSource(e, i),
					this.Es.compileShader(e),
					!this.Es.getShaderParameter(e, this.Es.COMPILE_STATUS))
				) {
					const t = this.Es.getShaderInfoLog(e);
					throw (this.Es.deleteShader(e), new Error(`Shader compilation error: ${t}`));
				}
				return e;
			}
			nr() {
				(this.Es.useProgram(this.Ks), this.hr());
			}
			hr() {
				((this.Js = 0), this.tr.clear());
				for (const [t, i] of this.qs) (i instanceof WebGLTexture || bt(i)) && this.qs.delete(t);
			}
			es(t) {
				for (const i in t) this.ar(i, t[i]);
			}
			ar(t, i) {
				const e = this.Ws.get(t);
				if (!e) return;
				const s = this.qs.get(t);
				let r = !0;
				if (
					(void 0 !== s &&
						('number' == typeof i || 'boolean' == typeof i
							? s === i && (r = !1)
							: (i instanceof WebGLTexture || bt(i)) && s === i && (r = !1)),
					!r)
				)
					return;
				'number' == typeof i || 'boolean' == typeof i || i instanceof WebGLTexture || bt(i)
					? this.qs.set(t, i)
					: this.qs.delete(t);
				const n = this.Zs.get(t);
				if (!n) return;
				const { type: h, size: o } = n,
					a = this.Es;
				if (i instanceof WebGLTexture) {
					const s = this.cr(t);
					return (a.uniform1i(e, s), a.activeTexture(a.TEXTURE0 + s), void a.bindTexture(a.TEXTURE_2D, i));
				}
				if (bt(i)) {
					const s = this.cr(t);
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
			cr(t) {
				const i = this.tr.get(t);
				if (void 0 !== i) return i;
				if (this.Js >= this.ir)
					throw new Error(
						`[textmode.js] Shader attempted to bind more than ${this.ir} texture samplers. Uniform "${t}" cannot be assigned.`
					);
				const e = this.Js++;
				return (this.tr.set(t, e), e);
			}
			get program() {
				return this.Ks;
			}
			dispose() {
				(this.Es.deleteProgram(this.Ks), super.dispose());
			}
		},
		At = new WeakMap();
	function Ct(t, i) {
		At.set(t, i);
	}
	function xt(t) {
		return At.get(t);
	}
	var St = [255, 255, 255, 255],
		Et = [360, 100, 100, 1];
	function Ft(t) {
		return [(i = 'rgb' === t ? St : Et)[0], i[1], i[2], i[3]];
		var i;
	}
	function Ut() {
		return { mode: 'rgb', maxes: Ft('rgb') };
	}
	function Tt(t, i) {
		return Number.isNaN(t) ? 0 : H(t, 0, i) / i;
	}
	function Pt(t, i) {
		return Math.round(255 * Tt(t, i));
	}
	function Lt(t, i) {
		return Pt(t ?? i, i);
	}
	function Dt(t, i, e) {
		return (
			e < 0 && (e += 1),
			e > 1 && (e -= 1),
			e < 1 / 6 ? t + 6 * (i - t) * e : e < 0.5 ? i : e < 2 / 3 ? t + (i - t) * (2 / 3 - e) * 6 : t
		);
	}
	function kt(t, i, e, s, r) {
		const [n, h, o, a] = r.maxes,
			c = Lt(s, a);
		if ('rgb' === r.mode) return [Pt(t, n), Pt(i, h), Pt(e, o), c];
		const u = ((l = t), (f = n), Number.isNaN(l) ? 0 : (((l % f) + f) % f) / f);
		var l, f;
		const d = Tt(i, h),
			_ = Tt(e, o),
			[p, m, g] =
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
							return [Dt(r, s, t + 1 / 3), Dt(r, s, t), Dt(r, s, t - 1 / 3)];
						})(u, d, _);
		return [Math.round(255 * p), Math.round(255 * m), Math.round(255 * g), c];
	}
	var Rt = class {
			ur = 0;
			lr = 0;
			dr = 0;
			_r = 0;
			pr = 0;
			mr = 0;
			gr = 1;
			vr = 1;
			yr = 1;
			wr = q();
			br = q();
			Mr = q();
			Ar(t) {
				((t.ur = this.ur),
					(t.lr = this.lr),
					(t.dr = this.dr),
					(t._r = this._r),
					(t.pr = this.pr),
					(t.mr = this.mr),
					(t.gr = this.gr),
					(t.vr = this.vr),
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
					(this.gr = t.gr),
					(this.vr = t.vr),
					(this.yr = t.yr));
				for (let i = 0; i < 16; i++) this.wr[i] = t.wr[i];
			}
			Sr(t = 0, i = 0, e = 0) {
				(0 === t && 0 === i && 0 === e) ||
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
					(this.br[14] = e),
					(this.br[15] = 1),
					this.Er(this.br));
			}
			Fr(t, i, e) {
				const s = void 0 === i ? t : i,
					r = void 0 === e ? (void 0 === i ? t : 1) : e;
				(1 === t && 1 === s && 1 === r) ||
					((this.br[0] = t),
					(this.br[1] = 0),
					(this.br[2] = 0),
					(this.br[3] = 0),
					(this.br[4] = 0),
					(this.br[5] = s),
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
				const i = N(t);
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
				const i = N(t);
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
				const i = N(t);
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
			Dr(t, i, e, s) {
				if (0 === t) return;
				const r = Math.hypot(i, e, s);
				if (r < 1e-6) return;
				const n = i / r,
					h = e / r,
					o = s / r,
					a = N(t),
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
				(q(this.wr),
					(this.ur = 0),
					(this.lr = 0),
					(this.dr = 0),
					(this._r = 0),
					(this.pr = 0),
					(this.mr = 0),
					(this.gr = 1),
					(this.vr = 1),
					(this.yr = 1));
			}
			Rr(t) {
				if (!this.Or(t))
					throw new Error(
						'applyMatrix() only supports affine transform matrices without shear or perspective.'
					);
				this.Er(t);
			}
			Er(t) {
				!(function (t, i, e = new Float32Array(16)) {
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
						g = t[14],
						v = t[15],
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
					((e[0] = s * y + o * w + l * b + p * M),
						(e[1] = r * y + a * w + f * b + m * M),
						(e[2] = n * y + c * w + d * b + g * M),
						(e[3] = h * y + u * w + _ * b + v * M),
						(e[4] = s * A + o * C + l * x + p * S),
						(e[5] = r * A + a * C + f * x + m * S),
						(e[6] = n * A + c * C + d * x + g * S),
						(e[7] = h * A + u * C + _ * x + v * S),
						(e[8] = s * E + o * F + l * U + p * T),
						(e[9] = r * E + a * F + f * U + m * T),
						(e[10] = n * E + c * F + d * U + g * T),
						(e[11] = h * E + u * F + _ * U + v * T),
						(e[12] = s * P + o * L + l * D + p * k),
						(e[13] = r * P + a * L + f * D + m * k),
						(e[14] = n * P + c * L + d * D + g * k),
						(e[15] = h * P + u * L + _ * D + v * k));
				})(this.wr, t, this.Mr);
				for (let i = 0; i < 16; i++) this.wr[i] = this.Mr[i];
				this.Br();
			}
			Br() {
				const t = this.wr,
					i = this._r,
					e = this.pr,
					s = this.mr;
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
					(this.gr = d),
					(this.vr = _),
					(this.yr = p));
				const m = r / d,
					g = o / _,
					v = l / p,
					y = f / p,
					w = H(u / p, -1, 1),
					b = Math.asin(w),
					M = Math.cos(b);
				let A, C;
				Math.abs(M) > 1e-6
					? ((A = Math.atan2(-v, y)), (C = Math.atan2(-g, m)))
					: ((A = Math.atan2(t[6] / _, t[5] / _)), (C = 0));
				const x = this.Ir(A + Math.PI),
					S = this.Ir(Math.PI - b),
					E = this.Ir(C + Math.PI),
					F = Math.abs(this.Ir(A - i)) + Math.abs(this.Ir(b - e)) + Math.abs(this.Ir(C - s));
				Math.abs(this.Ir(x - i)) + Math.abs(this.Ir(S - e)) + Math.abs(this.Ir(E - s)) < F
					? ((this._r = x), (this.pr = S), (this.mr = E))
					: ((this._r = A), (this.pr = b), (this.mr = C));
			}
			Ir(t) {
				let i = (t + Math.PI) % (2 * Math.PI);
				return (i < 0 && (i += 2 * Math.PI), i - Math.PI);
			}
			Or(t) {
				if (16 !== t.length) return !1;
				if (
					Math.abs(t[3]) > 1e-6 ||
					Math.abs(t[7]) > 1e-6 ||
					Math.abs(t[11]) > 1e-6 ||
					Math.abs(t[15] - 1) > 1e-6
				)
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
					g = n / l,
					v = h / l,
					y = o / f,
					w = a / f,
					b = c / f,
					M = d * m + _ * g + p * v,
					A = d * y + _ * w + p * b,
					C = m * y + g * w + v * b;
				return Math.abs(M) < 1e-4 && Math.abs(A) < 1e-4 && Math.abs(C) < 1e-4;
			}
		},
		Ot = (Math.PI / 180) * 28.072486935852957,
		Bt = class {
			fe = !1;
			Nr = 0;
			jr = 0;
			ie = Ot;
			ue = 0.1;
			le = 4096;
			te = !0;
			ee = 0;
			se = 0;
			re = 0;
			$i = 0;
			Ki = 0;
			Wi = 0;
			Zi = 0;
			qi = 1;
			Ji = 0;
			Ar(t) {
				((t.fe = this.fe),
					(t.Nr = this.Nr),
					(t.jr = this.jr),
					(t.ie = this.ie),
					(t.ue = this.ue),
					(t.le = this.le),
					(t.te = this.te),
					(t.ee = this.ee),
					(t.se = this.se),
					(t.re = this.re),
					(t.$i = this.$i),
					(t.Ki = this.Ki),
					(t.Wi = this.Wi),
					(t.Zi = this.Zi),
					(t.qi = this.qi),
					(t.Ji = this.Ji));
			}
			Cr(t) {
				((this.fe = t.fe),
					(this.Nr = t.Nr),
					(this.jr = t.jr),
					(this.ie = t.ie),
					(this.ue = t.ue),
					(this.le = t.le),
					(this.te = t.te),
					(this.ee = t.ee),
					(this.se = t.se),
					(this.re = t.re),
					(this.$i = t.$i),
					(this.Ki = t.Ki),
					(this.Wi = t.Wi),
					(this.Zi = t.Zi),
					(this.qi = t.qi),
					(this.Ji = t.Ji));
			}
			Qr(t) {
				if (t) {
					if (this.fe) return;
					return ((this.fe = !0), void this.Nr++);
				}
				this.fe && ((this.fe = !1), this.Nr++);
			}
			_e(t, i, e) {
				let s = !1;
				if (void 0 !== t) {
					const i = N(Math.max(1, Math.min(179, t)));
					this.ie !== i && ((this.ie = i), (s = !0));
				}
				((void 0 === i && void 0 === e) || (s = this.zr(i, e) || s),
					this.fe && ((this.fe = !1), (s = !0)),
					s && this.Nr++);
			}
			de(t, i) {
				let e = !1;
				((e = this.zr(t, i) || e), this.fe || ((this.fe = !0), (e = !0)), e && this.Nr++);
			}
			he(t, i, e, s = 0, r = 0, n = 0, h = 0, o = 1, a = 0) {
				(this.te ||
					this.ee !== t ||
					this.se !== i ||
					this.re !== e ||
					this.$i !== s ||
					this.Ki !== r ||
					this.Wi !== n ||
					this.Zi !== h ||
					this.qi !== o ||
					this.Ji !== a) &&
					((this.te = !1),
					(this.ee = t),
					(this.se = i),
					(this.re = e),
					(this.$i = s),
					(this.Ki = r),
					(this.Wi = n),
					(this.Zi = h),
					(this.qi = o),
					(this.Ji = a),
					this.jr++);
			}
			me(t, i, e, s, r, n) {
				let h = this.$i !== t || this.Ki !== i || this.Wi !== e;
				(void 0 !== s && this.Zi !== s && ((this.Zi = s), (h = !0)),
					void 0 !== r && this.qi !== r && ((this.qi = r), (h = !0)),
					void 0 !== n && this.Ji !== n && ((this.Ji = n), (h = !0)),
					h && ((this.$i = t), (this.Ki = i), (this.Wi = e), this.jr++));
			}
			pe() {
				(this.te &&
					0 === this.ee &&
					0 === this.se &&
					0 === this.re &&
					0 === this.$i &&
					0 === this.Ki &&
					0 === this.Wi &&
					0 === this.Zi &&
					1 === this.qi &&
					0 === this.Ji) ||
					((this.te = !0),
					(this.ee = 0),
					(this.se = 0),
					(this.re = 0),
					(this.$i = 0),
					(this.Ki = 0),
					(this.Wi = 0),
					(this.Zi = 0),
					(this.qi = 1),
					(this.Ji = 0),
					this.jr++);
			}
			Hr() {
				this.fe && ((this.fe = !1), this.Nr++);
			}
			zr(t, i) {
				if (void 0 === t && void 0 === i) return !1;
				const e = void 0 === t ? this.ue : Math.max(1e-4, t),
					s = e + 1e-4,
					r = void 0 === i ? Math.max(this.le, s) : Math.max(s, i);
				return (e !== this.ue || r !== this.le) && ((this.ue = e), (this.le = r), !0);
			}
		},
		It = 15,
		Nt = class {
			Gr = new Float32Array(3);
			Vr = 0;
			Xr = new Float32Array(It);
			$r = new Float32Array(It);
			Yr = new Float32Array([1, 0, 0]);
			Kr = !1;
			Wr = 0;
			Ar(t) {
				((t.Gr[0] = this.Gr[0]),
					(t.Gr[1] = this.Gr[1]),
					(t.Gr[2] = this.Gr[2]),
					(t.Vr = this.Vr),
					(t.Kr = this.Kr),
					(t.Wr = this.Wr));
				for (let i = 0; i < It; i++) ((t.Xr[i] = this.Xr[i]), (t.$r[i] = this.$r[i]));
				((t.Yr[0] = this.Yr[0]), (t.Yr[1] = this.Yr[1]), (t.Yr[2] = this.Yr[2]));
			}
			Cr(t) {
				((this.Gr[0] = t.Gr[0]),
					(this.Gr[1] = t.Gr[1]),
					(this.Gr[2] = t.Gr[2]),
					(this.Vr = t.Vr),
					(this.Kr = t.Kr),
					(this.Wr = t.Wr));
				for (let i = 0; i < It; i++) ((this.Xr[i] = t.Xr[i]), (this.$r[i] = t.$r[i]));
				((this.Yr[0] = t.Yr[0]), (this.Yr[1] = t.Yr[1]), (this.Yr[2] = t.Yr[2]));
			}
			Zr(t, i, e) {
				((this.Kr = !0), (this.Gr[0] += t), (this.Gr[1] += i), (this.Gr[2] += e), this.Wr++);
			}
			qr(t, i, e, s, r, n) {
				if (this.Vr >= 5) return;
				this.Kr = !0;
				const h = 3 * this.Vr;
				((this.Xr[h] = s),
					(this.Xr[h + 1] = r),
					(this.Xr[h + 2] = n),
					(this.$r[h] = t),
					(this.$r[h + 1] = i),
					(this.$r[h + 2] = e),
					this.Vr++,
					this.Wr++);
			}
			Jr(t, i, e) {
				let s = Math.max(0, t);
				const r = Math.max(0, i),
					n = Math.max(0, e);
				(0 === s && 0 === r && 0 === n && (s = 1),
					(this.Yr[0] === s && this.Yr[1] === r && this.Yr[2] === n) ||
						((this.Yr[0] = s), (this.Yr[1] = r), (this.Yr[2] = n), this.Wr++));
			}
			tn() {
				const t = 0 !== this.Gr[0] || 0 !== this.Gr[1] || 0 !== this.Gr[2],
					i = this.Vr > 0,
					e = this.Kr || t || i,
					s = 1 !== this.Yr[0] || 0 !== this.Yr[1] || 0 !== this.Yr[2];
				if (e || s) {
					((this.Kr = !1), (this.Gr[0] = 0), (this.Gr[1] = 0), (this.Gr[2] = 0), (this.Vr = 0));
					for (let t = 0; t < It; t++) ((this.Xr[t] = 0), (this.$r[t] = 0));
					((this.Yr[0] = 1), (this.Yr[1] = 0), (this.Yr[2] = 0), this.Wr++);
				}
			}
			Ke() {
				const t = 0 !== this.Gr[0] || 0 !== this.Gr[1] || 0 !== this.Gr[2];
				if (0 !== this.Vr || t || this.Kr) {
					((this.Kr = !1), (this.Gr[0] = 0), (this.Gr[1] = 0), (this.Gr[2] = 0), (this.Vr = 0));
					for (let t = 0; t < It; t++) ((this.Xr[t] = 0), (this.$r[t] = 0));
					this.Wr++;
				}
			}
		};
	function jt(t, i, e, s, r = 255) {
		((t[0] = i / 255), (t[1] = (e ?? i) / 255), (t[2] = (s ?? i) / 255), (t[3] = r / 255));
	}
	var Qt = class {
		en = 1;
		sn = [1, 1, 0];
		rn = '';
		nn = [1, 1, 1, 1];
		hn = [0, 0, 0, 1];
		an = 'rgb';
		cn = Ut().maxes;
		un = !1;
		ln = !1;
		dn = !1;
		_n = 0;
		Me = [0, 0, 0, 1];
		Ar(t) {
			((t.pn = this.en),
				(t.mn = this.un),
				(t.gn = this.ln),
				(t.dn = this.dn),
				(t._n = this._n),
				(t.vn[0] = this.sn[0]),
				(t.vn[1] = this.sn[1]),
				(t.vn[2] = this.sn[2]),
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
			((this.en = t.pn),
				(this.un = t.mn),
				(this.ln = t.gn),
				(this.dn = t.dn),
				(this._n = t._n),
				(this.sn[0] = t.vn[0]),
				(this.sn[1] = t.vn[1]),
				(this.sn[2] = t.vn[2]),
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
			this.en = Math.abs(t);
		}
		An(t) {
			((this.sn[0] = t[0]), (this.sn[1] = t[1]), (this.sn[2] = t[2]));
		}
		Cn(t) {
			this.rn = t;
		}
		xn(t, i, e, s = 255) {
			jt(this.nn, t, i, e, s);
		}
		Sn(t, i, e, s = 255) {
			jt(this.hn, t, i, e, s);
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
			this._n = Z(t);
		}
		Ln(t, i, e, s) {
			jt(this.Me, t, i, e, s);
		}
		Dn() {
			((this.Me[0] = 0), (this.Me[1] = 0), (this.Me[2] = 0), (this.Me[3] = 0));
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
			On = {
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
			Bn = 0;
			constructor() {
				((this.On.kind = 'none'), (this.On.source = null), (this.On.framebuffer = null));
			}
			In(t) {
				(Ht(this.On, t), this.Bn++);
			}
			Nn(t) {
				const i = this.On;
				((i.kind = 'framebuffer'),
					(i.framebuffer = t),
					(i.textures ??= []),
					(i.textures.length = t.textures.length));
				for (let e = 0; e < t.textures.length; e++) i.textures[e] = t.textures[e];
				((i.width = t.width), (i.height = t.height), (i.attachmentCount = t.attachmentCount), this.Bn++);
			}
			jn() {
				'none' !== this.On.kind &&
					((this.On.kind = 'none'), (this.On.source = null), (this.On.framebuffer = null), this.Bn++);
			}
			Ar(t) {
				((t.Qn = this.Bn), Ht(t.zn, this.On));
			}
			Cr(t) {
				((this.Bn = t.Qn), Ht(this.On, t.zn));
			}
			get current() {
				return this.On;
			}
		},
		Vt = class t {
			Hn = new Rt();
			Yi = new Bt();
			We = new Nt();
			vn = new Qt();
			Gn = new Gt();
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
					gr: 1,
					vr: 1,
					yr: 1,
					wr: q(),
					_n: 0,
					mn: !1,
					gn: !1,
					dn: !1,
					fe: !1,
					Nr: 0,
					jr: 0,
					ie: Ot,
					ue: 0.1,
					le: 4096,
					te: !0,
					ee: 0,
					se: 0,
					re: 0,
					$i: 0,
					Ki: 0,
					Wi: 0,
					Zi: 0,
					qi: 1,
					Ji: 0,
					Vr: 0,
					Xr: new Float32Array(15),
					$r: new Float32Array(15),
					Gr: new Float32Array(3),
					Yr: new Float32Array([1, 0, 0]),
					Kr: !1,
					Wr: 0,
					Qn: 0,
					zn: {
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
					vn: [1, 1, 0],
					yn: '',
					wn: [1, 1, 1, 1],
					bn: [0, 0, 0, 1],
					an: Ut().mode,
					cn: Ut().maxes,
				};
			}
			Yn(t) {
				(this.Hn.Ar(t), this.Yi.Ar(t), this.We.Ar(t), this.vn.Ar(t), this.Gn.Ar(t));
			}
			Kn(t) {
				(this.Hn.Cr(t), this.Yi.Cr(t), this.We.Cr(t), this.vn.Cr(t), this.Gn.Cr(t));
			}
			Wn(t) {
				this.Kn(t);
			}
			Qs() {
				let i = this.Xn.pop();
				(i || (i = t.$n()), this.Yn(i), this.Vn.push(i));
			}
			zs() {
				const t = this.Vn.pop();
				t ? (this.Kn(t), this.Xn.push(t)) : console.warn('pop() called without matching push()');
			}
			Ze() {
				(this.Hn.kr(), this.Yi.Hr());
			}
		},
		Xt = (function (t) {
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
		$t = {
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
		Yt = new Float32Array([
			-0.5, -0.5, 0, 0, 0.5, -0.5, 1, 0, -0.5, 0.5, 0, 1, -0.5, 0.5, 0, 1, 0.5, -0.5, 1, 0, 0.5, 0.5, 1, 1,
		]),
		Kt = { Zn: 16, qn: { Jn: { size: 2, offset: 0 }, th: { size: 2, offset: 8 } } },
		Wt = { Zn: 20, qn: { Jn: { size: 3, offset: 0 }, th: { size: 2, offset: 12 } } },
		Zt = { Zn: 24, qn: { Jn: { size: 4, offset: 0 }, th: { size: 2, offset: 16 } } },
		qt = class {
			Es;
			ih;
			eh;
			constructor(t) {
				((this.Es = t), (this.ih = t.createBuffer()), (this.eh = new Float32Array(Yt.length)));
			}
			sh(t, i, e, s) {
				const r = this.Es,
					n = xt(this.Es),
					h = n[2],
					o = n[3],
					a = (t / h) * 2 - 1,
					c = ((t + e) / h) * 2 - 1,
					u = 1 - ((i + s) / o) * 2,
					l = 1 - (i / o) * 2,
					f = Yt,
					d = this.eh;
				for (let _ = 0; _ < f.length; _ += 4) {
					const t = f[_],
						i = f[_ + 1],
						e = f[_ + 2],
						s = f[_ + 3],
						r = a + (t + 0.5) * (c - a),
						n = u + (i + 0.5) * (l - u);
					((d[_] = r), (d[_ + 1] = n), (d[_ + 2] = e), (d[_ + 3] = s));
				}
				(r.bindBuffer(r.ARRAY_BUFFER, this.ih),
					r.bufferData(r.ARRAY_BUFFER, d, r.DYNAMIC_DRAW),
					gt(r, 0, 2, 16, 0),
					gt(r, 1, 2, 16, 8),
					r.drawArrays(r.TRIANGLES, 0, 6),
					r.disableVertexAttribArray(1),
					r.disableVertexAttribArray(0),
					r.bindBuffer(r.ARRAY_BUFFER, null));
			}
			L() {
				this.Es.deleteBuffer(this.ih);
			}
		},
		Jt = class {
			Es;
			rh = new Map();
			nh = null;
			constructor(t) {
				this.Es = t;
			}
			hh(t) {
				const {
						shader: i,
						geometryKey: e,
						unit: s,
						geometryBuffer: r,
						indexBuffer: n,
						instanceAttributes: h,
					} = t,
					o = this.Es,
					a = i.program;
				let c = this.rh.get(i);
				c || ((c = new Map()), this.rh.set(i, c), i.k(() => this.oh(i)));
				let u = c.get(e);
				if (
					(u &&
						u.instanceBufferVersion !== h.ah &&
						(u.vao && (o.deleteVertexArray(u.vao), this.nh === u.vao && (this.nh = null)),
						c.delete(e),
						(u = void 0)),
					u)
				)
					this.nh !== u.vao && (o.bindVertexArray(u.vao), (this.nh = u.vao));
				else {
					const t = o.createVertexArray();
					((u = { vao: t, instanceBufferVersion: h.ah }),
						c.set(e, u),
						o.bindVertexArray(t),
						(this.nh = t),
						o.bindBuffer(o.ARRAY_BUFFER, r),
						n && o.bindBuffer(o.ELEMENT_ARRAY_BUFFER, n));
					const l = o.getAttribLocation(a, 'A8');
					-1 !== l && gt(o, l, s.qn.Jn.size, s.Zn, s.qn.Jn.offset, 0, o.FLOAT, !1);
					const f = o.getAttribLocation(a, 'Ab');
					(-1 !== f && gt(o, f, s.qn.th.size, s.Zn, s.qn.th.offset, 0, o.FLOAT, !1), h.uh(i));
				}
			}
			oh(t) {
				const i = this.rh.get(t);
				if (i) {
					for (const [, t] of i) t.vao && this.Es.deleteVertexArray(t.vao);
					this.rh.delete(t);
				}
			}
			fh() {
				null !== this.nh && (this.Es.bindVertexArray(null), (this.nh = null));
			}
			L() {
				for (const [, t] of this.rh) for (const [, i] of t) i.vao && this.Es.deleteVertexArray(i.vao);
				this.rh.clear();
			}
		},
		ti = class {
			static BYTES_PER_INSTANCE = 144;
			static FLOATS_PER_INSTANCE = 36;
		};
	function ii(t, i) {
		return { location: -1, size: t, stride: ti.BYTES_PER_INSTANCE, offset: i, divisor: 1 };
	}
	var ei = class {
			static STRIDE = ti.BYTES_PER_INSTANCE;
			static ATTRIBUTES = {
				A7: ii(2, 0),
				Aa: ii(2, 8),
				A6: ii(3, 16),
				A4: ii(4, 28),
				A0: ii(4, 44),
				A5: ii(4, 60),
				Ac: ii(3, 76),
				A9: ii(3, 88),
				A2: ii(4, 100),
				A3: ii(4, 116),
				A1: ii(3, 132),
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
				const e = t * ti.FLOATS_PER_INSTANCE;
				this.dh = new Float32Array(e);
			}
			yh(t) {
				if (t <= this._h) return;
				const i = Math.ceil(t * this.ph),
					e = this._h;
				this._h = i;
				const s = new Float32Array(i * ti.FLOATS_PER_INSTANCE),
					r = e * ti.FLOATS_PER_INSTANCE;
				(s.set(this.dh.subarray(0, Math.min(r, this.mh))), (this.dh = s));
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
	function ri(t, i) {
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
	var ni = class {
			dh;
			constructor(t) {
				this.dh = t;
			}
			Ah(t) {
				this.dh.gh >= this.dh._h && this.dh.yh(this.dh.gh + 1);
				const i = this.dh.dh,
					e = this.dh.mh;
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
					this.dh.wh(ti.FLOATS_PER_INSTANCE),
					this.dh.gh - 1
				);
			}
		},
		hi = class {
			Es;
			Ch = null;
			xh = 0;
			Sh = new WeakMap();
			Bn = 0;
			constructor(t, i = 1e3) {
				((this.Es = t), this.Eh(i));
			}
			Eh(t) {
				const i = this.Es;
				(this.Ch && i.deleteBuffer(this.Ch), this.Bn++, (this.Ch = i.createBuffer()));
				const e = t * ti.BYTES_PER_INSTANCE;
				(vt(i, i.ARRAY_BUFFER, this.Ch, e, i.DYNAMIC_DRAW), (this.xh = t));
			}
			Fh(t) {
				this.Eh(t);
			}
			K(t, i) {
				if (0 === i) return;
				const e = this.Es;
				(e.bindBuffer(e.ARRAY_BUFFER, this.Ch), e.bufferSubData(e.ARRAY_BUFFER, 0, t, 0, i));
			}
			get ah() {
				return this.Bn;
			}
			Th(t) {
				let i = this.Sh.get(t);
				if (!i) {
					i = new Map();
					const e = this.Es;
					for (const s in ei.ATTRIBUTES) {
						const r = s,
							n = e.getAttribLocation(t, r);
						-1 !== n && i.set(r, n);
					}
					this.Sh.set(t, i);
				}
				return i;
			}
			uh(t) {
				const i = this.Es,
					e = t.program,
					s = this.Th(e);
				i.bindBuffer(i.ARRAY_BUFFER, this.Ch);
				for (const [r, n] of s) {
					const t = ei.ATTRIBUTES[r];
					t && gt(i, n, t.size, t.stride, t.offset, t.divisor);
				}
			}
			L() {
				this.Ch && (this.Es.deleteBuffer(this.Ch), (this.Ch = null));
			}
		},
		oi = class {
			Es;
			dh;
			Ph;
			Lh;
			constructor(t, i = 1e3, e = 1.5) {
				((this.Es = t), (this.dh = new si(i, e)), (this.Ph = new ni(this.dh)), (this.Lh = new hi(t, i)));
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
			Oh(t, i) {
				if (0 === i) return;
				const e = i * ti.FLOATS_PER_INSTANCE;
				this.dh.yh(this.dh.gh + i);
				const s = this.dh.dh,
					r = this.dh.mh;
				for (let n = 0; n < e; n++) s[r + n] = t[n];
				((this.dh.mh += e), (this.dh.gh += i));
			}
			Bh() {
				0 !== this.dh.gh && (this.Dh(), this.Lh.K(this.dh.dh, this.dh.mh));
			}
			sh(t, i) {
				const e = this.dh.gh;
				0 !== e && this.Es.drawArraysInstanced(t, 0, i, e);
			}
			Ih(t, i, e, s = 0) {
				const r = this.dh.gh;
				0 !== r && this.Es.drawElementsInstanced(t, i, e, s, r);
			}
			L() {
				this.Lh.L();
			}
		},
		ai = class {
			Es;
			Nh;
			jh;
			Qh;
			zh = null;
			Hh = null;
			Gh = [0, 0, 0, 0];
			Vh = [0, 0, 0, 0];
			Xh;
			constructor(t, i, e, s) {
				((this.Es = t), (this.Nh = i), (this.jh = e), (this.Qh = s), (this.Xh = ri(this.Gh, this.Vh)));
				const r = this.Es.createBuffer();
				if (
					(vt(this.Es, this.Es.ARRAY_BUFFER, r, this.Qh.$h, this.Es.STATIC_DRAW), (this.zh = r), this.Qh.Yh)
				) {
					const t = this.Es.createBuffer();
					(vt(this.Es, this.Es.ELEMENT_ARRAY_BUFFER, t, this.Qh.Yh, this.Es.STATIC_DRAW), (this.Hh = t));
				}
			}
			get type() {
				return this.jh;
			}
			get unitGeometry() {
				return this.Qh;
			}
			get unitBuffer() {
				return this.zh;
			}
			get unitIndexBuffer() {
				return this.Hh;
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
				(this.Nh.L(), this.Es.deleteBuffer(this.zh), this.Hh && this.Es.deleteBuffer(this.Hh));
			}
			Ah(t, i, e, s, r, n, h) {
				const o = r.ur ?? 0,
					a = r.lr ?? 0,
					c = r.dr ?? 0,
					u = r._r ?? 0,
					l = r.pr ?? 0,
					f = h ?? r.mr ?? 0,
					d = r.gr ?? 1,
					_ = r.vr ?? 1,
					p = r.yr ?? 1,
					m = this.Gh,
					g = this.Vh;
				((m[0] = 0),
					(m[1] = 0),
					(m[2] = 0),
					(m[3] = 0),
					(g[0] = 0),
					(g[1] = 0),
					(g[2] = 0),
					(g[3] = 0),
					n &&
						(void 0 !== n.bezStartX &&
						void 0 !== n.bezStartY &&
						void 0 !== n.bezEndX &&
						void 0 !== n.bezEndY
							? ((m[0] = n.cp1x ?? 0),
								(m[1] = n.cp1y ?? 0),
								(m[2] = n.cp2x ?? 0),
								(m[3] = n.cp2y ?? 0),
								(g[0] = n.bezStartX ?? 0),
								(g[1] = n.bezStartY ?? 0),
								(g[2] = n.bezEndX ?? 0),
								(g[3] = n.bezEndY ?? 0))
							: (void 0 === n.arcStart && void 0 === n.arcStop) ||
								((m[0] = n.arcStart ?? 0), (m[1] = n.arcStop ?? 0))));
				const v = this.Xh;
				return (
					(v.x = t * d),
					(v.y = i * _),
					(v.width = e * d),
					(v.height = s * _),
					(v.char0 = r.vn[0]),
					(v.char1 = r.vn[1]),
					(v.char2 = r.vn[2]),
					(v.r1 = r.wn[0]),
					(v.g1 = r.wn[1]),
					(v.b1 = r.wn[2]),
					(v.a1 = r.wn[3]),
					(v.r2 = r.bn[0]),
					(v.g2 = r.bn[1]),
					(v.b2 = r.bn[2]),
					(v.a2 = r.bn[3]),
					(v.invert = r.dn ? 1 : 0),
					(v.flipX = r.mn ? 1 : 0),
					(v.flipY = r.gn ? 1 : 0),
					(v.charRot = r._n),
					(v.translationX = o),
					(v.translationY = a),
					(v.translationZ = c),
					(v.rotationX = u),
					(v.rotationY = l),
					(v.rotationZ = f),
					(v.depth = (n?.depth ?? 0) * p),
					(v.baseZ = (n?.baseZ ?? 0) * p),
					(v.geometryType = $t[this.jh] ?? 0),
					this.Nh.writer.Ah(v)
				);
			}
		},
		ci = { $h: Yt, Zh: 6, ...Kt },
		ui = class extends ai {
			constructor(t, i) {
				super(t, i, Xt.RECTANGLE, ci);
			}
			qh(t, i) {
				return this.Ah(0, 0, t.width, t.height, i);
			}
		},
		li = {
			$h: new Float32Array([
				0, -0.5, 0, 0, 1, -0.5, 1, 0, 0, 0.5, 0, 1, 0, 0.5, 0, 1, 1, -0.5, 1, 0, 1, 0.5, 1, 1,
			]),
			Zh: 6,
			...Kt,
		},
		fi = class extends ai {
			constructor(t, i) {
				super(t, i, Xt.LINE, li);
			}
			qh(t, i) {
				const e = t.x2 - t.x1,
					s = t.y2 - t.y1,
					r = Math.hypot(e, s),
					n = Math.atan2(s, e),
					h = i.pn || 1,
					o = Math.cos(-n),
					a = Math.sin(-n),
					c = t.x1 * o - t.y1 * a,
					u = t.x1 * a + t.y1 * o;
				return this.Ah(c, u, r, h, i, null, (i.mr || 0) + n);
			}
		},
		di = {
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
			Zh: 96,
			...Kt,
		},
		_i = class extends ai {
			constructor(t, i) {
				super(t, i, Xt.ELLIPSE, di);
			}
			qh(t, i) {
				return this.Ah(0, 0, t.width, t.height, i);
			}
		},
		pi = {
			$h: (function () {
				const t = [];
				for (let i = 0; i < 32; i++) {
					const e = i / 32,
						s = (i + 1) / 32;
					t.push(e, 0, e, 0, e, 1, e, 1, s, 1, s, 1);
				}
				return new Float32Array(t);
			})(),
			Zh: 96,
			...Kt,
		},
		mi = class extends ai {
			constructor(t, i) {
				super(t, i, Xt.ARC, pi);
			}
			qh(t, i) {
				const e = N(t.start),
					s = N(t.stop);
				return this.Ah(0, 0, t.width, t.height, i, { arcStart: e, arcStop: s });
			}
		},
		gi = {
			$h: (function (t = 16) {
				const i = [];
				for (let e = 0; e < t; e++) {
					const s = e / t,
						r = (e + 1) / t;
					i.push(s, -0.5, s, 0, r, -0.5, r, 0, s, 0.5, s, 1, s, 0.5, s, 1, r, -0.5, r, 0, r, 0.5, r, 1);
				}
				return new Float32Array(i);
			})(16),
			Zh: 96,
			...Kt,
		},
		vi = class extends ai {
			constructor(t, i) {
				super(t, i, Xt.BEZIER_CURVE, gi);
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
		yi = class extends ai {
			constructor(t, i, e, s) {
				super(
					t,
					i,
					e,
					(function (t, i) {
						const e = t === Xt.TORUS ? Zt : Wt;
						return {
							$h: i.vertices,
							Yh: i.indices,
							Zh: i.vertices.length / (e.Zn / 4),
							Jh: i.indices.length,
							...e,
						};
					})(e, s)
				);
			}
			qh(t, i) {
				return this.Ah(0, 0, t.width, t.height, i, { depth: t.depth });
			}
		},
		wi = { $h: new Float32Array(0), Zh: 0, ...Kt },
		bi = class {
			Es;
			dh;
			Nh;
			Qh = { ...wi };
			io = [0, 0, 0, 0];
			eo = [0, 0, 0, 0];
			so;
			ro = 1;
			no = 0;
			constructor(t) {
				((this.Es = t),
					(this.dh = t.createBuffer()),
					(this.Nh = new oi(t, 1)),
					(this.so = ri(this.io, this.eo)));
			}
			sh(t, i, e, s, r) {
				0 !== e &&
					(this.ho(i, e),
					this.Ah(s),
					this.Nh.Bh(),
					r.hh({
						shader: t,
						geometryKey: `custom_shape:${this.ro}`,
						unit: this.Qh,
						geometryBuffer: this.dh,
						instanceAttributes: this.Nh.kh,
					}),
					this.Nh.sh(this.Es.TRIANGLES, e),
					this.Nh.Rh());
			}
			L() {
				(this.Nh.L(), this.Es.deleteBuffer(this.dh));
			}
			ho(t, i) {
				const e = 4 * i;
				(e > this.no && ((this.no = e), this.ro++),
					(this.Qh.Zh = i),
					this.Es.bindBuffer(this.Es.ARRAY_BUFFER, this.dh),
					this.Es.bufferData(this.Es.ARRAY_BUFFER, t.subarray(0, e), this.Es.DYNAMIC_DRAW));
			}
			Ah(t) {
				this.Nh.Rh();
				const i = this.so;
				((i.x = 0),
					(i.y = 0),
					(i.width = t.gr ?? 1),
					(i.height = t.vr ?? 1),
					(i.char0 = t.vn[0]),
					(i.char1 = t.vn[1]),
					(i.char2 = t.vn[2]),
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
					(i.flipY = t.gn ? 1 : 0),
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
		Mi = {
			vertices: new Float32Array([
				-0.5, -0.5, 0.5, 0, 0, 0.5, -0.5, 0.5, 1, 0, 0.5, 0.5, 0.5, 1, 1, -0.5, 0.5, 0.5, 0, 1, 0.5, -0.5, -0.5,
				0, 0, -0.5, -0.5, -0.5, 1, 0, -0.5, 0.5, -0.5, 1, 1, 0.5, 0.5, -0.5, 0, 1, -0.5, -0.5, -0.5, 0, 0, -0.5,
				-0.5, 0.5, 1, 0, -0.5, 0.5, 0.5, 1, 1, -0.5, 0.5, -0.5, 0, 1, 0.5, -0.5, 0.5, 0, 0, 0.5, -0.5, -0.5, 1,
				0, 0.5, 0.5, -0.5, 1, 1, 0.5, 0.5, 0.5, 0, 1, -0.5, 0.5, 0.5, 0, 0, 0.5, 0.5, 0.5, 1, 0, 0.5, 0.5, -0.5,
				1, 1, -0.5, 0.5, -0.5, 0, 1, -0.5, -0.5, -0.5, 0, 0, 0.5, -0.5, -0.5, 1, 0, 0.5, -0.5, 0.5, 1, 1, -0.5,
				-0.5, 0.5, 0, 1,
			]),
			indices: new Uint16Array([
				0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19,
				20, 21, 22, 20, 22, 23,
			]),
		},
		Ai = (function (t = 12, i = 16) {
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
		Ci = (function (t = 16, i = 12) {
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
		xi = (function (t = 20) {
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
		Si = (function (t = 24) {
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
		Ei = {
			[Xt.RECTANGLE]: (t, i) => new ui(t, i),
			[Xt.LINE]: (t, i) => new fi(t, i),
			[Xt.ELLIPSE]: (t, i) => new _i(t, i),
			[Xt.ARC]: (t, i) => new mi(t, i),
			[Xt.BEZIER_CURVE]: (t, i) => new vi(t, i),
			[Xt.BOX]: (t, i) => new yi(t, i, Xt.BOX, Mi),
			[Xt.SPHERE]: (t, i) => new yi(t, i, Xt.SPHERE, Ai),
			[Xt.TORUS]: (t, i) => new yi(t, i, Xt.TORUS, Ci),
			[Xt.CONE]: (t, i) => new yi(t, i, Xt.CONE, xi),
			[Xt.CYLINDER]: (t, i) => new yi(t, i, Xt.CYLINDER, Si),
			[Xt.ELLIPSOID]: (t, i) => new yi(t, i, Xt.ELLIPSOID, Ai),
		},
		Fi = class {
			Es;
			oo;
			ao;
			co;
			uo = null;
			lo = new Map();
			fo = null;
			do = '';
			_o = q();
			po = q();
			mo = [0, 0, 0];
			vo = [0, 0, 0];
			yo = [0, 1, 0];
			constructor(t) {
				((this.Es = t), (this.ao = new Jt(t)), (this.co = new bi(t)), (this.oo = new Map()));
				for (const i of Object.values(Xt)) {
					const e = new oi(t),
						s = (0, Ei[i])(t, e);
					this.oo.set(i, s);
				}
			}
			wo(t) {
				((this.uo = null), this.lo.clear(), (this.fo = null), (this.do = ''));
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
						(s && s.Wh() && this.bo(s, i, e, a),
							(i = null),
							(e = null),
							(s = null),
							(r = !1),
							(n = -1),
							(h = -1),
							(o = -1),
							(a = null),
							this.Mo(c));
						continue;
					}
					const t = 'glyph_run' === c.type ? Xt.RECTANGLE : c.type;
					((i === c.material &&
						e === t &&
						r === c.state.fe &&
						n === c.state.Nr &&
						h === c.state.jr &&
						o === c.state.Wr) ||
						(s && s.Wh() && this.bo(s, i, e, a),
						(i = c.material),
						(e = t),
						(s = this.oo.get(e)),
						(r = c.state.fe),
						(n = c.state.Nr),
						(h = c.state.jr),
						(o = c.state.Wr),
						(a = c.state),
						s.Kh()),
						'glyph_run' === c.type
							? s.batch.Oh(c.params.data, c.params.instanceCount)
							: s.qh(c.params, c.state));
				}
				(s && s.Wh() && this.bo(s, i, e, a), this.ao.fh());
			}
			Mo(t) {
				(this.Ao(t.material, t.state),
					this.co.sh(t.material.shader, t.params.vertices, t.params.vertexCount, t.state, this.ao));
			}
			bo(t, i, e, s) {
				this.Ao(i, s);
				const r = t.unitGeometry,
					n = t.unitBuffer,
					h = r.Co ?? this.Es.TRIANGLES;
				try {
					(t.batch.Bh(),
						this.ao.hh({
							shader: i.shader,
							geometryKey: String(e),
							unit: r,
							geometryBuffer: n,
							indexBuffer: t.unitIndexBuffer,
							instanceAttributes: t.batch.kh,
						}),
						r.Yh && r.Jh
							? t.batch.Ih(h, r.Jh, r.xo ?? this.Es.UNSIGNED_SHORT, r.So ?? 0)
							: t.batch.sh(h, r.Zh));
				} finally {
					t.Kh();
				}
			}
			Ao(t, i) {
				(this.uo !== t.shader && (t.shader.nr(), (this.uo = t.shader)),
					this.fo !== t && (t.shader.es(t.uniforms), (this.fo = t)));
				const e = xt(this.Es),
					s = `${i.Nr}:${i.jr}:${i.Wr}:${e[2]}:${e[3]}`;
				if (this.lo.get(t.shader) === s) return;
				const r = `${i.Nr}:${i.jr}:${e[2]}:${e[3]}`;
				(this.do !== r && (this.Eo(i, e[2], e[3]), (this.do = r)),
					t.shader.es({
						u_aspectRatio: e[2] / e[3],
						UI: this._o,
						Uk: this.po,
						u_tmUseLighting: i.Kr || i.Vr > 0 || 0 !== i.Gr[0] || 0 !== i.Gr[1] || 0 !== i.Gr[2],
						u_tmAmbientLightColor: i.Gr,
						u_tmPointLightCount: i.Vr,
						u_tmPointLightPositions: i.Xr,
						u_tmPointLightColors: i.$r,
						u_tmLightFalloff: i.Yr,
					}),
					this.lo.set(t.shader, s));
			}
			Eo(t, i, e) {
				const s = Math.max(1, e),
					r = Math.max(1 / 4096, i / s),
					n = t.ue,
					h = t.le;
				if (
					((this.vo[0] = t.$i),
					(this.vo[1] = t.Ki),
					(this.vo[2] = t.Wi),
					(this.yo[0] = t.Zi),
					(this.yo[1] = t.qi),
					(this.yo[2] = t.Ji),
					t.te)
				) {
					const i = (0.5 * s) / Math.tan(0.5 * t.ie);
					((this.mo[0] = this.vo[0]),
						(this.mo[1] = this.vo[1]),
						(this.mo[2] = this.vo[2] + i),
						J(this.mo, this.vo, this.yo, this._o));
				} else
					((this.mo[0] = t.ee),
						(this.mo[1] = t.se),
						(this.mo[2] = t.re),
						J(this.mo, this.vo, this.yo, this._o));
				if (t.fe) {
					const t = 0.5 * i,
						e = 0.5 * s;
					return void (function (t, i, e, s, r, n, h = new Float32Array(16)) {
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
					})(-t, t, -e, e, n, h, this.po);
				}
				!(function (t, i, e, s, r = new Float32Array(16)) {
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
				})(t.ie, r, n, h, this.po);
			}
			L() {
				for (const t of this.oo.values()) t.L();
				(this.oo.clear(), this.co.L(), this.ao.L());
			}
		},
		Ui =
			'vec3 rotateAroundX(vec3 A,float B){float C=cos(B);float D=sin(B);return vec3(A.x,A.y*C-A.z*D,A.y*D+A.z*C);}vec3 rotateAroundY(vec3 A,float B){float C=cos(B);float D=sin(B);return vec3(A.x*C+A.z*D,A.y,-A.x*D+A.z*C);}vec3 rotateAroundZ(vec3 A,float B){float C=cos(B);float D=sin(B);return vec3(A.x*C-A.y*D,A.x*D+A.y*C,A.z);}vec3 applyRotation(vec3 A,vec3 E){vec3 F=A;if(E.z!=0.0f){F=rotateAroundZ(F,E.z);}if(E.y!=0.0f){F=rotateAroundY(F,E.y);}if(E.x!=0.0f){F=rotateAroundX(F,E.x);}return F;}',
		Ti =
			'#version 300 es\nin vec4 A8;in vec2 Ab;in vec2 A7;in vec2 Aa;in vec3 A6;in vec4 A4;in vec4 A0;in vec4 A5;in vec3 Ac;in vec3 A9;in vec4 A2;in vec4 A3;in vec3 A1;uniform mat4 UI;uniform mat4 Uk;out vec2 v_uv;out vec2 v_textureUv;out vec3 v_glyphIndex;out vec4 v_glyphColor;out vec4 v_cellColor;out vec4 v_glyphFlags;out vec3 v_worldPosition;out vec3 v_normal;out float v_geometryType;const float A=6.28318530718f;const int B=2;const int C=3;const int D=4;const int E=5;const int F=6;const int G=7;const int H=8;const int I=9;const int J=10;\n' +
			Ui +
			'\nvec2 K(float L,vec2 M,vec2 N,vec2 O,vec2 P){float Q=1.0f-L;float R=Q*Q;float S=R*Q;float T=L*L;float U=T*L;return S*M+3.0f*R*L*N+3.0f*Q*T*O+U*P;}vec2 V(float L,vec2 M,vec2 N,vec2 O,vec2 P){float Q=1.0f-L;float R=Q*Q;float T=L*L;return-3.0f*R*M+3.0f*(R-2.0f*Q*L)*N+3.0f*(2.0f*Q*L-T)*O+3.0f*T*P;}void main(){vec2 W=Ab;vec2 X=Ab;v_glyphIndex=A6;v_glyphColor=A4;v_cellColor=A0;v_glyphFlags=A5;vec4 Y=A2;vec4 Z=A3;vec2 a=Aa;vec2 b=A7;float c=A1.x;float d=A1.y;int e=int(A1.z);vec3 f=vec3(0.0f);if(e==D){float L=clamp(A8.x,0.0f,1.0f);vec2 M=Z.xy;vec2 N=Y.xy;vec2 O=Y.zw;vec2 P=Z.zw;vec2 g=K(L,M,N,O,P);vec2 h=V(L,M,N,O,P);float i=length(h);vec2 j=i>0.0f?h/i:vec2(1.0f,0.0f);vec2 k=vec2(-j.y,j.x);vec2 l=g+k*A8.y*a.y;f=vec3(l,d);}else if(e==C){float m=mod(Y.x,A);if(m<0.0f){m+=A;}float n=mod(Y.y,A);if(n<0.0f){n+=A;}float o=m-n;if(o<=0.0f){o+=A;}float p=m-A8.x*o;vec2 q=vec2(cos(p),sin(p))*A8.y;vec2 l=q*a+b;f=vec3(l,d);}else if(e==B){vec2 l=A8.xy*a+b;f=vec3(l,d);}else if(e==J){vec2 l=A8.xy*a+b;f=vec3(l,Ab.x*c+d);}else if(e==G){float r=max(0.0f,a.x*0.5f);float s=max(0.0f,c*0.5f);float t=max(0.0f,a.y*0.5f);float u=max(0.0f,r-t);float v=max(0.0f,s-t);float w=A8.x;float x=A8.y;float y=A8.z;float z=A8.w;W=vec2(y,z);float AA=u+t*y;float AB=v+t*y;f=vec3(AA*w+b.x,t*z+b.y,AB*x+d);}else if(e==E||e==F||e==H||e==I){vec3 AC=A8.xyz;W=vec2(AC.z,0.0f);f=vec3(A8.x*a.x+b.x,A8.y*a.y+b.y,A8.z*c+d);}vec3 AD=applyRotation(f,A9);vec3 AE=AD+Ac;vec3 AF=vec3(0.0f,0.0f,1.0f);v_uv=W;v_textureUv=X;v_worldPosition=AE;v_normal=AF;v_geometryType=float(e);vec4 AG=Uk*UI*vec4(AE,1.0f);AG.y=-AG.y;gl_Position=AG;}',
		Pi =
			'#version 300 es\nin vec2 A8;in vec2 Ab;in vec2 A7;in vec2 Aa;in vec3 A6;in vec4 A4;in vec4 A0;in vec4 A5;in vec3 Ac;in vec3 A9;in vec3 A1;uniform mat4 UI;uniform mat4 Uk;out vec2 v_uv;out vec2 v_textureUv;out vec3 v_glyphIndex;out vec4 v_glyphColor;out vec4 v_cellColor;out vec4 v_glyphFlags;out vec3 v_worldPosition;out vec3 v_normal;out float v_geometryType;const float A=2.0f;\n' +
			Ui +
			'\nvoid main(){v_uv=Ab;v_textureUv=Ab;v_glyphIndex=A6;v_glyphColor=A4;v_cellColor=A0;v_glyphFlags=A5;vec2 B=A8.xy*Aa+A7;float C=A1.y;vec3 D=vec3(B,C);vec3 E=applyRotation(D,A9)+Ac;v_worldPosition=E;v_normal=vec3(0.0f,0.0f,1.0f);v_geometryType=A;vec4 F=Uk*UI*vec4(E,1.0f);F.y=-F.y;gl_Position=F;}',
		Li =
			'uniform bool u_tmUseLighting;uniform vec3 u_tmAmbientLightColor;uniform int u_tmPointLightCount;uniform vec3 u_tmPointLightPositions[5];uniform vec3 u_tmPointLightColors[5];uniform vec3 u_tmLightFalloff;const int TM_MAX_POINT_LIGHTS=5;vec3 tmComputeGeometricNormal(vec3 A){vec3 B=cross(dFdy(A),dFdx(A));float C=length(B);if(C<=0.000001f){return vec3(0.0f,0.0f,1.0f);}return B/C;}vec3 tmApplyLighting(vec3 D,vec3 A){if(!u_tmUseLighting){return D;}vec3 E=D*u_tmAmbientLightColor;if(u_tmPointLightCount>0){vec3 B=tmComputeGeometricNormal(A);for(int F=0;F<TM_MAX_POINT_LIGHTS;F++){if(F>=u_tmPointLightCount){break;}vec3 G=u_tmPointLightPositions[F]-A;float H=length(G);vec3 I=H>0.000001f?G/H:B;float J=max(dot(B,I),0.0f);float K=u_tmLightFalloff.x+H*u_tmLightFalloff.y+H*H*u_tmLightFalloff.z;float L=K>0.0f?1.0f/K:1.0f;E+=D*u_tmPointLightColors[F]*(J*L);}}return clamp(E,0.0f,1.0f);}',
		Di =
			'#version 300 es\nprecision highp float;in vec3 v_glyphIndex;in vec4 v_glyphColor;in vec4 v_cellColor;in vec4 v_glyphFlags;in vec3 v_worldPosition;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_statePayload;\n' +
			Li +
			'\nvoid main(){int A=int(v_glyphFlags.r>0.5?1:0);int B=int(v_glyphFlags.g>0.5?1:0);int C=int(v_glyphFlags.b>0.5?1:0);float D=float(A|(B<<1)|(C<<2))/255.;o_character=vec4(v_glyphIndex.xy,D,clamp(v_glyphFlags.a,0.,1.));vec3 E=tmApplyLighting(v_glyphColor.rgb,v_worldPosition);vec3 F=tmApplyLighting(v_cellColor.rgb,v_worldPosition);o_primaryColor=vec4(E,v_glyphColor.a);o_secondaryColor=vec4(F,v_cellColor.a);o_statePayload=vec4(0.);}',
		ki =
			'#version 300 es\nprecision highp float;in vec2 v_textureUv;in vec3 v_worldPosition;uniform sampler2D Ut;uniform bool UG;uniform bool UE;uniform bool UF;uniform float UD;uniform float Uv;uniform float Uu;uniform bool Uz;uniform vec4 Uy;uniform bool Ux;uniform vec4 Uw;uniform int UA;uniform sampler2D UB;uniform ivec2 UC;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_statePayload;\n' +
			Li +
			'\nfloat A(vec3 B){return dot(B,vec3(0.299f,0.587f,0.114f));}vec3 C(int D){int E=max(UC.x,1);int F=D/E;int G=D%E;return texelFetch(UB,ivec2(G,F),0).rgb;}void main(){vec2 H=vec2(v_textureUv.x,1.0f-v_textureUv.y);vec4 I=texture(Ut,H);if(UG){I.rgb=vec3(1.0f)-I.rgb;}float J=A(I.rgb);if(I.a<0.01f||J<Uv||J>Uu){discard;}vec2 K=vec2(0.0f);if(UA>0){float L=float(UA);float M=clamp(J*(L-1.0f),0.0f,L-1.0f);int N=int(floor(M+0.5f));K=C(N).xy;}vec4 O=Uz?Uy:I;vec4 P=Ux?Uw:I;vec3 Q=tmApplyLighting(O.rgb,v_worldPosition);vec3 R=tmApplyLighting(P.rgb,v_worldPosition);int S=int(UG?1:0);int T=int(UE?1:0);int U=int(UF?1:0);float V=float(S|(T<<1)|(U<<2))/255.0f;o_character=vec4(K,V,clamp(UD,0.0f,1.0f));o_primaryColor=vec4(Q,O.a);o_secondaryColor=vec4(R,P.a);o_statePayload=vec4(0.0f);}',
		Ri =
			'#version 300 es\nprecision highp float;in vec2 v_textureUv;in vec3 v_worldPosition;uniform sampler2D Un;uniform sampler2D Uo;uniform sampler2D Up;uniform sampler2D Uq;uniform vec2 Ur;uniform bool Uc;uniform bool Ud;uniform bool Ue;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_statePayload;\n' +
			Li +
			'\nvoid main(){vec2 A=vec2(v_textureUv.x,1.-v_textureUv.y);vec2 B=A*Ur;vec2 C=(floor(B)+0.5f)/Ur;vec4 D=texture(Un,C);vec4 E=Uc?texture(Uo,C):vec4(0.);if(Uc&&E.a==0.){discard;}vec4 F=Ud?texture(Up,C):vec4(0.);vec4 G=Ue?texture(Uq,C):vec4(0.);vec3 H=tmApplyLighting(E.rgb,v_worldPosition);vec3 I=tmApplyLighting(F.rgb,v_worldPosition);o_character=D;o_primaryColor=vec4(H,E.a);o_secondaryColor=vec4(I,F.a);o_statePayload=G;}',
		Oi = class {
			Fo = 0;
			ts;
			To;
			Po;
			$s;
			Lo;
			constructor(t) {
				((this.ts = new Mt(t, Ti, Di)),
					(this.To = new Mt(t, Ti, ki)),
					(this.Po = new Mt(t, Ti, Ri)),
					(this.$s = new Mt(t, Pi, Ri)),
					(this.Lo = { id: this.Fo++, shader: this.ts, uniforms: Object.freeze({}), isBuiltIn: !0 }));
			}
			Ys(t, i = {}) {
				return { id: this.Fo++, shader: t, uniforms: Object.freeze({ ...i }), isBuiltIn: !1 };
			}
			Do(t) {
				return this.Ys(this.To, t);
			}
			ko(t) {
				return this.Ys(this.Po, t);
			}
			L() {
				(this.ts.dispose(), this.To.dispose(), this.Po.dispose(), this.$s.dispose());
			}
		},
		Bi = class {
			Ro = [];
			Oo = 1;
			Bo = 0;
			Io(t, i) {
				if (this.Bo >= this.Ro.length) {
					const e = { id: this.Oo++, type: t, params: {}, state: Vt.$n(), material: i };
					this.Ro.push(e);
				}
				const e = this.Ro[this.Bo];
				return ((e.id = this.Oo++), (e.type = t), (e.material = i), this.Bo++, e);
			}
			No(t, i) {
				if (t.data && t.data.length >= i) return;
				let e = Math.max(ti.FLOATS_PER_INSTANCE, t.data?.length ?? 0);
				for (; e < i;) e *= 2;
				t.data = new Float32Array(e);
			}
			jo(t, i) {
				if (t.vertices && t.vertices.length >= i) return;
				let e = Math.max(24, t.vertices?.length ?? 0);
				for (; e < i;) e *= 2;
				t.vertices = new Float32Array(e);
			}
			Qo(t, i, e, s) {
				const r = this.Io(Xt.RECTANGLE, s),
					n = r.params;
				return ((n.width = t), (n.height = i), e.Yn(r.state), r.id);
			}
			zo(t, i, e, s, r, n) {
				const h = this.Io(Xt.LINE, n),
					o = h.params;
				return ((o.x1 = t), (o.y1 = i), (o.x2 = e), (o.y2 = s), r.Yn(h.state), h.id);
			}
			Ho(t, i, e, s) {
				const r = this.Io(Xt.ELLIPSE, s),
					n = r.params;
				return ((n.width = t), (n.height = i), e.Yn(r.state), r.id);
			}
			Go(t, i, e, s, r, n) {
				const h = this.Io(Xt.ARC, n),
					o = h.params;
				return ((o.width = t), (o.height = i), (o.start = e), (o.stop = s), r.Yn(h.state), h.id);
			}
			Vo(t, i, e, s, r, n, h, o, a, c) {
				const u = this.Io(Xt.BEZIER_CURVE, c),
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
					a.Yn(u.state),
					u.id
				);
			}
			Xo(t, i, e, s, r, n) {
				const h = this.Io(t, n),
					o = h.params;
				return ((o.width = i), (o.height = e), (o.depth = s), r.Yn(h.state), h.id);
			}
			$o(t, i, e, s) {
				const r = this.Io('glyph_run', s),
					n = r.params,
					h = i * ti.FLOATS_PER_INSTANCE;
				this.No(n, h);
				for (let o = 0; o < h; o++) n.data[o] = t[o];
				return ((n.instanceCount = i), e.Yn(r.state), r.id);
			}
			Yo(t, i, e, s) {
				if (0 === i) return 0;
				const r = this.Io('custom_shape', s),
					n = r.params,
					h = 4 * i;
				this.jo(n, h);
				for (let o = 0; o < h; o++) n.vertices[o] = t[o];
				return ((n.vertexCount = i), e.Yn(r.state), r.id);
			}
			Rh() {
				this.Bo = 0;
			}
			[Symbol.iterator]() {
				let t = 0;
				const i = this.Bo,
					e = this.Ro;
				return { next: () => (t < i ? { value: e[t++], done: !1 } : { value: void 0, done: !0 }) };
			}
		},
		Ii = class {
			Es;
			Ko = new Map();
			Wo = new WeakMap();
			_h;
			Zo = 0;
			qo = 1;
			constructor(t, i = 64) {
				((this.Es = t), (this._h = Math.max(1, i)));
			}
			resolve(t, i = null) {
				const e = this.Jo(),
					s = Math.min(e * e, 65535);
				if (t.length > s)
					throw new n('[textmode.js] Character palette exceeds the supported GPU texture capacity.', {
						requestedCharacters: t.length,
						maxCharacters: s,
						maxTextureSize: e,
					});
				const r = this.ta(t),
					h = `${i ? this.ia(i) : 'none'}:${t.length}:${this.ea(r)}`,
					o = this.Ko.get(h);
				if (o && this.sa(o.data, r)) return ((o.lastUsed = ++this.Zo), o);
				const a = this.K(t, r, h);
				return (this.Ko.set(h, a), this.ra(), a);
			}
			dispose() {
				for (const t of this.Ko.values()) this.Es.deleteTexture(t.texture);
				this.Ko.clear();
			}
			get size() {
				return this.Ko.size;
			}
			K(t, i, e) {
				const s = Math.max(t.length, 1),
					r = this.Jo(),
					h = Math.min(r, Math.ceil(Math.sqrt(s))),
					o = Math.max(1, Math.ceil(s / h)),
					a = new Uint8Array(h * o * 4);
				a.set(i);
				const c = this.Es.createTexture();
				if (!c) throw new n('[textmode.js] Failed to create character palette texture.');
				const u = this.Es;
				return (
					u.bindTexture(u.TEXTURE_2D, c),
					u.texParameteri(u.TEXTURE_2D, u.TEXTURE_MIN_FILTER, u.NEAREST),
					u.texParameteri(u.TEXTURE_2D, u.TEXTURE_MAG_FILTER, u.NEAREST),
					u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_S, u.CLAMP_TO_EDGE),
					u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_T, u.CLAMP_TO_EDGE),
					u.pixelStorei(u.UNPACK_FLIP_Y_WEBGL, 0),
					u.texImage2D(u.TEXTURE_2D, 0, u.RGBA8, h, o, 0, u.RGBA, u.UNSIGNED_BYTE, a),
					u.bindTexture(u.TEXTURE_2D, null),
					{ texture: c, columns: h, rows: o, count: t.length, key: e, data: i, lastUsed: ++this.Zo }
				);
			}
			ta(t) {
				const i = new Uint8Array(4 * Math.max(t.length, 1));
				for (let e = 0; e < t.length; e++) {
					const s = t[e],
						r = 4 * e;
					((i[r] = this.na(s[0])), (i[r + 1] = this.na(s[1])), (i[r + 2] = this.na(s[2])), (i[r + 3] = 255));
				}
				return i;
			}
			na(t) {
				return Math.max(0, Math.min(255, Math.round(255 * t)));
			}
			Jo() {
				return Math.max(1, Number(this.Es.getParameter(this.Es.MAX_TEXTURE_SIZE)) || 4096);
			}
			ea(t) {
				let i = 2166136261;
				for (let e = 0; e < t.length; e++) ((i ^= t[e]), (i = Math.imul(i, 16777619)));
				return (i >>> 0).toString(16);
			}
			sa(t, i) {
				if (t.length !== i.length) return !1;
				for (let e = 0; e < t.length; e++) if (t[e] !== i[e]) return !1;
				return !0;
			}
			ia(t) {
				const i = t;
				return String(i.id ?? i.ha ?? this.oa(t));
			}
			oa(t) {
				const i = this.Wo.get(t);
				if (i) return i;
				const e = this.qo++;
				return (this.Wo.set(t, e), e);
			}
			ra() {
				for (; this.Ko.size > this._h;) {
					let t = null,
						i = 1 / 0;
					for (const [s, r] of this.Ko) r.lastUsed < i && ((i = r.lastUsed), (t = s));
					if (!t) return;
					const e = this.Ko.get(t);
					e && (this.Es.deleteTexture(e.texture), this.Ko.delete(t));
				}
			}
		},
		Ni = class {
			G;
			aa = new Map();
			ca = new WeakMap();
			ua = 1;
			constructor(t) {
				this.G = t;
			}
			materialFor(t) {
				'source' === t.kind && t.source.la();
				const i = this.fa(t),
					e = this.aa.get(i);
				if (e) return e;
				const s =
					'source' === t.kind
						? this.G.materialManager.Do(this.G.da(t))
						: this.G.materialManager.ko(this.G._a(t));
				return (this.aa.set(i, s), s);
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
				const e = this.ua++;
				return (this.ca.set(t, e), e);
			}
		},
		ji = class {
			Es;
			uo = null;
			ma;
			ga;
			va;
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
			Oa = !1;
			Ba = new Float32Array(4);
			Ia = new Float32Array(12);
			Na = new Set();
			constructor(t) {
				((this.Es = t),
					t.enable(t.DEPTH_TEST),
					t.depthFunc(t.LEQUAL),
					t.clearDepth(1),
					t.depthMask(!0),
					(this.ka = !0),
					(this.Ra = !0),
					t.disable(t.CULL_FACE),
					(this.wa = new Vt()),
					(this.ga = new Oi(t)),
					(this.va = new Ii(t)),
					(this.ya = new Ni(this)),
					(this.ba = new Bi()),
					(this.ma = new Fi(t)),
					(this.Ma = new qt(t)));
				const i = [0, 0, t.canvas.width, t.canvas.height];
				(Ct(t, i),
					this.Ea.push(null),
					this.Fa.push(i),
					this.Ta.push(1),
					(this.Pa = null),
					(this.La = i),
					(this.Da = 1));
			}
			Ns() {
				(this.Ea.push(this.Pa), this.Fa.push([...this.La]), this.Ta.push(this.Da));
			}
			Gs() {
				const t = this.Ea.pop() ?? null,
					i = this.Fa.pop() ?? [0, 0, this.Es.canvas.width, this.Es.canvas.height],
					e = this.Ta.pop() ?? 1;
				this.js(t, i[2], i[3], e);
			}
			js(t, i, e, s = 1) {
				const r = this.Es;
				(this.Pa !== t && (r.bindFramebuffer(r.FRAMEBUFFER, t), (this.Pa = t)), (this.Da = s));
				const n = [0, 0, i, e];
				(this.La[0] === n[0] && this.La[1] === n[1] && this.La[2] === n[2] && this.La[3] === n[3]) ||
					(r.viewport(...n), Ct(r, n), (this.La = n));
			}
			ts(t) {
				this.uo !== t && ((this.uo = t), t.nr());
			}
			ja(t) {
				if (((this.Oa = t), t)) this.Na.clear();
				else {
					for (const t of this.Na) t.Qa();
					this.Na.clear();
				}
			}
			za() {
				return this.Oa;
			}
			Ha(t) {
				this.Na.add(t);
			}
			rr(t, i) {
				return new Mt(this.Es, t, i);
			}
			Ga(t) {
				((this.Ca = t), t && (this.xa = {}));
			}
			Va() {
				((this.Ca = null), (this.xa = {}));
			}
			ar(t, i) {
				this.xa[t] = i;
			}
			es(t) {
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
				return new Mt(this.Es, Ti, t);
			}
			Ka() {
				if (this.Ca) return this.ga.Ys(this.Ca, this.xa);
				const t = this.wa.Gn.current;
				return 'source' === t.kind || 'framebuffer' === t.kind ? this.ya.materialFor(t) : this.ga.Lo;
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
					e = t.attachmentCount > 1,
					s = t.attachmentCount > 2,
					r = t.attachmentCount > 3;
				return {
					Un: i[0],
					Uo: e ? i[1] : i[0],
					Up: s ? i[2] : i[0],
					Uq: r ? i[3] : i[0],
					Ur: [t.width, t.height],
					Uc: e,
					Ud: s,
					Ue: r,
				};
			}
			Wa(t, i, e, s) {
				t instanceof wt || !s || t.Za(s);
				const r = t instanceof wt ? [t.Vs()] : t.qa(),
					n = i ?? t.width,
					h = e ?? t.height;
				for (const o of r) this.ba.Qo(n, h, this.wa, o);
				t instanceof wt || !t.Ja() || this.Ha(t);
			}
			ss(t, i, e, s) {
				this.Ma.sh(t, i, e, s);
			}
			tc(t, i) {
				this.ba.Qo(t, i, this.wa, this.Ka());
			}
			$o(t, i) {
				0 !== i && this.ba.$o(t, i, this.wa, this.Ka());
			}
			ec(t, i, e, s) {
				this.ba.zo(t, i, e, s, this.wa, this.Ka());
			}
			sc(t, i) {
				this.ba.Yo(t, i, this.wa, this.Ka());
			}
			rc(t, i) {
				this.ba.Ho(t, i, this.wa, this.Ka());
			}
			nc(t, i, e, s, r, n) {
				((this.Ia[0] = t),
					(this.Ia[1] = i),
					(this.Ia[2] = 0),
					(this.Ia[3] = 0),
					(this.Ia[4] = e),
					(this.Ia[5] = s),
					(this.Ia[6] = 0),
					(this.Ia[7] = 0),
					(this.Ia[8] = r),
					(this.Ia[9] = n),
					(this.Ia[10] = 0),
					(this.Ia[11] = 0),
					this.ba.Yo(this.Ia, 3, this.wa, this.Ka()));
			}
			hc(t, i, e, s, r, n, h, o) {
				this.ba.Vo(t, i, e, s, r, n, h, o, this.wa, this.Ka());
			}
			oc(t, i, e, s) {
				this.ba.Go(t, i, e, s, this.wa, this.Ka());
			}
			ac(t, i, e) {
				this.ba.Xo(Xt.BOX, t, i, e, this.wa, this.Ka());
			}
			cc(t) {
				const i = 2 * t;
				this.ba.Xo(Xt.SPHERE, i, i, i, this.wa, this.Ka());
			}
			uc(t, i) {
				const e = 2 * (t + i);
				this.ba.Xo(Xt.TORUS, e, 2 * i, e, this.wa, this.Ka());
			}
			lc(t, i) {
				const e = 2 * t;
				this.ba.Xo(Xt.CONE, e, i, e, this.wa, this.Ka());
			}
			fc(t, i) {
				const e = 2 * t;
				this.ba.Xo(Xt.CYLINDER, e, i, e, this.wa, this.Ka());
			}
			dc(t, i, e) {
				this.ba.Xo(Xt.ELLIPSOID, 2 * t, 2 * i, 2 * e, this.wa, this.Ka());
			}
			W(t, i, e = 1, s = {}) {
				return new wt(this.Es, t, i, e, s, this);
			}
			_c(t, i = t, e = t, s = 255) {
				this.wa.vn.Ln(t, i ?? t, e ?? t, s);
				const [r, n, h, o] = this.wa.vn.Me;
				this.mc(r, n, h, o);
			}
			Rh(t = 0, i = 0, e = 0, s = 0) {
				this.mc(t, i, e, s);
			}
			mc(t, i, e, s) {
				const r = this.Es,
					n = this.Ba;
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
						this.Da >= 3 &&
							((n[0] = t), (n[1] = i), (n[2] = e), (n[3] = s), r.clearBufferfv(r.COLOR, 2, n)),
						this.Da >= 3 && ((n[0] = 0), (n[1] = 0), (n[2] = 0), (n[3] = 0)));
					for (let t = 3; t < this.Da; t++) r.clearBufferfv(r.COLOR, t, n);
				} else (r.clearColor(t, i, e, s), r.clear(r.COLOR_BUFFER_BIT));
			}
			gc() {
				const t = [0, 0, this.Es.canvas.width, this.Es.canvas.height];
				(this.Es.viewport(...t), Ct(this.Es, t), (this.La = t), this.Fa.length > 0 && (this.Fa[0] = t));
			}
			vc(t) {
				this.ka !== t &&
					(t ? this.Es.enable(this.Es.DEPTH_TEST) : this.Es.disable(this.Es.DEPTH_TEST), (this.ka = t));
			}
			yc(t) {
				this.Ra !== t && (this.Es.depthMask(t), (this.Ra = t));
			}
			wc() {
				return this.ka;
			}
			bc() {
				return this.Ra;
			}
			Hs() {
				const t = this.ba;
				(this.ma.wo(t), t.Rh(), (this.uo = null));
			}
			L() {
				(this.ya.dispose(), this.va.dispose(), this.ga.L(), this.ma.L(), this.Ma.L());
			}
			get context() {
				return this.Es;
			}
			get state() {
				return this.wa;
			}
			get materialManager() {
				return this.ga;
			}
			get glyphPaletteService() {
				return this.va;
			}
		},
		Qi = class {
			p;
			Mc = null;
			Cc = !1;
			xc;
			Sc = null;
			Ec = !0;
			Es = null;
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
						throw new n('Video elements are only supported in overlay mode.');
					((this.p = t.canvas), (this.xc = !1));
				} else ((this.p = this.Rc(t.width, t.height)), (this.xc = !0));
				'undefined' != typeof HTMLCanvasElement &&
					this.p instanceof HTMLCanvasElement &&
					(this.p.style.imageRendering = 'pixelated');
			}
			Rc(t, i) {
				const e = document.createElement('canvas');
				((e.className = 'textmodeCanvas'), (e.style.imageRendering = 'pixelated'));
				const s = t || 800,
					r = i || 600;
				return (
					(e.width = s * this.Lc),
					(e.height = r * this.Lc),
					(e.style.width = s + 'px'),
					(e.style.height = r + 'px'),
					this.Oc(e),
					e
				);
			}
			Oc(t) {
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
				let e = Math.round(i.width),
					s = Math.round(i.height);
				if ('undefined' != typeof HTMLVideoElement && this.Mc instanceof HTMLVideoElement) {
					const t = this.Mc;
					(0 === e || 0 === s) &&
						t.videoWidth > 0 &&
						t.videoHeight > 0 &&
						((e = t.videoWidth), (s = t.videoHeight));
				}
				((t.width = e * this.Lc),
					(t.height = s * this.Lc),
					(t.style.width = e + 'px'),
					(t.style.height = s + 'px'),
					(t.style.position = 'absolute'));
				const r = window.getComputedStyle(this.Mc);
				let n = parseInt(r.zIndex || '0', 10);
				return (isNaN(n) && (n = 0), (t.style.zIndex = (n + 1).toString()), t);
			}
			kc() {
				(this.Bc(),
					this.Ic(),
					this.Mc?.parentNode ||
						'loading' !== document.readyState ||
						((this.Tc = () => {
							((this.Tc = null), this.Pc || (this.Bc(), this.Ic()));
						}),
						document.addEventListener('DOMContentLoaded', this.Tc, { once: !0 })));
			}
			Ic() {
				this.p instanceof HTMLCanvasElement &&
					this.Mc &&
					!this.p.parentNode &&
					this.Mc.parentNode?.insertBefore(this.p, this.Mc.nextSibling);
			}
			Bc() {
				if (!this.Mc) return;
				if (!(this.p instanceof HTMLCanvasElement)) return;
				const t = this.Mc.getBoundingClientRect(),
					i = this.Mc.offsetParent;
				if (i && i !== document.body) {
					const e = i.getBoundingClientRect();
					((this.p.style.top = t.top - e.top + 'px'), (this.p.style.left = t.left - e.left + 'px'));
				} else
					((this.p.style.top = t.top + window.scrollY + 'px'),
						(this.p.style.left = t.left + window.scrollX + 'px'));
			}
			cs(t, i) {
				if (this.Cc) {
					const t = this.Mc.getBoundingClientRect(),
						i = Math.round(t.width),
						e = Math.round(t.height);
					((this.p.width = i * this.Lc),
						(this.p.height = e * this.Lc),
						(this.p.style.width = i + 'px'),
						(this.p.style.height = e + 'px'),
						this.Bc());
				} else {
					const e = t ?? Math.round(this.p.width / this.Lc),
						s = i ?? Math.round(this.p.height / this.Lc);
					((this.p.width = e * this.Lc),
						(this.p.height = s * this.Lc),
						this.p instanceof HTMLCanvasElement &&
							((this.p.style.width = e + 'px'), (this.p.style.height = s + 'px')));
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
				if (!t) throw new n('`textmode.js` requires WebGL2 support.');
				return ((this.Es = t), t);
			}
			L() {
				if (this.Pc) return;
				if (((this.Pc = !0), this.jc(), !this.Ec)) return;
				const t = this.Es ?? this.Sc;
				(t && t.getExtension('WEBGL_lose_context')?.loseContext(),
					this.xc &&
						'undefined' != typeof HTMLCanvasElement &&
						this.p instanceof HTMLCanvasElement &&
						this.p.parentNode &&
						this.p.parentNode.removeChild(this.p));
			}
			jc() {
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
			Qc(t) {
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
	var Vi = class t {
			zc;
			Hc;
			r;
			g;
			b;
			a;
			constructor(t, i, e, s) {
				((this.r = Gi(t)), (this.g = Gi(i)), (this.b = Gi(e)), (this.a = Gi(s)));
			}
			static Gc(i, e, s, r) {
				if (i instanceof t) return i;
				if (Array.isArray(i)) {
					if (i.length < 3) throw new Error('Component tuples must include at least RGB values.');
					const [e, s, r] = i,
						n = 4 === i.length ? i[3] : 255;
					return t.Vc(e, s, r, n);
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
									const i = Hi.exec(t.trim());
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
										(t.endsWith('%') && (i /= 100), (h = 255 * H(i, 0, 1)));
									}
									return [s, r, n, Math.round(h)];
								})(e)),
							s && (i || 0 !== s[3]) ? s : null
						);
					})(e, !0);
					return s ? t.Vc(...s) : t.Xc(e);
				}
				if ('number' == typeof i)
					return 'number' == typeof e && 'number' == typeof s
						? t.Vc(i, e, s, r ?? 255)
						: 'number' == typeof e
							? t.$c(i, e)
							: t.$c(i, r ?? 255);
				throw new Error('Unsupported color input passed.');
			}
			static Yc(i, e, s, r, n) {
				if (i instanceof t || 'string' == typeof i) return t.Gc(i);
				const [h, o, a, c] = (function (t, i, e, s, r) {
					if (Array.isArray(t)) {
						if (t.length < 3) throw new Error('Component tuples must include at least RGB values.');
						return kt(t[0], t[1], t[2], 4 === t.length ? t[3] : void 0, r);
					}
					return 'number' == typeof i && 'number' == typeof e
						? kt(t, i, e, s, r)
						: (function (t, i, e) {
								const s = Pt(t, 'rgb' === e.mode ? e.maxes[0] : e.maxes[2]);
								return [s, s, s, Lt(i, e.maxes[3])];
							})(t, i ?? s, r);
				})(i, e, s, r, n);
				return t.Vc(h, o, a, c);
			}
			static Vc(i, e, s, r = 255) {
				return new t(i, e, s, r);
			}
			static $c(i, e = 255) {
				return new t(i, i, i, e);
			}
			static Xc(i) {
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
			static Kc(i, e, s, r) {
				return new t(Math.round(255 * i), Math.round(255 * e), Math.round(255 * s), Math.round(255 * r));
			}
			get rgb() {
				return [this.r, this.g, this.b];
			}
			get rgba() {
				return (this.zc || (this.zc = [this.r, this.g, this.b, this.a]), [...this.zc]);
			}
			get normalized() {
				return (this.Hc || (this.Hc = [this.r / 255, this.g / 255, this.b / 255, this.a / 255]), [...this.Hc]);
			}
			withAlpha(i) {
				return new t(this.r, this.g, this.b, i);
			}
		},
		Xi = class {
			Wc;
			Zc;
			qc;
			Jc = 'brightness';
			tu = null;
			iu = null;
			eu = null;
			constructor(t, i, e) {
				((this.Wc = t), (this.Zc = i), (this.qc = e));
			}
			get conversionMode() {
				return this.Jc;
			}
			setConversionMode(t, i) {
				i
					? ((this.tu = t), this.Zc.disposeStack(this.eu), (this.eu = null))
					: ((this.Jc = t), this.Zc.disposeStack(this.iu), (this.iu = null));
			}
			setConversions(t, i) {
				if (!Array.isArray(t))
					throw new n('[textmode.js] conversions() expects an array of conversion steps.', {
						method: 'conversions',
						providedValue: t,
					});
				if (0 === t.length) return (this.clearConversions(i), !1);
				const e = t.map((t, i) => this.su(t, i));
				return (
					i
						? ((this.tu = null), this.Zc.disposeStack(this.eu), (this.eu = e))
						: (this.Zc.disposeStack(this.iu), (this.iu = e)),
					!0
				);
			}
			clearConversions(t) {
				t
					? ((this.tu = null), this.Zc.disposeStack(this.eu), (this.eu = []))
					: (this.Zc.disposeStack(this.iu), (this.iu = null));
			}
			clearFrameOverrides() {
				((this.tu = null), this.Zc.disposeStack(this.eu), (this.eu = null));
			}
			getActiveStack() {
				return null !== this.tu ? null : null !== this.eu ? (this.eu.length > 0 ? this.eu : null) : this.iu;
			}
			getSingleMode() {
				return this.tu ?? this.Jc;
			}
			hasFrameOverrides() {
				return null !== this.tu || null !== this.eu;
			}
			invalidateMaterials() {
				(this.iu?.forEach((t) => {
					t.material = null;
				}),
					this.eu?.forEach((t) => {
						t.material = null;
					}));
			}
			refreshPalettes() {
				(this.ru(this.iu), this.ru(this.eu));
			}
			dispose() {
				(this.Zc.disposeStack(this.iu), this.Zc.disposeStack(this.eu), (this.iu = null), (this.eu = null));
			}
			get debugSnapshot() {
				return { conversionMode: this.Jc, conversionStack: this.iu, frameConversionStack: this.eu };
			}
			su(t, i) {
				if (!t || 'object' != typeof t)
					throw new n('[textmode.js] Conversion stack steps must be objects.', {
						method: 'conversions',
						index: i,
						providedValue: t,
					});
				if ('string' != typeof t.mode || '' === t.mode.trim())
					throw new n('[textmode.js] Conversion stack step mode must be a non-empty string.', {
						method: 'conversions',
						index: i,
						providedValue: t.mode,
					});
				const e = {
					mode: t.mode,
					options: this.nu(t.options, i),
					paletteTexture: null,
					paletteDirty: !1,
					material: null,
				};
				if (void 0 !== t.characters) {
					if ('string' != typeof t.characters)
						throw new n('[textmode.js] Conversion stack step characters must be a string.', {
							method: 'conversions',
							index: i,
							providedValue: t.characters,
						});
					((e.characters = t.characters),
						(e.glyphColors = this.Wc.getCharacterPalette(t.characters)),
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
						throw new n(
							'[textmode.js] Conversion stack step brightnessStart and brightnessEnd must be provided together.',
							{
								method: 'conversions',
								index: i,
								brightnessStart: t.brightnessStart,
								brightnessEnd: t.brightnessEnd,
							}
						);
					const [s, r] = this.hu(t.brightnessStart, t.brightnessEnd, 'conversions', i);
					((e.brightnessStart = s), (e.brightnessEnd = r));
				}
				return (
					void 0 !== t.charColorMode &&
						(this.ou(t.charColorMode, 'charColorMode', i), (e.charColorMode = t.charColorMode)),
					void 0 !== t.cellColorMode &&
						(this.ou(t.cellColorMode, 'cellColorMode', i), (e.cellColorMode = t.cellColorMode)),
					void 0 !== t.charColor && (e.charColor = this.qc(t.charColor)),
					void 0 !== t.cellColor && (e.cellColor = this.qc(t.cellColor)),
					e
				);
			}
			ou(t, i, e) {
				if ('sampled' !== t && 'fixed' !== t)
					throw new n(`[textmode.js] Conversion stack step ${i} must be 'sampled' or 'fixed'.`, {
						method: 'conversions',
						index: e,
						providedValue: t,
					});
			}
			nu(t, i) {
				if (void 0 === t) return {};
				if (null === t || 'object' != typeof t || Array.isArray(t))
					throw new n('[textmode.js] Conversion stack step options must be an object.', {
						method: 'conversions',
						index: i,
						providedValue: t,
					});
				return { ...t };
			}
			hu(t, i, e, s) {
				const r = { method: e, start: t, end: i };
				if ((void 0 !== s && (r.index = s), !Number.isFinite(t) || !Number.isFinite(i)))
					throw new n('[textmode.js] brightness range values must be finite numbers.', r);
				if (t < 0 || t > 255 || i < 0 || i > 255)
					throw new n('[textmode.js] brightness range values must be between 0 and 255.', r);
				if (t > i) throw new n('[textmode.js] brightness range start must be less than or equal to end.', r);
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
		$i = class {
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
				const e = this.au.resolve(t, this.du);
				return i?.texture === e.texture ? i : e;
			}
		},
		Yi = class {
			qc;
			du = null;
			yn = null;
			dn = 0;
			mn = 0;
			gn = 0;
			_n = 0;
			_u = 0;
			pu = 1;
			mu = 'sampled';
			gu = 'fixed';
			wn = [1, 1, 1, 1];
			bn = [0, 0, 0, 1];
			vu = [0, 0, 0, 1];
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
			constructor(t = Vi.Gc) {
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
				this.ku('charRotation', Z(t), i);
			}
			setBrightnessRange(t, i, e) {
				const s = t / 255,
					r = i / 255;
				e ? ((this.Cu = s), (this.xu = r)) : ((this._u = s), (this.pu = r));
			}
			setCharColorMode(t, i) {
				i ? (this.Su = t) : (this.mu = t);
			}
			setCellColorMode(t, i) {
				i ? (this.Eu = t) : (this.gu = t);
			}
			setColor(t, i, e, s, r, n) {
				const h = this.Ru(t, i),
					o = this.qc(e, s, r, n);
				jt(h, o.r, o.g, o.b, o.a);
			}
			setCharacters(t, i, e) {
				if (i) {
					const i = this.getCharacterPalette(t);
					return ((this.Lu = i.length > 0 ? i : null), void (i.length > 0 && e.markFrameDirty()));
				}
				((this.yn = t), this.Du(t, e));
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
				return this.du ? this.du.Qt(t).filter((t) => Array.isArray(t)) : [];
			}
			createBaseUniforms(t, i, e) {
				const s = i?.invert ?? this.wu ?? this.dn,
					r = i?.flipX ?? this.bu ?? this.mn,
					n = i?.flipY ?? this.Mu ?? this.gn,
					h = i?.charRotation ?? this.Au ?? this._n,
					o = i?.brightnessStart ?? this.Cu ?? this._u,
					a = i?.brightnessEnd ?? this.xu ?? this.pu,
					c = i?.charColorMode ?? this.Su ?? this.mu,
					u = i?.cellColorMode ?? this.Eu ?? this.gu,
					l = i?.charColor ?? this.Fu ?? this.wn,
					f = i?.cellColor ?? this.Tu ?? this.bn,
					d = this.Pu ?? this.vu,
					_ = void 0 !== i?.glyphColors,
					p = !_ && null !== this.Lu,
					m = _ ? i.glyphColors : (this.Lu ?? this.yu),
					g = _ ? e.getStep(i, m) : p ? e.getFrame(m) : e.getBase(m);
				return {
					u_image: t,
					u_invert: !!s,
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
					u_charPaletteTexture: g.texture,
					u_charPaletteDimensions: [g.columns, g.rows],
				};
			}
			createGeometryTextureSnapshot(t, i) {
				const e = this.wu ?? this.dn,
					s = this.bu ?? this.mn,
					r = this.Mu ?? this.gn,
					n = this.Au ?? this._n,
					h = this.Cu ?? this._u,
					o = this.xu ?? this.pu,
					a = this.Su ?? this.mu,
					c = this.Eu ?? this.gu,
					u = this.Fu ?? this.wn,
					l = this.Tu ?? this.bn,
					f = this.Lu ?? this.yu;
				return {
					kind: 'source',
					source: t,
					palette: this.Lu ? i.getFrame(f) : i.getBase(f),
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
					invert: this.dn,
					flipX: this.mn,
					flipY: this.gn,
					charRotation: this._n,
					brightnessStart: this._u,
					brightnessEnd: this.pu,
					charColorMode: this.mu,
					cellColorMode: this.gu,
					charColor: this.wn,
					cellColor: this.bn,
					backgroundColor: this.vu,
					glyphColors: this.yu,
				};
			}
			ku(t, i, e) {
				'invert' === t
					? e
						? (this.wu = i)
						: (this.dn = i)
					: 'flipX' === t
						? e
							? (this.bu = i)
							: (this.mn = i)
						: 'flipY' === t
							? e
								? (this.Mu = i)
								: (this.gn = i)
							: e
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
							: this.vu;
			}
			Du(t, i) {
				const e = this.getCharacterPalette(t);
				e.length > 0 && ((this.yu = e), i.markBaseDirty());
			}
		},
		Ki = class {
			Wt;
			Ls = null;
			Ou = null;
			Bu = null;
			Iu;
			constructor(t) {
				this.Wt = t;
			}
			invalidateMaterials() {
				((this.Ls = null), this.Wt.stackState.invalidateMaterials());
			}
			clearStrategyCache() {
				this.Ou = null;
			}
			getMaterial() {
				return this.hasFrameOverrides() ? this.Nu() : (this.Ls || (this.Ls = this.Nu()), this.Ls);
			}
			getMaterials() {
				const t = this.Wt.stackState.getActiveStack();
				if (!t) return [this.getMaterial()];
				this.Wt.beforeMaterialUpdate();
				const i = !this.Wt.conversionState.hasFrameUniformOverrides();
				return t.map((e, s) => this.ju(e, s, t.length, i));
			}
			hasFrameOverrides() {
				return this.Wt.conversionState.hasFrameUniformOverrides() || this.Wt.stackState.hasFrameOverrides();
			}
			createBaseUniforms() {
				return this.Wt.conversionState.createBaseUniforms(this.Wt.getTexture(), this.Bu, this.Wt.paletteCache);
			}
			get material() {
				return this.Ls;
			}
			Nu(t = this.Wt.stackState.getSingleMode(), i = null, e) {
				i || this.Wt.beforeMaterialUpdate();
				const s = this.Bu,
					r = this.Iu;
				((this.Bu = i), (this.Iu = e));
				try {
					const s = i ? this.Qu(t) : this.zu(),
						r = this.Hu(e),
						n = this.Wt.conversionManager.Gu(t, r),
						h = s.createUniforms(r);
					return this.Wt.renderer.materialManager.Ys(n, h);
				} finally {
					((this.Bu = s), (this.Iu = r));
				}
			}
			ju(t, i, e, s) {
				if (s && t.material) return t.material;
				const r = { index: i, count: e, mode: t.mode, options: t.options },
					n = this.Nu(t.mode, t, r);
				return (s && (t.material = n), n);
			}
			Qu(t) {
				const i = this.Wt.conversionManager.Vu(t);
				if (!i)
					throw new Error(
						`[textmode.js] Conversion mode "${t}" is not registered. If this mode is provided by an add-on, make sure its plugin is installed before loading sources.`
					);
				return i;
			}
			zu() {
				const t = this.Wt.stackState.getSingleMode();
				if (this.Ou && this.Ou.id === t) return this.Ou;
				const i = this.Qu(t);
				return ((this.Ou = i), i);
			}
			Hu(t) {
				const i = this.Wt.conversionState.activeGlyphAtlas;
				if (!i)
					throw new Error(
						'[textmode.js] Cannot create conversion context: no active glyph atlas set. Ensure _setActiveFont() is called before rendering.'
					);
				const e = t ?? this.Iu,
					s = {
						renderer: this.Wt.renderer,
						gl: this.Wt.gl,
						font: i,
						glyphAtlas: i,
						source: this.Wt.source,
						createBaseUniforms: () => this.createBaseUniforms(),
					};
				return (e && (s.pass = e), s);
			}
		},
		Wi = class extends r {
			Es;
			G;
			Gn;
			Xu;
			$u;
			o;
			u;
			Zc;
			Wc;
			Yu;
			Ku;
			constructor(t, i, e, s, r, n, h, o, a = Vi.Gc) {
				(super(),
					(this.Es = t),
					(this.G = i),
					(this.Gn = e),
					(this.Xu = r),
					(this.$u = n),
					this.Wu(h, o),
					(this.Zc = new $i(i.glyphPaletteService)),
					(this.Wc = new Yi(a)),
					(this.Yu = new Xi(this.Wc, this.Zc, (t) => a(t).normalized)),
					(this.Ku = new Ki({
						gl: t,
						renderer: i,
						conversionManager: s,
						source: this,
						stackState: this.Yu,
						conversionState: this.Wc,
						paletteCache: this.Zc,
						getTexture: () => this.Gn,
						beforeMaterialUpdate: () => this.Zu(),
					})));
			}
			conversionMode(t) {
				const i = this.Oa();
				return (
					this.Yu.setConversionMode(t, i),
					i || (this.Ku.clearStrategyCache(), this.Ku.invalidateMaterials()),
					this
				);
			}
			conversions(t) {
				const i = this.Oa(),
					e = this.Yu.setConversions(t, i);
				return (!i && e && this.Ku.invalidateMaterials(), this);
			}
			clearConversions() {
				const t = this.Oa();
				return (this.Yu.clearConversions(t), t || this.Ku.invalidateMaterials(), this);
			}
			dispose() {
				(this.Gn && (this.Es.deleteTexture(this.Gn), (this.Gn = null)),
					this.Yu.dispose(),
					this.Zc.disposeAll(),
					super.dispose());
			}
			invert(t = !0) {
				return (this.Wc.setInvert(t, this.Oa()), this.qu(), this);
			}
			flipX(t = !0) {
				return (this.Wc.setFlipX(t, this.Oa()), this.qu(), this);
			}
			flipY(t = !0) {
				return (this.Wc.setFlipY(t, this.Oa()), this.qu(), this);
			}
			charRotation(t) {
				return (this.Wc.setCharRotation(t, this.Oa()), this.qu(), this);
			}
			brightnessRange(t, i) {
				return (this.Ju(t, i), this.Wc.setBrightnessRange(t, i, this.Oa()), this.qu(), this);
			}
			charColorMode(t) {
				return (this.Wc.setCharColorMode(t, this.Oa()), this.qu(), this);
			}
			cellColorMode(t) {
				return (this.Wc.setCellColorMode(t, this.Oa()), this.qu(), this);
			}
			charColor(t, i, e, s) {
				return (this.tl('char', t, i, e, s), this);
			}
			cellColor(t, i, e, s) {
				return (this.tl('cell', t, i, e, s), this);
			}
			background(t, i, e, s) {
				return (this.tl('background', t, i, e, s), this);
			}
			characters(t) {
				return (this.Wc.setCharacters(t, this.Oa(), this.Zc), this.qu(), this);
			}
			Za(t) {
				this.Wc.setActiveGlyphAtlas(t, this.Zc) && (this.Yu.refreshPalettes(), this.Ku.invalidateMaterials());
			}
			get texture() {
				return this.Gn;
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
			cs(t, i) {
				(this.Wu(t, i), this.Ku.invalidateMaterials());
			}
			Vs() {
				return this.Ku.getMaterial();
			}
			qa() {
				return this.Ku.getMaterials();
			}
			il(t) {
				if ((this.Za(t), this.Yu.getActiveStack()))
					throw new n(
						'[textmode.js] texture() does not support conversion stacks. Call clearConversions() or draw the stacked source with image().',
						{ method: 'texture' }
					);
				const i = this.Yu.getSingleMode();
				if ('brightness' !== i)
					throw new n(
						'[textmode.js] texture() supports the built-in brightness conversion mode only. Use image() for custom conversion modes.',
						{ method: 'texture', conversionMode: i }
					);
				return this.Wc.createGeometryTextureSnapshot(this, this.Zc);
			}
			la() {}
			Qa() {
				(this.Wc.clearFrameOverrides(this.Zc), this.Yu.clearFrameOverrides());
			}
			Ja() {
				return this.Ku.hasFrameOverrides();
			}
			Zu() {}
			el() {
				this.Ku.invalidateMaterials();
			}
			sl() {
				return {
					sourceState: this.Wc.debugSnapshot,
					stackState: this.Yu.debugSnapshot,
					material: this.Ku.material,
					basePalette: this.Zc.basePalette,
					framePalette: this.Zc.framePalette,
				};
			}
			Wu(t, i) {
				const { width: e, height: s } = (function (t, i, e, s) {
					const r = Math.min(e / t, s / i);
					return {
						width: Math.max(1, Math.min(e, Math.round(t * r))),
						height: Math.max(1, Math.min(s, Math.round(i * r))),
						scale: r,
					};
				})(this.Xu, this.$u, t, i);
				((this.o = e), (this.u = s));
			}
			tl(t, i, e, s, r) {
				(this.Wc.setColor(t, this.Oa(), i, e, s, r), this.qu());
			}
			qu() {
				this.Oa() || this.Ku.invalidateMaterials();
			}
			Oa() {
				return this.G.za();
			}
			Ju(t, i) {
				const e = { method: 'brightnessRange', start: t, end: i };
				if (!Number.isFinite(t) || !Number.isFinite(i))
					throw new n('[textmode.js] brightness range values must be finite numbers.', e);
				if (t < 0 || t > 255 || i < 0 || i > 255)
					throw new n('[textmode.js] brightness range values must be between 0 and 255.', e);
				if (t > i) throw new n('[textmode.js] brightness range start must be less than or equal to end.', e);
			}
		},
		Zi = class t extends Wi {
			constructor(t, i, e, s, r, n, h, o, a) {
				super(t, i, e, s, r, n, h, o, a);
			}
			static rl(i, e, s, r, n, h) {
				const o = i.context,
					{ texture: a, width: c, height: u } = pt(o, s);
				return new t(o, i, a, e, c, u, r, n, h);
			}
		},
		qi = class {
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
				const e = (t) => {
					if (!this.bl()) return void (this.ol = null);
					const i = 'number' == typeof t ? t : performance.now(),
						s = i - this.al;
					(s >= this.nl && (this.cl?.(), (this.al = i - (s % this.nl))),
						this.bl() ? (this.ol = requestAnimationFrame(e)) : (this.ol = null));
				};
				this.ol = requestAnimationFrame(e);
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
					const e = this._l.reduce((t, i) => t + i, 0) / this._l.length;
					this.fl = 1e3 / e;
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
	function Ji(t, i, e) {
		return t ? t.P(i, e) : { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY };
	}
	var te = class {
			Ll = [];
			Dl(t, i, e, s) {
				const r = e;
				(void 0 === s ? t.addEventListener(i, r) : t.addEventListener(i, r, s),
					this.Ll.push({ target: t, type: i, listener: r, capture: 'boolean' == typeof s ? s : s?.capture }));
			}
			kl() {
				for (let t = this.Ll.length - 1; t >= 0; t -= 1) {
					const { target: i, type: e, listener: s, capture: r } = this.Ll[t];
					void 0 === r ? i.removeEventListener(e, s) : i.removeEventListener(e, s, r);
				}
				this.Ll = [];
			}
		},
		ie = ['keyPressed', 'keyTyped', 'keyReleased'],
		ee = [
			'mouseClicked',
			'doubleClicked',
			'mousePressed',
			'mouseReleased',
			'mouseMoved',
			'mouseDragged',
			'mouseScrolled',
		],
		se = ['touchStarted', 'touchMoved', 'touchEnded', 'touchCancelled'],
		re = ['tap', 'doubleTap', 'longPress', 'swipe', 'pinch', 'rotateGesture'],
		ne = [
			'gamepadConnected',
			'gamepadDisconnected',
			'gamepadButtonPressed',
			'gamepadButtonReleased',
			'gamepadAxisChanged',
		],
		he = [...ie, ...ee, ...se, ...re, ...ne],
		oe = class {
			Ll = {};
			Rl(t, i) {
				const e = (this.Ll[t] ??= []),
					s = { fn: i, once: !1 };
				return (e.push(s), () => this.Ol(t, i));
			}
			Ol(t, i) {
				const e = this.Ll[t];
				if (!e) return;
				const s = e.findIndex((t) => t.fn === i);
				-1 !== s && e.splice(s, 1);
			}
			Bl(t, i) {
				const e = (this.Ll[t] ??= []),
					s = { fn: i, once: !0 };
				return (e.push(s), () => this.Ol(t, i));
			}
			Il(t, ...i) {
				const e = this.Ll[t];
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
			Nl(t) {
				const i = this.Ll[t];
				return !!i && i.length > 0;
			}
			kl(t) {
				void 0 !== t ? delete this.Ll[t] : (this.Ll = {});
			}
		},
		ae = class {
			p;
			jl;
			Ql = { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY };
			zl = { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY };
			Hl = { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY };
			Gl = { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY };
			Vl = { x: 0, y: 0 };
			Xl = { x: 0, y: 0 };
			$l = !1;
			Yl = null;
			Kl = 0;
			Ll = new te();
			Wl = !1;
			Zl;
			constructor(t, i, e) {
				((this.p = t), (this.jl = i), (this.Zl = e));
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
			ef() {
				this.sf() && 'function' == typeof document.exitPointerLock && document.exitPointerLock();
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
							((this.zl = { ...this.Ql }),
								(this.Ql.x = Number.NEGATIVE_INFINITY),
								(this.Ql.y = Number.NEGATIVE_INFINITY),
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
					this.ef(),
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
						((this.Ql.x = Number.NEGATIVE_INFINITY), (this.Ql.y = Number.NEGATIVE_INFINITY));
					}
			}
			pf() {
				return { x: this.Ql.x, y: this.Ql.y };
			}
			mf() {
				return { x: this.Hl.x, y: this.Hl.y };
			}
			gf() {
				return this.Vl.x;
			}
			vf() {
				return this.Vl.y;
			}
			yf() {
				return this.$l;
			}
			wf() {
				((this.Hl = { ...this.Gl }),
					(this.Gl = { ...this.Ql }),
					(this.Vl = { ...this.Xl }),
					(this.Xl = { x: 0, y: 0 }));
			}
			bf(t, i = {}) {
				return { position: { ...this.Ql }, previousPosition: { ...this.zl }, originalEvent: t, ...i };
			}
			hf(t) {
				this.Jl() ||
					(this.Mf(t)
						? this.Zl.Il('mouseDragged', this.bf(t, { button: this.Af(t) }))
						: this.Zl.Il('mouseMoved', this.bf(t)));
			}
			af(t) {
				this.Jl() || ((this.$l = !0), this.Zl.Il('mousePressed', this.bf(t, { button: t.button })));
			}
			cf(t) {
				this.Jl() || ((this.$l = !1), this.Zl.Il('mouseReleased', this.bf(t, { button: t.button })));
			}
			uf(t) {
				this.Jl() || this.Zl.Il('mouseClicked', this.bf(t, { button: t.button }));
			}
			lf(t) {
				this.Jl() || this.Zl.Il('doubleClicked', this.bf(t, { button: t.button }));
			}
			ff(t) {
				this.Jl() || this.Zl.Il('mouseScrolled', this.bf(t, { delta: { x: t.deltaX, y: t.deltaY } }));
			}
			nf(t) {
				const i = this.jl();
				if (
					((this.zl = { ...this.Ql }),
					t instanceof MouseEvent && 'mousemove' === t.type && this.Cf(t),
					t instanceof MouseEvent && 'mousemove' === t.type && this.sf())
				)
					return;
				this.Yl = { x: t.clientX, y: t.clientY };
				const e = Ji(i, t.clientX, t.clientY);
				((this.Ql.x = e.x), (this.Ql.y = e.y));
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
				if (this.sf()) return ((this.Xl.x += t.movementX), void (this.Xl.y += t.movementY));
				this.Yl && ((this.Xl.x += t.clientX - this.Yl.x), (this.Xl.y += t.clientY - this.Yl.y));
			}
			sf() {
				return document.pointerLockElement === this.p.canvas;
			}
		},
		ce = class {
			xf = new Map();
			Sf = null;
			Ef = null;
			Ll = new te();
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
			Of() {
				const t = [];
				for (const [i, e] of this.xf) e.isPressed && t.push(i);
				return t;
			}
			Bf() {
				return {
					ctrl: this.Lf('Control'),
					shift: this.Lf('Shift'),
					alt: this.Lf('Alt'),
					meta: this.Lf('Meta'),
				};
			}
			If() {
				(this.xf.clear(), (this.Sf = null), (this.Ef = null));
			}
			Tf(t) {
				const i = t.key,
					e = Date.now();
				this.xf.has(i) || this.xf.set(i, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
				const s = this.xf.get(i);
				s.isPressed ||
					((s.isPressed = !0),
					(s.lastPressTime = e),
					(this.Sf = i),
					this.Zl.Il('keyPressed', this.bf(i, !0, t)),
					this.Nf(t) && this.Zl.Il('keyTyped', this.bf(i, !0, t)));
			}
			bf(t, i, e) {
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
			Pf(t) {
				const i = t.key,
					e = Date.now();
				this.xf.has(i) || this.xf.set(i, { isPressed: !1, lastPressTime: 0, lastReleaseTime: 0 });
				const s = this.xf.get(i);
				((s.isPressed = !1),
					(s.lastReleaseTime = e),
					(this.Ef = i),
					this.Zl.Il('keyReleased', this.bf(i, !1, t)));
			}
			Df(t) {
				return this.Ff[t] || t.toLowerCase();
			}
			Nf(t) {
				return !(t.ctrlKey || t.altKey || t.metaKey) && 'Dead' !== t.key && 1 === Array.from(t.key).length;
			}
		},
		ue = class {
			jf;
			Qf;
			zf = new Map();
			Hf = null;
			Gf = 320;
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
				((this.jf = t), (this.Qf = i));
			}
			bh() {
				(this.zf.forEach((t) => {
					null !== t.timer && window.clearTimeout(t.timer);
				}),
					this.zf.clear(),
					(this.Hf = null),
					(this.Jf = 0),
					(this.td = null));
			}
			ed(t, i) {
				const e = { timer: null, fired: !1 };
				((e.timer = window.setTimeout(() => {
					this.zf.has(t.id) &&
						((e.fired = !0),
						this.Qf.Il('longPress', {
							touch: this.sd(t.lastPosition),
							duration: performance.now() - t.startTime,
							originalEvent: i,
						}));
				}, this.$f)),
					this.zf.set(t.id, e));
			}
			rd(t, i) {
				const e = this.zf.get(t.id);
				e &&
					i &&
					z(i.clientX, i.clientY, t.lastPosition.clientX, t.lastPosition.clientY) > this.Yf &&
					null !== e.timer &&
					(window.clearTimeout(e.timer), (e.timer = null));
			}
			nd(t, i) {
				const e = this.zf.get(t.id);
				(e && null !== e.timer && (window.clearTimeout(e.timer), (e.timer = null)),
					this.hd(t, i, e?.fired ?? !1),
					this.zf.delete(t.id));
			}
			od(t) {
				const i = this.zf.get(t);
				(i && null !== i.timer && window.clearTimeout(i.timer), this.zf.delete(t));
			}
			ad(t) {
				if (2 !== t.size) return void (this.Hf = null);
				const [i, e] = Array.from(t.values()),
					s = [i.id, e.id];
				if (this.Hf && this.Hf.ids[0] === s[0] && this.Hf.ids[1] === s[1]) return;
				const r = z(i.x, i.y, e.x, e.y),
					n = Q(i.clientX, i.clientY, e.clientX, e.clientY);
				this.Hf = {
					ids: s,
					initialDistance: Math.max(r, 1e-4),
					initialAngle: n,
					lastScale: 1,
					lastRotation: 0,
				};
			}
			ud(t, i) {
				if ((this.ad(t), !this.Hf)) return;
				const [e, s] = this.Hf.ids,
					r = t.get(e),
					n = t.get(s);
				if (!r || !n) return;
				const h = z(r.x, r.y, n.x, n.y) / this.Hf.initialDistance,
					o = h - this.Hf.lastScale;
				Math.abs(o) > this.Zf &&
					(this.Qf.Il('pinch', {
						touches: [this.sd(r), this.sd(n)],
						scale: h,
						deltaScale: o,
						center: this.ld(r, n),
						originalEvent: i,
					}),
					(this.Hf.lastScale = h));
				let a = Q(r.clientX, r.clientY, n.clientX, n.clientY) - this.Hf.initialAngle;
				a = ((a + 180) % 360) - 180;
				const c = a - this.Hf.lastRotation;
				Math.abs(c) > this.qf &&
					(this.Qf.Il('rotateGesture', {
						touches: [this.sd(r), this.sd(n)],
						rotation: a,
						deltaRotation: c,
						center: this.ld(r, n),
						originalEvent: i,
					}),
					(this.Hf.lastRotation = a));
			}
			ld(t, i) {
				const e = (t.clientX + i.clientX) / 2,
					s = (t.clientY + i.clientY) / 2,
					r = this.jf(e, s);
				return { x: r.x, y: r.y };
			}
			hd(t, i, e) {
				const s = performance.now(),
					r = s - t.startTime,
					n = t.lastPosition.clientX - t.startPosition.clientX,
					h = t.lastPosition.clientY - t.startPosition.clientY,
					o = Math.hypot(n, h);
				if (!e && r <= this.Gf && o <= this.Xf)
					this.fd(t.lastPosition, s)
						? this.Qf.Il('doubleTap', { touch: this.sd(t.lastPosition), taps: 2, originalEvent: i })
						: this.Qf.Il('tap', { touch: this.sd(t.lastPosition), taps: 1, originalEvent: i });
				else if (!e && r <= this.Wf && o >= this.Kf) {
					const e = Math.max(o, 1e-4),
						s = { x: n / e, y: h / e },
						a = { x: n / r, y: h / r };
					this.Qf.Il('swipe', {
						touch: this.sd(t.lastPosition),
						direction: s,
						distance: e,
						velocity: a,
						originalEvent: i,
					});
				}
				((this.Jf = s), (this.td = this.sd(t.lastPosition)));
			}
			fd(t, i) {
				return (
					!!this.td &&
					!(i - this.Jf > this.Vf) &&
					z(t.clientX, t.clientY, this.td.clientX, this.td.clientY) <= this.Xf
				);
			}
			sd(t) {
				return { ...t };
			}
		},
		le = class {
			p;
			dd;
			jl;
			_d;
			pd = new Map();
			md = new Map();
			gd = new Map();
			vd;
			yd;
			Ll = new te();
			Wl = !1;
			Zl;
			wd = 600;
			constructor(t, i, e, s) {
				((this.p = t),
					(this.jl = i),
					(this.Zl = e),
					(this.dd = s),
					(this._d = new ue((t, i) => Ji(this.jl(), t, i), this.Zl)));
				const r = this.p.canvas;
				((this.vd = r.style.touchAction),
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
					this.gd.clear(),
					this._d.bh(),
					(t.style.touchAction = this.vd),
					(t.style.userSelect = this.yd));
			}
			_f() {
				if (!this.jl() || 0 === this.pd.size) return;
				const t = new Map();
				for (const i of this.pd.values()) {
					const e = this.jf(i.clientX, i.clientY, i.id, i);
					t.set(i.id, e);
					const s = this.gd.get(i.id);
					s && (s.lastPosition = e);
				}
				this.pd = t;
			}
			xd() {
				return Array.from(this.pd.values()).map((t) => ({ ...t }));
			}
			bd(t) {
				if (!this.jl()) return;
				(t.preventDefault(), this.dd?.ql(this.wd));
				const i = performance.now(),
					e = this.Sd(t.changedTouches);
				for (const s of e) {
					const e = this.pd.get(s.id);
					(e && this.md.set(s.id, this.sd(e)), this.pd.set(s.id, s));
					const r = { id: s.id, startPosition: s, lastPosition: s, startTime: i, lastTime: i };
					(this.gd.set(s.id, r), this._d.ed(r, t), this.Zl.Il('touchStarted', this.Ed(s, t, void 0, i)));
				}
				this._d.ad(this.pd);
			}
			Md(t) {
				if (!this.jl()) return;
				(t.preventDefault(), this.dd?.ql(this.wd));
				const i = performance.now(),
					e = this.Sd(t.changedTouches);
				for (const s of e) {
					const e = this.pd.get(s.id),
						r = e ? this.sd(e) : void 0;
					(r && this.md.set(s.id, r), this.pd.set(s.id, s));
					const n = this.gd.get(s.id);
					(n && ((n.lastPosition = s), (n.lastTime = i), this._d.rd(n, r)),
						this.Zl.Il('touchMoved', this.Ed(s, t, r, i)));
				}
				this._d.ud(this.pd, t);
			}
			Ad(t) {
				if (!this.jl()) return;
				t.preventDefault();
				const i = performance.now(),
					e = this.Sd(t.changedTouches);
				for (const s of e) {
					const e = this.pd.get(s.id),
						r = e ? this.sd(e) : void 0,
						n = this.gd.get(s.id);
					(this.Zl.Il('touchEnded', this.Ed(s, t, r, i)),
						n && this._d.nd(n, t),
						this.gd.delete(s.id),
						this.md.delete(s.id),
						this.pd.delete(s.id));
				}
				this._d.ad(this.pd);
			}
			Cd(t) {
				if (!this.jl()) return;
				t.preventDefault();
				const i = performance.now(),
					e = this.Sd(t.changedTouches);
				for (const s of e) {
					const e = this.pd.get(s.id),
						r = e ? this.sd(e) : void 0;
					(this.Zl.Il('touchCancelled', this.Ed(s, t, r, i)),
						this._d.od(s.id),
						this.gd.delete(s.id),
						this.md.delete(s.id),
						this.pd.delete(s.id));
				}
				this._d.ad(this.pd);
			}
			Sd(t) {
				const i = [];
				for (let e = 0; e < t.length; e += 1) {
					const s = t.item(e);
					s && i.push(this.Fd(s));
				}
				return i;
			}
			Fd(t) {
				return this.jf(t.clientX, t.clientY, t.identifier, {
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
			jf(t, i, e, s) {
				const r = Ji(this.jl(), t, i);
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
			Ed(t, i, e, s) {
				const r = this.gd.get(t.id),
					n = Array.from(this.md.values()).map((t) => this.sd(t)),
					h = Array.from(this.pd.values()).map((t) => this.sd(t)),
					o = this.Sd(i.changedTouches);
				return {
					touch: this.sd(t),
					previousTouch: e ? this.sd(e) : void 0,
					touches: h,
					previousTouches: n,
					changedTouches: o,
					deltaTime: r ? s - r.lastTime : 0,
					originalEvent: i,
				};
			}
			sd(t) {
				return { ...t };
			}
		},
		fe = {
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
		de = { leftStickX: 0, leftStickY: 1, rightStickX: 2, rightStickY: 3 },
		_e = new Map(Object.entries(fe).map(([t, i]) => [i, t])),
		pe = new Map(Object.entries(de).map(([t, i]) => [i, t]));
	function me(t, i) {
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
					const s = t[fe.home];
					return {
						faceButtons: {
							south: ge(t, fe.south),
							east: ge(t, fe.east),
							west: ge(t, fe.west),
							north: ge(t, fe.north),
						},
						shoulders: { l1: ge(t, fe.l1), r1: ge(t, fe.r1), l2: ge(t, fe.l2), r2: ge(t, fe.r2) },
						center: {
							select: ge(t, fe.select),
							start: ge(t, fe.start),
							leftStickPress: ge(t, fe.leftStickPress),
							rightStickPress: ge(t, fe.rightStickPress),
							...(s ? { home: ge(t, fe.home) } : {}),
						},
						dpad: {
							up: ge(t, fe.dpadUp),
							down: ge(t, fe.dpadDown),
							left: ge(t, fe.dpadLeft),
							right: ge(t, fe.dpadRight),
						},
						leftStick: ve(i, de.leftStickX, de.leftStickY, e),
						rightStick: ve(i, de.rightStickX, de.rightStickY, e),
					};
				})(e, s, i)),
			n
		);
	}
	function ge(t, i) {
		return t[i] ?? { pressed: !1, value: 0 };
	}
	function ve(t, i, e, s) {
		const r = t[i] ?? 0,
			n = t[e] ?? 0,
			h = Math.hypot(r, n);
		return h <= s ? { x: 0, y: 0, magnitude: 0 } : { x: r, y: n, magnitude: h };
	}
	var ye = { axisDeadzone: 0.15, axisChangeEpsilon: 0.01, buttonPressThreshold: 0.5, buttonReleaseThreshold: 0.45 },
		we = class {
			Td;
			Pd = [];
			Ld = new Map();
			Dd = new Map();
			Ll = new te();
			Wl = !1;
			kd = new Set();
			Rd = new Set();
			Zl;
			constructor(t, i = {}) {
				((this.Td = { ...ye, ...i }), (this.Zl = t));
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
				const t = new Map();
				for (const i of this.Od()) {
					if (!i || !i.connected) continue;
					const e = me(i, this.Td.axisDeadzone);
					t.set(e.index, e);
				}
				for (const [i, e] of this.Ld)
					t.has(i) || this.Zl.Il('gamepadDisconnected', { gamepad: { ...e, connected: !1 } });
				for (const [i, e] of t) this.Ld.has(i) || this.Zl.Il('gamepadConnected', { gamepad: e });
				for (const [i, e] of t) {
					const t = this.Ld.get(i);
					t && (this.Bd(e, t), this.Id(e, t));
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
			jd(t) {
				return this.Ld.get(t);
			}
			Qd(t, i) {
				if ('standard' === i)
					return (function (t, i) {
						if ('standard' === i) return _e.get(t);
					})(t, i);
			}
			zd(t, i) {
				if ('standard' === i)
					return (function (t, i) {
						if ('standard' === i) return pe.get(t);
					})(t, i);
			}
			Bd(t, i) {
				const e = Math.max(t.buttons.length, i.buttons.length);
				for (let s = 0; s < e; s++) {
					const e = t.buttons[s] ?? { pressed: !1, value: 0 },
						r = i.buttons[s] ?? { pressed: !1, value: 0 },
						n = r.value >= this.Td.buttonPressThreshold;
					e.value >= this.Td.buttonPressThreshold &&
						!n &&
						this.Zl.Il('gamepadButtonPressed', {
							gamepad: t,
							buttonIndex: s,
							button: e,
							previousButton: r,
							standardButtonName: this.Qd(s, t.mapping),
						});
					const h = r.value >= this.Td.buttonReleaseThreshold;
					e.value >= this.Td.buttonReleaseThreshold ||
						!h ||
						this.Zl.Il('gamepadButtonReleased', {
							gamepad: t,
							buttonIndex: s,
							button: e,
							previousButton: r,
							standardButtonName: this.Qd(s, t.mapping),
						});
				}
			}
			Id(t, i) {
				const e = Math.max(t.axes.length, i.axes.length);
				for (let s = 0; s < e; s++) {
					const e = t.axes[s] ?? 0,
						r = i.axes[s] ?? 0,
						n = e - r;
					(Math.abs(r) <= this.Td.axisDeadzone != Math.abs(e) <= this.Td.axisDeadzone ||
						Math.abs(n) >= this.Td.axisChangeEpsilon) &&
						this.Zl.Il('gamepadAxisChanged', {
							gamepad: t,
							axisIndex: s,
							value: e,
							previousValue: r,
							delta: n,
							standardAxisName: this.zd(s, t.mapping),
						});
				}
			}
			Od() {
				const t = navigator;
				if ('function' != typeof t.getGamepads) return [];
				const i = t.getGamepads.call(navigator);
				return Array.from(i ?? []);
			}
		},
		be = class {
			Hd;
			Gd = new Map();
			Vd = new Map();
			Xd = new Map();
			$d = new Map();
			Yd = new Map();
			Kd = new Map();
			Wd = new Map();
			constructor(t) {
				this.Hd = t;
			}
			Zd(t, i) {
				return this.qd(this.Gd, t, i);
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
			e_(t, i) {
				return this.qd(this.Yd, t, i);
			}
			s_(t, i) {
				return this.qd(this.Kd, t, i);
			}
			r_(t, i) {
				return this.qd(this.Wd, t, i);
			}
			n_() {
				this.h_(this.Gd, (t) => t());
			}
			o_() {
				this.h_(this.Vd, (t) => t());
			}
			a_(t) {
				this.h_(this.Xd, (i) => i(t));
			}
			$e(t) {
				this.h_(this.$d, (i) => i(t));
			}
			Je(t) {
				this.h_(this.Yd, (i) => i(t));
			}
			async c_() {
				await this.u_(this.Kd, (t) => t());
			}
			async l_() {
				await this.u_(this.Wd, (t) => t());
			}
			f_(t) {
				(this.Gd.delete(t),
					this.Vd.delete(t),
					this.Xd.delete(t),
					this.$d.delete(t),
					this.Yd.delete(t),
					this.Kd.delete(t),
					this.Wd.delete(t));
			}
			qd(t, i, e) {
				const s = t.get(i) ?? new Set();
				return (
					s.add(e),
					t.set(i, s),
					() => {
						const s = t.get(i);
						s && (s.delete(e), 0 === s.size && t.delete(i));
					}
				);
			}
			h_(t, i) {
				for (const e of this.Hd) {
					const s = t.get(e);
					s && s.forEach(i);
				}
			}
			async u_(t, i) {
				for (const e of this.Hd) {
					const s = t.get(e);
					if (s) for (const t of s) await i(t);
				}
			}
		},
		Me = class {
			d_;
			__;
			p_ = new Map();
			constructor(t) {
				((this.d_ = t.targetName), (this.__ = t.getPrototype));
			}
			m_(t, i, e) {
				let s = this.p_.get(t);
				s || ((s = new Map()), this.p_.set(t, s));
				for (const [r, h] of this.p_)
					if (r !== t && h.has(i))
						throw new n(
							`Plugin "${t}" attempted to register ${this.d_} method "${i}" which is already provided by plugin "${r}".`,
							{ plugin: t, method: i, conflictingPlugin: r }
						);
				(s.set(i, e), this.g_(i, e));
			}
			v_(t, i) {
				const e = this.p_.get(t);
				if (!e) return;
				e.delete(i);
				let s = !1;
				for (const [r, n] of this.p_)
					if (r !== t && n.has(i)) {
						s = !0;
						const t = n.get(i);
						this.g_(i, t);
						break;
					}
				(s || this.y_(i), 0 === e.size && this.p_.delete(t));
			}
			w_(t) {
				const i = this.p_.get(t);
				if (i) {
					for (const t of i.keys()) this.y_(t);
					this.p_.delete(t);
				}
			}
			g_(t, i) {
				const e = this.__();
				Object.defineProperty(e, t, { value: i, writable: !0, configurable: !0, enumerable: !1 });
			}
			y_(t) {
				const i = this.__(),
					e = Object.getOwnPropertyDescriptor(i, t);
				e && e.configurable && delete i[t];
			}
		},
		Ae = class {
			us;
			b_;
			M_;
			A_;
			constructor(t, i, e, s) {
				((this.us = t), (this.b_ = i), (this.M_ = e), (this.A_ = s));
			}
			C_(t) {
				const i = this.us,
					e = this.b_,
					s = this.M_,
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
						return i.G;
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
					registerPreDrawHook: (i) => e.Zd(t, i),
					registerPostDrawHook: (i) => e.Jd(t, i),
					registerLayerDisposedHook: (i) => e.t_(t, i),
					registerLayerPreRenderHook: (i) => e.i_(t, i),
					registerLayerPostRenderHook: (i) => e.e_(t, i),
					registerPreSetupHook: (i) => e.s_(t, i),
					registerPostSetupHook: (i) => e.r_(t, i),
					extendLayer: (i, e) => {
						s.m_(t, i, e);
					},
					removeLayerExtension: (i) => {
						s.v_(t, i);
					},
					extendSource: (i, e) => {
						r.m_(t, i, e);
					},
					removeSourceExtension: (i) => {
						r.v_(t, i);
					},
				};
			}
		},
		Ce = class {
			x_ = new Map();
			Hd = [];
			S_(t) {
				return this.x_.has(t);
			}
			Vu(t) {
				return this.x_.get(t);
			}
			Dl(t) {
				(this.x_.set(t.name, t), this.Hd.push(t.name));
			}
			E_(t) {
				this.x_.delete(t);
				const i = this.Hd.indexOf(t);
				-1 !== i && this.Hd.splice(i, 1);
			}
			F_() {
				return [...this.Hd];
			}
			U_() {
				return this.Hd;
			}
		},
		xe = class {
			us;
			T_;
			b_;
			M_;
			A_;
			P_;
			constructor(t) {
				((this.us = t),
					(this.T_ = new Ce()),
					(this.b_ = new be(this.T_.U_())),
					(this.M_ = new Me({
						targetName: 'layer',
						getPrototype: () => Object.getPrototypeOf(this.us.layers.base),
					})),
					(this.A_ = new Me({ targetName: 'source', getPrototype: () => Wi.prototype })),
					(this.P_ = new Ae(this.us, this.b_, this.M_, this.A_)));
			}
			L_(t) {
				for (const e of t) {
					if (this.T_.S_(e.name)) {
						console.warn(`[textmode.js] Plugin "${e.name}" is already installed.`);
						continue;
					}
					const t = this.D_(e.name);
					try {
						const i = e.install(this.us, t);
						i instanceof Promise &&
							i.catch((t) => {
								(console.error(`[textmode.js] Async plugin "${e.name}" installation error:`, t),
									this.k_(e.name));
							});
					} catch (i) {
						throw (this.k_(e.name), i);
					}
					this.T_.Dl(e);
				}
			}
			async R_(t) {
				for (const e of t) {
					if (this.T_.S_(e.name)) {
						console.warn(`[textmode.js] Plugin "${e.name}" is already installed.`);
						continue;
					}
					const t = this.D_(e.name);
					try {
						await e.install(this.us, t);
					} catch (i) {
						throw (this.k_(e.name), i);
					}
					this.T_.Dl(e);
				}
			}
			async O_(t) {
				const i = this.T_.Vu(t);
				if (!i) return;
				const e = this.D_(t);
				(i.uninstall && (await i.uninstall(this.us, e)), this.T_.E_(t), this.k_(t));
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
			$e(t) {
				this.b_.$e(t);
			}
			Je(t) {
				this.b_.Je(t);
			}
			async c_() {
				await this.b_.c_();
			}
			async l_() {
				await this.b_.l_();
			}
			async B_() {
				const t = this.T_.F_();
				for (const i of t) await this.O_(i);
			}
			D_(t) {
				return this.P_.C_(t);
			}
			k_(t) {
				(this.b_.f_(t), this.M_.w_(t), this.A_.w_(t));
			}
		},
		Se =
			'#version 300 es\nlayout(location=0)in vec2 A8;layout(location=1)in vec2 Ab;out vec2 v_uv;void main(){v_uv=Ab;gl_Position=vec4(A8,0.,1.);}',
		Ee =
			'#version 300 es\nprecision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){fragColor=texture(u_texture,v_uv);}',
		Fe = ({ textmodifier: t }) => {
			const i = Math.floor(t.millis / 120) % 4;
			(t.background('#222323'),
				t.charColor('#F8F8F8'),
				t.cellColor('#222323'),
				ot(t, '|/-\\'[i], 0),
				t.charColor('#C0C0C0'),
				ot(t, 'LOADING...', 5));
		},
		Ue = { transition: 'fade', transitionDuration: 500 },
		Te = class extends ht {
			Wt;
			ps = 'active';
			I_ = 0;
			N_;
			constructor(t, i) {
				(super(t),
					(this.Wt = { ...Ue, ...(i ?? {}) }),
					'none' === this.Wt.transition && (this.Wt.transitionDuration = 0));
			}
			async kt() {
				this.Pt || (await super.kt(), this.ls.opacity(1), this.ls.show());
			}
			get bs() {
				return 'active' === this.ps || 'transitioning' === this.ps;
			}
			j_() {
				this.Wt.transitionDuration > 0
					? (this.Q_(), (this.I_ = performance.now()), this.Pt && (this.ls.opacity(1), this.ls.show()))
					: (this.Pt && (this.ls.opacity(0), this.ls.hide()), this.z_(), this.H_());
			}
			G_(t) {
				this.N_ = t;
			}
			Cs() {
				if ('transitioning' === this.ps && this.V_()) return (this.X_(), void this.H_());
				this.Ss();
			}
			fs() {
				return new nt(this.us.G, { visible: !0, opacity: 1, fontSize: 16 });
			}
			H_() {
				this.N_ && this.N_();
			}
			V_() {
				if (!this.Pt) return !0;
				const t = this.Wt.transitionDuration;
				if (t <= 0) return (this.ls.opacity(0), this.ls.hide(), !0);
				const i = performance.now() - this.I_,
					e = Math.min(1, i / t);
				return (this.ls.opacity(1 - e), e >= 1 && (this.ls.hide(), !0));
			}
			Ss() {
				if (!this.Pt) return;
				const t = { textmodifier: this.us, grid: this.ls.grid };
				this.ds(Fe, t);
			}
			z_() {
				'disabled' !== this.ps && (this.ps = 'done');
			}
			Q_() {
				'disabled' !== this.ps && (this.ps = 'transitioning');
			}
			X_() {
				'transitioning' === this.ps && (this.ps = 'done');
			}
		},
		Pe = e({ LoadingLayerController: () => Te }),
		Le = class {
			G;
			Y_;
			Fe;
			K_ = 0;
			constructor(t, i, e) {
				((this.G = t),
					(this.Y_ = t.rr(
						Se,
						'#version 300 es\nprecision highp float;uniform sampler2D Uh;uniform sampler2D U3;uniform vec2 U8;uniform vec2 Ug;uniform vec2 U2;uniform float Ui;uniform float Ul;uniform int U4;uniform bool Ub;uniform vec4 Uf;in vec2 v_uv;out vec4 fragColor;const int A=0;const int B=1;const int C=2;const int D=3;const int E=4;const int F=5;const int G=6;const int H=7;const int I=8;const int J=9;const int K=10;const int L=11;const int M=12;const int N=13;vec3 O(vec3 P,vec3 Q){return Q;}vec3 R(vec3 P,vec3 Q){return P+Q;}vec3 S(vec3 P,vec3 Q){return P*Q;}vec3 T(vec3 P,vec3 Q){return 1.-(1.-P)*(1.-Q);}vec3 U(vec3 P,vec3 Q){return max(P-Q,0.);}vec3 V(vec3 P,vec3 Q){return min(P,Q);}vec3 W(vec3 P,vec3 Q){return max(P,Q);}vec3 X(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,P));}vec3 Y(vec3 P,vec3 Q){return mix(P-(1.-2.*Q)*P*(1.-P),mix(P+(2.*Q-1.)*(P*(3.-2.*P)-P),P+(2.*Q-1.)*(sqrt(P)-P),step(0.25,P)),step(0.5,Q));}vec3 Z(vec3 P,vec3 Q){return mix(2.*P*Q,1.-2.*(1.-P)*(1.-Q),step(0.5,Q));}vec3 a(vec3 P,vec3 Q){return mix(min(vec3(1.),P/max(1.-Q,0.0001)),vec3(1.),step(1.,Q));}vec3 b(vec3 P,vec3 Q){return mix(1.-min(vec3(1.),(1.-P)/max(Q,0.0001)),vec3(0.),step(Q,vec3(0.)));}vec3 c(vec3 P,vec3 Q){return abs(P-Q);}vec3 d(vec3 P,vec3 Q){return P+Q-2.*P*Q;}vec3 e(int f,vec3 P,vec3 Q){if(f==A)return O(P,Q);if(f==B)return R(P,Q);if(f==C)return S(P,Q);if(f==D)return T(P,Q);if(f==E)return U(P,Q);if(f==F)return V(P,Q);if(f==G)return W(P,Q);if(f==H)return X(P,Q);if(f==I)return Y(P,Q);if(f==J)return Z(P,Q);if(f==K)return a(P,Q);if(f==L)return b(P,Q);if(f==M)return c(P,Q);if(f==N)return d(P,Q);return O(P,Q);}void main(){vec4 g=texture(U3,v_uv);vec2 h=v_uv*U8;vec2 i=h-U2;vec2 j=Ug*0.5;vec2 k=i-j;float l=cos(-Ul);float m=sin(-Ul);vec2 n=vec2(k.x*l-k.y*m,k.x*m+k.y*l);i=n+j;bool o=any(lessThan(i,vec2(0.)))||any(greaterThanEqual(i,Ug));vec4 p;if(o){if(!Ub){fragColor=g;return;}p=Uf;}else{vec2 q=(floor(i)+0.5)/Ug;p=texture(Uh,q);}float r=p.a*Ui;if(r<=0.){fragColor=g;return;}vec3 s=e(U4,g.rgb,p.rgb);vec3 t=mix(g.rgb,s,r);float u=g.a+r*(1.-g.a);fragColor=vec4(t,u);}'
					)),
					(this.Fe = [this.G.W(i, e, 1, { depth: !1 }), this.G.W(i, e, 1, { depth: !1 })]));
			}
			W_(t) {
				const {
						base: i,
						targetFramebuffer: e,
						backgroundColor: s,
						layers: r,
						canvasWidth: n,
						canvasHeight: h,
					} = t,
					o = this.G.wc(),
					a = this.G.bc();
				(this.G.vc(!1), this.G.yc(!1));
				const c = this.Fe[0];
				(c.begin(),
					this.G.Rh(...s),
					c.end(),
					(this.K_ = 0),
					i.layer.ge &&
						this.Z_(
							i.texture,
							n,
							h,
							i.width,
							i.height,
							i.layer.ve,
							i.offsetX,
							i.offsetY,
							i.layer.we,
							O.NORMAL,
							i.canvasBackgroundColor
						));
				for (const u of r) {
					const t = u.layer;
					t.ge &&
						this.Z_(
							u.texture,
							n,
							h,
							u.width,
							u.height,
							t.ve,
							u.offsetX,
							u.offsetY,
							t.we,
							t.ye,
							u.canvasBackgroundColor
						);
				}
				(this.q_(e, n, h), this.G.yc(a), this.G.vc(o));
			}
			Z_(t, i, e, s, r, n, h, o, a, c, u) {
				const l = this.Fe[this.K_],
					f = 0 === this.K_ ? 1 : 0,
					d = this.Fe[f],
					_ = N(a);
				(d.begin(),
					this.G.ts(this.Y_),
					this.Y_.es({
						Uh: t,
						U3: l.textures[0],
						U8: [i, e],
						Ug: [s, r],
						U2: [h, o],
						Ui: n,
						Ul: _,
						U4: c,
						Ub: void 0 !== u,
						Uf: u ?? [0, 0, 0, 0],
					}),
					this.G.ss(0, 0, l.width, l.height),
					d.end(),
					(this.K_ = f));
			}
			q_(t, i, e) {
				const s = this.Fe[this.K_];
				(t.begin(),
					this.G.ts(this.Y_),
					this.Y_.es({
						Uh: s.textures[0],
						U3: s.textures[0],
						U8: [i, e],
						Ug: [s.width, s.height],
						U2: [0, 0],
						Ui: 1,
						Ul: 0,
						U4: O.NORMAL,
						Ub: !1,
						Uf: [0, 0, 0, 0],
					}),
					this.G.ss(0, 0, i, e),
					t.end());
			}
			cs(t, i) {
				(this.Fe[0].resize(t, i), this.Fe[1].resize(t, i));
			}
			L() {
				(this.Y_.dispose(), this.Fe[0].dispose(), this.Fe[1].dispose());
			}
		};
	function De(t) {
		if ('number' == typeof t || 'boolean' == typeof t) return !0;
		if (Array.isArray(t)) {
			if (0 === t.length) return !0;
			const i = t[0];
			return 'number' == typeof i || !!Array.isArray(i);
		}
		return (
			t instanceof Float32Array ||
			t instanceof Int32Array ||
			!!bt(t) ||
			('undefined' != typeof WebGLTexture && t instanceof WebGLTexture)
		);
	}
	async function ke(t) {
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
	var Re = class {
			G;
			J_ = new Map();
			tp = new Map();
			$s;
			Fe;
			Pt = !1;
			constructor(t) {
				((this.G = t), (this.$s = t.rr(Se, Ee)), this.ip());
			}
			async register(t, i, e = {}) {
				const s = 'string' == typeof i ? this.G.rr(Se, await ke(i)) : i;
				this.ep(t, s, e);
			}
			sp(t, i, e) {
				this.ep(t, this.G.rr(Se, i), e);
			}
			ep(t, i, e) {
				this.tp.set(t, i);
				const s = Object.entries(e),
					r = s.length > 0 ? s[0][1][0] : null;
				this.J_.set(t, {
					id: t,
					createShader: () => i,
					createUniforms: (t, i) => {
						const e = { u_resolution: [i.width, i.height] };
						for (const [n, [h, o]] of s) {
							let i = o;
							if (null != t)
								if ('number' == typeof t && h === r) i = t;
								else if ('object' == typeof t && h in t) {
									const e = t[h];
									De(e) && (i = e);
								}
							e[n] = i;
						}
						return e;
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
					((this.Fe = [this.G.W(t, i, 1, { depth: !1 }), this.G.W(t, i, 1, { depth: !1 })]), (this.Pt = !0));
			}
			rp(t, i, e, s, r) {
				((this.Fe[0].width === s && this.Fe[0].height === r) ||
					(this.Fe[0].resize(s, r), this.Fe[1].resize(s, r)),
					this.rs(t, i, e, s, r, this.Fe));
			}
			rs(t, i, e, s, r, n) {
				if (0 === e.length) {
					if (this.np(t, i)) return;
					return void this.hp(t, i, s, r);
				}
				let h = t,
					o = 0;
				for (let a = 0; a < e.length; a++) {
					const t = e[a];
					let c = i;
					if (a !== e.length - 1 || this.np(h, i)) {
						const t = this.op(h, n, o);
						((c = t.buffer), (o = 0 === t.index ? 1 : 0));
					}
					(this.ap(t, h, c, s, r), (h = c.textures[0]));
				}
				this.np(h, i) || this.hp(h, i, s, r);
			}
			ap(t, i, e, s, r) {
				const n = this.J_.get(t.name);
				if (!n)
					return (
						console.warn(`[textmode.js] Unknown filter: "${t.name}". Skipping.`),
						void this.hp(i, e, s, r)
					);
				const h = this.cp(t.name, n, s, r),
					o = { renderer: this.G, gl: this.G.context, width: s, height: r };
				(e.begin(), this.G.ts(h), h.es({ u_texture: i }));
				const a = n.createUniforms(t.params, o);
				(h.es(a), this.G.ss(0, 0, s, r), e.end());
			}
			np(t, i) {
				return i.textures.includes(t);
			}
			op(t, i, e) {
				const s = i[e];
				if (!this.np(t, s)) return { buffer: s, index: e };
				const r = 0 === e ? 1 : 0,
					n = i[r];
				return this.np(t, n) ? { buffer: s, index: e } : { buffer: n, index: r };
			}
			cp(t, i, e, s) {
				let r = this.tp.get(t);
				if (!r && i) {
					const n = { renderer: this.G, gl: this.G.context, width: e, height: s };
					((r = i.createShader(n)), this.tp.set(t, r));
				}
				return r;
			}
			hp(t, i, e, s) {
				(i.begin(),
					this.G.ts(this.$s),
					this.$s.es({ u_texture: t, u_resolution: [e, s] }),
					this.G.ss(0, 0, e, s),
					i.end());
			}
			cs(t, i) {
				this.Fe && (this.Fe[0].resize(t, i), this.Fe[1].resize(t, i));
			}
			L() {
				for (const t of this.tp.values()) t.dispose();
				(this.tp.clear(),
					this.J_.clear(),
					this.$s.dispose(),
					this.Fe && (this.Fe[0].dispose(), this.Fe[1].dispose()),
					(this.Pt = !1));
			}
			ip() {
				(this.sp(
					'invert',
					'#version 300 es\nprecision highp float;uniform sampler2D u_texture;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);fragColor=vec4(1.-A.rgb,A.a);}',
					{}
				),
					this.sp(
						'grayscale',
						'#version 300 es\nprecision highp float;uniform sampler2D u_texture;uniform float U0;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));vec3 C=mix(A.rgb,vec3(B),U0);fragColor=vec4(C,A.a);}',
						{ U0: ['amount', 1] }
					),
					this.sp(
						'sepia',
						'#version 300 es\nprecision highp float;uniform sampler2D u_texture;uniform float U0;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);vec3 B;B.r=dot(A.rgb,vec3(0.393,0.769,0.189));B.g=dot(A.rgb,vec3(0.349,0.686,0.168));B.b=dot(A.rgb,vec3(0.272,0.534,0.131));vec3 C=mix(A.rgb,B,U0);fragColor=vec4(C,A.a);}',
						{ U0: ['amount', 1] }
					),
					this.sp(
						'threshold',
						'#version 300 es\nprecision highp float;uniform sampler2D u_texture;uniform float Us;in vec2 v_uv;out vec4 fragColor;void main(){vec4 A=texture(u_texture,v_uv);float B=dot(A.rgb,vec3(0.299,0.587,0.114));float C=step(Us,B);fragColor=vec4(vec3(C),A.a);}',
						{ Us: ['threshold', 0.5] }
					));
			}
		},
		Oe = e({ TextmodeFilterManager: () => Re }),
		Be = class {
			us;
			G;
			lp;
			fp;
			dp = [];
			_p = [];
			pp;
			mp = !1;
			gp = new Set();
			vp = [];
			yp = [];
			wp = !1;
			bp = () => {};
			Mp;
			Ap;
			Cp;
			xp;
			Sp;
			Ep = { ge: !0, ve: 1, we: 0, ye: O.NORMAL };
			constructor(t, i) {
				((this.us = t),
					(this.G = t.G),
					(this.fp = new Re(this.G)),
					(this.lp = new Le(this.G, this.us.p.width, this.us.p.height)),
					(this.pp = new nt(this.G, {
						visible: !0,
						opacity: 1,
						fontSize: i.fontSize,
						fontSource: i.fontSource,
					})),
					(this.xp = new Te(this.us, i.loadingScreen)),
					(this.Sp = new ut(this.us)));
			}
			async kt() {
				await this.Fp(this.pp);
				const t = this.us.p;
				((this.Mp = this.G.W(t.width, t.height, 1, { depth: !1 })),
					(this.Ap = this.G.W(t.width, t.height, 1, { depth: !1 })),
					(this.Cp = this.Mp),
					this.fp.kt(t.width, t.height),
					await this.xp.kt(),
					await this.Sp.kt(),
					await this.Fp(this.xp.ls),
					await this.Fp(this.Sp.ls),
					await this.Tp(),
					(this.mp = !0));
			}
			Pp(t, i) {
				(this.wp ? this.yp : this.vp).push({ name: t, params: i });
			}
			Lp(t) {
				this.bp = t;
			}
			Dp() {
				((this.vp = []), (this.yp = []));
			}
			add(t = {}) {
				const i = new nt(this.G, t);
				return (this.mp ? (this.Fp(i), this.dp.push(i)) : this._p.push(i), i);
			}
			remove(t) {
				this.kp(this.dp, t) || this.kp(this._p, t);
			}
			move(t, i) {
				this.Rp(this.dp, t, i) || this.Rp(this._p, t, i);
			}
			swap(t, i) {
				this.Op(this.dp, t, i) || this.Op(this._p, t, i);
			}
			clear() {
				(this.Bp(this.dp), (this.dp = []), this.Bp(this._p), (this._p = []));
			}
			Ip(t, i = []) {
				(this.us.Ye.n_(), this.pp.Xe(this.us, this.us.Np));
				const e = [...this.G.state.vn.Me];
				for (const s of this.dp) s.Xe(this.us, this.us.Np);
				for (const s of i) s.ge && s.Xe(this.us, this.us.Np, { skipPluginHooks: !0 });
				this.jp(t, e, i);
			}
			Qp() {
				(this.Ip(this.Mp), this.zp());
			}
			zp() {
				let t = this.Mp.textures[0];
				if (this.vp.length > 0) {
					const i = this.us.p;
					(this.fp.rp(this.Mp.textures[0], this.Ap, this.vp, i.width, i.height),
						(t = this.Ap.textures[0]),
						(this.Cp = this.Ap),
						(this.vp = []));
				} else this.Cp = this.Mp;
				try {
					try {
						((this.wp = !0), this.bp.call(this.us));
					} finally {
						this.wp = !1;
					}
					if (this.yp.length > 0) {
						const i = this.Ap;
						(this.fp.rp(this.Cp.textures[0], i, this.yp, this.us.p.width, this.us.p.height),
							(t = i.textures[0]),
							(this.Cp = i));
					}
				} finally {
					((this.yp = []), (this.wp = !1));
				}
				(this.Hp(t), this.us.Ye.o_());
			}
			Hp(t) {
				const i = this.us.p;
				(this.G.Rh(0, 0, 0, 0),
					this.G.ts(this.us.Gp),
					this.us.Gp.es({ u_texture: t }),
					this.G.ss(0, 0, i.width, i.height));
			}
			Vp(t) {
				this.Xp(() => {
					t.Xe(this.us, this.us.Np, { skipPluginHooks: !0 });
					const i = t.texture,
						e = t.grid;
					i &&
						e &&
						(this.G.Rh(...this.G.state.vn.Me),
						this.G.ts(this.us.Gp),
						this.us.Gp.es({ u_texture: i }),
						this.G.ss(e.offsetX, e.offsetY, e.width, e.height));
				});
			}
			$p(t) {
				this.Xp(() => {
					const i = this.us.p,
						e = this.Cp ?? this.Mp,
						s = e.textures[0];
					if (!s) return;
					t.Xe(this.us, this.us.Np, { skipPluginHooks: !0 });
					const r = this.Yp(t);
					if (!r) return void this.Hp(s);
					const n = this.Kp(e);
					(this.lp.W_({
						base: { layer: this.Ep, texture: s, width: i.width, height: i.height, offsetX: 0, offsetY: 0 },
						layers: [r],
						targetFramebuffer: n,
						backgroundColor: [0, 0, 0, 0],
						canvasWidth: i.width,
						canvasHeight: i.height,
					}),
						this.Hp(n.textures[0]));
				});
			}
			Xp(t) {
				const i = !this.G.za();
				(i && this.G.ja(!0), this.G.Xa(!0), this.G.state.Qs());
				try {
					(this.G.state.Yi.pe(), this.G.state.Ze(), t());
				} finally {
					(this.G.state.zs(), this.G.$a(), i && this.G.ja(!1));
				}
			}
			Kp(t) {
				return t === this.Mp ? this.Ap : this.Mp;
			}
			Yp(t, i = !0) {
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
				return (i && t.Me && (s.canvasBackgroundColor = t.Me), s);
			}
			jp(t, i, e = []) {
				const s = this.us.p,
					r = this.Yp(this.pp, !1);
				if (!r) return;
				const n = [];
				for (const h of this.dp) {
					const t = this.Yp(h);
					t && n.push(t);
				}
				for (const h of e) {
					if (!h.ge) continue;
					const t = this.Yp(h);
					t && n.push(t);
				}
				this.lp.W_({
					base: r,
					layers: n,
					targetFramebuffer: t,
					backgroundColor: i,
					canvasWidth: s.width,
					canvasHeight: s.height,
				});
			}
			cs() {
				if (!this.mp) return;
				const t = this.us.p;
				this.pp.cs();
				for (const i of this.dp) i.cs();
				(this.xp.ls?.cs(),
					this.Sp.ls?.cs(),
					this.lp.cs(t.width, t.height),
					this.Mp?.resize(t.width, t.height),
					this.Ap?.resize(t.width, t.height),
					this.fp?.cs(t.width, t.height));
			}
			L() {
				(this.xp.L(),
					this.Sp.L(),
					this.clear(),
					this.us.Ye.a_(this.pp),
					this.pp.L(),
					this.fp.L(),
					this.lp.L(),
					this.Mp?.dispose(),
					this.Ap?.dispose(),
					(this.vp = []),
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
				const t = this.vp.length > 0 || this.yp.length > 0 ? this.Ap : (this.Cp ?? this.Mp);
				if (!t) throw new n('LayerManager.resultFramebuffer is not available before initialization completes.');
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
					const e = t[i];
					if (e.ge && e.grid) return e.grid;
				}
				return this.pp.grid;
			}
			Zp(t) {
				this.gp.add(t);
			}
			qp() {
				for (const t of this.gp) t();
			}
			async Tp() {
				for (let t = 0; t < this._p.length; t++) {
					const i = this._p[t];
					(await this.Fp(i), this.dp.push(i));
				}
				this._p = [];
			}
			kp(t, i) {
				const e = t.indexOf(i);
				return -1 !== e && (t.splice(e, 1), this.Jp(i), !0);
			}
			Rp(t, i, e) {
				const s = t.indexOf(i);
				return -1 !== s && (t.splice(s, 1), t.splice(H(e, 0, t.length), 0, i), !0);
			}
			Op(t, i, e) {
				if (i === e) return !0;
				const s = t.indexOf(i),
					r = t.indexOf(e);
				return -1 !== s && -1 !== r && ((t[s] = e), (t[r] = i), !0);
			}
			Bp(t) {
				for (const i of t) this.Jp(i);
			}
			Jp(t) {
				(this.us.Ye.a_(t), t.L());
			}
			async Fp(t) {
				const i = {
					renderer: this.G,
					canvas: this.us.p,
					filterManager: this.fp,
					createFramebuffer: (t, i, e = 1, s) => this.G.W(t, i, e, s),
				};
				(await t.Ne(i), t.grid?.S(() => this.qp()));
			}
		},
		Ie = e({ LayerBlendMode: () => O, TextmodeLayer: () => nt, TextmodeLayerManager: () => Be }),
		Ne =
			'#version 300 es\nprecision highp float;in vec2 v_uv;in vec3 v_worldPosition;uniform sampler2D u_image;uniform bool u_invert;uniform bool u_flipX;uniform bool u_flipY;uniform float u_charRotation;uniform float U6;uniform float U5;uniform bool u_charColorFixed;uniform vec4 u_charColor;uniform bool u_cellColorFixed;uniform vec4 u_cellColor;uniform vec4 u_backgroundColor;uniform int u_charCount;uniform sampler2D u_charPaletteTexture;uniform ivec2 u_charPaletteDimensions;layout(location=0)out vec4 o_character;layout(location=1)out vec4 o_primaryColor;layout(location=2)out vec4 o_secondaryColor;layout(location=3)out vec4 o_statePayload;\n' +
			Li +
			'\nfloat A(vec3 B){return dot(B,vec3(0.299f,0.587f,0.114f));}vec3 C(int D){int E=max(u_charPaletteDimensions.x,1);int F=D/E;int G=D%E;return texelFetch(u_charPaletteTexture,ivec2(G,F),0).rgb;}void main(){vec2 H=vec2(v_uv.x,1.0f-v_uv.y);vec4 I=texture(u_image,H);float J=A(I.rgb);if(I.a<0.01f||J<U6||J>U5){discard;}vec2 K=vec2(0.);if(u_charCount>0){float L=float(u_charCount);float M=clamp(J*(L-1.0f),0.0f,L-1.0f);int N=int(floor(M+0.5f));vec3 O=C(N);K=O.xy;}else{K=vec2(0.0f,0.0f);}vec4 P=u_charColorFixed?u_charColor:I;vec4 Q=u_cellColorFixed?u_cellColor:I;vec3 R=tmApplyLighting(P.rgb,v_worldPosition);vec3 S=tmApplyLighting(Q.rgb,v_worldPosition);o_primaryColor=vec4(R,P.a);o_secondaryColor=vec4(S,Q.a);o_statePayload=vec4(0.);int T=int(u_invert?1:0);int U=int(u_flipX?1:0);int V=int(u_flipY?1:0);float W=float(T|(U<<1)|(V<<2))/255.;o_character=vec4(K,W,clamp(u_charRotation,0.0f,1.0f));}',
		je = {
			id: 'brightness',
			createShader: ({ gl: t }) => new Mt(t, Pi, Ne),
			createUniforms: (t) => t.createBaseUniforms(),
		},
		Qe = class {
			tm = new Map();
			tp = new Map();
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
			Gu(t, i) {
				let e = this.tp.get(t);
				if (!e) {
					const s = this.tm.get(t);
					if (!s) throw new Error(`[textmode.js] Conversion mode "${t}" is not registered.`);
					((e = s.createShader(i)), this.tp.set(t, e));
				}
				return e;
			}
			L() {
				for (const t of this.tp.values()) t.dispose();
				(this.tp.clear(), this.tm.clear());
			}
			im() {
				this.register(je);
			}
		},
		ze = e({ TextmodeConversionManager: () => Qe }),
		He = 'textmode-v1';
	function Ge() {
		const t = globalThis.crypto;
		if (t?.getRandomValues) {
			const i = new Uint32Array(4);
			return (t.getRandomValues(i), `auto:${i[0]}:${i[1]}:${i[2]}:${i[3]}`);
		}
		return `auto:${Date.now()}:${globalThis.performance?.now?.() ?? 0}:${Math.random()}`;
	}
	function Ve(t) {
		return 'number' == typeof t ? `number:${String(t)}` : `string:${t}`;
	}
	function Xe(t, i) {
		return `stream:${t.length}:${t}:${i.length}:${i}`;
	}
	function $e(t, i) {
		let e = (2166136261 ^ i) >>> 0;
		for (let s = 0; s < t.length; s += 1) ((e ^= t.charCodeAt(s)), (e = Math.imul(e, 16777619)), (e ^= e >>> 13));
		return (
			(e ^= t.length),
			(e = Math.imul(e ^ (e >>> 16), 2146121005)),
			(e = Math.imul(e ^ (e >>> 15), 2221713035)),
			(e ^ (e >>> 16)) >>> 0
		);
	}
	function Ye(t) {
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
	var Ke = class {
			ps;
			sm;
			constructor(t = Ge()) {
				this.randomSeed(t);
			}
			random(t, i) {
				if (Array.isArray(t)) {
					if (0 === t.length) return;
					return t[Math.floor(this.rm() * t.length)];
				}
				const e = this.rm();
				return 'number' != typeof t ? e : void 0 === i ? e * t : t + e * (i - t);
			}
			randomGaussian(t = 0, i = 1) {
				if (void 0 !== this.sm) {
					const e = this.sm;
					return ((this.sm = void 0), t + e * i);
				}
				const e = Math.sqrt(-2 * Math.log(1 - this.rm())),
					s = 2 * Math.PI * this.rm(),
					r = e * Math.cos(s),
					n = e * Math.sin(s);
				return ((this.sm = n), t + r * i);
			}
			randomSeed(t) {
				((this.ps = (function (t) {
					const i = `${He}\0${t}`,
						e = [$e(i, 608135816), $e(i, 2242054355), $e(i, 320440878), $e(i, 57701188)];
					e.every((t) => 0 === t) && (e[0] = 1831565813);
					for (let s = 0; s < 12; s += 1) Ye(e);
					return e;
				})(Ve(t))),
					(this.sm = void 0));
			}
			rm() {
				return Ye(this.ps) / 4294967296;
			}
			static get nm() {
				return He;
			}
		},
		We = e({ TEXTMODE_RANDOM_ALGORITHM: () => He, TextmodeRandom: () => Ke }),
		Ze = 4095;
	function qe(t) {
		return 0.5 * (1 - Math.cos(t * Math.PI));
	}
	var Je = class {
			hm = [];
			om = 4;
			am = 0.5;
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
				for (let l = 0; l < this.om; l += 1) {
					let t = s + (r << 4) + (n << 8);
					const i = qe(h),
						e = qe(o);
					let l = this.hm[t & Ze],
						f = this.hm[(t + 1) & Ze];
					((l += i * (f - l)), (f = this.hm[(t + 16) & Ze]));
					let d = this.hm[(t + 16 + 1) & Ze];
					((f += i * (d - f)),
						(l += e * (f - l)),
						(t += 256),
						(f = this.hm[t & Ze]),
						(d = this.hm[(t + 1) & Ze]),
						(f += i * (d - f)));
					let _ = this.hm[(t + 16) & Ze];
					((d = this.hm[(t + 16 + 1) & Ze]),
						(_ += i * (d - _)),
						(f += e * (_ - f)),
						(l += qe(a) * (f - l)),
						(c += l * u),
						(u *= this.am),
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
				return H(c, 0, 1);
			}
			noiseSeed(t) {
				const i = new Ke(t);
				this.hm = Array.from({ length: 4096 }, () => i.random());
			}
			noiseDetail(t, i) {
				((this.om = Number.isFinite(t) ? Math.max(1, Math.floor(t)) : 1),
					void 0 !== i && Number.isFinite(i) && (this.am = H(i, 0, 1)));
			}
		},
		ts = e({ TextmodeColor: () => Vi }),
		is = class {
			G;
			Np;
			Gp;
			p;
			um;
			dd;
			lm;
			fm;
			dm;
			_m;
			pm;
			qe;
			gm;
			vm = null;
			ym = [];
			wm = [];
			bm = [];
			Mm = [];
			Am = [];
			Cm = null;
			xm = new Float32Array(24);
			Sm = new Set();
			Ye;
			Em;
			Fm;
			Tm = new Map();
			Pm;
			Lm;
			Dm;
			km;
			Oa = !1;
			Rm = !1;
			Pc = !1;
			Om = null;
			Bm = !1;
			Im = 0;
			Nm = () => {};
			jm = () => {};
			Qm;
			zm;
			Hm;
			Cc = !1;
			Gm;
			Vm;
			constructor(t = {}) {
				((this.Ye = new xe(this)), (this.Cc = t.overlay ?? !1));
				const i = t.seed ?? Ge();
				((this.Fm = Ve(i)),
					(this.Em = new Ke(i)),
					(this.Pm = new Je(Xe(this.Fm, 'noise'))),
					(this.Lm = new Promise((t) => {
						this.km = t;
					})),
					(this.p = new Qi(t)),
					(this.G = new ji(this.p.Nc())),
					(this.Np = this.G.rr(
						Se,
						'#version 300 es\nprecision highp float;uniform sampler2D u_characterTexture;uniform vec2 u_charsetDimensions;uniform sampler2D Uj;uniform sampler2D Um;uniform sampler2D U1;uniform bool UH;uniform vec2 U9;uniform vec2 Ua;uniform vec4 U7;in vec2 v_uv;out vec4 fragColor;mat2 A(float B){float C=sin(B);float D=cos(B);return mat2(D,-C,C,D);}float E(vec3 F){return dot(F,vec3(0.299f,0.587f,0.114f));}void main(){vec2 G=gl_FragCoord.xy/Ua;vec2 H=G*U9;vec2 I=floor(H);vec2 J=(I+0.5)/U9;vec4 K=texture(Uj,J);vec4 L=texture(Um,J);vec4 M=texture(U1,J);int N=int(M.r*255.+0.5);int O=int(M.g*255.+0.5);int P=int(M.a*255.+0.5);if(N==255&&O==255){fragColor=mix(U7,L,L.a);return;}int Q=int(M.b*255.+0.5);bool R=(Q&1)!=0;bool S=(Q&2)!=0;bool T=(Q&4)!=0;int U=N+O*256;int V=int(u_charsetDimensions.x);int W=U/V;int X=U-(W*V);float Y=(u_charsetDimensions.y-1.)-float(W);vec2 Z=1./u_charsetDimensions;vec2 a=vec2(float(X),Y)*Z;vec2 b=a+Z;float c=-M.a*360.*0.017453292;vec2 d=fract(H)-0.5f;vec2 e=vec2(S?-1.:1.,T?-1.:1.);d*=e;d=A(c)*d+0.5;vec2 f=a+clamp(d,0.,1.)*Z;const float g=0.0001;if(any(lessThan(f,a-g))||any(greaterThan(f,b+g))){fragColor=R?K:L;return;}vec4 h=texture(u_characterTexture,f);if(!UH){fragColor=h;return;}float i=(h.a>0.0f&&E(h.rgb)>0.5f)?1.0f:0.0f;if(R)i=1.0f-i;vec4 j=mix(U7,L,L.a);fragColor=mix(j,K,i);}'
					)),
					(this.Gp = this.G.rr(Se, Ee)),
					(this.um = new qi(t.frameRate ?? 60)),
					(this.pm = new Be(this, t)));
				const e = () => this.Xm();
				((this._m = new oe()),
					(this.dd = new ae(this.p, e, this._m)),
					(this.lm = new le(this.p, e, this._m, this.dd)),
					(this.fm = new ce(this._m)),
					(this.dm = new we(this._m)),
					(this.gm = new Qe()),
					this.Ye.L_(t.plugins ?? []),
					(this.Dm = this.kt()));
			}
			$m(t) {
				(this.Sm.add(t),
					t.k?.(() => {
						this.Sm.delete(t);
					}));
			}
			Ym = (t, i, e, s) => Vi.Yc(t, i, e, s, this.G.state.vn.kn());
			Km(t, i) {
				(this.p.cs(t, i), this.pm?.cs(), this.G.gc(), this.Xe());
			}
			Wm() {
				const t = this.pm?.base.grid;
				if (!t) return;
				const i = t.cols,
					e = t.rows;
				for (const s of this.Sm) s instanceof Wi && s.cs(i, e);
				this.Gm && this.Gm.cs(i, e);
			}
			async kt() {
				(await this.pm.kt(), this.km());
				const t = this.pm.base.grid;
				(this.Wm(),
					this.pm.Zp(() => {
						(this.dd._f(), this.lm._f());
					}),
					this.Cc && (this.Gm = Zi.rl(this.G, this.gm, this.p.targetCanvas, t.cols, t.rows, this.Ym)),
					this.Zm(),
					t.S(() => {
						this.Wm();
					}),
					this.qm());
				try {
					(await this.Ye.c_(),
						await this.Nm(),
						await this.Ye.l_(),
						(this.um.vl = 0),
						this.loading.j_(),
						(this.Bm = !0),
						this.qm());
				} catch (i) {
					this.Jm(i, 'setup');
				}
			}
			qm() {
				this.um.wl(
					() => this.Xe(),
					() => this.tg()
				);
			}
			tg() {
				return (
					!this.Rm &&
					!this.Pc &&
					(this.loading.bs || this.errors.bs || this.Bm || this.Im > 0 || null !== this.Om)
				);
			}
			ig(t) {
				((this.Im += t), this.qm(), this.Oa || this.loading.bs || this.errors.bs || this.eg());
			}
			Zm() {
				((this.Qm = () => {
					if (this.Cc) {
						const t = this.p.targetCanvas.getBoundingClientRect();
						this.resizeCanvas(Math.round(t.width), Math.round(t.height));
					}
					this.jm();
				}),
					window.addEventListener('resize', this.Qm),
					this.dd.rf(),
					this.lm.rf(),
					this.fm.rf(),
					this.dm.rf(),
					(this.zm = () => {
						this.fm.If();
					}),
					window.addEventListener('blur', this.zm),
					this.Cc &&
						((this.Hm = new ResizeObserver(() => {
							const t = this.p.targetCanvas.getBoundingClientRect();
							this.resizeCanvas(Math.round(t.width), Math.round(t.height));
						})),
						this.Hm.observe(this.p.targetCanvas)));
			}
			Xe() {
				if (this.errors.bs) {
					this.errors.Cs();
					const t = this.errors.ls;
					return void (t && this.pm.Vp(t));
				}
				if (this.loading.bs)
					try {
						this.loading.Cs();
						const t = this.loading.ls;
						if (!t || !this.loading.bs) return;
						if ('transitioning' === this.loading.ps) {
							if ((this.sg(), this.errors.bs || !this.loading.bs)) return;
							this.pm.$p(t);
						} else this.pm.Vp(t);
					} catch (t) {
						this.Jm(t, 'loading screen');
					}
				else this.eg() || (this.rg() && this.ng());
			}
			rg() {
				return this.Bm || this.um.ll;
			}
			sg() {
				this.rg() && this.ng();
			}
			eg() {
				if (this.loading.bs || this.errors.bs || this.Im <= 0) return !1;
				for (this.Bm = !1; this.Im > 0;) (this.Im--, this.ng());
				return !0;
			}
			ng() {
				((this.Bm = !1), this.um.Sl(), this.um.Fl(), this.dd.wf(), this.dm.wf(), (this.Oa = !0), this.G.ja(!0));
				try {
					(this.Cc && _t(this.G.context, this.Gm.texture, this.p.targetCanvas), this.pm.Qp());
				} catch (t) {
					this.Jm(t, 'draw loop');
				} finally {
					if (((this.Oa = !1), this.G.ja(!1), this.Rm && !this.Pc)) this.hg();
					else if (this.Om) {
						const { width: t, height: i } = this.Om;
						((this.Om = null), this.Km(t, i));
					}
				}
			}
			resizeCanvas(t, i) {
				this.Oa ? (this.Om = { width: t, height: i }) : this.Km(t, i);
			}
			destroy() {
				this.Pc || this.Rm || ((this.Rm = !0), this.um.Al(), this.Oa || this.hg());
			}
			async hg() {
				(this.p.L(),
					await this.Ye.B_(),
					window.removeEventListener('resize', this.Qm),
					window.removeEventListener('blur', this.zm),
					this.Hm?.disconnect(),
					this.dd.df(),
					this.lm.df(),
					this.fm.df(),
					this.dm.df(),
					this.pm?.L(),
					this.gm?.L());
				for (const t of this.Sm) t.dispose();
				(this.Sm.clear(), this.Np.dispose(), this.Gp.dispose(), this.G.L(), this.Gm?.dispose(), (this.Pc = !0));
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
				if (t instanceof L) return (t.Pt || (await t.kt()), t);
				const e = new L(this.G);
				return (await e.kt(t), this.$m(e), e);
			}
			async loadTileset(t, i = !0) {
				if (i) return (await this.pm.base.loadTileset(t), this.pm.base.font);
				if (t instanceof k) return (t.Pt || (await t.kt()), t);
				const e = new k(this.G, t.fontSize, t);
				return (await e.kt(), this.$m(e), e);
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
				(console.error(`Error during ${i}:`, t), this.loading.j_(), this.errors.Ms(t), this.qm());
			}
			async setup(t) {
				this.Nm = t;
			}
			windowResized(t) {
				this.jm = t;
			}
			get grid() {
				return this.qe?.grid ?? this.pm.base.grid;
			}
			get font() {
				return this.qe?.font ?? this.pm.base.font;
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
				(this.p.Qc(t), this.resizeCanvas(e, s));
			}
			get canvas() {
				return this.p.canvas;
			}
			get isDisposed() {
				return this.Pc;
			}
			get overlay() {
				return this.Gm;
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
				return this.gm;
			}
			get isRenderingFrame() {
				return this.Oa;
			}
		},
		es = class {
			constructor() {}
			static create(t = {}) {
				return new is(t);
			}
			static setErrorLevel(t) {
				it.Li(t);
			}
			static get version() {
				return '0.17.1';
			}
		},
		ss = new WeakMap();
	function rs(t, i, e) {
		let s = ss.get(t);
		(s || ((s = new Map()), ss.set(t, s)), s.get(i)?.());
		const r = t._m.Rl(i, e);
		s.set(i, r);
	}
	function ns(t) {
		const i = is.prototype;
		for (const e of t)
			i[e] = function (t) {
				rs(this, e, t);
			};
	}
	function hs(t) {
		for (const { name: i, get: e } of t)
			Object.defineProperty(is.prototype, i, { get: e, configurable: !0, enumerable: !0 });
	}
	function os(t, i) {
		const e = is.prototype;
		e[t] = e[i];
	}
	function as(t, i) {
		return function (e, s, r, n) {
			if (void 0 === e) return Vi.Kc(...t.call(this));
			const h = this.Ym(e, s, r, n);
			i.call(this, h);
		};
	}
	var cs = e({ MOUSE_EVENT_NAMES: () => ee });
	(ns(ee),
		(is.prototype.cursor = function (t) {
			this.dd.tf(t);
		}),
		(is.prototype.requestPointerLock = function () {
			return this.dd.if();
		}),
		(is.prototype.exitPointerLock = function () {
			this.dd.ef();
		}),
		hs([
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
					return this.dd.gf();
				},
			},
			{
				name: 'movedY',
				get: function () {
					return this.dd.vf();
				},
			},
		]),
		(is.prototype.frameRate = function (t) {
			return void 0 === t ? this.um.fl : this.um.xl(t, () => this.Xe());
		}),
		(is.prototype.targetFrameRate = function (t) {
			if (void 0 === t) return this.um.hl;
			this.um.El(t);
		}),
		(is.prototype.noLoop = function () {
			this.um.Al();
		}),
		(is.prototype.loop = function () {
			this.um.Cl(() => this.Xe());
		}),
		(is.prototype.redraw = function (t = 1) {
			it.Pi('number' == typeof t && t > 0 && Number.isInteger(t), 'Redraw count must be a positive integer.', {
				method: 'redraw',
				providedValue: t,
			}) && this.ig(t);
		}),
		(is.prototype.isLooping = function () {
			return this.um.ll;
		}),
		(is.prototype.deltaTime = function () {
			return this.um.ml;
		}),
		Object.defineProperty(is.prototype, 'frameCount', {
			get: function () {
				return this.um.vl;
			},
			set: function (t) {
				this.um.vl = t;
			},
			configurable: !0,
			enumerable: !0,
		}),
		Object.defineProperty(is.prototype, 'millis', {
			get: function () {
				return this.um.Tl;
			},
			set: function (t) {
				this.um.Tl = t;
			},
			configurable: !0,
			enumerable: !0,
		}),
		Object.defineProperty(is.prototype, 'secs', {
			get: function () {
				return this.um.Pl;
			},
			set: function (t) {
				this.um.Pl = t;
			},
			configurable: !0,
			enumerable: !0,
		}));
	var us = e({ GESTURE_EVENT_NAMES: () => re, TOUCH_EVENT_NAMES: () => se });
	(ns(se),
		ns(re),
		hs([
			{
				name: 'touches',
				get: function () {
					return this.lm.xd();
				},
			},
		]));
	var ls = e({ KEYBOARD_EVENT_NAMES: () => ie });
	(ns(ie),
		(is.prototype.isKeyPressed = function (t) {
			return this.fm.Lf(t);
		}),
		hs([
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
					return this.fm.Of();
				},
			},
			{
				name: 'modifierState',
				get: function () {
					return this.fm.Bf();
				},
			},
		]));
	var fs = e({ GAMEPAD_EVENT_NAMES: () => ne });
	(ns(ne),
		(is.prototype.gamepad = function (t) {
			return this.dm.jd(t);
		}),
		hs([
			{
				name: 'gamepads',
				get: function () {
					return this.dm.Nd();
				},
			},
		]),
		(is.prototype.perspective = function (t, i, e) {
			this.layers.base.perspective(t, i, e);
		}),
		(is.prototype.createCamera = function () {
			return this.layers.base.createCamera();
		}),
		(is.prototype.setCamera = function (t) {
			this.layers.base.setCamera(t);
		}),
		(is.prototype.resetCamera = function () {
			this.layers.base.resetCamera();
		}),
		(is.prototype.camera = function (t, i, e, s = 0, r = 0, n = 0, h = 0, o = 1, a = 0) {
			this.layers.base.camera(t, i, e, s, r, n, h, o, a);
		}),
		(is.prototype.lookAt = function (t, i, e, s, r, n) {
			this.layers.base.lookAt(t, i, e, s, r, n);
		}),
		(is.prototype.ortho = function (t, i) {
			this.layers.base.ortho(t, i);
		}));
	var ds = (function (t) {
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
		_s = {
			0: function (t, i, e, s, r, n) {
				for (let h = 0; h < n; h++) {
					const n = t.G.state;
					(n.Qs(), n.Wn(r[h]), n.Hn.Sr(i[h], e[h], s[h]), t.G.tc(1, 1), n.zs());
				}
			},
			1: function (t, i, e, s, r, n) {
				for (let h = 0; h + 1 < n; h += 2) ms(t, i, e, r, h, h + 1);
			},
			2: ps,
			3: function (t, i, e, s, r, n) {
				ps(t, i, e, 0, r, n, 'close');
			},
			4: function (t, i, e, s, r, n) {
				for (let h = 0; h + 2 < n; h += 3) gs(t, i, e, s, r[h], h, h + 1, h + 2);
			},
			5: function (t, i, e, s, r, n) {
				for (let h = 0; h + 2 < n; h++) gs(t, i, e, s, r[h], h, h + 1, h + 2);
			},
			6: function (t, i, e, s, r, n) {
				for (let h = 1; h + 1 < n; h++) gs(t, i, e, s, r[0], 0, h, h + 1);
			},
			7: function (t, i, e, s, r, n) {
				for (let h = 0; h + 3 < n; h += 4) vs(t, i, e, s, r[h], h, h + 1, h + 2, h + 3);
			},
			8: function (t, i, e, s, r, n) {
				for (let h = 0; h + 3 < n; h += 2) vs(t, i, e, s, r[h], h, h + 1, h + 3, h + 2);
			},
		};
	for (const [Zs, qs] of Object.entries({
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
		Object.defineProperty(is.prototype, Zs, { configurable: !0, enumerable: !1, value: qs, writable: !1 });
	function ps(t, i, e, s, r, n, h) {
		for (let o = 0; o + 1 < n; o++) ms(t, i, e, r, o, o + 1);
		'close' === h && n > 2 && ms(t, i, e, r, n - 1, 0);
	}
	function ms(t, i, e, s, r, n) {
		const h = t.G.state;
		(h.Qs(), h.Wn(s[r]), t.G.ec(i[r], e[r], i[n], e[n]), h.zs());
	}
	function gs(t, i, e, s, r, n, h, o) {
		bs(t, 12);
		const a = t.xm;
		(ws(a, 0, i[n], e[n], s[n]), ws(a, 4, i[h], e[h], s[h]), ws(a, 8, i[o], e[o], s[o]), ys(t, r, 3));
	}
	function vs(t, i, e, s, r, n, h, o, a) {
		bs(t, 24);
		const c = t.xm;
		(ws(c, 0, i[n], e[n], s[n]),
			ws(c, 4, i[h], e[h], s[h]),
			ws(c, 8, i[o], e[o], s[o]),
			ws(c, 12, i[n], e[n], s[n]),
			ws(c, 16, i[o], e[o], s[o]),
			ws(c, 20, i[a], e[a], s[a]),
			ys(t, r, 6));
	}
	function ys(t, i, e) {
		const s = t.G.state;
		(s.Qs(), s.Wn(i), t.G.sc(t.xm, e), s.zs());
	}
	function ws(t, i, e, s, r) {
		((t[i] = e), (t[i + 1] = s), (t[i + 2] = r), (t[i + 3] = 0));
	}
	function bs(t, i) {
		if (t.xm.length >= i) return;
		let e = t.xm.length;
		for (; e < i;) e *= 2;
		t.xm = new Float32Array(e);
	}
	((is.prototype.rect = function (t = 1, i = 1) {
		this.G.tc(t, i);
	}),
		(is.prototype.point = function () {
			this.G.tc(1, 1);
		}),
		(is.prototype.line = function (t, i, e, s) {
			this.G.ec(t, i, e, s);
		}),
		(is.prototype.lineWeight = function (t) {
			if (void 0 === t) return this.G.state.vn.en;
			this.G.state.vn.Mn(t);
		}),
		(is.prototype.ellipse = function (t = 1, i = 1) {
			this.G.rc(t / 2, i / 2);
		}),
		(is.prototype.triangle = function (t, i, e, s, r, n) {
			this.G.nc(t, i, e, s, r, n);
		}),
		(is.prototype.arc = function (t, i, e, s) {
			this.G.oc(t / 2, i / 2, e, s);
		}),
		(is.prototype.bezierCurve = function (t, i, e, s, r, n, h, o) {
			this.G.hc(t, i, e, s, r, n, h, o);
		}),
		(is.prototype.beginShape = function (t = 2) {
			if (null !== this.vm) throw new Error('beginShape() called before endShape(). Call endShape() first.');
			((this.vm = t),
				(this.ym.length = 0),
				(this.wm.length = 0),
				(this.bm.length = 0),
				(this.Mm.length = 0),
				(this.Cm ??= Vt.$n()),
				this.G.state.Yn(this.Cm));
		}),
		(is.prototype.vertex = function (t, i, e = 0) {
			if (null === this.vm) throw new Error('vertex() must be called between beginShape() and endShape().');
			const s = this.Am.pop() ?? Vt.$n();
			(this.G.state.Yn(s), this.ym.push(t), this.wm.push(i), this.bm.push(e), this.Mm.push(s));
		}),
		(is.prototype.endShape = function (t) {
			if (null === this.vm || null === this.Cm) throw new Error('endShape() must be called after beginShape().');
			const i = this.vm,
				e = this.ym,
				s = this.wm,
				r = this.bm,
				n = this.Mm,
				h = n.length,
				o = this.Cm;
			try {
				!(function (t, i, e, s, r, n, h, o) {
					const a = _s[i];
					a?.(t, e, s, r, n, h, o);
				})(this, i, e, s, r, n, h, t);
			} finally {
				this.G.state.Wn(o);
				for (let t = 0; t < n.length; t++) this.Am.push(n[t]);
				((e.length = 0), (s.length = 0), (r.length = 0), (n.length = 0), (this.vm = null));
			}
		}),
		(is.prototype.box = function (t = 50, i, e) {
			const s = i ?? t,
				r = e ?? s;
			this.G.ac(t, s, r);
		}),
		(is.prototype.sphere = function (t = 50) {
			this.G.cc(t);
		}),
		(is.prototype.torus = function (t = 50, i = 10) {
			this.G.uc(t, i);
		}),
		(is.prototype.cone = function (t = 50, i) {
			this.G.lc(t, i ?? t);
		}),
		(is.prototype.cylinder = function (t = 50, i) {
			this.G.fc(t, i ?? t);
		}),
		(is.prototype.ellipsoid = function (t = 50, i, e) {
			this.G.dc(t, i ?? t, e ?? t);
		}));
	var Ms = new Float32Array(16);
	((is.prototype.rotate = function (t = 0, i, e) {
		const s = this.G.state.Hn;
		if ('number' == typeof i || void 0 !== e) return (s.Tr(t), s.Pr(i ?? 0), void s.Lr(e ?? 0));
		void 0 === i
			? s.Lr(t)
			: Array.isArray(i)
				? s.Dr(t, i[0] ?? 0, i[1] ?? 0, i[2] ?? 0)
				: s.Dr(t, i.x ?? 0, i.y ?? 0, i.z ?? 0);
	}),
		(is.prototype.rotateX = function (t) {
			if (void 0 === t) return j(this.G.state.Hn._r);
			this.G.state.Hn.Tr(t);
		}),
		(is.prototype.rotateY = function (t) {
			if (void 0 === t) return j(this.G.state.Hn.pr);
			this.G.state.Hn.Pr(t);
		}),
		(is.prototype.rotateZ = function (t) {
			if (void 0 === t) return j(this.G.state.Hn.mr);
			this.G.state.Hn.Lr(t);
		}),
		(is.prototype.translate = function (t = 0, i = 0, e = 0) {
			this.G.state.Hn.Sr(t, i, e);
		}),
		(is.prototype.translateX = function (t) {
			if (void 0 === t) return this.G.state.Hn.ur;
			this.G.state.Hn.Sr(t, 0, 0);
		}),
		(is.prototype.translateY = function (t) {
			if (void 0 === t) return this.G.state.Hn.lr;
			this.G.state.Hn.Sr(0, t, 0);
		}),
		(is.prototype.translateZ = function (t) {
			if (void 0 === t) return this.G.state.Hn.dr;
			this.G.state.Hn.Sr(0, 0, t);
		}),
		(is.prototype.scale = function (t, i, e) {
			this.G.state.Hn.Fr(t, i, e);
		}),
		(is.prototype.resetMatrix = function () {
			this.G.state.Hn.kr();
		}),
		(is.prototype.applyMatrix = function (...t) {
			let i;
			if (1 === t.length && 'number' != typeof t[0]) i = t[0];
			else {
				if (16 !== t.length)
					throw new Error('applyMatrix() expects either a 16-length array-like or 16 numeric arguments.');
				i = t;
			}
			if (16 !== i.length) throw new Error('applyMatrix() expects exactly 16 values.');
			for (let e = 0; e < 16; e++) Ms[e] = Number(i[e] ?? 0);
			this.G.state.Hn.Rr(Ms);
		}),
		(is.prototype.push = function () {
			this.G.state.Qs();
		}),
		(is.prototype.pop = function () {
			this.G.state.zs();
		}),
		Object.defineProperty(is.prototype, 'windowWidth', {
			get: function () {
				return window.innerWidth;
			},
			configurable: !0,
			enumerable: !0,
		}),
		Object.defineProperty(is.prototype, 'windowHeight', {
			get: function () {
				return window.innerHeight;
			},
			configurable: !0,
			enumerable: !0,
		}),
		Object.defineProperty(is.prototype, 'displayWidth', {
			get: function () {
				return screen.width;
			},
			configurable: !0,
			enumerable: !0,
		}),
		Object.defineProperty(is.prototype, 'displayHeight', {
			get: function () {
				return screen.height;
			},
			configurable: !0,
			enumerable: !0,
		}),
		(is.prototype.color = function (t, i, e, s) {
			return this.Ym(t, i, e, s);
		}),
		(is.prototype.colorMode = function (t, i, e, s, r) {
			const n = this.G.state.vn;
			if (void 0 === t) return n.kn();
			const h = (function (t, i, e, s, r) {
				if ('rgb' !== t && 'hsb' !== t && 'hsl' !== t)
					throw new Error("colorMode() mode must be 'rgb', 'hsb', or 'hsl'.");
				let n = Ft(t);
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
			n.Rn(h.mode, h.maxes);
		}),
		(is.prototype.background = function (t, i, e, s = 255) {
			if (void 0 === t) {
				const [t, i, e, s] = this.G.state.vn.Me;
				return Vi.Kc(t, i, e, s);
			}
			const r = this.Ym(t, i, e, s);
			(this.G.state.vn.Ln(r.r, r.g, r.b, r.a), this.qe?.ns(r.normalized), this.G._c(r.r, r.g, r.b, r.a));
		}),
		(is.prototype.clear = function () {
			(this.qe?.hs(), this.G.state.vn.Dn(), this.G.Rh(0, 0, 0, 0));
		}));
	var As = as(
		function () {
			return this.G.state.vn.nn;
		},
		function (t) {
			this.G.state.vn.xn(t.r, t.g, t.b, t.a);
		}
	);
	((is.prototype.charColor = As), os('stroke', 'charColor'));
	var Cs = as(
		function () {
			return this.G.state.vn.hn;
		},
		function (t) {
			this.G.state.vn.Sn(t.r, t.g, t.b, t.a);
		}
	);
	function xs(t) {
		if ('object' != typeof t || null === t) return !1;
		const i = t;
		return 'number' == typeof i.x && 'number' == typeof i.y && 'number' == typeof i.z;
	}
	((is.prototype.cellColor = Cs),
		os('fill', 'cellColor'),
		(is.prototype.char = function (t) {
			if (void 0 === t) return this.G.state.vn.rn;
			const i = 'number' == typeof t ? this.font.characters[t].character : t;
			if (0 === i.length) throw new Error('char() requires at least one character.');
			(this.G.state.vn.An(this.font.jt(i)), this.G.state.vn.Cn(i));
		}),
		(is.prototype.flipX = function (t) {
			if (void 0 === t) return this.G.state.vn.un;
			this.G.state.vn.En(t);
		}),
		(is.prototype.flipY = function (t) {
			if (void 0 === t) return this.G.state.vn.ln;
			this.G.state.vn.Fn(t);
		}),
		(is.prototype.charRotation = function (t) {
			if (void 0 === t) return 360 * this.G.state.vn._n;
			this.G.state.vn.Pn(t);
		}),
		(is.prototype.invert = function (t) {
			if (void 0 === t) return this.G.state.vn.dn;
			this.G.state.vn.Tn(t);
		}),
		(is.prototype.ambientLight = function (t, i, e, s) {
			const [r, n, h] = Vi.Gc(t, i, e, s).normalized;
			this.G.state.We.Zr(r, n, h);
		}),
		(is.prototype.pointLight = function (t, i, e, s, r, n) {
			let h, o;
			if ('number' == typeof t && 'number' == typeof i && 'number' == typeof e)
				if (((h = Vi.Gc(t, i, e)), xs(s))) o = s;
				else {
					if ('number' != typeof s || 'number' != typeof r || 'number' != typeof n)
						throw new Error('pointLight() expected RGB + XYZ or RGB + { x, y, z }.');
					o = { x: s, y: r, z: n };
				}
			else if (((h = Vi.Gc(t)), xs(i))) o = i;
			else {
				if ('number' != typeof i || 'number' != typeof e || 'number' != typeof s)
					throw new Error('pointLight() expected color + XYZ or color + { x, y, z }.');
				o = { x: i, y: e, z: s };
			}
			const [a, c, u] = h.normalized;
			this.G.state.We.qr(a, c, u, o.x, o.y, o.z);
		}),
		(is.prototype.lightFalloff = function (t, i, e) {
			this.G.state.We.Jr(t, i, e);
		}),
		(is.prototype.noLights = function () {
			this.G.state.We.tn();
		}),
		(is.prototype.shader = function (t) {
			this.G.Ga(t);
		}),
		(is.prototype.resetShader = function () {
			this.G.Va();
		}),
		(is.prototype.setUniform = function (t, i) {
			this.G.ar(t, i);
		}),
		(is.prototype.setUniforms = function (t) {
			this.G.es(t);
		}),
		(is.prototype.createMaterialShader = async function (t) {
			const i = await ke(t),
				e = this.G.Ya(i);
			return (this.$m(e), e);
		}),
		(is.prototype.createShader = async function (t, i) {
			const e = await ke(t),
				s = await ke(i),
				r = this.G.rr(e, s);
			return (this.$m(r), r);
		}));
	var Ss = class t extends Wi {
			Yt;
			constructor(t, i, e, s, r, n, h, o, a, c) {
				(super(t, i, e, s, r, n, h, o, c), (this.Yt = a));
			}
			static og(i, e, s, r, n, h) {
				const o = i.context,
					{ texture: a, width: c, height: u } = pt(o, s);
				return new t(o, i, a, e, c, u, r, n, s, h);
			}
			Z() {
				this.Yt instanceof HTMLVideoElement
					? this.Yt.readyState >= this.Yt.HAVE_CURRENT_DATA && _t(this.Es, this.Gn, this.Yt)
					: _t(this.Es, this.Gn, this.Yt);
			}
			Vs() {
				return (this.el(), super.Vs());
			}
			qa() {
				return (this.el(), super.qa());
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
		Es = class t extends Ss {
			constructor(t, i, e, s, r, n, h, o, a, c) {
				super(t, i, e, s, n, h, o, a, r, c);
			}
			dispose() {
				(super.dispose(), this.ag.pause(), (this.ag.src = ''), this.ag.load());
			}
			static async cg(t) {
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
									s(new Error(`Failed to load video: ${i.error?.message || 'Unknown error'}`));
								},
								{ once: !0 }
							),
							(i.src = t));
					}),
					i
				);
			}
			static og(i, e, s, r, n, h) {
				const o = i.context,
					{
						texture: a,
						width: c,
						height: u,
					} = pt(o, s, o.LINEAR, o.LINEAR, o.CLAMP_TO_EDGE, o.CLAMP_TO_EDGE);
				return new t(o, i, a, e, s, c, u, r, n, h);
			}
			static async rl(i, e, s, r, n, h) {
				const o = await t.cg(s);
				return t.og(i, e, o, r, n, h);
			}
			async play() {
				await this.ag.play();
			}
			pause() {
				this.ag.pause();
			}
			stop() {
				(this.ag.pause(), (this.ag.currentTime = 0));
			}
			speed(t) {
				return ((this.ag.playbackRate = t), this);
			}
			loop(t = !0) {
				return ((this.ag.loop = t), this);
			}
			time(t) {
				return ((this.ag.currentTime = t), this);
			}
			volume(t) {
				return ((this.ag.volume = H(t, 0, 1)), this);
			}
			get videoElement() {
				return this.ag;
			}
			get currentTime() {
				return this.ag.currentTime;
			}
			get duration() {
				return this.ag.duration;
			}
			get isPlaying() {
				return !this.ag.paused && !this.ag.ended;
			}
			get ag() {
				return this.Yt;
			}
		};
	((is.prototype.createFramebuffer = function (t) {
		const i = this.G.W(t.width ?? this.grid.cols, t.height ?? this.grid.rows, t.attachments ?? 3);
		return (this.$m(i), i);
	}),
		(is.prototype.image = function (t, i, e) {
			(this.G.Wa(t, i, e, this.font), t instanceof wt && this.G.Hs());
		}),
		(is.prototype.loadImage = async function (t) {
			const i = t,
				e = new Promise((t, e) => {
					const s = new Image();
					((s.crossOrigin = 'anonymous'), (s.onload = () => t(s)), (s.onerror = (t) => e(t)), (s.src = i));
				}),
				[s] = await Promise.all([e, this.Lm]),
				r = this.grid;
			if (!r) throw new Error('[textmode.js] Cannot load image before grid initialization completes.');
			const n = Zi.rl(this.G, this.gm, s, r.cols, r.rows, this.Ym);
			return (this.$m(n), n);
		}),
		(is.prototype.loadVideo = async function (t) {
			const [i] = await Promise.all([Es.cg(t), this.Lm]),
				e = this.grid;
			if (!e) throw new Error('[textmode.js] Cannot load video before grid initialization completes.');
			const s = Es.og(this.G, this.gm, i, e.cols, e.rows, this.Ym);
			return (this.$m(s), s);
		}),
		(is.prototype.createTexture = function (t) {
			const i = this.grid,
				e = Ss.og(this.G, this.gm, t, i?.cols ?? 1, i?.rows ?? 1, this.Ym);
			return (this.$m(e), e);
		}),
		(is.prototype.texture = function (t) {
			if (t instanceof wt) return void this.G.state.Gn.Nn(t);
			if (!(t instanceof Wi))
				throw new n(
					'[textmode.js] texture() expects a TextmodeImage, TextmodeVideo, TextmodeTexture, or TextmodeFramebuffer source.',
					{ method: 'texture', providedValue: t }
				);
			const i = t.il(this.font);
			(t.Ja() && this.G.Ha(t), this.G.state.Gn.In(i));
		}),
		(is.prototype.noTexture = function () {
			this.G.state.Gn.jn();
		}));
	var Fs = {
		BLEND_NORMAL: O.NORMAL,
		BLEND_ADDITIVE: O.ADDITIVE,
		BLEND_MULTIPLY: O.MULTIPLY,
		BLEND_SCREEN: O.SCREEN,
		BLEND_SUBTRACT: O.SUBTRACT,
		BLEND_DARKEN: O.DARKEN,
		BLEND_LIGHTEN: O.LIGHTEN,
		BLEND_OVERLAY: O.OVERLAY,
		BLEND_SOFT_LIGHT: O.SOFT_LIGHT,
		BLEND_HARD_LIGHT: O.HARD_LIGHT,
		BLEND_COLOR_DODGE: O.COLOR_DODGE,
		BLEND_COLOR_BURN: O.COLOR_BURN,
		BLEND_DIFFERENCE: O.DIFFERENCE,
		BLEND_EXCLUSION: O.EXCLUSION,
	};
	for (const [Zs, qs] of Object.entries(Fs))
		Object.defineProperty(is.prototype, Zs, { configurable: !0, enumerable: !1, value: qs, writable: !1 });
	((is.prototype.on = function (t, i) {
		return this._m.Rl(t, i);
	}),
		(is.prototype.off = function (t, i) {
			this._m.Ol(t, i);
		}),
		(is.prototype.once = function (t, i) {
			return this._m.Bl(t, i);
		}),
		(is.prototype.random = function (t, i) {
			return Array.isArray(t)
				? this.Em.random(t)
				: 'number' != typeof t
					? this.Em.random()
					: 'number' != typeof i
						? this.Em.random(t)
						: this.Em.random(t, i);
		}),
		(is.prototype.randomGaussian = function (t, i) {
			return this.Em.randomGaussian(t, i);
		}),
		(is.prototype.randomSeed = function (t) {
			((this.Fm = Ve(t)), this.Em.randomSeed(t), this.Tm.clear(), this.Pm.noiseSeed(Xe(this.Fm, 'noise')));
		}),
		(is.prototype.randomStream = function (t) {
			const i = String(t),
				e = this.Tm.get(i);
			if (e) return e;
			const s = new Ke(Xe(this.Fm, i));
			return (this.Tm.set(i, s), s);
		}),
		(is.prototype.noise = function (t, i, e) {
			return this.Pm.noise(t, i, e);
		}),
		(is.prototype.noiseSeed = function (t) {
			this.Pm.noiseSeed(t);
		}),
		(is.prototype.noiseDetail = function (t, i) {
			this.Pm.noiseDetail(t, i);
		}));
	var Us = class t {
		x;
		y;
		z;
		constructor(t = 0, i = 0, e = 0) {
			((this.x = t), (this.y = i), (this.z = e));
		}
		set(t, i, e) {
			return Ts(t)
				? ((this.x = t.x), (this.y = t.y), (this.z = t.z ?? 0), this)
				: Ps(t)
					? ((this.x = t[0] ?? 0), (this.y = t[1] ?? 0), (this.z = t[2] ?? 0), this)
					: ((this.x = t ?? 0), (this.y = i ?? 0), (this.z = e ?? 0), this);
		}
		copy() {
			return new t(this.x, this.y, this.z);
		}
		add(t, i, e) {
			const [s, r, n] = Ds(t, i, e);
			return ((this.x += s), (this.y += r), (this.z += n), this);
		}
		sub(t, i, e) {
			const [s, r, n] = Ds(t, i, e);
			return ((this.x -= s), (this.y -= r), (this.z -= n), this);
		}
		mult(t, i, e) {
			const [s, r, n] = ks(t, i, e);
			return ((this.x *= s), (this.y *= r), (this.z *= n), this);
		}
		div(t, i, e) {
			const [s, r, n] = ks(t, i, e);
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
			const [s, r, n] = Ls(t, i, e);
			return Math.hypot(this.x - s, this.y - r, this.z - n);
		}
		dot(t, i, e) {
			const [s, r, n] = Ls(t, i, e);
			return this.x * s + this.y * r + this.z * n;
		}
		cross(i, e, s) {
			const [r, n, h] = Ls(i, e, s);
			return new t(this.y * h - this.z * n, this.z * r - this.x * h, this.x * n - this.y * r);
		}
		heading() {
			return j(Math.atan2(this.y, this.x));
		}
	};
	function Ts(t) {
		return (
			'object' == typeof t &&
			null !== t &&
			'x' in t &&
			'y' in t &&
			'number' == typeof t.x &&
			'number' == typeof t.y
		);
	}
	function Ps(t) {
		return Array.isArray(t);
	}
	function Ls(t, i, e) {
		return Ts(t) ? [t.x, t.y, t.z ?? 0] : Ps(t) ? [t[0] ?? 0, t[1] ?? 0, t[2] ?? 0] : [t ?? 0, i ?? 0, e ?? 0];
	}
	function Ds(t, i, e) {
		return Ls(t, i, e);
	}
	function ks(t, i, e) {
		if (Ts(t)) return [t.x, t.y, t.z ?? 1];
		if (Ps(t)) {
			if (1 === t.length) {
				const i = t[0] ?? 1;
				return [i, i, i];
			}
			return [t[0] ?? 1, t[1] ?? 1, t[2] ?? 1];
		}
		return void 0 !== t && void 0 === i && void 0 === e ? [t, t, t] : [t ?? 1, i ?? 1, e ?? 1];
	}
	((is.prototype.sin = Math.sin),
		(is.prototype.cos = Math.cos),
		(is.prototype.tan = Math.tan),
		(is.prototype.asin = Math.asin),
		(is.prototype.acos = Math.acos),
		(is.prototype.atan = Math.atan),
		(is.prototype.atan2 = Math.atan2),
		(is.prototype.floor = Math.floor),
		(is.prototype.ceil = Math.ceil),
		(is.prototype.round = function (t, i = 0) {
			if (i <= 0) return Math.round(t);
			const e = Math.pow(10, i);
			return Math.round(t * e) / e;
		}),
		(is.prototype.abs = Math.abs),
		(is.prototype.min = function (...t) {
			const i = Array.isArray(t[0]) ? t[0] : t;
			return Math.min(...i);
		}),
		(is.prototype.max = function (...t) {
			const i = Array.isArray(t[0]) ? t[0] : t;
			return Math.max(...i);
		}),
		(is.prototype.sq = function (t) {
			return t * t;
		}),
		(is.prototype.sqrt = Math.sqrt),
		(is.prototype.pow = Math.pow),
		(is.prototype.fract = function (t) {
			return t - Math.floor(t);
		}),
		(is.prototype.exp = Math.exp),
		(is.prototype.log = Math.log),
		(is.prototype.lerp = function (t, i, e) {
			return t + (i - t) * e;
		}),
		(is.prototype.ease = function (t, i) {
			return (function (t, i) {
				const e = W[t];
				if (!e) throw new Error(`Unknown easing function "${t}". Available easing functions: ${G.join(', ')}.`);
				return e(
					(function (t) {
						return Number.isNaN(t) ? 0 : t === 1 / 0 ? 1 : t === -1 / 0 ? 0 : H(t, 0, 1);
					})(i)
				);
			})(t, i);
		}),
		(is.prototype.map = function (t, i, e, s, r) {
			return s + ((r - s) * (t - i)) / (e - i);
		}),
		(is.prototype.norm = function (t, i, e) {
			return this.map(t, i, e, 0, 1);
		}),
		(is.prototype.constrain = function (t, i, e) {
			return H(t, i, e);
		}),
		(is.prototype.clamp = function (t, i, e) {
			return H(t, i, e);
		}),
		(is.prototype.dist = function (t, i, e, s) {
			return z(t, i, e, s);
		}),
		(is.prototype.degrees = function (t) {
			return j(t);
		}),
		(is.prototype.radians = function (t) {
			return N(t);
		}),
		(is.prototype.createVector = function (t = 0, i = 0, e = 0) {
			return new Us(t, i, e);
		}));
	var Rs = class t {
		ug;
		characters;
		length;
		constructor(t) {
			const i = F(t);
			if (i.length < 2) throw new Error('TextmodeGlyphRamp requires at least two characters.');
			((this.characters = t), (this.length = i.length), (this.ug = i));
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
			return this.ug[r];
		}
		shift(i) {
			const e = ((Math.trunc(i) % this.length) + this.length) % this.length,
				s = [...this.ug.slice(e), ...this.ug.slice(0, e)].join('');
			return new t(s);
		}
	};
	is.prototype.createGlyphRamp = function (t) {
		return new Rs(t);
	};
	var Os = {
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
		Bs = ti.FLOATS_PER_INSTANCE,
		Is = $t[Xt.RECTANGLE];
	function Ns(t) {
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
	function js(t, i, e, s, r) {
		let n = new Float32Array(Math.max(16, Math.min(t.length, 256)) * Bs);
		const h = [],
			o = [],
			a = (function (t) {
				const i = t.G.state.vn;
				return {
					fg: [Hs(i.nn)],
					bg: [Hs(i.hn)],
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
				if (t * Bs <= n.length) return;
				let i = n.length / Bs;
				for (; i < t;) i *= 2;
				const e = new Float32Array(i * Bs);
				(e.set(n), (n = e));
			})(u + 1);
			const i = u * Bs,
				s = c.jt(t),
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
				(n[i + 35] = Is),
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
							const e = Ns(t.substring(_ + 1, i));
							if (e) {
								(Qs(e, a), (_ = i + 1));
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
	function Qs(t, i) {
		'fg' === t.kind
			? zs(i.fg, t.value)
			: '/fg' === t.kind
				? Gs(i.fg)
				: 'bg' === t.kind
					? zs(i.bg, t.value)
					: '/bg' === t.kind
						? Gs(i.bg)
						: 'inv' === t.kind
							? i.invert.push(!0)
							: '/inv' === t.kind
								? Gs(i.invert)
								: 'fx' === t.kind
									? i.flipX.push(!0)
									: '/fx' === t.kind
										? Gs(i.flipX)
										: 'fy' === t.kind
											? i.flipY.push(!0)
											: '/fy' === t.kind
												? Gs(i.flipY)
												: 'rot' === t.kind
													? i.charRotation.push(
															void 0 === t.value
																? i.charRotation[i.charRotation.length - 1]
																: Z(t.value)
														)
													: '/rot' === t.kind && Gs(i.charRotation);
	}
	function zs(t, i) {
		const e = Os[i.toLowerCase()] || i;
		try {
			t.push([(s = Vi.Gc(e)).r / 255, s.g / 255, s.b / 255, s.a / 255]);
		} catch {
			t.push(t[t.length - 1]);
		}
		var s;
	}
	function Hs(t) {
		return [t[0], t[1], t[2], t[3]];
	}
	function Gs(t) {
		t.length > 1 && t.pop();
	}
	((is.prototype.printAlign = function (t, i = 'top') {
		((this.lg = t), (this.dg = i));
	}),
		(is.prototype.print = function (t, i, e, s) {
			const r = s?.leading ?? 1,
				n = s?.tabSize ?? 4,
				h = s?.letterSpacing ?? 0,
				o = !1 !== s?.markup,
				a = this.lg || 'left',
				c = this.dg || 'top',
				u = js.call(this, t, o, r, n, h);
			0 !== u.glyphCount &&
				((function (t, i, e, s, r, n, h) {
					const { data: o, glyphLines: a, glyphCount: c, lineWidths: u } = i,
						l = u.length;
					let f = 0;
					'middle' === n ? (f = -Math.floor(((l - 1) * h) / 2)) : 'bottom' === n && (f = -(l - 1) * h);
					const d = t.G.state.Hn,
						_ = d.wr,
						p = d.gr,
						m = d.vr,
						g = d._r,
						v = d.pr,
						y = d.mr;
					for (let w = 0; w < c; w++) {
						const t = w * Bs,
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
							(o[t + 22] = g),
							(o[t + 23] = v),
							(o[t + 24] = y));
					}
				})(this, u, i, e, a, c, r),
				this.G.$o(u.data, u.glyphCount));
		}));
	var Vs = e({
			TextmodeImage: () => Zi,
			TextmodeSource: () => Wi,
			TextmodeTexture: () => Ss,
			TextmodeVideo: () => Es,
		}),
		Xs = e({
			INPUT_EVENT_NAMES: () => he,
			gamepad: () => fs,
			keyboard: () => ls,
			mouse: () => cs,
			touch: () => us,
		}),
		$s = e({}),
		Ys = es.create,
		Ks = es.setErrorLevel,
		Ws = es.version;
	((t.ErrorLayerController = ut),
		(t.INPUT_EVENT_NAMES = he),
		(t.LayerBlendMode = O),
		(t.LoadingLayerController = Te),
		(t.ShapeAssemblyMode = ds),
		(t.TEXTMODE_EASE_NAMES = G),
		(t.TextmodeCamera = et),
		(t.TextmodeConversionManager = Qe),
		(t.TextmodeError = n),
		(t.TextmodeErrorLevel = tt),
		(t.TextmodeFilterManager = Re),
		(t.TextmodeFont = L),
		(t.TextmodeFramebuffer = wt),
		(t.TextmodeGlyphRamp = Rs),
		(t.TextmodeGrid = s),
		(t.TextmodeImage = Zi),
		(t.TextmodeLayer = nt),
		(t.TextmodeLayerManager = Be),
		(t.TextmodeRandom = Ke),
		(t.TextmodeShader = Mt),
		(t.TextmodeSource = Wi),
		(t.TextmodeTexture = Ss),
		(t.TextmodeTileset = k),
		(t.TextmodeVector = Us),
		(t.TextmodeVideo = Es),
		(t.Textmodifier = is),
		Object.defineProperty(t, 'color', {
			enumerable: !0,
			get: function () {
				return ts;
			},
		}),
		Object.defineProperty(t, 'conversion', {
			enumerable: !0,
			get: function () {
				return ze;
			},
		}),
		(t.create = Ys),
		Object.defineProperty(t, 'errors', {
			enumerable: !0,
			get: function () {
				return lt;
			},
		}),
		Object.defineProperty(t, 'filters', {
			enumerable: !0,
			get: function () {
				return Oe;
			},
		}),
		Object.defineProperty(t, 'fonts', {
			enumerable: !0,
			get: function () {
				return R;
			},
		}),
		Object.defineProperty(t, 'input', {
			enumerable: !0,
			get: function () {
				return Xs;
			},
		}),
		Object.defineProperty(t, 'layering', {
			enumerable: !0,
			get: function () {
				return Ie;
			},
		}),
		Object.defineProperty(t, 'loading', {
			enumerable: !0,
			get: function () {
				return Pe;
			},
		}),
		Object.defineProperty(t, 'media', {
			enumerable: !0,
			get: function () {
				return Vs;
			},
		}),
		Object.defineProperty(t, 'plugins', {
			enumerable: !0,
			get: function () {
				return $s;
			},
		}),
		Object.defineProperty(t, 'random', {
			enumerable: !0,
			get: function () {
				return We;
			},
		}),
		(t.setErrorLevel = Ks),
		(t.textmode = es),
		(t.version = Ws));
});
