import { clsx } from 'clsx'
import { File } from 'lucide-react'
import React from 'react'

interface props {
  percentage: number
  circleWidth: number
  className?: string
}

const ProgressBar = ({ percentage, circleWidth, className = '' }: props) => {
  return (
    <div
      style={{
        width: circleWidth,
        height: circleWidth,
        background: clsx(
          percentage === 0 || percentage > 99
            ? `conic-gradient(#333 0%, #333 100%)`
            : `conic-gradient(#76ABAE ${percentage}%, #333 100%)`
        )
      }}
      className={
        'before:opacity-70 rounded-full relative flex items-center justify-center select-none ' +
        'before:absolute before:inset-1 before:rounded-full before:bg-primary before:dark:bg-dark-primary'
      }
    >
      {
        <File
          className={'z-20'}
          fill={'#395B64'}
          size={22}
          color={'#fff'}
        />
      }
    </div>
  )
}

export default ProgressBar
