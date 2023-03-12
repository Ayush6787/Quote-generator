const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show loadinf
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function removeLoadingSpinner(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// show new quote

function newQuote(){
    showLoadingSpinner();
    // pick a random quote from apiQuotes array
    const quote =apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author field is blank and replace it with unknown
    if(!quote.author) {
        authorText.textContent ='Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
// set quote, hide loader

    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// get quotes from api
async function getQuotes(){  
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote(); 
    } catch(error){
        // Error here
    }
}

// tweet quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// event listner

newQuoteBtn.addEventListener ('click', newQuote);
twitterBtn.addEventListener ('click', tweetQuote)

// on load
getQuotes();
