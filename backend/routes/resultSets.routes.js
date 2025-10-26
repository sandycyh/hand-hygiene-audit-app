import express from 'express';
import cors from 'cors';
import { getDatas } from '../DB.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/ResultSets', async (req, res) => {
  try{ 
    const ResultSets = await getDatas('ResultSets');
    res.json(ResultSets);
  }catch(err) {
    res.status(500).json({ error: 'Database Error'});
  }
});