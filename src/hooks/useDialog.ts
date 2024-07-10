import { useQuery } from '@tanstack/react-query'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { SocketContext } from '@/components/Context/socket'
import { DialogsStore } from '@/components/Stores/Dialogs.store'

import { IDialogParticipant, IDialogWithMessages } from '@/types/dialog.types'
import { IMessage, IMessagePost } from '@/types/message.types'

import { useProfile } from '@/hooks/useProfile'

import { dialogService } from '@/services/dialog.service'

export const useDialog = (chatId: string) => {
  const socket = useContext(SocketContext)
  const profile = useProfile()
  const [messages, setMessages] = useState<IMessage[]>()
  const [dialog_participant, setDialogParticipant] =
    useState<IDialogParticipant>()
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['dialog', chatId],
    queryFn: () => {
      return dialogService.getDialog(chatId)
    }
  })

  const setLastMessage = DialogsStore((state) => state.setLastMessage)
  const clearNotifications = DialogsStore((state) => state.clearNotifications)

  useEffect(() => {
    if (socket) {
      socket.on('messages', (messages: IMessage[]) => {
        setMessages(messages)
        if (messages.length > 0) {
          setLastMessage({
            message: messages[messages.length - 1],
            dialogId: messages[messages.length - 1].dialogId
          })
        }
      })
      if (profile.data && !profile.isLoading) {
        //console.log('rerender', profile.data, profile.isLoading, data)
        socket.emit('user:connect', profile.data.id)
        socket.emit('dialog:join', {
          chatId: +chatId,
          userId: profile.data.id
        })
        socket.emit('messages:get', {
          chatId: +chatId,
          userId: profile.data.id
        })
      }
      return function () {
        if (socket) {
          if (profile.data && !profile.isLoading)
            socket.emit('dialog:leave', {
              chatId: +chatId,
              userId: profile.data.id
            })
        }
      }
    }
  }, [profile.data])

  useEffect(() => {
    if (data && profile.data) {
      readAllMessages({ dialogId: data.id, userId: profile.data.id })
    }
  }, [data, profile])

  useEffect(() => {
    if (data && profile.data && !isLoading && !profile.isLoading) {
      setDialogParticipant(
        data.dialog_participants.filter(
          (item) => item.userId === profile.data?.id
        )[0]
      )
    }
  }, [data, profile.data, isLoading, profile.isLoading])

  // отправка сообщения
  const send = useCallback(
    (payload: { message: IMessagePost; usersId: number[] }) => {
      if (socket) {
        socket.emit('message:post', payload)
      }
    },
    []
  )
  const readAllMessages = useCallback(
    (payload: { dialogId: number; userId: number }) => {
      if (socket) {
        socket.emit('messages:readall', payload)
      }
      clearNotifications({ dialogId: payload.dialogId })
    },
    []
  )
  // обновление сообщения
  const update = useCallback((text: { text: string }) => {
    if (socket) {
      socket.emit('message:put', text)
    }
  }, [])

  // удаление сообщения
  const remove = useCallback(
    (payload: { messageId: number; dialogId: number; usersId: number[] }) => {
      if (socket) {
        socket.emit('message:delete', payload)
      }
    },
    []
  )
  const sendImage = useCallback(
    (payload: { message: IMessagePost; usersId: number[] }) => {
      if (socket) {
        socket.emit('messages:uploadImage', payload)
      }
    },
    []
  )
  const sendFile = useCallback(
    (payload: { message: IMessagePost; usersId: number[] }) => {
      if (socket) {
        socket.emit('messages:uploadFile', payload)
      }
    },
    []
  )
  const chatActions = useMemo(
    () => ({
      send,
      update,
      remove,
      sendImage,
      sendFile
    }),
    []
  )

  return { data, isLoading, messages, chatActions, profile, dialog_participant }
}
