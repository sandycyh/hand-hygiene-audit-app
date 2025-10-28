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

export async function getDatas(tableName) {
  try {
    const result = await pool.request()
      .query(`SELECT * FROM ${tableName}`);
    return result.recordset;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getDatawithID(tableName, idName, id){
  try{
    const result = await pool.request()
      .input(idName, sql.Int, id)
      .query(`SELECT * FROM ${tableName}
              WHERE ${idName} = @${idName}`);
      return result.recordset;
  }catch(error) {
    console.error(error);
    throw error; 
  }
}

export async function getHCW() {
  try {
    const result = await pool.request()
      .query(`SELECT * FROM HCW_Descriptions
              ORDER BY 
                CASE WHEN Type = 'N' THEN 1
		                WHEN Type = 'DR' THEN 2
		                WHEN Type = 'AH' THEN 3
		                WHEN Type = 'BL' THEN 4
		                WHEN Type = 'PC' THEN 5
		                WHEN Type = 'SN' THEN 6
		                WHEN Type = 'SAH' THEN 7
		                ELSE 8
                END,
	            Type`);
    return result.recordset;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getAction() {
  try{
    const result = await pool.request()
      .query(`SELECT * FROM Action_Descriptions
              ORDER BY 
                CASE WHEN Action = 'Rub' THEN 1 
	                    WHEN Action = 'Wash' THEN 2 
                      ELSE 3
                END, 
                Action `)
    return result.recordset; 
  }catch(error) {
    console.error(error.message);
  }
}

export async function getGlove() {
  try{
    const result = await pool.request()
      .query(`SELECT * FROM Glove_Descriptions
              ORDER BY 
                CASE WHEN Glove = 'On' THEN 1
                      WHEN Glove = 'Off' THEN 2
                      ELSE 3
                END,
                Glove`)
    return result.recordset;
  }catch(error) {
    console.error(error.message);
  }
}

export async function postResults( SetID, HCW, Moment, Action, Glove, CorrectMoment ){
  try{
    const result = await pool.request() 
      .input("SetID", sql.Int, SetID)
      .input("HCW", sql.VarChar, HCW)
      .input("Moment", sql.Int, Moment)
      .input("Action", sql.VarChar, Action)
      .input("Glove", sql.VarChar, Glove)
      .input("CorrectMoment", sql.VarChar, CorrectMoment)
      .query(` 
        INSERT INTO Result
        VALUES
        (@SetID, @HCW, @Moment, @Action, @Glove, @CorrectMoment)
        OUTPUT INSERTED.SetID
        `);

      return result.recordset[0].SetID; 
  }catch(error) {
    console.error(error.message);
  }
}

export async function countRows(tableName){
  try{ 
    const result = await pool.request()
    .query(`SELECT COUNT(*) FROM ${tableName}`)
    return result.recordset[0].total;
  }catch(error){
    console.error(error.message)
  }
}

