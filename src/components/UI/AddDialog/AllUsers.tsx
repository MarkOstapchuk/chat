'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'react-hot-toast'

import { IAuthForm } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { AuthService } from '@/services/auth.service'
import { dialogService } from '@/services/dialog.service'
import { userService } from '@/services/user.service'

const AllUsers = ({
  type,
  username
}: {
  type: 'all' | 'search'
  username: string
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['users', username],
    queryFn: () => {
      if (type === 'all' || username == '') return userService.getAllUsers()
      else return userService.findUsers(username)
    }
  })
  const { mutate, isError } = useMutation({
    mutationKey: ['createDialog'],
    mutationFn: (data: { userId: number; name: string }) =>
      dialogService.createDialog([data]),
    onSuccess() {
      toast.success('Successfully added!')
      router.push('/')
    }
  })
  const router = useRouter()
  const createDialog = async (data: { userId: number; name: string }) => {
    mutate(data, {
      onError(error: Error) {
        const axiosError = error as AxiosError
        const errorData: { error: string; message: string } = axiosError
          ?.response?.data as { error: string; message: string }
        toast.error(errorData.message)
      }
    })
  }
  return (
    <div className={'overflow-y-scroll flex-grow'}>
      {data?.length ? (
        data.map((item) => (
          <div
            onClick={() =>
              createDialog({ userId: item.id, name: item.username })
            }
            key={item.id}
            className={
              'w-full border-b-2 p-3 mb-2 bg-white flex items-center cursor-default'
            }
          >
            {!item.pictureUrl && (
              <Image
                src={'/user-round.svg'}
                width='80'
                height='80'
                alt={'picture'}
                className={'rounded-full border-2'}
              ></Image>
            )}
            <div className={'flex flex-col ml-3'}>
              {item.name && <p>{item.name}</p>}
              <p className={'text-xs text-gray-600'}>
                username: {item.username}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className={'p-4'}>No users found</div>
      )}
    </div>
  )
}

export default AllUsers
