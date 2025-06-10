function toggleMobileMenu() {
    const nav = document.getElementById('navbarNav');
    nav.classList.toggle('active');
}

function toggleFAQ(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems[index].classList.toggle('active');
}

function handleSubmit(event) {
    event.preventDefault();
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    event.target.reset();
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                document.getElementById('navbarNav').classList.remove('active');
            }
        });
    });

    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.backgroundColor = 'transparent';
        }
    });

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

    document.querySelectorAll('.news-card, .stat-item, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const gallery = document.querySelector('.gallery-container');
    if (gallery) {
        gallery.addEventListener('mouseenter', function () {
            this.style.animationPlayState = 'paused';
        });

        gallery.addEventListener('mouseleave', function () {
            this.style.animationPlayState = 'running';
        });
    }

    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function () {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });

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

    document.addEventListener('click', function (event) {
        const nav = document.getElementById('navbarNav');
        const toggle = document.querySelector('.mobile-menu-toggle');

        if (!nav.contains(event.target) && !toggle.contains(event.target)) {
            nav.classList.remove('active');
        }
    });

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
        conteudo: `Na próxima semana, a Escola Estadual de Ensino Fundamental e Médio Alzira Ramos dará um importante passo rumo à inovação educacional com a inauguração oficial da sua Sala Maker. O espaço foi criado para estimular a criatividade, o pensamento crítico e o trabalho colaborativo entre os estudantes, através de atividades práticas ligadas à tecnologia, robótica, artes e ciência.

Com computadores, impressora 3D, kits de robótica e materiais diversos para construção, a Sala Maker será um ambiente de experimentação, onde os alunos poderão desenvolver projetos interdisciplinares e aplicar, de forma concreta, os conhecimentos adquiridos em sala de aula.

Segundo a diretora da escola, professora Marta Oliveira, “a ideia é transformar o aprendizado em uma experiência mais viva, onde o aluno seja protagonista da sua própria descoberta.”

A inauguração acontecerá nesta sexta-feira, às 10h, com a presença de professores, estudantes, representantes da comunidade e convidados especiais. A expectativa é que o espaço se torne referência no uso da tecnologia a serviço da educação pública na região.`
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
    <h3>Turma e Modalidade de Ensino</h3>
    <p><strong>1º anos - Ensino Médio</strong></p>

    <h3>Objetivos de Conhecimento Abordados</h3>
    <p>Através das aulas planejadas no formato interativo, busca-se oferecer aos estudantes um entendimento mais prático e aplicado dos conceitos químicos fundamentais.</p>

    <h3>Objetivo da Prática</h3>
    <p>Compreender tendências e propriedades da Tabela Periódica. Aplicar tecnologias digitais no processo de aprendizagem.</p>

    <h3>Metodologia Inovadora para o Desenvolvimento da Prática</h3>
    <ul>
        <li>Rotação por estações</li>
        <li>Aprendizado colaborativo</li>
        <li>Uso de tecnologias digitais</li>
    </ul>

    <h3>Recurso(s) Utilizado(s)</h3>
    <ul>
        <li>Aplicativos de anotações digitais</li>
        <li>Vídeos e artigos sobre a Tabela Periódica</li>
        <li>Intérpretes de LIBRAS para apoio em sala</li>
        <li>Chromebook</li>
        <li>Internet</li>
    </ul>

    <h3>Expectativas de Aprendizagem</h3>
    <p>Combinando a sala de aula invertida, o conteúdo visa expandir a compreensão teórica para contextos do cotidiano. Promove-se uma educação que vá além do conhecimento em sala de aula, e, por meio de ferramentas digitais como quizzes e aplicativos, espera-se que os alunos desenvolvam não apenas conhecimento químico, mas também competências digitais essenciais para o século XXI.</p>

    <h3>Descrição da Prática</h3>
    <ol>
        <li><strong>Apresentação da Atividade e Preparação Inicial:</strong> Introdução à Tabela Periódica através de estudos individuais, apresentando o objetivo geral de explorar a Tabela Periódica com o auxílio de tecnologia de modo interativo, explicando o conceito de sala de aula invertida.</li>
        <li><strong>Atividade por Rotações:</strong> O objetivo é fazer com que os alunos explorem os diferentes conceitos e aspectos da Tabela Periódica divididos por estações, momento destinado ao levantamento de informações de acordo com cada estação.</li>
        <li><strong>Visitação das Estações:</strong>
            <ul>
                <li><strong>Estação 1:</strong> Conhecendo os elementos através da tela interativa e do PTable.</li>
                <li><strong>Estação 2:</strong> Experimento visual e simulações interativas para demonstração de reações químicas.</li>
                <li><strong>Estação 3:</strong> Criando modelos tridimensionais de moléculas utilizando o Tinkercad.</li>
                <li><strong>Estação 4:</strong> Desafio da Tabela Periódica com quizzes interativos para testar o conhecimento sobre organização dos elementos, propriedades e aplicações.</li>
            </ul>
        </li>
        <li><strong>Discussão/Conclusão:</strong> Os alunos participaram de uma discussão sobre as relações entre as propriedades dos elementos e seus comportamentos durante as simulações e experimentos visuais.</li>
    </ol>    
    `
    },
    "professorWladimir": {
        nome: "Prof Wladimir",
        titulo: "Aula de Língua Portuguesa – Desvendando a Morfossintaxe",
        conteudo: `
    <h3>Turma e Modalidade de Ensino</h3>
    <p><strong>9º anos – Ensino Fundamental</strong></p>

    <h3>Objetos de Conhecimento Abordados</h3>
    <p>Material estruturado, Rotina Pedagógica, Morfossintaxe.</p>

    <h3>Objetivo da Prática</h3>
    <p>Criar jogos através da cultura maker como revisão para a aula de Língua Portuguesa, focando na Morfossintaxe. O intuito é tornar a aprendizagem mais dinâmica e divertida, facilitando a fixação dos conteúdos de forma eficaz.</p>

    <h3>Metodologia Inovadora para o Desenvolvimento da Prática</h3>
    <ul>
        <li>Aula expositiva dialogada</li>
        <li>Ensino Híbrido</li>
        <li>Aprendizagem entre times</li>
        <li>Cultura Maker</li>
    </ul>

    <h3>Recurso(s) Utilizado(s)</h3>
    <ul>
        <li>Tela Interativa</li>
        <li>Classcraft</li>
        <li>Chromebook</li>
        <li>Plataforma online Quizizz</li>
        <li>Canva</li>
        <li>IA Lumen 5</li>
    </ul>

    <h3>Expectativas de Aprendizagem</h3>
    <p>Relacionar as alterações morfológicas com a função sintática das palavras e entender como essas mudanças impactam o significado das orações.</p>

    <h3>Descrição da Prática em 05 Etapas</h3>
    <ol>
        <li><strong>Quiz Interativo – Funções Sintáticas com Tecnologia (Cultura Maker Digital):</strong> Utilizando plataformas digitais, os alunos criarão quizzes personalizados com questões sobre funções sintáticas (sujeito, predicado, objetos, adjuntos, etc.).</li>
        <li><strong>Construção de Sentenças com Materiais Físicos (Cultura Maker Analógica):</strong> Momento destinado à criação e organização de frases. Cada cartão representará um termo sintático, como sujeito, verbo, objeto e adjunto, ajudando na visualização concreta das funções.</li>
        <li><strong>Montagem de Cartões Sintáticos:</strong> Cada estudante criará um “cartão sintático” representando uma função, com definição e exemplo de uso. A atividade será feita usando o Canva.</li>
        <li><strong>Estação Interativa de Funções Sintáticas:</strong> Serão organizadas estações de aprendizagem pela escola: estação do sujeito e predicado, estação da análise sintática com quizzes, entre outras. Cada estação apresentará aspectos da morfossintaxe de forma prática.</li>
        <li><strong>Documentação do Processo:</strong> Com auxílio da inteligência artificial Lumen 5, os alunos registrarão todo o processo, desde as reuniões iniciais até a exposição final, apresentando o trabalho para outros estudantes.</li>
    </ol>
        `
    },
    "professorGraziani": {
        nome: "Prof. Graziani Gatti",
        titulo: "A Transformação do Capitalismo: Da Era Industrial à Sociedade Digital e a Revolução do Trabalho",
        conteudo: `
    <h3>Turma e modalidade de ensino</h3>
    <p><strong>9º anos – Ensino Fundamental</strong></p>

    <h3>Objetos de conhecimento abordados</h3>
    <p>Contextualizar as revoluções industriais e a transição do capitalismo industrial para o capitalismo informacional.</p>

    <h3>Objetivo da prática</h3>
    <p>Analisar e compreender as transformações econômicas, sociais e trabalhistas provocadas pelas revoluções industriais, com ênfase na Indústria 4.0, inteligência artificial e a uberização do trabalho.</p>

    <h3>Metodologia</h3>
    <ul>
        <li>Aula expositiva dialogada</li>
        <li>Aprendizagem colaborativa</li>
        <li>Aprendizagem baseada em jogos</li>
    </ul>

    <h3>Recursos utilizados</h3>
    <ul>
      <li>Tela interativa</li>
      <li>IA</li>
      <li>Internet</li>
      <li>Chromebooks</li>
    </ul>

    <h3>Expectativas de aprendizagem</h3>
    <p>Proporcionar aos alunos uma compreensão sólida sobre as principais mudanças no cenário econômico e tecnológico atual, além de desenvolver suas habilidades de análise crítica e reflexão sobre as tendências futuras.</p>

    <h3>Etapas da prática</h3>
    <ol>
      <li><strong>Compreensão das Revoluções Industriais e suas Consequências:</strong> Os alunos devem ser capazes de identificar as principais características e impactos das 1ª, 2ª e 3ª revoluções industriais, entendendo a transição para a 4ª revolução industrial e seu impacto no mercado de trabalho e nas estruturas econômicas.</li>
      <li><strong>Capacidade de Analisar a Indústria 4.0 e as Tecnologias Emergentes:</strong> Explicar o conceito de Indústria 4.0, com ênfase em tecnologias como inteligência artificial, Internet das Coisas (IoT), automação e big data, e entender como essas tecnologias estão moldando o futuro da produção e dos negócios.</li>
      <li><strong>Reflexão Crítica sobre o Capitalismo Informacional:</strong> Analisar o conceito de capitalismo informacional e como ele difere do capitalismo industrial, acreditasse que eles possam entender como a informação e o conhecimento se tornaram ativos fundamentais na economia moderna.</li>
      <li><strong>Educação Mais Personalizada e Acessível:</strong> Eles aprenderão a organizar seu próprio tempo de maneira eficaz, estabelecendo metas de aprendizado pessoais e buscando o equilíbrio entre aprender rápido em tópicos que dominam e dedicar mais tempo aos desafios.</li>
      <li><strong>Customização de Conteúdo ao Estilo de Aprendizado:</strong> Os estudantes terão a oportunidade de identificar seu estilo de aprendizado, o que lhes permitirá escolher as estratégias mais eficazes para seu desenvolvimento.</li>
    </ol>
        `
    },
    "professoraDayara": {
        nome: "Profª Dayara Falqueto",
        titulo: "Estudo Orientado – Gamificação como recurso de revisão de objetos de conhecimento",
        conteudo: `
    <h3>Turma e modalidade de ensino</h3>
    <p><strong>1ª séries - Ensino Médio</strong></p>

    <h3>Objetos de conhecimento abordados</h3>
    <p>Estratégias e técnicas de estudo que auxiliem no aprendizado.</p>

    <h3>Objetivo da prática</h3>
    <p>Desenvolver a capacidade do aluno de aprender de forma autônoma, incentivando a responsabilidade e o controle sobre seu próprio aprendizado por meio de técnicas e estratégias de estudo.</p>

    <h3>Metodologia inovadora para o desenvolvimento da prática</h3>
    <ul>
        <li>Gamificação</li>
        <li>Ensino Maker</li>
    </ul>

    <h3>Recurso(s) utilizado(s)</h3>
    <ul>
        <li>Tela interativa</li>
        <li>App Kahoot</li>
        <li>Internet</li>
        <li>Laboratório de informática</li>
    </ul>

    <h3>Expectativas de aprendizagem</h3>
    <p>Compreender a gamificação como estratégia de revisão de conteúdo. Além de conhecer diferentes técnicas e estratégias de ensino com foco em atender as necessidades individuais de cada estudante, tornando o aprendizado mais eficaz e personalizado.</p>

    <h3>Etapas da prática</h3>
    <ol>
        <li><strong>Conhecendo a técnica VARK:</strong> Aula expositiva dialogada a respeito da técnica VARK (visual, auditivo, leitura/escrita e cinestésico), enfatizando os benefícios e características através da tela interativa.</li>
        <li><strong>Aplicando a técnica ao perfil:</strong> Preenchimento do perfil de estudo individualizado de cada estudante.</li>
        <li><strong>Gamificação:</strong> Aplicação do Kahoot a respeito dos conceitos e estilos de aprendizagem trabalhados nas aulas anteriores.</li>
        <li><strong>Feedback:</strong> Roda de conversa a respeito dos resultados gerados pelo relatório do Kahoot, dificuldades e potencialidades do uso da gamificação como objeto de revisão de conceitos.</li>
        <li><strong>Trabalho em equipe:</strong> Divisão dos grupos de trabalho e sorteio de objetos de conhecimento para a produção de Kahoots como ferramenta de revisão e consolidação de conteúdos.</li>
    </ol>
        `
    },
    "professorLeonardo": {
        nome: "Prof. Leonardo Galiano",
        titulo: "Geografia – Desafios Urbanos: Como a Urbanização Está Transformando Nossas Cidades",
        conteudo: `
    <h3>Turma e Modalidade de Ensino</h3>
    <p><strong>3º anos - Ensino Médio</strong></p>

    <h3>Objetos de Conhecimento Abordados</h3>
    <p>Urbanismo, Meio Ambiente, Impactos ambientais.</p>

    <h3>Objetivo da Prática</h3>
    <p>Abordar as dificuldades e os desafios do urbanismo atualmente em lugares diversos, no Brasil ou no exterior, como o crescimento populacional e a escassez de recursos. Desenvolver habilidades de interpretação de gráficos e tabelas relacionados ao tema.</p>

    <h3>Metodologia Inovadora para o Desenvolvimento da Prática</h3>
    <ul>
        <li>Rotação por estações</li>
        <li>Ensino Maker</li>
        <li>Aplicativos Canva e CapCut</li>
    </ul>

    <h3>Recurso(s) Utilizado(s)</h3>
    <ul>
        <li>Chromebook</li>
        <li>Internet</li>
        <li>Celular</li>
        <li>Câmera</li>
    </ul>

    <h3>Expectativas de Aprendizagem</h3>
    <p>Espera-se que os estudantes compreendam que o urbanismo vai além da construção de prédios e ruas, envolvendo planejamento, infraestrutura, sustentabilidade, políticas públicas e justiça social. Refletirão sobre como o planejamento urbano afeta o cotidiano, desde o acesso a transporte, lazer, saúde, educação e trabalho.</p>

    <h3>Descrição da Prática em 05 Etapas</h3>
    <ol>
        <li><strong>Introdução ao Tema:</strong> Aula expositiva dialogada sobre urbanização, suas causas, consequências e possíveis soluções. Formação dos grupos de trabalho.</li>
        <li><strong>Pesquisa Autônoma:</strong> Investigação sobre os impactos positivos e negativos do urbanismo, sua infraestrutura, acessibilidade, desenvolvimento econômico e desigualdade social.</li>
        <li><strong>Aulas e Estudos:</strong> Discussões guiadas, perguntas e respostas, pesquisas e elaboração de planos baseados em recursos coletados.</li>
        <li><strong>Sensibilização para o Impacto do Urbanismo:</strong> Entrevistas com moradores e pesquisas para identificar os efeitos do urbanismo na vida cotidiana, com foco na desigualdade social e no acesso a serviços essenciais.</li>
        <li><strong>Pensamento Crítico e Criativo:</strong> Produção de vídeos e materiais diagramados utilizando equipamentos audiovisuais e ferramentas digitais para comunicar mensagens de forma clara e impactante.</li>
    </ol>
    `
    },
    "professoraJozi": {
        nome: "Profª Jozi Gomes",
        titulo: "Circuitos Mágicos: Desvendando Eletrônica com Arduinos",
        conteudo: `
    <h3>Turma e Modalidade de Ensino</h3>
    <p><strong>8º anos – Ensino Fundamental II</strong></p>

    <h3>Objetos de Conhecimento Abordados</h3>
    <p>Introdução aos conceitos básicos de eletrônica utilizando Arduinos. Os alunos aprenderão sobre circuitos elétricos simples e componentes eletrônicos por meio de aulas teóricas e práticas com montagem de circuitos de LED.</p>

    <h3>Objetivo da Prática</h3>
    <p>Compreender os componentes básicos de um circuito elétrico e desenvolver a capacidade de planejar e realizar experimentos científicos com análise de resultados.</p>

    <h3>Metodologia Inovadora para o Desenvolvimento da Prática</h3>
    <ul>
        <li>Método PBL (Aprendizagem Baseada em Problemas)</li>
        <li>Cultura Maker</li>
        <li>Aula expositiva para introdução teórica</li>
        <li>Aulas práticas com Arduino</li>
    </ul>

    <h3>Recurso(s) Utilizado(s)</h3>
    <ul>
        <li>Material de apoio impresso</li>
        <li>Repositório digital</li>
        <li>Chromebook</li>
        <li>Internet</li>
        <li>Aplicativos de interação</li>
        <li>Kits Arduino e componentes eletrônicos</li>
    </ul>

    <h3>Expectativas de Aprendizagem</h3>
    <p>Espera-se que os alunos consigam relacionar os conhecimentos adquiridos com situações do cotidiano, desenvolvendo pensamento sustentável e ético, além de estimular a autonomia e o pensamento crítico para resolver problemas reais utilizando tecnologia.</p>

    <h3>Descrição da Prática em 05 Etapas</h3>
    <ol>
        <li><strong>Introdução Teórica aos Conceitos de Eletrônica:</strong> Apresentação dos conceitos básicos de eletrônica e circuitos elétricos com recursos visuais. Explicação dos componentes como resistores, capacitores, LEDs e fontes de energia.</li>
        <li><strong>Exploração dos Componentes:</strong> Distribuição dos kits Arduino e componentes. Instruções sobre o manuseio de cada item com breve explicação de suas características e aplicações.</li>
        <li><strong>Demonstração de Circuitos Simples:</strong> Montagem de um circuito simples com placa de prototipagem. Explicação passo a passo das conexões e lógica do circuito, permitindo aos alunos propor alterações.</li>
        <li><strong>Discussão em Grupo e Síntese dos Conceitos:</strong> Divisão da turma em grupos para discutir aprendizados, pontos de interesse e dificuldades. Utilização de aplicativos para flash cards e mapas mentais para organizar os conceitos.</li>
        <li><strong>Planejamento do Projeto e Execução:</strong> Cada grupo define um projeto prático envolvendo iluminação e sinalização. Aplicação dos conhecimentos adquiridos durante a prática com Arduino e componentes eletrônicos.</li>
    </ol>
    `
    }
};

function formatarTextoPlano(texto) {
    return texto
        .trim()
        .split(/\n{2,}/)
        .map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`)
        .join("");
}

const projetoSelecionado = localStorage.getItem("projetoSelecionado");
const projeto = projetos[projetoSelecionado];
if (projeto) {
    document.getElementById("professorProjeto").textContent = projeto.titulo;
    document.getElementById("nomeProfessor").textContent = "Professor(a): " + projeto.nome;
    document.getElementById("conteudoProjeto").innerHTML =
        `<div class="projeto">${projeto.conteudo}</div>`;

} else {
    document.getElementById("professorProjeto").textContent = "Projeto não encontrado";
    document.getElementById("conteudoProjeto").textContent = "Verifique se a seleção foi feita corretamente no index.html.";
}

