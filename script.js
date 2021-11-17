const canvas = document.querySelector('canvas');
var dotRadius = 10;
var amplitude = 200;
const ctx = canvas.getContext('2d');
var iW = window.innerWidth;
var shouldDrawLines = false;
var dots;
var frameNumber = 0;
var speedMult = 1;

addEventListener('resize', init);

class Dot {
    constructor(x, freq) {
        this.x = x;
        this.freq = freq;
    }

	update(frameNo){
        this.y = dotRadius + amplitude + (amplitude * Math.sin(frameNo * this.freq));
		this.draw();
	};

	draw(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, dotRadius, 0, Math.PI * 2, false);
		ctx.fillStyle = "black";
		ctx.fill();
		ctx.closePath();
	};
}

function init() {
    canvas.width = window.innerWidth;
    setAmp();
    frameNumber = 0;
    const numDots = Math.floor(canvas.width / (dotRadius * 2));
    dots = [...Array(numDots).keys()].map(n => new Dot(n * dotRadius * 2, n / 2000));
}

function animate() {
    frameNumber += speedMult;
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	dots.forEach(dot => {
	    dot.update(frameNumber);
	});
    if (shouldDrawLines) drawLines();
};

function drawLines() {
    ctx.lineWidth = dotRadius / 2;
    ctx.beginPath();
    ctx.moveTo(dots[0].x, dots[0].y);
    dots.forEach(dot => {
        ctx.lineTo(dot.x, dot.y);
    });
    ctx.stroke();
}

function setAmp(amp = amplitude) {
    amplitude = amp;
    canvas.height = (amplitude * 2) + (dotRadius * 4);
}

init();
animate();