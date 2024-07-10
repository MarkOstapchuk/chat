'use client'

import { AxiosProgressEvent } from 'axios'
import { Camera, File, ImageIcon, Paperclip, SendHorizonal } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

import MessageList from '@/components/UI/Chat/MessageList'
import ProgressBar from '@/components/UI/Chat/ProgressBar'
import Loader from '@/components/UI/Loader'

import { IMessagePost } from '@/types/message.types'

import { useDialog } from '@/hooks/useDialog'

import { messageService } from '@/services/message.service'
import { userService } from '@/services/user.service'

const Dialog = ({ params }: { params: { id: string } }) => {
  const {
    data,
    isLoading,
    messages,
    chatActions,
    profile,
    dialog_participant
  } = useDialog(params.id)

  const [sendMessageValue, setSendMessageValue] = useState('')
  const [isChooseFilePopupActive, setIsChooseFilePopupActive] =
    useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const ref = useRef<HTMLDivElement>(null)
  const inputImageFileRef = React.useRef<HTMLInputElement | null>(null)
  const inputFileRef = React.useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: 'instant',
      block: 'end'
    })
  }, [messages, data, isLoading, profile])

  const sendMessage = () => {
    if (sendMessageValue.trim().length !== 0) {
      if (data && profile.data) {
        const message = {
          senderId: profile.data.id,
          dialogId: data.id,
          text: sendMessageValue
        }
        const usersId = data.dialog_participants.map((item) => item.userId)
        chatActions.send({ message, usersId })
        setSendMessageValue('')
      }
    }
  }
  const sendImage = async () => {
    if (!inputImageFileRef.current?.files?.length) {
      toast.error('Please, select file you want to upload')
      return
    }
    const formData = new FormData()
    Object.values(inputImageFileRef.current.files).forEach((file) => {
      formData.append('file', file)
    })
    setIsChooseFilePopupActive(false)
    if (data && profile.data) {
      const usersId = data.dialog_participants.map((item) => item.userId)
      const body = await messageService.uploadImage(formData)
      const message: IMessagePost = {
        senderId: profile.data.id,
        dialogId: data.id,
        text: body.file.filename
      }
      chatActions.sendImage({
        message,
        usersId
      })
    }
  }
  const sendFile = async () => {
    if (!inputFileRef.current?.files?.length) {
      toast.error('Please, select file you want to upload')
      return
    }
    const formData = new FormData()
    Object.values(inputFileRef.current.files).forEach((file) => {
      formData.append('file', file)
    })
    setIsChooseFilePopupActive(false)
    if (data && profile.data) {
      const usersId = data.dialog_participants.map((item) => item.userId)
      const body = await messageService.uploadFile(formData, {
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total) {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
            setUploadProgress(percentage)
          }
        }
      })
      const message: IMessagePost = {
        senderId: profile.data.id,
        dialogId: data.id,
        text: body.filename
      }
      chatActions.sendFile({
        message,
        usersId
      })
    }
  }
  if (isLoading || !data || !profile.data || !dialog_participant)
    return <Loader />
  return (
    <div
      className={
        'h-dvh dark:border-l-0.5 dark:border-bg-dark dark:bg-bg-dark-secondary'
      }
    >
      <div className={'flex flex-col justify-center w-full h-full'}>
        <div
          className={
            'py-3 px-2 flex items-center border-b-2 text-xs border-border dark:border-b-0.5 dark:border-bg-dark dark:text-text-dark'
          }
        >
          {/*fix*/}
          {!dialog_participant.userRef.pictureUrl && (
            <Image
              src={'/user-round.svg'}
              width='60'
              height='60'
              alt={'picture'}
              className={'rounded-full border-2 dark:border-0.25 mr-4'}
            ></Image>
          )}
          <div>{dialog_participant.userRef.username}</div>
        </div>
        <div className={'flex-grow overflow-y-scroll p-4 flex flex-col'}>
          {!messages || messages.length == 0 ? (
            <div className={'m-auto dark:text-text-dark'}>No messages...</div>
          ) : (
            <div>
              <MessageList
                messages={messages}
                profile={profile.data}
                remove={chatActions.remove}
                dialogId={data.id}
                usersId={data.dialog_participants.map((item) => item.userId)}
              />

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div
                  className={
                    'py-2.5 z-5 px-3 flex w-60 bg-primary ml-auto dark:bg-dark-primary dark:text-text-dark items-center justify-center mb-2 bg-gradient-to-r relative rounded-xl text-xxs'
                  }
                >
                  <ProgressBar
                    percentage={uploadProgress}
                    circleWidth={50}
                    className={''}
                  />
                </div>
              )}

              <div ref={ref} />
            </div>
          )}
        </div>
        <div
          className={
            'min-h-16 border-border border-t-2 pl-2 pr-5 dark:border-t-0.25 dark:border-bg-dark'
          }
        >
          <div
            className={'w-full h-full flex items-center dark:text-text-dark'}
          >
            <div className={'relative flex items-center'}>
              {isChooseFilePopupActive && (
                <div>
                  <ChooseFile
                    sendImage={sendImage}
                    sendFile={sendFile}
                    fileRef={inputFileRef}
                    imageRef={inputImageFileRef}
                    close={() => setIsChooseFilePopupActive(false)}
                  />
                </div>
              )}
              <button
                onClick={() => {
                  setIsChooseFilePopupActive((prevState) => !prevState)
                }}
              >
                <Paperclip className={'dark:text-text-dark text-gray-600'} />
              </button>
            </div>
            <input
              onKeyDown={(event) => {
                if (event.key == `Enter`) sendMessage()
              }}
              placeholder={'Message...'}
              className={
                'bg-transparent dark:text-text-dark appearance-none block  ml-1 border flex-grow rounded py-2 px-3 text-gray-700 ' +
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

const ChooseFile = ({
  close,
  sendImage,
  sendFile,
  imageRef,
  fileRef
}: {
  close: () => void
  sendImage: () => void
  sendFile: () => void
  imageRef: React.MutableRefObject<HTMLInputElement | null>
  fileRef: React.MutableRefObject<HTMLInputElement | null>
}) => {
  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation()
          close()
        }}
        className={
          'h-dvh w-dvw fixed top-0 left-0 bottom-0 right-0 z-10 bg-transparent'
        }
      ></div>
      <span
        className={
          'dark:bg-bg-dark p-1 flex flex-col w-40 cursor-pointer z-20 text-xs bg-bg absolute top-2/4 right-2/4 translate-x-full -translate-y-full rounded-2xl'
        }
      >
        <button
          className={'flex items-center hover:bg-gray-600 rounded-lg p-2'}
          onClick={() => imageRef.current?.click()}
        >
          <input
            className={'hidden'}
            ref={imageRef}
            type={'file'}
            accept={'image/*'}
            onChange={() => {
              sendImage()
            }}
          />
          <ImageIcon size={14} />
          <span className={'ml-2'}>Photo</span>
        </button>
        <button
          className={'flex hover:bg-gray-600 items-center rounded-lg p-2'}
          onClick={() => fileRef.current?.click()}
        >
          <input
            className={'hidden'}
            ref={fileRef}
            type={'file'}
            accept={'*'}
            onChange={() => {
              sendFile()
            }}
          />
          <File size={14} />
          <span className={'ml-2'}>File</span>
        </button>
        <button
          className={'flex hover:bg-gray-600 rounded-lg items-center p-2'}
        >
          <Camera size={14} />
          <span className={'ml-2'}>Camera</span>
        </button>
      </span>
    </>
  )
}

export default Dialog
