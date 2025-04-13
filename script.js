
async function predict() {
  const userInput = document.getElementById("inputText").value;
  const response = await fetch("https://anxiety-detection-production.up.railway.app/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: userInput })
  });
  const data = await response.json();
  document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}
