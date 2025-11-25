import express from 'express';
import {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle
} from '../controllers/educationController.js';

const router = express.Router();

router.post('/articles', createArticle);
router.get('/articles', getArticles);
router.get('/articles/:id', getArticleById);
router.put('/articles/:id', updateArticle);
router.delete('/articles/:id', deleteArticle);

export default router;
