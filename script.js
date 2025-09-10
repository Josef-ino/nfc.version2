// --- Theme toggle ---
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
});

if (window.matchMedia("(prefers-color-scheme: light)").matches) {
  document.body.classList.add("light");
  themeToggle.textContent = "🌙";
} else {
  themeToggle.textContent = "☀️";
}

// --- Logika terminálu ---
const amountInput = document.getElementById("amountInput");
const balanceEl = document.getElementById("balance");
const payBtn = document.getElementById("payBtn");
const topupBtn = document.getElementById("topupBtn");
const status = document.getElementById("status");

let currentValue = "";
let balance = 20; // výchozí zůstatek 20 Kč

function updateUI() {
  amountInput.value = currentValue ? currentValue + " Kč" : "0 Kč";
  balanceEl.textContent = balance + " Kč";

  const value = parseInt(currentValue || "0", 10);
  if (value > 0) {
    payBtn.disabled = false;
    topupBtn.disabled = false;
  } else {
    payBtn.disabled = true;
    topupBtn.disabled = true;
  }
}

// klávesnice
document.querySelectorAll(".key").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.key;
    const action = btn.dataset.action;

    if (key) {
      if (currentValue.length < 6) {
        currentValue += key;
      }
    } else if (action === "clear") {
      currentValue = "";
    } else if (action === "backspace") {
      currentValue = currentValue.slice(0, -1);
    }
    updateUI();
  });
});

// platba
payBtn.addEventListener("click", () => {
  const value = parseInt(currentValue || "0", 10);
  if (value > 0 && balance >= value) {
    balance -= value;
    status.textContent = `✅ Zaplaceno ${value} Kč`;
  } else if (value > 0 && balance < value) {
    status.textContent = `❌ Nedostatek kreditu!`;
  }
  currentValue = "";
  updateUI();
});

// dobití
topupBtn.addEventListener("click", () => {
  const value = parseInt(currentValue || "0", 10);
  if (value > 0) {
    balance += value;
    status.textContent = `💰 Dobito ${value} Kč`;
  }
  currentValue = "";
  updateUI();
});

updateUI();
