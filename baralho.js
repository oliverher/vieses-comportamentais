(function () {
  var DATA = window.CARTAS, cards = DATA.cartas, visible = cards.slice();
  var current = 0, side = "front";
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function norm(s) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  var slugPorCarta = {};
  window.SITE.vieses.forEach(function (v) { slugPorCarta[v.carta] = v.slug; });

  function frontHTML(c) {
    var mid = c.frente.itens
      ? "<ol>" + c.frente.itens.map(function (t, i) { return "<li><b>" + (i + 1) + ".</b>" + esc(t) + "</li>"; }).join("") + "</ol>"
      : '<div class="art"><img src="img/carta-' + String(c.id).padStart(2, "0") + '.jpg" alt="' + esc(c.frente.ilustracao || c.nome) + '" loading="lazy" decoding="async" draggable="false"></div><p class="txt">' + esc(c.frente.texto) + "</p>";
    return '<div class="face front"><div class="inner"><span class="num-canto" aria-hidden="true">' + c.id + "</span><h3>" + esc(c.nome) + "</h3>" + mid + '<div class="brand">InBehavior <i>LAB.</i></div></div></div>';
  }
  function backHTML(c) {
    return '<div class="face back"><div class="inner"><h3>' + esc(c.nome) + '</h3><div class="body">' +
      c.verso.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
      '</div><div class="foot">www.inbehaviorlab.com<small>' + esc(DATA.copyright.replace(/ \(.*\)/, "")) + "</small></div></div></div>";
  }
  function renderGrid() {
    $("grid").innerHTML = visible.map(function (c) {
      return '<button class="tile" type="button" data-id="' + c.id + '" aria-label="Abrir carta ' + esc(c.nome) + '">' + frontHTML(c) + "</button>";
    }).join("");
    $("empty").hidden = visible.length > 0;
    $("count").textContent = visible.length + " de " + cards.length + " cartas";
  }
  function filter() {
    var q = norm($("q").value.trim());
    visible = !q ? cards.slice() : cards.filter(function (c) {
      return norm([c.nome, c.frente.texto].concat(c.verso).join(" ")).indexOf(q) > -1;
    });
    renderGrid();
  }
  function setSide(s) {
    side = s; $("pair").setAttribute("data-side", s);
    Array.prototype.forEach.call(document.querySelectorAll(".dtabs .btn"), function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-side") === s ? "true" : "false");
    });
  }
  function openAt(i, keepSide) {
    current = i; var c = visible[i];
    $("dtitle").textContent = c.nome + "  ·  " + (i + 1) + "/" + visible.length;
    $("pair").innerHTML = '<div class="face-wrap wf"><div class="lab2">Frente</div>' + frontHTML(c) + '</div><div class="face-wrap wb"><div class="lab2">Verso</div>' + backHTML(c) + "</div>";
    var notes = [];
    if (c.frente.ilustracao) notes.push("<p><b>Ilustração na carta física:</b> " + esc(c.frente.ilustracao) + "</p>");
    if (c.frente.obs) notes.push("<p><b>Nota (frente):</b> " + esc(c.frente.obs) + "</p>");
    if (c.obs) notes.push("<p><b>Nota (verso):</b> " + esc(c.obs) + "</p>");
    $("notes").innerHTML = notes.join("");
    var slug = slugPorCarta[c.id];
    $("saiba").href = slug ? "index.html#/v/" + slug : "index.html#/metodo";
    $("prev").disabled = i === 0; $("next").disabled = i === visible.length - 1;
    setSide(keepSide ? side : "front");
    if (!$("dlg").open) $("dlg").showModal();
    try { history.replaceState(null, "", "#carta-" + c.id); } catch (e) {}
  }
  $("grid").addEventListener("click", function (e) {
    var t = e.target.closest(".tile"); if (!t) return;
    var id = +t.getAttribute("data-id");
    for (var i = 0; i < visible.length; i++) if (visible[i].id === id) { openAt(i, false); break; }
  });
  $("q").addEventListener("input", filter);
  $("close").addEventListener("click", function () { $("dlg").close(); });
  $("dlg").addEventListener("close", function () { try { history.replaceState(null, "", location.pathname); } catch (e) {} });
  $("dlg").addEventListener("click", function (e) { if (e.target === $("dlg")) $("dlg").close(); });
  $("prev").addEventListener("click", function () { if (current > 0) openAt(current - 1, true); });
  $("next").addEventListener("click", function () { if (current < visible.length - 1) openAt(current + 1, true); });
  Array.prototype.forEach.call(document.querySelectorAll(".dtabs .btn"), function (b) {
    b.addEventListener("click", function () { setSide(b.getAttribute("data-side")); });
  });
  document.addEventListener("keydown", function (e) {
    if (!$("dlg").open) return;
    if (e.key === "ArrowLeft" && current > 0) openAt(current - 1, true);
    else if (e.key === "ArrowRight" && current < visible.length - 1) openAt(current + 1, true);
    else if (e.key === " " && document.activeElement.tagName !== "BUTTON") { e.preventDefault(); setSide(side === "front" ? "back" : "front"); }
  });
  renderGrid();
  var m = location.hash.match(/^#carta-(\d+)$/);
  if (m) for (var i = 0; i < cards.length; i++) if (cards[i].id === +m[1]) { openAt(i, false); break; }
})();
