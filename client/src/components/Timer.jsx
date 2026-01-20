import React, { useEffect, useState } from 'react';
import { Play, Pause, Square } from 'lucide-react';

const Timer = ({ durationMinutes, onComplete, onStop }) => {
    const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            onComplete();
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, onComplete]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const progress = ((durationMinutes * 60 - timeLeft) / (durationMinutes * 60)) * 100;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            {/* Circular Timer Visualization */}
            <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="300" height="300" style={{ transform: 'rotate(-90deg)' }}>
                    <circle
                        cx="150"
                        cy="150"
                        r="140"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="10"
                    />
                    <circle
                        cx="150"
                        cy="150"
                        r="140"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="10"
                        strokeDasharray={2 * Math.PI * 140}
                        strokeDashoffset={2 * Math.PI * 140 * (1 - (timeLeft / (durationMinutes * 60)))}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 1s linear' }}
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#2dd4bf" />
                            <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                    </defs>
                </svg>
                <div style={{ position: 'absolute', fontSize: '4rem', fontWeight: 'bold', fontFamily: 'monospace', color: 'var(--text-main)' }}>
                    {formatTime(timeLeft)}
                </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                    className="btn"
                    style={{ background: '#f1f5f9', width: '60px', height: '60px', borderRadius: '50%', padding: 0, color: 'var(--text-main)' }}
                    onClick={() => setIsActive(!isActive)}
                >
                    {isActive ? <Pause size={28} /> : <Play size={28} />}
                </button>
                <button
                    className="btn"
                    style={{ background: '#fee2e2', color: '#ef4444', width: '60px', height: '60px', borderRadius: '50%', padding: 0 }}
                    onClick={onStop}
                >
                    <Square size={28} />
                </button>
            </div>
        </div>
    );
};

export default Timer;
