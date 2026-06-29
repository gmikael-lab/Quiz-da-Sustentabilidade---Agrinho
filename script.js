document.addEventListener("DOMContentLoaded", () => {

let pontos = 0;
let bloqueado = false;
let respostasUsuario = [];

const progresso = document.getElementById("progresso");

embaralharAlternativas();

document.querySelectorAll(".resposta, .btn-proximo").forEach(botao => {

botao.addEventListener("click", function () {

const atual = document.querySelector(".ativo");
const proximo = "passo-" + this.dataset.proximo;

if (!document.getElementById(proximo)) return;

if (this.classList.contains("resposta")) {

if (bloqueado) return;
bloqueado = true;

const pergunta = document.querySelector(".ativo h2").innerText;
const resposta = this.innerText;
const correta = this.dataset.correta === "true";
const explicacaoAluno = this.dataset.explicacao;

let respostaCorreta = "";
let explicacaoCorreta = "";

document.querySelectorAll(".ativo .resposta").forEach(btn => {
if (btn.dataset.correta === "true") {
respostaCorreta = btn.innerText;
explicacaoCorreta = btn.dataset.explicacao;
}
});

respostasUsuario.push({
pergunta,
resposta,
correta,
respostaCorreta,
explicacaoAluno,
explicacaoCorreta
});

if (correta) pontos++;

setTimeout(() => bloqueado = false, 300);
}

atual.classList.remove("ativo");
document.getElementById(proximo).classList.add("ativo");

atualizarProgresso(proximo);

if (proximo === "passo-11") {
mostrarResultado();
}

});

});

document.querySelector("#btn-gabarito").addEventListener("click", () => {

const g = document.getElementById("gabarito");

if (g.style.display === "block") {
g.style.display = "none";
return;
}

mostrarGabarito();
g.style.display = "block";

});

function atualizarProgresso(id) {

const n = parseInt(id.split("-")[1]);

progresso.innerHTML =
(n >= 1 && n <= 10)
? "Pergunta " + n + " de 10"
: "";

}

function embaralharAlternativas() {

document.querySelectorAll(".alternativas").forEach(c => {

let b = Array.from(c.children);

for (let i = b.length - 1; i > 0; i--) {
let j = Math.floor(Math.random() * (i + 1));
[b[i], b[j]] = [b[j], b[i]];
}

b.forEach(x => c.appendChild(x));

});

}

function mostrarResultado() {

const r = document.getElementById("resultado");

let personalidade = "";
let descricao = "";
let dica = "";

if (pontos <= 2) {

personalidade = "🪴 Despertando Ambientalmente";
descricao = "Você está começando a entender como suas ações impactam o meio ambiente.";
dica = "Comece com pequenas atitudes como economizar água e separar o lixo.";

}

else if (pontos <= 4) {

personalidade = "🌿 Aprendiz Sustentável";
descricao = "Você já conhece algumas práticas sustentáveis, mas ainda pode evoluir.";
dica = "Transforme o que você sabe em hábitos do dia a dia.";

}

else if (pontos <= 6) {

personalidade = "🌳 Guardião em Formação";
descricao = "Você já tem uma boa consciência ambiental.";
dica = "Incentive outras pessoas a praticarem sustentabilidade.";

}

else if (pontos <= 8) {

personalidade = "🌎 Protetor da Natureza";
descricao = "Você tem um nível alto de consciência ambiental.";
dica = "Busque ampliar ainda mais seu impacto positivo.";

}

else {

personalidade = "🏆 Mestre da Sustentabilidade";
descricao = "Você é um exemplo de consciência ambiental!";
dica = "Continue sendo referência e inspire outras pessoas.";
}

r.innerHTML = `
<h3>Resultado</h3>
<p>Você acertou ${pontos} de 10 perguntas.</p>

<br>
<h2>${personalidade}</h2>
<p>${descricao}</p>

<br>
<p><strong>Dica:</strong> ${dica}</p>

<br>
<p style="font-style:italic; margin-top:10px;">
🌱 Toda atitude conta para o planeta.
</p>
`;
}

function mostrarGabarito() {

const g = document.getElementById("gabarito");

let html = "<h2>📋 Gabarito</h2>";

respostasUsuario.forEach((item, i) => {

html += `<div>
<strong>${i + 1}. ${item.pergunta}</strong><br><br>`;

if (item.correta) {

html += `
✔ ${item.resposta}
<button class="btn-info" onclick="mostrarExplicacao(${i}, 'a')">💡</button>

<div id="explicacao-${i}-a" style="display:none">
<strong>Explicação:</strong><br>${item.explicacaoAluno}
</div>
`;

} else {

html += `
❌ ${item.resposta}
<button class="btn-info" onclick="mostrarExplicacao(${i}, 'a')">💡</button>

<br><br>

✔ ${item.respostaCorreta}
<button class="btn-info" onclick="mostrarExplicacao(${i}, 'c')">💡</button>

<br><br>

<div id="explicacao-${i}-a" style="display:none">
<strong>Sua resposta:</strong><br>${item.explicacaoAluno}
</div>

<div id="explicacao-${i}-c" style="display:none">
<strong>Resposta correta:</strong><br>${item.explicacaoCorreta}
</div>
`;
}

html += `<hr></div>`;
});

g.innerHTML = html;
}

window.mostrarExplicacao = function (i, t) {

const d = document.getElementById(`explicacao-${i}-${t}`);

d.style.display = d.style.display === "block"
? "none"
: "block";

};

});