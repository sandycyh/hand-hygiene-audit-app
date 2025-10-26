import express from 'express';
import cors from 'cors';
import { getDatas } from '../DB.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/Results', async (req, res) => {
  try{ 
    const Results = await getDatas('Results');
    res.json(Results);
  }catch(err) {
    res.status(500).json({ error: 'Database Error'});
  }
});