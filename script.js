const gameContainer = document.getElementById("game");
let clicked = 2;
let pick1 = "";
let target1 = "";
let divCount;
let arr = [];
let score = 2;
let timer = 0;
let timerId;


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

let replayButton = document.getElementById("replayButton");
replayButton.classList.add("display");

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

    newDiv.classList.add(color);

    newDiv.addEventListener("click", handleCardClick);

    gameContainer.append(newDiv);

    divCount = document.querySelectorAll("#game div");
  }
}

function handleCardClick(event) {

  if(clicked > 0 && score < 12) {
      event.target.style.backgroundColor = event.target.className;
       if(clicked === 2) {
        pick1 = event.target;
      }else {
        if(pick1.className !== event.target.className) {
        
          setTimeout(() => {
            pick1.style.backgroundColor = "";
            event.target.style.backgroundColor = "";
            cleanup();
          },100);
          return;
      }else if(pick1.className === event.target.className) {
        pick1.removeEventListener("click", handleCardClick);
        event.target.removeEventListener("click", handleCardClick);
        score+=2;
        cleanup();
        return;
      }
    }
    clicked--;
  }
  console.log(score)
}

function cleanup() {
  clicked = 2;
  pick1 = "";
  
}

function startGame() {
  let value;
  let answerObj;
  let idAndNameVal;
  let h2 = document.createElement("h3");
  h2.innerText = "Would you like to play? ";
  let yesInput = document.createElement("input");
  let noInput = document.createElement("input");
  const yesLabel = createNewLabel("Yes");
  const noLabel = createNewLabel("No");
  let innerDiv = document.createElement("div");

  if(yesInput) {
    value = "Yes";
    idAndNameVal = "yesAnswer";
  }else {
    value = "No";
    idAndNameVal = "noAnswer";
  }
  
  answerObj = {type: "checkbox", id:[idAndNameVal], name:[idAndNameVal], value: [value]};

  setAttributes(yesInput, answerObj);
  setAttributes(noInput, answerObj);

  innerDiv.setAttribute("id","innerDiv")
  innerDiv.append(h2,yesInput, yesLabel, noInput, noLabel);
 
  gameContainer.append(innerDiv);

}

function setAttributes(element, attributes) {
  for(let attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute])
  }
}

//create new Label
function createNewLabel(value) {
  let label = document.createElement("label");
  label.innerText = value;
  setAttributes(label,{for: value})
  return label;
}

startGame();

const input = document.getElementById("yesAnswer");

let innerDiv = document.getElementById("innerDiv");

let h2 = document.createElement("h2");

input.addEventListener("click", (evt) => {
  
  let clockTime = document.querySelector(".clock_time");
  let checked = evt.target.checked;
  let newMsg;
    console.dir(checked)
    if(checked) {
      innerDiv.remove();
      h2.innerText = "Game Loading..."
      gameContainer.append(h2);

      timerId = setInterval(() => {
        clockTime.innerText = timer +=1;
       
        if(timer === 15 && score < 10) {
          replayButton.classList.remove("display");
          newMsg = `Your time has expired!\nScore:`;
          clearTimer(timerId, newMsg);
        }else if(score === 12) {
          replayButton.classList.remove("display");
          newMsg = `Congratulations You Won!\nScore:`;
          clearTimer(timerId,newMsg);
        }

      },1000);

      setTimeout(() => {
        h2.remove();
        createDivsForColors(shuffledColors);
        gameContainer.append(createNewButton("Restart"));
        
        let btn = document.getElementById('Restart');
        btn.addEventListener("click", (evt) => {
          restartOrEndGame();
        })

        let endButton = document.getElementById("endGame");

        endButton.addEventListener("click",(evt) => {
          clearTimer(timerId, "Game Over!");
          replayButton.classList.remove("display");
        });

      },800);
    }
});


function restartOrEndGame() {
  let restartAnswer = prompt("Would you like to Restart the Game? Type 'Restart'");

  if(restartAnswer.toLowerCase() === "restart" && (score < 12)) {
    let answer = prompt(`are you sure you would like to ${restartAnswer} the game? Type 'Yes or No'`);

    if(answer.toLowerCase() === "yes") {
      let currScore = score === 2 ? 0 : score;
      clearInterval(timerId);
      alert(`Your final score is: ${currScore}`);
      setTimeout(() => {
        location.reload();
      },300);
    }else if(answer.toLowerCase() == "no") {
      alert(`Game Continued...`);
    }else {
      alert("You can only enter Yes or No");
    }
  }
} 

replayButton.addEventListener("click",(evt) => {
  location.reload();
})

function createNewButton(value) {
  let button;
  button = document.createElement("button");
  button.innerText = value;
  button.setAttribute("id", value);
  return button;
}

function clearTimer(timerId,msg) {
  clearInterval(timerId);
  gameContainer.classList.add("display");
  h2.innerText = `${msg} ${score === 2 ? 0: score}`;
  document.body.append(h2);
}