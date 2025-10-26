import { Router} from 'express';
import { getDatas } from '../DB.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const Orgs = await getDatas('Organisation');

    res.json(Orgs);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
});

export default router; 
