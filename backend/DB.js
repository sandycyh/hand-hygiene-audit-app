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
console.log('connecting to DB: ', dbConfig.database)

export async function getDatas(tableName) {
  try {
    const result = await pool.request()
      .query(`SELECT * FROM ${tableName}`);
    return result.recordset;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getDatawithID(tableName, column, id) {
  try {
    // const request = await pool request()
    const result = await pool.request()
      .input(column, sql.Int, id)
      .query(`SELECT * FROM ${tableName}
              WHERE ${column} = @${column}`);
    return result.recordset;
  } catch (error) {
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
  try {
    const result = await pool.request()
      .query(`SELECT * FROM Action_Descriptions
              ORDER BY 
                CASE WHEN Action = 'Rub' THEN 1 
	                    WHEN Action = 'Wash' THEN 2 
                      ELSE 3
                END, 
                Action `)
    return result.recordset;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getGlove() {
  try {
    const result = await pool.request()
      .query(`SELECT * FROM Glove_Descriptions
              ORDER BY 
                CASE WHEN Glove = 'On' THEN 1
                      WHEN Glove = 'Off' THEN 2
                      ELSE 3
                END,
                Glove`)
    return result.recordset;
  } catch (error) {
    console.error(error.message);
  }
}

export async function postResults({ SetID, HCW, Moment, Action, Glove,
  CorrectMoment }) {
  try {
    console.log("POSTING TO DB:", {
      SetID, HCW, Moment, Action, Glove,
      CorrectMoment
    });

    const result = await pool.request()
      .input("SetID", sql.Int, SetID)
      .input("HCW", sql.VarChar(3), HCW)
      .input("Moment", sql.Int, Moment)
      .input("Action", sql.VarChar(10), Action)
      .input("Glove", sql.VarChar(4), Glove)
      .input("CorrectMoment", sql.VarChar(3), CorrectMoment)
      .query(`
          INSERT INTO Result (SetID, HCW, Moment, [Action], Glove, CorrectMoment)
          OUTPUT INSERTED.*
          VALUES (@SetID, @HCW, @Moment, @Action, @Glove, @CorrectMoment)
        `);

    console.log("INSERT SUCCESS:", result.recordset);
    // return the inserted row to the caller (if needed)
    return result.recordset && result.recordset[0];

  } catch (error) {
    console.error(error.message);
    // rethrow so callers can handle/report the failure
    throw error;
  }
}

export async function postAuditSet({ AuditDate, StartTime, TotalTime,
  OrgID, DeptCode, AuditedBy,
  TotalCorrectMoment, TotalMoment, SuccessRate }) {
  try {
    const result = await pool.request()
      .input("AuditDate", sql.Date, AuditDate)
      .input("StartTime", sql.VarChar(8), StartTime)
      .input("TotalTime", sql.VarChar(8), TotalTime)
      .input("OrgID", sql.Int, OrgID)
      .input("DeptCode", sql.VarChar(10), DeptCode)
      .input("AuditedBy", sql.Int, AuditedBy)
      .input("TotalCorrectMoment", sql.Int, TotalCorrectMoment)
      .input("TotalMoment", sql.Int, TotalMoment)
      .input("SuccessRate", sql.Decimal(18, 0), SuccessRate)
      .query(`
          INSERT INTO ResultSets (AuditDate, StartTime, TotalTime, OrgID, DeptCode, AuditedBy, TotalCorrectMoment, TotalMoment, SuccessRate)
          OUTPUT INSERTED. *
          VALUES (@AuditDate, @StartTime, @TotalTime, @OrgID, @DeptCode, @AuditedBy, @TotalCorrectMoment, @TotalMoment, @SuccessRate)
          `)

    console.log("INSERT SUCCESS:", result.recordset);
    // return the inserted row to the caller (if needed)
    return result.recordset && result.recordset[0];

  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
export async function getLastSetID() {
  try {
    const result = await pool.request()
      .query(`SELECT TOP 1 SetID 
      FROM ResultSets
      ORDER BY SetID DESC;`)
    return result.recordset[0].SetID;
  } catch (error) {
    console.error(error.message);
  }
}

export async function countRows(tableName) {
  try {
    const result = await pool.request()
      .query(`SELECT COUNT(*) AS total FROM ${tableName}`)
    return result.recordset[0].Total;
  } catch (error) {
    console.error(error.message)
  }
}

export async function getResult(setID, resultID) {
  try {
    const request  = pool.request()
      .input('resultID', sql.Int, resultID)
      .input('setID', sql.Int, setID)

    const result = await request
      .query(`SELECT * FROM Result
            WHERE ResultID = @resultID
              AND SetID = @setID`)
    return result.recordset[0] ?? null;

  } catch (error) {
    console.error(error.message)
  }
}