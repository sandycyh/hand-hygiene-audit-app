import React, { useState, createContext, useContext, act } from 'react';

const SubmitContext = createContext();

export function SubmitProvider({ children }) {
    const API = process.env.EXPO_PUBLIC_API_URL;
    var [results, setResults] = useState([]);

    let setID = null;

    async function postResult() {
        try {
            const reqResultSets = await fetch(`${API}/api/ResultSetCount`);
            const count = await reqResultSets.json();
            setID = count + 1;


            const res = await fetch(`${API}/api/Results`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    setID,
                    HCW,
                    moment,
                    action,
                    glove,
                    correctMoment
                })
            })
            console.log(`${setID} - ${HCW} - ${moment} - ${action} - ${glove} - ${correctMoment}`)

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




