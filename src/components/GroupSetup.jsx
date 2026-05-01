import { useState } from 'react'

function GroupSetup({ existing, onConfirm }) {
  const [input, setInput] = useState('')
  const [groups, setGroups] = useState(existing || [])

  function addGroup() {
    const trimmed = input.trim()
    if (!trimmed || groups.includes(trimmed)) return
    setGroups([...groups, trimmed])
    setInput('')
  }

  function removeGroup(g) {
    setGroups(groups.filter((x) => x !== g))
  }

  return (
    <div className="card">
      <h2>Set up your groups</h2>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
        Add the groups or departments that will have subjects (e.g. AIE, AID, CSE)
      </p>
      <div className="form-row" onKeyDown={(e) => { if (e.key === 'Enter') addGroup() }}>
        <input
          type="text"
          placeholder="Group name (e.g. CSE)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn-add" onClick={addGroup}>Add Group</button>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
        {groups.map((g) => (
          <div key={g} style={{ background: '#ede9fe', color: '#4f46e5', padding: '6px 12px', borderRadius: '99px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {g}
            <span style={{ cursor: 'pointer', color: '#dc2626' }} onClick={() => removeGroup(g)}>×</span>
          </div>
        ))}
      </div>
      {groups.length > 0 && (
        <button className="btn-add" style={{ marginTop: '16px' }} onClick={() => onConfirm(groups)}>
          Continue →
        </button>
      )}
    </div>
  )
}

export default GroupSetup