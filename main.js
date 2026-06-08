/**
 * ARQUIVO: main.js
 * PROJETO: Agrinho 2026 - Tecnologia, Agricultura e Sustentabilidade
 * DESCRIÇÃO: Script para controle de interatividades, acessibilidade e dinamismo do site.
 */

// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener("DOMContentLoaded", () => {
    initAcessibilidade();
    initModoEscuro();
    initCarrossel();
    initCalculadora();
    initCadastro();
    initNoticias();
    initChatbot();
    initScrollSuave();
});

/* ==========================================================================
   1. RECURSOS DE ACESSIBILIDADE
   ========================================================================== */
function initAcessibilidade() {
    const btnContraste = document.getElementById("btn-alto-contraste");
    const btnDislexia = document.getElementById("btn-dislexia");
    const btnAumentarTexto = document.getElementById("btn-aumentar-texto");
    const btnDiminuirTexto = document.getElementById("btn-diminuir-texto");
    
    let tamanhoFonteAtual = 100; // Representa 100% (16px padrão)

    // Alto Contraste
    if (btnContraste) {
        btnContraste.addEventListener("click", () => {
            document.body.classList.toggle("alto-contraste");
            // Salva a preferência do usuário no navegador
            const status = document.body.classList.contains("alto-contraste");
            localStorage.setItem("altoContraste", status);
        });
        // Recupera preferência salva
        if (localStorage.getItem("altoContraste") === "true") {
            document.body.classList.add("alto-contraste");
        }
    }

    // Fonte para Dislexia
    if (btnDislexia) {
        btnDislexia.addEventListener("click", () => {
            document.body.classList.toggle("fonte-dislexia");
            const status = document.body.classList.contains("fonte-dislexia");
            localStorage.setItem("fonteDislexia", status);
        });
        // Recupera preferência salva
        if (localStorage.getItem("fonteDislexia") === "true") {
            document.body.classList.add("fonte-dislexia");
        }
    }

    // Controle de Tamanho do Texto
    if (btnAumentarTexto && btnDiminuirTexto) {
        btnAumentarTexto.addEventListener("click", () => {
            if (tamanhoFonteAtual < 130) { // Limite máximo de 130%
                tamanhoFonteAtual += 10;
                document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
            }
        });

        btnDiminuirTexto.addEventListener("click", () => {
            if (tamanhoFonteAtual > 80) { // Limite mínimo de 80%
                tamanhoFonteAtual -= 10;
                document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
            }
        });
    }
}

/* ==========================================================================
   2. MODO CLARO / ESCURO
   ========================================================================== */
function initModoEscuro() {
    const btnModo = document.getElementById("btn-modo-escuro");
    
    if (btnModo) {
        btnModo.addEventListener("click", () => {
            document.body.classList.toggle("modo-escuro");
            const status = document.body.classList.contains("modo-escuro");
            localStorage.setItem("modoEscuro", status);
            // Atualiza o ícone/texto do botão se necessário
            btnModo.textContent = status ? "☀️ Modo Claro" : "🌙 Modo Escuro";
        });

        // Recupera preferência salva
        if (localStorage.getItem("modoEscuro") === "true") {
            document.body.classList.add("modo-escuro");
            btnModo.textContent = "☀️ Modo Claro";
        }
    }
}

/* ==========================================================================
   3. CARROSSEL AUTOMÁTICO
   ========================================================================== */
function initCarrossel() {
    const slides = document.querySelectorAll(".carrossel-item");
    if (slides.length === 0) return;

    let slideAtual = 0;
    const tempoTroca = 4000; // 4 segundos

    function mostrarSlide(indice) {
        slides.forEach(slide => slide.classList.remove("ativo"));
        slides[indice].classList.add("ativo");
    }

    function proximoSlide() {
        slideAtual = (slideAtual + 1) % slides.length;
        mostrarSlide(slideAtual);
    }

    // Inicia o ciclo automático
    let intervaloCarrossel = setInterval(proximoSlide, tempoTroca);

    // Pausa o carrossel se o usuário passar o mouse por cima
    const containerCarrossel = document.querySelector(".carrossel-container");
    if (containerCarrossel) {
        containerCarrossel.addEventListener("mouseenter", () => clearInterval(intervaloCarrossel));
        containerCarrossel.addEventListener("mouseleave", () => {
            intervaloCarrossel = setInterval(proximoSlide, tempoTroca);
        });
    }
}

