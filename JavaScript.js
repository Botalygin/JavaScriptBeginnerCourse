// 1) Написать функцию getFieldValues, которая будет принимать на вход массив объектов, 
// а возвращать будет массив значений одного из полей (отсортированных в порядке возрастания):

var usersData = [
	{ 'user' : 'Alex', 'password' : 'MyNameIsAlex' },
	{ 'user' : 'Bob', 'password' : 'MyNAmeIsBob' }
];
console.log(getFieldValues(usersData, 'user')); // --> ['Alex', 'Bob']
function getFieldValues(data, username){
 	var array = new Array;
	for (var i = 0; i < data.length; i++) {
 		array[i] = data[i][username];
 	}
 	for (i = 0; i < array.length; i++) {
 		for (var j = i; j < array.length; j++) {
 			if (array[i] > array[j]) {
 				var a = array[j];
 				array[j] = array[i];
 				array[i] = a;
 			}
 		}
 	}
 	return array;
}

// 2) Написать функцию, фильтрующую массив с использованием предиката:

var numbers = [1, 2, 3, 5, 8, 13, 21, 34, 55];
function isEven(x) { 
	if (x % 2 == 0) {
		return x;
	}
}
function filter (numbers, even) {
	var array = [];
	for (var i = 0; i < 9; i++) {
		if (even(numbers[i])) {
			array.push(numbers[i]);
		}
	}
	return array;
}
console.log(filter(numbers, isEven)); // --> [2, 8, 34]

// 3) Даны 2 строки со словами (без знаков препинания), 
// вывести те слова (по одному разу), которые встречаются в обоих строках

var firstLongString = 'Load up on guns and bring your friends it\'s fun to lose and to pretend';
var secondLongString = 'She\'s over bored and self assured oh no I know a dirty word';
console.log(findSimilarWords(firstLongString, secondLongString)); // --> ['and'];
function makeArray(word) { 
    var stroka = [];
    var j = 0, start = 0, now = 0;
	for (var i = 0; i < word.length; i++) {
		if (word[i] == ' ') {
		    now = i - start;
		    stroka[j] = word.substr(start, now);
		    start = i + 1;
		    j++;
		}
		if (i == word.length) {
		    stroka[j] = word.substr(start);
		}
	}
	return stroka;
}
function findSimilarWords(string1, string2) {
	var words1 = makeArray(string1);
	var words2 = makeArray(string2);
	for (var i = 0; i < words1.length; i++) {
		var j = 0;
		while (j != words2.length) {
			if (words2[j] == words1[i]) {
				return words1[i];
				break;		
			}
			j++;	
		}
	}
}

// 4) Дан IP-адрес (строка) и маска подсети (десятичное число). Написать функцию, которая будет валидировать
// IP-адрес (4 октета, <= 255), а затем выводить сетевой и широковещательный адреса:

var IpAddress = '10.223.98.2';
var subnetMask = 28;
console.log(generateBroadcastAndNetworsAddresses(IpAddress, subnetMask)); // Broadcast - 10.223.98.15, Network - 10.223.98.0
function generateBroadcastAndNetworsAddresses(IP, subnet) {
    var networkAddress = [];
    var j = 0, start = 0, now = 0;
	for (var i = 0; i < IP.length; i++) {
		if (IP[i] == '.') {
		    now = i - start;
		    networkAddress[j] = Number(IP.substr(start, now));
		    start = i + 1;
		    j++;
		}
		if (i == IP.length - 1)	{
		    networkAddress[j] = Number(IP.substr(start));
		}
	}
	var mask = Math.pow(2, 8) - Math.pow(2, 32 - subnet);
	mask = mask.toString(2);
	var last = networkAddress[3].toString(2);
    networkAddress[3] = last & mask;
    console.log(networkAddress);
    var broadcastAddress = networkAddress;
    broadcastAddress[3] = networkAddress[3] + Math.pow(2, 32 - subnet) - 1;
 	return broadcastAddress;
}

// 5) Соединить все массивы в один, не допуская повторения элементов (порядок не важен):
// P. S. 1 == '1' (строковое и числовое представление number'ов считать идентичными)

var totalMessArray = [['a', 1, true], [true, 99, 'aa', undefined], ['1']];
console.log(makeItClean(totalMessArray)); // --> ['a', 'aa', 1, undefined, true];
function makeItClean(array) {
	var newArray = [];
	var bool = true;
	for(var i = 0; i < 3; i++) {
		for (var j = 0; j < array[i].length; j++) {
			bool = true;
			for (var k = 0; k < newArray.length; k++) {
				if (newArray[k] == array[i][j]) {
					bool = false;
				}
			}
			if (bool) {
				newArray.push(array[i][j]);
			}
		}
	}
	return newArray;
}