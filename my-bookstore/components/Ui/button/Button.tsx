'use client'
import React from 'react'
import styles from './buttom.module.scss'
interface buttonProps{
    width:number,
    height:number,
    text:string
}
export default function Button({width,height,text}:buttonProps) {
  return (
    <button style={{width:`${width}px`,height:`${height}px`}} className={styles.button}>{text}</button>
  )
}
