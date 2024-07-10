import { LoaderIcon } from 'lucide-react'

const Loader = () => {
  return (
    <div className={'flex justify-center items-center h-dvh'}>
      <LoaderIcon
        size={'52'}
        className={'animate-spin text-text dark:text-text-dark'}
      />
    </div>
  )
}
export default Loader
