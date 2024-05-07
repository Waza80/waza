document.addEventListener("DOMContentLoaded", function() {
    console.log("%cWebsite made by waza80 :3", "font-size: 40px; color: rgb(0, 170, 255); padding: 4px; background-color: rgb(0, 70, 135)")

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

    window.addEventListener("scroll", function() {
        for (let s = 0; s < t.length; s++) k(j[s]) && !j[s].classList.contains("scroll-active") && j[s].classList.add("scroll-active")
    })

    /*
    let topBar = document.getElementById("topbar")
    let l = window.scrollY
    window.addEventListener("scroll", function() {
        if (l > window.scrollY && this.window.scrollY !== 0) {
            topBar.style.top = "-90px"
        } else {
            topBar.style.top = "0"
        }
        l = this.window.scrollY
    })
    */
})

function videoPlay() {
    let video = document.getElementById('dsc-banner');

    video.currentTime = 0;
    video.play()
}

function elapsedTime(timestamp) {
    let startTime = timestamp;
    let endTime = Number(new Date());
    let difference = (endTime - startTime) / 1000;
    let daysDifference = Math.floor(difference / 60 / 60 / 24);
    difference -= daysDifference * 60 * 60 * 24;

    let hoursDifference = Math.floor(difference / 60 / 60);
    difference -= hoursDifference * 60 * 60;

    let minutesDifference = Math.floor(difference / 60);
    difference -= minutesDifference * 60;

    let secondsDifference = Math.floor(difference);

    return `${hoursDifference >= 1 ? ("0" + hoursDifference).slice(-2) + ":" : ""}${("0" + minutesDifference).slice(-2)}:${("0" + secondsDifference).slice(-2)}`;
};

function updateTime(element, timestamp) {
    setInterval(() => {
        element.textContent = `${elapsedTime(timestamp)} elapsed`
    })
}

let firstTime = true
function updateStatus(data) {
    if (firstTime) {
        firstTime = false
        let c = document.querySelector(".img-placeholder-1"), 
            d = document.querySelector(".img-placeholder-2");

        let img = document.createElement("img");
        img.id = "center-image";
        img.alt = "Waza Icon";
        img.width = "150";
        img.height = "150";
        img.src = "https://cdn.discordapp.com/avatars/959534223293833256/"
            + data.discord_user.avatar 
            + (data.data.discord_user.avatar.match('a_') ? ".gif?size=512" : ".webp?size=512");
        c.replaceWith(img)

        let img2 = document.createElement("img");
        img2.loading = "lazy"
        img2.id = "dsc-avatar";
        img2.alt = "Discord Avatar";
        img2.width = "128";
        img2.height = "128";
        img2.src = "https://cdn.discordapp.com/avatars/959534223293833256/"
            + data.discord_user.avatar 
            + (data.data.discord_user.avatar.match('a_') ? ".gif?size=256" : ".webp?size=256");
        d.replaceWith(img2)
    }

    let e = document.querySelector(".dsc-display-name"),
        f = document.querySelector(".dsc-username")

    e.textContent = data.discord_user.global_name
    f.textContent = data.discord_user.username

    const noActivity = document.getElementById("no-activity")
    const activityContainer = document.getElementById("activity-container")
    const firstActivity = document.getElementById("activity")

    document.querySelectorAll("#activity").forEach((item) => {
        if (item.classList.contains("hidden") != true) {
            item.remove()
        }
    })

    if (data.activities.length > 0) {
        noActivity.classList.add("hidden")
        activityContainer.className = ""
        data.activities.forEach(activity => {
            let a = firstActivity.cloneNode(true),
                a_img = a.querySelector("#image"),
                a_label = a.querySelector("#label-container");
            a.classList = ""

            if (activity.name !== "Spotify") {
                if (activity.assets != undefined && activity.assets.large_image != undefined) {
                    a_img.src = activity.assets.large_image.startsWith("mp:external/")
                        ? `https://media.discordapp.net/external/${activity.assets.large_image.replace("mp:external/", "")}` 
                        : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.webp`
                }
                if (activity.name != undefined) {a_label.querySelector("#title").textContent = activity.name} else {a_label.querySelector("#title").remove()}
                if (activity.details != undefined) {a_label.querySelector(".details").textContent = activity.details} else {a_label.querySelector(".details").remove()}
                if (activity.state != undefined) {a_label.querySelector(".state").textContent = activity.state} else {a_label.querySelector(".state").remove()}
                if (activity.timestamps != undefined && activity.timestamps.start != undefined) {updateTime(a_label.querySelector(".timestamp"), activity.timestamps.start)} else {a_label.querySelector(".timestamp").remove()}
            } else {
                    if (data.spotify.album_art_url != undefined) {
                    a_img.src = data.spotify.album_art_url
                }
                
                if (activity.name != undefined) {a_label.querySelector("#title").textContent = activity.name} else {a_label.querySelector("#title").remove()}
                if (activity.details != undefined) {a_label.querySelector(".details").textContent = activity.details} else {a_label.querySelector(".details").remove()}
                if (activity.state != undefined) {a_label.querySelector(".state").textContent = activity.state} else {a_label.querySelector(".state").remove()}
                if (data.spotify.timestamps.start) {updateTime(a_label.querySelector(".timestamp"), data.spotify.timestamps.start)} else {a_label.querySelector(".timestamp").remove()}
            }
            if (activity.name !== "Spotify") {
                activityContainer.appendChild(a)
            } else {
                activityContainer.insertBefore(a, activityContainer.firstChild)
            }
        })
    } else {
        activityContainer.classList.add("hidden")
        noActivity.className = ""
    }
}

try {
    let ws = new WebSocket("wss://api.lanyard.rest/socket")
    let beatInterval;
    ws.onerror = () => {console.warn("Websocket connection failed, status auto-update is unavailable")}
    ws.onclose = () => {beatInterval ? clearInterval(beatInterval) : console.log("Websocket closed");}

    let heartbeatInterval = null
    ws.onmessage = (event) => {
        let event_data = JSON.parse(event.data)
        if (event_data.op === 1) {
            heartbeatInterval = event_data.d.heartbeat_interval
            beatInterval = setInterval(() => {ws.send(JSON.stringify({op: 3})); console.log("Heartbeat sent")}, heartbeatInterval)
            ws.send(JSON.stringify({
                op: 2,
                d: {
                    subscribe_to_ids: ["959534223293833256"],
                }
            }))
        } else if (event_data.op === 0) {
            if (event_data.t === "INIT_STATE") {
                updateStatus(event_data.d[Object.keys(event_data.d)[0]])
            } else {
                updateStatus(event_data.d)
            }
        } else if (event_data.op === 3) {
            // console.log(event_data.d)
        }
    }
} catch (err) {}

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