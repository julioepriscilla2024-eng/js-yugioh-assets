

const state = {
    score:{
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score-popints"),
    },
cardSprites:{
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),

    },

fieldCards:{
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
actions: {
        button:document.getElementById("next-duel"),
    }
};

const playerSides = {
    player1: "player-cards",
    computer: "computer-cards",
};
const pathImagens = "./src/assets/icons/";

const cardData = [
    {
        id:0,
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
    }
];
async function createCardImage(IdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px")
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");

if(fieldSide === playerSides.player1){
    cardImage.addEventListener("click", () => {
        setCardsField(cardImage.getAttribute("data-id"));
    });
}



cardImage.addEventListener("mouseover", () => { 
    drawSelectedCard(IdCard);
});
    return cardImage;

}
async function drawSelectedCard(index){
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Atribute:" + cardData[index].type;

}

async function getRandomCardId(){
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}


async function drawCards(cardNumber, fieldSide) {
    for(let i = 0; i < cardNumber; i++){
        const randonIdCards = await getRandomCardId();
        const cardImage = await createCardImage(randonIdCards, fieldSide);
        
        document.getElementById(fieldSide).appendChild(cardImage);
    }
    
}

function init() {       
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);
}
init();
