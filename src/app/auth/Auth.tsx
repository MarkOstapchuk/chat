'use client'

import { useEffect, useState } from 'react'

import SignInForm from '@/components/UI/Auth/SignInForm'
import SignUpForm from '@/components/UI/Auth/SignUpForm'
import ThemeSwitch from '@/components/UI/ThemeSwitcher/ThemeSwitcher'

const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState<boolean>(false)
  useEffect(() => {
    const savedState = localStorage.getItem('isLoginForm')
    if (savedState) {
      setIsLoginForm(JSON.parse(savedState))
    }
  }, [])

  const changeForm = () => {
    localStorage.setItem('isLoginForm', JSON.stringify(!isLoginForm))
    setIsLoginForm((prevState) => !prevState)
  }
  return (
    <div
      className={
        'flex items-center justify-center min-h-dvh dark:bg-bg-dark-secondary'
      }
    >
      {!isLoginForm ? (
        <SignUpForm setLoginHandler={changeForm} />
      ) : (
        <SignInForm setLoginHandler={changeForm} />
      )}
      <ThemeSwitch classes={'fixed top-4 right-4'} />
    </div>
  )
}

export default Auth
