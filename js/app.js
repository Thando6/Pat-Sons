(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var C = window.CONFIG, MENU = window.MENU, GAL = window.GALLERY, CATS = window.CATS;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function store(k, v) { try { if (v === undefined) return JSON.parse(localStorage.getItem(k)); localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  /* ---------- theme ---------- */
  var root = document.documentElement;
  var th = store("pat-theme"); if (th) root.setAttribute("data-theme", th);
  $("#theme").addEventListener("click", function () {
    var dark = root.getAttribute("data-theme") ? root.getAttribute("data-theme") === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    var n = dark ? "light" : "dark"; root.setAttribute("data-theme", n); store("pat-theme", n);
  });

  /* ---------- reveal on scroll ---------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); if (e.target.dataset.count) count(e.target); io.unobserve(e.target); } });
  }, { threshold: .15 }) : null;
  function watch(el) { if (io) io.observe(el); else el.classList.add("in"); }
  $$(".reveal").forEach(watch);
  $$("[data-count]").forEach(watch);
  function count(el) {
    var to = +el.dataset.count, pre = el.dataset.pre || "", t0 = null;
    if (reduce) { el.textContent = pre + to; return; }
    (function step(t) { if (!t0) t0 = t; var p = Math.min((t - t0) / 1200, 1); el.textContent = pre + Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); })(performance.now());
  }

  /* ---------- progress bar, active nav link ---------- */
  var bar = $("#bar"), links = $$("nav .links a");
  var secs = links.map(function (a) { return $(a.getAttribute("href")); });
  var tick = false;
  addEventListener("scroll", function () {
    if (tick) return; tick = true;
    requestAnimationFrame(function () {
      var h = document.documentElement; bar.style.transform = "scaleX(" + (h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) + ")";
      var y = h.scrollTop + 120;
      links.forEach(function (a, i) { var s = secs[i]; a.classList.toggle("on", !!s && s.offsetTop <= y && s.offsetTop + s.offsetHeight > y); });
      tick = false;
    });
  }, { passive: true });

  /* ---------- hero tilt ---------- */
  var tilt = $("#tilt");
  if (!reduce && matchMedia("(hover:hover)").matches) {
    tilt.parentNode.addEventListener("pointermove", function (e) {
      var r = tilt.getBoundingClientRect();
      tilt.style.setProperty("--ry", ((e.clientX - r.left) / r.width - .5) * 14 + "deg");
      tilt.style.setProperty("--rx", -((e.clientY - r.top) / r.height - .5) * 14 + "deg");
    });
    tilt.parentNode.addEventListener("pointerleave", function () { tilt.style.setProperty("--rx", "0deg"); tilt.style.setProperty("--ry", "0deg"); });
  }

  /* ---------- ticker ---------- */
  var tk = "<span>R6 PLAIN</span><span>&#9670;</span><span>R10 RUSSIAN</span><span>&#9670;</span><span>R12 LIVER &amp; PATTIE</span><span>&#9670;</span><span>R15 PAT BREAKFAST</span><span>&#9670;</span><span>R20 FULL HOUSE &amp; KOTA</span><span>&#9670;</span>";
  $("#ticker").innerHTML = tk + tk;

  /* ---------- open now badge ---------- */
  if (C.openDays && C.openDays.length) {
    var now = new Date(), isOpen = C.openDays.indexOf(now.getDay()) > -1 && now.getHours() >= C.openHour && now.getHours() < C.closeHour;
    var b = $("#open"); b.hidden = false; b.classList.toggle("off", !isOpen);
    $("span", b).textContent = isOpen ? "Open now" + (C.hoursText ? " | " + C.hoursText : "") : "Closed now" + (C.hoursText ? " | " + C.hoursText : "");
  }

  /* ---------- contact ---------- */
  if (C.whatsapp || C.phone || C.hoursText) {
    var h = "";
    if (C.whatsapp) h += '<a class="btn" href="https://wa.me/' + C.whatsapp + '">WhatsApp us</a>';
    if (C.phone) h += '<p><b>Call:</b> <a href="tel:' + C.phone.replace(/\s/g, "") + '">' + C.phone + "</a></p>";
    if (C.hoursText) h += "<p><b>Open:</b> " + C.hoursText + "</p>";
    $("#contact").innerHTML = h;
  }

  /* ---------- share ---------- */
  $("#share").addEventListener("click", function () {
    var d = { title: "Pat and Sons", text: "Fresh fatkoek in Cofimvaba from R6", url: location.href };
    if (navigator.share) navigator.share(d).catch(function () {});
    else if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(function () { $("#share").textContent = "Link copied"; });
  });

  /* ---------- menu + basket ---------- */
  var cart = store("pat-cart") || {};
  var list = $("#menu-list");
  var byId = {}; MENU.forEach(function (m) { byId[m.id] = m; });
  MENU.forEach(function (m, i) {
    var el = document.createElement("article");
    el.className = "dish reveal" + (m.star ? " star" : ""); el.dataset.p = m.price; el.dataset.id = m.id; el.style.setProperty("--d", (i % 3) * .1 + "s");
    var ph = m.img ? '<div class="ph"><div class="imgbox"><img src="images/menu/' + m.img + '.jpg" alt="' + m.name + '" width="800" height="450" loading="lazy"></div>' : '<div class="ph pat">';
    el.innerHTML = ph + '<span class="tag">R' + m.price + '</span></div><div class="body"><h3>' + m.name + "</h3><p>" + m.desc + '</p><div class="add"><button class="btn" type="button" data-a="add">Add to order</button><div class="step"><button type="button" data-a="sub" aria-label="Remove one">&minus;</button><output>0</output><button type="button" data-a="add" aria-label="Add one">+</button></div></div></div>';
    list.appendChild(el); watch(el);
  });
  list.addEventListener("click", function (e) {
    var b = e.target.closest("[data-a]"); if (!b) return;
    var id = b.closest(".dish").dataset.id; cart[id] = Math.max(0, (cart[id] || 0) + (b.dataset.a === "add" ? 1 : -1));
    if (!cart[id]) delete cart[id]; sync(id);
  });
  function sync(bumpId) {
    $$(".dish", list).forEach(function (d) { var q = cart[d.dataset.id] || 0; d.classList.toggle("has", q > 0); $("output", d).textContent = q; });
    var n = 0, t = 0; Object.keys(cart).forEach(function (k) { n += cart[k]; t += cart[k] * byId[k].price; });
    var f = $("#fab"); f.classList.toggle("show", n > 0); f.textContent = "Your order \u00b7 " + n + " \u00b7 R" + t;
    if (bumpId) { f.classList.remove("bump"); void f.offsetWidth; f.classList.add("bump"); var d = $('.dish[data-id="' + bumpId + '"]'); d.classList.remove("bump"); void d.offsetWidth; d.classList.add("bump"); }
    store("pat-cart", cart); $("#total").textContent = "R" + t;
    $("#lines").innerHTML = Object.keys(cart).map(function (k) { return "<li><span>" + cart[k] + " x " + byId[k].name + "</span><b>R" + cart[k] * byId[k].price + "</b></li>"; }).join("") || "<li>Nothing yet. Close this and tap Add to order.</li>";
  }
  Object.keys(cart).forEach(function (k) { if (!byId[k]) delete cart[k]; });
  sync();

  var pb = $$(".pocket button");
  pb.forEach(function (b) { b.addEventListener("click", function () {
    pb.forEach(function (x) { x.setAttribute("aria-pressed", "false"); }); b.setAttribute("aria-pressed", "true");
    var max = +b.dataset.max;
    $$(".dish", list).forEach(function (d) { var hide = +d.dataset.p > max; d.hidden = hide; if (!hide) { d.classList.remove("out"); void d.offsetWidth; d.classList.add("out"); d.classList.add("in"); } });
  }); });

  var dlg = $("#cart");
  $("#fab").addEventListener("click", function () { sync(); dlg.showModal(); });
  $("#closecart").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  $("#clear").addEventListener("click", function () { cart = {}; sync(); });
  function orderText() {
    var t = 0, ls = Object.keys(cart).map(function (k) { t += cart[k] * byId[k].price; return cart[k] + " x " + byId[k].name + " (R" + cart[k] * byId[k].price + ")"; });
    var nm = $("#cname").value.trim(), nt = $("#cnote").value.trim();
    return "Hi Pat and Sons, I would like to order:\n" + ls.join("\n") + "\nTotal: R" + t + "\n" + $("#cmode").value + (nm ? "\nName: " + nm : "") + (nt ? "\nNotes: " + nt : "");
  }
  function msg(s) { $("#msg").textContent = s; }
  $("#send").addEventListener("click", function () {
    if (!Object.keys(cart).length) return msg("Add something to your order first.");
    if (!C.whatsapp) { msg("WhatsApp is not set up yet. Use Copy order and send it to us."); return; }
    window.open("https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(orderText()), "_blank", "noopener");
  });
  $("#copy").addEventListener("click", function () {
    if (!Object.keys(cart).length) return msg("Add something to your order first.");
    var t = orderText();
    if (navigator.clipboard) navigator.clipboard.writeText(t).then(function () { msg("Order copied. Paste it into a message to us."); }, function () { msg(t); }); else msg(t);
  });

  /* ---------- gallery ---------- */
  var tabs = $("#tabs"), gal = $("#gal"), more = $("#more"), STEP = 12, cur = "all", shown = 0, view = [];
  Object.keys(CATS).forEach(function (k) {
    var n = k === "all" ? GAL.length : GAL.filter(function (g) { return g.cat === k; }).length;
    var b = document.createElement("button"); b.type = "button"; b.dataset.k = k; b.setAttribute("aria-pressed", k === "all");
    b.innerHTML = CATS[k] + " <small>" + n + "</small>"; tabs.appendChild(b);
  });
  tabs.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    $$("button", tabs).forEach(function (x) { x.setAttribute("aria-pressed", "false"); }); b.setAttribute("aria-pressed", "true");
    cur = b.dataset.k; gal.innerHTML = ""; shown = 0; fill();
  });
  function fill() {
    view = GAL.filter(function (g) { return cur === "all" || g.cat === cur; });
    var end = Math.min(view.length, shown + STEP), frag = document.createDocumentFragment();
    for (var i = shown; i < end; i++) {
      var g = view[i], b = document.createElement("button"); b.type = "button"; b.dataset.i = i; b.setAttribute("aria-label", "Open photo: " + g.alt);
      b.innerHTML = '<img src="images/thumb/' + g.id + '.jpg" alt="' + g.alt + '" width="' + g.w + '" height="' + g.h + '" loading="lazy" decoding="async">';
      frag.appendChild(b); watchPhoto(b);
    }
    gal.appendChild(frag); shown = end; more.hidden = shown >= view.length;
    more.textContent = "Show more photos (" + (view.length - shown) + " left)";
  }
  function watchPhoto(b) { var im = $("img", b); function go() { b.classList.add("in"); } if (im.complete) setTimeout(go, 30); else { im.addEventListener("load", go); im.addEventListener("error", go); } }
  more.addEventListener("click", fill);
  fill();

  /* ---------- lightbox ---------- */
  var lb = $("#lb"), limg = $("#limg"), lcap = $("#lcap"), at = 0;
  function show(i) {
    at = (i + view.length) % view.length; var g = view[at];
    limg.style.animation = "none"; void limg.offsetWidth; limg.style.animation = "";
    limg.src = "images/full/" + g.id + ".jpg"; limg.alt = g.alt; lcap.textContent = g.alt + "  (" + (at + 1) + " of " + view.length + ")";
    [1, -1].forEach(function (d) { var n = view[(at + d + view.length) % view.length]; new Image().src = "images/full/" + n.id + ".jpg"; });
  }
  gal.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; show(+b.dataset.i); lb.showModal(); });
  $("#lx").addEventListener("click", function () { lb.close(); });
  $("#lp").addEventListener("click", function () { show(at - 1); });
  $("#ln").addEventListener("click", function () { show(at + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
  lb.addEventListener("keydown", function (e) { if (e.key === "ArrowLeft") show(at - 1); if (e.key === "ArrowRight") show(at + 1); });
  var sx = 0;
  lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) { var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(at + (dx < 0 ? 1 : -1)); }, { passive: true });

  /* ---------- poll (saved in this browser only) ---------- */
  var pl = $$("#poll button"), th2 = $("#thanks");
  function pick(n) { pl.forEach(function (x) { x.setAttribute("aria-pressed", x.textContent === n ? "true" : "false"); }); th2.textContent = "Thanks! " + n + " noted."; }
  var v = store("pat-vote"); if (v) pick(v);
  pl.forEach(function (b) { b.addEventListener("click", function () { pick(b.textContent); store("pat-vote", b.textContent); }); });

  /* ---------- offline support ---------- */
  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) navigator.serviceWorker.register("sw.js").catch(function () {});
})();
