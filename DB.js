import sql from 'mssql';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export const pool = await sql.connect(dbConfig); 

// async function InsertOrg(OrgID, OrgName, Location) {
//     const insert = await pool.request()
//         .input(OrgID, sql.Int, )
// }

export async function getDatas(tableName) {
  try{
    const result = await pool.request()
    .query(`SELECT * FROM ${tableName}`);
    return result.recordset
  }catch(error) {
    console.error(error.message)
  }
}


// ***************** examples of how to get results************ 
/* async function getAllOrgs() {
    const result = await pool.request()
        .query('SELECT * FROM Organisation');
    return result.recordset
}

async function getOrg(id) {
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM Organisation WHERE OrgID = @id');
    return result.recordset

    app.get('/Organisation', async (req, res) => {
  try {
    const result = await pool.request().query('SELECT * FROM Organisation');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.listen(3000, () => console.log('Server running on http://localhost:3000/Organisation'));


*/



