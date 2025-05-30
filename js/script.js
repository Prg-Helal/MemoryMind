const cardContainer = document.querySelector(".cards");

const triesCounter = document.getElementById("tries-counter");

const btnEnter = document.querySelector(".btn-enter");

const txtName = document.getElementById("txt-name");

const txtHello = document.getElementById("txt-hello");

const successSound = new Audio("../music/success-340660.mp3")
const wrongSound = new Audio("../music/wrong-47985.mp3")

const welcomeContainer = document.querySelector(".welcome-form");
btnEnter.addEventListener("click", setName)

function setName() {
    welcomeContainer.classList.remove("welcome-form")
    welcomeContainer.classList.add("d-none");
    txtHello.innerHTML = ``;
    txtHello.innerHTML = txtName.value
}
const imgsURL = []

for (let i = 1; i <= 8; i++) {
    for (let k = 0; k < 2; k++) {
        imgsURL.push(`./images/img-${i}.png`)
    }
}

function shuffle() {
    imgsURL.sort(() => Math.random() - 0.5)
    cardContainer.innerHTML = ``
    imgsURL.forEach(img => {
        cardContainer.innerHTML += `            <li class="card">
                <div class="view front-view">
                    <span class="material-icons">?</span>
                </div>
                <div class="view back-view">
                    <img src="${img}" alt="img-card">
                </div>
            </li>`
    })

}
shuffle()

// load cards
//
const cards = document.querySelectorAll(".card");

let cardOne, cardTwo;
let disableDeck = false;


function flipCard(e) {

    let clickedCard = e.target;

    if (clickedCard === cardOne || clickedCard.classList.contains("flip") || disableDeck) return;

    if (clickedCard !== cardOne) {
        clickedCard.classList.add("flip")

        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;

        let cardOneImg = cardOne.querySelector("img"),
            cardTwoImg = cardTwo.querySelector("img");

        matchCards(cardOneImg, cardTwoImg)
    }
}

function matchCards(img1, img2) {

    if (img1.src === img2.src) {
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        disableDeck = false;
        successSound.play();
        return;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
        wrongSound.play();

    }, 500);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1000);
    triesCounter.innerHTML = Number(triesCounter.innerHTML) + 1

}

cards.forEach(card => {
    card.addEventListener("click", flipCard)
})

function restartGame() {
    cardOne = cardTwo = null;
    disableDeck = false;
    triesCounter.innerHTML = 0;

    shuffle();

    const newCards = document.querySelectorAll(".card");
    newCards.forEach(card => {
        card.addEventListener("click", flipCard);
    });
}
