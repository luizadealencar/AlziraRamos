// script.js

document.addEventListener("DOMContentLoaded", () => {
  const equipe = [
    { nome: "Coordenadora Ana", cargo: "Coordenadora", foto: "equipe/coordenadora1.jpg" },
    { nome: "Coordenadora Beatriz", cargo: "Coordenadora", foto: "equipe/coordenadora2.jpg" },
    { nome: "Pedagoga Clara", cargo: "Pedagoga", foto: "equipe/pedagoga.jpg" },
    { nome: "Coordenadora Pedagógica Daniela", cargo: "Coord. Pedagógica", foto: "equipe/coordenadora-pedagoga.jpg" },
    { nome: "Diretor Eduardo", cargo: "Diretor", foto: "equipe/diretor.jpg" }
    // Adicione mais membros da equipe se quiser
  ];

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


const noticias = document.querySelectorAll('.noticia');
const reportagem = document.getElementById('reportagem');
const tituloReportagem = document.getElementById('titulo-reportagem');
const conteudoReportagem = document.getElementById('conteudo-reportagem');
const btnFechar = document.getElementById('fechar-reportagem');
const imagemReportagem = document.getElementById('imagem-reportagem');

noticias.forEach(noticia => {
  noticia.addEventListener('click', () => {
    const titulo = noticia.querySelector('h3').innerText;
    const conteudo = noticia.getAttribute('data-conteudo');
    const img = noticia.querySelector('img').src;
    const alt = noticia.querySelector('img').alt;

    tituloReportagem.innerText = titulo;
    conteudoReportagem.innerText = conteudo;
    imagemReportagem.src = img;
    imagemReportagem.alt = alt;

    reportagem.style.display = 'block';
    reportagem.scrollIntoView({ behavior: 'smooth' });
  });
});

btnFechar.addEventListener('click', () => {
  reportagem.style.display = 'none';
});