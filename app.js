const cardCharacters = {
    hiragana: ["あ", "い", "お", "う", "え", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ", "ま", "み", "む", "め", "も", "や" , "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ", "を", "ん"],


    romanji: ["a", "i", "o", "u", "e", "ka", "ki", "ku", "ke", "ko", "sa", "shi", "su", "se", "so", "ta", "chi", "tsu", "te", "to", "na", "ni", "nu", "ne", "no", "ha", "hi", "fu", "he", "ho", "ma", "mi", "mu", "me", "mo", "ya" , "yu", "yo", "ra", "ri", "ru", "re", "ro", "wa", "wo", "n"],
};
const winningPairs = [
    ["あ", "a"],
    ["い", "i"],
    ["お", "o"],
    ["う", "u"],
    ["え", "e"],
    ["か", "ka"],
    ["き", "ki"],
    ["く", "ku"],
    ["け", "ke"],
    ["こ", "ko"],
    ["さ", "sa"],
    ["し", "shi"],
    ["す", "su"],
    ["せ", "se"],
    ["そ", "so"],
    ["た", "ta"],
    ["ち", "chi"],
    ["つ", "tsu"],
    ["て", "te"],
    ["と", "to"],
    ["な", "na"],
    ["に", "ni"],
    ["ぬ", "nu"],
    ["ね", "ne"],
    ["の", "no"],
    ["は", "ha"],
    ["ひ", "hi"],
    ["ふ", "fu"],
    ["へ", "he"],
    ["ほ", "ho"],
    ["ま", "ma"],
    ["み", "mi"],
    ["む", "mu"],
    ["め", "me"],
    ["も", "mo"],
    ["や", "ya"],
    ["ゆ", "yu"],
    ["よ", "yo"],
    ["ら", "ra"],
    ["り", "ri"],
    ["る", "ru"],
    ["れ", "re"],
    ["ろ", "ro"],
    ["わ", "wa"],
    ["を", "wo"],
    ["ん", "n"]
];

let matchedCards = 0;
let gameStarted = false;
let firstCard = null;
let secondCard = null;
let timer;
let timeRemaining = 120;

const cardPairs = () => {
    const pairs = [];
    let indexes = [];
    
    while ( pairs.length < 16) {
        let randIndex = Math.floor(Math.random() * cardCharacters.hiragana.length);
        if(!indexes.includes(randIndex)) {
            indexes.push(randIndex);
            pairs.push(cardCharacters.hiragana[randIndex], cardCharacters.romanji[randIndex]);
        }
    }
    return pairs.sort(() => Math.random() - 0.5); 
};


const placeCards = (pairs) => {
    
 const gameDeck = document.querySelectorAll('.card');
    
    for (let idx = 0; idx < gameDeck.length; idx++) {
        gameDeck[idx].dataset.value = pairs[idx];
        gameDeck[idx].textContent = '';
    }
};


document.getElementById('startButton'). addEventListener('click', () => {
    if (!gameStarted) {
    const pairs = cardPairs();
    placeCards(pairs);
    startTimer();
    gameStarted = true;
    }
});

const flipCard = (card) => {
    if (!gameStarted || timeRemaining === 0 || card === firstCard || card.classList.contains(`flipped`) || secondCard !== null)
     return;

    card.classList.add(`flipped`);
    card.textContent = card.dataset.value;


    if (firstCard === null) {
        firstCard = card;
    } else {
        secondCard = card;

    const firstCardValue = firstCard.dataset.value;
    const secondCardValue = secondCard.dataset.value;

    let isMatch = false;
    
    for (let idx = 0; idx < winningPairs.length; idx++) {
        if ( (winningPairs[idx][0] === firstCardValue && winningPairs[idx][1] === secondCardValue) || (winningPairs[idx][0] === secondCardValue && winningPairs[idx][1] === firstCardValue)) {
            isMatch = true;
            break;
        }
    }

    if (isMatch) {
        matchedCards++;
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetTurn();

        
    if (matchedCards === 8) {
        clearInterval(timer);
        showMessage('You Won! Great job, keep up the good work!');
    }    

    } else { 
        setTimeout(() => {
            firstCard.classList.remove(`flipped`);
            secondCard.classList.remove(`flipped`);
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetTurn();
        }, 1000);
    } 
    }
} ;

const resetTurn = () => {
    firstCard = null;
    secondCard = null;
}
 
 document.querySelector('.grid-container').addEventListener(`click`, (event) => {
    if (event.target.classList.contains(`card`)) {
        flipCard(event.target);
    }
 });



const showMessage = (message) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('game-message');
    messageDiv.textContent = message;
    document.querySelector('main').appendChild(messageDiv);
};


const startTimer = () => {
    clearInterval(timer);

    document.querySelector('.time').innerText = timeRemaining;
    timer = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining --;
            document.querySelector('.time').innerText =timeRemaining;
        } else {
            clearInterval(timer);
            showMessage('Time is up! You lost. Try again!')
        }
    }, 1000);
}; 

document.getElementById('restartButton').addEventListener('click', () => {
    matchedCards = 0;
    timeRemaining = 120;
    gameStarted = false;
    firstCard = null;
    secondCard = null;
    document.querySelector('.time').innerText = timeRemaining;

    const currentMessage = document.querySelector('.game-message');
    if (currentMessage) {
        currentMessage.remove();
    };
    
    const matchedCardsList = document.querySelectorAll('.card.matched');
    matchedCardsList.forEach(card => {
        card.classList.remove('matched');
    });

    const pairs = cardPairs();
    placeCards(pairs);
    
    const gameDeck = document.querySelectorAll('.card');
    gameDeck.forEach(card => {
        card.classList.remove('flipped');
        card.textContent = '';
    
        clearInterval(timer);
    timeRemaining = 120;
    document.querySelector('.time').innerText = timeRemaining;
    });
});

