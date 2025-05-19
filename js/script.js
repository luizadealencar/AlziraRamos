// script.js

document.addEventListener("DOMContentLoaded", () => {
  const professores = [
    { nome: "Prof. João", disciplina: "Matemática", turmas: ["1ESP", "2IPI1"], formacao: "Licenciatura em Matemática", foto: "professores/joao.jpg" },
    { nome: "Profª. Luiza", disciplina: "Algoritmo e Lógica de Programação", turmas: ["1IPI1", "1IPI2"], formacao: "Sistema de Informação", foto: "../img/luiza.jpg" },
    { nome: "Profª. Luiza", disciplina: "Linguagem de Programação Aplicado a WEB", turmas: ["2IPI1", "2IPI2"], formacao: "Sistema de Informação", foto: "../img/luiza.jpg" },
    { nome: "Profª. Luiza", disciplina: "Linguagem de Programação Orientado a Objeto e Desenvolvimento de Sistema", turmas: ["3IPI1", "3IPI2"], formacao: "Sistema de Informação", foto: "../img/luiza.jpg" },
    { nome: "Profª. Luiza", disciplina: "Administração de Redes e Linguagem de Programação Orientado a Objeto", turmas: ["3RDC"], formacao: "Sistema de Informação", foto: "../img/luiza.jpg" },
    { nome: "Profª. Maria", disciplina: "Português", turmas: ["1IPI1", "3IPI2"], formacao: "Letras", foto: "professores/maria.jpg" },
    { nome: "Profª. Maria", disciplina: "Português", turmas: ["1IPI1", "3IPI2"], formacao: "Letras", foto: "professores/maria.jpg" },
    { nome: "Profª. Maria", disciplina: "Português", turmas: ["1IPI1", "3IPI2"], formacao: "Letras", foto: "professores/maria.jpg" },
    { nome: "Profª. Maria", disciplina: "Português", turmas: ["1IPI1", "3IPI2"], formacao: "Letras", foto: "professores/maria.jpg" },
    { nome: "Profª. Maria", disciplina: "Português", turmas: ["1IPI1", "3IPI2"], formacao: "Letras", foto: "professores/maria.jpg" },
    { nome: "Profª. Maria", disciplina: "Português", turmas: ["1IPI1", "3IPI2"], formacao: "Letras", foto: "professores/maria.jpg" },
    { nome: "Profª. Maria", disciplina: "Português", turmas: ["1IPI1", "3IPI2"], formacao: "Letras", foto: "professores/maria.jpg" },
    { nome: "Profª. Maria", disciplina: "Português", turmas: ["1IPI1", "3IPI2"], formacao: "Letras", foto: "professores/maria.jpg" },
    { nome: "Profª. Maria", disciplina: "Português", turmas: ["1IPI1", "3IPI2"], formacao: "Letras", foto: "professores/maria.jpg" },
    { nome: "Profª. Maria", disciplina: "Português", turmas: ["1IPI1", "3IPI2"], formacao: "Letras", foto: "professores/maria.jpg" },
    { nome: "Profª. Maria", disciplina: "Português", turmas: ["1IPI1", "3IPI2"], formacao: "Letras", foto: "professores/maria.jpg" },
    { nome: "Profª. Maria", disciplina: "Português", turmas: ["1IPI1", "3IPI2"], formacao: "Letras", foto: "professores/maria.jpg" },
    { nome: "Profª. Maria", disciplina: "Português", turmas: ["1IPI1", "3IPI2"], formacao: "Letras", foto: "professores/maria.jpg" },
    { nome: "Profª. Maria", disciplina: "Português", turmas: ["1IPI1", "3IPI2"], formacao: "Letras", foto: "professores/maria.jpg" },

    // Adicione mais professores aqui
  ];

  const container = document.getElementById("lista-professores");
  professores.forEach(prof => {
    const div = document.createElement("div");
    div.className = "professor";
    div.innerHTML = `
      <img src="${prof.foto}" alt="${prof.nome}">
      <h4>${prof.nome}</h4>
      <p><strong>Disciplina:</strong> ${prof.disciplina}</p>
      <p><strong>Turmas:</strong> ${prof.turmas.join(", ")}</p>
      <p><strong>Formação:</strong> ${prof.formacao}</p>
    `;
    container.appendChild(div);
  });

  const turmas = ["1ESP", "1IPI1", "1IPI2", "2IPI1", "2IPI2", "3IPI1", "3IPI2", "2RDC1", "2RDC2", "3RDC"];
  const calendarioContainer = document.getElementById("calendarios-turmas");
  turmas.forEach(turma => {
    const div = document.createElement("div");
    div.innerHTML = `<h4>${turma}</h4><textarea rows="5" cols="50" placeholder="Atividades e datas para ${turma}"></textarea>`;
    calendarioContainer.appendChild(div);
  });
});

const turma = "1IPI1";
let calendar;

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
  // Garantir que cada evento tem 'id'
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
