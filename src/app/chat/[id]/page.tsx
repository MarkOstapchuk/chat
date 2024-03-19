'use client'

import { useQuery } from '@tanstack/react-query'
import { clsx } from 'clsx'
import { Paperclip, SendHorizonal } from 'lucide-react'
import React, { useState } from 'react'

import Loader from '@/components/UI/Loader'

import { useChat } from '@/hooks/useChat'
import { useDialog } from '@/hooks/useDialog'
import { useProfile } from '@/hooks/useProfile'

import { dialogService } from '@/services/dialog.service'

const Dialog = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = useProfile()
  const { messages, chatActions } = useDialog(params.id)
  const [sendMessageValue, setSendMessageValue] = useState('')
  const sendMessage = () => {
    if (data && data) {
      const message = {
        senderId: data.id,
        dialogId: data.id,
        text: sendMessageValue
      }
      chatActions.send(message)
      setSendMessageValue('')
    }
  }
  if (isLoading || !data || !data) return <Loader />
  return (
    <div className={'h-dvh'}>
      <div className={'flex flex-col justify-center w-full h-full'}>
        <div className={'py-4 px-2 border-b-2 border-border '}>
          Dialog {data.name}
        </div>
        <div className={'flex-grow overflow-y-scroll p-4 flex flex-col'}>
          {!messages || messages.length == 0 ? (
            <div className={'m-auto'}>No messages...</div>
          ) : (
            messages.map((item) => {
              return (
                <div
                  key={item.id}
                  className={clsx(
                    'py-4 px-3 mb-2 bg-gradient-to-r text-wrap break-words rounded-xl w-30p text-xxs',
                    item.senderId === userData.id
                      ? 'bg-pink-300 ml-auto'
                      : 'bg-white mr-auto from-gray-300 to-blue-200'
                  )}
                >
                  <p>{item.text}</p>
                </div>
              )
            })
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
