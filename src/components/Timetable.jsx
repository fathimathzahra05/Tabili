function Timetable({ entries }) {
  if (entries.length === 0) {
    return (
      <div>
        <h2>Timetable</h2>
        <p>Your timetable will appear here once you add entries!</p>
      </div>
    )
  }

  const sorted = [...entries].sort((a, b) => {
    if (a.date < b.date) return -1
    if (a.date > b.date) return 1
    if (a.start < b.start) return -1
    if (a.start > b.start) return 1
    return 0
  })

  const grouped = sorted.reduce((acc, entry) => {
    const key = entry.date || 'No date'
    if (!acc[key]) acc[key] = []
    acc[key].push(entry)
    return acc
  }, {})

  return (
    <div id="timetable-export">
      <h2>Timetable</h2>
      {Object.entries(grouped).map(([date, dayEntries]) => (
        <div key={date}>
          <h3 className="day-label">
            {date === 'No date' ? 'No date' : new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h3>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>
            <tbody>
              {dayEntries.map((entry) => (
                <tr key={entry.id}>
                  <td>
                     <span style={{ borderLeft: `4px solid ${entry.color}`, paddingLeft: '8px' }}>{entry.title}</span>
                     </td>
                  <td>{entry.start || '—'}</td>
                  <td>{entry.end || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

export default Timetable