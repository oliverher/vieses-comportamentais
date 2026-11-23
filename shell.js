/* Barra lateral compartilhada pelas duas guias (Guia e Baralho). */
(function () {
  var S = window.SITE;
  var PRATICA = [
    ["diagnostico", "Diagnóstico rápido"],
    ["auditoria", "Auditoria da jornada"],
    ["east", "Checklist EAST"],
    ["mindspace", "Checklist MINDSPACE"],
    ["piloto", "Ficha de piloto e amostra"],
    ["etica", "Teste ético"]
  ];
  window.PRATICA = PRATICA;
  var onGuia = !!window.IS_GUIA;
  var base = onGuia ? "" : "index.html";

  function link(hash, text, extra) {
    return '<a href="' + base + "#/" + hash + '" data-route="' + hash + '">' + (extra || "") + "<span>" + text + "</span></a>";
  }

  function grupo(id, nome, resumo, itens) {
    return '<button class="grp-btn" type="button" aria-expanded="false" aria-controls="sub-' + id + '" data-grp="' + id + '">' +
      "<span>" + nome + '</span><span class="chev" aria-hidden="true">▸</span></button>' +
      '<div class="sub" id="sub-' + id + '">' + (resumo ? '<p class="blurb">' + resumo + "</p>" : "") + itens + "</div>";
  }

  var html = "";
  html += '<a class="side-head side-home" href="' + base + '#/inicio" title="Ir para a página inicial" aria-label="Governo de Goiás, Vieses Comportamentais: ir para a página inicial"><span class="org">Governo de Goiás</span><span class="title">Vieses Comportamentais</span></a>';
  html += '<div class="tabs" role="navigation" aria-label="Guias do site">' +
    '<a href="index.html"' + (window.PAGE === "guia" ? ' aria-current="page"' : "") + ">Guia</a>" +
    '<a href="baralho.html"' + (window.PAGE === "baralho" ? ' aria-current="page"' : "") + ">Baralho</a></div>";
  html += '<nav class="nav" aria-label="Menu principal">';
  html += link("inicio", "Início");
  html += '<div class="sec-label">OS VIESES</div>';
  S.grupos.forEach(function (g) {
    var itens = S.vieses.filter(function (v) { return v.grupo === g.id; })
      .map(function (v) { return link("v/" + v.slug, v.nome, '<span class="num">' + String(v.carta).padStart(2, "0") + "</span>"); }).join("");
    html += grupo(g.id, g.nome, g.resumo, itens);
  });
  html += '<div class="sec-label">NA PRÁTICA</div>';
  html += grupo("pratica", "Ferramentas", "Instrumentos para diagnosticar, desenhar e testar melhorias em serviços.",
    PRATICA.map(function (p) { return link("p/" + p[0], p[1]); }).join(""));
  html += link("metodo", "Passo a passo do método");
  html += '<div class="sec-label">APROFUNDAR</div>';
  html += link("limites", "Limites da evidência");
  html += link("referencias", "Referências");
  html += "</nav>";

  var side = document.getElementById("side");
  side.innerHTML = html;

  var scrim = document.getElementById("scrim");
  function fechar() { side.classList.remove("open"); scrim.classList.remove("show"); }
  document.getElementById("menu-btn").addEventListener("click", function () {
    side.classList.add("open"); scrim.classList.add("show");
  });
  scrim.addEventListener("click", fechar);
  side.addEventListener("click", function (e) {
    var btn = e.target.closest(".grp-btn");
    if (btn) {
      var aberto = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", aberto ? "false" : "true");
      document.getElementById(btn.getAttribute("aria-controls")).classList.toggle("open", !aberto);
      if (!aberto && onGuia && btn.dataset.grp !== "pratica") location.hash = "#/g/" + btn.dataset.grp;
      if (!aberto && onGuia && btn.dataset.grp === "pratica") location.hash = "#/pratica";
      return;
    }
    if (e.target.closest("a[data-route], .side-home")) fechar();
  });

  /* marca item ativo e abre o grupo correspondente */
  window.marcarMenu = function (rota) {
    Array.prototype.forEach.call(side.querySelectorAll("a[data-route]"), function (a) {
      if (a.getAttribute("data-route") === rota) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    var alvo = side.querySelector('a[data-route="' + rota + '"]');
    var grpId = null;
    if (alvo && alvo.closest(".sub")) grpId = alvo.closest(".sub").id.replace("sub-", "");
    var m = rota.match(/^g\/(.+)$/);
    if (m) grpId = m[1];
    if (rota === "pratica") grpId = "pratica";
    if (grpId) {
      var b = side.querySelector('[data-grp="' + grpId + '"]');
      if (b) { b.setAttribute("aria-expanded", "true"); document.getElementById("sub-" + grpId).classList.add("open"); }
    }
  };
})();

/* Botão "Voltar": página anterior do histórico; sem histórico, vai ao início do Guia. */
document.getElementById("voltar").addEventListener("click", function () {
  if (window.history.length > 1) window.history.back();
  else location.href = "index.html";
});
