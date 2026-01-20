import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import RoomCard from '../components/RoomCard';

const MOCK_ROOMS = [
    { id: 1, subject: 'Study Hall', intensity: 'focused', participants: 3, maxParticipants: 5, duration: 1440, cameraRequired: true }
]

const Rooms = () => {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const filteredRooms = MOCK_ROOMS.filter(room => {
        const matchesSearch = room.subject.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' || room.intensity === filter;
        return matchesSearch && matchesFilter;
    });

    const navigate = useNavigate();

    const handleJoin = (roomId) => {
        console.log('Joining room', roomId);
        navigate(`/rooms/${roomId}`);
    };

    return (
        <div>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 800 }}>Find a Study Room</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Join others and stay accountable.</p>
                </div>
                <Link to="/rooms/create" className="btn btn-primary">
                    + Create Room
                </Link>
            </header>

            {/* Filters & Search */}
            <div className="glass-panel" style={{ padding: '1rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search by subject..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem 0.75rem 3rem',
                            background: '#f1f5f9',
                            border: 'none',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--text-main)',
                            outline: 'none'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['all', 'chill', 'focused', 'no-mercy'].map(type => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-full)',
                                background: filter === type ? 'var(--color-primary)' : 'transparent',
                                border: filter === type ? 'none' : '1px solid #cbd5e1',
                                color: filter === type ? 'white' : 'var(--text-muted)',
                                textTransform: 'capitalize',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                fontWeight: 500
                            }}
                        >
                            {type.replace('-', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem'
            }}>
                {filteredRooms.map(room => (
                    <RoomCard key={room.id} room={room} onJoin={handleJoin} />
                ))}
            </div>
        </div>
    );
};

export default Rooms;
