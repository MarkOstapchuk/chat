import debounce from 'lodash.debounce'
import { CircleUser, MessageCircle, Plus } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

import DialogList from '@/components/UI/Chat/DialogList'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

const LeftSide = () => {
  const [username, setUsername] = useState('')
  const debounceOnChange = debounce((value) => setUsername(value), 400)
  return (
    <div
      className={
        'border-r-2 dark:border-none border-border h-dvh flex flex-col justify-center w-full dark:bg-bg-dark-secondary'
      }
    >
      <div
        className={
          'border-b-2 dark:border-b-0.25 dark:border-bg-dark border-border py-5'
        }
      >
        <p className={'text-center dark:text-text-dark pb-2'}>Chats</p>
        <input
          type='text'
          placeholder={'Search'}
          onChange={(e) => {
            debounceOnChange(e.target.value)
          }}
          className={
            'appearance-none dark:bg-bg-dark block dark:text-text-dark-secondary  mx-auto border rounded py-2 px-3 text-gray-700 ' +
            ' leading-tight focus:outline-none focus:border-blue-500 text-xs dark:border-none'
          }
        />
      </div>
      {<DialogList username={username} />}
      <div
        className={
          'h-16 border-t-2 dark:border-t-0.25 dark:border-bg-dark  border-border '
        }
      >
        <div className={'w-full h-full flex items-center justify-center'}>
          <Link
            className={'dark:text-text-dark'}
            href={DASHBOARD_PAGES.PROFILE}
          >
            <CircleUser
              size={34}
              cursor={'pointer'}
            />
          </Link>
          <Link
            className={'dark:text-text-dark'}
            href={DASHBOARD_PAGES.HOME}
          >
            <MessageCircle
              size={34}
              className={'ml-5'}
              cursor={'pointer'}
            />
          </Link>
          <Link
            href={DASHBOARD_PAGES.CREATE_DIALOG}
            className={'dark:text-text-dark'}
          >
            <Plus
              size={34}
              className={'ml-5'}
              cursor={'pointer'}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LeftSide
