
async function predict() {
  const input = document.getElementById("inputText").value.trim();
  const outputBox = document.getElementById("output");
  if (!input) {
    outputBox.innerText = "⚠️ Please enter your thoughts before analyzing.";
    return;
  }

  outputBox.innerText = "⏳ Analyzing...";

  try {
    const response = await fetch("https://anxiety-detection-production.up.railway.app/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input })
    });

    const result = await response.json();
    if (result.result === "Anxiety/Depression") {
  outputBox.innerHTML = `
    <strong>🧠 Result:</strong> ${result.result}<br>
    <strong>🔢 Confidence:</strong> ${result.confidence}%<br>
    <strong>📢 Message:</strong> ${result.message}<br>
    <strong>💬 Mood Support:</strong> ${result.mood_support}<br>
    <strong>📞 Helpline:</strong> ${result.helpline}<br>
    <strong>🌐 Online Support:</strong> <a href="${result.online_support.split(" ")[2]}" target="_blank">${result.online_support}</a><br>
    <strong>💡 Tip:</strong> ${result.tip}<br><br>
    <strong>👨‍⚕️ Available Counsellors:</strong><br>
    <ul>
      ${result.counsellors.map(c => `<li>${c.name} – ${c.phone} – ${c.room}</li>`).join("")}
    </ul>
  `;
} else {
  outputBox.innerHTML = `<strong>✅ Result:</strong> ${result.result}<br><strong>Confidence:</strong> ${result.confidence}%`;
}

  } catch (error) {
    outputBox.innerText = "❌ Error connecting to backend: " + error;
  }
}
