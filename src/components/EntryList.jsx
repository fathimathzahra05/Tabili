const COLORS = ['#4f8ef7', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

function EntryList({ entries, onRemove, onEdit }) {
  return (
    <div>
      <h2>Entries</h2>
      {entries.length === 0 && <p className="empty-msg">No entries yet. Add one above!</p>}
      {entries.map((entry) => (
        <div className="entry-item" key={entry.id}>
          <span className="entry-title" style={{ borderLeft: `4px solid ${entry.color}`, paddingLeft: '8px' }}>{entry.title}</span>
          <span className="entry-meta">{entry.date}</span>
          <span className="entry-meta">{entry.start}{entry.end ? ` → ${entry.end}` : ''}</span>
          <button className="btn-edit" onClick={() => onEdit(entry)}>Edit</button>
          <button className="btn-remove" onClick={() => onRemove(entry.id)}>Remove</button>
        </div>
      ))}
    </div>
  )
}

export default EntryList