(self.webpackJsonp = self.webpackJsonp || []).push([
    ["manifests/pricing", "application"], {
        "./app/javascript/application.js": function (t, e, s) {
            "use strict";
            s.r(e);
            s("./node_modules/@shopify/polyfills/dist/src/base.js");
            var n = s("./node_modules/jquery/dist/jquery.js"),
                a = s.n(n),
                i = s("./node_modules/@shopify/marketing-assets/dist/javascripts/index.js");
            const o = "Domain Selector",
                r = "noredirect",
                l = "/domain-services/suggest",
                c = {
                    button: ".js-domain-selector-button",
                    select: ".js-domain-selector-select"
                };
            class p extends i.Announcement {
                close() {
                    super.close(), i.analytics.track(o, "closed", "".concat(window.location.host, ":").concat(navigator.language.toLowerCase()))
                }
            }
            var d = class {
                constructor(t) {
                    if (this.$el = t, this.$button = this.$el.querySelector(c.button), this.$select = this.$el.querySelector(c.select), !this.$button || !this.$select) throw new Error("Domain selector passed incorrect element")
                }
                async init() {
                    if (i.cookieHelper.get(r)) return;
                    const t = await this.suggestions(),
                        e = "".concat(window.location.host, ":").concat(navigator.language.toLowerCase());
                    t.length && (this.populateOptions(t), this.bindListeners(), this.announcement = new p(this.$el, {
                        cookieName: r
                    }), i.analytics.track(o, "shown", e, void 0, !0))
                }
                bindListeners() {
                    this.$button.addEventListener("click", t => {
                        t.preventDefault();
                        const e = new URL(this.$select.value);
                        i.analytics.track(o, "accepted", "".concat(window.location.host, ":").concat(e.host)), window.location.href = e.toString()
                    })
                }
                populateOptions(t) {
                    this.$select.innerHTML = "";
                    const e = document.createDocumentFragment();
                    t.forEach(t => {
                        const s = document.createElement("option");
                        s.innerHTML = t.display, s.value = t.url, e.appendChild(s)
                    }), this.$select.appendChild(e)
                }
                async suggestions() {
                    const t = await fetch(l, {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        },
                        method: "POST",
                        body: JSON.stringify({
                            path: window.location.pathname
                        })
                    });
                    if (200 !== t.status) throw new Error("Domain suggestion request failed with status ".concat(t.status));
                    const e = await t.json();
                    if (!e.suggested) throw new Error("Domain suggestion request returned incorrect data");
                    return e.suggested
                }
            };
            window.App = window.App || {}, window.ShopifyMarketing = window.ShopifyMarketing || {}, window.jQuery = a.a, App.config && App.config.signupHost && i.config.set("SignupBaseURI", "https://".concat(App.config.signupHost)), i.config.set("customGoogleAnalyticsNamespace", "_other"), Object(i.init)(), App.scrollTo = new i.ScrollTo({
                offset: -a()("#ShopifyMainNav").height(),
                $selector: a()(".link-scroll-to")
            }), a()("body").hasClass("page--home") || new i.Video(a()(".background-video")), new i.StickyNav;
            const h = document.querySelector(".js-domain-selector");
            if (h) {
                new d(h).init()
            }
        },
        "./app/javascript/manifests/pricing.js": function (t, e, s) {
            "use strict";
            s.r(e);
            var n = s("./node_modules/@shopify/marketing-assets/dist/javascripts/index.js"),
                a = s("./app/javascript/modules/pricing-table.js");
            s("./app/javascript/application.js");
            ! function () {
                function t() {
                    this.initFaq(), new a.a
                }
                t.prototype.initFaq = function () {
                    new n.Accordion(document.querySelector(".pricing-faq"))
                }, new t
            }()
        },
        "./app/javascript/modules/pricing-table.js": function (t, e, s) {
            "use strict";
            s.d(e, "a", (function () {
                return l
            }));
            var n = s("./node_modules/jquery/dist/jquery.js"),
                a = s.n(n),
                i = s("./node_modules/enquire.js/src/index.js"),
                o = s.n(i),
                r = s("./node_modules/@shopify/marketing-assets/dist/javascripts/index.js");
            class l {
                constructor() {
                    o.a.register(r.Breakpoints.prototype.phone, {
                        setup: this.initPlansTable.bind(this),
                        deferSetup: !0
                    })
                }
                initPlansTable() {
                    this.$plansTable = a()(".pricing-table"), this.$plansTable.length && (this.$planTabs = a()(".plan-tabs__tab"), this.$planArrowsWrapper = a()(".plan-arrows"), this.$tableHeaders = this.$plansTable.find("thead th"), this.goToPlan = this.goToPlan.bind(this), this.updatePlanControlState = this.updatePlanControlState.bind(this), this._onPlanControlClick = this._onPlanControlClick.bind(this), this.$planTabs.on("click", this._onPlanControlClick), this.$planArrowsWrapper.on("click", ".plan-arrow", this._onPlanControlClick), o.a.register(r.Breakpoints.prototype.phone, {
                        match: this.toggleHeaderColspan.bind(this, !0),
                        unmatch: this.toggleHeaderColspan.bind(this, !1)
                    }), new r.ScrollTo({
                        $selector: a()(".link-scroll-to"),
                        offset: -a()("#ShopifyMainNav").height()
                    }), this.goToPlan(1))
                }
                toggleHeaderColspan(t) {
                    t ? this.$tableHeaders.attr("colspan", 2) : this.$tableHeaders.removeAttr("colspan")
                }
                goToPlan(t) {
                    const e = '[headers*="p-'.concat(t, '"], #p-').concat(t);
                    this.$plansTable.find('[headers*="p-"], [id*="p-"]').addClass("js-is-hidden"), this.$plansTable.find(e).removeClass("js-is-hidden"), this.updatePlanControlState(t)
                }
                updatePlanControlState(t) {
                    // const e = t + 1 < this.$planTabs.length ? t + 1 : 0,
                    //     s = t - 1 >= 0 ? t - 1 : this.$planTabs.length - 1,
                    //     n = this.$planArrowsWrapper.attr("data-arrow-label"),
                    //     a = n.replace("{{plan}}", this.$planTabs.eq(e).data("plan-name")),
                    //     i = n.replace("{{plan}}", this.$planTabs.eq(s).data("plan-name"));
                    // this.$planTabs.removeClass("js-is-active").attr("aria-pressed", !1), this.$planTabs.eq(t).addClass("js-is-active").attr("aria-pressed", !0), this.$planArrowsWrapper.find(".plan-arrow--next").data("target-index", e).find(".plan-arrow__name").text(a), this.$planArrowsWrapper.find(".plan-arrow--prev").data("target-index", s).find(".plan-arrow__name").text(i)
                }
                _onPlanControlClick(t) {
                    const e = a()(t.currentTarget).data("target-index");
                    this.goToPlan(e)
                }
            }
        }
    },
    [
        ["./app/javascript/manifests/pricing.js", "runtime", "vendor"]
    ]
]);
//# sourceMappingURL=pricing-434c02698403d8e023fd71832497c1d25ff52e244d8bdbbac7285534f328dc43.js.map