const express = require("express");
const bodyParser = require("body-parser")
const fs = require("fs")
const path = require("path")
const cors = require("cors")

const app = express()
app.use(bodyParser.json());
app.use(cors());

const port = 3000

app.get('/todos', (req, res) => {
    fs.readFile("todos.json", "utf-8", (err, data) => {
        if(err) throw err;
        res.json(JSON.parse(data));
    });
});

app.post('/todos', (req, res) => {
    const newTodo = {
        id: Math.floor(Math.random() * 1000000),
        title: req.body.title,
        description: req.body.description
    };
    fs.readFile("todos.json", "utf-8", (err, data) => {
        if(err) throw err;
        const todos = JSON.parse(data);
        todos.push(newTodo);
        fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
            if(err) throw err;
            res.status(201).json(newTodo)
        });
    });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})