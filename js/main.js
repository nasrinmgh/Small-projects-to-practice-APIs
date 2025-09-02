const API_KEY = 'hBCMhnX75QQf4kzkxP3etQ==vtDSjzQckETg3IKO';

async function getNewQuote() {
    
    const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
    headers: {
      "X-Api-Key": API_KEY
    }
  });
   const data = await response.json();
   console.log(data);
   const quote = data[0].quote;
   const  author = data[0].author;
 
   const quoteSpan = document.getElementById('quoteSpan');
   const authorSpan = document.getElementById('authorSpan');
   quoteSpan.textContent = `${quote}`;
   authorSpan.textContent = `${author}`;
}

const newBtn = document.getElementById('getNewQuote');
newBtn.addEventListener('click', getNewQuote());

getNewQuote();



