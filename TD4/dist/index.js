"use strict";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const learningPackages = [
    { id: 1, title: 'Learn TypeScript' },
    { id: 2, title: 'Learn NodeJs' },
    { id: 3, title: 'Learn Html' },
    { id: 4, title: 'Learn Angular' },
];
app.use(express_1.default.json());
app.get('/api/liveness', (req, res) => {
    res.status(200).send('OK');
});
app.get('/api/package', (req, res) => {
    res.status(200).json(learningPackages);
});
app.get('/api/package/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const learningPackage = learningPackages.find(lp => lp.id === id);
    if (learningPackage) {
        res.status(200).json(learningPackage);
    }
    else {
        res.status(404).send(`Entity not found for id: ${id}`);
    }
});
app.get('/api/package-summaries', (req, res) => {
    const summaries = learningPackages.map(lp => ({
        id: lp.id,
        title: lp.title,
    }));
    res.status(200).json(summaries);
});
app.listen(port, () => {
    console.log(`Le serveur tourne sur le port ${port}`);
});
app.post('/api/package', (req, res) => {
    const { title } = req.body;
    if (!title) {
        res.status(400).send('The field "title" is required.');
        return;
    }
    const newId = Math.max(...learningPackages.map(lp => lp.id)) + 1;
    const newLearningPackage = {
        id: newId,
        title: title,
    };
    learningPackages.push(newLearningPackage);
    res.status(200).json(newLearningPackage);
});
app.put('/api/package/:id', (req, res) => {
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
        learningPackages[index] = Object.assign(Object.assign({}, learningPackages[index]), { title: title });
        res.status(200).json(learningPackages[index]);
    }
    else {
        res.status(404).send(`Entity not found for id: ${id}`);
    }
});
app.put('/api/package', (req, res) => {
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
    }
    else {
        res.status(404).send(`Entity not found for id: ${id}`);
    }
});
