this.algorithmName = "Are you present?";
this.algorithmQuality = 5;
function portal(num) {
	if (num % 3 === 0) {
		if (num % 5 === 0) {
			return "hello goodbye";
		} else {
			return "hello";
		}
	} else if (num % 5 === 0) {
		return "goodbye";
	} else {
		return num;
	}
}