import React, { useState, onChange, onSubmit } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Users, NotebookPen, TextWrap } from 'lucide-react';
import Timer from '../components/Timer';

const RoomSession = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [micOn, setMicOn] = useState(false);
    const [cameraOn, setCameraOn] = useState(true);
    const [showChat, setShowChat] = useState(false);
    const [sessionState, setSessionState] = useState('active'); // active | recap

    const [showGoals, setShowGoals] = useState(false);
    const [goalDescription, setGoalDescription] = useState(null);


    const handleLeave = () => {
        if (confirm('Are you sure you want to end the session?')) {
            setSessionState('recap');
        }
    };

    function handleSubmitIntention() {

    }

    if (sessionState === 'recap') {
        return (
            <div className="container" style={{ maxWidth: '600px', textAlign: 'center', paddingTop: '4rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 800 }}>Session Complete!</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>You stayed focused with your group.</p>

                <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-around' }}>
                    <div>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>45</div>
                        <div style={{ textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Minutes</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--color-secondary)' }}>12</div>
                        <div style={{ textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Streak</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--color-accent)' }}>+50</div>
                        <div style={{ textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--text-muted)' }}>XP Earned</div>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', textAlign: 'left' }}>
                    <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600 }}>Quick Reflection</label>
                    <textarea
                        placeholder="How did it go? What did you accomplish?"
                        style={{
                            width: '100%',
                            height: '100px',
                            padding: '1rem',
                            background: '#f8fafc',
                            border: '1px solid #cbd5e1',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--text-main)',
                            resize: 'none'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button className="btn btn-ghost" onClick={() => navigate('/rooms')}>Back to Rooms</button>
                    <button className="btn btn-primary" onClick={() => navigate('/')}>Go to Dashboard</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ height: 'calc(100vh - 4rem)', display: 'flex', gap: '1rem', overflow: 'hidden' }}>
            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Calculus II Study Group</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            <span className="status-dot" style={{ width: 8, height: 8, background: '#22c55e', borderRadius: '50%' }}></span>
                            Live Session • 45m remaining
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <div className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Users size={16} />
                            <span>4/5</span>
                        </div>
                    </div>
                </div>

                {/* Video Grid */}
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', minHeight: 0 }}>
                    {/* Self */}
                    <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden', background: '#0f172a' }}>
                        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(0,0,0,0.5)', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                            You {cameraOn ? '' : '(Camera Off)'}
                        </div>
                        {!cameraOn && (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                                <VideoOff size={48} />
                            </div>
                        )}
                    </div>

                    {/* Peer 1 */}
                    <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden', background: '#1e293b' }}>
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' }}>JD</div>
                        </div>
                        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(0,0,0,0.5)', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                            John Doe
                        </div>
                    </div>

                    {/* Peer 2 */}
                    <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden', background: '#1e293b' }}>
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--color-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' }}>AS</div>
                        </div>
                        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(0,0,0,0.5)', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                            Alice Smith
                        </div>
                    </div>

                    {/* Timer Placeholder / Focus View */}
                    <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', fontFamily: 'monospace', color: 'var(--text-main)' }}>24:59</div>
                        <div style={{ color: 'var(--text-muted)' }}>Focus Time</div>
                    </div>
                </div>

                {/* Controls Bar */}
                <div className="glass-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                    <button
                        className={`btn ${micOn ? 'btn-primary' : 'btn-ghost'}`}
                        style={{ borderRadius: '50%', width: 50, height: 50, padding: 0, background: micOn ? 'var(--color-primary)' : '#f1f5f9', color: micOn ? 'white' : 'var(--text-main)' }}
                        onClick={() => setMicOn(!micOn)}
                    >
                        {micOn ? <Mic size={20} /> : <MicOff size={20} />}
                    </button>

                    <button
                        className={`btn ${cameraOn ? 'btn-primary' : 'btn-ghost'}`}
                        style={{ borderRadius: '50%', width: 50, height: 50, padding: 0, background: cameraOn ? 'var(--color-primary)' : '#f1f5f9', color: cameraOn ? 'white' : 'var(--text-main)' }}
                        onClick={() => setCameraOn(!cameraOn)}
                    >
                        {cameraOn ? <Video size={20} /> : <VideoOff size={20} />}
                    </button>

                    <button
                        className="btn btn-ghost"
                        style={{ borderRadius: '50%', width: 50, height: 50, padding: 0, background: showChat ? '#eff6ff' : '#f1f5f9', color: showChat ? 'var(--color-primary)' : 'var(--text-main)' }}
                        onClick={() => {
                            if (showChat) {
                                setShowChat(false);
                            } else {
                                setShowGoals(false);
                                setShowChat(true);
                            }
                        }}
                    >
                        <MessageSquare size={20} />
                    </button>

                    <button
                        className="btn btn-ghost"
                        style={{ borderRadius: '50%', width: 50, height: 50, padding: 0, background: showGoals ? '#eff6ff' : '#f1f5f9', color: showGoals ? 'var(--color-primary)' : 'var(--text-main)' }}
                        onClick={() => {
                            if (showGoals) {
                                setShowGoals(false);
                            } else {
                                setShowChat(false);
                                setShowGoals(true);
                            }
                        }}
                    >
                        <NotebookPen size={20} />
                    </button>

                    <div style={{ width: 1, background: '#e2e8f0', margin: '0 0.5rem' }}></div>

                    <button
                        className="btn"
                        style={{ borderRadius: '50%', width: 50, height: 50, padding: 0, background: '#ef4444', color: 'white' }}
                        onClick={handleLeave}
                    >
                        <PhoneOff size={20} />
                    </button>
                </div>
            </div>

            {/* Chat Sidebar (Collapsible) */}
            {(showChat && !showGoals) ? (
                <div className="glass-panel" style={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>
                        Room Chat
                    </div>
                    <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-secondary)', marginBottom: '0.25rem' }}>Alice Smith</div>
                            <div style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '8px', fontSize: '0.9rem' }}>
                                Hey everyone! Ready to focus?
                            </div>
                        </div>
                    </div>
                    <div style={{ padding: '1rem', borderTop: '1px solid #e2e8f0' }}>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-full)',
                                border: '1px solid #cbd5e1',
                                background: 'white',
                                color: 'var(--text-main)',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>
            ) : null}

            {(showGoals && !showChat) ?
                <div className="glass-panel" style={{ width: '300px', display: 'flex', flexDirection: 'column', padding: '1rem' }}>

                    <div style={{ paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>
                        <span>Intentions Board: </span>
                    </div>

                    <form onSubmit={handleSubmitIntention} style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '1rem', borderRadius: "10%", borderStyle: 'solid', borderWidth: '1px', borderColor: 'lightgray' }}>

                        <flex>
                            <div
                                style={{ width: '20px', height: '20px', color: 'gray' }}></div>
                            <span>My Intention: </span>
                        </flex>

                        <textarea rows={5} cols={60} value={goalDescription}
                            onChange={(e) => { setGoalDescription(e.target.value) }}
                            placeholder="Set your intentions for this session."
                            style={{
                                width: '100%',
                                height: '100px',
                                resize: 'none',
                                border: 'none',
                                focus: {
                                    border: 'none',
                                    outline: 'none'
                                }
                            }} />
                    </form>
                </div>
                : null}
        </div>
    );
};

export default RoomSession;
