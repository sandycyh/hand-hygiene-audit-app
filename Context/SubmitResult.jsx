import React, { useState, createContext, useContext } from 'react';
import { useDropDown } from '../Context/DropDownOptions';
 
const SubmitContext = createContext();

export function SubmitProvider({ children }) {
    const API = process.env.EXPO_PUBLIC_API_URL;
    const [results, setResults] = useState([]);
    const { org, department, auditor } = useDropDown();

    let setID = null;

    async function postResult() {
        try {
            console.log("1) postResult CALLED");
            const reqResultSets = await fetch(`${API}/api/ResultSets`);
            const count = await reqResultSets.json();
            setID = Number(count + 1);

            console.log(typeof results.moment)

            const payload = results.map(r => ({
                SetID: setID,
                HCW: r.HCW,
                Moment: r.moment,
                Action: r.action,
                Glove: r.glove,
                CorrectMoment: r.correctMoment
            }));
            console.log(Array.isArray(payload))
            console.log("2) PAYLOAD:", payload);

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
            const data = await res.text();
            console.log("4) RESPONSE BODY:", data);
        } catch (err) {
            console.log("FETCH ERROR:", err);
        }
    }
    return (
        <SubmitContext.Provider
            value={{
                postResult,
                results, setResults
            }}>
            {children}
        </SubmitContext.Provider>
    )
}

export function useSubmit() {
    return useContext(SubmitContext);
}




