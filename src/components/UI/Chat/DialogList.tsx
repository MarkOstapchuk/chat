'use client'

import { clsx } from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { DialogsStore } from '@/components/Stores/Dialogs.store'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import styles from '@/app/chat.module.scss'

const DialogList = () => {
  const pathname = usePathname()
  const getDateTime = (date: Date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }
  const dialogs = DialogsStore((state) => state.dialogs)
  return (
    <div className={styles.scroll}>
      {dialogs.map((item) => (
        <Link
          href={DASHBOARD_PAGES.HOME + '/' + item.dialogId}
          key={item.dialog.id}
        >
          <div
            className={clsx(
              'w-full p-2 h-20 border-b-2 flex items-center cursor-default',
              pathname == `/chat/${item.dialog.id}` ? 'bg-blue-400' : 'bg-white'
            )}
          >
            {!item.dialog.pictureUrl && (
              <Image
                src={'/user-round.svg'}
                width='80'
                height='80'
                alt={'picture'}
                className={'rounded-full border-2'}
              ></Image>
            )}
            <div
              className={
                'ml-2 relative w-full h-full flex justify-center flex-col'
              }
            >
              <p className={'text-xs'}>{item.name}</p>
              <p className={'text-xxs font-medium text-gray-600'}>
                {item.dialog.lastMessage}
              </p>
              {/*{item.unreadCount > 0 && (*/}
              {/*  <p*/}
              {/*    className={*/}
              {/*      'absolute right-0 top-30 text-xxs rounded-full w-6 h-6 p-2 flex items-center justify-center bg-blue-300'*/}
              {/*    }*/}
              {/*  >*/}
              {/*    {item.unreadCount}*/}
              {/*  </p>*/}
              {/*)}*/}
              <p className={'absolute top-0 right-2 text-xxs'}>
                {item.dialog.sentTime && getDateTime(item.dialog.sentTime)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default DialogList
