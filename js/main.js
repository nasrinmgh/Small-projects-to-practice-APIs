// Toggle Mode

function toggleMode() {
  const dark = document.getElementById("toggle");
  const card = document.querySelector(".card");

  dark.addEventListener("change", () => {
    if (dark.checked) {
      card.classList.add("dark-mode");
    } else {
      card.classList.remove("dark-mode");
    }
  });
}
toggleMode();

const API_KEY = "hBCMhnX75QQf4kzkxP3etQ==vtDSjzQckETg3IKO";
async function getNewQuote() {
  let quote = "";
  let author = "";

  // Keep fetching until we find a short quote
  while (true) {
    const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        "X-Api-Key": API_KEY,
      },
    });

    const data = await response.json();
    quote = data[0].quote;
    author = data[0].author;

    // If quote length <= 50, stop loop
    if (quote.length <= 50) {
      break;
    }
  }

  // Update UI
  document.getElementById("quote_p").textContent = `"${quote}"`;
  document.getElementById("authorSpan").textContent = `— ${author}`;
}

const newBtn = document.getElementById("getNewQuote");
newBtn.addEventListener("click", getNewQuote);

// Load first quote on page load
getNewQuote();

// To copy the quote
async function copyQuote() {
  const quoteText = document.querySelector(".card").textContent;
  if (quoteText.trim() === "") return false;
  try {
    await navigator.clipboard.writeText(quoteText.trim());
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

const copyBtn = document.getElementById("copy");
copyBtn.addEventListener("click", async () => {
  const ok = await copyQuote();
  const copyAlert = document.createElement("span");
  const container = document.querySelector(".container");
  container.appendChild(copyAlert);
  copyAlert.classList.add("copy-alert");

  if (ok) {
    copyAlert.textContent = "Copied successfully!";
  } else {
    copyAlert.textContent = "Nothing to copy!";
  }
  setTimeout(() => {
    container.removeChild(copyAlert);
  }, 1000);
});
