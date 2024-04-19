const express = require('express');
const router = express.Router();

let todos = [];

router.get('/', async (req, res) => {
    try {
        res.status(200).json({ message: "Welcome to todo CRUD application" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/todos', async (req, res) => {
    try {
        res.status(200).json({ todos });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/todos/create', async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            throw new Error("Title and Description are mandatory");
        }
        const newTodo = {
            id: Math.random().toString(36).substring(2, 9),
            title,
            description,
            status: "pending",
            createdAt: new Date().toISOString()
        };
        todos.push(newTodo);
        res.status(201).json({ message: "Todo created successfully", todo: newTodo });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex === -1) {
            return res.status(404).json({ message: "Todo not found" });
        }
        todos[todoIndex].status = status;
        res.status(201).json({ message: "Todo updated successfully", todo: todos[todoIndex] });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex === -1) {
            return res.status(404).json({ message: "Todo not found" });
        }
        todos.splice(todoIndex, 1);
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
