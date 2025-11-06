import React, { useEffect, useState, createContext, useContext } from 'react'
import { useSubmit } from '../Context/SubmitResult';
import { useRouter } from 'expo-router';

const ConfirmSubmitContext = createContext();

export function ConfirmSubmitProvider({ children }) {
    const [confirmSubmitModal, setConfirmSubmitModal] = useState(false);
    const [updateAuditSet, setUpdateAuditSet] = useState(false);

    const { postResult } = useSubmit();
    const router = useRouter();

    useEffect(() => {
        if (updateAuditSet === true) {
            console.log("Submitting Audit...");
            postResult();
            router.replace('/');
            setUpdateAuditSet(false);
        }
    }, [updateAuditSet]);

    async function SubmitAudit() {
        console.log("SubmitAudit CALLED - setConfirmSubmitModal(true)");
        setConfirmSubmitModal(true);

    }
    return (
        <ConfirmSubmitContext.Provider
            value={{
                SubmitAudit,
                confirmSubmitModal, setConfirmSubmitModal, 
                updateAuditSet, setUpdateAuditSet
            }}>
            {children}
        </ConfirmSubmitContext.Provider>
    )
}

export function useConfirmSubmit() {
    return useContext(ConfirmSubmitContext);
};
