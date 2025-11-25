import Article from '../models/HealthGuide.js';

export const createArticle = async (req, res) => {
    try {
        const article = await Article.create(req.body);
        res.status(201).json(article);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getArticles = async (req, res) => {
    try {
        const articles = await Article.findAll();
        res.status(200).json(articles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getArticleById = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ error: 'Article not found' });
        res.status(200).json(article);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateArticle = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ error: 'Article not found' });
        await article.update(req.body);
        res.status(200).json(article);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ error: 'Article not found' });
        await article.destroy();
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
