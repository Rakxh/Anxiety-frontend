function detect() {
    const text = document.getElementById("inputText").value;
    const resultBox = document.getElementById("resultBox");
  
    resultBox.innerHTML = "⏳ Detecting...";
  
    fetch("https://anxiety-detection-2.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    })
    .then(res => res.json())
    .then(data => {
      const color = data.result === "Normal" ? "green" : "red";
      resultBox.innerHTML = `<span style="color:${color};"><b>${data.result}</b></span><br>Confidence: ${data.confidence}%`;
    })
    .catch(() => {
      resultBox.innerHTML = "<span style='color:red;'>❌ Could not reach backend.</span>";
    });
  }
  
