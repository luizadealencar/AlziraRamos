// Mobile menu toggle
function toggleMobileMenu() {
    const nav = document.getElementById('navbarNav');
    nav.classList.toggle('active');
}

// FAQ toggle
function toggleFAQ(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems[index].classList.toggle('active');
}

// Form submission
function handleSubmit(event) {
    event.preventDefault();
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    event.target.reset();
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                document.getElementById('navbarNav').classList.remove('active');
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.backgroundColor = 'transparent';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.news-card, .stat-item, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Gallery auto-scroll pause on hover
    const gallery = document.querySelector('.gallery-container');
    if (gallery) {
        gallery.addEventListener('mouseenter', function () {
            this.style.animationPlayState = 'paused';
        });

        gallery.addEventListener('mouseleave', function () {
            this.style.animationPlayState = 'running';
        });
    }

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function () {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });

    // Counter animation for stats
    function animateCounter(element, target) {
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Observe stat numbers for counter animation
    const statObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const number = parseInt(entry.target.textContent);
                animateCounter(entry.target, number);
                entry.target.dataset.animated = 'true';
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(stat => {
        statObserver.observe(stat);
    });

    // Mobile menu close on outside click
    document.addEventListener('click', function (event) {
        const nav = document.getElementById('navbarNav');
        const toggle = document.querySelector('.mobile-menu-toggle');

        if (!nav.contains(event.target) && !toggle.contains(event.target)) {
            nav.classList.remove('active');
        }
    });

    // Add active state to current nav item
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScroll = debounce(() => {
    // Navbar background
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = 'transparent';
    }
}, 10);

