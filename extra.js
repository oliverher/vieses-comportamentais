/* Conteúdo ampliado: Fundamentos (ciências comportamentais), Metodologias e Ferramentas por fase.
   Carregado antes de app.js. Expõe window.EXTRA.render(rota) -> {html, init} ou null. */
(function () {
  var S = window.SITE;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function guardar(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function ler(k, d) { try { var x = localStorage.getItem(k); return x ? JSON.parse(x) : d; } catch (e) { return d; } }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
  function copiar(txt, msg) {
    (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(
      function () { msg.textContent = "Copiado. Cole no Excel ou no Word."; },
      function () { msg.textContent = "Não foi possível copiar automaticamente."; });
  }
  function tabela(head, rows) {
    return '<div class="scroll-x"><table><thead><tr>' + head.map(function (h) { return "<th>" + h + "</th>"; }).join("") +
      "</tr></thead><tbody>" + rows.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>";
  }
  function cab(kicker, titulo, lead) {
    return '<p class="kicker">' + kicker + '</p><h1 class="h1" tabindex="-1">' + titulo + "</h1>" + (lead ? '<p class="lead">' + lead + "</p>" : "");
  }
  function card(t, corpo, cls) { return '<div class="card' + (cls ? " " + cls : "") + '">' + (t ? "<h3>" + t + "</h3>" : "") + corpo + "</div>"; }
  function fonte(t) { return '<p class="src"><strong>Base:</strong> ' + t + "</p>"; }
  function links(lista) {
    return '<div class="grid2">' + lista.map(function (l) {
      return '<a class="linkcard" href="#/' + l[0] + '"><span class="n">' + l[1] + "</span><h3>" + l[2] + "</h3><p>" + l[3] + "</p></a>";
    }).join("") + "</div>";
  }
  function aviso(t) { return '<p class="note">' + t + "</p>"; }

  /* ---------- editor de tabela genérico (salvo no navegador) ---------- */
  function editor(cfg) {
    var dados = ler(cfg.key, null) || JSON.parse(JSON.stringify(cfg.padrao));
    function celula(c, v, i, j) {
      var at = ' data-i="' + i + '" data-j="' + j + '" aria-label="' + esc(c.t) + ", linha " + (i + 1) + '"';
      if (c.type === "sel") return '<select' + at + ">" + c.opts.map(function (o) { return '<option' + (o === v ? " selected" : "") + ">" + esc(o) + "</option>"; }).join("") + "</select>";
      if (c.type === "num") return '<select' + at + ' class="num5"><option value=""></option>' + [1, 2, 3, 4, 5].map(function (n) { return "<option" + (String(n) === String(v) ? " selected" : "") + ">" + n + "</option>"; }).join("") + "</select>";
      if (c.type === "area") return "<textarea rows=\"2\"" + at + ">" + esc(v) + "</textarea>";
      return '<input type="text"' + at + ' value="' + esc(v) + '">';
    }
    function html() {
      return '<div class="scroll-x"><table class="ed" id="' + cfg.key + '"><thead><tr>' + cfg.cols.map(function (c) { return "<th>" + c.t + "</th>"; }).join("") + "<th></th></tr></thead><tbody></tbody></table></div>" +
        '<p style="margin-top:14px"><button class="btn" type="button" data-a="add">Adicionar linha</button> <button class="btn" type="button" data-a="copy">Copiar tabela</button> <button class="btn" type="button" data-a="reset">Restaurar exemplo</button> <span class="note" role="status" id="' + cfg.key + '-msg"></span></p>' +
        '<div id="' + cfg.key + '-out" aria-live="polite"></div>';
    }
    function init() {
      var tb = $("#" + cfg.key + " tbody");
      function desenhar() {
        tb.innerHTML = dados.map(function (l, i) {
          return "<tr>" + cfg.cols.map(function (c, j) { return "<td>" + celula(c, l[j], i, j) + "</td>"; }).join("") +
            '<td><button class="btn" type="button" data-del="' + i + '" aria-label="Remover linha ' + (i + 1) + '">×</button></td></tr>';
        }).join("");
        resumo();
      }
      function resumo() { var o = $("#" + cfg.key + "-out"); if (o && cfg.resumo) o.innerHTML = cfg.resumo(dados); }
      tb.addEventListener("input", function (e) { var t = e.target; if (t.dataset.i == null) return; dados[t.dataset.i][t.dataset.j] = t.value; guardar(cfg.key, dados); resumo(); });
      tb.addEventListener("change", function (e) { var t = e.target; if (t.dataset.i == null) return; dados[t.dataset.i][t.dataset.j] = t.value; guardar(cfg.key, dados); resumo(); });
      tb.addEventListener("click", function (e) { var b = e.target.closest("[data-del]"); if (!b) return; dados.splice(+b.dataset.del, 1); guardar(cfg.key, dados); desenhar(); });
      var raiz = $("#" + cfg.key).closest(".scroll-x").parentNode;
      raiz.addEventListener("click", function (e) {
        var b = e.target.closest("[data-a]"); if (!b) return;
        if (b.dataset.a === "add") { dados.push(cfg.cols.map(function () { return ""; })); guardar(cfg.key, dados); desenhar(); }
        if (b.dataset.a === "reset") { dados = JSON.parse(JSON.stringify(cfg.padrao)); guardar(cfg.key, dados); desenhar(); }
        if (b.dataset.a === "copy") { copiar(cfg.cols.map(function (c) { return c.t; }).join("\t") + "\n" + dados.map(function (l) { return l.join("\t"); }).join("\n"), $("#" + cfg.key + "-msg")); }
      });
      desenhar();
    }
    return { html: html(), init: init };
  }
  function num(v) { var n = parseFloat(v); return isNaN(n) ? null : n; }

  var R = {};

  /* =================== FUNDAMENTOS =================== */
  R["fundamentos"] = function () {
    return { html: cab("Entender", "Fundamentos das ciências comportamentais", "Entender como as pessoas decidem e agem é o ponto de partida. Esta área reúne o que explica o comportamento (vieses e modelos), as ferramentas de desenho que já foram testadas, o que a evidência permite concluir e os limites éticos de usar tudo isso.") +
      links([
        ["f/ciencia", "1 · Panorama", "O que são as ciências comportamentais", "Origem, termos e o lugar da administração pública comportamental."],
        ["f/vieses", "2 · Vieses", "Vieses e atalhos mentais", "14 conceitos em quatro blocos, cada um com estudo de apoio e exemplo de serviço público."],
        ["f/comportamento", "3 · Modelos", "Como o comportamento muda", "COM-B, roda de mudança de comportamento, técnicas e ABCD."],
        ["f/arquitetura", "4 · Evidências", "Arquitetura de escolhas na prática", "Padrões, compromisso antecipado, planos, normas e mensagens: o que funcionou e com que cuidado."],
        ["f/etica", "5 · Limites", "Ética e legitimidade", "Quando um nudge vira manipulação, o que os cidadãos aceitam e como proceder."],
        ["f/setor-publico", "6 · Contexto", "Dentro do serviço público", "O que se sabe sobre aplicar ciência comportamental a servidores e a órgãos públicos."],
        ["f/equipes", "7 · Equipes", "Engajamento e colaboração", "Como medir engajamento e o que a literatura diz sobre equipes."],
        ["limites", "8 · Evidência", "Limites da evidência", "Replicação, tamanho de efeito e o que ainda se discute."]
      ]) + card("", "<p>Os textos resumem a literatura e citam as fontes. Os exemplos de serviço público são propostas de aplicação, e não resultados empíricos. Os efeitos de intervenções comportamentais costumam ser pequenos e dependem do contexto.</p>", "gold") };
  };

  R["f/vieses"] = function () {
    var blocos = S.grupos.map(function (g) {
      var lista = S.vieses.filter(function (v) { return v.grupo === g.id; });
      return '<h2 class="sec">' + g.nome + '</h2><p class="note" style="margin-bottom:10px">' + g.resumo + '</p><div class="grid2">' + lista.map(function (v) {
        return '<a class="linkcard" href="#/v/' + v.slug + '"><span class="n">Carta ' + String(v.carta).padStart(2, "0") + "</span><h3>" + v.nome + "</h3><p>" + v.lema + "</p></a>";
      }).join("") + "</div>";
    }).join("");
    return { html: cab("Fundamentos · 2", "Vieses e atalhos mentais", "Os vieses são padrões previsíveis de como decidimos fora do modelo da calculadora perfeita. Cada conceito traz uma explicação simples, um estudo de apoio, um exemplo de serviço público e uma ferramenta de diagnóstico. Estão em quatro blocos, que seguem as 15 cartas do baralho da InBehavior Lab.") + blocos +
      '<p style="margin-top:24px"><a class="btn" href="baralho.html">Ver o baralho</a> <a class="btn" href="#/limites">Limites da evidência</a></p>' };
  };

  R["f/ciencia"] = function () {
    return { html: cab("Fundamentos · 1", "O que são as ciências comportamentais", "Um conjunto de áreas, como psicologia, economia e ciência cognitiva, que estudam como as pessoas realmente decidem e agem, e que usam esse conhecimento para desenhar políticas, serviços e organizações.") +
      '<h2 class="sec">Os termos que aparecem</h2>' + tabela(["Termo", "Significa"], [
        ["Economia comportamental", "Incorpora à economia o que a psicologia mostra sobre decisão: atalhos mentais, hábitos, emoções e limites de atenção e de autocontrole."],
        ["Insights comportamentais", "Uso aplicado desse conhecimento em políticas e serviços, geralmente com teste e medição de resultado (OCDE, 2017)."],
        ["Nudge", "Mudança no ambiente de escolha que influencia o comportamento sem proibir opções nem alterar incentivos de forma relevante."],
        ["Arquitetura de escolhas", "O conjunto de decisões sobre como as opções são apresentadas, ordenadas e descritas (Johnson et al., 2012)."],
        ["Administração pública comportamental", "Campo que estuda o comportamento de cidadãos, servidores e gestores no setor público com bases da psicologia."]
      ]) +
      '<h2 class="sec">Três camadas para organizar o estudo</h2>' + '<div class="grid3">' +
      card("Entender", "<p>Por que as pessoas não fazem o que seria bom para elas? Vieses e atalhos, e modelos de comportamento como o COM-B.</p>") +
      card("Desenhar", "<p>Como mudar o ambiente de escolha? Padrões, simplificação, mensagens, normas, planos e momento do pedido.</p>") +
      card("Testar", "<p>Funcionou de fato? Pilotos, grupo de comparação, métrica definida antes e relato dos resultados, inclusive os nulos.</p>") + "</div>" +
      '<h2 class="sec">O que ainda falta no setor público</h2>' +
      card("", "<p>Uma revisão com 54 artigos encontrou que o interesse por nudges na administração pública cresce, mas a aplicação ao ambiente interno das organizações públicas, isto é, ao comportamento dos servidores, ainda é limitada e concentrada em padrões, lembretes, feedback e normas sociais (Sengik e Maçada, 2026). Banko-Ferran et al. (2023) defendem ampliar o repertório da área para além dos nudges, usando mais conceitos da economia comportamental, por exemplo na decisão burocrática.</p>") +
      fonte("OCDE (2017); Johnson et al. (2012); Sengik e Maçada (2026); Banko-Ferran, Bengali e Bhanot (2023)") +
      links([["f/comportamento", "Próximo", "Como o comportamento muda", "COM-B, roda e técnicas."], ["metodologias", "Relacionado", "Metodologias de aplicação", "TESTE, BASIC, CINCO e outras."]]) };
  };

  R["f/comportamento"] = function () {
    return { html: cab("Fundamentos · 3", "Como o comportamento muda", "Antes de escolher um nudge, é preciso saber o que impede o comportamento. Os modelos abaixo ajudam a descrever o problema e a escolher o tipo de resposta.") +
      '<h2 class="sec">COM-B: capacidade, oportunidade e motivação</h2>' +
      "<p>Michie, van Stralen e West (2011) propõem que um comportamento ocorre quando a pessoa tem <strong>capacidade</strong>, <strong>oportunidade</strong> e <strong>motivação</strong>. Faltando uma delas, o comportamento não acontece. O Behavioural Insights Team usa o COM-B para classificar as barreiras na fase Explorar do TESTE (BIT, 2022).</p>" +
      tabela(["Componente", "Subtipos", "Pergunta de diagnóstico"], [
        ["Capacidade", "Física (habilidades, força) · Psicológica (conhecimento, atenção, memória)", "A pessoa sabe e consegue fazer?"],
        ["Oportunidade", "Física (tempo, recursos, ambiente) · Social (normas, apoio, cultura)", "O ambiente e as pessoas ao redor permitem?"],
        ["Motivação", "Reflexiva (planos, crenças, intenções) · Automática (hábitos, emoções, impulsos)", "A pessoa quer, ou o hábito e a emoção empurram para outro lado?"]
      ]) + aviso("Use a ferramenta <a href=\"#/p/barreiras\">Barreiras COM-B</a> para classificar as barreiras do seu serviço e ver as funções de intervenção relacionadas.") +
      '<h2 class="sec">A roda de mudança de comportamento</h2>' +
      "<p>Em torno do COM-B, a roda põe nove <strong>funções de intervenção</strong> e sete categorias de política que as viabilizam. Os autores avaliaram 19 estruturas anteriores e nenhuma cobria o conjunto completo (Michie et al., 2011).</p>" +
      tabela(["Função", "Em uma frase"], FUNCOES.map(function (f) { return [f[0], f[1]]; })) +
      "<p style=\"margin-top:12px\">Categorias de política: comunicação, diretrizes, medidas fiscais, regulação, legislação, planejamento ambiental e social e provisão de serviços.</p>" +
      '<h2 class="sec">Técnicas de mudança de comportamento</h2>' +
      card("", "<p>Michie et al. (2013) construíram, por consenso de especialistas, uma taxonomia de <strong>93 técnicas</strong> em 16 grupos, para descrever com precisão o conteúdo ativo de uma intervenção. Serve para relatar o que foi feito de forma que outros possam repetir e comparar. Exemplos de técnicas: estabelecer metas, planejar ações, dar feedback, prover prompts e lembretes.</p>") +
      '<h2 class="sec">ABCD: o olhar da OCDE</h2>' +
      card("", "<p>O BASIC da OCDE organiza a análise comportamental em quatro funções: <strong>atenção</strong>, <strong>formação de crenças</strong>, <strong>escolha</strong> e <strong>determinação</strong>. Ajuda a localizar em que ponto da decisão a pessoa se perde (OCDE, 2019).</p>") +
      fonte("Michie, van Stralen e West (2011); Michie et al. (2013); OCDE (2019); BIT (2022). A tradução dos termos é deste site.") +
      links([["p/barreiras", "Ferramenta", "Barreiras COM-B", "Classifique barreiras e veja funções de intervenção."], ["f/arquitetura", "Próximo", "Arquitetura de escolhas", "O que já foi testado."]]) };
  };

  /* mapa COM-B -> funções (roda de mudança de comportamento, Michie et al., 2011; 2014) */
  var FUNCOES = [
    ["Educação", "Aumentar o conhecimento ou a compreensão."],
    ["Persuasão", "Usar comunicação para provocar sentimentos ou estimular a ação."],
    ["Incentivo", "Criar a expectativa de recompensa."],
    ["Coerção", "Criar a expectativa de punição ou custo."],
    ["Treinamento", "Desenvolver habilidades."],
    ["Restrição", "Usar regras para reduzir a oportunidade do comportamento indesejado."],
    ["Reestruturação do ambiente", "Mudar o contexto físico ou social."],
    ["Modelagem", "Oferecer um exemplo a imitar."],
    ["Capacitação (enablement)", "Reduzir barreiras ou ampliar meios, além de educação e treinamento."]
  ];
  var MAPA = {
    "Capacidade física": ["Treinamento", "Capacitação (enablement)"],
    "Capacidade psicológica": ["Educação", "Treinamento", "Capacitação (enablement)"],
    "Oportunidade física": ["Treinamento", "Restrição", "Reestruturação do ambiente", "Capacitação (enablement)"],
    "Oportunidade social": ["Restrição", "Reestruturação do ambiente", "Modelagem", "Capacitação (enablement)"],
    "Motivação reflexiva": ["Educação", "Persuasão", "Incentivo", "Coerção", "Modelagem", "Capacitação (enablement)"],
    "Motivação automática": ["Persuasão", "Incentivo", "Coerção", "Treinamento", "Restrição", "Reestruturação do ambiente", "Modelagem", "Capacitação (enablement)"]
  };

  R["f/arquitetura"] = function () {
    return { html: cab("Fundamentos · 4", "Arquitetura de escolhas na prática", "Cada ferramenta abaixo tem estudos que a testaram. O quadro mostra o que se encontrou e o cuidado necessário para generalizar. Nenhum resultado é garantia para o seu serviço: teste antes de ampliar.") +
      "<p>Johnson et al. (2012) dividem as ferramentas do arquiteto de escolhas em duas famílias: as que <strong>estruturam a tarefa de escolha</strong> (o que apresentar) e as que <strong>descrevem as opções</strong> (como apresentar).</p>" +
      tabela(["Ferramenta", "O que a pesquisa mostrou", "Cuidado"], [
        ["<strong>Opção padrão</strong>", "Com inscrição automática em um plano de poupança, a participação subiu de forma marcante e muitos permaneceram na contribuição e no fundo padrão, que quase ninguém escolhia antes (Madrian e Shea, 2001). Em um órgão público belga, o padrão transparente em estações de trabalho elevou o tempo em pé de 1,8% para 11,3%, e com <em>coaching</em> chegou a 18,8%; o <em>coaching</em> sozinho não teve efeito (Celis et al., 2025). Em mudança organizacional, o padrão funcionou e a recomendação informativa não (Müller, Böhm e Renz, 2023).", "O padrão deve servir ao interesse de quem é afetado. Declarar a intenção aumentou o efeito (Celis et al., 2025). Parte do ganho regride quando a intervenção sai."],
        ["<strong>Compromisso antecipado</strong>", "No Save More Tomorrow, 78% dos convidados aderiram, 80% permaneceram até o quarto aumento salarial e a poupança média passou de 3,5% para 13,6% (Thaler e Benartzi, 2004).", "Foi uma empresa e um contexto financeiro. Verifique se há um momento análogo no seu serviço, como um ganho futuro."],
        ["<strong>Plano “quando e onde”</strong>", "Planos do tipo “quando X ocorrer, farei Y” aumentam o cumprimento de metas (Gollwitzer, 1999). Em vacinação de funcionários, pedir que escrevam data e hora elevou a taxa em 4,2 pontos percentuais sobre 33,1%; pedir só a data deu +1,5, sem significância (Milkman et al., 2011).", "O detalhe do plano importa. O efeito depende de existir uma intenção prévia de agir."],
        ["<strong>Normas sociais</strong>", "Em mais de 200 mil contribuintes no Reino Unido, mensagens de norma aumentaram o pagamento; a norma descritiva superou a injuntiva e não houve evidência de que perda supere ganho (Hallsworth et al., 2017).", "Pode sair pela culatra se a pessoa interpretar o comportamento como comum ou aceitável. Diagnostique o tipo de norma e o grupo de referência (Bicchieri, 2023). Use normas reais."],
        ["<strong>Mensagem pró-social</strong>", "Entre 13.785 profissionais de saúde, refletir sobre o impacto da vacina em familiares e pacientes elevou a intenção de vacinar; o benefício pessoal não (Belle e Cantarelli, 2024).", "Mediu intenção, em ensaio online. Confirme o comportamento."],
        ["<strong>Lembretes e dissuasão</strong>", "Em metanálise de ensaios fiscais, lembretes simples elevaram o cumprimento em 2,7 pontos percentuais; mensagens de dissuasão, em mais 3,2 (Antinyan e Asatryan, versão de trabalho).", "Há sinais de relato seletivo. A dissuasão exige cuidado ético."],
        ["<strong>Combinar nudges</strong>", "Três nudges combinados foram vistos como preservando a autonomia e eficazes, mais do que limite de acesso ou prêmio em dinheiro (van Roekel et al., 2023).", "Parte da eficácia foi percebida; o efeito sobre o comportamento real teve evidência limitada."]
      ]) +
      '<h2 class="sec">Que tamanho de efeito esperar</h2>' +
      card("", "<p>Em 126 testes de duas unidades de nudge dos Estados Unidos, com mais de 23 milhões de pessoas, o efeito médio foi de 1,4 ponto percentual, contra 8,7 nos artigos acadêmicos; o viés de publicação explica a diferença (DellaVigna e Linos, 2022). Maier et al. (2022) concluem que, corrigido esse viés, não há evidência robusta de efeito médio. Planeje o piloto para detectar efeitos pequenos.</p>", "gold") +
      fonte("Johnson et al. (2012); Madrian e Shea (2001); Celis et al. (2025); Müller, Böhm e Renz (2023); Thaler e Benartzi (2004); Gollwitzer (1999); Milkman et al. (2011); Hallsworth et al. (2017); Bicchieri (2023); Belle e Cantarelli (2024); Antinyan e Asatryan (2019); van Roekel et al. (2023); DellaVigna e Linos (2022); Maier et al. (2022)") +
      links([["f/etica", "Próximo", "Ética e legitimidade", "Até onde ir."], ["p/ideias", "Ferramenta", "Priorizador de ideias", "Compare alternativas por impacto e viabilidade."]]) };
  };

  R["f/etica"] = function () {
    return { html: cab("Fundamentos · 5", "Ética e legitimidade", "Influenciar decisões é um poder. Para que um serviço público use ciência comportamental com legitimidade, o desenho precisa de transparência, interesse público e possibilidade real de evitar a influência.") +
      '<h2 class="sec">O que a literatura discute</h2>' +
      card("Preservar a liberdade de escolha não basta", "<p>Hansen e Jespersen (2013) argumentam que nem todo nudge preserva a liberdade e que o argumento de que “a pessoa é sempre influenciada de qualquer forma” não elimina a responsabilidade de quem intervém de propósito. Propõem um quadro para o uso responsável da abordagem.</p>") +
      card("Transparência e controle democrático", "<p>Schmidt (2017) defende que o poder de nudgear deve ser transparente e sujeito a controle democrático. Para ele, isso é viável do ponto de vista institucional e responde à objeção de controle alheio.</p>") +
      card("O que os cidadãos aceitam", "<p>Em pesquisas nacionais em seis países europeus, houve apoio majoritário a nudges com fins legítimos que atendem aos interesses e valores da maioria, e apoio menor na Hungria e na Dinamarca. As pessoas rejeitam práticas que manipulam, como a publicidade subliminar, e que tiram dinheiro sem consentimento explícito (Reisch e Sunstein, 2016).</p>") +
      card("Autonomia e eficácia podem andar juntas", "<p>Nudges bem desenhados foram percebidos como preservando a autonomia e eficazes (van Roekel et al., 2023). Em um experimento de campo, a versão transparente do padrão teve efeito maior que a não transparente (Celis et al., 2025).</p>") +
      '<h2 class="sec">Etapas do BASIC e o teste</h2>' +
      "<p>O BASIC inclui diretrizes éticas por etapa. Na fase de teste, pede códigos de conduta, consentimento informado, comitê de revisão, confidencialidade, pré-registro, relato de desistências e atenção à equidade (OCDE, 2019).</p>" +
      '<h2 class="sec">Perguntas práticas antes de aplicar</h2>' +
      '<ol class="steps">' + ["O objetivo é do interesse de quem será influenciado, e não só do órgão?", "A pessoa consegue perceber e evitar a influência com facilidade?", "A intervenção poderia ser explicada em público sem constrangimento?", "Há equidade: algum grupo é prejudicado ou tem menos meios de evitar?", "Existem dados pessoais envolvidos? Há base legal, consentimento e anonimização, conforme a LGPD e, em pesquisa, o sistema de ética?", "Os resultados, inclusive os negativos, serão divulgados?"].map(function (t, i) {
        return '<li><span class="big">' + (i + 1) + '</span><div><p style="color:var(--ink);font-size:15.5px">' + t + "</p></div></li>";
      }).join("") + "</ol>" +
      fonte("Hansen e Jespersen (2013); Schmidt (2017); Reisch e Sunstein (2016); van Roekel et al. (2023); Celis et al. (2025); OCDE (2019). As perguntas práticas são proposta deste site.") +
      '<p><a class="btn primary" href="#/p/etica">Fazer o teste ético</a></p>' };
  };

  R["f/setor-publico"] = function () {
    return { html: cab("Fundamentos · 6", "Dentro do serviço público", "Quase todo estudo de nudge em governo fala do cidadão. Aqui estão as evidências sobre os servidores, sobre o ambiente interno dos órgãos e sobre o contexto brasileiro.") +
      '<h2 class="sec">O mapa da literatura</h2>' +
      card("", "<p>Sengik e Maçada (2026) analisaram 54 artigos e examinaram em profundidade os 11 que tratam do ambiente interno das organizações públicas. Predominam intervenções de baixo custo cognitivo (padrões, lembretes, feedback e normas), nos domínios de desempenho, decisão, comunicação e comportamento pró-social interno. Faltam estudos sobre integração das intervenções à organização e sobre a generalização dos resultados.</p>") +
      '<h2 class="sec">Estudos com servidores e trabalhadores</h2>' + tabela(["Estudo", "Contexto", "O que encontrou"], [
        ["Celis et al. (2025)", "Órgão público belga, 149 pessoas, 8 departamentos", "Padrão transparente em estações de trabalho elevou o tempo em pé; com <em>coaching</em>, mais ainda; <em>coaching</em> sozinho, nada."],
        ["Müller, Böhm e Renz (2023)", "Experimento sobre mudança organizacional", "Padrão pró-mudança aumentou o comportamento de apoio; recomendação informativa não; aumento salarial teve efeito."],
        ["Belle e Cantarelli (2024)", "13.785 profissionais de saúde pública, Itália", "Mensagem sobre o impacto nos outros elevou a intenção de vacinar e de promover a vacinação."],
        ["van Roekel et al. (2023)", "Funcionários da saúde, Países Baixos", "Nudges para reduzir e-mail foram percebidos como preservando a autonomia e eficazes."],
        ["De Paolis, Tiberio e Caffaro (2025)", "Revisão de 16 estudos em ambiente de trabalho", "Mais eficazes quando exigiam pouco esforço e tinham apoio de chefias ou pares; pouca avaliação de longo prazo."]
      ]) +
      '<h2 class="sec">No Brasil</h2>' +
      card("", "<p>Ayroza et al. (2021) analisaram a lei que instituiu a previdência complementar dos servidores federais (Funpresp), pioneira no uso de economia comportamental no desenho de política no Brasil. A participação cresceu de forma significativa após o desenho e as campanhas, mas é um caso único, sem grupo de comparação, de modo que não se pode generalizar. O Ministério da Gestão e da Inovação publicou em 2025 o guia metodológico CINCO, da sua Unidade de Ciências Comportamentais, descrito pelo próprio documento como primeira versão (MGI, 2025).</p>") +
      '<h2 class="sec">Institucionalizar exige servidores dispostos</h2>' +
      card("", "<p>Em levantamento na Ucrânia, a competência, a motivação e a resistência dos servidores, e o tipo de retorno que recebem, determinaram a eficiência com que os insights comportamentais se institucionalizam (Khadzhyradieva, Hrechko e Smalskys, 2019).</p>") +
      fonte("Sengik e Maçada (2026); Celis et al. (2025); Müller, Böhm e Renz (2023); Belle e Cantarelli (2024); van Roekel et al. (2023); De Paolis, Tiberio e Caffaro (2025); Ayroza et al. (2021); MGI (2025); Khadzhyradieva, Hrechko e Smalskys (2019)") +
      links([["metodologias", "Próximo", "Metodologias de aplicação", "Como estruturar um projeto."], ["f/equipes", "Relacionado", "Engajamento e colaboração", "Medir e entender o trabalho em equipe."]]) };
  };

  R["f/equipes"] = function () {
    return { html: cab("Fundamentos · 7", "Engajamento e colaboração em equipes", "Projetos internos dependem de pessoas que colaboram e se engajam. Duas perguntas orientam esta página: como medir o engajamento e o que a literatura diz sobre equipes.") +
      '<h2 class="sec">Medir o engajamento: a UWES</h2>' +
      card("", "<p>O engajamento no trabalho é um estado positivo de realização com três dimensões: vigor, dedicação e absorção. A escala UWES tem versão de 17 itens, que foi reduzida para 9 itens (UWES-9) em dados de 10 países (N = 14.521) e tem propriedades psicométricas aceitáveis (Schaufeli, Bakker e Salanova, 2006). No Brasil, a versão de Porto-Martins e Benevides-Pereira (2008) foi validada com amostras de cinco estudos, N = 1.934 (Porto-Martins e Machado, 2022). Antes de usar a forma curta em português, confirme sua validação.</p>") +
      '<h2 class="sec">O que se sabe sobre engajamento no setor público</h2>' +
      "<ul>" + [
        "Num meta-estudo com 113 amostras, as associações com o engajamento foram mais fortes para recursos pessoais (r = 0,48) e de desenvolvimento (0,45) do que para recursos sociais (0,36) e do trabalho (0,37). Entre servidores públicos, a associação com a intenção de sair da organização foi baixa (Mazzetti et al., 2023).",
        "Em estudos com servidores, o sentido atribuído ao trabalho (Khusanova, Kang e Choi, 2021) e a justiça e o apoio organizacionais (Ibrahim et al., 2024; Micacchi et al., 2023) se associaram ao engajamento. São estudos observacionais.",
      ].map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ul>" +
      '<h2 class="sec">Equipes</h2>' +
      card("", "<p>Mathieu et al. (2008) revisam uma década de pesquisa em eficácia de equipes sob o modelo entrada-processo-resultado. Uma metanálise de 51 estudos controlados, com 8.439 participantes, encontrou efeito médio, positivo e significativo, de treinamentos de trabalho em equipe sobre os comportamentos e o desempenho das equipes (McEwan et al., 2017).</p>") +
      fonte("Schaufeli, Bakker e Salanova (2006); Porto-Martins e Machado (2022); Mazzetti et al. (2023); Khusanova, Kang e Choi (2021); Mathieu et al. (2008); McEwan et al. (2017)") +
      aviso("Khusanova et al. e Ibrahim et al. são estudos de países específicos (Uzbequistão e Indonésia); confira o contexto antes de generalizar.") };
  };

  /* =================== METODOLOGIAS =================== */
  var FASES = [
    ["Target", "Alvo", "Qual público queremos atingir, que mudança de comportamento buscamos e como mediremos o sucesso?", "Escrever <em>target statements</em> (quem, o quê, quando), avaliar impacto e viabilidade e identificar dados para medir o resultado: registros administrativos, novas medidas sobre dados existentes, pesquisas e observações e <em>proxies</em>.", "Worksheets 1.A (1 a 1,5 h) e 1.B (1 h)", "2 a 3 comportamentos-alvo com resultados mensuráveis", "p/target"],
    ["Explorar", "Explorar", "Que barreiras impedem o comportamento, que dados já temos e que pesquisas faltam?", "Planejar a exploração com quatro métodos (entrevistas e grupos focais, observação e participação, <em>surveys</em> e análise de dados administrativos), mapear a jornada do usuário e categorizar as barreiras pelo modelo COM-B.", "Worksheets 2.A (2 a 3 h) e 2.C com a Barrier Identification Tool (2 a 3 h)", "Mapa da jornada com barreiras e facilitadores", "p/barreiras"],
    ["Soluções", "Solution", "Que conceitos, vieses e gatilhos podemos usar, e a solução resolve o problema real e é escalável?", "Gerar ideias por revisão de literatura, pelo EAST e por soluções já testadas informalmente, priorizar por impacto e viabilidade, desenhar a intervenção e testá-la com usuários, com revisão de qualidade e ética.", "Worksheet 3.B (1 h)", "Intervenção desenhada, testada com usuários, aprovada e pronta para implementar", "p/ideias"],
    ["Testar", "Trial", "Que soluções testar, qual o grupo de controle, como desenhar o teste de forma simples e qual a amostra mínima?", "Desenhar o ensaio (desfechos, população, elegibilidade, análise, amostra, randomização e protocolo), preparar e implementar com lançamento-piloto e registro, e analisar conforme o pré-especificado. O controle fornece o contrafactual e o efeito mínimo detectável orienta a amostra.", "Worksheets 4.A (1 h) e 4.B (1 a 2 h)", "Resultado do ensaio, que orienta a decisão de escalar", "p/piloto"],
    ["Escalar", "Scale", "Que soluções tiveram maior sucesso, o que precisa ser re-testado e quais os próximos passos?", "Comunicar os resultados, inclusive nulos, e planejar a ampliação com o modelo SCALE (patrocínio, custo e benefício, responsabilização, logística e evidência). Sem impacto: pesquisa qualitativa de acompanhamento e sessão de lições aprendidas.", "Worksheet 5.B (2 h)", "Intervenção ampliada se o impacto for positivo e plano para projetos futuros", "p/scale"]
  ];

  R["metodologias"] = function () {
    return { html: cab("Metodologias", "Metodologias de aplicação", "Há várias formas de conduzir um projeto de ciência comportamental. Quase todas compartilham a lógica de definir o comportamento, diagnosticar barreiras, desenhar, testar e ampliar. Esta página compara as principais e mostra como escolher.") +
      '<h2 class="sec">As metodologias lado a lado</h2>' + tabela(["Metodologia", "Origem", "Etapas", "O que a distingue"], [
        ["<strong>TESTE / TESTS</strong>", "Behavioural Insights Team (BIT)", "Target, Explorar, Soluções, Testar, Escalar", "Worksheets prontos por fase e foco em avaliação de impacto, com ensaio randomizado como método central. Refinada em mais de 1.000 projetos em cerca de dez anos (BIT, 2022)."],
        ["<strong>Design comportamental</strong>", "ideas42", "Define, Diagnose, Design, Test e Scale (descrições anteriores têm quatro etapas, sem Scale)", "Diagnóstico dos gargalos comportamentais que sustentam o problema e teste da solução por ensaio randomizado (Barrows et al., 2018)."],
        ["<strong>BASIC</strong>", "OCDE, 2019", "Behaviours, Analysis, Strategies, Interventions, Change", "Ênfase na análise comportamental do problema, na estrutura ABCD (atenção, crenças, escolha, determinação) e em diretrizes éticas por etapa."],
        ["<strong>CINCO</strong>", "MGI, Brasil, 2025", "Comportamento, Insights, Novas Estratégias, Checagem, Orquestração", "Ferramentas em português: critérios META, matriz CSD, cartas SIMPLESMENTE e quadro de hipóteses. Derivado em parte do TESTS e do BASIC; primeira versão."],
        ["<strong>Test, Learn, Adapt</strong>", "Cabinet Office, Reino Unido, 2012", "Testar, aprender, adaptar", "Ciclo curto de experimentação com ensaios randomizados em políticas públicas (Haynes et al., 2012)."]
      ]) +
      '<h2 class="sec">Como combinar</h2>' +
      card("", "<p>Uma combinação razoável é usar o <strong>TESTE como estrutura</strong> do projeto, o <strong>ABCD e as diretrizes éticas do BASIC</strong> no diagnóstico e na aprovação das intervenções e as <strong>ferramentas do CINCO</strong> nos roteiros de entrevista e no quadro de hipóteses. Esta combinação é proposta deste site.</p>", "gold") +
      '<h2 class="sec">Aprofundar</h2>' +
      links([
        ["m/teste", "Passo a passo", "TESTE em cinco fases", "Pergunta, atividades, ferramentas e produto de cada fase."],
        ["m/rigor", "Rigor", "Cuidados na fase Testar", "Randomização por equipes, amostra, pré-especificação, piloto e ética."],
        ["m/exemplo", "Exemplo", "Projeto de colaboração de servidores", "O TESTE aplicado a um objeto de estudo, passo a passo."],
        ["metodo", "Também no site", "Os sete passos do baralho", "A correspondência com o TESTE está em “TESTE em cinco fases”."]
      ]) };
  };

  R["m/teste"] = function () {
    return { html: cab("Metodologias · TESTE", "TESTE: Target, Explorar, Soluções, Testar, Escalar", "É a versão em português do TESTS, metodologia de cinco fases do Behavioural Insights Team (BIT) para projetos de ciência comportamental. Cada fase responde a uma pergunta e entrega um produto que alimenta a seguinte.") +
      card("", "<p>O processo alterna abertura e afunilamento: primeiro amplia o leque de ideias, depois concentra o foco para refinar e testar as soluções, com paralelos ao duplo diamante do Design Council. Nem todo projeto percorre as cinco fases: uma pesquisa exploratória pode terminar em Soluções e gerar recomendações, e outro pode chegar à ampliação de uma intervenção testada. A fase Escalar foi incorporada anos depois. Hoje a fase Testar não se restringe a ensaios randomizados e abrange métodos variados de avaliação (BIT, 2022).</p>") +
      '<ol class="steps">' + FASES.map(function (f, i) {
        return '<li><span class="big">' + (i + 1) + '</span><div><h3>' + f[0] + (f[0] !== f[1] ? ' <span style="font-weight:400;color:var(--ink-soft);font-size:14px">(' + f[1] + ")</span>" : "") + "</h3>" +
          '<p style="font-style:italic;margin-bottom:6px">' + f[2] + "</p><p><strong>Atividades:</strong> " + f[3] + "</p><p><strong>Ferramentas do BIT:</strong> " + f[4] + "</p><p><strong>Produto:</strong> " + f[5] + '</p><p class="meta"><a href="#/' + f[6] + '">Ferramenta deste site para esta fase</a></p></div></li>';
      }).join("") + "</ol>" +
      '<h2 class="sec">Correspondência com os sete passos do baralho</h2>' +
      tabela(["Passo (carta 12)", "Fase do TESTE", "TLA", "BASIC"], [
        ["1 · Observar por um novo olhar", "Target e Explorar", "Definir o resultado", "Behaviour e Analysis"],
        ["2 · Criar sem medo", "Soluções", "Definir a intervenção", "Strategies"],
        ["3 · Testar quantas vezes possível", "Testar", "Test", "Intervention"],
        ["4 · Medir sem preconceito", "Testar (pré-especificação)", "Learn", "Intervention"],
        ["5 · Re-testar sem apego", "Testar e Escalar (re-teste)", "Adapt", "Intervention"],
        ["6 · Implementar", "Escalar", "Adapt", "Change"],
        ["7 · Registrar o impacto e divulgar", "Escalar", "Learn", "Change"]
      ]) + aviso("A correspondência é proposta deste site. A descrição dos sete passos está em <a href=\"#/metodo\">Passo a passo do método</a>.") +
      aviso("As atividades e os tempos vêm do manual do BIT (Kettle e Persian, 2022). Os tempos são os indicados nas worksheets. Este site não reproduz as worksheets; consulte o material do BIT.") +
      fonte("Kettle e Persian (2022); BIT (2022). Tradução e organização deste site.") };
  };

  R["m/rigor"] = function () {
    return { html: cab("Metodologias · Rigor", "Cuidados na fase Testar", "A fase Testar é onde um projeto ganha ou perde credibilidade. Estes são os pontos de rigor que mais pesam, sobretudo quando as unidades são equipes e não indivíduos.") +
      '<h2 class="sec">Randomização</h2>' +
      "<p>O manual do BIT foca a randomização individual e menciona ensaios por <em>cluster</em> (por exemplo, alocação por equipes), sem cobri-los. Quando a unidade de análise é o servidor dentro da equipe, aloque <strong>equipes</strong> aleatoriamente aos grupos, para evitar contaminação entre colegas, se for viável. Se não for, o manual cita diferença-em-diferenças e pareamento como alternativas, com apoio de especialista (Kettle e Persian, 2022).</p>" +
      '<h2 class="sec">Amostra e poder</h2>' +
      "<p>O poder depende do efeito esperado, da variância do desfecho e do tamanho da amostra. O <strong>efeito mínimo detectável</strong> é o menor efeito que a amostra detecta de forma robusta. Pelas regras práticas do manual, abaixo de 500 participantes detectar efeito é muito improvável, e o cálculo não considera atrito. Em desenho por equipes, o número de equipes limita o poder, então um piloto pequeno serve melhor à viabilidade e à aprendizagem do que à estimativa do efeito. O manual sugere um piloto em pequena escala antes de um ensaio completo (Kettle e Persian, 2022).</p>" +
      card("", "<p>Planeje com efeitos realistas: as unidades de nudge dos Estados Unidos encontraram em média 1,4 ponto percentual (DellaVigna e Linos, 2022). A <a href=\"#/p/piloto\">calculadora de amostra</a> deste site tem um campo para o efeito do desenho por equipes.</p>", "gold") +
      '<h2 class="sec">Pré-especificação</h2>' +
      "<p>Defina um ou dois desfechos primários, o tipo de regressão, os controles e os subgrupos <strong>antes</strong> de analisar, com protocolo revisado por um especialista independente. Reporte tudo o que foi pré-especificado, inclusive os resultados nulos.</p>" +
      '<h2 class="sec">Piloto não é ensaio pequeno</h2>' +
      card("", "<p>Pfledderer et al. (2024) consolidaram 20 considerações para estudos-piloto e de viabilidade de intervenções comportamentais, em seis categorias: desenho da intervenção, desenho do estudo, condução do ensaio, implementação da intervenção, análise estatística e relato. A consequência prática é definir o que o piloto quer aprender (viabilidade, aceitação, retenção, qualidade da medida) e não tirar conclusões sobre efeito de uma amostra pequena.</p>") +
      '<h2 class="sec">Ética na fase de teste</h2>' +
      "<p>O BASIC pede códigos de conduta, consentimento informado, comitê de revisão, confidencialidade, pré-registro, relato de desistências e atenção à equidade (OCDE, 2019). No Brasil, pesquisas com seres humanos podem exigir submissão ao sistema CEP/Conep (Res. CNS 510/2016 para ciências humanas e sociais), e o uso de dados pessoais exige atenção à LGPD. Consulte o comitê da sua instituição.</p>" +
      fonte("Kettle e Persian (2022); DellaVigna e Linos (2022); Pfledderer et al. (2024); OCDE (2019)") +
      links([["p/piloto", "Ferramenta", "Ficha de piloto e amostra", "Com ajuste para equipes."], ["f/etica", "Relacionado", "Ética e legitimidade", "Além do comitê de ética."]]) };
  };

  R["m/exemplo"] = function () {
    return { html: cab("Metodologias · Exemplo", "Exemplo: colaboração e engajamento de servidores", "Um exemplo de trabalho que percorre o TESTE de ponta a ponta. Os comportamentos-alvo, as intervenções e o horizonte são propostas a validar com as equipes, e não resultados empíricos.") +
      '<h2 class="sec">O objeto de estudo</h2>' + tabela(["Dimensão", "Detalhamento"], [
        ["Tema", "Arquitetura de escolhas aplicada à colaboração e ao engajamento de servidores públicos em equipes de projeto."],
        ["Pergunta", "Em que medida intervenções de arquitetura de escolhas (opção padrão, redução de etapas e lembretes) aumentam a adesão a práticas colaborativas e o engajamento em projetos, em comparação com a rotina habitual das equipes?"],
        ["População", "Servidores públicos (efetivos e comissionados) que atuam em equipes de projeto. Ficam fora terceirizados, estagiários e o setor privado."],
        ["Unidade de análise", "O servidor dentro da equipe. A alocação aos grupos é feita por equipe, para evitar contaminação entre colegas."],
        ["Desfecho primário", "Colaboração: comportamentos observáveis, como atualizar a ferramenta compartilhada, compartilhar informação com a equipe, ajudar colegas e responder a solicitações no prazo combinado. São exemplos a validar com as equipes na fase Target."],
        ["Desfecho secundário", "Engajamento, medido pela UWES-9 (vigor, dedicação e absorção). Falta confirmar se existe forma curta de 9 itens validada em português."],
        ["Intervenções", "Três alavancas de baixo custo: opção padrão, simplificação de etapas e lembretes oportunos. Ficam fora incentivo monetário, sanção, reestruturação organizacional, urgência e norma social fabricadas."],
        ["Desenho", "Piloto com grupo de comparação e duas medições (linha de base e pós-intervenção), com alocação aleatória das equipes quando for viável. Ciclo curto (proposta inicial: 8 semanas)."],
        ["Ética e dados", "Consentimento, anonimização e uso de registros já existentes, com submissão ao sistema de ética em pesquisa e atenção à LGPD. Sem monitoramento individual identificado."]
      ]) +
      '<h2 class="sec">Fase a fase</h2>' + tabela(["Fase", "Aplicação", "Instrumentos", "Produto"], [
        ["Target", "Transformar “mais colaboração e engajamento” em 2 a 3 comportamentos observáveis, com <em>target statements</em>.", "Worksheets 1.A e 1.B; critérios META do CINCO", "Comportamentos-alvo e indicadores, com fonte de dados e escala"],
        ["Explorar", "Entrevistas com servidores e gestores, observação de reuniões e rotinas, análise de registros da ferramenta compartilhada.", "Worksheets 2.A e 2.C; Barrier Identification Tool; COM-B", "Mapa da jornada do servidor com barreiras de capacidade, oportunidade e motivação"],
        ["Soluções", "Opção padrão (por exemplo, pauta e registro pré-preenchidos), redução de etapas e lembretes oportunos.", "EAST; worksheet 3.B; teste ético", "Intervenções priorizadas e aprovadas do ponto de vista ético"],
        ["Testar", "Piloto com grupo de comparação, desfecho primário comportamental e secundário de engajamento.", "Worksheets 4.A e 4.B; protocolo com análise pré-especificada", "Efeito estimado, com intervalo de confiança"],
        ["Escalar", "Decidir se amplia, ajusta ou descarta a intervenção e divulgar o resultado, inclusive nulo.", "Worksheet 5.B (SCALE); sessão de lições aprendidas", "Plano de ampliação ou próximos passos"]
      ]) +
      '<h2 class="sec">Hipóteses sobre vieses a testar</h2>' +
      "<p>Na fase Explorar, tratam-se como hipóteses o <a href=\"#/v/status-quo\">viés do status quo</a>, a <a href=\"#/v/sobrecarga-opcoes\">sobrecarga de opções</a> e o <a href=\"#/v/vies-presente\">viés do presente</a>, que explicariam por que as práticas colaborativas não são adotadas. Nada disso está comprovado para este contexto.</p>" +
      '<h2 class="sec">Fora do escopo</h2>' +
      "<p>Percepção geral de clima ou satisfação, desempenho ou entrega final do projeto, efeitos de longo prazo e generalização para toda a administração.</p>" +
      fonte("Kettle e Persian (2022); Schaufeli, Bakker e Salanova (2006); Porto-Martins e Machado (2022); OCDE (2019); MGI (2025). Exemplo de trabalho elaborado a partir do documento TESTE.") };
  };

  /* =================== FERRAMENTAS POR FASE =================== */
  var PRATICA_FASES = [
    ["Target", "Definir quem deve mudar, o quê e quando", [
      ["p/target", "Target statements", "Escreva comportamentos-alvo e pontue impacto e viabilidade."],
      ["p/diagnostico", "Diagnóstico rápido", "Sintomas do serviço e vieses a investigar."]
    ]],
    ["Explorar", "Entender o que impede o comportamento", [
      ["p/csd", "Quadro CSD", "Separe certezas, suposições e dúvidas antes de pesquisar."],
      ["p/barreiras", "Barreiras COM-B", "Classifique barreiras e veja funções de intervenção."],
      ["p/auditoria", "Auditoria da jornada", "Obstáculos etapa por etapa."]
    ]],
    ["Soluções", "Gerar, priorizar e revisar ideias", [
      ["p/east", "Checklist EAST", "Fácil, atraente, social e oportuno."],
      ["p/mindspace", "Checklist MINDSPACE", "Nove influências para revisar."],
      ["p/ideias", "Priorizador de ideias", "Compare ideias por impacto e viabilidade."],
      ["p/etica", "Teste ético", "Pode ir ao ar?"]
    ]],
    ["Testar", "Desenhar o piloto e medir", [
      ["p/piloto", "Ficha de piloto e amostra", "Roteiro e calculadora, com ajuste para equipes."]
    ]],
    ["Escalar", "Decidir se amplia e planejar", [
      ["p/scale", "Checklist SCALE", "Patrocínio, custo, responsabilização, logística e evidência."]
    ]]
  ];

  R["pratica"] = function () {
    return { html: cab("Na prática", "Ferramentas de aplicação", "Instrumentos organizados pelas fases de um projeto (Target, Explorar, Soluções, Testar, Escalar), para transformar o conhecimento sobre vieses em melhorias concretas. As fontes dos frameworks são citadas; a seleção e a adaptação para serviços públicos são propostas deste site e precisam ser testadas. O que você escreve fica salvo neste navegador.") +
      PRATICA_FASES.map(function (f, i) {
        return '<h2 class="sec">' + (i + 1) + " · " + f[0] + '</h2><p class="note" style="margin-bottom:10px">' + f[1] + '</p><div class="grid2">' + f[2].map(function (t) {
          return '<a class="linkcard" href="#/' + t[0] + '"><h3>' + t[1] + "</h3><p>" + t[2] + "</p></a>";
        }).join("") + "</div>";
      }).join("") + '<p style="margin-top:24px"><a class="btn" href="#/m/teste">Ver o TESTE em cinco fases</a></p>' };
  };

  R["p/target"] = function () {
    var ed = editor({
      key: "ed-target",
      cols: [{ t: "Quem", type: "text" }, { t: "Faz o quê", type: "text" }, { t: "Quando e onde", type: "text" }, { t: "Impacto (1 a 5)", type: "num" }, { t: "Viabilidade (1 a 5)", type: "num" }],
      padrao: [["Servidor da equipe de projeto", "Atualiza a ferramenta compartilhada", "Até sexta-feira, após a reunião semanal", "4", "3"]],
      resumo: function (d) {
        var r = d.map(function (l) { var a = num(l[3]), b = num(l[4]); return a && b ? { t: [l[0], l[1], l[2]].filter(Boolean).join(" · "), p: a * b } : null; }).filter(Boolean).sort(function (x, y) { return y.p - x.p; });
        if (!r.length) return '<p class="note">Pontue impacto e viabilidade para ver a ordem de prioridade.</p>';
        return '<h2 class="sec">Prioridade (impacto × viabilidade)</h2><ol>' + r.map(function (x, i) { return "<li" + (i < 3 ? ' style="font-weight:600"' : "") + ">" + esc(x.t) + " (" + x.p + ")</li>"; }).join("") + "</ol><p class=\"note\">Em geral, mantêm-se 2 a 3 comportamentos por objetivo (BIT, 2022).</p>";
      }
    });
    return { html: cab("Fase Target", "Target statements", "Um <em>target statement</em> diz <strong>quem</strong> deve fazer <strong>o quê</strong> e <strong>quando</strong>. Escreva vários, pontue cada um de 1 a 5 em impacto e em viabilidade e fique com 2 a 3. Adaptado das worksheets 1.A e 1.B do BIT (2022); a pontuação e a ordenação são proposta deste site.") +
      ed.html +
      '<h2 class="sec">Um bom comportamento-alvo é</h2>' +
      card("", "<ul style=\"margin:0;padding-left:20px\"><li>mensurável: existe um registro ou uma observação que o mede;</li><li>específico: é uma ação, e não uma atitude como “colaborar mais”;</li><li>observável por outra pessoa;</li><li>consensual: as pessoas concordam sobre quando ele ocorreu.</li></ul><p class=\"note\" style=\"margin:10px 0 0\">Critérios que o guia CINCO (MGI, 2025) reúne sob a sigla META, parafraseados aqui.</p>"), init: ed.init };
  };

  R["p/csd"] = function () {
    var cols = [["Certezas", "O que sabemos com base em dados ou observação."], ["Suposições", "O que acreditamos, mas ainda não verificamos."], ["Dúvidas", "O que não sabemos e precisamos descobrir."]];
    var dados = ler("csd", ["", "", ""]);
    return { html: cab("Fase Explorar", "Quadro CSD: certezas, suposições e dúvidas", "Antes de pesquisar, separe o que se sabe do que se supõe e do que se ignora. As suposições viram hipóteses e as dúvidas viram perguntas dos roteiros de entrevista. A matriz CSD vem do guia CINCO (MGI, 2025); este quadro é uma versão simples para anotar.") +
      '<div class="grid3">' + cols.map(function (c, i) {
        return '<div class="card"><label class="f" for="csd' + i + '"><strong>' + c[0] + "</strong></label><p class=\"note\">" + c[1] + '</p><textarea id="csd' + i + '" rows="9" style="width:100%"></textarea></div>';
      }).join("") + '</div><p><button class="btn" id="csd-copy" type="button">Copiar</button> <span class="note" id="csd-msg" role="status"></span></p>',
      init: function () {
        cols.forEach(function (c, i) { var t = $("#csd" + i); t.value = dados[i] || ""; t.addEventListener("input", function () { dados[i] = t.value; guardar("csd", dados); }); });
        $("#csd-copy").addEventListener("click", function () { copiar(cols.map(function (c, i) { return c[0].toUpperCase() + "\n" + (dados[i] || ""); }).join("\n\n"), $("#csd-msg")); });
      } };
  };

  R["p/barreiras"] = function () {
    var comps = Object.keys(MAPA);
    var ed = editor({
      key: "ed-barreiras",
      cols: [{ t: "Barreira ou facilitador", type: "area" }, { t: "Componente COM-B", type: "sel", opts: comps }, { t: "Evidência ou fonte", type: "area" }],
      padrao: [["Pauta e registro da reunião são refeitos do zero a cada semana", "Oportunidade física", "Observação de reuniões (exemplo ilustrativo)"]],
      resumo: function (d) {
        var cont = {}; d.forEach(function (l) { if (l[0].trim()) cont[l[1]] = (cont[l[1]] || 0) + 1; });
        var ks = Object.keys(cont); if (!ks.length) return "";
        return '<h2 class="sec">Resumo e funções de intervenção relacionadas</h2>' + tabela(["Componente", "Barreiras", "Funções de intervenção (roda de mudança de comportamento)"], ks.map(function (k) {
          return [k, cont[k], MAPA[k].join(", ")];
        })) + '<p class="note">O mapeamento segue a roda de mudança de comportamento (Michie et al., 2011; 2014); confira na fonte. As funções são pontos de partida: ainda é preciso desenhar a intervenção, avaliar a ética e testar. Definições na página <a href="#/f/comportamento">Como o comportamento muda</a>.</p>';
      }
    });
    return { html: cab("Fase Explorar", "Barreiras COM-B", "Liste as barreiras e facilitadores que você observou e classifique cada uma em capacidade, oportunidade ou motivação (Michie et al., 2011). O quadro resume onde estão os problemas e quais funções de intervenção se relacionam. Inspirado na Barrier Identification Tool do BIT (2022).") + ed.html + '<p><a class="btn" href="#/f/comportamento">Entender o COM-B</a></p>', init: ed.init };
  };

  R["p/ideias"] = function () {
    var crit = ["Evidências", "Implementação", "Barreiras", "Orçamento", "Riscos", "Autoridade"];
    var ed = editor({
      key: "ed-ideias",
      cols: [{ t: "Ideia", type: "area" }, { t: "Impacto", type: "num" }].concat(crit.map(function (c) { return { t: c, type: "num" }; })),
      padrao: [["Pauta e registro da reunião pré-preenchidos (opção padrão)", "4", "4", "4", "3", "5", "4", "4"], ["Lembrete oportuno no dia da reunião", "2", "3", "5", "4", "5", "5", "5"]],
      resumo: function (d) {
        var r = d.map(function (l) {
          var im = num(l[1]), vs = l.slice(2).map(num).filter(function (x) { return x !== null; });
          if (!l[0].trim() || !im || vs.length < 6) return null;
          var v = vs.reduce(function (a, b) { return a + b; }, 0) / vs.length; return { t: l[0], im: im, v: v, p: im * v };
        }).filter(Boolean).sort(function (a, b) { return b.p - a.p; });
        if (!r.length) return '<p class="note">Preencha impacto e os seis critérios de viabilidade para ver a ordem.</p>';
        return '<h2 class="sec">Ordem de prioridade</h2>' + tabela(["Ideia", "Impacto", "Viabilidade (média)", "Pontuação"], r.map(function (x) { return [esc(x.t), x.im, x.v.toFixed(1).replace(".", ","), x.p.toFixed(1).replace(".", ",")]; })) +
          '<p class="note">Pontuação = impacto × média da viabilidade. É um critério de apoio à discussão, e não substitui a avaliação de ética e de evidência.</p>';
      }
    });
    return { html: cab("Fase Soluções", "Priorizador de ideias", "Pontue cada ideia de 1 a 5 em impacto e em seis critérios de viabilidade: evidências, implementação, barreiras, orçamento, riscos e autoridade (5 = mais favorável). A média da viabilidade e o impacto geram a ordem. Adaptado da worksheet 3.B do BIT (2022); a fórmula é proposta deste site.") + ed.html +
      '<p><a class="btn" href="#/p/east">Gerar ideias com o EAST</a> <a class="btn" href="#/p/etica">Passar pelo teste ético</a></p>', init: ed.init };
  };

  R["p/scale"] = function () {
    var secs = [
      ["S", "Patrocínio (Sponsorship)", ["Há alguém com autoridade para decidir e defender a ampliação?"]],
      ["C", "Custo e benefício (Cost/benefit)", ["O benefício estimado supera o custo de ampliar, incluindo o tempo das equipes?"]],
      ["A", "Responsabilização (Accountability)", ["Cada atividade de ampliação tem um responsável e um prazo?"]],
      ["L", "Logística (Logistics)", ["A intervenção funciona com os sistemas, a estrutura e as pessoas dos lugares onde será ampliada?"]],
      ["E", "Evidência (Evidence)", ["O efeito foi estimado com rigor e há plano para monitorar depois da ampliação?"]]
    ];
    var dados = ler("scale", {});
    return { html: cab("Fase Escalar", "Checklist SCALE", "Antes de ampliar uma intervenção que funcionou, responda às cinco dimensões do modelo SCALE: patrocínio, custo e benefício, responsabilização, logística e evidência (BIT, 2022). As perguntas e a marcação de status são deste site. Se o teste não teve impacto, planeje pesquisa qualitativa de acompanhamento e uma sessão de lições aprendidas.") +
      secs.map(function (s) {
        return '<div class="card"><span class="tag">' + s[0] + " · " + s[1] + "</span><h3>" + s[2][0] + '</h3><label class="f" for="sc-' + s[0] + '">Resposta</label><select id="sc-' + s[0] + '"><option value="">Selecione</option><option value="s">Sim</option><option value="p">Em parte</option><option value="n">Não</option></select><label class="f" for="sn-' + s[0] + '">Quem, como e quando</label><textarea id="sn-' + s[0] + '" rows="2" style="width:100%"></textarea></div>';
      }).join("") + '<div class="result" id="sc-out" aria-live="polite"></div>' +
      '<p class="note" style="margin-top:12px">Publique o resultado, inclusive se for nulo ou negativo.</p>',
      init: function () {
        function calc() {
          var v = secs.map(function (s) { return dados[s[0]] ? dados[s[0]].r : ""; });
          var feitas = v.filter(Boolean).length, ns = v.filter(function (x) { return x === "n"; }).length, ps = v.filter(function (x) { return x === "p"; }).length;
          var o = $("#sc-out");
          if (feitas < 5) { o.textContent = "Respondidas: " + feitas + " de 5."; return; }
          o.innerHTML = ns ? '<span class="warn"><strong>Ainda não.</strong></span> ' + ns + " dimensão(ões) sem resposta positiva. Resolva antes de ampliar." :
            ps ? '<span class="warn"><strong>Quase.</strong></span> ' + ps + " dimensão(ões) em parte. Feche as lacunas e defina o responsável." : '<span class="ok"><strong>Pronto para planejar a ampliação.</strong></span> Monitore e registre o resultado.';
        }
        secs.forEach(function (s) {
          var d = dados[s[0]] || (dados[s[0]] = { r: "", n: "" });
          var se = $("#sc-" + s[0]), ta = $("#sn-" + s[0]); se.value = d.r; ta.value = d.n;
          se.addEventListener("change", function () { d.r = se.value; guardar("scale", dados); calc(); });
          ta.addEventListener("input", function () { d.n = ta.value; guardar("scale", dados); });
        });
        calc();
      } };
  };

  window.EXTRA = {
    render: function (h) { return R[h] ? R[h]() : null; }
  };
})();
