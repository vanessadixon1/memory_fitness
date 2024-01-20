const gameContainer = document.getElementById("game");
const startGame = document.querySelector("#startGame button");
const removeText = document.querySelector("#startGame");
const timeLeft = document.querySelector("span");

let isActive;
let score = 0;
let gameOver;
let colorDivs;
let clickedColors = [];

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

startGame.addEventListener('click', function() {
  removeText.remove();
  let time = 30;
  timeLeft.innerText = time;
  
  let timer = setInterval(() => {
    if(time <= 0) {
      clearInterval(timer);
      alert(`Game Over! Your Score: ${score}`);
      isActive = false;
      toggleEventOnAndOff(isActive,colorDivs);

      if(!localStorage.getItem("gameScore")) {
        localStorage.setItem('gameScore', JSON.stringify(score));
      }else {
        let storedScore = Number(localStorage.getItem("gameScore"));
        if(score > storedScore) {
          localStorage.setItem('gameScore', JSON.stringify(score));
        }
      }
      
    }
    timeLeft.innerText = time;
    time--;

  },1000)

  function shuffle(array) {
    let counter = array.length;

    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  }

  let shuffledColors = shuffle(COLORS);

  function createDivsForColors(colorArray) {
    for (let color of colorArray) {
      const newDiv = document.createElement("div");

      newDiv.classList.add(color, "colors");
    
      newDiv.addEventListener("click", handleCardClick);

      gameContainer.append(newDiv);
    }
  }

  function handleCardClick(event) {
    let color = event.target.className.trim();
    colorDivs = document.querySelectorAll(".colors");
    
    event.target.style.backgroundColor = color.split(" ")[0];
    clickedColors.push(event.target)
    event.target.removeEventListener('click',handleCardClick);

    if(clickedColors.length === 2) {
      isActive = false;

      toggleEventOnAndOff(isActive, colorDivs);

      let matched = clickedColors[0].className === clickedColors[1].className
      if(!matched) {
        setTimeout(() => {
          for(let i of clickedColors) {
            i.style.backgroundColor = "white";
          }
          isActive = true;
          resetGame(isActive, colorDivs);
        },1000);
      } else {
        setTimeout(() => {
          alert("Matched");
          score++;
        },100);
        isActive = true;
        resetGame(isActive,colorDivs);
      }
    }

  }

  createDivsForColors(shuffledColors);

  function resetGame(isActive, colorDivs) {
      countClick = 0;
      clickedColors = [];
      toggleEventOnAndOff(isActive, colorDivs);
  }

  function toggleEventOnAndOff(isActive, colorDivs) {
    if(!isActive) {
      for(let i of colorDivs) {
        i.removeEventListener("click",handleCardClick)
      }
    } else {
      for(let i of colorDivs) {
        i.addEventListener("click",handleCardClick)
      }
    }
  }

})