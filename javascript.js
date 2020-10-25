// this is the questions, possible responses and correct answers
let questions = [
    { 
      q: "What does HTML stand for?",
      choices: [
          "Home tool meta language",
          "Hyper text markup language",
          "Hyper touch marking language",
          "Hot touch markup love"
      ],
      a: "Hyper text markup language"
    },
    {
      q: "Which tag creates a list WITHOUT numbers",
      choices: [
          "ol",
          "dl",
          "ul",
          "gl"
      ],
      a: "ul"
    },
    {
      q: "Which tag creates a list WITH numbers",
      choices: [
          "ol",
          "dl",
          "ul",
          "gl"
      ],
      a: "ol"
    },
    {
      q: "Which attribute is the alternate text for an image",
      choices: [
          "src",
          "alt",
          "href",
          "a"
      ],
      a: "alt"
    },

    {
      q: "Which is not a semantic HTML tag",
      choices: [
          "<aside>",
          "<section>",
          "<footer>",
          "<body>"
      ],
      a: "<body>"
    },
];

// variables needed for quiz and DOM
let currentQArray = 0;
let time = questions.length * 20;
let timeId;
let questionsEl = document.getElementById("questions");
let timeEl = document.getElementById("time");
let initialsEl = document.getElementById("initials");
let choicesEl = document.getElementById("choices");
let beginBtn = document.getElementById("begin");
let submitBtn = document.getElementById("submit");

//this function start the process of prompting questions by removing the start page and replacing with the removed questions, also initiates the clock
function begin() {
    let startScreen = document.getElementById("intro-screen");
    startScreen.setAttribute("class", "remove");
    questionsEl.removeAttribute("class");
    timeId = setInterval(clock, 1000);
    timeEl.textContent = time;
    promptQuestion();
}

// this function prompts the questions and creates possible answers as buttons
function promptQuestion() {
  let currentQuestion = questions[currentQArray];
  let promptEl = document.getElementById("prompt");
  promptEl.textContent = currentQuestion.q;
  choicesEl.innerHTML = "";
  currentQuestion.choices.forEach(function(choice, i) {
    let responseBtns = document.createElement("button");
    responseBtns.setAttribute("class", "choice");
    responseBtns.setAttribute("value", choice);
    responseBtns.textContent = i + 1 + ". " + choice;
    responseBtns.onclick = promptSelect;
    choicesEl.appendChild(responseBtns);
  });
}

//this function determines if the button selected as a response to the prompt is correct, if not it removes 10 seconds from the time, it also advances to the next question or initiate the end step if out of questions
function promptSelect() {
    if (this.value !== questions[currentQArray].a) {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
      timeEl.textContent = time;
    }
    currentQArray++;
    if (currentQArray === questions.length) {
      complete();
    } else {
      promptQuestion();
    }
}

//this function is the end step, it ends the time and accepts it as results
function complete() {
  clearInterval(timeId);
  let resultsEl = document.getElementById("results");
  resultsEl.removeAttribute("class");
  let finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;
  questionsEl.setAttribute("class", "remove");
}

//this function creates the clock and checks if it is out of time
function clock() {
  time--;
  timeEl.textContent = time;
  if (time <= 0) {
    complete();
  }
}

//this function logs the score and holds them in local storage
function logScore() {
  let initials = initialsEl.value.trim();
  if (initials !== "") {
    let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    let newScore = {
      score: time,
      initials: initials
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "highscore.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    logScore();
  }
}

//these power the tie the click of the button to its respective function
submitBtn.onclick = logScore;
beginBtn.onclick = begin;
initialsEl.onkeyup = checkForEnter;