const router = require('express').Router();
import { addFeedback, getByUser } from '../controllers/feedbackController';

router.post('/add', addFeedback);
router.get('/user/:userId', getByUser);

export default router;