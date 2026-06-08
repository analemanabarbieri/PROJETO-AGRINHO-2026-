/**
 * PROJETO AGRINHO 2026 - ARQUIVO: main.js
 * Sistema interativo para o site de Tecnologia, Agricultura e Sustentabilidade.
 * * Funcionalidades incluídas:
 * 1. Carrossel Automático de Banner
 * 2. Painel de Notícias Dinâmico com Filtros
 * 3. Calculadora Agro-Ecológica
 * 4. Validação de Cadastro de Produtor Rural
 */

// Este evento garante que o JavaScript só vai rodar depois que todo o HTML estiver carregado.
document.addEventListener("DOMContentLoaded", () => {
    inicializarCarrossel();
    renderizarNoticias("todos");
    configurarFiltrosNoticias();
    configurarFormularioCadastro();
});

/* ==========================================================================
   1. CARROSSEL AUTOMÁTICO DO BANNER
   ========================================================================== */
function inicializarCarrossel() {
    // Seleciona todos os itens do carrossel no HTML
    const slides = document.querySelectorAll(".carousel-item");
    let slideAtual = 0;

    // Função interna que muda a classe 'active' para o próximo slide
    function proximoSlide() {
        // Remove a visibilidade do slide que está aparecendo agora
        slides[slideAtual].classList.remove("active");
        
        // Calcula o índice do próximo slide de forma circular (volta ao 0 no final)
        slideAtual = (slideAtual + 1) % slides.length; 
        
        // Adiciona a visibilidade ao novo slide atual
        slides[slideAtual].classList.add("active");
    }

    // Executa a função 'proximoSlide' automaticamente a cada 4000 milissegundos (4 segundos)
    setInterval(proximoSlide, 4000);
}

/* ==========================================================================
   2. ÁREA DE NOTÍCIAS DINÂMICA (Simulação de Banco de Dados e Filtros)
   ========================================================================== */
// Array de objetos simulando notícias que viriam de um servidor ou banco de dados
const bancoNoticias = [
    {
        titulo: "Drones e IA reduzem em até 40% desperdício de água no Sul",
        categoria: "tech",
        descricao: "Novas fazendas verticais utilizam IA de ponta para controlar o gotejamento preciso e inteligente diretamente nas raízes."
    },
    {
        titulo: "Paraná lidera transição para tratores 100% Elétricos",
        categoria: "sustentavel",
        descricao: "Maquinários movidos a energia solar gerada na própria propriedade começam a ser distribuídos em cooperativas."
    },
    {
        titulo: "Agrinho 2026 bate recorde de projetos tecnológicos",
        categoria: "tech",
        descricao: "Estudantes apresentam soluções incríveis combinando robótica de baixo custo, arduíno e sensores de solo."
    },
    {
        titulo: "Uso de biofertilizantes cresce e regenera solos antigos",
        categoria: "sustentavel",
        descricao: "Alternativas biológicas e sustentáveis substituem químicos agressivos e geram créditos de carbono valiosos para a fazenda."
    }
];

// Função responsável por construir os blocos visuais de notícias na tela
function renderizarNoticias(filtro) {
    const gridNoticias = document.getElementById("news-grid");
    gridNoticias.innerHTML = ""; // Limpa as notícias anteriores antes de colocar as novas

    // Filtra o array se o botão clicado não for o "todos"
    const noticiasFiltradas = bancoNoticias.filter(noticia => {
        return filtro === "todos" || noticia.categoria === filtro;
    });

    // Cria a estrutura HTML de cada notícia dinamicamente
    noticiasFiltradas.forEach(noticia => {
        const cardNoticia = document.createElement("div");
        cardNoticia.className = "card border-blue";
        
        // Define o texto da etiqueta (badge) com base na categoria
        const nomeCategoria = noticia.categoria === 'tech' ? 'Tecnologia' : 'Sustentabilidade';

        cardNoticia.innerHTML = `
            <span class="badge" style="color: var(--cor-secundaria); font-weight: bold; text-transform: uppercase; font-size: 0.8rem;">
                [ ${nomeCategoria} ]
            </span>
            <h4 style="margin: 0.5rem 0; font-size: 1.2rem;">${noticia.titulo}</h4>
            <p style="font-size: 0.95rem; color: #555;">${noticia.descricao}</p>
        `;
        
        // Coloca o novo elemento criado dentro do container HTML do nosso site
        gridNoticias.appendChild(cardNoticia);
    });
}

