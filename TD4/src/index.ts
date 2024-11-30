// src/index.ts

import express, { Request, Response } from 'express';
import { LearningPackage } from './models/LearningPackage';

const app = express();
const port = process.env.PORT || 3000;

const learningPackages: LearningPackage[] = [
    { id: 1, title: 'Learn TypeScript' },
    { id: 2, title: 'Learn NodeJs' },
    { id: 3, title: 'Learn Html' },
    { id: 4, title: 'Learn Angular' },
];

app.use(express.json());

app.get('/api/liveness', (req: Request, res: Response) => {
    res.status(200).send('OK');
});

app.get('/api/package', (req: Request, res: Response) => {
    res.status(200).json(learningPackages);
});

app.get('/api/package/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const learningPackage = learningPackages.find(lp => lp.id === id);

    if (learningPackage) {
        res.status(200).json(learningPackage);
    } else {
        res.status(404).send(`Entity not found for id: ${id}`);
    }
});

app.get('/api/package-summaries', (req: Request, res: Response) => {
    const summaries = learningPackages.map(lp => ({
        id: lp.id,
        title: lp.title,
    }));

    res.status(200).json(summaries);
});


app.listen(port, () => {
    console.log(`Le serveur tourne sur le port ${port}`);
});

app.post('/api/package', (req: Request, res: Response) => {
    const { title } = req.body;


    if (!title) {
        res.status(400).send('The field "title" is required.');
        return;
    }


    const newId = Math.max(...learningPackages.map(lp => lp.id)) + 1;


    const newLearningPackage: LearningPackage = {
        id: newId,
        title: title,

    };

    learningPackages.push(newLearningPackage);
    res.status(200).json(newLearningPackage);
});

app.put('/api/package/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        res.status(400).send(`Invalid id: ${req.params.id}`);
        return;
    }

    const index = learningPackages.findIndex(lp => lp.id === id);

    if (index !== -1) {
        const { title } = req.body;

        if (!title) {
            res.status(400).send('The field "title" is required.');
            return;
        }

        learningPackages[index] = {
            ...learningPackages[index],
            title: title,
        };

        res.status(200).json(learningPackages[index]);
    } else {
        res.status(404).send(`Entity not found for id: ${id}`);
    }
});

app.put('/api/package', (req: Request, res: Response) => {
    const { id, title } = req.body;

    if (!id || !title) {
        res.status(400).send('Les champs "id" et "title" sont obligatoires.');
        return;
    }

    const learningPackage = learningPackages.find(lp => lp.id === id);

    if (learningPackage) {
        // Mettre à jour le LearningPackage
        learningPackage.title = title;
        // Mettez à jour d'autres champs si nécessaire

        res.status(200).json(learningPackage);
    } else {
        res.status(404).send(`Entity not found for id: ${id}`);
    }
});