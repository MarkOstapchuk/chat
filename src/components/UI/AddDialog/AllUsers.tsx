'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()
  console.log(router)
  const createDialog = async (id: number) => {
    await dialogService.createDialog([{ id }])
    router.push('/')
  }

  return (
    <div>
      {data &&
        data.map((item) => (
          <div
            onClick={() => createDialog(item.id)}
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
        ))}
    </div>
  )
}

export default AllUsers
