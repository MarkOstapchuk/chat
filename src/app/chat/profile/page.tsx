'use client'

import { useRouter } from 'next/navigation'

import { AuthService } from '@/services/auth.service'

const Profile = () => {
  const { push } = useRouter()
  const logout = async () => {
    if (await AuthService.logout()) push('/auth')
  }

  return (
    <div>
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
