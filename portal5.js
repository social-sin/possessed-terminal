this.algorithmName = "Can you talk?";
this.algorithmQuality = 4;
function portal(num) {
    let str = "";
    if (num / 3 === Math.floor(num / 3)) {
        str += "hello";
    }
    if (num / 5 === Math.floor(num / 5)) {
        str += "goodbye";
    }
    if (str === "") {
        return num;
    } else {
        return str;
    }
}