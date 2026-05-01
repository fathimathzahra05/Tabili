import { useState } from 'react'
import PreviewModal from './PreviewModal'

const TEMPLATES = [
  {
    id: 'agenda',
    name: 'Daily Agenda',
    description: 'Simple day-by-day schedule. Great for personal planning or events.',
    preview: (
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
        <thead>
          <tr style={{ background: '#ede9fe' }}>
            <th style={{ padding: '6px 10px', textAlign: 'left', color: '#4f46e5' }}>Title</th>
            <th style={{ padding: '6px 10px', textAlign: 'left', color: '#4f46e5' }}>Start</th>
            <th style={{ padding: '6px 10px', textAlign: 'left', color: '#4f46e5' }}>End</th>
          </tr>
        </thead>
        <tbody>
          {[['Math class', '09:00', '10:00'], ['English', '10:00', '11:00'], ['Science', '11:00', '12:00']].map(([t, s, e]) => (
            <tr key={t} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '6px 10px' }}>{t}</td>
              <td style={{ padding: '6px 10px' }}>{s}</td>
              <td style={{ padding: '6px 10px' }}>{e}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  },
  {
    id: 'exam',
    name: 'Exam Schedule',
    description: 'Date based schedule with multiple groups or subjects per row. Perfect for exams.',
    preview: (
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
        <thead>
          <tr style={{ background: '#ede9fe' }}>
            <th style={{ padding: '6px 8px', textAlign: 'left', color: '#4f46e5' }}>Date</th>
            <th style={{ padding: '6px 8px', textAlign: 'left', color: '#4f46e5' }}>Group A</th>
            <th style={{ padding: '6px 8px', textAlign: 'left', color: '#4f46e5' }}>Group B</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['21-05-2026', 'Data Structures', 'OOP'],
            ['26-05-2026', 'Mathematics', 'Discrete Math'],
            ['29-05-2026', 'OOP in Java', 'Comp. Mechanics'],
          ].map(([d, a, b]) => (
            <tr key={d} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '6px 8px', fontWeight: '600' }}>{d}</td>
              <td style={{ padding: '6px 8px' }}>{a}</td>
              <td style={{ padding: '6px 8px' }}>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  },
  {
    id: 'weekly',
    name: 'Weekly Class Schedule',
    description: 'Classic school or college timetable with days as rows and time slots as columns.',
    preview: (
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
        <thead>
          <tr style={{ background: '#ede9fe' }}>
            <th style={{ padding: '5px 6px', color: '#4f46e5' }}>Day</th>
            {['9–10', '10–11', '11–12', '12–1'].map(t => (
              <th key={t} style={{ padding: '5px 6px', color: '#4f46e5' }}>{t}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ['Mon', '#4f46e5', '#10b981', '#f59e0b', '#e5e7eb'],
            ['Tue', '#10b981', '#8b5cf6', '#4f46e5', '#f59e0b'],
            ['Wed', '#f59e0b', '#4f46e5', '#10b981', '#8b5cf6'],
          ].map(([day, ...colors]) => (
            <tr key={day} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '5px 6px', fontWeight: '600' }}>{day}</td>
              {colors.map((c, i) => (
                <td key={i} style={{ padding: '5px 6px', background: c + '33', borderRadius: '4px', textAlign: 'center' }}>
                  {c === '#e5e7eb' ? 'Break' : 'Class'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
]

const MODE_LABELS = { agenda: 'Daily Agenda', exam: 'Exam Schedule', weekly: 'Weekly Schedule' }
const MODE_COLORS = { agenda: '#4f46e5', exam: '#ef4444', weekly: '#10b981' }

function StartPage({ onSelect, savedTimetables, onLoad, onDelete, onRename }) {
  const [renamingId, setRenamingId] = useState(null)
  const [renameVal, setRenameVal] = useState('')
  const [menuOpenId, setMenuOpenId] = useState(null)
  const [previewId, setPreviewId] = useState(null)

  function startRename(tt) {
    setRenamingId(tt.id)
    setRenameVal(tt.name)
  }

  function confirmRename(id) {
    if (renameVal.trim()) onRename(id, renameVal.trim())
    setRenamingId(null)
  }

  return (
    <div className="app">
      <div className="hero-tag">✦ Plan smarter</div>
      <h1>Timetable Generator</h1>
      <p className="subtitle">Choose a template and build your perfect schedule in minutes.</p>

      <div className="template-grid">
        {TEMPLATES.map((t) => (
          <div key={t.id} className="template-card">
            <div className="template-preview">{t.preview}</div>
            <div className="template-info">
              <h2>{t.name}</h2>
              <p>{t.description}</p>
              <button
                className="btn-edit"
                style={{ marginBottom: '6px', textAlign: 'center' }}
                onClick={() => setPreviewId(t.id)}
              >
                👁 Preview
              </button>
              <button className="btn-add" onClick={() => onSelect(t.id)}>
                Use this template →
              </button>
            </div>
          </div>
        ))}
      </div>

      {savedTimetables.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <div className="divider" />
          <div className="my-timetables-header">My Timetables</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {savedTimetables.map((tt) => (
              <div
                key={tt.id}
                className="card"
                style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', cursor: 'pointer' }}
                onClick={() => onLoad(tt.id)}
              >
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: MODE_COLORS[tt.mode], flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  {renamingId === tt.id ? (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }} onClick={e => e.stopPropagation()}>
                      <input
                        value={renameVal}
                        onChange={(e) => setRenameVal(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') confirmRename(tt.id) }}
                        autoFocus
                        style={{ fontSize: '14px', padding: '4px 8px' }}
                      />
                      <button className="btn-save" style={{ padding: '4px 12px', fontSize: '13px', flex: 'none' }} onClick={() => confirmRename(tt.id)}>Save</button>
                      <button className="btn-cancel" style={{ padding: '4px 12px', fontSize: '13px', flex: 'none' }} onClick={() => setRenamingId(null)}>Cancel</button>
                    </div>
                  ) : (
                    <>
                      <div style={{ fontWeight: '600', fontSize: '15px' }}>{tt.name}</div>
                      <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>
                        {MODE_LABELS[tt.mode]} · {tt.entryCount} {tt.entryCount === 1 ? 'entry' : 'entries'} · {tt.savedAt}
                      </div>
                    </>
                  )}
                </div>
                {renamingId !== tt.id && (
                  <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
                    <button
                      className="btn-cancel"
                      onClick={() => setMenuOpenId(menuOpenId === tt.id ? null : tt.id)}
                      style={{ padding: '4px 10px', fontSize: '16px', fontWeight: '700', flex: 'none' }}
                    >···</button>
                    {menuOpenId === tt.id && (
                      <div style={{ position: 'absolute', right: 0, top: '36px', background: 'white', border: '1px solid #ebebf0', borderRadius: '10px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', zIndex: 10, minWidth: '130px', overflow: 'hidden' }}>
                        <div
                          style={{ padding: '10px 16px', fontSize: '14px', cursor: 'pointer', color: '#1a1a2e' }}
                          onClick={() => { startRename(tt); setMenuOpenId(null) }}
                        > Rename</div>
                        <div
                          style={{ padding: '10px 16px', fontSize: '14px', cursor: 'pointer', color: '#dc2626' }}
                          onClick={() => { onDelete(tt.id); setMenuOpenId(null) }}
                        > Delete</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {previewId && (
        <PreviewModal
          templateId={previewId}
          onClose={() => setPreviewId(null)}
          onUse={() => { onSelect(previewId); setPreviewId(null) }}
        />
      )}
    </div>
  )
}

export default StartPage