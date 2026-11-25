/* Trilha de estudo: 6 etapas, com roteiro, revisão, mini-projeto e progresso salvo no navegador.
   Carregado depois de data.js e extra.js, antes de shell.js e app.js.
   Expõe window.TRILHA = { etapas, decorar }. Integra-se a window.EXTRA.render. */
(function () {
  var S = window.SITE || { vieses: [] };
  var URL_ARTIGO = "https://oliverher.github.io/artigos/ciencia-comportamental-orgao/";

  function guardar(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function ler(k, d) { try { var x = localStorage.getItem(k); return x ? JSON.parse(x) : d; } catch (e) { return d; } }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function $(s, r) { return (r || document).querySelector(s); }

  /* a: true = aprofundamento (fora do caminho essencial) */
  var ETAPAS = [
    {
      n: 1, nome: "Entender o comportamento", tempo: "cerca de 30 min",
      pergunta: "Como as pessoas decidem e mudam?",
      objetivos: [
        "Explicar o que são ciências comportamentais, nudge e arquitetura de escolhas.",
        "Usar o COM-B para descrever por que um comportamento não acontece.",
        "Distinguir as funções de intervenção da roda de mudança de comportamento."
      ],
      itens: [
        { r: "f/ciencia", t: "O que são as ciências comportamentais" },
        { r: "f/comportamento", t: "Como o comportamento muda" }
      ],
      revisao: [
        ["O que é um nudge?", "Uma mudança no ambiente de escolha que influencia o comportamento sem proibir opções nem alterar incentivos de forma relevante."],
        ["Quais são os três componentes do COM-B e o que acontece quando falta um deles?", "Capacidade, oportunidade e motivação. Faltando uma delas, o comportamento não acontece (Michie, van Stralen e West, 2011)."],
        ["Um servidor não preenche um formulário porque não tem tempo no turno. Em que componente do COM-B está a barreira?", "Oportunidade física, que inclui tempo, recursos e ambiente."],
        ["Para que serve a tabela de funções de intervenção da roda de mudança de comportamento?", "Para relacionar cada tipo de barreira do COM-B a respostas possíveis, como educação, incentivo, restrição ou reestruturação do ambiente."]
      ]
    },
    {
      n: 2, nome: "Reconhecer os vieses", tempo: "cerca de 50 min",
      pergunta: "Que atalhos mentais explicam o que eu observo?",
      objetivos: [
        "Explicar por que os atalhos mentais geram erros previsíveis.",
        "Reconhecer os 14 conceitos, organizados em quatro blocos.",
        "Ligar um sintoma do serviço a vieses que valem a pena investigar."
      ],
      itens: [
        { r: "f/vieses", t: "Visão geral dos vieses" },
        { r: "g/base", t: "Bloco: Como pensamos" },
        { r: "g/valor", t: "Bloco: Valor e risco" },
        { r: "g/julgamento", t: "Bloco: Tempo e julgamento" },
        { r: "g/ambiente", t: "Bloco: Ambiente de escolha" },
        { r: "baralho.html", t: "Jogar com o baralho de vieses", ext: true, a: true },
        { r: "v/*", t: "Páginas de cada viés (14 conceitos)", grupo: true, a: true }
      ],
      revisao: [
        ["Quais são os quatro blocos de vieses do site?", "Como pensamos; Valor e risco; Tempo e julgamento; Ambiente de escolha."],
        ["Um formulário já vem com a opção mais comum marcada e quase ninguém a altera. Que viés explica isso?", "O viés do status quo: a opção padrão tende a virar a escolha."],
        ["Um cidadão adia a confirmação de um dado porque o benefício parece distante. Que viés investigar primeiro?", "O viés do presente, que pesa demais o agora."],
        ["Os exemplos de serviço público das páginas de vieses são resultados de pesquisa?", "Não. São propostas de aplicação, hipóteses a testar no seu contexto."]
      ]
    },
    {
      n: 3, nome: "Desenhar escolhas com ética", tempo: "cerca de 40 min",
      pergunta: "Como mudar o contexto de decisão sem manipular?",
      objetivos: [
        "Descrever as principais ferramentas de arquitetura de escolhas e o cuidado de cada uma.",
        "Esperar efeitos de tamanho realista.",
        "Aplicar as perguntas éticas e o teste ético antes de qualquer piloto."
      ],
      itens: [
        { r: "f/arquitetura", t: "Arquitetura de escolhas na prática" },
        { r: "f/etica", t: "Ética e legitimidade" },
        { r: "p/etica", t: "Prática: teste ético de intervenção" }
      ],
      revisao: [
        ["No órgão público belga, o que mostrou o experimento da opção padrão em estações de trabalho?", "O padrão transparente elevou o tempo em pé de 1,8% para 11,3% (18,8% com coaching), e o coaching sozinho não teve efeito (Celis et al., 2025)."],
        ["Que tamanho de efeito esperar de uma unidade de nudge?", "Pequeno: em média 1,4 ponto percentual nas unidades de governo, contra 8,7 nos artigos acadêmicos, por causa do viés de publicação (DellaVigna e Linos, 2022)."],
        ["Cite duas perguntas que a equipe deve fazer antes de aplicar uma intervenção.", "Por exemplo: o objetivo é do interesse de quem será influenciado? A pessoa consegue evitar a influência com facilidade? A intervenção poderia ser explicada em público sem constrangimento?"],
        ["No teste ético, o que fazer se uma resposta for negativa?", "Revisar a intervenção antes de aplicar."]
      ]
    },
    {
      n: 4, nome: "Olhar para dentro do órgão", tempo: "cerca de 40 min",
      pergunta: "O que muda quando o alvo é o servidor?",
      objetivos: [
        "Distinguir cidadão, organização e servidor como alvos da intervenção.",
        "Identificar o que muda no desenho, no teste e na ética quando o comportamento é relacional.",
        "Conhecer as cinco camadas do framework proposto no artigo e seus limites."
      ],
      itens: [
        { r: "f/setor-publico", t: "Dentro do serviço público" },
        { r: "f/equipes", t: "Engajamento e colaboração em equipes" },
        { r: "artigo", t: "Artigo: Ciência comportamental dentro do órgão", href: URL_ARTIGO, ext: true, a: true }
      ],
      revisao: [
        ["Que diferença há entre ter o cidadão e ter o servidor como alvo?", "Com o servidor, a relação com quem intervém é contínua, com emprego e hierarquia, a unidade de análise pode ser a equipe e o comportamento pode ser relacional, como colaborar ou engajar-se."],
        ["Por que alocar por equipe e analisar como se fosse individual é um problema?", "Tende a superestimar a precisão: o que conta é o número de equipes independentes, e não o de pessoas."],
        ["Por que a participação do servidor pode não ser voluntária?", "Sob hierarquia, e com a pessoa identificável, a recusa pode ter custo. A voluntariedade declarada pode não ser real."],
        ["Quais são as cinco camadas do framework do artigo?", "Diagnóstico relacional; canal e desenho; teste por equipe; ética da relação de emprego; persistência e ampliação. O framework é uma proposta teórica e ainda não foi testado."]
      ]
    },
    {
      n: 5, nome: "Aplicar o método", tempo: "cerca de 2 h",
      pergunta: "Como estruturar, desenhar e testar uma melhoria?",
      objetivos: [
        "Nomear as cinco fases do TESTE e o produto de cada uma.",
        "Usar as ferramentas de cada fase em um problema real.",
        "Planejar um piloto com amostra adequada, inclusive quando a alocação é por equipes."
      ],
      itens: [
        { r: "metodologias", t: "Metodologias de aplicação" },
        { r: "m/teste", t: "TESTE em cinco fases" },
        { r: "p/target", t: "Fase Target: target statements" },
        { r: "p/diagnostico", t: "Fase Target: diagnóstico rápido" },
        { r: "p/csd", t: "Fase Explorar: quadro CSD" },
        { r: "p/barreiras", t: "Fase Explorar: barreiras COM-B" },
        { r: "p/east", t: "Fase Soluções: checklist EAST" },
        { r: "p/ideias", t: "Fase Soluções: priorizador de ideias" },
        { r: "m/rigor", t: "Fase Testar: cuidados de rigor" },
        { r: "p/piloto", t: "Fase Testar: ficha de piloto e amostra" },
        { r: "p/scale", t: "Fase Escalar: checklist SCALE" },
        { r: "m/exemplo", t: "Exemplo aplicado: colaboração de servidores", a: true },
        { r: "metodo", t: "Os sete passos do baralho", a: true },
        { r: "p/auditoria", t: "Auditoria da jornada", a: true },
        { r: "p/mindspace", t: "Checklist MINDSPACE", a: true }
      ],
      revisao: [
        ["Quais são as cinco fases do TESTE?", "Target, Explorar, Soluções, Testar e Escalar."],
        ["Por que alocar equipes inteiras aos grupos, quando o comportamento é coletivo?", "Para evitar a contaminação entre colegas do grupo de teste e do de comparação."],
        ["O que o manual do BIT diz sobre amostras pequenas?", "Abaixo de 500 participantes, detectar efeito é muito improvável, salvo intervenção muito potente. Por isso um piloto pequeno serve mais à viabilidade e à aprendizagem do que à estimativa do efeito."],
        ["O que é pré-especificar a análise?", "Definir, antes de ver os dados, o desfecho primário, o tipo de análise, os controles e os subgrupos, e reportar tudo o que foi pré-especificado, inclusive resultados nulos."],
        ["O que o SCALE verifica antes de ampliar uma intervenção?", "Patrocínio, custo e benefício, responsabilização, logística e evidência."]
      ]
    },
    {
      n: 6, nome: "Avaliar e consolidar", tempo: "cerca de 45 min",
      pergunta: "O que a evidência sustenta e o que ainda não sustenta?",
      objetivos: [
        "Dizer o que a evidência permite concluir e quais são seus limites.",
        "Saber onde conferir as fontes antes de citar.",
        "Montar um plano de projeto para um problema do seu órgão."
      ],
      itens: [
        { r: "limites", t: "Limites da evidência" },
        { r: "referencias", t: "Referências" }
      ],
      revisao: [
        ["O que concluem Maier et al. (2022) sobre o efeito médio dos nudges?", "Que, depois de corrigir o viés de publicação, não há evidência robusta de efeito médio. Por isso o piloto deve ser planejado para detectar efeitos pequenos."],
        ["O que fazer com um resultado nulo ou negativo?", "Registrar e divulgar, como qualquer outro resultado, e fazer pesquisa qualitativa de acompanhamento e uma sessão de lições aprendidas."],
        ["Por que “não encontramos um framework” não equivale a “não existe”?", "Porque a busca do artigo foi não sistemática. A afirmação só se sustenta com uma revisão sistemática."],
        ["O que conferir antes de citar uma referência do site?", "Autores, volume, páginas e DOI na fonte original, e preferir a versão publicada à versão de trabalho."]
      ]
    }
  ];

  /* campos do mini-projeto (etapa 6) */
  var PROJETO = [
    ["problema", "1. Problema e serviço", "Qual serviço ou rotina do seu órgão tem um problema de comportamento? Quem sofre com ele?", "p/diagnostico", "Diagnóstico rápido"],
    ["alvo", "2. Comportamento-alvo", "Quem deve fazer o quê, quando e onde? Como será medido?", "p/target", "Target statements"],
    ["barreiras", "3. Barreiras (COM-B)", "O que impede: capacidade, oportunidade ou motivação?", "p/barreiras", "Barreiras COM-B"],
    ["vieses", "4. Vieses a investigar", "Que atalhos mentais podem estar envolvidos? Trate como hipótese.", "f/vieses", "Vieses e atalhos mentais"],
    ["intervencao", "5. Intervenção proposta", "O que muda no ambiente de escolha? É fácil, atraente, social e oportuna?", "p/east", "Checklist EAST"],
    ["etica", "6. Ética", "Passa no teste ético? Se o alvo for servidor, a participação é voluntária de fato?", "p/etica", "Teste ético"],
    ["teste", "7. Como testar", "Desfecho principal, grupos de comparação, unidade de alocação e amostra.", "p/piloto", "Ficha de piloto e amostra"],
    ["escala", "8. Se funcionar", "Quem decide ampliar, com que custo e como o resultado será divulgado, inclusive se for nulo?", "p/scale", "Checklist SCALE"]
  ];

  /* ---------- índices ---------- */
  var MAPA = {};   /* rota -> {e: índice da etapa, tipo: intro|ess|apr|rev} */
  var CAMINHO = ["trilha"];
  ETAPAS.forEach(function (et, i) {
    MAPA["trilha/" + et.n] = { e: i, tipo: "intro" };
    CAMINHO.push("trilha/" + et.n);
    et.itens.forEach(function (it) {
      if (it.ext || it.grupo) return;
      MAPA[it.r] = { e: i, tipo: it.a ? "apr" : "ess" };
      if (!it.a) CAMINHO.push(it.r);
    });
    MAPA["trilha/" + et.n + "/revisao"] = { e: i, tipo: "rev" };
    CAMINHO.push("trilha/" + et.n + "/revisao");
  });
  function mapa(h) {
    if (MAPA[h]) return MAPA[h];
    if (/^v\//.test(h)) return { e: 1, tipo: "apr" };
    return null;
  }
  function porSlug(s) { return (S.vieses || []).filter(function (v) { return v.slug === s; })[0]; }

  function titulo(r) {
    var m;
    if (r === "trilha") return "Visão geral da trilha";
    if ((m = r.match(/^trilha\/(\d)\/revisao$/))) return "Revisão da etapa " + m[1];
    if ((m = r.match(/^trilha\/(\d)$/))) return "Etapa " + m[1] + ": " + ETAPAS[m[1] - 1].nome;
    if ((m = r.match(/^v\/(.+)$/))) { var v = porSlug(m[1]); return v ? v.nome : r; }
    for (var i = 0; i < ETAPAS.length; i++) for (var j = 0; j < ETAPAS[i].itens.length; j++) if (ETAPAS[i].itens[j].r === r) return ETAPAS[i].itens[j].t;
    return r;
  }

  /* ---------- progresso ---------- */
  function lidas() { return ler("trilha_lidas", {}); }
  function essenciais(et) {
    var rs = et.itens.filter(function (it) { return !it.a && !it.ext; }).map(function (it) { return it.r; });
    rs.push("trilha/" + et.n + "/revisao");
    return rs;
  }
  function progresso(et) {
    var L = lidas(), rs = essenciais(et), f = rs.filter(function (r) { return L[r]; }).length;
    return { feitas: f, total: rs.length, pct: Math.round(100 * f / rs.length) };
  }
  function barra(p, rot) {
    return '<div class="prog" role="progressbar" aria-label="' + esc(rot) + '" aria-valuemin="0" aria-valuemax="' + p.total + '" aria-valuenow="' + p.feitas + '"><span style="width:' + p.pct + '%"></span></div>' +
      '<p class="prog-txt">' + p.feitas + " de " + p.total + " itens essenciais concluídos</p>";
  }

  function cab(kicker, tit, lead) {
    return '<p class="kicker">' + kicker + '</p><h1 class="h1" tabindex="-1">' + tit + "</h1>" + (lead ? '<p class="lead">' + lead + "</p>" : "");
  }

  /* ---------- páginas ---------- */
  function paginaVisao() {
    var ult = ler("trilha_ultima", null);
    var L = lidas(), total = 0, feitas = 0;
    ETAPAS.forEach(function (et) { var p = progresso(et); total += p.total; feitas += p.feitas; });
    var comeco = feitas === 0 && !ult;
    var alvo = ult && mapa(ult) ? ult : "trilha/1";
    var html = cab("Estudar", "Trilha de estudo", "Um caminho em seis etapas, do básico à aplicação: entender o comportamento, reconhecer os vieses, desenhar com ética, olhar para dentro do órgão, aplicar o método e avaliar. Cada etapa tem roteiro, perguntas de revisão e, ao final, um mini-projeto para o seu órgão.") +
      '<div class="card gold"><span class="tag">Como usar</span><ul>' +
      "<li><strong>Essencial</strong> é o caminho mais curto. Os botões Anterior e Próximo seguem só por ele.</li>" +
      "<li><strong>Aprofundamento</strong> é leitura opcional, como o artigo sobre o servidor e o exemplo aplicado.</li>" +
      "<li>Marque as páginas que você leu. O progresso fica salvo neste navegador, e não em um servidor.</li>" +
      "<li>Ao fim de cada etapa, responda às perguntas de revisão sem consultar as respostas.</li></ul>" +
      '<p style="margin:12px 0 0"><a class="btn primary" href="#/' + alvo + '">' + (comeco ? "Começar a etapa 1" : "Continuar de onde parou") + "</a> " +
      (comeco ? "" : '<button class="btn" type="button" id="tr-zerar">Zerar progresso</button>') + '<span class="note" id="tr-msg" role="status"></span></p></div>' +
      '<h2 class="sec">As seis etapas</h2><div class="grid2">' +
      ETAPAS.map(function (et) {
        var p = progresso(et);
        return '<a class="linkcard" href="#/trilha/' + et.n + '"><span class="n">Etapa ' + et.n + " de 6 · " + et.tempo + "</span><h3>" + et.nome + "</h3><p>" + et.pergunta + "</p>" + barra(p, "Progresso da etapa " + et.n) + "</a>";
      }).join("") + "</div>" +
      '<p class="note" style="margin-top:18px">Os tempos são estimativas deste site para a leitura do caminho essencial, sem contar o preenchimento das ferramentas.</p>';
    return {
      html: html,
      init: function () {
        var z = $("#tr-zerar");
        if (z) z.addEventListener("click", function () {
          if (!confirm("Apagar a marcação de páginas lidas? Os textos das ferramentas e do mini-projeto não serão apagados.")) return;
          guardar("trilha_lidas", {}); guardar("trilha_ultima", null);
          location.reload();
        });
      }
    };
  }

  function paginaEtapa(n) {
    var et = ETAPAS[n - 1];
    if (!et) return null;
    var L = lidas(), p = progresso(et);
    var primeiro = et.itens.filter(function (it) { return !it.a && !it.ext; })[0];
    function item(it) {
      var feito = !it.ext && !it.grupo && L[it.r];
      var href = it.ext ? it.r === "artigo" ? it.href : it.r : it.grupo ? "#/f/vieses" : "#/" + it.r;
      var externo = it.ext ? ' target="_blank" rel="noopener"' : "";
      return '<li class="tr-item' + (feito ? " feito" : "") + '"><span class="tr-mark" aria-hidden="true">' + (feito ? "✓" : "•") + '</span><a href="' + href + '"' + externo + ">" + it.t + (it.ext ? " (abre em outra página)" : "") + '</a><span class="tr-tag ' + (it.a ? "apr" : "ess") + '">' + (it.a ? "Aprofundamento" : "Essencial") + "</span>" + (feito ? '<span class="sr-only"> lida</span>' : "") + "</li>";
    }
    var extra = "";
    if (n === 4) {
      extra = '<h2 class="sec">O artigo em uma frase</h2><div class="card"><p style="margin:0">Em busca não sistemática, não encontramos um framework que reúna o servidor como alvo, um desfecho relacional, o desenho por equipe e a ética da relação de emprego. O artigo propõe um framework de cinco camadas e três proposições refutáveis. O framework é uma proposta teórica e ainda não foi testado.</p></div>';
    }
    if (n === 6) {
      extra = '<h2 class="sec">Mini-projeto</h2><div class="card"><p style="margin:0">Na página de revisão desta etapa você monta, em oito campos, um plano para um problema do seu órgão. O texto fica salvo neste navegador e pode ser copiado.</p></div>';
    }
    var html = cab("Etapa " + n + " de 6 · " + et.tempo, et.nome, "Pergunta-guia: " + et.pergunta) +
      barra(p, "Progresso da etapa " + n) +
      '<h2 class="sec">Ao final você será capaz de</h2><ul>' + et.objetivos.map(function (o) { return "<li>" + o + "</li>"; }).join("") + "</ul>" +
      '<h2 class="sec">Roteiro</h2><ul class="tr-lista">' + et.itens.map(item).join("") +
      '<li class="tr-item' + (L["trilha/" + n + "/revisao"] ? " feito" : "") + '"><span class="tr-mark" aria-hidden="true">' + (L["trilha/" + n + "/revisao"] ? "✓" : "•") + '</span><a href="#/trilha/' + n + '/revisao">Revisão da etapa ' + n + (n === 6 ? " e mini-projeto" : "") + '</a><span class="tr-tag ess">Essencial</span></li></ul>' +
      extra +
      '<p style="margin-top:22px"><a class="btn primary" href="#/' + (primeiro ? primeiro.r : "trilha/" + n + "/revisao") + '">Começar o roteiro</a></p>';
    return { html: html };
  }

  function paginaRevisao(n) {
    var et = ETAPAS[n - 1];
    if (!et) return null;
    var html = cab("Etapa " + n + " de 6 · Revisão", "Revisão: " + et.nome, "Responda cada pergunta em voz alta ou por escrito antes de abrir a resposta. Se errar, volte à página indicada no roteiro da etapa.") +
      et.revisao.map(function (q, i) {
        return '<details class="rev"><summary><span class="rev-n">' + (i + 1) + "</span>" + q[0] + "</summary><p>" + q[1] + "</p></details>";
      }).join("") +
      '<p class="note">As respostas resumem o conteúdo das páginas do site e as fontes citadas nelas.</p>';
    var init = null;
    if (n === 6) {
      var d = ler("trilha_projeto", {});
      html += '<h2 class="sec">Mini-projeto: um plano para o seu órgão</h2>' +
        '<p>Escolha um problema real e preencha os oito campos, usando as ferramentas indicadas. É um plano de trabalho, e não um resultado: tudo o que você escrever aqui ainda é hipótese a testar. O texto fica salvo neste navegador.</p>' +
        PROJETO.map(function (c) {
          return '<div class="card"><label class="f" for="pj-' + c[0] + '"><strong>' + c[1] + '</strong></label><p class="note" style="margin:0 0 6px">' + c[2] + ' Ferramenta: <a href="#/' + c[3] + '">' + c[4] + '</a>.</p><textarea id="pj-' + c[0] + '" rows="3" style="width:100%"></textarea></div>';
        }).join("") +
        '<p><button class="btn" type="button" id="pj-copiar">Copiar plano</button> <button class="btn" type="button" id="pj-limpar">Limpar campos</button> <span class="note" id="pj-msg" role="status"></span></p>' +
        '<div class="card gold"><span class="tag">Fim da trilha</span><p style="margin:0">Se o plano envolve servidores como alvo, releia a etapa 4 e o artigo: a unidade de alocação, o papel da chefia e a voluntariedade mudam o desenho, o teste e a ética.</p></div>';
      init = function () {
        PROJETO.forEach(function (c) {
          var t = $("#pj-" + c[0]);
          t.value = d[c[0]] || "";
          t.addEventListener("input", function () { d[c[0]] = t.value; guardar("trilha_projeto", d); });
        });
        $("#pj-copiar").addEventListener("click", function () {
          var txt = "Plano de projeto comportamental\n\n" + PROJETO.map(function (c) { return c[1] + "\n" + (d[c[0]] || "(em branco)"); }).join("\n\n");
          var msg = $("#pj-msg");
          (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(function () { msg.textContent = "Copiado. Cole no Word ou no e-mail."; }, function () { msg.textContent = "Não foi possível copiar automaticamente."; });
        });
        $("#pj-limpar").addEventListener("click", function () {
          if (!confirm("Apagar os oito campos do mini-projeto?")) return;
          d = {}; guardar("trilha_projeto", d);
          PROJETO.forEach(function (c) { $("#pj-" + c[0]).value = ""; });
        });
      };
    }
    return { html: html, init: init };
  }

  /* ---------- integração com o roteador ---------- */
  function render(h) {
    var m;
    if (h === "trilha") return paginaVisao();
    if ((m = h.match(/^trilha\/(\d)$/))) return paginaEtapa(+m[1]);
    if ((m = h.match(/^trilha\/(\d)\/revisao$/))) return paginaRevisao(+m[1]);
    return null;
  }
  var base = window.EXTRA && window.EXTRA.render;
  window.EXTRA = window.EXTRA || {};
  window.EXTRA.render = function (h) { return render(h) || (base ? base(h) : null); };

  /* marca no menu as páginas já lidas */
  function marcarLidas() {
    var L = lidas(), side = document.getElementById("side");
    if (!side) return;
    Array.prototype.forEach.call(side.querySelectorAll("a[data-route]"), function (a) {
      a.classList.toggle("lida", !!L[a.getAttribute("data-route")]);
    });
  }

  function href(r) { return r === "trilha" ? "#/trilha" : "#/" + r; }

  window.TRILHA = {
    etapas: ETAPAS,
    marcarLidas: marcarLidas,
    decorar: function (h, el) {
      marcarLidas();
      var m = mapa(h);
      if (!m) return;
      if (h !== "trilha") guardar("trilha_ultima", h);
      var et = ETAPAS[m.e];

      if (m.tipo === "ess" || m.tipo === "apr") {
        el.insertAdjacentHTML("afterbegin", '<div class="selo-etapa"><a href="#/trilha/' + et.n + '">Etapa ' + et.n + " de 6 · " + et.nome + '</a><span class="tr-tag ' + m.tipo + '">' + (m.tipo === "apr" ? "Aprofundamento" : "Essencial") + "</span></div>");
      }
      if (h === "trilha") return;

      var i = CAMINHO.indexOf(h), ant = i > 0 ? CAMINHO[i - 1] : null, prox = i > -1 && i < CAMINHO.length - 1 ? CAMINHO[i + 1] : null;
      var marcavel = m.tipo !== "intro";
      var rotulo = m.tipo === "rev" ? "Concluí a revisão desta etapa" : "Marcar esta página como lida";
      var nav = '<nav class="trilha-nav" aria-label="Navegação da trilha de estudo">' +
        (marcavel ? '<label class="check"><input type="checkbox" id="tr-lida"><span>' + rotulo + "</span></label>" : "") +
        '<div class="pager">' +
        (i > -1 ? (ant ? '<a class="btn" href="' + href(ant) + '">← ' + titulo(ant) + "</a>" : "<span></span>") : '<a class="btn" href="#/trilha/' + et.n + '">← Roteiro da etapa ' + et.n + "</a>") +
        (i > -1 ? (prox ? '<a class="btn primary" href="' + href(prox) + '">' + titulo(prox) + " →</a>" : "<span></span>") : "") +
        "</div></nav>";
      el.insertAdjacentHTML("beforeend", nav);
      var cb = $("#tr-lida", el);
      if (cb) {
        cb.checked = !!lidas()[h];
        cb.addEventListener("change", function () {
          var L = lidas();
          if (cb.checked) L[h] = true; else delete L[h];
          guardar("trilha_lidas", L); marcarLidas();
        });
      }
    }
  };
})();
