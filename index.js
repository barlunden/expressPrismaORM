const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/', (req, res) => {
    res.send({ message: "Choose your path: '/entries' - to get all entries, '/create-entry' - to post an entry, or '/get-entry/:id' - to get a specific entry by its ID." });
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

    if (!entry) {
        return res.status(404).send({message: 'Entry not found'});
    } else {
        return res.send({entry: entry});
    }
});

app.listen(3713, () => {
    console.log('Server is running on port 3713');
});