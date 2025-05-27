// Добавьте в начало файла
document.addEventListener('DOMContentLoaded', function() {
  // Увеличиваем область клика для мобильных устройств
  const buttons = document.querySelectorAll('button, a.button');
  buttons.forEach(button => {
    button.style.minHeight = '44px'; // Минимальный рекомендуемый размер для касаний
    button.style.minWidth = '44px';
  });
  
  // Оптимизация модальных окон для мобильных
  const modalContents = document.querySelectorAll('.modal-content');
  modalContents.forEach(modal => {
    modal.style.maxHeight = '90vh';
    modal.style.overflowY = 'auto';
  });
});
// Test Questions
const questions = [
  { question: "1. What's your name?", options: ["She is Anna.", "My name is Anna.", "I name is Anna."], answer: 1 },
  { question: "2. How old ___ you?", options: ["is", "are", "do"], answer: 1 },
  { question: "3. He ___ to school every day.", options: ["go", "goes", "going"], answer: 1 },
  { question: "4. I ___ never been to London.", options: ["has", "did", "have"], answer: 2 },
  { question: "5. This is the ___ book I've ever read!", options: ["most interesting", "more interesting", "interestinger"], answer: 0 },
  { question: "6. If I ___ more money, I would travel the world.", options: ["have", "had", "will have"], answer: 1 },
  { question: "7. Which sentence is correct?", options: ["She can to play the guitar.", "She cans play the guitar.", "She can play the guitar."], answer: 2 },
  { question: "8. He is very good ___ tennis.", options: ["at", "on", "in"], answer: 0 },
  { question: "9. I'm looking forward to ___ you soon.", options: ["see", "seeing", "seen"], answer: 1 },
  { question: "10. The film was ___ than I expected.", options: ["more boring", "boringer", "most boring"], answer: 0 },
  { question: "11. He speaks English very ___.", options: ["good", "well", "nice"], answer: 1 },
  { question: "12. I don't have ___ apples left.", options: ["some", "any", "a"], answer: 1 },
  { question: "13. What does 'rarely' mean?", options: ["very often", "almost never", "every day"], answer: 1 },
  { question: "14. Which word is an antonym of 'happy'?", options: ["excited", "sad", "joyful"], answer: 1 },
  { question: "15. Complete: 'Would you mind ___ the window?'", options: ["to open", "opening", "open"], answer: 1 },
  { question: "16. Despite the heavy rain, the match continued as planned.", options: ["The match was delayed.", "The rain stopped the match.", "The match went on in the rain.", "The match was cancelled."], answer: 2 }
];

// Test Variables
let currentQuestion = 0;
const answers = [];
const modal = document.getElementById("testModal");
const resultModal = document.getElementById("resultModal");
const questionContainer = document.getElementById("questionContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const checkBtn = document.getElementById("checkBtn");
const finalResult = document.getElementById("finalResult");

// Render Question Function
function renderQuestion(index) {
  const q = questions[index];
  let html = `<p>${q.question}</p>`;
  q.options.forEach((opt, i) => {
    html += `<label><input type="radio" name="q${index}" value="${i}" ${answers[index] === i ? 'checked' : ''}> ${opt}</label><br>`;
  });
  questionContainer.innerHTML = html;
  
  // Update button states
  prevBtn.disabled = index === 0;
  nextBtn.style.display = index === questions.length - 1 ? "none" : "inline-block";
  checkBtn.style.display = index === questions.length - 1 ? "inline-block" : "none";
}

// Check Results Function
function checkResult() {
  let correct = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.answer) correct++;
  });
  
  let level = "";
  if (correct <= 5) level = "Beginner";
  else if (correct <= 10) level = "Intermediate";
  else if (correct <= 13) level = "Upper-Intermediate";
  else level = "Advanced";
  
  finalResult.textContent = `Ваш уровень английского согласно тесту: ${level}`;
  modal.style.display = "none";
  resultModal.style.display = "flex";
}

// Reset Test Function
function resetTest() {
  currentQuestion = 0;
  answers.length = 0;
  questionContainer.innerHTML = "";
  prevBtn.disabled = true;
  nextBtn.style.display = "inline-block";
  checkBtn.style.display = "none";
}

// Event Listeners
document.getElementById("startTestBtn").addEventListener("click", () => {
  resetTest();
  modal.style.display = "flex";
  renderQuestion(currentQuestion);
});

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
  if (selected) answers[currentQuestion] = parseInt(selected.value);
  
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion(currentQuestion);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion(currentQuestion);
  }
});

checkBtn.addEventListener("click", checkResult);

// Close Modal Buttons
document.querySelectorAll(".closeModal").forEach(btn => {
  btn.addEventListener("click", () => {
    modal.style.display = "none";
    resultModal.style.display = "none";
    resetTest();
  });
});

// Submit Result
document.getElementById("submitBtn").addEventListener("click", () => {
  const name = document.getElementById("username").value.trim();
  if (name) {
    alert(`Результат отправлен! Спасибо, ${name}.`);
    resultModal.style.display = "none";
    resetTest();
  } else {
    alert("Пожалуйста, введите имя.");
  }
});

// Review Form Submission
document.querySelector(".review-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = this.name.value.trim();
  const comment = this.comment.value.trim();
  
  if (name && comment) {
    alert("Спасибо за ваш отзыв!");
    this.reset();
  } else {
    alert("Пожалуйста, заполните все поля.");
  }
});
// Burger Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('header nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});