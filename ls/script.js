document.addEventListener("DOMContentLoaded", function() {
    console.log("%cWebsite made by waza80 :3", "font-size: 40px; color: rgb(0, 170, 255); padding: 4px; background-color: rgb(0, 70, 135)")

    let t = document.getElementById("menu-icon"),
        i = document.getElementById("menu-list"),
        j = document.querySelectorAll(".scroll-animation"),
        e = document.getElementById('textbox-content'),
        params = new URLSearchParams(window.location.search);
    
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

    e.value = `loadstring(game:HttpGet("${params.get('s')}"))()`
})

let scriptCopied = false;
function copyScript() {
    let copyText = document.getElementById('textbox-content'),
        copyStatus = document.getElementById('copy-status');

    copyText.select();
    copyText.setSelectionRange(0, 1000);

    navigator.clipboard.writeText(copyText.value)

    if (!scriptCopied) {
        scriptCopied = true;
        copyStatus.className = ''
        setTimeout(() => {
            scriptCopied = false;
            copyStatus.className = 'hidden';
        }, 3000)
    }
}