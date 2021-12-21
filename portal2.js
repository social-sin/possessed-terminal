this.algorithmName = "Are you here?";
this.algorithmQuality = 5;
function portal(num) {
	let str = "";
	if (num % 3 === 0) {
		str += "hello";
	}
	if (num % 5 === 0) {
		str += "goodbye";
	}
	if (str === "") {
		return num;
	} else {
		return str;
	}
}