import { CircleUser, MessageCircle, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import DialogList from '@/components/UI/Chat/DialogList'

import { IDialogResponse } from '@/types/dialog.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

interface props {
  dialogs?: IDialogResponse[]
}
const LeftSide = ({ dialogs }: props) => {
  return (
    <div
      className={
        'border-r-2 border-border h-dvh flex flex-col justify-center w-full'
      }
    >
      <div className={'border-b-2 border-border py-5'}>
        <p className={'text-center pb-2'}>Chats</p>
        <input
          type='text'
          placeholder={'Search'}
          className={
            'appearance-none block  mx-auto border rounded py-2 px-3 text-gray-700' +
            ' leading-tight focus:outline-none focus:border-blue-500 text-xs'
          }
        />
      </div>
      {dialogs && <DialogList dialogs={dialogs} />}
      <div className={'h-16 border-t-2 border-border'}>
        <div className={'w-full h-full flex items-center justify-center'}>
          <Link href={DASHBOARD_PAGES.PROFILE}>
            <CircleUser
              size={34}
              cursor={'pointer'}
            />
          </Link>
          <Link href={DASHBOARD_PAGES.HOME}>
            <MessageCircle
              size={34}
              className={'ml-5'}
              cursor={'pointer'}
            />
          </Link>
          <Link href={DASHBOARD_PAGES.CREATE_DIALOG}>
            <Plus
              size={34}
              className={'ml-5'}
              cursor={'pointer'}
              // onClick={addDialog}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LeftSide
