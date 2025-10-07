'use client';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import styles from './authModal.module.scss'
import exit from '@/public/close-btn.svg'
import Image from 'next/image';
import Button from '../button/Button';
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [emailError,setEmailError]=useState('')
  const [passError,setPassError]=useState('')
  useEffect(()=>{
    if(!email.includes('@gmail.com')){
      setEmailError('The email address is missing the at symbol')
    }
    if(email.includes('@gmail.com')){
      setEmailError('')
    }
    if(password.length<6){
      setPassError('Need minimum 6 symbols')
    }
    if(password.length>5){
      setPassError('')
    }
  },[password,email])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
       
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false, 
        });

        console.log('SignIn result:', result);

        if (result?.error) {
          setError('Неверный email или пароль');
        } else if (result?.ok) {
        
          onClose();
          setEmail('');
          setPassword('');
          
        }
      } else {
        
        const response = await fetch('/database/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Ошибка регистрации');
          return;
        }

        console.log('Registration success:', data);

        
        const loginResult = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        console.log('Auto login after registration:', loginResult);

        if (loginResult?.error) {
          setError('Ошибка входа после регистрации');
          return;
        }

        onClose();
        setEmail('');
        setPassword('');
      
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('Что-то пошло не так');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.auth__overlay}>
       <div className={styles.auth}>
      <div className={styles.auth__container}>
        <div className={styles.auth__exitBlock}>
          <Image width={30} height={30} onClick={onClose}
          className={styles.auth__exit} alt='exit' src={exit}></Image>
      
        </div>
        <div className={styles.auth__title}>
            <h3 className={styles.auth__titleText}>
          {isLogin ? 'Вход' : 'Регистрация'}
        </h3>
        </div>
      
        <form onSubmit={handleSubmit} className={styles.auth__form}>
          <div className={styles.auth__formItem}>
           <p className={styles.auth__error}>{emailError}</p>
            <input
            
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.auth__input}
              placeholder="your@email.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.auth__formItem}>
            <p className={styles.auth__error}>{passError}</p>
            <input
             
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
               className={styles.auth__input}
              placeholder="••••••••"
              required
              disabled={isLoading}
              minLength={6}
            />
          </div>
         
         
         
        </form>
         <div className={styles.auth__buttonBlock}>
           <div onClick={(e)=>handleSubmit(e)} className={styles.auth__button}>
             <Button width={330} height={48} text={isLogin ? 'Войти' : 'Зарегистрироваться'}></Button>
             {error && (
          <div className={styles.auth__error}>
            {error}
          </div>
        )}
          </div>
         </div>
         <div className={styles.auth__swape}>
          <p onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }} className={styles.auth__swapeText}> {isLogin ? 'Зарегистрироваться' : 'Войти'}</p>
         
        </div>
         </div>
      
   
    </div>
    </div>
   
  );
}