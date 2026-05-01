import { useState } from 'react'

const COLORS = ['#4f8ef7', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

function EntryForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [color, setColor] = useState(COLORS[0])

  function handleSubmit() {
    if (!title) return
    onAdd({ title, date, start, end, color, id: Date.now() })
    setTitle('')
    setDate('')
    setStart('')
    setEnd('')
    setColor(COLORS[0])
  }

  return (
    <div>
      <h2>Add Entry</h2>
      <div className="form-row" onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}>
        <input
          type="text"
          placeholder="Title (e.g. Math class)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <input
          type="time"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <button className="btn-add" onClick={handleSubmit}>Add</button>
      </div>
      <div className="color-row">
        {COLORS.map((c) => (
          <div
            key={c}
            className={`color-dot ${color === c ? 'selected' : ''}`}
            style={{ background: c }}
            onClick={() => setColor(c)}
          />
        ))}
      </div>
    </div>
  )
}

export default EntryForm