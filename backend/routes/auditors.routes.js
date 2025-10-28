import { Router } from 'express';
import { getDatawithID } from '../DB.js';

const router = Router();
//Auditor
router.get('/:DeptCode', async (req, res) => {
  try {
    const DeptCode = Number(req.params.DeptCode);
    const Auditors = await getDatawithID('Auditor', 'DeptCode', DeptCode);

    res.json(Auditors);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
});

export default router;