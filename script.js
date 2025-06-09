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
        professor: "Olimpíada de Geografia",
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
        professor: "Passeio Pedagógico à Câmara dos Vereadores",
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
        professor: "Lançamento do Clube de Xadrez",
        data: "Publicado em 03/06/2025",
        imagem: "img/xadrez.jpg",
        conteudo: `A Escola Alzira Ramos inaugura seu novo Clube de Xadrez, com o objetivo de estimular o raciocínio lógico, a concentração e a estratégia entre os alunos. O clube proporciona um espaço para que os estudantes desenvolvam habilidades intelectuais e aprendam a competir de forma saudável. Para isso, a escola adquiriu relógios oficiais de xadrez, que serão usados nas partidas e treinamentos, garantindo mais profissionalismo e dinamismo às atividades.`
    },
    {
        id: 4,
        professor: "Formação do time de vôlei feminino",
        data: "Publicado em 03/06/2025",
        imagem: "img/volei.jpg",
        conteudo: `A escola também comemora a formação da sua primeira equipe feminina de vôlei. As alunas já estão em fase de treinamento, sob a supervisão da professora de educação física Michely, preparando-se para participar das competições escolares. Essa iniciativa valoriza a inclusão e o incentivo à prática esportiva entre as meninas, promovendo disciplina, trabalho em equipe e fortalecimento do espírito esportivo.`
    },
    {
        id: 5,
        professor: "Melhorias na Quadra Esportiva",
        data: "Publicado em 03/06/2025",
        imagem: "img/quadra.jpg",
        conteudo: `Pequenos reparos foram realizados na quadra da escola para melhorar o ambiente de prática esportiva. Além disso, foi feita a pintura do lado de fora da escola e houve reorganização do espaço, que agora está mais seguro e confortável para os alunos. Essas melhorias contribuem para um ambiente mais agradável, facilitando o desenvolvimento de diferentes modalidades esportivas e incentivando a participação dos estudantes.`
    },
    {
        id: 6,
        professor: "Festa Cultural",
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
    },
    {
        id: 7,
        professor: "Escola Alzira Ramos inaugura Sala Maker e aposta em inovação no ensino",
        data: "Publicado em 09/06/2025",
        imagem: "img/salamaker1.jpeg",
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
    // Mantém a parte do calendário das turmas, se ainda for usada:
    const turmas = ["1ESP", "1IPI1", "1IPI2", "2IPI1", "2IPI2", "3IPI1", "3IPI2", "2RDC1", "2RDC2", "3RDC"];
    const calendarioContainer = document.getElementById("calendarios-turmas");
    turmas.forEach(turma => {
        const div = document.createElement("div");
        div.innerHTML = `<h4>${turma}</h4><textarea rows="5" cols="50" placeholder="Atividades e datas para ${turma}"></textarea>`;
        calendarioContainer.appendChild(div);
    });
});



function toggleMobileMenu() {
    const nav = document.getElementById("navbarNav");
    nav.classList.toggle("active");
}

