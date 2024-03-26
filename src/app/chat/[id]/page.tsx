'use client'

import { clsx } from 'clsx'
import { Paperclip, SendHorizonal } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

import { ProfileStore } from '@/components/Stores/Profile.store'
import Loader from '@/components/UI/Loader'

import { IUser } from '@/types/auth.types'

import { useDialog } from '@/hooks/useDialog'
import { useProfile } from '@/hooks/useProfile'

const Dialog = ({ params }: { params: { id: string } }) => {
  const userData = ProfileStore((state) => state.user)
  //надо заменить на profileStore
  const { data, isLoading, messages, chatActions } = useDialog(params.id)

  const [sendMessageValue, setSendMessageValue] = useState('')

  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    })
  }, [messages, data, isLoading])
  console.log(data)
  const sendMessage = () => {
    if (sendMessageValue.trim().length !== 0) {
      if (data && userData) {
        const message = {
          senderId: userData.id,
          dialogId: data.id,
          text: sendMessageValue
        }
        const usersId = data.dialog_participants.map((item) => item.userId)
        chatActions.send({ message, usersId })
        setSendMessageValue('')
      }
    }
  }

  if (isLoading || !data || !userData) return <Loader />
  return (
    <div className={'h-dvh'}>
      <div className={'flex flex-col justify-center w-full h-full'}>
        <div className={'py-4 px-2 border-b-2 border-border '}>
          {data.dialog_participants[0].name}
        </div>
        <div className={'flex-grow overflow-y-scroll p-4 flex flex-col'}>
          {!messages || messages.length == 0 ? (
            <div className={'m-auto'}>No messages...</div>
          ) : (
            <>
              {messages.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className={clsx(
                      'py-4 px-3 mb-2 bg-gradient-to-r text-wrap break-words rounded-xl w-30p text-xxs',
                      item.senderId === userData?.id
                        ? 'bg-pink-300 ml-auto'
                        : 'bg-white mr-auto from-gray-300 to-blue-200'
                    )}
                  >
                    <p>{item.text}</p>
                  </div>
                )
              })}
            </>
          )}
          <div ref={ref} />
        </div>
        <div className={'h-16 border-border border-t-2 pl-2 pr-5'}>
          <div className={'w-full h-full flex items-center'}>
            <Paperclip color={'#555'} />
            <input
              onKeyDown={(event) => {
                if (event.key == `Enter`) sendMessage()
              }}
              placeholder={'Message...'}
              className={
                'bg-transparent appearance-none block  ml-1 border flex-grow rounded py-2 px-3 text-gray-700 ' +
                'leading-tight focus:outline-none focus:border-blue-500 text-xs border-none'
              }
              type='text'
              value={sendMessageValue}
              onChange={(e) => setSendMessageValue(e.target.value)}
            />
            <SendHorizonal onClick={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dialog
