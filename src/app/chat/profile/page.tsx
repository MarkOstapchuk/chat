'use client'

import axios from 'axios'
import { clsx } from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'
import { toast } from 'react-hot-toast'

import { ProfileStore } from '@/components/Stores/Profile.store'
import ThemeSwitch from '@/components/UI/ThemeSwitcher/ThemeSwitcher'
import Wrapper from '@/components/Wrapper'

import { AuthService } from '@/services/auth.service'
import { userService } from '@/services/user.service'

const Profile = () => {
  const { push, refresh } = useRouter()
  const profile = ProfileStore((state) => state.user)
  const setProfile = ProfileStore((state) => state.set)
  const [isLoading, setIsLoading] = React.useState(false)
  const inputFileRef = React.useRef<HTMLInputElement | null>(null)

  const logout = async () => {
    if (await AuthService.logout()) push('/auth')
  }

  const handleFileUpload = async () => {
    if (!inputFileRef.current?.files?.length) {
      toast.error('Please, select file you want to upload')
      return
    }

    setIsLoading(true)

    /* Add files to FormData */
    const formData = new FormData()
    Object.values(inputFileRef.current.files).forEach((file) => {
      formData.append('file', file)
    })
    const body = await userService.setPicture(formData)

    if (body.statusCode === 200) {
      inputFileRef.current.value = ''
    }
    setIsLoading(false)
    setProfile(body.data)
  }
  return (
    <div>
      <div className={'flex items-center p-6'}>
        <div className={'h-24 w-24 relative flex-none'}>
          <Image
            src={clsx(
              profile.pictureUrl
                ? userService.getPicture(profile.pictureUrl)
                : '/user-round.svg'
            )}
            fill
            sizes='48px'
            alt={'picture'}
            className={
              'rounded-full border-2 dark:border-1 border-black dark:border-white'
            }
          ></Image>
        </div>
        <div className={'ml-5 dark:text-text-dark text-3xl'}>
          {profile.username}
        </div>
      </div>
      <div className={'m-4 flex items-center'}>
        <label
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          htmlFor='file_input'
        >
          Upload file
        </label>
        <input
          ref={inputFileRef}
          className='mx-5 block w-30p p-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary
          dark:file:bg-dark-primary
          file:text-text-dark text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50
           dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
          id='file_input'
          type='file'
        />
        <Wrapper className={'bg-dark-primary'}>
          <button onClick={handleFileUpload}>Set profile picture</button>
          {isLoading && ` Wait, please...`}
        </Wrapper>
      </div>
      <button
        onClick={logout}
        className={
          'px-4 py-2 bg-primary rounded-xl m-4 dark:bg-dark-primary dark:text-text-dark'
        }
      >
        logout
      </button>
      <ThemeSwitch classes={'m-4'} />
    </div>
  )
}

export default Profile
