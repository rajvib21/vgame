const platformImg = new Image();
platformImg.src = 'platform1.png';

const bgImg = new Image();
bgImg.src = 'grumpy.png';

const winBgImg = new Image();
winBgImg.src = 'sunshine.png';

const playerImg = new Image();
playerImg.src = 'peng.png';

const heartImg = new Image();
heartImg.src = 'heart.png';



// Platform Image Load Check
platformImg.onload = () => console.log("✅ Platform image loaded successfully!");
platformImg.onerror = () => console.error("❌ Failed to load platform image. Check path.");

// Background Image Load Check
let bgLoaded = false;
bgImg.onload = () => {
    console.log("✅ Background image loaded successfully!");
    bgLoaded = true;
};
bgImg.onerror = () => console.error("❌ Failed to load background image. Check path.");

// Winning Background Image Load Check
let winBgLoaded = false;
winBgImg.onload = () => {
    console.log("✅ Winning background image loaded successfully!");
    winBgLoaded = true;
};
winBgImg.onerror = () => console.error("❌ Failed to load winning background image. Check path.");

// Player Image Load Check
let playerImgLoaded = false;
playerImg.onload = () => {
    console.log("✅ Player image loaded successfully!");
    playerImgLoaded = true;
};
playerImg.onerror = () => console.error("❌ Failed to load player image. Check path.");

// Selecting canvas and getting 2D context
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Setting canvas size
canvas.width = 1366;
canvas.height = 768;

// Gravity constant
const gravity = 1.0;

// ✅ Background Class (for seamless background effect)
class Background {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.width = canvas.width;
        this.height = canvas.height;
        this.isWinning = false;
    }
    
    draw() {
        if (this.isWinning && winBgLoaded) {
            c.drawImage(winBgImg, 0, 0, this.width, this.height);
        } else if (bgLoaded) {
            c.drawImage(bgImg, this.position.x, this.position.y, this.width, this.height);
            c.drawImage(bgImg, this.position.x + this.width, this.position.y, this.width, this.height);
        }
    }
    
    update(player) {
        if (!this.isWinning) {
            if (player.position.x > canvas.width / 2) {
                this.position.x = -(player.position.x - canvas.width / 2) % this.width;
            }
        }
        this.draw();
    }

    setWinningBackground() {
        this.isWinning = true;
    }
}

// ✅ Player Class
class Player {
    constructor() {
        this.position = { x: 100, y: 100 };
        this.velocity = { x: 0, y: 0 };
        this.width = 120;
        this.height = 120;
    }

    draw() {
        if (playerImgLoaded) {
            c.drawImage(playerImg, this.position.x, this.position.y, this.width, this.height);
        } else {
            c.fillStyle = 'red';
            c.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.draw();

        // Gravity effect
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0;
        }
    }
}

// ✅ Platform Class
class Platform {
    constructor({ x, y }) {
        this.position = { x, y };
        this.width = 500;
        this.height = 100;
    }

    draw() {
        if (platformImg.complete && platformImg.naturalWidth !== 0) {
            c.drawImage(platformImg, this.position.x, this.position.y, this.width, this.height);
        } else {
            console.warn("⚠️ Platform image not loaded yet.");
        }
    }
}

class Heart {
  constructor({ x, y }) {
      this.position = { x, y };
      this.width = 40;
      this.height = 40;
      this.collected = false;
  }

  draw() {
    if (!this.collected) { 
        if (heartImg.complete && heartImg.naturalWidth !== 0) {
            c.drawImage(heartImg, this.position.x, this.position.y, this.width, this.height);
        } else {
            console.warn("⚠️ Heart image not loaded yet.");
            // Fallback in case the heart image is not available
            c.fillStyle = "red";
            c.beginPath();
            c.arc(this.position.x + 20, this.position.y + 20, 20, 0, Math.PI * 2);
            c.fill();
        }
    }
}

}


// ✅ Note Class (Messages after every 4 hearts)
class Note {
  constructor({ x, y, text }) {
      this.position = { x, y };
      this.text = text;
  }

  draw() {
      c.fillStyle = "white";
      c.font = "20px Arial";
      c.fillText(this.text, this.position.x, this.position.y);
  }
}

