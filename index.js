const levels = [
  "Explore the wonders of cyberspace with QuantumType, where your keyboard becomes a gateway to endless possibilities! Embark on a journey of keystrokes and characters, navigating through the digital realm with the precision of a seasoned typist.",
  "Unlock the secrets of efficient typing as you traverse the virtual landscape, honing your skills amidst the ever-changing currents of technology.",
  "Challenge yourself with enigmatic exercises that unravel the mysteries of the keyboard, revealing new dimensions of speed and accuracy.",
  "Join forces with fellow typists from across the globe, engaging in epic typing battles and forging connections in the digital typography arena.",
  "Let the algorithmic dance of QuantumType adapt to your every keystroke, creating a personalized symphony of learning tailored to your unique rhythm.",
  "Earn badges as tokens of your conquests and achievements, showcasing your prowess as a keyboard virtuoso in the vast expanse of the internet.",
  "Delight in the visual feast of our interface, where colors blend and harmonize to create an aesthetically pleasing environment for your typing odyssey.",
  "Uncover the hidden shortcuts and secret passages that lead to efficiency nirvana, propelling you into the elite realm of digital productivity.",
  "Embark on your QuantumType adventure today, where every keystroke propels you further into the frontier of typing excellence!",
];

let principalText = levels[0];

const keyboard = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'delete'],
  ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['caps', 'q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'ù', 'return'],
  ['shift ⇧', 'w', 'x', 'c', 'v', 'b', 'n', ',', ';', ':', '='],
];


const keyboardContainer = $('.keyboard');
const mainText = $('.mainText');
const cursor = $('.cursor');
const outputText = [];

let endGame = false;

let currentLevel = 0;
let currentIndex = 0;
let timer = 0;
let totalLetters = principalText.length;
let totalGoodLetters = 0;
let totalErrors = 0;
let rate = 0;

const levelBox = $('.level');
levelBox.text(currentLevel + 1);
const timerBox = $('.timer');
const totalLetterBox = $('.letters');
totalLetterBox.text(totalLetters);
const totalErrorsBox = $('.errors');
totalErrorsBox.text(totalErrors);
const rateBox = $('.rate');
rateBox.text(rate);

const second = 1,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24;

function setText(){
  mainText.empty().append(
    principalText
    .split("")
    .map((el,i)=>`<span id="char${i}" style="text-transform: none;">${el}</span>`)
  );
}

function drawKeyboard(){
  keyboard.forEach((row)=>{
    keyboardContainer.append(`<div class='row'>${row.map((col)=>{
      return `<div class='col' id="col${col.toUpperCase().charCodeAt(0)}">${col}</div>`
    }).join("")}</div>`)
  })

}

function updateCursorPosition() {
  const currentSpan = $(`#char${currentIndex}`);
  cursor.css({
    left: currentSpan.position().left + "px",
    top: currentSpan.position().top + 20 + "px",
  });
}

function setEndGame(){
  endGame = true;
  if(currentLevel<levels.length - 1){
    $('.container').addClass("container-opacity");
    $('#nextLevel').text("NEXT LEVEL");
    $('#nextLevel').addClass("nextLevel");
    $('#nextLevel').css("visibility","visible");
  }
}

function resetParams(){
  endGame= false ;
  currentIndex = 0;
  timer=0;
  totalGoodLetters = 0;
  totalErrors = 0;
  rate = 0;
  totalLetters = principalText.length;
  totalLetterBox.text(totalLetters);
  totalErrorsBox.text(totalErrors);
  rateBox.text(rate);

  $('#nextLevel').removeClass("nextLevel");
  $('#nextLevel').css("visibility","hidden");
}

function goToNextLevel(){
  if (endGame && currentLevel < levels.length){
    currentLevel++;
    principalText = levels[currentLevel];

    if (currentLevel<levels.length - 1) {
      levelBox.text(currentLevel + 1);
    }else{
      levelBox.text("FINAL LEVEL");
    }

    setText()
    resetParams();
    $('.container').removeClass("container-opacity");
  }else{
    return false;
  }
}

setText();
drawKeyboard();


$('#nextLevel').click(function(){
  if(currentLevel<levels.length - 1){
    goToNextLevel(); 
  }
});
document.addEventListener("keydown",(event)=>{
  const currentCol = $(`#col${event.keyCode}`);
  const currentChar = principalText[currentIndex];
  const currentSpan = $(`#char${currentIndex}`);

  currentCol.addClass("typed");

  console.log(event.keyCode)
  if(currentChar==event.key){
    currentIndex++;
    $(`#char${currentIndex - 1}`).removeClass("cursorPosition");
    $(`#char${currentIndex}`).addClass("cursorPosition");
    totalGoodLetters++;
  }else if(event.keyCode==16){}
  else{
    currentSpan.addClass("incorrect");
    totalErrors++;
  }

  if (currentIndex < principalText.length) {
    updateCursorPosition();
  }else{
    setEndGame();
  }
  event.preventDefault()
})

setInterval(()=>{
  if (!endGame) {
    timer++;
    let hours = Math.floor(timer / hour);
    let minutes = Math.floor((timer % (hour)) / (minute));
    let seconds = Math.floor((timer % (minute)) / second);

    if (hours >= 1) {
      timreBox.text(hours + "h" + minutes + "min" + seconds + "s");
    }else if (minutes >= 1) {
      timerBox.text(minutes + "min" + seconds + "s");
    }else{
      timerBox.text(timer + "s");
    }

    totalErrorsBox.text(totalErrors);
    if(totalGoodLetters>0)
      rateBox.text(Math.round(timer / totalGoodLetters).toFixed(2));
  }
},1000);

setInterval(()=>{
  let elems = document.querySelectorAll(".typed");
  elems.forEach((el) => {
      el.classList.remove("typed");
  });
},200);