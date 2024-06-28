const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("public"));

app.get('/wxz', (req, res) => {
    res.sendFile('wxz.html', { root: path.join(__dirname, '..', 'public') })
})

app.get('/github', (req, res) => {
    res.redirect("https://github.com/Waza80")
})

app.get('/scripts', (req, res) => {
    res.redirect("https://waza-scripts.vercel.app/")
})

app.get('/logger', (req, res) => {
    res.send(`Successfully logged ${req.ip} to database`)
})

app.get('/donate', (req, res) => {
    res.sendFile('donation.html', { root: path.join(__dirname, '..', 'public') })
})

app.get('/robux', (req, res) => {
    res.sendFile('robux.html', { root: path.join(__dirname, '..', 'public') })
})

app.get('/hydrogen', (req, res) => {
    res.sendFile('hydrogen.html', { root: path.join(__dirname, '..', 'public') })
})

app.listen(3000, () => {
    console.log("Website is connected")
});
