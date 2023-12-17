document.addEventListener("DOMContentLoaded", function() {
    let t = document.getElementById("menu-icon"),
        i = document.getElementById("topbar").getElementsByTagName("ul")[0];
    t.addEventListener("click", function() {
        i.classList.toggle("show"), t.classList.toggle("rotate")
    })
})

document.addEventListener("DOMContentLoaded", function() {
    let t = document.querySelectorAll(".scroll-animation");

    function i(t) {
        let i = t.getBoundingClientRect();
        return i.top >= 0 
            && i.left >= 0 
            && i.bottom <= (window.innerHeight || document.documentElement.clientHeight) 
            && i.right <= (window.innerWidth || document.documentElement.clientWidth)
    }

    window.addEventListener("scroll", function e() {
        for (let s = 0; s < t.length; s++) i(t[s]) && !t[s].classList.contains("scroll-active") && t[s].classList.add("scroll-active")
    })
});

fetch("https://api.lanyard.rest/v1/users/959534223293833256", {
    method: "GET"
})
    .then(response => response.json())
    .then(data => {
        document.getElementById("center-image").src = "https://cdn.discordapp.com/avatars/959534223293833256/" + data.data.discord_user.avatar + ".jpg?size=2048";
    })