// ✅ Create player, platforms, and background
const player = new Player();
const background = new Background();
const platforms = [
    new Platform({ x: 0, y: 550 }),
    new Platform({ x: 500, y: 550 }),
    new Platform({ x: 1000, y: 550 }),
    new Platform({ x: 1500, y: 550 }),
    new Platform({ x: 2000, y: 550 }),
    new Platform({ x: 2500, y: 550 }),
    new Platform({ x: 3000, y: 550 }),
    new Platform({ x: 3500, y: 550 }),
    new Platform({ x: 4000, y: 550 }),
    new Platform({ x: 4500, y: 550 }),
    new Platform({ x: 5000, y: 550 }),
    new Platform({ x: 5500, y: 550 }),
    new Platform({ x: 6000, y: 550 }),
    new Platform({ x: 6500, y: 550 }),
    new Platform({ x: 2000, y: 300 }),
    new Platform({ x: 4000, y: 200 }),
    new Platform({ x: 5800, y: 250 }),
    new Platform({ x: 7000, y: 550 })
];


// ✅ Controls
const keys = {
    right: { pressed: false },
    left: { pressed: false }
};
const hearts = [];
const notes = [];
const messages = [
    ". ",
    
    
   
    
    " Yk you also do the same as this penguin—  wins my heart daily just by being YOU! 💕🥺 when you came into my life, you made me feel so loved. 💖 You make my heart smile every day, you make me feel like the luckiest, and that's how you turned my cloudy weather into sunshine! 🌥➡️☀️ (Btw, that sun is me haa 😉🌞)",
  "This was my heart before...",
   " You must be thinking—why is it so dark here? 🌑👀",
    "Yeahhh, you did it again! You won my heart!! 🏆💗"
];

for (let i = 0; i < 20; i++) {
    const platform = platforms[i % platforms.length]; // Distribute across platforms
    const heartX = platform.position.x + (i % 4) * 100 + 50; // Spread along platform
    const heartY = platform.position.y - 50; // Place slightly above platform

    hearts.push(new Heart({ x: heartX, y: heartY }));

    if ((i + 1) % 5 === 0) { // Display messages at every 5th heart
        const messageIndex = (i + 1) / 5 - 1;
        notes.push(new Note({
            x: heartX,
            y: heartY - 30,
            text: messages[messageIndex] // Add corresponding message
        }));
    }
}


let scrollOffset = 0;

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    background.update(player);
    player.update();
    platforms.forEach(platform => platform.draw());

    hearts.forEach(heart => heart.draw());
    notes.forEach(note => note.draw());

    // ✅ Check Heart Collection
    hearts.forEach(heart => {
        if (!heart.collected &&
            player.position.x + player.width >= heart.position.x &&
            player.position.x <= heart.position.x + heart.width &&
            player.position.y + player.height >= heart.position.y &&
            player.position.y <= heart.position.y + heart.height) {
            heart.collected = true;
            console.log("❤️ Heart collected!");
        }
    });
    // ✅ Player Movement Logic
    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5;
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5;
    } else {
        player.velocity.x = 0;

        if (keys.right.pressed) {
            scrollOffset += 5;
            platforms.forEach(platform => platform.position.x -= 5);
            hearts.forEach(heart => heart.position.x -= 5);
            notes.forEach(note => note.position.x -= 5);
        } else if (keys.left.pressed) {
            scrollOffset -= 5;
            platforms.forEach(platform => platform.position.x += 5);
            hearts.forEach(heart => heart.position.x += 5);
            notes.forEach(note => note.position.x += 5);
        }
    }

    // ✅ Platform Collision Detection
    platforms.forEach(platform => {
        if (
            player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width
        ) {
            player.velocity.y = 0;
        }
    });

    // ✅ Winning Condition
    if (scrollOffset > 7000) {
        console.log("🎉 You win!!!!!!");
        background.setWinningBackground(); 
    
        // Delay the redirection by 2 seconds for better effect
        setTimeout(() => {
            window.location.href = "final.html";
        }, 2000);
    }
    
}

// ✅ Start the game immediately
animate();

// ✅ Event Listeners for Movement
addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'a':
            keys.left.pressed = true;
            break;
        case 'w':
            if (player.velocity.y === 0) {
                player.velocity.y = -20;
            }
            break;
        case 'd':
            keys.right.pressed = true;
            break;
    }
});

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'a':
            keys.left.pressed = false;
            break;
        case 'd':
            keys.right.pressed = false;
            break;
    }
});
