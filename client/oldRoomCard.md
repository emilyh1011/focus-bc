
import React from 'react';
import { Users, Video, Clock } from 'lucide-react';

const INTENSITY_COLORS = {
    chill: 'var(--color-accent)',
    focused: 'var(--color-primary)',
    'no-mercy': 'var(--color-secondary)',
};

// durationMinutes is a number like 45, 90, 1440, etc.
function formatRoomDuration(durationMinutes) {
  if (durationMinutes < 60) {
    return `${durationMinutes} min`;
  }

  const hours = durationMinutes / 60;

  // If it's an exact number of hours (e.g. 60, 120, 1440)
  if (Number.isInteger(hours)) {
    return `${hours} hour${hours === 1 ? '' : 's'}`;
  }

  // Otherwise you can show 1 decimal place (e.g. 90 -> 1.5 hours)
  return `${hours.toFixed(1)} hours`;
}

const RoomCard = ({ room, onJoin }) => {
    const intensityColor = INTENSITY_COLORS[room.intensity] || 'var(--text-muted)';

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'transform 0.2s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <span
                        style={{
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: intensityColor,
                            fontWeight: 'bold',
                            marginBottom: '0.5rem',
                            display: 'block'
                        }}
                    >
                        {room.intensity.replace('-', ' ')}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>{room.subject}</h3>
                </div>
                {room.cameraRequired && (
                    <div title="Camera Required" style={{ color: 'var(--text-muted)' }}>
                        <Video size={16} />
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Users size={16} />
                    <span>{room.participants}/{room.maxParticipants}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={16} />
                    <span>{formatRoomDuration(room.duration)}</span>
                </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
                <button
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    onClick={() => onJoin(room.id)}
                >
                    Join Session
                </button>
            </div>
        </div>
    );
};

export default RoomCard;
