import { X } from 'lucide-react'
import React from 'react'

interface props {
  close: () => void
}
const LoadFilePopup = ({ close }: props) => {
  return (
    <div
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
      className={
        'h-dvh w-dvw fixed top-0 left-0 bottom-0 right-0 z-50 flex justify-center items-center'
      }
    >
      <div
        style={{ width: '40%', height: '80%' }}
        className={'dark:bg-bg-dark bg-bg relative rounded-3xl p-7'}
      >
        <button
          className={'absolute top-2 right-2'}
          onClick={close}
        >
          <X />
        </button>
      </div>
    </div>
  )
}

export default LoadFilePopup
