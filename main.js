// Aguarda o documento HTML carregar totalmente antes de executar o JS
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. FUNCIONALIDADE: MENU RESPONSIVO (MOBILE)
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');

    // Ao clicar no botão hambúrguer, adiciona ou remove a classe 'active' do menu
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    // Fecha o menu automaticamente quando o usuário clica em algum link dele
    const linksMenu = document.querySelectorAll('.navbar a');
    linksMenu.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    });


    /* ==========================================================================
       2. FUNCIONALIDADE: ALTERNADOR DE TEMA (CLARO / ESCURO)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Escuta o clique no botão de tema
    themeToggleBtn.addEventListener('click', () => {
        // Coloca ou tira a classe 'dark-mode' da tag <body>
        document.body.classList.toggle('dark-mode');
        
        // Altera o texto visual do botão para dar um feedback bacana
        if (document.body.classList.contains('dark-mode')) {
            themeToggleBtn.textContent = '☀️ Claro';
        } else {
            themeToggleBtn.textContent = '🌙 Escuro';
        }
    });


    /* ==========================================================================
       3. FUNCIONALIDADE: VALIDAÇÃO DO FORMULÁRIO DE CADASTRO
       ========================================================================== */
    const formProdutor = document.getElementById('form-produtor');
    const feedback = document.getElementById('form-feedback');

    formProdutor.addEventListener('submit', (evento) => {
        // Evita que a página recarregue ao enviar o formulário (padrão do HTML)
        evento.preventDefault();

        // Captura os valores digitados pelos usuários
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const propriedade = document.getElementById('propriedade').value.trim();

        // Validação simples (Garante que os campos obrigatórios não estão vazios)
        if (nome === '' || email === '') {
            exibirFeedback('Por favor, preencha todos os campos obrigatórios.', 'erro');
            return;
        }

        // Simulação de Sucesso no envio
        let mensagemSucesso = `Parabéns, ${nome}! Seu cadastro foi realizado com sucesso.`;
        if (propriedade) {
            mensagemSucesso += ` A propriedade "${propriedade}" agora faz parte do Agrinho 2026.`;
        }

        exibirFeedback(mensagemSucesso, 'success');

        // Limpa o formulário após o cadastro bem-sucedido
        formProdutor.reset();
    });

    // Função auxiliar para exibir a caixinha de aviso do formulário
    function exibirFeedback(mensagem, tipo) {
        feedback.textContent = mensaje = mensagem;
        feedback.className = `form-feedback ${tipo}`; // Adiciona a classe de estilo verde
        
        // Esconde a mensagem de sucesso automaticamente após 5 segundos
        setTimeout(() => {
            feedback.className = 'form-feedback hidden';
        }, 5000);
    }
});