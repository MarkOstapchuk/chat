import React from 'react'

const Wrapper = ({
  children,
  className = ''
}: Readonly<{
  children: React.ReactNode
  className?: string
}>) => {
  return (
    <div
      className={
        'bg-primary dark:bg-dark-primary p-3 text-white rounded-2xl' +
        ' ' +
        className
      }
    >
      {children}
    </div>
  )
}

export default Wrapper
