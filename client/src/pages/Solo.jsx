import React, { useState, useEffect } from 'react';
import {CheckCircle} from 'lucide-react';
import Timer from '../components/Timer';

import SoloSetup from '../components/solo-setup/SoloSetup';
import SoloSession from '../components/solo-session/SoloSession';

const Solo = () => {
    const [sessionState, setSessionState] = useState('setup'); // setup | active | recap
    const defaultConfig = {
        studyOrComplete: "",
        assignmentType: "",
        courseName: "",
        entry: null,
        duration: 25,
        isAI: false // AI assisted or no
    };
    const [config, setConfig] = useState(defaultConfig);

    const [entries, setEntries] = useState([]);


    if (sessionState === 'setup') {
        return (<SoloSetup entries = {entries} setEntries = {setEntries}
            config = {config} setConfig={setConfig} setSessionState = {setSessionState}/>)
    }

    if (sessionState === 'active') {
       return(<SoloSession config = {config} setConfig={setConfig} setSessionState = {setSessionState}/>)
    }

    return (
        <div className="mx-auto max-w-5xl px-6" style={{ maxWidth: '600px', textAlign: 'center', paddingTop: '4rem' }}>
            <CheckCircle size={64} style={{ color: '#22c55e', margin: '0 auto 1rem' }} />
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 800 }}>Session Complete!</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>Great job working on your {config.courseName} {config.assignmentType} "{config.entry.name}".</p>

            <button className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3
                text-sm font-medium transition
                text-white shadow-md bg-gradient-to-r from-teal-400 to-blue-500
                hover:shadow-lg hover:-translate-y-[1px]
                hover:cursor-pointer"
                onClick={() => {
                    setSessionState('setup');
                    setConfig(defaultConfig);
                }}>Start New Session</button>
        </div>
    );
};

export default Solo;
