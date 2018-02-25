var searchBox = document.querySelector('.searchBox');
var list = document.querySelector('.list');
var found = document.querySelector('#found');
var length = document.querySelector('#length');

var quotesArr = [];
var matches = [];

for(let quote in quotes) {
	quotesArr.push(quote);
}
length.innerHTML = quotesArr.length;

function findMatches(word, quotesArr) {	
	return quotesArr.filter( quote => {
		var regx = new RegExp(word, 'gi')
		return quote.match(regx);		
	})
}

function display() {
	if (this.value.length < 2) {
		found.innerHTML = '_';
		list.innerHTML = 'This search (<i class="fa fa-search" aria-hidden="true"></i>) is a little addendum to <a href="../index.html" target="_blank">this quote machine</a>.';
		return;
	}
		
	matches = findMatches(this.value, quotesArr)
	found.innerHTML = matches.length;
	var html = matches.map( (el, indx) => {
		var regx = new RegExp(this.value, 'gi');
		var highlight = el.replace(regx, `<span class="highlighted">${this.value}</span>`);
		
		return `<li> ${highlight} <br><br>- ${quotes[matches[indx]]} </li><hr>`;
	}).join('');

	list.innerHTML = html;
}

searchBox.addEventListener('keyup', display);
