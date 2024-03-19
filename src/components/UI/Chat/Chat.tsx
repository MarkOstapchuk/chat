'use client'

import React, { useState } from 'react'

import LeftSide from '@/components/UI/Chat/LeftSide'

import { useProfile } from '@/hooks/useProfile'

import styles from '../../../app/chat.module.scss'

const Chat = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { data, isLoading } = useProfile()
  // if (isLoading) return <Loader />
  return (
    <div className={styles.chat}>
      <LeftSide dialogs={data?.dialogs} />
      <div className={''}>{children}</div>
    </div>
  )
}

export default Chat
