const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/', (req, res) => {
    res.send({ message: "Hello World" });
});

app.get('/entries', async (req, res) => {
    const entries = await prisma.entry.findMany();
    res.send({entries: entries});
});


// '/create-entry' makes more sense than in this exercise than '/get-entries', so I took the liberty of changing it.
app.post('/create-entry', async (req, res) => {
    const postData = req.body;

    const post = await prisma.entry.create({
        data: {
            title: postData.title,
            content: postData.content,
        }
    });

    res.send({post: post});

});

app.get('/get-entry/:id', async (req, res) => {
    const { id } = req.params;

    const entry = await prisma.entry.findUnique({
        where: {
            id: parseInt(id),
        }
    });

    res.send({entry: entry});
});

app.listen(3713, () => {
    console.log('Server is running on port 3713');
});