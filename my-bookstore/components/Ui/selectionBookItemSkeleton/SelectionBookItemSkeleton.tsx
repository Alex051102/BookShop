// components/Ui/selectionBookItem/SelectionBookItemSkeleton.tsx
import React from 'react'
import styles from './selectionBookItemSkeleton.module.scss'

export default function SelectionBookItemSkeleton() {
  return (
    <div className={styles.selectionItemSkeleton}>
      <div className={styles.selectionItemSkeleton__like}></div>
      <div className={styles.selectionItemSkeleton__container}>
        <div className={styles.selectionItemSkeleton__image}></div>
        <div className={styles.selectionItemSkeleton__title}></div>
        <div className={styles.selectionItemSkeleton__stats}>
          <div className={styles.selectionItemSkeleton__statsItem}></div>
          <div className={styles.selectionItemSkeleton__statsItem}></div>
        </div>
        <div className={styles.selectionItemSkeleton__price}></div>
        <div className={styles.selectionItemSkeleton__button}></div>
      </div>
    </div>
  )
}