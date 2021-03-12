// entire svg
let entireBox = document.querySelector("#svg");

// just the colored box
let myBox = document.querySelector("#box");

// randomize colors on start
let r = Math.random() * 50 + 25;
let g = Math.random() * 50 + 25;
let b = Math.random() * 50 + 25;

// color string
color = `rgb(${r}%,${g}%,${b}%)`;
myBox.style.fill = color;

let mouseState = false;
// mouse down
entireBox.onmousedown = () => {
	//console.log("down");
	mouseState = true;
	myBox.style.fill = "#bbb";
};

entireBox.onmouseup = () => {
	mouseState = false;
};

// mouse pos variable
let x;
let y;

// drag box
onmousemove = () => {
	if (mouseState) {
		// get size in px of svg
		let myWidth = entireBox.getBoundingClientRect().width;
		let myHeight = entireBox.getBoundingClientRect().height;
		//console.log("width: " + myWidth + " height: " + myHeight);

		// mouse horizontal and vertical coordinates
		x = event.clientX;
		y = event.clientY;
		//console.log(x, y);

		// use mouse pos and offset by 1/2 size of svg
		entireBox.style.left = `${x - myWidth / 2}px`;
		entireBox.style.top = `${y - myHeight / 2}px`;
	}
};

// mouse up
entireBox.onmouseup = () => {
	//console.log("up");
	myBox.style.fill = color;
	mouseState = false;
	entireBox.style.transform = null;
};

// spacebar to trigger synth and animation
let triggerUp = (document.body.onkeydown = function (event) {
	if (event.keyCode == 32) {
		// animation here - color change for now
		myBox.style.fill = "#000";
	}
});

let triggerDown = (document.body.onkeyup = function (event) {
	if (event.keyCode == 32) {
		// invert y pos to get low-high frequncy
		let frequency = window.innerHeight - y;
		// get frequency based on mouse pos
		Tone.start();
		synth.triggerAttackRelease(frequency, "8n");
		console.log(frequency);

		// sets initial color
		myBox.style.fill = color;
	}
});

const synth = new Tone.Synth().toDestination();
synth.volume.value = -12;
