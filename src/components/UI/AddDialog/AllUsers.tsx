'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { clsx } from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'react-hot-toast'

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
      dialogService.createDialog(data),
    onSuccess() {
      toast.success('Successfully added!')
      router.push('/')
    }
  })
  const router = useRouter()
  const createDialog = async (data: {
    userId: number
    name: string
    pictureUrl?: string
  }) => {
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
              createDialog({
                userId: item.id,
                name: item.username,
                pictureUrl: item.pictureUrl
              })
            }
            key={item.id}
            className={
              'w-full border-b-2 p-3 dark:p-2 mb-2 bg-white dark:bg-transparent dark:border-b-0.25 ' +
              'dark:border-bg-dark-secondary flex items-center cursor-default'
            }
          >
            <div className={'h-12 w-12 relative flex-none'}>
              <Image
                src={clsx(
                  item.pictureUrl
                    ? userService.getPicture(item.pictureUrl)
                    : '/user-round.svg'
                )}
                fill
                sizes='48px'
                alt={'picture'}
                className={'rounded-full border-2 dark:border-1'}
              ></Image>
            </div>
            <div className={'flex flex-col ml-3'}>
              {item.name && (
                <p className={'dark:text-text-dark'}>{item.name}</p>
              )}
              <p className={'text-xs text-gray-600 dark:text-text-dark'}>
                username: {item.username}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className={'p-4 dark:text-white'}>No users found</div>
      )}
    </div>
  )
}

export default AllUsers
