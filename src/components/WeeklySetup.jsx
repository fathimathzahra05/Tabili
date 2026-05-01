import { useState } from 'react'

const DEFAULT_SLOTS = ['9:00-9:50', '9:50-10:40', '10:50-11:40', '11:40-12:30', '12:30-1:20', '1:20-2:10', '2:10-3:00']
const DEFAULT_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

function formatTime(t) {
  if (!t) return ''
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'pm' : 'am'
  const hour = h % 12 || 12
  return `${hour}:${m.toString().padStart(2, '0')}${ampm}`
}

function WeeklySetup({ existing, onConfirm }) {
  const [slots, setSlots] = useState(existing?.slots || DEFAULT_SLOTS)
  const [days, setDays] = useState(existing?.days || DEFAULT_DAYS)
  const [slotStart, setSlotStart] = useState('')
  const [slotEnd, setSlotEnd] = useState('')
  const [dayInput, setDayInput] = useState('')

  function addSlot() {
    if (!slotStart || !slotEnd) return
    const label = `${formatTime(slotStart)}-${formatTime(slotEnd)}`
    if (slots.includes(label)) return
    setSlots([...slots, label])
    setSlotStart('')
    setSlotEnd('')
  }

  function addDay() {
    const t = dayInput.trim()
    if (!t || days.includes(t)) return
    setDays([...days, t])
    setDayInput('')
  }

  return (
    <div className="card">
      <h2>Set up your weekly schedule</h2>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
        Define your time slots and days before filling in subjects.
      </p>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '8px' }}>Time slots</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
          {slots.map((s) => (
            <div key={s} style={{ background: '#e8f0fe', color: '#1a1a2e', padding: '5px 12px', borderRadius: '99px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {s}
              <span style={{ cursor: 'pointer', color: '#dc2626' }} onClick={() => setSlots(slots.filter(x => x !== s))}>×</span>
            </div>
          ))}
        </div>
        <div className="form-row" style={{ alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
            <span style={{ fontSize: '13px', color: '#666', whiteSpace: 'nowrap' }}>From</span>
            <input type="time" value={slotStart} onChange={(e) => setSlotStart(e.target.value)} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
            <span style={{ fontSize: '13px', color: '#666', whiteSpace: 'nowrap' }}>To</span>
            <input type="time" value={slotEnd} onChange={(e) => setSlotEnd(e.target.value)} />
          </div>
          <button className="btn-add" onClick={addSlot}>Add slot</button>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '8px' }}>Days</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
          {days.map((d) => (
            <div key={d} style={{ background: '#f0fdf4', color: '#166534', padding: '5px 12px', borderRadius: '99px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {d}
              <span style={{ cursor: 'pointer', color: '#dc2626' }} onClick={() => setDays(days.filter(x => x !== d))}>×</span>
            </div>
          ))}
        </div>
        <div className="form-row" onKeyDown={(e) => { if (e.key === 'Enter') addDay() }}>
          <input type="text" placeholder="e.g. Sat" value={dayInput} onChange={(e) => setDayInput(e.target.value)} />
          <button className="btn-add" onClick={addDay}>Add day</button>
        </div>
      </div>

      {slots.length > 0 && days.length > 0 && (
        <button className="btn-add" onClick={() => onConfirm({ slots, days })}>
          Continue →
        </button>
      )}
    </div>
  )
}

export default WeeklySetup