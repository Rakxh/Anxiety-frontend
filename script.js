
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
    outputBox.innerText = JSON.stringify(result, null, 2);
  } catch (error) {
    outputBox.innerText = "❌ Error connecting to backend: " + error;
  }
}
