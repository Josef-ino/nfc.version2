// Ověření podpory
if ("NDEFReader" in window) {
  const nfcBtn = document.getElementById("startNFC");
  nfcBtn.addEventListener("click", async () => {
    try {
      const reader = new NDEFReader();
      await reader.scan();
      document.getElementById("status").textContent = "📡 NFC čtečka spuštěna";

      reader.onreading = event => {
        const decoder = new TextDecoder();
        for (const record of event.message.records) {
          console.log("NFC data:", decoder.decode(record.data));
          document.getElementById("status").textContent =
            "✅ Přečteno: " + decoder.decode(record.data);
        }
      };

      reader.onreadingerror = () => {
        document.getElementById("status").textContent = "❌ Nelze číst NFC!";
      };

    } catch (err) {
      document.getElementById("status").textContent = "⚠️ Chyba: " + err;
    }
  });
} else {
  document.getElementById("status").textContent =
    "❌ Tento prohlížeč nepodporuje Web NFC!";
}
