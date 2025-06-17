
    window.addEventListener('scroll', () => {
      const s = document.documentElement.scrollTop || document.body.scrollTop;
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const p = (s / h) * 100;
      document.getElementById('progressBar').style.width = p + '%';
      const btn = document.getElementById('scrollTopBtn');
      if (s > 400) btn.style.display = 'flex'; else btn.style.display = 'none';
    });
    document.getElementById('scrollTopBtn').addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.addEventListener('DOMContentLoaded', () => {
      const revealEls = document.querySelectorAll('.reveal');
      const icons = document.querySelectorAll('.svg-icon-col');
      const faq = document.querySelectorAll('.faq-item');
      const final = document.querySelector('.final-cta-section');
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.15 });
      revealEls.forEach(el => observer.observe(el));
      icons.forEach(el => observer.observe(el));
      faq.forEach(el => observer.observe(el));
      observer.observe(final);
    });

    const words = ["SUA MARCA", "SEU RITMO", "SUA CONQUISTA"];
    let idxWord = 0;
    function showWord(n) {
      for (let i = 0; i < words.length; i++) {
        document.getElementById("word" + i).classList.remove("active");
      }
      if (n < words.length) {
        document.getElementById("word" + n).classList.add("active");
      }
    }
    function runCarousel() {
      showWord(idxWord);
      idxWord++;
      if (idxWord < words.length) {
        setTimeout(runCarousel, 1200);
      } else {
        setTimeout(() => {
          words.forEach((_, i) => document.getElementById("word" + i).classList.remove("active"));
          document.getElementById("bemvindoMsg").classList.add("show");
        }, 1400);
      }
    }
    window.addEventListener("load", () => {
      const h = new Date().getHours();
      const b = document.getElementById("bemvindoMsg");
      if (h < 12) b.textContent = "Bom dia! Bem-vindo à sua nova jornada.";
      else if (h < 18) b.textContent = "Boa tarde! Bem-vindo à sua nova jornada.";
      else b.textContent = "Boa noite! Bem-vindo à sua nova jornada.";
      setTimeout(runCarousel, 500);
    });
    document.getElementById("scrollArrow").onclick = () => {
      document.getElementById("servicos").scrollIntoView({ behavior: "smooth" });
    };

    document.getElementById("contactForm").onsubmit = function(e) {
      e.preventDefault();
      document.getElementById("formSuccess").textContent = "Mensagem enviada! Entraremos em contato 🚀";
      setTimeout(() => document.getElementById("formSuccess").textContent = "", 3800);
      this.reset();
    };

    const ctx = document.getElementById("rarvsRadar").getContext("2d");
    const radarData = {
      labels: ["Inovação", "Segurança", "Reconhecimento"],
      datasets: [{
        label: "Seu Perfil",
        data: [6, 6, 6],
        fill: true,
        backgroundColor: "rgba(72,180,255,0.08)",
        borderColor: "#48B4FF",
        pointBackgroundColor: "#48B4FF",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#48B4FF"
      }]
    };
    new Chart(ctx, {
      type: "radar",
      data: radarData,
      options: {
        plugins: { legend: { display: false } },
        scales: {
          r: {
            min: 0,
            max: 10,
            angleLines: { display: true, color: "#48B4FF44" },
            grid: { color: "#48B4FF22" },
            pointLabels: { font: { size: 15, weight: "bold" }, color: "#fff" },
            ticks: { display: false }
          }
        }
      }
    });

    const perfilExplorador = document.getElementById("profile-explorador");
    const perfilPlanejador = document.getElementById("profile-planejador");
    const perfilProtagonista = document.getElementById("profile-protagonista");
    function atualizarPerfil() {
      const i = +document.getElementById("inovacao").value;
      const s = +document.getElementById("seguranca").value;
      const r = +document.getElementById("reconhecimento").value;
      radarData.datasets[0].data = [i, s, r];
      Chart.getChart("rarvsRadar").update();

      perfilExplorador.classList.remove("active-profile");
      perfilPlanejador.classList.remove("active-profile");
      perfilProtagonista.classList.remove("active-profile");

      const m = Math.max(i, s, r);
      if (i === m) perfilExplorador.classList.add("active-profile");
      if (s === m) perfilPlanejador.classList.add("active-profile");
      if (r === m) perfilProtagonista.classList.add("active-profile");
    }
    document.querySelectorAll(".slider-row input").forEach(el => {
      el.addEventListener("input", atualizarPerfil);
    });
    window.addEventListener("load", atualizarPerfil);

    const servicosInfo = {
      "trafego":   { titulo: "Tráfego Pago",             descricao: "Campanhas alinhadas ao seu momento. Inovação e testes para otimizar seu investimento." },
      "sites":     { titulo: "Sites & Landing Pages",    descricao: "Base sólida e visual clean. Design moderno, performance e SEO para conversão." },
      "redes":     { titulo: "Redes Sociais & Conteúdo", descricao: "Conteúdo e linguagem que conectam sua marca ao público certo." },
      "branding":  { titulo: "Logo, KV & Branding",      descricao: "Identidade forte e memorável, alinhada aos seus valores." },
      "crm":       { titulo: "CRM & Processos Comerciais", descricao: "Planejamento de funil, automação e controle total de leads e oportunidades." },
      "terceirizacao": { titulo: "Terceirização Comercial", descricao: "Equipe de vendas especializada para ampliar seu alcance e converter mais." }
    };
    const diagnosticTexts = {
      explorador: {
        trafego: "**Explorador + Tráfego Pago**\n\nComo Explorador, você busca inovação e resultados rápidos. Investir em Tráfego Pago permitirá que você teste criativos, públicos e canais de forma ágil. Montaremos campanhas com segmentações ousadas, otimizando em tempo real para maximizar seus lucros e escalar suas estratégias de forma dinâmica.",
        sites:    "**Explorador + Sites & Landing Pages**\n\nPara um Explorador, ter um site ou landing page que funcione como laboratório é essencial. Desenvolveremos páginas focadas em experimentação, com A/B tests de design, chamadas para ação e fluxos de conversão. Assim, você poderá validar hipóteses e ajustar rapidamente, sempre em busca do melhor desempenho.",
        redes:    "**Explorador + Redes Sociais & Conteúdo**\n\nNo território das redes sociais, seu espírito explorador brilha. Vamos explorar formatos inovadores – de Reels interativos a carrosséis instigantes – para descobrir o que gera maior engajamento. Cada post será uma oportunidade de testar narrativas, ângulos e calls-to-action, elevando sua marca à vanguarda das tendências.",
        branding: "**Explorador + Logo, KV & Branding**\n\nA identidade visual precisa refletir seu olhar arrojado. Criaremos um branding disruptivo, com paleta de cores ousada e elementos gráficos arrojados, que comuniquem a modernidade e a coragem da sua marca. Seu logo e KV contarão histórias que evoquem curiosidade, sinalizando que você está sempre pronto para quebrar paradigmas.",
        crm:      "**Explorador + CRM & Processos Comerciais**\n\nComo Explorador, uma estrutura de CRM flexível permitirá acompanhar experimentações em vendas. Implementaremos automações criativas, segmentações fora do comum e pipelines de nutrição adaptáveis. Isso garante que cada lead seja nutrido de maneira dinâmica, possibilitando ajustes em tempo real e aprendizados constantes.",
        terceirizacao: "**Explorador + Terceirização Comercial**\n\nTerceirizar sua equipe de vendas com profissionais que adotam técnicas inovadoras vai turbinar seu alcance. Faremos prospecções usando scripts ágeis e data-driven, testando diferentes abordagens de contato em tempo real. Assim, você expande territórios de mercado sem amarras, sempre buscando novas oportunidades."
      },
      planejador: {
        trafego: "**Planejador + Tráfego Pago**\n\nPara quem planeja cada passo, uma estratégia de Tráfego Pago bem estruturada é fundamental. Vamos definir orçamentos mensais, alocar verbas por canal e estabelecer KPIs claros. Com relatórios diários e ajustes semanais, você terá previsibilidade de resultados, garantindo que cada real investido retorne em forma de novos clientes qualificados.",
        sites:    "**Planejador + Sites & Landing Pages**\n\nUm Planejador precisa de um site sólido e escalável. Iremos criar páginas com arquitetura de informação clara, foco em SEO e boa experiência do usuário. Cada etapa do funil será mapeada: da captura de e-mail ao fechamento de venda. Com landing pages segmentadas para diferentes campanhas, você terá controle total sobre métricas e conversões.",
        redes:    "**Planejador + Redes Sociais & Conteúdo**\n\nNo mundo das redes sociais, você quer consistência e valor a longo prazo. Desenvolveremos um calendário editorial robusto, planejando posts, stories e engajamentos de forma estratégica. Cada conteúdo será alinhado a datas-chave e objetivos de negócio, garantindo uma presença digital organizada, com métricas claras para medir ROI e crescimento sustentável.",
        branding: "**Planejador + Logo, KV & Branding**\n\nPara estruturar sua identidade, vamos criar guidelines de marca detalhados: paleta de cores, tipografia, uso de elementos gráficos e aplicações em peças. Isso assegura coerência em todos os canais. Com padrões visuais bem definidos, sua marca ganhará autoridade e reconhecimento, mantendo a uniformidade mesmo em múltiplas frentes de ação.",
        crm:      "**Planejador + CRM & Processos Comerciais**\n\nImplementar um CRM organizado é essencial para previsibilidade. Configuraremos pipelines, automações de e-mail e relatórios de performance para cada estágio de venda. Você terá visibilidade sobre funil de leads, oportunidades e taxas de conversão, podendo ajustar processos comercial e de atendimento com clareza e objetividade.",
        terceirizacao: "**Planejador + Terceirização Comercial**\n\nTerceirizar a área comercial sob uma abordagem padronizada garante consistência. Nossa equipe seguirá roteiros de prospecção bem definidos, utilizando ferramentas de automação para cadência de follow-up. Assim, cada lead é tratado de forma sistemática, gerando previsibilidade em vendas e mantendo controle total sobre métricas de pipeline."
      },
      protagonista: {
        trafego: "**Protagonista + Tráfego Pago**\n\nComo Protagonista, você quer ser visto. Vamos montar campanhas de alto impacto, segmentando audiências sofisticadas e criando anúncios que reforcem sua autoridade. Com estratégias de remarketing e lookalike, sua marca será protagonista nas mentes dos consumidores, aumentando visibilidade e reconhecimento, gerando leads qualificados.",
        sites:    "**Protagonista + Sites & Landing Pages**\n\nUm Site ou Landing Page para Protagonista precisa transmitir autoridade. Iremos criar páginas com design premium, narrativas envolventes e provas sociais (depoimentos, cases de sucesso). Cada elemento mostrará seu valor de mercado, valorizando sua trajetória e fazendo com que visitantes sintam imediatamente confiança e desejo de parceria.",
        redes:    "**Protagonista + Redes Sociais & Conteúdo**\n\nPara reforçar seu protagonismo, produziremos conteúdo de alta qualidade: vídeos institucionais, entrevistas, depoimentos de clientes e análises aprofundadas. Suas redes sociais se tornarão palcos de autoridade, onde você compartilha conquistas, insights e inspira seguidores. Assim, sua marca se consolida como referência absoluta no setor.",
        branding: "**Protagonista + Logo, KV & Branding**\n\nSua identidade visual deve refletir status e prestígio. Vamos criar um logo sofisticado, KV marcante e aplicações que revelem sua exclusividade. Cores fortes, tipografia elegante e elementos gráficos premium farão sua marca se destacar, transmitindo poder e autoridade em cada peça, seja digital ou impressa.",
        crm:      "**Protagonista + CRM & Processos Comerciais**\n\nUm CRM personalizado garante que cada lead perceba seu valor. Implementaremos jornadas de relacionamento com automações que celebram cada interação importante. Desde o primeiro contato até o pós-venda, cada passo será tratado de forma VIP, reforçando seu protagonismo e garantindo fidelização de clientes de alto valor.",
        terceirizacao: "**Protagonista + Terceirização Comercial**\n\nTerceirizar seu time de vendas com profissionais que entendem sua visão potencializa seu impacto. Nossos especialistas em vendas representarão sua marca com autoridade, utilizando discursos alinhados ao seu storytelling. Assim, cada negociação reflete seu protagonismo, criando impacto imediato e reforçando sua posição de liderança."
      }
    };

    document.getElementById("btnAnalyze").onclick = () => {
      const i = +document.getElementById("inovacao").value;
      const s = +document.getElementById("seguranca").value;
      const r = +document.getElementById("reconhecimento").value;
      let perfilDominante = "";
      const maior = Math.max(i, s, r);
      if (i === maior && i > s && i > r) perfilDominante = "explorador";
      else if (s === maior && s > i && s > r) perfilDominante = "planejador";
      else if (r === maior && r > i && r > s) perfilDominante = "protagonista";
      else {
        if (i === maior) perfilDominante = "explorador";
        else if (s === maior) perfilDominante = "planejador";
        else perfilDominante = "protagonista";
      }

      const div = document.getElementById("analysisResult");
      div.innerHTML = `
        <h3>Escolha um ou mais serviços</h3>
        <p>Perfil dominante: <strong>${perfilDominante.charAt(0).toUpperCase() + perfilDominante.slice(1)}</strong></p>
        <p>Marque todas as opções abaixo que você deseja incluir no seu diagnóstico:</p>
        <div style="margin-top: 16px;">
          <div class="service-checkbox">
            <input type="checkbox" id="chk-trafego" data-service="trafego" data-perfil="${perfilDominante}">
            <label for="chk-trafego">${servicosInfo["trafego"].titulo}</label>
          </div>
          <div class="service-checkbox">
            <input type="checkbox" id="chk-sites" data-service="sites" data-perfil="${perfilDominante}">
            <label for="chk-sites">${servicosInfo["sites"].titulo}</label>
          </div>
          <div class="service-checkbox">
            <input type="checkbox" id="chk-redes" data-service="redes" data-perfil="${perfilDominante}">
            <label for="chk-redes">${servicosInfo["redes"].titulo}</label>
          </div>
          <div class="service-checkbox">
            <input type="checkbox" id="chk-branding" data-service="branding" data-perfil="${perfilDominante}">
            <label for="chk-branding">${servicosInfo["branding"].titulo}</label>
          </div>
          <div class="service-checkbox">
            <input type="checkbox" id="chk-crm" data-service="crm" data-perfil="${perfilDominante}">
            <label for="chk-crm">${servicosInfo["crm"].titulo}</label>
          </div>
          <div class="service-checkbox">
            <input type="checkbox" id="chk-terceirizacao" data-service="terceirizacao" data-perfil="${perfilDominante}">
            <label for="chk-terceirizacao">${servicosInfo["terceirizacao"].titulo}</label>
          </div>
        </div>
        <button id="btnShowMultiDiag" class="btn-diagnostico">Mostrar Diagnóstico</button>
      `;
      div.style.display = "block";
      div.scrollIntoView({ behavior: "smooth" });
      document.getElementById("btnShowMultiDiag").onclick = gerarDiagnosticoMultiplo;
    };

    function gerarDiagnosticoMultiplo() {
      const marcados = Array.from(document.querySelectorAll(".service-checkbox input[type='checkbox']")).filter(chk => chk.checked);
      if (marcados.length === 0) {
        alert("Por favor, selecione ao menos um serviço para ver o diagnóstico.");
        return;
      }
      const textosFormatados = marcados.map(chk => {
        const serv = chk.getAttribute("data-service");
        const perf = chk.getAttribute("data-perfil");
        const fullText = diagnosticTexts[perf][serv];
        const partes = fullText.split("\n\n");
        const titulo = partes[0].replace(/\*\*/g, "");
        const descricao = partes.slice(1).join("\n\n");
        return {
          servico: servicosInfo[serv].titulo,
          titulo: titulo,
          descricao: descricao
        };
      });

      let html = `<h3>Diagnóstico Completo</h3>`;
      textosFormatados.forEach(item => {
        html += `
          <p class="diag-title">${item.titulo}</p>
          <p style="margin-top:8px; line-height:1.6;">${item.descricao}</p>
        `;
      });
      html += `
        <h4 style="margin-top: 24px; color: var(--color-accent);">Próximos Passos</h4>
        <p style="color: var(--color-text-soft);">
          Se quiser aprofundar essas estratégias e implementar soluções práticas, nossa equipe entrará em contato para detalhar cada etapa e montar um plano personalizado.
        </p>
      `;
      const div = document.getElementById("analysisResult");
      div.innerHTML = html;
      div.scrollIntoView({ behavior: "smooth" });
    }

    document.querySelectorAll(".faq-question").forEach(el => {
      el.onclick = function() {
        this.parentElement.classList.toggle("faq-open");
      };
    });

    function hideDetails() {
      document.querySelectorAll(".service-detail").forEach(d => {
        d.style.display = "none";
        d.classList.remove("in-view");
      });
    }
    document.querySelectorAll(".saiba-mais").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        hideDetails();
        const targetId = link.dataset.target;
        const detailDiv = document.getElementById(targetId);
        if (detailDiv) {
          detailDiv.style.display = "block";
          setTimeout(() => detailDiv.classList.add("in-view"), 50);
          detailDiv.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
    document.querySelectorAll(".voltar").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const parent = link.closest(".service-detail");
        parent.classList.remove("in-view");
        parent.style.display = "none";
        document.getElementById("servicos").scrollIntoView({ behavior: "smooth" });
      });
    });

    let curTest = 0;
    const tests = document.querySelectorAll(".testimonial-card");
    document.getElementById("nextTest").onclick = () => {
      tests[curTest].classList.remove("active");
      curTest = (curTest + 1) % tests.length;
      tests[curTest].classList.add("active");
    };
    document.getElementById("prevTest").onclick = () => {
      tests[curTest].classList.remove("active");
      curTest = (curTest - 1 + tests.length) % tests.length;
      tests[curTest].classList.add("active");
    };

    document.addEventListener("DOMContentLoaded", () => {
      const btnHamburger = document.getElementById("hamburgerBtn");
      const navLinks = document.querySelector(".nav-links");
      btnHamburger.addEventListener("click", () => {
        navLinks.classList.toggle("open");
      });
    });
  