// Escuta os cliques nos botões de filtro ("Todos", "Tecnologia", "Sustentabilidade")
function configurarFiltrosNoticias() {
    const botoes = document.querySelectorAll(".btn-filter");
    
    botoes.forEach(botao => {
        botao.addEventListener("click", (evento) => {
            // Remove o visual de "botão selecionado" de todos os botões
            botoes.forEach(b => b.classList.remove("active"));
            
            // Adiciona o visual ativo apenas no botão que acabou de ser clicado
            evento.target.classList.add("active");
            
            // Pega o valor do atributo 'data-filter' do botão clicado
            const categoriaFiltro = evento.target.getAttribute("data-filter");
            
            // Recarrega as notícias aplicando o filtro selecionado
            renderizarNoticias(categoriaFiltro);
        });
    });
}

/* ==========================================================================
   3. CALCULADORA AGRO-ECOLÓGICA
   ========================================================================== */
function calcularEconomia() {
    // Pega o input e o bloco onde o resultado vai aparecer
    const inputHectares = document.getElementById("hectares");
    const containerResultado = document.getElementById("resultado-calc");
    const hectares = parseFloat(inputHectares.value);

    // Validação matemática: Impede cálculos se o campo estiver vazio, com letras ou menor/igual a zero
    if (isNaN(hectares) || hectares <= 0) {
        containerResultado.className = "resultado erro";
        containerResultado.style.backgroundColor = "#fce8e6";
        containerResultado.style.color = "#c5221f";
        containerResultado.style.borderLeft = "4px solid #c5221f";
        containerResultado.innerHTML = "Por favor, insira um número válido de hectares para calcular.";
        containerResultado.style.display = "block";
        return; // Interrompe a função aqui mesmo se houver erro
    }

    // Lógica e regras de negócio: valores médios fictícios de impacto ambiental positivo
    const litrosEconomizadosPorDia = hectares * 1500; 
    const reducaoCarbonoKg = hectares * 12;

    // Atualiza o estilo do bloco para o modo "informativo/sucesso"
    containerResultado.className = "resultado info";
    containerResultado.style.display = "block";
    
    // Insere o texto com as respostas formatadas em padrão numérico brasileiro (.toLocaleString)
    containerResultado.innerHTML = `
        <p><strong>Resultado do Impacto Tecnológico:</strong></p>
        <p>💧 Economia de Água: <strong>${litrosEconomizadosPorDia.toLocaleString('pt-BR')} litros</strong> economizados por dia através do gerenciamento inteligente via IoT.</p>
        <p>🌱 Pegada de Carbono: Menos <strong>${reducaoCarbonoKg.toLocaleString('pt-BR')} kg de CO₂</strong> liberados na atmosfera nesta safra.</p>
    `;
}

/* ==========================================================================
   4. CADASTRO DE PRODUTOR RURAL (Simulação de Envio de Dados)
   ========================================================================== */
function configurarFormularioCadastro() {
    const formulario = document.getElementById("form-cadastro");
    const msgCadastro = document.getElementById("mensagem-cadastro");

    formulario.addEventListener("submit", (evento) => {
        // Evita que a página dê "F5/Reload" (comportamento padrão de formulários HTML)
        evento.preventDefault(); 

        // Captura os valores que o usuário digitou nos campos correspondentes
        const nome = document.getElementById("nome").value;
        const regiao = document.getElementById("regiao").value;

        // Customiza e exibe a mensagem de sucesso na tela
        msgCadastro.innerHTML = `Parabéns, <strong>${nome}</strong>! Sua propriedade localizada na região de <strong>${regiao}</strong> foi conectada com sucesso ao ecossistema do Agrinho 2026.`;
        msgCadastro.style.display = "block";

        // Limpa todos os campos digitados do formulário de forma automática
        formulario.reset();
    });
}