const noticias = [
    {
        id: 1,
        titulo: "Olimpíada de Geografia",
        data: "Publicado em 02/06/2025",
        imagem: "img/olimpiada-2.png",
        conteudo: `Escola Alzira Ramos Lança Projeto para Participar da Olimpíada Brasileira de Geografia, iniciativa do professor Leonardo busca incentivar o aprendizado e destacar a escola no cenário educacional.

A Escola Alzira Ramos acaba de lançar um projeto pedagógico inovador com foco na participação dos alunos na Olimpíada Brasileira de Geografia (OBG). A iniciativa, idealizada pelo professor Leonardo, tem como principal objetivo estimular o interesse dos estudantes pela disciplina e criar uma cultura de valorização do conhecimento científico dentro da instituição.

Segundo o professor, o projeto vai além da preparação para a competição. “A OBG representa um excelente desafio intelectual. Ela propõe questões que exigem raciocínio crítico, domínio de conteúdos atuais e compreensão espacial. É uma oportunidade incrível para os alunos se aprofundarem no estudo da Geografia de forma prática e estimulante”, afirma Leonardo.

A proposta visa formar equipes de alunos interessados em representar a Escola Alzira Ramos na OBG, promovendo uma rotina de estudos e atividades voltadas para temas geográficos contemporâneos, como mudanças climáticas, urbanização, geopolítica e cartografia. A primeira equipe já está em formação e contará com o acompanhamento direto do professor.

Além dos benefícios pedagógicos, o projeto também pretende aumentar o prestígio da escola no cenário educacional local e nacional. “Ao participar de uma competição reconhecida como a OBG, mostramos que nossos alunos estão preparados para enfrentar desafios de alto nível. Isso valoriza a escola como um todo e projeta nosso trabalho para além dos muros da instituição”, destaca o diretor Vagner.

A expectativa é que a iniciativa continue nos próximos anos, com a formação de novas equipes e o aprimoramento constante das estratégias de ensino. A escola também estuda a possibilidade de incluir outras olimpíadas científicas no calendário letivo, ampliando ainda mais as oportunidades acadêmicas para os estudantes.

O projeto marca um passo importante no compromisso da Escola Alzira Ramos com a excelência no ensino e a formação de jovens cidadãos críticos e bem informados.
    `
    },
    {
        id: 2,
        titulo: "Passeio Pedagógico à Câmara dos Vereadores",
        data: "Publicado em 02/06/2025",
        imagem: "img/vereadores.jpg",
        conteudo: `Na segunda-feira, 26 de maio, os alunos da nossa escola tiveram a oportunidade de participar de um passeio pedagógico à Câmara dos Vereadores. O evento é especialmente significativo para os estudantes da eletiva Cidade Acessível, que contaram com a presença de muitos alunos do Atendimento Educacional Especializado (AEE).

O passeio foi dirigido pelo professor Leonardo, que acompanhou os alunos durante toda a visita. O vereador Jadz esteve recebendo os estudantes no local, proporcionando uma experiência única de imersão no ambiente político. Durante a visita, os alunos tiveram a oportunidade de conhecer o espaço interno da câmara, assistir a uma sessão plenária e visitar os gabinetes dos vereadores.

Este passeio promoveu uma compreensão mais profunda do processo legislativo e da importância da participação cidadã, além de proporcionar um momento de aprendizado prático para os alunos, especialmente no contexto da acessibilidade e inclusão. A experiência foi uma excelente oportunidade para os jovens vivenciarem o funcionamento de uma casa legislativa de perto, estimulando o interesse pela política local e o engajamento com os temas que impactam diretamente a comunidade.

Ao conhecer o papel dos vereadores, os alunos também poderão refletir sobre como as decisões políticas influenciam a vida cotidiana e a construção de uma cidade mais acessível e justa para todos.

Ficamos muito animados com esta oportunidade e esperamos que os alunos aproveitem ao máximo essa experiência enriquecedora, que certamente ficará marcada como um momento importante em sua formação cidadã e educacional.`
    },
    {
        id: 3,
        titulo: "Lançamento do Clube de Xadrez",
        data: "Publicado em 03/06/2025",
        imagem: "img/xadrez.jpg",
        conteudo: `A Escola Alzira Ramos inaugura seu novo Clube de Xadrez, com o objetivo de estimular o raciocínio lógico, a concentração e a estratégia entre os alunos. O clube proporciona um espaço para que os estudantes desenvolvam habilidades intelectuais e aprendam a competir de forma saudável. Para isso, a escola adquiriu relógios oficiais de xadrez, que serão usados nas partidas e treinamentos, garantindo mais profissionalismo e dinamismo às atividades.`
    },
    {
        id: 4,
        titulo: "Formação do time de vôlei feminino",
        data: "Publicado em 03/06/2025",
        imagem: "img/volei.jpg",
        conteudo: `A escola também comemora a formação da sua primeira equipe feminina de vôlei. As alunas já estão em fase de treinamento, sob a supervisão da professora de educação física Michely, preparando-se para participar das competições escolares. Essa iniciativa valoriza a inclusão e o incentivo à prática esportiva entre as meninas, promovendo disciplina, trabalho em equipe e fortalecimento do espírito esportivo.`
    },
    {
        id: 5,
        titulo: "Melhorias na Quadra Esportiva",
        data: "Publicado em 03/06/2025",
        imagem: "img/quadra.jpg",
        conteudo: `Pequenos reparos foram realizados na quadra da escola para melhorar o ambiente de prática esportiva. Além disso, foi feita a pintura do lado de fora da escola e houve reorganização do espaço, que agora está mais seguro e confortável para os alunos. Essas melhorias contribuem para um ambiente mais agradável, facilitando o desenvolvimento de diferentes modalidades esportivas e incentivando a participação dos estudantes.`
    },
    {
        id: 6,
        titulo: "Festa Cultural",
        data: "Publicado em 03/06/2025",
        imagem: "img/quadrilha.jpg",
        conteudo: `A Escola Alzira Ramos já está em clima de festa! Com muita animação, tradição e espírito de coletividade, a escola anuncia a realização de sua tradicional Festa Junina, que neste ano será ainda mais especial. Marcando o encerramento do semestre letivo antes das férias escolares, o evento será uma grande Festa Cultural Junina e estará aberto à participação de toda a comunidade.

A festividade está sendo organizada com muito carinho por professores, funcionários, alunos e suas famílias, e promete ser um momento inesquecível de integração e celebração. Além de trazer os elementos clássicos da cultura junina, como comidas típicas, danças, brincadeiras e decoração caipira, a festa também contará com apresentações culturais preparadas pelos próprios estudantes ao longo das últimas semanas.

A escola como espaço de cultura e tradição

Mais do que uma comemoração, a Festa Junina da Escola Alzira Ramos é uma oportunidade de valorizar as tradições populares brasileiras, integrando o currículo pedagógico à vivência cultural. Cada turma está preparando sua contribuição especial para o evento, que pode incluir desde quadrilhas, peças teatrais temáticas, músicas regionais até exposições artísticas sobre o folclore e os costumes juninos.

A coordenadora pedagógica destaca que a festa é também um momento de aprendizagem: “Trabalhamos com os alunos o significado histórico e cultural das festas juninas. É uma forma lúdica e afetiva de fortalecer o sentimento de pertencimento e a valorização da cultura popular”.

Aberta à comunidade

Neste ano, a escola decidiu abrir os portões para a comunidade do entorno, convidando familiares, vizinhos e moradores da região a participarem do evento. “Queremos que todos se sintam acolhidos. A escola é um espaço coletivo e democrático, e a festa é uma maneira de aproximar ainda mais a comunidade da vida escolar”, afirma o diretor Vagner.

Durante o evento, os visitantes poderão desfrutar de barraquinhas com comidas típicas como canjica, milho verde, pipoca, bolos, paçoca, caldos e doces diversos. Também haverá brincadeiras tradicionais como pescaria, boca do palhaço e correio elegante. E, claro, não vai faltar a tão esperada quadrilha junina, com apresentações dos alunos e até participação aberta para o público dançar junto.

Um momento para celebrar e agradecer

A Festa Cultural Junina simboliza também um momento de confraternização e gratidão. É a celebração do esforço coletivo de toda a comunidade escolar durante o primeiro semestre do ano. Alunos, professores e famílias se uniram para tornar esse momento possível, mostrando mais uma vez a força da colaboração e do trabalho em equipe.

Todos estão convidados a vestir seu traje caipira, trazer o sorriso no rosto e se juntar a essa grande festa. A Escola Alzira Ramos espera por você com muita alegria, música e tradição!`
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const containerEquipe = document.getElementById("lista-equipe");
    equipe.forEach(membro => {
        const div = document.createElement("div");
        div.className = "professor";
        div.innerHTML = `
        <img src="${membro.foto}" alt="${membro.nome}">
        <h4>${membro.nome}</h4>
        <p><strong>Cargo:</strong> ${membro.cargo}</p>
      `;
        containerEquipe.appendChild(div);
    });

    // Mantém a parte do calendário das turmas, se ainda for usada:
    const turmas = ["1ESP", "1IPI1", "1IPI2", "2IPI1", "2IPI2", "3IPI1", "3IPI2", "2RDC1", "2RDC2", "3RDC"];
    const calendarioContainer = document.getElementById("calendarios-turmas");
    turmas.forEach(turma => {
        const div = document.createElement("div");
        div.innerHTML = `<h4>${turma}</h4><textarea rows="5" cols="50" placeholder="Atividades e datas para ${turma}"></textarea>`;
        calendarioContainer.appendChild(div);
    });
});


