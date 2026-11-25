/* Barra lateral compartilhada pelas duas guias (Guia e Baralho). */
(function () {
  var S = window.SITE;
  var PRATICA = [
    ["target", "1 · Target statements"],
    ["diagnostico", "1 · Diagnóstico rápido"],
    ["csd", "2 · Quadro CSD"],
    ["barreiras", "2 · Barreiras COM-B"],
    ["auditoria", "2 · Auditoria da jornada"],
    ["east", "3 · Checklist EAST"],
    ["mindspace", "3 · Checklist MINDSPACE"],
    ["ideias", "3 · Priorizador de ideias"],
    ["etica", "3 · Teste ético"],
    ["piloto", "4 · Ficha de piloto e amostra"],
    ["scale", "5 · Checklist SCALE"]
  ];
  var FUND = [
    ["f/ciencia", "Panorama"],
    "VIESES",
    ["f/comportamento", "Como o comportamento muda"],
    ["f/arquitetura", "Arquitetura de escolhas"],
    ["f/etica", "Ética e legitimidade"],
    ["f/setor-publico", "Dentro do serviço público"],
    ["f/equipes", "Engajamento e equipes"],
    ["limites", "Limites da evidência"]
  ];
  var METOD = [
    ["m/teste", "TESTE em cinco fases"],
    ["m/rigor", "Cuidados na fase Testar"],
    ["m/exemplo", "Exemplo aplicado"]
  ];
  window.PRATICA = PRATICA;
  var onGuia = !!window.IS_GUIA;
  var base = onGuia ? "" : "index.html";

  function link(hash, text, extra) {
    return '<a href="' + base + "#/" + hash + '" data-route="' + hash + '">' + (extra || "") + "<span>" + text + "</span></a>";
  }

  function grupo(id, nome, resumo, itens, nivel) {
    return '<button class="grp-btn' + (nivel ? " nivel" + nivel : "") + '" type="button" aria-expanded="false" aria-controls="sub-' + id + '" data-grp="' + id + '">' +
      "<span>" + nome + '</span><span class="chev" aria-hidden="true">▸</span></button>' +
      '<div class="sub' + (nivel ? " nivel" + nivel : "") + '" id="sub-' + id + '">' + (resumo ? '<p class="blurb">' + resumo + "</p>" : "") + itens + "</div>";
  }

  var html = "";
  html += '<a class="side-head side-home" href="' + base + '#/inicio" title="Ir para a página inicial" aria-label="Governo de Goiás, Ciências Comportamentais: ir para a página inicial"><span class="org">Governo de Goiás</span><span class="title">Ciências Comportamentais</span></a>';
  html += '<div class="tabs" role="navigation" aria-label="Guias do site">' +
    '<a href="index.html"' + (window.PAGE === "guia" ? ' aria-current="page"' : "") + ">Guia</a>" +
    '<a href="baralho.html"' + (window.PAGE === "baralho" ? ' aria-current="page"' : "") + ">Baralho</a></div>";
  html += '<nav class="nav" aria-label="Menu principal">';
  html += link("inicio", "Início");
  function viesesMenu() {
    var blocos = S.grupos.map(function (g) {
      var itens = S.vieses.filter(function (v) { return v.grupo === g.id; })
        .map(function (v) { return link("v/" + v.slug, v.nome, '<span class="num">' + String(v.carta).padStart(2, "0") + "</span>"); }).join("");
      return grupo(g.id, g.nome, "", itens, 2);
    }).join("");
    return grupo("vieses", "Vieses e atalhos mentais", "", link("f/vieses", "Visão geral dos vieses") + blocos, 1);
  }
  var TR = window.TRILHA ? window.TRILHA.etapas : [];
  if (TR.length) {
    html += '<div class="sec-label">ESTUDAR</div>';
    html += grupo("trilha", "Trilha de estudo", "Seis etapas, do básico à aplicação, com revisão e mini-projeto.",
      link("trilha", "Visão geral") + TR.map(function (e) { return link("trilha/" + e.n, e.n + " · " + e.nome); }).join(""));
  }
  html += '<div class="sec-label">ENTENDER</div>';
  html += grupo("fundamentos", "Fundamentos", "Vieses, modelos, evidências e ética: o que explica e o que muda o comportamento.",
    FUND.map(function (p) { return p === "VIESES" ? viesesMenu() : link(p[0], p[1]); }).join(""));
  html += '<div class="sec-label">APLICAR</div>';
  html += grupo("metodologias", "Metodologias", "TESTE, BASIC, CINCO e outras: como estruturar um projeto de aplicação.",
    METOD.map(function (p) { return link(p[0], p[1]); }).join("") + link("metodo", "Os sete passos do baralho"));
  html += grupo("pratica", "Ferramentas por fase", "Instrumentos para diagnosticar, desenhar e testar melhorias, organizados pelas fases do projeto.",
    PRATICA.map(function (p) { return link("p/" + p[0], p[1]); }).join(""));
  html += '<div class="sec-label">CONSULTAR</div>';
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
      var landing = { trilha: "trilha", pratica: "pratica", fundamentos: "fundamentos", metodologias: "metodologias", vieses: "f/vieses" };
      if (!aberto && onGuia) location.hash = "#/" + (landing[btn.dataset.grp] || "g/" + btn.dataset.grp);
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
    Array.prototype.forEach.call(side.querySelectorAll(".grp-btn"), function (b) { b.setAttribute("aria-expanded", "false"); });
    Array.prototype.forEach.call(side.querySelectorAll(".sub.open"), function (s) { s.classList.remove("open"); });
    function abrir(id) {
      var b = side.querySelector('[data-grp="' + id + '"]'), s = document.getElementById("sub-" + id);
      if (b && s) { b.setAttribute("aria-expanded", "true"); s.classList.add("open"); }
    }
    var alvo = side.querySelector('a[data-route="' + rota + '"]');
    var no = alvo;
    while (no && no.closest(".sub")) { var sub = no.closest(".sub"); abrir(sub.id.replace("sub-", "")); no = sub.parentNode.closest ? sub.parentNode.closest(".sub") : null; }
    var m = rota.match(/^g\/(.+)$/);
    if (m) { abrir(m[1]); abrir("vieses"); abrir("fundamentos"); }
    if (rota === "f/vieses") { abrir("vieses"); abrir("fundamentos"); }
    if (rota === "pratica" || rota === "fundamentos" || rota === "metodologias") abrir(rota);
    if (rota === "metodo") abrir("metodologias");
    if (rota === "trilha" || /^trilha\//.test(rota)) abrir("trilha");
  };
})();

/* Botão "Voltar": página anterior do histórico; sem histórico, vai ao início do Guia. */
document.getElementById("voltar").addEventListener("click", function () {
  if (window.history.length > 1) window.history.back();
  else location.href = "index.html";
});
