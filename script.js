document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const snowflakes = [];

    function createSnowflake() {
        const x = Math.random() * canvas.width;
        const speed = 5 + Math.random() * 3;
        const size = 1 + Math.random() * 3;
        snowflakes.push({x, y: 0, speed, size});
    }

    function updateAndDrawSnowflakes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < snowflakes.length; i++) {
            const flake = snowflakes[i];
            flake.y += flake.speed;
            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();

            if (flake.y > canvas.height) {
                snowflakes[i] = {x: Math.random() * canvas.width, y: 0, speed: flake.speed, size: flake.size};
            }
        }

        requestAnimationFrame(updateAndDrawSnowflakes);
    }

    function addSnowflakes() {
        const newFlakes = window.innerWidth / 200;
        for (let i = 0; i < newFlakes; i++) {
            createSnowflake();
        }
    }

    canvas.addEventListener('mousemove', () => addSnowflakes());

    addSnowflakes();
    updateAndDrawSnowflakes();
});
