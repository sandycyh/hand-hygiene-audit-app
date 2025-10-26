import { Router } from 'express';
import { getDatas } from '../DB.js';

const router = Router();

//Moment
router.get('/', async (req, res) => {
    try{ 
      const Moments = await getDatas('Moment_Descriptions');
      res.json(Moments);
    }catch(err){
      res.status(500).json({ error: 'Database Error'});
    }
});

export default router;