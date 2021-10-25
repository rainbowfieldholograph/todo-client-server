import React from 'react'
import styles from './Circle.module.css'

const Circle = ({ id, completed, onToggleCompleted }) => {
  return (
    <div className={styles.circle} onClick={() => onToggleCompleted(id, !completed)}>
      <div
        className={completed ? [styles.innerCircle, styles.clicked].join(' ') : styles.innerCircle}
      ></div>
    </div>
  )
}

export default Circle
