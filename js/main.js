const API_KEY = 'hBCMhnX75QQf4kzkxP3etQ==vtDSjzQckETg3IKO';

async function getNewQuote() {
  let quote = "";
  let author = "";

  // Keep fetching until we find a short quote
  while (true) {
    const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        "X-Api-Key": API_KEY
      }
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
  try{
  const quoteText = document.querySelector('.card').textContent;
  quoteText.trim();
  await navigator.clipboard.writeText(quoteText);

  } catch(error) {
    console.log(error);
  }
}

const copyBtn = document.getElementById('copy');
copyBtn.addEventListener('click', () => {
 copyQuote();
 if (copyQuote) {
  const copyAlert = document.createElement('span');
  copyAlert.classList.add('copy-alert');
  copyAlert.textContent = 'Copied successfully!';
  const container = document.querySelector('.container');
  container.appendChild(copyAlert);

 setTimeout(() => {
  container.removeChild(copyAlert);
 }, 1000)
  }

})