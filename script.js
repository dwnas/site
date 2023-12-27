
const cursorAmount = 2;
var song = 1;
var hasPlayed = false;
var audio;
var isMouseHover;
setTimeout(() => {
var isOverPiplup=document.getElementById("piplup")
isOverPiplup.addEventListener("mouseleave", function () {
  isMouseOver = false;
}, false);
isOverPiplup.addEventListener("mouseover", function () {
  isMouseHover = true
}, false);
}, 200);

window.onload = () => {
  cursor = Math.floor(Math.random() * cursorAmount)+1;
  var elementToChange = document.getElementsByTagName("html")[0];
 elementToChange.style.cursor = "url('./cursors/" + cursor + ".cur'), auto";
}

function play() {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }

    if (song==1) {
        audio = new Audio("./songs/1.mp3");
        song=2;
    } else if (song==2) {
        audio = new Audio("./songs/2.mp3");
        song=3;
    } else if (song==3) {
        audio = new Audio("./songs/3.mp3");
        song=4;
    } else if (song==4) {
        audio = new Audio("./songs/4.mp3");
        song=5;
    } else if (song==5) {
        audio = new Audio("./songs/5.mp3");
        song=null;
    } else {
        audio = null;
        song=1;
    }
    
    if (audio){
        audio.volume = 0.75;
        audio.play();
        hasPlayed=true;
    };
};

function playFirst() {
  if (!isMouseHover){
    if (!hasPlayed){
      play();
    }
  }
}


// oneko.js: https://github.com/adryd325/oneko.js
// all rights reserved

