import React, { useState, createContext, useContext } from 'react';

const SubmitContext = createContext();

export function SubmitProvider({ children }) {
    const API = process.env.EXPO_PUBLIC_API_URL;
    const [results, setResults] = useState([]);
    const [auditSet, setAuditSet] = useState([]);

    async function postAuditSet() {
        try {

            const payload = {
                AuditDate: auditSet.date,
                StartTime: auditSet.startTime,
                TotalTime: auditSet.totalTime,
                OrgID: auditSet.org,
                DeptCode: auditSet.department,
                AuditedBy: auditSet.auditor,
                TotalCorrectMoment: auditSet.totalCorrectMoment,
                TotalMoment: auditSet.totalMoment,
                SuccessRate: auditSet.successRate
            }

            console.log('Audit set: ', payload)

            const res = await fetch(`${API}/api/ResultSets`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            setAuditSet([]);
            console.log("3) RESPONSE STATUS:", res.status);
            const insertData = await res.text();
            console.log("4) RESPONSE BODY:", insertData);
        } catch (error) {
            console.error("FETCH ERROR:", err)
        }
    }

    async function postResult() {
        try {
            const reqResultSets = await fetch(`${API}/api/ResultSets/lastID`);
            const setID = await reqResultSets.json();
            console.log('setID: ', setID);
            console.log("1) postResult CALLED");

            const payload = results.map(r => ({
                SetID: setID,
                HCW: r.HCW,
                Moment: r.moment,
                Action: r.action,
                Glove: r.glove,
                CorrectMoment: r.correctMoment
            }));

            const res = await fetch(`${API}/api/Result`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ payload })
            })
            setResults([]);
            console.log("3) RESPONSE STATUS:", res.status);
            const insertData = await res.text();
            console.log("4) RESPONSE BODY:", insertData);
        } catch (err) {
            console.log("FETCH ERROR:", err);
        }

    }
    return (
        <SubmitContext.Provider
            value={{
                postAuditSet,
                postResult,
                results, setResults,
                auditSet, setAuditSet,
            }}>
            {children}
        </SubmitContext.Provider>
    )
}

export function useSubmit() {
    return useContext(SubmitContext);
}