let calendar;
const turma = document.body.dataset.turma;
console.log("TURMA DETECTADA:", turma);


document.addEventListener("DOMContentLoaded", () => {
    renderizarCalendario();
});

function adicionarAtividade() {
    const data = document.getElementById('dataAtividade').value;
    const descricao = document.getElementById('descricaoAtividade').value;
    const professor = document.getElementById('professorAtividade').value;
    const disciplina = document.getElementById('disciplinaAtividade').value;

    if (!data || !descricao || !professor || !disciplina) {
        alert("Preencha todos os campos!");
        return;
    }

    const atividade = {
        id: gerarID(),
        title: `${descricao} - ${disciplina} (${professor})`,
        date: data,
        descricao,
        professor,
        disciplina
    };

    const chave = `atividades_${turma}`;
    const atividades = JSON.parse(localStorage.getItem(chave)) || [];
    atividades.push(atividade);
    localStorage.setItem(chave, JSON.stringify(atividades));

    limparFormulario();
    atualizarCalendario();
}

function gerarID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function limparFormulario() {
    document.getElementById('dataAtividade').value = "";
    document.getElementById('descricaoAtividade').value = "";
    document.getElementById('professorAtividade').value = "";
    document.getElementById('disciplinaAtividade').value = "";
}

function renderizarCalendario() {
    const calendarEl = document.getElementById('calendarioReal');
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'pt-br',
        height: 500,
        headerToolbar: {
            left: 'title',
            center: '',
            right: 'prev,next'
        },
        events: carregarEventos(),
        eventClick: function (info) {
            if (confirm(`Deseja excluir a atividade?\n\n${info.event.title}`)) {
                excluirAtividade(info.event.id);
            }
        }
    });

    calendar.render();
}

function carregarEventos() {
    const chave = `atividades_${turma}`;
    const atividades = JSON.parse(localStorage.getItem(chave)) || [];
    return atividades.map(ev => ({
        id: ev.id,
        title: ev.title,
        date: ev.date,
        descricao: ev.descricao,
        professor: ev.professor,
        disciplina: ev.disciplina
    }));
}

