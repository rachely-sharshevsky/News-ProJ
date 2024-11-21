import express from 'express';
import NewsAIController from '../controllers/newsAIController.js';

const router = express.Router();

router.post('/summarize', NewsAIController.summarizeNews);

export default router;
