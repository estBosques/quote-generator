const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

let apiQuote = {};
let category = 'inspirational';

// Show Loader
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hiode Loader
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Get Qoutes From API
async function getQuote() {
  loading();
  const apiUrl = `https://api.quotable.io/random?tags=${category}`;
  try {
    const response = await fetch(apiUrl);
    apiQuote = await response.json();

    authorText.textContent = "— " + apiQuote.author || 'Unknown';

    // Check Quote length to determine styling
    if (apiQuote.content.length > 120) {
      quoteText.classList.add('long-quote');
    }
    else {
      quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = apiQuote.content;
    complete();
  } catch (error) {
    // Fetch a local quote
    // TODO: Create quoutes.js with local quoutes
    console.log(first)
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On Load
getQuote();