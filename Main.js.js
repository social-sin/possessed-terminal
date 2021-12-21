let geval = eval; //It ain't enterprise if the code ain't shit
let algorithmCode = "";
let terminalWindow;

function start() {
	terminalWindow = new Terminal();
	terminalWindow.setBackgroundColor("white");
	terminalWindow.setTextColor("black");
	terminalWindow.blinkingCursor(true);
	document.body.appendChild(terminalWindow.html);
	terminalWindow.print("Type \"help\" for a list of commands")
	terminalWindow.input("\u200b", runCommand);
	step();
}

function step() {
	//resize terminal
	terminalWindow.setWidth(window.innerWidth + "px")
	terminalWindow.setHeight(window.innerHeight + "px")
	window.requestAnimationFrame(step);
}

function runCommand(command) {
	terminalWindow.print("\u200b");
	//fix up command
	command = command.replace(RegExp(" {2,}"), " ").toLowerCase().split(" ");
	//make sure it is not empty
	if (command.length > 0) {
		let commandName = command.shift();
		if (commands[commandName] !== undefined) {
			commands[commandName].func(...command);
		} else {
			terminalWindow.print("Unknown command")
		}
	}
	terminalWindow.input("\u200b", runCommand);
}

function checkHtmlColor(col) { //check if a string is a valid html color
	//remove whitespace and case sensitivity
	col = col.trim().toLowerCase();
	//x11 colours with alt names
	const htmlColors = ["antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "webgray", "green", "webgreen", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrod", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "webmaroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navyblue", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "webpurple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"]
	//RegExps (regrets) for hex, rgb and hsl colours
	const regExps = [RegExp("^#([0-9a-f]{6}|[0-9a-f]{3})$"), RegExp("^rgb\\(( {0,}[0-9]+ {0,},){2}( {0,}[0-9]+) {0,}\\)$"), RegExp("^hsl\\(( {0,}[0-9]+ {0,},)( {0,}[0-9]+% {0,},)( {0,}[0-9]+%) {0,}\\)$")];
	for (let i = 0; i < htmlColors.length; i++) {
		if (col === htmlColors[i]) {
			return true;
		}
	}
	for (let i = 0; i < regExps.length; i++) {
		if (regExps[i].test(col)) {
			return true;
		}
	}
	return false; //not a valid html colour
}

function loadPortal(fileName, successFunc = function() {}, errorFunc = function() {}) {
	let rawXMLFile = new XMLHttpRequest();
	rawXMLFile.open("GET", fileName, false);
	rawXMLFile.onreadystatechange = function() {
		if (rawXMLFile.readyState === 4) {
			if (rawXMLFile.status === 200 || rawXMLFile.status == 0) {
				if (typeof rawXMLFile.responseText === "string") {
					if (rawXMLFile.responseText !== "") {
						algorithmCode = rawXMLFile.responseText.split("\n").splice(2).join("\n");
						geval(rawXMLFile.responseText); //It ain't enterprise if the code ain't shit
						successFunc();
						return;
					}
				}
			}
		}
		errorFunc();
	}
	rawXMLFile.send(null);
}

function algorithmWrapper(num) {
	try {
		return portal(num);
	} catch (error) {
		return Error(error);
	}
}

String.capitalize = function(str) { //add capitalize function to strings
	return this.slice(0, 1).toUpperCase() + str.slice(1)
}

Number.mod = function(a, b) {
	return ((a % b) + b) % b;
};

start();