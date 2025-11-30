import { Router } from 'express';
import { getDatawithID, getDatas, postResults } from '../DB.js';

const router = Router();

router.get('/:setID', async (req, res) => {
  try {
    const setID = Number(req.params.setID);
    const results = await getDatawithID('Result', 'SetID', setID);

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const results = await getDatas('Result');

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
});


router.post('/', async (req, res) => {
  try {
    const resultsArray = req.body.payload || req.body;

    if (!Array.isArray(resultsArray) || resultsArray.length === 0) {
      return res.status(400).json({ error: "Payload must be an array of results" });
    }

    const inserted = [];
    for (const r of resultsArray) {
      const row = await postResults(r); // pass object
      inserted.push(row);
    }


  } catch (err) {
    console.error("POST ROUTE ERROR:", err);
    res.status(500).json({ error: "Database Error" });
  }
});


export default router; 