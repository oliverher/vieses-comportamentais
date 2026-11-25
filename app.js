(function () {
  var S = window.SITE;
  var el = document.getElementById("conteudo");
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function porSlug(s) { return S.vieses.filter(function (v) { return v.slug === s; })[0]; }
  function grupoPorId(id) { return S.grupos.filter(function (g) { return g.id === id; })[0]; }
  function pad(n) { return String(n).padStart(2, "0"); }
  function guardar(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function ler(k, d) { try { var x = localStorage.getItem(k); return x ? JSON.parse(x) : d; } catch (e) { return d; } }

  function cardVies(v) {
    return '<a class="linkcard" href="#/v/' + v.slug + '"><span class="n">Carta ' + pad(v.carta) + "</span><h3>" + v.nome + "</h3><p>" + v.lema + "</p></a>";
  }

  /* ---------------- páginas ---------------- */
  var paginas = {};

  paginas.inicio = function () {
    return '<p class="kicker">Governo de Goiás · Ciências comportamentais aplicadas ao serviço público</p>' +
      '<h1 class="h1" tabindex="-1">Ciências comportamentais: como as pessoas decidem e como desenhar serviços melhores</h1>' +
      '<p class="lead">As pessoas não decidem como uma calculadora perfeita. Decidem com atalhos, hábitos e emoções, e pelo que está à frente delas no momento. Entender isso, e testar o que funciona, ajuda a desenhar serviços públicos para o cidadão como ele é.</p>' +
      '<div class="quote">Quem desenha um serviço também desenha uma decisão. A pergunta é se ele a desenhou de propósito.</div>' +
      '<div class="grid2">' +
      '<div class="card"><span class="tag">Quero estudar</span><h3>Siga a trilha de estudo</h3><p>Seis etapas, do básico à aplicação, com roteiro, perguntas de revisão e um mini-projeto para o seu órgão.</p><p style="margin:0"><a class="btn primary" href="#/trilha">Começar a trilha</a></p></div>' +
      '<div class="card gold"><span class="tag">Tenho um problema</span><h3>Comece pelo diagnóstico rápido</h3><p>Marque os sintomas do seu serviço, como desistência, atraso ou erro nos formulários, e veja quais vieses podem estar envolvidos.</p><p style="margin:0"><a class="btn primary" href="#/p/diagnostico">Fazer o diagnóstico</a></p></div>' +
      "</div>" +
      '<h2 class="sec">Três caminhos</h2>' +
      '<div class="grid3">' +
      '<a class="linkcard" href="#/fundamentos"><span class="n">1 · Entender</span><h3>Fundamentos</h3><p>Vieses e atalhos mentais, modelos como o COM-B, arquitetura de escolhas, ética e o que se sabe sobre servidores públicos.</p></a>' +
      '<a class="linkcard" href="#/metodologias"><span class="n">2 · Estruturar</span><h3>Metodologias</h3><p>O TESTE em cinco fases, comparado ao BASIC, ao CINCO e a outras, com cuidados de rigor e um exemplo.</p></a>' +
      '<a class="linkcard" href="#/pratica"><span class="n">3 · Aplicar</span><h3>Ferramentas por fase</h3><p>Onze ferramentas, de target statements e barreiras COM-B ao piloto, à calculadora de amostra e ao checklist de ampliação.</p></a>' +
      "</div>" +
      '<h2 class="sec">Dentro de Fundamentos</h2>' +
      '<div class="grid2">' +
      '<a class="linkcard" href="#/f/vieses"><span class="n">14 conceitos</span><h3>Vieses e atalhos mentais</h3><p>Cada viés com explicação simples, um estudo de apoio e um exemplo de serviço público, em quatro blocos.</p></a>' +
      '<a class="linkcard" href="#/f/comportamento"><span class="n">Modelos</span><h3>Como o comportamento muda</h3><p>COM-B, roda de mudança de comportamento e técnicas.</p></a>' +
      '<a class="linkcard" href="#/limites"><span class="n">Evidência</span><h3>Limites da evidência</h3><p>O que se sabe, o que se discute e que efeito esperar.</p></a>' +
      '<a class="linkcard" href="baralho.html"><span class="n">Quero jogar</span><h3>Baralho de vieses</h3><p>As 15 cartas da InBehavior Lab, frente e verso, em uma guia própria.</p></a>' +
      "</div>" +
      '<h2 class="sec">Por que isso importa para quem desenha serviços</h2>' +
      '<div class="card"><p>Formulários longos, prazos pouco claros, opções demais e mensagens confusas causam desistência, erro e retrabalho. Boa parte desses problemas não é falta de informação, e sim de desenho: o serviço ignora como as pessoas decidem na prática, cansadas, com pressa e no celular.</p>' +
      '<p style="margin:0">A ciência comportamental oferece, para isso, um vocabulário comum e um método que se apoia em evidência, e não apenas em intuição.</p></div>' +
      '<p class="foot">Parte do conteúdo se baseia na apostila “Fundamentos teóricos do baralho de vieses comportamentais” e no Baralho de Vieses Comportamentais da InBehavior Lab (© 2023). Os demais textos resumem a literatura citada em Referências. Os exemplos de serviço público são propostas de aplicação, e não resultados empíricos.</p>';
  };

  paginas.grupo = function (id) {
    var g = grupoPorId(id);
    if (!g) return paginas.nada();
    var lista = S.vieses.filter(function (v) { return v.grupo === id; });
    return '<p class="kicker">Fundamentos · Vieses e atalhos mentais</p><h1 class="h1" tabindex="-1">' + g.nome + '</h1><p class="lead">' + g.resumo + "</p>" +
      '<h2 class="sec">Conceitos deste bloco</h2><div class="grid2">' + lista.map(cardVies).join("") + "</div>";
  };

  paginas.vies = function (slug) {
    var v = porSlug(slug);
    if (!v) return paginas.nada();
    var g = grupoPorId(v.grupo);
    var idx = S.vieses.indexOf(v);
    var ant = S.vieses[idx - 1], prox = S.vieses[idx + 1];
    return '<p class="kicker">Vieses · ' + g.nome + " · Carta " + pad(v.carta) + '</p>' +
      '<h1 class="h1" tabindex="-1">' + v.nome + "</h1>" +
      '<p class="lema">' + v.lema + "</p>" +
      '<h2 class="sec">O que é</h2><p>' + v.explica + "</p>" +
      '<h2 class="sec">Como aparece em um serviço público</h2><div class="card gold"><p style="margin:0">' + v.exemplo + "</p></div>" +
      '<h2 class="sec">O que a pesquisa mostrou</h2><p>' + v.estudo + "</p>" +
      '<h2 class="sec">Ferramenta de aplicação</h2>' +
      '<div class="tool">' +
      '<div><span class="lab">Pergunta de diagnóstico</span><p>' + v.diagnostico + "</p></div>" +
      '<div><span class="lab green">Alavanca de desenho</span><p>' + v.alavanca + "</p></div>" +
      '<div><span class="lab red">Cuidado ético</span><p>' + v.cuidado + "</p></div></div>" +
      '<p><a class="btn primary" href="baralho.html#carta-' + v.carta + '">Ver a carta ' + pad(v.carta) + " no baralho</a></p>" +
      '<p class="src"><strong>Base:</strong> ' + v.fonte + ".</p>" +
      '<div class="pager">' +
      (ant ? '<a class="btn" href="#/v/' + ant.slug + '">← ' + ant.nome + "</a>" : "<span></span>") +
      (prox ? '<a class="btn" href="#/v/' + prox.slug + '">' + prox.nome + " →</a>" : "<span></span>") + "</div>";
  };

  paginas.pratica = function () {
    var desc = {
      diagnostico: "Marque sintomas do seu serviço e veja os vieses mais prováveis.",
      auditoria: "Tabela editável para analisar cada etapa da jornada.",
      east: "Quatro perguntas: é fácil, atraente, social e oportuno?",
      mindspace: "Nove influências para revisar uma intervenção.",
      piloto: "Roteiro de teste randomizado e calculadora de tamanho de amostra.",
      etica: "Perguntas para decidir se a intervenção pode ir ao ar."
    };
    return '<p class="kicker">Na prática</p><h1 class="h1" tabindex="-1">Ferramentas de aplicação</h1>' +
      '<p class="lead">Instrumentos para transformar o conhecimento sobre vieses em melhorias concretas. As fontes dos frameworks são citadas; a seleção e a adaptação para serviços públicos são propostas deste site e precisam ser testadas.</p>' +
      '<div class="grid2" style="margin-top:22px">' +
      window.PRATICA.map(function (p) {
        return '<a class="linkcard" href="#/p/' + p[0] + '"><h3>' + p[1] + "</h3><p>" + desc[p[0]] + "</p></a>";
      }).join("") + "</div>";
  };

  var ferramentas = {};

  ferramentas.diagnostico = function () {
    return '<p class="kicker">Ferramenta 1</p><h1 class="h1" tabindex="-1">Diagnóstico rápido</h1>' +
      '<p class="lead">Marque o que acontece no seu serviço. Os vieses mais relacionados aparecem logo abaixo, com a pergunta de diagnóstico de cada um.</p>' +
      '<fieldset style="border:0;padding:0;margin:20px 0"><legend class="sr" style="position:absolute;left:-999px">Sintomas</legend>' +
      S.sinais.map(function (s) {
        return '<label class="check"><input type="checkbox" value="' + s.id + '"><span>' + s.rotulo + "</span></label>";
      }).join("") + "</fieldset>" +
      '<div id="diag-out" aria-live="polite"></div>' +
      '<p class="note">É uma lista de hipóteses para investigar. Não é um diagnóstico definitivo: confirme com dados e teste.</p>';
  };
  ferramentas.diagnosticoInit = function () {
    var out = $("#diag-out");
    function calc() {
      var marcados = Array.prototype.map.call(document.querySelectorAll("fieldset input:checked"), function (i) { return i.value; });
      if (!marcados.length) { out.innerHTML = ""; return; }
      var pont = S.vieses.map(function (v) {
        return { v: v, p: v.sinais.filter(function (s) { return marcados.indexOf(s) > -1; }).length };
      }).filter(function (x) { return x.p > 0; }).sort(function (a, b) { return b.p - a.p; });
      out.innerHTML = '<h2 class="sec">Vieses para investigar</h2>' + pont.map(function (x) {
        return '<div class="card"><span class="tag">Carta ' + pad(x.v.carta) + " · " + x.v.nome + "</span><p><strong>" + x.v.diagnostico + "</strong></p><p style=\"margin:0\">" + x.v.alavanca +
          ' <a href="#/v/' + x.v.slug + '">Ler mais</a></p></div>';
      }).join("");
    }
    document.querySelectorAll("fieldset input").forEach(function (i) { i.addEventListener("change", calc); });
  };

  ferramentas.auditoria = function () {
    return '<p class="kicker">Ferramenta 2</p><h1 class="h1" tabindex="-1">Auditoria comportamental da jornada</h1>' +
      '<p class="lead">Para cada etapa da jornada do cidadão, descreva o comportamento esperado, o obstáculo observado, a carta relacionada, a hipótese de intervenção e a métrica. Clique nas células para editar. O conteúdo fica salvo neste navegador.</p>' +
      '<div class="scroll-x"><table id="aud"><thead><tr><th>Etapa</th><th>Comportamento esperado</th><th>Obstáculo observado</th><th>Carta</th><th>Hipótese de intervenção</th><th>Métrica</th></tr></thead><tbody></tbody></table></div>' +
      '<p style="margin-top:14px"><button class="btn" id="aud-add" type="button">Adicionar etapa</button> <button class="btn" id="aud-copy" type="button">Copiar tabela</button> <button class="btn" id="aud-reset" type="button">Restaurar exemplo</button> <span class="note" id="aud-msg" role="status"></span></p>' +
      '<p class="note">O exemplo é ilustrativo, sem dados reais.</p>';
  };
  ferramentas.auditoriaInit = function () {
    var padrao = [["Confirmar dados", "Cidadão confirma em até 2 dias", "Esquecimento", "2 (Viés do Presente)", "Lembrete com data e agendamento imediato", "Taxa de confirmação em 7 dias"]];
    var dados = ler("aud", padrao);
    var tb = $("#aud tbody");
    function desenhar() {
      tb.innerHTML = dados.map(function (l, i) {
        return "<tr>" + l.map(function (c, j) { return '<td contenteditable="true" data-i="' + i + '" data-j="' + j + '" role="textbox" aria-label="Linha ' + (i + 1) + ', coluna ' + (j + 1) + '"></td>'; }).join("") + "</tr>";
      }).join("");
      tb.querySelectorAll("td").forEach(function (td) { td.textContent = dados[td.dataset.i][td.dataset.j]; });
    }
    tb.addEventListener("input", function (e) {
      var td = e.target.closest("td"); if (!td) return;
      dados[td.dataset.i][td.dataset.j] = td.textContent; guardar("aud", dados);
    });
    $("#aud-add").addEventListener("click", function () { dados.push(["", "", "", "", "", ""]); guardar("aud", dados); desenhar(); });
    $("#aud-reset").addEventListener("click", function () { dados = JSON.parse(JSON.stringify(padrao)); guardar("aud", dados); desenhar(); });
    $("#aud-copy").addEventListener("click", function () {
      var txt = ["Etapa", "Comportamento esperado", "Obstáculo observado", "Carta", "Hipótese", "Métrica"].join("\t") + "\n" + dados.map(function (l) { return l.join("\t"); }).join("\n");
      var msg = $("#aud-msg");
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(function () { msg.textContent = "Copiado. Cole no Excel ou no Word."; }, function () { msg.textContent = "Não foi possível copiar automaticamente."; });
    });
    desenhar();
  };

  ferramentas.east = function () {
    var q = [
      ["Easy", "Fácil", "A tarefa pode ser feita em poucos passos, com pouco esforço?", "Cartas: Status quo, Sobrecarga de opções, Heurísticas. Use padrões, pré-preenchimento e menos campos."],
      ["Attractive", "Atraente", "A mensagem chama atenção e é compreensível?", "Cartas: Ancoragem, Framing. Destaque o que importa, com palavras claras e verdadeiras."],
      ["Social", "Social", "O cidadão sabe o que a maioria faz e há apoio de pessoas próximas?", "Carta: Prova social. Use normas reais e locais."],
      ["Timely", "Oportuno", "O pedido chega no momento certo, quando a pessoa pode agir?", "Carta: Viés do presente. Aproxime o benefício e facilite agendar na hora."]
    ];
    return '<p class="kicker">Ferramenta 3</p><h1 class="h1" tabindex="-1">Checklist EAST</h1>' +
      '<p class="lead">O Behavioural Insights Team propõe quatro perguntas para desenhar intervenções: é fácil, atraente, social e oportuna? (Service et al., 2014). A associação com as cartas é proposta deste site.</p>' +
      q.map(function (x, i) {
        return '<div class="card"><span class="tag">' + x[0] + " · " + x[1] + "</span><h3>" + x[2] + "</h3><p style=\"margin:0\">" + x[3] + "</p></div>";
      }).join("");
  };

  ferramentas.mindspace = function () {
    var m = [
      ["M", "Messenger (mensageiro)", "Quem fala importa: pessoas respondem diferente conforme quem transmite a mensagem."],
      ["I", "Incentives (incentivos)", "Como perdas, recompensas e custos são percebidos."],
      ["N", "Norms (normas)", "O que as outras pessoas fazem influencia o que fazemos."],
      ["D", "Defaults (padrões)", "Seguimos a opção pré-definida."],
      ["S", "Salience (saliência)", "Prestamos atenção ao que é novo e relevante para nós."],
      ["P", "Priming", "Sinais sutis do ambiente influenciam o comportamento."],
      ["A", "Affect (afeto)", "Emoções moldam as decisões."],
      ["C", "Commitments (compromissos)", "Procuramos ser coerentes com promessas feitas."],
      ["E", "Ego", "Agimos de forma a nos sentir bem sobre nós mesmos."]
    ];
    return '<p class="kicker">Ferramenta 4</p><h1 class="h1" tabindex="-1">Checklist MINDSPACE</h1>' +
      '<p class="lead">Nove influências para revisar uma intervenção (Dolan et al., 2010). Use como lista de verificação de hipóteses, e não como garantia de efeito.</p>' +
      '<div class="grid3">' + m.map(function (x) {
        return '<div class="card"><span class="tag">' + x[0] + "</span><h3>" + x[1] + '</h3><p style="margin:0;font-size:14px">' + x[2] + "</p></div>";
      }).join("") + "</div>";
  };

  ferramentas.piloto = function () {
    var etapas = [
      "Pergunta: qual comportamento muda, em que população, medido como?",
      "Grupos: controle (processo atual) e uma ou mais versões, com alocação aleatória.",
      "Desfecho principal: uma única métrica, definida antes do teste.",
      "Tamanho da amostra: use a calculadora abaixo.",
      "Registro prévio: escreva hipótese, desfecho e análise antes de ver os dados.",
      "Decisão: implementar, ajustar ou abandonar, com regra definida de antemão.",
      "Relatório: publique também resultados nulos ou negativos."
    ];
    return '<p class="kicker">Ferramenta 5</p><h1 class="h1" tabindex="-1">Ficha de piloto randomizado</h1>' +
      '<p class="lead">Um roteiro de sete itens para testar uma melhoria de forma que se possa confiar no resultado.</p>' +
      '<ol class="steps">' + etapas.map(function (e, i) { return '<li><span class="big">' + (i + 1) + '</span><div><p style="color:var(--ink);font-size:15.5px">' + e + "</p></div></li>"; }).join("") + "</ol>" +
      '<h2 class="sec">Calculadora de amostra</h2>' +
      '<p>Para comparar duas proporções com 5% de significância e poder de 80%. Informe a taxa atual e a taxa que você espera alcançar.</p>' +
      '<label class="f" for="p1">Taxa atual (%)</label><input id="p1" type="number" min="0.1" max="99" step="0.1" value="30">' +
      '<label class="f" for="p2">Taxa esperada (%)</label><input id="p2" type="number" min="0.1" max="99" step="0.1" value="35">' +
      '<h3 style="margin-top:22px">Se a alocação for por equipes</h3>' +
      '<p>Quando equipes inteiras vão para um grupo, colegas se parecem entre si e a amostra efetiva diminui. Informe o tamanho médio da equipe e a correlação entre colegas (ICC). Sem estimativa, teste valores como 0,02 a 0,10.</p>' +
      '<label class="f" for="p3">Pessoas por equipe</label><input id="p3" type="number" min="1" max="500" step="1" value="1">' +
      '<label class="f" for="p4">Correlação entre colegas (ICC)</label><input id="p4" type="number" min="0" max="0.9" step="0.01" value="0.05">' +
      '<div class="result" id="amostra" aria-live="polite"></div>' +
      '<p class="note" style="margin-top:12px">Fórmula: n = 2 × (1,96 + 0,84)² × p(1 − p) ÷ Δ², com p igual à média das duas proporções e Δ a diferença a detectar. Efeitos reais de unidades de governo costumam ser pequenos (DellaVigna e Linos, 2022): planeje com uma diferença realista.</p>';
  };
  ferramentas.pilotoInit = function () {
    var out = $("#amostra");
    function calc() {
      var a = parseFloat($("#p1").value) / 100, b = parseFloat($("#p2").value) / 100;
      if (!(a > 0 && a < 1 && b > 0 && b < 1) || a === b) { out.innerHTML = "Informe duas taxas diferentes entre 0 e 100."; return; }
      var p = (a + b) / 2, d = Math.abs(b - a);
      var n = Math.ceil(2 * Math.pow(1.96 + 0.84, 2) * p * (1 - p) / (d * d));
      out.innerHTML = "<strong>" + n.toLocaleString("pt-BR") + "</strong> pessoas por grupo<br>Total para dois grupos: " + (2 * n).toLocaleString("pt-BR") + ". " +
        (n > 5000 ? '<span class="warn">Amostra grande: avalie se a diferença esperada é realista ou se dá para medir um desfecho mais sensível.</span>' : '<span class="ok">Dentro do alcance de um piloto em serviço com bom volume.</span>');
      var m = parseFloat($("#p3").value), icc = parseFloat($("#p4").value);
      if (m > 1 && icc >= 0) {
        var def = 1 + (m - 1) * icc, nc = Math.ceil(n * def), eq = Math.ceil(nc / m);
        out.innerHTML += "<br><br>Com equipes de " + m + " pessoas e ICC de " + icc.toString().replace(".", ",") + ": efeito de desenho de " + def.toFixed(2).replace(".", ",") + ", ou seja, " + nc.toLocaleString("pt-BR") + " pessoas por grupo, cerca de <strong style=\"font-size:22px\">" + eq.toLocaleString("pt-BR") + "</strong> equipes por grupo. Aproximação; consulte um estatístico.";
      }
    }
    ["p1", "p2", "p3", "p4"].forEach(function (i) { $("#" + i).addEventListener("input", calc); }); calc();
  };

  ferramentas.etica = function () {
    var q = [
      "A opção é fácil e barata de evitar?",
      "A mensagem é verdadeira?",
      "O cidadão se beneficia da intervenção (e não só o órgão)?",
      "O cidadão aprovaria a intervenção se a conhecesse?",
      "Não há urgência nem norma social fabricada?"
    ];
    return '<p class="kicker">Ferramenta 6</p><h1 class="h1" tabindex="-1">Teste ético de intervenção</h1>' +
      '<p class="lead">Antes de aplicar qualquer intervenção, responda às perguntas abaixo. Se qualquer resposta for negativa, revise. Critério inspirado em Thaler e Sunstein (2008).</p>' +
      q.map(function (t, i) {
        return '<fieldset class="card" style="margin-bottom:12px"><legend style="font-weight:600;padding:0 6px">' + (i + 1) + ". " + t + '</legend>' +
          '<label style="margin-right:20px"><input type="radio" name="q' + i + '" value="s"> Sim</label><label><input type="radio" name="q' + i + '" value="n"> Não</label></fieldset>';
      }).join("") + '<div class="result" id="etica-out" aria-live="polite">Responda às cinco perguntas.</div>';
  };
  ferramentas.eticaInit = function () {
    var out = $("#etica-out");
    function calc() {
      var r = [0, 1, 2, 3, 4].map(function (i) { var c = document.querySelector('input[name="q' + i + '"]:checked'); return c ? c.value : null; });
      var resp = r.filter(Boolean).length, nao = r.filter(function (x) { return x === "n"; }).length;
      if (resp < 5) { out.textContent = "Respondidas: " + resp + " de 5."; return; }
      out.innerHTML = nao ? '<span class="warn"><strong>Revise antes de aplicar.</strong></span> ' + nao + " resposta(s) negativa(s)." : '<span class="ok"><strong>Pode seguir para o piloto.</strong></span> Todas as respostas foram positivas. Ainda assim, teste antes de ampliar.';
    }
    document.querySelectorAll('input[type=radio]').forEach(function (i) { i.addEventListener("change", calc); });
  };

  paginas.ferramenta = function (id) {
    return ferramentas[id] ? ferramentas[id]() : paginas.nada();
  };

  paginas.metodo = function () {
    return '<p class="kicker">Método</p><h1 class="h1" tabindex="-1">Passo a passo da economia comportamental</h1>' +
      '<p class="lead">Estes são os sete passos da carta 12 do baralho. Ao lado de cada um, este site propõe a correspondência com o ciclo Test, Learn, Adapt (TLA; Haynes et al., 2012) e com o BASIC da OCDE (2019), dois métodos usados por governos.</p>' +
      '<ol class="steps">' + S.passos.map(function (p) {
        return '<li><span class="big">' + p.n + '</span><div><h3>' + p.titulo + "</h3><p>" + p.txt + '</p><p class="meta">TLA: ' + p.tla + " · BASIC: " + p.basic + " · Produto: " + p.produto + "</p></div></li>";
      }).join("") + "</ol>" +
      '<h2 class="sec">Cinco medidas para a organização</h2>' +
      '<div class="card"><ul style="margin:0;padding-left:20px"><li>Entusiasme sua equipe com casos, para que tenham novas ideias e vejam o diferencial.</li><li>Evangelize toda a organização, acendendo muitas fogueiras.</li><li>Crie especialistas e incentive pesquisadores e profissionais a arriscar novas ideias.</li><li>Experimente: construa uma cultura de experimentação que não tema fracassos.</li><li>Estabeleça provas e cimente a mudança com evidências empíricas de que a ciência comportamental funciona.</li></ul><p class="note" style="margin:10px 0 0">Fonte: Guia de Economia Comportamental e Experimental (2015).</p></div>' +
      '<p><a class="btn" href="#/p/piloto">Ir para a ficha de piloto</a></p>';
  };

  paginas.limites = function () {
    return '<p class="kicker">Fundamentos · 8</p><h1 class="h1" tabindex="-1">Limites da evidência</h1>' +
      '<p class="lead">A economia comportamental é um campo vivo. Conhecer o que se sabe e o que ainda se discute faz parte de usá-la bem.</p>' +
      S.limites.map(function (l) { return '<div class="card"><h3>' + l.t + "</h3><p style=\"margin:0\">" + l.p + "</p></div>"; }).join("");
  };

  paginas.referencias = function () {
    return '<p class="kicker">Aprofundar</p><h1 class="h1" tabindex="-1">Referências</h1>' +
      '<p class="lead">Em ordem alfabética, formato ABNT. Confira DOI e páginas antes de citar.</p>' +
      '<ul class="refs">' + S.refs.map(function (r) { return "<li>" + r + "</li>"; }).join("") + "</ul>";
  };

  paginas.nada = function () {
    return '<h1 class="h1" tabindex="-1">Página não encontrada</h1><p><a class="btn" href="#/inicio">Voltar ao início</a></p>';
  };

  function trilho(h) {
    var m, itens = null;
    var F = ["#/fundamentos", "Fundamentos"], V = ["#/f/vieses", "Vieses e atalhos mentais"];
    if ((m = h.match(/^v\/(.+)$/))) { var v = porSlug(m[1]); if (v) itens = [F, V, ["#/g/" + v.grupo, grupoPorId(v.grupo).nome]]; }
    else if ((m = h.match(/^g\/(.+)$/))) itens = [F, V];
    else if (/^f\//.test(h) || h === "limites") itens = [F];
    else if (/^m\//.test(h) || h === "metodo") itens = [["#/metodologias", "Metodologias"]];
    else if (/^p\//.test(h)) itens = [["#/pratica", "Ferramentas por fase"]];
    if (!itens) return "";
    return '<nav class="crumb" aria-label="Você está em">' + itens.map(function (i) { return '<a href="' + i[0] + '">' + i[1] + "</a>"; }).join(" › ") + "</nav>";
  }

  /* ---------------- roteador ---------------- */
  function rota() {
    var h = location.hash.replace(/^#\/?/, "") || "inicio";
    var html, init;
    var m;
    var ex = window.EXTRA && window.EXTRA.render(h);
    if (ex) { html = ex.html; init = ex.init; }
    else if ((m = h.match(/^g\/(.+)$/))) html = paginas.grupo(m[1]);
    else if ((m = h.match(/^v\/(.+)$/))) html = paginas.vies(m[1]);
    else if (h === "pratica") html = paginas.pratica();
    else if ((m = h.match(/^p\/(.+)$/))) { html = paginas.ferramenta(m[1]); init = ferramentas[m[1] + "Init"]; }
    else if (paginas[h]) html = paginas[h]();
    else html = paginas.nada();
    el.innerHTML = trilho(h) + html;
    if (init) init();
    if (window.TRILHA) window.TRILHA.decorar(h, el);
    window.marcarMenu(h);
    var vw = document.querySelector(".voltar-wrap");
    if (vw) vw.hidden = (h === "inicio");
    var t = $("h1", el);
    window.scrollTo(0, 0);
    if (t) { t.focus({ preventScroll: true }); }
    document.title = (t ? t.textContent + " · " : "") + "Ciências Comportamentais";
  }
  window.addEventListener("hashchange", rota);
  rota();
})();
