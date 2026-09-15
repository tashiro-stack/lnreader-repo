var t =
    (this && this.__awaiter) ||
    function (t, e, n, r) {
      return new (n || (n = Promise))(function (i, o) {
        function a(t) {
          try {
            s(r.next(t));
          } catch (t) {
            o(t);
          }
        }
        function c(t) {
          try {
            s(r.throw(t));
          } catch (t) {
            o(t);
          }
        }
        function s(t) {
          var e;
          t.done
            ? i(t.value)
            : ((e = t.value),
              e instanceof n
                ? e
                : new n(function (t) {
                    t(e);
                  })).then(a, c);
        }
        s((r = r.apply(t, e || [])).next());
      });
    },
  e =
    (this && this.__generator) ||
    function (t, e) {
      var n,
        r,
        i,
        o = {
          label: 0,
          sent: function () {
            if (1 & i[0]) throw i[1];
            return i[1];
          },
          trys: [],
          ops: [],
        },
        a = Object.create(
          ('function' == typeof Iterator ? Iterator : Object).prototype,
        );
      return (
        (a.next = c(0)),
        (a.throw = c(1)),
        (a.return = c(2)),
        'function' == typeof Symbol &&
          (a[Symbol.iterator] = function () {
            return this;
          }),
        a
      );
      function c(c) {
        return function (s) {
          return (function (c) {
            if (n) throw new TypeError('Generator is already executing.');
            for (; a && ((a = 0), c[0] && (o = 0)), o; )
              try {
                if (
                  ((n = 1),
                  r &&
                    (i =
                      2 & c[0]
                        ? r.return
                        : c[0]
                          ? r.throw || ((i = r.return) && i.call(r), 0)
                          : r.next) &&
                    !(i = i.call(r, c[1])).done)
                )
                  return i;
                switch (((r = 0), i && (c = [2 & c[0], i.value]), c[0])) {
                  case 0:
                  case 1:
                    i = c;
                    break;
                  case 4:
                    return o.label++, { value: c[1], done: !1 };
                  case 5:
                    o.label++, (r = c[1]), (c = [0]);
                    continue;
                  case 7:
                    (c = o.ops.pop()), o.trys.pop();
                    continue;
                  default:
                    if (
                      !((i = o.trys),
                      (i = i.length > 0 && i[i.length - 1]) ||
                        (6 !== c[0] && 2 !== c[0]))
                    ) {
                      o = 0;
                      continue;
                    }
                    if (3 === c[0] && (!i || (c[1] > i[0] && c[1] < i[3]))) {
                      o.label = c[1];
                      break;
                    }
                    if (6 === c[0] && o.label < i[1]) {
                      (o.label = i[1]), (i = c);
                      break;
                    }
                    if (i && o.label < i[2]) {
                      (o.label = i[2]), o.ops.push(c);
                      break;
                    }
                    i[2] && o.ops.pop(), o.trys.pop();
                    continue;
                }
                c = e.call(t, o);
              } catch (t) {
                (c = [6, t]), (r = 0);
              } finally {
                n = i = 0;
              }
            if (5 & c[0]) throw c[1];
            return { value: c[0] ? c[1] : void 0, done: !0 };
          })([c, s]);
        };
      }
    };
Object.defineProperty(exports, '__esModule', { value: !0 });
var n = require('@libs/fetch'),
  r = require('cheerio'),
  i = (function () {
    function i() {
      (this.id = 'nocsyosetu'),
        (this.name = 'Nocturne Novels'),
        (this.icon = 'https://noc.syosetu.com/favicon.ico'),
        (this.site = 'https://noc.syosetu.com'),
        (this.version = '1.0.0');
    }
    return (
      (i.prototype.popularNovels = function (i) {
        return t(this, void 0, void 0, function () {
          var t, o, a;
          return e(this, function (e) {
            switch (e.label) {
              case 0:
                return [
                  4,
                  (0, n.fetchApi)(
                    ''.concat(this.site, '/top/top/?p=').concat(i),
                  ),
                ];
              case 1:
                return [4, e.sent().text()];
              case 2:
                return (
                  (t = e.sent()),
                  (o = (0, r.parseHTML)(t)),
                  (a = []),
                  o('.novel_list').each(function (t, e) {
                    var n = o(e).find('a.title').attr('href'),
                      r = o(e).find('a.title').text().trim();
                    n && a.push({ name: r, url: n });
                  }),
                  [2, a]
                );
            }
          });
        });
      }),
      (i.prototype.parseSearch = function (i, o) {
        return t(this, void 0, void 0, function () {
          var t, a, c;
          return e(this, function (e) {
            switch (e.label) {
              case 0:
                return [
                  4,
                  (0, n.fetchApi)(
                    ''
                      .concat(this.site, '/search/?word=')
                      .concat(encodeURIComponent(i), '&p=')
                      .concat(o),
                  ),
                ];
              case 1:
                return [4, e.sent().text()];
              case 2:
                return (
                  (t = e.sent()),
                  (a = (0, r.parseHTML)(t)),
                  (c = []),
                  a('.novel_list').each(function (t, e) {
                    var n = a(e).find('a.title').attr('href'),
                      r = a(e).find('a.title').text().trim();
                    n && c.push({ name: r, url: n });
                  }),
                  [2, c]
                );
            }
          });
        });
      }),
      (i.prototype.parseNovel = function (i) {
        return t(this, void 0, void 0, function () {
          var t, o, a, c;
          return e(this, function (e) {
            switch (e.label) {
              case 0:
                return [4, (0, n.fetchApi)(this.site + i)];
              case 1:
                return [4, e.sent().text()];
              case 2:
                return (
                  (t = e.sent()),
                  (o = (0, r.parseHTML)(t)),
                  (a = {
                    url: i,
                    title: o('.novel_title').text().trim(),
                    summary: o('#novel_ex').text().trim(),
                    chapters: [],
                  }),
                  (c = []),
                  o('.index_box .dl_list').each(function (t, e) {
                    var n = o(e).find('a').attr('href'),
                      r = o(e).find('a').text().trim();
                    n && c.push({ name: r, url: n, chapterNumber: t + 1 });
                  }),
                  (a.chapters = c),
                  [2, a]
                );
            }
          });
        });
      }),
      (i.prototype.parseChapter = function (i) {
        return t(this, void 0, void 0, function () {
          var t;
          return e(this, function (e) {
            switch (e.label) {
              case 0:
                return [4, (0, n.fetchApi)(this.site + i)];
              case 1:
                return [4, e.sent().text()];
              case 2:
                return (
                  (t = e.sent()),
                  [2, (0, r.parseHTML)(t)('#novel_honbun').html() || '']
                );
            }
          });
        });
      }),
      i
    );
  })();
exports.default = new i();
