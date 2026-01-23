import React, { createContext, useContext } from 'react';

const SubmitContext = createContext();

export function SubmitProvider({ children }) {
    const API = process.env.EXPO_PUBLIC_API_URL;

    async function postAuditSet(payload) {
        try {
            const res = await fetch(`${API}/api/ResultSets`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            console.log('AuditSet logged')
            const json = await res.json();
            return json.setID
        } catch (error) {
            console.error("FETCH ERROR:", err)
        }
    }

    async function postResult(payload) {
        try {
            // const reqResultSets = await fetch(`${API}/api/ResultSets/lastID`);
            // const setID = await reqResultSets.json()


            const res = await fetch(`${API}/api/Result`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( payload )
            })
            
            console.log('Results logged')
        } catch (err) {
            console.log("FETCH ERROR:", err);
        }

    }
    return (
        <SubmitContext.Provider
            value={{
                postAuditSet,
                postResult
            }}>
            {children}
        </SubmitContext.Provider>
    )
}

export function useSubmit() {
    return useContext(SubmitContext);
}




