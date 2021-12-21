this.algorithmName = "Can you show yourself?";
this.algorithmQuality = 4;
function fizzBuzz(num) {
	let results = ["hello goodbye", num, num, "hello", num, "goodbye", "hello", num, num, "hello", "goodbye", num, "hello", num, num];
	return results[num % 15];
}