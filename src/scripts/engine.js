const state = {
  score: {
    playerScore: 0,
    computerScore: 0,
    scoreBox: document.getElementById("score_points"),
  },
  cardSprites: {
    avatar: document.getElementById("card-image"),
    name: document.getElementById("card-name"),
    type: document.getElementById("card-type"),
  },

  fieldCards: {
    player: document.getElementById("player-field-card"),
    computer: document.getElementById("computer-field-card"),
  },

  playerSides: {
    player1: "player-cards",
    player1BOX: document.querySelector("#player-cards"),
    computer: "computer-cards",
    computerBOX: document.querySelector("#computer-cards"),
  },
  actions: {
    button: document.getElementById("next-duel"),
  },
};

const playerSides = {
  player1: "player-cards",
  computer: "computer-cards",
};
const pathImagens = "./src/assets/icons/";

const cardData = [
  {
    id: 0,
    name: "Blue Eyes White Dragon",
    type: "Paper",
    img: `${pathImagens}dragon.png`,
    WinOf: [1],
    LoseOf: [2],
  },
  {
    id: 1,
    name: "Darck Magician",
    type: "Rock",
    img: `${pathImagens}magician.png`,
    WinOf: [2],
    LoseOf: [0],
  },
  {
    id: 2,
    name: "Exodia",
    type: "Scissors",
    img: `${pathImagens}exodia.png`,
    WinOf: [0],
    LoseOf: [1],
  },
];
async function createCardImage(IdCard, fieldSide) {
  const cardImage = document.createElement("img");
  cardImage.setAttribute("height", "100px");
  cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
  cardImage.setAttribute("data-id", IdCard);
  cardImage.classList.add("card");

  if (fieldSide === playerSides.player1) {
    cardImage.addEventListener("click", () => {
      setCardsField(cardImage.getAttribute("data-id"));
    });

    cardImage.addEventListener("mouseover", () => {
      drawSelectedCard(IdCard);
    });
  }

  return cardImage;
}
async function setCardsField(cardId) {
  await removeAllCardsImages();

  let computerCardId = await getRandomCardId();
  
  await hiddenCardDetails();

  await drawCardInfield(cardId, computerCardId);
  
  await showHiddenCardFieldsImagens(true);

  let duelResults = await checkDuelResults(cardId, computerCardId);
  
  await drawButton(duelResults);
  await updateScore();
  
}

async function drawCardInfield(cardId, computerCardId) {
  state.fieldCards.player.src = cardData[cardId].img;
  state.fieldCards.computer.src = cardData[computerCardId].img;

}

async function showHiddenCardFieldsImagens(value){
  if(value === true){
    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";
  }
  if(value === false){
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";
  }
}

async function hiddenCardDetails() {
  state.cardSprites.avatar.src = "";
  state.cardSprites.name.innerText = "";
  state.cardSprites.type.innerText = "";
}

async function updateScore() {
  state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | lose: ${state.score.computerScore}`;
    
}
async function drawButton(text) {
  state.actions.button.innerText = text.toUpperCase();
  state.actions.button.style.display = "block";
}


async function checkDuelResults(playerCardId, computerCardId) {
  let duelResults = "Draw";
  let playerCard = cardData[playerCardId];

  if (playerCard.WinOf.includes(computerCardId)) {
    duelResults = "Win";
    await playAudio('Win');
    state.score.playerScore++;
  }

  else if (playerCard.LoseOf.includes(computerCardId)) {
    duelResults = "Lose";
    await playAudio('Lose');
    state.score.computerScore++;
  }
  await playAudio('duelResults');
  return duelResults;
}

async function removeAllCardsImages() {
  let { computerBOX, player1BOX } = state.playerSides;
  let imgElements = computerBOX.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());

  cards = state.playerSides.player1BOX;
  imgElements = player1BOX.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());
}

async function drawSelectedCard(index) {
  state.cardSprites.avatar.src = cardData[index].img;
  state.cardSprites.name.innerText = cardData[index].name;
  state.cardSprites.type.innerText = "Atribute:" + cardData[index].type;
}

async function getRandomCardId() {
  const randomIndex = Math.floor(Math.random() * cardData.length);
  return cardData[randomIndex].id;
}

async function drawCards(cardNumber, fieldSide) {
  for (let i = 0; i < cardNumber; i++) {
    const randonIdCards = await getRandomCardId();
    const cardImage = await createCardImage(randonIdCards, fieldSide);

    document.getElementById(fieldSide).appendChild(cardImage);
  }
}

async function resetDuel(){
  state.cardSprites.avatar.src = "";
  state.actions.button.style.display = "none";

  state.fieldCards.player.style.display = "none";
  state.fieldCards.computer.style.display = "none";

  init();
}

async function playAudio(status){
  let audioSrc = "";
  if (status === "Win") {
    audioSrc = "./src/assets/audios/win.wav";
  } else if (status === "Lose") {
    audioSrc = "./src/assets/audios/lose.wav";
  } else {
    audioSrc = "./src/assets/audios/duelResults.wav";
  }
  const audio = new Audio(audioSrc);
  audio.play();
}

function init() {
  showHiddenCardFieldsImagens(false);
  drawCards(5, playerSides.player1);
  drawCards(5, playerSides.computer);

  const bgm = document.getElementById("bgm");
  bgm.play();
}
init();
