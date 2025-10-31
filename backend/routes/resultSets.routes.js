import { Router } from 'express';
import { getDatas, getDatawithID } from '../DB.js';

const router = Router();

router.get('/', async (req, res) => {
  try{ 
    const resultSets = await getDatas('ResultSets');
    res.json(resultSets);
  }catch(err) {
    res.status(500).json({ error: 'Database Error'});
  }
});

router.get('/count/all', async (req, res) => {
  try{
    const resultSetsCount = await countRows('ResultSets'); 
    res.json(resultSetsCount);
  }catch(err) {
    res.status(500).json({ error: 'Database Error'});
  }
})

router.get('/:SetID' , async (req, res) => {
  try{
    const resultSet = Number(req.params.SetID); 
    const set = await getDatawithID('ResultSets', 'SetID', resultSet)
    res.json(set);
  }catch(err){
    res.status(500).json({ error: 'Database Error'});
  }
}); 

// router.get('/', async (req, res) => {
//   try{

//   }
// })
export default router; 