(function oneko() {
    const nekoEl = document.createElement("div");
  
    let nekoPosX = 32;
    let nekoPosY = 32;
  
    let mousePosX = 0;
    let mousePosY = 0;
  
    const isReducedMotion =
      window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
      window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
    
    if (isReducedMotion) {
      return;
    }
  
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation = null;
    let idleAnimationFrame = 0;
  
    const nekoSpeed = 10;
    const spriteSets = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratchSelf: [
        [-5, 0],
        [-6, 0],
        [-7, 0],
      ],
      scratchWallN: [
        [0, 0],
        [0, -1],
      ],
      scratchWallS: [
        [-7, -1],
        [-6, -2],
      ],
      scratchWallE: [
        [-2, -2],
        [-2, -3],
      ],
      scratchWallW: [
        [-4, 0],
        [-4, -1],
      ],
      tired: [[-3, -2]],
      sleeping: [
        [-2, 0],
        [-2, -1],
      ],
      N: [
        [-1, -2],
        [-1, -3],
      ],
      NE: [
        [0, -2],
        [0, -3],
      ],
      E: [
        [-3, 0],
        [-3, -1],
      ],
      SE: [
        [-5, -1],
        [-5, -2],
      ],
      S: [
        [-6, -3],
        [-7, -2],
      ],
      SW: [
        [-5, -3],
        [-6, -1],
      ],
      W: [
        [-4, -2],
        [-4, -3],
      ],
      NW: [
        [-1, 0],
        [-1, -1],
      ],
    };
  
    function init() {
      nekoEl.id = "oneko";
      nekoEl.ariaHidden = true;
      nekoEl.style.width = "32px";
      nekoEl.style.height = "32px";
      nekoEl.style.position = "fixed";
      nekoEl.style.pointerEvents = "none";
      nekoEl.style.backgroundImage = "url('./images/oneko.gif')";
      nekoEl.style.imageRendering = "pixelated";
      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
      nekoEl.style.zIndex = Number.MAX_VALUE;
  
      document.body.appendChild(nekoEl);
  
      document.addEventListener("mousemove", function (event) {
        mousePosX = event.clientX;
        mousePosY = event.clientY;
      });
      
      window.requestAnimationFrame(onAnimatonFrame);
    }
  
    let lastFrameTimestamp;
  
    function onAnimatonFrame(timestamp) {
      // Stops execution if the neko element is removed from DOM
      if (!nekoEl.isConnected) {
        return;
      }
      if (!lastFrameTimestamp) {
        lastFrameTimestamp = timestamp;
      }
      if (timestamp - lastFrameTimestamp > 100) {
        lastFrameTimestamp = timestamp
        frame()
      }
      window.requestAnimationFrame(onAnimatonFrame);
    }
  
    function setSprite(name, frame) {
      const sprite = spriteSets[name][frame % spriteSets[name].length];
      nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    }
  
    function resetIdleAnimation() {
      idleAnimation = null;
      idleAnimationFrame = 0;
    }
  
    function idle() {
      idleTime += 1;
  
      // every ~ 20 seconds
      if (
        idleTime > 10 &&
        Math.floor(Math.random() * 200) == 0 &&
        idleAnimation == null
      ) {
        let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
        if (nekoPosX < 32) {
          avalibleIdleAnimations.push("scratchWallW");
        }
        if (nekoPosY < 32) {
          avalibleIdleAnimations.push("scratchWallN");
        }
        if (nekoPosX > window.innerWidth - 32) {
          avalibleIdleAnimations.push("scratchWallE");
        }
        if (nekoPosY > window.innerHeight - 32) {
          avalibleIdleAnimations.push("scratchWallS");
        }
        idleAnimation =
          avalibleIdleAnimations[
            Math.floor(Math.random() * avalibleIdleAnimations.length)
          ];
      }
  
      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) {
            resetIdleAnimation();
          }
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) {
            resetIdleAnimation();
          }
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleAnimationFrame += 1;
    }
  
    function frame() {
      frameCount += 1;
      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);
  
      if (distance < nekoSpeed || distance < 48) {
        idle();
        return;
      }
  
      idleAnimation = null;
      idleAnimationFrame = 0;
  
      if (idleTime > 1) {
        setSprite("alert", 0);
        // count down after being alerted before moving
        idleTime = Math.min(idleTime, 7);
        idleTime -= 1;
        return;
      }
  
      let direction;
      direction = diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite(direction, frameCount);
  
      nekoPosX -= (diffX / distance) * nekoSpeed;
      nekoPosY -= (diffY / distance) * nekoSpeed;
  
      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);
  
      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
    }
  
    init();
  })();

function coolTitle(){
  
  randTitle = randomThings[Math.floor(Math.random() * randomThings.length)]
  setTimeout(coolTitle, randTitle.length*300 + 5000)
  base = "dawns | "
  var newTitle;
  var currentCharSet = "";
  var counterSet = 0;

  for (var i = 0; i < randTitle.length; i++) {
    setTimeout(() => {
    currentCharSet += randTitle[counterSet];
    newTitle = base + currentCharSet;
    counterSet+=1;
    document.title=newTitle
  }, 150*(i+1))

    setTimeout(() => {
      newTitle = newTitle.replace(/.$/, "");
      document.title=newTitle
    }, counterSet*150 + 5000 + i*150);
  }
}



let randomThings = [
  "( ´ ω ` )",
  "⸜(⸝⸝⸝´꒳`⸝⸝⸝)⸝",
  "(・`ω´・)",
  "〣( ºΔº )〣",
  "( : ౦ ‸ ౦ : )",
  "use vencord!!!",
  "cuhhhhh",
  "cookie free!",
  "piplup is cool",
  "let's all love lain",
  "explode",
  "did you know that in ter",
  "ur my favourite!",
  "h",
  "hhhhhhhhh",
  "thinking of smth funny",
  ":trolley:",
  "sponsored by raid shadow legends",
  "i'd just like to interject",
  "bit.ly/ligma_hotline",
  "dQw4w9WgXcQ",
  "rory in early 20s",
  "#ff85f7",
  "and you don't seem to understand",
  "av with that drip hoe"
];

coolTitle()