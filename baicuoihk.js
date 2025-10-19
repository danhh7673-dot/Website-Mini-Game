const gameArea = document.getElementById("gameArea");
let secretNumber, memoryNumber, startTime;

// Hiển thị trò chơi tương ứng
function showGame(game) {
  if (game === 'guess') startGuess();
  else if (game === 'memory') startMemory();
  else if (game === 'reflex') startReflex();
}

// 🎯 Trò chơi ĐOÁN SỐ
function startGuess() {
  secretNumber = Math.floor(Math.random() * 10) + 1;
  gameArea.innerHTML = `
    <h3>🎯 Trò chơi: Đoán số (1-10)</h3>
    <input type="number" id="guessInput" min="1" max="10" placeholder="Nhập số...">
    <button onclick="checkGuess()">Kiểm tra</button>
    <p id="message"></p>
  `;
}

function checkGuess() {
  const val = Number(document.getElementById("guessInput").value);
  const msg = document.getElementById("message");
  if (!val) return msg.textContent = "⚠️ Hãy nhập số!";
  if (val === secretNumber) {
    msg.textContent = "🎉 Chính xác! Số bí mật là " + secretNumber;
    changeBackground();
  } else if (val < secretNumber) {
    msg.textContent = "⬆️ Số lớn hơn một chút!";
  } else {
    msg.textContent = "⬇️ Số nhỏ hơn chút nữa!";
  }
}

// 🧠 Trò chơi NHỚ SỐ
function startMemory() {
  memoryNumber = Math.floor(Math.random() * 900) + 100;
  gameArea.innerHTML = `
    <h3>🧠 Trò chơi: Nhớ số</h3>
    <p id="number">${memoryNumber}</p>
  `;
  setTimeout(() => {
    document.getElementById("number").innerHTML = `
      <input type="number" id="memoryInput" placeholder="Nhập lại số...">
      <button onclick="checkMemory()">Kiểm tra</button>
      <p id="message"></p>
    `;
  }, 2000);
}

function checkMemory() {
  const val = document.getElementById("memoryInput").value;
  const msg = document.getElementById("message");
  if (val == memoryNumber) {
    msg.textContent = "✅ Tuyệt vời! Bạn nhớ đúng.";
    changeBackground();
  } else {
    msg.textContent = "❌ Sai rồi! Số đúng là " + memoryNumber;
  }
}

// ⚡ Trò chơi PHẢN XẠ NHANH
function startReflex() {
  gameArea.innerHTML = `
    <h3>⚡ Trò chơi: Phản xạ nhanh</h3>
    <button id="startReflex">Bắt đầu</button>
    <p id="message"></p>
  `;
  const btn = document.getElementById("startReflex");
  btn.onclick = () => {
    btn.disabled = true;
    btn.textContent = "Đợi tín hiệu...";
    setTimeout(() => {
      btn.textContent = "👉 BẤM NGAY!";
      startTime = new Date().getTime();
      btn.onclick = checkReflex;
      btn.disabled = false;
    }, Math.random() * 3000 + 1000);
  };
}

function checkReflex() {
  const endTime = new Date().getTime();
  const reaction = ((endTime - startTime) / 1000).toFixed(3);
  document.getElementById("message").textContent = `⚡ Thời gian phản xạ: ${reaction}s`;
  changeBackground();
}

// 🌈 Đổi màu nền ngẫu nhiên
function changeBackground() {
  const colors = [
    "linear-gradient(120deg, #84fab0, #8fd3f4)",
    "linear-gradient(120deg, #a18cd1, #fbc2eb)",
    "linear-gradient(120deg, #f6d365, #fda085)",
    "linear-gradient(120deg, #fccb90, #d57eeb)"
  ];
  document.body.style.background = colors[Math.floor(Math.random() * colors.length)];
}
