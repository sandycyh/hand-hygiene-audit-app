import { Router } from 'express';
import { getDatas, getDatawithID, getLastSetID, postAuditSet } from '../DB.js';

const router = Router();

router.get('/lastID', async (req, res) => {
  try {
    const lastSetID = await getLastSetID();
    res.json(lastSetID);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const resultSets = await getDatas('ResultSets');
    res.json(resultSets);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
});


router.get('/:SetID', async (req, res) => {
  try {
    const resultSet = Number(req.params.SetID);
    const set = await getDatawithID('ResultSets', 'SetID', resultSet)
    res.json(set);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const results = req.body.payload || req.body;
    const setID = await postAuditSet(results);

    if (!setID) {
      return res.status(500).json({ error: 'SetID not returned from DB' })
    }

    res.json({ setID })

    // res.status(201).json({
    //   message: 'audit set inserted successfully.',
    //   inserted,
    // });

  } catch (err) {
    console.error("POST ROUTE ERROR:", err);
    res.status(500).json({ error: "Database Error" });
  }
});

export default router; 
