import { LoaderIcon } from 'lucide-react'

const Loader = () => {
  return (
    <div className={'flex justify-center items-center h-dvh'}>
      <LoaderIcon
        color={'#000000'}
        size={'52'}
        className={'animate-spin text-white'}
      />
    </div>
  )
}
export default Loader
