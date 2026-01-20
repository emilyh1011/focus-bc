import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, Video, Lock, Globe } from 'lucide-react';

const CreateRoom = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        subject: 'any', //default; dropdown options: any, data structures, algorithms, operating systems, general chemistry, organic chemistry, biology, calculus 1, calculus 2, calculus 3, linear algebra, psychology, statistics, data science, anatomy, marketing, financial accounting, financial statement analysis, economics
        description: '', //max: 240 chars
        intensity: 'focused', //default, options: chill, focused, no mercy
        duration: 30, //default; dropdown options: 30, 1 hour, 1.5 hour, 2 hours, 2.5 hours, 3 hours
        maxParticipants: 2, //default lowest value, max number 50 atm
        cameraRequired: false, //default unless checked
        isPrivate: false, //only through invite
        invitees: [], //sends invite to user's inbox when room created
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Creating room:', formData);
        // Mock creation and redirect
        navigate('/peers');
    };

    return (
        <div className="mx-auto max-w-5xl px-6">
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 800 }}>Create a Study Room</h1>
                <p style={{ color: 'var(--text-muted)' }}>Set the rules and invite others.</p>
            </header>

            <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '2rem' }}>
                {/* Subject */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Subject / Topic</label>
                    <input
                        type="text"
                        required
                        placeholder="e.g. Calculus Midterm Prep"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: '#f8fafc',
                            border: '1px solid #cbd5e1',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--text-main)',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                {/* Grid Settings */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>

                    {/* Intensity */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Intensity</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {['chill', 'focused', 'no-mercy'].map(type => (
                                <label
                                    key={type}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius-sm)',
                                        background: formData.intensity === type ? '#eff6ff' : '#f8fafc',
                                        border: formData.intensity === type ? '1px solid var(--color-primary)' : '1px solid transparent',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        color: formData.intensity === type ? 'var(--color-primary)' : 'var(--text-muted)',
                                        fontWeight: formData.intensity === type ? 600 : 400
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="intensity"
                                        value={type}
                                        checked={formData.intensity === type}
                                        onChange={(e) => setFormData({ ...formData, intensity: e.target.value })}
                                        style={{ marginRight: '0.75rem' }}
                                    />
                                    <span style={{ textTransform: 'capitalize' }}>{type.replace('-', ' ')}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Controls */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Duration</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Clock size={20} className="text-muted" />
                                <select
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        background: '#f8fafc',
                                        border: '1px solid #cbd5e1',
                                        borderRadius: 'var(--radius-sm)',
                                        color: 'var(--text-main)'
                                    }}
                                >
                                    <option value={25}>25 Minutes</option>
                                    <option value={45}>45 Minutes</option>
                                    <option value={60}>60 Minutes</option>
                                    <option value={90}>90 Minutes</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Max Participants</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Users size={20} className="text-muted" />
                                <input
                                    type="number"
                                    min="2"
                                    max="50"
                                    value={formData.maxParticipants}
                                    onChange={(e) => setFormData({ ...formData, maxParticipants: Number(e.target.value) })}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        background: '#f8fafc',
                                        border: '1px solid #cbd5e1',
                                        borderRadius: 'var(--radius-sm)',
                                        color: 'var(--text-main)'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Toggles */}
                <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', padding: '1.5rem', background: '#f8fafc', borderRadius: 'var(--radius-md)' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={formData.cameraRequired}
                            onChange={(e) => setFormData({ ...formData, cameraRequired: e.target.checked })}
                            style={{ width: '1.25rem', height: '1.25rem' }}
                        />
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                                <Video size={18} />
                                Camera Required
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Participants must have video on</div>
                        </div>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={formData.isPrivate}
                            onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
                            style={{ width: '1.25rem', height: '1.25rem' }}
                        />
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                                {formData.isPrivate ? <Lock size={18} /> : <Globe size={18} />}
                                {formData.isPrivate ? 'Invite Only' : 'Public Listing'}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                {formData.isPrivate ? 'Only people with the link can join' : 'Anyone can find and join this room'}
                            </div>
                        </div>
                    </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <button type="button" className="btn btn-ghost" onClick={() => navigate('/peers')}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Create Room</button>
                </div>
            </form>
        </div>
    );
};

export default CreateRoom;
