import { Router } from 'express';
import { getDatawithID, postResults } from '../DB.js';

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

router.post('/', async (req, res) => {
  try {
    const { SetID, HCW, Moment, Action, Glove, CorrectMoment } = req.body;
    if (!SetID || !HCW || !Moment || !Action || !Glove || !CorrectMoment)
      return res.status(400).json({ error: "Result details required " });

    const result = await postResults({
      SetID,
      HCW,
      Moment,
      Action,
      Glove,
      CorrectMoment
    })
    res.status(201).json({ message: 'Result created', setID: result })
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
})

export default router; 