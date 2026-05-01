function ExamTimetable({ entries, groups }) {
  if (entries.length === 0) {
    return (
      <div>
        <h2>Exam Schedule</h2>
        <p className="empty-msg">Your exam schedule will appear here!</p>
      </div>
    )
  }

  const sorted = [...entries].sort((a, b) => a.date < b.date ? -1 : 1)

  return (
    <div id="timetable-export">
      <h2>Exam Schedule</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px 14px', background: '#e8f0fe', color: '#1a1a2e', fontWeight: '700', border: '1px solid #dde3ed', textAlign: 'left' }}>
              Date & Session
            </th>
            {groups.map((g) => (
              <th key={g} style={{ padding: '10px 14px', background: '#e8f0fe', color: '#1a1a2e', fontWeight: '700', border: '1px solid #dde3ed', textAlign: 'center' }}>
                {g}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((entry) => {
            const d = new Date(entry.date + 'T00:00:00')
            const dateLabel = d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
            const dayName = d.toLocaleDateString('en-US', { weekday: 'long' })
            return (
              <tr key={entry.id}>
                <td style={{ padding: '12px 14px', border: '1px solid #dde3ed', fontWeight: '700', lineHeight: '1.5' }}>
                  {dateLabel} {entry.session}<br />
                  <span style={{ fontWeight: '400', color: '#666', fontSize: '13px' }}>{dayName}</span>
                </td>
                {groups.map((g) => (
                  <td key={g} style={{ padding: '12px 14px', border: '1px solid #dde3ed', textAlign: 'center', color: '#333' }}>
                    {entry.subjects[g] || '—'}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ExamTimetable