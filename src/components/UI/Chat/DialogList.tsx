'use client'

import { useQuery } from '@tanstack/react-query'
import { clsx } from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { DialogsStore } from '@/components/Stores/Dialogs.store'
import Loader from '@/components/UI/Loader'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import styles from '@/app/chat.module.scss'
import { userService } from '@/services/user.service'

export const getDateTime = (date: Date) => {
  date = new Date(date)
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}
export const cutString = (string: string, number: number) => {
  return string.length > 30 ? string.slice(0, number) + '...' : string
}
const DialogList = ({ username }: { username: string }) => {
  const pathname = usePathname()
  const setMany = DialogsStore((state) => state.setMany)
  useEffect(() => {
    async function Init() {
      if (username !== '') {
        setMany(await userService.findDialogs(username))
      } else {
        setMany(await userService.getAllDialogs())
      }
    }
    Init()
  }, [username])

  const dialogs = DialogsStore((state) => state.dialogs)

  if (!dialogs) return <Loader />
  return (
    <div className={styles.scroll}>
      {dialogs.map((item) => {
        return (
          <Link
            href={DASHBOARD_PAGES.HOME + '/' + item.dialogId}
            key={item.dialog.id}
          >
            <div
              className={clsx(
                'w-full p-2 h-16 border-b-2 dark:border-b-0.5 dark:border-bg-dark flex items-center cursor-default ',
                pathname == `/chat/${item.dialog.id}`
                  ? 'bg-primary dark:bg-dark-primary'
                  : 'bg-white dark:bg-transparent'
              )}
            >
              <div className={'h-12 w-12 relative flex-none'}>
                <Image
                  src={clsx(
                    item.userRef.pictureUrl
                      ? userService.getPicture(item.userRef.pictureUrl)
                      : '/user-round.svg'
                  )}
                  fill
                  sizes='48px'
                  alt={'picture'}
                  className={'rounded-full border-2 dark:border-1'}
                ></Image>
              </div>
              <div
                className={
                  'ml-2 relative w-full h-full flex justify-center flex-col'
                }
              >
                <div className={'flex items-center'}>
                  <p className={'text-xs dark:text-text-dark mr-3'}>
                    {item.userRef.username}
                  </p>
                  <div
                    className={clsx(
                      'w-2 h-2 rounded-full',
                      item.userRef.online ? 'bg-green-500' : 'bg-gray-700'
                    )}
                  ></div>
                </div>
                <p
                  className={
                    'text-xxs font-medium text-gray-600 dark:text-text-dark-secondary'
                  }
                >
                  {item.dialog.lastMessage &&
                    cutString(item.dialog.lastMessage, 30)}
                </p>
                {item.notificationCount > 0 && (
                  <p
                    className={
                      'absolute right-0 top-6 text-xxs rounded-full py-1 px-2 flex items-center justify-center bg-blue-300'
                    }
                  >
                    {item.notificationCount}
                  </p>
                )}
                <p
                  className={
                    'absolute top-0 right-2 text-xxs dark:text-text-dark-secondary'
                  }
                >
                  {item.dialog.sentTime && getDateTime(item.dialog.sentTime)}
                </p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default DialogList
