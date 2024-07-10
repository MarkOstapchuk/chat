import React from 'react'

import LeftSide from '@/components/UI/Chat/LeftSide'

const MemoizedLeftSide = React.memo(() => {
  return <LeftSide />
})

export default MemoizedLeftSide
