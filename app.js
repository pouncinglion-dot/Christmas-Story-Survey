// ----------------------------------------------------------------------------
// Set this to your deployed Google Apps Script Web App URL (see README.md).
// ----------------------------------------------------------------------------
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbykKouEY3W5JJwrjUVv7p-PHNJw_YGb6PUGw8qYLS_U7fcCVyegFI8eXaG2JIUW2uiFcg/exec";

const NUM_RANDOM_QUESTIONS = 4;

// URL query params to capture and record with each submission, e.g.
// https://your-site/?Group=TeamA&Date=2025-12-24&City-Country=Nashville-USA
const URL_PARAM_NAMES = ["Group", "Date", "City-Country"];

function getUrlParams() {
  const search = new URLSearchParams(window.location.search);
  const result = {};
  URL_PARAM_NAMES.forEach((name) => {
    let value = "";
    for (const [key, val] of search.entries()) {
      if (key.toLowerCase() === name.toLowerCase()) {
        value = val;
        break;
      }
    }
    result[name] = value;
  });
  return result;
}

function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleQuestionOptions(q) {
  if (!q.options || q.type === "scale") return q;
  return { ...q, options: shuffle(q.options) };
}

function pickQuestionsForThisVisit() {
  const randomPicks = shuffle(QUESTION_BANK).slice(0, NUM_RANDOM_QUESTIONS);
  const selected = [STATIC_QUESTION, ...randomPicks];
  return selected.map(shuffleQuestionOptions);
}

function normalize(str) {
  return String(str || "").trim().toLowerCase().replace(/\s+/g, " ");
}

function setQuestionLabelContent(label, q, index) {
  const prefix = `${index + 1}. `;
  if (q.questionHtml) {
    label.innerHTML = prefix + q.questionHtml;
  } else {
    label.textContent = prefix + q.question;
  }
}

function renderQuestion(q, index) {
  const card = document.createElement("div");
  card.className = "question-card";
  card.dataset.qid = q.id;
  card.dataset.qtype = q.type;

  const label = document.createElement("p");
  label.className = "q-text";
  setQuestionLabelContent(label, q, index);
  card.appendChild(label);

  if (q.type === "short-text") {
    const input = document.createElement("input");
    input.type = "text";
    input.name = q.id;
    input.autocomplete = "off";
    card.appendChild(input);
  } else if (q.type === "scale" || q.type === "multiple-choice") {
    q.options.forEach((opt) => {
      card.appendChild(makeRadioRow(q.id, opt));
    });
  } else if (q.type === "true-false") {
    ["True", "False"].forEach((opt) => {
      card.appendChild(makeRadioRow(q.id, opt));
    });
  } else if (q.type === "checkbox") {
    q.options.forEach((opt) => {
      card.appendChild(makeCheckboxRow(q.id, opt));
    });
  }

  const err = document.createElement("div");
  err.className = "field-error";
  err.textContent = "Please answer this question.";
  card.appendChild(err);

  return card;
}

function makeRadioRow(name, value) {
  const row = document.createElement("label");
  row.className = "option-row";
  const input = document.createElement("input");
  input.type = "radio";
  input.name = name;
  input.value = value;
  row.appendChild(input);
  row.appendChild(document.createTextNode(value));
  return row;
}

function makeCheckboxRow(name, value) {
  const row = document.createElement("label");
  row.className = "option-row";
  const input = document.createElement("input");
  input.type = "checkbox";
  input.name = name;
  input.value = value;
  row.appendChild(input);
  row.appendChild(document.createTextNode(value));
  return row;
}

function getAnswerForQuestion(q) {
  if (q.type === "short-text") {
    const input = document.querySelector(`input[name="${q.id}"]`);
    const val = input.value.trim();
    return val === "" ? null : val;
  }
  if (q.type === "checkbox") {
    const checked = document.querySelectorAll(`input[name="${q.id}"]:checked`);
    return checked.length === 0 ? null : Array.from(checked).map((c) => c.value);
  }
  // scale, multiple-choice, true-false
  const checked = document.querySelector(`input[name="${q.id}"]:checked`);
  return checked ? checked.value : null;
}

function gradeAnswer(q, userAnswer) {
  if (q.type === "scale") {
    return { correctAnswer: "", isCorrect: "" };
  }
  if (q.type === "short-text") {
    const normalizedAnswer = normalize(userAnswer);
    const isCorrect = q.acceptedAnswers.some((a) => normalize(a) === normalizedAnswer);
    return { correctAnswer: q.acceptedAnswers[0], isCorrect };
  }
  if (q.type === "checkbox") {
    const selected = (userAnswer || []).slice().sort();
    const correct = q.correctAnswers.slice().sort();
    const isCorrect = selected.length === correct.length && selected.every((v, i) => v === correct[i]);
    return { correctAnswer: q.correctAnswers.join("; "), isCorrect };
  }
  // multiple-choice, true-false
  return { correctAnswer: q.correctAnswer, isCorrect: userAnswer === q.correctAnswer };
}

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function scoreMessage(correct, total) {
  const pct = correct / total;
  if (pct === 1) return "Perfect score! You really know the Christmas story! 🌟";
  if (pct >= 0.75) return "Great job — you know your Nativity well! 🎉";
  if (pct >= 0.5) return "Nice work! A solid showing. 🎄";
  return "Thanks for playing! Maybe give Luke & Matthew another read. 📖";
}

function makeResultChip(text, { isSelected, isCorrectOption }) {
  const chip = document.createElement("span");
  chip.className = "result-chip";
  if (isSelected && isCorrectOption) chip.classList.add("chip-correct");
  else if (isSelected && !isCorrectOption) chip.classList.add("chip-wrong");
  else if (!isSelected && isCorrectOption) chip.classList.add("chip-correct-unselected");
  chip.textContent = text;
  return chip;
}

