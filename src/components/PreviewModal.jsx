const PREVIEWS = {
  agenda: {
    name: 'Daily Agenda',
    description: 'Organize your day with a simple time-based list. Perfect for personal planning, events, or any day-by-day schedule.',
    content: (
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px 14px', background: '#ede9fe', color: '#4f46e5', fontWeight: '700', borderBottom: '2px solid #4f46e5', textAlign: 'left' }}>Title</th>
            <th style={{ padding: '10px 14px', background: '#ede9fe', color: '#4f46e5', fontWeight: '700', borderBottom: '2px solid #4f46e5', textAlign: 'left' }}>Date</th>
            <th style={{ padding: '10px 14px', background: '#ede9fe', color: '#4f46e5', fontWeight: '700', borderBottom: '2px solid #4f46e5', textAlign: 'left' }}>Start</th>
            <th style={{ padding: '10px 14px', background: '#ede9fe', color: '#4f46e5', fontWeight: '700', borderBottom: '2px solid #4f46e5', textAlign: 'left' }}>End</th>
          </tr>
        </thead>
        <tbody>
          {[
            { title: 'Morning Standup', date: 'Mon, Apr 20', start: '09:00', end: '09:30', color: '#4f46e5' },
            { title: 'Math Class', date: 'Mon, Apr 20', start: '10:00', end: '11:00', color: '#10b981' },
            { title: 'Lunch Break', date: 'Mon, Apr 20', start: '12:00', end: '13:00', color: '#f59e0b' },
            { title: 'Science Lab', date: 'Mon, Apr 20', start: '13:00', end: '14:30', color: '#ef4444' },
            { title: 'English Class', date: 'Tue, Apr 21', start: '09:00', end: '10:00', color: '#8b5cf6' },
            { title: 'History', date: 'Tue, Apr 21', start: '10:00', end: '11:00', color: '#f97316' },
          ].map((r, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f3f3f7' }}>
              <td style={{ padding: '10px 14px' }}>
                <span style={{ borderLeft: `3px solid ${r.color}`, paddingLeft: '8px', fontWeight: '600' }}>{r.title}</span>
              </td>
              <td style={{ padding: '10px 14px', color: '#888' }}>{r.date}</td>
              <td style={{ padding: '10px 14px' }}>{r.start}</td>
              <td style={{ padding: '10px 14px' }}>{r.end}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  },
  exam: {
    name: 'Exam Schedule',
    description: 'Track exams across multiple groups or departments. Each row is a date, each column is a group.',
    content: (
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr>
            {['Date & Session', 'CSE', 'AIE', 'CYS', 'AID'].map(h => (
              <th key={h} style={{ padding: '10px 14px', background: '#ede9fe', color: '#4f46e5', fontWeight: '700', borderBottom: '2px solid #4f46e5', border: '1px solid #e0e0ea', textAlign: 'center' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { date: '21-05-2026', session: 'FN', day: 'Thursday', subjects: ['Data Structures', 'OOP', 'Digital Signal Processing', 'Object Oriented Prog.'] },
            { date: '26-05-2026', session: 'FN', day: 'Tuesday', subjects: ['Discrete Mathematics', 'Mathematics for Computing', 'Discrete Math', 'Math for Intelligent Sys.'] },
            { date: '29-05-2026', session: 'FN', day: 'Friday', subjects: ['Linear Algebra', 'OOP in Java', 'Number Theory', 'Computational Mechanics'] },
            { date: '02-06-2026', session: 'AN', day: 'Tuesday', subjects: ['Glimpses of India', 'Glimpses of India', 'Glimpses of India', 'Glimpses of India'] },
          ].map((r, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f3f3f7' }}>
              <td style={{ padding: '12px 14px', border: '1px solid #e0e0ea', fontWeight: '700', lineHeight: '1.5' }}>
                {r.date} {r.session}<br />
                <span style={{ fontWeight: '400', color: '#888', fontSize: '12px' }}>{r.day}</span>
              </td>
              {r.subjects.map((s, j) => (
                <td key={j} style={{ padding: '10px 14px', border: '1px solid #e0e0ea', textAlign: 'center', color: '#333', fontSize: '13px' }}>{s}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  },
  weekly: {
    name: 'Weekly Class Schedule',
    description: 'Classic school or college timetable. Days are rows, time slots are columns. Click any cell to add a subject.',
    content: (
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px 12px', background: '#ede9fe', color: '#4f46e5', fontWeight: '700', border: '1px solid #e0e0ea' }}>Day</th>
            {['9:00-9:50', '9:50-10:40', '10:50-11:40', '11:40-12:30', '12:30-1:20', '1:20-2:10', '2:10-3:00'].map(s => (
              <th key={s} style={{ padding: '10px 8px', background: '#ede9fe', color: '#4f46e5', fontWeight: '700', border: '1px solid #e0e0ea', textAlign: 'center', fontSize: '12px' }}>{s}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { day: 'Mon', cells: [{ text: '23CSE312', color: '#4f46e5' }, { text: 'Tutorial Hour', color: '#f59e0b' }, { text: '23CSE304', color: '#ef4444' }, { text: '23CSE304', color: '#ef4444' }, null, { text: 'Counsellor Hr', color: '#10b981' }, null] },
            { day: 'Tue', cells: [{ text: '23LSE311', color: '#8b5cf6' }, { text: '23LSE311', color: '#8b5cf6' }, null, null, { text: 'Problem Solving', color: '#f97316' }, { text: 'Problem Solving', color: '#f97316' }, { text: '23CSE314', color: '#4f46e5' }] },
            { day: 'Wed', cells: [{ text: '23CSE312', color: '#4f46e5' }, { text: '23CSE314', color: '#10b981' }, { text: 'PE III', color: '#f59e0b' }, { text: '23CSE304', color: '#ef4444' }, null, { text: '23CSE312', color: '#4f46e5' }, { text: '23CSE313', color: '#8b5cf6' }] },
            { day: 'Thu', cells: [{ text: '23CSE314', color: '#10b981' }, { text: '23CSE313', color: '#8b5cf6' }, { text: '23CSE304', color: '#ef4444' }, { text: 'PE III', color: '#f59e0b' }, null, null, null] },
            { day: 'Fri', cells: [{ text: '23CSE399', color: '#4f46e5' }, { text: '23CSE399', color: '#4f46e5' }, { text: '23LSE311', color: '#8b5cf6' }, null, null, { text: 'PE III', color: '#f59e0b' }, { text: 'CS Sprints', color: '#10b981' }] },
          ].map((row, i) => (
            <tr key={i}>
              <td style={{ padding: '10px 12px', border: '1px solid #e0e0ea', fontWeight: '700', background: '#fafafc' }}>{row.day}</td>
              {row.cells.map((cell, j) => (
                <td key={j} style={{ padding: '8px', border: '1px solid #e0e0ea', textAlign: 'center', background: cell ? cell.color + '22' : 'white', borderLeft: cell ? `3px solid ${cell.color}` : '1px solid #e0e0ea' }}>
                  {cell ? <span style={{ fontWeight: '600', color: cell.color, fontSize: '11px' }}>{cell.text}</span> : <span style={{ color: '#ddd' }}>+</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

function PreviewModal({ templateId, onClose, onUse }) {
  const preview = PREVIEWS[templateId]
  if (!preview) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: 'white', borderRadius: '20px', padding: '32px', width: '90%', maxWidth: '900px', maxHeight: '85vh', overflow: 'auto', boxShadow: '0 16px 48px rgba(0,0,0,0.15)', border: '1px solid #ebebf0' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div>
            <div className="hero-tag">Preview</div>
            <h1 style={{ fontSize: '1.5rem', marginTop: '4px' }}>{preview.name}</h1>
            <p style={{ color: '#888', fontSize: '14px', marginTop: '6px', marginBottom: '20px' }}>{preview.description}</p>
          </div>
          <button className="btn-cancel" style={{ flex: 'none', padding: '8px 14px' }} onClick={onClose}>✕</button>
        </div>
        <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #ebebf0' }}>
          {preview.content}
        </div>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-add" style={{ padding: '12px 28px', fontSize: '15px' }} onClick={onUse}>
            Use this template →
          </button>
        </div>
      </div>
    </div>
  )
}

export default PreviewModal