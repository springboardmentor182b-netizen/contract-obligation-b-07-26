import React from 'react';
import styles from './PageHeader.css';

export default function PageHeader({ title, description, actions }) {
  return (
    <div className={styles.headerContainer}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}