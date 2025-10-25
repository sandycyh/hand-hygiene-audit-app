import express from 'express';
import cors from 'cors';
import { getDatas, getDepts, getAuditors, getHCW, getAction, getGlove } from './DB.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/Organisation', async (req, res) => {
  try {
    const Orgs = await getDatas('Organisation');

    res.json(Orgs);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
});

app.get('/api/Department/:OrgID', async (req, res) => {
  try {
    const OrgID = Number(req.params.OrgID);
    const depts = await getDepts(OrgID);

    res.json(depts);
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: 'Database Error' });
  }
});

app.get('/api/Auditors/:DeptCode', async (req, res) => {
  try {
    const DeptCode = Number(req.params.DeptCode);
    const Auditors = await getAuditors(DeptCode);

    res.json(Auditors);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
});

app.get('/api/HCW', async (req, res) => {
  try {
    const HCW = await getHCW('HCW_Descriptions');
    res.json(HCW);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
});

app.get('/api/Moments', async (req, res) => {
    try{ 
      const Moments = await getDatas('Moment_Descriptions');
      res.json(Moments);
    }catch(err){
      res.status(500).json({ error: 'Database Error'});
    }
});

app.get('/api/Actions', async (req, res) => {
  try{
    const Actions = await getAction('Action_Descriptions');
    res.json(Actions);
  }catch(err){
    res.status(500).json({ error: 'Database Error'});
  }
});

app.get('/api/Gloves', async (req, res) => {
  try{ 
    const Gloves = await getGlove('Glove_Descriptions');
    res.json(Gloves);
  }catch(err) {
    res.status(500).json({ error: 'Database Error'});
  }
});

app.get('/api/Results', async (req, res) => {
  try{ 
    const Results = await getDatas('Results');
    res.json(Results);
  }catch(err) {
    res.status(500).json({ error: 'Database Error'});
  }
});

app.get('/api/ResultSets', async (req, res) => {
  try{ 
    const ResultSets = await getDatas('ResultSets');
    res.json(ResultSets);
  }catch(err) {
    res.status(500).json({ error: 'Database Error'});
  }
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));