const formidable = require('formidable');
const { create: createTodo, get: getTodos, remove: removeTodoModel } = require('../model/todo');
const create = (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields) => {
        if (err) {
            return res.status(400).json({ error: 'Error parsing form data' });
        }

        const { description } = fields;

        if (!description) {
            return res.status(400).json({ error: 'Description is required'});
        }

        try {
            const newTodo = await createTodo(description);
            return res.status(201).json(newTodo);
        } catch (dbError) {
            return res.status(500).json({ error: 'Database error'});
        }
    });
};

const read = async (req, res) => {
    try {
        const todos = await getTodos();
        return res.status(200).json(todos);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message});
    }
};

const removeTodo = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'ID is required'});
    }

    try {
        const deleteCount = await removeTodoModel(id);
        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Todo not found'});
        }
        return res.status(200).json({ success: true});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message});
    }
};

module.exports = {
    create,
    read,
    removeTodo,
};