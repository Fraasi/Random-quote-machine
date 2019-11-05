const _id = (id) => document.getElementById(id);
const countAuthorsButton = _id('countauthors');
const newQuoteButton = _id('newquote');const qbox = _id('qbox');
const text = _id('text');
const author = _id('author');
const number = _id('number');
const select = _id('select');
const quo = _id('quo');

// organize quotes
// from { author: [quotes] } to { quote: author }
const quotes = {}
for (authoor in quotes_data) {
	quotes_data[authoor].forEach(quote => {
		quotes[quote] = authoor
	})	
};

const quoteKeys = Object.keys(quotes);
const keysLength = quoteKeys.length;
let authorCount = {};
let authors;
let n = 0;

function countAuthors() {
	for (let i = 0; i < keysLength; i++){
		let writer = quotes[quoteKeys[i]];
		if (authorCount[writer] === undefined){
			authorCount[writer] = 1;
		} else {
			authorCount[writer] = authorCount[writer] + 1;
		}
	}
	authors = Object.keys(authorCount);
	authors.sort( (a, b) => authorCount[b] - authorCount[a]);
}
countAuthors();

while (n < keysLength) {	
	var option = document.createElement('option');	
	option.text = n;
	select.add(option);
	n++;
}

number.onclick = function() {
	select.style.display = 'inline-block';
	number.innerHTML = '/' + (keysLength - 1);
}

select.oninput = function(event) {
	qbox.style.opacity = 0;
	setTimeout(function() {
		var quoteNum = event.target.value;		
		number.innerHTML = quoteNum + '/' + (keysLength - 1);
		text.innerHTML = quoteKeys[quoteNum];
		author.innerHTML = '&ndash; ' + quotes[quoteKeys[quoteNum]];
		
		select.style.display = 'none';
		qbox.style.opacity = 1;
	}, 400);
}

newQuoteButton.onclick = function() {
	qbox.style.opacity = 0;
	setTimeout(function() {
		quote();
	}, 400);
};

countAuthorsButton.onclick = function() {
	qbox.style.opacity = 0;
	
	setTimeout(function() {
		select.style.display = 'none';
		quo.innerHTML = 'Authors by # of quotes';
		number.innerHTML = '';
		author.innerHTML = authors.length + ' Total # of authors';
		text.innerHTML = '';
		authors.forEach( (author) => {
			text.innerHTML += authorCount[author] + ' &ndash; <span>' + author + '</span><br>';
		});

		qbox.style.opacity = 1;
		setAuthorClicks();
	}, 400);
};

function setAuthorClicks(){
	const spans = document.querySelectorAll('#text  span')
	spans.forEach( span => span.onclick = getKeyByValue);
}

function getKeyByValue() {	
	qbox.style.opacity = 0;
	let val = this.innerHTML;

	setTimeout(function() {
		let quotesByAuthor = quoteKeys.filter( (key) => quotes[key] === val );
		text.innerHTML = '';
		quotesByAuthor.forEach( quote => text.innerHTML += quote + '<br><br>' );
		author.innerHTML = '&ndash; ' + val;
		quo.innerHTML = 'All ' + quotesByAuthor.length + ' quotes';
		qbox.style.opacity = 1;
	}, 400);
}

function quote() {
	let randomQuote = Math.floor(Math.random() * keysLength);
	let value = quotes[quoteKeys[randomQuote]];
	let key = quoteKeys[randomQuote];

	quo.innerHTML = 'Quote# ';
	number.innerHTML = randomQuote + '/' + (keysLength - 1);
	text.innerHTML = key;
	author.innerHTML = '&ndash; ' + value;

	select.style.display = 'none';
	qbox.style.opacity = 1;
	select.options[randomQuote].selected = true;
}

quote();