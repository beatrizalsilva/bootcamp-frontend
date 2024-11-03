const imagensDasCartas = [
    "🐨", "🐨",
    "🐹", "🐹",
    "😺", "😺",
    "🐿️", "🐿️",
    "🐤", "🐤",
    "🐯", "🐯",
    "🐰", "🐰"
];
let cartasViradas = [];

// embaralha as imagens das cartas aleatoriamente, usando o método sort()
let cartasEmbaralhadas = imagensDasCartas.sort(() => (Math.random() > 0.5 ? 2 : -1));

// loop para criar os elementos das cartas no HTML e adicioná-los ao tabuleiro
for (let i = 0; i < imagensDasCartas.length; i++) {
    let elementoCarta = document.createElement("div");
    elementoCarta.className = "cartas";
    elementoCarta.innerHTML = cartasEmbaralhadas[i];
    elementoCarta.onclick = virarCarta;
    document.querySelector(".areaDoJogo").appendChild(elementoCarta);
}

function virarCarta() {
    if (cartasViradas.length < 2) {
        this.classList.add("boxOpen");
        cartasViradas.push(this);
    }
    if (cartasViradas.length === 2) {
        setTimeout(verificarPar, 500); // aguarda 500ms antes de verificar o par
    }
}

function verificarPar() {
    if (cartasViradas[0].innerHTML === cartasViradas[1].innerHTML) {
        cartasViradas[0].classList.add("verificarPar");
        cartasViradas[1].classList.add("verificarPar");
    } else {
        // se não formam um par, remove a classe "boxOpen" para escondê-las novamente
        cartasViradas[0].classList.remove("boxOpen");
        cartasViradas[1].classList.remove("boxOpen");
    }

    cartasViradas = [];

    // verifica se todas as cartas foram combinadas e exibe uma mensagem de vitória
    if (document.querySelectorAll(".verificarPar").length === imagensDasCartas.length) {
        alert("Parabéns! Você encontrou todos os membros do BTS! 🎉 Seu Army power está mais forte do que nunca!");
    }
}