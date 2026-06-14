let pontos = 0;

const progresso = document.getElementById("progresso");

embaralharAlternativas();

const respostas = document.querySelectorAll(".resposta");

respostas.forEach(botao => {

    botao.addEventListener("click", function(){

        if(this.dataset.correta === "true"){

            pontos++;

        }

        const atual = document.querySelector(".ativo");

        const proximo = "passo-" + this.dataset.proximo;

        atual.classList.remove("ativo");

        document.getElementById(proximo).classList.add("ativo");

        atualizarProgresso(proximo);

        if(proximo === "passo-11"){

            mostrarResultado();

        }

    });

});

document.querySelectorAll(".btn-proximo").forEach(botao=>{

    if(botao.classList.contains("resposta")) return;

    botao.addEventListener("click",function(){

        const atual=document.querySelector(".ativo");

        const proximo="passo-"+this.dataset.proximo;

        atual.classList.remove("ativo");

        document.getElementById(proximo).classList.add("ativo");

        atualizarProgresso(proximo);

    });

});

function atualizarProgresso(id){

    const numero = Number(id.replace("passo-",""));

    if(numero >= 1 && numero <= 10){

        progresso.innerHTML = "Pergunta " + numero + " de 10";

    }

    else{

        progresso.innerHTML = "";

    }

}

function embaralharAlternativas(){

    document.querySelectorAll(".alternativas").forEach(container=>{

        const botoes = Array.from(container.children);

        botoes.sort(()=>Math.random()-0.5);

        botoes.forEach(botao=>container.appendChild(botao));

    });

}

function mostrarResultado(){

    const resultado = document.getElementById("resultado");

    let texto = "";

    if(pontos==10){

        texto=`

        <h3>🌎 Guardião da Natureza</h3>

        <p>
        Você conhece muito bem as práticas sustentáveis e
        inspira outras pessoas a cuidar do planeta.
        </p>

        <h4>Parabéns!</h4>

        <p>
        Continue sendo um exemplo de consciência ambiental.
        </p>

        `;

    }

    else if(pontos>=8){

        texto=`

        <h3>🌱 Defensor Ambiental</h3>

        <p>
        Você já possui ótimos conhecimentos sobre sustentabilidade.
        </p>

        <h4>Dica:</h4>

        <p>
        Continue incentivando reciclagem,
        economia de água e preservação da natureza.
        </p>

        `;

    }

    else if(pontos>=6){

        texto=`

        <h3>♻️ Aprendiz Verde</h3>

        <p>
        Você está no caminho certo!
        </p>

        <h4>Dica:</h4>

        <p>
        Pesquise mais sobre energias renováveis,
        agricultura sustentável e reciclagem.
        </p>

        `;

    }

    else if(pontos>=3){

        texto=`

        <h3>🌿 Explorador Sustentável</h3>

        <p>
        Você ainda está aprendendo sobre preservação ambiental.
        </p>

        <h4>Dica:</h4>

        <p>
        Economize água,
        reduza o desperdício e descarte corretamente os resíduos.
        </p>

        `;

    }

    else{

        texto=`

        <h3>🌱 Semente do Futuro</h3>

        <p>
        Todo conhecimento começa pelo primeiro passo.
        </p>

        <h4>Dica:</h4>

        <p>
        Aprenda sobre reciclagem,
        proteção dos rios,
        conservação das florestas
        e consumo consciente.
        Pequenas atitudes mudam o mundo.
        </p>

        `;

    }

    texto += `<br><h2>Você acertou ${pontos} de 10 perguntas.</h2>`;

    resultado.innerHTML = texto;

}