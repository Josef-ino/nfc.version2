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

// --- Zde může být NFC logika a práce s tlačítky ---

