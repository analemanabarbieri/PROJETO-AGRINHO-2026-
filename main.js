// Aguarda o documento HTML carregar completamente
document.addEventListener("DOMContentLoaded", () => {
    inicializarCarrossel();
    renderizarNoticias("todos");
    configurarFiltrosNoticias();
    configurarFormularioCadastro();
});

/* ==========================================================================
   OPÇÃO 2: CARROSSEL AUTOMÁTICO DO BANNER
   ========================================================================== */
function inicializarCarrossel() {
    const slides = document.querySelectorAll(".carousel-item");
    let slideAtual = 0;

    // Função que muda o slide ativo
    function proximoSlide() {
        slides[slideAtual].classList.remove("active");
        slideAtual = (slideAtual + 1) % slides.length; // Retorna ao 0 quando chega ao fim
        slides[slideAtual].classList.add("active");
    }

    // Configura a troca automática a cada 4 segundos (4000ms)
    setInterval(proximoSlide, 4000);
}

/* ==========================================================================
   OPÇÃO 5: ÁREA DE NOTÍCIAS DINÂMICA (Dados e Filtragem)
   ========================================================================== */
// Banco de dados fictício simulando notícias do setor
const bancoNoticias = [
    {
        titulo: "Drones e IA reduzem em até 40% desperdício de água no Sul",
        categoria: "tech",
        descricao: "Novas fazendas verticais utilizam IA de ponta para controlar o gotejamento preciso e inteligente."
    },
    {
        titulo: "Paraná lidera transição para tratores 100% Elétricos",
        categoria: "sustentavel",
        descricao: "Maquinários movidos a energia solar gerada na própria propriedade começam a ser distribuídos."
    },
    {
        titulo: "Agrinho 2026 bate recorde de projetos tecnológicos",
        categoria: "tech",
        descricao: "Estudantes apresentam soluções incríveis combinando robótica de baixo custo e sensores de solo."
    },
    {
        titulo: "Uso de biofertilizantes cresce e regenera solos antigos",
        categoria: "sustentavel",
        descricao: "Alternativas sustentáveis substituem químicos agressivos e geram créditos de carbono valiosos."
    }
];

// Função que cria os elementos HTML das notícias na tela
function renderizarNoticias(filtro) {
    const gridNoticias = document.getElementById("news-grid");
    gridNoticias.innerHTML = ""; // Limpa a área antes de renderizar

    // Filtra os dados com base na escolha do usuário
    const noticiasFiltradas = bancoNoticias.filter(noticia => filtro === "todos" || noticia.categoria === filtro);

    noticiasFiltradas.forEach(noticia => {
        const cardNoticia = document.createElement("div");
        cardNoticia.className = "card border-blue";
        cardNoticia.innerHTML = `
            <span class="badge" style="color: var(--cor-secundaria); font-weight: bold; text-transform: uppercase; font-size: 0.8rem;">
                [ ${noticia.categoria === 'tech' ? 'Tecnologia' : 'Sustentabilidade'} ]
            </span>
            <h4 style="margin: 0.5rem 0; font-size: 1.2rem;">${noticia.titulo}</h4>
            <p style="font-size: 0.95rem; color: #555;">${noticia.descricao}</p>
        `;
        gridNoticias.appendChild(cardNoticia);
    });
}

// Configura o clique nos botões de filtro
function configurarFiltrosNoticias() {
    const botoes = document.querySelectorAll(".btn-filter");
    botoes.forEach(botao => {
        botao.addEventListener("click", (e) => {
            // Remove classe ativa de todos
            botoes.forEach(b => b.classList.remove("active"));
            // Adiciona classe ativa no clicado
            e.target.classList.add("active");
            
            // Filtra e exibe as notícias correspondentes
            const categoriaFiltro = e.target.getAttribute("data-filter");
            renderizarNoticias(categoriaFiltro);
        });
    });
}

/* ==========================================================================
   OPÇÃO 3: CALCULADORA ECOLÓGICA SIMPLES
   ========================================================================== */
function calcularEconomia() {
    const inputHectares = document.getElementById("hectares");
    const containerResultado = document.getElementById("resultado-calc");
    const hectares = parseFloat(inputHectares.value);

    // Validação se o número inserido é válido
    if (isNaN(hectares) || hectares <= 0) {
        containerResultado.className = "resultado erro";
        containerResultado.style.backgroundColor = "#fce8e6";
        containerResultado.style.color = "#c5221f";
        containerResultado.style.borderLeft = "4px solid #c5221f";
        containerResultado.innerHTML = "Por favor, insira um número válido de hectares.";
        containerResultado.style.display = "block";
        return;
    }

    // Lógica matemática fictícia baseada em economia média real por IA no campo
    const litrosEconomizadosPorDia = hectares * 1500; 
    const reducaoCarbonoKg = hectares * 12;

    containerResultado.className = "resultado info";
    containerResultado.style.display = "block";
    containerResultado.innerHTML = `
        <p><strong>Resultado da sua Automação:</strong></p>
        <p>💧 Economia Estimada de Água: <strong>${litrosEconomizadosPorDia.toLocaleString('pt-BR')} litros</strong> por dia.</p>
        <p>🌱 Redução de Carbono: <strong>${reducaoCarbonoKg.toLocaleString('pt-BR')} kg de CO₂</strong> evitados por safra.</p>
    `;
}

/* ==========================================================================
   OPÇÃO 4: CADASTRO DE PRODUTOR RURAL COM VALIDAÇÃO
   ========================================================================== */
function configurarFormularioCadastro() {
    const formulario = document.getElementById("form-cadastro");
    const msgCadastro = document.getElementById("mensagem-cadastro");

    formulario.addEventListener("submit", (e) => {
        e.preventDefault(); // Impede o recarregamento padrão da página

        // Captura os dados inseridos
        const nome = document.getElementById("nome").value;
        const regiao = document.getElementById("regiao").value;

        // Exibe a mensagem de sucesso na tela de forma amigável
        msgCadastro.innerHTML = `Parabéns, ${nome}! Sua propriedade na região de ${regiao} foi conectada com sucesso ao futuro do agronegócio. Em breve enviamos novidades!`;
        msgCadastro.style.display = "block";

        // Limpa os campos do formulário após envio bem sucedido
        formulario.reset();
    });
}