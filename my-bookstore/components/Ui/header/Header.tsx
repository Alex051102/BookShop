'use client'
import Image from 'next/image'
import styles from './header.module.scss' 
import React, { useEffect, useState } from 'react'
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
import setEmptyFilters from '@/lib/filters/setEmptyFilters'
import { useSession, signOut } from 'next-auth/react';
import AuthModal from '../authModal/AuthModal'

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false)
  const [openNav, setOpenNav] = useState(false)
  const { data: session, status } = useSession(); // Добавил status
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('')
useEffect(() => {
    console.log('=== СЕССИЯ ПОЛЬЗОВАТЕЛЯ ===');
    console.log('Статус:', status);
    console.log('Сессия:', session);
    console.log('Пользователь:', session?.user);
    console.log('======================');
  }, [session, status]);
  // Функция для выхода
  const handleSignOut = async () => {
    await signOut({ redirect: false });
   
  }

  // Функция для успешного входа
  const handleAuthSuccess = () => {
    setShowAuthModal(false);
   
  }

  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <Link href='/' className={styles.header__logo}>
          <Image className={styles.header__logoImg} src={logo} alt='Логотип'></Image>
        </Link>
       <div className={styles.header__main}>
        <div className={styles.header__mainContainer}>
          <div onClick={() => setOpenMenu(c => !c)} className={styles.header__catalog}>
            <div className={styles.header__catalogContainer}>
              <div className={`
                  ${styles.header__catalogOpenMenu} 
                  ${openMenu ? styles.header__catalogOpenMenu_visible : ''}
                `}>
                <Link onClick={() => setEmptyFilters()}  href={`/catalog/query/subject:fiction`} className={styles.header__catalogOpenMenuItem}>
                  <div className={styles.header__catalogOpenMenuItemContainer}>
                    <p className={styles.header__catalogOpenMenuItemText}>Fiction</p>
                    <Image className={styles.header__catalogOpenMenuItemArrow} src={arrow} alt='Логотип'></Image>
                  </div>
                </Link>
               <Link onClick={() => setEmptyFilters()} href='/catalog/query/subject:travel' className={styles.header__catalogOpenMenuItem}>
                  <div className={styles.header__catalogOpenMenuItemContainer}>
                    <p className={styles.header__catalogOpenMenuItemText}>Travel</p>
                    <Image className={styles.header__catalogOpenMenuItemArrow} src={arrow} alt='Логотип'></Image>
                  </div>
                </Link>
                <Link onClick={() => setEmptyFilters()} href='/catalog/query/subject:science' className={styles.header__catalogOpenMenuItem}>
                  <div className={styles.header__catalogOpenMenuItemContainer}>
                    <p className={styles.header__catalogOpenMenuItemText}>Science</p>
                    <Image className={styles.header__catalogOpenMenuItemArrow} src={arrow} alt='Логотип'></Image>
                  </div>
                </Link>
                <Link onClick={() => setEmptyFilters()} href='/catalog/query/subject:art' className={styles.header__catalogOpenMenuItem}>
                  <div className={styles.header__catalogOpenMenuItemContainer}>
                    <p className={styles.header__catalogOpenMenuItemText}>Art</p>
                    <Image className={styles.header__catalogOpenMenuItemArrow} src={arrow} alt='Логотип'></Image>
                  </div>
                </Link>
                <Link onClick={() => setEmptyFilters()} href='/catalog/query/subject:biography' className={styles.header__catalogOpenMenuItem}>
                  <div className={styles.header__catalogOpenMenuItemContainer}>
                    <p className={styles.header__catalogOpenMenuItemText}>Biography</p>
                    <Image className={styles.header__catalogOpenMenuItemArrow} src={arrow} alt='Логотип'></Image>
                  </div>
                </Link>
                <Link onClick={() => setEmptyFilters()}  href='/catalog/query/subject:history' className={styles.header__catalogOpenMenuItem}>
                  <div className={styles.header__catalogOpenMenuItemContainer}>
                    <p className={styles.header__catalogOpenMenuItemText}>History</p>
                    <Image className={styles.header__catalogOpenMenuItemArrow} src={arrow} alt='Логотип'></Image>
                  </div>
                </Link>
                <Link onClick={() => setEmptyFilters()}  href='/catalog/query/subject:business' className={styles.header__catalogOpenMenuItem}>
                  <div className={styles.header__catalogOpenMenuItemContainer}>
                    <p className={styles.header__catalogOpenMenuItemText}>Business</p>
                    <Image className={styles.header__catalogOpenMenuItemArrow} src={arrow} alt='Логотип'></Image>
                  </div>
                </Link>
                <Link onClick={() => setEmptyFilters()}  href='/catalog' className={styles.header__catalogOpenMenuItem}>
                  <div className={styles.header__catalogOpenMenuItemContainer}>
                    <p className={styles.header__catalogOpenMenuItemText}>Others</p>
                    <Image className={styles.header__catalogOpenMenuItemArrow} src={arrow} alt='Логотип'></Image>
                  </div>
                </Link>
              </div>
              <p className={styles.header__catalogText}>Каталог</p>
              <Image className={styles.header__catalogImg} alt='Меню' src={openMenu == false ? open : exit}></Image>
            </div>
          </div>
          <div className={styles.header__search}>
            <div className={styles.header__searchContainer}>
              <input onChange={(e) => setSearchQuery(e.target.value)} className={styles.header__searchInput} type="text" />
              <Link href={`/catalog/query/${searchQuery}`}><Image onClick={() => setEmptyFilters()} className={styles.header__searchImg} alt='Поиск' src={search}></Image></Link>
            </div>
          </div>
        </div>
       </div>
       <div onClick={() => setOpenNav(c => !c)} className={styles.header__nav}>
        <Image className={styles.header__navImage} alt='Поиск' src={burgerMenu}></Image>
        <div className={`
            ${styles.header__navContainer} 
            ${openNav ? styles.burgerOpen : styles.burgerExit}
          `}>
         
          {status === "loading" ? (
            <div className={styles.header__navItem}>
              <Image className={styles.header__navItemImg} alt='Аккаунт' src={account}></Image>
              <p className={styles.header__navItemText}>Загрузка...</p>
            </div>
          ) : session ? (
          <> <Link className={styles.header__navItem} href='/account'>
              <Image className={styles.header__navItemImg} alt='Аккаунт' src={account}></Image>
              <div>
                <p className={styles.header__navItemText}>Аккаунт</p>
                {/* <p className={styles.header__navItemEmail}>{session.user?.email}</p> */}
                
              </div>
            </Link>
          <button 
                  onClick={handleSignOut}
                  className={styles.header__logoutButton}
                >
                  Выйти
                </button>
          </>
           
          ) : (
           
            <div onClick={() => setShowAuthModal(true)} className={styles.header__navItem}>
              <Image className={styles.header__navItemImg} alt='Аккаунт' src={account}></Image>
              <p 
                
                className={styles.header__navItemText}
              >
                Войти
              </p>
            </div>
          )}
           
          <Link className={styles.header__navItem} href='/favourite'>
            <Image className={styles.header__navItemImg} alt='Избранное' src={favourite}></Image>
            <p className={styles.header__navItemText}>Favourite</p>
          </Link>
        
          <Link className={styles.header__navItem} href='/orders'>
            <Image className={styles.header__navItemImg} alt='Заказы' src={order}></Image>
            <p className={styles.header__navItemText}>Orders</p>
          </Link>
          
          <Link className={styles.header__navItem} href='/cart'>
            <Image className={styles.header__navItemImg} alt='Корзина' src={cart}></Image>
            <p className={styles.header__navItemText}>Cart</p>
          </Link>
        </div>
       </div>
      
     
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={handleAuthSuccess} 
      />
      </div>
    </div>
  )
}