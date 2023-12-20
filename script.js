document.addEventListener("DOMContentLoaded", function() {
    let t = document.getElementById("menu-icon"),
        i = document.getElementById("topbar").getElementsByTagName("ul")[0],
        j = document.querySelectorAll(".scroll-animation");
    
    t.addEventListener("click", function() {
        i.classList.toggle("show"), t.classList.toggle("rotate")
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
        document.getElementById("center-image").src = "https://cdn.discordapp.com/avatars/959534223293833256/"
            + data.data.discord_user.avatar 
            + ".webp?size=512";
    })

const canvas = document.getElementById("particles-container");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const balls = [];
const numBalls = 15;

for (let i = 0; i < numBalls; i++) {
    let radius = 50 + Math.random() * 50;
    balls.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: radius,
        color: `rgba(170, 0, 0, 1)`,
        opacity: 1.1,
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

        if (ball.opacity <= 0.3 || ball.opacity >= 1.1 + Math.random() * 2) {
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

/*
mes

const zeltr = zeltA;
(function (L, A) {
    const g = zeltA;
    const a = L();
    while (!![]) {
        try {
            const F = parseInt(g(0x1d5)) / 0x1 * (-parseInt(g(0x1da)) / 0x2) + -parseInt(g(0x1d7)) / 0x3 * (parseInt(g(0x1e2)) / 0x4) + parseInt(g(0x1ea)) / 0x5 * (-parseInt(g(0x1d8)) / 0x6) + -parseInt(g(0x1e4)) / 0x7 + -parseInt(g(0x1f8)) / 0x8 * (-parseInt(g(0x203)) / 0x9) + -parseInt(g(0x1e3)) / 0xa + parseInt(g(0x1fc)) / 0xb * (parseInt(g(0x1dc)) / 0xc);
            if (F === A) {
                break;
            } else {
                a['push'](a['shift']());
            }
        } catch (S) {
            a['push'](a['shift']());
        }
    }
}(zeltL, 0xead5d));
let canvas = document[zeltr(0x1f4)](zeltr(0x1fe));
let ctx = canvas[zeltr(0x1f2)]('2d');
function setCanvasDimensions() {
    const C = zeltr;
    canvas[C(0x1ec)] = window[C(0x1de)];
    canvas[C(0x1d6)] = window[C(0x1f3)];
}
setCanvasDimensions();
window[zeltr(0x1eb)]('resize', function () {
    const Y = zeltr;
    setCanvasDimensions();
    ctx = canvas[Y(0x1f2)]('2d');
    ctx['globalCompositeOperation'] = Y(0x1d9);
});
let backgroundColors = [
    zeltr(0x204),
    zeltr(0x204)
];
let colors = [
    [
        zeltr(0x1dd),
        zeltr(0x1dd)
    ],
    [
        zeltr(0x1dd),
        '#3498db'
    ],
    [
        zeltr(0x1ff),
        '#3498db'
    ]
];
let count = window[zeltr(0x1de)] >= 0x3e0 ? 0x1e : 0xc;
let blur = [
    0xc,
    0x46
];
let radius = [
    0x1,
    0x78
];
function setCanvasDimensions() {
    const c = zeltr;
    canvas[c(0x1ec)] = window['innerWidth'];
    canvas[c(0x1d6)] = window[c(0x1f3)];
}
setCanvasDimensions();
window['addEventListener'](zeltr(0x1e0), function () {
    const N = zeltr;
    setCanvasDimensions();
    ctx = canvas[N(0x1f2)]('2d');
    ctx['globalCompositeOperation'] = N(0x1d9);
    count = window[N(0x1de)] >= 0x3e0 ? 0x1e : 0xf;
});
ctx['clearRect'](0x0, 0x0, canvas[zeltr(0x1ec)], canvas[zeltr(0x1d6)]);
ctx[zeltr(0x1ed)] = zeltr(0x1d9);
function zeltL() {
    const W = [
        'px)',
        'floor',
        'clearRect',
        '9bOZFPd',
        '#1a1a1a',
        'blur',
        '1PmLzxM',
        'height',
        '6JQpYUE',
        '126ARVuXl',
        'lighter',
        '3479846JFGZsx',
        'forEach',
        '1560612QkegDg',
        '#3498db',
        'innerWidth',
        'fill',
        'resize',
        'initialYDirection',
        '961804zqnIpL',
        '673500rThUEP',
        '8862875JoRRNc',
        'fillStyle',
        'round',
        'fillRect',
        'blur(',
        'beginPath',
        '60455GgCxPD',
        'addEventListener',
        'width',
        'globalCompositeOperation',
        'filter',
        'colorTwo',
        'createLinearGradient',
        'addColorStop',
        'getContext',
        'innerHeight',
        'getElementById',
        'closePath',
        'arc',
        'requestAnimationFrame',
        '5908120cJpzmz',
        'initialXDirection',
        'radius',
        'initialBlurDirection',
        '341mSrZEL',
        'gradient',
        'canvas',
        '#2ecc71'
    ];
    zeltL = function () {
        return W;
    };
    return zeltL();
}
let grd = ctx[zeltr(0x1f0)](0x0, canvas['height'], canvas[zeltr(0x1ec)], 0x0);
function zeltA(L, A) {
    const a = zeltL();
    zeltA = function (F, S) {
        F = F - 0x1d4;
        let T = a[F];
        return T;
    };
    return zeltA(L, A);
}
grd[zeltr(0x1f1)](0x0, backgroundColors[0x0]);
grd['addColorStop'](0x1, backgroundColors[0x1]);
ctx[zeltr(0x1e5)] = grd;
ctx[zeltr(0x1e7)](0x0, 0x0, canvas[zeltr(0x1ec)], canvas[zeltr(0x1d6)]);
let items = [];
while (count--) {
    let thisRadius = rand(radius[0x0], radius[0x1]);
    let thisBlur = rand(blur[0x0], blur[0x1]);
    let x = rand(-0x64, canvas[zeltr(0x1ec)] + 0x64);
    let y = rand(-0x64, canvas['height'] + 0x64);
    let colorIndex = Math[zeltr(0x201)](rand(0x0, 0x12b) / 0x64);
    let colorOne = colors[colorIndex][0x0];
    let colorTwo = colors[colorIndex][0x1];
    ctx[zeltr(0x1e9)]();
    ctx[zeltr(0x1ee)] = zeltr(0x1e8) + thisBlur + zeltr(0x200);
    let grd = ctx[zeltr(0x1f0)](x - thisRadius / 0x2, y - thisRadius / 0x2, x + thisRadius, y + thisRadius);
    grd[zeltr(0x1f1)](0x0, colorOne);
    grd[zeltr(0x1f1)](0x1, colorTwo);
    ctx[zeltr(0x1e5)] = grd;
    ctx[zeltr(0x1df)]();
    ctx[zeltr(0x1f6)](x, y, thisRadius, 0x0, Math['PI'] * 0x2);
    ctx[zeltr(0x1f5)]();
    let directionX = Math[zeltr(0x1e6)](rand(-0x63, 0x63) / 0x64);
    let directionY = Math['round'](rand(-0x63, 0x63) / 0x64);
    items['push']({
        'x': x,
        'y': y,
        'blur': thisBlur,
        'radius': thisRadius,
        'initialXDirection': directionX,
        'initialYDirection': directionY,
        'initialBlurDirection': directionX,
        'colorOne': colorOne,
        'colorTwo': colorTwo,
        'gradient': [
            x - thisRadius / 0x2,
            y - thisRadius / 0x2,
            x + thisRadius,
            y + thisRadius
        ]
    });
}
function changeCanvas(L) {
    const H = zeltr;
    ctx[H(0x202)](0x0, 0x0, canvas[H(0x1ec)], canvas[H(0x1d6)]);
    let A, a, F;
    if (window[H(0x1de)] >= 0x3e0) {
        A = 0x1;
        a = 0x1;
        F = 0x1;
    } else {
        A = 0.5;
        a = 0.5;
        F = 0.5;
    }
    items[H(0x1db)](function (S) {
        const O = H;
        if (S['x'] + S[O(0x1f9)] * A >= canvas['width'] && S['initialXDirection'] !== 0x0 || S['x'] + S[O(0x1f9)] * A <= 0x0 && S[O(0x1f9)] !== 0x0) {
            S[O(0x1f9)] = S[O(0x1f9)] * -0x1;
        }
        if (S['y'] + S[O(0x1e1)] * a >= canvas[O(0x1d6)] && S['initialYDirection'] !== 0x0 || S['y'] + S['initialYDirection'] * a <= 0x0 && S[O(0x1e1)] !== 0x0) {
            S[O(0x1e1)] = S['initialYDirection'] * -0x1;
        }
        if (S['blur'] + S['initialBlurDirection'] * F >= radius[0x1] && S[O(0x1fb)] !== 0x0 || S[O(0x1d4)] + S['initialBlurDirection'] * F <= radius[0x0] && S[O(0x1fb)] !== 0x0) {
            S[O(0x1fb)] *= -0x1;
        }
        S['x'] += S[O(0x1f9)] * A;
        S['y'] += S['initialYDirection'] * a;
        S[O(0x1d4)] += S[O(0x1fb)] * F;
        ctx[O(0x1e9)]();
        ctx[O(0x1ee)] = O(0x1e8) + S[O(0x1d4)] + O(0x200);
        let T = ctx[O(0x1f0)](S[O(0x1fd)][0x0], S[O(0x1fd)][0x1], S[O(0x1fd)][0x2], S[O(0x1fd)][0x3]);
        T['addColorStop'](0x0, S['colorOne']);
        T['addColorStop'](0x1, S[O(0x1ef)]);
        ctx[O(0x1e5)] = T;
        ctx[O(0x1f6)](S['x'], S['y'], S[O(0x1fa)], 0x0, Math['PI'] * 0x2);
        ctx[O(0x1df)]();
        ctx[O(0x1f5)]();
    });
    window[H(0x1f7)](changeCanvas);
}
window[zeltr(0x1f7)](changeCanvas);
*/