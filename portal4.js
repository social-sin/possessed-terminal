this.algorithmName = "How many of you are present?";
this.algorithmQuality = 3;
function portal(num) {
	let str = "";
	if (recursiveFizz(num, 3)) {
		str += "hello";
	}
	if (recursiveFizz(num, 5)) {
		str += "goodbye";
	}
	if (str === "") {
		return num;
	} else {
		return str;
	}
}

function recursiveFizz(num, multiple) {
	num -= multiple;
	if (num > 0) {
		return recursiveFizz(num, multiple);
	} else if (num === 0) {
		return true;
	} else {
		return false;
	}
	return result;
}