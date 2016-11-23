//Quote machine v2
var qbox = document.getElementById('qbox');
var text = document.getElementById('text');
var count = document.getElementById('count');
var author = document.getElementById('author');
var newq = document.getElementById('newq');
var number = document.getElementById('number');
var select = document.getElementById('select');
var quo = document.getElementById('quo');
var keyArray = Object.keys(quotes);
var arrLen = keyArray.length;
var rand;
var n = 0;
var authors = {};
var akeys = [];
var splitted;

function quote() {
	rand = Math.floor(Math.random() * arrLen);
	var value = quotes[keyArray[rand]];
	var key = keyArray[rand];

	quo.innerHTML = 'Quote# ';
	number.innerHTML = rand + '/' + arrLen;
	text.innerHTML = key;
	author.innerHTML = '&ndash; ' + value;

	select.style.display = 'none';
	qbox.style.opacity = 1;
	select.options[rand].selected = true;
}

while (n < arrLen) {	
	var option = document.createElement('option');	
	option.text = n;
	select.add(option);
	n++;
}
	
number.onclick = function() {
	select.style.display = 'inline-block';
	number.innerHTML = '/' + arrLen;;
}

select.oninput = function(event) {
	qbox.style.opacity = 0;
	setTimeout(function() {
		var quoteNum = event.target.value;		
		number.innerHTML = quoteNum + '/' + arrLen;
		text.innerHTML = keyArray[quoteNum];
		author.innerHTML = '&ndash; ' + quotes[keyArray[quoteNum]];
		
		select.style.display = 'none';
		qbox.style.opacity = 1;
	}, 400);
}

newq.onclick = function() {
	qbox.style.opacity = 0;
	setTimeout(function() {
		quote();
	}, 400);
};

count.onclick = function() {
	qbox.style.opacity = 0;
	
	setTimeout(function() {
		select.style.display = 'none';
		quo.innerHTML = 'Authors by # of quotes';
		number.innerHTML = '';
		author.innerHTML = akeys.length + ' Total # of authors';
		text.innerHTML = '';
		var alength = akeys.length -1;
		for (var j = alength; j >= 0; j--) {
			var key = akeys[j];			
			text.innerHTML += authors[key] + ' &ndash; <span>' + key + '</span><br>';
		}
	qbox.style.opacity = 1;
	allAuthors();
	}, 400);
};

function allAuthors(){
	splitted = document.getElementsByTagName('span');
	for (var a = splitted.length - 1; a >= 0; a--) {
		splitted[a].onclick = getKeyByValue;
	}
}

function getKeyByValue() {	
	qbox.style.opacity = 0;
	var val = this.innerHTML;

	setTimeout(function() {
		var  allByArr = keyArray.filter(function (key) {
							return quotes[key] === val;
						})
		text.innerHTML = '';
		for (var i = 0; i < allByArr.length; i++) {
			text.innerHTML += allByArr[i] + '<br><br>';
		}
		author.innerHTML = '&ndash; ' + val;
		quo.innerHTML = 'All ' + allByArr.length + ' quotes';
		qbox.style.opacity = 1;
	}, 400);
}

for (var i = arrLen - 1; i >= 0; i--){
	var writer = quotes[keyArray[i]];
	if (authors[writer] === undefined){
		authors[writer] = 1;
		akeys.push(writer);
	} else {
		authors[writer] = authors[writer] + 1;
	}
}

akeys.sort(function (a, b){
	var a = authors[a];
	var b = authors[b];
	return a - b;			
})

quote();