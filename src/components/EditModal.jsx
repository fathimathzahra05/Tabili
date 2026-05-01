import { useState } from 'react'

const COLORS = ['#4f8ef7', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

function EditModal({ entry, onSave, onClose }) {
  const [title, setTitle] = useState(entry.title)
  const [date, setDate] = useState(entry.date)
  const [start, setStart] = useState(entry.start)
  const [end, setEnd] = useState(entry.end)
  const [color, setColor] = useState(entry.color)

  function handleSave() {
    if (!title) return
    onSave({ ...entry, title, date, start, end, color })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Entry</h2>
        <div className="form-row">
          <input
            type="text"
            placeholder="Title"
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
        <div className="modal-buttons">
          <button className="btn-save" onClick={handleSave}>Save</button>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default EditModal