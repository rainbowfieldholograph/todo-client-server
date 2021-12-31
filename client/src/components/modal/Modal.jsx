import React from 'react'
import styles from './Modal.module.css'

const Modal = React.memo(function Modal({ children, visible, setVisible }) {
  return (
    <div
      onClick={() => {
        setVisible()
      }}
      className={visible ? [styles.modalWrapper, styles.active].join(' ') : styles.modalWrapper}
    >
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className={styles.modalContent}
      >
        {children}
      </div>
    </div>
  )
})

export default Modal
