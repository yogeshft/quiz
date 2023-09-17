const questions = [
  {
    question: "What is javascript?",
    answers: [
      {
        text: "programming language",
        correct: false
      },
      {
        text: "scripting language",
        correct: false
      },
      {
        text: "server side language",
        correct: false
      },
      {
        text: "all of the above",
        correct: true
      }
    ]
  },
  {
    question: "What is html?",
    answers: [
      {
        text: "programming language",
        correct: false
      },
      {
        text: "scripting language",
        correct: false
      },
      {
        text: "markup language",
        correct: true
      },
      {
        text: "all of the above",
        correct: false
      }
    ]
  },
  {
    question: "What is css?",
    answers: [
      {
        text: "programming language",
        correct: false
      },
      {
        text: "scripting language",
        correct: false
      },
      {
        text: "markup language",
        correct: false
      },
      {
        text: "styling language",
        correct: true
      }
    ]
  }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex]; //current question
  let questionNumber = currentQuestionIndex + 1; //question number
  questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  // Change the background color based on correctness
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  // Disable all answer buttons to prevent further clicks
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.disabled = true;
  });

  // Display the "Next" button
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
