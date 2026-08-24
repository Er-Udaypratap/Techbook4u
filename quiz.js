/* ============================================================
   techbook4u — quiz.js
   Generic quiz engine used by every practice page.
   Expects markup produced by the quiz page template:
   - .quiz-question blocks, each with data-correct="B" etc.
   - input[type=radio] name="qN"
   - #quizForm, #submitQuizBtn, #quizResult, #scoreText, #quizProgressFill
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var quizForm = document.getElementById('quizForm');
  if (!quizForm) return;

  var questions = quizForm.querySelectorAll('.quiz-question');
  var progressFill = document.getElementById('quizProgressFill');
  var progressText = document.getElementById('quizProgressText');
  var submitBtn = document.getElementById('submitQuizBtn');
  var resultBox = document.getElementById('quizResult');
  var scoreText = document.getElementById('scoreText');
  var scoreSub = document.getElementById('scoreSub');

  var total = questions.length;

  function countAnswered() {
    var answered = 0;
    questions.forEach(function (q) {
      if (q.querySelector('input[type="radio"]:checked')) answered++;
    });
    return answered;
  }

  function updateProgress() {
    var answered = countAnswered();
    var pct = total ? Math.round((answered / total) * 100) : 0;
    if (progressFill) progressFill.style.width = pct + '%';
    if (progressText) progressText.textContent = answered + ' / ' + total + ' answered';
  }

  quizForm.addEventListener('change', updateProgress);
  updateProgress();

  quizForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var answered = countAnswered();
    if (answered < total) {
      var ok = window.confirm('You have only answered ' + answered + ' of ' + total + ' questions. Submit anyway?');
      if (!ok) return;
    }

    var score = 0;

    questions.forEach(function (q) {
      var correctValue = q.getAttribute('data-correct');
      var selected = q.querySelector('input[type="radio"]:checked');
      var labels = q.querySelectorAll('.quiz-options label');

      labels.forEach(function (label) {
        var input = label.querySelector('input[type="radio"]');
        label.classList.remove('correct-answer', 'wrong-answer');
        if (input.value === correctValue) {
          label.classList.add('correct-answer');
        } else if (selected && input === selected && input.value !== correctValue) {
          label.classList.add('wrong-answer');
        }
        input.disabled = true;
      });

      var explanation = q.querySelector('.quiz-explanation');
      if (explanation) explanation.classList.add('show');

      if (selected && selected.value === correctValue) score++;
    });

    var percent = total ? Math.round((score / total) * 100) : 0;

    if (scoreText) scoreText.textContent = score + ' / ' + total;
    if (scoreSub) {
      var verdict = percent >= 80 ? 'Excellent work! \uD83C\uDF89' : percent >= 50 ? 'Good effort — keep practicing!' : 'Keep practicing, you will get there!';
      scoreSub.textContent = percent + '% correct — ' + verdict;
    }
    if (resultBox) {
      resultBox.classList.add('show');
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (submitBtn) submitBtn.disabled = true;
  });
});
