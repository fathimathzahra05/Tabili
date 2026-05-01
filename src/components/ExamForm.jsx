import { useState } from 'react'

function ExamForm({ onAdd, groups }) {
  const [date, setDate] = useState('')
  const [session, setSession] = useState('FN')
  const [subjects, setSubjects] = useState({})

  function handleSubjectChange(group, value) {
    setSubjects({ ...subjects, [group]: value })
  }

  function handleSubmit() {
    if (!date) return
    onAdd({ date, session, subjects, id: Date.now() })
    setDate('')
    setSession('FN')
    setSubjects({})
  }

  return (
    <div>
      <h2>Add Exam Entry</h2>
      <div className="form-row" onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <select value={session} onChange={(e) => setSession(e.target.value)}>
          <option value="FN">FN (Forenoon)</option>
          <option value="AN">AN (Afternoon)</option>
        </select>
      </div>
      <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {groups.map((group) => (
          <div key={group} className="form-row">
            <label style={{ minWidth: '80px', fontSize: '14px', fontWeight: '600', paddingTop: '10px' }}>{group}</label>
            <input
              type="text"
              placeholder={`Subject for ${group}`}
              value={subjects[group] || ''}
              onChange={(e) => handleSubjectChange(group, e.target.value)}
            />
          </div>
        ))}
      </div>
      <button className="btn-add" style={{ marginTop: '12px' }} onClick={handleSubmit}>Add Row</button>
    </div>
  )
}

export default ExamForm