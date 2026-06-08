// AGUARDA O CARREGAMENTO COMPLETO DO DOCUMENTO
document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================================
       FUNCIONALIDADE 1: CARROSSEL AUTOMÁTICO
       ========================================================================== */
    const slides = document.querySelectorAll(".slide");
    let slideAtual = 0;

    function proximoSlide() {
        // Remove a classe ativa do slide atual
        slides[slideAtual].classList.remove("ativo");
        
        // Calcula o índice do próximo slide de forma circular
        slideAtual = (slideAtual + 1) % slides.length;
        
        // Adiciona a classe ativa no novo slide
        slides[slideAtual].classList.add("ativo");
    }

    // Altera o slide automaticamente a cada 4 segundos (4000ms)
    setInterval(proximoSlide, 4000);


    /* ==========================================================================
       FUNCIONALIDADE 2: CALCULADORA ECOLÓGICA
       ========================================================================== */
    const btnCalcular = document.getElementById("btn-calcular");
    const inputHectares = document.getElementById("hectares");
    const boxResultado = document.getElementById("resultado-calculo");

    btnCalcular.addEventListener("click", () => {
        const hectares = parseFloat(inputHectares.value);

        // Validação simples para garantir que o usuário digitou um número válido
        if (isNaN(hectares) || hectares <= 0) {
            alert("Por favor, digite um número de hectares válido maior que zero.");
            return;
        }

        // Fatores de cálculo hipotéticos para sustentabilidade em 2026
        const litrosEconomizadosAgua = hectares * 12000; 
        const kgReducaoCO2 = hectares * 340;

        // Atualiza a tela com os resultados formatados
        document.getElementById("res-agua").innerText = litrosEconomizadosAgua.toLocaleString("pt-BR");
        document.getElementById("res-co2").innerText = kgReducaoCO2.toLocaleString("pt-BR");

        // Torna a caixa de resultados visível removendo a classe 'escondido'
        boxResultado.classList.remove("escondido");
    });


    /* ==========================================================================
       FUNCIONALIDADE 3: GALERIA DE IMAGENS COM LIGHTBOX (EXPANSÃO)
       ========================================================================== */
    const imagensGaleria = document.querySelectorAll(".img-galeria");
    const lightbox = document.getElementById("lightbox");
    const imgAmpliada = document.getElementById("img-ampliada");
    const fecharLightbox = document.getElementById("fechar-lightbox");

    imagensGaleria.forEach(img => {
        img.addEventListener("click", () => {
            // Define o link da imagem clicada na imagem do modal do Lightbox
            imgAmpliada.src = img.src;
            imgAmpliada.alt = img.alt;
            lightbox.classList.remove("escondido");
        });
    });

    // Fecha o lightbox ao clicar no 'X'
    fecharLightbox.addEventListener("click", () => {
        lightbox.classList.add("escondido");
    });

    // Fecha o lightbox caso o usuário clique fora da imagem
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add("escondido");
        }
    });


    /* ==========================================================================
       FUNCIONALIDADE 4: CADASTRO COM VALIDAÇÃO
       ========================================================================== */
    const formCadastro = document.getElementById("form-cadastro");
    const msgSucesso = document.getElementById("msg-sucesso");

    formCadastro.addEventListener("submit", (e) => {
        // Impede o envio real do formulário para tratar com JS
        e.preventDefault();

        // Pega os dados apenas para simular o processo
        const nome = document.getElementById("nome").value;

        if (nome.trim().length < 3) {
            alert("Por favor, insira um nome válido.");
            return;
        }

        // Exibe mensagem de sucesso e limpa o formulário
        msgSucesso.classList.remove("escondido");
        formCadastro.reset();

        // Oculta a mensagem de sucesso após 4 segundos
        setTimeout(() => {
            msgSucesso.classList.add("escondido");
        }, 4000);
    });


    /* ==========================================================================
       FUNCIONALIDADE 5: ÁREA DE NOTÍCIAS COM FILTROS DINÂMICOS
       ========================================================================== */
    const botoesFiltro = document.querySelectorAll(".btn-filtro");
    const cardsNoticias = document.querySelectorAll(".noticia-card");

    botoesFiltro.forEach(botao => {
        botao.addEventListener("click", () => {
            // Remove classe ativa de todos os botões e adiciona ao clicado
            botoesFiltro.forEach(b => b.classList.remove("ativo"));
            botao.classList.add("ativo");

            const filtroEscolhido = botao.getAttribute("data-filtro");

            cardsNoticias.forEach(card => {
                const categoriaCard = card.getAttribute("data-categoria");

                // Regra de exibição: Se for 'todos' ou a categoria bater, exibe. Se não, esconde.
                if (filtroEscolhido === "todos" || filtroEscolhido === "categoriaCard" || filtroEscolhido === categoriaCard) {
                    card.classList.remove("escondido");
                } else {
                    card.classList.add("escondido");
                }
            });
        });
    });


    /* ==========================================================================
       RECURSOS DE ACESSIBILIDADE: ALTO CONTRASTE E DISLEXIA
       ========================================================================== */
    const btnAltoContraste = document.getElementById("btn-alto-contraste");
    const btnDislexia = document.getElementById("btn-dislexia");

    // Liga/Desliga a classe de Alto Contraste no elemento raiz (HTML)
    btnAltoContraste.addEventListener("click", () => {
        document.documentElement.classList.toggle("alto-contraste");
    });

    // Liga/Desliga a classe com espaçamento para Dislexia no corpo inteiro (body)
    btnDislexia.addEventListener("click", () => {
        document.body.classList.toggle("fonte-dislexia");
    });

});