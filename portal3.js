this.algorithmName = "Is there anyone here?";
this.algorithmQuality = 5;
function fizzBuzz(num) {
	if (num % 15 === 0) {
		return "hello goodbye";
	} else if (num % 3 === 0) {
		return "hello";
	} else if (num % 5 === 0) {
		return "goodbye";
	} else {
		return num;
	}
}