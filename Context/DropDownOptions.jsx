import React, { useEffect, useState } from 'react';

export function useDropDown() {
    const [orgOptions, setOrgOptions] = useState([]);
    const [deptOptions, setDeptOptions] = useState([]);
    const [auditorOptions, setAuditorOptions] = useState([]);
    const [org, setOrg] = useState(null);
    const [department, setDepartment] = useState(null);
    const [auditor, setAuditor] = useState(null);
    
    const [HCWOptions, setHCWOptions] = useState([]);
    const [momentOptions, setMomentOptions] = useState([]);
    const [actionOptions, setActionOptions] = useState([]);
    const [gloveOptions, setGloveOptions] = useState([]);

    const API = process.env.EXPO_PUBLIC_API_URL;

    useEffect(() => {
        async function loadOrg() {
            try {
                const reqOrgs = await fetch(`${API}/api/Organisation`);
                const Orgs = await reqOrgs.json();
                setOrgOptions(Orgs.map(o => ({ label: o.OrgName, value: o.OrgID })))

            } catch (err) {
                console.log("FETCH ERROR:", err);
            }
        }
        loadOrg();
    }, []);

    useEffect(() => {
        if (!org) return;

        (async () => {
            const reqDepts = await fetch(`${API}/api/Department/${org}`);
            const Depts = await reqDepts.json();
            setDeptOptions(Depts.map(d => ({ label: `${d.DeptName} - ${d.DeptSpecialty}`, value: d.DeptCode })))
        })();

    }, [org]);

    useEffect(() => {
        if (!department) return;

        (async () => {
            const reqAuditors = await fetch(`${API}/api/Auditors/${department}`);
            const Auditors = await reqAuditors.json();
            setAuditorOptions(Auditors.map(a => ({ label: a.AuditorName, value: a.AuditorID })))
        })();

    }, [department]);

    useEffect(() => {
        async function loadHCW() {
            try{
                const reqHCW = await fetch(`${API}/api/HCW`);
                const HCW = await reqHCW.json();
                setHCWOptions(HCW.map(h => ({ label: `${h.Type} - ${h.Description}`, value: h.Type})))
            }catch (err) {
                console.log("FETCH ERROR:", err);
            }
        }
        loadHCW();
    }, []);

    useEffect(() => {
        async function loadMoment() {
            try{
                const reqMoment = await fetch(`${API}/api/Moments`);
                const moment = await reqMoment.json();
                setMomentOptions(moment.map(m => ({ label: `${m.Moment} - ${m.Title}`, value: m.Moment})))
            }catch (err) {
                console.log("FETCH ERROR:", err);
            }
        }
        loadMoment();
    }, []);

    useEffect(() => {
        async function loadAction() {
            try{ 
                const reqAction = await fetch(`${API}/api/Actions`); 
                const action = await reqAction.json();
                setActionOptions(action.map(a => ({ label: a.Action, value: a.Action})))
            }catch(err) {
                console.log("FETCH ERROR:", err);
            }
        }
        loadAction();
    }, []);

    useEffect(() => {
        async function loadGlove() {
            try{
                const reqGlove = await fetch(`${API}/api/Glove`);
                const glove = await reqGlove.json();
                setGloveOptions(glove.map(g => ({ label: g.Glove, value: g.Glove })))
            }catch(err) {
                console.log("FETCH ERROR:", err);
            }
        }
        loadGlove();
    }, []);

    return { orgOptions, 
            deptOptions, 
            auditorOptions, 
            HCWOptions,  
            momentOptions, 
            actionOptions, 
            gloveOptions,
            org, 
            department, 
            auditor,
            setOrg, 
            setDepartment, 
            setAuditor,            
        }
}


