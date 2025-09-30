'use client'
import Image from 'next/image'
import styles from './header.module.scss' 
import React, { useState } from 'react'
import logo from '@/public/logo.png'
import open from '@/public/open-menu.svg'
import exit from '@/public/exit-menu.svg'
import account from '@/public/account-icon.svg'
import search from '@/public/search-icon.svg'
import cart from '@/public/cart-icon.svg'
import favourite from '@/public/favorite-icon.svg'
import order from '@/public/order-icon.svg'
import arrow from '@/public/catalog-arrow.svg'
import burgerMenu from '@/public/burgerMenu.svg'
import Link from 'next/link'
export default function Header() {

  const [openMenu,setOpenMenu]=useState(false)
  const [openNav,setOpenNav]=useState(false)
  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <Link href='/' className={styles.header__logo}>
          <Image className={styles.header__logoImg} src={logo} alt='Логотип'></Image>
        </Link>
       <div className={styles.header__main}>
        <div className={styles.header__mainContainer}>
          <div onClick={()=>setOpenMenu(c=>!c)} className={styles.header__catalog}>
            <div className={styles.header__catalogContainer}>
              <div className={`
                  ${styles.header__catalogOpenMenu} 
                  ${openMenu ? styles.header__catalogOpenMenu_visible : ''}
                `}>
                <Link href='/catalog' className={styles.header__catalogOpenMenuItem}>
                  <div className={styles.header__catalogOpenMenuItemContainer}>
                    <p className={styles.header__catalogOpenMenuItemText}>Bestsellers</p>
                    <Image className={styles.header__catalogOpenMenuItemArrow} src={arrow} alt='Логотип'></Image>
                  </div>
                </Link>
               <Link href='/catalog' className={styles.header__catalogOpenMenuItem}>
                  <div className={styles.header__catalogOpenMenuItemContainer}>
                    <p className={styles.header__catalogOpenMenuItemText}>New releases</p>
                    <Image className={styles.header__catalogOpenMenuItemArrow} src={arrow} alt='Логотип'></Image>
                  </div>
                </Link>
                <Link href='/catalog' className={styles.header__catalogOpenMenuItem}>
                  <div className={styles.header__catalogOpenMenuItemContainer}>
                    <p className={styles.header__catalogOpenMenuItemText}>Award winners</p>
                    <Image className={styles.header__catalogOpenMenuItemArrow} src={arrow} alt='Логотип'></Image>
                  </div>
                </Link>
                <Link href='/catalog' className={styles.header__catalogOpenMenuItem}>
                  <div className={styles.header__catalogOpenMenuItemContainer}>
                    <p className={styles.header__catalogOpenMenuItemText}>Popular</p>
                    <Image className={styles.header__catalogOpenMenuItemArrow} src={arrow} alt='Логотип'></Image>
                  </div>
                </Link>
                <Link href='/catalog' className={styles.header__catalogOpenMenuItem}>
                  <div className={styles.header__catalogOpenMenuItemContainer}>
                    <p className={styles.header__catalogOpenMenuItemText}>Trending</p>
                    <Image className={styles.header__catalogOpenMenuItemArrow} src={arrow} alt='Логотип'></Image>
                  </div>
                </Link>
                <Link href='/catalog' className={styles.header__catalogOpenMenuItem}>
                  <div className={styles.header__catalogOpenMenuItemContainer}>
                    <p className={styles.header__catalogOpenMenuItemText}>Children</p>
                    <Image className={styles.header__catalogOpenMenuItemArrow} src={arrow} alt='Логотип'></Image>
                  </div>
                </Link>
                
              </div>
              <p className={styles.header__catalogText}>Каталог</p>
              <Image className={styles.header__catalogImg} alt='Меню' src={openMenu==false?open:exit}></Image>
            </div>
          </div>
          <div className={styles.header__search}>
            <div className={styles.header__searchContainer}>
              <input className={styles.header__searchInput} type="text" />
              <Image className={styles.header__searchImg} alt='Поиск' src={search}></Image>
            </div>
          </div>
        </div>
       </div>
       <div onClick={()=>setOpenNav(c=>!c)} className={styles.header__nav}>
        <Image className={styles.header__navImage} alt='Поиск' src={burgerMenu}></Image>
        <div className={`
            ${styles.header__navContainer} 
            ${openNav ? styles.burgerOpen : styles.burgerExit}
          `}>
          <div className={styles.header__navItem}>
            
           <Image className={styles.header__navItemImg} alt='Аккаунт' src={account}></Image>
            <p className={styles.header__navItemText}>Аккаунт</p>
          </div>
           
            <Link className={styles.header__navItem} href='/favourite'>
             <Image className={styles.header__navItemImg} alt='Избранное' src={favourite}></Image>
            <p className={styles.header__navItemText}>Избранное</p></Link>
          
        
           <Link className={styles.header__navItem} href='/orders'>
           <Image className={styles.header__navItemImg} alt='Заказы' src={order}></Image>
            <p className={styles.header__navItemText}>Заказы</p>
          </Link>
           <Link className={styles.header__navItem} href='/cart'>
           <Image className={styles.header__navItemImg} alt='Корзина' src={cart}></Image>
            <p className={styles.header__navItemText}>Корзина</p>
          </Link>
        </div>
       </div>
      </div>
    </div>
  )
}