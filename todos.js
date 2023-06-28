const express = require("express");
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json());
const port = 3000

let todos = []

function findIndex(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) return i;
    }
    return -1;
}

function removeAtIndex(arr, index) {
    let newArray = [];
    for (let i = 0; i < arr.length; i++) {
        if (i !== index) newArray.push(arr[i]);
    }
    return newArray;
}

app.get('/todos', (req, res) => {
    res.json(todos)
});

app.post('/todos', (req, res) => {
    const newTodo = {
        id: Math.floor(Math.random() * 1000000),
        title: req.body.title,
        description: req.body.description
    };
    todos.push(newTodo);
    res.status(201).json(newTodo)
})


app.delete('/todos/:id', (req, res) => {
    const index = findIndex(todos, parseInt(req.params.id));
    if(index === -1){
        res.status(404).send();
    }
    else{
        todos = removeAtIndex(todos, index);
        res.status(200).send();
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

