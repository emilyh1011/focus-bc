import { useState } from 'react';
import Dropdowns from './Dropdowns';
import Entries from './Entries'
import AIAssisted from './AIAssisted';

function SoloSetup({ entries, setEntries, config, setConfig, setSessionState}) {
    const [aiNudge, setAiNudge] = useState(null);

    const startSession = (e) => {
        e.preventDefault();

        if (!config.studyOrComplete || !config.assignmentType || !config.courseName || !config.entry) return;
        setSessionState('active');
        // Simulate AI Nudge after 5 seconds
        if (config.isAI) {
            setTimeout(() => {
                setAiNudge("I noticed you're browsing social media. Let's get back to '" + config.entry + "'. You've got this!");
            }, 5000);
        }
    };

    return (
        <div className="mx-auto max-w-xl px-6 pt-8">
            <h1 className="text-4xl font-extrabold mb-4 text-center">Solo Focus</h1>
            <p className="text-slate-500 mb-8 text-center">Customize your environment.</p>

            <form className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm backdrop-blur p-8 gap-4">
                <div className=" flex flex-col gap-4">

                    <Dropdowns config={config} setConfig={setConfig} setEntries={setEntries} />

                    {entries.length != 0 &&
                        <Entries config={config} setConfig={setConfig} entries={entries} />}
                </div>

                {/**AI assisted? */}
                <AIAssisted config={config} setConfig={setConfig} />

                <button
                    type="submit"
                    className="w-full font-semibold text-md inline-flex items-center justify-center gap-2 rounded-full px-6 py-3
                             transition 
                            text-white shadow-md bg-gradient-to-r from-teal-400 to-blue-500 hover:cursor-pointer
                            hover:shadow-lg hover:-translate-y-[1px]"
                    onClick={(e) => startSession(e)}
                >
                    Start Focus Session
                </button>
            </form>
        </div>
    );
}
export default SoloSetup;