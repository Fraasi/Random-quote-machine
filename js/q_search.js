const endPoint = 'https://raw.githubusercontent.com/Fraasi/Random-quote-machine/gh-pages/quotes/quotes2.json';

var searchBox = document.querySelector('.searchBox');
var list = document.querySelector('.list');
var found = document.querySelector('#found');
var length = document.querySelector('#length');

var quotes = [];
var obj;
var matches = [];

fetch(endPoint)
	.then(blob => blob.json())
	.then(data => {
		obj = data;
		for(var i in data) {
		quotes.push(i);
		}
		length.innerHTML = quotes.length;
	});

function findMatches(word, quotes) {	
	return quotes.filter( quote => {
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
		
	matches = findMatches(this.value, quotes)
	found.innerHTML = matches.length;
	var html = matches.map( (el, indx, arr) => {
		var regx = new RegExp(this.value, 'gi');
		var repl = el.replace(regx, `<span class="highlighted">${this.value}</span>`);
		
		return `<li> ${repl} <br><br>- ${obj[matches[indx]]} </li><hr>`;
	}).join('');
list.innerHTML= html;
}
searchBox.addEventListener('keyup', display);

