function myMainFunction() {
	function zaokrl(val, decimals) {
		return +(Math.round(+(val.toFixed(decimals) + "e+" + decimals)) + "e-" + decimals);
	}

	function fallbackCopyTextToClipboard(text) {
		var textArea = document.createElement("textarea");
		textArea.value = text;

		// Avoid scrolling to bottom
		textArea.style.top = "0";
		textArea.style.left = "0";
		textArea.style.position = "fixed";

		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		try {
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';
			console.log('Fallback: Copying text command was ' + msg);
		} catch (err) {
			console.error('Fallback: Oops, unable to copy', err);
		}

		document.body.removeChild(textArea);
	}

	function stringToColour(str) {
		var hash = 0;
		for (var i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		var colour = '#';
		for (var i = 0; i < 3; i++) {
			var value = (hash >> (i * 8)) & 0xFF;
			colour += ('00' + value.toString(16)).substr(-2);
		}
		return colour;
	}

	function zrobClasse(nazwa, pola) { //tworzy kod dla prostej klasy o polach rozdzielonych przecinakmi i o podanej nazwie
		var polaArr = pola.split(",");
		var wypluw = "class " + nazwa + " {\n";
		wypluw += "\tconstructor(";
		for (let i = 0; i < polaArr.length; i++) {
			wypluw += polaArr[i] + ", ";
		}
		wypluw = wypluw.slice(0, -2);
		wypluw += ") {\n";
		for (let i = 0; i < polaArr.length; i++) {
			wypluw += "\t\tthis." + polaArr[i] + " = " + polaArr[i] + ";\n";
		}
		wypluw += "\t}\n";
		wypluw += "}";
		fallbackCopyTextToClipboard(wypluw);
	}
	// zrobClasse("test","sus,amogus,baka,chungus");

	class test {
		constructor(sus, amogus, baka, chungus) {
			this.sus = sus;
			this.amogus = amogus;
			this.baka = baka;
			this.chungus = chungus;
		}
	}

	function triangleWave(x, width, offset) {
		return Math.round(10000 * (Math.abs(Math.abs(x - width / 2 - offset) + Math.abs(x + width / 2 - offset)) / 2 - Math.abs(x - offset))) / 10000;
	}

	// var r = document.querySelector(':root');

	// function hotKey(event) {
	//     switch (event.key) {
	//         case "1":
	//             r.style.setProperty('--lewo', "100%");
	//             r.style.setProperty('--s1', "1");
	//             r.style.setProperty('--s2', "0");
	//             r.style.setProperty('--s3', "0");
	//             break;
	//         case "2":
	//             r.style.setProperty('--lewo', "0%");
	//             r.style.setProperty('--s1', "0");
	//             r.style.setProperty('--s2', "1");
	//             r.style.setProperty('--s3', "0");
	//             break;
	//         case "3":
	//             r.style.setProperty('--lewo', "-100%");
	//             r.style.setProperty('--s1', "0");
	//             r.style.setProperty('--s2', "0");
	//             r.style.setProperty('--s3', "1");
	//             break;
	//     }
	// }

	// document.addEventListener("keydown", hotKey, false);

	const r = document.querySelector(':root');
	const trueSlider = document.querySelector('.slider');
	const slider = document.querySelector('body');
	const container = document.querySelector('.slider_items');
	const s1 = document.getElementById("Screen_icons_1");
	const s2 = document.getElementById("Screen_icons_2");
	const s3 = document.getElementById("Screen_icons_3");

	var sliWidth = trueSlider.getClientRects()[0].width;
	var sliX = trueSlider.getClientRects()[0].x;
	container.style.left = `${-sliWidth}px`;
	var target = -sliWidth, current = -sliWidth, isPressed = 0, offset = 0, slotPos = 0;

	var slotPosReal = -target / sliWidth;
	s1.style.opacity = triangleWave(slotPosReal, 2, 0);
	s2.style.opacity = triangleWave(slotPosReal, 2, 1);
	s3.style.opacity = triangleWave(slotPosReal, 2, 2);

	const options = {
		listener: slider,
		multiplier: 1
	};
	const drag = new Drag(options);

	drag.on(calc);

	window.addEventListener("resize", () => {
		// debugger
		container.style.transition = "none";
		sliWidth = trueSlider.getClientRects()[0].width;
		sliX = trueSlider.getClientRects()[0].x;
		target = container.getClientRects()[0].x - sliX;
		container.style.left = `${sliWidth * slotPos}px`;
		// console.log(`slix: ${zaokrl(sliX, 1)},\ttarget: ${target}`);
	});
	['mousedown', 'touchstart'].forEach(function (elem) {
		slider.addEventListener(elem, () => {
			isPressed = 1;
			container.style.transition = "none";
			r.style.setProperty('--trans', "none");
		});
	});
	['mouseup', 'touchend'].forEach(function (elem) {
		slider.addEventListener(elem, () => {
			isPressed = 0;
			container.style.transition = "left 1s ease 0s";
			r.style.setProperty('--trans', "opacity 1s ease 0s");
			slotPos = Math.round(target / sliWidth);
			container.style.left = `${sliWidth * slotPos}px`;
			s1.style.opacity = triangleWave(-slotPos, 2, 0);
			s2.style.opacity = triangleWave(-slotPos, 2, 1);
			s3.style.opacity = triangleWave(-slotPos, 2, 2);
		});
	});

	function move() {
		if (isPressed) {
			offset = (target - current);
			current += offset;
			current = Math.min(Math.max(-2 * sliWidth, current), 0);
			container.style.left = `${current}px`;

			slotPosReal = -target / sliWidth;
			s1.style.opacity = triangleWave(slotPosReal, 2, 0);
			s2.style.opacity = triangleWave(slotPosReal, 2, 1);
			s3.style.opacity = triangleWave(slotPosReal, 2, 2);
			// console.log(isPressed);
		}
		else {
			// theLeft = container.style.left;
			// target = Number(theLeft.substr(0, theLeft.length-2));
			target = container.getClientRects()[0].x - sliX;
		}
		requestAnimationFrame(move);
	}
	requestAnimationFrame(move);

	function calc(event) {
		target += event.X;
		target = Math.min(Math.max(-2 * sliWidth, target), 0);
		requestAnimationFrame(move);
	}

	slotPos = Math.round(target / sliWidth);

	document.querySelectorAll("img").forEach(function (daElem, daI, daArr) {
		daElem.ondragstart = function () { return false; };
	});

	trueSlider.style.opacity = 1;
	document.querySelector('.loading').style.opacity = 0;

	console.log('Zrobione!');
}
window.addEventListener("load", (event) => {
	myMainFunction();
});