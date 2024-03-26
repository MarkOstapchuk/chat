import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { DialogsStore } from '@/components/Stores/Dialogs.store'
import { ProfileStore } from '@/components/Stores/Profile.store'

import { userService } from '@/services/user.service'

export function useProfile() {
  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.getProfile()
  })
  const setMany = DialogsStore((state) => state.setMany)
  const setProfile = ProfileStore((state) => state.set)
  useEffect(() => {
    if (data && !isLoading) {
      setMany(data.dialog_participant)
      setProfile({ ...data })
    }
  }, [data, isLoading])

  return { data, isLoading }
}
