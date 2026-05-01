import { useState } from 'react'

function SaveModal({ onSave, onDiscard }) {
  const [name, setName] = useState('')

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Save your timetable?</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
          Give it a name or leave it as untitled.
        </p>
        <input
          type="text"
          placeholder="e.g. Semester 1 Exams (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onSave(name || 'Untitled') }}
          autoFocus
        />
        <div className="modal-buttons" style={{ marginTop: '16px' }}>
          <button className="btn-save" onClick={() => onSave(name || 'Untitled')}>Save</button>
          <button className="btn-cancel" onClick={onDiscard}>Discard</button>
        </div>
      </div>
    </div>
  )
}

export default SaveModal