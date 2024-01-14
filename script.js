document.addEventListener("DOMContentLoaded", function() {
    let t = document.getElementById("menu-icon"),
        i = document.getElementById("menu-list"),
        j = document.querySelectorAll(".scroll-animation");
    
    let c = i.cloneNode(true);
    c.removeAttribute("id");
    c.classList.add("menu-blur");
    i.parentNode.after(c);

    t.addEventListener("click", function() {
        i.classList.toggle("show"), t.classList.toggle("rotate"), c.classList.toggle("show")
    })
    
    function k(j) {
        let i = j.getBoundingClientRect();
        return i.top >= 0 
            && i.left >= 0 
            && i.bottom <= (window.innerHeight || document.documentElement.clientHeight) 
            && i.right <= (window.innerWidth || document.documentElement.clientWidth)
    }

    window.addEventListener("scroll", function e() {
        for (let s = 0; s < t.length; s++) k(j[s]) && !j[s].classList.contains("scroll-active") && j[s].classList.add("scroll-active")
    })
})

fetch("https://api.lanyard.rest/v1/users/959534223293833256", {
    method: "GET"
})
    .then(response => response.json())
    .then(data => {
        let c = document.querySelector(".img-placeholder")
        let img = document.createElement("img");
        img.id = "center-image";
        img.alt = "Waza Icon";
        img.width = "150";
        img.height = "150";
        img.src = "https://cdn.discordapp.com/avatars/959534223293833256/"
            + data.data.discord_user.avatar 
            + ".webp?size=512";
        
        c.replaceWith(img)
    })

const canvas = document.getElementById("particles-container");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    if (window.innerHeight > 500) {
        canvas.height = window.innerHeight;
    } else {
        canvas.height = 500;
    }
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const balls = [];
const numBalls = 15;
let currentDate = new Date; currentDate = currentDate.getTime() / 1000

for (let i = 0; i < numBalls; i++) {
    let radius = 50 + Math.random() * 50;
    balls.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: radius,
        color: `rgba(170, 0, 0, 1)`,
        opacity: 0.3 + Math.random() * 0.6,
        dx: (Math.random() * 2 - 1) / (radius / 85),
        dy: (Math.random() * 2 - 1) / (radius / 85),
        dopacity: -0.005,
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => {
        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.x < 0 || ball.x > canvas.width) {
            ball.dx *= -1;
        }
        if (ball.y < 0 || ball.y > canvas.height) {
            ball.dy *= -1;
        }

        ball.opacity += ball.dopacity;

        if (ball.opacity <= 0.3 || ball.opacity >= 0.9) {
            ball.dopacity = -ball.dopacity;
        }

        ball.color = `rgba(170, 0, 0, ${ball.opacity})`;

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
    });
    requestAnimationFrame(animate);
}

animate();