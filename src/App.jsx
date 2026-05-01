import ExportButton from './components/ExportButton'
import EntryForm from './components/EntryForm'
import EntryList from './components/EntryList'
import Timetable from './components/Timetable'
import EditModal from './components/EditModal'
import StartPage from './components/StartPage'
import ExamForm from './components/ExamForm'
import ExamTimetable from './components/ExamTimetable'
import GroupSetup from './components/GroupSetup'
import WeeklySetup from './components/WeeklySetup'
import WeeklyTimetable from './components/WeeklyTimetable'
import SaveModal from './components/SaveModal'
import LandingPage from './components/LandingPage'
import { useState, useEffect } from 'react'
import './App.css'

function getSaved() {
  const s = localStorage.getItem('tt-saved')
  return s ? JSON.parse(s) : []
}

function App() {
  const [showLanding, setShowLanding] = useState(true)
  const [mode, setMode] = useState(null)
  const [entries, setEntries] = useState([])
  const [editingEntry, setEditingEntry] = useState(null)
  const [groups, setGroups] = useState(null)
  const [weeklyConfig, setWeeklyConfig] = useState(null)
  const [weeklyCells, setWeeklyCells] = useState({})
  const [savedTimetables, setSavedTimetables] = useState(getSaved)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [currentId, setCurrentId] = useState(null)

  useEffect(() => {
    localStorage.setItem('tt-saved', JSON.stringify(savedTimetables))
  }, [savedTimetables])

  function handleAdd(entry) { setEntries([...entries, entry]) }
  function handleRemove(id) { setEntries(entries.filter((e) => e.id !== id)) }
  function handleEdit(entry) { setEditingEntry(entry) }
  function handleSaveEdit(updated) {
    setEntries(entries.map((e) => e.id === updated.id ? updated : e))
    setEditingEntry(null)
  }

  function buildSnapshot(name) {
    const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    const entryCount = mode === 'weekly'
      ? Object.keys(weeklyCells).length
      : entries.length
    return {
      id: currentId || Date.now().toString(),
      name: name || 'Untitled',
      mode,
      entries,
      groups,
      weeklyConfig,
      weeklyCells,
      entryCount,
      savedAt: now
    }
  }

  function persistSnapshot(snapshot) {
    setSavedTimetables(prev => {
      const filtered = prev.filter(t => t.id !== snapshot.id)
      return [snapshot, ...filtered]
    })
    setCurrentId(snapshot.id)
  }

  function handleBack() {
    console.log('mode:', mode)
    console.log('entries:', entries)
    console.log('weeklyCells:', weeklyCells)
    console.log('groups:', groups)
    console.log('weeklyConfig:', weeklyConfig)

    if (currentId) {
      const existing = savedTimetables.find(t => t.id === currentId)
      const snapshot = buildSnapshot(existing?.name || 'Untitled')
      persistSnapshot(snapshot)
      resetAll()
    } else {
      setShowSaveModal(true)
    }
  }

  function handleSaveTimetable(name) {
    const existing = savedTimetables.find(t => t.id === currentId)
    const snapshot = buildSnapshot(name || existing?.name || 'Untitled')
    persistSnapshot(snapshot)
    setShowSaveModal(false)
    resetAll()
  }

  function handleDiscard() {
    setShowSaveModal(false)
    resetAll()
  }

  function resetAll() {
    setMode(null)
    setEntries([])
    setGroups(null)
    setWeeklyConfig(null)
    setWeeklyCells({})
    setCurrentId(null)
  }

  function handleLoad(id) {
    const tt = savedTimetables.find(t => t.id === id)
    if (!tt) return
    setMode(tt.mode)
    setEntries(tt.entries || [])
    setGroups(tt.groups || null)
    setWeeklyConfig(tt.weeklyConfig || null)
    setWeeklyCells(tt.weeklyCells || {})
    setCurrentId(tt.id)
  }

  function handleDelete(id) {
    setSavedTimetables(prev => prev.filter(t => t.id !== id))
  }

  function handleRename(id, newName) {
    setSavedTimetables(prev =>
      prev.map(t => t.id === id ? { ...t, name: newName } : t)
    )
  }

  if (showLanding) return <LandingPage onGetStarted={() => setShowLanding(false)} />

  if (!mode) return (
    <StartPage
      onSelect={setMode}
      savedTimetables={savedTimetables}
      onLoad={(id) => { handleLoad(id); }}
      onDelete={handleDelete}
      onRename={handleRename}
    />
  )

  const backButton = (
    <button className="btn-cancel" onClick={handleBack}>← Back</button>
  )

  if (mode === 'exam') {
    if (!groups) return (
      <div className="app">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <h1 style={{ margin: 0 }}>Exam Schedule</h1>{backButton}
        </div>
        <GroupSetup existing={groups} onConfirm={setGroups} />
        {showSaveModal && <SaveModal onSave={handleSaveTimetable} onDiscard={handleDiscard} />}
      </div>
    )
    return (
      <div className="app">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
         <h1 style={{ margin: 0 }}>Exam Schedule</h1>
<button className="btn-edit" onClick={() => setGroups(null)}> Edit setup</button>
<ExportButton targetId="timetable-export" fileName="exam-schedule" />
{backButton}
        </div>
        <div className="card"><ExamForm onAdd={handleAdd} groups={groups} /></div>
        <div className="card"><ExamTimetable entries={entries} groups={groups} /></div>
        {showSaveModal && <SaveModal onSave={handleSaveTimetable} onDiscard={handleDiscard} />}
      </div>
    )
  }

  if (mode === 'weekly') {
    if (!weeklyConfig) return (
      <div className="app">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <h1 style={{ margin: 0 }}>Weekly Schedule</h1>{backButton}
        </div>
        <WeeklySetup existing={weeklyConfig} onConfirm={setWeeklyConfig} />
        {showSaveModal && <SaveModal onSave={handleSaveTimetable} onDiscard={handleDiscard} />}
      </div>
    )
    return (
      <div className="app">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <h1 style={{ margin: 0 }}>Weekly Schedule</h1>
<button className="btn-edit" onClick={() => setWeeklyConfig(null)}> Edit setup</button>
<ExportButton targetId="timetable-export" fileName="weekly-schedule" />
{backButton}
        </div>
        <div className="card">
          <WeeklyTimetable
            slots={weeklyConfig.slots}
            days={weeklyConfig.days}
            cells={weeklyCells}
            onCellsChange={setWeeklyCells}
          />
        </div>
        {showSaveModal && <SaveModal onSave={handleSaveTimetable} onDiscard={handleDiscard} />}
      </div>
    )
  }

  return (
    <div className="app">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <h1 style={{ margin: 0 }}>Timetable Generator</h1>
<ExportButton targetId="timetable-export" fileName="daily-agenda" />
{backButton}
      </div>
      <div className="card"><EntryForm onAdd={handleAdd} /></div>
      <div className="card"><EntryList entries={entries} onRemove={handleRemove} onEdit={handleEdit} /></div>
      <div className="card"><Timetable entries={entries} /></div>
      {editingEntry && <EditModal entry={editingEntry} onSave={handleSaveEdit} onClose={() => setEditingEntry(null)} />}
      {showSaveModal && <SaveModal onSave={handleSaveTimetable} onDiscard={handleDiscard} />}
    </div>
  )
}

export default App