// --- Theme toggle ---
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
});

// Načtení preferencí uživatele
if (window.matchMedia("(prefers-color-scheme: light)").matches) {
  document.body.classList.add("light");
  themeToggle.textContent = "🌙";
} else {
  themeToggle.textContent = "☀️";
}

// --- Klávesnice a částka ---
const amountInput = document.getElementById("amountInput");
const payBtn = document.getElementById("payBtn");
const topupBtn = document.getElementById("topupBtn");
const status = document.getElementById("status");

let currentValue = "";

// funkce pro aktualizaci UI
function updateUI() {
  amountInput.value = currentValue ? currentValue + " Kč" : "0 Kč";

  const value = parseInt(currentValue || "0", 10);
  if (value > 0) {
    payBtn.disabled = false;
    topupBtn.disabled = false;
  } else {
    payBtn.disabled = true;
    topupBtn.disabled = true;
  }
}

// obsluha kliknutí na klávesy
document.querySelectorAll(".key").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.key;
    const action = btn.dataset.action;

    if (key) {
      // číslo
      if (currentValue.length < 6) { // max 6 číslic
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

// tlačítka Zaplatit a Dobít
payBtn.addEventListener("click", () => {
  status.textContent = `✅ Zaplaceno ${amountInput.value}`;
  currentValue = "";
  updateUI();
});

topupBtn.addEventListener("click", () => {
  status.textContent = `💰 Dobito ${amountInput.value}`;
  currentValue = "";
  updateUI();
});

// inicializace
updateUI();
