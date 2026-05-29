// Aguarda o disparo do evento submit do formulário
// AGORA COM VALIDAÇÃO DE SEGURANÇA: Só roda se o formulário existir na página atual
const formContato = document.getElementById('form-contato');

if (formContato) {
    formContato.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const servicoElement = document.getElementById('servico');
        const servicoTexto = servicoElement.options[servicoElement.selectedIndex].text;
        
        const resultadoDiv = document.getElementById('resultado');
        const formulario = document.getElementById('form-contato');
        
        if (nome === "" || email === "" || telefone === "") {
            alert("Por favor, certifique-se de preencher os campos obrigatórios.");
            return;
        }
        
        resultadoDiv.innerHTML = `Olá ${nome}, obrigado pelo contato!<br>Sua solicitação para o serviço de <strong>"${servicoTexto}"</strong> foi recebida com sucesso. Retornaremos em breve no e-mail: <em>${email}</em> ou via WhatsApp no número <em>${telefone}</em>.`;
        
        resultadoDiv.style.display = 'block';
        formulario.style.display = 'none';
    });
}

// O restante do seu script (const servicesProducts, etc.) continua exatamente igual aqui para baixo...

// Dados simulados dos produtos (com 3 imagens para cada)
// Dados simulados dos produtos (com 3 imagens para cada)
const servicesProducts = {
    sites: {
        title: "Criação de Sites e Landing Pages",
        description: "Desenvolvemos portfólios profissionais, landing pages focadas em alta conversão de clientes e sites institucionais completos utilizando Django. O produto final entrega um código limpo, otimização de SEO para o Google e total adaptação para visualização em celulares, tablets e computadores.",
        images: [
            "img/site-img.jpg", 
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600", 
            "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=600"  
        ]
    },
    sistemas: {
        title: "Sistemas de Gestão em Nuvem (Cloud)",
        description: "Sistemas web robustos sob medida para automatizar os processos do seu negócio. Controle fluxos de estoque, gerenciamento de funcionários e relatórios automatizados. Implementado com Django nas infraestruturas AWS ou Azure, trazendo estabilidade global e segurança criptografada.",
        images: [
            "img/sisg-img.jpg",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600"
        ]
    },
    dados: {
        title: "Análise de Dados & Dashboards Power BI",
        description: "Transforme montanhas de dados brutos da sua empresa em inteligência estratégica de mercado. Desenvolvemos scripts em Python estruturados para extrair, limpar e cruzar dados de diversas fontes, exibindo as métricas através de Dashboards modernos, dinâmicos e intuitivos no Power BI.",
        images: [
            "img/data-img.webp",
            "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600",
        ]
    }
};

// Seleção de Elementos do Pop-up
const modal = document.getElementById('service-modal');
const productButtons = document.querySelectorAll('.btn-product'); // Alvo mudado para o botão
const closeBtn = document.querySelector('.close-modal');
const sliderWrapper = document.getElementById('slider-wrapper');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');

let activeIndex = 0;

// Atualiza a visualização interna do Slider baseado no índice atual
function moveSlider() {
    sliderWrapper.style.transform = `translateX(-${activeIndex * 33.3333}%)`;
    
    // Atualiza o estado visual das bolinhas de paginação (dots)
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if(index === activeIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Configura abertura do Pop-up mapeando o clique em "Ver Detalhes"
productButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Encontra o card pai do botão clicado para buscar o atributo "data-service"
        const parentCard = button.closest('.product-card');
        const key = parentCard.getAttribute('data-service');
        const data = servicesProducts[key];
        
        if(data) {
            modalTitle.innerText = data.title;
            modalDescription.innerText = data.description;
            
            // Limpa o slider antes de popular com as imagens do respectivo produto
            sliderWrapper.innerHTML = '';
            
            data.images.forEach(url => {
                const img = document.createElement('img');
                img.src = url;
                img.alt = data.title;
                sliderWrapper.appendChild(img);
            });
            
            // Reseta o slider sempre para começar na imagem inicial (posição 0)
            activeIndex = 0;
            moveSlider();
            
            // Ativa o pop-up na tela usando flexbox para mantê-lo centralizado
            modal.style.display = 'flex';
        }
    });
});

// Controles do Slider (Botão Avançar)
document.getElementById('next-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    activeIndex = (activeIndex === 2) ? 0 : activeIndex + 1;
    moveSlider();
});

// Controles do Slider (Botão Voltar)
document.getElementById('prev-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    activeIndex = (activeIndex === 0) ? 2 : activeIndex - 1;
    moveSlider();
});

// Controles via clique direto nos marcadores de bolinha (dots)
document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
        e.stopPropagation();
        activeIndex = parseInt(dot.getAttribute('data-index'));
        moveSlider();
    });
});

// Fecha o pop-up ao clicar no botão "X"
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fecha o pop-up caso o usuário clique na área escura ao redor da caixinha
window.addEventListener('click', (e) => {
    if(e.target === modal) {
        modal.style.display = 'none';
    }
});