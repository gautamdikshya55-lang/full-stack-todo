const express = require('express');
const prisma = require('../prismaClient');
const auth = require('../middleware/auth');

const router = express.Router();

// Protect all /todos routes
router.use(auth);

// CREATE TODO (supports dueDate)
router.post('/', async (req, res) => {
  try {
    const { text, dueDate } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Todo text is required" });
    }

    const todo = await prisma.todo.create({
      data: {
        text: text.trim(),
        dueDate: dueDate ? new Date(dueDate) : null,
        userId: req.userId
      }
    });

    res.status(201).json(todo);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// GET ALL TODOS FOR USER
router.get('/', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }
    });

    res.json(todos);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// UPDATE TODO (supports text, completed, dueDate)
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { text, completed, dueDate } = req.body;

    const todo = await prisma.todo.findFirst({
      where: { id, userId: req.userId }
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const updated = await prisma.todo.update({
      where: { id },
      data: {
        text: text !== undefined ? text : todo.text,
        completed: completed !== undefined ? completed : todo.completed,

        // ⭐⭐ FIXED PART ⭐⭐
        dueDate:
          dueDate === undefined
            ? todo.dueDate // no update
            : dueDate === "" 
              ? null        // clear date
              : new Date(dueDate), // set new date
      }
    });

    res.json(updated);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});


// DELETE TODO
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    const todo = await prisma.todo.findFirst({
      where: { id, userId: req.userId }
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await prisma.todo.delete({ where: { id } });

    res.status(204).send(); // No content

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
