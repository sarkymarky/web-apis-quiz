const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
let shuffledQuestions, currentQuestionIndex;
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});
document.body.style.backgroundImage = "url('https://tenor.com/view/heart-gif-12057137833421676440')";
function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === "true");
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}
// 15-second countdown timer
let count = 15;
const interval = setInterval(function () {
  document.getElementById('count').innerHTML = count;
  count--;
  if (count === 0) {
    clearInterval(interval);
    document.getElementById('count').innerHTML = 'Done';
    alert("You're out of time!");
  }
}, 1000);
// ✅ Fixed questions array
const questions = [
  {
    question: "Would you be my Valentine?",
    answers: [
      { text: "Yes 💕", correct: true },
      { text: "No 💔", correct: false }
    ]
  },
  {
    question: "Are you sure?",
    answers: [
      { text: "Totally sure 💖", correct: true },
      { text: "Ehh... maybe 😅", correct: false },
      { text: "Not really 😬", correct: false }
    ]
  },
  {
    question: "Are you suuuure suuuuuure?",
    answers: [
      { text: "Yes, 100% sure 💘", correct: true },
      { text: "I guess so 🤔", correct: false },
      { text: "Waaay too sure 😂", correct: false }
    ]
  }
];