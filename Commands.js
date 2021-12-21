let jsOpsDone = false; // hase v8 made the testTime function fast after it's first run;

let commands = { //list of commands
	
	help: createCommand(function(commandName = "") {
			if (commandName !== "") {
				if (commands[commandName] !== undefined) {
					terminalWindow.print(commands[commandName].usage);
					terminalWindow.print(commands[commandName].message);
				} else {
					terminalWindow.print("That is not a valid command");
				}
			} else {
				terminalWindow.print("Valid commands include");
				commandKeys = Object.keys(commands);
				for (let i = 0; i < commandKeys.length; i++) {
					terminalWindow.print(commandKeys[i]);
				}
				terminalWindow.print("Type \"help\" with the name of a command for more information");
			}
		},
		"help {commandName}",
		"Lists all command or gives info on a given command"),
	wipe: createCommand(function() {
			terminalWindow.clear();
		},
		"wipe",
		"Clears the terminal window"),
	load: createCommand(function(portalId) {
			let fileName = "portal" + portalId + ".js";
			loadPortal(fileName, function() {
				terminalWindow.print("Loaded: " + fileName);
				terminalWindow.print("Algorithm name: " + algorithmName);
			}, function() {
				terminalWindow.print("Error loading " + fileName);
			});
		},
		"load [portalID]",
		"Loads a portal algorithm of a given id"),
	portal: createCommand(function(minNum, maxNum) {
			if (typeof portal !== "function") {
				terminalWindow.print("A valid portal algorithm has not been loaded");
				return;
			}
			minNum = Number(minNum);
			maxNum = Number(maxNum);
			if (isNaN(minNum) || typeof minNum !== "number") {
				terminalWindow.print("That is not a valid number");
			} else {
				minNum = floor(minNum);
				maxNum = floor(maxNum);
				if (isNaN(maxNum) || typeof maxNum !== "number") {
					terminalWindow.print(algorithmWrapper(minNum));
				} else {
					if (maxNum < minNum) {
						terminalWindow.print("That is not a valid number range");
					} else {
						for (let i = minNum; i <= maxNum; i++) {
							terminalWindow.print(algorithmWrapper(i))
						}
					}
				}
			}
		},
		"portal [number] {numberEnd}",
		"Runs the loaded portal algorithm with the given number or range of numbers"),
	list: createCommand(function() {
			if (typeof portal !== "function") {
				terminalWindow.print("A valid portal algorithm has not been loaded");
				return;
			}
			let listCode = algorithmCode.split("\n");
			for (let i = 0; i < listCode.length; i++) {
				terminalWindow.print(listCode[i]);
			}
		},
		"list",
		"Prints out the current portal algorithm's code"),
	size: createCommand(function() {
			if (typeof portal !== "function") {
				terminalWindow.print("A valid portal algorithm has not been loaded");
				return;
			}
			let code = algorithmCode.replace(RegExp("\s"), "");
			let listCode = algorithmCode.split("\n").map(String.prototype.replace, RegExp("\s"), "");
			terminalWindow.print("White space is uncounted");
			terminalWindow.print("Characters: " + code.length);
			terminalWindow.print("Lines.....: " + listCode.length);
			terminalWindow.print("Bytes.....: " + new Blob([code]).size);
		},
		"size",
		"Returns the size of the current portal algorithm"),
	time: createCommand(function(times = 500) {
			if (typeof portal !== "function") {
				terminalWindow.print("A valid portal algorithm has not been loaded");
				return;
			}
			times = Number(times);
			if (isNaN(times) || typeof times !== "number") {
				terminalWindow.print("That is not a valid number");
			} else {
				times = floor(times);
				if (!jsOpsDone) {
					testTime(times);
				}
				let time = testTime(times) / times;
				terminalWindow.print("portal ran " + times + " times taking an average of " + time + "μs");
			}
		},
		"time {repeats}",
		"Returns the speed of the current portal algorithm"),
	test: createCommand(function(range = 500) {
			if (typeof portal !== "function") {
				terminalWindow.print("A valid portal algorithm has not been loaded");
				return;
			}
			range = Number(range);
			if (isNaN(range) || typeof range !== "number" || range < 1) {
				terminalWindow.print("That is not a valid number");
			} else {
				range = floor(range);
				terminalWindow.print("Tests for inputs of 1 to " + range);
				let testResults = {
					errorlessRun: true,
					valueType: true,
					valueLoose: true,
					valueTight: true
				};
				for (let i = 1; i <= range; i++) { // noprotect
					testValue(i, testResults)
				}
				printTest(testResults);
				terminalWindow.print("Tests for the input 0");
				testResults = {
					errorlessRun: true,
					valueType: true,
					valueLoose: true,
					valueTight: true
				};
				testValue(0, testResults)
				printTest(testResults);
				terminalWindow.print("Tests for inputs of -1 to -" + range);
				testResults = {
					errorlessRun: true,
					valueType: true,
					valueLoose: true,
					valueTight: true
				};
				for (let i = -1; i >= -range; i--) { // noprotect
					testValue(i, testResults)
				}
				printTest(testResults);
			}
		},
		"test {rangeSize}",
		"Tests when and how the current portal algorithm's results are right with a range of numbers"),
};

function testStandard(num) {
	let str = "";
	let hello = Number.mod(num, 3) === 0;
	let goodbye = Number.mod(num, 5) === 0;
	if (hello) {
		if (goodbye) {
			return "hello goodbye";
		} else {
			return "hello";
		}
	} else {
		if (goodbye) {
			return "goodbye";
		} else {
			return num;
		}
	}
}

function printTest(results) {
	if (results.errorlessRun === results.valueType === results.valueLoose === results.valueTight) {
		terminalWindow.print("All..........: " + (results.errorlessRun ? "✓" : "✗"));
	} else {
		terminalWindow.print("Errorless Run: " + (results.errorlessRun ? "✓" : "✗"));
		terminalWindow.print("Value Type...: " + (results.valueType ? "✓" : "✗"));
		terminalWindow.print("Value Loose..: " + (results.valueLoose ? "✓" : "✗"));
		terminalWindow.print("Value Tight..: " + (results.valueTight ? "✓" : "✗"));
	}
}

function testValue(i, results) {
	let standard = testStandard(i);
	let result = algorithmWrapper(i);
	if (result instanceof Error) {
		results.errorlessRun = false;
	}
	if (typeof result !== typeof standard) {
		results.valueType = false;
	}
	let spaceReg = RegExp("\\s", "g");
	if (String(standard).toLowerCase() !== String(result).replace(spaceReg, "").toLowerCase()) {
		results.valueLoose = false;
	}
	if (result !== standard) {
		results.valueTight = false;
	}
}

function testTime(times) {
	let startTime = window.performance.now();
	for (let i = 1; i <= times; i++) { // noprotect
		algorithmWrapper(i);
	}
	let endTime = window.performance.now();
	return (endTime - startTime) * 1000; // in microseconds
}

function createCommand(func, usage, message) { //create command object
	let self = {};
	self.func = func; // function to run command
	self.usage = usage; // a string describing command's usage
	self.message = message; // a string describing the command's function
	return self;
}