const projetos = {
    "professoraDebora": {
        nome: "Profª Débora Moreira",
        titulo: "Tabela Periódica com Experimentos Químicos Interativos",
        conteudo: `
          Turma e Modalidade de ensino:
          1º anos - Ensino Médio

          Objetivos de conhecimento abordados:
Através das aulas planejadas no formato interativo busca oferecer aos estudantes um entendimento mais prático e aplicado dos conceitos químicos fundamentais.

          Objetivo da prática:
Compreender tendências e propriedades da Tabela Periódica. Aplicar tecnologias digitais no processo de aprendizagem.

          Metodologia inovadora para o desenvolvimento da prática:
Rotação por estações, aprendizado colaborativo e uso de tecnologias digitais.

Recurso(s) utilizado(s):
Aplicativos de anotações digitais;
Vídeos e artigos sobre a Tabela Periódica;
Intérpretes de LIBRAS para apoio em sala;
Chromebook;
Internet.

Expectativas de aprendizagem:
Combinação de sala de aula invertida, o conteúdo visa expandir a compreensão teórica para contextos do cotidiano, promovendo uma educação que vá além do conhecimento em sala de aula, através de ferramentas digitais, como quizzes e aplicativos, espera-se que os alunos desenvolvam não apenas conhecimento químico, mas também competências digitais essenciais para o século XXI.

Descreva a prática:
Apresentação da Atividade e Preparação Inicial
Introdução à Tabela Periódica através de estudos individuais, ao seu início apresentando o objetivo geral que é explorar a Tabela Periódica com o auxílio de tecnologia de modo interativo e explicando o conceito de sala de aula invertida.

Atividade por rotações
O objetivo é fazer com que os alunos explorem os diferentes conceitos e aspectos da tabela periódica divididos por estações, momento destinado para levantamento das informações de acordo com cada estação.

Visitação das Estações
Cada grupo irá apresentar as suas descobertas e experimentos realizados nas estações:
Estação 1: Conhecendo os elementos através da tela interativa e do PTable.
Estação 2: Experimento visual e experimentos através da interatividade realizando simulações para demonstração reações químicas.
Estação 3: Criando um modelo utilizando o Tinkercad criando modelos tridimensionais de moléculas.
Estação 4: Desafio da Tabela Periódica através dos quizzes interativos foi testado o conhecimento dos alunos referentes à organização dos elementos e suas propriedades e aplicações.

Discussão/Conclusão:
Os alunos fizeram uma discussão sobre as relações entre as propriedades dos elementos e os seus comportamentos durante as simulações e experimentos visuais.
        `
    },
    "professorWladimir": {
        nome: "Prof Wladimir",
        titulo: "Aula de Língua Portuguesa – Desvendando a Morfossintaxe",
        conteudo: `Turma e modalidade de ensino:
9º anos – Ensino Fundamental

Objetos de conhecimento abordados:
Material estruturado Rotina Pedagógica Morfossintaxe.

Objetivo da prática:
Criar jogos através da cultura maker, como revisão para a aula de Língua Portuguesa focando na Morfossintaxe com intuito de tornar a aprendizagem mais dinâmica e divertida, os jogos ajudarão a fixar os conteúdos de forma eficaz.

Metodologia inovadora para o desenvolvimento da prática:
Aula expositiva dialogada; Ensino Híbrido; Aprendizagem entre times; Cultura Maker.
Recurso(s) utilizado(s): Tela Interativa – Classcraft – Chromebook – Plataforma online Quizizz – Canva – IA Lumen 5.

Expectativas de aprendizagem:
Relacionar as alterações morfológicas com a função sintática das palavras e entender como essas mudanças impactam o significado das orações.

Descreva a prática em 05 etapas.
Quiz Interativo – Funções Sintáticas com Tecnologia (Cultura Maker Digital):
Através das plataformas digitais para criar quizzes interativos os alunos irão criar quizzes personalizados com questões sobre funções sintáticas (sujeito, predicado, objetos, adjuntos, etc.).

Construção de Sentenças com Materiais Físicos (Cultura Maker Analógica):
Momento destinado para a criação e organização de frases, que ajudarão a visualizarem as funções sintáticas de forma mais concreta onde cada cartão representa um termo sintático: sujeito, verbo, objeto, adjunto.

Montagem de cartões sintáticos:
Nessa etapa cada estudante criará um “cartão sintático” para representar uma função, escrevendo a definição com exemplo de uso através da ferramenta digital Canva.

Estação Interativa de Funções Sintáticas:
A esta altura os estudantes farão em torno da escola algumas estações de aprendizagem, estação do sujeito e predicado, estação da análise sintática com quizzes nas quais apresentam diferentes aspectos da morfossintaxe de forma prática.

Documentação do Processo:
Os estudantes realizaram com auxílio da inteligência artificial Lumen 5, mostrando todo o processo de criação e de exposição, desde as reuniões iniciais até a montagem final, feito isso eles exibiram o trabalho para outros alunos.
        `
    },
    "professorGraziani": {
        nome: "Prof. Graziani Gatti",
        titulo: "A Transformação do Capitalismo: Da Era Industrial à Sociedade Digital e a Revolução do Trabalho",
        conteudo: `Turma e modalidade de ensino:
9º anos - Ensino Fundamental.

Objetos de conhecimento abordados:
Contextualizar as revoluções industriais e a transição do capitalismo industrial para o capitalismo informacional.

Objetivo da prática:
Analisar e compreender as transformações econômicas, sociais e trabalhistas provocadas pelas revoluções industriais, com ênfase na Indústria 4.0, inteligência artificial e a uberização do trabalho.

Metodologia inovadora para o desenvolvimento da prática:
Aula expositiva dialogada; Aprendizagem Colaborativa; Aprendizagem baseada em jogos.
Recurso(s) utilizado(s): Tela interativa com auxílio do professor virtual I A, Internet e Chromebooks.

Expectativas de aprendizagem:
Proporcionar aos alunos uma compreensão sólida sobre as principais mudanças no cenário econômico e tecnológico atual, além de desenvolver suas habilidades de análise crítica e reflexão sobre as tendências futuras.

Descreva a prática em 05 etapas
1. Compreensão das Revoluções Industriais e suas Consequências:
Os alunos devem ser capazes de identificar as principais características e impactos das 1ª, 2ª e 3ª revoluções industriais, entendendo a transição para a 4ª revolução industrial e seu impacto no mercado de trabalho e nas estruturas econômicas.

2. Capacidade de Analisar a Indústria 4.0 e as Tecnologias Emergentes:
Explicar o conceito de Indústria 4.0, com ênfase em tecnologias como inteligência artificial, Internet das Coisas (IoT), automação e big data, e entender como essas tecnologias estão moldando o futuro da produção e dos negócios.

3. Reflexão Crítica sobre o Capitalismo Informacional:
Analisar o conceito de capitalismo informacional e como ele difere do capitalismo industrial, acreditasse que eles possam entender como a informação e o conhecimento se tornaram ativos fundamentais na economia moderna.

4. Educação Mais Personalizada e Acessível:
Eles aprenderão a organizar seu próprio tempo de maneira eficaz, estabelecendo metas de aprendizado pessoais e buscando o equilíbrio entre aprender rápido em tópicos que dominam e dedicar mais tempo aos desafios.

5. Customização de Conteúdo ao Estilo de Aprendizado:
Os estudantes terão a oportunidade de identificar seu estilo de aprendizado, o que lhes permitirá escolher as estratégias mais eficazes para seu desenvolvimento.
        `
    },
    "professoraDayara": {
        nome: "Profª Dayara Falqueto",
        titulo: "Estudo Orientado – Gamificação como recurso de revisão de objetos de conhecimento",
        conteudo: `Turma e modalidade de ensino:
1ª série - Ensino Médio.

Objetos de conhecimento abordados:
Estratégias e técnicas de estudo que auxiliem no aprendizado.

Objetivo da prática:
Desenvolver a capacidade do aluno de aprender de forma autônoma, incentivando a responsabilidade e o controle sobre seu próprio aprendizado por meio de técnicas e estratégias de estudo.

Metodologia inovadora para o desenvolvimento da prática:
Gamificação; Ensino Maker.
Recurso(s) utilizado(s):
Tela interativa, App Kahoot, Internet e Laboratório de informática.

Expectativas de aprendizagem:
Compreender a gamificação como estratégia de revisão de conteúdo. Além de conhecer diferentes técnicas e estratégias de ensino com foco em atender as necessidades individuais de cada estudante, tornando o aprendizado mais eficaz e personalizado.

Descreva a prática em 05 etapas
1. Conhecendo a técnica VARK:
Aula expositiva dialogada a respeito da técnica VARK (visual, auditivo, leitura/escrita e cinestésico), enfatizando os benefícios e características através da tela interativa.

2. Aplicando a técnica ao perfil:
Preenchimento do perfil de estudo individualizado de cada estudante.

3. Gamificação:
Aplicação do Kahoot a respeito dos conceitos e estilos de aprendizagem trabalhados nas aulas anteriores.

4. Feedback:
Roda de conversa a respeito dos resultados gerados pelo relatório do Kahoot, dificuldades e potencialidades do uso da gamificação como objeto de revisão de conceitos.

5. Trabalho em equipe:
Divisão dos grupos de trabalho e sorteio de objetos de conhecimento para a produção de Kahoots como ferramenta de revisão e consolidação de conteúdos.
        `
    },
    "professorLeonardo": {
        nome: "Prof. Leonardo Galiano",
        titulo: "Geografia – Desafios Urbanos: Como a Urbanização Está Transformando Nossas Cidades",
        conteudo: `Turma e modalidade de ensino:
3º anos do Ensino Médio

Objetos de conhecimento abordados:
Urbanismo, Meio Ambiente, Impactos ambientais

Objetivo da prática:
Abordar as dificuldades e os desafios do urbanismo atualmente em lugares diversos seja no Brasil ou no exterior, como o crescimento populacional, a escassez de recursos, desenvolver habilidades de interpretar gráficos e tabelas com os dados apresentados mediante ao tema.

Metodologia inovadora para o desenvolvimento da prática:
Rotação por estações, Ensino Maker, App Canva e CapCut.
Recurso(s) utilizado(s):
Chromebook, Internet, Celular, Câmera.

Expectativas de aprendizagem:
Espera-se que os estudantes entendam que o urbanismo envolve mais do que apenas a construção de prédios e ruas, trata-se de um campo que integra planejamento, infraestrutura, sustentabilidade, política pública e justiça social, refletir sobre como as escolhas feitas no planejamento urbano afetam o seu próprio dia a dia, no acesso a transporte público, ao lazer, ao trabalho ou aos serviços de saúde e educação.

Descreva a prática em 05 etapas
1. Introdução ao Tema:
Aula expositiva dialogada sobre urbanização, sua causas e consequências e expor possíveis soluções para os problemas urbanos debatidos, divisão dos grupos.

2. Pesquisa autônoma:
Consequências positivas e negativas do urbanismo, sua infraestrutura e acessibilidade. Desenvolvimento econômico, abordando como o crescimento das áreas urbanas pode impulsionar a economia local, criando mais oportunidades de trabalho, aumentando a renda e melhorando a qualidade de vida. Segregação social e desigualdade.

3. Aulas e Estudos:
Os alunos participam ativamente de discussões, perguntas e respostas, além de procurar por recursos adicionais para aprofundar seu conhecimento e discutir ideias e elaborar planos.

4. Sensibilização para o Impacto do Urbanismo na Vida das Pessoas:
Por meio de entrevistas com moradores e pesquisas feitas na internet e no âmbito escolar, os estudantes aprenderam a identificar o impacto do urbanismo nas condições de vida, com ênfase em como ele influencia a desigualdade social, o acesso a serviços essenciais e a qualidade ambiental.

5. Pensamento Crítico e Criativo:
A criação de vídeos e diagramação permite que os discentes resolvam problemas na qual eles devem pensar sobre como comunicar uma mensagem de maneira clara e impactante fazendo uso de equipamentos e recursos audiovisuais.
        `
    },
    "professoraJozi": {
        nome: "Profª Jozi Gomes",
        titulo: "Circuitos Mágicos: Desvendando Eletrônica com Arduinos",
        conteudo: `Turma e modalidade de ensino:
8º anos – Ensino Fundamental II

Objetos de conhecimento abordados:
Tem como objetivo central introduzir conceitos básicos de eletrônica utilizando Arduinos. Os alunos aprenderão sobre circuitos elétricos simples e componentes eletrônicos com aulas teóricas, seguida da montagem prática de um circuito de LED.

Objetivo da prática:
Compreender os componentes básicos de um circuito elétrico e desenvolver a capacidade de planejar e realizar experimentos científicos com análise de resultados.

Metodologia inovadora para o desenvolvimento da prática:
Método PBL e Cultura maker.
Aula expositiva para introdução teórica, Aulas práticas usando Arduinos.

Recurso(s) utilizado(s):
Material de apoio impresso com informações teóricas e práticas, Repositório, Chromebook, Internet, Aplicativos de interação, Kits Arduino e componentes eletrônicos.

Expectativas de aprendizagem:
Espera-se que os discentes possam relacionar os conhecimentos aprendidos com situações reais do cotidiano, promovendo o pensamento sustentável e ético, estabelecendo conexões entre tecnologia, desenvolvendo nos estudantes a autonomia e o pensamento crítico na resolução de problemas que possam surgir.

Descreva a prática em 05 etapas
1. Introdução Teórica aos Conceitos de Eletrônica:
A aula iniciou-se com a apresentação dos conceitos básicos de eletrônica e circuitos elétricos, utilizando recursos visuais para ilustrar os componentes principais: resistores, capacitores, LEDs e fontes de energia, destacando a função de cada componente em um circuito.

2. Exploração dos Componentes:
Distribuição dos kits de Arduino e dos componentes eletrônicos para os alunos, instruindo-os no manuseio de cada item, enquanto isso fazia-se um breve resumo de suas características e usos.

3. Demonstração de Circuitos Simples:
Demonstração prática, montando um circuito elétrico simples utilizando uma placa de prototipagem, fazendo junto com os estudantes o passo a passo da conexão feita e a lógica por trás de cada funcionamento do circuito, permitindo que eles sugiram alterações na montagem para observar diferentes resultados.

4. Discussão em Grupo e Síntese dos Conceitos:
A turma foi dividida em pequenos grupos e foi solicitado que eles discutam o que aprenderam até o momento, o que mais lhes chamou atenção, quais as partes foram mais interessantes, fazendo uso de aplicativos que contemplem formato flash card e mapa mental.

5. Planejamento do Projeto e execução:
Nesse momento os grupos irão definir um projeto prático que envolva iluminação e sinalização e querem criar e como aplicar os conhecimentos adquiridos com os componentes eletrônicos.
        `
    }
};

function formatarTextoPlano(texto) {
  // 1) quebra dupla → novo parágrafo
  // 2) quebra simples → <br>
  return texto
    .trim()
    .split(/\n{2,}/)                 // separa blocos por linha vazia
    .map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

const projetoSelecionado = localStorage.getItem("projetoSelecionado");
const projeto = projetos[projetoSelecionado];
if (projeto) {
  document.getElementById("professorProjeto").textContent = projeto.titulo;
  document.getElementById("nomeProfessor").textContent  = "Professor(a): " + projeto.nome;
  document.getElementById("conteudoProjeto").innerHTML = formatarTextoPlano(projeto.conteudo);
} else {
  document.getElementById("professorProjeto").textContent = "Projeto não encontrado";
  document.getElementById("conteudoProjeto").textContent = "Verifique se a seleção foi feita corretamente no index.html.";
}