/* ==========================================================================
   4. CALCULADORA ECOLÓGICA
   ========================================================================== */
function initCalculadora() {
    const btnCalcular = document.getElementById("btn-calcular");
    
    if (btnCalcular) {
        btnCalcular.addEventListener("click", () => {
            const hectares = parseFloat(document.getElementById("input-hectares").value);
            const tecnologia = document.getElementById("select-tecnologia").value;
            const painelResultado = document.getElementById("resultado-calculadora");

            if (isNaN(hectares) || hectares <= 0) {
                painelResultado.innerHTML = "<p style='color: red;'>Por favor, insira uma quantidade válida de hectares.</p>";
                return;
            }

            let economiaAguaPorHectare = 0;
            let reducaoCO2PorHectare = 0;
            let recursoPolpado = "";

            // Lógica baseada na tecnologia selecionada
            switch (tecnologia) {
                case "sensores":
                    economiaAguaPorHectare = 1500; // Litros economizados por mês
                    reducaoCO2PorHectare = 12;      // kg de CO2 evitados por mês
                    recursoPolpado = "Água via Irrigação Inteligente";
                    break;
                case "ia":
                    economiaAguaPorHectare = 800;
                    reducaoCO2PorHectare = 35; // Alta redução por otimizar maquinário
                    recursoPolpado = "Defensivos Agrícolas e Combustível";
                    break;
                case "drones":
                    economiaAguaPorHectare = 400;
                    reducaoCO2PorHectare = 25;
                    recursoPolpado = "Combustível Fóssil e Insumos";
                    break;
                default:
                    economiaAguaPorHectare = 0;
                    reducaoCO2PorHectare = 0;
            }

            // Cálculo total
            const totalAgua = (economiaAguaPorHectare * hectares).toLocaleString("pt-BR");
            const totalCO2 = (reducaoCO2PorHectare * hectares).toLocaleString("pt-BR");

            // Exibição do resultado estilizado
            painelResultado.innerHTML = `
                <div class="resultado-box animate-fade">
                    <h4>Impacto Estimado Mensal:</h4>
                    <p>💧 <strong>${totalAgua} litros</strong> de água preservados.</p>
                    <p>🌱 <strong>${totalCO2} kg</strong> de CO₂ evitados na atmosfera.</p>
                    <p><small>Foco de otimização: Hectares monitorados com ${recursoPolpado}.</small></p>
                </div>
            `;
        });
    }
}

/* ==========================================================================
   5. CADASTRO DE PRODUTOR RURAL (VALIDAÇÃO)
   ========================================================================== */
function initCadastro() {
    const formCadastro = document.getElementById("form-produtor");
    
    if (formCadastro) {
        formCadastro.addEventListener("submit", (evento) => {
            evento.preventDefault(); // Evita o recarregamento da página

            const nome = document.getElementById("cad-nome").value.trim();
            const email = document.getElementById("cad-email").value.trim();
            const estado = document.getElementById("cad-estado").value;
            const mensagemFeedback = document.getElementById("cadastro-feedback");

            // Validação simples de preenchimento
            if (nome === "" || email === "" || estado === "") {
                mensagemFeedback.innerHTML = "<p style='color: red;'>Por favor, preencha todos os campos obrigatórios.</p>";
                return;
            }

            // Simulação de envio com sucesso
            mensagemFeedback.innerHTML = `
                <p style='color: green; font-weight: bold;'>
                    ✨ Cadastro realizado com sucesso, ${nome}! Bem-vindo à rede do Agrinho 2026.
                </p>
            `;
            
            formCadastro.reset(); // Limpa os campos do formulário
        });
    }
}

/* ==========================================================================
   6. ÁREA DE NOTÍCIAS DINÂMICA
   ========================================================================== */
