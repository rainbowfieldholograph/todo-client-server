import React, { useState } from 'react'
import styles from './Circle.module.css'

const Circle = ({ completed, index, onToggleCompleted }) => {
  const [clicked, setClicked] = useState(completed)
  return (
    <div
      className={styles.circle}
      onClick={() => {
        setClicked(!clicked)
        onToggleCompleted(index)
      }}
    >
      <div
        className={clicked ? [styles.innerCircle, styles.clicked].join(' ') : styles.innerCircle}
      ></div>
    </div>
  )
}

export default Circle
