import { Router } from 'express';
import personRouter from './personRouter';
import postRouter from './postRouter';

const router = Router();

router.use('/people', personRouter);
router.use('/posts', postRouter);

export default router;