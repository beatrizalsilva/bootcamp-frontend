const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time"),
        yourScore: document.querySelector("#score")
    },
    values: {
        velocidade: 1000,
        posicao: 0,
        resultado: 0,
        tempo: 60,
        pontosParaVencer: 50
    },
    actions: {
        timerId: null,
        contadorDeTempoId: null
    }
}

function contadorDeTempo() {
    state.values.tempo--;
    state.view.timeLeft.textContent = state.values.tempo;

    if (state.values.tempo <= 0) {
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.contadorDeTempoId);
        alert("Game Over! Seu resultado foi: " + state.values.resultado);
    }
}

function sortearInimigo() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let sortearBloco = Math.floor(Math.random() * 9);
    let sortearSquare = state.view.squares[sortearBloco];
    sortearSquare.classList.add("enemy");
    state.values.posicao = sortearSquare.id;
}

function listenerBlocos() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.posicao) {
                state.values.resultado++;
                state.view.yourScore.textContent = state.values.resultado;
                state.values.posicao = null;
                efeitoSonoro();
            }

            // condição para vitória
            if (state.values.resultado >= state.values.pontosParaVencer) {
                clearInterval(state.actions.timerId);
                clearInterval(state.actions.contadorDeTempoId);
                alert("Parabéns! Você venceu o jogo com " + state.values.resultado + " pontos!");
            }
        });
    });
}

function efeitoSonoro() {
    let audio = new Audio("./src/audio/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function iniciar() {
    state.actions.timerId = setInterval(sortearInimigo, state.values.velocidade);
    state.actions.contadorDeTempoId = setInterval(contadorDeTempo, 1000);
    listenerBlocos();
}

iniciar();