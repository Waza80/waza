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

function videoPlay() {
    let video = document.getElementById('dsc-banner');

    video.currentTime = 0;
    video.play()
}

fetch("https://api.lanyard.rest/v1/users/959534223293833256", {
    method: "GET"
})
    .then(response => response.json())
    .then(data => {
        let c = document.getElementById("center-holder"),
            d = document.getElementById("dsc-waza").querySelector("#dsc-avatar")
        let img = document.createElement("img");
        img.id = "center-image";
        img.alt = "Waza Icon";
        img.width = "150";
        img.height = "150";
        img.src = "https://cdn.discordapp.com/avatars/959534223293833256/"
            + data.data.discord_user.avatar 
            + (data.data.discord_user.avatar.match('a_') ? ".gif?size=512" : ".webp?size=512");
        c.insertBefore(img, c.firstChild)

        let img2 = document.createElement("img");
        img2.id = "dsc-avatar";
        img2.alt = "Waza Icon";
        img2.width = "150";
        img2.height = "150";
        img2.src = "https://cdn.discordapp.com/avatars/959534223293833256/"
            + data.data.discord_user.avatar 
            + (data.data.discord_user.avatar.match('a_') ? ".gif?size=256" : ".webp?size=256");
        d.replaceWith(img2)
    })

fetch("https://api.lanyard.rest/v1/users/967182770331865088", {
    method: "GET"
})
    .then(response => response.json())
    .then(data => {
        let c = document.getElementById("center-holder"),
            d = document.getElementById("dsc-zeltales").querySelector("#dsc-avatar");
        let img = document.createElement("img");
        img.id = "center-image";
        img.alt = "Zelty Icon";
        img.width = "150";
        img.height = "150";
        img.src = "https://cdn.discordapp.com/avatars/967182770331865088/"
            + data.data.discord_user.avatar 
            + (data.data.discord_user.avatar.match('a_') ? ".gif?size=512" : ".webp?size=512");
        c.appendChild(img)
        let img2 = document.createElement("img");
        img2.id = "dsc-avatar";
        img2.alt = "Zelty Icon";
        img2.width = "150";
        img2.height = "150";
        img2.src = "https://cdn.discordapp.com/avatars/967182770331865088/"
            + data.data.discord_user.avatar 
            + (data.data.discord_user.avatar.match('a_') ? ".gif?size=256" : ".webp?size=256");
        d.replaceWith(img2)
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

const hearts = [];
const numHearts = 30;
function getSize() {return 20 + Math.random() * 40;}

for (let i = 0; i < numHearts; i++) {
    let size = getSize();
    hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: size,
        originalSize: size,
        color: `rgba(170, 0, 0, 1)`,
        beatings: 1,
        dx: 0,
        dy: -(0.5 + Math.random() * 2) / (size / 55),
        dbeating: -0.75,
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hearts.forEach(heart => {
        heart.x += heart.dx;
        heart.y += heart.dy;

        if (heart.x < (0 - heart.size) || (heart.x + heart.size) > canvas.width) {
            heart.dx *= -1;
        }

        if (heart.y < (0 - heart.size)) {
            let newSize = getSize();
            heart.size = newSize;
            heart.originalSize = newSize;
            heart.x = canvas.width * Math.random();
            heart.y = canvas.height + heart.size;
            heart.dy = -(0.5 + Math.random() * 2) / (heart.size / 55);
        }

        if (heart.beatings <= 4) {
            heart.size += heart.dbeating;

            if (heart.originalSize < heart.size * 1 || heart.originalSize > heart.size * 1.2) {
                heart.dbeating = -heart.dbeating;
                heart.beatings++
            }
        }

        if (heart.beatings >= 4 && heart.beatings != 5) {
            heart.beatings = 5;
            setTimeout(function() {heart.beatings = 0}, 1000);
        }

        ctx.save();
        ctx.beginPath();
        let topCurveHeight = heart.size * 0.3;
        ctx.moveTo(heart.x, heart.y + topCurveHeight);
    
        // top left curve
        ctx.bezierCurveTo(
            heart.x, heart.y, 
            heart.x - heart.size / 2, heart.y, 
            heart.x - heart.size / 2, heart.y + topCurveHeight
        );
      
        // bottom left curve
        ctx.bezierCurveTo(
            heart.x - heart.size / 2, heart.y + (heart.size + topCurveHeight) / 2, 
            heart.x, heart.y + (heart.size + topCurveHeight) / 1.5, 
            heart.x, heart.y + heart.size
        );
      
        // bottom right curve
        ctx.bezierCurveTo(
            heart.x, heart.y + (heart.size + topCurveHeight) / 1.5, 
            heart.x + heart.size / 2, heart.y + (heart.size + topCurveHeight) / 2, 
            heart.x + heart.size / 2, heart.y + topCurveHeight
        );
      
        // top right curve
        ctx.bezierCurveTo(
            heart.x + heart.size / 2, heart.y, 
            heart.x, heart.y,
            heart.x, heart.y + topCurveHeight
        );
      
        ctx.closePath();
        ctx.fillStyle = heart.color;
        ctx.fill();
        ctx.restore();
    });
    requestAnimationFrame(animate);
}

animate();