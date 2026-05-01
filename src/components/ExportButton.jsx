import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useState } from 'react'

function ExportButton({ targetId, fileName }) {
  const [exporting, setExporting] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  async function exportAsPNG() {
    setShowMenu(false)
    setExporting(true)
    const element = document.getElementById(targetId)
    element.classList.add('exporting')
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    })
    element.classList.remove('exporting')
    const link = document.createElement('a')
    link.download = `${fileName || 'timetable'}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
    setExporting(false)
  }

  async function exportAsPDF() {
    setShowMenu(false)
    setExporting(true)
    const element = document.getElementById(targetId)
    element.classList.add('exporting')
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    })
    element.classList.remove('exporting')
    const imgData = canvas.toDataURL('image/png')
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const orientation = imgWidth > imgHeight ? 'landscape' : 'portrait'
    const pdf = new jsPDF({
      orientation,
      unit: 'pt',
      format: 'a4'
    })
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight)
    const w = imgWidth * ratio
    const h = imgHeight * ratio
    const x = (pageWidth - w) / 2
    const y = (pageHeight - h) / 2
    pdf.addImage(imgData, 'PNG', x, y, w, h)
    pdf.save(`${fileName || 'timetable'}.pdf`)
    setExporting(false)
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        className="btn-edit"
        onClick={() => setShowMenu(!showMenu)}
        disabled={exporting}
      >
        {exporting ? 'Exporting...' : 'Export ↓'}
      </button>
      {showMenu && (
        <div style={{ position: 'absolute', top: '36px', right: 0, background: 'white', border: '1px solid #ebebf0', borderRadius: '10px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', zIndex: 10, minWidth: '140px', overflow: 'hidden' }}>
          <div
            style={{ padding: '10px 16px', fontSize: '14px', cursor: 'pointer', color: '#1a1a2e' }}
            onClick={exportAsPNG}
          >Export as PNG</div>
          <div
            style={{ padding: '10px 16px', fontSize: '14px', cursor: 'pointer', color: '#1a1a2e', borderTop: '1px solid #f3f3f7' }}
            onClick={exportAsPDF}
          >Export as PDF</div>
        </div>
      )}
    </div>
  )
}

export default ExportButton