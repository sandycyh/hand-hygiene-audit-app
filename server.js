import express from 'express';
import cors from 'cors';
import { getData } from './DB.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/Organisation', async(req, res) => {
  try{ 
    const rows = await getData('Organisation');
    res.json(rows);
  } catch(err){
    res.status(500).json({ error: 'Database Error'});
  }
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));