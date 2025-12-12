const ProjectURL = "https://hcxpzqislizvixqxevnv.supabase.co";
const ProjectKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjeHB6cWlzbGl6dml4cXhldm52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MzYwNTIsImV4cCI6MjA4MDAxMjA1Mn0.U2hDQtk08WR2fdrLULypb12A-mJEowFF_re_T8sxp80";

const { createClient } = supabase;
const client = createClient(ProjectURL, ProjectKey);

let questions = [];
let currentIndex = 0;
let userAnswers = {};
let timerInterval;

// Elements
const questionText = document.getElementById("questionText");
const optA = document.getElementById("optA");
const optB = document.getElementById("optB");
const optC = document.getElementById("optC");
const optD = document.getElementById("optD");
const timerDisplay = document.getElementById("timer");

// CSS class for selected option
const selectedClass = "selected";


// Fetch questions
async function fetchQuestions() {
  const { data, error } = await client
    .from("questions")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    questionText.innerText = "Error loading questions.";
    console.error(error);
    return;
  }

  questions = data;
  showQuestion();
  startTimer(10 * 60); // 10 minutes
}


// Show question
function showQuestion() {
  if (currentIndex >= questions.length) {
    finishQuiz();
    return;
  }

  const q = questions[currentIndex];
  questionText.innerText = `Q${currentIndex + 1}: ${q.question}`;
  optA.innerText = q.option_1;
  optB.innerText = q.option_2;
  optC.innerText = q.option_3;
  optD.innerText = q.option_4;

  // Clear previous selection
  [optA, optB, optC, optD].forEach(btn => btn.classList.remove(selectedClass));
}


// Option selection
[optA, optB, optC, optD].forEach(btn => {
  btn.addEventListener("click", () => {
    [optA, optB, optC, optD].forEach(b => b.classList.remove(selectedClass));
    btn.classList.add(selectedClass);

    const q = questions[currentIndex];
    userAnswers[q.id] = btn.innerText;
  });
});


// Next Question
function nextQuestion() {
  const selected = document.querySelector(`.${selectedClass}`);
  if (!selected) {
    Swal.fire({
      icon: "warning",
      title: "Please select an option before moving on!"
    });
    return;
  }

  currentIndex++;
  showQuestion();
}


// Timer
function startTimer(duration) {
  let time = duration;
  updateTimerDisplay(time);

  timerInterval = setInterval(async () => {
    time--;
    updateTimerDisplay(time);

    // Auto Logout when time ends
    if (time <= 0) {
      clearInterval(timerInterval);
      await client.auth.signOut();
      window.location.href = "index.html";
    }
  }, 1000);
}


// Update timer UI
function updateTimerDisplay(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerDisplay.innerText = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}


// When quiz is finished
function finishQuiz() {
  // DO NOT stop timer — it must continue

  document.getElementById("quizBox").innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>You can log out now or wait for the timer to finish.</p>
    <button id="logoutBtn" class="btn btn-danger mt-3">Logout</button>
  `;

  // Manual logout button
  document.getElementById("logoutBtn").addEventListener("click", async () => {
    await client.auth.signOut();
    window.location.href = "index.html";
  });
}


// Load questions on startup
fetchQuestions();

