const cardCharacters = {
    hiragana: ["あ", "い", "お", "う", "え", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ", "ま", "み", "む", "め", "も", "や" , "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ", "を", "ん"],


    romanji: ["a", "i", "o", "u", "e", "ka", "ki", "ku", "ke", "ko", "sa", "shi", "su", "se", "so", "ta", "chi", "tsu", "te", "to", "na", "ni", "nu", "ne", "no", "ha", "hi", "fu", "he", "ho", "ma", "mi", "mu", "me", "mo", "ya" , "yu", "yo", "ra", "ri", "ru", "re", "ro", "wa", "wo", "n"],
};
// card pairs

const cardPairs = () => {
    const pairs = [];
    for(let idx = 0; idx < cardCharacters.hiragana.length; idx++) {
        pairs.push(cardCharacters.hiragana[idx], cardCharacters.romanji[idx]);
    }
    return pairs;
};
// console.log(cardPairs());

//shuffleCards??

Math.floor(Math.random() * 9 );

console.log()

//move card to grid
//flipping the cards
//buttons
//timer
let timer;
let timeRemaining = 90;

const startTimer = () => {
    timeRemaining =90;
    document.querySelector(`.time`).innerText = timeRemaining;
    timer = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining --;
            document.querySelector(`.time`).innerText =timeRemaining;
        } else {
            clearInterval(timer);
        }
    }, 1000);
}; //if clicked more than once timer speeds up 

document.getElementById('startButton').addEventListener(`click`, startTimer);

//restart
