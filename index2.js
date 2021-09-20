var canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// get mouse position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80) * (canvas.width/80)
}
window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);
window.addEventListener('touchmove',
    function(event) {
         
mouse.x  = event.changedTouches[0].clientX;
mouse.y  = event.changedTouches[0].clientY;
      
    }
);

// create particle
class Particle {
    constructor(x, y, directionX, directionY, size, color ,id) {
        this.id = id
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    // method to draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
        ctx.fillStyle = "#c1c1c1"
       
        ctx.fill();
    }
    // check particle position, check mouse position, move the particle, draw the particle
    update() {
        //check if particle is still within canvas
        if (this.x > canvas.width || this.x < 0 ) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        //check collision detection - mouse position / particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        const angel = Math.atan2(
            mouse.y- this.y,
            mouse.x - this.x
          );
        if (distance < 100){
            this.directionX= Math.cos(angel ) 
            this.directionY= Math.sin(angel )
        }
        //chek coligion betwen particels
       
        
        // move particle
        this.x += this.directionX/;
        this.y += this.directionY/;
        // draw particle
        this.draw();

    }
 

    
}

// create particle array
function init() {
    
    let numberOfParticles = parseInt((canvas.width*canvas.height)/20000);
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        let size = 2;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() -.5) *2.5;
        let directionY = (Math.random() - .5) *2.5;
        let color = '#8C5523';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color , i));
    }
}

// check if particles are close enough to draw line between them
function connect(){
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = (( particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
            + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width/3) * (canvas.height/3)) {
                opacityValue = 1 - (distance/30000);
                let dx = mouse.x - particlesArray[b].x;
                let dy = mouse.y - particlesArray[b].y;
                let mouseDistance = Math.sqrt(dx*dx+dy*dy);
                
                ctx.strokeStyle='rgba(0,181,255,' + opacityValue + ')';
               
                ctx.lineWidth = .3;
                ctx.beginPath();
                ctx.moveTo(particlesArray[b].x, particlesArray[b].y);
                ctx.lineTo(particlesArray[a].x, particlesArray[a].y);
                ctx.stroke();
               
                
             
            }
        }
    
    }
}
var img = canvas.toDataURL("image/png");
var b = document.getElementById("foo");
// animation loop
function animate() {
    requestAnimationFrame(animate);
     ctx.clearRect(0,0,canvas.width, canvas.height);
    connect();
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }


    
}
// resize event
window.addEventListener('resize', 
    function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.height/80) * (canvas.height/80));
        init();
    }
);

// mouse out event
window.addEventListener('mouseout',
    function(){
        mouse.x = undefined;
        mouse.x = undefined;
    }
)

init();
animate();
