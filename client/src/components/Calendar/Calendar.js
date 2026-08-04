import { useMemo, useState } from 'react'
import './Calendar.css'

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export default function Calendar({ obligations = [] }) {
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })

  const year = visibleMonth.getFullYear()
  const month = visibleMonth.getMonth()
  const monthLabel = visibleMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return Array.from({ length: firstDay + daysInMonth }, (_, index) => index < firstDay ? null : index - firstDay + 1)
  }, [month, year])
  const dueDates = useMemo(() => new Set(
    obligations.map((item) => item.due_date).filter(Boolean),
  ), [obligations])

  return <section className="calendar-card" aria-label="Obligation due-date calendar">
    <div className="calendar-header">
      <h3>{monthLabel}</h3>
      <div className="calendar-navigation">
        <button type="button" onClick={() => setVisibleMonth(new Date(year, month - 1, 1))} aria-label="Previous month">‹</button>
        <button type="button" onClick={() => setVisibleMonth(new Date(year, month + 1, 1))} aria-label="Next month">›</button>
      </div>
    </div>
    <div className="week">{weekdays.map((day) => <span key={day}>{day}</span>)}</div>
    <div className="dates">
      {calendarDays.map((day, index) => {
        const hasDueDate = day && dueDates.has(dateKey(year, month, day))
        return <span key={`${day || 'blank'}-${index}`} className={hasDueDate ? 'active-day' : 'date'} title={hasDueDate ? 'Obligation due' : undefined}>{day}</span>
      })}
    </div>
  </section>
}
