'use client'

import { useQuery } from '@tanstack/react-query'
import { clsx } from 'clsx'
import { Paperclip, SendHorizonal } from 'lucide-react'
import { useState } from 'react'

import Loader from '@/components/UI/Loader'

import { useChat } from '@/hooks/useChat'

import { dialogService } from '@/services/dialog.service'

const Dialog = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['dialog', params.id],
    queryFn: () => {
      return dialogService.getDialog(params.id)
    }
  })
  const { messages, log, chatActions, userData } = useChat(params.id)
  const [sendMessageValue, setSendMessageValue] = useState('')
  const sendMessage = () => {
    if (data && userData) {
      const message = {
        senderId: userData.id,
        dialogId: data.id,
        text: sendMessageValue
      }
      chatActions.send(message)
      setSendMessageValue('')
    }
  }
  if (isLoading || !userData || !data) return <Loader />
  return (
    <div className={'h-dvh'}>
      <div className={'flex flex-col justify-center w-full h-full'}>
        <div className={'py-4 px-2 border-b-2 border-border '}>
          Dialog {data.name}
        </div>
        <div className={'flex-grow overflow-scroll p-4'}>
          {!messages || messages.length == 0
            ? 'no messages'
            : messages.map((item) => (
                <div
                  key={item.id}
                  className={clsx(
                    'py-2 px-2 bg-white mb-5 rounded-2xl',
                    item.senderId === userData.id && 'bg-blue-600'
                  )}
                >
                  <p>{item.text}</p>
                </div>
              ))}
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
