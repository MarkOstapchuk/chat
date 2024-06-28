'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'

import { DialogsStore } from '@/components/Stores/Dialogs.store'
import LeftSide from '@/components/UI/Chat/LeftSide'
import MemoizedLeftSide from '@/components/UI/Chat/MemoLeftSide'
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
  const MemoizedChildren = useMemo(
    () => <div className={'dark:bg-bg-dark'}>{children}</div>,
    [children]
  )
  return (
    <div className={styles.chat}>
      <MemoizedLeftSide />
      {MemoizedChildren}
    </div>
  )
}

export default Chat
