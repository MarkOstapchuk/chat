import { clsx } from 'clsx'
import { Edit, Trash } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

import { getDateTime } from '@/components/UI/Chat/DialogList'
import FileDownloader from '@/components/UI/Chat/FileDownloader'

import { IMessage, Type } from '@/types/message.types'
import { IProfileResponse } from '@/types/user.types'

import { messageService } from '@/services/message.service'

interface props {
  messages: IMessage[]
  profile: IProfileResponse
  dialogId: number
  usersId: number[]
  remove: (payload: {
    messageId: number
    dialogId: number
    usersId: number[]
  }) => void
}

const MessageList = ({
  messages,
  profile,
  dialogId,
  remove,
  usersId
}: props) => {
  const [contextMenu, setContextMenu] = useState(0)
  const deleteMessage = async (messageId: number) => {
    remove({ messageId, dialogId, usersId })
    setContextMenu(0)
  }
  return (
    <div className={'flex flex-col overflow-x-hidden'}>
      {!!contextMenu && (
        <span
          onClick={(e) => {
            e.stopPropagation()
            setContextMenu(0)
          }}
          onContextMenu={(e) => {
            e.preventDefault()
          }}
          className={
            'h-dvh w-dvw fixed top-0 left-0 bottom-0 right-0 z-10 bg-transparent'
          }
        ></span>
      )}
      {messages.map((item, index) => {
        return item.type === 'TEXT' ? (
          <div
            onContextMenu={(e) => {
              if (item.senderId === profile.id) {
                e.preventDefault() // prevent the default behaviour when right clicked
                setContextMenu(item.id)
              }
            }}
            key={item.id}
            className={clsx(
              'py-2.5 z-20 px-3 flex w-60 items-center justify-between mb-2 bg-gradient-to-r relative rounded-xl text-xxs',
              item.senderId === profile.id
                ? 'bg-primary ml-auto dark:bg-dark-primary dark:text-text-dark'
                : 'bg-white mr-auto from-gray-300 to-blue-200 dark:from-dark-third dark:to-dark-third dark:bg-dark-third'
            )}
          >
            {item.id === contextMenu && item.senderId === profile.id && (
              <ContextMenuComponent
                deleteMessage={deleteMessage}
                id={item.id}
              />
            )}
            <p className={'mr-4 overflow-hidden break-words'}>{item.text}</p>
            <div className={'text-ultra-sm italic '}>
              {getDateTime(item.createdAt)}
            </div>
          </div>
        ) : item.type === 'IMAGE' ? (
          <div
            onContextMenu={(e) => {
              e.preventDefault() // prevent the default behaviour when right clicked
              setContextMenu(item.id)
            }}
            key={item.id}
            className={clsx(
              'rounded-2xl mb-2 max-w-35p relative',
              item.senderId === profile.id
                ? 'bg-primary ml-auto dark:bg-dark-primary dark:text-text-dark'
                : 'bg-white mr-auto from-gray-300 to-blue-200 dark:from-dark-third dark:to-dark-third dark:bg-dark-third'
            )}
          >
            {item.id === contextMenu && (
              <ContextMenuComponent
                deleteMessage={deleteMessage}
                id={item.id}
              />
            )}
            <Image
              src={clsx(
                item.text
                  ? messageService.getPicture(item.text)
                  : '/user-round.svg'
              )}
              className={'overflow-hidden rounded-2xl'}
              width={400}
              height={300}
              objectFit={'cover'}
              alt='image'
            />
            <div
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)' }}
              className={
                'text-ultra-sm italic absolute bottom-2 right-1 py-1 px-2 text-center rounded-xl text-text-dark'
              }
            >
              {getDateTime(item.createdAt)}
            </div>
          </div>
        ) : (
          <div
            onContextMenu={(e) => {
              e.preventDefault() // prevent the default behaviour when right clicked
              setContextMenu(item.id)
            }}
            className={clsx(
              'py-2.5 px-3 flex w-60 relative items-center justify-between mb-2 bg-gradient-to-r  rounded-xl text-xxs',
              item.senderId === profile.id
                ? 'bg-primary ml-auto dark:bg-dark-primary dark:text-text-dark'
                : 'bg-white mr-auto from-gray-300 to-blue-200 dark:from-dark-third dark:to-dark-third dark:bg-dark-third'
            )}
            key={item.id}
          >
            {item.id === contextMenu && (
              <ContextMenuComponent
                deleteMessage={deleteMessage}
                id={item.id}
              />
            )}
            <FileDownloader
              filename={item.text}
              getFile={messageService.getFile}
              date={getDateTime(item.createdAt)}
            />
          </div>
        )
      })}
    </div>
  )
}

interface props2 {
  deleteMessage: (id: number) => void
  id: number
}

const ContextMenuComponent = ({ deleteMessage, id }: props2) => {
  return (
    <div
      className={
        'dark:bg-bg-dark p-1 flex flex-col w-40 cursor-pointer z-30 text-xs bg-bg absolute bottom-full left-0 -translate-x-full translate-y-full rounded-2xl'
      }
    >
      <button className={'flex items-center hover:bg-gray-600 rounded-lg p-2'}>
        <Edit size={14} />
        <span className={'ml-2'}>Edit</span>
      </button>
      <button
        className={
          'flex items-center hover:bg-gray-600 rounded-lg p-2 text-red-600'
        }
        onClick={() => deleteMessage(id)}
      >
        <Trash size={14} />
        <span className={'ml-2'}>Delete</span>
      </button>
    </div>
  )
}

export default MessageList
