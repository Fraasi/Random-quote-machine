const searchBox = document.querySelector('.searchBox');
const list = document.querySelector('.list');
const found = document.querySelector('#found');
const length = document.querySelector('#length');

const quotes = {}
for (authoor in quotes_data) {
	quotes_data[authoor].forEach(quote => {
		quotes[quote] = authoor
	})	
};


const quotesArr = Object.keys(quotes);

length.innerHTML = quotesArr.length;

function runSearch() {
	if (this.value.length < 2) {
		found.innerHTML = '_';
		list.innerHTML = 'This search (<i class="fa fa-search" aria-hidden="true"></i>) is a little addendum to <a href="../index.html">this quote machine</a>.';
		return;
	}
	
	let regx = new RegExp(this.value, 'gi')

	let matches = quotesArr.filter( quote => quote.match(regx) );

	found.innerHTML = matches.length;
	let html = matches.map( (el, indx) => {
		let highlight = el.replace(regx, `<span class="highlighted">${this.value}</span>`);
		return `<li> ${highlight} <br><br>- ${quotes[matches[indx]]} </li><hr>`;
	}).join('');

	list.innerHTML = html;
}

searchBox.addEventListener('keyup', runSearch);
