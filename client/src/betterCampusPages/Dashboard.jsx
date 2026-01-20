import React from 'react';

function Dashboard(){
    
return(

  <div>
    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 800, color: 'var(--text-main)' }}>Welcome back, Student</h1>
    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Ready to focus today?</p>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Weekly Goal</h3>
        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>12/15 hrs</div>
      </div>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Current Streak</h3>
        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-secondary)' }}>5 Days</div>
      </div>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Total XP</h3>
        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-accent)' }}>1,250</div>
      </div>
    </div>
  </div>
    )
}

export default Dashboard;