function initNoticias() {
    const btnCarregarNoticias = document.getElementById("btn-mais-noticias");
    const containerNoticias = document.getElementById("container-noticias-extras");

    // Banco de dados fictício de notícias extras
    const noticiasExtras = [
        {
            titulo: "Sensores IoT reduzem consumo de água em 40% no Paraná",
            resumo: "Propriedades pioneiras demonstram como a telemetria em tempo real evita o desperdício de recursos hídricos.",
            data: "05/06/2026"
        },
        {
            titulo: "Robótica de campo ganha espaço na colheita seletiva",
            resumo: "Novos braços mecânicos integrados com visão computacional conseguem colher apenas frutos perfeitamente maduros.",
            data: "28/05/2026"
        }
    ];

    if (btnCarregarNoticias && containerNoticias) {
        btnCarregarNoticias.addEventListener("click", () => {
            // Evita carregar duplicado se já foi clicado
            if (containerNoticias.children.length > 0) {
                btnCarregarNoticias.textContent = "Todas as notícias carregadas";
                btnCarregarNoticias.disabled = true;
                return;
            }

            noticiasExtras.forEach(noticia => {
                const card = document.createElement("div");
                card.className = "noticia-card extra animate-fade";
                card.innerHTML = `
                    <span class="noticia-data">${noticia.data}</span>
                    <h3>${noticia.titulo}</h3>
                    <p>${noticia.resumo}</p>
                `;
                containerNoticias.appendChild(card);
            });

            btnCarregarNoticias.textContent = "Mostrando tudo";
            btnCarregarNoticias.disabled = true;
        });
    }
}

/* ==========================================================================
   7. CHAT SIMPLES (SIMULADOR DE IA DO AGRO)
   ========================================================================== */
function initChatbot() {
    const btnEnviar = document.getElementById("btn-enviar-chat");
    const inputChat = document.getElementById("input-chat");
    const corpoChat = document.getElementById("corpo-chat");

    // Respostas automáticas baseadas em palavras-chave
    const respostasBase = {
        agrinho: "O Agrinho 2026 promove a união entre inovação digital, sustentabilidade e educação no campo brasileiro!",
        tecnologia: "Usamos sensores IoT, inteligência artificial para previsão climática e drones para mapeamento de precisão.",
        sustentabilidade: "A sustentabilidade agrícola envolve práticas que preservam o solo, economizam água e reduzem a pegada de carbono.",
        ajuda: "Você pode me perguntar sobre: 'Agrinho', 'Tecnologia' ou 'Sustentabilidade'."
    };

    function processarMensagem() {
        const textoUsuario = inputChat.value.trim().toLowerCase();
        if (textoUsuario === "") return;

        // Adiciona mensagem do usuário na tela
        adicionarBalao(inputChat.value, "usuario");
        inputChat.value = ""; // Limpa a barra de digitação

        // Resposta da IA com delay simulado
        setTimeout(() => {
            let respostaTexto = "Desculpe, ainda estou aprendendo sobre esse assunto. Digite 'ajuda' para ver os tópicos!";
            
            // Procura palavras-chave na frase digitada
            for (let chave in respostasBase) {
                if (textoUsuario.includes(chave)) {
                    respostaTexto = respostasBase[chave];
                    break;
                }
            }
            adicionarBalao(respostaTexto, "bot");
        }, 600);
    }

    function adicionarBalao(texto, emissor) {
        const balao = document.createElement("div");
        balao.className = `chat-balao balao-${emissor}`;
        balao.textContent = texto;
        corpoChat.appendChild(balao);
        
        // Mantém a barra de rolagem do chat sempre embaixo
        corpoChat.scrollTop = corpoChat.scrollHeight;
    }

    if (btnEnviar && inputChat) {
        btnEnviar.addEventListener("click", processarMensagem);
        inputChat.addEventListener("keypress", (e) => {
            if (e.key === "Enter") processarMensagem();
        });
    }
}

/* ==========================================================================
   8. SCROLL SUAVE PARA LINKS INTERNOS
   ========================================================================== */
function initScrollSuave() {
    const linksInternos = document.querySelectorAll('nav a[href^="#"]');
    
    linksInternos.forEach(link => {
        link.addEventListener("click", function(evento) {
            evento.preventDefault();
            const idAlvo = this.getAttribute("href");
            const elementoAlvo = document.querySelector(idAlvo);
            
            if (elementoAlvo) {
                elementoAlvo.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
}