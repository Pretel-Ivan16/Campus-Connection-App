import { Router } from 'express';
import { getHealth } from '../controllers/health.controller.js';

const router = Router();

router.get('/', (req, res) => res.status(200).json({ status: 'ok' }));
router.get('/health', getHealth);

export default router;
