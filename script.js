let pontos = 0;

const botoes = document.querySelectorAll(".btn-proximo");

document.querySelectorAll(".correta").forEach(botao => {

    botao.addEventListener("click", () => {

        pontos++;

    });

});

botoes.forEach(botao => {

    botao.addEventListener("click", function(){

        const atual = document.querySelector(".ativo");

        const proximoPasso = "passo-" + this.getAttribute("data-proximo");

        atual.classList.remove("ativo");

        document.getElementById(proximoPasso).classList.add("ativo");

        if(proximoPasso === "passo-11"){

            let mensagem = "";

            if(pontos == 10){

                mensagem =
                "🏆 Parabéns! Você acertou todas as 10 perguntas e demonstrou excelente conhecimento sobre sustentabilidade!";

            }

            else if(pontos >= 8){

                mensagem =
                "🌱 Muito bem! Você acertou " + pontos + " de 10 perguntas.";

            }

            else if(pontos >= 5){

                mensagem =
                "😊 Você acertou " + pontos + " de 10 perguntas. Continue aprendendo sobre sustentabilidade!";

            }

            else{

                mensagem =
                "📚 Você acertou " + pontos + " de 10 perguntas. Continue estudando e faça sua parte pelo meio ambiente!";

            }

            document.getElementById("resultado").innerHTML = mensagem;

        }

    });

});