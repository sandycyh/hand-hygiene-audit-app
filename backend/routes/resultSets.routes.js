import { Router } from 'express';
import { getDatas, getDatawithID, postAuditSet } from '../DB.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const resultSets = await getDatas('ResultSets');
    res.json(resultSets);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
});

router.get('/count/all', async (req, res) => {
  try {
    const resultSetsCount = await countRows('ResultSets');
    res.json(resultSetsCount);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
})

router.get('/:SetID', async (req, res) => {
  try {
    const resultSet = Number(req.params.SetID);
    const set = await getDatawithID('ResultSets', 'SetID', resultSet)
    res.json(set);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
});


router.get('/test', async (req, res) => {
  try {
    const resultsArray = req.body.payload || req.body;

    if (!Array.isArray(resultsArray) || resultsArray.length === 0) {
      return res.status(400).json({ error: "Payload must be an array of results" });
    }

    console.log("POST /api/Result BODY:", resultsArray);

    const inserted = [];
    for (const r of resultsArray) {
      const row = await postAuditSet(r); // pass object
      inserted.push(row);
    }

    res.status(201).json({
      message: `${inserted.length} results inserted successfully.`,
      inserted,
    });

  } catch (err) {
    console.error("POST ROUTE ERROR:", err);
    res.status(500).json({ error: "Database Error" });
  }
});

export default router; 
