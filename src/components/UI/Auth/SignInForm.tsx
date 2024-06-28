import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Toaster, toast } from 'react-hot-toast'

import { FormError } from '@/components/UI/Errors/FormError'

import { ILoginForm } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import styles from '@/app/auth/auth.module.scss'
import { AuthService } from '@/services/auth.service'

type Props = {
  setLoginHandler: React.MouseEventHandler<HTMLButtonElement>
}
const SignInForm = ({ setLoginHandler }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ILoginForm>({
    mode: 'onChange'
  })
  const { push, refresh } = useRouter()
  const { mutate } = useMutation({
    mutationKey: ['auth'],
    mutationFn: (data: ILoginForm) => AuthService.main('login', data),
    onSuccess() {
      toast.success('Successfully login!')
      reset()
      push(DASHBOARD_PAGES.HOME)
      refresh()
    }
  })
  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
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
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2 dark:text-text-dark'
            htmlFor='username'
          >
            Username or email
          </label>
          <input
            className={
              'dark:text-text-dark dark:bg-bg-dark-secondary dark:border-none'
            }
            {...register('username', {
              required: {
                value: true,
                message: 'Enter a username!'
              },
              maxLength: 40
            })}
            id='username'
            type='text'
            placeholder='Username or email'
          />
          {errors?.username?.message && (
            <FormError message={errors.username.message} />
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
            className={
              'dark:text-text-dark dark:bg-bg-dark-secondary dark:border-none'
            }
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
        </div>
        <div className='flex items-center justify-between'>
          <input
            className={'dark:bg-dark-primary bg-blue-500 dark:border-none'}
            value={'Sign In'}
            type='submit'
          ></input>
          <div className={'flex items-center'}>
            <span className={'text-gray-400 text-xxs mr-1'}>
              Already have an account?
            </span>
            <button
              className='inline-block align-baseline font-bold text-sm text-blue-500
                hover:text-blue-800 dark:text-dark-primary dark:hover:text-dark-secondary'
              onClick={setLoginHandler}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
