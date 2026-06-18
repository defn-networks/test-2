const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Scale everything up to make the pixel art chunky
const SCALE = 3; 

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// --- Player Object ---
// The 20-something-year-old girl
const player = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 1.5,
    width: 16 * SCALE, // Placeholder sprite size
    height: 32 * SCALE,
    speed: 4,
    dx: 0,
    dy: 0
};

// --- Input Handling ---
const keys = { w: false, a: false, s: false, d: false };

window.addEventListener('keydown', (e) => {
    if (e.key === 'w' || e.key === 'ArrowUp') keys.w = true;
    if (e.key === 'a' || e.key === 'ArrowLeft') keys.a = true;
    if (e.key === 's' || e.key === 'ArrowDown') keys.s = true;
    if (e.key === 'd' || e.key === 'ArrowRight') keys.d = true;
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 'ArrowUp') keys.w = false;
    if (e.key === 'a' || e.key === 'ArrowLeft') keys.a = false;
    if (e.key === 's' || e.key === 'ArrowDown') keys.s = false;
    if (e.key === 'd' || e.key === 'ArrowRight') keys.d = false;
});

// --- Audio / Interaction Hook ---
// Useful for triggering site-specific noise textures or interactive text
function checkInteractions() {
    // Example: If player walks near the misty forest mural fence
    if (player.y < canvas.height / 2 + 50 && player.x < canvas.width / 2) {
        // console.log("Trigger mural inspection text or spatial audio layer here");
    }
}

// --- Draw Layers ---
function drawScene() {
    // 1. Sky (Bright white overcast background)
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Background Trees & Dark-Roofed Structure
    ctx.fillStyle = '#2d4a22'; // Dark tropical greens
    ctx.fillRect(0, canvas.height * 0.2, canvas.width, canvas.height * 0.3);
    
    // Structure silhouette
    ctx.fillStyle = '#1a1a1a'; 
    ctx.fillRect(canvas.width * 0.6, canvas.height * 0.25, 150, 100); 

    // 3. The Fence (Alternating wood and mesh mural)
    const fenceY = canvas.height * 0.45;
    const fenceHeight = canvas.height * 0.2;
    
    // Baseboard
    ctx.fillStyle = '#343a40'; // Solid dark grey base
    ctx.fillRect(0, fenceY + fenceHeight - 20, canvas.width, 20);

    for (let i = 0; i < canvas.width; i += 200) {
        // Reddish-brown wooden planks
        ctx.fillStyle = '#5c2c16';
        ctx.fillRect(i, fenceY, 100, fenceHeight - 20);
        
        // Mesh panels (Misty forest mural)
        ctx.fillStyle = '#6c757d';
        ctx.fillRect(i + 100, fenceY, 100, fenceHeight - 20);
        
        // Directional arrow (pointing left)
        ctx.fillStyle = '#d2b48c';
        ctx.fillRect(i + 30, fenceY + 50, 40, 15);
    }

    // 4. Ground / Path (Light grey stone tiles, sweeping curve)
    ctx.fillStyle = '#8f9593';
    ctx.beginPath();
    ctx.moveTo(0, fenceY + fenceHeight);
    ctx.quadraticCurveTo(canvas.width / 2, canvas.height, canvas.width, canvas.height * 0.8);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fill();

    // 5. Draw Player (Sorting player behind extreme foreground)
    ctx.fillStyle = '#d9534f'; // Placeholder for the girl sprite
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // 6. Foreground (Monstera plant on the right)
    ctx.fillStyle = '#153118';
    ctx.beginPath();
    ctx.arc(canvas.width, canvas.height, 250, 0, Math.PI * 2);
    ctx.fill();
}

// --- Game Loop ---
function update() {
    // Movement logic
    if (keys.w) player.dy = -player.speed;
    else if (keys.s) player.dy = player.speed;
    else player.dy = 0;

    if (keys.a) player.dx = -player.speed;
    else if (keys.d) player.dx = player.speed;
    else player.dx = 0;

    // Apply movement
    player.x += player.dx;
    player.y += player.dy;

    // Boundaries (Keep her on the path roughly)
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < canvas.height * 0.5) player.y = canvas.height * 0.5; // Stop at fence
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;

    checkInteractions();

    // Render step
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScene();

    requestAnimationFrame(update);
}

// Start the loop
update();
