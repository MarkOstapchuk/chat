'use client'

import React, { useEffect, useState } from 'react'

import { DialogsStore } from '@/components/Stores/Dialogs.store'
import LeftSide from '@/components/UI/Chat/LeftSide'
import Loader from '@/components/UI/Loader'

import { useChat } from '@/hooks/useChat'
import { useProfile } from '@/hooks/useProfile'

import styles from '../../../app/chat.module.scss'

const Chat = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  useProfile()
  useChat()
  return (
    <div className={styles.chat}>
      <LeftSide />
      <div className={''}>{children}</div>
    </div>
  )
}

export default Chat