function atualizarCalendario() {
    calendar.removeAllEvents();
    const eventos = carregarEventos();
    eventos.forEach(evento => calendar.addEvent(evento));
}

function excluirAtividade(id) {
    const chave = `atividades_${turma}`;
    let atividades = JSON.parse(localStorage.getItem(chave)) || [];
    atividades = atividades.filter(a => a.id !== id);
    localStorage.setItem(chave, JSON.stringify(atividades));
    atualizarCalendario();
}

function toggleMobileMenu() {
    const nav = document.getElementById("navbarNav");
    nav.classList.toggle("active");
}

const atividades = [];

function adicionarAtividade() {
    const data = document.getElementById('dataAtividade').value;
    const descricao = document.getElementById('descricaoAtividade').value;
    const professor = document.getElementById('professorAtividade').value;
    const disciplina = document.getElementById('disciplinaAtividade').value;

    if (data && descricao && professor && disciplina) {
        atividades.push({ data, descricao, professor, disciplina });
        document.getElementById('dataAtividade').value = '';
        document.getElementById('descricaoAtividade').value = '';
        document.getElementById('professorAtividade').value = '';
        document.getElementById('disciplinaAtividade').value = '';
    }

    exibirAtividadesMobile();
}

function exibirAtividadesMobile() {
    const lista = document.getElementById('listaAtividadesMobile');
    const calendario = document.getElementById('calendarioReal');
    lista.innerHTML = '';

    if (window.innerWidth <= 768) {
        calendario.style.display = 'none';
        if (atividades.length === 0) {
            lista.innerHTML = '<p>Não há atividades.</p>';
        } else {
            atividades.forEach(atividade => {
                const item = document.createElement('div');
                item.style.background = '#fff';
                item.style.border = '1px solid #ccc';
                item.style.padding = '10px';
                item.style.marginBottom = '10px';
                item.style.borderRadius = '5px';
                item.innerHTML = `
            <strong>Data:</strong> ${atividade.data}<br>
            <strong>Disciplina:</strong> ${atividade.disciplina}<br>
            <strong>Professor:</strong> ${atividade.professor}<br>
            <strong>Descrição:</strong> ${atividade.descricao}
          `;
                lista.appendChild(item);
            });
        }
    } else {
        calendario.style.display = 'block';
    }
}

window.addEventListener('resize', exibirAtividadesMobile);
window.addEventListener('load', exibirAtividadesMobile);

const projetos = {
    "professor1": {
        nome: "Prof. Leonardo",
        titulo: "Geografia na Prática – Olimpíada Brasileira de Geografia",
        conteudo: `
          O projeto visa estimular o interesse pela Geografia por meio da participação na OBG.
          Os alunos formarão equipes e estudarão temas como mudanças climáticas, urbanização,
          geopolítica e cartografia, com orientação do professor Leonardo. A proposta é integrar
          o conhecimento científico com desafios intelectuais reais.
        `
    },
    "professoraMichely": {
        nome: "Profª Michely",
        titulo: "Esporte e Inclusão – Formação do Time de Vôlei Feminino",
        conteudo: `
          O projeto tem como objetivo incentivar a participação das alunas na prática esportiva,
          com foco na formação da equipe feminina de vôlei da escola. Através de treinamentos e
          trabalho em equipe, busca-se promover disciplina, saúde e autoestima.
        `
    },
    "professorCarlos": {
        nome: "Prof. Carlos",
        titulo: "Matemática no Cotidiano – Clube de Xadrez",
        conteudo: `
          O Clube de Xadrez busca desenvolver habilidades como lógica, estratégia e concentração.
          As atividades incluem treinos regulares e uso de relógios oficiais. O projeto propõe
          a integração entre raciocínio lógico e competição saudável.
        `
    }
};

// Obter ID do projeto selecionado (salvo no localStorage, por exemplo ao clicar no index)
const projetoSelecionado = localStorage.getItem("projetoSelecionado");

// Pegar os dados
const projeto = projetos[projetoSelecionado];

// Preencher HTML
if (projeto) {
    document.getElementById("tituloProjeto").textContent = projeto.titulo;
    document.getElementById("nomeProfessor").textContent = "Professor(a): " + projeto.nome;
    document.getElementById("conteudoProjeto").innerHTML = projeto.conteudo;
} else {
    document.getElementById("tituloProjeto").textContent = "Projeto não encontrado";
    document.getElementById("conteudoProjeto").textContent = "Verifique se a seleção foi feita corretamente no index.html.";
}
