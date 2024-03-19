'use client'

import { useRouter } from 'next/navigation'

import Loader from '@/components/UI/Loader'

import { useProfile } from '@/hooks/useProfile'

import { AuthService } from '@/services/auth.service'

const Profile = () => {
  const { push } = useRouter()
  const { data } = useProfile()
  const logout = async () => {
    if (await AuthService.logout()) push('/auth')
  }
  if (!data) return <Loader />
  return (
    <div>
      <div className={'px-4 py-2'}>{data.username}</div>
      <button
        onClick={logout}
        className={'px-4 py-2 bg-blue-400 rounded-xl m-4'}
      >
        logout
      </button>
    </div>
  )
}

export default Profile