function renderResultQuestion(record, index) {
  const { q, userAnswer, correctAnswer, isCorrect } = record;
  const card = document.createElement("div");
  card.className = "question-card result-card";

  const labelRow = document.createElement("div");
  labelRow.className = "result-label-row";

  const label = document.createElement("p");
  label.className = "q-text";
  setQuestionLabelContent(label, q, index);
  labelRow.appendChild(label);

  const badge = document.createElement("span");
  badge.className = "status-badge " + (isCorrect ? "badge-correct" : "badge-wrong");
  badge.textContent = isCorrect ? "✅ Correct" : "❌ Incorrect";
  labelRow.appendChild(badge);

  card.appendChild(labelRow);

  const row = document.createElement("div");
  row.className = "result-chip-row";

  if (q.type === "short-text") {
    row.appendChild(makeResultChip(`Your answer: ${userAnswer}`, { isSelected: true, isCorrectOption: isCorrect }));
    if (!isCorrect) {
      row.appendChild(makeResultChip(`Correct answer: ${correctAnswer}`, { isSelected: false, isCorrectOption: true }));
    }
  } else {
    const options = q.type === "true-false" ? ["True", "False"] : q.options;
    const correctSet = q.type === "checkbox" ? q.correctAnswers : [q.correctAnswer];
    const selectedSet = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
    options.forEach((opt) => {
      row.appendChild(makeResultChip(opt, {
        isSelected: selectedSet.includes(opt),
        isCorrectOption: correctSet.includes(opt)
      }));
    });
  }

  card.appendChild(row);

  if (q.type === "checkbox" && !isCorrect) {
    const note = document.createElement("p");
    note.className = "checkbox-note";
    note.textContent = `You needed to select all of: ${q.correctAnswers.join(", ")}`;
    card.appendChild(note);
  }

  if (q.reference) {
    const refLine = document.createElement("p");
    refLine.className = "reference-line";
    refLine.textContent = `Correct Answer Reference: ${q.reference}`;
    card.appendChild(refLine);
  }

  return card;
}

function renderResults(records) {
  const bankRecords = records.slice(1); // exclude the static question
  const correctCount = bankRecords.filter((r) => r.isCorrect === true).length;
  const total = bankRecords.length;

  const container = document.getElementById("thank-you");
  container.innerHTML = "";

  const heading = document.createElement("h2");
  heading.textContent = "🎁 Here's how you did!";
  container.appendChild(heading);

  bankRecords.forEach((record, i) => container.appendChild(renderResultQuestion(record, i)));

  const scoreCard = document.createElement("div");
  scoreCard.className = "score-card";

  const scoreNumber = document.createElement("p");
  scoreNumber.className = "score-number";
  scoreNumber.textContent = `${correctCount} / ${total}`;
  scoreCard.appendChild(scoreNumber);

  const scoreMsg = document.createElement("p");
  scoreMsg.className = "score-message";
  scoreMsg.textContent = scoreMessage(correctCount, total);
  scoreCard.appendChild(scoreMsg);

  container.appendChild(scoreCard);

  const footer = document.createElement("div");
  footer.className = "results-footer";

  const thanksLine = document.createElement("p");
  thanksLine.textContent = "Thanks for your response. Refresh to take another quiz.";
  footer.appendChild(thanksLine);

  const copyrightLine = document.createElement("p");
  copyrightLine.className = "copyright-line";
  copyrightLine.textContent = "© 2026 Brian A. Edwards. All rights reserved.";
  footer.appendChild(copyrightLine);

  container.appendChild(footer);
}

document.addEventListener("DOMContentLoaded", () => {
  const questions = pickQuestionsForThisVisit();
  const container = document.getElementById("questions");
  questions.forEach((q, i) => container.appendChild(renderQuestion(q, i)));

  const form = document.getElementById("quiz-form");
  const submitBtn = document.getElementById("submit-btn");
  const errorBanner = document.getElementById("error-banner");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorBanner.hidden = true;

    // Validate every question has an answer.
    let firstInvalidCard = null;
    document.querySelectorAll(".question-card").forEach((card) => {
      const err = card.querySelector(".field-error");
      err.style.display = "none";
    });

    const answers = questions.map((q) => {
      const userAnswer = getAnswerForQuestion(q);
      return { q, userAnswer };
    });

    answers.forEach(({ q, userAnswer }) => {
      const isEmpty = userAnswer === null || (Array.isArray(userAnswer) && userAnswer.length === 0);
      if (isEmpty) {
        const card = document.querySelector(`.question-card[data-qid="${q.id}"]`);
        card.querySelector(".field-error").style.display = "block";
        if (!firstInvalidCard) firstInvalidCard = card;
      }
    });

    if (firstInvalidCard) {
      firstInvalidCard.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const gradedRecords = answers.map(({ q, userAnswer }) => {
      const { correctAnswer, isCorrect } = gradeAnswer(q, userAnswer);
      return { q, userAnswer, correctAnswer, isCorrect };
    });

    const entries = gradedRecords.map(({ q, userAnswer, correctAnswer, isCorrect }) => ({
      questionId: q.id,
      questionType: q.type,
      questionText: q.question,
      userAnswer: Array.isArray(userAnswer) ? userAnswer.join("; ") : userAnswer,
      correctAnswer,
      isCorrect
    }));

    const payload = {
      submissionId: uuid(),
      urlParams: getUrlParams(),
      entries
    };

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";

    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      renderResults(gradedRecords);
      form.hidden = true;
      document.getElementById("thank-you").hidden = false;
    } catch (err) {
      errorBanner.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    }
  });
});
