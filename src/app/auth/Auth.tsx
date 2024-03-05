'use client'

import { useState } from 'react'

import SignInForm from '@/components/UI/Auth/SignInForm'
import SignUpForm from '@/components/UI/Auth/SignUpForm'

const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState<boolean>(false)
  const changeForm = () => {
    setIsLoginForm((prevState) => !prevState)
  }
  return (
    <div className={'flex items-center justify-center min-h-dvh'}>
      {!isLoginForm ? (
        <SignUpForm setLoginHandler={changeForm} />
      ) : (
        <SignInForm setLoginHandler={changeForm} />
      )}
    </div>
  )
}

export default Auth
