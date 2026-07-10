import React from 'react';
import styles from './Dashboard.css';

export default function NotificationsWidget() {
  const activeEvents = [14, 15, 28];

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>Calendar Schedules</h3>
          <p className={styles.cardSubtitle}>July 2026</p>
        </div>
      </div>
      
      {/* Mini Inline Calendar Framework representation */}
      <div className={styles.calendarWrapper}>
        <div className={styles.calendarDays}>
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => <span key={d}>{d}</span>)}
        </div>
        <div className={styles.calendarGrid}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={`empty-${i}`} className={`${styles.calendarCell} ${styles.calendarCellInactive}`}></span>
          ))}
          {Array.from({ length: 31 }).map((_, i) => {
            const day = i + 1;
            const hasEvent = activeEvents.includes(day);
            return (
              <span 
                key={day} 
                className={`${styles.calendarCell} ${hasEvent ? styles.calendarCellEvent : ''}`}
              >
                {day}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}