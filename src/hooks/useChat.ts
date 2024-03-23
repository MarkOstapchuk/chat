import { useContext, useEffect, useState } from 'react'

import { SocketContext } from '@/components/Context/socket'
import { ProfileStore } from '@/components/Stores/Profile.store'

import { useProfile } from '@/hooks/useProfile'

export const useChat = () => {
  const socket = useContext(SocketContext)

  const { data, isLoading } = useProfile()
  console.log(data)
  const setProfile = ProfileStore((state) => state.set)

  //setDialogs
  useEffect(() => {
    if (!isLoading) {
      setProfile({ ...data })
    }
  }, [])

  return {}
}
