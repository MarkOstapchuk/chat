'use client'

import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { FormError } from '@/components/UI/Errors/FormError'

import { IAuthForm } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import styles from '@/app/auth/auth.module.scss'
import { AuthService } from '@/services/auth.service'

type Props = {
  setLoginHandler: React.MouseEventHandler<HTMLButtonElement>
}
const SignUpForm = ({ setLoginHandler }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IAuthForm>({
    mode: 'onChange'
  })
  const { push } = useRouter()
  const { mutate, isError } = useMutation({
    mutationKey: ['auth'],
    mutationFn: (data: IAuthForm) => AuthService.main('register', data),
    onSuccess() {
      toast.success('Successfully register!')
      reset()
      push(DASHBOARD_PAGES.HOME)
    }
  })

  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    mutate(data, {
      onError(error: Error) {
        const axiosError = error as AxiosError
        const errorData: { error: string; message: string } = axiosError
          ?.response?.data as { error: string; message: string }
        toast.error(errorData.message)
      }
    })
  }

  return (
    <div className={styles.form}>
      <form
        className={'dark:bg-bg-dark'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='mb-4 '>
          <label
            className='block text-gray-700 text-sm font-bold mb-2 dark:text-text-dark'
            htmlFor='username'
          >
            Username
          </label>
          <input
            {...register('username', {
              required: {
                value: true,
                message: 'Enter a username!'
              },
              maxLength: 40
            })}
            id='username'
            type='text'
            placeholder='Username'
            className={
              'dark:text-text-dark dark:bg-bg-dark-secondary dark:border-none'
            }
          />
          {errors?.username?.message && (
            <FormError message={errors.username.message} />
          )}
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2 dark:text-text-dark'
            htmlFor='username'
          >
            Email
          </label>
          <input
            {...register('email', {
              required: {
                value: true,
                message: 'Email is required!'
              },
              pattern: {
                value: /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm,
                message: 'Email is not valid!'
              }
            })}
            id='email'
            type='text'
            placeholder='Email'
            className={
              'dark:text-text-dark dark:bg-bg-dark-secondary dark:border-none'
            }
          />
          {errors?.email?.message && (
            <FormError message={errors.email.message} />
          )}
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2 dark:text-text-dark'
            htmlFor='password'
          >
            Password
          </label>
          <input
            {...register('password', {
              required: {
                value: true,
                message: 'Password is required!'
              },
              maxLength: {
                value: 64,
                message: 'Max length - 64'
              },
              minLength: {
                value: 8,
                message: 'Min length - 8'
              }
            })}
            id='password'
            type='password'
            placeholder='******************'
            className={
              'dark:text-text-dark dark:bg-bg-dark-secondary dark:border-none'
            }
          />
          {errors?.password?.message && (
            <FormError message={errors.password.message} />
          )}
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2 dark:text-text-dark'
            htmlFor='password'
          >
            Repeat Password
          </label>
          <input
            {...register('secondPassword', {
              required: {
                value: true,
                message: 'Password is required!'
              },
              maxLength: {
                value: 64,
                message: 'Max length - 64'
              },
              minLength: {
                value: 8,
                message: 'Min length - 8'
              }
            })}
            id='secondpassword'
            type='password'
            placeholder='******************'
            className={
              'dark:text-text-dark dark:bg-bg-dark-secondary dark:border-none'
            }
          />
          {errors?.secondPassword?.message && (
            <FormError message={errors.secondPassword.message} />
          )}
        </div>
        <div className='flex items-center justify-between'>
          <input
            value={'Sign Up'}
            type='submit'
            className={'dark:bg-dark-primary bg-blue-500 dark:border-none'}
          ></input>
          <div className={'flex items-center'}>
            <span className={'text-gray-400 text-xxs mr-1'}>
              Already Signed Up?
            </span>
            <button
              className='inline-block align-baseline font-bold text-sm text-blue-500
                hover:text-blue-800 dark:text-dark-primary dark:hover:text-dark-secondary'
              onClick={setLoginHandler}
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm
