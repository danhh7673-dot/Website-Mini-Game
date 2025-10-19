let currentSlide = 0;
function goToSlide(n) {
  const slider = document.getElementById("slider");
  currentSlide = n;
  slider.style.transform = `translateX(-${n * 100}vw)`;
}

// Âm thanh phản hồi
function playSound(correct = true) {
  const el = document.getElementById(correct ? "correctSound" : "wrongSound");
  if (el) {
    el.pause();
    el.currentTime = 0;
    el.play().catch(() => {}); // tránh lỗi khi chưa được người dùng tương tác
  }
}

// --------- Đoán số ----------
let random1 = Math.floor(Math.random() * 10) + 1;
let random2 = Math.floor(Math.random() * 20) + 1;

function checkGuess(num) {
  const input = document.getElementById(`guess${num}`).value;
  const result = document.getElementById(`result${num}`);
  const target = num === 1 ? random1 : random2;

  if (input == target) {
    result.textContent = "🎉 Bạn đã đúng!";
    playSound(true);
    if (num === 1) random1 = Math.floor(Math.random() * 10) + 1;
    if (num === 2) random2 = Math.floor(Math.random() * 20) + 1;
  } else {
    result.textContent = "❌ Sai rồi, thử lại!";
    playSound(false);
  }
}

function guessEvenOdd(isEven) {
  const num = Math.floor(Math.random() * 10) + 1;
  const correct = (num % 2 === 0 && isEven) || (num % 2 !== 0 && !isEven);
  document.getElementById("result3").textContent =
    correct ? "✅ Đúng rồi!" : `❌ Sai, số là ${num}`;
  playSound(correct);
}

// --------- Đoán số tốc độ ----------
function startSpeedGuess() {
  const result = document.getElementById("result4");
  const base = Math.floor(Math.random() * 98) + 1;
  const pair = [base, base + 1];
  const correctAnswer = pair[Math.floor(Math.random() * 2)];
  const guess = prompt(`Giữa hai số gần nhau (${pair[0]} và ${pair[1]}), bạn chọn số nào?`);
  if (!guess) return (result.textContent = "Bạn đã hủy lượt đoán.");
  if (guess == correctAnswer) {
    result.textContent = "🎯 Chính xác!";
    playSound(true);
  } else {
    result.textContent = `😅 Sai! Đáp án đúng là ${correctAnswer}.`;
    playSound(false);
  }
}

// --------- Nhớ số ----------
function startMemory(id) {
  let seq = "";
  for (let i = 0; i < (id === 3 ? 10 : 3 + id); i++)
    seq += Math.floor(Math.random() * 10);
  const display = document.getElementById(`memoryDisplay${id}`);
  display.textContent = seq;
  const showTime = id === 3 ? 5000 : 1000 + id * 300;
  setTimeout(() => (display.textContent = ""), showTime);
  document.getElementById(`memoryInput${id}`).dataset.seq = seq;
}

function checkMemory(id) {
  const input = document.getElementById(`memoryInput${id}`);
  const result = document.getElementById(`memoryResult${id}`);
  const correct = input.value === input.dataset.seq;
  result.textContent = correct
    ? "🎉 Giỏi lắm!"
    : `😅 Sai, đúng là ${input.dataset.seq}`;
  playSound(correct);
}

// --------- Phản xạ ----------
let reflexReady = false;
let reflexStartTime = 0;
let reflexPending = false;

function checkReflex() {
  const btn = document.getElementById("reflexBtn");
  const result = document.getElementById("reflexResult");

  if (!reflexPending && !reflexReady) {
    btn.style.background = "green";
    result.textContent = "⏳ Đang chuẩn bị...";
    reflexPending = true;
    setTimeout(() => {
      btn.style.background = "red";
      reflexStartTime = Date.now();
      reflexReady = true;
      reflexPending = false;
      result.textContent = "🚨 Bấm ngay khi thấy màu đỏ!";
    }, 2000);
    return;
  }

  if (reflexReady) {
    const reaction = ((Date.now() - reflexStartTime) / 1000).toFixed(3);
    result.textContent = `👏 Phản xạ tốt! ${reaction}s`;
    playSound(true);
    btn.style.background = "";
    reflexReady = false;
    return;
  }

  if (reflexPending && !reflexReady) {
    result.textContent = "😅 Bấm sớm quá! Đợi màu đỏ.";
    playSound(false);
  }
}

// --------- Phản xạ tay ----------
let clicks = 0;
let countdown = 10;
let timer = null;

function clickFast() {
  const display = document.getElementById("clickCount");
  if (!timer) {
    clicks = 1;
    countdown = 10;
    display.textContent = `⏱ ${countdown}s | Bấm: ${clicks}`;
    timer = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        clearInterval(timer);
        timer = null;
        display.textContent = `🎉 Hết giờ! Bạn bấm ${clicks} lần.`;
      } else {
        display.textContent = `⏱ ${countdown}s | Bấm: ${clicks}`;
      }
    }, 1000);
  } else if (countdown > 0) {
    clicks++;
    display.textContent = `⏱ ${countdown}s | Bấm: ${clicks}`;
  }
}
