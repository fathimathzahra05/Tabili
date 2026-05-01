import { useState } from 'react'

const COLORS = ['#4f8ef7', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316']

function WeeklyTimetable({ slots, days, cells, onCellsChange }) {
  const [editing, setEditing] = useState(null)
  const [inputVal, setInputVal] = useState('')
  const [inputColor, setInputColor] = useState(COLORS[0])

  function getKey(day, slot) { return `${day}__${slot}` }

  function openEdit(day, slot) {
    const key = getKey(day, slot)
    const existing = cells[key]
    setEditing(key)
    setInputVal(existing?.text || '')
    setInputColor(existing?.color || COLORS[0])
  }
function saveCell() {
  if (!editing) return
  onCellsChange({ ...cells, [editing]: { text: inputVal, color: inputColor } })
  setEditing(null)
  setInputVal('')
}

function clearCell(key) {
  const updated = { ...cells }
  delete updated[key]
  onCellsChange(updated)
  setEditing(null)
}

  return (
    <div id="timetable-export">
      <h2>Weekly Schedul<p className="export-hide" style={{ fontSize: '13px', color: '#888', marginBottom: '12px' }}>Click any cell to add a subject.</p>e</h2>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '600px' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px 12px', background: '#e8f0fe', border: '1px solid #dde3ed', fontWeight: '700', color: '#1a1a2e', minWidth: '60px' }}>Day</th>
              {slots.map(s => (
                <th key={s} style={{ padding: '10px 8px', background: '#e8f0fe', border: '1px solid #dde3ed', fontWeight: '700', color: '#1a1a2e', textAlign: 'center', minWidth: '90px' }}>{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map(day => (
              <tr key={day}>
                <td style={{ padding: '10px 12px', border: '1px solid #dde3ed', fontWeight: '700', background: '#f8fafc' }}>{day}</td>
                {slots.map(slot => {
                  const key = getKey(day, slot)
                  const cell = cells[key]
                  return (
                    <td
                      key={slot}
                      onClick={() => openEdit(day, slot)}
                      style={{
                        padding: '8px',
                        border: '1px solid #dde3ed',
                        textAlign: 'center',
                        cursor: 'pointer',
                        background: cell ? cell.color + '33' : 'white',
                        borderLeft: cell ? `3px solid ${cell.color}` : '1px solid #dde3ed',
                        transition: 'background 0.15s',
                        minHeight: '48px',
                        verticalAlign: 'middle'
                      }}
                    >
                      {cell ? (
                        <div>
                          <div style={{ fontWeight: '600', color: cell.color, fontSize: '12px' }}>{cell.text}</div>
                        </div>
                      ) : (
                        <span className="export-hide" style={{ color: '#ddd', fontSize: '18px' }}>+</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="modal-overlay" onClick={() => setEditing(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add subject</h2>
            <div className="form-row" style={{ flexDirection: 'column' }}>
              <input
                type="text"
                placeholder="Subject name (e.g. 23CSE304)"
                value={inputVal}
                autoFocus
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') saveCell() }}
              />
            </div>
            <div className="color-row" style={{ marginTop: '12px' }}>
              {COLORS.map(c => (
                <div
                  key={c}
                  className={`color-dot ${inputColor === c ? 'selected' : ''}`}
                  style={{ background: c }}
                  onClick={() => setInputColor(c)}
                />
              ))}
            </div>
            <div className="modal-buttons">
              <button className="btn-save" onClick={saveCell}>Save</button>
              <button className="btn-cancel" onClick={() => { clearCell(editing); setEditing(null) }}>Clear cell</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WeeklyTimetable