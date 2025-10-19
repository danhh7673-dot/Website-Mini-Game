let currentSlide = 0;
function goToSlide(n) {
  const slider = document.getElementById("slider");
  currentSlide = n;
  slider.style.transform = `translateX(-${n * 100}vw)`;
}


function playSound(correct = true) {
  const el = document.getElementById(correct ? "correctSound" : "wrongSound");
  if (el) {
    try { el.currentTime = 0; el.play(); } catch (e) {}
  }
}


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

function startSpeedGuess() {
  const result = document.getElementById("result4");
  
  const base = Math.floor(Math.random() * 98) + 1;
  const pair = [base, base + 1];

  const correctAnswer = pair[Math.floor(Math.random() * 2)];

  
  let guess = prompt("Hãy đoán: giữa hai số gần nhau (ví dụ 23 và 24), nhập số bạn chọn:");
 
  if (guess === null) {
    result.textContent = "Bạn đã hủy lượt đoán.";
    return;
  }
  guess = guess.trim();
  if (guess == correctAnswer) {
    result.textContent = "🎯 Chính xác!";
    playSound(true);
  } else {
    result.textContent = `😅 Sai rồi! Đáp án đúng là ${correctAnswer} (cặp là ${pair[0]} và ${pair[1]})`;
    playSound(false);
  }
}


function startMemory(id) {
  let seq = "";
  if (id === 3) {
    
    for (let i = 0; i < 10; i++) seq += Math.floor(Math.random() * 10);
    const display = document.getElementById(`memoryDisplay${id}`);
    if (display) display.textContent = seq;
    setTimeout(() => {
      const d = document.getElementById(`memoryDisplay${id}`);
      if (d) d.textContent = "";
    }, 5000);
  } else {
    for (let i = 0; i < 3 + id; i++) seq += Math.floor(Math.random() * 10);
    const display = document.getElementById(`memoryDisplay${id}`);
    if (display) display.textContent = seq;
    setTimeout(() => {
      const d = document.getElementById(`memoryDisplay${id}`);
      if (d) d.textContent = "";
    }, 1000 + id * 300);
  }

  const input = document.getElementById(`memoryInput${id}`);
  if (input) input.dataset.seq = seq;
}

function checkMemory(id) {
  const input = document.getElementById(`memoryInput${id}`);
  const result = document.getElementById(`memoryResult${id}`);
  if (!input || !result) return;
  const user = input.value;
  const seq = input.dataset.seq;
  const correct = user === seq;
  result.textContent = correct ? "🎉 Giỏi lắm!" : `😅 Sai, đúng là ${seq}`;
  playSound(correct);
}


let reflexReady = false;
let reflexStartTime = 0;
let reflexPending = false;

function checkReflex() {
  const btn = document.getElementById("reflexBtn");
  const result = document.getElementById("reflexResult");
  if (!btn || !result) return;

 
  if (!reflexPending && !reflexReady) {
    btn.style.background = "green";
    result.textContent = "⏳ Đang chuẩn bị... chờ 2 giây.";
    reflexPending = true;
    reflexReady = false;
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
    result.textContent = `👏 Phản xạ tốt! Bạn bấm sau ${reaction}s`;
    playSound(true);
    btn.style.background = "";
    reflexReady = false;
    reflexPending = false;
    return;
  }


  if (reflexPending && !reflexReady) {
    result.textContent = "😅 Bấm sớm quá! Hãy đợi nó chuyển sang đỏ.";
    playSound(false);
    return;
  }
}


let clicks = 0;
let countdown = 60;
let timer = null;

function clickFast() {
  const display = document.getElementById("clickCount");
  if (!display) return;

 
  if (!timer) {
    clicks = 1;
    countdown = 60;
    display.textContent = `Thời gian: ${countdown}s | Số lần bấm: ${clicks}`;
    timer = setInterval(() => {
      countdown--;
      display.textContent = `Thời gian: ${countdown}s | Số lần bấm: ${clicks}`;
      if (countdown <= 0) {
        clearInterval(timer);
        timer = null;
        display.textContent = `⏱ Hết giờ! Bạn bấm được ${clicks} lần 🎉`;
      }
    }, 1000);
  } else if (countdown > 0) {
    
    clicks++;
    display.textContent = `Thời gian: ${countdown}s | Số lần bấm: ${clicks}`;
  }
}
