// AGUARDA O CARREGAMENTO COMPLETO DA PÁGINA ANTES DE EXECUTAR O SCRIPT
document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================================
       1. CONTROLE DO MENU RESPONSIVO (MOBILE)
       ========================================================================== */
    const btnMenuAbrir = document.getElementById("btn-menu-abrir");
    const btnMenuFechar = document.getElementById("btn-menu-fechar");
    const menuMobileContainer = document.getElementById("menu-mobile-container");
    const overlayMenuBg = document.getElementById("overlay-menu-bg");

    // Abre o menu ao clicar no ícone de lista
    if (btnMenuAbrir && menuMobileContainer && overlayMenuBg) {
        btnMenuAbrir.addEventListener("click", () => {
            menuMobileContainer.classList.add("abrir-menu");
            overlayMenuBg.style.display = "block";
        });
    }

    // Função interna para fechar o menu mobile
    function fecharMenu() {
        if (menuMobileContainer && overlayMenuBg) {
            menuMobileContainer.classList.remove("abrir-menu");
            overlayMenuBg.style.display = "none";
        }
    }

    // Fecha o menu ao clicar no botão de fechar (X) ou no fundo escuro (overlay)
    if (btnMenuFechar) btnMenuFechar.addEventListener("click", fecharMenu);
    if (overlayMenuBg) overlayMenuBg.addEventListener("click", fecharMenu);


    /* ==========================================================================
       2. LÓGICA DA CALCULADORA ECOLOGICA DE CO₂ (MANIPULAÇÃO DO DOM)
       ========================================================================== */
    const btnCalcular = document.getElementById("btn-calcular");
    const inputCombustivel = document.getElementById("combustivel");
    const divResultado = document.getElementById("resultado");

    if (btnCalcular && inputCombustivel && divResultado) {
        btnCalcular.addEventListener("click", () => {
            const litrosDiesel = parseFloat(inputCombustivel.value);

            // Validação simples do campo numérico para evitar dados incorretos
            if (isNaN(litrosDiesel) || litrosDiesel < 0) {
                alert("Por favor, digite uma quantidade de litros válida igual ou maior que zero.");
                return;
            }

            // Fatores matemáticos estáveis: 1 litro de diesel emite aprox. 2.6 kg de CO2
            // Otimizações agrícolas com tecnologia podem economizar até 15% desse valor
            const totalCO2Emitido = litrosDiesel * 2.6;
            const co2EconomizadoAnual = totalCO2Emitido * 0.15;

            // Altera o texto dos elementos HTML com os resultados calculados
            document.getElementById("co2-emitido").innerText = totalCO2Emitido.toFixed(1);
            document.getElementById("co2-economizado").innerText = co2EconomizadoAnual.toFixed(1);

            // Torna o bloco de resposta visível ao usuário
            divResultado.classList.remove("escondido");
        });
    }


    /* ==========================================================================
       3. RECURSO DE ACESSIBILIDADE: ALTO CONTRASTE (PONTUAÇÃO MÁXIMA NIVEL 4)
       ========================================================================== */
    const btnAltoContraste = document.getElementById("btn-alto-contraste");

    if (btnAltoContraste) {
        btnAltoContraste.addEventListener("click", () => {
            // Alterna a classe no elemento principal do documento (:root/html)
            document.documentElement.classList.toggle("alto-contraste");
        });
    }

});