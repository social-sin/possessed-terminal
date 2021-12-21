this.algorithmName = "Appending Functions";
this.algorithmQuality = 4;
function fizzBuzz(num) {
	let str = "";
	str += appendFizzBuzz(num, "Fizz", 3);
	str += appendFizzBuzz(num, "Buzz", 5);
	if (str === "") {
		return str;
	} else {
		return num;
	}
}

function appendFizzBuzz(num, str, multiple) {
	if (num % multiple === 0) {
		return str;
	} else {
		return "";
	}
}